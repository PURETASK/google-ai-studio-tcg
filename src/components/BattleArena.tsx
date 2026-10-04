import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  BattlefieldSlot, 
  PlayerState, 
  GamePhase, 
  CombatLogEntry, 
  DeckPreset,
  ArenaEnvironment,
  ArenaEnvironmentId,
  MatchStats,
  HazardCard,
  HazardDeckPreset,
  PriorityStackItem
} from '../types';
import { CARDS_DATABASE, PRESET_DECKS } from '../data/cards';
import { MASTER_HAZARD_DECK, getRandomHazardCard, HAZARD_DECK_PRESETS, getHazardDeckById } from '../data/hazardCardsData';
import { TITAN_BOSS_ENCOUNTERS, TitanBoss } from '../data/titanBossesData';
import { CardItem } from './CardItem';
import { CardDomainStatBadge } from './CardDomainStatBadge';
import { BattleStatsHUD } from './BattleStatsHUD';
import { BattleLogsPanel, EnhancedCombatLogEntry, TacticalAxis } from './BattleLogsPanel';
import { NexusTutorialModal } from './NexusTutorialModal';
import { EnvironmentHazardsModule } from './EnvironmentHazardsModule';
import { StatusBadges } from './StatusBadges';
import { VictoryRewardsModal } from './VictoryRewardsModal';
import { EndOfMatchOverlay } from './EndOfMatchOverlay';
import { OpeningHandSetupModal } from './OpeningHandSetupModal';
import { HazardEngine, ForecastedHazard } from './HazardEngine';
import { WorldStateHazardEngine } from './WorldStateHazardEngine';
import { PriorityStackVisualizer } from './PriorityStackVisualizer';
import { QuickRulesWidget } from './QuickRulesWidget';
import { NexusBattlefieldArena } from './NexusBattlefieldArena';
import { RealtimeCombatLog } from './RealtimeCombatLog';
import { TurnInspectorModal } from './TurnInspectorModal';
import { economyManager } from '../utils/economyManager';
import { soundEngine } from '../utils/audioEngine';
import { missionsManager } from '../utils/missionsManager';
import { 
  Sword, 
  Shield, 
  Zap, 
  Flame, 
  Heart, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown,
  Trophy, 
  Skull, 
  Play, 
  RefreshCw,
  AlertCircle,
  HelpCircle,
  Activity,
  Layers,
  Crown,
  Eye,
  Volume2,
  VolumeX,
  Crosshair,
  Compass,
  ArrowRight,
  BookOpen,
  ScrollText,
  ShoppingBag,
  Dices,
  BatteryCharging
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BattleArenaProps {
  onInspectCard: (card: Card) => void;
  selectedDeckPreset?: DeckPreset;
  onGoToVault?: () => void;
  onReturnToDashboard?: () => void;
}

const ARENA_ENVIRONMENTS: ArenaEnvironment[] = [
  {
    id: 'molten-caldera',
    name: 'Molten Caldera',
    subtitle: 'Volcanic Fissure of the Fire Mountain',
    domain: 'Radiance',
    bgGradient: 'from-amber-950/40 via-red-950/30 to-neutral-950',
    boardOverlay: 'bg-radial from-red-900/20 via-orange-950/10 to-transparent',
    ambientColor: '#ef4444',
    accentBorder: 'border-orange-500/40',
    hazardEffectName: 'Tectonic Slag (Hazard)',
    hazardEffectDesc: 'All Fire and Magma spells deal +1 bonus splash damage to adjacent frontline units.',
    icon: '🌋'
  },
  {
    id: 'celestial-sanctuary',
    name: 'Celestial Sanctuary',
    subtitle: 'High Spire of the Ophanim',
    domain: 'Sanctuary',
    bgGradient: 'from-amber-950/30 via-yellow-950/20 to-neutral-950',
    boardOverlay: 'bg-radial from-yellow-500/10 via-amber-900/10 to-transparent',
    ambientColor: '#eab308',
    accentBorder: 'border-amber-400/40',
    hazardEffectName: 'Aegis Halo (Hazard)',
    hazardEffectDesc: 'Shield abilities grant +2 additional defense points when cast.',
    icon: '✨'
  },
  {
    id: 'eldervale-canopy',
    name: 'Eldervale Primeval',
    subtitle: 'Ancient Roots of the World Tree',
    domain: 'Verdance',
    bgGradient: 'from-emerald-950/40 via-green-950/25 to-neutral-950',
    boardOverlay: 'bg-radial from-emerald-600/15 via-stone-900/20 to-transparent',
    ambientColor: '#10b981',
    accentBorder: 'border-emerald-500/40',
    hazardEffectName: 'Verdant Spores (Hazard)',
    hazardEffectDesc: 'At the start of your turn, your lowest-health frontline guardian regenerates 1 HP.',
    icon: '🌿'
  },
  {
    id: 'astral-nexus',
    name: 'Astral Nexus Rift',
    subtitle: 'Cosmic Temporal Chronometer',
    domain: 'Arcane',
    bgGradient: 'from-blue-950/40 via-indigo-950/30 to-neutral-950',
    boardOverlay: 'bg-radial from-blue-600/15 via-purple-950/20 to-transparent',
    ambientColor: '#3b82f6',
    accentBorder: 'border-blue-500/40',
    hazardEffectName: 'Temporal Surge (Hazard)',
    hazardEffectDesc: 'Spells costing 5 or more Essence draw 1 additional card upon resolution.',
    icon: '🌌'
  },
  {
    id: 'abyssal-trench',
    name: 'Abyssal Trench of Baator',
    subtitle: 'The Void Depths of Infinite Torment',
    domain: 'Abyss',
    bgGradient: 'from-purple-950/40 via-neutral-950 to-neutral-950',
    boardOverlay: 'bg-radial from-purple-900/20 via-red-950/15 to-transparent',
    ambientColor: '#a855f7',
    accentBorder: 'border-purple-600/40',
    hazardEffectName: 'Soul Siphon (Hazard)',
    hazardEffectDesc: 'Whenever a guardian unit falls, the opposing Commander restores 1 Health.',
    icon: '💀'
  }
];

export const BattleArena: React.FC<BattleArenaProps> = ({
  onInspectCard,
  selectedDeckPreset,
  onGoToVault,
  onReturnToDashboard
}) => {
  const defaultPlayerDeckPreset = selectedDeckPreset || PRESET_DECKS[0];
  const defaultOpponentDeckPreset = PRESET_DECKS[3]; // Arcane / Cosmic Fate

  const [playerDeckPreset, setPlayerDeckPreset] = useState<DeckPreset>(defaultPlayerDeckPreset);
  const [opponentDeckPreset, setOpponentDeckPreset] = useState<DeckPreset>(defaultOpponentDeckPreset);

  const [selectedEnvironment, setSelectedEnvironment] = useState<ArenaEnvironment>(ARENA_ENVIRONMENTS[0]);
  const [battleMode, setBattleMode] = useState<'standard' | 'titan'>('standard');
  const [selectedTitanBoss, setSelectedTitanBoss] = useState<TitanBoss>(TITAN_BOSS_ENCOUNTERS[0]);
  const [bossEnraged, setBossEnraged] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState<'victory' | 'defeat' | null>(null);
  const [turnCount, setTurnCount] = useState(1);
  const [activePlayer, setActivePlayer] = useState<'player' | 'opponent'>('player');
  const [phase, setPhase] = useState<GamePhase>('MAIN');
  const [combatLogs, setCombatLogs] = useState<EnhancedCombatLogEntry[]>([]);
  const [selectedAttacker, setSelectedAttacker] = useState<BattlefieldSlot | null>(null);
  const [aiThinking, setAiThinking] = useState(false);

  // Dropdown Menus Management (with outside click dismiss)
  const [openArenaDropdown, setOpenArenaDropdown] = useState<string | null>(null);
  const arenaDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (arenaDropdownRef.current && !arenaDropdownRef.current.contains(e.target as Node)) {
        setOpenArenaDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, []);

  // Modals & Panels
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isBattleLogsOpen, setIsBattleLogsOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isTurnInspectorOpen, setIsTurnInspectorOpen] = useState(false);
  const [graveyardInspectPlayer, setGraveyardInspectPlayer] = useState<'player' | 'opponent' | null>(null);
  const [isHazardEngineOpen, setIsHazardEngineOpen] = useState(false);

  // 11-7 Hand Setting State
  const [isHandSetupOpen, setIsHandSetupOpen] = useState(false);
  const [opening11Cards, setOpening11Cards] = useState<Card[]>([]);
  const [pendingMatchSetup, setPendingMatchSetup] = useState<any>(null);

  // Momentum & Kinetic Stash System State
  const [baseMomentum, setBaseMomentum] = useState<number>(1);
  const [playerMomentum, setPlayerMomentum] = useState<number>(1);
  const [kineticStash, setKineticStash] = useState<number>(0);
  const [diceType, setDiceType] = useState<'d6' | 'd12'>('d6');
  const [hasRolledDiceThisTurn, setHasRolledDiceThisTurn] = useState<boolean>(false);
  const [lastDiceRoll, setLastDiceRoll] = useState<number | null>(null);

  // Interactive Turn Timer State
  const [turnTimeLimit, setTurnTimeLimit] = useState<number>(60);
  const [turnTimeRemaining, setTurnTimeRemaining] = useState<number>(60);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  // Hazard Deck & Forecast Engine State
  const [selectedHazardDeckPreset, setSelectedHazardDeckPreset] = useState<HazardDeckPreset>(HAZARD_DECK_PRESETS[0]);
  const [hazardDeck, setHazardDeck] = useState<HazardCard[]>([]);
  const [activeHazard, setActiveHazard] = useState<HazardCard | null>(null);
  const [forecastedHazards, setForecastedHazards] = useState<ForecastedHazard[]>([]);
  const [hazardRoundsRemaining, setHazardRoundsRemaining] = useState<number>(0);
  const [hazardHistory, setHazardHistory] = useState<HazardCard[]>([]);
  const [isPlayerBraced, setIsPlayerBraced] = useState<boolean>(false);

  // Deterministic Priority Stack (Aether Chain) State
  const [priorityStack, setPriorityStack] = useState<PriorityStackItem[]>([]);
  const [currentPriority, setCurrentPriority] = useState<'player' | 'opponent'>('player');
  const [isStackResolving, setIsStackResolving] = useState<boolean>(false);

  // Match Rewards Modal State
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [earnedRewards, setEarnedRewards] = useState<{
    shardsGained: number;
    dustGained: number;
    xpGained: number;
    isLevelUp: boolean;
    firstWinBonus: boolean;
    streakBonus: number;
  } | null>(null);

  // Match Telemetry Stats
  const [matchStats, setMatchStats] = useState<MatchStats>({
    damageDealtByPlayer: 0,
    damageTakenByPlayer: 0,
    spellsCastPlayer: 0,
    spellsCastOpponent: 0,
    unitsSummonedPlayer: 0,
    unitsSummonedOpponent: 0,
    unitsSlainPlayer: 0,
    unitsSlainOpponent: 0,
    essenceSpentPlayer: 0,
    essenceSpentOpponent: 0
  });

  // Unique Instance Generator for Cards
  const createCardInstance = (card: Card): Card => ({
    ...card,
    instanceId: `inst-${card.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  });

  // Helper to load cards by IDs with unique instance identifiers
  const buildDeckCards = (preset: DeckPreset): Card[] => {
    const cards: Card[] = [];
    preset.cardIds.forEach((id) => {
      const found = CARDS_DATABASE.find(c => c.id === id);
      if (found) {
        cards.push(createCardInstance(found));
      }
    });
    // Shuffle
    return cards.sort(() => Math.random() - 0.5);
  };

  const [player, setPlayer] = useState<PlayerState>({
    id: 'player-1',
    name: 'Archmage Commander',
    title: 'Guardian of the Codex',
    health: 30,
    maxHealth: 30,
    essence: 2,
    maxEssence: 2,
    deck: [],
    hand: [],
    graveyard: [],
    champion: null,
    weapon: null,
    frontline: [],
    shield: 0
  });

  const [opponent, setOpponent] = useState<PlayerState>({
    id: 'ai-opponent',
    name: 'Cosmic Chronomancer',
    title: 'Titan of Arcane Rifts',
    health: 30,
    maxHealth: 30,
    essence: 2,
    maxEssence: 2,
    deck: [],
    hand: [],
    graveyard: [],
    champion: null,
    weapon: null,
    frontline: [],
    shield: 0
  });

  // Log combat event into 5-axis tactical stream
  const addLog = (
    message: string, 
    type: CombatLogEntry['type'] = 'turn', 
    actor: 'player' | 'opponent' | 'system' = 'system', 
    damage?: number,
    matrixAxis: TacticalAxis = 'all'
  ) => {
    // Auto-infer matrix axis if not provided
    let derivedAxis = matrixAxis;
    if (derivedAxis === 'all') {
      if (['attack', 'death'].includes(type) || damage) derivedAxis = 'power';
      else if (['heal'].includes(type) || message.includes('Shield') || message.includes('Aegis')) derivedAxis = 'defense';
      else if (['spell'].includes(type) || message.includes('Essence') || message.includes('Cast')) derivedAxis = 'essence';
      else if (['hazard', 'special'].includes(type) || message.includes('Biome') || message.includes('Hazard')) derivedAxis = 'domain';
      else if (['summon'].includes(type) || message.includes('Guard') || message.includes('Throne')) derivedAxis = 'lane';
    }

    const newEntry: EnhancedCombatLogEntry = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      turn: turnCount,
      type,
      actor,
      message,
      damageValue: damage,
      matrixAxis: derivedAxis
    };
    setCombatLogs(prev => [newEntry, ...prev.slice(0, 150)]);
  };

  // Switch active Secondary Hazard Deck
  const handleSelectHazardDeck = (preset: HazardDeckPreset) => {
    setSelectedHazardDeckPreset(preset);
    const shuffled = [...preset.cards].sort(() => Math.random() - 0.5);
    setHazardDeck(shuffled);
    addLog(`🗃️ Switched Secondary Hazard Deck to: ${preset.name} (${preset.cards.length} Cards)`, 'special', 'system', undefined, 'domain');
  };

  // Draw a new Planar Hazard Card from active secondary hazard deck
  const handleDrawHazardCard = (preferredDomain?: string) => {
    soundEngine.playMicroSound('select');
    let deckCopy = [...hazardDeck];
    if (deckCopy.length === 0) {
      deckCopy = [...selectedHazardDeckPreset.cards].sort(() => Math.random() - 0.5);
    }
    const drawnHazard = deckCopy.shift() || getRandomHazardCard(preferredDomain);
    setHazardDeck(deckCopy);
    setActiveHazard(drawnHazard);
    setHazardRoundsRemaining(drawnHazard.roundDuration || 2);
    setHazardHistory(prev => [drawnHazard, ...prev.slice(0, 20)]);

    addLog(`🌋 PLANAR HAZARD TRIGGERED: ${drawnHazard.name}! (${drawnHazard.category} - ${drawnHazard.tier})`, 'special', 'system', undefined, 'domain');
    addLog(`📜 Effect: ${drawnHazard.description}`, 'special', 'system', undefined, 'domain');

    // Immediate mechanical resolution on draw
    if (drawnHazard.mechanicalClause) {
      const clause = drawnHazard.mechanicalClause;
      if (clause.shieldGranted) {
        setPlayer(p => ({ ...p, shield: p.shield + clause.shieldGranted! }));
        setOpponent(o => ({ ...o, shield: o.shield + clause.shieldGranted! }));
        addLog(`🛡️ Hazard granted +${clause.shieldGranted} Shield to both commanders!`, 'heal', 'system', undefined, 'defense');
      }
      if (clause.essenceBonus) {
        setPlayer(p => ({ ...p, essence: Math.min(10, p.essence + clause.essenceBonus!) }));
        setOpponent(o => ({ ...o, essence: Math.min(10, o.essence + clause.essenceBonus!) }));
        addLog(`✨ Hazard surged +${clause.essenceBonus} Essence to both sides!`, 'spell', 'system', undefined, 'essence');
      }
      if (clause.frontlineDamage) {
        // Tectonic damage to frontline units
        setPlayer(p => ({
          ...p,
          frontline: p.frontline.map(u => ({
            ...u,
            currentHealth: Math.max(1, u.currentHealth - clause.frontlineDamage!)
          }))
        }));
        setOpponent(o => ({
          ...o,
          frontline: o.frontline.map(u => ({
            ...u,
            currentHealth: Math.max(1, u.currentHealth - clause.frontlineDamage!)
          }))
        }));
        addLog(`⚡ Cataclysm dealt ${clause.frontlineDamage} rupture damage to all vanguard units!`, 'attack', 'system', clause.frontlineDamage, 'power');
      }
    }
  };

  // World State & Horizon Engine: Tactical Brace Command (-1 Momentum to reduce severity by 1 tier)
  const handleBrace = () => {
    if (playerMomentum < 1 || isPlayerBraced) return;
    setPlayerMomentum(m => Math.max(0, m - 1));
    setIsPlayerBraced(true);
    soundEngine.playCombatClash('shield');
    addLog('🛡️ Tactical Brace activated! Incoming Planar Hazard severity reduced by 1 Tier for your board.', 'special', 'player', 1, 'defense');
  };

  // World State & Horizon Engine: Deterministic Dawn Horizon Advance
  const handleAdvanceDawnHazard = () => {
    if (forecastedHazards.length === 0 && hazardDeck.length === 0) return;
    soundEngine.playMicroSound('select');

    let nextHazard: HazardCard;
    let remainingForecasts = [...forecastedHazards];

    if (remainingForecasts.length > 0) {
      nextHazard = remainingForecasts[0].hazard;
      remainingForecasts = remainingForecasts.slice(1);
    } else {
      const copyDeck = [...hazardDeck];
      nextHazard = copyDeck.shift() || getRandomHazardCard(selectedEnvironment.domain);
      setHazardDeck(copyDeck);
    }

    setActiveHazard(nextHazard);
    setHazardRoundsRemaining(nextHazard.roundDuration || 2);
    setHazardHistory(h => [nextHazard, ...h]);

    // Replenish Horizon slot from hazard deck
    const copyDeck = [...hazardDeck];
    const newHorizonCard = copyDeck.shift() || getRandomHazardCard(selectedEnvironment.domain);
    setHazardDeck(copyDeck);
    setForecastedHazards([
      {
        hazard: newHorizonCard,
        turnsRemaining: 1,
        forecastNotes: `Telegraphed ${newHorizonCard.domain} surge. Activates next Dawn.`
      }
    ]);

    // Apply hazard damage mitigated if player is braced
    const effectiveDamage = isPlayerBraced ? 1 : 2;
    setIsPlayerBraced(false);

    addLog(`🌅 Dawn Phase: [${nextHazard.name}] (${nextHazard.tier}) emerged from Horizon!`, 'special', 'system', undefined, 'domain');
    soundEngine.playCombatClash('spell');
  };

  // Deterministic Priority Stack: Pass Priority (Resolve Top Item LIFO)
  const handlePassPriority = () => {
    if (priorityStack.length === 0 || isStackResolving) return;
    setIsStackResolving(true);

    const [topItem, ...remainingStack] = priorityStack;
    soundEngine.playCombatClash('spell');
    addLog(`⚡ Priority Stack: [${topItem.sourceCard.name}] (${topItem.actionType}) resolves!`, 'special', topItem.controller);

    if (topItem.actionType === 'SPELL' || topItem.actionType === 'REACTION') {
      if (topItem.controller === 'player') {
        applyDamageToOpponent(topItem.sourceCard.power || 3, topItem.sourceCard.name);
      } else {
        applyDamageToPlayer(topItem.sourceCard.power || 3, topItem.sourceCard.name);
      }
    }

    setPriorityStack(remainingStack);
    setIsStackResolving(false);

    if (remainingStack.length > 0) {
      setCurrentPriority(p => p === 'player' ? 'opponent' : 'player');
    }
  };

  // Deterministic Priority Stack: Player Reaction Window Interrupt
  const handleReaction = (reactionName: string, momentumCost: number) => {
    if (playerMomentum < momentumCost) return;
    setPlayerMomentum(m => Math.max(0, m - momentumCost));
    soundEngine.playMicroSound('shimmer');

    const reactionItem: PriorityStackItem = {
      id: `react-${Date.now()}`,
      sourceCard: {
        id: `react-card-${Date.now()}`,
        name: reactionName,
        subtitle: 'Fast Reaction Spell',
        domain: 'Tempest',
        cardType: 'Spell',
        subtype: 'Reaction',
        cost: 0,
        rarity: 'Rare',
        power: 2,
        defense: 0,
        abilities: [],
        quote: '',
        lore: '',
        aestheticTheme: 'astral-sapphire'
      },
      controller: 'player',
      actionType: 'REACTION',
      description: `Instant reaction cast atop the Aether Chain: ${reactionName}`,
      essenceCost: 0,
      momentumCost,
      speed: 'REACTION',
      timestamp: Date.now()
    };

    // Push atop the stack (LIFO)
    setPriorityStack(prev => [reactionItem, ...prev]);
    setCurrentPriority('opponent');
    addLog(`⚡ Fast Reaction: You played [${reactionName}] onto the Priority Stack!`, 'spell', 'player', momentumCost, 'power');

    // Simulate quick opponent pass
    setTimeout(() => {
      setCurrentPriority('player');
    }, 1200);
  };

  // Start new match with procedural soundscape
  const startMatch = () => {
    soundEngine.playDomainSoundscape(selectedEnvironment.domain as any);
    soundEngine.playCombatClash('turnStart');

    const pDeck = buildDeckCards(playerDeckPreset);
    const oDeck = buildDeckCards(opponentDeckPreset);

    // 11-7 Hand Setting Protocol: Draw 11 cards for opening allocation
    const p11Cards = pDeck.splice(0, 11);
    const oHand = oDeck.splice(0, 4);

    // Initialize Active Secondary Hazard Deck matching arena domain or preset
    const matchingHazardDeck = HAZARD_DECK_PRESETS.find(d => d.domain === selectedEnvironment.domain) || selectedHazardDeckPreset || HAZARD_DECK_PRESETS[0];
    setSelectedHazardDeckPreset(matchingHazardDeck);

    const initialHazards = [...matchingHazardDeck.cards].sort(() => Math.random() - 0.5);
    const startingHazard = initialHazards.shift() || getRandomHazardCard(selectedEnvironment.domain);
    const nextForecastedHazard = initialHazards.shift() || getRandomHazardCard(selectedEnvironment.domain);

    setHazardDeck(initialHazards);
    setActiveHazard(startingHazard);
    setForecastedHazards([
      {
        hazard: nextForecastedHazard,
        turnsRemaining: 1,
        forecastNotes: `Telegraphed ${nextForecastedHazard.domain} atmospheric surge. Activates next Dawn.`
      }
    ]);
    setHazardRoundsRemaining(startingHazard.roundDuration || 2);
    setHazardHistory([startingHazard]);

    // Initial commander champion if present
    const pChampCard = CARDS_DATABASE.find(c => c.id === playerDeckPreset.championCardId) || p11Cards[0];
    
    let oChampCard: Card;
    let oppDeckCards: Card[];
    let oppStartingHp = 30;
    let oppStartingShield = 0;
    let oppStartingEssence = 2;
    let oppName = opponentDeckPreset.name;
    let oppTitle = opponentDeckPreset.title;

    if (battleMode === 'titan' && selectedTitanBoss) {
      oppName = selectedTitanBoss.name;
      oppTitle = `${selectedTitanBoss.title} (${selectedTitanBoss.difficulty} Titan)`;
      oppStartingHp = selectedTitanBoss.startingHealth;
      oppStartingShield = selectedTitanBoss.startingShield;
      oppStartingEssence = selectedTitanBoss.startingEssence;

      const bossChamp = CARDS_DATABASE.find(c => c.id === selectedTitanBoss.bossChampionCardId);
      oChampCard = bossChamp ? createCardInstance(bossChamp) : oHand[0];
      
      const customBossDeck: Card[] = [];
      selectedTitanBoss.deckCardIds.forEach(id => {
        const found = CARDS_DATABASE.find(c => c.id === id);
        if (found) customBossDeck.push(createCardInstance(found));
      });
      oppDeckCards = customBossDeck.length > 0 ? customBossDeck.sort(() => Math.random() - 0.5) : oDeck;
    } else {
      oChampCard = CARDS_DATABASE.find(c => c.id === opponentDeckPreset.championCardId) || oHand[0];
      oppDeckCards = oDeck;
    }

    const oHandFinal = oppDeckCards.splice(0, 4);

    const pChampSlot: BattlefieldSlot = {
      instanceId: `champ-p-${Date.now()}`,
      card: createCardInstance(pChampCard),
      currentHealth: pChampCard.defense,
      maxHealth: pChampCard.defense,
      currentPower: pChampCard.power,
      canAttack: false,
      statuses: {}
    };

    const oChampSlot: BattlefieldSlot = {
      instanceId: `champ-o-${Date.now()}`,
      card: createCardInstance(oChampCard),
      currentHealth: oChampCard.defense,
      maxHealth: oChampCard.defense,
      currentPower: oChampCard.power,
      canAttack: false,
      statuses: {}
    };

    // Stash pending opponent & game state while player performs 11-7 Hand Setting
    setPendingMatchSetup({
      playerDeck: pDeck,
      playerChampSlot: pChampSlot,
      playerPreset: playerDeckPreset,
      opponentData: {
        id: 'ai-opponent',
        name: oppName,
        title: oppTitle,
        health: oppStartingHp,
        maxHealth: oppStartingHp,
        essence: oppStartingEssence,
        maxEssence: oppStartingEssence,
        deck: oppDeckCards,
        hand: oHandFinal,
        graveyard: [],
        champion: oChampSlot,
        weapon: null,
        frontline: [],
        shield: oppStartingShield
      },
      startingHazard
    });

    setOpening11Cards(p11Cards);
    setIsHandSetupOpen(true);
  };

  // Complete 11-7 Hand Setting Protocol
  const handleHandSetupComplete = (result: {
    finalHand: Card[];
    lockedCards: Card[];
    discardedCards: Card[];
    exiledCards: Card[];
  }) => {
    setIsHandSetupOpen(false);
    if (!pendingMatchSetup) return;

    setPlayer({
      id: 'player-1',
      name: 'Archmage Commander',
      title: pendingMatchSetup.playerPreset.title,
      health: 30,
      maxHealth: 30,
      essence: 2,
      maxEssence: 2,
      deck: pendingMatchSetup.playerDeck,
      hand: result.finalHand,
      graveyard: result.discardedCards,
      champion: pendingMatchSetup.playerChampSlot,
      weapon: null,
      frontline: [],
      shield: 0
    });

    setOpponent(pendingMatchSetup.opponentData);

    setMatchStats({
      damageDealtByPlayer: 0,
      damageTakenByPlayer: 0,
      spellsCastPlayer: 0,
      spellsCastOpponent: 0,
      unitsSummonedPlayer: 0,
      unitsSummonedOpponent: 0,
      unitsSlainPlayer: 0,
      unitsSlainOpponent: 0,
      essenceSpentPlayer: 0,
      essenceSpentOpponent: 0
    });

    setTurnCount(1);
    setBaseMomentum(1);
    setPlayerMomentum(1);
    setKineticStash(0);
    setHasRolledDiceThisTurn(false);
    setLastDiceRoll(null);

    setActivePlayer('player');
    setPhase('MAIN');
    setGameOver(null);
    setIsRewardsModalOpen(false);
    setEarnedRewards(null);
    setBossEnraged(false);
    setGameStarted(true);
    setCombatLogs([]);
    setSelectedAttacker(null);

    // Audio Engine: Trigger cinematic domain entrance horn & ambient soundscape
    soundEngine.playPlayerEntrance(pendingMatchSetup.playerPreset.domain);
    soundEngine.playDomainSoundscape(selectedEnvironment.domain);

    addLog(`⚔️ Match initiated! Realm Biome: ${selectedEnvironment.name}`, 'turn', 'system', undefined, 'domain');
    addLog(`🎴 11-7 Hand Protocol Complete: 7 in hand, 2 Soulbound, 2 in Boneyard, 2 Exiled to Void.`, 'special', 'player', undefined, 'domain');
    
    if (battleMode === 'titan' && selectedTitanBoss) {
      addLog(`👑 TITAN BOSS ENCOUNTER: ${selectedTitanBoss.name} — ${selectedTitanBoss.title}!`, 'special', 'opponent', undefined, 'domain');
      addLog(`✨ Titan Passive: [${selectedTitanBoss.passiveName}] — ${selectedTitanBoss.passiveDescription}`, 'special', 'opponent', undefined, 'domain');
    }
    addLog(`🌋 Active Hazard: ${pendingMatchSetup.startingHazard.name} (${pendingMatchSetup.startingHazard.tier}) — ${pendingMatchSetup.startingHazard.passiveEffectSummary}`, 'special', 'system', undefined, 'domain');
    setTurnTimeRemaining(turnTimeLimit);
  };

  // Interactive Turn Timer countdown effect (triggers auto 'End Turn' on expiry)
  useEffect(() => {
    if (!gameStarted || gameOver || activePlayer !== 'player' || isTimerPaused) {
      return;
    }

    const timerInterval = setInterval(() => {
      setTurnTimeRemaining(prev => {
        if (prev <= 1) {
          addLog(`⏳ Turn timer expired (0s)! Ending turn automatically...`, 'turn', 'system');
          soundEngine.playMicroSound('error');
          handleEndTurn();
          return turnTimeLimit;
        }
        if (prev === 11) {
          soundEngine.playMicroSound('error');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameStarted, gameOver, activePlayer, isTimerPaused, turnTimeLimit, turnCount]);

  // Momentum Dice Rolling & Carryover Conversion
  const handleRollMomentumDice = () => {
    if (hasRolledDiceThisTurn || activePlayer !== 'player' || gameOver) return;
    soundEngine.playMicroSound('select');
    const maxRoll = diceType === 'd6' ? 6 : 12;
    const roll = Math.floor(Math.random() * maxRoll) + 1;
    setLastDiceRoll(roll);
    setHasRolledDiceThisTurn(true);
    const newMomentum = Math.min(12, playerMomentum + roll);
    setPlayerMomentum(newMomentum);
    addLog(`🎲 Rolled ${roll} on ${diceType.toUpperCase()}! Momentum pool expanded to ${newMomentum} (+${roll}).`, 'special', 'player', roll, 'power');
  };

  const handleConvertUnspentMomentum = (mode: 'stash' | 'shield') => {
    if (activePlayer !== 'player' || gameOver || playerMomentum <= 0) return;
    const points = playerMomentum;
    if (mode === 'stash') {
      soundEngine.playMicroSound('equip');
      setKineticStash(prev => prev + points);
      setPlayerMomentum(0);
      addLog(`🔋 Converted ${points} unspent Momentum into Kinetic Stash! (Total Stash: ${kineticStash + points})`, 'special', 'player', undefined, 'essence');
    } else {
      soundEngine.playCombatClash('shield');
      const shieldGain = points * 2;
      setPlayer(prev => ({ ...prev, shield: prev.shield + shieldGain }));
      setPlayerMomentum(0);
      addLog(`🛡️ Converted ${points} unspent Momentum into +${shieldGain} Aether Shield!`, 'heal', 'player', undefined, 'defense');
    }
  };

  // Play a card from hand
  const handlePlayCard = (card: Card) => {
    if (activePlayer !== 'player' || gameOver) return;
    if (player.essence < card.cost) {
      addLog(`⚠️ Need ${card.cost} Essence for ${card.name}, but you have only ${player.essence}!`, 'special', 'player');
      return;
    }

    // Deduct essence & remove exact instance from hand
    const newEssence = player.essence - card.cost;
    const targetInstanceId = card.instanceId;
    const newHand = targetInstanceId 
      ? player.hand.filter(c => c.instanceId !== targetInstanceId)
      : player.hand.filter((_, i) => i !== player.hand.indexOf(card));

    setMatchStats(prev => ({
      ...prev,
      essenceSpentPlayer: prev.essenceSpentPlayer + card.cost
    }));

    if (card.cardType === 'Spell') {
      // Execute spell effect
      soundEngine.playCombatClash('spell');
      setMatchStats(prev => ({ ...prev, spellsCastPlayer: prev.spellsCastPlayer + 1 }));
      addLog(`✨ Cast Spell: ${card.name}! (-${card.cost} Essence)`, 'spell', 'player', undefined, 'essence');
      
      if (card.id.includes('RAISE-AEGIS')) {
        // Shield +8
        soundEngine.playCombatClash('shield');
        const shieldBoost = selectedEnvironment.id === 'celestial-sanctuary' ? 10 : 8;
        setPlayer(prev => ({ ...prev, shield: prev.shield + shieldBoost }));
        addLog(`🛡️ Holy Sanctuary Aegis grants +${shieldBoost} Shield!`, 'heal', 'player', undefined, 'defense');
      } else if (card.id.includes('MOLTEN-ERUPTION')) {
        // Deal 5 damage to opponent frontline & hero (+1 in Molten Caldera)
        const bonus = selectedEnvironment.id === 'molten-caldera' ? 1 : 0;
        const dmg = 5 + bonus;
        applyDamageToOpponent(dmg, 'Volcanic Eruption');
      } else if (card.id.includes('SOULSTORM')) {
        // Deal 6 damage, heal 3
        applyDamageToOpponent(6, 'Soulstorm');
        setPlayer(prev => ({ ...prev, health: Math.min(prev.maxHealth, prev.health + 3) }));
        addLog(`💀 Siphoned 3 Health to your champion!`, 'heal', 'player', undefined, 'defense');
      } else if (card.id.includes('FATE-COLLAPSE')) {
        // Destroy opponent first frontline unit
        soundEngine.playCombatClash('slay');
        setOpponent(prev => {
          if (prev.frontline.length > 0) {
            const removed = prev.frontline[0];
            addLog(`🌌 Fate Collapse exiled ${removed.card.name} into the void!`, 'death', 'player', undefined, 'power');
            setMatchStats(ms => ({ ...ms, unitsSlainOpponent: ms.unitsSlainOpponent + 1 }));
            return {
              ...prev,
              frontline: prev.frontline.slice(1),
              graveyard: [...prev.graveyard, removed.card]
            };
          }
          return prev;
        });
      } else {
        // Default spell damage
        applyDamageToOpponent(card.power || 4, card.name);
      }

      setPlayer(prev => ({
        ...prev,
        essence: newEssence,
        hand: newHand,
        graveyard: [...prev.graveyard, card]
      }));
    } else if (card.cardType === 'Weapon' || card.cardType === 'Relic' || card.cardType === 'Artifact' || card.cardType === 'Armor') {
      // Equip weapon / relic slot
      soundEngine.playMicroSound('equip');
      const newSlot: BattlefieldSlot = {
        instanceId: `equip-${Date.now()}`,
        card,
        currentHealth: card.defense,
        maxHealth: card.defense,
        currentPower: card.power,
        canAttack: true,
        statuses: {}
      };

      setPlayer(prev => ({
        ...prev,
        essence: newEssence,
        hand: newHand,
        weapon: newSlot
      }));

      addLog(`⚔️ Equipped Armory: ${card.name} (+${card.power} ATK)!`, 'summon', 'player', undefined, 'lane');
    } else {
      // Beast / Champion unit placed on frontline (max 3)
      if (player.frontline.length >= 3) {
        addLog(`⚠️ Frontline Vanguard is full! Maximum 3 guardian units.`, 'special', 'player');
        return;
      }

      soundEngine.playMicroSound('select');
      const newSlot: BattlefieldSlot = {
        instanceId: `unit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        card,
        currentHealth: card.defense,
        maxHealth: card.defense,
        currentPower: card.power,
        canAttack: false, // Summoning sickness
        statuses: {}
      };

      setMatchStats(prev => ({ ...prev, unitsSummonedPlayer: prev.unitsSummonedPlayer + 1 }));

      setPlayer(prev => ({
        ...prev,
        essence: newEssence,
        hand: newHand,
        frontline: [...prev.frontline, newSlot]
      }));

      addLog(`🐾 Summoned Vanguard: ${card.name} (${card.power} ATK / ${card.defense} HP)`, 'summon', 'player', undefined, 'lane');
    }
  };

  // Direct damage helper to opponent
  const applyDamageToOpponent = (dmg: number, source: string) => {
    setMatchStats(prev => ({
      ...prev,
      damageDealtByPlayer: prev.damageDealtByPlayer + dmg
    }));

    setOpponent(prev => {
      let finalDamage = dmg;
      let newShield = prev.shield;
      if (newShield > 0) {
        if (newShield >= finalDamage) {
          newShield -= finalDamage;
          finalDamage = 0;
        } else {
          finalDamage -= newShield;
          newShield = 0;
        }
      }

      const newHealth = Math.max(0, prev.health - finalDamage);
      addLog(`💥 ${source} deals ${dmg} damage to Opponent! (${newHealth} HP remaining)`, 'attack', 'player', dmg);

      // Trigger Titan Boss Enrage Phase
      if (
        battleMode === 'titan' && 
        selectedTitanBoss && 
        !bossEnraged && 
        newHealth > 0 && 
        newHealth <= selectedTitanBoss.enrageThresholdHp
      ) {
        setBossEnraged(true);
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 700);
        soundEngine.playCombatClash('slay');

        addLog(`⚡🔥 TITAN ENRAGE TRIGGERED: ${selectedTitanBoss.name} reaches critical Vitality!`, 'special', 'opponent', undefined, 'power');
        addLog(`📜 Enrage Surge: ${selectedTitanBoss.enrageEffectDescription}`, 'special', 'opponent', undefined, 'power');

        // Specific Boss mechanical enrage trigger
        if (selectedTitanBoss.id === 'titan-ignis') {
          setPlayer(p => ({ ...p, health: Math.max(1, p.health - 3) }));
          addLog(`🌋 Ignis detonates Solar Eruption for 3 direct damage!`, 'attack', 'opponent', 3, 'power');
        } else if (selectedTitanBoss.id === 'titan-astraea') {
          newShield += 10;
          addLog(`🔮 Astraea invokes Void Aegis, gaining +10 Shield!`, 'heal', 'opponent', undefined, 'defense');
        } else if (selectedTitanBoss.id === 'titan-sylvanus') {
          newShield += 6;
          addLog(`🌿 Sylvanus generates 6 Verdant Ward shields!`, 'heal', 'opponent', undefined, 'defense');
        } else if (selectedTitanBoss.id === 'titan-aegis') {
          newShield += 12;
          addLog(`🛡️ Aegis supercharges Divine Bulwark for +12 Shield!`, 'heal', 'opponent', undefined, 'defense');
        }
      }

      if (newHealth <= 0) {
        soundEngine.playCombatClash('victory');
        setGameOver('victory');
        confetti({ particleCount: 160, spread: 85, origin: { y: 0.6 } });
        addLog(`🏆 DIVINE VICTORY! You have conquered the opposing titan!`, 'special', 'player', undefined, 'power');

        // Track Daily Missions Victory Progress
        missionsManager.incrementProgress('battle', 1);
        missionsManager.incrementProgress('mission-win-3-games', 1);
        if (battleMode === 'titan') {
          missionsManager.incrementProgress('mission-titan-slayer', 1);
        }

        // Calculate and grant rewards
        let rewards = economyManager.addMatchReward({
          isVictory: true,
          damageDealt: matchStats.damageDealtByPlayer + dmg,
          damageTaken: matchStats.damageTakenByPlayer,
          unitsSlain: matchStats.unitsSlainOpponent,
          spellsCast: matchStats.spellsCastPlayer,
          turnCount: turnCount,
          playerDomain: playerDeckPreset.domain,
          opponentName: opponent.name,
          environmentName: selectedEnvironment.name
        });

        // Boost for Titan Boss Battles
        if (battleMode === 'titan' && selectedTitanBoss) {
          const shardBonus = Math.max(0, selectedTitanBoss.shardReward - rewards.shardsGained);
          const dustBonus = Math.max(0, selectedTitanBoss.dustReward - rewards.dustGained);
          if (shardBonus > 0) economyManager.grantShards(shardBonus, `Titan Slayer: ${selectedTitanBoss.name}`);
          if (dustBonus > 0) economyManager.grantDust(dustBonus, `Titan Slayer: ${selectedTitanBoss.name}`);

          rewards = {
            ...rewards,
            shardsGained: selectedTitanBoss.shardReward,
            dustGained: selectedTitanBoss.dustReward,
            xpGained: selectedTitanBoss.xpReward
          };
        }

        setEarnedRewards(rewards);
        setIsRewardsModalOpen(true);
      }

      return {
        ...prev,
        health: newHealth,
        shield: newShield
      };
    });
  };

  // Direct damage helper to player
  const applyDamageToPlayer = (dmg: number, source: string) => {
    setMatchStats(prev => ({
      ...prev,
      damageTakenByPlayer: prev.damageTakenByPlayer + dmg
    }));

    setPlayer(prev => {
      let finalDamage = dmg;
      let newShield = prev.shield;
      if (newShield > 0) {
        if (newShield >= finalDamage) {
          newShield -= finalDamage;
          finalDamage = 0;
        } else {
          finalDamage -= newShield;
          newShield = 0;
        }
      }

      const newHealth = Math.max(0, prev.health - finalDamage);
      addLog(`🩸 Opponent's ${source} deals ${dmg} damage to you! (${newHealth} HP remaining)`, 'attack', 'opponent', dmg);

      if (newHealth <= 0) {
        soundEngine.playCombatClash('slay');
        setGameOver('defeat');
        addLog(`💀 DEFEAT! Your life force was overwhelmed by the void.`, 'special', 'opponent', undefined, 'power');

        // Calculate and grant participation rewards
        const rewards = economyManager.addMatchReward({
          isVictory: false,
          damageDealt: matchStats.damageDealtByPlayer,
          damageTaken: matchStats.damageTakenByPlayer + dmg,
          unitsSlain: matchStats.unitsSlainOpponent,
          spellsCast: matchStats.spellsCastPlayer,
          turnCount: turnCount,
          playerDomain: playerDeckPreset.domain,
          opponentName: opponent.name,
          environmentName: selectedEnvironment.name
        });
        setEarnedRewards(rewards);
        setIsRewardsModalOpen(true);
      }

      return {
        ...prev,
        health: newHealth,
        shield: newShield
      };
    });
  };

  // Unit attacks opponent frontline or direct hero
  const handleUnitAttack = (attacker: BattlefieldSlot, targetUnitIndex?: number) => {
    if (activePlayer !== 'player' || !attacker.canAttack || gameOver) return;

    if (targetUnitIndex !== undefined && opponent.frontline[targetUnitIndex]) {
      // Attack specific opponent frontline unit
      const target = opponent.frontline[targetUnitIndex];
      const damageDealt = attacker.currentPower;
      const counterDamage = target.currentPower;

      addLog(`⚔️ ${attacker.card.name} attacks ${target.card.name} for ${damageDealt} DMG!`, 'attack', 'player', damageDealt);
      
      setMatchStats(prev => ({
        ...prev,
        damageDealtByPlayer: prev.damageDealtByPlayer + damageDealt
      }));

      // Update opponent unit health
      const newTargetHealth = target.currentHealth - damageDealt;
      const newAttackerHealth = attacker.currentHealth - counterDamage;

      setOpponent(prev => {
        let newFrontline = [...prev.frontline];
        let newGrave = [...prev.graveyard];

        if (newTargetHealth <= 0) {
          addLog(`💀 Enemy ${target.card.name} was slain in combat!`, 'death', 'player');
          setMatchStats(ms => ({ ...ms, unitsSlainOpponent: ms.unitsSlainOpponent + 1 }));
          newFrontline = newFrontline.filter((_, idx) => idx !== targetUnitIndex);
          newGrave.push(target.card);
        } else {
          newFrontline[targetUnitIndex] = {
            ...target,
            currentHealth: newTargetHealth
          };
        }

        return {
          ...prev,
          frontline: newFrontline,
          graveyard: newGrave
        };
      });

      // Update attacker health & exhaust attack
      soundEngine.playCombatClash('attack');
      setPlayer(prev => {
        let newFrontline = [...prev.frontline];
        let newGrave = [...prev.graveyard];

        const isChampion = prev.champion?.instanceId === attacker.instanceId;
        const isWeapon = prev.weapon?.instanceId === attacker.instanceId;

        if (isChampion && prev.champion) {
          const newHp = prev.champion.currentHealth - counterDamage;
          return {
            ...prev,
            champion: {
              ...prev.champion,
              currentHealth: Math.max(1, newHp),
              canAttack: false
            }
          };
        }

        if (isWeapon && prev.weapon) {
          return {
            ...prev,
            weapon: {
              ...prev.weapon,
              canAttack: false
            }
          };
        }

        // Frontline unit
        const attackerIdx = prev.frontline.findIndex(u => u.instanceId === attacker.instanceId);
        if (attackerIdx !== -1) {
          if (newAttackerHealth <= 0) {
            addLog(`💀 Your ${attacker.card.name} perished in battle!`, 'death', 'opponent');
            setMatchStats(ms => ({ ...ms, unitsSlainPlayer: ms.unitsSlainPlayer + 1 }));
            newFrontline = newFrontline.filter((_, idx) => idx !== attackerIdx);
            newGrave.push(attacker.card);
          } else {
            newFrontline[attackerIdx] = {
              ...prev.frontline[attackerIdx],
              currentHealth: newAttackerHealth,
              canAttack: false
            };
          }
        }

        return {
          ...prev,
          frontline: newFrontline,
          graveyard: newGrave
        };
      });
    } else {
      // Direct attack against opponent hero (only if frontline is clear or bypass)
      if (opponent.frontline.length > 0) {
        addLog(`⚠️ Cannot direct attack! Opponent has ${opponent.frontline.length} Vanguard Guards protecting their Commander.`, 'special', 'player');
        return;
      }

      applyDamageToOpponent(attacker.currentPower, attacker.card.name);

      // Exhaust attacker
      setPlayer(prev => {
        if (prev.champion?.instanceId === attacker.instanceId) {
          return { ...prev, champion: { ...prev.champion, canAttack: false } };
        }
        if (prev.weapon?.instanceId === attacker.instanceId) {
          return { ...prev, weapon: { ...prev.weapon, canAttack: false } };
        }
        return {
          ...prev,
          frontline: prev.frontline.map(u => u.instanceId === attacker.instanceId ? { ...u, canAttack: false } : u)
        };
      });
    }

    setSelectedAttacker(null);
  };

  // End Player Turn
  const handleEndTurn = () => {
    if (activePlayer !== 'player' || gameOver) return;

    setActivePlayer('opponent');
    setPhase('MAIN');
    addLog(`⏱️ Player ended turn ${turnCount}. Opponent is taking action...`, 'turn', 'system');
    setAiThinking(true);

    // AI Turn Simulation
    setTimeout(() => {
      executeAiTurn();
    }, 1200);
  };

  // Execute AI Opponent Logic
  const executeAiTurn = () => {
    // 1. Draw card for AI + apply Turn-Start Hazard Passives
    setOpponent(prev => {
      let newDeck = [...prev.deck];
      let newHand = [...prev.hand];
      if (newDeck.length > 0) {
        const drawn = newDeck.shift()!;
        newHand.push(drawn);
      }

      let updatedFrontline = prev.frontline.map(u => ({ ...u, canAttack: true }));
      if (activeHazard?.mechanicalClause?.healPerTurn && updatedFrontline.length > 0) {
        const heal = activeHazard.mechanicalClause.healPerTurn;
        updatedFrontline = updatedFrontline.map(u => ({
          ...u,
          currentHealth: Math.min(u.maxHealth, u.currentHealth + heal)
        }));
        addLog(`🌿 Hazard Effect: Enemy frontline restored +${heal} Health!`, 'heal', 'opponent');
      }

      if (activeHazard?.mechanicalClause?.burnApplied && updatedFrontline.length > 0) {
        const burn = activeHazard.mechanicalClause.burnApplied;
        updatedFrontline = updatedFrontline.map(u => ({
          ...u,
          currentHealth: Math.max(1, u.currentHealth - burn)
        }));
        addLog(`🔥 Hazard Effect: Enemy frontline scorched for ${burn} Burn damage!`, 'attack', 'system', burn);
      }

      const newMaxEssence = Math.min(10, prev.maxEssence + 1);
      return {
        ...prev,
        deck: newDeck,
        hand: newHand,
        maxEssence: newMaxEssence,
        essence: newMaxEssence,
        frontline: updatedFrontline,
        champion: prev.champion ? { ...prev.champion, canAttack: true } : null
      };
    });

    // 2. AI Plays a card if affordable
    setTimeout(() => {
      setOpponent(prevOpp => {
        const playable = prevOpp.hand.filter(c => c.cost <= prevOpp.essence);
        if (playable.length === 0) {
          addLog(`🤖 Opponent saves Essence and holds position.`, 'turn', 'opponent');
          return prevOpp;
        }

        const chosen = playable[Math.floor(Math.random() * playable.length)];
        const newEssence = prevOpp.essence - chosen.cost;
        const newHand = prevOpp.hand.filter(c => c.instanceId !== chosen.instanceId);

        setMatchStats(ms => ({
          ...ms,
          essenceSpentOpponent: ms.essenceSpentOpponent + chosen.cost
        }));

        if (chosen.cardType === 'Spell') {
          setMatchStats(ms => ({ ...ms, spellsCastOpponent: ms.spellsCastOpponent + 1 }));
          addLog(`✨ Opponent cast ${chosen.name}!`, 'spell', 'opponent');
          applyDamageToPlayer(chosen.power || 4, chosen.name);
          return {
            ...prevOpp,
            essence: newEssence,
            hand: newHand,
            graveyard: [...prevOpp.graveyard, chosen]
          };
        } else {
          if (prevOpp.frontline.length < 3) {
            setMatchStats(ms => ({ ...ms, unitsSummonedOpponent: ms.unitsSummonedOpponent + 1 }));
            const newSlot: BattlefieldSlot = {
              instanceId: `unit-ai-${Date.now()}`,
              card: chosen,
              currentHealth: chosen.defense,
              maxHealth: chosen.defense,
              currentPower: chosen.power,
              canAttack: false,
              statuses: {}
            };
            addLog(`🐾 Opponent summoned Vanguard: ${chosen.name}!`, 'summon', 'opponent');
            return {
              ...prevOpp,
              essence: newEssence,
              hand: newHand,
              frontline: [...prevOpp.frontline, newSlot]
            };
          }
        }
        return prevOpp;
      });

      // 3. AI Combat Attacks
      setTimeout(() => {
        setOpponent(currentOpp => {
          const readyAttackers = currentOpp.frontline.filter(u => u.canAttack);
          readyAttackers.forEach(att => {
            setPlayer(curPlayer => {
              if (curPlayer.frontline.length > 0) {
                // Strike player guard
                const targetGuard = curPlayer.frontline[0];
                addLog(`⚔️ Opponent's ${att.card.name} attacks your ${targetGuard.card.name}!`, 'attack', 'opponent', att.currentPower);
                const newHp = targetGuard.currentHealth - att.currentPower;
                let newFront = [...curPlayer.frontline];
                let newGrave = [...curPlayer.graveyard];
                if (newHp <= 0) {
                  addLog(`💀 Your Vanguard ${targetGuard.card.name} was destroyed!`, 'death', 'player');
                  setMatchStats(ms => ({ ...ms, unitsSlainPlayer: ms.unitsSlainPlayer + 1 }));
                  newFront.shift();
                  newGrave.push(targetGuard.card);
                } else {
                  newFront[0] = { ...targetGuard, currentHealth: newHp };
                }
                return { ...curPlayer, frontline: newFront, graveyard: newGrave };
              } else {
                // Direct strike player hero
                applyDamageToPlayer(att.currentPower, att.card.name);
                return curPlayer;
              }
            });
          });
          return currentOpp;
        });

        // 4. Return turn to player
        setTimeout(() => {
          setTurnCount(t => {
            const nextTurn = t + 1;
            const nextBase = Math.min(12, nextTurn);
            setBaseMomentum(nextBase);
            setPlayerMomentum(nextBase);
            setHasRolledDiceThisTurn(false);
            setLastDiceRoll(null);
            return nextTurn;
          });
          setActivePlayer('player');
          setTurnTimeRemaining(turnTimeLimit);
          setAiThinking(false);

          // Resolve 1-turn Forecasted Hazard at Dawn Phase
          setForecastedHazards(prevForecasts => {
            if (prevForecasts.length > 0) {
              const [nextToTrigger, ...remaining] = prevForecasts;
              if (nextToTrigger.turnsRemaining <= 1) {
                setActiveHazard(nextToTrigger.hazard);
                setHazardRoundsRemaining(nextToTrigger.hazard.roundDuration || 2);
                setHazardHistory(h => [nextToTrigger.hazard, ...h]);
                addLog(`🌅 Dawn Phase Forecast Resolved: [${nextToTrigger.hazard.name}] is now ACTIVE!`, 'special', 'system', undefined, 'domain');
                soundEngine.playCombatClash('spell');
                return remaining;
              }
            }
            return prevForecasts;
          });

          // Ticking Hazard Duration & Auto-queue next Forecasted Hazard if expired
          setHazardRoundsRemaining(prevRounds => {
            if (prevRounds <= 1) {
              // Trigger or forecast new hazard next round
              setTimeout(() => {
                if (hazardDeck.length > 0) {
                  const [nextHaz, ...rem] = hazardDeck;
                  setHazardDeck(rem);
                  setForecastedHazards(f => [
                    ...f,
                    {
                      hazard: nextHaz,
                      turnsRemaining: 1,
                      forecastNotes: `Telegraphed ${nextHaz.domain} atmospheric disturbance. Triggers in 1 turn.`
                    }
                  ]);
                  addLog(`⚠️ Planar Hazard Telegraphed: [${nextHaz.name}] arriving next Dawn!`, 'special', 'system', undefined, 'domain');
                }
              }, 400);
              return 0;
            }
            return prevRounds - 1;
          });

          // Player draw & mana refresh + Status Effects / Hazard Ticks
          setPlayer(prev => {
            let newDeck = [...prev.deck];
            let newHand = [...prev.hand];
            if (newDeck.length > 0) {
              const drawn = newDeck.shift()!;
              newHand.push(drawn);
              addLog(`🎴 You drew ${drawn.name}!`, 'turn', 'player');
            }

            // Hazard Continuous Modifiers (e.g. Verdance Spores, Molten Fissure)
            let updatedFrontline = prev.frontline.map(u => ({ ...u, canAttack: true }));
            if (activeHazard?.mechanicalClause?.healPerTurn && updatedFrontline.length > 0) {
              const heal = activeHazard.mechanicalClause.healPerTurn;
              updatedFrontline = updatedFrontline.map(u => ({
                ...u,
                currentHealth: Math.min(u.maxHealth, u.currentHealth + heal)
              }));
              addLog(`🌿 Hazard Effect: Frontline units restored +${heal} Health!`, 'heal', 'player');
            }

            if (activeHazard?.mechanicalClause?.burnApplied && updatedFrontline.length > 0) {
              const burn = activeHazard.mechanicalClause.burnApplied;
              updatedFrontline = updatedFrontline.map(u => ({
                ...u,
                currentHealth: Math.max(1, u.currentHealth - burn)
              }));
              addLog(`🔥 Hazard Effect: Frontline units scorched for ${burn} Burn damage!`, 'attack', 'system', burn);
            }

            // Verdant Spores Hazard effect in Eldervale Canopy
            if (selectedEnvironment.id === 'eldervale-canopy' && updatedFrontline.length > 0) {
              const lowestIdx = updatedFrontline.reduce((minIdx, u, idx, arr) => u.currentHealth < arr[minIdx].currentHealth ? idx : minIdx, 0);
              updatedFrontline[lowestIdx] = {
                ...updatedFrontline[lowestIdx],
                currentHealth: Math.min(updatedFrontline[lowestIdx].maxHealth, updatedFrontline[lowestIdx].currentHealth + 1)
              };
              addLog(`🌿 Verdant Spores healed ${updatedFrontline[lowestIdx].card.name} for 1 HP!`, 'heal', 'player');
            }

            const newMaxEssence = Math.min(10, prev.maxEssence + 1);
            return {
              ...prev,
              deck: newDeck,
              hand: newHand,
              maxEssence: newMaxEssence,
              essence: newMaxEssence,
              frontline: updatedFrontline,
              champion: prev.champion ? { ...prev.champion, canAttack: true } : null,
              weapon: prev.weapon ? { ...prev.weapon, canAttack: true } : null
            };
          });

          addLog(`✨ Turn ${turnCount + 1}: Essence pool refilled to full!`, 'turn', 'player');
        }, 800);
      }, 700);
    }, 600);
  };

  return (
    <div className={`w-full min-w-0 flex flex-col gap-4 transition-colors duration-500`}>
      
      {/* ================= TOP ARENA BAR: ENVIRONMENTS & ARENA ACTIONS DROPDOWNS ================= */}
      <div 
        ref={arenaDropdownRef}
        className="p-3.5 rounded-2xl bg-stone-950/90 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 backdrop-blur-md relative z-30"
      >
        {/* Left: Realm Biome Dropdown Menu */}
        <div className="relative">
          <button
            type="button"
            id="arena-biome-dropdown-btn"
            onClick={() => {
              soundEngine.playMicroSound('click');
              setOpenArenaDropdown(prev => prev === 'biome' ? null : 'biome');
            }}
            className="px-3.5 py-2 rounded-xl bg-stone-900/90 hover:bg-stone-850 text-stone-200 border border-amber-500/40 font-cinzel font-bold text-xs flex items-center gap-2 shadow transition hover:border-amber-400"
          >
            <span className="text-base">{selectedEnvironment.icon}</span>
            <span className="text-stone-400 text-[10px] uppercase font-mono">Biome:</span>
            <span className="text-amber-300">{selectedEnvironment.name}</span>
            <ChevronDown size={14} className={`text-amber-400 transition-transform duration-200 ${openArenaDropdown === 'biome' ? 'rotate-180' : ''}`} />
          </button>

          {/* Biome Dropdown Options */}
          {openArenaDropdown === 'biome' && (
            <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-2xl p-2 z-50 space-y-1.5 backdrop-blur-xl animate-fadeIn">
              <div className="px-2 py-1 text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider border-b border-stone-800">
                Select Battlefield Realm Biome
              </div>
              {ARENA_ENVIRONMENTS.map((env) => {
                const isSelected = selectedEnvironment.id === env.id;
                return (
                  <button
                    key={env.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      setSelectedEnvironment(env);
                      setOpenArenaDropdown(null);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50'
                        : 'hover:bg-stone-900 text-stone-300 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{env.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-cinzel font-bold text-xs truncate text-stone-100">
                          {env.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-amber-300 border border-stone-800">
                          {env.domain}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-sans mt-0.5 line-clamp-1">
                        {env.hazardEffectDesc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Consolidated Arena Actions Dropdown Menu */}
        <div className="flex items-center gap-2">
          {/* Quick Restart if Match Active */}
          {gameStarted && (
            <button
              onClick={startMatch}
              className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800 font-cinzel text-xs flex items-center gap-1.5 transition"
              title="Restart Match"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Restart</span>
            </button>
          )}

          {/* Arena Actions Dropdown */}
          <div className="relative">
            <button
              type="button"
              id="arena-actions-dropdown-btn"
              onClick={() => {
                soundEngine.playMicroSound('click');
                setOpenArenaDropdown(prev => prev === 'actions' ? null : 'actions');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 hover:from-amber-500/30 hover:to-yellow-500/20 text-amber-200 border border-amber-500/50 font-cinzel font-bold text-xs flex items-center gap-2 shadow-md transition hover:scale-102"
            >
              <Activity size={14} className="text-amber-400" />
              <span>Arena Actions</span>
              <ChevronDown size={14} className={`text-amber-400 transition-transform duration-200 ${openArenaDropdown === 'actions' ? 'rotate-180' : ''}`} />
            </button>

            {/* Arena Actions Dropdown Menu */}
            {openArenaDropdown === 'actions' && (
              <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl animate-fadeIn">
                <div className="px-2 py-1 text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider border-b border-stone-800">
                  Arena Tactical Console
                </div>

                <button
                  type="button"
                  id="arena-action-logs-btn"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setIsBattleLogsOpen(true);
                    setOpenArenaDropdown(null);
                  }}
                  className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-amber-400 shrink-0">
                    <ScrollText size={14} />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span>Battle Logs</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
                      {combatLogs.length}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  id="arena-action-telemetry-btn"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setIsStatsModalOpen(true);
                    setOpenArenaDropdown(null);
                  }}
                  className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-blue-400 shrink-0">
                    <Activity size={14} />
                  </div>
                  <span>Match Telemetry & HUD</span>
                </button>

                <button
                  type="button"
                  id="arena-action-tutorial-btn"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setIsTutorialOpen(true);
                    setOpenArenaDropdown(null);
                  }}
                  className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-yellow-400 shrink-0">
                    <BookOpen size={14} />
                  </div>
                  <span>How to Play & Rules</span>
                </button>

                <button
                  type="button"
                  id="arena-action-turn-inspector-btn"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setIsTurnInspectorOpen(true);
                    setOpenArenaDropdown(null);
                  }}
                  className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-amber-400 shrink-0">
                    <Compass size={14} />
                  </div>
                  <span>Turn Timing & Micro-Phases</span>
                </button>

                <button
                  type="button"
                  id="arena-action-hazards-btn"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setIsHazardEngineOpen(true);
                    setOpenArenaDropdown(null);
                  }}
                  className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-red-400 shrink-0">
                    <Flame size={14} />
                  </div>
                  <span>Planar Hazard Engine</span>
                </button>

                <div className="pt-1 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenArenaDropdown(null);
                      startMatch();
                    }}
                    className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-red-950/40 text-red-300 transition font-cinzel text-xs"
                  >
                    <div className="p-1.5 rounded-lg bg-stone-900 text-red-400 shrink-0">
                      <RotateCcw size={14} />
                    </div>
                    <span>{gameStarted ? 'Restart Match' : 'Reset Arena'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= PRE-MATCH DECK SELECTION OR BATTLE BOARD ================= */}
      {!gameStarted ? (
        <div className="p-8 rounded-3xl bg-stone-900/90 border-2 border-amber-500/50 shadow-2xl text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-[0_0_25px_rgba(234,179,8,0.4)] border border-amber-300">
              ⚔️
            </div>
            <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100">
              Nexus Tactical Arena
            </h2>
            <p className="text-xs text-stone-300">
              Select your battle deck and challenge the AI Titan in a 30-Vitality strategic card duel.
            </p>
          </div>

          {/* Mode Switcher Dropdown */}
          <div className="flex justify-center">
            <div className="relative inline-block text-left">
              <button
                type="button"
                id="mode-dropdown-btn"
                onClick={() => {
                  soundEngine.playMicroSound('click');
                  setOpenArenaDropdown(prev => prev === 'mode' ? null : 'mode');
                }}
                className="px-5 py-3 rounded-2xl bg-stone-950 border-2 border-amber-400 text-amber-100 font-cinzel text-xs font-bold uppercase tracking-wider flex items-center gap-3 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-102 transition"
              >
                <span className="text-base">{battleMode === 'standard' ? '⚔️' : '👑'}</span>
                <span>Mode: {battleMode === 'standard' ? 'Standard Arena Duel' : 'Titan Trials (Boss Rush)'}</span>
                <ChevronDown size={14} className={`text-amber-400 transition-transform ${openArenaDropdown === 'mode' ? 'rotate-180' : ''}`} />
              </button>

              {openArenaDropdown === 'mode' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-2xl p-2 z-50 space-y-1.5 backdrop-blur-xl">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      setBattleMode('standard');
                      setOpenArenaDropdown(null);
                    }}
                    className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition ${
                      battleMode === 'standard'
                        ? 'bg-amber-500 text-black font-bold shadow'
                        : 'hover:bg-stone-900 text-stone-300'
                    }`}
                  >
                    <span className="text-xl">⚔️</span>
                    <div>
                      <div className="font-cinzel text-xs uppercase tracking-wider">Standard Arena Duel</div>
                      <div className={`text-[10px] font-sans ${battleMode === 'standard' ? 'text-black/80' : 'text-stone-400'}`}>30 Vitality Tactical AI Duel</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      setBattleMode('titan');
                      setOpenArenaDropdown(null);
                    }}
                    className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition ${
                      battleMode === 'titan'
                        ? 'bg-gradient-to-r from-red-600 via-purple-600 to-amber-500 text-white font-bold shadow'
                        : 'hover:bg-stone-900 text-stone-300'
                    }`}
                  >
                    <span className="text-xl">👑</span>
                    <div>
                      <div className="font-cinzel text-xs uppercase tracking-wider">Titan Trials (Boss Rush)</div>
                      <div className={`text-[10px] font-sans ${battleMode === 'titan' ? 'text-stone-200' : 'text-stone-400'}`}>Bosses with Unique Auras & Enrage</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Select Player Deck Dropdown */}
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold block">
              Step 1: Choose Your Commander Deck
            </span>
            
            <div className="relative text-left">
              <button
                type="button"
                id="commander-deck-dropdown-btn"
                onClick={() => {
                  soundEngine.playMicroSound('click');
                  setOpenArenaDropdown(prev => prev === 'deck' ? null : 'deck');
                }}
                className="w-full p-4 rounded-2xl bg-stone-950 border-2 border-amber-400/80 text-left flex items-center justify-between gap-3 shadow-lg hover:border-amber-300 transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-cinzel font-bold text-sm shrink-0">
                    🎴
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel font-black text-sm text-stone-100 truncate">
                        {playerDeckPreset.name}
                      </span>
                      <span className="text-[9px] font-cinzel font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                        {playerDeckPreset.domain}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 font-mono truncate mt-0.5">
                      {playerDeckPreset.title} • {playerDeckPreset.cardIds.length} Cards
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-cinzel text-amber-400 shrink-0">
                  <span className="hidden sm:inline">Change Deck</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openArenaDropdown === 'deck' ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Commander Deck Dropdown Menu */}
              {openArenaDropdown === 'deck' && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-stone-950 border border-amber-500/50 shadow-2xl p-2 z-50 space-y-1.5 backdrop-blur-xl max-h-72 overflow-y-auto">
                  {PRESET_DECKS.map((preset) => {
                    const isSelected = playerDeckPreset.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playMicroSound('click');
                          setPlayerDeckPreset(preset);
                          setOpenArenaDropdown(null);
                        }}
                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-100 border border-amber-400'
                            : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-cinzel font-bold text-xs text-stone-100 truncate">
                              {preset.name}
                            </span>
                            <span 
                              className="text-[9px] font-cinzel font-bold px-1.5 py-0.5 rounded uppercase"
                              style={{ backgroundColor: `${preset.color}33`, color: preset.color, border: `1px solid ${preset.color}66` }}
                            >
                              {preset.domain}
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-400 font-mono truncate mt-0.5">
                            {preset.title}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-cinzel font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/40 shrink-0">
                            Equipped
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Choose Opponent or Titan Boss Dropdown */}
          <div className="space-y-3 max-w-xl mx-auto text-left">
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold block text-center">
              Step 2: {battleMode === 'titan' ? 'Challenge a Legendary Titan Boss' : 'Choose AI Opponent Deck'}
            </span>

            {battleMode === 'titan' ? (
              <div className="space-y-3">
                <div className="relative">
                  <button
                    type="button"
                    id="titan-boss-dropdown-btn"
                    onClick={() => {
                      soundEngine.playMicroSound('click');
                      setOpenArenaDropdown(prev => prev === 'opponent' ? null : 'opponent');
                    }}
                    className="w-full p-4 rounded-2xl bg-stone-950 border-2 border-red-500/80 text-left flex items-center justify-between gap-3 shadow-lg hover:border-red-400 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0">{selectedTitanBoss.avatarIcon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-cinzel font-black text-sm text-red-200 truncate">
                            {selectedTitanBoss.name}
                          </span>
                          <span className={`text-[8.5px] font-cinzel font-bold px-1.5 py-0.5 rounded uppercase ${
                            selectedTitanBoss.difficulty === 'Nightmare'
                              ? 'bg-purple-950 text-purple-300 border border-purple-600'
                              : selectedTitanBoss.difficulty === 'Veteran'
                              ? 'bg-red-950 text-red-300 border border-red-600'
                              : 'bg-amber-950 text-amber-300 border border-amber-600'
                          }`}>
                            {selectedTitanBoss.difficulty}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 font-mono truncate mt-0.5">
                          {selectedTitanBoss.title} • {selectedTitanBoss.startingHealth} HP + {selectedTitanBoss.startingShield} Shield
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-cinzel text-red-400 shrink-0">
                      <span className="hidden sm:inline">Change Boss</span>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${openArenaDropdown === 'opponent' ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Titan Boss Dropdown Menu */}
                  {openArenaDropdown === 'opponent' && (
                    <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-stone-950 border border-red-500/50 shadow-2xl p-2 z-50 space-y-1.5 backdrop-blur-xl max-h-72 overflow-y-auto">
                      {TITAN_BOSS_ENCOUNTERS.map((boss) => {
                        const isSelected = selectedTitanBoss.id === boss.id;
                        return (
                          <button
                            key={boss.id}
                            type="button"
                            onClick={() => {
                              soundEngine.playMicroSound('click');
                              setSelectedTitanBoss(boss);
                              setOpenArenaDropdown(null);
                            }}
                            className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition ${
                              isSelected
                                ? 'bg-red-950/60 text-red-100 border border-red-500'
                                : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-xl shrink-0">{boss.avatarIcon}</span>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-cinzel font-bold text-xs text-stone-100 truncate">
                                    {boss.name}
                                  </span>
                                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-stone-900 text-red-300 border border-stone-800 uppercase">
                                    {boss.difficulty}
                                  </span>
                                </div>
                                <p className="text-[10px] text-stone-400 font-mono truncate">
                                  {boss.title}
                                </p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-amber-400 shrink-0">
                              +{boss.shardReward} 🔮
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Selected Boss Lore & Passive Details */}
                <div className="p-4 rounded-2xl bg-stone-950/90 border border-red-500/40 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-cinzel">
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-amber-400 font-bold block text-[10px] uppercase">
                        Passive Aura: {selectedTitanBoss.passiveName}
                      </span>
                      <span className="text-stone-300 text-[11px] font-sans">
                        {selectedTitanBoss.passiveDescription}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-900/60">
                      <span className="text-red-400 font-bold block text-[10px] uppercase">
                        Enrage Trigger (at ≤{selectedTitanBoss.enrageThresholdHp} HP):
                      </span>
                      <span className="text-red-200 text-[11px] font-sans">
                        {selectedTitanBoss.enrageEffectDescription}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  id="opponent-deck-dropdown-btn"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setOpenArenaDropdown(prev => prev === 'opponent' ? null : 'opponent');
                  }}
                  className="w-full p-4 rounded-2xl bg-stone-950 border-2 border-purple-500/80 text-left flex items-center justify-between gap-3 shadow-lg hover:border-purple-400 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300 font-cinzel font-bold text-sm shrink-0">
                      👾
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel font-black text-sm text-stone-100 truncate">
                          {opponentDeckPreset.name}
                        </span>
                        <span className="text-[9px] font-cinzel font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                          {opponentDeckPreset.domain}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 font-mono truncate mt-0.5">
                        {opponentDeckPreset.title} • {opponentDeckPreset.cardIds.length} Cards
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-cinzel text-purple-400 shrink-0">
                    <span className="hidden sm:inline">Change Opponent</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${openArenaDropdown === 'opponent' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Opponent Deck Dropdown Menu */}
                {openArenaDropdown === 'opponent' && (
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-stone-950 border border-purple-500/50 shadow-2xl p-2 z-50 space-y-1.5 backdrop-blur-xl max-h-72 overflow-y-auto">
                    {PRESET_DECKS.map((preset) => {
                      const isSelected = opponentDeckPreset.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            soundEngine.playMicroSound('click');
                            setOpponentDeckPreset(preset);
                            setOpenArenaDropdown(null);
                          }}
                          className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition ${
                            isSelected
                              ? 'bg-purple-500/20 text-purple-100 border border-purple-400'
                              : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-cinzel font-bold text-xs text-stone-100 truncate">
                                {preset.name}
                              </span>
                              <span 
                                className="text-[9px] font-cinzel font-bold px-1.5 py-0.5 rounded uppercase"
                                style={{ backgroundColor: `${preset.color}33`, color: preset.color, border: `1px solid ${preset.color}66` }}
                              >
                                {preset.domain}
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-400 font-mono truncate mt-0.5">
                              {preset.title}
                            </p>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-cinzel font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/40 shrink-0">
                              Active Target
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Launch Button */}
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={startMatch}
              id="start-battle-match-btn"
              className="px-10 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-black text-sm uppercase tracking-widest shadow-2xl transition hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Play size={18} />
              <span>Commence Match in {selectedEnvironment.name}</span>
            </button>

            <button
              onClick={() => setIsTutorialOpen(true)}
              className="px-6 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-stone-700"
            >
              <HelpCircle size={16} className="text-amber-400" />
              <span>Review Rules First</span>
            </button>
          </div>
        </div>
      ) : (
        /* ================= ACTIVE BATTLEBOARD PLAYFIELD (Layer 3 Functional Zone Mimic) ================= */
        <div className="space-y-4">
          {/* ================= WORLD STATE & HAZARD HORIZON ENGINE ================= */}
          <WorldStateHazardEngine
            activeHazard={activeHazard}
            horizonHazard={forecastedHazards[0]?.hazard || null}
            turnsUntilHorizon={forecastedHazards[0]?.turnsRemaining || 1}
            hazardDeckCount={hazardDeck.length}
            playerMomentum={playerMomentum}
            isPlayerBraced={isPlayerBraced}
            onBrace={handleBrace}
            onAdvanceHorizon={handleAdvanceDawnHazard}
            onInspectHazard={onInspectCard as any}
            compact={true}
          />

          <NexusBattlefieldArena
            player={player}
            opponent={opponent}
            activePlayer={activePlayer}
            phase={phase}
            turnCount={turnCount}
            selectedAttacker={selectedAttacker}
            onSelectAttacker={setSelectedAttacker}
            onAttackUnit={handleUnitAttack}
            onEndTurn={handleEndTurn}
            playerMomentum={playerMomentum}
            baseMomentum={baseMomentum}
            kineticStash={kineticStash}
            diceType={diceType}
            setDiceType={setDiceType}
            onRollDice={handleRollMomentumDice}
            hasRolledDiceThisTurn={hasRolledDiceThisTurn}
            lastDiceRoll={lastDiceRoll}
            onConvertMomentum={handleConvertUnspentMomentum}
            activeHazard={activeHazard}
            onOpenHazardHUD={() => setIsHazardEngineOpen(true)}
            onInspectGraveyard={(p) => setGraveyardInspectPlayer(p)}
            screenShake={screenShake}
            bossEnraged={bossEnraged}
            aiThinking={aiThinking}
            turnTimeRemaining={turnTimeRemaining}
            turnTimeLimit={turnTimeLimit}
            onToggleTurnTimerPause={() => setIsTimerPaused(!isTimerPaused)}
            isTimerPaused={isTimerPaused}
            onInspectCard={onInspectCard}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />

          {/* ================= DETERMINISTIC PRIORITY STACK (AETHER CHAIN) ================= */}
          <PriorityStackVisualizer
            stackItems={priorityStack}
            currentPriority={currentPriority}
            playerMomentum={playerMomentum}
            onPassPriority={handlePassPriority}
            onReact={handleReaction}
            isResolving={isStackResolving}
          />

          {/* ================= REAL-TIME COMBAT TELEMETRY LOG FEED ================= */}
          <RealtimeCombatLog
            logs={combatLogs}
            currentTurn={turnCount}
            activePlayer={activePlayer}
            onOpenFullLogPanel={() => setIsBattleLogsOpen(true)}
          />

          {/* ================= PLAYER HAND (Cards Fan Tray) ================= */}
          <div className="p-3.5 rounded-2xl bg-stone-950/90 border border-amber-500/40 space-y-2 shadow-2xl">
            <div className="flex items-center justify-between px-1">
              <span className="font-cinzel text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-bold">
                <Sparkles size={14} />
                <span>Your Hand ({player.hand.length} Cards in Reserve)</span>
              </span>
              <span className="text-[11px] font-mono text-stone-300">
                Click card to cast or inspect full stats
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-3 pt-1 px-1 scrollbar-thin">
              {player.hand.map((card, index) => {
                const canAfford = player.essence >= card.cost && activePlayer === 'player';
                // Safe unique key using instanceId or composite index to prevent duplicate key warning
                const uniqueCardKey = card.instanceId || `${card.id}-${index}`;

                return (
                  <div 
                    key={uniqueCardKey} 
                    className="shrink-0 transition-transform duration-200 hover:-translate-y-2"
                  >
                    <CardItem
                      card={card}
                      size="hand"
                      playable={canAfford}
                      onClick={() => handlePlayCard(card)}
                      onInspect={() => onInspectCard(card)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= END OF MATCH OVERLAY (VICTORY & DEFEAT) ================= */}
          {gameOver && (
            <EndOfMatchOverlay
              isOpen={isRewardsModalOpen || !!gameOver}
              isVictory={gameOver === 'victory'}
              onReturnToDashboard={() => {
                setIsRewardsModalOpen(false);
                setGameOver(null);
                setGameStarted(false);
                if (onReturnToDashboard) {
                  onReturnToDashboard();
                }
              }}
              onRematch={startMatch}
              onGoToVault={() => {
                setIsRewardsModalOpen(false);
                setGameOver(null);
                setGameStarted(false);
                if (onGoToVault) {
                  onGoToVault();
                }
              }}
              onViewLogs={() => {
                setIsBattleLogsOpen(true);
              }}
              stats={{
                turns: turnCount,
                damageDealt: matchStats.damageDealtByPlayer,
                damageTaken: matchStats.damageTakenByPlayer,
                unitsSlain: matchStats.unitsSlainOpponent,
                spellsCast: matchStats.spellsCastPlayer,
                unitsSummoned: matchStats.unitsSummonedPlayer,
                essenceSpent: matchStats.essenceSpentPlayer
              }}
              rewards={earnedRewards || {
                shardsGained: gameOver === 'victory' ? 120 : 35,
                dustGained: gameOver === 'victory' ? 25 : 8,
                xpGained: gameOver === 'victory' ? 150 : 50,
                isLevelUp: false,
                firstWinBonus: gameOver === 'victory',
                streakBonus: gameOver === 'victory' ? 20 : 0
              }}
              playerDomain={playerDeckPreset.domain}
              playerName={player.name}
              opponentName={battleMode === 'titan' && selectedTitanBoss ? selectedTitanBoss.name : opponent.name}
              environmentName={selectedEnvironment.name}
            />
          )}

          {/* Graveyard Inspect Drawer */}
          {graveyardInspectPlayer && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
              <div className="max-w-xl w-full bg-stone-900 border-2 border-stone-700 p-6 rounded-3xl space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <h4 className="font-cinzel font-bold text-sm text-stone-200">
                    🪦 {graveyardInspectPlayer === 'player' ? 'Your Boneyard' : "Opponent's Boneyard"} ({graveyardInspectPlayer === 'player' ? player.graveyard.length : opponent.graveyard.length} Cards)
                  </h4>
                  <button
                    onClick={() => setGraveyardInspectPlayer(null)}
                    className="text-stone-400 hover:text-white text-xs font-mono"
                  >
                    Close [ESC]
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {(graveyardInspectPlayer === 'player' ? player.graveyard : opponent.graveyard).map((card, idx) => (
                    <div 
                      key={`grave-${card.id}-${idx}`}
                      onClick={() => onInspectCard(card)}
                      className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between hover:border-amber-500/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-mono text-xs">Cost {card.cost}</span>
                        <span className="font-cinzel font-bold text-xs text-stone-100">{card.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400">{card.domain} • {card.cardType}</span>
                    </div>
                  ))}
                  {(graveyardInspectPlayer === 'player' ? player.graveyard : opponent.graveyard).length === 0 && (
                    <div className="text-center py-6 text-xs text-stone-400 italic">No expended cards in this graveyard yet.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 5-AXIS BATTLE LOGS MODAL ================= */}
      <BattleLogsPanel
        isOpen={isBattleLogsOpen}
        onClose={() => setIsBattleLogsOpen(false)}
        logs={combatLogs}
        currentTurn={turnCount}
        matchStats={matchStats}
        player={player}
        opponent={opponent}
        environment={selectedEnvironment}
      />

      {/* ================= TELEMETRY MODAL ================= */}
      <BattleStatsHUD
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        player={player}
        opponent={opponent}
        matchStats={matchStats}
        turnCount={turnCount}
        environment={selectedEnvironment}
      />

      {/* ================= HOW TO PLAY & RULES MASTERCLASS MODAL ================= */}
      <NexusTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {/* ================= 11-7 OPENING HAND SETTING MODAL ================= */}
      <OpeningHandSetupModal
        isOpen={isHandSetupOpen}
        drawnCards={opening11Cards}
        onComplete={handleHandSetupComplete}
        onInspectCard={onInspectCard}
      />

      {/* ================= HAZARD ENGINE & FORECAST ZONE MODAL ================= */}
      {isHazardEngineOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-5xl max-h-[92vh] bg-stone-950 border-2 border-amber-500/60 rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-hidden relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌪️</span>
                <h3 className="font-cinzel font-black text-lg text-amber-300">
                  Planar Hazard Engine & Forecast Matrix (CRD 400)
                </h3>
              </div>
              <button
                onClick={() => setIsHazardEngineOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-mono text-xs border border-stone-700"
              >
                Close Engine [ESC]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              <HazardEngine
                activeHazard={activeHazard}
                forecastedHazards={forecastedHazards}
                hazardDeck={hazardDeck}
                turnCount={turnCount}
                onInspectCard={onInspectCard}
                onDrawHazard={() => handleDrawHazardCard(selectedEnvironment.domain)}
              />
            </div>
          </div>
        </div>
      )}
      {/* ================= FLOATING QUICK RULES KEYWORD WIDGET ================= */}
      <QuickRulesWidget />

      {/* ================= TURN TIMING & MICRO-PHASES INSPECTOR MODAL ================= */}
      <TurnInspectorModal
        isOpen={isTurnInspectorOpen}
        onClose={() => setIsTurnInspectorOpen(false)}
        turnCount={turnCount}
        currentPhase={phase}
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
