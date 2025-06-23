import React from 'react';
import { ComponentSchema, ComponentProps } from '@/components/server-driven/types';

interface RegisteredComponent {
  name: string;
  component: React.ComponentType<any>;
  validator?: (props: ComponentProps) => boolean;
}

class ComponentRegistryClass {
  private components: Map<string, RegisteredComponent> = new Map();

  register(
    name: string,
    component: React.ComponentType<any>,
    validator?: (props: ComponentProps) => boolean
  ): void {
    this.components.set(name, {
      name,
      component,
      validator,
    });

    console.log(`Component "${name}" registered successfully`);
  }

  unregister(name: string): void {
    if (this.components.delete(name)) {
      console.log(`Component "${name}" unregistered successfully`);
    } else {
      console.warn(`Component "${name}" not found for unregistration`);
    }
  }

  get(name: string): React.ComponentType<any> | undefined {
    const registered = this.components.get(name);
    return registered?.component;
  }

  has(name: string): boolean {
    return this.components.has(name);
  }

  validate(name: string, props: ComponentProps): boolean {
    const registered = this.components.get(name);
    if (!registered) {
      console.error(`Component "${name}" not found`);
      return false;
    }

    if (registered.validator) {
      return registered.validator(props);
    }

    return true;
  }

  getRegisteredComponents(): string[] {
    return Array.from(this.components.keys());
  }

  createComponent(schema: ComponentSchema): React.ReactElement | null {
    const Component = this.get(schema?.type);
    if (!Component) {
      console.error(`Component "${schema?.type}" not registered`);
      return null;
    }

    if (!this.validate(schema?.type, schema?.props || {})) {
      console.error(`Invalid props for component "${schema?.type}"`);
      return null;
    }

    try {
      return React.createElement(Component, {
        ...schema?.props,
        schema,
        key: schema?.props?.id || Math.random().toString(36).substr(2, 9),
      });
    } catch (error) {
      console.error(`Error creating component "${schema?.type}":`, error);
      return null;
    }
  }

  registerDefaults(): void {
    // This would typically import and register default components
    console.log('Registering default components...');
    
    // Example of how components would be registered:
    // this.register('container', Container);
    // this.register('text', Text);
    // this.register('button', Button);
    // this.register('betslip', BetSlip);
  }
}

export const ComponentRegistry = new ComponentRegistryClass();