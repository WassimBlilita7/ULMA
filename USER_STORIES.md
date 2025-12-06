# Product Backlog - ULMA Library

## 📋 Vue d'ensemble

Ce document contient toutes les **User Stories** du projet ULMA Library, organisées par Epic et priorité.

**Statut du projet** : ✅ Toutes les user stories MVP sont complétées

---

## 🎯 Epics

| ID | Epic | User Stories | Points | Status |
|----|------|--------------|--------|--------|
| E1 | Interface Utilisateur | 3 | 13 | ✅ Done |
| E2 | Gestion des Livres | 2 | 8 | ✅ Done |
| E3 | Tests et Qualité | 2 | 16 | ✅ Done |
| E4 | Sécurité | 3 | 15 | ✅ Done |
| E5 | Design et UX | 2 | 13 | ✅ Done |
| E6 | Backend (Future) | - | - | 🔄 Backlog |

**Total MVP** : 12 User Stories, 70 Points

---

## Epic 1 : Interface Utilisateur 🎨

### US-01 : Navigation principale

**Priorité** : 🔴 Haute  
**Points** : 3  
**Sprint** : 1  
**Status** : ✅ Done

```
En tant qu'utilisateur,
Je veux une barre de navigation claire avec logo et liens,
Afin de naviguer facilement dans l'application.
```

**Critères d'acceptation** :
- [x] AppBar fixe en haut de page
- [x] Logo ULMA Library cliquable
- [x] Liens : Accueil, Livres, Étudiants
- [x] Toggle de thème (light/dark)
- [x] Design moderne avec Material-UI
- [x] Responsive (adapté mobile)

**Tâches techniques** :
- [x] Créer composant AppBar.jsx
- [x] Intégrer Material-UI AppBar, Toolbar, IconButton
- [x] Importer logo depuis assets
- [x] Ajouter navigation (Router si nécessaire)
- [x] Tests : vérifier que tous les éléments sont présents

**Fichiers** :
- `src/components/AppBar.jsx`

---

### US-02 : Thème clair/sombre

**Priorité** : 🔴 Haute  
**Points** : 5  
**Sprint** : 1  
**Status** : ✅ Done

```
En tant qu'utilisateur,
Je veux basculer entre mode clair et sombre,
Afin d'adapter l'interface à mes préférences et réduire la fatigue oculaire.
```

**Critères d'acceptation** :
- [x] Bouton toggle dans AppBar
- [x] Changement instantané de tous les composants
- [x] Persistance du choix (localStorage ou attribut HTML)
- [x] Couleurs cohérentes (palette définie)
- [x] Animations de transition fluides
- [x] Icône change selon le thème (Sun/Moon)

**Tâches techniques** :
- [x] Créer constants/colors.js avec palettes light/dark
- [x] Créer utils/themeUtils.js (getNextTheme, getThemeIcon, useThemeColors)
- [x] Implémenter toggle dans AppBar
- [x] Utiliser data-theme sur document.documentElement
- [x] Hook useThemeColors pour tous les composants
- [x] Tests : vérifier le cycle light↔dark

**Fichiers** :
- `src/constants/colors.js`
- `src/utils/themeUtils.js`
- `src/components/AppBar.jsx`

---

### US-03 : Page d'accueil attrayante

**Priorité** : 🔴 Haute  
**Points** : 5  
**Sprint** : 1  
**Status** : ✅ Done

```
En tant qu'utilisateur (nouveau),
Je veux une page d'accueil claire et attrayante,
Afin de comprendre rapidement le système et ses fonctionnalités.
```

**Critères d'acceptation** :
- [x] Titre "Welcome to ULMA Library"
- [x] Description courte du système
- [x] Graphique de statistiques (Chart.js)
- [x] Section "About" avec image
- [x] Design moderne avec animations
- [x] Responsive design

**Tâches techniques** :
- [x] Créer composant HomeContent.jsx
- [x] Créer composant AboutLibrarySection.jsx
- [x] Créer composant BarChart.jsx avec Chart.js
- [x] Intégrer images dans assets/
- [x] Animations avec Fade (Material-UI)
- [x] Tests : vérifier présence des éléments principaux

**Fichiers** :
- `src/components/HomeContent.jsx`
- `src/components/AboutLibrarySection.jsx`
- `src/components/BarChart.jsx`

---

## Epic 2 : Gestion des Livres 📚

### US-04 : Liste des livres

