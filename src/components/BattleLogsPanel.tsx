import React, { useState } from 'react';
import { CombatLogEntry, PlayerState, MatchStats, ArenaEnvironment } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { economyManager, MatchHistoryRecord } from '../utils/economyManager';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  ScrollText, 
  Sword, 
  Shield, 
  Zap, 
  Sparkles, 
  MapPin, 
  Copy, 
  Check, 
  Activity, 
  X,
  TrendingUp,
  Trophy,
  Flame,
  Clock,
  Layers,
  Award,
  BarChart3,
  Calendar
} from 'lucide-react';

export type TacticalAxis = 'all' | 'power' | 'defense' | 'essence' | 'domain' | 'lane';

export interface EnhancedCombatLogEntry extends CombatLogEntry {
  turn?: number;
  matrixAxis?: TacticalAxis;
  matrixValue?: number;
  lane?: string;
  domainAffinity?: string;
}

interface BattleLogsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  logs: EnhancedCombatLogEntry[];
  currentTurn: number;
  matchStats: MatchStats;
  player: PlayerState;
  opponent: PlayerState;
  environment: ArenaEnvironment;
}

export const BattleLogsPanel: React.FC<BattleLogsPanelProps> = ({
  isOpen,
  onClose,
  logs,
  currentTurn,
  matchStats,
  player,
  opponent,
  environment
}) => {
  const [viewMode, setViewMode] = useState<'stream' | 'streaks'>('stream');
  const [selectedAxis, setSelectedAxis] = useState<TacticalAxis>('all');
  const [selectedTurnFilter, setSelectedTurnFilter] = useState<number | 'all'>('all');
  const [copiedLogs, setCopiedLogs] = useState(false);

  if (!isOpen) return null;

  const matchHistory = economyManager.getMatchHistory().slice(-10);
  const economy = economyManager.getEconomy();

  // Prepare chart dataset for last 10 games
  const chartData = matchHistory.map((m, idx) => ({
    name: `G${m.gameIndex || idx + 1}`,
    gameLabel: `Game ${m.gameIndex || idx + 1}`,
    streak: m.streakCount,
    damageDealt: m.damageDealt,
    damageTaken: m.damageTaken,
    turns: m.turnCount,
    score: m.score,
    isVictory: m.isVictory ? 1 : 0,
    result: m.isVictory ? 'VICTORY' : 'DEFEAT',
    opponent: m.opponentName,
    domain: m.playerDomain
  }));

  // Calculations for quick metrics
  const totalGames = matchHistory.length;
  const winsCount = matchHistory.filter(m => m.isVictory).length;
  const winRate = totalGames > 0 ? Math.round((winsCount / totalGames) * 100) : 0;
  const avgDamageDealt = totalGames > 0 ? Math.round(matchHistory.reduce((acc, g) => acc + g.damageDealt, 0) / totalGames) : 0;
  const avgDamageTaken = totalGames > 0 ? Math.round(matchHistory.reduce((acc, g) => acc + g.damageTaken, 0) / totalGames) : 0;

  // Filter logs by 5-axis tactical matrix and turn
  const filteredLogs = logs.filter(log => {
    if (selectedAxis !== 'all') {
      if (log.matrixAxis && log.matrixAxis !== selectedAxis) {
        return false;
      }
      // Infer axis if not explicitly tagged
      if (!log.matrixAxis) {
        if (selectedAxis === 'power' && !['attack', 'slay'].includes(log.type) && !log.message.includes('DMG') && !log.message.includes('Strike')) return false;
        if (selectedAxis === 'defense' && !['heal'].includes(log.type) && !log.message.includes('Shield') && !log.message.includes('Guard')) return false;
        if (selectedAxis === 'essence' && !['spell'].includes(log.type) && !log.message.includes('Essence') && !log.message.includes('Cast')) return false;
        if (selectedAxis === 'domain' && !['hazard', 'special'].includes(log.type) && !log.message.includes('Hazard') && !log.message.includes('Sanctuary') && !log.message.includes('Caldera')) return false;
        if (selectedAxis === 'lane' && !['summon'].includes(log.type) && !log.message.includes('Guard #') && !log.message.includes('Throne')) return false;
      }
    }

    if (selectedTurnFilter !== 'all' && log.turn && log.turn !== selectedTurnFilter) {
      return false;
    }

    return true;
  });

  // Calculate 5-axis tactical matrix distribution
  const axisCounts = {
    power: logs.filter(l => l.matrixAxis === 'power' || ['attack', 'slay'].includes(l.type) || l.message.includes('DMG')).length,
    defense: logs.filter(l => l.matrixAxis === 'defense' || l.type === 'heal' || l.message.includes('Shield')).length,
    essence: logs.filter(l => l.matrixAxis === 'essence' || l.type === 'spell' || l.message.includes('Essence')).length,
    domain: logs.filter(l => l.matrixAxis === 'domain' || l.type === 'hazard' || l.message.includes('Hazard')).length,
    lane: logs.filter(l => l.matrixAxis === 'lane' || l.type === 'summon' || l.message.includes('Guard')).length
  };

  const totalActions = Object.values(axisCounts).reduce((a, b) => a + b, 0) || 1;

  // Export event stream as formatted transcript
  const handleCopyTranscript = () => {
    soundEngine.playMicroSound('click');
    const header = `=== REALM OF NEXUS TCG: 5-AXIS BATTLE LOG STREAM ===\n` +
      `Match: ${player.name} (${player.title}) VS ${opponent.name} (${opponent.title})\n` +
      `Environment: ${environment.name} (Hazard: ${environment.hazardEffectName})\n` +
      `Recorded Turns: ${currentTurn} | Total Events: ${logs.length}\n` +
      `-----------------------------------------------------\n\n`;

    const body = logs.map((l) => 
      `[T${l.turn || 1} ${l.timestamp}] [${(l.matrixAxis || 'SYSTEM').toUpperCase()}] (${l.actor.toUpperCase()}) ${l.message}`
    ).join('\n');

    navigator.clipboard.writeText(header + body);
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  const getAxisIcon = (axis: TacticalAxis) => {
    switch (axis) {
      case 'power': return <Sword size={14} className="text-red-400" />;
      case 'defense': return <Shield size={14} className="text-blue-400" />;
      case 'essence': return <Zap size={14} className="text-yellow-400" />;
      case 'domain': return <Sparkles size={14} className="text-emerald-400" />;
      case 'lane': return <MapPin size={14} className="text-purple-400" />;
      default: return <Activity size={14} className="text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="max-w-4xl w-full bg-stone-950 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950/40 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-md">
              <ScrollText size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel font-black text-lg text-amber-100">
                  ARENA BATTLE LOGS & TELEMETRY
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600 font-bold uppercase">
                  {viewMode === 'stream' ? '5-Axis Matrix' : 'Recharts Telemetry'}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                {viewMode === 'stream' 
                  ? `Tracking Live Turn Actions & Tactical Maneuvers • Biome: ${environment.name}`
                  : 'Historical Win/Loss Momentum & Damage Telemetry Across Last 10 Matches'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 p-1 font-cinzel text-xs">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playMicroSound('hover');
                  setViewMode('stream');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                  viewMode === 'stream'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <ScrollText size={13} />
                <span>Live Stream</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playMicroSound('hover');
                  setViewMode('streaks');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                  viewMode === 'streaks'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <TrendingUp size={13} />
                <span>Win/Loss Streaks (10G)</span>
              </button>
            </div>

            {viewMode === 'stream' && (
              <button
                type="button"
                id="btn-copy-battle-transcript"
                onClick={handleCopyTranscript}
                className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-cinzel font-bold flex items-center gap-1.5 transition shadow"
                title="Copy battle transcript"
              >
                {copiedLogs ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-amber-400" />}
                <span className="hidden sm:inline">{copiedLogs ? 'Copied!' : 'Export'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundEngine.playMicroSound('click');
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center border border-stone-800 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {viewMode === 'stream' ? (
          <>
            {/* 5-Axis Matrix Telemetry Banner */}
            <div className="px-6 py-3.5 bg-stone-900/90 border-b border-stone-800/80">
              <span className="text-[10px] font-cinzel text-amber-400 font-bold uppercase tracking-wider block mb-2">
                5-Axis Tactical Matrix Activity Density
              </span>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'power' as const, label: 'Power (DMG)', count: axisCounts.power, color: 'from-red-600 to-rose-500', text: 'text-red-400', icon: <Sword size={11} /> },
                  { id: 'defense' as const, label: 'Defense (Shield)', count: axisCounts.defense, color: 'from-blue-600 to-cyan-500', text: 'text-blue-400', icon: <Shield size={11} /> },
                  { id: 'essence' as const, label: 'Essence (Spells)', count: axisCounts.essence, color: 'from-yellow-600 to-amber-500', text: 'text-yellow-400', icon: <Zap size={11} /> },
                  { id: 'domain' as const, label: 'Domain Surges', count: axisCounts.domain, color: 'from-emerald-600 to-green-500', text: 'text-emerald-400', icon: <Sparkles size={11} /> },
                  { id: 'lane' as const, label: 'Lanes / Deploy', count: axisCounts.lane, color: 'from-purple-600 to-violet-500', text: 'text-purple-400', icon: <MapPin size={11} /> }
                ].map(axis => (
                  <button
                    key={axis.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('hover');
                      setSelectedAxis(selectedAxis === axis.id ? 'all' : axis.id);
                    }}
                    className={`p-2 rounded-xl border text-left transition ${
                      selectedAxis === axis.id
                        ? 'bg-stone-950 border-amber-400 ring-1 ring-amber-400 shadow-md'
                        : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-cinzel font-bold mb-1">
                      <span className={`flex items-center gap-1 ${axis.text}`}>
                        {axis.icon}
                        <span>{axis.label}</span>
                      </span>
                      <span className="font-mono text-stone-200">{axis.count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${axis.color} transition-all duration-300`}
                        style={{ width: `${(axis.count / totalActions) * 100}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Bar */}
            <div className="px-6 py-2.5 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Axis Selector Pills */}
              <div className="flex items-center gap-1 overflow-x-auto">
                <span className="text-[10px] font-cinzel text-stone-400 uppercase font-bold mr-1">Filter Matrix:</span>
                {(['all', 'power', 'defense', 'essence', 'domain', 'lane'] as const).map(axis => (
                  <button
                    key={axis}
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('hover');
                      setSelectedAxis(axis);
                    }}
                    className={`px-2.5 py-1 rounded-lg capitalize font-cinzel font-bold text-[11px] transition flex items-center gap-1 ${
                      selectedAxis === axis
                        ? 'bg-amber-500 text-black shadow'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    {getAxisIcon(axis)}
                    <span>{axis}</span>
                  </button>
                ))}
              </div>

              {/* Turn Filter Dropdown */}
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="text-stone-400">Turn View:</span>
                <select
                  value={selectedTurnFilter}
                  onChange={(e) => {
                    soundEngine.playMicroSound('hover');
                    setSelectedTurnFilter(e.target.value === 'all' ? 'all' : Number(e.target.value));
                  }}
                  className="bg-stone-900 text-amber-300 border border-stone-700 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Turns (1 - {currentTurn})</option>
                  {Array.from({ length: currentTurn }, (_, i) => i + 1).map(turnNum => (
                    <option key={turnNum} value={turnNum}>Turn {turnNum}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Event Stream List */}
            <div className="p-6 overflow-y-auto space-y-2 flex-1 scrollbar-thin bg-stone-950">
              {filteredLogs.length === 0 ? (
                <div className="p-8 text-center text-stone-400 font-cinzel text-sm space-y-2">
                  <Activity size={32} className="mx-auto text-stone-600 animate-pulse" />
                  <p>No actions recorded for the selected 5-axis filter.</p>
                  <p className="text-xs text-stone-400 font-mono">Select "All" to inspect the full event stream.</p>
                </div>
              ) : (
                filteredLogs.map((log) => {
                  const isPlayer = log.actor === 'player';
                  const isOpponent = log.actor === 'opponent';

                  return (
                    <div
                      key={log.id}
                      className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-all hover:bg-stone-900/60 ${
                        isPlayer
                          ? 'bg-amber-950/20 border-amber-500/30'
                          : isOpponent
                            ? 'bg-purple-950/20 border-purple-500/30'
                            : 'bg-stone-900/40 border-stone-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Timestamp & Turn Badge */}
                        <div className="flex flex-col items-center shrink-0">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">
                            T{log.turn || 1}
                          </span>
                          <span className="text-[8px] font-mono text-stone-400 mt-0.5">
                            {log.timestamp}
                          </span>
                        </div>

                        {/* Actor Pill & Message */}
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[9px] font-cinzel font-black uppercase px-2 py-0.5 rounded-full border ${
                              isPlayer
                                ? 'bg-amber-950 text-amber-300 border-amber-600'
                                : isOpponent
                                  ? 'bg-purple-950 text-purple-300 border-purple-600'
                                  : 'bg-stone-900 text-stone-300 border-stone-700'
                            }`}>
                              {log.actor === 'player' ? player.name : log.actor === 'opponent' ? opponent.name : 'System Hazard'}
                            </span>

                            {log.matrixAxis && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800 capitalize">
                                Axis: {log.matrixAxis}
                              </span>
                            )}
                          </div>

                          <p className={`text-xs leading-relaxed font-sans ${
                            isPlayer ? 'text-stone-100' : isOpponent ? 'text-purple-100' : 'text-stone-300'
                          }`}>
                            {log.message}
                          </p>
                        </div>
                      </div>

                      {/* Damage / Value Highlight */}
                      {log.damageValue !== undefined && (
                        <span className="font-mono font-black text-sm text-red-400 shrink-0 px-2 py-1 rounded bg-red-950/60 border border-red-800">
                          -{log.damageValue} HP
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          /* ================= RECHARTS WIN/LOSS STREAKS AREA CHART VIEW ================= */
          <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin bg-stone-950">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40">
                <div className="flex items-center justify-between text-amber-400 text-xs font-cinzel font-bold mb-1">
                  <span>Current Streak</span>
                  <Flame size={15} />
                </div>
                <div className="font-mono font-black text-2xl text-amber-300">
                  {economy.winStreak} Wins
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                  Best: {economy.highestWinStreak} in a row
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40">
                <div className="flex items-center justify-between text-emerald-400 text-xs font-cinzel font-bold mb-1">
                  <span>10-Game Win Rate</span>
                  <Trophy size={15} />
                </div>
                <div className="font-mono font-black text-2xl text-emerald-300">
                  {winRate}%
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                  {winsCount}W - {totalGames - winsCount}L
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-500/40">
                <div className="flex items-center justify-between text-red-400 text-xs font-cinzel font-bold mb-1">
                  <span>Avg DMG Dealt</span>
                  <Sword size={15} />
                </div>
                <div className="font-mono font-black text-2xl text-red-300">
                  {avgDamageDealt} HP
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                  Per Arena match
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/40">
                <div className="flex items-center justify-between text-blue-400 text-xs font-cinzel font-bold mb-1">
                  <span>Avg DMG Taken</span>
                  <Shield size={15} />
                </div>
                <div className="font-mono font-black text-2xl text-blue-300">
                  {avgDamageTaken} HP
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                  Net Diff: +{avgDamageDealt - avgDamageTaken} HP
                </div>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-amber-200 flex items-center gap-2">
                    <TrendingUp size={16} className="text-amber-400" />
                    <span>Win / Loss Momentum & Combat Score Trajectory</span>
                  </h4>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Visualizing win streak counts and relative tactical performance across the last {chartData.length} recorded arena games
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/60 text-amber-300 border border-amber-500/30">
                  Recharts v2 Area Density
                </span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      {/* Gradient for Win Streak */}
                      <linearGradient id="streakGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                      </linearGradient>

                      {/* Gradient for Damage Dealt */}
                      <linearGradient id="damageDealtGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                      </linearGradient>

                      {/* Gradient for Damage Taken */}
                      <linearGradient id="damageTakenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#78716c" 
                      tick={{ fill: '#a8a29e', fontSize: 11, fontFamily: 'monospace' }} 
                    />
                    <YAxis 
                      stroke="#78716c" 
                      tick={{ fill: '#a8a29e', fontSize: 11, fontFamily: 'monospace' }} 
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-3 rounded-xl bg-stone-950/95 border border-amber-500/60 shadow-2xl text-xs space-y-1 font-sans">
                              <div className="flex items-center justify-between gap-4 font-cinzel font-bold text-amber-200 border-b border-stone-800 pb-1">
                                <span>{data.gameLabel}</span>
                                <span className={data.result === 'VICTORY' ? 'text-emerald-400' : 'text-red-400'}>
                                  {data.result}
                                </span>
                              </div>
                              <div className="text-[11px] text-stone-300 font-mono">
                                Opponent: <strong className="text-stone-100">{data.opponent}</strong>
                              </div>
                              <div className="text-[11px] text-amber-300 font-mono">
                                Streak: <strong>{data.streak} Wins</strong>
                              </div>
                              <div className="text-[11px] text-red-300 font-mono">
                                DMG Dealt: <strong>{data.damageDealt} HP</strong>
                              </div>
                              <div className="text-[11px] text-blue-300 font-mono">
                                DMG Taken: <strong>{data.damageTaken} HP</strong>
                              </div>
                              <div className="text-[11px] text-purple-300 font-mono">
                                Turns: <strong>{data.turns}</strong>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: '11px', fontFamily: 'Cinzel, sans-serif', paddingTop: '8px' }}
                    />
                    
                    <Area 
                      type="monotone" 
                      dataKey="damageDealt" 
                      name="Damage Dealt" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#damageDealtGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="damageTaken" 
                      name="Damage Taken" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#damageTakenGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="streak" 
                      name="Win Streak Count" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#streakGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Match History Table */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
              <h5 className="font-cinzel font-bold text-xs text-stone-200 uppercase tracking-wider">
                Last 10 Games Breakdown Log
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-stone-400 border-b border-stone-800 pb-1">
                      <th className="py-2 px-2">Game</th>
                      <th className="py-2 px-2">Result</th>
                      <th className="py-2 px-2">Opponent</th>
                      <th className="py-2 px-2">Streak</th>
                      <th className="py-2 px-2">Dealt</th>
                      <th className="py-2 px-2">Taken</th>
                      <th className="py-2 px-2">Turns</th>
                      <th className="py-2 px-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchHistory.map((m) => (
                      <tr key={m.id} className="border-b border-stone-800/40 hover:bg-stone-800/40">
                        <td className="py-2 px-2 font-bold text-stone-300">#{m.gameIndex}</td>
                        <td className="py-2 px-2 font-bold">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            m.isVictory 
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' 
                              : 'bg-red-950 text-red-300 border border-red-600'
                          }`}>
                            {m.isVictory ? 'VICTORY' : 'DEFEAT'}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-stone-300 truncate max-w-[140px]">{m.opponentName}</td>
                        <td className="py-2 px-2 text-amber-300 font-bold">{m.streakCount}</td>
                        <td className="py-2 px-2 text-red-400">{m.damageDealt}</td>
                        <td className="py-2 px-2 text-blue-400">{m.damageTaken}</td>
                        <td className="py-2 px-2 text-stone-400">{m.turnCount}</td>
                        <td className="py-2 px-2 text-stone-400 text-[10px]">{m.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Footer with Summary Metrics */}
        <div className="px-6 py-3 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-4 text-stone-400">
            <span>Player DMG: <strong className="text-red-400">{matchStats.damageDealtByPlayer}</strong></span>
            <span>Opponent DMG: <strong className="text-orange-400">{matchStats.damageTakenByPlayer}</strong></span>
            <span>Spells Cast: <strong className="text-blue-400">{matchStats.spellsCastPlayer}</strong></span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('click');
              onClose();
            }}
            className="px-5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs uppercase tracking-wider shadow"
          >
            Return to Arena
          </button>
        </div>
      </div>
    </div>
  );
};
