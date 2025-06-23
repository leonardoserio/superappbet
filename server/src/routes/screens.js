const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { screenStore } = require('../store/screenStore');
const { broadcastUpdate } = require('../websocket/socketHandler');

// Get home screen configuration
router.get('/home', (req, res) => {
  try {
    const { userId, segment = 'default', variant = 'default' } = req.query;
    
    const config = screenStore.getHomeScreenConfig({
      userId,
      segment,
      variant
    });
    
    res.json({
      success: true,
      data: config,
      metadata: {
        screenName: 'home',
        generatedAt: new Date().toISOString(),
        variant,
        segment
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get sports screen configuration
router.get('/sports', (req, res) => {
  try {
    const { userId, sport, live = false } = req.query;
    
    const config = screenStore.getSportsScreenConfig({
      userId,
      sport,
      showLive: live === 'true'
    });
    
    res.json({
      success: true,
      data: config,
      metadata: {
        screenName: 'sports',
        sport,
        showLive: live === 'true',
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

// Get casino screen configuration
router.get('/casino', (req, res) => {
  try {
    const { userId, category = 'featured', gameType } = req.query;
    
    const config = screenStore.getCasinoScreenConfig({
      userId,
      category,
      gameType
    });
    
    res.json({
      success: true,
      data: config,
      metadata: {
        screenName: 'casino',
        category,
        gameType,
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

// Get lottery screen configuration
router.get('/lottery', (req, res) => {
  try {
    const { userId, region = 'BR' } = req.query;
    
    const config = screenStore.getLotteryScreenConfig({
      userId,
      region
    });
    
    res.json({
      success: true,
      data: config,
      metadata: {
        screenName: 'lottery',
        region,
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

// Get profile screen configuration
router.get('/profile', (req, res) => {
  try {
    const { userId, section = 'overview' } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required for profile screen'
      });
    }
    
    const config = screenStore.getProfileScreenConfig({
      userId,
      section
    });
    
    res.json({
      success: true,
      data: config,
      metadata: {
        screenName: 'profile',
        userId,
        section,
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

// Update screen layout (Admin endpoint)
router.put('/:screenName/layout', (req, res) => {
  try {
    const { screenName } = req.params;
    const { layout, variant = 'default' } = req.body;
    
    const updatedConfig = screenStore.updateScreenLayout(screenName, variant, {
      layout,
      updatedAt: new Date().toISOString(),
      updatedBy: req.headers['x-admin-user'] || 'system'
    });
    
    // Broadcast layout update
    broadcastUpdate('screen_layout_updated', {
      screenName,
      variant,
      layout: updatedConfig
    });
    
    res.json({
      success: true,
      data: updatedConfig,
      message: `Layout updated for screen '${screenName}' variant '${variant}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Add component to screen
router.post('/:screenName/components', (req, res) => {
  try {
    const { screenName } = req.params;
    const { 
      componentType, 
      props = {}, 
      position, 
      conditions = {},
      variant = 'default' 
    } = req.body;
    
    const component = screenStore.addComponentToScreen(screenName, variant, {
      id: uuidv4(),
      type: componentType,
      props,
      position,
      conditions,
      addedAt: new Date().toISOString(),
      addedBy: req.headers['x-admin-user'] || 'system'
    });
    
    // Broadcast component addition
    broadcastUpdate('component_added', {
      screenName,
      variant,
      component
    });
    
    res.json({
      success: true,
      data: component,
      message: `Component '${componentType}' added to screen '${screenName}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Remove component from screen
router.delete('/:screenName/components/:componentId', (req, res) => {
  try {
    const { screenName, componentId } = req.params;
    const { variant = 'default' } = req.query;
    
    screenStore.removeComponentFromScreen(screenName, variant, componentId);
    
    // Broadcast component removal
    broadcastUpdate('component_removed', {
      screenName,
      variant,
      componentId
    });
    
    res.json({
      success: true,
      message: `Component '${componentId}' removed from screen '${screenName}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update component properties
router.put('/:screenName/components/:componentId', (req, res) => {
  try {
    const { screenName, componentId } = req.params;
    const { props, conditions, variant = 'default' } = req.body;
    
    const updatedComponent = screenStore.updateComponentProps(screenName, variant, componentId, {
      props,
      conditions,
      updatedAt: new Date().toISOString(),
      updatedBy: req.headers['x-admin-user'] || 'system'
    });
    
    // Broadcast component update
    broadcastUpdate('component_updated', {
      screenName,
      variant,
      componentId,
      component: updatedComponent
    });
    
    res.json({
      success: true,
      data: updatedComponent,
      message: `Component '${componentId}' updated in screen '${screenName}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create A/B test for screen
router.post('/:screenName/ab-test', (req, res) => {
  try {
    const { screenName } = req.params;
    const { 
      testName, 
      variants, 
      trafficSplit = 50, 
      conditions = {},
      duration = 7 // days
    } = req.body;
    
    const abTest = screenStore.createABTest(screenName, {
      id: uuidv4(),
      name: testName,
      variants,
      trafficSplit,
      conditions,
      duration,
      createdAt: new Date().toISOString(),
      createdBy: req.headers['x-admin-user'] || 'system',
      status: 'active'
    });
    
    res.json({
      success: true,
      data: abTest,
      message: `A/B test '${testName}' created for screen '${screenName}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get screen performance metrics
router.get('/:screenName/metrics', (req, res) => {
  try {
    const { screenName } = req.params;
    const { startDate, endDate, segment } = req.query;
    
    const metrics = screenStore.getScreenMetrics(screenName, {
      startDate: startDate ? new Date(startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: endDate ? new Date(endDate) : new Date(),
      segment
    });
    
    res.json({
      success: true,
      data: metrics,
      metadata: {
        screenName,
        period: { startDate, endDate },
        segment
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get available screen templates
router.get('/templates', (req, res) => {
  try {
    const templates = screenStore.getScreenTemplates();
    
    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create screen from template
router.post('/:screenName/from-template', (req, res) => {
  try {
    const { screenName } = req.params;
    const { templateId, customizations = {} } = req.body;
    
    const screen = screenStore.createScreenFromTemplate(screenName, templateId, {
      customizations,
      createdAt: new Date().toISOString(),
      createdBy: req.headers['x-admin-user'] || 'system'
    });
    
    res.json({
      success: true,
      data: screen,
      message: `Screen '${screenName}' created from template '${templateId}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;