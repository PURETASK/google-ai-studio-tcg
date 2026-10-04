import { Card, Domain, Rarity } from '../types';
import { CARDS_DATABASE } from './cards';

export interface ArchetypePathway {
  id: string;
  name: string;
  domains: [Domain, Domain];
  tagline: string;
  description: string;
  keyMechanics: string[];
  signatureCombo: string;
  recommendedCardNames: string[];
  playstyle: 'Aggro / Tempo' | 'Midrange Ramp' | 'Control / Stasis' | 'Combo / Reanimation';
  difficulty: 'Novice' | 'Intermediate' | 'Master';
}

export const SET_001_ARCHETYPES: ArchetypePathway[] = [
  {
    id: 'arch-skyfire-overload',
    name: 'Skyfire Overload',
    domains: ['Radiance', 'Tempest'],
    tagline: 'Aerial supremacy fueled by reckless pyrotechnic bursts.',
    description: 'Combines the lightning-fast spellburst cascades of Tempest with the raw offensive burst of Radiance. Overload units deal colossal damage while Skyborn flyers bypass enemy Vanguard taunts.',
    keyMechanics: ['Overload', 'Skyborn Flight', 'Spellburst Cascades', 'Burn Debuff'],
    signatureCombo: 'Cast Zephyr Whirlwind to exhaust enemy guards, then unleash Sunburst Strike with an Overloaded attacker for lethal direct damage.',
    recommendedCardNames: ['Magma Jörmungandr', 'Zephyr Sky-Sovereign', 'Tempest Cloud-Skimmer', 'Solar Flare'],
    playstyle: 'Aggro / Tempo',
    difficulty: 'Novice'
  },
  {
    id: 'arch-solar-inquisition',
    name: 'Solar Inquisition',
    domains: ['Sanctuary', 'Radiance'],
    tagline: 'Righteous holy shields backed by blistering divine retribution.',
    description: 'Anchored by towering Sanctuary Aegis defenders that punish attackers with radiant counter-burn. Protects backline spellcasters while building insurmountable board presence.',
    keyMechanics: ['Aegis Ward', 'Stabilize', 'Retribution Burn', 'Vanguard Taunt'],
    signatureCombo: 'Equip Aegis of the Ophanim onto a Paladin Vanguard, forcing enemy attacks while radiating holy damage back onto opposing lanes.',
    recommendedCardNames: ['Michael Archangel', 'Solar Lance', 'Seraph of the Dawn', 'Aegis Guardian'],
    playstyle: 'Control / Stasis',
    difficulty: 'Intermediate'
  },
  {
    id: 'arch-martyrs-covenant',
    name: 'Martyr’s Covenant',
    domains: ['Abyss', 'Sanctuary'],
    tagline: 'Death is merely a currency for celestial resurrection.',
    description: 'Bends mortality to your will. Sacrifices low-cost thralls into Abyss Soul Vats to fuel colossal Sanctuary angels that revive fallen guardians back into Vanguard slots.',
    keyMechanics: ['Soulbinding', 'Rebirth', 'Consecrated Sacrifice', 'Divine Ward'],
    signatureCombo: 'Sacrifice a Soulbound Thrall to fill Soul Vat to 5, then cast Resurrection Halo to return 2 slain champions directly to the battlefield.',
    recommendedCardNames: ['Thanatos Soul-Reaper', 'Gabriel Archangel', 'Abyssal Construct', 'Martyr’s Shroud'],
    playstyle: 'Combo / Reanimation',
    difficulty: 'Master'
  },
  {
    id: 'arch-primeval-monsoon',
    name: 'Primeval Monsoon',
    domains: ['Verdance', 'Tempest'],
    tagline: 'Unstoppable nature nurtured by endless gale-force rains.',
    description: 'Exploits rapid Essence acceleration from Verdance roots with Tempest cyclone protection. Spreads wide token swarms that grow exponentially beneath torrential storm showers.',
    keyMechanics: ['Regeneration', 'Fogtouch Stasis', 'Essence Ramp', 'Spore Swarm'],
    signatureCombo: 'Deploy Eldervale Spore Mother, ramp to 8 Essence early, and cast Gale-Force Deluge to exhaust all enemy defenders while your treants swarm.',
    recommendedCardNames: ['Cernunnos Wild-Lord', 'Cyclone Elemental', 'Ironwood Colossus', 'Rain-Dancer Nymph'],
    playstyle: 'Midrange Ramp',
    difficulty: 'Intermediate'
  },
  {
    id: 'arch-rot-regrowth',
    name: 'Rot & Regrowth',
    domains: ['Abyss', 'Verdance'],
    tagline: 'From decay springs monstrous primeval life.',
    description: 'Utilizes the graveyard as a secondary hand. Seeds fallen units with fungal parasites that emerge as mutated elder horrors with high Power and Regeneration.',
    keyMechanics: ['Decay Counters', 'Graveyard Sprouting', 'Parasitic Drain', 'Soulbinding'],
    signatureCombo: 'Fill graveyard with cheap units, then summon Corpse-Root Behemoth with +1/+1 for every soul consumed.',
    recommendedCardNames: ['Gorgon Queen', 'World Tree Sprout', 'Necrosteel Fiend', 'Fungal Spore-Lord'],
    playstyle: 'Midrange Ramp',
    difficulty: 'Intermediate'
  },
  {
    id: 'arch-void-hurricane',
    name: 'Void Hurricane',
    domains: ['Tempest', 'Abyss'],
    tagline: 'A howling vortex that strips souls from flesh.',
    description: 'Chokes the opponent’s resource rhythm through Frost-Lock stasis and Momentum taxes, while siphoning their kinetic momentum directly into Abyssal death spells.',
    keyMechanics: ['Fogtouch', 'Soul Vat Siphon', 'Momentum Tax', 'Freeze-Lock'],
    signatureCombo: 'Lock the enemy Commander with Stasis Gale, then trigger Soul Vortex to drain 5 Health and gain 3 Momentum.',
    recommendedCardNames: ['Storm-Caller Lich', 'Eye of the Maelstrom', 'Void-Born Harpy', 'Shadow Cyclone'],
    playstyle: 'Control / Stasis',
    difficulty: 'Master'
  },
  {
    id: 'arch-eternal-eden',
    name: 'Eternal Eden',
    domains: ['Sanctuary', 'Verdance'],
    tagline: 'An impenetrable sanctuary of living ironwood and golden halos.',
    description: 'The premier defensive midrange fortress. Stacks double-layered Aegis armor on regenerating Colossi, completely shutting down hyper-aggressive rush strategies.',
    keyMechanics: ['Regeneration', 'Aegis Ward', 'Overgrowth', 'Vanguard Fortress'],
    signatureCombo: 'Grant Aegis Shield to an 8/8 Ironwood Treant with Regeneration 3, creating an unkillable lane blocker.',
    recommendedCardNames: ['Ophanim Wheel of Light', 'Ancient Oak Father', 'Sanctuary Sentinel', 'Nectar of Life'],
    playstyle: 'Midrange Ramp',
    difficulty: 'Novice'
  },
  {
    id: 'arch-ash-brimstone',
    name: 'Ash & Brimstone',
    domains: ['Radiance', 'Abyss'],
    tagline: 'Burn the world, then rule the smoking crater.',
    description: 'Aggressive self-damage archetype that converts your own lost Health into exponential damage multipliers and explosive death rattles.',
    keyMechanics: ['Overload', 'Soul Sacrifice', 'Pyroclysmic Burst', 'Death-Rattle Flame'],
    signatureCombo: 'Overload a Berserker for 10 damage, and when it perishes at Dusk, explode for 4 AoE damage to all enemy lanes.',
    recommendedCardNames: ['Infernal Doom-Bringer', 'Abyssal Hell-Hound', 'Molten Shard', 'Cinder Witch'],
    playstyle: 'Aggro / Tempo',
    difficulty: 'Intermediate'
  },
  {
    id: 'arch-wildfire-awakening',
    name: 'Wildfire Awakening',
    domains: ['Radiance', 'Verdance'],
    tagline: 'Combustible roots that ignite with devastating force.',
    description: 'Ramps quickly using forest leylines to drop massive fiery behemoths turns ahead of schedule, overwhelming midgame defenses.',
    keyMechanics: ['Essence Ramp', 'Overload', 'Trample Rush', 'Tectonic Bloom'],
    signatureCombo: 'Ramp to 7 Essence by Turn 4, then slam Magma Jörmungandr to lock down the board.',
    recommendedCardNames: ['Sun-Touched Dryad', 'Volcanic Sprout', 'Fire-Fang Wolf', 'Solar Titan'],
    playstyle: 'Midrange Ramp',
    difficulty: 'Novice'
  },
  {
    id: 'arch-astral-tempest',
    name: 'Astral Tempest',
    domains: ['Tempest', 'Arcane'],
    tagline: 'Infinite spell refraction through cosmic storm clouds.',
    description: 'Pure combo engine that cascades Echo spells through tempest lightning rings, casting multiple spells per turn without depleting your hand.',
    keyMechanics: ['Echo', 'Spellburst Cascade', 'Momentum Generation', 'Aether Chain'],
    signatureCombo: 'Cast Arcane Refraction, follow with Lightning Bolt (triggers Echo for free), and unleash Thunderclap for a 3-spell chain.',
    recommendedCardNames: ['Aethermancer Supreme', 'Storm Shaper', 'Arcane Conduit', 'Mirror Reflector'],
    playstyle: 'Combo / Reanimation',
    difficulty: 'Master'
  }
];

