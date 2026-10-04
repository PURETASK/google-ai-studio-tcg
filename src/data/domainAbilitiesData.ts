// ============================================================================
// NEXUS TCG 5-DOMAIN ARSENAL & ABILITIES COMPREHENSIVE DATA SPECIFICATION
// Exhaustive breakdown of Sanctuary, Radiance, Verdance, Arcane, and Abyss
// Specialized skills, mechanics, exact rules interactions, lane synergies,
// hazard resonance, artifact integrations, and dice calculations.
// ============================================================================

export interface DomainSpecialAbility {
  id: string;
  name: string;
  glyphIcon: string;
  domain: 'Sanctuary' | 'Radiance' | 'Verdance' | 'Arcane' | 'Abyss' | 'Hybrid';
  abilityCategory: 'Active Spell' | 'Fast Reaction' | 'Passive Aura' | 'Momentum Gated' | 'Ultimate Burst' | 'Stance Skill';
  essenceCost: number;
  momentumCost: number;
  momentumThreshold?: number;
  speedClass: 'Slow (Main Phase)' | 'Fast (Any Priority)' | 'Reaction (Trigger-Only)' | 'Continuous (Layer 6)' | 'Dawn Trigger (Phase 1)';
  targetRequirement: string;
  diceFormula?: string;
  rulesEffectText: string;
  stepByStepResolution: string[];
  mathematicalFormula: string;
  laneSynergy: {
    recommendedLane: 'Center Vanguard' | 'Left/Right Flank' | 'Backline Sanctuary' | 'All Lanes';
    spatialTactic: string;
  };
  hazardInteraction: {
    synergisticHazard: string;
    hazardInteractionRule: string;
  };
  artifactSynergy: {
    recommendedArtifact: string;
    relicBonus: string;
  };
  counterplayTip: string;
}

export interface DomainProfile {
  id: 'Sanctuary' | 'Radiance' | 'Verdance' | 'Arcane' | 'Abyss';
  displayName: string;
  title: string;
  sigil: string;
  themeColor: string;
  borderColor: string;
  bgGradient: string;
  accentBadge: string;
  philosophicalPillar: string;
  invertedParadigmExplanation: string;
  resourceCurveDescription: string;
  combatStance: string;
  signatureArchetypes: string[];
  forbiddenMechanics: string[];
  commanderHealthStrategy: string;
  laneMastery: {
    centerVanguard: string;
    flankLanes: string;
    backlineSanctuary: string;
  };
  abilities: DomainSpecialAbility[];
}

