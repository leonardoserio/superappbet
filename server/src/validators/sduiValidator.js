const Joi = require('joi');

// Component schema validation
const componentSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  props: Joi.object().default({}),
  children: Joi.array().items(Joi.link('#component')).optional(),
  conditions: Joi.object({
    platform: Joi.array().items(Joi.string().valid('ios', 'android', 'web')),
    userSegment: Joi.array().items(Joi.string()),
    featureFlag: Joi.string(),
    dateRange: Joi.object({
      start: Joi.date(),
      end: Joi.date()
    }),
    geoLocation: Joi.array().items(Joi.string()),
    abTest: Joi.object({
      testId: Joi.string().required(),
      variant: Joi.string().required()
    })
  }).optional(),
  actions: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('navigate', 'module_action', 'api_call', 'analytics_track').required(),
      payload: Joi.object().required()
    })
  ).optional()
}).id('component');

// Section schema validation
const sectionSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().valid('hero', 'grid', 'carousel', 'list', 'banner', 'tabs').required(),
  title: Joi.string().optional(),
  components: Joi.array().items(componentSchema).required(),
  conditions: Joi.object({
    platform: Joi.array().items(Joi.string().valid('ios', 'android', 'web')),
    userSegment: Joi.array().items(Joi.string()),
    featureFlag: Joi.string()
  }).optional(),
  style: Joi.object().optional()
});

// Layout schema validation
const layoutSchema = Joi.object({
  type: Joi.string().valid('scroll', 'tabs', 'grid', 'sections').required(),
  backgroundColor: Joi.string().optional(),
  sections: Joi.array().items(sectionSchema).optional(),
  tabs: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      title: Joi.string().required(),
      icon: Joi.string().optional(),
      components: Joi.array().items(componentSchema).required(),
      conditions: Joi.object().optional()
    })
  ).optional(),
  header: Joi.object({
    title: Joi.string(),
    backgroundColor: Joi.string(),
    textColor: Joi.string(),
    showBack: Joi.boolean().default(false)
  }).optional(),
  footer: Joi.object({
    visible: Joi.boolean().default(true),
    style: Joi.object()
  }).optional()
});

// Screen configuration schema
const screenConfigSchema = Joi.object({
  layout: layoutSchema.required(),
  metadata: Joi.object({
    name: Joi.string().required(),
    version: Joi.number().integer().min(1).default(1),
    description: Joi.string().optional(),
    lastUpdated: Joi.date().default(() => new Date()),
    cacheTTL: Joi.number().integer().min(0).default(300), // seconds
    personalizable: Joi.boolean().default(false),
    dynamicContent: Joi.boolean().default(false),
    refreshInterval: Joi.number().integer().min(10).optional(), // seconds
    ageRestriction: Joi.number().integer().min(0).max(100).optional(),
    geoRestrictions: Joi.array().items(Joi.string()).optional(),
    featureFlags: Joi.array().items(Joi.string()).optional()
  }).required(),
  variants: Joi.object().pattern(
    Joi.string(),
    Joi.object({
      layout: layoutSchema.required(),
      conditions: Joi.object().optional(),
      trafficSplit: Joi.number().min(0).max(100).optional()
    })
  ).optional(),
  abTests: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      variants: Joi.array().items(Joi.string()).required(),
      trafficSplit: Joi.number().min(0).max(100).required(),
      conditions: Joi.object().optional(),
      status: Joi.string().valid('draft', 'active', 'paused', 'completed').default('draft')
    })
  ).optional()
});

// Component library schema
const componentLibrarySchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().optional(),
  category: Joi.string().valid('layout', 'typography', 'interactive', 'media', 'betting', 'casino', 'promotional').required(),
  schema: Joi.object({
    type: Joi.string().valid('object').required(),
    properties: Joi.object().required(),
    required: Joi.array().items(Joi.string()).optional()
  }).required(),
  defaultProps: Joi.object().required(),
  variants: Joi.array().items(Joi.string()).default(['default']),
  platforms: Joi.array().items(Joi.string().valid('ios', 'android', 'web', 'all')).default(['ios', 'android']),
  conditions: Joi.object().optional(),
  examples: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      props: Joi.object().required(),
      description: Joi.string().optional()
    })
  ).optional()
});

