import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

/* ─── Phases respiratoires ─── */
const PHASES = [
  {
    id: 'inspire',
    label: 'INSPIRE',
    duration: 4,
    targetScale: 1.42,
    barDir: 'fill',      // 0→100%
    circleColor: 'rgba(139,167,255,.65)',
    borderColor: 'rgba(139,167,255,.8)',
    glow: '0 0 50px rgba(139,167,255,.55), 0 0 100px rgba(139,167,255,.2)',
    coach: 'Gonfle le ventre,\nrelâche le périnée',
    beltLed: '#8BA7FF',
    beltLabel: 'LED bleue',
  },
  {
    id: 'hold',
    label: 'MAINTIENS',
    duration: 2,
    targetScale: 1.42,
    barDir: 'hold-full', // reste à 100%
    circleColor: 'rgba(240,180,41,.45)',
    borderColor: 'rgba(240,180,41,.8)',
    glow: '0 0 50px rgba(240,180,41,.5), 0 0 90px rgba(240,180,41,.2)',
    coach: 'Tiens la position',
    beltLed: '#F0B429',
    beltLabel: 'LED dorée',
  },
  {
    id: 'expire',
    label: 'EXPIRE',
    duration: 4,
    targetScale: 1.0,
    barDir: 'empty',     // 100→0%
    circleColor: 'rgba(155,141,200,.5)',
    borderColor: 'rgba(155,141,200,.75)',
    glow: '0 0 45px rgba(155,141,200,.45), 0 0 80px rgba(155,141,200,.15)',
    coach: 'Gaine doucement,\nremonte le périnée',
    beltLed: '#F0A040',
    beltLabel: 'LED orange',
  },
  {
    id: 'rest',
    label: 'REPOS',
    duration: 2,
    targetScale: 1.0,
    barDir: 'hold-empty', // reste à 0%
    circleColor: 'rgba(107,91,149,.35)',
    borderColor: 'rgba(107,91,149,.5)',
    glow: '0 0 30px rgba(107,91,149,.25)',
    coach: 'Relâche tout',
    beltLed: '#4A3669',
    beltLabel: 'LED éteinte',
  },
];

const STEPS = [
  { num: 1, text: 'Allonge-toi sur le dos, genoux fléchis à 90°, pieds à plat.' },
  { num: 2, text: 'Sur l\'EXPIRE, soulève le bassin en contractant fesses et périnée.' },
  { num: 3, text: 'Sur l\'INSPIRE, redescends lentement, vertèbre par vertèbre.' },
];

function fmt(s) {
  return s < 10 ? `0${s}` : `${s}`;
}

