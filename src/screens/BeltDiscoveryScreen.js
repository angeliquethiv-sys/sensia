import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BeltSVGV2 from '../components/BeltSVGV2';

const LED = { inspire:'#85B7EB', ok:'#5DCAA5', expire:'#EF9F27', purple:'#9B8DC8' };

const PHASES = [
  {
    id: 'breathing', duration: 60, label: 'Respiration', emoji: '🫁',
    color: LED.inspire,
    instruction: 'Inspire lentement... tu vois tes côtés s\'activer en bleu ?',
    sub: 'C\'est ta ceinture qui détecte l\'expansion de tes côtes',
    activeZone: 'sides',
    centerColor: '#3A2D5A', sidesColor: LED.inspire, bottomColor: '#5DCAA5', backColor: '#3A2D5A',
  },
  {
    id: 'core', duration: 60, label: 'Gainage', emoji: '💪',
    color: LED.purple,
    instruction: 'Rentre doucement le nombril... tu vois le centre s\'activer en violet ?',
    sub: 'C\'est ton gainage — le muscle profond qui protège ton dos',
    activeZone: 'center',
    centerColor: LED.purple, sidesColor: '#3A3A5A', bottomColor: '#5DCAA5', backColor: '#3A2D5A',
  },
  {
    id: 'perineum', duration: 60, label: 'Périnée', emoji: '💜',
    color: LED.ok,
    instruction: 'Relâche complètement... la zone basse reste verte ?',
    sub: 'Parfait, aucune pression vers le bas — ton périnée est protégé',
    activeZone: 'bottom',
    centerColor: '#3A2D5A', sidesColor: '#3A3A5A', bottomColor: LED.ok, backColor: '#3A2D5A',
  },
];

