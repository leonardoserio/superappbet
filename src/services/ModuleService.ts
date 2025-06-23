import { ModuleRegistry } from '@/modules/core';
import { BettingModule } from '@/modules/betting';
import { CasinoModule } from '@/modules/casino';
import { WebSocketService } from '@/services/sdui/WebSocketService';

// Backend API service for modules
class BackendModuleService {
  private baseURL = 'http://localhost:3001/api';
  private userId?: string;
  
  setUserId(userId: string) {
    this.userId = userId;
  }
  
  async getEnabledModules(segment: string = 'default', region: string = 'BR'): Promise<any[]> {
    try {
      const queryParams = new URLSearchParams({
        segment,
        region,
        ...(this.userId && { userId: this.userId })
      });
      
      const response = await fetch(`${this.baseURL}/modules/enabled?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch enabled modules');
      }
      
      return result.data;
    } catch (error) {
      console.error('Failed to fetch enabled modules from backend:', error);
      throw error;
    }
  }
  
  async enableModule(moduleId: string, config: any = {}): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/modules/enable/${moduleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.userId,
          segment: 'default',
          region: 'BR',
          config
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to enable module');
      }
      
      return result.data;
    } catch (error) {
      console.error(`Failed to enable module ${moduleId}:`, error);
      throw error;
    }
  }
  
  async disableModule(moduleId: string, reason?: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/modules/disable/${moduleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.userId,
          segment: 'default',
          region: 'BR',
          reason
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to disable module');
      }
    } catch (error) {
      console.error(`Failed to disable module ${moduleId}:`, error);
      throw error;
    }
  }
  
  async executeModuleAction(moduleId: string, actionType: string, payload: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/modules/${moduleId}/actions/${actionType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload,
          userId: this.userId,
          metadata: {
            timestamp: new Date().toISOString(),
            source: 'mobile-app'
          }
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to execute module action');
      }
      
      return result.data;
    } catch (error) {
      console.error(`Failed to execute action ${actionType} on module ${moduleId}:`, error);
      throw error;
    }
  }
  
  async getModuleConfig(moduleId: string): Promise<any> {
    try {
      const queryParams = new URLSearchParams({
        userId: this.userId || '',
        segment: 'default',
        region: 'BR'
      });
      
      const response = await fetch(`${this.baseURL}/modules/${moduleId}/config?${queryParams}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch module config');
      }
      
      return result.data;
    } catch (error) {
      console.error(`Failed to fetch config for module ${moduleId}:`, error);
      throw error;
    }
  }
}

const backendModuleService = new BackendModuleService();

export class ModuleService {
  private static instance: ModuleService;
  private initialized = false;
  private enabledModules: string[] = [];
  private userId?: string;
  private useBackend = true; // Flag to use backend vs local modules

  static getInstance(): ModuleService {
    if (!ModuleService.instance) {
      ModuleService.instance = new ModuleService();
    }
    return ModuleService.instance;
  }
  
  setUserId(userId: string): void {
    this.userId = userId;
    backendModuleService.setUserId(userId);
    WebSocketService.updateUserId(userId);
  }
  
  setUseBackend(useBackend: boolean): void {
    this.useBackend = useBackend;
  }

