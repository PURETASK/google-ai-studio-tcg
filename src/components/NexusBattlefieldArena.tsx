import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Domain, BattlefieldSlot, Card, GamePhase } from '../types';
import { CardDomainStatBadge } from './CardDomainStatBadge';
import { StatusBadges } from './StatusBadges';
import { VisualTurnTracker } from './VisualTurnTracker';
import { KeywordTooltip } from './KeywordTooltip';
import { PhaseActionChecklistBanner } from './PhaseActionChecklistBanner';
import { CombatClashForecast } from './CombatClashForecast';
import { TurnInspectorModal } from './TurnInspectorModal';
import battlefieldArenaMat from '../assets/images/battlefield_arena_mat_1788581720608.jpg';
import { 
  Crown, 
  Sword, 
  Shield, 
  Zap, 
  Heart, 
  Flame, 
  BatteryCharging, 
  Dices, 
  Compass, 
  Sparkles, 
  Crosshair, 
  ArrowRight,
  Eye,
  Clock,
  Pause,
  Play,
  Timer,
  Swords,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  X
} from 'lucide-react';

interface NexusBattlefieldArenaProps {
  player: {
    name: string;
    title: string;
    health: number;
    maxHealth: number;
    shield: number;
    essence: number;
    maxEssence: number;
    deck: Card[];
    graveyard: Card[];
    champion?: BattlefieldSlot | null;
    weapon?: BattlefieldSlot | null;
    frontline: (BattlefieldSlot | undefined | null)[];
  };
  opponent: {
    name: string;
    title: string;
    health: number;
    maxHealth: number;
    shield: number;
    essence: number;
    maxEssence: number;
    deck: Card[];
    graveyard: Card[];
    hand: Card[];
    champion?: BattlefieldSlot | null;
    weapon?: BattlefieldSlot | null;
    frontline: (BattlefieldSlot | undefined | null)[];
  };
  activePlayer: 'player' | 'opponent';
  phase: string;
  turnCount: number;
  selectedAttacker: BattlefieldSlot | null;
  onSelectAttacker: (unit: BattlefieldSlot | null) => void;
  onAttackUnit: (attacker: BattlefieldSlot, targetSlotIdx?: number) => void;
  onEndTurn: () => void;
  playerMomentum: number;
  baseMomentum: number;
  kineticStash: number;
  diceType: 'd6' | 'd12';
  setDiceType: (type: 'd6' | 'd12') => void;
  onRollDice: () => void;
  hasRolledDiceThisTurn: boolean;
  lastDiceRoll: number | null;
  onConvertMomentum: (mode: 'stash' | 'shield') => void;
  activeHazard: any;
  onOpenHazardHUD: () => void;
  onInspectGraveyard: (player: 'player' | 'opponent') => void;
  screenShake?: boolean;
  bossEnraged?: boolean;
  aiThinking?: boolean;
  turnTimeRemaining?: number;
  turnTimeLimit?: number;
  onToggleTurnTimerPause?: () => void;
  isTimerPaused?: boolean;
  onInspectCard?: (card: Card) => void;
  onOpenTutorial?: () => void;
}

