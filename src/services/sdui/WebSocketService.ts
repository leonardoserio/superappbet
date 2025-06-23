import { io, Socket } from 'socket.io-client';
import { Platform } from 'react-native';

export interface WebSocketEventHandlers {
  onScreenUpdated?: (data: { screenName: string; variant: string; config: any }) => void;
  onModuleEnabled?: (data: { moduleId: string; userId?: string; config: any }) => void;
  onModuleDisabled?: (data: { moduleId: string; userId?: string; reason?: string }) => void;
  onModuleConfigUpdated?: (data: { moduleId: string; config: any }) => void;
  onThemeUpdated?: (data: { variant: string; theme: any }) => void;
  onComponentUpdated?: (data: { componentId: string; component: any }) => void;
  onFeatureFlagUpdated?: (data: { moduleId: string; flagName: string; enabled: boolean }) => void;
  onForceRefresh?: (data: { reason: string; timestamp: string }) => void;
  onUserActionExecuted?: (data: { moduleId: string; actionType: string; userId: string }) => void;
}

class WebSocketServiceClass {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private handlers: WebSocketEventHandlers = {};
  private userId?: string;
  private sessionId: string;
  private platform: string = 'mobile';
  private appVersion: string = '1.0.0';

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  // ==================== CONNECTION MANAGEMENT ====================

  async connect(serverUrl: string = 'http://localhost:3001', userId?: string): Promise<void> {
    try {
      this.userId = userId;
      
      // Get device info
      this.platform = Platform.OS;

      if (this.socket) {
        this.disconnect();
      }

      this.socket = io(serverUrl, {
        transports: ['websocket'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
      });

      this.setupEventListeners();
      
      // Register client when connected
      this.socket.on('connect', () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        console.log('🔌 WebSocket connected');
        
        this.registerClient();
      });

    } catch (error) {
      console.error('WebSocket: Failed to connect:', error);
      throw error;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('🔌 WebSocket disconnected');
    }
  }

