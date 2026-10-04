export type Domain = 'Sanctuary' | 'Verdance' | 'Radiance' | 'Abyss' | 'Tempest' | 'Arcane';

export type FoilType = 'none' | 'gold' | 'prismatic' | 'cosmic';

export type CardType = 
  | 'Champion' 
  | 'Character'
  | 'Weapon' 
  | 'Artifact' 
  | 'Armor' 
  | 'Beast' 
  | 'Spell' 
  | 'Relic'
  | 'Environment'
  | 'Minion'
  | 'Ritual'
  | 'Encounter';

export type Rarity = 
  | 'Common' 
  | 'Uncommon' 
  | 'Rare' 
  | 'Very Rare' 
  | 'Legendary' 
  | 'Mythic' 
  | 'Divine Boundless';

export interface PowerGlyph {
  id: string;
  name: string;
  icon: string; // Emoji or Lucide icon key
  category: 'elemental' | 'combat' | 'tactical' | 'defensive' | 'mythic' | 'curse' | 'celestial' | 'abyssal';
  shortTag: string; // e.g. "LAVA CONTROL", "MOLTEN BURST", "SPORE SWARM"
  ruleClause: string;
  timing?: 'Passive' | 'Passive Aura' | 'Fast Reaction' | 'Main Action' | 'Pre-Combat' | 'On Hit' | 'End Phase Trigger' | 'On Death' | string;
  damageMod?: string;
}

export interface AbilityProperty {
  id: string;
  name: string;
  subtitle?: string;
  type?: 'Passive' | 'Action' | 'Reaction' | 'Ultimate' | 'Bonus Action' | 'Spell';
  iconType: 'sword' | 'shield' | 'flame' | 'sparkles' | 'eye' | 'zap' | 'skull' | 'feather' | 'wind' | 'heart' | 'book' | 'moon' | 'sun' | 'hourglass' | 'snake' | 'crown';
  description: string;
  damageDice?: string;
  charges?: string; // e.g. "1/Day", "3 Charges", "Passive"
  savingThrow?: string; // e.g. "DC 17 STR"
  highlightColor?: string;
}

export interface CardBreakdownItem {
  label: string;
  title: string;
  description: string;
  icon?: string;
}

export interface EvolutionTier {
  tier: string;
  name: string;
  requirement?: string;
  effect: string;
}

export interface Card {
  id: string;
  instanceId?: string;
  name: string;
  subtitle: string; // e.g. "THE WORLD COIL OF LAVA", "WONDROUS ITEM, VERY RARE", "CELTIC GOD OF THUNDER"
  alias?: string;
  domain: Domain;
  secondaryDomain?: Domain;
  cardType: CardType;
  subtype: string; // e.g. "War Pick", "Mythic Warrior", "Spear", "Amulet / Relic"
  cost: number; // Essence / Mana cost
  rarity: Rarity;
  
  // Combat stats
  power: number; // Attack
  defense: number; // Health / Armor Class
  speed?: number;
  laneRole?: 'Flank' | 'Center' | 'Support' | 'Universal';
  range?: string; // e.g. "Melee", "Reach", "20/80 ft", "Global"
  
  // Tactical Radar Ratings (0-10 scale for character sheet layout)
  attributes?: {
    damage: number;
    durability: number;
    mobility: number;
    utility: number;
    control: number;
  };

  // Elite Hero style segmented Power Attributes (0-10 scale)
  powerAttributes?: {
    strength: number;
    speed: number;
    durability: number;
    energyOutput: number;
    fightingSkill: number;
    intelligence: number;
    control: number;
  };

  // Elite Hero Icon Glyphs Grid (Clean iconography instead of bulky text)
  powerGlyphs?: PowerGlyph[];

  // Elite Hero metadata
  powerStars?: number; // 1-10 stars (e.g. 10 stars = Tier S)
  powerLevelTier?: 'TIER S' | 'TIER A+' | 'TIER A' | 'TIER B' | 'TIER EX' | 'TIER S+';
  affiliation?: string; // e.g. "Volkanic Clan", "Sylvaen Enclave", "Baatorian Legion"
  primaryPower?: string; // e.g. "Magma Manipulation / Terrain Eruption"

