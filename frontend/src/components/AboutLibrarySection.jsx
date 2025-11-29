import React from 'react';
import { useThemeColors } from '../utils/themeUtils';
import libraryImg from '../assets/home/library.png';
import Fade from '@mui/material/Fade';

function AboutLibrarySection() {
  const colors = useThemeColors();

  return (
    <Fade in timeout={900}>
      <section className="flex flex-col md:flex-row items-center justify-center py-20 px-6 gap-16 w-full animate-fade-in" style={{ 
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 100%)`,
      }}>
        <div className="flex-1 flex justify-center group">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl transition-all duration-700 group-hover:opacity-50" style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            }}></div>
            <img
              src={libraryImg}
              alt="Library illustration"
              className="relative rounded-3xl shadow-2xl w-80 md:w-[480px] scale-100 group-hover:scale-105 transition-all duration-700"
              style={{ 
                border: `3px solid ${colors.accent}`,
                boxShadow: `0 20px 60px ${colors.primary}25`,
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
          <h3 className="text-5xl font-extrabold mb-8 font-serif animate-slide-in" style={{ 
            color: colors.primary, 
            letterSpacing: '1px',
            textShadow: `0 4px 12px ${colors.primary}22`,
          }}>
            About ULMA Library
          </h3>
          <p className="text-xl mb-8 font-medium font-sans animate-fade-in leading-relaxed" style={{ 
            color: colors.text,
            opacity: 0.9,
          }}>
            ULMA Library is a modern university library management system designed for students and staff. It offers intuitive tools for book management, borrowing, and statistics.
          </p>
          <div className="space-y-4 w-full">
            {[
              { icon: '📚', text: 'Student registration and management' },
              { icon: '🔍', text: 'Book catalog and search' },
              { icon: '📖', text: 'Borrowing and returning with automatic reminders' },
              { icon: '📊', text: 'Real-time statistics and visualizations' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 hover:translate-x-2 animate-fade-in" style={{
                background: colors.surface,
                border: `1px solid ${colors.accent}22`,
                boxShadow: `0 4px 16px ${colors.primary}10`,
              }}>
                <span className="text-3xl">{item.icon}</span>
                <p className="text-lg font-sans flex-1" style={{ color: colors.text }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fade>
  );
}

export default AboutLibrarySection;