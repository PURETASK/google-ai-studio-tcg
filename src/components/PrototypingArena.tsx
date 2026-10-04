import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Castle, 
  Shield, 
  Swords, 
  Crown, 
  Trees, 
  Zap, 
  Sparkles, 
  RotateCcw, 
  Play, 
  HelpCircle, 
  Crosshair, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Layers,
  ChevronRight,
  TrendingUp,
  Flame,
  Skull,
  Dices,
  RefreshCw,
  Award,
  Maximize2,
  Eye,
  FastForward,
  Heart,
  BarChart3,
  Info,
  Sliders,
  Plus,
  Minus,
  Trash2,
  X,
  BookOpen
} from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

export type PrototypingZoneId = 'LEFT_FLANK' | 'MAIN_CENTER' | 'RIGHT_FLANK';

export type CardCategory = 'CHAMPION' | 'BEAST' | 'WEAPON' | 'ARTIFACT' | 'HAZARD_SPELL';

export interface PrototypeResourceCost {
  valor?: number;   // For Champions & Command Spells
  primal?: number;  // For Beasts & Monsters
  metal?: number;   // For Weapons & Artifacts
  aether?: number;  // For Hazards & Global Spells
}

export interface PrototypeCard {
  id: string;
  name: string;
  category: CardCategory;
  cost: PrototypeResourceCost;
  power?: number;
  health?: number;
  armor?: number;
  description: string;
  keywords: string[];
  emoji: string;
  weaponBonus?: {
    power: number;
    armor?: number;
    keyword?: string;
  };
  hazardEffect?: {
    description: string;
    clashDamage?: number;
  };
}

export interface DeployedZoneUnit {
  uid: string;
  card: PrototypeCard;
  currentHp: number;
  maxHp: number;
  currentPwr: number;
  armor: number;
  equippedWeapon?: PrototypeCard | null;
  statuses: string[];
}

export interface ZoneData {
  id: PrototypingZoneId;
  name: string;
  badge: string;
  colorTheme: {
    border: string;
    bg: string;
    accent: string;
    glow: string;
  };
  specialRule: string;
  currentHp: number;
  maxHp: number;
  shield: number;
  isBreached: boolean;
  playerUnit: DeployedZoneUnit | null;
  enemyUnit: DeployedZoneUnit | null;
  activeHazard: PrototypeCard | null;
}

export interface ResourcePool {
  valor: number;
  primal: number;
  metal: number;
  aether: number;
}

// Preset card catalog for the prototyping sandbox
export const PROTOTYPE_CATALOG: PrototypeCard[] = [
  // 1. Champions (Valor)
  {
    id: 'proto_c1',
    name: 'Vanguard Centurion',
    category: 'CHAMPION',
    cost: { valor: 3, metal: 1 },
    power: 5,
    health: 8,
    armor: 1,
    description: 'Taunt. Centers the defense with +1 Base Armor. Sinks excess damage as Pierce.',
    keywords: ['Taunt', 'Pierce'],
    emoji: '👑'
  },
  {
    id: 'proto_c2',
    name: 'Shadow Infiltrator',
    category: 'CHAMPION',
    cost: { valor: 2, aether: 1 },
    power: 4,
    health: 4,
    armor: 0,
    description: 'First Strike. Strikes before the opponent reacts. Life drains directly to Citadel.',
    keywords: ['First Strike', 'Life Drain'],
    emoji: '🗡️'
  },
  {
    id: 'proto_c3',
    name: 'Artificer High Strategist',
    category: 'CHAMPION',
    cost: { valor: 2, metal: 2 },
    power: 3,
    health: 6,
    armor: 1,
    description: 'Artillery Aura: All weapons and artifacts in this zone deal +2 Bonus Damage.',
    keywords: ['Artillery Aura'],
    emoji: '🧙'
  },
  {
    id: 'proto_c4',
    name: 'Solar Paladin',
    category: 'CHAMPION',
    cost: { valor: 4 },
    power: 6,
    health: 9,
    armor: 2,
    description: 'Divine Aegis. Reflects 2 damage back onto attackers upon being struck.',
    keywords: ['Reflect 2', 'Aegis'],
    emoji: '☀️'
  },

  // 2. Beasts (Primal)
  {
    id: 'proto_b1',
    name: 'Iron-Horn Behemoth',
    category: 'BEAST',
    cost: { primal: 3 },
    power: 6,
    health: 7,
    armor: 0,
    description: 'Trample (Pierce). Excess overkill damage punches directly through the zone gate.',
    keywords: ['Pierce', 'Regen 2'],
    emoji: '🦏'
  },
  {
    id: 'proto_b2',
    name: 'Rift Raptor',
    category: 'BEAST',
    cost: { primal: 2 },
    power: 4,
    health: 3,
    armor: 0,
    description: 'First Strike in side flanks. Decays enemy max health by 1.',
    keywords: ['First Strike', 'Void Rot 1'],
    emoji: '🦖'
  },
  {
    id: 'proto_b3',
    name: 'Sporeling Swarm',
    category: 'BEAST',
    cost: { primal: 2, aether: 1 },
    power: 3,
    health: 5,
    armor: 0,
    description: 'Spawns 2 barrier shields on the Zone Gate upon deployment.',
    keywords: ['Shield Boost +2'],
    emoji: '🍄'
  },
  {
    id: 'proto_b4',
    name: 'Apex Manticore',
    category: 'BEAST',
    cost: { primal: 4, valor: 1 },
    power: 7,
    health: 8,
    armor: 1,
    description: 'Venomous Stinger. Poisons opposing unit for 3 damage per clash tick.',
    keywords: ['Poison 3', 'Frenzy'],
    emoji: '🦂'
  },

  // 3. Weapons & Artifacts (Metal)
  {
    id: 'proto_w1',
    name: 'Flameforged Greatsword',
    category: 'WEAPON',
    cost: { metal: 2 },
    description: 'Sockets onto any friendly unit in a zone. Grants +3 Power and Pierce.',
    keywords: ['Weapon', '+3 PWR', 'Pierce'],
    emoji: '⚔️',
    weaponBonus: { power: 3, keyword: 'Pierce' }
  },
  {
    id: 'proto_w2',
    name: 'Bastion Tower Shield',
    category: 'WEAPON',
    cost: { metal: 2 },
    description: 'Sockets onto unit. Grants +1 Power, +3 Armor, and Taunt.',
    keywords: ['Armor', '+3 Armor', 'Taunt'],
    emoji: '🛡️',
    weaponBonus: { power: 1, armor: 3, keyword: 'Taunt' }
  },
  {
    id: 'proto_w3',
    name: 'Arcane Ballista Turret',
    category: 'ARTIFACT',
    cost: { metal: 3 },
    description: 'Zone Artifact: Deals 4 direct siege damage to the enemy Zone Gate during the clash.',
    keywords: ['Siege Engine', '4 Direct Gate DMG'],
    emoji: '🏹'
  },
  {
    id: 'proto_w4',
    name: 'Thunderbolt Railcannon',
    category: 'ARTIFACT',
    cost: { metal: 4, aether: 1 },
    description: 'Artillery Relic: Fires a piercing bolt dealing 6 damage across the entire line.',
    keywords: ['Artillery Rail', '6 Pierce Bolt'],
    emoji: '⚡'
  },

  // 4. Hazards & Spells (Aether)
  {
    id: 'proto_h1',
    name: 'Volcanic Rift Hazard',
    category: 'HAZARD_SPELL',
    cost: { aether: 2 },
    description: 'Zone Terraforming: Erupts at clash, dealing 3 Fire AOE damage to all units in the zone.',
    keywords: ['Terraform', '3 AOE DMG'],
    emoji: '🌋',
    hazardEffect: { description: 'Deals 3 Fire AOE to all zone units', clashDamage: 3 }
  },
  {
    id: 'proto_h2',
    name: 'Corrosive Acid Fog',
    category: 'HAZARD_SPELL',
    cost: { aether: 2 },
    description: 'Zone Terraforming: Destroys all Armor and strips shields from units in this line.',
    keywords: ['Strip Armor', 'Acid Decay'],
    emoji: '🌫️',
    hazardEffect: { description: 'Nullifies all Armor in this zone' }
  },
  {
    id: 'proto_h3',
    name: 'Temporal Stasis Grid',
    category: 'HAZARD_SPELL',
    cost: { aether: 3 },
    description: 'Zone Ward: Halves all incoming damage dealt by enemies in this zone during clash.',
    keywords: ['Ward', 'Half Damage'],
    emoji: '⏳',
    hazardEffect: { description: 'Halves opposing attack power' }
  }
];

