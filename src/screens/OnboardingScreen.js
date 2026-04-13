import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Data ─── */
const PROFILES = [
  {
    id: 'postpartum',
    emoji: '🤱',
    title: 'Post-partum',
    sub: 'Après accouchement',
    desc: 'Récupération en douceur, rééducation périnéale',
    color: '#9B8DC8',
    bg: 'linear-gradient(135deg,#F0EDF8,#E0D8F5)',
  },
  {
    id: 'beginner',
    emoji: '🌱',
    title: 'Débutante',
    sub: 'Je commence',
    desc: 'Découverte du périnée et de la respiration',
    color: '#3DD68C',
    bg: 'linear-gradient(135deg,#E6FBF3,#C8F5E5)',
  },
  {
    id: 'intermediate',
    emoji: '💪',
    title: 'Intermédiaire',
    sub: 'Fitness / muscu',
    desc: 'Optimiser les performances en sécurité',
    color: '#00C4B0',
    bg: 'linear-gradient(135deg,#E0FBF8,#BCEEE9)',
  },
  {
    id: 'injured',
    emoji: '🌸',
    title: 'Déjà touchée',
    sub: 'Problèmes périnéaux',
    desc: 'Programme adapté et progressif',
    color: '#F0B429',
    bg: 'linear-gradient(135deg,#FFF8E1,#FAEBC0)',
  },
];

const GOALS = [
  { id: 'breath',  emoji: '🌬️', label: 'Améliorer ma respiration' },
  { id: 'perinee', emoji: '💜', label: 'Renforcer mon périnée' },
  { id: 'gainage', emoji: '🔥', label: 'Améliorer mon gainage' },
  { id: 'body',    emoji: '🧘', label: 'Comprendre mon corps' },
  { id: 'safe',    emoji: '🛡️', label: "M'entraîner en sécurité" },
];

/* ─── Styles partagés ─── */
const S = {
  screen: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--beige)',
    overflowX: 'hidden',
  },
  btnPrimary: {
    width: '100%',
    padding: '18px',
    borderRadius: 50,
    background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: '0.04em',
    boxShadow: '0 8px 26px rgba(123,107,168,.45)',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform .15s,box-shadow .15s',
  },
  btnDisabled: {
    width: '100%',
    padding: '18px',
    borderRadius: 50,
    background: 'rgba(155,141,200,.28)',
    color: 'rgba(74,54,105,.4)',
    fontSize: 16,
    fontWeight: 700,
    border: 'none',
    cursor: 'not-allowed',
  },
  stepBar: (curr, total) => ({
    display: 'flex', gap: 6, padding: '52px 28px 0',
    justifyContent: 'center',
  }),
};

/* ─── Step indicator ─── */
function StepDots({ current, total }) {
  return (
    <div style={S.stepBar(current, total)}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          height: 4, borderRadius: 2,
          flex: i === current ? 3 : 1,
          background: i <= current
            ? 'linear-gradient(90deg,#9B8DC8,#7B6BA8)'
            : 'rgba(155,141,200,.22)',
          transition: 'flex .35s ease, background .35s ease',
        }} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ONBOARDING MAIN
═══════════════════════════════════════════ */
export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    firstName: '',
    profileType: '',
    goals: [],
    beltConnected: false,
  });

  const next = () => setStep(s => s + 1);
  const set  = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const toggleGoal = id =>
    set('goals', profile.goals.includes(id)
      ? profile.goals.filter(g => g !== id)
      : [...profile.goals, id]);

  const finish = () => {
    localStorage.setItem('sensia_profile', JSON.stringify(profile));
    navigate('/home');
  };

  if (step === 0) return <Splash onNext={next} />;
  if (step === 1) return <ProfileChoice profile={profile} set={set} onNext={next} />;
  if (step === 2) return <Goals profile={profile} toggle={toggleGoal} onNext={next} />;
  if (step === 3) return <BeltConnect profile={profile} set={set} onNext={next} />;
  return <Summary profile={profile} onFinish={finish} />;
}

