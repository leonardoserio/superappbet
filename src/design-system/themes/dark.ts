import { colors } from '../tokens/colors';

export const darkTheme = {
  colors: {
    // Background colors
    background: {
      primary: colors.neutral[900],
      secondary: colors.neutral[800],
      tertiary: colors.neutral[700],
      accent: colors.primary[900],
    },
    
    // Text colors
    text: {
      primary: colors.white,
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
      accent: colors.primary[400],
      inverse: colors.neutral[900],
    },
    
    // Border colors
    border: {
      primary: colors.neutral[700],
      secondary: colors.neutral[600],
      accent: colors.primary[700],
    },
    
    // Status colors
    status: {
      success: colors.success[400],
      danger: colors.danger[400],
      warning: colors.warning[400],
      info: colors.primary[400],
    },
    
    // Interactive colors
    interactive: {
      primary: colors.primary[500],
      primaryHover: colors.primary[400],
      primaryActive: colors.primary[300],
      secondary: colors.neutral[700],
      secondaryHover: colors.neutral[600],
      secondaryActive: colors.neutral[500],
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