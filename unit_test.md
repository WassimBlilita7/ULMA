# Unit Tests - ULMA Library

## 📖 Introduction

Les **unit tests** permettent de vérifier que chaque composant/fonction de ton application fonctionne correctement de manière isolée. C'est une forme d'**analyse dynamique** : on exécute réellement le code pour s'assurer qu'il se comporte comme prévu.

### Pourquoi tester ?
- ✅ Détecter les bugs avant la production
- ✅ Documenter le comportement attendu du code
- ✅ Faciliter les refactorings en toute confiance
- ✅ Démontrer la qualité du code au professeur

---

## ⚙️ Configuration (Déjà fait ✅)

Les fichiers suivants ont déjà été configurés dans ton projet :

### ✅ 1. Dépendances installées

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### ✅ 2. Configuration Vitest (`vite.config.js`)

```javascript
test: {
  globals: true,        // Utilise describe, it, expect sans import
  environment: 'jsdom', // Simule un navigateur
  setupFiles: './src/setupTests.js',
  css: true,
}
```

### ✅ 3. Fichier de setup (`src/setupTests.js`)

Charge les matchers de `@testing-library/jest-dom` et nettoie après chaque test.

### ✅ 4. Scripts ajoutés dans `package.json`

```json
"test": "vitest"              // Lance les tests
"test:ui": "vitest --ui"      // Interface graphique
"test:coverage": "vitest --coverage"  // Rapport de couverture
```

---

## 🧪 Les 18 Tests Implémentés

Ton projet contient maintenant **18 tests répartis dans 3 fichiers** :

---

### ✅ Test 1 : `themeUtils.test.js` (7 tests)

**Localisation** : `frontend/src/__tests__/themeUtils.test.js`

**Ce qui est testé** : Les fonctions utilitaires pour gérer le thème (light/dark)

#### Tests pour `getNextTheme` (3 tests)

| Test | Description | Vérifie |
|------|-------------|---------|
| 1️⃣ | Passe de light à dark | `getNextTheme('light')` retourne `'dark'` |
| 2️⃣ | Passe de dark à light | `getNextTheme('dark')` retourne `'light'` |
| 3️⃣ | Cycle complet | Appels successifs pour vérifier le cycle |

#### Tests pour `getThemeIcon` (4 tests)

| Test | Description | Vérifie |
|------|-------------|---------|
| 4️⃣ | Icône pour dark | `getThemeIcon('dark')` retourne `DarkModeIcon` |
| 5️⃣ | Icône pour light | `getThemeIcon('light')` retourne `LightModeIcon` |
| 6️⃣ | Valeur inconnue | Retourne `LightModeIcon` par défaut |
| 7️⃣ | Valeur undefined | Retourne `LightModeIcon` par défaut |

**Type de test** : Logique pure (pas de DOM)

---

### ✅ Test 2 : `BooksList.test.jsx` (6 tests)

**Localisation** : `frontend/src/__tests__/BooksList.test.jsx`

**Ce qui est testé** : Le composant présentationnel qui affiche la liste de livres

| Test | Description | Vérifie |
|------|-------------|---------|
| 1️⃣ | Titre de section | Le titre "Liste des livres" est affiché |
| 2️⃣ | Affichage des livres | Tous les titres passés en props s'affichent |
| 3️⃣ | Affichage des auteurs | Tous les auteurs sont présents |
| 4️⃣ | Liste vide | Gère une liste vide sans crash |
| 5️⃣ | Nombre de livres | Compte le bon nombre de cartes rendues |
| 6️⃣ | Application des couleurs | Le composant se rend avec les props colors |

**Type de test** : Rendu de composant UI (avec DOM simulé)

---

### ✅ Test 3 : `BooksContainer.test.jsx` (5 tests)

**Localisation** : `frontend/src/__tests__/BooksContainer.test.jsx`

**Ce qui est testé** : Le composant "smart" qui charge les données avec `useEffect`

| Test | Description | Vérifie |
|------|-------------|---------|
| 1️⃣ | Chargement initial | Les 3 livres apparaissent après `useEffect` |
| 2️⃣ | Nombre de livres | Trouve bien 3 livres dans le DOM |
| 3️⃣ | Affichage des auteurs | Tous les auteurs sont rendus |
| 4️⃣ | Rendu BooksList | Le composant enfant BooksList s'affiche |
| 5️⃣ | Initialisation vide | État vide au début puis chargement |