  divineRank?: number; // 1-5 stars or infinity
  status?: string; // "Awakened", "Sealed", "Attuned", "Ascended"
  attunementRequired?: boolean;
  attunementDetail?: string; // e.g. "Requires attunement by a druid"
  weight?: string;
  origin?: string;

  // Thematic details matching reference images
  quote: string;
  lore: string;
  aestheticTheme: 'parchment-gold' | 'volcanic-dark' | 'astral-sapphire' | 'verdant-emerald' | 'abyss-crimson' | 'starlight-rose' | 'celestial-sun';
  
  // Abilities and properties
  abilities: AbilityProperty[];
  
  // Special modules
  hiddenTrait?: {
    title: string;
    description: string;
  };
  curse?: {
    title: string;
    description: string;
  };
  breakdownItems?: CardBreakdownItem[];
  evolutionTiers?: EvolutionTier[];
  synergies?: string[];
  
  // Graphic representation & illustration styling
  artUrl?: string;
  artVisualTheme?: {
    primaryColor: string;
    glowColor: string;
    bgGradient: string;
    iconSymbol: string;
    badgeText?: string;
    visualMotif?: 'warpick' | 'brooch' | 'duilokis' | 'fleau' | 'ophanim' | 'skeletonkey' | 'pretastra' | 'mantle' | 'infernal' | 'greatbow' | 'wildbond' | 'ring' | 'jormungandr';
  };
}

export interface UnitStatusEffects {
  shield?: number;
  shieldTurns?: number;
  shieldAmount?: number;
  burn?: number; // Ticking fire damage per turn
  burnTurns?: number;
  burnDamage?: number;
  poison?: number; // Toxic damage per turn
  poisonTurns?: number;
  poisonDamage?: number;
  frozen?: boolean; // Cannot attack
  frozenTurns?: number;
  restrained?: boolean;
  restrainedTurns?: number;
  buffed?: number; // Power boost
  frenzy?: number; // Extra attack or ATK boost
  frenzyTurns?: number;
  frenzyBonus?: number;
  regeneration?: number; // Heals HP per turn
  regenTurns?: number;
  regenAmount?: number;
  radiantWard?: number; // Damage absorption
  armorShred?: number; // Defense reduction
  shredTurns?: number;
  shredValue?: number;
  voidRot?: number; // Max HP loss
  voidRotTurns?: number;
  voidRotReduction?: number;
  silenced?: boolean; // Abilities disabled
}

export interface PlayerStatusEffects {
  burn?: number;
  poison?: number;
  essenceSurge?: number; // Mana discount on next spell
  radiantAura?: number; // End-turn healing
  planarInstability?: number; // Hazard multiplier
}

export interface BattlefieldSlot {
  instanceId: string;
  card: Card;
  currentHealth: number;
  maxHealth: number;
  currentPower: number;
  canAttack: boolean;
  chargesRemaining?: number;
  statuses: UnitStatusEffects;
}

export interface PlayerState {
  id: string;
  name: string;
  title: string;
  health: number;
  maxHealth: number;
  essence: number;
  maxEssence: number;
  deck: Card[];
  hand: Card[];
  graveyard: Card[];
  champion: BattlefieldSlot | null;
  weapon: BattlefieldSlot | null;
  frontline: BattlefieldSlot[]; // Up to 3 creatures/beasts
  shield: number;
  statuses?: PlayerStatusEffects;
}

// ================= HAZARD DECK & ENVIRONMENT TYPES =================

export type HazardTier = 'Tier I' | 'Tier II' | 'Tier III' | 'Planar Cataclysm';
export type HazardEffectCategory = 'Environmental' | 'Buff Surge' | 'Debuff Storm' | 'Spatial Shift' | 'Tectonic Rupture' | 'Leyline Overload';

