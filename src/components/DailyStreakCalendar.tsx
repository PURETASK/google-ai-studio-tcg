import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DailyStreakState, DailyStreakDay } from '../types';
import { missionsManager } from '../utils/missionsManager';
import { soundEngine } from '../utils/audioEngine';
import { 
  Flame, 
  Calendar, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  Lock, 
  Award, 
  Star, 
  Zap, 
  ShieldCheck,
  TrendingUp,
  Clock,
  Coins
} from 'lucide-react';

interface DailyStreakCalendarProps {
  className?: string;
}

export const DailyStreakCalendar: React.FC<DailyStreakCalendarProps> = ({ className = '' }) => {
  const [streakState, setStreakState] = useState<DailyStreakState>(missionsManager.getStreakState());
  const [claimingDayIndex, setClaimingDayIndex] = useState<number | null>(null);

  useEffect(() => {
    const unsub = missionsManager.subscribeStreak(setStreakState);
    return () => unsub();
  }, []);

  const bonusMultiplier = Math.round((missionsManager.getStreakBonusMultiplier() - 1.0) * 100);

  const handleClaim = (day: DailyStreakDay) => {
    if (!day.isUnlocked || day.isClaimed) return;
    setClaimingDayIndex(day.dayIndex);
    missionsManager.claimStreakReward(day.dayIndex);
    setTimeout(() => setClaimingDayIndex(null), 1000);
  };

  return (
    <div className={`p-6 rounded-3xl bg-stone-900/95 border border-amber-500/30 shadow-2xl relative overflow-hidden backdrop-blur-md ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-32 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Streak Counter & Bonus Multiplier */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-800 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
              <Flame size={24} className="text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Calendar size={13} />
                Consecutive Login Cycle
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30 font-bold">
                +{bonusMultiplier}% MATCH MULTIPLIER
              </span>
            </div>
            <h3 className="font-cinzel font-black text-xl text-stone-100 flex items-center gap-2 mt-0.5">
              <span>{streakState.currentStreak} Day Flame Streak</span>
              <span className="text-xs font-mono font-normal text-stone-400">
                (Record: {streakState.highestStreak} Days)
              </span>
            </h3>
          </div>
        </div>

        {/* Global Streak Stat Pills */}
        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-right">
            <span className="text-[10px] font-mono text-stone-400 block uppercase">Total Logins</span>
            <span className="font-cinzel font-bold text-amber-300 text-sm">
              {streakState.totalConsecutiveLogins} Days
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-stone-950 border border-amber-500/30 text-right">
            <span className="text-[10px] font-mono text-stone-400 block uppercase">Next Milestone</span>
            <span className="font-cinzel font-bold text-orange-400 text-sm">
              Day 7 Mythic Cache
            </span>
          </div>
        </div>
      </div>

      {/* 7-Day Interactive Streak Calendar Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
        {streakState.streakDays.map((day) => {
          const isNextToClaim = day.isUnlocked && !day.isClaimed;
          const isGrandReward = day.dayIndex === 7 || !!day.packReward;

          return (
            <div
              key={day.dayIndex}
              className={`p-3.5 rounded-2xl border transition relative flex flex-col justify-between ${
                day.isClaimed
                  ? 'bg-stone-950/80 border-emerald-500/40 text-stone-300'
                  : isNextToClaim
                  ? 'bg-gradient-to-b from-stone-900 to-amber-950/40 border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : isGrandReward
                  ? 'bg-stone-950/60 border-purple-500/40'
                  : 'bg-stone-950/50 border-stone-800/80 opacity-70'
              }`}
            >
              {/* Day Badge & Status Icon */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-mono font-bold ${isNextToClaim ? 'text-amber-300' : 'text-stone-400'}`}>
                  Day {day.dayIndex}
                </span>

                {day.isClaimed ? (
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 size={12} />
                  </span>
                ) : isNextToClaim ? (
                  <span className="p-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/50 animate-bounce">
                    <Sparkles size={12} />
                  </span>
                ) : (
                  <span className="p-1 rounded-full bg-stone-900 text-stone-600 border border-stone-800">
                    <Lock size={12} />
                  </span>
                )}
              </div>

              {/* Reward Icon / Graphic */}
              <div className="my-3 flex flex-col items-center justify-center text-center">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 transition ${
                  day.isClaimed
                    ? 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-400'
                    : isNextToClaim
                    ? 'bg-amber-500/20 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : isGrandReward
                    ? 'bg-purple-950/40 border border-purple-500/30 text-purple-300'
                    : 'bg-stone-900 border border-stone-800 text-stone-500'
                }`}>
                  {day.packReward ? (
                    <Gift size={20} className={isNextToClaim ? 'text-amber-300 animate-pulse' : ''} />
                  ) : (
                    <Coins size={20} />
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs font-cinzel font-bold text-amber-200">
                    +{day.shards} Shards
                  </div>
                  <div className="text-[10px] font-mono text-stone-400">
                    +{day.dust} Dust • +{day.xp} XP
                  </div>
                  {day.packReward && (
                    <div className="text-[9px] font-mono font-bold text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-500/30 mt-1 line-clamp-1">
                      {day.packReward}
                    </div>
                  )}
                </div>
              </div>

              {/* Claim Button / Status Label */}
              <div>
                {day.isClaimed ? (
                  <div className="w-full py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold text-center">
                    CLAIMED ✓
                  </div>
                ) : isNextToClaim ? (
                  <button
                    type="button"
                    onClick={() => handleClaim(day)}
                    disabled={claimingDayIndex === day.dayIndex}
                    className="w-full py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 text-stone-950 font-cinzel font-black text-xs shadow-[0_0_12px_rgba(251,191,36,0.4)] transition transform hover:scale-105 active:scale-95"
                  >
                    {claimingDayIndex === day.dayIndex ? 'CLAIMING...' : 'CLAIM TODAY'}
                  </button>
                ) : (
                  <div className="w-full py-1 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-500 text-[10px] font-mono text-center">
                    LOCKED
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Streak Tip */}
      <div className="mt-4 pt-3 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-amber-400" />
          <span>Login daily to prevent your flame streak from resetting. Day 7 grants a Guaranteed Divine Relic pack!</span>
        </div>
        <span className="font-mono text-[10px] text-stone-400">
          Cycle resets at 00:00 UTC
        </span>
      </div>
    </div>
  );
};