export default function SessionScreen() {
  const navigate = useNavigate();

  /* ── État breathing ── */
  const [phaseIdx,        setPhaseIdx]        = useState(0);
  const [phaseRemaining,  setPhaseRemaining]  = useState(PHASES[0].duration);
  const [circleScale,     setCircleScale]     = useState(1.0);
  const [circleTrans,     setCircleTrans]     = useState('transform .4s ease');
  const [circleColor,     setCircleColor]     = useState(PHASES[0].circleColor);
  const [circleBorder,    setCircleBorder]    = useState(PHASES[0].borderColor);
  const [circleGlow,      setCircleGlow]      = useState(PHASES[0].glow);
  const [barWidth,        setBarWidth]        = useState('0%');
  const [barTrans,        setBarTrans]        = useState('width .4s ease');
  const [coachText,       setCoachText]       = useState(PHASES[0].coach);
  const [isPlaying,       setIsPlaying]       = useState(false);
  const [totalElapsed,    setTotalElapsed]    = useState(0);
  const [cycles,          setCycles]          = useState(0);

  /* ── Scores simulés ── */
  const [scores, setScores] = useState({ resp: 7.2, gainage: 72, perinee: 85 });
  const [scoreFlash, setScoreFlash] = useState(false);

  /* ── Capteurs V2 simulés ── */
  const [v2Center, setV2Center] = useState(58);
  const [v2Sides,  setV2Sides]  = useState(72);
  const [v2Bottom, setV2Bottom] = useState(38);
  const [v2Alert,  setV2Alert]  = useState(null); // null | 'breath' | 'push' | 'core' | 'ok'
  const v2AlertRef = useRef(null);

  /* ── Guidage vocal ── */
  const [voiceOn, setVoiceOn] = useState(localStorage.getItem('sensia_voice') !== 'false');
  const voiceEnabledRef = useRef(localStorage.getItem('sensia_voice') !== 'false');
  const speak = useCallback((text) => {
    if (!voiceEnabledRef.current) return;
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    u.rate = 0.92;
    u.pitch = 1.05;
    u.volume = 1;
    window.speechSynthesis.speak(u);
  }, []);

  /* ── Refs pour le timer ── */
  const phaseIdxRef       = useRef(0);
  const phaseRemRef       = useRef(PHASES[0].duration);
  const isPlayingRef      = useRef(false);
  const totalElapsedRef   = useRef(0);

  /* ── Textes vocaux par phase ── */
  const VOICE_TEXTS = {
    inspire: 'Inspire',
    hold: 'Maintiens',
    expire: 'Expire',
    rest: 'Repos',
  };

  /* ── Appliquer une phase ── */
  const applyPhase = useCallback((idx) => {
    const p = PHASES[idx];
    phaseIdxRef.current  = idx;
    phaseRemRef.current  = p.duration;
    setPhaseIdx(idx);
    setPhaseRemaining(p.duration);
    setCoachText(p.coach);
    setCircleColor(p.circleColor);
    setCircleBorder(p.borderColor);
    setCircleGlow(p.glow);
    speak(VOICE_TEXTS[p.id] || p.label);

    if (p.id === 'inspire') {
      setCircleScale(p.targetScale);
      setCircleTrans(`transform ${p.duration}s cubic-bezier(.4,0,.2,1)`);
      setBarWidth('100%');
      setBarTrans(`width ${p.duration}s linear`);
    } else if (p.id === 'hold') {
      setCircleScale(p.targetScale);
      setCircleTrans('transform .4s ease');
      setBarWidth('100%');
      setBarTrans('width .3s ease');
    } else if (p.id === 'expire') {
      setCircleScale(p.targetScale);
      setCircleTrans(`transform ${p.duration}s cubic-bezier(.4,0,.2,1)`);
      setBarWidth('0%');
      setBarTrans(`width ${p.duration}s linear`);
    } else { // rest
      setCircleScale(p.targetScale);
      setCircleTrans('transform .4s ease');
      setBarWidth('0%');
      setBarTrans('width .3s ease');
    }
  }, [speak]);

  /* ── Démarrer ── */
  const handleStart = () => {
    speak('Séance démarrée. Inspire.');
    applyPhase(0);
    isPlayingRef.current = true;
    setIsPlaying(true);
  };

  /* ── Pause / reprise ── */
  const handlePausePlay = () => {
    if (!isPlaying && !isPlayingRef.current) {
      handleStart();
      return;
    }
    isPlayingRef.current = !isPlayingRef.current;
    setIsPlaying(v => !v);
    if (!isPlayingRef.current) {
      // Pause : geler l'animation CSS + couper la voix
      window.speechSynthesis && window.speechSynthesis.cancel();
      setCircleTrans('transform .3s ease');
      setBarTrans('width .3s ease');
    } else {
      // Reprise : recalculer la durée restante de la barre/cercle
      const p = PHASES[phaseIdxRef.current];
      const rem = phaseRemRef.current;
      if (p.id === 'inspire') {
        setBarWidth('100%');
        setBarTrans(`width ${rem}s linear`);
        setCircleTrans(`transform ${rem}s cubic-bezier(.4,0,.2,1)`);
        setCircleScale(p.targetScale);
      } else if (p.id === 'expire') {
        setBarWidth('0%');
        setBarTrans(`width ${rem}s linear`);
        setCircleTrans(`transform ${rem}s cubic-bezier(.4,0,.2,1)`);
        setCircleScale(1.0);
      }
    }
  };

  /* ── Timer 1 s ── */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPlayingRef.current) return;

      totalElapsedRef.current += 1;
      setTotalElapsed(totalElapsedRef.current);

      phaseRemRef.current -= 1;
      setPhaseRemaining(phaseRemRef.current);

      if (phaseRemRef.current <= 0) {
        const next = (phaseIdxRef.current + 1) % PHASES.length;
        if (next === 0) setCycles(c => c + 1);
        applyPhase(next);
      }
    }, 1000);
    return () => { clearInterval(id); window.speechSynthesis && window.speechSynthesis.cancel(); };
  }, [applyPhase]);

  /* ── Scores simulés (fluctuation toutes les 2.5 s) ── */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPlayingRef.current) return;
      setScores(prev => ({
        resp:    +Math.min(10,  Math.max(5.5, prev.resp    + (Math.random() - 0.42) * 0.6)).toFixed(1),
        gainage: Math.round(Math.min(100, Math.max(55, prev.gainage + (Math.random() - 0.35) * 4))),
        perinee: Math.round(Math.min(100, Math.max(70, prev.perinee + (Math.random() - 0.38) * 3))),
      }));
      setScoreFlash(true);
      setTimeout(() => setScoreFlash(false), 400);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  /* ── Capteurs V2 simulés + alertes intelligentes ── */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPlayingRef.current) return;
      const newCenter = Math.min(100, Math.max(0, v2Center + ((Math.random() * 14) - 7) | 0));
      const newSides  = Math.min(100, Math.max(0, v2Sides  + ((Math.random() * 16) - 8) | 0));
      const newBottom = Math.min(100, Math.max(0, v2Bottom + ((Math.random() * 10) - 5) | 0));
      setV2Center(newCenter);
      setV2Sides(newSides);
      setV2Bottom(newBottom);

      // Alertes intelligentes
      const phase = PHASES[phaseIdxRef.current];
      if (v2AlertRef.current) return; // une alerte à la fois
      let alert = null;
      if (phase?.id === 'inspire' && newSides < 20) alert = 'breath';
      else if (phase?.id === 'expire' && newBottom > 80) alert = 'push';
      else if (newCenter < 30) alert = 'core';
      else if (newCenter > 60 && newSides > 50 && newBottom < 60) alert = 'ok';
      if (alert) {
        v2AlertRef.current = alert;
        setV2Alert(alert);
        setTimeout(() => { v2AlertRef.current = null; setV2Alert(null); }, alert === 'ok' ? 2000 : 4000);
      }
    }, 1400);
    return () => clearInterval(id);
  }, [v2Center, v2Sides, v2Bottom]);

  const currentPhase = PHASES[phaseIdx];
  const sessionProgress = Math.min(100, (totalElapsed / 1080) * 100); // 18 min

  /* ── Score couleur ── */
  const scoreColor = (v, max) => {
    const pct = v / max;
    if (pct >= 0.85) return '#3DD68C';
    if (pct >= 0.65) return '#F0B429';
    return '#FF7B7B';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5EFE6', paddingBottom: 90 }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: '52px 20px 14px',
        background: 'linear-gradient(175deg,#F0EDF8 0%,#F5EFE6 100%)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(155,141,200,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#7B6BA8', flexShrink: 0,
          }}
        >
          ←
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20, color: '#1A1030', fontWeight: 400,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            Gainage & respiration
          </h2>
        </div>

        {/* Indicateur 3/5 */}
        <div style={{
          background: 'rgba(155,141,200,.15)',
          borderRadius: 50, padding: '5px 11px',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7B6BA8' }}>3 / 5</span>
        </div>

        {/* BT badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(61,214,140,.12)',
          border: '1px solid rgba(61,214,140,.35)',
          borderRadius: 50, padding: '5px 10px',
          flexShrink: 0,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3DD68C', animation: 'ledGreen 1.5s infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#3DD68C' }}>BT</span>
        </div>
      </div>

      {/* ── BARRE PROGRESSION SÉANCE ── */}
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#9B8DC8', fontWeight: 600 }}>Progression séance</span>
          <span style={{ fontSize: 12, color: '#7B6BA8', fontWeight: 700 }}>
            {Math.round(sessionProgress)}% — {fmt(Math.floor(totalElapsed / 60))}:{fmt(totalElapsed % 60)}
          </span>
        </div>
        <div style={{ height: 6, background: 'rgba(155,141,200,.18)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            width: `${sessionProgress || 40}%`, height: '100%',
            background: 'linear-gradient(90deg,#9B8DC8,#7B6BA8)',
            borderRadius: 3, transition: 'width 1s linear',
            boxShadow: '0 0 8px rgba(155,141,200,.5)',
          }} />
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>

        {/* ── BLOC PRINCIPAL dark violet ── */}
        <div style={{
          borderRadius: 28,
          background: 'linear-gradient(165deg,#4A3669 0%,#2D1F4A 100%)',
          padding: '28px 20px 22px',
          marginBottom: 14,
          boxShadow: '0 14px 45px rgba(45,31,74,.5)',
          position: 'relative', overflow: 'hidden',
          animation: 'fadeIn .5s ease-out',
        }}>
          {/* Décors */}
          {[200,140].map((s,i) => (
            <div key={i} style={{
              position: 'absolute', top: -s/3, right: -s/3,
              width: s, height: s, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.04)', pointerEvents: 'none',
            }}/>
          ))}

          {/* Phase label */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 10, color: 'rgba(155,141,200,.65)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 3 }}>
                Phase
              </p>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 34, color: '#fff', fontWeight: 400,
                letterSpacing: '0.08em',
                transition: 'color .5s ease',
              }}>
                {currentPhase.label}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 42, color: '#fff', lineHeight: 1,
                transition: 'color .5s ease',
              }}>
                {phaseRemaining}
              </div>
              <p style={{ fontSize: 10, color: 'rgba(155,141,200,.65)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                secondes
              </p>
            </div>
          </div>

          {/* Cercle respiratoire */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22, position: 'relative' }}>
            {/* Anneaux statiques */}
            {[190, 155].map((s,i) => (
              <div key={i} style={{
                position: 'absolute',
                width: s, height: s, borderRadius: '50%',
                border: `1px solid rgba(255,255,255,${0.05 - i*.02})`,
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                pointerEvents: 'none',
              }}/>
            ))}

            {/* Cercle principal animé */}
            <div style={{
              width: 120, height: 120,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${circleColor} 0%, rgba(74,54,105,.15) 100%)`,
              border: `2.5px solid ${circleBorder}`,
              boxShadow: circleGlow,
              transform: `scale(${circleScale})`,
              transition: circleTrans,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 1,
            }}>
              {/* LED ceinture dans le cercle */}
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: currentPhase.beltLed,
                boxShadow: `0 0 10px ${currentPhase.beltLed}`,
                marginBottom: 6,
                transition: 'background .5s ease, box-shadow .5s ease',
              }}/>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {currentPhase.beltLabel}
              </span>
            </div>
          </div>

          {/* Barre de respiration */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Cycle {cycles + 1}
              </span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Inspire → Maintiens → Expire → Repos
              </span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: barWidth,
                transition: barTrans,
                background: currentPhase.id === 'inspire'
                  ? 'linear-gradient(90deg,rgba(139,167,255,.8),rgba(155,141,200,.9))'
                  : currentPhase.id === 'hold'
                  ? 'linear-gradient(90deg,#F0B429,#E6A817)'
                  : 'linear-gradient(90deg,rgba(155,141,200,.9),rgba(139,167,255,.5))',
                borderRadius: 4,
              }}/>
            </div>
          </div>

          {/* Texte coach */}
          <div style={{
            background: 'rgba(255,255,255,.07)',
            borderRadius: 14, padding: '14px 16px',
            border: '1px solid rgba(255,255,255,.1)',
            textAlign: 'center',
          }}>
            {coachText.split('\n').map((line, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 17, color: 'rgba(255,255,255,.9)',
                fontStyle: 'italic', lineHeight: 1.5,
                transition: 'all .5s ease',
              }}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* ── SCORES EN TEMPS RÉEL ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
          marginBottom: 14,
          animation: 'fadeIn .6s ease-out',
        }}>
          {[
            { label: 'Respiration', value: scores.resp, max: 10, unit: '/10', icon: '🌬️' },
            { label: 'Gainage',     value: scores.gainage, max: 100, unit: '/100', icon: '💪' },
            { label: 'Périnée',     value: scores.perinee, max: 100, unit: '/100', icon: '💜' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,.85)',
              borderRadius: 18, padding: '14px 8px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(74,54,105,.09)',
              animation: scoreFlash ? 'scoreFlash .4s ease' : 'none',
            }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 22, lineHeight: 1, marginBottom: 2,
                color: scoreColor(s.value, s.max),
                transition: 'color .4s ease',
              }}>
                {s.value}<span style={{ fontSize: 11, opacity: .6 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 9, color: '#9B8DC8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {s.label}
              </div>
              {/* Mini barre */}
              <div style={{ height: 3, background: 'rgba(155,141,200,.15)', borderRadius: 2, margin: '6px 4px 0', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(s.value / s.max) * 100}%`,
                  background: scoreColor(s.value, s.max),
                  borderRadius: 2,
                  transition: 'width .5s ease',
                }}/>
              </div>
            </div>
          ))}
        </div>

        {/* ── BLOC CEINTURE V2 ── */}
        {(() => {
          const alertConfig = {
            breath: { border: '#E24B4A', bg: 'rgba(226,75,74,.12)', msg: '⚠️ Tu bloques ta respiration — laisse tes côtes s\'ouvrir', pulse: '#E24B4A' },
            push:   { border: '#EF9F27', bg: 'rgba(239,159,39,.12)',  msg: '⚠️ Tu pousses vers le bas — remonte le périnée à l\'expire', pulse: '#EF9F27' },
            core:   { border: '#F0B429', bg: 'rgba(240,180,41,.1)',   msg: '💡 Gaine légèrement — rentre le nombril vers la colonne', pulse: '#F0B429' },
            ok:     { border: '#5DCAA5', bg: 'rgba(93,202,165,.12)',  msg: '✓ Parfait ! Continue comme ça', pulse: '#5DCAA5' },
          };
          const ac = v2Alert ? alertConfig[v2Alert] : null;
          const sideLed  = currentPhase.id === 'inspire' ? '#85B7EB' : currentPhase.id === 'expire' ? '#EF9F27' : '#5DCAA5';
          const centLed  = v2Center > 50 ? '#9B8DC8' : '#3A2D5A';
          const botLed   = v2Bottom < 60 ? '#5DCAA5' : '#E24B4A';
          return (
            <div style={{ background: '#2A1A44', borderRadius: 22, padding: '16px', marginBottom: 14, border: `2px solid ${ac ? ac.border : 'rgba(155,141,200,.2)'}`, transition: 'border-color .3s ease', boxShadow: ac ? `0 0 20px ${ac.pulse}30` : 'none' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(155,141,200,.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>⌚ Ceinture — Temps réel</p>

              {/* LED simulées */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 12, padding: '8px 10px', background: 'rgba(255,255,255,.05)', borderRadius: 10 }}>
                <div style={{ flex: 1, height: 12, borderRadius: 6, background: sideLed, boxShadow: `0 0 8px ${sideLed}80`, transition: 'background .5s ease' }}/>
                <div style={{ flex: 1, height: 12, borderRadius: 6, background: centLed, boxShadow: `0 0 8px ${centLed}80`, transition: 'background .5s ease' }}/>
                <div style={{ flex: 1, height: 12, borderRadius: 6, background: botLed,  boxShadow: `0 0 8px ${botLed}80`,  transition: 'background .5s ease' }}/>
              </div>

              {/* 3 capteurs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: ac ? 12 : 0 }}>
                {[
                  { label: 'CENTRE', value: v2Center, color: '#9B8DC8' },
                  { label: 'CÔTÉS',  value: v2Sides,  color: '#85B7EB' },
                  { label: 'BAS',    value: v2Bottom,  color: v2Bottom < 60 ? '#5DCAA5' : '#E24B4A' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '8px 4px', background: 'rgba(255,255,255,.05)', borderRadius: 10 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: s.color, transition: 'color .3s ease' }}>{s.value}</div>
                    <div style={{ fontSize: 8, color: 'rgba(155,141,200,.6)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,.1)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${s.value}%`, height: '100%', borderRadius: 2, background: s.color, transition: 'width .5s ease' }}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alerte */}
              {ac && (
                <div style={{ padding: '10px 12px', background: ac.bg, borderRadius: 10, border: `1px solid ${ac.border}40`, animation: 'fadeIn .3s ease' }}>
                  <p style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{ac.msg}</p>
                </div>
              )}
            </div>
          );
        })()}

        {/* ── ALERTE COACHING ── */}
        <div style={{
          background: 'rgba(255,248,225,.9)',
          borderRadius: 18, padding: '14px 16px',
          marginBottom: 14,
          border: '2px solid rgba(240,180,41,.5)',
          animation: 'coachAlert 2.5s ease-in-out infinite, fadeIn .7s ease-out',
          boxShadow: '0 4px 16px rgba(240,180,41,.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 16 }}>⚡</span>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#E6A817', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Conseil en direct
            </p>
          </div>
          <p style={{ fontSize: 14, color: '#5A4B2A', lineHeight: 1.5 }}>
            Ta respiration est bien synchronisée ! Pense à relâcher les épaules pendant la phase EXPIRE pour maximiser le travail du périnée.
          </p>
        </div>

        {/* ── INSTRUCTIONS EXERCICE ── */}
        <div style={{
          background: 'rgba(255,255,255,.85)',
          borderRadius: 20, padding: '18px 18px',
          marginBottom: 20,
          boxShadow: '0 4px 18px rgba(74,54,105,.09)',
          animation: 'fadeIn .75s ease-out',
        }}>
          <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            🏋️ Pont fessier — Instructions
          </p>
          {STEPS.map(s => (
            <div key={s.num} style={{ display: 'flex', gap: 12, marginBottom: s.num < STEPS.length ? 12 : 0, alignItems: 'flex-start' }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff',
                boxShadow: '0 3px 8px rgba(123,107,168,.35)',
              }}>
                {s.num}
              </div>
              <p style={{ fontSize: 13, color: '#1A1030', lineHeight: 1.55, paddingTop: 3 }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── CONTRÔLES ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
          marginBottom: 16,
        }}>
          {/* Précédent */}
          <button
            onClick={() => navigate('/home')}
            style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'rgba(255,255,255,.85)',
              border: '1.5px solid rgba(155,141,200,.3)',
              boxShadow: '0 4px 14px rgba(74,54,105,.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, color: '#7B6BA8', cursor: 'pointer',
            }}
          >
            ⏮
          </button>

          {/* Pause / Play */}
          <button
            onClick={handlePausePlay}
            style={{
              width: 76, height: 76, borderRadius: '50%',
              background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
              border: 'none',
              boxShadow: '0 10px 32px rgba(123,107,168,.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, color: '#fff', cursor: 'pointer',
              transition: 'transform .15s ease, box-shadow .15s ease',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(.94)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onTouchStart={e => e.currentTarget.style.transform = 'scale(.94)'}
            onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Micro toggle */}
          <button
            onClick={() => {
              const next = !voiceOn;
              setVoiceOn(next);
              voiceEnabledRef.current = next;
              localStorage.setItem('sensia_voice', String(next));
              if (!next) window.speechSynthesis && window.speechSynthesis.cancel();
              else speak('Guidage vocal activé');
            }}
            style={{
              width: 54, height: 54, borderRadius: '50%',
              background: voiceOn ? 'rgba(123,94,167,.18)' : 'rgba(255,255,255,.85)',
              border: voiceOn ? '1.5px solid rgba(123,94,167,.4)' : '1.5px solid rgba(155,141,200,.3)',
              boxShadow: '0 4px 14px rgba(74,54,105,.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, cursor: 'pointer', position: 'relative',
            }}
          >
            <span style={{ opacity: voiceOn ? 1 : 0.35 }}>🎙️</span>
            {!voiceOn && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 30, height: 2, background: '#E24B4A', borderRadius: 2, transform: 'translate(-50%, -50%) rotate(-45deg)' }} />
            )}
          </button>

          {/* Suivant */}
          <button
            onClick={() => {
              const next = (phaseIdx + 1) % PHASES.length;
              applyPhase(next);
            }}
            style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'rgba(255,255,255,.85)',
              border: '1.5px solid rgba(155,141,200,.3)',
              boxShadow: '0 4px 14px rgba(74,54,105,.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, color: '#7B6BA8', cursor: 'pointer',
            }}
          >
            ⏭
          </button>
        </div>

        {/* Cycles info */}
        {isPlaying && (
          <p style={{ textAlign: 'center', fontSize: 12, color: '#9B8DC8', fontWeight: 600, marginBottom: 8 }}>
            🌀 Cycle {cycles + 1} — {fmt(Math.floor(totalElapsed / 60))}:{fmt(totalElapsed % 60)} écoulées
          </p>
        )}
        {!isPlaying && (
          <p style={{ textAlign: 'center', fontSize: 13, color: '#9B8DC8', fontWeight: 500 }}>
            Appuie sur ▶ pour démarrer la séance
          </p>
        )}

        {/* Bouton analyse ceinture */}
        {totalElapsed > 30 && (
          <button
            onClick={() => navigate('/session-analysis')}
            style={{ width: '100%', marginTop: 12, padding: '14px', borderRadius: 50, border: '1.5px solid rgba(123,94,167,.4)', cursor: 'pointer', background: 'rgba(123,94,167,.08)', color: '#7B5EA7', fontSize: 14, fontWeight: 700 }}
          >
            🔍 Voir l'analyse ceinture
          </button>
        )}

      </div>

      <BottomNav />
    </div>
  );
}