export interface HazardCard {
  id: string;
  name: string;
  subtitle: string;
  domain: Domain | 'Neutral';
  tier: HazardTier;
  threatLevel: 1 | 2 | 3 | 4 | 5; // Stars (1-5)
  category: HazardEffectCategory;
  roundDuration: number; // How many turns it stays active (e.g. 2 or 3)
  icon: string; // Emoji
  bgGradient: string;
  accentColor: string;
  flavorText: string;
  description: string;
  triggerTiming: 'On Draw' | 'Turn Start' | 'Turn End' | 'On Spell Cast' | 'On Attack';
  buffTarget?: 'player' | 'opponent' | 'all' | 'radiance' | 'sanctuary' | 'verdance' | 'abyss' | 'arcane';
  passiveEffectSummary: string;
  mechanicalClause: {
    burnApplied?: number;
    poisonApplied?: number;
    shieldGranted?: number;
    powerModifier?: number;
    healPerTurn?: number;
    essenceBonus?: number;
    frontlineDamage?: number;
  };
}

export interface HazardDeckPreset {
  id: string;
  name: string;
  subtitle: string;
  domain: Domain | 'Neutral';
  environmentId: string;
  description: string;
  icon: string;
  color: string;
  threatTier: string;
  cards: HazardCard[];
}

export type GamePhase = 'DRAW' | 'ESSENCE' | 'MAIN' | 'COMBAT' | 'END';

export interface CombatLogEntry {
  id: string;
  timestamp: string;
  type: 'attack' | 'spell' | 'summon' | 'heal' | 'death' | 'turn' | 'special';
  actor: 'player' | 'opponent' | 'system';
  message: string;
  iconName?: string;
  damageValue?: number;
}

export interface DeckPreset {
  id: string;
  name: string;
  title?: string;
  domain: Domain;
  description: string;
  strategy?: string;
  championCardId?: string;
  cardIds: string[];
  color?: string;
  accent?: string;
  synergyGrade?: SynergyGrade;
  difficulty?: string;
}

// ================= NEXUS TCG DESIGN LADDER TYPES =================

export type LadderPhase = 
  | 'Phase 1: Core Foundation (0-8)' 
  | 'Phase 2: Mechanics & Engine (9-17)' 
  | 'Phase 3: Set Design & Math (18-20)' 
  | 'Phase 4: Lore & Worldbuilding (21-24)' 
  | 'Phase 5: Playtest, Rules & Horizon (25-30)';

export interface LadderStage {
  id: number;
  stageNumber: number;
  title: string;
  question: string;
  deliverable: string;
  phase: LadderPhase;
  summary: string;
  formalDefinition: string;
  rulesText: string[];
  interactiveComponent?: 'power-calculator' | 'hazard-dice' | 'set-skeleton' | 'rules-bible' | 'starter-decks' | 'keywords' | 'zone-map' | 'timing-stack' | 'archetypes';
  keyTakeaways: string[];
  concreteExamples: string[];
  designPitfallsAvoided: string[];
}

export interface KeywordDefinition {
  name: string;
  domain: Domain | 'Universal';
  type: 'Trigger' | 'Static' | 'Action' | 'State';
  reminderText: string;
  rulesExplanation: string;
  sampleCard: string;
  pointCost: number;
}

export interface RuleSection {
  code: string;
  title: string;
  summary: string;
  subsections: {
    number: string;
    text: string;
  }[];
}

export interface JudgeFAQ {
  id: string;
  category: 'Timing' | 'Layers' | 'Hazards' | 'Replacement Effects' | 'Targeting' | 'Simultaneous Actions';
  question: string;
  ruling: string;
  relevantRules: string[];
}

export interface SetSkeletonEntry {
  domain: Domain | 'Neutral';
  rarity: Rarity;
  cost: number;
  cardType: CardType;
  role: string;
  sampleCardName: string;
  designIntent: string;
}

export type ArenaEnvironmentId = 
  | 'molten-caldera' 
  | 'celestial-sanctuary' 
  | 'eldervale-canopy' 
  | 'astral-nexus' 
  | 'abyssal-trench';

export interface ArenaEnvironment {
  id: ArenaEnvironmentId;
  name: string;
  subtitle: string;
  domain: Domain;
  bgGradient: string;
  boardOverlay: string;
  ambientColor: string;
  accentBorder: string;
  hazardEffectName: string;
  hazardEffectDesc: string;
  icon: string;
}

export interface MatchStats {
  damageDealtByPlayer: number;
  damageTakenByPlayer: number;
  spellsCastPlayer: number;
  spellsCastOpponent: number;
  unitsSummonedPlayer: number;
  unitsSummonedOpponent: number;
  unitsSlainPlayer: number;
  unitsSlainOpponent: number;
  essenceSpentPlayer: number;
  essenceSpentOpponent: number;
}

