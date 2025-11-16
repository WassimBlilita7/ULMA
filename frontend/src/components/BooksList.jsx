// Presentational Component (Dumb)
// Ce composant reçoit la liste des livres en props et affiche uniquement l’UI.
import React from 'react';
import Fade from '@mui/material/Fade';

function BooksList({ books, colors }) {
  return (
    <Fade in timeout={900}>
      <section className="flex flex-col items-center justify-center py-16 px-4 w-full animate-fade-in" style={{ background: colors.background }}>
        <h2 className="text-4xl font-extrabold mb-8 font-serif animate-slide-in" style={{ color: colors.primary, letterSpacing: '2px' }}>
          Liste des livres
        </h2>
        <ul className="w-full max-w-xl rounded-3xl shadow-2xl p-8" style={{ background: colors.surface, boxShadow: `0 4px 24px 0 ${colors.primary}22` }}>
          {books.map(book => (
            <li key={book.id} className="mb-6 last:mb-0 text-xl font-sans animate-fade-in" style={{ color: colors.text, borderLeft: `5px solid ${colors.accent}`, paddingLeft: 16, background: colors.background, borderRadius: 12 }}>
              <span className="font-bold" style={{ color: colors.primary }}>{book.title}</span> <br />
              <span className="italic" style={{ color: colors.secondary }}>{book.author}</span>
            </li>
          ))}
        </ul>
      </section>
    </Fade>
  );
}

export default BooksList;