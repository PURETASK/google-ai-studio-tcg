import React, { useState } from 'react';
import { 
  CONTENT_EXPERIENCE_AGENTS, 
  CANONICAL_KEYWORDS, 
  ContentAgentProfile,
  CanonicalKeyword 
} from '../../data/contentExperienceData';
import { 
  BookOpen, 
  Sparkles, 
  Palette, 
  Volume2, 
  Layout, 
  Smartphone, 
  GraduationCap, 
  Printer, 
  Eye, 
  Search, 
  Layers, 
  Feather, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ContentExperienceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'keywords' | 'content-trio' | 'production-suite' | 'frame-ux'>('keywords');
  const [selectedKeyword, setSelectedKeyword] = useState<CanonicalKeyword>(CANONICAL_KEYWORDS[0]);
  const [keywordFilter, setKeywordFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredKeywords = CANONICAL_KEYWORDS.filter(k => {
    const matchesDomain = keywordFilter === 'All' || k.domain === keywordFilter;
    const matchesSearch = k.keyword.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          k.mechanicalExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const contentTrio = CONTENT_EXPERIENCE_AGENTS.filter(a => a.category === 'Content Trio');
  const productionSuite = CONTENT_EXPERIENCE_AGENTS.filter(a => a.category === 'Production & Experience');

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-stone-900/90 border-2 border-emerald-500/40 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Palette size={240} className="text-emerald-400" />
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/60 flex items-center justify-center text-emerald-300 shrink-0 shadow-lg shadow-emerald-500/20">
              <Palette size={32} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500 text-stone-950 uppercase tracking-wider">
                  STAGE E: CONTENT & EXPERIENCE ARCHITECTURE
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                  GLO-07..09 & GLO-16..23
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  11 TOTAL AGENTS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-100 tracking-wide">
                Keyword Canon, Card Creation & Sensory Production Suite
              </h2>
              <p className="text-stone-300 text-sm max-w-3xl mt-1 leading-relaxed">
                The creative, narrative, and sensory powerhouses of Nexus TCG. Standardizes the official keyword encyclopedia, card framing geometry, lore historical canon, dynamic audio landscapes, digital haptics, and universal accessibility.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('keywords')}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/60 flex items-center gap-1.5 transition"
            >
              <BookOpen size={14} className="text-emerald-400" />
              <span>Keyword Lexicon ({CANONICAL_KEYWORDS.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin border-b border-stone-800">
        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'keywords'
              ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-emerald-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <BookOpen size={14} />
          <span>Keyword Canon Lexicon (GLO-08)</span>
        </button>

        <button
          onClick={() => setActiveTab('content-trio')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'content-trio'
              ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-emerald-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Feather size={14} />
          <span>The Content Trio (GLO-07..09)</span>
        </button>

        <button
          onClick={() => setActiveTab('production-suite')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'production-suite'
              ? 'bg-cyan-500 text-stone-950 border-cyan-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-cyan-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Sparkles size={14} />
          <span>Production & Experience Suite (8 Leads)</span>
        </button>

        <button
          onClick={() => setActiveTab('frame-ux')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'frame-ux'
              ? 'bg-purple-500 text-stone-950 border-purple-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-purple-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Layout size={14} />
          <span>Frame, UX & Accessibility Standards</span>
        </button>
      </div>

      {/* ================= TAB 1: KEYWORD CANON LEXICON ================= */}
      {activeTab === 'keywords' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Filter & Keyword List */}
          <div className="flex flex-col gap-3">
            <div className="bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 flex flex-col gap-2.5">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search keywords or effects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
                {['All', 'Universal', 'Radiant', 'Verdant', 'Abyssal', 'Temporal', 'Sanctum'].map(d => (
                  <button
                    key={d}
                    onClick={() => setKeywordFilter(d)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition whitespace-nowrap ${
                      keywordFilter === d
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-stone-950 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword List */}
            <div className="flex flex-col gap-2">
              {filteredKeywords.map(kw => (
                <button
                  key={kw.keyword}
                  onClick={() => setSelectedKeyword(kw)}
                  className={`p-3 rounded-xl border text-left transition ${
                    selectedKeyword.keyword === kw.keyword
                      ? 'bg-emerald-950/60 border-emerald-500/70 shadow-md'
                      : 'bg-stone-950 border-stone-800 hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-amber-300">{kw.rulesSyntax}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                      {kw.domain}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 line-clamp-1">{kw.mechanicalExplanation}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Keyword Details */}
          <div className="lg:col-span-2 bg-stone-900/80 border border-emerald-500/40 rounded-2xl p-6 flex flex-col gap-4">
            <div className="border-b border-stone-800 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h3 className="text-xl font-cinzel font-bold text-emerald-300">{selectedKeyword.keyword}</h3>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-stone-950 border border-stone-700 text-stone-300">
                    Category: {selectedKeyword.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-950 border border-emerald-700 text-emerald-300">
                    {selectedKeyword.domain} Domain
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-300">Formal Grammar Syntax: <code className="bg-stone-950 px-2 py-0.5 rounded">{selectedKeyword.rulesSyntax}</code></span>
            </div>

            <div className="space-y-3">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1">
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block">
                  Plain-Language Mechanical Definition:
                </span>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {selectedKeyword.mechanicalExplanation}
                </p>
              </div>

              <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/40 space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>Canonical Rules Bible Clause (GLO-02 Standard):</span>
                </span>
                <p className="text-xs font-mono text-emerald-200 leading-relaxed bg-stone-950/90 p-3 rounded-lg border border-emerald-900/60">
                  {selectedKeyword.canonicalClause}
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex justify-between items-center text-xs font-mono">
                <span className="text-stone-400">Canonical Exemplar Card:</span>
                <span className="text-amber-300 font-bold">{selectedKeyword.exampleCard}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: CONTENT TRIO ================= */}
      {activeTab === 'content-trio' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contentTrio.map(agent => (
            <div key={agent.id} className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {agent.code}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">Content Trio</span>
                </div>
                <h4 className="text-sm font-cinzel font-bold text-stone-100 mb-1">{agent.name}</h4>
                <p className="text-xs text-stone-400 leading-relaxed mb-3">{agent.mandate}</p>

                <div className="space-y-1.5 text-xs font-mono text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800/80 mb-3">
                  <span className="text-amber-300 font-bold block text-[11px]">Primary Deliverables:</span>
                  {agent.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <span className="text-emerald-400">›</span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] font-mono text-stone-400 pt-2 border-t border-stone-800">
                <strong className="text-stone-300">Enforced Standards:</strong> {agent.standards.join('; ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 3: PRODUCTION & EXPERIENCE SUITE ================= */}
      {activeTab === 'production-suite' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productionSuite.map(agent => (
            <div key={agent.id} className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {agent.code}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500">Production</span>
                </div>
                <h4 className="text-xs font-cinzel font-bold text-stone-100 mb-1">{agent.name}</h4>
                <p className="text-[11px] text-stone-400 leading-relaxed mb-3">{agent.mandate}</p>
              </div>

              <div className="text-[10px] font-mono text-stone-400 pt-2 border-t border-stone-800 space-y-1">
                <div><strong className="text-stone-300">Outputs:</strong> {agent.deliverables.join(', ')}</div>
                <div className="text-emerald-400"><strong className="text-stone-300">Metric:</strong> {agent.standards[0]}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 4: FRAME, UX & ACCESSIBILITY ================= */}
      {activeTab === 'frame-ux' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="font-bold text-amber-300 font-cinzel text-sm">GLO-19 Typography & Frame Standards</span>
              <span className="text-[10px] bg-stone-950 text-stone-400 px-2 py-0.5 rounded">Standard Spec</span>
            </div>
            <div className="space-y-1.5 text-stone-300">
              <p>• <strong>Card Title Font:</strong> Cinzel Bold / Display (min 11pt equivalent).</p>
              <p>• <strong>Body Rules Font:</strong> Clean sans-serif / monospace hybrid (min 8pt equivalent).</p>
              <p>• <strong>Stat Badges:</strong> Top-Left Essence Cost (Hexagonal Gem), Bottom-Left Attack (Crimson Sword), Bottom-Right Defense (Cobalt Shield).</p>
              <p>• <strong>Rarity Jewels:</strong> Centered divider bar (Common Gray, Uncommon Emerald, Rare Sapphire, Mythic Amethyst, Cosmic Gold).</p>
            </div>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="font-bold text-cyan-300 font-cinzel text-sm">GLO-23 Accessibility & Colorblind Safety</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">WCAG AA</span>
            </div>
            <div className="space-y-1.5 text-stone-300">
              <p>• <strong>Non-Color Domain Encoding:</strong> Radiant (Sunburst), Verdant (Leaf Spire), Abyssal (Eye/Talon), Temporal (Hourglass Helix), Sanctum (Diamond Prism).</p>
              <p>• <strong>Contrast Ratio:</strong> Minimum 4.5:1 on all text against card parchment background.</p>
              <p>• <strong>Photo-Sensitivity Shield:</strong> Flashes capped at &lt; 3 Hz with zero full-screen strobes.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
