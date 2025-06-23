import { MicroFrontend, ModuleManifest, ComponentRegistration, ScreenRegistration, ActionRegistration } from './types';

class ModuleRegistryClass {
  private modules: Map<string, MicroFrontend> = new Map();
  private components: Map<string, ComponentRegistration> = new Map();
  private screens: Map<string, ScreenRegistration> = new Map();
  private actions: Map<string, ActionRegistration> = new Map();

  async registerModule(module: MicroFrontend, context: any): Promise<void> {
    try {
      await module.initialize(context);
      this.modules.set(module.name, module);
      
      // Register module components
      module.manifest.components?.forEach(component => {
        this.components.set(component.name, component);
      });

      // Register module screens
      module.manifest.screens?.forEach(screen => {
        this.screens.set(screen.name, screen);
      });

      // Register module actions
      module.manifest.actions?.forEach(action => {
        this.actions.set(action.type, action);
      });

      console.log(`Module ${module.name} v${module.version} registered successfully`);
    } catch (error) {
      console.error(`Failed to register module ${module.name}:`, error);
      throw error;
    }
  }

  async unregisterModule(moduleName: string): Promise<void> {
    const module = this.modules.get(moduleName);
    if (!module) {
      console.warn(`Module ${moduleName} not found`);
      return;
    }

    try {
      await module.uninitialize();
      
      // Remove module components
      module.manifest.components?.forEach(component => {
        this.components.delete(component.name);
      });

      // Remove module screens
      module.manifest.screens?.forEach(screen => {
        this.screens.delete(screen.name);
      });

      // Remove module actions
      module.manifest.actions?.forEach(action => {
        this.actions.delete(action.type);
      });

      this.modules.delete(moduleName);
      console.log(`Module ${moduleName} unregistered successfully`);
    } catch (error) {
      console.error(`Failed to unregister module ${moduleName}:`, error);
      throw error;
    }
  }

  getModule(name: string): MicroFrontend | undefined {
    return this.modules.get(name);
  }

  getComponent(name: string): ComponentRegistration | undefined {
    return this.components.get(name);
  }

  getScreen(name: string): ScreenRegistration | undefined {
    return this.screens.get(name);
  }

  getAction(type: string): ActionRegistration | undefined {
    return this.actions.get(type);
  }

  getRegisteredModules(): ModuleManifest[] {
    return Array.from(this.modules.values()).map(module => module.manifest);
  }

  getRegisteredComponents(): ComponentRegistration[] {
    return Array.from(this.components.values());
  }

  getRegisteredScreens(): ScreenRegistration[] {
    return Array.from(this.screens.values());
  }

  async executeAction(type: string, payload: any): Promise<any> {
    const action = this.actions.get(type);
    if (!action) {
      throw new Error(`Action ${type} not found`);
    }

    try {
      return await action.handler(payload);
    } catch (error) {
      console.error(`Failed to execute action ${type}:`, error);
      throw error;
    }
  }

  validateModuleDependencies(module: MicroFrontend): boolean {
    if (!module.manifest.dependencies) {
      return true;
    }

    return module.manifest.dependencies.every(dep => {
      const dependencyModule = this.modules.get(dep);
      if (!dependencyModule) {
        console.error(`Module ${module.name} depends on ${dep} which is not registered`);
        return false;
      }
      return true;
    });
  }
}

export const ModuleRegistry = new ModuleRegistryClass();