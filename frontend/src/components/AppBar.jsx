import React, { useState, useEffect } from 'react';
import AppBarMui from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { COLORS } from '../constants/colors';
import logo from '../assets/logo.png';

function AppBar() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');

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

  const navItems = [
    { id: 'home', label: 'Accueil', icon: HomeIcon },
    { id: 'books', label: 'Livres', icon: MenuBookIcon },
    { id: 'students', label: 'Étudiants', icon: PeopleIcon },
  ];

  return (
    <AppBarMui 
      position="sticky" 
      elevation={0} 
      sx={{
        background: theme === 'light' 
          ? `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`
          : `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.accent}22`,
        boxShadow: `0 4px 30px ${colors.primary}10`,
        transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
        animation: 'appbar-slide-in 1.1s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <Toolbar sx={{ minHeight: 80, px: 3, justifyContent: 'space-between' }}>
        {/* Logo et titre */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              opacity: 0.3,
              filter: 'blur(8px)',
            }}></div>
            <img 
              src={logo} 
              alt="ULMA Logo" 
              style={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%',
                position: 'relative',
                border: `3px solid ${colors.accent}`,
                boxShadow: `0 4px 16px ${colors.primary}33`,
              }} 
            />
          </div>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              letterSpacing: '1px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              transition: 'all 0.5s',
              animation: 'fade-in 1.3s',
            }}
          >
            ULMA Library
          </Typography>
        </div>

        {/* Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: 8,
          padding: 8,
          borderRadius: 16,
          background: colors.surface,
          border: `1px solid ${colors.accent}15`,
          boxShadow: `0 4px 16px ${colors.primary}08`,
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                startIcon={<Icon />}
                sx={{
                  px: 3,
                  py: 1.5,
                  color: isActive ? colors.surface : colors.text,
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  background: isActive 
                    ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                    : 'transparent',
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: isActive ? `0 4px 16px ${colors.primary}40` : 'none',
                  '&:hover': {
                    background: isActive
                      ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                      : `${colors.accent}15`,
                    color: isActive ? colors.surface : colors.accent,
                    transform: 'translateY(-2px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    opacity: 0,
                    transition: 'opacity 0.4s',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </div>

        {/* Theme toggle */}
        <IconButton
          edge="end"
          aria-label="toggle theme"
          onClick={toggleTheme}
          sx={{
            width: 56,
            height: 56,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            color: colors.surface,
            boxShadow: `0 4px 16px ${colors.primary}40`,
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'scale(1.1) rotate(180deg)',
              boxShadow: `0 6px 24px ${colors.primary}60`,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -2,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
              opacity: 0,
              transition: 'opacity 0.4s',
            },
            '&:hover::before': {
              opacity: 0.3,
            },
            animation: 'fade-in 1.5s',
          }}
        >
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBarMui>
  );
}

export default AppBar;