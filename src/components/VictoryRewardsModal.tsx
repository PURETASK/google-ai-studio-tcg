import React from 'react';
import { Domain } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Trophy, 
  Sparkles, 
  Coins, 
  Flame, 
  Star, 
  ArrowRight, 
  RotateCcw, 
  ShoppingBag, 
  Layers, 
  ShieldCheck, 
  Award,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VictoryRewardsModalProps {
  isOpen: boolean;
  isVictory: boolean;
  onClose: () => void;
  onGoToVault: () => void;
  onRematch: () => void;
  rewards: {
    shardsGained: number;
    dustGained: number;
    xpGained: number;
    isLevelUp: boolean;
    firstWinBonus: boolean;
    streakBonus: number;
  };
  stats: {
    turns: number;
    damageDealt: number;
    damageTaken: number;
    unitsSlain: number;
    spellsCast: number;
  };
  playerDomain?: Domain;
}

export const VictoryRewardsModal: React.FC<VictoryRewardsModalProps> = ({
  isOpen,
  isVictory,
  onClose,
  onGoToVault,
  onRematch,
  rewards,
  stats,
  playerDomain = 'Radiance'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-xl w-full bg-stone-950 border-2 border-amber-500/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-100 relative">
        
        {/* Top Glow & Decorative Banner */}
        <div className={`p-6 text-center relative overflow-hidden ${
          isVictory 
            ? 'bg-gradient-to-b from-amber-600/30 via-yellow-600/10 to-stone-950 border-b border-amber-500/30'
            : 'bg-gradient-to-b from-stone-800/40 to-stone-950 border-b border-stone-800'
        }`}>
          {/* Background particle aura */}
          <div className="absolute inset-0 foil-sheen opacity-25 pointer-events-none" />

          <div className="w-16 h-16 rounded-3xl mx-auto mb-3 flex items-center justify-center border-2 shadow-2xl bg-stone-900 border-amber-400">
            {isVictory ? (
              <Trophy size={32} className="text-yellow-400 animate-bounce" />
            ) : (
              <RotateCcw size={30} className="text-stone-400" />
            )}
          </div>

          <span className="font-cinzel text-[11px] uppercase tracking-widest text-amber-400 font-bold">
            {isVictory ? 'Arena Conquest Complete' : 'Trial Concluded'}
          </span>
          <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100 mt-1">
            {isVictory ? 'DIVINE TRIUMPH' : 'HEROIC RESILIENCE'}
          </h2>
          <p className="text-xs text-stone-300 max-w-sm mx-auto mt-1">
            {isVictory 
              ? 'Your tactical dominance has resonated across the planar leyline. Claim your Astral spoils!'
              : 'Knowledge gained through crucible. Claim your participation bounty and reforge your deck.'}
          </p>
        </div>

        {/* Currency Rewards Card */}
        <div className="p-6 space-y-4">
          <div className="text-xs font-cinzel text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Spoils & Bounties Granted</span>
            {rewards.firstWinBonus && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ⭐ First Win of the Day!
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Astral Shards */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 mb-1 border border-amber-400/40">
                <Coins size={20} />
              </div>
              <span className="font-mono font-black text-2xl text-amber-300">
                +{rewards.shardsGained}
              </span>
              <span className="font-cinzel text-[11px] text-amber-200/80 font-bold">
                Astral Shards
              </span>
            </div>

            {/* Cosmic Dust */}
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/50 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 mb-1 border border-purple-400/40">
                <Sparkles size={20} />
              </div>
              <span className="font-mono font-black text-2xl text-purple-300">
                +{rewards.dustGained}
              </span>
              <span className="font-cinzel text-[11px] text-purple-200/80 font-bold">
                Cosmic Dust
              </span>
            </div>

            {/* Mastery XP */}
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-stone-900 border border-stone-700 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center text-stone-300 mb-1 border border-stone-600">
                <Award size={20} className="text-yellow-400" />
              </div>
              <span className="font-mono font-black text-2xl text-yellow-400">
                +{rewards.xpGained}
              </span>
              <span className="font-cinzel text-[11px] text-stone-300 font-bold">
                Mastery XP
              </span>
            </div>
          </div>

          {/* Level Up Banner */}
          {rewards.isLevelUp && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-400 text-center animate-pulse">
              <span className="font-cinzel font-black text-xs text-amber-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <Zap size={14} className="text-amber-400" />
                <span>NEXUS MASTERY LEVEL UP! +100 BONUS SHARDS UNLOCKED!</span>
              </span>
            </div>
          )}

          {/* Match Performance Telemetry */}
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
            <span className="text-[10px] font-cinzel text-stone-400 uppercase font-bold tracking-wider">
              Battle Telemetry Breakdown
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-stone-950 border border-stone-800/80 text-center">
                <div className="text-stone-400 text-[10px]">Turns</div>
                <div className="font-bold text-stone-200">{stats.turns}</div>
              </div>
              <div className="p-2 rounded-lg bg-stone-950 border border-stone-800/80 text-center">
                <div className="text-stone-400 text-[10px]">DMG Dealt</div>
                <div className="font-bold text-red-400">{stats.damageDealt}</div>
              </div>
              <div className="p-2 rounded-lg bg-stone-950 border border-stone-800/80 text-center">
                <div className="text-stone-400 text-[10px]">Units Slain</div>
                <div className="font-bold text-purple-400">{stats.unitsSlain}</div>
              </div>
              <div className="p-2 rounded-lg bg-stone-950 border border-stone-800/80 text-center">
                <div className="text-stone-400 text-[10px]">Spells Cast</div>
                <div className="font-bold text-blue-400">{stats.spellsCast}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('click');
              onRematch();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
          >
            <RotateCcw size={15} />
            <span>Rematch Arena</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('click');
              onGoToVault();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition hover:scale-105"
          >
            <ShoppingBag size={16} />
            <span>Open Booster Vault</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
