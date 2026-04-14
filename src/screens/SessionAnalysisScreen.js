import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LED = { inspire:'#85B7EB', ok:'#5DCAA5', alert:'#E24B4A', expire:'#EF9F27', purple:'#9B8DC8' };

/* ── Score animé ── */
function AnimatedScore({ target, color, size = 120, label }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let v = 0;
    const interval = setInterval(() => {
      v = Math.min(target, v + 2);
      setCurrent(v);
      if (v >= target) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [target]);

  const r = (size / 2) - 10;
  const circ = 2 * Math.PI * r;
  const offset = circ - (current / 100) * circ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset .05s linear', filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
        <text x={size/2} y={size/2 - 4} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily="DM Sans, sans-serif">{current}</text>
        <text x={size/2} y={size/2 + 14} textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="DM Sans, sans-serif">/100</text>
      </svg>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', fontWeight: 600, textAlign: 'center' }}>{label}</span>
    </div>
  );
}

/* ── Mini graphique ligne ── */
function MiniLineChart({ data, color, height = 36 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 120, h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}/>
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / (max - min + 1)) * (h - 6) - 3;
        return <circle key={i} cx={x} cy={y} r="3" fill={color}/>;
      })}
    </svg>
  );
}

/* ── Timeline séance ── */
function SessionTimeline({ events }) {
  return (
    <div style={{ position: 'relative', height: 50, background: 'rgba(255,255,255,.07)', borderRadius: 10, overflow: 'hidden' }}>
      {/* Ligne de base verte */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: LED.ok + '50', transform: 'translateY(-50%)' }}/>
      {/* Pics d'erreurs */}
      {events.map((ev, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${ev.pos}%`,
          bottom: '50%',
          width: 6,
          height: ev.type === 'error' ? 20 : ev.type === 'warning' ? 12 : 6,
          background: ev.type === 'error' ? LED.alert : ev.type === 'warning' ? LED.expire : LED.ok,
          borderRadius: '3px 3px 0 0',
          transform: 'translateX(-50%)',
          boxShadow: `0 0 6px ${ev.type === 'error' ? LED.alert : LED.expire}80`,
        }}/>
      ))}
    </div>
  );
}

const MOCK_EVENTS = [
  { pos: 8,  type: 'error' },   { pos: 15, type: 'ok' },
  { pos: 28, type: 'warning' }, { pos: 35, type: 'ok' },
  { pos: 42, type: 'error' },   { pos: 55, type: 'ok' },
  { pos: 62, type: 'ok' },      { pos: 70, type: 'warning' },
  { pos: 80, type: 'ok' },      { pos: 88, type: 'ok' },
  { pos: 95, type: 'ok' },
];

const ERRORS_DATA = [
  { type: 'Blocage respiratoire', count: 3, prev: 6, moment: 'surtout en début de hip thrust', color: LED.alert },
  { type: 'Poussée vers le bas',  count: 1, prev: 4, moment: 'à l\'expiration forcée',         color: LED.expire },
  { type: 'Gainage absent',       count: 2, prev: 3, moment: 'milieu de séance',               color: LED.inspire },
];

const WEEKLY = [
  { week: 1, errors: 14 },
  { week: 2, errors: 9  },
  { week: 3, errors: 5  },
  { week: 4, errors: 3  },
];

export default function SessionAnalysisScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', paddingBottom: 40, fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{
        background: 'linear-gradient(165deg,#4A3669 0%,#2D1F4A 100%)',
        padding: '52px 20px 28px',
        position: 'relative', overflow: 'hidden',
      }}>
        {[180,120].map((s,i) => (
          <div key={i} style={{ position:'absolute', top:-s/2, right:-s/2, width:s, height:s, borderRadius:'50%', border:'1px solid rgba(255,255,255,.04)', pointerEvents:'none' }}/>
        ))}
        <button onClick={() => navigate(-1)} style={{ background:'rgba(255,255,255,.1)', border:'none', borderRadius:50, padding:'6px 14px', color:'rgba(255,255,255,.7)', fontSize:13, cursor:'pointer', marginBottom:16 }}>← Retour</button>
        <p style={{ fontSize:11, color:'rgba(155,141,200,.7)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>Analyse de ta séance</p>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:28, color:'#fff', fontWeight:400, marginBottom:4 }}>Rapport ceinture</h1>
        <p style={{ fontSize:13, color:'rgba(155,141,200,.7)' }}>Aujourd'hui · 28 min · 4 séries</p>

        {/* Score global */}
        <div style={{ display:'flex', justifyContent:'center', marginTop:24 }}>
          <AnimatedScore target={82} color={LED.ok} size={130} label="Score global"/>
        </div>
      </div>

      <div style={{ padding:'16px 16px 0' }}>

        {/* ── 3 SCORES DÉTAILLÉS ── */}
        <div style={{ background:'linear-gradient(165deg,#3A2660,#261840)', borderRadius:24, padding:'18px 16px', marginBottom:14, boxShadow:'0 4px 20px rgba(45,31,74,.25)' }}>
          <p style={{ fontSize:11, fontWeight:700, color:'rgba(155,141,200,.8)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:16 }}>
            Scores détaillés
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'space-around' }}>
            <AnimatedScore target={78} color={LED.inspire} size={90} label="Respiration"/>
            <AnimatedScore target={85} color={LED.purple} size={90} label="Gainage"/>
            <AnimatedScore target={88} color={LED.ok} size={90} label="Protection périnée"/>
          </div>
          {/* Mini graphiques */}
          <div style={{ display:'flex', gap:12, marginTop:16, justifyContent:'space-around' }}>
            <MiniLineChart data={[60,65,72,68,75,78,80]} color={LED.inspire}/>
            <MiniLineChart data={[70,74,80,77,83,85,88]} color={LED.purple}/>
            <MiniLineChart data={[80,82,85,83,86,88,90]} color={LED.ok}/>
          </div>
        </div>

        {/* ── ERREURS DÉTECTÉES ── */}
        <div style={{ background:'#FDFBF8', borderRadius:24, padding:'18px 16px', marginBottom:14, border:'1.5px solid rgba(196,152,106,.15)', boxShadow:'0 2px 12px rgba(44,33,24,.06)' }}>
          <p style={{ fontSize:11, fontWeight:700, color:'#9C8A78', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:14 }}>
            ⚠️ Erreurs détectées
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {ERRORS_DATA.map((err, i) => (
              <div key={i} style={{ padding:'14px', borderRadius:16, background:err.color+'10', border:`1.5px solid ${err.color}30` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                  <p style={{ fontSize:14, fontWeight:700, color:'#2C2118' }}>{err.type}</p>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ fontSize:18, fontWeight:700, color:err.color }}>{err.count}×</p>
                  </div>
                </div>
                <p style={{ fontSize:12, color:'#9C8A78', marginBottom:6 }}>Détecté {err.moment}</p>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <span style={{ fontSize:11, color:LED.ok, fontWeight:700 }}>↓ {err.prev - err.count} fois de moins qu'avant</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TIMELINE ── */}
        <div style={{ background:'#FDFBF8', borderRadius:24, padding:'18px 16px', marginBottom:14, border:'1.5px solid rgba(196,152,106,.15)', boxShadow:'0 2px 12px rgba(44,33,24,.06)' }}>
          <p style={{ fontSize:11, fontWeight:700, color:'#9C8A78', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:10 }}>
            📊 Timeline de la séance
          </p>
          <SessionTimeline events={MOCK_EVENTS}/>
          <div style={{ display:'flex', gap:16, marginTop:10 }}>
            {[{color:LED.ok,label:'Bonne exécution'},{color:LED.expire,label:'Attention'},{color:LED.alert,label:'Erreur'}].map((item,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:item.color }}/>
                <span style={{ fontSize:10, color:'#9C8A78' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROGRESSION 4 SEMAINES ── */}
        <div style={{ background:'#FDFBF8', borderRadius:24, padding:'18px 16px', marginBottom:14, border:'1.5px solid rgba(196,152,106,.15)', boxShadow:'0 2px 12px rgba(44,33,24,.06)' }}>
          <p style={{ fontSize:11, fontWeight:700, color:'#9C8A78', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:14 }}>
            📈 Ta progression sur 4 semaines
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {WEEKLY.map((w, i) => {
              const isLast = i === WEEKLY.length - 1;
              const pct = Math.round((w.errors / 14) * 100);
              return (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontSize:12, color:isLast?'#2C2118':'#9C8A78', fontWeight:isLast?700:400, minWidth:60 }}>
                    {isLast ? 'Aujourd\'hui' : `Semaine ${w.week}`}
                  </span>
                  <div style={{ flex:1, height:8, background:'rgba(123,94,167,.12)', borderRadius:4, overflow:'hidden' }}>
                    <div style={{ width:`${pct}%`, height:'100%', borderRadius:4, background: isLast ? `linear-gradient(90deg,${LED.ok},#3DD68C)` : 'linear-gradient(90deg,#9B8DC8,#7B6BA8)', transition:'width .6s ease', boxShadow: isLast ? `0 0 6px ${LED.ok}60` : 'none' }}/>
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color:isLast?LED.ok:'#9B8DC8', minWidth:24 }}>{w.errors}</span>
                  {isLast && <span style={{ fontSize:11, color:LED.ok }}>↓</span>}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:12, padding:'10px 12px', background:LED.ok+'15', borderRadius:12, border:`1px solid ${LED.ok}30` }}>
            <p style={{ fontSize:13, color:'#2C6B4A', fontWeight:600 }}>
              🎉 -79% d'erreurs en 4 semaines — progression exceptionnelle !
            </p>
          </div>
        </div>

        {/* ── RECOMMANDATIONS ── */}
        <div style={{ background:'linear-gradient(135deg,#F0EAF8,#EDE6F4)', borderRadius:24, padding:'18px 16px', marginBottom:20, border:'1.5px solid rgba(123,94,167,.2)' }}>
          <p style={{ fontSize:11, fontWeight:700, color:'#7B5EA7', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:14 }}>
            💡 Recommandations personnalisées
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { icon:'🔴', text:'Tu bloques souvent au début des hip thrust → inspire bien avant de monter la charge' },
              { icon:'🟡', text:'Ton gainage s\'améliore en fin de séance → commence à gainner dès les premières séries' },
              { icon:'🟢', text:'Ton périnée est très bien protégé → continue comme ça !' },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'10px 12px', background:'rgba(255,255,255,.7)', borderRadius:12 }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{item.icon}</span>
                <p style={{ fontSize:13, color:'#4A3669', lineHeight:1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOUTONS ── */}
        <button onClick={() => {
          const w = window.open('', '_blank');
          if (w) {
            w.document.write(`<html><head><title>Analyse SENSIA</title><style>body{font-family:sans-serif;max-width:600px;margin:40px auto;color:#2C2118}h1{color:#7B5EA7}</style></head><body><h1>Analyse de séance SENSIA</h1><p>Date : ${new Date().toLocaleDateString('fr-FR')}</p><p>Score global : 82/100</p><p>Respiration : 78/100 | Gainage : 85/100 | Périnée : 88/100</p><h2>Erreurs détectées</h2><ul><li>Blocage respiratoire : 3× (↓6 avant)</li><li>Poussée vers le bas : 1× (↓4 avant)</li><li>Gainage absent : 2× (↓3 avant)</li></ul></body></html>`);
            w.document.close(); w.print();
          }
        }} style={{ width:'100%', padding:'16px', borderRadius:50, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B5EA7,#4A3669)', color:'#fff', fontSize:15, fontWeight:700, marginBottom:10, boxShadow:'0 6px 20px rgba(123,94,167,.35)' }}>
          📄 Partager mon analyse (PDF)
        </button>
        <button onClick={() => navigate('/belt')} style={{ width:'100%', padding:'14px', borderRadius:50, border:'1.5px solid rgba(123,94,167,.4)', cursor:'pointer', background:'transparent', color:'#7B5EA7', fontSize:14, fontWeight:600, marginBottom:10 }}>
          ⌚ Ma ceinture
        </button>
        <button onClick={() => navigate('/home')} style={{ width:'100%', padding:'14px', borderRadius:50, border:'1.5px solid rgba(196,152,106,.3)', cursor:'pointer', background:'transparent', color:'#C4986A', fontSize:14, fontWeight:600 }}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
