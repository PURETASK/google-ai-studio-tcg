import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Card, Domain } from '../types';
import { Sword, Shield, Zap, Sparkles, Activity, Layers, Info, HelpCircle } from 'lucide-react';

export interface CardAttributeRadarChartProps {
  card: Card;
  size?: 'sm' | 'md' | 'lg';
  showComparison?: boolean;
  benchmarkCard?: Card | null;
  className?: string;
}

export interface RadarDataPoint {
  attribute: string;
  key: 'power' | 'defense' | 'speed' | 'magic' | 'utility' | 'control';
  value: number;
  fullMark: number;
  benchmark?: number;
  domainAvg?: number;
  description: string;
  icon: string;
}

export const getDomainColor = (domain: Domain): string => {
  switch (domain) {
    case 'Sanctuary':
      return '#eab308'; // Amber / Gold
    case 'Radiance':
      return '#ef4444'; // Red / Crimson
    case 'Verdance':
      return '#10b981'; // Emerald
    case 'Arcane':
      return '#3b82f6'; // Blue / Sapphire
    case 'Abyss':
      return '#a855f7'; // Purple / Void
    default:
      return '#d97706';
  }
};

/**
 * Extracts and normalizes the 4 Core Card Attributes:
 * - Power (Attack potency, physical & strike power)
 * - Defense (Armor, HP reservoir, barrier fortitude)
 * - Speed (Initiative, mobility, flanking agility)
 * - Magic (Arcane energy, spell potency, divine attunement)
 */
export const getCardRadarAttributes = (card: Card): {
  power: number;
  defense: number;
  speed: number;
  magic: number;
  utility: number;
  control: number;
} => {
  // 1. Power (0-10 scale)
  const basePower = card.powerAttributes?.strength ?? card.power ?? 5;
  const power = Math.min(10, Math.max(1, Math.round(basePower)));

  // 2. Defense (0-10 scale)
  const baseDefense = card.powerAttributes?.durability ?? card.defense ?? 5;
  const defense = Math.min(10, Math.max(1, Math.round(baseDefense)));

  // 3. Speed (0-10 scale)
  let baseSpeed = card.speed ?? card.powerAttributes?.speed;
  if (baseSpeed === undefined) {
    if (card.attributes?.mobility !== undefined) {
      baseSpeed = card.attributes.mobility;
    } else {
      // Calculate speed based on domain & cardType & cost
      const domainSpeedBonus = card.domain === 'Verdance' ? 2 : card.domain === 'Radiance' ? 1.5 : card.domain === 'Arcane' ? 1 : 0;
      const typeSpeedBonus = card.cardType === 'Beast' || card.cardType === 'Champion' ? 1.5 : card.cardType === 'Weapon' ? 1 : 0;
      baseSpeed = Math.min(10, Math.max(2, Math.round(8 - card.cost * 0.4 + domainSpeedBonus + typeSpeedBonus)));
    }
  }
  const speed = Math.min(10, Math.max(1, Math.round(baseSpeed)));

  // 4. Magic (0-10 scale)
  let baseMagic = card.powerAttributes?.energyOutput ?? card.powerAttributes?.intelligence;
  if (baseMagic === undefined) {
    if (card.attributes?.utility !== undefined && card.attributes?.control !== undefined) {
      baseMagic = Math.round((card.attributes.utility + card.attributes.control) / 2);
    } else {
      const domainMagicBonus = card.domain === 'Arcane' ? 3 : card.domain === 'Abyss' ? 2.5 : card.domain === 'Sanctuary' ? 1.5 : 1;
      const typeMagicBonus = card.cardType === 'Spell' || card.cardType === 'Ritual' || card.cardType === 'Relic' ? 2.5 : 0;
      const abilitiesCount = card.abilities ? card.abilities.length : 1;
      baseMagic = Math.min(10, Math.max(2, Math.round(card.cost * 0.7 + domainMagicBonus + typeMagicBonus + abilitiesCount * 0.8)));
    }
  }
  const magic = Math.min(10, Math.max(1, Math.round(baseMagic)));

  // Utility & Control (supplementary)
  const utility = card.attributes?.utility ?? Math.min(10, Math.max(2, (card.abilities?.length || 1) * 2.2 + (card.cardType === 'Artifact' ? 2 : 1)));
  const control = card.attributes?.control ?? Math.min(10, Math.max(2, (card.divineRank || 1) * 1.6 + (card.domain === 'Abyss' || card.domain === 'Arcane' ? 2 : 1)));

  return {
    power,
    defense,
    speed,
    magic,
    utility: Math.min(10, Math.max(1, Math.round(utility))),
    control: Math.min(10, Math.max(1, Math.round(control)))
  };
};