// Theme schema
const themeSchema = Joi.object({
  colors: Joi.object({
    background: Joi.object({
      primary: Joi.string().required(),
      secondary: Joi.string().required(),
      accent: Joi.string().optional()
    }).required(),
    text: Joi.object({
      primary: Joi.string().required(),
      secondary: Joi.string().required(),
      tertiary: Joi.string().optional(),
      inverse: Joi.string().optional()
    }).required(),
    interactive: Joi.object({
      primary: Joi.string().required(),
      secondary: Joi.string().required(),
      success: Joi.string().required(),
      warning: Joi.string().required(),
      danger: Joi.string().required()
    }).required(),
    border: Joi.object({
      primary: Joi.string().required(),
      secondary: Joi.string().optional()
    }).required()
  }).required(),
  typography: Joi.object({
    fontFamily: Joi.string().required(),
    sizes: Joi.object({
      xs: Joi.number().required(),
      sm: Joi.number().required(),
      md: Joi.number().required(),
      lg: Joi.number().required(),
      xl: Joi.number().required(),
      xxl: Joi.number().required()
    }).required(),
    weights: Joi.object({
      normal: Joi.string().default('400'),
      medium: Joi.string().default('500'),
      semibold: Joi.string().default('600'),
      bold: Joi.string().default('700')
    }).optional()
  }).required(),
  spacing: Joi.object({
    xs: Joi.number().required(),
    sm: Joi.number().required(),
    md: Joi.number().required(),
    lg: Joi.number().required(),
    xl: Joi.number().required(),
    xxl: Joi.number().required()
  }).required(),
  borderRadius: Joi.object({
    sm: Joi.number().default(4),
    md: Joi.number().default(8),
    lg: Joi.number().default(12),
    xl: Joi.number().default(16)
  }).optional(),
  shadows: Joi.object().optional()
});

// Module schema
const moduleSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  version: Joi.string().pattern(/^\d+\.\d+\.\d+$/).required(),
  description: Joi.string().optional(),
  category: Joi.string().valid('gambling', 'financial', 'social', 'utility', 'entertainment').required(),
  components: Joi.array().items(Joi.string()).default([]),
  screens: Joi.array().items(Joi.string()).default([]),
  actions: Joi.array().items(Joi.string()).default([]),
  dependencies: Joi.array().items(Joi.string()).default([]),
  defaultConfig: Joi.object().default({}),
  permissions: Joi.array().items(
    Joi.string().valid('location', 'camera', 'microphone', 'notifications', 'storage')
  ).optional(),
  minAppVersion: Joi.string().optional(),
  maxAppVersion: Joi.string().optional(),
  platforms: Joi.array().items(Joi.string().valid('ios', 'android', 'web')).default(['ios', 'android']),
  geoRestrictions: Joi.array().items(Joi.string()).optional(),
  ageRestriction: Joi.number().integer().min(0).max(100).optional()
});

// Validation functions
function validateSDUISchema(data) {
  const { error } = screenConfigSchema.validate(data, { allowUnknown: false });
  
  return {
    isValid: !error,
    errors: error ? error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
      value: detail.context?.value
    })) : []
  };
}

function validateComponent(data) {
  const { error } = componentSchema.validate(data, { allowUnknown: false });
  
  return {
    isValid: !error,
    errors: error ? error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    })) : []
  };
}

function validateComponentLibrary(data) {
  const { error } = componentLibrarySchema.validate(data, { allowUnknown: false });
  
  return {
    isValid: !error,
    errors: error ? error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    })) : []
  };
}

