import { AdjudicatorKeyword, JudgeCaseScenario } from '../types';

export const COMPREHENSIVE_KEYWORDS: AdjudicatorKeyword[] = [
  {
    id: 'kw-rebirth',
    name: 'Rebirth',
    domain: 'Universal',
    type: 'Evergreen',
    speed: 'Triggered',
    reminderText: 'When this unit would be slain, it restores to life once with 1 HP and enters Exhausted state.',
    formalRulesText: 'Rule 408.1 (Rebirth): Rebirth creates a mandatory replacement effect when lethal damage or a destroy effect is applied. Instead of moving to the Graveyard, the unit retains its board slot, clears all marked damage, sets current HP to 1, loses the Rebirth keyword until re-attuned, and gains the Exhausted status.',
    clarifications: [
      'Rebirth triggers before "On Death" triggers because the unit never touches the Graveyard.',
      'If lethal damage is dealt by an effect with "Obliterate" or "Soul Exile", Rebirth is overridden and fails.',
      'A unit that rebirths does not trigger "Summon" or "Enter Play" abilities.'
    ],
    counterplayTip: 'Follow up lethal damage with an instant-speed 1-damage ping (e.g. Cinder Dart) or silence the target before dealing lethal.',
    relatedCardIds: ['RAD-001', 'ABY-002', 'SAN-005']
  },
  {
    id: 'kw-soulbinding',
    name: 'Soulbinding',
    domain: 'Abyss',
    type: 'Domain Signature',
    speed: 'Triggered',
    reminderText: 'When this unit slays an enemy or perishes, store 1 Soul in your domain Soul Vat (capped at 5).',
    formalRulesText: 'Rule 502.4 (Soulbinding): Whenever a Soulbound permanent changes zones from battlefield to graveyard, or resolves lethal combat damage against another permanent, increment the controller’s Soul Vat count by 1, strictly subject to the GLO-14 hard cap of 5 souls.',
    clarifications: [
      'Souls cannot exceed 5 under any circumstance (Council Rule GLO-14 Red-Team safety).',
      'Tokens do NOT generate Souls unless specifically granted the Soulbound modifier.'
    ],
    counterplayTip: 'Exile Abyss units rather than destroying them, or use Sanctuary consecration cards to purge their Soul Vat.',
    relatedCardIds: ['ABY-001', 'ABY-003', 'ABY-007']
  },
  {
    id: 'kw-echo',
    name: 'Echo',
    domain: 'Arcane',
    type: 'Domain Signature',
    speed: 'Fast Reaction',
    reminderText: 'After this spell resolves, you may pay 1 Momentum to cast an ethereal copy targeting any valid target.',
    formalRulesText: 'Rule 503.2 (Echo): When an Echo spell resolves and leaves the Stack, an automatic priority trigger prompts the caster. Paying 1 Momentum creates a duplicate spell instance on the top of the Aether Chain. The duplicate has no card object in the graveyard.',
    clarifications: [
      'Echo copies can be reacted to by the opponent on the priority stack before resolving.',
      'Echo cannot chain indefinitely; each spell specifies a maximum of 1 Echo resolution per turn.'
    ],
    counterplayTip: 'Hold 1 Momentum for a Momentum Tax or Priority Interrupt to increase the cost or redirect the Echo copy.',
    relatedCardIds: ['ARC-001', 'ARC-004', 'TMP-AM002']
  },
  {
    id: 'kw-skyborn',
    name: 'Skyborn',
    domain: 'Tempest',
    type: 'Domain Signature',
    speed: 'Passive',
    reminderText: 'This unit ignores ground Vanguard taunt walls and can attack flank lanes or the Commander directly.',
    formalRulesText: 'Rule 505.1 (Skyborn): Permanent possesses flight elevation. Ground-bound Vanguard units cannot declare defensive interception against Skyborn attackers unless the defender has Reach or Skyborn.',
    clarifications: [
      'Ground spells that target "Earth" or "Ground Lanes" (e.g. Molten Fissure) deal -2 reduced damage to Skyborn units.',
      'Skyborn units can still block ground attackers if placed in a Vanguard slot.'
    ],
    counterplayTip: 'Deploy ranged units with the Reach attribute, or use Tempest Fogtouch to exhaust the flyer before it attacks.',
    relatedCardIds: ['TMP-CS001', 'TMP-CS004', 'TMP-EC001']
  },
  {
    id: 'kw-fogtouch',
    name: 'Fogtouch',
    domain: 'Tempest',
    type: 'Domain Signature',
    speed: 'Fast Reaction',
    reminderText: 'Whenever this unit deals combat damage, the opposing lane unit is Exhausted and cannot attack next turn.',
    formalRulesText: 'Rule 505.3 (Fogtouch): Combat resolution trigger applies the Stasis/Exhaust state to the target permanent. The permanent does not ready during the next Dawn Untap Phase.',
    clarifications: [
      'Fogtouch applies even if the dealing unit is destroyed by counter-damage, provided damage was dealt simultaneously.',
      'Units immune to Stasis or with Stabilize ignore the exhaust effect.'
    ],
    counterplayTip: 'Buff your unit with Sanctuary Aegis or use a cleansing relic to remove the Stasis state before your attack phase.',
    relatedCardIds: ['TMP-CS002', 'TMP-CS006', 'TMP-CS010']
  },
  {
    id: 'kw-brace',
    name: 'Brace',
    domain: 'Universal',
    type: 'Tactical Action',
    speed: 'Fast Reaction',
    reminderText: 'Pay 1 Momentum: Reduce incoming Planar Hazard severity against your units by 1 Tier for 1 turn.',
    formalRulesText: 'Rule 602.1 (Brace Action): Universal defensive command available during the Pre-Dawn Horizon check or anytime prior to Hazard resolution. Spending 1 Momentum flags the player board state as "Braced". Tier III hazards become Tier II; Tier II hazards become Tier I; Tier I hazard damage is nullified.',
    clarifications: [
      'Brace costs 1 unspent Momentum from your Kinetic Stash.',
      'Brace protects both your Vanguard and your Champion from environmental rupture.',
      'Brace only mitigates Hazard effects; it does not block opponent combat damage.'
    ],
    counterplayTip: 'Force the opponent to expend their Momentum during combat so they cannot afford to Brace when Catastrophic hazards trigger.',
    relatedCardIds: ['HAZ-RAD-001', 'HAZ-VER-001', 'HAZ-TEM-001']
  },
  {
    id: 'kw-stabilize',
    name: 'Stabilize',
    domain: 'Sanctuary',
    type: 'Domain Signature',
    speed: 'Main Action',
    reminderText: 'Remove all Burn, Poison, and Stasis debuffs from a friendly unit and grant +2 Armor.',
    formalRulesText: 'Rule 501.5 (Stabilize): Continuous cleanse effect clears all non-innate negative status flags from the target slot and applies 2 temporary Shield points that absorb incoming damage before Health.',
    clarifications: [
      'Shield points granted by Stabilize persist until depleted or until the end of the round.',
      'Stabilize can target the Commander or any Vanguard guardian.'
    ],
    counterplayTip: 'Reapply Burn with fast-speed reaction cards after the Sanctuary player expends their action on Stabilize.',
    relatedCardIds: ['SAN-002', 'SAN-006', 'SAN-008']
  },
  {
    id: 'kw-overload',
    name: 'Overload',
    domain: 'Radiance',
    type: 'Domain Signature',
    speed: 'Main Action',
    reminderText: 'Deal double damage this turn, but this unit takes 2 recoil damage at Dusk.',
    formalRulesText: 'Rule 504.2 (Overload): Applies an instantaneous 2x multiplier to the permanent’s Power for the current combat turn. Creates a delayed trigger during the Dusk End Phase dealing 2 pure fire damage to the host permanent.',
    clarifications: [
      'If the unit kills the enemy Commander before Dusk, the game ends and recoil damage is void.',
      'Overload stacks with Weapon equipment power bonuses.'
    ],
    counterplayTip: 'Use Stasis or defensive Shields to stall the Overload attack; the unit will still suffer recoil at Dusk.',
    relatedCardIds: ['RAD-003', 'RAD-005', 'RAD-009']
  },
  {
    id: 'kw-regeneration',
    name: 'Regeneration',
    domain: 'Verdance',
    type: 'Domain Signature',
    speed: 'Triggered',
    reminderText: 'At Dawn, this unit heals health equal to its Regeneration value (default 2).',
    formalRulesText: 'Rule 502.1 (Regeneration): Mandatory trigger at the beginning of the Dawn Phase. Permanent restores HP equal to rating, bounded by its maximum health stat.',
    clarifications: [
      'Cannot raise health above max health unless permanent has "Overgrowth" modifier.',
      'Regeneration does not remove status ailments (e.g. Burn still ticks).'
    ],
    counterplayTip: 'Inflict high burst damage to eliminate the unit in a single turn before Dawn triggers.',
    relatedCardIds: ['VER-001', 'VER-003', 'VER-007']
  },
  {
    id: 'kw-vanguard',
    name: 'Vanguard',
    domain: 'Universal',
    type: 'Evergreen',
    speed: 'Passive',
    reminderText: 'Must be placed in the front frontline lane. Protects backline Shrines and Commander from non-Skyborn attacks.',
    formalRulesText: 'Rule 304.2 (Vanguard Taunt): Opponent melee attackers cannot target the Commander Throne or Backline Shrines while any unit with Vanguard remains in an active Vanguard slot.',
    clarifications: [
      'Exhausted Vanguard units still provide taunt coverage unless stunned or frozen in Stasis.',
      'Skyborn units completely bypass Vanguard restrictions.'
    ],
    counterplayTip: 'Use displacement spells to push Vanguard units into Flank slots or destroy them with targeted removal.',
    relatedCardIds: ['SAN-001', 'RAD-002', 'VER-002']
  }
];

