import { LadderStage, KeywordDefinition, RuleSection, JudgeFAQ, SetSkeletonEntry } from '../types';

export const LADDER_STAGES: LadderStage[] = [
  {
    id: 0,
    stageNumber: 0,
    title: 'Core Identity',
    question: 'What exactly is Realm of Nexus TCG?',
    deliverable: 'One-paragraph game concept',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'Realm of Nexus is a tactical, high-stakes construct-and-clash trading card game where Conduit Sovereigns command legendary champions, divine armaments, and shifting elemental domains on a spatial battlefield constantly threatened by dynamic environmental hazards.',
    formalDefinition: 'A 2-player competitive construct TCG utilizing a 40-card Grimoire, a dedicated Commander Nexus Core, spatial lane combat, an accumulating dual-resource economy (Essence + Domain Runes), and dynamic Hazard Cataclysms that force players to navigate both opponent pressure and planar destabilization.',
    rulesText: [
      'Each match represents a clash of planetary conduits harnessing the Shattered Nexus.',
      'Players deploy Champions, equip Relics/Weapons, cast Instant Reactions, and contest Lane Control.',
      'Environmental Hazard Rifts trigger each round, altering battlefield terrain and testing adaptation.'
    ],
    interactiveComponent: 'zone-map',
    keyTakeaways: [
      'Focus on tangible spatial combat rather than abstract math counting.',
      'Planar hazards prevent passive stall play and keep games under 18 minutes.',
      'Deckbuilding rewards deep Domain synergy with hybrid splashing options.'
    ],
    concreteExamples: [
      'Player A controls Ignis the Sunforged (Radiance) and equips Blade of the Obsidian Eclipse to cleave both frontline enemy units before an Ash Storm hazard erupts.'
    ],
    designPitfallsAvoided: [
      'Avoided generic "cast monster, hit face" monotony by incorporating living board hazards.',
      'Prevented first-turn auto-wins through strict mana progression and reactive instant speed chains.'
    ]
  },
  {
    id: 1,
    stageNumber: 1,
    title: 'Player Fantasy',
    question: 'What does a player feel like they are doing?',
    deliverable: 'Player-role definition',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'The player is a Conduit Sovereign—a master architect of cosmic aether who binds ancient mythical champions to their will, weaves planar incantations, and bends hazardous planar rifts to annihilate the opposing Nexus Core.',
    formalDefinition: 'Players act as Conduit Sovereigns commanding a Nexus Core (30 Life). They do not simply play cards; they channel primal Essence to forge weapons, awaken dormant beasts, and direct tactical strikes through the Vanguard and Flank lanes.',
    rulesText: [
      'The Sovereign commands the battlefield from their Command Zone.',
      'Players have complete agency over lane deployment, attachment priority, and timing reactions.'
    ],
    keyTakeaways: [
      'Empowers tactical foresight and situational improvisation.',
      'Every card in hand feels like an authentic artifact, champion, or celestial catastrophe from the ancient codex.'
    ],
    concreteExamples: [
      'Attuning a sacred relic to a champion grants immediate tactical options and changes the unit’s radar profile.'
    ],
    designPitfallsAvoided: [
      'No disconnected "spell slots" that feel purely mechanical; all resource generation is tied to Conduit attunement.'
    ]
  },
  {
    id: 2,
    stageNumber: 2,
    title: 'Design Pillars',
    question: 'What must every part of Nexus preserve?',
    deliverable: '5 immutable principles',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'The foundational laws that govern every card, mechanic, and rule created for Realm of Nexus.',
    formalDefinition: 'The 5 Core Pillars: 1. Spatial Battlefield Clashes; 2. Living World Hazards; 3. Deterministic Combat with Tactical Dice Twists; 4. High-Stakes Priority Chains; 5. Domain Mechanical Purity.',
    rulesText: [
      'Pillar 1 - Spatial Lanes: Positioning in Vanguard or Rearguard dictates targetability and combat order.',
      'Pillar 2 - Living World: The board is an active third participant through Hazard Rifts.',
      'Pillar 3 - Bounded Randomness: Dice checks (D20/D6) provide tactical suspense, not non-games; bad rolls can be mitigated with Fate Tokens.',
      'Pillar 4 - Reactive Agency: Both players have opportunities to respond during priority windows.',
      'Pillar 5 - Domain Identity: Each of the 5 Domains must solve problems through its distinct mechanical philosophy.'
    ],
    keyTakeaways: [
      'If a new mechanic violates any pillar, it is immediately redesigned or discarded.',
      'Pillars ensure long-term balance integrity across multiple expansion sets.'
    ],
    concreteExamples: [
      'A card that says "Instantly win the game if you flip heads" violates Pillar 3 and is strictly banned.'
    ],
    designPitfallsAvoided: [
      'Eliminated uninteractive solitaire combo decks that ignore the opponent’s battlefield presence.'
    ]
  },
  {
    id: 3,
    stageNumber: 3,
    title: 'Match Objective',
    question: 'How do I actually win?',
    deliverable: 'Victory/defeat system',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'A player wins by reducing the opposing Sovereign’s Nexus Core Life from 30 to 0, capturing 2 of 3 Spire Relic Nodes, or forcing an empty-Grimoire draw.',
    formalDefinition: 'Three distinct win conditions: Primary (Nexus Core Destruction - 30 HP), Alternate Tactical (Spire Node Domination - control 2 Spires for 2 consecutive turns), or Resource Attrition (Grimoire Depletion).',
    rulesText: [
      'State-Based Action: When a Nexus Core reaches 0 Life, that player loses immediately.',
      'Spire Control: Spires can be claimed by occupying unblocked lane positions at the end of combat.',
      'Deckout: If a player is required to draw from an empty Grimoire, they suffer 5 Nexus Void Damage per failed draw.'
    ],
    keyTakeaways: [
      'Multiple victory vectors prevent defensive stall-fests.',
      'Node capture provides aggressive mid-range decks a clear tactical clock against heavy control.'
    ],
    concreteExamples: [
      'Player B bypasses the armored frontline with Swiftstrike units to directly damage the opponent’s Spire Node.'
    ],
    designPitfallsAvoided: [
      'Avoided sudden-death decking where 1 card mill causes instant defeat; instead dealt scaling void damage.'
    ]
  },
  {
    id: 4,
    stageNumber: 4,
    title: 'Core Gameplay Loop',
    question: 'What do I repeatedly do during a match?',
    deliverable: 'Match loop',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'The rhythmic turn-by-turn pulse of Nexus: Generate Essence -> Attune Domain -> Deploy & Equip -> Declare Lane Engagements -> Resolve Stack & Hazards -> Pass Priority.',
    formalDefinition: 'A 6-step loop repeated each turn until game termination, featuring active player priority, pass-priority windows, and environmental hazard resolution.',
    rulesText: [
      '1. Channel Phase: Untap all cards, increase Essence capacity by +1 (up to 10), gain full Essence.',
      '2. Attunement Phase: Draw 1 card from Grimoire (Player 1 skips draw on Turn 1).',
      '3. Deployment Phase: Play Champions, Weapons, Armors, and Relics by spending Essence.',
      '4. Clash Phase: Declare Vanguard and Flank attacks; opponent declares Guard intercepts; resolve damage.',
      '5. Hazard Surge Phase: Roll D20 / Trigger active Hazard Rift environmental effect.',
      '6. Reclamation Phase: Discard down to max hand size (7), end turn effects expire.'
    ],
    keyTakeaways: [
      'Clear, predictable phase ordering makes digital and physical tabletop gameplay smooth.',
      'Combat happens once per turn with precise sub-steps for guard declarations.'
    ],
    concreteExamples: [
      'Turn 4: Player has 4 Essence, casts 3-cost Rootbound Treant, equips 1-cost Vine Lash, declares attack into Vanguard.'
    ],
    designPitfallsAvoided: [
      'No ambiguous "main phase 2" confusion—all post-combat actions occur in the unified Reclamation step.'
    ]
  },
  {
    id: 5,
    stageNumber: 5,
    title: 'Turn Structure & Timing',
    question: 'What happens during one turn?',
    deliverable: 'Turn & timing framework',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'The formal phase timeline with explicit priority windows where spells and reactions can be chained.',
    formalDefinition: 'Step 100-500 in the Comprehensive Rules Bible: 1. Awakening Step, 2. Conduit Draw, 3. Primary Deployment Window, 4. Combat Engagement (Declare -> Intercept -> Strike), 5. Hazard Surge, 6. Endstep Reclamation.',
    rulesText: [
      'Active player holds priority at the start of each phase.',
      'When an action is initiated, opponent receives priority to cast Reaction cards or activate Instant abilities.',
      'All pending chain items resolve in Last-In, First-Out (LIFO) order.'
    ],
    interactiveComponent: 'timing-stack',
    keyTakeaways: [
      'Timing windows ensure counter-play is always possible.',
      'Clear distinctions between Normal Speed (Sorcery) and Reaction Speed (Instant).'
    ],
    concreteExamples: [
      'Player A casts Cleave (Normal). Player B reacts with Aegis Shield (Reaction). The shield resolves first, granting +3 defense.'
    ],
    designPitfallsAvoided: [
      'Avoided un-counterable "split second" effects that remove tactical interaction.'
    ]
  },
  {
    id: 6,
    stageNumber: 6,
    title: 'Resource Economy',
    question: 'What pays for cards and actions?',
    deliverable: 'Resource system',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'The Dual-Essence Engine: Players automatically gain +1 Essence Crystal per turn (up to 10 max) and align their Nexus Core with 1 or 2 Domain Runes.',
    formalDefinition: 'No land cards in the deck! Essence is generated automatically each turn from the Conduit Core. Multi-domain cards require specific Domain Attunements chosen during deck construction or unlocked via Relics.',
    rulesText: [
      'Turn 1 = 1 Essence, Turn 2 = 2 Essence, up to Turn 10 = 10 Essence.',
      'Overcharge Mechanic: A player may Overcharge their Nexus Core for +1 temporary Essence at the cost of taking 2 direct Nexus damage.',
      'Unspent Essence does not carry over between turns (Essence resets to max capacity each turn).'
    ],
    interactiveComponent: 'power-calculator',
    keyTakeaways: [
      'Eliminates the "mana screw" and "mana flood" problems of legacy TCGs.',
      'Overcharge provides thrilling comeback potential at a clear health cost.'
    ],
    concreteExamples: [
      'On Turn 5, Player has 5 Essence. They Overcharge for +1 Essence (taking 2 dmg) to drop a 6-cost World Dragon.'
    ],
    designPitfallsAvoided: [
      'Zero non-games caused by missing land drops; 100% of games progress smoothly into tactical midgame.'
    ]
  },
  {
    id: 7,
    stageNumber: 7,
    title: 'Game Zones',
    question: 'Where can cards exist?',
    deliverable: 'Deck, hand, battlefield, discard, etc.',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'The 8 physical zones of Realm of Nexus that govern card placement, movement, and interactions.',
    formalDefinition: '1. Nexus Command Spire (Commander & Life), 2. Grimoire (Deck, 40 cards), 3. Sovereign Hand (Max 7), 4. Vanguard Frontline (2 Combat Slots), 5. Flank Rearguard (2 Support Slots), 6. Hazard Rift Zone (1 Active Environment), 7. Voidwell (Graveyard), 8. Aether Exile (Removed from play).',
    rulesText: [
      'Vanguard Units protect the Rearguard and Nexus Core from direct attacks.',
      'Rearguard units cannot attack directly unless they have Reach or Ranged traits, but can use support abilities.',
      'Hazard cards reside in the central Hazard Rift Zone and affect both players equally.'
    ],
    interactiveComponent: 'zone-map',
    keyTakeaways: [
      'Spatial positioning creates rich tactical board states without needing a grid or miniatures.',
      'Lane protection ensures high-cost combo pieces can be safeguarded behind frontline defenders.'
    ],
    concreteExamples: [
      'Placing Aegis Sentinel in the Vanguard forces the opponent to destroy it before attacking the Arcane Mage in the Rearguard.'
    ],
    designPitfallsAvoided: [
      'No endless board flooding; the 4-unit limit (2 Vanguard, 2 Rearguard) guarantees clean decision-making.'
    ]
  },
  {
    id: 8,
    stageNumber: 8,
    title: 'Card Types',
    question: 'What kinds of cards exist?',
    deliverable: 'Creature/unit, location, hazard, equipment, etc.',
    phase: 'Phase 1: Core Foundation (0-8)',
    summary: 'The 7 distinct card classifications that populate every Realm of Nexus set.',
    formalDefinition: '1. Champions (Unit commanders with Power/Defense), 2. Weapons (Attached to units for attack buffs & action traits), 3. Living Armors (Attached for defense & damage reduction), 4. Artifacts (Persistent relics with tap abilities), 5. Beasts & Minions (Sub-units for swarming), 6. Incantations & Reactions (Spells), 7. Hazard Rifts (Planar environmental modifiers).',
    rulesText: [
      'Champions enter with Summoning Sickness unless they possess Swiftstrike.',
      'Equipped items (Weapons/Armor) go to the Voidwell if the host Champion is destroyed, unless they have Soulbound.',
      'Hazard Rifts remain in play until overwritten by a new Hazard or destroyed by Cleansing spells.'
    ],
    keyTakeaways: [
      'Equipment attaching feels physical and customizable.',
      'Hazards represent the unpredictable world itself.'
    ],
    concreteExamples: [
      'Equipping Cursed Muramasa to Morvath grants +4 Attack and Deathburst: Lifesteal.'
    ],
    designPitfallsAvoided: [
      'Equipment costs are balanced to prevent single "voltron" units from becoming completely indestructible.'
    ]
  },
  {
    id: 9,
    stageNumber: 9,
    title: 'Domain Identities',
    question: 'What makes each Nexus Domain mechanically unique?',
    deliverable: 'Five mechanical identities',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: 'The 5 distinct cosmic domains and their strict mechanical, tactical, and philosophical color pie boundaries.',
    formalDefinition: 'Sanctuary (Defense/Healing/Shields), Radiance (Burn/Overcharge/Aggro), Verdance (Ramp/Growth Counters/Swarm), Arcane (Draw/Reactions/Combos), Abyss (Reanimation/Sacrifice/Curses).',
    rulesText: [
      'Sanctuary: Ward, Retaliation damage, Guardian taunts, Lifegain, Divine rank ascension.',
      'Radiance: Swiftstrike, Direct damage, Overcharge synergy, Armor piercing, Flame damage.',
      'Verdance: +1/+1 Spore counters, Essence ramp, Beast generation, Rootbound regeneration.',
      'Arcane: Counter-spells, Card filtering/Scrying, Spell resonance, Mana discounts, Temporal freeze.',
      'Abyss: Bloodtithe (pay life for power), Deathtouch/Fatal touch, Discard, Graveyard resurrection.'
    ],
    interactiveComponent: 'archetypes',
    keyTakeaways: [
      'Strict color pie prevents homonization of card roles.',
      'Each Domain has clear strengths and defined weaknesses (e.g. Radiance lacks heavy defense; Sanctuary lacks direct burn).'
    ],
    concreteExamples: [
      'Radiance removes units with 6-damage Fireball; Sanctuary removes units by exhausting and pacifying them.'
    ],
    designPitfallsAvoided: [
      'Never give Arcane hard creature buffs or give Verdance direct damage spells without beast requirements.'
    ]
  },
  {
    id: 10,
    stageNumber: 10,
    title: 'Combat System',
    question: 'How do units fight?',
    deliverable: 'Attack, defense, damage, targeting',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: 'Simultaneous and tactical lane combat with Vanguard interception, damage counters, and Armor reduction.',
    formalDefinition: 'The 4 Combat Sub-Steps: 1. Declare Attackers (select attacking lane units), 2. Declare Interceptors (defender may assign Vanguard units to block), 3. Reaction Window (play fast spells), 4. Damage Resolution (simultaneous power exchange; excess power inflicts Trample/Cleave if keyworded).',
    rulesText: [
      'Damage remains on units until the end of the turn (Reclamation phase).',
      'If unit Defense reaches 0, it is destroyed and sent to the Voidwell.',
      'Unblocked Vanguard attackers inflict direct damage to the defending Sovereign’s Nexus Core.'
    ],
    keyTakeaways: [
      'Simple math (Power vs Defense) supplemented by tactical keywords.',
      'Vanguard positioning makes every block a deliberate strategic sacrifice or triumph.'
    ],
    concreteExamples: [
      'A 5-Power unit attacks a 3-Power / 4-Defense unit. Both trade damage: the defender dies (4 dmg taken), while attacker survives with 2 HP remaining (3 dmg taken).'
    ],
    designPitfallsAvoided: [
      'No complex arithmetic equations during live matches—damage is tracked with crisp numerical counters.'
    ]
  },
  {
    id: 11,
    stageNumber: 11,
    title: 'Hazard System',
    question: 'How does the world itself affect matches?',
    deliverable: 'Hazard rules & planar engine',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: 'Dynamic environmental events that trigger each round during the Hazard Surge phase, testing both players’ adaptation to volcanic eruptions, void storms, or verdant overgrowth.',
    formalDefinition: 'At the start of Turn 4 and every 2 turns thereafter, the current Hazard Rift activates or mutates. Players can mitigate hazard damage using Domain skills or manipulate the Hazard deck with Arcane spells.',
    rulesText: [
      'Hazard Types: Volcanic Cataclysm (1 fire dmg to all units), Void Miasma (lose 1 card or 2 life), Overgrowth Surge (all units get +1/+1), Astral Siphon (all spells cost +1 Essence).',
      'Hazard dice checks: Rolling a D20 determines whether the hazard deals mild, standard, or catastrophic intensity.'
    ],
    interactiveComponent: 'hazard-dice',
    keyTakeaways: [
      'Transforms the board from a static table into a living, dangerous fantasy world.',
      'Prevents degenerate "sit back and do nothing" stall strategies.'
    ],
    concreteExamples: [
      'Ash Storm erupts on Turn 5: all units with less than 3 Defense take 2 damage unless sheltered behind an Armor card.'
    ],
    designPitfallsAvoided: [
      'Hazards affect both players symmetrically, ensuring fair competitive balance rather than one-sided griefing.'
    ]
  },
  {
    id: 12,
    stageNumber: 12,
    title: 'Dice & Probability Framework',
    question: 'What uncertainty does the game contain?',
    deliverable: 'Dice and probability framework',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: 'Bounded tactical randomness using D20 skill checks and D6 damage dice modifiers, with Fate Token mitigation.',
    formalDefinition: 'Cards with the [Surge] or [Critical] keyword roll a D20. Results: 1 = Critical Fumble (no effect), 2-14 = Normal Effect, 15-19 = Empowered Effect (+50%), 20 = Divine Surge (Maximum output + draw 1 card). Each player receives 2 Fate Tokens per match to reroll any single die.',
    rulesText: [
      'Skill Check DC: DC 10 is standard, DC 15 is advanced, DC 18 is legendary.',
      'Damage dice notation (e.g. 2d6 Fire) adds organic variance to high-tier artifact abilities.',
      'Fate Tokens guarantee that pure bad luck can be strategically overridden at pivotal moments.'
    ],
    interactiveComponent: 'hazard-dice',
    keyTakeaways: [
      'Brings the excitement and narrative drama of tabletop RPGs into a fast-paced TCG.',
      'Skillful players optimize probability distributions rather than relying on coin-flips.'
    ],
    concreteExamples: [
      'Ignis casts Sunburst: deals base 4 damage. Player rolls D20 (gets 17): activates Empowered Surge dealing 6 total damage.'
    ],
    designPitfallsAvoided: [
      'No "50% chance to lose your turn" mechanics; all baseline effects function even on low rolls.'
    ]
  },
  {
    id: 13,
    stageNumber: 13,
    title: 'Keyword Encyclopedia',
    question: 'What repeated mechanics get standardized?',
    deliverable: 'Keyword encyclopedia',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: '16 core standardized keywords that compress complex rules into elegant, iconic card mechanics.',
    formalDefinition: 'Standardized vocabulary for triggers, combat states, and persistent effects across all 5 Domains.',
    rulesText: [
      'Attune [X]: Enters play with X attunement counters; unlocks tiers.',
      'Ward: Immune to the next instance of spell damage or enemy targeting.',
      'Swiftstrike: Can attack immediately on the turn it enters play.',
      'Overcharge [X]: Pay X Life to gain X temporary Essence this turn.',
      'Rootbound: Regenerates 2 Defense at the start of each friendly turn.',
      'Deathburst: Triggers a powerful effect when this unit dies and goes to Voidwell.',
      'Bloodtithe [X]: Pay X Life as an additional casting or activation cost.',
      'Scry [X]: Look at the top X cards of your Grimoire, rearrange or put on bottom.',
      'Cleave: Excess combat damage is dealt to adjacent units in the same lane.',
      'Taunt: Enemy units in the opposing lane must target this unit if able.'
    ],
    interactiveComponent: 'keywords',
    keyTakeaways: [
      'Keywords dramatically reduce text box clutter on physical and digital cards.',
      'Allows players to quickly evaluate new cards at a glance.'
    ],
    concreteExamples: [
      'A 3-cost 4/2 with Swiftstrike and Deathburst: Deal 2 damage to opponent Nexus Core.'
    ],
    designPitfallsAvoided: [
      'Strict keyword budget prevents cards from having more than 2 distinct complex keywords.'
    ]
  },
  {
    id: 14,
    stageNumber: 14,
    title: 'Deck Construction',
    question: 'What may players put in decks?',
    deliverable: 'Deckbuilding rules',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: 'Rules for crafting a tournament-legal 40-card Grimoire led by 1 Champion Commander.',
    formalDefinition: '1 Champion Commander card (begins in Command Spire), exactly 40 Main Deck cards, max 3 copies of any card by name, maximum 2 Domains represented (unless running a Neutral Sovereign).',
    rulesText: [
      'Deck Size: Exactly 40 cards (60 in Commander Draft format).',
      'Copy Limits: Maximum 3 copies of Common/Uncommon/Rare; exactly 1 copy of Mythic or Divine Boundless cards.',
      'Domain Alignment: Your deck may contain cards matching your Champion’s primary and secondary Domain, plus Neutral cards.'
    ],
    keyTakeaways: [
      '40-card deck size maximizes strategic consistency and reduces variance.',
      'Singleton restriction on Mythics preserves fair competitive access.'
    ],
    concreteExamples: [
      'A Radiance/Arcane deck runs 18 Radiance cards, 16 Arcane cards, and 6 Neutral relics with Ignis as Commander.'
    ],
    designPitfallsAvoided: [
      'Avoided unrestricted 5-color "good stuff" piles by enforcing strict 2-Domain limits.'
    ]
  },
  {
    id: 15,
    stageNumber: 15,
    title: 'Strategic Archetypes',
    question: 'What strategies should naturally emerge?',
    deliverable: 'Aggro/control/ramp/domain hybrids',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: 'The 15 foundational deck archetypes spanning 5 Pure Mono-Domain strategies and 10 Dual-Domain Hybrid synergies.',
    formalDefinition: 'Mono Archetypes: Sanctuary Control, Radiance Burn Aggro, Verdance Beast Ramp, Arcane Spellsling Combo, Abyss Reanimator. Hybrid Archetypes: Radiance/Sanctuary Crusader Midrange, Verdance/Abyss Rot & Regrowth, Arcane/Radiance Spellfire Storm, Sanctuary/Verdance Ironwood Bastion, Abyss/Arcane Void Siphon, etc.',
    rulesText: [
      'Each archetype is anchored by specific signpost Uncommon and Rare payoff cards.',
      'Archetype balance operates in a rock-paper-scissors dynamic: Aggro beats Ramp, Ramp beats Control, Control beats Aggro, Midrange adapts to both.'
    ],
    interactiveComponent: 'archetypes',
    keyTakeaways: [
      'Guarantees diverse tournament metagames with multiple viable tier-1 strategies.',
      'Hybrid decks offer creative deckbuilding depth without invalidating mono-domain purity.'
    ],
    concreteExamples: [
      'Verdance/Abyss builds sacrifice cheap beast tokens with Bloodtithe to trigger death triggers and cheat high-cost demons into play.'
    ],
    designPitfallsAvoided: [
      'Prevented any single archetype from exceeding a 54% winrate across internal balance testing.'
    ]
  },
  {
    id: 16,
    stageNumber: 16,
    title: 'Card Anatomy & Visual Blueprint',
    question: 'What information appears on every card?',
    deliverable: 'Card template & anatomical breakdown',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: 'The standard visual layout and anatomical components found on every Realm of Nexus card frame.',
    formalDefinition: '1. Top Header: Essence Cost Crystal, Card Name, Domain Sigil, Divine Stars; 2. Visual Frame: Holographic Art Window with Realm Accent Border; 3. Type Line: Card Type, Subtype, Rarity Gem; 4. Tactical Ability Box: Embossed Ability Icons, Rules Text, Damage Dice, Charges; 5. Stat Badges: Power (Sword) & Defense (Shield); 6. Footer: Flavor Quote, Codex Lore, Collector Number & Artist Credit.',
    rulesText: [
      'All text must maintain strict visual hierarchy with legible fonts (Cinzel Display + Garamond Body).',
      'Icons on abilities must match standardized keywords (Sword = Action, Shield = Reaction, Flame = Passive).',
      'Rarity Gem color: Common (Silver), Uncommon (Green), Rare (Blue), Mythic (Purple), Divine (Gold).'
    ],
    keyTakeaways: [
      'Ensures instant visual parsing during competitive high-speed play.',
      'High-fantasy parchment and gilded aesthetic reinforces the ancient codex fantasy.'
    ],
    concreteExamples: [
      'Blade of the Obsidian Eclipse displays 6 Essence cost, Radiance emblem, 8 Power / 5 Defense, and 2 tactical ability blocks.'
    ],
    designPitfallsAvoided: [
      'Zero microscopic font sizes—every card text fits cleanly within the designated text container.'
    ]
  },
  {
    id: 17,
    stageNumber: 17,
    title: 'Timing, Priority & Reaction Chains',
    question: 'When may players respond?',
    deliverable: 'The Nexus Chain / Stack system',
    phase: 'Phase 2: Mechanics & Engine (9-17)',
    summary: 'The comprehensive priority protocol and Last-In, First-Out (LIFO) resolution chain that governs all instant-speed interactions.',
    formalDefinition: 'When a player plays a card or activates an ability, it enters the Nexus Chain. Priority passes to the opponent. If opponent plays a Reaction, it sits atop the chain. When both players pass consecutively, the topmost effect resolves.',
    rulesText: [
      'Normal Speed: Can only be cast by active player during their Main Deployment Phase when chain is empty.',
      'Reaction Speed: Can be cast in response to any action or during the Combat Reaction window.',
      'State-Based Actions (SBAs) are checked immediately before any player receives priority and resolve automatically without using the chain.'
    ],
    interactiveComponent: 'timing-stack',
    keyTakeaways: [
      'Eliminates all timing disputes through unambiguous LIFO rules.',
      'Reaction speed windows make combat bluffing and counter-play deeply engaging.'
    ],
    concreteExamples: [
      'Chain: 1. Player A casts Fireball -> 2. Player B casts Counterspell -> 3. Player A casts Spell Divert. Spell Divert resolves first, protecting Fireball.'
    ],
    designPitfallsAvoided: [
      'No "speed 3 / speed 2 / speed 1" ambiguity—strictly binary Normal vs Reaction speed.'
    ]
  },
  {
    id: 18,
    stageNumber: 18,
    title: 'First Set Architecture: Genesis Convergence',
    question: 'How many cards of each kind do we create?',
    deliverable: '150-card set skeleton',
    phase: 'Phase 3: Set Design & Math (18-20)',
    summary: 'The structural skeleton of Set 1 (150 cards total): 24 cards per Domain (5 Domains = 120 cards) + 30 Neutral/Multidomain cards.',
    formalDefinition: 'Rarity Breakdown: 60 Commons, 45 Uncommons, 30 Rares, 12 Mythics, 3 Divine Boundless Chase Foils. Type Breakdown: 45 Champions, 30 Weapons/Armors, 25 Relic Artifacts, 35 Incantations/Reactions, 15 Hazard Rifts.',
    rulesText: [
      'Each Domain receives an equal balance of early-game (1-2 cost), mid-game (3-4 cost), and top-end finishers (5-7+ cost).',
      'Mana curve targets: 25% 1-2 cost, 45% 3-4 cost, 25% 5-6 cost, 5% 7+ cost.'
    ],
    interactiveComponent: 'set-skeleton',
    keyTakeaways: [
      'Balanced skeleton ensures limited draft environments and constructed formats thrive simultaneously.',
      'Guarantees no single Domain is starved of removal or defensive options.'
    ],
    concreteExamples: [
      'Radiance Set 1 includes: 6 Commons (cheap aggro/burn), 5 Uncommons (synergy payoffs), 4 Rares (high-impact champions/weapons), 2 Mythics (World Dragons).'
    ],
    designPitfallsAvoided: [
      'Avoided "useless pack filler" cards by ensuring every Common has a defined role in at least one archetype.'
    ]
  },
  {
    id: 19,
    stageNumber: 19,
    title: 'Rarity & Booster Distribution',
    question: 'How are cards distributed?',
    deliverable: 'Common–premium structure & pack math',
    phase: 'Phase 3: Set Design & Math (18-20)',
    summary: 'The mathematical distribution of cards across physical and digital 10-card booster packs.',
    formalDefinition: 'Standard 10-Card Booster Pack: 6 Commons, 3 Uncommons, 1 Rare or higher (1:4 packs contains a Mythic, 1:24 packs contains a Divine Boundless Foil). Every pack contains at least 1 Foil card.',
    rulesText: [
      'Common Slot: 60% probability of hitting desired common within 3 packs.',
      'Rare Slot: Pity system ensures a Mythic within every 5 packs in digital environments.',
      'Divine Boundless: Alternate full-art holographic treatment with numbered gold stamp.'
    ],
    keyTakeaways: [
      'Generous drop rates make the game affordable and rewarding to collect.',
      'Premium foil treatments create strong collector appeal without pay-to-win barriers.'
    ],
    concreteExamples: [
      'Opening a "Fire Mountain" pack guarantees at least 1 Radiance Rare and 3 thematic uncommons.'
    ],
    designPitfallsAvoided: [
      'No "four-of mandatory mythic" staples that make competitive decks cost thousands of dollars.'
    ]
  },
  {
    id: 20,
    stageNumber: 20,
    title: 'Balance Mathematics & Power Budget',
    question: 'What should stats and effects cost?',
    deliverable: 'Power-budget mathematical system',
    phase: 'Phase 3: Set Design & Math (18-20)',
    summary: 'The exact mathematical formula used by lead designers to balance creature stats, removal spells, and complex abilities.',
    formalDefinition: 'The Baseline Formula: Stat Points = (Essence Cost × 2) + 2. Keyword Point Deductions: Swiftstrike (-2 pts), Ward (-1.5 pts), Rootbound (-1.5 pts), Deathburst (-2 pts), Draw 1 Card (-2.5 pts), Hard Removal (-4 pts).',
    rulesText: [
      'Example 1: A 2-cost vanilla unit receives (2 × 2) + 2 = 6 Stat Points (e.g. 3 Power / 3 Defense).',
      'Example 2: A 3-cost unit with Swiftstrike gets (3 × 2) + 2 - 2 = 6 Stat Points (e.g. 4 Power / 2 Defense).',
      'Spell Formula: Deal X direct damage costs (X / 1.5) rounded up (e.g. 3 damage = 2 Essence; 6 damage = 4 Essence).'
    ],
    interactiveComponent: 'power-calculator',
    keyTakeaways: [
      'Guarantees statistical equity across all cards regardless of Domain.',
      'Provides a rigorous, repeatable framework for fan and official card creation.'
    ],
    concreteExamples: [
      'A 5-cost Champion with Ward: (5 × 2) + 2 - 1.5 = 10.5 stat points -> rounded to 5 Power / 5 Defense + Ward.'
    ],
    designPitfallsAvoided: [
      'Eliminated subjective "eyeball balancing" that leads to runaway power creep.'
    ]
  },
  {
    id: 21,
    stageNumber: 21,
    title: 'Lore Integration & Mechanical Mapping',
    question: 'Why does every mechanic exist in Nexus lore?',
    deliverable: 'Mechanical-lore mapping',
    phase: 'Phase 4: Lore & Worldbuilding (21-24)',
    summary: 'The cosmic narrative of the Shattered Nexus and how each cosmic catastrophe translates directly into game mechanics.',
    formalDefinition: 'Centuries ago, the Great Spire of Aetheria collapsed, scattering the 5 elemental realms into an unstable overlapping dimensional rift known as the Nexus. Conduits bind these fragments to prevent cosmic unraveling.',
    rulesText: [
      'Essence represents raw aether bleeding from the ruptured Spire.',
      'Hazards represent the shifting planetary plates crashing together.',
      'Attunement represents the psychic concentration required to stabilize ancient relics in mortal hands.'
    ],
    keyTakeaways: [
      'Every mechanic has a direct, compelling narrative justification.',
      'Enhances player immersion by making game rules feel like natural laws of the fantasy universe.'
    ],
    concreteExamples: [
      'Why does Overcharge deal damage to your Sovereign? Because channeling unrefined aether burns your soul conduit.'
    ],
    designPitfallsAvoided: [
      'Avoided abstract rules that have no thematic connection to the story world.'
    ]
  },
  {
    id: 22,
    stageNumber: 22,
    title: 'Characters & Factions',
    question: 'Who represents these mechanics in the world?',
    deliverable: 'Heroes, armies, villains, creatures',
    phase: 'Phase 4: Lore & Worldbuilding (21-24)',
    summary: 'The iconic legendary champions, sovereign commanders, and monstrous beasts that lead each Domain faction.',
    formalDefinition: 'Sanctuary: The Seraphic Order of Sol-Aegis (led by Seraphiel). Radiance: The Pyreforge Warlords of Sol-Thar (led by Ignis). Verdance: The Deep Bough Enclave (led by Ysildra). Arcane: The Astral Siphoners of Vael-En (led by Archmage Vaelen). Abyss: The Baator Covenant (led by Morvath Voidwalker).',
    rulesText: [
      'Each faction has distinct visual iconography, armor motifs, and philosophical mottos.',
      'Commander cards represent the highest ranking leaders and provide unique passive Sovereign auras.'
    ],
    keyTakeaways: [
      'Memorable character design creates strong emotional attachment for players.',
      'Factions provide rich narrative conflict for future lore expansions and novels.'
    ],
    concreteExamples: [
      'Ignis the Sunforged provides passive: "Whenever you equip a Radiance weapon, deal 1 damage to all enemy units."'
    ],
    designPitfallsAvoided: [
      'No generic "Unnamed Soldier" champions; every high-tier unit possesses a distinct identity and title.'
    ]
  },
  {
    id: 23,
    stageNumber: 23,
    title: 'Locations & World Hazards',
    question: 'How does Nexus itself enter gameplay?',
    deliverable: 'Locations + hazard codex',
    phase: 'Phase 4: Lore & Worldbuilding (21-24)',
    summary: 'Planar locations and cataclysmic world rifts that warp the battlefield terrain during matches.',
    formalDefinition: 'Key World Locations: The Spire of Convergence (Neutral), The Sunken Caldera (Radiance), The Eldervale Canopy (Verdance), The Astral Observatory (Arcane), The Baator Trench (Abyss). World Hazards: Volcanic Eruption, Ash Storm, Astral Nova, Void Collapse, Briar Bloom.',
    rulesText: [
      'Location cards are played into the Spire slot and grant ongoing tactical buffs to your lane units.',
      'Hazard Rifts are neutral environment cards that alter the global rules of the match while active.'
    ],
    keyTakeaways: [
      'Brings the world itself into tactical gameplay.',
      'Provides strategic advantages to players who tailor their decks to specific environmental conditions.'
    ],
    concreteExamples: [
      'Sunken Caldera: "All Fire and Radiance spells deal +1 damage; units without Fire immunity take 1 damage upon entering."'
    ],
    designPitfallsAvoided: [
      'Locations cannot be made indestructible, ensuring opponents always have counter-play.'
    ]
  },
  {
    id: 24,
    stageNumber: 24,
    title: 'Art Language & Visual Bible',
    question: 'How should cards visually communicate Domain identity?',
    deliverable: 'TCG visual bible & style guide',
    phase: 'Phase 4: Lore & Worldbuilding (21-24)',
    summary: 'The aesthetic style guide defining palette rules, framing materials, lighting physics, and foil treatments across all Domains.',
    formalDefinition: 'Sanctuary: Alabaster marble, polished gold filigree, warm dawn light. Radiance: Obsidian stone, magma fissures, incandescent crimson flares. Verdance: Gnarled ironwood, emerald bioluminescence, mossy textures. Arcane: Midnight blue cosmic dust, floating celestial rings, sapphire starlight. Abyss: Void purple haze, jagged bone spikes, necrotic smoke.',
    rulesText: [
      'Silhouette Rule: Units must have high-contrast silhouettes recognizable at a distance of 3 feet on a playmat.',
      'Material Authenticity: Card frames mimic physical parchment, heavy stone, and forged metals matching their Domain.',
      'Foil Physics: Premium versions utilize selective cold-foil and rainbow prismatic diffraction layers.'
    ],
    keyTakeaways: [
      'Creates an instantly recognizable visual signature distinct from other card games on the market.',
      'Maintains consistent art direction across multiple contributing fantasy illustrators.'
    ],
    concreteExamples: [
      'All Radiance cards feature warm directional rim-lighting to emphasize volcanic heat.'
    ],
    designPitfallsAvoided: [
      'Strictly bans muddy dark colors that blend into the card frame or look washed out in print.'
    ]
  },
  {
    id: 25,
    stageNumber: 25,
    title: 'Starter Decks & Learning Path',
    question: 'How do we teach each Domain to new players?',
    deliverable: 'Five introductory 40-card decks',
    phase: 'Phase 5: Playtest, Rules & Horizon (25-30)',
    summary: 'Pre-constructed, balanced introductory decks designed to teach core mechanics while offering exciting tactical gameplay out of the box.',
    formalDefinition: '1. Radiance: "Fire Mountain & Dragon Wrath" (Aggro/Burn), 2. Sanctuary: "Aegis of the Celestials" (Defense/Control), 3. Verdance: "Eldervale Wilds & Ancient Behemoths" (Ramp/Growth), 4. Arcane: "Astral Siphon & Cosmic Fate" (Combos/Draw), 5. Abyss: "Baator Void & Cursed Covenant" (Reanimation/Sacrifice).',
    rulesText: [
      'Each starter deck contains 1 Foil Commander, 40 balanced cards, 2 Fate Tokens, and an illustrated quick-start guide.',
      'Starter decks are balanced to have a 50% winrate against each other in beginner playtests.'
    ],
    interactiveComponent: 'starter-decks',
    keyTakeaways: [
      'Low complexity floor with high tactical ceiling.',
      'Gives every new player an immediate path to competitive mastery in their preferred playstyle.'
    ],
    concreteExamples: [
      'The Sanctuary deck teaches players how to use Vanguard Taunts and Ward shields to outlast aggressive decks.'
    ],
    designPitfallsAvoided: [
      'No complex combo loops or paragraph-long text boxes in starter decks.'
    ]
  },
  {
    id: 26,
    stageNumber: 26,
    title: 'Playtest Prototype & Simulation Sandbox',
    question: 'Does the game actually work in practice?',
    deliverable: 'Playable digital & print-and-play sandbox',
    phase: 'Phase 5: Playtest, Rules & Horizon (25-30)',
    summary: 'The living, interactive game engine where cards, combat, dice rolls, and hazard triggers are playtested in real-time.',
    formalDefinition: 'A fully functional digital prototype supporting lane combat, AI opponent simulation, hand management, live damage calculation, hazard resolution, and combat logging.',
    rulesText: [
      'Real-time combat resolution verifies that rules interactions function seamlessly without ambiguity.',
      'Digital playtest telemetry tracks average match duration, turn count, and card play rates.'
    ],
    keyTakeaways: [
      'Enables rapid iteration: balance changes can be implemented and tested in minutes.',
      'Provides an immediate playground for community testing and tournament prototyping.'
    ],
    concreteExamples: [
      'Testing the interaction between Overcharge and Bloodtithe in the live Arena to ensure life totals remain viable.'
    ],
    designPitfallsAvoided: [
      'Never finalize cards on paper alone—always validate through live digital simulation.'
    ]
  },
  {
    id: 27,
    stageNumber: 27,
    title: 'Balance Loop & Telemetry Metrics',
    question: 'What breaks when humans play it?',
    deliverable: 'Test -> analyze -> patch revision loop',
    phase: 'Phase 5: Playtest, Rules & Horizon (25-30)',
    summary: 'The formal balancing methodology and metrics used to identify overpowered cards, unfun play patterns, and degenerate metas.',
    formalDefinition: 'Balance Metrics: 1. Winrate Band (Target: 48-52% for all tier-1 archetypes), 2. Turn 1 Advantage (Target: First-player winrate < 51.5%), 3. Mana Efficiency (Average Essence spent per turn > 85%), 4. Match Length (Target: 12-16 minutes / 7-9 turns).',
    rulesText: [
      'If a card exceeds a 56% winrate over 1,000 matches, it is subjected to the Patch Review Council.',
      'Emergency Errata protocol: adjust Essence cost +1 or reduce Power/Defense by 1 rather than banning.'
    ],
    keyTakeaways: [
      'Data-driven balance avoids emotional overreactions to vocal community complaints.',
      'Regular balance updates keep the competitive metagame dynamic and engaging.'
    ],
    concreteExamples: [
      'Patch 1.02: Increased "Blade of the Obsidian Eclipse" cost from 5 to 6 Essence to prevent early-game lane sweeps.'
    ],
    designPitfallsAvoided: [
      'Avoided "nerfing cards into unplayability"—adjustments focus on precision cost or stat tweaks.'
    ]
  },
  {
    id: 28,
    stageNumber: 28,
    title: 'Comprehensive Rules Bible',
    question: 'What is officially legal in competitive play?',
    deliverable: 'Formal tournament rules bible (Sections 100-900)',
    phase: 'Phase 5: Playtest, Rules & Horizon (25-30)',
    summary: 'The exhaustive, codified legal document that defines every game term, timing step, and state-based action with mathematical precision.',
    formalDefinition: 'Sections: 100 General Principles, 200 Card Anatomy, 300 Card Types, 400 Game Zones, 500 Turn Structure, 600 Spells & Priority Stack, 700 Combat Resolution, 800 Hazards & Dice Checks, 900 State-Based Actions & Tournament Procedures.',
    rulesText: [
      'Rule 101.1: If a card’s text directly contradicts a rule in the Rules Bible, the card’s text takes precedence.',
      'Rule 602.3: When multiple triggered abilities trigger simultaneously, the active player’s triggers enter the chain first in chosen order, followed by the non-active player’s triggers.',
      'Rule 904.2: A unit with 0 or less Defense is sent to the Voidwell as a State-Based Action before any player receives priority.'
    ],
    interactiveComponent: 'rules-bible',
    keyTakeaways: [
      'Provides the definitive legal standard for high-stakes premier tournament play.',
      'Ensures every possible edge-case interaction has an exact, indisputable resolution.'
    ],
    concreteExamples: [
      'Resolving simultaneous Deathburst triggers between two opposing dying champions via Rule 602.3.'
    ],
    designPitfallsAvoided: [
      'No reliance on "developer tweets" or vague creator intentions—everything is codified in the Bible.'
    ]
  },
  {
    id: 29,
    stageNumber: 29,
    title: 'Judge Oracle & Edge-Case FAQ',
    question: 'What happens in complex edge cases?',
    deliverable: 'Tournament judge rulings & layer system',
    phase: 'Phase 5: Playtest, Rules & Horizon (25-30)',
    summary: 'The official Judge Oracle answering intricate rule collisions, continuous effect layers, replacement effects, and tournament floor disputes.',
    formalDefinition: 'The 6 Continuous Effect Layers: Layer 1 (Copy effects), Layer 2 (Control changes), Layer 3 (Text modifications), Layer 4 (Type & Subtype changes), Layer 5 (Color & Domain changes), Layer 6 (Ability addition/removal), Layer 7 (Power & Defense modifications).',
    rulesText: [
      'Replacement Effects: If multiple replacement effects would modify a single event, the affected card’s owner chooses the order of application.',
      'Target Legality: If all targets for a spell become illegal before resolution, the spell fizzles and goes to the Voidwell.'
    ],
    interactiveComponent: 'rules-bible',
    keyTakeaways: [
      'Empowers certified tournament judges to make fast, authoritative rulings on stream.',
      'The 7-Layer system guarantees complex buff/debuff interactions resolve deterministically.'
    ],
    concreteExamples: [
      'If an armor sets Defense to 10 (Layer 7b), and a curse reduces Defense by 3 (Layer 7c), the final Defense is exactly 7 regardless of timestamp order.'
    ],
    designPitfallsAvoided: [
      'Eliminated ambiguity around continuous stat-altering effects.'
    ]
  },
  {
    id: 30,
    stageNumber: 30,
    title: 'Long-Term Expansion Framework',
    question: 'How does Nexus grow without destroying itself?',
    deliverable: '4-set roadmap & power-creep guardrails',
    phase: 'Phase 5: Playtest, Rules & Horizon (25-30)',
    summary: 'The sustainable 3-year product roadmap, mechanics lifecycle, complexity limits, and format rotation strategy.',
    formalDefinition: 'The 4-Set Cycle: Set 1 "Genesis Convergence" (Core Domains), Set 2 "Tides of the Void" (Abyss/Arcane Focus + Rift Hazards), Set 3 "Ironwood Awakening" (Verdance/Sanctuary Focus + Living Fortresses), Set 4 "Solar Apocalypse" (Radiance/Volcano Focus + Cosmic Endtimes). Standard format rotates every 2 years (8 sets max).',
    rulesText: [
      'Complexity Budget: Each new set introduces maximum 2 new keywords to prevent cognitive overload.',
      'Power Ceiling: Stat-to-Cost baseline ratios are strictly locked at (Cost × 2) + 2 and cannot be increased in future sets.',
      'Format Philosophy: Standard (Rotating competitive), Eternal Nexus (All sets legal), Spire Draft (Limited).'
    ],
    keyTakeaways: [
      'Guarantees the game remains balanced, fresh, and accessible for decades.',
      'Protects player collections while ensuring new sets offer compelling design space.'
    ],
    concreteExamples: [
      'Set 2 introduces the "Voidwarp" keyword, utilizing the existing Layer 4 transformation framework without altering core combat rules.'
    ],
    designPitfallsAvoided: [
      'Avoided runaway power creep that ruins classic card games after 5 years.'
    ]
  }
];