function CircleTimer({ remaining, total, color }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - remaining / total);
  return (
    <svg width="100" height="100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5"/>
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 6px ${color}80)` }}/>
      <text x="50" y="44" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" fontFamily="DM Sans,sans-serif">{remaining}</text>
      <text x="50" y="60" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="10" fontFamily="DM Sans,sans-serif">sec</text>
    </svg>
  );
}

export default function BeltDiscoveryScreen() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [remaining, setRemaining] = useState(60);
  const [done, setDone] = useState(false);
  const [sensorVal, setSensorVal] = useState({ sides: 45, center: 38, bottom: 30 });
  const timerRef = useRef(null);
  const sensorRef = useRef(null);

  /* Capteurs simulés selon la phase active */
  useEffect(() => {
    if (!started || done) return;
    const phase = PHASES[phaseIdx];
    sensorRef.current = setInterval(() => {
      setSensorVal(prev => ({
        sides:  phase.id === 'breathing'
          ? Math.min(100, Math.max(30, prev.sides  + ((Math.random() * 16) - 6) | 0))
          : Math.max(10, prev.sides  - ((Math.random() * 4) | 0)),
        center: phase.id === 'core'
          ? Math.min(100, Math.max(40, prev.center + ((Math.random() * 14) - 5) | 0))
          : Math.max(15, prev.center - ((Math.random() * 3) | 0)),
        bottom: Math.min(40, Math.max(5, prev.bottom + ((Math.random() * 6) - 3) | 0)),
      }));
    }, 900);
    return () => clearInterval(sensorRef.current);
  }, [started, phaseIdx, done]);

  /* Timer */
  useEffect(() => {
    if (!started || done) return;
    timerRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          if (phaseIdx < PHASES.length - 1) {
            setPhaseIdx(p => p + 1);
            return 60;
          } else {
            setDone(true);
            clearInterval(timerRef.current);
            return 0;
          }
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, phaseIdx, done]);

  const phase = PHASES[phaseIdx];
  const totalElapsed = phaseIdx * 60 + (60 - remaining);
  const totalRemaining = 3 * 60 - totalElapsed;

  if (done) {
    return (
      <div style={{ minHeight:'100vh', background:'#F3EDE5', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', fontFamily:"'DM Sans',sans-serif", textAlign:'center' }}>
        <div style={{ fontSize:56, marginBottom:20 }}>♡</div>
        <h2 style={{ fontFamily:'var(--font-heading)', fontSize:30, color:'#2C2118', fontWeight:400, marginBottom:12 }}>
          Tu comprends maintenant
        </h2>
        <p style={{ fontSize:16, color:'#6B5744', lineHeight:1.7, marginBottom:32, maxWidth:320 }}>
          comment ta ceinture te parle. Elle sera ton coach silencieux pendant chaque séance.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%', maxWidth:340 }}>
          <button onClick={() => navigate('/pre-session')} style={{ padding:'16px', borderRadius:50, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B5EA7,#4A3669)', color:'#fff', fontSize:15, fontWeight:700, boxShadow:'0 6px 20px rgba(123,94,167,.35)' }}>
            ▶ Commencer ma première vraie séance
          </button>
          <button onClick={() => navigate('/belt')} style={{ padding:'14px', borderRadius:50, border:'1.5px solid rgba(123,94,167,.3)', cursor:'pointer', background:'transparent', color:'#7B5EA7', fontSize:14, fontWeight:600 }}>
            Retour à Ma ceinture
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(180deg,#1A0E30 0%,#2D1F4A 50%,#F3EDE5 100%)', fontFamily:"'DM Sans',sans-serif", display:'flex', flexDirection:'column' }}>

      {/* Header */}
      <div style={{ padding:'52px 20px 20px' }}>
        <button onClick={() => navigate('/belt')} style={{ background:'rgba(255,255,255,.1)', border:'none', borderRadius:50, padding:'6px 14px', color:'rgba(255,255,255,.7)', fontSize:13, cursor:'pointer', marginBottom:16 }}>← Ma ceinture</button>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:28, color:'#fff', fontWeight:400, marginBottom:4 }}>
          Découvre ta ceinture
        </h1>
        <p style={{ fontSize:13, color:'rgba(155,141,200,.7)' }}>3 minutes pour sentir comment elle fonctionne</p>
      </div>

      {/* Indicateurs phases */}
      <div style={{ display:'flex', gap:8, padding:'0 20px', marginBottom:20 }}>
        {PHASES.map((p, i) => (
          <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i < phaseIdx ? p.color : i === phaseIdx ? p.color : 'rgba(255,255,255,.15)', transition:'background .5s ease' }}/>
        ))}
      </div>

      {/* Corps principal */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'0 20px 40px' }}>

        {/* Illustration ceinture */}
        <div style={{ position:'relative', marginBottom:24 }}>
          <BeltSVGV2
            centerColor={started ? phase.centerColor : '#3A2D5A'}
            sidesColor={started ? phase.sidesColor : '#3A3A5A'}
            bottomColor={started ? phase.bottomColor : '#2A2A4A'}
            backColor="#3A2D5A"
            pulseZone={started ? phase.activeZone : null}
            width={280}
          />
        </div>

        {/* Timer + Phase */}
        {started ? (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:20 }}>
              <CircleTimer remaining={remaining} total={60} color={phase.color}/>
              <div>
                <p style={{ fontSize:11, color:'rgba(155,141,200,.7)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>
                  {phase.emoji} Phase {phaseIdx + 1}/3 — {phase.label}
                </p>
                <p style={{ fontSize:16, color:'#fff', fontWeight:700, lineHeight:1.4, maxWidth:200 }}>
                  {phase.instruction}
                </p>
                <p style={{ fontSize:12, color:'rgba(155,141,200,.7)', marginTop:4, lineHeight:1.4 }}>
                  {phase.sub}
                </p>
              </div>
            </div>

            {/* Jauges capteurs */}
            <div style={{ width:'100%', maxWidth:360, display:'flex', flexDirection:'column', gap:8, background:'rgba(0,0,0,.3)', borderRadius:20, padding:'14px 16px' }}>
              {[
                { label:'Côtés', value:sensorVal.sides,  color:LED.inspire, active: phase.id === 'breathing' },
                { label:'Centre', value:sensorVal.center, color:LED.purple,  active: phase.id === 'core'      },
                { label:'Bas',   value:sensorVal.bottom, color:LED.ok,      active: phase.id === 'perineum'  },
              ].map(s => (
                <div key={s.label} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:12, color: s.active ? s.color : 'rgba(255,255,255,.4)', fontWeight:700, minWidth:44 }}>{s.label}</span>
                  <div style={{ flex:1, height:6, background:'rgba(255,255,255,.1)', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ width:`${s.value}%`, height:'100%', borderRadius:3, background:s.color, transition:'width .9s ease', boxShadow: s.active ? `0 0 8px ${s.color}80` : 'none' }}/>
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:s.active ? s.color : 'rgba(255,255,255,.3)', minWidth:30, textAlign:'right' }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Timer total restant */}
            <p style={{ marginTop:16, fontSize:12, color:'rgba(155,141,200,.5)' }}>
              {Math.floor(totalRemaining / 60)}:{String(totalRemaining % 60).padStart(2,'0')} restantes
            </p>
          </>
        ) : (
          /* Écran de démarrage */
          <div style={{ textAlign:'center', maxWidth:320 }}>
            <p style={{ fontSize:16, color:'rgba(255,255,255,.85)', lineHeight:1.7, marginBottom:28 }}>
              Pas de performance. Pas de score.<br/>Juste toi et ta ceinture, 3 minutes.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {PHASES.map((p, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:'rgba(255,255,255,.06)', borderRadius:14, border:`1px solid ${p.color}30` }}>
                  <span style={{ fontSize:18 }}>{p.emoji}</span>
                  <div style={{ textAlign:'left' }}>
                    <p style={{ fontSize:13, fontWeight:700, color:p.color }}>Phase {i+1} — {p.label}</p>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,.5)' }}>1 minute</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bouton lancer */}
      {!started && (
        <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, padding:'16px 20px 32px', background:'linear-gradient(to top, rgba(45,31,74,0.98) 0%, transparent 100%)' }}>
          <button onClick={() => setStarted(true)} style={{ width:'100%', padding:'18px', borderRadius:50, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B5EA7,#4A3669)', color:'#fff', fontSize:16, fontWeight:700, boxShadow:'0 8px 28px rgba(123,94,167,.5)' }}>
            ▶ Commencer la découverte
          </button>
        </div>
      )}
    </div>
  );
}