export const INITIAL_ZONES: Record<PrototypingZoneId, ZoneData> = {
  LEFT_FLANK: {
    id: 'LEFT_FLANK',
    name: 'Left Flank Gate',
    badge: '⚡ AGILITY / SPEED',
    colorTheme: {
      border: 'border-purple-500/50',
      bg: 'bg-purple-950/20',
      accent: 'text-purple-400',
      glow: 'shadow-purple-500/20'
    },
    specialRule: 'Units with First Strike strike before the opponent retaliates.',
    currentHp: 20,
    maxHp: 20,
    shield: 0,
    isBreached: false,
    playerUnit: null,
    enemyUnit: null,
    activeHazard: null
  },
  MAIN_CENTER: {
    id: 'MAIN_CENTER',
    name: 'Main Vanguard Center',
    badge: '🛡️ MAIN BASTION LINE',
    colorTheme: {
      border: 'border-amber-500/60',
      bg: 'bg-amber-950/25',
      accent: 'text-amber-400',
      glow: 'shadow-amber-500/30'
    },
    specialRule: 'Main stronghold gate (30 HP). Grants +1 Natural Armor to defenders.',
    currentHp: 30,
    maxHp: 30,
    shield: 0,
    isBreached: false,
    playerUnit: null,
    enemyUnit: null,
    activeHazard: null
  },
  RIGHT_FLANK: {
    id: 'RIGHT_FLANK',
    name: 'Right Flank Gate',
    badge: '🏹 SIEGE / ARTILLERY',
    colorTheme: {
      border: 'border-cyan-500/50',
      bg: 'bg-cyan-950/20',
      accent: 'text-cyan-400',
      glow: 'shadow-cyan-500/20'
    },
    specialRule: 'Artillery ridge: Weapons & Siege engines deal +2 bonus damage.',
    currentHp: 20,
    maxHp: 20,
    shield: 0,
    isBreached: false,
    playerUnit: null,
    enemyUnit: null,
    activeHazard: null
  }
};

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  setup: (setZones: React.Dispatch<React.SetStateAction<Record<PrototypingZoneId, ZoneData>>>, setEnemyCitadel: (n: number) => void, setPlayerCitadel: (n: number) => void) => void;
}

