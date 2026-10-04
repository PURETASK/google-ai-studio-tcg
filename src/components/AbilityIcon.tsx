import React from 'react';
import { soundEngine } from '../utils/audioEngine';
import {
  Sword,
  Shield,
  Flame,
  Sparkles,
  Eye,
  Zap,
  Skull,
  Feather,
  Wind,
  Heart,
  BookOpen,
  Moon,
  Sun,
  Hourglass,
  Crown,
  Layers,
  Wand2,
  Crosshair,
  Compass,
  Radio,
  Mountain,
  Droplet,
  TreePine,
  Anchor,
  Atom,
  Cpu,
  Key,
  Activity,
  Award
} from 'lucide-react';
import { Domain } from '../types';

interface AbilityIconProps {
  type: string;
  domain?: Domain;
  className?: string;
  size?: number;
}

export const AbilityIcon: React.FC<AbilityIconProps> = ({ type, domain, className = '', size = 14 }) => {
  const normalized = (type || 'zap').toLowerCase();

  const getMicroClass = () => {
    // Check domain-specific ability matches first
    if (normalized.includes('radiance') || domain === 'Radiance' || normalized.includes('pyro') || normalized.includes('scorch') || normalized.includes('solar') || normalized.includes('dawnstrike')) {
      return 'hover-icon-flame text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]';
    }
    if (normalized.includes('verdance') || domain === 'Verdance' || normalized.includes('spore') || normalized.includes('ironbark') || normalized.includes('bloom') || normalized.includes('neurotoxin')) {
      return 'hover:scale-125 transition-transform duration-200 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]';
    }
    if (normalized.includes('sanctuary') || domain === 'Sanctuary' || normalized.includes('aegis') || normalized.includes('retribution') || normalized.includes('bulwark') || normalized.includes('benediction')) {
      return 'hover-icon-shield text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]';
    }
    if (normalized.includes('arcane') || domain === 'Arcane' || normalized.includes('chrono') || normalized.includes('stasis') || normalized.includes('aether') || normalized.includes('lightning')) {
      return 'hover-icon-zap text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]';
    }
    if (normalized.includes('abyss') || domain === 'Abyss' || normalized.includes('siphon') || normalized.includes('decay') || normalized.includes('necro') || normalized.includes('exile')) {
      return 'hover-icon-astral text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]';
    }

    switch (normalized) {
      case 'flame':
      case 'fire':
        return 'hover-icon-flame text-orange-400';
      case 'zap':
      case 'lightning':
        return 'hover-icon-zap text-amber-300';
      case 'sword':
      case 'blade':
      case 'axe':
        return 'hover-icon-sword text-red-400';
      case 'shield':
      case 'barrier':
        return 'hover-icon-shield text-blue-400';
      case 'sparkles':
      case 'sun':
      case 'holy':
        return 'hover-icon-astral text-amber-200';
      case 'eye':
      case 'vision':
        return 'hover-icon-astral text-cyan-300';
      case 'skull':
      case 'death':
      case 'decay':
        return 'text-purple-400';
      case 'feather':
      case 'wind':
        return 'text-teal-300';
      case 'heart':
      case 'life':
        return 'text-rose-400';
      case 'moon':
      case 'astral':
        return 'text-indigo-300';
      case 'book':
      case 'scroll':
      case 'spell':
        return 'text-sky-300';
      case 'crown':
      case 'ultimate':
        return 'text-amber-300';
      default:
        return 'hover:scale-125 transition-transform duration-200 text-amber-300';
    }
  };

  const combinedClass = `inline-flex shrink-0 transition-transform duration-150 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${getMicroClass()} ${className}`;

  const renderIcon = () => {
    // 1. Radiance Domain Abilities
    if (normalized.includes('scorch') || normalized.includes('pyro') || normalized.includes('flame') || normalized.includes('fire')) {
      return <Flame size={size} className={combinedClass} />;
    }
    if (normalized.includes('solar') || normalized.includes('flare') || normalized.includes('sun')) {
      return <Sun size={size} className={combinedClass} />;
    }
    if (normalized.includes('dawnstrike')) {
      return <Sword size={size} className={combinedClass} />;
    }
    if (normalized.includes('fissure') || normalized.includes('mountain')) {
      return <Mountain size={size} className={combinedClass} />;
    }
    if (normalized.includes('aureole') || normalized.includes('crown')) {
      return <Crown size={size} className={combinedClass} />;
    }

    // 2. Verdance Domain Abilities
    if (normalized.includes('spore') || normalized.includes('bloom') || normalized.includes('tree') || normalized.includes('ironbark')) {
      return <TreePine size={size} className={combinedClass} />;
    }
    if (normalized.includes('neurotoxin') || normalized.includes('venom') || normalized.includes('droplet')) {
      return <Droplet size={size} className={combinedClass} />;
    }
    if (normalized.includes('entangle') || normalized.includes('root') || normalized.includes('compass')) {
      return <Compass size={size} className={combinedClass} />;
    }
    if (normalized.includes('growth') || normalized.includes('heart') || normalized.includes('heal') || normalized.includes('vitality')) {
      return <Heart size={size} className={combinedClass} />;
    }

    // 3. Sanctuary Domain Abilities
    if (normalized.includes('aegis') || normalized.includes('shield') || normalized.includes('barrier') || normalized.includes('guard')) {
      return <Shield size={size} className={combinedClass} />;
    }
    if (normalized.includes('retribution') || normalized.includes('thorn') || normalized.includes('crosshair')) {
      return <Crosshair size={size} className={combinedClass} />;
    }
    if (normalized.includes('bulwark') || normalized.includes('taunt') || normalized.includes('anchor')) {
      return <Anchor size={size} className={combinedClass} />;
    }
    if (normalized.includes('benediction') || normalized.includes('sparkles') || normalized.includes('blessing')) {
      return <Sparkles size={size} className={combinedClass} />;
    }
    if (normalized.includes('consecrated') || normalized.includes('ward') || normalized.includes('award')) {
      return <Award size={size} className={combinedClass} />;
    }

    // 4. Arcane Domain Abilities
    if (normalized.includes('lightning') || normalized.includes('arc') || normalized.includes('zap') || normalized.includes('shock')) {
      return <Zap size={size} className={combinedClass} />;
    }
    if (normalized.includes('chrono') || normalized.includes('stasis') || normalized.includes('time') || normalized.includes('hourglass')) {
      return <Hourglass size={size} className={combinedClass} />;
    }
    if (normalized.includes('surge') || normalized.includes('echo') || normalized.includes('atom')) {
      return <Atom size={size} className={combinedClass} />;
    }
    if (normalized.includes('overload') || normalized.includes('cpu')) {
      return <Cpu size={size} className={combinedClass} />;
    }
    if (normalized.includes('scry') || normalized.includes('gaze') || normalized.includes('eye') || normalized.includes('vision')) {
      return <Eye size={size} className={combinedClass} />;
    }

    // 5. Abyss Domain Abilities
    if (normalized.includes('siphon') || normalized.includes('skull') || normalized.includes('death')) {
      return <Skull size={size} className={combinedClass} />;
    }
    if (normalized.includes('decay') || normalized.includes('rot') || normalized.includes('activity')) {
      return <Activity size={size} className={combinedClass} />;
    }
    if (normalized.includes('reanimation') || normalized.includes('boneyard') || normalized.includes('layers')) {
      return <Layers size={size} className={combinedClass} />;
    }
    if (normalized.includes('exile') || normalized.includes('banish') || normalized.includes('key') || normalized.includes('rift')) {
      return <Key size={size} className={combinedClass} />;
    }
    if (normalized.includes('mind') || normalized.includes('flay') || normalized.includes('discard')) {
      return <Eye size={size} className={combinedClass} />;
    }

    // General fallback matches
    switch (normalized) {
      case 'sword':
      case 'blade':
      case 'axe':
        return <Sword size={size} className={combinedClass} />;
      case 'shield':
      case 'barrier':
        return <Shield size={size} className={combinedClass} />;
      case 'flame':
      case 'fire':
        return <Flame size={size} className={combinedClass} />;
      case 'sparkles':
        return <Sparkles size={size} className={combinedClass} />;
      case 'eye':
      case 'vision':
        return <Eye size={size} className={combinedClass} />;
      case 'zap':
      case 'lightning':
        return <Zap size={size} className={combinedClass} />;
      case 'skull':
      case 'decay':
      case 'poison':
      case 'snake':
        return <Skull size={size} className={combinedClass} />;
      case 'feather':
      case 'wind':
        return <Wind size={size} className={combinedClass} />;
      case 'heart':
      case 'heal':
        return <Heart size={size} className={combinedClass} />;
      case 'book':
      case 'spell':
        return <BookOpen size={size} className={combinedClass} />;
      case 'moon':
        return <Moon size={size} className={combinedClass} />;
      case 'sun':
        return <Sun size={size} className={combinedClass} />;
      case 'hourglass':
        return <Hourglass size={size} className={combinedClass} />;
      case 'crown':
        return <Crown size={size} className={combinedClass} />;
      case 'wand':
        return <Wand2 size={size} className={combinedClass} />;
      case 'target':
        return <Crosshair size={size} className={combinedClass} />;
      default:
        return <Layers size={size} className={combinedClass} />;
    }
  };

  return (
    <span onMouseEnter={() => soundEngine.playMicroSound('hover')}>
      {renderIcon()}
    </span>
  );
};



