import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeltSVGV2 from '../components/BeltSVGV2';

const LED = { inspire:'#85B7EB', ok:'#5DCAA5', purple:'#9B8DC8', expire:'#EF9F27' };

/* ── SVG étape 1 : ceinture dépliée avec zones annotées ── */
function BeltUnfolded() {
  return (
    <svg width="280" height="110" viewBox="0 0 280 110" fill="none">
      <rect x="4" y="20" width="272" height="70" rx="22" fill="#2A1A44" stroke="#5A4A7A" strokeWidth="2"/>
      {/* Zones */}
      <rect x="14" y="30" width="56" height="50" rx="12" fill={LED.inspire + '30'} stroke={LED.inspire} strokeWidth="1.5" strokeDasharray="4 2"/>
      <rect x="112" y="26" width="56" height="58" rx="14" fill={LED.purple + '30'} stroke={LED.purple} strokeWidth="1.5" strokeDasharray="4 2"/>
      <rect x="210" y="30" width="56" height="50" rx="12" fill={LED.inspire + '30'} stroke={LED.inspire} strokeWidth="1.5" strokeDasharray="4 2"/>
      <rect x="120" y="72" width="40" height="18" rx="8" fill={LED.ok + '40'} stroke={LED.ok} strokeWidth="1.5" strokeDasharray="4 2"/>
      {/* Labels */}
      <text x="42" y="82" textAnchor="middle" fill={LED.inspire} fontSize="7" fontFamily="sans-serif">CÔTÉ</text>
      <text x="140" y="78" textAnchor="middle" fill={LED.purple} fontSize="7" fontFamily="sans-serif">CENTRE</text>
      <text x="238" y="82" textAnchor="middle" fill={LED.inspire} fontSize="7" fontFamily="sans-serif">CÔTÉ</text>
      <text x="140" y="100" textAnchor="middle" fill={LED.ok} fontSize="7" fontFamily="sans-serif">BAS</text>
      {/* Bouton central */}
      <circle cx="140" cy="55" r="10" fill={LED.purple + '50'} stroke={LED.purple} strokeWidth="1.5"/>
      <circle cx="140" cy="55" r="4" fill={LED.purple}/>
    </svg>
  );
}

/* ── SVG étape 2 : silhouette féminine + ceinture ── */
function SilhouetteBelt() {
  return (
    <svg width="200" height="280" viewBox="0 0 200 280" fill="none">
      {/* Corps simplifié */}
      <ellipse cx="100" cy="60" rx="28" ry="34" fill="#E8D5C4" stroke="#C4A88A" strokeWidth="1.5"/>
      <rect x="62" y="90" width="76" height="100" rx="20" fill="#E8D5C4" stroke="#C4A88A" strokeWidth="1.5"/>
      <rect x="56" y="185" width="32" height="70" rx="12" fill="#E8D5C4" stroke="#C4A88A" strokeWidth="1.5"/>
      <rect x="112" y="185" width="32" height="70" rx="12" fill="#E8D5C4" stroke="#C4A88A" strokeWidth="1.5"/>
      {/* Ceinture */}
      <rect x="48" y="130" width="104" height="38" rx="14" fill="#2A1A44" stroke="#7B5EA7" strokeWidth="2"/>
      {/* LED zones sur ceinture */}
      <rect x="52" y="135" width="24" height="28" rx="8" fill={LED.inspire + '40'} stroke={LED.inspire} strokeWidth="1.5"/>
      <circle cx="64" cy="149" r="5" fill={LED.inspire}/>
      <rect x="88" y="133" width="24" height="32" rx="8" fill={LED.purple + '40'} stroke={LED.purple} strokeWidth="1.5"/>
      <circle cx="100" cy="149" r="6" fill={LED.purple}/>
      <rect x="124" y="135" width="24" height="28" rx="8" fill={LED.inspire + '40'} stroke={LED.inspire} strokeWidth="1.5"/>
      <circle cx="136" cy="149" r="5" fill={LED.inspire}/>
      <rect x="90" y="162" width="20" height="10" rx="4" fill={LED.ok + '50'} stroke={LED.ok} strokeWidth="1"/>
      {/* Annotation nombril */}
      <line x1="100" y1="110" x2="100" y2="130" stroke={LED.purple} strokeWidth="1" strokeDasharray="3 2"/>
      <text x="100" y="108" textAnchor="middle" fill={LED.purple} fontSize="7" fontFamily="sans-serif">Nombril</text>
      {/* Annotation côtes */}
      <line x1="52" y1="118" x2="64" y2="135" stroke={LED.inspire} strokeWidth="1" strokeDasharray="3 2"/>
      <text x="28" y="116" fill={LED.inspire} fontSize="7" fontFamily="sans-serif">Côtes</text>
      {/* Annotation bas ventre */}
      <line x1="100" y1="175" x2="100" y2="168" stroke={LED.ok} strokeWidth="1" strokeDasharray="3 2"/>
      <text x="100" y="180" textAnchor="middle" fill={LED.ok} fontSize="7" fontFamily="sans-serif">Bas ventre</text>
    </svg>
  );
}

