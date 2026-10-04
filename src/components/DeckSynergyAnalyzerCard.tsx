import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from 'recharts';
import { DeckPreset, DeckSynergyReport, SynergyGrade, DistributionSlice } from '../types';
import { analyzeDeckSynergy } from '../utils/synergyAnalyzer';
import { soundEngine } from '../utils/audioEngine';
import { 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  Zap, 
  Layers, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  TrendingUp, 
  Info,
  PieChart as PieIcon,
  Crown,
  Compass,
  BarChart3,
  Crosshair
} from 'lucide-react';

interface DeckSynergyAnalyzerCardProps {
  cardIds: string[];
  activePreset?: DeckPreset;
}

export const DeckSynergyAnalyzerCard: React.FC<DeckSynergyAnalyzerCardProps> = ({
  cardIds,
  activePreset
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState<'domains' | 'rarities' | 'types'>('domains');
  const report: DeckSynergyReport = analyzeDeckSynergy(cardIds, activePreset);

  const getGradeTheme = (grade: SynergyGrade) => {
    switch (grade) {
      case 'S+':
      case 'S':
        return {
          badgeBg: 'bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500',
          textColor: 'text-black font-black',
          glow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)] border-amber-300',
          pillBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      case 'A+':
      case 'A':
        return {
          badgeBg: 'bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-500',
          textColor: 'text-black font-black',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.4)] border-emerald-300',
          pillBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
      case 'B+':
      case 'B':
        return {
          badgeBg: 'bg-gradient-to-br from-blue-400 via-indigo-300 to-blue-500',
          textColor: 'text-black font-black',
          glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)] border-blue-300',
          pillBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
        };
      default:
        return {
          badgeBg: 'bg-stone-700',
          textColor: 'text-stone-200 font-bold',
          glow: 'border-stone-600',
          pillBg: 'bg-stone-800 text-stone-300 border-stone-700'
        };
    }
  };

  const theme = getGradeTheme(report.letterGrade);

  const activeSlices: DistributionSlice[] = 
    activeChartTab === 'domains' 
      ? report.domainDistribution 
      : activeChartTab === 'rarities' 
      ? report.rarityDistribution 
      : report.cardTypeDistribution;

  const totalCards = (cardIds || []).length;

  // Performance-Over-Time timeline tracker comparing Deck vs Global Average
  const performanceTimeline = React.useMemo(() => {
    const baseWinRate = Math.min(92, Math.max(30, 42 + Math.round((report.overallScore * 0.48))));
    const curveBonus = report.manaCurveScore > 75 ? 4 : report.manaCurveScore < 45 ? -4 : 0;
    
    return [
      { round: 'M1', turn: 'Game 1', winRate: Math.max(35, baseWinRate - 6 + curveBonus), globalAvg: 49.5 },
      { round: 'M2', turn: 'Game 2', winRate: Math.max(38, baseWinRate - 3 + curveBonus), globalAvg: 50.0 },
      { round: 'M3', turn: 'Game 3', winRate: Math.max(40, baseWinRate - 1 + curveBonus), globalAvg: 50.4 },
      { round: 'M4', turn: 'Game 4', winRate: Math.max(42, baseWinRate + 1 + curveBonus), globalAvg: 50.8 },
      { round: 'M5', turn: 'Game 5', winRate: Math.max(45, baseWinRate + 3 + curveBonus), globalAvg: 51.2 },
      { round: 'M6', turn: 'Game 6', winRate: Math.max(46, baseWinRate + 4 + curveBonus), globalAvg: 51.5 },
      { round: 'M7', turn: 'Game 7', winRate: Math.max(48, baseWinRate + 5 + curveBonus), globalAvg: 51.8 },
      { round: 'M8', turn: 'Game 8', winRate: Math.max(50, baseWinRate + 7 + curveBonus), globalAvg: 52.1 },
      { round: 'M9', turn: 'Game 9', winRate: Math.max(50, baseWinRate + 8 + curveBonus), globalAvg: 52.3 },
      { round: 'M10', turn: 'Game 10', winRate: Math.max(50, baseWinRate + 9 + curveBonus), globalAvg: 52.5 }
    ];
  }, [report.overallScore, report.manaCurveScore]);

  const currentProjectedWinRate = performanceTimeline && performanceTimeline.length > 0 
    ? performanceTimeline[performanceTimeline.length - 1].winRate 
    : 50;
  const globalBenchmarkWinRate = performanceTimeline && performanceTimeline.length > 0 
    ? performanceTimeline[performanceTimeline.length - 1].globalAvg 
    : 50;
  const winRateDelta = (currentProjectedWinRate - globalBenchmarkWinRate).toFixed(1);

  return (
    <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl space-y-3.5">
      
      {/* Header with Letter Grade Badge and Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Glowing Grade Sigil */}
          <div className={`w-12 h-12 rounded-2xl ${theme.badgeBg} ${theme.glow} border-2 flex items-center justify-center shrink-0`}>
            <span className={`font-cinzel text-xl ${theme.textColor} drop-shadow`}>
              {report.letterGrade}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                <Sparkles size={12} />
                Synergy Analyzer
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${theme.pillBg}`}>
                Score {report.overallScore}/100
              </span>
            </div>
            <h4 className="font-cinzel font-bold text-xs text-stone-200 mt-0.5">
              {report.dominantArchetype}
            </h4>
          </div>
        </div>

        {/* Expand Toggle */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playMicroSound('hover');
            setIsExpanded(prev => !prev);
          }}
          className="p-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/40 text-stone-400 hover:text-amber-200 transition text-xs flex items-center gap-1 font-cinzel"
        >
          <span>{isExpanded ? 'Collapse' : 'Composition'}</span>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* 4-Axis Subscore Bars */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        
        {/* Domain Consistency */}
        <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-stone-400">Domain Purity</span>
            <span className="font-bold text-amber-300">{report.domainConsistencyScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
            <div
              style={{ width: `${report.domainConsistencyScore}%` }}
              className="h-full rounded-full bg-amber-400"
            />
          </div>
        </div>

        {/* Attribute Balance */}
        <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-stone-400">Stat Balance</span>
            <span className="font-bold text-emerald-300">{report.attributeBalanceScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
            <div
              style={{ width: `${report.attributeBalanceScore}%` }}
              className="h-full rounded-full bg-emerald-400"
            />
          </div>
        </div>

        {/* Mana Curve */}
        <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-stone-400">Mana Curve</span>
            <span className="font-bold text-blue-300">{report.manaCurveScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
            <div
              style={{ width: `${report.manaCurveScore}%` }}
              className="h-full rounded-full bg-blue-400"
            />
          </div>
        </div>

        {/* Keyword Synergies */}
        <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-stone-400">Keyword Combos</span>
            <span className="font-bold text-purple-300">{report.keywordSynergyScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
            <div
              style={{ width: `${report.keywordSynergyScore}%` }}
              className="h-full rounded-full bg-purple-400"
            />
          </div>
        </div>

      </div>

      {/* ================= COMPOSITION DOUGHNUT CHARTS SECTION ================= */}
      <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-3">
        {/* Doughnut Chart Sub-Tabs */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-1.5">
            <PieIcon size={13} className="text-amber-400" />
            <span className="font-cinzel text-xs font-bold text-stone-300">
              Deck Breakdown
            </span>
          </div>

          <div className="flex items-center gap-1 bg-stone-900 p-0.5 rounded-lg border border-stone-800">
            <button
              type="button"
              onClick={() => {
                soundEngine.playMicroSound('hover');
                setActiveChartTab('domains');
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-cinzel transition font-bold ${
                activeChartTab === 'domains'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Domains
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playMicroSound('hover');
                setActiveChartTab('rarities');
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-cinzel transition font-bold ${
                activeChartTab === 'rarities'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Rarities
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playMicroSound('hover');
                setActiveChartTab('types');
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-cinzel transition font-bold ${
                activeChartTab === 'types'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Types
            </button>
          </div>
        </div>

        {totalCards === 0 ? (
          <div className="py-6 text-center text-xs text-stone-500 font-mono">
            Add cards to deck to render composition chart
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Recharts Doughnut */}
            <div className="w-36 h-36 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeSlices}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={58}
                    paddingAngle={3}
                    dataKey="count"
                    stroke="#1c1917"
                    strokeWidth={2}
                  >
                    {activeSlices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value} Cards (${Math.round((value / totalCards) * 100)}%)`,
                      name
                    ]}
                    contentStyle={{
                      backgroundColor: '#0c0a09',
                      borderColor: '#44403c',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#f5f5f4'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Doughnut Center Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-cinzel font-black text-sm text-stone-100 leading-none">
                  {totalCards}
                </span>
                <span className="text-[8px] font-mono uppercase text-stone-400 tracking-wider">
                  Cards
                </span>
              </div>
            </div>

            {/* Doughnut Legend Pills */}
            <div className="flex-1 grid grid-cols-2 gap-1.5 w-full">
              {activeSlices.map((slice, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-2 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[10px]"
                >
                  <div className="flex items-center gap-1.5 truncate mr-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: slice.color }}
                    />
                    <span className="font-cinzel font-bold text-stone-200 truncate">
                      {slice.name}
                    </span>
                  </div>
                  <span className="font-mono text-stone-400 shrink-0">
                    {slice.count} ({slice.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= PERFORMANCE-OVER-TIME TRACKER (SPARKLINE CHART) ================= */}
      <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-2.5">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-emerald-400" />
            <span className="font-cinzel text-xs font-bold text-stone-200">
              Performance Timeline
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-stone-400">
              Proj. Win Rate:
            </span>
            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
              Number(winRateDelta) >= 0 
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' 
                : 'bg-red-950/60 text-red-300 border-red-500/40'
            }`}>
              {currentProjectedWinRate}% ({Number(winRateDelta) >= 0 ? `+${winRateDelta}%` : `${winRateDelta}%`} vs Global)
            </span>
          </div>
        </div>

        {/* Sparkline Chart Container */}
        <div className="h-28 w-full relative pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceTimeline} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="deckWinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="globalAvgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#71717a" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#71717a" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="round" tick={{ fontSize: 9, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis domain={[30, 95]} tick={{ fontSize: 9, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2 rounded-xl bg-stone-900 border border-stone-700 text-[10px] font-mono shadow-xl space-y-1">
                        <div className="font-cinzel font-bold text-amber-300">{payload[0]?.payload?.turn}</div>
                        <div className="text-emerald-300 flex items-center justify-between gap-3">
                          <span>Current Deck:</span>
                          <span className="font-bold">{payload[0]?.value}% Win Rate</span>
                        </div>
                        <div className="text-stone-400 flex items-center justify-between gap-3">
                          <span>Global Avg:</span>
                          <span>{payload[1]?.value}% Win Rate</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="winRate" 
                stroke="#10b981" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#deckWinGrad)" 
                name="Current Deck" 
              />
              <Area 
                type="monotone" 
                dataKey="globalAvg" 
                stroke="#71717a" 
                strokeWidth={1.5} 
                strokeDasharray="3 3" 
                fillOpacity={1} 
                fill="url(#globalAvgGrad)" 
                name="Global Average" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Phase Win-Rate Breakdown Chips */}
        <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono text-[9.5px]">
          <div className="p-1.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 block text-[8.5px]">Early Game (T1-3)</span>
            <span className="text-amber-300 font-bold">{Math.round(performanceTimeline[1].winRate)}%</span>
          </div>
          <div className="p-1.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 block text-[8.5px]">Mid Game (T4-6)</span>
            <span className="text-emerald-300 font-bold">{Math.round(performanceTimeline[5].winRate)}%</span>
          </div>
          <div className="p-1.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 block text-[8.5px]">Late Apex (T7+)</span>
            <span className="text-cyan-300 font-bold">{Math.round(currentProjectedWinRate)}%</span>
          </div>
        </div>
      </div>

      {/* Expanded Diagnostics & Combos */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 border-t border-stone-800 space-y-3 overflow-hidden text-xs"
          >
            {/* Combos Detected */}
            {(report.comboSynergies || []).length > 0 && (
              <div className="space-y-1.5">
                <span className="font-cinzel text-[10px] uppercase text-amber-400 tracking-wider font-bold block">
                  Active Mechanical Synergies ({(report.comboSynergies || []).length})
                </span>
                <div className="space-y-1.5">
                  {(report.comboSynergies || []).map((combo, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-stone-950 border border-purple-500/30 text-[11px]">
                      <div className="flex items-center justify-between font-cinzel font-bold text-purple-200">
                        <span>{combo.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300">
                          {combo.synergyScore}% Synergy
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-0.5 font-sans">
                        {combo.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths & Recommendations */}
            <div className="space-y-2 pt-1">
              <div className="space-y-1">
                <span className="font-cinzel text-[10px] uppercase text-emerald-400 tracking-wider font-bold flex items-center gap-1">
                  <CheckCircle2 size={11} />
                  <span>Strengths</span>
                </span>
                {(report.strengths || []).map((s, i) => (
                  <p key={i} className="text-[10px] text-stone-300 font-sans pl-2 border-l border-emerald-500/40">
                    {s}
                  </p>
                ))}
              </div>

              {(report.recommendations || []).length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="font-cinzel text-[10px] uppercase text-amber-400 tracking-wider font-bold flex items-center gap-1">
                    <TrendingUp size={11} />
                    <span>Architect Advice</span>
                  </span>
                  {(report.recommendations || []).map((r, i) => (
                    <p key={i} className="text-[10px] text-stone-300 font-sans pl-2 border-l border-amber-500/40">
                      {r}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

