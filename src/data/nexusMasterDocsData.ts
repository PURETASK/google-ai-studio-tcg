// ============================================================================
// NEXUS TCG MASTER COMPREHENSIVE DOCUMENTATION DATA REPOSITORY
// Complete Codified Rulebook, Systems Architecture, Features Dossier, 
// Domain Matrix, Resource Economy, Card Management, Timing & Priority Stack,
// Design Ladder (0-30), Color Identity & Momentum Bible, Concept Audit,
// Comprehensive Planar Hazard Bible, Artifact Codices, and 11-7 Hand Setting.
// ============================================================================

export interface MasterDocArticle {
  id: string;
  docType: 
    | 'rules-doc'
    | 'systems-doc'
    | 'features-doc'
    | 'domain-matrix'
    | 'resource-doc'
    | 'card-management-doc'
    | 'timing-doc'
    | 'design-ladder-doc'
    | 'color-bible-audit-doc'
    | 'hazard-bible-doc'
    | 'artifact-codex-doc';
  sectionNumber: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
  tables?: {
    caption: string;
    headers: string[];
    rows: (string | number)[][];
  }[];
  interactiveType?: 'lanes' | 'stack' | 'matrix' | 'ladder' | 'economy' | 'zones';
}

export interface DocCategoryMeta {
  id: MasterDocArticle['docType'];
  title: string;
  shortTitle: string;
  icon: string;
  badge: string;
  description: string;
  articleCount: number;
}

export const MASTER_DOC_CATEGORIES: DocCategoryMeta[] = [
  {
    id: 'rules-doc',
    title: 'Nexus TCG Comprehensive Tournament & Core Rules',
    shortTitle: 'Core Rules (CRD)',
    icon: '📜',
    badge: 'Official CRD v3.5',
    description: 'The authoritative, codified rules governing 30 Life Total, 6-phase turn structure, combat calculations, state-based actions, and 4-copy tournament limits.',
    articleCount: 6
  },
  {
    id: 'systems-doc',
    title: 'Nexus Game Engine & Systems Architecture',
    shortTitle: 'Systems & Architecture',
    icon: '⚙️',
    badge: 'Engine Spec 2.5',
    description: 'Deep technical architecture of the 3-Lane Matrix, Armory mechanics, Dual-Resource economy, and Attunement multipliers.',
    articleCount: 5
  },
  {
    id: 'resource-doc',
    title: 'Momentum, Essence & Dual-Resource Economy Specification',
    shortTitle: 'Resource & Momentum',
    icon: '💎',
    badge: '1-12 Scaling & Dice',
    description: 'Mathematical formulation of the 1-12 Momentum curve, turn-by-turn d6/d12 dice rolls, momentum carryover/conversion, and momentum gating triggers.',
    articleCount: 6
  },
  {
    id: 'hazard-bible-doc',
    title: 'Nexus Comprehensive Planar Hazard Bible & Severity System',
    shortTitle: 'Planar Hazard Bible',
    icon: '🌋',
    badge: 'Hazard Spec 3.0',
    description: 'Dedicated 1-40 Hazard Deck architecture, 1-turn telegraphed forecast delay, Dawn-phase timing, player life damage immunity, and Old vs Modern Hazard design comparison.',
    articleCount: 6
  },
  {
    id: 'artifact-codex-doc',
    title: 'Nexus Comprehensive Artifact Bible & 10-Limit Architecture',
    shortTitle: 'The Artifact Bible',
    icon: '🏺',
    badge: 'Artifact Bible & 10-Cap',
    description: 'Comprehensive theological & technical codex defining what artifacts are, the mathematical imperative for the 10-card limit, and functional differences vs Spells, Units, and Hazards.',
    articleCount: 4
  },
  {
    id: 'card-management-doc',
    title: 'Deck Construction, 11-7 Hand Setting & Card Management',
    shortTitle: 'Deck & Hand Systems',
    icon: '🎴',
    badge: '60-100 Deck / 11-7 Hand',
    description: 'Tournament 60-100 card deck split (60 core + 40 hazard/mana split), 4 copies per card, 8 game zones, 7-card Dusk discard analysis, and the 11-7 Hand Setting.',
    articleCount: 6
  },
  {
    id: 'timing-doc',
    title: 'Timing, Priority Windows & The Aether Chain (Stack)',
    shortTitle: 'Timing & Aether Chain',
    icon: '⏱️',
    badge: 'Stack & Layer System',
    description: 'Complete LIFO priority timing system, action speed classes, APNAP trigger resolution order, and the 6-layer continuous effects architecture.',
    articleCount: 5
  },
  {
    id: 'domain-matrix',
    title: '5-Domain & 10 Dual-Domain Tactical Matrix',
    shortTitle: 'Domain & Synergy Matrix',
    icon: '🔯',
    badge: '5 Domains / 10 Duals',
    description: 'Complete breakdown of Sanctuary, Radiance, Verdance, Arcane, Abyss, their 10 dual-domain pairings, resource attunement, and counterplay matrices.',
    articleCount: 5
  },
  {
    id: 'features-doc',
    title: 'Nexus Studio & Game Features Dossier',
    shortTitle: 'Features & Capabilities',
    icon: '✨',
    badge: 'Feature Suite',
    description: 'Comprehensive dossier covering the AI Vision Studio, Card Forge, 94-Agent Directorate, Ladder 0-30, Booster Vault, and Battle Arena.',
    articleCount: 6
  },
  {
    id: 'design-ladder-doc',
    title: 'Nexus 31-Stage Design Ladder & Studio Organizational Architecture',
    shortTitle: 'Design Ladder (0-30)',
    icon: '🪜',
    badge: 'Stages 0-30',
    description: 'The 31-stage progressive game architecture ladder across 5 phases, supported by the 94-Agent Studio Directorate governance model.',
    articleCount: 6
  },
  {
    id: 'color-bible-audit-doc',
    title: 'Nexus Color Identity, Momentum Bible & Executive Concept Audit',
    shortTitle: 'Color Bible & Audit',
    icon: '📖',
    badge: '36 Bible Sections',
    description: 'The complete 36-section Color Identity and Momentum Bible, Inverted Nexus philosophies, 7 Momentum Prototypes, and the Executive Concept Audit.',
    articleCount: 7
  }
];

