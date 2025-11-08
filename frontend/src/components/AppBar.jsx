import React, { useState, useEffect } from 'react';
import AppBarMui from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';
import { COLORS } from '../constants/colors';
import logo from '../assets/logo.png';

const APPBAR_BG = {
  light: '#f3f7fa', // Bleu très pâle, doux et lumineux
  dark: '#232946', // Bleu nuit foncé, harmonieux mais distinct
};

function AppBar() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const html = document.documentElement;
    setTheme(html.getAttribute('data-theme') || 'light');
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const next = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    setTheme(next);
  };

  const colors = COLORS[theme] || COLORS.light;
  const appBarBg = APPBAR_BG[theme];

  return (
    <AppBarMui position="static" elevation={4} sx={{
      background: appBarBg,
      color: colors.text,
      boxShadow: `0 4px 24px 0 ${colors.primary}22`,
      transition: 'background 0.7s cubic-bezier(0.4,0,0.2,1), color 0.7s',
      animation: 'appbar-slide-in 1.1s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <Toolbar sx={{ minHeight: 72 }}>
        <img src={logo} alt="ULMA Logo" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16 }} />
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            letterSpacing: '2px',
            color: colors.primary,
            textShadow: `0 2px 8px ${colors.primary}22`,
            transition: 'color 0.7s',
            animation: 'fade-in 1.3s',
          }}
        >
          ULMA Library
        </Typography>
        <Button sx={{
          mx: 1,
          color: colors.secondary,
          fontWeight: 600,
          fontFamily: 'Montserrat, sans-serif',
          background: 'transparent',
          textTransform: 'none',
          fontSize: '1rem',
          borderRadius: 2,
          '&:hover': {
            background: colors.accent + '22',
            color: colors.accent,
          },
          transition: 'background 0.5s, color 0.5s',
        }}>Accueil</Button>
        <Button sx={{
          mx: 1,
          color: colors.secondary,
          fontWeight: 600,
          fontFamily: 'Montserrat, sans-serif',
          background: 'transparent',
          textTransform: 'none',
          fontSize: '1rem',
          borderRadius: 2,
          '&:hover': {
            background: colors.accent + '22',
            color: colors.accent,
          },
          transition: 'background 0.5s, color 0.5s',
        }}>Livres</Button>
        <Button sx={{
          mx: 1,
          color: colors.secondary,
          fontWeight: 600,
          fontFamily: 'Montserrat, sans-serif',
          background: 'transparent',
          textTransform: 'none',
          fontSize: '1rem',
          borderRadius: 2,
          '&:hover': {
            background: colors.accent + '22',
            color: colors.accent,
          },
          transition: 'background 0.5s, color 0.5s',
        }}>Etudiants</Button>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="toggle theme"
          onClick={toggleTheme}
          sx={{
            background: colors.surface,
            color: colors.primary,
            boxShadow: `0 2px 8px ${colors.secondary}33`,
            transition: 'background 0.7s, color 0.7s',
            '&:hover': {
              background: colors.accent,
              color: colors.surface,
              transform: 'scale(1.1)',
            },
            animation: 'fade-in 1.5s',
            ml: 2,
          }}
        >
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBarMui>
  );
}

export default AppBar;