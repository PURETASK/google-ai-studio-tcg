import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Zap,
  Sword,
  Shield,
  RotateCcw,
  Sparkles,
  Flame,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  Copy,
  Check,
  Eye,
  ArrowRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type EncyclopediaCategory =
  | 'all'
  | 'skills'
  | 'abilities'
  | 'turn-loop'
  | 'domains'
  | 'zones';

export interface EncyclopediaEntry {
  id: string;
  title: string;
  category: 'skills' | 'abilities' | 'turn-loop' | 'domains' | 'zones';
  categoryLabel: string;
  badge: string;
  icon: string;
  summary: string;
  detailedRules: string[];
  formulaOrMath?: string;
  timingWindow?: string;
  strategicTips: string[];
  counterplay?: string;
  tags: string[];
  synergyArchetypes?: string[];
}

export const ENCYCLOPEDIA_ENTRIES: EncyclopediaEntry[] = [
  // =========================================================================
  // 1. SKILL FUNCTIONS & TRIGGERS
  // =========================================================================
  {
    id: 'trigger-on-play',
    title: 'On-Play (Battlecry / Summon Trigger)',
    category: 'skills',
    categoryLabel: 'Skill Functions & Triggers',
    badge: 'Invocation Skill',
    icon: '⚡',
    summary: 'Instantaneous spell or ability that triggers the moment the card enters the battlefield from hand.',
    detailedRules: [
      'Executes immediately upon casting once Essence cost is paid and lane target is selected.',
      'Resolves before any incoming reaction window unless an opponent counters with an instant Fast Spell on the Priority Chain.',
      'Does not trigger if summoned from the Boneyard (Graveyard) unless explicitly phrased as "When entering the battlefield".'
    ],
    timingWindow: 'Phase 3 (Main Staging) — Priority Chain Step 1',
    formulaOrMath: 'Trigger Order: Essence Deducted -> Target Validation -> On-Play Effect -> Board State Refresh',
    strategicTips: [
      'Use On-Play damage creatures to eliminate wounded Taunt guards immediately upon deployment.',
      'Pair with mana reduction relics to chain multiple Battlecries in a single turn.'
    ],
    counterplay: 'Hold Fast Counterspells to disrupt the summon on the priority chain before the battlecry resolves.',
    tags: ['Battlecry', 'Invocation', 'Summon', 'Instant', 'Deploy'],
    synergyArchetypes: ['Radiance Burst', 'Arcane Tempo', 'Verdant Swarm']
  },
  {
    id: 'trigger-dawn-upkeep',
    title: 'Dawn Trigger (Upkeep / Planar Hazard Phase)',
    category: 'skills',
    categoryLabel: 'Skill Functions & Triggers',
    badge: 'Phase Trigger',
    icon: '🌅',
    summary: 'Automated skills that pulse at the opening moment of the active player’s Dawn phase before manual actions.',
    detailedRules: [
      'Pulses in strict priority: (1) Active Planar Hazards, (2) Player Dawn Triggers (Regen, Burn, Poison), (3) Relic Charges.',
      'Units suffering from fatal Burn or Poison at Dawn are sent to the Boneyard before the Main Phase begins.',
      'No player may cast normal speed spells during Dawn; only triggered automated effects resolve.'
    ],
    timingWindow: 'Phase 1: Dawn (Start of Turn Upkeep)',
    formulaOrMath: 'Dawn Step: Hazard Pulse -> Status Damage (Burn/Poison) -> Health Regen -> Relic Charge Tick',
    strategicTips: [
      'Stack Regeneration units during Dusk to benefit immediately at Dawn.',
      'Apply Burn/Poison to high-priority targets when they have low HP to force their demise at Dawn without wasting attack actions.'
    ],
    counterplay: 'Cleanse debuffs or deploy Divine Wards during your turn to mitigate Dawn damage ticks.',
    tags: ['Dawn', 'Upkeep', 'Regeneration', 'Burn', 'Poison', 'Passive'],
    synergyArchetypes: ['Verdant Overgrowth', 'Abyss Necrosis']
  },
  {
    id: 'trigger-dusk-eot',
    title: 'Dusk Trigger (End of Turn / Kinetic Stashing)',
    category: 'skills',
    categoryLabel: 'Skill Functions & Triggers',
    badge: 'Phase Trigger',
    icon: '🌆',
    summary: 'Abilities that activate when the player passes priority or clicks "End Turn", finalizing round consequences.',
    detailedRules: [
      'Unspent Momentum dice rolls are calculated and banked into either Kinetic Stash (floor(M/2)) or Shield (+M*2).',
      'Temporary stat buffs and turn-limited combat shields expire at Dusk.',
      'Any "Until End of Turn" damage debuffs resolve and clear from the battlefield.'
    ],
    timingWindow: 'Phase 6: Dusk (End of Turn)',
    formulaOrMath: 'Dusk Conversion: Unspent Momentum / 2 = Stashed Kinetic Charge; OR Momentum * 2 = Overcharge Shield',
    strategicTips: [
      'If you have surplus momentum dice and no cards to play, elect for Kinetic Stashing to fuel expensive spells next round.',
      'Ensure temporary attack buffs are fully utilized during combat before Dusk strips them.'
    ],
    counterplay: 'Force opponents to burn all their momentum on defensive reactions so they cannot build up a kinetic stash.',
    tags: ['Dusk', 'End of Turn', 'Kinetic Stash', 'Decay', 'Momentum'],
    synergyArchetypes: ['Arcane Kinetics', 'Sanctuary Bulwark']
  },
  {
    id: 'trigger-deathrattle-soul',
    title: 'Soul Siphon & Deathrattle (On-Death Effect)',
    category: 'skills',
    categoryLabel: 'Skill Functions & Triggers',
    badge: 'Mortality Skill',
    icon: '💀',
    summary: 'Triggers immediately when a unit’s Vitality (HP) reaches 0 and is sent to the Boneyard (Graveyard).',
    detailedRules: [
      'Fires before the unit physically leaves the board slot, allowing death triggers to target adjacent allies or the enemy throne.',
      'If both units die simultaneously in combat, both Deathrattles enter the priority stack in active-player order.',
      'Banishing (Exile to Void) DOES NOT trigger Deathrattle because the card was not sent to the Boneyard.'
    ],
    timingWindow: 'Combat / Removal Resolution — Instant Stack',
    formulaOrMath: 'HP <= 0 -> Death Event Fired -> Trigger Queue -> Card Moved to Boneyard',
    strategicTips: [
      'Deploy low-cost Deathrattle tokens in the Vanguard Core to punish opponent sweepers.',
      'Combine with Abyss graveyard recursion cards to replay Deathrattle units repeatedly.'
    ],
    counterplay: 'Use Void Banishment or Chrono Stasis to bypass graveyard triggers completely.',
    tags: ['Deathrattle', 'Soul Siphon', 'Graveyard', 'Boneyard', 'Necromancy'],
    synergyArchetypes: ['Abyss Reanimation', 'Void Erasure']
  },
  {
    id: 'trigger-priority-stack',
    title: 'Aether Priority Stack (Fast Spells & Chain Reactivity)',
    category: 'skills',
    categoryLabel: 'Skill Functions & Triggers',
    badge: 'Aether Engine',
    icon: '🌀',
    summary: 'Deterministic Last-In, First-Out (LIFO) spell chain resolving fast reactions before base actions complete.',
    detailedRules: [
      'Fast Spells and Reactive Abilities can be cast in response to enemy spells, combat declarations, or skill activations.',
      'The stack resolves in reverse order: the most recently cast spell resolves first.',
      'Both players receive a priority pass window before any spell on the stack executes.'
    ],
    timingWindow: 'Phase 5: Reactive Priority Window (Any time the stack is non-empty)',
    formulaOrMath: 'Stack Execution: Spell_N (Top) -> Spell_N-1 -> ... -> Base Action (Bottom)',
    strategicTips: [
      'Bait out your opponent’s protective counterspell with a minor cantrip before launching your primary win-condition.',
      'Cast instant defensive wards while an enemy attack is on the stack to reverse lethal combat math.'
    ],
    counterplay: 'Maintain 2+ Essence into the opponent’s turn to keep reactive counterspells active.',
    tags: ['Priority Stack', 'Fast Spells', 'LIFO', 'Chaining', 'Counterspells'],
    synergyArchetypes: ['Arcane Chronomancy', 'Sanctuary Intervention']
  },

  // =========================================================================
  // 2. ABILITY TYPES & STATUS EFFECTS
  // =========================================================================
  {
    id: 'ability-taunt-guard',
    title: 'Taunt / Vanguard Guard',
    category: 'abilities',
    categoryLabel: 'Ability Types & Status Effects',
    badge: 'Defensive Stance',
    icon: '🛡️',
    summary: 'Directs all physical ground attacks to this guardian, protecting the Commander and adjacent allies.',
    detailedRules: [
      'Enemy ground attackers CANNOT target the Commander Throne or non-guard units while a Taunt unit occupies any Vanguard slot.',
      'Skyborn (Airborne) attackers and direct targeted Spells ignore Taunt and can strike the Commander directly.',
      'If multiple Taunt units are active, the attacker may freely choose which Taunt guard to engage.'
    ],
    timingWindow: 'Combat Declaration (Phase 4)',
    formulaOrMath: 'Target Condition: Target == Vanguard_Guard || Target == Skyborn_Airborne || Spell_Direct',
    strategicTips: [
      'Position high-defense units with Regeneration in the central Vanguard Core (Lane 2) to anchor the board.',
      'Equip armor relics onto Taunt guards to make physical trades costly for the opponent.'
    ],
    counterplay: 'Use Silence, Piercing damage, or airborne Skyborn units to circumvent Taunt defenses.',
    tags: ['Taunt', 'Guard', 'Vanguard', 'Defense', 'Intercept'],
    synergyArchetypes: ['Sanctuary Bulwark', 'Verdant Juggernauts']
  },
  {
    id: 'ability-pierce',
    title: 'Pierce / Trample Damage',
    category: 'abilities',
    categoryLabel: 'Ability Types & Status Effects',
    badge: 'Offensive Strike',
    icon: '🗡️',
    summary: 'Excess combat damage dealt beyond the defender’s remaining Vitality carries over directly to the enemy Commander.',
    detailedRules: [
      'Calculated during simultaneous combat resolution when attacking an enemy unit.',
      'If an attacker has 8 Power and the defender has 3 HP, 5 Pierce damage transfers directly to the enemy Commander Throne.',
      'Shields on the defender absorb damage first before Pierce spillover is calculated.'
    ],
    timingWindow: 'Phase 4: Combat Resolution',
    formulaOrMath: 'Spillover Damage = Attacker Power - (Defender Current HP + Defender Armor)',
    strategicTips: [
      'Buff high-power Piercing titans with Frenzy or double attack to quickly close out matches against weak token blockers.',
      'Pair with Armor Shred spells to maximize Commander spillover damage.'
    ],
    counterplay: 'Block Piercing titans with high-durability champions rather than low-health 1-HP tokens.',
    tags: ['Pierce', 'Trample', 'Spillover', 'Lethal', 'Power'],
    synergyArchetypes: ['Radiance Behemoths', 'Abyss Dreadknights']
  },
  {
    id: 'ability-radiant-ward',
    title: 'Radiant Ward & Divine Shields',
    category: 'abilities',
    categoryLabel: 'Ability Types & Status Effects',
    badge: 'Mitigation Buff',
    icon: '✨',
    summary: 'Temporary health buffer that absorbs incoming physical and magical damage before unit HP is reduced.',
    detailedRules: [
      'Absorbs all incoming damage point-for-point. Once the shield value reaches 0, remaining excess damage impacts true HP.',
      'Toxic Poison damage bypasses Shields and directly damages Vitality.',
      'Shields do not stack indefinitely; casting a new shield refreshes to the higher of the two values.'
    ],
    timingWindow: 'Passive Combat & Spell Resolution',
    formulaOrMath: 'Effective Damage = Incoming Damage - Current Ward Amount',
    strategicTips: [
      'Apply shields to high-attack glass cannons so they can survive mutual combat trades.',
      'Convert excess Dusk momentum into Shields for your Commander to prevent burst OTK finishers.'
    ],
    counterplay: 'Use Toxic Poison or Armor Piercing Spells that ignore shield layers completely.',
    tags: ['Shield', 'Ward', 'Divine', 'Absorption', 'Sanctuary'],
    synergyArchetypes: ['Sanctuary Holy Order', 'Arcane Barrier']
  },
  {
    id: 'ability-regeneration',
    title: 'Regeneration & Verdant Growth',
    category: 'abilities',
    categoryLabel: 'Ability Types & Status Effects',
    badge: 'Restoration Buff',
    icon: '🌿',
    summary: 'Restores a designated quantity of Health at the opening of each Dawn phase up to the unit’s maximum HP.',
    detailedRules: [
      'Triggers at the start of your Dawn Phase before combat actions or card draws.',
      'Cannot heal a unit beyond its base or modified Maximum HP pool.',
      'Cannot resurrect a unit that was reduced to 0 HP on a previous turn.'
    ],
    timingWindow: 'Phase 1: Dawn Upkeep',
    formulaOrMath: 'New HP = Min(Max HP, Current HP + Regen Amount)',
    strategicTips: [
      'Engage in favorable combat trades that leave your creature with 1-2 HP remaining, knowing it will heal back at Dawn.',
      'Combine with Max HP buffs to create unkillable frontline behemoths.'
    ],
    counterplay: 'Apply Void Rot or ignite with Burn to neutralize the healing output each turn.',
    tags: ['Regeneration', 'Heal', 'Verdance', 'Dawn', 'Sustain'],
    synergyArchetypes: ['Verdant Overgrowth', 'Sanctuary Restoration']
  },
  {
    id: 'ability-void-rot',
    title: 'Void Rot & Max HP Degradation',
    category: 'abilities',
    categoryLabel: 'Ability Types & Status Effects',
    badge: 'Debuff Curse',
    icon: '💀',
    summary: 'Permanently reduces the target’s Maximum Health pool each turn, preventing healing or recovery.',
    detailedRules: [
      'Reduces both current HP and Max HP by the rot value at the start of the target’s Dawn Phase.',
      'Units affected by Void Rot CANNOT be healed past their newly decayed Maximum HP threshold.',
      'If Max HP reaches 0, the creature collapses to dust and is exiled directly to the Void.'
    ],
    timingWindow: 'Phase 1: Dawn Upkeep',
    formulaOrMath: 'New Max HP = Max(0, Max HP - Void Rot Value); Current HP = Min(Current HP, New Max HP)',
    strategicTips: [
      'Infect enemy high-health titans early in the match to whittle them down into easy strike range.',
      'Use Void Rot to permanently counter Verdant regeneration decks.'
    ],
    counterplay: 'Cleanse debuffs using Sanctuary Purify spells before the next Dawn cycle.',
    tags: ['Void Rot', 'Decay', 'Max HP', 'Curse', 'Abyss'],
    synergyArchetypes: ['Abyss Wither', 'Void Nullification']
  },
  {
    id: 'ability-chrono-stasis',
    title: 'Chrono Stasis (Stun / Freeze)',
    category: 'abilities',
    categoryLabel: 'Ability Types & Status Effects',
    badge: 'Crowd Control',
    icon: '❄️',
    summary: 'Freezes the target in temporal stasis, incapacitating it and preventing all attack actions for 1 round.',
    detailedRules: [
      'Stunned units CANNOT declare attacks during the Combat Phase.',
      'Stunned units still retain their defensive Taunt stance and deal retaliatory damage if attacked by an enemy.',
      'Stasis status naturally thaws and expires at the conclusion of the afflicted player’s turn.'
    ],
    timingWindow: 'Main Phase Spell Cast -> Active for 1 Turn Cycle',
    formulaOrMath: 'Unit State: Can_Attack = False; Retaliate_On_Hit = True; Expires_At_Turn_End = True',
    strategicTips: [
      'Stun massive enemy boss titans to gain a free turn to swarm the Commander or assemble your combo.',
      'Chain multiple stuns with Arcane Chronomancers to completely lock down the enemy vanguard.'
    ],
    counterplay: 'Equip relics with Crowd Control Immunity or cast Purge to remove the frost shell.',
    tags: ['Stun', 'Freeze', 'Stasis', 'Incapacitate', 'Arcane'],
    synergyArchetypes: ['Arcane Control', 'Chronomancy Freeze']
  },
  {
    id: 'ability-life-drain',
    title: 'Life Drain & Vampirism',
    category: 'abilities',
    categoryLabel: 'Ability Types & Status Effects',
    badge: 'Sustain Skill',
    icon: '🩸',
    summary: 'Heals your Commander’s Vitality for 100% of the actual unmitigated damage dealt by this card.',
    detailedRules: [
      'Heal amount is based on the actual damage dealt to the target’s Vitality or Shield.',
      'Does not heal if the attack was completely negated by Divine Immunity.',
      'Can overheal up to the Commander’s maximum starting health (30 HP).'
    ],
    timingWindow: 'Phase 4: Combat / Spell Damage Resolution',
    formulaOrMath: 'Commander HP = Min(30, Commander HP + Dealt Damage)',
    strategicTips: [
      'Use high-power Life Drain champions to recover from early aggressive rush decks.',
      'Buff your vampire units with attack increases to double both damage output and life recovery.'
    ],
    counterplay: 'Burst down Life Drain creatures before they can declare attacks, or apply Silenced.',
    tags: ['Life Drain', 'Vampirism', 'Heal', 'Abyss', 'Sustain'],
    synergyArchetypes: ['Abyss Bloodlines', 'Sanctuary Inquisitors']
  },
  {
    id: 'ability-silence',
    title: 'Silenced (Nullify & Disarm)',
    category: 'abilities',
    categoryLabel: 'Ability Types & Status Effects',
    badge: 'Dispel Effect',
    icon: '🔇',
    summary: 'Permanently strips all passive traits, card text, status buffs, and activated abilities from a target.',
    detailedRules: [
      'Removes Taunt, Pierce, Regeneration, Deathrattles, and elemental domain synergies immediately.',
      'Reverts power and health buffs back to base printed stats.',
      'Does not affect currently equipped separate weapon cards in the Armory.'
    ],
    timingWindow: 'Instant Spell Cast',
    formulaOrMath: 'Unit Passives = []; Current Status Effects = []; Modifiers = Base Stats',
    strategicTips: [
      'Silence massive buffed enemy guardians to neutralize their Taunt and bypass directly to the Commander.',
      'Strip dangerous Deathrattle bombs before destroying them with combat strikes.'
    ],
    counterplay: 'Keep redundant threats in hand so a single Silence does not derail your primary game plan.',
    tags: ['Silence', 'Disarm', 'Dispel', 'Neutralize', 'Control'],
    synergyArchetypes: ['Arcane Disruption', 'Sanctuary Judgment']
  },

  // =========================================================================
  // 3. TURN-LOOP PHASES & TIMING WINDOWS
  // =========================================================================
  {
    id: 'phase-1-dawn',
    title: 'Phase 1: Dawn & Environmental Hazard Tick',
    category: 'turn-loop',
    categoryLabel: 'Turn-Loop Phases & Timing Windows',
    badge: 'Phase 1 of 6',
    icon: '🌅',
    summary: 'The dawn of the turn where active planar hazards pulse, status effects tick, and weather hazards execute.',
    detailedRules: [
      'Active Planar Hazard (e.g., Solar Flare, Abyssal Miasma) pulses its designated board-wide effect.',
      'Damage-over-Time debuffs (Burn, Poison, Void Rot) tick against afflicted units.',
      'Regeneration heals eligible guardians; elapsed turn counters on timed buffs decrement by 1.'
    ],
    timingWindow: 'Opening Step (Automated Resolution)',
    formulaOrMath: 'Resolution Queue: Hazard Event -> Burn/Poison Dmg -> Regen Healing -> Buff Counters -1',
    strategicTips: [
      'Inspect the Active Planar Hazard card in the top-left slot to plan around impending weather shifts.',
      'If your unit has 1 HP and is Burning, it will perish in this phase before you can cast healing spells.'
    ],
    tags: ['Dawn', 'Phase 1', 'Hazards', 'Status Ticks', 'Weather'],
    synergyArchetypes: ['All Decks']
  },
  {
    id: 'phase-2-momentum-refill',
    title: 'Phase 2: Momentum Dice & Essence Refill',
    category: 'turn-loop',
    categoryLabel: 'Turn-Loop Phases & Timing Windows',
    badge: 'Phase 2 of 6',
    icon: '🎲',
    summary: 'Mana is fully refilled with +1 max cap, a card is drawn, and the dynamic momentum die is rolled.',
    detailedRules: [
      'Max Essence increases by +1 (Turn 1 begins at 2, capping at 10 on Turn 9). Current Essence refills to full.',
      'The active player draws 1 card from their 50-card Main Deck into their 7-card Hand.',
      'Momentum Dice Roll: Roll dynamic d6 (early) or d12 (late game). Total Momentum = Turn Number + Die Roll (capped at 12).'
    ],
    timingWindow: 'Resource Step (Automated)',
    formulaOrMath: 'Essence = Min(10, Turn + 1); Momentum = Min(12, Turn + Roll_D6_D12); Hand += 1',
    strategicTips: [
      'A high momentum roll unlocks expensive card overcharge modes and dual actions during the Main Phase.',
      'Manage hand size: if your hand is at 7 cards, the drawn card is burned directly to the Boneyard.'
    ],
    tags: ['Phase 2', 'Essence', 'Momentum', 'Card Draw', 'Dice Roll'],
    synergyArchetypes: ['All Decks']
  },
  {
    id: 'phase-3-main-staging',
    title: 'Phase 3: Tactical Deployment & Main Staging',
    category: 'turn-loop',
    categoryLabel: 'Turn-Loop Phases & Timing Windows',
    badge: 'Phase 3 of 6',
    icon: '🏛️',
    summary: 'The primary strategic phase where players summon guardians, cast incantations, and equip weapons.',
    detailedRules: [
      'Play cards from hand by paying their designated Essence cost.',
      'Units can be positioned into any of the 3 Vanguard Lanes (Left Flank, Vanguard Core, Right Flank).',
      'Equip Relics and Weapons into the Armory slot; activate commander abilities using kinetic charges.'
    ],
    timingWindow: 'Main Turn Action Window',
    formulaOrMath: 'Available Actions: Summon Unit, Cast Normal Spell, Equip Armory, Tap Commander Relic',
    strategicTips: [
      'Prioritize deploying Taunt guardians before attacking to maintain a solid defensive perimeter.',
      'Carefully allocate Essence so you don’t leave awkward unspent energy.'
    ],
    tags: ['Phase 3', 'Main Phase', 'Summon', 'Spells', 'Deployment'],
    synergyArchetypes: ['All Decks']
  },
  {
    id: 'phase-4-combat-clash',
    title: 'Phase 4: Combat Engagement & Flank Resolution',
    category: 'turn-loop',
    categoryLabel: 'Turn-Loop Phases & Timing Windows',
    badge: 'Phase 4 of 6',
    icon: '⚔️',
    summary: 'Declare attacks with ready units against enemy guardians or directly upon the enemy Commander Throne.',
    detailedRules: [
      'Newly summoned units have Summoning Sickness and cannot attack on their initial turn unless they have Rush/Haste.',
      'Simultaneous Combat: When striking a defender, both the attacker and defender deal their Power to each other at once.',
      'Vanguard Rule: Attacking the Commander directly is prohibited if enemy Vanguard Taunt units remain on the field.'
    ],
    timingWindow: 'Combat Declaration Window',
    formulaOrMath: 'Simultaneous Trade: Defender HP -= Attacker Power; Attacker HP -= Defender Power',
    strategicTips: [
      'Use the In-Match Combat Math Preview overlay to ensure your creature will survive mutual damage before striking.',
      'Utilize Skyborn units to fly over grounded Taunt defenders and strike the Commander directly.'
    ],
    tags: ['Phase 4', 'Combat', 'Attack', 'Simultaneous Damage', 'Lanes'],
    synergyArchetypes: ['Aggro Rush', 'Midrange Tempo']
  },
  {
    id: 'phase-5-priority-stack',
    title: 'Phase 5: Reactive Priority Window & Fast Spells',
    category: 'turn-loop',
    categoryLabel: 'Turn-Loop Phases & Timing Windows',
    badge: 'Phase 5 of 6',
    icon: '🌀',
    summary: 'An open priority window allowing instant response spells, armor bracing, and stack counters.',
    detailedRules: [
      'Both players may spend remaining Momentum to [Brace] (+2 Armor) or cast Fast Spells on the Aether Chain.',
      'Any newly cast instant spell sits on top of the stack and resolves first (LIFO order).',
      'Once both players pass priority without adding new actions, the stack resolves fully down to empty.'
    ],
    timingWindow: 'Priority Chain Interruption',
    formulaOrMath: 'Priority Passes: Player Pass -> Opponent Pass -> Resolve Top Spell -> Repeat Until Stack Empty',
    strategicTips: [
      'Always reserve at least 1 fast instant spell in hand to disrupt opponent combat tricks.',
      'Spend surplus momentum on [Brace] if you anticipate high incoming retaliation damage.'
    ],
    tags: ['Phase 5', 'Fast Spells', 'Priority', 'Reactivity', 'Brace'],
    synergyArchetypes: ['Arcane Control', 'Sanctuary Wards']
  },
  {
    id: 'phase-6-dusk-conversion',
    title: 'Phase 6: Dusk Conversion & Kinetic Stash',
    category: 'turn-loop',
    categoryLabel: 'Turn-Loop Phases & Timing Windows',
    badge: 'Phase 6 of 6',
    icon: '🌆',
    summary: 'The conclusion of the turn where unspent momentum is converted and turn passing executes.',
    detailedRules: [
      'Unspent Momentum is converted into your chosen stash mode: Kinetic Energy Battery or Overcharge Barrier Shield.',
      'Temporary buffs, one-turn shields, and single-round status debuffs expire.',
      'Turn priority passes to the opposing Commander.'
    ],
    timingWindow: 'End of Turn (Closing Step)',
    formulaOrMath: 'Momentum Stash: Kinetic Charge = floor(Unspent / 2) | Barrier Shield = Unspent * 2',
    strategicTips: [
      'If your Commander is under heavy threat, choose Shield conversion to survive the opponent’s upcoming turn.',
      'If you have high-cost cards waiting for next turn, choose Kinetic Stash for extra energy.'
    ],
    tags: ['Phase 6', 'Dusk', 'End Turn', 'Stash', 'Pass Priority'],
    synergyArchetypes: ['All Decks']
  },

  // =========================================================================
  // 4. ELEMENTAL DOMAINS & FOIL AFFINITIES
  // =========================================================================
  {
    id: 'domain-radiance',
    title: 'Domain of Radiance (Fire, Solar & Light)',
    category: 'domains',
    categoryLabel: 'Elemental Domains & Foils',
    badge: 'Prismatic Domain',
    icon: '🔥',
    summary: 'Aggressive elemental affinity focused on blistering direct burn damage, pierce attacks, and frenzy burst.',
    detailedRules: [
      'Foil Advantage: Deals +2 bonus damage when clashing against Verdance (Nature/Growth) cards.',
      'Vulnerability: Takes increased damage from Void & Abyss dark necrosis spells.',
      'Signature Mechanics: Burn Damage-over-Time, Frenzy (+Attack on consecutive strikes), and Molten Pierce.'
    ],
    strategicTips: [
      'Play fast and aggressive to burn down enemy defenders before late-game control decks can stabilize.',
      'Stack Frenzy units in flank lanes to punish unguarded enemy board positions.'
    ],
    tags: ['Radiance', 'Fire', 'Light', 'Burn', 'Frenzy', 'Aggro'],
    synergyArchetypes: ['Radiance Sunforged', 'Solar Flare Burn']
  },
  {
    id: 'domain-abyss',
    title: 'Domain of the Abyss (Necromancy & Void Darkness)',
    category: 'domains',
    categoryLabel: 'Elemental Domains & Foils',
    badge: 'Prismatic Domain',
    icon: '💀',
    summary: 'Dark attrition domain mastering graveyard recursion, life-stealing vampirism, and permanent Void Rot.',
    detailedRules: [
      'Foil Advantage: Deals +2 bonus damage against Radiance light cards; corrupts holy barriers.',
      'Vulnerability: Takes increased damage from Sanctuary divine holy spells.',
      'Signature Mechanics: Boneyard Reanimation, Life Drain, Max HP Reduction (Void Rot), and Deathrattles.'
    ],
    strategicTips: [
      'During the 11-to-7 Hand-Setting draft, discard your high-cost Titans to the Boneyard to reanimate them early.',
      'Wear down high-health guardians with Void Rot so they cannot be healed.'
    ],
    tags: ['Abyss', 'Dark', 'Necro', 'Life Drain', 'Void Rot', 'Reanimation'],
    synergyArchetypes: ['Abyss Dreadknight', 'Graveyard Reanimator']
  },
  {
    id: 'domain-verdance',
    title: 'Domain of Verdance (Nature, Flora & Growth)',
    category: 'domains',
    categoryLabel: 'Elemental Domains & Foils',
    badge: 'Prismatic Domain',
    icon: '🌿',
    summary: 'Sustained endurance domain thriving on relentless regeneration, spore proliferation, and giant beasts.',
    detailedRules: [
      'Foil Advantage: Overwhelms Arcane temporal control with rapid board swelling and high health pools.',
      'Vulnerability: Susceptible to Radiance fire and burn spreading.',
      'Signature Mechanics: Dawn Regeneration, Spore Token Swarming, and Permanent Max Vitality Ramping.'
    ],
    strategicTips: [
      'Position Verdant giants in the Vanguard Core to continuously absorb attacks and heal back to full at Dawn.',
      'Overwhelm single-target removal by filling all 3 frontline lanes with Sporeling tokens.'
    ],
    tags: ['Verdance', 'Nature', 'Regen', 'Tokens', 'Growth', 'Beasts'],
    synergyArchetypes: ['Verdant Overgrowth', 'Primeval Swarm']
  },
  {
    id: 'domain-arcane',
    title: 'Domain of the Arcane (Time, Astral & Chronomancy)',
    category: 'domains',
    categoryLabel: 'Elemental Domains & Foils',
    badge: 'Prismatic Domain',
    icon: '✨',
    summary: 'Complex control and combo domain manipulating momentum dice, cooldowns, and Chrono Stasis freezes.',
    detailedRules: [
      'Foil Advantage: Disrupts Sanctuary order with unblockable warp spells and temporal resets.',
      'Vulnerability: Vulnerable to aggressive Verdance swarm decks that outpace single-target stuns.',
      'Signature Mechanics: Chrono Stasis (Stun), Priority Chain Counterspells, and Momentum Dice Re-rolls.'
    ],
    strategicTips: [
      'Hold fast reaction spells to disrupt opponent combat strikes mid-chain.',
      'Freeze high-threat boss units while building up your late-game astral combo pieces.'
    ],
    tags: ['Arcane', 'Time', 'Astral', 'Stun', 'Counterspell', 'Combo'],
    synergyArchetypes: ['Arcane Chronomancy', 'Aether Warp Control']
  },
  {
    id: 'domain-sanctuary',
    title: 'Domain of Sanctuary (Holy, Order & Divine Aegis)',
    category: 'domains',
    categoryLabel: 'Elemental Domains & Foils',
    badge: 'Prismatic Domain',
    icon: '🛡️',
    summary: 'Impenetrable fortress domain utilizing multi-layered Radiant Wards, Taunt bastions, and divine retaliation.',
    detailedRules: [
      'Foil Advantage: Purges Abyss darkness and instantly cleanses Void Rot curses.',
      'Vulnerability: Can be bypassed by Arcane temporal distortion and void banishment.',
      'Signature Mechanics: Radiant Wards, Taunt Fortification, Retaliation Thorns, and Debuff Cleansing.'
    ],
    strategicTips: [
      'Stack Armor and Radiant Wards on your Vanguard Core defender to turn opponent attacks into self-destructive trades.',
      'Use Purify spells to instantly eliminate Burn and Poison ticks before the Dawn upkeep.'
    ],
    tags: ['Sanctuary', 'Holy', 'Wards', 'Armor', 'Cleanse', 'Fortress'],
    synergyArchetypes: ['Sanctuary Paladin', 'Aegis Bastion']
  },

  // =========================================================================
  // 5. BATTLEFIELD ZONES & TOPOLOGY
  // =========================================================================
  {
    id: 'zone-vanguard-core',
    title: 'Vanguard Core & Flank Lanes (3-Lane Topology)',
    category: 'zones',
    categoryLabel: 'Battlefield Zones & Topology',
    badge: 'Board Zone',
    icon: '📍',
    summary: 'The three frontline combat slots protecting the Commander: Left Flank (Slot 1), Vanguard Core (Slot 2), and Right Flank (Slot 3).',
    detailedRules: [
      'Units placed in any Vanguard slot act as physical shields for the Commander Throne.',
      'The Vanguard Core (Center) receives +1 Armor bonus from terrain fortifications in specific planar arenas.',
      'Flank Lanes (Left/Right) allow Skyborn and fast cavalry units to execute direct flanking attacks against unprotected thrones.'
    ],
    strategicTips: [
      'Keep your most durable Taunt titan in the Vanguard Core to maintain central board stability.',
      'Exploit empty enemy flank lanes to push high-speed damage directly into the enemy Commander.'
    ],
    tags: ['Lanes', 'Vanguard', 'Flank', 'Topology', 'Positioning'],
    synergyArchetypes: ['All Decks']
  },
  {
    id: 'zone-commander-throne',
    title: 'Commander Throne & Vitality Pool',
    category: 'zones',
    categoryLabel: 'Battlefield Zones & Topology',
    badge: 'Core Zone',
    icon: '👑',
    summary: 'Houses the player’s primary Sovereign titan with 30 starting Vitality; if this reaches 0, the match is lost.',
    detailedRules: [
      'Cannot be targeted by normal physical attacks as long as an active Taunt guard occupies the Vanguard.',
      'Direct Spells and Skyborn airborne units may strike the Commander Throne regardless of ground guards.',
      'Equipping armory weapons provides the Commander with active attack power and retaliatory damage when struck.'
    ],
    strategicTips: [
      'Never allow all 3 Vanguard slots to remain empty simultaneously, as it leaves your Commander defenseless.',
      'Keep a reserve barrier shield on the Commander during the late game to guard against sudden OTK spell bursts.'
    ],
    tags: ['Commander', 'Throne', 'Vitality', 'Win Condition', 'HP'],
    synergyArchetypes: ['All Decks']
  },
  {
    id: 'zone-armory-relics',
    title: 'Armory Slot (Weapons, Artifacts & Relics)',
    category: 'zones',
    categoryLabel: 'Battlefield Zones & Topology',
    badge: 'Equip Zone',
    icon: '⚔️',
    summary: 'Dedicated equipment zone where weapons, armor plates, and ancient planar relics are socketed.',
    detailedRules: [
      'Only 1 Weapon and 1 Relic may be equipped in the Armory simultaneously (playing a new one replaces the old).',
      'Weapons add their Power directly to the Commander’s offensive strikes and reactive counter-attacks.',
      'Relics provide passive aura bonuses (e.g. +1 Essence generation, +2 Max Momentum dice cap).'
    ],
    strategicTips: [
      'Equip a weapon with Life Drain to ensure every Commander retaliation attack heals your Vitality.',
      'Deploy early-game resource relics to accelerate your mana curve toward high-tier Ascended Titans.'
    ],
    tags: ['Armory', 'Weapons', 'Relics', 'Equipment', 'Artifacts'],
    synergyArchetypes: ['Sunforged Armory', 'Relic Master']
  },
  {
    id: 'zone-boneyard-void',
    title: 'Boneyard (Graveyard) vs. The Void (Exile)',
    category: 'zones',
    categoryLabel: 'Battlefield Zones & Topology',
    badge: 'Graveyard Mechanics',
    icon: '🪦',
    summary: 'Two distinct destination zones for spent, destroyed, or banished cards in Realm of Nexus.',
    detailedRules: [
      'Boneyard (Graveyard): Holds slain guardians and cast spells. Cards here CAN be targeted by reanimation and resurrection effects.',
      'The Void (Exile): Permanent oblivion zone for banished cards. Cards in the Void CANNOT be resurrected or interacted with.',
      'You can inspect both your own and the opponent’s Boneyard at any time via the battlefield grave portal button.'
    ],
    strategicTips: [
      'If playing Abyss reanimator decks, discard your heaviest monsters to the Boneyard during the 11-to-7 opening hand draft.',
      'Use Void Banishment spells against enemy deathrattle creatures to deny them graveyard recursion.'
    ],
    tags: ['Boneyard', 'Graveyard', 'Void', 'Exile', 'Banish', 'Reanimation'],
    synergyArchetypes: ['Abyss Reanimation', 'Void Erasure']
  }
];

