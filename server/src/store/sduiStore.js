const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

class SDUIStore {
  constructor() {
    this.configVersion = 1;
    this.screens = new Map();
    this.components = new Map();
    this.themes = new Map();
    this.experiments = new Map();
    this.userSegments = new Map();
    
    this.initializeDefaultConfigs();
  }

  initializeDefaultConfigs() {
    // Default theme configurations
    this.themes.set('light', {
      colors: {
        background: {
          primary: '#ffffff',
          secondary: '#f8f9fa',
          accent: '#e3f2fd'
        },
        text: {
          primary: '#212529',
          secondary: '#6c757d',
          tertiary: '#adb5bd',
          inverse: '#ffffff'
        },
        interactive: {
          primary: '#007bff',
          secondary: '#6c757d',
          success: '#28a745',
          warning: '#ffc107',
          danger: '#dc3545'
        },
        border: {
          primary: '#dee2e6',
          secondary: '#e9ecef'
        }
      },
      typography: {
        fontFamily: 'System',
        sizes: {
          xs: 12,
          sm: 14,
          md: 16,
          lg: 18,
          xl: 24,
          xxl: 32
        }
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48
      }
    });

    this.themes.set('dark', {
      colors: {
        background: {
          primary: '#121212',
          secondary: '#1e1e1e',
          accent: '#2c2c2c'
        },
        text: {
          primary: '#ffffff',
          secondary: '#b0b0b0',
          tertiary: '#808080',
          inverse: '#000000'
        },
        interactive: {
          primary: '#2196f3',
          secondary: '#757575',
          success: '#4caf50',
          warning: '#ff9800',
          danger: '#f44336'
        },
        border: {
          primary: '#404040',
          secondary: '#2c2c2c'
        }
      },
      typography: {
        fontFamily: 'System',
        sizes: {
          xs: 12,
          sm: 14,
          md: 16,
          lg: 18,
          xl: 24,
          xxl: 32
        }
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48
      }
    });

    // Default component library
    this.registerComponent({
      name: 'Container',
      schema: {
        type: 'object',
        properties: {
          variant: { type: 'string', enum: ['default', 'card', 'section'] },
          padding: { type: 'string', enum: ['none', 'sm', 'md', 'lg'] },
          margin: { type: 'string', enum: ['none', 'sm', 'md', 'lg'] },
          backgroundColor: { type: 'string' },
          borderRadius: { type: 'number' },
          children: { type: 'array' }
        }
      },
      defaultProps: {
        variant: 'default',
        padding: 'md',
        margin: 'none'
      },
      category: 'layout'
    });

    this.registerComponent({
      name: 'Text',
      schema: {
        type: 'object',
        properties: {
          variant: { type: 'string', enum: ['body', 'title', 'subtitle', 'caption'] },
          text: { type: 'string' },
          color: { type: 'string' },
          fontSize: { type: 'number' },
          fontWeight: { type: 'string', enum: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
          textAlign: { type: 'string', enum: ['left', 'center', 'right'] }
        }
      },
      defaultProps: {
        variant: 'body',
        text: 'Text',
        textAlign: 'left'
      },
      category: 'typography'
    });

    this.registerComponent({
      name: 'Button',
      schema: {
        type: 'object',
        properties: {
          variant: { type: 'string', enum: ['primary', 'secondary', 'outline', 'ghost'] },
          size: { type: 'string', enum: ['small', 'medium', 'large'] },
          title: { type: 'string' },
          disabled: { type: 'boolean' },
          actions: { type: 'array' }
        }
      },
      defaultProps: {
        variant: 'primary',
        size: 'medium',
        title: 'Button',
        disabled: false
      },
      category: 'interactive'
    });

    this.registerComponent({
      name: 'BetSlip',
      schema: {
        type: 'object',
        properties: {
          maxSelections: { type: 'number' },
          allowCombos: { type: 'boolean' },
          showQuickBets: { type: 'boolean' },
          currency: { type: 'string' }
        }
      },
      defaultProps: {
        maxSelections: 10,
        allowCombos: true,
        showQuickBets: true,
        currency: 'BRL'
      },
      category: 'betting'
    });

    // Initialize default screen configurations
    this.initializeDefaultScreens();
  }

  initializeDefaultScreens() {
    // Home Screen Configuration
    this.screens.set('home', {
      default: {
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
                  props: {
                    variant: 'card',
                    padding: 'lg',
                    style: { marginBottom: 16 }
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'title',
                        text: 'Bem-vindo ao SuperAppBet',
                        textAlign: 'center'
                      }
                    },
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'subtitle',
                        text: 'Sua plataforma completa de apostas e entretenimento',
                        textAlign: 'center',
                        style: { marginTop: 8 }
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: 'quickActions',
              type: 'grid',
              components: [
                {
                  id: uuidv4(),
                  type: 'Button',
                  props: {
                    variant: 'primary',
                    title: 'Esportes Ao Vivo',
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
                    title: 'Casino',
                    actions: [
                      { type: 'navigate', payload: { screen: 'casino' } }
                    ]
                  }
                }
              ]
            },
            {
              id: 'promotions',
              type: 'carousel',
              components: [
                {
                  id: uuidv4(),
                  type: 'Container',
                  props: {
                    variant: 'card',
                    style: { backgroundColor: '#e3f2fd', padding: 16 }
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'subtitle',
                        text: 'Bônus de Boas-vindas',
                        fontWeight: 'bold'
                      }
                    },
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'body',
                        text: 'Até R$ 500 no primeiro depósito'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        metadata: {
          name: 'Home Screen',
          version: 1,
          lastUpdated: new Date().toISOString()
        }
      }
    });

    // Sports Screen Configuration
    this.screens.set('sports', {
      default: {
        layout: {
          type: 'tabs',
          tabs: [
            {
              id: 'live',
              title: 'Ao Vivo',
              components: [
                {
                  id: uuidv4(),
                  type: 'Text',
                  props: {
                    variant: 'title',
                    text: 'Eventos Ao Vivo',
                    style: { padding: 16 }
                  }
                }
              ]
            },
            {
              id: 'football',
              title: 'Futebol',
              components: [
                {
                  id: uuidv4(),
                  type: 'Text',
                  props: {
                    variant: 'title',
                    text: 'Futebol',
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
          lastUpdated: new Date().toISOString()
        }
      }
    });

    // Casino Screen Configuration
    this.screens.set('casino', {
      default: {
        layout: {
          type: 'grid',
          sections: [
            {
              id: 'featured',
              title: 'Jogos em Destaque',
              components: [
                {
                  id: uuidv4(),
                  type: 'Container',
                  props: {
                    variant: 'card',
                    padding: 'md'
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: 'Text',
                      props: {
                        variant: 'subtitle',
                        text: 'Slots Populares'
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
          version: 1,
          lastUpdated: new Date().toISOString()
        }
      }
    });
  }

  getCompleteConfig() {
    return {
      version: this.configVersion,
      screens: Object.fromEntries(this.screens),
      components: Object.fromEntries(this.components),
      themes: Object.fromEntries(this.themes),
      timestamp: new Date().toISOString()
    };
  }

  getScreenConfig(screenName, options = {}) {
    const { variant = 'default', userId, experimentGroup } = options;
    
    const screen = this.screens.get(screenName);
    if (!screen) return null;

    let config = screen[variant] || screen.default;
    
    // Apply user-specific customizations
    if (userId) {
      config = this.applyUserCustomizations(config, userId);
    }
    
    // Apply A/B test variations
    if (experimentGroup) {
      config = this.applyExperimentVariation(config, experimentGroup);
    }
    
    return {
      ...config,
      screenName,
      variant,
      generatedAt: new Date().toISOString()
    };
  }

  updateScreenConfig(screenName, config) {
    if (!this.screens.has(screenName)) {
      this.screens.set(screenName, {});
    }
    
    const screen = this.screens.get(screenName);
    screen.default = {
      ...screen.default,
      ...config,
      updatedAt: new Date().toISOString()
    };
    
    this.configVersion++;
    return screen.default;
  }

  createScreenVariant(screenName, variant) {
    if (!this.screens.has(screenName)) {
      throw new Error(`Screen '${screenName}' not found`);
    }
    
    const screen = this.screens.get(screenName);
    screen[variant.name] = {
      ...variant.config,
      metadata: {
        ...variant.config.metadata,
        isVariant: true,
        trafficSplit: variant.trafficSplit,
        createdAt: variant.createdAt
      }
    };
    
    return screen[variant.name];
  }

  registerComponent(component) {
    this.components.set(component.name, {
      ...component,
      id: component.id || uuidv4(),
      registeredAt: new Date().toISOString()
    });
    
    return this.components.get(component.name);
  }

  getComponentLibrary() {
    return Array.from(this.components.values());
  }

  getThemeConfig(variant) {
    return this.themes.get(variant) || this.themes.get('light');
  }

  updateThemeConfig(variant, config) {
    const existingTheme = this.themes.get(variant) || {};
    const updatedTheme = _.merge(existingTheme, config);
    
    this.themes.set(variant, updatedTheme);
    this.configVersion++;
    
    return updatedTheme;
  }

  getConfigVersion() {
    return this.configVersion;
  }

  applyUserCustomizations(config, userId) {
    // Apply user-specific UI customizations
    // This could include personalized layouts, colors, etc.
    return config;
  }

  applyExperimentVariation(config, experimentGroup) {
    // Apply A/B test variations
    const experiment = this.experiments.get(experimentGroup);
    if (!experiment) return config;
    
    return _.merge(config, experiment.variations);
  }
}

const sduiStore = new SDUIStore();
module.exports = { sduiStore };