import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Domain, CardType, Rarity, PowerGlyph } from '../types';
import { CardItem } from './CardItem';
import { CARDS_DATABASE } from '../data/cards';
import { 
  UNIVERSAL_POWER_GLYPHS, 
  CODEX_CATEGORIES, 
  EnrichedPowerGlyph, 
  rollDiceFormula, 
  calculateAverageRoll,
  DiceRollResult 
} from '../data/powerGlyphsData';
import { CodexIcon, CodexIconRegistry } from './CodexIconRegistry';
import { GlyphLexiconEngine } from './GlyphLexiconEngine';
import { InteractiveRulebook } from './InteractiveRulebook';
import { CardAttributeRadarChart, getCardRadarAttributes } from './CardAttributeRadarChart';
import { CardComparisonModal } from './CardComparisonModal';
import { CodexBulkImportModal } from './CodexBulkImportModal';
import { soundEngine } from '../utils/audioEngine';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Star, 
  Shield, 
  Sword, 
  BookOpen, 
  Grid, 
  List, 
  SlidersHorizontal,
  Flame,
  Zap,
  Activity,
  Layers,
  Info,
  Clock,
  Skull,
  Eye,
  CheckCircle2,
  Compass,
  Award,
  Dices,
  RotateCcw,
  Sun,
  Moon,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Workflow,
  Cpu,
  Scale,
  Upload,
  ChevronDown,
  Check
} from 'lucide-react';

interface CardCodexProps {
  cards: Card[];
  onInspectCard: (card: Card) => void;
  onBulkImportCards?: (cards: Card[]) => void;
}

