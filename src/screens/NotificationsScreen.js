import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const LED = { ok:'#5DCAA5', inspire:'#85B7EB', expire:'#EF9F27', alert:'#E24B4A', purple:'#9B8DC8' };

const NOTIFICATIONS = [
  {
    id: 1, category: 'belt', read: false, time: 'Il y a 10 min',
    icon: '🔋', color: LED.alert,
    title: 'Ceinture à 15%',
    body: 'Ta ceinture est chargée à 15% — pense à la charger avant ta séance',
    action: '/belt',
  },
  {
    id: 2, category: 'coaching', read: false, time: 'Il y a 1h',
    icon: '🔥', color: LED.ok,
    title: '3 séances parfaites !',
    body: '3 séances consécutives sans erreur majeure — tu es en feu !',
    action: '/session-analysis',
  },
  {
    id: 3, category: 'belt', read: false, time: 'Hier',
    icon: '📈', color: LED.ok,
    title: 'Amélioration +20%',
    body: 'Ta ceinture a détecté une amélioration de 20% cette semaine. Belle progression !',
    action: '/belt-progress',
  },
  {
    id: 4, category: 'coaching', read: true, time: 'Hier',
    icon: '💡', color: LED.expire,
    title: 'Conseil personnalisé',
    body: 'Tu pousses souvent vers le bas le mercredi — essaie de te concentrer sur le périnée ce jour-là',
    action: null,
  },
  {
    id: 5, category: 'belt', read: true, time: 'Il y a 3 jours',
    icon: '⌚', color: LED.purple,
    title: 'Ceinture non utilisée',
    body: 'Ta ceinture n\'a pas été utilisée depuis 3 jours — une petite séance ?',
    action: '/session',
  },
  {
    id: 6, category: 'belt', read: true, time: 'Il y a 3 jours',
    icon: '🏆', color: LED.ok,
    title: 'Nouveau record !',
    body: '0 erreur de respiration pendant toute la séance — nouveau record personnel !',
    action: '/session-analysis',
  },
  {
    id: 7, category: 'coaching', read: true, time: 'Il y a 4 jours',
    icon: '📊', color: LED.inspire,
    title: 'Analyse avancée',
    body: 'Ton gainage progresse mais ta respiration stagne — on travaille ça lors de la prochaine séance ?',
    action: '/session',
  },
  {
    id: 8, category: 'education', read: true, time: 'Il y a 5 jours',
    icon: '🧠', color: LED.purple,
    title: 'Le savais-tu ?',
    body: 'Bloquer sa respiration 1000 fois fragilise le plancher pelvien autant qu\'un accouchement difficile',
    action: '/learn',
  },
  {
    id: 9, category: 'education', read: true, time: 'Il y a 5 jours',
    icon: '💡', color: LED.expire,
    title: 'Conseil du jour',
    body: 'Le vacuum abdominal pratiqué le matin à jeun est 40% plus efficace pour le transverse',
    action: '/my-session',
  },
  {
    id: 10, category: 'education', read: true, time: 'Il y a 6 jours',
    icon: '📚', color: LED.inspire,
    title: 'Nouveau module',
    body: 'Nouveau module disponible : "Musculation et périnée : ce que personne ne t\'a appris"',
    action: '/learn',
  },
];

const CAT_LABELS = {
  belt:      { label: 'Ceinture',   color: LED.purple, bg: '#EDE6F4' },
  coaching:  { label: 'Coaching',   color: LED.ok,     bg: '#E6F9F4' },
  education: { label: 'Éducation',  color: LED.inspire,bg: '#EEF2FF' },
};

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const displayed = filter === 'all' ? notifications : notifications.filter(n => n.category === filter);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div style={{ minHeight:'100vh', background:'#F3EDE5', paddingBottom:100, fontFamily:"'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ padding:'52px 20px 16px', background:'linear-gradient(175deg,#EDE6F4 0%,#F3EDE5 100%)', position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 0 rgba(155,141,200,.12)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button onClick={() => navigate(-1)} style={{ background:'rgba(123,94,167,.1)', border:'none', borderRadius:'50%', width:34, height:34, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#7B5EA7', fontSize:16 }}>←</button>
            <div>
              <h1 style={{ fontFamily:'var(--font-heading)', fontSize:26, color:'#2C2118', fontWeight:400 }}>Notifications</h1>
              {unread > 0 && <p style={{ fontSize:12, color:LED.alert, fontWeight:600 }}>{unread} non lue{unread > 1 ? 's' : ''}</p>}
            </div>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} style={{ padding:'7px 14px', borderRadius:50, background:'rgba(123,94,167,.1)', border:'none', color:'#7B5EA7', fontSize:12, fontWeight:600, cursor:'pointer' }}>
              Tout lire
            </button>
          )}
        </div>
        {/* Filtres */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none', paddingBottom:4 }}>
          {[{ id:'all', label:'Toutes' }, { id:'belt', label:'Ceinture' }, { id:'coaching', label:'Coaching' }, { id:'education', label:'Éducation' }].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              flexShrink:0, padding:'6px 14px', borderRadius:50, border:'none', cursor:'pointer',
              background: filter === f.id ? '#7B5EA7' : 'rgba(123,94,167,.1)',
              color: filter === f.id ? '#fff' : '#7B5EA7',
              fontSize:12, fontWeight:600,
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:'12px 16px 0' }}>
        {displayed.length === 0 ? (
          <div style={{ textAlign:'center', padding:'40px 20px', color:'#9C8A78' }}>
            <p style={{ fontSize:32, marginBottom:12 }}>🔔</p>
            <p style={{ fontSize:15 }}>Aucune notification dans cette catégorie</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {displayed.map(notif => {
              const cat = CAT_LABELS[notif.category];
              return (
                <div key={notif.id}
                  onClick={() => { markRead(notif.id); if (notif.action) navigate(notif.action); }}
                  style={{
                    background: notif.read ? '#FDFBF8' : '#fff',
                    borderRadius:20, padding:'14px 16px', cursor:'pointer',
                    border: notif.read ? '1.5px solid rgba(196,152,106,.15)' : `1.5px solid ${notif.color}40`,
                    boxShadow: notif.read ? '0 2px 8px rgba(44,33,24,.04)' : `0 4px 16px ${notif.color}20`,
                    display:'flex', gap:14, alignItems:'flex-start',
                    transition:'all .2s ease',
                    position:'relative',
                  }}
                >
                  {/* Indicateur non lu */}
                  {!notif.read && (
                    <div style={{ position:'absolute', top:14, right:16, width:8, height:8, borderRadius:'50%', background:notif.color, boxShadow:`0 0 6px ${notif.color}` }}/>
                  )}
                  {/* Icône */}
                  <div style={{ width:42, height:42, borderRadius:'50%', background:notif.color+'20', border:`1.5px solid ${notif.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
                    {notif.icon}
                  </div>
                  <div style={{ flex:1, paddingRight:16 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                      <p style={{ fontSize:14, fontWeight:700, color:'#2C2118' }}>{notif.title}</p>
                      <span style={{ fontSize:9, fontWeight:700, color:cat.color, background:cat.bg, borderRadius:50, padding:'2px 7px' }}>{cat.label}</span>
                    </div>
                    <p style={{ fontSize:13, color:'#6B5744', lineHeight:1.5, marginBottom:4 }}>{notif.body}</p>
                    <p style={{ fontSize:11, color:'#9C8A78' }}>{notif.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
