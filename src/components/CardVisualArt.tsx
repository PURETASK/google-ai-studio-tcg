import React from 'react';
import { Card } from '../types';

interface CardVisualArtProps {
  card: Card;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'full';
}

export const CardVisualArt: React.FC<CardVisualArtProps> = ({
  card,
  className = '',
  size = 'md'
}) => {
  if (!card) return null;

  const { domain, cardType, id = '', name = '' } = card;
  const rawId = id || '';

  const defaultThemes: Record<string, { primaryColor: string; glowColor: string; bgGradient: string; iconSymbol: string }> = {
    Radiance: { primaryColor: '#f59e0b', glowColor: '#fbbf24', bgGradient: 'from-amber-950 via-stone-900 to-stone-950', iconSymbol: '⚔️' },
    Verdance: { primaryColor: '#10b981', glowColor: '#34d399', bgGradient: 'from-emerald-950 via-stone-900 to-stone-950', iconSymbol: '🌿' },
    Arcane: { primaryColor: '#3b82f6', glowColor: '#60a5fa', bgGradient: 'from-blue-950 via-stone-900 to-stone-950', iconSymbol: '🔮' },
    Abyss: { primaryColor: '#a855f7', glowColor: '#c084fc', bgGradient: 'from-purple-950 via-stone-900 to-stone-950', iconSymbol: '💀' },
    Sanctuary: { primaryColor: '#eab308', glowColor: '#fde047', bgGradient: 'from-yellow-950 via-stone-900 to-stone-950', iconSymbol: '🛡️' },
    Tempest: { primaryColor: '#06b6d4', glowColor: '#22d3ee', bgGradient: 'from-cyan-950 via-stone-900 to-stone-950', iconSymbol: '⚡' },
  };

  const domainTheme = defaultThemes[domain] || defaultThemes['Sanctuary'];
  const artVisualTheme = {
    primaryColor: card.artVisualTheme?.primaryColor || domainTheme.primaryColor,
    glowColor: card.artVisualTheme?.glowColor || domainTheme.glowColor,
    bgGradient: card.artVisualTheme?.bgGradient || domainTheme.bgGradient,
    iconSymbol: card.artVisualTheme?.iconSymbol || domainTheme.iconSymbol,
    badgeText: card.artVisualTheme?.badgeText,
    visualMotif: card.artVisualTheme?.visualMotif,
  };

  // Determine motif
  const motif = artVisualTheme.visualMotif || (
    rawId.includes('JORMUNGANDR') || rawId.includes('VOLKAN') ? 'jormungandr' :
    rawId.includes('DUILOKIS') ? 'duilokis' :
    rawId.includes('WARPICK') ? 'warpick' :
    rawId.includes('BROOCH') ? 'brooch' :
    rawId.includes('FLEAU') || rawId.includes('GOURMANDISE') ? 'fleau' :
    rawId.includes('OPHANIM') ? 'ophanim' :
    rawId.includes('SKELETON') || rawId.includes('KEY') ? 'skeletonkey' :
    rawId.includes('PRETASTRA') ? 'pretastra' :
    rawId.includes('MANTLE') ? 'mantle' :
    rawId.includes('INFERNAL') || rawId.includes('BAATOR') ? 'infernal' :
    rawId.includes('GREATBOW') ? 'greatbow' :
    rawId.includes('WILDBOND') ? 'wildbond' :
    rawId.includes('RING') || rawId.includes('ETERNITY') ? 'ring' :
    domain === 'Radiance' ? 'warpick' :
    domain === 'Verdance' ? 'brooch' :
    domain === 'Arcane' ? 'pretastra' :
    domain === 'Abyss' ? 'fleau' : 'ophanim'
  );

  // If a custom/uploaded image artUrl is present, render with ambient fill and crisp contained full-view (never cropped or cut off)
  if (card.artUrl) {
    return (
      <div className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none bg-stone-950 ${className}`}>
        {/* Ambient blurred glow background so zero space is left empty or harsh */}
        <img
          src={card.artUrl}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-50 brightness-75 select-none pointer-events-none"
        />

        {/* Primary Full Artwork: object-contain guarantees the entire image is visible without cutting off any edges */}
        <img
          src={card.artUrl}
          alt={card.name}
          referrerPolicy="no-referrer"
          className="relative z-10 w-full h-full object-contain object-center transition-transform duration-500 hover:scale-[1.02] drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
        />

        {/* Subtle cinematic gradient vignette & realm glow */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40" />
        <div 
          className="absolute inset-0 pointer-events-none z-20 mix-blend-color-dodge opacity-25"
          style={{ backgroundColor: artVisualTheme.primaryColor || '#eab308' }}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none bg-stone-950 ${className}`}>
      
      {/* ================= ATMOSPHERIC REALISTIC BACKDROPS ================= */}
      {motif === 'jormungandr' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-red-950/80 to-stone-950">
          {/* Volcanic Crater & Ash Background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/30 via-red-900/40 to-transparent" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="lavaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4500" />
                <stop offset="50%" stopColor="#ff8c00" />
                <stop offset="100%" stopColor="#8b0000" />
              </linearGradient>
              <filter id="glowLava" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Towering Serpent Silhouette & Coils */}
            <path d="M 40,190 C 80,120 120,40 180,30 C 230,20 270,70 250,130 C 230,180 180,160 140,180" fill="none" stroke="#2a0808" strokeWidth="28" strokeLinecap="round" opacity="0.9" />
            <path d="M 40,190 C 80,120 120,40 180,30 C 230,20 270,70 250,130 C 230,180 180,160 140,180" fill="none" stroke="url(#lavaGrad)" strokeWidth="4" strokeDasharray="6 4" filter="url(#glowLava)" opacity="0.8" />
            {/* Serpent Head Profile */}
            <polygon points="180,15 220,35 190,55 160,35" fill="#1c0505" stroke="#ff4500" strokeWidth="1.5" />
            <circle cx="195" cy="32" r="3" fill="#ffee55" filter="url(#glowLava)" />
            {/* Hero Warrior Silhouette in Forefront */}
            <g transform="translate(110, 55)">
              <path d="M 40,120 L 35,60 L 25,45 L 35,30 L 45,45 L 35,60 L 50,120" fill="#120404" />
              <circle cx="35" cy="22" r="9" fill="#2d0808" stroke="#ff6600" strokeWidth="0.8" />
              {/* Molten Chest & Arm Cracks */}
              <path d="M 35,35 L 30,55 L 42,70 L 35,90" stroke="#ffaa00" strokeWidth="2" fill="none" filter="url(#glowLava)" />
              <path d="M 25,45 L 10,75 L 5,90" stroke="#ff4500" strokeWidth="1.5" fill="none" filter="url(#glowLava)" />
              <path d="M 45,45 L 60,65 L 75,70" stroke="#ff8800" strokeWidth="2" fill="none" filter="url(#glowLava)" />
              {/* Outstretched Flame Hand */}
              <circle cx="75" cy="70" r="6" fill="#ffcc00" filter="url(#glowLava)" />
            </g>
          </svg>
        </div>
      )}

      {motif === 'duilokis' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-emerald-950/70 to-stone-950">
          {/* Ancient Mossy Swamp Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.15)_0%,_transparent_70%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="spearBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <filter id="feyGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Misty swamp background fog */}
            <path d="M 0,160 Q 60,140 120,160 T 240,150 L 240,200 L 0,200 Z" fill="#042017" opacity="0.6" />
            {/* Wooden Spear Shaft */}
            <line x1="120" y1="20" x2="120" y2="190" stroke="#382210" strokeWidth="9" strokeLinecap="round" />
            {/* Living Ivy Wrapped Around Shaft */}
            <path d="M 116,50 Q 124,65 116,80 Q 124,95 116,110 Q 124,125 116,140 Q 124,155 116,170" fill="none" stroke="#10b981" strokeWidth="2.5" />
            {/* Leaf details on shaft */}
            <circle cx="125" cy="70" r="3" fill="#34d399" />
            <circle cx="114" cy="100" r="3" fill="#34d399" />
            <circle cx="126" cy="130" r="3" fill="#34d399" />
            {/* Willow-leaf Spearhead */}
            <polygon points="120,15 140,55 130,65 120,60 110,65 100,55" fill="url(#spearBlade)" stroke="#cbd5e1" strokeWidth="1" />
            {/* Luminous Green Fey Veins on Blade */}
            <path d="M 120,20 L 120,55 M 120,30 L 132,45 M 120,30 L 108,45 M 120,42 L 135,52 M 120,42 L 105,52" stroke="#10b981" strokeWidth="1.5" fill="none" filter="url(#feyGlow)" />
            {/* Sunstone (Amber) and Moonstone (Sapphire) Gems */}
            <circle cx="113" cy="68" r="3.5" fill="#f59e0b" filter="url(#feyGlow)" />
            <circle cx="127" cy="68" r="3.5" fill="#3b82f6" filter="url(#feyGlow)" />
          </svg>
        </div>
      )}

      {motif === 'warpick' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-amber-950/70 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.2)_0%,_transparent_70%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="ironPick" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#292524" />
                <stop offset="60%" stopColor="#1c1917" />
                <stop offset="100%" stopColor="#0c0a09" />
              </linearGradient>
              <filter id="magmaGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Volcanic background silhouette */}
            <polygon points="120,90 20,190 220,190" fill="#200a06" opacity="0.7" />
            <path d="M 115,90 Q 120,60 122,88 Q 130,55 125,90" fill="#ef4444" opacity="0.8" />
            {/* Diagonal Pick Shaft */}
            <line x1="80" y1="180" x2="145" y2="55" stroke="#442211" strokeWidth="8" strokeLinecap="round" />
            {/* Leather cross-wrapping */}
            <line x1="90" y1="160" x2="100" y2="140" stroke="#78350f" strokeWidth="2" />
            <line x1="105" y1="130" x2="115" y2="110" stroke="#78350f" strokeWidth="2" />
            <line x1="120" y1="100" x2="130" y2="80" stroke="#78350f" strokeWidth="2" />
            {/* Jagged Mountain-shaped Warpick Head */}
            <polygon points="145,55 195,65 170,40 145,25 105,45 120,65" fill="url(#ironPick)" stroke="#78350f" strokeWidth="1.5" />
            {/* Glowing Magma Veins through Rock */}
            <path d="M 145,30 L 160,45 L 185,60 M 145,30 L 125,48 L 110,50" stroke="#ff4500" strokeWidth="2.5" fill="none" filter="url(#magmaGlow)" />
            <path d="M 155,42 L 165,35 M 135,40 L 140,55" stroke="#ffaa00" strokeWidth="1.5" fill="none" filter="url(#magmaGlow)" />
            {/* Glowing Pommel Gem */}
            <polygon points="80,180 75,188 80,195 85,188" fill="#ff3300" filter="url(#magmaGlow)" />
          </svg>
        </div>
      )}

      {motif === 'brooch' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-emerald-950/80 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.2)_0%,_transparent_75%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="emeraldCabochon" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="40%" stopColor="#10b981" />
                <stop offset="80%" stopColor="#047857" />
                <stop offset="100%" stopColor="#022c22" />
              </radialGradient>
              <filter id="emeraldGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Circular Antique Bronze Medallion */}
            <circle cx="120" cy="95" r="55" fill="#2d1c08" stroke="#92400e" strokeWidth="5" />
            <circle cx="120" cy="95" r="50" fill="#140d04" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Tree of Life Intricate Branches */}
            <path d="M 120,135 Q 120,110 120,95 M 120,110 Q 100,100 85,90 M 120,110 Q 140,100 155,90 M 120,95 Q 95,80 88,65 M 120,95 Q 145,80 152,65 M 120,80 Q 120,55 120,50" stroke="#b45309" strokeWidth="2.5" fill="none" />
            {/* Carved Stag Antlers at Top */}
            <path d="M 120,55 L 112,42 M 120,55 L 128,42 M 112,42 L 105,38 M 128,42 L 135,38" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            {/* Central Oval Emerald Cabochon */}
            <ellipse cx="120" cy="95" rx="14" ry="20" fill="url(#emeraldCabochon)" stroke="#fef3c7" strokeWidth="1.2" filter="url(#emeraldGlow)" />
            {/* Hanging Emerald Tear Drop Gem */}
            <line x1="120" y1="150" x2="120" y2="165" stroke="#d97706" strokeWidth="2" />
            <polygon points="120,165 126,178 120,186 114,178" fill="url(#emeraldCabochon)" stroke="#fef3c7" strokeWidth="0.8" filter="url(#emeraldGlow)" />
            {/* Miniature Wolf and Bear Silhouette in Tree Roots */}
            <circle cx="95" cy="115" r="6" fill="#78350f" />
            <circle cx="145" cy="115" r="7" fill="#78350f" />
          </svg>
        </div>
      )}

      {motif === 'fleau' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-purple-950/80 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.2)_0%,_transparent_75%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="acidSlime" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="70%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#3b0764" />
              </linearGradient>
              <filter id="purpleGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Spiked Chain hanging from top left */}
            <path d="M 60,20 Q 90,60 135,80" fill="none" stroke="#52525b" strokeWidth="6" strokeDasharray="8 4" />
            <path d="M 60,20 Q 90,60 135,80" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.8" />
            {/* Living Spiked Flail Sphere Head */}
            <circle cx="140" cy="110" r="42" fill="#18181b" stroke="#71717a" strokeWidth="3" />
            {/* Spikes around perimeter */}
            <polygon points="140,68 145,55 135,55" fill="#3f3f46" />
            <polygon points="182,110 195,115 195,105" fill="#3f3f46" />
            <polygon points="98,110 85,115 85,105" fill="#3f3f46" />
            <polygon points="170,140 182,150 175,155" fill="#3f3f46" />
            <polygon points="110,140 98,150 105,155" fill="#3f3f46" />
            {/* Horrifying Open Demonic Mouth */}
            <path d="M 108,105 Q 140,88 172,105 Q 160,135 140,138 Q 120,135 108,105 Z" fill="#090514" stroke="#c084fc" strokeWidth="1.5" />
            {/* Sharp Demon Fangs */}
            <path d="M 112,105 L 116,114 L 120,105 L 125,115 L 130,105 L 136,116 L 142,105 L 148,116 L 154,105 L 160,114 L 166,105" fill="#f4f4f5" />
            <path d="M 115,125 L 120,118 L 126,126 L 132,118 L 138,127 L 145,118 L 152,126 L 158,118 L 163,124" fill="#f4f4f5" />
            {/* Dripping Acid Saliva */}
            <path d="M 130,135 Q 133,165 135,185 M 145,135 Q 148,160 146,180" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" filter="url(#purpleGlow)" />
            {/* Runes engraved on skull */}
            <path d="M 125,82 L 140,75 L 155,82 L 140,88 Z" fill="none" stroke="#e879f9" strokeWidth="1.5" filter="url(#purpleGlow)" />
          </svg>
        </div>
      )}

      {motif === 'ophanim' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-amber-950/60 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.25)_0%,_transparent_75%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="holyGlow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Blinding Celestial Sunrays */}
            <g opacity="0.3" stroke="#fef08a" strokeWidth="0.8">
              <line x1="120" y1="75" x2="20" y2="10" />
              <line x1="120" y1="75" x2="220" y2="10" />
              <line x1="120" y1="75" x2="10" y2="120" />
              <line x1="120" y1="75" x2="230" y2="120" />
            </g>
            {/* Alabaster Handle */}
            <line x1="120" y1="110" x2="120" y2="190" stroke="#f8fafc" strokeWidth="7" strokeLinecap="round" />
            <line x1="120" y1="110" x2="120" y2="190" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6 6" />
            {/* Angel Wings at Crossguard */}
            <path d="M 120,120 Q 95,100 80,115 Q 100,128 120,125" fill="#f8fafc" stroke="#f59e0b" strokeWidth="1" />
            <path d="M 120,120 Q 145,100 160,115 Q 140,128 120,125" fill="#f8fafc" stroke="#f59e0b" strokeWidth="1" />
            {/* Three Intersecting Ophanim Wheels */}
            <ellipse cx="120" cy="65" rx="42" ry="42" fill="none" stroke="#fbbf24" strokeWidth="3" filter="url(#holyGlow)" />
            <ellipse cx="120" cy="65" rx="42" ry="20" fill="none" stroke="#f59e0b" strokeWidth="2.5" transform="rotate(-30 120 65)" />
            <ellipse cx="120" cy="65" rx="42" ry="20" fill="none" stroke="#f59e0b" strokeWidth="2.5" transform="rotate(30 120 65)" />
            {/* Central Blinding Eye */}
            <circle cx="120" cy="65" r="12" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" filter="url(#holyGlow)" />
            <circle cx="120" cy="65" r="5" fill="#451a03" />
            <circle cx="121" cy="64" r="2" fill="#ffffff" />
            {/* Eyeballs on outer wheel rings */}
            <circle cx="85" cy="50" r="3.5" fill="#fff" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="85" cy="50" r="1.5" fill="#1e293b" />
            <circle cx="155" cy="50" r="3.5" fill="#fff" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="155" cy="50" r="1.5" fill="#1e293b" />
            <circle cx="120" cy="24" r="3.5" fill="#fff" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="120" cy="24" r="1.5" fill="#1e293b" />
          </svg>
        </div>
      )}

      {motif === 'skeletonkey' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-slate-950/80 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.15)_0%,_transparent_75%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="runeBlueGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Ancient parchment grimoire page background */}
            <rect x="30" y="30" width="180" height="140" rx="6" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" opacity="0.6" />
            {/* Occult circles on map */}
            <circle cx="70" cy="140" r="22" fill="none" stroke="#78716c" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="170" cy="60" r="18" fill="none" stroke="#78716c" strokeWidth="0.8" opacity="0.5" />
            {/* Key Bow: Skull Arch */}
            <circle cx="120" cy="45" r="18" fill="none" stroke="#e7e5e4" strokeWidth="6" />
            <circle cx="120" cy="30" r="5" fill="#d6d3d1" stroke="#292524" strokeWidth="0.8" />
            {/* Shaft: Stacked Skulls */}
            <circle cx="120" cy="68" r="6.5" fill="#e7e5e4" stroke="#292524" strokeWidth="0.8" />
            <circle cx="120" cy="82" r="6" fill="#e7e5e4" stroke="#292524" strokeWidth="0.8" />
            <circle cx="120" cy="95" r="5.5" fill="#e7e5e4" stroke="#292524" strokeWidth="0.8" />
            <circle cx="120" cy="108" r="5" fill="#e7e5e4" stroke="#292524" strokeWidth="0.8" />
            {/* Key Stem with Blue Glowing Runes */}
            <line x1="120" y1="115" x2="120" y2="165" stroke="#d6d3d1" strokeWidth="7" strokeLinecap="round" />
            <path d="M 120,122 L 118,126 L 122,130 M 120,136 L 122,140 L 118,145 M 120,150 L 117,156 L 123,160" stroke="#38bdf8" strokeWidth="1.8" fill="none" filter="url(#runeBlueGlow)" />
            {/* Bone Key Bit */}
            <path d="M 120,155 L 140,155 L 140,165 L 134,165 L 134,175 L 120,175" fill="#e7e5e4" stroke="#292524" strokeWidth="1" />
            <path d="M 125,160 L 135,160 M 125,170 L 130,170" stroke="#38bdf8" strokeWidth="1.2" filter="url(#runeBlueGlow)" />
          </svg>
        </div>
      )}

      {motif === 'pretastra' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-blue-950/80 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.3)_0%,_transparent_75%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="cosmicGlow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* 8-Pointed Celestial Brass Frame */}
            <g transform="translate(120, 100)" stroke="#f59e0b" strokeWidth="2" fill="none">
              <rect x="-45" y="-45" width="90" height="90" rx="8" />
              <rect x="-45" y="-45" width="90" height="90" rx="8" transform="rotate(45)" />
            </g>
            <circle cx="120" cy="100" r="42" fill="#09090b" stroke="#3b82f6" strokeWidth="2.5" />
            {/* Runic Inner Ring */}
            <circle cx="120" cy="100" r="34" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 3" />
            {/* Sapphire Crystals in 8 Directions */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 120 + 44 * Math.cos(rad);
              const cy = 100 + 44 * Math.sin(rad);
              return (
                <polygon
                  key={i}
                  points={`${cx},${cy - 4} ${cx + 4},${cy} ${cx},${cy + 4} ${cx - 4},${cy}`}
                  fill="#60a5fa"
                  stroke="#ffffff"
                  strokeWidth="0.6"
                  filter="url(#cosmicGlow)"
                />
              );
            })}
            {/* Swirling Blue Cosmic Flame Core */}
            <path
              d="M 120,72 Q 132,88 120,102 Q 108,116 120,128 Q 112,112 122,100 Q 128,88 120,72 Z"
              fill="#60a5fa"
              filter="url(#cosmicGlow)"
            />
            <path
              d="M 120,80 Q 126,92 120,102 Q 114,112 120,120 Z"
              fill="#ffffff"
              filter="url(#cosmicGlow)"
            />
          </svg>
        </div>
      )}

      {/* 9. INFERNAL / BAATORIAN HELLKITE */}
      {motif === 'infernal' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-red-950/90 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.3)_0%,_transparent_70%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="flameGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M 90,60 C 80,30 60,20 40,25 C 55,40 70,65 85,85 Z" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M 150,60 C 160,30 180,20 200,25 C 185,40 170,65 155,85 Z" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
            <polygon points="120,50 150,85 135,145 120,165 105,145 90,85" fill="#1c0a0a" stroke="#b91c1c" strokeWidth="2" />
            <polygon points="105,90 115,95 108,102" fill="#fbbf24" filter="url(#flameGlow)" />
            <polygon points="135,90 125,95 132,102" fill="#fbbf24" filter="url(#flameGlow)" />
            <path d="M 108,125 Q 120,140 132,125 Q 120,132 108,125 Z" fill="#f59e0b" filter="url(#flameGlow)" />
          </svg>
        </div>
      )}

      {/* 10. GREATBOW / STARLIGHT HUNTER */}
      {motif === 'greatbow' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-emerald-950/70 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(52,211,153,0.2)_0%,_transparent_70%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="bowGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M 60,25 C 160,60 160,140 60,175" fill="none" stroke="#065f46" strokeWidth="7" strokeLinecap="round" />
            <path d="M 60,25 C 160,60 160,140 60,175" fill="none" stroke="#34d399" strokeWidth="2" filter="url(#bowGlow)" />
            <line x1="60" y1="25" x2="110" y2="100" stroke="#fef08a" strokeWidth="1.5" />
            <line x1="60" y1="175" x2="110" y2="100" stroke="#fef08a" strokeWidth="1.5" />
            <line x1="180" y1="100" x2="40" y2="100" stroke="#6ee7b7" strokeWidth="3" filter="url(#bowGlow)" />
            <polygon points="180,100 165,94 170,100 165,106" fill="#fef08a" filter="url(#bowGlow)" />
          </svg>
        </div>
      )}

      {/* 11. WILDBOND / SPECTRAL PACK */}
      {motif === 'wildbond' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-teal-950/70 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.25)_0%,_transparent_75%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="wolfGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M 180,30 A 25,25 0 0,0 205,65 A 28,28 0 1,1 180,30 Z" fill="#ccfbf1" opacity="0.8" filter="url(#wolfGlow)" />
            <path d="M 40,185 L 60,130 L 80,110 L 95,80 L 105,70 L 115,85 L 130,95 L 120,120 L 140,150 L 150,185 Z" fill="#042f2e" stroke="#2dd4bf" strokeWidth="1.5" />
            <circle cx="100" cy="78" r="2.5" fill="#5eead4" filter="url(#wolfGlow)" />
            <path d="M 20,170 Q 70,150 120,170 T 220,165 L 220,195 L 20,195 Z" fill="#0d9488" opacity="0.3" filter="url(#wolfGlow)" />
          </svg>
        </div>
      )}

      {/* 12. RING / CHRONO-ASTROLABE */}
      {motif === 'ring' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-amber-950/70 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.25)_0%,_transparent_70%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="ringGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <ellipse cx="120" cy="100" rx="55" ry="30" fill="none" stroke="#78350f" strokeWidth="6" />
            <ellipse cx="120" cy="100" rx="55" ry="30" fill="none" stroke="#f59e0b" strokeWidth="2.5" filter="url(#ringGlow)" />
            <ellipse cx="120" cy="100" rx="30" ry="55" fill="none" stroke="#fde047" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="120" cy="100" r="14" fill="#b45309" stroke="#fef08a" strokeWidth="2" filter="url(#ringGlow)" />
          </svg>
        </div>
      )}

      {/* 13. MANTLE / ARCHMAGE SOVEREIGN ROBES */}
      {motif === 'mantle' && (
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-indigo-950/70 to-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.25)_0%,_transparent_70%)]" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="mantleGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M 120,40 C 90,50 60,80 50,180 L 190,180 C 180,80 150,50 120,40 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
            <path d="M 120,40 L 105,180 M 120,40 L 135,180" stroke="#a5b4fc" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="120" cy="35" r="10" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" filter="url(#mantleGlow)" />
            <polygon points="120,20 125,32 120,38 115,32" fill="#c7d2fe" filter="url(#mantleGlow)" />
          </svg>
        </div>
      )}

      {/* 14. COMPREHENSIVE PROCEDURAL DOMAIN & ARCHETYPE LANDSCAPE (Never an empty or simple card!) */}
      {!['jormungandr', 'duilokis', 'warpick', 'brooch', 'fleau', 'ophanim', 'skeletonkey', 'pretastra', 'infernal', 'greatbow', 'wildbond', 'ring', 'mantle'].includes(motif) && (
        <div className="absolute inset-0 bg-stone-950 overflow-hidden">
          {domain === 'Sanctuary' && (
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-amber-950/70 to-stone-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.3)_0%,_transparent_70%)]" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
                <polygon points="120,25 145,175 95,175" fill="#2d1c08" stroke="#d97706" strokeWidth="1.5" />
                <polygon points="70,85 85,175 55,175" fill="#1e1305" />
                <polygon points="170,85 185,175 155,175" fill="#1e1305" />
                <circle cx="120" cy="70" r="24" fill="#451a03" stroke="#fde047" strokeWidth="2" />
                <circle cx="120" cy="70" r="9" fill="#fef08a" />
                <line x1="120" y1="10" x2="120" y2="190" stroke="#fef08a" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
                <line x1="40" y1="70" x2="200" y2="70" stroke="#fef08a" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
              </svg>
            </div>
          )}

          {domain === 'Radiance' && (
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-red-950/80 to-stone-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.35)_0%,_transparent_75%)]" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
                <polygon points="120,40 20,185 220,185" fill="#1c0707" stroke="#991b1b" strokeWidth="1.5" />
                <path d="M 120,40 Q 115,90 100,140 Q 90,170 80,185" stroke="#f97316" strokeWidth="3.5" fill="none" />
                <path d="M 120,40 Q 130,95 145,135 Q 155,160 165,185" stroke="#ef4444" strokeWidth="3" fill="none" />
                <circle cx="120" cy="40" r="8" fill="#fbbf24" />
              </svg>
            </div>
          )}

          {domain === 'Verdance' && (
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-emerald-950/80 to-stone-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.3)_0%,_transparent_75%)]" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
                <path d="M 120,20 C 60,35 30,80 50,130 C 65,170 120,185 120,185 C 120,185 175,170 190,130 C 210,80 180,35 120,20 Z" fill="#032e1e" stroke="#10b981" strokeWidth="2" />
                <path d="M 120,185 L 120,85 M 120,125 L 90,105 M 120,135 L 150,115" stroke="#059669" strokeWidth="3.5" fill="none" />
                <circle cx="120" cy="75" r="11" fill="#6ee7b7" />
              </svg>
            </div>
          )}

          {(domain === 'Arcane' || domain === 'Tempest') && (
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-blue-950/80 to-stone-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.35)_0%,_transparent_75%)]" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
                <circle cx="120" cy="95" r="52" fill="none" stroke="#1e40af" strokeWidth="3.5" strokeDasharray="12 6" />
                <circle cx="120" cy="95" r="32" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                <polygon points="60,95 70,80 80,95 70,110" fill="#93c5fd" />
                <polygon points="180,95 170,80 160,95 170,110" fill="#93c5fd" />
                <circle cx="120" cy="95" r="9" fill="#ffffff" />
              </svg>
            </div>
          )}

          {domain === 'Abyss' && (
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-purple-950/80 to-stone-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.35)_0%,_transparent_75%)]" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
                <path d="M 40,165 Q 90,80 120,95 Q 150,110 200,60" fill="none" stroke="#3b0764" strokeWidth="5.5" />
                <path d="M 60,60 Q 90,110 120,95 Q 150,80 180,165" fill="none" stroke="#581c87" strokeWidth="4.5" />
                <ellipse cx="120" cy="95" rx="36" ry="19" fill="#090514" stroke="#a855f7" strokeWidth="2.5" />
                <circle cx="120" cy="95" r="9.5" fill="#c084fc" />
                <circle cx="120" cy="95" r="3.5" fill="#ffffff" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Realistic Lighting & Corner Rune Inscriptions */}
      <div className="absolute top-1.5 left-2 text-[9px] font-mono opacity-40 text-amber-300 pointer-events-none">ᚱᛖᚨᛚᛁᛏᛁ</div>
      <div className="absolute top-1.5 right-2 text-[9px] font-mono opacity-40 text-amber-300 pointer-events-none">ᛖᛚᛁᛏᛖ</div>
      
      {/* Badge Ribbon */}
      {artVisualTheme.badgeText && (
        <div 
          className="absolute bottom-1.5 z-20 px-2.5 py-0.5 rounded-full text-[9px] font-cinzel font-bold tracking-widest uppercase border bg-black/80 backdrop-blur-md"
          style={{
            borderColor: `${artVisualTheme.primaryColor}88`,
            color: artVisualTheme.primaryColor,
            boxShadow: `0 0 10px ${artVisualTheme.glowColor}44`
          }}
        >
          {artVisualTheme.badgeText}
        </div>
      )}
    </div>
  );
};
