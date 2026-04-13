import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { PROFILES, BADGES, CHALLENGES } from '../data/profiles';
import { useProfile } from '../context/ProfileContext';

const PROFILE_CARDS = [
  { id: 'postpartum',   emoji: '👶', name: 'Post-partum',          desc: 'Reprise douce après l\'accouchement',   color: '#4A9B7F', bg: '#E0F2EC' },
  { id: 'beginner',     emoji: '🌱', name: 'Débutante en muscu',    desc: 'Apprendre les bases intelligemment',    color: '#A689C4', bg: '#EDE6F4' },
  { id: 'intermediate', emoji: '🔥', name: 'Intermédiaire',         desc: 'Optimiser technique et performance',    color: '#C4986A', bg: '#F5EDE2' },
  { id: 'injured',      emoji: '💙', name: 'Déjà touchée',          desc: 'Rééducation périnéale progressive',     color: '#E8A0B8', bg: '#FBEAF0' },
];

const SYM_LABELS = [
  { key: 'pain',     label: 'Douleur',   emoji: '😣', goodLow: true  },
  { key: 'pressure', label: 'Pression',  emoji: '⬇️', goodLow: true  },
  { key: 'leaks',    label: 'Fuites',    emoji: '💧', goodLow: true  },
  { key: 'energy',   label: 'Énergie',   emoji: '⚡', goodLow: false },
  { key: 'mood',     label: 'Moral',     emoji: '😊', goodLow: false },
];