/* ─────────── STEP 0 : Splash ─────────── */
function Splash({ onNext }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(175deg,#2D1F4A 0%,#4A3669 55%,#6B5B95 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 32px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Décors */}
      {[220,160,100].map((s,i) => (
        <div key={i} style={{
          position: 'absolute',
          width: s, height: s, borderRadius: '50%',
          border: `1px solid rgba(255,255,255,${0.06 - i*0.015})`,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Cercle respiratoire animé */}
      <div style={{ position: 'relative', marginBottom: 40 }}>
        {/* Anneaux ripple */}
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            width: 120, height: 120, borderRadius: '50%',
            border: '1.5px solid rgba(155,141,200,.5)',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            animation: `splashRing 3s ease-out ${i * 1}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}
        {/* Cercle principal */}
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(155,141,200,.6) 0%,rgba(123,107,168,.3) 100%)',
          border: '2px solid rgba(155,141,200,.6)',
          boxShadow: '0 0 50px rgba(155,141,200,.4), inset 0 0 30px rgba(255,255,255,.1)',
          animation: 'splashPulse 4s ease-in-out infinite',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 42 }}>🌸</span>
        </div>
      </div>

      {/* Logo */}
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 56, fontWeight: 300,
        color: '#fff', letterSpacing: '0.12em',
        lineHeight: 1, marginBottom: 8,
        animation: 'fadeIn .9s ease-out',
      }}>
        SENSIA
      </h1>
      <p style={{
        fontSize: 11, letterSpacing: '0.28em',
        color: 'rgba(155,141,200,.9)', fontWeight: 600,
        textTransform: 'uppercase', marginBottom: 32,
        animation: 'fadeIn 1.1s ease-out',
      }}>
        Ceinture périnéale intelligente
      </p>

      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 22, fontStyle: 'italic', fontWeight: 400,
        color: 'rgba(255,255,255,.85)',
        lineHeight: 1.55, textAlign: 'center',
        maxWidth: 280, marginBottom: 44,
        animation: 'fadeIn 1.3s ease-out',
      }}>
        "Ton corps mérite d'être écouté."
      </p>

      <button
        onClick={onNext}
        style={{
          ...S.btnPrimary,
          background: 'rgba(255,255,255,.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(255,255,255,.3)',
          boxShadow: '0 8px 30px rgba(0,0,0,.25)',
          animation: 'fadeIn 1.5s ease-out',
          color: '#fff',
        }}
      >
        Commencer mon profil
      </button>

      <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 12, marginTop: 20 }}>
        Application dédiée à la ceinture SENSIA
      </p>
    </div>
  );
}

/* ─────────── STEP 1 : Choix du profil ─────────── */
function ProfileChoice({ profile, set, onNext }) {
  return (
    <div style={{ ...S.screen }}>
      <StepDots current={0} total={4} />

      <div style={{ padding: '24px 22px 100px', animation: 'slideUp .45s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: '#1A1030', marginBottom: 6, lineHeight: 1.2 }}>
          Quel est ton profil ?
        </h2>
        <p style={{ fontSize: 14, color: '#9B8DC8', marginBottom: 24 }}>
          Ton programme sera adapté à ta situation
        </p>

        {/* Nom */}
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 12, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
            Ton prénom
          </label>
          <input
            type="text"
            placeholder="Ex : Léa"
            value={profile.firstName}
            onChange={e => set('firstName', e.target.value)}
            style={{
              width: '100%', padding: '14px 18px',
              borderRadius: 14,
              border: '2px solid rgba(155,141,200,.3)',
              background: 'rgba(255,255,255,.8)',
              fontSize: 16, color: '#1A1030',
              boxShadow: '0 2px 10px rgba(74,54,105,.07)',
            }}
          />
        </div>

        {/* 4 cartes profil */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {PROFILES.map(p => {
            const sel = profile.profileType === p.id;
            return (
              <button
                key={p.id}
                onClick={() => set('profileType', p.id)}
                style={{
                  padding: '18px 14px',
                  borderRadius: 20,
                  background: sel ? p.bg : 'rgba(255,255,255,.75)',
                  border: sel ? `2.5px solid ${p.color}` : '2.5px solid transparent',
                  boxShadow: sel ? `0 6px 20px ${p.color}35` : '0 2px 10px rgba(74,54,105,.08)',
                  textAlign: 'left',
                  transition: 'all .22s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{p.emoji}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: sel ? p.color : '#1A1030', marginBottom: 3 }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 11, color: sel ? p.color : '#9B8DC8', fontWeight: 600, marginBottom: 5 }}>
                  {p.sub}
                </div>
                <div style={{ fontSize: 11, color: '#7A7490', lineHeight: 1.4 }}>
                  {p.desc}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          disabled={!profile.profileType || !profile.firstName.trim()}
          style={profile.profileType && profile.firstName.trim() ? S.btnPrimary : S.btnDisabled}
        >
          Continuer
        </button>
      </div>
    </div>
  );
}

/* ─────────── STEP 2 : Objectifs ─────────── */
function Goals({ profile, toggle, onNext }) {
  return (
    <div style={{ ...S.screen }}>
      <StepDots current={1} total={4} />

      <div style={{ padding: '24px 22px 100px', animation: 'slideUp .45s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: '#1A1030', marginBottom: 6, lineHeight: 1.2 }}>
          Quels sont<br />tes objectifs ?
        </h2>
        <p style={{ fontSize: 14, color: '#9B8DC8', marginBottom: 28 }}>
          Choisis tout ce qui te correspond
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {GOALS.map(g => {
            const sel = profile.goals.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => toggle(g.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px',
                  borderRadius: 16,
                  background: sel
                    ? 'linear-gradient(135deg,#E8E4F0,#D4CCEB)'
                    : 'rgba(255,255,255,.8)',
                  border: sel ? '2px solid #9B8DC8' : '2px solid transparent',
                  boxShadow: sel ? '0 4px 16px rgba(155,141,200,.3)' : '0 2px 8px rgba(74,54,105,.07)',
                  transition: 'all .2s ease', cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: sel ? 'rgba(123,107,168,.2)' : 'rgba(155,141,200,.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>{g.emoji}</span>
                <span style={{ fontSize: 15, fontWeight: sel ? 700 : 500, color: sel ? '#6B5B95' : '#1A1030' }}>
                  {g.label}
                </span>
                {sel && (
                  <span style={{
                    marginLeft: 'auto', width: 24, height: 24, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff', flexShrink: 0,
                  }}>✓</span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          disabled={profile.goals.length === 0}
          style={profile.goals.length > 0 ? S.btnPrimary : S.btnDisabled}
        >
          {profile.goals.length > 0
            ? `Continuer (${profile.goals.length} objectif${profile.goals.length > 1 ? 's' : ''})`
            : 'Sélectionne au moins un objectif'}
        </button>
      </div>
    </div>
  );
}

/* ─────────── STEP 3 : Connexion ceinture ─────────── */
function BeltConnect({ profile, set, onNext }) {
  const [btStatus, setBtStatus] = useState('idle');
  // idle | searching | found | connecting | connected

  const startScan = () => {
    setBtStatus('searching');
    setTimeout(() => setBtStatus('found'),      2200);
    setTimeout(() => setBtStatus('connecting'), 3000);
    setTimeout(() => { setBtStatus('connected'); set('beltConnected', true); }, 4200);
  };

  const statusLabel = {
    idle:       'Appuie pour détecter ta ceinture',
    searching:  'Recherche en cours…',
    found:      'Ceinture SENSIA détectée !',
    connecting: 'Connexion en cours…',
    connected:  'Ceinture connectée ✓',
  }[btStatus];

  const isConnected = btStatus === 'connected';
  const isSearching = btStatus === 'searching' || btStatus === 'found' || btStatus === 'connecting';

  return (
    <div style={{ ...S.screen }}>
      <StepDots current={2} total={4} />

      <div style={{ padding: '24px 22px 100px', animation: 'slideUp .45s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: '#1A1030', marginBottom: 6, lineHeight: 1.2 }}>
          Connecte ta<br />ceinture SENSIA
        </h2>
        <p style={{ fontSize: 14, color: '#9B8DC8', marginBottom: 32 }}>
          La ceinture guide ta respiration par LED et vibrations
        </p>

        {/* Illustration ceinture */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', marginBottom: 28,
        }}>
          <div style={{ position: 'relative', marginBottom: 20 }}>
            {/* Anneaux scan */}
            {isSearching && [0,1,2].map(i => (
              <div key={i} style={{
                position: 'absolute',
                width: 110, height: 110, borderRadius: '50%',
                border: `2px solid rgba(61,214,140,.6)`,
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                animation: `scanRing 2s ease-out ${i * .65}s infinite`,
              }} />
            ))}

            {/* Ceinture ovale */}
            <div style={{
              width: 160, height: 80, borderRadius: 40,
              background: isConnected
                ? 'linear-gradient(135deg,#EDE0D4,#D4C5B0)'
                : 'linear-gradient(135deg,#EDE0D4,#C8B89A)',
              boxShadow: isConnected
                ? '0 8px 30px rgba(61,214,140,.3), 0 2px 8px rgba(0,0,0,.1)'
                : '0 8px 20px rgba(0,0,0,.1)',
              border: isConnected ? '2px solid rgba(61,214,140,.5)' : '2px solid rgba(200,184,154,.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all .5s ease',
              position: 'relative',
              animation: isSearching && !isConnected ? 'beltConnecting 1s ease-in-out infinite' : 'none',
            }}>
              {/* LED de la ceinture */}
              {['#8BA7FF','#9B8DC8','#3DD68C'].map((c,i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: isConnected ? '#3DD68C' : isSearching ? c : '#BEB8D0',
                  boxShadow: isConnected ? `0 0 8px #3DD68C` : isSearching ? `0 0 6px ${c}` : 'none',
                  transition: 'all .3s ease',
                  animation: isConnected ? 'ledGreen 2s ease-in-out infinite' : 'none',
                  animationDelay: `${i * .3}s`,
                }} />
              ))}
              <p style={{
                position: 'absolute', bottom: -22,
                fontSize: 10, color: '#9B8DC8',
                fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                SENSIA BELT
              </p>
            </div>
          </div>

          {/* Status */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px',
            background: isConnected ? 'rgba(61,214,140,.12)' : 'rgba(155,141,200,.1)',
            borderRadius: 50,
            border: `1px solid ${isConnected ? 'rgba(61,214,140,.4)' : 'rgba(155,141,200,.3)'}`,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: isConnected ? '#3DD68C' : isSearching ? '#F0B429' : '#9B8DC8',
              animation: isConnected ? 'ledGreen 1.5s infinite' : isSearching ? 'goldGlow 1s infinite' : 'none',
            }} />
            <span style={{
              fontSize: 13, fontWeight: 600,
              color: isConnected ? '#3DD68C' : isSearching ? '#E6A817' : '#7B6BA8',
            }}>
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Légende LED */}
        <div style={{
          background: 'rgba(255,255,255,.75)',
          borderRadius: 16, padding: '16px 18px',
          marginBottom: 20,
          border: '1px solid rgba(232,228,240,.8)',
        }}>
          <p style={{ fontSize: 12, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Signaux de la ceinture
          </p>
          {[
            { color: '#8BA7FF', label: 'LED bleue — Inspire' },
            { color: '#F0B429', label: 'LED orange — Expire' },
            { color: '#FF9B9B', label: 'Vibration — Erreur détectée' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#5A4B7A' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Offre Premium */}
        <div style={{
          background: 'linear-gradient(135deg,#4A3669,#7B6BA8)',
          borderRadius: 16, padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 24 }}>✨</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
              15 jours Premium offerts
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>
              À l'achat de la ceinture SENSIA
            </p>
          </div>
        </div>

        {btStatus === 'idle' && (
          <button onClick={startScan} style={S.btnPrimary}>
            Connecter ma ceinture
          </button>
        )}
        {isSearching && (
          <button disabled style={{ ...S.btnDisabled, animation: 'beltConnecting 1s infinite' }}>
            Connexion en cours…
          </button>
        )}
        {isConnected && (
          <button onClick={onNext} style={S.btnPrimary}>
            Parfait, continuer →
          </button>
        )}

        {!isConnected && (
          <button
            onClick={() => { set('beltConnected', false); onNext(); }}
            style={{ background: 'none', border: 'none', color: '#9B8DC8', fontSize: 14, fontWeight: 500, marginTop: 14, width: '100%', cursor: 'pointer' }}
          >
            Passer cette étape (sans ceinture)
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────── STEP 4 : Récapitulatif ─────────── */
function Summary({ profile, onFinish }) {
  const p = PROFILES.find(x => x.id === profile.profileType);
  const goalLabels = profile.goals.map(id => GOALS.find(g => g.id === id)?.label).filter(Boolean);

  return (
    <div style={{ ...S.screen }}>
      <StepDots current={3} total={4} />

      <div style={{ padding: '24px 22px 100px', animation: 'slideUp .45s ease-out' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: '#1A1030', marginBottom: 6, lineHeight: 1.2 }}>
          Ton programme<br />est prêt,&nbsp;
          <span style={{ color: '#7B6BA8' }}>{profile.firstName || 'belle'}</span> ✨
        </h2>
        <p style={{ fontSize: 14, color: '#9B8DC8', marginBottom: 28 }}>
          Voici un récapitulatif de ton profil
        </p>

        {/* Profil card */}
        <div style={{
          background: p?.bg || '#F0EDF8',
          borderRadius: 20, padding: '18px 20px',
          border: `2px solid ${p?.color || '#9B8DC8'}40`,
          marginBottom: 14,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{ fontSize: 36 }}>{p?.emoji}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1030' }}>{p?.title}</div>
            <div style={{ fontSize: 13, color: '#7A7490' }}>{p?.desc}</div>
          </div>
        </div>

        {/* Objectifs */}
        <div style={{
          background: 'rgba(255,255,255,.8)',
          borderRadius: 18, padding: '16px 18px', marginBottom: 14,
          boxShadow: '0 2px 12px rgba(74,54,105,.08)',
        }}>
          <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Objectifs sélectionnés
          </p>
          {goalLabels.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 14, color: '#1A1030' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Ceinture status */}
        <div style={{
          background: profile.beltConnected ? 'rgba(61,214,140,.1)' : 'rgba(155,141,200,.08)',
          borderRadius: 16, padding: '14px 18px', marginBottom: 28,
          border: `1px solid ${profile.beltConnected ? 'rgba(61,214,140,.3)' : 'rgba(155,141,200,.25)'}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: profile.beltConnected ? '#3DD68C' : '#9B8DC8',
            animation: profile.beltConnected ? 'ledGreen 1.5s infinite' : 'none',
          }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: profile.beltConnected ? '#3DD68C' : '#7B6BA8' }}>
            {profile.beltConnected ? 'Ceinture SENSIA connectée' : 'Sans ceinture (mode application)'}
          </span>
        </div>

        <button onClick={onFinish} style={S.btnPrimary}>
          Accéder à mon programme
        </button>
      </div>
    </div>
  );
}
