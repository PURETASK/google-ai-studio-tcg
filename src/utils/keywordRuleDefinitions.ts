import { Domain } from '../types';

export interface KeywordRuleDefinition {
  keyword: string;
  aliases?: string[];
  domain: Domain | 'Universal';
  category: 'Defense' | 'Offense' | 'Tactical' | 'Elemental' | 'Disruption' | 'Universal';
  summary: string;
  officialRuleText: string;
  triggerTiming: 'Passive Aura' | 'Fast Reaction' | 'Main Action' | 'On Hit' | 'Dawn Trigger' | 'On Death' | 'Continuous';
  mathematicalClause?: string;
  synergyTip?: string;
  counterplayTip?: string;
  iconSymbol: string;
  lucideIconName: string;
  color: string;
}

export const OFFICIAL_KEYWORD_RULES: KeywordRuleDefinition[] = [
  // ================= SANCTUARY DOMAIN =================
  {
    keyword: 'Aegis',
    aliases: ['aegis shield', 'aegis barrier'],
    domain: 'Sanctuary',
    category: 'Defense',
    summary: 'Absorbs incoming damage before champion or unit health is reduced.',
    officialRuleText: 'Creates an energy buffer that absorbs damage equal to the Aegis value. Excess damage does not bleed into unit Health unless specifically stated by Pierce mechanics.',
    triggerTiming: 'Continuous',
    mathematicalClause: 'Incoming Damage = Max(0, Damage - AegisShield); Residual Aegis = Max(0, AegisShield - Damage)',
    synergyTip: 'Combos with Retribution; when Aegis shatters, retaliate against the attacker with holy damage.',
    counterplayTip: 'Use Pierce or Corrosive Acid spells that bypass or corrode shield buffers directly.',
    iconSymbol: '🛡️',
    lucideIconName: 'Shield',
    color: '#eab308'
  },
  {
    keyword: 'Taunt',
    aliases: ['provoke', 'guard'],
    domain: 'Sanctuary',
    category: 'Defense',
    summary: 'Forces opposing frontline units in this lane to attack this unit first.',
    officialRuleText: 'While a unit with Taunt is active in a vanguard lane, enemy attackers cannot bypass this unit to strike the Commander or backline sanctuaries directly unless using Ranged/Flank abilities.',
    triggerTiming: 'Continuous',
    mathematicalClause: 'Valid Targets = [TauntUnitsInLane] if TauntUnitsInLane.length > 0 else [AllUnitsInLane, Commander]',
    synergyTip: 'Position in the Center Vanguard with high-armor buffs to lock down high-damage opposing champions.',
    counterplayTip: 'Silence the unit to strip Taunt, or flank through unoccupied side lanes.',
    iconSymbol: '⚓',
    lucideIconName: 'Anchor',
    color: '#f59e0b'
  },
  {
    keyword: 'Retribution',
    aliases: ['reflect', 'thorns', 'holy counter'],
    domain: 'Sanctuary',
    category: 'Defense',
    summary: 'Reflects a percentage of physical damage received directly back to the attacker.',
    officialRuleText: 'Whenever this unit is struck by an attack or physical ability, the attacker immediately suffers holy damage equal to the Retribution value or half damage received.',
    triggerTiming: 'Fast Reaction',
    mathematicalClause: 'Retaliation Damage = Stated Retribution Value (or 50% of incoming attack power rounded up)',
    synergyTip: 'Stack on high-durability champions facing multihit glass cannons to turn their offensive tempo against them.',
    counterplayTip: 'Use ranged spells or non-damaging crowd control rather than direct physical attacks.',
    iconSymbol: '⚔️',
    lucideIconName: 'Crosshair',
    color: '#fbbf24'
  },
  {
    keyword: 'Benediction',
    aliases: ['blessing', 'consecration'],
    domain: 'Sanctuary',
    category: 'Tactical',
    summary: 'Imparts permanent stat boosts and debuff immunity to allied lane comrades.',
    officialRuleText: 'At Dawn Phase or on deployment, grants all adjacent allied units +1/+2 stats and removes all negative status effects (Burn, Poison, Blindness).',
    triggerTiming: 'Dawn Trigger',
    mathematicalClause: 'Target.CurrentHealth += 2, Target.CurrentPower += 1; Target.Statuses = ClearNegativeEffects()',
    synergyTip: 'Deploy behind frontline guardians in Backline Sanctuary to cleanse persistent hazard burns every turn.',
    counterplayTip: 'Disrupt backline shrines with global spells or high-mobility flanking assassins.',
    iconSymbol: '✨',
    lucideIconName: 'Sparkles',
    color: '#fde047'
  },

  // ================= RADIANCE DOMAIN =================
  {
    keyword: 'Scorch',
    aliases: ['burn', 'ignite', 'pyro'],
    domain: 'Radiance',
    category: 'Offense',
    summary: 'Inflicts persistent ticking heat damage and strips target armor points at turn start.',
    officialRuleText: 'Applies Scorch stacks to the target. At the beginning of the afflicted player’s turn, the target takes 2 fire damage per stack and loses 1 Armor point until dispelled or extinguished.',
    triggerTiming: 'Dawn Trigger',
    mathematicalClause: 'Ticking Damage = ScorchStacks * 2; ArmorReduction = Min(Target.Armor, ScorchStacks * 1)',
    synergyTip: 'Stack on high-defense vanguard tanks to melt their defenses before following up with lethal physical strikes.',
    counterplayTip: 'Cleanse using Sanctuary Benediction or douse with Verdance/Abyss tidal cleansing effects.',
    iconSymbol: '🔥',
    lucideIconName: 'Flame',
    color: '#ef4444'
  },
  {
    keyword: 'Solar Flare',
    aliases: ['blind', 'blinding flash'],
    domain: 'Radiance',
    category: 'Disruption',
    summary: 'Blinds enemy frontline defenders, halving their counter-attack retaliation.',
    officialRuleText: 'Discharges an intense solar nova that blinds target enemies for 1 round. Blinded targets suffer a 50% reduction to counter-attack damage and lose Stealth or Phasing.',
    triggerTiming: 'Main Action',
    mathematicalClause: 'Target.CounterAttackPower = Floor(Target.CurrentPower * 0.5); Target.Stealth = False',
    synergyTip: 'Cast right before attacking high-power champions so your attacker survives the counter-clash.',
    counterplayTip: 'Buff power prior to the clash or utilize non-combat spellcasts until the 1-turn blindness wears off.',
    iconSymbol: '☀️',
    lucideIconName: 'Sun',
    color: '#f97316'
  },
  {
    keyword: 'Dawnstrike',
    aliases: ['first strike', 'swift blade'],
    domain: 'Radiance',
    category: 'Offense',
    summary: 'Deals combat damage first in combat clashes before receiving counter-attack damage.',
    officialRuleText: 'Units with Dawnstrike deal combat damage before the defender strikes back. If the defender is eliminated during the Dawnstrike blow, the attacker takes 0 counter damage.',
    triggerTiming: 'On Hit',
    mathematicalClause: 'Attacker strikes Defender -> If Defender.Health <= 0: Clash terminates; Else: Defender retaliates.',
    synergyTip: 'Equip with power buffs; lethal Dawnstrike units can wipe opposing lines with zero damage received.',
    counterplayTip: 'Absorb with high-Shield Aegis defenders that survive the initial blow and crush the attacker in retaliation.',
    iconSymbol: '🗡️',
    lucideIconName: 'Sword',
    color: '#dc2626'
  },
  {
    keyword: 'Tectonic',
    aliases: ['fissure', 'earthquake'],
    domain: 'Radiance',
    category: 'Elemental',
    summary: 'Ruptures enemy lanes, forcing terrain hazards and dealing area rupture damage.',
    officialRuleText: 'Deals shockwave rupture damage to the primary target and 50% splash damage to adjacent enemy lanes. Leaves volcanic terrain that damages crossing units.',
    triggerTiming: 'Main Action',
    mathematicalClause: 'Primary Damage = X; Adjacent Lane Damage = Floor(X * 0.5)',
    synergyTip: 'Trigger when enemy lines are clustered in adjacent guard lanes to maximize splash efficiency.',
    counterplayTip: 'Spread units across distant flanks to minimize adjacent splash casualties.',
    iconSymbol: '🌋',
    lucideIconName: 'Mountain',
    color: '#b91c1c'
  },

  // ================= VERDANCE DOMAIN =================
  {
    keyword: 'Spore Swarm',
    aliases: ['spores', 'toxic cloud'],
    domain: 'Verdance',
    category: 'Elemental',
    summary: 'Releases reactive toxic wetland spores that poison and impair attacker accuracy.',
    officialRuleText: 'When struck by an enemy attack, releases a cloud of wetland spores. The attacker must make a DC 15 saving throw or become Poisoned, suffering -2 ATK for 2 rounds.',
    triggerTiming: 'Fast Reaction',
    mathematicalClause: 'On Melee Hit: Attacker.Statuses += Poison(2 turns, -2 ATK)',
    synergyTip: 'Place in Vanguard to debuff rapid multi-hit attackers before their subsequent swings.',
    counterplayTip: 'Attack with ranged champions or eliminate the spore unit with direct spell bursts.',
    iconSymbol: '🍄',
    lucideIconName: 'Wind',
    color: '#10b981'
  },
  {
    keyword: 'Ironbark',
    aliases: ['living wood', 'hardened bark'],
    domain: 'Verdance',
    category: 'Defense',
    summary: 'Absorbs a flat amount of damage from every incoming physical and elemental attack.',
    officialRuleText: 'Reduces all incoming damage from non-True damage sources by the stated Ironbark value (e.g. Ironbark 2 reduces every attack by 2).',
    triggerTiming: 'Continuous',
    mathematicalClause: 'Net Damage = Max(1, IncomingDamage - IronbarkValue)',
    synergyTip: 'Extremely effective against multihit flurry attacks and small minion swarms.',
    counterplayTip: 'Hit with single heavy alpha-strike blows or armor-piercing abyssal decay.',
    iconSymbol: '🌲',
    lucideIconName: 'TreePine',
    color: '#059669'
  },
  {
    keyword: 'Neurotoxin',
    aliases: ['venom', 'paralytic'],
    domain: 'Verdance',
    category: 'Disruption',
    summary: 'Drains enemy momentum and prevents affected units from utilizing activated abilities.',
    officialRuleText: 'Injects paralyzing organic venom into the target. Affected units cannot activate skills or bonus actions for 1 round and the opponent loses 1 Momentum point.',
    triggerTiming: 'On Hit',
    mathematicalClause: 'Target.Silenced = 1 Turn; Opponent.Momentum = Max(0, Opponent.Momentum - 1)',
    synergyTip: 'Target key combo champions before their big combo turn to paralyze their strategy.',
    counterplayTip: 'Cleanse immediately with Sanctuary spells or pre-emptively cast abilities before getting struck.',
    iconSymbol: '💧',
    lucideIconName: 'Droplet',
    color: '#047857'
  },
  {
    keyword: 'Entangle',
    aliases: ['roots', 'creeping vines'],
    domain: 'Verdance',
    category: 'Disruption',
    summary: 'Pins enemy units in their current lane, disabling lane switching and flanking maneuvers.',
    officialRuleText: 'Roots the target in place for 2 turns. Entangled units cannot be relocated between lanes and suffer disadvantage on evasion checks.',
    triggerTiming: 'Fast Reaction',
    mathematicalClause: 'Target.CanRelocate = False; Target.Evasion = 0',
    synergyTip: 'Lock high-mobility flankers into bad lane matchups facing your high-armor vanguard.',
    counterplayTip: 'Use Arcane teleportation or Phase Shift spells to break free of organic roots.',
    iconSymbol: '🌿',
    lucideIconName: 'Compass',
    color: '#34d399'
  },

  // ================= ARCANE DOMAIN =================
  {
    keyword: 'Chrono Stasis',
    aliases: ['stasis', 'time freeze', 'phase lock'],
    domain: 'Arcane',
    category: 'Disruption',
    summary: 'Freezes target in a temporal loop; target cannot act, attack, or be targeted for 1 turn.',
    officialRuleText: 'Places the target unit in temporal stasis until the start of your next turn. While in stasis, the unit cannot take actions, attack, or trigger passives, but is also immune to all damage.',
    triggerTiming: 'Main Action',
    mathematicalClause: 'Target.IsPhaseLocked = True; Target.IsInvulnerable = True (Duration: 1 Turn)',
    synergyTip: 'Use defensively to save a dying allied boss, or offensively to remove the opposing blocker for a lethal push.',
    counterplayTip: 'Chrono Stasis cannot be dispelled by normal spells; anticipate the unlock round and set up pre-emptive ambushes.',
    iconSymbol: '⏳',
    lucideIconName: 'Hourglass',
    color: '#3b82f6'
  },
  {
    keyword: 'Lightning Arc',
    aliases: ['chain lightning', 'shock arc', 'zap'],
    domain: 'Arcane',
    category: 'Offense',
    summary: 'Deals electrical shockwave damage that chains to adjacent enemy lanes.',
    officialRuleText: 'Strikes the target for lightning damage. If adjacent enemy units occupy neighboring lanes, the lightning chains to them, dealing half damage without triggering counter-attacks.',
    triggerTiming: 'Main Action',
    mathematicalClause: 'Target 1 = Full DMG; Target 2 (Adjacent) = Floor(DMG * 0.5); Target 3 (Adjacent) = Floor(DMG * 0.25)',
    synergyTip: 'Fires through clustered enemy formations to soften guard lines simultaneously.',
    counterplayTip: 'Disperse formations or position insulating Grounded / Ironbark defenders between squishy units.',
    iconSymbol: '⚡',
    lucideIconName: 'Zap',
    color: '#38bdf8'
  },
  {
    keyword: 'Overload',
    aliases: ['mana surge', 'amplification'],
    domain: 'Arcane',
    category: 'Tactical',
    summary: 'Expends additional Essence or Momentum to amplify spell power by 100%.',
    officialRuleText: 'When casting, you may pay an optional +2 Essence surcharge. If paid, all numeric values, damage dice, and target counts of the spell are doubled.',
    triggerTiming: 'Main Action',
    mathematicalClause: 'If Paid(OverloadCost): SpellEffect = BaseEffect * 2',
    synergyTip: 'Save unspent Momentum in the Kinetic Stash to finance massive Overload rounds on Turn 5+.',
    counterplayTip: 'Bait out the opponent’s base spells so they burn resources before achieving Overload thresholds.',
    iconSymbol: '💡',
    lucideIconName: 'Cpu',
    color: '#60a5fa'
  },
  {
    keyword: 'Scry',
    aliases: ['foresight', 'truesight', 'gaze'],
    domain: 'Arcane',
    category: 'Tactical',
    summary: 'Inspects top cards of deck or enemy hand and rearranges upcoming draw sequence.',
    officialRuleText: 'Look at the top 3 cards of your deck or 2 cards in the opponent’s hand. Put any number on top or bottom of your deck in any order, ensuring optimal hand flow.',
    triggerTiming: 'Main Action',
    mathematicalClause: 'InspectCards(3) -> Reorder(Deck.Top, Deck.Bottom)',
    synergyTip: 'Guarantee drawing your win condition champion or vital hazard counter at Dawn Phase.',
    counterplayTip: 'Shuffle opposing decks with Abyssal Banish spells or force instant unexpected draws.',
    iconSymbol: '👁️',
    lucideIconName: 'Eye',
    color: '#93c5fd'
  },

  // ================= ABYSS DOMAIN =================
  {
    keyword: 'Soul Siphon',
    aliases: ['lifesteal', 'life drain', 'siphon'],
    domain: 'Abyss',
    category: 'Offense',
    summary: 'Converts damage dealt to enemies directly into health for your champion or Commander.',
    officialRuleText: 'Whenever this unit deals combat damage to an enemy unit or Commander, restore health to your Commander or champion equal to the unmitigated damage dealt.',
    triggerTiming: 'On Hit',
    mathematicalClause: 'Healed Amount = ActualDamageDealt; Commander.Health = Min(30, Commander.Health + Healed Amount)',
    synergyTip: 'Attach to high-power weapons to heal back from near-death while crushing enemy blockers.',
    counterplayTip: 'Block with high-armor units or units with Divine Ward that negate damage before siphon triggers.',
    iconSymbol: '💀',
    lucideIconName: 'Skull',
    color: '#a855f7'
  },
  {
    keyword: 'Decay',
    aliases: ['rot', 'corrosion', 'wither'],
    domain: 'Abyss',
    category: 'Disruption',
    summary: 'Permanently reduces enemy maximum health and strips armor points without recovery.',
    officialRuleText: 'Damage dealt by this unit permanently reduces the target’s Maximum Health and Armor rather than just standard temporary health damage. Cannot be healed by standard rejuvenation spells.',
    triggerTiming: 'On Hit',
    mathematicalClause: 'Target.MaxHealth = Max(0, Target.MaxHealth - DamageDealt); Target.CurrentHealth = Min(Target.CurrentHealth, Target.MaxHealth)',
    synergyTip: 'The ultimate counter to Sanctuary Paladins and high-health boss titans that rely on continuous healing.',
    counterplayTip: 'Eliminate Decay units with ranged spells before they establish melee physical contact.',
    iconSymbol: '🧪',
    lucideIconName: 'Activity',
    color: '#9333ea'
  },
  {
    keyword: 'Reanimation',
    aliases: ['boneyard harvest', 'necromancy', 'resurrect'],
    domain: 'Abyss',
    category: 'Tactical',
    summary: 'Summons fallen units directly out of either player’s Graveyard into active vanguard lanes.',
    officialRuleText: 'Pulls a designated unit from the Boneyard into an empty vanguard lane. Reanimated units enter play with 50% health and gain the Undead creature subtype.',
    triggerTiming: 'Main Action',
    mathematicalClause: 'Target = Graveyard.Select(); Unit.Health = Floor(Target.MaxHealth * 0.5); PlaceInEmptyLane(Unit)',
    synergyTip: 'Reanimate powerful expensive units that were discarded during early game or milled into the boneyard.',
    counterplayTip: 'Exile cards from the graveyard with Sanctuary or Arcane banish spells before they can be reanimated.',
    iconSymbol: '🪦',
    lucideIconName: 'Layers',
    color: '#c084fc'
  },
  {
    keyword: 'Exile',
    aliases: ['banish', 'void lock'],
    domain: 'Abyss',
    category: 'Disruption',
    summary: 'Removes cards entirely from the match into the Void; cards in the Void cannot be reanimated.',
    officialRuleText: 'Banishes the designated card into the Void Zone. Exiled cards cannot be retrieved by Boneyard spells, resurrected, or interacted with for the remainder of the duel.',
    triggerTiming: 'Main Action',
    mathematicalClause: 'Card.Location = "VoidZone"; TriggerOnDeath = False; TriggerGraveyard = False',
    synergyTip: 'Completely neutralizes deathrattle abilities and prevents opponents from looping high-value champions.',
    counterplayTip: 'Protect key assets with Spell Immunity or Counter-spell reactions.',
    iconSymbol: '🔑',
    lucideIconName: 'Key',
    color: '#7e22ce'
  },

  // ================= UNIVERSAL / COMBAT KEYWORDS =================
  {
    keyword: 'Attunement',
    aliases: ['attuned', 'soul attunement'],
    domain: 'Universal',
    category: 'Universal',
    summary: 'Requires specific domain affinity or champion bonding to unlock full power.',
    officialRuleText: 'This artifact or spell requires the player to command a champion aligned with its matching Domain or pay an extra attunement cost. When attuned, all secondary abilities and passive auras activate.',
    triggerTiming: 'Continuous',
    mathematicalClause: 'If Commander.Domain == Card.Domain: Unlocked = True; Else: Unlocked = False (or Pay Extra Essence)',
    synergyTip: 'Build mono-domain or dual-domain decks to ensure seamless instant attunement on all legendary gear.',
    counterplayTip: 'Force the opponent off their primary domain champion or neutralize their attuned relics with Dispel.',
    iconSymbol: '⚙️',
    lucideIconName: 'Award',
    color: '#f59e0b'
  },
  {
    keyword: 'Momentum',
    aliases: ['momentum surge', 'kinetic stash'],
    domain: 'Universal',
    category: 'Universal',
    summary: 'Dynamic per-turn tactical resource scaled by turn count and dice rolls.',
    officialRuleText: 'Each turn, you receive base Momentum equal to min(12, TurnCount), and may roll a Momentum Die (d6 or d12) to add burst energy. Unspent Momentum can be converted to Kinetic Stash or Shield at turn end.',
    triggerTiming: 'Dawn Trigger',
    mathematicalClause: 'TurnMomentum = Min(12, TurnCount) + DiceRoll; Unspent -> Stash (Max 5) or Shield',
    synergyTip: 'Roll early in your turn before taking action to gauge whether high-cost momentum abilities can be funded.',
    counterplayTip: 'Use Verdance neurotoxin to drain unspent enemy momentum and prevent high-tier burst turns.',
    iconSymbol: '🎲',
    lucideIconName: 'Dices',
    color: '#eab308'
  },
  {
    keyword: 'Soulbound',
    aliases: ['soul-bound', 'bonded'],
    domain: 'Universal',
    category: 'Universal',
    summary: 'Locked to your hand or Commander; cannot be forcibly discarded or stolen.',
    officialRuleText: 'Soulbound cards cannot be targeted by enemy discard spells, stolen by mind control abilities, or knocked out of hand by abyssal effects.',
    triggerTiming: 'Passive Aura',
    mathematicalClause: 'ImmuneTo(Discard, Theft, ExileFromHand)',
    synergyTip: 'Designate your high-impact combo cards as Soulbound during the opening 11-7 Hand Setup protocol.',
    counterplayTip: 'Wait until the Soulbound card is physically cast and onto the battlefield to counter or destroy it.',
    iconSymbol: '🔒',
    lucideIconName: 'Lock',
    color: '#06b6d4'
  },
  {
    keyword: 'Evasion',
    aliases: ['dodge', 'agility', 'elusive'],
    domain: 'Universal',
    category: 'Tactical',
    summary: 'Grants a percentage chance or dexterity check to completely evade physical attacks.',
    officialRuleText: 'When targeted by an attack, this unit makes an Evasion check (DC 14). On success, the incoming attack misses completely and deals zero damage.',
    triggerTiming: 'Fast Reaction',
    mathematicalClause: 'Roll(1d20 + Mobility) >= 14 ? Damage = 0 : Damage = Full',
    synergyTip: 'High-mobility flankers with Evasion can trade against heavy brawlers without sustaining fatal blows.',
    counterplayTip: 'Target with sure-hit spells or area-of-effect hazards that bypass evasion checks.',
    iconSymbol: '💨',
    lucideIconName: 'Feather',
    color: '#14b8a6'
  },
  {
    keyword: 'Pierce',
    aliases: ['armor piercing', 'true damage'],
    domain: 'Universal',
    category: 'Offense',
    summary: 'Ignores enemy Shield and Armor values, dealing direct damage to health.',
    officialRuleText: 'Damage dealt with Pierce bypasses all active Shield, Aegis, and Armor mitigation, applying directly to the defender’s core Health pool.',
    triggerTiming: 'On Hit',
    mathematicalClause: 'Defender.Health -= DamageDealt (Shield and Armor ignored completely)',
    synergyTip: 'Deadly against high-armor Sanctuary paladins that rely on large shield reserves.',
    counterplayTip: 'Rely on Evasion or Damage Immunity spells rather than relying on armor or shields.',
    iconSymbol: '🎯',
    lucideIconName: 'Crosshair',
    color: '#f43f5e'
  }
];

