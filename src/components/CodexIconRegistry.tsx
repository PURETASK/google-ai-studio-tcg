import React, { useState } from 'react';
import { soundEngine } from '../utils/audioEngine';
import { 
  Flame, 
  Zap, 
  Sword, 
  Shield, 
  Sparkles, 
  Skull, 
  Eye, 
  Wind, 
  Hourglass, 
  BookOpen, 
  Sun, 
  Moon, 
  Crown, 
  Crosshair, 
  Compass, 
  Layers, 
  Activity, 
  Anchor, 
  Feather, 
  Heart, 
  Droplet, 
  Mountain, 
  Target, 
  Lock, 
  Key, 
  Cpu, 
  Gem, 
  TreePine, 
  Radiation, 
  Atom, 
  Award,
  Search,
  Check,
  Star,
  CheckCircle2,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Workflow,
  Sparkle
} from 'lucide-react';
import { Domain } from '../types';

export type IconCategory = 'elemental' | 'combat' | 'defense' | 'celestial' | 'abyssal' | 'tactical' | 'mythic' | 'ability';

export interface CodexIconDefinition {
  id: string;
  name: string;
  category: IconCategory;
  symbol: string;
  description: string;
  defaultColor: string;
  lucideIconName: string;
  tags: string[];
  progressionTier?: 'Novice' | 'Adept' | 'Master' | 'Paragon';
  unlockCondition?: string;
  domain?: Domain | 'Universal';
  abilityEffectType?: string;
  mechanicClause?: string;
  playGuide?: string;
  synergies?: string;
}

