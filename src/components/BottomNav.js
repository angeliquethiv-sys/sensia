import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV = [
  {
    path: '/home',
    label: 'Accueil',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          fill={a ? 'rgba(155,141,200,.2)' : 'none'}
          stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'} strokeLinejoin="round"/>
        <path d="M9 21V12h6v9" stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    path: '/program',
    label: 'Programme',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3"
          fill={a ? 'rgba(155,141,200,.2)' : 'none'}
          stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'}/>
        <path d="M3 9h18" stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'}/>
        <path d="M8 2v4M16 2v4" stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'} strokeLinecap="round"/>
        <path d="M7 14h4M7 18h3" stroke={a ? '#9B8DC8' : '#BEB8D0'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    path: '/my-session',
    label: 'Ma Séance',
    icon: (a) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10"
          fill={a ? 'linear-gradient(135deg,#9B8DC8,#7B6BA8)' : 'rgba(155,141,200,.15)'}
          stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'}/>
        <circle cx="12" cy="12" r="10"
          fill={a ? 'rgba(123,107,168,.85)' : 'rgba(155,141,200,.12)'}/>
        <path d="M10 8.5l5 3.5-5 3.5V8.5z"
          fill={a ? '#fff' : '#9B8DC8'}/>
      </svg>
    ),
  },
  {
    path: '/session',
    label: 'Respiration',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="9"
          fill={a ? 'rgba(155,141,200,.2)' : 'none'}
          stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'}/>
        <ellipse cx="12" cy="12" rx="4" ry="4"
          fill={a ? '#9B8DC8' : 'none'}
          stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'}/>
      </svg>
    ),
  },
  {
    path: '/onboarding',
    label: 'Profil',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4"
          fill={a ? 'rgba(155,141,200,.2)' : 'none'}
          stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'}/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={a ? '#9B8DC8' : '#9B8DC8'} strokeWidth={a ? '2' : '1.6'} strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav style={{
      position: 'fixed', bottom: 0,
      left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(232,228,240,.9)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '6px 0 max(10px,env(safe-area-inset-bottom))',
      zIndex: 200,
      boxShadow: '0 -4px 24px rgba(74,54,105,.1)',
    }}>
      {NAV.map(({ path, label, icon }, i) => {
        const active = pathname === path;
        const isCenter = i === 2;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: isCenter ? '0 12px' : '6px 10px',
              position: 'relative',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Indicateur actif */}
            {active && !isCenter && (
              <span style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: 28, height: 3, borderRadius: 2,
                background: 'linear-gradient(90deg,#9B8DC8,#7B6BA8)',
              }} />
            )}

            {/* Bouton central spécial */}
            {isCenter ? (
              <div style={{
                marginTop: -18,
                width: 56, height: 56, borderRadius: '50%',
                background: active
                  ? 'linear-gradient(135deg,#7B6BA8,#4A3669)'
                  : 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
                boxShadow: '0 4px 18px rgba(123,107,168,.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '3px solid #fff',
              }}>
                {icon(active)}
              </div>
            ) : (
              icon(active)
            )}

            <span style={{
              fontSize: 9.5, fontWeight: active ? 700 : 500,
              color: active ? '#7B6BA8' : '#A89EC0',
              letterSpacing: '0.02em',
              marginTop: isCenter ? 2 : 0,
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