// ================= REALM OF NEXUS TCG STUDIO ARCHITECTURE TYPES =================

export type StudioAgentCategory = 
  | 'Command' 
  | 'Global Council' 
  | 'Foundational'
  | 'Validation'
  | 'Content'
  | 'Directorate'
  | 'Nuance'
  | 'Nuance Council' 
  | 'Domain Directorate' 
  | 'Domain Sub-Agent' 
  | 'Domain Specialist' 
  | 'Temporary Pairing';

export interface StudioAgentRole {
  id: string;
  name: string;
  category: StudioAgentCategory;
  domain?: Domain | 'Universal';
  responsibility: string;
  authorityLevel: string;
  canBlockLock: boolean;
  lockBlockingReason?: string;
  inputs?: string[];
  outputs?: string[];
  may?: string[];
  mayNot?: string[];
  stageRoadmap?: 'Stage A' | 'Stage B' | 'Stage C' | 'Stage D' | 'Stage E' | 'Stage F';
  activeStatus?: 'Locked v1.0' | 'In Construction' | 'Queued' | 'On-Demand';
}

export type NuanceSeverityLevel = 'N0' | 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

export interface NuanceSeverityInfo {
  level: NuanceSeverityLevel;
  meaning: string;
  lockEffect: string;
  color: string;
  description: string;
}

export type EscalationLevelId = 'E0' | 'E1' | 'E2' | 'E3' | 'E4' | 'E5';

export interface EscalationLevelInfo {
  level: EscalationLevelId;
  name: string;
  description: string;
  actors: string;
  resolutionPath: string;
}

export type SourceTierNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SourceTierInfo {
  tier: SourceTierNumber;
  name: string;
  description: string;
  authorityRank: string;
  overwritingRule: string;
  badgeColor: string;
}

export type DevelopmentStatusId = 
  | 'RECOVERED_HISTORICAL'
  | 'IDEA'
  | 'QUESTIONING'
  | 'PROPOSED'
  | 'PROTOTYPE'
  | 'INTERNAL_TEST'
  | 'SIMULATION'
  | 'HUMAN_PLAYTEST'
  | 'BALANCE_REVIEW'
  | 'RED_TEAM_REVIEW'
  | 'NUANCE_REVIEW'
  | 'APPROVED'
  | 'LOCKED'
  | 'EXPERIMENTAL'
  | 'LEGACY'
  | 'ARCHIVED'
  | 'REJECTED'
  | 'SUPERSEDED'
  | 'MECHANICS_PENDING'
  | 'ART_ONLY'
  | 'CANON_CONFLICT'
  | 'SOURCE_PENDING';

export interface QuestionFirstScenario {
  id: string;
  rawUserInput: string;
  title: string;
  category: 'Hazard' | 'Card Creation' | 'Mechanics / Keyword' | 'Foundational Rule' | 'Balance / Exploit';
  intentAnalysis: string[];
  questionTree: string[];
  assumptionsIdentified: string[];
  affectedSystems: string[];
  activatedAgents: string[];
  escalationLevel: EscalationLevelId;
  nuanceAudit: {
    agentId: string;
    finding: string;
    severity: NuanceSeverityLevel;
  }[];
  standardInputPacket: {
    taskId: string;
    objectId: string;
    currentStatus: DevelopmentStatusId;
    constraints: string[];
  };
  specialistFindings: {
    agentId: string;
    findingSummary: string;
    confidence: 'Very High' | 'High' | 'Medium' | 'Low';
    blocking: boolean;
  }[];
  cmd01DecisionBrief: {
    userGoal: string;
    currentState: string;
    whatWeKnow: string;
    whatRemainsUnknown: string;
    recommendedDirection: string;
    confidence: string;
    proposedStatus: DevelopmentStatusId;
    nextAction: string;
  };
}

export interface RoadmapStageInfo {
  stageId: string;
  stageName: string;
  phase: string;
  description: string;
  agentsIncluded: string[];
  status: 'Completed / Locked' | 'Active / Building' | 'Queued';
  deliverables: string[];
  dependencyPrerequisite: string;
}