  private registerClient(): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('register', {
      userId: this.userId,
      deviceId: this.generateDeviceId(),
      appVersion: this.appVersion,
      platform: this.platform,
      sessionId: this.sessionId,
    });
  }

  // ==================== EVENT HANDLERS ====================

  setEventHandlers(handlers: WebSocketEventHandlers): void {
    this.handlers = { ...this.handlers, ...handlers };
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('🔌 WebSocket connected to server');
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnected = false;
      console.log('🔌 WebSocket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 WebSocket connection error:', error);
      this.handleReconnection();
    });

    // Registration confirmation
    this.socket.on('registered', (data) => {
      console.log('📱 Client registered:', data);
    });

    // SDUI Updates
    this.socket.on('sdui_update', (update) => {
      console.log('📡 SDUI Update received:', update.type);
      this.handleSDUIUpdate(update);
    });

    // User-specific updates
    this.socket.on('user_update', (update) => {
      console.log('👤 User update received:', update.type);
      this.handleUserUpdate(update);
    });

    // Segment updates
    this.socket.on('segment_update', (update) => {
      console.log('👥 Segment update received:', update.type);
      this.handleSegmentUpdate(update);
    });

    // Platform updates
    this.socket.on('platform_update', (update) => {
      console.log('📱 Platform update received:', update.type);
      this.handlePlatformUpdate(update);
    });

    // Screen updates
    this.socket.on('screen_updated', (data) => {
      console.log('🖥️ Screen updated:', data.screenName);
      this.handlers.onScreenUpdated?.(data);
    });

    // Module events
    this.socket.on('module_enabled', (data) => {
      console.log('🎮 Module enabled:', data.moduleId);
      this.handlers.onModuleEnabled?.(data);
    });

    this.socket.on('module_disabled', (data) => {
      console.log('🎮 Module disabled:', data.moduleId);
      this.handlers.onModuleDisabled?.(data);
    });

    this.socket.on('module_config_updated', (data) => {
      console.log('⚙️ Module config updated:', data.moduleId);
      this.handlers.onModuleConfigUpdated?.(data);
    });

    // Theme updates
    this.socket.on('theme_updated', (data) => {
      console.log('🎨 Theme updated:', data.variant);
      this.handlers.onThemeUpdated?.(data);
    });

    // Component updates
    this.socket.on('component_updated', (data) => {
      console.log('🧩 Component updated:', data.componentId);
      this.handlers.onComponentUpdated?.(data);
    });

    // Feature flag updates
    this.socket.on('feature_flag_updated', (data) => {
      console.log('🚩 Feature flag updated:', data.flagName);
      this.handlers.onFeatureFlagUpdated?.(data);
    });

    // Force refresh
    this.socket.on('force_refresh', (data) => {
      console.log('🔄 Force refresh requested:', data.reason);
      this.handlers.onForceRefresh?.(data);
    });

    // Action results
    this.socket.on('action_result', (data) => {
      console.log('✅ Action result:', data.actionType);
      // Handle action results if needed
    });

    // User actions from other sessions
    this.socket.on('user_action_executed', (data) => {
      console.log('👤 User action executed:', data.actionType);
      this.handlers.onUserActionExecuted?.(data);
    });

    // Feature flag results
    this.socket.on('feature_flag_result', (data) => {
      console.log('🚩 Feature flag result:', data.flagName, data.flag?.enabled);
      // Handle feature flag results if needed
    });

    // Analytics acknowledgments
    this.socket.on('analytics_acknowledged', (data) => {
      console.log('📊 Analytics acknowledged:', data.event);
    });

    // Heartbeat
    this.socket.on('heartbeat_ack', () => {
      // Silent heartbeat acknowledgment
    });

    // Error handling
    this.socket.on('error', (error) => {
      console.error('❌ WebSocket error:', error);
    });
  }

  // ==================== UPDATE HANDLERS ====================

  private handleSDUIUpdate(update: any): void {
    switch (update.type) {
      case 'screen_updated':
        this.handlers.onScreenUpdated?.(update.data);
        break;
      case 'theme_updated':
        this.handlers.onThemeUpdated?.(update.data);
        break;
      case 'component_updated':
        this.handlers.onComponentUpdated?.(update.data);
        break;
      case 'component_added':
      case 'component_removed':
        // Handle component library changes
        break;
      default:
        console.log('Unknown SDUI update type:', update.type);
    }
  }

  private handleUserUpdate(update: any): void {
    // Handle user-specific updates
    this.handleSDUIUpdate(update);
  }

  private handleSegmentUpdate(update: any): void {
    // Handle segment-specific updates
    this.handleSDUIUpdate(update);
  }

  private handlePlatformUpdate(update: any): void {
    // Handle platform-specific updates
    this.handleSDUIUpdate(update);
  }

  private handleReconnection(): void {
    this.reconnectAttempts++;
    
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('🔌 Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), 30000);
    console.log(`🔌 Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      if (!this.isConnected && this.socket) {
        this.socket.connect();
      }
    }, delay);
  }

  // ==================== CLIENT ACTIONS ====================

  requestScreenUpdate(screenName: string, variant: string = 'default'): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('request_screen_update', {
      screenName,
      variant,
      userId: this.userId,
    });
  }

  executeModuleAction(
    moduleId: string, 
    actionType: string, 
    payload: any, 
    requestId?: string
  ): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('execute_module_action', {
      moduleId,
      actionType,
      payload,
      userId: this.userId,
      requestId: requestId || this.generateRequestId(),
    });
  }

  checkFeatureFlag(moduleId: string, flagName: string, userContext: any = {}): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('check_feature_flag', {
      moduleId,
      flagName,
      userContext: {
        ...userContext,
        userId: this.userId,
        platform: this.platform,
        appVersion: this.appVersion,
      },
    });
  }

  trackAnalyticsEvent(event: string, properties: any = {}): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('analytics_event', {
      event,
      properties,
      userId: this.userId,
      sessionId: this.sessionId,
      platform: this.platform,
      appVersion: this.appVersion,
      timestamp: new Date().toISOString(),
    });
  }

  sendHeartbeat(): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('heartbeat');
  }

  // ==================== UTILITY METHODS ====================

  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  getConnectionInfo(): any {
    return {
      connected: this.isConnected,
      userId: this.userId,
      sessionId: this.sessionId,
      platform: this.platform,
      appVersion: this.appVersion,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  updateUserId(userId: string): void {
    this.userId = userId;
    if (this.isConnected) {
      this.registerClient();
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private generateDeviceId(): string {
    // In production, use a persistent device ID
    return `device_${Math.random().toString(36).substring(2, 18)}`;
  }

  // ==================== HEARTBEAT MANAGEMENT ====================

  private heartbeatInterval?: ReturnType<typeof setInterval>;

  startHeartbeat(intervalMs: number = 30000): void {
    this.stopHeartbeat();
    
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.sendHeartbeat();
      }
    }, intervalMs);
  }

  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }
}

export const WebSocketService = new WebSocketServiceClass();