export const KEYWORDS_DATABASE: KeywordDefinition[] = [
  {
    name: 'Attune',
    domain: 'Universal',
    type: 'Trigger',
    reminderText: 'Enters play with X attunement counters. Spend counters to trigger awakened abilities.',
    rulesExplanation: 'Attunement counters represent metaphysical synchronization between player and relic. When attuned, secondary traits activate.',
    sampleCard: 'Cursed Muramasa',
    pointCost: 1.0
  },
  {
    name: 'Ward',
    domain: 'Sanctuary',
    type: 'State',
    reminderText: 'Prevents the next instance of spell damage or enemy targeting effect, then breaks.',
    rulesExplanation: 'A divine barrier. Once broken by any hostile spell or targeted ability, the ward counter is removed.',
    sampleCard: 'Seraphiel, the Living Bastion',
    pointCost: 1.5
  },
  {
    name: 'Swiftstrike',
    domain: 'Radiance',
    type: 'State',
    reminderText: 'This unit can attack immediately on the turn it enters play, ignoring summoning delay.',
    rulesExplanation: 'Units with Swiftstrike bypass the standard turn-delay constraint and can declare attacks during the active combat phase.',
    sampleCard: 'Ignis, the Sunforged',
    pointCost: 2.0
  },
  {
    name: 'Overcharge',
    domain: 'Radiance',
    type: 'Action',
    reminderText: 'Pay X Life to gain X temporary Essence this turn.',
    rulesExplanation: 'Overcharge takes effect at reaction speed. Damage taken cannot be prevented or redirected.',
    sampleCard: 'Volcanic Forge Dragon',
    pointCost: 1.5
  },
  {
    name: 'Rootbound',
    domain: 'Verdance',
    type: 'Trigger',
    reminderText: 'At the start of your turn, this unit heals 2 Defense. If undamaged, gain +1 Defense max.',
    rulesExplanation: 'Regenerative vitality drawn directly from the planetary bedrock.',
    sampleCard: 'Ancient Ironwood Colossus',
    pointCost: 1.5
  },
  {
    name: 'Deathburst',
    domain: 'Abyss',
    type: 'Trigger',
    reminderText: 'Triggers a powerful effect when this unit dies and enters the Voidwell.',
    rulesExplanation: 'Triggers in step 600 upon leaving the battlefield to the graveyard. Does not trigger if exiled.',
    sampleCard: 'Ouroboros Void Hydra',
    pointCost: 2.0
  },
  {
    name: 'Bloodtithe',
    domain: 'Abyss',
    type: 'Action',
    reminderText: 'Pay X Life as an additional cost to cast this card or activate its ability.',
    rulesExplanation: 'Sacrificial aether pact. If a player does not have sufficient life, the cost cannot be paid.',
    sampleCard: 'Morvath, the Soul Harvester',
    pointCost: 1.0
  },
  {
    name: 'Scry',
    domain: 'Arcane',
    type: 'Action',
    reminderText: 'Look at the top X cards of your Grimoire. Put any number on top or bottom in any order.',
    rulesExplanation: 'Temporal foresight. Cards placed on bottom are placed in any order chosen by the player.',
    sampleCard: 'Chronos, Weaver of Timelines',
    pointCost: 1.0
  },
  {
    name: 'Cleave',
    domain: 'Universal',
    type: 'Static',
    reminderText: 'Excess combat damage dealt to a blocking unit is dealt to adjacent units in the lane.',
    rulesExplanation: 'Cleave damage radiates to adjacent units in the defender’s vanguard or flank.',
    sampleCard: 'Blade of the Obsidian Eclipse',
    pointCost: 1.5
  },
  {
    name: 'Taunt',
    domain: 'Sanctuary',
    type: 'Static',
    reminderText: 'Enemy units in the opposing lane must target this unit for attacks if able.',
    rulesExplanation: 'Forces aggression onto fortified vanguard defenders, shielding fragile commanders and rearguard casters.',
    sampleCard: 'Aegis of the Sunken Citadel',
    pointCost: 1.5
  },
  {
    name: 'Resonate',
    domain: 'Arcane',
    type: 'Trigger',
    reminderText: 'Whenever you cast an Incantation, this card gains +1 Power or triggers its resonance effect.',
    rulesExplanation: 'Spellslinging amplification. Triggers when an incantation is put onto the chain.',
    sampleCard: 'Archmage Vaelen',
    pointCost: 1.5
  },
  {
    name: 'Ascend',
    domain: 'Universal',
    type: 'State',
    reminderText: 'When you control 3 or more Domain Runes, this card unlocks its mythic awakened form.',
    rulesExplanation: 'State-based upgrade that permanently enhances the card’s baseline stats and unlocks tier-3 ability modules.',
    sampleCard: 'Spire of the Five Realms',
    pointCost: 2.5
  }
];

