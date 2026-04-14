import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CATEGORIES, EXERCISES, DIFF_META, getCategoryMeta } from '../data/exercises';
import { getExerciseImage } from '../data/exerciseImages';
import { useProfile } from '../context/ProfileContext';
import { isExerciseRestricted } from '../data/profiles';

const FILTER_ALL = 'all';
const FILTERS = [
  { id: FILTER_ALL, label: 'Tous', emoji: '✨' },
  ...CATEGORIES.map(c => ({ id: c.id, label: c.label, emoji: c.emoji })),
];


// Exercices lourds qui nécessitent analyse ceinture (intermédiaire)
const HEAVY_LIFTS = ['squat', 'squat_barre', 'squat_goblet', 'squat_sumo_barre', 'rdl_barre', 'deadlift', 'hip_thrust', 'hip_thrust_uni', 'leg_press', 'hack_squat'];

// Charges suggérées pour débutante par catégorie/exercice
const BEGINNER_WEIGHTS = {
  squat: '0 kg (poids du corps)', squat_goblet: '4–8 kg', squat_barre: '20 kg (barre vide)',
  lunge: '0 kg (poids du corps)', bulgarian_split: '2–5 kg',
  hip_thrust: '20 kg (barre vide)', glute_bridge_w: '4–8 kg', glute_bridge: '0 kg',
  bench_press_bar: '20 kg (barre vide)', push_up_weighted: '0 kg (pompes normales)',
  barbell_row: '20 kg (barre vide)', bicep_curl: '2–5 kg', lateral_raise: '2–4 kg',
  rdl_barre: '20 kg (barre vide)', leg_press: '30–40 kg machine',
  default: '2–5 kg pour commencer',
};

// Exercices modérés à précaution pour profil injured (ni contre-indiqués ni totalement sûrs)
const INJURED_CAUTION = ['squat', 'squat_goblet', 'lunge', 'glute_bridge_w', 'glute_bridge', 'lateral_lunge', 'sumo_squat', 'kegel_standing', 'kegel_squat'];

