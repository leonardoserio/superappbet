const { v4: uuidv4 } = require('uuid');

let io = null;
const connectedClients = new Map(); // clientId -> socket
const clientSessions = new Map(); // clientId -> session data

function setupWebSocket(socketIO) {
  io = socketIO;
  
  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);
    
    // Handle client registration
    socket.on('register', (data) => {
      const { userId, deviceId, appVersion, platform } = data;
      
      const clientId = uuidv4();
      const sessionData = {
        clientId,
        socketId: socket.id,
        userId,
        deviceId,
        appVersion,
        platform,
        connectedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };
      
      connectedClients.set(clientId, socket);
      clientSessions.set(clientId, sessionData);
      
      // Join user-specific room for targeted updates
      if (userId) {
        socket.join(`user_${userId}`);
      }
      
      // Join platform-specific room
      if (platform) {
        socket.join(`platform_${platform}`);
      }
      
      socket.emit('registered', {
        clientId,
        sessionId: clientId,
        serverTime: new Date().toISOString()
      });
      
      console.log(`📱 Client registered: ${clientId} (User: ${userId}, Platform: ${platform})`);
    });
    
    // Handle SDUI update requests
    socket.on('request_screen_update', (data) => {
      const { screenName, variant, userId } = data;
      
      try {
        // Get updated screen configuration
        const { sduiStore } = require('../store/sduiStore');
        const screenConfig = sduiStore.getScreenConfig(screenName, { variant, userId });
        
        if (screenConfig) {
          socket.emit('screen_updated', {
            screenName,
            variant,
            config: screenConfig,
            updatedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        socket.emit('error', {
          type: 'screen_update_failed',
          message: error.message,
          screenName
        });
      }
    });
    
    // Handle module action requests
    socket.on('execute_module_action', async (data) => {
      const { moduleId, actionType, payload, userId } = data;
      
      try {
        const { moduleStore } = require('../store/moduleStore');
        const result = moduleStore.executeModuleAction(moduleId, actionType, {
          payload,
          userId,
          metadata: {
            socketId: socket.id,
            source: 'websocket'
          }
        });
        
        socket.emit('action_result', {
          moduleId,
          actionType,
          result,
          requestId: data.requestId || uuidv4(),
          executedAt: new Date().toISOString()
        });
        
        // Broadcast action event to other clients of the same user
        if (userId) {
          socket.to(`user_${userId}`).emit('user_action_executed', {
            moduleId,
            actionType,
            userId,
            executedAt: new Date().toISOString()
          });
        }
        
      } catch (error) {
        socket.emit('error', {
          type: 'action_execution_failed',
          message: error.message,
          moduleId,
          actionType
        });
      }
    });
    
    // Handle feature flag requests
    socket.on('check_feature_flag', (data) => {
      const { moduleId, flagName, userContext } = data;
      
      try {
        const { moduleStore } = require('../store/moduleStore');
        const flag = moduleStore.getFeatureFlag(moduleId, flagName, userContext);
        
        socket.emit('feature_flag_result', {
          moduleId,
          flagName,
          flag,
          checkedAt: new Date().toISOString()
        });
      } catch (error) {
        socket.emit('error', {
          type: 'feature_flag_check_failed',
          message: error.message,
          moduleId,
          flagName
        });
      }
    });
    
    // Handle real-time analytics events
    socket.on('analytics_event', (data) => {
      const { event, properties, userId } = data;
      
      // Process analytics event
      console.log('📊 Analytics Event:', {
        event,
        properties,
        userId,
        socketId: socket.id,
        timestamp: new Date().toISOString()
      });
      
      // Acknowledge receipt
      socket.emit('analytics_acknowledged', {
        event,
        processedAt: new Date().toISOString()
      });
    });
    
    // Handle heartbeat for connection monitoring
    socket.on('heartbeat', () => {
      const clientData = Array.from(clientSessions.values())
        .find(session => session.socketId === socket.id);
      
      if (clientData) {
        clientData.lastActivity = new Date().toISOString();
        clientSessions.set(clientData.clientId, clientData);
      }
      
      socket.emit('heartbeat_ack', {
        serverTime: new Date().toISOString()
      });
    });
    
    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`🔌 Client disconnected: ${socket.id} (Reason: ${reason})`);
      
      // Clean up client data
      const clientData = Array.from(clientSessions.values())
        .find(session => session.socketId === socket.id);
      
      if (clientData) {
        connectedClients.delete(clientData.clientId);
        clientSessions.delete(clientData.clientId);
        
        console.log(`🧹 Cleaned up client: ${clientData.clientId}`);
      }
    });
    
    // Handle errors
    socket.on('error', (error) => {
      console.error(`❌ Socket error for ${socket.id}:`, error);
    });
  });
  
  // Setup periodic cleanup of stale connections
  setInterval(() => {
    cleanupStaleConnections();
  }, 5 * 60 * 1000); // Every 5 minutes
  
  console.log('🚀 WebSocket server initialized');
}

