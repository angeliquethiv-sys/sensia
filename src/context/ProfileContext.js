import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROFILES, getDailyAffirmation } from '../data/profiles';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profileId, setProfileId]       = useState('postpartum');
  const [profileData, setProfileData]   = useState(PROFILES.postpartum);
  const [userName, setUserName]         = useState('Angélique');
  const [weekPostPartum, setWeekPP]     = useState(3);
  const [affirmation, setAffirmation]   = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('sensia_profile');
    if (raw) {
      const p  = JSON.parse(raw);
      const id = p.profileType || 'postpartum';
      const pd = PROFILES[id] || PROFILES.postpartum;
      setProfileId(id);
      setProfileData(pd);
      setUserName(p.name || 'Angélique');
      setWeekPP(parseInt(p.weekPostPartum) || 3);
      setAffirmation(getDailyAffirmation(id));
    } else {
      setAffirmation(getDailyAffirmation('postpartum'));
    }
  }, []);

  /* ── Actions ── */
  const switchProfile = (newId) => {
    const pd  = PROFILES[newId] || PROFILES.postpartum;
    setProfileId(newId);
    setProfileData(pd);
    const saved = JSON.parse(localStorage.getItem('sensia_profile') || '{}');
    localStorage.setItem('sensia_profile', JSON.stringify({ ...saved, profileType: newId }));
    setAffirmation(getDailyAffirmation(newId));
  };

  const updateUserName = (name) => {
    setUserName(name);
    const saved = JSON.parse(localStorage.getItem('sensia_profile') || '{}');
    localStorage.setItem('sensia_profile', JSON.stringify({ ...saved, name }));
  };

  const updateWeek = (w) => {
    setWeekPP(w);
    const saved = JSON.parse(localStorage.getItem('sensia_profile') || '{}');
    localStorage.setItem('sensia_profile', JSON.stringify({ ...saved, weekPostPartum: w }));
  };

  /* ── Derived labels ── */
  const profileBadge = (() => {
    switch (profileId) {
      case 'postpartum':   return { label: `Post-partum · Semaine ${weekPostPartum}`, color: '#4A9B7F', bg: '#E0F2EC' };
      case 'beginner':     return { label: 'Débutante · Semaine 2',                   color: '#A689C4', bg: '#EDE6F4' };
      case 'intermediate': return { label: 'Intermédiaire · Mois 2',                  color: '#C4986A', bg: '#F5EDE2' };
      case 'injured':      return { label: 'Rééducation · Phase 1',                   color: '#E8A0B8', bg: '#FBEAF0' };
      default:             return { label: profileData.badge,                          color: '#7B5EA7', bg: '#EDE6F4' };
    }
  })();

  const programName = (() => {
    switch (profileId) {
      case 'postpartum':   return `Reprise post-partum — Semaine ${weekPostPartum}/12`;
      case 'beginner':     return 'Fondamentaux — Semaine 2/8';
      case 'intermediate': return 'Optimisation & Performance — Mois 2';
      case 'injured':      return 'Rééducation progressive — Phase 1';
      default:             return profileData.name;
    }
  })();

  const dailyExercise = (() => {
    switch (profileId) {
      case 'postpartum':   return { title: 'Respiration diaphragmatique', duration: '12 min', icon: '🌬️', route: '/session' };
      case 'beginner':     return { title: 'Squat corps au poids',         duration: '20 min', icon: '🦵', route: '/my-session' };
      case 'intermediate': return { title: 'Hip Thrust barre',              duration: '30 min', icon: '🍑', route: '/my-session' };
      case 'injured':      return { title: 'Kegel doux & respiration',      duration: '10 min', icon: '💙', route: '/session' };
      default:             return { title: 'Pont fessier guidé',             duration: '18 min', icon: '💪', route: '/session' };
    }
  })();

  const welcomeMessage = profileData.welcomeMessage || "Bienvenue dans ta séance du jour.";

  return (
    <ProfileContext.Provider value={{
      profileId,
      profileData,
      userName,
      weekPostPartum,
      affirmation,
      profileBadge,
      programName,
      dailyExercise,
      welcomeMessage,
      switchProfile,
      updateUserName,
      updateWeek,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
};
