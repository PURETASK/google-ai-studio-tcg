import React, { useState } from 'react';
import { 
  BIBLE_SECTIONS, 
  CONCEPTS_AUDIT, 
  FACTION_PHILOSOPHIES, 
  MOMENTUM_PROTOTYPES, 
  MECHANIC_PROTOTYPES, 
  CROSS_DOMAIN_SYNERGIES, 
  COUNTERPLAY_MATRIX,
  BibleSection,
  MomentumPrototype,
  MechanicPrototypeSpec,
  FactionPhilosophy
} from '../../data/colorIdentityMomentumData';
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  Swords, 
  Layers, 
  Scale, 
  Dices, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Copy, 
  Check, 
  Cpu, 
  GitBranch, 
  ArrowRight, 
  Sliders, 
  Play, 
  RotateCcw, 
  Target, 
  Compass,
  Activity,
  Award
} from 'lucide-react';

interface ColorIdentityBibleViewProps {
  onInspectCard?: (cardName: string) => void;
}

type TabType = 
  | 'bible-doc' 
  | 'momentum-simulator' 
  | 'mechanics-sandbox' 
  | 'domain-philosophies' 
  | 'synergies-matrix' 
  | 'counterplay-matrix'
  | 'concept-audit';

export const ColorIdentityBibleView: React.FC<ColorIdentityBibleViewProps> = ({ onInspectCard }) => {
  const [activeTab, setActiveTab] = useState<TabType>('bible-doc');
  const [selectedSectionNum, setSelectedSectionNum] = useState<number>(1);
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [auditFilter, setAuditFilter] = useState<'ALL' | 'KEEP' | 'MODIFY' | 'MERGE' | 'REJECT' | 'PROTOTYPE'>('ALL');
  const [auditSearchQuery, setAuditSearchQuery] = useState<string>('');

  // Momentum Simulator State
  const [activeProtoId, setActiveProtoId] = useState<string>('mom-proto-c');
  const [actionMomPlayerA, setActionMomPlayerA] = useState<number>(3);
  const [actionMomPlayerB, setActionMomPlayerB] = useState<number>(2);
  const [trackPositionA, setTrackPositionA] = useState<number>(6); // 0-10
  const [trackPositionB, setTrackPositionB] = useState<number>(3); // 0-10
  const [contestedValue, setContestedValue] = useState<number>(0); // -5 to +5
  const [simLogs, setSimLogs] = useState<string[]>([
    'Simulator initialized. Select actions to test Momentum generation, spending, and decay.'
  ]);

  // Sandbox Mechanic State
  const [activeMechanicId, setActiveMechanicId] = useState<string>('mech-preparation');
  const [isPrepared, setIsPrepared] = useState<boolean>(false);
  const [prepCharges, setPrepCharges] = useState<number>(0);
  
  // Adaptation State
  const [adaptedTraits, setAdaptedTraits] = useState<string[]>([]);
  
  // Soul Vat State
  const [storedSouls, setStoredSouls] = useState<number>(2);
  const [constructAwakened, setConstructAwakened] = useState<boolean>(false);

  // Assembly State
  const [frameSelected, setFrameSelected] = useState<boolean>(true);
  const [coreAttached, setCoreAttached] = useState<boolean>(false);
  const [weaponAttached, setWeaponAttached] = useState<boolean>(false);

  // Mental Duel State
  const [playerStance, setPlayerStance] = useState<'Strike' | 'Guard' | 'Feint' | null>(null);
  const [aiStance, setAiStance] = useState<'Strike' | 'Guard' | 'Feint' | null>(null);
  const [duelResult, setDuelResult] = useState<string | null>(null);

  // Filter sections
  const filteredSections = BIBLE_SECTIONS.filter(sec => {
    if (docCategoryFilter !== 'All' && sec.category !== docCategoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return sec.title.toLowerCase().includes(q) || sec.summary.toLowerCase().includes(q);
    }
    return true;
  });

  const activeSection = BIBLE_SECTIONS.find(s => s.sectionNumber === selectedSectionNum) || BIBLE_SECTIONS[0];
  const activePrototype = MOMENTUM_PROTOTYPES.find(p => p.id === activeProtoId) || MOMENTUM_PROTOTYPES[2];
  const activeMechanic = MECHANIC_PROTOTYPES.find(m => m.id === activeMechanicId) || MECHANIC_PROTOTYPES[1];

  const handleCopyCitation = () => {
    const citation = `NEXUS TCG COLOR IDENTITY & MOMENTUM SYSTEM BIBLE — PROTOTYPE v0.1\nSection ${activeSection.sectionNumber}: ${activeSection.title}\nCategory: ${activeSection.category} | Status: ${activeSection.status}\n\nSummary:\n${activeSection.summary}`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addSimLog = (msg: string) => {
    setSimLogs(prev => [ `[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 15) ]);
  };

  // Mental duel resolution
  const handleResolveDuel = (chosenStance: 'Strike' | 'Guard' | 'Feint') => {
    setPlayerStance(chosenStance);
    const stances: ('Strike' | 'Guard' | 'Feint')[] = ['Strike', 'Guard', 'Feint'];
    const randomAi = stances[Math.floor(Math.random() * stances.length)];
    setAiStance(randomAi);

    let res = '';
    if (chosenStance === randomAi) {
      res = `Stance Tie! Both deployed ${chosenStance}. Standard combat math applies with no critical modifier.`;
    } else if (
      (chosenStance === 'Strike' && randomAi === 'Feint') ||
      (chosenStance === 'Feint' && randomAi === 'Guard') ||
      (chosenStance === 'Guard' && randomAi === 'Strike')
    ) {
      res = `VICTORY! Your ${chosenStance} decisively defeated opponent's ${randomAi}! +3 Critical Strike damage and initiative seized!`;
    } else {
      res = `DEFEAT! Opponent's ${randomAi} countered your ${chosenStance}! Incoming damage reflected!`;
    }
    setDuelResult(res);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Top Banner: Master Document Header */}
      <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 border-2 border-amber-500/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Sparkles size={260} className="text-amber-400" />
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-300 shrink-0 shadow-lg shadow-amber-500/20">
              <Activity size={32} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500 text-stone-950 uppercase tracking-wider">
                  OFFICIAL SYSTEM BIBLE v0.1
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  36 CODIFIED SECTIONS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-800 text-stone-300">
                  INVERTED COLOR IDENTITIES & MOMENTUM
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-100 tracking-wide">
                Nexus TCG Color Identity & Momentum System Bible
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm max-w-3xl mt-1 leading-relaxed">
                Complete design directive establishing original inverted domain identities, 4 live Momentum prototypes, signature mechanical verbs (PREPARE, SURGE, HUNT, PRESERVE, SHIELD, ASSEMBLE), and full cross-domain synergy & counterplay matrices.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCitation}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono font-bold flex items-center justify-center gap-2 border border-stone-700 transition active:scale-95"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copied ? 'Citation Copied' : 'Copy Bible Citation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-stone-900/90 p-2 rounded-xl border border-stone-800 font-cinzel text-xs scrollbar-thin">
        <button
          onClick={() => setActiveTab('bible-doc')}
          className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'bible-doc'
              ? 'bg-amber-500 text-black shadow'
              : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
          }`}
        >
          <BookOpen size={15} />
          <span>36-Section Master Document</span>
        </button>

        <button
          onClick={() => setActiveTab('momentum-simulator')}
          className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'momentum-simulator'
              ? 'bg-amber-500 text-black shadow'
              : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
          }`}
        >
          <Activity size={15} />
          <span>Momentum Simulator (Prototypes A-D)</span>
        </button>

        <button
          onClick={() => setActiveTab('mechanics-sandbox')}
          className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'mechanics-sandbox'
              ? 'bg-amber-500 text-black shadow'
              : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
          }`}
        >
          <Sliders size={15} />
          <span>Signature Mechanics Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('domain-philosophies')}
          className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'domain-philosophies'
              ? 'bg-amber-500 text-black shadow'
              : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
          }`}
        >
          <Compass size={15} />
          <span>Inverted Domain Philosophies</span>
        </button>

        <button
          onClick={() => setActiveTab('synergies-matrix')}
          className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'synergies-matrix'
              ? 'bg-amber-500 text-black shadow'
              : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
          }`}
        >
          <GitBranch size={15} />
          <span>Cross-Domain Synergies & Red-Team</span>
        </button>

        <button
          onClick={() => setActiveTab('counterplay-matrix')}
          className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'counterplay-matrix'
              ? 'bg-amber-500 text-black shadow'
              : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
          }`}
        >
          <ShieldAlert size={15} />
          <span>10-Matchup Counterplay Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('concept-audit')}
          className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'concept-audit'
              ? 'bg-amber-500 text-black shadow'
              : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
          }`}
        >
          <Scale size={15} />
          <span>Original Concepts Audit</span>
        </button>
      </div>

      {/* ================= TAB 1: 36-SECTION MASTER DOCUMENT ================= */}
      {activeTab === 'bible-doc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Sections Navigator (4 cols) */}
          <div className="lg:col-span-4 space-y-3 bg-stone-900/90 p-4 rounded-2xl border border-stone-800">
            <div className="space-y-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search Bible sections (1-36)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1 text-[11px] font-cinzel">
                {(['All', 'Philosophy & Audit', 'Domain Identities', 'Momentum Framework', 'Mechanics Prototypes', 'Archetypes & Synergies', 'Balance, Exploit & Testing'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDocCategoryFilter(cat)}
                    className={`px-2 py-1 rounded transition text-[10px] ${
                      docCategoryFilter === cat
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-stone-950 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {cat === 'All' ? 'All (36)' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sections List */}
            <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredSections.map((sec) => {
                const isSelected = sec.sectionNumber === selectedSectionNum;
                return (
                  <button
                    key={sec.sectionNumber}
                    onClick={() => setSelectedSectionNum(sec.sectionNumber)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow'
                        : 'bg-stone-950/60 border-stone-800/80 text-stone-400 hover:bg-stone-850 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-400 font-bold text-[11px] px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">
                        §{sec.sectionNumber}
                      </span>
                      <span className="font-cinzel font-medium line-clamp-1">
                        {sec.title}
                      </span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono shrink-0 ${
                      sec.status === 'LOCKED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' :
                      sec.status === 'PROVISIONAL' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                      sec.status === 'EXPERIMENTAL' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' :
                      'bg-red-950 text-red-400 border border-red-500/40'
                    }`}>
                      {sec.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep-Dive Section Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-stone-900/90 p-6 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500 text-black">
                    SECTION {activeSection.sectionNumber} OF 36
                  </span>
                  <span className="text-xs font-mono text-amber-400">
                    Category: {activeSection.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-100 mt-1">
                  {activeSection.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                  activeSection.status === 'LOCKED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                  activeSection.status === 'PROVISIONAL' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                  activeSection.status === 'EXPERIMENTAL' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' :
                  'bg-red-950 text-red-300 border border-red-500/40'
                }`}>
                  STATUS: {activeSection.status}
                </span>
              </div>
            </div>

            {/* Section Overview Box */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold block">
                Executive Synthesis
              </span>
              <p className="text-stone-300 text-sm leading-relaxed font-sans">
                {activeSection.summary}
              </p>
            </div>

            {/* Dynamic Content Rendering based on Section Category */}
            {activeSection.category === 'Philosophy & Audit' && (
              <div className="space-y-4">
                <h4 className="font-cinzel font-bold text-sm text-stone-200">
                  Concept Audit Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CONCEPTS_AUDIT.slice(0, 4).map(aud => (
                    <div key={aud.id} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-xs text-amber-300">{aud.originalConcept}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          aud.classification === 'KEEP' ? 'bg-emerald-950 text-emerald-400' :
                          aud.classification === 'MODIFY' ? 'bg-blue-950 text-blue-400' :
                          aud.classification === 'MERGE' ? 'bg-purple-950 text-purple-400' :
                          aud.classification === 'REJECT' ? 'bg-red-950 text-red-400' :
                          'bg-amber-950 text-amber-400'
                        }`}>
                          {aud.classification}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400">{aud.reasoning}</p>
                      <div className="text-[11px] text-emerald-300 pt-1 border-t border-stone-850 font-mono">
                        Nexus Evolution: {aud.evolutionToNexus}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection.category === 'Domain Identities' && (
              <div className="space-y-4">
                <h4 className="font-cinzel font-bold text-sm text-stone-200">
                  Codified Inverted Domain Philosophies
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {FACTION_PHILOSOPHIES.map(fac => (
                    <div key={fac.domain} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-sm text-amber-200">{fac.domain}</span>
                        <div className="flex gap-1 font-mono text-[10px]">
                          {fac.signatureVerbs.map(v => (
                            <span key={v} className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-stone-300">{fac.philosophy}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-stone-850">
                        <div>
                          <span className="text-amber-400 font-bold">Traditional MTG Trope:</span> {fac.traditionalExpectation}
                        </div>
                        <div>
                          <span className="text-emerald-400 font-bold">Inverted Nexus Identity:</span> {fac.invertedNexusIdentity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection.category === 'Momentum Framework' && (
              <div className="space-y-4">
                <h4 className="font-cinzel font-bold text-sm text-stone-200">
                  Active Momentum Prototypes (A-D)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MOMENTUM_PROTOTYPES.map(proto => (
                    <div key={proto.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-xs text-amber-300">{proto.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {proto.modelType}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400">{proto.tagline}</p>
                      <div className="text-[11px] text-stone-300 space-y-1 pt-1 border-t border-stone-850 font-sans">
                        <div><strong>Decay:</strong> {proto.decayRules}</div>
                        <div><strong>Tabletop Complexity:</strong> {proto.tabletopDifficulty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection.category === 'Mechanics Prototypes' && (
              <div className="space-y-4">
                <h4 className="font-cinzel font-bold text-sm text-stone-200">
                  Signature Mechanics Specs & Test Cards
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {MECHANIC_PROTOTYPES.map(mech => (
                    <div key={mech.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-sm text-amber-200">{mech.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-900 border border-stone-700 text-stone-300">
                          {mech.associatedDomain}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300">{mech.coreThesis}</p>
                      <div className="space-y-1 bg-stone-900 p-2.5 rounded-lg text-[11px] font-mono text-stone-300">
                        {mech.formalRulesClauses.map((rc, idx) => (
                          <div key={idx} className="text-amber-200/90">{rc}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection.category === 'Archetypes & Synergies' && (
              <div className="space-y-4">
                <h4 className="font-cinzel font-bold text-sm text-stone-200">
                  Cross-Domain Synergies & Red-Team Vulnerabilities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CROSS_DOMAIN_SYNERGIES.map(syn => (
                    <div key={syn.pair} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-xs text-amber-300">{syn.pair}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          syn.riskSeverity.includes('Severe') ? 'bg-red-950 text-red-400 border border-red-500/40' :
                          'bg-amber-950 text-amber-400 border border-amber-500/40'
                        }`}>
                          {syn.riskSeverity}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300">{syn.synergyThesis}</p>
                      <div className="text-[11px] text-red-300/90 p-2 rounded bg-red-950/40 border border-red-900/60 font-mono">
                        Red-Team Warning: {syn.redTeamWarning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection.category === 'Balance, Exploit & Testing' && (
              <div className="space-y-4">
                <h4 className="font-cinzel font-bold text-sm text-stone-200">
                  Balance Parameters & Testing Protocols
                </h4>
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3 text-xs text-stone-300">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-mono uppercase text-amber-400 block">Baseline Stat Ratio</span>
                      <span className="text-base font-bold font-mono text-stone-100">1 Essence = 1.5 ATK/DEF</span>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-mono uppercase text-amber-400 block">Momentum Value</span>
                      <span className="text-base font-bold font-mono text-stone-100">1 MP = 0.5 Essence</span>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-mono uppercase text-amber-400 block">Target Match Length</span>
                      <span className="text-base font-bold font-mono text-stone-100">7.2 Rounds (~14 Min)</span>
                    </div>
                  </div>
                  <p className="text-stone-400 text-xs">
                    Comprehensive testing requires all mechanics to pass both automated 100-match computational simulations and human double-blind playtests before receiving LOCKED status.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: LIVE MOMENTUM SIMULATOR ================= */}
      {activeTab === 'momentum-simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Prototype Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3 bg-stone-900/90 p-4 rounded-2xl border border-stone-800">
            <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold block">
              Select Momentum Model
            </span>
            {MOMENTUM_PROTOTYPES.map(proto => (
              <button
                key={proto.id}
                onClick={() => {
                  setActiveProtoId(proto.id);
                  addSimLog(`Switched simulator model to: ${proto.name}`);
                }}
                className={`w-full text-left p-3 rounded-xl transition flex flex-col gap-1 border ${
                  activeProtoId === proto.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-cinzel font-bold text-xs text-amber-200">{proto.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                    proto.status === 'RECOMMENDED_PLAYTEST' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold' :
                    'bg-stone-900 text-stone-400'
                  }`}>
                    {proto.status === 'RECOMMENDED_PLAYTEST' ? '★ RECOMMENDED' : proto.status}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 line-clamp-2">{proto.tagline}</span>
              </button>
            ))}

            {/* Reset Sim State */}
            <button
              onClick={() => {
                setActionMomPlayerA(3);
                setActionMomPlayerB(2);
                setTrackPositionA(6);
                setTrackPositionB(3);
                setContestedValue(0);
                addSimLog('Reset all simulator parameters to baseline default.');
              }}
              className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition"
            >
              <RotateCcw size={14} />
              <span>Reset Simulator States</span>
            </button>
          </div>

          {/* Active Interactive Simulation Engine (8 cols) */}
          <div className="lg:col-span-8 bg-stone-900/90 p-6 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase">Active Interactive Model</span>
                <h3 className="text-xl font-cinzel font-bold text-amber-100">{activePrototype.name}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-black font-cinzel font-bold text-xs">
                Model: {activePrototype.modelType}
              </span>
            </div>

            {/* Prototype Specific Simulator Interface */}
            {activePrototype.modelType === 'Action' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Player A Pool */}
                  <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel font-bold text-xs text-amber-300">Player A (Conduit)</span>
                      <span className="text-xl font-mono font-black text-amber-400">{actionMomPlayerA} / 10 MP</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-900 h-3 rounded-full overflow-hidden border border-stone-800">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
                        style={{ width: `${(actionMomPlayerA / 10) * 100}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                      <button
                        onClick={() => {
                          const newVal = Math.min(10, actionMomPlayerA + 1);
                          setActionMomPlayerA(newVal);
                          addSimLog(`Player A declared attack (+1 MP). Current: ${newVal}`);
                        }}
                        className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                      >
                        +1 Attack Declaration
                      </button>
                      <button
                        onClick={() => {
                          const newVal = Math.min(10, actionMomPlayerA + 2);
                          setActionMomPlayerA(newVal);
                          addSimLog(`Player A destroyed an enemy unit (+2 MP). Current: ${newVal}`);
                        }}
                        className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                      >
                        +2 Destroy Unit
                      </button>
                      <button
                        onClick={() => {
                          if (actionMomPlayerA >= 2) {
                            const newVal = actionMomPlayerA - 2;
                            setActionMomPlayerA(newVal);
                            addSimLog(`Player A spent 2 MP to Surge Ability (+2 Combat Power). Current: ${newVal}`);
                          } else {
                            addSimLog('Insufficient MP for Surge (Requires 2 MP).');
                          }
                        }}
                        className="p-2 rounded bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-500/40"
                      >
                        -2 Spend: Surge (+2 Power)
                      </button>
                      <button
                        onClick={() => {
                          const newVal = Math.floor(actionMomPlayerA / 2);
                          setActionMomPlayerA(newVal);
                          addSimLog(`Round Ended: 50% End Phase Decay applied to Player A (${actionMomPlayerA} -> ${newVal}).`);
                        }}
                        className="p-2 rounded bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-900"
                      >
                        End Round (50% Decay)
                      </button>
                    </div>
                  </div>

                  {/* Player B Pool */}
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel font-bold text-xs text-stone-300">Player B (Opponent)</span>
                      <span className="text-xl font-mono font-black text-stone-200">{actionMomPlayerB} / 10 MP</span>
                    </div>

                    <div className="w-full bg-stone-900 h-3 rounded-full overflow-hidden border border-stone-800">
                      <div 
                        className="bg-stone-400 h-full transition-all duration-300"
                        style={{ width: `${(actionMomPlayerB / 10) * 100}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                      <button
                        onClick={() => {
                          const newVal = Math.min(10, actionMomPlayerB + 1);
                          setActionMomPlayerB(newVal);
                          addSimLog(`Player B blocked successfully (+1 MP). Current: ${newVal}`);
                        }}
                        className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                      >
                        +1 Block
                      </button>
                      <button
                        onClick={() => {
                          if (actionMomPlayerB >= 3) {
                            const newVal = actionMomPlayerB - 3;
                            setActionMomPlayerB(newVal);
                            addSimLog(`Player B spent 3 MP to draw an End Phase Card. Current: ${newVal}`);
                          }
                        }}
                        className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                      >
                        -3 Spend: Draw Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePrototype.modelType === 'Track' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-sm text-amber-300">
                      Player A Momentum Track: [{trackPositionA}/10]
                    </span>
                    <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-amber-500 text-black">
                      {trackPositionA <= 2 ? 'Tier 0: Dormant' :
                       trackPositionA <= 5 ? 'Tier 1: Building' :
                       trackPositionA <= 8 ? 'Tier 2: Surging' : 'Tier 3: Dominant'}
                    </span>
                  </div>

                  {/* Visual Track Dial */}
                  <div className="flex items-center justify-between gap-1 p-2 bg-stone-900 rounded-xl border border-stone-800">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(pt => (
                      <button
                        key={pt}
                        onClick={() => {
                          setTrackPositionA(pt);
                          addSimLog(`Track adjusted to point ${pt}.`);
                        }}
                        className={`flex-1 py-2 rounded font-mono text-xs font-bold transition ${
                          trackPositionA === pt
                            ? 'bg-amber-500 text-black scale-110 shadow-lg'
                            : pt <= trackPositionA
                            ? 'bg-amber-950 text-amber-400'
                            : 'bg-stone-950 text-stone-500'
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <button
                      onClick={() => {
                        const next = Math.min(10, trackPositionA + 2);
                        setTrackPositionA(next);
                        addSimLog(`Won combat clash: +2 Momentum on Track (Current: ${next})`);
                      }}
                      className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                    >
                      +2 Win Combat
                    </button>
                    <button
                      onClick={() => {
                        const next = Math.max(0, trackPositionA - 2);
                        setTrackPositionA(next);
                        addSimLog(`Allied Champion died: -2 Momentum on Track (Current: ${next})`);
                      }}
                      className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                    >
                      -2 Unit Slain
                    </button>
                    <button
                      onClick={() => {
                        const next = Math.min(10, trackPositionA + 1);
                        setTrackPositionA(next);
                        addSimLog(`Held lane control: +1 Momentum on Track (Current: ${next})`);
                      }}
                      className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                    >
                      +1 Hold Lane
                    </button>
                    <button
                      onClick={() => {
                        const next = Math.max(0, trackPositionA - 1);
                        setTrackPositionA(next);
                        addSimLog(`Nexus took core damage: -1 Momentum on Track (Current: ${next})`);
                      }}
                      className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                    >
                      -1 Core Damage
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePrototype.modelType === 'Faction-Specific' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-stone-950 border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="text-emerald-400" size={18} />
                      <span className="font-cinzel font-bold text-sm text-emerald-300">
                        Asymmetric Domain Generation Test Bench
                      </span>
                    </div>
                    <span className="font-mono text-xs text-amber-300 font-bold">
                      Current MP: {actionMomPlayerA} / 8
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
                    <button
                      onClick={() => {
                        const next = Math.min(8, actionMomPlayerA + 2);
                        setActionMomPlayerA(next);
                        addSimLog(`🔥 Radiance Verb PREPARE: Unit held attack (+2 MP). Current: ${next}`);
                      }}
                      className="p-2.5 rounded-lg bg-orange-950/60 hover:bg-orange-900 border border-orange-700/60 text-orange-200 text-left"
                    >
                      <strong className="block text-amber-300">Radiance (PREPARE)</strong>
                      +2 MP when holding attack
                    </button>

                    <button
                      onClick={() => {
                        const next = Math.min(8, actionMomPlayerA + 2);
                        setActionMomPlayerA(next);
                        addSimLog(`⚡ Tempest Verb SPEED: Won Speed Clash & cast 2nd spell (+2 MP). Current: ${next}`);
                      }}
                      className="p-2.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-200 text-left"
                    >
                      <strong className="block text-cyan-300">Tempest (SURGE)</strong>
                      +2 MP on spell-chain
                    </button>

                    <button
                      onClick={() => {
                        const next = Math.min(8, actionMomPlayerA + 2);
                        setActionMomPlayerA(next);
                        addSimLog(`🌿 Verdance Verb SURVIVAL: Beast survived combat at 1 HP (+2 MP). Current: ${next}`);
                      }}
                      className="p-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-left"
                    >
                      <strong className="block text-emerald-300">Verdance (SURVIVE)</strong>
                      +2 MP when surviving damage
                    </button>

                    <button
                      onClick={() => {
                        const next = Math.min(8, actionMomPlayerA + 2);
                        setActionMomPlayerA(next);
                        addSimLog(`💀 Abyss Verb PRESERVE: Saved unit from lethal & stored Soul (+2 MP). Current: ${next}`);
                      }}
                      className="p-2.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-700/60 text-purple-200 text-left"
                    >
                      <strong className="block text-purple-300">Abyss (PRESERVE)</strong>
                      +2 MP upon Soul capture
                    </button>

                    <button
                      onClick={() => {
                        const next = Math.min(8, actionMomPlayerA + 2);
                        setActionMomPlayerA(next);
                        addSimLog(`✨ Sanctuary Verb HARMONY: Aegis reflected 3+ damage (+2 MP). Current: ${next}`);
                      }}
                      className="p-2.5 rounded-lg bg-yellow-950/60 hover:bg-yellow-900 border border-yellow-700/60 text-yellow-200 text-left"
                    >
                      <strong className="block text-yellow-300">Sanctuary (SHIELD)</strong>
                      +2 MP upon Aegis reflection
                    </button>

                    <button
                      onClick={() => {
                        const next = Math.max(0, actionMomPlayerA - 2);
                        setActionMomPlayerA(next);
                        addSimLog(`Start of Upkeep: Natural 2 MP decay applied (Current: ${next}).`);
                      }}
                      className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-left"
                    >
                      <strong className="block text-stone-200">Universal Upkeep</strong>
                      -2 MP Upkeep Decay
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePrototype.modelType === 'Contested Tug-of-War' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-stone-950 border border-purple-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-sm text-purple-300">
                      Contested Shared Center Marker: [{contestedValue > 0 ? `+${contestedValue} (You Lead)` : contestedValue < 0 ? `${contestedValue} (Opponent Leads)` : '0 (Neutral)'}]
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      contestedValue >= 4 ? 'bg-amber-500 text-black' :
                      contestedValue <= -4 ? 'bg-red-500 text-black' :
                      'bg-stone-800 text-stone-300'
                    }`}>
                      {contestedValue >= 4 ? 'MOMENTUM ASCENDANCE' : contestedValue <= -4 ? 'DESPERATION UNDERDOG FURY' : 'CONTESTED'}
                    </span>
                  </div>

                  {/* Tug-of-war visual bar */}
                  <div className="flex items-center justify-between gap-1 p-2 bg-stone-900 rounded-xl border border-stone-800">
                    {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        onClick={() => {
                          setContestedValue(val);
                          addSimLog(`Shared marker set to ${val}.`);
                        }}
                        className={`flex-1 py-2.5 rounded font-mono text-xs font-bold transition ${
                          contestedValue === val
                            ? val > 0 ? 'bg-amber-500 text-black scale-110 shadow-lg' : val < 0 ? 'bg-red-500 text-black scale-110 shadow-lg' : 'bg-stone-300 text-black scale-110'
                            : val === 0 ? 'bg-stone-800 text-stone-300' : val > 0 ? 'bg-amber-950/60 text-amber-400' : 'bg-red-950/60 text-red-400'
                        }`}
                      >
                        {val > 0 ? `+${val}` : val}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <button
                      onClick={() => {
                        const next = Math.min(5, contestedValue + 1);
                        setContestedValue(next);
                        addSimLog(`Won combat: Shifted marker +1 toward your side (Current: ${next})`);
                      }}
                      className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                    >
                      +1 Win Combat
                    </button>
                    <button
                      onClick={() => {
                        const next = Math.max(-5, contestedValue - 1);
                        setContestedValue(next);
                        addSimLog(`Lost Champion: Shifted marker -1 toward opponent (Current: ${next})`);
                      }}
                      className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                    >
                      -1 Lost Champion
                    </button>
                    <button
                      onClick={() => {
                        const next = Math.min(5, contestedValue + 1);
                        setContestedValue(next);
                        addSimLog(`Controlled Spire Node: Shifted marker +1 (Current: ${next})`);
                      }}
                      className="p-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800"
                    >
                      +1 Spire Capture
                    </button>
                    <button
                      onClick={() => {
                        let next = contestedValue;
                        if (contestedValue > 0) next -= 1;
                        else if (contestedValue < 0) next += 1;
                        setContestedValue(next);
                        addSimLog(`Round End: Natural gravitational pull toward Center 0 applied (${contestedValue} -> ${next}).`);
                      }}
                      className="p-2 rounded bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-800"
                    >
                      End Round (Gravitate to 0)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Live Simulation Event Logs */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block flex items-center gap-1.5">
                <Activity size={14} />
                <span>Simulation Event Stream (Real-Time Verification)</span>
              </span>
              <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-[11px] text-stone-400 bg-stone-900 p-2 rounded-lg border border-stone-850">
                {simLogs.map((log, idx) => (
                  <div key={idx} className={idx === 0 ? 'text-amber-200 font-bold' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SIGNATURE MECHANICS SANDBOX ================= */}
      {activeTab === 'mechanics-sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Mechanic Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2 bg-stone-900/90 p-4 rounded-2xl border border-stone-800">
            <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold block">
              Signature Mechanics Bench
            </span>
            {MECHANIC_PROTOTYPES.map(mech => (
              <button
                key={mech.id}
                onClick={() => setActiveMechanicId(mech.id)}
                className={`w-full text-left p-3 rounded-xl transition flex flex-col gap-1 border ${
                  activeMechanicId === mech.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-cinzel font-bold text-xs text-amber-200">{mech.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400">
                    {mech.associatedDomain}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 line-clamp-2">{mech.coreThesis}</span>
              </button>
            ))}
          </div>

          {/* Interactive Mechanic Execution Bench (8 cols) */}
          <div className="lg:col-span-8 bg-stone-900/90 p-6 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase">Live Mechanic Bench</span>
                <h3 className="text-xl font-cinzel font-bold text-amber-100">{activeMechanic.name}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-700 text-stone-300 font-mono text-xs">
                Domain: {activeMechanic.associatedDomain}
              </span>
            </div>

            {/* 1. Preparation Mechanic Tester */}
            {activeMechanic.id === 'mech-preparation' && (
              <div className="p-5 rounded-2xl bg-stone-950 border border-orange-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-cinzel font-bold text-sm text-orange-300">
                      Pyraxis Hearth-Knight (Base: 3 ATK / 4 DEF)
                    </h4>
                    <span className="text-xs font-mono text-stone-400">
                      Current Stance: {isPrepared ? 'PREPARED (+2 Armor & Taunt Active)' : 'STANDARD READY'}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-lg font-mono font-bold text-xs ${
                    isPrepared ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/30 animate-pulse' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {isPrepared ? `PREPARED (${prepCharges} EMBER CHARGES)` : 'NOT PREPARED'}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsPrepared(true);
                      setPrepCharges(prev => prev + 1);
                    }}
                    className="p-3 rounded-xl bg-orange-950/70 hover:bg-orange-900 border border-orange-600 text-orange-200 font-cinzel font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <span>Hold Attack (Enter Prepared Stance)</span>
                  </button>

                  <button
                    disabled={!isPrepared}
                    onClick={() => {
                      alert(`EXECUTION TRIGGERED! Cleaved target for ${3 + (prepCharges * 4)} damage with 100% Armor Penetration!`);
                      setIsPrepared(false);
                      setPrepCharges(0);
                    }}
                    className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <span>Execute Strike ({3 + (prepCharges * 4)} DMG Burst)</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. Predatory Adaptation Tester */}
            {activeMechanic.id === 'mech-adaptation' && (
              <div className="p-5 rounded-2xl bg-stone-950 border border-emerald-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-cinzel font-bold text-sm text-emerald-300">
                      Apex Stalker of Everwood (Base: 4 ATK / 4 DEF)
                    </h4>
                    <span className="text-xs font-mono text-stone-400">
                      Mutations Accumulated: {adaptedTraits.length} / 3 Max
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    {adaptedTraits.length === 3 ? 'APEX FORM (MAX MUTATED)' : 'EVOLVING'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {adaptedTraits.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 text-xs font-mono">
                      🧬 {t}
                    </span>
                  ))}
                  {adaptedTraits.length === 0 && (
                    <span className="text-xs text-stone-500 font-mono italic">No mutations yet. Trigger combat survival below.</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  <button
                    disabled={adaptedTraits.length >= 3}
                    onClick={() => setAdaptedTraits(prev => [...prev, 'Chitinous Carapace (+2 DEF / Armor 1)'])}
                    className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-emerald-900 text-emerald-300 text-xs font-mono disabled:opacity-40"
                  >
                    + Mutate Carapace
                  </button>
                  <button
                    disabled={adaptedTraits.length >= 3}
                    onClick={() => setAdaptedTraits(prev => [...prev, 'Venomous Fangs (Deathtouch / +1 ATK)'])}
                    className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-emerald-900 text-emerald-300 text-xs font-mono disabled:opacity-40"
                  >
                    + Mutate Fangs
                  </button>
                  <button
                    disabled={adaptedTraits.length >= 3}
                    onClick={() => setAdaptedTraits(prev => [...prev, 'Spore Sprinter (Flank Evasion / +1 SPD)'])}
                    className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-emerald-900 text-emerald-300 text-xs font-mono disabled:opacity-40"
                  >
                    + Mutate Sprinter
                  </button>
                </div>
              </div>
            )}

            {/* 3. Soulbinding & Construct Assembly Tester */}
            {activeMechanic.id === 'mech-preservation' && (
              <div className="p-5 rounded-2xl bg-stone-950 border border-purple-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-cinzel font-bold text-sm text-purple-300">
                      House Mordavar Reliquary (Soul Vat: {storedSouls}/5 Capacity)
                    </h4>
                    <span className="text-xs font-mono text-stone-400">
                      Target Construct: {constructAwakened ? 'AWAKENED TITAN (5 ATK / 7 DEF)' : 'DORMANT NECROSTEEL SHELL (0 ATK / 7 DEF)'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                    {storedSouls} SOUL TOKENS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    disabled={storedSouls >= 5}
                    onClick={() => setStoredSouls(prev => prev + 1)}
                    className="p-3 rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-600 text-purple-200 font-cinzel font-bold text-xs"
                  >
                    + Harvest Soul from Destroyed Mortal
                  </button>

                  <button
                    disabled={storedSouls < 2 || constructAwakened}
                    onClick={() => {
                      setStoredSouls(prev => prev - 2);
                      setConstructAwakened(true);
                    }}
                    className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs disabled:opacity-40"
                  >
                    Soulbind (Spend 2 Souls &rarr; Awaken Shell)
                  </button>
                </div>
              </div>
            )}

            {/* 4. Modular Assembly Tester */}
            {activeMechanic.id === 'mech-assembly' && (
              <div className="p-5 rounded-2xl bg-stone-950 border border-amber-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel font-bold text-sm text-amber-300">
                    Modular Clockwork Titan Construction Bench
                  </h4>
                  <span className="font-mono text-xs text-amber-400">
                    {coreAttached && weaponAttached ? 'TITAN FULLY ASSEMBLED (8 ATK / 8 DEF / GLOBAL RANGE)' : 'PARTIALLY ASSEMBLED'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-stone-900 border border-amber-500/50 text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase text-amber-400 block">Base Frame</span>
                    <span className="font-bold text-xs text-stone-100">Titan Chassis (0/8)</span>
                    <span className="text-[10px] text-emerald-400 font-mono block">✓ Locked</span>
                  </div>

                  <div className={`p-3 rounded-xl text-center space-y-1 border ${
                    coreAttached ? 'bg-stone-900 border-amber-500/50 text-stone-100' : 'bg-stone-950 border-stone-800 text-stone-500'
                  }`}>
                    <span className="text-[10px] font-mono uppercase text-amber-400 block">Core Socket</span>
                    <span className="font-bold text-xs">{coreAttached ? 'Arcane Reactor (+2 SPD)' : 'Empty Socket'}</span>
                    <button
                      onClick={() => setCoreAttached(prev => !prev)}
                      className="text-[10px] text-amber-300 underline font-mono block mt-1"
                    >
                      {coreAttached ? 'Detach' : '+ Attach Core'}
                    </button>
                  </div>

                  <div className={`p-3 rounded-xl text-center space-y-1 border ${
                    weaponAttached ? 'bg-stone-900 border-amber-500/50 text-stone-100' : 'bg-stone-950 border-stone-800 text-stone-500'
                  }`}>
                    <span className="text-[10px] font-mono uppercase text-amber-400 block">Weapon Socket</span>
                    <span className="font-bold text-xs">{weaponAttached ? 'Siege Cannon (+5 ATK)' : 'Empty Socket'}</span>
                    <button
                      onClick={() => setWeaponAttached(prev => !prev)}
                      className="text-[10px] text-amber-300 underline font-mono block mt-1"
                    >
                      {weaponAttached ? 'Detach' : '+ Attach Weapon'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Mental Duel Stance Tester */}
            {activeMechanic.id === 'mech-mental-duel' && (
              <div className="p-5 rounded-2xl bg-stone-950 border border-cyan-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel font-bold text-sm text-cyan-300">
                    Mental Duel Stance Clash Arena
                  </h4>
                  <span className="text-xs font-mono text-stone-400">
                    Strike ⚔️ beats Feint 🌀 | Feint 🌀 beats Guard 🛡️ | Guard 🛡️ beats Strike ⚔️
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => handleResolveDuel('Strike')}
                    className="p-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-center space-y-1 transition hover:scale-105 active:scale-95"
                  >
                    <span className="text-2xl block">⚔️</span>
                    <span className="font-cinzel font-bold text-xs text-amber-300 block">Strike Stance</span>
                    <span className="text-[10px] text-stone-400 block">+3 Crit vs Feint</span>
                  </button>

                  <button
                    onClick={() => handleResolveDuel('Guard')}
                    className="p-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-center space-y-1 transition hover:scale-105 active:scale-95"
                  >
                    <span className="text-2xl block">🛡️</span>
                    <span className="font-cinzel font-bold text-xs text-amber-300 block">Parrying Guard</span>
                    <span className="text-[10px] text-stone-400 block">Reflects vs Strike</span>
                  </button>

                  <button
                    onClick={() => handleResolveDuel('Feint')}
                    className="p-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-center space-y-1 transition hover:scale-105 active:scale-95"
                  >
                    <span className="text-2xl block">🌀</span>
                    <span className="font-cinzel font-bold text-xs text-amber-300 block">Arcane Feint</span>
                    <span className="text-[10px] text-stone-400 block">Bypasses Guard</span>
                  </button>
                </div>

                {duelResult && (
                  <div className="p-4 rounded-xl bg-stone-900 border border-cyan-500/50 space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>You Picked: <strong>{playerStance}</strong></span>
                      <span>Opponent Picked: <strong>{aiStance}</strong></span>
                    </div>
                    <p className="text-sm font-bold text-cyan-200 font-cinzel">{duelResult}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 4: INVERTED DOMAIN PHILOSOPHIES ================= */}
      {activeTab === 'domain-philosophies' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACTION_PHILOSOPHIES.map(fac => (
              <div
                key={fac.domain}
                className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 hover:border-amber-500/70 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel font-black text-base text-amber-200">
                      {fac.domain}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {fac.philosophy}
                  </p>

                  <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 space-y-1 text-[11px] font-sans">
                    <div><strong className="text-amber-400">Desire:</strong> {fac.desire}</div>
                    <div><strong className="text-amber-400">Method:</strong> {fac.method}</div>
                  </div>

                  {/* Verbs */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {fac.signatureVerbs.map(v => (
                      <span key={v} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/30">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-800 text-[11px] font-sans">
                  <div>
                    <span className="text-emerald-400 font-bold block">Strengths:</span>
                    <span className="text-stone-300">{fac.strengths.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-red-400 font-bold block">Weaknesses:</span>
                    <span className="text-stone-300">{fac.weaknesses.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 5: CROSS-DOMAIN SYNERGIES & RED-TEAM ================= */}
      {activeTab === 'synergies-matrix' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CROSS_DOMAIN_SYNERGIES.map(syn => (
              <div
                key={syn.pair}
                className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel font-bold text-base text-amber-200">
                    {syn.pair}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    syn.riskSeverity.includes('Severe') ? 'bg-red-950 text-red-400 border border-red-500/40' :
                    'bg-amber-950 text-amber-300 border border-amber-500/40'
                  }`}>
                    {syn.riskSeverity}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {syn.synergyThesis}
                </p>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                  <span className="font-cinzel font-bold text-amber-400 block">
                    Emergent Archetype: {syn.emergentArchetype}
                  </span>
                  <p className="text-[11px] text-stone-400 font-mono">
                    Mechanic Collision: {syn.mechanicCollision}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/60 text-xs text-red-300 space-y-1 font-mono">
                  <span className="font-bold text-red-400 block flex items-center gap-1.5">
                    <ShieldAlert size={14} />
                    <span>Red-Team Security Audit Warning</span>
                  </span>
                  <p className="text-[11px]">{syn.redTeamWarning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 6: 10-MATCHUP COUNTERPLAY MATRIX ================= */}
      {activeTab === 'counterplay-matrix' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COUNTERPLAY_MATRIX.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <div className="font-cinzel font-bold text-sm text-stone-200">
                    {m.domainA} <span className="text-amber-400">vs</span> {m.domainB}
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] border border-amber-500/30">
                    {m.matchupRatio}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {m.tacticalTension}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <div>
                    <span className="text-amber-400 font-bold block">Key Tools (A):</span>
                    <span className="text-stone-300">{m.domainAKeyTools.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-bold block">Key Tools (B):</span>
                    <span className="text-stone-300">{m.domainBKeyTools.join(', ')}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-950 text-xs text-stone-300 border border-stone-800 space-y-1">
                  <span className="font-cinzel font-bold text-amber-400 block text-[11px]">
                    Master Strategic Counterplay Advice:
                  </span>
                  <p className="text-[11px] text-stone-400">{m.counterplayAdvice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 7: ORIGINAL CONCEPTS AUDIT ================= */}
      {activeTab === 'concept-audit' && (
        <div className="space-y-6">
          {/* Executive Audit Header & Clash Resolution Principles */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-950 via-neutral-900 to-stone-950 border-2 border-amber-500/40 shadow-2xl space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase tracking-wider">
                  <Scale size={16} />
                  <span>Comprehensive Rules & Mechanics Audit</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-cinzel font-black text-amber-100 mt-1">
                  Document Systems Audit & Legacy Clash Reconciliations
                </h2>
                <p className="text-xs text-stone-300 max-w-3xl mt-1 leading-relaxed">
                  Rigorous evaluation of historical design documents against the <strong>Realm of Nexus TCG Engine</strong>. 
                  Below are the mechanics we keep, modify, merge, or reject, with clear explanations of why legacy card game systems clash with Nexus and how our architecture fixes them.
                </p>
              </div>

              {/* Quick Stat Badges */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-300">
                  Total Audited: <strong className="text-amber-400">{CONCEPTS_AUDIT.length}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  Kept/Canon: <strong>{CONCEPTS_AUDIT.filter(a => a.classification === 'KEEP').length}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300">
                  Modified/Adapted: <strong>{CONCEPTS_AUDIT.filter(a => a.classification === 'MODIFY').length}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300">
                  Rejected: <strong>{CONCEPTS_AUDIT.filter(a => a.classification === 'REJECT').length}</strong>
                </span>
              </div>
            </div>

            {/* Core Architectural Clashes & Nexus Fixes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/20 space-y-2">
                <span className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-400" />
                  1. Spatial Lanes vs Monolithic Boards
                </span>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  <strong className="text-stone-200">The Clash:</strong> Legacy documents assumed untargeted boards where any creature attacks any target.
                </p>
                <p className="text-[11px] text-emerald-400/90 leading-relaxed">
                  <strong className="text-emerald-300">The Fix:</strong> Nexus operates on 7 tactical lanes (Center, Flanks, Backline Shrines, Throne). Converted cards now specify Vanguard, Flank, or Support lane roles.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/20 space-y-2">
                <span className="text-xs font-cinzel font-bold text-sky-300 flex items-center gap-1.5">
                  <Zap size={14} className="text-sky-400" />
                  2. Colored Mana vs Essence & Momentum
                </span>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  <strong className="text-stone-200">The Clash:</strong> Legacy cards used colored mana (`2U`, `3R`), inducing mana screw and passive curve-outs.
                </p>
                <p className="text-[11px] text-emerald-400/90 leading-relaxed">
                  <strong className="text-emerald-300">The Fix:</strong> All 30 Tempest cards use universal Essence (1-10) plus the Momentum dice track (1-6) for dynamic fast reactions and kinetic reserves.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/20 space-y-2">
                <span className="text-xs font-cinzel font-bold text-purple-300 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-purple-400" />
                  3. Hard Counters & Infinite Loops
                </span>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  <strong className="text-stone-200">The Clash:</strong> Hard counterspells and 0-cost sacrifice loops break player agency and violate GLO-14 Red-Team safety.
                </p>
                <p className="text-[11px] text-emerald-400/90 leading-relaxed">
                  <strong className="text-emerald-300">The Fix:</strong> Replaced with Momentum Taxes, Speed Clashes, Echo spell copies, and finite bounded Soul Vats.
                </p>
              </div>
            </div>

            {/* Filter Pills & Search Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-stone-800">
              <div className="flex flex-wrap items-center gap-1.5">
                {(['ALL', 'KEEP', 'MODIFY', 'MERGE', 'REJECT', 'PROTOTYPE'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setAuditFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold transition-all ${
                      auditFilter === f
                        ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search audited concepts, domains..."
                  value={auditSearchQuery}
                  onChange={e => setAuditSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-stone-900 border border-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Audit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONCEPTS_AUDIT
              .filter(aud => {
                if (auditFilter !== 'ALL' && aud.classification !== auditFilter) return false;
                if (!auditSearchQuery.trim()) return true;
                const q = auditSearchQuery.toLowerCase();
                return (
                  aud.originalConcept.toLowerCase().includes(q) ||
                  aud.originalDomain.toLowerCase().includes(q) ||
                  aud.reasoning.toLowerCase().includes(q) ||
                  aud.evolutionToNexus.toLowerCase().includes(q)
                );
              })
              .map(aud => (
                <div
                  key={aud.id}
                  className="p-5 rounded-3xl bg-stone-900/90 border border-amber-500/30 space-y-3.5 shadow-xl hover:border-amber-500/60 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-cinzel font-bold text-sm text-amber-200 leading-snug">
                        {aud.originalConcept}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold shrink-0 ${
                        aud.classification === 'KEEP' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' :
                        aud.classification === 'MODIFY' ? 'bg-blue-950 text-blue-400 border border-blue-500/50' :
                        aud.classification === 'MERGE' ? 'bg-purple-950 text-purple-400 border border-purple-500/50' :
                        aud.classification === 'REJECT' ? 'bg-red-950 text-red-400 border border-red-500/50' :
                        'bg-amber-950 text-amber-400 border border-amber-500/50'
                      }`}>
                        {aud.classification}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
                      <span className="text-amber-500/80">Source Domain:</span>
                      <span className="text-stone-300 font-semibold">{aud.originalDomain}</span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed pt-1">
                      {aud.reasoning}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-950 border border-emerald-500/30 text-xs space-y-1.5 mt-2">
                    <div className="flex items-center gap-1.5 font-cinzel font-bold text-emerald-400">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      <span>Nexus Evolution & Active Fix:</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                      {aud.evolutionToNexus}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
