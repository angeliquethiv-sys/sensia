import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV = [
  {
    path: '/home',
    label: 'Accueil',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          fill={a ? 'rgba(123,94,167,.25)' : 'none'}
          stroke={a ? '#7B5EA7' : '#9C8A78'} strokeWidth={a ? '2' : '1.6'} strokeLinejoin="round"/>
        <path d="M9 21V12h6v9" stroke={a ? '#7B5EA7' : '#9C8A78'} strokeWidth={a ? '2' : '1.6'} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    path: '/my-session',
    label: 'Séance',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="3"
          fill={a ? 'rgba(123,94,167,.25)' : 'none'}
          stroke={a ? '#7B5EA7' : '#9C8A78'} strokeWidth={a ? '2' : '1.6'}/>
        <path d="M8 8h8M8 12h6M8 16h4"
          stroke={a ? '#7B5EA7' : '#9C8A78'} strokeWidth={a ? '2' : '1.5'} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    path: '/learn',
    label: 'Apprendre',
    isCenter: true,
    icon: (a) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L2 8l10 5 10-5-10-5z"
          fill={a ? '#fff' : 'rgba(255,255,255,.9)'}
          stroke={a ? '#fff' : 'rgba(255,255,255,.7)'} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 8v7M6 10.5v5.5a6 6 0 0012 0v-5.5"
          stroke={a ? '#fff' : 'rgba(255,255,255,.8)'} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    path: '/playlist',
    label: 'Musique',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9"
          fill={a ? 'rgba(123,94,167,.25)' : 'none'}
          stroke={a ? '#7B5EA7' : '#9C8A78'} strokeWidth={a ? '2' : '1.6'}/>
        <circle cx="12" cy="12" r="3" fill={a ? '#7B5EA7' : '#9C8A78'}/>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3"
          stroke={a ? '#7B5EA7' : '#9C8A78'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Profil',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4"
          fill={a ? 'rgba(123,94,167,.25)' : 'none'}
          stroke={a ? '#7B5EA7' : '#9C8A78'} strokeWidth={a ? '2' : '1.6'}/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={a ? '#7B5EA7' : '#9C8A78'} strokeWidth={a ? '2' : '1.6'} strokeLinecap="round"/>
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
      background: 'rgba(253,251,248,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(196,152,106,.15)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '6px 0 max(10px,env(safe-area-inset-bottom))',
      zIndex: 200,
      boxShadow: '0 -4px 24px rgba(44,33,24,.08)',
    }}>
      {NAV.map(({ path, label, icon, isCenter }) => {
        const active = pathname === path || (path === '/profile' && pathname === '/onboarding');
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
            {active && !isCenter && (
              <span style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: 24, height: 3, borderRadius: 2,
                background: 'linear-gradient(90deg,#7B5EA7,#A689C4)',
              }} />
            )}

            {isCenter ? (
              <div style={{
                marginTop: -18,
                width: 56, height: 56, borderRadius: '50%',
                background: active
                  ? 'linear-gradient(135deg,#4A3669,#2D1F4A)'
                  : 'linear-gradient(135deg,#7B5EA7,#4A3669)',
                boxShadow: '0 4px 18px rgba(123,94,167,.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '3px solid #FDFBF8',
              }}>
                {icon(active)}
              </div>
            ) : (
              icon(active)
            )}

            <span style={{
              fontSize: 9.5, fontWeight: active ? 700 : 500,
              color: active ? '#7B5EA7' : '#9C8A78',
              letterSpacing: '0.02em',
              marginTop: isCenter ? 2 : 0,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
