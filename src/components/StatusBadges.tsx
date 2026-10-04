import React from 'react';
import { UnitStatusEffects, PlayerStatusEffects } from '../types';

interface StatusBadgesProps {
  statuses?: UnitStatusEffects | PlayerStatusEffects | any;
  isPlayer?: boolean;
}

export const StatusBadges: React.FC<StatusBadgesProps> = ({ statuses, isPlayer = false }) => {
  if (!statuses) return null;

  const unitStatuses = statuses as UnitStatusEffects;
  const badges: { id: string; icon: string; label: string; text: string; bg: string; border: string; color: string; pulse?: boolean }[] = [];

  // 1. STUNNED / FROZEN / RESTRAINED (Incapacitated)
  if (unitStatuses.frozen || (unitStatuses.frozenTurns && unitStatuses.frozenTurns > 0)) {
    const turns = unitStatuses.frozenTurns || 1;
    badges.push({
      id: 'frozen',
      icon: '❄️',
      label: `Stunned / Frozen (${turns}T)`,
      text: `Incapacitated: Cannot attack or strike this turn.`,
      bg: 'bg-sky-950/90',
      border: 'border-sky-400/90',
      color: 'text-sky-300',
      pulse: true
    });
  }

  if (unitStatuses.restrained || (unitStatuses.restrainedTurns && unitStatuses.restrainedTurns > 0)) {
    const turns = unitStatuses.restrainedTurns || 1;
    badges.push({
      id: 'restrained',
      icon: '⛓️',
      label: `Restrained (${turns}T)`,
      text: `Entangled: Attack power halved and cannot charge.`,
      bg: 'bg-stone-900/90',
      border: 'border-stone-500/80',
      color: 'text-stone-300'
    });
  }

  // 2. BUFFED (Power or Stat Boosts)
  if (unitStatuses.buffed && unitStatuses.buffed > 0) {
    badges.push({
      id: 'buffed',
      icon: '✨',
      label: `Buffed (+${unitStatuses.buffed} PWR)`,
      text: `Empowered: Base Power increased by +${unitStatuses.buffed}.`,
      bg: 'bg-amber-950/90',
      border: 'border-amber-400/90',
      color: 'text-amber-300',
      pulse: true
    });
  }

  // 3. POISONED (Direct Toxic Damage)
  if ((unitStatuses.poison && unitStatuses.poison > 0) || (unitStatuses.poisonTurns && unitStatuses.poisonTurns > 0)) {
    const turns = unitStatuses.poisonTurns || 1;
    const dmg = unitStatuses.poisonDamage || unitStatuses.poison || 1;
    badges.push({
      id: 'poison',
      icon: '🍄',
      label: `Poisoned (${turns}T)`,
      text: `Suffers ${dmg} Toxic damage per turn, bypassing armor and shields.`,
      bg: 'bg-emerald-950/90',
      border: 'border-emerald-400/90',
      color: 'text-emerald-300',
      pulse: true
    });
  }

  // 4. BURN (Fire Damage)
  if ((unitStatuses.burn && unitStatuses.burn > 0) || (unitStatuses.burnTurns && unitStatuses.burnTurns > 0)) {
    const turns = unitStatuses.burnTurns || 1;
    const dmg = unitStatuses.burnDamage || unitStatuses.burn || 1;
    badges.push({
      id: 'burn',
      icon: '🔥',
      label: `Burn (${turns}T)`,
      text: `Suffers ${dmg} Fire damage at start of turn.`,
      bg: 'bg-red-950/90',
      border: 'border-red-500/90',
      color: 'text-red-300',
      pulse: true
    });
  }

  // 5. SHIELD / WARD
  if ((unitStatuses.shield && unitStatuses.shield > 0) || (unitStatuses.shieldTurns && unitStatuses.shieldTurns > 0) || (unitStatuses.shieldAmount && unitStatuses.shieldAmount > 0)) {
    const amount = unitStatuses.shieldAmount || unitStatuses.shield || 0;
    badges.push({
      id: 'shield',
      icon: '🛡️',
      label: `Ward (+${amount})`,
      text: `Absorbs up to ${amount} incoming damage before health is reduced.`,
      bg: 'bg-blue-950/90',
      border: 'border-blue-400/90',
      color: 'text-blue-300'
    });
  }

  // 6. FRENZY / BERSERK
  if ((unitStatuses.frenzy && unitStatuses.frenzy > 0) || (unitStatuses.frenzyTurns && unitStatuses.frenzyTurns > 0)) {
    const bonus = unitStatuses.frenzyBonus || unitStatuses.frenzy || 2;
    badges.push({
      id: 'frenzy',
      icon: '⚔️',
      label: `Frenzy (+${bonus} ATK)`,
      text: `Deals +${bonus} additional damage on attacks.`,
      bg: 'bg-rose-950/90',
      border: 'border-rose-500/90',
      color: 'text-rose-300'
    });
  }

  // 7. REGENERATION
  if ((unitStatuses.regeneration && unitStatuses.regeneration > 0) || (unitStatuses.regenTurns && unitStatuses.regenTurns > 0)) {
    const amount = unitStatuses.regenAmount || unitStatuses.regeneration || 1;
    badges.push({
      id: 'regen',
      icon: '🌿',
      label: `Regen (+${amount} HP)`,
      text: `Restores ${amount} Health at start of turn.`,
      bg: 'bg-green-950/90',
      border: 'border-green-400/90',
      color: 'text-green-300'
    });
  }

  // 8. VOID ROT
  if ((unitStatuses.voidRot && unitStatuses.voidRot > 0) || (unitStatuses.voidRotTurns && unitStatuses.voidRotTurns > 0)) {
    const turns = unitStatuses.voidRotTurns || 1;
    const red = unitStatuses.voidRotReduction || unitStatuses.voidRot || 1;
    badges.push({
      id: 'voidRot',
      icon: '💀',
      label: `Void Rot (${turns}T)`,
      text: `Max HP reduced by ${red} each round.`,
      bg: 'bg-purple-950/90',
      border: 'border-purple-400/90',
      color: 'text-purple-300'
    });
  }

  // 9. SILENCED
  if (unitStatuses.silenced) {
    badges.push({
      id: 'silenced',
      icon: '🔇',
      label: `Silenced`,
      text: `Passive and activated card abilities are disabled.`,
      bg: 'bg-zinc-900/90',
      border: 'border-zinc-500/90',
      color: 'text-zinc-300'
    });
  }

  // 10. ARMOR SHRED
  if ((unitStatuses.armorShred && unitStatuses.armorShred > 0) || (unitStatuses.shredTurns && unitStatuses.shredTurns > 0)) {
    const val = unitStatuses.shredValue || unitStatuses.armorShred || 1;
    badges.push({
      id: 'armorShred',
      icon: '💔',
      label: `Shred (-${val} ARM)`,
      text: `Defense reduced by ${val}.`,
      bg: 'bg-amber-950/90',
      border: 'border-orange-500/90',
      color: 'text-orange-300'
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 items-center justify-center max-w-full">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`px-1.5 py-0.5 rounded-md border text-[8px] font-mono font-bold flex items-center gap-0.5 shadow-md group relative cursor-help transition-transform hover:scale-105 ${
            badge.pulse ? 'animate-pulse' : ''
          } ${badge.bg} ${badge.border} ${badge.color}`}
        >
          <span className="text-[9px]">{badge.icon}</span>
          <span className="truncate max-w-[70px]">{badge.label}</span>

          {/* Interactive Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-50 w-44 p-2 bg-stone-950 border border-stone-700 rounded-lg text-[10px] text-stone-200 font-sans shadow-2xl pointer-events-none text-center">
            <div className="font-bold font-cinzel text-amber-300 flex items-center justify-center gap-1 mb-0.5">
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
            <p className="leading-tight text-stone-300">{badge.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
