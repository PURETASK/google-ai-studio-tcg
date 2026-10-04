import React, { useState } from 'react';
import { 
  MASTER_DOC_CATEGORIES, 
  MASTER_DOC_ARTICLES, 
  MasterDocArticle, 
  DocCategoryMeta 
} from '../data/nexusMasterDocsData';
import { BIBLE_SECTIONS, CONCEPTS_AUDIT, FACTION_PHILOSOPHIES, CROSS_DOMAIN_SYNERGIES } from '../data/colorIdentityMomentumData';
import { LADDER_STAGES } from '../data/nexusLadderData';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Shield, 
  Sword, 
  Zap, 
  Layers, 
  Clock, 
  Dices, 
  GitFork, 
  Cpu, 
  Scale, 
  Award, 
  Download,
  Flame,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  Target,
  FileText
} from 'lucide-react';

interface MasterDocumentationHubProps {
  initialDocType?: MasterDocArticle['docType'];
  onClose?: () => void;
  onInspectCard?: (cardName: string) => void;
}

export const MasterDocumentationHub: React.FC<MasterDocumentationHubProps> = ({
  initialDocType = 'rules-doc',
  onClose,
  onInspectCard
}) => {
  const [selectedDocType, setSelectedDocType] = useState<MasterDocArticle['docType']>(initialDocType);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [readMode, setReadMode] = useState<boolean>(false);

  // Active Category Meta
  const activeCategory: DocCategoryMeta = 
    MASTER_DOC_CATEGORIES.find(c => c.id === selectedDocType) || MASTER_DOC_CATEGORIES[0];

  // Filtered Articles for this Category
  const categoryArticles = MASTER_DOC_ARTICLES.filter(a => a.docType === selectedDocType);

  // Filtered Articles by Search Query
  const filteredArticles = categoryArticles.filter(art => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.subtitle.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.contentMarkdown.toLowerCase().includes(q) ||
      art.sectionNumber.includes(q)
    );
  });

  // Current Active Article
  const currentArticle: MasterDocArticle = 
    filteredArticles.find(a => a.id === selectedArticleId) || filteredArticles[0] || categoryArticles[0];

  // Copy article or whole category to clipboard
  const handleCopyMarkdown = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in">
      
      {/* ================= TOP HERO BANNER ================= */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
              Codex Archival Core
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
              Nexus Official Specification Suite
            </span>
          </div>
          <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-400">
            Nexus TCG Master Documentation Suite
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Codified documentation repository containing the Comprehensive Rules (CRD), Systems Architecture, Features Dossier, Domain & Synergy Matrices, Resource Economics, Card & Zone Lifecycle, Priority Timing, 31-Stage Design Ladder, and the Color Identity & Momentum Bible.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleCopyMarkdown(
              `# ${activeCategory.title}\n\n${categoryArticles.map(a => `## Section ${a.sectionNumber}: ${a.title}\n\n${a.summary}\n\n${a.contentMarkdown}`).join('\n\n---\n\n')}`
            )}
            className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-bold flex items-center gap-1.5 transition shadow"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied Full Doc!' : 'Copy Full Doc Markdown'}</span>
          </button>
          
          <button
            onClick={() => setReadMode(!readMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition shadow ${
              readMode 
                ? 'bg-amber-500 text-black border border-amber-400' 
                : 'bg-stone-900 text-stone-300 border border-stone-700 hover:border-stone-500'
            }`}
          >
            <FileText size={14} />
            <span>{readMode ? 'Standard Layout' : 'Expanded Read Mode'}</span>
          </button>
        </div>
      </div>

      {/* ================= DOCUMENT CATEGORY NAV TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {MASTER_DOC_CATEGORIES.map((cat) => {
          const isActive = selectedDocType === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedDocType(cat.id);
                setSelectedArticleId('');
              }}
              className={`px-3.5 py-2.5 rounded-xl font-cinzel text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black border-amber-300 shadow-[0_0_15px_rgba(234,179,8,0.4)] scale-105'
                  : 'bg-stone-900/90 text-stone-300 border-stone-800 hover:border-amber-500/40 hover:text-amber-200'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.shortTitle}</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                isActive ? 'bg-black/30 text-stone-900 font-black' : 'bg-stone-800 text-stone-400'
              }`}>
                {cat.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= MAIN SPLIT CONTENT AREA ================= */}
      <div className={`grid ${readMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'} gap-6`}>
        
        {/* LEFT SIDEBAR: ARTICLE INDEX & SEARCH */}
        {!readMode && (
          <div className="lg:col-span-4 flex flex-col gap-3">
            
            {/* Category Summary Card */}
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeCategory.icon}</span>
                <div>
                  <h3 className="font-cinzel font-bold text-sm text-amber-200">
                    {activeCategory.title}
                  </h3>
                  <span className="text-[10px] font-mono text-amber-400/80 uppercase">
                    {activeCategory.badge}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                {activeCategory.description}
              </p>

              {/* Search Bar */}
              <div className="relative pt-2">
                <Search size={14} className="absolute left-3 top-4.5 text-stone-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeCategory.shortTitle}...`}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Article Selection List */}
            <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredArticles.map((art) => {
                const isSelected = currentArticle?.id === art.id;
                return (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArticleId(art.id)}
                    className={`p-3 rounded-xl text-left transition flex flex-col gap-1 border ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/70 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-stone-900/50 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded bg-stone-950 text-amber-400 text-[10px] font-mono font-bold border border-stone-800">
                        {art.badge}
                      </span>
                      <span className="text-[10px] font-cinzel text-stone-400">
                        {art.category}
                      </span>
                    </div>

                    <h4 className={`font-cinzel font-bold text-xs leading-snug ${
                      isSelected ? 'text-amber-200' : 'text-stone-200'
                    }`}>
                      {art.title}
                    </h4>

                    <p className="text-[10px] text-stone-400 line-clamp-2 leading-tight">
                      {art.summary}
                    </p>
                  </button>
                );
              })}

              {filteredArticles.length === 0 && (
                <div className="p-6 text-center text-stone-500 text-xs font-mono">
                  No articles matched your search query.
                </div>
              )}
            </div>
          </div>
        )}

        {/* RIGHT AREA: FULL CODIFIED ARTICLE VIEWER */}
        <div className={`${readMode ? 'col-span-1' : 'lg:col-span-8'} flex flex-col gap-4`}>
          {currentArticle ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-950/90 border border-stone-800 shadow-2xl space-y-6">
              
              {/* Article Header */}
              <div className="border-b border-stone-800 pb-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-amber-500 text-black text-xs font-cinzel font-black">
                      {currentArticle.badge}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      {currentArticle.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyMarkdown(
                      `# ${currentArticle.title}\n## ${currentArticle.subtitle}\n\n${currentArticle.summary}\n\n${currentArticle.contentMarkdown}`
                    )}
                    className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-300 text-xs font-cinzel flex items-center gap-1.5 transition"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied!' : 'Copy Section'}</span>
                  </button>
                </div>

                <h3 className="font-cinzel font-black text-xl sm:text-2xl text-amber-100">
                  {currentArticle.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 italic">
                  {currentArticle.subtitle}
                </p>
              </div>

              {/* Executive Summary Callout */}
              <div className="p-4 rounded-xl bg-stone-900/80 border-l-4 border-amber-500 text-stone-300 text-xs sm:text-sm leading-relaxed space-y-1">
                <span className="font-cinzel font-bold text-amber-300 block text-[11px] uppercase tracking-wider">
                  Codified Executive Summary
                </span>
                <p>{currentArticle.summary}</p>
              </div>

              {/* Key Takeaways Grid */}
              {currentArticle.keyTakeaways && currentArticle.keyTakeaways.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>Essential Architectural Mandates</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentArticle.keyTakeaways.map((point, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 flex items-start gap-2 text-xs text-stone-300"
                      >
                        <span className="text-amber-400 font-mono font-bold mt-0.5">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Markdown Content Body */}
              <div className="text-xs sm:text-sm text-stone-200 space-y-4 leading-relaxed font-sans border-t border-stone-800/80 pt-4">
                <div className="whitespace-pre-line font-sans text-stone-300">
                  {currentArticle.contentMarkdown}
                </div>
              </div>

              {/* Structured Tables if present */}
              {currentArticle.tables && currentArticle.tables.map((table, tIdx) => (
                <div key={tIdx} className="space-y-2 pt-2">
                  <span className="font-cinzel font-bold text-xs text-amber-300 uppercase tracking-wider block">
                    {table.caption}
                  </span>
                  <div className="overflow-x-auto rounded-xl border border-stone-800">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-stone-900 border-b border-stone-800 text-amber-200 font-cinzel font-bold">
                          {table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-2.5 sm:p-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800/60 font-mono text-[11px] sm:text-xs">
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-stone-900/40 transition">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 sm:p-3 text-stone-300">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Quick Navigation Footer */}
              <div className="flex items-center justify-between border-t border-stone-800 pt-4 text-xs font-cinzel">
                <span className="text-stone-400">
                  Realm of Nexus TCG • Official Codified Documentation
                </span>
                <span className="text-amber-400/80 font-mono">
                  CRD & Engine Architecture v3.4
                </span>
              </div>

            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-3">
              <BookOpen size={36} className="mx-auto text-amber-400/50" />
              <h3 className="font-cinzel font-bold text-lg text-stone-200">
                Select an Article to View Codified Documentation
              </h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Explore comprehensive tournament rules, engine mechanics, domain matrices, and timing specifications.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
