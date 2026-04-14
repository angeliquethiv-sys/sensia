import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { track, Events } from '../../lib/analytics';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, isDemo } = useAuth();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { setError(error.message); return; }
    track(Events.AUTH_LOGIN, { method: 'email' });
    navigate('/home');
  };

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#9B8DC8,#7B5EA7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 8px 24px rgba(123,94,167,.35)' }}>
          <span style={{ fontSize: 28 }}>🌸</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: '#2C2118', fontWeight: 400, letterSpacing: '0.08em', marginBottom: 4 }}>SENSIA</h1>
        <p style={{ fontSize: 13, color: '#9C8A78' }}>Connecte-toi à ton espace</p>
      </div>

      <div style={{ width: '100%', maxWidth: 400, background: '#FDFBF8', borderRadius: 28, padding: '28px 24px', boxShadow: '0 8px 32px rgba(44,33,24,.08)', border: '1.5px solid rgba(196,152,106,.12)' }}>

        {isDemo && (
          <div style={{ padding: '10px 14px', background: 'rgba(155,141,200,.1)', borderRadius: 12, border: '1px solid rgba(155,141,200,.3)', marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: '#7B5EA7' }}>⚠️ Mode démo — Supabase non configuré. N'importe quel email/mdp fonctionne.</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="ton@email.com"
              style={{ width: '100%', padding: '13px 16px', borderRadius: 14, border: '1.5px solid rgba(196,152,106,.25)', background: '#F8F5F0', fontSize: 15, color: '#2C2118', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Mot de passe</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '13px 16px', borderRadius: 14, border: '1.5px solid rgba(196,152,106,.25)', background: '#F8F5F0', fontSize: 15, color: '#2C2118', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: 20 }}>
            <Link to="/auth/forgot-password" style={{ fontSize: 12, color: '#7B5EA7', textDecoration: 'none' }}>Mot de passe oublié ?</Link>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: 'rgba(226,75,74,.08)', borderRadius: 12, border: '1px solid rgba(226,75,74,.25)', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#E24B4A' }}>{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', borderRadius: 50, border: 'none', cursor: loading ? 'default' : 'pointer', background: loading ? 'rgba(123,94,167,.3)' : 'linear-gradient(135deg,#7B5EA7,#4A3669)', color: '#fff', fontSize: 15, fontWeight: 700, boxShadow: loading ? 'none' : '0 6px 20px rgba(123,94,167,.35)', marginBottom: 16, transition: 'all .2s' }}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        {/* Séparateur */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(196,152,106,.2)' }}/>
          <span style={{ fontSize: 12, color: '#9C8A78' }}>ou</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(196,152,106,.2)' }}/>
        </div>

        {/* Google */}
        <button onClick={handleGoogle} style={{ width: '100%', padding: '14px', borderRadius: 50, border: '1.5px solid rgba(196,152,106,.3)', cursor: 'pointer', background: '#FDFBF8', color: '#2C2118', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continuer avec Google
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#9C8A78' }}>
          Pas encore de compte ?{' '}
          <Link to="/auth/register" style={{ color: '#7B5EA7', fontWeight: 700, textDecoration: 'none' }}>Créer mon compte</Link>
        </p>
      </div>

      <button onClick={() => navigate('/onboarding')} style={{ marginTop: 20, background: 'none', border: 'none', color: '#9C8A78', fontSize: 13, cursor: 'pointer' }}>
        ← Retour à l'accueil
      </button>
    </div>
  );
}