// ================= STAGE A2 & STAGE B TYPES =================

export type QuestionDimension = 
  | 'Foundational' 
  | 'System' 
  | 'Card' 
  | 'Meta' 
  | 'Player Experience' 
  | 'Technical' 
  | 'Canon' 
  | 'Production';

export interface HiddenAssumption {
  id: string;
  statement: string;
  implicitPremise: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  rootFailureMode: string;
  recommendedValidation: string;
}

export interface DependencyNode {
  id: string;
  name: string;
  level: number;
  levelName: string;
  description: string;
  prerequisites: string[];
  affectedDownstream: string[];
  ownerAgent: string;
  status: 'LOCKED' | 'APPROVED' | 'IN_REVIEW' | 'PENDING';
}

export interface QuestionTreeDecomposition {
  dimension: QuestionDimension;
  title: string;
  coreQuestion: string;
  subQuestions: string[];
  keyConstraints: string[];
  assignedAgents: string[];
  priorityRank: number;
}

export interface FullQuestionAnalysisResult {
  inquiryId: string;
  rawInput: string;
  rootDesignProblem: string;
  classifiedCategory: string;
  primaryDimension: QuestionDimension;
  questionTree: QuestionTreeDecomposition[];
  hiddenAssumptions: HiddenAssumption[];
  dependencyChain: DependencyNode[];
  solvingOrder: string[];
  targetAgents: string[];
  estimatedEscalation: EscalationLevelId;
}

export interface FoundationalRuleDefinition {
  ruleNumber: string;
  title: string;
  formalText: string;
  precedenceLevel: number;
  edgeCaseNote?: string;
}

export interface FoundationalCouncilAgentSpec {
  agentId: 'GLO-01' | 'GLO-02' | 'GLO-03' | 'GLO-04' | 'GLO-05' | 'GLO-06';
  name: string;
  subtitle: string;
  role: string;
  coreAxioms: string[];
  rules: FoundationalRuleDefinition[];
  keyMetrics: { label: string; value: string; detail: string }[];
  status: 'Stage B Active' | 'Locked v1.0' | 'In Construction';
}

// ================= DAILY MISSIONS TYPES =================

export type MissionCategory = 'battle' | 'forge' | 'collection' | 'deck' | 'mastery' | 'domain';

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  isClaimed: boolean;
  rewards: {
    shards: number;
    dust: number;
    xp: number;
    packType?: string;
  };
  domainAffinity?: Domain;
  icon: string;
  badge?: string;
  expiresInHours?: number;
}

// ================= SYNERGY ANALYZER TYPES =================

export type SynergyGrade = 'S+' | 'S' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';

