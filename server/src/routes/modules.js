const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { moduleStore } = require('../store/moduleStore');
const { broadcastUpdate } = require('../websocket/socketHandler');

// Import the server to get access to io
let io = null;
function setSocketIO(socketIO) {
  io = socketIO;
}

// Export the setter function
module.exports.setSocketIO = setSocketIO;

// Get all available modules
router.get('/', (req, res) => {
  try {
    const modules = moduleStore.getAllModules();
    res.json({
      success: true,
      data: modules,
      count: modules.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get enabled modules for a user/segment
router.get('/enabled', (req, res) => {
  try {
    const { userId, segment = 'default', region = 'default' } = req.query;
    
    const enabledModules = moduleStore.getEnabledModules({
      userId,
      segment,
      region
    });
    
    res.json({
      success: true,
      data: enabledModules,
      metadata: {
        userId,
        segment,
        region,
        appliedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Enable module for specific user/segment
router.post('/enable/:moduleId', (req, res) => {
  try {
    const { moduleId } = req.params;
    const { userId, segment, region, config = {} } = req.body;
    
    const result = moduleStore.enableModule(moduleId, {
      userId,
      segment,
      region,
      config,
      enabledAt: new Date().toISOString(),
      enabledBy: req.headers['x-admin-user'] || 'system'
    });
    
    // Broadcast module enabled event
    if (io) {
      io.emit('module_enabled', {
        moduleId,
        userId,
        segment,
        region,
        config: result
      });
    }
    
    res.json({
      success: true,
      data: result,
      message: `Module '${moduleId}' enabled successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Disable module
router.post('/disable/:moduleId', (req, res) => {
  try {
    const { moduleId } = req.params;
    const { userId, segment, region, reason } = req.body;
    
    moduleStore.disableModule(moduleId, {
      userId,
      segment,
      region,
      reason,
      disabledAt: new Date().toISOString(),
      disabledBy: req.headers['x-admin-user'] || 'system'
    });
    
    // Broadcast module disabled event
    if (io) {
      io.emit('module_disabled', {
        moduleId,
        userId,
        segment,
        region,
        reason
      });
    }
    
    res.json({
      success: true,
      message: `Module '${moduleId}' disabled successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get module configuration
router.get('/:moduleId/config', (req, res) => {
  try {
    const { moduleId } = req.params;
    const { userId, segment = 'default', region = 'default' } = req.query;
    
    const config = moduleStore.getModuleConfig(moduleId, {
      userId,
      segment,
      region
    });
    
    if (!config) {
      return res.status(404).json({
        success: false,
        error: `Module '${moduleId}' not found or not enabled`
      });
    }
    
    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update module configuration
router.put('/:moduleId/config', (req, res) => {
  try {
    const { moduleId } = req.params;
    const { config, segment = 'default', region = 'default' } = req.body;
    
    const updatedConfig = moduleStore.updateModuleConfig(moduleId, {
      config,
      segment,
      region,
      updatedAt: new Date().toISOString(),
      updatedBy: req.headers['x-admin-user'] || 'system'
    });
    
    // Broadcast config update
    broadcastUpdate('module_config_updated', {
      moduleId,
      segment,
      region,
      config: updatedConfig
    });
    
    res.json({
      success: true,
      data: updatedConfig,
      message: `Module '${moduleId}' configuration updated`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new module
router.post('/', (req, res) => {
  try {
    const {
      name,
      version,
      description,
      category,
      components = [],
      screens = [],
      actions = [],
      dependencies = [],
      defaultConfig = {}
    } = req.body;
    
    const module = moduleStore.createModule({
      id: uuidv4(),
      name,
      version,
      description,
      category,
      components,
      screens,
      actions,
      dependencies,
      defaultConfig,
      createdAt: new Date().toISOString(),
      createdBy: req.headers['x-admin-user'] || 'system',
      status: 'active'
    });
    
    res.json({
      success: true,
      data: module,
      message: `Module '${name}' created successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Execute module action
router.post('/:moduleId/actions/:actionType', (req, res) => {
  try {
    const { moduleId, actionType } = req.params;
    const { payload, userId, metadata = {} } = req.body;
    
    const result = moduleStore.executeModuleAction(moduleId, actionType, {
      payload,
      userId,
      metadata: {
        ...metadata,
        executedAt: new Date().toISOString(),
        requestId: uuidv4()
      }
    });
    
    res.json({
      success: true,
      data: result,
      metadata: {
        moduleId,
        actionType,
        executedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get module analytics
router.get('/:moduleId/analytics', (req, res) => {
  try {
    const { moduleId } = req.params;
    const { startDate, endDate, segment, region } = req.query;
    
    const analytics = moduleStore.getModuleAnalytics(moduleId, {
      startDate: startDate ? new Date(startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: endDate ? new Date(endDate) : new Date(),
      segment,
      region
    });
    
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

// Feature flag for module
router.post('/:moduleId/feature-flag', (req, res) => {
  try {
    const { moduleId } = req.params;
    const { flagName, enabled, conditions = {} } = req.body;
    
    const result = moduleStore.setFeatureFlag(moduleId, flagName, {
      enabled,
      conditions,
      updatedAt: new Date().toISOString(),
      updatedBy: req.headers['x-admin-user'] || 'system'
    });
    
    // Broadcast feature flag update
    broadcastUpdate('feature_flag_updated', {
      moduleId,
      flagName,
      enabled,
      conditions
    });
    
    res.json({
      success: true,
      data: result,
      message: `Feature flag '${flagName}' ${enabled ? 'enabled' : 'disabled'} for module '${moduleId}'`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Set the setter function before exporting
router.setSocketIO = setSocketIO;

module.exports = router;