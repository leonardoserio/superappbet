const { v4: uuidv4 } = require('uuid');

class ModuleStore {
  constructor() {
    this.modules = new Map();
    this.userModules = new Map(); // userId -> enabled modules
    this.segmentModules = new Map(); // segment -> enabled modules
    this.moduleConfigs = new Map(); // moduleId -> configurations
    this.moduleAnalytics = new Map(); // moduleId -> analytics data
    this.featureFlags = new Map(); // moduleId -> feature flags
    
    this.initializeDefaultModules();
  }

  initializeDefaultModules() {
    // Betting Module
    this.createModule({
      id: 'betting',
      name: 'Sports Betting',
      version: '1.0.0',
      description: 'Complete sports betting functionality',
      category: 'gambling',
      components: [
        'BetSlip',
        'OddsDisplay',
        'EventCard',
        'LiveScore'
      ],
      screens: [
        'sports-list',
        'event-detail',
        'live-events',
        'bet-history'
      ],
      actions: [
        'place-bet',
        'add-to-betslip',
        'remove-from-betslip',
        'get-odds',
        'get-events'
      ],
      dependencies: [],
      defaultConfig: {
        maxBetAmount: 10000,
        minBetAmount: 1,
        currency: 'BRL',
        allowLiveBetting: true,
        maxSelectionsPerBet: 10,
        oddsFormat: 'decimal',
        autoAcceptOddsChanges: false
      },
      createdAt: new Date().toISOString(),
      status: 'active'
    });

    // Casino Module
    this.createModule({
      id: 'casino',
      name: 'Casino Games',
      version: '1.0.0',
      description: 'Casino games and slots functionality',
      category: 'gambling',
      components: [
        'GameCard',
        'GameLauncher',
        'GameHistory',
        'Jackpot'
      ],
      screens: [
        'casino-home',
        'game-detail',
        'game-history',
        'jackpots'
      ],
      actions: [
        'launch-game',
        'get-game-history',
        'get-jackpots',
        'search-games'
      ],
      dependencies: [],
      defaultConfig: {
        gameCategories: ['slots', 'table', 'live', 'jackpot'],
        autoLaunch: true,
        soundEnabled: true,
        maxGameSessions: 5
      },
      createdAt: new Date().toISOString(),
      status: 'active'
    });

    // Lottery Module
    this.createModule({
      id: 'lottery',
      name: 'Lottery',
      version: '1.0.0',
      description: 'Lottery games and number betting',
      category: 'gambling',
      components: [
        'NumberPicker',
        'DrawResults',
        'LotteryCard'
      ],
      screens: [
        'lottery-home',
        'number-selection',
        'results',
        'my-tickets'
      ],
      actions: [
        'buy-ticket',
        'check-results',
        'get-draws'
      ],
      dependencies: [],
      defaultConfig: {
        availableGames: ['mega-sena', 'quina', 'lotomania'],
        maxNumbersPerGame: 15,
        autoNumberSelection: true
      },
      createdAt: new Date().toISOString(),
      status: 'active'
    });

    // Payments Module
    this.createModule({
      id: 'payments',
      name: 'Payments',
      version: '1.0.0',
      description: 'Payment processing and wallet management',
      category: 'financial',
      components: [
        'WalletBalance',
        'PaymentMethod',
        'TransactionHistory'
      ],
      screens: [
        'wallet',
        'deposit',
        'withdraw',
        'transaction-history'
      ],
      actions: [
        'deposit',
        'withdraw',
        'get-balance',
        'get-transactions'
      ],
      dependencies: [],
      defaultConfig: {
        supportedMethods: ['pix', 'credit-card', 'bank-transfer'],
        minDeposit: 10,
        maxDeposit: 50000,
        minWithdraw: 20,
        maxWithdraw: 20000
      },
      createdAt: new Date().toISOString(),
      status: 'active'
    });

    // Default enabled modules for all users
    this.segmentModules.set('default', ['betting', 'casino']);
    this.segmentModules.set('vip', ['betting', 'casino', 'lottery', 'payments']);
    this.segmentModules.set('new-user', ['betting']);
  }

  getAllModules() {
    return Array.from(this.modules.values());
  }

  getEnabledModules(options = {}) {
    const { userId, segment = 'default', region = 'default' } = options;
    
    // Priority: User-specific > Segment > Default
    if (userId && this.userModules.has(userId)) {
      return this.getUserModules(userId);
    }
    
    if (this.segmentModules.has(segment)) {
      const enabledModuleIds = this.segmentModules.get(segment);
      return enabledModuleIds.map(id => this.modules.get(id)).filter(Boolean);
    }
    
    // Default fallback
    const defaultModules = this.segmentModules.get('default') || [];
    return defaultModules.map(id => this.modules.get(id)).filter(Boolean);
  }

