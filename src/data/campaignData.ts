import { CampaignNode, Domain } from '../types';

export const CAMPAIGN_SECTORS: { domain: Domain; name: string; subtitle: string; description: string; color: string; icon: string }[] = [
  {
    domain: 'Sanctuary',
    name: 'Sanctuary of the Radiant Dawn',
    subtitle: 'Chapter I: The Golden Bastion',
    description: 'Traverse the sun-drenched alabaster towers where holy paladins and shieldbearers guard the ancient Aegis Font.',
    color: 'from-amber-500/20 via-yellow-500/10 to-stone-950',
    icon: '☀️'
  },
  {
    domain: 'Verdance',
    name: 'Eldervale Wilds',
    subtitle: 'Chapter II: The Ancient Canopy',
    description: 'Venture through untamed primordial jungles, overgrown hydra groves, and mana-surging ley-line fountains.',
    color: 'from-emerald-500/20 via-green-500/10 to-stone-950',
    icon: '🌿'
  },
  {
    domain: 'Tempest',
    name: 'Tempest Spire Skydocks',
    subtitle: 'Chapter III: Cloudveil Thunderfields',
    description: 'Ascend floating skydocks amid relentless lightning tempests and high-velocity aerial corsairs.',
    color: 'from-cyan-500/20 via-blue-500/10 to-stone-950',
    icon: '⚡'
  },
  {
    domain: 'Radiance',
    name: 'Pyrepeak Volcanic Caldera',
    subtitle: 'Chapter IV: The Molten Forge',
    description: 'Braving burning magma fissures, berserker warbands, and searing elemental eruptions.',
    color: 'from-red-500/20 via-orange-500/10 to-stone-950',
    icon: '🔥'
  },
  {
    domain: 'Abyss',
    name: 'Abyssal Chasm & The Dread Citadel',
    subtitle: 'Chapter V: The Stygian Void',
    description: 'Descend into absolute darkness to challenge the Soul Harvester and the ancient Titan Behemoth.',
    color: 'from-purple-500/20 via-slate-900/40 to-stone-950',
    icon: '💀'
  }
];

