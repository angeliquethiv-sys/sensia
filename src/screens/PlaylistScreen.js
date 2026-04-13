import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const CATEGORIES = [
  { id: 'zen',        label: 'Zen',        emoji: '🧘', color: '#9B8DC8' },
  { id: 'motivation', label: 'Motivation', emoji: '⚡', color: '#C4986A' },
  { id: 'nature',     label: 'Nature',     emoji: '🌿', color: '#4A9B7F' },
  { id: 'favoris',    label: 'Favoris',    emoji: '💜', color: '#A689C4' },
];

const SONGS = {
  zen: [
    { id: 1, title: 'Douceur du soir',       artist: 'Luna & Co',   duration: '4:32', emoji: '🌙', bpm: '60' },
    { id: 2, title: 'Berceuse étoilée',       artist: 'Zen Flow',    duration: '5:14', emoji: '⭐', bpm: '55' },
    { id: 3, title: 'Souffle profond',        artist: 'Mindful',     duration: '6:30', emoji: '💨', bpm: '48' },
    { id: 4, title: 'Présence totale',        artist: 'Mindful',     duration: '8:00', emoji: '🧘', bpm: '45' },
    { id: 5, title: 'Ancrage profond',        artist: 'Terra',       duration: '10:00', emoji: '🌍', bpm: '42' },
    { id: 6, title: 'Silence apaisé',         artist: 'Deep Rest',   duration: '7:10', emoji: '🌑', bpm: '50' },
  ],
  motivation: [
    { id: 7,  title: 'Énergie du matin',      artist: 'Boost',       duration: '3:45', emoji: '☀️', bpm: '128' },
    { id: 8,  title: 'Force intérieure',      artist: 'Power Up',    duration: '4:10', emoji: '⚡', bpm: '132' },
    { id: 9,  title: 'Champion·ne',           artist: 'Élan',        duration: '3:55', emoji: '🏆', bpm: '125' },
    { id: 10, title: 'Sans limites',          artist: 'Fuel',        duration: '4:20', emoji: '🔥', bpm: '130' },
    { id: 11, title: 'Dépasser ses peurs',    artist: 'Rise Up',     duration: '4:05', emoji: '💪', bpm: '126' },
    { id: 12, title: 'En avant',              artist: 'Power Up',    duration: '3:30', emoji: '🚀', bpm: '135' },
  ],
  nature: [
    { id: 13, title: 'Forêt de bouleaux',     artist: 'Nature & Co', duration: '5:00', emoji: '🌲', bpm: '65' },
    { id: 14, title: 'Pluie douce',           artist: 'Orage Doux',  duration: '6:15', emoji: '🌧️', bpm: '60' },
    { id: 15, title: 'Vagues de l\'océan',    artist: 'Océan Doux',  duration: '7:30', emoji: '🌊', bpm: '55' },
    { id: 16, title: 'Chant des oiseaux',     artist: 'Forêt',       duration: '4:45', emoji: '🐦', bpm: '62' },
    { id: 17, title: 'Rivière apaisante',     artist: 'Nature & Co', duration: '8:00', emoji: '💧', bpm: '58' },
    { id: 18, title: 'Vent dans les pins',    artist: 'Forêt',       duration: '5:30', emoji: '🍃', bpm: '64' },
  ],
  favoris: [
    { id: 19, title: 'Douceur du soir',       artist: 'Luna & Co',   duration: '4:32', emoji: '🌙', bpm: '60' },
    { id: 20, title: 'Force intérieure',      artist: 'Power Up',    duration: '4:10', emoji: '⚡', bpm: '132' },
    { id: 21, title: 'Vagues de l\'océan',    artist: 'Océan Doux',  duration: '7:30', emoji: '🌊', bpm: '55' },
  ],
};

