# SuperAppBet SDUI Server

Server-Driven UI (SDUI) backend for the SuperAppBet React Native application. This server provides dynamic UI configuration, module management, real-time updates, and comprehensive analytics for a betting super app.

## 🚀 Features

### Core SDUI Capabilities
- **Dynamic Screen Configuration** - Configure UI layouts, components, and behavior from the server
- **Component Library Management** - Register and manage reusable UI components
- **Theme Management** - Dynamic theming with light/dark mode support
- **A/B Testing** - Built-in experimentation framework
- **Real-time Updates** - WebSocket-based live configuration updates

### Module System
- **Module Registry** - Enable/disable app modules dynamically
- **User Segmentation** - Module access based on user segments and conditions
- **Feature Flags** - Granular feature control per module
- **Module Analytics** - Track usage and performance metrics

### Advanced Features
- **User Personalization** - Customize UI based on user behavior and preferences
- **Geo-targeting** - Location-based content and module restrictions
- **Platform-specific** - Different configurations for iOS, Android, and Web
- **Content Scheduling** - Time-based content and promotional campaigns
- **Performance Monitoring** - Real-time performance metrics and error tracking

## 📁 Project Structure

```
src/
├── server.js                 # Main server entry point
├── routes/                   # API route handlers
│   ├── sdui.js              # SDUI configuration endpoints
│   ├── modules.js           # Module management endpoints
│   ├── screens.js           # Screen configuration endpoints
│   ├── components.js        # Component library endpoints
│   └── analytics.js         # Analytics and metrics endpoints
├── store/                   # Data storage layers
│   ├── sduiStore.js        # SDUI configuration store
│   ├── moduleStore.js      # Module management store
│   └── screenStore.js      # Screen configuration store
├── websocket/              # WebSocket handlers
│   └── socketHandler.js   # Real-time communication
├── validators/             # Input validation schemas
│   └── sduiValidator.js   # SDUI schema validators
└── config/                # Configuration files
    └── defaultConfigs.js  # Default data initialization
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Start production server:**
```bash
npm start
```

The server will start on port 3001 (or PORT environment variable).

## 📡 API Endpoints

### SDUI Configuration

#### Get Complete Configuration
```bash
GET /api/sdui/config
```
Returns the complete SDUI configuration for app initialization.

#### Get Screen Configuration
```bash
GET /api/sdui/screen/:screenName?variant=default&userId=123
```
Get configuration for a specific screen with optional variants and personalization.

#### Update Screen Configuration
```bash
PUT /api/sdui/screen/:screenName
Content-Type: application/json

{
  "components": [...],
  "layout": {...},
  "metadata": {...}
}
```

#### Create A/B Test Variant
```bash
POST /api/sdui/screen/:screenName/variant
Content-Type: application/json

{
  "variantName": "variant_a",
  "config": {...},
  "trafficSplit": 50
}
```

### Module Management

#### Get Enabled Modules
```bash
GET /api/modules/enabled?userId=123&segment=vip&region=BR
```

#### Enable Module
```bash
POST /api/modules/enable/:moduleId
Content-Type: application/json

{
  "userId": "123",
  "segment": "vip",
  "config": {...}
}
```

#### Execute Module Action
```bash
POST /api/modules/:moduleId/actions/:actionType
Content-Type: application/json

{
  "payload": {...},
  "userId": "123"
}
```

### Screen Management

#### Get Home Screen
```bash
GET /api/screens/home?userId=123&segment=default&variant=default
```

#### Get Sports Screen
```bash
GET /api/screens/sports?userId=123&sport=football&live=true
```

#### Update Screen Layout
```bash
PUT /api/screens/:screenName/layout
Content-Type: application/json

{
  "layout": {...},
  "variant": "default"
}
```

### Component Library

#### Get All Components
```bash
GET /api/components?category=betting&platform=ios&status=active
```

#### Create Component
```bash
POST /api/components
Content-Type: application/json

{
  "name": "CustomButton",
  "type": "Button",
  "category": "interactive",
  "schema": {...},
  "defaultProps": {...}
}
```

### Analytics

#### Track Event
```bash
POST /api/analytics/track
Content-Type: application/json

{
  "event": "screen_view",
  "properties": {...},
  "userId": "123",
  "platform": "ios"
}
```

#### Get Screen Analytics
```bash
GET /api/analytics/screens/:screenName?startDate=2024-01-01&endDate=2024-01-31
```

## 🔌 WebSocket Events

### Client Events

#### Register Client
```javascript
socket.emit('register', {
  userId: '123',
  deviceId: 'device-123',
  appVersion: '1.0.0',
  platform: 'ios'
});
```

#### Request Screen Update
```javascript
socket.emit('request_screen_update', {
  screenName: 'home',
  variant: 'default',
  userId: '123'
});
```

#### Execute Module Action
```javascript
socket.emit('execute_module_action', {
  moduleId: 'betting',
  actionType: 'place-bet',
  payload: {...},
  userId: '123'
});
```

### Server Events

#### Configuration Updates
```javascript
socket.on('sdui_update', (data) => {
  // Handle real-time configuration updates
  console.log('Update type:', data.type);
  console.log('Update data:', data.data);
});
```

#### Module Events
```javascript
socket.on('module_enabled', (data) => {
  // Handle module enabled event
});