export const CAMPAIGN_NODES: CampaignNode[] = [
  // Sector 1: Sanctuary
  {
    id: 'node-san-1',
    realmId: 'Sanctuary',
    title: 'Outpost of the Sunward Guard',
    subtitle: 'Encounter 1-1',
    nodeType: 'battle',
    difficulty: 'Novice',
    description: 'Defeat the border patrol sentinels testing your tactical prowess and lane positioning.',
    rewards: { gold: 120, shards: 40, dust: 25 },
    enemyDeckPresetId: 'sanctuary-starter',
    position: { x: 12, y: 35 },
    unlockedByDefault: true
  },
  {
    id: 'node-san-2',
    realmId: 'Sanctuary',
    title: 'Font of the Dawn Paladins',
    subtitle: 'Shrine 1-2',
    nodeType: 'shrine',
    difficulty: 'Novice',
    description: 'Commune with the sacred font to receive a consecrated blessing and bonus essence crystals.',
    rewards: { gold: 200, shards: 80, dust: 50, specialCardName: 'Aegis Sentinel' },
    enemyDeckPresetId: 'sanctuary-starter',
    position: { x: 28, y: 22 },
    requiredNodeIds: ['node-san-1']
  },
  {
    id: 'node-san-3',
    realmId: 'Sanctuary',
    title: 'Aura of the Solar Tempest',
    subtitle: 'Hazard Encounter 1-3',
    nodeType: 'hazard',
    difficulty: 'Veteran',
    description: 'Battle under the blinding light of the Solar Flare hazard. Practice using the Brace command.',
    rewards: { gold: 250, shards: 100, dust: 60 },
    enemyDeckPresetId: 'radiance-burn',
    hazardCondition: 'Solar Surge: Unbraced units suffer -1 Defense at Dawn.',
    position: { x: 44, y: 40 },
    requiredNodeIds: ['node-san-2']
  },
  {
    id: 'node-san-4',
    realmId: 'Sanctuary',
    title: 'Citadel of Sovereign Auriel',
    subtitle: 'Titan Apex Gate 1-4',
    nodeType: 'titan_boss',
    difficulty: 'Master',
    description: 'Challenge the Titan Sentinel in an epic boss duel to unlock the Verdance World Portal.',
    rewards: { gold: 600, shards: 300, dust: 200, boosterPack: 'Sanctuary Radiant Foil Pack' },
    enemyDeckPresetId: 'sanctuary-control',
    titanBossId: 'titan-solaris',
    position: { x: 62, y: 28 },
    requiredNodeIds: ['node-san-3']
  },

  // Sector 2: Verdance
  {
    id: 'node-ver-1',
    realmId: 'Verdance',
    title: 'Overgrown Eldervale Leylines',
    subtitle: 'Encounter 2-1',
    nodeType: 'battle',
    difficulty: 'Veteran',
    description: 'Clash with rapid ramp beasts and swarm tokens multiplying across open lanes.',
    rewards: { gold: 280, shards: 110, dust: 75 },
    enemyDeckPresetId: 'verdance-ramp',
    position: { x: 20, y: 70 },
    requiredNodeIds: ['node-san-4']
  },
  {
    id: 'node-ver-2',
    realmId: 'Verdance',
    title: 'Great Tree of the Ancients',
    subtitle: 'Shrine 2-2',
    nodeType: 'shrine',
    difficulty: 'Veteran',
    description: 'Harvest fertile sap to unlock primordial evolutions and custom frame materials.',
    rewards: { gold: 350, shards: 150, dust: 100, specialCardName: 'Eldervale Behemoth' },
    enemyDeckPresetId: 'verdance-ramp',
    position: { x: 42, y: 65 },
    requiredNodeIds: ['node-ver-1']
  },
  {
    id: 'node-ver-3',
    realmId: 'Verdance',
    title: 'Gorgon Maw Apex Gateway',
    subtitle: 'Titan Apex Gate 2-3',
    nodeType: 'titan_boss',
    difficulty: 'Master',
    description: 'Face the Colossal Hydra Titan with multi-lane regeneration before the Tempest skies.',
    rewards: { gold: 800, shards: 400, dust: 300, boosterPack: 'Verdance Primordial Pack' },
    enemyDeckPresetId: 'verdance-midrange',
    titanBossId: 'titan-primordial-hydra',
    position: { x: 68, y: 72 },
    requiredNodeIds: ['node-ver-2']
  },

  // Sector 3: Tempest
  {
    id: 'node-tmp-1',
    realmId: 'Tempest',
    title: 'Cloudveil Sky Skirmish',
    subtitle: 'Encounter 3-1',
    nodeType: 'battle',
    difficulty: 'Master',
    description: 'Aerial dogfight against high-speed Skyborn corsairs bypassing ground defense.',
    rewards: { gold: 450, shards: 200, dust: 150 },
    enemyDeckPresetId: 'tempest-skyfleet',
    position: { x: 30, y: 48 },
    requiredNodeIds: ['node-ver-3']
  },
  {
    id: 'node-tmp-2',
    realmId: 'Tempest',
    title: 'The Storm Conduit Apex',
    subtitle: 'Titan Apex Gate 3-2',
    nodeType: 'titan_boss',
    difficulty: 'Apex',
    description: 'Confront the Storm Sovereign Titan commanding lightning strikes and instant chain counters.',
    rewards: { gold: 1200, shards: 600, dust: 450, boosterPack: 'Tempest Stormfleet Foil Pack' },
    enemyDeckPresetId: 'tempest-control',
    titanBossId: 'titan-storm-sovereign',
    position: { x: 75, y: 45 },
    requiredNodeIds: ['node-tmp-1']
  },

  // Sector 4 & 5: Pyre & Abyss Final Bastion
  {
    id: 'node-aby-1',
    realmId: 'Abyss',
    title: 'The Stygian Gate & Dread Citadel',
    subtitle: 'Grand Finale Encounter',
    nodeType: 'titan_boss',
    difficulty: 'Apex',
    description: 'The ultimate duel against the Abyssal Void Sovereign and the Dread Lord of the Nexus.',
    rewards: { gold: 2500, shards: 1500, dust: 1000, boosterPack: 'Divine Boundless God Pack' },
    enemyDeckPresetId: 'abyss-soulbind',
    titanBossId: 'titan-abyssal-oblivion',
    position: { x: 88, y: 55 },
    requiredNodeIds: ['node-tmp-2']
  }
];

export const CAMPAIGN_STORAGE_KEY = 'realm_of_nexus_campaign_progress_v1';

export function loadCampaignProgress(): { clearedNodeIds: string[]; starsEarned: number; relicsAcquired: string[] } {
  try {
    const raw = localStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not load campaign progress:', err);
  }
  return {
    clearedNodeIds: ['node-san-1'], // First node unlocked/completed demo state
    starsEarned: 3,
    relicsAcquired: ['Sunward Crest']
  };
}

export function saveCampaignProgress(progress: { clearedNodeIds: string[]; starsEarned: number; relicsAcquired: string[] }) {
  try {
    localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Could not save campaign progress:', err);
  }
}
