import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants/colors';
import logo from '../assets/logo.png';
import { getNextTheme, getThemeIcon } from '../utils/themeUtils';

function AppBar() {
  // Lire le thème actuel depuis index.html
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const html = document.documentElement;
    setTheme(html.getAttribute('data-theme') || 'light');
  }, []);

  const handleThemeChange = () => {
    const html = document.documentElement;
    const next = getNextTheme(theme);
    html.setAttribute('data-theme', next);
    setTheme(next);
  };

  // Couleurs dynamiques selon le thème
  const themeColors = COLORS[theme] || COLORS.light;
  const appBarBg = themeColors.background;
  const appBarText = themeColors.text;

  return (
    <div className="navbar bg-base-100 shadow-lg px-6 py-2" style={{ background: appBarBg }}>
      <div className="flex-1 flex items-center gap-3">
        <img src={logo} alt="ULMA Logo" className="w-10 h-10 rounded-full" />
        <span className="text-xl font-bold" style={{ color: themeColors.primary }}>
          ULMA Library
        </span>
      </div>
      <div className="flex-none flex items-center gap-4">
        <ul className="menu menu-horizontal px-1">
          <li><a className="hover:text-accent" style={{ color: appBarText }}>Home</a></li>
          <li><a className="hover:text-accent" style={{ color: appBarText }}>Books</a></li>
          <li><a className="hover:text-accent" style={{ color: appBarText }}>Students</a></li>
          <li><a className="hover:text-accent" style={{ color: appBarText }}>Borrow</a></li>
        </ul>
        <button
          className="btn btn-ghost btn-circle"
          aria-label="Change theme"
          onClick={handleThemeChange}
        >
          {React.createElement(getThemeIcon(theme))}
        </button>
      </div>
    </div>
  );
}

export default AppBar;