import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Clock, 
  Play, 
  Pause, 
  Swords, 
  ShieldCheck, 
  Zap, 
  Flame,
  Hourglass,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { GamePhase } from '../types';

export interface VisualTurnTrackerProps {
  activePlayer: 'player' | 'opponent';
  turnCount: number;
  phase: GamePhase;
  turnTimeRemaining?: number;
  turnTimeLimit?: number;
  onPassTurn: () => void;
  isTimerPaused?: boolean;
  onTogglePause?: () => void;
  disabled?: boolean;
  onOpenTurnInspector?: () => void;
}

const SIX_MICRO_PHASES = [
  { key: 'DAWN', label: '1. Dawn', icon: '🌅', desc: 'Hazards & DoT Ticks' },
  { key: 'DRAW', label: '2. Refill', icon: '🎲', desc: 'Essence + Momentum Die' },
  { key: 'MAIN', label: '3. Staging', icon: '🏛️', desc: 'Summons & Spells' },
  { key: 'COMBAT', label: '4. Clash', icon: '⚔️', desc: 'Vanguard & Flanks' },
  { key: 'PRIORITY', label: '5. Chain', icon: '🌀', desc: 'Fast Stack & Brace' },
  { key: 'END', label: '6. Dusk', icon: '🌆', desc: 'Kinetic Stash' }
];

export const VisualTurnTracker: React.FC<VisualTurnTrackerProps> = ({
  activePlayer,
  turnCount,
  phase,
  turnTimeRemaining = 60,
  turnTimeLimit = 60,
  onPassTurn,
  isTimerPaused = false,
  onTogglePause,
  disabled = false,
  onOpenTurnInspector
}) => {
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const isPlayerTurn = activePlayer === 'player';
  const progressRatio = Math.max(0, Math.min(1, turnTimeRemaining / (turnTimeLimit || 60)));
  const circumference = 2 * Math.PI * 18; // radius 18
  const strokeDashoffset = circumference * (1 - progressRatio);

  const handlePassTurnClick = () => {
    if (!isPlayerTurn || disabled || isCoolingDown) return;
    soundEngine.playMicroSound('click');
    setIsCoolingDown(true);
    onPassTurn();
    setTimeout(() => setIsCoolingDown(false), 900);
  };

  return (
    <div 
      id="visual-turn-tracker-hud"
      className={`relative rounded-2xl p-2 sm:p-2.5 backdrop-blur-md transition-all duration-300 border ${
        isPlayerTurn
          ? 'bg-amber-950/40 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.35)] ring-2 ring-amber-400/40'
          : 'bg-purple-950/40 border-purple-500/70 shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-2 ring-purple-500/40'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Active Turn Identity with Pulsating Beacon */}
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-lg relative ${
            isPlayerTurn
              ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
              : 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
          }`}>
            {isPlayerTurn ? (
              <Swords size={18} className="animate-pulse" />
            ) : (
              <Hourglass size={18} className="animate-spin text-purple-300" style={{ animationDuration: '4s' }} />
            )}
            
            {/* Pulsating Ping Dot */}
            <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
              isPlayerTurn ? 'bg-amber-400' : 'bg-purple-400'
            }`}>
              <span className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                isPlayerTurn ? 'bg-amber-300' : 'bg-purple-300'
              }`} />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-cinzel font-black text-xs sm:text-sm tracking-wider uppercase ${
                isPlayerTurn ? 'text-amber-200' : 'text-purple-200'
              }`}>
                {isPlayerTurn ? 'YOUR TURN' : "OPPONENT'S TURN"}
              </span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase border ${
                isPlayerTurn 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
              }`}>
                {isPlayerTurn ? 'Priority Active' : 'AI Thinking'}
              </span>
            </div>
            
            <p className="text-[10px] font-mono text-stone-400 flex items-center gap-2 mt-0.5">
              <span>Turn #{turnCount}</span>
              <span>•</span>
              <span className="text-stone-300 font-semibold">{phase} PHASE</span>
              {onOpenTurnInspector && (
                <button
                  type="button"
                  onClick={onOpenTurnInspector}
                  className="text-[10px] text-amber-400 hover:text-amber-300 underline flex items-center gap-0.5"
                >
                  <HelpCircle size={10} />
                  <span>Inspect Rules</span>
                </button>
              )}
            </p>
          </div>
        </div>

        {/* Center: 6-Stage Micro-Phase Stepper Ribbon */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-950/90 border border-stone-800/90 text-[9px] font-cinzel">
          {SIX_MICRO_PHASES.map((p) => {
            const isCurrentPhase = (phase === 'DRAW' && p.key === 'DRAW') || phase === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={onOpenTurnInspector}
                title={`${p.label}: ${p.desc} (Click to inspect)`}
                className={`px-2 py-0.5 rounded-md font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isCurrentPhase
                    ? isPlayerTurn
                      ? 'bg-amber-500 text-stone-950 shadow-[0_0_10px_rgba(245,158,11,0.6)] font-black scale-105 ring-1 ring-amber-300'
                      : 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)] font-black scale-105'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Cooldown Timer & Tactical "Pass Turn" Action Button */}
        <div className="flex items-center gap-2">
          
          {/* Turn Timer Clock Widget with Pause Toggle */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md transition-all ${
            turnTimeRemaining <= 15
              ? 'bg-red-950/90 border-red-500 text-red-200 shadow-[0_0_12px_rgba(239,68,68,0.5)] animate-pulse'
              : turnTimeRemaining <= 30
                ? 'bg-amber-950/70 border-amber-500/50 text-amber-200'
                : 'bg-stone-900/80 border-stone-700 text-stone-300'
          }`}>
            <Clock size={13} className={turnTimeRemaining <= 15 ? 'text-red-400 animate-spin' : 'text-amber-400'} />
            <span className="font-mono font-bold text-xs tracking-wider">
              {turnTimeRemaining}s
            </span>
            {onTogglePause && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePause();
                }}
                className="p-0.5 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
                title={isTimerPaused ? 'Resume Turn Timer' : 'Pause Turn Timer'}
              >
                {isTimerPaused ? <Play size={10} className="text-emerald-400" /> : <Pause size={10} />}
              </button>
            )}
          </div>

          {/* Tactical 'Pass Turn' Button with Circular Cooldown Animation */}
          {isPlayerTurn ? (
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              id="pass-turn-btn"
              onClick={handlePassTurnClick}
              disabled={disabled || isCoolingDown}
              className="relative group overflow-hidden pl-3.5 pr-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-stone-950 border border-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.5)] font-cinzel font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition"
            >
              {/* Radial SVG Cooldown Gauge */}
              <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 -rotate-90" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    className="stroke-black/25 fill-none"
                    strokeWidth="4"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    className="stroke-stone-950 fill-none transition-all duration-1000"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-stone-950 animate-ping" />
              </div>

              <span>Pass Turn</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />

              {/* Animated Cooldown Shimmer on click */}
              {isCoolingDown && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-white/40 pointer-events-none"
                />
              )}
            </motion.button>
          ) : (
            <div className="px-3.5 py-2 rounded-xl bg-stone-900/90 border border-purple-500/40 text-purple-300 flex items-center gap-2 text-xs font-cinzel font-bold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
              <span>Enemy Resolving...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
