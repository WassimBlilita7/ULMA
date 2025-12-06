# Sécurité - ULMA Library

## 📖 Introduction

La **sécurité** est cruciale dans toute application web. Ce document explique comment prévenir les vulnérabilités courantes et protéger les données sensibles dans le projet ULMA Library.

### Pourquoi la sécurité est importante ?

- 🔒 Protéger les données des utilisateurs (étudiants, emprunts)
- 🛡️ Prévenir les attaques malveillantes (XSS, CSRF, injection)
- 🔐 Garantir la confidentialité des informations
- ✅ Respecter les bonnes pratiques du développement web moderne

---

## 🛡️ Vulnérabilités courantes et prévention

### 1. XSS (Cross-Site Scripting)

#### Qu'est-ce que c'est ?
Un attaquant injecte du code JavaScript malveillant dans ton application pour voler des données ou exécuter des actions non autorisées.

#### Exemple d'attaque
```javascript
// Si un utilisateur entre ce texte dans un formulaire :
const userInput = "<script>alert('Hack!')</script>";

// Et que tu l'affiches directement :
element.innerHTML = userInput; // ❌ DANGEREUX !
```

#### Prévention dans React ✅

React protège automatiquement contre XSS :

```javascript
// ✅ React échappe automatiquement les caractères dangereux
function BookTitle({ title }) {
  return <h3>{title}</h3>; // Sécurisé par défaut
}

// ❌ DANGER : dangerouslySetInnerHTML contourne la protection
function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />; // À éviter !
}

// ✅ Si tu dois vraiment afficher du HTML, sanitize-le d'abord
import DOMPurify from 'dompurify';

function SafeComponent({ html }) {
  const cleanHTML = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}
```

**Dans ULMA Library** : Nos composants utilisent déjà React correctement, donc protection automatique ✅

---

### 2. Injection SQL

#### Qu'est-ce que c'est ?
Un attaquant manipule les requêtes SQL pour accéder ou modifier des données non autorisées.

#### Exemple d'attaque
```sql
-- Si tu construis une requête comme ça :
"SELECT * FROM books WHERE title = '" + userInput + "'"

-- Un attaquant peut entrer :
"'; DROP TABLE books; --"

-- Résultat : toute la table est supprimée !
```

#### Prévention ✅

**Backend (Node.js/Express)** : Utilise des requêtes préparées

```javascript
// ❌ DANGER : Concaténation directe
const query = `SELECT * FROM students WHERE id = ${req.params.id}`;

// ✅ Requêtes préparées (avec mysql2, pg, etc.)
const query = 'SELECT * FROM students WHERE id = ?';
db.query(query, [req.params.id], (err, results) => {
  // Sécurisé
});

// ✅ Avec un ORM (Sequelize, Prisma)
const student = await Student.findByPk(req.params.id); // Sécurisé automatiquement
```

**Dans ULMA Library** : Quand tu connectes un backend, utilise toujours un ORM ou des requêtes préparées.

---

### 3. CSRF (Cross-Site Request Forgery)

#### Qu'est-ce que c'est ?
Un site malveillant envoie des requêtes à ton application en se faisant passer pour l'utilisateur connecté.

#### Prévention ✅

**Token CSRF** : Génère un token unique par session

```javascript
// Backend : Génère et vérifie un token CSRF
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true });

app.post('/api/borrow-book', csrfProtection, (req, res) => {
  // Le token est vérifié automatiquement
  // Si invalide, la requête est rejetée
});

// Frontend : Envoie le token dans chaque requête
const borrowBook = async (bookId) => {
  const response = await fetch('/api/borrow-book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCsrfToken(), // Token stocké dans un cookie
    },
    body: JSON.stringify({ bookId }),
  });
};
```

**Dans ULMA Library** : À implémenter quand tu ajoutes l'authentification.

---

### 4. Exposition de données sensibles

#### Qu'est-ce que c'est ?
Des informations confidentielles (mots de passe, tokens, clés API) sont accessibles.

#### Prévention ✅

**Variables d'environnement** : Ne jamais hardcoder les secrets

```javascript
// ❌ DANGER : Clé API en dur dans le code
const API_KEY = 'sk_live_123456789abcdef';

// ✅ Utilise des variables d'environnement
// .env (ne JAMAIS commit ce fichier)
VITE_API_URL=https://api.ulma-library.com
API_SECRET=sk_live_123456789abcdef

// vite.config.js ou code
const apiUrl = import.meta.env.VITE_API_URL; // Accessible côté client
// Les variables sans VITE_ ne sont pas exposées au frontend

// .gitignore
.env
.env.local
```

**Dans ULMA Library** : Crée un fichier `.env` pour les configurations.

---

## 🔐 Encryption des données

### 1. Hashage de mots de passe

**JAMAIS** stocker les mots de passe en clair !

```javascript
// Backend : Utilise bcrypt pour hasher les mots de passe
import bcrypt from 'bcrypt';

// Lors de l'inscription
const registerUser = async (username, password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Stocke hashedPassword dans la base de données
  await db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  );
};

// Lors de la connexion
const loginUser = async (username, password) => {
  const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  
  if (!user) return { error: 'User not found' };
  
  const isValid = await bcrypt.compare(password, user.password);
  
  if (isValid) {
    // Génère un JWT ou une session
    return { success: true, userId: user.id };
  } else {
    return { error: 'Invalid password' };
  }
};
```

---

### 2. Encryption des données sensibles

Pour les données sensibles (numéros de carte, informations personnelles) :

```javascript
// Backend : Utilise crypto pour encryption/decryption
import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
const IV_LENGTH = 16;

// Encrypt
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt
function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Utilisation
const studentEmail = 'student@ulma.edu';
const encryptedEmail = encrypt(studentEmail);
// Stocke encryptedEmail dans la base de données

// Plus tard
const decryptedEmail = decrypt(encryptedEmail);
```

