# Analyse statique

- Quoi : vérifier le code sans l’exécuter (syntax, règles, bonnes pratiques).
- Comment : depuis `frontend/`, exécute `npm run lint` (cela lance `eslint .`).
- Pourquoi : pour capter les erreurs de style / hooks / imports avant de lancer l’appli.

# Analyse dynamique

- Quoi : exécuter le code pour voir comment il se comporte (render, interactions, données).
- Comment : démarrer `npm run dev`, ouvrir `http://localhost:5173`, et utiliser la console navigateur ou React DevTools pour inspecter.
