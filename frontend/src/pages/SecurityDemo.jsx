import React, { useState } from 'react';
import { useThemeColors } from '../utils/themeUtils';
import { 
  escapeHtml, 
  sanitizeUsername, 
  sanitizeEmail,
  maskEmail,
  maskPhone,
} from '../utils/sanitization';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/validation';
import {
  encodeBase64,
  decodeBase64,
  simpleXorCipher,
  simpleXorDecipher,
  generateSecureToken,
  secureStorage,
} from '../utils/encryption';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';

/**
 * Page de démonstration des fonctionnalités de sécurité
 * 
 * Cette page permet de tester toutes les fonctions de sécurité sans avoir besoin
 * d'un système de login complet.
 */
function SecurityDemo() {
  const colors = useThemeColors();
  
  // États pour les différentes sections
  const [xssTest, setXssTest] = useState('');
  const [sanitizedXss, setSanitizedXss] = useState('');
  
  const [validationTest, setValidationTest] = useState({ email: '', password: '', username: '' });
  const [validationResults, setValidationResults] = useState({});
  
  const [encryptTest, setEncryptTest] = useState('');
  const [encryptResult, setEncryptResult] = useState('');
  
  const [maskTest, setMaskTest] = useState({ email: '', phone: '' });
  const [maskResults, setMaskResults] = useState({});
  
  const [storageKey, setStorageKey] = useState('testKey');
  const [storageValue, setStorageValue] = useState('');
  const [storageResult, setStorageResult] = useState('');

  /**
   * Test de protection XSS
   */
  const handleXssTest = () => {
    const sanitized = escapeHtml(xssTest);
    setSanitizedXss(sanitized);
  };

  /**
   * Test de validation
   */
  const handleValidationTest = () => {
    const results = {
      email: validateEmail(validationTest.email),
      password: validatePassword(validationTest.password),
      username: validateUsername(validationTest.username),
    };
    setValidationResults(results);
  };

  /**
   * Test d'encryption
   */
  const handleEncrypt = () => {
    const encrypted = simpleXorCipher(encryptTest);
    setEncryptResult(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = simpleXorDecipher(encryptResult);
    setEncryptResult(decrypted);
  };

  /**
   * Test de masquage
   */
  const handleMask = () => {
    setMaskResults({
      email: maskEmail(maskTest.email),
      phone: maskPhone(maskTest.phone),
    });
  };

  /**
   * Test de stockage sécurisé
   */
  const handleStorageSave = () => {
    secureStorage.set(storageKey, storageValue);
    setStorageResult(`Sauvegardé avec succès (obfusqué)`);
  };

  const handleStorageLoad = () => {
    const value = secureStorage.get(storageKey);
    setStorageResult(value ? `Valeur: ${JSON.stringify(value)}` : 'Aucune valeur trouvée');
  };

  const handleStorageClear = () => {
    secureStorage.remove(storageKey);
    setStorageResult('Clé supprimée');
  };

  return (
    <div 
      className="py-12 px-6 min-h-screen"
      style={{ background: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-bold font-serif mb-4"
            style={{ color: colors.primary }}
          >
            🔒 Démonstration Sécurité
          </h1>
          <p style={{ color: colors.text, fontSize: '1.2rem' }}>
            Testez les fonctionnalités de sécurité de ULMA Library
          </p>
        </div>

        {/* Section 1: Protection XSS */}
        <Card 
          sx={{ 
            mb: 4, 
            p: 3,
            background: colors.surface,
            border: `1px solid ${colors.accent}33`,
          }}
        >
          <CardContent>
            <h2 
              className="text-3xl font-bold mb-4 font-serif"
              style={{ color: colors.primary }}
            >
              1. Protection XSS (Cross-Site Scripting)
            </h2>
            <p style={{ color: colors.text, marginBottom: 16 }}>
              Essaie d'injecter du code HTML/JavaScript malveillant. Il sera échappé automatiquement.
            </p>
            
            <TextField
              fullWidth
              label="Essaie d'entrer du HTML/JS malveillant"
              placeholder='<script>alert("XSS")</script>'
              value={xssTest}
              onChange={(e) => setXssTest(e.target.value)}
              margin="normal"
            />
            
            <Button 
              variant="contained" 
              onClick={handleXssTest}
              sx={{ 
                mt: 2,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              }}
            >
              Tester la protection XSS
            </Button>
            
            {sanitizedXss && (
              <Alert severity="success" sx={{ mt: 3 }}>
                <strong>Résultat sécurisé:</strong><br/>
                {sanitizedXss}
                <br/><br/>
                <strong>Rendu HTML:</strong><br/>
                <div dangerouslySetInnerHTML={{ __html: sanitizedXss }} />
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Validation */}
        <Card 
          sx={{ 
            mb: 4, 
            p: 3,
            background: colors.surface,
            border: `1px solid ${colors.accent}33`,
          }}
        >
          <CardContent>
            <h2 
              className="text-3xl font-bold mb-4 font-serif"
              style={{ color: colors.primary }}
            >
              2. Validation des données
            </h2>
            <p style={{ color: colors.text, marginBottom: 16 }}>
              Teste les règles de validation pour email, mot de passe et username.
            </p>
            
            <TextField
              fullWidth
              label="Email"
              value={validationTest.email}
              onChange={(e) => setValidationTest(prev => ({ ...prev, email: e.target.value }))}
              margin="normal"
              error={validationResults.email && !validationResults.email.valid}
              helperText={validationResults.email?.error}
            />
            
            <TextField
              fullWidth
              label="Mot de passe (min 8 chars, 1 maj, 1 min, 1 chiffre)"
              type="password"
              value={validationTest.password}
              onChange={(e) => setValidationTest(prev => ({ ...prev, password: e.target.value }))}
              margin="normal"
              error={validationResults.password && !validationResults.password.valid}
              helperText={validationResults.password?.error}
            />
            
            <TextField
              fullWidth
              label="Username (min 3 chars, alphanumerique + _ -)"
              value={validationTest.username}
              onChange={(e) => setValidationTest(prev => ({ ...prev, username: e.target.value }))}
              margin="normal"
              error={validationResults.username && !validationResults.username.valid}
              helperText={validationResults.username?.error}
            />
            
            <Button 
              variant="contained" 
              onClick={handleValidationTest}
              sx={{ 
                mt: 2,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              }}
            >
              Valider
            </Button>
            
            {Object.keys(validationResults).length > 0 && (
              <div style={{ marginTop: 16 }}>
                {Object.entries(validationResults).map(([key, result]) => (
                  <Chip
                    key={key}
                    label={`${key}: ${result.valid ? '✅ Valide' : '❌ Invalide'}`}
                    color={result.valid ? 'success' : 'error'}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 3: Encryption */}
        <Card 
          sx={{ 
            mb: 4, 
            p: 3,
            background: colors.surface,
            border: `1px solid ${colors.accent}33`,
          }}
        >
          <CardContent>
            <h2 
              className="text-3xl font-bold mb-4 font-serif"
              style={{ color: colors.primary }}
            >
              3. Encryption / Obfuscation
            </h2>
            <p style={{ color: colors.text, marginBottom: 16 }}>
              Teste l'encryption XOR (obfuscation basique). Note: ne PAS utiliser en production pour des données sensibles!
            </p>
            
            <TextField
              fullWidth
              label="Texte à chiffrer"
              value={encryptTest}
              onChange={(e) => setEncryptTest(e.target.value)}
              margin="normal"
            />
            
            <div style={{ marginTop: 16 }}>
              <Button 
                variant="contained" 
                onClick={handleEncrypt}
                sx={{ 
                  mr: 2,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                }}
              >
                Chiffrer
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleDecrypt}
                disabled={!encryptResult}
              >
                Déchiffrer
              </Button>
            </div>
            
            {encryptResult && (
              <Alert severity="info" sx={{ mt: 3 }}>
                <strong>Résultat:</strong><br/>
                {encryptResult}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Section 4: Masquage */}
        <Card 
          sx={{ 
            mb: 4, 
            p: 3,
            background: colors.surface,
            border: `1px solid ${colors.accent}33`,
          }}
        >
          <CardContent>
            <h2 
              className="text-3xl font-bold mb-4 font-serif"
              style={{ color: colors.primary }}
            >
              4. Masquage des données sensibles
            </h2>
            <p style={{ color: colors.text, marginBottom: 16 }}>
              Masque les emails et téléphones pour l'affichage public.
            </p>
            
            <TextField
              fullWidth
              label="Email"
              placeholder="john.doe@example.com"
              value={maskTest.email}
              onChange={(e) => setMaskTest(prev => ({ ...prev, email: e.target.value }))}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Téléphone"
              placeholder="+33123456789"
              value={maskTest.phone}
              onChange={(e) => setMaskTest(prev => ({ ...prev, phone: e.target.value }))}
              margin="normal"
            />
            
            <Button 
              variant="contained" 
              onClick={handleMask}
              sx={{ 
                mt: 2,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              }}
            >
              Masquer
            </Button>
            
            {(maskResults.email || maskResults.phone) && (
              <Alert severity="info" sx={{ mt: 3 }}>
                {maskResults.email && <div><strong>Email masqué:</strong> {maskResults.email}</div>}
                {maskResults.phone && <div><strong>Téléphone masqué:</strong> {maskResults.phone}</div>}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Section 5: Stockage sécurisé */}
        <Card 
          sx={{ 
            mb: 4, 
            p: 3,
            background: colors.surface,
            border: `1px solid ${colors.accent}33`,
          }}
        >
          <CardContent>
            <h2 
              className="text-3xl font-bold mb-4 font-serif"
              style={{ color: colors.primary }}
            >
              5. Stockage sécurisé (localStorage obfusqué)
            </h2>
            <p style={{ color: colors.text, marginBottom: 16 }}>
              Les données sont obfusquées avant d'être stockées dans localStorage.
            </p>
            
            <TextField
              fullWidth
              label="Clé"
              value={storageKey}
              onChange={(e) => setStorageKey(e.target.value)}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Valeur"
              value={storageValue}
              onChange={(e) => setStorageValue(e.target.value)}
              margin="normal"
            />
            
            <div style={{ marginTop: 16 }}>
              <Button 
                variant="contained" 
                onClick={handleStorageSave}
                sx={{ 
                  mr: 2,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                }}
              >
                Sauvegarder
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleStorageLoad}
                sx={{ mr: 2 }}
              >
                Charger
              </Button>
              <Button 
                variant="outlined" 
                color="error"
                onClick={handleStorageClear}
              >
                Supprimer
              </Button>
            </div>
            
            {storageResult && (
              <Alert severity="info" sx={{ mt: 3 }}>
                {storageResult}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div 
          className="text-center mt-8 p-4 rounded-lg"
          style={{
            background: colors.surface,
            border: `1px solid ${colors.accent}33`,
          }}
        >
          <p style={{ color: colors.text }}>
            🔒 Ces fonctionnalités protègent ULMA Library contre les vulnérabilités courantes
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecurityDemo;

