export * from './light';
export * from './dark';

import { lightTheme } from './light';
import { darkTheme } from './dark';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type Theme = typeof lightTheme;
export type ThemeName = keyof typeof themes;