function validateTheme(data) {
  const { error } = themeSchema.validate(data, { allowUnknown: false });
  
  return {
    isValid: !error,
    errors: error ? error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    })) : []
  };
}

function validateModule(data) {
  const { error } = moduleSchema.validate(data, { allowUnknown: false });
  
  return {
    isValid: !error,
    errors: error ? error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    })) : []
  };
}

function validateLayout(data) {
  const { error } = layoutSchema.validate(data, { allowUnknown: false });
  
  return {
    isValid: !error,
    errors: error ? error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    })) : []
  };
}

// Business rule validations
function validateComponentConditions(component, userContext = {}) {
  if (!component.conditions) return { allowed: true };

  const { platform, userSegment, geoLocation } = userContext;
  const conditions = component.conditions;

  // Platform validation
  if (conditions.platform && platform) {
    if (!conditions.platform.includes(platform)) {
      return { 
        allowed: false, 
        reason: `Component not available for platform: ${platform}` 
      };
    }
  }

  // User segment validation
  if (conditions.userSegment && userSegment) {
    if (!conditions.userSegment.includes(userSegment)) {
      return { 
        allowed: false, 
        reason: `Component not available for user segment: ${userSegment}` 
      };
    }
  }

  // Geo location validation
  if (conditions.geoLocation && geoLocation) {
    if (!conditions.geoLocation.includes(geoLocation)) {
      return { 
        allowed: false, 
        reason: `Component not available in location: ${geoLocation}` 
      };
    }
  }

  // Date range validation
  if (conditions.dateRange) {
    const now = new Date();
    const start = new Date(conditions.dateRange.start);
    const end = new Date(conditions.dateRange.end);
    
    if (now < start || now > end) {
      return { 
        allowed: false, 
        reason: `Component not available in current date range` 
      };
    }
  }

  return { allowed: true };
}

function validateScreenPermissions(screenConfig, userContext = {}) {
  const { ageRestriction, geoRestrictions } = screenConfig.metadata;
  const { userAge, userLocation } = userContext;

  // Age restriction validation
  if (ageRestriction && userAge) {
    if (userAge < ageRestriction) {
      return {
        allowed: false,
        reason: `Screen requires minimum age of ${ageRestriction}`
      };
    }
  }

  // Geo restriction validation
  if (geoRestrictions && userLocation) {
    if (!geoRestrictions.includes(userLocation)) {
      return {
        allowed: false,
        reason: `Screen not available in location: ${userLocation}`
      };
    }
  }

  return { allowed: true };
}

function validateModuleCompatibility(moduleData, appContext = {}) {
  const { appVersion, platform } = appContext;
  
  // Platform compatibility
  if (moduleData.platforms && platform) {
    if (!moduleData.platforms.includes(platform)) {
      return {
        compatible: false,
        reason: `Module not compatible with platform: ${platform}`
      };
    }
  }

  // App version compatibility
  if (moduleData.minAppVersion && appVersion) {
    if (compareVersions(appVersion, moduleData.minAppVersion) < 0) {
      return {
        compatible: false,
        reason: `Module requires app version ${moduleData.minAppVersion} or higher`
      };
    }
  }

  if (moduleData.maxAppVersion && appVersion) {
    if (compareVersions(appVersion, moduleData.maxAppVersion) > 0) {
      return {
        compatible: false,
        reason: `Module not compatible with app version ${appVersion}`
      };
    }
  }

  return { compatible: true };
}

// Helper function to compare semantic versions
function compareVersions(version1, version2) {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;
    
    if (v1Part > v2Part) return 1;
    if (v1Part < v2Part) return -1;
  }
  
  return 0;
}

module.exports = {
  validateSDUISchema,
  validateComponent,
  validateComponentLibrary,
  validateTheme,
  validateModule,
  validateLayout,
  validateComponentConditions,
  validateScreenPermissions,
  validateModuleCompatibility,
  componentSchema,
  screenConfigSchema,
  themeSchema,
  moduleSchema
};