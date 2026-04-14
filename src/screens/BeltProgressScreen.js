import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LED = { ok:'#5DCAA5', inspire:'#85B7EB', expire:'#EF9F27', alert:'#E24B4A', purple:'#9B8DC8' };

const WEEKS = [
  {
    week: 1, icon: '🌱', title: 'Découverte', subtitle: 'La ceinture apprend tes patterns de respiration',
    errors: 12, pct: 100, color: '#9B8DC8', done: true,
    desc: 'Calibration initiale terminée. 12 erreurs détectées en moyenne par séance.',
  },
  {
    week: 2, icon: '🔍', title: 'Reconnaissance', subtitle: 'La ceinture reconnaît tes erreurs habituelles',
    errors: 8, pct: 67, color: LED.inspire, done: true, delta: '-33%',
    desc: 'Les alertes deviennent plus précises. La ceinture a appris tes habitudes.',
  },
  {
    week: 3, icon: '⚙️', title: 'Adaptation', subtitle: 'Les alertes sont maintenant personnalisées pour toi',
    errors: 5, pct: 42, color: LED.expire, done: true, delta: '-58%',
    desc: 'Personnalisation active. La ceinture anticipe tes erreurs récurrentes.',
  },
  {
    week: 4, icon: '🏆', title: 'Maîtrise', subtitle: 'Ta ceinture anticipe tes patterns',
    errors: 2, pct: 17, color: LED.ok, done: false, delta: '-83%', isCurrent: true,
    desc: 'Niveau expert atteint. Moins de 2 erreurs par séance en moyenne.',
  },
];

const INSIGHTS = [
  { icon: '🫁', color: LED.inspire, text: 'Tu bloques souvent la respiration en fin d\'exercice', trend: 'En amélioration ↓' },
  { icon: '🌅', color: LED.expire, text: 'Ton gainage est plus fort le matin', trend: 'Stable ↔' },
  { icon: '📅', color: LED.ok, text: 'Tes séances du mercredi sont les plus performantes', trend: 'Confirmé ✓' },
  { icon: '💜', color: LED.purple, text: 'Tu améliores ton périnée de 12% par semaine', trend: 'En progression ↑' },
];

