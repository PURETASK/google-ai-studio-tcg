import React, { useState } from 'react';
import { Domain, Card } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { 
  UNIVERSAL_POWER_GLYPHS, 
  CODEX_CATEGORIES, 
  EnrichedPowerGlyph, 
  rollDiceFormula, 
  calculateAverageRoll,
  DiceRollResult 
} from '../data/powerGlyphsData';
import { CodexIcon } from './CodexIconRegistry';
import { 
  Search, 
  Sparkles, 
  Dices, 
  RotateCcw, 
  CheckCircle2, 
  Info, 
  Filter,
  Shield,
  Sword,
  Flame,
  Zap,
  Activity,
  Layers,
  Clock,
  Skull,
  Eye,
  Star,
  Compass,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface GlyphLexiconEngineProps {
  onInspectCard?: (card: Card) => void;
}

export const GlyphLexiconEngine: React.FC<GlyphLexiconEngineProps> = ({ onInspectCard }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedTiming, setSelectedTiming] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGlyph, setSelectedGlyph] = useState<EnrichedPowerGlyph>(UNIVERSAL_POWER_GLYPHS[0]);
  const [diceRollResult, setDiceRollResult] = useState<DiceRollResult | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollHistory, setRollHistory] = useState<DiceRollResult[]>([]);

  // Filter glyphs
  const filteredGlyphs = UNIVERSAL_POWER_GLYPHS.filter((glyph) => {
    if (selectedCategory !== 'all' && glyph.category !== selectedCategory) return false;
    if (selectedDomain !== 'all' && glyph.domain !== selectedDomain) return false;
    if (selectedTiming !== 'all' && glyph.triggerTiming !== selectedTiming) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = glyph.name.toLowerCase().includes(q);
      const matchTag = glyph.shortTag.toLowerCase().includes(q);
      const matchRule = glyph.ruleClause.toLowerCase().includes(q);
      const matchLore = glyph.loreSnippet?.toLowerCase().includes(q);
      const matchDice = glyph.diceFormula?.toLowerCase().includes(q);
      if (!matchName && !matchTag && !matchRule && !matchLore && !matchDice) return false;
    }
    return true;
  });

  const handleRollDice = (formula?: string) => {
    if (!formula) return;
    setIsRolling(true);
    setTimeout(() => {
      const res = rollDiceFormula(formula);
      setDiceRollResult(res);
      setRollHistory(prev => [res, ...prev.slice(0, 4)]);
      setIsRolling(false);
    }, 280);
  };

  const getDomainColor = (domain: Domain | 'Neutral') => {
    switch (domain) {
      case 'Sanctuary': return '#eab308';
      case 'Radiance': return '#ef4444';
      case 'Verdance': return '#10b981';
      case 'Arcane': return '#3b82f6';
      case 'Abyss': return '#a855f7';
      default: return '#fbbf24';
    }
  };

  // Find cards in the database that feature or match this glyph
  const matchingCards = CARDS_DATABASE.filter(c => 
    c.powerGlyphs?.some(g => g.name.toLowerCase() === selectedGlyph.name.toLowerCase() || g.id === selectedGlyph.id) ||
    c.abilities.some(a => a.name.toLowerCase().includes(selectedGlyph.name.toLowerCase()) || a.description.toLowerCase().includes(selectedGlyph.name.toLowerCase())) ||
    (c.domain === selectedGlyph.domain && selectedGlyph.domain !== 'Neutral')
  ).slice(0, 3);

  const glyphDomainColor = getDomainColor(selectedGlyph.domain);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-neutral-900 to-stone-900 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-radial from-amber-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>Universal Combat Lexicon & Formula Engine</span>
            </div>
            <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100 mt-1">
              Power Glyph Encyclopedia
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
              Power Glyphs represent active spellcraft formulas, elemental auras, reaction triggers, and damage calculations engraved upon cards in the Realm of Nexus.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-950/80 p-3.5 rounded-xl border border-stone-800 shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] font-cinzel uppercase text-stone-300 block">Total Glyphs</span>
              <span className="font-mono text-base font-bold text-amber-400">{UNIVERSAL_POWER_GLYPHS.length}</span>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div className="text-center px-2">
              <span className="text-[10px] font-cinzel uppercase text-stone-300 block">Categories</span>
              <span className="font-mono text-base font-bold text-blue-400">{CODEX_CATEGORIES.length}</span>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div className="text-center px-2">
              <span className="text-[10px] font-cinzel uppercase text-stone-300 block">Active Filter</span>
              <span className="font-mono text-base font-bold text-emerald-400">{filteredGlyphs.length}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-4 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
            <input
              type="text"
              placeholder="Search glyph name, formula, timing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-cinzel capitalize cursor-pointer"
          >
            <option value="all">All Categories ({UNIVERSAL_POWER_GLYPHS.length})</option>
            {CODEX_CATEGORIES.map(cat => {
              const count = UNIVERSAL_POWER_GLYPHS.filter(g => g.category === cat.id).length;
              return (
                <option key={cat.id} value={cat.id}>{cat.name} ({count})</option>
              );
            })}
          </select>

          {/* Domain Filter */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-cinzel capitalize cursor-pointer"
          >
            <option value="all">All Domains</option>
            <option value="Sanctuary">Sanctuary Domain 🛡️</option>
            <option value="Radiance">Radiance Domain 🌋</option>
            <option value="Verdance">Verdance Domain 🌿</option>
            <option value="Arcane">Arcane Domain 🌀</option>
            <option value="Abyss">Abyss Domain 💀</option>
            <option value="Neutral">Neutral Glyphs ✨</option>
          </select>

          {/* Timing Filter */}
          <select
            value={selectedTiming}
            onChange={(e) => setSelectedTiming(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-cinzel capitalize cursor-pointer"
          >
            <option value="all">All Trigger Timings</option>
            <option value="Main Action">Main Action</option>
            <option value="Fast Reaction">Fast Reaction (Speed Clash)</option>
            <option value="Passive Aura">Passive Aura</option>
            <option value="Pre-Combat">Pre-Combat Setup</option>
            <option value="On Hit">On-Hit Trigger</option>
            <option value="End Phase Trigger">End Phase Resolution</option>
            <option value="On Death">On-Death Rattle</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Left Master List + Right Interactive Detail Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Glyph List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
          {filteredGlyphs.length === 0 ? (
            <div className="p-8 text-center bg-stone-900/60 rounded-2xl border border-stone-800">
              <p className="font-cinzel text-stone-300 text-xs">No power glyphs match the current filter criteria.</p>
            </div>
          ) : (
            filteredGlyphs.map((glyph) => {
              const isSelected = selectedGlyph.id === glyph.id;
              const color = getDomainColor(glyph.domain);

              return (
                <button
                  key={glyph.id}
                  onClick={() => {
                    setSelectedGlyph(glyph);
                    setDiceRollResult(null);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 group ${
                    isSelected
                      ? 'bg-stone-900 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/50'
                      : 'bg-stone-950/80 border-stone-800 hover:border-stone-600 hover:bg-stone-900/50'
                  }`}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border shadow-inner transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${color}18`,
                      borderColor: `${color}40`
                    }}
                  >
                    <CodexIcon iconId={glyph.iconId || glyph.category} size={22} color={color} withGlow={isSelected} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-cinzel font-bold text-sm text-stone-100 group-hover:text-amber-200 truncate">
                        {glyph.name}
                      </h4>
                      <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 shrink-0">
                        {glyph.triggerTiming}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-cinzel font-bold" style={{ color }}>
                        {glyph.domain}
                      </span>
                      <span className="text-stone-400 text-[10px]">•</span>
                      <span className="text-[10px] font-mono text-stone-300 uppercase">
                        [{glyph.shortTag}]
                      </span>
                      {glyph.energyCost !== undefined && (
                        <>
                          <span className="text-stone-400 text-[10px]">•</span>
                          <span className="text-[10px] font-mono text-amber-300">
                            ⚡ {glyph.energyCost} Essence
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-[11px] text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                      {glyph.ruleClause}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Interactive Glyph Deep-Dive Studio (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="p-6 rounded-2xl bg-stone-900 border-2 border-stone-800 space-y-5 relative overflow-hidden shadow-2xl"
            style={{
              borderColor: `${glyphDomainColor}66`,
              boxShadow: `0 0 35px ${glyphDomainColor}22`
            }}
          >
            {/* Header with Large Sigil */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border-2 shadow-2xl"
                  style={{
                    backgroundColor: `${glyphDomainColor}22`,
                    borderColor: glyphDomainColor,
                    boxShadow: `0 0 25px ${glyphDomainColor}44`
                  }}
                >
                  <CodexIcon iconId={selectedGlyph.iconId || selectedGlyph.category} size={30} color={glyphDomainColor} withGlow={true} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-cinzel uppercase font-bold tracking-wider"
                      style={{ color: glyphDomainColor }}
                    >
                      {selectedGlyph.domain} Domain • {selectedGlyph.category}
                    </span>
                    <span className="text-[10px] font-mono text-stone-300 px-1.5 py-0.2 rounded bg-stone-950 border border-stone-800">
                      [{selectedGlyph.shortTag}]
                    </span>
                  </div>
                  <h3 className="font-cinzel font-black text-xl sm:text-2xl text-amber-100 mt-0.5">
                    {selectedGlyph.name}
                  </h3>
                </div>
              </div>

              {/* Energy Cost Pill */}
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[10px] font-cinzel uppercase text-stone-300">Trigger Phase</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 font-mono text-xs font-bold mt-0.5">
                  {selectedGlyph.triggerTiming}
                </span>
              </div>
            </div>

            {/* Official Rule Clause Box */}
            <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 space-y-1.5">
              <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Info size={13} />
                <span>Standard Rules Clause & Execution</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                {selectedGlyph.ruleClause}
              </p>
            </div>

            {/* Tactical Formula & Dice Roller Simulator */}
            {selectedGlyph.diceFormula && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-900 to-stone-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-cinzel uppercase text-amber-400 font-bold block">
                      Mathematical Dice Formula
                    </span>
                    <span className="font-mono font-bold text-base text-stone-100">
                      {selectedGlyph.diceFormula}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRollDice(selectedGlyph.diceFormula)}
                    disabled={isRolling}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-50"
                  >
                    <Dices size={15} className={isRolling ? 'animate-spin' : ''} />
                    <span>{isRolling ? 'Rolling...' : 'Simulate Roll'}</span>
                  </button>
                </div>

                {/* Roll Result Display */}
                {diceRollResult && (
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500 text-black font-mono font-black text-xl flex items-center justify-center shadow">
                        {diceRollResult.total}
                      </div>
                      <div>
                        <div className="text-xs font-mono text-amber-200">
                          Formula: <span className="font-bold">{diceRollResult.formula}</span>
                        </div>
                        <div className="text-[11px] font-mono text-stone-300">
                          Dice: [{diceRollResult.rolls.join(', ')}] {diceRollResult.modifier ? `+ ${diceRollResult.modifier}` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-[11px] font-mono">
                      <span className="text-stone-300 block">Expected Average: {calculateAverageRoll(selectedGlyph.diceFormula)}</span>
                      <span className="text-emerald-400 font-bold">
                        {diceRollResult.total >= calculateAverageRoll(selectedGlyph.diceFormula) ? '⚡ Above Average Hit' : '🛡️ Standard Roll'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Synergy Bonus & Lore Snippet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedGlyph.synergyBonus && (
                <div className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 space-y-1">
                  <span className="font-cinzel text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>Domain Synergy Bonus</span>
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {selectedGlyph.synergyBonus}
                  </p>
                </div>
              )}

              {selectedGlyph.loreSnippet && (
                <div className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 space-y-1">
                  <span className="font-cinzel text-xs uppercase tracking-wider text-stone-300 font-bold flex items-center gap-1.5">
                    <Compass size={13} />
                    <span>Aetheria Archive Lore</span>
                  </span>
                  <p className="text-xs text-stone-300 italic font-garamond leading-relaxed">
                    "{selectedGlyph.loreSnippet}"
                  </p>
                </div>
              )}
            </div>

            {/* Engraved Cards Linkages */}
            {matchingCards.length > 0 && (
              <div className="pt-2 border-t border-stone-800 space-y-2">
                <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold block">
                  Engraved Card Synergies in Compendium
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {matchingCards.map(c => (
                    <button
                      key={c.id}
                      onClick={() => onInspectCard && onInspectCard(c)}
                      className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-left transition group flex items-center justify-between"
                    >
                      <div className="min-w-0">
                        <span className="font-cinzel font-bold text-xs text-stone-200 group-hover:text-amber-200 truncate block">
                          {c.name}
                        </span>
                        <span className="text-[10px] font-mono text-stone-300">
                          {c.domain} • {c.cardType}
                        </span>
                      </div>
                      <ArrowRight size={13} className="text-stone-300 group-hover:text-amber-400 transform group-hover:translate-x-0.5 transition shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