export interface DistributionSlice {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface DeckSynergyReport {
  letterGrade: SynergyGrade;
  overallScore: number; // 0 - 100
  domainConsistencyScore: number; // 0 - 100
  attributeBalanceScore: number; // 0 - 100
  manaCurveScore: number; // 0 - 100
  keywordSynergyScore: number; // 0 - 100
  primaryDomain: Domain;
  secondaryDomain?: Domain;
  domainSpread: Record<Domain, number>;
  domainDistribution: DistributionSlice[];
  rarityDistribution: DistributionSlice[];
  cardTypeDistribution: DistributionSlice[];
  averageCost: number;
  totalPower: number;
  totalDefense: number;
  dominantArchetype: string;
  tempoPacing: 'Hyper-Aggro' | 'Midrange Tempo' | 'Control / Attrition' | 'Combo / OTK' | 'Balanced Realm';
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  comboSynergies: {
    cards: string[];
    title: string;
    description: string;
    synergyScore: number;
  }[];
}

// ================= DAILY STREAK TYPES =================

export interface DailyStreakDay {
  dayIndex: number; // 1 - 7
  shards: number;
  dust: number;
  xp: number;
  packReward?: string;
  isUnlocked: boolean;
  isClaimed: boolean;
  isCurrent: boolean;
  dateLabel: string;
}

export interface DailyStreakState {
  currentStreak: number;
  highestStreak: number;
  lastLoginDate: string; // ISO date string YYYY-MM-DD
  todayClaimed: boolean;
  totalConsecutiveLogins: number;
  streakDays: DailyStreakDay[];
}

export interface PriorityStackItem {
  id: string;
  sourceCard: Card;
  controller: 'player' | 'opponent';
  actionType: 'SPELL' | 'ATTACK' | 'REACTION' | 'HAZARD_TRIGGER' | 'ECHO';
  targetName?: string;
  description: string;
  essenceCost: number;
  momentumCost: number;
  speed: 'FAST' | 'ACTION' | 'REACTION';
  timestamp: number;
}

export interface WorldHazardState {
  activeHazard: HazardCard | null;
  horizonHazard: HazardCard | null;
  turnsUntilHorizonImpact: number;
  playerBraced: boolean;
  opponentBraced: boolean;
  hazardDeckCount: number;
  severityModifier: 0 | -1; // -1 if braced
  lingeringWeather: {
    name: string;
    domain: Domain;
    severity: 'Tier I' | 'Tier II' | 'Tier III';
    description: string;
    roundsRemaining: number;
    affectedLanes: ('Vanguard' | 'Flank' | 'Throne' | 'Backline')[];
  } | null;
}

export interface AdjudicatorKeyword {
  id: string;
  name: string;
  domain: Domain | 'Universal';
  type: 'Evergreen' | 'Domain Signature' | 'Tactical Action';
  speed: 'Passive' | 'Fast Reaction' | 'Main Action' | 'Triggered';
  reminderText: string;
  formalRulesText: string;
  clarifications: string[];
  counterplayTip: string;
  relatedCardIds: string[];
}

export interface JudgeCaseScenario {
  id: string;
  title: string;
  category: 'Layer Priority' | 'Simultaneous Death' | 'Reaction Interruption' | 'Hazard Mitigation' | 'Spatial Bypass';
  conflictingMechanics: string[];
  cardExamples: string[];
  scenarioPrompt: string;
  stepByStepFlow: {
    step: number;
    phase: string;
    action: string;
    rulingLayer: string;
  }[];
  officialRuling: string;
  rulesCitation: string;
}

export interface DiegeticFrameConfig {
  material: 'inferium' | 'aegis_stone' | 'living_bark' | 'necrosteel' | 'storm_metal' | 'standard_codex';
  finish: 'none' | 'gold_leaf' | 'prismatic_holo' | 'cosmic_starlight' | 'etched_relic';
  borderGlow: boolean;
  showTextureNoise: boolean;
  accentEngraving: boolean;
}

// ================= AGENT INTERACTION TYPES =================

export interface ArbiterRulingResponse {
  source: string;
  verdict: string;
  summary: string;
  ruleCitations: string[];
  executionStack: {
    order: number;
    phase: string;
    action: string;
    timingLayer: string;
  }[];
  layerApplicable: number | null;
  penaltyPrecedence?: string;
  tacticalAdvice?: string;
  relatedKeywords?: string[];
}

export interface CampaignNode {
  id: string;
  realmId: Domain;
  title: string;
  subtitle: string;
  nodeType: 'battle' | 'shrine' | 'hazard' | 'titan_boss';
  difficulty: 'Novice' | 'Veteran' | 'Master' | 'Apex';
  description: string;
  rewards: {
    gold: number;
    shards: number;
    dust: number;
    boosterPack?: string;
    specialCardName?: string;
  };
  enemyDeckPresetId: string;
  titanBossId?: string;
  hazardCondition?: string;
  position: { x: number; y: number }; // percentage coordinates 0-100
  unlockedByDefault?: boolean;
  requiredNodeIds?: string[];
}

export interface CampaignProgress {
  clearedNodeIds: string[];
  starsEarned: number;
  unlockedRealms: Domain[];
  relicsAcquired: string[];
}

export interface AgentChatMessage {
  id: string;
  agentId: string;
  agentName: string;
  category: string;
  sender: 'user' | 'agent' | 'system' | 'council';
  text: string;
  timestamp: string;
  nuanceRating?: string;
  actionAuthority?: string;
  rulesCited?: string[];
  verdict?: 'INFO' | 'PASS' | 'FLAG' | 'MODIFIED' | 'APPROVED' | 'REQUIRES_REVISION' | string;
}


