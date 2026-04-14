import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { track, Events } from '../../lib/analytics';

export default function RegisterScreen() {
  const navigate  = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ prenom: '', email: '', password: '', confirm: '', terms: false });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (form.password.length < 6)       { setError('Le mot de passe doit faire au moins 6 caractères.'); return; }
    if (!form.terms)                    { setError('Accepte les conditions d\'utilisation pour continuer.'); return; }
    setLoading(true);
    const { data, error } = await signUp(form.email, form.password, form.prenom);
    setLoading(false);
    if (error) { setError(error.message); return; }
    if (data?.user) {
      track(Events.AUTH_SIGNUP, { method: 'email' });
      track(Events.ONBOARDING_STARTED);
    }
    navigate('/onboarding');
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px', borderRadius: 14,
    border: '1.5px solid rgba(196,152,106,.25)', background: '#F8F5F0',
    fontSize: 15, color: '#2C2118', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>

      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#9B8DC8,#7B5EA7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', boxShadow: '0 6px 20px rgba(123,94,167,.3)' }}>
          <span style={{ fontSize: 24 }}>🌸</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#2C2118', fontWeight: 400, letterSpacing: '0.08em', marginBottom: 4 }}>SENSIA</h1>
        <p style={{ fontSize: 13, color: '#9C8A78' }}>Crée ton compte gratuit</p>
      </div>

      <div style={{ width: '100%', maxWidth: 400, background: '#FDFBF8', borderRadius: 28, padding: '28px 24px', boxShadow: '0 8px 32px rgba(44,33,24,.08)', border: '1.5px solid rgba(196,152,106,.12)' }}>
        <form onSubmit={handleSubmit}>
          {[
            { key: 'prenom',   label: 'Prénom',                  type: 'text',     placeholder: 'Angélique' },
            { key: 'email',    label: 'Email',                   type: 'email',    placeholder: 'ton@email.com' },
            { key: 'password', label: 'Mot de passe',            type: 'password', placeholder: '••••••••' },
            { key: 'confirm',  label: 'Confirmer le mot de passe', type: 'password', placeholder: '••••••••' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.label}</label>
              <input
                type={f.type} required value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder} style={inputStyle}
              />
            </div>
          ))}

          {/* CGU */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20, marginTop: 4 }}>
            <input
              type="checkbox" id="terms" checked={form.terms} onChange={e => set('terms', e.target.checked)}
              style={{ marginTop: 3, accentColor: '#7B5EA7', cursor: 'pointer', flexShrink: 0 }}
            />
            <label htmlFor="terms" style={{ fontSize: 13, color: '#6B5744', lineHeight: 1.5, cursor: 'pointer' }}>
              J'accepte les <span style={{ color: '#7B5EA7', fontWeight: 600 }}>conditions d'utilisation</span> et la <span style={{ color: '#7B5EA7', fontWeight: 600 }}>politique de confidentialité</span> SENSIA
            </label>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: 'rgba(226,75,74,.08)', borderRadius: 12, border: '1px solid rgba(226,75,74,.25)', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#E24B4A' }}>{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', borderRadius: 50, border: 'none', cursor: loading ? 'default' : 'pointer', background: loading ? 'rgba(123,94,167,.3)' : 'linear-gradient(135deg,#7B5EA7,#4A3669)', color: '#fff', fontSize: 15, fontWeight: 700, boxShadow: loading ? 'none' : '0 6px 20px rgba(123,94,167,.35)', marginBottom: 20 }}>
            {loading ? 'Création du compte…' : 'Créer mon compte SENSIA'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#9C8A78' }}>
          Déjà un compte ?{' '}
          <Link to="/auth/login" style={{ color: '#7B5EA7', fontWeight: 700, textDecoration: 'none' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
