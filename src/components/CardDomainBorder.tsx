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
  // 6 Distinct Domain Architectural Frame Specifications
  const getDomainConfig = () => {
    switch (domain) {
      case 'Sanctuary':
        return {
          primaryColor: '#F59E0B',
          secondaryColor: '#FEF08A',
          tertiaryColor: '#FFFFFF',
          darkColor: '#451A03',
          glowRgba: 'rgba(245, 158, 11, 0.58)',
          name: 'Sanctuary Ivory Cathedral Arch',
          cornerColor: 'text-amber-300'
        };
      case 'Radiance':
        return {
          primaryColor: '#EF4444',
          secondaryColor: '#F97316',
          tertiaryColor: '#FDE047',
          darkColor: '#450A0A',
          glowRgba: 'rgba(239, 68, 68, 0.62)',
          name: 'Radiance Molten Obsidian Bastion',
          cornerColor: 'text-orange-400'
        };
      case 'Verdance':
        return {
          primaryColor: '#10B981',
          secondaryColor: '#34D399',
          tertiaryColor: '#A7F3D0',
          darkColor: '#022C22',
          glowRgba: 'rgba(16, 185, 129, 0.58)',
          name: 'Verdance Living Elderwood Canopy',
          cornerColor: 'text-emerald-300'
        };
      case 'Arcane':
        return {
          primaryColor: '#3B82F6',
          secondaryColor: '#818CF8',
          tertiaryColor: '#E0F2FE',
          darkColor: '#1E1B4B',
          glowRgba: 'rgba(59, 130, 246, 0.58)',
          name: 'Arcane Celestial Astrolabe',
          cornerColor: 'text-blue-300'
        };
      case 'Tempest':
        return {
          primaryColor: '#06B6D4',
          secondaryColor: '#38BDF8',
          tertiaryColor: '#CFFAFE',
          darkColor: '#083344',
          glowRgba: 'rgba(6, 182, 212, 0.62)',
          name: 'Tempest Sky-Steel Tesla Conduit',
          cornerColor: 'text-cyan-300'
        };
      case 'Abyss':
      default:
        return {
          primaryColor: '#A855F7',
          secondaryColor: '#E879F9',
          tertiaryColor: '#F5D0FE',
          darkColor: '#2E1065',
          glowRgba: 'rgba(168, 85, 247, 0.64)',
          name: 'Abyssal Void & Bone Spire',
          cornerColor: 'text-purple-300'
        };
    }
  };

  const config = getDomainConfig();

  // Rarity tier visual escalation
  const getRarityConfig = () => {
    switch (rarity) {
      case 'Common':
        return {
          borderWidth: 'border-[1.5px]',
          filigreeOpacity: 'opacity-65',
          hasGems: false,
          hasAura: false,
          gemCount: 1
        };
      case 'Uncommon':
        return {
          borderWidth: 'border-[2px]',
          filigreeOpacity: 'opacity-80',
          hasGems: false,
          hasAura: false,
          gemCount: 1
        };
      case 'Rare':
        return {
          borderWidth: 'border-[2px]',
          filigreeOpacity: 'opacity-95',
          hasGems: true,
          hasAura: false,
          gemCount: 2
        };
      case 'Very Rare':
        return {
          borderWidth: 'border-[2.5px]',
          filigreeOpacity: 'opacity-100',
          hasGems: true,
          hasAura: true,
          gemCount: 3
        };
      case 'Legendary':
        return {
          borderWidth: 'border-[3px]',
          filigreeOpacity: 'opacity-100',
          hasGems: true,
          hasAura: true,
          gemCount: 4
        };
      case 'Mythic':
      case 'Divine Boundless':
      default:
        return {
          borderWidth: 'border-[3.5px]',
          filigreeOpacity: 'opacity-100',
          hasGems: true,
          hasAura: true,
          gemCount: 5
        };
    }
  };

  const rarityConfig = getRarityConfig();

  return (
    <div className={`absolute inset-0 pointer-events-none rounded-2xl z-20 overflow-hidden ${className}`}>
      {/* 1. Outer Metallic Bevel Ring */}
      <div
        className={`absolute inset-0 rounded-2xl ${rarityConfig.borderWidth} pointer-events-none`}
        style={{
          borderColor: config.primaryColor,
          boxShadow: `inset 0 0 12px ${config.glowRgba}, 0 0 18px ${config.glowRgba}`
        }}
      />

      {/* 2. Inner Hairline Frame */}
      <div
        className="absolute inset-[4px] rounded-[13px] border pointer-events-none opacity-65"
        style={{ borderColor: config.secondaryColor }}
      />

      {/* 3. Bespoke Domain Architectural SVG Frame */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible ${rarityConfig.filigreeOpacity}`}
        viewBox="0 0 200 288"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`frame-metal-${domain}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.tertiaryColor} />
            <stop offset="45%" stopColor={config.secondaryColor} />
            <stop offset="100%" stopColor={config.primaryColor} />
          </linearGradient>
          <linearGradient id={`frame-dark-${domain}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.darkColor} />
            <stop offset="50%" stopColor="#09090b" />
            <stop offset="100%" stopColor={config.darkColor} />
          </linearGradient>
          <filter id={`frame-glow-${domain}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ================= DOMAIN 1: SANCTUARY (IVORY CATHEDRAL & SUNBURST) ================= */}
        {domain === 'Sanctuary' && (
          <g>
            {/* Twin Fluted Ivory & Gold Cathedral Columns */}
            <rect x="2" y="24" width="5" height="236" rx="1.5" fill={`url(#frame-dark-${domain})`} stroke={`url(#frame-metal-${domain})`} strokeWidth="1.2" />
            <rect x="193" y="24" width="5" height="236" rx="1.5" fill={`url(#frame-dark-${domain})`} stroke={`url(#frame-metal-${domain})`} strokeWidth="1.2" />
            <line x1="4.5" y1="30" x2="4.5" y2="254" stroke="#FEF08A" strokeWidth="0.7" strokeDasharray="8 3" />
            <line x1="195.5" y1="30" x2="195.5" y2="254" stroke="#FEF08A" strokeWidth="0.7" strokeDasharray="8 3" />

            {/* Upper Cathedral Gothic Arch & Sunburst Monstrance */}
            <path d="M 4 28 C 8 10, 42 4, 100 4 C 158 4, 192 10, 196 28" stroke={`url(#frame-metal-${domain})`} strokeWidth="2.8" fill="none" />
            <path d="M 12 26 C 24 14, 52 9, 100 9 C 148 9, 176 14, 188 26" stroke="#FEF08A" strokeWidth="1" strokeDasharray="3 2" fill="none" />
            {/* Sunburst Apex Crown */}
            <circle cx="100" cy="5" r="7" fill="#451A03" stroke="#FDE047" strokeWidth="1.5" />
            <polygon points="100,-3 102,3 108,3 103,6 105,12 100,8 95,12 97,6 92,3 98,3" fill="#FEF08A" filter={`url(#frame-glow-${domain})`} />
            <circle cx="100" cy="5" r="2.2" fill="#FFFFFF" />

            {/* Lower Marble Plinth & Keystone */}
            <path d="M 4 260 C 20 276, 55 284, 100 284 C 145 284, 180 276, 196 260" stroke={`url(#frame-metal-${domain})`} strokeWidth="2.6" fill="none" />
            <polygon points="100,272 109,278 105,286 95,286 91,278" fill="#451A03" stroke="#FDE047" strokeWidth="1.2" />
            <circle cx="100" cy="279" r="3" fill="#F59E0B" stroke="#FFF" strokeWidth="0.7" />
          </g>
        )}

        {/* ================= DOMAIN 2: RADIANCE (VOLCANIC OBSIDIAN & MOLTEN SLAG) ================= */}
        {domain === 'Radiance' && (
          <g>
            {/* Jagged Volcanic Basalt Side Plates with Lava Fissures */}
            <polygon points="1,26 8,34 5,90 9,144 5,200 8,254 1,262" fill="#450A0A" stroke="#F97316" strokeWidth="1.3" />
            <polygon points="199,26 192,34 195,90 191,144 195,200 192,254 199,262" fill="#450A0A" stroke="#F97316" strokeWidth="1.3" />
            <polyline points="4,40 7,85 4,144 7,195 4,248" stroke="#FDE047" strokeWidth="1" fill="none" />
            <polyline points="196,40 193,85 196,144 193,195 196,248" stroke="#FDE047" strokeWidth="1" fill="none" />

            {/* Upper Molten Arch & Phoenix Wing Finial */}
            <path d="M 4 30 L 22 10 L 65 4 L 100 7 L 135 4 L 178 10 L 196 30" stroke={`url(#frame-metal-${domain})`} strokeWidth="2.8" fill="none" />
            <path d="M 100 -4 L 104 3 L 112 0 L 107 7 L 115 9 L 105 12 L 100 17 L 95 12 L 85 9 L 93 7 L 88 0 L 96 3 Z" fill="#EF4444" stroke="#FDE047" strokeWidth="1.1" filter={`url(#frame-glow-${domain})`} />
            <circle cx="100" cy="7" r="2.5" fill="#FEF08A" />

            {/* Lower Forged Anvil Keystone */}
            <path d="M 4 260 L 26 278 L 70 284 L 130 284 L 174 278 L 196 260" stroke={`url(#frame-metal-${domain})`} strokeWidth="2.8" fill="none" />
            <polygon points="90,275 110,275 114,285 86,285" fill="#7F1D1D" stroke="#F97316" strokeWidth="1.3" />
            <polygon points="100,272 104,279 100,285 96,279" fill="#FDE047" />
          </g>
        )}

        {/* ================= DOMAIN 3: VERDANCE (ENTWINED ELDERWOOD & BIOLUMINESCENT SPORES) ================= */}
        {domain === 'Verdance' && (
          <g>
            {/* Organic Twisting Tree-Root Side Borders */}
            <path d="M 5 24 C 10 65, 2 110, 7 144 C 11 178, 2 220, 6 262" stroke="#059669" strokeWidth="3.5" fill="none" />
            <path d="M 7 28 C 2 70, 9 115, 4 144 C 2 180, 9 225, 5 258" stroke="#34D399" strokeWidth="1.3" fill="none" />
            <path d="M 195 24 C 190 65, 198 110, 193 144 C 189 178, 198 220, 194 262" stroke="#059669" strokeWidth="3.5" fill="none" />
            <path d="M 193 28 C 198 70, 191 115, 196 144 C 198 180, 191 225, 195 258" stroke="#34D399" strokeWidth="1.3" fill="none" />

            {/* Bioluminescent Spore Nodes along Vines */}
            <circle cx="7" cy="85" r="2" fill="#A7F3D0" filter={`url(#frame-glow-${domain})`} />
            <circle cx="5" cy="195" r="2" fill="#A7F3D0" filter={`url(#frame-glow-${domain})`} />
            <circle cx="193" cy="85" r="2" fill="#A7F3D0" filter={`url(#frame-glow-${domain})`} />
            <circle cx="195" cy="195" r="2" fill="#A7F3D0" filter={`url(#frame-glow-${domain})`} />

            {/* Upper Canopy Arch & Emerald Heartseed */}
            <path d="M 5 30 C 18 10, 50 4, 100 6 C 150 4, 182 10, 195 30" stroke="#10B981" strokeWidth="2.8" fill="none" />
            <path d="M 100 -3 C 106 3, 106 10, 100 15 C 94 10, 94 3, 100 -3 Z" fill="#059669" stroke="#A7F3D0" strokeWidth="1.2" filter={`url(#frame-glow-${domain})`} />
            <circle cx="100" cy="6" r="2" fill="#ECFDF5" />

            {/* Lower Root Cradle */}
            <path d="M 5 260 C 22 278, 58 284, 100 282 C 142 284, 178 278, 195 260" stroke="#10B981" strokeWidth="2.8" fill="none" />
            <circle cx="100" cy="279" r="5" fill="#064E3B" stroke="#34D399" strokeWidth="1.3" />
            <circle cx="100" cy="279" r="2" fill="#A7F3D0" />
          </g>
        )}

        {/* ================= DOMAIN 4: ARCANE (ASTRAL ASTROLABE & CELESTIAL GEOMETRY) ================= */}
        {domain === 'Arcane' && (
          <g>
            {/* Geometric Astrolabe Conduit Rails & Constellation Nodes */}
            <line x1="5" y1="22" x2="5" y2="266" stroke="#3B82F6" strokeWidth="2.2" />
            <line x1="9" y1="30" x2="9" y2="258" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="195" y1="22" x2="195" y2="266" stroke="#3B82F6" strokeWidth="2.2" />
            <line x1="191" y1="30" x2="191" y2="258" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="4 4" />

            {/* Side Astrolabe Ring Ornaments */}
            <circle cx="5" cy="144" r="4.5" fill="#0F172A" stroke="#60A5FA" strokeWidth="1.2" />
            <circle cx="5" cy="144" r="1.5" fill="#E0F2FE" />
            <circle cx="195" cy="144" r="4.5" fill="#0F172A" stroke="#60A5FA" strokeWidth="1.2" />
            <circle cx="195" cy="144" r="1.5" fill="#E0F2FE" />

            {/* Upper Celestial Compass Arch & Floating Prism Finial */}
            <path d="M 5 26 L 28 8 L 100 4 L 172 8 L 195 26" stroke={`url(#frame-metal-${domain})`} strokeWidth="2.5" fill="none" />
            <circle cx="100" cy="6" r="8" stroke="#60A5FA" strokeWidth="1" fill="none" strokeDasharray="2 2" />
            <polygon points="100,-3 106,6 100,15 94,6" fill="#2563EB" stroke="#E0F2FE" strokeWidth="1.2" filter={`url(#frame-glow-${domain})`} />

            {/* Lower Arcane Octagon Seal */}
            <path d="M 5 262 L 28 280 L 100 284 L 172 280 L 195 262" stroke={`url(#frame-metal-${domain})`} strokeWidth="2.5" fill="none" />
            <polygon points="100,271 107,278 100,285 93,278" fill="#1E1B4B" stroke="#93C5FD" strokeWidth="1.2" />
            <circle cx="100" cy="278" r="2" fill="#E0F2FE" />
          </g>
        )}

        {/* ================= DOMAIN 5: TEMPEST (SKY-STEEL TESLA CONDUIT & LIGHTNING ARCS) ================= */}
        {domain === 'Tempest' && (
          <g>
            {/* Aerodynamic Storm-Steel Side Blades & Plasma Coils */}
            <polyline points="3,24 9,42 4,88 9,144 4,200 9,246 3,264" stroke="#06B6D4" strokeWidth="2.4" fill="none" />
            <polyline points="197,24 191,42 196,88 191,144 196,200 191,246 197,264" stroke="#06B6D4" strokeWidth="2.4" fill="none" />
            <line x1="6" y1="36" x2="6" y2="252" stroke="#CFFAFE" strokeWidth="0.9" strokeDasharray="10 4" />
            <line x1="194" y1="36" x2="194" y2="252" stroke="#CFFAFE" strokeWidth="0.9" strokeDasharray="10 4" />

            {/* Upper High-Voltage Lightning Crown */}
            <polyline points="4,28 22,10 58,8 85,4 100,10 115,4 142,8 178,10 196,28" stroke={`url(#frame-metal-${domain})`} strokeWidth="2.6" fill="none" />
            <polygon points="100,-4 105,3 111,0 107,7 113,8 103,14 100,18 97,14 87,8 93,7 89,0 95,3" fill="#0891B2" stroke="#CFFAFE" strokeWidth="1.1" filter={`url(#frame-glow-${domain})`} />
            <circle cx="100" cy="7" r="2.2" fill="#FFFFFF" />

            {/* Lower Cyclone Fulcrum Base */}
            <polyline points="4,260 24,278 65,283 100,278 135,283 176,278 196,260" stroke={`url(#frame-metal-${domain})`} strokeWidth="2.6" fill="none" />
            <polygon points="92,276 100,270 108,276 104,285 96,285" fill="#083344" stroke="#38BDF8" strokeWidth="1.2" />
            <circle cx="100" cy="278" r="2.2" fill="#CFFAFE" />
          </g>
        )}

        {/* ================= DOMAIN 6: ABYSS (NECROTIC BONE & VOID IRON RIBS) ================= */}
        {domain === 'Abyss' && (
          <g>
            {/* Spiked Gothic Rib-Arches & Void Conduits */}
            <path d="M 4 24 L 10 38 L 4 56 L 9 95 L 4 144 L 9 193 L 4 232 L 10 250 L 4 264" stroke="#9333EA" strokeWidth="2.5" fill="none" />
            <path d="M 196 24 L 190 38 L 196 56 L 191 95 L 196 144 L 191 193 L 196 232 L 190 250 L 196 264" stroke="#9333EA" strokeWidth="2.5" fill="none" />

            {/* Horned Abyssal Crown & Void Eye */}
            <path d="M 4 30 C 16 10, 46 3, 100 5 C 154 3, 184 10, 196 30" stroke="#7E22CE" strokeWidth="3" fill="none" />
            <polygon points="86,10 92,-3 97,6 100,-5 103,6 108,-3 114,10 100,16" fill="#3B0764" stroke="#E879F9" strokeWidth="1.1" filter={`url(#frame-glow-${domain})`} />
            <circle cx="100" cy="6" r="2.3" fill="#F5D0FE" />

            {/* Lower Crypt Talon Plinth */}
            <path d="M 4 260 C 18 277, 52 284, 100 284 C 148 284, 182 277, 196 260" stroke="#7E22CE" strokeWidth="2.8" fill="none" />
            <polygon points="100,269 109,276 104,286 96,286 91,276" fill="#2E1065" stroke="#E879F9" strokeWidth="1.2" />
            <circle cx="100" cy="278" r="2.5" fill="#C084FC" />
          </g>
        )}

        {/* ================= SCULPTED CORNER FILIGREE BRACKETS ================= */}
        <g stroke={config.secondaryColor} strokeWidth="1.8" opacity="0.9">
          {/* Top-Left */}
          <path d="M 3 18 L 3 3 L 18 3" />
          <circle cx="7" cy="7" r="1.5" fill={config.primaryColor} />
          {/* Top-Right */}
          <path d="M 197 18 L 197 3 L 182 3" />
          <circle cx="193" cy="7" r="1.5" fill={config.primaryColor} />
          {/* Bottom-Left */}
          <path d="M 3 270 L 3 285 L 18 285" />
          <circle cx="7" cy="281" r="1.5" fill={config.primaryColor} />
          {/* Bottom-Right */}
          <path d="M 197 270 L 197 285 L 182 285" />
          <circle cx="193" cy="281" r="1.5" fill={config.primaryColor} />
        </g>
      </svg>

      {/* 4. Rare+ Ambient Inner Shimmer */}
      {rarityConfig.hasAura && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-30 mix-blend-screen"
          style={{
            boxShadow: `inset 0 0 18px ${config.primaryColor}`
          }}
        />
      )}
    </div>
  );
};
