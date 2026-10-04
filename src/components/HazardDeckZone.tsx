import React from 'react';
import { HazardCard } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Flame, 
  Sparkles, 
  AlertTriangle, 
  Layers, 
  Timer, 
  Info, 
  Zap, 
  ShieldAlert, 
  Shield,
  Swords, 
  Radio, 
  RotateCw,
  Eye
} from 'lucide-react';

interface HazardDeckZoneProps {
  activeHazard: HazardCard | null;
  horizonHazard?: HazardCard | null;
  hazardDeckCount: number;
  roundsRemaining: number;
  playerMomentum?: number;
  isPlayerBraced?: boolean;
  onBrace?: () => void;
  onDrawHazard: () => void;
  canDraw: boolean;
  onInspectHazard?: (hazard: HazardCard) => void;
}

export const HazardDeckZone: React.FC<HazardDeckZoneProps> = ({
  activeHazard,
  horizonHazard,
  hazardDeckCount,
  roundsRemaining,
  playerMomentum = 0,
  isPlayerBraced = false,
  onBrace,
  onDrawHazard,
  canDraw,
  onInspectHazard
}) => {
  return (
    <div className="p-3.5 rounded-2xl bg-stone-950/90 border border-orange-500/50 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4 relative overflow-hidden backdrop-blur-md">
      
      {/* Background ambient particle sheen */}
      <div className="absolute inset-0 foil-sheen opacity-15 pointer-events-none" />

      {/* Left: Hazard Deck Stack & Trigger Controls */}
      <div className="flex items-center gap-3.5 z-10 w-full lg:w-auto justify-between lg:justify-start">
        
        {/* Facedown Hazard Deck Pile */}
        <div 
          onClick={() => {
            if (canDraw) {
              soundEngine.playMicroSound('select');
              onDrawHazard();
            }
          }}
          className={`relative w-20 h-28 rounded-xl bg-gradient-to-br from-red-950 via-stone-900 to-amber-950 border-2 border-orange-500/70 shadow-lg flex flex-col items-center justify-center cursor-pointer transition duration-300 ${
            canDraw ? 'hover:scale-105 hover:border-orange-400 ring-2 ring-orange-500/30 group' : 'opacity-85'
          }`}
          title={canDraw ? "Click to trigger / draw a new Planar Hazard Card" : "Shared 30-Card World Hazard Deck"}
        >
          <div className="w-10 h-10 rounded-full border border-orange-400/50 bg-orange-950/60 flex items-center justify-center text-lg shadow-inner group-hover:animate-pulse">
            🌋
          </div>
          <span className="font-cinzel text-[9px] font-black text-orange-300 uppercase tracking-wider mt-1.5 text-center">
            World Deck
          </span>
          <span className="text-[10px] font-mono font-bold text-stone-200">
            {hazardDeckCount} Cards
          </span>
        </div>

        {/* Draw Hazard & Brace Action Triggers */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-orange-400 font-bold">
              World State Engine
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundEngine.playMicroSound('select');
                onDrawHazard();
              }}
              disabled={!canDraw}
              className={`px-3 py-1.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow transition ${
                canDraw 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-black cursor-pointer hover:scale-105' 
                  : 'bg-stone-800 text-stone-300 cursor-not-allowed border border-stone-700'
              }`}
            >
              <RotateCw size={13} />
              <span>Draw Hazard</span>
            </button>

            {onBrace && (
              <button
                type="button"
                onClick={() => {
                  if (playerMomentum >= 1 && !isPlayerBraced) {
                    soundEngine.playCombatClash('shield');
                    onBrace();
                  }
                }}
                disabled={playerMomentum < 1 || isPlayerBraced}
                className={`px-3 py-1.5 rounded-xl font-cinzel text-xs font-bold flex items-center gap-1.5 transition shadow ${
                  isPlayerBraced
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : playerMomentum >= 1
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 hover:scale-105 cursor-pointer font-black'
                    : 'bg-stone-900 text-stone-400 border border-stone-800 cursor-not-allowed'
                }`}
                title="Spend 1 Momentum: Reduce incoming Hazard Severity by 1 Tier"
              >
                <Shield size={13} />
                <span>{isPlayerBraced ? 'Braced (-1 Tier)' : 'Brace [1 Mom]'}</span>
              </button>
            )}
          </div>

          <span className="text-[9px] font-mono text-stone-300 block">
            Auto-ticks each Dawn • Horizon telegraphed 1 turn ahead
          </span>
        </div>
      </div>

      {/* Center & Right: Active Hazard + Horizon Slot */}
      <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 z-10">
        
        {/* Active Hazard Slot */}
        <div 
          onClick={() => activeHazard && onInspectHazard && onInspectHazard(activeHazard)}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            activeHazard
              ? `bg-gradient-to-r ${activeHazard.bgGradient} border-orange-500/60 shadow-lg hover:border-orange-400`
              : 'border-stone-800 bg-stone-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-cinzel font-black uppercase text-orange-400 tracking-wider flex items-center gap-1">
              <Flame size={11} className="text-orange-400" />
              Active Battlefield Hazard
            </span>
            {activeHazard && (
              <span className="px-2 py-0.2 rounded text-[9px] font-mono font-bold bg-black/40 text-orange-300 border border-orange-400/40">
                {isPlayerBraced ? `${activeHazard.tier} (Braced)` : activeHazard.tier}
              </span>
            )}
          </div>

          {activeHazard ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{activeHazard.icon}</span>
                <div>
                  <h4 className="font-cinzel font-black text-xs text-orange-100 line-clamp-1">
                    {activeHazard.name}
                  </h4>
                  <span className="text-[9px] font-mono text-stone-300">
                    {activeHazard.category}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-orange-200/90 line-clamp-2 mt-1 leading-tight">
                {activeHazard.description}
              </p>
            </div>
          ) : (
            <div className="py-3 text-center text-[11px] text-stone-400 italic">
              No cataclysm currently ravaging the board.
            </div>
          )}
        </div>

        {/* Horizon Preview Slot */}
        <div 
          onClick={() => horizonHazard && onInspectHazard && onInspectHazard(horizonHazard)}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            horizonHazard
              ? 'bg-stone-950/90 border-sky-500/50 shadow-lg hover:border-sky-400'
              : 'border-stone-800 bg-stone-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-cinzel font-black uppercase text-sky-400 tracking-wider flex items-center gap-1">
              <Eye size={11} className="text-sky-400" />
              The Horizon (Next Dawn)
            </span>
            <span className="px-2 py-0.2 rounded text-[9px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-500/40">
              T-1 Telegraph
            </span>
          </div>

          {horizonHazard ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{horizonHazard.icon}</span>
                <div>
                  <h4 className="font-cinzel font-black text-xs text-sky-100 line-clamp-1">
                    {horizonHazard.name}
                  </h4>
                  <span className="text-[9px] font-mono text-stone-300">
                    {horizonHazard.domain} • {horizonHazard.tier}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-stone-300 line-clamp-2 mt-1 leading-tight">
                {horizonHazard.description}
              </p>
            </div>
          ) : (
            <div className="py-3 text-center text-[11px] text-stone-400 italic">
              Atmosphere calm. No horizon surge forecasted.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
