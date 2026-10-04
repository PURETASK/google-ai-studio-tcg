import React from 'react';
import { PlayerState, MatchStats, ArenaEnvironment } from '../types';
import { 
  BarChart3, 
  Activity, 
  Shield, 
  Sword, 
  Zap, 
  Flame, 
  Heart, 
  Trophy, 
  Percent, 
  Layers, 
  Sparkles,
  X
} from 'lucide-react';

interface BattleStatsHUDProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerState;
  opponent: PlayerState;
  matchStats: MatchStats;
  turnCount: number;
  environment: ArenaEnvironment;
}

export const BattleStatsHUD: React.FC<BattleStatsHUDProps> = ({
  isOpen,
  onClose,
  player,
  opponent,
  matchStats,
  turnCount,
  environment
}) => {
  if (!isOpen) return null;

  // Calculate Board Total Attack Power
  const playerBoardAtk = (player.champion?.currentPower || 0) + 
    (player.weapon?.currentPower || 0) + 
    player.frontline.reduce((acc, u) => acc + (u?.currentPower || 0), 0);

  const opponentBoardAtk = (opponent.champion?.currentPower || 0) + 
    (opponent.weapon?.currentPower || 0) + 
    opponent.frontline.reduce((acc, u) => acc + (u?.currentPower || 0), 0);

  const totalBoardAtk = playerBoardAtk + opponentBoardAtk || 1;
  const playerDominancePct = Math.round((playerBoardAtk / totalBoardAtk) * 100);
  const opponentDominancePct = 100 - playerDominancePct;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-2xl w-full bg-stone-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-md">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="font-cinzel font-black text-lg text-amber-100 flex items-center gap-2">
                <span>TACTICAL TELEMETRY & MATCH STATS</span>
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                Live Match Analytics • Turn {turnCount} • {environment.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Board Dominance Meter */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-cinzel font-bold">
              <span className="text-amber-300 flex items-center gap-1.5">
                <Sword size={14} />
                <span>Your Board Power ({playerBoardAtk} ATK • {playerDominancePct}%)</span>
              </span>
              <span className="text-purple-300 flex items-center gap-1.5">
                <span>Opponent Power ({opponentBoardAtk} ATK • {opponentDominancePct}%)</span>
                <Shield size={14} />
              </span>
            </div>

            <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden flex border border-stone-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400 transition-all duration-500"
                style={{ width: `${playerDominancePct}%` }}
              />
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500"
                style={{ width: `${opponentDominancePct}%` }}
              />
            </div>
          </div>

          {/* Core Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] font-cinzel text-stone-400 uppercase block">Total DMG Dealt</span>
              <span className="font-mono font-bold text-lg text-red-400">
                {matchStats.damageDealtByPlayer} 💥
              </span>
              <span className="text-[10px] font-mono text-stone-400 block">Inflicted on Rival</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] font-cinzel text-stone-400 uppercase block">Total DMG Taken</span>
              <span className="font-mono font-bold text-lg text-orange-400">
                {matchStats.damageTakenByPlayer} 🩸
              </span>
              <span className="text-[10px] font-mono text-stone-400 block">Sustained by You</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] font-cinzel text-stone-400 uppercase block">Spells Cast</span>
              <span className="font-mono font-bold text-lg text-blue-400">
                {matchStats.spellsCastPlayer} ✨
              </span>
              <span className="text-[10px] font-mono text-stone-400 block">Incantations Run</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] font-cinzel text-stone-400 uppercase block">Units Slain</span>
              <span className="font-mono font-bold text-lg text-purple-400">
                {matchStats.unitsSlainOpponent} 💀
              </span>
              <span className="text-[10px] font-mono text-stone-400 block">Enemy Defeats</span>
            </div>
          </div>

          {/* Comparative State Breakdown */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <span className="font-cinzel text-xs text-amber-300 uppercase tracking-wider block font-bold">
              Zone & Resource Comparison
            </span>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900">
                <span className="text-amber-200">❤️ Health / Shield</span>
                <span className="text-stone-300 font-bold">
                  {player.health} (+{player.shield} 🛡️) <span className="text-stone-400">vs</span> {opponent.health} (+{opponent.shield} 🛡️)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900">
                <span className="text-amber-200">⚡ Essence Pool</span>
                <span className="text-stone-300 font-bold">
                  {player.essence}/{player.maxEssence} <span className="text-stone-400">vs</span> {opponent.essence}/{opponent.maxEssence}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900">
                <span className="text-amber-200">🎴 Hand Reserve</span>
                <span className="text-stone-300 font-bold">
                  {player.hand.length} Cards <span className="text-stone-400">vs</span> {opponent.hand.length} Cards
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900">
                <span className="text-amber-200">📚 Deck Remaining</span>
                <span className="text-stone-300 font-bold">
                  {player.deck.length} Cards <span className="text-stone-400">vs</span> {opponent.deck.length} Cards
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900">
                <span className="text-amber-200">🪦 Boneyard (Graveyard)</span>
                <span className="text-stone-300 font-bold">
                  {player.graveyard.length} Expended <span className="text-stone-400">vs</span> {opponent.graveyard.length} Expended
                </span>
              </div>
            </div>
          </div>

          {/* Active Arena Environmental Weather */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 flex items-start gap-3">
            <span className="text-2xl">{environment.icon}</span>
            <div>
              <span className="text-[10px] font-cinzel text-amber-400 uppercase tracking-widest block font-bold">
                Active Biome Hazard: {environment.name}
              </span>
              <h4 className="font-cinzel font-bold text-sm text-stone-100">
                {environment.hazardEffectName}
              </h4>
              <p className="text-xs text-stone-300 mt-0.5">
                {environment.hazardEffectDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs uppercase tracking-wider"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
