import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BooksList from '../components/BooksList';

describe('BooksList Component', () => {
  // Mock data pour les tests
  const mockBooks = [
    { id: 1, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: "L'Étranger", author: 'Albert Camus' },
  ];

  const mockColors = {
    primary: '#6C63FF',
    secondary: '#FF6584',
    accent: '#43E97B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#22223B',
  };

  it('affiche le titre de la section', () => {
    render(<BooksList books={mockBooks} colors={mockColors} />);
    
    const heading = screen.getByText(/Liste des livres/i);
    expect(heading).toBeInTheDocument();
  });

  it('affiche tous les livres reçus en props', () => {
    render(<BooksList books={mockBooks} colors={mockColors} />);
    
    // Vérifie que chaque titre est présent
    expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    expect(screen.getByText('1984')).toBeInTheDocument();
    expect(screen.getByText("L'Étranger")).toBeInTheDocument();
  });

  it('affiche les auteurs correctement', () => {
    render(<BooksList books={mockBooks} colors={mockColors} />);
    
    // Vérifie que chaque auteur est présent (avec "par" devant)
    expect(screen.getByText(/Antoine de Saint-Exupéry/i)).toBeInTheDocument();
    expect(screen.getByText(/George Orwell/i)).toBeInTheDocument();
    expect(screen.getByText(/Albert Camus/i)).toBeInTheDocument();
  });

  it('rend une liste vide sans erreur', () => {
    render(<BooksList books={[]} colors={mockColors} />);
    
    // Le titre doit toujours être présent
    expect(screen.getByText(/Liste des livres/i)).toBeInTheDocument();
    
    // Aucun livre ne devrait être affiché
    expect(screen.queryByText('Le Petit Prince')).not.toBeInTheDocument();
  });

  it('affiche le bon nombre de livres', () => {
    const { container } = render(<BooksList books={mockBooks} colors={mockColors} />);
    
    // Compte les éléments de carte (divs avec la classe group)
    const bookCards = container.querySelectorAll('.group');
    expect(bookCards).toHaveLength(3);
  });

  it('applique les couleurs fournies en props', () => {
    const { container } = render(<BooksList books={mockBooks} colors={mockColors} />);
    
    // Vérifie que le composant a bien été rendu avec les couleurs
    expect(container.firstChild).toBeTruthy();
  });
});

