import { Card, DeckPreset, Domain, DeckSynergyReport, SynergyGrade, DistributionSlice, Rarity, CardType } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { getCustomCardsSync } from './customCardStorage';

const DOMAIN_COLORS: Record<Domain, string> = {
  Sanctuary: '#eab308',
  Radiance: '#ef4444',
  Verdance: '#10b981',
  Arcane: '#3b82f6',
  Abyss: '#a855f7',
  Tempest: '#0ea5e9'
};

const RARITY_COLORS: Record<Rarity, string> = {
  'Common': '#94a3b8',
  'Uncommon': '#22c55e',
  'Rare': '#3b82f6',
  'Very Rare': '#a855f7',
  'Legendary': '#f59e0b',
  'Mythic': '#ec4899',
  'Divine Boundless': '#fbbf24'
};

const CARD_TYPE_COLORS: Record<CardType, string> = {
  'Champion': '#f59e0b',
  'Character': '#f97316',
  'Spell': '#3b82f6',
  'Weapon': '#ef4444',
  'Artifact': '#8b5cf6',
  'Armor': '#64748b',
  'Beast': '#10b981',
  'Relic': '#06b6d4',
  'Environment': '#84cc16',
  'Minion': '#d97706',
  'Ritual': '#ec4899',
  'Encounter': '#e11d48'
};

/**
 * Synergy Analyzer Utility
 * Evaluates custom decks for domain consistency, attribute balance, mana curve health,
 * and ability keyword interactions, generating a comprehensive letter grade and score.
 */
