import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { ServerDrivenComponentProps } from './types';

interface TextProps extends ServerDrivenComponentProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'label' | 'title' | 'subtitle';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'inverse';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: keyof typeof import('@/design-system').typography.fontSizes;
  children?: string;
  text?: string;
}

export const Text: React.FC<TextProps> = ({
  schema,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  size,
  children,
  text,
}) => {
  const { theme } = useTheme();
  
  const getVariantStyles = (): TextStyle => {
    switch (variant) {
      case 'heading':
        return {
          fontSize: 24,
          lineHeight: 32,
          fontWeight: '700',
        };
      case 'title':
        return {
          fontSize: 20,
          lineHeight: 28,
          fontWeight: '700',
        };
      case 'subheading':
        return {
          fontSize: 20,
          lineHeight: 28,
          fontWeight: '600',
        };
      case 'subtitle':
        return {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '600',
        };
      case 'body':
        return {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '400',
        };
      case 'caption':
        return {
          fontSize: 12,
          lineHeight: 16,
          fontWeight: '400',
        };
      case 'label':
        return {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: '500',
        };
      default:
        return {};
    }
  };

  const textStyle: TextStyle = {
    ...getVariantStyles(),
    color: theme.colors.text[color],
    ...(weight && { fontWeight: require('@/design-system').typography.fontWeights[weight] }),
    ...(size && { fontSize: require('@/design-system').typography.fontSizes[size] }),
    ...schema?.props?.style,
  };

  const textContent = text || children || schema?.props?.text || schema?.props?.children?.[0] || '';

  return (
    <RNText style={textStyle}>
      {textContent}
    </RNText>
  );
};