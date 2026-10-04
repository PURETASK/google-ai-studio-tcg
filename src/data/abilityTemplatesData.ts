import { AbilityProperty, Domain } from '../types';

export interface AbilityTemplate extends AbilityProperty {
  domain: Domain | 'Neutral' | 'Spells' | 'Equipment';
  category: 'Offensive' | 'Defensive' | 'Support' | 'Control' | 'Ultimate';
  essenceCost?: number;
}

export interface AbilityTemplateCategory {
  id: string;
  name: string;
  domain: Domain | 'Neutral' | 'Spells' | 'Equipment';
  icon: string;
  description: string;
  templates: AbilityProperty[];
}

export const MASTER_ABILITY_TEMPLATES: AbilityTemplate[] = [
  // ================= SANCTUARY DOMAIN ABILITIES =================
  {
    id: 'tpl-sanc-solar-ward',
    name: 'Solar Ward',
    domain: 'Sanctuary',
    category: 'Defensive',
    type: 'Action',
    iconType: 'shield',
    description: 'Manifest a radiant barrier absorbing up to 4 incoming damage for target friendly ally or commander.',
    damageDice: 'Absorb 4 DMG',
    charges: '1/Turn',
    essenceCost: 2
  },
  {
    id: 'tpl-sanc-divine-retribution',
    name: 'Divine Retribution',
    domain: 'Sanctuary',
    category: 'Offensive',
    type: 'Reaction',
    iconType: 'sparkles',
    description: 'When struck by an enemy attack, reflect 3 holy radiance damage back to the attacker.',
    damageDice: '3 Holy DMG',
    charges: 'Reaction',
    essenceCost: 2
  },
  {
    id: 'tpl-sanc-benediction',
    name: 'Dawn Benediction',
    domain: 'Sanctuary',
    category: 'Support',
    type: 'Action',
    iconType: 'heart',
    description: 'Restore 3 Health to lowest-vitality vanguard unit and cleanse all active debuffs.',
    damageDice: '+3 HP Restored',
    charges: '2 Charges',
    essenceCost: 3
  },
  {
    id: 'tpl-sanc-seraphic-smite',
    name: 'Seraphic Smite',
    domain: 'Sanctuary',
    category: 'Offensive',
    type: 'Action',
    iconType: 'sword',
    description: 'Unleash a piercing beam of celestial wrath dealing 5 holy damage, bypassing enemy shields.',
    damageDice: '5 Direct DMG',
    charges: '1/Turn',
    essenceCost: 4
  },
  {
    id: 'tpl-sanc-bastion-aura',
    name: 'Bastion of the Seraph',
    domain: 'Sanctuary',
    category: 'Defensive',
    type: 'Passive',
    iconType: 'crown',
    description: 'Adjacent ally vanguard units gain +2 Defense and cannot be displaced or banished.',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-sanc-aegis-resurrection',
    name: 'Resurrection of the Just',
    domain: 'Sanctuary',
    category: 'Ultimate',
    type: 'Ultimate',
    iconType: 'sparkles',
    description: 'When a friendly unit is defeated, instantly revive them at 50% HP with a 3-point divine shield.',
    damageDice: 'Revive 50% HP',
    charges: '1/Match',
    essenceCost: 6
  },
  {
    id: 'tpl-sanc-judgment-gavel',
    name: 'Gavel of Infallible Truth',
    domain: 'Sanctuary',
    category: 'Control',
    type: 'Action',
    iconType: 'sword',
    description: 'Stun target high-threat enemy unit for 1 turn; if target is Abyssal, deal 4 Holy bonus damage.',
    damageDice: '4 Holy DMG + Stun',
    charges: '1/Turn',
    essenceCost: 3
  },

  // ================= RADIANCE DOMAIN ABILITIES =================
  {
    id: 'tpl-rad-eclipse-cleave',
    name: 'Eclipse Cleave',
    domain: 'Radiance',
    category: 'Offensive',
    type: 'Action',
    iconType: 'flame',
    description: 'Strike with a superheated plasma edge dealing 4d8 fire damage and melting target armor.',
    damageDice: '4d8 Fire DMG',
    charges: '1/Turn',
    essenceCost: 3
  },
  {
    id: 'tpl-rad-sunfire-absorption',
    name: 'Sunfire Absorption',
    domain: 'Radiance',
    category: 'Defensive',
    type: 'Passive',
    iconType: 'sun',
    description: 'Immune to fire damage; whenever fire spells are cast, gain +2 attack power permanently.',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-rad-magma-eruption',
    name: 'Caldera Rupture',
    domain: 'Radiance',
    category: 'Offensive',
    type: 'Action',
    iconType: 'flame',
    description: 'Rupture the ground beneath opposing lane, dealing 3 fire damage to all units in that lane.',
    damageDice: '3 Area Fire',
    charges: '1/Turn',
    essenceCost: 4
  },
  {
    id: 'tpl-rad-pyroclastic-shield',
    name: 'Pyroclastic Slag Armor',
    domain: 'Radiance',
    category: 'Defensive',
    type: 'Action',
    iconType: 'shield',
    description: 'Gain +3 Armor; melee attackers take 2 fire recoil damage each time they strike.',
    damageDice: '+3 Armor & 2 Recoil',
    charges: '2 Turns',
    essenceCost: 2
  },
  {
    id: 'tpl-rad-supernova-cataclysm',
    name: 'Solar Supernova',
    domain: 'Radiance',
    category: 'Ultimate',
    type: 'Ultimate',
    iconType: 'sun',
    description: 'Detonate coronal solar energy dealing 8 direct fire damage to all enemy units and burning commander for 3.',
    damageDice: '8 Area Fire DMG',
    charges: '1/Match',
    essenceCost: 7
  },
  {
    id: 'tpl-rad-cauterize',
    name: 'Cauterizing Flare',
    domain: 'Radiance',
    category: 'Support',
    type: 'Action',
    iconType: 'flame',
    description: 'Burn away poisons and corruptions from an ally, granting +2 ATK and +1 Momentum for the turn.',
    damageDice: '+2 ATK / +1 Momentum',
    charges: '1/Turn',
    essenceCost: 2
  },

  // ================= VERDANCE DOMAIN ABILITIES =================
  {
    id: 'tpl-verd-photosynthesis',
    name: 'Verdant Regrowth',
    domain: 'Verdance',
    category: 'Defensive',
    type: 'Passive',
    iconType: 'heart',
    description: 'At the start of each turn, heal the lowest-health friendly vanguard unit for +2 HP.',
    damageDice: '+2 HP/Turn',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-verd-thorn-entangle',
    name: 'Bramble Entangle',
    domain: 'Verdance',
    category: 'Control',
    type: 'Action',
    iconType: 'eye',
    description: 'Root target enemy unit in razor briars, disabling their attack for 1 turn and dealing 2 nature damage.',
    damageDice: '2 DMG + Root',
    charges: '1/Turn',
    essenceCost: 2
  },
  {
    id: 'tpl-verd-canopy-camouflage',
    name: 'Canopy Camouflage',
    domain: 'Verdance',
    category: 'Defensive',
    type: 'Action',
    iconType: 'wind',
    description: 'Shroud friendly unit in living foliage; cannot be targeted by enemy spells until after attacking.',
    charges: 'Stealth',
    essenceCost: 2
  },
  {
    id: 'tpl-verd-ancient-growth',
    name: 'Primal Overgrowth',
    domain: 'Verdance',
    category: 'Support',
    type: 'Action',
    iconType: 'sparkles',
    description: 'Infuse target unit with elder sap, granting +2 Attack and +3 Max Health permanently.',
    damageDice: '+2/+3 Stats',
    charges: '1/Turn',
    essenceCost: 3
  },
  {
    id: 'tpl-verd-toxic-symbiosis',
    name: 'Toxic Spore Burst',
    domain: 'Verdance',
    category: 'Offensive',
    type: 'Action',
    iconType: 'zap',
    description: 'Infect target enemy unit with virulent fungus, dealing 2 initial damage and 1 poison damage each turn.',
    damageDice: '2 DMG + 1/Turn',
    charges: '1/Turn',
    essenceCost: 2
  },
  {
    id: 'tpl-verd-stampede',
    name: 'Primordial Stampede',
    domain: 'Verdance',
    category: 'Ultimate',
    type: 'Ultimate',
    iconType: 'crown',
    description: 'Summon an ancient herd of titan beasts that tramples enemy frontline, dealing 6 physical damage and knocking enemies back.',
    damageDice: '6 Trample DMG',
    charges: '1/Match',
    essenceCost: 6
  },

  // ================= ARCANE DOMAIN ABILITIES =================
  {
    id: 'tpl-arc-rift-warp',
    name: 'Aether Rift Warp',
    domain: 'Arcane',
    category: 'Control',
    type: 'Action',
    iconType: 'zap',
    description: 'Teleport unit into an empty battlefield lane; draw 1 card from your library immediately.',
    charges: 'Draw 1 Card',
    essenceCost: 2
  },
  {
    id: 'tpl-arc-chrono-stasis',
    name: 'Chrono Stasis',
    domain: 'Arcane',
    category: 'Control',
    type: 'Action',
    iconType: 'eye',
    description: 'Freeze time for target enemy unit or hero relic, suppressing all activated abilities for 1 round.',
    charges: '1 Turn Stasis',
    essenceCost: 3
  },
  {
    id: 'tpl-arc-spell-siphon',
    name: 'Mana Spell Siphon',
    domain: 'Arcane',
    category: 'Support',
    type: 'Reaction',
    iconType: 'sparkles',
    description: 'When opponent casts a spell costing 3+ Essence, siphon 1 Essence back to your reservoir.',
    charges: 'Reaction',
    essenceCost: 1
  },
  {
    id: 'tpl-arc-astral-barrage',
    name: 'Astral Meteor Barrage',
    domain: 'Arcane',
    category: 'Offensive',
    type: 'Action',
    iconType: 'moon',
    description: 'Bombard enemy vanguard with 3 arcane meteors dealing 2 damage each to random targets.',
    damageDice: '3x 2 DMG',
    charges: '1/Turn',
    essenceCost: 5
  },
  {
    id: 'tpl-arc-quantum-reversal',
    name: 'Temporal Rewind',
    domain: 'Arcane',
    category: 'Ultimate',
    type: 'Ultimate',
    iconType: 'hourglass',
    description: 'Rewind the state of the battlefield by 1 round, undoing the last enemy attack and restoring lost unit health.',
    damageDice: 'Rewind Round',
    charges: '1/Match',
    essenceCost: 7
  },
  {
    id: 'tpl-arc-phase-shift',
    name: 'Ethereal Phase Shift',
    domain: 'Arcane',
    category: 'Defensive',
    type: 'Reaction',
    iconType: 'moon',
    description: 'Phase into astral dimensions when attacked, reducing incoming attack damage to 0.',
    damageDice: 'Immunity (1 Hit)',
    charges: 'Reaction',
    essenceCost: 2
  },

  // ================= ABYSS DOMAIN ABILITIES =================
  {
    id: 'tpl-aby-soul-rend',
    name: 'Soul Rend',
    domain: 'Abyss',
    category: 'Offensive',
    type: 'Action',
    iconType: 'skull',
    description: 'Rip spiritual essence from the target unit, dealing 4 necrotic damage and healing your commander for 2.',
    damageDice: '4 Necrotic / +2 Heal',
    charges: '1/Turn',
    essenceCost: 3
  },
  {
    id: 'tpl-aby-void-drain',
    name: 'Entropic Void Drain',
    domain: 'Abyss',
    category: 'Offensive',
    type: 'Action',
    iconType: 'skull',
    description: 'Drain 2 Attack power and 2 Health from target enemy, transferring it permanently to the caster.',
    damageDice: '-2/-2 Drain',
    charges: '1/Turn',
    essenceCost: 4
  },
  {
    id: 'tpl-aby-death-pact',
    name: 'Boneyard Pact',
    domain: 'Abyss',
    category: 'Support',
    type: 'Action',
    iconType: 'skull',
    description: 'Sacrifice a friendly unit to draw 2 cards and gain +2 Momentum immediately.',
    charges: 'Sacrifice',
    essenceCost: 1
  },
  {
    id: 'tpl-aby-doom-curse',
    name: 'Curse of the Nether',
    domain: 'Abyss',
    category: 'Control',
    type: 'Action',
    iconType: 'skull',
    description: 'Afflict enemy commander with Void Decay: at the end of every turn, take 1 cumulative true damage.',
    damageDice: '1 Stacking DMG/Turn',
    charges: '1/Turn',
    essenceCost: 4
  },
  {
    id: 'tpl-aby-abyssal-annihilation',
    name: 'Black Hole Singularity',
    domain: 'Abyss',
    category: 'Ultimate',
    type: 'Ultimate',
    iconType: 'skull',
    description: 'Collapse reality into a crushing void singularity, exiling target enemy unit permanently into the Void.',
    damageDice: 'Exile to Void',
    charges: '1/Match',
    essenceCost: 7
  },

  // ================= EQUIPMENT & WEAPON ABILITIES =================
  {
    id: 'tpl-eq-vorpal-edge',
    name: 'Vorpal Critical Strike',
    domain: 'Equipment',
    category: 'Offensive',
    type: 'Action',
    iconType: 'sword',
    description: 'Strike with razor precision; roll 1d6, on a 5 or 6, double all damage dealt and bypass armor.',
    damageDice: 'Double DMG on 5-6',
    charges: '1/Turn',
    essenceCost: 2
  },
  {
    id: 'tpl-eq-guard-breaker',
    name: 'Shieldbreaker Impact',
    domain: 'Equipment',
    category: 'Offensive',
    type: 'Action',
    iconType: 'sword',
    description: 'Shatter defending unit armor, instantly removing all shields and reducing their Defense by 3.',
    damageDice: '-3 Defense & Strip Shield',
    charges: '1/Turn',
    essenceCost: 2
  },
  {
    id: 'tpl-eq-tower-fortress',
    name: 'Iron Wall Stance',
    domain: 'Equipment',
    category: 'Defensive',
    type: 'Passive',
    iconType: 'shield',
    description: 'Wielder cannot be moved, knocked down, or critically struck. Grants +3 Armor to rear allies.',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-rad-magma-detonation',
    name: 'Magma Detonation',
    domain: 'Radiance',
    category: 'Offensive',
    type: 'Action',
    iconType: 'flame',
    description: 'Erupt molten fissure dealing 3 fire damage to target unit and 2 splash damage to adjacent foes.',
    damageDice: '3+2 Splash DMG',
    charges: '1/Turn',
    essenceCost: 3
  },
  {
    id: 'tpl-rad-infernal-rage',
    name: 'Infernal Rage',
    domain: 'Radiance',
    category: 'Support',
    type: 'Action',
    iconType: 'zap',
    description: 'Sacrifice 2 Health to permanently grant this unit +3 Attack Power and First Strike.',
    damageDice: '+3 ATK Boost',
    charges: '1/Battle',
    essenceCost: 1
  },
  {
    id: 'tpl-rad-pyroclastic-shield',
    name: 'Pyroclastic Armor',
    domain: 'Radiance',
    category: 'Defensive',
    type: 'Passive',
    iconType: 'shield',
    description: 'Melee attackers suffer 2 Burn damage whenever they strike this guardian unit.',
    damageDice: '2 Burn Ticks',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-rad-solar-flare',
    name: 'Solar Flare Supernova',
    domain: 'Radiance',
    category: 'Ultimate',
    type: 'Action',
    iconType: 'sun',
    description: 'Detonate miniature sun across the entire battlefield dealing 5 fire damage to all enemy units.',
    damageDice: '5 AOE Fire DMG',
    charges: '1/Match',
    essenceCost: 7
  },

  // ================= VERDANCE DOMAIN ABILITIES =================
  {
    id: 'tpl-verd-spore-cloud',
    name: 'Verdant Spores',
    domain: 'Verdance',
    category: 'Support',
    type: 'Passive',
    iconType: 'heart',
    description: 'At the start of each turn, heal the lowest-health friendly vanguard unit for +2 HP.',
    damageDice: '+2 HP/Turn',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-verd-thorn-entangle',
    name: 'Bramble Entangle',
    domain: 'Verdance',
    category: 'Control',
    type: 'Action',
    iconType: 'eye',
    description: 'Root target enemy unit in razor briars, disabling their attack for 1 turn and dealing 2 nature damage.',
    damageDice: '2 DMG + Root',
    charges: '1/Turn',
    essenceCost: 2
  },
  {
    id: 'tpl-verd-canopy-camouflage',
    name: 'Canopy Camouflage',
    domain: 'Verdance',
    category: 'Defensive',
    type: 'Action',
    iconType: 'wind',
    description: 'Shroud friendly unit in living foliage; cannot be targeted by enemy spells until after attacking.',
    charges: 'Stealth',
    essenceCost: 2
  },
  {
    id: 'tpl-verd-ancient-growth',
    name: 'Primal Overgrowth',
    domain: 'Verdance',
    category: 'Support',
    type: 'Action',
    iconType: 'sparkles',
    description: 'Infuse target unit with elder sap, granting +2 Attack and +3 Max Health permanently.',
    damageDice: '+2/+3 Stats',
    charges: '1/Turn',
    essenceCost: 3
  },
  {
    id: 'tpl-verd-toxic-symbiosis',
    name: 'Toxic Spore Burst',
    domain: 'Verdance',
    category: 'Offensive',
    type: 'Action',
    iconType: 'zap',
    description: 'Infect target enemy unit with virulent fungus, dealing 2 initial damage and 1 poison damage each turn.',
    damageDice: '2 DMG + 1/Turn',
    charges: '1/Turn',
    essenceCost: 2
  },

  // ================= ARCANE DOMAIN ABILITIES =================
  {
    id: 'tpl-arc-rift-warp',
    name: 'Aether Rift Warp',
    domain: 'Arcane',
    category: 'Control',
    type: 'Action',
    iconType: 'zap',
    description: 'Teleport unit into an empty battlefield lane; draw 1 card from your library immediately.',
    charges: 'Draw 1 Card',
    essenceCost: 2
  },
  {
    id: 'tpl-arc-chrono-stasis',
    name: 'Chrono Stasis',
    domain: 'Arcane',
    category: 'Control',
    type: 'Action',
    iconType: 'eye',
    description: 'Freeze time for target enemy unit or hero relic, suppressing all activated abilities for 1 round.',
    charges: '1 Turn Stasis',
    essenceCost: 3
  },
  {
    id: 'tpl-arc-spell-siphon',
    name: 'Mana Spell Siphon',
    domain: 'Arcane',
    category: 'Support',
    type: 'Reaction',
    iconType: 'sparkles',
    description: 'When opponent casts a spell costing 3+ Essence, siphon 1 Essence back to your reservoir.',
    charges: 'Reaction',
    essenceCost: 1
  },
  {
    id: 'tpl-arc-astral-barrage',
    name: 'Astral Meteor Barrage',
    domain: 'Arcane',
    category: 'Offensive',
    type: 'Action',
    iconType: 'moon',
    description: 'Bombard enemy vanguard with 3 arcane meteors dealing 2 damage each to random targets.',
    damageDice: '3x 2 DMG',
    charges: '1/Turn',
    essenceCost: 5
  },
  {
    id: 'tpl-arc-quantum-reversal',
    name: 'Quantum Reversal',
    domain: 'Arcane',
    category: 'Defensive',
    type: 'Reaction',
    iconType: 'sparkles',
    description: 'Rewind fatal damage received this turn, setting unit health to 1 instead of perishing.',
    charges: '1/Match',
    essenceCost: 3
  },

  // ================= ABYSS DOMAIN ABILITIES =================
  {
    id: 'tpl-aby-soul-siphon',
    name: 'Soul Siphon',
    domain: 'Abyss',
    category: 'Offensive',
    type: 'Action',
    iconType: 'skull',
    description: 'Drain 3 vitality from target enemy unit and restore 3 Health to your Commander.',
    damageDice: '3 Drain / Heal',
    charges: '1/Turn',
    essenceCost: 3
  },
  {
    id: 'tpl-aby-void-grasp',
    name: 'Abyssal Void Grasp',
    domain: 'Abyss',
    category: 'Control',
    type: 'Action',
    iconType: 'skull',
    description: 'Drag target enemy unit into the darkness, reducing their Attack power by 3 for 2 turns.',
    damageDice: '-3 Enemy ATK',
    charges: '1/Turn',
    essenceCost: 2
  },
  {
    id: 'tpl-aby-dark-pact',
    name: 'Forbidden Dark Pact',
    domain: 'Abyss',
    category: 'Support',
    type: 'Action',
    iconType: 'zap',
    description: 'Destroy a friendly vanguard unit to draw 2 cards and gain +2 temporary Essence this turn.',
    charges: 'Sacrifice',
    essenceCost: 1
  },
  {
    id: 'tpl-aby-necrotic-touch',
    name: 'Necrotic Touch',
    domain: 'Abyss',
    category: 'Offensive',
    type: 'Passive',
    iconType: 'sword',
    description: 'Deathtouch: Any unit damaged by this card is instantly destroyed regardless of remaining health.',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-aby-doom-resonance',
    name: 'Doom Cataclysm Tether',
    domain: 'Abyss',
    category: 'Ultimate',
    type: 'Action',
    iconType: 'skull',
    description: 'Tether opponent hero to void nexus; after 2 turns, deal 8 unblockable necrotic damage.',
    damageDice: '8 Doom DMG',
    charges: '1/Match',
    essenceCost: 6
  },

  // ================= UNIVERSAL / TACTICAL TRAITS =================
  {
    id: 'tpl-uni-taunt',
    name: 'Vanguard Taunt',
    domain: 'Neutral',
    category: 'Defensive',
    type: 'Passive',
    iconType: 'shield',
    description: 'Enemies must attack this vanguard unit before targeting other friendly units or your Commander.',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-uni-first-strike',
    name: 'Lightning First Strike',
    domain: 'Neutral',
    category: 'Offensive',
    type: 'Passive',
    iconType: 'sword',
    description: 'Deals combat damage before the defender can strike back.',
    charges: 'Passive',
    essenceCost: 0
  },
  {
    id: 'tpl-uni-armor-pierce',
    name: 'Armor Shatter',
    domain: 'Neutral',
    category: 'Offensive',
    type: 'Action',
    iconType: 'sword',
    description: 'Sunder enemy defensive shields completely and deal 3 direct piercing physical damage.',
    damageDice: '3 Pierce DMG',
    charges: '1/Turn',
    essenceCost: 2
  }
];