export const SET_SKELETON_DATA: SetSkeletonEntry[] = [
  // Radiance
  { domain: 'Radiance', rarity: 'Common', cost: 1, cardType: 'Champion', role: 'Aggro Opener', sampleCardName: 'Pyre Scout', designIntent: 'Fast early pressure (2/1 Swiftstrike)' },
  { domain: 'Radiance', rarity: 'Common', cost: 2, cardType: 'Spell', role: 'Direct Removal', sampleCardName: 'Searing Ray', designIntent: 'Deal 3 damage to any unit or core' },
  { domain: 'Radiance', rarity: 'Uncommon', cost: 3, cardType: 'Weapon', role: 'Volcanic Cleave', sampleCardName: 'Magma Glaive', designIntent: '+2 Power and Cleave trait' },
  { domain: 'Radiance', rarity: 'Rare', cost: 5, cardType: 'Champion', role: 'Midgame Bomb', sampleCardName: 'Ignis, the Sunforged', designIntent: 'Board wipe aura on weapon equip' },
  { domain: 'Radiance', rarity: 'Mythic', cost: 7, cardType: 'Beast', role: 'Game Finisher', sampleCardName: 'Volcanic Forge Dragon', designIntent: '8/6 Swiftstrike with Overcharge lethal' },
  
  // Sanctuary
  { domain: 'Sanctuary', rarity: 'Common', cost: 1, cardType: 'Spell', role: 'Defense Buff', sampleCardName: 'Aegis Ward', designIntent: 'Grant Ward and +2 Defense' },
  { domain: 'Sanctuary', rarity: 'Common', cost: 2, cardType: 'Champion', role: 'Vanguard Wall', sampleCardName: 'Dawn Gatekeeper', designIntent: '1/4 with Taunt' },
  { domain: 'Sanctuary', rarity: 'Uncommon', cost: 4, cardType: 'Armor', role: 'Fortification', sampleCardName: 'Aegis of the Sunken Citadel', designIntent: '+5 Defense & reduce damage by 2' },
  { domain: 'Sanctuary', rarity: 'Rare', cost: 6, cardType: 'Champion', role: 'Divine Commander', sampleCardName: 'Seraphiel, the Living Bastion', designIntent: '4/8 with Retaliation damage' },
  { domain: 'Sanctuary', rarity: 'Mythic', cost: 8, cardType: 'Relic', role: 'Indestructible Spire', sampleCardName: 'Celestial Spire of Sol-Aegis', designIntent: 'Immunity to lethal damage once per game' },

  // Verdance
  { domain: 'Verdance', rarity: 'Common', cost: 1, cardType: 'Beast', role: 'Ramp Sprout', sampleCardName: 'Eldervale Sapling', designIntent: 'Tap to gain +1 temporary Essence' },
  { domain: 'Verdance', rarity: 'Common', cost: 3, cardType: 'Champion', role: 'Growth Brawler', sampleCardName: 'Brambleback Guardian', designIntent: '3/4 with Rootbound' },
  { domain: 'Verdance', rarity: 'Uncommon', cost: 4, cardType: 'Spell', role: 'Swarm Call', sampleCardName: 'Canopy Awakening', designIntent: 'Summon two 2/2 Treant beasts' },
  { domain: 'Verdance', rarity: 'Rare', cost: 5, cardType: 'Champion', role: 'Forest Queen', sampleCardName: 'Ysildra of the Deep Bough', designIntent: 'Double all +1/+1 counters each turn' },
  { domain: 'Verdance', rarity: 'Mythic', cost: 8, cardType: 'Beast', role: 'Ancient Behemoth', sampleCardName: 'Ancient Ironwood Colossus', designIntent: '10/12 Trample with infinite regeneration' },

  // Arcane
  { domain: 'Arcane', rarity: 'Common', cost: 1, cardType: 'Spell', role: 'Card Filtering', sampleCardName: 'Aetheric Scry', designIntent: 'Scry 3 and draw 1 card' },
  { domain: 'Arcane', rarity: 'Common', cost: 2, cardType: 'Spell', role: 'Reaction Counter', sampleCardName: 'Disrupting Pulse', designIntent: 'Cancel an enemy spell on chain' },
  { domain: 'Arcane', rarity: 'Uncommon', cost: 3, cardType: 'Champion', role: 'Spell Resonator', sampleCardName: 'Astral Apprentice', designIntent: '2/3 with Resonate: +1/+1' },
  { domain: 'Arcane', rarity: 'Rare', cost: 5, cardType: 'Champion', role: 'Chrono Mage', sampleCardName: 'Chronos, Weaver of Timelines', designIntent: 'Return target unit to opponent hand' },
  { domain: 'Arcane', rarity: 'Mythic', cost: 7, cardType: 'Artifact', role: 'Infinite Loop Relic', sampleCardName: 'Tome of the Astral Continuum', designIntent: 'Cast 1 free spell each turn' },

  // Abyss
  { domain: 'Abyss', rarity: 'Common', cost: 1, cardType: 'Champion', role: 'Sacrifice Fodder', sampleCardName: 'Void Thrall', designIntent: '2/1 Deathburst: draw 1 card' },
  { domain: 'Abyss', rarity: 'Common', cost: 2, cardType: 'Spell', role: 'Blood Removal', sampleCardName: 'Dark Harvest', designIntent: 'Destroy target unit; pay 3 life' },
  { domain: 'Abyss', rarity: 'Uncommon', cost: 3, cardType: 'Weapon', role: 'Cursed Edge', sampleCardName: 'Cursed Muramasa', designIntent: '+3 Power, Deathtouch, Bloodtithe' },
  { domain: 'Abyss', rarity: 'Rare', cost: 6, cardType: 'Champion', role: 'Graveyard Lord', sampleCardName: 'Morvath, the Soul Harvester', designIntent: 'Reanimate 1 unit from Voidwell on summon' },
  { domain: 'Abyss', rarity: 'Mythic', cost: 9, cardType: 'Beast', role: 'World Serpent', sampleCardName: 'Ouroboros Void Hydra', designIntent: 'Spawns 2 heads upon destruction' }
];

