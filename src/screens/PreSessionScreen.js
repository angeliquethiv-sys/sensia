import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeltSVGV2 from '../components/BeltSVGV2';

const LED = { ok:'#5DCAA5', purple:'#9B8DC8', inspire:'#85B7EB' };

const CHECKS = [
  {
    id: 'center',
    icon: '🎯',
    title: 'Position centrale',
    question: 'La zone centrale est bien sur ton nombril ?',
    desc: 'La zone violette doit être exactement sur ton nombril, ni trop haute, ni trop basse',
    highlight: 'center',
    sidesColor: '#3A3A5A', centerColor: LED.purple, bottomColor: '#2A2A4A', backColor:'#2A2D5A',
  },
  {
    id: 'bottom',
    icon: '▽',
    title: 'Zone basse en V',
    question: 'La zone en V effleure ton bas ventre sans comprimer ?',
    desc: 'Tu dois à peine sentir la ceinture dans cette zone — pas de pression',
    highlight: 'bottom',
    sidesColor: '#3A3A5A', centerColor: '#3A2D5A', bottomColor: LED.ok, backColor:'#2A2D5A',
  },
  {
    id: 'velcro',
    icon: '✋',
    title: 'Velcro ajusté',
    question: 'Tu peux glisser 2 doigts sous la ceinture ?',
    desc: 'Si tu ne passes qu\'un doigt : desserrer. Si tu en passes 3 facilement : resserrer',
    highlight: 'sides',
    sidesColor: LED.inspire, centerColor: '#3A2D5A', bottomColor: '#2A2A4A', backColor:'#2A2D5A',
  },
];

