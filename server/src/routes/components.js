const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { broadcastUpdate } = require('../websocket/socketHandler');

// Mock component store (in production this would be a database)
const componentStore = new Map();

// Initialize with default components
function initializeComponents() {
  const defaultComponents = [
    {
      id: 'hero-banner',
      name: 'Hero Banner',
      type: 'HeroBanner',
      description: 'Main promotional banner for home screen',
      category: 'promotional',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', required: true },
          subtitle: { type: 'string' },
          imageUrl: { type: 'string', format: 'uri' },
          ctaText: { type: 'string' },
          ctaAction: { type: 'object' },
          backgroundColor: { type: 'string' },
          textColor: { type: 'string' }
        }
      },
      defaultProps: {
        title: 'Bem-vindo ao SuperAppBet',
        subtitle: 'Sua casa de apostas completa',
        ctaText: 'Começar',
        backgroundColor: '#007bff',
        textColor: '#ffffff'
      },
      variants: ['default', 'compact', 'full-screen'],
      platforms: ['ios', 'android', 'web'],
      createdAt: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'quick-bet-card',
      name: 'Quick Bet Card',
      type: 'QuickBetCard',
      description: 'Fast betting card for popular events',
      category: 'betting',
      schema: {
        type: 'object',
        properties: {
          eventId: { type: 'string', required: true },
          homeTeam: { type: 'string', required: true },
          awayTeam: { type: 'string', required: true },
          odds: { type: 'object', required: true },
          startTime: { type: 'string', format: 'date-time' },
          league: { type: 'string' },
          live: { type: 'boolean' }
        }
      },
      defaultProps: {
        live: false,
        showQuickBet: true
      },
      variants: ['default', 'compact', 'live'],
      platforms: ['ios', 'android'],
      createdAt: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'game-carousel',
      name: 'Game Carousel',
      type: 'GameCarousel',
      description: 'Horizontal scrolling game showcase',
      category: 'casino',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          games: { type: 'array', items: { type: 'object' } },
          autoScroll: { type: 'boolean' },
          showCategories: { type: 'boolean' },
          itemsPerView: { type: 'number', minimum: 1, maximum: 5 }
        }
      },
      defaultProps: {
        title: 'Jogos Populares',
        autoScroll: false,
        showCategories: true,
        itemsPerView: 2.5
      },
      variants: ['default', 'featured', 'compact'],
      platforms: ['ios', 'android', 'web'],
      createdAt: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'promotion-card',
      name: 'Promotion Card',
      type: 'PromotionCard',
      description: 'Promotional offer display card',
      category: 'promotional',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', required: true },
          description: { type: 'string' },
          imageUrl: { type: 'string', format: 'uri' },
          validUntil: { type: 'string', format: 'date-time' },
          ctaText: { type: 'string' },
          ctaAction: { type: 'object' },
          terms: { type: 'string' },
          priority: { type: 'number', minimum: 1, maximum: 10 }
        }
      },
      defaultProps: {
        ctaText: 'Participar',
        priority: 5
      },
      variants: ['default', 'banner', 'popup'],
      platforms: ['ios', 'android', 'web'],
      createdAt: new Date().toISOString(),
      status: 'active'
    }
  ];

  defaultComponents.forEach(component => {
    componentStore.set(component.id, component);
  });
}

// Initialize default components
initializeComponents();

