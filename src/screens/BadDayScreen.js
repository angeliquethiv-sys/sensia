import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  {
    id: 'breathing',
    title: 'Respiration douce',
    subtitle: '2 minutes · Inspire 4s · Expire 6s',
    emoji: '🌬️',
    duration: 120,
    color: '#8BA7FF',
    instruction: 'Inspire doucement par le nez pendant 4 secondes… puis expire lentement par la bouche pendant 6 secondes. Laisse ton ventre se gonfler et se dégonfler sans forcer.',
  },
  {
    id: 'perineum',
    title: 'Contraction périnée légère',
    subtitle: '2 minutes · Très doux',
    emoji: '💙',
    duration: 120,
    color: '#A689C4',
    instruction: 'Contracte très doucement ton périnée, comme si tu retenais légèrement les urines. Tiens 3 secondes, relâche 6 secondes. Pas de tension, juste une conscience douce.',
  },
  {
    id: 'stretch',
    title: 'Étirement lombaires',
    subtitle: '1 minute · Allongée sur le dos',
    emoji: '🌿',
    duration: 60,
    color: '#4A9B7F',
    instruction: 'Allongée sur le dos, ramène tes genoux sur ta poitrine. Balance doucement de gauche à droite. Respire et laisse aller toutes les tensions.',
  },
];