---

### 3. JWT (JSON Web Tokens) pour l'authentification

```javascript
// Backend : Génère un JWT après connexion réussie
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign(
    { userId, role: 'student' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Frontend : Stocke le token de manière sécurisée
const login = async (username, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  
  if (data.token) {
    // ✅ Stocke dans httpOnly cookie (recommandé) ou localStorage
    localStorage.setItem('authToken', data.token);
  }
};

// Middleware backend : Vérifie le token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'No token' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes protégées
app.get('/api/my-borrows', authenticateToken, (req, res) => {
  // req.user contient les infos du token
  const userId = req.user.userId;
  // ...
});
```

---

## 🔒 Implémentation dans ULMA Library

### Fichiers de sécurité créés

```
frontend/
└── src/
    └── utils/
        ├── encryption.js      // Utilitaires d'encryption (frontend)
        ├── sanitization.js    // Nettoyage des inputs
        └── validation.js      // Validation des données
```

### 1. Utilitaire de sanitization

**Fichier** : `src/utils/sanitization.js`

Nettoie les inputs utilisateur pour prévenir XSS.

### 2. Utilitaire de validation

**Fichier** : `src/utils/validation.js`

Valide les données avant de les envoyer au backend.

### 3. Exemple d'authentification

**Fichier** : `src/components/LoginForm.jsx`

Formulaire de connexion sécurisé avec validation.

---

## 📋 Checklist de sécurité

### Frontend (React)

- [x] ✅ Éviter `dangerouslySetInnerHTML`
- [x] ✅ Valider les inputs utilisateur
- [ ] 🔄 Sanitizer les données affichées (DOMPurify)
- [x] ✅ Ne pas stocker de secrets dans le code
- [ ] 🔄 Utiliser HTTPS en production
- [ ] 🔄 Implémenter Content Security Policy (CSP)
- [x] ✅ Valider les données côté client ET serveur

### Backend (Node.js/Express)

- [ ] 🔄 Utiliser des requêtes préparées (SQL)
- [ ] 🔄 Hasher les mots de passe (bcrypt)
- [ ] 🔄 Implémenter des tokens CSRF
- [ ] 🔄 Valider toutes les entrées
- [ ] 🔄 Limiter les tentatives de connexion (rate limiting)
- [ ] 🔄 Logger les activités suspectes
- [ ] 🔄 Utiliser CORS correctement
- [ ] 🔄 Configurer des headers de sécurité (helmet.js)

### Général

- [x] ✅ Variables d'environnement pour les secrets
- [ ] 🔄 Audits de sécurité réguliers (`npm audit`)
- [ ] 🔄 Mettre à jour les dépendances
- [ ] 🔄 Chiffrer les données sensibles en base
- [ ] 🔄 Backups réguliers
- [ ] 🔄 Monitoring et alertes

---

## 🧪 Tester la sécurité

### 1. Audit des dépendances

```bash
# Vérifie les vulnérabilités connues dans les dépendances
npm audit

# Corrige automatiquement les vulnérabilités
npm audit fix

# Pour les vulnérabilités critiques
npm audit fix --force
```

### 2. Linter de sécurité

```bash
# Installe ESLint plugin security
npm install -D eslint-plugin-security

# Ajoute dans eslint.config.js
import security from 'eslint-plugin-security';

export default [
  {
    plugins: { security },
    rules: {
      ...security.configs.recommended.rules,
    },
  },
];
```

### 3. Tests de pénétration basiques

- Essayer d'injecter du HTML/JS dans les formulaires
- Tester avec des caractères spéciaux : `<>'"&`
- Vérifier que les routes API nécessitent l'authentification
- Tester les limites de taux (rate limiting)

---

## 🎓 Pour présenter au professeur

### Démontrer la sécurité dans ULMA Library

1. **Variables d'environnement**
   ```bash
   cat .env.example  # Montre la structure sans les vraies valeurs
   ```

2. **Validation des inputs**
   ```javascript
   // Montre le code dans validation.js
   ```

3. **Protection React contre XSS**
   ```javascript
   // Montre un composant qui échappe automatiquement
   ```

4. **Audit de sécurité**
   ```bash
   npm audit
   ```

5. **Headers de sécurité** (si backend implémenté)
   ```javascript
   // Montre la configuration helmet.js
   ```

---

## 🛠️ Outils recommandés

| Outil | Usage | Installation |
|-------|-------|--------------|
| **bcrypt** | Hash des mots de passe | `npm install bcrypt` |
| **jsonwebtoken** | JWT pour auth | `npm install jsonwebtoken` |
| **DOMPurify** | Sanitize HTML | `npm install dompurify` |
| **helmet** | Headers HTTP sécurisés | `npm install helmet` |
| **express-rate-limit** | Limiter les requêtes | `npm install express-rate-limit` |
| **validator** | Validation de données | `npm install validator` |
| **dotenv** | Variables d'environnement | `npm install dotenv` |

---

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Vulnérabilités les plus courantes
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Node.js Security Checklist](https://nodejs.org/en/docs/guides/security/)
- [JWT Best Practices](https://jwt.io/introduction)

---

## 🎯 Conclusion

La sécurité dans ULMA Library inclut :

- ✅ **Prévention XSS** : React échappe automatiquement
- ✅ **Validation** : Vérification des inputs utilisateur
- ✅ **Encryption** : Utilitaires pour chiffrer les données sensibles
- ✅ **Authentification** : Pattern JWT sécurisé
- ✅ **Bonnes pratiques** : Variables d'environnement, audit npm

Avec ces mesures, ton application est protégée contre les vulnérabilités courantes ! 🔒