// Get all components
router.get('/', (req, res) => {
  try {
    const { category, platform, status = 'active' } = req.query;
    
    let components = Array.from(componentStore.values());
    
    // Filter by category
    if (category) {
      components = components.filter(c => c.category === category);
    }
    
    // Filter by platform
    if (platform) {
      components = components.filter(c => 
        c.platforms.includes(platform) || c.platforms.includes('all')
      );
    }
    
    // Filter by status
    if (status) {
      components = components.filter(c => c.status === status);
    }
    
    res.json({
      success: true,
      data: components,
      count: components.length,
      filters: { category, platform, status }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get component by ID
router.get('/:componentId', (req, res) => {
  try {
    const { componentId } = req.params;
    const component = componentStore.get(componentId);
    
    if (!component) {
      return res.status(404).json({
        success: false,
        error: `Component '${componentId}' not found`
      });
    }
    
    res.json({
      success: true,
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new component
router.post('/', (req, res) => {
  try {
    const {
      name,
      type,
      description,
      category,
      schema,
      defaultProps = {},
      variants = ['default'],
      platforms = ['ios', 'android'],
      conditions = {}
    } = req.body;
    
    const component = {
      id: uuidv4(),
      name,
      type,
      description,
      category,
      schema,
      defaultProps,
      variants,
      platforms,
      conditions,
      createdAt: new Date().toISOString(),
      createdBy: req.headers['x-admin-user'] || 'system',
      status: 'active',
      version: 1
    };
    
    componentStore.set(component.id, component);
    
    // Broadcast component creation
    broadcastUpdate('component_created', component);
    
    res.json({
      success: true,
      data: component,
      message: `Component '${name}' created successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update component
router.put('/:componentId', (req, res) => {
  try {
    const { componentId } = req.params;
    const updateData = req.body;
    
    const existingComponent = componentStore.get(componentId);
    if (!existingComponent) {
      return res.status(404).json({
        success: false,
        error: `Component '${componentId}' not found`
      });
    }
    
    const updatedComponent = {
      ...existingComponent,
      ...updateData,
      id: componentId, // Preserve ID
      updatedAt: new Date().toISOString(),
      updatedBy: req.headers['x-admin-user'] || 'system',
      version: existingComponent.version + 1
    };
    
    componentStore.set(componentId, updatedComponent);
    
    // Broadcast component update
    broadcastUpdate('component_updated', {
      componentId,
      component: updatedComponent,
      changes: updateData
    });
    
    res.json({
      success: true,
      data: updatedComponent,
      message: `Component '${componentId}' updated successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete component
router.delete('/:componentId', (req, res) => {
  try {
    const { componentId } = req.params;
    const { permanent = false } = req.query;
    
    const component = componentStore.get(componentId);
    if (!component) {
      return res.status(404).json({
        success: false,
        error: `Component '${componentId}' not found`
      });
    }
    
    if (permanent) {
      componentStore.delete(componentId);
    } else {
      // Soft delete
      component.status = 'deleted';
      component.deletedAt = new Date().toISOString();
      component.deletedBy = req.headers['x-admin-user'] || 'system';
      componentStore.set(componentId, component);
    }
    
    // Broadcast component deletion
    broadcastUpdate('component_deleted', {
      componentId,
      permanent
    });
    
    res.json({
      success: true,
      message: `Component '${componentId}' ${permanent ? 'permanently deleted' : 'deactivated'}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Clone component
router.post('/:componentId/clone', (req, res) => {
  try {
    const { componentId } = req.params;
    const { name, modifications = {} } = req.body;
    
    const originalComponent = componentStore.get(componentId);
    if (!originalComponent) {
      return res.status(404).json({
        success: false,
        error: `Component '${componentId}' not found`
      });
    }
    
    const clonedComponent = {
      ...originalComponent,
      ...modifications,
      id: uuidv4(),
      name: name || `${originalComponent.name} (Copy)`,
      createdAt: new Date().toISOString(),
      createdBy: req.headers['x-admin-user'] || 'system',
      version: 1,
      clonedFrom: componentId
    };
    
    componentStore.set(clonedComponent.id, clonedComponent);
    
    res.json({
      success: true,
      data: clonedComponent,
      message: `Component cloned successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get component variants
router.get('/:componentId/variants', (req, res) => {
  try {
    const { componentId } = req.params;
    const component = componentStore.get(componentId);
    
    if (!component) {
      return res.status(404).json({
        success: false,
        error: `Component '${componentId}' not found`
      });
    }
    
    res.json({
      success: true,
      data: {
        componentId,
        variants: component.variants,
        defaultVariant: 'default'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Add variant to component
router.post('/:componentId/variants', (req, res) => {
  try {
    const { componentId } = req.params;
    const { name, props = {}, conditions = {} } = req.body;
    
    const component = componentStore.get(componentId);
    if (!component) {
      return res.status(404).json({
        success: false,
        error: `Component '${componentId}' not found`
      });
    }
    
    if (component.variants.includes(name)) {
      return res.status(400).json({
        success: false,
        error: `Variant '${name}' already exists`
      });
    }
    
    component.variants.push(name);
    component.variantConfigs = component.variantConfigs || {};
    component.variantConfigs[name] = {
      props,
      conditions,
      createdAt: new Date().toISOString(),
      createdBy: req.headers['x-admin-user'] || 'system'
    };
    
    component.updatedAt = new Date().toISOString();
    componentStore.set(componentId, component);
    
    // Broadcast variant addition
    broadcastUpdate('component_variant_added', {
      componentId,
      variantName: name,
      variant: component.variantConfigs[name]
    });
    
    res.json({
      success: true,
      data: component.variantConfigs[name],
      message: `Variant '${name}' added to component '${componentId}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get component usage analytics
router.get('/:componentId/analytics', (req, res) => {
  try {
    const { componentId } = req.params;
    const { startDate, endDate, platform } = req.query;
    
    const component = componentStore.get(componentId);
    if (!component) {
      return res.status(404).json({
        success: false,
        error: `Component '${componentId}' not found`
      });
    }
    
    // Mock analytics data
    const analytics = {
      componentId,
      name: component.name,
      period: {
        startDate: startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: endDate || new Date().toISOString()
      },
      metrics: {
        impressions: Math.floor(Math.random() * 100000) + 10000,
        interactions: Math.floor(Math.random() * 10000) + 1000,
        conversionRate: (Math.random() * 0.2 + 0.05).toFixed(3),
        averageTimeVisible: Math.floor(Math.random() * 30) + 5, // seconds
        errorRate: (Math.random() * 0.02).toFixed(4)
      },
      variantPerformance: component.variants.map(variant => ({
        variant,
        impressions: Math.floor(Math.random() * 10000) + 1000,
        conversionRate: (Math.random() * 0.15 + 0.05).toFixed(3)
      })),
      platformMetrics: ['ios', 'android', 'web'].map(p => ({
        platform: p,
        impressions: Math.floor(Math.random() * 5000) + 500,
        performance: (Math.random() * 100 + 50).toFixed(1) // performance score
      }))
    };
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get component categories
router.get('/meta/categories', (req, res) => {
  try {
    const components = Array.from(componentStore.values());
    const categories = [...new Set(components.map(c => c.category))];
    
    const categoryStats = categories.map(category => ({
      name: category,
      count: components.filter(c => c.category === category).length,
      activeCount: components.filter(c => c.category === category && c.status === 'active').length
    }));
    
    res.json({
      success: true,
      data: {
        categories: categoryStats,
        totalComponents: components.length,
        activeComponents: components.filter(c => c.status === 'active').length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;