export default function PreSessionScreen() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  const [skipped, setSkipped] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(0);

  const allChecked = CHECKS.every(c => checked[c.id]);
  const check = CHECKS[currentFocus] || CHECKS[0];

  const handleYes = (id) => {
    setChecked(prev => ({ ...prev, [id]: true }));
    if (currentFocus < CHECKS.length - 1) setCurrentFocus(f => f + 1);
  };

  return (
    <div style={{ minHeight:'100vh', background:'#F3EDE5', fontFamily:"'DM Sans',sans-serif", display:'flex', flexDirection:'column' }}>

      {/* Header */}
      <div style={{ padding:'52px 20px 20px', background:'linear-gradient(175deg,#EDE6F4 0%,#F3EDE5 100%)' }}>
        <p style={{ fontSize:11, fontWeight:700, color:'#9B8DC8', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4 }}>
          ⌚ Vérification pré-séance
        </p>
        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:26, color:'#2C2118', fontWeight:400, marginBottom:4 }}>
          Vérifions ta ceinture
        </h1>
        <p style={{ fontSize:13, color:'#9C8A78' }}>30 secondes pour une séance parfaite</p>
      </div>

      <div style={{ flex:1, padding:'16px 20px 120px', display:'flex', flexDirection:'column', gap:14 }}>

        {/* Illustration ceinture focus actuel */}
        <div style={{ display:'flex', justifyContent:'center', padding:'8px 0' }}>
          <BeltSVGV2
            centerColor={check.centerColor}
            sidesColor={check.sidesColor}
            bottomColor={check.bottomColor}
            backColor={check.backColor}
            pulseZone={checked[check.id] ? null : check.highlight}
            width={280}
          />
        </div>

        {/* Checklist */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {CHECKS.map((c, i) => {
            const isDone  = checked[c.id];
            const isActive = i === currentFocus && !isDone;
            return (
              <div
                key={c.id}
                onClick={() => !isDone && setCurrentFocus(i)}
                style={{
                  borderRadius:18, padding:'14px 16px', cursor:'pointer',
                  background: isDone ? LED.ok + '12' : isActive ? '#fff' : '#F8F5F0',
                  border: isDone ? `2px solid ${LED.ok}40` : isActive ? '2px solid rgba(123,94,167,.3)' : '1.5px solid rgba(196,152,106,.15)',
                  boxShadow: isActive ? '0 4px 16px rgba(123,94,167,.15)' : 'none',
                  transition: 'all .3s ease',
                }}
              >
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  {/* Indicateur */}
                  <div style={{
                    width:32, height:32, borderRadius:'50%', flexShrink:0,
                    background: isDone ? LED.ok : isActive ? 'rgba(123,94,167,.15)' : 'rgba(196,152,106,.12)',
                    border: isDone ? 'none' : isActive ? '2px solid #7B5EA7' : '1.5px solid rgba(196,152,106,.3)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize: isDone ? 16 : 14,
                    transition:'all .3s ease',
                  }}>
                    {isDone ? '✓' : c.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:14, fontWeight:700, color: isDone ? '#2C6B4A' : '#2C2118', marginBottom:2 }}>{c.title}</p>
                    {isActive && <p style={{ fontSize:12, color:'#9C8A78', lineHeight:1.5 }}>{c.desc}</p>}
                  </div>
                  {isDone && <span style={{ fontSize:13, color:LED.ok, fontWeight:700 }}>OK ✓</span>}
                </div>

                {/* Bouton OUI */}
                {isActive && !isDone && (
                  <div style={{ marginTop:12, display:'flex', gap:10 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleYes(c.id); }}
                      style={{ flex:1, padding:'12px', borderRadius:50, border:'none', cursor:'pointer', background:`linear-gradient(135deg,${LED.ok},#3DD68C)`, color:'#fff', fontSize:14, fontWeight:700, boxShadow:`0 4px 14px ${LED.ok}50` }}
                    >
                      ✓ Oui, c'est bon
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); if (currentFocus < CHECKS.length - 1) setCurrentFocus(f => f + 1); }}
                      style={{ padding:'12px 16px', borderRadius:50, border:'1.5px solid rgba(196,152,106,.3)', cursor:'pointer', background:'transparent', color:'#9C8A78', fontSize:13 }}
                    >
                      Ajuster →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Message validation */}
        {allChecked && (
          <div style={{ padding:'14px 16px', background:LED.ok+'18', borderRadius:18, border:`2px solid ${LED.ok}40`, textAlign:'center', animation:'fadeIn .4s ease' }}>
            <p style={{ fontSize:15, fontWeight:700, color:'#2C6B4A' }}>🎉 Ta ceinture est parfaitement positionnée ✓</p>
          </div>
        )}
      </div>

      {/* Boutons bas */}
      <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, padding:'14px 20px 32px', background:'rgba(243,237,229,.97)', backdropFilter:'blur(16px)', borderTop:'1px solid rgba(196,152,106,.15)' }}>
        <button
          onClick={() => navigate('/session')}
          disabled={!allChecked && !skipped}
          style={{
            width:'100%', padding:'16px', borderRadius:50, border:'none', cursor: allChecked || skipped ? 'pointer' : 'default',
            background: allChecked || skipped ? 'linear-gradient(135deg,#7B5EA7,#4A3669)' : 'rgba(123,94,167,.2)',
            color: allChecked || skipped ? '#fff' : 'rgba(123,94,167,.5)',
            fontSize:15, fontWeight:700, marginBottom:8,
            boxShadow: allChecked || skipped ? '0 6px 20px rgba(123,94,167,.35)' : 'none',
            transition:'all .3s ease',
          }}
        >
          {allChecked ? '▶ Lancer la séance' : '▶ Lancer la séance'}
        </button>
        {!allChecked && (
          <button
            onClick={() => { setSkipped(true); navigate('/session'); }}
            style={{ width:'100%', padding:'12px', borderRadius:50, border:'none', cursor:'pointer', background:'transparent', color:'#9C8A78', fontSize:13 }}
          >
            Passer — Note : une mauvaise position fausse les données capteurs
          </button>
        )}
      </div>
    </div>
  );
}