/**
 * Finds the official rule definition for a keyword or ability name.
 * Searches exact keyword matches, aliases, and substring matches.
 */
export function findKeywordRule(searchQuery: string, fallbackDomain?: Domain): KeywordRuleDefinition | null {
  if (!searchQuery) return null;
  const q = searchQuery.trim().toLowerCase();

  // 1. Exact keyword match
  const exact = OFFICIAL_KEYWORD_RULES.find(
    (k) => k.keyword.toLowerCase() === q
  );
  if (exact) return exact;

  // 2. Alias match
  const aliasMatch = OFFICIAL_KEYWORD_RULES.find(
    (k) => k.aliases?.some((a) => a.toLowerCase() === q)
  );
  if (aliasMatch) return aliasMatch;

  // 3. Substring inclusion match (e.g. "Pyro Scorch" contains "Scorch")
  const substringMatch = OFFICIAL_KEYWORD_RULES.find(
    (k) => q.includes(k.keyword.toLowerCase()) || (k.aliases && k.aliases.some((a) => q.includes(a.toLowerCase())))
  );
  if (substringMatch) return substringMatch;

  // 4. Domain fallback match if applicable
  if (fallbackDomain) {
    const domainMatch = OFFICIAL_KEYWORD_RULES.find(
      (k) => k.domain === fallbackDomain && (q.includes(k.keyword.toLowerCase().slice(0, 4)))
    );
    if (domainMatch) return domainMatch;
  }

  return null;
}

/**
 * Scans a given card description or ability text and returns all identified keywords.
 */
export function extractKeywordsFromText(text: string): KeywordRuleDefinition[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const matched: KeywordRuleDefinition[] = [];

  for (const rule of OFFICIAL_KEYWORD_RULES) {
    const matchesKeyword = lower.includes(rule.keyword.toLowerCase());
    const matchesAlias = rule.aliases?.some((a) => lower.includes(a.toLowerCase()));
    if (matchesKeyword || matchesAlias) {
      if (!matched.some((m) => m.keyword === rule.keyword)) {
        matched.push(rule);
      }
    }
  }

  return matched;
}
