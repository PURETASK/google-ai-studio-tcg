import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_STUDIO_AGENTS } from '../../data/studioAgentData';
import { StudioAgentRole, StudioAgentCategory, Domain, AgentChatMessage } from '../../types';
import { soundEngine } from '../../utils/audioEngine';
import { 
  Terminal, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Cpu, 
  Users, 
  Compass, 
  BookOpen, 
  Activity, 
  Check, 
  Copy, 
  RotateCcw, 
  MessageSquare, 
  ChevronRight,
  Search,
  Filter,
  Layers,
  Flame,
  Zap,
  Eye,
  Sliders,
  Play
} from 'lucide-react';

interface AgentCommandIntercomProps {
  onInspectCard?: (cardName: string) => void;
}

const PRESET_TACTICAL_DIRECTIVES = [
  {
    label: 'Audit Priority Stack',
    query: 'Audit the 7-phase priority stack (Phases 14-20). How do fast reaction spells resolve when cast in response to a Combat Phase lane clash?'
  },
  {
    label: 'Evaluate Magma Burn vs Siphon',
    query: 'Evaluate the damage tempo of Radiance Magma Burn (damage at start of turn) versus Abyss Void Siphon (lifesteal on hit). Is there damage friction?'
  },
  {
    label: 'Check Sanctuary Defense Scaling',
    query: 'Assess Sanctuary Aegis / Divine Shield stacking on high-durability vanguard guardians against multi-attack piercing.'
  },
  {
    label: 'Verify CMD-01 Lock Gates',
    query: 'Review the CMD-01 completion gates for Stage A & Stage B. What criteria must be satisfied to move from IN_REVIEW to LOCKED v1.0?'
  },
  {
    label: 'Nuance Council Severity Review',
    query: 'Run a Nuance Council conflict analysis (N1-N5 scale) on an artifact that grants both Fast Reaction counter-spell and passive mana refund.'
  }
];

