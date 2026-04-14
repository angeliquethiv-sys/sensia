import React from 'react';

/*
 * BeltSVGV2 — Illustration ceinture SENSIA avec lumière diffuse premium
 * 4 zones : côtés (gauche+droite), centre, bas-V, dos
 * Props :
 *   centerColor  : couleur zone centre   (défaut : '#9B8DC8')
 *   sidesColor   : couleur zones côtés   (défaut : '#85B7EB')
 *   bottomColor  : couleur zone bas      (défaut : '#5DCAA5')
 *   backColor    : couleur zone dos      (défaut : '#EF9F27')
 *   pulseZone    : zone qui vibre ('center'|'sides'|'bottom'|'back'|null)
 *   showBack     : true → vue de dos
 *   width        : largeur SVG (défaut 280)
 */
export default function BeltSVGV2({
  centerColor = '#9B8DC8',
  sidesColor  = '#85B7EB',
  bottomColor = '#5DCAA5',
  backColor   = '#EF9F27',
  pulseZone   = null,
  showBack    = false,
  width       = 280,
}) {
  const h = Math.round(width * 0.42);
  const uid = showBack ? 'belt-back' : 'belt-front';

  /* Opacité de halo par zone (60% max, subtil et premium) */
  const cAlpha = 0.55;
  const sAlpha = 0.50;
  const bAlpha = 0.48;
  const kAlpha = 0.45;

  return (
    <svg
      width={width} height={h}
      viewBox={`0 0 280 ${Math.round(280 * 0.42)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Filtre halo doux — effet tissu lumineux */}
        <filter id={`glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`glow-strong-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Animations vibrations localisées */}
        <style>{`
          @keyframes pulse-belt-sides {
            0%,100%{ opacity:${sAlpha}; transform: scaleX(1); }
            50%     { opacity:0.9;        transform: scaleX(1.06); }
          }
          @keyframes pulse-belt-center {
            0%,100%{ opacity:${cAlpha}; r: 22; }
            50%     { opacity:0.9;        r: 28; }
          }
          @keyframes pulse-belt-bottom {
            0%,100%{ opacity:${bAlpha}; transform:scaleY(1); }
            50%     { opacity:0.85;       transform:scaleY(1.12); }
          }
          @keyframes pulse-belt-back {
            0%,100%{ opacity:${kAlpha}; transform:scaleX(1); }
            50%     { opacity:0.82;       transform:scaleX(1.05); }
          }
          @keyframes wave-sides {
            0%   { stroke-dashoffset:120; opacity:0.8; }
            100% { stroke-dashoffset:0;   opacity:0; }
          }
        `}</style>
      </defs>

      {/* ── CORPS CEINTURE ── */}
      <rect x="4" y="18" width="272" height="66" rx="22"
        fill={showBack ? '#1E1430' : '#231540'}
        stroke="#4A3669" strokeWidth="2"/>

      {/* Couture décorative */}
      <rect x="8" y="22" width="264" height="58" rx="19"
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* Texture tissu — lignes verticales fines */}
      {Array.from({length: 13}).map((_, i) => (
        <line key={i}
          x1={22 + i * 18} y1="18" x2={22 + i * 18} y2="84"
          stroke="rgba(255,255,255,0.035)" strokeWidth="1"/>
      ))}

      {showBack ? (
        /* ── VUE DE DOS ── */
        <>
          {/* Grande zone dorsale centrale */}
          <rect x="60" y="24" width="160" height="54" rx="16"
            fill={backColor}
            opacity={kAlpha}
            filter={`url(#glow-strong-${uid})`}
            style={{ animation: pulseZone === 'back' ? 'pulse-belt-back .7s ease-in-out infinite' : undefined }}
          />
          {/* Halo diffus dos */}
          <ellipse cx="140" cy="51" rx="74" ry="22"
            fill={backColor} opacity={kAlpha * 0.6}
            filter={`url(#glow-${uid})`}/>
          {/* Label zone dos */}
          <rect x="100" y="40" width="80" height="22" rx="8"
            fill="rgba(0,0,0,0.3)"/>
          <text x="140" y="55" textAnchor="middle"
            fill="rgba(255,255,255,0.7)" fontSize="9"
            fontFamily="DM Sans, sans-serif" fontWeight="600">
            Zone Dos — Maintien
          </text>
          {/* Boucle velcro gauche */}
          <rect x="2" y="30" width="12" height="42" rx="5"
            fill="#2A1A44" stroke="#5A4A7A" strokeWidth="1.5"/>
          {/* Boucle velcro droite */}
          <rect x="266" y="30" width="12" height="42" rx="5"
            fill="#2A1A44" stroke="#5A4A7A" strokeWidth="1.5"/>
        </>
      ) : (
        /* ── VUE DE FACE ── */
        <>
          {/* ZONE CÔTÉ GAUCHE — halo diffus */}
          <ellipse cx="44" cy="51" rx="30" ry="22"
            fill={sidesColor} opacity={sAlpha}
            filter={`url(#glow-${uid})`}
            style={{ animation: pulseZone === 'sides' ? 'pulse-belt-sides .65s ease-in-out infinite' : undefined }}
          />
          {/* Onde vibration côté gauche */}
          {pulseZone === 'sides' && (
            <line x1="14" y1="51" x2="78" y2="51"
              stroke={sidesColor} strokeWidth="2.5"
              strokeDasharray="60" strokeLinecap="round"
              opacity="0.7"
              style={{ animation: 'wave-sides .8s linear infinite' }}/>
          )}

          {/* ZONE CÔTÉ DROIT — halo diffus */}
          <ellipse cx="236" cy="51" rx="30" ry="22"
            fill={sidesColor} opacity={sAlpha}
            filter={`url(#glow-${uid})`}
            style={{ animation: pulseZone === 'sides' ? 'pulse-belt-sides .65s ease-in-out infinite' : undefined }}
          />
          {pulseZone === 'sides' && (
            <line x1="202" y1="51" x2="266" y2="51"
              stroke={sidesColor} strokeWidth="2.5"
              strokeDasharray="60" strokeLinecap="round"
              opacity="0.7"
              style={{ animation: 'wave-sides .8s linear infinite' }}/>
          )}

          {/* ZONE CENTRALE — halo diffus */}
          <circle cx="140" cy="51" r="28"
            fill={centerColor} opacity={cAlpha}
            filter={`url(#glow-strong-${uid})`}
            style={{ animation: pulseZone === 'center' ? 'pulse-belt-center .7s ease-in-out infinite' : undefined }}
          />
          {/* Cercles concentriques vibration centre */}
          {pulseZone === 'center' && (
            <>
              <circle cx="140" cy="51" r="36"
                fill="none" stroke={centerColor} strokeWidth="1.5"
                opacity="0.5" style={{ animation: 'pulse-belt-center .9s ease-in-out infinite' }}/>
              <circle cx="140" cy="51" r="44"
                fill="none" stroke={centerColor} strokeWidth="1"
                opacity="0.25" style={{ animation: 'pulse-belt-center 1.1s ease-in-out infinite' }}/>
            </>
          )}
          {/* Point de référence centre */}
          <circle cx="140" cy="51" r="6"
            fill={centerColor} opacity="0.9"
            filter={`url(#glow-${uid})`}/>

          {/* ZONE BAS EN V — forme caractéristique */}
          <path d="M105,68 L140,80 L175,68"
            stroke={bottomColor} strokeWidth="10"
            strokeLinecap="round" strokeLinejoin="round"
            opacity={bAlpha}
            filter={`url(#glow-${uid})`}
            style={{ animation: pulseZone === 'bottom' ? 'pulse-belt-bottom .75s ease-in-out infinite' : undefined }}
          />
          {/* Halo diffus zone bas */}
          <ellipse cx="140" cy="74" rx="36" ry="10"
            fill={bottomColor} opacity={bAlpha * 0.5}
            filter={`url(#glow-${uid})`}/>
          {pulseZone === 'bottom' && (
            <path d="M108,71 L140,83 L172,71"
              stroke={bottomColor} strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              opacity="0.6"
              style={{ animation: 'pulse-belt-bottom .6s ease-in-out infinite' }}/>
          )}

          {/* BOUCLES VELCRO */}
          <rect x="2" y="30" width="12" height="42" rx="5"
            fill="#2A1A44" stroke="#5A4A7A" strokeWidth="1.5"/>
          <rect x="266" y="30" width="12" height="42" rx="5"
            fill="#2A1A44" stroke="#5A4A7A" strokeWidth="1.5"/>

          {/* Label SENSIA */}
          <text x="140" y="20" textAnchor="middle"
            fill="rgba(255,255,255,0.25)" fontSize="6"
            fontFamily="DM Sans, sans-serif" letterSpacing="3">
            SENSIA V2
          </text>
        </>
      )}
    </svg>
  );
}
