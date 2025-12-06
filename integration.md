# Tests d'Intégration - ULMA Library

## 📖 Introduction

Les **tests d'intégration** vérifient que plusieurs composants/modules fonctionnent correctement **ensemble**. Contrairement aux tests unitaires qui testent des éléments isolés, les tests d'intégration s'assurent que les interactions entre différentes parties de l'application se passent bien.

### Différence avec les tests unitaires

| Aspect | Tests Unitaires | Tests d'Intégration |
|--------|-----------------|---------------------|
| **Scope** | Un seul composant/fonction | Plusieurs composants ensemble |
| **Isolation** | Maximum (mocks pour les dépendances) | Minimale (vraies dépendances) |
| **Vitesse** | Très rapide | Plus lent |
| **Objectif** | Vérifier qu'un élément fonctionne seul | Vérifier que les éléments communiquent bien |
| **Exemple** | Tester `BooksList` avec des props mockées | Tester `BooksContainer` → `BooksList` → Affichage |

### Pourquoi faire des tests d'intégration ?

- ✅ Détecter les problèmes de communication entre composants
- ✅ Vérifier que le flux de données fonctionne (props, context, state)
- ✅ Tester les interactions utilisateur réalistes
- ✅ S'assurer que le système fonctionne dans son ensemble

---

## ⚙️ Configuration (déjà faite ✅)

La configuration Vitest existante supporte déjà les tests d'intégration. Aucune installation supplémentaire n'est nécessaire.

---

## 🧪 Les 3 Tests d'Intégration Implémentés

### ✅ Test 1 : Application complète (`App.integration.test.jsx`)

**Ce qui est testé** : Tout le flux de l'application ensemble

| Test | Description | Vérifie |
|------|-------------|---------|
| 1️⃣ | Rendu complet de l'application | Tous les composants (AppBar, HomeContent, AboutLibrarySection, BooksContainer) se rendent correctement |
| 2️⃣ | Tous les éléments principaux | Titre ULMA, sections, livres apparaissent |
| 3️⃣ | Navigation dans AppBar | Les 3 boutons de navigation sont présents et cliquables |

**Type** : Test de bout en bout (end-to-end) de l'interface

**Fichier** : `frontend/src/__tests__/integration/App.integration.test.jsx`

---

### ✅ Test 2 : Changement de thème (`ThemeToggle.integration.test.jsx`)

**Ce qui est testé** : L'interaction entre AppBar, le toggle de thème, et tous les composants qui utilisent les couleurs

| Test | Description | Vérifie |
|------|-------------|---------|
| 1️⃣ | Toggle du thème light → dark | Le bouton change le `data-theme` du HTML |
| 2️⃣ | Composants réagissent au changement | Tous les composants utilisent les bonnes couleurs après le toggle |
| 3️⃣ | Persistance du thème | Le thème reste après plusieurs toggles |

**Type** : Test d'interaction utilisateur avec effets en cascade

**Fichier** : `frontend/src/__tests__/integration/ThemeToggle.integration.test.jsx`

---

### ✅ Test 3 : Container → Presentational (`BooksFlow.integration.test.jsx`)

**Ce qui est testé** : Le pattern Container/Presentational complet

| Test | Description | Vérifie |
|------|-------------|---------|
| 1️⃣ | BooksContainer charge les données | `useEffect` initialise l'état |
| 2️⃣ | Données transmises à BooksList | Props passent correctement du parent à l'enfant |
| 3️⃣ | BooksList affiche les données | Le composant présentationnel rend correctement |
| 4️⃣ | Flux complet de données | Container → Presentational → DOM |

**Type** : Test du pattern architectural (Smart/Dumb Components)

**Fichier** : `frontend/src/__tests__/integration/BooksFlow.integration.test.jsx`

---

## 🚀 Comment tester

### Étape 1 : Ouvrir le terminal

```bash
cd frontend
```

### Étape 2 : Lancer les tests d'intégration

```bash
# Lancer uniquement les tests d'intégration
npm run test -- integration

# Lancer tous les tests (unitaires + intégration)
npm run test
```