export const JUDGE_CASE_SCENARIOS: JudgeCaseScenario[] = [
  {
    id: 'case-01-rebirth-in-hazard',
    title: 'Rebirth Unit Slain Inside a Molten Fissure Hazard',
    category: 'Hazard Mitigation',
    conflictingMechanics: ['Rebirth (Replacement Effect)', 'Tectonic Slag (Turn-Start Hazard)', 'Soul Vat Trigger'],
    cardExamples: ['Phoenix Ascendant (Rebirth)', 'Molten Fissure Eruption (Tier II Hazard)'],
    scenarioPrompt: 'Player A has a Phoenix Ascendant (HP 1, Rebirth active) in the Vanguard lane. Turn begins with Molten Fissure dealing 1 damage to all frontline units. Does Phoenix trigger Rebirth and immediately die to the hazard?',
    stepByStepFlow: [
      {
        step: 1,
        phase: 'Dawn Phase: Turn-Start Hazard Check',
        action: 'Molten Fissure deals 1 lethal damage to Phoenix Ascendant.',
        rulingLayer: 'Layer 6: State-Based Actions'
      },
      {
        step: 2,
        phase: 'Replacement Effect Interception',
        action: 'Rebirth replaces the Graveyard transition, reviving Phoenix at 1 HP Exhausted.',
        rulingLayer: 'Rule 408.1 (Rebirth Priority)'
      },
      {
        step: 3,
        phase: 'Hazard Damage Batch Evaluation',
        action: 'Turn-start hazard damage is applied simultaneously in a single discrete batch. It does NOT re-evaluate against revived units in the same tick.',
        rulingLayer: 'Rule 601.3 (Simultaneous Hazard Batching)'
      },
      {
        step: 4,
        phase: 'Final State',
        action: 'Phoenix Ascendant survives at 1 HP Exhausted, with Rebirth spent for the round.',
        rulingLayer: 'State-Based Verification'
      }
    ],
    officialRuling: 'Phoenix Ascendant survives! Turn-start environmental hazard damage resolves as a single atomic event. The Rebirth replacement resolves within that event, and the hazard damage does not re-apply to the revived unit during the same Dawn trigger.',
    rulesCitation: 'CRD § 408.1 & Hazard Bible § 601.3'
  },
  {
    id: 'case-02-echo-interrupt-tax',
    title: 'Echo Spell Targeted with Priority Interrupt & Momentum Tax',
    category: 'Reaction Interruption',
    conflictingMechanics: ['Echo Spell Duplication', 'Aether Chain (LIFO Stack)', 'Momentum Tax Interrupt'],
    cardExamples: ['Chain Lightning (Echo)', 'Eye of the Maelstrom (+2 Momentum Tax)'],
    scenarioPrompt: 'Player A casts Chain Lightning (Essence 3). As it resolves, Player A pays 1 Momentum to trigger Echo. Can Player B play Eye of the Maelstrom to increase the Echo cost or counter the duplicate on the Stack?',
    stepByStepFlow: [
      {
        step: 1,
        phase: 'Stack Resolution: Base Spell',
        action: 'Chain Lightning base card resolves and is moved to the Graveyard.',
        rulingLayer: 'Rule 701.2 (Stack Pop)'
      },
      {
        step: 2,
        phase: 'Echo Trigger Placement',
        action: 'Player A spends 1 Momentum to place the Echo copy onto the top of the Aether Chain.',
        rulingLayer: 'Rule 503.2 (Echo Creation)'
      },
      {
        step: 3,
        phase: 'Priority Window Transfer (NAP Window)',
        action: 'Before the Echo copy resolves, priority shifts to Player B (Non-Active Player).',
        rulingLayer: 'Rule 701.4 (APNAP Priority Pass)'
      },
      {
        step: 4,
        phase: 'Reaction Cast on Top of Stack',
        action: 'Player B casts Eye of the Maelstrom on the Stack above the Echo copy, imposing a +2 Momentum surcharge.',
        rulingLayer: 'LIFO Priority Stack'
      }
    ],
    officialRuling: 'Legal and valid! An Echo copy is placed on the Stack as a distinct spell object. The Non-Active Player explicitly receives priority before that copy can resolve, allowing Momentum taxes, Echo redirection, or defensive wards to intervene.',
    rulesCitation: 'CRD § 701.4 & Council Rule GLO-23'
  },
  {
    id: 'case-03-skyborn-taunt-bypass',
    title: 'Skyborn Flyer Attacking Past Vanguard Taunt With Guard Buff',
    category: 'Spatial Bypass',
    conflictingMechanics: ['Skyborn (Elevation Bypass)', 'Vanguard (Frontline Taunt)', 'Aegis Ward'],
    cardExamples: ['Zephyr Sky-Sovereign (Skyborn)', 'Paladin Vanguard (Taunt Wall)'],
    scenarioPrompt: 'Player B has a Paladin Vanguard with active Taunt and Aegis Shield in Lane 1. Player A attacks with Zephyr Sky-Sovereign. Can Zephyr bypass the Paladin to strike the Commander Throne directly?',
    stepByStepFlow: [
      {
        step: 1,
        phase: 'Attack Declaration Phase',
        action: 'Player A declares attack target: Opponent Commander Throne.',
        rulingLayer: 'Rule 302.1'
      },
      {
        step: 2,
        phase: 'Spatial Interception Check',
        action: 'Paladin Vanguard triggers Taunt verification.',
        rulingLayer: 'Rule 304.2 (Vanguard Taunt)'
      },
      {
        step: 3,
        phase: 'Elevation Elevation Priority Rule',
        action: 'Rule 505.1 dictates that Skyborn elevation unconditionally supersedes ground Vanguard taunt walls unless the defender also possesses Reach or Skyborn.',
        rulingLayer: 'Rule 505.1 (Skyborn Precedence)'
      },
      {
        step: 4,
        phase: 'Combat Resolution',
        action: 'Zephyr connects directly with the Commander Throne; Paladin remains untouched.',
        rulingLayer: 'Damage Application'
      }
    ],
    officialRuling: 'Skyborn successfully bypasses the Vanguard! Ground Vanguard units cannot intercept aerial units unless granted Reach or aerial flight. Damage is dealt directly to the Commander.',
    rulesCitation: 'CRD § 505.1 & Spatial Lane Bible § 304'
  },
  {
    id: 'case-04-brace-catastrophic-hazard',
    title: 'Spending 1 Momentum to Brace Against a Tier III Supernova Hazard',
    category: 'Hazard Mitigation',
    conflictingMechanics: ['Brace Tactical Command', 'Tier III Catastrophic Hazard', 'Kinetic Stash Reserve'],
    cardExamples: ['Solar Flare Supernova (Tier III)', 'Universal Brace Command'],
    scenarioPrompt: 'At the start of Round 4, a Tier III Solar Flare Supernova activates (dealing 4 damage and blinding slow units). Player A has 2 unspent Momentum and activates "Brace". How much damage is prevented?',
    stepByStepFlow: [
      {
        step: 1,
        phase: 'Pre-Dawn Horizon Telegraph',
        action: 'Solar Flare Supernova transitions from Horizon to Active Battlefield slot.',
        rulingLayer: 'World Hazard Bible § 602'
      },
      {
        step: 2,
        phase: 'Brace Declaration Window',
        action: 'Player A spends 1 Momentum from Kinetic Stash to declare "Brace".',
        rulingLayer: 'Rule 602.1'
      },
      {
        step: 3,
        phase: 'Severity Downgrade Calculation',
        action: 'Tier III Catastrophic is downgraded to Tier II Major for Player A’s board only. Damage is reduced from 4 to 2, and Blind duration is reduced from 2 turns to 0 turns.',
        rulingLayer: 'Rule 602.4 (Severity Tier Scaling)'
      },
      {
        step: 4,
        phase: 'Asymmetric Resolution',
        action: 'Player B (who did not brace) takes full Tier III damage (4 damage + 2 turn Blind). Player A takes 2 damage and avoids Blind.',
        rulingLayer: 'Board State Isolation'
      }
    ],
    officialRuling: 'Brace is fully effective! Player A reduces the hazard by 1 full severity tier, saving their board 2 damage and completely negating the Blind status penalty.',
    rulesCitation: 'World State & Hazard System Bible v1.0 § 602'
  }
];
