# Méthodologie Agile - ULMA Library

## 📖 Introduction

Le projet **ULMA Library** a été développé en suivant la **méthodologie Agile**, en particulier le framework **Scrum**. Ce document détaille comment les principes Agile ont été appliqués tout au long du développement.

---

## 🎯 Principes Agile Appliqués

### Manifeste Agile

Nous avons suivi les 4 valeurs fondamentales du Manifeste Agile :

| Valeur | Application dans ULMA Library |
|--------|-------------------------------|
| **Individus et interactions** > Processus et outils | Collaboration directe, communication continue, feedback régulier |
| **Logiciel fonctionnel** > Documentation exhaustive | Livraison de fonctionnalités testables à chaque sprint |
| **Collaboration avec le client** > Négociation contractuelle | Démonstrations régulières, ajustements basés sur le feedback |
| **Adaptation au changement** > Suivi d'un plan | Sprints courts permettant d'ajuster les priorités |

---

## 🔄 Framework Scrum

### Rôles

| Rôle | Responsable | Responsabilités |
|------|-------------|-----------------|
| **Product Owner** | Professeur/Client | Définit les priorités, valide les fonctionnalités |
| **Scrum Master** | Équipe de développement | Facilite les cérémonies, supprime les obstacles |
| **Development Team** | Développeurs | Conçoit, développe, teste et livre les fonctionnalités |

### Durée des Sprints

- **Sprint 0** : 1 semaine (Setup initial)
- **Sprints 1-4** : 1 semaine chacun
- **Sprint de finalisation** : 3 jours

**Total** : 5 sprints sur 5 semaines

---

## 📅 Cérémonies Scrum

### 1. Sprint Planning (Début de chaque sprint)

**Durée** : 1-2 heures  
**Objectif** : Planifier les user stories du sprint  
**Participants** : Toute l'équipe

**Livrables** :
- Liste des user stories sélectionnées
- Estimation des points de complexité
- Sprint Goal (objectif du sprint)

---

### 2. Daily Stand-up (Quotidien)

**Durée** : 15 minutes  
**Format** : Chacun répond à 3 questions :
1. Qu'ai-je fait hier ?
2. Que vais-je faire aujourd'hui ?
3. Y a-t-il des obstacles ?

**Exemple pour ULMA Library** :
```
Hier : Implémenté le composant BooksList
Aujourd'hui : Ajouter les tests pour BooksList
Obstacles : Aucun
```

---

### 3. Sprint Review (Fin de sprint)

**Durée** : 1 heure  
**Objectif** : Démontrer les fonctionnalités terminées  
**Participants** : Équipe + Product Owner

**Démo** :
- Présentation des user stories complétées
- Test des fonctionnalités en live
- Feedback du Product Owner

---

### 4. Sprint Retrospective (Après la review)

**Durée** : 45 minutes  
**Format** : What went well / What can be improved / Action items

**Exemple Sprint 2** :
- ✅ **Bien** : Tests automatisés ajoutés
- 🔄 **À améliorer** : Documentation à jour plus régulièrement
- 📝 **Actions** : Documenter au fur et à mesure du développement

---

## 📊 Product Backlog

Le **Product Backlog** contient toutes les user stories ordonnées par priorité.

### Format d'une User Story

```
En tant que [rôle],
Je veux [action],
Afin de [bénéfice].

Critères d'acceptation :
- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3
```

### Estimation

Nous utilisons la suite de **Fibonacci** pour estimer la complexité :
- **1 point** : Très simple (< 1h)
- **2 points** : Simple (1-2h)
- **3 points** : Moyen (demi-journée)
- **5 points** : Complexe (1 jour)
- **8 points** : Très complexe (2 jours)
- **13 points** : À découper

---

## 🎯 User Stories - ULMA Library

### Epic 1 : Interface Utilisateur

#### US-01 : Navigation principale
```
En tant qu'utilisateur,
Je veux une barre de navigation claire,
Afin de naviguer facilement dans l'application.

Points : 3
Priorité : Haute
Sprint : 1

Critères d'acceptation :
- [x] AppBar visible en haut de page
- [x] Logo ULMA Library affiché
- [x] Liens Accueil, Livres, Étudiants
- [x] Toggle de thème (light/dark)
```

