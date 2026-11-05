import { Card, Domain } from '../types';

export interface CardArtPreset {
  id: string;
  title: string;
  subtitle: string;
  domain: Domain | 'Neutral';
  url: string;
  tag: string;
}

export interface DomainVisualIdentity {
  domain: Domain;
  frameTitle: string;
  frameArchitectureDesc: string;
  fontClass: string;
  fontDisplayLabel: string;
  sigil: string;
  primaryHex: string;
  secondaryHex: string;
  surfaceHex: string;
  accentHex: string;
  outerBorderClass: string;
  outerGlowShadow: string;
  topPlateGradient: string;
  bottomHudGradient: string;
  titleTextClass: string;
  kickerTextClass: string;
  abilityPillClass: string;
  glyphPillClass: string;
}

export const DOMAIN_VISUAL_IDENTITIES: Record<Domain, DomainVisualIdentity> = {
  Sanctuary: {
    domain: 'Sanctuary',
    frameTitle: 'Gilded Ivory Cathedral Arch',
    frameArchitectureDesc: 'Soaring twin fluted columns, sunburst monstrance crown, and white-marble keystone inlay.',
    fontClass: 'font-domain-sanctuary',
    fontDisplayLabel: 'Cinzel Decorative (Cathedral Serif)',
    sigil: '☀️',
    primaryHex: '#F59E0B',
    secondaryHex: '#FEF08A',
    surfaceHex: '#291D0E',
    accentHex: '#FFFBEB',
    outerBorderClass: 'border-amber-400/85',
    outerGlowShadow: 'shadow-[0_0_28px_rgba(245,158,11,0.32)]',
    topPlateGradient: 'from-amber-950/90 via-stone-900/85 to-amber-900/80 border-b border-amber-400/45',
    bottomHudGradient: 'from-stone-950/95 via-amber-950/80 to-stone-950/35 border-t border-amber-400/35',
    titleTextClass: 'text-amber-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]',
    kickerTextClass: 'text-amber-300/95',
    abilityPillClass: 'bg-amber-950/75 hover:bg-amber-900/90 border-amber-500/45 hover:border-amber-300 text-amber-100',
    glyphPillClass: 'bg-stone-950/80 hover:bg-amber-950/85 border-amber-500/30 hover:border-amber-400 text-amber-200'
  },
  Radiance: {
    domain: 'Radiance',
    frameTitle: 'Obsidian & Molten Slag Bastion',
    frameArchitectureDesc: 'Jagged volcanic basalt plates, glowing lava fissure veins, and a rising phoenix-wing apex crest.',
    fontClass: 'font-domain-radiance',
    fontDisplayLabel: 'Uncial Antiqua (Volcanic Runic Script)',
    sigil: '🔥',
    primaryHex: '#EF4444',
    secondaryHex: '#F97316',
    surfaceHex: '#2A0808',
    accentHex: '#FDE047',
    outerBorderClass: 'border-red-500/85',
    outerGlowShadow: 'shadow-[0_0_28px_rgba(239,68,68,0.35)]',
    topPlateGradient: 'from-red-950/92 via-orange-950/85 to-red-950/85 border-b border-orange-500/45',
    bottomHudGradient: 'from-stone-950/95 via-red-950/82 to-stone-950/35 border-t border-red-500/35',
    titleTextClass: 'text-orange-50 drop-shadow-[0_2px_5px_rgba(0,0,0,0.98)]',
    kickerTextClass: 'text-orange-300/95',
    abilityPillClass: 'bg-red-950/80 hover:bg-red-900/90 border-orange-500/45 hover:border-orange-300 text-orange-100',
    glyphPillClass: 'bg-stone-950/80 hover:bg-red-950/85 border-red-500/35 hover:border-orange-400 text-orange-200'
  },
  Verdance: {
    domain: 'Verdance',
    frameTitle: 'Entwined Living Elderwood',
    frameArchitectureDesc: 'Organic twisting tree-root borders, glowing emerald amber nodes, and a sprouting canopy crown.',
    fontClass: 'font-domain-verdance',
    fontDisplayLabel: 'Cormorant Garamond (Sylvan High-Contrast Serif)',
    sigil: '🌿',
    primaryHex: '#10B981',
    secondaryHex: '#34D399',
    surfaceHex: '#04261C',
    accentHex: '#A7F3D0',
    outerBorderClass: 'border-emerald-500/85',
    outerGlowShadow: 'shadow-[0_0_28px_rgba(16,185,129,0.32)]',
    topPlateGradient: 'from-emerald-950/92 via-teal-950/85 to-emerald-950/85 border-b border-emerald-400/45',
    bottomHudGradient: 'from-stone-950/95 via-emerald-950/82 to-stone-950/35 border-t border-emerald-400/35',
    titleTextClass: 'text-emerald-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]',
    kickerTextClass: 'text-emerald-300/95',
    abilityPillClass: 'bg-emerald-950/80 hover:bg-emerald-900/90 border-emerald-500/45 hover:border-emerald-300 text-emerald-100',
    glyphPillClass: 'bg-stone-950/80 hover:bg-emerald-950/85 border-emerald-500/30 hover:border-emerald-400 text-emerald-200'
  },
  Arcane: {
    domain: 'Arcane',
    frameTitle: 'Astral Astrolabe & Runic Filigree',
    frameArchitectureDesc: 'Precision geometric brass and sapphire rings, constellation lines, and a floating prism finial.',
    fontClass: 'font-domain-arcane',
    fontDisplayLabel: 'Forum (Classical Arcane Inscription)',
    sigil: '🔮',
    primaryHex: '#3B82F6',
    secondaryHex: '#818CF8',
    surfaceHex: '#0B112C',
    accentHex: '#E0F2FE',
    outerBorderClass: 'border-blue-400/85',
    outerGlowShadow: 'shadow-[0_0_28px_rgba(59,130,246,0.35)]',
    topPlateGradient: 'from-indigo-950/92 via-slate-900/88 to-blue-950/85 border-b border-blue-400/45',
    bottomHudGradient: 'from-slate-950/95 via-indigo-950/82 to-slate-950/35 border-t border-blue-400/35',
    titleTextClass: 'text-sky-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]',
    kickerTextClass: 'text-sky-300/95',
    abilityPillClass: 'bg-blue-950/80 hover:bg-blue-900/90 border-blue-400/45 hover:border-sky-300 text-sky-100',
    glyphPillClass: 'bg-slate-950/80 hover:bg-blue-950/85 border-blue-500/30 hover:border-sky-400 text-sky-200'
  },
  Tempest: {
    domain: 'Tempest',
    frameTitle: 'Sky-Steel Tesla Conduit',
    frameArchitectureDesc: 'Aerodynamic storm-fang plates, crackling plasma coils, and a twin lightning-rod crown.',
    fontClass: 'font-domain-tempest',
    fontDisplayLabel: 'Syne Bold (Kinetic Storm Display)',
    sigil: '⚡',
    primaryHex: '#06B6D4',
    secondaryHex: '#38BDF8',
    surfaceHex: '#06202B',
    accentHex: '#CFFAFE',
    outerBorderClass: 'border-cyan-400/85',
    outerGlowShadow: 'shadow-[0_0_28px_rgba(6,182,212,0.35)]',
    topPlateGradient: 'from-cyan-950/92 via-slate-900/88 to-sky-950/85 border-b border-cyan-400/45',
    bottomHudGradient: 'from-slate-950/95 via-cyan-950/82 to-slate-950/35 border-t border-cyan-400/35',
    titleTextClass: 'text-cyan-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]',
    kickerTextClass: 'text-cyan-300/95',
    abilityPillClass: 'bg-cyan-950/80 hover:bg-cyan-900/90 border-cyan-400/45 hover:border-cyan-200 text-cyan-100',
    glyphPillClass: 'bg-slate-950/80 hover:bg-cyan-950/85 border-cyan-500/30 hover:border-cyan-300 text-cyan-200'
  },
  Abyss: {
    domain: 'Abyss',
    frameTitle: 'Necrotic Bone & Void Iron',
    frameArchitectureDesc: 'Spiked gothic rib-arches, weeping violet soul-fire conduits, and a horned abyssal crown.',
    fontClass: 'font-domain-abyss',
    fontDisplayLabel: 'Pirata One (Gothic Blackletter)',
    sigil: '💀',
    primaryHex: '#A855F7',
    secondaryHex: '#E879F9',
    surfaceHex: '#160526',
    accentHex: '#F5D0FE',
    outerBorderClass: 'border-purple-500/85',
    outerGlowShadow: 'shadow-[0_0_28px_rgba(168,85,247,0.38)]',
    topPlateGradient: 'from-purple-950/92 via-neutral-950/88 to-fuchsia-950/85 border-b border-purple-500/45',
    bottomHudGradient: 'from-neutral-950/95 via-purple-950/82 to-neutral-950/35 border-t border-purple-500/35',
    titleTextClass: 'text-purple-50 drop-shadow-[0_2px_5px_rgba(0,0,0,0.98)]',
    kickerTextClass: 'text-purple-300/95',
    abilityPillClass: 'bg-purple-950/80 hover:bg-purple-900/90 border-purple-500/45 hover:border-fuchsia-300 text-purple-100',
    glyphPillClass: 'bg-neutral-950/80 hover:bg-purple-950/85 border-purple-500/35 hover:border-purple-400 text-purple-200'
  }
};