// Broadcast functions
function broadcastUpdate(eventType, data) {
  if (!io) return;
  
  console.log(`📡 Broadcasting ${eventType}:`, data);
  
  io.emit('sdui_update', {
    type: eventType,
    data,
    timestamp: new Date().toISOString()
  });
}

function broadcastToUser(userId, eventType, data) {
  if (!io) return;
  
  console.log(`📡 Broadcasting to user ${userId} - ${eventType}:`, data);
  
  io.to(`user_${userId}`).emit('user_update', {
    type: eventType,
    data,
    userId,
    timestamp: new Date().toISOString()
  });
}

function broadcastToSegment(segment, eventType, data) {
  if (!io) return;
  
  console.log(`📡 Broadcasting to segment ${segment} - ${eventType}:`, data);
  
  // Filter clients by segment and send targeted updates
  const segmentClients = Array.from(clientSessions.values())
    .filter(session => session.segment === segment);
  
  segmentClients.forEach(client => {
    const socket = connectedClients.get(client.clientId);
    if (socket) {
      socket.emit('segment_update', {
        type: eventType,
        data,
        segment,
        timestamp: new Date().toISOString()
      });
    }
  });
}

function broadcastToPlatform(platform, eventType, data) {
  if (!io) return;
  
  console.log(`📡 Broadcasting to platform ${platform} - ${eventType}:`, data);
  
  io.to(`platform_${platform}`).emit('platform_update', {
    type: eventType,
    data,
    platform,
    timestamp: new Date().toISOString()
  });
}

function getConnectedClients() {
  return Array.from(clientSessions.values());
}

function getClientStats() {
  const clients = Array.from(clientSessions.values());
  
  return {
    totalConnected: clients.length,
    byPlatform: clients.reduce((acc, client) => {
      acc[client.platform] = (acc[client.platform] || 0) + 1;
      return acc;
    }, {}),
    uniqueUsers: new Set(clients.map(c => c.userId).filter(Boolean)).size,
    averageSessionDuration: calculateAverageSessionDuration(clients)
  };
}

function calculateAverageSessionDuration(clients) {
  if (clients.length === 0) return 0;
  
  const now = new Date();
  const totalDuration = clients.reduce((sum, client) => {
    const connectedAt = new Date(client.connectedAt);
    return sum + (now - connectedAt);
  }, 0);
  
  return Math.round(totalDuration / clients.length / 1000); // in seconds
}

function cleanupStaleConnections() {
  const now = new Date();
  const staleThreshold = 10 * 60 * 1000; // 10 minutes
  
  const staleClients = Array.from(clientSessions.values())
    .filter(session => {
      const lastActivity = new Date(session.lastActivity);
      return (now - lastActivity) > staleThreshold;
    });
  
  staleClients.forEach(client => {
    console.log(`🧹 Removing stale client: ${client.clientId}`);
    
    const socket = connectedClients.get(client.clientId);
    if (socket) {
      socket.disconnect(true);
    }
    
    connectedClients.delete(client.clientId);
    clientSessions.delete(client.clientId);
  });
  
  if (staleClients.length > 0) {
    console.log(`🧹 Cleaned up ${staleClients.length} stale connections`);
  }
}

// Force refresh all clients
function forceRefreshAllClients(reason = 'Server update') {
  if (!io) return;
  
  console.log(`🔄 Force refreshing all clients: ${reason}`);
  
  io.emit('force_refresh', {
    reason,
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  setupWebSocket,
  broadcastUpdate,
  broadcastToUser,
  broadcastToSegment,
  broadcastToPlatform,
  getConnectedClients,
  getClientStats,
  forceRefreshAllClients
};