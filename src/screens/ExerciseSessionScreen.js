import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { getExerciseById, DIFF_META, getCategoryMeta } from '../data/exercises';

export default function ExerciseSessionScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const ex = getExerciseById(id);
  const fromState = location.state || {};
  const catMeta = ex ? getCategoryMeta(ex.category) : null;

  /* ── État session ── */
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [isStarted,      setIsStarted]      = useState(false);
  const [isFinished,     setIsFinished]     = useState(false);
  const [phaseIdx,       setPhaseIdx]       = useState(0);
  const [phaseRem,       setPhaseRem]       = useState(0);
  const [circleScale,    setCircleScale]    = useState(1.0);
  const [circleTrans,    setCircleTrans]    = useState('transform .4s ease');
  const [circleColor,    setCircleColor]    = useState('');
  const [circleBorder,   setCircleBorder]   = useState('');
  const [circleGlow,     setCircleGlow]     = useState('');
  const [barWidth,       setBarWidth]       = useState('0%');
  const [barTrans,       setBarTrans]       = useState('width .3s ease');
  const [coachText,      setCoachText]      = useState('');

  /* ── Compteurs reps/sets ── */
  const [currentSet,  setCurrentSet]  = useState(1);
  const [currentRep,  setCurrentRep]  = useState(1);
  const [restMode,    setRestMode]    = useState(false);
  const [restRem,     setRestRem]     = useState(0);

  /* ── Scores simulés ── */
  const [scores, setScores] = useState({ resp: 8.0, gainage: 74, perinee: 86 });

  /* ── Refs ── */
  const phaseIdxRef   = useRef(0);
  const phaseRemRef   = useRef(0);
  const isPlayingRef  = useRef(false);
  const restModeRef   = useRef(false);
  const restRemRef    = useRef(0);

  const phases = ex?.phases || [];

  /* ── Appliquer une phase ── */
  const applyPhase = useCallback((idx) => {
    if (!ex) return;
    const p = phases[idx];
    phaseIdxRef.current = idx;
    phaseRemRef.current = p.duration;
    setPhaseIdx(idx);
    setPhaseRem(p.duration);
    setCoachText(p.cue);
    setCircleColor(`${p.beltLed}40`);
    setCircleBorder(p.beltLed);
    setCircleGlow(`0 0 40px ${p.beltLed}50`);

    const dur = p.duration;
    if (p.barDir === 'fill') {
      setCircleScale(p.scale);
      setCircleTrans(`transform ${dur}s cubic-bezier(.4,0,.2,1)`);
      setBarWidth('100%');
      setBarTrans(`width ${dur}s linear`);
    } else if (p.barDir === 'empty') {
      setCircleScale(p.scale);
      setCircleTrans(`transform ${dur}s cubic-bezier(.4,0,.2,1)`);
      setBarWidth('0%');
      setBarTrans(`width ${dur}s linear`);
    } else if (p.barDir === 'hold-full') {
      setCircleScale(p.scale);
      setCircleTrans('transform .3s ease');
      setBarWidth('100%');
      setBarTrans('width .3s ease');
    } else {
      setCircleScale(p.scale);
      setCircleTrans('transform .3s ease');
      setBarWidth('0%');
      setBarTrans('width .3s ease');
    }
  }, [ex, phases]);

  /* ── Avancer le compteur rep/set ── */
  const advanceRep = useCallback(() => {
    if (!ex) return;
    const nextRep = currentRep + 1;
    if (nextRep > ex.reps) {
      // Fin d'un set → repos entre sets
      const nextSet = currentSet + 1;
      if (nextSet > ex.sets) {
        // Fin de l'exercice
        isPlayingRef.current = false;
        setIsPlaying(false);
        setIsFinished(true);
        return;
      }
      // Repos avant prochain set
      restModeRef.current = true;
      restRemRef.current = ex.restSec || 60;
      setRestMode(true);
      setRestRem(ex.restSec || 60);
      setCurrentSet(nextSet);
      setCurrentRep(1);
    } else {
      setCurrentRep(nextRep);
      applyPhase(0); // restart cycle pour la prochaine rep
    }
  }, [ex, currentRep, currentSet, applyPhase]);

  /* ── Timer principal (1s) ── */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPlayingRef.current) return;

      // Mode repos entre sets
      if (restModeRef.current) {
        restRemRef.current -= 1;
        setRestRem(restRemRef.current);
        if (restRemRef.current <= 0) {
          restModeRef.current = false;
          setRestMode(false);
          applyPhase(0);
        }
        return;
      }

      // Décompte phase
      phaseRemRef.current -= 1;
      setPhaseRem(phaseRemRef.current);

      if (phaseRemRef.current <= 0) {
        const nextPhase = (phaseIdxRef.current + 1) % phases.length;
        if (nextPhase === 0) {
          // Un cycle complet = une rep
          advanceRep();
        } else {
          applyPhase(nextPhase);
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [applyPhase, advanceRep, phases.length]);

  /* ── Scores simulés ── */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPlayingRef.current) return;
      setScores(p => ({
        resp:    +Math.min(10,  Math.max(5.5, p.resp    + (Math.random() - 0.4) * 0.5)).toFixed(1),
        gainage: Math.round(Math.min(100, Math.max(55, p.gainage + (Math.random() - 0.35) * 4))),
        perinee: Math.round(Math.min(100, Math.max(70, p.perinee + (Math.random() - 0.38) * 3))),
      }));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setCurrentSet(1);
    setCurrentRep(1);
    setIsFinished(false);
    applyPhase(0);
    isPlayingRef.current = true;
    setIsPlaying(true);
  };

  const handlePausePlay = () => {
    if (!isStarted) { handleStart(); return; }
    isPlayingRef.current = !isPlayingRef.current;
    setIsPlaying(v => !v);
  };

  const goBack = () => {
    if (fromState.fromProgram) navigate('/program');
    else if (fromState.fromMySession) navigate('/my-session');
    else navigate(-1);
  };

  const currentPhase = phases[phaseIdx];
  const diffInfo = ex ? DIFF_META[ex.diff] : null;

  const scoreColor = (v, max) => {
    const p = v / max;
    return p >= 0.85 ? '#3DD68C' : p >= 0.65 ? '#F0B429' : '#FF7B7B';
  };

  if (!ex) return (
    <div style={{ minHeight: '100vh', background: '#F5EFE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#9B8DC8' }}>Exercice introuvable</p>
    </div>
  );

  /* ── Écran résultat ── */
  if (isFinished) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(165deg,#4A3669 0%,#2D1F4A 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', gap: 24, paddingBottom: 90 }}>
      <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(61,214,140,.2)', border: '2px solid rgba(61,214,140,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, animation: 'float 3s ease-in-out infinite' }}>
        ✨
      </div>
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 38, color: '#fff', fontWeight: 400, marginBottom: 10 }}>Bravo !</h2>
        <p style={{ fontSize: 16, color: 'rgba(155,141,200,.8)', fontStyle: 'italic', maxWidth: 280 }}>
          {ex.sets} séries de {ex.name} terminées. Ton périnée est plus fort ! 💜
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: '100%' }}>
        {[
          { label: 'Séries', value: ex.sets,  icon: '🔁' },
          { label: 'Reps',   value: ex.reps * ex.sets, icon: '💪' },
          { label: 'Resp',   value: `${scores.resp}/10`, icon: '🌬️' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,.1)', borderRadius: 16, padding: '16px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#fff' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'rgba(155,141,200,.7)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Prochain exercice de la queue */}
      {fromState.exerciseQueue && fromState.exerciseQueue.length > 1 && (() => {
        const idx = fromState.exerciseQueue.indexOf(id);
        const nextId = idx >= 0 && idx < fromState.exerciseQueue.length - 1 ? fromState.exerciseQueue[idx + 1] : null;
        const nextEx = nextId ? getExerciseById(nextId) : null;
        return nextEx ? (
          <button onClick={() => navigate(`/exercise/${nextId}`, { state: { ...fromState } })} style={{ width: '100%', padding: '18px', borderRadius: 50, background: 'linear-gradient(135deg,#F0B429,#E6A817)', color: '#1A1030', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 26px rgba(240,180,41,.4)', border: 'none', cursor: 'pointer' }}>
            Exercice suivant : {nextEx.emoji} {nextEx.name}
          </button>
        ) : null;
      })()}

      <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'rgba(155,141,200,.8)', fontSize: 15, cursor: 'pointer' }}>
        ← Retour
      </button>
      <BottomNav />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F5EFE6', paddingBottom: 90 }}>

      {/* ── HEADER ── */}
      <div style={{ padding: '52px 20px 14px', background: 'linear-gradient(175deg,#F0EDF8,#F5EFE6)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={goBack} style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(155,141,200,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#7B6BA8', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
          ←
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: '#1A1030', fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {ex.emoji} {ex.name}
          </h2>
          <p style={{ fontSize: 12, color: '#9B8DC8' }}>{catMeta?.label} · {diffInfo?.label}</p>
        </div>
        {/* BT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(61,214,140,.12)', border: '1px solid rgba(61,214,140,.3)', borderRadius: 50, padding: '5px 10px', flexShrink: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3DD68C', animation: 'ledGreen 1.5s infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#3DD68C' }}>BT</span>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>

        {/* ── Compteur set/rep ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,.85)', borderRadius: 16, padding: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(74,54,105,.08)' }}>
            <div style={{ fontSize: 10, color: '#9B8DC8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Série</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#4A3669' }}>{currentSet}<span style={{ fontSize: 14, color: '#9B8DC8' }}>/{ex.sets}</span></div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,.85)', borderRadius: 16, padding: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(74,54,105,.08)' }}>
            <div style={{ fontSize: 10, color: '#9B8DC8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Répétition</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#4A3669' }}>{currentRep}<span style={{ fontSize: 14, color: '#9B8DC8' }}>/{ex.reps}</span></div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,.85)', borderRadius: 16, padding: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(74,54,105,.08)' }}>
            <div style={{ fontSize: 10, color: '#9B8DC8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Progrès</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#4A3669' }}>
              {Math.round(((currentSet - 1) * ex.reps + currentRep - 1) / (ex.sets * ex.reps) * 100)}
              <span style={{ fontSize: 14, color: '#9B8DC8' }}>%</span>
            </div>
          </div>
        </div>

        {/* ── BLOC PRINCIPAL ── */}
        <div style={{
          borderRadius: 28,
          background: restMode ? 'linear-gradient(165deg,#1A3A2A 0%,#0D2518 100%)' : 'linear-gradient(165deg,#4A3669 0%,#2D1F4A 100%)',
          padding: '24px 20px 20px',
          marginBottom: 12,
          boxShadow: '0 14px 45px rgba(45,31,74,.5)',
          position: 'relative', overflow: 'hidden',
          transition: 'background 1s ease',
        }}>
          {[180,130].map((s,i) => (
            <div key={i} style={{ position: 'absolute', top: -s/3, right: -s/3, width: s, height: s, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)', pointerEvents: 'none' }}/>
          ))}

          {restMode ? (
            /* REPOS entre sets */
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <p style={{ fontSize: 11, color: 'rgba(61,214,140,.8)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>REPOS</p>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 72, color: '#fff', lineHeight: 1, marginBottom: 8 }}>{restRem}</div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.7)', fontStyle: 'italic' }}>Récupère bien avant la série {currentSet}</p>
              <div style={{ height: 6, background: 'rgba(255,255,255,.1)', borderRadius: 3, overflow: 'hidden', marginTop: 16 }}>
                <div style={{ height: '100%', background: '#3DD68C', borderRadius: 3, width: `${(restRem / (ex.restSec || 60)) * 100}%`, transition: 'width 1s linear' }} />
              </div>
            </div>
          ) : (
            <>
              {/* Phase label */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <p style={{ fontSize: 10, color: 'rgba(155,141,200,.65)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 3 }}>Phase</p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: '#fff', fontWeight: 400, letterSpacing: '0.06em', transition: 'color .5s' }}>
                    {isStarted && currentPhase ? currentPhase.label : 'PRÊT ?'}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 44, color: '#fff', lineHeight: 1 }}>
                    {isStarted ? phaseRem : '–'}
                  </div>
                  <p style={{ fontSize: 10, color: 'rgba(155,141,200,.65)', textTransform: 'uppercase' }}>sec</p>
                </div>
              </div>

              {/* Cercle */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                {[190,155].map((s,i) => (
                  <div key={i} style={{ position: 'absolute', width: s, height: s, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)', pointerEvents: 'none' }}/>
                ))}
                <div style={{
                  width: 110, height: 110, borderRadius: '50%', position: 'relative', zIndex: 1,
                  background: isStarted ? `radial-gradient(circle,${circleColor} 0%,rgba(74,54,105,.1) 100%)` : 'radial-gradient(circle,rgba(155,141,200,.2) 0%,rgba(74,54,105,.1) 100%)',
                  border: `2.5px solid ${isStarted ? circleBorder : 'rgba(155,141,200,.4)'}`,
                  boxShadow: isStarted ? circleGlow : 'none',
                  transform: `scale(${circleScale})`,
                  transition: circleTrans,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isStarted && currentPhase && (
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: currentPhase.beltLed, boxShadow: `0 0 10px ${currentPhase.beltLed}`, marginBottom: 4, transition: 'background .5s' }} />
                  )}
                  <span style={{ fontSize: isStarted ? 8 : 22, color: isStarted ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.4)', textAlign: 'center' }}>
                    {isStarted ? (currentPhase?.beltLabel || '') : ex.emoji}
                  </span>
                </div>
              </div>

              {/* Barre respiration */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ height: 7, background: 'rgba(255,255,255,.1)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: barWidth, transition: barTrans, background: isStarted ? `linear-gradient(90deg,${circleColor},${circleBorder}90)` : 'rgba(155,141,200,.3)', borderRadius: 4 }} />
                </div>
              </div>

              {/* Texte coach */}
              <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,.1)', textAlign: 'center' }}>
                {(isStarted && coachText ? coachText : ex.phases[0]?.cue || '').split('\n').map((line, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: 'rgba(255,255,255,.9)', fontStyle: 'italic', lineHeight: 1.5, transition: 'all .5s ease' }}>
                    {line}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── SCORES ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
          {[
            { label: 'Respiration', value: scores.resp,    max: 10,  unit: '/10',  icon: '🌬️' },
            { label: 'Gainage',     value: scores.gainage, max: 100, unit: '/100', icon: '💪' },
            { label: 'Périnée',     value: scores.perinee, max: 100, unit: '/100', icon: '💜' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,.85)', borderRadius: 16, padding: '12px 8px', textAlign: 'center', boxShadow: '0 2px 10px rgba(74,54,105,.08)' }}>
              <div style={{ fontSize: 16, marginBottom: 3 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: scoreColor(s.value, s.max), lineHeight: 1, marginBottom: 2 }}>
                {s.value}<span style={{ fontSize: 10, opacity: .6 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 9, color: '#9B8DC8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5 }}>
                {s.label}
              </div>
              <div style={{ height: 3, background: 'rgba(155,141,200,.15)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(s.value / s.max) * 100}%`, background: scoreColor(s.value, s.max), borderRadius: 2, transition: 'width .5s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── INSTRUCTIONS (accordéon léger) ── */}
        <div style={{ background: 'rgba(255,255,255,.85)', borderRadius: 20, padding: '16px 16px', marginBottom: 14, boxShadow: '0 2px 12px rgba(74,54,105,.08)' }}>
          <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            {ex.emoji} Instructions
          </p>
          {ex.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < ex.steps.length - 1 ? 10 : 0, alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', boxShadow: '0 2px 6px rgba(123,107,168,.3)' }}>
                {i + 1}
              </div>
              <p style={{ fontSize: 13, color: '#1A1030', lineHeight: 1.55, paddingTop: 2 }}>{step}</p>
            </div>
          ))}
        </div>

        {/* Signal ceinture */}
        <div style={{ background: 'rgba(255,255,255,.7)', borderRadius: 16, padding: '12px 16px', marginBottom: 16, border: '1px solid rgba(232,228,240,.8)' }}>
          <p style={{ fontSize: 10, color: '#9B8DC8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            📡 Signal ceinture
          </p>
          <p style={{ fontSize: 12, color: '#5A4B7A' }}>{ex.beltFeedback}</p>
        </div>

        {/* ── CONTRÔLES ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginBottom: 16 }}>
          <button onClick={goBack} style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.85)', border: '1.5px solid rgba(155,141,200,.3)', boxShadow: '0 4px 14px rgba(74,54,105,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#7B6BA8', cursor: 'pointer' }}>
            ⏮
          </button>

          <button
            onClick={handlePausePlay}
            style={{
              width: 74, height: 74, borderRadius: '50%',
              background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
              border: 'none', boxShadow: '0 10px 32px rgba(123,107,168,.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, color: '#fff', cursor: 'pointer',
              transition: 'transform .15s',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(.93)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onTouchStart={e => e.currentTarget.style.transform = 'scale(.93)'}
            onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isPlaying ? '⏸' : isStarted ? '▶' : '▶'}
          </button>

          <button onClick={() => advanceRep()} style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.85)', border: '1.5px solid rgba(155,141,200,.3)', boxShadow: '0 4px 14px rgba(74,54,105,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#7B6BA8', cursor: 'pointer' }}>
            ⏭
          </button>
        </div>

        {!isStarted && (
          <p style={{ textAlign: 'center', fontSize: 13, color: '#9B8DC8', fontWeight: 500, marginBottom: 8 }}>
            Appuie sur ▶ pour démarrer — la ceinture SENSIA prendra le relais
          </p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
