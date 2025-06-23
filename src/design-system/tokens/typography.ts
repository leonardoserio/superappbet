export const typography = {
  fonts: {
    primary: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    mono: {
      regular: 'Menlo',
    },
  },
  
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  
  lineHeights: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
    '5xl': 56,
    '6xl': 72,
    '7xl': 80,
    '8xl': 112,
    '9xl': 144,
  },
  
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },
} as const;

export type FontSize = keyof typeof typography.fontSizes;
export type LineHeight = keyof typeof typography.lineHeights;
export type FontWeight = keyof typeof typography.fontWeights;