export const ALL_SYSTEM_ABILITY_TEMPLATES: AbilityTemplateCategory[] = [
  {
    id: 'cat-sanctuary',
    name: 'Sanctuary Abilities',
    domain: 'Sanctuary',
    icon: '✨',
    description: 'Holy protection, divine wards, cleansing light, and defensive fortitude.',
    templates: MASTER_ABILITY_TEMPLATES.filter(t => t.domain === 'Sanctuary')
  },
  {
    id: 'cat-radiance',
    name: 'Radiance Abilities',
    domain: 'Radiance',
    icon: '🔥',
    description: 'Solar immolation, volcanic bursts, burn ticks, and berserker rage.',
    templates: MASTER_ABILITY_TEMPLATES.filter(t => t.domain === 'Radiance')
  },
  {
    id: 'cat-verdance',
    name: 'Verdance Abilities',
    domain: 'Verdance',
    icon: '🌿',
    description: 'Nature regeneration, briar roots, poison spores, and primal growth.',
    templates: MASTER_ABILITY_TEMPLATES.filter(t => t.domain === 'Verdance')
  },
  {
    id: 'cat-arcane',
    name: 'Arcane Abilities',
    domain: 'Arcane',
    icon: '🔮',
    description: 'Temporal stasis, aether rift teleportation, spell siphoning, and meteor storms.',
    templates: MASTER_ABILITY_TEMPLATES.filter(t => t.domain === 'Arcane')
  },
  {
    id: 'cat-abyss',
    name: 'Abyss Abilities',
    domain: 'Abyss',
    icon: '💀',
    description: 'Soul draining, deathtouch necrosis, sacrificial pacts, and doom cataclysms.',
    templates: MASTER_ABILITY_TEMPLATES.filter(t => t.domain === 'Abyss')
  },
  {
    id: 'cat-neutral',
    name: 'Universal & Martial Traits',
    domain: 'Neutral',
    icon: '⚔️',
    description: 'Core combat stances, Taunt, First Strike, Armor Sunder, and weapon masteries.',
    templates: MASTER_ABILITY_TEMPLATES.filter(t => t.domain === 'Neutral')
  }
];
