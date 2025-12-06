import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  encodeBase64,
  decodeBase64,
  simpleXorCipher,
  simpleXorDecipher,
  simpleHash,
  generateId,
  generateSecureToken,
  secureStorage,
  maskString,
  maskEmail,
  maskPhone,
} from '../../utils/encryption';

describe('Encryption Utils - Base64', () => {
  it('encode et décode correctement', () => {
    const original = 'Hello World';
    const encoded = encodeBase64(original);
    const decoded = decodeBase64(encoded);
    
    expect(decoded).toBe(original);
  });

  it('gère les caractères spéciaux', () => {
    const original = 'Héllo Wörld! 你好';
    const encoded = encodeBase64(original);
    const decoded = decodeBase64(encoded);
    
    expect(decoded).toBe(original);
  });

  it('encode les objets JSON', () => {
    const original = { name: 'test', value: 123 };
    const encoded = encodeBase64(original);
    const decoded = decodeBase64(encoded);
    
    expect(JSON.parse(decoded)).toEqual(original);
  });
});

describe('Encryption Utils - XOR Cipher', () => {
  it('chiffre et déchiffre correctement', () => {
    const original = 'Secret Message';
    const encrypted = simpleXorCipher(original);
    const decrypted = simpleXorDecipher(encrypted);
    
    expect(decrypted).toBe(original);
    expect(encrypted).not.toBe(original);
  });

  it('produit un résultat différent de l\'original', () => {
    const original = 'Test';
    const encrypted = simpleXorCipher(original);
    
    expect(encrypted).not.toBe(original);
  });

  it('gère les chaînes vides', () => {
    const encrypted = simpleXorCipher('');
    expect(encrypted).toBeDefined();
  });
});

describe('Encryption Utils - Hash', () => {
  it('génère un hash cohérent pour la même entrée', () => {
    const input = 'test string';
    const hash1 = simpleHash(input);
    const hash2 = simpleHash(input);
    
    expect(hash1).toBe(hash2);
  });

  it('génère des hash différents pour des entrées différentes', () => {
    const hash1 = simpleHash('string1');
    const hash2 = simpleHash('string2');
    
    expect(hash1).not.toBe(hash2);
  });

  it('gère les objets', () => {
    const obj = { key: 'value' };
    const hash = simpleHash(obj);
    
    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
  });
});

describe('Encryption Utils - generateId', () => {
  it('génère un ID au format UUID', () => {
    const id = generateId();
    
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('génère des IDs uniques', () => {
    const id1 = generateId();
    const id2 = generateId();
    
    expect(id1).not.toBe(id2);
  });
});

describe('Encryption Utils - generateSecureToken', () => {
  it('génère un token de la bonne longueur', () => {
    const token = generateSecureToken(32);
    
    expect(token.length).toBe(64); // 32 bytes = 64 caractères hex
  });

  it('génère des tokens différents', () => {
    const token1 = generateSecureToken();
    const token2 = generateSecureToken();
    
    expect(token1).not.toBe(token2);
  });

  it('utilise uniquement des caractères hexadécimaux', () => {
    const token = generateSecureToken();
    
    expect(token).toMatch(/^[0-9a-f]+$/);
  });
});

describe('Encryption Utils - secureStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('stocke et récupère des chaînes', () => {
    const key = 'testKey';
    const value = 'testValue';
    
    secureStorage.set(key, value);
    const retrieved = secureStorage.get(key);
    
    expect(retrieved).toBe(value);
  });

  it('stocke et récupère des objets', () => {
    const key = 'testObj';
    const value = { name: 'test', count: 42 };
    
    secureStorage.set(key, value);
    const retrieved = secureStorage.get(key);
    
    expect(retrieved).toEqual(value);
  });

  it('retourne null pour une clé inexistante', () => {
    const result = secureStorage.get('nonexistent');
    
    expect(result).toBeNull();
  });

  it('supprime une clé', () => {
    const key = 'testKey';
    secureStorage.set(key, 'value');
    secureStorage.remove(key);
    
    expect(secureStorage.get(key)).toBeNull();
  });

  it('nettoie tout le storage', () => {
    secureStorage.set('key1', 'value1');
    secureStorage.set('key2', 'value2');
    secureStorage.clear();
    
    expect(secureStorage.get('key1')).toBeNull();
    expect(secureStorage.get('key2')).toBeNull();
  });

  it('obfusque les données dans localStorage', () => {
    const key = 'secretKey';
    const value = 'secretValue';
    
    secureStorage.set(key, value);
    const rawValue = localStorage.getItem(key);
    
    // La valeur stockée ne doit PAS être en clair
    expect(rawValue).not.toBe(value);
  });
});

describe('Encryption Utils - maskString', () => {
  it('masque correctement une chaîne', () => {
    const result = maskString('password', 1, 0);
    
    expect(result).toBe('p**********');
    expect(result[0]).toBe('p');
  });

  it('respecte les paramètres visibleStart et visibleEnd', () => {
    const result = maskString('password', 2, 2);
    
    expect(result).toMatch(/^pa\*+rd$/);
  });

  it('limite le nombre d\'étoiles à 10', () => {
    const longString = 'a'.repeat(100);
    const result = maskString(longString, 1, 0);
    
    const stars = result.match(/\*/g);
    expect(stars.length).toBe(10);
  });
});

describe('Encryption Utils - maskEmail', () => {
  it('masque la partie locale de l\'email', () => {
    const result = maskEmail('john.doe@example.com');
    
    expect(result).toBe('j***@example.com');
  });

  it('garde le domaine intact', () => {
    const result = maskEmail('user@domain.com');
    
    expect(result).toContain('@domain.com');
  });

  it('gère les emails courts', () => {
    const result = maskEmail('a@b.com');
    
    expect(result).toBe('a***@b.com');
  });
});

describe('Encryption Utils - maskPhone', () => {
  it('masque le milieu du numéro', () => {
    const result = maskPhone('+33123456789');
    
    expect(result).toBe('+33******789');
  });

  it('garde le début et la fin', () => {
    const result = maskPhone('0123456789');
    
    expect(result).toMatch(/^012\*{6}789$/);
  });

  it('gère les numéros courts', () => {
    const result = maskPhone('12345');
    
    expect(result).toBe('12345');
  });
});