#### US-02 : Thème clair/sombre
```
En tant qu'utilisateur,
Je veux basculer entre mode clair et sombre,
Afin d'adapter l'interface à mes préférences.

Points : 5
Priorité : Haute
Sprint : 1

Critères d'acceptation :
- [x] Bouton de toggle dans l'AppBar
- [x] Changement de thème instantané
- [x] Persistance du choix (localStorage)
- [x] Tous les composants s'adaptent
```

#### US-03 : Page d'accueil
```
En tant qu'utilisateur,
Je veux une page d'accueil attrayante,
Afin de comprendre rapidement le système.

Points : 5
Priorité : Haute
Sprint : 1

Critères d'acceptation :
- [x] Titre "Welcome to ULMA Library"
- [x] Description du système
- [x] Graphique de statistiques
- [x] Design moderne et responsive
```

---

### Epic 2 : Gestion des Livres

#### US-04 : Liste des livres
```
En tant qu'utilisateur,
Je veux voir la liste des livres disponibles,
Afin de consulter le catalogue.

Points : 5
Priorité : Haute
Sprint : 2

Critères d'acceptation :
- [x] Affichage de tous les livres
- [x] Titre et auteur visibles
- [x] Design en cartes (cards)
- [x] Animation au chargement
```

#### US-05 : Détails d'un livre
```
En tant qu'utilisateur,
Je veux voir les détails d'un livre,
Afin d'avoir plus d'informations.

Points : 3
Priorité : Moyenne
Sprint : 2

Critères d'acceptation :
- [x] Titre, auteur, description
- [x] Disponibilité
- [x] Date de publication
- [x] ISBN
```

---

### Epic 3 : Tests et Qualité

#### US-06 : Tests unitaires
```
En tant que développeur,
Je veux des tests unitaires automatisés,
Afin de garantir la qualité du code.

Points : 8
Priorité : Haute
Sprint : 3

Critères d'acceptation :
- [x] Tests pour utils (themeUtils)
- [x] Tests pour composants (BooksList, BooksContainer)
- [x] Couverture > 80%
- [x] Tests passent tous (18/18)
```

#### US-07 : Tests d'intégration
```
En tant que développeur,
Je veux des tests d'intégration,
Afin de vérifier que les composants fonctionnent ensemble.

Points : 8
Priorité : Haute
Sprint : 3

Critères d'acceptation :
- [x] Tests App complet
- [x] Tests toggle thème
- [x] Tests flux Container→Presentational
- [x] Tests passent tous (17/17)
```

---

### Epic 4 : Sécurité

#### US-08 : Protection XSS
```
En tant que développeur,
Je veux protéger l'application contre les attaques XSS,
Afin de garantir la sécurité des utilisateurs.

Points : 5
Priorité : Haute
Sprint : 4

Critères d'acceptation :
- [x] Échappement automatique (React)
- [x] Utilitaires de sanitization
- [x] Tests de sécurité (30)
- [x] Documentation complète
```

#### US-09 : Validation des données
```
En tant que développeur,
Je veux valider toutes les entrées utilisateur,
Afin d'éviter les données invalides.

Points : 5
Priorité : Haute
Sprint : 4

Critères d'acceptation :
- [x] Validation email, password, username
- [x] Messages d'erreur clairs
- [x] Tests de validation (40)
- [x] Formulaire de login sécurisé
```

#### US-10 : Encryption des données
```
En tant que développeur,
Je veux chiffrer les données sensibles,
Afin de protéger la confidentialité.

Points : 5
Priorité : Moyenne
Sprint : 4

Critères d'acceptation :
- [x] Obfuscation localStorage
- [x] Masquage emails/téléphones
- [x] Génération tokens sécurisés
- [x] Tests encryption (30)
```

---

### Epic 5 : Design et UX

