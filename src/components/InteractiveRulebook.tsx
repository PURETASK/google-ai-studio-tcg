import React, { useState } from 'react';
import { Card, Domain, FoilType } from '../types';
import { CardItem } from './CardItem';
import { CARDS_DATABASE } from '../data/cards';
import { 
  Shield, 
  Sword, 
  Zap, 
  Compass, 
  Sparkles, 
  Sliders, 
  Layers, 
  Target, 
  ChevronRight, 
  HelpCircle, 
  Award, 
  Activity, 
  Flame, 
  Info,
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface InteractiveRulebookProps {
  initialSection?: 'matrix' | 'lanes' | 'foils' | 'attunement' | 'phases';
  sampleCard?: Card;
  onInspectCard?: (card: Card) => void;
}

export const InteractiveRulebook: React.FC<InteractiveRulebookProps> = ({
  initialSection = 'matrix',
  sampleCard,
  onInspectCard
}) => {
  const [activeSection, setActiveSection] = useState<'matrix' | 'lanes' | 'foils' | 'attunement' | 'phases'>(initialSection);
  
  // 5-Axis Tactical Matrix State
  const [radarSliders, setRadarSliders] = useState<{
    damage: number;
    durability: number;
    mobility: number;
    utility: number;
    control: number;
  }>({
    damage: 8.5,
    durability: 6.0,
    mobility: 7.0,
    utility: 6.5,
    control: 8.0
  });

  // Archetype Presets
  const PRESET_ARCHETYPES = [
    {
      name: 'Titan Vanguard',
      icon: '🛡️',
      desc: 'High durability & control anchor designed to soak damage and enforce Taunt.',
      stats: { damage: 5.0, durability: 9.5, mobility: 3.5, utility: 5.0, control: 9.0 }
    },
    {
      name: 'Shadow Assassin',
      icon: '🗡️',
      desc: 'High burst damage and mobility tailored for flank routes and commander assassinations.',
      stats: { damage: 9.5, durability: 3.5, mobility: 9.5, utility: 4.0, control: 4.5 }
    },
    {
      name: 'Grand Arcanist',
      icon: '✨',
      desc: 'High utility and board control specializing in deck ramp and crowd stuns.',
      stats: { damage: 7.5, durability: 4.5, mobility: 5.5, utility: 9.5, control: 9.0 }
    },
    {
      name: 'Verdant Juggernaut',
      icon: '🌿',
      desc: 'Balanced frontline combatant with regeneration and steady sustained DPS.',
      stats: { damage: 7.5, durability: 8.0, mobility: 6.0, utility: 7.0, control: 6.5 }
    }
  ];

  // 3-Lane Mechanics State
  const [selectedLane, setSelectedLane] = useState<'flank-left' | 'vanguard-center' | 'flank-right' | 'backline'>('vanguard-center');
  const [activeCombatScenario, setActiveCombatScenario] = useState<'standard' | 'flanking' | 'taunt-blocked' | 'reach-strike'>('flanking');

  // Foil Preview State
  const [demoFoil, setDemoFoil] = useState<FoilType>('prismatic');

  // Attunement Domain Filter
  const [selectedDomain, setSelectedDomain] = useState<Domain>('Radiance');

  // Radar Polygon Calculation
  const radarPoints = [
    { label: 'DMG', value: radarSliders.damage, angle: 0 },
    { label: 'DUR', value: radarSliders.durability, angle: 72 },
    { label: 'MOB', value: radarSliders.mobility, angle: 144 },
    { label: 'UTL', value: radarSliders.utility, angle: 216 },
    { label: 'CTL', value: radarSliders.control, angle: 288 }
  ];

  const center = 100;
  const radius = 70;
  const polygonPath = radarPoints.map((pt) => {
    const rad = ((pt.angle - 90) * Math.PI) / 180;
    const r = (pt.value / 10) * radius;
    const x = center + r * Math.cos(rad);
    const y = center + r * Math.sin(rad);
    return `${x},${y}`;
  }).join(' ');

  // Compute dominant classification
  const getDominantArchetype = () => {
    const { damage, durability, mobility, utility, control } = radarSliders;
    if (damage >= 8.5 && durability <= 5.0) return { title: 'Apex Glass Cannon', tag: 'High-Risk Flank Finisher', color: 'text-red-400' };
    if (durability >= 8.5 && control >= 7.0) return { title: 'Immovable Bastion', tag: 'Vanguard Taunt Pillar', color: 'text-blue-400' };
    if (mobility >= 8.5 && damage >= 7.0) return { title: 'Swift Infiltrator', tag: 'Lane-Bypassing Striker', color: 'text-emerald-400' };
    if (utility >= 8.5 && control >= 7.5) return { title: 'Grand Tactician', tag: 'Board Manipulator & Ramp', color: 'text-purple-400' };
    return { title: 'Balanced Exemplar', tag: 'Multi-Role Hybrid', color: 'text-amber-400' };
  };

  const dominantArchetype = getDominantArchetype();
  const previewCard = sampleCard || CARDS_DATABASE[0];

  return (
    <div className="w-full space-y-6 animate-fade-in">
      
      {/* Rulebook Navigation Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-stone-900/90 border border-amber-500/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
            <Compass size={22} />
          </div>
          <div>
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
              Official Tournament Codex
            </span>
            <h2 className="font-cinzel font-black text-xl sm:text-2xl text-amber-100">
              Interactive Systems Rulebook
            </h2>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-stone-950 border border-stone-800">
          <button
            onClick={() => setActiveSection('matrix')}
            className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition flex items-center gap-1.5 ${
              activeSection === 'matrix'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-300 hover:text-white hover:bg-stone-900'
            }`}
          >
            <Activity size={13} />
            <span>5-Axis Matrix</span>
          </button>

          <button
            onClick={() => setActiveSection('lanes')}
            className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition flex items-center gap-1.5 ${
              activeSection === 'lanes'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-300 hover:text-white hover:bg-stone-900'
            }`}
          >
            <Target size={13} />
            <span>3-Lane Mechanics</span>
          </button>

          <button
            onClick={() => setActiveSection('phases')}
            className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition flex items-center gap-1.5 ${
              activeSection === 'phases'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-300 hover:text-white hover:bg-stone-900'
            }`}
          >
            <Layers size={13} />
            <span>Phase Sequence</span>
          </button>

          <button
            onClick={() => setActiveSection('foils')}
            className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition flex items-center gap-1.5 ${
              activeSection === 'foils'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-300 hover:text-white hover:bg-stone-900'
            }`}
          >
            <Sparkles size={13} />
            <span>Foil Shaders</span>
          </button>

          <button
            onClick={() => setActiveSection('attunement')}
            className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition flex items-center gap-1.5 ${
              activeSection === 'attunement'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-300 hover:text-white hover:bg-stone-900'
            }`}
          >
            <Award size={13} />
            <span>Attunement Ranks</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: 5-AXIS TACTICAL MATRIX                                         */}
      {/* ========================================================================= */}
      {activeSection === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Radar Polygon Visualizer (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 flex flex-col items-center justify-between space-y-4">
            <div className="w-full text-center">
              <span className="font-cinzel text-xs text-amber-400 font-bold uppercase tracking-wider block">
                Dynamic Radar Polygon Visualizer
              </span>
              <h3 className="font-cinzel font-black text-lg text-amber-100">
                5-Point Stat Geometry
              </h3>
            </div>

            {/* SVG Radar */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg width="220" height="220" viewBox="0 0 200 200" className="overflow-visible">
                {/* Background Concentric Polygon Rings */}
                {[0.25, 0.5, 0.75, 1.0].map((ringLevel, i) => {
                  const ringPath = radarPoints.map((pt) => {
                    const rad = ((pt.angle - 90) * Math.PI) / 180;
                    const r = ringLevel * radius;
                    const x = center + r * Math.cos(rad);
                    const y = center + r * Math.sin(rad);
                    return `${x},${y}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={i}
                      points={ringPath}
                      fill="none"
                      stroke="#44403c"
                      strokeWidth="1"
                      strokeDasharray={i < 3 ? '2 2' : 'none'}
                    />
                  );
                })}

                {/* Radial Axis Spokes */}
                {radarPoints.map((pt, i) => {
                  const rad = ((pt.angle - 90) * Math.PI) / 180;
                  const x = center + radius * Math.cos(rad);
                  const y = center + radius * Math.sin(rad);
                  return (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="#57534e"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Animated Stat Value Polygon */}
                <polygon
                  points={polygonPath}
                  fill="rgba(234, 179, 8, 0.35)"
                  stroke="#eab308"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />

                {/* Node Points & Axis Labels */}
                {radarPoints.map((pt, i) => {
                  const rad = ((pt.angle - 90) * Math.PI) / 180;
                  const r = (pt.value / 10) * radius;
                  const x = center + r * Math.cos(rad);
                  const y = center + r * Math.sin(rad);
                  const labelR = radius + 22;
                  const lx = center + labelR * Math.cos(rad);
                  const ly = center + labelR * Math.sin(rad);

                  return (
                    <g key={i}>
                      <circle
                        cx={x}
                        cy={y}
                        r="4.5"
                        fill="#fef08a"
                        stroke="#854d0e"
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                      <text
                        x={lx}
                        y={ly + 4}
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="10"
                        fontFamily="Cinzel, serif"
                        fontWeight="bold"
                      >
                        {pt.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Calculated Archetype Badge */}
            <div className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-center space-y-0.5">
              <span className="text-[10px] font-mono text-stone-400 uppercase">Calculated Combat Profile</span>
              <div className={`font-cinzel font-black text-sm ${dominantArchetype.color}`}>
                {dominantArchetype.title}
              </div>
              <span className="text-[10px] font-mono text-stone-400 block">
                {dominantArchetype.tag}
              </span>
            </div>

            {/* Quick Archetype Preset Buttons */}
            <div className="w-full space-y-1.5">
              <span className="text-[10px] font-cinzel text-stone-400 uppercase tracking-wider block text-center">
                Quick Archetype Presets
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_ARCHETYPES.map((arch) => (
                  <button
                    key={arch.name}
                    onClick={() => setRadarSliders(arch.stats)}
                    className="p-2 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-500 text-left transition flex items-center gap-2 text-xs"
                  >
                    <span className="text-sm">{arch.icon}</span>
                    <span className="font-cinzel text-[10px] text-stone-200 truncate">{arch.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Sliders & Comprehensive Axis Guide (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Real-Time Matrix Tuning Sliders */}
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders size={14} className="text-amber-400" />
                    <span>Real-Time Matrix Calibrator</span>
                  </h4>
                  <span className="text-[11px] text-stone-400">
                    Adjust sliders to explore how stat balances change tactical categorization.
                  </span>
                </div>

                <button
                  onClick={() => setRadarSliders({ damage: 8.5, durability: 6.0, mobility: 7.0, utility: 6.5, control: 8.0 })}
                  className="text-[10px] font-mono text-amber-400 hover:text-amber-300 underline"
                >
                  Reset Defaults
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(['damage', 'durability', 'mobility', 'utility', 'control'] as const).map((axis) => (
                  <div key={axis} className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="capitalize text-stone-200 font-cinzel font-bold flex items-center gap-1.5">
                        {axis === 'damage' && <Sword size={13} className="text-red-400" />}
                        {axis === 'durability' && <Shield size={13} className="text-blue-400" />}
                        {axis === 'mobility' && <Zap size={13} className="text-emerald-400" />}
                        {axis === 'utility' && <Sparkles size={13} className="text-purple-400" />}
                        {axis === 'control' && <Target size={13} className="text-amber-400" />}
                        <span>{axis}</span>
                      </span>
                      <span className="font-mono text-amber-400 font-bold text-xs">
                        {radarSliders[axis].toFixed(1)} / 10.0
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={radarSliders[axis]}
                      onChange={(e) => setRadarSliders(prev => ({ ...prev, [axis]: parseFloat(e.target.value) }))}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Mechanical Meaning of Each Axis */}
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h4 className="font-cinzel font-bold text-sm text-amber-200 uppercase tracking-wider">
                Tactical Impact & Rule Enforcements
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-stone-950 border border-red-950/60 flex items-start gap-2.5">
                  <Sword size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-300 font-cinzel">Damage (DMG):</strong>
                    <p className="text-stone-300 text-[11px] mt-0.5">
                      Determines basic attack output, spell scaling dice multipliers, and armor-piercing threshold when contesting Vanguard defenders.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-950 border border-blue-950/60 flex items-start gap-2.5">
                  <Shield size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-300 font-cinzel">Durability (DUR):</strong>
                    <p className="text-stone-300 text-[11px] mt-0.5">
                      Governs maximum health pool, persistent barrier resistance against Burn and Corrosion, and defensive ward mitigation.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-950 border border-emerald-950/60 flex items-start gap-2.5">
                  <Zap size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-300 font-cinzel">Mobility (MOB):</strong>
                    <p className="text-stone-300 text-[11px] mt-0.5">
                      Allows lane switching during the movement phase, grants initiative in simultaneous death clashes, and bypasses frontline taunts.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-950 border border-purple-950/60 flex items-start gap-2.5">
                  <Sparkles size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-300 font-cinzel">Utility (UTL):</strong>
                    <p className="text-stone-300 text-[11px] mt-0.5">
                      Enhances essence ramp generation, additional card draw velocity, relic attunement efficiency, and team cleansing aura spread.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-950 border border-amber-950/60 flex items-start gap-2.5">
                  <Target size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 font-cinzel">Control (CTL):</strong>
                    <p className="text-stone-300 text-[11px] mt-0.5">
                      Determines stun potency, knockback distance, taunt priority radius, and terrain hazard creation across opposing lanes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: 3-LANE COMBAT ARCHITECTURE & POSITIONING                       */}
      {/* ========================================================================= */}
      {activeSection === 'lanes' && (
        <div className="space-y-6">
          
          {/* Top Battlefield Diagram */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
              <div>
                <span className="font-cinzel text-xs text-amber-400 font-bold uppercase tracking-wider block">
                  Battlefield Spatial Architecture
                </span>
                <h3 className="font-cinzel font-black text-xl text-amber-100">
                  Tri-Lane Vanguard & Command Tier Grid
                </h3>
              </div>

              {/* Combat Scenario Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                <span className="text-[10px] font-mono text-stone-400 px-2">Scenario:</span>
                <button
                  onClick={() => setActiveCombatScenario('flanking')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeCombatScenario === 'flanking' ? 'bg-amber-500 text-black font-bold' : 'text-stone-400'
                  }`}
                >
                  Flanking Rush
                </button>
                <button
                  onClick={() => setActiveCombatScenario('taunt-blocked')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeCombatScenario === 'taunt-blocked' ? 'bg-amber-500 text-black font-bold' : 'text-stone-400'
                  }`}
                >
                  Center Taunt Wall
                </button>
                <button
                  onClick={() => setActiveCombatScenario('reach-strike')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeCombatScenario === 'reach-strike' ? 'bg-amber-500 text-black font-bold' : 'text-stone-400'
                  }`}
                >
                  Backline Snipe
                </button>
              </div>
            </div>

            {/* Interactive 3-Lane Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Left Flank Card */}
              <div
                onClick={() => setSelectedLane('flank-left')}
                className={`p-4 rounded-2xl border cursor-pointer transition text-center space-y-2 relative ${
                  selectedLane === 'flank-left'
                    ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400'
                    : 'bg-stone-950 border-stone-800 hover:border-emerald-500/50'
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-xl">
                  🏹
                </div>
                <h4 className="font-cinzel font-bold text-base text-emerald-300">
                  Left Flank (Lane 1)
                </h4>
                <div className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  High mobility corridor. Units with Mobility ≥ 7 can bypass center guards to strike opposing support casters.
                </div>
                <div className="pt-2 border-t border-emerald-900/40 text-[10px] font-mono text-emerald-400">
                  Bonus: +2 SPD Initiative on Turn 1
                </div>
              </div>

              {/* Center Vanguard Card */}
              <div
                onClick={() => setSelectedLane('vanguard-center')}
                className={`p-4 rounded-2xl border cursor-pointer transition text-center space-y-2 relative ${
                  selectedLane === 'vanguard-center'
                    ? 'bg-red-950/60 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] ring-2 ring-red-400'
                    : 'bg-stone-950 border-stone-800 hover:border-red-500/50'
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-red-950 border border-red-500/60 flex items-center justify-center text-xl">
                  🛡️
                </div>
                <h4 className="font-cinzel font-bold text-base text-red-300">
                  Center Vanguard (Lane 2)
                </h4>
                <div className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  Primary collision zone. Units stationed here project Taunt aura across adjacent lanes, soaking incoming standard attacks.
                </div>
                <div className="pt-2 border-t border-red-900/40 text-[10px] font-mono text-red-400">
                  Enforces: Core Taunt / Intercept Barrier
                </div>
              </div>

              {/* Right Flank Card */}
              <div
                onClick={() => setSelectedLane('flank-right')}
                className={`p-4 rounded-2xl border cursor-pointer transition text-center space-y-2 relative ${
                  selectedLane === 'flank-right'
                    ? 'bg-amber-950/60 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-2 ring-amber-400'
                    : 'bg-stone-950 border-stone-800 hover:border-amber-500/50'
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-amber-950 border border-amber-500/60 flex items-center justify-center text-xl">
                  🗡️
                </div>
                <h4 className="font-cinzel font-bold text-base text-amber-300">
                  Right Flank (Lane 3)
                </h4>
                <div className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  Flanking strike angle. Units attack with +2 bonus physical damage if the opponent's center unit is engaged in active clash.
                </div>
                <div className="pt-2 border-t border-amber-900/40 text-[10px] font-mono text-amber-400">
                  Bonus: +2 Flanking Damage Modifier
                </div>
              </div>
            </div>

            {/* Backline Support Tier Row */}
            <div
              onClick={() => setSelectedLane('backline')}
              className={`p-4 rounded-2xl border cursor-pointer transition text-center space-y-1.5 ${
                selectedLane === 'backline'
                  ? 'bg-purple-950/60 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-2 ring-purple-400'
                  : 'bg-stone-950 border-stone-800 hover:border-purple-500/50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">👑</span>
                <h4 className="font-cinzel font-bold text-base text-purple-300">
                  Backline Support Tier & Commander Sanctuary
                </h4>
              </div>
              <p className="text-xs text-stone-300 max-w-2xl mx-auto leading-relaxed">
                Dedicated sanctuary slot for Commander, Artifacts, and Legendary Grimoires. Immune to direct physical melee strikes while at least one Vanguard protector remains standing.
              </p>
            </div>
          </div>

          {/* Lane Strategic Rules Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h4 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Shield size={16} />
                <span>Line of Sight & Targeting Priority</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li className="flex items-start gap-2 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Opposing Matchup:</strong> Standard units attack the enemy directly across from them in the same lane.</span>
                </li>
                <li className="flex items-start gap-2 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Empty Lane Penetration:</strong> If your opponent has an empty lane, your unit in that lane may strike the enemy Commander directly!</span>
                </li>
                <li className="flex items-start gap-2 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Reach & Pierce:</strong> Weapons with Reach (e.g. polearms, bows) can target any lane without penalty.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <h4 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Zap size={16} />
                <span>Lane Shifting & Mobility Tactics</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li className="flex items-start gap-2 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Movement Phase:</strong> Spend 1 Essence during Main Phase to shift an active unit to an adjacent empty lane.</span>
                </li>
                <li className="flex items-start gap-2 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Flank Convergence:</strong> Two flanking units attacking simultaneously trigger a Pincer Maneuver, ignoring 3 armor.</span>
                </li>
                <li className="flex items-start gap-2 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Retreat to Backline:</strong> Damaged champions can fall back to the Backline if an allied Beast takes their vanguard slot.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: TURN SEQUENCE & PHASE RESOLUTION                                */}
      {/* ========================================================================= */}
      {activeSection === 'phases' && (
        <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-6">
          <div>
            <span className="font-cinzel text-xs text-amber-400 font-bold uppercase tracking-wider block">
              Official Turn Structure
            </span>
            <h3 className="font-cinzel font-black text-xl text-amber-100">
              6-Phase Combat Resolution Flowchart
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Every turn in Realm of Nexus strictly follows these 6 sequential windows to ensure absolute mechanical clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Phase 1 */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-cinzel font-black text-xs flex items-center justify-center">1</span>
                <span className="text-[10px] font-mono text-amber-400">Turn Start</span>
              </div>
              <h4 className="font-cinzel font-bold text-sm text-amber-200">Upkeep & Recharge</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Max Essence increases by +1 (up to 10). Your Essence pool refills completely. Ready all tapped armory weapons and heroes.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-cinzel font-black text-xs flex items-center justify-center">2</span>
                <span className="text-[10px] font-mono text-blue-400">Card Influx</span>
              </div>
              <h4 className="font-cinzel font-bold text-sm text-amber-200">Draw Phase</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Draw 1 card from your Grimoire library (2 cards if under Divine Radiance blessing). Trigger "At start of draw" power glyphs.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/50 space-y-2 relative shadow-lg ring-1 ring-amber-500/40">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-cinzel font-black text-xs flex items-center justify-center">3</span>
                <span className="text-[10px] font-mono text-yellow-400">Primary Actions</span>
              </div>
              <h4 className="font-cinzel font-bold text-sm text-amber-200">Main Casting Phase</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Spend Essence to summon Champions and Beasts, equip Weapons and Relics, cast Spells, and reposition units between lanes.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-red-500/50 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-red-500 text-white font-cinzel font-black text-xs flex items-center justify-center">4</span>
                <span className="text-[10px] font-mono text-red-400">Damage Exchange</span>
              </div>
              <h4 className="font-cinzel font-bold text-sm text-red-200">Clash & Combat Phase</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Declare attacks lane by lane. Damage resolves simultaneously unless a unit possesses First Strike or Superior Speed.
              </p>
            </div>

            {/* Phase 5 */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-purple-500/50 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-cinzel font-black text-xs flex items-center justify-center">5</span>
                <span className="text-[10px] font-mono text-purple-400">Fast Window</span>
              </div>
              <h4 className="font-cinzel font-bold text-sm text-purple-200">Fast Reaction Window</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Both players may trigger Instant Spells, Defensive Wards, or Fast Reaction Glyphs (e.g. Parrying Shield, Flash Counter).
              </p>
            </div>

            {/* Phase 6 */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-stone-700 text-white font-cinzel font-black text-xs flex items-center justify-center">6</span>
                <span className="text-[10px] font-mono text-stone-400">Status Check</span>
              </div>
              <h4 className="font-cinzel font-bold text-sm text-stone-200">End Phase & Status Ticks</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Burn and Corrosion damage tick down. Temporary shields expire. Unspent Essence resets. Turn passes to opponent.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: HOLOGRAPHIC FOIL FINISHES & SHADERS                            */}
      {/* ========================================================================= */}
      {activeSection === 'foils' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-stone-900 border border-amber-500/30">
          
          {/* Left Column: Shader Selectors (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="font-cinzel text-xs text-amber-400 font-bold uppercase tracking-wider block">
                Visual Artifacts & Holography
              </span>
              <h3 className="font-cinzel font-black text-xl text-amber-100">
                Collector Foil Finish Shaders
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Cards forged in the Aetheria Codex can feature real-time 3D parallax lighting shaders that react to cursor movement.
              </p>
            </div>

            <div className="space-y-2.5 font-cinzel text-xs">
              <div
                onClick={() => setDemoFoil('none')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  demoFoil === 'none'
                    ? 'bg-amber-500 text-black font-bold shadow-lg'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <span className="block font-bold">1. Standard Matte Finish</span>
                  <span className="text-[11px] font-sans opacity-80 block">Natural cardstock texture for crisp readability.</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/20">Common / Rare</span>
              </div>

              <div
                onClick={() => setDemoFoil('gold')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  demoFoil === 'gold'
                    ? 'bg-amber-500 text-black font-bold shadow-lg'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <span className="block font-bold">2. Gilded Auric Relic Foil</span>
                  <span className="text-[11px] font-sans opacity-80 block">Reflective gold leaf edging with shimmering light beam highlights.</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/20">Very Rare</span>
              </div>

              <div
                onClick={() => setDemoFoil('prismatic')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  demoFoil === 'prismatic'
                    ? 'bg-amber-500 text-black font-bold shadow-lg'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <span className="block font-bold">3. Prismatic Starlight Foil</span>
                  <span className="text-[11px] font-sans opacity-80 block">Rainbow spectral iridescent gradient shifting continuously with viewing angle.</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/20">Legendary</span>
              </div>

              <div
                onClick={() => setDemoFoil('abyssal')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  demoFoil === 'abyssal'
                    ? 'bg-amber-500 text-black font-bold shadow-lg'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <span className="block font-bold">4. Cosmic Abyssal Foil</span>
                  <span className="text-[11px] font-sans opacity-80 block">Dark void glow with starry particles and ethereal ultraviolet border pulsing.</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/20">Mythic / Boundless</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live 3D Foil Interactive Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-stone-950 border border-stone-800">
            <span className="font-cinzel text-xs text-amber-400 font-bold uppercase tracking-wider block mb-3">
              Live 3D Parallax Shader Preview ({demoFoil.toUpperCase()})
            </span>

            <div className="flex justify-center">
              <CardItem
                card={previewCard}
                size="md"
                foilType={demoFoil}
                interactive={true}
                onInspect={() => onInspectCard && onInspectCard(previewCard)}
              />
            </div>

            <p className="text-[11px] font-mono text-stone-400 mt-4 text-center">
              Hover & move cursor over the card to inspect dynamic 3D angle lighting!
            </p>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: ATTUNEMENT & DIVINE RANKS                                      */}
      {/* ========================================================================= */}
      {activeSection === 'attunement' && (
        <div className="space-y-6">
          
          {/* Top Domain Alignment Guide */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-4">
            <div>
              <span className="font-cinzel text-xs text-amber-400 font-bold uppercase tracking-wider block">
                Alignment & Power Scaling
              </span>
              <h3 className="font-cinzel font-black text-xl text-amber-100">
                Attunement Rules & Divine Ranks (1 to 5)
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Certain legendary relics require Commander Attunement to unlock secondary god-tier power clauses.
              </p>
            </div>

            {/* Domain Selector Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {(['Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss'] as Domain[]).map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-cinzel font-bold transition ${
                    selectedDomain === dom
                      ? 'bg-amber-500 text-black shadow-lg scale-105'
                      : 'bg-stone-950 border border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  {dom === 'Sanctuary' && '🏛️ Sanctuary'}
                  {dom === 'Radiance' && '☀️ Radiance'}
                  {dom === 'Verdance' && '🌿 Verdance'}
                  {dom === 'Arcane' && '🔮 Arcane'}
                  {dom === 'Abyss' && '🌑 Abyss'}
                </button>
              ))}
            </div>

            {/* Domain Rule Card */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-amber-200">
                  {selectedDomain} Alignment Clause:
                </span>
                <span className="font-mono text-[10px] text-green-400">Attunement Active</span>
              </div>
              <p className="text-stone-300 leading-relaxed font-sans">
                {selectedDomain === 'Sanctuary' && 'When attuned to Sanctuary, your Commander gains +4 Shield whenever a Divine Rank 3+ relic is cast.'}
                {selectedDomain === 'Radiance' && 'When attuned to Radiance, Fire spells ignore physical armor and ignite Burn for 3 additional turns.'}
                {selectedDomain === 'Verdance' && 'When attuned to Verdance, your Vanguard units regenerate 2 HP at the beginning of each turn.'}
                {selectedDomain === 'Arcane' && 'When attuned to Arcane, drawing your first spell each turn discounts its Essence cost by 1.'}
                {selectedDomain === 'Abyss' && 'When attuned to Abyss, destroying an opposing card harvests 1 Soul Fragment to buff direct attack power.'}
              </p>
            </div>
          </div>

          {/* Divine Rank Hierarchy Table */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
            <h4 className="font-cinzel font-bold text-sm text-amber-200 uppercase tracking-wider">
              Divine Rank Hierarchy (Stars 1 - 5)
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-bold font-mono">⭐ Rank 1: Mortal Initiate</span>
                  <span className="text-stone-400 text-[11px]">Standard baseline combat units and weapons.</span>
                </div>
                <span className="font-mono text-[10px] text-stone-400">Limit: 3/Deck</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-bold font-mono">⭐⭐ Rank 2: Blessed Champion</span>
                  <span className="text-stone-400 text-[11px]">Empowered active skills with secondary triggers.</span>
                </div>
                <span className="font-mono text-[10px] text-stone-400">Limit: 2/Deck</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-purple-400 font-bold font-mono">⭐⭐⭐ Rank 3: Sovereign Titan</span>
                  <span className="text-stone-400 text-[11px]">Immune to basic silence and debuff clearing spells.</span>
                </div>
                <span className="font-mono text-[10px] text-stone-400">Limit: 1/Deck</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-bold font-mono">⭐⭐⭐⭐ Rank 4: Demigod Relic</span>
                  <span className="text-stone-400 text-[11px]">Requires Attunement; unleashes game-altering battlefield auras.</span>
                </div>
                <span className="font-mono text-[10px] text-stone-400">Limit: 1/Deck</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/60 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-amber-300 font-bold font-mono">⭐⭐⭐⭐⭐ Rank 5: Ascended Godhead</span>
                  <span className="text-stone-200 text-[11px]">Ultimate win condition. Immune to all non-Ascended destruction spells.</span>
                </div>
                <span className="font-mono text-[10px] text-amber-300 font-bold">Limit: 1 Unique</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
