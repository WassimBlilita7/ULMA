# Design Pattern : Container/Presentational (Smart/Dumb Components)

Ce projet React utilise le design pattern "Container/Presentational" pour séparer la logique métier et l'affichage de l'interface utilisateur.

## Principe
- **Container (Smart)** : gère la logique, l'état, les appels API, la récupération des données. Il transmet les données à un composant enfant.
- **Presentational (Dumb)** : reçoit les données en props et affiche uniquement l'UI. Il ne gère pas la logique métier.

## Exemple dans ce projet

### BooksContainer.jsx
- Récupère la liste des livres (ici simulée, mais pourrait venir d'une API).
- Utilise le hook `useThemeColors` pour adapter le design au thème (clair/sombre).
- Transmet la liste des livres et les couleurs au composant BooksList.

### BooksList.jsx
- Reçoit la liste des livres et les couleurs en props.
- Affiche la liste avec un design moderne, animé et harmonieux avec le thème.
- Ne gère aucune logique métier.

## Avantages
- Séparation claire entre logique et présentation.
- Code plus propre, réutilisable et facile à maintenir.
- Facile à tester.

## Illustration
```
BooksContainer (logique, données)
   |
   v
BooksList (affichage)
```

Ce pattern est très utilisé dans les applications React professionnelles pour garantir la qualité et la maintenabilité du code.