export function getDomainVisualIdentity(domain: Domain): DomainVisualIdentity {
  return DOMAIN_VISUAL_IDENTITIES[domain] || DOMAIN_VISUAL_IDENTITIES.Sanctuary;
}

export const CURATED_CARD_ARTWORKS: CardArtPreset[] = [
  {
    id: 'art-magma-jormungandr',
    title: 'Magma Jörmungandr',
    subtitle: 'Colossal Magma Serpent of Volkan',
    domain: 'Radiance',
    url: '/src/assets/images/magma_jormungandr_1793833158692.jpg',
    tag: 'Radiance · Dragon'
  },
  {
    id: 'art-solar-dawn-paladin',
    title: 'Valeria Solaris, Dawn Paladin',
    subtitle: 'Sunforged Champion & Blazing Greatsword',
    domain: 'Sanctuary',
    url: '/src/assets/images/solar_dawn_paladin_1793833161549.jpg',
    tag: 'Sanctuary · Champion'
  },
  {
    id: 'art-taranis-storm-god',
    title: 'Taranis, Celtic Thunder Deity',
    subtitle: 'Vorpal Lightning Blade & Golden Thunder Shield',
    domain: 'Arcane',
    url: '/src/assets/images/arcane_thunder_god_taranis_1793838062583.jpg',
    tag: 'Arcane · Deity'
  },
  {
    id: 'art-verdance-treant',
    title: 'Brumhorn, Elderwood Guardian',
    subtitle: 'Living Ironbark Colossus & Redwood Pillar',
    domain: 'Verdance',
    url: '/src/assets/images/verdance_elderwood_treant_1793838063812.jpg',
    tag: 'Verdance · Guardian'
  },
  {
    id: 'art-abyss-damyan-serpent',
    title: 'Damyan, Cosmic Void Serpent',
    subtitle: 'Boundless Obsidian Entity Coiled Around Dark Star',
    domain: 'Abyss',
    url: '/src/assets/images/abyss_cosmic_serpent_damyan_1793838064865.jpg',
    tag: 'Abyss · Cosmic'
  },
  {
    id: 'art-tempest-storm-leviathan',
    title: 'Tempest Sky-Steel Leviathans',
    subtitle: 'Ionized Plasma Wings & Hurricane Lightning',
    domain: 'Tempest',
    url: '/src/assets/images/tempest_storm_leviathan_1793838067113.jpg',
    tag: 'Tempest · Leviathan'
  },
  {
    id: 'art-arcane-oracle-mimir',
    title: 'Mímir & The Astral Well',
    subtitle: 'Golden Astrolabe Rings & Starlight Sanctum',
    domain: 'Arcane',
    url: '/src/assets/images/arcane_astral_oracle_mimir_1793838068055.jpg',
    tag: 'Arcane · Sanctum'
  },
  {
    id: 'art-radiance-warpick',
    title: 'Warpick of the Fire Mountain',
    subtitle: 'Meteoric Iron Pick on Molten Runic Anvil',
    domain: 'Radiance',
    url: '/src/assets/images/radiance_fire_mountain_warpick_1793838068137.jpg',
    tag: 'Radiance · Weapon'
  },
  {
    id: 'art-bog-warden-spear',
    title: "Duilokis, Bog-Warden's Reach",
    subtitle: 'Fey Willow Spear & Bioluminescent Runes',
    domain: 'Verdance',
    url: '/src/assets/images/bog_warden_spear_1793833159377.jpg',
    tag: 'Verdance · Weapon'
  },
  {
    id: 'art-abyssal-cursed-flail',
    title: 'Fléau de la Gourmandise',
    subtitle: 'Void Spiked Flail & Purple Necrotic Flames',
    domain: 'Abyss',
    url: '/src/assets/images/abyssal_cursed_flail_1793833160567.jpg',
    tag: 'Abyss · Weapon'
  },
  {
    id: 'art-ophanim-angel',
    title: 'Ophanim Wheel of Eyes',
    subtitle: 'Biblically Accurate Multi-Wheel Celestial Angel',
    domain: 'Sanctuary',
    url: '/src/assets/images/ophanim_celestial_angel_1793833161130.jpg',
    tag: 'Sanctuary · Relic'
  },
  {
    id: 'art-sovereign-orb',
    title: 'Sovereign Astral Core',
    subtitle: 'Cosmic Prismatic Relic of the Nexus',
    domain: 'Sanctuary',
    url: '/src/assets/images/sovereign_life_orb_1788581756996.jpg',
    tag: 'Sanctuary · Artifact'
  },
  {
    id: 'art-gothic-relic-frame',
    title: 'Gothic Runic Reliquary',
    subtitle: 'Ornate Arcane & Abyssal Relic Vault',
    domain: 'Abyss',
    url: '/src/assets/images/gothic_card_frame_1788581743243.jpg',
    tag: 'Abyss · Artifact'
  },
  {
    id: 'art-battlefield-citadel',
    title: 'Citadel Convergence Grounds',
    subtitle: 'Ancient Sanctum Battlefield & Leyline Conduits',
    domain: 'Radiance',
    url: '/src/assets/images/battlefield_arena_mat_1788581720608.jpg',
    tag: 'Environment · Arena'
  }
];

