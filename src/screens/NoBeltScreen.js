import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LED = { ok:'#5DCAA5', inspire:'#85B7EB', expire:'#EF9F27' };

export default function NoBeltScreen() {
  const navigate = useNavigate();
  const [, setConnecting] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [mode, setMode] = useState(null); // null | 'connecting' | 'charging'

  useEffect(() => {
    if (mode !== 'connecting') return;
    const id = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(id); navigate('/session'); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [mode, navigate]);

  if (mode === 'connecting') {
    return (
      <div style={{ minHeight:'100vh', background:'linear-gradient(180deg,#1A0E30,#2D1F4A)', fontFamily:"'DM Sans',sans-serif", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', textAlign:'center' }}>
        <div style={{ marginBottom:24 }}>
          {/* Ceinture animée en recherche */}
          <div style={{ width:80, height:80, borderRadius:'50%', border:`3px solid ${LED.inspire}`, display:'flex', alignItems:'center', justifyContent:'center', animation:'pulse 1.5s ease-in-out infinite', boxShadow:`0 0 30px ${LED.inspire}40` }}>
            <span style={{ fontSize:30 }}>⌚</span>
          </div>
        </div>
        <p style={{ fontSize:16, fontWeight:700, color:'#fff', marginBottom:8 }}>Connexion en cours...</p>
        <p style={{ fontSize:14, color:'rgba(155,141,200,.7)', marginBottom:28 }}>La séance démarre dans {countdown}s</p>
        <div style={{ width:200, height:5, background:'rgba(255,255,255,.1)', borderRadius:3, overflow:'hidden', marginBottom:32 }}>
          <div style={{ width:`${((30 - countdown) / 30) * 100}%`, height:'100%', background:`linear-gradient(90deg,${LED.inspire},${LED.ok})`, transition:'width 1s linear' }}/>
        </div>
        <button onClick={() => navigate('/session')} style={{ padding:'14px 28px', borderRadius:50, border:'1.5px solid rgba(255,255,255,.2)', background:'transparent', color:'rgba(255,255,255,.6)', fontSize:14, cursor:'pointer' }}>
          Lancer maintenant →
        </button>
      </div>
    );
  }

  if (mode === 'charging') {
    return (
      <div style={{ minHeight:'100vh', background:'#F3EDE5', fontFamily:"'DM Sans',sans-serif", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', textAlign:'center' }}>
        <div style={{ fontSize:60, marginBottom:20 }}>🔋</div>
        <h2 style={{ fontFamily:'var(--font-heading)', fontSize:26, color:'#2C2118', fontWeight:400, marginBottom:12 }}>Pas de problème !</h2>
        <p style={{ fontSize:15, color:'#9C8A78', lineHeight:1.7, marginBottom:32 }}>
          Lance ta séance — pense à recharger ta ceinture après.
        </p>
        <button onClick={() => navigate('/session')} style={{ width:'100%', maxWidth:320, padding:'16px', borderRadius:50, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B5EA7,#4A3669)', color:'#fff', fontSize:15, fontWeight:700, boxShadow:'0 6px 20px rgba(123,94,167,.35)', marginBottom:10 }}>
          ▶ Lancer la séance
        </button>
      </div>
    );
  }

  /* ── Écran principal ── */
  return (
    <div style={{ minHeight:'100vh', background:'#F3EDE5', fontFamily:"'DM Sans',sans-serif", display:'flex', flexDirection:'column' }}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', textAlign:'center' }}>

        {/* Icône ceinture déconnectée */}
        <div style={{ position:'relative', marginBottom:28 }}>
          <div style={{ width:90, height:90, borderRadius:'50%', background:'rgba(123,94,167,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:40 }}>
            ⌚
          </div>
          <div style={{ position:'absolute', bottom:0, right:0, width:28, height:28, borderRadius:'50%', background:'#F3EDE5', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:20, height:20, borderRadius:'50%', background:'#E24B4A', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#fff', fontWeight:700 }}>✗</div>
          </div>
        </div>

        <h1 style={{ fontFamily:'var(--font-heading)', fontSize:26, color:'#2C2118', fontWeight:400, marginBottom:8 }}>
          Ta ceinture n'est pas connectée
        </h1>
        <p style={{ fontSize:14, color:'#9C8A78', lineHeight:1.7, marginBottom:32, maxWidth:320 }}>
          Sans ceinture, tu pourras quand même faire la séance en guidage audio uniquement — sans analyse capteurs.
        </p>

        {/* Options */}
        <div style={{ width:'100%', maxWidth:380, display:'flex', flexDirection:'column', gap:12 }}>

          {/* Option 1 — Connecter */}
          <button
            onClick={() => { setConnecting(true); setMode('connecting'); }}
            style={{ padding:'18px 20px', borderRadius:20, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B5EA7,#4A3669)', color:'#fff', textAlign:'left', boxShadow:'0 6px 20px rgba(123,94,167,.3)' }}
          >
            <p style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>⌚ Connecter ma ceinture</p>
            <p style={{ fontSize:12, color:'rgba(255,255,255,.7)', lineHeight:1.4 }}>Ouvre le Bluetooth et tente la connexion. La séance démarrera automatiquement dans 30 secondes.</p>
          </button>

          {/* Option 2 — Sans ceinture */}
          <button
            onClick={() => navigate('/session')}
            style={{ padding:'18px 20px', borderRadius:20, border:'1.5px solid rgba(123,94,167,.25)', cursor:'pointer', background:'#FDFBF8', textAlign:'left' }}
          >
            <p style={{ fontSize:14, fontWeight:700, color:'#2C2118', marginBottom:4 }}>🎙️ Continuer sans ceinture</p>
            <p style={{ fontSize:12, color:'#9C8A78', lineHeight:1.4 }}>Guidage audio uniquement. Les scores capteurs afficheront "--". Pas d'alertes vibration ni d'analyse post-séance.</p>
          </button>

          {/* Option 3 — En charge */}
          <button
            onClick={() => setMode('charging')}
            style={{ padding:'18px 20px', borderRadius:20, border:'1.5px solid rgba(196,152,106,.25)', cursor:'pointer', background:'#FDFBF8', textAlign:'left' }}
          >
            <p style={{ fontSize:14, fontWeight:700, color:'#2C2118', marginBottom:4 }}>🔋 Ma ceinture est en charge</p>
            <p style={{ fontSize:12, color:'#9C8A78', lineHeight:1.4 }}>Je la rechargerai après la séance. Lancer en mode sans ceinture.</p>
          </button>
        </div>
      </div>
    </div>
  );
}