**Priorité** : 🔴 Haute  
**Points** : 5  
**Sprint** : 2  
**Status** : ✅ Done

```
En tant qu'utilisateur,
Je veux voir la liste de tous les livres disponibles,
Afin de consulter le catalogue de la bibliothèque.
```

**Critères d'acceptation** :
- [x] Affichage de tous les livres sous forme de cartes
- [x] Titre et auteur visibles pour chaque livre
- [x] Design attractif avec hover effects
- [x] Grid responsive (colonnes adaptatives)
- [x] Animation au chargement
- [x] Pattern Container/Presentational appliqué

**Tâches techniques** :
- [x] Créer composant BooksContainer.jsx (Smart - logique)
- [x] Créer composant BooksList.jsx (Dumb - UI)
- [x] useState pour stocker les livres
- [x] useEffect pour charger les données
- [x] Mock data initial (3 livres)
- [x] Tests unitaires et d'intégration

**Fichiers** :
- `src/components/BooksContainer.jsx`
- `src/components/BooksList.jsx`

---

### US-05 : Détails d'un livre

**Priorité** : 🟡 Moyenne  
**Points** : 3  
**Sprint** : 2  
**Status** : ✅ Done

```
En tant qu'utilisateur,
Je veux voir les détails complets d'un livre,
Afin d'avoir plus d'informations avant d'emprunter.
```

**Critères d'acceptation** :
- [x] Affichage du titre, auteur
- [x] Description (si disponible)
- [x] ISBN, date de publication
- [x] Statut de disponibilité
- [x] Design cohérent avec le thème

**Tâches techniques** :
- [x] Enrichir les données des livres
- [x] Afficher toutes les infos dans BooksList
- [x] Tests : vérifier affichage complet

**Fichiers** :
- `src/components/BooksList.jsx` (mis à jour)

---

## Epic 3 : Tests et Qualité 🧪

### US-06 : Tests unitaires

**Priorité** : 🔴 Haute  
**Points** : 8  
**Sprint** : 3  
**Status** : ✅ Done

```
En tant que développeur,
Je veux des tests unitaires automatisés pour chaque composant/fonction,
Afin de garantir la qualité du code et détecter les régressions.
```

**Critères d'acceptation** :
- [x] Tests pour utils (themeUtils.js)
- [x] Tests pour composants présentationnels (BooksList)
- [x] Tests pour composants avec état (BooksContainer)
- [x] Couverture de code > 80%
- [x] Tous les tests passent (18/18)
- [x] Documentation des tests (unit_test.md)

**Tâches techniques** :
- [x] Installer Vitest, @testing-library/react
- [x] Configurer Vitest dans vite.config.js
- [x] Créer setupTests.js
- [x] Écrire tests pour themeUtils (7 tests)
- [x] Écrire tests pour BooksList (6 tests)
- [x] Écrire tests pour BooksContainer (5 tests)
- [x] Script npm run test

**Fichiers** :
- `src/__tests__/themeUtils.test.js`
- `src/__tests__/BooksList.test.jsx`
- `src/__tests__/BooksContainer.test.jsx`
- `unit_test.md`

---

### US-07 : Tests d'intégration

**Priorité** : 🔴 Haute  
**Points** : 8  
**Sprint** : 3  
**Status** : ✅ Done

```
En tant que développeur,
Je veux des tests d'intégration pour vérifier que les composants fonctionnent ensemble,
Afin de valider le flux complet de l'application.
```

**Critères d'acceptation** :
- [x] Tests App complet (navigation, sections)
- [x] Tests toggle thème (interaction utilisateur)
- [x] Tests flux Container→Presentational (BooksContainer + BooksList)
- [x] Tous les tests passent (17/17)
- [x] Documentation (integration.md)

**Tâches techniques** :
- [x] Créer dossier __tests__/integration/
- [x] Tests App.integration.test.jsx (5 tests)
- [x] Tests ThemeToggle.integration.test.jsx (5 tests)
- [x] Tests BooksFlow.integration.test.jsx (7 tests)
- [x] Utiliser userEvent pour interactions
- [x] Script npm run test -- integration

**Fichiers** :
- `src/__tests__/integration/App.integration.test.jsx`
- `src/__tests__/integration/ThemeToggle.integration.test.jsx`
- `src/__tests__/integration/BooksFlow.integration.test.jsx`
- `integration.md`

---

