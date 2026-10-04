import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Domain } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Trophy, 
  RotateCcw, 
  ShoppingBag, 
  Sparkles, 
  Coins, 
  Award, 
  Zap, 
  ShieldAlert, 
  Swords, 
  Heart, 
  Flame, 
  ArrowRight, 
  LayoutDashboard,
  Clock,
  Crosshair,
  ScrollText,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface EndOfMatchStats {
  turns: number;
  damageDealt: number;
  damageTaken: number;
  unitsSlain: number;
  spellsCast: number;
  unitsSummoned?: number;
  essenceSpent?: number;
  cardsDrawn?: number;
}

export interface EndOfMatchRewards {
  shardsGained: number;
  dustGained: number;
  xpGained: number;
  isLevelUp?: boolean;
  firstWinBonus?: boolean;
  streakBonus?: number;
}

export interface EndOfMatchOverlayProps {
  isOpen: boolean;
  isVictory: boolean;
  onReturnToDashboard: () => void;
  onRematch: () => void;
  onGoToVault?: () => void;
  onViewLogs?: () => void;
  stats: EndOfMatchStats;
  rewards: EndOfMatchRewards;
  playerDomain?: Domain;
  playerName?: string;
  opponentName?: string;
  environmentName?: string;
}

export const EndOfMatchOverlay: React.FC<EndOfMatchOverlayProps> = ({
  isOpen,
  isVictory,
  onReturnToDashboard,
  onRematch,
  onGoToVault,
  onViewLogs,
  stats,
  rewards,
  playerDomain = 'Radiance',
  playerName = 'Commander',
  opponentName = 'Opponent Titan',
  environmentName = 'Nexus Crucible'
}) => {
  if (!isOpen) return null;

  // Efficiency ratio calculation
  const damageRatio = stats.damageTaken > 0 
    ? (stats.damageDealt / stats.damageTaken).toFixed(1) 
    : stats.damageDealt > 0 ? 'Perfect' : '1.0';

  // Grade calculation
  const grade = isVictory 
    ? stats.damageTaken === 0 ? 'S+' : stats.damageDealt > 25 ? 'S' : 'A'
    : stats.damageDealt > 20 ? 'B+' : stats.damageDealt > 10 ? 'B' : 'C';

  return (
    <AnimatePresence>
      <div 
        id="end-of-match-overlay"
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className={`relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border-2 my-auto ${
            isVictory 
              ? 'bg-stone-950 border-amber-500/70 shadow-[0_0_50px_rgba(245,158,11,0.35)]' 
              : 'bg-stone-950 border-red-500/70 shadow-[0_0_50px_rgba(239,68,68,0.3)]'
          }`}
        >
          {/* Ambient Background Aura */}
          <div 
            className={`absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 ${
              isVictory ? 'bg-amber-400' : 'bg-red-600'
            }`} 
          />

          {/* Top Header Banner */}
          <div className={`p-6 sm:p-8 text-center relative overflow-hidden ${
            isVictory 
              ? 'bg-gradient-to-b from-amber-600/30 via-yellow-600/10 to-transparent border-b border-amber-500/30' 
              : 'bg-gradient-to-b from-red-950/50 via-red-900/10 to-transparent border-b border-red-500/30'
          }`}>
            {/* Heraldic Crest */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 350, damping: 18 }}
              className={`w-20 h-20 rounded-3xl mx-auto mb-3 flex items-center justify-center border-2 shadow-2xl relative ${
                isVictory 
                  ? 'bg-gradient-to-br from-amber-500 to-yellow-600 border-amber-300 text-stone-950' 
                  : 'bg-gradient-to-br from-red-900 to-stone-900 border-red-500 text-red-300'
              }`}
            >
              {isVictory ? (
                <Trophy size={40} className="animate-bounce" />
              ) : (
                <ShieldAlert size={40} className="animate-pulse" />
              )}
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-stone-950 border border-current font-cinzel font-black text-[11px] uppercase">
                {grade}
              </div>
            </motion.div>

            {/* Victory / Defeat Title */}
            <span className={`font-cinzel text-xs uppercase tracking-widest font-black block ${
              isVictory ? 'text-amber-400' : 'text-red-400'
            }`}>
              {isVictory ? 'Planar Conquest Achieved' : 'Crucible Concluded • Commander Fallen'}
            </span>
            <h2 className={`font-cinzel font-black text-3xl sm:text-4xl mt-1 tracking-wider ${
              isVictory 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-rose-300 to-red-400'
            }`}>
              {isVictory ? 'SOVEREIGN VICTORY' : 'HEROIC DEFEAT'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-2 leading-relaxed">
              {isVictory 
                ? `Your strategic mastery in the ${environmentName} overcame ${opponentName}. Planar spoils have been claimed!`
                : `Your commander's vitality reached zero in the crucible against ${opponentName}. Analyze your match telemetry and reforge your deck.`}
            </p>
          </div>

          {/* Main Content Body */}
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* Spoils / Rewards Strip */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-cinzel text-stone-400 uppercase tracking-wider font-bold">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Sparkles size={14} />
                  <span>Match Spoils & Rewards Granted</span>
                </span>
                {rewards.firstWinBonus && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    ⭐ Daily First Win Bonus!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* Astral Shards */}
                <div className="p-3 sm:p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-1">
                    <Coins size={17} />
                  </div>
                  <span className="font-mono font-black text-xl sm:text-2xl text-amber-300">
                    +{rewards.shardsGained}
                  </span>
                  <span className="font-cinzel text-[10px] text-amber-200/80 font-bold uppercase">
                    Astral Shards
                  </span>
                </div>

                {/* Cosmic Dust */}
                <div className="p-3 sm:p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-1">
                    <Sparkles size={17} />
                  </div>
                  <span className="font-mono font-black text-xl sm:text-2xl text-purple-300">
                    +{rewards.dustGained}
                  </span>
                  <span className="font-cinzel text-[10px] text-purple-200/80 font-bold uppercase">
                    Cosmic Dust
                  </span>
                </div>

                {/* Mastery XP */}
                <div className="p-3 sm:p-4 rounded-2xl bg-stone-900/90 border border-stone-700 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-xl bg-stone-800 text-yellow-400 flex items-center justify-center mb-1">
                    <Award size={17} />
                  </div>
                  <span className="font-mono font-black text-xl sm:text-2xl text-yellow-400">
                    +{rewards.xpGained}
                  </span>
                  <span className="font-cinzel text-[10px] text-stone-300 font-bold uppercase">
                    Mastery XP
                  </span>
                </div>
              </div>
            </div>

            {/* Match Telemetry & Combat Stat Tracking */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-cinzel text-stone-300 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-stone-200">
                  <Crosshair size={14} className="text-amber-400" />
                  <span>Comprehensive Match Telemetry</span>
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  {stats.turns} Rounds Resolved
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                {/* Damage Dealt */}
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-red-500/30 text-center">
                  <span className="text-[10px] text-stone-400 uppercase block font-cinzel">Damage Dealt</span>
                  <span className="text-lg font-bold text-red-400 font-mono">{stats.damageDealt} DMG</span>
                </div>

                {/* Damage Taken */}
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-center">
                  <span className="text-[10px] text-stone-400 uppercase block font-cinzel">Damage Taken</span>
                  <span className="text-lg font-bold text-orange-400 font-mono">{stats.damageTaken} DMG</span>
                </div>

                {/* Units Slain */}
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-purple-500/30 text-center">
                  <span className="text-[10px] text-stone-400 uppercase block font-cinzel">Units Slain</span>
                  <span className="text-lg font-bold text-purple-400 font-mono">{stats.unitsSlain} Foes</span>
                </div>

                {/* Spells Cast */}
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-cyan-500/30 text-center">
                  <span className="text-[10px] text-stone-400 uppercase block font-cinzel">Spells Cast</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono">{stats.spellsCast} Spells</span>
                </div>
              </div>

              {/* Secondary Telemetry Strip */}
              <div className="pt-2 border-t border-stone-800/80 grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-stone-400">
                <div>
                  <span className="text-stone-500 text-[10px] block font-cinzel">EFFICIENCY RATIO</span>
                  <span className="text-stone-200 font-bold">{damageRatio}x</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block font-cinzel">ENVIRONMENT</span>
                  <span className="text-stone-200 font-bold truncate block">{environmentName}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block font-cinzel">COMBAT RESULT</span>
                  <span className={`font-bold ${isVictory ? 'text-amber-400' : 'text-red-400'}`}>
                    {isVictory ? 'Conquest' : 'Defeated'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Navigation Footer with Primary "Return to Dashboard" Button */}
          <div className="p-5 sm:p-6 bg-stone-900/90 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Return to Dashboard Button (Requested Primary Action) */}
            <button
              type="button"
              id="endmatch-return-dashboard-btn"
              onClick={() => {
                soundEngine.playMicroSound('select');
                onReturnToDashboard();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-stone-700 shadow-lg transition hover:scale-102 active:scale-98"
            >
              <LayoutDashboard size={16} className="text-amber-400" />
              <span>Return to Dashboard</span>
            </button>

            {/* Right Action Group: Rematch & Vault */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                id="endmatch-rematch-btn"
                onClick={() => {
                  soundEngine.playMicroSound('click');
                  onRematch();
                }}
                className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-stone-950 hover:bg-stone-800 text-stone-200 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-stone-700 transition"
              >
                <RotateCcw size={15} />
                <span>Rematch</span>
              </button>

              {onGoToVault && (
                <button
                  type="button"
                  id="endmatch-vault-btn"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    onGoToVault();
                  }}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-cinzel font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)] transition hover:scale-102 active:scale-98"
                >
                  <ShoppingBag size={15} />
                  <span>Booster Vault</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
