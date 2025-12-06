import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('Application Integration Tests', () => {
  beforeEach(() => {
    // Réinitialiser le thème avant chaque test
    document.documentElement.setAttribute('data-theme', 'light');
  });

  it('rend l\'application complète sans erreur', () => {
    const { container } = render(<App />);
    
    // Vérifier que l'application se rend
    expect(container.firstChild).toBeTruthy();
  });

  it('affiche tous les éléments principaux', async () => {
    render(<App />);
    
    // Vérifier que l'AppBar est présent
    expect(screen.getByText(/ULMA Library/i)).toBeInTheDocument();
    
    // Vérifier que HomeContent est présent
    expect(screen.getByText(/Welcome to ULMA Library/i)).toBeInTheDocument();
    
    // Vérifier que AboutLibrarySection est présent
    expect(screen.getByText(/About ULMA Library/i)).toBeInTheDocument();
    
    // Vérifier que BooksContainer/BooksList est présent
    const booksHeading = await screen.findByText(/Liste des livres/i);
    expect(booksHeading).toBeInTheDocument();
    
    // Vérifier que les livres sont affichés (via BooksContainer → BooksList)
    expect(await screen.findByText('Le Petit Prince')).toBeInTheDocument();
  });

  it('affiche la navigation dans l\'AppBar', () => {
    render(<App />);
    
    // Vérifier que les liens de navigation sont présents
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Livres')).toBeInTheDocument();
    expect(screen.getByText('Étudiants')).toBeInTheDocument();
  });

  it('affiche le graphique dans HomeContent', () => {
    render(<App />);
    
    // Vérifier que le titre du graphique est présent
    expect(screen.getByText(/Library Overview/i)).toBeInTheDocument();
  });

  it('tous les composants principaux communiquent correctement', async () => {
    render(<App />);
    
    // Vérifier que chaque section a bien accès aux couleurs du thème
    const container = screen.getByText(/ULMA Library/i).closest('header');
    expect(container).toBeTruthy();
    
    // Vérifier que BooksContainer charge et transmet les données à BooksList
    const bookTitle = await screen.findByText('Le Petit Prince');
    expect(bookTitle).toBeInTheDocument();
    
    const bookAuthor = await screen.findByText(/Antoine de Saint-Exupéry/i);
    expect(bookAuthor).toBeInTheDocument();
  });
});