**Type de test** : Composant avec logique (useState + useEffect + asynchrone)

---

## 🚀 Comment tester ton application

### Étape 1 : Ouvrir le terminal

Dans VS Code/Cursor, ouvre un terminal (`Ctrl + ù` ou menu Terminal → New Terminal).

### Étape 2 : Naviguer vers le dossier frontend

```bash
cd frontend
```

### Étape 3 : Lancer les tests

```bash
npm run test
```

### Résultat attendu

Si tout fonctionne bien, tu devrais voir :

```
 ✓ src/__tests__/themeUtils.test.js (7)
   ✓ themeUtils - getNextTheme (3)
     ✓ passe de light à dark
     ✓ passe de dark à light
     ✓ gère correctement le cycle complet
   ✓ themeUtils - getThemeIcon (4)
     ✓ retourne DarkModeIcon pour le thème dark
     ✓ retourne LightModeIcon pour le thème light
     ✓ retourne LightModeIcon par défaut pour une valeur inconnue
     ✓ retourne LightModeIcon pour undefined

 ✓ src/__tests__/BooksList.test.jsx (6)
   ✓ BooksList Component (6)
     ✓ affiche le titre de la section
     ✓ affiche tous les livres reçus en props
     ✓ affiche les auteurs correctement
     ✓ rend une liste vide sans erreur
     ✓ affiche le bon nombre de livres
     ✓ applique les couleurs fournies en props

 ✓ src/__tests__/BooksContainer.test.jsx (5)
   ✓ BooksContainer Component (5)
     ✓ charge et affiche la liste initiale de livres
     ✓ affiche les 3 livres de la liste initiale
     ✓ affiche les auteurs des livres
     ✓ rend le composant BooksList avec les bonnes props
     ✓ initialise avec un tableau vide puis charge les livres

Test Files  3 passed (3)
     Tests  18 passed (18)
  Start at  14:23:45
  Duration  1.24s (transform 248ms, setup 156ms, collect 892ms, tests 412ms)
```

---

## 🎯 Commandes utiles

### Commande de base
```bash
npm run test
```
Lance tous les tests une fois.

### Mode watch (recommandé pendant le développement)
```bash
npm run test -- --watch
```
Relance automatiquement les tests quand tu modifies un fichier.

### Interface graphique
```bash
npm run test:ui
```
Ouvre une interface web interactive pour voir les tests.

### Rapport de couverture
```bash
npm run test:coverage
```
Génère un rapport montrant quelles lignes de code sont testées.

### Lancer un seul fichier
```bash
npm run test -- themeUtils.test.js
```
Lance uniquement les tests du fichier spécifié.

### Lancer des tests spécifiques par nom
```bash
npm run test -- -t "BooksList"
```
Lance uniquement les tests contenant "BooksList" dans leur nom.

### Mode verbose (détails)
```bash
npm run test -- --reporter=verbose
```
Affiche plus d'informations sur l'exécution des tests.

---

## 📊 Interpréter les résultats

### ✅ Test réussi (PASS)
```
✓ affiche tous les livres reçus en props
```
Le test a vérifié que le code fonctionne comme prévu.

### ❌ Test échoué (FAIL)
```
✕ affiche tous les livres reçus en props
  Expected: "Le Petit Prince"
  Received: undefined
```
Le test a trouvé un problème. Lis le message d'erreur pour comprendre ce qui ne va pas.

### ⏩ Test ignoré (SKIP)
```
○ affiche tous les livres reçus en props (skipped)
```
Le test existe mais n'est pas exécuté (utilise `it.skip()` pour ignorer temporairement).

---

## 💡 Comprendre les concepts de test

### AAA Pattern (Arrange-Act-Assert)

Chaque test suit cette structure :

```javascript
it('affiche tous les livres reçus en props', () => {
  // 1. ARRANGE : Préparer les données
  const mockBooks = [{ id: 1, title: 'Le Petit Prince', author: 'Antoine' }];
  const mockColors = { primary: '#6C63FF', ... };
  
  // 2. ACT : Exécuter l'action
  render(<BooksList books={mockBooks} colors={mockColors} />);
  
  // 3. ASSERT : Vérifier le résultat
  expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
});
```

### Matchers courants