/**
 * Deterministically resolves a real, high-definition artwork URL for EVERY card in the game.
 * - If the card has an explicit `card.artUrl` (either pre-baked, uploaded, or AI-generated), returns it directly.
 * - Otherwise, maps the card by its ID, Domain, and CardType to the most fitting high-fantasy digital painting
 *   so zero cards ever fall back to flat geometric vector placeholders.
 */
export function getResolvedCardArtUrl(card: Card): string {
  if (card.artUrl && card.artUrl.trim().length > 0) {
    return card.artUrl;
  }

  const id = (card.id || '').toUpperCase();
  const name = (card.name || '').toUpperCase();
  const cType = card.cardType;

  // Specific character/item keyword matches
  if (id.includes('JORMUNGANDR') || id.includes('VOLKAN') || name.includes('WYRM') || name.includes('DRAKE')) {
    return '/src/assets/images/magma_jormungandr_1793833158692.jpg';
  }
  if (id.includes('DUILOKIS') || name.includes('SPEAR') || name.includes('BOW') || name.includes('ATHENA')) {
    return '/src/assets/images/bog_warden_spear_1793833159377.jpg';
  }
  if (id.includes('WARPICK') || name.includes('PICK') || name.includes('HAMMER') || name.includes('FORGE')) {
    return '/src/assets/images/radiance_fire_mountain_warpick_1793838068137.jpg';
  }
  if (id.includes('TARANIS') || name.includes('THUNDER') || name.includes('STORM') || name.includes('VORPAL')) {
    return '/src/assets/images/arcane_thunder_god_taranis_1793838062583.jpg';
  }
  if (id.includes('BRUMHORN') || id.includes('DRUUN') || name.includes('TREANT') || name.includes('TIMBER') || name.includes('MANTLE')) {
    return '/src/assets/images/verdance_elderwood_treant_1793838063812.jpg';
  }
  if (id.includes('DAMYAN') || name.includes('SNAKE') || name.includes('SERPENT') || name.includes('LEVIATHAN')) {
    return card.domain === 'Tempest'
      ? '/src/assets/images/tempest_storm_leviathan_1793838067113.jpg'
      : '/src/assets/images/abyss_cosmic_serpent_damyan_1793838064865.jpg';
  }
  if (id.includes('MIMIR') || name.includes('ORACLE') || name.includes('RING') || name.includes('TARO') || name.includes('CHRONO')) {
    return '/src/assets/images/arcane_astral_oracle_mimir_1793838068055.jpg';
  }
  if (id.includes('OPHANIM') || id.includes('LUMINARIS') || id.includes('AURIC') || name.includes('ANGEL') || name.includes('CELESTIAL')) {
    return '/src/assets/images/ophanim_celestial_angel_1793833161130.jpg';
  }
  if (id.includes('FLEAU') || id.includes('VIKTOR') || name.includes('FLAIL') || name.includes('SCYTHE') || name.includes('BAATOR')) {
    return '/src/assets/images/abyssal_cursed_flail_1793833160567.jpg';
  }

  // Domain + CardType smart mapping
  switch (card.domain) {
    case 'Sanctuary':
      if (cType === 'Champion' || cType === 'Character' || cType === 'Minion' || cType === 'Armor') {
        return '/src/assets/images/solar_dawn_paladin_1793833161549.jpg';
      }
      if (cType === 'Artifact' || cType === 'Spell') {
        return '/src/assets/images/sovereign_life_orb_1788581756996.jpg';
      }
      return '/src/assets/images/ophanim_celestial_angel_1793833161130.jpg';

    case 'Radiance':
      if (cType === 'Weapon' || cType === 'Artifact' || cType === 'Armor') {
        return '/src/assets/images/radiance_fire_mountain_warpick_1793838068137.jpg';
      }
      if (cType === 'Environment') {
        return '/src/assets/images/battlefield_arena_mat_1788581720608.jpg';
      }
      return '/src/assets/images/magma_jormungandr_1793833158692.jpg';

    case 'Verdance':
      if (cType === 'Weapon' || cType === 'Artifact' || cType === 'Spell') {
        return '/src/assets/images/bog_warden_spear_1793833159377.jpg';
      }
      return '/src/assets/images/verdance_elderwood_treant_1793838063812.jpg';

    case 'Tempest':
      if (cType === 'Champion' || cType === 'Character' || cType === 'Weapon') {
        return '/src/assets/images/arcane_thunder_god_taranis_1793838062583.jpg';
      }
      return '/src/assets/images/tempest_storm_leviathan_1793838067113.jpg';

    case 'Arcane':
      if (cType === 'Champion' || cType === 'Weapon') {
        return '/src/assets/images/arcane_thunder_god_taranis_1793838062583.jpg';
      }
      return '/src/assets/images/arcane_astral_oracle_mimir_1793838068055.jpg';

    case 'Abyss':
    default:
      if (cType === 'Champion' || cType === 'Beast' || cType === 'Encounter') {
        return '/src/assets/images/abyss_cosmic_serpent_damyan_1793838064865.jpg';
      }
      if (cType === 'Artifact' || cType === 'Relic') {
        return '/src/assets/images/gothic_card_frame_1788581743243.jpg';
      }
      return '/src/assets/images/abyssal_cursed_flail_1793833160567.jpg';
  }
}

