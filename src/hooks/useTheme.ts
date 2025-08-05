import { useEffect } from 'react';
import { ThemeConfig } from '../types';

const theme: ThemeConfig = {
  name: 'Dark',
  primary: 'from-blue-500 to-cyan-400',
  secondary: 'from-blue-600 to-cyan-500',
  accent: 'blue',
  gradient: 'bg-gradient-to-br from-gray-900 to-gray-800'
};

export const useTheme = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return {
    currentTheme: 'dark',
    preference: 'dark',
    themeConfig: theme,
    changePreference: () => {},
    toggleDark: () => {}
  };
};