  enableModule(moduleId, options = {}) {
    const { userId, segment, region, config = {} } = options;
    
    const module = this.modules.get(moduleId);
    if (!module) {
      throw new Error(`Module '${moduleId}' not found`);
    }
    
    if (userId) {
      // Enable for specific user
      if (!this.userModules.has(userId)) {
        this.userModules.set(userId, []);
      }
      
      const userModules = this.userModules.get(userId);
      if (!userModules.includes(moduleId)) {
        userModules.push(moduleId);
        
        // Store user-specific config
        this.setModuleConfig(moduleId, userId, config);
      }
    } else if (segment) {
      // Enable for segment
      if (!this.segmentModules.has(segment)) {
        this.segmentModules.set(segment, []);
      }
      
      const segmentModules = this.segmentModules.get(segment);
      if (!segmentModules.includes(moduleId)) {
        segmentModules.push(moduleId);
      }
    }
    
    return {
      moduleId,
      enabled: true,
      config: this.getModuleConfig(moduleId, options),
      enabledAt: new Date().toISOString()
    };
  }

  disableModule(moduleId, options = {}) {
    const { userId, segment, reason } = options;
    
    if (userId && this.userModules.has(userId)) {
      const userModules = this.userModules.get(userId);
      const index = userModules.indexOf(moduleId);
      if (index > -1) {
        userModules.splice(index, 1);
      }
    }
    
    if (segment && this.segmentModules.has(segment)) {
      const segmentModules = this.segmentModules.get(segment);
      const index = segmentModules.indexOf(moduleId);
      if (index > -1) {
        segmentModules.splice(index, 1);
      }
    }
    
    // Log disable event for analytics
    this.recordModuleEvent(moduleId, 'disabled', { userId, segment, reason });
  }

  getModuleConfig(moduleId, options = {}) {
    const { userId, segment = 'default', region = 'default' } = options;
    
    const module = this.modules.get(moduleId);
    if (!module) return null;
    
    // Get base config
    let config = { ...module.defaultConfig };
    
    // Apply segment-specific config
    const segmentConfigKey = `${moduleId}:${segment}`;
    if (this.moduleConfigs.has(segmentConfigKey)) {
      config = { ...config, ...this.moduleConfigs.get(segmentConfigKey) };
    }
    
    // Apply user-specific config
    if (userId) {
      const userConfigKey = `${moduleId}:${userId}`;
      if (this.moduleConfigs.has(userConfigKey)) {
        config = { ...config, ...this.moduleConfigs.get(userConfigKey) };
      }
    }
    
    // Apply region-specific config
    const regionConfigKey = `${moduleId}:region:${region}`;
    if (this.moduleConfigs.has(regionConfigKey)) {
      config = { ...config, ...this.moduleConfigs.get(regionConfigKey) };
    }
    
    return {
      ...module,
      config,
      appliedAt: new Date().toISOString()
    };
  }

  updateModuleConfig(moduleId, options = {}) {
    const { config, segment, userId, region } = options;
    
    let configKey = moduleId;
    if (userId) {
      configKey = `${moduleId}:${userId}`;
    } else if (segment) {
      configKey = `${moduleId}:${segment}`;
    } else if (region) {
      configKey = `${moduleId}:region:${region}`;
    }
    
    this.moduleConfigs.set(configKey, {
      ...this.moduleConfigs.get(configKey),
      ...config,
      updatedAt: new Date().toISOString()
    });
    
    return this.moduleConfigs.get(configKey);
  }

  setModuleConfig(moduleId, userId, config) {
    const configKey = `${moduleId}:${userId}`;
    this.moduleConfigs.set(configKey, config);
  }

  createModule(moduleData) {
    const module = {
      ...moduleData,
      createdAt: moduleData.createdAt || new Date().toISOString()
    };
    
    this.modules.set(moduleData.id, module);
    return module;
  }

  executeModuleAction(moduleId, actionType, options = {}) {
    const { payload, userId, metadata = {} } = options;
    
    const module = this.modules.get(moduleId);
    if (!module) {
      throw new Error(`Module '${moduleId}' not found`);
    }
    
    const action = module.actions.find(a => a === actionType || a.type === actionType);
    if (!action) {
      throw new Error(`Action '${actionType}' not found in module '${moduleId}'`);
    }
    
    // Record action execution
    this.recordModuleEvent(moduleId, 'action_executed', {
      actionType,
      userId,
      payload,
      metadata
    });
    
    // Simulate action execution based on module type
    return this.simulateActionExecution(moduleId, actionType, payload);
  }

  simulateActionExecution(moduleId, actionType, payload) {
    // Simulate different module actions
    switch (moduleId) {
      case 'betting':
        return this.simulateBettingAction(actionType, payload);
      case 'casino':
        return this.simulateCasinoAction(actionType, payload);
      case 'lottery':
        return this.simulateLotteryAction(actionType, payload);
      case 'payments':
        return this.simulatePaymentAction(actionType, payload);
      default:
        return { success: true, result: 'Action executed' };
    }
  }

