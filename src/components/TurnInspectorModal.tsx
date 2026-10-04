import React, { useState } from 'react';
import { 
  Clock, 
  RotateCcw, 
  Zap, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ArrowRight,
  Shield,
  Swords,
  Dices,
  Flame,
  Info
} from 'lucide-react';
import { GamePhase } from '../types';
import { TURN_PHASES_DATA } from './PhaseActionChecklistBanner';

interface TurnInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  turnCount: number;
  currentPhase: GamePhase;
  activePlayer: 'player' | 'opponent';
  playerEssence: number;
  playerMaxEssence: number;
  playerMomentum: number;
  kineticStash: number;
  lastDiceRoll?: number | null;
  activeHazardName?: string;
  queuedTriggers?: string[];
}

export const TurnInspectorModal: React.FC<TurnInspectorModalProps> = ({
  isOpen,
  onClose,
  turnCount,
  currentPhase,
  activePlayer,
  playerEssence,
  playerMaxEssence,
  playerMomentum,
  kineticStash,
  lastDiceRoll,
  activeHazardName = 'Solar Flare (Active)',
  queuedTriggers = [
    'Dawn Hazard Pulse: Deal 1 AOE fire tick to all frontline creatures',
    'Dawn Regeneration: Primeval Treant restores +2 HP at start of next round',
    'Dusk Stash: Unspent momentum converted into +2 Kinetic Stash battery'
  ]
}) => {
  const [selectedPhaseKey, setSelectedPhaseKey] = useState<string>(
    currentPhase === 'DRAW' ? 'REFILL' : currentPhase
  );

  if (!isOpen) return null;

  const PHASES_LIST = ['DAWN', 'REFILL', 'MAIN', 'COMBAT', 'PRIORITY', 'END'];
  const activePhaseData = TURN_PHASES_DATA[selectedPhaseKey] || TURN_PHASES_DATA.MAIN;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="max-w-4xl w-full bg-stone-900 border-2 border-amber-500/70 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-md">
              <Clock size={20} />
            </div>
            <div>
              <h2 className="font-cinzel font-black text-lg sm:text-xl text-amber-100 flex items-center gap-2">
                <span>TACTICAL TURN TIMING & STAGE INSPECTOR</span>
              </h2>
              <p className="text-xs text-stone-400 font-mono">
                Current Turn #{turnCount} • {activePlayer === 'player' ? 'Your Active Turn' : "Opponent's Turn"} • Phase: {currentPhase}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Resource State Meter Strip */}
        <div className="px-6 py-3 bg-stone-950 border-b border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-500/30">
            <span className="text-[10px] text-blue-300 block uppercase">Essence Pool</span>
            <span className="text-sm font-bold text-blue-200">{playerEssence} / {playerMaxEssence}</span>
          </div>

          <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] text-amber-300 block uppercase">Momentum Active</span>
            <span className="text-sm font-bold text-amber-200">
              {playerMomentum} {lastDiceRoll ? `(Die: ${lastDiceRoll})` : ''}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30">
            <span className="text-[10px] text-purple-300 block uppercase">Kinetic Stash</span>
            <span className="text-sm font-bold text-purple-200">+{kineticStash} Reserve</span>
          </div>

          <div className="p-2 rounded-xl bg-orange-950/40 border border-orange-500/30">
            <span className="text-[10px] text-orange-300 block uppercase">Active Hazard</span>
            <span className="text-[11px] font-bold text-orange-200 truncate block">{activeHazardName}</span>
          </div>
        </div>

        {/* 6-Phase Interactive Stepper Ribbon */}
        <div className="px-6 py-3 bg-stone-900/90 border-b border-stone-800">
          <span className="text-[10px] font-cinzel uppercase tracking-widest text-stone-400 block mb-2 font-bold">
            Select Any Stage to Inspect Exact Rules & Resolution Logic:
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PHASES_LIST.map((pKey, idx) => {
              const pData = TURN_PHASES_DATA[pKey];
              const isSelected = selectedPhaseKey === pKey;
              const isCurrent = (currentPhase === 'DRAW' && pKey === 'REFILL') || currentPhase === pKey;

              return (
                <button
                  key={pKey}
                  type="button"
                  onClick={() => setSelectedPhaseKey(pKey)}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 relative ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-lg font-bold'
                      : 'bg-stone-950/80 text-stone-300 hover:text-white border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                  )}
                  <span className="text-base">{pData.icon}</span>
                  <span className="text-[10px] font-cinzel font-black uppercase tracking-wider block">
                    {pKey}
                  </span>
                  <span className={`text-[9px] font-mono px-1 rounded ${
                    isSelected ? 'bg-black/25 text-black font-bold' : 'text-stone-500'
                  }`}>
                    Step {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Deep Dive Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/40 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl shadow">
                {activePhaseData.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                  Stage {activePhaseData.stepNumber} of 6 • {activePhaseData.badge}
                </span>
                <h3 className="font-cinzel font-black text-base sm:text-lg text-amber-100">
                  {activePhaseData.name}
                </h3>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 leading-relaxed">
              <strong className="text-amber-300">Phase Overview:</strong> {activePhaseData.criticalRule}
            </div>

            {/* Allowed vs Restricted Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                <span className="font-cinzel font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Permitted Actions</span>
                </span>
                <div className="space-y-1.5">
                  {activePhaseData.allowedActions.map((act, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-emerald-100/90 leading-relaxed text-[11px]">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2">
                <span className="font-cinzel font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                  <AlertTriangle size={14} className="text-rose-400" />
                  <span>Timing Restrictions</span>
                </span>
                <div className="space-y-1.5">
                  {activePhaseData.restrictedActions.map((res, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-rose-100/90 leading-relaxed text-[11px]">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-center gap-2 text-xs text-amber-200">
              <Sparkles size={15} className="text-amber-400 shrink-0" />
              <span><strong>Tactical Masterclass Tip:</strong> {activePhaseData.quickTip}</span>
            </div>
          </div>

          {/* Active Triggers Queue for This Match */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
            <span className="font-cinzel font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} className="text-amber-400" />
              <span>Upcoming Scheduled Triggers & Effects</span>
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {queuedTriggers.map((trig, i) => (
                <div key={i} className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 flex items-center gap-2">
                  <span className="text-amber-400">⚡</span>
                  <span>{trig}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-400 font-mono">
            Nexus Tournament System Timing Engine v2.5
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs uppercase tracking-wider shadow transition"
          >
            Return to Arena
          </button>
        </div>
      </div>
    </div>
  );
};