### Résultat attendu

```
 ✓ src/__tests__/integration/App.integration.test.jsx (3)
   ✓ Application Integration Tests (3)
     ✓ rend l'application complète sans erreur
     ✓ affiche tous les éléments principaux
     ✓ affiche la navigation dans l'AppBar

 ✓ src/__tests__/integration/ThemeToggle.integration.test.jsx (3)
   ✓ Theme Toggle Integration Tests (3)
     ✓ change le thème de light à dark
     ✓ change le thème de dark à light
     ✓ tous les composants réagissent au changement de thème

 ✓ src/__tests__/integration/BooksFlow.integration.test.jsx (4)
   ✓ Books Flow Integration Tests (4)
     ✓ BooksContainer charge et transmet les données à BooksList
     ✓ le flux complet de données fonctionne
     ✓ les données sont correctement affichées dans BooksList
     ✓ gère le cycle de vie complet (vide → chargement → affiché)

Test Files  3 passed (3)
     Tests  10 passed (10)
```

---

## 💡 Comprendre les tests d'intégration

### Pattern : Tester le flux complet

```javascript
it('le flux complet de données fonctionne', async () => {
  // 1. Rendre le composant parent (Container)
  render(<BooksContainer />);
  
  // 2. Attendre que les données se chargent (useEffect)
  await waitFor(() => {
    expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
  });
  
  // 3. Vérifier que l'enfant (Presentational) affiche correctement
  expect(screen.getByText('Antoine de Saint-Exupéry')).toBeInTheDocument();
  
  // 4. Vérifier la structure du DOM
  const bookCards = screen.getAllByRole('heading', { level: 3 });
  expect(bookCards.length).toBeGreaterThanOrEqual(3);
});
```

### Simuler les interactions utilisateur

```javascript
import userEvent from '@testing-library/user-event';

it('change le thème en cliquant sur le bouton', async () => {
  const user = userEvent.setup();
  render(<App />);
  
  // Trouver le bouton de toggle
  const toggleButton = screen.getByLabelText(/toggle theme/i);
  
  // Cliquer dessus
  await user.click(toggleButton);
  
  // Vérifier que le thème a changé
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});
```

### Tester plusieurs composants ensemble

```javascript
it('rend l'application complète', () => {
  render(
    <App />
  );
  
  // Vérifier que chaque section est présente
  expect(screen.getByText(/ULMA Library/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to ULMA Library/i)).toBeInTheDocument();
  expect(screen.getByText(/About ULMA Library/i)).toBeInTheDocument();
  expect(screen.getByText(/Liste des livres/i)).toBeInTheDocument();
});
```

---

## 🎯 Stratégie de test

### Pyramide des tests

```
        /\
       /  \        E2E Tests (peu, lents, coûteux)
      /____\       
     /      \      Integration Tests (moyens)
    /________\     
   /          \    Unit Tests (nombreux, rapides)
  /____________\   
```

**Ton projet ULMA Library** :
- ✅ **18 tests unitaires** : fonctions, composants isolés
- ✅ **10 tests d'intégration** : flux de données, interactions
- **Total : 28 tests**

### Quoi tester en intégration ?

| ✅ À tester | ❌ À éviter |
|------------|------------|
| Flux de données parent → enfant | Détails internes d'un composant (déjà testé en unitaire) |
| Interactions utilisateur réalistes | Tester le même comportement que les tests unitaires |
| Communication entre modules | Tester des cas d'usage trop complexes (E2E) |
| Effets de bord (localStorage, DOM) | Tester des dépendances externes (API réelles) |

---

## 🔍 Exemple détaillé

### Test d'intégration : Toggle de thème