export function analyzeDeckSynergy(cardIds: string[], presetContext?: DeckPreset): DeckSynergyReport {
  // Resolve cards from database or custom storage
  const customCards = getCustomCardsSync();
  const allPool = [...CARDS_DATABASE, ...customCards];
  const deckCards: Card[] = cardIds
    .map(id => allPool.find(c => c.id === id))
    .filter((c): c is Card => c !== undefined);

  if (deckCards.length === 0) {
    return {
      letterGrade: 'D',
      overallScore: 0,
      domainConsistencyScore: 0,
      attributeBalanceScore: 0,
      manaCurveScore: 0,
      keywordSynergyScore: 0,
      primaryDomain: presetContext?.domain || 'Sanctuary',
      domainSpread: { Sanctuary: 0, Radiance: 0, Verdance: 0, Arcane: 0, Abyss: 0, Tempest: 0 },
      domainDistribution: [],
      rarityDistribution: [],
      cardTypeDistribution: [],
      averageCost: 0,
      totalPower: 0,
      totalDefense: 0,
      dominantArchetype: 'Empty Grimoire',
      tempoPacing: 'Balanced Realm',
      strengths: ['Deck is open for construction.'],
      weaknesses: ['No cards in deck.'],
      recommendations: ['Add at least 10-15 cards to activate tactical arena viability.'],
      comboSynergies: []
    };
  }

  // 1. Domain Spread & Consistency & Distribution
  const domainSpread: Record<Domain, number> = {
    Sanctuary: 0,
    Radiance: 0,
    Verdance: 0,
    Arcane: 0,
    Abyss: 0,
    Tempest: 0
  };

  deckCards.forEach(c => {
    domainSpread[c.domain] = (domainSpread[c.domain] || 0) + 1;
  });

  const domainDistribution: DistributionSlice[] = (Object.keys(domainSpread) as Domain[])
    .filter(dom => domainSpread[dom] > 0)
    .map(dom => ({
      name: dom,
      count: domainSpread[dom],
      percentage: Math.round((domainSpread[dom] / deckCards.length) * 100),
      color: DOMAIN_COLORS[dom] || '#eab308'
    }))
    .sort((a, b) => b.count - a.count);

  // 1b. Rarity Distribution
  const rarityCounts: Record<string, number> = {};
  deckCards.forEach(c => {
    rarityCounts[c.rarity] = (rarityCounts[c.rarity] || 0) + 1;
  });

  const rarityDistribution: DistributionSlice[] = Object.keys(rarityCounts).map(r => ({
    name: r,
    count: rarityCounts[r],
    percentage: Math.round((rarityCounts[r] / deckCards.length) * 100),
    color: RARITY_COLORS[r as Rarity] || '#94a3b8'
  })).sort((a, b) => b.count - a.count);

  // 1c. Card Type Distribution
  const typeCounts: Record<string, number> = {};
  deckCards.forEach(c => {
    typeCounts[c.cardType] = (typeCounts[c.cardType] || 0) + 1;
  });

  const cardTypeDistribution: DistributionSlice[] = Object.keys(typeCounts).map(t => ({
    name: t,
    count: typeCounts[t],
    percentage: Math.round((typeCounts[t] / deckCards.length) * 100),
    color: CARD_TYPE_COLORS[t as CardType] || '#8b5cf6'
  })).sort((a, b) => b.count - a.count);

  const sortedDomains = (Object.keys(domainSpread) as Domain[]).sort(
    (a, b) => domainSpread[b] - domainSpread[a]
  );
  const primaryDomain = sortedDomains[0];
  const secondaryDomain = domainSpread[sortedDomains[1]] > 0 ? sortedDomains[1] : undefined;

  const primaryCount = domainSpread[primaryDomain];
  const primaryRatio = primaryCount / deckCards.length;
  const secondaryCount = secondaryDomain ? domainSpread[secondaryDomain] : 0;
  const secondaryRatio = secondaryCount / deckCards.length;
  const activeDomainCount = Object.values(domainSpread).filter(count => count > 0).length;

  let domainConsistencyScore = 50;
  if (primaryRatio >= 0.85) {
    // Pure mono-domain synergy
    domainConsistencyScore = 95;
  } else if (primaryRatio >= 0.65 && secondaryRatio >= 0.25 && activeDomainCount <= 2) {
    // Focused dual-domain hybrid
    domainConsistencyScore = 90;
  } else if (activeDomainCount === 2) {
    domainConsistencyScore = 80;
  } else if (activeDomainCount === 3) {
    domainConsistencyScore = 65;
  } else {
    // 4 or 5 domains (heavy friction)
    domainConsistencyScore = Math.max(35, 75 - activeDomainCount * 10);
  }

  // 2. Mana Curve Health
  let costLow = 0; // 1-2
  let costMid = 0; // 3-4
  let costHigh = 0; // 5+
  let totalCost = 0;

  deckCards.forEach(c => {
    totalCost += c.cost;
    if (c.cost <= 2) costLow++;
    else if (c.cost <= 4) costMid++;
    else costHigh++;
  });

  const averageCost = Number((totalCost / deckCards.length).toFixed(1));
  const lowRatio = costLow / deckCards.length;
  const midRatio = costMid / deckCards.length;
  const highRatio = costHigh / deckCards.length;

  let manaCurveScore = 70;
  // Ideal ratio: Low 25-45%, Mid 35-50%, High 15-25%
  if (lowRatio >= 0.25 && midRatio >= 0.35 && highRatio <= 0.3) {
    manaCurveScore = 95;
  } else if (lowRatio >= 0.2 && midRatio >= 0.3) {
    manaCurveScore = 85;
  } else if (lowRatio < 0.15) {
    // Top-heavy, sluggish opening
    manaCurveScore = 55;
  } else if (highRatio > 0.45) {
    // Extremely expensive
    manaCurveScore = 50;
  } else {
    manaCurveScore = 75;
  }

  // 3. Attribute Balance (Combat Stats)
  const totalPower = deckCards.reduce((acc, c) => acc + c.power, 0);
  const totalDefense = deckCards.reduce((acc, c) => acc + c.defense, 0);
  const avgPower = totalPower / deckCards.length;
  const avgDefense = totalDefense / deckCards.length;
  const powerDefenseRatio = avgPower / (avgDefense || 1);

  let attributeBalanceScore = 75;
  if (powerDefenseRatio >= 0.7 && powerDefenseRatio <= 1.4 && avgPower >= 3.2 && avgDefense >= 3.5) {
    attributeBalanceScore = 92;
  } else if (powerDefenseRatio >= 0.5 && powerDefenseRatio <= 1.8) {
    attributeBalanceScore = 82;
  } else {
    attributeBalanceScore = 65;
  }

  // 4. Keyword & Combo Synergy Detection
  const allCardNames = new Set(deckCards.map(c => c.name.toLowerCase()));
  const allAbilities = deckCards.flatMap(c => c.abilities.map(a => `${a.name} ${a.description}`.toLowerCase()));
  const allGlyphs = deckCards.flatMap(c => (c.powerGlyphs || []).map(g => `${g.name} ${g.ruleClause}`.toLowerCase()));
  const combinedText = [...allAbilities, ...allGlyphs].join(' ');

  const hasTaunt = combinedText.includes('taunt') || combinedText.includes('vanguard') || combinedText.includes('shield wall');
  const hasShield = combinedText.includes('shield') || combinedText.includes('aegis') || combinedText.includes('divine protection');
  const hasBurn = combinedText.includes('burn') || combinedText.includes('magma') || combinedText.includes('flare') || combinedText.includes('ignite');
  const hasSpellcraft = combinedText.includes('spell') || combinedText.includes('arcane') || combinedText.includes('attunement') || combinedText.includes('mana');
  const hasSiphon = combinedText.includes('siphon') || combinedText.includes('lifesteal') || combinedText.includes('drain') || combinedText.includes('blood');
  const hasRegen = combinedText.includes('heal') || combinedText.includes('regenerate') || combinedText.includes('verdant') || combinedText.includes('bloom');
  const hasQuickstrike = combinedText.includes('quickstrike') || combinedText.includes('haste') || combinedText.includes('momentum') || combinedText.includes('flank');

  let keywordSynergyScore = 60;
  const synergyBonuses: number[] = [];

  if (hasTaunt && hasShield) {
    synergyBonuses.push(12); // Immovable Bulwark
  }
  if (hasBurn && hasSpellcraft) {
    synergyBonuses.push(10); // Pyromantic Resonance
  }
  if (hasSiphon && (hasTaunt || hasBurn)) {
    synergyBonuses.push(10); // Attrition Vampirism
  }
  if (hasRegen && hasTaunt) {
    synergyBonuses.push(10); // Eternal Sentinel
  }
  if (hasQuickstrike && avgPower > 3.8) {
    synergyBonuses.push(10); // Blitz Initiative
  }

  const detectedBonus = synergyBonuses.reduce((a, b) => a + b, 0);
  keywordSynergyScore = Math.min(98, 65 + detectedBonus);

  // 5. Detect specific named Combos
  const comboSynergies: DeckSynergyReport['comboSynergies'] = [];

  if (hasTaunt && hasShield) {
    comboSynergies.push({
      cards: deckCards.filter(c => c.defense >= 5).map(c => c.name).slice(0, 2),
      title: 'Aegis Fortress Synergy',
      description: 'Taunt guardians equipped with Divine Shields lock enemy combat lanes and negate retaliation bursts.',
      synergyScore: 92
    });
  }

  if (hasBurn && (primaryDomain === 'Radiance' || secondaryDomain === 'Radiance')) {
    comboSynergies.push({
      cards: deckCards.filter(c => c.domain === 'Radiance').map(c => c.name).slice(0, 2),
      title: 'Molten Ignition Loop',
      description: 'Spreading Magma Burn stacks converts enemy turn start ticks into guaranteed essence advantage.',
      synergyScore: 88
    });
  }

  if (hasRegen && (primaryDomain === 'Verdance' || secondaryDomain === 'Verdance')) {
    comboSynergies.push({
      cards: deckCards.filter(c => c.domain === 'Verdance').map(c => c.name).slice(0, 2),
      title: 'Verdant Spore Propagation',
      description: 'Continuous end-of-turn health regeneration outlasts burst damage in extended multi-phase matches.',
      synergyScore: 86
    });
  }

  if (hasSpellcraft && (primaryDomain === 'Arcane' || secondaryDomain === 'Arcane')) {
    comboSynergies.push({
      cards: deckCards.filter(c => c.domain === 'Arcane').map(c => c.name).slice(0, 2),
      title: 'Chrono-Stack Attunement',
      description: 'Fast reaction spells grant immediate priority chain manipulation and unblockable spellbursts.',
      synergyScore: 90
    });
  }

  if (hasSiphon && (primaryDomain === 'Abyss' || secondaryDomain === 'Abyss')) {
    comboSynergies.push({
      cards: deckCards.filter(c => c.domain === 'Abyss').map(c => c.name).slice(0, 2),
      title: 'Void Leech Reaping',
      description: 'Lifesteal attacks restore commander hit points while bypassing frontline armor with soul decay.',
      synergyScore: 89
    });
  }

  // 6. Overall Score & Letter Grade
  const weightedOverall = Math.round(
    domainConsistencyScore * 0.3 +
    manaCurveScore * 0.25 +
    attributeBalanceScore * 0.2 +
    keywordSynergyScore * 0.25
  );

  let letterGrade: SynergyGrade = 'B';
  if (weightedOverall >= 94) letterGrade = 'S+';
  else if (weightedOverall >= 89) letterGrade = 'S';
  else if (weightedOverall >= 83) letterGrade = 'A+';
  else if (weightedOverall >= 78) letterGrade = 'A';
  else if (weightedOverall >= 72) letterGrade = 'B+';
  else if (weightedOverall >= 65) letterGrade = 'B';
  else if (weightedOverall >= 55) letterGrade = 'C';
  else letterGrade = 'D';

  // 7. Pacing & Dominant Archetype
  let dominantArchetype = `${primaryDomain} Paradigm`;
  let tempoPacing: DeckSynergyReport['tempoPacing'] = 'Midrange Tempo';

  if (averageCost <= 2.8 && avgPower >= 3.6) {
    dominantArchetype = `${primaryDomain} Aggro Rush`;
    tempoPacing = 'Hyper-Aggro';
  } else if (averageCost >= 4.2 && avgDefense >= 5.0) {
    dominantArchetype = `${primaryDomain} Fortress Control`;
    tempoPacing = 'Control / Attrition';
  } else if (detectedBonus >= 20) {
    dominantArchetype = `${primaryDomain} Combo Engine`;
    tempoPacing = 'Combo / OTK';
  }

  // 8. Strengths, Weaknesses, and Recommendations
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  if (domainConsistencyScore >= 85) {
    strengths.push(`High ${primaryDomain} domain purity ensures reliable mana resonance and consistent ability triggers.`);
  } else {
    weaknesses.push(`Domain fragmentation across ${activeDomainCount} realms may cause draw inconsistency.`);
    recommendations.push(`Consolidate splash cards into 1 or 2 core domains to streamline tactical triggers.`);
  }

  if (manaCurveScore >= 85) {
    strengths.push(`Well-graduated mana curve (Avg: ${averageCost} Mana) provides smooth turns from early game to finishers.`);
  } else if (lowRatio < 0.2) {
    weaknesses.push(`Insufficient low-cost opening units (≤ 2 Mana: ${costLow} cards). Risk of yielding early board control.`);
    recommendations.push(`Add 2-3 agile 1-2 cost units to ensure defensive lane anchoring in Turns 1 & 2.`);
  } else if (highRatio > 0.4) {
    weaknesses.push(`Excessive high-cost finishers (≥ 5 Mana: ${costHigh} cards) may stall opening hand hands.`);
    recommendations.push(`Replace 1-2 expensive titans with flexible midgame utility spells.`);
  }

  if (hasTaunt && hasShield) {
    strengths.push(`Stout frontline defensive synergy capable of absorbing hostile burst and flank incursions.`);
  }

  if (hasBurn || hasQuickstrike) {
    strengths.push(`Strong proactive damage pressure with lethal board clear and rapid lane engagement.`);
  }

  if (strengths.length === 0) {
    strengths.push('Adaptable toolkit suitable for baseline realm skirmishes.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Test deck against Titan boss encounters in the Arena Clash to fine-tune edge-case matchups.');
  }

  return {
    letterGrade,
    overallScore: weightedOverall,
    domainConsistencyScore,
    attributeBalanceScore,
    manaCurveScore,
    keywordSynergyScore,
    primaryDomain,
    secondaryDomain,
    domainSpread,
    domainDistribution,
    rarityDistribution,
    cardTypeDistribution,
    averageCost,
    totalPower,
    totalDefense,
    dominantArchetype,
    tempoPacing,
    strengths,
    weaknesses,
    recommendations,
    comboSynergies
  };
}
