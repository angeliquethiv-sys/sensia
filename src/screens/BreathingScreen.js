import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const PHASES = [
  { id: 'inhale',  label: 'Inspirez',  instruction: 'Respirez doucement par le nez', duration: 4, scale: 1.38, color: '#9B8DC8', bg: 'rgba(155,141,200,0.15)' },
  { id: 'hold1',   label: 'Retenez',   instruction: 'Gardez l\'air en vous', duration: 4, scale: 1.38, color: '#7B6BA8', bg: 'rgba(123,107,168,0.12)' },
  { id: 'exhale',  label: 'Expirez',   instruction: 'Relâchez tout doucement par la bouche', duration: 6, scale: 1.0, color: '#D4A5A5', bg: 'rgba(212,165,165,0.15)' },
  { id: 'hold2',   label: 'Pause',     instruction: 'Laissez-vous bercer par le silence', duration: 2, scale: 1.0, color: '#C49A9A', bg: 'rgba(196,154,154,0.12)' },
];

const DURATIONS = [
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '15 min', seconds: 900 },
];

const TECHNIQUES = [
  { id: '4-4-6-2', label: '4-4-6-2', subtitle: 'Anti-stress', phases: [4, 4, 6, 2] },
  { id: '4-7-8', label: '4-7-8', subtitle: 'Sommeil', phases: [4, 7, 8, 0] },
  { id: '5-5', label: '5-5', subtitle: 'Équilibre', phases: [5, 0, 5, 0] },
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function BreathingScreen() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseTime, setPhaseTime] = useState(PHASES[0].duration);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[1].seconds);
  const [technique, setTechnique] = useState(TECHNIQUES[0]);
  const [cycles, setCycles] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const phaseIndexRef = useRef(0);
  const phaseTimeRef = useRef(PHASES[0].duration);
  const totalTimeRef = useRef(0);
  const isRunningRef = useRef(false);

  const currentPhase = PHASES[phaseIndex];

  const buildPhases = useCallback((tech) => {
    return PHASES.map((p, i) => ({
      ...p,
      duration: tech.phases[i] || 0,
    })).filter((p) => p.duration > 0);
  }, []);

  const [activePhasesArr, setActivePhasesArr] = useState(() => buildPhases(TECHNIQUES[0]));

  const tick = useCallback(() => {
    if (!isRunningRef.current) return;

    totalTimeRef.current += 1;
    setTotalTime(totalTimeRef.current);

    if (totalTimeRef.current >= selectedDuration) {
      isRunningRef.current = false;
      setIsRunning(false);
      setIsFinished(true);
      return;
    }

    phaseTimeRef.current -= 1;
    if (phaseTimeRef.current <= 0) {
      const nextIndex = (phaseIndexRef.current + 1) % activePhasesArr.length;
      if (nextIndex === 0) setCycles((c) => c + 1);
      phaseIndexRef.current = nextIndex;
      phaseTimeRef.current = activePhasesArr[nextIndex].duration;
      setPhaseIndex(nextIndex);
      setPhaseTime(activePhasesArr[nextIndex].duration);
    } else {
      setPhaseTime(phaseTimeRef.current);
    }
  }, [selectedDuration, activePhasesArr]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const handleStart = () => {
    phaseIndexRef.current = 0;
    phaseTimeRef.current = activePhasesArr[0].duration;
    totalTimeRef.current = 0;
    setPhaseIndex(0);
    setPhaseTime(activePhasesArr[0].duration);
    setTotalTime(0);
    setCycles(0);
    setIsFinished(false);
    setIsStarted(true);
    isRunningRef.current = true;
    setIsRunning(true);
  };

  const handlePause = () => {
    isRunningRef.current = !isRunning;
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    isRunningRef.current = false;
    setIsRunning(false);
    setIsStarted(false);
    setIsFinished(false);
    phaseIndexRef.current = 0;
    phaseTimeRef.current = PHASES[0].duration;
    totalTimeRef.current = 0;
    setPhaseIndex(0);
    setPhaseTime(PHASES[0].duration);
    setTotalTime(0);
    setCycles(0);
  };

  const changeTechnique = (tech) => {
    setTechnique(tech);
    const phases = buildPhases(tech);
    setActivePhasesArr(phases);
    handleStop();
  };

  const progress = totalTime / selectedDuration;

  // Finished screen
  if (isFinished) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #E8E4F0 0%, #F5EFE6 50%, #EDE0D4 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center', gap: '28px',
      paddingBottom: '90px',
    }}>
      <div style={{
        width: '100px', height: '100px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #9B8DC8, #7B6BA8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 16px 50px rgba(123,107,168,0.4)',
        fontSize: '44px', animation: 'float 3s ease-in-out infinite',
      }}>
        ✨
      </div>

      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: '#3D3250', fontWeight: '400' }}>
          Bravo !
        </h2>
        <p style={{ fontSize: '16px', color: '#7A7490', marginTop: '10px', lineHeight: 1.6, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', maxWidth: '280px' }}>
          Vous avez pris soin de vous. Chaque souffle vous rapproche de l'équilibre.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
        {[
          { label: 'Durée', value: formatTime(totalTime), icon: '⏱️' },
          { label: 'Cycles', value: cycles, icon: '🌀' },
        ].map((s) => (
          <div key={s.label} style={{ background: 'rgba(254,254,254,0.8)', borderRadius: '18px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(107,91,149,0.1)' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#6B5B95' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#A89EC0' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <button onClick={handleStop} style={{
        width: '100%', padding: '18px',
        borderRadius: '50px',
        background: 'linear-gradient(135deg, #9B8DC8, #7B6BA8)',
        color: '#FEFEFE', fontSize: '16px', fontWeight: '600',
        boxShadow: '0 8px 25px rgba(123,107,168,0.4)',
        border: 'none', cursor: 'pointer',
      }}>
        Recommencer
      </button>

      <button onClick={() => navigate('/home')} style={{
        background: 'none', border: 'none', color: '#A89EC0', fontSize: '15px', cursor: 'pointer',
      }}>
        Retour à l'accueil
      </button>

      <BottomNav />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: isStarted
        ? `linear-gradient(160deg, ${currentPhase.bg} 0%, #F5EFE6 50%, #EDE0D4 100%)`
        : 'linear-gradient(160deg, #E8E4F0 0%, #F5EFE6 50%, #EDE0D4 100%)',
      transition: 'background 2s ease',
      paddingBottom: '90px',
    }}>

      {/* Header */}
      <div style={{ padding: '56px 24px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', padding: '4px' }}>
          ←
        </button>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#3D3250', fontWeight: '400' }}>
            Respiration guidée
          </h1>
          <p style={{ fontSize: '13px', color: '#A89EC0' }}>Trouvez votre équilibre</p>
        </div>
      </div>

      {!isStarted ? (
        <div style={{ padding: '0 24px' }}>

          {/* Technique selector */}
          <p style={{ fontSize: '12px', color: '#A89EC0', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '600' }}>
            Technique
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
            {TECHNIQUES.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTechnique(t)}
                style={{
                  padding: '16px 10px',
                  borderRadius: '16px',
                  border: technique.id === t.id ? '2px solid #9B8DC8' : '2px solid transparent',
                  background: technique.id === t.id ? 'linear-gradient(135deg, #E8E4F0, #D4CCEB)' : 'rgba(254,254,254,0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: technique.id === t.id ? '0 4px 15px rgba(155,141,200,0.3)' : '0 2px 8px rgba(107,91,149,0.08)',
                }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: technique.id === t.id ? '#6B5B95' : '#7A7490', fontWeight: '500' }}>{t.label}</div>
                <div style={{ fontSize: '11px', color: '#A89EC0', marginTop: '4px' }}>{t.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Duration selector */}
          <p style={{ fontSize: '12px', color: '#A89EC0', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '600' }}>
            Durée
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '32px' }}>
            {DURATIONS.map((d) => (
              <button
                key={d.seconds}
                onClick={() => setSelectedDuration(d.seconds)}
                style={{
                  padding: '14px 8px',
                  borderRadius: '14px',
                  border: selectedDuration === d.seconds ? '2px solid #9B8DC8' : '2px solid transparent',
                  background: selectedDuration === d.seconds ? 'linear-gradient(135deg, #E8E4F0, #D4CCEB)' : 'rgba(254,254,254,0.7)',
                  color: selectedDuration === d.seconds ? '#6B5B95' : '#7A7490',
                  fontSize: '13px', fontWeight: selectedDuration === d.seconds ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedDuration === d.seconds ? '0 4px 12px rgba(155,141,200,0.25)' : '0 2px 6px rgba(107,91,149,0.06)',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Preview circles */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            marginBottom: '36px',
          }}>
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: '160px', height: '160px', borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(155,141,200,0.2), rgba(123,107,168,0.3))',
                border: '2px solid rgba(155,141,200,0.3)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(155,141,200,0.2)',
              }}>
                <span style={{ fontSize: '36px' }}>🌬️</span>
                <p style={{ fontSize: '14px', color: '#9B8DC8', fontWeight: '500', marginTop: '8px' }}>Prêt·e ?</p>
              </div>
            </div>
          </div>

          <button onClick={handleStart} style={{
            width: '100%', padding: '20px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #9B8DC8, #7B6BA8)',
            color: '#FEFEFE', fontSize: '17px',
            fontWeight: '600', letterSpacing: '0.04em',
            boxShadow: '0 10px 30px rgba(123,107,168,0.4)',
            border: 'none', cursor: 'pointer',
          }}>
            Commencer la séance
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 24px' }}>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '4px', background: 'rgba(155,141,200,0.2)', borderRadius: '2px', marginBottom: '30px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, #9B8DC8, #7B6BA8)',
              borderRadius: '2px',
              transition: 'width 1s linear',
            }} />
          </div>

          {/* Timer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', color: '#A89EC0' }}>
              {formatTime(totalTime)}
            </span>
            <span style={{ fontSize: '13px', color: '#A89EC0' }}>
              {formatTime(selectedDuration - totalTime)} restant
            </span>
          </div>

          {/* Breathing circle */}
          <div style={{ position: 'relative', width: '260px', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>

            {/* Outer ripple */}
            <div style={{
              position: 'absolute',
              width: '260px', height: '260px', borderRadius: '50%',
              background: `radial-gradient(circle, ${currentPhase.bg} 0%, transparent 70%)`,
              animation: currentPhase.id === 'inhale' ? 'ripple 2s ease-out infinite' : 'none',
            }} />

            {/* Main circle */}
            <div style={{
              width: '180px', height: '180px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${currentPhase.color}30, ${currentPhase.color}60)`,
              border: `2.5px solid ${currentPhase.color}60`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 12px 40px ${currentPhase.color}40`,
              transform: `scale(${currentPhase.scale})`,
              transition: `transform ${currentPhase.duration * 0.9}s cubic-bezier(0.4, 0, 0.2, 1)`,
              position: 'relative', zIndex: 1,
            }}>
              <div style={{
                fontSize: '42px',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '300',
                color: currentPhase.color,
              }}>
                {phaseTime}
              </div>
            </div>
          </div>

          {/* Phase label */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '38px', fontWeight: '400',
            color: '#3D3250', marginBottom: '10px',
            transition: 'all 0.5s ease',
          }}>
            {currentPhase.label}
          </h2>
          <p style={{
            fontSize: '15px', color: '#7A7490',
            textAlign: 'center', lineHeight: 1.6,
            maxWidth: '260px', marginBottom: '12px',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            transition: 'all 0.5s ease',
          }}>
            {currentPhase.instruction}
          </p>

          {/* Cycles */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(254,254,254,0.7)', borderRadius: '50px',
            padding: '8px 16px', marginBottom: '36px',
          }}>
            <span style={{ fontSize: '14px', color: '#9B8DC8' }}>🌀</span>
            <span style={{ fontSize: '14px', color: '#7A7490' }}>Cycle <strong style={{ color: '#6B5B95' }}>{cycles + 1}</strong></span>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={handleStop}
              style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'rgba(254,254,254,0.8)',
                border: '1.5px solid rgba(196,154,154,0.4)',
                fontSize: '20px', cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(107,91,149,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ⏹
            </button>

            <button
              onClick={handlePause}
              style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #9B8DC8, #7B6BA8)',
                border: 'none',
                fontSize: '26px', cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(123,107,168,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {isRunning ? '⏸' : '▶️'}
            </button>

            <div style={{ width: '52px', height: '52px' }} />
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
