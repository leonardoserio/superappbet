import { colors } from '../tokens/colors';

export const lightTheme = {
  colors: {
    // Background colors (modern light)
    background: {
      primary: colors.white,
      secondary: colors.neutral[50], // Light gray backgrounds
      tertiary: colors.neutral[100], // Elevated surfaces
      accent: colors.primary[50],
      surface: colors.neutral[50], // Custom surface color
    },
    
    // Text colors (readable contrast)
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      tertiary: colors.neutral[500],
      accent: colors.primary[600],
      inverse: colors.white,
      muted: colors.neutral[400],
    },
    
    // Border colors (subtle)
    border: {
      primary: colors.neutral[200],
      secondary: colors.neutral[300],
      accent: colors.primary[300],
      subtle: colors.neutral[200],
    },
    
    // Status colors
    status: {
      success: colors.success[500],
      danger: colors.danger[500],
      warning: colors.warning[500],
      info: colors.primary[500],
    },
    
    // Interactive colors (vibrant)
    interactive: {
      primary: colors.primary[500],
      primaryHover: colors.primary[600],
      primaryActive: colors.primary[700],
      secondary: colors.secondary[500],
      secondaryHover: colors.secondary[600],
      secondaryActive: colors.secondary[700],
      tertiary: colors.neutral[100],
      tertiaryHover: colors.neutral[200],
      tertiaryActive: colors.neutral[300],
    },
    
    // Betting specific colors (enhanced)
    betting: {
      win: colors.betting.win,
      lose: colors.betting.lose,
      pending: colors.betting.pending,
      void: colors.betting.void,
      live: colors.betting.live,
      boost: colors.betting.boost,
      cashout: colors.betting.cashout,
      odds: {
        positive: colors.betting.odds.positive,
        negative: colors.betting.odds.negative,
        even: colors.betting.odds.even,
        favorite: colors.betting.odds.favorite,
        underdog: colors.betting.odds.underdog,
      },
    },
    
    // Gradients for modern UI
    gradients: colors.gradients,
    
    // Brand colors
    brand: colors.brand,
  },
} as const;