## Epic 4 : Sécurité 🔒

### US-08 : Protection XSS

**Priorité** : 🔴 Haute  
**Points** : 5  
**Sprint** : 4  
**Status** : ✅ Done

```
En tant que développeur,
Je veux protéger l'application contre les attaques XSS (Cross-Site Scripting),
Afin de garantir la sécurité des utilisateurs.
```

**Critères d'acceptation** :
- [x] Échappement automatique des variables (React par défaut)
- [x] Utilitaires de sanitization (escapeHtml, stripHtml, etc.)
- [x] Pas d'utilisation de dangerouslySetInnerHTML sans sanitization
- [x] Tests de sécurité (30 tests)
- [x] Documentation complète (security.md)
- [x] Page de démo interactive

**Tâches techniques** :
- [x] Créer utils/sanitization.js (10 fonctions)
- [x] Tests pour sanitization (30 tests)
- [x] Page SecurityDemo.jsx pour tester
- [x] Documentation des vulnérabilités

**Fichiers** :
- `src/utils/sanitization.js`
- `src/__tests__/security/sanitization.test.js`
- `src/pages/SecurityDemo.jsx`
- `security.md`

---

### US-09 : Validation des données

**Priorité** : 🔴 Haute  
**Points** : 5  
**Sprint** : 4  
**Status** : ✅ Done

```
En tant que développeur,
Je veux valider toutes les entrées utilisateur,
Afin d'éviter les données invalides et les injections.
```

**Critères d'acceptation** :
- [x] Validation email (format correct)
- [x] Validation mot de passe (8+ chars, maj, min, chiffre)
- [x] Validation username (alphanumérique + _ -)
- [x] Messages d'erreur clairs
- [x] Tests de validation (40 tests)
- [x] Formulaire de login sécurisé

**Tâches techniques** :
- [x] Créer utils/validation.js (10+ validateurs)
- [x] Tests pour validation (40 tests)
- [x] Composant LoginForm.jsx avec validation
- [x] Intégration dans SecurityDemo

**Fichiers** :
- `src/utils/validation.js`
- `src/__tests__/security/validation.test.js`
- `src/components/LoginForm.jsx`

---

### US-10 : Encryption des données

**Priorité** : 🟡 Moyenne  
**Points** : 5  
**Sprint** : 4  
**Status** : ✅ Done

```
En tant que développeur,
Je veux chiffrer les données sensibles stockées côté client,
Afin de protéger la confidentialité.
```

**Critères d'acceptation** :
- [x] Obfuscation localStorage (XOR cipher)
- [x] Masquage emails et téléphones pour affichage
- [x] Génération tokens sécurisés
- [x] Base64 encoding/decoding
- [x] Tests encryption (30 tests)
- [x] Documentation des limites (frontend encryption)

**Tâches techniques** :
- [x] Créer utils/encryption.js
- [x] Fonctions : encodeBase64, simpleXorCipher, maskEmail, maskPhone
- [x] secureStorage wrapper pour localStorage
- [x] Tests pour encryption (30 tests)
- [x] Intégration dans SecurityDemo

**Fichiers** :
- `src/utils/encryption.js`
- `src/__tests__/security/encryption.test.js`

---

## Epic 5 : Design et UX 🎨

### US-11 : Design moderne et attractif

**Priorité** : 🟡 Moyenne  
**Points** : 8  
**Sprint** : 5  
**Status** : ✅ Done

```
En tant qu'utilisateur,
Je veux une interface visuellement moderne et attrayante,
Afin d'avoir une expérience utilisateur agréable.
```

**Critères d'acceptation** :
- [x] Dégradés de couleurs (primary → accent)
- [x] Ombres portées et effet de profondeur
- [x] Animations fluides (transitions, hover)
- [x] Glassmorphism (backdrop-filter)
- [x] Typography hiérarchisée
- [x] Micro-interactions (hover, active states)

**Tâches techniques** :
- [x] Améliorer HomeContent avec dégradés
- [x] Améliorer AboutLibrarySection avec effets
- [x] Améliorer BooksList avec cards modernes
- [x] Améliorer AppBar avec dégradé bouton thème
- [x] Ajouter animations dans App.css

**Fichiers** :
- `src/components/HomeContent.jsx` (mis à jour)
- `src/components/AboutLibrarySection.jsx` (mis à jour)
- `src/components/BooksList.jsx` (mis à jour)
- `src/components/AppBar.jsx` (mis à jour)
- `src/App.css` (keyframes ajoutées)

