import React from 'react';
import { PriorityStackItem } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Layers, 
  Zap, 
  ArrowDown, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  X, 
  AlertCircle,
  Timer,
  Swords
} from 'lucide-react';

interface PriorityStackVisualizerProps {
  stackItems: PriorityStackItem[];
  currentPriority: 'player' | 'opponent';
  playerMomentum: number;
  onPassPriority: () => void;
  onReact: (actionName: string, momentumCost: number) => void;
  isResolving: boolean;
}

export const PriorityStackVisualizer: React.FC<PriorityStackVisualizerProps> = ({
  stackItems,
  currentPriority,
  playerMomentum,
  onPassPriority,
  onReact,
  isResolving
}) => {
  if (stackItems.length === 0) return null;

  return (
    <div className="p-4 rounded-2xl bg-stone-950/95 border-2 border-amber-500/50 shadow-2xl backdrop-blur-md space-y-3 z-30 transition-all animate-in fade-in zoom-in-95 duration-200">
      
      {/* Priority Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Layers size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-cinzel font-black text-xs text-amber-200 uppercase tracking-wider">
                The Aether Chain (Priority Stack)
              </h4>
              <span className="px-2 py-0.2 rounded-full text-[9px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                LIFO {stackItems.length} Deep
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              Rule 701: Last in, first out • Consecutive passes resolve top item
            </span>
          </div>
        </div>

        {/* Priority Holder Badge */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-[10px] font-mono text-stone-400 uppercase">Active Priority:</span>
          <span className={`px-2.5 py-1 rounded-xl text-xs font-cinzel font-bold border ${
            currentPriority === 'player'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.4)] animate-pulse'
              : 'bg-stone-900 text-stone-400 border-stone-700'
          }`}>
            {currentPriority === 'player' ? '★ YOUR PRIORITY' : '🤖 OPPONENT THINKING'}
          </span>
        </div>
      </div>

      {/* Stack Items List (Top of stack resolves first) */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
        {stackItems.map((item, idx) => {
          const isTop = idx === 0;
          return (
            <div
              key={item.id}
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                isTop
                  ? 'bg-gradient-to-r from-amber-950/80 to-stone-900 border-amber-400/80 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-stone-900/60 border-stone-800 opacity-75'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[9px] font-mono text-stone-500">#{stackItems.length - idx}</span>
                  {isTop && <span className="text-xs">⚡</span>}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel font-bold text-xs text-stone-100">
                      {item.sourceCard.name}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase ${
                      item.controller === 'player' ? 'bg-blue-950 text-blue-300' : 'bg-red-950 text-red-300'
                    }`}>
                      {item.controller === 'player' ? 'You' : 'Opponent'}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-stone-800 text-amber-300">
                      {item.actionType}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-snug mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                {isTop && (
                  <span className="text-[9px] font-mono font-bold text-amber-400 uppercase block animate-pulse">
                    Resolves Next
                  </span>
                )}
                <span className="text-[10px] font-mono text-stone-400">
                  {item.speed} Speed
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Priority Action Control Bar */}
      {currentPriority === 'player' && (
        <div className="pt-2 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2">
          
          {/* Fast Reaction Options */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              disabled={playerMomentum < 1 || isResolving}
              onClick={() => {
                soundEngine.playMicroSound('shimmer');
                onReact('Eye of the Maelstrom (+2 Momentum Tax)', 1);
              }}
              className="px-2.5 py-1 rounded-lg bg-sky-950 hover:bg-sky-900 border border-sky-500/40 text-sky-300 text-[11px] font-cinzel font-bold disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Spend 1 Momentum to tax incoming spell"
            >
              ⚡ Tax (+2 Cost) [1 Mom]
            </button>

            <button
              type="button"
              disabled={playerMomentum < 1 || isResolving}
              onClick={() => {
                soundEngine.playCombatClash('shield');
                onReact('Aegis Kinetic Ward (Absorb 2 Damage)', 1);
              }}
              className="px-2.5 py-1 rounded-lg bg-yellow-950 hover:bg-yellow-900 border border-yellow-500/40 text-yellow-300 text-[11px] font-cinzel font-bold disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Spend 1 Momentum to shield against incoming attack"
            >
              🛡️ Kinetic Ward [1 Mom]
            </button>
          </div>

          {/* Pass Priority Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('select');
              onPassPriority();
            }}
            disabled={isResolving}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-cinzel font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all hover:scale-105"
          >
            <Check size={14} />
            <span>Pass Priority (Resolve)</span>
          </button>
        </div>
      )}

      {currentPriority === 'opponent' && (
        <div className="text-center py-1 text-xs text-amber-400/90 font-mono italic animate-pulse">
          Opponent is considering reaction window responses...
        </div>
      )}

    </div>
  );
};
