const { v4: uuidv4 } = require('uuid');

class ScreenStore {
  constructor() {
    this.screens = new Map();
    this.screenTemplates = new Map();
    this.abTests = new Map();
    this.screenMetrics = new Map();
    
    this.initializeDefaultScreens();
    this.initializeTemplates();
  }

  initializeDefaultScreens() {
    // Home Screen
    this.screens.set('home', {
      default: {
        layout: {
          type: 'scroll',
          backgroundColor: '#000',
          sections: [
            {
              id: 'welcome',
              type: 'hero',
              components: [
                {
                  id: uuidv4(),
                  type: 'Container',
                  props: {
                    variant: 'card',
                    padding: 'lg',
                    style: { margin: 16, backgroundColor: '#ffffff' }
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'title',
                        text: 'Bem-vindo ao SuperAppBet! 🎯',
                        textAlign: 'center',
                        style: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' }
                      }
                    },
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'subtitle',
                        text: 'Sua plataforma completa de apostas e entretenimento',
                        textAlign: 'center',
                        style: { marginTop: 8, color: '#666666' }
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: 'quickActions',
              type: 'grid',
              title: 'Acesso Rápido',
              components: [
                {
                  id: uuidv4(),
                  type: 'Button',
                  props: {
                    variant: 'primary',
                    size: 'large',
                    title: '⚽ Esportes Ao Vivo',
                    style: { margin: 8 },
                    actions: [
                      { type: 'navigate', payload: { screen: 'sports', params: { live: true } } }
                    ]
                  }
                },
                {
                  id: uuidv4(),
                  type: 'Button',
                  props: {
                    variant: 'secondary',
                    size: 'large',
                    title: '🎰 Casino',
                    style: { margin: 8 },
                    actions: [
                      { type: 'navigate', payload: { screen: 'casino' } }
                    ]
                  }
                },
                {
                  id: uuidv4(),
                  type: 'Button',
                  props: {
                    variant: 'outline',
                    size: 'large',
                    title: '🎲 Loteria',
                    style: { margin: 8 },
                    actions: [
                      { type: 'navigate', payload: { screen: 'lottery' } }
                    ]
                  }
                }
              ]
            },
            {
              id: 'promotions',
              type: 'carousel',
              title: 'Promoções Especiais',
              components: [
                {
                  id: uuidv4(),
                  type: 'PromotionCard',
                  props: {
                    title: 'Bônus de Boas-vindas',
                    description: 'Até R$ 500 no primeiro depósito + 100 giros grátis',
                    imageUrl: 'https://via.placeholder.com/300x150/007bff/ffffff?text=Bonus',
                    ctaText: 'Participar Agora',
                    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    actions: [
                      { type: 'navigate', payload: { screen: 'promotion', params: { id: 'welcome-bonus' } } }
                    ]
                  }
                },
                {
                  id: uuidv4(),
                  type: 'PromotionCard',
                  props: {
                    title: 'Cashback Semanal',
                    description: '10% de volta em todas as apostas esportivas',
                    imageUrl: 'https://via.placeholder.com/300x150/28a745/ffffff?text=Cashback',
                    ctaText: 'Saiba Mais',
                    actions: [
                      { type: 'navigate', payload: { screen: 'promotion', params: { id: 'weekly-cashback' } } }
                    ]
                  }
                },
                {
                  id: uuidv4(),
                  type: 'PromotionCard',
                  props: {
                    title: 'Cashback Semanal',
                    description: '40% de volta em todas as apostas esportivas',
                    imageUrl: 'https://via.placeholder.com/300x150/28a745/ffffff?text=Cashback',
                    ctaText: 'Saiba Mais',
                    actions: [
                      { type: 'navigate', payload: { screen: 'promotion', params: { id: 'weekly-cashback' } } }
                    ]
                  }
                }
              ]
            },
            {
              id: 'featuredGames',
              type: 'grid',
              title: 'Jogos em Destaque',
              components: [
                {
                  id: uuidv4(),
                  type: 'GameCard',
                  props: {
                    gameId: 'mega-roulette',
                    title: 'Mega Roulette',
                    category: 'Live Casino',
                    imageUrl: 'https://via.placeholder.com/150x100/dc3545/ffffff?text=Roulette',
                    jackpot: 'R$ 2.5M',
                    actions: [
                      { type: 'module_action', payload: { module: 'casino', action: 'launch-game', gameId: 'mega-roulette' } }
                    ]
                  }
                },
                {
                  id: uuidv4(),
                  type: 'GameCard',
                  props: {
                    gameId: 'starburst',
                    title: 'Starburst',
                    category: 'Slots',
                    imageUrl: 'https://via.placeholder.com/150x100/ffc107/ffffff?text=Starburst',
                    actions: [
                      { type: 'module_action', payload: { module: 'casino', action: 'launch-game', gameId: 'starburst' } }
                    ]
                  }
                }
              ]
            }
          ]
        },
        metadata: {
          name: 'Home Screen',
          version: 2,
          lastUpdated: new Date().toISOString(),
          personalizable: true,
          cacheTTL: 300 // 5 minutes
        }
      }
    });

    // Sports Screen
    this.screens.set('sports', {
      default: {
        layout: {
          type: 'tabs',
          backgroundColor: '#ffffff',
          tabs: [
            {
              id: 'live',
              title: '🔴 Ao Vivo',
              icon: 'live',
              components: [
                {
                  id: uuidv4(),
                  type: 'Container',
                  props: {
                    padding: 'md',
                    style: { backgroundColor: '#fff3cd', margin: 16, borderRadius: 8 }
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'subtitle',
                        text: '⚡ Eventos Ao Vivo',
                        fontWeight: 'bold',
                        style: { color: '#856404' }
                      }
                    },
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'body',
                        text: 'Aposte em tempo real nos melhores jogos',
                        style: { color: '#856404', marginTop: 4 }
                      }
                    }
                  ]
                },
                {
                  id: uuidv4(),
                  type: 'QuickBetCard',
                  props: {
                    eventId: 'flamengo-palmeiras',
                    homeTeam: 'Flamengo',
                    awayTeam: 'Palmeiras',
                    league: 'Brasileirão',
                    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                    odds: { home: 2.10, draw: 3.20, away: 3.80 },
                    live: true,
                    score: { home: 1, away: 0 },
                    minute: '67\'',
                    actions: [
                      { type: 'module_action', payload: { module: 'betting', action: 'view-event', eventId: 'flamengo-palmeiras' } }
                    ]
                  }
                }
              ]
            },
            {
              id: 'football',
              title: '⚽ Futebol',
              icon: 'soccer',
              components: [
                {
                  id: uuidv4(),
                  type: 'Text',
                  props: {
                    variant: 'title',
                    text: 'Campeonatos de Futebol',
                    style: { padding: 16, fontWeight: 'bold' }
                  }
                },
                {
                  id: uuidv4(),
                  type: 'QuickBetCard',
                  props: {
                    eventId: 'santos-corinthians',
                    homeTeam: 'Santos',
                    awayTeam: 'Corinthians',
                    league: 'Brasileirão',
                    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    odds: { home: 2.45, draw: 3.10, away: 2.90 },
                    live: false,
                    actions: [
                      { type: 'module_action', payload: { module: 'betting', action: 'view-event', eventId: 'santos-corinthians' } }
                    ]
                  }
                }
              ]
            },
            {
              id: 'basketball',
              title: '🏀 Basquete',
              icon: 'basketball',
              components: [
                {
                  id: uuidv4(),
                  type: 'Text',
                  props: {
                    variant: 'title',
                    text: 'NBA e NBB',
                    style: { padding: 16 }
                  }
                }
              ]
            }
          ]
        },
        metadata: {
          name: 'Sports Screen',
          version: 1,
          lastUpdated: new Date().toISOString(),
          dynamicContent: true,
          refreshInterval: 30 // seconds
        }
      }
    });

    // Casino Screen
    this.screens.set('casino', {
      default: {
        layout: {
          type: 'sections',
          backgroundColor: '#1a1a1a',
          sections: [
            {
              id: 'jackpot',
              type: 'banner',
              title: 'Mega Jackpot',
              components: [
                {
                  id: uuidv4(),
                  type: 'Container',
                  props: {
                    style: {
                      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                      padding: 20,
                      margin: 16,
                      borderRadius: 12,
                      alignItems: 'center'
                    }
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        text: '💰 MEGA JACKPOT',
                        style: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' }
                      }
                    },
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        text: 'R$ 15.847.239',
                        style: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a', marginTop: 8 }
                      }
                    },
                    {
                      id: uuidv4(),
                      type: 'Button',
                      props: {
                        title: 'Jogar Agora',
                        variant: 'primary',
                        style: { marginTop: 12, backgroundColor: '#1a1a1a' },
                        actions: [
                          { type: 'module_action', payload: { module: 'casino', action: 'launch-game', gameId: 'mega-jackpot' } }
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: 'featured',
              type: 'carousel',
              title: '⭐ Jogos em Destaque',
              components: [
                {
                  id: uuidv4(),
                  type: 'GameCard',
                  props: {
                    gameId: 'book-of-ra',
                    title: 'Book of Ra',
                    category: 'Slots Egípcias',
                    imageUrl: 'https://via.placeholder.com/200x120/4a90e2/ffffff?text=Book+of+Ra',
                    rtp: '95.1%',
                    features: ['Free Spins', 'Gamble Feature'],
                    actions: [
                      { type: 'module_action', payload: { module: 'casino', action: 'launch-game', gameId: 'book-of-ra' } }
                    ]
                  }
                },
                {
                  id: uuidv4(),
                  type: 'GameCard',
                  props: {
                    gameId: 'blackjack-classic',
                    title: 'Blackjack Clássico',
                    category: 'Mesa',
                    imageUrl: 'https://via.placeholder.com/200x120/2d5aa0/ffffff?text=Blackjack',
                    minBet: 'R$ 5',
                    maxBet: 'R$ 5.000',
                    actions: [
                      { type: 'module_action', payload: { module: 'casino', action: 'launch-game', gameId: 'blackjack-classic' } }
                    ]
                  }
                }
              ]
            },
            {
              id: 'live-casino',
              type: 'grid',
              title: '🎥 Casino Ao Vivo',
              components: [
                {
                  id: uuidv4(),
                  type: 'GameCard',
                  props: {
                    gameId: 'live-roulette',
                    title: 'Roleta Evolution',
                    category: 'Ao Vivo',
                    imageUrl: 'https://via.placeholder.com/150x100/dc3545/ffffff?text=Live+Roulette',
                    dealer: 'Ana Silva',
                    players: 247,
                    actions: [
                      { type: 'module_action', payload: { module: 'casino', action: 'launch-game', gameId: 'live-roulette' } }
                    ]
                  }
                }
              ]
            }
          ]
        },
        metadata: {
          name: 'Casino Screen',
          version: 1,
          lastUpdated: new Date().toISOString(),
          ageRestriction: 18,
          geoRestrictions: ['BR']
        }
      }
    });
  }

  initializeTemplates() {
    this.screenTemplates.set('promotional-landing', {
      id: 'promotional-landing',
      name: 'Promotional Landing Page',
      description: 'Template for promotional campaigns and special offers',
      category: 'marketing',
      layout: {
        type: 'scroll',
        sections: [
          {
            id: 'hero',
            type: 'hero',
            customizable: true,
            components: [
              {
                type: 'Container',
                props: { variant: 'card', padding: 'lg' },
                children: [
                  { type: 'Text', props: { variant: 'title', text: '{{PROMO_TITLE}}' } },
                  { type: 'Text', props: { variant: 'subtitle', text: '{{PROMO_DESCRIPTION}}' } },
                  { type: 'Button', props: { variant: 'primary', title: '{{CTA_TEXT}}' } }
                ]
              }
            ]
          }
        ]
      },
      variables: ['PROMO_TITLE', 'PROMO_DESCRIPTION', 'CTA_TEXT'],
      createdAt: new Date().toISOString()
    });

    this.screenTemplates.set('game-category', {
      id: 'game-category',
      name: 'Game Category Page',
      description: 'Template for casino game category pages',
      category: 'casino',
      layout: {
        type: 'grid',
        sections: [
          {
            id: 'header',
            type: 'header',
            components: [
              { type: 'Text', props: { variant: 'title', text: '{{CATEGORY_NAME}}' } }
            ]
          },
          {
            id: 'games',
            type: 'grid',
            components: [
              { type: 'GameCarousel', props: { category: '{{CATEGORY_ID}}' } }
            ]
          }
        ]
      },
      variables: ['CATEGORY_NAME', 'CATEGORY_ID'],
      createdAt: new Date().toISOString()
    });
  }

  getHomeScreenConfig(options = {}) {
    const { userId, segment, variant } = options;
    const screen = this.screens.get('home');
    let config = screen[variant] || screen.default;

    // Personalize based on user segment
    if (segment === 'vip') {
      config = this.addVIPElements(config);
    } else if (segment === 'new-user') {
      config = this.addNewUserElements(config);
    }

    return this.personalizeForUser(config, userId);
  }

  getSportsScreenConfig(options = {}) {
    const { userId, sport, showLive } = options;
    const screen = this.screens.get('sports');
    let config = { ...screen.default };

    // Filter tabs based on sport preference
    if (sport) {
      config.layout.tabs = config.layout.tabs.filter(tab => 
        tab.id === 'live' || tab.id === sport
      );
    }

    // Prioritize live tab if requested
    if (showLive) {
      const liveTab = config.layout.tabs.find(tab => tab.id === 'live');
      if (liveTab) {
        config.layout.tabs = [liveTab, ...config.layout.tabs.filter(tab => tab.id !== 'live')];
      }
    }

    return config;
  }

  getCasinoScreenConfig(options = {}) {
    const { userId, category, gameType } = options;
    const screen = this.screens.get('casino');
    let config = { ...screen.default };

    // Filter sections based on category
    if (category && category !== 'featured') {
      config.layout.sections = config.layout.sections.filter(section => 
        section.id === category || section.id === 'jackpot'
      );
    }

    return config;
  }

  getLotteryScreenConfig(options = {}) {
    const { userId, region } = options;
    
    // Generate lottery screen based on region
    return {
      layout: {
        type: 'scroll',
        sections: [
          {
            id: 'hero',
            type: 'hero',
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: { variant: 'card', padding: 'lg' },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '🎲 Loterias Nacionais',
                      textAlign: 'center'
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'subtitle',
                      text: 'Aposte nos maiores prêmios do Brasil',
                      textAlign: 'center'
                    }
                  }
                ]
              }
            ]
          },
          {
            id: 'games',
            type: 'grid',
            title: 'Modalidades Disponíveis',
            components: this.getLotteryGames(region)
          }
        ]
      },
      metadata: {
        name: 'Lottery Screen',
        region,
        version: 1,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  getProfileScreenConfig(options = {}) {
    const { userId, section } = options;
    
    return {
      layout: {
        type: 'sections',
        sections: [
          {
            id: 'header',
            type: 'profile-header',
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: { padding: 'lg' },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '👤 Meu Perfil'
                    }
                  }
                ]
              }
            ]
          },
          {
            id: 'menu',
            type: 'menu',
            components: [
              {
                id: uuidv4(),
                type: 'Button',
                props: {
                  variant: 'outline',
                  title: '💰 Carteira',
                  actions: [
                    { type: 'navigate', payload: { screen: 'wallet' } }
                  ]
                }
              },
              {
                id: uuidv4(),
                type: 'Button',
                props: {
                  variant: 'outline',
                  title: '📊 Histórico de Apostas',
                  actions: [
                    { type: 'navigate', payload: { screen: 'bet-history' } }
                  ]
                }
              },
              {
                id: uuidv4(),
                type: 'Button',
                props: {
                  variant: 'outline',
                  title: '⚙️ Configurações',
                  actions: [
                    { type: 'navigate', payload: { screen: 'settings' } }
                  ]
                }
              }
            ]
          }
        ]
      },
      metadata: {
        name: 'Profile Screen',
        userId,
        section,
        version: 1,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  getLotteryGames(region) {
    const games = [
      {
        id: uuidv4(),
        type: 'LotteryCard',
        props: {
          gameId: 'mega-sena',
          title: 'Mega-Sena',
          description: 'Acumular prêmio de R$ 45 milhões',
          nextDraw: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          price: 'R$ 4,50',
          actions: [
            { type: 'module_action', payload: { module: 'lottery', action: 'buy-ticket', game: 'mega-sena' } }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'LotteryCard',
        props: {
          gameId: 'quina',
          title: 'Quina',
          description: 'Prêmio estimado R$ 2,5 milhões',
          nextDraw: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          price: 'R$ 2,00',
          actions: [
            { type: 'module_action', payload: { module: 'lottery', action: 'buy-ticket', game: 'quina' } }
          ]
        }
      }
    ];

    return games;
  }

  addVIPElements(config) {
    // Add VIP-specific components
    const vipSection = {
      id: 'vip-benefits',
      type: 'banner',
      components: [
        {
          id: uuidv4(),
          type: 'Container',
          props: {
            style: { backgroundColor: '#ffd700', padding: 16, margin: 16, borderRadius: 8 }
          },
          children: [
            {
              id: uuidv4(),
              type: 'Text',
              props: {
                text: '👑 VIP EXCLUSIVO',
                style: { fontWeight: 'bold', color: '#1a1a1a' }
              }
            },
            {
              id: uuidv4(),
              type: 'Text',
              props: {
                text: 'Acesso aos melhores bônus e promoções',
                style: { color: '#1a1a1a' }
              }
            }
          ]
        }
      ]
    };

    const newConfig = { ...config };
    newConfig.layout.sections = [vipSection, ...newConfig.layout.sections];
    return newConfig;
  }

  addNewUserElements(config) {
    // Add new user onboarding elements
    const welcomeSection = {
      id: 'new-user-welcome',
      type: 'onboarding',
      components: [
        {
          id: uuidv4(),
          type: 'Container',
          props: {
            style: { backgroundColor: '#e3f2fd', padding: 16, margin: 16, borderRadius: 8 }
          },
          children: [
            {
              id: uuidv4(),
              type: 'Text',
              props: {
                text: '🎉 Bem-vindo!',
                style: { fontWeight: 'bold', fontSize: 18 }
              }
            },
            {
              id: uuidv4(),
              type: 'Text',
              props: {
                text: 'Complete seu perfil e ganhe R$ 50 de bônus',
                style: { marginTop: 8 }
              }
            },
            {
              id: uuidv4(),
              type: 'Button',
              props: {
                title: 'Completar Perfil',
                variant: 'primary',
                style: { marginTop: 12 },
                actions: [
                  { type: 'navigate', payload: { screen: 'profile-completion' } }
                ]
              }
            }
          ]
        }
      ]
    };

    const newConfig = { ...config };
    newConfig.layout.sections = [welcomeSection, ...newConfig.layout.sections];
    return newConfig;
  }

  personalizeForUser(config, userId) {
    if (!userId) return config;
    
    // Apply user-specific personalizations
    // This could include preferred sports, game history, etc.
    return config;
  }

  updateScreenLayout(screenName, variant, updateData) {
    if (!this.screens.has(screenName)) {
      throw new Error(`Screen '${screenName}' not found`);
    }

    const screen = this.screens.get(screenName);
    if (!screen[variant]) {
      screen[variant] = { ...screen.default };
    }

    screen[variant] = {
      ...screen[variant],
      layout: { ...screen[variant].layout, ...updateData.layout },
      metadata: {
        ...screen[variant].metadata,
        ...updateData,
        updatedAt: new Date().toISOString()
      }
    };

    this.screens.set(screenName, screen);
    return screen[variant];
  }

  addComponentToScreen(screenName, variant, component) {
    const screen = this.screens.get(screenName);
    if (!screen || !screen[variant]) {
      throw new Error(`Screen '${screenName}' variant '${variant}' not found`);
    }

    const config = screen[variant];
    if (!config.layout.sections) {
      config.layout.sections = [];
    }

    // Add to appropriate section based on position
    const targetSection = config.layout.sections.find(s => s.id === component.position?.sectionId) 
      || config.layout.sections[0];

    if (targetSection) {
      targetSection.components.push(component);
    }

    this.screens.set(screenName, screen);
    return component;
  }

  removeComponentFromScreen(screenName, variant, componentId) {
    const screen = this.screens.get(screenName);
    if (!screen || !screen[variant]) {
      throw new Error(`Screen '${screenName}' variant '${variant}' not found`);
    }

    const config = screen[variant];
    config.layout.sections?.forEach(section => {
      section.components = section.components.filter(c => c.id !== componentId);
    });

    this.screens.set(screenName, screen);
  }

  updateComponentProps(screenName, variant, componentId, updateData) {
    const screen = this.screens.get(screenName);
    if (!screen || !screen[variant]) {
      throw new Error(`Screen '${screenName}' variant '${variant}' not found`);
    }

    const config = screen[variant];
    let targetComponent = null;

    config.layout.sections?.forEach(section => {
      const component = section.components.find(c => c.id === componentId);
      if (component) {
        Object.assign(component, updateData);
        targetComponent = component;
      }
    });

    if (targetComponent) {
      this.screens.set(screenName, screen);
      return targetComponent;
    }

    throw new Error(`Component '${componentId}' not found`);
  }

  createABTest(screenName, testData) {
    const testId = testData.id || uuidv4();
    
    this.abTests.set(testId, {
      ...testData,
      screenName,
      createdAt: new Date().toISOString(),
      status: 'active'
    });

    return this.abTests.get(testId);
  }

  getScreenMetrics(screenName, options = {}) {
    // Return mock metrics data
    return {
      screenName,
      period: options,
      views: Math.floor(Math.random() * 10000) + 1000,
      uniqueUsers: Math.floor(Math.random() * 5000) + 500,
      averageTimeOnScreen: Math.floor(Math.random() * 180) + 30,
      bounceRate: (Math.random() * 0.4 + 0.1).toFixed(3),
      conversionRate: (Math.random() * 0.15 + 0.05).toFixed(3),
      topComponents: [
        { componentId: 'hero-banner', interactions: Math.floor(Math.random() * 2000) + 200 },
        { componentId: 'quick-actions', interactions: Math.floor(Math.random() * 1500) + 150 }
      ]
    };
  }

  getScreenTemplates() {
    return Array.from(this.screenTemplates.values());
  }

  createScreenFromTemplate(screenName, templateId, options = {}) {
    const template = this.screenTemplates.get(templateId);
    if (!template) {
      throw new Error(`Template '${templateId}' not found`);
    }

    const { customizations = {} } = options;
    
    // Clone template and apply customizations
    let screenConfig = JSON.parse(JSON.stringify(template.layout));
    
    // Replace template variables
    if (template.variables && customizations.variables) {
      const configString = JSON.stringify(screenConfig);
      const replacedString = template.variables.reduce((str, variable) => {
        const value = customizations.variables[variable] || `{{${variable}}}`;
        return str.replace(new RegExp(`{{${variable}}}`, 'g'), value);
      }, configString);
      screenConfig = JSON.parse(replacedString);
    }

    // Create new screen
    if (!this.screens.has(screenName)) {
      this.screens.set(screenName, {});
    }

    const screen = this.screens.get(screenName);
    screen.default = {
      layout: screenConfig,
      metadata: {
        name: screenName,
        createdFromTemplate: templateId,
        createdAt: new Date().toISOString(),
        version: 1
      }
    };

    this.screens.set(screenName, screen);
    return screen.default;
  }
}

const screenStore = new ScreenStore();
module.exports = { screenStore };