export const DOMAIN_PROFILES: DomainProfile[] = [
  // ==========================================================================
  // 1. SANCTUARY DOMAIN (ORDER, FORTIFICATION, AEGIS & RETRIBUTION)
  // ==========================================================================
  {
    id: 'Sanctuary',
    displayName: 'Sanctuary Domain',
    title: 'The Fortress of Solar Radiance & Divine Retribution',
    sigil: '🛡️',
    themeColor: '#eab308',
    borderColor: 'border-amber-400',
    bgGradient: 'from-amber-950/40 via-yellow-950/20 to-neutral-950',
    accentBadge: 'Divine Order & Vanguard Aegis',
    philosophicalPillar: 'Sanctuary believes that chaos is the true enemy of life. Order, structure, impenetrable defense, and holy vows form the unbreakable foundation of society. When striking, Sanctuary does so with righteous, measured retribution.',
    invertedParadigmExplanation: 'Unlike traditional passive healers, Sanctuary in Nexus is an aggressive fortress. Defense is weaponized: shields explode upon breaking, armor reflects physical strikes directly back to the attacker, and Taunt locks enemies into punishing counter-attacks.',
    resourceCurveDescription: 'Midrange to Late-Game Ramp (Turns 4–8). Sanctuary stabilizes early turns with durable 1-2 drop guardians, then ramps into massive 6-8 Essence celestial paragons that cannot be removed in a single turn.',
    combatStance: 'Unyielding Vanguard Fortification with Shield Reflection and Taunt Interception.',
    signatureArchetypes: ['Aegis Shieldwall', 'Martyr Retribution', 'Holy Armor Fortification', 'Vow of Silence (Anti-Spell)'],
    forbiddenMechanics: ['Random Hand Discard', 'Sacrificing friendly units for mana', 'Direct self-inflicted damage without immediate holy retribution'],
    commanderHealthStrategy: 'Sanctuary Commanders protect their 30 HP with layered Aether Shields, Armor stat values, and Backline Ward Shrines that redirect damage away from the player.',
    laneMastery: {
      centerVanguard: 'High-Armor Taunt Champions that block all line-of-sight attacks aimed at your Commander.',
      flankLanes: 'Righteous Paladins equipped with Holy Relic shields that intercept sweeping flankers.',
      backlineSanctuary: 'Monks and Wardens generating continuous Aether Shields for frontline units every Dawn Phase.'
    },
    abilities: [
      {
        id: 'sanc-aegis-halo',
        name: 'Aegis Halo of Protection',
        glyphIcon: '✨',
        domain: 'Sanctuary',
        abilityCategory: 'Active Spell',
        essenceCost: 2,
        momentumCost: 1,
        speedClass: 'Slow (Main Phase)',
        targetRequirement: 'Target friendly unit in any lane or Commander',
        diceFormula: '1d6 + 3 Holy Shield',
        rulesEffectText: 'Envelops target in a sanctified energy barrier. Target gains +4 Shield points. If target is in the Center Vanguard, also grant +1 Armor Durability for 2 turns.',
        stepByStepResolution: [
          '1. Verify 2 Essence and 1 Momentum available.',
          '2. Target is designated (Unit or Commander).',
          '3. +4 Shield points are added to target\'s current Shield buffer.',
          '4. If target is in Vanguard Slot (Lane 2), evaluate Layer 6 Armor buff (+1 Durability).',
          '5. Post-resolution: Shield absorbs next incoming damage before Health is touched.'
        ],
        mathematicalFormula: '\\text{Target Shield}_{\\text{new}} = \\text{Target Shield}_{\\text{old}} + 4 + (\\text{Vanguard} ? 1 : 0)',
        laneSynergy: {
          recommendedLane: 'Center Vanguard',
          spatialTactic: 'Placing on your Center Vanguard creates an impenetrable wall that absorbs up to 8 combined damage points before your Commander can be threatened.'
        },
        hazardInteraction: {
          synergisticHazard: 'Solar Flare / Holy Aurora',
          hazardInteractionRule: 'Under Holy Aurora weather, Aegis Halo cost is reduced by -1 Momentum, and grants an additional +2 Shield points.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Aegis Bastion Core (Relic #1)',
          relicBonus: 'Whenever an Aegis Halo is cast, the Bastion Core generates 1 Aether Charge counter.'
        },
        counterplayTip: 'Use Arcane Siphon spells to strip shields, or deploy Abyss Deathtouch units whose lethal touch bypasses numerical shield totals on organic champions.'
      },
      {
        id: 'sanc-retribution-strike',
        name: 'Righteous Retribution Strike',
        glyphIcon: '⚔️',
        domain: 'Sanctuary',
        abilityCategory: 'Fast Reaction',
        essenceCost: 3,
        momentumCost: 2,
        speedClass: 'Reaction (Trigger-Only)',
        targetRequirement: 'Triggered when an enemy unit declares an attack on your Commander or a Taunt unit',
        diceFormula: '2d8 Radiant Retaliation',
        rulesEffectText: 'When an enemy unit attacks, instantly strike back before combat damage resolves. Deal damage to the attacking unit equal to your Vanguard unit\'s Armor value + 3.',
        stepByStepResolution: [
          '1. Enemy declares attack during Clash Phase.',
          '2. Retribution Strike enters the Aether Chain as a Fast Reaction (Top of Stack).',
          '3. Calculate damage: \\text{Vanguard Armor} + 3.',
          '4. Deal damage to attacker. If lethal, the attacking unit perishes and its attack is canceled (SBA 104.1).'
        ],
        mathematicalFormula: '\\text{Retribution Damage} = \\text{Defender Armor} + 3 + (\\text{First Strike} ? 2 : 0)',
        laneSynergy: {
          recommendedLane: 'Center Vanguard',
          spatialTactic: 'Best triggered when the enemy commits their primary titan into your fortified center lane.'
        },
        hazardInteraction: {
          synergisticHazard: 'Tectonic Slag / Molten Rift',
          hazardInteractionRule: 'Attacking units trapped in molten hazard terrain take +2 additional retribution damage due to grounded conductivity.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Sunforged Tower Shield',
          relicBonus: 'Doubles the reflected retribution damage if the shield has maximum durability.'
        },
        counterplayTip: 'Bypass Vanguard Taunt units using Flying or Stealth flankers on the Left/Right lanes.'
      },
      {
        id: 'sanc-vow-of-silence',
        name: 'Vow of Grand Inquisitor',
        glyphIcon: '🕊️',
        domain: 'Sanctuary',
        abilityCategory: 'Momentum Gated',
        essenceCost: 4,
        momentumCost: 3,
        momentumThreshold: 6,
        speedClass: 'Slow (Main Phase)',
        targetRequirement: 'All enemy lanes and enemy Commander',
        rulesEffectText: '[Momentum >= 6 Required] Imposes divine silence across the battlefield. The opponent cannot cast Fast Spells or Reactions until the start of your next turn.',
        stepByStepResolution: [
          '1. Check player current Momentum (must be >= 6).',
          '2. Deduct 4 Essence and 3 Momentum.',
          '3. Attach Global Silence Aura to Aether Chain.',
          '4. Opponent priority windows for Fast Actions and Reactions are disabled until next Dawn Phase.'
        ],
        mathematicalFormula: '\\text{Opponent Fast Window} = 0 \\quad \\forall t \\in [T_{\\text{cast}}, T_{\\text{next Dawn}}]',
        laneSynergy: {
          recommendedLane: 'All Lanes',
          spatialTactic: 'Cast immediately before executing your primary Vanguard attack to guarantee the enemy cannot use combat tricks or kill spells.'
        },
        hazardInteraction: {
          synergisticHazard: 'Aether Void Gale',
          hazardInteractionRule: 'If cast during an Aether Void Gale hazard, the opponent also loses 2 unspent Essence.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Sanctified Altar of Vows',
          relicBonus: 'Reduces the Momentum threshold from 6 down to 4.'
        },
        counterplayTip: 'Play proactive board presence on your own turn rather than relying on reactive fast spells.'
      }
    ]
  },

  // ==========================================================================
  // 2. RADIANCE DOMAIN (SOLAR BURN, IMMOLATION & HYPER-AGGRO)
  // ==========================================================================
  {
    id: 'Radiance',
    displayName: 'Radiance Domain',
    title: 'The Solar Caldera of Volatile Immolation & Berserker Fury',
    sigil: '🔥',
    themeColor: '#ef4444',
    borderColor: 'border-red-500',
    bgGradient: 'from-red-950/40 via-orange-950/20 to-neutral-950',
    accentBadge: 'Solar Immolation & Overwhelm',
    philosophicalPillar: 'Radiance represents the untamable heat of the midday sun and roaring volcanic calderas. It is pure action, explosive momentum, and uncompromising speed. Hesitation is death; victory belongs to those who strike first and burn hottest.',
    invertedParadigmExplanation: 'Unlike holy paladins, Radiance in Nexus is a blistering hyper-aggro and burn domain. It values velocity over defense, tearing through enemy armor with superheated plasma and dealing splash damage across adjacent lanes.',
    resourceCurveDescription: 'Hyper-Aggressive Early Curve (Turns 1–5). Radiance floods the board with high-attack 1-3 cost berserkers and burn spells to end matches before control decks can stabilize.',
    combatStance: 'First Strike Aggression, Overwhelm Trample, and Explosive Lane Breach.',
    signatureArchetypes: ['Solar Burn Storm', 'Berserker Overwhelm', 'Armory Weapon Master', 'Plasma Meltdown'],
    forbiddenMechanics: ['Passive Life Gain', 'Damage Reduction Shields', 'Permanent Stasis Freezes'],
    commanderHealthStrategy: 'Radiance treats Commander 30 HP as a tactical resource to burn through for explosive bursts of momentum and spell power.',
    laneMastery: {
      centerVanguard: 'Heavy Berserkers with Overwhelm that smash through enemy blockers and hit the Commander.',
      flankLanes: 'Blazing skirmishers with First Strike that eliminate flank defenders before they can strike back.',
      backlineSanctuary: 'Solar Pyromancers casting long-range catapult fireballs into any lane.'
    },
    abilities: [
      {
        id: 'rad-solar-supernova',
        name: 'Solar Supernova Immolation',
        glyphIcon: '💥',
        domain: 'Radiance',
        abilityCategory: 'Ultimate Burst',
        essenceCost: 6,
        momentumCost: 5,
        momentumThreshold: 8,
        speedClass: 'Slow (Main Phase)',
        targetRequirement: 'Center Vanguard and both adjacent Flank lanes',
        diceFormula: '6d6 Solar Fire',
        rulesEffectText: '[Momentum >= 8 Required] Unleash a catastrophic solar blast dealing 6 damage to the Center Vanguard unit and 3 splash damage to Left and Right Flank units. Sunders all Armor Durability to 0.',
        stepByStepResolution: [
          '1. Verify player Momentum >= 8.',
          '2. Deduct 6 Essence and 5 Momentum.',
          '3. Deal 6 direct Fire damage to enemy Vanguard unit.',
          '4. Deal 3 Fire damage to Left Flank unit and 3 to Right Flank unit.',
          '5. Reduce Armor values of all struck units to 0 (Armor Sunder).',
          '6. Excess damage on Vanguard with Overwhelm is redirected to enemy Commander Vitality.'
        ],
        mathematicalFormula: '\\text{Dmg}_{\\text{Vanguard}} = 6, \\quad \\text{Dmg}_{\\text{Flanks}} = 3, \\quad \\text{Armor}_{\\text{all}} = 0',
        laneSynergy: {
          recommendedLane: 'Center Vanguard',
          spatialTactic: 'Destroys the entire enemy front row in a single devastating strike, leaving the enemy Commander wide open to lethal flank attacks.'
        },
        hazardInteraction: {
          synergisticHazard: 'Tectonic Caldera Slag',
          hazardInteractionRule: 'In volcanic environments, Solar Supernova deals +2 additional damage to all targets and sets the lanes on fire for 2 turns.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Sol-Thar Primordial Lens',
          relicBonus: 'Refunds 2 Momentum whenever a 5+ cost fire spell is resolved.'
        },
        counterplayTip: 'Equip Backline Ward Shrines or hold Sanctuary Aegis Halo reactions to absorb the initial 6-damage impact.'
      },
      {
        id: 'rad-magma-sunder',
        name: 'Magma Blade Sunder',
        glyphIcon: '🗡️',
        domain: 'Radiance',
        abilityCategory: 'Active Spell',
        essenceCost: 2,
        momentumCost: 1,
        speedClass: 'Fast (Any Priority)',
        targetRequirement: 'Target enemy unit with Armor or Shield',
        diceFormula: '2d6 Armor Melt',
        rulesEffectText: 'Target enemy unit has its Armor permanently destroyed and loses all active Shield points. Deal 2 Fire damage to that unit.',
        stepByStepResolution: [
          '1. Target enemy unit is selected.',
          '2. Strip Shield buffer to 0 immediately.',
          '3. Set unit Armor Durability to 0.',
          '4. Apply 2 direct Fire damage to unit Base Health.'
        ],
        mathematicalFormula: '\\text{Shield} \\to 0, \\quad \\text{Armor} \\to 0, \\quad \\text{HP} = \\text{HP} - 2',
        laneSynergy: {
          recommendedLane: 'Center Vanguard',
          spatialTactic: 'Punctures the enemy’s main tank immediately before your high-attack flankers execute their combat swings.'
        },
        hazardInteraction: {
          synergisticHazard: 'Molten Ash Storm',
          hazardInteractionRule: 'If an ash storm is forecasted, Magma Sunder refunds 1 Essence upon successful resolution.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Furnace of the Red Dragon',
          relicBonus: 'Whenever an enemy armor is sundered, your Commander gains +1 Momentum.'
        },
        counterplayTip: 'Do not over-invest into a single high-armor guardian; spread defensive buffs across multiple flank units.'
      }
    ]
  },

  // ==========================================================================
  // 3. VERDANCE DOMAIN (PRIMAL BIO-GROWTH, REGENERATION & OVERRUN)
  // ==========================================================================
  {
    id: 'Verdance',
    displayName: 'Verdance Domain',
    title: 'The Primordial Worldtree of Wild Growth & Bio-Regeneration',
    sigil: '🌿',
    themeColor: '#10b981',
    borderColor: 'border-emerald-500',
    bgGradient: 'from-emerald-950/40 via-green-950/20 to-neutral-950',
    accentBadge: 'Exponential Ramp & Bio-Regeneration',
    philosophicalPillar: 'Verdance represents the relentless, unstoppable power of primordial nature. Life does not ask for permission; it grows, adapts, and overwhelms all artificial constraints. Even when crushed, nature sprouts anew with doubled vigor.',
    invertedParadigmExplanation: 'Verdance is not a peaceful forest—it is a savage, hyper-adaptive ecosystem. Spore tokens multiply exponentially, living beasts regenerate missing limbs at Dawn, and massive Behemoths trample through fortified stone walls.',
    resourceCurveDescription: 'Exponential Ramp Curve (Turns 3–7). Verdance accelerates Essence acquisition rapidly, reaching 10 Essence faster than any other domain.',
    combatStance: 'Wide Spore Swarms, Heavy Regeneration at Dawn, and Trampling Overrun.',
    signatureArchetypes: ['Sporeling Swarm Colony', 'Primeval Behemoth Ramp', 'Briar Patch Terrain Control', 'Bio-Evolution Morphing'],
    forbiddenMechanics: ['Instant Spell Countering', 'Permanent Banishing to Void', 'Direct Spell Burn to Commander Life'],
    commanderHealthStrategy: 'Verdance Commanders sustain their 30 HP through constant biomass regeneration and meat-shield spore tokens that intercept attacks.',
    laneMastery: {
      centerVanguard: 'Colossal Wurms and Treants with massive HP pools (8-14 HP) and Regeneration 2.',
      flankLanes: 'Fast predatory beasts with Trample that punish empty enemy lanes.',
      backlineSanctuary: 'Spore Cultivators generating 1/1 Sporeling tokens every turn.'
    },
    abilities: [
      {
        id: 'ver-spore-multiplication',
        name: 'Primeval Spore Infestation',
        glyphIcon: '🍄',
        domain: 'Verdance',
        abilityCategory: 'Active Spell',
        essenceCost: 3,
        momentumCost: 2,
        speedClass: 'Slow (Main Phase)',
        targetRequirement: 'Any empty battlefield lane slots',
        rulesEffectText: 'Summon three 1/1 Sporeling tokens across Left Flank, Center Vanguard, and Right Flank. If a slot is already occupied, grant that unit +1/+1 and Regenerate 1 instead.',
        stepByStepResolution: [
          '1. Inspect all 3 friendly lane slots.',
          '2. For each unoccupied slot, instantiate a 1/1 Sporeling token with Beast/Plant tag.',
          '3. For occupied slots, apply Layer 6 additive buff (+1 ATK / +1 HP) and attach the Regenerate 1 status keyword.',
          '4. All summoned Sporelings are readied for defensive blocking.'
        ],
        mathematicalFormula: '\\text{Total Board Stats Added} = 3 \\times (\\text{Tokens} \\lor \\text{Buffs}) = +3 / +3',
        laneSynergy: {
          recommendedLane: 'All Lanes',
          spatialTactic: 'Instantly populates all 3 combat lanes, guaranteeing that the enemy cannot strike your Commander directly.'
        },
        hazardInteraction: {
          synergisticHazard: 'Spore Monsoon / Verdant Rain',
          hazardInteractionRule: 'Under Spore Monsoon weather, summoned Sporelings enter with +1 bonus Health (2/2 stats).'
        },
        artifactSynergy: {
          recommendedArtifact: 'Worldroot Bio-Seedling',
          relicBonus: 'Whenever 3 tokens exist on your board, gain +1 permanent bonus Essence max.'
        },
        counterplayTip: 'Use Radiance Volcanic Storm or Arcane Area Clears to wipe low-HP Sporelings simultaneously.'
      },
      {
        id: 'ver-apex-regeneration',
        name: 'Apex Bio-Metamorphosis',
        glyphIcon: '🦖',
        domain: 'Verdance',
        abilityCategory: 'Momentum Gated',
        essenceCost: 5,
        momentumCost: 3,
        momentumThreshold: 5,
        speedClass: 'Slow (Main Phase)',
        targetRequirement: 'Target friendly beast or plant unit',
        rulesEffectText: '[Momentum >= 5 Required] Target friendly unit mutates into an Apex Behemoth: Double its current Health, grant +3 Attack, and attach Overwhelm and Regenerate 3.',
        stepByStepResolution: [
          '1. Target friendly unit is selected.',
          '2. Current HP is multiplied by 2 (Layer 6 Calculation).',
          '3. Base Attack is increased by +3.',
          '4. Attach Overwhelm and Regenerate 3 keywords to unit stat block.',
          '5. Unit becomes an Apex Predator subtype.'
        ],
        mathematicalFormula: '\\text{New HP} = \\text{Current HP} \\times 2, \\quad \\text{New ATK} = \\text{Current ATK} + 3',
        laneSynergy: {
          recommendedLane: 'Center Vanguard',
          spatialTactic: 'Turns a simple 4/4 Treant into an unstoppable 7/8 regenerating juggernaut that dominates the center lane.'
        },
        hazardInteraction: {
          synergisticHazard: 'Briar Infestation',
          hazardInteractionRule: 'Behemoths ignore Briar terrain movement penalties and gain +1 attack while standing in thorn hazards.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Fossilized Titan Skull',
          relicBonus: 'Apex units cost -1 Essence and -1 Momentum to mutate.'
        },
        counterplayTip: 'Deploy Abyss Deathtouch units or cast targeted banishment spells rather than trying to brute-force through its massive regenerating health pool.'
      }
    ]
  },

  // ==========================================================================
  // 4. ARCANE DOMAIN (TEMPORAL MASTERY, STASIS & SPACETIME SIPHON)
  // ==========================================================================
  {
    id: 'Arcane',
    displayName: 'Arcane Domain',
    title: 'The Cosmic Chronometer of Spacetime Distortion & Stasis',
    sigil: '🌀',
    themeColor: '#3b82f6',
    borderColor: 'border-blue-500',
    bgGradient: 'from-blue-950/40 via-indigo-950/20 to-neutral-950',
    accentBadge: 'Temporal Control & Spell Siphon',
    philosophicalPillar: 'Arcane recognizes that time, space, and probability are malleable constructs. True power lies not in physical muscle or brute fire, but in manipulating the sequence of cause and effect. If an outcome is unfavorable, rewrite the timeline.',
    invertedParadigmExplanation: 'Arcane is the ultimate tempo-control domain. It locks enemy units into Stasis crystals, siphons opponent Essence to fuel its own spells, teleports units across lanes instantly, and rewinds combat steps.',
    resourceCurveDescription: 'Slow Control & Combo Assembly (Turns 5–10). Survives early pressure through bounces and stasis freezes, then assembles game-winning infinite spell loops in the late game.',
    combatStance: 'Evasive Stasis Freezes, Long-Range Reach Attacks, and Spacetime Teleportation.',
    signatureArchetypes: ['Chrono Stasis Lock', 'Aether Spell Siphon', 'Dimensional Teleportation', 'Infinite Time Loop Combo'],
    forbiddenMechanics: ['Permanent Stat Buffs without Mana Upkeep', 'Direct Physical Melee Brawling', 'Self-Healing of Physical Wounds'],
    commanderHealthStrategy: 'Arcane protects its 30 HP by preventing attacks from even occurring via Stasis freezes and Temporal Rewinds.',
    laneMastery: {
      centerVanguard: 'Illusionary Holograms and Aether Golems that phase out of existence when targeted.',
      flankLanes: 'Chrono-Mages with Reach that strike across any lane without line-of-sight restrictions.',
      backlineSanctuary: 'Cosmic Astrologers drawing 2-3 additional cards per turn.'
    },
    abilities: [
      {
        id: 'arc-chrono-stasis',
        name: 'Chrono-Stasis Temporal Lock',
        glyphIcon: '⏳',
        domain: 'Arcane',
        abilityCategory: 'Active Spell',
        essenceCost: 3,
        momentumCost: 2,
        speedClass: 'Fast (Any Priority)',
        targetRequirement: 'Target enemy unit or artifact',
        rulesEffectText: 'Encase target in a temporal stasis field for 1 full turn cycle. Target cannot attack, block, activate abilities, or trigger passives. Target does not untap during next Dawn Phase.',
        stepByStepResolution: [
          '1. Target enemy unit or artifact is selected.',
          '2. Attach [Stasis Lock Counter] to the target.',
          '3. Disable all attack/block flags on target.',
          '4. Disable all tap/activated abilities.',
          '5. At next Dawn Phase, target skips its status untap step and removes the Stasis Counter.'
        ],
        mathematicalFormula: '\\text{Target Active State} = \\text{FALSE} \\quad \\forall t \\in [T_{\\text{cast}}, T_{\\text{next Dusk}}]',
        laneSynergy: {
          recommendedLane: 'Center Vanguard',
          spatialTactic: 'Freezes the enemy’s largest Vanguard champion, completely opening their center lane for your attackers.'
        },
        hazardInteraction: {
          synergisticHazard: 'Temporal Dilation Vortex',
          hazardInteractionRule: 'If cast inside a Temporal Vortex, Chrono-Stasis extends its duration to 2 full turn cycles.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Chronomancer\'s Hourglass',
          relicBonus: 'Whenever you freeze a unit, draw 1 card from your library.'
        },
        counterplayTip: 'Use Sanctuary Cleanse spells to purge status debuffs, or sacrifice the frozen unit using Abyss abilities for immediate value.'
      },
      {
        id: 'arc-aether-siphon',
        name: 'Aether Essence Siphon',
        glyphIcon: '🌌',
        domain: 'Arcane',
        abilityCategory: 'Fast Reaction',
        essenceCost: 2,
        momentumCost: 1,
        speedClass: 'Reaction (Trigger-Only)',
        targetRequirement: 'Triggered when opponent casts a spell costing 3+ Essence',
        rulesEffectText: 'Counter the targeted spell unless opponent pays 2 additional Essence. If countered, you gain +2 temporary Essence and +1 Momentum this turn.',
        stepByStepResolution: [
          '1. Opponent casts high-cost spell onto Aether Chain.',
          '2. Siphon enters stack on top of opponent\'s spell (LIFO order).',
          '3. Check opponent remaining Essence. If they cannot pay 2 Essence, spell is countered and sent to Graveyard.',
          '4. You immediately receive +2 temporary Essence and +1 Momentum.'
        ],
        mathematicalFormula: '\\text{If } E_{\\text{opp}} < 2 \\implies \\text{Countered}, \\quad E_{\\text{player}} += 2, \\quad M_{\\text{player}} += 1',
        laneSynergy: {
          recommendedLane: 'Backline Sanctuary',
          spatialTactic: 'Safely cast from the backline while maintaining complete priority denial over the battlefield.'
        },
        hazardInteraction: {
          synergisticHazard: 'Aether Storm',
          hazardInteractionRule: 'In Aether Storms, Essence tax increases from 2 to 3.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Orb of the Astral Mind',
          relicBonus: 'Increases the siphon bonus to +3 Essence.'
        },
        counterplayTip: 'Bait out counterspells using low-cost 1-2 Essence cantrips before committing your main boss monster.'
      }
    ]
  },

  // ==========================================================================
  // 5. ABYSS DOMAIN (NECROSIS, SACRIFICE & SOUL HARVEST)
  // ==========================================================================
  {
    id: 'Abyss',
    displayName: 'Abyss Domain',
    title: 'The Nether Trench of Necrotic Decay & Soul Harvest',
    sigil: '💀',
    themeColor: '#a855f7',
    borderColor: 'border-purple-600',
    bgGradient: 'from-purple-950/40 via-neutral-950 to-neutral-950',
    accentBadge: 'Necrotic Attrition & Soul Harvest',
    philosophicalPillar: 'The Abyss understands that death is not an ending, but a transaction. Flesh decays, spirits shatter, and every fallen soldier leaves behind soul energy waiting to be harvested. Sacrifice is the fastest path to ultimate power.',
    invertedParadigmExplanation: 'Unlike generic zombie decks, Abyss in Nexus is a surgical attrition and debt engine. It inflicts permanent -1/-1 Wither counters that permanently degrade enemy stats, reanimates colossal titans from the graveyard for zero mana, and executes deathtouch kills.',
    resourceCurveDescription: 'Sacrifice & Debt Curve (Turns 2–6). Uses cheap sacrifice fodder to power out 8-cost underworld horrors on Turn 3-4.',
    combatStance: 'Deathtouch Lethality, Wither Stat Degradation, and Sacrificial Explosions.',
    signatureArchetypes: ['Soul Harvest Reanimation', 'Necrotic Wither Plague', 'Sacrificial Blood Engine', 'Doom Tether Cataclysm'],
    forbiddenMechanics: ['Healing enemy units', 'Direct Armor Fortification', 'Pure Defensive Shield Walls'],
    commanderHealthStrategy: 'Abyss pays its own 30 HP to activate lethal spells, then drains health back from the opponent via Soul Siphon.',
    laneMastery: {
      centerVanguard: 'Indestructible Undead Knights that revive themselves immediately upon perishing.',
      flankLanes: 'Lethal Assassins with Deathtouch that destroy any unit they touch regardless of HP.',
      backlineSanctuary: 'Necromancers harvesting Soul Counters from every casualty across the board.'
    },
    abilities: [
      {
        id: 'aby-soul-harvest-reanimate',
        name: 'Soul Harvest Reanimation',
        glyphIcon: '⚰️',
        domain: 'Abyss',
        abilityCategory: 'Active Spell',
        essenceCost: 4,
        momentumCost: 2,
        speedClass: 'Slow (Main Phase)',
        targetRequirement: 'Target unit card in either player\'s Graveyard',
        rulesEffectText: 'Sacrifice 1 friendly token or pay 3 Commander Health: Reanimate target unit from the Graveyard directly onto your Center Vanguard lane with +2/+0 and Deathtouch.',
        stepByStepResolution: [
          '1. Choose payment: Sacrifice 1 friendly unit OR deduct 3 HP from your Commander.',
          '2. Deduct 4 Essence and 2 Momentum.',
          '3. Select target unit in Graveyard (can target opponent\'s fallen boss monsters!).',
          '4. Instantiate unit in Center Vanguard lane.',
          '5. Apply Layer 6 buff (+2 ATK) and attach Deathtouch keyword.'
        ],
        mathematicalFormula: '\\text{Cost} = (\\text{Sacrifice Unit} \\lor -3 \\text{ HP}) + 4E + 2M \\implies \\text{Reanimate}(Target) + 2/0 + \\text{Deathtouch}',
        laneSynergy: {
          recommendedLane: 'Center Vanguard',
          spatialTactic: 'Allows you to bring back a 9-cost titan on Turn 4 to lock down the center lane with lethal Deathtouch.'
        },
        hazardInteraction: {
          synergisticHazard: 'Miasma Fog / Void Sinkhole',
          hazardInteractionRule: 'Reanimation spells cost -1 Essence if cast while Miasma Fog is active in the arena.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Urn of Endless Torment',
          relicBonus: 'Whenever a reanimated unit dies, gain 2 Soul Counters.'
        },
        counterplayTip: 'Exile cards from the Graveyard into the Void using Sanctuary hallowed ground or Arcane temporal banishers.'
      },
      {
        id: 'aby-wither-plague',
        name: 'Necrotic Wither Plague',
        glyphIcon: '☠️',
        domain: 'Abyss',
        abilityCategory: 'Fast Reaction',
        essenceCost: 3,
        momentumCost: 2,
        speedClass: 'Fast (Any Priority)',
        targetRequirement: 'All enemy units in a target lane',
        diceFormula: '2d4 Wither Counters',
        rulesEffectText: 'Distribute 4 permanent [-1/-1 Wither Counters] among enemy units in the target lane. Units reduced to 0 Health by Wither counters are exiled to the Void rather than the Graveyard.',
        stepByStepResolution: [
          '1. Target enemy lane is selected (Left Flank, Vanguard, or Right Flank).',
          '2. Distribute 4 [-1/-1] counters across units in that lane.',
          '3. Recompute Layer 6 stats.',
          '4. If any unit reaches <= 0 HP, trigger State-Based Action 104.1 (Exile to Void).'
        ],
        mathematicalFormula: '\\text{Unit ATK}_{\\text{new}} = \\text{Unit ATK} - C_{\\text{wither}}, \\quad \\text{Unit HP}_{\\text{new}} = \\text{Unit HP} - C_{\\text{wither}}',
        laneSynergy: {
          recommendedLane: 'Left/Right Flank',
          spatialTactic: 'Destroys enemy token swarms and permanently shrinks giant behemoths so they can no longer trade effectively.'
        },
        hazardInteraction: {
          synergisticHazard: 'Acidic Rainstorm',
          hazardInteractionRule: 'Acid Rain doubles the stat reduction of all active Wither counters.'
        },
        artifactSynergy: {
          recommendedArtifact: 'Grimoire of Black Rot',
          relicBonus: 'Whenever an enemy dies from Wither, your Commander restores 2 Health.'
        },
        counterplayTip: 'Sanctuary Cleanse spells remove all Wither counters immediately, restoring units to full base stats.'
      }
    ]
  }
];

