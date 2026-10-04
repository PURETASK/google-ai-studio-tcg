import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Shield, 
  Sword, 
  Zap, 
  Heart, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Crosshair, 
  Dices,
  Play,
  RotateCcw,
  Target,
  Activity,
  ArrowRight
} from 'lucide-react';
import { CardItem } from './CardItem';
import { CARDS_DATABASE } from '../data/cards';
import { InteractiveRulebook } from './InteractiveRulebook';
import { MechanicsEncyclopedia } from './MechanicsEncyclopedia';

interface NexusTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'walkthrough' | 'turnloop' | 'handsetting' | 'diceandmomentum' | 'rulebook' | 'sandbox' | 'glossary' | 'encyclopedia';
  initialRulebookSection?: 'matrix' | 'lanes' | 'foils' | 'attunement' | 'phases';
}

interface TutorialStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  content: string;
  keyRules: string[];
  tacticalTip: string;
  visualPreviewType: 'zones' | 'essence' | 'card-types' | 'combat' | 'keywords' | 'puzzle';
  deepDiveSection?: 'matrix' | 'lanes' | 'foils' | 'attunement' | 'phases';
  deepDiveLabel?: string;
}

export const NexusTutorialModal: React.FC<NexusTutorialModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'walkthrough',
  initialRulebookSection = 'matrix'
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'turnloop' | 'handsetting' | 'diceandmomentum' | 'rulebook' | 'sandbox' | 'glossary' | 'encyclopedia'>(initialTab);
  const [rulebookSection, setRulebookSection] = useState<'matrix' | 'lanes' | 'foils' | 'attunement' | 'phases'>(initialRulebookSection);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [isEncyclopediaDrawerOpen, setIsEncyclopediaDrawerOpen] = useState(false);

  // 1. Turn Loop Simulator State
  const [activeTurnPhase, setActiveTurnPhase] = useState<number>(1);
  const [turnLoopTurnNumber, setTurnLoopTurnNumber] = useState<number>(3);
  const [turnLoopMomentum, setTurnLoopMomentum] = useState<number>(3);
  const [turnLoopEssence, setTurnLoopEssence] = useState<number>(4);
  const [turnLoopDiceResult, setTurnLoopDiceResult] = useState<number | null>(null);
  const [turnLoopLogs, setTurnLoopLogs] = useState<string[]>([
    'Dawn Phase: Hazard pulse evaluated first. Weather is active.'
  ]);

  // 2. 11-7 Hand Setting State
  const INITIAL_11_CARDS = [
    { id: 'c1', name: 'Sol-Thar Vanguard', type: 'Champion', domain: 'Sanctuary', cost: 3 },
    { id: 'c2', name: 'Aegis Halo Ward', type: 'Spell', domain: 'Sanctuary', cost: 2 },
    { id: 'c3', name: 'Sunforged Warblade', type: 'Weapon', domain: 'Sanctuary', cost: 4 },
    { id: 'c4', name: 'Molten Berserker', type: 'Beast', domain: 'Radiance', cost: 2 },
    { id: 'c5', name: 'Volcanic Fissure', type: 'Spell', domain: 'Radiance', cost: 4 },
    { id: 'c6', name: 'Sporeling Swarm', type: 'Beast', domain: 'Verdance', cost: 1 },
    { id: 'c7', name: 'Primeval Treant', type: 'Champion', domain: 'Verdance', cost: 6 },
    { id: 'c8', name: 'Chrono Stasis Orb', type: 'Spell', domain: 'Arcane', cost: 3 },
    { id: 'c9', name: 'Astral Warp Portal', type: 'Relic', domain: 'Arcane', cost: 5 },
    { id: 'c10', name: 'Soul Siphon Touch', type: 'Spell', domain: 'Abyss', cost: 3 },
    { id: 'c11', name: 'Undead Dreadknight', type: 'Champion', domain: 'Abyss', cost: 7 }
  ];

  const [handCards, setHandCards] = useState(INITIAL_11_CARDS);
  const [lockedSoulbound, setLockedSoulbound] = useState<string[]>([]);
  const [discardedBoneyard, setDiscardedBoneyard] = useState<string[]>([]);
  const [opponentExiledVoid, setOpponentExiledVoid] = useState<string[]>([]);
  const [handSettingStep, setHandSettingStep] = useState<1 | 2 | 3 | 4>(1); // 1: Lock 2, 2: Discard 2, 3: Opponent Exiles 2, 4: Final 7-card Hand

  // 3. Momentum & Dice Roller State
  const [momentumTurn, setMomentumTurn] = useState<number>(3);
  const [diceType, setDiceType] = useState<'d6' | 'd12'>('d6');
  const [rolledDieValue, setRolledDieValue] = useState<number | null>(null);
  const [totalCalculatedMomentum, setTotalCalculatedMomentum] = useState<number>(3);
  const [isRollingDice, setIsRollingDice] = useState<boolean>(false);
  const [duskStashType, setDuskStashType] = useState<'kinetic' | 'shield'>('kinetic');
  const [duskConvertedValue, setDuskConvertedValue] = useState<number>(0);

  // Sandbox Puzzle State
  const [puzzleState, setPuzzleState] = useState<{
    playerHp: number;
    playerEssence: number;
    playerShield: number;
    enemyHp: number;
    enemyGuardHp: number;
    actionsTaken: string[];
    isSolved: boolean;
  }>({
    playerHp: 18,
    playerEssence: 5,
    playerShield: 0,
    enemyHp: 10,
    enemyGuardHp: 4,
    actionsTaken: [],
    isSolved: false
  });

  if (!isOpen) return null;

  const handleDeepDive = (section: 'matrix' | 'lanes' | 'foils' | 'attunement' | 'phases') => {
    setRulebookSection(section);
    setActiveTab('rulebook');
  };

  // Momentum Roll Handler
  const handleRollMomentumDie = () => {
    setIsRollingDice(true);
    setTimeout(() => {
      const max = diceType === 'd6' ? 6 : 12;
      const roll = Math.floor(Math.random() * max) + 1;
      const total = Math.min(12, momentumTurn + roll);
      setRolledDieValue(roll);
      setTotalCalculatedMomentum(total);
      setIsRollingDice(false);
    }, 400);
  };

  const handleConvertDuskMomentum = (unspent: number) => {
    if (duskStashType === 'kinetic') {
      setDuskConvertedValue(Math.floor(unspent / 2));
    } else {
      setDuskConvertedValue(unspent * 2);
    }
  };

  // 11-7 Hand Setting Card Selection
  const handleCardClickInHandSetting = (cardId: string) => {
    if (handSettingStep === 1) {
      if (lockedSoulbound.includes(cardId)) {
        setLockedSoulbound(lockedSoulbound.filter(id => id !== cardId));
      } else if (lockedSoulbound.length < 2) {
        const updated = [...lockedSoulbound, cardId];
        setLockedSoulbound(updated);
        if (updated.length === 2) {
          setHandSettingStep(2);
        }
      }
    } else if (handSettingStep === 2) {
      if (lockedSoulbound.includes(cardId)) return;
      if (discardedBoneyard.includes(cardId)) {
        setDiscardedBoneyard(discardedBoneyard.filter(id => id !== cardId));
      } else if (discardedBoneyard.length < 2) {
        const updated = [...discardedBoneyard, cardId];
        setDiscardedBoneyard(updated);
        if (updated.length === 2) {
          // Auto pick 2 random opponent exiles from remaining
          const remaining = handCards.filter(c => !lockedSoulbound.includes(c.id) && !updated.includes(c.id));
          const exile1 = remaining[0]?.id;
          const exile2 = remaining[1]?.id;
          const exiles = [exile1, exile2].filter(Boolean) as string[];
          setOpponentExiledVoid(exiles);
          setHandSettingStep(3);
        }
      }
    }
  };

  const handleResetHandSetting = () => {
    setLockedSoulbound([]);
    setDiscardedBoneyard([]);
    setOpponentExiledVoid([]);
    setHandSettingStep(1);
  };

  const TUTORIAL_STEPS: TutorialStep[] = [
    {
      stepNumber: 1,
      title: 'Match Objective & Victory Condition',
      subtitle: 'How to conquer the battlefield in Realm of Nexus',
      badge: 'Core Rule #1',
      icon: <Heart className="text-red-400" size={24} />,
      content: 'Both players start with 30 Vitality (Health). Your absolute goal is to reduce the enemy Commander’s Vitality to 0 before they eliminate yours. Vitality is protected by active Vanguard Guardians and magical Shields.',
      keyRules: [
        'Each Commander begins with 30 Health.',
        'Shield absorbs incoming damage before your true Health is touched.',
        'If a Commander reaches 0 HP at any time, that player is immediately defeated.'
      ],
      tacticalTip: 'Shield points are non-permanent life buffers that expire when depleted. Always cast protective spells before taking lethal combat rounds.',
      visualPreviewType: 'zones',
      deepDiveSection: 'phases',
      deepDiveLabel: 'Deep-Dive Turn & Phase Resolution'
    },
    {
      stepNumber: 2,
      title: 'Essence Economy & Turn Energy',
      subtitle: 'The primordial resource powering all summons and incantations',
      badge: 'Resource Loop',
      icon: <Zap className="text-blue-400" size={24} />,
      content: 'Every card in Realm of Nexus requires Essence to cast (indicated in the glowing top-left gem). On Turn 1, you begin with 2 Max Essence. At the start of each of your subsequent turns, your Max Essence increases by +1 (up to 10), and your Essence pool is completely refilled.',
      keyRules: [
        'Turn 1 starts at 2 Max Essence; grows to 10 by Turn 9.',
        'Unspent Essence does not carry over between turns (use it or lose it).',
        'Powerful Mythic and Divine cards cost 7-10 Essence and serve as game-ending win conditions.'
      ],
      tacticalTip: 'Construct your deck with a balanced "Essence Curve" (lots of 2-4 cost cards for early tempo, with a few 7+ cost titans for late game).',
      visualPreviewType: 'essence'
    },
    {
      stepNumber: 3,
      title: 'Game Zones & Tactical Slot Positions',
      subtitle: 'Understanding the 5 distinct zones of the Nexus Arena board',
      badge: 'Board Layout',
      icon: <Layers className="text-amber-400" size={24} />,
      content: 'The battleground is divided into distinct operational zones engineered for strategic positioning: Commander Throne, Vanguard Frontline, Armory / Relic slot, Reserve Hand, and Boneyard (Graveyard).',
      keyRules: [
        'Commander Throne: Holds your deck’s chief Titan/Champion with baseline stats.',
        'Vanguard Frontline (3 Slots): Holds up to 3 Beast or Champion Guardian units.',
        'Armory Slot: Equips active Weapons, Relics, and Armor attachments that grant bonus attack or reactive abilities.',
        'Boneyard (Graveyard): Holds spent spells and defeated guardians.'
      ],
      tacticalTip: 'Keeping all 3 Vanguard slots filled prevents your Commander from being targeted by standard physical attacks.',
      visualPreviewType: 'zones',
      deepDiveSection: 'lanes',
      deepDiveLabel: 'Deep-Dive 3-Lane Mechanics & Positioning'
    },
    {
      stepNumber: 4,
      title: 'Vanguard Defense & Combat Priority',
      subtitle: 'Guard mechanics, summoning sickness, and attacking',
      badge: 'Combat Mechanics',
      icon: <Sword className="text-orange-400" size={24} />,
      content: 'Newly summoned units suffer from "Summoning Sickness" during their first turn and cannot attack until your next turn. Units on the Vanguard Frontline intercept physical strikes. You must destroy all enemy Vanguard Guards before directly attacking the enemy Commander (unless using spells or Pierce abilities).',
      keyRules: [
        'Guards must be eliminated before standard units can strike the enemy Commander.',
        'When two units clash in combat, both deal damage to each other simultaneously.',
        'Units with higher Speed attack first in mutual death clashes.'
      ],
      tacticalTip: 'Spells (like Molten Eruption or Soulstorm) bypass physical Vanguard defenders to strike the enemy Commander directly!',
      visualPreviewType: 'combat',
      deepDiveSection: 'matrix',
      deepDiveLabel: 'Deep-Dive 5-Axis Tactical Matrix'
    },
    {
      stepNumber: 5,
      title: 'Card Types & Attunement Relics',
      subtitle: 'Champions, Beasts, Weapons, Relics, Armor, and Spells',
      badge: 'Card Arsenal',
      icon: <Sparkles className="text-purple-400" size={24} />,
      content: 'Cards in Realm of Nexus belong to 6 foundational classifications. Relics and Weapons attach to your armory slot, while Spells resolve their effects instantly and move to the Boneyard.',
      keyRules: [
        'Champions: Powerful named heroes with passive, active, and ultimate skills.',
        'Beasts: Agile frontline creatures that provide status debuffs or life sustain.',
        'Weapons & Relics: Permanent equipment augmenting your active attack output.',
        'Spells: Instant tactical impacts (direct burn, holy shields, void exiles).'
      ],
      tacticalTip: 'Certain Very Rare and Legendary items require Attunement by specific domains to unlock secondary passive bonuses.',
      visualPreviewType: 'card-types',
      deepDiveSection: 'attunement',
      deepDiveLabel: 'Deep-Dive Attunement & Divine Ranks'
    },
    {
      stepNumber: 6,
      title: 'Status Effects & Keywords Reference',
      subtitle: 'Mastering combat states: Burn, Corrosion, Shield, and Taunt',
      badge: 'Status Rules',
      icon: <Flame className="text-red-400" size={24} />,
      content: 'Combat interactions often apply persistent tactical statuses. Understanding these debuffs allows you to dismantle enemy formations over time.',
      keyRules: [
        '🔥 Burn: Target takes 2 Fire damage at the start of each turn.',
        '🧪 Corrosion / Poison: Target takes ramping damage and suffers -1 Attack per turn.',
        '🛡️ Shield: Absorbs all incoming damage up to its point value before breaking.',
        '⚡ Stun / Restrained: Unit cannot attack or use active abilities for 1 turn.'
      ],
      tacticalTip: 'Use Verdant cleansing abilities (like MriG’s Flower Blessing) to immediately purge all poison and burn from your board.',
      visualPreviewType: 'keywords',
      deepDiveSection: 'foils',
      deepDiveLabel: 'Deep-Dive Holographic Foil Finishes'
    }
  ];

  const currentStep = TUTORIAL_STEPS[currentStepIdx];

  // Sandbox Puzzle Handlers
  const handleCastSpellPuzzle = () => {
    if (puzzleState.playerEssence < 3 || puzzleState.isSolved) return;
    const newEnemyGuardHp = Math.max(0, puzzleState.enemyGuardHp - 4);
    const newActions = [...puzzleState.actionsTaken, '✨ Cast Magma Deluge: Dealt 4 DMG to Guard (Guard Destroyed!)'];
    
    setPuzzleState(prev => ({
      ...prev,
      playerEssence: prev.playerEssence - 3,
      enemyGuardHp: newEnemyGuardHp,
      actionsTaken: newActions
    }));
  };

  const handleAttackCommanderPuzzle = () => {
    if (puzzleState.enemyGuardHp > 0) {
      setPuzzleState(prev => ({
        ...prev,
        actionsTaken: [...prev.actionsTaken, '⚠️ Blocked! Enemy Vanguard Guard is protecting the Commander!']
      }));
      return;
    }
    if (puzzleState.isSolved) return;

    const newEnemyHp = Math.max(0, puzzleState.enemyHp - 10);
    const solved = newEnemyHp === 0;

    setPuzzleState(prev => ({
      ...prev,
      enemyHp: newEnemyHp,
      isSolved: solved,
      actionsTaken: [...prev.actionsTaken, '⚔️ Struck Commander Direct with Warpick: Dealt 10 DMG (Victory achieved!)']
    }));
  };

  const handleShieldPuzzle = () => {
    if (puzzleState.playerEssence < 2 || puzzleState.isSolved) return;
    setPuzzleState(prev => ({
      ...prev,
      playerEssence: prev.playerEssence - 2,
      playerShield: prev.playerShield + 6,
      actionsTaken: [...prev.actionsTaken, '🛡️ Cast Raise Aegis: Gained +6 Shield!']
    }));
  };

  const handleResetPuzzle = () => {
    setPuzzleState({
      playerHp: 18,
      playerEssence: 5,
      playerShield: 0,
      enemyHp: 10,
      enemyGuardHp: 4,
      actionsTaken: [],
      isSolved: false
    });
  };

  const KEYWORDS_GLOSSARY = [
    { name: 'Taunt / Guard', desc: 'Must be targeted by standard physical attacks before the Commander or backline can be damaged.' },
    { name: 'Burn (X)', desc: 'Afflicted card takes X fire damage at the beginning of each turn until cleansed or extinguished.' },
    { name: 'Corrosion (X)', desc: 'Abyssal and Verdant poison that shreds X armor each turn and deals direct essence decay.' },
    { name: 'Pierce', desc: 'Attacks and spells ignore physical shields and defenses to directly damage target Vitality.' },
    { name: 'Attunement', desc: 'Item or Relic unlocks bonus passive abilities if your deck domain matches the required alignment.' },
    { name: 'Ascended / Divine Rank', desc: 'God-tier card status (Rank 1-5). Immune to standard crowd control and low-cost removal spells.' },
    { name: 'Life Drain', desc: 'Heals your own Commander for a percentage of the damage inflicted upon enemy targets.' },
    { name: 'Summoning Sickness', desc: 'Units cannot make physical attacks on the exact turn they are summoned to the battlefield.' }
  ];

  const filteredGlossary = KEYWORDS_GLOSSARY.filter(k => 
    k.name.toLowerCase().includes(glossarySearch.toLowerCase()) || 
    k.desc.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="max-w-4xl w-full bg-stone-900 border-2 border-amber-500/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border-b border-amber-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-md">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="font-cinzel font-black text-lg sm:text-xl text-amber-100 flex items-center gap-2">
                <span>NEXUS TCG HOW TO PLAY & RULES MASTERCLASS</span>
              </h2>
              <p className="text-xs text-stone-400 font-mono">
                Official Codex of Gameplay, Zones, Turn Timing & Tactical Mechanics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEncyclopediaDrawerOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/25 via-stone-800 to-amber-950/40 border border-amber-500/60 hover:border-amber-400 text-amber-300 hover:text-amber-100 text-xs font-cinzel font-bold flex items-center gap-1.5 shadow-md transition group"
            >
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">Side-Drawer</span>
              <span>Encyclopedia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/30">
                Search
              </span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="px-6 py-2.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('walkthrough')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'walkthrough'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60'
              }`}
            >
              <Compass size={14} />
              <span>Guided Rules Tour ({currentStepIdx + 1}/{TUTORIAL_STEPS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('encyclopedia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'encyclopedia'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60'
              }`}
            >
              <BookOpen size={14} />
              <span>Mechanics Encyclopedia</span>
            </button>

            <button
              onClick={() => setActiveTab('turnloop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'turnloop'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60'
              }`}
            >
              <RotateCcw size={14} />
              <span>6-Phase Turn Loop</span>
            </button>

            <button
              onClick={() => setActiveTab('handsetting')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'handsetting'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60'
              }`}
            >
              <Layers size={14} />
              <span>11-7 Hand Setting Draft</span>
            </button>

            <button
              onClick={() => setActiveTab('diceandmomentum')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'diceandmomentum'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60'
              }`}
            >
              <Dices size={14} />
              <span>Momentum & Dice Roller</span>
            </button>

            <button
              onClick={() => setActiveTab('rulebook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'rulebook'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60'
              }`}
            >
              <BookOpen size={14} />
              <span>Systems Codex</span>
            </button>

            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'sandbox'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60'
              }`}
            >
              <Target size={14} />
              <span>Practice Sandbox</span>
            </button>

            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'glossary'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60'
              }`}
            >
              <HelpCircle size={14} />
              <span>Glossary</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-amber-400/80 hidden sm:inline shrink-0">
            Tournament Matrix v2.5
          </span>
        </div>

        {/* Modal Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'walkthrough' && (
            <div className="space-y-6">
              
              {/* Step Progress Pill Bar */}
              <div className="flex gap-2 justify-between">
                {TUTORIAL_STEPS.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    onClick={() => setCurrentStepIdx(idx)}
                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                      idx === currentStepIdx
                        ? 'bg-amber-400 shadow-[0_0_10px_rgba(234,179,8,0.6)]'
                        : idx < currentStepIdx
                          ? 'bg-amber-600/60'
                          : 'bg-stone-800'
                    }`}
                  />
                ))}
              </div>

              {/* Step Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left Side: Step Narrative & Rules (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                      {currentStep.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-400 font-bold block">
                        {currentStep.badge} • Step {currentStep.stepNumber} of {TUTORIAL_STEPS.length}
                      </span>
                      <h3 className="font-cinzel font-black text-xl text-amber-100">
                        {currentStep.title}
                      </h3>
                      <p className="text-xs text-stone-400 font-mono mt-0.5">
                        {currentStep.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-stone-200 leading-relaxed bg-stone-950/60 p-4 rounded-xl border border-stone-800">
                    {currentStep.content}
                  </p>

                  {/* Key Rules Checklist */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-cinzel uppercase tracking-wider text-amber-300 font-bold block">
                      Core Regulations
                    </span>
                    <div className="space-y-1.5">
                      {currentStep.keyRules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-300 bg-stone-950/40 p-2 rounded-lg border border-stone-800/80">
                          <CheckCircle2 size={15} className="text-green-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tactical Pro-Tip */}
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-2.5">
                    <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-cinzel font-bold uppercase text-amber-300 block">
                        Tactical Master Tip
                      </span>
                      <p className="text-xs text-stone-200 mt-0.5">
                        {currentStep.tacticalTip}
                      </p>
                    </div>
                  </div>

                  {/* Deep-Dive into Specific Rulebook System CTA */}
                  {currentStep.deepDiveSection && (
                    <button
                      onClick={() => handleDeepDive(currentStep.deepDiveSection!)}
                      className="w-full p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-stone-900 to-amber-950/40 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-cinzel text-xs font-bold flex items-center justify-between transition group shadow-md"
                    >
                      <span className="flex items-center gap-2">
                        <Target size={14} className="text-amber-400" />
                        <span>{currentStep.deepDiveLabel || 'Deep-Dive into System Codex'}</span>
                      </span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Right Side: Visual Graphic Representation (5 cols) */}
                <div className="md:col-span-5 bg-stone-950 p-4 rounded-2xl border border-amber-500/30 space-y-4">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider text-stone-400 block text-center">
                    Visual Demonstration
                  </span>

                  {currentStep.visualPreviewType === 'zones' && (
                    <div className="space-y-2 text-center text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-600/50">
                        <span className="text-purple-300 font-bold block text-[10px]">ENEMY COMMANDER & VANGUARD</span>
                        <div className="flex justify-center gap-2 mt-1.5">
                          <div className="w-10 h-12 rounded bg-purple-900/60 border border-purple-400 flex items-center justify-center text-[10px]">👑</div>
                          <div className="w-10 h-12 rounded bg-purple-900/40 border border-stone-700 flex items-center justify-center text-[9px]">G1</div>
                          <div className="w-10 h-12 rounded bg-purple-900/40 border border-stone-700 flex items-center justify-center text-[9px]">G2</div>
                          <div className="w-10 h-12 rounded bg-purple-900/40 border border-stone-700 flex items-center justify-center text-[9px]">G3</div>
                        </div>
                      </div>

                      <div className="py-2 flex items-center justify-center gap-2 text-amber-400 text-[10px] font-cinzel border-y border-stone-800">
                        <Sword size={12} />
                        <span>CENTRAL CLASH & HAZARD RIFT</span>
                        <Shield size={12} />
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-600/50">
                        <div className="flex justify-center gap-2 mb-1.5">
                          <div className="w-10 h-12 rounded bg-amber-900/40 border border-amber-500/60 flex items-center justify-center text-[9px]">G1</div>
                          <div className="w-10 h-12 rounded bg-amber-900/40 border border-amber-500/60 flex items-center justify-center text-[9px]">G2</div>
                          <div className="w-10 h-12 rounded bg-amber-900/40 border border-amber-500/60 flex items-center justify-center text-[9px]">G3</div>
                          <div className="w-10 h-12 rounded bg-amber-900/60 border border-amber-400 flex items-center justify-center text-[10px]">👑</div>
                        </div>
                        <span className="text-amber-300 font-bold block text-[10px]">YOUR VANGUARD & COMMANDER</span>
                      </div>
                    </div>
                  )}

                  {currentStep.visualPreviewType === 'essence' && (
                    <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mana) => (
                          <div
                            key={mana}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold border transition ${
                              mana <= 4
                                ? 'bg-blue-500 text-black border-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                                : 'bg-stone-900 text-stone-400 border-stone-800'
                            }`}
                          >
                            {mana}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-blue-200 font-mono">
                        Turn 3 Example: 4 Available Essence Crystals
                      </p>
                      <div className="p-2 rounded bg-stone-900 text-[11px] text-stone-300">
                        Cast a 3-cost Warpick ➡️ 1 Essence remaining for defense!
                      </div>
                    </div>
                  )}

                  {currentStep.visualPreviewType === 'combat' && (
                    <div className="space-y-3 p-3 rounded-xl bg-orange-950/20 border border-orange-500/30 text-xs">
                      <div className="flex items-center justify-between p-2 rounded bg-stone-900 border border-stone-800">
                        <span>Attacker: <strong>Magma Serpent</strong></span>
                        <span className="text-red-400 font-mono font-bold">⚔️ 7 ATK</span>
                      </div>
                      <div className="text-center font-mono text-[10px] text-amber-400">⚡ CLASH ⚡</div>
                      <div className="flex items-center justify-between p-2 rounded bg-stone-900 border border-stone-800">
                        <span>Defender: <strong>Verdant Stag</strong></span>
                        <span className="text-blue-400 font-mono font-bold">🛡️ 6 HP (Takes 7 = Defeated)</span>
                      </div>
                    </div>
                  )}

                  {currentStep.visualPreviewType === 'card-types' && (
                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-cinzel">
                      <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/40">
                        <span className="text-amber-300 block font-bold">👑 CHAMPION</span>
                        <span className="text-stone-400 font-sans text-[9px]">Hero Leader</span>
                      </div>
                      <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/40">
                        <span className="text-red-300 block font-bold">⚔️ WEAPON</span>
                        <span className="text-stone-400 font-sans text-[9px]">Armory Attack</span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                        <span className="text-emerald-300 block font-bold">🐾 BEAST</span>
                        <span className="text-stone-400 font-sans text-[9px]">Vanguard Guard</span>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/40">
                        <span className="text-purple-300 block font-bold">✨ SPELL</span>
                        <span className="text-stone-400 font-sans text-[9px]">Instant Burst</span>
                      </div>
                    </div>
                  )}

                  {currentStep.visualPreviewType === 'keywords' && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2 rounded bg-red-950/40 border border-red-800/60 flex items-center justify-between">
                        <span className="text-red-300">🔥 Burn Stacks</span>
                        <span className="text-red-400 font-bold">-2 HP/Turn</span>
                      </div>
                      <div className="p-2 rounded bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
                        <span className="text-emerald-300">🧪 Corrosion</span>
                        <span className="text-emerald-400 font-bold">-1 ATK, -2 HP</span>
                      </div>
                      <div className="p-2 rounded bg-blue-950/40 border border-blue-800/60 flex items-center justify-between">
                        <span className="text-blue-300">🛡️ Divine Aegis</span>
                        <span className="text-blue-400 font-bold">+8 Shield</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Step Navigators */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      disabled={currentStepIdx === 0}
                      onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-cinzel flex items-center gap-1 disabled:opacity-30"
                    >
                      <ChevronLeft size={14} />
                      <span>Prev</span>
                    </button>

                    <span className="text-xs font-mono text-stone-400">
                      {currentStepIdx + 1} / {TUTORIAL_STEPS.length}
                    </span>

                    <button
                      disabled={currentStepIdx === TUTORIAL_STEPS.length - 1}
                      onClick={() => setCurrentStepIdx(prev => Math.min(TUTORIAL_STEPS.length - 1, prev + 1))}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-cinzel font-bold flex items-center gap-1 disabled:opacity-30"
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 1. INTERACTIVE 6-PHASE TURN LOOP ================= */}
          {activeTab === 'turnloop' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-cinzel text-amber-400 uppercase tracking-wider font-bold block">
                    Phase-by-Phase Interactive Life Cycle
                  </span>
                  <h3 className="font-cinzel font-black text-lg text-amber-100">
                    The 6-Phase Turn Loop Engine
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Step through the authoritative turn sequence. Notice how Planar Hazards pulse FIRST at Dawn, followed by Inspiration draw, Ascension momentum scaling, Main deployments, 3-Lane Clash, and Dusk conversion.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-400">Sim Turn:</span>
                  <select
                    value={turnLoopTurnNumber}
                    onChange={(e) => {
                      const t = Number(e.target.value);
                      setTurnLoopTurnNumber(t);
                      setTurnLoopMomentum(t);
                      setTurnLoopEssence(Math.min(10, t + 1));
                    }}
                    className="bg-stone-900 border border-stone-800 text-amber-300 font-mono text-xs rounded px-2 py-1"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                      <option key={n} value={n}>Turn {n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 6 Phases Step Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { phase: 1, name: '1. Dawn', icon: '🌅', desc: 'Hazard Pulse First & Untap' },
                  { phase: 2, name: '2. Inspiration', icon: '🃏', desc: 'Draw 1 Main Card' },
                  { phase: 3, name: '3. Ascension', icon: '⚡', desc: `+1 Base M (${turnLoopTurnNumber}) + Dice Roll` },
                  { phase: 4, name: '4. Main', icon: '⚔️', desc: 'Deploy & 1-Turn Hazards' },
                  { phase: 5, name: '5. Clash', icon: '💥', desc: '3-Lane Combat & Retribution' },
                  { phase: 6, name: '6. Dusk', icon: '🌙', desc: 'Momentum Convert & Hand 7' }
                ].map((p) => {
                  const isActive = activeTurnPhase === p.phase;
                  return (
                    <button
                      key={p.phase}
                      onClick={() => {
                        setActiveTurnPhase(p.phase);
                        if (p.phase === 3) {
                          const roll = Math.floor(Math.random() * 6) + 1;
                          setTurnLoopDiceResult(roll);
                          setTurnLoopLogs(prev => [`Ascension Phase: Turn ${turnLoopTurnNumber} base + rolled ${roll} = ${Math.min(12, turnLoopTurnNumber + roll)} Momentum!`, ...prev]);
                        } else if (p.phase === 6) {
                          setTurnLoopLogs(prev => [`Dusk Phase: Discard down to 7 cards. Unspent Momentum stashed into Kinetic Reserve.`, ...prev]);
                        }
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-lg scale-105'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      <div className="text-lg">{p.icon}</div>
                      <div className="font-cinzel font-bold text-xs mt-1">{p.name}</div>
                      <div className="text-[9px] text-stone-400 font-mono mt-0.5 line-clamp-1">{p.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Phase Detailed Explainer */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col gap-3">
                {activeTurnPhase === 1 && (
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-amber-300">Phase 1: Dawn Phase (Upkeep & Hazard Pulse)</h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      <strong>Critical Timing Rule:</strong> Active Planar Hazards and telegraphed hazards from the Forecast Zone trigger <strong>FIRST</strong> before any player actions. Units in burning lanes take environmental damage, weather pulses apply, and all exhausted guardians and weapons untap.
                    </p>
                    <div className="mt-3 p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono text-amber-400">
                      ⚡ <strong>Brace Action Window:</strong> If holding open Momentum from the previous turn, you may trigger a [Brace] reaction now to reduce incoming hazard damage by 50%.
                    </div>
                  </div>
                )}

                {activeTurnPhase === 2 && (
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-cyan-300">Phase 2: Inspiration Phase (Draw Step)</h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Draw exactly 1 card from your 60-card Main Deck. If your deck is depleted, Commander takes 3 Void Fatigue damage each turn. (No drawing from the 40-card Hazard deck during inspiration).
                    </p>
                  </div>
                )}

                {activeTurnPhase === 3 && (
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-yellow-300">Phase 3: Ascension Phase (Momentum & Dice Scaling)</h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Your base Momentum increases by +1 each turn (Turn 1 = 1, Turn 2 = 2, Turn 3 = 3... up to 12 Max). In addition, roll your Momentum Die (d6 / d12) to add kinetic bonus energy!
                    </p>
                    <div className="mt-3 p-3 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between text-xs font-mono">
                      <span>Current Turn {turnLoopTurnNumber} Base: <strong>+{turnLoopTurnNumber} M</strong></span>
                      <span>Die Roll Result: <strong>+{turnLoopDiceResult || 4} M</strong></span>
                      <span className="text-yellow-400 font-bold">Total Energy: {Math.min(12, turnLoopTurnNumber + (turnLoopDiceResult || 4))} / 12 M</span>
                    </div>
                  </div>
                )}

                {activeTurnPhase === 4 && (
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-emerald-300">Phase 4: Main Phase (Deployment & 10-Artifact Cap)</h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Spend Essence to summon Vanguard and Flank units, cast Slow Spells, and equip Relics and Weapons into your Armory (up to the strict <strong>10-Artifact maximum cap</strong>). You may also play a Hazard card from your hand into the <strong>Forecast Zone</strong> face-up with a 1-turn delay.
                    </p>
                  </div>
                )}

                {activeTurnPhase === 5 && (
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-red-300">Phase 5: Clash Phase (3-Lane Combat Resolution)</h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Declare attacks lane by lane: Left Flank, Center Vanguard, and Right Flank. If an enemy has a Center Vanguard Taunt unit, you cannot target the enemy Commander directly with physical strikes. Fast Reactions and Retributions enter the Aether Chain stack (LIFO order).
                    </p>
                  </div>
                )}

                {activeTurnPhase === 6 && (
                  <div>
                    <h4 className="font-cinzel font-bold text-base text-purple-300">Phase 6: Dusk Phase (Momentum Stash & Hand Limit 7)</h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Turn ends. Unspent Momentum is not lost: it converts into <strong>Kinetic Stash Points</strong> (usable for cheap tier-1 reactions) or temporary <strong>Aether Shields</strong>! Finally, if your hand exceeds 7 cards, discard down to 7 cards into your Boneyard.
                    </p>
                  </div>
                )}

                {/* Phase Stepper Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                  <button
                    disabled={activeTurnPhase === 1}
                    onClick={() => setActiveTurnPhase(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs font-mono disabled:opacity-30"
                  >
                    ← Previous Phase
                  </button>
                  <span className="text-xs font-mono text-stone-400">Phase {activeTurnPhase} of 6</span>
                  <button
                    disabled={activeTurnPhase === 6}
                    onClick={() => setActiveTurnPhase(prev => Math.min(6, prev + 1))}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-cinzel font-bold text-xs disabled:opacity-30"
                  >
                    Next Phase →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. 11-7 OPENING HAND SETTING DRAFT ================= */}
          {activeTab === 'handsetting' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-cinzel text-amber-400 uppercase tracking-wider font-bold block">
                    Opening Match Setup Engine
                  </span>
                  <h3 className="font-cinzel font-black text-lg text-amber-100">
                    The "11-7 Hand Setting" Interactive Simulator
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Draw 11 cards at match start ➔ Lock 2 Soulbound cards ➔ Discard 2 to Graveyard ➔ Opponent Exiles 2 to Void ➔ Begin Turn 1 with 7 chosen cards.
                  </p>
                </div>

                <button
                  onClick={handleResetHandSetting}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center gap-1.5"
                >
                  <RotateCcw size={12} />
                  <span>Restart Draft</span>
                </button>
              </div>

              {/* Progress Steps Header */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className={`p-2 rounded-lg border ${handSettingStep === 1 ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-stone-950 border-stone-800 text-stone-500'}`}>
                  1. Lock 2 Soulbound ({lockedSoulbound.length}/2)
                </div>
                <div className={`p-2 rounded-lg border ${handSettingStep === 2 ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-stone-950 border-stone-800 text-stone-500'}`}>
                  2. Discard 2 to Boneyard ({discardedBoneyard.length}/2)
                </div>
                <div className={`p-2 rounded-lg border ${handSettingStep === 3 ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-stone-950 border-stone-800 text-stone-500'}`}>
                  3. Opponent Exiles 2 ({opponentExiledVoid.length}/2)
                </div>
                <div className={`p-2 rounded-lg border ${handSettingStep === 4 ? 'bg-green-500/20 border-green-400 text-green-200' : 'bg-stone-950 border-stone-800 text-stone-500'}`}>
                  4. Starting 7-Card Hand (Ready)
                </div>
              </div>

              {/* Hand Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {handCards.map((card) => {
                  const isLocked = lockedSoulbound.includes(card.id);
                  const isDiscarded = discardedBoneyard.includes(card.id);
                  const isExiled = opponentExiledVoid.includes(card.id);

                  let statusBadge = null;
                  if (isLocked) statusBadge = <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-bold">🔒 SOULBOUND</span>;
                  if (isDiscarded) statusBadge = <span className="text-[10px] bg-stone-700 text-stone-300 px-2 py-0.5 rounded font-bold">💀 BONEYARD</span>;
                  if (isExiled) statusBadge = <span className="text-[10px] bg-purple-900 text-purple-200 px-2 py-0.5 rounded font-bold">🌌 VOID EXILE</span>;

                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClickInHandSetting(card.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isLocked
                          ? 'bg-amber-950/40 border-amber-400 shadow-md scale-102'
                          : isDiscarded
                            ? 'bg-stone-950/50 border-stone-800 opacity-40'
                            : isExiled
                              ? 'bg-purple-950/40 border-purple-600 opacity-30'
                              : 'bg-stone-900 border-stone-800 hover:border-amber-500/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono text-amber-400 font-bold">{card.cost} Essence</span>
                          <span className="text-[10px] font-mono text-stone-400">{card.domain}</span>
                        </div>
                        <h4 className="font-cinzel font-bold text-xs text-stone-100">{card.name}</h4>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">{card.type}</div>
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        {statusBadge || <span className="text-[10px] text-stone-500 font-mono">In Draft Hand</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {handSettingStep === 3 && (
                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 flex items-center justify-between">
                  <div className="text-xs text-purple-200">
                    Opponent inspected your 7 remaining uncommitted cards and banished 2 into the Void! Click finalize to enter battle with your 7-card opening hand.
                  </div>
                  <button
                    onClick={() => setHandSettingStep(4)}
                    className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-cinzel font-bold text-xs shrink-0"
                  >
                    Confirm 7-Card Hand
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= 3. MOMENTUM & DICE ROLLER ================= */}
          {activeTab === 'diceandmomentum' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-cinzel text-amber-400 uppercase tracking-wider font-bold block">
                    Kinetic Momentum & Dice Probability System
                  </span>
                  <h3 className="font-cinzel font-black text-lg text-amber-100">
                    Momentum 1–12 Scaling & d6 / d12 Dice Roller
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Every turn, base momentum scales +1 (Turn 1 = 1, Turn 2 = 2 ... max 12) refilling each turn. Roll a d6 or d12 to gain additional kinetic momentum!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Dice Roller Panel */}
                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h4 className="font-cinzel font-bold text-base text-amber-200">Ascension Phase Momentum Roll</h4>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setDiceType('d6')}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold ${diceType === 'd6' ? 'bg-amber-500 text-black' : 'bg-stone-800 text-stone-400'}`}
                      >
                        d6 Die
                      </button>
                      <button
                        onClick={() => setDiceType('d12')}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold ${diceType === 'd12' ? 'bg-amber-500 text-black' : 'bg-stone-800 text-stone-400'}`}
                      >
                        d12 Die
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-6">
                    <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 border-2 border-yellow-300 flex flex-col items-center justify-center text-black shadow-2xl transition-transform ${isRollingDice ? 'animate-spin' : 'scale-105'}`}>
                      <Dices size={32} />
                      <div className="text-3xl font-black font-mono mt-1">
                        {isRollingDice ? '?' : rolledDieValue || 4}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider">{diceType} Roll</div>
                    </div>
                  </div>

                  <button
                    onClick={handleRollMomentumDie}
                    disabled={isRollingDice}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
                  >
                    {isRollingDice ? 'Rolling Momentum Die...' : `Roll Ascension ${diceType.toUpperCase()} Die`}
                  </button>

                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-center text-stone-300">
                    Formula: Turn {momentumTurn} Base ({momentumTurn}M) + Die ({rolledDieValue || 4}) = <strong className="text-yellow-400">{totalCalculatedMomentum} / 12 Total Momentum</strong>
                  </div>
                </div>

                {/* Dusk Conversion Explainer */}
                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col gap-4">
                  <h4 className="font-cinzel font-bold text-base text-purple-300">Dusk Phase Unspent Momentum Conversion</h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Unlike Essence which dissipates at end of turn, unused Momentum carries over into lower-tier kinetic abilities or converts into defensive resources:
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setDuskStashType('kinetic'); handleConvertDuskMomentum(4); }}
                      className={`flex-1 p-3 rounded-xl border text-left text-xs ${duskStashType === 'kinetic' ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200' : 'bg-stone-950 border-stone-800 text-stone-400'}`}
                    >
                      <div className="font-bold font-cinzel">Kinetic Stash Bank</div>
                      <div className="text-[10px] font-mono mt-0.5">2 Unspent M ➔ 1 Kinetic Point (For Tier-1 Fast Reactions)</div>
                    </button>
                    <button
                      onClick={() => { setDuskStashType('shield'); handleConvertDuskMomentum(4); }}
                      className={`flex-1 p-3 rounded-xl border text-left text-xs ${duskStashType === 'shield' ? 'bg-amber-950/40 border-amber-400 text-amber-200' : 'bg-stone-950 border-stone-800 text-stone-400'}`}
                    >
                      <div className="font-bold font-cinzel">Aether Shield Conversion</div>
                      <div className="text-[10px] font-mono mt-0.5">1 Unspent M ➔ +2 Temporary Shield for next turn</div>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono space-y-2">
                    <div className="text-amber-400 font-bold">10-Artifact Cap Rule:</div>
                    <div className="text-stone-300 text-[11px] leading-relaxed">
                      Players can equip a maximum of <strong>10 total Artifacts & Relics</strong> on their field. When attempting to equip an 11th artifact, you must sacrifice an existing artifact to the Boneyard.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Interactive Systems Rulebook Deep-Dive */}
          {activeTab === 'rulebook' && (
            <div className="space-y-4">
              <InteractiveRulebook initialSection={rulebookSection} />
            </div>
          )}

          {/* Interactive Sandbox Puzzle Mode */}
          {activeTab === 'sandbox' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-cinzel text-amber-400 uppercase tracking-wider font-bold block">
                    Practice Drill: "Shatter the Vanguard & Direct Strike"
                  </span>
                  <h3 className="font-cinzel font-black text-lg text-amber-100">
                    Tactical Puzzle #1
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Objective: The enemy Commander has 10 HP, protected by a 4 HP Vanguard Guard. You have 5 Essence. Find the winning sequence!
                  </p>
                </div>

                <button
                  onClick={handleResetPuzzle}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center gap-1.5 shrink-0"
                >
                  <RotateCcw size={13} />
                  <span>Reset Drill</span>
                </button>
              </div>

              {/* Puzzle Battle Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Enemy Side */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-600/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs text-purple-300 font-bold">Enemy Titan</span>
                    <span className="text-xs font-mono font-bold text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                      ❤️ {puzzleState.enemyHp} / 10 HP
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                    <span className="text-[9px] font-cinzel text-purple-400 block uppercase">Opposing Vanguard Guard</span>
                    {puzzleState.enemyGuardHp > 0 ? (
                      <div className="mt-1">
                        <span className="font-cinzel font-bold text-sm text-stone-100">Obsidian Golem</span>
                        <div className="text-xs font-mono text-blue-400 mt-0.5">🛡️ Guard HP: {puzzleState.enemyGuardHp} (TAUNT)</div>
                      </div>
                    ) : (
                      <span className="text-xs text-green-400 font-mono italic">💥 Guard Destroyed! Frontline Cleared!</span>
                    )}
                  </div>
                </div>

                {/* Player Side */}
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs text-amber-300 font-bold">Archmage Commander</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                        ⚡ {puzzleState.playerEssence} / 5 Essence
                      </span>
                      <span className="text-xs font-mono font-bold text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                        ❤️ {puzzleState.playerHp} HP
                      </span>
                    </div>
                  </div>

                  {/* Playable Action Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={handleCastSpellPuzzle}
                      disabled={puzzleState.playerEssence < 3 || puzzleState.enemyGuardHp <= 0 || puzzleState.isSolved}
                      className="p-2.5 rounded-xl bg-stone-900 border border-amber-500/50 hover:bg-stone-800 text-left transition disabled:opacity-40"
                    >
                      <div className="flex items-center justify-between text-[11px] font-cinzel font-bold text-amber-200">
                        <span>✨ Magma Deluge</span>
                        <span className="text-blue-400 font-mono">3 Essence</span>
                      </div>
                      <span className="text-[10px] text-stone-400 block font-sans mt-0.5">
                        Deal 4 damage to enemy Guard.
                      </span>
                    </button>

                    <button
                      onClick={handleAttackCommanderPuzzle}
                      disabled={puzzleState.isSolved}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        puzzleState.enemyGuardHp === 0
                          ? 'bg-red-600 hover:bg-red-500 text-white border-red-400 ring-2 ring-red-400 animate-pulse'
                          : 'bg-stone-900 border-stone-800 text-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-cinzel font-bold">
                        <span>⚔️ Warpick Slash</span>
                        <span className="font-mono text-green-400">0 Essence</span>
                      </div>
                      <span className="text-[10px] block font-sans mt-0.5">
                        Strike enemy Commander for 10 DMG.
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Victory Banner */}
              {puzzleState.isSolved && (
                <div className="p-4 rounded-2xl bg-green-950/80 border-2 border-green-400 text-center space-y-1 animate-bounce">
                  <h4 className="font-cinzel font-black text-base text-green-200">
                    🎉 PUZZLE SOLVED! DIVINE VICTORY!
                  </h4>
                  <p className="text-xs text-green-300">
                    You correctly cast the spell to vaporize the taunt guard, then unleashed the warpick finisher directly onto the enemy Commander!
                  </p>
                </div>
              )}

              {/* Action Log */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1 font-mono text-xs max-h-28 overflow-y-auto">
                <span className="text-[10px] text-stone-400 block font-cinzel uppercase">Action Replay</span>
                {puzzleState.actionsTaken.length === 0 ? (
                  <span className="text-stone-400 italic">No actions taken yet. Click an action above!</span>
                ) : (
                  puzzleState.actionsTaken.map((act, i) => (
                    <div key={i} className="text-amber-300">{act}</div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Mechanics Encyclopedia Tab */}
          {activeTab === 'encyclopedia' && (
            <div className="h-full">
              <MechanicsEncyclopedia isEmbedded={true} />
            </div>
          )}

          {/* Keywords & Glossary Tab */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <div className="flex items-center gap-2 text-xs text-amber-200">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Looking for complete skill functions, math formulas, and phase triggers?</span>
                </div>
                <button
                  onClick={() => setActiveTab('encyclopedia')}
                  className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-[11px] shadow transition shrink-0"
                >
                  Open Mechanics Encyclopedia
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rules keyword (e.g. Taunt, Burn, Attunement, Ascended)..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full pl-4 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredGlossary.map((kw) => (
                  <div key={kw.name} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <h4 className="font-cinzel font-bold text-xs text-amber-300">
                      {kw.name}
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {kw.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">
              Press ESC or close button to return to battle
            </span>
            <button
              onClick={() => setIsEncyclopediaDrawerOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 text-[11px] font-mono flex items-center gap-1.5 transition"
            >
              <BookOpen size={12} />
              <span>Quick Encyclopedia Drawer</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition"
          >
            Enter Arena
          </button>
        </div>
      </div>

      {/* Slide-over Side Drawer */}
      {isEncyclopediaDrawerOpen && (
        <MechanicsEncyclopedia
          isOpenAsDrawer={true}
          onCloseDrawer={() => setIsEncyclopediaDrawerOpen(false)}
        />
      )}
    </div>
  );
};
