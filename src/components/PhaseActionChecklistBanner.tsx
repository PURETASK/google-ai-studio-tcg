import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Zap, 
  Swords, 
  Shield, 
  RotateCcw, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { GamePhase } from '../types';

export interface PhaseInfo {
  phase: string;
  stepNumber: number;
  totalSteps: number;
  name: string;
  badge: string;
  icon: string;
  color: string;
  allowedActions: string[];
  restrictedActions: string[];
  criticalRule: string;
  quickTip: string;
}

export const TURN_PHASES_DATA: Record<string, PhaseInfo> = {
  DAWN: {
    phase: 'DAWN',
    stepNumber: 1,
    totalSteps: 6,
    name: 'Dawn Upkeep & Environmental Tick',
    badge: 'Automated Step',
    icon: '🌅',
    color: 'from-amber-700/40 to-orange-950/60 border-amber-500/60 text-amber-200',
    allowedActions: [
      'Automated Planar Hazard effect pulses across arena',
      'Damage-over-Time debuffs (Burn, Poison, Void Rot) tick against afflicted units',
      'Regeneration units heal up to their designated threshold',
      'Elapsed buff & shield turn timers decrement by 1'
    ],
    restrictedActions: [
      'Cannot cast standard-speed spells during Dawn',
      'Cannot declare physical attacks until Phase 4 (Combat)'
    ],
    criticalRule: 'Units reduced to 0 HP by Dawn Burn/Poison are sent to Boneyard before Main Phase starts.',
    quickTip: 'Check the Planar Hazard card in the top-left to anticipate weather shifts.'
  },
  REFILL: {
    phase: 'REFILL',
    stepNumber: 2,
    totalSteps: 6,
    name: 'Essence Refill & Momentum Dice Roll',
    badge: 'Resource Step',
    icon: '🎲',
    color: 'from-blue-900/40 to-cyan-950/60 border-blue-500/60 text-blue-200',
    allowedActions: [
      'Max Essence increases by +1 (caps at 10 on Turn 9)',
      'Current Essence is refilled to 100% capacity',
      'Active player draws 1 card from Main Deck into 7-card Hand',
      'Dynamic Momentum Die (d6/d12) is rolled: Total = Turn # + Die Roll'
    ],
    restrictedActions: [
      'If hand already has 7 cards, the drawn card is burned directly to Boneyard',
      'Unspent essence from previous turns is not carried over'
    ],
    criticalRule: 'Momentum is capped at 12 and determines overcharge capabilities.',
    quickTip: 'High momentum rolls allow dual-casting and activating high-tier relic abilities.'
  },
  MAIN: {
    phase: 'MAIN',
    stepNumber: 3,
    totalSteps: 6,
    name: 'Main Tactical Staging & Summons',
    badge: 'Player Action Window',
    icon: '🏛️',
    color: 'from-emerald-900/40 to-stone-950/60 border-emerald-500/60 text-emerald-200',
    allowedActions: [
      'Summon Beast & Champion guardians into any of the 3 Vanguard Slots',
      'Cast Normal-Speed incantations & domain spells from Hand using Essence',
      'Equip Weapons and Relics into the Armory Slot to boost Commander power',
      'Activate kinetic abilities & domain synergy triggers'
    ],
    restrictedActions: [
      'Standard physical attacks are not declared here; advance to Combat Phase',
      'Newly summoned units cannot attack this turn due to Summoning Sickness'
    ],
    criticalRule: 'Summoning a Taunt unit into the Vanguard Core immediately shields your Commander.',
    quickTip: 'Ensure you allocate essence efficiently before ending your main staging.'
  },
  COMBAT: {
    phase: 'COMBAT',
    stepNumber: 4,
    totalSteps: 6,
    name: 'Combat Engagement & Flank Resolution',
    badge: 'Combat Window',
    icon: '⚔️',
    color: 'from-red-900/40 to-amber-950/60 border-red-500/60 text-red-200',
    allowedActions: [
      'Declare attacks with ready units against enemy Vanguard Guardians',
      'Attack enemy Commander Throne if no Taunt guardians remain in frontline',
      'Bypass grounded Taunt defenders with Skyborn (Airborne) attackers',
      'Simultaneous Clash: Both attacker & defender deal damage to each other at once'
    ],
    restrictedActions: [
      'Cannot target Commander directly while enemy Vanguard Taunt units are alive',
      'Exhausted/tapped units that attacked this turn cannot attack again'
    ],
    criticalRule: 'Trample / Pierce damage exceeding defender health strikes the Commander directly.',
    quickTip: 'Hover over enemy units to inspect the Live Combat Math Forecast before confirming.'
  },
  PRIORITY: {
    phase: 'PRIORITY',
    stepNumber: 5,
    totalSteps: 6,
    name: 'Aether Priority Window & Fast Spells',
    badge: 'Reaction Chain',
    icon: '🌀',
    color: 'from-purple-900/40 to-stone-950/60 border-purple-500/60 text-purple-200',
    allowedActions: [
      'Spend remaining Momentum to [Brace] (+2 Armor for this round)',
      'Cast Fast Instant Spells onto the Aether Priority Stack',
      'Chain reactions in Last-In, First-Out (LIFO) deterministic order',
      'Pass priority to allow top-of-stack spell to resolve'
    ],
    restrictedActions: [
      'Cannot cast slow Main-phase spells in this window',
      'Cannot summon standard non-flash units'
    ],
    criticalRule: 'The newest spell cast on the stack resolves first before older actions.',
    quickTip: 'Holding 1-2 momentum into the priority window allows fast defensive bracing.'
  },
  END: {
    phase: 'END',
    stepNumber: 6,
    totalSteps: 6,
    name: 'Dusk Conversion & Kinetic Stashing',
    badge: 'End of Turn Step',
    icon: '🌆',
    color: 'from-amber-900/40 to-stone-950/60 border-amber-500/60 text-amber-200',
    allowedActions: [
      'Convert unspent Momentum into Kinetic Battery Stash (floor(M/2))',
      'OR Convert unspent Momentum into Commander Barrier Shield (+M*2)',
      'Single-turn attack buffs and temporary damage mitigation shields expire',
      'Turn priority is passed to the opposing Commander'
    ],
    restrictedActions: [
      'No new spells or summons can be cast after Dusk initiates'
    ],
    criticalRule: 'Kinetic Stash carries over into future rounds to power explosive combos.',
    quickTip: 'Convert unspent momentum to Shield if your Commander is vulnerable to burst.'
  }
};