/**
 * Generate a recommended prompt that the player or AI Studio can use
 * to generate photorealistic or high-fantasy card art tailored to any card.
 */
export function generateRecommendedArtPrompt(card: {
  name: string;
  subtitle?: string;
  domain?: string;
  cardType?: string;
  subtype?: string;
  lore?: string;
}): string {
  const domainAesthetics: Record<string, string> = {
    Radiance: 'volcanic magma glow, intense blazing embers, cracked obsidian rocks, fiery golden aura',
    Sanctuary: 'ornate polished gold plate armor, blinding divine halos, celestial marble spires, holy rays',
    Verdance: 'bioluminescent moss, primeval ancient forest, twisted elder willow wood, emerald spores',
    Abyss: 'swirling purple void flames, demonic necrotic shadows, jagged black iron spikes, cosmic darkness',
    Arcane: 'ethereal sapphire astral energy, glowing runic glyphs, cosmic nebula background, arcane geometry',
    Tempest: 'crackling cyan lightning arcs, stormy tempest clouds, torrential wind vortices, ozone sparks'
  };

  const styleContext = domainAesthetics[card.domain || 'Sanctuary'] || 'epic fantasy trading card game illustration';
  const loreSnippet = card.lore ? ` Visual context: ${card.lore.slice(0, 140)}.` : '';

  return `Epic digital fantasy trading card game illustration of ${card.name} (${card.subtype || card.cardType || 'Mythic Entity'}), ${styleContext}.${loreSnippet} Cinematic dramatic lighting, masterpiece digital painting, high resolution, intricate details, 4:3 aspect ratio, no text, no card frames`;
}
