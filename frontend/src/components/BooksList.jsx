// Presentational Component (Dumb)
// Ce composant reçoit la liste des livres en props et affiche uniquement l'UI.
import React from 'react';
import Fade from '@mui/material/Fade';

function BooksList({ books, colors }) {
  return (
    <Fade in timeout={900}>
      <section className="flex flex-col items-center justify-center py-20 px-6 w-full animate-fade-in" style={{ 
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
      }}>
        <h2 className="text-5xl font-extrabold mb-12 font-serif animate-slide-in" style={{ 
          color: colors.primary, 
          letterSpacing: '1px',
          textShadow: `0 4px 12px ${colors.primary}22`,
        }}>
          📚 Liste des livres
        </h2>
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book, idx) => (
            <div 
              key={book.id} 
              className="group p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer animate-fade-in" 
              style={{ 
                background: colors.surface,
                border: `2px solid ${colors.accent}33`,
                boxShadow: `0 8px 24px ${colors.primary}15`,
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 group-hover:rotate-12" style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  color: colors.surface,
                  boxShadow: `0 4px 12px ${colors.primary}33`,
                }}>
                  {book.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 font-serif transition-colors duration-300 group-hover:translate-x-1" style={{ 
                    color: colors.primary,
                  }}>
                    {book.title}
                  </h3>
                  <p className="text-lg italic font-sans transition-colors duration-300" style={{ 
                    color: colors.secondary,
                  }}>
                    par {book.author}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-1 rounded-full transition-all duration-500 group-hover:w-full" style={{
                width: '0%',
                background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})`,
              }}></div>
            </div>
          ))}
        </div>
      </section>
    </Fade>
  );
}

export default BooksList;