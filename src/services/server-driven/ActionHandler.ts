import { ActionProps } from '@/components/server-driven/types';

interface ActionHandler {
  type: string;
  handler: (payload: any) => Promise<any> | any;
  validator?: (payload: any) => boolean;
}

class ActionHandlerClass {
  private handlers: Map<string, ActionHandler> = new Map();

  register(
    type: string,
    handler: (payload: any) => Promise<any> | any,
    validator?: (payload: any) => boolean
  ): void {
    this.handlers.set(type, {
      type,
      handler,
      validator,
    });

    console.log(`Action handler "${type}" registered successfully`);
  }

  unregister(type: string): void {
    if (this.handlers.delete(type)) {
      console.log(`Action handler "${type}" unregistered successfully`);
    } else {
      console.warn(`Action handler "${type}" not found for unregistration`);
    }
  }

  async execute(action: ActionProps): Promise<any> {
    const actionHandler = this.handlers.get(action.type);
    if (!actionHandler) {
      console.error(`Action handler for "${action.type}" not found`);
      throw new Error(`Action handler for "${action.type}" not found`);
    }

    // Validate payload if validator exists
    if (actionHandler.validator && !actionHandler.validator(action.payload)) {
      console.error(`Invalid payload for action "${action.type}"`);
      throw new Error(`Invalid payload for action "${action.type}"`);
    }

    try {
      console.log(`Executing action "${action.type}" with payload:`, action.payload);
      const result = await actionHandler.handler(action.payload);
      console.log(`Action "${action.type}" executed successfully:`, result);
      return result;
    } catch (error) {
      console.error(`Error executing action "${action.type}":`, error);
      throw error;
    }
  }

  has(type: string): boolean {
    return this.handlers.has(type);
  }

  getRegisteredActions(): string[] {
    return Array.from(this.handlers.keys());
  }

  registerDefaults(): void {
    console.log('Registering default action handlers...');

    // Navigation actions
    this.register('navigate', async (payload) => {
      console.log('Navigate to:', payload.route);
      // Navigation logic would go here
      return { success: true };
    });

    // API actions
    this.register('api/request', async (payload) => {
      console.log('API request:', payload);
      // API request logic would go here
      return { success: true, data: null };
    });

    // Analytics actions
    this.register('analytics/track', async (payload) => {
      console.log('Track event:', payload.event, payload.properties);
      // Analytics tracking logic would go here
      return { success: true };
    });

    // Modal actions
    this.register('modal/open', async (payload) => {
      console.log('Open modal:', payload.modalType);
      return { success: true };
    });

    this.register('modal/close', async (payload) => {
      console.log('Close modal:', payload.modalId);
      return { success: true };
    });

    // Form actions
    this.register('form/submit', async (payload) => {
      console.log('Submit form:', payload.formData);
      return { success: true };
    });

    // Betting actions
    this.register('betting/add-selection', async (payload) => {
      console.log('Add betting selection:', payload);
      return { success: true };
    });

    this.register('betting/place-bet', async (payload) => {
      console.log('Place bet:', payload);
      return { success: true, betId: Date.now().toString() };
    });
  }
}

export const ActionHandler = new ActionHandlerClass();