  simulateBettingAction(actionType, payload) {
    switch (actionType) {
      case 'place-bet':
        return {
          success: true,
          betId: uuidv4(),
          amount: payload.amount,
          odds: payload.odds,
          potentialWin: payload.amount * payload.odds,
          status: 'pending'
        };
      case 'add-to-betslip':
        return {
          success: true,
          selectionId: uuidv4(),
          event: payload.event,
          odds: payload.odds
        };
      case 'get-events':
        return {
          success: true,
          events: [
            {
              id: uuidv4(),
              sport: 'football',
              home: 'Flamengo',
              away: 'Palmeiras',
              date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              odds: { home: 2.1, draw: 3.2, away: 3.8 }
            }
          ]
        };
      default:
        return { success: true };
    }
  }

  simulateCasinoAction(actionType, payload) {
    switch (actionType) {
      case 'launch-game':
        return {
          success: true,
          gameUrl: `https://casino.example.com/game/${payload.gameId}`,
          sessionId: uuidv4(),
          gameId: payload.gameId
        };
      case 'get-game-history':
        return {
          success: true,
          history: [
            {
              gameId: 'slot-1',
              gameName: 'Lucky Slots',
              playedAt: new Date().toISOString(),
              bet: 10,
              win: 25,
              profit: 15
            }
          ]
        };
      default:
        return { success: true };
    }
  }

  simulateLotteryAction(actionType, payload) {
    switch (actionType) {
      case 'buy-ticket':
        return {
          success: true,
          ticketId: uuidv4(),
          numbers: payload.numbers,
          game: payload.game,
          cost: payload.cost,
          drawDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        };
      case 'check-results':
        return {
          success: true,
          results: [1, 15, 23, 35, 42, 58],
          matches: 2,
          prize: 0
        };
      default:
        return { success: true };
    }
  }

  simulatePaymentAction(actionType, payload) {
    switch (actionType) {
      case 'deposit':
        return {
          success: true,
          transactionId: uuidv4(),
          amount: payload.amount,
          method: payload.method,
          status: 'completed',
          newBalance: 1500.00
        };
      case 'get-balance':
        return {
          success: true,
          balance: 1500.00,
          currency: 'BRL',
          lastUpdated: new Date().toISOString()
        };
      default:
        return { success: true };
    }
  }

  getModuleAnalytics(moduleId, options = {}) {
    const { startDate, endDate, segment, region } = options;
    
    // Return simulated analytics data
    return {
      moduleId,
      period: { startDate, endDate },
      metrics: {
        activeUsers: Math.floor(Math.random() * 10000) + 1000,
        actionsExecuted: Math.floor(Math.random() * 50000) + 5000,
        revenue: Math.floor(Math.random() * 100000) + 10000,
        conversionRate: (Math.random() * 0.15 + 0.05).toFixed(3),
        averageSessionDuration: Math.floor(Math.random() * 900) + 300 // seconds
      },
      topActions: [
        { action: 'get-events', count: Math.floor(Math.random() * 1000) + 100 },
        { action: 'place-bet', count: Math.floor(Math.random() * 500) + 50 }
      ]
    };
  }

  setFeatureFlag(moduleId, flagName, options = {}) {
    const { enabled, conditions = {} } = options;
    
    const flagKey = `${moduleId}:${flagName}`;
    this.featureFlags.set(flagKey, {
      moduleId,
      flagName,
      enabled,
      conditions,
      updatedAt: new Date().toISOString()
    });
    
    return this.featureFlags.get(flagKey);
  }

  getFeatureFlag(moduleId, flagName, userContext = {}) {
    const flagKey = `${moduleId}:${flagName}`;
    const flag = this.featureFlags.get(flagKey);
    
    if (!flag) return null;
    
    // Evaluate conditions
    if (flag.conditions && Object.keys(flag.conditions).length > 0) {
      // Simple condition evaluation (can be extended)
      for (const [key, value] of Object.entries(flag.conditions)) {
        if (userContext[key] !== value) {
          return { ...flag, enabled: false, reason: 'condition_not_met' };
        }
      }
    }
    
    return flag;
  }

  getUserModules(userId) {
    const moduleIds = this.userModules.get(userId) || [];
    return moduleIds.map(id => this.modules.get(id)).filter(Boolean);
  }

  recordModuleEvent(moduleId, eventType, data) {
    // Record event for analytics
    const event = {
      moduleId,
      eventType,
      data,
      timestamp: new Date().toISOString()
    };
    
    // In a real implementation, this would go to analytics service
    console.log('Module Event:', event);
  }
}

const moduleStore = new ModuleStore();
module.exports = { moduleStore };