import { Domain } from '../types';

export interface RealmArtTheme {
  id: string;
  name: string;
  subtitle: string;
  domain: Domain | 'Nexus';
  color: string;
  secondaryColor: string;
  accentGlow: string;
  bgGradient: string;
  borderClass: string;
  sigil: string;
  championName: string;
  championTitle: string;
  lore: string;
  atmosphereParticles: 'celestial' | 'lightning' | 'embers' | 'spectral' | 'emerald' | 'stardust';
  sceneryTitle: string;
  sceneryDescription: string;
  architecturalStyle: string;
  lightingMood: string;
  ambientSoundTheme: 'Sanctuary' | 'Arcane' | 'Radiance' | 'Abyss' | 'Verdance' | 'Neutral';
}

export const REALM_ART_THEMES: Record<string, RealmArtTheme> = {
  Nexus: {
    id: 'Nexus',
    name: 'Realm of Nexus',
    subtitle: 'The Convergence of Five Divine Dimensions',
    domain: 'Nexus',
    color: '#f59e0b',
    secondaryColor: '#38bdf8',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    bgGradient: 'from-slate-950 via-indigo-950/40 to-stone-950',
    borderClass: 'border-amber-500/50',
    sigil: '⚡',
    championName: 'The Arch-Architect',
    championTitle: 'Weaver of the Five Realms',
    lore: 'At the cosmic axis of reality floats the Master Nexus—a colossal celestial astrolabe bridging Sanctuary, Tempest, Radiance, Verdance, and Abyss via glowing runic highways.',
    atmosphereParticles: 'stardust',
    sceneryTitle: 'The Celestial Astral Axis',
    sceneryDescription: 'Grand panoramic viewpoint overlooking the cosmic convergence gate, where celestial bridges branch outward into the five sovereign elemental territories.',
    architecturalStyle: 'Astral Gothic & Celestial Astrolabe Geometry with golden viaducts and runic circles.',
    lightingMood: 'Cosmic twilight with pulsing blue crystal starlight and radiant gold conduits.',
    ambientSoundTheme: 'Neutral'
  },
  Sanctuary: {
    id: 'Sanctuary',
    name: 'Sanctuary of the Sun',
    subtitle: 'The Gilded Ivory Cathedral & Celestial Vanguard',
    domain: 'Sanctuary',
    color: '#eab308',
    secondaryColor: '#60a5fa',
    accentGlow: 'rgba(234, 179, 8, 0.45)',
    bgGradient: 'from-stone-950 via-amber-950/30 to-sky-950/30',
    borderClass: 'border-amber-400/60',
    sigil: '☀️',
    championName: 'Aurelius, Sun Champion',
    championTitle: 'High Bellringer of the Celestial Spires',
    lore: 'Floating amidst sunlit cloud citadels, Sanctuary is a breathtaking metropolis of soaring ivory buttresses, gilded spires, and colossal cobalt stained glass mandalas that channel divine wards.',
    atmosphereParticles: 'celestial',
    sceneryTitle: 'The Ivory High Cathedrals',
    sceneryDescription: 'Sunbeams pierces through cloud banks to illuminate endless white-gold spires, floating astral rings, and solemn legions in polished plate.',
    architecturalStyle: 'High Gothic Cathedral with ivory marble, gold filigree buttresses, and cobalt stained glass.',
    lightingMood: 'High-noon divine luminescence, warm gold halos, and radiant solar caustics.',
    ambientSoundTheme: 'Sanctuary'
  },
  Tempest: {
    id: 'Tempest',
    name: 'Tempest Sky Spire',
    subtitle: 'The Floating Airship Citadels & Storm Duelists',
    domain: 'Arcane',
    color: '#3b82f6',
    secondaryColor: '#38bdf8',
    accentGlow: 'rgba(59, 130, 246, 0.5)',
    bgGradient: 'from-slate-950 via-blue-950/40 to-cyan-950/30',
    borderClass: 'border-blue-400/60',
    sigil: '⚡',
    championName: 'Kaelen, Windblade Master',
    championTitle: 'Captain of the Skyfleet Corsairs',
    lore: 'Suspended in perpetual lightning tempests, the Sky Citadels anchor vast fleets of solar-sailed airships. Master duelists channel atmospheric plasma along energized blade edges.',
    atmosphereParticles: 'lightning',
    sceneryTitle: 'The Skyfleet Spire & Airship Bastions',
    sceneryDescription: 'Towering dark obsidian towers suspended in cloud banks with crackling storm arcs and levitating galleons patrolling the thunderous skies.',
    architecturalStyle: 'Aerodynamic Storm Gothic, levitating platforms, obsidian spires, and azure lightning conduits.',
    lightingMood: 'Deep midnight navy with blinding electric-blue lightning flashes and azure energy glows.',
    ambientSoundTheme: 'Arcane'
  },
  Radiance: {
    id: 'Radiance',
    name: 'Radiance Molten Bastion',
    subtitle: 'The Volcanic Iron Citadel & Magma Forge Engines',
    domain: 'Radiance',
    color: '#f97316',
    secondaryColor: '#eab308',
    accentGlow: 'rgba(249, 115, 22, 0.5)',
    bgGradient: 'from-stone-950 via-orange-950/40 to-red-950/30',
    borderClass: 'border-orange-500/60',
    sigil: '🔥',
    championName: 'Ignis, Lord of the Molten Anvil',
    championTitle: 'Titan of the Core Furnaces',
    lore: 'Carved directly from basalt mountains, Radiance is a blazing industrial fortress where magma rivers drive titanic forge hammers and colossal siege engines clad in tempered iron.',
    atmosphereParticles: 'embers',
    sceneryTitle: 'The Core Caldera & Iron Battlements',
    sceneryDescription: 'Cascading rivers of incandescent magma flowing down tiered iron fortresses, flanked by war banners and steam-venting industrial cranes.',
    architecturalStyle: 'Heavy Industrial Magma Citadel with dark basalt, volcanic vents, and glowing runic furnaces.',
    lightingMood: 'Intense forge glow, incandescent amber coals, and fiery atmospheric smoke.',
    ambientSoundTheme: 'Radiance'
  },
  Abyss: {
    id: 'Abyss',
    name: 'Abyss of the Soul King',
    subtitle: 'The Frozen Gothic Necropolis & Spectral Sovereign',
    domain: 'Abyss',
    color: '#06b6d4',
    secondaryColor: '#6366f1',
    accentGlow: 'rgba(6, 182, 212, 0.5)',
    bgGradient: 'from-neutral-950 via-cyan-950/40 to-slate-950',
    borderClass: 'border-cyan-500/60',
    sigil: '💀',
    championName: 'Malakor, Dread Sovereign',
    championTitle: 'Emperor of the Spectral Crypts',
    lore: 'A silent, mist-shrouded necropolis of obsidian spires and luminescent soul-wells. The Dread Sovereign commands legions of silent phantoms wielding frost-forged runeblades.',
    atmosphereParticles: 'spectral',
    sceneryTitle: 'The Spectral Throne & Nether Crypts',
    sceneryDescription: 'Towering skeletal towers rising from ethereal blue mists, illuminated by soul-beacon braziers and armored specters standing in eternal formation.',
    architecturalStyle: 'Dark Gothic Skeletal Architecture, black obsidian spires, and glowing soul-wells.',
    lightingMood: 'Cold cyan ethereal luminescence piercing dense midnight mist and dark stone shadows.',
    ambientSoundTheme: 'Abyss'
  },
  Verdance: {
    id: 'Verdance',
    name: 'Verdance World Tree',
    subtitle: 'The Ancient Forest Sanctuary & Primal Druids',
    domain: 'Verdance',
    color: '#10b981',
    secondaryColor: '#84cc16',
    accentGlow: 'rgba(16, 185, 129, 0.45)',
    bgGradient: 'from-stone-950 via-emerald-950/40 to-teal-950/30',
    borderClass: 'border-emerald-500/60',
    sigil: '🌿',
    championName: 'Sylvara, Elder of the Grove',
    championTitle: 'Guardian of the Great Roots',
    lore: 'Woven into the colossal branches of the primordial World Tree, Verdance is a sanctuary of glowing emerald waterfalls, bioluminescent moss, and giant stag guardians.',
    atmosphereParticles: 'emerald',
    sceneryTitle: 'The Canopy Cathedral & Sacred Springs',
    sceneryDescription: 'Living branch cathedrals with jade crystal lanterns, cascading water falls through moss-covered arches, and majestic antlered forest beasts.',
    architecturalStyle: 'Organic Botanical Architecture, living vine bridges, mossy stone menhirs, and canopy palaces.',
    lightingMood: 'Dappled emerald canopy sunlight, bioluminescent spore glows, and tranquil teal reflections.',
    ambientSoundTheme: 'Verdance'
  }
};

export const PAGE_REALM_PRESETS: Record<string, string> = {
  art: 'Nexus',
  studio: 'Nexus',
  docs: 'Sanctuary',
  domains: 'Nexus',
  grimoire: 'Tempest',
  ladder: 'Sanctuary',
  bible: 'Radiance',
  arena: 'Radiance',
  campaign: 'Sanctuary',
  set001: 'Nexus',
  gauntlet: 'Tempest',
  codex: 'Tempest',
  decks: 'Verdance',
  booster: 'Nexus',
  forge: 'Sanctuary',
  rules: 'Sanctuary',
  frames: 'Nexus',
  missions: 'Sanctuary',
  audio: 'Nexus',
  simulation: 'Nexus'
};
