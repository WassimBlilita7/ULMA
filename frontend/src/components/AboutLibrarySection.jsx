import React from 'react';
import { useThemeColors } from '../utils/themeUtils';
import libraryImg from '../assets/home/library.png';
import Fade from '@mui/material/Fade';

function AboutLibrarySection() {
  const colors = useThemeColors();

  return (
    <Fade in timeout={900}>
      <section className="flex flex-col md:flex-row items-center justify-center py-16 px-4 gap-12 w-full animate-fade-in" style={{ background: colors.background }}>
        <div className="flex-1 flex justify-center">
          <img
            src={libraryImg}
            alt="Library illustration"
            className="rounded-3xl shadow-2xl w-80 md:w-[420px] scale-100 hover:scale-105 transition-transform duration-700"
            style={{ border: `5px solid ${colors.secondary}` }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-start">
          <h3 className="text-4xl font-extrabold mb-6 font-serif animate-slide-in" style={{ color: colors.primary, letterSpacing: '2px' }}>
            About ULMA Library
          </h3>
          <p className="text-xl mb-4 font-medium font-sans animate-fade-in" style={{ color: colors.text }}>
            ULMA Library is a modern university library management system designed for students and staff. It offers intuitive tools for book management, borrowing, and statistics.
          </p>
          <ul className="list-disc pl-6 text-lg font-mono animate-fade-in" style={{ color: colors.accent }}>
            <li>Student registration and management</li>
            <li>Book catalog and search</li>
            <li>Borrowing and returning with automatic reminders</li>
            <li>Real-time statistics and visualizations</li>
          </ul>
        </div>
      </section>
    </Fade>
  );
}

export default AboutLibrarySection;