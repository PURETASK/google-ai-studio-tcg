import React, { useState } from 'react';
import { 
  QUESTION_DIMENSIONS, 
  PRESET_INQUIRIES, 
  analyzeDesignInquiry 
} from '../../data/questionArchitectData';
import { 
  FullQuestionAnalysisResult, 
  QuestionDimension, 
  HiddenAssumption 
} from '../../types';
import { 
  Cpu, 
  Search, 
  Sparkles, 
  Layers, 
  GitBranch, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Sliders, 
  Send, 
  Clock, 
  RefreshCw, 
  Compass, 
  FileText, 
  Zap, 
  Lock, 
  Activity 
} from 'lucide-react';

export const QuestionArchitectView: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_INQUIRIES[0].inquiryId);
  const [customInput, setCustomInput] = useState<string>('');
  const [activeAnalysis, setActiveAnalysis] = useState<FullQuestionAnalysisResult>(PRESET_INQUIRIES[0]);
  const [activeTab, setActiveTab] = useState<'question-tree' | 'assumptions' | 'dependencies' | 'dimensions'>('question-tree');
  const [filterDimension, setFilterDimension] = useState<QuestionDimension | 'All'>('All');

  const handleSelectPreset = (preset: FullQuestionAnalysisResult) => {
    setSelectedPresetId(preset.inquiryId);
    setActiveAnalysis(preset);
  };

  const handleRunAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const result = analyzeDesignInquiry(customInput.trim());
    setSelectedPresetId('custom');
    setActiveAnalysis(result);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Header Banner: Stage A2 CMD-02 Question Architect */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-cyan-500/40 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40 flex items-center gap-1.5">
                <Cpu size={13} />
                CMD-02 Question Architect
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                <Lock size={10} />
                Stage A2 Active Engine
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                8-Dimension Decomposition
              </span>
            </div>

            <h3 className="font-cinzel text-2xl text-cyan-100 font-bold mt-2">
              Automated Question Tree & Hidden Assumption Engine
            </h3>
            <p className="text-stone-300 text-xs mt-1 max-w-3xl leading-relaxed">
              Deconstructs raw user ideas into prioritized multi-dimensional inquiry trees, scrapes dangerous unspoken premises, and builds dependency DAGs to ensure the studio solves root design problems before touching card text.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('question-tree')}
              className={`px-3 py-2 rounded-xl text-xs font-cinzel font-bold transition-all ${
                activeTab === 'question-tree'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              Question Tree
            </button>
            <button
              onClick={() => setActiveTab('assumptions')}
              className={`px-3 py-2 rounded-xl text-xs font-cinzel font-bold transition-all ${
                activeTab === 'assumptions'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              Assumption Scraper ({activeAnalysis.hiddenAssumptions.length})
            </button>
            <button
              onClick={() => setActiveTab('dependencies')}
              className={`px-3 py-2 rounded-xl text-xs font-cinzel font-bold transition-all ${
                activeTab === 'dependencies'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              Dependency Prioritizer
            </button>
            <button
              onClick={() => setActiveTab('dimensions')}
              className={`px-3 py-2 rounded-xl text-xs font-cinzel font-bold transition-all ${
                activeTab === 'dimensions'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              8 Dimensions (94 Agents)
            </button>
          </div>
        </div>

        {/* Input Bar for Live Custom Analysis */}
        <form onSubmit={handleRunAnalysis} className="mt-5 flex flex-col sm:flex-row gap-2 relative z-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Test any design prompt (e.g. 'Add a 1-cost counterspell that discards opponent hand', 'How do lane traps trigger?')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-700 focus:border-cyan-400 focus:outline-none text-xs text-stone-100 placeholder-stone-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cinzel font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0"
          >
            <Sparkles size={14} />
            <span>Deconstruct Inquiry</span>
          </button>
        </form>

        {/* Preset Selector Chips */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
          <span className="text-stone-400 font-mono flex items-center gap-1 shrink-0">
            <Compass size={12} className="text-cyan-400" />
            Preset Test Inquiries:
          </span>
          {PRESET_INQUIRIES.map((preset) => (
            <button
              key={preset.inquiryId}
              onClick={() => handleSelectPreset(preset)}
              className={`px-2.5 py-1 rounded-lg transition-all shrink-0 font-medium ${
                selectedPresetId === preset.inquiryId
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/50'
                  : 'bg-stone-800/80 text-stone-400 hover:bg-stone-700 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {preset.rawInput.slice(0, 38)}...
            </button>
          ))}
        </div>
      </div>

      {/* Active Analysis Core Summary Card */}
      <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
              Inquiry: {activeAnalysis.inquiryId}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Primary Dimension: {activeAnalysis.primaryDimension}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Escalation: {activeAnalysis.estimatedEscalation}
            </span>
          </div>
          <p className="text-sm font-cinzel font-bold text-stone-100">
            "{activeAnalysis.rawInput}"
          </p>
          <p className="text-xs text-amber-300/90 leading-relaxed max-w-4xl">
            <strong className="text-amber-400">Root Design Problem:</strong> {activeAnalysis.rootDesignProblem}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
          <div className="text-right">
            <div className="text-[10px] text-stone-400 uppercase font-mono">Assigned Agents</div>
            <div className="text-xs font-mono font-bold text-cyan-300">
              {activeAnalysis.targetAgents.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: QUESTION TREE */}
      {activeTab === 'question-tree' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-cinzel text-base text-amber-200 font-bold flex items-center gap-2">
              <Layers size={18} className="text-cyan-400" />
              Hierarchical Question Tree ({activeAnalysis.questionTree.length} Branch Tracks)
            </h4>
            <span className="text-xs font-mono text-stone-400">
              Ordered by Downstream Dependency Rank
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAnalysis.questionTree.map((branch, index) => (
              <div 
                key={index}
                className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4 relative overflow-hidden group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 text-[11px] font-mono font-bold border border-cyan-500/30">
                      Rank #{branch.priorityRank} • {branch.dimension}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      Agents: {branch.assignedAgents.join(', ')}
                    </span>
                  </div>

                  <h5 className="font-cinzel font-bold text-stone-100 text-sm">
                    {branch.title}
                  </h5>

                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-xs text-cyan-200 leading-relaxed font-medium">
                    <strong className="text-cyan-400">Core Axiom Question:</strong> {branch.coreQuestion}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono uppercase text-stone-400 font-bold">
                      Sub-Questions to Resolve:
                    </div>
                    {branch.subQuestions.map((sub, i) => (
                      <div key={i} className="text-xs text-stone-300 flex items-start gap-2 pl-1">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-amber-400">
                  <span>Constraint:</span>
                  <span className="text-stone-300 text-right max-w-xs">{branch.keyConstraints[0]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Canonical Solving Sequence */}
          <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-3">
            <h5 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
              <CheckCircle2 size={14} className="text-amber-400" />
              CMD-02 Recommended Sequential Solving Order
            </h5>
            <div className="space-y-2">
              {activeAnalysis.solvingOrder.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80 flex items-center gap-3 text-xs text-stone-200">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-amber-500/30">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HIDDEN ASSUMPTION SCRAPER */}
      {activeTab === 'assumptions' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-cinzel text-base text-amber-200 font-bold flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-400" />
                Hidden Assumption Scraper ({activeAnalysis.hiddenAssumptions.length} Unspoken Premises Identified)
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Surfaces dangerous unconscious assumptions embedded in the prompt before they corrupt design balance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeAnalysis.hiddenAssumptions.map((assumption) => (
              <div 
                key={assumption.id}
                className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4 hover:border-red-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-stone-400 font-bold">
                        {assumption.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                        assumption.riskLevel === 'Critical'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : assumption.riskLevel === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                      }`}>
                        Risk: {assumption.riskLevel}
                      </span>
                    </div>
                    <h5 className="font-cinzel text-sm font-bold text-stone-100">
                      {assumption.statement}
                    </h5>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                      Implicit Premise
                    </span>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {assumption.implicitPremise}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold block flex items-center gap-1">
                      <AlertTriangle size={11} />
                      Root Failure Mode
                    </span>
                    <p className="text-xs text-red-200 leading-relaxed">
                      {assumption.rootFailureMode}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      Validation Test
                    </span>
                    <p className="text-xs text-cyan-200 leading-relaxed">
                      {assumption.recommendedValidation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DEPENDENCY IMPACT PRIORITIZER */}
      {activeTab === 'dependencies' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-cinzel text-base text-amber-200 font-bold flex items-center gap-2">
                <GitBranch size={18} className="text-cyan-400" />
                Directed Acyclic Graph (DAG) Dependency Chain
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Visualizes what must be resolved and locked first before downstream card design can proceed.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {activeAnalysis.dependencyChain.map((node, index) => (
              <div 
                key={node.id}
                className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono font-bold flex items-center justify-center text-sm shrink-0">
                    L{node.level}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                        {node.levelName}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                        node.status === 'LOCKED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : node.status === 'APPROVED'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : node.status === 'IN_REVIEW'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-stone-700/40 text-stone-400 border-stone-700'
                      }`}>
                        {node.status}
                      </span>
                    </div>
                    <h5 className="font-cinzel font-bold text-stone-100 text-sm">
                      {node.name}
                    </h5>
                    <p className="text-xs text-stone-300 max-w-2xl">
                      {node.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 text-right font-mono text-[11px] shrink-0">
                  <div className="text-stone-400">Owner Agent: <strong className="text-cyan-300">{node.ownerAgent}</strong></div>
                  {node.prerequisites.length > 0 && (
                    <div className="text-stone-500 text-[10px]">
                      Prereqs: {node.prerequisites.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 8 DIMENSIONS & AGENT MAPPING */}
      {activeTab === 'dimensions' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-cinzel text-base text-amber-200 font-bold flex items-center gap-2">
              <Compass size={18} className="text-cyan-400" />
              The 8 Canonical Question Dimensions
            </h4>
            <span className="text-xs font-mono text-stone-400">
              Categorizes all inquiries across 94 agents
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUESTION_DIMENSIONS.map((dim) => (
              <div 
                key={dim.dimension}
                className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${dim.badgeColor}`}>
                      {dim.code}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      {dim.leadAgents.join(', ')}
                    </span>
                  </div>

                  <h5 className="font-cinzel font-bold text-stone-100 text-sm">
                    {dim.title}
                  </h5>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {dim.focusDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                    Sample Inquiry:
                  </span>
                  <p className="text-[11px] text-stone-400 italic">
                    "{dim.sampleQuestions[0]}"
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
