import React, { useState, useRef, useEffect } from 'react';
import { EnhancedCombatLogEntry } from './BattleLogsPanel';
import { 
  Sword, 
  Shield, 
  Zap, 
  Sparkles, 
  Flame, 
  Skull, 
  Hourglass, 
  ChevronUp, 
  ChevronDown, 
  Filter, 
  Maximize2, 
  Activity,
  Terminal,
  Volume2
} from 'lucide-react';

interface RealtimeCombatLogProps {
  logs: EnhancedCombatLogEntry[];
  currentTurn: number;
  activePlayer: 'player' | 'opponent';
  onOpenFullLogPanel?: () => void;
  className?: string;
}

export const RealtimeCombatLog: React.FC<RealtimeCombatLogProps> = ({
  logs,
  currentTurn,
  activePlayer,
  onOpenFullLogPanel,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'combat' | 'spells' | 'hazards' | 'turns'>('all');
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new log entry
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll, isExpanded]);

  // Filter logs based on chosen category
  const filteredLogs = logs.filter(log => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'combat') return log.type === 'attack' || log.type === 'death' || log.type === 'heal';
    if (activeFilter === 'spells') return log.type === 'spell' || log.type === 'special';
    if (activeFilter === 'hazards') return log.message.toLowerCase().includes('hazard') || log.source === 'system';
    if (activeFilter === 'turns') return log.type === 'turn';
    return true;
  });

  const getLogIcon = (type: string, message: string) => {
    if (message.toLowerCase().includes('hazard')) {
      return <Flame size={12} className="text-orange-400" />;
    }
    switch (type) {
      case 'attack':
        return <Sword size={12} className="text-red-400" />;
      case 'spell':
        return <Sparkles size={12} className="text-cyan-400" />;
      case 'heal':
        return <Shield size={12} className="text-emerald-400" />;
      case 'death':
        return <Skull size={12} className="text-purple-400" />;
      case 'turn':
        return <Hourglass size={12} className="text-amber-400" />;
      default:
        return <Zap size={12} className="text-yellow-400" />;
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'player':
        return {
          label: 'PLAYER',
          bg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
        };
      case 'opponent':
        return {
          label: 'TITAN',
          bg: 'bg-purple-950/80 text-purple-300 border-purple-500/50'
        };
      default:
        return {
          label: 'SYSTEM',
          bg: 'bg-amber-950/80 text-amber-300 border-amber-500/50'
        };
    }
  };

  return (
    <div className={`rounded-2xl bg-stone-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <Terminal size={14} className="text-amber-400" />
            <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-amber-200">
              Live Combat Log
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
            T{currentTurn} • {activePlayer === 'player' ? 'Your Turn' : 'Enemy Turn'}
          </span>
          <span className="text-[9.5px] font-mono text-stone-500 hidden sm:inline">
            ({logs.length} events)
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Filter Pills */}
          <div className="hidden md:flex items-center gap-1">
            {(['all', 'combat', 'spells', 'hazards', 'turns'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2 py-0.5 rounded text-[9px] font-cinzel font-semibold uppercase transition-colors ${
                  activeFilter === filter
                    ? 'bg-amber-500 text-black font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Full Log Modal Trigger */}
          {onOpenFullLogPanel && (
            <button
              onClick={onOpenFullLogPanel}
              className="p-1 rounded bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-700 hover:border-amber-500/50 transition-colors"
              title="Open Full 5-Axis Telemetry & Historical Graph"
            >
              <Maximize2 size={12} />
            </button>
          )}

          {/* Collapse / Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 transition-colors"
            title={isExpanded ? 'Collapse Combat Feed' : 'Expand Combat Feed'}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>

      {/* Ticker / Feed Body */}
      {isExpanded && (
        <div className="p-2 space-y-2">
          {/* Mobile Filter Tabs */}
          <div className="flex md:hidden items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
            {(['all', 'combat', 'spells', 'hazards', 'turns'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2 py-0.5 rounded text-[8.5px] font-cinzel font-semibold uppercase whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-amber-500 text-black font-bold'
                    : 'bg-stone-900 text-stone-400 border border-stone-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Log Stream Area */}
          <div 
            ref={logContainerRef}
            className="h-32 sm:h-36 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin text-[11px] font-mono selection:bg-amber-500 selection:text-black"
          >
            {filteredLogs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-stone-500 italic text-xs">
                Awaiting combat engagement... Events will stream here in real time.
              </div>
            ) : (
              filteredLogs.map((log, idx) => {
                const badge = getSourceBadge(log.source);
                const isLatest = idx === filteredLogs.length - 1;

                return (
                  <div
                    key={log.id || `log-${idx}`}
                    className={`p-1.5 rounded-lg border transition-all flex items-start gap-2 ${
                      isLatest
                        ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                        : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700'
                    }`}
                  >
                    {/* Timestamp / Turn tag */}
                    <div className="flex items-center gap-1 shrink-0 mt-0.5">
                      <span className="text-[9px] text-stone-500">
                        {log.turn ? `T${log.turn}` : '•'}
                      </span>
                      {getLogIcon(log.type, log.message)}
                    </div>

                    {/* Source Badge */}
                    <span className={`px-1 py-0.2 rounded text-[8px] font-bold border uppercase shrink-0 mt-0.5 ${badge.bg}`}>
                      {badge.label}
                    </span>

                    {/* Message */}
                    <div className="flex-1 text-stone-200 leading-tight">
                      <span>{log.message}</span>
                      {log.value !== undefined && (
                        <span className={`ml-1.5 font-bold px-1 rounded text-[9.5px] ${
                          log.type === 'heal' 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                            : 'bg-red-950 text-red-300 border border-red-600/40'
                        }`}>
                          {log.type === 'heal' ? `+${log.value} HP` : `-${log.value} DMG`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar with Auto-scroll Indicator */}
          <div className="flex items-center justify-between px-1 pt-1 border-t border-stone-800/60 text-[9.5px] font-mono text-stone-400">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 cursor-pointer hover:text-stone-200">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-0 w-3 h-3"
                />
                <span>Auto-follow feed</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              {filteredLogs.length > 0 && (
                <span className="text-amber-400 font-semibold truncate max-w-[240px]">
                  Latest: {filteredLogs[filteredLogs.length - 1].message.slice(0, 38)}...
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