#### US-11 : Design moderne
```
En tant qu'utilisateur,
Je veux une interface visuellement attrayante,
Afin d'avoir une expérience agréable.

Points : 8
Priorité : Moyenne
Sprint : 5

Critères d'acceptation :
- [x] Dégradés et ombres portées
- [x] Animations fluides
- [x] Effets au hover
- [x] Glassmorphism
```

#### US-12 : Responsive design
```
En tant qu'utilisateur mobile,
Je veux que l'interface s'adapte à mon écran,
Afin d'utiliser l'app sur n'importe quel appareil.

Points : 5
Priorité : Haute
Sprint : 5

Critères d'acceptation :
- [x] Design adaptatif (mobile, tablet, desktop)
- [x] Grid responsive
- [x] Images adaptatives
- [x] Navigation mobile
```

---

## 📈 Velocity et Burndown

### Vélocité par Sprint

| Sprint | User Stories | Points planifiés | Points complétés | Vélocité |
|--------|--------------|------------------|------------------|----------|
| Sprint 0 | Setup | 5 | 5 | 5 |
| Sprint 1 | US-01, US-02, US-03 | 13 | 13 | 13 |
| Sprint 2 | US-04, US-05 | 8 | 8 | 8 |
| Sprint 3 | US-06, US-07 | 16 | 16 | 16 |
| Sprint 4 | US-08, US-09, US-10 | 15 | 15 | 15 |
| Sprint 5 | US-11, US-12 | 13 | 13 | 13 |
| **Total** | **12 US** | **70** | **70** | **Moyenne : 11.7** |

### Burndown Chart (Exemple Sprint 3)

```
Points restants
16 |●
15 |  ●
14 |    
13 |      ●
12 |        
11 |          ●
10 |            
 9 |              ●
 8 |                
 7 |                  ●
 6 |                    
 5 |                      ●
 4 |                        
 3 |                          ●
 2 |                            
 1 |                              ●
 0 |________________________________●
   J1  J2  J3  J4  J5  J6  J7
```

---

## 🗂️ Definition of Done (DoD)

Une user story est considérée "Done" quand :

- [x] Code écrit et fonctionnel
- [x] Tests unitaires écrits et passent
- [x] Tests d'intégration si applicable
- [x] Code review effectué
- [x] Documentation mise à jour
- [x] Aucune erreur ESLint
- [x] Démo au Product Owner validée
- [x] Déployé sur l'environnement de test

---

## 🎯 Definition of Ready (DoR)

Une user story est prête à être prise en sprint si :

- [x] Format "En tant que... Je veux... Afin de..."
- [x] Critères d'acceptation définis
- [x] Estimation en points effectuée
- [x] Dépendances identifiées
- [x] Mockups/wireframes si nécessaire
- [x] Acceptée par le Product Owner

---

## 📊 Board Kanban

### Colonnes du board

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   Backlog   │   To Do     │ In Progress │   Review    │    Done     │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│             │             │             │             │   US-01 ✅  │
│             │             │             │             │   US-02 ✅  │
│             │             │             │             │   US-03 ✅  │
│             │             │             │             │   US-04 ✅  │
│             │             │             │             │   US-05 ✅  │
│             │             │             │             │   US-06 ✅  │
│             │             │             │             │   US-07 ✅  │
│             │             │             │             │   US-08 ✅  │
│             │             │             │             │   US-09 ✅  │
│             │             │             │             │   US-10 ✅  │
│             │             │             │             │   US-11 ✅  │
│             │             │             │             │   US-12 ✅  │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

---

## 🔄 Rétrospectives

### Sprint 1 Retrospective

**Date** : Semaine 1

**What went well ✅** :
- Setup rapide avec Vite
- Design pattern Container/Presentational appliqué
- Thème light/dark fonctionnel

**What can be improved 🔄** :
- Documentation à créer dès le début
- Tests unitaires à ajouter

**Action items 📝** :
- Commencer les tests dès le Sprint 2
- Documenter le design pattern

---

### Sprint 2 Retrospective

**Date** : Semaine 2

