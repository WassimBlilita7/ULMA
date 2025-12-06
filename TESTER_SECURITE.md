# Comment Tester la Sécurité - ULMA Library

## 📖 Introduction

Ce guide explique comment tester toutes les fonctionnalités de sécurité dans ton projet, **même sans système de login complet**.

---

## 🧪 Méthode 1 : Tests Unitaires Automatisés

### Lancer tous les tests de sécurité

```bash
cd frontend

# Lancer tous les tests de sécurité
npm run test -- __tests__/security

# Lancer un fichier spécifique
npm run test -- sanitization.test.js
npm run test -- validation.test.js
npm run test -- encryption.test.js
```

### Ce qui est testé

| Fichier | Nombre de tests | Ce qui est testé |
|---------|-----------------|------------------|
| `sanitization.test.js` | 30+ tests | Échappement HTML, nettoyage inputs, protection XSS |
| `validation.test.js` | 40+ tests | Email, mot de passe, username, téléphone, etc. |
| `encryption.test.js` | 30+ tests | Base64, XOR cipher, localStorage, masquage |

### Résultat attendu

```
 ✓ src/__tests__/security/sanitization.test.js (30)
 ✓ src/__tests__/security/validation.test.js (40)
 ✓ src/__tests__/security/encryption.test.js (30)

Test Files  3 passed (3)
     Tests  100 passed (100)
```

---

## 🎨 Méthode 2 : Page de Démonstration Interactive

### Accéder à la page de démo

#### Option A : Route temporaire dans App.jsx

Ajoute temporairement dans `App.jsx` :

```javascript
import SecurityDemo from './pages/SecurityDemo';

function App() {
  // Décommente cette ligne pour accéder à la démo
  // return <SecurityDemo />;
  
  return (
    <>
      <AppBar />
      <HomeContent />
      <AboutLibrarySection />
      <BooksContainer />
    </>
  )
}
```

#### Option B : Créer une route dans l'URL

Si tu utilises React Router, ajoute une route :

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SecurityDemo from './pages/SecurityDemo';

<Routes>
  <Route path="/" element={<MainApp />} />
  <Route path="/security-demo" element={<SecurityDemo />} />
</Routes>
```

### Lancer l'application

```bash
cd frontend
npm run dev
```

Ouvre `http://localhost:5173` (ou `/security-demo` si route configurée).

### Tester chaque section

#### 1️⃣ Protection XSS

**Test :**
```html
<script>alert('XSS')</script>
<img src=x onerror="alert('XSS')">
```

**Résultat attendu :**
Les balises sont échappées et ne s'exécutent pas.

**Capture d'écran :**
- Entrée : `<script>alert('XSS')</script>`
- Sortie : `&lt;script&gt;alert('XSS')&lt;/script&gt;`

---

#### 2️⃣ Validation

**Test Email :**
- ✅ Valide : `test@example.com`
- ❌ Invalide : `invalidemail.com`

**Test Mot de passe :**
- ✅ Valide : `Password123`
- ❌ Invalide : `weak` (trop court, pas de majuscule)

**Test Username :**
- ✅ Valide : `john_doe`, `user123`
- ❌ Invalide : `ab` (trop court), `user@name` (caractères interdits)

**Résultat attendu :**
Des chips verts (✅) ou rouges (❌) avec messages d'erreur explicites.

---

#### 3️⃣ Encryption

**Test :**
1. Entre `Secret Message`
2. Clique sur "Chiffrer"
3. Observe le résultat obfusqué (ex: `aGVsbG8=...`)
4. Clique sur "Déchiffrer"
5. Récupère `Secret Message`

**Résultat attendu :**
Le texte chiffré est illisible, mais peut être déchiffré.

---

#### 4️⃣ Masquage

**Test Email :**
- Entrée : `john.doe@example.com`
- Sortie : `j***@example.com`

**Test Téléphone :**
- Entrée : `+33123456789`
- Sortie : `+33******789`

**Résultat attendu :**
Les données sont partiellement cachées pour l'affichage public.

---

#### 5️⃣ Stockage sécurisé

**Test :**
1. Clé : `testKey`
2. Valeur : `secretData123`
3. Clique sur "Sauvegarder"
4. Ouvre les DevTools → Application → Local Storage
5. Vérifie que la valeur est **obfusquée** (pas en clair)
6. Clique sur "Charger" → récupère la vraie valeur

**Résultat attendu :**
```
localStorage:
  testKey: "aGVsbG8gd29ybGQ=..." (obfusqué)

Après chargement:
  Valeur: "secretData123"
```

---

## 🔍 Méthode 3 : Tests Manuels dans les DevTools

### Test 1 : Vérifier l'obfuscation du localStorage

1. Lance l'app : `npm run dev`
2. Ouvre DevTools (F12)
3. Va dans Console et exécute :

```javascript
import { secureStorage } from './utils/encryption';

// Stocke une valeur
secureStorage.set('mySecret', 'sensitive data');

// Vérifie dans localStorage (onglet Application)
localStorage.getItem('mySecret'); // Valeur obfusquée

// Charge avec secureStorage
secureStorage.get('mySecret'); // 'sensitive data'
```

---

### Test 2 : Vérifier la validation en console