export const NexusBattlefieldArena: React.FC<NexusBattlefieldArenaProps> = ({
  player,
  opponent,
  activePlayer,
  phase,
  turnCount,
  selectedAttacker,
  onSelectAttacker,
  onAttackUnit,
  onEndTurn,
  playerMomentum,
  baseMomentum,
  kineticStash,
  diceType,
  setDiceType,
  onRollDice,
  hasRolledDiceThisTurn,
  lastDiceRoll,
  onConvertMomentum,
  activeHazard,
  onOpenHazardHUD,
  onInspectGraveyard,
  screenShake = false,
  bossEnraged = false,
  aiThinking = false,
  turnTimeRemaining,
  turnTimeLimit = 60,
  onToggleTurnTimerPause,
  isTimerPaused = false,
  onInspectCard,
  onOpenTutorial
}) => {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [showCombatGuide, setShowCombatGuide] = useState(false);
  const [isTurnInspectorOpen, setIsTurnInspectorOpen] = useState(false);
  const [targetedDefenderForClash, setTargetedDefenderForClash] = useState<BattlefieldSlot | null>(null);

  // Check if opponent has any active Taunt frontline units
  const hasActiveGuards = opponent.frontline.some(u => u && u.currentHealth > 0);
  
  // Check if selected attacker has Skyborn / Reach keyword to bypass Vanguard
  const attackerHasSkyborn = Boolean(
    selectedAttacker?.card?.abilities?.some(a => 
      a?.name?.toLowerCase().includes('skyborn') || 
      a?.description?.toLowerCase().includes('skyborn') ||
      a?.name?.toLowerCase().includes('flying')
    ) || 
    (Array.isArray(selectedAttacker?.statuses)
      ? (selectedAttacker.statuses as unknown[]).some(s => typeof s === 'string' && s.toLowerCase().includes('skyborn'))
      : false) ||
    selectedAttacker?.card?.keywords?.some(k => 
      k.toLowerCase().includes('skyborn') || 
      k.toLowerCase().includes('reach') || 
      k.toLowerCase().includes('flying')
    )
  );

  const canTargetCommanderDirectly = !hasActiveGuards || attackerHasSkyborn;

  // Helper to compute combat math trade preview
  const getCombatMathPreview = (defenderHealth: number, defenderPower: number) => {
    if (!selectedAttacker) return null;
    const attDmg = selectedAttacker.currentPower;
    const defDmg = defenderPower;
    const defRemHp = Math.max(0, defenderHealth - attDmg);
    const isLethal = attDmg >= defenderHealth;
    const attRemHp = Math.max(0, selectedAttacker.currentHealth - defDmg);
    const attDies = defDmg >= selectedAttacker.currentHealth;

    return {
      attDmg,
      defDmg,
      defRemHp,
      isLethal,
      attRemHp,
      attDies
    };
  };

  // 7 Elemental Socket Gem Configs for the Central Socket Bezels
  const ELEMENTAL_SOCKETS = [
    { name: 'Radiance', domain: 'Radiance' as Domain, color: '#EF4444', icon: '🔥' },
    { name: 'Verdance', domain: 'Verdance' as Domain, color: '#10B981', icon: '🌿' },
    { name: 'Sanctuary', domain: 'Sanctuary' as Domain, color: '#F59E0B', icon: '☀️' },
    { name: 'Convergence', domain: 'Sanctuary' as Domain, color: '#FDE047', icon: '✦', isCore: true },
    { name: 'Arcane', domain: 'Arcane' as Domain, color: '#3B82F6', icon: '🔮' },
    { name: 'Tempest', domain: 'Arcane' as Domain, color: '#38BDF8', icon: '⚡' },
    { name: 'Abyss', domain: 'Abyss' as Domain, color: '#9333EA', icon: '💀' },
  ];

  return (
    <div 
      className={`relative w-full rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl transition-all duration-300 ${
        screenShake ? 'animate-bounce' : ''
      }`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(12, 10, 9, 0.82), rgba(12, 10, 9, 0.72), rgba(0, 0, 0, 0.88)), url(${battlefieldArenaMat})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* ================= ATMOSPHERIC SKY BASTION BACKGROUND & REALM HORIZON ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
        {/* Subtle realm backdrop glow */}
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-red-600/20 blur-3xl" />
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-amber-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-cyan-600/20 blur-3xl" />

        {/* Engraved Geometric Filigree Lines on Battlefield Stone Floor */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="battle-stone-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#battle-stone-grid)" />
          {/* Symmetrical Gold Rune Circles */}
          <circle cx="50%" cy="50%" r="220" stroke="rgba(245, 158, 11, 0.12)" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
          <circle cx="50%" cy="50%" r="140" stroke="rgba(245, 158, 11, 0.18)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* ================= 4 MONUMENTAL CORNER ELEMENTAL TOWERS ================= */}
      {/* Top-Left: Molten Radiance Brazier Tower */}
      <div className="absolute top-2 left-2 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-950/85 border border-orange-500/60 shadow-lg backdrop-blur-md">
        <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#f97316]" />
        <span className="text-[9px] font-cinzel text-orange-300 font-bold uppercase">Molten Brazier</span>
      </div>

      {/* Top-Right: Abyssal Void Spire */}
      <div className="absolute top-2 right-2 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-950/85 border border-purple-500/60 shadow-lg backdrop-blur-md">
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />
        <span className="text-[9px] font-cinzel text-purple-300 font-bold uppercase">Void Citadel</span>
      </div>

      {/* Bottom-Left: Sanctuary Ivory Bastion */}
      <div className="absolute bottom-2 left-2 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-950/85 border border-amber-500/60 shadow-lg backdrop-blur-md">
        <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]" />
        <span className="text-[9px] font-cinzel text-amber-300 font-bold uppercase">Solar Spire</span>
      </div>

      {/* Bottom-Right: Tempest Storm Bastion */}
      <div className="absolute bottom-2 right-2 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-950/85 border border-cyan-500/60 shadow-lg backdrop-blur-md">
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
        <span className="text-[9px] font-cinzel text-cyan-300 font-bold uppercase">Storm Spire</span>
      </div>

      <div className="relative z-10 p-3 sm:p-5 space-y-4">
        
        {/* Quick Battle Tactics & Rules Guide Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-stone-950/80 border border-amber-500/30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
              <Swords size={14} className="text-amber-400" />
              <span>Tactical Nexus Arena</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-stone-400">
              • 3 Lanes (Flank - Vanguard - Flank) • Dawn Hazard • Aether Priority Chain
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenTutorial && (
              <button
                type="button"
                onClick={onOpenTutorial}
                className="px-2.5 py-1 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/50 text-[11px] font-cinzel font-bold flex items-center gap-1.5 transition shadow"
              >
                <HelpCircle size={12} className="text-purple-300" />
                <span>Interactive Drills</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowCombatGuide(!showCombatGuide)}
              className={`px-3 py-1 rounded-xl font-cinzel font-bold text-[11px] flex items-center gap-1.5 transition shadow ${
                showCombatGuide
                  ? 'bg-amber-500 text-black border border-amber-400'
                  : 'bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40'
              }`}
            >
              <BookOpen size={12} />
              <span>{showCombatGuide ? 'Hide Combat Guide' : '📖 Combat Math & Lane Rules'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Quick Combat & Lane Guide Drawer */}
        <AnimatePresence>
          {showCombatGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden rounded-2xl bg-stone-950/95 border-2 border-amber-500/60 p-4 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚔️</span>
                  <h4 className="font-cinzel font-bold text-sm text-amber-200">
                    Nexus Combat Math & Lane Positioning System
                  </h4>
                </div>
                <button
                  onClick={() => setShowCombatGuide(false)}
                  className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-900 transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* Rule 1: Lanes & Taunt */}
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1.5">
                  <div className="font-cinzel font-bold text-amber-400 flex items-center gap-1.5">
                    <Shield size={14} />
                    <span>1. Vanguard & Taunt Guard</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    The <strong className="text-amber-300">Vanguard Core (Center Lane)</strong> protects the Sovereign. As long as any enemy Vanguard unit lives, your ground attackers <strong className="text-red-300">must strike frontline guards first</strong> unless they possess <strong className="text-cyan-300">[Skyborn]</strong> to bypass directly to the Commander.
                  </p>
                </div>

                {/* Rule 2: Simultaneous Damage Trade */}
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1.5">
                  <div className="font-cinzel font-bold text-red-400 flex items-center gap-1.5">
                    <Sword size={14} />
                    <span>2. Simultaneous Combat Trades</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    When you order a creature to strike an enemy guard, <strong className="text-amber-300">both units deal their Power simultaneously</strong>. Watch the live <strong className="text-emerald-300">Combat Math Preview</strong> below to see if your creature survives or slays the target!
                  </p>
                </div>

                {/* Rule 3: Momentum & Reaction Chain */}
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1.5">
                  <div className="font-cinzel font-bold text-blue-400 flex items-center gap-1.5">
                    <Zap size={14} />
                    <span>3. Kinetic Momentum & Spells</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    Spend Momentum during combat to <strong className="text-amber-300">[Brace]</strong> (+2 Armor) or stash kinetic energy. Cast <strong className="text-purple-300">[Fast Spells]</strong> instantly on the Priority Chain to counter enemy strikes before damage resolves.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 1. OPPONENT TERRITORY (Top Section) */}
        {/* ========================================================================= */}
        <div className={`p-3.5 rounded-2xl bg-stone-950/90 border transition-all duration-300 ${
          activePlayer === 'opponent'
            ? 'border-purple-500 ring-2 ring-purple-500/80 shadow-[0_0_30px_rgba(168,85,247,0.45)]'
            : bossEnraged ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]' : 'border-purple-600/50'
        }`}>
          {/* Opponent Identity & Resources Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-950/80 pb-2.5">
            {/* Opponent Name & Crest */}
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg shadow-md ${
                bossEnraged ? 'bg-red-950 border-red-500 text-red-300 animate-pulse' : 'bg-purple-950 border-purple-500 text-purple-200'
              }`}>
                🔮
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-cinzel font-bold text-sm text-purple-100">{opponent.name}</h3>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700 uppercase font-bold">
                    Titan
                  </span>
                  {aiThinking && (
                    <span className="text-[9px] font-mono text-amber-400 animate-pulse">● Thinking...</span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-stone-400">{opponent.title}</span>
              </div>
            </div>

            {/* Opponent Hand & Essence & Health */}
            <div className="flex items-center gap-3">
              {/* Opponent Hand Count Fan */}
              <div className="flex items-center gap-1 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800 text-[11px] font-mono text-purple-300">
                <span>🎴 {opponent?.hand?.length || 0} Hand</span>
              </div>

              {/* Essence Crystals */}
              <div className="flex items-center gap-1 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-500/50 text-xs font-mono font-bold text-blue-200">
                <Zap size={13} className="text-blue-400 fill-blue-400" />
                <span>{opponent.essence}/{opponent.maxEssence}</span>
              </div>

              {/* Health Gauge */}
              <div className="flex items-center gap-1.5 bg-red-950/80 px-3 py-1 rounded-full border border-red-500/50 text-xs font-mono font-bold text-red-200">
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span>{opponent.health} HP</span>
              </div>
            </div>
          </div>

          {/* TITAN ENRAGED DYNAMIC DIEGETIC BANNER */}
          {bossEnraged && (
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-2.5 p-2 rounded-xl bg-gradient-to-r from-red-950 via-purple-950 to-red-950 border-2 border-red-500 text-red-100 flex items-center justify-between px-3.5 shadow-[0_0_25px_rgba(239,68,68,0.5)] animate-pulse"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">⚡🔥</span>
                <div>
                  <span className="font-cinzel font-black text-xs uppercase tracking-wider text-red-300 block">
                    TITAN ENRAGED — BERSERK APOCALYPSE
                  </span>
                  <span className="text-[10px] text-stone-300 font-sans">
                    Critical vitality breached! Opponent unleashed apex offensive surge!
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-600 text-black font-black text-[10px] font-mono uppercase tracking-widest shadow-md">
                ENRAGED
              </span>
            </motion.div>
          )}

          {/* 7 Elemental Socket Gem Bezels (Opponent) */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 py-1.5 my-1 bg-black/40 rounded-xl border border-stone-800/80">
            {ELEMENTAL_SOCKETS.map((elem, idx) => (
              <div 
                key={`opp-elem-${idx}`} 
                className="flex flex-col items-center group cursor-pointer"
                title={`${elem.name} Domain Socket`}
              >
                <div 
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs border transition-transform hover:scale-110 shadow-sm ${
                    elem.isCore 
                      ? 'border-amber-300 bg-amber-950/80 ring-1 ring-amber-400/50' 
                      : 'border-stone-700 bg-stone-900/80 hover:border-amber-400'
                  }`}
                  style={{ boxShadow: `0 0 8px ${elem.color}33` }}
                >
                  <span className="text-[10px]">{elem.icon}</span>
                </div>
                <span className="text-[7px] font-cinzel text-stone-400 uppercase mt-0.5 tracking-tighter hidden sm:inline">
                  {elem.name}
                </span>
              </div>
            ))}
          </div>

          {/* Symmetrical Battlefield Arena Grid (Left Hazard, Center 5 Battlefield Lanes, Right Armory/Throne) */}
          <div className="grid grid-cols-7 gap-2 pt-1.5">
            {/* Left Slot 1: Hazard Zone Receptacle */}
            <div 
              onClick={onOpenHazardHUD}
              className="p-1.5 rounded-xl bg-orange-950/30 border border-orange-600/40 border-dashed text-center flex flex-col justify-between min-h-[105px] cursor-pointer hover:border-orange-400 transition"
              title="Click to view Active Hazards"
            >
              <span className="text-[7.5px] font-cinzel text-orange-400 uppercase font-bold">Planar Hazard</span>
              <div className="text-center my-auto">
                <div className="w-5 h-5 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300 text-xs">
                  🌪️
                </div>
                <span className="text-[8px] font-mono text-orange-300 font-bold block mt-1 truncate">
                  {activeHazard ? activeHazard.name : 'Clear Skies'}
                </span>
              </div>
              <span className="text-[7px] font-mono text-stone-400">Hazard Slot</span>
            </div>

            {/* Left Slot 2: Opponent Deck & Discard */}
            <div 
              onClick={() => onInspectGraveyard('opponent')}
              className="p-1.5 rounded-xl bg-stone-950/80 border border-stone-800 text-center flex flex-col justify-between min-h-[105px] cursor-pointer hover:border-purple-400 transition"
              title="Inspect Opponent Deck & Boneyard"
            >
              <span className="text-[7.5px] font-cinzel text-purple-400 uppercase font-bold">Deck / Grave</span>
              <div className="space-y-0.5 my-auto">
                <div className="text-[9px] font-mono text-stone-300 font-bold">📚 {opponent?.deck?.length || 0} Deck</div>
                <div className="text-[9px] font-mono text-purple-400 font-bold">🪦 {opponent?.graveyard?.length || 0} Grave</div>
              </div>
              <span className="text-[7px] font-cinzel text-amber-400">View Grave ↗</span>
            </div>

            {/* Center Slots 3, 4, 5: 3 Opponent Vanguard Guard Lanes with Lane Positioning Headers & Combat Math */}
            {[0, 1, 2].map((slotIdx) => {
              const unit = opponent.frontline[slotIdx];
              const isTargetable = selectedAttacker && activePlayer === 'player' && unit;
              const mathPreview = unit && selectedAttacker ? getCombatMathPreview(unit.currentHealth, unit.currentPower) : null;
              
              const laneLabels = [
                { name: 'Left Flank', icon: '⚡' },
                { name: 'Vanguard Core', icon: '🛡️' },
                { name: 'Right Flank', icon: '⚡' }
              ];

              return (
                <div
                  key={`opp-vanguard-${slotIdx}`}
                  onClick={() => {
                    if (selectedAttacker && activePlayer === 'player') {
                      onAttackUnit(selectedAttacker, slotIdx);
                    }
                  }}
                  className={`p-1.5 rounded-xl border flex flex-col justify-between text-center transition-all min-h-[105px] relative overflow-hidden ${
                    unit
                      ? isTargetable
                        ? 'bg-purple-950/90 border-red-500 ring-2 ring-red-400/90 cursor-pointer animate-pulse shadow-xl scale-102'
                        : 'bg-stone-900/95 border-purple-500/50 shadow'
                      : 'bg-black/40 border-stone-800 border-dashed text-stone-400'
                  }`}
                >
                  {/* Lane Positioning Indicator Tag */}
                  <div className="absolute top-1 left-1 z-20 px-1 py-0.2 rounded bg-black/80 text-[6.5px] font-mono text-stone-300 border border-stone-700/60">
                    {laneLabels[slotIdx].icon} {laneLabels[slotIdx].name}
                  </div>

                  <AnimatePresence mode="wait">
                    {unit ? (
                      <motion.div
                        key={unit.instanceId || `opp-unit-${unit.card.id}-${slotIdx}`}
                        initial={{ opacity: 0, scale: 0.55, y: -22, rotateX: 18 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -20, filter: 'blur(4px)' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 320, mass: 0.8 }}
                        className="w-full h-full flex flex-col justify-between flex-1 relative z-10 pt-3"
                      >
                        {/* Ethereal Entrance Shockwave Ripple */}
                        <motion.div
                          initial={{ scale: 0.7, opacity: 0.9 }}
                          animate={{ scale: 1.7, opacity: 0 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-xl border-2 border-purple-400/80 pointer-events-none"
                        />

                        {/* PERSISTENT FULL-CARD STATUS EFFECT AURA OVERLAYS */}
                        {unit.statuses && (
                          <>
                            {/* 1. Stunned / Frozen Frost Shell */}
                            {(unit.statuses.frozen || (unit.statuses.frozenTurns && unit.statuses.frozenTurns > 0)) && (
                              <div className="absolute inset-0 rounded-xl bg-sky-950/50 border-2 border-sky-400/90 pointer-events-none z-15 backdrop-blur-[0.5px] flex items-center justify-center">
                                <div className="text-[20px] opacity-40 select-none animate-pulse">❄️</div>
                              </div>
                            )}

                            {/* 2. Buffed Golden Radiance */}
                            {unit.statuses.buffed && unit.statuses.buffed > 0 && (
                              <div className="absolute inset-0 rounded-xl border-2 border-amber-400/80 ring-2 ring-amber-300/40 bg-amber-500/10 pointer-events-none z-15 animate-pulse" />
                            )}

                            {/* 3. Poisoned Toxic Miasma */}
                            {((unit.statuses.poison && unit.statuses.poison > 0) || (unit.statuses.poisonTurns && unit.statuses.poisonTurns > 0)) && (
                              <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/80 bg-emerald-950/30 pointer-events-none z-15 flex items-center justify-center">
                                <div className="text-[18px] opacity-30 select-none animate-bounce">🍄</div>
                              </div>
                            )}

                            {/* 4. Burn Fire Sheen */}
                            {((unit.statuses.burn && unit.statuses.burn > 0) || (unit.statuses.burnTurns && unit.statuses.burnTurns > 0)) && (
                              <div className="absolute inset-0 rounded-xl border-2 border-red-500/80 bg-red-950/25 pointer-events-none z-15" />
                            )}
                          </>
                        )}

                        {/* Top quick inspect card trigger */}
                        {onInspectCard && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onInspectCard(unit.card);
                            }}
                            className="absolute top-0.5 right-1 z-30 p-1 rounded-full bg-black/80 hover:bg-amber-600 text-stone-300 hover:text-white transition shadow"
                            title="Inspect Card Codex Sheet"
                          >
                            <Eye size={9} />
                          </button>
                        )}

                        {/* IN-MATCH COMBAT MATH & DAMAGE TRADE PREDICTOR OVERLAY */}
                        {isTargetable && mathPreview && (
                          <div className="absolute inset-0 rounded-xl bg-red-950/85 border-2 border-red-500 flex flex-col items-center justify-center p-1 z-20 shadow-2xl animate-fade-in pointer-events-none">
                            <span className="text-[7.5px] font-cinzel font-black uppercase text-red-300 bg-black/90 px-1.5 py-0.5 rounded border border-red-500/60 shadow">
                              ⚔️ -{mathPreview.attDmg} DMG
                            </span>
                            <div className="my-0.5 text-[8.5px] font-mono font-bold flex items-center gap-1">
                              <span className="text-red-300">HP:</span>
                              <span className="line-through text-stone-400">{unit.currentHealth}</span>
                              <ArrowRight size={8} className="text-amber-400" />
                              <span className={mathPreview.isLethal ? 'text-red-400 font-black' : 'text-emerald-300'}>
                                {mathPreview.defRemHp}
                              </span>
                            </div>
                            <span className={`text-[6.5px] font-mono font-black uppercase px-1 py-0.2 rounded ${
                              mathPreview.isLethal ? 'bg-red-600 text-black animate-pulse' : 'bg-stone-800 text-stone-200'
                            }`}>
                              {mathPreview.isLethal ? '💀 LETHAL SLAY' : '🛡️ SURVIVES'}
                            </span>
                            <span className="text-[6px] font-mono text-amber-300 mt-0.5">
                              {mathPreview.attDies ? '⚠️ Attacker dies in trade' : `Attacker takes -${mathPreview.defDmg}`}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center px-1">
                          <span className="text-[7.5px] font-cinzel text-purple-300 font-bold uppercase">
                            Guard #{slotIdx + 1}
                          </span>
                          <KeywordTooltip keyword="Taunt">
                            <span className="text-[7px] font-mono px-1 rounded bg-purple-900 text-purple-200 font-bold cursor-help">
                              TAUNT
                            </span>
                          </KeywordTooltip>
                        </div>

                        <span className="text-[10.5px] font-cinzel font-bold text-stone-100 truncate block my-0.5">
                          {unit.card.name}
                        </span>

                        {unit.statuses && (
                          <div className="flex justify-center my-0.5">
                            <StatusBadges statuses={unit.statuses} />
                          </div>
                        )}

                        <div className="flex justify-center items-center gap-1.5 mt-auto">
                          <CardDomainStatBadge domain={unit.card.domain} type="attack" value={unit.currentPower} size="sm" />
                          <CardDomainStatBadge domain={unit.card.domain} type="defense" value={unit.currentHealth} size="sm" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`opp-empty-${slotIdx}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="my-auto flex flex-col items-center"
                      >
                        <Compass size={14} className="text-stone-500 mb-1" />
                        <span className="text-[8px] font-cinzel text-stone-400">Empty Lane #{slotIdx + 1}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Right Slot 6: Opponent Commander Throne */}
            <div 
              onClick={() => {
                if (selectedAttacker && activePlayer === 'player' && canTargetCommanderDirectly) {
                  onAttackUnit(selectedAttacker);
                }
              }}
              className={`p-1.5 rounded-xl border-2 text-center flex flex-col justify-between min-h-[105px] shadow-lg transition-all relative overflow-hidden ${
                selectedAttacker && activePlayer === 'player'
                  ? canTargetCommanderDirectly
                    ? 'bg-red-950/80 border-red-500 ring-2 ring-red-400 cursor-pointer animate-pulse'
                    : 'bg-purple-950/70 border-purple-500/80 opacity-80'
                  : 'bg-purple-950/70 border-purple-500/80'
              }`}
            >
              {selectedAttacker && activePlayer === 'player' && (
                <div className="absolute top-1 right-1 z-20 px-1 py-0.2 rounded text-[6.5px] font-mono font-bold bg-black/90">
                  {canTargetCommanderDirectly ? (
                    <span className="text-emerald-400">🎯 DIRECT TARGET</span>
                  ) : (
                    <span className="text-red-400">🛡️ GUARDED</span>
                  )}
                </div>
              )}

              <span className="text-[7.5px] font-cinzel text-amber-300 uppercase font-bold flex items-center justify-center gap-1">
                <Crown size={9} />
                <span>Commander</span>
              </span>
              <span className="text-[11px] font-cinzel font-bold text-amber-100 truncate block my-auto">
                {opponent.champion?.card.name || opponent.name}
              </span>
              <div className="flex justify-center items-center gap-1.5 mt-auto">
                <CardDomainStatBadge domain={opponent.champion?.card.domain || 'Arcane'} type="attack" value={opponent.champion?.currentPower || 0} size="sm" />
                <CardDomainStatBadge domain={opponent.champion?.card.domain || 'Arcane'} type="defense" value={opponent.champion?.currentHealth || opponent.health} size="sm" />
              </div>
            </div>

            {/* Right Slot 7: Opponent Armory Weapon Slot */}
            <div className="p-1.5 rounded-xl bg-stone-950/80 border border-stone-800 text-center flex flex-col justify-between min-h-[105px]">
              <span className="text-[7.5px] font-cinzel text-purple-400 uppercase font-bold">Armory</span>
              <AnimatePresence mode="wait">
                {opponent.weapon ? (
                  <motion.div
                    key={opponent.weapon.instanceId || opponent.weapon.card.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7, filter: 'blur(3px)' }}
                    className="space-y-0.5 my-auto"
                  >
                    <span className="text-[10px] font-cinzel font-bold text-stone-100 block truncate">
                      {opponent.weapon.card.name}
                    </span>
                    <div className="flex justify-center">
                      <CardDomainStatBadge domain={opponent.weapon.card.domain} type="attack" value={opponent.weapon.currentPower} size="sm" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.span
                    key="opp-weapon-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="text-[8px] font-mono text-stone-400 my-auto"
                  >
                    Empty
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="text-[7px] font-mono text-stone-400">Relic Slot</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CENTER BATTLEFIELD VISUAL TURN TRACKER & CLASH AXIS */}
        {/* ========================================================================= */}
        <div className="py-2 space-y-2.5">
          <VisualTurnTracker
            activePlayer={activePlayer}
            turnCount={turnCount}
            phase={phase as GamePhase}
            turnTimeRemaining={turnTimeRemaining}
            turnTimeLimit={turnTimeLimit}
            onPassTurn={onEndTurn}
            isTimerPaused={isTimerPaused}
            onTogglePause={onToggleTurnTimerPause}
            onOpenTurnInspector={() => setIsTurnInspectorOpen(true)}
          />

          {/* Diegetic Phase Actions & Timing Rules Checklist Banner */}
          <PhaseActionChecklistBanner
            currentPhase={phase as GamePhase}
            isPlayerTurn={activePlayer === 'player'}
            onOpenTurnInspector={() => setIsTurnInspectorOpen(true)}
            onAdvancePhase={onEndTurn}
          />
        </div>

        {/* Real-Time Combat Math & Simultaneous Strike Forecast Overlay */}
        {selectedAttacker && activePlayer === 'player' && (
          <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
            {targetedDefenderForClash ? (
              <CombatClashForecast
                attackerUnit={{
                  card: selectedAttacker.card,
                  currentHp: selectedAttacker.currentHealth,
                  statuses: selectedAttacker.statuses as any
                }}
                defenderUnit={{
                  card: targetedDefenderForClash.card,
                  currentHp: targetedDefenderForClash.currentHealth,
                  statuses: targetedDefenderForClash.statuses as any
                }}
                onConfirmAttack={() => {
                  const targetIdx = opponent.frontline.findIndex(u => u && u.instanceId === targetedDefenderForClash.instanceId);
                  onAttackUnit(selectedAttacker, targetIdx >= 0 ? targetIdx : undefined);
                  setTargetedDefenderForClash(null);
                }}
                onCancelAttack={() => {
                  setTargetedDefenderForClash(null);
                  onSelectAttacker(null);
                }}
              />
            ) : (
              <CombatClashForecast
                attackerUnit={{
                  card: selectedAttacker.card,
                  currentHp: selectedAttacker.currentHealth,
                  statuses: selectedAttacker.statuses as any
                }}
                isAttackingCommander={true}
                defenderCommanderHp={opponent.health}
                defenderCommanderShield={opponent.shield}
                onConfirmAttack={() => onAttackUnit(selectedAttacker)}
                onCancelAttack={() => onSelectAttacker(null)}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. PLAYER TERRITORY (Bottom Section) */}
        {/* ========================================================================= */}
        <div className={`p-3.5 rounded-2xl bg-stone-950/90 border transition-all duration-300 space-y-3 ${
          activePlayer === 'player'
            ? 'border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.45)]'
            : 'border-amber-500/50'
        }`}>
          
          {/* Symmetrical Battlefield Arena Grid (Left Hazard, Center 5 Battlefield Lanes, Right Armory/Throne) */}
          <div className="grid grid-cols-7 gap-2">
            {/* Left Slot 1: Player Hazard Receptacle */}
            <div 
              onClick={onOpenHazardHUD}
              className="p-1.5 rounded-xl bg-orange-950/30 border border-orange-500/40 border-dashed text-center flex flex-col justify-between min-h-[95px] cursor-pointer hover:border-orange-300 transition"
              title="Open Planar Hazard Engine"
            >
              <span className="text-[7.5px] font-cinzel text-orange-300 uppercase font-bold">Cataclysm</span>
              <div className="text-center my-auto">
                <div className="w-5 h-5 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300 text-xs">
                  ⚡
                </div>
                <span className="text-[8px] font-mono text-orange-200 font-bold block mt-1 truncate">
                  {activeHazard ? `${activeHazard.roundsLeft || 1} Rnds Left` : 'Active'}
                </span>
              </div>
              <span className="text-[7px] font-mono text-amber-400">Open HUD ↗</span>
            </div>

            {/* Left Slot 2: Player Deck & Discard */}
            <div 
              onClick={() => onInspectGraveyard('player')}
              className="p-1.5 rounded-xl bg-stone-950/80 border border-cyan-500/40 text-center flex flex-col justify-between min-h-[95px] cursor-pointer hover:border-cyan-300 transition"
              title="Inspect Your Deck & Boneyard"
            >
              <span className="text-[7.5px] font-cinzel text-cyan-300 uppercase font-bold">Deck / Grave</span>
              <div className="space-y-0.5 my-auto">
                <div className="text-[9px] font-mono text-stone-200 font-bold">📚 {player?.deck?.length || 0} Deck</div>
                <div className="text-[9px] font-mono text-cyan-300 font-bold">🪦 {player?.graveyard?.length || 0} Grave</div>
              </div>
              <span className="text-[7px] font-cinzel text-amber-400">View Grave ↗</span>
            </div>

            {/* Center Slots 3, 4, 5: 3 Player Vanguard Guard Lanes with Lane Positioning Headers */}
            {[0, 1, 2].map((slotIdx) => {
              const unit = player.frontline[slotIdx];
              const isSelected = selectedAttacker?.instanceId === unit?.instanceId;
              const isReadyToAttack = unit && activePlayer === 'player' && unit.canAttack;
              
              const laneLabels = [
                { name: 'Left Flank', icon: '⚡' },
                { name: 'Vanguard Core', icon: '🛡️' },
                { name: 'Right Flank', icon: '⚡' }
              ];

              return (
                <div
                  key={`player-vanguard-${slotIdx}`}
                  onClick={() => {
                    if (unit && activePlayer === 'player' && unit.canAttack) {
                      onSelectAttacker(isSelected ? null : unit);
                    }
                  }}
                  className={`p-1.5 rounded-xl border flex flex-col justify-between text-center transition-all min-h-[105px] relative overflow-hidden ${
                    unit
                      ? isSelected
                        ? 'ring-4 ring-rose-500 bg-amber-950/95 border-rose-400 cursor-pointer scale-105 shadow-[0_0_25px_rgba(244,63,94,0.8)] z-20'
                        : isReadyToAttack
                          ? 'bg-stone-900 border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_18px_rgba(245,158,11,0.6)] hover:border-amber-300 cursor-pointer hover:scale-102'
                          : 'bg-stone-900/60 border-stone-700 opacity-80 cursor-default'
                      : 'bg-black/40 border-stone-800 border-dashed text-stone-400'
                  }`}
                >
                  {/* Lane Positioning Indicator Tag */}
                  <div className="absolute top-1 left-1 z-20 px-1 py-0.2 rounded bg-black/80 text-[6.5px] font-mono text-amber-300/90 border border-amber-500/30">
                    {laneLabels[slotIdx].icon} {laneLabels[slotIdx].name}
                  </div>

                  <AnimatePresence mode="wait">
                    {unit ? (
                      <motion.div
                        key={unit.instanceId || `player-unit-${unit.card.id}-${slotIdx}`}
                        initial={{ opacity: 0, scale: 0.55, y: 22, rotateX: -18 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 16, filter: 'blur(4px)' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 320, mass: 0.8 }}
                        className="w-full h-full flex flex-col justify-between flex-1 relative z-10 pt-3"
                      >
                        {/* Golden Summon Shockwave Ripple on Entrance */}
                        <motion.div
                          initial={{ scale: 0.7, opacity: 0.9 }}
                          animate={{ scale: 1.7, opacity: 0 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-xl border-2 border-amber-400/80 pointer-events-none"
                        />

                        {/* PERSISTENT FULL-CARD STATUS EFFECT AURA OVERLAYS (PLAYER UNIT) */}
                        {unit.statuses && (
                          <>
                            {/* 1. Stunned / Frozen Frost Shell */}
                            {(unit.statuses.frozen || (unit.statuses.frozenTurns && unit.statuses.frozenTurns > 0)) && (
                              <div className="absolute inset-0 rounded-xl bg-sky-950/50 border-2 border-sky-400/90 pointer-events-none z-15 backdrop-blur-[0.5px] flex items-center justify-center">
                                <div className="text-[20px] opacity-40 select-none animate-pulse">❄️</div>
                              </div>
                            )}

                            {/* 2. Buffed Golden Radiance */}
                            {unit.statuses.buffed && unit.statuses.buffed > 0 && (
                              <div className="absolute inset-0 rounded-xl border-2 border-amber-400/80 ring-2 ring-amber-300/40 bg-amber-500/10 pointer-events-none z-15 animate-pulse" />
                            )}

                            {/* 3. Poisoned Toxic Miasma */}
                            {((unit.statuses.poison && unit.statuses.poison > 0) || (unit.statuses.poisonTurns && unit.statuses.poisonTurns > 0)) && (
                              <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/80 bg-emerald-950/30 pointer-events-none z-15 flex items-center justify-center">
                                <div className="text-[18px] opacity-30 select-none animate-bounce">🍄</div>
                              </div>
                            )}

                            {/* 4. Burn Fire Sheen */}
                            {((unit.statuses.burn && unit.statuses.burn > 0) || (unit.statuses.burnTurns && unit.statuses.burnTurns > 0)) && (
                              <div className="absolute inset-0 rounded-xl border-2 border-red-500/80 bg-red-950/25 pointer-events-none z-15" />
                            )}
                          </>
                        )}

                        {/* Top quick inspect card trigger */}
                        {onInspectCard && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onInspectCard(unit.card);
                            }}
                            className="absolute top-0.5 right-1 z-30 p-1 rounded-full bg-black/80 hover:bg-amber-600 text-stone-300 hover:text-white transition shadow"
                            title="Inspect Card Codex Sheet"
                          >
                            <Eye size={9} />
                          </button>
                        )}

                        {/* Glowing 'Attack' Effect Overlay for active creatures */}
                        {isReadyToAttack && !isSelected && (
                          <>
                            {/* Radiant ambient glow pulse */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-amber-500/20 via-transparent to-amber-500/10 animate-pulse pointer-events-none" />
                            {/* Animated Attack Ready Badge */}
                            <div className="absolute -top-1 -right-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-black text-[7px] font-cinzel font-black uppercase shadow-lg shadow-amber-500/50">
                              <Swords size={9} className="animate-spin" style={{ animationDuration: '4s' }} />
                              <span>ATTACK</span>
                            </div>
                          </>
                        )}

                        {/* Selected Attacker Combat Lock-in Crosshair */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-xl bg-rose-950/40 border border-rose-400/80 flex flex-col items-center justify-center z-20 pointer-events-none">
                            <Crosshair size={18} className="text-rose-400 animate-pulse" />
                            <span className="text-[6.5px] font-cinzel font-black uppercase text-rose-200 bg-rose-900/90 px-1 py-0.2 rounded mt-0.5 shadow">
                              LOCKED
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center px-1">
                          <span className="text-[7.5px] font-cinzel text-amber-300 uppercase font-bold">
                            Guard #{slotIdx + 1}
                          </span>
                          {unit.canAttack ? (
                            <span className="text-[7px] font-mono text-emerald-400 font-bold animate-pulse">READY</span>
                          ) : (
                            <KeywordTooltip keyword="Taunt">
                              <span className="text-[6.5px] font-mono px-1 rounded bg-stone-800 text-stone-300 font-bold cursor-help">
                                GUARD
                              </span>
                            </KeywordTooltip>
                          )}
                        </div>

                        <span className="text-[10.5px] font-cinzel font-bold text-stone-100 truncate block my-0.5">
                          {unit.card.name}
                        </span>

                        {unit.statuses && (
                          <div className="flex justify-center my-0.5">
                            <StatusBadges statuses={unit.statuses} />
                          </div>
                        )}

                        <div className="flex justify-center items-center gap-1.5 mt-auto">
                          <CardDomainStatBadge domain={unit.card.domain} type="attack" value={unit.currentPower} size="sm" />
                          <CardDomainStatBadge domain={unit.card.domain} type="defense" value={unit.currentHealth} size="sm" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`player-empty-${slotIdx}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="my-auto flex flex-col items-center"
                      >
                        <Compass size={14} className="text-stone-500 mb-1" />
                        <span className="text-[8px] font-cinzel text-stone-400">Empty Lane #{slotIdx + 1}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Right Slot 6: Player Commander Throne */}
            <div 
              onClick={() => {
                if (player.champion && activePlayer === 'player' && player.champion.canAttack) {
                  onSelectAttacker(selectedAttacker?.instanceId === player.champion.instanceId ? null : player.champion);
                }
              }}
              className={`p-1.5 rounded-xl border-2 flex flex-col justify-between text-center transition-all min-h-[95px] cursor-pointer shadow-lg relative overflow-hidden ${
                selectedAttacker?.instanceId === player.champion?.instanceId
                  ? 'ring-4 ring-rose-500 bg-amber-950 border-rose-400 scale-105 shadow-[0_0_25px_rgba(244,63,94,0.8)]'
                  : player.champion?.canAttack && activePlayer === 'player'
                    ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_18px_rgba(245,158,11,0.6)] hover:border-amber-300'
                    : 'bg-amber-950/60 border-amber-500/70 hover:border-amber-300'
              }`}
            >
              {player.champion?.canAttack && activePlayer === 'player' && (
                <div className="absolute -top-1 -right-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-black text-[7px] font-cinzel font-black uppercase shadow">
                  <Swords size={9} />
                  <span>ATTACK</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-[7.5px] font-cinzel text-amber-300 uppercase font-bold flex items-center gap-1">
                  <Crown size={9} />
                  <span>Commander</span>
                </span>
                {player.champion?.canAttack && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>
              <span className="text-[11px] font-cinzel font-bold text-amber-100 truncate block my-auto">
                {player.champion?.card.name || player.name}
              </span>
              <div className="flex justify-center items-center gap-1.5 mt-auto">
                <CardDomainStatBadge domain={player.champion?.card.domain || 'Sanctuary'} type="attack" value={player.champion?.currentPower || 0} size="sm" />
                <CardDomainStatBadge domain={player.champion?.card.domain || 'Sanctuary'} type="defense" value={player.champion?.currentHealth || player.health} size="sm" />
              </div>
            </div>

            {/* Right Slot 7: Player Armory / Relic Slot with Entry/Exit Animations */}
            <div 
              onClick={() => {
                if (player.weapon && activePlayer === 'player' && player.weapon.canAttack) {
                  onSelectAttacker(selectedAttacker?.instanceId === player.weapon.instanceId ? null : player.weapon);
                }
              }}
              className={`p-1.5 rounded-xl border flex flex-col justify-between text-center transition min-h-[95px] relative overflow-hidden ${
                player.weapon
                  ? selectedAttacker?.instanceId === player.weapon.instanceId
                    ? 'ring-4 ring-rose-500 bg-amber-950 border-rose-400 cursor-pointer'
                    : player.weapon.canAttack && activePlayer === 'player'
                      ? 'bg-stone-900 border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer'
                      : 'bg-stone-900 border-amber-500/50 hover:border-amber-300 cursor-pointer shadow'
                  : 'bg-black/40 border-stone-800 border-dashed text-stone-400'
              }`}
            >
              {player.weapon?.canAttack && activePlayer === 'player' && (
                <div className="absolute -top-1 -right-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-black text-[6.5px] font-cinzel font-black uppercase shadow">
                  <Swords size={8} />
                  <span>ATTACK</span>
                </div>
              )}
              <span className="text-[7.5px] font-cinzel text-amber-300 uppercase font-bold">Armory</span>
              <AnimatePresence mode="wait">
                {player.weapon ? (
                  <motion.div
                    key={player.weapon.instanceId || player.weapon.card.id}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, filter: 'blur(3px)' }}
                    className="space-y-0.5 my-auto"
                  >
                    <span className="text-[10px] font-cinzel font-bold text-stone-100 block truncate">
                      {player.weapon.card.name}
                    </span>
                    <div className="flex justify-center">
                      <CardDomainStatBadge domain={player.weapon.card.domain} type="attack" value={player.weapon.currentPower} size="sm" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.span
                    key="player-weapon-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="text-[8px] font-mono text-stone-400 my-auto"
                  >
                    Empty
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="text-[7px] font-mono text-stone-400">Relic Slot</span>
            </div>
          </div>

          {/* 7 Elemental Socket Gem Bezels (Player) */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 py-1.5 bg-black/40 rounded-xl border border-stone-800/80">
            {ELEMENTAL_SOCKETS.map((elem, idx) => (
              <div 
                key={`player-elem-${idx}`} 
                className="flex flex-col items-center group cursor-pointer"
                title={`${elem.name} Domain Socket`}
              >
                <div 
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs border transition-transform hover:scale-110 shadow-sm ${
                    elem.isCore 
                      ? 'border-amber-300 bg-amber-950/80 ring-1 ring-amber-400/50' 
                      : 'border-stone-700 bg-stone-900/80 hover:border-amber-400'
                  }`}
                  style={{ boxShadow: `0 0 8px ${elem.color}33` }}
                >
                  <span className="text-[10px]">{elem.icon}</span>
                </div>
                <span className="text-[7px] font-cinzel text-stone-400 uppercase mt-0.5 tracking-tighter hidden sm:inline">
                  {elem.name}
                </span>
              </div>
            ))}
          </div>

          {/* Player Identity & End Turn Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-950/80">
            {/* Player Info */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border-2 border-amber-500 flex items-center justify-center text-lg shadow-md">
                🛡️
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-cinzel font-bold text-sm text-amber-100">{player.name}</h4>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700 uppercase font-bold">
                    Player
                  </span>
                </div>
                <span className="text-[10px] font-mono text-stone-400">{player.title}</span>
              </div>
            </div>

            {/* Spendable Essence Crystals & Vitality */}
            <div className="flex items-center gap-3">
              {/* Essence Crystals */}
              <div className="flex items-center gap-1.5 bg-blue-950/80 px-3 py-1.5 rounded-full border border-blue-500/50 shadow-inner">
                <Zap size={14} className="text-blue-400 fill-blue-400" />
                <span className="text-xs font-mono font-bold text-blue-200">
                  {player.essence} / {player.maxEssence} Essence
                </span>
              </div>

              {/* Turn Timer & End Turn Action Group */}
              <div className="flex items-center gap-2">
                {/* Interactive Turn Timer Widget */}
                {turnTimeRemaining !== undefined && (
                  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md transition-all ${
                    turnTimeRemaining <= 15
                      ? 'bg-red-950/90 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                      : turnTimeRemaining <= 30
                        ? 'bg-amber-950/80 border-amber-500/60 text-amber-200'
                        : 'bg-stone-900/80 border-stone-700 text-stone-200'
                  }`}>
                    <Clock size={13} className={turnTimeRemaining <= 15 ? 'text-red-400 animate-spin' : 'text-amber-400'} />
                    <span className="font-mono font-bold text-xs tracking-wider">
                      {turnTimeRemaining}s
                    </span>
                    {onToggleTurnTimerPause && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleTurnTimerPause();
                        }}
                        className="p-0.5 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
                        title={isTimerPaused ? 'Resume Turn Timer' : 'Pause Turn Timer'}
                      >
                        {isTimerPaused ? <Play size={10} className="text-emerald-400" /> : <Pause size={10} />}
                      </button>
                    )}
                  </div>
                )}

                {/* Pass Turn Button - with visual cooldown animation & circular gauge */}
                {activePlayer === 'player' ? (
                  <button
                    onClick={onEndTurn}
                    id="arena-pass-turn-btn"
                    className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black border-2 border-amber-200 shadow-[0_0_24px_rgba(245,158,11,0.6)] active:scale-95 transition-all duration-200 flex items-center gap-2"
                  >
                    {/* Animated cooldown sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    {/* Timer progress bar fill along bottom of button */}
                    {turnTimeRemaining !== undefined && turnTimeLimit && (
                      <div 
                        className="absolute bottom-0 left-0 h-1 bg-black/50 transition-all duration-1000"
                        style={{ width: `${Math.max(0, Math.min(100, (turnTimeRemaining / turnTimeLimit) * 100))}%` }}
                      />
                    )}

                    {/* Circular cooldown timer indicator */}
                    <div className="relative w-4 h-4 rounded-full border border-black/40 flex items-center justify-center shrink-0">
                      <div 
                        className="w-2.5 h-2.5 rounded-full bg-black/80 transition-transform duration-500"
                        style={{ 
                          transform: `scale(${turnTimeRemaining !== undefined && turnTimeLimit ? Math.max(0.2, turnTimeRemaining / turnTimeLimit) : 1})`
                        }}
                      />
                    </div>

                    <span className="font-cinzel font-black text-xs uppercase tracking-widest">
                      Pass Turn
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="px-4 py-2 rounded-xl bg-stone-900 border border-purple-500/40 text-purple-300 flex items-center gap-2 text-xs font-cinzel font-bold">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
                    <span>Enemy Turn...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. MOMENTUM PIPELINE & SOVEREIGN LIFE ORBS */}
        {/* ========================================================================= */}
        <div className="relative p-3 rounded-2xl bg-stone-950/95 border border-amber-500/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Sovereign Life Orb: Player Life */}
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-full border-2 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_22px_rgba(245,158,11,0.7)] overflow-hidden group bg-stone-950">
              {/* Radial Domain Sun Gold Core */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #fef08a 0%, #f59e0b 35%, #78350f 70%, #0c0a09 100%)'
                }}
              />
              {/* Glass Reflection Arc */}
              <div className="absolute top-1 inset-x-2 h-3.5 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              <span className="relative z-10 text-[8px] font-cinzel text-amber-100 font-bold uppercase tracking-widest drop-shadow-[0_1px_2px_#000]">LIFE</span>
              <span className="relative z-10 text-lg font-mono font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{player.health}</span>
            </div>
            <div>
              <span className="text-[11px] font-cinzel text-amber-300 font-bold block uppercase tracking-wide">Player Sovereign</span>
              <span className="text-[9.5px] font-mono text-stone-300">
                Shield: {player.shield > 0 ? `+${player.shield}` : '0'} 🛡️
              </span>
            </div>
          </div>

          {/* Center Momentum Pipeline Trough */}
          <div className="flex-1 max-w-xl px-3 py-2 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col items-center gap-1.5">
            <div className="flex items-center justify-between w-full text-[10px] font-mono">
              <span className="text-amber-400 font-cinzel font-bold flex items-center gap-1">
                <Flame size={12} className="fill-amber-400" />
                <span>MOMENTUM PIPELINE: {playerMomentum} / 12</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-300">Stash: {kineticStash} pts</span>
                <span className="text-stone-400">Base: {baseMomentum}</span>
              </div>
            </div>

            {/* Pipeline of Glowing Diamond Energy Pips (16 Pips) */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full py-1">
              {Array.from({ length: 16 }).map((_, pipIdx) => {
                const isLit = pipIdx < playerMomentum;
                return (
                  <div
                    key={`pipeline-pip-${pipIdx}`}
                    className={`w-2.5 h-3.5 sm:w-3 sm:h-4 transform rotate-45 rounded-[1px] transition-all duration-300 border ${
                      isLit
                        ? 'bg-gradient-to-br from-cyan-300 to-blue-500 border-cyan-200 shadow-[0_0_8px_#38bdf8] scale-105'
                        : 'bg-stone-950 border-stone-800 opacity-40'
                    }`}
                  />
                );
              })}
            </div>

            {/* Die Rolling & Conversion Controls */}
            <div className="flex flex-wrap items-center justify-between w-full gap-2 pt-1 border-t border-stone-800 text-[10px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-stone-400">Die:</span>
                <button
                  onClick={() => setDiceType('d6')}
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${diceType === 'd6' ? 'bg-amber-500 text-black' : 'text-stone-400 hover:text-white'}`}
                >
                  D6
                </button>
                <button
                  onClick={() => setDiceType('d12')}
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${diceType === 'd12' ? 'bg-amber-500 text-black' : 'text-stone-400 hover:text-white'}`}
                >
                  D12
                </button>
                <button
                  onClick={onRollDice}
                  disabled={hasRolledDiceThisTurn || activePlayer !== 'player'}
                  className="ml-1 px-2.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-black font-cinzel font-bold text-[9.5px] flex items-center gap-1 disabled:opacity-40"
                >
                  <Dices size={11} />
                  <span>{hasRolledDiceThisTurn ? `+${lastDiceRoll} Rolled` : `Roll ${diceType.toUpperCase()}`}</span>
                </button>
              </div>

              {playerMomentum > 0 && activePlayer === 'player' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onConvertMomentum('stash')}
                    className="px-2 py-0.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-[9.5px]"
                  >
                    +Stash ({playerMomentum})
                  </button>
                  <button
                    onClick={() => onConvertMomentum('shield')}
                    className="px-2 py-0.5 rounded bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-[9.5px]"
                  >
                    +Shield (+{playerMomentum * 2})
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sovereign Life Orb: Opponent Life */}
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[11px] font-cinzel text-purple-300 font-bold block uppercase tracking-wide text-right">Titan Sovereign</span>
              <span className="text-[9.5px] font-mono text-stone-300 text-right block">
                Essence: {opponent.essence}/{opponent.maxEssence} ⚡
              </span>
            </div>
            <div className="relative w-16 h-16 rounded-full border-2 border-purple-400 flex flex-col items-center justify-center shadow-[0_0_22px_rgba(168,85,247,0.7)] overflow-hidden group bg-stone-950">
              {/* Radial Domain Void Amethyst Core */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #e9d5ff 0%, #9333ea 35%, #581c87 70%, #0c0a09 100%)'
                }}
              />
              {/* Glass Reflection Arc */}
              <div className="absolute top-1 inset-x-2 h-3.5 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              <span className="relative z-10 text-[8px] font-cinzel text-purple-100 font-bold uppercase tracking-widest drop-shadow-[0_1px_2px_#000]">LIFE</span>
              <span className="relative z-10 text-lg font-mono font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{opponent.health}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Turn Inspector & Rulebook Chronology Modal */}
      <TurnInspectorModal
        isOpen={isTurnInspectorOpen}
        onClose={() => setIsTurnInspectorOpen(false)}
        turnCount={turnCount}
        currentPhase={phase as GamePhase}
        activePlayer={activePlayer}
        playerEssence={player.essence}
        playerMaxEssence={player.maxEssence}
        playerMomentum={playerMomentum}
        kineticStash={kineticStash}
        lastDiceRoll={lastDiceRoll}
        activeHazardName={activeHazard?.name || 'Clear Skies'}
      />
    </div>
  );
};
