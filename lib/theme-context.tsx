'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from './types';
import { storage } from './storage';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('blue');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = storage.getTheme();
    setThemeState(savedTheme);
    setMounted(true);
    applyTheme(savedTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    storage.setTheme(newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.colorScheme = theme === 'dark' ? 'dark' : 'light';

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply theme-specific CSS variables
    const themes: Record<Theme, Record<string, string>> = {
      blue: {
        '--background': 'oklch(0.98 0.005 250)',
        '--foreground': 'oklch(0.2 0.01 250)',
        '--primary': 'oklch(0.5 0.2 250)',
        '--card': 'oklch(1 0 0)',
      },
      peach: {
        '--background': 'oklch(0.96 0.01 40)',
        '--foreground': 'oklch(0.2 0.01 40)',
        '--primary': 'oklch(0.6 0.15 40)',
        '--card': 'oklch(1 0 0)',
      },
      dark: {
        '--background': 'oklch(0.2 0 0)',
        '--foreground': 'oklch(0.95 0 0)',
        '--primary': 'oklch(0.7 0.15 250)',
        '--card': 'oklch(0.15 0 0)',
      },
    };

    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
