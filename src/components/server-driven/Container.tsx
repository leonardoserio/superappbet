import React from 'react';
import { View, ViewStyle, ViewProps } from 'react-native';
import { useTheme } from '@/design-system';
import { ServerDrivenComponentProps } from './types';

interface ContainerProps extends Partial<ServerDrivenComponentProps>, ViewProps {
  variant?: 'default' | 'card' | 'section';
  padding?: keyof typeof import('@/design-system').spacing;
  margin?: keyof typeof import('@/design-system').spacing;
}

export const Container: React.FC<ContainerProps> = ({
  schema,
  variant = 'default',
  padding,
  margin,
  children,
  style,
  ...restProps
}) => {
  const { theme } = useTheme();
  
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'card':
        return {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.border.primary,
          shadowColor: theme.colors.text.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        };
      case 'section':
        return {
          backgroundColor: theme.colors.background.tertiary,
          borderRadius: 4,
        };
      default:
        return {};
    }
  };

  const containerStyle: ViewStyle = {
    ...getVariantStyles(),
    ...(padding && { padding: require('@/design-system').spacing[padding] }),
    ...(margin && { margin: require('@/design-system').spacing[margin] }),
    ...schema?.props?.style,
    ...(style as ViewStyle),
  };

  return (
    <View style={containerStyle} {...restProps}>
      {children}
    </View>
  );
};