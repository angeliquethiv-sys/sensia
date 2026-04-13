import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { PROFILES, getDailyAffirmation } from '../data/profiles';

const QUICK_SESSION = {
  energy: [
    { id:'high',   label:'Énergique',  emoji:'⚡', color:'#F0B429' },
    { id:'normal', label:'Normale',    emoji:'😊', color:'#9B8DC8' },
    { id:'low',    label:'Fatiguée',   emoji:'🌙', color:'#8BA7FF' },
  ],
  time: [
    { id:'10', label:'10 min', emoji:'⚡' },
    { id:'20', label:'20 min', emoji:'🔥' },
    { id:'45', label:'45 min', emoji:'💪' },
  ],
  focus: [
    { id:'perineum',    label:'Périnée',      emoji:'💜', route:'/my-session' },
    { id:'lower',       label:'Bas du corps', emoji:'🦵', route:'/my-session' },
    { id:'upper',       label:'Haut du corps',emoji:'💪', route:'/my-session' },
    { id:'full',        label:'Tout le corps',emoji:'🌟', route:'/program' },
    { id:'breathing',   label:'Respiration',  emoji:'🌬️',route:'/session' },
  ],
};

const SESSIONS = [
  { id: 1, title: 'Respiration abdominale',  duration: '12 min', status: 'done',       icon: '🌬️' },
  { id: 2, title: 'Réveil périnée doux',     duration: '15 min', status: 'done',       icon: '🌸' },
  { id: 3, title: 'Pont fessier guidé',      duration: '18 min', status: 'current',    icon: '💪' },
  { id: 4, title: 'Gainage & respiration',   duration: '20 min', status: 'upcoming',   icon: '🔥' },
];

const STATS = [
  { label: 'Séances',    value: '14',  unit: '',   icon: '🏅', color: '#9B8DC8' },
  { label: 'Respiration', value: '78', unit: '%',  icon: '🌬️', color: '#00C4B0' },
  { label: 'Périnée',    value: '91',  unit: '%',  icon: '💜', color: '#F0B429' },
];

