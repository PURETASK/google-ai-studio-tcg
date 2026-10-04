import React, { useState } from 'react';
import { 
  FOUNDATIONAL_COUNCIL_AGENTS, 
  INITIAL_SIMULATOR_STATE, 
  TurnPhaseSimulatorState 
} from '../../data/foundationalCouncilData';
import { FoundationalCouncilAgentSpec } from '../../types';
import { 
  Cpu, 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  Sliders, 
  Flame, 
  Zap, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  GitBranch, 
  Lock, 
  Sparkles, 
  Clock, 
  Activity, 
  Compass, 
  Target, 
  Swords 
} from 'lucide-react';

export const FoundationalCouncilView: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<'GLO-01' | 'GLO-02' | 'GLO-03' | 'GLO-04' | 'GLO-05' | 'GLO-06'>('GLO-01');
  const [simState, setSimState] = useState<TurnPhaseSimulatorState>(INITIAL_SIMULATOR_STATE);
  
  // Interactive GLO-02 Grammar Compiler State
  const [compilerInput, setCompilerInput] = useState('When this unit attacks, pay 1 Essence to deal 2 damage to opposing unit.');
  const [compiledResult, setCompiledResult] = useState<{
    trigger: string;
    cost: string;
    target: string;
    effect: string;
    valid: boolean;
  }>({
    trigger: 'When this unit declares an attack in its designated lane',
    cost: 'Pay 1 Essence from active pool',
    target: 'Target opposing enemy unit in the same combat lane',
    effect: 'Deal 2 unpreventable direct damage',
    valid: true
  });

  // Interactive GLO-03 Stack State
  const [stackItems, setStackItems] = useState<string[]>([
    'Spell: [Radiance] Solar Purge (LIFO Top)',
    'Fast Reaction: [Tempest] Gale Ward',
    'Trigger: [Abyss] Soul Harvest (Bottom)'
  ]);

  // Interactive GLO-04 Essence Slider
  const [simTurn, setSimTurn] = useState<number>(4);
  const [momentumPoints, setMomentumPoints] = useState<number>(18);

  // Interactive GLO-06 Hazard State
  const [hazardStage, setHazardStage] = useState<'Telegraph' | 'Active Strike' | 'Lingering Aura' | 'Dissipated'>('Telegraph');
  const [hazardTier, setHazardTier] = useState<1 | 2 | 3>(2);

  const activeAgent: FoundationalCouncilAgentSpec = 
    FOUNDATIONAL_COUNCIL_AGENTS.find(a => a.agentId === selectedAgentId) || FOUNDATIONAL_COUNCIL_AGENTS[0];

  // Simulator controls
  const handleNextPhase = () => {
    setSimState(prev => {
      let nextPhase = prev.currentPhase + 1;
      let nextRound = prev.roundNumber;
      let newLog = [...prev.combatLog];

      if (nextPhase > 5) {
        nextPhase = 1;
        nextRound += 1;
        newLog.push(`--- Advanced to Round ${nextRound} ---`);
        newLog.push(`Wake Phase: Refreshed Essence to ${Math.min(nextRound, 10)}/${Math.min(nextRound, 10)}.`);
      } else if (nextPhase === 2) {
        newLog.push(`Main Phase 1: Player 1 has primary priority.`);
      } else if (nextPhase === 3) {
        newLog.push(`Lane Combat Phase: Resolving Left -> Center -> Right lanes.`);
      } else if (nextPhase === 4) {
        newLog.push(`Main Phase 2: Post-combat deployment.`);
      } else if (nextPhase === 5) {
        newLog.push(`End Phase: Hazard stack check and hand discard cleanup.`);
      }

      return {
        ...prev,
        currentPhase: nextPhase,
        roundNumber: nextRound,
        player1Essence: Math.min(nextRound, 10),
        player1MaxEssence: Math.min(nextRound, 10),
        combatLog: newLog.slice(-8)
      };
    });
  };

  const handleResetSim = () => {
    setSimState(INITIAL_SIMULATOR_STATE);
  };

  const handleCompileGrammar = () => {
    setCompiledResult({
      trigger: 'Trigger: ' + (compilerInput.includes('When') ? 'When declared as attacker' : 'Passive static check'),
      cost: 'Cost: 1 Essence',
      target: 'Target: Opposing unit in identical combat lane',
      effect: 'Effect: Apply 2 kinetic damage to target HP',
      valid: true
    });
  };

  const handlePushStack = (newItem: string) => {
    setStackItems(prev => [newItem, ...prev]);
  };

  const handlePopStack = () => {
    if (stackItems.length === 0) return;
    setStackItems(prev => prev.slice(1));
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Header Banner: Stage B Foundational Council */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40 flex items-center gap-1.5">
                <Cpu size={13} />
                Global TCG Council: Stage B
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                <Lock size={10} />
                6 Foundational Architects Active
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                GLO-01 .. GLO-06
              </span>
            </div>

            <h3 className="font-cinzel text-2xl text-amber-100 font-bold mt-2">
              Foundational Council & Core Rules Engine
            </h3>
            <p className="text-stone-300 text-xs mt-1 max-w-3xl leading-relaxed">
              Constructs and executes the 6 fundamental pillars of Realm of Nexus: Turn loops, formal Rules Bible grammar, LIFO priority stack, Essence/Momentum curves, 3-lane battlefield geometry, and living world-state hazards.
            </p>
          </div>

          {/* Agent Selection Grid */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {FOUNDATIONAL_COUNCIL_AGENTS.map((agent) => (
              <button
                key={agent.agentId}
                onClick={() => setSelectedAgentId(agent.agentId)}
                className={`px-3 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  selectedAgentId === agent.agentId
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{agent.agentId}</span>
                <span>{agent.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Foundational Agent Card Header */}
      <div className="p-6 rounded-2xl bg-stone-900/95 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              {activeAgent.agentId}
            </span>
            <span className="text-xs font-mono text-stone-400">
              {activeAgent.subtitle}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
              {activeAgent.status}
            </span>
          </div>
          <h4 className="font-cinzel text-xl font-bold text-stone-100">
            {activeAgent.name}
          </h4>
          <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
            {activeAgent.role}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 shrink-0 bg-stone-950 p-3 rounded-xl border border-stone-800 text-center">
          {activeAgent.keyMetrics.map((metric, i) => (
            <div key={i} className="px-2">
              <div className="text-[10px] font-mono uppercase text-stone-400">{metric.label}</div>
              <div className="text-xs font-mono font-bold text-amber-300 mt-0.5">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CORE SPEC & INTERACTIVE WORKBENCH PER AGENT */}
      
      {/* 1. GLO-01: GAME SYSTEMS ARCHITECT */}
      {selectedAgentId === 'GLO-01' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Core Axioms & Rules */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                <Lock size={14} className="text-amber-400" />
                Immutable System Axioms
              </h5>
              <div className="space-y-2">
                {activeAgent.coreAxioms.map((axiom, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80 text-xs text-stone-300 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{axiom}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-widest text-cyan-300 font-bold flex items-center gap-2">
                <ShieldCheck size={14} className="text-cyan-400" />
                Codified Game Rules (Chapter 100)
              </h5>
              <div className="space-y-3">
                {activeAgent.rules.map((rule) => (
                  <div key={rule.ruleNumber} className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber-400 font-bold">Rule {rule.ruleNumber}: {rule.title}</span>
                      <span className="text-stone-500">Precedence L{rule.precedenceLevel}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{rule.formalText}</p>
                    {rule.edgeCaseNote && (
                      <p className="text-[11px] text-amber-300/80 pt-1 italic">Notice: {rule.edgeCaseNote}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive 5-Phase Turn Loop Simulator */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-cinzel text-sm text-amber-100 font-bold flex items-center gap-2">
                    <Activity size={16} className="text-amber-400" />
                    Turn Loop & Phase Engine Simulator
                  </h5>
                  <p className="text-[11px] text-stone-400">
                    Step through the 5 Canonical Turn Phases defined by GLO-01.
                  </p>
                </div>
                <button
                  onClick={handleResetSim}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </div>

              {/* 5 Phase Progress Indicator */}
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { num: 1, name: '1. Wake & Draw' },
                  { num: 2, name: '2. Main 1' },
                  { num: 3, name: '3. Lane Combat' },
                  { num: 4, name: '4. Main 2' },
                  { num: 5, name: '5. End Phase' }
                ].map((phase) => (
                  <div 
                    key={phase.num}
                    className={`p-2 rounded-xl text-center font-mono text-[10px] transition-all border ${
                      simState.currentPhase === phase.num
                        ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.4)]'
                        : simState.currentPhase > phase.num
                        ? 'bg-stone-800 text-stone-300 border-stone-700'
                        : 'bg-stone-950 text-stone-600 border-stone-800'
                    }`}
                  >
                    {phase.name}
                  </div>
                ))}
              </div>

              {/* Current Board & Player Stats */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Player 1 (Active)</div>
                  <div className="text-xs text-stone-300">Nexus Core HP: <strong className="text-emerald-400">{simState.player1CoreHp} / 30</strong></div>
                  <div className="text-xs text-stone-300">Essence Pool: <strong className="text-amber-400">{simState.player1Essence} / {simState.player1MaxEssence}</strong></div>
                  <div className="text-xs text-stone-300">Hand Cards: <strong className="text-stone-100">{simState.player1HandCount}</strong></div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-red-400 font-bold">Player 2 (Opponent)</div>
                  <div className="text-xs text-stone-300">Nexus Core HP: <strong className="text-emerald-400">{simState.player2CoreHp} / 30</strong></div>
                  <div className="text-xs text-stone-300">Essence Pool: <strong className="text-amber-400">{simState.player2Essence} / {simState.player2MaxEssence}</strong></div>
                  <div className="text-xs text-stone-300">Hand Cards: <strong className="text-stone-100">{simState.player2HandCount}</strong></div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleNextPhase}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all"
              >
                <Play size={14} />
                <span>Advance Phase (Currently: Phase {simState.currentPhase} • Round {simState.roundNumber})</span>
              </button>

              {/* Live Combat & Resolution Log */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-500 font-bold block">
                  GLO-01 Engine Activity Feed
                </span>
                <div className="space-y-1 font-mono text-[11px] text-stone-400 max-h-36 overflow-y-auto">
                  {simState.combatLog.map((log, idx) => (
                    <div key={idx} className="text-cyan-300/90">• {log}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. GLO-02: RULES BIBLE ARCHITECT */}
      {selectedAgentId === 'GLO-02' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                <Lock size={14} className="text-amber-400" />
                Rule Precedence Hierarchy
              </h5>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                  <strong className="text-amber-400">Level 1 (Golden Rule):</strong> Explicit Card Restriction ("Cannot") &gt; Permissive Card Text ("May").
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300">
                  <strong className="text-cyan-400">Level 2 (Keyword Canon):</strong> Codified keyword rules in Section 200 supersede general phrasing.
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300">
                  <strong className="text-stone-400">Level 3 (Chapter Law):</strong> Rules Bible chapter definitions.
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300">
                  <strong className="text-stone-400">Level 4 (System Fallback):</strong> Default engine action.
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-widest text-cyan-300 font-bold flex items-center gap-2">
                <ShieldCheck size={14} className="text-cyan-400" />
                Rules Bible Formal Grammar Laws
              </h5>
              <div className="space-y-3">
                {activeAgent.rules.map((rule) => (
                  <div key={rule.ruleNumber} className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber-400 font-bold">Rule {rule.ruleNumber}: {rule.title}</span>
                      <span className="text-stone-500">Precedence L{rule.precedenceLevel}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{rule.formalText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Formal Grammar Compiler */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-cyan-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-sm text-cyan-100 font-bold flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan-400" />
                  GLO-02 Formal Grammar Compiler
                </h5>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Syntax Standardizer
                </span>
              </div>

              <p className="text-xs text-stone-300">
                Transforms colloquial card text proposals into strict 4-clause Rules Bible syntax:
                <br />
                <code className="text-cyan-300 font-mono text-[11px]">[Trigger] -&gt; [Cost] -&gt; [Target] -&gt; [Effect]</code>
              </p>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-stone-400 font-bold">
                  Raw Informal Card Text:
                </label>
                <textarea
                  value={compilerInput}
                  onChange={(e) => setCompilerInput(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 font-mono focus:border-cyan-400 focus:outline-none"
                />
                <button
                  onClick={handleCompileGrammar}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cinzel font-bold text-xs flex items-center gap-2"
                >
                  <Sparkles size={13} />
                  <span>Codify into Rules Bible Grammar</span>
                </button>
              </div>

              {/* Compiled 4-Part Output */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  Compiled Canonical Rules Format
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="p-2 rounded bg-stone-900 text-amber-300 border border-stone-800">
                    {compiledResult.trigger}
                  </div>
                  <div className="p-2 rounded bg-stone-900 text-cyan-300 border border-stone-800">
                    {compiledResult.cost}
                  </div>
                  <div className="p-2 rounded bg-stone-900 text-purple-300 border border-stone-800">
                    {compiledResult.target}
                  </div>
                  <div className="p-2 rounded bg-stone-900 text-emerald-300 border border-stone-800">
                    {compiledResult.effect}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. GLO-03: PRIORITY TIMING & STACK ARCHITECT */}
      {selectedAgentId === 'GLO-03' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                <Lock size={14} className="text-amber-400" />
                Stack & SBA Timing Laws
              </h5>
              <div className="space-y-3">
                {activeAgent.rules.map((rule) => (
                  <div key={rule.ruleNumber} className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber-400 font-bold">Rule {rule.ruleNumber}: {rule.title}</span>
                      <span className="text-stone-500">Precedence L{rule.precedenceLevel}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{rule.formalText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive LIFO Stack Engine */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-purple-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-cinzel text-sm text-purple-100 font-bold flex items-center gap-2">
                    <Layers size={16} className="text-purple-400" />
                    Interactive LIFO Priority Stack Simulator
                  </h5>
                  <p className="text-[11px] text-stone-400">
                    Last-In First-Out execution with APNAP trigger resolution.
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {stackItems.length} Items on Stack
                </span>
              </div>

              {/* Stack Visualizer */}
              <div className="space-y-2 p-3 rounded-xl bg-stone-950 border border-stone-800 min-h-[160px] flex flex-col justify-end">
                {stackItems.length === 0 ? (
                  <div className="text-center text-xs text-stone-500 font-mono py-8">
                    Stack is empty. Game state advances.
                  </div>
                ) : (
                  stackItems.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl font-mono text-xs flex items-center justify-between border ${
                        idx === 0
                          ? 'bg-purple-500/20 text-purple-200 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                          : 'bg-stone-900 text-stone-400 border-stone-800'
                      }`}
                    >
                      <span>{item}</span>
                      {idx === 0 && <span className="text-[10px] uppercase text-purple-300 font-bold">Resolves Next</span>}
                    </div>
                  ))
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePopStack}
                  disabled={stackItems.length === 0}
                  className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-40 text-black font-cinzel font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Play size={13} />
                  <span>Resolve Top of Stack (LIFO)</span>
                </button>
                <button
                  onClick={() => handlePushStack(`Fast Action: Counterspell #${Date.now().toString().slice(-3)}`)}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-purple-300 font-cinzel font-bold text-xs"
                >
                  + Add Fast Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. GLO-04: RESOURCE CURVES & MOMENTUM ARCHITECT */}
      {selectedAgentId === 'GLO-04' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                <Lock size={14} className="text-amber-400" />
                Essence & Momentum Curves
              </h5>
              <div className="space-y-3">
                {activeAgent.rules.map((rule) => (
                  <div key={rule.ruleNumber} className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber-400 font-bold">Rule {rule.ruleNumber}: {rule.title}</span>
                      <span className="text-stone-500">Precedence L{rule.precedenceLevel}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{rule.formalText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive Essence & Momentum Calculator */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-sm text-amber-100 font-bold flex items-center gap-2">
                  <Zap size={16} className="text-amber-400" />
                  Essence & Momentum Mathematical Modeler
                </h5>
                <span className="text-xs font-mono text-amber-300">
                  Turn {simTurn} / 10
                </span>
              </div>

              {/* Turn Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-stone-300">
                  <span>Match Progression Round:</span>
                  <strong className="text-amber-400">Round {simTurn}</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={simTurn}
                  onChange={(e) => setSimTurn(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Dynamic Essence Gems Visualizer */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Active Essence Pool:</span>
                  <span className="text-amber-300 font-bold">{simTurn} / 10 Max Gems</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        i < simTurn
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-[0_0_10px_rgba(234,179,8,0.4)]'
                          : 'bg-stone-900 text-stone-600 border border-stone-800'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Momentum Thresholds */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Momentum Energy:</span>
                  <span className="text-cyan-300 font-bold">{momentumPoints} / 30</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  value={momentumPoints}
                  onChange={(e) => setMomentumPoints(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />

                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono text-center">
                  <div className={`p-2 rounded border ${momentumPoints >= 10 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-stone-900 text-stone-600 border-stone-800'}`}>
                    Tier 1 (10 M): Surge
                  </div>
                  <div className={`p-2 rounded border ${momentumPoints >= 20 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-stone-900 text-stone-600 border-stone-800'}`}>
                    Tier 2 (20 M): Sigil Art
                  </div>
                  <div className={`p-2 rounded border ${momentumPoints >= 30 ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-stone-900 text-stone-600 border-stone-800'}`}>
                    Tier 3 (30 M): Overload
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. GLO-05: SPATIAL LANES & BATTLEFIELD ARCHITECT */}
      {selectedAgentId === 'GLO-05' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                <Lock size={14} className="text-amber-400" />
                3-Lane Spatial Layout Laws
              </h5>
              <div className="space-y-3">
                {activeAgent.rules.map((rule) => (
                  <div key={rule.ruleNumber} className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber-400 font-bold">Rule {rule.ruleNumber}: {rule.title}</span>
                      <span className="text-stone-500">Precedence L{rule.precedenceLevel}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{rule.formalText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 3-Lane Battlefield Visualizer */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-emerald-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-sm text-emerald-100 font-bold flex items-center gap-2">
                  <Swords size={16} className="text-emerald-400" />
                  3-Lane Battlefield Spatial Geometry
                </h5>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Left • Center • Right
                </span>
              </div>

              {/* 3 Lane Layout */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {/* Left Lane */}
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                    Left Flank
                  </span>
                  <div className="h-16 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-xs text-stone-400 font-mono">
                    2 / 2 Units
                  </div>
                  <span className="text-[10px] text-stone-500 block">Resolves 1st in Combat</span>
                </div>

                {/* Center Vanguard */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                    Center Vanguard
                  </span>
                  <div className="h-16 rounded-lg bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center text-xs text-emerald-300 font-mono">
                    Adjacent to Both Flanks
                  </div>
                  <span className="text-[10px] text-emerald-400 block">Resolves 2nd in Combat</span>
                </div>

                {/* Right Lane */}
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                    Right Flank
                  </span>
                  <div className="h-16 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-xs text-stone-400 font-mono">
                    1 / 2 Units
                  </div>
                  <span className="text-[10px] text-stone-500 block">Resolves 3rd in Combat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. GLO-06: LIVING HAZARDS & WORLD-STATE ARCHITECT */}
      {selectedAgentId === 'GLO-06' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h5 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                <Lock size={14} className="text-amber-400" />
                Living Hazard Lifecycle Laws
              </h5>
              <div className="space-y-3">
                {activeAgent.rules.map((rule) => (
                  <div key={rule.ruleNumber} className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber-400 font-bold">Rule {rule.ruleNumber}: {rule.title}</span>
                      <span className="text-stone-500">Precedence L{rule.precedenceLevel}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{rule.formalText}</p>
                    {rule.edgeCaseNote && (
                      <p className="text-[11px] text-amber-300/80 pt-1 italic">Notice: {rule.edgeCaseNote}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Living Hazard Lifecycle Simulator */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-red-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-cinzel text-sm text-red-100 font-bold flex items-center gap-2">
                    <Flame size={16} className="text-red-400" />
                    Interactive Hazard Lifecycle Engine
                  </h5>
                  <p className="text-[11px] text-stone-400">
                    Enforces Rule 600.2: 1-Round Mandatory Telegraph Law.
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((t) => (
                    <button
                      key={t}
                      onClick={() => setHazardTier(t as 1 | 2 | 3)}
                      className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                        hazardTier === t
                          ? 'bg-red-500 text-black'
                          : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                      }`}
                    >
                      Tier {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4-Step Hazard Lifecycle */}
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'Telegraph', title: '1. Telegraph' },
                  { id: 'Active Strike', title: '2. Detonation' },
                  { id: 'Lingering Aura', title: '3. Lingering' },
                  { id: 'Dissipated', title: '4. Dissipate' }
                ].map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setHazardStage(step.id as any)}
                    className={`p-2 rounded-xl text-center font-mono text-[10px] transition-all border ${
                      hazardStage === step.id
                        ? 'bg-red-500 text-black font-bold border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:bg-stone-900'
                    }`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>

              {/* Current Hazard Status Card */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 font-bold uppercase">
                    Tier {hazardTier} Hazard: Volcanic Geyser (Center Lane)
                  </span>
                  <span className="text-stone-400">Current Phase: {hazardStage}</span>
                </div>

                <div className="text-xs text-stone-300 leading-relaxed">
                  {hazardStage === 'Telegraph' && (
                    <span className="text-amber-300">
                      ⚠️ <strong>Telegraph Warning Active:</strong> Center Vanguard will erupt at the end of Round 4 for 4 damage to all occupying units. Both players have 1 full round to reposition or brace.
                    </span>
                  )}
                  {hazardStage === 'Active Strike' && (
                    <span className="text-red-400">
                      💥 <strong>Hazard Detonation:</strong> 4 Fire damage dealt to all units in Center Vanguard. Trigger placed on End Phase Priority Stack.
                    </span>
                  )}
                  {hazardStage === 'Lingering Aura' && (
                    <span className="text-stone-300">
                      🌋 <strong>Lingering Terrain:</strong> Molten Crags active in Center Lane. Units entering lane take 1 burn damage.
                    </span>
                  )}
                  {hazardStage === 'Dissipated' && (
                    <span className="text-stone-500">
                      💨 <strong>Dissipated:</strong> Hazard cleared. Battlefield lane returns to neutral state.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
