import React, { useState, useEffect } from 'react';
import { Domain } from '../../types';
import { soundEngine } from '../../utils/audioEngine';
import { 
  Activity, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Flame, 
  Compass, 
  Scale, 
  RefreshCw, 
  Play, 
  FileText, 
  Sliders, 
  Eye, 
  Layers,
  ArrowRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';

interface AgentTaskLog {
  id: string;
  cardName: string;
  thumbnail?: string;
  timestamp: string;
  durationMs: number;
  domainPrediction: {
    domain: Domain;
    confidence: number;
    runnerUpDomain?: Domain;
    runnerUpConfidence?: number;
  };
  statPrediction: {
    cost: number;
    costConfidence: number;
    power: number;
    powerConfidence: number;
    defense: number;
    defenseConfidence: number;
    divineRank: number;
    statEfficiency: number;
  };
  abilitiesSynthesized: number;
  exploitClearance: 'PASS' | 'FLAGGED';
  agentConsensusScore: number;
}

const SAMPLE_RECENT_TASKS: AgentTaskLog[] = [
  {
    id: 'TSK-9901',
    cardName: 'Solaris Dawnbringer',
    timestamp: '2 mins ago',
    durationMs: 1140,
    domainPrediction: {
      domain: 'Radiance',
      confidence: 96.5,
      runnerUpDomain: 'Sanctuary',
      runnerUpConfidence: 3.2
    },
    statPrediction: {
      cost: 6,
      costConfidence: 94.0,
      power: 8,
      powerConfidence: 97.5,
      defense: 6,
      defenseConfidence: 91.8,
      divineRank: 4,
      statEfficiency: 98.2
    },
    abilitiesSynthesized: 2,
    exploitClearance: 'PASS',
    agentConsensusScore: 97.1
  },
  {
    id: 'TSK-9902',
    cardName: 'Ancient Sylvan Colossus',
    timestamp: '8 mins ago',
    durationMs: 1220,
    domainPrediction: {
      domain: 'Verdance',
      confidence: 98.2,
      runnerUpDomain: 'Sanctuary',
      runnerUpConfidence: 1.5
    },
    statPrediction: {
      cost: 7,
      costConfidence: 96.2,
      power: 9,
      powerConfidence: 95.0,
      defense: 10,
      defenseConfidence: 96.8,
      divineRank: 5,
      statEfficiency: 97.5
    },
    abilitiesSynthesized: 3,
    exploitClearance: 'PASS',
    agentConsensusScore: 98.4
  },
  {
    id: 'TSK-9903',
    cardName: 'Chrono Rift Stalker',
    timestamp: '15 mins ago',
    durationMs: 980,
    domainPrediction: {
      domain: 'Arcane',
      confidence: 94.8,
      runnerUpDomain: 'Abyss',
      runnerUpConfidence: 4.1
    },
    statPrediction: {
      cost: 4,
      costConfidence: 91.5,
      power: 5,
      powerConfidence: 93.0,
      defense: 4,
      defenseConfidence: 89.2,
      divineRank: 3,
      statEfficiency: 95.0
    },
    abilitiesSynthesized: 2,
    exploitClearance: 'PASS',
    agentConsensusScore: 94.6
  },
  {
    id: 'TSK-9904',
    cardName: 'Void Reaver Scythe',
    timestamp: '28 mins ago',
    durationMs: 1090,
    domainPrediction: {
      domain: 'Abyss',
      confidence: 99.0,
      runnerUpDomain: 'Arcane',
      runnerUpConfidence: 0.8
    },
    statPrediction: {
      cost: 5,
      costConfidence: 95.4,
      power: 7,
      powerConfidence: 98.0,
      defense: 3,
      defenseConfidence: 92.5,
      divineRank: 4,
      statEfficiency: 96.8
    },
    abilitiesSynthesized: 2,
    exploitClearance: 'PASS',
    agentConsensusScore: 98.2
  },
  {
    id: 'TSK-9905',
    cardName: 'Aegis of the Sunlit Choir',
    timestamp: '42 mins ago',
    durationMs: 1310,
    domainPrediction: {
      domain: 'Sanctuary',
      confidence: 97.4,
      runnerUpDomain: 'Radiance',
      runnerUpConfidence: 2.1
    },
    statPrediction: {
      cost: 5,
      costConfidence: 93.8,
      power: 3,
      powerConfidence: 91.0,
      defense: 9,
      defenseConfidence: 97.5,
      divineRank: 4,
      statEfficiency: 99.1
    },
    abilitiesSynthesized: 2,
    exploitClearance: 'PASS',
    agentConsensusScore: 97.8
  }
];

const PROBE_PRESETS = [
  {
    name: 'Infernal Sunforged Blade',
    desc: 'Molten plasma greatsword with solar flare aura and obsidian hilt.',
    expectedDomain: 'Radiance' as Domain,
    suggestedStats: { cost: 5, power: 8, defense: 4 }
  },
  {
    name: 'Elder Primal Treant',
    desc: 'Deep forest titan wrapped in moss, blooming vines, and primordial earth magic.',
    expectedDomain: 'Verdance' as Domain,
    suggestedStats: { cost: 7, power: 8, defense: 11 }
  },
  {
    name: 'Cosmic Chrono Singularity',
    desc: 'Sapphire astral vortex bending time strands with orbiting indigo runes.',
    expectedDomain: 'Arcane' as Domain,
    suggestedStats: { cost: 6, power: 6, defense: 7 }
  },
  {
    name: 'Grave Monarch Phylactery',
    desc: 'Necrotic dark obsidian urn surrounded by purple souls and bone skulls.',
    expectedDomain: 'Abyss' as Domain,
    suggestedStats: { cost: 4, power: 4, defense: 6 }
  }
];

export const AgentVisionTaskDashboard: React.FC = () => {
  const [taskHistory, setTaskHistory] = useState<AgentTaskLog[]>(SAMPLE_RECENT_TASKS);
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const [isSimulatingProbe, setIsSimulatingProbe] = useState(false);
  const [probeStage, setProbeStage] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<AgentTaskLog>(SAMPLE_RECENT_TASKS[0]);

  const activePreset = PROBE_PRESETS[activePresetIdx];

  const handleRunProbe = () => {
    setIsSimulatingProbe(true);
    setProbeStage(1);
    soundEngine.playMicroSound('select');

    const timers = [
      setTimeout(() => {
        setProbeStage(2);
        soundEngine.playMicroSound('click');
      }, 400),
      setTimeout(() => {
        setProbeStage(3);
        soundEngine.playMicroSound('click');
      }, 800),
      setTimeout(() => {
        setProbeStage(4);
        soundEngine.playMicroSound('click');
      }, 1200),
      setTimeout(() => {
        setProbeStage(5);
        soundEngine.playCombatClash('victory');

        // Append new live task to history
        const newTask: AgentTaskLog = {
          id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
          cardName: activePreset.name,
          timestamp: 'Just now',
          durationMs: 1120 + Math.floor(Math.random() * 150),
          domainPrediction: {
            domain: activePreset.expectedDomain,
            confidence: Number((95 + Math.random() * 4).toFixed(1)),
            runnerUpDomain: activePreset.expectedDomain === 'Radiance' ? 'Sanctuary' : 'Arcane',
            runnerUpConfidence: Number((2 + Math.random() * 2).toFixed(1))
          },
          statPrediction: {
            cost: activePreset.suggestedStats.cost,
            costConfidence: Number((92 + Math.random() * 6).toFixed(1)),
            power: activePreset.suggestedStats.power,
            powerConfidence: Number((94 + Math.random() * 5).toFixed(1)),
            defense: activePreset.suggestedStats.defense,
            defenseConfidence: Number((91 + Math.random() * 6).toFixed(1)),
            divineRank: Math.min(5, Math.max(2, Math.round(activePreset.suggestedStats.cost * 0.6))),
            statEfficiency: Number((96 + Math.random() * 3).toFixed(1))
          },
          abilitiesSynthesized: 2,
          exploitClearance: 'PASS',
          agentConsensusScore: Number((96 + Math.random() * 3).toFixed(1))
        };

        setTaskHistory(prev => [newTask, ...prev.slice(0, 7)]);
        setSelectedTask(newTask);
        setIsSimulatingProbe(false);
      }, 1600)
    ];

    return () => timers.forEach(t => clearTimeout(t));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Multi-Agent Telemetry Metrics */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border-2 border-amber-500/40 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                PIPELINE ONLINE (5 AGENTS SYNCHRONIZED)
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                Live Analysis Telemetry
              </span>
            </div>
            <h3 className="font-cinzel font-black text-xl sm:text-2xl text-amber-100">
              Agent Vision Analysis Status & Confidence Dashboard
            </h3>
            <p className="text-xs text-stone-400 max-w-3xl leading-relaxed">
              Real-time feedback on multi-agent image review tasks. Tracks specialized neural deliberations from the Domain Arbiter, Combat Stat Architect, Ability Synthesizer, Lorekeeper, and Exploit Verifier.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRunProbe}
              disabled={isSimulatingProbe}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isSimulatingProbe ? (
                <RefreshCw size={14} className="animate-spin text-black" />
              ) : (
                <Play size={14} />
              )}
              <span>{isSimulatingProbe ? 'Deliberating...' : 'Trigger Multi-Agent Probe'}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Telemetry Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
            <span className="text-[10px] font-cinzel uppercase text-stone-400 block">
              Avg Domain Confidence
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-emerald-400">96.8%</span>
              <span className="text-[10px] font-mono text-emerald-500">▲ +1.2%</span>
            </div>
            <span className="text-[10px] text-stone-500 block">GLO-06 Domain Arbiter</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
            <span className="text-[10px] font-cinzel uppercase text-stone-400 block">
              Stat Curve Cohesion
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-amber-300">97.4%</span>
              <span className="text-[10px] font-mono text-amber-400">5-Axis Validated</span>
            </div>
            <span className="text-[10px] text-stone-500 block">GLO-05 Stat Architect</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
            <span className="text-[10px] font-cinzel uppercase text-stone-400 block">
              Average Analysis Latency
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-cyan-400">1.14s</span>
              <span className="text-[10px] font-mono text-stone-400">Resilient</span>
            </div>
            <span className="text-[10px] text-stone-500 block">Parallel Sub-agents</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
            <span className="text-[10px] font-cinzel uppercase text-stone-400 block">
              Exploit Clearance Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-purple-400">100%</span>
              <span className="text-[10px] font-mono text-purple-300">0 Infinite Loops</span>
            </div>
            <span className="text-[10px] text-stone-500 block">VAL-02 Safety Arbiter</span>
          </div>
        </div>
      </div>

      {/* Interactive Probe Runner Section */}
      <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-amber-400" />
            <h4 className="font-cinzel font-bold text-sm text-stone-200">
              Interactive Image Analysis Probe
            </h4>
          </div>
          <span className="text-[11px] font-mono text-stone-400">
            Select a target visual concept to simulate live multi-agent deliberation
          </span>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PROBE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActivePresetIdx(idx);
                soundEngine.playMicroSound('select');
              }}
              className={`p-3 rounded-2xl border text-left space-y-1 transition ${
                activePresetIdx === idx
                  ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md'
                  : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <strong className="text-xs font-cinzel text-stone-200 block truncate">
                  {p.name}
                </strong>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-amber-300 border border-stone-800 shrink-0">
                  {p.expectedDomain}
                </span>
              </div>
              <p className="text-[10px] text-stone-400 line-clamp-2">
                {p.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Real-Time Agent Deliberation Stage Stepper */}
        {isSimulatingProbe && (
          <div className="p-4 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-3">
            <span className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-2">
              <RefreshCw size={14} className="animate-spin text-amber-400" />
              <span>Multi-Agent Deliberation in Progress (Phase {probeStage}/5)...</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
              {[
                { stage: 1, name: 'GLO-06 Domain Arbiter', action: 'Analyzing Chroma...' },
                { stage: 2, name: 'GLO-05 Stat Architect', action: 'Computing 5-Axis Curve...' },
                { stage: 3, name: 'GLO-04 Trait Synthesizer', action: 'Extracting Keywords...' },
                { stage: 4, name: 'GLO-14 Lorekeeper', action: 'Canon Verification...' },
                { stage: 5, name: 'VAL-02 Exploit Arbiter', action: 'Red-Team Loop Check...' }
              ].map(s => {
                const isPassed = probeStage >= s.stage;
                const isCurrent = probeStage === s.stage;
                return (
                  <div 
                    key={s.stage}
                    className={`p-2 rounded-xl border text-[10px] transition ${
                      isCurrent 
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse'
                        : isPassed 
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-stone-950 border-stone-800 text-stone-600'
                    }`}
                  >
                    <strong className="block font-cinzel">{s.name}</strong>
                    <span className="block mt-0.5 font-mono text-[9px]">{s.action}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Task Inspection & Agent Confidence Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Detailed Agent-by-Agent Confidence Breakdown */}
        <div className="lg:col-span-7 space-y-4 bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-stone-400 uppercase">
                Active Inspection: {selectedTask.id}
              </span>
              <h4 className="font-cinzel font-black text-lg text-amber-200">
                {selectedTask.cardName}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                Consensus: {selectedTask.agentConsensusScore}%
              </span>
            </div>
          </div>

          {/* 1. GLO-06 Domain Prediction & Confidence */}
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold text-stone-200 flex items-center gap-1.5">
                <Compass size={14} className="text-amber-400" />
                <span>GLO-06 Domain Arbiter Prediction</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {selectedTask.domainPrediction.confidence}% Confidence
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <strong className="text-stone-100">Primary Domain: {selectedTask.domainPrediction.domain}</strong>
              </div>
              <span className="text-stone-400">
                Runner-up: {selectedTask.domainPrediction.runnerUpDomain} ({selectedTask.domainPrediction.runnerUpConfidence}%)
              </span>
            </div>

            <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400"
                style={{ width: `${selectedTask.domainPrediction.confidence}%` }}
              />
            </div>
          </div>

          {/* 2. GLO-05 Stat Curve Predictions & Confidence Gauges */}
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold text-stone-200 flex items-center gap-1.5">
                <Scale size={14} className="text-blue-400" />
                <span>GLO-05 Combat & Stat Architect Curve Predictions</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-300">
                Efficiency: {selectedTask.statPrediction.statEfficiency}%
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-mono">
              {/* Cost */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase block">Essence Cost</span>
                <strong className="text-amber-300 text-lg block">{selectedTask.statPrediction.cost}</strong>
                <span className="text-[10px] text-emerald-400 block">
                  {selectedTask.statPrediction.costConfidence}% Conf.
                </span>
              </div>

              {/* Power */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase block">Attack Power</span>
                <strong className="text-red-400 text-lg block">{selectedTask.statPrediction.power}</strong>
                <span className="text-[10px] text-emerald-400 block">
                  {selectedTask.statPrediction.powerConfidence}% Conf.
                </span>
              </div>

              {/* Defense */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase block">Defense / HP</span>
                <strong className="text-blue-400 text-lg block">{selectedTask.statPrediction.defense}</strong>
                <span className="text-[10px] text-emerald-400 block">
                  {selectedTask.statPrediction.defenseConfidence}% Conf.
                </span>
              </div>
            </div>
          </div>

          {/* 3. GLO-04 & VAL-02 Specialist Approvals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-cinzel uppercase text-stone-400 block">
                GLO-04 Trait Synthesizer
              </span>
              <strong className="text-stone-200 block">
                {selectedTask.abilitiesSynthesized} Tactical Traits Approved
              </strong>
              <p className="text-[10px] text-stone-400">
                Action cooldowns constrained to 1/Turn to ensure balanced pacing.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-cinzel uppercase text-stone-400 block">
                VAL-02 Exploit & Loop Arbiter
              </span>
              <strong className="text-emerald-400 block flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Exploit Clearance: {selectedTask.exploitClearance}</span>
              </strong>
              <p className="text-[10px] text-stone-400">
                Zero infinite recursion or degenerate lane lockout detected.
              </p>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Recent Tasks Stream & Audit Log */}
        <div className="lg:col-span-5 space-y-3 bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h4 className="font-cinzel font-bold text-sm text-stone-200 flex items-center gap-2">
              <Clock size={15} className="text-amber-400" />
              <span>Recent Vision Analysis Jobs</span>
            </h4>
            <span className="text-[10px] font-mono text-stone-400">
              {taskHistory.length} Jobs Logged
            </span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {taskHistory.map(task => {
              const isSelected = selectedTask.id === task.id;
              return (
                <div
                  key={task.id}
                  onClick={() => {
                    setSelectedTask(task);
                    soundEngine.playMicroSound('select');
                  }}
                  className={`p-3 rounded-2xl border text-xs cursor-pointer transition ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                      : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <strong className="font-cinzel text-xs text-stone-100 truncate">
                      {task.cardName}
                    </strong>
                    <span className="text-[9px] font-mono text-stone-500 shrink-0">
                      {task.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>
                      Domain: <strong className="text-amber-300">{task.domainPrediction.domain}</strong> ({task.domainPrediction.confidence}%)
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {task.statPrediction.cost}C / {task.statPrediction.power}P / {task.statPrediction.defense}D
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-stone-800/80 text-[10px] text-stone-500 font-mono">
                    <span>ID: {task.id}</span>
                    <span>Duration: {task.durationMs}ms</span>
                    <span className="text-emerald-400">Consensus: {task.agentConsensusScore}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