export const CODEX_ICON_DEFINITIONS: CodexIconDefinition[] = [
  // ================= RADIANCE DOMAIN SPECIFIC =================
  {
    id: 'radiance-pyro-scorch',
    name: 'Pyromancy & Scorch',
    category: 'elemental',
    symbol: '🔥',
    domain: 'Radiance',
    abilityEffectType: 'Thermal Scorch / Armor Strip',
    description: 'Ignites the target in concentrated radiant flame. Applies persistent burn stacks that strip 1 armor and deal 2 damage at the start of each turn.',
    mechanicClause: 'On Hit: Target gains 2 Burn Stacks. At turn start, target takes 2 damage per stack and loses 1 Armor point.',
    playGuide: 'Prioritize stacking Scorch on heavily armored Vanguard tanks. As their armor degrades, follow up with physical strikes.',
    synergies: 'Combos with Molten Caldera biome and Dawnstrike warriors for devastating lane wipes.',
    defaultColor: '#f97316',
    lucideIconName: 'Flame',
    tags: ['radiance', 'fire', 'scorch', 'burn', 'pyro', 'attack'],
    progressionTier: 'Adept',
    unlockCondition: 'Inflict 25 Burn Stacks in Combat'
  },
  {
    id: 'radiance-solar-flare',
    name: 'Solar Flare Blinding',
    category: 'celestial',
    symbol: '☀️',
    domain: 'Radiance',
    abilityEffectType: 'Blind / Dispel / Counter-Reduction',
    description: 'Discharges an intense solar nova that blinds enemy frontline defenders, reducing their counter-attack retaliation by 50%.',
    mechanicClause: 'Target suffers Blindness for 1 round. Enemy counter-attack damage is halved and any stealth or phase stasis is immediately dispelled.',
    playGuide: 'Cast before attacking high-power enemy champions to trade safely without losing your attacker in the counter-clash.',
    synergies: 'Shields low-defense glass cannon units like Solar Sunblades from dying to counter-attacks.',
    defaultColor: '#fbbf24',
    lucideIconName: 'Sun',
    tags: ['radiance', 'sun', 'flare', 'blind', 'consecration', 'dispel'],
    progressionTier: 'Novice',
    unlockCondition: 'Dispel 5 Stealthed or Phase-Shifted Units'
  },
  {
    id: 'radiance-dawnstrike',
    name: 'Dawnstrike Initiative',
    category: 'combat',
    symbol: '⚔️',
    domain: 'Radiance',
    abilityEffectType: 'First Strike Burst Damage',
    description: 'Righteous warriors of the dawn strike with unmatched velocity, dealing +3 bonus attack damage when initiating combat before the enemy acts.',
    mechanicClause: 'Passive: If this unit attacks first in a combat turn, deal +3 bonus radiant damage before the target can counter.',
    playGuide: 'Attack first immediately after drawing cards. Never waste a Dawnstrike trigger after opponent counter-attacks.',
    synergies: 'Synergizes with high-speed mobility relics and the Molten Greatsword.',
    defaultColor: '#ef4444',
    lucideIconName: 'Sword',
    tags: ['radiance', 'dawnstrike', 'burst', 'initiative', 'blade'],
    progressionTier: 'Master',
    unlockCondition: 'Execute 15 Lethal Dawnstrikes'
  },
  {
    id: 'radiance-molten-fissure',
    name: 'Tectonic Molten Fissure',
    category: 'elemental',
    symbol: '🌋',
    domain: 'Radiance',
    abilityEffectType: 'Lane Cleave & Splash Damage',
    description: 'Shatters the stone flagstones beneath the target lane, dealing primary impact damage and splitting molten slag into adjacent flanks.',
    mechanicClause: 'Deals full damage to the target unit and 50% splash damage to any enemies in adjacent left and right vanguard slots.',
    playGuide: 'Target the center vanguard enemy slot to maximize collateral damage across both flanking defender lanes.',
    synergies: 'Clears minion swarms and softens up multiple enemies for subsequent lane attacks.',
    defaultColor: '#ea580c',
    lucideIconName: 'Mountain',
    tags: ['radiance', 'magma', 'fissure', 'cleave', 'splash', 'volcano'],
    progressionTier: 'Master',
    unlockCondition: 'Hit 3 Enemies with a Single Fissure'
  },
  {
    id: 'radiance-aureole',
    name: 'Aureole of Ascendancy',
    category: 'mythic',
    symbol: '👑',
    domain: 'Radiance',
    abilityEffectType: 'Spell Amplification Aura',
    description: 'A crown of blinding solar light encircles the sovereign, empowering all friendly pyromancy and solar incantations with +2 Holy damage.',
    mechanicClause: 'Aura: All friendly spells deal +2 damage and restore 1 Sovereign Health upon destroying an enemy unit.',
    playGuide: 'Play in the mid-to-late game once your hand is full of tactical spell cards to melt opponent life totals.',
    synergies: 'Amplifies Volcanic Eruption and Solar Flare spells into board-wiping finishers.',
    defaultColor: '#f59e0b',
    lucideIconName: 'Crown',
    tags: ['radiance', 'crown', 'ascendancy', 'aura', 'spell-boost'],
    progressionTier: 'Paragon',
    unlockCondition: 'Conquer a match with 25+ Sovereign Health'
  },

  // ================= VERDANCE DOMAIN SPECIFIC =================
  {
    id: 'verdance-spore-bloom',
    name: 'Spore Bloom & Pollination',
    category: 'elemental',
    symbol: '🍄',
    domain: 'Verdance',
    abilityEffectType: 'Dual Bio-Damage & Friendly Pollination',
    description: 'Emits a swirling cloud of bioluminescent spores that coats enemies in corrosive mold while healing all friendly frontline beasts by +2 HP.',
    mechanicClause: 'Deals 3 Nature damage to all enemy units. Friendly Beasts gain +2 Health and +1 Defense regeneration.',
    playGuide: 'Best utilized when your vanguard is populated with 2 or 3 beasts to gain maximum symmetrical value.',
    synergies: 'Pairs with Sylvan Behemoth and Verdant Canopy to establish unbreakable board presence.',
    defaultColor: '#10b981',
    lucideIconName: 'TreePine',
    tags: ['verdance', 'spore', 'bloom', 'nature', 'heal', 'poison'],
    progressionTier: 'Adept',
    unlockCondition: 'Heal 50 Total Frontline HP with Spores'
  },
  {
    id: 'verdance-ironbark',
    name: 'Living Ironbark Fortification',
    category: 'defense',
    symbol: '🌲',
    domain: 'Verdance',
    abilityEffectType: 'Flat Damage Reduction & Turn Regen',
    description: 'Encases the guardian in ancient petrified wood, reducing all incoming non-fire damage by 3 and regenerating 2 Health every turn.',
    mechanicClause: 'Passive: Negates 3 points of non-fire damage from all attacks. Regenerates 2 HP at the beginning of each turn.',
    playGuide: 'Anchor your center lane with this defender. Avoid matching it against fire/pyro champions who pierce ironbark.',
    synergies: 'Combines with healing relics to create an unkillable sentinel.',
    defaultColor: '#059669',
    lucideIconName: 'Shield',
    tags: ['verdance', 'ironbark', 'regen', 'durability', 'tank'],
    progressionTier: 'Adept',
    unlockCondition: 'Absorb 60 Damage with Ironbark'
  },
  {
    id: 'verdance-neurotoxin',
    name: 'Viper Neurotoxin Injection',
    category: 'combat',
    symbol: '💧',
    domain: 'Verdance',
    abilityEffectType: 'Shield-Bypassing True Vitality Damage',
    description: 'Coats weapons and fangs in concentrated venom that seeps directly through magical barriers and armor plates, damaging true vitality.',
    mechanicClause: 'Combat strikes completely bypass opponent Shields and Armor, subtracting damage directly from the target\'s base Health.',
    playGuide: 'The premier weapon against Sanctuary players who hide behind massive 15+ point Divine Aegis barriers.',
    synergies: 'Bypasses high-shield bosses and speeds up aggressive rush-down victories.',
    defaultColor: '#34d399',
    lucideIconName: 'Droplet',
    tags: ['verdance', 'venom', 'poison', 'neurotoxin', 'bypass'],
    progressionTier: 'Master',
    unlockCondition: 'Defeat an Opponent with >5 Active Shield'
  },
  {
    id: 'verdance-entangle',
    name: 'Tectonic Root Entanglement',
    category: 'tactical',
    symbol: '🌿',
    domain: 'Verdance',
    abilityEffectType: 'Lane Immobilization & Attack Lockdown',
    description: 'Commands ancient roots to erupt from the subsoil, wrapping enemy arms and weapons in thick wooden tendrils to halt attacks.',
    mechanicClause: 'Target unit is Entangled for 1 full turn: it cannot attack, counter-attack, or shift to adjacent vanguard slots.',
    playGuide: 'Target the strongest enemy champion on the board to buy time for your reserve momentum engine to build up.',
    synergies: 'Neutralizes high-cost enemy titan threats without needing to spend removal spells.',
    defaultColor: '#047857',
    lucideIconName: 'Compass',
    tags: ['verdance', 'root', 'entangle', 'cc', 'lockdown'],
    progressionTier: 'Adept',
    unlockCondition: 'Entangle 10 Enemy Champions'
  },
  {
    id: 'verdance-wild-growth',
    name: 'Wild Leyline Growth',
    category: 'tactical',
    symbol: '💚',
    domain: 'Verdance',
    abilityEffectType: 'Essence Acceleration & Cost Reduction',
    description: 'Channels primal earth energy into the commander\'s reserves, permanently reducing the cost of all high-tier Beast units by 1 Essence.',
    mechanicClause: 'Passive: All Beast cards in your hand cost 1 less Essence (minimum 1). Max Essence cap increases by 1.',
    playGuide: 'Cast during early rounds (Turn 1 or 2) to deploy colossal 6-cost beasts 2 full turns ahead of schedule.',
    synergies: 'Forms the backbone of ramp-style Beast Master deck builds.',
    defaultColor: '#22c55e',
    lucideIconName: 'Heart',
    tags: ['verdance', 'ramp', 'growth', 'essence', 'beast'],
    progressionTier: 'Novice',
    unlockCondition: 'Summon 10 Beasts costing 5+ Essence'
  },

  // ================= SANCTUARY DOMAIN SPECIFIC =================
  {
    id: 'sanctuary-aegis-shield',
    name: 'Divine Aegis Bastion',
    category: 'defense',
    symbol: '🛡️',
    domain: 'Sanctuary',
    abilityEffectType: 'Heavy Barrier & 25% Reflective Retribution',
    description: 'Manifests a shimmering celestial barrier that absorbs incoming damage and discharges 25% of all absorbed shock back into the attacker.',
    mechanicClause: 'Grants +8 Aether Shield. While shield persists, 25% of all incoming damage is reflected back to the source as pure holy retribution.',
    playGuide: 'Cast proactively before enemy momentum rolls. Punishes aggressive opponents for attacking into your board.',
    synergies: 'Synergizes with Divine Bulwark and holy consecration artifacts.',
    defaultColor: '#3b82f6',
    lucideIconName: 'Shield',
    tags: ['sanctuary', 'aegis', 'shield', 'reflect', 'defense'],
    progressionTier: 'Adept',
    unlockCondition: 'Reflect 30 Retribution Damage'
  },
  {
    id: 'sanctuary-retribution',
    name: 'Halo of Retribution Spikes',
    category: 'combat',
    symbol: '⚔️',
    domain: 'Sanctuary',
    abilityEffectType: 'Thorn Damage & Counter-Strikes',
    description: 'Surrounds the champion in revolving holy blades. Whenever an enemy initiates an attack, the holy blades strike them for 3 damage first.',
    mechanicClause: 'Passive: Whenever an enemy attacks this unit, the attacker takes 3 Holy damage before calculating standard combat damage.',
    playGuide: 'Forces enemies to sacrifice their low-health attackers, effectively denying them favorable combat trades.',
    synergies: 'Crushes multi-attack token decks and swarm minion strategies.',
    defaultColor: '#60a5fa',
    lucideIconName: 'Crosshair',
    tags: ['sanctuary', 'retribution', 'thorn', 'counter', 'holy'],
    progressionTier: 'Master',
    unlockCondition: 'Slay 5 Enemies via Retribution Thorns'
  },
  {
    id: 'sanctuary-bulwark',
    name: 'Justiciar Taunt Bulwark',
    category: 'defense',
    symbol: '🏛️',
    domain: 'Sanctuary',
    abilityEffectType: 'Absolute Guardian Taunt',
    description: 'The Justiciar plants a towering tower shield, issuing a holy challenge that compels all enemy vanguard attackers to focus solely on this slot.',
    mechanicClause: 'Taunt: Opponents cannot target other friendly units or the Sovereign Commander while this guardian stands.',
    playGuide: 'Deploy in the vanguard to shield vulnerable support relics or low-health champions behind an impenetrable wall.',
    synergies: 'Protects glass cannons and high-value spellcasters from direct attacks.',
    defaultColor: '#2563eb',
    lucideIconName: 'Anchor',
    tags: ['sanctuary', 'taunt', 'bulwark', 'tank', 'protect'],
    progressionTier: 'Novice',
    unlockCondition: 'Taunt 20 Attacks Away from Allies'
  },
  {
    id: 'sanctuary-benediction',
    name: 'Seraphic Benediction',
    category: 'celestial',
    symbol: '✨',
    domain: 'Sanctuary',
    abilityEffectType: 'Sovereign Life Recovery & Debuff Cleanse',
    description: 'Calls upon the seraphim to shower the field in cleansing light, purging all burn, necrotic rot, and freeze debuffs while restoring 6 Life.',
    mechanicClause: 'Restores 6 Sovereign Life and purges all active negative status conditions from all friendly units and champions.',
    playGuide: 'Save for moments when you are afflicted by multiple stacks of Abyss Decay or Radiance Scorch to completely reverse momentum.',
    synergies: 'Essential stabilization tool against aggressive damage-over-time strategies.',
    defaultColor: '#93c5fd',
    lucideIconName: 'Sparkles',
    tags: ['sanctuary', 'heal', 'cleanse', 'benediction', 'life'],
    progressionTier: 'Adept',
    unlockCondition: 'Cleanse 10 Debuffs in Arena Duels'
  },
  {
    id: 'sanctuary-hallowed-barrier',
    name: 'Consecrated Bastion Ward',
    category: 'defense',
    symbol: '🌟',
    domain: 'Sanctuary',
    abilityEffectType: 'Adjacent Spell Immunity Aura',
    description: 'Consecrates adjacent battlefield flagstones, granting adjacent friendly guardians immunity to single-target enemy spells.',
    mechanicClause: 'Aura: Allies situated in adjacent vanguard slots cannot be targeted by enemy single-target spells or targeted abilities.',
    playGuide: 'Position this unit in the center lane with your two most valuable damage dealers on the left and right flanks.',
    synergies: 'Prevents single-target removal spells like Fate Collapse and Soul Siphon from destroying your win conditions.',
    defaultColor: '#f59e0b',
    lucideIconName: 'Award',
    tags: ['sanctuary', 'ward', 'spell-immune', 'bastion', 'aura'],
    progressionTier: 'Master',
    unlockCondition: 'Block 8 Enemy Single-Target Spells'
  },

  // ================= ARCANE DOMAIN SPECIFIC =================
  {
    id: 'arcane-lightning-arc',
    name: 'Arc Lightning Fork Discharge',
    category: 'elemental',
    symbol: '⚡',
    domain: 'Arcane',
    abilityEffectType: 'Multi-Target Chain Electrical Shock',
    description: 'Discharges high-voltage aetheric lightning into the primary target, jumping across air currents to strike up to 2 adjacent lane defenders.',
    mechanicClause: 'Deals 6 Arcane damage to primary target, then forks to deal 3 damage to each adjacent enemy in neighboring vanguard lanes.',
    playGuide: 'Devastating against full enemy frontlines. Hit the center unit to chain damage across all three opposing guardians simultaneously.',
    synergies: 'Combines with Aether Surge to wipe out entire enemy vanguard lines in a single turn.',
    defaultColor: '#eab308',
    lucideIconName: 'Zap',
    tags: ['arcane', 'lightning', 'chain', 'shock', 'fork'],
    progressionTier: 'Adept',
    unlockCondition: 'Chain Shock 15 Units across Matches'
  },
  {
    id: 'arcane-chrono-stasis',
    name: 'Temporal Chrono Phase Shift',
    category: 'tactical',
    symbol: '⏳',
    domain: 'Arcane',
    abilityEffectType: 'Complete Invulnerability & Evasion',
    description: 'Slips out of linear time into the chrono-aether for 1 turn. The unit cannot take damage, be targeted, or be affected by hazard catastrophes.',
    mechanicClause: 'Stasis: This unit is removed from combat interaction until the start of your next turn. It ignores all damage and status effects.',
    playGuide: 'Use reactively when an enemy titan enrages or when a hazardous board-wipe catastrophe is forecasted.',
    synergies: 'Guarantees the survival of your key win condition against lethal enemy burst turns.',
    defaultColor: '#06b6d4',
    lucideIconName: 'Hourglass',
    tags: ['arcane', 'time', 'stasis', 'phase', 'invulnerable'],
    progressionTier: 'Master',
    unlockCondition: 'Survive 3 Fatal Blows using Chrono Stasis'
  },
  {
    id: 'arcane-aether-surge',
    name: 'Aether Echo Surge',
    category: 'mythic',
    symbol: '🔮',
    domain: 'Arcane',
    abilityEffectType: 'Spell Duplication & Echo Casting',
    description: 'Overcharges the caster\'s magical conduit with resonating aether. The next spell cast this turn triggers twice without consuming extra essence.',
    mechanicClause: 'Action: The next spell played this turn is duplicated, resolving its effect twice immediately.',
    playGuide: 'Pair with high-impact single-target damage spells or heavy shield buffs to double your value in a single turn.',
    synergies: 'Pairs with Arc Lightning and Soulstorm for game-winning double casts.',
    defaultColor: '#8b5cf6',
    lucideIconName: 'Atom',
    tags: ['arcane', 'surge', 'echo', 'duplicate', 'spellcraft'],
    progressionTier: 'Paragon',
    unlockCondition: 'Cast 2 Spells in a single turn using Echo'
  },
  {
    id: 'arcane-overload',
    name: 'Mana Core Overload',
    category: 'combat',
    symbol: '💥',
    domain: 'Arcane',
    abilityEffectType: 'Extreme Burst Damage & Momentum Lock',
    description: 'Forces the mana crystal beyond its safety threshold to unleash catastrophic damage, locking 2 Momentum dice pips next turn.',
    mechanicClause: 'Deals 8 Arcane damage immediately. You cannot roll or spend Momentum during your next turn.',
    playGuide: 'Best used as a lethal finisher against an enemy Commander when the future penalty will not matter.',
    synergies: 'Combines with Kinetic Stash to store emergency momentum before the overload penalty locks in.',
    defaultColor: '#38bdf8',
    lucideIconName: 'Cpu',
    tags: ['arcane', 'overload', 'burst', 'momentum', 'catalyst'],
    progressionTier: 'Master',
    unlockCondition: 'Deal 8+ Damage with an Overload Strike'
  },
  {
    id: 'arcane-scry-gaze',
    name: 'Omniscient Scry Gaze',
    category: 'tactical',
    symbol: '👁️',
    domain: 'Arcane',
    abilityEffectType: 'Opponent Hand Intel & Hazard Deck Peeking',
    description: 'Opens a third eye into the probability matrix, revealing the opponent\'s cards in reserve and inspecting upcoming environmental hazards.',
    mechanicClause: 'Tactical: Reveals all cards currently in the opponent\'s hand and reveals the next 2 cards of the Planar Hazard Deck.',
    playGuide: 'Gives you complete informational dominance. Know whether to save defensive shields or commit to an aggressive lane push.',
    synergies: 'Enables high-level competitive counter-play against surprise burst spells.',
    defaultColor: '#a78bfa',
    lucideIconName: 'Eye',
    tags: ['arcane', 'scry', 'intel', 'vision', 'hazard'],
    progressionTier: 'Novice',
    unlockCondition: 'Scout 5 Opponent Hands'
  },

  // ================= ABYSS DOMAIN SPECIFIC =================
  {
    id: 'abyss-life-siphon',
    name: 'Soul Siphon Extraction',
    category: 'abyssal',
    symbol: '💀',
    domain: 'Abyss',
    abilityEffectType: 'Life Leech & Vitality Transfer',
    description: 'Tears spectral energy from the opponent\'s body, draining 5 health and channeling it directly into your own Sovereign Life pool.',
    mechanicClause: 'Deals 5 Void damage to the target. The caster restores 5 Sovereign Health. If the target dies, restore an extra 2 Health.',
    playGuide: 'Creates a massive 10-point health swing. Use to stabilize when pressured by aggressive opponents.',
    synergies: 'Combines with Necrotic Rot to drain even larger vitality pools.',
    defaultColor: '#a855f7',
    lucideIconName: 'Skull',
    tags: ['abyss', 'siphon', 'leech', 'vitality', 'heal', 'void'],
    progressionTier: 'Adept',
    unlockCondition: 'Siphon 40 Total Health in Matches'
  },
  {
    id: 'abyss-necro-decay',
    name: 'Necrotic Flesh Decay',
    category: 'abyssal',
    symbol: '🩸',
    domain: 'Abyss',
    abilityEffectType: 'Healing Nullification & Damage Amplification',
    description: 'Infects the target with incurable void rot. The target cannot be healed, and all damage received from any source is amplified by 50%.',
    mechanicClause: 'Target gains Decay status: It cannot regenerate or receive healing. All incoming attacks and spells deal +50% damage.',
    playGuide: 'Cast on high-health enemy guardians or bosses before launching your primary vanguard assault.',
    synergies: 'Shuts down Verdance regeneration decks and neutralizes Sanctuary healing spells.',
    defaultColor: '#c084fc',
    lucideIconName: 'Activity',
    tags: ['abyss', 'decay', 'necrotic', 'rot', 'debuff', 'vulnerable'],
    progressionTier: 'Master',
    unlockCondition: 'Amplify 30 Damage via Necrotic Decay'
  },
  {
    id: 'abyss-soul-reanimation',
    name: 'Boneyard Soul Reanimation',
    category: 'abyssal',
    symbol: '🪦',
    domain: 'Abyss',
    abilityEffectType: 'Deathrattle Shadow Thrall Spawn',
    description: 'When this guardian falls in battle, its dark soul refuses to depart, instantly resurrecting as a 3/1 Void Shade in the same vanguard slot.',
    mechanicClause: 'Deathrattle: Upon destruction, summon a 3/1 Void Shade with First Strike into this unit\'s battlefield slot.',
    playGuide: 'Makes clearing your vanguard extremely punishing for the opponent, forcing them to spend two separate attacks to clear one lane.',
    synergies: 'Great lane presence that maintains pressure even through enemy board wipes.',
    defaultColor: '#7e22ce',
    lucideIconName: 'Layers',
    tags: ['abyss', 'reanimate', 'graveyard', 'thrall', 'undead'],
    progressionTier: 'Adept',
    unlockCondition: 'Resurrect 8 Void Shades from the Boneyard'
  },
  {
    id: 'abyss-planar-exile',
    name: 'Planar Nether Banishment',
    category: 'abyssal',
    symbol: '🗝️',
    domain: 'Abyss',
    abilityEffectType: 'Temporary Void Banishment & Essence Drain',
    description: 'Opens a rift to the void, temporarily banishing an enemy vanguard unit into the nether for 1 turn while siphoning 1 Essence from their reserves.',
    mechanicClause: 'Banish: Exiles target enemy guardian from the battlefield for 1 full combat cycle. Siphons 1 Essence to your pool.',
    playGuide: 'Banish the opposing center taunt guardian so your remaining attackers can strike the enemy Commander directly.',
    synergies: 'Clears the way for lethal alpha strikes against vulnerable enemy Commanders.',
    defaultColor: '#9333ea',
    lucideIconName: 'Key',
    tags: ['abyss', 'exile', 'banish', 'void', 'rift', 'essence'],
    progressionTier: 'Master',
    unlockCondition: 'Banish 5 Enemy Frontline Guardians'
  },
  {
    id: 'abyss-mind-flay',
    name: 'Psionic Mind Flay',
    category: 'abyssal',
    symbol: '🧠',
    domain: 'Abyss',
    abilityEffectType: 'Forced Discard of Highest-Cost Card',
    description: 'Tendrils of pure void assault the opponent\'s psyche, ripping their highest-cost reserve card from their hand and discarding it directly into the grave.',
    mechanicClause: 'Target player must reveal their hand and discard their highest-cost card into the Graveyard. Takes 2 psychic damage.',
    playGuide: 'Play on Turn 3 or 4 to eliminate enemy 6-cost or 7-cost win condition champions before they can ever be summoned.',
    synergies: 'Destroys combo decks and slows down control strategies completely.',
    defaultColor: '#581c87',
    lucideIconName: 'Eye',
    tags: ['abyss', 'discard', 'mind', 'disrupt', 'curse'],
    progressionTier: 'Master',
    unlockCondition: 'Force 10 Enemy Discards in Duel Matches'
  },

  // ================= GENERAL ELEMENTAL & COMBAT =================
  {
    id: 'flame',
    name: 'Infernal Flame',
    category: 'elemental',
    symbol: '🔥',
    description: 'Deals direct thermal fire damage and applies persistent burn stacks.',
    defaultColor: '#f97316',
    lucideIconName: 'Flame',
    tags: ['fire', 'burn', 'heat', 'radiance', 'magma', 'attack'],
    progressionTier: 'Novice',
    unlockCondition: 'Cast 5 Fire Spells'
  },
  {
    id: 'magma-rock',
    name: 'Molten Magma',
    category: 'elemental',
    symbol: '🌋',
    description: 'Manipulates volcanic earth, molten slag, and tectonic fissures.',
    defaultColor: '#ea580c',
    lucideIconName: 'Mountain',
    tags: ['magma', 'volcano', 'lava', 'radiance', 'earth'],
    progressionTier: 'Adept',
    unlockCondition: 'Ignite 10 Volcanic Tiles'
  },
  {
    id: 'zap',
    name: 'Arcane Lightning',
    category: 'elemental',
    symbol: '⚡',
    description: 'Discharges rapid electrical shockwaves that bounce between adjacent enemy lanes.',
    defaultColor: '#eab308',
    lucideIconName: 'Zap',
    tags: ['electric', 'shock', 'arcane', 'thunder', 'burst'],
    progressionTier: 'Novice',
    unlockCondition: 'Chain Shock 3 Enemies'
  },
  {
    id: 'wind',
    name: 'Gale Torrent',
    category: 'elemental',
    symbol: '💨',
    description: 'Unleashes cutting vortex gales that displace enemies or grant evasion.',
    defaultColor: '#06b6d4',
    lucideIconName: 'Wind',
    tags: ['air', 'wind', 'speed', 'verdance', 'mobility'],
    progressionTier: 'Novice',
    unlockCondition: 'Trigger 10 Evasion dodges'
  },
  {
    id: 'water-abyss',
    name: 'Tidal Depth',
    category: 'elemental',
    symbol: '🌊',
    description: 'Summons tidal surges that crush armor and extinguish active fire hazards.',
    defaultColor: '#0284c7',
    lucideIconName: 'Droplet',
    tags: ['water', 'tide', 'abyss', 'drown', 'crush'],
    progressionTier: 'Adept',
    unlockCondition: 'Drown 5 Vanguard Defenders'
  },

  // ================= COMBAT =================
  {
    id: 'sword',
    name: 'Keen Steel Cleave',
    category: 'combat',
    symbol: '⚔️',
    description: 'Physical slashing strike against frontline defenders.',
    defaultColor: '#f87171',
    lucideIconName: 'Sword',
    tags: ['blade', 'slash', 'melee', 'attack', 'cleave'],
    progressionTier: 'Novice',
    unlockCondition: 'Deal 100 Melee Damage'
  },
  {
    id: 'spear-reach',
    name: 'Fey Spear Thrust',
    category: 'combat',
    symbol: '🗡️',
    description: 'Extended reach polearm thrust targeting backline enemies across lanes.',
    defaultColor: '#10b981',
    lucideIconName: 'Crosshair',
    tags: ['spear', 'reach', 'verdance', 'thrust', 'pierce'],
    progressionTier: 'Adept',
    unlockCondition: 'Strike 5 Backline Commanders'
  },
  {
    id: 'bow-multishot',
    name: 'Wild Greatbow',
    category: 'combat',
    symbol: '🏹',
    description: 'Multi-target ranged projectile piercing up to 3 lane units simultaneously.',
    defaultColor: '#34d399',
    lucideIconName: 'Target',
    tags: ['bow', 'ranged', 'arrow', 'verdance', 'sniper'],
    progressionTier: 'Adept',
    unlockCondition: 'Hit 3 Enemies in 1 Turn'
  },
  {
    id: 'heavy-flail',
    name: 'Demonic Maw Flail',
    category: 'combat',
    symbol: '⛓️',
    description: 'Armor-crushing impact that shreds target defense and siphons health.',
    defaultColor: '#c084fc',
    lucideIconName: 'Activity',
    tags: ['flail', 'crush', 'abyss', 'bleed', 'shred'],
    progressionTier: 'Master',
    unlockCondition: 'Shred 50 Total Armor'
  },

  // ================= DEFENSE =================
  {
    id: 'shield',
    name: 'Aegis Bastion',
    category: 'defense',
    symbol: '🛡️',
    description: 'Forms a physical or divine barrier absorbing incoming damage.',
    defaultColor: '#3b82f6',
    lucideIconName: 'Shield',
    tags: ['shield', 'armor', 'defense', 'sanctuary', 'protect'],
    progressionTier: 'Novice',
    unlockCondition: 'Absorb 50 Damage with Shields'
  },
  {
    id: 'divine-ward',
    name: 'Golden Ward',
    category: 'defense',
    symbol: '☀️',
    description: 'Provides complete immunity to necrotic curses and reduces incoming physical harm.',
    defaultColor: '#fbbf24',
    lucideIconName: 'Sun',
    tags: ['ward', 'holy', 'sanctuary', 'protect', 'immune'],
    progressionTier: 'Master',
    unlockCondition: 'Negate 3 Lethal Attacks'
  },
  {
    id: 'ironbark',
    name: 'Living Ironbark',
    category: 'defense',
    symbol: '🌲',
    description: 'Regenerates health each round and absorbs piercing projectile strikes.',
    defaultColor: '#059669',
    lucideIconName: 'TreePine',
    tags: ['nature', 'bark', 'regen', 'verdance', 'heal'],
    progressionTier: 'Adept',
    unlockCondition: 'Regenerate 40 HP in One Match'
  },

  // ================= CELESTIAL =================
  {
    id: 'sun',
    name: 'Solar Dawnflare',
    category: 'celestial',
    symbol: '🌞',
    description: 'Illuminates the arena, dispelling stealth and blinding demonic units.',
    defaultColor: '#f59e0b',
    lucideIconName: 'Sun',
    tags: ['sun', 'radiance', 'sanctuary', 'dawn', 'blind'],
    progressionTier: 'Adept',
    unlockCondition: 'Dispel 5 Stealthed Assassins'
  },
  {
    id: 'sparkles',
    name: 'Starlight Prismatic',
    category: 'celestial',
    symbol: '✨',
    description: 'Focusses astral starlight to amplify ally spell power and reduce casting cost.',
    defaultColor: '#60a5fa',
    lucideIconName: 'Sparkles',
    tags: ['starlight', 'arcane', 'astral', 'cosmic', 'buff'],
    progressionTier: 'Adept',
    unlockCondition: 'Cast 10 Prismatic Spells'
  },
  {
    id: 'crown',
    name: 'Divine Sovereignty',
    category: 'celestial',
    symbol: '👑',
    description: 'Consecrates the battleground, increasing total party power rating.',
    defaultColor: '#fbbf24',
    lucideIconName: 'Crown',
    tags: ['crown', 'divine', 'sanctuary', 'majesty', 'aura'],
    progressionTier: 'Master',
    unlockCondition: 'Win 3 Arena Battles with Full Board'
  },

  // ================= ABYSSAL =================
  {
    id: 'skull',
    name: 'Soul Necrosis',
    category: 'abyssal',
    symbol: '💀',
    description: 'Inflicts decaying necrotic curse and converts slain foes into shadow thralls.',
    defaultColor: '#a855f7',
    lucideIconName: 'Skull',
    tags: ['death', 'necrotic', 'abyss', 'curse', 'summon'],
    progressionTier: 'Adept',
    unlockCondition: 'Resurrect 5 Void Thralls'
  },
  {
    id: 'skeleton-key',
    name: 'Planar Skeleton Key',
    category: 'abyssal',
    symbol: '🗝️',
    description: 'Bypasses taunt shields, locks, and steals opponent cards from planar rifts.',
    defaultColor: '#38bdf8',
    lucideIconName: 'Key',
    tags: ['key', 'abyss', 'rift', 'bypass', 'steal'],
    progressionTier: 'Master',
    unlockCondition: 'Steal 3 Cards from Enemy Void'
  },
  {
    id: 'dark-eye',
    name: 'Abyssal Gaze',
    category: 'abyssal',
    symbol: '👁️',
    description: 'Peers into the enemy mind, forcing discard of high-cost tactical cards.',
    defaultColor: '#9333ea',
    lucideIconName: 'Eye',
    tags: ['eye', 'mind', 'abyss', 'fear', 'discard'],
    progressionTier: 'Master',
    unlockCondition: 'Force 10 Enemy Discards'
  },

  // ================= TACTICAL =================
  {
    id: 'eye',
    name: 'Truesight Eye',
    category: 'tactical',
    symbol: '🔮',
    description: 'Reveals all hidden, stealthed, and phase-shifted enemy units.',
    defaultColor: '#818cf8',
    lucideIconName: 'Eye',
    tags: ['vision', 'truesight', 'reveal', 'arcane', 'scout'],
    progressionTier: 'Novice',
    unlockCondition: 'Scout 5 Enemy Decks'
  },
  {
    id: 'hourglass',
    name: 'Temporal Phase Shift',
    category: 'tactical',
    symbol: '⏳',
    description: 'Steps out of the timeline to evade lethal attacks and reset cooldowns.',
    defaultColor: '#facc15',
    lucideIconName: 'Hourglass',
    tags: ['time', 'phase', 'arcane', 'stasis', 'evade'],
    progressionTier: 'Master',
    unlockCondition: 'Survive 3 Deathblows with Time Stasis'
  },
  {
    id: 'book',
    name: 'Ancient Grimoire',
    category: 'tactical',
    symbol: '📖',
    description: 'Draws extra tactical cards and expands maximum essence reserves.',
    defaultColor: '#60a5fa',
    lucideIconName: 'BookOpen',
    tags: ['lore', 'spells', 'draw', 'arcane', 'essence'],
    progressionTier: 'Novice',
    unlockCondition: 'Draw 50 Cards across matches'
  },
  {
    id: 'compass',
    name: 'Tactical Astrolabe',
    category: 'tactical',
    symbol: '🧭',
    description: 'Allows free instant lane swapping for all frontline allies.',
    defaultColor: '#34d399',
    lucideIconName: 'Compass',
    tags: ['position', 'flank', 'lane', 'movement', 'shift'],
    progressionTier: 'Adept',
    unlockCondition: 'Execute 15 Strategic Lane Swaps'
  },

  // ================= MYTHIC =================
  {
    id: 'cosmic-mirror',
    name: 'Pretāstra Stargate',
    category: 'mythic',
    symbol: '💎',
    description: 'Cosmic 8-pointed astral mirror channeling constellation energy.',
    defaultColor: '#93c5fd',
    lucideIconName: 'Gem',
    tags: ['stargate', 'pretastra', 'mythic', 'legendary', 'cosmic'],
    progressionTier: 'Paragon',
    unlockCondition: 'Awaken a Divine Rank 5 Artifact'
  },
  {
    id: 'ophanim-rings',
    name: 'Ophanim Celestial Wheel',
    category: 'mythic',
    symbol: '🌟',
    description: 'Biblical wheel of eyes that emits blinding rays of judgment.',
    defaultColor: '#fef08a',
    lucideIconName: 'Award',
    tags: ['ophanim', 'biblical', 'judgment', 'mythic', 'celestial'],
    progressionTier: 'Paragon',
    unlockCondition: 'Reach Rank #1 in Grandmaster Arena'
  }
];

