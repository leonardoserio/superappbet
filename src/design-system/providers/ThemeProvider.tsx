import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, ThemeName, themes } from '../themes';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeName, setThemeName] = useState<ThemeName>(
    defaultTheme || (systemColorScheme === 'dark' ? 'dark' : 'light')
  );

  useEffect(() => {
    if (!defaultTheme && systemColorScheme) {
      setThemeName(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [systemColorScheme, defaultTheme]);

  const theme = themes[themeName];
  const isDark = themeName === 'dark';

  const contextValue: ThemeContextValue = {
    theme,
    themeName,
    setTheme: setThemeName,
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};