import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import BeltSVGV2 from '../components/BeltSVGV2';

/* ── Couleurs LED V2 ── */
const LED = { inspire:'#85B7EB', expire:'#EF9F27', ok:'#5DCAA5', alert:'#E24B4A', purple:'#9B8DC8', off:'#3A2D5A' };


/* ── Jauge capteur ── */
function SensorGauge({ label, value, color, status }) {
  const statusInfo = status === 'ok'
    ? { label: 'OK', color: LED.ok }
    : status === 'attention'
    ? { label: 'Attention', color: LED.expire }
    : { label: 'Alerte', color: LED.alert };

  return (
    <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 16, padding: '14px 16px', border: `1px solid ${color}30` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusInfo.color }}/>
          <span style={{ fontSize: 10, color: statusInfo.color, fontWeight: 700 }}>{statusInfo.label}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            transition: 'width 0.8s ease',
            boxShadow: `0 0 8px ${color}60`,
          }}/>
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, color, minWidth: 36, textAlign: 'right' }}>{value}</span>
      </div>
    </div>
  );
}

/* ── Historique 7 jours (données simulées) ── */
const HISTORY = [
  { day: 'L', errors: 8, sessions: 1 },
  { day: 'M', errors: 7, sessions: 1 },
  { day: 'M', errors: 6, sessions: 2 },
  { day: 'J', errors: 5, sessions: 1 },
  { day: 'V', errors: 4, sessions: 1 },
  { day: 'S', errors: 3, sessions: 2 },
  { day: 'D', errors: 2, sessions: 1 },
];

