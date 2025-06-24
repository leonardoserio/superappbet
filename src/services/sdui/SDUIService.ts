// Note: For now, we'll use fetch directly instead of ApiService to avoid import issues

export interface SDUIConfiguration {
  version: number;
  screens: Record<string, any>;
  components: Record<string, any>;
  themes: Record<string, any>;
  timestamp: string;
}

export interface ScreenConfiguration {
  layout?: {
    type: 'scroll' | 'tabs' | 'grid' | 'sections';
    backgroundColor?: string;
    sections?: any[];
    tabs?: any[];
  };
  // Support simple components array format (like render-from-json.tsx)
  components?: any[];
  // Support title for simple format
  title?: string;
  metadata?: {
    name: string;
    version: number;
    lastUpdated: string;
    cacheTTL?: number;
    personalizable?: boolean;
    dynamicContent?: boolean;
  };
  screenName?: string;
  variant?: string;
  generatedAt?: string;
}

export interface ComponentSchema {
  id: string;
  name: string;
  type: string;
  description?: string;
  category: string;
  schema: any;
  defaultProps: any;
  variants: string[];
  platforms: string[];
}

class SDUIServiceClass {
  private baseURL = 'http://localhost:3001/api';
  private configCache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  constructor() {
    // Using fetch directly for simplicity
  }

  // ==================== HEALTH CHECK ====================

