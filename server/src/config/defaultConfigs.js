const { sduiStore } = require('../store/sduiStore');
const { moduleStore } = require('../store/moduleStore');

function initializeDefaultConfigs() {
  console.log('🔧 Initializing default SDUI configurations...');
  
  // Default configurations are already initialized in the stores
  // This function can be used to add additional setup
  
  // Log initialization status
  console.log('✅ SDUI Store initialized with default screens and components');
  console.log('✅ Module Store initialized with default modules');
  
  // Initialize some sample A/B tests
  initializeSampleABTests();
  
  // Initialize sample user segments
  initializeSampleUserSegments();
  
  console.log('🎯 Default configurations initialized successfully');
}

function initializeSampleABTests() {
  // Sample A/B test for home screen hero section
  const homeHeroTest = {
    id: 'home-hero-v2',
    name: 'Home Hero Section V2',
    screenName: 'home',
    description: 'Testing new hero section design with better CTA placement',
    variants: [
      {
        name: 'control',
        trafficSplit: 50,
        description: 'Original hero section'
      },
      {
        name: 'variant_a',
        trafficSplit: 50,
        description: 'New hero with prominent CTA button'
      }
    ],
    conditions: {
      platform: ['ios', 'android'],
      userSegment: ['new-user', 'returning']
    },
    metrics: ['conversion_rate', 'click_through_rate', 'time_on_screen'],
    status: 'active',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'system'
  };
  
  // Sample A/B test for betting module
  const bettingQuickBetTest = {
    id: 'betting-quick-bet-v1',
    name: 'Quick Bet Button Placement',
    screenName: 'sports',
    description: 'Testing quick bet button placement on event cards',
    variants: [
      {
        name: 'control',
        trafficSplit: 33.33,
        description: 'Quick bet button at bottom'
      },
      {
        name: 'variant_a',
        trafficSplit: 33.33,
        description: 'Quick bet button at top right'
      },
      {
        name: 'variant_b',
        trafficSplit: 33.34,
        description: 'Quick bet button overlaid on odds'
      }
    ],
    conditions: {
      module: 'betting',
      userSegment: ['active-bettor']
    },
    metrics: ['bet_placement_rate', 'average_bet_amount'],
    status: 'active',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'system'
  };
  
  console.log('🧪 Sample A/B tests initialized');
}

function initializeSampleUserSegments() {
  const segments = [
    {
      id: 'new-user',
      name: 'New Users',
      description: 'Users registered within the last 7 days',
      conditions: {
        registrationDate: { withinDays: 7 },
        totalDeposits: { lessThan: 1 }
      },
      enabledModules: ['betting'],
      customizations: {
        showOnboarding: true,
        promotionalContent: 'welcome-bonus'
      }
    },
    {
      id: 'active-bettor',
      name: 'Active Bettors',
      description: 'Users who placed bets in the last 30 days',
      conditions: {
        lastBetDate: { withinDays: 30 },
        totalBets: { greaterThan: 5 }
      },
      enabledModules: ['betting', 'casino'],
      customizations: {
        showLiveEvents: true,
        prioritizeSportsContent: true
      }
    },
    {
      id: 'high-roller',
      name: 'High Rollers',
      description: 'Users with high betting volume and deposits',
      conditions: {
        totalDeposits: { greaterThan: 10000 },
        averageBetAmount: { greaterThan: 500 }
      },
      enabledModules: ['betting', 'casino', 'lottery', 'payments'],
      customizations: {
        vipTreatment: true,
        higherLimits: true,
        personalizedOffers: true
      }
    },
    {
      id: 'casino-lover',
      name: 'Casino Enthusiasts',
      description: 'Users who primarily play casino games',
      conditions: {
        casinoSessionsRatio: { greaterThan: 0.7 },
        lastCasinoSession: { withinDays: 7 }
      },
      enabledModules: ['casino', 'payments'],
      customizations: {
        prioritizeCasinoContent: true,
        showJackpots: true,
        gameRecommendations: true
      }
    },
    {
      id: 'dormant',
      name: 'Dormant Users',
      description: 'Users who haven\'t been active recently',
      conditions: {
        lastLoginDate: { olderThanDays: 30 },
        lastBetDate: { olderThanDays: 60 }
      },
      enabledModules: ['betting'],
      customizations: {
        reactivationCampaign: true,
        specialOffers: true
      }
    },
    {
      id: 'mobile-only',
      name: 'Mobile-Only Users',
      description: 'Users who only access via mobile apps',
      conditions: {
        platform: ['ios', 'android'],
        webSessionsRatio: { lessThan: 0.1 }
      },
      enabledModules: ['betting', 'casino', 'lottery'],
      customizations: {
        mobileOptimized: true,
        pushNotifications: true
      }
    }
  ];
  
  console.log(`👥 ${segments.length} user segments initialized`);
}