export default function MySessionScreen() {
  const navigate = useNavigate();
  const { profileId } = useProfile();
  const [filter,       setFilter]      = useState(FILTER_ALL);
  const [selectedEx,   setSelectedEx]  = useState(null);
  const [builderMode,  setBuilderMode] = useState(false);
  const [builderList,  setBuilderList] = useState([]);
  const [checklist,    setChecklist]   = useState({});

  // Player state
  const [playerActive, setPlayerActive] = useState(false);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [phaseIdx,     setPhaseIdx]     = useState(0);
  const [phaseRem,     setPhaseRem]     = useState(0);
  const [scale,        setScale]        = useState(1.0);
  const phaseRef  = useRef(0);
  const remRef    = useRef(0);
  const playRef   = useRef(false);
  const timerRef  = useRef(null);

  const filtered = filter === FILTER_ALL
    ? EXERCISES
    : EXERCISES.filter(e => e.category === filter);

  /* ── Session builder helpers ── */
  const toggleBuilder = (ex) => {
    setBuilderList(prev =>
      prev.includes(ex.id)
        ? prev.filter(id => id !== ex.id)
        : [...prev, ex.id]
    );
  };
  const builderTotalMin = Math.round(
    builderList.reduce((acc, id) => {
      const ex = EXERCISES.find(e => e.id === id);
      if (!ex) return acc;
      const m = parseInt(ex.duration) || 12;
      return acc + m;
    }, 0)
  );

  const startBuilderSession = () => {
    if (builderList.length === 0) return;
    const [first, ...rest] = builderList;
    navigate(`/exercise/${first}`, {
      state: { fromMySession: true, exerciseQueue: [first, ...rest] },
    });
  };

  /* ── Player timer ── */
  useEffect(() => {
    if (!playerActive || !selectedEx) return;
    if (isPlaying) startTimer();
    else stopTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playerActive, selectedEx]);

  const startTimer = () => {
    stopTimer();
    playRef.current = true;
    const tick = () => {
      if (!playRef.current) return;
      const phases = selectedEx?.phases || [];
      if (phases.length === 0) return;
      remRef.current -= 1;
      if (remRef.current <= 0) {
        const next = (phaseRef.current + 1) % phases.length;
        phaseRef.current = next;
        remRef.current = phases[next].duration;
        setPhaseIdx(next);
        setScale(phases[next].scale);
      }
      setPhaseRem(remRef.current);
      timerRef.current = setTimeout(tick, 1000);
    };
    const phases = selectedEx?.phases || [];
    if (phases.length === 0) return;
    remRef.current = phases[phaseRef.current].duration;
    setPhaseRem(remRef.current);
    setScale(phases[phaseRef.current].scale);
    timerRef.current = setTimeout(tick, 1000);
  };

  const stopTimer = () => {
    playRef.current = false;
    clearTimeout(timerRef.current);
  };

  const openExercise = (ex) => {
    setSelectedEx(ex);
    setPlayerActive(false);
    setIsPlaying(false);
    phaseRef.current = 0;
    remRef.current = ex.phases[0]?.duration || 4;
    setPhaseIdx(0);
    setPhaseRem(ex.phases[0]?.duration || 4);
    setScale(1.0);
    stopTimer();
  };

  const closeExercise = () => {
    stopTimer();
    setSelectedEx(null);
    setPlayerActive(false);
    setIsPlaying(false);
  };

  const launchPlayer = () => {
    setPlayerActive(true);
    setIsPlaying(true);
    phaseRef.current = 0;
    remRef.current = selectedEx.phases[0]?.duration || 4;
    setPhaseIdx(0);
    setPhaseRem(selectedEx.phases[0]?.duration || 4);
    setScale(selectedEx.phases[0]?.scale || 1.0);
  };

  const goToExerciseScreen = () => {
    navigate(`/exercise/${selectedEx.id}`, { state: { fromMySession: true } });
  };

  /* ── Current phase data ── */
  const phase = selectedEx?.phases?.[phaseIdx] || null;
  const catMeta = selectedEx ? getCategoryMeta(selectedEx.category) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', paddingBottom: 100, fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: '52px 20px 16px',
        background: 'linear-gradient(175deg,#F0EDF8 0%,#F3EDE5 100%)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 0 rgba(155,141,200,.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#1A1030', fontWeight: 400 }}>
              Ma Séance
            </h1>
            <p style={{ fontSize: 13, color: '#9B8DC8', marginTop: 2 }}>
              {filtered.length} exercices disponibles
            </p>
          </div>
          <button
            onClick={() => { setBuilderMode(b => !b); setBuilderList([]); }}
            style={{
              padding: '8px 16px', borderRadius: 50, border: 'none', cursor: 'pointer',
              background: builderMode ? '#7B5EA7' : 'rgba(123,94,167,.12)',
              color: builderMode ? '#fff' : '#7B5EA7',
              fontSize: 13, fontWeight: 600, transition: 'all .2s',
            }}
          >
            {builderMode ? '✕ Annuler' : '+ Ma séance'}
          </button>
        </div>

        {/* Filter bar */}
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
          scrollbarWidth: 'none', WebkitScrollbar: 'none',
          msOverflowStyle: 'none',
        }}>
          {FILTERS.map(f => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  flexShrink: 0, padding: '7px 14px', borderRadius: 50,
                  background: active ? '#7B5EA7' : '#EDE6F4',
                  color: active ? '#fff' : '#7B5EA7',
                  border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  transition: 'all .18s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {f.emoji} {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── EXERCISE GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '16px 14px 0' }}>
        {filtered.map(ex => {
          const cat = getCategoryMeta(ex.category);
          const isSelected = builderList.includes(ex.id);
          const diffInfo = DIFF_META[ex.diff];
          return (
            <div
              key={ex.id}
              onClick={() => builderMode ? toggleBuilder(ex) : openExercise(ex)}
              style={{
                borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                background: '#fff',
                border: isSelected ? '2.5px solid #7B5EA7' : '1.5px solid rgba(232,228,240,.7)',
                boxShadow: isSelected
                  ? '0 4px 20px rgba(123,94,167,.25)'
                  : '0 2px 12px rgba(74,54,105,.07)',
                transition: 'all .2s ease',
                position: 'relative',
              }}
            >
              {/* Exercise image */}
              <div style={{ width: '100%', height: 110, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={getExerciseImage(ex.id)}
                  alt={ex.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.4) 100%)',
                }} />
                {/* Category emoji */}
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  width: 30, height: 30, borderRadius: 10,
                  background: cat?.bg || '#E8E4F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15,
                }}>
                  {ex.emoji}
                </div>
                {/* Difficulty badge */}
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  padding: '2px 8px', borderRadius: 50,
                  background: diffInfo.bg, border: `1px solid ${diffInfo.color}40`,
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: diffInfo.color }}>{diffInfo.label}</span>
                </div>
                {/* Profile badge */}
                {(() => {
                  const restricted = isExerciseRestricted(ex.id, profileId);
                  if (restricted && profileId === 'postpartum') return (
                    <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '2px 7px', borderRadius: 50, background: 'rgba(224,82,82,.85)' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#fff' }}>Non recommandé</span>
                    </div>
                  );
                  if (restricted && profileId === 'injured') return (
                    <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '2px 7px', borderRadius: 50, background: 'rgba(224,82,82,.85)' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#fff' }}>Contre-indiqué</span>
                    </div>
                  );
                  if (!restricted && profileId === 'postpartum') return (
                    <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '2px 7px', borderRadius: 50, background: 'rgba(74,155,127,.85)' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#fff' }}>Idéal post-partum</span>
                    </div>
                  );
                  if (!restricted && profileId === 'injured' && INJURED_CAUTION.includes(ex.id)) return (
                    <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '2px 7px', borderRadius: 50, background: 'rgba(230,150,50,.9)' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#fff' }}>Avec précaution</span>
                    </div>
                  );
                  if (!restricted && profileId === 'injured' && ex.diff === 'easy') return (
                    <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '2px 7px', borderRadius: 50, background: 'rgba(74,155,127,.85)' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#fff' }}>Recommandé rééducation</span>
                    </div>
                  );
                  if (profileId === 'beginner') return (
                    <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '2px 7px', borderRadius: 50, background: 'rgba(166,137,196,.85)' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#fff' }}>Technique d'abord</span>
                    </div>
                  );
                  return null;
                })()}
                {/* Builder checkmark */}
                {builderMode && (
                  <div style={{
                    position: 'absolute', bottom: 8, right: 8,
                    width: 24, height: 24, borderRadius: '50%',
                    background: isSelected ? '#7B5EA7' : 'rgba(255,255,255,.7)',
                    border: isSelected ? 'none' : '2px solid rgba(123,94,167,.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff',
                    transition: 'all .2s',
                  }}>
                    {isSelected ? '✓' : ''}
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '10px 10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1030', marginBottom: 4, lineHeight: 1.2 }}>
                  {ex.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#9B8DC8' }}>{ex.duration}</span>
                  {ex.category === 'perineum' || ex.phases?.some(p => p.beltLed === '#F0B429') ? (
                    <span style={{ fontSize: 11, color: '#C4986A' }}>♡ périnée</span>
                  ) : (
                    <span style={{ fontSize: 11, color: cat?.color || '#9B8DC8' }}>{ex.sets}×{ex.reps}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BUILDER BAR ── */}
      {builderMode && builderList.length > 0 && (
        <div style={{
          position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)', maxWidth: 398, zIndex: 200,
          background: 'linear-gradient(135deg,#4A3669,#2D1F4A)',
          borderRadius: 20, padding: '14px 18px',
          boxShadow: '0 8px 30px rgba(45,31,74,.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
              {builderList.length} exercice{builderList.length > 1 ? 's' : ''}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(155,141,200,.8)' }}>
              ~{builderTotalMin} min estimées
            </div>
          </div>
          <button
            onClick={startBuilderSession}
            style={{
              padding: '12px 22px', borderRadius: 50, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#C4986A,#E8B47E)',
              color: '#fff', fontSize: 14, fontWeight: 700,
              boxShadow: '0 4px 14px rgba(196,152,106,.4)',
            }}
          >
            ▶ Lancer la séance
          </button>
        </div>
      )}

      {/* ── EXERCISE DETAIL MODAL ── */}
      {selectedEx && !playerActive && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(26,16,48,.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'flex-end',
          }}
          onClick={closeExercise}
        >
          <div
            style={{
              width: '100%', maxWidth: 430, margin: '0 auto',
              background: '#F3EDE5', borderRadius: '28px 28px 0 0',
              maxHeight: '92vh', overflowY: 'auto',
              padding: '8px 20px 40px',
              animation: 'slideUp .3s ease-out',
              fontFamily: "'DM Sans', sans-serif",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div style={{ width: 36, height: 4, background: 'rgba(155,141,200,.4)', borderRadius: 2, margin: '12px auto 18px' }} />

            {/* Exercise header with image */}
            <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 16, position: 'relative', height: 160 }}>
              <img
                src={getExerciseImage(selectedEx.id)}
                alt={selectedEx.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.background = catMeta?.bg; e.target.style.display = 'none'; }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,.15) 0%, rgba(0,0,0,.6) 100%)',
                display: 'flex', alignItems: 'flex-end', padding: 16,
              }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#fff', fontWeight: 400, lineHeight: 1.1 }}>
                    {selectedEx.name}
                  </h2>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: DIFF_META[selectedEx.diff].color,
                      background: 'rgba(0,0,0,.4)',
                      borderRadius: 50, padding: '3px 10px',
                    }}>
                      {DIFF_META[selectedEx.diff].label}
                    </span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,.8)' }}>
                      {selectedEx.sets} séries · {selectedEx.reps} reps · {selectedEx.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: 14, color: '#5A4B7A', lineHeight: 1.65, marginBottom: 16 }}>
              {selectedEx.description}
            </p>

            {/* Muscles */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {selectedEx.muscles.map(m => (
                <span key={m} style={{
                  fontSize: 12, fontWeight: 600,
                  color: catMeta?.color || '#7B6BA8',
                  background: catMeta?.bg || '#E8E4F0',
                  borderRadius: 50, padding: '4px 12px',
                }}>
                  {m}
                </span>
              ))}
            </div>

            {/* Breathing phases */}
            <div style={{ background: 'rgba(255,255,255,.85)', borderRadius: 18, padding: '16px', marginBottom: 14, boxShadow: '0 2px 10px rgba(74,54,105,.07)' }}>
              <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                Guidage respiratoire & ceinture
              </p>
              {selectedEx.phases.map((ph, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < selectedEx.phases.length - 1 ? 10 : 0 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                    background: ph.beltLed, boxShadow: `0 0 6px ${ph.beltLed}`,
                  }} />
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#4A3669', marginRight: 6 }}>
                      {ph.label} ({ph.duration}s)
                    </span>
                    <span style={{ fontSize: 12, color: '#7A7490' }}>— {ph.cue.replace('\n', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Steps */}
            <div style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                Instructions
              </p>
              {selectedEx.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#fff',
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 13, color: '#1A1030', lineHeight: 1.55, paddingTop: 3 }}>{step}</p>
                </div>
              ))}
            </div>

            {/* Errors */}
            <div style={{ background: 'rgba(240,180,41,.1)', borderRadius: 16, padding: '14px 16px', marginBottom: 20, border: '1px solid rgba(240,180,41,.3)' }}>
              <p style={{ fontSize: 11, color: '#E6A817', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                ⚠️ Erreurs fréquentes
              </p>
              {selectedEx.errors.map((err, i) => (
                <p key={i} style={{ fontSize: 13, color: '#5A4B2A', marginBottom: i < selectedEx.errors.length - 1 ? 4 : 0 }}>
                  · {err}
                </p>
              ))}
            </div>

            {/* ── SECTION PÉRINÉE ESSENTIEL (periSync === 2, tous profils) ── */}
            {selectedEx.periSync === 2 && (
              <div style={{ background: 'linear-gradient(135deg,#F0EAF8,#E8E0F4)', borderRadius: 16, padding: '14px 16px', marginBottom: 16, border: '1.5px solid #9B8DC850' }}>
                <p style={{ fontSize: 11, color: '#7B5EA7', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  💜 Pourquoi le périnée est essentiel ici
                </p>
                <p style={{ fontSize: 13, color: '#4A3669', lineHeight: 1.6 }}>
                  Cet exercice sollicite directement le plancher pelvien. La synchronisation périnée-respiration est <strong>indispensable</strong> : expirer à l'effort permet au périnée de remonter naturellement et de protéger les organes pelviens. Sans cette coordination, la pression vers le bas peut fragiliser le périnée sur le long terme.
                </p>
                <p style={{ fontSize: 12, color: '#9B8DC8', marginTop: 8, fontWeight: 600 }}>
                  ♡♡ Ceinture SENSIA en mode actif — LED violette guide la synchronisation
                </p>
              </div>
            )}

            {/* ── SECTION DÉBUTANTE : Checklist + Charges ── */}
            {profileId === 'beginner' && (
              <>
                <div style={{ background: '#EDE6F4', borderRadius: 16, padding: '14px 16px', marginBottom: 14, border: '1.5px solid #A689C440' }}>
                  <p style={{ fontSize: 11, color: '#A689C4', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                    ✅ Checklist technique avant de commencer
                  </p>
                  {[
                    'Dos droit et gainé',
                    'Respiration prête (inspire avant, expire pendant l\'effort)',
                    'Périnée conscient',
                    'Genoux alignés avec les orteils',
                    'Poids adaptés à ton niveau',
                  ].map((item, i) => {
                    const key = `${selectedEx.id}_${i}`;
                    return (
                      <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                        <div
                          onClick={() => setChecklist(prev => ({ ...prev, [key]: !prev[key] }))}
                          style={{
                            width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                            border: `2px solid ${checklist[key] ? '#A689C4' : '#C4C0D0'}`,
                            background: checklist[key] ? '#A689C4' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all .2s',
                          }}
                        >
                          {checklist[key] && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13, color: checklist[key] ? '#9B8DC8' : '#4A3669', textDecoration: checklist[key] ? 'line-through' : 'none' }}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div style={{ background: '#F5F0FA', borderRadius: 16, padding: '12px 16px', marginBottom: 16, border: '1px solid #A689C420' }}>
                  <p style={{ fontSize: 11, color: '#A689C4', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                    🏋️ Charge suggérée pour débutante
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#4A3669' }}>
                    {BEGINNER_WEIGHTS[selectedEx.id] || BEGINNER_WEIGHTS.default}
                  </p>
                  <p style={{ fontSize: 12, color: '#9B8DC8', marginTop: 4 }}>Maîtrise la technique avant d'augmenter la charge.</p>
                </div>
              </>
            )}

            {/* ── SECTION INTERMÉDIAIRE : Analyse ceinture pour charges lourdes ── */}
            {profileId === 'intermediate' && HEAVY_LIFTS.includes(selectedEx.id) && (
              <div style={{ background: '#FDF4E8', borderRadius: 16, padding: '14px 16px', marginBottom: 16, border: '1.5px solid #C4986A40' }}>
                <p style={{ fontSize: 11, color: '#C4986A', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  ⌚ Analyse ceinture SENSIA
                </p>
                <p style={{ fontSize: 13, color: '#4A3020', lineHeight: 1.6, marginBottom: 10 }}>
                  La ceinture détecte si tu pousses vers le bas pendant cet exercice. Un blocage respiratoire (Valsalva) sous charge lourde augmente brutalement la pression sur le plancher pelvien.
                </p>
                <div style={{ background: 'rgba(230,150,50,.15)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(230,150,50,.4)' }}>
                  <p style={{ fontSize: 12, color: '#C4986A', fontWeight: 700, margin: 0 }}>
                    ⚠️ Alerte simulée : blocage respiratoire possible
                  </p>
                  <p style={{ fontSize: 12, color: '#7A5020', marginTop: 4, lineHeight: 1.5 }}>
                    Vérifie ta respiration : expire en montant la charge, ne bloque jamais en poussant. La ceinture vibre si elle détecte un blocage.
                  </p>
                </div>
              </div>
            )}

            {/* ── SECTION INJURED : Conseil médical pour exercices à risque ── */}
            {profileId === 'injured' && isExerciseRestricted(selectedEx.id, 'injured') && (
              <div style={{ background: 'rgba(244,192,209,.2)', borderRadius: 16, padding: '14px 16px', marginBottom: 16, border: '1.5px solid #F4C0D1' }}>
                <p style={{ fontSize: 11, color: '#C0607A', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  ⚠️ Conseil médical
                </p>
                <p style={{ fontSize: 13, color: '#8A2040', lineHeight: 1.6 }}>
                  Cet exercice est contre-indiqué en phase de rééducation. Si tu ressens une pression vers le bas, des douleurs ou des fuites pendant l'exercice, <strong>arrête immédiatement</strong> et consulte une kinésithérapeute périnéale.
                </p>
              </div>
            )}
            {profileId === 'injured' && !isExerciseRestricted(selectedEx.id, 'injured') && INJURED_CAUTION.includes(selectedEx.id) && (
              <div style={{ background: 'rgba(230,150,50,.12)', borderRadius: 16, padding: '12px 16px', marginBottom: 16, border: '1px solid rgba(230,150,50,.35)' }}>
                <p style={{ fontSize: 11, color: '#C4986A', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                  ⚠️ À pratiquer avec précaution
                </p>
                <p style={{ fontSize: 13, color: '#6A4020', lineHeight: 1.6 }}>
                  Si tu ressens une pression vers le bas pendant cet exercice, consulte une kinésithérapeute périnéale avant de continuer.
                </p>
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={launchPlayer}
                style={{
                  flex: 1, padding: '16px',
                  borderRadius: 50,
                  background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
                  color: '#fff', fontSize: 15, fontWeight: 700,
                  letterSpacing: '0.03em',
                  boxShadow: '0 8px 26px rgba(123,107,168,.4)',
                  border: 'none', cursor: 'pointer',
                }}
              >
                ▶ Guidage respiratoire
              </button>
              <button
                onClick={goToExerciseScreen}
                style={{
                  padding: '16px 18px',
                  borderRadius: 50,
                  background: 'linear-gradient(135deg,#C4986A,#E8B47E)',
                  color: '#fff', fontSize: 15,
                  boxShadow: '0 8px 26px rgba(196,152,106,.3)',
                  border: 'none', cursor: 'pointer',
                }}
              >
                🏋️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FULL-SCREEN PLAYER ── */}
      {selectedEx && playerActive && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 400,
          background: '#1A1030',
          display: 'flex', flexDirection: 'column',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '52px 20px 16px' }}>
            <button
              onClick={closeExercise}
              style={{ background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: 50, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer' }}
            >
              ← Retour
            </button>
            <div style={{
              padding: '5px 14px', borderRadius: 50,
              background: catMeta ? `${catMeta.color}25` : 'rgba(155,141,200,.2)',
              border: `1px solid ${catMeta?.color || '#9B8DC8'}50`,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: catMeta?.color || '#9B8DC8' }}>
                {catMeta?.emoji} {catMeta?.label}
              </span>
            </div>
          </div>

          {/* Exercise name */}
          <div style={{ textAlign: 'center', padding: '0 24px 8px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: '#fff', fontWeight: 400, lineHeight: 1.15 }}>
              {selectedEx.name}
            </h2>
            <p style={{ fontSize: 12, color: 'rgba(155,141,200,.7)', marginTop: 4 }}>
              {selectedEx.sets} séries · {selectedEx.reps} reps
            </p>
          </div>

          {/* Animated breathing circle */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Outer glow ring */}
            <div style={{
              position: 'absolute',
              width: 220, height: 220, borderRadius: '50%',
              background: `radial-gradient(circle, ${phase?.beltLed || '#8BA7FF'}15 0%, transparent 70%)`,
              transform: `scale(${scale * 1.15})`,
              transition: `transform ${(phase?.duration || 3)}s cubic-bezier(.4,0,.2,1)`,
            }} />
            {/* Main circle */}
            <div style={{
              width: 180, height: 180, borderRadius: '50%',
              background: `radial-gradient(circle, ${phase?.beltLed || '#8BA7FF'}40 0%, ${phase?.beltLed || '#8BA7FF'}15 100%)`,
              border: `2px solid ${phase?.beltLed || '#8BA7FF'}80`,
              boxShadow: `0 0 40px ${phase?.beltLed || '#8BA7FF'}40`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${scale})`,
              transition: `transform ${(phase?.duration || 3)}s cubic-bezier(.4,0,.2,1), background .6s ease, border-color .6s ease, box-shadow .6s ease`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                {phase?.label || '—'}
              </div>
              {/* Circular timer */}
              <CircularTimer rem={phaseRem} total={phase?.duration || 4} color={phase?.beltLed || '#8BA7FF'} />
            </div>

            {/* Phase cue */}
            {phase && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                textAlign: 'center', padding: '0 32px',
              }}>
                {phase.cue.split('\n').map((line, i) => (
                  <p key={i} style={{ fontSize: i === 0 ? 16 : 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#fff' : 'rgba(155,141,200,.8)', marginBottom: 2 }}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Belt sync block */}
          <div style={{
            margin: '0 20px 16px',
            background: 'rgba(255,255,255,.06)', borderRadius: 18,
            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 12, height: 12, borderRadius: '50%',
              background: phase?.beltLed || '#8BA7FF',
              boxShadow: `0 0 10px ${phase?.beltLed || '#8BA7FF'}`,
              animation: 'ledGreen 1.5s ease-in-out infinite',
            }} />
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.9)', fontWeight: 600 }}>
                Ceinture SENSIA • {phase?.beltLabel || 'En attente'}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(155,141,200,.7)' }}>
                {selectedEx.beltFeedback}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div style={{ margin: '0 20px 16px', display: 'flex', gap: 8 }}>
            {selectedEx.steps.slice(0, 3).map((step, i) => (
              <div key={i} style={{
                flex: 1, background: 'rgba(255,255,255,.06)',
                borderRadius: 14, padding: '10px 10px',
                border: '1px solid rgba(255,255,255,.06)',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', marginBottom: 6,
                  background: 'rgba(155,141,200,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#9B8DC8',
                }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,.7)', lineHeight: 1.45 }}>{step}</p>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 20px 40px' }}>
            <button
              onClick={() => {
                phaseRef.current = 0;
                remRef.current = selectedEx.phases[0]?.duration || 4;
                setPhaseIdx(0);
                setPhaseRem(selectedEx.phases[0]?.duration || 4);
                setScale(selectedEx.phases[0]?.scale || 1.0);
              }}
              style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 18 }}
            >
              ⏮
            </button>
            <button
              onClick={() => setIsPlaying(p => !p)}
              style={{
                width: 64, height: 64, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
                color: '#fff', fontSize: 22,
                boxShadow: '0 8px 24px rgba(123,107,168,.5)',
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={goToExerciseScreen}
              style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 18 }}
            >
              ⏭
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

/* ── Circular timer SVG ── */
function CircularTimer({ rem, total, color }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? rem / total : 0;
  const dash = circ * pct;
  return (
    <div style={{ position: 'relative', width: 68, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="68" height="68" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
        <circle
          cx="34" cy="34" r={r} fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s linear' }}
        />
      </svg>
      <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{rem}</span>
    </div>
  );
}
