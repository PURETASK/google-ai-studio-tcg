import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SiegeCard, 
  SiegeMatchState, 
  LaneId, 
  DeployedUnit, 
  SiegeCardType, 
  ClashEventLog 
} from './types';
import { 
  SIEGE_CARDS_CATALOG, 
  INITIAL_MATCH_STATE, 
  INITIAL_LANES 
} from './siegeData';
import { TriForgeRulesModal } from './TriForgeRulesModal';
import { soundEngine } from '../../utils/audioEngine';
import { 
  Castle, 
  Shield, 
  Swords, 
  Crown, 
  Trees, 
  Dices, 
  Zap, 
  Flame, 
  Skull, 
  Sparkles, 
  RotateCcw, 
  Play, 
  HelpCircle, 
  Crosshair, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Plus,
  Eye,
  EyeOff,
  Layers,
  ChevronRight,
  TrendingUp,
  Volume2
} from 'lucide-react';

export const TriForgeSiegeArena: React.FC = () => {
  const [matchState, setMatchState] = useState<SiegeMatchState>(() => JSON.parse(JSON.stringify(INITIAL_MATCH_STATE)));
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | 'VALOR' | 'PRIMAL' | 'FORGE' | 'AETHER'>('ALL');
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isResolvingStep, setIsResolvingStep] = useState(false);
  const [inspectedCard, setInspectedCard] = useState<SiegeCard | null>(null);

  const selectedCard = matchState.playerHand.find(c => c.id === selectedCardId) || null;

  // Sound helper
  const playSfx = (type: 'card_play' | 'combat' | 'buff' | 'turn_bell' | 'dice_roll' | 'click') => {
    switch (type) {
      case 'card_play':
        soundEngine.playMicroSound('cardFlip');
        break;
      case 'combat':
        soundEngine.playMicroSound('equip');
        break;
      case 'buff':
        soundEngine.playMicroSound('shimmer');
        break;
      case 'turn_bell':
        soundEngine.playMicroSound('unlock');
        break;
      case 'dice_roll':
        soundEngine.playMicroSound('manaSpend');
        break;
      case 'click':
      default:
        soundEngine.playMicroSound('click');
        break;
    }
  };

  // Roll Dynamic Momentum Die
  const handleRollMomentum = () => {
    playSfx('dice_roll');
    const isLateGame = matchState.epicCycle >= 2;
    const dieMax = isLateGame ? 12 : 6;
    const roll = Math.floor(Math.random() * dieMax) + 1;
    const totalForge = Math.min(10, matchState.playerResources.forge + roll);

    setMatchState(prev => ({
      ...prev,
      playerResources: {
        ...prev.playerResources,
        forge: totalForge,
        lastMomentumRoll: roll
      },
      combatLogs: [
        {
          id: `roll_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId: 'CENTER_VANGUARD',
          title: `Momentum Die Rolled: d${dieMax} ➔ [ ${roll} ]`,
          detail: `Player generated +${roll} Forge Kinetics! Current pool: ${totalForge} Forge.`,
          severity: 'info'
        },
        ...prev.combatLogs
      ]
    }));
  };

  // Bank Kinetic Stash / Shield
  const handleBankMomentum = (type: 'STASH' | 'SHIELD') => {
    playSfx('buff');
    const unspentForge = matchState.playerResources.forge;
    if (unspentForge <= 0) return;

    if (type === 'STASH') {
      const banked = Math.max(1, Math.floor(unspentForge / 2));
      setMatchState(prev => ({
        ...prev,
        playerResources: {
          ...prev.playerResources,
          forge: 0,
          kineticStash: prev.playerResources.kineticStash + banked
        },
        combatLogs: [
          {
            id: `stash_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            laneId: 'CENTER_VANGUARD',
            title: `Kinetic Battery Stashed`,
            detail: `Banked +${banked} Kinetic Stash into Citadel Vault for the next Epic Cycle!`,
            severity: 'info'
          },
          ...prev.combatLogs
        ]
      }));
    } else {
      const shieldGain = unspentForge * 2;
      setMatchState(prev => ({
        ...prev,
        playerResources: {
          ...prev.playerResources,
          forge: 0
        },
        playerCitadel: {
          ...prev.playerCitadel,
          shield: prev.playerCitadel.shield + shieldGain
        },
        combatLogs: [
          {
            id: `shield_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            laneId: 'CENTER_VANGUARD',
            title: `Citadel Aegis Shield Overcharged`,
            detail: `Converted ${unspentForge} Forge Kinetics into +${shieldGain} Citadel Barrier Shield!`,
            severity: 'info'
          },
          ...prev.combatLogs
        ]
      }));
    }
  };

  // Deploy / Play Card to Target Lane
  const handleDeployToLane = (laneId: LaneId) => {
    if (!selectedCard) return;

    const { valor = 0, primal = 0, forge = 0, aether = 0 } = selectedCard.cost;
    const { playerResources } = matchState;

    // Check resource affordability
    if (
      playerResources.valor < valor ||
      playerResources.primal < primal ||
      playerResources.forge < (forge + aether)
    ) {
      alert('Insufficient Tri-Forge resources to mobilize this asset!');
      return;
    }

    playSfx('card_play');

    setMatchState(prev => {
      const newLanes = { ...prev.lanes };
      const currentLane = { ...newLanes[laneId] };
      const newLogs: ClashEventLog[] = [...prev.combatLogs];

      // Handle card types
      if (selectedCard.type === 'CHAMPION' || selectedCard.type === 'BEAST') {
        const unit: DeployedUnit = {
          instanceId: `u_${Date.now()}`,
          card: selectedCard,
          currentHealth: selectedCard.health || 5,
          maxHealth: selectedCard.health || 5,
          currentPower: selectedCard.power || 4,
          armor: selectedCard.armor || 0,
          statuses: [...selectedCard.keywords],
          socketedWeapon: null
        };
        currentLane.playerUnit = unit;
        newLogs.unshift({
          id: `dep_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId,
          title: `Unit Deployed: ${selectedCard.name}`,
          detail: `Mobilized ${selectedCard.name} (${selectedCard.power} PWR / ${selectedCard.health} HP) into ${currentLane.name}.`,
          severity: 'info'
        });
      } else if (selectedCard.type === 'WEAPON') {
        if (currentLane.playerUnit) {
          const u = { ...currentLane.playerUnit };
          u.socketedWeapon = selectedCard;
          if (selectedCard.weaponBonus) {
            u.currentPower += selectedCard.weaponBonus.power;
            u.armor += selectedCard.weaponBonus.armor || 0;
            if (selectedCard.weaponBonus.grantedKeyword) {
              u.statuses.push(selectedCard.weaponBonus.grantedKeyword);
            }
          }
          currentLane.playerUnit = u;
          newLogs.unshift({
            id: `wep_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            laneId,
            title: `Weapon Socketed: ${selectedCard.name}`,
            detail: `Socketed ${selectedCard.name} onto ${u.card.name}! Power increased to ${u.currentPower} PWR.`,
            severity: 'combat'
          });
        } else {
          alert('Cannot socket weapon: No friendly unit in this lane! Summon a unit first.');
          return prev;
        }
      } else if (selectedCard.type === 'HAZARD') {
        currentLane.activeHazard = {
          card: selectedCard,
          placedBy: 'player',
          durationTurns: 2
        };
        newLogs.unshift({
          id: `haz_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId,
          title: `Terraformed Lane Hazard: ${selectedCard.name}`,
          detail: `Active Hazard set on ${currentLane.name}: ${selectedCard.description}`,
          severity: 'hazard'
        });
      } else if (selectedCard.type === 'AMBUSH_TRAP') {
        currentLane.playerTrap = {
          instanceId: `trap_${Date.now()}`,
          card: selectedCard,
          placedBy: 'player',
          isRevealed: false
        };
        newLogs.unshift({
          id: `trap_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId,
          title: `Secret Ambush Set`,
          detail: `Placed a face-down reaction trap in ${currentLane.name}. Will trigger upon enemy clash!`,
          severity: 'trap'
        });
      }

      newLanes[laneId] = currentLane;

      return {
        ...prev,
        lanes: newLanes,
        playerResources: {
          ...prev.playerResources,
          valor: prev.playerResources.valor - valor,
          primal: prev.playerResources.primal - primal,
          forge: prev.playerResources.forge - (forge + aether)
        },
        playerHand: prev.playerHand.filter(c => c.id !== selectedCard.id),
        combatLogs: newLogs
      };
    });

    setSelectedCardId(null);
  };

  // Advance Mobilization Turn (1 -> 2 -> 3 -> Clash)
  const handleAdvanceTurn = () => {
    playSfx('turn_bell');

    if (matchState.mobilizationTurn === 3) {
      // Ready for Grand Clash
      setMatchState(prev => ({
        ...prev,
        mobilizationTurn: 'CLASH',
        combatLogs: [
          {
            id: `clash_ready_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            laneId: 'CENTER_VANGUARD',
            title: '⚔️ War Horn: Mobilization Complete!',
            detail: 'All 3 preparation turns finished. Ready to execute the Grand Simultaneous Clash!',
            severity: 'combat'
          },
          ...prev.combatLogs
        ]
      }));
      return;
    }

    const nextTurn = (matchState.mobilizationTurn + 1) as 2 | 3;

    // Simulate AI Opponent Mobilization Action
    setMatchState(prev => {
      const newLanes = { ...prev.lanes };
      const newLogs = [...prev.combatLogs];
      const oppHand = [...prev.opponentHand];

      if (nextTurn === 2) {
        // AI summons Champion in Center and Hazard in Left
        const selene = oppHand.find(c => c.id === 'val_004') || SIEGE_CARDS_CATALOG[3];
        newLanes.CENTER_VANGUARD.opponentUnit = {
          instanceId: `opp_u1`,
          card: selene,
          currentHealth: selene.health || 8,
          maxHealth: selene.health || 8,
          currentPower: selene.power || 3,
          armor: selene.armor || 2,
          statuses: [...selene.keywords]
        };
        newLogs.unshift({
          id: `opp_dep_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId: 'CENTER_VANGUARD',
          title: `Enemy Mobilization: ${selene.name}`,
          detail: `Opponent deployed ${selene.name} into the Center Vanguard Keep!`,
          severity: 'info'
        });

        // AI sets hazard in Left Flank
        const miasma = oppHand.find(c => c.id === 'aet_002') || SIEGE_CARDS_CATALOG[13];
        newLanes.LEFT_FLANK.activeHazard = {
          card: miasma,
          placedBy: 'opponent',
          durationTurns: 2
        };
        newLogs.unshift({
          id: `opp_haz_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId: 'LEFT_FLANK',
          title: `Enemy Terraforming: ${miasma.name}`,
          detail: `Opponent unleashed Abyssal Miasma in the Left Shadow Flank!`,
          severity: 'hazard'
        });
      } else if (nextTurn === 3) {
        // AI equips Dragonscale Shield and sets Ambush in Right Lane
        if (newLanes.CENTER_VANGUARD.opponentUnit) {
          const shieldCard = SIEGE_CARDS_CATALOG[9];
          newLanes.CENTER_VANGUARD.opponentUnit.socketedWeapon = shieldCard;
          newLanes.CENTER_VANGUARD.opponentUnit.armor += 3;
          newLogs.unshift({
            id: `opp_wep_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            laneId: 'CENTER_VANGUARD',
            title: `Enemy Armament: Dragonscale Shield`,
            detail: `Opponent fortified their Center Champion with +3 Armor!`,
            severity: 'combat'
          });
        }

        // AI sets Ambush in Right Lane
        const trapCard = SIEGE_CARDS_CATALOG[15];
        newLanes.RIGHT_SIEGE.opponentTrap = {
          instanceId: `opp_trap_1`,
          card: trapCard,
          placedBy: 'opponent',
          isRevealed: false
        };
        newLogs.unshift({
          id: `opp_trap_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId: 'RIGHT_SIEGE',
          title: `Enemy Ambush Concealed`,
          detail: `Opponent placed a mysterious face-down trap in the Right Artillery Lane.`,
          severity: 'trap'
        });
      }

      return {
        ...prev,
        mobilizationTurn: nextTurn,
        lanes: newLanes,
        playerResources: {
          ...prev.playerResources,
          valor: Math.min(8, prev.playerResources.valor + 2),
          primal: Math.min(8, prev.playerResources.primal + 2),
          forge: Math.min(8, prev.playerResources.forge + 2)
        },
        combatLogs: newLogs
      };
    });
  };

  // Execute The Grand Clash Resolution
  const handleExecuteGrandClash = async () => {
    setIsResolvingStep(true);
    playSfx('combat');

    const newLanes = JSON.parse(JSON.stringify(matchState.lanes)) as Record<LaneId, any>;
    const newLogs = [...matchState.combatLogs];
    let pCitadelHp = matchState.playerCitadel.health;
    let oCitadelHp = matchState.opponentCitadel.health;

    newLogs.unshift({
      id: `clash_start_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
      laneId: 'CENTER_VANGUARD',
      title: '💥 THE GRAND SIMULTANEOUS CLASH COMMENCES',
      detail: 'Resolving Ambush Traps, Lane Hazards, and Unit Collisions simultaneously across all 3 frontiers!',
      severity: 'combat'
    });

    const laneIds: LaneId[] = ['LEFT_FLANK', 'CENTER_VANGUARD', 'RIGHT_SIEGE'];

    laneIds.forEach(laneId => {
      const lane = newLanes[laneId];
      const pUnit = lane.playerUnit as DeployedUnit | null;
      const oUnit = lane.opponentUnit as DeployedUnit | null;

      // 1. Ambush Traps Reveal
      if (lane.playerTrap && !lane.playerTrap.isRevealed) {
        lane.playerTrap.isRevealed = true;
        if (lane.playerTrap.card.ambushTrigger?.damage && oUnit) {
          const dmg = lane.playerTrap.card.ambushTrigger.damage;
          oUnit.currentHealth -= dmg;
          newLogs.unshift({
            id: `trap_trig_${Date.now()}_${laneId}`,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            laneId,
            title: `💥 Friendly Trap Triggered: ${lane.playerTrap.card.name}`,
            detail: `Dealt ${dmg} ambush damage to enemy unit in ${lane.name}!`,
            severity: 'trap'
          });
        }
      }

      if (lane.opponentTrap && !lane.opponentTrap.isRevealed) {
        lane.opponentTrap.isRevealed = true;
        if (lane.opponentTrap.card.ambushTrigger?.damage && pUnit) {
          const dmg = lane.opponentTrap.card.ambushTrigger.damage;
          pUnit.currentHealth -= dmg;
          newLogs.unshift({
            id: `opp_trap_trig_${Date.now()}_${laneId}`,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            laneId,
            title: `⚠️ Enemy Trap Triggered: ${lane.opponentTrap.card.name}`,
            detail: `Enemy trap sprang, dealing ${dmg} ambush damage to your unit in ${lane.name}!`,
            severity: 'trap'
          });
        }
      }

      // 2. Simultaneous Unit Clash & Gate Damage
      if (pUnit && oUnit) {
        // Both units clash
        const pEffDmg = Math.max(0, pUnit.currentPower - oUnit.armor);
        const oEffDmg = Math.max(0, oUnit.currentPower - pUnit.armor);

        oUnit.currentHealth -= pEffDmg;
        pUnit.currentHealth -= oEffDmg;

        newLogs.unshift({
          id: `clash_unit_${Date.now()}_${laneId}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId,
          title: `Clash in ${lane.name}`,
          detail: `${pUnit.card.name} dealt ${pEffDmg} DMG ⚔️ ${oUnit.card.name} dealt ${oEffDmg} DMG!`,
          severity: 'combat'
        });

        // Pierce / Overkill damage to Gate
        if (pUnit.statuses.includes('Pierce') && oUnit.currentHealth < 0) {
          const overkill = Math.abs(oUnit.currentHealth);
          lane.currentHp = Math.max(0, lane.currentHp - overkill);
          newLogs.unshift({
            id: `pierce_${Date.now()}_${laneId}`,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            laneId,
            title: `🛡️ Pierce Overkill to Enemy Gate!`,
            detail: `${pUnit.card.name} trample damage ruptured ${lane.name} for ${overkill} damage!`,
            severity: 'lethal'
          });
        }

        // Clean up dead units
        if (pUnit.currentHealth <= 0) lane.playerUnit = null;
        if (oUnit.currentHealth <= 0) lane.opponentUnit = null;

      } else if (pUnit && !oUnit) {
        // Unopposed player attack on Enemy Gate!
        lane.currentHp = Math.max(0, lane.currentHp - pUnit.currentPower);
        newLogs.unshift({
          id: `gate_hit_${Date.now()}_${laneId}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId,
          title: `Unopposed Gate Strike in ${lane.name}!`,
          detail: `${pUnit.card.name} battered the enemy Gate directly for ${pUnit.currentPower} damage!`,
          severity: 'lethal'
        });
      } else if (!pUnit && oUnit) {
        // Unopposed enemy attack on Player Gate!
        lane.currentHp = Math.max(0, lane.currentHp - oUnit.currentPower);
        newLogs.unshift({
          id: `p_gate_hit_${Date.now()}_${laneId}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId,
          title: `Enemy Gate Breach Strike in ${lane.name}!`,
          detail: `${oUnit.card.name} hammered your Gate for ${oUnit.currentPower} damage!`,
          severity: 'lethal'
        });
      }

      // 3. Check Gate Breach & Citadel Damage
      if (lane.currentHp <= 0) {
        lane.isBreached = true;
        newLogs.unshift({
          id: `breach_${Date.now()}_${laneId}`,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          laneId,
          title: `🏰 CITADEL BREACH: ${lane.name} HAS FALLEN!`,
          detail: `The gate has collapsed! Surviving units in this lane now deal direct siege strikes to the Sovereign Citadel!`,
          severity: 'breach'
        });

        // Direct Citadel Damage
        if (lane.playerUnit) {
          oCitadelHp = Math.max(0, oCitadelHp - lane.playerUnit.currentPower);
        }
      }
    });

    let winner: 'player' | 'opponent' | null = null;
    if (oCitadelHp <= 0) winner = 'player';
    if (pCitadelHp <= 0) winner = 'opponent';

    setMatchState(prev => ({
      ...prev,
      lanes: newLanes,
      playerCitadel: { ...prev.playerCitadel, health: pCitadelHp },
      opponentCitadel: { ...prev.opponentCitadel, health: oCitadelHp },
      combatLogs: newLogs,
      isClashResolving: false,
      winner
    }));

    setIsResolvingStep(false);
  };

  // Reset Match / Select Scenario
  const handleResetMatch = (scenario: 'STANDARD' | 'HAZARDS' | 'BLITZ' = 'STANDARD') => {
    playSfx('click');
    const fresh = JSON.parse(JSON.stringify(INITIAL_MATCH_STATE)) as SiegeMatchState;
    
    if (scenario === 'HAZARDS') {
      fresh.lanes.LEFT_FLANK.activeHazard = {
        card: SIEGE_CARDS_CATALOG[12],
        placedBy: 'player',
        durationTurns: 3
      };
      fresh.lanes.RIGHT_SIEGE.activeHazard = {
        card: SIEGE_CARDS_CATALOG[13],
        placedBy: 'opponent',
        durationTurns: 3
      };
    }

    setMatchState(fresh);
    setSelectedCardId(null);
  };

  const filteredCards = matchState.playerHand.filter(card => {
    if (activeCategoryFilter === 'ALL') return true;
    if (activeCategoryFilter === 'VALOR') return card.cost.valor && card.cost.valor > 0;
    if (activeCategoryFilter === 'PRIMAL') return card.cost.primal && card.cost.primal > 0;
    if (activeCategoryFilter === 'FORGE') return card.cost.forge && card.cost.forge > 0;
    if (activeCategoryFilter === 'AETHER') return card.cost.aether && card.cost.aether > 0;
    return true;
  });

  return (
    <div className="w-full space-y-4 font-sans text-stone-100">
      
      {/* ========================================================================= */}
      {/* TOP HEADER: EPIC CYCLE & 3-TURN MOBILIZATION STEPPER */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title & Mode Badge */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/40 text-amber-400">
            <Castle size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-cinzel font-bold text-amber-100 tracking-wide">
                Nexus: 3-Frontier Siege Arena
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/30 to-rose-500/30 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold">
                TRI-FORGE LAB
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Epic Cycle {matchState.epicCycle} • 3-Lane Frontline Fortress & Phased Mobilization
            </p>
          </div>
        </div>

        {/* 3-Turn Mobilization Stepper */}
        <div className="flex items-center gap-2 bg-stone-950/80 p-2 rounded-2xl border border-stone-800">
          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-cinzel font-bold transition ${
            matchState.mobilizationTurn === 1 
              ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30' 
              : 'bg-stone-900 text-stone-400'
          }`}>
            <span>T1</span>
            <span className="hidden sm:inline">Scout & Hazards</span>
          </div>

          <ChevronRight size={14} className="text-stone-600" />

          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-cinzel font-bold transition ${
            matchState.mobilizationTurn === 2 
              ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/30' 
              : 'bg-stone-900 text-stone-400'
          }`}>
            <span>T2</span>
            <span className="hidden sm:inline">Arm & Mutate</span>
          </div>

          <ChevronRight size={14} className="text-stone-600" />

          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-cinzel font-bold transition ${
            matchState.mobilizationTurn === 3 
              ? 'bg-cyan-500 text-stone-950 shadow-lg shadow-cyan-500/30' 
              : 'bg-stone-900 text-stone-400'
          }`}>
            <span>T3</span>
            <span className="hidden sm:inline">Formation & Traps</span>
          </div>

          <ChevronRight size={14} className="text-stone-600" />

          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-cinzel font-bold transition ${
            matchState.mobilizationTurn === 'CLASH' 
              ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40' 
              : 'bg-stone-900 text-stone-500'
          }`}>
            <Swords size={13} />
            <span>Clash</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRulesModalOpen(true)}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 text-xs font-cinzel font-bold flex items-center gap-1.5 transition"
            title="View Rules Codex"
          >
            <HelpCircle size={15} />
            <span className="hidden sm:inline">Codex</span>
          </button>

          <button
            onClick={() => handleResetMatch('STANDARD')}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-cinzel flex items-center gap-1.5 transition"
            title="Reset Scenario"
          >
            <RotateCcw size={15} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* TRI-FORGE RESOURCE METERS & CITADEL HUD */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        
        {/* 1. 👑 Valor Essence */}
        <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Crown size={18} />
            </div>
            <div>
              <div className="text-[11px] font-cinzel text-amber-300 uppercase tracking-wider">Valor Essence</div>
              <div className="text-lg font-cinzel font-bold text-amber-100">
                {matchState.playerResources.valor} <span className="text-xs text-amber-400/60 font-mono">/ {matchState.playerResources.maxValor}</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-amber-300/70 font-mono bg-amber-500/10 px-2 py-0.5 rounded-md">
            Champions & Spells
          </span>
        </div>

        {/* 2. 🌿 Primal Instinct */}
        <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Trees size={18} />
            </div>
            <div>
              <div className="text-[11px] font-cinzel text-emerald-300 uppercase tracking-wider">Primal Instinct</div>
              <div className="text-lg font-cinzel font-bold text-emerald-100">
                {matchState.playerResources.primal} <span className="text-xs text-emerald-400/60 font-mono">/ {matchState.playerResources.maxPrimal}</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-emerald-300/70 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-md">
            Beasts & Mutants
          </span>
        </div>

        {/* 3. ⚙️ Forge Kinetics + Momentum Die */}
        <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Dices size={18} />
            </div>
            <div>
              <div className="text-[11px] font-cinzel text-cyan-300 uppercase tracking-wider">Forge Kinetics</div>
              <div className="text-lg font-cinzel font-bold text-cyan-100 flex items-center gap-1.5">
                <span>{matchState.playerResources.forge}</span>
                <span className="text-xs text-cyan-400/60 font-mono">/ {matchState.playerResources.maxForge}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  🎲 {matchState.playerResources.lastMomentumRoll}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleRollMomentum}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-cinzel font-bold flex items-center gap-1 transition"
          >
            <Dices size={13} />
            <span>Roll</span>
          </button>
        </div>

        {/* 4. 🔋 Kinetic Battery & Stash */}
        <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Shield size={18} />
            </div>
            <div>
              <div className="text-[11px] font-cinzel text-stone-400 uppercase">Kinetic Battery</div>
              <div className="text-sm font-cinzel font-bold text-amber-300">
                +{matchState.playerResources.kineticStash} Stashed
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleBankMomentum('STASH')}
              className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-[10px] font-mono text-stone-300 border border-stone-700"
              title="Bank half into next turn reserve"
            >
              Bank
            </button>
            <button
              onClick={() => handleBankMomentum('SHIELD')}
              className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-[10px] font-mono text-amber-300 border border-amber-500/30"
              title="Convert all into Citadel Barrier Shield"
            >
              Shield
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3-FRONTIER BATTLEFIELD: CITADEL, 3 LANES & CLASH RIFT */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl relative space-y-4">
        
        {/* OPPONENT SOVEREIGN CITADEL HUD */}
        <div className="p-3 rounded-2xl bg-red-950/40 border border-red-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
              <Castle size={20} />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-red-200">Enemy Sovereign Citadel</div>
              <div className="text-[11px] text-stone-400">Guarded by 3 Fortified Gates</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-mono text-red-400 font-bold">
                {matchState.opponentCitadel.health} / {matchState.opponentCitadel.maxHealth} HP
              </div>
              <div className="w-32 h-2 rounded-full bg-stone-900 border border-red-950 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
                  style={{ width: `${(matchState.opponentCitadel.health / matchState.opponentCitadel.maxHealth) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 TACTICAL LANES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['LEFT_FLANK', 'CENTER_VANGUARD', 'RIGHT_SIEGE'] as LaneId[]).map(laneId => {
            const lane = matchState.lanes[laneId];
            const pUnit = lane.playerUnit;
            const oUnit = lane.opponentUnit;
            const isTargetable = Boolean(selectedCard);

            return (
              <div 
                key={laneId}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                  lane.isBreached 
                    ? 'bg-red-950/30 border-red-500/60 shadow-lg shadow-red-950/40' 
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                {/* Lane Header */}
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-2 mb-2">
                  <div>
                    <div className="text-xs font-cinzel font-bold text-amber-200 flex items-center gap-1.5">
                      <span>{lane.name}</span>
                      {lane.isBreached && (
                        <span className="px-1.5 py-0.2 rounded bg-red-500 text-white font-mono text-[9px] font-bold animate-pulse">
                          BREACHED
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-stone-400">{lane.specialty}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-stone-400">Gate HP</div>
                    <div className="text-xs font-mono font-bold text-amber-400">
                      {lane.currentHp}/{lane.maxHp}
                    </div>
                  </div>
                </div>

                {/* Active Lane Hazard Aura */}
                {lane.activeHazard && (
                  <div className="mb-2 p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-[11px] text-amber-300">
                    <span className="flex items-center gap-1 font-mono">
                      <span>{lane.activeHazard.card.iconEmoji}</span>
                      <strong className="font-cinzel">{lane.activeHazard.card.name}</strong>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-200 font-mono">
                      {lane.activeHazard.durationTurns} Turns
                    </span>
                  </div>
                )}

                {/* OPPONENT UNIT SLOT */}
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800/80 min-h-[70px] flex items-center justify-between mb-2">
                  {oUnit ? (
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-xl">{oUnit.card.iconEmoji}</div>
                        <div>
                          <div className="text-xs font-cinzel font-bold text-red-200">{oUnit.card.name}</div>
                          <div className="flex items-center gap-1 text-[10px] text-stone-400 font-mono">
                            {oUnit.statuses.map((st, i) => (
                              <span key={i} className="px-1 rounded bg-stone-800 text-stone-300">{st}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                          ⚔️ {oUnit.currentPower}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200 font-bold">
                          ❤️ {oUnit.currentHealth}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center text-xs text-stone-600 font-cinzel">
                      No Enemy Defender
                    </div>
                  )}
                </div>

                {/* CENTRAL CLASH DIVIDER */}
                <div className="my-1 py-1 flex items-center justify-center border-y border-dashed border-stone-800 text-[10px] font-cinzel text-stone-500 gap-2">
                  <Swords size={12} className="text-amber-500/60" />
                  <span>Central Clash Line</span>
                  <Swords size={12} className="text-amber-500/60" />
                </div>

                {/* PLAYER UNIT SLOT */}
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800/80 min-h-[70px] flex items-center justify-between my-2">
                  {pUnit ? (
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-xl">{pUnit.card.iconEmoji}</div>
                        <div>
                          <div className="text-xs font-cinzel font-bold text-amber-200 flex items-center gap-1.5">
                            <span>{pUnit.card.name}</span>
                            {pUnit.socketedWeapon && (
                              <span className="text-[10px] text-cyan-400" title={pUnit.socketedWeapon.name}>
                                [{pUnit.socketedWeapon.iconEmoji} {pUnit.socketedWeapon.name}]
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-stone-400 font-mono">
                            {pUnit.statuses.map((st, i) => (
                              <span key={i} className="px-1 rounded bg-stone-800 text-amber-300">{st}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold">
                          ⚔️ {pUnit.currentPower}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200 font-bold">
                          ❤️ {pUnit.currentHealth}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center text-xs text-stone-600 font-cinzel">
                      Empty Player Slot
                    </div>
                  )}
                </div>

                {/* Target Lane Deploy Button (when card selected) */}
                {isTargetable && (
                  <button
                    onClick={() => handleDeployToLane(laneId)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg animate-pulse"
                  >
                    <Target size={14} />
                    <span>Deploy into {lane.name}</span>
                  </button>
                )}

                {/* Player Ambush Trap Indicator */}
                {lane.playerTrap && (
                  <div className="mt-2 p-1.5 rounded-lg bg-purple-950/40 border border-purple-800/40 flex items-center justify-between text-[10px] text-purple-300 font-mono">
                    <span className="flex items-center gap-1">
                      <EyeOff size={12} />
                      <span>Concealed Ambush Trap</span>
                    </span>
                    <span>{lane.playerTrap.isRevealed ? 'REVEALED' : 'FACE-DOWN'}</span>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* PLAYER SOVEREIGN CITADEL HUD */}
        <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Castle size={20} />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-amber-200">Your Sovereign Citadel</div>
              <div className="text-[11px] text-stone-400">Citadel Barrier Shield: +{matchState.playerCitadel.shield}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-mono text-amber-400 font-bold">
                {matchState.playerCitadel.health} / {matchState.playerCitadel.maxHealth} HP
              </div>
              <div className="w-32 h-2 rounded-full bg-stone-900 border border-amber-950 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${(matchState.playerCitadel.health / matchState.playerCitadel.maxHealth) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MOBILIZATION COMMAND BAR & GRAND CLASH TRIGGER */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-xs text-stone-300 font-sans">
          {matchState.mobilizationTurn === 'CLASH' ? (
            <span className="text-red-400 font-bold font-cinzel flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>All 3 Preparation Turns complete! Strike the War Horn to execute the Grand Clash!</span>
            </span>
          ) : (
            <span>
              <strong>Turn {matchState.mobilizationTurn} of 3</strong>: Deploy champions, beasts, weapons, or lane hazards. Advance turn when ready.
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {matchState.mobilizationTurn === 'CLASH' ? (
            <button
              onClick={handleExecuteGrandClash}
              disabled={isResolvingStep}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-red-950/50 animate-bounce"
            >
              <Swords size={16} />
              <span>💥 Execute Grand Clash</span>
            </button>
          ) : (
            <button
              onClick={handleAdvanceTurn}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
            >
              <span>Advance Mobilization (Turn {matchState.mobilizationTurn} ➔ {matchState.mobilizationTurn === 3 ? 'Clash' : matchState.mobilizationTurn + 1})</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PLAYER HAND & CARD DEPLOYMENT TRAY */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-950/90 border border-stone-800 shadow-2xl space-y-3">
        
        {/* Hand Filter Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-amber-400" />
            <span className="text-xs font-cinzel font-bold text-amber-200">
              Mobilization Hand ({matchState.playerHand.length} Cards)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {(['ALL', 'VALOR', 'PRIMAL', 'FORGE', 'AETHER'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-xl font-cinzel text-[10px] font-bold transition ${
                  activeCategoryFilter === cat 
                    ? 'bg-amber-500 text-stone-950' 
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {filteredCards.map(card => {
            const isSelected = card.id === selectedCardId;
            return (
              <div
                key={card.id}
                onClick={() => {
                  playSfx('click');
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
                    <span className="text-xl">{card.iconEmoji}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-950 text-amber-400">
                      {card.cost.valor ? `👑${card.cost.valor}` : ''}
                      {card.cost.primal ? `🌿${card.cost.primal}` : ''}
                      {card.cost.forge ? `⚙️${card.cost.forge}` : ''}
                      {card.cost.aether ? `✨${card.cost.aether}` : ''}
                    </span>
                  </div>
                  <div className="text-xs font-cinzel font-bold text-amber-100 truncate">{card.name}</div>
                  <div className="text-[10px] text-stone-400 font-mono mb-1">{card.type}</div>
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
      {/* REAL-TIME CLASH TELEMETRY & EVENT LOG */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-stone-950 border border-stone-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="text-xs font-cinzel font-bold text-stone-300 flex items-center gap-2">
            <TrendingUp size={15} className="text-amber-400" />
            <span>Grand Clash Telemetry & Event Chronology</span>
          </div>
          <span className="text-[10px] font-mono text-stone-500">Auto-logging all triggers</span>
        </div>

        <div className="max-h-40 overflow-y-auto space-y-1.5 text-xs font-sans">
          {matchState.combatLogs.map(log => (
            <div 
              key={log.id}
              className={`p-2 rounded-xl border flex items-start justify-between gap-2 ${
                log.severity === 'breach' ? 'bg-red-950/40 border-red-700/60 text-red-200' :
                log.severity === 'lethal' ? 'bg-rose-950/30 border-rose-800/40 text-rose-200' :
                log.severity === 'combat' ? 'bg-amber-950/30 border-amber-800/40 text-amber-200' :
                log.severity === 'hazard' ? 'bg-purple-950/30 border-purple-800/40 text-purple-200' :
                log.severity === 'trap' ? 'bg-cyan-950/30 border-cyan-800/40 text-cyan-200' :
                'bg-stone-900/50 border-stone-800 text-stone-300'
              }`}
            >
              <div>
                <strong className="font-cinzel">{log.title}:</strong> {log.detail}
              </div>
              <span className="text-[10px] font-mono text-stone-500 shrink-0">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RULES & CODEX MODAL */}
      <TriForgeRulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />

    </div>
  );
};
