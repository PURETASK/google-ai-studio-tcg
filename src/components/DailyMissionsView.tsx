import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DailyMission, MissionCategory } from '../types';
import { missionsManager } from '../utils/missionsManager';
import { economyManager, PlayerEconomy } from '../utils/economyManager';
import { soundEngine } from '../utils/audioEngine';
import { DailyStreakCalendar } from './DailyStreakCalendar';
import { 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Swords, 
  Hammer, 
  Clock, 
  Gift, 
  Layers, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  RotateCcw,
  Star,
  Coins,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

interface DailyMissionsViewProps {
  onNavigateToArena: () => void;
  onNavigateToForge: () => void;
  onNavigateToBooster: () => void;
  onNavigateToCodex: () => void;
  onNavigateToDecks: () => void;
}

export const DailyMissionsView: React.FC<DailyMissionsViewProps> = ({
  onNavigateToArena,
  onNavigateToForge,
  onNavigateToBooster,
  onNavigateToCodex,
  onNavigateToDecks
}) => {
  const [missions, setMissions] = useState<DailyMission[]>(missionsManager.getMissions());
  const [economy, setEconomy] = useState<PlayerEconomy>(economyManager.getEconomy());
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory | 'All'>('All');
  const [claimedNotice, setClaimedNotice] = useState<string | null>(null);

  useEffect(() => {
    const unsubMissions = missionsManager.subscribe(setMissions);
    const unsubEconomy = economyManager.subscribe(setEconomy);
    return () => {
      unsubMissions();
      unsubEconomy();
    };
  }, []);

  const claimableCount = missions.filter(m => m.isCompleted && !m.isClaimed).length;
  const completedCount = missions.filter(m => m.isCompleted).length;
  const totalMissions = missions.length;
  const progressPercent = Math.round((completedCount / totalMissions) * 100);

  const filteredMissions = missions.filter(m => {
    if (selectedCategory !== 'All' && m.category !== selectedCategory) return false;
    return true;
  });

  const handleClaim = (mission: DailyMission) => {
    const success = missionsManager.claimMissionReward(mission.id);
    if (success) {
      setClaimedNotice(`Claimed ${mission.rewards.shards} Shards & ${mission.rewards.dust} Dust from ${mission.title}!`);
      setTimeout(() => setClaimedNotice(null), 3000);
    }
  };

  const handleClaimAll = () => {
    const count = missionsManager.claimAllCompleted();
    if (count > 0) {
      setClaimedNotice(`Claimed all rewards from ${count} completed missions!`);
      setTimeout(() => setClaimedNotice(null), 3000);
    }
  };

  const getActionCallback = (category: MissionCategory) => {
    switch (category) {
      case 'battle': return onNavigateToArena;
      case 'forge': return onNavigateToForge;
      case 'collection': return onNavigateToBooster;
      case 'deck': return onNavigateToDecks;
      case 'mastery': return onNavigateToCodex;
      default: return onNavigateToArena;
    }
  };

  const getActionLabel = (category: MissionCategory) => {
    switch (category) {
      case 'battle': return 'Enter Arena';
      case 'forge': return 'Open Forge';
      case 'collection': return 'Open Vault';
      case 'deck': return 'Build Deck';
      case 'mastery': return 'View Codex';
      default: return 'Start Quest';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Top Hero Banner */}
      <div className="p-6 rounded-3xl bg-stone-900/95 border border-amber-500/40 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <Trophy size={15} className="text-amber-400" />
                Daily Operations & Divine Bounties
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                ACTIVE CYCLE
              </span>
            </div>
            <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100 mt-1">
              Realm Daily Missions & Bounties
            </h2>
            <p className="text-stone-300 text-xs mt-1 max-w-2xl leading-relaxed">
              Complete daily tactical combat milestones, card crafting commissions, and deck architecture objectives 
              to claim Astral Shards, Cosmic Dust, Mastery XP, and free Booster Packs.
            </p>
          </div>

          {/* Quick Balance & Timer Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-stone-950 border border-stone-800 flex items-center gap-3">
              <Clock size={16} className="text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Cycle Reset</span>
                <span className="font-cinzel font-bold text-xs text-stone-200">18h 42m remaining</span>
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-stone-950 border border-amber-500/30 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">💎</span>
                <div>
                  <span className="text-[9px] font-mono uppercase text-stone-400 block">Shards</span>
                  <span className="font-cinzel font-bold text-xs text-amber-300">{economy.astralShards}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 border-l border-stone-800 pl-3">
                <span className="text-sm">✨</span>
                <div>
                  <span className="text-[9px] font-mono uppercase text-stone-400 block">Dust</span>
                  <span className="font-cinzel font-bold text-xs text-purple-300">{economy.cosmicDust}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Streak Meter */}
        <div className="mt-6 pt-5 border-t border-stone-800/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Award size={16} className="text-amber-400" />
              <span className="font-cinzel text-xs font-bold text-stone-200">
                Daily Completion Milestone: <span className="text-amber-300">{completedCount}</span> / {totalMissions} Quests
              </span>
            </div>
            {claimableCount > 0 ? (
              <button
                type="button"
                id="btn-claim-all-missions"
                onClick={handleClaimAll}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(234,179,8,0.4)] flex items-center gap-1.5 transition hover:scale-105"
              >
                <Sparkles size={14} />
                <span>Claim All Available ({claimableCount})</span>
              </button>
            ) : (
              <span className="text-[11px] font-mono text-stone-400">
                {completedCount === totalMissions ? '🎉 All Daily Bounties Finished!' : `${totalMissions - completedCount} Quests Pending`}
              </span>
            )}
          </div>

          <div className="w-full h-3 bg-stone-950 rounded-full overflow-hidden border border-stone-800 p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* Claim Notification Toast */}
      <AnimatePresence>
        {claimedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-cinzel font-bold flex items-center justify-between shadow-lg shadow-emerald-950/40"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>{claimedNotice}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">CURRENCY DEPOSITED</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Flame Streak & Consecutive Login Calendar */}
      <DailyStreakCalendar />

      {/* Filter Category Bar */}
      <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-cinzel">
          <span className="text-[11px] text-stone-400 mr-2 flex items-center gap-1">
            <Filter size={13} />
            <span>Category:</span>
          </span>
          {(['All', 'battle', 'forge', 'collection', 'deck', 'mastery'] as const).map(cat => {
            const labelMap: Record<string, string> = {
              All: 'All Quests',
              battle: '⚔️ Combat',
              forge: '⚒️ Forge & Studio',
              collection: '💎 Vault & Packs',
              deck: '🛡️ Deck Architecture',
              mastery: '📜 Lore & Codex'
            };
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundEngine.playMicroSound('hover');
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-black shadow'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {labelMap[cat]}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => missionsManager.resetDailyMissions()}
          className="px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-cinzel flex items-center gap-1.5 transition"
          title="Reset quest counters for testing"
        >
          <RotateCcw size={13} />
          <span>Reset Quests</span>
        </button>
      </div>

      {/* Missions Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => {
          const isDone = mission.isCompleted;
          const isClaimed = mission.isClaimed;
          const pct = Math.min(100, Math.round((mission.currentCount / mission.targetCount) * 100));

          return (
            <motion.div
              key={mission.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 relative overflow-hidden ${
                isClaimed
                  ? 'bg-stone-950/60 border-stone-800/80 opacity-70'
                  : isDone
                  ? 'bg-gradient-to-br from-amber-950/30 to-stone-900 border-amber-500/60 shadow-lg shadow-amber-950/20'
                  : 'bg-stone-900/90 border-stone-800 hover:border-stone-700 shadow-md'
              }`}
            >
              {/* Header: Icon, Badge, Title, Description */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${
                      isDone
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-inner'
                        : 'bg-stone-950 border-stone-800 text-stone-300'
                    }`}>
                      {mission.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {mission.badge && (
                          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-stone-950 text-amber-400 border border-stone-800">
                            {mission.badge}
                          </span>
                        )}
                        {mission.domainAffinity && (
                          <span className="text-[9px] font-cinzel text-stone-400">
                            Affinity: {mission.domainAffinity}
                          </span>
                        )}
                      </div>
                      <h3 className="font-cinzel font-bold text-base text-stone-100 mt-0.5">
                        {mission.title}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isClaimed ? (
                      <span className="px-2.5 py-1 rounded-xl bg-stone-900 text-stone-400 border border-stone-800 text-[10px] font-mono flex items-center gap-1">
                        <Check size={12} className="text-emerald-400" />
                        <span>CLAIMED</span>
                      </span>
                    ) : isDone ? (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1 animate-pulse">
                        <Sparkles size={12} />
                        <span>READY TO CLAIM</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-stone-950 text-stone-400 border border-stone-800 text-[10px] font-mono">
                        IN PROGRESS
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-300 mt-2.5 leading-relaxed font-sans">
                  {mission.description}
                </p>
              </div>

              {/* Progress Bar & Rewards */}
              <div className="space-y-3 pt-2 border-t border-stone-800/80">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400">Progress</span>
                    <span className="font-bold text-amber-300">
                      {mission.currentCount} / {mission.targetCount} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDone ? 'bg-amber-400' : 'bg-gradient-to-r from-amber-600 to-amber-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Bottom Action & Reward Row */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  {/* Reward chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    {mission.rewards.shards > 0 && (
                      <span className="px-2 py-0.5 rounded-lg bg-stone-950 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1">
                        💎 +{mission.rewards.shards}
                      </span>
                    )}
                    {mission.rewards.dust > 0 && (
                      <span className="px-2 py-0.5 rounded-lg bg-stone-950 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-bold flex items-center gap-1">
                        ✨ +{mission.rewards.dust}
                      </span>
                    )}
                    {mission.rewards.packType && (
                      <span className="px-2 py-0.5 rounded-lg bg-stone-950 border border-blue-500/30 text-blue-300 text-[10px] font-mono flex items-center gap-1">
                        📦 Free Pack
                      </span>
                    )}
                  </div>

                  {/* Claim or Launch Action Button */}
                  <div>
                    {isClaimed ? (
                      <button
                        type="button"
                        disabled
                        className="px-3.5 py-1.5 rounded-xl bg-stone-950 text-stone-500 border border-stone-800 text-xs font-cinzel cursor-not-allowed"
                      >
                        Completed
                      </button>
                    ) : isDone ? (
                      <button
                        type="button"
                        onClick={() => handleClaim(mission)}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(234,179,8,0.4)] flex items-center gap-1.5 transition hover:scale-105 cursor-pointer"
                      >
                        <Gift size={14} />
                        <span>Claim Reward</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={getActionCallback(mission.category)}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-amber-200 border border-stone-800 hover:border-amber-500/40 text-xs font-cinzel font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>{getActionLabel(mission.category)}</span>
                        <ChevronRight size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