export const MASTER_DOC_ARTICLES: MasterDocArticle[] = [
  // ==========================================================================
  // 1. RULES DOC (COMPREHENSIVE RULES DOCUMENT - CRD)
  // ==========================================================================
  {
    id: 'crd-101-fundamentals',
    docType: 'rules-doc',
    sectionNumber: '101',
    title: 'Fundamental Principles & 30 Vitality Victory Conditions',
    subtitle: 'Core match parameters, 30 Life Total, and victory conditions',
    category: 'Fundamentals',
    badge: 'Section 101',
    summary: 'A standard match of Realm of Nexus is contested between two Commanders, each starting at exactly 30 Vitality (Health). The first Commander whose Vitality is reduced to 0 or who attempts to draw from an empty library with 0 cards remaining immediately loses the match.',
    contentMarkdown: `
### 101.1 Match Overview & Core Parameters
Realm of Nexus is a dual-commander tactical card game played in real-time or turn-based phases. Each player represents a powerful Nexus Commander directing Vanguard units, casting arcane incantations, equipping ancestral armaments, and manipulating planetary hazard forces.

### 101.2 Starting Game State
- **Commander Vitality**: Both players begin with exactly **30 Health (Vitality)**.
- **Library (Main Deck)**: Minimum **60 cards**, Maximum **100 cards**. Exactly 60 core cards are required, and the remaining up to 40 cards are split between your customizable **Hazard Deck (1-40 cards)** and your dedicated **Resource/Mana pool**.
- **Card Copy Limits**: Maximum **4 copies of any standard card title** (Unique / Boundless cards are limited to 1 copy).
- **Multi-Domain Freedom**: Factions and deck construction permit any combination and variety of the 5 domains (Sanctuary, Radiance, Verdance, Arcane, Abyss), driven by your resource attunement.
- **Starting Hand**: Configured by the **11-7 Hand Draft Protocol** (Draw 11, lock 2, discard 2, opponent exiles 2 randomly, begin with 7 in hand).
- **Battlefield Geometry**: Divided into 3 Active Lanes (**Left Flank**, **Center Vanguard**, **Right Flank**) plus a rear **Backline Sanctuary Zone**.

### 101.3 Victory & Loss Conditions
A player wins immediately when any of the following conditions are met:
1. **Lethal Vitality Depletion**: The opposing Commander's Vitality reaches 0 or less through combat or spell damage.
2. **Library Depletion (Deck-Out)**: An opponent is required to draw a card from their library when no cards remain in their draw deck.
3. **Cataclysmic Ruin (Hazard Doom)**: An opponent fails to resolve a Planar Cataclysm objective that dictates instant defeat upon timer expiration.
4. **Concession**: An opponent yields at any time when they hold priority.

### 101.4 The Golden Rules of Nexus
- **Rule 101.4a (Card Text Overrides Framework)**: Whenever a card's explicit text contradicts a standard baseline rule in this document, the card's text takes precedence.
- **Rule 101.4b (Prohibition Overrides Permission)**: If an effect states that a player *cannot* take an action (e.g. "Units cannot attack this turn"), it completely overrides an effect allowing that action.
- **Rule 101.4c (Planar Hazard Life Immunity)**: Planar Hazards *cannot deal direct damage to player vitality (Commander HP)*. Hazards interact with board units, armor, essence, momentum, and card advantage, but the 30 Commander HP is strictly protected from direct environmental burn.
`,
    keyTakeaways: [
      'Commanders begin with exactly 30 Health.',
      'Deck size is 60 to 100 cards with a 4-copy card limit.',
      'Any combination of domains is legal, enabled by resource attunement.',
      'Hazards cannot deal direct damage to player vitality.'
    ],
    tables: [
      {
        caption: 'Codified Tournament Match Parameters',
        headers: ['Parameter', 'Codified Value', 'Tournament Variance', 'Enforcement Rule'],
        rows: [
          ['Commander Vitality', '30 HP', 'Strict 30 HP', 'Instant Loss at <= 0 HP'],
          ['Main Deck Minimum', '60 Cards', 'Strict 60-100 Total', 'No deck below 60 core cards'],
          ['Macro Deck Split', '60 Core + up to 40 split', 'Up to 40 Hazard/Mana', 'Customizable 1-40 Hazard Deck'],
          ['Card Copy Limit', '4 of any title', '1 for Boundless/Unique', 'Enforced during deck validation'],
          ['Starting Hand System', '11-7 Setting', '11 Drawn -> 7 in Hand', '2 Locked, 2 Discarded, 2 Exiled'],
          ['Momentum Ceiling', '12 Max Momentum', 'Ramping +1/Turn + Dice', 'Refills each turn']
        ]
      }
    ]
  },
  {
    id: 'crd-102-turn-structure',
    docType: 'rules-doc',
    sectionNumber: '102',
    title: 'The 6-Phase Turn Architecture & Hazard Timing',
    subtitle: 'Exact sequencing of the turn lifecycle: Dawn (Hazard First), Draw, Action, Combat, Dusk',
    category: 'Turn Lifecycle',
    badge: 'Section 102',
    summary: 'Every turn in Realm of Nexus follows a deterministic 6-phase lifecycle: Dawn (Untap & Hazard Pulse FIRST), Inspiration (Draw), Ascension (Essence & Momentum Recharge), Main (Action & Summoning), Clash (Combat), and Dusk (End of Turn Cleanup).',
    contentMarkdown: `
### 102.1 Phase 1: Dawn Phase (Untap & Hazard Pulse FIRST)
1. **Hazard Pulse Execution (FIRST ON TURN)**: Before any cards are drawn, any active Planar Hazard that was played on the prior turn resolves its telegraphed effect! Hazards take precedence before player actions.
2. **Status Reset**: All exhausted units and armaments controlled by the Active Player are readied (untapped).
3. **Upkeep Triggers**: Any abilities reading "At the start of your turn" trigger simultaneously.

### 102.2 Phase 2: Inspiration Phase (Draw)
1. The Active Player draws **1 card** from their library. (On Turn 1, the player going first draws 1 card as standard).
2. If the library is empty when a draw is attempted, State-Based Action 104.1c resolves and that player loses the match.

### 102.3 Phase 3: Ascension Phase (Dual Resource Recharge)
1. **Essence Recharge**: Maximum Essence increases by +1 (up to 10) and current Essence refills to max capacity.
2. **Momentum Scaling & Dice Roll**:
   - Player receives baseline momentum equal to the current turn number ($M_{\\text{base}} = \\min(T, 12)$).
   - Player rolls their **Momentum Die** (Standard d6 or d12) and receives additional bonus momentum!
   - Total current Momentum is calculated and refilled for the turn up to the 12 Momentum cap.

### 102.4 Phase 4: Main Phase (Summoning, Skills & Hazards)
1. The Active Player holds open priority to cast Units, Spells, Weapons, and Artifacts.
2. **Hazard Placement**: Player may play 1 Hazard card from their Hazard Deck. The card is played face-up and enters in a "Forecast / Telegraphed" state (no immediate effect until next turn's Dawn Phase).
3. **Momentum Gated Activations**: Player activates unit skills, stances, or spend momentum points.

### 102.5 Phase 5: Clash Phase (Combat & Lane Skirmishes)
1. **Declaration of Attackers**: Designate attacking units across Left Flank, Center Vanguard, and Right Flank.
2. **Reaction Window**: Opponent may cast Fast Spells or trigger Vanguard Block maneuvers.
3. **Damage Calculation**: Combat damage dealt simultaneously unless First Strike applies.

### 102.6 Phase 6: Dusk Phase (Cleanup, Momentum Conversion & Hand Cap)
1. "Until end of turn" buffs expire.
2. **Momentum Conversion**: Any unspent momentum points are converted into **Kinetic Stash**, temporary shields, or triage cantrips.
3. **Hand Cap Check (7 Cards)**: If holding more than 7 cards, discard down to 7.
`,
    keyTakeaways: [
      'Hazard Pulse happens FIRST at Dawn Phase, strictly before the Draw Phase.',
      'Momentum scales by turn number + dice roll and refills every turn up to 12.',
      'Hazards are played with a 1-turn forecast delay (telegraphed).',
      'Unspent momentum converts into auxiliary benefits at Dusk Phase.'
    ]
  },

  // ==========================================================================
  // 2. RESOURCE & MOMENTUM DOC
  // ==========================================================================
  {
    id: 'res-502-momentum-dynamics',
    docType: 'resource-doc',
    sectionNumber: '502',
    title: 'Momentum System Architecture: 1-12 Scaling, Dice & Carryover',
    subtitle: 'Mathematical formulation of turn-by-turn momentum growth, d6 vs d12 dice rolls, and conversion engines',
    category: 'Momentum Math',
    badge: 'Momentum v3.0',
    summary: 'Momentum is Nexus’s primary action-tempo currency. Every turn, the player gains baseline momentum equal to the turn number (Turn 1 = 1, Turn 2 = 2, Turn 3 = 3... up to 12 max), refills that capacity, and rolls a Momentum Die (d6 or d12) for bonus burst energy. Leftover momentum converts into tactical auxiliary effects.',
    contentMarkdown: `
### 502.1 The Core Momentum Growth Formula
Every turn $T$, the player's available Momentum Pool $M(T)$ is computed as:
$$M_{\\text{base}}(T) = \\min(T, 12)$$
$$M_{\\text{total}}(T) = \\min\\left(M_{\\text{base}}(T) + \\text{DieRoll}(\\text{d6 or d12}) + M_{\\text{bonus}}, 12\\right)$$

- **Turn 1**: 1 Base Momentum + Die Roll
- **Turn 2**: 2 Base Momentum + Die Roll
- **Turn 3**: 3 Base Momentum + Die Roll
- **Turn 4**: 4 Base Momentum + Die Roll
- ...
- **Turn 12+**: 12 Base Momentum (Maximum Natural Cap) + Die Roll

### 502.2 The Dice Debate: d6 vs d12 Analysis
Should Nexus use a **d6** or a **d12** for the turn momentum roll?

| Evaluation Vector | **Standard d6 Roll** (Recommended) | **Wild d12 Roll** (High Chaos) |
| :--- | :--- | :--- |
| **Average Bonus** | $+3.5$ Momentum (Range 1-6) | $+6.5$ Momentum (Range 1-12) |
| **Variance Delta** | Low, predictable strategic planning | High, explosive swing potential |
| **Early Game Balance** | Prevents Turn 1 game-ending blowouts | Risk of Turn 1 having $1 + 12 = 13$ momentum |
| **Competitive Integrity** | High tournament reliability | Favors high-variance casual formats |
| **Hybrid Tier Solution** | **d6 on Turns 1-5**, upgrading to **d12 on Turns 6+** as board anchors solidify! |

### 502.3 Momentum Carryover & Conversion Engine
What happens to unused momentum at the end of a turn?
Rather than simply vanishing into wasted resources, Nexus employs the **Momentum Conversion Engine** during Phase 6 (Dusk):

1. **Option A: Kinetic Stash (Carryover Bank)**:
   - Up to **2 unspent Momentum points** can be banked into your Kinetic Stash to roll over into the next turn as bonus un-capped momentum.
2. **Option B: Aether Barrier (Shield Conversion)**:
   - Convert every 2 unspent Momentum points into **+1 Aether Shield** for your Commander (absorbing 1 incoming damage next turn).
3. **Option C: Lesser Cantrips / Triage Spells**:
   - Spend leftover 1-3 Momentum at Dusk to trigger minor tier utility abilities (e.g. "Spend 1 leftover Momentum: Scry 1", "Spend 2: Heal Vanguard unit for 1 HP").

### 502.4 Dual-Resource Model: Essence (Mana) vs Momentum (Action Power)
- **Essence / Mana Cards**: Dictates what cards you can summon from hand to board (Cost to deploy units, armaments, and cast macro spells).
- **Momentum (Action Power)**: Dictates how fast and how often units can act, activate specialized traits, execute flank maneuvers, or trigger reactions.
`,
    keyTakeaways: [
      'Momentum scales naturally: Turn 1 = 1, Turn 2 = 2, Turn 3 = 3... up to 12 max capacity.',
      'Player rolls a die every turn to add extra momentum to their baseline.',
      'Recommended hybrid: d6 in early game (Turns 1-5), upgrading to d12 in late game (Turns 6+).',
      'Unspent momentum converts into banked Kinetic Stash, shields, or minor triage abilities at Dusk.'
    ]
  },
  {
    id: 'res-503-momentum-triggers',
    docType: 'resource-doc',
    sectionNumber: '503',
    title: 'Momentum as an Action Gate & Trigger Architecture',
    subtitle: 'How momentum functions as an ability activator, stance gate, and combo prerequisite',
    category: 'Momentum Engine',
    badge: 'Gating & Triggers',
    summary: 'Momentum in Nexus is not merely mana—it serves as an interactive Gating Mechanism and Trigger System. Certain high-tier abilities require having a minimum Momentum threshold to even activate, or consume Momentum as an execution trigger.',
    contentMarkdown: `
### 503.1 Momentum Gating Architectures
Nexus establishes three formal ways Momentum interacts with card abilities:

#### 1. Momentum Threshold Gating (Static State)
- The ability does *not* consume momentum; it simply requires your current Momentum to meet or exceed a threshold.
- *Example*: **[Momentum $\\ge 6$]**: *Solar Paladin gains +2/+2 and First Strike.*

#### 2. Momentum Burn Triggers (Activated Cost)
- The player spends a portion of their current Momentum pool to trigger an immediate combat or utility effect.
- *Example*: **[Burn 3 Momentum]**: *Reposition this unit to an adjacent flank lane and strike immediately.*

#### 3. Momentum Velocity Triggers (Event-Based)
- Abilities that fire whenever you spend or generate a specific amount of momentum in a single turn.
- *Example*: *Whenever you generate 5+ Momentum in a single turn, draw 1 card.*

### 503.2 Specific Trigger Classifications
1. **Offensive Momentum Surge**: Spending momentum to add Overwhelm or extra attack dice.
2. **Defensive Brace Trigger**: Burning momentum during the opponent's combat phase to absorb incoming damage.
3. **Flank Maneuver Trigger**: Expending 1-2 momentum to dodge lane blockers.
4. **Attunement Overdrive**: Expending max momentum to unleash a Commander's Boundless Ultimate.
`,
    keyTakeaways: [
      'Momentum acts as both a consumable currency and a threshold requirement.',
      'Gating prevents high-tier ultimate abilities from being spammed on early turns.',
      'Enables fast-paced micro decisions throughout both Main and Combat phases.'
    ]
  },

  // ==========================================================================
  // 3. PLANAR HAZARD BIBLE & SEVERITY SYSTEM
  // ==========================================================================
  {
    id: 'haz-301-hazard-bible-core',
    docType: 'hazard-bible-doc',
    sectionNumber: '301',
    title: 'The Planar Hazard Bible: Core Architecture & Philosophy',
    subtitle: 'The fundamental design philosophy, independent deck system, and player life immunity rules',
    category: 'Hazard Bible',
    badge: 'Canon Bible',
    summary: 'Planar Hazards represent the dynamic, living battlefields of the Realm of Nexus. Hazards operate as an independent, customizable 1-40 card Hazard Deck separate from the main draw library, featuring telegraphed 1-turn forecast delays and strict Player Life Total immunity.',
    contentMarkdown: `
### 301.1 Fundamental Hazard Philosophy
In traditional card games, environmental effects are either absent or implemented as static field spells that clutter a player's draw hand. In Realm of Nexus, **Planar Hazards** are an authoritative, separate game system.

### 301.2 Core Architectural Commandments
1. **Independent Hazard Deck (1 to 40 Cards)**:
   - Every player constructs a dedicated Hazard Deck comprising between 1 and 40 Hazard cards.
   - Built to synergize with your chosen domains (e.g. *Acidic Rainstorm* benefiting Verdance regeneration and Abyss poison) or punish opponent domain strengths.
2. **One Card at a Time**:
   - A player may only introduce 1 Hazard card into the active arena per turn during their Main Phase.
3. **The 1-Turn Telegraphed Forecast Delay (Coming in Tapped)**:
   - When a Hazard card is deployed, it is placed face-up in the **Hazard Forecast Zone**.
   - It remains *inactive* for the remainder of the current turn. Both players can clearly see what is coming and plan their tactical counterplay.
4. **Timing: Dawn Phase Trigger (FIRST ON TURN)**:
   - The telegraphed hazard triggers *first* on the next turn during the Dawn Phase—before the player draws a card or spends essence!
5. **Absolute Player Life Total Immunity**:
   - **Hazards CANNOT deal direct damage to player vitality (Commander HP)**.
   - Hazards can damage units, melt equipment durability, siphon essence, drain momentum, alter lane boundaries, or inflict debuffs, but Commander life (30 HP) cannot be burned away by random environmental ticks.
`,
    keyTakeaways: [
      'Hazard Deck is a separate 1-40 card deck customized by the player.',
      'Played 1 card at a time with a 1-turn telegraphed forecast delay.',
      'Triggers FIRST on turn during Dawn Phase before card draw.',
      'Hazards cannot deal direct damage to Commander Life Totals (30 HP is safe).'
    ]
  },
  {
    id: 'haz-302-old-vs-modern-hazards',
    docType: 'hazard-bible-doc',
    sectionNumber: '302',
    title: 'Hazard Evolution: Old Principles vs Modern Severity & Brace System',
    subtitle: 'Comparative analysis of legacy chaotic board wipes versus the modern telegraphed Brace architecture',
    category: 'Design Evolution',
    badge: 'Old vs Modern',
    summary: 'Legacy TCG field hazard systems suffered from random, unpreventable board wipes and coin-flip instant kills. The Modern Nexus Hazard Architecture replaces this with telegraphed 1-turn warnings, Severity Tiers (1-3), and tactical Brace mitigation mechanics.',
    contentMarkdown: `
### 302.1 Comparative Analysis Table
`,
    keyTakeaways: [
      'Old systems relied on non-interactive instant wipes and coin flips.',
      'Modern Nexus system uses 1-turn telegraphed warnings so players can adapt.',
      'Brace system allows players to spend momentum or position units to mitigate hazards.',
      'Eliminates "feels-bad" random RNG losses.'
    ],
    tables: [
      {
        caption: 'Legacy Hazard Flaws vs Modern Nexus Architecture',
        headers: ['System Dimension', 'Old Legacy Field Principles', 'Modern Nexus Hazard Architecture', 'Design Benefit'],
        rows: [
          ['Draw Contamination', 'Hazards mixed into main deck (dead draws)', 'Separate 1-40 Hazard Deck', 'No wasted card draws; pure strategy'],
          ['Timing & Warning', 'Instantaneous resolution upon draw', '1-Turn Telegraphed Forecast Delay', 'Players have a full turn to prepare / react'],
          ['Player Life Impact', 'Random direct burn killing commanders', 'Strict Commander Life Immunity', '30 HP can only be lost through player combat/spells'],
          ['Player Interaction', 'Zero interaction; unavoidable wipe', 'The Brace & Shelter System', 'Spend Momentum/Essence to mitigate or redirect'],
          ['Severity Scaling', 'Flat static numbers', 'Tier 1 (Weather) to Tier 3 (Cataclysm)', 'Escalating match tension and clear stakes']
        ]
      }
    ]
  },
  {
    id: 'haz-303-hazard-deck-construction',
    docType: 'hazard-bible-doc',
    sectionNumber: '303',
    title: 'Hazard Deck Construction & Domain Synergy Matrix',
    subtitle: 'How to build a 1-40 Hazard Deck to empower your strategy and counter opponent domains',
    category: 'Deck Construction',
    badge: 'Deck Crafting',
    summary: 'Your Hazard Deck is a tactical weapon. Players can craft their 1-40 hazard cards to create environmental conditions that naturally accelerate their own domain keywords while hindering their opponent’s game plan.',
    contentMarkdown: `
### 303.1 Domain-Specific Hazard Synergies
- **Sanctuary Hazards (*Holy Aurora / Solar Eclipse*)**: Suppresses stealth and deathtouch; grants holy shields to units with Taunt.
- **Radiance Hazards (*Molten Ash Storm / Solar Flare*)**: Inflicts burn ticks on all non-armored units; reduces weapon equip costs by 1.
- **Verdance Hazards (*Spore Monsoon / Thorn Infestation*)**: Heals living plant/beast units; turns empty lanes into difficult briar terrain (-1 movement).
- **Arcane Hazards (*Aether Vortex / Temporal Dilations*)**: Increases spell damage by +1; reduces teleportation costs.
- **Abyss Hazards (*Miasma Fog / Void Sinkhole*)**: Degrades unit attack power by -1; triggers death-harvest counters whenever any unit perishes.

### 303.2 Macro Deck Composition Split (60-100 Cards)
In the Nexus tournament rules, your total registered deck configuration is 60 to 100 cards:
- **Core Main Deck**: Exactly **60 cards minimum** (Units, Spells, Artifacts, Equipment).
- **Auxiliary Split (Up to 40 Cards)**: Split between your customized **Hazard Deck (1 to 40 cards)** and your **Resource/Mana pool cards**.
- *Example Setup*: 60 Core Cards + 20 Hazard Cards + 20 Resource Cards = 100 Total Tournament Register.
`,
    keyTakeaways: [
      'Hazard decks are customized to match your domain game plan.',
      'Up to 40 cards allocated between Hazard Deck and Resource Pool.',
      'Creates asymmetric battlefield conditions that reward smart deckbuilding.'
    ]
  },

  // ==========================================================================
  // 4. ARTIFACT CODEX & 10-LIMIT ANALYSIS
  // ==========================================================================
  {
    id: 'art-401-artifact-dossier',
    docType: 'artifact-codex-doc',
    sectionNumber: '401',
    title: 'Artifact Classification, Architecture & Capabilities Codex',
    subtitle: 'Comprehensive definitions: What artifacts are, what they are not, what they can and cannot do',
    category: 'Artifact Rules',
    badge: 'Codex 101',
    summary: 'Artifacts represent the ancient mechanical engines, planar conduits, arcane shrines, and ancestral relics of the Nexus realm. Unlike temporary spells, artifacts persist on the battlefield in dedicated zones.',
    contentMarkdown: `
### 401.1 What Artifacts ARE
- **Permanent Relics & Conduits**: Non-organic physical or magical structures that remain on the battlefield indefinitely until destroyed or banished.
- **Persistent Engine Pieces**: Cards that generate incremental value over multiple turns (e.g. generating extra essence, charging momentum counters, buffing specific unit subtypes).
- **Armory & Fortifications**: Specialized equipment that can be attached to Commanders or Vanguard champions.

### 401.2 What Artifacts ARE NOT
- **They are NOT Organic Units**: Artifacts do not have inherent Attack or Health values and cannot attack or block on their own unless animated by an arcane spell (e.g. *Awaken the Golem*).
- **They are NOT Instant Spells**: Artifacts must be deployed to the board during your Main Phase; they do not resolve and go to the graveyard like an incantation.
- **They are NOT Direct Commander Shields**: Artifacts do not absorb commander damage unless they explicitly carry the *Aegis / Shield* keyword.

### 401.3 What Artifacts CAN Do
1. Provide continuous passive domain auras (e.g. *"All Sanctuary units gain +1 Armor"*).
2. Tap / Exhaust to activate powerful utility abilities (e.g. *"Exhaust: Draw 1 card and gain 1 Momentum"*).
3. Store **Aether Charge Counters** that build up over turns to unleash massive catastrophic activations.
4. Alter the physics of the 3-Lane Matrix (e.g. *"The Center Vanguard lane cannot be breached by Flying units"*).

### 401.4 What Artifacts CANNOT Do
1. Cannot attack or defend in combat without a living crew or animating enchantment.
2. Cannot exceed the **10-Artifact Battlefield Cap** per player.
3. Cannot bypass Planar Hazard effects unless protected by an environmental ward.
4. Cannot trigger fast reaction abilities on an opponent’s turn unless explicitly tagged with the **[Reaction]** speed class.
`,
    keyTakeaways: [
      'Artifacts are permanent engines, shrines, and relics that persist on the battlefield.',
      'They cannot attack or block on their own without animation spells.',
      'They provide continuous auras, tap abilities, and charge counters.',
      'Must respect the 10-Artifact maximum board limit.'
    ]
  },
  {
    id: 'art-402-why-artifact-limit',
    docType: 'artifact-codex-doc',
    sectionNumber: '402',
    title: 'Why the 10-Artifact Limit Exists: Balance & Game Health Analysis',
    subtitle: 'Deep architectural rationale behind the 10-artifact board cap and prevention of degenerate game states',
    category: 'Design Rationale',
    badge: 'Balance Audit',
    summary: 'The 10-Artifact limit is a vital architectural guardrail. Without a hard cap, permanent non-creature artifacts create un-interactive board stalls, memory bloat, infinite activation loops, and visual interface clutter.',
    contentMarkdown: `
### 402.1 The 4 Architectural Reasons for the 10-Artifact Limit

#### 1. Prevention of Non-Interactive Board Stalls (The "Turtle Fortress")
In games without artifact limits, control players can stack 20+ defensive relics, mana shrines, and passive damage reducers without ever playing a single unit. This creates stagnant, boring 90-minute matches where neither player can attack. The 10-card cap forces players to make meaningful choices about which engines to keep.

#### 2. Prevention of Infinite Activation Loops
Artifacts frequently have tap abilities (e.g. *"Exhaust this artifact: Untap target artifact and gain 1 Essence"*). With unlimited board slots, 3-card and 4-card infinite loops proliferate exponentially. The 10-artifact ceiling constrains maximum engine combinations to a verifiable mathematical boundary.

#### 3. Cognitive & Memory Load on Players
Tracking 15+ passive card effects, trigger timings, and counter values on a single side of the board overwhelms human working memory and leads to constant rules arguments during physical tournament play.

#### 4. Physical & Digital Screen Real Estate (UI Ergonomics)
On both tabletop playmats and digital mobile screens, allocating space for the 3-Lane combat matrix, Commander zones, Hazard zones, and Armory leaves room for exactly 10 dedicated Relic/Artifact slots before the interface becomes unusable.

### 402.2 What Happens When You Reach the 10-Artifact Limit?
If a player controls 10 Artifacts and wishes to play an 11th:
- The player must choose 1 existing Artifact to **Sacrifice / Deconstruct** to the Graveyard as part of the casting cost before the new artifact enters the battlefield.
`,
    keyTakeaways: [
      'The 10-artifact cap prevents un-interactive turtle stalls and infinite loop exploits.',
      'Reduces cognitive load and ensures clean digital and tabletop playmat ergonomics.',
      'Playing an 11th artifact requires sacrificing an existing one (dynamic choice).'
    ]
  },
  {
    id: 'art-403-artifact-vs-standards',
    docType: 'artifact-codex-doc',
    sectionNumber: '403',
    title: 'Artifacts vs Standard Card Types: Definitive Mechanical Matrix',
    subtitle: 'Functional differences between Artifacts, Units, Spells, and Planar Hazards',
    category: 'System Comparison',
    badge: 'Matrix Audit',
    summary: 'A side-by-side technical breakdown distinguishing Artifacts from organic Units, transient Spells, and environmental Planar Hazards across durability, timing, targeting, and board persistence.',
    contentMarkdown: `
### 403.1 Mechanical Comparison Matrix

| Property | Artifacts / Relics | Units / Champions | Spells / Incantations | Planar Hazards |
| :--- | :--- | :--- | :--- | :--- |
| **Board Presence** | Permanent (Until destroyed) | Permanent (In Lane) | Transient (To GY on cast) | Delayed / Round Duration |
| **Zone Allocated** | Armory & Relic Vault (Max 10) | 3-Lane Matrix (Max 3/lane) | The Stack / Void | Forecast Zone / Biome |
| **Combat Stats** | Durability / Charges (No ATK/HP) | Attack & Health Values | N/A (Spell Power Modifiers) | Environmental Severity (★) |
| **Can Attack/Block?** | NO (Unless animated) | YES (Vanguard / Flank rules) | NO | NO |
| **Damage to Hero?** | Indirect / Aura buffs only | Direct Combat Damage | Direct Spell Damage | IMMUNE (Zero Player Direct Dmg) |
| **Timing Class** | Main Phase / Fast Reaction | Main Phase / Flash Summons | Fast / Slow / Reaction | Dawn Phase Resolution |

### 403.2 Key Functional Axioms
1. **Durability vs. Health**: Artifacts do not have health bars that take damage in combat. Instead, they possess **Durability Counters** or **Aether Charges** that decrement when abilities are activated or when targeted by anti-matter deconstruction spells.
2. **Untargetable by Lane Attacks**: Melee units cannot attack artifacts in the Relic Vault unless they possess the *Siege Breaker* or *Pillage* keywords.
3. **Synergy Engines**: Artifacts exist to multiply the efficiency of other cards, turning 1 Essence spells into 3 Essence value.
`,
    keyTakeaways: [
      'Artifacts persist in the Relic Vault, not in the 3-Lane combat lines.',
      'They do not possess attack or health and cannot attack unless animated.',
      'Protected from direct melee combat unless opposing units have Siege Breaker.',
      'Provide force-multipliers for spells, momentum generation, and lane buffs.'
    ]
  },
  {
    id: 'art-404-artifact-subtypes-armory',
    docType: 'artifact-codex-doc',
    sectionNumber: '404',
    title: 'The 5 Artifact Subtypes: Relics, Shrines, Weapons, Armaments & Planar Cores',
    subtitle: 'Taxonomy and mechanical archetypes of Nexus Artifact hardware',
    category: 'Artifact Taxonomy',
    badge: 'Hardware Codex',
    summary: 'Nexus classifies all non-organic permanents into 5 distinct artifact archetypes, each occupying specific functional niches from passive lane conduits to personal hero armory equipment.',
    contentMarkdown: `
### 404.1 The 5 Primary Artifact Archetypes

#### 1. Planar Shrines & Altars
- **Role**: Domain mana and momentum ramp engines.
- **Example**: *Shrine of the Eternal Beacon (Sanctuary)* — Generates +1 Shield whenever you cast a holy spell.
- **Activation**: Typically triggered automatically or exhausted once per turn cycle.

#### 2. Armaments & Equipment
- **Role**: Attached directly to a Champion, Commander, or Vanguard unit.
- **Example**: *Obsidian Aegis (Abyss)* — Grants wearer +3 Armor and Deathtouch.
- **Rules**: If the equipped unit dies, the Armament remains on the battlefield unattached and can be re-equipped for 1 Essence.

#### 3. Planar Cores & Fonts
- **Role**: High-capacity Aether storage conduits that unlock ultimate domain spells.
- **Example**: *Chronos Core (Arcane)* — Charges 1 Temporal counter per turn; at 5 counters, take an extra turn.

#### 4. Siegeworks & Bastions
- **Role**: Lane-reinforcing stationary fortresses that grant defensive auras to specific combat lanes.
- **Example**: *Verdant Thornwall (Verdance)* — Left and Right flanks gain Taunt and Reflect 2.

#### 5. Ancestral Relics
- **Role**: Single-activation or consumable ancient artifacts with game-altering effects.
`,
    keyTakeaways: [
      '5 Core Subtypes: Shrines, Armaments, Planar Cores, Siegeworks, and Relics.',
      'Armaments survive unit death and can be re-equipped to new champions.',
      'Siegeworks modify lane physics and protect flank guards.',
      'All subtypes count toward the universal 10-Artifact battlefield cap.'
    ]
  },

  // ==========================================================================
  // 5. CARD MANAGEMENT & 11-7 HAND SETTING
  // ==========================================================================
  {
    id: 'mgr-602-11-7-hand-setting',
    docType: 'card-management-doc',
    sectionNumber: '602',
    title: 'The 11-7 Opening Hand Setting Protocol & Mindgame Analysis',
    subtitle: 'Draw 11, Lock 2, Discard 2, Opponent Exiles 2: The definitive competitive opening procedure',
    category: 'Hand Systems',
    badge: '11-7 Protocol',
    summary: 'The 11-7 Hand Setting is Nexus’s premier competitive opening procedure. Players draw 11 cards, lock 2 Soulbound cards in hand, choose 2 cards to discard to the Graveyard, and allow the opponent to randomly exile 2 cards to the Void, starting the match with exactly 7 cards in hand.',
    contentMarkdown: `
### 602.1 The 4 Steps of the 11-7 Protocol

\`\`\`
[Draw 11 Cards from Library]
             |
             v
[Step 1: Player Locks 2 Cards]  -->  (Soulbound: Cannot be discarded or exiled)
             |
             v
[Step 2: Player Discards 2 Cards] --> (Sent to Graveyard: Early Turn 1 GY fuel)
             |
             v
[Step 3: Opponent Randomly Exiles 2 Cards] --> (Sent to Void: Out of remaining 7)
             |
             v
[Step 4: Player Starts with EXACTLY 7 Cards in Hand]
\`\`\`

### 602.2 Deep Tactical & Psychological Breakdown

1. **Elimination of Mana/Draw RNG**: Drawing 11 cards guarantees that neither player suffers from an unplayable opening hand. You will always see your core combo enablers.
2. **The Soulbound Lock (Protection Mindgame)**: Locking 2 cards guarantees your signature 1-drop or game-winning late-game titan cannot be stripped away by the opponent's exile step.
3. **Intentional Graveyard Seeding (Step 2)**: For Abyss and Verdance decks, discarding 2 cards on Turn 0 provides immediate graveyard resources for early reanimation and biomass spells!
4. **Opponent Disruption (Step 3)**: The opponent randomly exiles 2 cards from the 7 un-locked cards, forcing players to adapt on the fly and preventing completely scripted opening lines.
5. **Clean Starting Hand of 7**: Match begins with a robust 7-card hand, 2 cards in Graveyard, 2 cards in Exile, and 0 dead draws.
`,
    keyTakeaways: [
      'Draw 11 -> Lock 2 Soulbound -> Discard 2 to GY -> Opponent exiles 2 to Void -> Begin with 7.',
      'Guarantees zero unplayable opening hands while preserving high tactical adaptation.',
      'Provides immediate Graveyard seeding for graveyard-centric strategies.',
      'Locked cards are completely immune to the opponent’s exile step.'
    ]
  },
  {
    id: 'mgr-603-seven-card-discard-analysis',
    docType: 'card-management-doc',
    sectionNumber: '603',
    title: 'Hand Size Economics: Why Discard Down to 7 Cards at Dusk Phase?',
    subtitle: 'Game design analysis of hand caps, pacing momentum, and strategic tension',
    category: 'Hand Systems',
    badge: 'Hand Cap Analysis',
    summary: 'The 7-card hand limit at the end of each turn is a fundamental pacing anchor. It prevents passive card hoarding, creates intense tactical decision points, fuels graveyard interactions, and rewards efficient resource spending.',
    contentMarkdown: `
### 603.1 Why 7 Cards is the Ideal Hand Size Limit

#### 1. Preventing Passive Hand Hoarding & Stalls
Without a hand size limit, a player who gains early card advantage could hoard 15-20 cards in hand, waiting indefinitely for the opponent to make a move. The 7-card cap forces players to actively spend resources every turn or face the consequence of discarding valuable cards.

#### 2. Creating Deep Strategic Tension at Dusk Phase
When an Arcane player draws 4 extra cards and ends the turn with 9 cards, they must evaluate: *"Which 2 cards do I discard?"* This transforms excess card draw into an active risk-reward calculation rather than a mindless advantage.

#### 3. Fueling the Graveyard Ecosystem
Discarding excess cards at Dusk is not always a punishment. For Abyss, Sanctuary Martyr, and Verdance decks, discarding cards at the end of the turn intentionally seeds the Graveyard with reanimation targets and spell catalysts for the upcoming turn.

#### 4. Cognitive Fairness & Table Visibility
In physical tabletop play, holding more than 7 cards is physically difficult to conceal and sort. In digital play, displaying more than 7-8 cards crowds the screen interface and obscures vital card text.
`,
    keyTakeaways: [
      '7-card hand limit prevents passive card hoarding and keeps games fast-paced.',
      'Forces players to actively spend cards or make deliberate discard choices.',
      'Provides organic graveyard fueling for reanimation and death-harvest mechanics.',
      'Optimizes both tabletop hand ergonomics and digital UI readability.'
    ]
  },

  // ==========================================================================
  // 6. DOMAIN MATRIX
  // ==========================================================================
  {
    id: 'dom-401-five-domains',
    docType: 'domain-matrix',
    sectionNumber: '401',
    title: 'The 5 Core Inverted Domains of Nexus',
    subtitle: 'Sanctuary, Radiance, Verdance, Arcane, and Abyss core philosophies',
    category: 'Domain Matrix',
    badge: '5 Domains',
    summary: 'Nexus fundamentally inverts traditional TCG color expectations: Sanctuary is relentless divine order; Radiance is volatile solar immolation; Verdance is untamed primal evolution; Arcane is temporal spacetime manipulation; Abyss is cold necrotic inevitability.',
    contentMarkdown: `
### 401.1 Domain Comparison Table
`,
    keyTakeaways: [
      'Sanctuary: Unyielding fortress armor, damage absorption, and holy retribution.',
      'Radiance: Explosive burn, armor sundering, and high-risk berserker fury.',
      'Verdance: Accelerated growth, bio-regeneration, and briar entanglements.',
      'Arcane: Temporal rewind, spell siphoning, card draw, and stasis locks.',
      'Abyss: Deathtouch necrosis, life draining, and sacrificial doom cataclysms.'
    ],
    tables: [
      {
        caption: '5-Domain Tactical & Philosophical Matrix',
        headers: ['Domain', 'Primary Philosophy', 'Resource Curve', 'Combat Stance', 'Card Advantage', 'Signature Finisher'],
        rows: [
          ['Sanctuary 🛡️', 'Unyielding Divine Order', 'Midrange to Late (4-8)', 'Defensive Vanguard & Taunt', 'Tutoring & Protection', 'Seraphic Judgement'],
          ['Radiance 🔥', 'Volatile Solar Immolation', 'Hyper Aggro (1-5)', 'First Strike & Overwhelm', 'Impulse Draw & Burn', 'Solar Supernova'],
          ['Verdance 🌿', 'Primal Adaptive Growth', 'Exponential Ramp (3-7)', 'Regeneration & Growth', 'Token Spores & Library Search', 'Elder Wurm Trample'],
          ['Arcane 🔮', 'Temporal Mastery & Control', 'Slow Control (5-10)', 'Aether Rift & Reach', 'Massive Draw & Siphon', 'Chrono Stasis Collapse'],
          ['Abyss 💀', 'Necrotic Inevitability', 'Sacrifice & Attrition (2-6)', 'Deathtouch & Drain', 'Graveyard Reanimation', 'Doom Cataclysm Tether']
        ]
      }
    ]
  },
  {
    id: 'dom-402-ten-duals',
    docType: 'domain-matrix',
    sectionNumber: '402',
    title: 'The 10 Dual-Domain Synergy Archetypes',
    subtitle: 'Cross-domain combinations, mechanical fusions, and deck archetypes',
    category: 'Synergy Matrix',
    badge: '10 Pairings',
    summary: 'Combining two domains unlocks specialized hybrid archetypes that blend opposing philosophies into cohesive tournament deck engines.',
    contentMarkdown: `
### 402.1 The 10 Dual-Domain Pairings
1. **Dawnforge (Sanctuary + Radiance)**: Radiant Crusader engine combining indestructible armor shields with superheated plasma blades.
2. **Primordial Sun (Radiance + Verdance)**: Rapid swarm agro utilizing rapid mana ramp and explosive burn bursts.
3. **Astral Bloom (Verdance + Arcane)**: Endless resource engine generating maximum Essence while drawing entire decks.
4. **Nether Chrono (Arcane + Abyss)**: Ultimate control archetype draining opponent time and life simultaneously.
5. **Void Eclipse (Sanctuary + Abyss)**: Immortal martyr engine trading self-inflicted damage for unyielding holy defense.
6. **Celestial Rift (Sanctuary + Arcane)**: Absolute stasis lock preventing enemy attacks while assembling combo pieces.
7. **Bramble Smite (Sanctuary + Verdance)**: Giant wall archetype with enormous defensive units that heal every turn.
8. **Infernal Dread (Radiance + Abyss)**: Suicidal burn deck dealing lethal damage to both players while winning on speed.
9. **Molten Flux (Radiance + Arcane)**: Spell-slinging combo deck that reduces spell costs to 0 for infinite firestorm chains.
10. **Venom Void (Verdance + Abyss)**: Toxic poison attrition filling the enemy board with necrotic debuffs.
`,
    keyTakeaways: [
      '10 distinct dual-domain combinations provide 10 unique competitive identities.',
      'Synergy bridges reconcile natural weaknesses (e.g. Arcane draw + Radiance burn).',
      'Dual-domain cards require matching attunement thresholds in deck construction.'
    ]
  },

  // ==========================================================================
  // 7. TIMING & PRIORITY
  // ==========================================================================
  {
    id: 'tim-701-aether-chain',
    docType: 'timing-doc',
    sectionNumber: '701',
    title: 'The Aether Chain (Stack) & Speed Classes',
    subtitle: 'LIFO resolution, priority passes, Fast/Reaction/Slow action speeds',
    category: 'Timing Engine',
    badge: 'Stack v2',
    summary: 'The Aether Chain handles all non-instantaneous game events using a Last-In, First-Out (LIFO) resolution stack. Spells are categorized into Slow Actions, Fast Actions, and Reactions.',
    contentMarkdown: `
### 701.1 Action Speed Classes
- **Slow Actions (Sorceries / Units)**: Can only be cast during your Main Phase when the Aether Chain is empty and you hold priority.
- **Fast Actions (Instants / Quick Spells)**: Can be cast at any time you hold priority, including during combat or in response to opponent spells.
- **Reactions (Counter-Spells / Retribution)**: Can be cast specifically when a designated trigger occurs (e.g. "When a friendly unit is targeted by a spell").
- **Passive Abilities (Continuous)**: Do not use the stack; apply constantly across all layers.

### 701.2 Priority Passing Protocol
\`\`\`
Player A casts Spell #1 (Enters Stack)
        |
        v
Priority passes to Player B
   |                     |
   v (Passes)            v (Casts Fast Spell #2)
Spell #1 Resolves     Spell #2 Enters Stack on top of #1
                             |
                             v
                      Priority passes to Player A
                             |
                      Spell #2 Resolves FIRST, then Spell #1
\`\`\`
`,
    keyTakeaways: [
      'The Aether Chain resolves in reverse order (Last In, First Out).',
      'Both players must pass priority consecutively for the top item on the stack to resolve.',
      'Fast Actions and Reactions allow instant interaction on the opponent’s turn.'
    ]
  },
  {
    id: 'tim-702-layer-system',
    docType: 'timing-doc',
    sectionNumber: '702',
    title: 'The 6-Layer Continuous Effect Architecture',
    subtitle: 'Deterministic resolution of overlapping buffs, debuffs, and type modifications',
    category: 'Layer Math',
    badge: 'Layer Engine',
    summary: 'When multiple continuous effects modify the same card, they are evaluated in a strict 6-layer sequence to eliminate ambiguity.',
    contentMarkdown: `
### 702.1 The 6 Continuous Effect Layers
1. **Layer 1 (Copy & Base Text)**: Copied card attributes and printed card identity.
2. **Layer 2 (Control & Possession)**: Effects that change who controls a unit or relic.
3. **Layer 3 (Text & Name Modifications)**: Adding or removing keywords and domain tags.
4. **Layer 4 (Type & Lane Changes)**: Changing a unit into an Artifact or altering its lane restrictions.
5. **Layer 5 (Base Stat Overwrites)**: Effects that set Attack or Health to a specific number (e.g. "Unit becomes a 1/1 Frog").
6. **Layer 6 (Stat Buffs, Debuffs & Counters)**: Additive $+X/+Y$ or $-X/-Y$ modifiers, equipment buffs, and status counters.
`,
    keyTakeaways: [
      'Strict 6-layer pipeline prevents rule arguments in complex board states.',
      'Base stat overwrites (Layer 5) always apply BEFORE additive buffs (Layer 6).',
      'Timestamps resolve ties within the exact same layer.'
    ]
  },

  // ==========================================================================
  // 8. DESIGN LADDER DOC
  // ==========================================================================
  {
    id: 'lad-801-ladder-overview',
    docType: 'design-ladder-doc',
    sectionNumber: '801',
    title: 'The 31-Stage Design Ladder & Studio Directorate',
    subtitle: 'From Stage 0 (Core Hook) to Stage 30 (Live Service Expansion)',
    category: 'Design Ladder',
    badge: 'Ladder 0-30',
    summary: 'The Nexus Design Ladder establishes a rigorous 31-stage developmental framework spanning 5 sequential phases, ensuring that every design decision is backed by mathematical power budgeting.',
    contentMarkdown: `
### 801.1 The 5 Ladder Phases
- **Phase 1 (Stages 0-8)**: *Core Foundation & Identity* — Defining the 3-Lane mechanic, Essence curve, 5-domain color pie, and baseline power budgets.
- **Phase 2 (Stages 9-17)**: *Mechanics, Combat & Hazards* — Codifying Vanguard blocking, Armory durability, the Planar Hazard engine, and Momentum prototypes.
- **Phase 3 (Stages 18-20)**: *Set Design & Mathematical Skeleton* — Constructing the 240-card Core Set skeleton, rarity distribution curves, and limited drafting formats.
- **Phase 4 (Stages 21-24)**: *Worldbuilding, Lore & Art Direction* — Establishing the planetary geography of the 5 realms, full-bleed visual standards, and faction voice.
- **Phase 5 (Stages 25-30)**: *Tournament Rules, Playtesting & Horizon* — Finalizing the Comprehensive Rules Document (CRD), automated balance bot matrices, and future expansion cycles.
`,
    keyTakeaways: [
      '31 stages provide a complete roadmap from concept to tournament release.',
      'No mechanic moves forward without satisfying its stage deliverable and power budget.',
      'Supported by the 94-agent autonomous design council.'
    ]
  },

  // ==========================================================================
  // 9. COLOR BIBLE & CONCEPT AUDIT DOC
  // ==========================================================================
  {
    id: 'bib-901-bible-audit',
    docType: 'color-bible-audit-doc',
    sectionNumber: '901',
    title: 'Color Identity, Momentum Bible & Executive Concept Audit',
    subtitle: 'The 36 canonical bible sections, inverted color identities, and legacy audit',
    category: 'Bible & Audit',
    badge: 'Canon Bible',
    summary: 'The Color Identity and Momentum Bible serves as the ultimate design contract for Realm of Nexus, codifying the 36 essential principles of game balance, faction philosophies, and the complete legacy audit.',
    contentMarkdown: `
### 901.1 Executive Design Philosophy
1. **Zero Dead Turns**: Through automated Essence ramp and low-cost tactical options, players are never locked out of participation.
2. **Spatial Tactility**: The 3-Lane Matrix makes positioning as impactful as card text.
3. **No Meaningless Randomness**: Elimination of coin flips in favor of deterministic hazard dice with predictable variance brackets.
4. **Distinct Domain Sovereignty**: Each domain possesses mutually exclusive strengths and glaring weaknesses, necessitating creative dual-domain deckbuilding.

### 901.2 The Concept Audit Summary
- **Classification 'KEEP'**: 3-Lane combat, Essence ramp, Domain-specific vector filigree, Planar hazard dice, 30 Life Total, 60-100 Deck Split.
- **Classification 'MODIFY'**: Converted static weapons into interactive Armory equipment; modified hazard deck into customizable 1-40 separate deck with 1-turn forecast delay.
- **Classification 'MERGE'**: Combined duplicate spell keywords into the unified Glyph Lexicon; merged opening mulligans into the 11-7 Hand Setting.
- **Classification 'REJECT'**: Banned coin-flip extra turns, uncapped artifact stacking, and direct environmental hazard damage to player vitality.
- **Classification 'PROTOTYPE'**: Momentum 1-12 Scaling + Dice rolls with Dusk Phase Kinetic Stash and Shield conversions.
`,
    keyTakeaways: [
      '36 codified bible sections guide all card and mechanic generation.',
      'Concept audit transparently documents what legacy ideas were kept, modified, or rejected.',
      'Executive philosophy guarantees fast, deep, highly interactive matches.'
    ]
  }
];
