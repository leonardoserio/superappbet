const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { validateSDUISchema } = require('../validators/sduiValidator');
const { sduiStore } = require('../store/sduiStore');
const { broadcastUpdate } = require('../websocket/socketHandler');

// Get complete SDUI configuration for app initialization
router.get('/config', (req, res) => {
  try {
    const config = sduiStore.getCompleteConfig();
    res.json({
      success: true,
      data: config,
      timestamp: new Date().toISOString(),
      version: sduiStore.getConfigVersion()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get specific screen configuration
router.get('/screen/:screenName', (req, res) => {
  try {
    const { screenName } = req.params;
    const { variant = 'default', userId, experimentGroup } = req.query;
    
    const screenConfig = sduiStore.getScreenConfig(screenName, {
      variant,
      userId,
      experimentGroup
    });
    
    if (!screenConfig) {
      return res.status(404).json({
        success: false,
        error: `Screen '${screenName}' not found`
      });
    }
    
    res.json({
      success: true,
      data: screenConfig,
      metadata: {
        screenName,
        variant,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update screen configuration (Admin endpoint)
router.put('/screen/:screenName', (req, res) => {
  try {
    const { screenName } = req.params;
    const { components, layout, metadata } = req.body;
    
    // Validate SDUI schema
    const validation = validateSDUISchema(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid SDUI schema',
        details: validation.errors
      });
    }
    
    const updatedConfig = sduiStore.updateScreenConfig(screenName, {
      components,
      layout,
      metadata: {
        ...metadata,
        updatedAt: new Date().toISOString(),
        updatedBy: req.headers['x-admin-user'] || 'system'
      }
    });
    
    // Broadcast real-time update to connected clients
    broadcastUpdate('screen_updated', {
      screenName,
      config: updatedConfig
    });
    
    res.json({
      success: true,
      data: updatedConfig,
      message: `Screen '${screenName}' updated successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create A/B test variant for screen
router.post('/screen/:screenName/variant', (req, res) => {
  try {
    const { screenName } = req.params;
    const { variantName, config, trafficSplit = 50 } = req.body;
    
    const variant = sduiStore.createScreenVariant(screenName, {
      name: variantName,
      config,
      trafficSplit,
      createdAt: new Date().toISOString(),
      id: uuidv4()
    });
    
    res.json({
      success: true,
      data: variant,
      message: `Variant '${variantName}' created for screen '${screenName}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get component library
router.get('/components', (req, res) => {
  try {
    const components = sduiStore.getComponentLibrary();
    res.json({
      success: true,
      data: components
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Register new component type
router.post('/components', (req, res) => {
  try {
    const { name, schema, defaultProps, category } = req.body;
    
    const component = sduiStore.registerComponent({
      name,
      schema,
      defaultProps,
      category,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    });
    
    res.json({
      success: true,
      data: component,
      message: `Component '${name}' registered successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get theme configuration
router.get('/theme', (req, res) => {
  try {
    const { variant = 'default' } = req.query;
    const theme = sduiStore.getThemeConfig(variant);
    
    res.json({
      success: true,
      data: theme
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update theme configuration
router.put('/theme', (req, res) => {
  try {
    const { variant = 'default', colors, typography, spacing } = req.body;
    
    const theme = sduiStore.updateThemeConfig(variant, {
      colors,
      typography,
      spacing,
      updatedAt: new Date().toISOString()
    });
    
    // Broadcast theme update
    broadcastUpdate('theme_updated', { variant, theme });
    
    res.json({
      success: true,
      data: theme,
      message: 'Theme updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Force refresh for all clients
router.post('/refresh', (req, res) => {
  try {
    const { reason = 'Manual refresh' } = req.body;
    
    broadcastUpdate('force_refresh', {
      reason,
      timestamp: new Date().toISOString()
    });
    
    res.json({
      success: true,
      message: 'Refresh signal sent to all clients'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;