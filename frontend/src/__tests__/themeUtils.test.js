import { describe, it, expect } from 'vitest';
import { getNextTheme, getThemeIcon } from '../utils/themeUtils';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

describe('themeUtils - getNextTheme', () => {
  it('passe de light à dark', () => {
    const result = getNextTheme('light');
    expect(result).toBe('dark');
  });

  it('passe de dark à light', () => {
    const result = getNextTheme('dark');
    expect(result).toBe('light');
  });

  it('gère correctement le cycle complet', () => {
    let current = 'light';
    current = getNextTheme(current); // light -> dark
    expect(current).toBe('dark');
    current = getNextTheme(current); // dark -> light
    expect(current).toBe('light');
  });
});

describe('themeUtils - getThemeIcon', () => {
  it('retourne DarkModeIcon pour le thème dark', () => {
    const result = getThemeIcon('dark');
    expect(result).toBe(DarkModeIcon);
  });

  it('retourne LightModeIcon pour le thème light', () => {
    const result = getThemeIcon('light');
    expect(result).toBe(LightModeIcon);
  });

  it('retourne LightModeIcon par défaut pour une valeur inconnue', () => {
    const result = getThemeIcon('unknown');
    expect(result).toBe(LightModeIcon);
  });

  it('retourne LightModeIcon pour undefined', () => {
    const result = getThemeIcon(undefined);
    expect(result).toBe(LightModeIcon);
  });
});

