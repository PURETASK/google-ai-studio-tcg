import React, { useState } from 'react';
import { 
  ALL_STUDIO_AGENTS, 
  NUANCE_SEVERITY_SCALE, 
  ESCALATION_LEVELS, 
  SOURCE_TIERS, 
  ROADMAP_STAGES, 
  QUESTION_FIRST_SCENARIOS, 
  CMD01_COMPLETION_GATES 
} from '../../data/studioAgentData';
import { 
  StudioAgentRole, 
  StudioAgentCategory, 
  Domain, 
  QuestionFirstScenario 
} from '../../types';
import { QuestionArchitectView } from './QuestionArchitectView';
import { FoundationalCouncilView } from './FoundationalCouncilView';
import { AuthoritativeDocumentView } from './AuthoritativeDocumentView';
import { ValidationCouncilView } from './ValidationCouncilView';
import { NuanceCouncilView } from './NuanceCouncilView';
import { ContentExperienceView } from './ContentExperienceView';
import { DomainDirectoratesView } from './DomainDirectoratesView';
import { AgentCommandIntercom } from './AgentCommandIntercom';
import { AgentVisionTaskDashboard } from './AgentVisionTaskDashboard';
import { 
  Cpu, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Layers, 
  Search, 
  CheckCircle2, 
  XCircle, 
  GitBranch, 
  Sparkles, 
  BookOpen, 
  Send, 
  HelpCircle, 
  Scale, 
  Compass, 
  Flame, 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  Lock, 
  Check, 
  FileText, 
  Sliders, 
  Eye, 
  Terminal, 
  UserCheck,
  Activity
} from 'lucide-react';

interface StudioAgentRegistryViewProps {
  onInspectCard?: (cardName: string) => void;
}

type StudioTab = 
  | 'intercom'
  | 'agent-vision-tasks'
  | 'master-spec'
  | 'question-architect' 
  | 'foundational-council' 
  | 'validation-council'
  | 'nuance-council'
  | 'content-experience'
  | 'domain-directorates'
  | 'dispatcher' 
  | 'registry' 
  | 'cmd01-spec' 
  | 'roadmap' 
  | 'governance' 
  | 'source-tiers';

