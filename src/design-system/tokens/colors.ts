export const colors = {
  // Modern betting brand colors (inspired by Bet365, Betano, Sportingbet)
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main brand blue
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Secondary accent (bright orange/gold)
  secondary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main accent
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Dark grays for modern UI
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Success (modern green)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Danger (vibrant red)
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Warning (bright yellow)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Betting specific colors (inspired by major betting apps)
  betting: {
    win: '#16a34a', // Strong green
    lose: '#dc2626', // Strong red
    pending: '#f59e0b', // Bright orange
    void: '#6b7280', // Neutral gray
    live: '#ef4444', // Live red
    boost: '#7c3aed', // Purple for odds boosts
    cashout: '#059669', // Emerald for cashout
    odds: {
      positive: '#16a34a', // Green for good odds
      negative: '#dc2626', // Red for bad odds
      even: '#525252', // Dark gray for even odds
      favorite: '#0ea5e9', // Blue for favorites
      underdog: '#f59e0b', // Orange for underdogs
    },
  },
  
  // Modern gradients for cards and buttons
  gradients: {
    primary: ['#0ea5e9', '#0284c7'],
    secondary: ['#f59e0b', '#d97706'],
    success: ['#22c55e', '#16a34a'],
    danger: ['#ef4444', '#dc2626'],
    dark: ['#262626', '#171717'],
    betting: ['#0ea5e9', '#7c3aed'],
    casino: ['#7c3aed', '#c026d3'],
    sports: ['#0ea5e9', '#0284c7'],
  },
  
  // Social media and payment colors
  brand: {
    facebook: '#1877f2',
    google: '#db4437',
    apple: '#000000',
    pix: '#32bcad',
    visa: '#1a1f71',
    mastercard: '#eb001b',
    paypal: '#003087',
  },
  
  // Common semantic colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
export type ColorShade = keyof typeof colors.primary;