export interface Set001Stats {
  setName: string;
  code: string;
  totalCards: number;
  rarityBreakdown: {
    common: number;
    uncommon: number;
    rare: number;
    mythicLegendary: number;
  };
  domainBreakdown: Record<Domain, number>;
  averageCost: number;
  archetypeCount: number;
}

export function getSet001CuratedPool(): Card[] {
  // Return the first 100 balanced cards from CARDS_DATABASE
  if (CARDS_DATABASE.length <= 100) return [...CARDS_DATABASE];
  return CARDS_DATABASE.slice(0, 100);
}

export function generateSealedPool(packCount: number = 6): {
  packs: Card[][];
  allCards: Card[];
  rarityCount: Record<string, number>;
  domainCount: Record<Domain, number>;
} {
  const pool = getSet001CuratedPool();
  const commons = pool.filter(c => c.rarity === 'Common');
  const uncommons = pool.filter(c => c.rarity === 'Uncommon');
  const rares = pool.filter(c => c.rarity === 'Rare' || c.rarity === 'Very Rare');
  const mythics = pool.filter(c => c.rarity === 'Legendary' || c.rarity === 'Mythic' || c.rarity === 'Divine Boundless');

  // Fallbacks if pool subset is small
  const safeCommons = commons.length > 0 ? commons : pool;
  const safeUncommons = uncommons.length > 0 ? uncommons : pool;
  const safeRares = rares.length > 0 ? rares : pool;
  const safeMythics = mythics.length > 0 ? mythics : pool;

  const packs: Card[][] = [];
  const allCards: Card[] = [];
  const rarityCount: Record<string, number> = { Common: 0, Uncommon: 0, Rare: 0, Mythic: 0 };
  const domainCount: Record<Domain, number> = {
    Radiance: 0,
    Sanctuary: 0,
    Verdance: 0,
    Abyss: 0,
    Tempest: 0,
    Arcane: 0
  };

  const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  for (let p = 0; p < packCount; p++) {
    const packCards: Card[] = [];

    // 10 Commons
    for (let i = 0; i < 10; i++) {
      const card = { ...sample(safeCommons), instanceId: `sealed-${p}-c-${i}-${Date.now()}` };
      packCards.push(card);
      rarityCount.Common++;
    }

    // 3 Uncommons
    for (let i = 0; i < 3; i++) {
      const card = { ...sample(safeUncommons), instanceId: `sealed-${p}-u-${i}-${Date.now()}` };
      packCards.push(card);
      rarityCount.Uncommon++;
    }

    // 1 Rare or Mythic (1-in-6 chance for Mythic)
    const isMythic = Math.random() < 0.166;
    const rareSource = isMythic ? safeMythics : safeRares;
    const highCard = { ...sample(rareSource), instanceId: `sealed-${p}-r-${Date.now()}` };
    packCards.push(highCard);
    if (isMythic) rarityCount.Mythic++;
    else rarityCount.Rare++;

    // 1 Bonus Foil (Any card from pool with special holo sheen)
    const bonusFoil = {
      ...sample(pool),
      instanceId: `sealed-${p}-foil-${Date.now()}`,
      foilType: 'prismatic' as any
    };
    packCards.push(bonusFoil);
    rarityCount[bonusFoil.rarity] = (rarityCount[bonusFoil.rarity] || 0) + 1;

    packCards.forEach(c => {
      allCards.push(c);
      if (domainCount[c.domain] !== undefined) {
        domainCount[c.domain]++;
      }
    });

    packs.push(packCards);
  }

  return {
    packs,
    allCards,
    rarityCount,
    domainCount
  };
}
