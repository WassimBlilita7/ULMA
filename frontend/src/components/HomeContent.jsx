import React from 'react';
import { COLORS } from '../constants/colors';
import { useThemeColors } from '../utils/themeUtils';
import BarChart from './BarChart';
import Fade from '@mui/material/Fade';

function HomeContent() {
  const colors = useThemeColors();

  return (
    <Fade in timeout={800}>
      <div className="flex flex-col items-center justify-center py-20 px-6" style={{ 
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
      }}>
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif" style={{ 
            color: colors.primary,
            letterSpacing: '1px',
            textShadow: `0 4px 12px ${colors.primary}22`,
          }}>
            Welcome to ULMA Library
          </h2>
          <p className="text-xl md:text-2xl font-sans max-w-3xl mx-auto" style={{ 
            color: colors.text,
            opacity: 0.85,
            lineHeight: '1.7',
          }}>
            Manage students, books, and borrowings with ease. Visualize your library statistics below!
          </p>
        </div>
        <div className="w-full max-w-4xl rounded-3xl p-8 shadow-2xl animate-fade-in" style={{
          background: colors.surface,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.accent}33`,
          boxShadow: `0 8px 32px ${colors.primary}15, 0 0 0 1px ${colors.accent}22`,
        }}>
          <BarChart colors={colors} />
        </div>
      </div>
    </Fade>
  );
}

export default HomeContent;