  async healthCheck(): Promise<{ healthy: boolean; status: string; version?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        return {
          healthy: false,
          status: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
      
      const result = await response.json();
      
      return {
        healthy: result.status === 'healthy',
        status: result.status || 'unknown',
        version: result.version,
      };
    } catch (error) {
      console.error('SDUI: Health check failed:', error);
      return {
        healthy: false,
        status: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // ==================== COMPLETE CONFIGURATION ====================

  async getCompleteConfiguration(): Promise<SDUIConfiguration> {
    try {
      const response = await fetch(`${this.baseURL}/sdui/config`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch SDUI configuration');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to fetch complete configuration:', error);
      throw error;
    }
  }

  // ==================== SCREEN CONFIGURATION ====================

  async getScreenConfiguration(
    screenName: string, 
    options: {
      variant?: string;
      userId?: string;
      experimentGroup?: string;
    } = {}
  ): Promise<ScreenConfiguration> {
    try {
      const { variant = 'default', userId, experimentGroup } = options;
      const cacheKey = `${screenName}-${variant}-${userId || 'anonymous'}`;
      
      // Check cache first
      const cached = this.getCachedConfig(cacheKey);
      if (cached) {
        return cached;
      }

      const queryParams = new URLSearchParams({
        variant,
        ...(userId && { userId }),
        ...(experimentGroup && { experimentGroup })
      });

      const response = await fetch(`${this.baseURL}/sdui/screen/${screenName}?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || `Failed to fetch screen ${screenName}`);
      }
      
      // Cache the result
      const ttl = result.data.metadata?.cacheTTL || 300; // 5 minutes default
      this.cacheConfig(cacheKey, result.data, ttl);
      
      return result.data;
    } catch (error) {
      console.error(`SDUI: Failed to fetch screen ${screenName}:`, error);
      throw error;
    }
  }

  async updateScreenConfiguration(
    screenName: string,
    config: Partial<ScreenConfiguration>
  ): Promise<ScreenConfiguration> {
    try {
      const response = await fetch(`${this.baseURL}/sdui/screen/${screenName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update screen configuration');
      }
      
      // Clear cache for this screen
      this.clearScreenCache(screenName);
      
      return result.data;
    } catch (error) {
      console.error(`SDUI: Failed to update screen ${screenName}:`, error);
      throw error;
    }
  }

  async createScreenVariant(
    screenName: string,
    variantName: string,
    config: any,
    trafficSplit: number = 50
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/sdui/screen/${screenName}/variant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variantName,
          config,
          trafficSplit,
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create screen variant');
      }
      
      return result.data;
    } catch (error) {
      console.error(`SDUI: Failed to create variant for screen ${screenName}:`, error);
      throw error;
    }
  }

  // ==================== SPECIFIC SCREENS ====================

  async getHomeScreen(userId?: string, segment: string = 'default'): Promise<ScreenConfiguration> {
    try {
      const queryParams = new URLSearchParams({
        segment,
        ...(userId && { userId })
      });

      const response = await fetch(`${this.baseURL}/screens/home?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch home screen');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to fetch home screen:', error);
      throw error;
    }
  }

  async getSportsScreen(userId?: string, options: { sport?: string; live?: boolean } = {}): Promise<ScreenConfiguration> {
    try {
      const queryParams = new URLSearchParams({
        ...(userId && { userId }),
        ...(options.sport && { sport: options.sport }),
        ...(options.live !== undefined && { live: options.live.toString() })
      });

      const response = await fetch(`${this.baseURL}/screens/sports?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch sports screen');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to fetch sports screen:', error);
      throw error;
    }
  }

  async getCasinoScreen(userId?: string, options: { category?: string; gameType?: string } = {}): Promise<ScreenConfiguration> {
    try {
      const queryParams = new URLSearchParams({
        ...(userId && { userId }),
        ...(options.category && { category: options.category }),
        ...(options.gameType && { gameType: options.gameType })
      });

      const response = await fetch(`${this.baseURL}/screens/casino?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch casino screen');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to fetch casino screen:', error);
      throw error;
    }
  }

  async getLotteryScreen(userId?: string, region: string = 'BR'): Promise<ScreenConfiguration> {
    try {
      const queryParams = new URLSearchParams({
        region,
        ...(userId && { userId })
      });

      const response = await fetch(`${this.baseURL}/screens/lottery?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch lottery screen');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to fetch lottery screen:', error);
      throw error;
    }
  }

  async getProfileScreen(userId: string, section: string = 'overview'): Promise<ScreenConfiguration> {
    try {
      const queryParams = new URLSearchParams({
        userId,
        section
      });

      const response = await fetch(`${this.baseURL}/screens/profile?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch profile screen');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to fetch profile screen:', error);
      throw error;
    }
  }

  // ==================== COMPONENT LIBRARY ====================

  async getComponentLibrary(filters: {
    category?: string;
    platform?: string;
    status?: string;
  } = {}): Promise<ComponentSchema[]> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`${this.baseURL}/components?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch component library');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to fetch component library:', error);
      throw error;
    }
  }

  async getComponent(componentId: string): Promise<ComponentSchema> {
    try {
      const response = await fetch(`${this.baseURL}/components/${componentId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || `Failed to fetch component ${componentId}`);
      }
      
      return result.data;
    } catch (error) {
      console.error(`SDUI: Failed to fetch component ${componentId}:`, error);
      throw error;
    }
  }

  // ==================== THEME MANAGEMENT ====================

  async getTheme(variant: string = 'default'): Promise<any> {
    try {
      const queryParams = new URLSearchParams({ variant });
      const response = await fetch(`${this.baseURL}/sdui/theme?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch theme');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to fetch theme:', error);
      throw error;
    }
  }

  async updateTheme(variant: string, themeConfig: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/sdui/theme`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variant,
          ...themeConfig,
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update theme');
      }
      
      return result.data;
    } catch (error) {
      console.error('SDUI: Failed to update theme:', error);
      throw error;
    }
  }

  // ==================== ANALYTICS ====================

  async trackEvent(
    event: string,
    properties: any = {},
    userId?: string,
    sessionId?: string
  ): Promise<void> {
    try {
      await fetch(`${this.baseURL}/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          properties,
          userId,
          sessionId,
          timestamp: new Date().toISOString(),
          platform: 'mobile', // or detect platform
          appVersion: '1.0.0', // get from app info
        }),
      });
    } catch (error) {
      console.error('SDUI: Failed to track event:', error);
      // Don't throw - analytics should not break the app
    }
  }

  async getScreenAnalytics(
    screenName: string,
    options: {
      startDate?: string;
      endDate?: string;
      segment?: string;
      platform?: string;
    } = {}
  ): Promise<any> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`${this.baseURL}/analytics/screens/${screenName}?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch screen analytics');
      }
      
      return result.data;
    } catch (error) {
      console.error(`SDUI: Failed to fetch analytics for screen ${screenName}:`, error);
      throw error;
    }
  }

  // ==================== CACHE MANAGEMENT ====================

  private getCachedConfig(key: string): any | null {
    const cached = this.configCache.get(key);
    if (!cached) return null;
    
    const now = Date.now();
    if (now > cached.timestamp + cached.ttl * 1000) {
      this.configCache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private cacheConfig(key: string, data: any, ttlSeconds: number): void {
    this.configCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds,
    });
  }

  private clearScreenCache(screenName: string): void {
    const keysToDelete = Array.from(this.configCache.keys())
      .filter(key => key.startsWith(`${screenName}-`));
    
    keysToDelete.forEach(key => this.configCache.delete(key));
  }

  clearAllCache(): void {
    this.configCache.clear();
  }

  // ==================== FORCE REFRESH ====================

  async forceRefresh(reason: string = 'Manual refresh'): Promise<void> {
    try {
      await fetch(`${this.baseURL}/sdui/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      
      // Clear local cache
      this.clearAllCache();
    } catch (error) {
      console.error('SDUI: Failed to force refresh:', error);
      throw error;
    }
  }
}

export const SDUIService = new SDUIServiceClass();