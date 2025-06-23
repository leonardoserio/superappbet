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
                    title: 'Teste novo card',
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

    return {
      layout: {
        type: 'scroll',
        backgroundColor: '#fafafa',
        sections: [
          // Hero Section with Welcome Message
          {
            id: 'hero-section',
            type: 'r',
            style: { padding: 0 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: {
                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                    padding: 20,
                    paddingTop: 60,
                    paddingBottom: 30
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '🏆 SuperAppBet',
                      style: { 
                        fontSize: 28, 
                        fontWeight: '800', 
                        color: '#000', 
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'subtitle',
                      text: 'Bem-vindo ao futuro das apostas',
                      style: { 
                        fontSize: 16, 
                        color: 'rgba(0, 0, 0, 0.9)', 
                        textAlign: 'center'
                      }
                    }
                  }
                ]
              }
            ]
          },

          // Quick Actions Section
          {
            id: 'quick-actions',
            type: 'flex',
            style: { paddingHorizontal: 16, marginTop: 20 },
            components: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  variant: 'title',
                  text: 'Ações Rápidas',
                  style: { 
                    fontSize: 20, 
                    fontWeight: '700', 
                    color: '#171717', 
                    marginBottom: 16 
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: { 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    marginBottom: 20
                  }
                },
                children: [
                  // Sports Quick Action
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        flex: 1,
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 20,
                        marginRight: 8,
                        alignItems: 'center',
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '⚽',
                          style: { fontSize: 32, marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Esportes',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  },
                  // Casino Quick Action
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        flex: 1,
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 20,
                        marginHorizontal: 4,
                        alignItems: 'center',
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🎰',
                          style: { fontSize: 32, marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Casino',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  },
                  // Lottery Quick Action
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        flex: 1,
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 20,
                        marginLeft: 8,
                        alignItems: 'center',
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🎲',
                          style: { fontSize: 32, marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Loterias',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Promotions Section
          {
            id: 'promotions-section',
            type: 'carousel',
            style: { paddingLeft: 16, marginTop: 20},
            title: 'Promoções em Destaque',
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    // width: 280,
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginRight: 16,
                    elevation: 3,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '🚀',
                      style: { fontSize: 32, marginBottom: 12 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'Bônus de Boas-vindas',
                      style: { 
                        fontSize: 18, 
                        fontWeight: '700', 
                        color: '#171717',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: 'Ganhe 100% até R$ 500 no seu primeiro depósito',
                      style: { 
                        fontSize: 14, 
                        color: '#737373',
                        marginBottom: 16,
                        lineHeight: 20
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Button',
                    props: {
                      variant: 'primary',
                      title: 'Participar',
                      style: {
                        backgroundColor: '#0ea5e9',
                        borderRadius: 8,
                        paddingVertical: 12
                      },
                      actions: [
                        { type: 'navigate', payload: { screen: 'promotion-details' } }
                      ]
                    }
                  }
                ]
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    width: 280,
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginRight: 16,
                    elevation: 3,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '⚡',
                      style: { fontSize: 32, marginBottom: 12 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'Odds Turbinadas',
                      style: { 
                        fontSize: 18, 
                        fontWeight: '700', 
                        color: '#171717',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: 'Odds aumentadas em jogos selecionados todos os dias',
                      style: { 
                        fontSize: 14, 
                        color: '#737373',
                        marginBottom: 16,
                        lineHeight: 20
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Button',
                    props: {
                      variant: 'secondary',
                      title: 'Ver Jogos',
                      style: {
                        backgroundColor: '#f59e0b',
                        borderRadius: 8,
                        paddingVertical: 12
                      },
                      actions: [
                        { type: 'navigate', payload: { screen: 'boosted-odds' } }
                      ]
                    }
                  }
                ]
              }
            ]
          },

          // Live Matches Section
          {
            id: 'live-matches',
            type: 'default',
            style: { paddingHorizontal: 16, marginTop: 30 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: { 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 16
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '🔴 Ao Vivo',
                      style: { 
                        fontSize: 20, 
                        fontWeight: '700', 
                        color: '#171717'
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: 'Ver todos ›',
                      style: { 
                        fontSize: 14, 
                        color: '#0ea5e9',
                        fontWeight: '600'
                      }
                    }
                  }
                ]
              },
              // Live Match Card
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 12,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { flex: 1 } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'subtitle',
                              text: 'Flamengo vs Palmeiras',
                              style: { 
                                fontSize: 16, 
                                fontWeight: '600', 
                                color: '#171717',
                                marginBottom: 4
                              }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'caption',
                              text: 'Brasileirão • 75\' - 2º Tempo',
                              style: { 
                                fontSize: 12, 
                                color: '#737373'
                              }
                            }
                          }
                        ]
                      },
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: {
                          variant: 'default',
                          style: {
                            backgroundColor: '#ef4444',
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 4
                          }
                        },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'caption',
                              text: 'AO VIVO',
                              style: { 
                                fontSize: 10, 
                                color: '#ffffff',
                                fontWeight: '700'
                              }
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '2 - 1',
                      style: { 
                        fontSize: 24, 
                        fontWeight: '800', 
                        color: '#0ea5e9',
                        textAlign: 'center',
                        marginBottom: 16
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between'
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: '1 - 2.10',
                          style: {
                            flex: 1,
                            marginRight: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: 'X - 3.40',
                          style: {
                            flex: 1,
                            marginHorizontal: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: '2 - 4.20',
                          style: {
                            flex: 1,
                            marginLeft: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Popular Games Section
          {
            id: 'popular-games',
            type: 'flex',
            style: { paddingHorizontal: 16, marginTop: 30, paddingBottom: 30 },
            components: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  variant: 'title',
                  text: 'Jogos Populares',
                  style: { 
                    fontSize: 20, 
                    fontWeight: '700', 
                    color: '#171717',
                    marginBottom: 16
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: { 
                    flexDirection: 'row', 
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }
                },
                children: [
                  // Aviator Game
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 16,
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '✈️',
                          style: { fontSize: 32, textAlign: 'center', marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Aviator',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 4
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: '🔥 Em alta',
                          style: { 
                            fontSize: 12, 
                            color: '#ef4444',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  },
                  // Fortune Tiger
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 16,
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🐅',
                          style: { fontSize: 32, textAlign: 'center', marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Fortune Tiger',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 4
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: '💰 Jackpot',
                          style: { 
                            fontSize: 12, 
                            color: '#f59e0b',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      metadata: {
        name: 'Home Screen',
        userId,
        segment,
        variant,
        version: 1,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  getSportsScreenConfig(options = {}) {
    const { userId, sport, showLive } = options;

    return {
      layout: {
        type: 'scroll',
        backgroundColor: '#fafafa',
        sections: [
          // Sports Header
          {
            id: 'sports-header',
            type: 'hero',
            style: { padding: 0 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: {
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    padding: 20,
                    paddingTop: 60,
                    paddingBottom: 30,
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '⚽ Esportes',
                      style: { 
                        fontSize: 28, 
                        fontWeight: '800', 
                        color: '#000', 
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'subtitle',
                      text: 'As melhores odds do mercado',
                      style: { 
                        fontSize: 16, 
                        color: 'rgba(0, 0, 0, 0.9)', 
                        textAlign: 'center'
                      }
                    }
                  }
                ]
              }
            ]
          },

          // Quick Sports Categories
          {
            id: 'sports-categories',
            type: 'carousel',
            style: { paddingLeft: 16, marginTop: 20,flex:1},
            components: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  variant: 'title',
                  text: 'Modalidades',
                  style: { 
                    fontSize: 20, 
                    fontWeight: '700', 
                    color: '#171717',
                    marginBottom: 16,
                    paddingHorizontal: 0
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    width: 120,
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 16,
                    marginRight: 12,
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '⚽',
                      style: { fontSize: 28, marginBottom: 8 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'caption',
                      text: 'Futebol',
                      style: { 
                        fontSize: 12, 
                        fontWeight: '600', 
                        color: '#171717',
                        textAlign: 'center'
                      }
                    }
                  }
                ]
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    width: 120,
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 16,
                    marginRight: 12,
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '🏀',
                      style: { fontSize: 28, marginBottom: 8 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'caption',
                      text: 'Basquete',
                      style: { 
                        fontSize: 12, 
                        fontWeight: '600', 
                        color: '#171717',
                        textAlign: 'center'
                      }
                    }
                  }
                ]
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    width: 120,
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 16,
                    marginRight: 12,
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '🎾',
                      style: { fontSize: 28, marginBottom: 8 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'caption',
                      text: 'Tênis',
                      style: { 
                        fontSize: 12, 
                        fontWeight: '600', 
                        color: '#171717',
                        textAlign: 'center'
                      }
                    }
                  }
                ]
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    width: 120,
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 16,
                    marginRight: 12,
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '🏈',
                      style: { fontSize: 28, marginBottom: 8 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'caption',
                      text: 'NFL',
                      style: { 
                        fontSize: 12, 
                        fontWeight: '600', 
                        color: '#171717',
                        textAlign: 'center'
                      }
                    }
                  }
                ]
              }
            ]
          },

          // Live Matches Section
          {
            id: 'live-matches-section',
            type: 'default',
            style: { paddingHorizontal: 16, marginTop: 30 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: { 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 16
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '🔴 Jogos ao Vivo',
                      style: { 
                        fontSize: 20, 
                        fontWeight: '700', 
                        color: '#171717'
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: {
                        backgroundColor: '#ef4444',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: '3 AO VIVO',
                          style: { 
                            fontSize: 10, 
                            color: '#ffffff',
                            fontWeight: '700'
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              // Live Match 1
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Brasileirão Série A',
                          style: { 
                            fontSize: 12, 
                            color: '#737373',
                            fontWeight: '600'
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: '78\' - 2º Tempo',
                          style: { 
                            fontSize: 12, 
                            color: '#ef4444',
                            fontWeight: '700'
                          }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { alignItems: 'center' } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'body',
                              text: '🔴',
                              style: { fontSize: 20, marginBottom: 4 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'subtitle',
                              text: 'Flamengo',
                              style: { 
                                fontSize: 14, 
                                fontWeight: '600', 
                                color: '#171717'
                              }
                            }
                          }
                        ]
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'title',
                          text: '2 - 1',
                          style: { 
                            fontSize: 24, 
                            fontWeight: '800', 
                            color: '#16a34a'
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { alignItems: 'center' } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'body',
                              text: '🟢',
                              style: { fontSize: 20, marginBottom: 4 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'subtitle',
                              text: 'Palmeiras',
                              style: { 
                                fontSize: 14, 
                                fontWeight: '600', 
                                color: '#171717'
                              }
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between'
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: '1\n2.10',
                          style: {
                            flex: 1,
                            marginRight: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingVertical: 12
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: 'X\n3.40',
                          style: {
                            flex: 1,
                            marginHorizontal: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingVertical: 12
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: '2\n4.20',
                          style: {
                            flex: 1,
                            marginLeft: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingVertical: 12
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Featured Matches
          {
            id: 'featured-matches',
            type: 'default',
            style: { paddingHorizontal: 16, marginTop: 20 },
            components: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  variant: 'title',
                  text: '⭐ Jogos em Destaque',
                  style: { 
                    fontSize: 20, 
                    fontWeight: '700', 
                    color: '#171717',
                    marginBottom: 16
                  }
                }
              },
              // Featured Match 1
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Liga dos Campeões',
                          style: { 
                            fontSize: 12, 
                            color: '#737373',
                            fontWeight: '600'
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Hoje 21:00',
                          style: { 
                            fontSize: 12, 
                            color: '#0ea5e9',
                            fontWeight: '700'
                          }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { alignItems: 'center' } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'body',
                              text: '🏆',
                              style: { fontSize: 20, marginBottom: 4 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'subtitle',
                              text: 'Real Madrid',
                              style: { 
                                fontSize: 14, 
                                fontWeight: '600', 
                                color: '#171717'
                              }
                            }
                          }
                        ]
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'title',
                          text: 'vs',
                          style: { 
                            fontSize: 16, 
                            fontWeight: '600', 
                            color: '#737373'
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { alignItems: 'center' } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'body',
                              text: '🔴',
                              style: { fontSize: 20, marginBottom: 4 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'subtitle',
                              text: 'Liverpool',
                              style: { 
                                fontSize: 14, 
                                fontWeight: '600', 
                                color: '#171717'
                              }
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between'
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: '1\n1.85',
                          style: {
                            flex: 1,
                            marginRight: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingVertical: 12
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: 'X\n3.20',
                          style: {
                            flex: 1,
                            marginHorizontal: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingVertical: 12
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: '2\n4.50',
                          style: {
                            flex: 1,
                            marginLeft: 4,
                            backgroundColor: 'transparent',
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingVertical: 12
                          },
                          actions: [
                            { type: 'module_action', payload: { module: 'betting', action: 'addToBetSlip' } }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Popular Bets Section
          {
            id: 'popular-bets',
            type: 'flex',
            style: { paddingHorizontal: 16, marginTop: 20, paddingBottom: 30 },
            components: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  variant: 'title',
                  text: '🔥 Apostas Populares',
                  style: { 
                    fontSize: 20, 
                    fontWeight: '700', 
                    color: '#171717',
                    marginBottom: 16
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: { 
                    flexDirection: 'row', 
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }
                },
                children: [
                  // Over 2.5 Gols
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 16,
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Over 2.5 Gols',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 8
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'title',
                          text: '1.90',
                          style: { 
                            fontSize: 24, 
                            fontWeight: '800', 
                            color: '#16a34a',
                            textAlign: 'center',
                            marginBottom: 8
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: '🔥 Mais apostado',
                          style: { 
                            fontSize: 12, 
                            color: '#ef4444',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  },
                  // Ambos Marcam
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 16,
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Ambos Marcam',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 8
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'title',
                          text: '2.25',
                          style: { 
                            fontSize: 24, 
                            fontWeight: '800', 
                            color: '#f59e0b',
                            textAlign: 'center',
                            marginBottom: 8
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: '⚡ Odd alta',
                          style: { 
                            fontSize: 12, 
                            color: '#f59e0b',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      metadata: {
        name: 'Sports Screen',
        userId,
        sport,
        showLive,
        version: 1,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  getCasinoScreenConfig(options = {}) {
    const { userId, category, gameType } = options;

    return {
      layout: {
        type: 'scroll',
        backgroundColor: '#fafafa',
        sections: [
          // Casino Header
          {
            id: 'casino-header',
            type: 'hero',
            style: { padding: 0 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: {
                    background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
                    padding: 20,
                    paddingTop: 60,
                    paddingBottom: 30
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '🎰 Casino',
                      style: { 
                        fontSize: 28, 
                        fontWeight: '800', 
                        color: '#000', 
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'subtitle',
                      text: 'Jogos emocionantes e grandes prêmios',
                      style: { 
                        fontSize: 16, 
                        color: 'rgba(0, 0, 0, 0.9)', 
                        textAlign: 'center'
                      }
                    }
                  }
                ]
              }
            ]
          },

          // Jackpot Banner
          {
            id: 'jackpot-banner',
            type: 'banner',
            style: { paddingHorizontal: 16, marginTop: 20 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    borderRadius: 20,
                    padding: 24,
                    alignItems: 'center',
                    marginBottom: 20,
                    elevation: 4,
                    shadowColor: '#fff',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '💰',
                      style: { fontSize: 40, marginBottom: 8 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'MEGA JACKPOT',
                      style: { 
                        fontSize: 20, 
                        fontWeight: '800', 
                        color: '#000',
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'R$ 2.547.891',
                      style: { 
                        fontSize: 28, 
                        fontWeight: '900', 
                        color: '#000',
                        textAlign: 'center',
                        // marginBottom: 12
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Button',
                    props: {
                      variant: 'primary',
                      title: 'JOGAR AGORA',
                      style: {
                        backgroundColor: '#000',
                        color: '#d97706',
                        borderRadius: 25,
                        // paddingVertical: 12,r
                        paddingHorizontal: 32
                      },
                      actions: [
                        { type: 'navigate', payload: { screen: 'jackpot-games' } }
                      ]
                    }
                  }
                ]
              }
            ]
          },

          // Game Categories
          {
            id: 'game-categories',
            type: 'flex',
            style: { paddingHorizontal: 16, marginTop: 10 },
            components: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  variant: 'title',
                  text: 'Categorias',
                  style: { 
                    fontSize: 20, 
                    fontWeight: '700', 
                    color: '#171717',
                    marginBottom: 16
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: { 
                    flexDirection: 'row', 
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }
                },
                children: [
                  // Slots
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 20,
                        marginBottom: 16,
                        alignItems: 'center',
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🎰',
                          style: { fontSize: 32, marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Slots',
                          style: { 
                            fontSize: 16, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 4
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: '500+ jogos',
                          style: { 
                            fontSize: 12, 
                            color: '#737373',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  },
                  // Live Casino
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 20,
                        marginBottom: 16,
                        alignItems: 'center',
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🎭',
                          style: { fontSize: 32, marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Live Casino',
                          style: { 
                            fontSize: 16, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 4
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Dealers reais',
                          style: { 
                            fontSize: 12, 
                            color: '#737373',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  },
                  // Table Games
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 20,
                        marginBottom: 16,
                        alignItems: 'center',
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🃏',
                          style: { fontSize: 32, marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Mesa',
                          style: { 
                            fontSize: 16, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 4
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Blackjack, Poker',
                          style: { 
                            fontSize: 12, 
                            color: '#737373',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  },
                  // Crash Games
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 20,
                        marginBottom: 16,
                        alignItems: 'center',
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🚀',
                          style: { fontSize: 32, marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Crash',
                          style: { 
                            fontSize: 16, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 4
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Aviator, Spaceman',
                          style: { 
                            fontSize: 12, 
                            color: '#737373',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Featured Games
          {
            id: 'featured-games',
            type: 'carousel',
            style: { paddingLeft: 16, marginTop: 20 },
            title: 'Jogos em Destaque',
            components: [
              // Fortune Tiger
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    width: 200,
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 16,
                    marginRight: 16,
                    elevation: 3,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '🐅',
                      style: { fontSize: 48, textAlign: 'center', marginBottom: 12 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'Fortune Tiger',
                      style: { 
                        fontSize: 16, 
                        fontWeight: '700', 
                        color: '#171717',
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'caption',
                      text: '🔥 Popular',
                      style: { 
                        fontSize: 12, 
                        color: '#ef4444',
                        textAlign: 'center',
                        marginBottom: 12
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Button',
                    props: {
                      variant: 'primary',
                      title: 'Jogar',
                      style: {
                        backgroundColor: '#7c3aed',
                        borderRadius: 8,
                        paddingVertical: 8
                      },
                      actions: [
                        { type: 'navigate', payload: { screen: 'fortune-tiger' } }
                      ]
                    }
                  }
                ]
              },
              // Aviator
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    width: 200,
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 16,
                    marginRight: 16,
                    elevation: 3,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '✈️',
                      style: { fontSize: 48, textAlign: 'center', marginBottom: 12 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'Aviator',
                      style: { 
                        fontSize: 16, 
                        fontWeight: '700', 
                        color: '#171717',
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'caption',
                      text: '⚡ Crash Game',
                      style: { 
                        fontSize: 12, 
                        color: '#f59e0b',
                        textAlign: 'center',
                        marginBottom: 12
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Button',
                    props: {
                      variant: 'primary',
                      title: 'Jogar',
                      style: {
                        backgroundColor: '#7c3aed',
                        borderRadius: 8,
                        paddingVertical: 8
                      },
                      actions: [
                        { type: 'navigate', payload: { screen: 'aviator' } }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      metadata: {
        name: 'Casino Screen',
        userId,
        category,
        gameType,
        version: 1,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  getLotteryScreenConfig(options = {}) {
    const { userId, region } = options;
    
    return {
      layout: {
        type: 'scroll',
        backgroundColor: '#fafafa',
        sections: [
          // Lottery Header
          {
            id: 'lottery-header',
            type: 'hero',
            style: { padding: 0 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: {
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    padding: 20,
                    paddingTop: 60,
                    paddingBottom: 30
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: '🎲 Loterias',
                      style: { 
                        fontSize: 28, 
                        fontWeight: '800', 
                        color: '#ffffff', 
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'subtitle',
                      text: 'Sonhe grande, aposte nos maiores prêmios',
                      style: { 
                        fontSize: 16, 
                        color: 'rgba(255, 255, 255, 0.9)', 
                        textAlign: 'center'
                      }
                    }
                  }
                ]
              }
            ]
          },

          // Next Draw Banner
          {
            id: 'next-draw-banner',
            type: 'banner',
            style: { paddingHorizontal: 16, marginTop: 20 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    padding: 24,
                    alignItems: 'center',
                    marginBottom: 20,
                    elevation: 4,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    borderLeftWidth: 4,
                    borderLeftColor: '#f59e0b'
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'subtitle',
                      text: 'Próximo Sorteio - Mega-Sena',
                      style: { 
                        fontSize: 16, 
                        fontWeight: '600', 
                        color: '#737373',
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'R$ 45.000.000',
                      style: { 
                        fontSize: 32, 
                        fontWeight: '900', 
                        color: '#f59e0b',
                        textAlign: 'center',
                        marginBottom: 8
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'caption',
                      text: 'Sábado, 25 de Junho - 20:00h',
                      style: { 
                        fontSize: 14, 
                        color: '#171717',
                        textAlign: 'center',
                        marginBottom: 16
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Button',
                    props: {
                      variant: 'primary',
                      title: 'APOSTAR AGORA',
                      style: {
                        backgroundColor: '#f59e0b',
                        borderRadius: 25,
                        paddingVertical: 12,
                        paddingHorizontal: 32
                      },
                      actions: [
                        { type: 'navigate', payload: { screen: 'mega-sena-bet' } }
                      ]
                    }
                  }
                ]
              }
            ]
          },

          // Lottery Games
          {
            id: 'lottery-games',
            type: 'default',
            style: { paddingHorizontal: 16, marginTop: 10 },
            components: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  variant: 'title',
                  text: 'Modalidades Disponíveis',
                  style: { 
                    fontSize: 20, 
                    fontWeight: '700', 
                    color: '#171717',
                    marginBottom: 16
                  }
                }
              },
              // Mega-Sena
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { flex: 1 } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'title',
                              text: '🍀 Mega-Sena',
                              style: { 
                                fontSize: 18, 
                                fontWeight: '700', 
                                color: '#171717',
                                marginBottom: 4
                              }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'body',
                              text: 'Escolha 6 números de 1 a 60',
                              style: { 
                                fontSize: 14, 
                                color: '#737373',
                                marginBottom: 8
                              }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'subtitle',
                              text: 'Prêmio: R$ 45.000.000',
                              style: { 
                                fontSize: 16, 
                                fontWeight: '600', 
                                color: '#f59e0b'
                              }
                            }
                          }
                        ]
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'primary',
                          title: 'Apostar',
                          style: {
                            backgroundColor: '#f59e0b',
                            borderRadius: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 16
                          },
                          actions: [
                            { type: 'navigate', payload: { screen: 'mega-sena-bet' } }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              // Quina
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { flex: 1 } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'title',
                              text: '🎯 Quina',
                              style: { 
                                fontSize: 18, 
                                fontWeight: '700', 
                                color: '#171717',
                                marginBottom: 4
                              }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'body',
                              text: 'Escolha 5 números de 1 a 80',
                              style: { 
                                fontSize: 14, 
                                color: '#737373',
                                marginBottom: 8
                              }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'subtitle',
                              text: 'Prêmio: R$ 8.500.000',
                              style: { 
                                fontSize: 16, 
                                fontWeight: '600', 
                                color: '#16a34a'
                              }
                            }
                          }
                        ]
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'primary',
                          title: 'Apostar',
                          style: {
                            backgroundColor: '#16a34a',
                            borderRadius: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 16
                          },
                          actions: [
                            { type: 'navigate', payload: { screen: 'quina-bet' } }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              // Lotofácil
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { flex: 1 } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'title',
                              text: '💜 Lotofácil',
                              style: { 
                                fontSize: 18, 
                                fontWeight: '700', 
                                color: '#171717',
                                marginBottom: 4
                              }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'body',
                              text: 'Escolha 15 números de 1 a 25',
                              style: { 
                                fontSize: 14, 
                                color: '#737373',
                                marginBottom: 8
                              }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'subtitle',
                              text: 'Prêmio: R$ 1.800.000',
                              style: { 
                                fontSize: 16, 
                                fontWeight: '600', 
                                color: '#7c3aed'
                              }
                            }
                          }
                        ]
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'primary',
                          title: 'Apostar',
                          style: {
                            backgroundColor: '#7c3aed',
                            borderRadius: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 16
                          },
                          actions: [
                            { type: 'navigate', payload: { screen: 'lotofacil-bet' } }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Quick Tips Section
          {
            id: 'quick-tips',
            type: 'grid',
            style: { paddingHorizontal: 16, marginTop: 20, paddingBottom: 30 },
            components: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  variant: 'title',
                  text: '💡 Dicas Rápidas',
                  style: { 
                    fontSize: 20, 
                    fontWeight: '700', 
                    color: '#171717',
                    marginBottom: 16
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: { 
                    flexDirection: 'row', 
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }
                },
                children: [
                  // Tip 1
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 16,
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🎲',
                          style: { fontSize: 32, textAlign: 'center', marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Jogo Responsável',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 8
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Aposte com responsabilidade',
                          style: { 
                            fontSize: 12, 
                            color: '#737373',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  },
                  // Tip 2
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'card',
                      style: {
                        width: '48%',
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 16,
                        elevation: 2,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '📊',
                          style: { fontSize: 32, textAlign: 'center', marginBottom: 8 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Resultados',
                          style: { 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: '#171717',
                            textAlign: 'center',
                            marginBottom: 8
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Confira os últimos sorteios',
                          style: { 
                            fontSize: 12, 
                            color: '#737373',
                            textAlign: 'center'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      metadata: {
        name: 'Lottery Screen',
        userId,
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
        type: 'scroll',
        backgroundColor: '#fafafa',
        sections: [
          // Profile Header with Avatar and User Info
          {
            id: 'profile-header',
            type: 'hero',
            style: { backgroundColor: '#ffffff', paddingBottom: 20 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'default',
                  style: {
                    height: 140,
                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                    justifyContent: 'flex-end',
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    borderRadius: 0
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { flexDirection: 'row', alignItems: 'center' }
                    },
                    children: [
                      // Avatar
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: {
                          variant: 'default',
                          style: {
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            backgroundColor: '#0ea5e9',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 16,
                            borderWidth: 4,
                            borderColor: '#ffffff'
                          }
                        },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'title',
                              text: 'JD',
                              style: { fontSize: 32, fontWeight: '700', color: '#ffffff' }
                            }
                          }
                        ]
                      },
                      // User Info
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { flex: 1 } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'title',
                              text: 'João da Silva',
                              style: { fontSize: 24, fontWeight: '700', color: '#ffffff', marginBottom: 4 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'body',
                              text: 'joao.silva@email.com',
                              style: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 8 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'caption',
                              text: 'Membro desde Março 2024',
                              style: { fontSize: 12, color: 'rgba(255, 255, 255, 0.6)' }
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Balance Section
          {
            id: 'balance-section',
            type: 'default',
            style: { paddingHorizontal: 16, marginTop: -10 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20,
                    elevation: 4,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8
                  }
                },
                children: [
                  // Balance Header
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Saldo Disponível',
                          style: { fontSize: 16, fontWeight: '600', color: '#737373' }
                        }
                      }
                    ]
                  },
                  // Balance Amount
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'R$ 1.250,00',
                      style: { fontSize: 32, fontWeight: '800', color: '#0ea5e9', marginBottom: 16 }
                    }
                  },
                  // Action Buttons
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { flexDirection: 'row', justifyContent: 'space-between' }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'primary',
                          title: 'DEPOSITAR',
                          style: {
                            flex: 1,
                            backgroundColor: '#16a34a',
                            borderRadius: 8,
                            marginRight: 8
                          },
                          actions: [
                            { type: 'navigate', payload: { screen: 'deposit' } }
                          ]
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Button',
                        props: {
                          variant: 'outline',
                          title: 'SACAR',
                          style: {
                            flex: 1,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 8,
                            marginLeft: 8
                          },
                          actions: [
                            { type: 'navigate', payload: { screen: 'withdraw' } }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Stats Section
          {
            id: 'stats-section',
            type: 'default',
            style: { paddingHorizontal: 16, marginTop: 20 },
            components: [
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 20
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'title',
                      text: 'Suas Estatísticas',
                      style: { fontSize: 18, fontWeight: '700', color: '#171717', marginBottom: 16 }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: { flexDirection: 'row', justifyContent: 'space-between' }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { flex: 1, alignItems: 'center' } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'title',
                              text: '127',
                              style: { fontSize: 24, fontWeight: '800', color: '#0ea5e9', marginBottom: 4 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'caption',
                              text: 'Apostas Feitas',
                              style: { fontSize: 12, color: '#737373', textAlign: 'center' }
                            }
                          }
                        ]
                      },
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { flex: 1, alignItems: 'center' } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'title',
                              text: '89',
                              style: { fontSize: 24, fontWeight: '800', color: '#16a34a', marginBottom: 4 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'caption',
                              text: 'Apostas Ganhas',
                              style: { fontSize: 12, color: '#737373', textAlign: 'center' }
                            }
                          }
                        ]
                      },
                      {
                        id: uuidv4(),
                        type: 'Container',
                        props: { variant: 'default', style: { flex: 1, alignItems: 'center' } },
                        children: [
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'title',
                              text: '70%',
                              style: { fontSize: 24, fontWeight: '800', color: '#f59e0b', marginBottom: 4 }
                            }
                          },
                          {
                            id: uuidv4(),
                            type: 'Text',
                            props: {
                              variant: 'caption',
                              text: 'Taxa de Acerto',
                              style: { fontSize: 12, color: '#737373', textAlign: 'center' }
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Menu Items
          {
            id: 'menu-section',
            type: 'default',
            style: { padding: 16 },
            components: [
              // Wallet Menu Item
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: {
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 16
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '💰',
                          style: { fontSize: 24 }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: { variant: 'default', style: { flex: 1 } },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Carteira',
                          style: { fontSize: 16, fontWeight: '600', color: '#171717', marginBottom: 4 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Depósitos, saques e histórico',
                          style: { fontSize: 14, color: '#737373' }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '›',
                      style: { fontSize: 20, color: '#737373', marginLeft: 8 }
                    }
                  }
                ]
              },
              // Bet History Menu Item
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: {
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 16
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '📊',
                          style: { fontSize: 24 }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: { variant: 'default', style: { flex: 1 } },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Histórico de Apostas',
                          style: { fontSize: 16, fontWeight: '600', color: '#171717', marginBottom: 4 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Todas as suas apostas',
                          style: { fontSize: 14, color: '#737373' }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '›',
                      style: { fontSize: 20, color: '#737373', marginLeft: 8 }
                    }
                  }
                ]
              },
              // Favorites Menu Item
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: {
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 16
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '❤️',
                          style: { fontSize: 24 }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: { variant: 'default', style: { flex: 1 } },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Favoritos',
                          style: { fontSize: 16, fontWeight: '600', color: '#171717', marginBottom: 4 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Jogos e times favoritos',
                          style: { fontSize: 14, color: '#737373' }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '›',
                      style: { fontSize: 20, color: '#737373', marginLeft: 8 }
                    }
                  }
                ]
              },
              // Notifications Menu Item
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: {
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 16
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '🔔',
                          style: { fontSize: 24 }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: { variant: 'default', style: { flex: 1 } },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Notificações',
                          style: { fontSize: 16, fontWeight: '600', color: '#171717', marginBottom: 4 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Configurações de notificação',
                          style: { fontSize: 14, color: '#737373' }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '›',
                      style: { fontSize: 20, color: '#737373', marginLeft: 8 }
                    }
                  }
                ]
              },
              // Settings Menu Item
              {
                id: uuidv4(),
                type: 'Container',
                props: {
                  variant: 'card',
                  style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: {
                      variant: 'default',
                      style: {
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: 'rgba(115, 115, 115, 0.1)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 16
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'body',
                          text: '⚙️',
                          style: { fontSize: 24 }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Container',
                    props: { variant: 'default', style: { flex: 1 } },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'subtitle',
                          text: 'Configurações',
                          style: { fontSize: 16, fontWeight: '600', color: '#171717', marginBottom: 4 }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          variant: 'caption',
                          text: 'Preferências da conta',
                          style: { fontSize: 14, color: '#737373' }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      variant: 'body',
                      text: '›',
                      style: { fontSize: 20, color: '#737373', marginLeft: 8 }
                    }
                  }
                ]
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