export default function BadDayScreen() {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx]       = useState(-1); // -1=intro, 0-2=steps, 3=done
  const [timeLeft, setTimeLeft]     = useState(0);
  const [isRunning, setIsRunning]   = useState(false);
  const [breathPhase, setBreathPhase] = useState('inspire');
  const [breathScale, setBreathScale] = useState(1);
  const timerRef  = useRef(null);
  const breathRef = useRef(null);

  const currentStep = stepIdx >= 0 && stepIdx < STEPS.length ? STEPS[stepIdx] : null;

  /* Timer */
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else {
      setIsRunning(false);
      const next = stepIdx + 1;
      if (next < STEPS.length) {
        setTimeout(() => {
          setStepIdx(next);
          setTimeLeft(STEPS[next].duration);
          setIsRunning(true);
        }, 1600);
      } else {
        setTimeout(() => setStepIdx(STEPS.length), 800);
      }
    }
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, timeLeft]);

  /* Breathing animation */
  useEffect(() => {
    if (!isRunning || !currentStep) { clearTimeout(breathRef.current); return; }
    let phase = 'inspire';
    const animate = () => {
      if (phase === 'inspire') {
        setBreathPhase('inspire');
        setBreathScale(1.28);
        phase = 'expire';
        breathRef.current = setTimeout(animate, 4000);
      } else {
        setBreathPhase('expire');
        setBreathScale(1.0);
        phase = 'inspire';
        breathRef.current = setTimeout(animate, 6000);
      }
    };
    breathRef.current = setTimeout(animate, 0);
    return () => clearTimeout(breathRef.current);
  }, [isRunning, currentStep]);

  const startSession = () => {
    setStepIdx(0);
    setTimeLeft(STEPS[0].duration);
    setIsRunning(true);
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const S = { fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: 'linear-gradient(160deg,#FFF5F8 0%,#F5F0FA 50%,#F3EDE5 100%)', paddingBottom: 40 };

  /* ── DONE SCREEN ── */
  if (stepIdx === STEPS.length) {
    return (
      <div style={{ ...S, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 24, animation: 'fadeIn .8s ease-out' }}>♡</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, color: '#4A3669', fontWeight: 400, marginBottom: 14, lineHeight: 1.3 }}>
          Séance terminée
        </h2>
        <p style={{ fontSize: 18, color: '#6B5744', lineHeight: 1.8, marginBottom: 32, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', maxWidth: 300 }}>
          "Tu as pris soin de toi aujourd'hui.<br/>C'est déjà énorme. ♡"
        </p>
        <div style={{ background: 'rgba(255,255,255,.85)', borderRadius: 20, padding: '16px 20px', marginBottom: 28, width: '100%', maxWidth: 320, boxShadow: '0 4px 16px rgba(74,54,105,.1)' }}>
          {STEPS.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: s.id !== 'stretch' ? '1px solid #F0EDE8' : 'none' }}>
              <span style={{ fontSize: 20 }}>{s.emoji}</span>
              <span style={{ fontSize: 14, color: '#4A3669', fontWeight: 600, flex: 1 }}>{s.title}</span>
              <span style={{ fontSize: 14, color: '#4A9B7F', fontWeight: 700 }}>✓</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/home')}
          style={{ padding: '15px 36px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#A689C4,#7B5EA7)', color: '#fff', fontSize: 15, fontWeight: 700, boxShadow: '0 6px 20px rgba(123,94,167,.35)' }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div style={S}>
      {/* Header */}
      <div style={{ padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#7B5EA7', padding: '4px 8px' }}>←</button>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#4A3669', fontWeight: 400 }}>Mode Mauvais Jour</h1>
          <p style={{ fontSize: 13, color: '#A689C4' }}>5 minutes · Séance ultra-douce</p>
        </div>
      </div>

      {stepIdx === -1 ? (
        /* ── INTRO ── */
        <div style={{ padding: '12px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 20, animation: 'fadeIn .6s ease-out' }}>🌸</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: '#4A3669', fontWeight: 400, marginBottom: 10, lineHeight: 1.4 }}>
            Aujourd'hui on prend<br/>soin de toi.
          </h2>
          <p style={{ fontSize: 15, color: '#6B5744', lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic' }}>
            Rien de difficile. Juste de la douceur.
          </p>
          <div style={{ background: 'rgba(255,255,255,.8)', borderRadius: 20, padding: '16px 20px', marginBottom: 28, textAlign: 'left', boxShadow: '0 4px 16px rgba(74,54,105,.08)' }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < STEPS.length - 1 ? '1px solid rgba(196,152,106,.12)' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {s.emoji}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#2C2118' }}>{s.title}</p>
                  <p style={{ fontSize: 12, color: '#9C8A78' }}>{s.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={startSession}
            style={{ width: '100%', padding: '17px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#A689C4,#7B5EA7)', color: '#fff', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 24px rgba(123,94,167,.35)', letterSpacing: '0.03em' }}
          >
            Commencer en douceur ♡
          </button>
        </div>
      ) : currentStep ? (
        /* ── ACTIVE STEP ── */
        <div style={{ padding: '8px 24px', textAlign: 'center' }}>
          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ width: i === stepIdx ? 28 : 8, height: 8, borderRadius: 4, background: i <= stepIdx ? (currentStep.color) : '#E8E4F0', transition: 'all .35s ease' }} />
            ))}
          </div>

          {/* Breathing circle */}
          <div style={{ position: 'relative', width: 210, height: 210, margin: '0 auto 28px' }}>
            {/* Outer ring */}
            <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: `1.5px solid ${currentStep.color}30`, pointerEvents: 'none' }} />
            <div style={{
              width: 210, height: 210, borderRadius: '50%',
              background: `radial-gradient(circle, ${currentStep.color}35 0%, ${currentStep.color}10 100%)`,
              border: `2px solid ${currentStep.color}50`,
              boxShadow: `0 0 40px ${currentStep.color}25`,
              transform: `scale(${breathScale})`,
              transition: 'transform 4s cubic-bezier(.4,0,.2,1), box-shadow 4s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 6,
            }}>
              <span style={{ fontSize: 44 }}>{currentStep.emoji}</span>
              <span style={{ fontSize: 10, color: currentStep.color, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {breathPhase}
              </span>
            </div>
          </div>

          {/* Step title */}
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: '#4A3669', fontWeight: 400, marginBottom: 4 }}>
            {currentStep.title}
          </h2>
          <p style={{ fontSize: 13, color: '#9C8A78', marginBottom: 18 }}>{currentStep.subtitle}</p>

          {/* Timer */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${currentStep.color}18`, borderRadius: 50, padding: '10px 28px', marginBottom: 22 }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: currentStep.color, fontFamily: 'var(--font-mono, monospace)' }}>
              {fmt(timeLeft)}
            </span>
          </div>

          <p style={{ fontSize: 14, color: '#6B5744', lineHeight: 1.8, fontStyle: 'italic', padding: '0 8px' }}>
            {currentStep.instruction}
          </p>
        </div>
      ) : null}
    </div>
  );
}