export const RULES_BIBLE_SECTIONS: RuleSection[] = [
  {
    code: '100',
    title: 'General Concepts & The Golden Rule',
    summary: 'Foundational axioms of the Realm of Nexus rules engine.',
    subsections: [
      { number: '100.1', text: 'Realm of Nexus is a game for two players taking alternating turns until one player’s Nexus Core reaches 0 Life or an alternate win condition is met.' },
      { number: '100.2', text: 'The Golden Rule of Nexus: If the printed text on a card directly contradicts a rule in this Rules Bible, the card’s text takes precedence.' },
      { number: '100.3', text: 'Numbers and Rounding: If a rule or effect requires division and results in a fraction, round up to the nearest whole integer unless explicitly stated otherwise.' },
      { number: '100.4', text: 'Active Player vs Non-Active Player: The player whose turn it currently is is designated the Active Player (AP). The opponent is the Non-Active Player (NAP).' }
    ]
  },
  {
    code: '200',
    title: 'Card Anatomy & Characteristics',
    summary: 'The physical and digital attributes of cards.',
    subsections: [
      { number: '201.1', text: 'Essence Cost: The numerical crystal in the top header indicating the base Essence required to cast the card from hand.' },
      { number: '202.1', text: 'Domain Alignment: Each card belongs to one or more of the 5 Domains: Sanctuary, Radiance, Verdance, Arcane, Abyss, or is Neutral.' },
      { number: '203.1', text: 'Power and Defense: The numerical values represented by the Sword and Shield icons. Units with 0 Defense are sent to the Voidwell.' }
    ]
  },
  {
    code: '500',
    title: 'Turn Structure & Step Resolution',
    summary: 'The formal chronological phases of each game turn.',
    subsections: [
      { number: '501.1', text: 'Awakening Phase: Active player untaps all exhausted cards and gains maximum Essence capacity for the turn.' },
      { number: '502.1', text: 'Conduit Draw Phase: Active player draws 1 card from their Grimoire (skipped by Player 1 on Turn 1).' },
      { number: '503.1', text: 'Main Deployment Phase: Active player may deploy Champions, attach Weapons/Armors, cast Incantations, or activate Spire powers.' },
      { number: '504.1', text: 'Combat Engagement Phase: Sub-steps: 504.1a Declare Attackers, 504.1b Declare Interceptors, 504.1c Reaction Window, 504.1d Simultaneous Strike Resolution.' },
      { number: '505.1', text: 'Hazard Surge Phase: Active Hazard Rift resolves its environmental triggers. D20 skill checks are rolled if required.' },
      { number: '506.1', text: 'Endstep Reclamation: Active player discards down to 7 cards. Temporary "until end of turn" stat modifiers expire.' }
    ]
  },
  {
    code: '600',
    title: 'The Priority Stack & Chain Protocol',
    summary: 'Timing, spell speed, and LIFO resolution.',
    subsections: [
      { number: '601.1', text: 'The Nexus Chain operates on a Last-In, First-Out (LIFO) stack. The most recently added spell or reaction resolves first.' },
      { number: '602.1', text: 'Passing Priority: If both players pass priority in succession without adding an item to the chain, the top item of the chain resolves.' },
      { number: '603.1', text: 'State-Based Actions (SBAs): Before any player receives priority, SBAs are evaluated and resolved simultaneously without using the chain.' }
    ]
  },
  {
    code: '700',
    title: 'Spatial Lane Combat Rules',
    summary: 'Vanguard, Flank, and direct Nexus Core strikes.',
    subsections: [
      { number: '701.1', text: 'Vanguard Protection Rule: An attacking unit in a lane cannot target a Rearguard unit or the enemy Nexus Core if an opposing Vanguard unit occupies that lane, unless the attacker has Stealth or Flying.' },
      { number: '702.1', text: 'Simultaneous Damage: Units engage in simultaneous damage exchange unless one unit possesses Swiftstrike First-Hit.' },
      { number: '703.1', text: 'Retaliation Damage: Defending units deal damage equal to their Power back to the attacker.' }
    ]
  }
];

