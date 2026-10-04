import React, { useState, useRef, useEffect } from 'react';
import { Card, DeckPreset, Domain } from '../types';
import { CARDS_DATABASE, PRESET_DECKS } from '../data/cards';
import { CardItem } from './CardItem';
import { DeckDiagnosticsModal } from './DeckDiagnosticsModal';
import { DeckSynergyAnalyzerCard } from './DeckSynergyAnalyzerCard';
import { DeckExportModal } from './DeckExportModal';
import { DeckSynergyVisualizer } from './DeckSynergyVisualizer';
import { soundEngine } from '../utils/audioEngine';
import { missionsManager } from '../utils/missionsManager';
import { 
  Plus, 
  Trash2, 
  Layers, 
  Zap, 
  BarChart3, 
  Swords, 
  Check, 
  Sparkles, 
  Filter, 
  Search, 
  Share2, 
  Download, 
  Upload, 
  Copy, 
  FileCode, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  RotateCcw,
  Workflow,
  ChevronDown
} from 'lucide-react';

interface DeckBuilderProps {
  onInspectCard: (card: Card) => void;
  onSelectDeckForBattle: (deck: DeckPreset) => void;
}

export const DeckBuilder: React.FC<DeckBuilderProps> = ({
  onInspectCard,
  onSelectDeckForBattle
}) => {
  const [activeDeck, setActiveDeck] = useState<DeckPreset>(PRESET_DECKS[0]);
  const [customDeckCards, setCustomDeckCards] = useState<string[]>(PRESET_DECKS[0].cardIds);
  const [filterDomain, setFilterDomain] = useState<Domain | 'All'>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown menus state with outside-click dismissal
  const [openDeckDropdown, setOpenDeckDropdown] = useState<string | null>(null);
  const deckDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (deckDropdownRef.current && !deckDropdownRef.current.contains(e.target as Node)) {
        setOpenDeckDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, []);

  // Export / Import Modals State
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [exportString, setExportString] = useState('');
  const [importInput, setImportInput] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Handle deck preset switch
  const handleSelectPreset = (preset: DeckPreset) => {
    soundEngine.playMicroSound('click');
    setActiveDeck(preset);
    setCustomDeckCards([...preset.cardIds]);
  };

  // Add card to active deck
  const handleAddCard = (card: Card) => {
    if (customDeckCards.length >= 15) {
      soundEngine.playMicroSound('error');
      alert('Deck capacity reached (15 cards max for quick arena matches).');
      return;
    }
    soundEngine.playMicroSound('hover');
    setCustomDeckCards(prev => [...prev, card.id]);
  };

  // Remove card from active deck
  const handleRemoveCard = (cardId: string, index: number) => {
    soundEngine.playMicroSound('click');
    setCustomDeckCards(prev => prev.filter((_, idx) => idx !== index));
  };

  // Generate Encoded Export String
  const handleOpenExport = () => {
    soundEngine.playMicroSound('select');
    const exportPayload = {
      format: 'NEXUS_TCG_DECK_V2',
      id: `custom-deck-${Date.now()}`,
      name: activeDeck.name,
      description: activeDeck.description,
      domain: activeDeck.domain,
      cardIds: customDeckCards,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(exportPayload);
    const encoded = `NEXUS-DECK:${btoa(unescape(encodeURIComponent(jsonStr)))}`;
    setExportString(encoded);
    setIsExportOpen(true);
  };

  const handleCopyExportCode = () => {
    soundEngine.playMicroSound('click');
    navigator.clipboard.writeText(exportString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Process Imported String
  const handleProcessImport = () => {
    setImportError(null);
    setImportSuccess(null);
    try {
      let rawJson = importInput.trim();
      if (rawJson.startsWith('NEXUS-DECK:')) {
        const base64Data = rawJson.replace('NEXUS-DECK:', '');
        rawJson = decodeURIComponent(escape(atob(base64Data)));
      }

      const parsed = JSON.parse(rawJson);
      if (!parsed.cardIds || !Array.isArray(parsed.cardIds) || parsed.cardIds.length === 0) {
        throw new Error('Invalid deck payload. Missing "cardIds" array.');
      }

      // Validate cards
      const validCardIds = parsed.cardIds.filter((id: string) => 
        CARDS_DATABASE.some(c => c.id === id)
      );

      if (validCardIds.length === 0) {
        throw new Error('No recognized Nexus cards found in this deck code.');
      }

      const importedPreset: DeckPreset = {
        id: parsed.id || `imported-${Date.now()}`,
        name: parsed.name || 'Imported Grimoire Deck',
        title: parsed.title || 'Custom Architect Archetype',
        description: parsed.description || `Custom imported deck containing ${validCardIds.length} cards.`,
        domain: parsed.domain || 'Arcane',
        championCardId: parsed.championCardId || validCardIds[0],
        cardIds: validCardIds.slice(0, 15),
        color: parsed.color || 'from-indigo-600 to-purple-600',
        accent: parsed.accent || 'border-indigo-400'
      };

      setActiveDeck(importedPreset);
      setCustomDeckCards(importedPreset.cardIds);
      soundEngine.playMicroSound('unlock');
      setImportSuccess(`Successfully imported "${importedPreset.name}" with ${importedPreset.cardIds.length} cards!`);
      setTimeout(() => {
        setIsImportOpen(false);
        setImportInput('');
        setImportSuccess(null);
      }, 1800);
    } catch (err: any) {
      soundEngine.playMicroSound('error');
      setImportError(err.message || 'Failed to parse deck string. Ensure valid JSON or NEXUS-DECK base64 code.');
    }
  };

  // Filter pool cards
  const filteredPool = CARDS_DATABASE.filter(c => {
    if (filterDomain !== 'All' && c.domain !== filterDomain) return false;
    if (filterType !== 'All' && c.cardType !== filterType) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Calculate mana curve
  const deckFullCards = customDeckCards
    .map(id => CARDS_DATABASE.find(c => c.id === id))
    .filter(Boolean) as Card[];

  const manaCurve = {
    '1-2': deckFullCards.filter(c => c.cost <= 2).length,
    '3-4': deckFullCards.filter(c => c.cost >= 3 && c.cost <= 4).length,
    '5-6': deckFullCards.filter(c => c.cost >= 5 && c.cost <= 6).length,
    '7+': deckFullCards.filter(c => c.cost >= 7).length
  };

  const maxManaCount = Math.max(1, ...Object.values(manaCurve));

  return (
    <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header & Presets Bar */}
      <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400">
              Deck Forge & Grimoire
            </span>
            <h2 className="font-cinzel font-black text-2xl text-amber-100">
              {activeDeck.name}
            </h2>
            <p className="text-stone-300 text-xs mt-0.5">
              {activeDeck.description}
            </p>
          </div>

          {/* Action Buttons & Utilities Dropdown */}
          <div ref={deckDropdownRef} className="flex flex-wrap items-center gap-2.5 relative z-30">
            {/* Deck Preset Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                id="btn-deck-presets-dropdown"
                onClick={() => {
                  soundEngine.playMicroSound('click');
                  setOpenDeckDropdown(prev => prev === 'presets' ? null : 'presets');
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-200 border border-amber-500/40 text-xs font-cinzel font-bold flex items-center gap-2 transition shadow"
              >
                <Layers size={14} className="text-amber-400" />
                <span className="text-stone-400 text-[10px] uppercase font-mono">Preset:</span>
                <span className="text-amber-300">{activeDeck.name}</span>
                <ChevronDown size={14} className={`text-amber-400 transition-transform ${openDeckDropdown === 'presets' ? 'rotate-180' : ''}`} />
              </button>

              {openDeckDropdown === 'presets' && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-2xl p-2 z-50 space-y-1.5 backdrop-blur-xl">
                  <div className="px-2 py-1 text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider border-b border-stone-800">
                    Select Tournament Deck Preset
                  </div>
                  {PRESET_DECKS.map((preset) => {
                    const isSelected = activeDeck.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          handleSelectPreset(preset);
                          setOpenDeckDropdown(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between gap-2 transition ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-200 border border-amber-400'
                            : 'hover:bg-stone-900 text-stone-300 border border-transparent'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-cinzel font-bold text-xs truncate text-stone-100">{preset.name}</span>
                            <span 
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase"
                              style={{ backgroundColor: `${preset.color}33`, color: preset.color, border: `1px solid ${preset.color}66` }}
                            >
                              {preset.domain}
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-400 font-mono truncate mt-0.5">{preset.title}</p>
                        </div>
                        {isSelected && (
                          <span className="text-[9px] font-cinzel font-bold text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-500/40 shrink-0">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Deck Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                id="btn-deck-tools-dropdown"
                onClick={() => {
                  soundEngine.playMicroSound('click');
                  setOpenDeckDropdown(prev => prev === 'tools' ? null : 'tools');
                }}
                className="px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-500/50 text-xs font-cinzel font-bold flex items-center gap-2 transition shadow"
              >
                <Activity size={14} className="text-purple-400" />
                <span>Deck Utilities</span>
                <ChevronDown size={14} className={`text-purple-400 transition-transform ${openDeckDropdown === 'tools' ? 'rotate-180' : ''}`} />
              </button>

              {openDeckDropdown === 'tools' && (
                <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-stone-950 border border-purple-500/40 shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl">
                  <div className="px-2 py-1 text-[10px] font-cinzel font-bold text-purple-300 uppercase tracking-wider border-b border-stone-800">
                    Deck Analysis & Sharing
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      setIsDiagnosticsOpen(true);
                      setOpenDeckDropdown(null);
                    }}
                    className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                  >
                    <div className="p-1.5 rounded-lg bg-stone-900 text-purple-400 shrink-0">
                      <Activity size={14} />
                    </div>
                    <span>Deck Diagnostics & Curve</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      setIsVisualizerOpen(true);
                      setOpenDeckDropdown(null);
                    }}
                    className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                  >
                    <div className="p-1.5 rounded-lg bg-stone-900 text-amber-400 shrink-0">
                      <Workflow size={14} />
                    </div>
                    <span>D3 Synergy Visualizer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleOpenExport();
                      setOpenDeckDropdown(null);
                    }}
                    className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                  >
                    <div className="p-1.5 rounded-lg bg-stone-900 text-emerald-400 shrink-0">
                      <Share2 size={14} />
                    </div>
                    <span>Export Deck Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('click');
                      setIsImportOpen(true);
                      setOpenDeckDropdown(null);
                    }}
                    className="w-full text-left p-2 rounded-xl flex items-center gap-2.5 hover:bg-stone-900 text-stone-200 transition font-cinzel text-xs"
                  >
                    <div className="p-1.5 rounded-lg bg-stone-900 text-blue-400 shrink-0">
                      <Upload size={14} />
                    </div>
                    <span>Import Deck Code / JSON</span>
                  </button>
                </div>
              )}
            </div>

            {/* Action: Equip for Battle */}
            <button
              type="button"
              id="btn-equip-battle"
              onClick={() => {
                soundEngine.playMicroSound('equip');
                missionsManager.incrementProgress('deck', 1);
                missionsManager.incrementProgress('mission-deck-synergy', 1);
                onSelectDeckForBattle({ ...activeDeck, cardIds: customDeckCards });
              }}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition hover:scale-105"
            >
              <Swords size={16} />
              <span>Equip for Battle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Card Library / Pool (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-wrap items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search card name, subtype..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            {/* Domain Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                id="btn-builder-domain-filter-dropdown"
                onClick={() => {
                  soundEngine.playMicroSound('click');
                  setOpenDeckDropdown(prev => prev === 'builder-domain' ? null : 'builder-domain');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 hover:border-amber-500 text-stone-200 text-xs font-cinzel flex items-center gap-2 transition"
              >
                <Filter size={13} className="text-amber-400" />
                <span className="text-stone-400 text-[10px] uppercase font-mono">Domain:</span>
                <span className="text-amber-300 font-bold">{filterDomain}</span>
                <ChevronDown size={13} className={`text-amber-400 transition-transform ${openDeckDropdown === 'builder-domain' ? 'rotate-180' : ''}`} />
              </button>

              {openDeckDropdown === 'builder-domain' && (
                <div className="absolute top-full right-0 mt-1.5 w-48 rounded-xl bg-stone-950 border border-stone-700 shadow-2xl p-1.5 z-50 space-y-1">
                  {(['All', 'Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        soundEngine.playMicroSound('select');
                        setFilterDomain(d);
                        setOpenDeckDropdown(null);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-cinzel flex items-center justify-between transition ${
                        filterDomain === d
                          ? 'bg-amber-500 text-black font-bold'
                          : 'hover:bg-stone-900 text-stone-300'
                      }`}
                    >
                      <span>{d === 'All' ? '🌐 All Domains' : d}</span>
                      {filterDomain === d && <Check size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPool.map((card) => (
              <div key={card.id} className="relative group flex flex-col items-center">
                <CardItem
                  card={card}
                  size="md"
                  onInspect={() => onInspectCard(card)}
                />
                <button
                  type="button"
                  onClick={() => handleAddCard(card)}
                  className="mt-2 w-full py-1.5 rounded-lg bg-stone-900 hover:bg-amber-500 hover:text-black border border-stone-700 hover:border-amber-400 text-amber-300 text-xs font-cinzel font-bold flex items-center justify-center gap-1 transition shadow"
                >
                  <Plus size={13} />
                  <span>Add to Deck</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Deck & Mana Curve (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Synergy Analyzer Score & Grade Widget */}
          <DeckSynergyAnalyzerCard
            cardIds={customDeckCards}
            activePreset={activeDeck}
          />

          {/* Deck Stats & Mana Curve Box */}
          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400">
                Deck Composition
              </span>
              <span className="font-mono text-xs font-bold text-amber-200">
                {customDeckCards.length} / 15 Cards
              </span>
            </div>

            {/* Mana Curve Bars */}
            <div>
              <span className="font-cinzel text-[10px] text-stone-400 uppercase block mb-2">
                Essence Cost Distribution
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                {Object.entries(manaCurve).map(([range, count]) => (
                  <div key={range} className="flex flex-col items-center gap-1">
                    <div className="w-full h-16 bg-stone-950 rounded flex items-end p-1">
                      <div
                        className="w-full bg-gradient-to-t from-amber-600 to-yellow-400 rounded transition-all duration-300"
                        style={{ height: `${(count / maxManaCount) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-amber-300 font-bold">{count}</span>
                    <span className="text-[9px] font-mono text-stone-300">{range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Deck Cards List */}
          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex-1 space-y-2">
            <h4 className="font-cinzel text-xs uppercase tracking-wider text-amber-300">
              Active Deck Roster
            </h4>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {customDeckCards.map((cardId, idx) => {
                const card = CARDS_DATABASE.find(c => c.id === cardId);
                if (!card) return null;

                return (
                  <div
                    key={`${cardId}-${idx}`}
                    className="p-2 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between gap-2 hover:border-amber-500/50 transition"
                  >
                    <div 
                      onClick={() => onInspectCard(card)}
                      className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-600 text-amber-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                        {card.cost}
                      </span>
                      <div className="truncate">
                        <span className="font-cinzel font-bold text-xs text-stone-100 truncate block">
                          {card.name}
                        </span>
                        <span className="text-[9px] font-mono text-stone-300">
                          {card.domain} • {card.cardType}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveCard(cardId, idx)}
                      className="p-1 rounded text-stone-400 hover:text-red-400 hover:bg-stone-800 transition"
                      title="Remove from deck"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= EXPORT & IMPORT DECK HUB MODAL ================= */}
      <DeckExportModal
        isOpen={isExportOpen || isImportOpen}
        onClose={() => {
          setIsExportOpen(false);
          setIsImportOpen(false);
        }}
        activeDeck={activeDeck}
        cardIds={customDeckCards}
        onImportDeck={(importedPreset, newCardIds) => {
          setActiveDeck(importedPreset);
          setCustomDeckCards(newCardIds);
        }}
      />

      {/* Archetype Diagnostics Modal */}
      <DeckDiagnosticsModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
        deckCards={customDeckCards}
        deckName={activeDeck.name}
        deckDomain={activeDeck.domain}
      />

      {/* Interactive D3 Synergy Visualizer Modal */}
      {isVisualizerOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-stone-950 border border-amber-500/50 shadow-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <Workflow size={22} className="text-amber-400" />
                <div>
                  <h3 className="font-cinzel font-bold text-base sm:text-lg text-amber-200">
                    {activeDeck.name} • D3 Synergy Network Map
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Physics-based force network linking cards by tactical keywords, elemental affinity, and combat roles.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVisualizerOpen(false)}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 transition"
              >
                <X size={18} />
              </button>
            </div>

            <DeckSynergyVisualizer
              deckCards={customDeckCards}
              deckName={activeDeck.name}
              deckDomain={activeDeck.domain}
              onInspectCard={onInspectCard}
            />
          </div>
        </div>
      )}
    </div>
  );
};

