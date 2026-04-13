import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { getProgramForProfile, SESSION_TYPES } from '../data/programs';
import { getExerciseById } from '../data/exercises';

const INTENSITY_DOTS = [1, 2, 3];

export default function ProgramScreen() {
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [completedSessions, setCompleted] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('sensia_profile');
    const profileId = saved ? JSON.parse(saved).profileType || 'postpartum' : 'postpartum';
    setProgram(getProgramForProfile(profileId));

    const done = JSON.parse(localStorage.getItem('sensia_completed') || '{}');
    setCompleted(done);
  }, []);

  if (!program) return null;

  const week = program.weeks[activeWeek];

  const markDone = (weekIdx, day) => {
    const key = `${program.id}_w${weekIdx + 1}_d${day}`;
    const updated = { ...completedSessions, [key]: true };
    setCompleted(updated);
    localStorage.setItem('sensia_completed', JSON.stringify(updated));
    return updated;
  };

  const isDone = (weekIdx, day) =>
    completedSessions[`${program.id}_w${weekIdx + 1}_d${day}`];

  const weekProgress = (weekIdx) => {
    const w = program.weeks[weekIdx];
    const sessions = w.sessions.filter(s => !s.isRest);
    const done = sessions.filter(s => isDone(weekIdx, s.day)).length;
    return sessions.length > 0 ? Math.round((done / sessions.length) * 100) : 0;
  };

  const startSession = (session) => {
    if (session.exercises.length === 0) return;
    markDone(activeWeek, session.day);
    navigate(`/exercise/${session.exercises[0]}`, {
      state: { sessionTitle: session.title, exerciseQueue: session.exercises, weekIdx: activeWeek, day: session.day, programId: program.id },
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5EFE6', paddingBottom: 90 }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: '52px 22px 20px',
        background: 'linear-gradient(165deg,#4A3669 0%,#2D1F4A 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(255,255,255,.06)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(155,141,200,.8)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
              {program.emoji} Mon programme
            </p>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, color: '#fff', fontWeight: 400, lineHeight: 1.2 }}>
              {program.name}
            </h1>
            <p style={{ fontSize: 12, color: 'rgba(155,141,200,.75)', marginTop: 4 }}>
              {program.subtitle}
            </p>
          </div>
          <div style={{
            background: `${program.color}30`,
            border: `1.5px solid ${program.color}60`,
            borderRadius: 50, padding: '6px 14px',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: program.color }}>
              S{activeWeek + 1} / 4
            </span>
          </div>
        </div>

        {/* Sélecteur de semaine */}
        <div style={{ display: 'flex', gap: 8 }}>
          {program.weeks.map((w, i) => {
            const pct = weekProgress(i);
            const isActive = i === activeWeek;
            return (
              <button
                key={i}
                onClick={() => setActiveWeek(i)}
                style={{
                  flex: 1, padding: '10px 6px',
                  borderRadius: 14,
                  background: isActive ? 'rgba(255,255,255,.15)' : 'rgba(255,255,255,.06)',
                  border: isActive ? '1.5px solid rgba(255,255,255,.3)' : '1.5px solid transparent',
                  cursor: 'pointer',
                  transition: 'all .2s ease',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? '#fff' : 'rgba(155,141,200,.7)', marginBottom: 6 }}>
                  Sem {i + 1}
                </div>
                {/* Mini progress bar */}
                <div style={{ height: 3, background: 'rgba(255,255,255,.15)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? '#3DD68C' : '#9B8DC8', borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 10, color: pct === 100 ? '#3DD68C' : 'rgba(155,141,200,.6)', marginTop: 4 }}>
                  {pct}%
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '18px 16px 0' }}>

        {/* Thème de la semaine */}
        <div style={{
          background: week.color || '#E8E4F0',
          borderRadius: 20, padding: '16px 18px',
          marginBottom: 16,
          border: '1px solid rgba(155,141,200,.2)',
        }}>
          <p style={{ fontSize: 11, color: '#9B8DC8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
            Semaine {activeWeek + 1}
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: '#1A1030', marginBottom: 4 }}>
            {week.theme}
          </p>
          <p style={{ fontSize: 13, color: '#7A7490' }}>{week.subtitle}</p>
        </div>

        {/* Jours */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {week.sessions.map((session) => {
            const typeInfo = SESSION_TYPES[session.type];
            const done = isDone(activeWeek, session.day);
            const exNames = session.exercises.slice(0, 2).map(id => {
              const ex = getExerciseById(id);
              return ex ? ex.name : '';
            }).filter(Boolean);

            return (
              <div
                key={session.day}
                style={{
                  background: session.isRest
                    ? 'rgba(255,255,255,.5)'
                    : done ? 'rgba(61,214,140,.07)' : 'rgba(255,255,255,.88)',
                  borderRadius: 20,
                  border: done
                    ? '1.5px solid rgba(61,214,140,.35)'
                    : session.isRest ? '1.5px solid rgba(190,184,208,.3)' : '1.5px solid rgba(232,228,240,.8)',
                  boxShadow: session.isRest ? 'none' : '0 2px 12px rgba(74,54,105,.07)',
                  overflow: 'hidden',
                  opacity: session.isRest ? 0.65 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>

                  {/* Jour badge */}
                  <div style={{
                    width: 40, flexShrink: 0, textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#9B8DC8', textTransform: 'uppercase', marginBottom: 2 }}>
                      {session.label}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: done ? '#3DD68C' : '#1A1030' }}>
                      {session.day}
                    </div>
                  </div>

                  {/* Séparateur */}
                  <div style={{ width: 1, height: 40, background: 'rgba(155,141,200,.2)', flexShrink: 0 }} />

                  {/* Icône type */}
                  <div style={{
                    width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                    background: done ? 'rgba(61,214,140,.15)' : typeInfo.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                    border: done ? '1px solid rgba(61,214,140,.3)' : 'none',
                  }}>
                    {done ? '✓' : typeInfo.emoji}
                  </div>

                  {/* Infos séance */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 700,
                      color: done ? '#9B8DC8' : '#1A1030',
                      textDecoration: done ? 'line-through' : 'none',
                      marginBottom: 3,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {session.title}
                    </div>
                    {!session.isRest && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, color: '#9B8DC8' }}>{session.minutes} min</span>
                        {exNames.length > 0 && (
                          <span style={{ fontSize: 11, color: '#BEB8D0' }}>
                            · {exNames.join(' · ')}
                            {session.exercises.length > 2 ? ` +${session.exercises.length - 2}` : ''}
                          </span>
                        )}
                      </div>
                    )}
                    {/* Intensité */}
                    {session.intensity > 0 && (
                      <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                        {INTENSITY_DOTS.map(d => (
                          <div key={d} style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: d <= session.intensity ? typeInfo.color : 'rgba(155,141,200,.2)',
                          }} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  {!session.isRest && !done && (
                    <button
                      onClick={() => startSession(session)}
                      style={{
                        flexShrink: 0,
                        width: 38, height: 38, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#9B8DC8,#7B6BA8)',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, color: '#fff',
                        boxShadow: '0 4px 12px rgba(123,107,168,.35)',
                      }}
                    >
                      ▶
                    </button>
                  )}
                  {done && (
                    <div style={{
                      flexShrink: 0, width: 38, height: 38, borderRadius: '50%',
                      background: 'rgba(61,214,140,.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16,
                    }}>
                      ✓
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info programme */}
        <div style={{
          background: 'linear-gradient(135deg,#4A3669,#2D1F4A)',
          borderRadius: 20, padding: '16px 18px', marginTop: 18,
          boxShadow: '0 8px 26px rgba(45,31,74,.3)',
        }}>
          <p style={{ fontSize: 10, color: 'rgba(240,180,41,.9)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
            💡 À propos de ce programme
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.6 }}>
            {program.description}
          </p>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
