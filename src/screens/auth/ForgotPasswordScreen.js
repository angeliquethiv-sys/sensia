import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email,   setEmail]   = useState('');
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>

      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🔑</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, color: '#2C2118', fontWeight: 400, marginBottom: 4 }}>Mot de passe oublié</h1>
        <p style={{ fontSize: 13, color: '#9C8A78' }}>On t'envoie un lien de réinitialisation</p>
      </div>

      <div style={{ width: '100%', maxWidth: 400, background: '#FDFBF8', borderRadius: 28, padding: '28px 24px', boxShadow: '0 8px 32px rgba(44,33,24,.08)', border: '1.5px solid rgba(196,152,106,.12)' }}>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#2C2118', marginBottom: 8 }}>Email envoyé !</p>
            <p style={{ fontSize: 13, color: '#9C8A78', lineHeight: 1.6, marginBottom: 24 }}>
              Vérifie ta boîte mail — un lien pour réinitialiser ton mot de passe a été envoyé à <strong>{email}</strong>
            </p>
            <button onClick={() => navigate('/auth/login')} style={{ width: '100%', padding: '15px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7B5EA7,#4A3669)', color: '#fff', fontSize: 15, fontWeight: 700 }}>
              Retour à la connexion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Ton email</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="ton@email.com"
                style={{ width: '100%', padding: '13px 16px', borderRadius: 14, border: '1.5px solid rgba(196,152,106,.25)', background: '#F8F5F0', fontSize: 15, color: '#2C2118', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {error && (
              <div style={{ padding: '10px 14px', background: 'rgba(226,75,74,.08)', borderRadius: 12, border: '1px solid rgba(226,75,74,.25)', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#E24B4A' }}>{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', borderRadius: 50, border: 'none', cursor: loading ? 'default' : 'pointer', background: loading ? 'rgba(123,94,167,.3)' : 'linear-gradient(135deg,#7B5EA7,#4A3669)', color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
              {loading ? 'Envoi…' : 'Recevoir le lien de réinitialisation'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#9C8A78' }}>
              <Link to="/auth/login" style={{ color: '#7B5EA7', textDecoration: 'none', fontWeight: 600 }}>← Retour à la connexion</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
