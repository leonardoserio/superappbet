const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');

const sduiRoutes = require('./routes/sdui');
const modulesRoutes = require('./routes/modules');
const screensRoutes = require('./routes/screens');
const componentsRoutes = require('./routes/components');
const analyticsRoutes = require('./routes/analytics');

const { initializeDefaultConfigs } = require('./config/defaultConfigs');
const { setupWebSocket } = require('./websocket/socketHandler');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'SuperAppBet SDUI Server',
    version: '1.0.0'
  });
});

// Setup WebSocket for real-time updates
setupWebSocket(io);

// Pass io to routes that need WebSocket functionality
modulesRoutes.setSocketIO(io);

// API Routes
app.use('/api/sdui', sduiRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/screens', screensRoutes);
app.use('/api/components', componentsRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString()
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint not found',
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    }
  });
});

// Initialize default configurations
initializeDefaultConfigs();

// Start server
server.listen(PORT, () => {
  console.log(`🚀 SuperAppBet SDUI Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`🎮 API Base: http://localhost:${PORT}/api`);
  console.log(`⚡ WebSocket: ws://localhost:${PORT}`);
});

module.exports = { app, server, io };