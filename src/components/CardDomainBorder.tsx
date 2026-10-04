import React from 'react';
import { Domain, Rarity } from '../types';

interface CardDomainBorderProps {
  domain: Domain;
  rarity: Rarity;
  className?: string;
}

export const CardDomainBorder: React.FC<CardDomainBorderProps> = ({
  domain,
  rarity,
  className = ''
}) => {
  // Domain color tokens and aesthetics based on Layer 1 Architectural Frame (09_25_09 pm (2))
  const getDomainConfig = () => {
    switch (domain) {
      case 'Sanctuary':
        return {
          primaryColor: '#F59E0B',
          secondaryColor: '#FEF08A',
          tertiaryColor: '#FFFFFF',
          darkColor: '#78350F',
          glowRgba: 'rgba(245, 158, 11, 0.55)',
          name: 'Sanctuary Ivory Arch',
          glyph: '☀️',
          accentGradient: 'from-amber-400 via-yellow-200 to-amber-500'
        };
      case 'Radiance':
        return {
          primaryColor: '#EF4444',
          secondaryColor: '#F97316',
          tertiaryColor: '#FDE047',
          darkColor: '#7F1D1D',
          glowRgba: 'rgba(239, 68, 68, 0.55)',
          name: 'Radiance Colonnade',
          glyph: '🔥',
          accentGradient: 'from-red-500 via-orange-400 to-amber-400'
        };
      case 'Verdance':
        return {
          primaryColor: '#10B981',
          secondaryColor: '#34D399',
          tertiaryColor: '#A7F3D0',
          darkColor: '#064E3B',
          glowRgba: 'rgba(16, 185, 129, 0.55)',
          name: 'Verdance Living Canopy',
          glyph: '🌿',
          accentGradient: 'from-emerald-500 via-green-300 to-teal-400'
        };
      case 'Tempest':
      case 'Arcane':
        return {
          primaryColor: '#3B82F6',
          secondaryColor: '#38BDF8',
          tertiaryColor: '#E0F2FE',
          darkColor: '#1E3A8A',
          glowRgba: 'rgba(59, 130, 246, 0.55)',
          name: 'Tempest Sky Bastion',
          glyph: '⚡',
          accentGradient: 'from-blue-500 via-cyan-300 to-sky-400'
        };
      case 'Abyss':
        return {
          primaryColor: '#9333EA',
          secondaryColor: '#C084FC',
          tertiaryColor: '#F5D0FE',
          darkColor: '#4C1D95',
          glowRgba: 'rgba(147, 51, 234, 0.55)',
          name: 'Abyssal Void Spire',
          glyph: '💀',
          accentGradient: 'from-purple-600 via-fuchsia-400 to-violet-300'
        };
      default:
        return {
          primaryColor: '#D97706',
          secondaryColor: '#FCD34D',
          tertiaryColor: '#FFFBEB',
          darkColor: '#451A03',
          glowRgba: 'rgba(217, 119, 6, 0.4)',
          name: 'Nexus Stone Frame',
          glyph: '✦',
          accentGradient: 'from-amber-500 via-yellow-300 to-amber-600'
        };
    }
  };

  const config = getDomainConfig();

  // Rarity configuration
  const getRarityConfig = () => {
    switch (rarity) {
      case 'Common':
        return {
          borderWidth: 'border-[1.5px]',
          borderColor: 'border-stone-500/60',
          innerRing: 'border-stone-700/50',
          filigreeOpacity: 'opacity-50',
          outerGlow: 'shadow-md',
          hasGems: false,
          hasAura: false,
          hasTopFinial: true
        };
      case 'Uncommon':
        return {
          borderWidth: 'border-[2px]',
          borderColor: `${domain === 'Sanctuary' ? 'border-amber-500/70' : domain === 'Radiance' ? 'border-orange-500/70' : domain === 'Verdance' ? 'border-emerald-500/70' : (domain === 'Arcane' || domain === 'Tempest') ? 'border-blue-500/70' : 'border-purple-500/70'}`,
          innerRing: 'border-white/20',
          filigreeOpacity: 'opacity-70',
          outerGlow: `shadow-[0_0_12px_${config.glowRgba}]`,
          hasGems: false,
          hasAura: false,
          hasTopFinial: true
        };
      case 'Rare':
        return {
          borderWidth: 'border-[2px]',
          borderColor: `${domain === 'Sanctuary' ? 'border-amber-400' : domain === 'Radiance' ? 'border-red-500' : domain === 'Verdance' ? 'border-emerald-400' : (domain === 'Arcane' || domain === 'Tempest') ? 'border-cyan-400' : 'border-purple-400'}`,
          innerRing: 'border-amber-400/40',
          filigreeOpacity: 'opacity-90',
          outerGlow: `shadow-[0_0_18px_${config.glowRgba}]`,
          hasGems: true,
          hasAura: false,
          hasTopFinial: true
        };
      case 'Very Rare':
        return {
          borderWidth: 'border-[2.5px]',
          borderColor: 'border-amber-300',
          innerRing: 'border-white/40',
          filigreeOpacity: 'opacity-100',
          outerGlow: `shadow-[0_0_24px_${config.glowRgba}]`,
          hasGems: true,
          hasAura: true,
          hasTopFinial: true
        };
      case 'Legendary':
        return {
          borderWidth: 'border-[3px]',
          borderColor: 'border-amber-300',
          innerRing: 'border-amber-300/60',
          filigreeOpacity: 'opacity-100',
          outerGlow: `shadow-[0_0_30px_${config.glowRgba}] ring-1 ring-amber-300/60`,
          hasGems: true,
          hasAura: true,
          hasTopFinial: true
        };
      case 'Mythic':
      case 'Divine Boundless':
        return {
          borderWidth: 'border-[3.5px]',
          borderColor: 'border-amber-200',
          innerRing: 'border-white/80',
          filigreeOpacity: 'opacity-100',
          outerGlow: `shadow-[0_0_38px_${config.glowRgba}] ring-2 ring-white/70`,
          hasGems: true,
          hasAura: true,
          hasTopFinial: true
        };
      default:
        return {
          borderWidth: 'border-2',
          borderColor: 'border-stone-600',
          innerRing: 'border-stone-700',
          filigreeOpacity: 'opacity-70',
          outerGlow: 'shadow-md',
          hasGems: false,
          hasAura: false,
          hasTopFinial: true
        };
    }
  };

  const rarityConfig = getRarityConfig();

  return (
    <div className={`absolute inset-0 pointer-events-none rounded-2xl z-20 overflow-hidden ${className}`}>
      
      {/* 1. OUTER ARCHITECTURAL BORDER & GLOW */}
      <div 
        className={`absolute inset-0 rounded-2xl ${rarityConfig.borderWidth} ${rarityConfig.borderColor} ${rarityConfig.outerGlow} pointer-events-none`}
      />

      {/* 2. INNER FILIGREE RING */}
      <div 
        className={`absolute inset-[3px] rounded-xl border ${rarityConfig.innerRing} pointer-events-none`}
      />

      {/* 2.5 ORNATE METALLIC GOTHIC CORNER BRACKETS */}
      <svg className="absolute top-1 left-1 w-4 h-4 text-amber-400/80 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M 2 12 L 2 2 L 12 2" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute top-1 right-1 w-4 h-4 text-amber-400/80 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M 22 12 L 22 2 L 12 2" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-1 left-1 w-4 h-4 text-amber-400/80 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M 2 12 L 2 22 L 12 22" />
        <circle cx="6" cy="18" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-1 right-1 w-4 h-4 text-amber-400/80 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M 22 12 L 22 22 L 12 22" />
        <circle cx="18" cy="18" r="1.5" fill="currentColor" />
      </svg>

      {/* 3. ARCHITECTURAL SVG OVERLAY: CATHEDRAL ARCH, TWIN COLUMNS, BASE KEYSTONE (Layer 1 Mimic) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 200 288" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`arch-grad-${domain}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.tertiaryColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={config.secondaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={config.primaryColor} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`gold-foil-${domain}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <filter id={`arch-glow-${domain}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ================= TOP GOTHIC ARCHWAY & APEX FINIAL ================= */}
        {domain === 'Sanctuary' && (
          <g className={rarityConfig.filigreeOpacity}>
            {/* Sanctuary: Celestial Sunburst Halo & Ivory Gothic Arch */}
            <path 
              d="M 6 28 C 6 12, 30 5, 100 5 C 170 5, 194 12, 194 28" 
              stroke="url(#gold-foil-Sanctuary)" 
              strokeWidth="2.5" 
              fill="none" 
            />
            <path 
              d="M 15 28 C 15 16, 40 10, 100 10 C 160 10, 185 16, 185 28" 
              stroke={config.secondaryColor} 
              strokeWidth="1" 
              strokeDasharray="2 2" 
              fill="none" 
            />
            {/* Apex Sunburst Monstrance */}
            <circle cx="100" cy="5" r="7" fill={config.darkColor} stroke="url(#gold-foil-Sanctuary)" strokeWidth="1.5" />
            <polygon points="100,-2 102,5 107,5 103,8 105,13 100,10 95,13 97,8 93,5 98,5" fill="#FEF08A" />
            <circle cx="100" cy="5" r="2" fill="#FFFFFF" filter="url(#arch-glow-Sanctuary)" />
            {/* Winged Tracery Brackets */}
            <path d="M 85 8 Q 92 14 100 14 Q 108 14 115 8" stroke="#FDE047" strokeWidth="1.2" fill="none" />
          </g>
        )}

        {domain === 'Radiance' && (
          <g className={rarityConfig.filigreeOpacity}>
            {/* Radiance: Solar Phoenix Spire & Molten Gothic Arch */}
            <path 
              d="M 6 30 C 10 10, 45 4, 100 4 C 155 4, 190 10, 194 30" 
              stroke="url(#gold-foil-Radiance)" 
              strokeWidth="2.5" 
              fill="none" 
            />
            {/* Phoenix Flame Wings Crown */}
            <path 
              d="M 100 -4 L 103 4 L 109 1 L 105 7 L 112 8 L 104 11 L 100 16 L 96 11 L 88 8 L 95 7 L 91 1 L 97 4 Z" 
              fill="#F97316" 
              stroke="#FDE047" 
              strokeWidth="1" 
              filter="url(#arch-glow-Radiance)"
            />
            <circle cx="100" cy="7" r="2.5" fill="#EF4444" stroke="#FFF" strokeWidth="0.8" />
            {/* Molten Lava Conduits on Upper Arch */}
            <path d="M 30 18 Q 65 9 100 9 Q 135 9 170 18" stroke="#EF4444" strokeWidth="1.5" fill="none" />
          </g>
        )}

        {domain === 'Verdance' && (
          <g className={rarityConfig.filigreeOpacity}>
            {/* Verdance: Entwined Living Oak Boughs & Emerald Apex Crystal */}
            <path 
              d="M 6 32 C 12 14, 40 6, 100 6 C 160 6, 188 14, 194 32" 
              stroke="#059669" 
              strokeWidth="2.8" 
              fill="none" 
            />
            <path 
              d="M 8 28 C 25 18, 50 11, 100 11 C 150 11, 175 18, 192 28" 
              stroke="#34D399" 
              strokeWidth="1.2" 
              fill="none" 
            />
            {/* Living Branch Crest with Leaf Canopies */}
            <polygon points="100,-3 105,4 103,10 100,14 97,10 95,4" fill="#10B981" stroke="#A7F3D0" strokeWidth="1" filter="url(#arch-glow-Verdance)" />
            <circle cx="100" cy="5" r="2" fill="#6EE7B7" />
            {/* Leaf Vine Accents */}
            <circle cx="82" cy="12" r="1.5" fill="#34D399" />
            <circle cx="118" cy="12" r="1.5" fill="#34D399" />
          </g>
        )}

        {(domain === 'Arcane' || domain === 'Tempest') && (
          <g className={rarityConfig.filigreeOpacity}>
            {/* Tempest: Cobalt Sky-Bastion Lightning Spire */}
            <path 
              d="M 6 30 C 15 12, 45 5, 100 5 C 155 5, 185 12, 194 30" 
              stroke="url(#gold-foil-Arcane)" 
              strokeWidth="2.5" 
              fill="none" 
            />
            {/* High Voltage Lightning Prongs & Core Crystal */}
            <polygon points="100,-4 104,2 108,-1 106,6 112,6 103,12 100,16 97,12 88,6 94,6 92,-1 96,2" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" filter="url(#arch-glow-Arcane)" />
            <polygon points="100,0 102,5 100,10 98,5" fill="#E0F2FE" />
            {/* Electric Arcs across arch */}
            <path d="M 40 16 L 60 12 L 80 14 L 100 8 L 120 14 L 140 12 L 160 16" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.8" />
          </g>
        )}

        {domain === 'Abyss' && (
          <g className={rarityConfig.filigreeOpacity}>
            {/* Abyss: Sharp Obsidian Steeple & Hovering Void Shard */}
            <path 
              d="M 6 32 C 12 12, 40 4, 100 4 C 160 4, 188 12, 194 32" 
              stroke="#4C1D95" 
              strokeWidth="3" 
              fill="none" 
            />
            {/* Sharp Gothic Pointed Spires */}
            <polygon points="100,-5 105,3 103,10 100,16 97,10 95,3" fill="#6B21A8" stroke="#C084FC" strokeWidth="1" filter="url(#arch-glow-Abyss)" />
            <circle cx="100" cy="5" r="2" fill="#E879F9" />
            {/* Spectral Void Rune Inlays */}
            <path d="M 75 14 Q 100 7 125 14" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          </g>
        )}

        {/* ================= TWIN FLUTED GOTHIC COLUMNS (LEFT & RIGHT) ================= */}
        <g className={rarityConfig.filigreeOpacity}>
          {/* Left Column Shaft & Filigree Grooves */}
          <line x1="6" y1="28" x2="6" y2="260" stroke="url(#gold-foil-Sanctuary)" strokeWidth="3" />
          <line x1="9" y1="35" x2="9" y2="255" stroke={config.primaryColor} strokeWidth="1.2" opacity="0.7" />
          <line x1="12" y1="42" x2="12" y2="248" stroke={config.secondaryColor} strokeWidth="0.8" strokeDasharray="6 3" opacity="0.5" />

          {/* Left Capital & Base Rings */}
          <rect x="3" y="28" width="8" height="4" rx="1" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />
          <rect x="3" y="140" width="6" height="3" rx="1" fill="#78350F" stroke="#FDE047" strokeWidth="0.6" />
          <rect x="3" y="258" width="8" height="4" rx="1" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />

          {/* Right Column Shaft & Filigree Grooves */}
          <line x1="194" y1="28" x2="194" y2="260" stroke="url(#gold-foil-Sanctuary)" strokeWidth="3" />
          <line x1="191" y1="35" x2="191" y2="255" stroke={config.primaryColor} strokeWidth="1.2" opacity="0.7" />
          <line x1="188" y1="42" x2="188" y2="248" stroke={config.secondaryColor} strokeWidth="0.8" strokeDasharray="6 3" opacity="0.5" />

          {/* Right Capital & Base Rings */}
          <rect x="189" y="28" width="8" height="4" rx="1" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />
          <rect x="191" y="140" width="6" height="3" rx="1" fill="#78350F" stroke="#FDE047" strokeWidth="0.6" />
          <rect x="189" y="258" width="8" height="4" rx="1" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />
        </g>

        {/* ================= BOTTOM GOTHIC KEYSTONE & BASE PEDESTAL ================= */}
        <g className={rarityConfig.filigreeOpacity}>
          {/* Bottom Gothic Arch Pedestal Plinth */}
          <path 
            d="M 6 260 C 20 274, 50 282, 100 282 C 150 282, 180 274, 194 260" 
            stroke="url(#gold-foil-Sanctuary)" 
            strokeWidth="2.5" 
            fill="none" 
          />
          <path 
            d="M 12 258 C 30 268, 60 275, 100 275 C 140 275, 170 268, 188 258" 
            stroke={config.secondaryColor} 
            strokeWidth="1" 
            fill="none" 
          />

          {/* Center Bottom Keystone Plinth & Domain Glyph Socket */}
          <polygon 
            points="100,270 108,276 105,285 95,285 92,276" 
            fill={config.darkColor} 
            stroke="url(#gold-foil-Sanctuary)" 
            strokeWidth="1.2" 
          />
          <circle cx="100" cy="278" r="3" fill={config.primaryColor} stroke="#FFF" strokeWidth="0.6" />

          {/* Corner Gothic Buttress Brackets */}
          <path d="M 6 260 L 16 260 L 6 270 Z" fill="#D97706" />
          <path d="M 194 260 L 184 260 L 194 270 Z" fill="#D97706" />
        </g>
      </svg>

      {/* 4. RARE+ AURA & GEM SHIMMER PULSE */}
      {rarityConfig.hasAura && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-35 mix-blend-screen animate-pulse"
          style={{
            boxShadow: `inset 0 0 16px ${config.primaryColor}, 0 0 22px ${config.primaryColor}`
          }}
        />
      )}
    </div>
  );
};

