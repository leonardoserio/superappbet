import { colors } from '../tokens/colors';

export const darkTheme = {
  colors: {
    // Background colors (modern dark)
    background: {
      primary: colors.neutral[950], // Very dark background
      secondary: colors.neutral[900], // Card backgrounds
      tertiary: colors.neutral[800], // Elevated surfaces
      accent: colors.primary[900],
      surface: colors.neutral[800], // Custom surface color
    },
    
    // Text colors (high contrast)
    text: {
      primary: colors.white,
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
      accent: colors.primary[400],
      inverse: colors.neutral[900],
      muted: colors.neutral[500],
    },
    
    // Border colors (subtle)
    border: {
      primary: colors.neutral[700],
      secondary: colors.neutral[600],
      accent: colors.primary[600],
      subtle: colors.neutral[800],
    },
    
    // Status colors (vibrant for dark mode)
    status: {
      success: colors.success[500],
      danger: colors.danger[500],
      warning: colors.warning[500],
      info: colors.primary[500],
    },
    
    // Interactive colors (bright accents)
    interactive: {
      primary: colors.primary[500],
      primaryHover: colors.primary[400],
      primaryActive: colors.primary[600],
      secondary: colors.secondary[500],
      secondaryHover: colors.secondary[400],
      secondaryActive: colors.secondary[600],
      tertiary: colors.neutral[700],
      tertiaryHover: colors.neutral[600],
      tertiaryActive: colors.neutral[500],
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