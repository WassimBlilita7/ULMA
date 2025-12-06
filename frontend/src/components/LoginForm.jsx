import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validation';
import { sanitizeEmail } from '../utils/sanitization';
import { secureStorage } from '../utils/encryption';
import { useThemeColors } from '../utils/themeUtils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';

/**
 * Formulaire de connexion sécurisé
 * 
 * Fonctionnalités de sécurité :
 * - Validation côté client
 * - Sanitization des inputs
 * - Gestion sécurisée des tokens
 * - Protection contre les attaques par force brute (rate limiting)
 * - Masquage du mot de passe
 */
function LoginForm({ onLoginSuccess }) {
  const colors = useThemeColors();
  
  // État du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // État des erreurs
  const [errors, setErrors] = useState({});
  
  // État du chargement
  const [isLoading, setIsLoading] = useState(false);
  
  // État du message général
  const [message, setMessage] = useState(null);
  
  // État de visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  
  // Compteur de tentatives (protection anti-bruteforce basique)
  const [attemptCount, setAttemptCount] = useState(0);
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes

  /**
   * Gère les changements dans les champs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Efface l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Valide le formulaire avant soumission
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Valide l'email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error;
    }
    
    // Valide le mot de passe
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.error;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Vérifie si l'utilisateur est bloqué (trop de tentatives)
   */
  const isLockedOut = () => {
    const lockoutData = secureStorage.get('loginLockout');
    
    if (!lockoutData) return false;
    
    const { lockedUntil } = lockoutData;
    const now = Date.now();
    
    if (now < lockedUntil) {
      const remainingMinutes = Math.ceil((lockedUntil - now) / 60000);
      setMessage({
        type: 'error',
        text: `Trop de tentatives. Réessayez dans ${remainingMinutes} minute(s).`
      });
      return true;
    }
    
    // Le lockout a expiré
    secureStorage.remove('loginLockout');
    setAttemptCount(0);
    return false;
  };

  /**
   * Gère le lockout après trop de tentatives
   */
  const handleLockout = () => {
    const lockedUntil = Date.now() + LOCKOUT_TIME;
    secureStorage.set('loginLockout', { lockedUntil });
    
    setMessage({
      type: 'error',
      text: 'Trop de tentatives échouées. Compte bloqué pour 5 minutes.'
    });
  };

  /**
   * Gère la soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifie le lockout
    if (isLockedOut()) {
      return;
    }
    
    // Valide le formulaire
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Sanitize l'email avant envoi
      const sanitizedEmail = sanitizeEmail(formData.email);
      
      // Appel API (à remplacer par votre vraie API)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: sanitizedEmail,
          password: formData.password, // Le backend hashera le mot de passe
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.token) {
        // Connexion réussie
        
        // Stocke le token de manière sécurisée (obfusqué)
        secureStorage.set('authToken', data.token);
        
        // Stocke les infos utilisateur (sans données sensibles)
        secureStorage.set('user', {
          id: data.user.id,
          email: sanitizedEmail,
          role: data.user.role,
        });
        
        // Réinitialise le compteur de tentatives
        setAttemptCount(0);
        secureStorage.remove('loginLockout');
        
        // Callback de succès
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
        
        setMessage({
          type: 'success',
          text: 'Connexion réussie !'
        });
        
        // Efface le mot de passe du state
        setFormData(prev => ({ ...prev, password: '' }));
        
      } else {
        // Connexion échouée
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);
        
        if (newAttemptCount >= MAX_ATTEMPTS) {
          handleLockout();
        } else {
          setMessage({
            type: 'error',
            text: data.error || 'Email ou mot de passe incorrect'
          });
        }
      }
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setMessage({
        type: 'error',
        text: 'Erreur de connexion. Vérifiez votre connexion internet.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen py-12 px-4"
      style={{ background: colors.background }}
    >
      <div 
        className="w-full max-w-md p-8 rounded-3xl shadow-2xl"
        style={{ 
          background: colors.surface,
          border: `1px solid ${colors.accent}33`
        }}
      >
        {/* En-tête */}
        <div className="text-center mb-8">
          <LockIcon 
            sx={{ 
              fontSize: 48, 
              color: colors.primary,
              mb: 2 
            }} 
          />
          <h2 
            className="text-3xl font-bold font-serif mb-2"
            style={{ color: colors.primary }}
          >
            Connexion
          </h2>
          <p style={{ color: colors.text, opacity: 0.7 }}>
            Accédez à votre compte ULMA Library
          </p>
        </div>

        {/* Message de statut */}
        {message && (
          <Alert 
            severity={message.type} 
            sx={{ mb: 3 }}
            onClose={() => setMessage(null)}
          >
            {message.text}
          </Alert>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
            margin="normal"
            autoComplete="email"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.accent + '33',
                },
              },
            }}
          />

          {/* Mot de passe */}
          <TextField
            fullWidth
            label="Mot de passe"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            disabled={isLoading}
            margin="normal"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.accent + '33',
                },
              },
            }}
          />

          {/* Bouton de connexion */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 3,
              py: 1.5,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              color: colors.surface,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
              },
            }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Button>

          {/* Lien mot de passe oublié */}
          <div className="text-center mt-4">
            <a
              href="/forgot-password"
              style={{
                color: colors.secondary,
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Mot de passe oublié ?
            </a>
          </div>
        </form>

        {/* Info de sécurité */}
        <div 
          className="mt-6 p-3 rounded-lg text-sm"
          style={{
            background: colors.accent + '15',
            color: colors.text,
          }}
        >
          🔒 Connexion sécurisée - Vos données sont protégées
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

/**
 * Exemple d'utilisation dans App.jsx :
 * 
 * import LoginForm from './components/LoginForm';
 * 
 * function App() {
 *   const [isAuthenticated, setIsAuthenticated] = useState(false);
 * 
 *   const handleLoginSuccess = (user) => {
 *     console.log('User logged in:', user);
 *     setIsAuthenticated(true);
 *   };
 * 
 *   if (!isAuthenticated) {
 *     return <LoginForm onLoginSuccess={handleLoginSuccess} />;
 *   }
 * 
 *   return <MainApp />;
 * }
 */

