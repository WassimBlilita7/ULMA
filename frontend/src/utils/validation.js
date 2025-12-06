/**
 * Utilitaires de validation pour vérifier les données utilisateur
 * 
 * Ces fonctions retournent { valid: boolean, error?: string }
 */

/**
 * Valide un email
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email requis' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Format email invalide' };
  }
  
  if (email.length > 255) {
    return { valid: false, error: 'Email trop long (max 255 caractères)' };
  }
  
  return { valid: true };
}

/**
 * Valide un mot de passe
 * Critères : min 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Mot de passe requis' };
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Minimum 8 caractères' };
  }
  
  if (password.length > 128) {
    return { valid: false, error: 'Maximum 128 caractères' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Doit contenir au moins une minuscule' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Doit contenir au moins une majuscule' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Doit contenir au moins un chiffre' };
  }
  
  return { valid: true };
}

/**
 * Valide un nom d'utilisateur
 */
export function validateUsername(username) {
  if (!username || typeof username !== 'string') {
    return { valid: false, error: 'Nom d\'utilisateur requis' };
  }
  
  const trimmed = username.trim();
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'Minimum 3 caractères' };
  }
  
  if (trimmed.length > 50) {
    return { valid: false, error: 'Maximum 50 caractères' };
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return { 
      valid: false, 
      error: 'Uniquement lettres, chiffres, _ et -' 
    };
  }
  
  return { valid: true };
}

/**
 * Valide un titre de livre
 */
export function validateBookTitle(title) {
  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Titre requis' };
  }
  
  const trimmed = title.trim();
  
  if (trimmed.length < 1) {
    return { valid: false, error: 'Le titre ne peut pas être vide' };
  }
  
  if (trimmed.length > 200) {
    return { valid: false, error: 'Maximum 200 caractères' };
  }
  
  return { valid: true };
}

/**
 * Valide un nom d'auteur
 */
export function validateAuthorName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Nom d\'auteur requis' };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length < 2) {
    return { valid: false, error: 'Minimum 2 caractères' };
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Maximum 100 caractères' };
  }
  
  return { valid: true };
}

/**
 * Valide un numéro de téléphone (format international)
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Numéro de téléphone requis' };
  }
  
  // Accepte formats: +33123456789, 0123456789, +1 (234) 567-8900
  const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
  
  if (!phoneRegex.test(phone)) {
    return { valid: false, error: 'Format de téléphone invalide' };
  }
  
  return { valid: true };
}

/**
 * Valide une date de naissance (doit être majeur - 18 ans minimum)
 */
export function validateBirthDate(dateString) {
  if (!dateString) {
    return { valid: false, error: 'Date de naissance requise' };
  }
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Date invalide' };
  }
  
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  
  if (age < 18) {
    return { valid: false, error: 'Vous devez avoir au moins 18 ans' };
  }
  
  if (age > 120) {
    return { valid: false, error: 'Date de naissance invalide' };
  }
  
  return { valid: true };
}

/**
 * Valide un ID (doit être un nombre positif)
 */
export function validateId(id) {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  
  if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
    return { valid: false, error: 'ID invalide' };
  }
  
  return { valid: true };
}

/**
 * Valide une URL
 */
export function validateUrl(url) {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL requise' };
  }
  
  try {
    const urlObj = new URL(url);
    
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return { valid: false, error: 'Protocole HTTP/HTTPS requis' };
    }
    
    return { valid: true };
  } catch (e) {
    return { valid: false, error: 'Format URL invalide' };
  }
}

/**
 * Valide un formulaire complet
 * Retourne { valid: boolean, errors: { field: error } }
 */
export function validateForm(fields, rules) {
  const errors = {};
  let isValid = true;
  
  for (const [field, value] of Object.entries(fields)) {
    const validator = rules[field];
    
    if (validator) {
      const result = validator(value);
      
      if (!result.valid) {
        errors[field] = result.error;
        isValid = false;
      }
    }
  }
  
  return { valid: isValid, errors };
}

/**
 * Exemple d'utilisation dans un composant
 * 
 * import { validateEmail, validatePassword, validateForm } from './utils/validation';
 * 
 * function LoginForm() {
 *   const [errors, setErrors] = useState({});
 * 
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     const formData = {
 *       email: e.target.email.value,
 *       password: e.target.password.value,
 *     };
 * 
 *     const result = validateForm(formData, {
 *       email: validateEmail,
 *       password: validatePassword,
 *     });
 * 
 *     if (!result.valid) {
 *       setErrors(result.errors);
 *       return;
 *     }
 * 
 *     // Envoyer au backend
 *   };
 * }
 */