export default function BeltProgressScreen() {
  const navigate = useNavigate();
  const [expandedWeek, setExpandedWeek] = useState(3); // semaine 4 ouverte par défaut

  return (
    <div style={{ minHeight:'100vh', background:'#F3EDE5', paddingBottom:40, fontFamily:"'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ padding:'52px 20px 20px', background:'linear-gradient(175deg,#EDE6F4 0%,#F3EDE5 100%)', boxShadow:'0 1px 0 rgba(123,94,167,.12)' }}>
        <button onClick={() => navigate('/belt')} style={{ background:'rgba(123,94,167,.1)', border:'none', borderRadius:50, padding:'6px 14px', color:'#7B5EA7', fontSize:13, cursor:'pointer', marginBottom:14 }}>← Ma ceinture</button>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:28, color:'#2C2118', fontWeight:400, marginBottom:4 }}>
          Ta ceinture apprend
        </h1>
        <p style={{ fontSize:14, color:'#9C8A78' }}>Plus tu t'entraînes, plus elle comprend ton corps</p>
      </div>

      <div style={{ padding:'16px 16px 0' }}>

        {/* ── TIMELINE SEMAINES ── */}
        <div style={{ background:'#FDFBF8', borderRadius:24, padding:'18px 16px', marginBottom:14, border:'1.5px solid rgba(196,152,106,.15)', boxShadow:'0 2px 12px rgba(44,33,24,.06)' }}>
          <p style={{ fontSize:11, fontWeight:700, color:'#9C8A78', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:16 }}>
            📅 Timeline d'apprentissage
          </p>

          {/* Ligne de connexion */}
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:20, top:20, bottom:20, width:2, background:'linear-gradient(180deg,#9B8DC8,#5DCAA5)', zIndex:0 }}/>

            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {WEEKS.map((w, i) => (
                <div key={i} onClick={() => setExpandedWeek(expandedWeek === i ? null : i)}
                  style={{ position:'relative', zIndex:1, cursor:'pointer' }}>
                  <div style={{
                    display:'flex', gap:14, alignItems:'flex-start',
                    padding:'14px', borderRadius:18,
                    background: w.isCurrent ? `linear-gradient(135deg,${w.color}20,${w.color}10)` : '#F8F5F0',
                    border: w.isCurrent ? `2px solid ${w.color}40` : '1.5px solid rgba(196,152,106,.15)',
                    boxShadow: w.isCurrent ? `0 4px 16px ${w.color}30` : 'none',
                    transition: 'all .3s ease',
                  }}>
                    {/* Icône semaine */}
                    <div style={{ width:42, height:42, borderRadius:'50%', background: w.done || w.isCurrent ? w.color+'30' : '#E8E4F0', border:`2px solid ${w.done || w.isCurrent ? w.color : '#C4C0D0'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0, boxShadow: w.isCurrent ? `0 0 12px ${w.color}60` : 'none' }}>
                      {w.done && !w.isCurrent ? '✓' : w.icon}
                    </div>

                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                        <p style={{ fontSize:14, fontWeight:700, color:'#2C2118' }}>Semaine {w.week} — {w.title}</p>
                        {w.isCurrent && (
                          <span style={{ fontSize:10, fontWeight:700, color:w.color, background:w.color+'20', borderRadius:50, padding:'2px 8px' }}>En cours</span>
                        )}
                      </div>
                      <p style={{ fontSize:12, color:'#9C8A78', marginBottom:6 }}>{w.subtitle}</p>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ flex:1, height:5, background:'rgba(123,94,167,.12)', borderRadius:3, overflow:'hidden' }}>
                          <div style={{ width:`${100 - w.pct}%`, height:'100%', borderRadius:3, background:`linear-gradient(90deg,${w.color}80,${w.color})`, transition:'width .8s ease' }}/>
                        </div>
                        <span style={{ fontSize:12, fontWeight:700, color:w.color }}>{w.errors} err.</span>
                        {w.delta && <span style={{ fontSize:11, color:LED.ok, fontWeight:700 }}>{w.delta}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Détail étendu */}
                  {expandedWeek === i && (
                    <div style={{ marginTop:6, padding:'12px 14px', background:'rgba(123,94,167,.06)', borderRadius:12, border:'1px solid rgba(123,94,167,.15)', marginLeft:56 }}>
                      <p style={{ fontSize:13, color:'#4A3669', lineHeight:1.6 }}>{w.desc}</p>
                      {w.isCurrent && (
                        <div style={{ marginTop:8, padding:'8px 10px', background:LED.ok+'15', borderRadius:8 }}>
                          <p style={{ fontSize:12, color:'#2C6B4A', fontWeight:600 }}>🏆 Badge doré — Progression exceptionnelle ✓</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CE QUE MA CEINTURE SAIT DE MOI ── */}
        <div style={{ background:'linear-gradient(165deg,#3A2660,#261840)', borderRadius:24, padding:'18px 16px', marginBottom:14, boxShadow:'0 4px 20px rgba(45,31,74,.25)' }}>
          <p style={{ fontSize:11, fontWeight:700, color:'rgba(155,141,200,.8)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:14 }}>
            🧠 Ce que ma ceinture sait de moi
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {INSIGHTS.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'12px 14px', background:'rgba(255,255,255,.07)', borderRadius:14, border:`1px solid ${item.color}25` }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{item.icon}</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,.9)', lineHeight:1.5 }}>{item.text}</p>
                  <p style={{ fontSize:11, color:item.color, fontWeight:600, marginTop:3 }}>{item.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROCHAIN OBJECTIF ── */}
        <div style={{ background:'#FDFBF8', borderRadius:24, padding:'18px 16px', marginBottom:20, border:'1.5px solid rgba(196,152,106,.15)', boxShadow:'0 2px 12px rgba(44,33,24,.06)' }}>
          <p style={{ fontSize:11, fontWeight:700, color:'#9C8A78', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:14 }}>
            🎯 Prochains objectifs ceinture
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ padding:'14px', background:LED.ok+'12', borderRadius:16, border:`1.5px solid ${LED.ok}30` }}>
              <p style={{ fontSize:14, fontWeight:700, color:'#2C2118', marginBottom:6 }}>Semaine 5 : moins de 2 erreurs par séance</p>
              <div style={{ height:8, background:'rgba(93,202,165,.15)', borderRadius:4, overflow:'hidden', marginBottom:6 }}>
                <div style={{ width:'80%', height:'100%', borderRadius:4, background:`linear-gradient(90deg,${LED.ok},#3DD68C)`, boxShadow:`0 0 6px ${LED.ok}60` }}/>
              </div>
              <p style={{ fontSize:12, color:'#5A8A70' }}>80% atteint · À ce rythme, objectif dans <strong>4 jours</strong></p>
            </div>
            <div style={{ padding:'14px', background:LED.purple+'10', borderRadius:16, border:`1.5px solid ${LED.purple}25` }}>
              <p style={{ fontSize:14, fontWeight:700, color:'#2C2118', marginBottom:6 }}>Semaine 6 : 0 blocage respiratoire sur hip thrust</p>
              <div style={{ height:8, background:'rgba(155,141,200,.15)', borderRadius:4, overflow:'hidden', marginBottom:6 }}>
                <div style={{ width:'55%', height:'100%', borderRadius:4, background:`linear-gradient(90deg,${LED.purple},#A689C4)` }}/>
              </div>
              <p style={{ fontSize:12, color:'#9C8A78' }}>55% atteint</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
