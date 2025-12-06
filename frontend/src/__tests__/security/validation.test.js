import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateBookTitle,
  validateAuthorName,
  validatePhone,
  validateBirthDate,
  validateId,
  validateUrl,
  validateForm,
} from '../../utils/validation';

describe('Validation Utils - validateEmail', () => {
  it('accepte les emails valides', () => {
    expect(validateEmail('test@example.com').valid).toBe(true);
    expect(validateEmail('user.name@domain.co.uk').valid).toBe(true);
  });

  it('rejette les emails sans @', () => {
    const result = validateEmail('invalidemail.com');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('invalide');
  });

  it('rejette les emails vides', () => {
    const result = validateEmail('');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('requis');
  });

  it('rejette les emails trop longs', () => {
    const longEmail = 'a'.repeat(250) + '@test.com';
    const result = validateEmail(longEmail);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('trop long');
  });
});

describe('Validation Utils - validatePassword', () => {
  it('accepte les mots de passe valides', () => {
    expect(validatePassword('Password123').valid).toBe(true);
    expect(validatePassword('MyP@ssw0rd!').valid).toBe(true);
  });

  it('rejette les mots de passe trop courts', () => {
    const result = validatePassword('Pass1');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('8 caractères');
  });

  it('rejette les mots de passe sans majuscule', () => {
    const result = validatePassword('password123');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('majuscule');
  });

  it('rejette les mots de passe sans minuscule', () => {
    const result = validatePassword('PASSWORD123');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('minuscule');
  });

  it('rejette les mots de passe sans chiffre', () => {
    const result = validatePassword('PasswordOnly');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('chiffre');
  });

  it('rejette les mots de passe trop longs', () => {
    const longPassword = 'A1' + 'a'.repeat(130);
    const result = validatePassword(longPassword);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('128');
  });
});

describe('Validation Utils - validateUsername', () => {
  it('accepte les usernames valides', () => {
    expect(validateUsername('user123').valid).toBe(true);
    expect(validateUsername('john_doe').valid).toBe(true);
    expect(validateUsername('test-user').valid).toBe(true);
  });

  it('rejette les usernames trop courts', () => {
    const result = validateUsername('ab');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('3 caractères');
  });

  it('rejette les usernames avec caractères spéciaux', () => {
    const result = validateUsername('user@name!');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('lettres');
  });

  it('rejette les usernames avec espaces', () => {
    const result = validateUsername('user name');
    expect(result.valid).toBe(false);
  });
});

describe('Validation Utils - validateBookTitle', () => {
  it('accepte les titres valides', () => {
    expect(validateBookTitle('Le Petit Prince').valid).toBe(true);
    expect(validateBookTitle('1984').valid).toBe(true);
  });

  it('rejette les titres vides', () => {
    const result = validateBookTitle('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('vide');
  });

  it('rejette les titres trop longs', () => {
    const longTitle = 'a'.repeat(201);
    const result = validateBookTitle(longTitle);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('200');
  });
});

describe('Validation Utils - validateAuthorName', () => {
  it('accepte les noms d\'auteur valides', () => {
    expect(validateAuthorName('Antoine de Saint-Exupéry').valid).toBe(true);
    expect(validateAuthorName('George Orwell').valid).toBe(true);
  });

  it('rejette les noms trop courts', () => {
    const result = validateAuthorName('A');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('2 caractères');
  });

  it('rejette les noms trop longs', () => {
    const longName = 'a'.repeat(101);
    const result = validateAuthorName(longName);
    expect(result.valid).toBe(false);
  });
});

describe('Validation Utils - validatePhone', () => {
  it('accepte les formats de téléphone valides', () => {
    expect(validatePhone('+33123456789').valid).toBe(true);
    expect(validatePhone('0123456789').valid).toBe(true);
    expect(validatePhone('+1 (234) 567-8900').valid).toBe(true);
  });

  it('rejette les numéros trop courts', () => {
    const result = validatePhone('123');
    expect(result.valid).toBe(false);
  });

  it('rejette les numéros avec lettres', () => {
    const result = validatePhone('01234abc');
    expect(result.valid).toBe(false);
  });
});

describe('Validation Utils - validateBirthDate', () => {
  it('accepte les dates valides (18+)', () => {
    const date25YearsAgo = new Date();
    date25YearsAgo.setFullYear(date25YearsAgo.getFullYear() - 25);
    
    const result = validateBirthDate(date25YearsAgo.toISOString().split('T')[0]);
    expect(result.valid).toBe(true);
  });

  it('rejette les dates pour mineurs', () => {
    const date15YearsAgo = new Date();
    date15YearsAgo.setFullYear(date15YearsAgo.getFullYear() - 15);
    
    const result = validateBirthDate(date15YearsAgo.toISOString().split('T')[0]);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('18 ans');
  });

  it('rejette les dates invalides', () => {
    const result = validateBirthDate('invalid-date');
    expect(result.valid).toBe(false);
  });

  it('rejette les dates trop anciennes', () => {
    const result = validateBirthDate('1800-01-01');
    expect(result.valid).toBe(false);
  });
});

describe('Validation Utils - validateId', () => {
  it('accepte les IDs valides', () => {
    expect(validateId(1).valid).toBe(true);
    expect(validateId(999).valid).toBe(true);
    expect(validateId('42').valid).toBe(true);
  });

  it('rejette les IDs négatifs', () => {
    const result = validateId(-1);
    expect(result.valid).toBe(false);
  });

  it('rejette les IDs à zéro', () => {
    const result = validateId(0);
    expect(result.valid).toBe(false);
  });

  it('rejette les IDs décimaux', () => {
    const result = validateId(1.5);
    expect(result.valid).toBe(false);
  });
});

describe('Validation Utils - validateUrl', () => {
  it('accepte les URLs HTTP/HTTPS valides', () => {
    expect(validateUrl('http://example.com').valid).toBe(true);
    expect(validateUrl('https://example.com').valid).toBe(true);
  });

  it('rejette les URLs sans protocole', () => {
    const result = validateUrl('example.com');
    expect(result.valid).toBe(false);
  });

  it('rejette les protocoles non HTTP', () => {
    const result = validateUrl('ftp://example.com');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('HTTP');
  });
});

describe('Validation Utils - validateForm', () => {
  it('valide un formulaire complet avec succès', () => {
    const fields = {
      email: 'test@example.com',
      password: 'Password123',
    };
    
    const rules = {
      email: validateEmail,
      password: validatePassword,
    };
    
    const result = validateForm(fields, rules);
    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('retourne les erreurs pour chaque champ invalide', () => {
    const fields = {
      email: 'invalid-email',
      password: 'weak',
    };
    
    const rules = {
      email: validateEmail,
      password: validatePassword,
    };
    
    const result = validateForm(fields, rules);
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.password).toBeDefined();
  });

  it('ignore les champs sans règle de validation', () => {
    const fields = {
      email: 'test@example.com',
      extra: 'value',
    };
    
    const rules = {
      email: validateEmail,
    };
    
    const result = validateForm(fields, rules);
    expect(result.valid).toBe(true);
  });
});