export default function PlaylistScreen() {
  // navigate kept for future use
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [category, setCategory] = useState('zen');
  const [playingId, setPlayingId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const songs = SONGS[category];
  const currentSong = songs.find((s) => s.id === playingId) || null;

  useEffect(() => {
    if (playingId !== null) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            handleNext();
            return 0;
          }
          return p + 0.3;
        });
        setElapsed((e) => e + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playingId]);

  const handlePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setProgress(0);
      setElapsed(0);
    }
  };

  const handleNext = () => {
    const idx = songs.findIndex((s) => s.id === playingId);
    const next = songs[(idx + 1) % songs.length];
    setPlayingId(next.id);
    setProgress(0);
    setElapsed(0);
  };

  const handlePrev = () => {
    const idx = songs.findIndex((s) => s.id === playingId);
    const prev = songs[(idx - 1 + songs.length) % songs.length];
    setPlayingId(prev.id);
    setProgress(0);
    setElapsed(0);
  };

  const formatElapsed = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #F0EDF8 0%, #F5EFE6 50%, #EDE0D4 100%)', paddingBottom: '90px' }}>

      {/* Header */}
      <div style={{
        padding: '56px 24px 24px',
        background: 'linear-gradient(160deg, #E8E4F0 0%, #F5EFE6 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(155,141,200,0.1)', pointerEvents: 'none' }} />

        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: '#3D3250', fontWeight: '400', marginBottom: '6px' }}>
            Mes playlists
          </h1>
          <p style={{ fontSize: '14px', color: '#A89EC0' }}>Musique pour votre bien-être</p>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ padding: '20px 20px 0', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', paddingBottom: '4px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id); setPlayingId(null); setProgress(0); setElapsed(0); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px',
                borderRadius: '50px',
                border: 'none',
                background: category === cat.id
                  ? 'linear-gradient(135deg, #9B8DC8, #7B6BA8)'
                  : 'rgba(254,254,254,0.8)',
                color: category === cat.id ? '#FEFEFE' : '#7A7490',
                fontSize: '13px', fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: category === cat.id ? '0 6px 20px rgba(123,107,168,0.35)' : '0 2px 8px rgba(107,91,149,0.08)',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Song list */}
      <div style={{ padding: '0 20px' }}>
        {songs.map((song, idx) => {
          const isPlaying = playingId === song.id;
          return (
            <div
              key={song.id}
              onClick={() => handlePlay(song.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px',
                borderRadius: '18px',
                background: isPlaying
                  ? 'linear-gradient(135deg, #E8E4F0, #D4CCEB)'
                  : 'rgba(254,254,254,0.7)',
                border: isPlaying ? '1.5px solid rgba(155,141,200,0.5)' : '1.5px solid transparent',
                marginBottom: '10px',
                cursor: 'pointer',
                boxShadow: isPlaying ? '0 6px 20px rgba(155,141,200,0.2)' : '0 2px 8px rgba(107,91,149,0.06)',
                transition: 'all 0.25s ease',
                animation: `fadeIn ${0.3 + idx * 0.05}s ease-out`,
              }}
            >
              {/* Number / Play indicator */}
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: isPlaying
                  ? 'linear-gradient(135deg, #9B8DC8, #7B6BA8)'
                  : 'rgba(155,141,200,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: isPlaying ? '0 4px 12px rgba(123,107,168,0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}>
                {isPlaying ? (
                  <span style={{ fontSize: '16px' }}>⏸</span>
                ) : (
                  <span style={{ fontSize: '18px' }}>{song.emoji}</span>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '14px', fontWeight: '600',
                  color: isPlaying ? '#6B5B95' : '#3D3250',
                  marginBottom: '3px',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {song.title}
                </div>
                <div style={{ fontSize: '12px', color: '#A89EC0' }}>{song.artist}</div>

                {isPlaying && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ height: '3px', background: 'rgba(155,141,200,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${progress}%`,
                        background: 'linear-gradient(90deg, #9B8DC8, #7B6BA8)',
                        borderRadius: '2px', transition: 'width 1s linear',
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ fontSize: '10px', color: '#A89EC0' }}>{formatElapsed(elapsed)}</span>
                      <span style={{ fontSize: '10px', color: '#A89EC0' }}>{song.duration}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Duration */}
              {!isPlaying && (
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#BEB8D0' }}>{song.duration}</div>
                  <div style={{ fontSize: '10px', color: '#BEB8D0', marginTop: '2px' }}>{song.bpm} BPM</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Player bar */}
      {currentSong && (
        <div style={{
          position: 'fixed',
          bottom: '70px',
          left: '50%', transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '398px',
          background: 'linear-gradient(135deg, rgba(155,141,200,0.95), rgba(123,107,168,0.95))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '14px 18px',
          boxShadow: '0 -4px 30px rgba(123,107,168,0.3), 0 8px 30px rgba(123,107,168,0.3)',
          zIndex: 99,
          animation: 'slideUp 0.3s ease-out',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', flexShrink: 0,
            }}>
              {currentSong.emoji}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#FEFEFE', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentSong.title}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{currentSong.artist}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <button onClick={handlePrev} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '18px', cursor: 'pointer', padding: '4px' }}>
                ⏮
              </button>
              <button
                onClick={() => setPlayingId(null)}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)', border: 'none',
                  color: '#FEFEFE', fontSize: '16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ⏸
              </button>
              <button onClick={handleNext} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '18px', cursor: 'pointer', padding: '4px' }}>
                ⏭
              </button>
            </div>
          </div>

          <div style={{ marginTop: '10px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'rgba(255,255,255,0.8)', borderRadius: '2px', transition: 'width 1s linear' }} />
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
