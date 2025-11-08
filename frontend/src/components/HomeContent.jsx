import React from 'react';
import { COLORS } from '../constants/colors';
import { useThemeColors } from '../utils/themeUtils';
import BarChart from './BarChart';
import Fade from '@mui/material/Fade';

function HomeContent() {
  const colors = useThemeColors();

  return (
    <Fade in timeout={800}>
      <div className="flex flex-col items-center justify-center py-12 px-4" style={{ background: colors.surface }}>
        <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
          Welcome to ULMA Library
        </h2>
        <p className="text-lg mb-8" style={{ color: colors.text }}>
          Manage students, books, and borrowings with ease. Visualize your library statistics below!
        </p>
        <div className="w-full max-w-2xl">
          <BarChart colors={colors} />
        </div>
      </div>
    </Fade>
  );
}

export default HomeContent;