socket.on('module_disabled', (data) => {
  // Handle module disabled event
});
```

## 🎯 Usage Examples

### Basic SDUI Configuration

```javascript
// Get home screen configuration
const response = await fetch('/api/sdui/screen/home?userId=123');
const config = await response.json();

// Apply configuration to React Native app
renderScreen(config.data);
```

### Module Management

```javascript
// Enable betting module for user
await fetch('/api/modules/enable/betting', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: '123',
    segment: 'active-bettor',
    config: {
      maxBetAmount: 1000,
      allowLiveBetting: true
    }
  })
});

// Execute betting action
await fetch('/api/modules/betting/actions/place-bet', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    payload: {
      eventId: 'event-123',
      amount: 50,
      odds: 2.5
    },
    userId: '123'
  })
});
```

### Real-time Updates

```javascript
// Connect to WebSocket
const socket = io('http://localhost:3001');

// Register client
socket.emit('register', {
  userId: '123',
  deviceId: 'device-123',
  appVersion: '1.0.0',
  platform: 'ios'
});

// Listen for configuration updates
socket.on('sdui_update', (update) => {
  if (update.type === 'screen_updated') {
    // Update UI with new configuration
    updateScreen(update.data.config);
  }
});
```

## 🎨 Component Schema Example

```javascript
// Register a new component type
await fetch('/api/components', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'LiveScore',
    type: 'LiveScoreCard',
    description: 'Real-time sports score display',
    category: 'betting',
    schema: {
      type: 'object',
      properties: {
        eventId: { type: 'string', required: true },
        homeTeam: { type: 'string', required: true },
        awayTeam: { type: 'string', required: true },
        score: { 
          type: 'object',
          properties: {
            home: { type: 'number' },
            away: { type: 'number' }
          }
        },
        minute: { type: 'string' },
        live: { type: 'boolean' }
      }
    },
    defaultProps: {
      live: false,
      showMinute: true
    },
    variants: ['default', 'compact', 'detailed'],
    platforms: ['ios', 'android']
  })
});
```

## 🔧 Configuration Options

### Environment Variables

```bash
PORT=3001                    # Server port
NODE_ENV=development         # Environment mode
LOG_LEVEL=info              # Logging level
CORS_ORIGIN=*               # CORS allowed origins
WS_HEARTBEAT_INTERVAL=30000 # WebSocket heartbeat interval
```

### Feature Flags

```javascript
// Set feature flag
await fetch('/api/modules/betting/feature-flag', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    flagName: 'live-streaming',
    enabled: true,
    conditions: {
      userSegment: ['vip'],
      platform: ['ios']
    }
  })
});
```

## 📊 Analytics & Monitoring

### Performance Metrics

```bash
# Get real-time dashboard
GET /api/analytics/dashboard/realtime

# Get performance metrics
GET /api/analytics/performance?type=screens&platform=ios&timeRange=24h

# Get conversion funnel
GET /api/analytics/funnel/bet-placement?startDate=2024-01-01&endDate=2024-01-31
```

### A/B Test Results

```bash
# Get A/B test results
GET /api/analytics/ab-tests/home-hero-v2
```

## 🔒 Security Features

- **Input validation** using Joi schemas
- **CORS protection** with configurable origins
- **Rate limiting** for API endpoints
- **Helmet.js** security headers
- **Request logging** with Morgan
- **Error handling** with proper status codes

## 🚀 Production Deployment

### Docker (Recommended)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 3001
CMD ["npm", "start"]
```

### Process Manager

```bash
# Using PM2
pm2 start src/server.js --name sdui-server
pm2 startup
pm2 save
```

### Health Checks

```bash
# Health check endpoint
GET /health

# Response
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "SuperAppBet SDUI Server",
  "version": "1.0.0"
}
```

## 📈 Scaling Considerations

### Horizontal Scaling
- Use Redis for session storage
- Implement database clustering
- Use load balancer for multiple instances

### Caching Strategy
- Redis for frequently accessed configurations
- CDN for static assets
- Application-level caching for computed data

### Database Integration
- Replace in-memory stores with PostgreSQL/MongoDB
- Implement connection pooling
- Add database migrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**SuperAppBet SDUI Server** - Powering dynamic, personalized betting experiences through server-driven UI architecture.