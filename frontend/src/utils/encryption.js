/**
 * Utilitaires d'encryption pour le frontend
 * 
 * NOTE : L'encryption côté frontend n'est PAS sécurisée pour les données sensibles !
 * Ces fonctions sont utiles uniquement pour :
 * - Obfusquer temporairement des données en localStorage
 * - Encoder des tokens ou IDs
 * 
 * Pour les vraies données sensibles (mots de passe, etc.), l'encryption
 * DOIT se faire côté backend avec des algorithmes robustes (bcrypt, AES, etc.)
 */

/**
 * Encode une chaîne en Base64
 * Utile pour obfusquer des données non-sensibles
 */
export function encodeBase64(str) {
  if (typeof str !== 'string') {
    str = JSON.stringify(str);
  }
  
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    console.error('Erreur d\'encodage Base64:', e);
    return null;
  }
}

/**
 * Décode une chaîne Base64
 */
export function decodeBase64(encodedStr) {
  if (!encodedStr || typeof encodedStr !== 'string') {
    return null;
  }
  
  try {
    return decodeURIComponent(escape(atob(encodedStr)));
  } catch (e) {
    console.error('Erreur de décodage Base64:', e);
    return null;
  }
}

/**
 * Simple XOR cipher pour obfuscation (PAS SÉCURISÉ - juste obfuscation)
 * Ne JAMAIS utiliser pour des données sensibles !
 */
export function simpleXorCipher(str, key = 'ULMA_LIBRARY_KEY') {
  if (typeof str !== 'string') return null;
  
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(
      str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  
  return encodeBase64(result);
}

/**
 * Déchiffre un texte XOR
 */
export function simpleXorDecipher(encodedStr, key = 'ULMA_LIBRARY_KEY') {
  if (!encodedStr) return null;
  
  const decoded = decodeBase64(encodedStr);
  if (!decoded) return null;
  
  let result = '';
  for (let i = 0; i < decoded.length; i++) {
    result += String.fromCharCode(
      decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  
  return result;
}

/**
 * Hash simple pour vérifier l'intégrité (NON cryptographique)
 * Utile pour détecter des modifications accidentelles
 */
export function simpleHash(str) {
  if (typeof str !== 'string') {
    str = JSON.stringify(str);
  }
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertit en 32-bit integer
  }
  
  return hash.toString(36);
}

/**
 * Génère un identifiant unique (UUID v4 simplifié)
 */
export function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Génère un token aléatoire sécurisé
 * Utilise crypto.getRandomValues si disponible
 */
export function generateSecureToken(length = 32) {
  const array = new Uint8Array(length);
  
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback moins sécurisé
    for (let i = 0; i < length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Stockage sécurisé dans localStorage avec obfuscation
 */
export const secureStorage = {
  set(key, value) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      const encrypted = simpleXorCipher(stringValue);
      localStorage.setItem(key, encrypted);
      return true;
    } catch (e) {
      console.error('Erreur de stockage:', e);
      return false;
    }
  },
  
  get(key) {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      
      const decrypted = simpleXorDecipher(encrypted);
      if (!decrypted) return null;
      
      try {
        return JSON.parse(decrypted);
      } catch {
        return decrypted;
      }
    } catch (e) {
      console.error('Erreur de lecture:', e);
      return null;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Erreur de suppression:', e);
      return false;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Erreur de nettoyage:', e);
      return false;
    }
  }
};

/**
 * Masque une partie d'une chaîne (pour affichage)
 * Ex: "john.doe@email.com" → "j***@email.com"
 */
export function maskString(str, visibleStart = 1, visibleEnd = 0, maskChar = '*') {
  if (!str || typeof str !== 'string' || str.length <= visibleStart + visibleEnd) {
    return str;
  }
  
  const start = str.slice(0, visibleStart);
  const end = visibleEnd > 0 ? str.slice(-visibleEnd) : '';
  const middleLength = str.length - visibleStart - visibleEnd;
  const middle = maskChar.repeat(Math.min(middleLength, 10)); // Max 10 étoiles
  
  return start + middle + end;
}

/**
 * Masque un email
 * Ex: "john.doe@example.com" → "j***@example.com"
 */
export function maskEmail(email) {
  if (!email || typeof email !== 'string') return email;
  
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  
  const maskedLocal = local.length > 1 
    ? local[0] + '***' 
    : local;
  
  return `${maskedLocal}@${domain}`;
}

/**
 * Masque un numéro de téléphone
 * Ex: "+33123456789" → "+33******789"
 */
export function maskPhone(phone) {
  if (!phone || typeof phone !== 'string') return phone;
  
  if (phone.length <= 6) return phone;
  
  return phone.slice(0, 3) + '******' + phone.slice(-3);
}

/**
 * Exemple d'utilisation
 * 
 * import { secureStorage, maskEmail, generateSecureToken } from './utils/encryption';
 * 
 * // Stocker un token de manière obfusquée
 * const token = generateSecureToken();
 * secureStorage.set('authToken', token);
 * 
 * // Récupérer le token
 * const savedToken = secureStorage.get('authToken');
 * 
 * // Masquer un email pour l'affichage
 * const displayEmail = maskEmail('user@ulma.edu'); // "u***@ulma.edu"
 */

/**
 * IMPORTANT : Rappel de sécurité
 * 
 * ❌ Ne JAMAIS stocker en clair dans localStorage :
 *    - Mots de passe
 *    - Numéros de carte bancaire
 *    - Données personnelles sensibles
 * 
 * ✅ Acceptable pour localStorage (avec obfuscation) :
 *    - Tokens d'authentification (JWT)
 *    - Préférences utilisateur
 *    - IDs de session
 *    - Données de cache temporaire
 * 
 * ✅ Pour les vraies données sensibles :
 *    - Utiliser des cookies httpOnly (côté serveur)
 *    - Encryption AES-256 côté backend
 *    - HTTPS obligatoire en production
 */

