import { colors } from '../tokens/colors';

export const lightTheme = {
  colors: {
    // Background colors
    background: {
      primary: colors.white,
      secondary: colors.neutral[50],
      tertiary: colors.neutral[100],
      accent: colors.primary[50],
    },
    
    // Text colors
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      tertiary: colors.neutral[500],
      accent: colors.primary[600],
      inverse: colors.white,
    },
    
    // Border colors
    border: {
      primary: colors.neutral[200],
      secondary: colors.neutral[300],
      accent: colors.primary[200],
    },
    
    // Status colors
    status: {
      success: colors.success[500],
      danger: colors.danger[500],
      warning: colors.warning[500],
      info: colors.primary[500],
    },
    
    // Interactive colors
    interactive: {
      primary: colors.primary[500],
      primaryHover: colors.primary[600],
      primaryActive: colors.primary[700],
      secondary: colors.neutral[100],
      secondaryHover: colors.neutral[200],
      secondaryActive: colors.neutral[300],
    },
    
    // Betting specific colors
    betting: {
      win: colors.betting.win,
      lose: colors.betting.lose,
      pending: colors.betting.pending,
      void: colors.betting.void,
      odds: {
        positive: colors.betting.odds.positive,
        negative: colors.betting.odds.negative,
        even: colors.betting.odds.even,
      },
    },
  },
} as const;