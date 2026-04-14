import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SensiaLoader() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#F3EDE5', fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12, animation: 'sensiaPulse 1.5s ease-in-out infinite' }}>🌸</div>
        <p style={{ color: '#9B8DC8', fontSize: 13 }}>Chargement…</p>
      </div>
    </div>
  );
}

export default function PrivateRoute({ children }) {
  const { user, loading, isDemo } = useAuth();

  if (loading) return <SensiaLoader />;

  // Mode démo (pas de Supabase) → vérifie juste le profil localStorage
  if (isDemo) {
    const hasProfile = Boolean(localStorage.getItem('sensia_profile'));
    if (!hasProfile) return <Navigate to="/onboarding" replace />;
    return children;
  }

  // Mode Supabase réel
  if (!user) return <Navigate to="/auth/login" replace />;
  return children;
}

export { SensiaLoader };