interface MechanicsEncyclopediaProps {
  isOpenAsDrawer?: boolean;
  onCloseDrawer?: () => void;
  isEmbedded?: boolean;
  onSelectTopic?: (topicId: string) => void;
}

export const MechanicsEncyclopedia: React.FC<MechanicsEncyclopediaProps> = ({
  isOpenAsDrawer = false,
  onCloseDrawer,
  isEmbedded = true,
  onSelectTopic
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EncyclopediaCategory>('all');
  const [expandedEntryIds, setExpandedEntryIds] = useState<Record<string, boolean>>({
    'trigger-on-play': true,
    'ability-taunt-guard': true,
    'phase-1-dawn': true
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Category Filter Configuration
  const CATEGORIES: { id: EncyclopediaCategory; label: string; icon: string; count: number }[] = [
    { id: 'all', label: 'All Mechanics', icon: '📚', count: ENCYCLOPEDIA_ENTRIES.length },
    {
      id: 'skills',
      label: 'Skills & Triggers',
      icon: '⚡',
      count: ENCYCLOPEDIA_ENTRIES.filter(e => e.category === 'skills').length
    },
    {
      id: 'abilities',
      label: 'Ability Types & Keywords',
      icon: '🛡️',
      count: ENCYCLOPEDIA_ENTRIES.filter(e => e.category === 'abilities').length
    },
    {
      id: 'turn-loop',
      label: '6-Phase Turn Loop',
      icon: '🔄',
      count: ENCYCLOPEDIA_ENTRIES.filter(e => e.category === 'turn-loop').length
    },
    {
      id: 'domains',
      label: 'Domains & Foils',
      icon: '🔥',
      count: ENCYCLOPEDIA_ENTRIES.filter(e => e.category === 'domains').length
    },
    {
      id: 'zones',
      label: 'Board Zones & Topology',
      icon: '📍',
      count: ENCYCLOPEDIA_ENTRIES.filter(e => e.category === 'zones').length
    }
  ];

  // Search & Filter Logic
  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ENCYCLOPEDIA_ENTRIES.filter(entry => {
      // Category filter
      if (selectedCategory !== 'all' && entry.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (!q) return true;

      const titleMatch = entry.title.toLowerCase().includes(q);
      const summaryMatch = entry.summary.toLowerCase().includes(q);
      const badgeMatch = entry.badge.toLowerCase().includes(q);
      const tagsMatch = entry.tags.some(t => t.toLowerCase().includes(q));
      const rulesMatch = entry.detailedRules.some(r => r.toLowerCase().includes(q));
      const tipsMatch = entry.strategicTips.some(t => t.toLowerCase().includes(q));
      const formulaMatch = entry.formulaOrMath?.toLowerCase().includes(q) || false;

      return titleMatch || summaryMatch || badgeMatch || tagsMatch || rulesMatch || tipsMatch || formulaMatch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedEntryIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    filteredEntries.forEach(e => {
      allExpanded[e.id] = true;
    });
    setExpandedEntryIds(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedEntryIds({});
  };

  const handleCopyRule = (entry: EncyclopediaEntry) => {
    const textToCopy = `[Nexus Rules: ${entry.title}]\n${entry.summary}\n\nKey Regulations:\n${entry.detailedRules.map(r => `• ${r}`).join('\n')}\n\nFormula: ${entry.formulaOrMath || 'N/A'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Main encyclopedia content body
  const contentBody = (
    <div className="flex flex-col h-full space-y-4">
      
      {/* Top Banner & Search Control Bar */}
      <div className="space-y-3 bg-stone-950/80 p-4 rounded-2xl border border-amber-500/30 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-md">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 className="font-cinzel font-black text-sm sm:text-base text-amber-100 flex items-center gap-2">
                <span>NEXUS MECHANICS ENCYCLOPEDIA</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Codex v2.5
                </span>
              </h3>
              <p className="text-[11px] text-stone-400 font-mono">
                Official comprehensive reference of triggers, abilities, math formulas & turn timings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExpandAll}
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-[11px] font-mono font-medium transition flex items-center gap-1"
            >
              <ChevronDown size={12} />
              <span>Expand All</span>
            </button>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-[11px] font-mono font-medium transition flex items-center gap-1"
            >
              <ChevronUp size={12} />
              <span>Collapse All</span>
            </button>
            {onCloseDrawer && isOpenAsDrawer && (
              <button
                type="button"
                onClick={onCloseDrawer}
                className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search mechanics, ability keywords, math formulas, timing windows (e.g. Taunt, Pierce, Priority Stack, Dawn, Life Drain)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-900 border border-stone-700/80 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-sans transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-0.5 rounded"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition whitespace-nowrap shrink-0 shadow-sm ${
                  isSelected
                    ? 'bg-amber-500 text-black border border-amber-400 shadow-amber-500/20'
                    : 'bg-stone-900/90 text-stone-300 hover:text-amber-200 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/30 text-black font-black' : 'bg-stone-800 text-stone-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Active Category Status */}
      <div className="flex items-center justify-between px-1 text-xs text-stone-400 font-mono">
        <span>
          Showing <strong className="text-amber-300">{filteredEntries.length}</strong> of {ENCYCLOPEDIA_ENTRIES.length} entries
          {searchQuery && <span> matching "<strong className="text-stone-200">{searchQuery}</strong>"</span>}
        </span>
        <span className="text-[11px] text-stone-400">
          Click any card to expand full regulations & arithmetic
        </span>
      </div>

      {/* Expandable Entries List */}
      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
        {filteredEntries.length === 0 ? (
          <div className="p-8 rounded-2xl bg-stone-950/60 border border-stone-800 text-center space-y-3">
            <div className="text-3xl">🔍</div>
            <h4 className="font-cinzel font-bold text-sm text-stone-300">
              No matching mechanics found
            </h4>
            <p className="text-xs text-stone-400 max-w-md mx-auto">
              We couldn't find any rules or ability keywords matching "<span className="text-amber-400">{searchQuery}</span>". Try clearing your search or selecting "All Mechanics".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs shadow transition"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          filteredEntries.map(entry => {
            const isExpanded = !!expandedEntryIds[entry.id];
            
            return (
              <div
                key={entry.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-stone-950/90 shadow-lg ${
                  isExpanded
                    ? 'border-amber-500/60 ring-1 ring-amber-500/30'
                    : 'border-stone-800/90 hover:border-stone-700'
                }`}
              >
                {/* Header (Always Visible - Click to Toggle) */}
                <div
                  onClick={() => toggleExpand(entry.id)}
                  className={`p-3.5 sm:p-4 cursor-pointer flex items-start justify-between gap-3 transition ${
                    isExpanded ? 'bg-stone-900/90' : 'hover:bg-stone-900/50'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-stone-800/90 border border-stone-700/80 flex items-center justify-center text-lg shrink-0 mt-0.5 shadow-inner">
                      {entry.icon}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 uppercase font-bold">
                          {entry.badge}
                        </span>
                        <span className="text-[9.5px] font-mono text-stone-400">
                          {entry.categoryLabel}
                        </span>
                        {entry.timingWindow && (
                          <span className="text-[9px] font-mono text-cyan-300/80 flex items-center gap-1">
                            <Clock size={10} />
                            <span>{entry.timingWindow}</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-cinzel font-black text-sm sm:text-base text-amber-100 flex items-center gap-2">
                        <span>{entry.title}</span>
                      </h4>

                      <p className="text-xs text-stone-300 leading-relaxed font-sans">
                        {entry.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyRule(entry);
                      }}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-amber-300 transition"
                      title="Copy rule text"
                    >
                      {copiedId === entry.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <div className="p-1.5 rounded-lg text-stone-400">
                      {isExpanded ? <ChevronUp size={16} className="text-amber-400" /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* Expandable Deep Details Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-stone-800/90 bg-stone-950 p-4 sm:p-5 space-y-4 text-xs"
                    >
                      {/* 1. Core Regulations & Step-by-Step Rules */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-cinzel uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span>Detailed Gameplay Regulations</span>
                        </span>
                        <div className="space-y-1.5 pl-1">
                          {entry.detailedRules.map((rule, rIdx) => (
                            <div
                              key={rIdx}
                              className="flex items-start gap-2 text-stone-200 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80 leading-relaxed"
                            >
                              <span className="text-amber-400 font-mono font-bold text-[10px] mt-0.5">
                                {rIdx + 1}.
                              </span>
                              <span>{rule}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. Formula / Arithmetic Math Box */}
                      {entry.formulaOrMath && (
                        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-1">
                          <div className="flex items-center gap-1.5 text-purple-300 font-cinzel font-bold text-[11px]">
                            <Sliders size={13} />
                            <span>System Resolution & Math Logic</span>
                          </div>
                          <code className="block p-2 rounded-lg bg-black/80 text-[11px] font-mono text-purple-200 border border-purple-900/50 break-all">
                            {entry.formulaOrMath}
                          </code>
                        </div>
                      )}

                      {/* 3. Strategic Tips & Counterplay */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Pro Strategy Tips */}
                        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-amber-300 font-cinzel font-bold text-[11px]">
                            <Sparkles size={13} className="text-amber-400" />
                            <span>Tactical Advantage</span>
                          </div>
                          <ul className="space-y-1 text-stone-300 text-[11px] leading-relaxed list-disc list-inside">
                            {entry.strategicTips.map((tip, tIdx) => (
                              <li key={tIdx}>{tip}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Counterplay & Defense */}
                        {entry.counterplay && (
                          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                            <div className="flex items-center gap-1.5 text-rose-300 font-cinzel font-bold text-[11px]">
                              <Shield size={13} className="text-rose-400" />
                              <span>Counterplay & Defense</span>
                            </div>
                            <p className="text-stone-300 text-[11px] leading-relaxed">
                              {entry.counterplay}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* 4. Tags & Synergies */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800 text-[11px]">
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-stone-400 font-mono text-[10px] mr-1">Related Tags:</span>
                          {entry.tags.map(tag => (
                            <span
                              key={tag}
                              onClick={() => setSearchQuery(tag)}
                              className="px-2 py-0.5 rounded-md bg-stone-900 hover:bg-amber-950 text-stone-400 hover:text-amber-300 border border-stone-800 cursor-pointer font-mono text-[9.5px] transition"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {entry.synergyArchetypes && (
                          <div className="flex items-center gap-1 text-[10px] text-amber-400/90 font-mono">
                            <span>Prime Archetypes:</span>
                            <span className="text-stone-200 font-bold">
                              {entry.synergyArchetypes.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  // If rendered as a Slide-Over Side-Drawer
  if (isOpenAsDrawer) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={onCloseDrawer}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-2xl w-full bg-stone-900 border-l-2 border-amber-500/60 shadow-2xl flex flex-col p-4 sm:p-6 z-10 animate-slide-in-right">
          {contentBody}
        </div>
      </div>
    );
  }

  // If rendered directly embedded inside modal or tab
  return contentBody;
};