interface PhaseActionChecklistBannerProps {
  currentPhase: GamePhase;
  isPlayerTurn: boolean;
  onOpenTurnInspector?: () => void;
  onAdvancePhase?: () => void;
}

export const PhaseActionChecklistBanner: React.FC<PhaseActionChecklistBannerProps> = ({
  currentPhase,
  isPlayerTurn,
  onOpenTurnInspector,
  onAdvancePhase
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Map GamePhase to extended phase key
  const phaseKey = currentPhase === 'DRAW' ? 'REFILL' : currentPhase;
  const info = TURN_PHASES_DATA[phaseKey] || TURN_PHASES_DATA.MAIN;

  return (
    <div
      id="phase-action-checklist-banner"
      className={`rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 overflow-hidden bg-gradient-to-r ${info.color}`}
    >
      {/* Top Banner Strip */}
      <div className="px-3.5 py-2 flex items-center justify-between gap-2 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center text-base shrink-0 shadow">
            {info.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel font-black text-xs sm:text-sm tracking-wider uppercase">
                {info.name}
              </span>
              <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-black/50 text-amber-300 border border-amber-500/30 font-bold">
                Step {info.stepNumber} of {info.totalSteps} • {info.badge}
              </span>
            </div>
            <span className="text-[10px] text-white/80 font-mono hidden sm:inline">
              {info.criticalRule}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenTurnInspector && (
            <button
              type="button"
              onClick={onOpenTurnInspector}
              className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-white text-[11px] font-mono flex items-center gap-1 transition shadow"
              title="Inspect Full Turn Chronology & Math"
            >
              <HelpCircle size={12} className="text-amber-300" />
              <span className="hidden sm:inline">Turn Inspector</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-lg bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 transition"
            title={isMinimized ? 'Expand Actions Checklist' : 'Minimize Banner'}
          >
            {isMinimized ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>

      {/* Expandable Action Rules Grid */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="p-3 bg-black/60 border-t border-black/40 text-xs space-y-2.5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Allowed Actions Column */}
              <div className="space-y-1.5 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/30">
                <span className="text-[10.5px] font-cinzel font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Permitted Actions in This Step</span>
                </span>
                <div className="space-y-1">
                  {info.allowedActions.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-emerald-100/90 leading-relaxed">
                      <span className="text-emerald-400 text-xs">✓</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restricted Actions & Tactical Advice Column */}
              <div className="space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5 bg-rose-950/30 p-2.5 rounded-xl border border-rose-500/30">
                  <span className="text-[10.5px] font-cinzel font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle size={13} className="text-rose-400 shrink-0" />
                    <span>Restricted Actions & Constraints</span>
                  </span>
                  <div className="space-y-1">
                    {info.restrictedActions.map((res, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-rose-100/90 leading-relaxed">
                        <span className="text-rose-400 text-xs">✕</span>
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Pro-Tip */}
                <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-center gap-2 text-[11px] text-amber-200">
                  <Sparkles size={13} className="text-amber-400 shrink-0" />
                  <span><strong>Tactical Tip:</strong> {info.quickTip}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