// Sample feature flags configuration
function initializeFeatureFlags() {
  const featureFlags = [
    {
      module: 'betting',
      flag: 'live-streaming',
      enabled: true,
      conditions: {
        userSegment: ['active-bettor', 'high-roller'],
        platform: ['ios', 'android']
      },
      rolloutPercentage: 50
    },
    {
      module: 'casino',
      flag: 'virtual-reality-games',
      enabled: false,
      conditions: {
        platform: ['ios'],
        appVersion: { minimumVersion: '2.0.0' }
      },
      rolloutPercentage: 5
    },
    {
      module: 'payments',
      flag: 'cryptocurrency-deposits',
      enabled: true,
      conditions: {
        userSegment: ['high-roller'],
        geoLocation: ['BR', 'PT']
      },
      rolloutPercentage: 25
    },
    {
      module: 'core',
      flag: 'dark-mode',
      enabled: true,
      conditions: {},
      rolloutPercentage: 100
    },
    {
      module: 'betting',
      flag: 'cash-out',
      enabled: true,
      conditions: {
        userSegment: ['active-bettor', 'high-roller']
      },
      rolloutPercentage: 80
    }
  ];
  
  // Set feature flags in module store
  featureFlags.forEach(flag => {
    moduleStore.setFeatureFlag(flag.module, flag.flag, {
      enabled: flag.enabled,
      conditions: flag.conditions,
      rolloutPercentage: flag.rolloutPercentage
    });
  });
  
  console.log(`🚩 ${featureFlags.length} feature flags initialized`);
}

// Sample promotional campaigns
function initializePromotionalCampaigns() {
  const campaigns = [
    {
      id: 'welcome-bonus-2024',
      name: 'Welcome Bonus 2024',
      type: 'signup-bonus',
      description: 'Get up to R$ 500 + 100 free spins on first deposit',
      startDate: new Date('2024-01-01').toISOString(),
      endDate: new Date('2024-12-31').toISOString(),
      targetSegments: ['new-user'],
      components: {
        bannerText: 'Bônus de Boas-vindas: Até R$ 500!',
        ctaText: 'Depositar Agora',
        terms: 'Depósito mínimo R$ 20. Rollover 35x. T&C aplicam.'
      },
      active: true
    },
    {
      id: 'weekend-cashback',
      name: 'Weekend Cashback',
      type: 'cashback',
      description: '20% cashback on all weekend bets',
      recurring: true,
      schedule: {
        dayOfWeek: [6, 0], // Saturday and Sunday
        startTime: '00:00',
        endTime: '23:59'
      },
      targetSegments: ['active-bettor'],
      components: {
        bannerText: '🎉 20% Cashback no Final de Semana!',
        ctaText: 'Apostar Agora',
        terms: 'Cashback até R$ 1.000. Válido para apostas esportivas.'
      },
      active: true
    },
    {
      id: 'vip-exclusive',
      name: 'VIP Exclusive Offers',
      type: 'vip-program',
      description: 'Exclusive offers for VIP members',
      targetSegments: ['high-roller'],
      components: {
        bannerText: '👑 Ofertas VIP Exclusivas',
        ctaText: 'Ver Ofertas',
        terms: 'Apenas para membros VIP. Ofertas limitadas.'
      },
      active: true
    }
  ];
  
  console.log(`🎪 ${campaigns.length} promotional campaigns initialized`);
}

// Sample content personalization rules
function initializePersonalizationRules() {
  const personalizationRules = [
    {
      id: 'sports-preference',
      name: 'Sports Content Preference',
      description: 'Show preferred sports content first',
      trigger: 'screen_load',
      conditions: {
        screen: 'sports',
        userHasPreferences: true
      },
      action: {
        type: 'reorder_content',
        priority: 'user_preferences'
      }
    },
    {
      id: 'game-recommendations',
      name: 'Casino Game Recommendations',
      description: 'Recommend games based on play history',
      trigger: 'screen_load',
      conditions: {
        screen: 'casino',
        userSegment: ['casino-lover']
      },
      action: {
        type: 'inject_component',
        component: 'GameRecommendations',
        position: 'top'
      }
    },
    {
      id: 'balance-warning',
      name: 'Low Balance Warning',
      description: 'Show deposit CTA when balance is low',
      trigger: 'balance_check',
      conditions: {
        balance: { lessThan: 50 }
      },
      action: {
        type: 'show_notification',
        component: 'DepositCTA',
        urgency: 'medium'
      }
    }
  ];
  
  console.log(`🎯 ${personalizationRules.length} personalization rules initialized`);
}

module.exports = {
  initializeDefaultConfigs,
  initializeSampleABTests,
  initializeSampleUserSegments,
  initializeFeatureFlags,
  initializePromotionalCampaigns,
  initializePersonalizationRules
};