const PR_EXERCISES = ['Squat', 'Hip Thrust', 'Deadlift', 'Développé couché', 'Rowing barre', 'Leg Press'];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { profileId, switchProfile, weekPostPartum, updateWeek } = useProfile();
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState({ sessions: 0, streakMax: 0, streak: 0, score: 0, hours: 0 });
  const [completedBadges, setCompletedBadges] = useState([]);
  const [cycleActive, setCycleActive] = useState(false);
  const [cycleDay, setCycleDay] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState('');
  const [activeChallenge, setActiveChallenge] = useState(null);

  // Profile switching
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [pendingProfileId, setPendingProfileId] = useState(null);

  // Symptom journal (injured)
  const [todaySymptoms, setTodaySymptoms] = useState({ pain: 2, pressure: 1, leaks: 1, energy: 3, mood: 3 });
  const [symptomNote, setSymptomNote] = useState('');
  const [symptomHistory, setSymptomHistory] = useState([]);

  // PR records (intermediate)
  const [prRecords, setPrRecords] = useState({});
  const [editingPR, setEditingPR] = useState(null);
  const [prInput, setPrInput] = useState('');

  // Week editing (postpartum)
  const [editingWeek, setEditingWeek] = useState(false);

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

    // Load symptom journal
    const journal = localStorage.getItem('sensia_journal');
    if (journal) {
      const j = JSON.parse(journal);
      setSymptomHistory(j.history || []);
      if (j.today) setTodaySymptoms(j.today);
      if (j.note) setSymptomNote(j.note);
    }

    // Load PR records
    const prs = localStorage.getItem('sensia_pr');
    if (prs) setPrRecords(JSON.parse(prs));
  }, []);

  const saveSymptoms = (newSymptoms) => {
    const j = JSON.parse(localStorage.getItem('sensia_journal') || '{}');
    const today = new Date().toISOString().split('T')[0];
    const history = j.history || [];
    const existing = history.findIndex(h => h.date === today);
    if (existing >= 0) history[existing] = { date: today, ...newSymptoms };
    else history.push({ date: today, ...newSymptoms });
    localStorage.setItem('sensia_journal', JSON.stringify({ today: newSymptoms, history, note: symptomNote }));
    setSymptomHistory(history);
    setTodaySymptoms(newSymptoms);
  };

  const savePR = (exercise, value) => {
    const newPRs = { ...prRecords, [exercise]: value };
    setPrRecords(newPRs);
    localStorage.setItem('sensia_pr', JSON.stringify(newPRs));
    setEditingPR(null);
    setPrInput('');
  };

  const exportPDF = () => {
    const htmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Rapport SENSIA — ${name}</title>
    <style>
      body{font-family:Georgia,serif;max-width:600px;margin:40px auto;color:#2C2118;line-height:1.6}
      h1{color:#7B5EA7;font-size:28px;margin-bottom:4px}
      .subtitle{color:#9C8A78;font-size:13px;margin-bottom:24px}
      .badge{background:#EDE6F4;color:#7B5EA7;padding:5px 14px;border-radius:20px;display:inline-block;font-weight:700;font-size:13px;margin-bottom:20px}
      .section{margin-bottom:20px;padding:16px;background:#F8F5F0;border-radius:10px}
      h2{color:#4A3669;font-size:16px;margin-bottom:10px}
      .stat{margin-right:20px;font-size:14px}
      .footer{font-size:10px;color:#BEB8D0;margin-top:30px;border-top:1px solid #EDE6F4;padding-top:12px}
      .alert{background:#FFF3E0;border-left:3px solid #F0B429;padding:10px 14px;font-size:13px;margin-top:10px;border-radius:0 8px 8px 0}
    </style></head><body>
    <h1>SENSIA — Rapport mensuel</h1>
    <p class="subtitle">Document confidentiel à partager avec votre professionnel de santé</p>
    <span class="badge">${profileData?.badge || ''}</span>
    <div class="section">
      <h2>Informations personnelles</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Profil :</strong> ${profileData?.name || ''}</p>
      ${profileId === 'postpartum' ? `<p><strong>Semaines post-partum :</strong> ${weekPostPartum}</p>` : ''}
      <p><strong>Date du rapport :</strong> ${new Date().toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}</p>
    </div>
    <div class="section">
      <h2>Statistiques du mois</h2>
      <span class="stat">Séances : <strong>${stats.sessions}</strong></span>
      <span class="stat">Score SENSIA : <strong>${stats.score}/100</strong></span>
      <span class="stat">Streak max : <strong>${stats.streakMax} jours</strong></span>
    </div>
    <div class="section">
      <h2>Programme en cours</h2>
      <p>${profileData?.weeklyAdvice?.[0]?.title || ''}</p>
      <p>${profileData?.weeklyAdvice?.[0]?.content || ''}</p>
    </div>
    ${profileId === 'injured' && symptomHistory.length > 0 ? `
    <div class="section">
      <h2>Journal des symptômes (7 derniers jours)</h2>
      ${symptomHistory.slice(-7).map(h => `<p>${h.date} — Douleur: ${h.pain}/5 · Énergie: ${h.energy}/5 · Moral: ${h.mood}/5</p>`).join('')}
    </div>` : ''}
    <div class="alert">
      <strong>Message pour le professionnel de santé :</strong> Ce rapport a été généré automatiquement par l'application SENSIA. Il reflète l'activité déclarée par l'utilisatrice et ne remplace pas un examen clinique.
    </div>
    <p class="footer">SENSIA — Application de rééducation périnéale et musculation féminine. Rapport généré le ${new Date().toLocaleDateString('fr-FR')}.</p>
    </body></html>`;
    const win = window.open('', '_blank');
    if (win) { win.document.write(htmlContent); win.document.close(); win.print(); }
  };

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
            { icon: '🔄', label: 'Changer de profil', sub: 'Adapter tout mon programme', action: () => setShowSwitchModal(true) },
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

        {/* ── POSTPARTUM: week tracker + PDF ── */}
        {profileId === 'postpartum' && (
          <div style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)', border: '1.5px solid rgba(74,155,127,.15)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#4A9B7F', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
              🌱 Programme post-partum
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: '#2C2118', fontWeight: 600 }}>Semaines post-partum :</span>
              {editingWeek ? (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {[1,2,3,4,6,8,10,12].map(w => (
                    <button key={w} onClick={() => { updateWeek(w); setEditingWeek(false); }}
                      style={{ padding: '4px 10px', borderRadius: 50, border: 'none', cursor: 'pointer', fontSize: 12, background: weekPostPartum === w ? '#4A9B7F' : '#E0F2EC', color: weekPostPartum === w ? '#fff' : '#4A9B7F', fontWeight: 700 }}>
                      S{w}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#4A9B7F' }}>Semaine {weekPostPartum}</span>
                  <button onClick={() => setEditingWeek(true)} style={{ background: 'none', border: 'none', color: '#9C8A78', cursor: 'pointer', fontSize: 13 }}>✏️</button>
                </div>
              )}
            </div>
            {/* Timeline S1-S12 */}
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(w => (
                <div key={w} style={{ flexShrink: 0, textAlign: 'center', width: 36 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: w < weekPostPartum ? '#4A9B7F' : w === weekPostPartum ? 'linear-gradient(135deg,#4A9B7F,#2D7A5E)' : '#E0F2EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: w === weekPostPartum ? 14 : 11, color: w <= weekPostPartum ? '#fff' : '#9C8A78', fontWeight: 700, boxShadow: w === weekPostPartum ? '0 4px 12px rgba(74,155,127,.4)' : 'none', border: w === weekPostPartum ? '2px solid #4A9B7F' : 'none' }}>
                    {w < weekPostPartum ? '✓' : `S${w}`}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={exportPDF}
              style={{ marginTop: 14, width: '100%', padding: '13px', borderRadius: 50, border: 'none', cursor: 'pointer', background: '#7B5EA7', color: '#fff', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(123,94,167,.35)' }}
            >
              <span style={{ color: '#C4986A', fontSize: 16 }}>📄</span> Exporter mon rapport PDF
            </button>
            <p style={{ fontSize: 11, color: '#9C8A78', textAlign: 'center', marginTop: 8 }}>Partagez ce rapport avec votre sage-femme ou kinésithérapeute périnéale</p>
          </div>
        )}

        {/* ── BEGINNER: charges tracking ── */}
        {profileId === 'beginner' && (
          <div style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)', border: '1.5px solid rgba(166,137,196,.2)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#A689C4', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
              🌱 Mes charges actuelles
            </p>
            {[
              { ex: 'Squat', suggestion: '10-15 kg' },
              { ex: 'Hip Thrust', suggestion: '20-30 kg' },
              { ex: 'Curl biceps', suggestion: '3-5 kg' },
              { ex: 'Développé couché', suggestion: '5-10 kg' },
            ].map(item => (
              <div key={item.ex} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(196,152,106,.08)' }}>
                <span style={{ flex: 1, fontSize: 13, color: '#2C2118', fontWeight: 600 }}>{item.ex}</span>
                {editingPR === item.ex ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input value={prInput} onChange={e => setPrInput(e.target.value)} placeholder="ex: 15 kg" style={{ width: 80, padding: '4px 8px', borderRadius: 8, border: '1px solid #A689C4', fontSize: 12, outline: 'none' }} />
                    <button onClick={() => savePR(item.ex, prInput)} style={{ padding: '4px 10px', borderRadius: 50, background: '#A689C4', border: 'none', color: '#fff', fontSize: 12, cursor: 'pointer' }}>✓</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, color: prRecords[item.ex] ? '#7B5EA7' : '#BEB8D0', fontWeight: 600 }}>
                      {prRecords[item.ex] || item.suggestion}
                    </span>
                    <button onClick={() => { setEditingPR(item.ex); setPrInput(prRecords[item.ex] || ''); }} style={{ background: 'none', border: 'none', color: '#C4C0D0', cursor: 'pointer', fontSize: 12 }}>✏️</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── INTERMEDIATE: PR records ── */}
        {profileId === 'intermediate' && (
          <div style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)', border: '1.5px solid rgba(196,152,106,.2)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#C4986A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
              🏆 Mes Records Personnels
            </p>
            {PR_EXERCISES.map(ex => (
              <div key={ex} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid rgba(196,152,106,.08)' }}>
                <span style={{ flex: 1, fontSize: 13, color: '#2C2118', fontWeight: 600 }}>{ex}</span>
                {editingPR === ex ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input value={prInput} onChange={e => setPrInput(e.target.value)} placeholder="ex: 60 kg" style={{ width: 80, padding: '4px 8px', borderRadius: 8, border: '1px solid #C4986A', fontSize: 12, outline: 'none' }} />
                    <button onClick={() => savePR(ex, prInput)} style={{ padding: '4px 10px', borderRadius: 50, background: '#C4986A', border: 'none', color: '#fff', fontSize: 12, cursor: 'pointer' }}>✓</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: prRecords[ex] ? '#C4986A' : '#BEB8D0', fontWeight: 700 }}>
                      {prRecords[ex] || '— kg'}
                    </span>
                    <button onClick={() => { setEditingPR(ex); setPrInput(prRecords[ex] || ''); }} style={{ background: 'none', border: 'none', color: '#C4C0D0', cursor: 'pointer', fontSize: 12 }}>✏️</button>
                  </div>
                )}
              </div>
            ))}
            <p style={{ fontSize: 11, color: '#9C8A78', marginTop: 12 }}>Tes records avec technique parfaite et périnée engagé ✓</p>
          </div>
        )}

        {/* ── INJURED: symptom journal ── */}
        {profileId === 'injured' && (
          <div style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)', border: '1.5px solid rgba(232,160,184,.2)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#E8A0B8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
              📓 Mon journal du jour
            </p>
            {SYM_LABELS.map(s => (
              <div key={s.key} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#2C2118' }}>{s.emoji} {s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.goodLow ? (todaySymptoms[s.key] <= 2 ? '#4A9B7F' : '#E05252') : (todaySymptoms[s.key] >= 4 ? '#4A9B7F' : '#C4986A') }}>
                    {todaySymptoms[s.key]}/5
                  </span>
                </div>
                <input
                  type="range" min="1" max="5" step="1"
                  value={todaySymptoms[s.key]}
                  onChange={e => {
                    const newSym = { ...todaySymptoms, [s.key]: parseInt(e.target.value) };
                    saveSymptoms(newSym);
                  }}
                  style={{ width: '100%', accentColor: '#E8A0B8', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 9, color: '#BEB8D0' }}>Faible</span>
                  <span style={{ fontSize: 9, color: '#BEB8D0' }}>Fort</span>
                </div>
              </div>
            ))}
            <textarea
              value={symptomNote}
              onChange={e => setSymptomNote(e.target.value)}
              onBlur={() => {
                const j = JSON.parse(localStorage.getItem('sensia_journal') || '{}');
                localStorage.setItem('sensia_journal', JSON.stringify({ ...j, note: symptomNote }));
              }}
              placeholder="Notes libres… comment tu te sens aujourd'hui ?"
              style={{ width: '100%', minHeight: 70, padding: '10px 12px', borderRadius: 12, border: '1.5px solid rgba(232,160,184,.3)', background: '#FFF5F8', fontSize: 13, color: '#2C2118', fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
            {symptomHistory.length >= 3 && (() => {
              const last3 = symptomHistory.slice(-3);
              const improving = last3[2].pain <= last3[0].pain && last3[2].mood >= last3[0].mood;
              return improving ? (
                <div style={{ background: '#E0F2EC', borderRadius: 12, padding: '10px 14px', marginTop: 10, border: '1px solid #4A9B7F30' }}>
                  <p style={{ fontSize: 12, color: '#2C7A5E', fontWeight: 600 }}>Tes symptômes s'améliorent ! Continue comme ça. 🌟</p>
                </div>
              ) : null;
            })()}
            <button
              onClick={exportPDF}
              style={{ marginTop: 14, width: '100%', padding: '13px', borderRadius: 50, border: 'none', cursor: 'pointer', background: '#7B5EA7', color: '#fff', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(123,94,167,.35)' }}
            >
              <span style={{ color: '#C4986A', fontSize: 16 }}>📄</span> Exporter mon rapport détaillé
            </button>
            <p style={{ fontSize: 11, color: '#9C8A78', textAlign: 'center', marginTop: 8 }}>À partager avec votre kinésithérapeute périnéale ou gynécologue</p>
          </div>
        )}

      {/* ── PROFILE SWITCH MODAL ── */}
      {showSwitchModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(44,33,24,.55)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 300, backdropFilter: 'blur(4px)',
        }}
          onClick={e => { if (e.target === e.currentTarget) { setShowSwitchModal(false); setPendingProfileId(null); } }}
        >
          <div style={{ background: '#FDFBF8', borderRadius: '28px 28px 0 0', padding: '20px 20px 40px', width: '100%', maxWidth: 430, animation: 'slideUp .3s ease-out' }}>
            <div style={{ width: 40, height: 4, background: '#E2D9F0', borderRadius: 2, margin: '0 auto 20px' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: '#2C2118', fontWeight: 400, textAlign: 'center', marginBottom: 6 }}>Changer de profil</h3>
            <p style={{ fontSize: 12, color: '#9C8A78', textAlign: 'center', marginBottom: 20 }}>
              Tout ton programme s'adaptera automatiquement
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {PROFILE_CARDS.map(pc => (
                <button
                  key={pc.id}
                  onClick={() => setPendingProfileId(pc.id)}
                  style={{
                    padding: '14px 12px', borderRadius: 18, border: `2px solid ${pendingProfileId === pc.id ? pc.color : 'transparent'}`,
                    background: pendingProfileId === pc.id ? `${pc.bg}` : '#F3EDE5',
                    cursor: 'pointer', textAlign: 'left',
                    boxShadow: pendingProfileId === pc.id ? `0 4px 14px ${pc.color}30` : 'none',
                    transition: 'all .2s',
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{pc.emoji}</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#2C2118', marginBottom: 3 }}>{pc.name}</p>
                  <p style={{ fontSize: 10, color: '#9C8A78', lineHeight: 1.4 }}>{pc.desc}</p>
                  {profileId === pc.id && (
                    <div style={{ marginTop: 6, display: 'inline-block', padding: '2px 8px', borderRadius: 50, background: pc.color, color: '#fff', fontSize: 9, fontWeight: 700 }}>Actuel</div>
                  )}
                </button>
              ))}
            </div>
            {pendingProfileId && pendingProfileId !== profileId && (
              <button
                onClick={() => { switchProfile(pendingProfileId); setShowSwitchModal(false); setPendingProfileId(null); }}
                style={{ width: '100%', padding: '15px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7B5EA7,#4A3669)', color: '#fff', fontSize: 15, fontWeight: 700, boxShadow: '0 6px 20px rgba(123,94,167,.35)', marginBottom: 10 }}
              >
                Confirmer le changement de profil
              </button>
            )}
            <button
              onClick={() => { setShowSwitchModal(false); setPendingProfileId(null); }}
              style={{ width: '100%', padding: '13px', borderRadius: 50, border: '1.5px solid #E2D9F0', background: 'none', cursor: 'pointer', fontSize: 14, color: '#9C8A78' }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
