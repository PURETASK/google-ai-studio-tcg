import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Crown, 
  Trees, 
  Zap, 
  Swords, 
  Shield, 
  Flame, 
  Skull, 
  Sparkles, 
  Castle, 
  Compass, 
  Dices, 
  Target,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface TriForgeRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TriForgeRulesModal: React.FC<TriForgeRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <Castle size={22} />
              </div>
              <div>
                <h2 className="text-lg font-cinzel font-bold text-amber-100 flex items-center gap-2">
                  <span>Nexus: 3-Frontier Siege System Codex</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">BETA LAB</span>
                </h2>
                <p className="text-xs text-stone-400 font-sans">
                  Official architecture, Tri-Forge energy dynamics, and 3-turn mobilization protocols.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-stone-300 font-sans">
            
            {/* 1. Overview */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
              <h3 className="text-amber-300 font-cinzel font-bold text-sm flex items-center gap-2">
                <Compass size={16} />
                <span>1. Core Objectives & The 3-Frontier Topology</span>
              </h3>
              <p className="text-xs leading-relaxed text-stone-300">
                Each player defends a <strong className="text-amber-200">Sovereign Citadel (30 HP)</strong> protected by 
                three independent fortified gates. The match is fought across 3 distinct specialized lanes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1">
                  <div className="text-purple-300 font-cinzel font-bold text-xs">⚡ Left Shadow Flank (20 HP)</div>
                  <div className="text-[11px] text-stone-400">Skirmish Runway. Units with <strong>First Strike</strong> strike before the defender can retaliate.</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1">
                  <div className="text-amber-300 font-cinzel font-bold text-xs">🛡️ Center Vanguard Keep (30 HP)</div>
                  <div className="text-[11px] text-stone-400">Fortified Main Gate. Grants <strong>+1 Natural Armor</strong> to defenders. High-health champions anchor here.</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1">
                  <div className="text-blue-300 font-cinzel font-bold text-xs">🏹 Right Arcane Heights (20 HP)</div>
                  <div className="text-[11px] text-stone-400">Artillery Ridge. Equipped weapons & siege engines deal <strong>+2 Bonus Damage</strong>.</div>
                </div>
              </div>
            </div>

            {/* 2. Tri-Forge Mana */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
              <h3 className="text-amber-300 font-cinzel font-bold text-sm flex items-center gap-2">
                <Zap size={16} />
                <span>2. The Tri-Forge Multi-Resource Architecture</span>
              </h3>
              <p className="text-xs leading-relaxed text-stone-300">
                Instead of a single generic mana bar, each turn provides 3 distinct specialized energy pools:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-700/40">
                  <div className="flex items-center gap-1.5 text-amber-400 font-cinzel font-bold text-xs mb-1">
                    <Crown size={14} />
                    <span>👑 Valor Essence</span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    Powers <strong>Champions, Officers & Command Auras</strong>. Unspent Valor converts to a temporary barrier shield on your Citadel.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-700/40">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-cinzel font-bold text-xs mb-1">
                    <Trees size={14} />
                    <span>🌿 Primal Instinct</span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    Powers <strong>Beasts, Monsters & Biological Mutations</strong>. Generates Dawn Regeneration on living beasts.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-700/40">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-cinzel font-bold text-xs mb-1">
                    <Dices size={14} />
                    <span>⚙️ Forge Kinetics</span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    Powers <strong>Weapons, Relics & Siege Engines</strong>. Rolled dynamically via Momentum Dice. Unspent Forge banks into the <strong>Kinetic Battery</strong>!
                  </p>
                </div>
              </div>
            </div>

            {/* 3. 3-Turn Mobilization Loop */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3">
              <h3 className="text-amber-300 font-cinzel font-bold text-sm flex items-center gap-2">
                <Swords size={16} />
                <span>3. The 3-Turn Mobilization & Grand Clash Sequence</span>
              </h3>
              <p className="text-xs leading-relaxed text-stone-300">
                Matches are paced in <strong>Epic Cycles</strong> consisting of 3 tactical preparation turns followed by a single simultaneous resolution:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <div className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-mono font-bold shrink-0">T1</div>
                  <div>
                    <div className="text-xs font-bold text-amber-200">Turn 1: Scout & Terraforming</div>
                    <div className="text-[11px] text-stone-400">Deploy agile scouts and cast <strong>Planar Hazards</strong> onto specific lanes (e.g., Solar Fissure, Abyssal Miasma).</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <div className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold shrink-0">T2</div>
                  <div>
                    <div className="text-xs font-bold text-emerald-200">Turn 2: Armament & Reinforcement</div>
                    <div className="text-[11px] text-stone-400">Summon heavy Champions and Beasts. <strong>Socket Weapons</strong> onto units in any lane to grant bonus Power & Keywords.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <div className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold shrink-0">T3</div>
                  <div>
                    <div className="text-xs font-bold text-cyan-200">Turn 3: Formation & Secret Ambushes</div>
                    <div className="text-[11px] text-stone-400">Place face-down <strong>Ambush Traps</strong> in lanes. Fortify gate armor and prepare for the horn of war.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-red-950/40 border border-red-800/60">
                  <div className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs font-mono font-bold shrink-0">💥</div>
                  <div>
                    <div className="text-xs font-bold text-red-200">The Grand Clash Resolution</div>
                    <div className="text-[11px] text-stone-300">
                      Ambush Traps trigger $\rightarrow$ Hazards pulse $\rightarrow$ Units in all 3 lanes strike simultaneously $\rightarrow$ Overkill damage damages the Gate $\rightarrow$ Destroyed Gates suffer a <strong>Citadel Breach</strong>!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. The Citadel Breach */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
              <h3 className="text-amber-300 font-cinzel font-bold text-sm flex items-center gap-2">
                <Target size={16} />
                <span>4. The Citadel Breach & Victory Condition</span>
              </h3>
              <p className="text-xs leading-relaxed text-stone-300">
                When a Gate’s HP reaches <strong>0</strong>, it crumbles into the <strong>BREACHED</strong> state. 
                Any surviving attacker in that lane bypasses the gate and deals their full power directly to the opposing 
                <strong className="text-amber-200"> Sovereign Citadel (30 HP)</strong>. Reduce the enemy Citadel to 0 to claim victory!
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-stone-800 bg-stone-900/60 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider transition shadow-lg"
            >
              Understood, Enter Arena
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