export const CardCodex: React.FC<CardCodexProps> = ({ cards, onInspectCard, onBulkImportCards }) => {
  const [activeTab, setActiveTab] = useState<'compendium' | 'glyphCodex' | 'iconRegistry' | 'interactiveRulebook' | 'combatMeters'>('compendium');
  const [isBulkImportOpen, setIsBulkImportOpen] = useState<boolean>(false);

  // Dropdown management with outside-click dismissal
  const [openCodexDropdown, setOpenCodexDropdown] = useState<string | null>(null);
  const codexDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (codexDropdownRef.current && !codexDropdownRef.current.contains(e.target as Node)) {
        setOpenCodexDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, []);
  
  // Compendium filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'All'>('All');
  const [selectedType, setSelectedType] = useState<CardType | 'All'>('All');
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'All'>('All');
  const [sortBy, setSortBy] = useState<
    'rarity' | 'power-desc' | 'power-asc' | 'speed-desc' | 'speed-asc' | 'defense-desc' | 'defense-asc' | 'cost-asc' | 'cost-desc' | 'name' | 'domain'
  >('rarity');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState<boolean>(true);
  const [minPower, setMinPower] = useState<number>(0);
  const [minSpeed, setMinSpeed] = useState<number>(0);
  const [minDefense, setMinDefense] = useState<number>(0);
  const [maxCostFilter, setMaxCostFilter] = useState<number>(10);
  const [selectedKeywordFilter, setSelectedKeywordFilter] = useState<string>('All');
  const [showQuickRadar, setShowQuickRadar] = useState<boolean>(true);
  const [activeQuickInspectCard, setActiveQuickInspectCard] = useState<Card>(cards[0] || CARDS_DATABASE[0]);

  // Side-by-Side Comparison Modal State
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [compareCardA, setCompareCardA] = useState<Card | undefined>(undefined);
  const [compareCardB, setCompareCardB] = useState<Card | undefined>(undefined);

  const handleOpenComparison = (card1?: Card, card2?: Card) => {
    soundEngine.playMicroSound('select');
    setCompareCardA(card1 || activeQuickInspectCard || cards[0]);
    setCompareCardB(card2 || (cards.find(c => c.id !== (card1?.id || activeQuickInspectCard?.id)) || cards[1]));
    setIsComparisonModalOpen(true);
  };

  // Helper to extract card speed / mobility
  const getCardSpeed = (card: Card) => 
    card.speed ?? card.powerAttributes?.speed ?? (card.attributes?.mobility ? Math.round(card.attributes.mobility) : Math.max(1, 10 - card.cost));

  // Combat Attributes & Radar Studio states
  const [selectedRadarCardId, setSelectedRadarCardId] = useState<string>(cards[0]?.id || CARDS_DATABASE[0]?.id || '');
  const [comparisonRadarCardId, setComparisonRadarCardId] = useState<string>('');
  const [radarDimensions, setRadarDimensions] = useState<4 | 6>(4);

  // Glyph Lexicon Engine states
  const [selectedGlyphCategory, setSelectedGlyphCategory] = useState<string>('all');
  const [selectedGlyphDomain, setSelectedGlyphDomain] = useState<string>('all');
  const [selectedTimingFilter, setSelectedTimingFilter] = useState<string>('all');
  const [glyphSearch, setGlyphSearch] = useState<string>('');
  const [selectedGlyphDetail, setSelectedGlyphDetail] = useState<EnrichedPowerGlyph | null>(UNIVERSAL_POWER_GLYPHS[0]);
  const [diceRollResult, setDiceRollResult] = useState<DiceRollResult | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  // Interactive Rulebook states
  const [rulebookSubtab, setRulebookSubtab] = useState<'matrix' | 'lanes' | 'foils' | 'attunement' | 'phases'>('matrix');
  const [radarSliders, setRadarSliders] = useState({
    damage: 8.5,
    durability: 7.0,
    mobility: 6.5,
    utility: 8.0,
    control: 7.5
  });
  const [demoFoil, setDemoFoil] = useState<'none' | 'gold' | 'prismatic' | 'cosmic'>('prismatic');
  const [activeLaneHighlight, setActiveLaneHighlight] = useState<'flank-left' | 'vanguard' | 'flank-right' | 'backline'>('vanguard');

  // Reset all sidebar filters to default
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
    setSelectedType('All');
    setSelectedRarity('All');
    setMinPower(0);
    setMinSpeed(0);
    setMinDefense(0);
    setMaxCostFilter(10);
    setSelectedKeywordFilter('All');
    setSortBy('rarity');
  };

  // Filter cards for Compendium
  const filteredCards = cards.filter((card) => {
    if (selectedDomain !== 'All' && card.domain !== selectedDomain) return false;
    if (selectedType !== 'All' && card.cardType !== selectedType) return false;
    if (selectedRarity !== 'All' && card.rarity !== selectedRarity) return false;
    if (card.power < minPower) return false;
    if (card.defense < minDefense) return false;
    if (card.cost > maxCostFilter) return false;
    const speed = getCardSpeed(card);
    if (speed < minSpeed) return false;

    if (selectedKeywordFilter !== 'All') {
      const q = selectedKeywordFilter.toLowerCase();
      const matchAbilities = card.abilities.some(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
      const matchGlyphs = card.powerGlyphs?.some(g => g.name.toLowerCase().includes(q) || g.ruleClause.toLowerCase().includes(q) || g.shortTag.toLowerCase().includes(q));
      if (!matchAbilities && !matchGlyphs) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = card.name.toLowerCase().includes(q);
      const matchSubtitle = card.subtitle.toLowerCase().includes(q);
      const matchLore = card.lore.toLowerCase().includes(q);
      const matchAbility = card.abilities.some(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
      const matchGlyph = card.powerGlyphs?.some(g => g.name.toLowerCase().includes(q) || g.ruleClause.toLowerCase().includes(q));
      if (!matchName && !matchSubtitle && !matchLore && !matchAbility && !matchGlyph) return false;
    }
    return true;
  });

  // Sort cards
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortBy === 'power-desc') return b.power - a.power;
    if (sortBy === 'power-asc') return a.power - b.power;
    if (sortBy === 'speed-desc') return getCardSpeed(b) - getCardSpeed(a);
    if (sortBy === 'speed-asc') return getCardSpeed(a) - getCardSpeed(b);
    if (sortBy === 'defense-desc') return b.defense - a.defense;
    if (sortBy === 'defense-asc') return a.defense - b.defense;
    if (sortBy === 'cost-asc') return a.cost - b.cost;
    if (sortBy === 'cost-desc') return b.cost - a.cost;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'domain') return a.domain.localeCompare(b.domain);
    if (sortBy === 'rarity') {
      const rMap: Record<string, number> = {
        'Divine Boundless': 7,
        'Mythic': 6,
        'Legendary': 5,
        'Very Rare': 4,
        'Rare': 3,
        'Uncommon': 2,
        'Common': 1
      };
      return (rMap[b.rarity] || 0) - (rMap[a.rarity] || 0);
    }
    return 0;
  });

  // Filter Glyphs for Lexicon Engine
  const filteredGlyphs = UNIVERSAL_POWER_GLYPHS.filter((g) => {
    if (selectedGlyphCategory !== 'all' && g.category !== selectedGlyphCategory) return false;
    if (selectedGlyphDomain !== 'all' && g.domain !== selectedGlyphDomain) return false;
    if (selectedTimingFilter !== 'all' && g.triggerTiming !== selectedTimingFilter) return false;
    if (glyphSearch) {
      const q = glyphSearch.toLowerCase();
      return (
        g.name.toLowerCase().includes(q) ||
        g.shortTag.toLowerCase().includes(q) ||
        g.ruleClause.toLowerCase().includes(q) ||
        (g.diceFormula && g.diceFormula.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Handle Dice Simulation Roll
  const handleTestRoll = () => {
    if (!selectedGlyphDetail) return;
    setIsRolling(true);
    setTimeout(() => {
      const formula = selectedGlyphDetail.diceFormula || '3d6 Direct DMG';
      const result = rollDiceFormula(formula);
      setDiceRollResult(result);
      setIsRolling(false);
    }, 350);
  };

  // Derive Archetype classification from Radar sliders
  const calculateArchetype = () => {
    const { damage, durability, mobility, utility, control } = radarSliders;
    const avg = (damage + durability + mobility + utility + control) / 5;
    if (damage >= 9 && durability < 6) return { title: 'S-Rank Glass Cannon Striker', desc: 'Devastating burst damage; requires vanguard shielding.' };
    if (durability >= 9 && damage < 6) return { title: 'Tier S Impenetrable Juggernaut', desc: 'Absorbs immense punishment; ideal for Center Vanguard.' };
    if (mobility >= 8.5) return { title: 'Flank Infiltrator & Skirmisher', desc: 'High initiative speed; bypasses frontline taunt barriers.' };
    if (control >= 8.5 && utility >= 8.5) return { title: 'Apex Battlefield Tactician', desc: 'Manipulates lane positions, enemy cooldowns, and area spells.' };
    if (avg >= 8.0) return { title: 'Mythic All-Rounder Sovereign', desc: 'Excels across every combat vector.' };
    return { title: 'Balanced Tactical Specialist', desc: 'Adaptable asset suited for hybrid lane configurations.' };
  };

  const archetypeInfo = calculateArchetype();

  // Radar Polygon calculation for interactive matrix
  const radarPoints = [
    { label: 'Damage', val: radarSliders.damage, angle: -Math.PI / 2 },
    { label: 'Durability', val: radarSliders.durability, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { label: 'Mobility', val: radarSliders.mobility, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { label: 'Utility', val: radarSliders.utility, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { label: 'Control', val: radarSliders.control, angle: -Math.PI / 2 + (8 * Math.PI) / 5 }
  ];

  const center = 100;
  const maxRadius = 70;

  const getCoordinates = (val: number, angle: number) => {
    const r = (val / 10) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  const polygonCoords = radarPoints.map(p => getCoordinates(p.val, p.angle)).join(' ');

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in">
      {/* ================= 1. COMPENDIUM HEADER & NAVIGATION ================= */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
            <span>Aetheria Codex & Universal Lexicon</span>
            <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-[9px] text-amber-300 font-mono">
              v2.5 ARCHIVE
            </span>
          </span>
          <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100 mt-1">
            Compendium of Artifacts, Glyphs & Rules
          </h2>
          <p className="text-stone-300 text-xs mt-1 max-w-2xl">
            Explore card blueprints, the complete power glyph encyclopedia with live dice formulas, tactical matrices, and the interactive rulebook.
          </p>
        </div>

        {/* Codex Navigation Dropdown & Bulk Import */}
        <div ref={codexDropdownRef} className="flex flex-wrap items-center gap-2 font-cinzel text-xs relative z-30">
          {/* Codex Section Dropdown */}
          <div className="relative">
            <button
              type="button"
              id="btn-codex-section-dropdown"
              onClick={() => {
                soundEngine.playMicroSound('click');
                setOpenCodexDropdown(prev => prev === 'section' ? null : 'section');
              }}
              className="px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-900 border border-amber-500/40 text-amber-100 font-bold flex items-center gap-2.5 transition shadow"
            >
              {activeTab === 'compendium' && <BookOpen size={15} className="text-amber-400" />}
              {activeTab === 'glyphCodex' && <Sparkles size={15} className="text-amber-400" />}
              {activeTab === 'iconRegistry' && <Cpu size={15} className="text-amber-400" />}
              {activeTab === 'interactiveRulebook' && <Compass size={15} className="text-amber-400" />}
              {activeTab === 'combatMeters' && <Activity size={15} className="text-amber-400" />}
              
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-stone-400 font-mono uppercase tracking-wider">Codex Section</span>
                <span className="text-amber-300 font-bold text-xs">
                  {activeTab === 'compendium' && 'Card Compendium'}
                  {activeTab === 'glyphCodex' && 'Glyph Lexicon Engine'}
                  {activeTab === 'iconRegistry' && 'Domain Icons & Ability Codex'}
                  {activeTab === 'interactiveRulebook' && 'Interactive Rulebook'}
                  {activeTab === 'combatMeters' && 'Radar & Attribute Matrix'}
                </span>
              </div>
              <ChevronDown size={14} className={`text-amber-400 transition-transform ml-1 ${openCodexDropdown === 'section' ? 'rotate-180' : ''}`} />
            </button>

            {openCodexDropdown === 'section' && (
              <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-72 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl">
                <div className="px-2.5 py-1 text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider border-b border-stone-800">
                  Select Codex Module
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setActiveTab('compendium');
                    setOpenCodexDropdown(null);
                  }}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition ${
                    activeTab === 'compendium'
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400'
                      : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-amber-400 shrink-0">
                    <BookOpen size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-stone-100">Card Compendium</div>
                    <p className="text-[10px] text-stone-400 font-mono truncate">Full collection blueprints & filters</p>
                  </div>
                  {activeTab === 'compendium' && <Check size={14} className="ml-auto text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setActiveTab('glyphCodex');
                    setOpenCodexDropdown(null);
                  }}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition ${
                    activeTab === 'glyphCodex'
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400'
                      : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-amber-400 shrink-0">
                    <Sparkles size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-stone-100">Glyph Lexicon Engine</div>
                    <p className="text-[10px] text-stone-400 font-mono truncate">Universal power glyphs & live dice</p>
                  </div>
                  {activeTab === 'glyphCodex' && <Check size={14} className="ml-auto text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setActiveTab('iconRegistry');
                    setOpenCodexDropdown(null);
                  }}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition ${
                    activeTab === 'iconRegistry'
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400'
                      : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-cyan-400 shrink-0">
                    <Cpu size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-stone-100">Domain Icons & Ability Codex</div>
                    <p className="text-[10px] text-stone-400 font-mono truncate">Domain identity & ability catalog</p>
                  </div>
                  {activeTab === 'iconRegistry' && <Check size={14} className="ml-auto text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setActiveTab('interactiveRulebook');
                    setOpenCodexDropdown(null);
                  }}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition ${
                    activeTab === 'interactiveRulebook'
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400'
                      : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-purple-400 shrink-0">
                    <Compass size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-stone-100">Interactive Rulebook</div>
                    <p className="text-[10px] text-stone-400 font-mono truncate">Turn phases, combat flow & FAQ</p>
                  </div>
                  {activeTab === 'interactiveRulebook' && <Check size={14} className="ml-auto text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setActiveTab('combatMeters');
                    setOpenCodexDropdown(null);
                  }}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition ${
                    activeTab === 'combatMeters'
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400'
                      : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 text-emerald-400 shrink-0">
                    <Activity size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-stone-100">Radar & Attribute Matrix</div>
                    <p className="text-[10px] text-stone-400 font-mono truncate">5-stat radar analysis & charts</p>
                  </div>
                  {activeTab === 'combatMeters' && <Check size={14} className="ml-auto text-amber-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Bulk Import JSON Button */}
          <button
            type="button"
            id="btn-codex-bulk-import"
            onClick={() => {
              soundEngine.playMicroSound('select');
              setIsBulkImportOpen(true);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5 transition shadow-sm ml-auto"
            title="Import JSON array of card definitions into local collection"
          >
            <Upload size={14} className="text-amber-400" />
            <span>Bulk Import JSON</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: CARD COMPENDIUM ================= */}
      {activeTab === 'compendium' && (
        <div className="space-y-6">
          {/* Top Compendium Action Bar */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 shadow-lg">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search cards by name, domain, ability, power glyph, or lore..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-sans shadow-inner"
                />
              </div>

              {/* Action Buttons & Utilities Dropdown */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Codex Utilities Dropdown Menu */}
                <div className="relative">
                  <button
                    type="button"
                    id="btn-codex-utilities-dropdown"
                    onClick={() => {
                      soundEngine.playMicroSound('click');
                      setOpenCodexDropdown(prev => prev === 'utilities' ? null : 'utilities');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-850 text-stone-200 border border-stone-700 hover:border-amber-500 text-xs font-cinzel font-bold flex items-center gap-2 transition shadow"
                  >
                    <SlidersHorizontal size={14} className="text-amber-400" />
                    <span>View Controls</span>
                    <ChevronDown size={14} className={`text-amber-400 transition-transform ${openCodexDropdown === 'utilities' ? 'rotate-180' : ''}`} />
                  </button>

                  {openCodexDropdown === 'utilities' && (
                    <div className="absolute top-full right-0 mt-2 w-60 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl">
                      <div className="px-2 py-1 text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider border-b border-stone-800">
                        Codex Display & Tools
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsFilterSidebarOpen(!isFilterSidebarOpen);
                          setOpenCodexDropdown(null);
                        }}
                        className="w-full text-left p-2 rounded-xl flex items-center justify-between hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <SlidersHorizontal size={14} className="text-amber-400" />
                          <span>Filter Sidebar</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isFilterSidebarOpen ? 'bg-amber-500/20 text-amber-300' : 'bg-stone-900 text-stone-500'}`}>
                          {isFilterSidebarOpen ? 'OPEN' : 'CLOSED'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowQuickRadar(!showQuickRadar);
                          setOpenCodexDropdown(null);
                        }}
                        className="w-full text-left p-2 rounded-xl flex items-center justify-between hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Activity size={14} className="text-amber-400" />
                          <span>Radar Inspector</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${showQuickRadar ? 'bg-amber-500/20 text-amber-300' : 'bg-stone-900 text-stone-500'}`}>
                          {showQuickRadar ? 'ON' : 'OFF'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleOpenComparison();
                          setOpenCodexDropdown(null);
                        }}
                        className="w-full text-left p-2 rounded-xl flex items-center gap-2 hover:bg-stone-900 text-purple-200 transition font-cinzel text-xs"
                      >
                        <Scale size={14} className="text-purple-400" />
                        <span>Compare Cards Modal</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleResetFilters();
                          setOpenCodexDropdown(null);
                        }}
                        className="w-full text-left p-2 rounded-xl flex items-center gap-2 hover:bg-stone-900 text-stone-400 hover:text-stone-200 transition font-cinzel text-xs border-t border-stone-900"
                      >
                        <RotateCcw size={13} />
                        <span>Reset All Filters</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct Compare Shortcut */}
                <button
                  type="button"
                  id="btn-open-codex-comparison"
                  onClick={() => handleOpenComparison()}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-900/80 to-indigo-900/80 hover:from-purple-800 hover:to-indigo-800 border border-purple-500/60 text-purple-200 hover:text-white text-xs font-cinzel font-bold flex items-center gap-2 transition shadow"
                  title="Open Side-by-Side Card Comparison Modal with dual radar charts"
                >
                  <Scale size={14} className="text-purple-300" />
                  <span className="hidden sm:inline">Compare</span>
                </button>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-stone-400">
                <span>Displaying: <strong className="text-amber-300">{sortedCards.length}</strong> of {cards.length} Cards</span>
                {(minPower > 0 || minSpeed > 0 || minDefense > 0 || maxCostFilter < 10 || selectedDomain !== 'All' || selectedType !== 'All' || selectedRarity !== 'All' || selectedKeywordFilter !== 'All') && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                    Active Filters Applied
                  </span>
                )}
              </div>

              {/* Custom Sort Dropdown Menu */}
              <div className="relative">
                <button
                  type="button"
                  id="btn-sort-by-dropdown"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setOpenCodexDropdown(prev => prev === 'sort' ? null : 'sort');
                  }}
                  className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-700 hover:border-amber-500 text-amber-300 text-xs font-cinzel flex items-center gap-2 transition"
                >
                  <span className="text-stone-400 text-[11px]">Sort:</span>
                  <span className="font-bold">
                    {sortBy === 'rarity' && 'Rarity Tier'}
                    {sortBy === 'power-desc' && 'Power: High to Low ⚔️'}
                    {sortBy === 'power-asc' && 'Power: Low to High ⚔️'}
                    {sortBy === 'speed-desc' && 'Speed: High to Low ⚡'}
                    {sortBy === 'speed-asc' && 'Speed: Low to High ⚡'}
                    {sortBy === 'defense-desc' && 'Defense: High to Low 🛡️'}
                    {sortBy === 'defense-asc' && 'Defense: Low to High 🛡️'}
                    {sortBy === 'cost-asc' && 'Cost: Low to High 💎'}
                    {sortBy === 'cost-desc' && 'Cost: High to Low 💎'}
                    {sortBy === 'domain' && 'Domain Affinity 🌐'}
                    {sortBy === 'name' && 'Alphabetical (A - Z)'}
                  </span>
                  <ChevronDown size={13} className={`text-amber-400 transition-transform ${openCodexDropdown === 'sort' ? 'rotate-180' : ''}`} />
                </button>

                {openCodexDropdown === 'sort' && (
                  <div className="absolute top-full right-0 mt-1.5 w-56 rounded-xl bg-stone-950 border border-stone-700 shadow-2xl p-1.5 z-50 space-y-1">
                    {[
                      { id: 'rarity', label: 'Rarity (Highest Tier)' },
                      { id: 'power-desc', label: 'Power: High to Low ⚔️' },
                      { id: 'power-asc', label: 'Power: Low to High ⚔️' },
                      { id: 'speed-desc', label: 'Speed: High to Low ⚡' },
                      { id: 'speed-asc', label: 'Speed: Low to High ⚡' },
                      { id: 'defense-desc', label: 'Defense: High to Low 🛡️' },
                      { id: 'defense-asc', label: 'Defense: Low to High 🛡️' },
                      { id: 'cost-asc', label: 'Cost: Low to High 💎' },
                      { id: 'cost-desc', label: 'Cost: High to Low 💎' },
                      { id: 'domain', label: 'Domain Affinity 🌐' },
                      { id: 'name', label: 'Alphabetical (A - Z)' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playMicroSound('select');
                          setSortBy(opt.id as any);
                          setOpenCodexDropdown(null);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-cinzel flex items-center justify-between transition ${
                          sortBy === opt.id
                            ? 'bg-amber-500 text-black font-bold'
                            : 'hover:bg-stone-900 text-stone-300'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.id && <Check size={13} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Compendium Workspace with Interactive Sidebar */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            
            {/* ================= INTERACTIVE SIDEBAR FILTER ================= */}
            <AnimatePresence>
              {isFilterSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: -20 }}
                  animate={{ opacity: 1, width: 'auto', x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -20 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                  className="w-full lg:w-72 shrink-0 space-y-4"
                >
                  <div className="p-4 rounded-2xl bg-stone-900/95 border border-amber-500/40 shadow-xl backdrop-blur-md space-y-4 sticky top-20">
                    
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                      <div className="flex items-center gap-2 text-amber-300">
                        <Filter size={15} />
                        <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider">
                          Attribute Filters
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="text-[10px] font-mono text-stone-400 hover:text-amber-300 underline cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>

                    {/* 1. DOMAIN TYPE SELECTOR DROPDOWN */}
                    <div className="space-y-1.5 relative">
                      <label className="text-[10px] font-cinzel font-bold text-stone-300 uppercase tracking-wider flex items-center justify-between">
                        <span>Domain Affinity</span>
                      </label>
                      <button
                        type="button"
                        id="btn-sidebar-domain-dropdown"
                        onClick={() => {
                          soundEngine.playMicroSound('click');
                          setOpenCodexDropdown(prev => prev === 'sidebar-domain' ? null : 'sidebar-domain');
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-xs font-cinzel text-amber-200 flex items-center justify-between transition"
                      >
                        <span className="flex items-center gap-1.5 font-bold">
                          {selectedDomain === 'All' ? '🌐 All Domains' : selectedDomain}
                        </span>
                        <ChevronDown size={13} className={`text-amber-400 transition-transform ${openCodexDropdown === 'sidebar-domain' ? 'rotate-180' : ''}`} />
                      </button>

                      {openCodexDropdown === 'sidebar-domain' && (
                        <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-stone-950 border border-amber-500/40 shadow-2xl p-1.5 z-50 space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playMicroSound('select');
                              setSelectedDomain('All');
                              setOpenCodexDropdown(null);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-cinzel flex items-center justify-between transition ${
                              selectedDomain === 'All' ? 'bg-amber-500 text-black font-bold' : 'hover:bg-stone-900 text-stone-300'
                            }`}
                          >
                            <span>🌐 All Domains</span>
                            <span className="text-[10px] font-mono opacity-80">{cards.length}</span>
                          </button>
                          {(['Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss'] as const).map((d) => {
                            const domainCount = cards.filter(c => c.domain === d).length;
                            const iconMap: Record<string, string> = {
                              Sanctuary: '✨',
                              Radiance: '🌋',
                              Verdance: '🌿',
                              Arcane: '🌌',
                              Abyss: '💀'
                            };
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => {
                                  soundEngine.playMicroSound('select');
                                  setSelectedDomain(d);
                                  setOpenCodexDropdown(null);
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-cinzel flex items-center justify-between transition ${
                                  selectedDomain === d ? 'bg-amber-500 text-black font-bold' : 'hover:bg-stone-900 text-stone-300'
                                }`}
                              >
                                <span>{iconMap[d]} {d}</span>
                                <span className="text-[10px] font-mono opacity-80">{domainCount}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* 2. ATTRIBUTE SLIDERS: POWER, SPEED, DEFENSE */}
                    <div className="space-y-3 pt-2 border-t border-stone-800">
                      <span className="text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider block">
                        Combat Stat Thresholds
                      </span>

                      {/* Power Range Slider */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="flex items-center gap-1 text-red-400 font-bold">
                            <Sword size={12} />
                            <span>Min Power:</span>
                          </span>
                          <span className="text-stone-100 font-bold px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800">
                            {minPower}+ ATK
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="12"
                          value={minPower}
                          onChange={(e) => setMinPower(Number(e.target.value))}
                          className="w-full accent-red-500 h-1.5 bg-stone-950 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Speed / Momentum Range Slider */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="flex items-center gap-1 text-yellow-400 font-bold">
                            <Zap size={12} />
                            <span>Min Speed:</span>
                          </span>
                          <span className="text-stone-100 font-bold px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800">
                            {minSpeed}+ SPD
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={minSpeed}
                          onChange={(e) => setMinSpeed(Number(e.target.value))}
                          className="w-full accent-yellow-500 h-1.5 bg-stone-950 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Defense / Health Range Slider */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="flex items-center gap-1 text-blue-400 font-bold">
                            <Shield size={12} />
                            <span>Min Defense:</span>
                          </span>
                          <span className="text-stone-100 font-bold px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800">
                            {minDefense}+ HP
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="12"
                          value={minDefense}
                          onChange={(e) => setMinDefense(Number(e.target.value))}
                          className="w-full accent-blue-500 h-1.5 bg-stone-950 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Max Essence Cost Slider */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="flex items-center gap-1 text-purple-400 font-bold">
                            <Layers size={12} />
                            <span>Max Essence:</span>
                          </span>
                          <span className="text-stone-100 font-bold px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800">
                            ≤ {maxCostFilter} Mana
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={maxCostFilter}
                          onChange={(e) => setMaxCostFilter(Number(e.target.value))}
                          className="w-full accent-purple-500 h-1.5 bg-stone-950 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* 3. CARD TYPE FILTER DROPDOWN */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-800 relative">
                      <label className="text-[10px] font-cinzel font-bold text-stone-300 uppercase tracking-wider block">
                        Card Type Classification
                      </label>
                      <button
                        type="button"
                        id="btn-sidebar-type-dropdown"
                        onClick={() => {
                          soundEngine.playMicroSound('click');
                          setOpenCodexDropdown(prev => prev === 'sidebar-type' ? null : 'sidebar-type');
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-xs font-cinzel text-amber-200 flex items-center justify-between transition"
                      >
                        <span className="font-bold">{selectedType === 'All' ? 'All Types' : selectedType}</span>
                        <ChevronDown size={13} className={`text-amber-400 transition-transform ${openCodexDropdown === 'sidebar-type' ? 'rotate-180' : ''}`} />
                      </button>

                      {openCodexDropdown === 'sidebar-type' && (
                        <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-xl bg-stone-950 border border-amber-500/40 shadow-2xl p-1.5 z-50 space-y-1 custom-scrollbar">
                          {(['All', 'Champion', 'Character', 'Spell', 'Artifact', 'Relic', 'Weapon', 'Armor', 'Beast', 'Environment', 'Minion', 'Ritual'] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => {
                                soundEngine.playMicroSound('select');
                                setSelectedType(t as any);
                                setOpenCodexDropdown(null);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-cinzel flex items-center justify-between transition ${
                                selectedType === t ? 'bg-amber-500 text-black font-bold' : 'hover:bg-stone-900 text-stone-300'
                              }`}
                            >
                              <span>{t}</span>
                              {selectedType === t && <Check size={13} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 4. RARITY TIER FILTER DROPDOWN */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-800 relative">
                      <label className="text-[10px] font-cinzel font-bold text-stone-300 uppercase tracking-wider block">
                        Rarity Tier
                      </label>
                      <button
                        type="button"
                        id="btn-sidebar-rarity-dropdown"
                        onClick={() => {
                          soundEngine.playMicroSound('click');
                          setOpenCodexDropdown(prev => prev === 'sidebar-rarity' ? null : 'sidebar-rarity');
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-xs font-cinzel text-amber-200 flex items-center justify-between transition"
                      >
                        <span className="font-bold">{selectedRarity === 'All' ? 'All Rarities' : selectedRarity}</span>
                        <ChevronDown size={13} className={`text-amber-400 transition-transform ${openCodexDropdown === 'sidebar-rarity' ? 'rotate-180' : ''}`} />
                      </button>

                      {openCodexDropdown === 'sidebar-rarity' && (
                        <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-xl bg-stone-950 border border-amber-500/40 shadow-2xl p-1.5 z-50 space-y-1 custom-scrollbar">
                          {(['All', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Mythic', 'Divine Boundless'] as const).map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => {
                                soundEngine.playMicroSound('select');
                                setSelectedRarity(r as any);
                                setOpenCodexDropdown(null);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-cinzel flex items-center justify-between transition ${
                                selectedRarity === r ? 'bg-amber-500 text-black font-bold' : 'hover:bg-stone-900 text-stone-300'
                              }`}
                            >
                              <span>{r}</span>
                              {selectedRarity === r && <Check size={13} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 5. KEYWORDS & MECHANICS FILTER */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-800">
                      <label className="text-[10px] font-cinzel font-bold text-stone-300 uppercase tracking-wider block">
                        Keyword / Trait Interaction
                      </label>
                      <select
                        value={selectedKeywordFilter}
                        onChange={(e) => setSelectedKeywordFilter(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-amber-300 text-xs font-sans focus:outline-none focus:border-amber-500"
                      >
                        <option value="All">All Keyword Traits</option>
                        <option value="Taunt">🛡️ Taunt / Vanguard</option>
                        <option value="Shield">✨ Aegis / Divine Shield</option>
                        <option value="Siphon">💀 Siphon / Lifesteal</option>
                        <option value="Quickstrike">💨 Haste / Quickstrike</option>
                        <option value="Burn">🌋 Magma Burn / Flare</option>
                        <option value="Spellcraft">🌌 Spellcraft / Attunement</option>
                        <option value="Overpower">💥 Overpower / Trample</option>
                        <option value="Regeneration">🌿 Primeval Regeneration</option>
                      </select>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards Display Grid & Inspector */}
            <div className="flex-1 min-w-0 space-y-6">
              
              <div className={showQuickRadar ? 'grid grid-cols-1 xl:grid-cols-3 gap-6 items-start' : 'w-full'}>
                {/* Card Items Container */}
                <div className={showQuickRadar ? 'xl:col-span-2' : 'w-full'}>
                  <motion.div 
                    key={`${selectedDomain}-${selectedType}-${selectedRarity}-${sortBy}-${minPower}-${minSpeed}-${minDefense}-${maxCostFilter}-${selectedKeywordFilter}-${searchQuery}`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.03
                        }
                      }
                    }}
                    className={`grid gap-5 ${
                      isFilterSidebarOpen
                        ? showQuickRadar 
                          ? 'grid-cols-1 sm:grid-cols-2' 
                          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                        : showQuickRadar
                          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    }`}
                  >
                    {sortedCards.map((card) => (
                      <motion.div 
                        key={card.id} 
                        variants={{
                          hidden: { opacity: 0, y: 20, scale: 0.94 },
                          visible: { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            transition: {
                              type: 'spring',
                              damping: 18,
                              stiffness: 240
                            }
                          }
                        }}
                        whileHover={{ 
                          y: -6, 
                          scale: 1.02, 
                          transition: { type: 'spring', damping: 14, stiffness: 350 } 
                        }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex justify-center transition-all cursor-pointer rounded-2xl p-1 relative ${
                          activeQuickInspectCard?.id === card.id ? 'ring-2 ring-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20' : ''
                        }`}
                        onClick={() => setActiveQuickInspectCard(card)}
                      >
                        <CardItem
                          card={card}
                          size="md"
                          onInspect={() => onInspectCard(card)}
                          onClick={() => {
                            setActiveQuickInspectCard(card);
                            onInspectCard(card);
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {sortedCards.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-12 text-center bg-stone-900/60 rounded-3xl border border-stone-800 space-y-3"
                    >
                      <Filter size={32} className="mx-auto text-stone-600" />
                      <p className="font-cinzel text-base text-stone-200">No cards matched your current sidebar filter parameters.</p>
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="px-4 py-2 rounded-xl bg-amber-500 text-black font-cinzel font-bold text-xs"
                      >
                        Reset All Filters
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Quick Radar Inspector Dock */}
                <AnimatePresence mode="wait">
                  {showQuickRadar && activeQuickInspectCard && (
                    <motion.div 
                      key={activeQuickInspectCard.id}
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                      className="sticky top-20 space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-stone-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-md">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                              Live Codex Inspector
                            </span>
                            <h3 className="font-cinzel font-bold text-base text-amber-100 truncate max-w-[200px]">
                              {activeQuickInspectCard.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => onInspectCard(activeQuickInspectCard)}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-black font-cinzel font-bold text-xs hover:bg-amber-400 transition-colors shadow flex items-center gap-1"
                          >
                            <span>Deep Dive</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>

                        {/* Render the Recharts Radar Chart */}
                        <CardAttributeRadarChart 
                          card={activeQuickInspectCard}
                          size="md"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: GLYPH LEXICON ENGINE ================= */}
      {activeTab === 'glyphCodex' && (
        <GlyphLexiconEngine onInspectCard={onInspectCard} />
      )}

      {/* ================= TAB 2.5: CODEX ICON REGISTRY ================= */}
      {activeTab === 'iconRegistry' && (
        <CodexIconRegistry />
      )}

      {/* ================= TAB 3: INTERACTIVE RULEBOOK ================= */}
      {activeTab === 'interactiveRulebook' && (
        <div className="space-y-6">
          {/* Rulebook Subnav */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-stone-900 rounded-xl border border-stone-800 font-cinzel text-xs">
            <button
              onClick={() => setRulebookSubtab('matrix')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition ${
                rulebookSubtab === 'matrix' ? 'bg-amber-500 text-black shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Activity size={14} />
              <span>5-Axis Tactical Matrix</span>
            </button>

            <button
              onClick={() => setRulebookSubtab('lanes')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition ${
                rulebookSubtab === 'lanes' ? 'bg-amber-500 text-black shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Layers size={14} />
              <span>3-Lane Combat Mechanics</span>
            </button>

            <button
              onClick={() => setRulebookSubtab('foils')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition ${
                rulebookSubtab === 'foils' ? 'bg-amber-500 text-black shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Sparkles size={14} />
              <span>Holographic Foil Finishes</span>
            </button>

            <button
              onClick={() => setRulebookSubtab('attunement')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition ${
                rulebookSubtab === 'attunement' ? 'bg-amber-500 text-black shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Award size={14} />
              <span>Attunement & Divine Ranks</span>
            </button>

            <button
              onClick={() => setRulebookSubtab('phases')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition ${
                rulebookSubtab === 'phases' ? 'bg-amber-500 text-black shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Workflow size={14} />
              <span>Turn Flowchart & Resolution</span>
            </button>
          </div>

          {/* SUBTAB 1: 5-AXIS TACTICAL MATRIX */}
          {rulebookSubtab === 'matrix' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Interactive Radar Chart */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col items-center justify-center space-y-4">
                <h3 className="font-cinzel font-bold text-base text-amber-200 text-center">
                  Live Dynamic Radar Polygon
                </h3>

                <div className="relative w-64 h-64">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, idx) => {
                      const r = maxRadius * scale;
                      const points = radarPoints.map(p => {
                        const x = center + r * Math.cos(p.angle);
                        const y = center + r * Math.sin(p.angle);
                        return `${x},${y}`;
                      }).join(' ');
                      return (
                        <polygon
                          key={idx}
                          points={points}
                          fill="none"
                          stroke="rgba(212, 175, 55, 0.2)"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {radarPoints.map((p, idx) => (
                      <line
                        key={idx}
                        x1={center}
                        y1={center}
                        x2={center + maxRadius * Math.cos(p.angle)}
                        y2={center + maxRadius * Math.sin(p.angle)}
                        stroke="rgba(212, 175, 55, 0.3)"
                        strokeWidth="1"
                      />
                    ))}

                    <polygon
                      points={polygonCoords}
                      fill="rgba(234, 179, 8, 0.3)"
                      stroke="#eab308"
                      strokeWidth="2"
                    />

                    {radarPoints.map((p, idx) => {
                      const coords = getCoordinates(p.val, p.angle).split(',');
                      return (
                        <circle
                          key={idx}
                          cx={coords[0]}
                          cy={coords[1]}
                          r="4"
                          fill="#fbbf24"
                          stroke="#000"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </svg>

                  <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-cinzel font-bold text-amber-300">
                    Damage ({radarSliders.damage})
                  </div>
                  <div className="absolute top-1/4 right-0 text-[10px] font-cinzel font-bold text-amber-300">
                    Durability ({radarSliders.durability})
                  </div>
                  <div className="absolute bottom-6 right-3 text-[10px] font-cinzel font-bold text-amber-300">
                    Mobility ({radarSliders.mobility})
                  </div>
                  <div className="absolute bottom-6 left-3 text-[10px] font-cinzel font-bold text-amber-300">
                    Utility ({radarSliders.utility})
                  </div>
                  <div className="absolute top-1/4 left-0 text-[10px] font-cinzel font-bold text-amber-300">
                    Control ({radarSliders.control})
                  </div>
                </div>

                {/* Derived Archetype Badge */}
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 w-full text-center space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">
                    Calculated Archetype Class
                  </span>
                  <h4 className="font-cinzel font-bold text-base text-amber-100">
                    {archetypeInfo.title}
                  </h4>
                  <p className="text-xs text-stone-300">
                    {archetypeInfo.desc}
                  </p>
                </div>
              </div>

              {/* Slider Controls & Detailed Axis Definitions */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel font-bold text-base text-amber-100">
                    Tactical Matrix Calibrator
                  </h3>
                  <button
                    onClick={() => setRadarSliders({ damage: 7, durability: 7, mobility: 7, utility: 7, control: 7 })}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Sliders */}
                <div className="space-y-3">
                  {(['damage', 'durability', 'mobility', 'utility', 'control'] as const).map((axis) => (
                    <div key={axis} className="space-y-1">
                      <div className="flex justify-between text-xs font-cinzel">
                        <span className="capitalize text-stone-200 font-bold">{axis}</span>
                        <span className="font-mono text-amber-400 font-bold">{radarSliders[axis]} / 10.0</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={radarSliders[axis]}
                        onChange={(e) => setRadarSliders(prev => ({ ...prev, [axis]: parseFloat(e.target.value) }))}
                        className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  ))}
                </div>

                {/* Axis Definitions Guide */}
                <div className="pt-3 border-t border-stone-800 text-xs text-stone-300 space-y-2">
                  <p>• <strong>Damage:</strong> Raw physical and magical burst capacity to pierce defenses.</p>
                  <p>• <strong>Durability:</strong> Armor resistance, health pool, and damage absorption wards.</p>
                  <p>• <strong>Mobility:</strong> Lane swapping freedom, initiative turn order, and evasion.</p>
                  <p>• <strong>Utility:</strong> Card draw, resource ramp, buff dispersion, and dispels.</p>
                  <p>• <strong>Control:</strong> Stuns, roots, knockbacks, taunts, and terrain alterations.</p>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 2: 3-LANE COMBAT MECHANICS */}
          {rulebookSubtab === 'lanes' && (
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-6">
              <div>
                <h3 className="font-cinzel font-bold text-xl text-amber-100">
                  3-Lane Strategic Combat Architecture
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  The Aetheria battlefield consists of three primary active lanes and a backline tactical support tier.
                </p>
              </div>

              {/* Interactive Board Visualizer */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-stone-950 border border-stone-800">
                {/* Left Flank */}
                <div 
                  onClick={() => setActiveLaneHighlight('flank-left')}
                  className={`p-4 rounded-xl border cursor-pointer transition text-center space-y-2 ${
                    activeLaneHighlight === 'flank-left' 
                      ? 'bg-emerald-950/50 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-stone-900 border-stone-800 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="text-2xl">🏹</span>
                  <h4 className="font-cinzel font-bold text-sm text-emerald-300">Left Flank</h4>
                  <p className="text-[11px] text-stone-300">
                    High mobility & speed lane. Can bypass center taunt units to strike backline champions directly.
                  </p>
                </div>

                {/* Center Vanguard */}
                <div 
                  onClick={() => setActiveLaneHighlight('vanguard')}
                  className={`p-4 rounded-xl border cursor-pointer transition text-center space-y-2 ${
                    activeLaneHighlight === 'vanguard' 
                      ? 'bg-red-950/50 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'bg-stone-900 border-stone-800 hover:border-red-500/50'
                  }`}
                >
                  <span className="text-2xl">🛡️</span>
                  <h4 className="font-cinzel font-bold text-sm text-red-300">Center Vanguard</h4>
                  <p className="text-[11px] text-stone-300">
                    Heavy juggernaut collision zone. Units stationed here absorb primary frontline attacks and enforce Taunt barriers.
                  </p>
                </div>

                {/* Right Flank */}
                <div 
                  onClick={() => setActiveLaneHighlight('flank-right')}
                  className={`p-4 rounded-xl border cursor-pointer transition text-center space-y-2 ${
                    activeLaneHighlight === 'flank-right' 
                      ? 'bg-emerald-950/50 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-stone-900 border-stone-800 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="text-2xl">🗡️</span>
                  <h4 className="font-cinzel font-bold text-sm text-emerald-300">Right Flank</h4>
                  <p className="text-[11px] text-stone-300">
                    Flanking strike vector. Attacks deal +2 bonus damage if opponent center vanguard is engaged in combat.
                  </p>
                </div>
              </div>

              {/* Backline Tier */}
              <div 
                onClick={() => setActiveLaneHighlight('backline')}
                className={`p-4 rounded-xl border cursor-pointer transition text-center space-y-1 ${
                  activeLaneHighlight === 'backline' 
                    ? 'bg-purple-950/50 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'bg-stone-950 border-stone-800 hover:border-purple-500/50'
                }`}
              >
                <h4 className="font-cinzel font-bold text-sm text-purple-300">Backline Support & Command Tier</h4>
                <p className="text-xs text-stone-300">
                  Protected zone for Relics, Grimoires, and Spellcasters. Cannot be targeted directly unless frontline units fall or reach/flanking attacks are used.
                </p>
              </div>
            </div>
          )}

          {/* SUBTAB 3: HOLOGRAPHIC FOIL FINISHES */}
          {rulebookSubtab === 'foils' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="space-y-4">
                <h3 className="font-cinzel font-bold text-xl text-amber-100">
                  Holographic Foil Shader Engine
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Every card in Aetheria can be forged in four distinct collector finishes, rendered using dynamic CSS 3D parallax lighting shaders.
                </p>

                <div className="space-y-2 font-cinzel text-xs">
                  <div 
                    onClick={() => setDemoFoil('none')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      demoFoil === 'none' ? 'bg-amber-500 text-black font-bold' : 'bg-stone-950 border-stone-800 text-stone-300'
                    }`}
                  >
                    <span>1. Standard Matte Finish</span>
                    <span className="font-mono text-[10px]">Natural Surface</span>
                  </div>

                  <div 
                    onClick={() => setDemoFoil('gold')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      demoFoil === 'gold' ? 'bg-amber-500 text-black font-bold' : 'bg-stone-950 border-stone-800 text-stone-300'
                    }`}
                  >
                    <span>2. Gilded Auric Gold Foil</span>
                    <span className="font-mono text-[10px]">Metallic Specular Glare</span>
                  </div>

                  <div 
                    onClick={() => setDemoFoil('prismatic')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      demoFoil === 'prismatic' ? 'bg-amber-500 text-black font-bold' : 'bg-stone-950 border-stone-800 text-stone-300'
                    }`}
                  >
                    <span>3. Prismatic Starlight Foil</span>
                    <span className="font-mono text-[10px]">Iridescent Rainbow Refraction</span>
                  </div>

                  <div 
                    onClick={() => setDemoFoil('cosmic')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      demoFoil === 'cosmic' ? 'bg-amber-500 text-black font-bold' : 'bg-stone-950 border-stone-800 text-stone-300'
                    }`}
                  >
                    <span>4. Cosmic Abyssal Foil</span>
                    <span className="font-mono text-[10px]">Deep Void Nebula Shimmer</span>
                  </div>
                </div>
              </div>

              {/* Live 3D Card Preview */}
              <div className="flex flex-col items-center justify-center p-4 bg-stone-950 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono text-amber-400 mb-3 uppercase tracking-wider">
                  Interactive 3D Tilt Preview ({demoFoil.toUpperCase()})
                </span>
                <CardItem
                  card={cards[0]}
                  size="md"
                  foilType={demoFoil}
                  interactive={true}
                  showInspectButton={false}
                />
              </div>
            </div>
          )}

          {/* SUBTAB 4: ATTUNEMENT & DIVINE RANKS */}
          {rulebookSubtab === 'attunement' && (
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-6">
              <div>
                <h3 className="font-cinzel font-bold text-xl text-amber-100">
                  Attunement & Divine Rank Hierarchy
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  High-tier mythical equipment and artifacts demand spiritual attunement from specific hero classes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={16} className="fill-amber-400" />
                    <span className="font-cinzel font-bold text-sm text-stone-100">Divine Rank 1 - 2</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-300 uppercase block">Common / Rare Relics</span>
                  <p className="text-xs text-stone-300">
                    Attuned by any martial or magical hero. Grants basic passive stat buffs without capacity restrictions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-purple-500/30 space-y-2">
                  <div className="flex items-center gap-1 text-purple-400">
                    <Star size={16} className="fill-purple-400" />
                    <Star size={16} className="fill-purple-400" />
                    <Star size={16} className="fill-purple-400" />
                    <span className="font-cinzel font-bold text-sm text-stone-100">Divine Rank 3 - 4</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase block">Very Rare / Legendary</span>
                  <p className="text-xs text-stone-300">
                    Requires attunement by specific classes (e.g. Druid, Ranger, Blood Knight, Chronomancer). Unlocks active Ultimate abilities.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-amber-400/60 space-y-2">
                  <div className="flex items-center gap-1 text-amber-300">
                    <Star size={16} className="fill-amber-300" />
                    <Star size={16} className="fill-amber-300" />
                    <Star size={16} className="fill-amber-300" />
                    <Star size={16} className="fill-amber-300" />
                    <Star size={16} className="fill-amber-300" />
                    <span className="font-cinzel font-bold text-sm text-amber-200">Divine Rank 5</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase block">Mythic Sovereign Tier</span>
                  <p className="text-xs text-stone-300">
                    Absolute cosmic artifacts (Pretāstra, Magma Jörmungandr, Ophanim). Only 1 Divine Rank 5 card allowed per deck build.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 5: TURN RESOLUTION FLOWCHART */}
          {rulebookSubtab === 'phases' && (
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-6">
              <div>
                <h3 className="font-cinzel font-bold text-xl text-amber-100">
                  Combat Clashing & Turn Resolution Sequence
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Each combat turn progresses through six strictly prioritized mechanical phases.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { step: '1. Upkeep & Essence', desc: 'Replenish essence crystals, trigger start-of-turn regenerations (Molten Core), and draw 1 card.', icon: '⭕' },
                  { step: '2. Pre-Combat Tactics', desc: 'Activate instant aura glyphs, spell amplifications, and declare lane movements.', icon: '✨' },
                  { step: '3. Main Deployment', desc: 'Play champion cards, equip weapons/artifacts, and cast high-impact tactical spells.', icon: '⚔️' },
                  { step: '4. Clashing Resolution', desc: 'Simultaneous lane clashing. Speed priority dictates which attacks strike first.', icon: '⚡' },
                  { step: '5. Fast Reaction Window', desc: 'Defenders trigger reaction glyphs (Molten Burst, Spore Swarm, Phase Shift) to mitigate damage.', icon: '🛡️' },
                  { step: '6. End Phase & Decay', desc: 'Resolve persistent burn damage, trigger death pacts (Soulbound), and reset reaction charges.', icon: '⏳' }
                ].map((phase, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{phase.icon}</span>
                      <h4 className="font-cinzel font-bold text-sm text-amber-200">{phase.step}</h4>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: RADAR & COMBAT ATTRIBUTE MATRIX STUDIO ================= */}
      {activeTab === 'combatMeters' && (
        <div className="space-y-8">
          {/* Main Interactive Radar Studio Card */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                  <Activity size={12} />
                  <span>Interactive Attribute Radar Studio</span>
                </span>
                <h3 className="font-cinzel font-bold text-xl text-amber-100 mt-1">
                  Card Power, Defense, Speed & Magic Matrix
                </h3>
                <p className="text-xs text-stone-300 max-w-2xl mt-0.5">
                  Analyze dynamic attribute distributions using Recharts radar modeling. Select any card to evaluate its combat footprint, benchmark against domain archetypes, or compare two cards side-by-side.
                </p>
              </div>

              {/* Axis Switcher */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-stone-950 border border-stone-800 font-cinzel text-xs">
                <button
                  onClick={() => setRadarDimensions(4)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    radarDimensions === 4
                      ? 'bg-amber-500 text-black shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  4-Core Axis (PWR / DEF / SPD / MAG)
                </button>
                <button
                  onClick={() => setRadarDimensions(6)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    radarDimensions === 6
                      ? 'bg-amber-500 text-black shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  6-Axis Tactical Matrix
                </button>
              </div>
            </div>

            {/* Selectors Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Card Selector */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <label className="text-xs font-cinzel font-bold text-amber-300 flex items-center justify-between">
                  <span>Primary Inspected Card</span>
                  <span className="text-[10px] font-mono text-stone-400">Target Card</span>
                </label>
                <select
                  value={selectedRadarCardId}
                  onChange={(e) => setSelectedRadarCardId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-200 font-cinzel focus:outline-none focus:border-amber-500"
                >
                  {cards.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.domain}] {c.name} ({c.cardType} • {c.rarity})
                    </option>
                  ))}
                </select>
              </div>

              {/* Comparison Card Selector */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <label className="text-xs font-cinzel font-bold text-cyan-300 flex items-center justify-between">
                  <span>Comparison Benchmark Card (Optional)</span>
                  <span className="text-[10px] font-mono text-stone-400">Side-by-Side</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={comparisonRadarCardId}
                    onChange={(e) => setComparisonRadarCardId(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-200 font-cinzel focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">-- No Comparison Card --</option>
                    {cards.filter(c => c.id !== selectedRadarCardId).map((c) => (
                      <option key={c.id} value={c.id}>
                        [{c.domain}] {c.name} ({c.cardType})
                      </option>
                    ))}
                  </select>
                  {comparisonRadarCardId && (
                    <button
                      onClick={() => setComparisonRadarCardId('')}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono"
                      title="Clear comparison"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Active Radar Display */}
            {(() => {
              const primaryCard = cards.find(c => c.id === selectedRadarCardId) || cards[0] || CARDS_DATABASE[0];
              const compCard = cards.find(c => c.id === comparisonRadarCardId);

              return (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
                    <CardAttributeRadarChart
                      card={primaryCard}
                      comparisonCard={compCard}
                      size="lg"
                      initialDimensions={radarDimensions}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => onInspectCard(primaryCard)}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-black font-cinzel font-bold text-xs hover:bg-amber-400 transition-colors shadow flex items-center gap-1.5"
                    >
                      <Eye size={14} />
                      <span>Open Complete 3D Deep Dive Inspector for {primaryCard.name}</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Quick Attribute Rankings / Leaders */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Codex Standouts
                </span>
                <h4 className="font-cinzel font-bold text-lg text-amber-100">
                  Attribute Leaders Across All Domains
                </h4>
              </div>
              <span className="text-xs text-stone-400 font-mono">
                Click to inspect on Radar
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Power Leaders */}
              <div className="p-4 rounded-xl bg-stone-950 border border-red-500/30 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-cinzel font-bold text-xs">
                  <Sword size={14} />
                  <span>Top Attack Power</span>
                </div>
                <div className="space-y-1.5">
                  {[...cards].sort((a, b) => b.power - a.power).slice(0, 3).map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedRadarCardId(c.id);
                        setActiveQuickInspectCard(c);
                      }}
                      className="w-full flex items-center justify-between text-left p-1.5 rounded-lg hover:bg-stone-900 transition text-xs"
                    >
                      <span className="text-stone-300 truncate max-w-[140px]">#{i+1} {c.name}</span>
                      <span className="font-mono font-bold text-red-400">{c.power} PWR</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Defense Leaders */}
              <div className="p-4 rounded-xl bg-stone-950 border border-blue-500/30 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-cinzel font-bold text-xs">
                  <Shield size={14} />
                  <span>Top Defense & Resilience</span>
                </div>
                <div className="space-y-1.5">
                  {[...cards].sort((a, b) => b.defense - a.defense).slice(0, 3).map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedRadarCardId(c.id);
                        setActiveQuickInspectCard(c);
                      }}
                      className="w-full flex items-center justify-between text-left p-1.5 rounded-lg hover:bg-stone-900 transition text-xs"
                    >
                      <span className="text-stone-300 truncate max-w-[140px]">#{i+1} {c.name}</span>
                      <span className="font-mono font-bold text-blue-400">{c.defense} DEF</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Leaders */}
              <div className="p-4 rounded-xl bg-stone-950 border border-yellow-500/30 space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xs">
                  <Zap size={14} />
                  <span>Top Speed & Initiative</span>
                </div>
                <div className="space-y-1.5">
                  {[...cards].sort((a, b) => (b.speed ?? 5) - (a.speed ?? 5)).slice(0, 3).map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedRadarCardId(c.id);
                        setActiveQuickInspectCard(c);
                      }}
                      className="w-full flex items-center justify-between text-left p-1.5 rounded-lg hover:bg-stone-900 transition text-xs"
                    >
                      <span className="text-stone-300 truncate max-w-[140px]">#{i+1} {c.name}</span>
                      <span className="font-mono font-bold text-yellow-400">{c.speed ?? 5} SPD</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Magic / Essence Leaders */}
              <div className="p-4 rounded-xl bg-stone-950 border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-cinzel font-bold text-xs">
                  <Sparkles size={14} />
                  <span>Top Magic / Cost Ratio</span>
                </div>
                <div className="space-y-1.5">
                  {[...cards].sort((a, b) => b.cost - a.cost).slice(0, 3).map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedRadarCardId(c.id);
                        setActiveQuickInspectCard(c);
                      }}
                      className="w-full flex items-center justify-between text-left p-1.5 rounded-lg hover:bg-stone-900 transition text-xs"
                    >
                      <span className="text-stone-300 truncate max-w-[140px]">#{i+1} {c.name}</span>
                      <span className="font-mono font-bold text-purple-400">{c.cost} COST</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reference Attribute Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-500/50 flex items-center justify-center text-red-400">
                  <Sword size={20} />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-red-200">Strength & Attack Power (PWR)</h3>
                  <p className="text-xs text-stone-300">Determines basic damage and physical cleave thresholds.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-2">
                <p>• <strong>0 - 4 PWR:</strong> Light support, control tokens, and utility artifacts.</p>
                <p>• <strong>5 - 7 PWR:</strong> Standard frontline combatants and lethal weapons.</p>
                <p>• <strong>8 - 10 PWR:</strong> Colossal mythic juggernauts capable of piercing reinforced armor shields.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/50 flex items-center justify-center text-blue-400">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-blue-200">Durability & Defense Class (DEF)</h3>
                  <p className="text-xs text-stone-300">Health reservoir, barrier resilience, and damage mitigation.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-2">
                <p>• <strong>0 - 4 DEF:</strong> Fragile skirmishers and glass-cannon casters.</p>
                <p>• <strong>5 - 7 DEF:</strong> Reliable battle-tested frontline units.</p>
                <p>• <strong>8 - 10 DEF:</strong> Impenetrable living ironbark and divine armors.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-950 border border-yellow-500/50 flex items-center justify-center text-yellow-400">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-yellow-200">Speed & Initiative Priority (SPD)</h3>
                  <p className="text-xs text-stone-300">Dictates attack turn order, flank evasion, and reaction readiness.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-2">
                <p>• Higher speed units resolve attacks before slower defenders can strike back.</p>
                <p>• Flank lane specialists with 8+ Speed can bypass Frontline Taunt barriers.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/50 flex items-center justify-center text-purple-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-purple-200">Magic & Energy Output (MAG)</h3>
                  <p className="text-xs text-stone-300">Spell amplification, ultimate gauge charge rate, and area manipulation.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-2">
                <p>• High Energy Output unlocks destructive Ultimate abilities in early battle rounds.</p>
                <p>• High Control enables multi-target immobilizations, stuns, and forced lane displacements.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Card Comparison Modal */}
      <CardComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        initialCardA={compareCardA}
        initialCardB={compareCardB}
        allCards={cards}
        onSelectInspect={onInspectCard}
      />

      {/* Bulk Card Import Modal */}
      <CodexBulkImportModal
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onImportCards={(imported) => {
          if (onBulkImportCards) {
            onBulkImportCards(imported);
          }
        }}
        existingCardsCount={cards.length}
      />
    </div>
  );
};