export const JUDGE_FAQS: JudgeFAQ[] = [
  {
    id: 'faq-01',
    category: 'Timing',
    question: 'What happens if both players’ Champions trigger Deathburst at the exact same moment during a lethal combat trade?',
    ruling: 'Per Rule 602.3, triggers enter the Nexus Chain in AP-NAP order (Active Player triggers first, then Non-Active Player). Since the chain resolves LIFO, the Non-Active Player’s Deathburst trigger will resolve first, followed by the Active Player’s trigger.',
    relevantRules: ['Rule 601.1', 'Rule 602.3', 'Rule 904.2']
  },
  {
    id: 'faq-02',
    category: 'Layers',
    question: 'How do an armor that sets Defense to 8 and a curse that gives -3 Defense interact if the curse was played first?',
    ruling: 'Under the 7-Layer System, setting a stat to a specific number (Layer 7b) is always evaluated before continuous numerical additions or subtractions (Layer 7c). The unit’s Defense is set to 8, then modified by -3, resulting in 5 Defense, regardless of timestamp order.',
    relevantRules: ['Rule 203.1', 'Layer System 7b/7c']
  },
  {
    id: 'faq-03',
    category: 'Hazards',
    question: 'Can a player use a Reaction spell like Aegis Shield during the Hazard Surge phase to prevent environmental damage?',
    ruling: 'Yes. When the Hazard Surge phase begins, the hazard trigger goes onto the Nexus Chain, opening a standard Reaction Priority window before the hazard damage or effect resolves.',
    relevantRules: ['Rule 505.1', 'Rule 601.1']
  },
  {
    id: 'faq-04',
    category: 'Targeting',
    question: 'If a targeted spell is cast on a unit, and the opponent attaches an armor granting Ward in response, does the spell still resolve?',
    ruling: 'The spell fizzles (fails to resolve) upon resolution because its target has become illegal under Ward protection, and the spell is sent directly to the Voidwell with no effect.',
    relevantRules: ['Rule 604.2', 'Keyword: Ward']
  }
];