```javascript
import { validateEmail, validatePassword } from './utils/validation';

// Test email
validateEmail('test@example.com'); // { valid: true }
validateEmail('invalid'); // { valid: false, error: '...' }

// Test mot de passe
validatePassword('Password123'); // { valid: true }
validatePassword('weak'); // { valid: false, error: '...' }
```

---

### Test 3 : Vérifier la sanitization

```javascript
import { escapeHtml, sanitizeUsername } from './utils/sanitization';

// Test XSS
escapeHtml('<script>alert("XSS")</script>');
// "&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"

// Test username
sanitizeUsername('user@name#123'); // "username123"
```

---

## 📊 Méthode 4 : Tester avec des outils externes

### Test de sécurité des dépendances

```bash
cd frontend

# Audit des vulnérabilités
npm audit

# Corriger automatiquement
npm audit fix
```

**Résultat attendu :**
```
found 0 vulnerabilities
```

---

### Test des headers HTTP (si backend déployé)

Visite [SecurityHeaders.com](https://securityheaders.com) et entre ton URL.

**Headers recommandés :**
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (HTTPS)

---

## 🎓 Démonstration au Professeur

### Scénario 1 : Tests automatisés (recommandé)

```bash
# 1. Lancer les tests
cd frontend
npm run test -- __tests__/security

# 2. Montrer le résultat (tous verts ✅)
# 3. Expliquer chaque type de test :
#    - sanitization : protection XSS
#    - validation : vérification des données
#    - encryption : obfuscation localStorage
```

**Temps estimé :** 5 minutes

---

### Scénario 2 : Démo visuelle interactive

```bash
# 1. Lancer l'app
npm run dev

# 2. Accéder à SecurityDemo
# 3. Démontrer chaque section en live :
#    - XSS : injecter <script>, montrer qu'il est échappé
#    - Validation : entrer mot de passe faible, voir erreurs
#    - Encryption : chiffrer/déchiffrer un message
#    - Masquage : masquer email/téléphone
#    - Storage : montrer obfuscation dans DevTools
```

**Temps estimé :** 10 minutes

---

### Scénario 3 : Expliquer le code

Ouvre les fichiers et explique :

1. **`security.md`** - Vue d'ensemble des vulnérabilités
2. **`sanitization.js`** - Comment on nettoie les inputs
3. **`validation.js`** - Règles de validation
4. **`encryption.js`** - Obfuscation et masquage
5. **`LoginForm.jsx`** - Exemple d'authentification sécurisée

**Temps estimé :** 15 minutes

---

## ✅ Checklist de démonstration

Avant de présenter, vérifie que :

- [ ] Tous les tests passent : `npm run test -- __tests__/security` (100/100 ✅)
- [ ] Aucune vulnérabilité dans les dépendances : `npm audit` (0 found)
- [ ] La page SecurityDemo fonctionne
- [ ] Tu peux expliquer chaque vulnérabilité (XSS, SQL injection, CSRF)
- [ ] Tu peux montrer comment les fonctions protègent l'app

---

## 🎯 Points clés à mentionner

### Vulnérabilités couvertes

1. ✅ **XSS** - Échappement automatique React + utilitaires
2. ✅ **Injection SQL** - Pattern à utiliser avec backend (ORM/requêtes préparées)
3. ✅ **CSRF** - Pattern JWT documenté
4. ✅ **Données sensibles** - Obfuscation localStorage, masquage affichage
5. ✅ **Validation** - Tous les inputs vérifiés côté client

### Fichiers créés

- 📄 `security.md` - Guide complet (479 lignes)
- 📄 `SECURITY_CHECKLIST.md` - Checklist détaillée
- 📄 `TESTER_SECURITE.md` - Ce fichier
- 🔧 `utils/sanitization.js` - 10 fonctions de nettoyage
- 🔧 `utils/validation.js` - 10+ validateurs
- 🔧 `utils/encryption.js` - Encryption/obfuscation
- 🎨 `pages/SecurityDemo.jsx` - Démo interactive
- 🧪 `__tests__/security/` - 100 tests unitaires

### Statistiques impressionnantes

- **100 tests de sécurité** automatisés
- **30+ fonctions** de protection
- **5 sections** de démo interactive
- **0 vulnérabilités** dans les dépendances

---

## 🚀 Prochaines étapes (optionnel)

Pour aller plus loin :

1. Implémenter le backend avec authentification JWT
2. Ajouter HTTPS en production
3. Configurer CSP (Content Security Policy)
4. Intégrer Sentry pour monitoring
5. Audit de sécurité professionnel

---

## 📞 Support

Si quelque chose ne fonctionne pas :

1. Vérifie que toutes les dépendances sont installées : `npm install`
2. Vérifie qu'il n'y a pas d'erreurs ESLint : `npm run lint`
3. Regarde les logs de la console navigateur (F12)
4. Assure-toi d'être dans le bon dossier : `cd frontend`

---

## 🎉 Conclusion

Tu as maintenant **3 méthodes** pour tester la sécurité :

1. **Tests automatisés** (recommandé pour le prof) : `npm run test -- __tests__/security`
2. **Démo interactive** (plus visuel) : Page SecurityDemo
3. **Tests manuels** (pour comprendre) : Console DevTools

Choisis celle qui convient le mieux à ta présentation ! 🚀

