import React from 'react';
import { COLORS } from '../constants/colors';
import logo from '../assets/logo.png';

function AppBar() {
  return (
    <div className="navbar bg-base-100 shadow-lg px-6 py-2" style={{ background: COLORS.background }}>
      <div className="flex-1 flex items-center gap-3">
        <img src={logo} alt="ULMA Logo" className="w-10 h-10 rounded-full" />
        <span className="text-xl font-bold" style={{ color: COLORS.primary }}>
          ULMA Library
        </span>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a className="hover:text-accent" style={{ color: COLORS.text }}>Home</a></li>
          <li><a className="hover:text-accent" style={{ color: COLORS.text }}>Books</a></li>
          <li><a className="hover:text-accent" style={{ color: COLORS.text }}>Students</a></li>
          <li><a className="hover:text-accent" style={{ color: COLORS.text }}>Borrow</a></li>
        </ul>
      </div>
    </div>
  );
}

export default AppBar;