export const StudioAgentRegistryView: React.FC<StudioAgentRegistryViewProps> = (props) => {
  const [activeSubTab, setActiveSubTab] = useState<StudioTab>('intercom');
  const [selectedCategory, setSelectedCategory] = useState<StudioAgentCategory | 'All'>('All');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'Universal' | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingAgent, setInspectingAgent] = useState<StudioAgentRole | null>(null);

  // Question-First Dispatcher State
  const [activeScenarioId, setActiveScenarioId] = useState<string>(QUESTION_FIRST_SCENARIOS[0].id);
  const [customUserInput, setCustomUserInput] = useState<string>('');
  const [isCustomSubmitted, setIsCustomSubmitted] = useState<boolean>(false);

  const activeScenario: QuestionFirstScenario = 
    QUESTION_FIRST_SCENARIOS.find(s => s.id === activeScenarioId) || QUESTION_FIRST_SCENARIOS[0];

  // Filter Agents
  const filteredAgents = ALL_STUDIO_AGENTS.filter(agent => {
    if (selectedCategory !== 'All' && agent.category !== selectedCategory) return false;
    if (selectedDomain !== 'All') {
      if (selectedDomain === 'Universal' && agent.domain !== 'Universal') return false;
      if (selectedDomain !== 'Universal' && agent.domain !== selectedDomain) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = agent.name.toLowerCase().includes(q);
      const matchId = agent.id.toLowerCase().includes(q);
      const matchResp = agent.responsibility.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchResp) return false;
    }
    return true;
  });

  const handleRunCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUserInput.trim()) return;
    setIsCustomSubmitted(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Studio Top Banner & Command Center Header */}
      <div className="p-6 rounded-2xl bg-stone-900/95 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <Cpu size={14} className="text-amber-400" />
                AI Studio Operating System v1.0
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                <Lock size={10} />
                CMD-01 Locked
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                94 Defined Specialist Agents
              </span>
            </div>
            <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100 mt-1">
              Realm of Nexus TCG Development Studio
            </h2>
            <p className="text-stone-300 text-xs mt-1 max-w-3xl leading-relaxed">
              Multi-agent orchestration, evidence-based authority governance, and question-first translation pipeline. 
              Turns natural language design intent into mathematically validated rules, balanced mechanics, and canonical card blueprints without uncoordinated agent swarm.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950 px-4 py-3 rounded-xl border border-stone-800 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-stone-400 block">Active Orchestrator</span>
              <span className="font-cinzel font-bold text-xs text-amber-300 block">CMD-01 Design Director</span>
              <span className="text-[10px] text-emerald-400 font-mono">Stage A Completed</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Navigation Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-thin border-b border-stone-800">
        <button
          onClick={() => setActiveSubTab('intercom')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-black flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'intercom'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-stone-950 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)] ring-1 ring-amber-400'
              : 'bg-stone-900/90 text-amber-300 border-amber-500/40 hover:bg-stone-800 hover:border-amber-400'
          }`}
        >
          <Terminal size={14} />
          <span>Interactive Agent Command Hub</span>
        </button>

        <button
          onClick={() => setActiveSubTab('agent-vision-tasks')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'agent-vision-tasks'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-stone-950 border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)] ring-1 ring-emerald-400 font-black'
              : 'bg-stone-900/90 text-emerald-300 border-emerald-500/40 hover:bg-stone-800 hover:border-emerald-400'
          }`}
        >
          <Activity size={14} />
          <span>Vision Agent Task Dashboard</span>
        </button>

        <button
          onClick={() => setActiveSubTab('master-spec')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'master-spec'
              ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.35)] ring-1 ring-amber-400'
              : 'bg-stone-900/90 text-amber-300 border-amber-500/40 hover:bg-stone-800 hover:border-amber-400'
          }`}
        >
          <BookOpen size={14} />
          <span>Authoritative Spec (v1.0)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('question-architect')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'question-architect'
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'bg-stone-900/80 text-cyan-300 border-cyan-500/30 hover:bg-stone-800'
          }`}
        >
          <Sparkles size={14} />
          <span>Stage A2: Question Architect (CMD-02)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('foundational-council')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'foundational-council'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]'
              : 'bg-stone-900/80 text-amber-300 border-amber-500/30 hover:bg-stone-800'
          }`}
        >
          <Activity size={14} />
          <span>Stage B: Foundational Council (GLO-01..06)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('validation-council')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'validation-council'
              ? 'bg-rose-500 text-black border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
              : 'bg-stone-900/80 text-rose-300 border-rose-500/30 hover:bg-stone-800'
          }`}
        >
          <ShieldAlert size={14} />
          <span>Stage C: Validation Council (GLO-10..15)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nuance-council')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'nuance-council'
              ? 'bg-purple-500 text-black border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
              : 'bg-stone-900/80 text-purple-300 border-purple-500/30 hover:bg-stone-800'
          }`}
        >
          <Eye size={14} />
          <span>Stage D: Nuance Council (NUA-01..08)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('content-experience')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'content-experience'
              ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-stone-900/80 text-emerald-300 border-emerald-500/30 hover:bg-stone-800'
          }`}
        >
          <Sparkles size={14} />
          <span>Stage E: Content & Experience (GLO-07..23)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('domain-directorates')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'domain-directorates'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
              : 'bg-stone-900/80 text-amber-300 border-amber-500/30 hover:bg-stone-800'
          }`}
        >
          <Compass size={14} />
          <span>Stage F: Domain Directorates & Matchups (56 Agents)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dispatcher')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'dispatcher'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]'
              : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-amber-200'
          }`}
        >
          <Send size={14} />
          <span>Translation Dispatcher</span>
        </button>

        <button
          onClick={() => setActiveSubTab('registry')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'registry'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]'
              : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-amber-200'
          }`}
        >
          <Cpu size={14} />
          <span>94-Agent Registry</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cmd01-spec')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'cmd01-spec'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]'
              : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-amber-200'
          }`}
        >
          <FileText size={14} />
          <span>CMD-01 Spec</span>
        </button>

        <button
          onClick={() => setActiveSubTab('roadmap')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'roadmap'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]'
              : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-amber-200'
          }`}
        >
          <GitBranch size={14} />
          <span>Roadmap (Stages A-F)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('governance')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'governance'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]'
              : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-amber-200'
          }`}
        >
          <Scale size={14} />
          <span>Nuance & Escalation</span>
        </button>

        <button
          onClick={() => setActiveSubTab('source-tiers')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeSubTab === 'source-tiers'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]'
              : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-amber-200'
          }`}
        >
          <Layers size={14} />
          <span>Source Tiers (1-7)</span>
        </button>
      </div>

      {/* ================= VIEW 0: INTERACTIVE AGENT COMMAND INTERCOM ================= */}
      {activeSubTab === 'intercom' && (
        <AgentCommandIntercom onInspectCard={props.onInspectCard} />
      )}

      {/* ================= VIEW 0.5: AGENT VISION TASK DASHBOARD ================= */}
      {activeSubTab === 'agent-vision-tasks' && (
        <AgentVisionTaskDashboard />
      )}

      {/* ================= VIEW: MASTER SPEC & AUTHORITATIVE CONSTITUTION ================= */}
      {activeSubTab === 'master-spec' && (
        <AuthoritativeDocumentView onNavigateToTab={(tab) => setActiveSubTab(tab as StudioTab)} />
      )}

      {/* ================= VIEW: STAGE A2 QUESTION ARCHITECT ================= */}
      {activeSubTab === 'question-architect' && (
        <QuestionArchitectView />
      )}

      {/* ================= VIEW: STAGE B FOUNDATIONAL COUNCIL ================= */}
      {activeSubTab === 'foundational-council' && (
        <FoundationalCouncilView />
      )}

      {/* ================= VIEW: STAGE C VALIDATION COUNCIL ================= */}
      {activeSubTab === 'validation-council' && (
        <ValidationCouncilView />
      )}

      {/* ================= VIEW: STAGE D NUANCE COUNCIL ================= */}
      {activeSubTab === 'nuance-council' && (
        <NuanceCouncilView />
      )}

      {/* ================= VIEW: STAGE E CONTENT & EXPERIENCE ================= */}
      {activeSubTab === 'content-experience' && (
        <ContentExperienceView />
      )}

      {/* ================= VIEW: STAGE F DOMAIN DIRECTORATES & MATCHUPS ================= */}
      {activeSubTab === 'domain-directorates' && (
        <DomainDirectoratesView />
      )}

      {/* ================= VIEW 1: QUESTION-FIRST DISPATCHER SANDBOX ================= */}
      {activeSubTab === 'dispatcher' && (
        <div className="flex flex-col gap-6">
          {/* Dispatcher Header & Scenario Selector */}
          <div className="bg-stone-900/90 p-5 rounded-2xl border border-stone-800 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  Question-First Translation Pipeline
                </span>
                <h3 className="font-cinzel font-bold text-lg text-stone-100">
                  Natural Language User Idea → Structured Studio Dispatch
                </h3>
              </div>
              <span className="text-xs text-stone-400 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800 font-mono">
                CMD-01 + CMD-02 Active
              </span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {QUESTION_FIRST_SCENARIOS.map((sc) => {
                const isSelected = activeScenarioId === sc.id && !isCustomSubmitted;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setActiveScenarioId(sc.id);
                      setIsCustomSubmitted(false);
                    }}
                    className={`text-left p-3 rounded-xl border transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100 ring-1 ring-amber-400/40 shadow-lg'
                        : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                        {sc.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${
                        sc.escalationLevel === 'E3' ? 'text-red-400' : sc.escalationLevel === 'E2' ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        {sc.escalationLevel} Escalation
                      </span>
                    </div>
                    <h4 className="font-cinzel font-bold text-xs text-stone-200 mt-2 truncate">
                      {sc.title}
                    </h4>
                    <p className="text-[10px] text-stone-400 italic mt-1 line-clamp-2">
                      "{sc.rawUserInput}"
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Custom Query Input Box */}
            <form onSubmit={handleRunCustomQuery} className="pt-2 border-t border-stone-800/80 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Or input any custom creative idea (e.g. 'I want players to wager Momentum on combat dice rolls')..."
                value={customUserInput}
                onChange={(e) => setCustomUserInput(e.target.value)}
                className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500 placeholder-stone-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 text-black font-cinzel font-bold text-xs hover:bg-amber-400 transition flex items-center justify-center gap-1.5 shrink-0"
              >
                <Send size={13} />
                <span>Simulate CMD-01 Routing</span>
              </button>
            </form>
          </div>

          {/* Detailed Pipeline Breakdown for Active Scenario */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 6 Cols: Intent Translation, Question Tree & Nuance Audit */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Step 1: Raw Idea & Intent Analysis */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center font-mono text-[10px] text-amber-300 font-bold">
                      1
                    </span>
                    <h4 className="font-cinzel font-bold text-sm text-stone-200">
                      User Idea & Intent Extraction
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 text-amber-400 border border-stone-800">
                    Tier 7 Brainstorm
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-200/90 font-serif italic">
                  "{isCustomSubmitted ? customUserInput : activeScenario.rawUserInput}"
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">CMD-01 Intent Breakdown:</span>
                  <ul className="space-y-1 text-xs text-stone-300 list-disc list-inside">
                    {activeScenario.intentAnalysis.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step 2: CMD-02 Question Tree Generation */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center font-mono text-[10px] font-bold">
                      2
                    </span>
                    <h4 className="font-cinzel font-bold text-sm text-amber-200">
                      CMD-02 Question Tree (Prerequisites)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">4 Critical Inquiries</span>
                </div>

                <div className="space-y-2">
                  {activeScenario.questionTree.map((q, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 flex items-start gap-2.5">
                      <HelpCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-stone-200 font-sans leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Nuance Council Audit Findings */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center font-mono text-[10px] text-stone-300 font-bold">
                      3
                    </span>
                    <h4 className="font-cinzel font-bold text-sm text-stone-200">
                      Nuance Council Edge-Case Audit
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">NUA-01..08 Diagnostic</span>
                </div>

                <div className="space-y-2">
                  {activeScenario.nuanceAudit.map((item, idx) => {
                    const sevInfo = NUANCE_SEVERITY_SCALE.find(n => n.level === item.severity);
                    return (
                      <div key={idx} className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold shrink-0 ${sevInfo?.color}`}>
                          {item.severity} - {sevInfo?.meaning}
                        </span>
                        <div className="flex-1">
                          <span className="text-[10px] font-mono text-amber-400 block">{item.agentId}</span>
                          <p className="text-xs text-stone-300 mt-0.5">{item.finding}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right 6 Cols: Routing Roster, Specialist Findings & CMD-01 Synthesis */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Step 4: Activated Minimal Agent Team */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center font-mono text-[10px] text-blue-300 font-bold">
                      4
                    </span>
                    <h4 className="font-cinzel font-bold text-sm text-stone-200">
                      Activated Specialist Roster ({activeScenario.activatedAgents.length} Agents)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Zero Agent Swarm</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeScenario.activatedAgents.map((agId) => {
                    const role = ALL_STUDIO_AGENTS.find(a => a.id === agId);
                    return (
                      <button
                        key={agId}
                        onClick={() => role && setInspectingAgent(role)}
                        className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-amber-200 text-xs font-mono transition flex items-center gap-1.5"
                      >
                        <span className="text-amber-400 font-bold">{agId}</span>
                        {role && <span className="text-[10px] text-stone-400 truncate max-w-[120px]">{role.name}</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Specialist Findings */}
                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">Specialist Responses:</span>
                  {activeScenario.specialistFindings.map((f, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs flex items-start gap-2.5">
                      <span className="text-amber-400 font-mono font-bold shrink-0">{f.agentId}:</span>
                      <div className="flex-1 text-stone-300">{f.findingSummary}</div>
                      {f.blocking && (
                        <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[9px] font-mono font-bold shrink-0">
                          BLOCKING
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 5: Final CMD-01 Decision Synthesis Brief */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-amber-500/50 shadow-xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-black font-cinzel font-black text-[10px] uppercase rounded-bl-xl">
                  CMD-01 Decision Brief
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center font-mono text-[10px] font-bold">
                    5
                  </span>
                  <h4 className="font-cinzel font-black text-sm text-amber-200">
                    Consolidated Studio Recommendation
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">What We Know</span>
                    <p className="text-stone-300 mt-0.5">{activeScenario.cmd01DecisionBrief.whatWeKnow}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">What Remains Unknown</span>
                    <p className="text-stone-300 mt-0.5">{activeScenario.cmd01DecisionBrief.whatRemainsUnknown}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400 block">Recommended Direction:</span>
                  <p className="text-xs text-amber-100 font-semibold">{activeScenario.cmd01DecisionBrief.recommendedDirection}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-stone-400">Proposed Status:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-[10px] font-bold">
                      {activeScenario.cmd01DecisionBrief.proposedStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-stone-400">Confidence:</span>
                    <span className="text-amber-300 font-mono text-[10px] font-bold">{activeScenario.cmd01DecisionBrief.confidence}</span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-[11px] text-stone-300 flex items-center gap-2">
                  <ArrowRight size={13} className="text-amber-400 shrink-0" />
                  <span><strong>Next Studio Action:</strong> {activeScenario.cmd01DecisionBrief.nextAction}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: 94-AGENT REGISTRY BROWSER ================= */}
      {activeSubTab === 'registry' && (
        <div className="flex flex-col gap-5">
          {/* Filtering Controls */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-thin">
              <span className="text-[10px] font-mono uppercase text-stone-400 mr-1 shrink-0">Category:</span>
              {(['All', 'Command', 'Global Council', 'Nuance Council', 'Domain Directorate', 'Domain Sub-Agent', 'Domain Specialist'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition border ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search agent ID, name, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredAgents.map((agent) => {
              const isCommand = agent.category === 'Command';
              const isDirector = agent.category === 'Domain Directorate';
              const isNuance = agent.category === 'Nuance Council';

              return (
                <div
                  key={agent.id}
                  onClick={() => setInspectingAgent(agent)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.01] ${
                    isCommand
                      ? 'bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border-amber-500/50 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
                      : isDirector
                      ? 'bg-stone-900/90 border-stone-700 hover:border-amber-400'
                      : isNuance
                      ? 'bg-stone-900/90 border-purple-900/40 hover:border-purple-500/60'
                      : 'bg-stone-900/70 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div>
                    {/* Header with ID, Category badge, Lock authority */}
                    <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded font-mono font-black text-xs ${
                          isCommand ? 'bg-amber-500 text-black' : 'bg-stone-800 text-amber-300'
                        }`}>
                          {agent.id}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 truncate max-w-[130px]">
                          {agent.category}
                        </span>
                      </div>

                      {agent.canBlockLock ? (
                        <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[9px] font-mono font-bold flex items-center gap-1">
                          <Lock size={9} />
                          Can Block Lock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-stone-800/60 text-stone-400 text-[9px] font-mono">
                          Proposal Authority
                        </span>
                      )}
                    </div>

                    {/* Agent Name & Domain */}
                    <div className="mt-2.5">
                      <h4 className="font-cinzel font-bold text-sm text-stone-100 leading-snug">
                        {agent.name}
                      </h4>
                      {agent.domain && (
                        <span className="text-[10px] font-mono text-amber-400/80 block mt-0.5">
                          Domain: {agent.domain}
                        </span>
                      )}
                    </div>

                    {/* Responsibility */}
                    <p className="text-xs text-stone-300 mt-2 line-clamp-3 leading-relaxed">
                      {agent.responsibility}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="mt-4 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span>{agent.stageRoadmap || 'Stage E/F'}</span>
                    <span className="text-amber-400/90 flex items-center gap-1 hover:underline">
                      Inspect Spec <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= VIEW 3: CMD-01 DESIGN DIRECTOR SPEC & 10 GATES ================= */}
      {activeSubTab === 'cmd01-spec' && (
        <div className="flex flex-col gap-6">
          {/* Spec Header */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/40 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  Stage A Production Specification
                </span>
                <h3 className="font-cinzel font-black text-2xl text-amber-200">
                  CMD-01: Nexus TCG Design Director
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  The central orchestrator, evidence guardian, and validation gatekeeper of the Realm of Nexus studio.
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                LOCKED v1.0
              </span>
            </div>

            {/* 10 Completion Verification Gates */}
            <div>
              <h4 className="font-cinzel font-bold text-sm text-stone-200 mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                The 10 Director Completion Verification Tests (All Passed)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CMD01_COMPLETION_GATES.map((g) => (
                  <div key={g.id} className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-cinzel font-bold text-xs text-amber-300 block">{g.name}</span>
                      <p className="text-[11px] text-stone-300 mt-0.5 leading-relaxed">{g.test}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 10 Core Responsibilities Summary */}
            <div className="pt-2 border-t border-stone-800">
              <h4 className="font-cinzel font-bold text-sm text-stone-200 mb-3">
                The 10 Core Governance Responsibilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {[
                  { title: '1. Task Interpretation', desc: 'Translates human ideas into structured investigations.' },
                  { title: '2. Question Discovery', desc: 'Ensures foundational questions are answered via CMD-02.' },
                  { title: '3. Minimal Agent Routing', desc: 'Selects smallest expert roster (3-8 specialists).' },
                  { title: '4. Dependency Management', desc: 'Traces all downstream rules and card impacts.' },
                  { title: '5. Source-Tier Control', desc: 'Enforces Tiers 1-7; stops lower tiers overwriting canon.' },
                  { title: '6. Status Gatekeeper', desc: 'Manages 12-stage lifecycle from Idea to Locked.' },
                  { title: '7. Conflict Management', desc: 'Exposes disagreements via E0-E5 escalation; no majority voting.' },
                  { title: '8. Validation Enforcement', desc: 'Requires Rules, Balance, Engine, and Red-Team sign-offs.' },
                  { title: '9. Decision Synthesis', desc: 'Presents clear, concise Decision Briefs to Project Owner.' },
                  { title: '10. Development Continuity', desc: 'Always knows current state, unknowns, and next actions.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                    <span className="font-cinzel font-bold text-xs text-amber-400 block">{item.title}</span>
                    <p className="text-[10px] text-stone-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 4: CONSTRUCTION ROADMAP (STAGES A-F) ================= */}
      {activeSubTab === 'roadmap' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            {ROADMAP_STAGES.map((stage) => {
              const isComplete = stage.status === 'Completed / Locked';
              const isActive = stage.status === 'Active / Building';

              return (
                <div
                  key={stage.stageId}
                  className={`p-5 rounded-2xl border transition-all ${
                    isComplete
                      ? 'bg-stone-900/90 border-emerald-500/40 shadow-lg'
                      : isActive
                      ? 'bg-stone-900/95 border-amber-500/50 ring-1 ring-amber-400/30 shadow-xl'
                      : 'bg-stone-900/60 border-stone-800 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-amber-400 font-bold">{stage.stageId}</span>
                        <h4 className="font-cinzel font-bold text-base text-stone-100">{stage.stageName}</h4>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">{stage.description}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
                      isComplete
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : isActive
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                        : 'bg-stone-800 text-stone-400 border-stone-700'
                    }`}>
                      {stage.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    {/* Agents Included */}
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block">Agents in this Stage:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.agentsIncluded.map((ag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 text-[11px] font-mono border border-stone-800">
                            {ag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Deliverables */}
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block">Deliverables & Gates:</span>
                      <ul className="space-y-1 text-xs text-stone-300 list-disc list-inside">
                        {stage.deliverables.map((del, idx) => (
                          <li key={idx} className="leading-relaxed">{del}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= VIEW 5: NUANCE SCALE & ESCALATION MATRIX ================= */}
      {activeSubTab === 'governance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Nuance Severity Scale (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <h4 className="font-cinzel font-bold text-base text-stone-100">
                    Nuance Severity Scale (N0 to N5)
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Governed by the 8 Nuance Council agents (NUA-01..08).
                  </p>
                </div>
                <span className="text-[10px] font-mono text-red-400 font-bold">N4/N5 Blocks Lock</span>
              </div>

              <div className="space-y-2.5">
                {NUANCE_SEVERITY_SCALE.map((n) => (
                  <div key={n.level} className={`p-3.5 rounded-xl border ${n.color}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-black text-xs">{n.level} • {n.meaning}</span>
                      <span className="text-[10px] font-mono">{n.lockEffect}</span>
                    </div>
                    <p className="text-xs mt-1.5 text-stone-200 leading-relaxed font-sans">{n.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Escalation Hierarchy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <h4 className="font-cinzel font-bold text-base text-stone-100">
                    Conflict Escalation Levels (E0 to E5)
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Structured resolution paths preventing unmanaged studio deadlock.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold">No Majority Votes</span>
              </div>

              <div className="space-y-2.5">
                {ESCALATION_LEVELS.map((e) => (
                  <div key={e.level} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-xs text-amber-300">{e.level} — {e.name}</span>
                      <span className="text-[10px] font-mono text-stone-400">{e.actors}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{e.description}</p>
                    <div className="pt-1 text-[11px] text-amber-400/90 font-mono">
                      ↳ Resolution: {e.resolutionPath}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ================= VIEW 6: SOURCE TIERS (1-7) ================= */}
      {activeSubTab === 'source-tiers' && (
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
            <h4 className="font-cinzel font-bold text-base text-stone-100 mb-1">
              The Source-of-Truth 7-Tier Hierarchy
            </h4>
            <p className="text-xs text-stone-400 mb-4">
              A non-negotiable studio law: <strong>A lower source tier may NEVER silently overwrite a higher tier.</strong>
            </p>

            <div className="space-y-3">
              {SOURCE_TIERS.map((st) => (
                <div key={st.tier} className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-sm border shrink-0 ${st.badgeColor}`}>
                      T{st.tier}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-cinzel font-bold text-sm text-stone-200">{st.name}</h5>
                        <span className="text-[10px] font-mono text-amber-400">({st.authorityRank})</span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{st.description}</p>
                    </div>
                  </div>

                  <div className="text-right sm:max-w-xs shrink-0">
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Overwriting Rule</span>
                    <span className="text-xs text-stone-300 font-sans">{st.overwritingRule}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= AGENT INSPECTION MODAL ================= */}
      {inspectingAgent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-mono font-bold text-xs">
                    {inspectingAgent.id}
                  </span>
                  <span className="text-xs font-mono text-stone-400">{inspectingAgent.category}</span>
                </div>
                <h3 className="font-cinzel font-black text-xl text-stone-100 mt-1">
                  {inspectingAgent.name}
                </h3>
              </div>
              <button
                onClick={() => setInspectingAgent(null)}
                className="w-8 h-8 rounded-lg bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Primary Responsibility:</span>
                <p className="text-stone-200 mt-0.5 leading-relaxed">{inspectingAgent.responsibility}</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Authority Level:</span>
                <p className="text-amber-300 mt-0.5 leading-relaxed">{inspectingAgent.authorityLevel}</p>
              </div>

              {inspectingAgent.lockBlockingReason && (
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-800/50">
                  <span className="text-[10px] font-mono text-red-400 uppercase block font-bold">Lock-Blocking Authority:</span>
                  <p className="text-red-200 mt-0.5 leading-relaxed">{inspectingAgent.lockBlockingReason}</p>
                </div>
              )}

              {inspectingAgent.inputs && (
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[10px] font-mono text-stone-400 uppercase block">Standard Inputs:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {inspectingAgent.inputs.map((inp, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px] font-mono border border-stone-800">
                        {inp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {inspectingAgent.may && (
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">Authorized Actions (May):</span>
                  <ul className="list-disc list-inside space-y-1 text-stone-300 mt-1">
                    {inspectingAgent.may.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {inspectingAgent.mayNot && (
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[10px] font-mono text-red-400 uppercase block font-bold">Strict Prohibitions (May Not):</span>
                  <ul className="list-disc list-inside space-y-1 text-stone-300 mt-1">
                    {inspectingAgent.mayNot.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setInspectingAgent(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-200 transition"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
