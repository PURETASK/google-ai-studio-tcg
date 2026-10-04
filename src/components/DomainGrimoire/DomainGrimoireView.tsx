import React, { useState } from 'react';
import { 
  DOMAIN_PROFILES, 
  DUAL_DOMAIN_SYNERGIES, 
  DomainProfile, 
  DomainSpecialAbility 
} from '../../data/domainAbilitiesData';
import { soundEngine } from '../../utils/audioEngine';
import { 
  Shield, 
  Flame, 
  Sparkles, 
  Zap, 
  Skull, 
  Layers, 
  Crosshair, 
  Compass, 
  Activity, 
  CheckCircle2, 
  Info, 
  Play, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  Search, 
  Dices, 
  Sword, 
  Heart, 
  AlertTriangle,
  ChevronRight,
  Eye,
  Sliders,
  Award
} from 'lucide-react';

interface DomainGrimoireViewProps {
  onInspectCard?: (cardName: string) => void;
  onNavigateToArena?: () => void;
}

export const DomainGrimoireView: React.FC<DomainGrimoireViewProps> = ({
  onInspectCard,
  onNavigateToArena
}) => {
  const [selectedDomainId, setSelectedDomainId] = useState<'Sanctuary' | 'Radiance' | 'Verdance' | 'Arcane' | 'Abyss'>('Sanctuary');
  const [activeSubTab, setActiveSubTab] = useState<'abilities' | 'philosophy' | 'lanes' | 'hazards' | 'duals' | 'simulator'>('abilities');
  const [selectedAbility, setSelectedAbility] = useState<DomainSpecialAbility>(DOMAIN_PROFILES[0].abilities[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Ability Combat Simulator State
  const [simState, setSimState] = useState<{
    playerEssence: number;
    playerMomentum: number;
    playerHp: number;
    playerShield: number;
    vanguardUnitHp: number;
    vanguardUnitArmor: number;
    enemyHp: number;
    enemyVanguardHp: number;
    enemyVanguardShield: number;
    targetLane: 'Left Flank' | 'Center Vanguard' | 'Right Flank';
    actionLogs: string[];
    lastResolution: string | null;
  }>({
    playerEssence: 7,
    playerMomentum: 6,
    playerHp: 30,
    playerShield: 4,
    vanguardUnitHp: 6,
    vanguardUnitArmor: 2,
    enemyHp: 30,
    enemyVanguardHp: 7,
    enemyVanguardShield: 3,
    targetLane: 'Center Vanguard',
    actionLogs: ['Simulator Initialized: 30 HP Commanders, standard 3-Lane board state ready.'],
    lastResolution: null
  });

  const activeDomain = DOMAIN_PROFILES.find(d => d.id === selectedDomainId) || DOMAIN_PROFILES[0];

  const handleSelectDomain = (domainId: 'Sanctuary' | 'Radiance' | 'Verdance' | 'Arcane' | 'Abyss') => {
    setSelectedDomainId(domainId);
    const domain = DOMAIN_PROFILES.find(d => d.id === domainId);
    if (domain && domain.abilities.length > 0) {
      setSelectedAbility(domain.abilities[0]);
    }
    soundEngine.playMicroSound('click');
  };

  const handleExecuteSimAbility = (ability: DomainSpecialAbility) => {
    // Check costs
    if (simState.playerEssence < ability.essenceCost) {
      soundEngine.playMicroSound('error');
      setSimState(prev => ({
        ...prev,
        actionLogs: [`❌ Cannot cast ${ability.name}: Insufficient Essence (${prev.playerEssence}/${ability.essenceCost})`, ...prev.actionLogs]
      }));
      return;
    }
    if (simState.playerMomentum < ability.momentumCost) {
      soundEngine.playMicroSound('error');
      setSimState(prev => ({
        ...prev,
        actionLogs: [`❌ Cannot cast ${ability.name}: Insufficient Momentum (${prev.playerMomentum}/${ability.momentumCost})`, ...prev.actionLogs]
      }));
      return;
    }
    if (ability.momentumThreshold && simState.playerMomentum < ability.momentumThreshold) {
      soundEngine.playMicroSound('error');
      setSimState(prev => ({
        ...prev,
        actionLogs: [`❌ Cannot cast ${ability.name}: Requires ${ability.momentumThreshold}+ Momentum Threshold (You have ${prev.playerMomentum})`, ...prev.actionLogs]
      }));
      return;
    }

    soundEngine.playCombatClash('spell');

    // Simulate domain ability impact
    let newPlayerEssence = simState.playerEssence - ability.essenceCost;
    let newPlayerMomentum = simState.playerMomentum - ability.momentumCost;
    let newPlayerHp = simState.playerHp;
    let newPlayerShield = simState.playerShield;
    let newVanguardHp = simState.vanguardUnitHp;
    let newVanguardArmor = simState.vanguardUnitArmor;
    let newEnemyHp = simState.enemyHp;
    let newEnemyVanguardHp = simState.enemyVanguardHp;
    let newEnemyVanguardShield = simState.enemyVanguardShield;
    let logMsg = '';

    if (ability.id.startsWith('sanc')) {
      newPlayerShield += 4;
      newVanguardArmor += 1;
      logMsg = `✨ [Sanctuary] ${ability.name} cast! +4 Shield points gained on Commander, +1 Armor buffed on Center Vanguard.`;
    } else if (ability.id.startsWith('rad')) {
      newEnemyVanguardShield = 0;
      newEnemyVanguardHp = Math.max(0, newEnemyVanguardHp - 5);
      newEnemyHp = Math.max(0, newEnemyHp - 2);
      logMsg = `🔥 [Radiance] ${ability.name} detonated! Enemy Vanguard Shield sundered to 0, 5 direct Fire damage dealt, 2 splash damage to Commander!`;
    } else if (ability.id.startsWith('ver')) {
      newVanguardHp += 4;
      newPlayerHp = Math.min(30, newPlayerHp + 2);
      logMsg = `🌿 [Verdance] ${ability.name} triggered! Vanguard unit mutated (+4 HP), Commander restored 2 Biomass Health.`;
    } else if (ability.id.startsWith('arc')) {
      newEnemyVanguardHp = Math.max(0, newEnemyVanguardHp - 3);
      newPlayerEssence += 2;
      logMsg = `🌀 [Arcane] ${ability.name} resolved! Enemy placed in Chrono-Stasis for 1 turn, siphoned +2 Essence back to player!`;
    } else if (ability.id.startsWith('aby')) {
      newEnemyVanguardHp = 0;
      newPlayerHp = Math.max(1, newPlayerHp - 2);
      newEnemyHp = Math.max(0, newEnemyHp - 4);
      logMsg = `💀 [Abyss] ${ability.name} executed! Paid 2 Commander Health -> Enemy Vanguard destroyed with Deathtouch, drained 4 Health from enemy!`;
    }

    setSimState(prev => ({
      ...prev,
      playerEssence: newPlayerEssence,
      playerMomentum: newPlayerMomentum,
      playerHp: newPlayerHp,
      playerShield: newPlayerShield,
      vanguardUnitHp: newVanguardHp,
      vanguardUnitArmor: newVanguardArmor,
      enemyHp: newEnemyHp,
      enemyVanguardHp: newEnemyVanguardHp,
      enemyVanguardShield: newEnemyVanguardShield,
      actionLogs: [logMsg, ...prev.actionLogs.slice(0, 8)],
      lastResolution: `Ability '${ability.name}' successfully resolved via Aether Chain Layer 6.`
    }));
  };

  const handleResetSim = () => {
    soundEngine.playMicroSound('click');
    setSimState({
      playerEssence: 7,
      playerMomentum: 6,
      playerHp: 30,
      playerShield: 4,
      vanguardUnitHp: 6,
      vanguardUnitArmor: 2,
      enemyHp: 30,
      enemyVanguardHp: 7,
      enemyVanguardShield: 3,
      targetLane: 'Center Vanguard',
      actionLogs: ['🔄 Simulator Reset: Fresh 30 HP match state re-initialized.'],
      lastResolution: null
    });
  };

  const filteredAbilities = activeDomain.abilities.filter(ab => 
    ab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ab.rulesEffectText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ab.abilityCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 max-w-full pb-16">
      
      {/* ================= HERO HEADER ================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-cinzel tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                5 Domain Sovereignties & Powers Grimoire
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                CRD Rulebook v3.5
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              DOMAIN POWERS, MECHANICS & SKILLS GRIMOIRE
            </h1>
            <p className="text-sm sm:text-base text-stone-300 mt-2 max-w-3xl leading-relaxed">
              Exhaustive technical codification of all 5 Inverted Domains. Explore specialized domain-exclusive skills, mathematical step-by-step resolutions, lane combat formations, hazard synergies, and test abilities in the live combat sandbox.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto">
            {onNavigateToArena && (
              <button
                onClick={onNavigateToArena}
                id="grimoire-launch-arena"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-cinzel font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <Sword size={16} />
                <span>Launch Arena Duel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= 5 DOMAIN SELECTOR BAR ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {DOMAIN_PROFILES.map((domain) => {
          const isSelected = selectedDomainId === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => handleSelectDomain(domain.id)}
              id={`domain-tab-${domain.id.toLowerCase()}`}
              className={`p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden border ${
                isSelected
                  ? `${domain.borderColor} bg-gradient-to-b ${domain.bgGradient} shadow-xl scale-[1.02]`
                  : 'border-stone-800 bg-stone-900/60 hover:bg-stone-800/80 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{domain.sigil}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isSelected ? 'bg-amber-500/20 text-amber-200 border-amber-500/40' : 'bg-stone-800 text-stone-400 border-stone-700'
                }`}>
                  {domain.abilities?.length || 0} Skills
                </span>
              </div>
              <h3 className={`font-cinzel font-bold text-base ${isSelected ? 'text-amber-200' : 'text-stone-200'}`}>
                {domain.displayName}
              </h3>
              <p className="text-[11px] text-stone-400 line-clamp-1 mt-1">
                {domain.accentBadge}
              </p>
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* ================= SUB-NAVIGATION TABS ================= */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          <button
            onClick={() => { setActiveSubTab('abilities'); soundEngine.playMicroSound('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'abilities'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Zap size={14} />
            <span>Special Skills & Abilities ({activeDomain?.abilities?.length || 0})</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('simulator'); soundEngine.playMicroSound('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'simulator'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Play size={14} />
            <span>Live Ability Combat Lab</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('philosophy'); soundEngine.playMicroSound('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'philosophy'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <BookOpen size={14} />
            <span>Philosophy & Inversion</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('lanes'); soundEngine.playMicroSound('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'lanes'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Compass size={14} />
            <span>3-Lane Combat Formations</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('hazards'); soundEngine.playMicroSound('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'hazards'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Activity size={14} />
            <span>Hazard Resonance & Deck</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('duals'); soundEngine.playMicroSound('click'); }}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'duals'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Layers size={14} />
            <span>Dual-Domain Synergy (10)</span>
          </button>
        </div>

        {activeSubTab === 'abilities' && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500" size={14} />
            <input
              type="text"
              placeholder="Search domain skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}
      </div>

      {/* ================= TAB 1: SPECIAL SKILLS & ABILITIES ================= */}
      {activeSubTab === 'abilities' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left List of Abilities */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="text-xs font-mono text-stone-400 uppercase tracking-wider px-1">
              Select Ability to Inspect Details:
            </div>

            {filteredAbilities.map((ab) => {
              const isSelected = selectedAbility.id === ab.id;
              return (
                <div
                  key={ab.id}
                  onClick={() => { setSelectedAbility(ab); soundEngine.playMicroSound('click'); }}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-stone-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-stone-950/70 border-stone-800/80 hover:bg-stone-900/60 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{ab.glyphIcon}</span>
                      <h4 className="font-cinzel font-bold text-sm text-stone-100">{ab.name}</h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700">
                      {ab.abilityCategory}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 mb-2 leading-relaxed">
                    {ab.rulesEffectText}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">💎 {ab.essenceCost} Essence</span>
                      <span className="text-cyan-400">⚡ {ab.momentumCost} Momentum</span>
                    </div>
                    <span className="text-stone-400">{ab.speedClass.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Deep-Dive Inspection Card */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/90 border border-amber-500/30 shadow-2xl flex flex-col gap-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">{selectedAbility.glyphIcon}</span>
                    <h2 className="text-xl sm:text-2xl font-black font-cinzel text-amber-200">
                      {selectedAbility.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {selectedAbility.domain} Exclusive
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {selectedAbility.abilityCategory}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                      {selectedAbility.speedClass}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center min-w-[70px]">
                    <div className="text-[10px] font-mono text-stone-500 uppercase">Essence</div>
                    <div className="text-lg font-bold text-amber-400">{selectedAbility.essenceCost}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center min-w-[70px]">
                    <div className="text-[10px] font-mono text-stone-500 uppercase">Momentum</div>
                    <div className="text-lg font-bold text-cyan-400">{selectedAbility.momentumCost}</div>
                  </div>
                  {selectedAbility.momentumThreshold && (
                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-center min-w-[70px]">
                      <div className="text-[10px] font-mono text-purple-400 uppercase">Gated ≥</div>
                      <div className="text-lg font-bold text-purple-300">{selectedAbility.momentumThreshold}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Exact Rules Effect Text */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Info size={14} />
                  <span>Codified Card Text & Rules Clause:</span>
                </div>
                <p className="text-sm sm:text-base text-stone-100 font-serif leading-relaxed italic">
                  "{selectedAbility.rulesEffectText}"
                </p>
                {selectedAbility.diceFormula && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-mono text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded border border-yellow-500/20">
                    <Dices size={14} />
                    <span>Dice Resolution Equation: <strong>{selectedAbility.diceFormula}</strong></span>
                  </div>
                )}
              </div>

              {/* Step-by-Step Resolution Pipeline */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                  Deterministic Step-by-Step Resolution:
                </h4>
                <div className="flex flex-col gap-2">
                  {selectedAbility.stepByStepResolution.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300 font-mono flex items-start gap-2">
                      <ChevronRight size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lane Synergy & Hazard Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-amber-400">
                    <Compass size={14} />
                    <span>Spatial Lane Strategy ({selectedAbility.laneSynergy.recommendedLane})</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {selectedAbility.laneSynergy.spatialTactic}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-emerald-400">
                    <Activity size={14} />
                    <span>Hazard Resonance ({selectedAbility.hazardInteraction.synergisticHazard})</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {selectedAbility.hazardInteraction.hazardInteractionRule}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between flex-wrap gap-3 border-t border-stone-800 pt-4">
                <div className="text-xs text-stone-400 flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-500" />
                  <span><strong>Counterplay:</strong> {selectedAbility.counterplayTip}</span>
                </div>

                <button
                  onClick={() => {
                    setActiveSubTab('simulator');
                    handleExecuteSimAbility(selectedAbility);
                  }}
                  id="btn-test-in-simulator"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs flex items-center gap-2 transition-all shadow"
                >
                  <Play size={14} />
                  <span>Test in Live Simulator</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: LIVE ABILITY COMBAT LAB ================= */}
      {activeSubTab === 'simulator' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Interactive Board State HUD */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <h3 className="font-cinzel font-bold text-lg text-amber-200 flex items-center gap-2">
                    <Sliders size={18} className="text-amber-500" />
                    <span>Interactive 3-Lane Combat Grid</span>
                  </h3>
                  <button
                    onClick={handleResetSim}
                    className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    <RotateCcw size={12} />
                    <span>Reset Board</span>
                  </button>
                </div>

                {/* Opponent Zone (Top) */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono text-red-300">
                    <span className="flex items-center gap-1 font-bold">
                      <Skull size={14} /> Enemy Commander
                    </span>
                    <span>Health: {simState.enemyHp}/30 HP</span>
                  </div>
                  
                  {/* Enemy Lanes */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-500">
                      Left Flank (Empty)
                    </div>
                    <div className="p-3 rounded bg-red-900/30 border border-red-500/40 text-red-200">
                      <div className="font-bold">Center Vanguard</div>
                      <div>HP: {simState.enemyVanguardHp} | Shield: {simState.enemyVanguardShield}</div>
                    </div>
                    <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-500">
                      Right Flank (Empty)
                    </div>
                  </div>
                </div>

                {/* Player Zone (Bottom) */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col gap-3">
                  {/* Player Lanes */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-500">
                      Left Flank (Ready)
                    </div>
                    <div className="p-3 rounded bg-amber-900/30 border border-amber-500/40 text-amber-200">
                      <div className="font-bold">Center Vanguard Guardian</div>
                      <div>HP: {simState.vanguardUnitHp} | Armor: {simState.vanguardUnitArmor}</div>
                    </div>
                    <div className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-500">
                      Right Flank (Ready)
                    </div>
                  </div>

                  {/* Player Resources Bar */}
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-amber-500/20 text-center font-mono text-xs">
                    <div className="p-2 rounded bg-stone-950 border border-stone-800">
                      <div className="text-stone-500 text-[10px]">VITALITY</div>
                      <div className="text-red-400 font-bold">{simState.playerHp}/30 HP</div>
                    </div>
                    <div className="p-2 rounded bg-stone-950 border border-stone-800">
                      <div className="text-stone-500 text-[10px]">SHIELD</div>
                      <div className="text-amber-300 font-bold">+{simState.playerShield}</div>
                    </div>
                    <div className="p-2 rounded bg-stone-950 border border-stone-800">
                      <div className="text-stone-500 text-[10px]">ESSENCE</div>
                      <div className="text-amber-400 font-bold">{simState.playerEssence}/10</div>
                    </div>
                    <div className="p-2 rounded bg-stone-950 border border-stone-800">
                      <div className="text-stone-500 text-[10px]">MOMENTUM</div>
                      <div className="text-cyan-400 font-bold">{simState.playerMomentum}/12</div>
                    </div>
                  </div>
                </div>

                {/* Resource Adjustment Controls */}
                <div className="flex items-center justify-between gap-3 text-xs font-mono bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <span>Manual Resource Tweaks:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSimState(p => ({ ...p, playerEssence: Math.min(10, p.playerEssence + 1) }))}
                      className="px-2 py-1 rounded bg-stone-800 text-amber-400 hover:bg-stone-700"
                    >
                      +1 Essence
                    </button>
                    <button
                      onClick={() => setSimState(p => ({ ...p, playerMomentum: Math.min(12, p.playerMomentum + 1) }))}
                      className="px-2 py-1 rounded bg-stone-800 text-cyan-400 hover:bg-stone-700"
                    >
                      +1 Momentum
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Ability Cast Actions & Aether Chain Log */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Cast Ability Panel */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col gap-3">
                <h4 className="font-cinzel font-bold text-sm text-stone-200">
                  Cast Active Domain Skill ({activeDomain.displayName}):
                </h4>
                
                <div className="flex flex-col gap-2">
                  {activeDomain.abilities.map(ab => (
                    <button
                      key={ab.id}
                      onClick={() => handleExecuteSimAbility(ab)}
                      className="p-3 rounded-xl bg-stone-950 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-500/50 text-left transition-all flex items-center justify-between"
                    >
                      <div>
                        <div className="font-cinzel font-bold text-xs text-amber-300 flex items-center gap-1.5">
                          <span>{ab.glyphIcon}</span>
                          <span>{ab.name}</span>
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                          Cost: {ab.essenceCost}E / {ab.momentumCost}M {ab.momentumThreshold ? `(Req ≥ ${ab.momentumThreshold}M)` : ''}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-cinzel font-bold text-[10px] border border-amber-500/30">
                        Cast
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Resolution Reel */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col gap-2 flex-1">
                <h4 className="font-cinzel font-bold text-xs text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity size={14} className="text-amber-500" />
                  <span>Aether Chain Resolution Reel:</span>
                </h4>
                
                <div className="flex flex-col gap-1.5 overflow-y-auto max-h-56 p-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono">
                  {simState.actionLogs.map((log, idx) => (
                    <div key={idx} className={`p-1.5 rounded ${idx === 0 ? 'bg-amber-500/10 text-amber-200 border border-amber-500/20' : 'text-stone-400'}`}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ================= TAB 3: PHILOSOPHY & INVERSION ================= */}
      {activeSubTab === 'philosophy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col gap-4">
            <h3 className="text-xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
              <BookOpen size={20} className="text-amber-500" />
              <span>The Inverted Philosophical Paradigm</span>
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              {activeDomain.invertedParadigmExplanation}
            </p>
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-400 font-mono">
              <span className="text-amber-400 font-bold">Pillar:</span> {activeDomain.philosophicalPillar}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col gap-4">
            <h3 className="text-xl font-cinzel font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-500" />
              <span>Strict Forbidden Mechanics</span>
            </h3>
            <p className="text-xs text-stone-400">
              To preserve distinct domain sovereignty and prevent homogenization, the following mechanics are strictly banned from {activeDomain.displayName}:
            </p>
            <div className="flex flex-col gap-2">
              {activeDomain.forbiddenMechanics.map((mech, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-xs text-red-300 font-mono flex items-center gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>{mech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: 3-LANE COMBAT FORMATIONS ================= */}
      {activeSubTab === 'lanes' && (
        <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-cinzel font-bold text-amber-200">
              {activeDomain.displayName} Spatial Lane Masterclass
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              How {activeDomain.displayName} deploys its units across the 3-Lane combat matrix to maximize line-of-sight protection and flank execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col gap-2">
              <div className="text-xs font-cinzel font-bold text-amber-400 flex items-center gap-1.5">
                <Compass size={14} />
                <span>Center Vanguard Lane</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeDomain.laneMastery.centerVanguard}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col gap-2">
              <div className="text-xs font-cinzel font-bold text-cyan-400 flex items-center gap-1.5">
                <Crosshair size={14} />
                <span>Left & Right Flank Lanes</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeDomain.laneMastery.flankLanes}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col gap-2">
              <div className="text-xs font-cinzel font-bold text-purple-400 flex items-center gap-1.5">
                <Shield size={14} />
                <span>Backline Sanctuary Zone</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeDomain.laneMastery.backlineSanctuary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: DUAL-DOMAIN SYNERGY ================= */}
      {activeSubTab === 'duals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DUAL_DOMAIN_SYNERGIES.map((dual) => (
            <div key={dual.id} className="p-5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 flex flex-col gap-3 shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{dual.icon}</span>
                  <h4 className="font-cinzel font-bold text-sm text-stone-100">{dual.name}</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {dual.badge}
                </span>
              </div>

              <div className="text-xs text-amber-200 font-mono">
                {dual.theme}
              </div>

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 font-serif italic">
                "{dual.signatureMove}"
              </div>

              <p className="text-xs text-stone-400 leading-relaxed">
                <strong>Strategy:</strong> {dual.strategicPlaystyle}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 6: HAZARDS RESONANCE ================= */}
      {activeSubTab === 'hazards' && (
        <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col gap-4">
          <h3 className="text-xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
            <Activity size={20} className="text-amber-500" />
            <span>Hazard Deck Construction & 1-Turn Delay Synergy</span>
          </h3>
          <p className="text-sm text-stone-300 leading-relaxed">
            In Nexus TCG, your customized 1–40 Hazard Deck is an environmental weapon. Deploying a hazard card during your Main Phase enters the <strong>Hazard Forecast Zone</strong> face-up with a 1-turn telegraphed delay ("comes in tapped"). It triggers first on the next turn during the Dawn Phase.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 flex flex-col gap-2">
              <span className="font-bold text-amber-400">🛡️ Player 30 HP Life Immunity:</span>
              <span>Hazards can destroy units, sunder armor, and alter lanes, but <strong>CANNOT deal direct damage to Commander Life (30 HP is safe)</strong>.</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 flex flex-col gap-2">
              <span className="font-bold text-cyan-400">⚡ Brace Mitigation System:</span>
              <span>Players holding open Momentum can trigger the <strong>Brace Maneuver</strong> during Dawn to cut environmental damage in half.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