export const CardAttributeRadarChart: React.FC<CardAttributeRadarChartProps> = ({
  card,
  size = 'md',
  showComparison = false,
  benchmarkCard = null,
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<'4-axis' | '6-axis'>('4-axis');
  const [showDomainAvg, setShowDomainAvg] = useState<boolean>(false);

  const domainColor = getDomainColor(card.domain);
  const cardStats = getCardRadarAttributes(card);
  const benchmarkStats = benchmarkCard ? getCardRadarAttributes(benchmarkCard) : null;

  // Domain baseline averages
  const domainAverages: Record<Domain, { power: number; defense: number; speed: number; magic: number; utility: number; control: number }> = {
    Sanctuary: { power: 6.5, defense: 8.5, speed: 5.5, magic: 7.0, utility: 7.5, control: 7.0 },
    Radiance: { power: 8.8, defense: 6.0, speed: 7.5, magic: 6.5, utility: 5.5, control: 6.0 },
    Verdance: { power: 6.0, defense: 7.5, speed: 8.5, magic: 6.0, utility: 7.0, control: 6.5 },
    Arcane: { power: 5.5, defense: 5.0, speed: 7.0, magic: 9.2, utility: 8.5, control: 8.0 },
    Abyss: { power: 8.0, defense: 6.5, speed: 6.5, magic: 8.5, utility: 6.0, control: 8.5 },
    Tempest: { power: 6.0, defense: 6.0, speed: 8.5, magic: 8.5, utility: 8.0, control: 9.0 }
  };

  const currentDomainAvg = domainAverages[card.domain] || domainAverages.Sanctuary;

  // 4 Core Attributes (Power, Defense, Speed, Magic)
  const core4Data: RadarDataPoint[] = [
    {
      attribute: 'Power',
      key: 'power',
      value: cardStats.power,
      fullMark: 10,
      benchmark: benchmarkStats?.power,
      domainAvg: currentDomainAvg.power,
      description: 'Physical strike potency, damage burst & cleave capacity',
      icon: '⚔️'
    },
    {
      attribute: 'Defense',
      key: 'defense',
      value: cardStats.defense,
      fullMark: 10,
      benchmark: benchmarkStats?.defense,
      domainAvg: currentDomainAvg.defense,
      description: 'Armor fortitude, barrier resilience & health pool',
      icon: '🛡️'
    },
    {
      attribute: 'Speed',
      key: 'speed',
      value: cardStats.speed,
      fullMark: 10,
      benchmark: benchmarkStats?.speed,
      domainAvg: currentDomainAvg.speed,
      description: 'Initiative turn order, flanking velocity & evasion',
      icon: '⚡'
    },
    {
      attribute: 'Magic',
      key: 'magic',
      value: cardStats.magic,
      fullMark: 10,
      benchmark: benchmarkStats?.magic,
      domainAvg: currentDomainAvg.magic,
      description: 'Arcane energy output, spell amplification & planar mana',
      icon: '🔮'
    }
  ];

  // 6 Expanded Attributes (Power, Defense, Speed, Magic, Utility, Control)
  const expanded6Data: RadarDataPoint[] = [
    ...core4Data,
    {
      attribute: 'Utility',
      key: 'utility',
      value: cardStats.utility,
      fullMark: 10,
      benchmark: benchmarkStats?.utility,
      domainAvg: currentDomainAvg.utility,
      description: 'Card cycling, essence ramp, aura buffs & support traits',
      icon: '✨'
    },
    {
      attribute: 'Control',
      key: 'control',
      value: cardStats.control,
      fullMark: 10,
      benchmark: benchmarkStats?.control,
      domainAvg: currentDomainAvg.control,
      description: 'Crowd control, stuns, taunts, roots & terrain manipulation',
      icon: '👁️'
    }
  ];

  const data = activeMode === '4-axis' ? core4Data : expanded6Data;

  // Dimension height
  const chartHeight = size === 'sm' ? 220 : size === 'lg' ? 340 : 280;

  // Calculate Archetype Summary
  const calculateArchetype = () => {
    const { power, defense, speed, magic } = cardStats;
    if (power >= 8 && speed >= 7) return { name: 'Assault Skirmisher', tag: 'STRIKE', color: '#ef4444', desc: 'High physical burst with lethal initiative' };
    if (defense >= 8 && magic >= 7) return { name: 'Aegis Hierophant', tag: 'WARD', color: '#eab308', desc: 'Impenetrable defensive barrier with divine wards' };
    if (magic >= 8 && speed >= 7) return { name: 'Arcane Swiftcaster', tag: 'MYSTIC', color: '#3b82f6', desc: 'Devastating spell barrage with agile positioning' };
    if (defense >= 8 && power >= 7) return { name: 'Juggernaut Bastion', tag: 'TANK', color: '#10b981', desc: 'Frontline juggernaut crushing opponents with heavy armor' };
    if (magic >= 8) return { name: 'Spellweaver Luminary', tag: 'SPELL', color: '#a855f7', desc: 'High magical channeler warping reality and leylines' };
    if (power >= 8) return { name: 'Brutal Cleaver', tag: 'DMG', color: '#f97316', desc: 'Pure damage powerhouse piercing enemy lines' };
    return { name: 'Tactical All-Rounder', tag: 'FLEX', color: '#eab308', desc: 'Balanced versatility across physical and mystical combat' };
  };

  const archetype = calculateArchetype();

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-stone-800 shadow-xl flex flex-col gap-4 text-stone-100 ${className}`}>
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-inner shrink-0"
            style={{
              backgroundColor: `${domainColor}20`,
              borderColor: `${domainColor}60`
            }}
          >
            <Activity size={17} style={{ color: domainColor }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-300">
                Attribute Radar Analysis
              </span>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                style={{
                  backgroundColor: `${archetype.color}25`,
                  color: archetype.color,
                  border: `1px solid ${archetype.color}60`
                }}
              >
                {archetype.tag} • {archetype.name}
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Visualizing <strong className="text-amber-200">Power</strong>, <strong className="text-blue-300">Defense</strong>, <strong className="text-yellow-300">Speed</strong>, and <strong className="text-purple-300">Magic</strong>
            </p>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs font-mono">
          <button
            onClick={() => setActiveMode('4-axis')}
            className={`px-2.5 py-1 rounded-md transition font-bold ${
              activeMode === '4-axis'
                ? 'bg-amber-500 text-black shadow'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
            title="Focus on Core 4 Attributes: Power, Defense, Speed, Magic"
          >
            4-Core (Primary)
          </button>
          <button
            onClick={() => setActiveMode('6-axis')}
            className={`px-2.5 py-1 rounded-md transition font-bold ${
              activeMode === '6-axis'
                ? 'bg-amber-500 text-black shadow'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
            title="Expand to 6 Tactical Dimensions including Utility & Control"
          >
            6-Axis Matrix
          </button>
          <button
            onClick={() => setShowDomainAvg(!showDomainAvg)}
            className={`px-2 py-1 rounded-md transition text-[11px] border ${
              showDomainAvg
                ? 'bg-stone-800 text-amber-300 border-amber-500/50'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-300'
            }`}
            title="Overlay Domain Average Benchmark"
          >
            {showDomainAvg ? '✓ Avg Active' : '+ Domain Avg'}
          </button>
        </div>
      </div>

      {/* Radar Chart Display via Recharts */}
      <div className="relative w-full flex items-center justify-center" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="rgba(217, 119, 6, 0.25)" strokeDasharray="3 3" />
            
            <PolarAngleAxis
              dataKey="attribute"
              tick={({ payload, x, y, textAnchor }) => {
                const colors: Record<string, string> = {
                  Power: '#f87171',
                  Defense: '#60a5fa',
                  Speed: '#facc15',
                  Magic: '#c084fc',
                  Utility: '#34d399',
                  Control: '#fb923c'
                };
                const valObj = data.find(d => d.attribute === payload.value);
                const color = colors[payload.value] || '#fde68a';
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill={color}
                    fontSize={11}
                    fontFamily="Cinzel, serif"
                    fontWeight="bold"
                  >
                    {payload.value} ({valObj?.value})
                  </text>
                );
              }}
            />

            <PolarRadiusAxis
              angle={30}
              domain={[0, 10]}
              tick={{ fill: '#78716c', fontSize: 9, fontFamily: 'monospace' }}
              axisLine={false}
              stroke="rgba(217, 119, 6, 0.3)"
            />

            {/* Optional Domain Average Overlay */}
            {showDomainAvg && (
              <Radar
                name={`${card.domain} Average`}
                dataKey="domainAvg"
                stroke="#78716c"
                fill="#78716c"
                fillOpacity={0.15}
                strokeDasharray="4 4"
              />
            )}

            {/* Optional Benchmark Comparison Card */}
            {benchmarkCard && benchmarkStats && (
              <Radar
                name={benchmarkCard.name}
                dataKey="benchmark"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.25}
                strokeWidth={1.5}
              />
            )}

            {/* Primary Inspected Card Radar */}
            <Radar
              name={card.name}
              dataKey="value"
              stroke={domainColor}
              fill={domainColor}
              fillOpacity={0.45}
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: '#fbbf24',
                stroke: '#000',
                strokeWidth: 1.5
              }}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as RadarDataPoint;
                  return (
                    <div className="p-2.5 rounded-xl bg-stone-900/95 border border-amber-500/50 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1 z-50">
                      <div className="flex items-center justify-between gap-3 border-b border-stone-800 pb-1 font-cinzel">
                        <span className="font-bold text-amber-300 flex items-center gap-1.5">
                          <span>{item.icon}</span>
                          <span>{item.attribute} Attribute</span>
                        </span>
                        <span className="text-amber-400 font-black text-sm">{item.value} / 10.0</span>
                      </div>
                      <p className="text-[11px] text-stone-300 font-sans max-w-[200px] leading-tight">
                        {item.description}
                      </p>
                      {item.domainAvg && showDomainAvg && (
                        <div className="flex justify-between text-[10px] text-stone-400 pt-0.5">
                          <span>Domain Avg:</span>
                          <span className="text-stone-300">{item.domainAvg} / 10</span>
                        </div>
                      )}
                      {benchmarkCard && item.benchmark !== undefined && (
                        <div className="flex justify-between text-[10px] text-blue-300 pt-0.5">
                          <span>{benchmarkCard.name}:</span>
                          <span>{item.benchmark} / 10</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 4 Core Attribute Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {/* Power Tile */}
        <div className="p-2.5 rounded-xl bg-stone-900/80 border border-red-900/40 hover:border-red-500/60 transition flex flex-col justify-between gap-1 shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cinzel uppercase font-bold text-red-300 flex items-center gap-1">
              <Sword size={12} className="text-red-400" />
              <span>Power</span>
            </span>
            <span className="text-xs font-mono font-bold text-red-400 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800">
              {cardStats.power}/10
            </span>
          </div>
          <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full" style={{ width: `${(cardStats.power / 10) * 100}%` }} />
          </div>
          <span className="text-[9px] text-stone-400 truncate">Atk & Strike Damage</span>
        </div>

        {/* Defense Tile */}
        <div className="p-2.5 rounded-xl bg-stone-900/80 border border-blue-900/40 hover:border-blue-500/60 transition flex flex-col justify-between gap-1 shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cinzel uppercase font-bold text-blue-300 flex items-center gap-1">
              <Shield size={12} className="text-blue-400" />
              <span>Defense</span>
            </span>
            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800">
              {cardStats.defense}/10
            </span>
          </div>
          <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" style={{ width: `${(cardStats.defense / 10) * 100}%` }} />
          </div>
          <span className="text-[9px] text-stone-400 truncate">Armor & Barrier HP</span>
        </div>

        {/* Speed Tile */}
        <div className="p-2.5 rounded-xl bg-stone-900/80 border border-yellow-900/40 hover:border-yellow-500/60 transition flex flex-col justify-between gap-1 shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cinzel uppercase font-bold text-yellow-300 flex items-center gap-1">
              <Zap size={12} className="text-yellow-400" />
              <span>Speed</span>
            </span>
            <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-950/80 px-1.5 py-0.5 rounded border border-yellow-800">
              {cardStats.speed}/10
            </span>
          </div>
          <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full" style={{ width: `${(cardStats.speed / 10) * 100}%` }} />
          </div>
          <span className="text-[9px] text-stone-400 truncate">Initiative & Flank</span>
        </div>

        {/* Magic Tile */}
        <div className="p-2.5 rounded-xl bg-stone-900/80 border border-purple-900/40 hover:border-purple-500/60 transition flex flex-col justify-between gap-1 shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-cinzel uppercase font-bold text-purple-300 flex items-center gap-1">
              <Sparkles size={12} className="text-purple-400" />
              <span>Magic</span>
            </span>
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-800">
              {cardStats.magic}/10
            </span>
          </div>
          <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full" style={{ width: `${(cardStats.magic / 10) * 100}%` }} />
          </div>
          <span className="text-[9px] text-stone-400 truncate">Arcane & Leyline</span>
        </div>
      </div>
    </div>
  );
};
