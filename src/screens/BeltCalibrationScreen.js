import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BeltSVGV2 from '../components/BeltSVGV2';

const LED = { ok:'#5DCAA5', inspire:'#85B7EB', expire:'#EF9F27', purple:'#9B8DC8', alert:'#E24B4A' };

const STEPS = [
  {
    id: 'neutral', duration: 30, label: 'Position neutre',
    emoji: '🧘', color: LED.inspire,
    instruction: 'Tiens-toi droite et respire normalement pendant 30 secondes',
    sub: 'La ceinture enregistre ta ligne de base respiratoire',
    centerColor: '#3A2D5A', sidesColor: LED.inspire, bottomColor: '#2A2A4A', backColor: LED.inspire,
    saveKey: 'baseline',
  },
  {
    id: 'inspire_max', duration: 10, label: 'Inspiration maximale',
    emoji: '🫁', color: LED.inspire,
    instruction: 'Inspire le plus profondément possible et maintiens',
    sub: 'La ceinture enregistre ton expansion maximale',
    centerColor: '#3A2D5A', sidesColor: LED.ok, bottomColor: '#2A2A4A', backColor: LED.ok,
    saveKey: 'maxInspire',
  },
  {
    id: 'core_max', duration: 10, label: 'Gainage maximal',
    emoji: '💪', color: LED.purple,
    instruction: 'Gaine le plus fort possible et maintiens',
    sub: 'La ceinture enregistre ton engagement maximum',
    centerColor: LED.purple, sidesColor: '#3A3A5A', bottomColor: '#2A2A4A', backColor: LED.expire,
    saveKey: 'maxCore',
  },
  {
    id: 'release', duration: 10, label: 'Relâchement complet',
    emoji: '☁️', color: LED.ok,
    instruction: 'Relâche tout complètement',
    sub: 'La ceinture enregistre ton état de repos total',
    centerColor: '#3A2D5A', sidesColor: '#3A3A5A', bottomColor: LED.ok, backColor: '#2A2D5A',
    saveKey: 'restState',
  },
];

function CircleTimer({ remaining, total, color, large }) {
  const r = large ? 58 : 44;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - remaining / total);
  const size = large ? 130 : 100;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="6"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 1s linear', filter:`drop-shadow(0 0 8px ${color}80)` }}/>
      <text x={size/2} y={size/2 - 5} textAnchor="middle" fill="#fff" fontSize={large ? 28 : 20} fontWeight="700" fontFamily="DM Sans,sans-serif">{remaining}</text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize={large ? 12 : 10} fontFamily="DM Sans,sans-serif">sec</text>
    </svg>
  );
}

