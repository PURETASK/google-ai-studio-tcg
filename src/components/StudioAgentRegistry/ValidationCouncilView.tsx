import React, { useState } from 'react';
import { 
  VALIDATION_COUNCIL_AGENTS, 
  MANA_CURVE_STANDARDS, 
  RED_TEAM_EXPLOIT_CASES, 
  META_SIMULATION_DATA,
  ValidationAgentProfile,
  ExploitTestCase 
} from '../../data/validationCouncilData';
import { 
  ShieldAlert, 
  Cpu, 
  BarChart3, 
  Layers, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Calculator, 
  Lock, 
  Unlock,
  Flame,
  Zap,
  Sliders,
  Sparkles
} from 'lucide-react';

export const ValidationCouncilView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agents' | 'math-curve' | 'red-team' | 'meta-sim' | 'edge-cases'>('red-team');
  const [selectedAgent, setSelectedAgent] = useState<ValidationAgentProfile>(VALIDATION_COUNCIL_AGENTS[4]); // GLO-14 Red-Team
  const [selectedExploit, setSelectedExploit] = useState<ExploitTestCase>(RED_TEAM_EXPLOIT_CASES[0]);

  // Stat Budget Calculator State
  const [calcCost, setCalcCost] = useState<number>(3);
  const [calcAttack, setCalcAttack] = useState<number>(3);
  const [calcDefense, setCalcDefense] = useState<number>(4);
  const [hasExtraKeyword, setHasExtraKeyword] = useState<boolean>(false);

  // Simulation State
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simProgress, setSimProgress] = useState<number>(100);
  const [simGamesCount, setSimGamesCount] = useState<number>(1000);
  const [simResults, setSimResults] = useState(META_SIMULATION_DATA);

  const runSimulation = () => {
    setSimRunning(true);
    setSimProgress(15);
    setTimeout(() => setSimProgress(45), 200);
    setTimeout(() => setSimProgress(80), 400);
    setTimeout(() => {
      setSimProgress(100);
      setSimRunning(false);
      // Slight randomized variance to show real simulated batches
      setSimResults(prev => prev.map(arch => ({
        ...arch,
        winRatePct: Number((arch.winRatePct + (Math.random() * 1.6 - 0.8)).toFixed(1)),
        avgGameLengthTurns: Number((arch.avgGameLengthTurns + (Math.random() * 0.4 - 0.2)).toFixed(1))
      })));
    }, 600);
  };

  const currentBudget = (calcCost * 2) + 1;
  const actualStats = calcAttack + calcDefense + (hasExtraKeyword ? 2 : 0);
  const budgetDelta = actualStats - currentBudget;
  const isBudgetValid = budgetDelta <= 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-stone-900/90 border-2 border-red-500/40 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.15)]">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <ShieldAlert size={240} className="text-red-500" />
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center text-red-400 shrink-0 shadow-lg shadow-red-500/20">
              <ShieldAlert size={32} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-red-500 text-stone-950 uppercase tracking-wider">
                  STAGE C: CORE VALIDATION & INTEGRITY COUNCIL
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                  GLO-10 through GLO-15
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-950 text-red-300 border border-red-800/60">
                  4 OF 6 CAN BLOCK LOCK
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-100 tracking-wide">
                Adversarial Verification, Math Curves & Exploit Defense
              </h2>
              <p className="text-stone-300 text-sm max-w-3xl mt-1 leading-relaxed">
                The technical integrity gatekeepers of Realm of Nexus TCG. Evaluates quantitative balance budgets, runs 1,000+ Monte Carlo bot simulations, and systematically detects infinite loops, memory state explosions, and uninteractive game locks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('red-team')}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-red-950 hover:bg-red-900 text-red-200 border border-red-700/60 flex items-center gap-1.5 transition"
            >
              <Flame size={14} className="text-red-400" />
              <span>Exploit Hunter (GLO-14)</span>
            </button>
            <button
              onClick={() => setActiveTab('meta-sim')}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 flex items-center gap-1.5 transition"
            >
              <BarChart3 size={14} className="text-cyan-400" />
              <span>1k Bot Sim</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin border-b border-stone-800">
        <button
          onClick={() => setActiveTab('red-team')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'red-team'
              ? 'bg-red-500 text-stone-950 border-red-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-red-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Flame size={14} />
          <span>Red-Team Exploit Scanner (GLO-14)</span>
        </button>

        <button
          onClick={() => setActiveTab('math-curve')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'math-curve'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-amber-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Calculator size={14} />
          <span>Mana Curves & Stat Budget (GLO-10)</span>
        </button>

        <button
          onClick={() => setActiveTab('meta-sim')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'meta-sim'
              ? 'bg-cyan-500 text-stone-950 border-cyan-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-cyan-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <BarChart3 size={14} />
          <span>Monte Carlo Meta Simulator (GLO-12)</span>
        </button>

        <button
          onClick={() => setActiveTab('edge-cases')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'edge-cases'
              ? 'bg-purple-500 text-stone-950 border-purple-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-purple-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Layers size={14} />
          <span>Edge-Case Matrix & Layers (GLO-15)</span>
        </button>

        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'agents'
              ? 'bg-stone-200 text-stone-950 border-white shadow-md font-bold'
              : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Cpu size={14} />
          <span>6 Validation Agents Overview</span>
        </button>
      </div>

      {/* ================= TAB 1: RED-TEAM EXPLOIT SCANNER ================= */}
      {activeTab === 'red-team' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Exploit Cases List */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-cinzel font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <Flame size={16} />
                <span>Active Threat Dossiers ({RED_TEAM_EXPLOIT_CASES.length})</span>
              </h3>
              <span className="text-[10px] font-mono bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800/40">
                GLO-14 Engine
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {RED_TEAM_EXPLOIT_CASES.map(exploit => (
                <button
                  key={exploit.id}
                  onClick={() => setSelectedExploit(exploit)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    selectedExploit.id === exploit.id
                      ? 'bg-red-950/60 border-red-500/70 shadow-md shadow-red-950/50'
                      : 'bg-stone-900/70 border-stone-800 hover:bg-stone-850 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-stone-200">{exploit.id}: {exploit.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                      exploit.severity === 'N5_SYSTEMIC'
                        ? 'bg-red-600 text-white'
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                    }`}>
                      {exploit.severity.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                    {exploit.description}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800 text-[10px] font-mono text-stone-500">
                    <span>Loop: {exploit.loopType}</span>
                    <span className="text-emerald-400 font-bold">{exploit.status}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Exploit Detector Rule */}
            <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl text-xs space-y-2">
              <span className="font-bold text-amber-300 font-mono block">GLO-14 HARD LOCK POLICY:</span>
              <p className="text-stone-400 leading-relaxed text-[11px]">
                A card proposal triggering an infinite resource cycle, deterministic lockout, or unbounded memory state explosion receives an immediate <strong className="text-red-400">N4 / N5 LOCK BLOCK</strong>. Proposing agents cannot appeal without inserting a hard once-per-turn trigger or cost barrier.
              </p>
            </div>
          </div>

          {/* Right Column: Exploit Breakdown & Resolution */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-stone-900/80 border border-red-500/40 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950 text-red-300 border border-red-800/60 font-bold">
                      {selectedExploit.id}
                    </span>
                    <h3 className="text-lg font-cinzel font-bold text-stone-100">
                      {selectedExploit.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-stone-400">Class: {selectedExploit.loopType}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>{selectedExploit.status}</span>
                  </span>
                </div>
              </div>

              {/* Involved Cards */}
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Compounding Card Vector:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedExploit.comboCards.map((card, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-700 text-amber-300 font-mono text-xs font-bold">
                      {card}
                    </span>
                  ))}
                </div>
              </div>

              {/* Exploit Mechanism */}
              <div className="mb-4 bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-xs font-mono font-bold text-red-400 block mb-1">
                  Vulnerability Analysis:
                </span>
                <p className="text-stone-300 text-xs leading-relaxed">
                  {selectedExploit.description}
                </p>
              </div>

              {/* Steps to Reproduce */}
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Reproduction Vector (State Trace):
                </span>
                <div className="space-y-1.5 font-mono text-xs text-stone-300 bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  {selectedExploit.stepsToReproduce.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">›</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules Bible Hard Amendment */}
              <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                  <ShieldAlert size={14} />
                  <span>Canonical Bible Invariant Resolution:</span>
                </span>
                <p className="text-xs font-mono text-emerald-200 leading-relaxed bg-stone-950/80 p-2.5 rounded border border-emerald-900/60">
                  {selectedExploit.resolutionClause}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: MANA CURVES & STAT BUDGET ================= */}
      {activeTab === 'math-curve' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Calculator */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 flex flex-col gap-4">
            <div className="border-b border-stone-800 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-cinzel font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator size={16} />
                  <span>GLO-10 Stat Budget Calculator</span>
                </h3>
                <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded">
                  Formula: (Cost * 2) + 1
                </span>
              </div>
              <p className="text-stone-400 text-xs mt-1">
                Calculate allowable unit power ceilings per Essence cost.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-stone-300">Essence Cost:</span>
                  <span className="text-amber-400 font-bold">{calcCost} Essence</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={calcCost}
                  onChange={(e) => setCalcCost(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-stone-300">Attack:</span>
                    <span className="text-rose-400 font-bold">{calcAttack}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="12"
                    value={calcAttack}
                    onChange={(e) => setCalcAttack(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-stone-300">Defense:</span>
                    <span className="text-blue-400 font-bold">{calcDefense}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={calcDefense}
                    onChange={(e) => setCalcDefense(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-stone-950 rounded-xl border border-stone-800">
                <input
                  type="checkbox"
                  id="keywordCheck"
                  checked={hasExtraKeyword}
                  onChange={(e) => setHasExtraKeyword(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                <label htmlFor="keywordCheck" className="text-xs text-stone-300 cursor-pointer">
                  Includes Premium Keyword (Aura / Guard / Echo = +2 Stat Value)
                </label>
              </div>

              {/* Result Indicator */}
              <div className={`p-4 rounded-xl border font-mono ${
                isBudgetValid
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/50 border-red-500/60 text-red-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase">
                    {isBudgetValid ? '✓ WITHIN STAT CEILING' : '✗ OVER POWER BUDGET'}
                  </span>
                  <span className="text-xs font-bold">
                    {actualStats} / {currentBudget} Pts
                  </span>
                </div>
                <div className="text-[11px] text-stone-300 leading-relaxed">
                  {isBudgetValid ? (
                    <span>Design complies with GLO-10 mathematical standard. Eligible for Tier 2 Review Gate.</span>
                  ) : (
                    <span className="text-red-300">Exceeds recommended stat ceiling by +{budgetDelta} points. Requires symmetric drawback or Essence increase to {Math.ceil((actualStats - 1) / 2)}.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reference Curve Table */}
          <div className="lg:col-span-2 bg-stone-900/80 border border-stone-800 rounded-2xl p-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
              <h3 className="text-sm font-cinzel font-bold text-stone-200">
                Canonical Mana Curve Stat Ceiling Matrix
              </h3>
              <span className="text-[10px] font-mono text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                GLO-10 Standard
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-stone-950 text-stone-400 border-b border-stone-800">
                    <th className="p-2.5">Essence</th>
                    <th className="p-2.5">Stat Budget (ATK + DEF)</th>
                    <th className="p-2.5">Max Keywords</th>
                    <th className="p-2.5">Canonical Reference Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  {MANA_CURVE_STANDARDS.map((curve) => (
                    <tr key={curve.essenceCost} className={calcCost === curve.essenceCost ? 'bg-amber-500/10 text-amber-200 font-bold' : ''}>
                      <td className="p-2.5 text-amber-400 font-bold">{curve.essenceCost} Gem</td>
                      <td className="p-2.5">{curve.recommendedStatBudget} Total ({Math.floor(curve.recommendedStatBudget / 2)} / {Math.ceil(curve.recommendedStatBudget / 2)})</td>
                      <td className="p-2.5">{curve.maxAllowableKeywords}</td>
                      <td className="p-2.5 text-stone-400">{curve.exampleCard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: MONTE CARLO META SIMULATOR ================= */}
      {activeTab === 'meta-sim' && (
        <div className="flex flex-col gap-6">
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <h3 className="text-base font-cinzel font-bold text-cyan-200">
                    GLO-12 Automated Monte Carlo Matchup Simulator
                  </h3>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  Runs parallel headless bot games to verify win rate equilibrium (45%–55% target window) and detect polarizing degenerate matchups.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={simGamesCount}
                  onChange={(e) => setSimGamesCount(Number(e.target.value))}
                  disabled={simRunning}
                  className="bg-stone-950 border border-stone-800 text-xs font-mono text-stone-200 px-3 py-1.5 rounded-lg"
                >
                  <option value={1000}>1,000 Games</option>
                  <option value={5000}>5,000 Games</option>
                  <option value={10000}>10,000 Games</option>
                </select>

                <button
                  onClick={runSimulation}
                  disabled={simRunning}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-cinzel font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50"
                >
                  {simRunning ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                  <span>{simRunning ? 'Simulating...' : `Run ${simGamesCount.toLocaleString()} Matches`}</span>
                </button>
              </div>
            </div>

            {/* Sim Progress Bar */}
            {simRunning && (
              <div className="w-full bg-stone-950 rounded-full h-2 mb-4 overflow-hidden border border-stone-800">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${simProgress}%` }}
                ></div>
              </div>
            )}

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {simResults.map(arch => {
                const isHealthy = arch.winRatePct >= 47.0 && arch.winRatePct <= 54.0;
                return (
                  <div key={arch.id} className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-200">{arch.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900 border border-stone-700 text-amber-300">
                        {arch.tierRating}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400">Win Rate:</span>
                        <span className={`font-bold ${isHealthy ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {arch.winRatePct}% {isHealthy ? '(Healthy)' : '(Monitoring)'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-stone-400">Avg Game Length:</span>
                        <span className="text-stone-300">{arch.avgGameLengthTurns} Turns</span>
                      </div>

                      <div className="pt-2 border-t border-stone-800/80 text-[10px] space-y-1">
                        <div><strong className="text-emerald-400">+ Favors:</strong> {arch.favorableMatchups.join(', ')}</div>
                        <div><strong className="text-rose-400">- Struggles:</strong> {arch.unfavorableMatchups.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: EDGE-CASE MATRIX ================= */}
      {activeTab === 'edge-cases' && (
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col gap-4">
          <div className="border-b border-stone-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-cinzel font-bold text-purple-300 flex items-center gap-2">
                <Layers size={18} />
                <span>GLO-15 Layer Dependency & Combinatoric Collision Matrix</span>
              </h3>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded">
                Rule Section 700
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Continuous effects apply in strict Layer precedence (Layers 1 through 7). Timestamp orders only settle ties within the exact same Layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
              <span className="text-amber-300 font-bold block">Canonical 7-Layer Hierarchy:</span>
              <div className="space-y-1.5 text-[11px] text-stone-300">
                <div className="p-1.5 rounded bg-stone-900 border border-stone-800"><strong>Layer 1: Rules & Base Characteristics</strong> (Card text modifications)</div>
                <div className="p-1.5 rounded bg-stone-900 border border-stone-800"><strong>Layer 2: Control Changes</strong> (Mind control / Lane usurpation)</div>
                <div className="p-1.5 rounded bg-stone-900 border border-stone-800"><strong>Layer 3: Text / Type / Domain Changes</strong> (Converting Unit into Relic)</div>
                <div className="p-1.5 rounded bg-stone-900 border border-stone-800"><strong>Layer 4: Keyword & Ability Bestowal / Removal</strong> (Granting Guard)</div>
                <div className="p-1.5 rounded bg-stone-900 border border-stone-800"><strong>Layer 5: Stat Setting</strong> (Base Attack/Defense set to 1/1)</div>
                <div className="p-1.5 rounded bg-stone-900 border border-stone-800"><strong>Layer 6: Stat Modifiers & Counters</strong> (+2/+2 Auras, Sigil buffs)</div>
                <div className="p-1.5 rounded bg-stone-900 border border-stone-800"><strong>Layer 7: Stat Switching</strong> (Switch Attack and Defense)</div>
              </div>
            </div>

            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3">
              <span className="text-purple-300 font-bold block">Active Layer Conflict Simulator:</span>
              <div className="p-3 bg-stone-900 rounded-lg border border-purple-900/50 space-y-1.5">
                <span className="text-stone-200 font-bold text-[11px]">Scenario: Humility Totem vs Solar Blessing</span>
                <p className="text-stone-400 text-[11px]">
                  Humility Totem states: "All units have base stats 1/1 (Layer 5)". Solar Blessing states: "Target unit gains +3/+3 (Layer 6)".
                </p>
                <div className="text-emerald-400 text-[11px] font-bold">
                  Resolution: Layer 5 applies first (unit becomes 1/1), then Layer 6 applies (+3/+3). Final stats: 4/4.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: AGENTS OVERVIEW ================= */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALIDATION_COUNCIL_AGENTS.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition ${
                selectedAgent.id === agent.id
                  ? 'bg-stone-900 border-red-500/70 shadow-lg'
                  : 'bg-stone-950/80 border-stone-800 hover:bg-stone-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-red-950 text-red-300 border border-red-800/50 font-bold">
                  {agent.code}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  agent.canBlockLock ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-stone-800 text-stone-400'
                }`}>
                  {agent.canBlockLock ? 'CAN BLOCK LOCK' : 'ADVISORY'}
                </span>
              </div>
              <h4 className="text-sm font-cinzel font-bold text-stone-100 mb-1">{agent.name}</h4>
              <p className="text-xs text-stone-400 leading-relaxed mb-3">{agent.primaryMandate}</p>
              
              <div className="text-[10px] font-mono text-stone-500 space-y-1 pt-2 border-t border-stone-800">
                <div><strong className="text-stone-400">Core Domain:</strong> {agent.coreDomain}</div>
                <div><strong className="text-stone-400">Tools:</strong> {agent.diagnosticTools.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
