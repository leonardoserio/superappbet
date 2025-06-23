export interface ModuleManifest {
  name: string;
  version: string;
  description?: string;
  dependencies?: string[];
  components?: ComponentRegistration[];
  screens?: ScreenRegistration[];
  actions?: ActionRegistration[];
}

export interface ComponentRegistration {
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

export interface ScreenRegistration {
  name: string;
  component: React.ComponentType<any>;
  route?: string;
  options?: Record<string, any>;
}

export interface ActionRegistration {
  type: string;
  handler: (payload: any) => Promise<any> | any;
}

export interface ModuleContext {
  theme: any;
  navigation: any;
  storage: any;
  api: any;
  analytics: any;
}

export abstract class MicroFrontend {
  abstract name: string;
  abstract version: string;
  abstract manifest: ModuleManifest;

  protected context?: ModuleContext;

  async initialize(context: ModuleContext): Promise<void> {
    this.context = context;
    await this.onInitialize();
    this.registerComponents();
    this.registerScreens();
    this.registerActions();
  }

  async uninitialize(): Promise<void> {
    await this.onUninitialize();
    this.context = undefined;
  }

  protected abstract onInitialize(): Promise<void>;
  protected abstract onUninitialize(): Promise<void>;
  protected abstract registerComponents(): void;
  protected abstract registerScreens(): void;
  protected abstract registerActions(): void;
  protected abstract onModuleAction(actionId: string, payload: any): Promise<any>;
}