export default function BeltCalibrationScreen() {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(-1); // -1 = écran intro
  const [remaining, setRemaining] = useState(0);
  const [calibData, setCalibData] = useState({});
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  const startStep = (idx) => {
    const s = STEPS[idx];
    setStepIdx(idx);
    setRemaining(s.duration);
  };

  useEffect(() => {
    if (stepIdx < 0 || done) return;
    const s = STEPS[stepIdx];
    timerRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(timerRef.current);
          // Simuler les valeurs calibrées
          const simVal = {
            baseline: Math.round(40 + Math.random() * 15),
            maxInspire: Math.round(80 + Math.random() * 15),
            maxCore: Math.round(75 + Math.random() * 18),
            restState: Math.round(15 + Math.random() * 10),
          }[s.saveKey];
          setCalibData(prev => ({ ...prev, [s.saveKey]: simVal }));

          if (stepIdx < STEPS.length - 1) {
            setStepIdx(-2); // pause entre étapes
          } else {
            setDone(true);
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [stepIdx, done]);

  const step = stepIdx >= 0 ? STEPS[stepIdx] : null;

  /* ── Résultat ── */
  if (done) {
    return (
      <div style={{ minHeight:'100vh', background:'#F3EDE5', fontFamily:"'DM Sans',sans-serif", padding:'52px 20px 40px' }}>
        <button onClick={() => navigate('/belt')} style={{ background:'rgba(123,94,167,.1)', border:'none', borderRadius:50, padding:'6px 14px', color:'#7B5EA7', fontSize:13, cursor:'pointer', marginBottom:20 }}>← Ma ceinture</button>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:28, color:'#2C2118', fontWeight:400, marginBottom:6 }}>Calibration terminée ✓</h1>
        <p style={{ fontSize:14, color:'#9C8A78', marginBottom:24 }}>Les capteurs sont maintenant adaptés à ton corps</p>

        <div style={{ background:'linear-gradient(165deg,#4A3669,#2D1F4A)', borderRadius:24, padding:'20px', marginBottom:16, boxShadow:'0 8px 30px rgba(45,31,74,.35)' }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
            <BeltSVGV2 centerColor={LED.purple} sidesColor={LED.inspire} bottomColor={LED.ok} backColor={LED.expire} width={240}/>
          </div>
          <p style={{ fontSize:11, fontWeight:700, color:'rgba(155,141,200,.7)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:14 }}>
            Valeurs enregistrées
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { label:'Respiration au repos', key:'baseline', color:LED.inspire, icon:'🫁' },
              { label:'Expansion maximale',   key:'maxInspire', color:LED.ok, icon:'💨' },
              { label:'Gainage maximal',      key:'maxCore', color:LED.purple, icon:'💪' },
              { label:'État de repos',        key:'restState', color:'rgba(255,255,255,.5)', icon:'☁️' },
            ].map(item => (
              <div key={item.key} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'rgba(255,255,255,.07)', borderRadius:12 }}>
                <span style={{ fontSize:16 }}>{item.icon}</span>
                <span style={{ flex:1, fontSize:13, color:'rgba(255,255,255,.8)' }}>{item.label}</span>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:40, height:5, background:'rgba(255,255,255,.1)', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ width:`${calibData[item.key] || 0}%`, height:'100%', background:item.color, borderRadius:3 }}/>
                  </div>
                  <span style={{ fontSize:14, fontWeight:700, color:item.color, minWidth:28 }}>{calibData[item.key] || '--'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding:'14px 16px', background:'rgba(93,202,165,.12)', borderRadius:16, border:`1.5px solid ${LED.ok}30`, marginBottom:24 }}>
          <p style={{ fontSize:14, color:'#2C6B4A', lineHeight:1.6 }}>
            ✓ Tes capteurs sont maintenant calibrés pour ton corps. Les alertes et les scores seront bien plus précis.
          </p>
        </div>

        <button onClick={() => navigate('/belt')} style={{ width:'100%', padding:'16px', borderRadius:50, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B5EA7,#4A3669)', color:'#fff', fontSize:15, fontWeight:700, boxShadow:'0 6px 20px rgba(123,94,167,.35)' }}>
          💾 Sauvegarder et retourner à Ma Ceinture
        </button>
      </div>
    );
  }

  /* ── Écran intro ── */
  if (stepIdx === -1) {
    return (
      <div style={{ minHeight:'100vh', background:'#F3EDE5', fontFamily:"'DM Sans',sans-serif", padding:'52px 20px 40px' }}>
        <button onClick={() => navigate('/belt')} style={{ background:'rgba(123,94,167,.1)', border:'none', borderRadius:50, padding:'6px 14px', color:'#7B5EA7', fontSize:13, cursor:'pointer', marginBottom:20 }}>← Ma ceinture</button>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:28, color:'#2C2118', fontWeight:400, marginBottom:6 }}>Calibrer ma ceinture</h1>
        <p style={{ fontSize:14, color:'#9C8A78', marginBottom:24 }}>2 minutes pour des mesures précises</p>

        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <BeltSVGV2 centerColor={LED.purple} sidesColor={LED.inspire} bottomColor={LED.ok} backColor={LED.expire} width={260}/>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display:'flex', gap:14, alignItems:'center', padding:'12px 14px', background:'#FDFBF8', borderRadius:16, border:'1.5px solid rgba(196,152,106,.15)' }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:s.color+'20', border:`1.5px solid ${s.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>{s.emoji}</div>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:'#2C2118' }}>Étape {i+1} — {s.label}</p>
                <p style={{ fontSize:12, color:'#9C8A78' }}>{s.duration} secondes</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => startStep(0)} style={{ width:'100%', padding:'16px', borderRadius:50, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B5EA7,#4A3669)', color:'#fff', fontSize:15, fontWeight:700, boxShadow:'0 6px 20px rgba(123,94,167,.35)' }}>
          ▶ Démarrer la calibration
        </button>
      </div>
    );
  }

  /* ── Entre deux étapes ── */
  if (stepIdx === -2) {
    const nextIdx = STEPS.findIndex((s, i) => i > 0 && !calibData[s.saveKey]);
    const nextStep = nextIdx >= 0 ? STEPS[nextIdx] : null;
    return (
      <div style={{ minHeight:'100vh', background:'#F3EDE5', fontFamily:"'DM Sans',sans-serif", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', textAlign:'center' }}>
        <div style={{ fontSize:42, marginBottom:16 }}>✓</div>
        <p style={{ fontSize:18, fontWeight:700, color:'#2C6B4A', marginBottom:8 }}>Étape enregistrée</p>
        {nextStep ? (
          <>
            <p style={{ fontSize:14, color:'#9C8A78', marginBottom:28 }}>Prête pour la prochaine étape ?</p>
            <button onClick={() => startStep(STEPS.indexOf(nextStep))} style={{ padding:'16px 32px', borderRadius:50, border:'none', cursor:'pointer', background:`linear-gradient(135deg,${nextStep.color},${nextStep.color}CC)`, color:'#fff', fontSize:15, fontWeight:700 }}>
              {nextStep.emoji} {nextStep.label} →
            </button>
          </>
        ) : null}
      </div>
    );
  }

  /* ── Étape active ── */
  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(180deg,#1A0E30 0%,#2D1F4A 60%,#F3EDE5 100%)', fontFamily:"'DM Sans',sans-serif", display:'flex', flexDirection:'column', alignItems:'center', padding:'52px 20px 40px' }}>
      <div style={{ width:'100%', maxWidth:430 }}>
        <div style={{ display:'flex', gap:6, marginBottom:24 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex:1, height:4, borderRadius:2, background: calibData[s.saveKey] ? LED.ok : i === stepIdx ? s.color : 'rgba(255,255,255,.15)' }}/>
          ))}
        </div>

        <p style={{ fontSize:11, fontWeight:700, color:'rgba(155,141,200,.7)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:6 }}>
          {step.emoji} Étape {stepIdx + 1}/{STEPS.length} — {step.label}
        </p>
        <h2 style={{ fontFamily:'var(--font-heading)', fontSize:24, color:'#fff', fontWeight:400, marginBottom:6 }}>{step.instruction}</h2>
        <p style={{ fontSize:13, color:'rgba(155,141,200,.7)', marginBottom:28 }}>{step.sub}</p>

        <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}>
          <BeltSVGV2 centerColor={step.centerColor} sidesColor={step.sidesColor} bottomColor={step.bottomColor} backColor={step.backColor} width={240}/>
        </div>

        <div style={{ display:'flex', justifyContent:'center' }}>
          <CircleTimer remaining={remaining} total={step.duration} color={step.color} large/>
        </div>
      </div>
    </div>
  );
}
