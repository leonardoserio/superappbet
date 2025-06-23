import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { ServerDrivenComponentProps } from './types';

interface ButtonProps extends ServerDrivenComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  title?: string;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  schema,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  title,
  onPress,
}) => {
  const { theme } = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? theme.colors.neutral[300] : theme.colors.interactive.primary,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? theme.colors.neutral[100] : theme.colors.interactive.secondary,
          borderWidth: 1,
          borderColor: theme.colors.border.primary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? theme.colors.neutral[300] : theme.colors.interactive.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 4,
        };
      case 'medium':
        return {
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 6,
        };
      case 'large':
        return {
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderRadius: 8,
        };
      default:
        return {};
    }
  };

  const getTextStyles = (): TextStyle => {
    let color = theme.colors.text.primary;
    
    if (variant === 'primary') {
      color = disabled ? theme.colors.text.tertiary : theme.colors.text.inverse;
    } else if (variant === 'outline' || variant === 'ghost') {
      color = disabled ? theme.colors.text.tertiary : theme.colors.interactive.primary;
    }

    return {
      color,
      fontWeight: '600',
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
      textAlign: 'center',
    };
  };

  const buttonStyle: ViewStyle = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    opacity: disabled ? 0.6 : 1,
    ...schema?.props?.style,
  };

  const textStyle: TextStyle = getTextStyles();

  const buttonTitle = title || schema?.props?.title || 'Button';

  const handlePress = () => {
    if (!disabled) {
      onPress?.();
      if (schema?.actions) {
        schema?.actions.forEach(action => {
          // Handle action - this would typically be handled by a parent component
          console.log('Action triggered:', action);
        });
      }
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};