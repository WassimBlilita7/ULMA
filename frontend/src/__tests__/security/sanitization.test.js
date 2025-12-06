import { describe, it, expect } from 'vitest';
import {
  escapeHtml,
  stripHtml,
  sanitizeUsername,
  sanitizeEmail,
  sanitizeBookTitle,
  sanitizePhone,
  sanitizeUrl,
  truncateText,
} from '../../utils/sanitization';

describe('Sanitization Utils - escapeHtml', () => {
  it('échappe les caractères HTML dangereux', () => {
    const input = '<script>alert("XSS")</script>';
    const result = escapeHtml(input);
    
    expect(result).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
    expect(result).not.toContain('<script>');
  });

  it('échappe les guillemets simples et doubles', () => {
    const input = `"Hello" and 'World'`;
    const result = escapeHtml(input);
    
    expect(result).toContain('&quot;');
    expect(result).toContain('&#x27;');
  });

  it('échappe les esperluettes', () => {
    const input = 'Tom & Jerry';
    const result = escapeHtml(input);
    
    expect(result).toBe('Tom &amp; Jerry');
  });

  it('retourne la valeur si ce n\'est pas une string', () => {
    expect(escapeHtml(123)).toBe(123);
    expect(escapeHtml(null)).toBe(null);
  });
});

describe('Sanitization Utils - stripHtml', () => {
  it('supprime toutes les balises HTML', () => {
    const input = '<div>Hello <strong>World</strong>!</div>';
    const result = stripHtml(input);
    
    expect(result).toBe('Hello World!');
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });

  it('supprime les balises auto-fermantes', () => {
    const input = 'Text<br/>More<img src="x"/>End';
    const result = stripHtml(input);
    
    expect(result).toBe('TextMoreEnd');
  });

  it('gère les balises imbriquées', () => {
    const input = '<div><p>Nested <span>content</span></p></div>';
    const result = stripHtml(input);
    
    expect(result).toBe('Nested content');
  });
});

describe('Sanitization Utils - sanitizeUsername', () => {
  it('garde uniquement les caractères alphanumériques, _ et -', () => {
    const input = 'user@name#123';
    const result = sanitizeUsername(input);
    
    expect(result).toBe('username123');
  });

  it('supprime les espaces', () => {
    const input = '  user name  ';
    const result = sanitizeUsername(input);
    
    expect(result).toBe('username');
  });

  it('limite à 50 caractères', () => {
    const input = 'a'.repeat(100);
    const result = sanitizeUsername(input);
    
    expect(result.length).toBe(50);
  });

  it('retourne une chaîne vide si l\'input n\'est pas une string', () => {
    expect(sanitizeUsername(123)).toBe('');
    expect(sanitizeUsername(null)).toBe('');
  });
});

describe('Sanitization Utils - sanitizeEmail', () => {
  it('supprime les caractères dangereux', () => {
    const input = '<script>test@email.com';
    const result = sanitizeEmail(input);
    
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });

  it('convertit en minuscules', () => {
    const input = 'TEST@EMAIL.COM';
    const result = sanitizeEmail(input);
    
    expect(result).toBe('test@email.com');
  });

  it('supprime les espaces', () => {
    const input = '  test@email.com  ';
    const result = sanitizeEmail(input);
    
    expect(result).toBe('test@email.com');
  });
});

describe('Sanitization Utils - sanitizeBookTitle', () => {
  it('échappe les caractères HTML mais garde les accents', () => {
    const input = 'L\'Étranger <script>alert("xss")</script>';
    const result = sanitizeBookTitle(input);
    
    expect(result).toContain('L&#x27;Étranger');
    expect(result).not.toContain('<script>');
  });

  it('limite à 200 caractères', () => {
    const input = 'a'.repeat(300);
    const result = sanitizeBookTitle(input);
    
    expect(result.length).toBeLessThanOrEqual(200);
  });

  it('supprime les espaces en début et fin', () => {
    const input = '  Le Petit Prince  ';
    const result = sanitizeBookTitle(input);
    
    expect(result).toBe('Le Petit Prince');
  });
});

describe('Sanitization Utils - sanitizePhone', () => {
  it('garde uniquement les chiffres et caractères téléphone', () => {
    const input = '+33 (0)1-23-45-67-89 abc';
    const result = sanitizePhone(input);
    
    expect(result).toBe('+33 (0)1-23-45-67-89');
    expect(result).not.toContain('abc');
  });

  it('supprime les lettres', () => {
    const input = '0123abc456def';
    const result = sanitizePhone(input);
    
    expect(result).toBe('0123456');
  });
});

describe('Sanitization Utils - sanitizeUrl', () => {
  it('accepte les URLs HTTP et HTTPS valides', () => {
    expect(sanitizeUrl('http://example.com')).toBe('http://example.com/');
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
  });

  it('rejette les URLs sans protocole', () => {
    const input = 'example.com';
    const result = sanitizeUrl(input);
    
    expect(result).toBe('');
  });

  it('rejette les protocoles dangereux', () => {
    expect(sanitizeUrl('javascript:alert("XSS")')).toBe('');
    expect(sanitizeUrl('data:text/html,<script>alert("XSS")</script>')).toBe('');
  });

  it('gère les URLs malformées', () => {
    expect(sanitizeUrl('http://')).toBe('');
    expect(sanitizeUrl('not a url')).toBe('');
  });
});

describe('Sanitization Utils - truncateText', () => {
  it('tronque le texte à la longueur spécifiée', () => {
    const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    const result = truncateText(input, 20);
    
    expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
    expect(result).toContain('...');
  });

  it('ne tronque pas si le texte est plus court', () => {
    const input = 'Court texte';
    const result = truncateText(input, 100);
    
    expect(result).toBe(input);
    expect(result).not.toContain('...');
  });

  it('coupe au dernier espace pour ne pas couper un mot', () => {
    const input = 'Hello World Test';
    const result = truncateText(input, 12);
    
    expect(result).toBe('Hello World...');
    expect(result).not.toBe('Hello World ...');
  });
});

