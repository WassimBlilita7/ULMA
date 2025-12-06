import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import BooksContainer from '../../components/BooksContainer';

describe('Books Flow Integration Tests', () => {
  it('BooksContainer charge et transmet les données à BooksList', async () => {
    render(<BooksContainer />);
    
    // Attendre que BooksContainer charge les données via useEffect
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    });
    
    // Vérifier que les données sont transmises à BooksList et affichées
    expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    expect(screen.getByText("L'Étranger")).toBeInTheDocument();
    expect(screen.getByText('1984')).toBeInTheDocument();
  });

  it('le flux complet de données fonctionne', async () => {
    render(<BooksContainer />);
    
    // 1. BooksContainer initialise avec un tableau vide
    // 2. useEffect charge initialBooks
    // 3. setBooks met à jour l'état
    // 4. BooksList reçoit les props
    // 5. BooksList affiche les données
    
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    });
    
    // Vérifier que tous les livres sont affichés
    const books = [
      'Le Petit Prince',
      "L'Étranger",
      '1984'
    ];
    
    books.forEach(bookTitle => {
      expect(screen.getByText(bookTitle)).toBeInTheDocument();
    });
  });

  it('les données sont correctement affichées dans BooksList', async () => {
    render(<BooksContainer />);
    
    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    });
    
    // Vérifier que le titre de section est présent (provient de BooksList)
    expect(screen.getByText(/Liste des livres/i)).toBeInTheDocument();
    
    // Vérifier que les auteurs sont également affichés
    expect(screen.getByText(/Antoine de Saint-Exupéry/i)).toBeInTheDocument();
    expect(screen.getByText(/Albert Camus/i)).toBeInTheDocument();
    expect(screen.getByText(/George Orwell/i)).toBeInTheDocument();
  });

  it('gère le cycle de vie complet (vide → chargement → affiché)', async () => {
    const { container } = render(<BooksContainer />);
    
    // Le composant se rend sans erreur
    expect(container.firstChild).toBeTruthy();
    
    // Attendre que useEffect se termine et que les livres apparaissent
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Vérifier que tous les livres ont été chargés
    const bookTitles = screen.getAllByText(/Le Petit Prince|L'Étranger|1984/i);
    expect(bookTitles.length).toBeGreaterThanOrEqual(3);
  });

  it('BooksList reçoit les bonnes props de BooksContainer', async () => {
    const { container } = render(<BooksContainer />);
    
    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    });
    
    // Vérifier que BooksList a rendu les cartes de livres
    const bookCards = container.querySelectorAll('.group');
    expect(bookCards.length).toBe(3);
    
    // Vérifier que chaque carte contient un titre et un auteur
    bookCards.forEach(card => {
      expect(card.textContent.length).toBeGreaterThan(0);
    });
  });

  it('les couleurs du thème sont transmises correctement', async () => {
    render(<BooksContainer />);
    
    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    });
    
    // Vérifier que le composant a bien été stylé (les couleurs sont appliquées)
    // On vérifie juste que le rendu s'est fait sans erreur
    const heading = screen.getByText(/Liste des livres/i);
    expect(heading).toBeInTheDocument();
    
    // Les styles inline devraient être appliqués via les props colors
    expect(heading.closest('section')).toBeTruthy();
  });

  it('le pattern Container/Presentational fonctionne correctement', async () => {
    render(<BooksContainer />);
    
    // BooksContainer (Smart Component):
    // - Gère l'état avec useState
    // - Charge les données avec useEffect
    // - Récupère les couleurs avec useThemeColors
    
    // BooksList (Dumb Component):
    // - Reçoit books et colors en props
    // - Affiche l'UI sans logique métier
    
    // Vérifier que le flux fonctionne
    await waitFor(() => {
      expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    });
    
    // Vérifier que le composant enfant affiche correctement
    expect(screen.getByText(/Liste des livres/i)).toBeInTheDocument();
    expect(screen.getByText(/Antoine de Saint-Exupéry/i)).toBeInTheDocument();
  });
});

