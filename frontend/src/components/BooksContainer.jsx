// Container Component (Smart)
// Ce composant gère la logique métier : il récupère la liste des livres et la transmet au composant BooksList.
import React, { useState, useEffect } from 'react';
import BooksList from './BooksList';
import { useThemeColors } from '../utils/themeUtils';

const initialBooks = [
  { id: 1, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry' },
  { id: 2, title: 'L’Étranger', author: 'Albert Camus' },
  { id: 3, title: '1984', author: 'George Orwell' },
];

function BooksContainer() {
  const [books, setBooks] = useState([]);
  const colors = useThemeColors();

  useEffect(() => {
    // Ici, on pourrait faire un appel API pour récupérer les livres
    setBooks(initialBooks);
  }, []);

  return <BooksList books={books} colors={colors} />;
}

export default BooksContainer;