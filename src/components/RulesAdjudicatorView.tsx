import React, { useState } from 'react';
import { COMPREHENSIVE_KEYWORDS, JUDGE_CASE_SCENARIOS } from '../data/rulesAdjudicatorData';
import { AdjudicatorKeyword, JudgeCaseScenario, ArbiterRulingResponse, Domain } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Scale, 
  BookOpen, 
  Search, 
  Filter, 
  ShieldCheck, 
  Zap, 
  Flame, 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Bot,
  Send,
  Loader2,
  RefreshCw,
  Clock
} from 'lucide-react';

interface RulesAdjudicatorViewProps {
  onInspectCard?: (name: string) => void;
}

export const RulesAdjudicatorView: React.FC<RulesAdjudicatorViewProps> = ({
  onInspectCard
}) => {
  const [activeTab, setActiveTab] = useState<'arbiter' | 'keywords' | 'judge-cases' | 'layers'>('arbiter');
  const [keywordSearch, setKeywordSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [selectedCase, setSelectedCase] = useState<JudgeCaseScenario>(JUDGE_CASE_SCENARIOS[0]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Grand Arbiter Interactive State
  const [arbiterQuery, setArbiterQuery] = useState<string>('');
  const [selectedPhase, setSelectedPhase] = useState<string>('Combat Resolution');
  const [isLoadingRuling, setIsLoadingRuling] = useState<boolean>(false);
  const [rulingResult, setRulingResult] = useState<ArbiterRulingResponse | null>(null);

  const popularQueries = [
    "What happens when a unit with Rebirth takes lethal combat damage from an Obliterate attack?",
    "Can a Skyborn unit be blocked by a ground Vanguard taunt defender?",
    "If I Brace during the Pre-Dawn Horizon step, does it protect against Tier II Volcanic Eruption?",
    "How does Echo interact with the Priority Stack if my opponent plays a Fast Reaction Counter?",
    "Can my Soul Vat exceed 5 souls if 3 friendly units perish in the same combat step?"
  ];

  const handleAskArbiter = async (queryText?: string) => {
    const textToSubmit = queryText || arbiterQuery;
    if (!textToSubmit.trim()) return;

    soundEngine.playMicroSound('select');
    setIsLoadingRuling(true);
    setRulingResult(null);

    try {
      const res = await fetch('/api/rules/adjudicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSubmit,
          currentPhase: selectedPhase
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data: ArbiterRulingResponse = await res.json();
      setRulingResult(data);
      soundEngine.playMicroSound('unlock');
    } catch (err) {
      console.warn('Fallback to local adjudicator rules resolution:', err);
      // Fallback local resolution
      const qLower = textToSubmit.toLowerCase();
      setRulingResult({
        source: 'Grand Arbiter Offline Rules Core',
        verdict: 'Priority Resolution Ruling (Codified GLO-23)',
        summary: 'All triggered abilities and reactions resolve in reverse order (LIFO). Continuous state-based checks apply strictly in Layer 6 after each spell resolution.',
        ruleCitations: ['Rule 104.2 (Priority Chain)', 'Rule 408.1 (Triggered Effects)', 'Layer 6 (State-Based Actions)'],
        executionStack: [
          { order: 1, phase: selectedPhase, action: 'Trigger or Spell placed onto Priority Stack.', timingLayer: 'L4 (Ability)' },
          { order: 2, phase: 'Reaction Step', action: 'Priority passed to opponent for Fast Reactions.', timingLayer: 'Fast Speed' },
          { order: 3, phase: 'Resolution', action: 'Top item resolves and changes battlefield board state.', timingLayer: 'L6 (State Checks)' }
        ],
        layerApplicable: 6,
        penaltyPrecedence: 'Legal tournament play.',
        tacticalAdvice: 'Preserve 1 Momentum for critical Fast Reaction windows during combat declaration.',
        relatedKeywords: ['Priority Stack', 'Reactions', 'Continuous Layers']
      });
      soundEngine.playMicroSound('unlock');
    } finally {
      setIsLoadingRuling(false);
    }
  };

  const filteredKeywords = COMPREHENSIVE_KEYWORDS.filter(kw => {
    if (domainFilter !== 'All' && kw.domain !== domainFilter && kw.domain !== 'Universal') return false;
    if (!keywordSearch.trim()) return true;
    const q = keywordSearch.toLowerCase();
    return (
      kw.name.toLowerCase().includes(q) ||
      kw.reminderText.toLowerCase().includes(q) ||
      kw.formalRulesText.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 space-y-6 animate-fadeIn min-w-0">
      
      {/* View Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-950 via-neutral-900 to-stone-950 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase tracking-widest">
              <Scale size={16} />
              <span>Council Rule GLO-23 • Tournament Adjudication System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-black text-amber-100 mt-1">
              Rules Adjudicator & The Grand Arbiter
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-3xl mt-1.5 leading-relaxed">
              Official legal rule text, priority timing layers, and real-time AI referee adjudication for tournament referees and competitive players.
            </p>
          </div>

          {/* Navigation Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playMicroSound('select');
                setActiveTab('arbiter');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 transition ${
                activeTab === 'arbiter'
                  ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Bot size={15} />
              <span>Grand Arbiter AI</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playMicroSound('select');
                setActiveTab('keywords');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 transition ${
                activeTab === 'keywords'
                  ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <BookOpen size={15} />
              <span>Keywords (40+)</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playMicroSound('select');
                setActiveTab('judge-cases');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 transition ${
                activeTab === 'judge-cases'
                  ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Scale size={15} />
              <span>Case Simulator</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playMicroSound('select');
                setActiveTab('layers');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 transition ${
                activeTab === 'layers'
                  ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Layers size={15} />
              <span>6-Layer Architecture</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 0: THE GRAND ARBITER AI QUERY */}
      {activeTab === 'arbiter' && (
        <div className="space-y-6">
          
          {/* Query Input Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-amber-500/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase">
                <Sparkles size={16} />
                <span>Ask The Grand Arbiter (Live Tournament Judge)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                Rulebook v1.4 Codified
              </span>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-cinzel font-bold text-stone-300 block">
                Enter complex interaction, timing conflict, or rule dispute:
              </label>
              
              <div className="relative">
                <textarea
                  rows={3}
                  value={arbiterQuery}
                  onChange={e => setArbiterQuery(e.target.value)}
                  placeholder="e.g. What happens when a unit with Toxic Death Trigger dies inside the Sanctuary Aegis lane during the combat damage step?"
                  className="w-full p-4 rounded-2xl bg-stone-950 border border-stone-800 text-stone-200 placeholder-stone-400 text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              {/* Phase selector & submit button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-400">Context Phase:</span>
                  <select
                    value={selectedPhase}
                    onChange={e => setSelectedPhase(e.target.value)}
                    className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Dawn Untap Step">Dawn Untap Step</option>
                    <option value="Main Action Phase">Main Action Phase</option>
                    <option value="Combat Declaration">Combat Declaration</option>
                    <option value="Combat Resolution">Combat Resolution</option>
                    <option value="Priority Fast Reaction Chain">Priority Fast Reaction Chain</option>
                    <option value="Pre-Dawn Hazard Step">Pre-Dawn Hazard Step</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleAskArbiter()}
                  disabled={isLoadingRuling || !arbiterQuery.trim()}
                  className={`px-6 py-3 rounded-2xl font-cinzel font-bold text-xs flex items-center justify-center gap-2 transition ${
                    isLoadingRuling || !arbiterQuery.trim()
                      ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 shadow-xl hover:scale-102'
                  }`}
                >
                  {isLoadingRuling ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-stone-950" />
                      <span>Adjudicating Rules...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Request Official Ruling</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Popular Precedent Queries */}
            <div className="pt-3 border-t border-stone-800/80 space-y-2">
              <span className="text-[10px] font-cinzel font-bold text-stone-400 uppercase tracking-wider block">
                Popular Competitive Disputes:
              </span>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((pq, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setArbiterQuery(pq);
                      handleAskArbiter(pq);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-950/80 hover:bg-stone-800 text-left border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-sans transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-400">⚡</span>
                    <span className="truncate max-w-xs">{pq}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Ruling Result Display */}
          {rulingResult && (
            <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/95 border-2 border-emerald-500/50 shadow-2xl space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                    {rulingResult.source} • Official Decision
                  </span>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-black text-amber-100 mt-0.5">
                    {rulingResult.verdict}
                  </h2>
                </div>
                {rulingResult.layerApplicable && (
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0">
                    <Layers size={14} />
                    <span>Layer {rulingResult.layerApplicable} Continuous</span>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-black/60 border border-stone-800 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                <strong className="text-emerald-400 block mb-1 font-cinzel text-xs">
                  Executive Referee Summary:
                </strong>
                {rulingResult.summary}
              </div>

              {/* Execution Stack Sequence */}
              {rulingResult.executionStack && rulingResult.executionStack.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-cinzel font-bold text-xs text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-400" />
                    <span>Deterministic Resolution Stack (LIFO)</span>
                  </h4>

                  <div className="space-y-2">
                    {rulingResult.executionStack.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/80 flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs font-mono font-bold text-emerald-400 shrink-0 mt-0.5">
                            {step.order}
                          </span>
                          <div>
                            <span className="text-[11px] font-cinzel font-bold text-amber-300 block">
                              {step.phase}
                            </span>
                            <p className="text-xs text-stone-300 mt-0.5">
                              {step.action}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded shrink-0">
                          {step.timingLayer}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citations and Advice Footer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="text-[10px] font-cinzel font-bold text-stone-400 uppercase tracking-wider block">
                    Official Codified Citations:
                  </span>
                  <div className="space-y-1">
                    {rulingResult.ruleCitations.map((c, cIdx) => (
                      <div key={cIdx} className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                        <span className="text-emerald-400">§</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
                  <span className="text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider block">
                    Competitive Strategy & Counterplay:
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    {rulingResult.tacticalAdvice || 'Always track priority windows when holding Fast Reactions in your hand.'}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 1: KEYWORD ENCYCLOPEDIA */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {['All', 'Universal', 'Sanctuary', 'Verdance', 'Radiance', 'Abyss', 'Tempest', 'Arcane'].map(d => (
                <button
                  key={d}
                  onClick={() => setDomainFilter(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold transition ${
                    domainFilter === d
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                      : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="relative min-w-[280px]">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search keywords, formal rules..."
                value={keywordSearch}
                onChange={e => setKeywordSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Keywords Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredKeywords.map(kw => (
              <div
                key={kw.id}
                className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 hover:border-amber-500/60 transition shadow-xl space-y-3.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-cinzel font-black text-lg text-amber-200">
                        {kw.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap text-[11px] font-mono">
                        <span className="text-stone-400">{kw.domain}</span>
                        <span>•</span>
                        <span className="text-amber-400 font-semibold">{kw.type}</span>
                        <span>•</span>
                        <span className="text-sky-400">{kw.speed}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase bg-stone-950 text-amber-300 border border-amber-500/40">
                      Rule 400+
                    </span>
                  </div>

                  {/* Reminder Text Box */}
                  <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-xs text-amber-100 font-sans italic mt-3">
                    "{kw.reminderText}"
                  </div>

                  {/* Formal Legal Rule Text */}
                  <div className="mt-3 text-xs text-stone-300 leading-relaxed font-mono bg-black/40 p-3 rounded-xl border border-stone-800/80">
                    <span className="text-[10px] font-bold text-amber-400 uppercase block font-cinzel mb-1">
                      Codified Tournament Text:
                    </span>
                    {kw.formalRulesText}
                  </div>

                  {/* Clarifications Checklist */}
                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] font-cinzel font-bold text-stone-400 uppercase tracking-wider block">
                      Referee Notes & Clarifications:
                    </span>
                    {kw.clarifications.map((c, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-300 leading-tight">
                        <span className="text-emerald-400">✓</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Counterplay Advice */}
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200/90 flex items-start gap-2">
                  <ShieldCheck size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">Tactical Counterplay: </strong>
                    <span>{kw.counterplayTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: JUDGE CASE SIMULATOR */}
      {activeTab === 'judge-cases' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Cases Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-cinzel font-black text-sm text-amber-300 uppercase tracking-wider">
              Codified Ruling Scenarios (GLO-23)
            </h3>
            <div className="space-y-2">
              {JUDGE_CASE_SCENARIOS.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setSelectedCase(c);
                    setActiveStepIndex(0);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedCase.id === c.id
                      ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-500/40'
                      : 'bg-stone-950/80 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300">
                      {c.category}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">
                      {c.rulesCitation.split('&')[0]}
                    </span>
                  </div>
                  <h4 className="font-cinzel font-bold text-xs text-stone-200 leading-snug">
                    {c.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Case Inspector & Step Flow */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span>Category: {selectedCase.category}</span>
                  <span>•</span>
                  <span>{selectedCase.rulesCitation}</span>
                </div>
                <h2 className="text-xl font-cinzel font-black text-amber-100 mt-1">
                  {selectedCase.title}
                </h2>
                <div className="p-3.5 rounded-xl bg-black/50 border border-stone-800 text-xs text-stone-300 leading-relaxed mt-3">
                  <strong className="text-amber-300 block mb-1 font-cinzel">The Dispute Scenario:</strong>
                  {selectedCase.scenarioPrompt}
                </div>
              </div>

              {/* Step-by-Step Resolution Flowchart */}
              <div className="space-y-3">
                <h4 className="font-cinzel font-bold text-xs text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={14} className="text-amber-400" />
                  Deterministic Execution Chain
                </h4>

                <div className="space-y-2.5">
                  {selectedCase.stepByStepFlow.map((s, idx) => (
                    <div
                      key={s.step}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`p-3 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition ${
                        activeStepIndex === idx
                          ? 'bg-stone-950 border-emerald-400/80 shadow-md ring-1 ring-emerald-500/30'
                          : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs font-mono font-bold text-emerald-400 shrink-0">
                          {s.step}
                        </div>
                        <div>
                          <span className="text-[11px] font-cinzel font-bold text-stone-200 block">
                            {s.phase}
                          </span>
                          <p className="text-xs text-stone-300 mt-0.5 leading-snug">
                            {s.action}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400/90 bg-stone-900 px-2 py-0.5 rounded border border-stone-800 shrink-0">
                        {s.rulingLayer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Council Verdict */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-stone-950 to-neutral-950 border border-emerald-500/50 shadow-xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-cinzel font-black text-emerald-400 uppercase tracking-wider">
                  <CheckCircle2 size={16} />
                  <span>Official Council Referee Ruling</span>
                </div>
                <p className="text-xs text-stone-200 font-sans leading-relaxed">
                  {selectedCase.officialRuling}
                </p>
                <span className="text-[10px] font-mono text-stone-400 block pt-1">
                  Binding Precedence: {selectedCase.rulesCitation}
                </span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 3: 6-LAYER ARCHITECTURE */}
      {activeTab === 'layers' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-cinzel font-black text-amber-100">
              The 6-Layer Continuous Effect Architecture
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
              When multiple passive abilities, buffs, and domain debuffs apply to a single card simultaneously, they are evaluated strictly in ascending layer order (Layer 1 to Layer 6).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { num: 1, name: 'Copy & Base Attributes', desc: 'Evaluates printed card values, card name, and physical base Power/Defense stats.' },
              { num: 2, name: 'Control & Domain Shifting', desc: 'Evaluates lane control, domain conversions (e.g. turning into Void), and ownership changes.' },
              { num: 3, name: 'Card Type & Subtype Changes', desc: 'Adds or removes subtypes (e.g. turning a unit into a Construct or Beast).' },
              { num: 4, name: 'Keyword & Ability Modifications', desc: 'Grants or revokes keywords (Skyborn, Fogtouch, Rebirth, Stabilize).' },
              { num: 5, name: 'Power & Defense Alterations', desc: 'Applies arithmetic modifiers (+2/+2 buffs, -1/-1 wither counters, weapon equipment stats).' },
              { num: 6, name: 'State-Based Actions & Mortality', desc: 'Zero-health death checks, Rebirth replacements, and graveyard cleanup.' }
            ].map(l => (
              <div key={l.num} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-300 text-xs">
                    L{l.num}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Layer {l.num}</span>
                </div>
                <h4 className="font-cinzel font-bold text-sm text-stone-200">{l.name}</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