**What went well ✅** :
- Liste de livres implémentée
- Composants réutilisables
- Design cohérent avec le thème

**What can be improved 🔄** :
- Manque de tests
- Besoin de tests d'intégration

**Action items 📝** :
- Sprint 3 dédié aux tests
- Mettre en place Vitest

---

### Sprint 3 Retrospective

**Date** : Semaine 3

**What went well ✅** :
- 35 tests unitaires + intégration ajoutés
- Couverture de code > 80%
- Tests automatisés dans CI/CD

**What can be improved 🔄** :
- Manque de sécurité
- Besoin de validation des inputs

**Action items 📝** :
- Sprint 4 focalisé sur la sécurité
- Ajouter sanitization et validation

---

### Sprint 4 Retrospective

**Date** : Semaine 4

**What went well ✅** :
- 100 tests de sécurité ajoutés
- Protection XSS, validation, encryption
- Documentation sécurité complète

**What can be improved 🔄** :
- Design de l'interface à améliorer
- Animations et effets manquants

**Action items 📝** :
- Sprint 5 pour améliorer l'UX
- Ajouter des animations fluides

---

### Sprint 5 Retrospective

**Date** : Semaine 5

**What went well ✅** :
- Design moderne avec dégradés
- Animations fluides
- Glassmorphism et effets hover
- Projet complet et fonctionnel

**What can be improved 🔄** :
- Backend à implémenter (hors scope actuel)
- Déploiement en production

**Action items 📝** :
- Préparer la présentation finale
- Documenter la méthodologie Agile

---

## 📈 Métriques Agile

### Vélocité moyenne
**11.7 points par sprint**

### Taux de complétion
**100%** (70/70 points)

### Qualité du code
- **135 tests** automatisés (unitaires + intégration + sécurité)
- **0 bugs** critiques
- **0 vulnérabilités** dans les dépendances

### Time to Market
- **5 semaines** du concept au MVP complet
- **12 user stories** livrées

---

## 🎯 Continuous Improvement

### Principes appliqués

1. **Inspect & Adapt** : Rétrospectives régulières pour s'améliorer
2. **Fail Fast** : Tests automatisés pour détecter les erreurs rapidement
3. **Iterative Development** : Livraison incrémentale de valeur
4. **Transparency** : Documentation à jour, board visible

### Outils utilisés

| Outil | Usage |
|-------|-------|
| **Git** | Gestion de version |
| **GitHub Projects** | Board Kanban virtuel |
| **Vitest** | Tests automatisés |
| **ESLint** | Qualité du code |
| **Markdown** | Documentation |

---

## 📚 Documentation Agile

Le projet suit une documentation Agile :

- ✅ **Juste assez** : Documentation essentielle sans excès
- ✅ **Vivante** : Mise à jour au fur et à mesure
- ✅ **Accessible** : Markdown, facile à lire
- ✅ **Collaborative** : Partagée avec toute l'équipe

**Fichiers créés** :
- `AGILE.md` - Ce fichier
- `USER_STORIES.md` - Product Backlog détaillé
- `SPRINTS.md` - Détail de chaque sprint
- `RETROSPECTIVES.md` - Rétrospectives complètes

---

## ✅ Conclusion

Le projet ULMA Library a été développé avec succès en suivant la méthodologie Agile/Scrum :

- ✅ **5 sprints** d'une semaine
- ✅ **12 user stories** complétées
- ✅ **70 points** de vélocité
- ✅ **100% de taux de complétion**
- ✅ **135 tests** automatisés
- ✅ **0 bugs critiques**

La méthodologie Agile a permis :
- 🎯 **Adaptabilité** : Ajustement des priorités entre sprints
- 🚀 **Livraison continue** : Fonctionnalités testables à chaque sprint
- 📈 **Amélioration continue** : Rétrospectives et actions correctives
- 🤝 **Collaboration** : Communication régulière avec le Product Owner

---

**Prochaines étapes** :
1. Déploiement en production
2. Implémentation du backend
3. Ajout de nouvelles fonctionnalités basées sur feedback utilisateurs

