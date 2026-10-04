import React, { useState } from 'react';
import { 
  NUANCE_SPECIALISTS, 
  NUANCE_LEVELS, 
  ESCALATION_LEVELS, 
  AUDIT_DOSSIERS,
  NuanceSpecialistProfile,
  NuanceAuditReport 
} from '../../data/nuanceCouncilData';
import { 
  Eye, 
  AlertTriangle, 
  ShieldAlert, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Compass, 
  FileText, 
  Zap, 
  HelpCircle,
  Cpu
} from 'lucide-react';

export const NuanceCouncilView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit-sandbox' | 'specialists' | 'nuance-scale' | 'escalation-ladder'>('audit-sandbox');
  const [selectedAudit, setSelectedAudit] = useState<NuanceAuditReport>(AUDIT_DOSSIERS[0]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<NuanceSpecialistProfile>(NUANCE_SPECIALISTS[2]); // NUA-03 Tilt

  // Live Audit Sandbox Inputs
  const [customCardName, setCustomCardName] = useState<string>('Void Rift Extinction');
  const [customMechanic, setCustomMechanic] = useState<string>('4 Essence Fast Spell: Destroy all units in all 3 lanes, then both players discard all cards in hand.');
  const [liveTiltScore, setLiveTiltScore] = useState<number>(9.2);
  const [liveSeverity, setLiveSeverity] = useState<'N4' | 'N5' | 'N3' | 'N2' | 'N1'>('N4');

  const recalculateLiveAudit = (mechanic: string) => {
    setCustomMechanic(mechanic);
    const lower = mechanic.toLowerCase();
    if (lower.includes('discard all') || lower.includes('destroy all') || lower.includes('skip turn') || lower.includes('cannot play')) {
      setLiveTiltScore(9.2);
      setLiveSeverity('N4');
    } else if (lower.includes('random') || lower.includes('50%')) {
      setLiveTiltScore(7.5);
      setLiveSeverity('N3');
    } else {
      setLiveTiltScore(2.8);
      setLiveSeverity('N1');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-stone-900/90 border-2 border-purple-500/40 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Eye size={240} className="text-purple-400" />
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border-2 border-purple-400/60 flex items-center justify-center text-purple-300 shrink-0 shadow-lg shadow-purple-500/20">
              <Eye size={32} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500 text-stone-950 uppercase tracking-wider">
                  STAGE D: THE 8-SPECIALIST NUANCE COUNCIL
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                  NUA-01 through NUA-08
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800/60">
                  N4 / N5 BLOCKS LOCKED STATUS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-100 tracking-wide">
                Qualitative Auditing, Tilt Prevention & Nuance Grading
              </h2>
              <p className="text-stone-300 text-sm max-w-3xl mt-1 leading-relaxed">
                The qualitative conscience of the Studio. Examines subjective nuance, player tilt index, linguistic clarity, future design traps, digital haptics, and physical tabletop ergonomics across the N0–N5 scale and E0–E5 escalation ladder.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('audit-sandbox')}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-700/60 flex items-center gap-1.5 transition"
            >
              <AlertTriangle size={14} className="text-purple-400" />
              <span>Nuance Audit Sandbox</span>
            </button>
            <button
              onClick={() => setActiveTab('escalation-ladder')}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 flex items-center gap-1.5 transition"
            >
              <Scale size={14} className="text-amber-400" />
              <span>E0-E5 Ladder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin border-b border-stone-800">
        <button
          onClick={() => setActiveTab('audit-sandbox')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'audit-sandbox'
              ? 'bg-purple-500 text-stone-950 border-purple-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-purple-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <AlertTriangle size={14} />
          <span>Live Nuance Audit Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('specialists')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'specialists'
              ? 'bg-purple-500 text-stone-950 border-purple-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-purple-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Cpu size={14} />
          <span>8 Nuance Specialists Registry</span>
        </button>

        <button
          onClick={() => setActiveTab('nuance-scale')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'nuance-scale'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-amber-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <FileText size={14} />
          <span>Nuance Scale (N0 to N5)</span>
        </button>

        <button
          onClick={() => setActiveTab('escalation-ladder')}
          className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2 whitespace-nowrap transition border ${
            activeTab === 'escalation-ladder'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
              : 'bg-stone-900/80 text-amber-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          <Scale size={14} />
          <span>Escalation Ladder (E0 to E5)</span>
        </button>
      </div>

      {/* ================= TAB 1: AUDIT SANDBOX ================= */}
      {activeTab === 'audit-sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Dossier Selection & Live Tester */}
          <div className="flex flex-col gap-4">
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 flex flex-col gap-3">
              <span className="text-xs font-cinzel font-bold text-purple-300 uppercase tracking-wider block">
                Pre-Audited Case Dossiers
              </span>
              <div className="space-y-2">
                {AUDIT_DOSSIERS.map(dossier => (
                  <button
                    key={dossier.id}
                    onClick={() => {
                      setSelectedAudit(dossier);
                      setCustomCardName(dossier.cardName);
                      recalculateLiveAudit(dossier.mechanicProposal);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition ${
                      selectedAudit.id === dossier.id
                        ? 'bg-purple-950/60 border-purple-500/70 shadow-md'
                        : 'bg-stone-950 border-stone-800 hover:bg-stone-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-stone-200">{dossier.id}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        dossier.aggregateSeverity === 'N4_CRITICAL'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        {dossier.aggregateSeverity.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs font-cinzel font-bold text-stone-100">{dossier.cardName}</div>
                    <div className="text-[11px] text-stone-400 mt-1 line-clamp-1">{dossier.mechanicProposal}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Input Box */}
            <div className="bg-stone-900/80 border border-purple-500/30 rounded-2xl p-4 flex flex-col gap-3">
              <span className="text-xs font-cinzel font-bold text-purple-300 uppercase tracking-wider block">
                Live Mechanic Stress Tester
              </span>
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-mono text-stone-400 block mb-1">Card Name:</label>
                  <input
                    type="text"
                    value={customCardName}
                    onChange={(e) => setCustomCardName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200 font-cinzel focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-stone-400 block mb-1">Card Mechanics Text:</label>
                  <textarea
                    rows={3}
                    value={customMechanic}
                    onChange={(e) => recalculateLiveAudit(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 font-mono focus:outline-none focus:border-purple-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Dynamic Tilt Score Indicator */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-stone-400">Estimated Player Tilt Index:</span>
                  <span className={`font-bold ${liveTiltScore >= 7 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {liveTiltScore} / 10
                  </span>
                </div>
                <div className="w-full bg-stone-900 rounded-full h-2 overflow-hidden border border-stone-800">
                  <div 
                    className={`h-full transition-all duration-300 ${liveTiltScore >= 7 ? 'bg-red-500' : 'bg-emerald-400'}`}
                    style={{ width: `${liveTiltScore * 10}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-mono text-stone-400 block">
                  {liveTiltScore >= 7 ? '⚠️ Exceeds 7.0 Tilt Threshold -> Blocks LOCKED status without revision.' : '✓ Within healthy competitive tolerance.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 8-Specialist Panel Evaluation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3 mb-4">
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-stone-100">{customCardName}</h3>
                  <p className="text-xs font-mono text-stone-400 mt-0.5">{customMechanic}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
                    liveSeverity === 'N4' || liveSeverity === 'N5'
                      ? 'bg-red-950 text-red-300 border border-red-700'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  }`}>
                    {liveSeverity === 'N4' || liveSeverity === 'N5' ? <XCircle size={13} /> : <CheckCircle2 size={13} />}
                    <span>{liveSeverity === 'N4' || liveSeverity === 'N5' ? 'LOCKED STATUS BLOCKED' : 'APPROVED FOR TIER 2'}</span>
                  </span>
                </div>
              </div>

              {/* Specialist Feedback Rows */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block">
                  Nuance Council Specialist Findings:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-300">NUA-03: Tilt & Frustration</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${liveTiltScore >= 7 ? 'bg-red-950 text-red-300' : 'bg-emerald-950 text-emerald-300'}`}>
                        {liveSeverity} Score
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {liveTiltScore >= 7
                        ? 'Symmetric full-board wipe combined with total hand discard destroys all player agency and tactical equity.'
                        : 'Interactive mechanic provides counterplay and preserves board agency.'}
                    </p>
                    <div className="text-[11px] font-mono text-amber-300 pt-1 border-t border-stone-800">
                      <strong>Fix:</strong> Add conditional cost or limit discard to 1 targeted card.
                    </div>
                  </div>

                  <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-300">NUA-04: Future Design Space</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold bg-amber-950 text-amber-300">
                        N3 Score
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Wiping all 3 lanes simultaneously limits the viability of future token-based or formation-based archetypes.
                    </p>
                    <div className="text-[11px] font-mono text-amber-300 pt-1 border-t border-stone-800">
                      <strong>Fix:</strong> Target a single lane or require 1-round telegraph window.
                    </div>
                  </div>

                  <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-300">NUA-02: Linguistic Ambiguity</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold bg-emerald-950 text-emerald-300">
                        N0 Score
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Phrasing uses unambiguous global qualifiers ("all units in all 3 lanes"). No parsing ambiguity detected.
                    </p>
                  </div>

                  <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-300">NUA-08: Mechanical Elegance</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold bg-amber-950 text-amber-300">
                        N2 Score
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Stitching two severe catastrophic effects together feels heavy-handed rather than strategically nuanced.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: 8 SPECIALISTS REGISTRY ================= */}
      {activeTab === 'specialists' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {NUANCE_SPECIALISTS.map(spec => (
            <div
              key={spec.id}
              onClick={() => setSelectedSpecialist(spec)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                selectedSpecialist.id === spec.id
                  ? 'bg-stone-900 border-purple-500/70 shadow-lg'
                  : 'bg-stone-950/80 border-stone-800 hover:bg-stone-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-purple-950 text-purple-300 border border-purple-800/50 font-bold">
                    {spec.code}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500">Tier 1 Nuance</span>
                </div>
                <h4 className="text-sm font-cinzel font-bold text-stone-100 mb-1">{spec.name}</h4>
                <p className="text-xs text-stone-400 leading-relaxed mb-3">{spec.mandate}</p>
              </div>

              <div className="text-[11px] font-mono text-red-300/90 pt-2 border-t border-stone-800">
                <strong>Block Trigger:</strong> {spec.blockTrigger}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 3: NUANCE SCALE (N0 TO N5) ================= */}
      {activeTab === 'nuance-scale' && (
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col gap-4">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-cinzel font-bold text-amber-300">
              Canonical 6-Tier Nuance Severity Scale (N0 through N5)
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Nuance scores dictate lock-blocking authority and required resolution pathways.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-stone-950 text-stone-400 border-b border-stone-800">
                  <th className="p-3">Level</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Qualitative Impact</th>
                  <th className="p-3 text-center">Blocks LOCK?</th>
                  <th className="p-3">Enforced Resolution Pathway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-300">
                {NUANCE_LEVELS.map(lvl => (
                  <tr key={lvl.level} className={lvl.canBlockLock ? 'bg-red-950/20' : ''}>
                    <td className="p-3 font-bold" style={{ color: lvl.colorHex }}>{lvl.level}</td>
                    <td className="p-3 font-bold text-stone-200">{lvl.name}</td>
                    <td className="p-3 text-stone-400">{lvl.impact}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lvl.canBlockLock ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-stone-800 text-stone-400'
                      }`}>
                        {lvl.canBlockLock ? 'YES (BLOCKS)' : 'NO (ADVISORY)'}
                      </span>
                    </td>
                    <td className="p-3 text-stone-300">{lvl.requiredAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: ESCALATION LADDER (E0 TO E5) ================= */}
      {activeTab === 'escalation-ladder' && (
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col gap-4">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-cinzel font-bold text-amber-300">
              Dispute Escalation Ladder (E0 through E5)
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Structured protocol for escalating design disagreements without circular debate or deadlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ESCALATION_LEVELS.map(esc => (
              <div key={esc.level} className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">{esc.level}: {esc.name}</span>
                </div>
                <div className="text-[11px] text-purple-300"><strong>Authority:</strong> {esc.authority}</div>
                <p className="text-xs text-stone-300 leading-relaxed">{esc.resolutionMechanism}</p>
                <div className="text-[10px] text-stone-500 pt-2 border-t border-stone-800">
                  <strong>Example:</strong> {esc.examples}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
