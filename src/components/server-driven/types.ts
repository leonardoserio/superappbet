export interface ComponentProps {
  id?: string;
  className?: string;
  style?: Record<string, any>;
  children?: ComponentSchema[];
}

export interface ActionProps {
  type: string;
  payload?: Record<string, any>;
  target?: string;
}

export interface ComponentSchema {
  type: string;
  props?: ComponentProps;
  actions?: ActionProps[];
  children?: ComponentSchema[];
}

export interface ServerDrivenComponentProps {
  schema: ComponentSchema;
  onAction?: (action: ActionProps) => void | Promise<void>;
}