**Objectif** : Vérifier que le clic sur le bouton de thème change vraiment le thème partout dans l'application.

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Theme Toggle Integration', () => {
  beforeEach(() => {
    // Réinitialiser le thème avant chaque test
    document.documentElement.setAttribute('data-theme', 'light');
  });

  it('change le thème et tous les composants se mettent à jour', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // 1. Vérifier l'état initial
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    
    // 2. Trouver et cliquer sur le bouton
    const toggleButton = screen.getByLabelText(/toggle theme/i);
    await user.click(toggleButton);
    
    // 3. Vérifier que l'attribut HTML a changé
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    
    // 4. Vérifier que l'icône a changé (intégration AppBar)
    expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
    
    // 5. Re-cliquer pour revenir au mode light
    await user.click(toggleButton);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
```

**Ce qui est testé** :
- ✅ Le clic (interaction utilisateur)
- ✅ Le changement dans le DOM (`data-theme`)
- ✅ La mise à jour de l'icône (AppBar réagit)
- ✅ Le cycle complet light → dark → light

---

## 🎓 Pour présenter au professeur

### 1. Expliquer la différence

**Tests unitaires** :
```javascript
// On teste BooksList SEUL avec des props mockées
render(<BooksList books={mockBooks} colors={mockColors} />);
```

**Tests d'intégration** :
```javascript
// On teste BooksContainer + BooksList + useEffect ensemble
render(<BooksContainer />);
await waitFor(() => {
  expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
});
```

### 2. Démontrer les deux types

```bash
# Tests unitaires
npm run test -- __tests__/themeUtils.test.js

# Tests d'intégration
npm run test -- integration
```

### 3. Montrer les statistiques

```bash
npm run test:coverage
```

Devrait montrer :
- Statements : ~85%+
- Branches : ~80%+
- Functions : ~90%+
- Lines : ~85%+

---

## 🐛 Dépannage

### Les tests d'intégration échouent mais les unitaires passent

**Cause** : Problème de communication entre composants.

**Solution** : Vérifie que :
- Les props sont bien passées du parent à l'enfant
- Le context est bien fourni (si tu utilises React Context)
- Les effets de bord (useEffect) se terminent avant les assertions

### Erreur : "Element not found" dans les tests d'intégration

**Cause** : Le composant ne s'est pas encore rendu.

**Solution** : Utilise `waitFor` ou `findBy` pour les opérations asynchrones :
```javascript
// ❌ Mauvais
expect(screen.getByText('Chargé')).toBeInTheDocument();

// ✅ Bon
await waitFor(() => {
  expect(screen.getByText('Chargé')).toBeInTheDocument();
});

// ✅ Ou encore mieux
const element = await screen.findByText('Chargé');
expect(element).toBeInTheDocument();
```

### Tests qui passent isolément mais échouent en groupe

**Cause** : État partagé entre les tests (localStorage, DOM, etc.).

**Solution** : Utilise `beforeEach` pour réinitialiser :
```javascript
beforeEach(() => {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.clear();
});
```

---

## 📊 Résumé de la couverture

Après avoir ajouté les tests d'intégration, ton projet a maintenant :

| Type de test | Nombre | Fichiers | Ce qui est testé |
|--------------|--------|----------|------------------|
| **Unitaires** | 18 | 3 | Fonctions, composants isolés |
| **Intégration** | 10 | 3 | Flux de données, interactions |
| **Total** | 28 | 6 | Application complète |

---

## ✅ Checklist finale

Avant de présenter au prof :

- [ ] `npm run test` passe tous les tests (28/28 ✅)
- [ ] Tu comprends la différence unitaire vs intégration
- [ ] Tu peux expliquer chaque test d'intégration
- [ ] Tu sais montrer un flux de données complet
- [ ] Tu peux simuler une interaction utilisateur

---

## 🎯 Conclusion

Les tests d'intégration complètent les tests unitaires pour offrir une **couverture complète** :

- ✅ **Tests unitaires** : Chaque pièce fonctionne seule
- ✅ **Tests d'intégration** : Les pièces fonctionnent ensemble
- ✅ **Analyse statique** (ESLint) : Code propre
- ✅ **Analyse dynamique** (Vitest) : Comportement vérifié

Ton projet ULMA Library démontre maintenant une **maîtrise complète du testing en React** ! 🚀

