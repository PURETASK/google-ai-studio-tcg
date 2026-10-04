import React, { useState, useMemo } from 'react';
import { Card, Domain, CardType, HazardCard } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { MASTER_HAZARD_DECK } from '../data/hazardCardsData';
import { CardItem } from './CardItem';
import { soundEngine } from '../utils/audioEngine';
import { 
  Shield, 
  Flame, 
  Sparkles, 
  Zap, 
  Skull, 
  Layers, 
  Swords, 
  BookOpen, 
  Search, 
  Eye, 
  Play, 
  Dices, 
  Compass, 
  HelpCircle,
  Info,
  Sliders,
  Award,
  Crown,
  Filter,
  ArrowRight,
  PlusCircle,
  Sparkle
} from 'lucide-react';

interface DomainCompendiumViewProps {
  cards?: Card[];
  onInspectCard: (card: Card) => void;
  onSelectDomainForArena?: (domain: Domain) => void;
  onNavigateToForge?: (domain?: Domain) => void;
}

type DomainTabKey = Domain | 'Neutral';
type CompendiumFilter = 'all' | 'Champion' | 'Spell' | 'Weapon' | 'Relic' | 'Artifact' | 'Armor' | 'Beast' | 'hazard' | 'environment' | 'custom';

export const DomainCompendiumView: React.FC<DomainCompendiumViewProps> = ({
  cards = CARDS_DATABASE,
  onInspectCard,
  onSelectDomainForArena,
  onNavigateToForge
}) => {
  const [selectedDomain, setSelectedDomain] = useState<DomainTabKey>('Radiance');
  const [activeFilter, setActiveFilter] = useState<CompendiumFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMechanicsGuide, setShowMechanicsGuide] = useState(false);

  // Filter cards by selected domain
  const domainCards = useMemo(() => {
    return cards.filter(card => {
      if (selectedDomain === 'Neutral') {
        return (card.domain as string) === 'Neutral' || !['Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss'].includes(card.domain);
      }
      return card.domain === selectedDomain || card.secondaryDomain === selectedDomain;
    });
  }, [cards, selectedDomain]);

  // Filter hazards by selected domain
  const domainHazards = useMemo(() => {
    return MASTER_HAZARD_DECK.filter(hazard => {
      if (selectedDomain === 'Neutral') {
        return (hazard.domain as string) === 'Neutral';
      }
      return hazard.domain === selectedDomain;
    });
  }, [selectedDomain]);

  // Sample planar environments mapped to domains
  const domainEnvironments = useMemo(() => {
    const ENV_MAP: Record<string, Array<{ id: string; name: string; type: string; bonus: string; description: string; icon: string }>> = {
      Radiance: [
        { id: 'env-rad-1', name: 'Caldera of Sol-Thar', type: 'Volcanic Fissure', bonus: '+2 Fire DMG to all attacks', description: 'Superheated magma sea. Non-fire units take 1 burn damage per round.', icon: '🌋' },
        { id: 'env-rad-2', name: 'Coronal Sunspire', type: 'Solar Crucible', bonus: '+1 Momentum on roll of 4+', description: 'Intense solar radiation charges kinetic conduits and shields.', icon: '☀️' },
        { id: 'env-rad-3', name: 'Obsidian Slagfields', type: 'Tectonic Basalt', bonus: 'Armor values increased by +2', description: 'Hardened volcanic glass provides impenetrable physical cover.', icon: '🪨' }
      ],
      Sanctuary: [
        { id: 'env-san-1', name: 'Solaris High Citadel', type: 'Holy Cathedral', bonus: '+3 Aether Shield at Dawn', description: 'Hallowed light bastions that cleanse curses and bless the faithful.', icon: '🏰' },
        { id: 'env-san-2', name: 'Dawnspire Aegis Field', type: 'Celestial Barrier', bonus: 'Retaliation reflects 2 Holy DMG', description: 'Defensive energy lattice shielding frontline commanders.', icon: '🛡️' },
        { id: 'env-san-3', name: 'Altar of the Seraphim', type: 'Divine Shrine', bonus: 'Revive ally once per duel at 3 HP', description: 'Sacred grounds resonant with angelic resurrection rites.', icon: '✨' }
      ],
      Verdance: [
        { id: 'env-ver-1', name: 'Eldervale Primeval Canopy', type: 'Ancient Rainforest', bonus: '+2 HP Regeneration per turn', description: 'Living biome feeding life essence into beasts and wardens.', icon: '🌲' },
        { id: 'env-ver-2', name: 'Briarheart Bog', type: 'Thorn Mire', bonus: 'Enemy units have -1 Speed', description: 'Razor thorns entangle charging attackers and inflict poison.', icon: '🌿' },
        { id: 'env-ver-3', name: 'Apex Titan Den', type: 'Beast Colosseum', bonus: 'Beast units gain +2 ATK', description: 'Primal territory where titan beasts reign supreme.', icon: '🐾' }
      ],
      Arcane: [
        { id: 'env-arc-1', name: 'Astral Observatory of Chronos', type: 'Cosmic Orrery', bonus: 'Draw 1 extra card every 2 turns', description: 'Bends spacetime geometry to reveal alternate timelines.', icon: '🔮' },
        { id: 'env-arc-2', name: 'Aether Rift Nexus', type: 'Dimensional Fracture', bonus: 'Teleportation abilities cost -1 Essence', description: 'Unstable dimensional tears allowing instantaneous lane jumps.', icon: '🌀' },
        { id: 'env-arc-3', name: 'Mirror Sea of Taro', type: 'Reflective Cosmos', bonus: 'Spells copy 1 random enemy buff', description: 'Crystalline waters that reflect spells back at casters.', icon: '🌌' }
      ],
      Abyss: [
        { id: 'env-aby-1', name: 'The Silent Necropolis', type: 'Boneyard Ruins', bonus: '+1 Soul Charge per unit death', description: 'Tomb world where dead soldiers rise as sacrificial thralls.', icon: '💀' },
        { id: 'env-aby-2', name: 'Void Singularity Crater', type: 'Event Horizon', bonus: 'Enemy shields decay by 1 each round', description: 'Gravitational void anomaly consuming life force and light.', icon: '🕳️' },
        { id: 'env-aby-3', name: 'Nether Fane of Entropy', type: 'Cursed Crypt', bonus: 'Deathtouch attacks heal commander for 2', description: 'Ancient dark temple channeling decay and necrotic curses.', icon: '🩸' }
      ],
      Neutral: [
        { id: 'env-neu-1', name: 'Nexus Prime Arena', type: 'Planar Crossroads', bonus: '+1 Momentum to both duelists', description: 'The grand tournament colosseum at the center of all realms.', icon: '⚔️' },
        { id: 'env-neu-2', name: 'The Iron Crucible', type: 'Armament Forge', bonus: 'Equipment cards cost -1 Essence', description: 'Neutral dwarven foundry where master relics are smithied.', icon: '🔨' }
      ]
    };
    return ENV_MAP[selectedDomain] || ENV_MAP.Neutral;
  }, [selectedDomain]);

  // Filtered list of cards based on active sub-filter and search
  const filteredCards = useMemo(() => {
    return domainCards.filter(card => {
      // Type matching
      if (activeFilter === 'custom') {
        if (!(card.id.startsWith('CUSTOM-') || card.id.startsWith('VISION-') || card.id.startsWith('VIS-') || card.isCustom)) {
          return false;
        }
      } else if (activeFilter !== 'all' && activeFilter !== 'hazard' && activeFilter !== 'environment') {
        if (card.cardType !== activeFilter) return false;
      }

      // Search query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(q);
        const matchesSub = card.subtitle?.toLowerCase().includes(q);
        const matchesLore = card.lore?.toLowerCase().includes(q);
        const matchesAbilities = card.abilities?.some(a => 
          a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
        );
        const matchesGlyphs = card.powerGlyphs?.some(g => 
          g.name.toLowerCase().includes(q) || g.shortTag.toLowerCase().includes(q)
        );
        return matchesName || matchesSub || matchesLore || matchesAbilities || matchesGlyphs;
      }
      return true;
    });
  }, [domainCards, activeFilter, searchQuery]);

  // Domain Metadata & Themes
  const DOMAIN_METADATA: Record<string, {
    title: string;
    sigil: string;
    color: string;
    badgeBg: string;
    border: string;
    flavor: string;
    mechanicName: string;
    mechanicDesc: string;
    keyTraits: string[];
  }> = {
    Radiance: {
      title: 'Radiance Caldera',
      sigil: '🌋',
      color: 'from-orange-600 via-red-600 to-amber-600',
      badgeBg: 'bg-orange-950/80 text-orange-300 border-orange-500/50',
      border: 'border-orange-500/40',
      flavor: 'Masters of molten magma, solar immolation, high-tempo momentum surges, and explosive area damage.',
      mechanicName: 'Thermal Surge & Volcanic Slag',
      mechanicDesc: 'Ignites terrain to deal continuous Burn ticks, melts defending armor, and surges power when rolling high Momentum dice.',
      keyTraits: ['Burn Stacks (2-4 DMG/Turn)', 'Armor Sunder', 'D12 Momentum Dice Focus', 'High Strike Power']
    },
    Sanctuary: {
      title: 'Sanctuary Realm',
      sigil: '🛡️',
      color: 'from-yellow-500 via-amber-400 to-yellow-600',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/50',
      border: 'border-amber-500/40',
      flavor: 'Bastions of divine light, impenetrable Aether Shields, angelic retribution, and holy cleansing.',
      mechanicName: 'Aether Shield & Retribution',
      mechanicDesc: 'Converts unspent momentum into enduring armor shields, reflects incoming strike damage, and protects low-vitality allies.',
      keyTraits: ['Aether Shield (+2 HP per Momentum)', 'Divine Retribution', 'Curse Cleansing', 'Unbreakable Bastions']
    },
    Verdance: {
      title: 'Verdance Eldervale',
      sigil: '🌿',
      color: 'from-emerald-600 via-green-600 to-teal-600',
      badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50',
      border: 'border-emerald-500/40',
      flavor: 'Guardians of ancient primal forests, regenerative plant life, toxic spore clouds, and titanic beast swarms.',
      mechanicName: 'Primordial Overgrowth & Spores',
      mechanicDesc: 'Heals vanguard units continuously each turn, roots opponents with razor briars, and stacks toxic spores on enemies.',
      keyTraits: ['Turn Regrowth (+2 HP/Rnd)', 'Briar Entangle (Root)', 'Toxic Spores', 'Titan Trample']
    },
    Arcane: {
      title: 'Arcane Cosmos',
      sigil: '🌀',
      color: 'from-blue-600 via-indigo-600 to-cyan-500',
      badgeBg: 'bg-blue-950/80 text-blue-300 border-blue-500/50',
      border: 'border-blue-500/40',
      flavor: 'Scholars of cosmic time, dimensional aether rifts, spell siphoning, and astral meteor storms.',
      mechanicName: 'Temporal Rewind & Rift Warping',
      mechanicDesc: 'Manipulates turn order, bypasses physical defense through phase shifts, and rewinds damage received during critical turns.',
      keyTraits: ['Temporal Stasis', 'Aether Rift (Lane Warp)', 'Spell Siphon', 'Astral Barrage']
    },
    Abyss: {
      title: 'Abyssal Void',
      sigil: '💀',
      color: 'from-purple-900 via-fuchsia-900 to-stone-900',
      badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-500/50',
      border: 'border-purple-500/40',
      flavor: 'Reapers of the cosmic void, sacrificial necromancy, deathtouch curses, and soul-draining singularities.',
      mechanicName: 'Soul Rend & Void Decay',
      mechanicDesc: 'Sacrifices friendly thralls for immediate resource surges, inflicts stacking Doom curses, and banishes targets to the Void.',
      keyTraits: ['Soul Rend (Lifesteal)', 'Deathtouch / Necrotic', 'Boneyard Pact (Sacrifice)', 'Singularity Exile']
    },
    Neutral: {
      title: 'Neutral & Martial Realm',
      sigil: '⚔️',
      color: 'from-stone-700 via-stone-800 to-neutral-900',
      badgeBg: 'bg-stone-900 text-stone-300 border-stone-700',
      border: 'border-stone-700',
      flavor: 'Universal warrior disciplines, legendary equipment armaments, artifact shrines, and cataclysmic hazards.',
      mechanicName: 'Martial Versatility & Equipment Mastery',
      mechanicDesc: 'Can be included in any deck regardless of color identity. Provides Taunt, First Strike, and universal utility.',
      keyTraits: ['Universal Deck Inclusion', 'Weapon Stances', 'Artifact Shrines', 'Planar Cataclysms']
    }
  };

  const currentMeta = DOMAIN_METADATA[selectedDomain] || DOMAIN_METADATA.Neutral;

  return (
    <div className="w-full min-w-0 space-y-6 animate-fade-in">
      
      {/* ================= HEADER & DOMAIN SELECTOR TABS ================= */}
      <div className="p-6 rounded-3xl bg-stone-950 border border-amber-500/30 shadow-2xl space-y-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-stone-800/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <BookOpen size={20} />
              </span>
              <div>
                <span className="text-[10px] font-cinzel tracking-widest text-amber-400 uppercase font-bold">
                  Realm of Nexus Master Codex
                </span>
                <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-stone-100 tracking-wide">
                  Domain Omnidex & Hazard Compendium
                </h2>
              </div>
            </div>
            <p className="text-xs text-stone-400 max-w-3xl leading-relaxed">
              Explore every single card, spell, unit, weapon, relic, environment, and domain-specific hazard across all 5 cosmic domains.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {onSelectDomainForArena && selectedDomain !== 'Neutral' && (
              <button
                onClick={() => {
                  soundEngine.playCombatClash('victory');
                  onSelectDomainForArena(selectedDomain as Domain);
                }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center gap-2 transition hover:scale-105 active:scale-95"
              >
                <Play size={14} />
                <span>Duel with {selectedDomain} Deck</span>
              </button>
            )}

            {onNavigateToForge && (
              <button
                onClick={() => {
                  soundEngine.playMicroSound('click');
                  onNavigateToForge(selectedDomain === 'Neutral' ? 'Radiance' : selectedDomain as Domain);
                }}
                className="px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-purple-300 border border-purple-500/40 font-cinzel font-bold text-xs flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
              >
                <PlusCircle size={14} className="text-purple-400" />
                <span>Forge {selectedDomain} Card</span>
              </button>
            )}
          </div>
        </div>

        {/* 5 Domain Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {(['Radiance', 'Sanctuary', 'Verdance', 'Arcane', 'Abyss', 'Neutral'] as const).map(domainKey => {
            const isSelected = selectedDomain === domainKey;
            const meta = DOMAIN_METADATA[domainKey];
            const cardCount = cards.filter(c => (domainKey as string) === 'Neutral' ? ((c.domain as string) === 'Neutral' || !['Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss'].includes(c.domain)) : (c.domain === domainKey || c.secondaryDomain === domainKey)).length;
            const hazardCount = MASTER_HAZARD_DECK.filter(h => (h.domain as string) === (domainKey as string)).length;

            return (
              <button
                key={domainKey}
                onClick={() => {
                  setSelectedDomain(domainKey);
                  soundEngine.playMicroSound('select');
                }}
                className={`p-3 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between gap-2 relative overflow-hidden group ${
                  isSelected
                    ? `bg-stone-900 ${meta.border} shadow-[0_0_20px_rgba(234,179,8,0.25)] ring-2 ring-amber-500/50 scale-102`
                    : 'bg-stone-950/80 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl drop-shadow">{meta.sigil}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${meta.badgeBg}`}>
                    {cardCount} Cards
                  </span>
                </div>

                <div>
                  <span className={`font-cinzel font-bold text-xs sm:text-sm block transition-colors ${
                    isSelected ? 'text-amber-200' : 'text-stone-300 group-hover:text-stone-100'
                  }`}>
                    {domainKey}
                  </span>
                  <span className="text-[10px] text-stone-300 font-mono">
                    {hazardCount} Hazards • 3 Biomes
                  </span>
                </div>

                {isSelected && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.color}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= DOMAIN PHILOSOPHY & SIGNATURE MECHANICS BANNER ================= */}
      <div className={`p-5 rounded-3xl bg-stone-950 border ${currentMeta.border} shadow-xl relative overflow-hidden space-y-4`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center text-2xl shadow-inner">
              {currentMeta.sigil}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel font-black text-lg text-amber-200">
                  {currentMeta.title}
                </h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${currentMeta.badgeBg}`}>
                  Domain Overview
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                {currentMeta.flavor}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowMechanicsGuide(!showMechanicsGuide);
              soundEngine.playMicroSound('click');
            }}
            className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-cinzel font-bold border border-amber-500/30 flex items-center gap-1.5 transition"
          >
            <HelpCircle size={13} />
            <span>{showMechanicsGuide ? 'Hide Domain Mechanics' : 'View Domain Mechanics'}</span>
          </button>
        </div>

        {/* Signature Mechanics Detail Grid */}
        {showMechanicsGuide && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs animate-fade-in">
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
              <span className="font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkle size={14} className="text-amber-400" />
                <span>Signature Combat Mechanic: {currentMeta.mechanicName}</span>
              </span>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                {currentMeta.mechanicDesc}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
              <span className="font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                <Award size={14} className="text-amber-400" />
                <span>Core Tactical Pillars:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentMeta.keyTraits.map((trait, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-stone-950 border border-amber-500/30 text-amber-100 text-[10px] font-mono">
                    ✓ {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= SEARCH & TYPE FILTER BAR ================= */}
      <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Sub-Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 text-xs font-cinzel w-full md:w-auto">
          {[
            { id: 'all', label: 'All Pool', count: domainCards.length },
            { id: 'Champion', label: 'Champions', count: domainCards.filter(c => c.cardType === 'Champion').length },
            { id: 'Spell', label: 'Spells', count: domainCards.filter(c => c.cardType === 'Spell').length },
            { id: 'Weapon', label: 'Weapons', count: domainCards.filter(c => c.cardType === 'Weapon').length },
            { id: 'Relic', label: 'Relics & Shrines', count: domainCards.filter(c => c.cardType === 'Relic' || c.cardType === 'Artifact').length },
            { id: 'hazard', label: 'Planar Hazards', count: domainHazards.length },
            { id: 'environment', label: 'Environments', count: domainEnvironments.length },
            { id: 'custom', label: 'Vision / Custom', count: domainCards.filter(c => c.id.startsWith('CUSTOM-') || c.id.startsWith('VISION-') || c.id.startsWith('VIS-') || c.isCustom).length }
          ].map(filter => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id as CompendiumFilter);
                  soundEngine.playMicroSound('click');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30 font-black scale-105'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-stone-100 border border-stone-800'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${isActive ? 'bg-black text-amber-400' : 'bg-stone-950 text-stone-300'}`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedDomain} cards, lore & abilities...`}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* ================= CONTENT SECTIONS (Cards / Hazards / Environments) ================= */}
      
      {/* 1. PLANAR HAZARDS SECTION */}
      {(activeFilter === 'all' || activeFilter === 'hazard') && domainHazards.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌪️</span>
              <h3 className="font-cinzel font-bold text-base text-amber-200">
                {selectedDomain} Planar Hazards & Atmospheric Anomalies ({domainHazards.length})
              </h3>
            </div>
            <span className="text-xs text-stone-300 font-mono">
              Resolves strictly during Dawn Phase (CRD 400)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domainHazards.map(hazard => (
              <div
                key={hazard.id}
                className="p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all duration-200 shadow-xl flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{hazard.icon}</span>
                      <div>
                        <h4 className="font-cinzel font-bold text-sm text-stone-100 group-hover:text-amber-300 transition">
                          {hazard.name}
                        </h4>
                        <span className="text-[10px] font-mono text-stone-300 block">
                          {hazard.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-[9px] font-mono text-amber-300 font-bold block">
                        {hazard.tier} • Threat ★{hazard.threatLevel}
                      </span>
                      <span className="text-[9px] text-stone-300 font-mono">
                        {hazard.roundDuration} Rounds
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                    {hazard.description}
                  </p>

                  <p className="text-[11px] text-stone-300 italic">
                    {hazard.flavorText}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-mono text-amber-400">
                  <span>Trigger: {hazard.triggerTiming}</span>
                  <span className="capitalize">Target: {hazard.buffTarget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PLANAR ENVIRONMENTS SECTION */}
      {(activeFilter === 'all' || activeFilter === 'environment') && domainEnvironments.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              <h3 className="font-cinzel font-bold text-base text-amber-200">
                {selectedDomain} Planar Biomes & Arenas ({domainEnvironments.length})
              </h3>
            </div>
            <span className="text-xs text-stone-300 font-mono">
              Tile & Field Resonance Modifiers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {domainEnvironments.map(env => (
              <div
                key={env.id}
                className="p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-emerald-500/50 transition-all duration-200 shadow-xl space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{env.icon}</span>
                    <div>
                      <h4 className="font-cinzel font-bold text-sm text-stone-100">
                        {env.name}
                      </h4>
                      <span className="text-[10px] font-mono text-stone-300">
                        {env.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                  ★ {env.bonus}
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {env.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MAIN CARDS GRID */}
      {activeFilter !== 'hazard' && activeFilter !== 'environment' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎴</span>
              <h3 className="font-cinzel font-bold text-base text-amber-200">
                {selectedDomain} Cards & Armaments Catalog ({filteredCards.length})
              </h3>
            </div>
            <span className="text-xs text-stone-300 font-mono">
              Click card to inspect full abilities, glyphs & lore
            </span>
          </div>

          {filteredCards.length === 0 ? (
            <div className="p-12 rounded-3xl bg-stone-950 border border-dashed border-stone-800 text-center space-y-3">
              <BookOpen size={32} className="mx-auto text-stone-600" />
              <p className="text-sm text-stone-400 font-cinzel font-bold">
                No matching cards found in this filter category.
              </p>
              <p className="text-xs text-stone-300">
                Try clearing your search query or forging a new custom card in the Vision Studio.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCards.map(card => (
                <div 
                  key={card.id} 
                  className="flex flex-col items-center group transition-transform duration-200 hover:-translate-y-1"
                >
                  <CardItem
                    card={card}
                    onInspect={() => {
                      soundEngine.playMicroSound('select');
                      onInspectCard(card);
                    }}
                  />
                  
                  {/* Quick Inspect Button */}
                  <button
                    onClick={() => {
                      soundEngine.playMicroSound('click');
                      onInspectCard(card);
                    }}
                    className="mt-2 w-full py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 text-[11px] font-cinzel font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    <Eye size={12} className="text-amber-400" />
                    <span>Inspect {card.name}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
