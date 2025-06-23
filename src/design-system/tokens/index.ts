export * from './colors';
export * from './typography';
export * from './spacing';

import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, borderWidth } from './spacing';

export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  borderWidth,
} as const;