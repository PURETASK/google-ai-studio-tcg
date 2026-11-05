import React from 'react';
import { Domain } from '../types';

interface CardDomainStatBadgeProps {
  domain: Domain;
  type: 'cost' | 'attack' | 'defense';
  value: number | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CardDomainStatBadge: React.FC<CardDomainStatBadgeProps> = ({
  domain,
  type,
  value,
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    sm: {
      cost: 'w-7 h-7 text-[11px]',
      attack: 'w-12 h-7 text-[11px]',
      defense: 'w-12 h-7 text-[11px]'
    },
    md: {
      cost: 'w-8 h-8 text-xs',
      attack: 'w-14 h-7 text-xs',
      defense: 'w-14 h-7 text-xs'
    },
    lg: {
      cost: 'w-10 h-10 text-sm',
      attack: 'w-16 h-8 text-sm',
      defense: 'w-16 h-8 text-sm'
    }
  };

  // ================= 1. SCULPTED ESSENCE COST CREST (6 DISTINCT DOMAINS) =================
  if (type === 'cost') {
    switch (domain) {
      case 'Sanctuary':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`} title={`Essence Cost: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(245,158,11,0.75)]" viewBox="0 0 36 36">
              <defs>
                <radialGradient id="sancCostGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="55%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#78350F" />
                </radialGradient>
              </defs>
              <rect x="6" y="6" width="24" height="24" rx="3" fill="url(#sancCostGrad)" stroke="#FEF3C7" strokeWidth="1.2" />
              <rect x="6" y="6" width="24" height="24" rx="3" transform="rotate(45 18 18)" fill="url(#sancCostGrad)" stroke="#FEF3C7" strokeWidth="1.2" />
              <circle cx="18" cy="18" r="10" fill="#291502" stroke="#FDE68A" strokeWidth="1.4" />
            </svg>
            <span className="relative z-10 font-mono-tabular font-extrabold text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {value}
            </span>
          </div>
        );

      case 'Radiance':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`} title={`Essence Cost: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(239,68,68,0.8)]" viewBox="0 0 36 36">
              <defs>
                <linearGradient id="radCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
              </defs>
              <path d="M 18,2 C 25,9 32,16 32,24 C 32,31 25,34 18,34 C 11,34 4,31 4,24 C 4,16 11,9 18,2 Z" fill="url(#radCostGrad)" stroke="#FED7AA" strokeWidth="1.3" />
              <circle cx="18" cy="21" r="9.5" fill="#3B0606" stroke="#FB923C" strokeWidth="1.3" />
            </svg>
            <span className="relative z-10 font-mono-tabular font-extrabold text-orange-50 translate-y-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {value}
            </span>
          </div>
        );

      case 'Verdance':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`} title={`Essence Cost: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(16,185,129,0.75)]" viewBox="0 0 36 36">
              <defs>
                <linearGradient id="verdCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6EE7B7" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#064E3B" />
                </linearGradient>
              </defs>
              <path d="M 18,2 C 30,7 33,21 24,31 C 18,35 9,31 5,24 C 1,15 8,5 18,2 Z" fill="url(#verdCostGrad)" stroke="#A7F3D0" strokeWidth="1.3" />
              <circle cx="18" cy="18.5" r="9.5" fill="#022C22" stroke="#34D399" strokeWidth="1.3" />
            </svg>
            <span className="relative z-10 font-mono-tabular font-extrabold text-emerald-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {value}
            </span>
          </div>
        );

      case 'Arcane':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`} title={`Essence Cost: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(59,130,246,0.8)]" viewBox="0 0 36 36">
              <defs>
                <linearGradient id="arcCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1E1B4B" />
                </linearGradient>
              </defs>
              <polygon points="18,2 32,9 32,27 18,34 4,27 4,9" fill="url(#arcCostGrad)" stroke="#DBEAFE" strokeWidth="1.3" />
              <circle cx="18" cy="18" r="9.5" fill="#0B112C" stroke="#60A5FA" strokeWidth="1.3" />
            </svg>
            <span className="relative z-10 font-mono-tabular font-extrabold text-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {value}
            </span>
          </div>
        );

      case 'Tempest':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`} title={`Essence Cost: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(6,182,212,0.8)]" viewBox="0 0 36 36">
              <defs>
                <linearGradient id="tmpCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#CFFAFE" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#083344" />
                </linearGradient>
              </defs>
              {/* Vortex Cyclone Octagon Crest */}
              <polygon points="18,1 28,5 35,18 28,31 18,35 8,31 1,18 8,5" fill="url(#tmpCostGrad)" stroke="#E0F2FE" strokeWidth="1.3" />
              <circle cx="18" cy="18" r="9.5" fill="#041E2B" stroke="#22D3EE" strokeWidth="1.3" />
            </svg>
            <span className="relative z-10 font-mono-tabular font-extrabold text-cyan-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {value}
            </span>
          </div>
        );

      case 'Abyss':
      default:
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`} title={`Essence Cost: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(168,85,247,0.8)]" viewBox="0 0 36 36">
              <defs>
                <linearGradient id="abyCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5D0FE" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#3B0764" />
                </linearGradient>
              </defs>
              <path d="M 18,2 L 32,11 L 28,29 L 18,34 L 8,29 L 4,11 Z" fill="url(#abyCostGrad)" stroke="#F3E8FF" strokeWidth="1.3" />
              <circle cx="18" cy="18" r="9.5" fill="#180326" stroke="#C084FC" strokeWidth="1.3" />
            </svg>
            <span className="relative z-10 font-mono-tabular font-extrabold text-purple-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {value}
            </span>
          </div>
        );
    }
  }

  // ================= 2. SCULPTED ATTACK CREST (6 DISTINCT DOMAINS) =================
  if (type === 'attack') {
    const attackPalette: Record<Domain, { bg1: string; bg2: string; stroke: string; text: string; iconColor: string }> = {
      Sanctuary: { bg1: '#451A03', bg2: '#78350F', stroke: '#F59E0B', text: 'text-amber-100', iconColor: 'text-amber-400' },
      Radiance: { bg1: '#450A0A', bg2: '#991B1B', stroke: '#F97316', text: 'text-orange-100', iconColor: 'text-orange-400' },
      Verdance: { bg1: '#022C22', bg2: '#065F46', stroke: '#10B981', text: 'text-emerald-100', iconColor: 'text-emerald-400' },
      Arcane: { bg1: '#0F172A', bg2: '#1E3A8A', stroke: '#60A5FA', text: 'text-sky-100', iconColor: 'text-sky-400' },
      Tempest: { bg1: '#041E2B', bg2: '#155E75', stroke: '#22D3EE', text: 'text-cyan-100', iconColor: 'text-cyan-300' },
      Abyss: { bg1: '#180326', bg2: '#581C87', stroke: '#C084FC', text: 'text-purple-100', iconColor: 'text-purple-300' }
    };
    const pal = attackPalette[domain] || attackPalette.Sanctuary;

    return (
      <div className={`relative flex items-center justify-center select-none ${sizeMap[size].attack} ${className}`} title={`Attack Power: ${value}`}>
        <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]" viewBox="0 0 56 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`atk-grad-${domain}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={pal.bg1} />
              <stop offset="60%" stopColor={pal.bg2} />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>
          </defs>
          {domain === 'Sanctuary' && (
            <path d="M 6,15 L 1,4 L 12,2 L 46,2 L 54,15 L 46,28 L 12,28 L 1,26 Z" fill={`url(#atk-grad-${domain})`} stroke={pal.stroke} strokeWidth="1.6" />
          )}
          {domain === 'Radiance' && (
            <path d="M 2,15 L 9,2 L 46,2 L 54,9 L 49,15 L 54,21 L 46,28 L 9,28 Z" fill={`url(#atk-grad-${domain})`} stroke={pal.stroke} strokeWidth="1.6" />
          )}
          {domain === 'Verdance' && (
            <path d="M 2,15 C 2,6 11,2 20,2 L 44,2 C 52,2 54,8 52,15 C 54,22 52,28 44,28 L 20,28 C 11,28 2,24 2,15 Z" fill={`url(#atk-grad-${domain})`} stroke={pal.stroke} strokeWidth="1.6" />
          )}
          {domain === 'Arcane' && (
            <polygon points="10,2 46,2 54,15 46,28 10,28 2,15" fill={`url(#atk-grad-${domain})`} stroke={pal.stroke} strokeWidth="1.6" />
          )}
          {domain === 'Tempest' && (
            <polygon points="2,15 12,2 48,2 54,15 48,28 12,28" fill={`url(#atk-grad-${domain})`} stroke={pal.stroke} strokeWidth="1.6" />
          )}
          {domain === 'Abyss' && (
            <path d="M 4,2 L 44,2 L 54,11 L 46,28 L 12,28 L 2,19 Z" fill={`url(#atk-grad-${domain})`} stroke={pal.stroke} strokeWidth="1.6" />
          )}
        </svg>
        <div className="relative z-10 flex items-center gap-1 px-1.5">
          <svg className={`w-3.5 h-3.5 ${pal.iconColor} shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14.5 17.5L3 6V3h3l11.5 11.5" strokeLinecap="round" />
            <path d="M13 19l6-6M16 16l4 4" strokeLinecap="round" />
          </svg>
          <span className={`font-mono-tabular font-extrabold ${pal.text} drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]`}>
            {value}
          </span>
        </div>
      </div>
    );
  }

  // ================= 3. SCULPTED DEFENSE CREST (6 DISTINCT DOMAINS) =================
  const defensePalette: Record<Domain, { bg1: string; bg2: string; stroke: string; text: string; iconColor: string }> = {
    Sanctuary: { bg1: '#1C1917', bg2: '#451A03', stroke: '#FBBF24', text: 'text-amber-100', iconColor: 'text-amber-300' },
    Radiance: { bg1: '#1C1917', bg2: '#450A0A', stroke: '#EF4444', text: 'text-red-100', iconColor: 'text-red-300' },
    Verdance: { bg1: '#042F2E', bg2: '#064E3B', stroke: '#34D399', text: 'text-emerald-100', iconColor: 'text-emerald-300' },
    Arcane: { bg1: '#0B1329', bg2: '#172554', stroke: '#60A5FA', text: 'text-blue-100', iconColor: 'text-blue-300' },
    Tempest: { bg1: '#041E2B', bg2: '#083344', stroke: '#38BDF8', text: 'text-cyan-100', iconColor: 'text-cyan-300' },
    Abyss: { bg1: '#12021E', bg2: '#2E1065', stroke: '#A855F7', text: 'text-purple-100', iconColor: 'text-purple-300' }
  };
  const defPal = defensePalette[domain] || defensePalette.Sanctuary;

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeMap[size].defense} ${className}`} title={`Defense / Health: ${value}`}>
      <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]" viewBox="0 0 56 30" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`def-grad-${domain}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={defPal.bg1} />
            <stop offset="60%" stopColor={defPal.bg2} />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
        </defs>
        <path
          d="M 4,3 L 52,3 L 50,18 C 47,25 28,29 28,29 C 28,29 9,25 6,18 Z"
          fill={`url(#def-grad-${domain})`}
          stroke={defPal.stroke}
          strokeWidth="1.6"
        />
      </svg>
      <div className="relative z-10 flex items-center gap-1 px-1.5">
        <svg className={`w-3.5 h-3.5 ${defPal.iconColor} shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.28" />
        </svg>
        <span className={`font-mono-tabular font-extrabold ${defPal.text} drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]`}>
          {value}
        </span>
      </div>
    </div>
  );
};