export default function BeltScreen() {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(true);
  const [battery] = useState(78);
  const [syncTime, setSyncTime] = useState('Il y a 2 minutes');

  /* ── Capteurs simulés ── */
  const [sensorCenter, setSensorCenter] = useState(62);
  const [sensorSides,  setSensorSides]  = useState(74);
  const [sensorBottom, setSensorBottom] = useState(45);
  const [sensorBack,   setSensorBack]   = useState(58);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!connected) return;
    intervalRef.current = setInterval(() => {
      setSensorCenter(v => Math.min(100, Math.max(0, v + (Math.random() * 10 - 5) | 0)));
      setSensorSides (v => Math.min(100, Math.max(0, v + (Math.random() * 12 - 6) | 0)));
      setSensorBottom(v => Math.min(100, Math.max(0, v + (Math.random() * 8  - 4) | 0)));
      setSensorBack  (v => Math.min(100, Math.max(0, v + (Math.random() * 10 - 5) | 0)));
    }, 1200);
    return () => clearInterval(intervalRef.current);
  }, [connected]);

  /* ── LED selon valeurs ── */
  const centerLed = sensorCenter > 50 ? LED.purple : LED.off;
  const sidesLed  = sensorSides  > 40 ? LED.inspire : LED.off;
  const bottomLed = sensorBottom < 70 ? LED.ok : LED.alert;
  const backLed   = sensorBack   > 45 ? LED.expire : LED.off;

  const centerStatus = sensorCenter > 60 ? 'ok' : sensorCenter > 30 ? 'attention' : 'alerte';
  const sidesStatus  = sensorSides  > 50 ? 'ok' : sensorSides  > 25 ? 'attention' : 'alerte';
  const bottomStatus = sensorBottom < 60 ? 'ok' : sensorBottom < 80 ? 'attention' : 'alerte';
  const backStatus   = sensorBack   > 55 ? 'ok' : sensorBack   > 30 ? 'attention' : 'alerte';

  /* ── Batterie — autonomie estimée ── */
  const batteryColor   = battery > 50 ? LED.ok : battery > 20 ? LED.expire : LED.alert;
  const batteryHours   = Math.round(battery * 0.12);
  const batteryLabel   = battery > 50 ? 'Bonne autonomie' : battery > 20 ? 'Autonomie limitée' : 'Recharge urgente';

  /* ── Connexion simulée ── */
  const handleConnect = () => {
    setConnected(true);
    setSyncTime('À l\'instant');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', paddingBottom: 100, fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: '52px 20px 16px',
        background: 'linear-gradient(175deg,#EDE6F4 0%,#F3EDE5 100%)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 0 rgba(123,94,167,.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#2C2118', fontWeight: 400, marginBottom: 2 }}>
            Ma ceinture
          </h1>
          <p style={{ fontSize: 13, color: '#9C8A78' }}>SENSIA Belt · Intelligence périnéale</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: connected ? 'rgba(61,214,140,.12)' : 'rgba(226,75,74,.1)', border: `1.5px solid ${connected ? 'rgba(61,214,140,.35)' : 'rgba(226,75,74,.3)'}`, borderRadius: 50, padding: '7px 14px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: connected ? '#3DD68C' : '#E24B4A', animation: connected ? 'ledGreen 1.8s ease-in-out infinite' : 'none' }}/>
          <span style={{ fontSize: 11, fontWeight: 700, color: connected ? '#3DD68C' : '#E24B4A' }}>
            {connected ? 'Connectée' : 'Non connectée'}
          </span>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>

        {/* ── CARTE STATUT PRINCIPAL ── */}
        <div style={{
          background: 'linear-gradient(165deg,#4A3669 0%,#2D1F4A 100%)',
          borderRadius: 28, padding: '24px 20px 20px',
          marginBottom: 14, marginTop: 16,
          boxShadow: '0 12px 40px rgba(45,31,74,.45)',
          position: 'relative', overflow: 'hidden',
        }}>
          {[200, 130, 70].map((s, i) => (
            <div key={i} style={{ position: 'absolute', top: -s/2, right: -s/2, width: s, height: s, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)', pointerEvents: 'none' }}/>
          ))}

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <BeltSVGV2 centerColor={centerLed} sidesColor={sidesLed} bottomColor={bottomLed} backColor={backLed} width={240} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 2 }}>SENSIA Belt</p>
              <p style={{ fontSize: 12, color: 'rgba(155,141,200,.8)' }}>
                {connected ? '🔵 Connectée · Signal fort' : '⚫ Non connectée'}
              </p>
            </div>
            {connected ? (
              <button onClick={() => setConnected(false)} style={{ padding: '6px 14px', borderRadius: 50, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.6)', fontSize: 11, cursor: 'pointer' }}>
                Déconnecter
              </button>
            ) : (
              <button onClick={handleConnect} style={{ padding: '8px 16px', borderRadius: 50, background: LED.ok, border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                Connecter
              </button>
            )}
          </div>

          {/* Batterie enrichie */}
          <div style={{ marginBottom: 12, padding: '12px 14px', background: 'rgba(255,255,255,.06)', borderRadius: 16, border: `1px solid ${batteryColor}30` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 14 }}>🔋</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.8)' }}>Batterie</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: batteryColor }}>{batteryLabel}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: batteryColor }}>{battery}%</span>
              </div>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,.12)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ width: `${battery}%`, height: '100%', borderRadius: 4, background: `linear-gradient(90deg,${batteryColor}80,${batteryColor})`, transition: 'width .5s ease', boxShadow: `0 0 8px ${batteryColor}60` }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'rgba(155,141,200,.6)' }}>≈ {batteryHours}h d'autonomie restante</span>
              {battery <= 20 && (
                <span style={{ fontSize: 11, fontWeight: 700, color: LED.alert }}>⚠ Recharge maintenant</span>
              )}
            </div>
            {battery <= 50 && (
              <div style={{ marginTop: 8, padding: '8px 10px', background: `${batteryColor}15`, borderRadius: 10, border: `1px solid ${batteryColor}30` }}>
                <p style={{ fontSize: 11, color: battery > 20 ? '#C4986A' : '#E24B4A', lineHeight: 1.5 }}>
                  {battery > 20
                    ? '💡 Branche ta ceinture après ta prochaine séance'
                    : '⚡ Connecte la ceinture au chargeur avant de commencer'}
                </p>
              </div>
            )}
          </div>

          <p style={{ fontSize: 11, color: 'rgba(155,141,200,.6)', textAlign: 'right' }}>
            Synchronisée {syncTime}
          </p>
        </div>

        {/* ── CAPTEURS EN DIRECT ── */}
        <div style={{ background: 'linear-gradient(165deg,#3A2660 0%,#261840 100%)', borderRadius: 24, padding: '18px 16px', marginBottom: 14, boxShadow: '0 4px 20px rgba(45,31,74,.25)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(155,141,200,.8)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            ⚡ Capteurs en direct
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SensorGauge label="Centre — Gainage" value={sensorCenter} color={LED.purple} status={centerStatus}/>
            <SensorGauge label="Côtés — Respiration latérale" value={sensorSides} color={LED.inspire} status={sidesStatus}/>
            <SensorGauge label="Bas — Pression périnée" value={sensorBottom} color={LED.expire} status={bottomStatus}/>
            <SensorGauge label="Dos — Tension lombaire" value={sensorBack} color={LED.ok} status={backStatus}/>
          </div>
          {!connected && (
            <p style={{ fontSize: 12, color: 'rgba(155,141,200,.5)', textAlign: 'center', marginTop: 12 }}>Connecte ta ceinture pour voir les données en direct</p>
          )}
        </div>

        {/* ── TYPES D'ALERTES V2 ── */}
        <div style={{ background: '#FDFBF8', borderRadius: 24, padding: '18px 16px', marginBottom: 14, border: '1.5px solid rgba(196,152,106,.15)', boxShadow: '0 2px 12px rgba(44,33,24,.06)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            📡 Feedback ceinture
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '〰️', color: LED.inspire, bg: LED.inspire + '15', label: 'Vibration 1×', desc: 'Inspire — commence ta respiration' },
              { icon: '〰️', color: LED.expire,  bg: LED.expire  + '15', label: 'Vibration 2×', desc: 'Expire — accompagne l\'effort' },
              { icon: '〰️', color: LED.ok,      bg: LED.ok      + '15', label: 'Vibration longue', desc: 'Bravo ! Bonne exécution' },
              { icon: '〰️', color: LED.alert,   bg: LED.alert   + '15', label: 'Vibration forte répétée', desc: 'Erreur détectée — corrige ta position' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 14, background: item.bg, border: `1px solid ${item.color}30` }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: item.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}` }}/>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#2C2118' }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: '#9C8A78' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* LED states */}
          <div style={{ marginTop: 14, padding: '12px', background: '#F0EAF8', borderRadius: 14 }}>
            <p style={{ fontSize: 11, color: '#7B5EA7', fontWeight: 700, marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>États LED</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { color: LED.inspire, label: 'LED bleue', desc: 'Phase inspiration' },
                { color: LED.expire,  label: 'LED orange', desc: 'Phase expiration' },
                { color: LED.ok,      label: 'LED verte', desc: 'Bonne position' },
                { color: LED.alert,   label: 'LED rouge', desc: 'Correction nécessaire' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, boxShadow: `0 0 6px ${item.color}`, flexShrink: 0 }}/>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#4A3669', minWidth: 80 }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: '#9C8A78' }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HISTORIQUE 7 JOURS ── */}
        <div style={{ background: '#FDFBF8', borderRadius: 24, padding: '18px 16px', marginBottom: 14, border: '1.5px solid rgba(196,152,106,.15)', boxShadow: '0 2px 12px rgba(44,33,24,.06)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            📈 Historique 7 jours — Erreurs détectées
          </p>
          <p style={{ fontSize: 13, color: '#4A9B7F', fontWeight: 700, marginBottom: 14 }}>
            Semaine 1 : 8 erreurs → Semaine 4 : 2 erreurs ↓ 75%
          </p>
          {/* Mini graphique barres */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80, marginBottom: 8 }}>
            {HISTORY.map((d, i) => {
              const h = Math.round((d.errors / 10) * 70);
              const isLast = i === HISTORY.length - 1;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: isLast ? LED.ok : '#9C8A78' }}>{d.errors}</span>
                  <div style={{
                    width: '100%', height: h,
                    borderRadius: '6px 6px 0 0',
                    background: isLast
                      ? `linear-gradient(180deg, ${LED.ok}, ${LED.ok}80)`
                      : 'linear-gradient(180deg,#9B8DC8,#7B6BA8)',
                    boxShadow: isLast ? `0 0 8px ${LED.ok}60` : 'none',
                  }}/>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {HISTORY.map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#9C8A78' }}>{d.day}</div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '10px 12px', background: LED.ok + '15', borderRadius: 12, border: `1px solid ${LED.ok}30` }}>
            <p style={{ fontSize: 13, color: '#2C6B4A', fontWeight: 600 }}>
              🎉 Ta ceinture détecte de moins en moins d'erreurs. Tu progresses !
            </p>
          </div>
        </div>

        {/* ── ACTIONS RAPIDES ── */}
        <div style={{ background: '#FDFBF8', borderRadius: 24, padding: '18px 16px', marginBottom: 14, border: '1.5px solid rgba(196,152,106,.15)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>🚀 Actions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => navigate('/belt-discovery')} style={{ width: '100%', padding: '16px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7B5EA7,#4A3669)', color: '#fff', fontSize: 15, fontWeight: 700, boxShadow: '0 6px 20px rgba(123,94,167,.35)' }}>
              ✨ Mode découverte guidée
            </button>
            <button onClick={() => navigate('/belt-calibration')} style={{ width: '100%', padding: '16px', borderRadius: 50, border: '2px solid #7B5EA7', cursor: 'pointer', background: 'transparent', color: '#7B5EA7', fontSize: 15, fontWeight: 700 }}>
              ⚙️ Calibrer ma ceinture
            </button>
            <button onClick={() => navigate('/belt-tutorial')} style={{ width: '100%', padding: '14px', borderRadius: 50, border: '1.5px solid rgba(123,94,167,.3)', cursor: 'pointer', background: 'transparent', color: '#7B5EA7', fontSize: 14, fontWeight: 600 }}>
              📖 Tutoriel de pose
            </button>
            <button onClick={() => navigate('/belt-progress')} style={{ width: '100%', padding: '14px', borderRadius: 50, border: '1.5px solid rgba(196,152,106,.4)', cursor: 'pointer', background: 'transparent', color: '#C4986A', fontSize: 14, fontWeight: 600 }}>
              📊 Ma ceinture qui apprend →
            </button>
            <button onClick={() => navigate('/session-analysis')} style={{ width: '100%', padding: '14px', borderRadius: 50, border: '1.5px solid rgba(196,152,106,.4)', cursor: 'pointer', background: 'transparent', color: '#C4986A', fontSize: 14, fontWeight: 600 }}>
              🔍 Dernière analyse de séance
            </button>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
