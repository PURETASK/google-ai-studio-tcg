import React, { useState } from 'react';
import { RULES_BIBLE_SECTIONS, JUDGE_FAQS } from '../../data/nexusLadderData';
import { BookCheck, Scale, Search, ShieldAlert, FileText, ChevronRight, HelpCircle } from 'lucide-react';

export const RulesBibleExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bible' | 'oracle'>('bible');
  const [search, setSearch] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('100');

  const filteredFaqs = JUDGE_FAQS.filter(faq => {
    if (!search) return true;
    const q = search.toLowerCase();
    return faq.question.toLowerCase().includes(q) || faq.ruling.toLowerCase().includes(q) || faq.category.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BookCheck className="text-amber-400" size={20} />
            <h3 className="font-cinzel font-bold text-lg text-amber-100">
              Stages 28 & 29: Rules Bible & Judge Oracle FAQ
            </h3>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            Codified legal framework (Sections 100-900) and tournament edge-case oracle rulings.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setActiveTab('bible')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition ${
              activeTab === 'bible'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Comprehensive Rules
          </button>
          <button
            onClick={() => setActiveTab('oracle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition ${
              activeTab === 'oracle'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Judge Oracle FAQ ({JUDGE_FAQS.length})
          </button>
        </div>
      </div>

      {activeTab === 'bible' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Section Navigator (4 cols) */}
          <div className="md:col-span-4 space-y-2 bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="font-cinzel text-[10px] uppercase tracking-wider text-stone-400 block px-2">
              Rule Sections
            </span>
            {RULES_BIBLE_SECTIONS.map((sec) => (
              <button
                key={sec.code}
                onClick={() => setSelectedSection(sec.code)}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-center justify-between border ${
                  selectedSection === sec.code
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-stone-900/50 border-stone-800 text-stone-400 hover:bg-stone-800'
                }`}
              >
                <div>
                  <span className="font-mono text-amber-400 font-bold mr-2">§{sec.code}</span>
                  <span className="font-cinzel font-semibold">{sec.title}</span>
                </div>
                <ChevronRight size={13} />
              </button>
            ))}
          </div>

          {/* Right: Section Clauses (8 cols) */}
          <div className="md:col-span-8 bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-4">
            {(() => {
              const current = RULES_BIBLE_SECTIONS.find(s => s.code === selectedSection) || RULES_BIBLE_SECTIONS[0];
              return (
                <div>
                  <div className="border-b border-stone-800 pb-3 mb-4">
                    <span className="font-mono text-xs text-amber-400 font-bold block">SECTION {current.code}</span>
                    <h4 className="font-cinzel font-bold text-base text-stone-100">{current.title}</h4>
                    <p className="text-xs text-stone-400 mt-1">{current.summary}</p>
                  </div>

                  <div className="space-y-3">
                    {current.subsections.map((sub) => (
                      <div key={sub.number} className="p-3 rounded-lg bg-stone-900/80 border border-stone-800">
                        <span className="font-mono text-xs font-bold text-amber-300 block mb-1">
                          Rule {sub.number}
                        </span>
                        <p className="text-xs text-stone-200 leading-relaxed font-sans">
                          {sub.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      ) : (
        /* Judge Oracle View */
        <div className="space-y-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search judge rulings by keyword, timing conflict, or rule..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 border border-purple-500/40 text-purple-300">
                    Category: {faq.category}
                  </span>
                  <div className="flex gap-1">
                    {faq.relevantRules.map(r => (
                      <span key={r} className="text-[9px] font-mono text-amber-400 bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="font-cinzel font-bold text-xs text-amber-200">
                  Q: {faq.question}
                </h4>

                <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300 font-sans leading-relaxed">
                  <strong className="text-emerald-400 font-mono block mb-1">OFFICIAL RULING:</strong>
                  {faq.ruling}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
