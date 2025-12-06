/**
 * Utilitaires de sanitization pour prévenir les attaques XSS
 * 
 * Ces fonctions nettoient les inputs utilisateur avant affichage ou traitement
 */

/**
 * Échappe les caractères HTML dangereux
 * Prévient l'injection de balises HTML/JavaScript
 */
export function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Supprime toutes les balises HTML d'une chaîne
 * Utile pour afficher du texte brut uniquement
 */
export function stripHtml(html) {
  if (typeof html !== 'string') return html;
  
  // Supprime toutes les balises HTML
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Nettoie un nom d'utilisateur
 * Autorise uniquement lettres, chiffres, underscore et tiret
 */
export function sanitizeUsername(username) {
  if (typeof username !== 'string') return '';
  
  // Garde uniquement les caractères alphanumériques, _, -
  return username
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 50); // Limite à 50 caractères
}

/**
 * Nettoie un email
 * Supprime les espaces et caractères dangereux
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  
  return email
    .trim()
    .toLowerCase()
    .replace(/[<>"']/g, '');
}

/**
 * Nettoie un titre de livre
 * Autorise les lettres, chiffres, espaces et ponctuation basique
 */
export function sanitizeBookTitle(title) {
  if (typeof title !== 'string') return '';
  
  // Échappe les caractères HTML mais garde les accents et ponctuation
  return escapeHtml(title.trim()).slice(0, 200);
}

/**
 * Nettoie un numéro de téléphone
 * Garde uniquement les chiffres, +, -, (, )
 */
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  
  return phone.replace(/[^0-9+\-() ]/g, '').trim();
}

/**
 * Nettoie une URL
 * Vérifie qu'elle commence par http:// ou https://
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';
  
  const trimmed = url.trim();
  
  // Autorise uniquement http:// et https://
  if (!/^https?:\/\//i.test(trimmed)) {
    return '';
  }
  
  try {
    const urlObj = new URL(trimmed);
    // Vérifie que le protocole est bien http ou https
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      return urlObj.href;
    }
  } catch (e) {
    return '';
  }
  
  return '';
}

/**
 * Nettoie un objet entier récursivement
 * Applique escapeHtml à toutes les valeurs string
 */
export function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? escapeHtml(obj) : obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeObject(value);
  }
  
  return sanitized;
}

/**
 * Limite la longueur d'un texte sans couper les mots
 */
export function truncateText(text, maxLength = 100) {
  if (typeof text !== 'string' || text.length <= maxLength) {
    return text;
  }
  
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.slice(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Exemple d'utilisation dans un composant React
 * 
 * import { sanitizeBookTitle, escapeHtml } from './utils/sanitization';
 * 
 * function BookForm() {
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     const title = sanitizeBookTitle(e.target.title.value);
 *     const author = escapeHtml(e.target.author.value);
 *     // Envoyer au backend...
 *   };
 * }
 */