export const PrototypingArena: React.FC = () => {
  // 3-Turn Build Cycle State
  const [epicCycle, setEpicCycle] = useState<number>(1);
  const [buildTurn, setBuildTurn] = useState<1 | 2 | 3 | 'CLASH'>(1);
  const [isClashResolving, setIsClashResolving] = useState<boolean>(false);
  const [clashStepIndex, setClashStepIndex] = useState<number | null>(null); // null = idle, 0 = Left, 1 = Center, 2 = Right, 3 = Citadel
  
  // Citadel Health (The ultimate target after breakthrough)
  const [playerCitadelHp, setPlayerCitadelHp] = useState<number>(30);
  const [enemyCitadelHp, setEnemyCitadelHp] = useState<number>(30);
  const [playerCitadelShield, setPlayerCitadelShield] = useState<number>(0);
  const [enemyCitadelShield, setEnemyCitadelShield] = useState<number>(0);

  // Momentum Die State
  const [momentumDieVal, setMomentumDieVal] = useState<number | null>(null);
  const [isRollingDie, setIsRollingDie] = useState<boolean>(false);
  
  // Zones State
  const [zones, setZones] = useState<Record<PrototypingZoneId, ZoneData>>(INITIAL_ZONES);
  
  // Resource Pools
  const [resources, setResources] = useState<ResourcePool>({
    valor: 4,
    primal: 4,
    metal: 4,
    aether: 4
  });

  // Player Hand
  const [hand, setHand] = useState<PrototypeCard[]>([
    PROTOTYPE_CATALOG[0], // Vanguard Centurion
    PROTOTYPE_CATALOG[1], // Shadow Infiltrator
    PROTOTYPE_CATALOG[4], // Iron-Horn Behemoth
    PROTOTYPE_CATALOG[8], // Flameforged Greatsword
    PROTOTYPE_CATALOG[10], // Arcane Ballista
    PROTOTYPE_CATALOG[12]  // Volcanic Rift
  ]);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'ALL' | CardCategory>('ALL');
  
  // Modals & Inspection States
  const [inspectedUnit, setInspectedUnit] = useState<{ unit: DeployedZoneUnit; zoneId: PrototypingZoneId; isPlayer: boolean } | null>(null);
  const [inspectedZoneId, setInspectedZoneId] = useState<PrototypingZoneId | null>(null);
  const [showScenarioModal, setShowScenarioModal] = useState<boolean>(false);
  const [showCodexModal, setShowCodexModal] = useState<boolean>(false);
  const [showTransmutationModal, setShowTransmutationModal] = useState<boolean>(false);
  
  // Battle Outcome State
  const [matchOutcome, setMatchOutcome] = useState<'victory' | 'defeat' | 'stalemate' | null>(null);
  const [matchStats, setMatchStats] = useState<{
    gatesBreached: number;
    enemyGatesBreached: number;
    pierceDamageDealt: number;
    citadelDamageDealt: number;
    mvpUnitName: string;
  }>({
    gatesBreached: 0,
    enemyGatesBreached: 0,
    pierceDamageDealt: 0,
    citadelDamageDealt: 0,
    mvpUnitName: 'Vanguard Centurion'
  });

  const [logs, setLogs] = useState<Array<{ id: string; time: string; msg: string; type: 'info' | 'combat' | 'breakthrough' | 'hazard' | 'die' }>>([
    {
      id: 'init_log',
      time: '00:00',
      msg: 'Prototyping Arena initialized: 3-Line Zoning, 3-Turn Build, and Breakthrough UI active.',
      type: 'info'
    }
  ]);

  const selectedCard = hand.find(c => c.id === selectedCardId) || null;

  const addLog = (msg: string, type: 'info' | 'combat' | 'breakthrough' | 'hazard' | 'die' = 'info') => {
    setLogs(prev => [
      {
        id: `log_${Date.now()}_${Math.random()}`,
        time: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
        msg,
        type
      },
      ...prev
    ]);
  };

  // Roll Dynamic Momentum Die (d6 / d12)
  const handleRollMomentumDie = () => {
    if (isRollingDie) return;
    setIsRollingDie(true);
    soundEngine.playMicroSound('manaSpend');
    
    let rolls = 0;
    const interval = setInterval(() => {
      setMomentumDieVal(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls >= 8) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setMomentumDieVal(finalVal);
        setIsRollingDie(false);

        // Grant Forge Metal or Aether Flux based on roll
        setResources(r => ({
          ...r,
          metal: Math.min(10, r.metal + Math.ceil(finalVal / 2)),
          aether: Math.min(10, r.aether + Math.floor(finalVal / 2))
        }));

        soundEngine.playMicroSound('shimmer');
        addLog(`🎲 Momentum Die Rolled [${finalVal}]! Gained +${Math.ceil(finalVal / 2)} Forge Metal & +${Math.floor(finalVal / 2)} Aether Flux.`, 'die');
      }
    }, 60);
  };

  // Transmutation / Resource conversion
  const handleTransmute = (source: keyof ResourcePool, target: keyof ResourcePool | 'CITADEL_SHIELD') => {
    if (resources[source] < 2) {
      soundEngine.playMicroSound('error');
      alert(`Need at least 2 ${source.toUpperCase()} to transmute!`);
      return;
    }

    soundEngine.playMicroSound('shimmer');
    if (target === 'CITADEL_SHIELD') {
      setResources(prev => ({ ...prev, [source]: prev[source] - 2 }));
      setPlayerCitadelShield(prev => prev + 3);
      addLog(`✨ Transmuted 2 ${source.toUpperCase()} into +3 Citadel Barrier Shield!`, 'info');
    } else {
      setResources(prev => ({
        ...prev,
        [source]: prev[source] - 2,
        [target]: prev[target] + 1
      }));
      addLog(`⚗️ Transmuted 2 ${source.toUpperCase()} into 1 ${target.toUpperCase()}`, 'info');
    }
  };

  // Deploy selected card to target zone
  const handleDeployToZone = (zoneId: PrototypingZoneId) => {
    if (!selectedCard) return;

    const { valor = 0, primal = 0, metal = 0, aether = 0 } = selectedCard.cost;
    if (
      resources.valor < valor ||
      resources.primal < primal ||
      resources.metal < metal ||
      resources.aether < aether
    ) {
      soundEngine.playMicroSound('error');
      alert('Insufficient resources for this deployment!');
      return;
    }

    soundEngine.playMicroSound('cardFlip');

    setZones(prev => {
      const updated = { ...prev };
      const currentZone = { ...updated[zoneId] };

      if (selectedCard.category === 'CHAMPION' || selectedCard.category === 'BEAST') {
        currentZone.playerUnit = {
          uid: `u_${Date.now()}`,
          card: selectedCard,
          currentHp: selectedCard.health || 5,
          maxHp: selectedCard.health || 5,
          currentPwr: selectedCard.power || 4,
          armor: selectedCard.armor || 0,
          equippedWeapon: null,
          statuses: [...selectedCard.keywords]
        };
        addLog(`Mobilized ${selectedCard.name} (${selectedCard.power} PWR / ${selectedCard.health} HP) into ${currentZone.name}`, 'info');
      } else if (selectedCard.category === 'WEAPON') {
        if (!currentZone.playerUnit) {
          soundEngine.playMicroSound('error');
          alert('Cannot equip weapon: No unit currently deployed in this line!');
          return prev;
        }
        const unit = { ...currentZone.playerUnit };
        unit.equippedWeapon = selectedCard;
        if (selectedCard.weaponBonus) {
          unit.currentPwr += selectedCard.weaponBonus.power;
          unit.armor += selectedCard.weaponBonus.armor || 0;
          if (selectedCard.weaponBonus.keyword) {
            unit.statuses.push(selectedCard.weaponBonus.keyword);
          }
        }
        currentZone.playerUnit = unit;
        addLog(`Equipped ${selectedCard.name} to ${unit.card.name} in ${currentZone.name} (+${selectedCard.weaponBonus?.power} PWR)`, 'combat');
      } else if (selectedCard.category === 'HAZARD_SPELL') {
        currentZone.activeHazard = selectedCard;
        addLog(`Set Zone Hazard: ${selectedCard.name} on ${currentZone.name}`, 'hazard');
      } else if (selectedCard.category === 'ARTIFACT') {
        currentZone.shield += 4;
        addLog(`Erected ${selectedCard.name} in ${currentZone.name} (+4 Gate Shield)`, 'info');
      }

      updated[zoneId] = currentZone;
      return updated;
    });

    // Deduct resources & remove card from hand
    setResources(prev => ({
      valor: prev.valor - valor,
      primal: prev.primal - primal,
      metal: prev.metal - metal,
      aether: prev.aether - aether
    }));
    setHand(prev => prev.filter(c => c.id !== selectedCard.id));
    setSelectedCardId(null);
  };

  // Advance the 3-Turn Build Cycle
  const handleAdvanceBuildTurn = () => {
    soundEngine.playMicroSound('unlock');

    if (buildTurn === 3) {
      setBuildTurn('CLASH');
      addLog('⚔️ Mobilization Phase Complete! Sound the War Horn to resolve the 3-Line Grand Clash!', 'combat');
      return;
    }

    const nextTurn = (buildTurn + 1) as 2 | 3;
    setBuildTurn(nextTurn);
    
    // Grant resource replenishment for next build turn
    setResources(prev => ({
      valor: Math.min(10, prev.valor + 2),
      primal: Math.min(10, prev.primal + 2),
      metal: Math.min(10, prev.metal + 2),
      aether: Math.min(10, prev.aether + 2)
    }));

    // AI simulated deployment
    setZones(prev => {
      const next = { ...prev };
      if (nextTurn === 2) {
        // AI deploys Defender in Main Center
        next.MAIN_CENTER.enemyUnit = {
          uid: 'ai_u1',
          card: PROTOTYPE_CATALOG[0],
          currentHp: 8,
          maxHp: 8,
          currentPwr: 4,
          armor: 2,
          statuses: ['Taunt']
        };
        addLog('Enemy deployed Vanguard Defender into Main Center Gate.', 'info');
      } else if (nextTurn === 3) {
        // AI deploys Beast in Right Flank
        next.RIGHT_FLANK.enemyUnit = {
          uid: 'ai_u2',
          card: PROTOTYPE_CATALOG[4],
          currentHp: 7,
          maxHp: 7,
          currentPwr: 5,
          armor: 0,
          statuses: ['Pierce']
        };
        addLog('Enemy reinforced Right Flank with an Iron-Horn Behemoth!', 'info');
      }
      return next;
    });

    addLog(`Advanced to Build Turn ${nextTurn} of 3. Resources replenished.`, 'info');
  };

  // Execute the 3-Line Grand Clash & Breakthrough Resolution (with step-by-step or instant option)
  const handleExecuteGrandClash = (instant: boolean = false) => {
    setIsClashResolving(true);
    soundEngine.playMicroSound('equip');
    addLog('💥 THE 3-LINE GRAND CLASH IS UNDERWAY! Resolving all lines...', 'combat');

    const updatedZones = JSON.parse(JSON.stringify(zones)) as Record<PrototypingZoneId, ZoneData>;
    let currentEnemyCitadel = enemyCitadelHp;
    let currentPlayerCitadel = playerCitadelHp;
    let enemyCitadelShieldVal = enemyCitadelShield;
    let playerCitadelShieldVal = playerCitadelShield;
    let totalPierce = 0;
    let totalCitadelDmg = 0;
    let enemyBreachedCount = 0;
    let playerBreachedCount = 0;
    let topUnit = 'Vanguard Centurion';

    const zoneList: PrototypingZoneId[] = ['LEFT_FLANK', 'MAIN_CENTER', 'RIGHT_FLANK'];

    zoneList.forEach(zoneKey => {
      const z = updatedZones[zoneKey];
      const p = z.playerUnit;
      const e = z.enemyUnit;

      // 1. Hazard damage tick
      if (z.activeHazard && z.activeHazard.hazardEffect?.clashDamage) {
        const hDmg = z.activeHazard.hazardEffect.clashDamage;
        if (p) p.currentHp -= hDmg;
        if (e) e.currentHp -= hDmg;
        addLog(`🌋 Hazard in ${z.name} erupted, dealing ${hDmg} AOE damage to all units!`, 'hazard');
      }

      // 2. Unit vs Unit Clash
      if (p && e) {
        // Check First Strike
        const pFirstStrike = p.statuses.some(s => s.toLowerCase().includes('first strike'));
        const eFirstStrike = e.statuses.some(s => s.toLowerCase().includes('first strike'));

        const pEffDmg = Math.max(0, p.currentPwr - e.armor);
        const eEffDmg = Math.max(0, e.currentPwr - p.armor);

        if (pFirstStrike && !eFirstStrike) {
          e.currentHp -= pEffDmg;
          if (e.currentHp > 0) {
            p.currentHp -= eEffDmg;
          }
          addLog(`⚡ First Strike: ${p.card.name} struck first for ${pEffDmg} damage!`, 'combat');
        } else if (!pFirstStrike && eFirstStrike) {
          p.currentHp -= eEffDmg;
          if (p.currentHp > 0) {
            e.currentHp -= pEffDmg;
          }
          addLog(`⚡ Enemy First Strike: ${e.card.name} struck first for ${eEffDmg} damage!`, 'combat');
        } else {
          e.currentHp -= pEffDmg;
          p.currentHp -= eEffDmg;
          addLog(`Clash in ${z.name}: ${p.card.name} (${pEffDmg} DMG) ⚔️ ${e.card.name} (${eEffDmg} DMG)`, 'combat');
        }

        // Pierce / Overkill Carryover
        if (p.statuses.includes('Pierce') && e.currentHp < 0) {
          const overkill = Math.abs(e.currentHp);
          totalPierce += overkill;
          z.currentHp = Math.max(0, z.currentHp - overkill);
          addLog(`🛡️ Trample / Pierce: ${p.card.name} overkill damage dealt ${overkill} damage to Enemy ${z.name}!`, 'combat');
        }

        // Clean up casualties
        if (p.currentHp <= 0) z.playerUnit = null;
        if (e.currentHp <= 0) z.enemyUnit = null;

      } else if (p && !e) {
        // Unopposed player assault on Zone Gate
        const strikeDmg = p.currentPwr;
        z.currentHp = Math.max(0, z.currentHp - strikeDmg);
        topUnit = p.card.name;
        addLog(`💥 Unopposed Strike: ${p.card.name} assaulted the enemy ${z.name} for ${strikeDmg} damage!`, 'combat');
      } else if (!p && e) {
        // Unopposed enemy assault on Player Zone Gate
        const strikeDmg = e.currentPwr;
        z.currentHp = Math.max(0, z.currentHp - strikeDmg);
        addLog(`⚠️ Enemy Breach Attempt: ${e.card.name} damaged your ${z.name} for ${strikeDmg} damage!`, 'combat');
      }

      // 3. Line Breakthrough Check
      if (z.currentHp <= 0) {
        z.isBreached = true;
        enemyBreachedCount++;
        addLog(`🚨 LINE BREAKTHROUGH: ${z.name} HAS FALLEN! Direct Citadel path opened!`, 'breakthrough');

        // Surviving player unit charges the Enemy Citadel!
        if (z.playerUnit) {
          const rawCitadelDmg = z.playerUnit.currentPwr;
          let actualDmg = rawCitadelDmg;
          
          if (enemyCitadelShieldVal > 0) {
            const absorbed = Math.min(enemyCitadelShieldVal, rawCitadelDmg);
            enemyCitadelShieldVal -= absorbed;
            actualDmg -= absorbed;
            addLog(`🛡️ Enemy Citadel Shield absorbed ${absorbed} damage!`, 'info');
          }

          currentEnemyCitadel = Math.max(0, currentEnemyCitadel - actualDmg);
          totalCitadelDmg += actualDmg;
          addLog(`🏰 CITADEL STRIKE: Surviving ${z.playerUnit.card.name} charged through the breached gate for ${actualDmg} direct Citadel damage!`, 'breakthrough');
        }
      }
    });

    setZones(updatedZones);
    setEnemyCitadelHp(currentEnemyCitadel);
    setPlayerCitadelHp(currentPlayerCitadel);
    setEnemyCitadelShield(enemyCitadelShieldVal);
    setPlayerCitadelShield(playerCitadelShieldVal);

    setMatchStats({
      gatesBreached: playerBreachedCount,
      enemyGatesBreached: enemyBreachedCount,
      pierceDamageDealt: totalPierce,
      citadelDamageDealt: totalCitadelDmg,
      mvpUnitName: topUnit
    });

    // Check Victory / Defeat / Stalemate conditions
    if (currentEnemyCitadel <= 0 && currentPlayerCitadel > 0) {
      setMatchOutcome('victory');
      soundEngine.playMicroSound('unlock');
      addLog('🏆 VICTORY: Enemy Sovereign Citadel destroyed via Line Breakthrough!', 'breakthrough');
    } else if (currentPlayerCitadel <= 0 && currentEnemyCitadel > 0) {
      setMatchOutcome('defeat');
      soundEngine.playMicroSound('error');
      addLog('💀 DEFEAT: Your Sovereign Citadel was breached and destroyed!', 'breakthrough');
    } else if (currentEnemyCitadel <= 0 && currentPlayerCitadel <= 0) {
      setMatchOutcome('stalemate');
      addLog('⚔️ DUAL CATACLYSM: Both Sovereign Citadels destroyed simultaneously!', 'combat');
    } else {
      // Both survived
      addLog('🛡️ END OF CLASH: Both Citadels endure. Advance to next Epic Cycle or resolve Sudden Death!', 'info');
    }

    setIsClashResolving(false);
  };

  // Next Epic Escalation Cycle
  const handleStartNextCycle = () => {
    soundEngine.playMicroSound('unlock');
    setEpicCycle(c => c + 1);
    setBuildTurn(1);
    setMatchOutcome(null);
    setResources({
      valor: 6,
      primal: 6,
      metal: 6,
      aether: 6
    });
    // Draw 3 fresh cards from catalog
    setHand([
      PROTOTYPE_CATALOG[2],
      PROTOTYPE_CATALOG[5],
      PROTOTYPE_CATALOG[9],
      PROTOTYPE_CATALOG[11]
    ]);
    addLog(`🌀 Epic Escalation Cycle ${epicCycle + 1} begins! +6 Starting Resources in all pools.`, 'info');
  };

  // Preset Scenarios
  const SCENARIOS: ScenarioPreset[] = [
    {
      id: 'scen_standard',
      name: 'Standard Clash',
      description: 'Balanced 3-line battlefield. Test baseline tempo and line management.',
      icon: '⚖️',
      setup: (setZ, setEC, setPC) => {
        setZ(JSON.parse(JSON.stringify(INITIAL_ZONES)));
        setEC(30);
        setPC(30);
      }
    },
    {
      id: 'scen_breakthrough',
      name: 'Blitzkrieg Breach',
      description: 'Low gate HP (10 HP) and high unit attack. Immediate breakthrough testing.',
      icon: '⚡',
      setup: (setZ, setEC, setPC) => {
        const z = JSON.parse(JSON.stringify(INITIAL_ZONES)) as Record<PrototypingZoneId, ZoneData>;
        z.LEFT_FLANK.currentHp = 8;
        z.MAIN_CENTER.currentHp = 12;
        z.RIGHT_FLANK.currentHp = 8;
        z.LEFT_FLANK.enemyUnit = {
          uid: 'blitz_e1',
          card: PROTOTYPE_CATALOG[1],
          currentHp: 4,
          maxHp: 4,
          currentPwr: 6,
          armor: 0,
          statuses: ['First Strike']
        };
        setZ(z);
        setEC(20);
        setPC(20);
      }
    },
    {
      id: 'scen_hazards',
      name: 'Cataclysmic Hazards',
      description: 'All 3 zones are engulfed in volcanic rifts and acid clouds at turn start.',
      icon: '🌋',
      setup: (setZ, setEC, setPC) => {
        const z = JSON.parse(JSON.stringify(INITIAL_ZONES)) as Record<PrototypingZoneId, ZoneData>;
        z.LEFT_FLANK.activeHazard = PROTOTYPE_CATALOG[12]; // Volcanic
        z.MAIN_CENTER.activeHazard = PROTOTYPE_CATALOG[13]; // Acid
        z.RIGHT_FLANK.activeHazard = PROTOTYPE_CATALOG[12];
        setZ(z);
        setEC(30);
        setPC(30);
      }
    },
    {
      id: 'scen_armored_bastion',
      name: 'Armored Bastion Wall',
      description: 'Enemy defenders possess heavy armor (+3) and Taunt in the Vanguard line.',
      icon: '🛡️',
      setup: (setZ, setEC, setPC) => {
        const z = JSON.parse(JSON.stringify(INITIAL_ZONES)) as Record<PrototypingZoneId, ZoneData>;
        z.MAIN_CENTER.enemyUnit = {
          uid: 'bastion_e1',
          card: PROTOTYPE_CATALOG[0],
          currentHp: 12,
          maxHp: 12,
          currentPwr: 5,
          armor: 4,
          statuses: ['Taunt', 'Heavy Armor']
        };
        setZ(z);
        setEC(35);
        setPC(30);
      }
    }
  ];

  // Predictive Combat Forecast for each line
  const getLineForecast = (zoneId: PrototypingZoneId) => {
    const z = zones[zoneId];
    const p = z.playerUnit;
    const e = z.enemyUnit;

    if (!p && !e) return { status: 'VACANT', color: 'text-stone-500', note: 'No units deployed in this line' };
    if (p && !e) return { status: 'PLAYER_ASSAULT', color: 'text-emerald-400', note: `Assaults Gate for ${p.currentPwr} DMG (Will Breach: ${p.currentPwr >= z.currentHp ? 'YES' : 'NO'})` };
    if (!p && e) return { status: 'ENEMY_ASSAULT', color: 'text-red-400', note: `Enemy deals ${e.currentPwr} DMG to your Gate` };

    const pDmg = Math.max(0, p.currentPwr - e.armor);
    const eDmg = Math.max(0, e.currentPwr - p.armor);

    const pDies = eDmg >= p.currentHp;
    const eDies = pDmg >= e.currentHp;

    if (eDies && !pDies) return { status: 'PLAYER_VICTORY', color: 'text-emerald-400', note: `${p.card.name} wins line (${p.currentHp - eDmg} HP remains)` };
    if (pDies && !eDies) return { status: 'ENEMY_VICTORY', color: 'text-red-400', note: `Enemy ${e.card.name} wins line` };
    if (pDies && eDies) return { status: 'MUTUAL_KILL', color: 'text-amber-400', note: 'Both units fall simultaneously' };
    return { status: 'STANDOFF', color: 'text-cyan-400', note: 'Both units survive the clash' };
  };

  // Reset Arena State
  const handleResetSandbox = () => {
    soundEngine.playMicroSound('click');
    setEpicCycle(1);
    setBuildTurn(1);
    setIsClashResolving(false);
    setPlayerCitadelHp(30);
    setEnemyCitadelHp(30);
    setPlayerCitadelShield(0);
    setEnemyCitadelShield(0);
    setMomentumDieVal(null);
    setZones(JSON.parse(JSON.stringify(INITIAL_ZONES)));
    setResources({ valor: 4, primal: 4, metal: 4, aether: 4 });
    setHand([
      PROTOTYPE_CATALOG[0],
      PROTOTYPE_CATALOG[1],
      PROTOTYPE_CATALOG[4],
      PROTOTYPE_CATALOG[8],
      PROTOTYPE_CATALOG[10],
      PROTOTYPE_CATALOG[12]
    ]);
    setSelectedCardId(null);
    setMatchOutcome(null);
    setLogs([{
      id: `reset_${Date.now()}`,
      time: '00:00',
      msg: 'Sandbox reset. Ready for new 3-Line deployment test.',
      type: 'info'
    }]);
  };

  return (
    <div id="prototyping-arena-root" className="w-full space-y-4 font-sans text-stone-100">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER: 3-TURN BUILD CYCLE & DEPLOYMENT PHASE INDICATOR */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title & Cycle */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-indigo-500/20 border border-amber-500/40 text-amber-400 shadow-inner">
            <Castle size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-cinzel font-bold text-amber-100 tracking-wide">
                Prototyping Arena: 3-Line Siege Sandbox
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-[10px] font-mono font-bold">
                CYCLE {epicCycle}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans">
              3-Line Zoning, 3-Turn Mobilization, Momentum Die & Breakthrough Win Engine
            </p>
          </div>
        </div>

        {/* Dedicated 3-Turn Build Cycle Indicator */}
        <div className="flex items-center gap-1.5 bg-stone-950/90 p-1.5 rounded-2xl border border-stone-800">
          <div className="text-[10px] font-cinzel font-bold text-stone-400 uppercase tracking-wider px-2">
            Build Phase:
          </div>

          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-cinzel font-bold transition ${
            buildTurn === 1 ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30' : 'bg-stone-900 text-stone-500'
          }`}>
            <span>Turn 1</span>
            <span className="hidden sm:inline">(Scout)</span>
          </div>

          <ChevronRight size={14} className="text-stone-600" />

          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-cinzel font-bold transition ${
            buildTurn === 2 ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/30' : 'bg-stone-900 text-stone-500'
          }`}>
            <span>Turn 2</span>
            <span className="hidden sm:inline">(Arm)</span>
          </div>

          <ChevronRight size={14} className="text-stone-600" />

          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-cinzel font-bold transition ${
            buildTurn === 3 ? 'bg-cyan-500 text-stone-950 shadow-lg shadow-cyan-500/30' : 'bg-stone-900 text-stone-500'
          }`}>
            <span>Turn 3</span>
            <span className="hidden sm:inline">(Form)</span>
          </div>

          <ChevronRight size={14} className="text-stone-600" />

          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-cinzel font-bold transition ${
            buildTurn === 'CLASH' ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40' : 'bg-stone-900 text-stone-500'
          }`}>
            <Swords size={13} />
            <span>Grand Clash</span>
          </div>
        </div>

        {/* Actions Tray */}
        <div className="flex items-center gap-2">
          {/* Preset Scenarios */}
          <button
            onClick={() => setShowScenarioModal(true)}
            className="p-2.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-700/50 text-xs font-cinzel flex items-center gap-1.5 transition"
            title="Load Pre-configured Battle Scenarios"
          >
            <Sliders size={15} />
            <span>Scenarios</span>
          </button>

          {/* Rules & Codex */}
          <button
            onClick={() => setShowCodexModal(true)}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-xs font-cinzel flex items-center gap-1.5 transition"
            title="Rules Codex & Formulas"
          >
            <BookOpen size={15} />
            <span>Codex</span>
          </button>

          {/* Reset Sandbox */}
          <button
            onClick={handleResetSandbox}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-cinzel flex items-center gap-1.5 transition"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. RESOURCE-BASED DEPLOYMENT METERS & TRANSDUCTION CRUCIBLE */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        
        {/* 👑 Valor Essence */}
        <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Crown size={18} />
            </div>
            <div>
              <div className="text-[11px] font-cinzel text-amber-300 uppercase">Valor Essence</div>
              <div className="text-lg font-cinzel font-bold text-amber-100">{resources.valor}</div>
            </div>
          </div>
          <span className="text-[10px] text-amber-300/70 font-mono bg-amber-500/10 px-2 py-0.5 rounded-md">
            Champions
          </span>
        </div>

        {/* 🌿 Primal Instinct */}
        <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Trees size={18} />
            </div>
            <div>
              <div className="text-[11px] font-cinzel text-emerald-300 uppercase">Primal Instinct</div>
              <div className="text-lg font-cinzel font-bold text-emerald-100">{resources.primal}</div>
            </div>
          </div>
          <span className="text-[10px] text-emerald-300/70 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-md">
            Beasts
          </span>
        </div>

        {/* ⚙️ Metal Forge */}
        <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Zap size={18} />
            </div>
            <div>
              <div className="text-[11px] font-cinzel text-cyan-300 uppercase">Forge Metal</div>
              <div className="text-lg font-cinzel font-bold text-cyan-100">{resources.metal}</div>
            </div>
          </div>
          <span className="text-[10px] text-cyan-300/70 font-mono bg-cyan-500/10 px-2 py-0.5 rounded-md">
            Weapons
          </span>
        </div>

        {/* ✨ Aether Flux */}
        <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-[11px] font-cinzel text-purple-300 uppercase">Aether Magic</div>
              <div className="text-lg font-cinzel font-bold text-purple-100">{resources.aether}</div>
            </div>
          </div>
          <span className="text-[10px] text-purple-300/70 font-mono bg-purple-500/10 px-2 py-0.5 rounded-md">
            Hazards
          </span>
        </div>

        {/* 🎲 Momentum Die & Transmutation Toolbar */}
        <div className="col-span-2 md:col-span-1 p-3 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-2">
          <button
            onClick={handleRollMomentumDie}
            disabled={isRollingDie}
            className="flex-1 py-1.5 px-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
          >
            <Dices size={15} className={isRollingDie ? 'animate-spin' : ''} />
            <span>{momentumDieVal ? `Die [${momentumDieVal}]` : 'Roll Die'}</span>
          </button>

          <button
            onClick={() => setShowTransmutationModal(true)}
            className="py-1.5 px-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-cinzel flex items-center justify-center gap-1 border border-stone-700 transition"
            title="Open Transmutation Crucible"
          >
            <RefreshCw size={14} />
            <span>Alchemy</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. THE 3-ZONE VISUAL BATTLEFIELD (LEFT, MAIN CENTER, RIGHT) */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl space-y-4">
        
        {/* ENEMY CITADEL (Target after breakthrough) */}
        <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
              <Castle size={20} />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-red-200">Enemy Sovereign Citadel (Breakthrough Target)</div>
              <div className="text-[11px] text-stone-400">Breach any of the 3 Zone Gates to strike the Citadel directly!</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {enemyCitadelShield > 0 && (
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1">
                <Shield size={12} />
                <span>+{enemyCitadelShield} Shield</span>
              </span>
            )}
            <div className="text-right">
              <div className="text-xs font-mono text-red-400 font-bold">{enemyCitadelHp} / 30 HP</div>
              <div className="w-36 h-2 rounded-full bg-stone-900 border border-red-950 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
                  style={{ width: `${(enemyCitadelHp / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 VISUALLY DIFFERENTIATED ZONES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['LEFT_FLANK', 'MAIN_CENTER', 'RIGHT_FLANK'] as PrototypingZoneId[]).map(zoneId => {
            const zone = zones[zoneId];
            const isTargetable = Boolean(selectedCard);
            const forecast = getLineForecast(zoneId);

            return (
              <div
                key={zoneId}
                className={`p-4 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                  zone.isBreached
                    ? 'bg-red-950/30 border-red-500/60 shadow-xl shadow-red-950/50'
                    : `${zone.colorTheme.bg} ${zone.colorTheme.border} ${zone.colorTheme.glow}`
                }`}
              >
                {/* Zone Identity Header */}
                <div className="border-b border-stone-800/80 pb-2 mb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-sm font-cinzel font-bold flex items-center gap-1.5 ${zone.colorTheme.accent}`}>
                        <span>{zone.name}</span>
                        {zone.isBreached && (
                          <span className="px-2 py-0.5 rounded bg-red-500 text-white font-mono text-[9px] font-bold animate-pulse">
                            BREACHED
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-stone-400 mt-0.5">{zone.badge}</div>
                    </div>

                    {/* Zone Gate HP */}
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-stone-400">Gate Integrity</div>
                      <div className="text-xs font-mono font-bold text-amber-400">
                        {zone.currentHp} / {zone.maxHp} HP
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-400 mt-1 italic">
                    {zone.specialRule}
                  </p>
                </div>

                {/* Active Zone Hazard Indicator */}
                {zone.activeHazard && (
                  <div className="mb-2 p-1.5 rounded-xl bg-purple-950/40 border border-purple-800/50 text-[11px] text-purple-300 flex items-center justify-between font-mono">
                    <span>🌋 {zone.activeHazard.name}</span>
                    <button
                      onClick={() => setZones(z => ({ ...z, [zoneId]: { ...z[zoneId], activeHazard: null } }))}
                      className="text-stone-400 hover:text-red-400 transition"
                      title="Dispel Hazard"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                {/* ENEMY UNIT SLOT */}
                <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 min-h-[80px] flex items-center justify-between mb-2 relative group">
                  {zone.enemyUnit ? (
                    <div className="w-full flex items-center justify-between">
                      <div 
                        onClick={() => setInspectedUnit({ unit: zone.enemyUnit!, zoneId, isPlayer: false })}
                        className="flex items-center gap-2 cursor-pointer"
                        title="Click to Inspect Unit Stats & Formulas"
                      >
                        <span className="text-2xl">{zone.enemyUnit.card.emoji}</span>
                        <div>
                          <div className="text-xs font-cinzel font-bold text-red-200 flex items-center gap-1">
                            <span>{zone.enemyUnit.card.name}</span>
                            <Eye size={12} className="opacity-0 group-hover:opacity-100 text-stone-400 transition" />
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">
                            {zone.enemyUnit.statuses.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        {zone.enemyUnit.armor > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-bold">
                            🛡️ {zone.enemyUnit.armor}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                          ⚔️ {zone.enemyUnit.currentPwr}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200 font-bold">
                          ❤️ {zone.enemyUnit.currentHp}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center text-xs text-stone-600 font-cinzel flex items-center justify-center gap-1">
                      <span>No Enemy Defender</span>
                    </div>
                  )}
                </div>

                {/* CENTRAL CLASH PREDICTION BAR */}
                <div className="my-1 py-1 px-2 rounded-xl bg-stone-950/90 border border-stone-800 text-[10px] font-mono flex items-center justify-between">
                  <div className="flex items-center gap-1 text-stone-400">
                    <Swords size={12} className="text-amber-500/60" />
                    <span>Forecast:</span>
                  </div>
                  <div className={`font-bold ${forecast.color}`}>{forecast.note}</div>
                </div>

                {/* PLAYER UNIT SLOT */}
                <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 min-h-[80px] flex items-center justify-between my-2 relative group">
                  {zone.playerUnit ? (
                    <div className="w-full flex items-center justify-between">
                      <div 
                        onClick={() => setInspectedUnit({ unit: zone.playerUnit!, zoneId, isPlayer: true })}
                        className="flex items-center gap-2 cursor-pointer"
                        title="Click to Inspect Unit Stats & Formulas"
                      >
                        <span className="text-2xl">{zone.playerUnit.card.emoji}</span>
                        <div>
                          <div className="text-xs font-cinzel font-bold text-amber-200 flex items-center gap-1">
                            <span>{zone.playerUnit.card.name}</span>
                            {zone.playerUnit.equippedWeapon && (
                              <span className="text-[10px] text-cyan-400">
                                [{zone.playerUnit.equippedWeapon.emoji}]
                              </span>
                            )}
                            <Eye size={12} className="opacity-0 group-hover:opacity-100 text-stone-400 transition" />
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">
                            {zone.playerUnit.statuses.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        {zone.playerUnit.armor > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-bold">
                            🛡️ {zone.playerUnit.armor}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold">
                          ⚔️ {zone.playerUnit.currentPwr}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200 font-bold">
                          ❤️ {zone.playerUnit.currentHp}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center text-xs text-stone-600 font-cinzel">
                      Empty Player Slot
                    </div>
                  )}
                </div>

                {/* Targeted Deploy Button */}
                {isTargetable && (
                  <button
                    onClick={() => handleDeployToZone(zoneId)}
                    className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg animate-pulse"
                  >
                    <Target size={14} />
                    <span>Deploy into {zone.name}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* PLAYER CITADEL */}
        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Castle size={20} />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-amber-200">Your Sovereign Citadel</div>
              <div className="text-[11px] text-stone-400">Protect your 3 lines to prevent enemy Breakthrough!</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {playerCitadelShield > 0 && (
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1">
                <Shield size={12} />
                <span>+{playerCitadelShield} Shield</span>
              </span>
            )}
            <div className="text-right">
              <div className="text-xs font-mono text-amber-400 font-bold">{playerCitadelHp} / 30 HP</div>
              <div className="w-36 h-2 rounded-full bg-stone-900 border border-amber-950 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${(playerCitadelHp / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. MOBILIZATION CONTROL & GRAND CLASH TRIGGER */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-xs text-stone-300 font-sans">
          {buildTurn === 'CLASH' ? (
            <span className="text-red-400 font-bold font-cinzel flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>3-Turn Build complete! Strike the War Horn to resolve the 3-Line Grand Clash!</span>
            </span>
          ) : (
            <span>
              <strong>Build Turn {buildTurn} of 3</strong>: Select cards below to deploy into the 3 zones. Click advance when ready.
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {buildTurn === 'CLASH' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExecuteGrandClash(true)}
                disabled={isClashResolving}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-red-950/50 animate-bounce"
              >
                <Swords size={16} />
                <span>💥 Execute 3-Line Grand Clash</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdvanceBuildTurn}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
            >
              <span>Advance Build Phase (Turn {buildTurn} ➔ {buildTurn === 3 ? 'Clash' : buildTurn + 1})</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. DEPLOYMENT HAND & CARD SELECTION TRAY */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl space-y-3">
        
        {/* Category Filters */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-amber-400" />
            <span className="text-xs font-cinzel font-bold text-amber-200">
              Deployment Hand ({hand.length} Available Cards)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {(['ALL', 'CHAMPION', 'BEAST', 'WEAPON', 'HAZARD_SPELL'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-xl font-cinzel text-[10px] font-bold transition ${
                  selectedCategoryFilter === cat
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hand Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {hand
            .filter(c => selectedCategoryFilter === 'ALL' || c.category === selectedCategoryFilter)
            .map(card => {
              const isSelected = card.id === selectedCardId;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setSelectedCardId(isSelected ? null : card.id);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-800/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl">{card.emoji}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-950 text-amber-400">
                        {card.cost.valor ? `👑${card.cost.valor}` : ''}
                        {card.cost.primal ? `🌿${card.cost.primal}` : ''}
                        {card.cost.metal ? `⚙️${card.cost.metal}` : ''}
                        {card.cost.aether ? `✨${card.cost.aether}` : ''}
                      </span>
                    </div>
                    <div className="text-xs font-cinzel font-bold text-amber-100 truncate">{card.name}</div>
                    <div className="text-[10px] text-stone-400 font-mono mb-1">{card.category}</div>
                    <div className="text-[10px] text-stone-300 leading-snug line-clamp-2">{card.description}</div>
                  </div>

                  {card.power !== undefined && (
                    <div className="mt-2 pt-1 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-red-400 font-bold">⚔️ {card.power}</span>
                      <span className="text-stone-300 font-bold">❤️ {card.health}</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 6. REAL-TIME TELEMETRY & BREAKTHROUGH LOG */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-950 border border-stone-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="text-xs font-cinzel font-bold text-stone-300 flex items-center gap-2">
            <TrendingUp size={15} className="text-amber-400" />
            <span>3-Line Breakthrough Chronology & Combat Logs</span>
          </div>
          <span className="text-[10px] font-mono text-stone-500">Auto-logging all clash triggers</span>
        </div>

        <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs font-sans">
          {logs.map(log => (
            <div
              key={log.id}
              className={`p-2 rounded-xl border flex items-start justify-between gap-2 ${
                log.type === 'breakthrough' ? 'bg-red-950/40 border-red-700/60 text-red-200 font-bold' :
                log.type === 'combat' ? 'bg-amber-950/30 border-amber-800/40 text-amber-200' :
                log.type === 'hazard' ? 'bg-purple-950/30 border-purple-800/40 text-purple-200' :
                log.type === 'die' ? 'bg-cyan-950/30 border-cyan-800/40 text-cyan-200' :
                'bg-stone-900/50 border-stone-800 text-stone-300'
              }`}
            >
              <div>{log.msg}</div>
              <span className="text-[10px] font-mono text-stone-500 shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. MODALS: BATTLE OUTCOMES (VICTORY / DEFEAT / STALEMATE) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {matchOutcome && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-lg w-full p-6 rounded-3xl border shadow-2xl space-y-5 ${
                matchOutcome === 'victory'
                  ? 'bg-gradient-to-b from-stone-900 to-amber-950/90 border-amber-500/60 shadow-amber-500/20'
                  : matchOutcome === 'defeat'
                  ? 'bg-gradient-to-b from-stone-900 to-red-950/90 border-red-500/60 shadow-red-500/20'
                  : 'bg-gradient-to-b from-stone-900 to-indigo-950/90 border-indigo-500/60'
              }`}
            >
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-4 rounded-3xl bg-stone-900/80 border border-stone-700 shadow-inner">
                  {matchOutcome === 'victory' ? (
                    <Award size={48} className="text-amber-400 animate-bounce" />
                  ) : matchOutcome === 'defeat' ? (
                    <Skull size={48} className="text-red-400 animate-pulse" />
                  ) : (
                    <Shield size={48} className="text-indigo-400" />
                  )}
                </div>

                <h2 className="text-2xl font-cinzel font-bold text-amber-100">
                  {matchOutcome === 'victory' && '🏆 LINE BREAKTHROUGH VICTORY'}
                  {matchOutcome === 'defeat' && '💀 SOVEREIGN CITADEL DESTROYED'}
                  {matchOutcome === 'stalemate' && '⚔️ DUAL DESTRUCTION STALEMATE'}
                </h2>

                <p className="text-xs text-stone-300 font-sans">
                  {matchOutcome === 'victory'
                    ? 'You successfully breached the enemy frontier gates and crushed the Sovereign Citadel!'
                    : matchOutcome === 'defeat'
                    ? 'The opposing army breached your defenses and dismantled your Sovereign Citadel.'
                    : 'Both Citadels succumbed to catastrophic simultaneous damage.'}
                </p>
              </div>

              {/* Match Stats Grid */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs font-mono">
                <div className="p-2 rounded-xl bg-stone-900/60">
                  <div className="text-stone-400 text-[10px]">Enemy Gates Breached</div>
                  <div className="text-amber-300 font-bold">{matchStats.enemyGatesBreached} of 3 Gates</div>
                </div>
                <div className="p-2 rounded-xl bg-stone-900/60">
                  <div className="text-stone-400 text-[10px]">Your Gates Breached</div>
                  <div className="text-red-300 font-bold">{matchStats.gatesBreached} of 3 Gates</div>
                </div>
                <div className="p-2 rounded-xl bg-stone-900/60">
                  <div className="text-stone-400 text-[10px]">Total Pierce Damage</div>
                  <div className="text-cyan-300 font-bold">{matchStats.pierceDamageDealt} DMG</div>
                </div>
                <div className="p-2 rounded-xl bg-stone-900/60">
                  <div className="text-stone-400 text-[10px]">Direct Citadel Damage</div>
                  <div className="text-emerald-300 font-bold">{matchStats.citadelDamageDealt} DMG</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleStartNextCycle}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <RefreshCw size={15} />
                  <span>Advance to Cycle {epicCycle + 1}</span>
                </button>

                <button
                  onClick={handleResetSandbox}
                  className="py-3 px-5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-cinzel font-bold text-xs uppercase tracking-wider transition border border-stone-700"
                >
                  <span>Reset Match</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 8. MODAL: UNIT INSPECTOR & SANDBOX TWEAKER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectedUnit && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full p-5 rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{inspectedUnit.unit.card.emoji}</span>
                  <div>
                    <h3 className="text-sm font-cinzel font-bold text-amber-200">{inspectedUnit.unit.card.name}</h3>
                    <div className="text-[10px] font-mono text-stone-400">
                      {inspectedUnit.isPlayer ? 'Player Unit' : 'Enemy Defender'} in {zones[inspectedUnit.zoneId].name}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setInspectedUnit(null)}
                  className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-2xl bg-stone-950 border border-stone-800">
                  <div className="text-[10px] text-stone-400">Power</div>
                  <div className="text-red-400 font-bold text-base">⚔️ {inspectedUnit.unit.currentPwr}</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-stone-950 border border-stone-800">
                  <div className="text-[10px] text-stone-400">Health</div>
                  <div className="text-emerald-400 font-bold text-base">❤️ {inspectedUnit.unit.currentHp}</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-stone-950 border border-stone-800">
                  <div className="text-[10px] text-stone-400">Armor</div>
                  <div className="text-cyan-400 font-bold text-base">🛡️ {inspectedUnit.unit.armor}</div>
                </div>
              </div>

              {/* Description & Keywords */}
              <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2 text-xs">
                <p className="text-stone-300 leading-relaxed">{inspectedUnit.unit.card.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {inspectedUnit.unit.statuses.map((st, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-stone-800 text-amber-300 text-[10px] font-mono">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipped Weapon */}
              {inspectedUnit.unit.equippedWeapon && (
                <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs">
                  <div className="text-[10px] font-cinzel text-cyan-400 font-bold uppercase">Equipped Weapon / Relic</div>
                  <div className="text-cyan-200 font-bold">{inspectedUnit.unit.equippedWeapon.emoji} {inspectedUnit.unit.equippedWeapon.name}</div>
                  <div className="text-[10px] text-cyan-300/80">{inspectedUnit.unit.equippedWeapon.description}</div>
                </div>
              )}

              {/* Sandbox Quick Tweakers */}
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
                <div className="text-[10px] font-mono text-stone-400">Sandbox Tweak:</div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setZones(z => {
                        const copy = { ...z };
                        const u = inspectedUnit.isPlayer ? copy[inspectedUnit.zoneId].playerUnit : copy[inspectedUnit.zoneId].enemyUnit;
                        if (u) u.currentPwr += 1;
                        return copy;
                      });
                      setInspectedUnit(prev => prev ? { ...prev, unit: { ...prev.unit, currentPwr: prev.unit.currentPwr + 1 } } : null);
                    }}
                    className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-xs font-mono"
                  >
                    +1 PWR
                  </button>
                  <button
                    onClick={() => {
                      setZones(z => {
                        const copy = { ...z };
                        const u = inspectedUnit.isPlayer ? copy[inspectedUnit.zoneId].playerUnit : copy[inspectedUnit.zoneId].enemyUnit;
                        if (u) u.currentHp += 2;
                        return copy;
                      });
                      setInspectedUnit(prev => prev ? { ...prev, unit: { ...prev.unit, currentHp: prev.unit.currentHp + 2 } } : null);
                    }}
                    className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-xs font-mono"
                  >
                    +2 HP
                  </button>
                  <button
                    onClick={() => {
                      setZones(z => {
                        const copy = { ...z };
                        if (inspectedUnit.isPlayer) copy[inspectedUnit.zoneId].playerUnit = null;
                        else copy[inspectedUnit.zoneId].enemyUnit = null;
                        return copy;
                      });
                      setInspectedUnit(null);
                    }}
                    className="px-2 py-1 rounded bg-red-950 hover:bg-red-900 text-red-300 text-xs font-mono"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 9. MODAL: PRESET SCENARIO SELECTOR */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showScenarioModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-lg w-full p-6 rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-amber-400" />
                  <h3 className="text-sm font-cinzel font-bold text-amber-200">Load Sandbox Scenario Preset</h3>
                </div>
                <button
                  onClick={() => setShowScenarioModal(false)}
                  className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2.5">
                {SCENARIOS.map(sc => (
                  <div
                    key={sc.id}
                    onClick={() => {
                      soundEngine.playMicroSound('cardFlip');
                      sc.setup(setZones, setEnemyCitadelHp, setPlayerCitadelHp);
                      addLog(`Loaded Scenario: ${sc.name}`, 'info');
                      setShowScenarioModal(false);
                    }}
                    className="p-3.5 rounded-2xl bg-stone-950/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition flex items-center gap-3.5 group"
                  >
                    <span className="text-3xl">{sc.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs font-cinzel font-bold text-amber-100 group-hover:text-amber-300">
                        {sc.name}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">{sc.description}</div>
                    </div>
                    <ChevronRight size={16} className="text-stone-600 group-hover:text-amber-400 transition" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 10. MODAL: TRANSMUTATION CRUCIBLE */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showTransmutationModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full p-6 rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <RefreshCw size={18} className="text-cyan-400" />
                  <h3 className="text-sm font-cinzel font-bold text-cyan-200">Alchemical Transmutation Crucible</h3>
                </div>
                <button
                  onClick={() => setShowTransmutationModal(false)}
                  className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs text-stone-400">
                Transmute 2 units of any resource pool to synthesize a desired resource or generate Citadel Barrier Shields.
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="text-xs text-amber-200 font-cinzel">2 Primal ➔ 1 Valor Essence</span>
                  <button
                    onClick={() => handleTransmute('primal', 'valor')}
                    disabled={resources.primal < 2}
                    className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-stone-950 font-bold text-xs font-mono"
                  >
                    Transmute
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="text-xs text-cyan-200 font-cinzel">2 Valor ➔ 1 Forge Metal</span>
                  <button
                    onClick={() => handleTransmute('valor', 'metal')}
                    disabled={resources.valor < 2}
                    className="px-3 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-stone-950 font-bold text-xs font-mono"
                  >
                    Transmute
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="text-xs text-purple-200 font-cinzel">2 Metal ➔ 1 Aether Magic</span>
                  <button
                    onClick={() => handleTransmute('metal', 'aether')}
                    disabled={resources.metal < 2}
                    className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-stone-950 font-bold text-xs font-mono"
                  >
                    Transmute
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-950 border border-cyan-800/60">
                  <span className="text-xs text-cyan-300 font-cinzel">2 Aether ➔ +3 Citadel Barrier Shield</span>
                  <button
                    onClick={() => handleTransmute('aether', 'CITADEL_SHIELD')}
                    disabled={resources.aether < 2}
                    className="px-3 py-1 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-stone-950 font-bold text-xs font-mono"
                  >
                    Shield Up
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 11. MODAL: RULES CODEX */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showCodexModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-lg w-full p-6 rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-amber-400" />
                  <h3 className="text-sm font-cinzel font-bold text-amber-200">3-Line Zoning & Breakthrough Codex</h3>
                </div>
                <button
                  onClick={() => setShowCodexModal(false)}
                  className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-300 max-h-96 overflow-y-auto pr-1">
                <div>
                  <h4 className="font-cinzel font-bold text-amber-400">1. The 3-Frontier Topology</h4>
                  <p className="mt-0.5 text-stone-400">
                    The battlefield is partitioned into 3 distinct gates: Left Flank (20 HP, Agility), Main Vanguard Center (30 HP, +1 Armor Bastion), and Right Flank (20 HP, Artillery Ridge).
                  </p>
                </div>

                <div>
                  <h4 className="font-cinzel font-bold text-amber-400">2. The 3-Turn Mobilization Loop</h4>
                  <p className="mt-0.5 text-stone-400">
                    Players step through Turn 1 (Scout & Terraforming), Turn 2 (Armaments & Mutations), and Turn 3 (Formations & Ambush Traps) before sounding the War Horn for the simultaneous Grand Clash.
                  </p>
                </div>

                <div>
                  <h4 className="font-cinzel font-bold text-amber-400">3. Line Breakthrough Win Condition</h4>
                  <p className="mt-0.5 text-stone-400">
                    When a Zone Gate falls to 0 HP, it is <strong>BREACHED</strong>. Any surviving attackers in that line charge through the breach directly into the enemy Sovereign Citadel (30 HP). Destroying the Sovereign Citadel achieves instant victory!
                  </p>
                </div>

                <div>
                  <h4 className="font-cinzel font-bold text-amber-400">4. Damage & Pierce Formulas</h4>
                  <p className="mt-0.5 text-stone-400 font-mono">
                    Effective Damage = max(0, Attacker Power - Defender Armor)<br />
                    Pierce Overkill = abs(Defender Negative HP) ➔ Directly Damages Gate!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
