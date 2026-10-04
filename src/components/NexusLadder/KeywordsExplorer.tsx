import React, { useState } from 'react';
import { KEYWORDS_DATABASE } from '../../data/nexusLadderData';
import { Domain, KeywordDefinition } from '../../types';
import { Search, Filter, Sparkles, BookOpen, Shield, Zap, Flame } from 'lucide-react';

export const KeywordsExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'All' | 'Universal'>('All');

  const filteredKeywords = KEYWORDS_DATABASE.filter(kw => {
    if (selectedDomain !== 'All' && kw.domain !== selectedDomain) return false;
    if (search && !kw.name.toLowerCase().includes(search.toLowerCase()) && !kw.reminderText.toLowerCase().includes(search.toLowerCase()) && !kw.rulesExplanation.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="text-amber-400" size={20} />
            <h3 className="font-cinzel font-bold text-lg text-amber-100">
              Stage 13: Standardized Keyword Encyclopedia
            </h3>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            Standard mechanics, reminder text, exact rules explanations, and balance point costs.
          </p>
        </div>

        <span className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono text-amber-300">
          {filteredKeywords.length} Keywords Documented
        </span>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search keyword name, reminder text, or rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-sans"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-cinzel">
          {(['All', 'Universal', 'Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss'] as const).map(d => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                selectedDomain === d
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKeywords.map((kw) => (
          <div
            key={kw.name}
            className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-sm text-amber-200">
                  {kw.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300">
                  {kw.pointCost} Pts
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1 mb-2">
                <span className="text-[9px] font-mono text-stone-400 uppercase">
                  {kw.domain} • {kw.type}
                </span>
                <span className="text-[9px] font-mono text-amber-400">
                  Sample: {kw.sampleCard}
                </span>
              </div>

              <p className="text-xs text-amber-100/90 italic bg-stone-900/70 p-2 rounded border border-stone-800 mb-2">
                "{kw.reminderText}"
              </p>

              <p className="text-[11px] text-stone-300">
                {kw.rulesExplanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
