import React, { useState, useEffect } from 'react';
import { economyManager, PlayerEconomy } from '../utils/economyManager';
import { soundEngine, DomainAudioTheme } from '../utils/audioEngine';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Gift, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Award,
  ChevronDown,
  X,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderEconomyHUDProps {
  onOpenVault?: () => void;
  onOpenTutorial?: () => void;
  onOpenMissions?: () => void;
}

export const HeaderEconomyHUD: React.FC<HeaderEconomyHUDProps> = ({
  onOpenVault,
  onOpenTutorial,
  onOpenMissions
}) => {
  const [economy, setEconomy] = useState<PlayerEconomy>(economyManager.getEconomy());
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [volume, setVolume] = useState<number>(soundEngine.getVolume());
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState(false);
  const [isDailyClaimOpen, setIsDailyClaimOpen] = useState(false);
  const [dailyClaimedToday, setDailyClaimedToday] = useState(false);
  const [dailyRewardResult, setDailyRewardResult] = useState<{ shards: number; dust: number } | null>(null);

  useEffect(() => {
    const unsub = economyManager.subscribe((eco) => {
      setEconomy(eco);
      const todayStr = new Date().toISOString().split('T')[0];
      setDailyClaimedToday(eco.lastDailyRewardDate === todayStr);
    });
    return unsub;
  }, []);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
    if (!nextMute) {
      soundEngine.playMicroSound('click');
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundEngine.setVolume(newVol);
  };

  const handleClaimDailyTribute = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const shardsGained = 200;
    const dustGained = 15;

    const updated: PlayerEconomy = {
      ...economy,
      astralShards: economy.astralShards + shardsGained,
      cosmicDust: economy.cosmicDust + dustGained,
      lastDailyRewardDate: todayStr
    };

    economyManager.saveEconomy(updated);
    setDailyRewardResult({ shards: shardsGained, dust: dustGained });
    setDailyClaimedToday(true);
    soundEngine.playCombatClash('victory');
    confetti({ particleCount: 140, spread: 70, origin: { y: 0.3 } });
  };

  const progressPercent = Math.min(100, Math.round((economy.masteryXp / economy.masteryXpRequired) * 100));

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      
      {/* ================= ASTRAL SHARDS ================= */}
      <div 
        onClick={onOpenVault}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 font-cinzel text-xs font-bold cursor-pointer hover:bg-amber-900/40 hover:border-amber-400 transition-all shadow-sm group"
        title="Astral Shards: Primary currency for purchasing booster packs in the Vault."
      >
        <span className="text-amber-400 group-hover:scale-110 transition-transform">✦</span>
        <span className="font-mono text-[13px] text-amber-200 tracking-tight">
          {economy.astralShards.toLocaleString()}
        </span>
        <span className="text-[10px] text-amber-400/70 hidden sm:inline">Shards</span>
      </div>

      {/* ================= COSMIC DUST ================= */}
      <div 
        onClick={onOpenVault}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 font-cinzel text-xs font-bold cursor-pointer hover:bg-purple-900/40 hover:border-purple-400 transition-all shadow-sm group"
        title="Cosmic Dust: Rare crafting reagent used for premium foil booster packs and legendary forges."
      >
        <span className="text-purple-400 group-hover:scale-110 transition-transform">⬡</span>
        <span className="font-mono text-[13px] text-purple-200 tracking-tight">
          {economy.cosmicDust.toLocaleString()}
        </span>
        <span className="text-[10px] text-purple-400/70 hidden sm:inline">Dust</span>
      </div>

      {/* ================= LEVEL & XP PROGRESSION ================= */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-stone-700/60 text-xs font-cinzel">
        <div className="flex items-center gap-1 text-amber-400 font-black">
          <Trophy size={13} className="text-amber-400" />
          <span>LV.{economy.masteryLevel}</span>
        </div>
        <div className="w-16 h-2 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-stone-400">
          {economy.masteryXp}/{economy.masteryXpRequired}
        </span>
      </div>

      {/* ================= WIN STREAK BADGE ================= */}
      {economy.winStreak > 0 && (
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 font-cinzel text-xs font-bold animate-pulse">
          <Flame size={13} className="text-rose-400" />
          <span>{economy.winStreak} Streak</span>
        </div>
      )}

      {/* ================= DAILY TRIBUTE CHEST BUTTON ================= */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playMicroSound('select');
          setIsDailyClaimOpen(true);
        }}
        className={`px-2.5 py-1.5 rounded-xl font-cinzel text-xs font-bold flex items-center gap-1.5 transition-all ${
          !dailyClaimedToday
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_12px_rgba(234,179,8,0.5)] animate-bounce'
            : 'bg-stone-900/80 text-stone-400 border border-stone-800 hover:text-stone-200'
        }`}
        title={!dailyClaimedToday ? 'Daily Tribute Ready to Claim!' : 'Daily Tribute already claimed today.'}
      >
        <Gift size={14} className={!dailyClaimedToday ? 'text-black' : 'text-amber-400'} />
        <span className="hidden sm:inline">{!dailyClaimedToday ? 'Daily Gift' : 'Tribute'}</span>
      </button>

      {/* ================= DAILY MISSIONS / QUESTS SHORTCUT ================= */}
      {onOpenMissions && (
        <button
          type="button"
          onClick={() => {
            soundEngine.playMicroSound('select');
            onOpenMissions();
          }}
          className="px-2.5 py-1.5 rounded-xl font-cinzel text-xs font-bold flex items-center gap-1.5 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 transition-all shadow-sm"
          title="Open Daily Missions & Streak Calendar"
        >
          <Award size={14} className="text-purple-400" />
          <span className="hidden sm:inline">Quests</span>
        </button>
      )}

      {/* ================= SOUND ENGINE CONTROLS ================= */}
      <div className="relative">
        <button
          type="button"
          onClick={toggleMute}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsAudioMenuOpen(prev => !prev);
          }}
          className={`p-2 rounded-xl border transition-all ${
            isMuted
              ? 'bg-stone-900/60 border-stone-800 text-stone-500 hover:text-stone-300'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-300 hover:bg-amber-900/40'
          }`}
          title={isMuted ? 'Sound Muted (Click to un-mute)' : 'Sound Enabled (Click to mute)'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {/* ================= DAILY TRIBUTE CLAIM MODAL ================= */}
      {isDailyClaimOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-stone-950 border-2 border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-4 text-center relative animate-fade-in">
            <button
              type="button"
              onClick={() => setIsDailyClaimOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-100"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl bg-amber-950/80 border border-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              🎁
            </div>

            <div>
              <h3 className="font-cinzel font-black text-lg text-amber-200">
                Nexus Solar Tribute
              </h3>
              <p className="text-xs text-stone-400 mt-1 font-sans">
                Claim your daily supply of Astral Shards and Cosmic Dust to unlock booster packs and forge artifacts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex justify-around items-center">
              <div className="text-center">
                <span className="text-amber-400 text-lg font-bold block">✦ +200</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-cinzel">Astral Shards</span>
              </div>
              <div className="w-px h-8 bg-stone-800" />
              <div className="text-center">
                <span className="text-purple-400 text-lg font-bold block">⬡ +15</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-cinzel">Cosmic Dust</span>
              </div>
            </div>

            {dailyRewardResult && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-cinzel flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>Claimed +{dailyRewardResult.shards} Shards & +{dailyRewardResult.dust} Dust!</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleClaimDailyTribute}
                disabled={dailyClaimedToday && !dailyRewardResult}
                className={`w-full py-3 rounded-2xl font-cinzel font-bold text-xs uppercase tracking-wider transition-all ${
                  !dailyClaimedToday
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:brightness-110 shadow-lg'
                    : 'bg-stone-900 text-stone-500 border border-stone-800 cursor-not-allowed'
                }`}
              >
                {!dailyClaimedToday ? 'Claim Daily Tribute' : 'Already Claimed Today'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