const PROGRESS = [
  { label: 'Respiration', value: 78, color: '#9B8DC8', bg: 'rgba(155,141,200,.15)' },
  { label: 'Gainage',     value: 65, color: '#00C4B0', bg: 'rgba(0,196,176,.12)' },
  { label: 'Périnée',     value: 91, color: '#F0B429', bg: 'rgba(240,180,41,.12)' },
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ firstName: 'Léa', beltConnected: true });
  const [breathPhase, setBreathPhase] = useState('inspire');
  const [breathScale, setBreathScale] = useState(1);
  const [showQuickSession, setShowQuickSession] = useState(false);
  const [qsStep, setQsStep] = useState(0); // 0,1,2
  const [qsEnergy, setQsEnergy] = useState(null);
  const [qsTime, setQsTime] = useState(null);
  const [qsFocus, setQsFocus] = useState(null);
  const [profileMeta, setProfileMeta] = useState(null);
  const [affirmation, setAffirmation] = useState('');
  const [cycleActive, setCycleActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sensia_profile');
    if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
      const profileId = p.profileType || 'postpartum';
      setProfileMeta(PROFILES[profileId] || PROFILES.postpartum);
      setAffirmation(getDailyAffirmation(profileId));
    }
    const cycle = localStorage.getItem('sensia_cycle');
    if (cycle) setCycleActive(true);
  }, []);

  /* Cercle respiratoire hero simplifié */
  useEffect(() => {
    let phase = 'inspire';
    const tick = () => {
      if (phase === 'inspire') {
        setBreathPhase('inspire');
        setBreathScale(1.35);
        phase = 'expire';
        return 4000;
      } else {
        setBreathPhase('expire');
        setBreathScale(1);
        phase = 'inspire';
        return 4000;
      }
    };
    let timer;
    const loop = () => { const dur = tick(); timer = setTimeout(loop, dur); };
    const firstDur = tick();
    timer = setTimeout(loop, firstDur);
    return () => clearTimeout(timer);
  }, []);

  const launchQuickSession = () => {
    if (!qsFocus) return;
    setShowQuickSession(false);
    navigate(qsFocus.route, { state: { quickSession: { energy: qsEnergy?.id, time: qsTime?.id, focus: qsFocus.id } } });
  };

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const name  = profile.firstName || profile.name || 'toi';

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', paddingBottom: 100, fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: '52px 22px 18px',
        background: 'linear-gradient(175deg,#F0EDF8 0%,#F5EFE6 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 30, fontWeight: 300,
            color: '#4A3669', letterSpacing: '0.1em',
            lineHeight: 1,
          }}>
            SENSIA
          </h1>
          <p style={{ fontSize: 10, color: '#9B8DC8', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            périnée intelligent
          </p>
        </div>

        {/* Badge ceinture */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: profile.beltConnected ? 'rgba(61,214,140,.12)' : 'rgba(155,141,200,.1)',
          border: `1.5px solid ${profile.beltConnected ? 'rgba(61,214,140,.4)' : 'rgba(155,141,200,.3)'}`,
          borderRadius: 50, padding: '7px 13px',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: profile.beltConnected ? '#3DD68C' : '#9B8DC8',
            animation: profile.beltConnected ? 'ledGreen 1.8s ease-in-out infinite' : 'none',
          }} />
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: profile.beltConnected ? '#3DD68C' : '#9B8DC8',
            letterSpacing: '0.04em',
          }}>
            {profile.beltConnected ? 'Ceinture connectée' : 'Sans ceinture'}
          </span>
        </div>
      </div>

      {/* ── HERO violet foncé ── */}
      <div style={{
        margin: '0 16px 16px',
        borderRadius: 28,
        background: 'linear-gradient(165deg,#4A3669 0%,#2D1F4A 100%)',
        padding: '26px 22px 22px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(45,31,74,.45)',
        animation: 'fadeIn .55s ease-out',
      }}>
        {/* Décors */}
        {[180,120,70].map((s,i) => (
          <div key={i} style={{
            position: 'absolute', top: -s/2, right: -s/2,
            width: s, height: s, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,.05)',
            pointerEvents: 'none',
          }}/>
        ))}

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 13, color: 'rgba(155,141,200,.8)', marginBottom: 4 }}>{greet} ✨</p>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 34, fontWeight: 400,
              color: '#fff', lineHeight: 1.1, marginBottom: 6,
            }}>
              {name}
            </h2>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(155,141,200,.2)',
              borderRadius: 50, padding: '5px 12px',
            }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>Post-partum</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(155,141,200,.5)' }}/>
              <span style={{ fontSize: 11, color: 'rgba(155,141,200,.9)', fontWeight: 600 }}>Semaine 8</span>
            </div>
          </div>

          {/* Cercle respiratoire animé */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/* Anneau externe */}
            <div style={{
              position: 'absolute',
              width: 82, height: 82, borderRadius: '50%',
              border: '1px solid rgba(155,141,200,.25)',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              pointerEvents: 'none',
            }}/>
            {/* Cercle principal */}
            <div style={{
              width: 68, height: 68, borderRadius: '50%',
              background: breathPhase === 'inspire'
                ? 'radial-gradient(circle,rgba(139,167,255,.55) 0%,rgba(155,141,200,.25) 100%)'
                : 'radial-gradient(circle,rgba(180,156,224,.4) 0%,rgba(107,91,149,.2) 100%)',
              border: `2px solid ${breathPhase === 'inspire' ? 'rgba(139,167,255,.6)' : 'rgba(155,141,200,.4)'}`,
              boxShadow: breathPhase === 'inspire'
                ? '0 0 28px rgba(139,167,255,.45)'
                : '0 0 18px rgba(155,141,200,.25)',
              transform: `scale(${breathScale})`,
              transition: 'transform 3.8s cubic-bezier(.4,0,.2,1), box-shadow 3.8s ease, background 3.8s ease, border-color 3.8s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', fontWeight: 700, letterSpacing: '0.05em' }}>
                {breathPhase === 'inspire' ? 'INSPIRE' : 'EXPIRE'}
              </span>
            </div>
          </div>
        </div>

        {/* Exercice du jour */}
        <div style={{
          background: 'rgba(255,255,255,.08)',
          borderRadius: 16, padding: '14px 16px',
          marginBottom: 16,
          border: '1px solid rgba(255,255,255,.1)',
        }}>
          <p style={{ fontSize: 10, color: 'rgba(240,180,41,.9)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
            Exercice du jour
          </p>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20, color: '#fff', fontWeight: 400,
          }}>
            Pont fessier guidé
            <span style={{ fontSize: 13, color: 'rgba(155,141,200,.9)', fontWeight: 400, marginLeft: 8 }}>18 min</span>
          </p>
        </div>

        <button
          onClick={() => navigate('/session')}
          style={{
            width: '100%', padding: '15px',
            borderRadius: 50,
            background: 'linear-gradient(135deg,#F0B429,#E6A817)',
            color: '#1A1030', fontSize: 15, fontWeight: 700,
            letterSpacing: '0.04em',
            boxShadow: '0 6px 22px rgba(240,180,41,.45)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <span>▶</span> Commencer la séance du jour
        </button>
      </div>

      <div style={{ padding: '0 16px' }}>

        {/* ── STREAK ── */}
        <div style={{
          background: 'rgba(255,255,255,.85)',
          borderRadius: 20, padding: '16px 18px',
          marginBottom: 14,
          boxShadow: '0 4px 18px rgba(74,54,105,.09)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          animation: 'fadeIn .65s ease-out',
        }}>
          <div>
            <p style={{ fontSize: 12, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>
              Streak
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1030' }}>
              🔥 6 jours consécutifs
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{
                width: i === 6 ? 14 : 12,
                height: i === 6 ? 14 : 12,
                borderRadius: '50%',
                background: i < 6
                  ? 'linear-gradient(135deg,#F0B429,#E6A817)'
                  : 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
                boxShadow: i < 6
                  ? '0 0 6px rgba(240,180,41,.6)'
                  : '0 0 8px rgba(155,141,200,.8)',
                animation: i === 6 ? 'streakGlow 1.8s ease-in-out infinite' : 'none',
                alignSelf: 'center',
              }} />
            ))}
          </div>
        </div>

        {/* ── AFFIRMATION DU JOUR ── */}
        {affirmation && (
          <div style={{
            background: profileMeta ? `${profileMeta.color}18` : 'rgba(123,94,167,.1)',
            borderRadius: 20, padding: '14px 18px', marginBottom: 14,
            border: `1.5px solid ${profileMeta?.color || '#7B5EA7'}30`,
          }}>
            <p style={{ fontSize: 10, color: profileMeta?.color || '#7B5EA7', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              ✨ Affirmation du jour
            </p>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: '#2C2118', lineHeight: 1.5, fontStyle: 'italic' }}>
              "{affirmation}"
            </p>
          </div>
        )}

        {/* ── GÉNÉRER MA SÉANCE ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <button
            onClick={() => { setShowQuickSession(true); setQsStep(0); setQsEnergy(null); setQsTime(null); setQsFocus(null); }}
            style={{
              flex: 1, padding: '14px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#7B5EA7,#4A3669)',
              color: '#fff', textAlign: 'left',
              boxShadow: '0 6px 20px rgba(123,94,167,.3)',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>⚡</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Générer ma séance</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.65)' }}>3 questions, 2 secondes</div>
          </button>
          <button
            onClick={() => { const c = !cycleActive; setCycleActive(c); if (!c) localStorage.removeItem('sensia_cycle'); else localStorage.setItem('sensia_cycle', '1'); }}
            style={{
              width: 90, padding: '14px 10px', borderRadius: 20, cursor: 'pointer',
              background: cycleActive ? 'rgba(139,167,255,.2)' : 'rgba(255,255,255,.85)',
              border: cycleActive ? '1.5px solid rgba(139,167,255,.5)' : '1.5px solid rgba(232,228,240,.8)',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(74,54,105,.07)',
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>🌙</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: cycleActive ? '#8BA7FF' : '#9C8A78' }}>
              {cycleActive ? 'Cycle ON' : 'Mon cycle'}
            </div>
          </button>
        </div>

        {/* ── STATS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,.85)',
              borderRadius: 18, padding: '16px 10px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(74,54,105,.08)',
              animation: 'fadeIn .7s ease-out',
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 26, color: s.color, lineHeight: 1, marginBottom: 2,
              }}>
                {s.value}<span style={{ fontSize: 14 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 10, color: '#9B8DC8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── PROGRESSION ── */}
        <div style={{
          background: 'rgba(255,255,255,.85)',
          borderRadius: 20, padding: '18px 18px',
          marginBottom: 14,
          boxShadow: '0 4px 18px rgba(74,54,105,.09)',
          animation: 'fadeIn .75s ease-out',
        }}>
          <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            Progression
          </p>
          {PROGRESS.map(p => (
            <div key={p.label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1030' }}>{p.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.value}%</span>
              </div>
              <div style={{ height: 7, background: p.bg, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  width: `${p.value}%`, height: '100%',
                  background: p.color,
                  borderRadius: 4,
                  boxShadow: `0 0 8px ${p.color}60`,
                  transition: 'width 1.2s cubic-bezier(.4,0,.2,1)',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── SÉANCES ── */}
        <div style={{
          background: 'rgba(255,255,255,.85)',
          borderRadius: 20, padding: '18px 18px',
          marginBottom: 14,
          boxShadow: '0 4px 18px rgba(74,54,105,.09)',
          animation: 'fadeIn .8s ease-out',
        }}>
          <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            Programme du jour
          </p>
          {SESSIONS.map((s, i) => {
            const isDone    = s.status === 'done';
            const isCurrent = s.status === 'current';
            const isUpcoming= s.status === 'upcoming';
            return (
              <div
                key={s.id}
                onClick={() => isCurrent && navigate('/session')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px',
                  borderRadius: 14,
                  marginBottom: i < SESSIONS.length - 1 ? 8 : 0,
                  background: isCurrent
                    ? 'linear-gradient(135deg,#F0EDF8,#E0D8F5)'
                    : isDone ? 'transparent' : 'transparent',
                  border: isCurrent ? '1.5px solid #9B8DC8' : '1.5px solid transparent',
                  opacity: isUpcoming ? 0.5 : 1,
                  cursor: isCurrent ? 'pointer' : 'default',
                  transition: 'all .2s ease',
                }}
              >
                {/* Icône statut */}
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone
                    ? 'rgba(61,214,140,.15)'
                    : isCurrent
                    ? 'linear-gradient(135deg,#9B8DC8,#7B6BA8)'
                    : 'rgba(155,141,200,.1)',
                  boxShadow: isCurrent ? '0 4px 12px rgba(155,141,200,.35)' : 'none',
                  fontSize: isDone ? 16 : 18,
                  color: isDone ? '#3DD68C' : isCurrent ? '#fff' : '#BEB8D0',
                }}>
                  {isDone ? '✓' : s.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 14, fontWeight: 600,
                    color: isDone ? '#9B8DC8' : isCurrent ? '#4A3669' : '#BEB8D0',
                    textDecoration: isDone ? 'line-through' : 'none',
                    marginBottom: 2,
                  }}>
                    {s.title}
                  </p>
                  <p style={{ fontSize: 12, color: isDone ? '#C0BAD0' : isCurrent ? '#7B6BA8' : '#BEB8D0' }}>
                    {s.duration}
                  </p>
                </div>

                {isCurrent && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'rgba(155,141,200,.15)',
                    borderRadius: 50, padding: '5px 10px',
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#9B8DC8', animation: 'ledViolet 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: '#7B6BA8', fontWeight: 700, letterSpacing: '0.06em' }}>EN COURS</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DÉFI ── */}
        <div style={{
          background: 'rgba(255,255,255,.85)',
          borderRadius: 20, padding: '18px 18px',
          marginBottom: 14,
          boxShadow: '0 4px 18px rgba(74,54,105,.09)',
          animation: 'fadeIn .85s ease-out',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                Défi en cours
              </p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1030' }}>
                🏆 7 jours de respiration
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg,#4A3669,#7B6BA8)',
              borderRadius: 50, padding: '4px 12px',
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>J6 / 7</span>
            </div>
          </div>
          <div style={{ height: 8, background: 'rgba(155,141,200,.15)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              width: '86%', height: '100%',
              background: 'linear-gradient(90deg,#9B8DC8,#7B6BA8)',
              borderRadius: 4,
              boxShadow: '0 0 10px rgba(155,141,200,.5)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 12, color: '#9B8DC8' }}>86% complété</span>
            <span style={{ fontSize: 12, color: '#7B6BA8', fontWeight: 600 }}>Plus qu'1 jour ! 🌟</span>
          </div>
        </div>

        {/* ── TIP ÉDUCATIF ── */}
        <div style={{
          background: 'linear-gradient(135deg,#4A3669,#2D1F4A)',
          borderRadius: 20, padding: '18px 20px',
          marginBottom: 16,
          boxShadow: '0 8px 26px rgba(45,31,74,.35)',
          animation: 'fadeIn .9s ease-out',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(155,141,200,.08)', pointerEvents: 'none' }}/>
          <p style={{ fontSize: 10, color: 'rgba(240,180,41,.9)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
            💡 Le saviez-vous ?
          </p>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 16, color: '#fff',
            lineHeight: 1.6, fontStyle: 'italic',
          }}>
            "Bloquer sa respiration pendant l'effort pousse les pressions vers le bas et fragilise le périnée."
          </p>
          <p style={{ fontSize: 12, color: 'rgba(155,141,200,.7)', marginTop: 10 }}>
            Avec SENSIA, la ceinture te guide pour synchroniser chaque mouvement avec ta respiration.
          </p>
        </div>

      </div>

      <BottomNav />

      {/* ── QUICK SESSION MODAL ── */}
      {showQuickSession && (
        <div
          style={{ position:'fixed', inset:0, zIndex:400, background:'rgba(26,16,48,.7)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', display:'flex', alignItems:'flex-end' }}
          onClick={() => setShowQuickSession(false)}
        >
          <div
            style={{ width:'100%', maxWidth:430, margin:'0 auto', background:'#F3EDE5', borderRadius:'28px 28px 0 0', padding:'8px 20px 40px', animation:'slideUp .3s ease-out', fontFamily:"'DM Sans', sans-serif" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width:36, height:4, background:'rgba(155,141,200,.4)', borderRadius:2, margin:'12px auto 20px' }} />
            <h3 style={{ fontFamily:'var(--font-heading)', fontSize:26, color:'#2C2118', fontWeight:400, marginBottom:4 }}>Génère ta séance</h3>
            <p style={{ fontSize:13, color:'#9C8A78', marginBottom:20 }}>
              {qsStep === 0 ? 'Comment tu te sens ?' : qsStep === 1 ? 'Tu as combien de temps ?' : 'Tu veux travailler quoi ?'}
            </p>

            {qsStep === 0 && (
              <div style={{ display:'flex', gap:10, marginBottom:20 }}>
                {QUICK_SESSION.energy.map(e => (
                  <button key={e.id} onClick={() => { setQsEnergy(e); setQsStep(1); }}
                    style={{ flex:1, padding:'14px 8px', borderRadius:18, border:`2px solid ${qsEnergy?.id===e.id ? e.color : 'rgba(196,152,106,.2)'}`, background:qsEnergy?.id===e.id ? `${e.color}20` : '#FDFBF8', cursor:'pointer', textAlign:'center' }}>
                    <div style={{ fontSize:24, marginBottom:4 }}>{e.emoji}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:'#2C2118' }}>{e.label}</div>
                  </button>
                ))}
              </div>
            )}
            {qsStep === 1 && (
              <div style={{ display:'flex', gap:10, marginBottom:20 }}>
                {QUICK_SESSION.time.map(t => (
                  <button key={t.id} onClick={() => { setQsTime(t); setQsStep(2); }}
                    style={{ flex:1, padding:'14px 8px', borderRadius:18, border:`2px solid ${qsTime?.id===t.id ? '#7B5EA7' : 'rgba(196,152,106,.2)'}`, background:qsTime?.id===t.id ? 'rgba(123,94,167,.1)' : '#FDFBF8', cursor:'pointer', textAlign:'center' }}>
                    <div style={{ fontSize:22, marginBottom:4 }}>{t.emoji}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#2C2118' }}>{t.label}</div>
                  </button>
                ))}
              </div>
            )}
            {qsStep === 2 && (
              <>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:20 }}>
                  {QUICK_SESSION.focus.map(f => (
                    <button key={f.id} onClick={() => setQsFocus(f)}
                      style={{ padding:'10px 16px', borderRadius:50, border:`2px solid ${qsFocus?.id===f.id ? '#7B5EA7' : 'rgba(196,152,106,.2)'}`, background:qsFocus?.id===f.id ? 'rgba(123,94,167,.12)' : '#FDFBF8', cursor:'pointer', fontSize:13, fontWeight:700, color:'#2C2118' }}>
                      {f.emoji} {f.label}
                    </button>
                  ))}
                </div>
                <button onClick={launchQuickSession}
                  style={{ width:'100%', padding:'16px', borderRadius:50, background:'linear-gradient(135deg,#7B5EA7,#4A3669)', color:'#fff', fontSize:15, fontWeight:700, border:'none', cursor:'pointer', opacity:qsFocus ? 1 : 0.4, boxShadow:'0 8px 26px rgba(123,94,167,.4)' }}>
                  ▶ Lancer ma séance
                </button>
              </>
            )}
            {qsStep > 0 && (
              <button onClick={() => setQsStep(s => s-1)} style={{ marginTop:12, background:'none', border:'none', color:'#9C8A78', fontSize:13, cursor:'pointer', width:'100%', textAlign:'center' }}>← Retour</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