// Helper to render correct SVG icon by ID
export interface CodexIconProps {
  iconId?: string;
  type?: string;
  size?: number;
  className?: string;
  color?: string;
  withGlow?: boolean;
}

export const CodexIcon: React.FC<CodexIconProps> = ({
  iconId,
  type,
  size = 18,
  className = '',
  color,
  withGlow = false
}) => {
  const query = (iconId || type || 'sparkles').toLowerCase();
  const iconDef = CODEX_ICON_DEFINITIONS.find(
    (item) => item.id.toLowerCase() === query || item.tags.includes(query)
  );

  const iconColor = color || (iconDef ? iconDef.defaultColor : '#fbbf24');
  const glowStyle = withGlow 
    ? { filter: `drop-shadow(0 0 6px ${iconColor}88)` } 
    : {};

  // Custom icon renderer mapping
  const renderSvg = () => {
    if (iconDef?.lucideIconName) {
      switch (iconDef.lucideIconName) {
        case 'Flame': return <Flame size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Sun': return <Sun size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Sword': return <Sword size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Mountain': return <Mountain size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Crown': return <Crown size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'TreePine': return <TreePine size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Droplet': return <Droplet size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Compass': return <Compass size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Heart': return <Heart size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Shield': return <Shield size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Crosshair': return <Crosshair size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Anchor': return <Anchor size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Sparkles': return <Sparkles size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Award': return <Award size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Zap': return <Zap size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Hourglass': return <Hourglass size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Atom': return <Atom size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Cpu': return <Cpu size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Eye': return <Eye size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Skull': return <Skull size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Activity': return <Activity size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Layers': return <Layers size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Key': return <Key size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'BookOpen': return <BookOpen size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Wind': return <Wind size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Moon': return <Moon size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Gem': return <Gem size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
        case 'Target': return <Target size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      }
    }

    switch (query) {
      case 'flame':
      case 'fire':
      case 'burn':
      case 'pyro':
        return <Flame size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'zap':
      case 'lightning':
      case 'shock':
      case 'thunder':
        return <Zap size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'sword':
      case 'slash':
      case 'blade':
      case 'attack':
      case 'melee':
        return <Sword size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'spear-reach':
      case 'crosshair':
      case 'pierce':
      case 'precision':
        return <Crosshair size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'bow-multishot':
      case 'target':
      case 'ranged':
      case 'arrow':
        return <Target size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'heavy-flail':
      case 'activity':
      case 'crush':
      case 'bleed':
        return <Activity size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'shield':
      case 'barrier':
      case 'guard':
      case 'defense':
        return <Shield size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'sparkles':
      case 'starlight':
      case 'magic':
      case 'spell':
      case 'prismatic':
        return <Sparkles size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'skull':
      case 'death':
      case 'curse':
      case 'necrotic':
      case 'abyss':
      case 'decay':
        return <Skull size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'eye':
      case 'truesight':
      case 'dark-eye':
      case 'vision':
      case 'mind':
        return <Eye size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'wind':
      case 'gale':
      case 'speed':
      case 'mobility':
        return <Wind size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'hourglass':
      case 'time':
      case 'stasis':
      case 'phase':
        return <Hourglass size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'book':
      case 'grimoire':
      case 'lore':
      case 'draw':
        return <BookOpen size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'sun':
      case 'solar':
      case 'divine-ward':
      case 'radiant':
      case 'holy':
        return <Sun size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'moon':
      case 'lunar':
      case 'shadow':
        return <Moon size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'crown':
      case 'sovereignty':
      case 'sovereign':
      case 'divine':
        return <Crown size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'magma-rock':
      case 'mountain':
      case 'earth':
      case 'stone':
        return <Mountain size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'ironbark':
      case 'treepine':
      case 'nature':
      case 'verdance':
      case 'leaf':
        return <TreePine size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'water-abyss':
      case 'droplet':
      case 'water':
      case 'tide':
        return <Droplet size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'heart':
      case 'heal':
      case 'life':
      case 'vitality':
        return <Heart size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'skeleton-key':
      case 'key':
      case 'lock':
      case 'unlock':
        return <Key size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'cosmic-mirror':
      case 'gem':
      case 'crystal':
      case 'astral':
        return <Gem size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'ophanim-rings':
      case 'award':
      case 'glory':
      case 'rank':
        return <Award size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      case 'compass':
      case 'astrolabe':
      case 'navigate':
        return <Compass size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
      default:
        return <Sparkles size={size} style={{ color: iconColor, ...glowStyle }} className={className} />;
    }
  };

  // Micro-animation class helper based on query/category
  const getMicroAnimClass = () => {
    switch (query) {
      case 'flame':
      case 'fire':
      case 'burn':
      case 'magma-rock':
        return 'hover-icon-flame';
      case 'zap':
      case 'lightning':
      case 'shock':
        return 'hover-icon-zap';
      case 'sword':
      case 'slash':
      case 'spear-reach':
      case 'dagger':
        return 'hover-icon-sword';
      case 'shield':
      case 'barrier':
      case 'armor':
        return 'hover-icon-shield';
      case 'sparkles':
      case 'star':
      case 'celestial':
      case 'cosmic-mirror':
      case 'hourglass':
        return 'hover-icon-astral';
      default:
        return 'hover:scale-125 transition-transform duration-200';
    }
  };

  return (
    <span 
      onMouseEnter={() => soundEngine.playMicroSound('hover')}
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer transition-all duration-200 ${getMicroAnimClass()}`}
    >
      {renderSvg()}
    </span>
  );
};

// Global Codex Ability Badge with progression metadata
export interface CodexAbilityBadgeProps {
  name: string;
  iconId?: string;
  domain?: Domain | 'Neutral';
  tier?: 'Novice' | 'Adept' | 'Master' | 'Paragon';
  type?: string;
  isUnlocked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const CodexAbilityBadge: React.FC<CodexAbilityBadgeProps> = ({
  name,
  iconId,
  domain = 'Neutral',
  tier = 'Adept',
  type,
  isUnlocked = true,
  size = 'md',
  onClick
}) => {
  const getDomainColor = () => {
    switch (domain) {
      case 'Sanctuary': return '#eab308';
      case 'Radiance': return '#ef4444';
      case 'Verdance': return '#10b981';
      case 'Arcane': return '#3b82f6';
      case 'Abyss': return '#a855f7';
      default: return '#fbbf24';
    }
  };

  const domainColor = getDomainColor();

  const getTierBadge = () => {
    switch (tier) {
      case 'Paragon': return { label: 'PARAGON', bg: 'bg-amber-400 text-black', border: 'border-amber-300' };
      case 'Master': return { label: 'MASTER', bg: 'bg-purple-900/90 text-purple-200', border: 'border-purple-500' };
      case 'Adept': return { label: 'ADEPT', bg: 'bg-blue-900/90 text-blue-200', border: 'border-blue-500' };
      default: return { label: 'NOVICE', bg: 'bg-stone-800 text-stone-300', border: 'border-stone-600' };
    }
  };

  const tierBadge = getTierBadge();

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 transition-all group ${
        onClick ? 'cursor-pointer hover:bg-stone-850' : ''
      }`}
    >
      <div 
        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border"
        style={{
          backgroundColor: `${domainColor}18`,
          borderColor: `${domainColor}55`
        }}
      >
        <CodexIcon iconId={iconId || name} size={13} color={domainColor} withGlow={isUnlocked} />
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-cinzel font-bold text-xs text-stone-200 group-hover:text-amber-200 transition">
            {name}
          </span>
          {type && (
            <span className="text-[9px] font-mono px-1 rounded bg-stone-800 text-stone-300">
              {type}
            </span>
          )}
        </div>
      </div>

      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ml-auto ${tierBadge.bg} ${tierBadge.border}`}>
        {tierBadge.label}
      </span>
    </div>
  );
};

// Reusable Interactive Icon Picker Component for Card Forge and Editors
interface CodexIconPickerProps {
  value: string;
  onChange: (iconId: string, iconSymbol: string) => void;
  selectedCategory?: IconCategory | 'all';
}

export const CodexIconPicker: React.FC<CodexIconPickerProps> = ({
  value,
  onChange,
  selectedCategory: initialCategory = 'all'
}) => {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<IconCategory | 'all'>(initialCategory);

  const filteredIcons = CODEX_ICON_DEFINITIONS.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-cinzel text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
          <Sparkles size={13} />
          <span>Codex Icon Registry</span>
        </span>
        <span className="text-[10px] font-mono text-stone-300">
          {filteredIcons.length} Available
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-300" />
        <input
          type="text"
          placeholder="Filter icons (e.g. fire, shield, spear, abyss)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 font-sans"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1 text-[10px] font-cinzel">
        {(['all', 'elemental', 'combat', 'defense', 'celestial', 'abyssal', 'tactical', 'mythic'] as const).map(
          (cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-0.5 rounded capitalize transition ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
        {filteredIcons.map((item) => {
          const isSelected = value.toLowerCase() === item.id.toLowerCase();
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id, item.symbol)}
              title={`${item.name} (${item.category}): ${item.description}`}
              className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                  : 'bg-stone-950 border-stone-800 hover:border-stone-600 hover:bg-stone-850'
              }`}
            >
              <div className="relative">
                <CodexIcon iconId={item.id} size={18} withGlow={isSelected} />
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center text-black">
                    <Check size={9} strokeWidth={3} />
                  </div>
                )}
              </div>
              <span className="text-[9px] font-cinzel text-stone-300 truncate w-full text-center leading-tight">
                {item.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Full Codex Icon Registry Manager & Progression View Component
export const CodexIconRegistry: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<IconCategory | 'all'>('all');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<Domain | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<CodexIconDefinition>(CODEX_ICON_DEFINITIONS[0]);
  const [activeGuideDomain, setActiveGuideDomain] = useState<Domain>('Radiance');

  const filteredIcons = CODEX_ICON_DEFINITIONS.filter(icon => {
    if (selectedCategory !== 'all' && icon.category !== selectedCategory) return false;
    if (selectedDomainFilter !== 'all' && icon.domain !== selectedDomainFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        icon.name.toLowerCase().includes(q) ||
        icon.description.toLowerCase().includes(q) ||
        (icon.abilityEffectType && icon.abilityEffectType.toLowerCase().includes(q)) ||
        (icon.domain && icon.domain.toLowerCase().includes(q)) ||
        icon.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const domainGuides: Record<Domain, {
    title: string;
    playstyle: string;
    keyMechanics: { name: string; icon: string; desc: string; tip: string }[];
    strategyTips: string[];
    color: string;
  }> = {
    Radiance: {
      title: 'Radiance Sovereign - Fire, Solar Flares & Aggressive Cleave',
      playstyle: 'High tempo aggressive offense. Melts heavy armor with Scorch, blinds defenders before counter-attacks, and dominates with first-strike Dawnstrikes.',
      color: '#f97316',
      keyMechanics: [
        { name: 'Pyromancy & Scorch', icon: '🔥', desc: 'Applies burning stacks that deal damage and strip 1 armor each turn.', tip: 'Stack on enemy tanks early to enable physical damage penetration.' },
        { name: 'Solar Flare Blinding', icon: '☀️', desc: 'Blinds vanguard defenders, halving their retaliation damage.', tip: 'Cast before attacking high-attack guardians so you trade without dying.' },
        { name: 'Dawnstrike Initiative', icon: '⚔️', desc: 'Deals +3 bonus damage when attacking first in a combat turn.', tip: 'Always activate Dawnstrike units first thing on your turn.' },
        { name: 'Molten Fissure', icon: '🌋', desc: 'Cleaves target lane and deals 50% splash damage to adjacent flanks.', tip: 'Target the center vanguard enemy to hit all three lanes.' }
      ],
      strategyTips: [
        'Push damage rapidly before control decks can build defensive momentum.',
        'Use Solar Flare to nullify enemy counter-attacks against your glass cannons.',
        'Position Molten Cleave attacks against the middle slot for maximum splash impact.'
      ]
    },
    Verdance: {
      title: 'Verdance Sovereign - Life, Ironbark, Toxicity & Ramp',
      playstyle: 'Sustained attrition and beast swarm. Outlasts opponents with high HP regeneration, roots enemy champions, and bypasses shields with neurotoxin.',
      color: '#10b981',
      keyMechanics: [
        { name: 'Spore Bloom', icon: '🍄', desc: 'Damages enemies while healing friendly frontline beasts by +2 HP.', tip: 'Best used with 2-3 beasts in play for maximum symmetrical value.' },
        { name: 'Living Ironbark', icon: '🌲', desc: 'Reduces all incoming non-fire damage by 3 and regenerates 2 HP each turn.', tip: 'Anchor your center lane with this defender against physical attackers.' },
        { name: 'Viper Neurotoxin', icon: '💧', desc: 'Bypasses enemy shields and armor, damaging true health directly.', tip: 'The ultimate hard counter against heavy Sanctuary shield players.' },
        { name: 'Root Entanglement', icon: '🌿', desc: 'Prevents target unit from attacking or moving for 1 full turn.', tip: 'Target the strongest enemy attacker to freeze their offensive turn.' }
      ],
      strategyTips: [
        'Ramp early with Wild Growth so you can drop 5-cost and 6-cost behemoths early.',
        'Keep beasts alive with Spore Bloom and regeneration rather than letting them die in trades.',
        'Use Neurotoxin against high-shield champions who think they are safe.'
      ]
    },
    Sanctuary: {
      title: 'Sanctuary Sovereign - Divine Aegis, Taunt & Retribution',
      playstyle: 'Impenetrable fortress control. Absorbs damage with celestial barriers, reflects damage back via retribution thorns, and cleanses all debuffs.',
      color: '#3b82f6',
      keyMechanics: [
        { name: 'Divine Aegis Bastion', icon: '🛡️', desc: 'Absorbs 8+ damage and reflects 25% back as Holy retribution.', tip: 'Cast right before expected enemy momentum burst turns.' },
        { name: 'Retribution Halo', icon: '⚔️', desc: 'Damages any enemy unit that attacks this defender for 3 pure damage.', tip: 'Forces enemies into disastrous trades where their units kill themselves.' },
        { name: 'Justiciar Taunt', icon: '🏛️', desc: 'Forces all enemy attacks into this heavily armored vanguard slot.', tip: 'Protects fragile backline casters and your Sovereign life pool.' },
        { name: 'Seraphic Benediction', icon: '✨', desc: 'Heals 6 Sovereign Life and cleanses all active burn and decay debuffs.', tip: 'Save for high-debuff turns to completely wipe away opponent pressure.' }
      ],
      strategyTips: [
        'Place Taunt bulwarks in the vanguard and flank them with Consecrated Bastion wards.',
        'Punish hyper-aggressive rush decks with Retribution reflect damage.',
        'Accumulate kinetic stash momentum while defending, then strike with high-tier angels.'
      ]
    },
    Arcane: {
      title: 'Arcane Sovereign - Lightning Chaining, Chrono Stasis & Aether Echoes',
      playstyle: 'Spell combo burst and temporal evasion. Chains electrical damage across all lanes, steps out of time to dodge lethals, and duplicates high-value spells.',
      color: '#06b6d4',
      keyMechanics: [
        { name: 'Arc Lightning Fork', icon: '⚡', desc: 'Strikes primary target for 6 damage, then forks to 2 adjacent foes for 3 damage.', tip: 'Target center lane to maximize electrical chain coverage.' },
        { name: 'Chrono Phase Shift', icon: '⏳', desc: 'Removes unit from combat for 1 turn, evading all damage and board wipes.', tip: 'Use reactively when boss enrages or lethal hazards activate.' },
        { name: 'Aether Echo Surge', icon: '🔮', desc: 'Next cast spell duplicates and triggers twice for zero extra cost.', tip: 'Combine with Arc Lightning or high-cost burst spells for game-ending turns.' },
        { name: 'Omniscient Scry', icon: '👁️', desc: 'Inspects opponent hand cards and top cards of the Hazard Deck.', tip: 'Use intel to hold counter-shields or execute uninterrupted lethal combos.' }
      ],
      strategyTips: [
        'Save Aether Echo Surge for turns where you can immediately duplicate a 4+ cost spell.',
        'Use Chrono Phase Shift on your primary attacker so it survives enemy counter-offensives.',
        'Monitor the Hazard Deck with Scry to avoid deploying units into incoming disaster tiles.'
      ]
    },
    Abyss: {
      title: 'Abyss Sovereign - Void Siphon, Necrotic Decay & Planar Banishment',
      playstyle: 'Disruption, life leech, and relentless reanimation. Siphons opponent health, prevents healing with necrotic rot, and banishes blockers to the nether.',
      color: '#a855f7',
      keyMechanics: [
        { name: 'Soul Siphon', icon: '💀', desc: 'Drains 5 health from target and transfers it directly to your Sovereign pool.', tip: 'Generates a 10-point life swing between you and the enemy.' },
        { name: 'Necrotic Decay', icon: '🩸', desc: 'Prevents target from healing and amplifies all incoming damage by 50%.', tip: 'Apply to boss champions or regenerative beasts to shut down their sustain.' },
        { name: 'Boneyard Reanimation', icon: '🪦', desc: 'When unit dies, instantly spawns a 3/1 Void Shade in its place.', tip: 'Creates sticky lanes that require double the opponent attacks to clear.' },
        { name: 'Planar Nether Banish', icon: '🗝️', desc: 'Exiles enemy defender for 1 turn and steals 1 Essence.', tip: 'Banish the opposing taunt guardian to open the lane for direct Commander attacks.' }
      ],
      strategyTips: [
        'Use Mind Flay early to strip opponent 6+ cost win conditions from their hand.',
        'Combine Necrotic Decay with Siphon spells to rapidly drain high-health titan bosses.',
        'Rely on Void Shade reanimations to hold the board while you drain enemy health pools.'
      ]
    },
    Tempest: {
      title: 'Tempest Sovereign - Weather Mages, Spell Chaining & Storm Lock',
      playstyle: 'Tempo mastery and storm control. Exhausts and freezes enemy units, loops rapid low-cost spell cascades, and deploys high-flying Skyborn titans.',
      color: '#0ea5e9',
      keyMechanics: [
        { name: 'Fogtouch Exhaust', icon: '🌫️', desc: 'Exhausts target enemy unit upon entry, locking them out of combat.', tip: 'Target charging enemy champions to buy turns for your spell engine.' },
        { name: 'Spellburst Chain', icon: '⚡', desc: 'Triggers powerful bonus effects when casting 2 or more spells in a single turn.', tip: 'Hold low-cost 1-mana spells to trigger multi-spell chain surges.' },
        { name: 'Cryo Freeze-Lock', icon: '❄️', desc: 'Prevents target unit from readying during their next Ready step.', tip: 'Keep the most dangerous enemy threat permanently tapped down.' },
        { name: 'Skyborn Flight', icon: '🦅', desc: 'Aviation units cannot be blocked by grounded defenders without Reach.', tip: 'Bypass heavily armored enemy lines to strike Nexus cores directly.' }
      ],
      strategyTips: [
        'Maintain a steady hand size to trigger consecutive multi-spell cascades each round.',
        'Chain Fogtouch and Freeze-Lock abilities to deny opponent tempo on key turns.',
        'Protect your spell amplifiers with Veilform so opponents cannot target them.'
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-neutral-900 to-stone-900 border border-amber-500/40 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>Domain-Specific Icons, Abilities & Effects Codex</span>
            </div>
            <h2 className="font-cinzel font-black text-2xl text-amber-100 mt-1">
              Codex Glyphs & Domain Ability Master Registry
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
              Every card domain possesses distinct combat icons, custom abilities, and status effects. Review specific domain icon sets, mechanic definitions, and tactical guides below.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-950/80 p-3 rounded-xl border border-stone-800 shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] font-cinzel uppercase text-stone-300 block">Total Icons</span>
              <span className="font-mono text-base font-bold text-amber-400">{CODEX_ICON_DEFINITIONS.length}</span>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div className="text-center px-2">
              <span className="text-[10px] font-cinzel uppercase text-stone-300 block">Domains</span>
              <span className="font-mono text-base font-bold text-emerald-400">5 Suites</span>
            </div>
          </div>
        </div>

        {/* Domain Filter Bar */}
        <div className="mt-5 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-cinzel text-amber-300 font-bold uppercase">Filter Domain:</span>
            <div className="flex flex-wrap gap-1.5 text-xs font-cinzel">
              {(['all', 'Radiance', 'Verdance', 'Sanctuary', 'Arcane', 'Abyss'] as const).map(dom => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomainFilter(dom)}
                  className={`px-3 py-1 rounded-lg capitalize font-bold transition flex items-center gap-1.5 ${
                    selectedDomainFilter === dom
                      ? 'bg-amber-500 text-black shadow ring-1 ring-amber-300'
                      : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {dom === 'Radiance' && '🔥'}
                  {dom === 'Verdance' && '🌿'}
                  {dom === 'Sanctuary' && '🛡️'}
                  {dom === 'Arcane' && '⚡'}
                  {dom === 'Abyss' && '💀'}
                  <span>{dom === 'all' ? 'All Domains' : dom}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
            <input
              type="text"
              placeholder="Search icons, abilities, effects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-cinzel">
          {(['all', 'elemental', 'combat', 'defense', 'celestial', 'abyssal', 'tactical', 'mythic'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 rounded capitalize font-medium text-[11px] transition ${
                selectedCategory === cat
                  ? 'bg-stone-200 text-black font-bold'
                  : 'bg-stone-800/60 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Icons Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredIcons.map((icon) => {
            const isSelected = selectedIcon.id === icon.id;
            return (
              <button
                key={icon.id}
                onClick={() => setSelectedIcon(icon)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-stone-900 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
                    : 'bg-stone-950/80 border-stone-800 hover:border-stone-600 hover:bg-stone-900/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner"
                    style={{
                      backgroundColor: `${icon.defaultColor}15`,
                      borderColor: `${icon.defaultColor}40`
                    }}
                  >
                    <CodexIcon iconId={icon.id} size={20} color={icon.defaultColor} withGlow={isSelected} />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {icon.domain && icon.domain !== 'Universal' && (
                      <span 
                        className="text-[8px] font-cinzel font-bold uppercase px-1.5 py-0.5 rounded border"
                        style={{
                          color: icon.defaultColor,
                          borderColor: `${icon.defaultColor}66`,
                          backgroundColor: `${icon.defaultColor}15`
                        }}
                      >
                        {icon.domain}
                      </span>
                    )}
                    <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300">
                      {icon.progressionTier || 'Adept'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-cinzel font-bold text-xs text-stone-100 truncate">
                    {icon.name}
                  </h4>
                  <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5 leading-snug">
                    {icon.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Inspector & Progression Details */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold">
              Codex Entry & Ability Profile
            </span>
            <span className="text-[10px] font-mono text-stone-300">
              #{selectedIcon.id}
            </span>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 py-2">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 shadow-2xl"
              style={{
                backgroundColor: `${selectedIcon.defaultColor}20`,
                borderColor: selectedIcon.defaultColor,
                boxShadow: `0 0 25px ${selectedIcon.defaultColor}44`
              }}
            >
              <CodexIcon iconId={selectedIcon.id} size={32} color={selectedIcon.defaultColor} withGlow={true} />
            </div>

            <div>
              <div className="flex items-center justify-center gap-2">
                {selectedIcon.domain && selectedIcon.domain !== 'Universal' && (
                  <span 
                    className="text-[10px] font-cinzel font-black uppercase px-2 py-0.5 rounded border"
                    style={{
                      color: selectedIcon.defaultColor,
                      borderColor: `${selectedIcon.defaultColor}88`,
                      backgroundColor: `${selectedIcon.defaultColor}20`
                    }}
                  >
                    {selectedIcon.domain} Domain
                  </span>
                )}
                <span className="text-xs font-mono uppercase text-stone-400">
                  {selectedIcon.category}
                </span>
              </div>
              <h3 className="font-cinzel font-bold text-lg text-amber-100 mt-1">
                {selectedIcon.name}
              </h3>
            </div>

            <p className="text-xs text-stone-200 leading-relaxed bg-stone-950/80 p-3 rounded-xl border border-stone-800 text-left w-full">
              {selectedIcon.description}
            </p>
          </div>

          {/* Mechanic Clause if present */}
          {selectedIcon.mechanicClause && (
            <div className="p-3 rounded-xl bg-stone-950/90 border border-amber-500/30 space-y-1">
              <span className="text-[10px] font-cinzel font-bold uppercase text-amber-300 block">
                Official Rulebook Clause
              </span>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {selectedIcon.mechanicClause}
              </p>
            </div>
          )}

          {/* Tactical Play Guide if present */}
          {selectedIcon.playGuide && (
            <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-1">
              <span className="text-[10px] font-cinzel font-bold uppercase text-blue-300 block">
                Tactical Play Guide
              </span>
              <p className="text-xs text-stone-300 leading-relaxed">
                💡 {selectedIcon.playGuide}
              </p>
            </div>
          )}

          {/* Synergies if present */}
          {selectedIcon.synergies && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <span className="text-[10px] font-cinzel font-bold uppercase text-emerald-300 block">
                Key Deck Synergies
              </span>
              <p className="text-xs text-stone-300 leading-relaxed">
                ⚡ {selectedIcon.synergies}
              </p>
            </div>
          )}

          {/* Progression Milestone */}
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1">
            <div className="flex items-center justify-between text-xs font-cinzel">
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Star size={13} />
                <span>Progression Milestone</span>
              </span>
              <span className="text-amber-400 font-mono font-bold">
                {selectedIcon.progressionTier || 'Adept'}
              </span>
            </div>
            <p className="text-xs text-stone-300">
              {selectedIcon.unlockCondition || 'Available across all base deck profiles.'}
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-cinzel uppercase text-stone-400 block">
              Associated Semantic Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedIcon.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-950 text-stone-300 border border-stone-800">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DOMAIN COMBAT PLAY GUIDE & TACTICAL PLAYBOOK */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase tracking-wider">
              <BookOpen size={14} />
              <span>Official Nexus Arena Playbook</span>
            </div>
            <h3 className="font-cinzel font-black text-xl text-stone-100 mt-1">
              Domain Combat Guide & Strategy Definitions
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Select any domain below to study its combat doctrine, ability interactions, and play guide.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['Radiance', 'Verdance', 'Sanctuary', 'Arcane', 'Abyss'] as const).map(dom => (
              <button
                key={dom}
                onClick={() => {
                  soundEngine.playMicroSound('select');
                  setActiveGuideDomain(dom);
                }}
                className={`px-3 py-1.5 rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5 ${
                  activeGuideDomain === dom
                    ? 'bg-amber-500 text-black shadow-lg ring-1 ring-amber-300'
                    : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-stone-700'
                }`}
              >
                {dom === 'Radiance' && '🔥'}
                {dom === 'Verdance' && '🌿'}
                {dom === 'Sanctuary' && '🛡️'}
                {dom === 'Arcane' && '⚡'}
                {dom === 'Abyss' && '💀'}
                <span>{dom}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Domain Guide Detail View */}
        {(() => {
          const guide = domainGuides[activeGuideDomain];
          return (
            <div className="space-y-6">
              <div 
                className="p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4"
                style={{
                  backgroundColor: `${guide.color}10`,
                  borderColor: `${guide.color}40`
                }}
              >
                <div>
                  <h4 className="font-cinzel font-bold text-lg text-amber-100" style={{ color: guide.color }}>
                    {guide.title}
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 max-w-3xl leading-relaxed">
                    {guide.playstyle}
                  </p>
                </div>
              </div>

              {/* 4 Key Mechanics for this Domain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.keyMechanics.map((mech, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{mech.icon}</span>
                      <h5 className="font-cinzel font-bold text-sm text-stone-100">
                        {mech.name}
                      </h5>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {mech.desc}
                    </p>
                    <div className="pt-2 border-t border-stone-800/80 text-[11px] text-amber-300 flex items-start gap-1">
                      <span className="font-bold shrink-0">Tip:</span>
                      <span className="text-stone-300">{mech.tip}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategic Playbook Advice */}
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
                <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <span>How to Pilot & Win with {activeGuideDomain}</span>
                </span>
                <ul className="space-y-1.5 text-xs text-stone-300 list-disc list-inside">
                  {guide.strategyTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