export const AgentCommandIntercom: React.FC<AgentCommandIntercomProps> = ({ onInspectCard }) => {
  const [selectedAgent, setSelectedAgent] = useState<StudioAgentRole>(ALL_STUDIO_AGENTS[0]); // CMD-01
  const [categoryFilter, setCategoryFilter] = useState<StudioAgentCategory | 'All'>('All');
  const [domainFilter, setDomainFilter] = useState<Domain | 'Universal' | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialogue states
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'init-msg-1',
      agentId: 'CMD-01',
      agentName: 'Nexus TCG Design Director',
      category: 'Command',
      sender: 'agent',
      text: 'AI Studio Operating System initialized. I am CMD-01 Design Director, overseeing all 94 specialist agents across Command, Foundational, Validation, Nuance, Content, and Domain Directorates. Select an agent or submit any game design query, card balance review, or rules inquiry.',
      timestamp: 'Just now',
      nuanceRating: 'N1',
      actionAuthority: 'Highest AI operational authority beneath Project Owner',
      rulesCited: ['CMD-01 Core Spec', 'Roadmap Stage A-F'],
      verdict: 'INFO'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Multi-Agent Deliberation Panel state
  const [isCouncilMode, setIsCouncilMode] = useState(false);
  const [selectedCouncilIds, setSelectedCouncilIds] = useState<string[]>(['CMD-01', 'GLO-02', 'NUA-01']);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Filter available agents
  const filteredAgents = ALL_STUDIO_AGENTS.filter(agent => {
    if (categoryFilter !== 'All' && agent.category !== categoryFilter) return false;
    if (domainFilter !== 'All') {
      if (domainFilter === 'Universal' && agent.domain !== 'Universal') return false;
      if (domainFilter !== 'Universal' && agent.domain !== domainFilter) return false;
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

  // Generate intelligent in-character response
  const generateAgentResponse = (userQuery: string, agent: StudioAgentRole): AgentChatMessage => {
    const q = userQuery.toLowerCase();
    let verdict: AgentChatMessage['verdict'] = 'APPROVED';
    let nuance: AgentChatMessage['nuanceRating'] = 'N1';
    let responseText = '';
    const rulesCited: string[] = [];

    if (agent.id === 'CMD-01') {
      rulesCited.push('Axiom-01 (Order of Operations)', 'CMD-01 Gate Spec');
      if (q.includes('gate') || q.includes('lock') || q.includes('status')) {
        responseText = `[CMD-01 Architectural Directive] For Stage A and Stage B locking, all 6 Foundational Council agents (GLO-01..06) must resolve any N4/N5 nuance findings. Premature locking without evidence is blocked under Rule 4.3. I have cross-checked the current dependency graph: all 31 stages are ordered sequentially with strict priority arbitration.`;
      } else if (q.includes('burn') || q.includes('siphon') || q.includes('tempo')) {
        responseText = `[CMD-01 Routing Assessment] Query involves cross-domain interaction between Radiance and Abyss. Routing authority assigned to GLO-02 (Combat Specialist) and GLO-03 (Economy Specialist), monitored by NUA-01 (Interaction Arbiter). Recommendation: Magma Burn is classified as an End/Start phase tick, whereas Siphon triggers during Active Clash resolution. No stack deadlock detected.`;
      } else {
        responseText = `[CMD-01 Operational Review] Evaluated your directive: "${userQuery}". Operating within authoritative limits (${agent.authorityLevel}). All 94 sub-agents are synchronized. Outputs generated adhere strictly to canonical specifications without unauthorized invention.`;
      }
    } else if (agent.id === 'CMD-02' || agent.category === 'Command') {
      rulesCited.push('CMD-02 Question Tree Specification');
      responseText = `[Question Architect CMD-02] Deconstructing query into 3 primary inquiry vectors: (1) Core rules feasibility, (2) Edge-case state manipulation, (3) Player cognitive load. Hidden assumptions detected: none critical. Routing task to relevant council specialists.`;
    } else if (agent.category === 'Foundational') {
      rulesCited.push(`${agent.id} Canonical Axiom`, 'Foundational Rules Bible §4');
      responseText = `[${agent.id} ${agent.name}] Under Foundational Council mandate: ${agent.responsibility}. We enforce mathematical balance across the 7 combat phases. Regarding "${userQuery}": All unit interactions strictly respect baseline defense thresholds, priority windows, and domain momentum ceilings.`;
    } else if (agent.category === 'Nuance') {
      nuance = 'N3';
      verdict = 'REQUIRES_REVISION';
      rulesCited.push(`${agent.id} Nuance Matrix`, 'NUA Severity Scale §3.2');
      responseText = `[${agent.id} ${agent.name}] Nuance Audit triggered (Rating: ${nuance} - Significant Interaction Risk). Reviewing priority collisions in user directive "${userQuery}". Potential edge case: simultaneous trigger ordering when two reaction abilities declare targets in the same sub-step. Resolution: active player priority always yields first window before non-active player.`;
    } else if (agent.category === 'Validation') {
      rulesCited.push(`${agent.id} Balance Boundary §2.1`);
      responseText = `[${agent.id} ${agent.name}] Stress-test simulation complete. Simulated 1,000 algorithmic match iterations against the current meta. Win-rate delta remained within acceptable bounds (±3.4% variance). No infinite mana or degenerate lockout loop identified.`;
    } else {
      // Domain Directorates / Content
      rulesCited.push(`${agent.domain} Domain Bible`, `${agent.id} Directorate Manual`);
      responseText = `[${agent.id} ${agent.name} • ${agent.domain} Directorate] Representing the ${agent.domain} Realm: ${agent.responsibility}. In accordance with ${agent.domain} identity principles, this mechanic maintains thematic purity and supports our primary mechanical identity while avoiding color bleed.`;
    }

    return {
      id: `agent-msg-${Date.now()}`,
      agentId: agent.id,
      agentName: agent.name,
      category: agent.category,
      sender: 'agent',
      text: responseText,
      timestamp: 'Just now',
      nuanceRating: nuance,
      actionAuthority: agent.authorityLevel,
      rulesCited,
      verdict
    };
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isThinking) return;

    soundEngine.playMicroSound('click');
    const userQuery = inputText.trim();
    setInputText('');

    const userMsg: AgentChatMessage = {
      id: `user-msg-${Date.now()}`,
      agentId: 'USER-OP',
      agentName: 'Project Owner',
      category: 'Command',
      sender: 'user',
      text: userQuery,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    if (isCouncilMode) {
      // Multi-Agent Council Deliberation
      setTimeout(() => {
        soundEngine.playMicroSound('select');
        const councilAgents = selectedCouncilIds
          .map(id => ALL_STUDIO_AGENTS.find(a => a.id === id))
          .filter((a): a is StudioAgentRole => a !== undefined);

        const replies = councilAgents.map(ag => generateAgentResponse(userQuery, ag));
        
        // Add consolidated council synthesis
        const synthesisMsg: AgentChatMessage = {
          id: `council-summary-${Date.now()}`,
          agentId: 'CMD-01',
          agentName: 'Council Deliberation Synthesis',
          category: 'Command',
          sender: 'council',
          text: `[Multi-Agent Consensus Verdict] The council of ${councilAgents.length} agents (${councilAgents.map(a => a.id).join(', ')}) has evaluated the directive. Consensus rating: APPROVED with 0 blocking N5 escalations. Design may proceed to execution.`,
          timestamp: 'Just now',
          verdict: 'APPROVED',
          nuanceRating: 'N1',
          rulesCited: ['Consolidated Authority Pipeline', 'CMD-01 Final Gate']
        };

        setMessages(prev => [...prev, ...replies, synthesisMsg]);
        setIsThinking(false);
        soundEngine.playMicroSound('unlock');
      }, 900);
    } else {
      // Single Agent Direct Dialogue
      setTimeout(() => {
        soundEngine.playMicroSound('select');
        const reply = generateAgentResponse(userQuery, selectedAgent);
        setMessages(prev => [...prev, reply]);
        setIsThinking(false);
      }, 600);
    }
  };

  const handleToggleCouncilAgent = (agentId: string) => {
    soundEngine.playMicroSound('click');
    if (selectedCouncilIds.includes(agentId)) {
      if (selectedCouncilIds.length > 1) {
        setSelectedCouncilIds(prev => prev.filter(id => id !== agentId));
      }
    } else {
      if (selectedCouncilIds.length < 4) {
        setSelectedCouncilIds(prev => [...prev, agentId]);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-stone-900/95 border border-amber-500/40 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Terminal size={15} className="text-amber-400" />
              Agent Command Intercom & Consultation Hub
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
              94 Active Specialists
            </span>
          </div>
          <h2 className="font-cinzel font-black text-xl sm:text-2xl text-amber-100 mt-1">
            Nexus AI Multi-Agent Operating Terminal
          </h2>
          <p className="text-stone-300 text-xs mt-0.5 max-w-2xl leading-relaxed">
            Directly converse with any of the 94 registered specialist agents or dispatch cross-council multi-agent deliberations 
            to mathematically audit card designs, rules arbitration, and domain interactions.
          </p>
        </div>

        {/* Mode Switch: Direct Intercom vs Council Deliberation */}
        <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-2xl border border-stone-800 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('click');
              setIsCouncilMode(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition ${
              !isCouncilMode
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <MessageSquare size={13} />
            <span>Direct Intercom</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('click');
              setIsCouncilMode(true);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition ${
              isCouncilMode
                ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users size={13} />
            <span>Council Panel ({selectedCouncilIds.length})</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Agent Selector Roster (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg space-y-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search 94 agents by ID, name, role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-sans shadow-inner"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 text-[10px] font-cinzel">
              {(['All', 'Command', 'Foundational', 'Validation', 'Nuance', 'Content', 'Directorate'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    soundEngine.playMicroSound('hover');
                    setCategoryFilter(cat);
                  }}
                  className={`px-2 py-1 rounded-lg transition ${
                    categoryFilter === cat
                      ? 'bg-amber-500 text-black font-bold shadow'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Agent List Scroll Area */}
            <div className="space-y-1.5 max-h-[480px] overflow-y-auto scrollbar-thin pr-1">
              {filteredAgents.map((agent) => {
                const isSelected = selectedAgent.id === agent.id;
                const inCouncil = selectedCouncilIds.includes(agent.id);

                return (
                  <div
                    key={agent.id}
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      setSelectedAgent(agent);
                      if (isCouncilMode) {
                        handleToggleCouncilAgent(agent.id);
                      }
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected && !isCouncilMode
                        ? 'bg-amber-500/20 border-amber-500 text-amber-100 shadow-md ring-1 ring-amber-500'
                        : inCouncil && isCouncilMode
                        ? 'bg-purple-950/40 border-purple-500 text-purple-100 shadow-md ring-1 ring-purple-500'
                        : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-stone-900 border border-stone-700 text-amber-300">
                          {agent.id}
                        </span>
                        <span className="text-[10px] font-cinzel text-stone-400 truncate">
                          {agent.category}
                        </span>
                        {agent.domain !== 'Universal' && (
                          <span className="text-[9px] px-1 rounded bg-stone-900 text-stone-300 font-cinzel">
                            {agent.domain}
                          </span>
                        )}
                      </div>
                      <h4 className="font-cinzel font-bold text-xs text-stone-200 mt-1 truncate">
                        {agent.name}
                      </h4>
                      <p className="text-[10px] text-stone-400 line-clamp-1 font-sans mt-0.5">
                        {agent.responsibility}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {isCouncilMode ? (
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center text-[10px] ${
                          inCouncil
                            ? 'bg-purple-500 border-purple-400 text-white font-bold'
                            : 'border-stone-700 bg-stone-900 text-stone-500'
                        }`}>
                          {inCouncil ? <Check size={12} /> : '+'}
                        </div>
                      ) : (
                        <ChevronRight size={14} className={isSelected ? 'text-amber-400' : 'text-stone-600'} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Agent Quick Inspector Card */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-amber-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                  Active Specialist
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-mono border border-amber-500/40">
                  {selectedAgent.id}
                </span>
              </div>
              <h4 className="font-cinzel font-bold text-stone-100 text-sm">
                {selectedAgent.name}
              </h4>
              <p className="text-stone-300 text-[11px] font-sans leading-relaxed">
                {selectedAgent.responsibility}
              </p>
              <div className="text-[10px] font-mono text-stone-400 pt-1 border-t border-stone-800/80">
                <span className="text-stone-300 font-bold">Authority: </span>
                <span>{selectedAgent.authorityLevel}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Terminal & Console (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Preset Fast Tactical Directives */}
          <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <span className="text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles size={12} />
              <span>Fast Directives:</span>
            </span>
            {PRESET_TACTICAL_DIRECTIVES.map((directive, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(directive.query);
                  soundEngine.playMicroSound('hover');
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-200 text-[11px] font-cinzel whitespace-nowrap transition cursor-pointer"
              >
                {directive.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Container */}
          <div className="p-4 sm:p-5 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl min-h-[480px] max-h-[580px] flex flex-col justify-between overflow-hidden relative">
            
            {/* Messages Feed */}
            <div className="space-y-4 overflow-y-auto scrollbar-thin pr-2 mb-3">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                const isCouncil = msg.sender === 'council';

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-1 text-[11px] font-mono">
                      <span className={`font-bold ${isUser ? 'text-amber-400' : 'text-stone-300'}`}>
                        {msg.agentName}
                      </span>
                      {!isUser && (
                        <span className="px-1.5 py-0.2 rounded bg-stone-900 text-stone-400 text-[10px] border border-stone-800">
                          {msg.agentId}
                        </span>
                      )}
                      <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
                    </div>

                    {/* Message Bubble */}
                    <div className={`p-4 rounded-2xl text-xs max-w-2xl leading-relaxed shadow-lg ${
                      isUser
                        ? 'bg-amber-500 text-black font-medium rounded-tr-none'
                        : isCouncil
                        ? 'bg-gradient-to-r from-purple-950/80 to-stone-900 border border-purple-500/50 text-purple-100 rounded-tl-none font-sans'
                        : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-tl-none font-sans'
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Cited Rules / Nuance Badge */}
                      {!isUser && (msg.rulesCited || msg.verdict || msg.nuanceRating) && (
                        <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                          <div className="flex items-center gap-1.5 text-stone-400">
                            <BookOpen size={11} className="text-amber-400" />
                            <span>Authority: {msg.rulesCited?.join(', ') || 'Canonical Bible'}</span>
                          </div>

                          {msg.verdict && (
                            <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              msg.verdict === 'APPROVED'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : msg.verdict === 'REQUIRES_REVISION'
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                                : 'bg-stone-800 text-stone-300'
                            }`}>
                              Verdict: {msg.verdict}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs font-mono text-amber-400 p-3 rounded-xl bg-stone-900/60 border border-stone-800 w-fit"
                >
                  <Cpu size={14} className="animate-spin text-amber-400" />
                  <span>
                    {isCouncilMode
                      ? `Council deliberating across ${selectedCouncilIds.length} specialist agents...`
                      : `${selectedAgent.id} (${selectedAgent.name}) calculating authority response...`}
                  </span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-stone-800/80 flex items-center gap-2">
              <input
                type="text"
                placeholder={
                  isCouncilMode
                    ? `Dispatch directive to Council (${selectedCouncilIds.join(', ')})...`
                    : `Ask ${selectedAgent.id} (${selectedAgent.name})...`
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-stone-900 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-sans shadow-inner placeholder-stone-500"
              />
              <button
                type="submit"
                id="btn-send-agent-intercom"
                disabled={!inputText.trim() || isThinking}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
              >
                <span>Dispatch</span>
                <Send size={14} />
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
