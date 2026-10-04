import React, { useState } from 'react';
import { SET_001_ARCHETYPES, generateSealedPool, ArchetypePathway } from '../data/set001Data';
import { Card, Domain, DeckPreset } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Package, 
  Layers, 
  Sparkles, 
  Swords, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Play, 
  Compass, 
  Filter,
  Search,
  ExternalLink,
  Crown
} from 'lucide-react';

interface Set001CuratorViewProps {
  onInspectCard: (card: Card) => void;
  onLaunchBattleWithDeck?: (deck: DeckPreset) => void;
  onStartMatchWithSealedDeck?: (deck: DeckPreset) => void;
}

export const Set001CuratorView: React.FC<Set001CuratorViewProps> = ({
  onInspectCard,
  onLaunchBattleWithDeck,
  onStartMatchWithSealedDeck
}) => {
  const [subTab, setSubTab] = useState<'codex' | 'archetypes' | 'sealed'>('sealed');

  // Sealed Deck State
  const [sealedPool, setSealedPool] = useState<ReturnType<typeof generateSealedPool>>(() => generateSealedPool(6));
  const [sealedDeck, setSealedDeck] = useState<Card[]>([]);
  const [selectedChampion, setSelectedChampion] = useState<Card | null>(null);
  const [sealedDomainFilter, setSealedDomainFilter] = useState<string>('All');
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypePathway>(SET_001_ARCHETYPES[0]);

  // Open fresh 6 packs
  const handleCrackNewPool = () => {
    soundEngine.playMicroSound('unlock');
    const newPool = generateSealedPool(6);
    setSealedPool(newPool);
    setSealedDeck([]);
    setSelectedChampion(null);
  };

  // Add card to sealed deck
  const handleAddCardToDeck = (card: Card) => {
    soundEngine.playMicroSound('select');
    if (card.cardType === 'Champion' && !selectedChampion) {
      setSelectedChampion(card);
    }
    setSealedDeck(prev => [...prev, card]);
  };

  // Remove card from sealed deck
  const handleRemoveCardFromDeck = (instanceId?: string) => {
    soundEngine.playMicroSound('select');
    if (!instanceId) return;
    setSealedDeck(prev => {
      const removed = prev.find(c => c.instanceId === instanceId);
      if (removed && selectedChampion?.instanceId === instanceId) {
        setSelectedChampion(null);
      }
      return prev.filter(c => c.instanceId !== instanceId);
    });
  };

  // Build temporary preset to launch arena
  const handleLaunchArenaMatch = () => {
    if (sealedDeck.length < 20) {
      alert('You need at least 20 cards in your sealed deck to enter the Arena!');
      return;
    }
    const launchFn = onLaunchBattleWithDeck || onStartMatchWithSealedDeck;
    if (!launchFn) return;

    soundEngine.playCombatClash('turnStart');
    const customPreset: DeckPreset = {
      id: `sealed-deck-${Date.now()}`,
      name: `Sealed Pool [${selectedChampion?.name || 'Commander'}]`,
      domain: (selectedChampion?.domain || sealedDeck[0]?.domain || 'Radiance') as Domain,
      description: `Limited 6-Pack Tournament Pool constructed with ${sealedDeck.length} cards.`,
      title: 'Limited Sealed Gladiator',
      championCardId: selectedChampion?.id || sealedDeck[0]?.id,
      cardIds: sealedDeck.map(c => c.id),
      difficulty: 'Intermediate',
      strategy: 'Limited curve-out synergy with high-value combat tricks.'
    };
    launchFn(customPreset);
  };

  const filteredPoolCards = sealedPool.allCards.filter(c => {
    if (sealedDomainFilter !== 'All' && c.domain !== sealedDomainFilter) return false;
    // Don't show cards already committed to deck
    const isAlreadyInDeck = sealedDeck.some(d => d.instanceId === c.instanceId);
    return !isAlreadyInDeck;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-950 via-neutral-900 to-stone-950 border-2 border-amber-500/40 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase tracking-widest">
            <Package size={16} />
            <span>Set 001 Architecture • "Genesis of the Five Domains"</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-black text-amber-100 mt-1">
            Set 001 Curator & Limited Sealed Simulator
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-3xl mt-1.5 leading-relaxed">
            Curated 100-card tournament skeleton, 10 dual-domain archetype pathways, and complete 6-pack Sealed Pool deck construction.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playMicroSound('select');
              setSubTab('sealed');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 transition ${
              subTab === 'sealed'
                ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            <Package size={14} />
            <span>6-Pack Sealed Pool</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playMicroSound('select');
              setSubTab('archetypes');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 transition ${
              subTab === 'archetypes'
                ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            <Compass size={14} />
            <span>10 Dual Archetypes</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playMicroSound('select');
              setSubTab('codex');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 transition ${
              subTab === 'codex'
                ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            <BarChart3 size={14} />
            <span>Set Skeleton Analytics</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: 6-PACK SEALED SIMULATOR */}
      {subTab === 'sealed' && (
        <div className="space-y-6">
          
          {/* Action & Stats Banner */}
          <div className="p-4 rounded-2xl bg-stone-950/90 border border-amber-500/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-200">
                Packs Cracked: <strong className="text-amber-400">6 Booster Packs</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-200">
                Pool Size: <strong className="text-amber-400">{sealedPool.allCards.length} Cards</strong>
              </span>
              <span className={`px-3 py-1.5 rounded-xl border ${
                sealedDeck.length >= 40 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold' 
                  : 'bg-amber-950 text-amber-300 border-amber-500/50'
              }`}>
                Deck Status: <strong>{sealedDeck.length} / 40 Cards</strong>
              </span>
              {selectedChampion && (
                <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5">
                  <Crown size={13} className="text-amber-400" />
                  <span>Champ: {selectedChampion.name}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCrackNewPool}
                className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-amber-300 text-xs font-cinzel font-bold flex items-center gap-1.5 transition"
              >
                <Package size={14} />
                <span>Crack New 6 Packs</span>
              </button>

              <button
                type="button"
                onClick={handleLaunchArenaMatch}
                disabled={sealedDeck.length < 20}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 text-xs font-cinzel font-black uppercase tracking-wider flex items-center gap-1.5 transition shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Swords size={14} />
                <span>Battle in Arena ({sealedDeck.length})</span>
              </button>
            </div>
          </div>

          {/* Two-Column Deck Builder: Left = Pool, Right = Assembled Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Filterable Pool (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2">
                <h3 className="font-cinzel font-bold text-sm text-amber-200 uppercase tracking-wider">
                  Available Pool ({filteredPoolCards.length})
                </h3>
                
                {/* Domain Filter */}
                <div className="flex items-center gap-1 flex-wrap">
                  {['All', 'Radiance', 'Sanctuary', 'Verdance', 'Abyss', 'Tempest', 'Arcane'].map(d => (
                    <button
                      key={d}
                      onClick={() => setSealedDomainFilter(d)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition ${
                        sealedDomainFilter === d
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : 'bg-stone-900 text-stone-400 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pool Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredPoolCards.map(c => (
                  <div
                    key={c.instanceId || c.id}
                    className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/60 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                        <span className="text-amber-400 font-bold">{c.cost} Ess</span>
                        <span className="text-stone-400">{c.domain}</span>
                      </div>
                      <h4 
                        onClick={() => onInspectCard(c)}
                        className="font-cinzel font-bold text-xs text-stone-100 hover:text-amber-300 cursor-pointer line-clamp-1 mt-1"
                      >
                        {c.name}
                      </h4>
                      <span className="text-[9px] font-mono text-stone-400 block">
                        {c.cardType} • {c.rarity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800">
                      <span className="text-[10px] font-mono text-stone-300">
                        ⚔️ {c.power} / 🛡️ {c.defense}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddCardToDeck(c)}
                        className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-mono text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <Plus size={11} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Assembled Sealed Deck (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <h3 className="font-cinzel font-bold text-sm text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Sealed Deck ({sealedDeck.length} Cards)</span>
                </h3>
                {sealedDeck.length > 0 && (
                  <button
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      setSealedDeck([]);
                      setSelectedChampion(null);
                    }}
                    className="text-[10px] font-mono text-red-400 hover:text-red-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Deck Cards List */}
              <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
                {sealedDeck.map((c, i) => (
                  <div
                    key={c.instanceId || `${c.id}-${i}`}
                    className="p-2 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-2 hover:border-stone-700 transition"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-stone-900 border border-stone-700 flex items-center justify-center text-[10px] font-mono font-bold text-amber-400 shrink-0">
                        {c.cost}
                      </span>
                      <div className="min-w-0">
                        <span 
                          onClick={() => onInspectCard(c)}
                          className="font-cinzel text-xs font-bold text-stone-200 hover:text-amber-300 cursor-pointer truncate block"
                        >
                          {c.name}
                        </span>
                        <span className="text-[9px] font-mono text-stone-400 block">
                          {c.domain} • {c.cardType}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {c.cardType === 'Champion' && (
                        <button
                          type="button"
                          onClick={() => setSelectedChampion(c)}
                          className={`p-1 rounded text-[10px] font-mono ${
                            selectedChampion?.instanceId === c.instanceId
                              ? 'bg-amber-500 text-stone-950 font-bold'
                              : 'text-stone-400 hover:text-amber-300'
                          }`}
                          title="Assign as Commander"
                        >
                          <Crown size={12} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveCardFromDeck(c.instanceId)}
                        className="p-1 rounded text-stone-500 hover:text-red-400 transition"
                        title="Remove from deck"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}

                {sealedDeck.length === 0 && (
                  <div className="p-8 text-center text-xs text-stone-500 italic border border-dashed border-stone-800 rounded-2xl">
                    Click "Add" on any card from your pool to start assembling your 40-card tournament deck.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 2: 10 DUAL-DOMAIN ARCHETYPES */}
      {subTab === 'archetypes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Archetypes List */}
          <div className="lg:col-span-1 space-y-2.5">
            <h3 className="font-cinzel font-black text-sm text-amber-300 uppercase tracking-wider">
              10 Official Pairings
            </h3>
            <div className="space-y-2">
              {SET_001_ARCHETYPES.map(arch => (
                <div
                  key={arch.id}
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setSelectedArchetype(arch);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                    selectedArchetype.id === arch.id
                      ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-500/40'
                      : 'bg-stone-950/80 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-amber-300">
                      {arch.domains[0]} × {arch.domains[1]}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      {arch.difficulty}
                    </span>
                  </div>
                  <h4 className="font-cinzel font-black text-sm text-stone-100">
                    {arch.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    {arch.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Archetype Deep-Dive Details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                    <span>{selectedArchetype.domains[0]}</span>
                    <span>×</span>
                    <span>{selectedArchetype.domains[1]}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{selectedArchetype.playstyle}</span>
                  </div>
                  <h2 className="text-2xl font-cinzel font-black text-amber-100 mt-1">
                    {selectedArchetype.name}
                  </h2>
                  <p className="text-xs text-stone-400 italic mt-0.5">
                    "{selectedArchetype.tagline}"
                  </p>
                </div>

                <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-stone-950 border border-stone-800 text-amber-300 self-start sm:self-center">
                  Difficulty: {selectedArchetype.difficulty}
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedArchetype.description}
              </p>

              {/* Key Mechanics */}
              <div className="space-y-2">
                <span className="text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider block">
                  Core Tactical Mechanics:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedArchetype.keyMechanics.map((m, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-stone-950 border border-stone-800 text-stone-200">
                      ⚡ {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Signature Combo Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/40 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-cinzel font-bold text-amber-300">
                  <Sparkles size={14} />
                  <span>Signature Play Pattern:</span>
                </div>
                <p className="text-stone-300 leading-relaxed font-sans">
                  {selectedArchetype.signatureCombo}
                </p>
              </div>

              {/* Recommended Cards */}
              <div className="space-y-2">
                <span className="text-[10px] font-cinzel font-bold text-stone-400 uppercase tracking-wider block">
                  Signature Foundation Cards:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedArchetype.recommendedCardNames.map((name, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-center">
                      <span className="font-cinzel text-xs font-bold text-amber-200 block truncate">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* SUBTAB 3: SET SKELETON ANALYTICS */}
      {subTab === 'codex' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-cinzel font-black text-amber-100">
              Set 001 Mathematical Skeleton
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
              Formally calibrated to satisfy GLO-11 simulation standards and tournament draft curve density.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase">Total Curated Cards</span>
              <div className="text-2xl font-cinzel font-black text-amber-400">100 Cards</div>
              <span className="text-[10px] text-stone-500">20 per domain quota</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase">Rarity Distribution</span>
              <div className="text-sm font-mono text-stone-200">
                40C • 30U • 20R • 10M
              </div>
              <span className="text-[10px] text-emerald-400">Standard TCG Pack Math</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase">Essence Curve Median</span>
              <div className="text-2xl font-cinzel font-black text-sky-400">3.8 Ess</div>
              <span className="text-[10px] text-stone-500">Peak at 3 and 4 cost</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase">Dual Archetypes</span>
              <div className="text-2xl font-cinzel font-black text-purple-400">10 Pairs</div>
              <span className="text-[10px] text-stone-500">Complete pairwise combinations</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
