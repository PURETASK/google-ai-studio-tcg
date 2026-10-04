import React, { useState } from 'react';
import { HazardCard, Domain } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Flame, 
  ShieldAlert, 
  Timer, 
  Eye, 
  Compass, 
  Wind, 
  Zap, 
  RotateCw, 
  Sparkles, 
  ChevronRight, 
  Shield, 
  AlertTriangle,
  Info,
  CheckCircle2,
  Swords
} from 'lucide-react';

interface WorldStateHazardEngineProps {
  activeHazard: HazardCard | null;
  horizonHazard: HazardCard | null;
  turnsUntilHorizon: number;
  hazardDeckCount: number;
  playerMomentum: number;
  isPlayerBraced: boolean;
  onBrace: () => void;
  onAdvanceHorizon: () => void;
  onInspectHazard: (hazard: HazardCard) => void;
  compact?: boolean;
}

export const WorldStateHazardEngine: React.FC<WorldStateHazardEngineProps> = ({
  activeHazard,
  horizonHazard,
  turnsUntilHorizon,
  hazardDeckCount,
  playerMomentum,
  isPlayerBraced,
  onBrace,
  onAdvanceHorizon,
  onInspectHazard,
  compact = false
}) => {
  const [activeTab, setActiveTab] = useState<'current' | 'horizon' | 'rules'>('current');

  const getTierBadge = (tier: string, isBraced: boolean) => {
    let effectiveTier = tier;
    if (isBraced) {
      if (tier === 'Tier III') effectiveTier = 'Tier II (Braced)';
      else if (tier === 'Tier II') effectiveTier = 'Tier I (Braced)';
      else if (tier === 'Tier I') effectiveTier = 'Mitigated';
    }

    const colorClass = effectiveTier.includes('Tier III') 
      ? 'bg-red-950 text-red-400 border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
      : effectiveTier.includes('Tier II')
      ? 'bg-orange-950 text-orange-400 border-orange-500/60 shadow-[0_0_10px_rgba(249,115,22,0.3)]'
      : 'bg-amber-950 text-amber-400 border-amber-500/60 shadow-[0_0_10px_rgba(234,179,8,0.3)]';

    return (
      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase border ${colorClass}`}>
        {effectiveTier}
      </span>
    );
  };

  return (
    <div className={`rounded-2xl bg-stone-950/95 border border-amber-500/40 shadow-2xl overflow-hidden backdrop-blur-md transition-all ${
      compact ? 'p-3' : 'p-4 sm:p-5'
    }`}>
      {/* Engine Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-600/30 border border-amber-500/50 flex items-center justify-center text-base shadow-inner">
            <Compass className="text-amber-400" size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-cinzel font-black text-xs sm:text-sm text-amber-200 uppercase tracking-wider">
                World State & Hazard Horizon Engine
              </h3>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300">
                Shared 30-Card World Deck
              </span>
            </div>
            <p className="text-[10px] font-mono text-stone-400">
              Deterministic 1-Turn Horizon Telegraphing • Tactical Brace Command
            </p>
          </div>
        </div>

        {/* Tactical Brace Action Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (playerMomentum >= 1 && !isPlayerBraced) {
                soundEngine.playCombatClash('shield');
                onBrace();
              }
            }}
            disabled={playerMomentum < 1 || isPlayerBraced}
            className={`px-3 py-1.5 rounded-xl font-cinzel text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
              isPlayerBraced
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : playerMomentum >= 1
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 hover:scale-105 cursor-pointer font-black'
                : 'bg-stone-900 text-stone-400 border border-stone-800 cursor-not-allowed'
            }`}
            title="Spend 1 Momentum to reduce incoming Hazard Severity by 1 Tier"
          >
            <Shield size={14} className={isPlayerBraced ? 'text-emerald-400 animate-pulse' : 'text-stone-950'} />
            <span>{isPlayerBraced ? 'Board Braced (-1 Tier)' : 'Brace (-1 Momentum)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('select');
              onAdvanceHorizon();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-amber-300 hover:text-amber-200 text-xs font-cinzel flex items-center gap-1 transition"
            title="Advance Horizon to next Dawn"
          >
            <RotateCw size={13} />
            <span className="hidden sm:inline">Advance Dawn</span>
          </button>
        </div>
      </div>

      {/* Dual Horizon & Active Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        
        {/* Active Planar Hazard Slot */}
        <div 
          onClick={() => activeHazard && onInspectHazard(activeHazard)}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            activeHazard
              ? `bg-gradient-to-br ${activeHazard.bgGradient} border-amber-500/60 shadow-lg hover:border-amber-400`
              : 'bg-stone-950/80 border-stone-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-cinzel font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
              <Flame size={12} className="text-orange-400" />
              Active Battlefield Hazard
            </span>
            {activeHazard && getTierBadge(activeHazard.tier, isPlayerBraced)}
          </div>

          {activeHazard ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeHazard.icon}</span>
                <div>
                  <h4 className="font-cinzel font-black text-sm text-stone-100">
                    {activeHazard.name}
                  </h4>
                  <span className="text-[10px] font-mono text-stone-300">
                    {activeHazard.subtitle}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-200/90 leading-relaxed pt-1">
                {activeHazard.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono">
                <span className="text-amber-300">
                  Target: {activeHazard.buffTarget?.toUpperCase() || 'ALL UNITS'}
                </span>
                <span className="text-stone-300 flex items-center gap-1">
                  <Timer size={11} className="text-amber-400" />
                  Ticks each Dawn
                </span>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-stone-400 italic">
              No cataclysm currently ravaging the battlefield.
            </div>
          )}
        </div>

        {/* The Horizon Slot: Preview 1 Turn in Advance */}
        <div 
          onClick={() => horizonHazard && onInspectHazard(horizonHazard)}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            horizonHazard
              ? 'bg-stone-950/90 border-sky-500/50 shadow-lg hover:border-sky-400'
              : 'bg-stone-950/80 border-stone-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-cinzel font-black uppercase text-sky-400 tracking-wider flex items-center gap-1">
              <Eye size={12} className="text-sky-400" />
              Horizon Slot (Upcoming Next Turn)
            </span>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-500/40">
              T-1 Dawn Warning
            </span>
          </div>

          {horizonHazard ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{horizonHazard.icon}</span>
                <div>
                  <h4 className="font-cinzel font-black text-sm text-sky-100">
                    {horizonHazard.name}
                  </h4>
                  <span className="text-[10px] font-mono text-stone-300">
                    {horizonHazard.domain} Domain • {horizonHazard.tier}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed pt-1">
                {horizonHazard.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-[10px] font-mono text-stone-400">
                <span className="text-sky-400 flex items-center gap-1">
                  <AlertTriangle size={11} />
                  Impact in 1 Turn
                </span>
                <span className="text-stone-300">
                  Brace available before impact
                </span>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-stone-400 italic">
              Horizon clear. No imminent atmospheric storms detected.
            </div>
          )}
        </div>

      </div>

      {/* World Deck Status Footer */}
      <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-stone-400">
        <div className="flex items-center gap-3">
          <span>World Deck: <strong className="text-amber-400">{hazardDeckCount}</strong> cards left</span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={12} />
            Deterministic Weather Cycle
          </span>
        </div>
        <span className="text-stone-300 text-[10px] italic">
          Click any hazard above to inspect complete planar breakdown
        </span>
      </div>
    </div>
  );
};
