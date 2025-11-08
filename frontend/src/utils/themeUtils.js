import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState, useEffect } from 'react';
import { COLORS } from '../constants/colors';

export const THEMES = [
  { name: 'light', icon: 'light' },
  { name: 'dark', icon: 'dark' },
];

export function getNextTheme(current) {
  const idx = THEMES.findIndex(t => t.name === current);
  return THEMES[(idx + 1) % THEMES.length].name;
}

export function getThemeIcon(theme) {
  const found = THEMES.find(t => t.name === theme);
  if ((found ? found.icon : 'light') === 'dark') {
    return DarkModeIcon;
  }
  return LightModeIcon;
}

export function useThemeColors() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(html.getAttribute('data-theme') || 'light');
    });
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    setTheme(html.getAttribute('data-theme') || 'light');
    return () => observer.disconnect();
  }, []);
  return COLORS[theme] || COLORS.light;
}