/* ── Étapes ── */
const STEPS = [
  {
    title: 'Prépare ta ceinture',
    emoji: '💡',
    color: LED.purple,
    bg: '#EDE6F4',
    content: (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <BeltUnfolded />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px', background: '#F8F4FC', borderRadius: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: LED.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>1</div>
            <p style={{ fontSize: 14, color: '#4A3669', lineHeight: 1.6 }}>Appuie <strong>3 secondes</strong> sur le bouton central pour allumer ta ceinture</p>
          </div>
          <div style={{ padding: '12px', background: LED.inspire + '15', borderRadius: 14, border: `1px solid ${LED.inspire}30` }}>
            <p style={{ fontSize: 13, color: '#2A3A5A' }}>💙 La LED centrale clignote <strong>bleue</strong> = ceinture allumée et en recherche Bluetooth</p>
          </div>
        </div>
      </div>
    ),
    action: 'Connecter via Bluetooth',
    actionSim: true,
  },
  {
    title: 'Positionne la ceinture',
    emoji: '📍',
    color: LED.ok,
    bg: '#E6F9F4',
    content: (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <SilhouetteBelt />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { color: LED.purple, label: 'Zone centrale', desc: 'Doit être sur ton nombril' },
            { color: LED.inspire, label: 'Zones latérales', desc: 'Doivent entourer tes côtes basses' },
            { color: LED.ok, label: 'Zone basse', desc: 'Doit effleurer ton bas ventre, pas trop serrée' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', background: item.color + '12', borderRadius: 12, border: `1px solid ${item.color}25` }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }}/>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#2C2118' }}>{item.label}</p>
                <p style={{ fontSize: 12, color: '#6B5744' }}>{item.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ padding: '10px 12px', background: '#FFF8E8', borderRadius: 12, marginTop: 4 }}>
            <p style={{ fontSize: 13, color: '#7A5020' }}>💡 Tu dois pouvoir glisser <strong>2 doigts</strong> sous la ceinture</p>
          </div>
        </div>
      </div>
    ),
    action: 'Position correcte ✓',
  },
  {
    title: 'Vue de dos — zone dorsale',
    emoji: '🔙',
    color: LED.expire,
    bg: '#FEF3E2',
    content: (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <BeltSVGV2
            centerColor="#3A2D5A"
            sidesColor={LED.inspire}
            bottomColor="#2A2A4A"
            backColor={LED.expire}
            showBack={true}
            pulseZone="back"
            width={260}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '12px 14px', background: LED.expire + '15', borderRadius: 14, border: `1px solid ${LED.expire}30` }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#7A4010', marginBottom: 4 }}>🟠 Zone dorsale (dos)</p>
            <p style={{ fontSize: 12, color: '#7A4010', lineHeight: 1.6 }}>
              La ceinture SENSIA V2 intègre une zone dorsale large qui détecte les tensions lombaires et t'aide à maintenir une posture neutre pendant l'effort.
            </p>
          </div>
          {[
            { color: LED.expire, label: 'LED orange au dos', desc: 'Tension lombaire détectée — relâche le bas du dos' },
            { color: LED.ok, label: 'LED verte au dos', desc: 'Posture dorsale correcte, poursuis l\'exercice' },
            { color: LED.inspire, label: 'Vibration dos', desc: 'Rappel de posture — rentre légèrement le bassin' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', background: item.color + '12', borderRadius: 12, border: `1px solid ${item.color}25` }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }}/>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#2C2118' }}>{item.label}</p>
                <p style={{ fontSize: 12, color: '#6B5744' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    action: 'Zone dorsale comprise ✓',
  },
  {
    title: 'Ajuste selon ta morphologie',
    emoji: '⚙️',
    color: LED.purple,
    bg: '#F0EAF8',
    content: <MorphologyStep />,
    action: 'Ajustement validé ✓',
  },
  {
    title: 'Teste les capteurs',
    emoji: '🧪',
    color: '#8BA7FF',
    bg: '#EEF2FF',
    content: (
      <SensorTestStep />
    ),
    action: 'Capteurs testés ✓',
  },
  {
    title: 'Tu es prête !',
    emoji: '🎉',
    color: LED.ok,
    bg: '#E6F9F4',
    content: (
      <ReadyStep />
    ),
    action: null,
    isLast: true,
  },
];

function MorphologyStep() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <p style={{ fontSize: 14, color: '#4A3020', lineHeight: 1.6, marginBottom: 16 }}>
        Choisis ta morphologie pour personnaliser le réglage du velcro :
      </p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {['Fine', 'Normale', 'Ronde'].map((m, i) => (
          <button key={m} onClick={() => setSelected(i)} style={{
            flex: 1, padding: '14px 8px', borderRadius: 16,
            border: `2px solid ${selected === i ? LED.expire : 'rgba(196,152,106,.3)'}`,
            background: selected === i ? LED.expire + '15' : '#FDFBF8',
            cursor: 'pointer', textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>
              {i === 0 ? '🧍' : i === 1 ? '🧍‍♀️' : '💁‍♀️'}
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, color: selected === i ? '#C4986A' : '#6B5744' }}>{m}</p>
            <p style={{ fontSize: 10, color: '#9C8A78', marginTop: 2 }}>Position {i + 1}</p>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div style={{ padding: '12px 14px', background: LED.expire + '15', borderRadius: 14, border: `1px solid ${LED.expire}30` }}>
          <p style={{ fontSize: 13, color: '#7A4010', lineHeight: 1.6 }}>
            {selected === 0 && '✓ Position velcro 1 — ajustement léger recommandé pour toi'}
            {selected === 1 && '✓ Position velcro 2 — serrage normal, la ceinture doit rester en place'}
            {selected === 2 && '✓ Position velcro 2 ou 3 — assure-toi que les capteurs restent bien positionnés'}
          </p>
        </div>
      )}
    </div>
  );
}

function SensorTestStep() {
  const [tested, setTested] = useState({ sides: false, center: false, bottom: false });

  return (
    <div>
      <p style={{ fontSize: 14, color: '#2A3A5A', lineHeight: 1.6, marginBottom: 16 }}>
        Suis les instructions pour activer chaque capteur :
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { key: 'sides', color: LED.inspire, emoji: '🫁', title: 'Capteurs côtés', instruction: 'Inspire profondément — tes côtes s\'ouvrent, les capteurs s\'activent en bleu' },
          { key: 'center', color: '#8BA7FF', emoji: '💪', title: 'Capteur centre', instruction: 'Gaine doucement — rentre le nombril, le capteur centre s\'active en violet' },
          { key: 'bottom', color: LED.ok, emoji: '💜', title: 'Capteur bas', instruction: 'Relâche complètement — le capteur bas doit rester vert (pas de pression)' },
        ].map(item => (
          <div key={item.key} onClick={() => setTested(p => ({ ...p, [item.key]: true }))} style={{
            padding: '14px', borderRadius: 16, cursor: 'pointer',
            background: tested[item.key] ? item.color + '20' : '#F8F5F0',
            border: `2px solid ${tested[item.key] ? item.color : 'rgba(196,152,106,.2)'}`,
            transition: 'all .3s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: tested[item.key] ? item.color : '#E0D8EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, transition: 'background .3s ease', boxShadow: tested[item.key] ? `0 0 12px ${item.color}60` : 'none' }}>
                {tested[item.key] ? '✓' : item.emoji}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#2C2118' }}>{item.title}</p>
                <p style={{ fontSize: 12, color: '#9C8A78', lineHeight: 1.4 }}>{item.instruction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {Object.values(tested).every(Boolean) && (
        <div style={{ marginTop: 12, padding: '12px', background: LED.ok + '20', borderRadius: 14, textAlign: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#2A6A4A' }}>🎉 Tous les capteurs sont actifs !</p>
        </div>
      )}
    </div>
  );
}

function ReadyStep() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {['Ceinture positionnée', 'Capteurs actifs', 'Bluetooth connecté'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: LED.ok + '15', borderRadius: 14, border: `1px solid ${LED.ok}30` }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: LED.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>✓</div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#2C6B4A' }}>{item}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 14, color: '#9C8A78', lineHeight: 1.6 }}>
        Ta ceinture est prête à t'accompagner dans chaque séance. Elle guidera ta respiration et protégera ton périnée.
      </p>
    </div>
  );
}

export default function BeltTutorialScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [beltConnected, setBeltConnected] = useState(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleAction = () => {
    if (current.actionSim) setBeltConnected(true);
    if (!isLast) setStep(s => s + 1);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/belt')} style={{ background: 'rgba(123,94,167,.1)', border: 'none', borderRadius: '50%', width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B5EA7', fontSize: 16, flexShrink: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, color: '#9C8A78', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tutoriel de pose</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: '#2C2118', fontWeight: 400 }}>{current.title}</h1>
        </div>
        <div style={{ background: 'rgba(123,94,167,.1)', borderRadius: 50, padding: '5px 12px' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7B5EA7' }}>{step + 1} / {STEPS.length}</span>
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{ padding: '0 20px', marginBottom: 4 }}>
        <div style={{ height: 4, background: 'rgba(123,94,167,.15)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((step + 1) / STEPS.length) * 100}%`, background: 'linear-gradient(90deg,#7B5EA7,#A689C4)', borderRadius: 2, transition: 'width .4s ease' }}/>
        </div>
      </div>

      {/* Indicateurs étapes */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '12px 20px' }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ width: i === step ? 20 : 8, height: 8, borderRadius: 4, background: i < step ? '#7B5EA7' : i === step ? '#A689C4' : 'rgba(123,94,167,.2)', transition: 'all .3s ease' }}/>
        ))}
      </div>

      {/* Contenu étape */}
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        <div style={{ background: '#FDFBF8', borderRadius: 24, padding: '20px', border: `2px solid ${current.color}25`, boxShadow: '0 4px 20px rgba(44,33,24,.08)' }}>
          {/* Emoji badge */}
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: current.bg, border: `2px solid ${current.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
            {current.emoji}
          </div>
          {current.content}
        </div>

        {/* Statut Bluetooth */}
        {step === 0 && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: beltConnected ? LED.ok + '15' : 'rgba(139,167,255,.12)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: beltConnected ? LED.ok : '#9B8DC8', animation: beltConnected ? 'none' : 'ledGreen 1.5s ease infinite' }}/>
            <span style={{ fontSize: 12, color: beltConnected ? '#2A6A4A' : '#5A4B7A', fontWeight: 600 }}>
              {beltConnected ? 'Ceinture SENSIA V2 connectée ✓' : 'En attente de connexion...'}
            </span>
          </div>
        )}
      </div>

      {/* Boutons bas */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '16px 20px 32px', background: 'rgba(243,237,229,.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(196,152,106,.15)' }}>
        {isLast ? (
          <>
            <button onClick={() => navigate('/session')} style={{ width: '100%', padding: '16px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7B5EA7,#4A3669)', color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 10, boxShadow: '0 6px 20px rgba(123,94,167,.35)' }}>
              ▶ Commencer ma première séance guidée
            </button>
            <button onClick={() => setStep(0)} style={{ width: '100%', padding: '14px', borderRadius: 50, border: '1.5px solid rgba(123,94,167,.4)', cursor: 'pointer', background: 'transparent', color: '#7B5EA7', fontSize: 14, fontWeight: 600 }}>
              Revoir le tutoriel
            </button>
          </>
        ) : (
          <button onClick={handleAction} style={{ width: '100%', padding: '16px', borderRadius: 50, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg,${current.color},${current.color}CC)`, color: '#fff', fontSize: 15, fontWeight: 700, boxShadow: `0 6px 20px ${current.color}50` }}>
            {current.action || 'Suivant →'}
          </button>
        )}
      </div>
    </div>
  );
}