---

### US-12 : Responsive design

**Priorité** : 🔴 Haute  
**Points** : 5  
**Sprint** : 5  
**Status** : ✅ Done

```
En tant qu'utilisateur mobile,
Je veux que l'interface s'adapte à mon écran,
Afin d'utiliser l'application sur n'importe quel appareil.
```

**Critères d'acceptation** :
- [x] Layout adaptatif (Flexbox/Grid)
- [x] Breakpoints : mobile (<768px), tablet (768-1024px), desktop (>1024px)
- [x] Images responsives
- [x] Navigation adaptée mobile
- [x] Texte lisible sur tous les écrans
- [x] Pas de scroll horizontal

**Tâches techniques** :
- [x] Utiliser Tailwind CSS classes responsive (sm:, md:, lg:)
- [x] Grid adaptatif pour BooksList
- [x] Flex direction column sur mobile
- [x] Tests sur différentes tailles d'écran

**Fichiers** :
- Tous les composants (déjà responsive avec Tailwind)

---

## Epic 6 : Backend (Future) 🔮

### US-13 : API REST (Backlog)

**Priorité** : 🟢 Basse (Future)  
**Points** : 13  
**Sprint** : -  
**Status** : 📋 Backlog

```
En tant que développeur,
Je veux une API REST pour gérer les données,
Afin de persister les informations côté serveur.
```

**Critères d'acceptation** :
- [ ] Routes CRUD pour livres
- [ ] Routes CRUD pour étudiants
- [ ] Routes CRUD pour emprunts
- [ ] Authentification JWT
- [ ] Base de données (PostgreSQL/MongoDB)
- [ ] Documentation API (Swagger)

**Tâches techniques** :
- [ ] Setup Express.js
- [ ] Modèles de données (ORM)
- [ ] Routes et controllers
- [ ] Middleware d'authentification
- [ ] Tests API

---

### US-14 : Authentification complète (Backlog)

**Priorité** : 🟢 Basse (Future)  
**Points** : 8  
**Sprint** : -  
**Status** : 📋 Backlog

```
En tant qu'utilisateur,
Je veux pouvoir me connecter avec mon compte,
Afin d'accéder à mes emprunts personnels.
```

**Critères d'acceptation** :
- [ ] Inscription (register)
- [ ] Connexion (login)
- [ ] Déconnexion (logout)
- [ ] Mot de passe oublié
- [ ] JWT tokens
- [ ] Refresh tokens

---

### US-15 : Gestion des emprunts (Backlog)

**Priorité** : 🟢 Basse (Future)  
**Points** : 13  
**Sprint** : -  
**Status** : 📋 Backlog

```
En tant qu'étudiant,
Je veux emprunter et retourner des livres,
Afin de gérer mes lectures.
```

**Critères d'acceptation** :
- [ ] Emprunter un livre disponible
- [ ] Voir mes emprunts en cours
- [ ] Retourner un livre
- [ ] Historique des emprunts
- [ ] Notifications de retard

---

## 📊 Résumé du Product Backlog

### MVP Complété (Sprints 1-5)

| Epic | User Stories | Points | Status |
|------|--------------|--------|--------|
| E1 - UI | 3 | 13 | ✅ 100% |
| E2 - Livres | 2 | 8 | ✅ 100% |
| E3 - Tests | 2 | 16 | ✅ 100% |
| E4 - Sécurité | 3 | 15 | ✅ 100% |
| E5 - Design | 2 | 13 | ✅ 100% |
| **Total MVP** | **12** | **70** | **✅ 100%** |

### Backlog Futur

| Epic | User Stories | Points | Status |
|------|--------------|--------|--------|
| E6 - Backend | 3 | 34 | 📋 Backlog |

---

## 🎯 Priorités

### Must Have (Fait ✅)
- Navigation et thème
- Liste des livres
- Tests (unitaires + intégration + sécurité)
- Sécurité (XSS, validation, encryption)
- Design moderne et responsive

### Should Have (Future)
- Backend API REST
- Authentification JWT
- Gestion des emprunts

### Could Have (Nice to have)
- Recherche de livres
- Filtres et tri
- Notifications push
- Mode hors ligne (PWA)

---

**Dernière mise à jour** : Sprint 5  
**Product Owner** : Professeur/Client  
**Scrum Master** : Équipe de développement

