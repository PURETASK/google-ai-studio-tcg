import React, { useState } from 'react';
import { 
  DOMAIN_DIRECTORATES, 
  INTER_DOMAIN_PAIRINGS, 
  DomainDirectorate,
  InterDomainPairing 
} from '../../data/domainDirectoratesData';
import { 
  Sun, 
  Trees, 
  Skull, 
  Hourglass, 
  ShieldCheck, 
  Swords, 
  Sparkles, 
  GitMerge, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Compass, 
  Flame,
  Zap,
  Bookmark
} from 'lucide-react';

export const DomainDirectoratesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directorates' | 'matchup-matrix' | 'hybrid-synthesizer'>('directorates');
  const [selectedDomainKey, setSelectedDomainKey] = useState<'Radiant' | 'Verdant' | 'Abyssal' | 'Temporal' | 'Sanctum'>('Radiant');
  const [selectedPair, setSelectedPair] = useState<InterDomainPairing>(INTER_DOMAIN_PAIRINGS[0]);

  const currentDirectorate = DOMAIN_DIRECTORATES.find(d => d.domainKey === selectedDomainKey) || DOMAIN_DIRECTORATES[0];

  const getDomainIcon = (domain: string, size = 16) => {
    switch (domain) {
      case 'Radiant': return <Sun size={size} className="text-amber-400" />;
      case 'Verdant': return <Trees size={size} className="text-emerald-400" />;
      case 'Abyssal': return <Skull size={size} className="text-purple-400" />;
      case 'Temporal': return <Hourglass size={size} className="text-cyan-400" />;
      case 'Sanctum': return <ShieldCheck size={size} className="text-indigo-400" />;
      default: return <Sparkles size={size} className="text-stone-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-stone-900/90 border-2 border-amber-500/40 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Swords size={240} className="text-amber-400" />
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-300 shrink-0 shadow-lg shadow-amber-500/20">
              <Swords size={32} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500 text-stone-950 uppercase tracking-wider">
                  STAGE F: FIVE DOMAIN DIRECTORATES & MATCHUP MATRIX
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                  56 Domain Agents + 10 Matchup Teams
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  COMPLETE ECOSYSTEM
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-100 tracking-wide">
                Domain Architecture, Faction Pillars & Inter-Domain Synthesis
              </h2>
              <p className="text-stone-300 text-sm max-w-3xl mt-1 leading-relaxed">
                The 5 sovereign realm directorates governing Radiant, Verdant, Abyssal, Temporal, and Sanctum factions. Includes 35 core sub-agents, 21 on-demand specialists, and the complete 10-pair Inter-Domain Matchup & Hybrid Splash matrix.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('matchup-matrix')}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-700/60 flex items-center gap-1.5 transition"
            >
              <GitMerge size={14} className="text-amber-400" />
              <span>10 Pairings Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin border-b border-stone-800">
        <button
          onClick={() => setActiveTab('directorates')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'directorates'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-amber-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Compass size={14} />
          <span>The Five Domain Directorates (56 Agents)</span>
        </button>

        <button
          onClick={() => setActiveTab('matchup-matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'matchup-matrix'
              ? 'bg-cyan-500 text-stone-950 border-cyan-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-cyan-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Swords size={14} />
          <span>10 Inter-Domain Matchup Teams</span>
        </button>

        <button
          onClick={() => setActiveTab('hybrid-synthesizer')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'hybrid-synthesizer'
              ? 'bg-purple-500 text-stone-950 border-purple-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-purple-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <GitMerge size={14} />
          <span>Hybrid Splash Deck Synthesizer</span>
        </button>
      </div>

      {/* ================= TAB 1: THE FIVE DOMAIN DIRECTORATES ================= */}
      {activeTab === 'directorates' && (
        <div className="flex flex-col gap-6">
          {/* Domain Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {DOMAIN_DIRECTORATES.map(d => (
              <button
                key={d.domainKey}
                onClick={() => setSelectedDomainKey(d.domainKey)}
                className={`px-4 py-2 rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border ${
                  selectedDomainKey === d.domainKey
                    ? 'bg-stone-950 text-stone-100 border-amber-400 shadow-lg'
                    : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:bg-stone-800'
                }`}
              >
                {getDomainIcon(d.domainKey)}
                <span>{d.domainKey} Directorate</span>
              </button>
            ))}
          </div>

          {/* Directorate Profile Card */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                    {getDomainIcon(currentDirectorate.domainKey, 20)}
                  </span>
                  <div>
                    <h3 className="text-xl font-cinzel font-bold text-stone-100">{currentDirectorate.domainKey} Domain Directorate</h3>
                    <span className="text-xs font-mono text-amber-400">Director: {currentDirectorate.directorCode} ({currentDirectorate.directorName})</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                  7 Core Sub-Agents
                </span>
                <span className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                  {currentDirectorate.specialists.length} On-Demand Specialists
                </span>
              </div>
            </div>

            {/* Philosophy & Mechanics Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-300 block">Philosophical Pillar:</span>
                <p className="text-xs text-stone-300 leading-relaxed font-mono">
                  {currentDirectorate.philosophicalPillar}
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-300 block">Mechanical Identities:</span>
                <ul className="text-xs text-stone-300 space-y-1 font-mono">
                  {currentDirectorate.mechanicalIdentities.map((mech, i) => (
                    <li key={i}>• {mech}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-rose-400 block">Forbidden Mechanics (Out-of-Color):</span>
                <ul className="text-xs text-stone-400 space-y-1 font-mono">
                  {currentDirectorate.forbiddenMechanics.map((forb, i) => (
                    <li key={i}>✗ {forb}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Sub-Agents (7) */}
            <div className="space-y-3">
              <span className="text-xs font-cinzel font-bold text-stone-300 uppercase tracking-wider block">
                The 7 Core Sub-Agents of {currentDirectorate.domainKey}:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentDirectorate.coreAgents.map(agent => (
                  <div key={agent.code} className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/90 font-mono text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-amber-400">{agent.code}</span>
                      <span className="text-[10px] text-stone-500">Core Sub-Agent</span>
                    </div>
                    <div className="font-bold text-stone-200 mb-1">{agent.name}</div>
                    <div className="text-stone-400 text-[11px]">Focus: {agent.focus}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* On-Demand Specialists */}
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <span className="text-xs font-cinzel font-bold text-stone-400 uppercase tracking-wider block">
                On-Demand Domain Specialists ({currentDirectorate.specialists.length}):
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {currentDirectorate.specialists.map(spec => (
                  <div key={spec.code} className="bg-stone-950/70 p-3 rounded-lg border border-stone-800 font-mono text-xs">
                    <div className="font-bold text-cyan-300 text-[11px] mb-0.5">{spec.code}: {spec.name}</div>
                    <div className="text-stone-400 text-[10px]">Scope: {spec.focus}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: 10 MATCHUP TEAMS MATRIX ================= */}
      {activeTab === 'matchup-matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: 10 Pairings */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-cinzel font-bold text-cyan-300 uppercase tracking-wider mb-1 block">
              10 Canonical Inter-Domain Pairings:
            </span>

            {INTER_DOMAIN_PAIRINGS.map(pairing => (
              <button
                key={pairing.pairId}
                onClick={() => setSelectedPair(pairing)}
                className={`p-3.5 rounded-xl border text-left transition ${
                  selectedPair.pairId === pairing.pairId
                    ? 'bg-cyan-950/60 border-cyan-500/70 shadow-md'
                    : 'bg-stone-950 border-stone-800 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {getDomainIcon(pairing.domains[0], 14)}
                    <span className="text-xs font-mono text-stone-400">×</span>
                    {getDomainIcon(pairing.domains[1], 14)}
                    <span className="text-xs font-cinzel font-bold text-stone-200 ml-1">{pairing.pairName.split('(')[0]}</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">{pairing.pairId}</span>
                </div>
                <div className="text-[11px] text-stone-400 line-clamp-1">{pairing.matchupDynamics}</div>
              </button>
            ))}
          </div>

          {/* Right Column: Matchup & Friction Deep-Dive */}
          <div className="lg:col-span-2 bg-stone-900/80 border border-cyan-500/40 rounded-2xl p-6 flex flex-col gap-5">
            <div className="border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-1">
                  {getDomainIcon(selectedPair.domains[0], 18)}
                  {getDomainIcon(selectedPair.domains[1], 18)}
                </span>
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-stone-100">{selectedPair.pairName}</h3>
                  <span className="text-xs font-mono text-cyan-400">Matchup Code: {selectedPair.pairId}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-300 block">Matchup Friction & Polarities:</span>
                <p className="text-xs text-stone-200 leading-relaxed font-mono">
                  {selectedPair.matchupDynamics}
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-cyan-300 block">Competitive Advantage Assessment:</span>
                <p className="text-xs text-stone-200 leading-relaxed font-mono">
                  {selectedPair.favoredDomain}
                </p>
              </div>

              <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/40 space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <GitMerge size={14} />
                  <span>Hybrid Splash Deck Synergy:</span>
                </span>
                <div className="text-xs font-mono text-emerald-200 space-y-1">
                  <div><strong>Archetype:</strong> {selectedPair.hybridSplashArchetype}</div>
                  <div><strong>Synthesis:</strong> {selectedPair.hybridMechanicSynthesis}</div>
                  <div><strong>Exemplar Deck:</strong> <span className="text-amber-300 font-bold">{selectedPair.sampleDeckTitle}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: HYBRID SPLASH SYNTHESIZER ================= */}
      {activeTab === 'hybrid-synthesizer' && (
        <div className="bg-stone-900/80 border border-purple-500/40 rounded-2xl p-6 flex flex-col gap-5">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-cinzel font-bold text-purple-300 flex items-center gap-2">
              <GitMerge size={18} />
              <span>Multi-Domain Hybrid Splash Deck Rule Engine</span>
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Standard format allows decks to splash up to 2 domains with a 60/40 card ratio. Hybrid synergies emerge from compounding keyword intersections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTER_DOMAIN_PAIRINGS.slice(0, 6).map(pair => (
              <div key={pair.pairId} className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 font-cinzel">{pair.sampleDeckTitle}</span>
                  <span className="text-[10px] text-stone-500">{pair.domains.join(' + ')}</span>
                </div>
                <p className="text-stone-300 text-[11px] leading-relaxed">{pair.hybridMechanicSynthesis}</p>
                <div className="text-[10px] text-emerald-400 pt-2 border-t border-stone-800">
                  <strong>Archetype Focus:</strong> {pair.hybridSplashArchetype}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
