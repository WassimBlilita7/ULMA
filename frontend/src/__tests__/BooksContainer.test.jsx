import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import BooksContainer from '../components/BooksContainer';

describe('BooksContainer Component', () => {
  it('charge et affiche la liste initiale de livres', async () => {
    render(<BooksContainer />);
    
    // Attendre que useEffect ait mis à jour l'état et que les livres soient affichés
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    });
    
    // Vérifier que tous les livres de la liste initiale sont présents
    expect(screen.getByText("L'Étranger")).toBeInTheDocument();
    expect(screen.getByText('1984')).toBeInTheDocument();
  });

  it('affiche les 3 livres de la liste initiale', async () => {
    render(<BooksContainer />);
    
    // Attendre que les livres soient chargés et affichés
    const bookTitles = await screen.findAllByText(
      /Le Petit Prince|L'Étranger|1984/i
    );
    
    // Devrait trouver au moins les 3 titres de livres
    expect(bookTitles.length).toBeGreaterThanOrEqual(3);
  });

  it('affiche les auteurs des livres', async () => {
    render(<BooksContainer />);
    
    // Attendre et vérifier que les auteurs sont affichés
    await waitFor(() => {
      expect(screen.getByText(/Antoine de Saint-Exupéry/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Albert Camus/i)).toBeInTheDocument();
    expect(screen.getByText(/George Orwell/i)).toBeInTheDocument();
  });

  it('rend le composant BooksList avec les bonnes props', async () => {
    render(<BooksContainer />);
    
    // Attendre que le titre de la section BooksList apparaisse
    const heading = await screen.findByText(/Liste des livres/i);
    expect(heading).toBeInTheDocument();
  });

  it('initialise avec un tableau vide puis charge les livres', async () => {
    const { container } = render(<BooksContainer />);
    
    // Le composant devrait se rendre sans erreur
    expect(container.firstChild).toBeTruthy();
    
    // Attendre que les livres soient chargés via useEffect
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});

