import React from 'react';
import { Card } from '../types';
import { Swords, Shield, Heart, Skull, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export interface BoardUnit {
  card: Card;
  currentHp: number;
  statuses?: string[] | { [key: string]: any };
}

export interface CombatClashForecastProps {
  attackerUnit: BoardUnit;
  defenderUnit?: BoardUnit | null;
  isAttackingCommander?: boolean;
  defenderCommanderHp?: number;
  defenderCommanderShield?: number;
  onConfirmAttack?: () => void;
  onCancelAttack?: () => void;
}

export const CombatClashForecast: React.FC<CombatClashForecastProps> = ({
  attackerUnit,
  defenderUnit,
  isAttackingCommander = false,
  defenderCommanderHp = 30,
  defenderCommanderShield = 0,
  onConfirmAttack,
  onCancelAttack
}) => {
  const attackerPower = attackerUnit.card.power || 0;
  const attackerHp = attackerUnit.currentHp;
  const attackerHasPierce = attackerUnit.card.abilities?.some(a => 
    a.name.toLowerCase().includes('pierce') || a.description.toLowerCase().includes('pierce')
  ) || false;

  // Case 1: Attacking Defender Unit
  if (defenderUnit) {
    const defenderPower = defenderUnit.card.power || 0;
    const defenderHp = defenderUnit.currentHp;
    const defenderArmor = (defenderUnit.statuses && typeof defenderUnit.statuses.buffed === 'number') ? defenderUnit.statuses.buffed : 0;

    // Damage Dealt to Defender
    const effectiveDamageToDefender = Math.max(0, attackerPower - defenderArmor);
    const defenderRemainingHp = Math.max(0, defenderHp - effectiveDamageToDefender);
    const isDefenderSlayed = defenderRemainingHp === 0;

    // Retaliation Damage to Attacker
    const effectiveDamageToAttacker = defenderPower;
    const attackerRemainingHp = Math.max(0, attackerHp - effectiveDamageToAttacker);
    const isAttackerSlayed = attackerRemainingHp === 0;

    // Spillover / Pierce
    const spilloverDamage = (attackerHasPierce && effectiveDamageToDefender > defenderHp)
      ? effectiveDamageToDefender - defenderHp
      : 0;

    const isMutualDeath = isDefenderSlayed && isAttackerSlayed;

    return (
      <div className="p-3.5 rounded-2xl bg-stone-950/95 border-2 border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.4)] backdrop-blur-md space-y-3 z-40 text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <Swords size={14} className="animate-pulse" />
            </div>
            <div>
              <h4 className="font-cinzel font-black text-xs text-red-200 uppercase tracking-wider">
                Simultaneous Combat Resolution Forecast
              </h4>
              <span className="text-[10px] font-mono text-stone-400">
                Rule 502: Both combatants strike at the exact same moment
              </span>
            </div>
          </div>

          <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase border ${
            isMutualDeath 
              ? 'bg-purple-950 text-purple-300 border-purple-500/50'
              : isDefenderSlayed 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                : 'bg-amber-950 text-amber-300 border-amber-500/50'
          }`}>
            {isMutualDeath ? '💀 Mutual Slay' : isDefenderSlayed ? '⚔️ Lethal Slay' : '🛡️ Mutual Survival'}
          </span>
        </div>

        {/* Combatants Math Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          
          {/* Attacker (Left) */}
          <div className="p-2.5 rounded-xl bg-stone-900/80 border border-amber-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-cinzel font-bold text-amber-200 text-[11px] truncate">
                {attackerUnit.card.name} (Attacker)
              </span>
              <span className="text-[10px] font-mono text-amber-400">⚡ {attackerPower} PWR</span>
            </div>

            <div className="flex items-center justify-between bg-stone-950 p-1.5 rounded-lg font-mono text-[11px]">
              <span className="text-stone-400">HP Change:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-stone-300">{attackerHp}</span>
                <span className="text-red-400">-{effectiveDamageToAttacker}</span>
                <ArrowRight size={10} className="text-stone-500" />
                <span className={isAttackerSlayed ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {attackerRemainingHp} HP {isAttackerSlayed ? '💀 [Slayed]' : '✓ [Survives]'}
                </span>
              </div>
            </div>
          </div>

          {/* Defender (Right) */}
          <div className="p-2.5 rounded-xl bg-stone-900/80 border border-red-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-cinzel font-bold text-red-200 text-[11px] truncate">
                {defenderUnit.card.name} (Defender)
              </span>
              <span className="text-[10px] font-mono text-red-400">⚡ {defenderPower} PWR</span>
            </div>

            <div className="flex items-center justify-between bg-stone-950 p-1.5 rounded-lg font-mono text-[11px]">
              <span className="text-stone-400">HP Change:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-stone-300">{defenderHp}</span>
                <span className="text-red-400">-{effectiveDamageToDefender}</span>
                <ArrowRight size={10} className="text-stone-500" />
                <span className={isDefenderSlayed ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {defenderRemainingHp} HP {isDefenderSlayed ? '💀 [Slayed]' : '✓ [Survives]'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Spillover Pierce / Armor Notice */}
        {spilloverDamage > 0 && (
          <div className="p-2 rounded-xl bg-orange-950/40 border border-orange-500/50 flex items-center justify-between text-orange-200 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-orange-400" />
              <span>Pierce Spillover Damage:</span>
            </span>
            <span className="font-bold text-orange-300">
              +{spilloverDamage} direct damage to Enemy Commander Throne!
            </span>
          </div>
        )}

        {/* Action Controls if interactive */}
        {(onConfirmAttack || onCancelAttack) && (
          <div className="flex items-center justify-end gap-2 pt-1">
            {onCancelAttack && (
              <button
                type="button"
                onClick={onCancelAttack}
                className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono transition"
              >
                Cancel
              </button>
            )}
            {onConfirmAttack && (
              <button
                type="button"
                onClick={onConfirmAttack}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-cinzel font-bold text-xs shadow-lg transition flex items-center gap-1.5"
              >
                <Swords size={13} />
                <span>Confirm Strike</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Case 2: Attacking Commander Throne Direct
  if (isAttackingCommander) {
    const rawDamage = attackerPower;
    const shieldAbsorbed = Math.min(defenderCommanderShield, rawDamage);
    const damageToHp = rawDamage - shieldAbsorbed;
    const finalCommanderHp = Math.max(0, defenderCommanderHp - damageToHp);
    const isCommanderSlayed = finalCommanderHp === 0;

    return (
      <div className="p-3.5 rounded-2xl bg-stone-950/95 border-2 border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.4)] backdrop-blur-md space-y-3 z-40 text-xs">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <Swords size={14} className="animate-pulse" />
            </div>
            <div>
              <h4 className="font-cinzel font-black text-xs text-red-200 uppercase tracking-wider">
                Direct Commander Strike Forecast
              </h4>
              <span className="text-[10px] font-mono text-stone-400">
                Frontline clear • Direct hit on enemy throne
              </span>
            </div>
          </div>

          <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase border ${
            isCommanderSlayed ? 'bg-red-950 text-red-300 border-red-500 animate-pulse' : 'bg-amber-950 text-amber-300 border-amber-500'
          }`}>
            {isCommanderSlayed ? '🏆 Lethal Win Condition' : `-${damageToHp} Commander HP`}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-stone-900/80 border border-red-500/40 space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-stone-300">
            <span>Incoming Power Strike:</span>
            <span className="text-amber-300 font-bold">⚡ {rawDamage} DMG</span>
          </div>
          {shieldAbsorbed > 0 && (
            <div className="flex items-center justify-between text-blue-300">
              <span>Shield Absorb:</span>
              <span>-{shieldAbsorbed} Shield</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-1 border-t border-stone-800">
            <span className="text-stone-300">Enemy Commander HP:</span>
            <div className="flex items-center gap-1.5">
              <span>{defenderCommanderHp}</span>
              <ArrowRight size={10} className="text-stone-500" />
              <span className={isCommanderSlayed ? 'text-red-400 font-bold' : 'text-amber-400 font-bold'}>
                {finalCommanderHp} HP {isCommanderSlayed && '💀 [DEFEAT]'}
              </span>
            </div>
          </div>
        </div>

        {(onConfirmAttack || onCancelAttack) && (
          <div className="flex items-center justify-end gap-2 pt-1">
            {onCancelAttack && (
              <button
                type="button"
                onClick={onCancelAttack}
                className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono transition"
              >
                Cancel
              </button>
            )}
            {onConfirmAttack && (
              <button
                type="button"
                onClick={onConfirmAttack}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-cinzel font-bold text-xs shadow-lg transition flex items-center gap-1.5"
              >
                <Swords size={13} />
                <span>Confirm Strike</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
};
