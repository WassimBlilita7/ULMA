import React from 'react';
import { useThemeColors } from '../utils/themeUtils';
import libraryImg from '../assets/home/library.png';
import Fade from '@mui/material/Fade';

function AboutLibrarySection() {
  const colors = useThemeColors();

  return (
    <Fade in timeout={900}>
      <section className="flex flex-col md:flex-row items-center justify-center py-12 px-4 gap-8 w-full" style={{ background: colors.background }}>
        <div className="flex-1 flex justify-center">
          <img
            src={libraryImg}
            alt="Library illustration"
            className="rounded-2xl shadow-lg w-80 md:w-96"
            style={{ border: `4px solid ${colors.primary}` }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-start">
          <h3 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
            About ULMA Library
          </h3>
          <p className="text-lg mb-2" style={{ color: colors.text }}>
            ULMA Library is a modern university library management system designed for students and staff. It offers intuitive tools for book management, borrowing, and statistics.
          </p>
          <ul className="list-disc pl-5" style={{ color: colors.accent }}>
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