import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { PROFILES, BADGES, CHALLENGES } from '../data/profiles'; // getDailyAffirmation removed (unused)

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState({ sessions: 0, streakMax: 0, streak: 0, score: 0, hours: 0 });
  const [completedBadges, setCompletedBadges] = useState([]);
  const [cycleActive, setCycleActive] = useState(false);
  const [cycleDay, setCycleDay] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState('');
  const [activeChallenge, setActiveChallenge] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('sensia_profile');
    if (saved) {
      const p = JSON.parse(saved);
      const profileId = p.profileType || 'postpartum';
      const profile = PROFILES[profileId] || PROFILES.postpartum;
      setProfileData({ ...p, ...profile });
      setName(p.name || 'Angélique');

      const completed = JSON.parse(localStorage.getItem('sensia_completed') || '{}');
      const sessionCount = Object.keys(completed).length;
      const hours = Math.round(sessionCount * 0.35 * 10) / 10;
      // simulate streak and score
      const streak = Math.min(sessionCount, 7);
      const score = Math.min(100, Math.round(sessionCount * 3.5 + streak * 2));
      setStats({ sessions: sessionCount, streak, streakMax: streak + 2, score, hours });

      // compute badges
      const earnedBadges = [];
      if (sessionCount >= 1) earnedBadges.push('first_session');
      if (streak >= 7) earnedBadges.push('week_1');
      if (sessionCount >= 30) earnedBadges.push('month_1');
      if (score >= 50) earnedBadges.push('score_50');
      setCompletedBadges(earnedBadges);
    }
    const cycle = localStorage.getItem('sensia_cycle');
    if (cycle) { setCycleActive(true); setCycleDay(parseInt(cycle)); }
    const challenge = localStorage.getItem('sensia_challenge');
    if (challenge) setActiveChallenge(JSON.parse(challenge));
  }, []);

  const toggleCycle = () => {
    const newVal = !cycleActive;
    setCycleActive(newVal);
    if (newVal) {
      const day = 1;
      setCycleDay(day);
      localStorage.setItem('sensia_cycle', String(day));
    } else {
      localStorage.removeItem('sensia_cycle');
      setCycleDay(null);
    }
  };

  const saveName = () => {
    setEditingName(false);
    const saved = JSON.parse(localStorage.getItem('sensia_profile') || '{}');
    localStorage.setItem('sensia_profile', JSON.stringify({ ...saved, name }));
  };

  const startChallenge = (c) => {
    const ch = { ...c, startedAt: Date.now(), progress: 0 };
    localStorage.setItem('sensia_challenge', JSON.stringify(ch));
    setActiveChallenge(ch);
  };

  if (!profileData) return null;

  const { score, sessions, streak, streakMax, hours } = stats;
  const scoreColor = score >= 80 ? '#3DD68C' : score >= 50 ? '#F0B429' : '#9B8DC8';

  const CYCLE_PHASES = [
    { days: '1-5',   label: 'Menstruelle', emoji: '🌊', color: '#8BA7FF', advice: 'Douceur · Kegel doux · Étirements' },
    { days: '6-13',  label: 'Folliculaire', emoji: '🌱', color: '#3DD68C', advice: 'Énergie · Force · Musculation' },
    { days: '14-16', label: 'Ovulatoire', emoji: '🌕', color: '#F0B429', advice: 'Pic de performance · Technique parfaite' },
    { days: '17-28', label: 'Lutéale', emoji: '🍂', color: '#C4986A', advice: 'Volume modéré · Yoga · Récupération' },
  ];
  const getCyclePhase = (day) => {
    if (!day) return null;
    if (day <= 5) return CYCLE_PHASES[0];
    if (day <= 13) return CYCLE_PHASES[1];
    if (day <= 16) return CYCLE_PHASES[2];
    return CYCLE_PHASES[3];
  };
  const currentPhase = getCyclePhase(cycleDay);

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', paddingBottom: 100, fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header hero */}
      <div style={{
        background: profileData.heroColor || 'linear-gradient(165deg,#4A3669,#2D1F4A)',
        padding: '52px 20px 28px',
      }}>
        {/* Avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `${profileData.color}40`,
            border: `2px solid ${profileData.color}80`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }}>
            {profileData.emoji}
          </div>
          <div style={{ flex: 1 }}>
            {editingName ? (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={saveName}
                  autoFocus
                  style={{
                    background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)',
                    borderRadius: 10, padding: '6px 12px', color: '#fff', fontSize: 18,
                    fontFamily: "'DM Sans', sans-serif", outline: 'none', width: '100%',
                  }}
                />
                <button onClick={saveName} style={{ background: profileData.color, border: 'none', borderRadius: 8, padding: '6px 12px', color: '#fff', cursor: 'pointer' }}>✓</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#fff', fontWeight: 400 }}>{name}</h2>
                <button onClick={() => setEditingName(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.5)', cursor: 'pointer', fontSize: 14 }}>✏️</button>
              </div>
            )}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4,
              padding: '4px 12px', borderRadius: 50,
              background: `${profileData.color}30`, border: `1px solid ${profileData.color}60`,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: profileData.color }}>{profileData.badge}</span>
            </div>
          </div>
        </div>

        {/* SENSIA Score */}
        <div style={{
          background: 'rgba(255,255,255,.1)', borderRadius: 20, padding: '16px 18px',
          border: '1px solid rgba(255,255,255,.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>Score SENSIA</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 42, color: scoreColor, lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,.5)' }}>/100</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', marginBottom: 2 }}>🔥 {streak} jours</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>Record : {streakMax}j</p>
            </div>
          </div>
          {/* Score bar */}
          <div style={{ height: 6, background: 'rgba(255,255,255,.15)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${score}%`, height: '100%', background: `linear-gradient(90deg,${scoreColor},${scoreColor}AA)`, borderRadius: 3, transition: 'width 1s ease' }} />
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 6 }}>
            {score < 30 ? 'Juste démarrée — continue !' : score < 60 ? 'Bonne progression 👏' : score < 80 ? 'Excellente régularité ⭐' : 'Niveau expert 🏆'}
          </p>
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Séances', value: sessions, emoji: '🏋️' },
            { label: 'Heures', value: `${hours}h`, emoji: '⏱' },
            { label: 'Streak', value: `${streak}j`, emoji: '🔥' },
          ].map(s => (
            <div key={s.label} style={{ background: '#FDFBF8', borderRadius: 16, padding: '12px 10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(44,33,24,.06)', border: '1.5px solid rgba(196,152,106,.1)' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.emoji}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: '#2C2118', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#9C8A78', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cycle mode */}
        <div style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)', border: '1.5px solid rgba(196,152,106,.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: cycleActive ? 12 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>🌙</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#2C2118' }}>Mode cycle menstruel</p>
                <p style={{ fontSize: 12, color: '#9C8A78' }}>Adapte les séances à ton cycle</p>
              </div>
            </div>
            <button
              onClick={toggleCycle}
              style={{
                width: 48, height: 26, borderRadius: 13,
                background: cycleActive ? '#7B5EA7' : '#E2D9F0',
                border: 'none', cursor: 'pointer', position: 'relative',
                transition: 'background .2s',
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                position: 'absolute', top: 3,
                left: cycleActive ? 24 : 4,
                transition: 'left .2s',
                boxShadow: '0 1px 4px rgba(0,0,0,.2)',
              }} />
            </button>
          </div>
          {cycleActive && currentPhase && (
            <div style={{
              background: `${currentPhase.color}15`,
              border: `1px solid ${currentPhase.color}30`,
              borderRadius: 14, padding: '12px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{currentPhase.emoji}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#2C2118' }}>Phase {currentPhase.label}</span>
                <span style={{ fontSize: 11, color: '#9C8A78' }}>Jour {cycleDay}</span>
              </div>
              <p style={{ fontSize: 12, color: '#6B5744' }}>{currentPhase.advice}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {[1, 7, 14, 17, 28].map(d => (
                  <button key={d} onClick={() => { setCycleDay(d); localStorage.setItem('sensia_cycle', String(d)); }}
                    style={{ padding: '4px 10px', borderRadius: 50, border: 'none', cursor: 'pointer', fontSize: 11, background: cycleDay === d ? currentPhase.color : '#EDE6F4', color: cycleDay === d ? '#fff' : '#7B5EA7', fontWeight: 600 }}>
                    J{d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Badges */}
        <div style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)', border: '1.5px solid rgba(196,152,106,.1)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            Mes badges
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {BADGES.map(badge => {
              const earned = completedBadges.includes(badge.id);
              return (
                <div key={badge.id} style={{
                  width: 64, textAlign: 'center', opacity: earned ? 1 : 0.35,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 16, margin: '0 auto 4px',
                    background: earned ? 'linear-gradient(135deg,#7B5EA7,#4A3669)' : '#E8E4F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                    boxShadow: earned ? '0 4px 12px rgba(123,94,167,.35)' : 'none',
                  }}>
                    {badge.emoji}
                  </div>
                  <p style={{ fontSize: 9, color: earned ? '#2C2118' : '#9C8A78', fontWeight: earned ? 700 : 400, lineHeight: 1.3 }}>
                    {badge.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active challenge */}
        {activeChallenge ? (
          <div style={{
            background: 'linear-gradient(135deg,#4A3669,#7B5EA7)',
            borderRadius: 20, padding: '16px 18px', marginBottom: 14,
            boxShadow: '0 6px 20px rgba(74,54,105,.3)',
          }}>
            <p style={{ fontSize: 10, color: 'rgba(196,152,106,.9)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
              🎯 Défi en cours
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{activeChallenge.emoji} {activeChallenge.name}</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', marginBottom: 10 }}>{activeChallenge.desc}</p>
            <div style={{ height: 6, background: 'rgba(255,255,255,.2)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${(activeChallenge.progress / activeChallenge.duration) * 100}%`, height: '100%', background: '#C4986A', borderRadius: 3 }} />
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>{activeChallenge.progress}/{activeChallenge.duration} jours</p>
          </div>
        ) : (
          <div style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)', border: '1.5px solid rgba(196,152,106,.1)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Défis disponibles</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CHALLENGES.slice(0, 3).map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F3EDE5', borderRadius: 14 }}>
                  <div>
                    <span style={{ fontSize: 16, marginRight: 8 }}>{c.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#2C2118' }}>{c.name}</span>
                  </div>
                  <button onClick={() => startChallenge(c)} style={{ padding: '6px 14px', borderRadius: 50, background: '#7B5EA7', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    Démarrer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        <div style={{ background: '#FDFBF8', borderRadius: 20, overflow: 'hidden', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)', border: '1.5px solid rgba(196,152,106,.1)' }}>
          {[
            { icon: '🔔', label: 'Notifications', sub: 'Rappels quotidiens' },
            { icon: '🎙️', label: 'Guidage vocal', sub: 'Actif pendant les séances' },
            { icon: '💜', label: 'Mon programme', sub: 'Voir le programme complet', action: () => navigate('/program') },
            { icon: '🔄', label: 'Changer de profil', sub: 'Modifier mes objectifs', action: () => navigate('/onboarding') },
          ].map((item, i, arr) => (
            <button
              key={i}
              onClick={item.action}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: item.action ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                borderBottom: i < arr.length - 1 ? '1px solid rgba(196,152,106,.1)' : 'none',
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#2C2118' }}>{item.label}</p>
                <p style={{ fontSize: 12, color: '#9C8A78' }}>{item.sub}</p>
              </div>
              {item.action && <span style={{ fontSize: 18, color: '#BEB8D0' }}>›</span>}
            </button>
          ))}
        </div>

        {/* Weekly advice */}
        <div style={{
          background: 'linear-gradient(135deg,#4A3669,#2D1F4A)',
          borderRadius: 20, padding: '16px 18px', marginBottom: 16,
          boxShadow: '0 8px 26px rgba(45,31,74,.25)',
        }}>
          <p style={{ fontSize: 10, color: 'rgba(196,152,106,.9)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
            💡 Conseil de la semaine
          </p>
          {profileData.weeklyAdvice && profileData.weeklyAdvice[0] && (
            <>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{profileData.weeklyAdvice[0].title}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', lineHeight: 1.6 }}>{profileData.weeklyAdvice[0].content}</p>
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
