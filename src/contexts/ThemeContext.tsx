// Contexto de tema para alternar entre modo claro e escuro

import React, { createContext, useContext, useState } from 'react';
import { DarkTheme, LightTheme, ThemeColors } from '../config/theme';

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: DarkTheme,
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(prev => !prev);
  const colors = isDark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);