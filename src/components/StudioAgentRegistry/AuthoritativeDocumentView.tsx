import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Search, 
  Bookmark, 
  Layers, 
  Scale, 
  Cpu, 
  GitBranch, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface AuthoritativeDocumentViewProps {
  onNavigateToTab?: (tab: string) => void;
}

export const AuthoritativeDocumentView: React.FC<AuthoritativeDocumentViewProps> = ({ onNavigateToTab }) => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const copyFullDocument = () => {
    const rawDoc = `REALM OF NEXUS TCG
AI Development Studio — Organizational Architecture & Agent Registry v1.0
Comprehensive Build Document, Operational Guidelines & Implementation Plan

[BUILD_DOC_STUDIO_ARCHITECTURE.md - Authoritative Master Reference]`;
    navigator.clipboard.writeText(rawDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: 'sec-1', title: '1. Executive Summary & Hierarchy', icon: Layers, tag: 'Hierarchy' },
    { id: 'sec-2', title: '2. The Command Layer (Stage A)', icon: ShieldCheck, tag: 'CMD-01/02' },
    { id: 'sec-3', title: '3. Complete 94-Agent Registry', icon: Cpu, tag: '94 Agents' },
    { id: 'sec-4', title: '4. Authority Matrix & Non-Negotiables', icon: Scale, tag: 'Governance' },
    { id: 'sec-5', title: '5. Source-of-Truth 7-Tier Hierarchy', icon: Bookmark, tag: 'Tiers 1-7' },
    { id: 'sec-6', title: '6. Nuance Scale (N0-N5) & Escalation (E0-E5)', icon: AlertTriangle, tag: 'Auditing' },
    { id: 'sec-7', title: '7. Question-First User Idea Pipeline', icon: FileText, tag: 'Translation' },
    { id: 'sec-8', title: '8. Construction Roadmap (Stages A-F)', icon: GitBranch, tag: 'Roadmap' },
    { id: 'sec-9', title: '9. Immediate Action: CMD-02 & Stage B', icon: CheckCircle2, tag: 'Current State' }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner: Supreme Authoritative Document Declaration */}
      <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 border-2 border-amber-500/60 rounded-2xl p-6 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <ShieldCheck size={260} className="text-amber-400" />
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-300 shrink-0 shadow-lg shadow-amber-500/20">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500 text-stone-950 uppercase tracking-wider">
                  AUTHORITATIVE CONSTITUTION v1.0
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  LOCKED SOURCE OF TRUTH
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-800 text-stone-300">
                  BUILD_DOC_STUDIO_ARCHITECTURE.md
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-100 tracking-wide">
                Nexus TCG Studio Organizational Architecture & Master Spec
              </h2>
              <p className="text-stone-300 text-sm max-w-3xl mt-1 leading-relaxed">
                This comprehensive document establishes the supreme operational law, strict 94-agent hierarchy, authority matrices, 7-tier provenance rules, nuance severity audit scale, and execution roadmap for the Realm of Nexus TCG AI Studio.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto shrink-0">
            <button
              onClick={copyFullDocument}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono font-bold flex items-center justify-center gap-2 border border-stone-700 transition active:scale-95"
              title="Copy Reference Header"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copied ? 'Citation Copied' : 'Copy Citation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Section Switcher & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-stone-900/90 p-4 rounded-xl border border-stone-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition whitespace-nowrap ${
              selectedSection === 'all'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
            }`}
          >
            Full Master Document (All Sections)
          </button>
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
                selectedSection === sec.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-stone-800/50 text-stone-400 hover:text-stone-200'
              }`}
            >
              <sec.icon size={12} />
              <span>{sec.tag}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            placeholder="Search master spec..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Structured Authoritative Document Body */}
      <div className="flex flex-col gap-6">

        {/* SECTION 1: EXECUTIVE SUMMARY & HIERARCHY */}
        {(selectedSection === 'all' || selectedSection === 'sec-1') && (
          <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <h3 className="text-lg font-cinzel font-bold text-amber-200">
                  1. Executive Summary & Organizational Hierarchy
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase bg-stone-800 px-2 py-0.5 rounded">
                Section 1.0
              </span>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed mb-4">
              The <strong className="text-amber-300 font-semibold">Realm of Nexus TCG AI Development Studio</strong> is an agentic design and engineering organization composed of <strong className="text-amber-200">73 permanent agent roles</strong>, <strong className="text-amber-200">21 named Domain specialists</strong> that activate on demand, and dynamically instantiated <strong className="text-amber-200">10 temporary matchup/splash pairing agents</strong>. Totaling 94 distinct operational agent profiles.
            </p>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto my-4 leading-relaxed">
              <div className="text-stone-400 mb-2">// Non-Democratic, Evidence-Based Studio Hierarchy</div>
{`               PROJECT OWNER / CREATIVE DIRECTOR (Supreme Human Authority)
                                   │
                                   ▼
                   CMD-01: NEXUS TCG DESIGN DIRECTOR
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
        CMD-02: QUESTION ARCHITECT       GLOBAL TCG COUNCIL (23 AGENTS)
                                                  │
                 ┌────────────────────────────────┼──────────────────────────────┐
                 ▼                                ▼                              ▼
        DESIGN COUNCIL (GLO-07..09)      VALIDATION (GLO-10..15)      PRODUCTION & UX (GLO-16..23)
                                                  │
                                                  ▼
                                      NUANCE COUNCIL (8 AGENTS: NUA-01..08)
                                                  │
                                                  ▼
                                  FIVE DOMAIN DIRECTORS (RAD, VER, ABY, TMP, SAN)
                                                  │
                          ┌───────────────────────┼───────────────────────┐
                          ▼                       ▼                       ▼
                  CORE SUB-AGENTS (35)     DOMAIN SPECIALISTS (21)   TEMPORARY MATCHUP TEAMS (10)`}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
              <div className="bg-stone-950/80 p-3 rounded-lg border border-stone-800/80">
                <span className="text-amber-400 font-bold block mb-1">Evidence Over Consensus</span>
                <p className="text-stone-400">Decisions are never settled by democratic vote. A single proven infinite loop blocks approval regardless of vote tally.</p>
              </div>
              <div className="bg-stone-950/80 p-3 rounded-lg border border-stone-800/80">
                <span className="text-amber-400 font-bold block mb-1">Human Supreme Authority</span>
                <p className="text-stone-400">The human Project Owner holds absolute authority; AI directors synthesize trade-offs and escalate critical splits.</p>
              </div>
              <div className="bg-stone-950/80 p-3 rounded-lg border border-stone-800/80">
                <span className="text-amber-400 font-bold block mb-1">Anti-Hallucination Law</span>
                <p className="text-stone-400">Missing canon cannot be invented silently. All recovered historical lore must be certified with provenance tags.</p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: THE COMMAND LAYER */}
        {(selectedSection === 'all' || selectedSection === 'sec-2') && (
          <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <h3 className="text-lg font-cinzel font-bold text-cyan-200">
                  2. The Command Layer (Stage A)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase bg-stone-800 px-2 py-0.5 rounded">
                Section 2.0
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* CMD-01 Box */}
              <div className="bg-stone-950 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">CMD-01: Nexus TCG Design Director</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">Locked v1.0</span>
                </div>
                <p className="text-xs text-stone-300 mb-3">
                  Highest AI operational authority beneath the Project Owner. Coordinates complete game development, enforces review gates, converts user ideas into structured investigations, and prevents premature locking.
                </p>
                <div className="text-[11px] font-mono text-stone-400 space-y-1 bg-stone-900/90 p-2.5 rounded border border-stone-800">
                  <div><strong className="text-stone-300">Key Power:</strong> Can block LOCKED status for dependency failures or unresolved N4/N5 findings.</div>
                  <div><strong className="text-stone-300">Routing Bounds:</strong> Strict 3-8 specialist team activation (anti-swarm).</div>
                </div>
              </div>

              {/* CMD-02 Box */}
              <div className="bg-stone-950 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">CMD-02: Question Architect</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">Stage A2 Built</span>
                </div>
                <p className="text-xs text-stone-300 mb-3">
                  Inquiry authority only; cannot lock answers or design independently. Discovers unanswered questions, exposes unstated premises, detects ambiguity, and builds structured question trees.
                </p>
                <div className="text-[11px] font-mono text-stone-400 space-y-1 bg-stone-900/90 p-2.5 rounded border border-stone-800">
                  <div><strong className="text-stone-300">Core Engines:</strong> 8-Dimension Tree, Hidden Assumption Scraper, Dependency DAG.</div>
                  <div><strong className="text-stone-300">Mission:</strong> Anti-Problem Solving (solves root dilemmas before card text).</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: 94-AGENT REGISTRY SUMMARY */}
        {(selectedSection === 'all' || selectedSection === 'sec-3') && (
          <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <h3 className="text-lg font-cinzel font-bold text-emerald-200">
                  3. Complete 94-Agent Registry (5 Sub-Divisions)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase bg-stone-800 px-2 py-0.5 rounded">
                Section 3.0
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <div className="font-bold text-amber-400 font-cinzel mb-1">A. Command (2)</div>
                <ul className="text-stone-400 space-y-1 font-mono text-[11px]">
                  <li>• CMD-01 Director</li>
                  <li>• CMD-02 Question Arch.</li>
                </ul>
              </div>

              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <div className="font-bold text-cyan-400 font-cinzel mb-1">B. Global Council (23)</div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  GLO-01..06 (Foundational), GLO-07..09 (Design), GLO-10..15 (Validation), GLO-16..23 (Production & UX).
                </p>
              </div>

              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <div className="font-bold text-purple-400 font-cinzel mb-1">C. Nuance Council (8)</div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  NUA-01..08 specialists evaluating context, linguistic readings, tilt, edge cases, and future space traps.
                </p>
              </div>

              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <div className="font-bold text-rose-400 font-cinzel mb-1">D. 5 Domains (56)</div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  5 Directors (RAD, VER, ABY, TMP, SAN) + 35 Core Sub-Agents (7 per domain) + 21 On-Demand Specialists.
                </p>
              </div>

              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <div className="font-bold text-indigo-400 font-cinzel mb-1">E. Pairings (10)</div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  10 Inter-Domain pairs operating in dual Matchup Mode and Hybrid Splash Deck Mode.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: AUTHORITY MATRIX & NON-NEGOTIABLES */}
        {(selectedSection === 'all' || selectedSection === 'sec-4') && (
          <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <h3 className="text-lg font-cinzel font-bold text-amber-200">
                  4. Authority Matrix & Non-Negotiables
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase bg-stone-800 px-2 py-0.5 rounded">
                Section 4.0
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-stone-950 text-stone-400 border-b border-stone-800">
                    <th className="p-2.5 font-bold">Agent Role</th>
                    <th className="p-2.5 font-bold text-center">Can Block LOCK?</th>
                    <th className="p-2.5 font-bold">Primary Lock-Blocking Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 text-stone-300">
                  <tr className="bg-stone-900/40">
                    <td className="p-2.5 font-bold text-amber-300">Project Owner</td>
                    <td className="p-2.5 text-center text-emerald-400 font-bold">YES</td>
                    <td className="p-2.5">Final creative & business authority across all domains</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-200">CMD-01 TCG Director</td>
                    <td className="p-2.5 text-center text-emerald-400 font-bold">YES</td>
                    <td className="p-2.5">Process/dependency failure, missing gates, or unresolved blockers</td>
                  </tr>
                  <tr className="bg-stone-900/40">
                    <td className="p-2.5 font-bold text-cyan-300">GLO-02 Rules Architect</td>
                    <td className="p-2.5 text-center text-emerald-400 font-bold">YES</td>
                    <td className="p-2.5">Ambiguous foundational rule or conflicting zone procedures</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-300">GLO-03 Timing Architect</td>
                    <td className="p-2.5 text-center text-emerald-400 font-bold">YES</td>
                    <td className="p-2.5">Unresolved timing contradiction, infinite loop, or non-deterministic chain</td>
                  </tr>
                  <tr className="bg-stone-900/40">
                    <td className="p-2.5 font-bold text-rose-300">GLO-14 Red-Team / Exploit Hunter</td>
                    <td className="p-2.5 text-center text-emerald-400 font-bold">YES</td>
                    <td className="p-2.5">Critical exploit, sacrifice loop, or deterministic lockout found</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-purple-300">Nuance Council (NUA-01..08)</td>
                    <td className="p-2.5 text-center text-emerald-400 font-bold">YES (at N4/N5)</td>
                    <td className="p-2.5">Critical or Systemic nuance finding</td>
                  </tr>
                  <tr className="bg-stone-900/40">
                    <td className="p-2.5 font-bold text-stone-400">CMD-02 Question Architect</td>
                    <td className="p-2.5 text-center text-stone-500 font-bold">NO</td>
                    <td className="p-2.5 text-stone-500">Inquiry authority only (generates question trees)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-stone-400">GLO-07 Card Designer</td>
                    <td className="p-2.5 text-center text-stone-500 font-bold">NO</td>
                    <td className="p-2.5 text-stone-500">Proposal authority only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Universal Prohibitions Banner */}
            <div className="mt-4 p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-xs space-y-1.5 text-red-200">
              <span className="font-bold text-red-300 block font-mono">NON-NEGOTIABLE UNIVERSAL PROHIBITIONS:</span>
              <p>1. <strong className="text-white">No Majority Voting:</strong> 7 agents voting YES does not override 1 Red-Team finding of an infinite loop.</p>
              <p>2. <strong className="text-white">Anti-Hallucination:</strong> Missing canon must be marked <code className="bg-stone-900 px-1 rounded text-amber-300">SOURCE-PENDING</code> or <code className="bg-stone-900 px-1 rounded text-amber-300">UNRECOVERED</code>.</p>
              <p>3. <strong className="text-white">No Self-Locking:</strong> Proposers cannot mark their own artifacts LOCKED.</p>
              <p>4. <strong className="text-white">No Silent Overwrites:</strong> Lower source tiers may never overwrite higher source tiers.</p>
            </div>
          </div>
        )}

        {/* SECTION 5 & 6: SOURCE TIERS, NUANCE & ESCALATION */}
        {(selectedSection === 'all' || selectedSection === 'sec-5' || selectedSection === 'sec-6') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 7-Tier Hierarchy */}
            <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                <h3 className="text-base font-cinzel font-bold text-amber-200">
                  5. Source-of-Truth 7-Tier Hierarchy
                </h3>
                <span className="text-[10px] font-mono text-stone-400 uppercase bg-stone-800 px-2 py-0.5 rounded">
                  Sec 5.0
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 rounded bg-amber-950/60 border border-amber-500/40 text-amber-200">
                  <strong>Tier 1: LOCKED CURRENT CANON</strong> — Supreme game law; official rules & finalized cards.
                </div>
                <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-300">
                  <strong>Tier 2: APPROVED CURRENT DESIGN</strong> — High-priority working design; requires Director sign-off.
                </div>
                <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-300">
                  <strong>Tier 3: TESTING / PROTOTYPE</strong> — Sandbox cards & experimental mechanics under simulation.
                </div>
                <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-300">
                  <strong>Tier 4: RECOVERED HISTORICAL</strong> — Authentic historical files (proves existence, not current law).
                </div>
                <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-300">
                  <strong>Tier 5: WORLD / ART CODEX</strong> — Lore & concept artwork (inspires, does not auto-become mechanics).
                </div>
                <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-400">
                  <strong>Tier 6: NEW DESIGN PROPOSAL</strong> — Newly generated ideas undergoing Question Tree review.
                </div>
                <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-500">
                  <strong>Tier 7: SPECULATION / BRAINSTORM</strong> — Unstructured user ideas handled via Question-First protocol.
                </div>
              </div>
            </div>

            {/* Nuance & Escalation */}
            <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                <h3 className="text-base font-cinzel font-bold text-amber-200">
                  6. Nuance Severity (N0-N5) & Escalation (E0-E5)
                </h3>
                <span className="text-[10px] font-mono text-stone-400 uppercase bg-stone-800 px-2 py-0.5 rounded">
                  Sec 6.0
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-mono font-bold text-rose-300 block mb-1">Nuance Scale:</span>
                  <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                    <div className="p-1.5 rounded bg-stone-950 text-stone-400">N0: Observation</div>
                    <div className="p-1.5 rounded bg-stone-950 text-stone-300">N1: Minor Advisory</div>
                    <div className="p-1.5 rounded bg-stone-950 text-amber-300">N2: Meaningful</div>
                    <div className="p-1.5 rounded bg-stone-950 text-amber-400">N3: Major Risk</div>
                    <div className="p-1.5 rounded bg-red-950/60 text-red-300 border border-red-800/60">N4: Critical (BLOCKS)</div>
                    <div className="p-1.5 rounded bg-red-950 text-red-200 border border-red-700 font-bold">N5: Systemic Lock</div>
                  </div>
                </div>
                <div>
                  <span className="font-mono font-bold text-amber-300 block mb-1">Escalation Ladder:</span>
                  <div className="text-[11px] font-mono text-stone-300 space-y-1 bg-stone-950 p-2.5 rounded border border-stone-800">
                    <div><strong>E0:</strong> Single-agent autonomous resolution</div>
                    <div><strong>E1:</strong> Peer A vs Peer B evidence comparison by CMD-01</div>
                    <div><strong>E2:</strong> Discipline trade-off (Balance vs Domain Director)</div>
                    <div><strong>E3:</strong> Multi-system collision (Nuance Council activated)</div>
                    <div><strong>E4:</strong> Foundational identity decision to Project Owner</div>
                    <div><strong>E5:</strong> Supreme Creative philosophy to Human Owner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7, 8, 9: ROADMAP & IMMEDIATE STAGE B ACTION */}
        {(selectedSection === 'all' || selectedSection === 'sec-7' || selectedSection === 'sec-8' || selectedSection === 'sec-9') && (
          <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <h3 className="text-lg font-cinzel font-bold text-cyan-200">
                  7, 8 & 9. Roadmap Execution & Immediate Action
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase bg-stone-800 px-2 py-0.5 rounded">
                Sec 7.0 - 9.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono">
                <span className="text-amber-400 font-bold block mb-2 font-cinzel">Stage Pipeline Sequence (Stages A-F Built)</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="text-emerald-400 font-bold flex items-center justify-between">
                    <span>✓ STAGE A: Command Layer (CMD-01 & CMD-02)</span>
                    <span className="text-[10px] text-emerald-500 bg-emerald-950/60 px-1.5 py-0.2 rounded">LOCKED</span>
                  </div>
                  <div className="text-emerald-400 font-bold flex items-center justify-between">
                    <span>✓ STAGE B: Foundational Council (GLO-01..06)</span>
                    <span className="text-[10px] text-emerald-500 bg-emerald-950/60 px-1.5 py-0.2 rounded">LOCKED</span>
                  </div>
                  <div className="text-rose-400 font-bold flex items-center justify-between">
                    <span>✓ STAGE C: Core Validation (GLO-10..15)</span>
                    <span className="text-[10px] text-rose-500 bg-rose-950/60 px-1.5 py-0.2 rounded">ACTIVE</span>
                  </div>
                  <div className="text-purple-400 font-bold flex items-center justify-between">
                    <span>✓ STAGE D: Nuance Council (NUA-01..08)</span>
                    <span className="text-[10px] text-purple-500 bg-purple-950/60 px-1.5 py-0.2 rounded">ACTIVE</span>
                  </div>
                  <div className="text-emerald-300 font-bold flex items-center justify-between">
                    <span>✓ STAGE E: Content & Experience (GLO-07..23)</span>
                    <span className="text-[10px] text-emerald-500 bg-emerald-950/60 px-1.5 py-0.2 rounded">ACTIVE</span>
                  </div>
                  <div className="text-amber-300 font-bold flex items-center justify-between">
                    <span>✓ STAGE F: Five Domain Directorates & Matchups</span>
                    <span className="text-[10px] text-amber-500 bg-amber-950/60 px-1.5 py-0.2 rounded">ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-cyan-500/30 font-mono">
                <span className="text-cyan-400 font-bold block mb-2 font-cinzel">Studio Stage Quick Jump Navigator</span>
                <p className="text-stone-300 text-[11px] leading-relaxed mb-3">
                  All 6 core architectural stages are fully constructed and connected in the Studio Operating System:
                </p>
                {onNavigateToTab && (
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <button
                      onClick={() => onNavigateToTab('question-architect')}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-bold hover:bg-cyan-900/50 transition flex items-center justify-between"
                    >
                      <span>Stage A2: CMD-02</span>
                      <ArrowRight size={11} />
                    </button>
                    <button
                      onClick={() => onNavigateToTab('foundational-council')}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-900/50 transition flex items-center justify-between"
                    >
                      <span>Stage B: Foundations</span>
                      <ArrowRight size={11} />
                    </button>
                    <button
                      onClick={() => onNavigateToTab('validation-council')}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-300 font-bold hover:bg-rose-900/50 transition flex items-center justify-between"
                    >
                      <span>Stage C: Validation</span>
                      <ArrowRight size={11} />
                    </button>
                    <button
                      onClick={() => onNavigateToTab('nuance-council')}
                      className="px-2.5 py-1.5 rounded-lg bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-900/50 transition flex items-center justify-between"
                    >
                      <span>Stage D: Nuance</span>
                      <ArrowRight size={11} />
                    </button>
                    <button
                      onClick={() => onNavigateToTab('content-experience')}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-bold hover:bg-emerald-900/50 transition flex items-center justify-between"
                    >
                      <span>Stage E: Content & UX</span>
                      <ArrowRight size={11} />
                    </button>
                    <button
                      onClick={() => onNavigateToTab('domain-directorates')}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-900/50 transition flex items-center justify-between"
                    >
                      <span>Stage F: Domains</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
