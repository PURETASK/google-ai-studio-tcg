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
  // Dimension tokens
  const sizeMap = {
    sm: {
      cost: 'w-6 h-6 text-[10px]',
      attack: 'w-10 h-6 text-[10.5px]',
      defense: 'w-10 h-6 text-[10.5px]'
    },
    md: {
      cost: 'w-7 h-7 text-xs',
      attack: 'w-12 h-7 text-xs',
      defense: 'w-12 h-7 text-xs'
    },
    lg: {
      cost: 'w-9 h-9 text-sm',
      attack: 'w-14 h-8 text-sm',
      defense: 'w-14 h-8 text-sm'
    }
  };

  // ================= 1. ESSENCE COST ORB / SEAL =================
  if (type === 'cost') {
    switch (domain) {
      case 'Sanctuary':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`}>
            {/* 8-Pointed Solar Cathedral Star */}
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(245,158,11,0.6)]" viewBox="0 0 32 32">
              <defs>
                <radialGradient id="sancCostGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="60%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#78350F" />
                </radialGradient>
              </defs>
              <rect x="5" y="5" width="22" height="22" rx="3" fill="url(#sancCostGrad)" stroke="#FEF3C7" strokeWidth="1" />
              <rect x="5" y="5" width="22" height="22" rx="3" transform="rotate(45 16 16)" fill="url(#sancCostGrad)" stroke="#FEF3C7" strokeWidth="1" />
              <circle cx="16" cy="16" r="9" fill="#451A03" stroke="#FDE68A" strokeWidth="1.2" />
            </svg>
            <span className="relative z-10 font-cinzel font-black text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        );

      case 'Radiance':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`}>
            {/* Volcanic Magma Flame Crest */}
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(239,68,68,0.7)]" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="radCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
              </defs>
              <path
                d="M 16,2 C 22,8 28,15 28,22 C 28,28 22,31 16,31 C 10,31 4,28 4,22 C 4,15 10,8 16,2 Z"
                fill="url(#radCostGrad)"
                stroke="#FED7AA"
                strokeWidth="1.2"
              />
              <circle cx="16" cy="20" r="8" fill="#450A0A" stroke="#F87171" strokeWidth="1" />
            </svg>
            <span className="relative z-10 font-cinzel font-black text-orange-100 translate-y-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        );

      case 'Verdance':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`}>
            {/* Primal Sacred Leaf / Triskele Ring */}
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(16,185,129,0.6)]" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="verdCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6EE7B7" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#064E3B" />
                </linearGradient>
              </defs>
              <path
                d="M 16,2 C 27,6 30,19 22,28 C 16,33 8,28 4,22 C 0,14 7,4 16,2 Z"
                fill="url(#verdCostGrad)"
                stroke="#A7F3D0"
                strokeWidth="1.2"
              />
              <circle cx="16" cy="17" r="8.5" fill="#022C22" stroke="#34D399" strokeWidth="1" />
            </svg>
            <span className="relative z-10 font-cinzel font-black text-emerald-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        );

      case 'Arcane':
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`}>
            {/* Astral Hexagonal Runic Diamond */}
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(59,130,246,0.7)]" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="arcCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1E1B4B" />
                </linearGradient>
              </defs>
              <polygon
                points="16,2 29,8 29,24 16,30 3,24 3,8"
                fill="url(#arcCostGrad)"
                stroke="#BFDBFE"
                strokeWidth="1.2"
              />
              <circle cx="16" cy="16" r="8" fill="#0F172A" stroke="#60A5FA" strokeWidth="1" />
            </svg>
            <span className="relative z-10 font-cinzel font-black text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        );

      case 'Abyss':
      default:
        return (
          <div className={`relative shrink-0 flex items-center justify-center select-none ${sizeMap[size].cost} ${className}`}>
            {/* Nether Soul Gothic Talon Seal */}
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(168,85,247,0.7)]" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="abyCostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D8B4FE" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#3B0764" />
                </linearGradient>
              </defs>
              <path
                d="M 16,2 L 28,10 L 25,26 L 16,31 L 7,26 L 4,10 Z"
                fill="url(#abyCostGrad)"
                stroke="#E9D5FF"
                strokeWidth="1.2"
              />
              <circle cx="16" cy="16" r="8" fill="#180326" stroke="#C084FC" strokeWidth="1" />
            </svg>
            <span className="relative z-10 font-cinzel font-black text-purple-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        );
    }
  }

  // ================= 2. ATTACK (POWER / ATK) CUSTOM DOMAIN VECTOR SHAPES =================
  if (type === 'attack') {
    switch (domain) {
      case 'Sanctuary':
        return (
          <div className={`relative flex items-center justify-center select-none ${sizeMap[size].attack} ${className}`} title={`Attack Power: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)]" viewBox="0 0 48 28" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sancAtkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#451A03" />
                  <stop offset="50%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#2A0B02" />
                </linearGradient>
              </defs>
              {/* Solar Crossblade / Notched Blade Silhouette */}
              <path
                d="M 6,14 L 1,4 L 10,2 L 40,2 L 47,14 L 40,26 L 10,26 L 1,24 Z"
                fill="url(#sancAtkGrad)"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
              <path d="M 12,4 L 16,14 L 12,24" stroke="#FDE68A" strokeWidth="1" fill="none" opacity="0.6" />
              <circle cx="7" cy="14" r="2.5" fill="#FBBF24" />
            </svg>
            <div className="relative z-10 flex items-center gap-1 px-1">
              <svg className="w-3 h-3 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" />
              </svg>
              <span className="font-cinzel font-black text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {value}
              </span>
            </div>
          </div>
        );

      case 'Radiance':
        return (
          <div className={`relative flex items-center justify-center select-none ${sizeMap[size].attack} ${className}`} title={`Attack Power: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(239,68,68,0.6)]" viewBox="0 0 48 28" preserveAspectRatio="none">
              <defs>
                <linearGradient id="radAtkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#450A0A" />
                  <stop offset="50%" stopColor="#7F1D1D" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
              </defs>
              {/* Flame Cleaver Jagged Weapon Silhouette */}
              <path
                d="M 2,14 L 8,2 L 40,2 L 46,9 L 41,14 L 46,19 L 40,26 L 8,26 Z"
                fill="url(#radAtkGrad)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <path d="M 6,14 L 14,4 L 14,24 Z" fill="#F97316" opacity="0.5" />
            </svg>
            <div className="relative z-10 flex items-center gap-1 px-1">
              <svg className="w-3 h-3 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14.5 17.5L3 6V3h3l11.5 11.5" strokeLinecap="round" />
                <path d="M13 19l6-6" strokeLinecap="round" />
              </svg>
              <span className="font-cinzel font-black text-orange-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {value}
              </span>
            </div>
          </div>
        );

      case 'Verdance':
        return (
          <div className={`relative flex items-center justify-center select-none ${sizeMap[size].attack} ${className}`} title={`Attack Power: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(16,185,129,0.5)]" viewBox="0 0 48 28" preserveAspectRatio="none">
              <defs>
                <linearGradient id="verdAtkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#022C22" />
                  <stop offset="50%" stopColor="#064E3B" />
                  <stop offset="100%" stopColor="#065F46" />
                </linearGradient>
              </defs>
              {/* Sylvan Thorn Crescent Glaive Silhouette */}
              <path
                d="M 2,14 C 2,6 10,2 18,2 L 38,2 C 45,2 47,8 45,14 C 47,20 45,26 38,26 L 18,26 C 10,26 2,22 2,14 Z"
                fill="url(#verdAtkGrad)"
                stroke="#10B981"
                strokeWidth="1.5"
              />
              <path d="M 6,14 C 12,6 20,4 28,4" stroke="#6EE7B7" strokeWidth="1" fill="none" opacity="0.6" />
            </svg>
            <div className="relative z-10 flex items-center gap-1 px-1">
              <svg className="w-3 h-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4C10 6 16 12 18 20C12 18 6 12 4 4Z" />
              </svg>
              <span className="font-cinzel font-black text-emerald-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {value}
              </span>
            </div>
          </div>
        );

      case 'Arcane':
        return (
          <div className={`relative flex items-center justify-center select-none ${sizeMap[size].attack} ${className}`} title={`Attack Power: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(59,130,246,0.6)]" viewBox="0 0 48 28" preserveAspectRatio="none">
              <defs>
                <linearGradient id="arcAtkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F172A" />
                  <stop offset="50%" stopColor="#1E1B4B" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>
              </defs>
              {/* Astral Chrono Crystal Shard Rhombus Silhouette */}
              <polygon
                points="10,2 38,2 47,14 38,26 10,26 1,14"
                fill="url(#arcAtkGrad)"
                stroke="#38BDF8"
                strokeWidth="1.5"
              />
              <line x1="12" y1="14" x2="36" y2="14" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.7" />
            </svg>
            <div className="relative z-10 flex items-center gap-1 px-1">
              <svg className="w-3 h-3 text-cyan-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15 8 21 12 15 16 12 22 9 16 3 12 9 8" fill="currentColor" fillOpacity="0.4" />
              </svg>
              <span className="font-cinzel font-black text-cyan-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {value}
              </span>
            </div>
          </div>
        );

      case 'Abyss':
      default:
        return (
          <div className={`relative flex items-center justify-center select-none ${sizeMap[size].attack} ${className}`} title={`Attack Power: ${value}`}>
            <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(168,85,247,0.6)]" viewBox="0 0 48 28" preserveAspectRatio="none">
              <defs>
                <linearGradient id="abyAtkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#180326" />
                  <stop offset="50%" stopColor="#3B0764" />
                  <stop offset="100%" stopColor="#581C87" />
                </linearGradient>
              </defs>
              {/* Nether Scythe Gothic Curved Fang Silhouette */}
              <path
                d="M 4,2 L 36,2 L 47,10 L 40,26 L 10,26 L 1,18 Z"
                fill="url(#abyAtkGrad)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <path d="M 4,2 C 10,12 22,18 36,20" stroke="#E9D5FF" strokeWidth="1" fill="none" opacity="0.6" />
            </svg>
            <div className="relative z-10 flex items-center gap-1 px-1">
              <svg className="w-3 h-3 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6C8 3 18 4 21 9C17 11 11 10 8 13L4 21L2 19L5 12C3 10 2 8 3 6Z" />
              </svg>
              <span className="font-cinzel font-black text-purple-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {value}
              </span>
            </div>
          </div>
        );
    }
  }

  // ================= 3. DEFENSE (ARMOR / DEF) CUSTOM DOMAIN VECTOR SHAPES =================
  switch (domain) {
    case 'Sanctuary':
      return (
        <div className={`relative flex items-center justify-center select-none ${sizeMap[size].defense} ${className}`} title={`Defense / Armor: ${value}`}>
          <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(245,158,11,0.5)]" viewBox="0 0 48 28" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sancDefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1C1917" />
                <stop offset="50%" stopColor="#451A03" />
                <stop offset="100%" stopColor="#292524" />
              </linearGradient>
            </defs>
            {/* Cathedral Sun Aegis / Kite Tower Silhouette */}
            <path
              d="M 2,4 L 46,4 L 44,18 C 42,24 24,28 24,28 C 24,28 6,24 4,18 Z"
              fill="url(#sancDefGrad)"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            <path d="M 24,4 L 24,26" stroke="#FEF3C7" strokeWidth="1" opacity="0.4" />
            <path d="M 10,12 L 38,12" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.3" />
          </svg>
          <div className="relative z-10 flex items-center gap-1 px-1">
            <svg className="w-3 h-3 text-amber-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.2" />
              <circle cx="12" cy="11" r="2" fill="#FDE68A" />
            </svg>
            <span className="font-cinzel font-black text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        </div>
      );

    case 'Radiance':
      return (
        <div className={`relative flex items-center justify-center select-none ${sizeMap[size].defense} ${className}`} title={`Defense / Armor: ${value}`}>
          <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(239,68,68,0.5)]" viewBox="0 0 48 28" preserveAspectRatio="none">
            <defs>
              <linearGradient id="radDefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1C1917" />
                <stop offset="50%" stopColor="#450A0A" />
                <stop offset="100%" stopColor="#292524" />
              </linearGradient>
            </defs>
            {/* Obsidian Magma Bulwark Silhouette */}
            <path
              d="M 4,2 L 44,2 L 47,12 L 38,26 L 10,26 L 1,12 Z"
              fill="url(#radDefGrad)"
              stroke="#EF4444"
              strokeWidth="1.5"
            />
            <path d="M 8,8 L 40,8" stroke="#F87171" strokeWidth="0.8" opacity="0.5" />
          </svg>
          <div className="relative z-10 flex items-center gap-1 px-1">
            <svg className="w-3 h-3 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.3" />
              <path d="M12 7v8M8 11h8" stroke="#FBBF24" strokeWidth="1.5" />
            </svg>
            <span className="font-cinzel font-black text-red-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        </div>
      );

    case 'Verdance':
      return (
        <div className={`relative flex items-center justify-center select-none ${sizeMap[size].defense} ${className}`} title={`Defense / Armor: ${value}`}>
          <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(16,185,129,0.5)]" viewBox="0 0 48 28" preserveAspectRatio="none">
            <defs>
              <linearGradient id="verdDefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06251E" />
                <stop offset="50%" stopColor="#064E3B" />
                <stop offset="100%" stopColor="#042F2E" />
              </linearGradient>
            </defs>
            {/* Ironwood Root Shield Silhouette */}
            <path
              d="M 6,2 C 24,-1 42,-1 42,2 C 46,12 44,22 24,27 C 4,22 2,12 6,2 Z"
              fill="url(#verdDefGrad)"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <circle cx="24" cy="14" r="5" stroke="#34D399" strokeWidth="0.8" fill="none" opacity="0.5" />
          </svg>
          <div className="relative z-10 flex items-center gap-1 px-1">
            <svg className="w-3 h-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.3" />
              <path d="M12 6c-3 3-3 7 0 10c3-3 3-7 0-10" fill="#34D399" />
            </svg>
            <span className="font-cinzel font-black text-emerald-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        </div>
      );

    case 'Arcane':
      return (
        <div className={`relative flex items-center justify-center select-none ${sizeMap[size].defense} ${className}`} title={`Defense / Armor: ${value}`}>
          <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(59,130,246,0.5)]" viewBox="0 0 48 28" preserveAspectRatio="none">
            <defs>
              <linearGradient id="arcDefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1329" />
                <stop offset="50%" stopColor="#172554" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
            {/* Chrono-Barrier Hex Ward Silhouette */}
            <polygon
              points="12,2 36,2 46,14 36,26 12,26 2,14"
              fill="url(#arcDefGrad)"
              stroke="#60A5FA"
              strokeWidth="1.5"
            />
            <circle cx="24" cy="14" r="4" stroke="#93C5FD" strokeWidth="0.8" fill="none" opacity="0.6" />
          </svg>
          <div className="relative z-10 flex items-center gap-1 px-1">
            <svg className="w-3 h-3 text-blue-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 20 6.5 20 17.5 12 22 4 17.5 4 6.5" fill="currentColor" fillOpacity="0.25" />
            </svg>
            <span className="font-cinzel font-black text-blue-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        </div>
      );

    case 'Abyss':
    default:
      return (
        <div className={`relative flex items-center justify-center select-none ${sizeMap[size].defense} ${className}`} title={`Defense / Armor: ${value}`}>
          <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_5px_rgba(168,85,247,0.5)]" viewBox="0 0 48 28" preserveAspectRatio="none">
            <defs>
              <linearGradient id="abyDefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#12021E" />
                <stop offset="50%" stopColor="#2E1065" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
            {/* Crypt Skull Gothic Carapace Silhouette */}
            <path
              d="M 6,2 L 42,2 L 46,12 L 36,26 C 24,28 24,28 12,26 L 2,12 Z"
              fill="url(#abyDefGrad)"
              stroke="#A855F7"
              strokeWidth="1.5"
            />
            <path d="M 12,8 L 36,8" stroke="#D8B4FE" strokeWidth="0.8" opacity="0.5" />
          </svg>
          <div className="relative z-10 flex items-center gap-1 px-1">
            <svg className="w-3 h-3 text-purple-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.3" />
            </svg>
            <span className="font-cinzel font-black text-purple-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {value}
            </span>
          </div>
        </div>
      );
  }
};