export const DUAL_DOMAIN_SYNERGIES = [
  {
    id: 'dawnforge',
    name: 'Dawnforge (Sanctuary + Radiance)',
    icon: '☀️',
    badge: 'Solar Crusader',
    theme: 'Divine Armor meets Superheated Plasma',
    signatureMove: 'Radiant Aegis Burst: Deals damage equal to current Shield total to all enemy frontline units.',
    strategicPlaystyle: 'Build massive defensive armor walls, then detonate them into explosive direct damage.'
  },
  {
    id: 'primordial-sun',
    name: 'Primordial Sun (Radiance + Verdance)',
    icon: '🌻',
    badge: 'Apex Swarm Aggro',
    theme: 'Rapid Mana Ramp meets First Strike Trample',
    signatureMove: 'Solar Overrun: Grants all Sporelings +2/+0 and First Strike for 1 turn.',
    strategicPlaystyle: 'Floods the board with 5+ units by Turn 3 and finishes the game with an unblockable swarm.'
  },
  {
    id: 'astral-bloom',
    name: 'Astral Bloom (Verdance + Arcane)',
    icon: '🌌',
    badge: 'Infinite Mana Engine',
    theme: 'Exponential Essence Ramp meets Massive Card Draw',
    signatureMove: 'Worldtree Chronometer: Refills all Essence and draws 3 cards at Dawn.',
    strategicPlaystyle: 'Draws entire deck by Turn 6 and casts multiple 8+ cost titans in a single turn.'
  },
  {
    id: 'nether-chrono',
    name: 'Nether Chrono (Arcane + Abyss)',
    icon: '⏳💀',
    badge: 'Ultimate Control Attrition',
    theme: 'Temporal Stasis Freezes meet Deathtouch Wither',
    signatureMove: 'Decay Time Warp: Skips the opponent’s next combat phase while draining 4 Health.',
    strategicPlaystyle: 'Denies all opponent actions while ticking away life totals with inevitable doom counters.'
  },
  {
    id: 'void-eclipse',
    name: 'Void Eclipse (Sanctuary + Abyss)',
    icon: '🛡️💀',
    badge: 'Immortal Martyr',
    theme: 'Holy Shield Defense meets Self-Sacrifice Power',
    signatureMove: 'Martyr’s Requiem: When a Taunt unit falls, revive it with full Health as a Ghost Knight.',
    strategicPlaystyle: 'Turns unit deaths into beneficial triggers, creating an endless loop of unkillable defenders.'
  }
];
