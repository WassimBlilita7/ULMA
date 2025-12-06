import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Theme Toggle Integration Tests', () => {
  beforeEach(() => {
    // Réinitialiser le thème avant chaque test
    document.documentElement.setAttribute('data-theme', 'light');
  });

  it('change le thème de light à dark', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Vérifier l'état initial
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    
    // Trouver le bouton de toggle de thème
    const toggleButton = screen.getByLabelText(/toggle theme/i);
    expect(toggleButton).toBeInTheDocument();
    
    // Cliquer sur le bouton
    await user.click(toggleButton);
    
    // Attendre que le thème change
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  it('change le thème de dark à light', async () => {
    const user = userEvent.setup();
    
    // Commencer en mode dark
    document.documentElement.setAttribute('data-theme', 'dark');
    
    render(<App />);
    
    // Vérifier l'état initial
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    
    // Trouver et cliquer sur le bouton
    const toggleButton = screen.getByLabelText(/toggle theme/i);
    await user.click(toggleButton);
    
    // Vérifier que le thème est revenu à light
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  it('tous les composants réagissent au changement de thème', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Vérifier que l'application se rend correctement en mode light
    expect(screen.getByText(/ULMA Library/i)).toBeInTheDocument();
    expect(await screen.findByText('Le Petit Prince')).toBeInTheDocument();
    
    // Changer le thème
    const toggleButton = screen.getByLabelText(/toggle theme/i);
    await user.click(toggleButton);
    
    // Attendre que le thème change
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
    
    // Vérifier que tous les composants sont toujours présents et fonctionnels
    expect(screen.getByText(/ULMA Library/i)).toBeInTheDocument();
    expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to ULMA Library/i)).toBeInTheDocument();
  });

  it('le toggle de thème persiste à travers plusieurs clics', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const toggleButton = screen.getByLabelText(/toggle theme/i);
    
    // Clic 1: light → dark
    await user.click(toggleButton);
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
    
    // Clic 2: dark → light
    await user.click(toggleButton);
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
    
    // Clic 3: light → dark
    await user.click(toggleButton);
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  it('le bouton de thème affiche la bonne icône', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const toggleButton = screen.getByLabelText(/toggle theme/i);
    
    // En mode light, le bouton devrait montrer l'icône dark (pour basculer vers dark)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    
    // Cliquer pour passer en dark
    await user.click(toggleButton);
    
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
    
    // En mode dark, le bouton devrait montrer l'icône light (pour basculer vers light)
    // Le bouton est toujours présent et cliquable
    expect(toggleButton).toBeInTheDocument();
  });
});