| Matcher | Signification | Exemple |
|---------|---------------|---------|
| `.toBe()` | Égalité stricte (===) | `expect(result).toBe('dark')` |
| `.toBeInTheDocument()` | Élément présent dans le DOM | `expect(screen.getByText('Titre')).toBeInTheDocument()` |
| `.toHaveLength()` | Longueur d'un tableau | `expect(items).toHaveLength(3)` |
| `.not.toBeInTheDocument()` | Élément absent du DOM | `expect(screen.queryByText('X')).not.toBeInTheDocument()` |
| `.toBeGreaterThanOrEqual()` | Nombre ≥ | `expect(count).toBeGreaterThanOrEqual(3)` |

### Requêtes Testing Library

| Requête | Quand utiliser | Comportement si non trouvé |
|---------|----------------|----------------------------|
| `getByText()` | Élément présent immédiatement | ❌ Erreur |
| `queryByText()` | Vérifier qu'un élément n'existe pas | ✅ Retourne null |
| `findByText()` | Élément apparaît après un délai (async) | ❌ Erreur après timeout |
| `getAllByText()` | Plusieurs éléments avec le même texte | ❌ Erreur si aucun |

### Tests asynchrones

Pour les composants avec `useEffect` ou appels API :

```javascript
it('charge les données', async () => {
  render(<BooksContainer />);
  
  // Attendre que l'élément apparaisse
  await waitFor(() => {
    expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
  });
  
  // Ou utiliser findBy (équivalent plus court)
  const title = await screen.findByText('Le Petit Prince');
  expect(title).toBeInTheDocument();
});
```

---

## 🎓 Pour présenter au professeur

### 1. Démontrer l'analyse statique
```bash
npm run lint
```
Montre que ESLint vérifie le code sans l'exécuter.

### 2. Démontrer l'analyse dynamique
```bash
npm run test
```
Montre que Vitest exécute le code et vérifie son comportement.

### 3. Expliquer les 3 types de tests

| Type | Fichier | Qu'est-ce que ça teste | Pourquoi c'est important |
|------|---------|------------------------|--------------------------|
| **Logique pure** | `themeUtils.test.js` | Fonctions utilitaires sans UI | Vérifie les algorithmes et la logique métier |
| **UI Présentationnel** | `BooksList.test.jsx` | Composant qui reçoit props et affiche | Vérifie que l'interface affiche correctement les données |
| **UI avec état** | `BooksContainer.test.jsx` | Composant avec useState + useEffect | Vérifie que la logique React fonctionne (cycle de vie) |

### 4. Montrer la couverture
```bash
npm run test:coverage
```
Affiche un rapport indiquant quel % du code est testé.

---

## 🐛 Dépannage

### Erreur : "Cannot find module"
**Solution** : Vérifie que toutes les dépendances sont installées :
```bash
npm install
```

### Tests qui échouent
**Solution** : Lis le message d'erreur attentivement. Il indique :
- Quel test a échoué
- Quelle valeur était attendue
- Quelle valeur a été reçue

### Timeout sur les tests asynchrones
**Solution** : Augmente le timeout dans le test :
```javascript
await waitFor(() => {
  expect(screen.getByText('Titre')).toBeInTheDocument();
}, { timeout: 3000 }); // 3 secondes au lieu de 1
```

---

## 📚 Ressources

- [Documentation Vitest](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest-DOM Matchers](https://github.com/testing-library/jest-dom)

---

## ✅ Checklist finale

Avant de présenter au prof, assure-toi que :

- [ ] `npm run test` passe tous les tests (18/18 ✅)
- [ ] `npm run lint` ne retourne aucune erreur
- [ ] Tu peux expliquer chaque type de test (logique pure, UI, async)
- [ ] Tu comprends le pattern AAA (Arrange-Act-Assert)
- [ ] Tu sais interpréter un résultat de test (PASS/FAIL)

---

## 🎯 Conclusion

Ton projet ULMA Library contient maintenant :
- ✅ **18 unit tests** répartis dans 3 fichiers
- ✅ **Analyse statique** (ESLint)
- ✅ **Analyse dynamique** (Vitest + Testing Library)
- ✅ **Code organisé** (dossier `__tests__/`, configuration propre)
- ✅ **Couverture complète** (fonctions utils, composants UI, logique async)

C'est une base solide pour démontrer que tu maîtrises l'analyse statique ET dynamique, ainsi que les bonnes pratiques de test en React ! 🚀