  async initializeModules(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      console.log('Initializing modules...');
      
      if (this.useBackend) {
        // Fetch enabled modules from backend
        const backendModules = await backendModuleService.getEnabledModules();
        
        // Register local module instances for enabled backend modules
        for (const moduleData of backendModules) {
          await this.registerLocalModule(moduleData.id, moduleData.config);
        }
        
        this.enabledModules = backendModules.map(m => m.id);
        console.log('Modules initialized from backend:', this.enabledModules);
      } else {
        // Fallback to local initialization
        await this.initializeLocalModules();
      }

      this.initialized = true;
      console.log('All modules initialized successfully');
    } catch (error) {
      console.error('Failed to initialize modules:', error);
      // Fallback to local modules if backend fails
      if (this.useBackend) {
        console.log('Falling back to local module initialization...');
        await this.initializeLocalModules();
        this.initialized = true;
      } else {
        throw error;
      }
    }
  }
  
  private async initializeLocalModules(): Promise<void> {
    const defaultModules = ['betting', 'casino'];
    
    for (const moduleName of defaultModules) {
      await this.registerLocalModule(moduleName);
    }
    
    this.enabledModules = [...defaultModules];
  }
  
  private async registerLocalModule(moduleId: string, config: any = {}): Promise<void> {
    try {
      switch (moduleId) {
        case 'betting':
          const bettingModule = new BettingModule();
          await ModuleRegistry.registerModule(bettingModule, config);
          console.log('Betting module registered');
          break;
        case 'casino':
          const casinoModule = new CasinoModule();
          await ModuleRegistry.registerModule(casinoModule, config);
          console.log('Casino module registered');
          break;
        default:
          console.warn(`Unknown module: ${moduleId}`);
      }
    } catch (error) {
      console.error(`Failed to register local module ${moduleId}:`, error);
    }
  }

  async enableModule(moduleName: string, config: any = {}): Promise<void> {
    if (this.enabledModules.includes(moduleName)) {
      console.log(`Module ${moduleName} is already enabled`);
      return;
    }

    try {
      if (this.useBackend) {
        // Enable module via backend
        const result = await backendModuleService.enableModule(moduleName, config);
        
        // Register local module instance
        await this.registerLocalModule(moduleName, result.config);
        
        console.log(`Module ${moduleName} enabled via backend`);
      } else {
        // Local module enabling
        await this.registerLocalModule(moduleName, config);
      }

      this.enabledModules.push(moduleName);
      console.log(`Module ${moduleName} enabled successfully`);
    } catch (error) {
      console.error(`Failed to enable module ${moduleName}:`, error);
      throw error;
    }
  }

  async disableModule(moduleName: string, reason?: string): Promise<void> {
    if (!this.enabledModules.includes(moduleName)) {
      console.log(`Module ${moduleName} is already disabled`);
      return;
    }

    try {
      if (this.useBackend) {
        // Disable module via backend
        await backendModuleService.disableModule(moduleName, reason);
      }
      
      // Unregister local module
      await ModuleRegistry.unregisterModule(moduleName);
      this.enabledModules = this.enabledModules.filter(name => name !== moduleName);
      console.log(`Module ${moduleName} disabled successfully`);
    } catch (error) {
      console.error(`Failed to disable module ${moduleName}:`, error);
      throw error;
    }
  }

  getEnabledModules(): string[] {
    return [...this.enabledModules];
  }

  isModuleEnabled(moduleName: string): boolean {
    return this.enabledModules.includes(moduleName);
  }

  getRegisteredModules() {
    return ModuleRegistry.getRegisteredModules();
  }
  
  async executeModuleAction(moduleId: string, actionType: string, payload: any): Promise<any> {
    try {
      if (this.useBackend) {
        // Execute action via backend (will also trigger WebSocket events)
        return await backendModuleService.executeModuleAction(moduleId, actionType, payload);
      } else {
        // Execute action locally via ModuleRegistry
        return await ModuleRegistry.executeAction(`${moduleId}/${actionType}`, payload);
      }
    } catch (error) {
      console.error(`Failed to execute action ${actionType} on module ${moduleId}:`, error);
      throw error;
    }
  }
  
  async getModuleConfig(moduleId: string): Promise<any> {
    try {
      if (this.useBackend) {
        return await backendModuleService.getModuleConfig(moduleId);
      } else {
        // Get local module config
        const module = ModuleRegistry.getModule(moduleId);
        return module?.manifest || null;
      }
    } catch (error) {
      console.error(`Failed to get config for module ${moduleId}:`, error);
      throw error;
    }
  }
  
  async refreshModulesFromBackend(): Promise<void> {
    if (!this.useBackend) return;
    
    try {
      const backendModules = await backendModuleService.getEnabledModules();
      
      // Disable modules that are no longer enabled
      for (const localModule of this.enabledModules) {
        const stillEnabled = backendModules.some(m => m.id === localModule);
        if (!stillEnabled) {
          await this.disableModule(localModule, 'Backend sync');
        }
      }
      
      // Enable new modules
      for (const backendModule of backendModules) {
        if (!this.enabledModules.includes(backendModule.id)) {
          await this.enableModule(backendModule.id, backendModule.config);
        }
      }
      
      console.log('Modules refreshed from backend');
    } catch (error) {
      console.error('Failed to refresh modules from backend:', error);
    }
  }
}

// Setup WebSocket handlers for real-time module updates
WebSocketService.setEventHandlers({
  onModuleEnabled: async (data) => {
    const moduleService = ModuleService.getInstance();
    if (!moduleService.isModuleEnabled(data.moduleId)) {
      await moduleService.enableModule(data.moduleId, data.config);
      console.log(`Module ${data.moduleId} enabled via WebSocket`);
    }
  },
  
  onModuleDisabled: async (data) => {
    const moduleService = ModuleService.getInstance();
    if (moduleService.isModuleEnabled(data.moduleId)) {
      await moduleService.disableModule(data.moduleId, data.reason);
      console.log(`Module ${data.moduleId} disabled via WebSocket`);
    }
  },
  
  onModuleConfigUpdated: async (data) => {
    console.log(`Module ${data.moduleId} config updated via WebSocket`);
    // Handle module config updates if needed
  },
});