import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Domain } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { CardItem } from './CardItem';
import { ParticleCanvasOverlay } from './ParticleCanvasOverlay';
import { economyManager, PlayerEconomy } from '../utils/economyManager';
import { soundEngine } from '../utils/audioEngine';
import { missionsManager } from '../utils/missionsManager';
import { 
  Sparkles, 
  RotateCcw, 
  Coins, 
  Trophy, 
  Lock, 
  Unlock, 
  Swords, 
  HelpCircle, 
  Gift, 
  Flame, 
  Shield, 
  Layers, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PackOpenerProps {
  onInspectCard: (card: Card) => void;
  onNavigateToArena?: () => void;
}

interface PackType {
  id: string;
  name: string;
  subtitle: string;
  domain: Domain | 'All Realms';
  shardCost: number;
  dustCost: number;
  cardsCount: number;
  guaranteeText: string;
  color: string;
  accent: string;
  icon: string;
  tierBadge: string;
}

const PACKS: PackType[] = [
  {
    id: 'pack-novice',
    name: 'Novice Realm Booster',
    subtitle: 'Great starting pack with cards from all five domains',
    domain: 'All Realms',
    shardCost: 150,
    dustCost: 0,
    cardsCount: 5,
    guaranteeText: 'Guaranteed 1+ Rare or better',
    color: '#3b82f6',
    accent: '#8b5cf6',
    icon: '✨',
    tierBadge: 'CORE SET'
  },
  {
    id: 'pack-volcano',
    name: 'Fire Mountain & Magma Wrath',
    subtitle: 'High drop-rate for Radiance artifacts, warriors & volcanic spells',
    domain: 'Radiance',
    shardCost: 300,
    dustCost: 0,
    cardsCount: 5,
    guaranteeText: 'Guaranteed 1+ Very Rare Radiance Card',
    color: '#ef4444',
    accent: '#f97316',
    icon: '🌋',
    tierBadge: 'DOMAIN FOCUS'
  },
  {
    id: 'pack-sanctuary',
    name: 'Aegis of the Celestials',
    subtitle: 'Sanctuary relics, divine ophanim & sacred guardians',
    domain: 'Sanctuary',
    shardCost: 300,
    dustCost: 0,
    cardsCount: 5,
    guaranteeText: 'Guaranteed 1+ Very Rare Sanctuary Card',
    color: '#eab308',
    accent: '#facc15',
    icon: '🛡️',
    tierBadge: 'DOMAIN FOCUS'
  },
  {
    id: 'pack-abyss',
    name: 'Baator Void & Cursed Relics',
    subtitle: 'Abyssal entities, cursed katanas and soul reapers',
    domain: 'Abyss',
    shardCost: 300,
    dustCost: 0,
    cardsCount: 5,
    guaranteeText: 'Guaranteed 1+ Very Rare Abyssal Card',
    color: '#a855f7',
    accent: '#6b21a8',
    icon: '💀',
    tierBadge: 'DOMAIN FOCUS'
  },
  {
    id: 'pack-celestial-vault',
    name: 'Prismatic Celestial Vault',
    subtitle: '7-Card deluxe pack with boosted Legendary & Mythic odds',
    domain: 'All Realms',
    shardCost: 600,
    dustCost: 20,
    cardsCount: 7,
    guaranteeText: 'Guaranteed 1+ Legendary / Mythic Card with Foil Sheen',
    color: '#ec4899',
    accent: '#f43f5e',
    icon: '💎',
    tierBadge: 'MYTHIC VAULT'
  },
  {
    id: 'pack-titan-cache',
    name: 'Titan Void Core Cache',
    subtitle: '10-Card ultimate cache with Divine Boundless chance',
    domain: 'All Realms',
    shardCost: 1000,
    dustCost: 50,
    cardsCount: 10,
    guaranteeText: 'Guaranteed 2+ Mythic Cards & Boundless Foil Drops',
    color: '#8b5cf6',
    accent: '#3b82f6',
    icon: '🌌',
    tierBadge: 'DIVINE BOUNDLESS'
  }
];

export const PackOpener: React.FC<PackOpenerProps> = ({ onInspectCard, onNavigateToArena }) => {
  const [economy, setEconomy] = useState<PlayerEconomy>(economyManager.getEconomy());
  const [selectedPack, setSelectedPack] = useState<PackType>(PACKS[0]);
  const [isOpening, setIsOpening] = useState(false);
  const [isRipped, setIsRipped] = useState(false);
  const [pulledCards, setPulledCards] = useState<Card[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = economyManager.subscribe((eco) => setEconomy(eco));
    return unsub;
  }, []);

  const canAfford = economy.astralShards >= selectedPack.shardCost && economy.cosmicDust >= selectedPack.dustCost;

  const handleOpenPack = () => {
    if (!canAfford) {
      soundEngine.playMicroSound('error');
      setErrorMessage(`Insufficient funds! This pack requires ✦ ${selectedPack.shardCost} Astral Shards and ⬡ ${selectedPack.dustCost} Cosmic Dust.`);
      return;
    }

    setErrorMessage(null);
    const success = economyManager.spendCurrency(selectedPack.shardCost, selectedPack.dustCost);
    if (!success) return;

    soundEngine.playMicroSound('equip');
    setIsOpening(true);
    setIsRipped(false);
    setRevealedIndices([]);

    setTimeout(() => {
      setIsRipped(true);
      let eligible = CARDS_DATABASE;
      if (selectedPack.domain && selectedPack.domain !== 'All Realms') {
        const domainCards = CARDS_DATABASE.filter(c => c.domain === selectedPack.domain);
        const otherCards = CARDS_DATABASE.filter(c => c.domain !== selectedPack.domain);
        eligible = [...domainCards, ...domainCards, ...domainCards, ...otherCards];
      }

      // Shuffle & pick based on cardsCount
      const shuffled = [...eligible].sort(() => Math.random() - 0.5);
      const chosen = shuffled.slice(0, selectedPack.cardsCount);
      setPulledCards(chosen);

      // Check for ultra rare pulls to trigger fanfare
      const hasUltra = chosen.some(c => c.rarity === 'Legendary' || c.rarity === 'Mythic' || c.rarity === 'Divine Boundless');
      if (hasUltra) {
        soundEngine.playCombatClash('victory');
        setTimeout(() => {
          confetti({ particleCount: 160, spread: 80, origin: { y: 0.55 } });
        }, 300);
      } else {
        soundEngine.playMicroSound('unlock');
      }

      // Track Daily Missions Progress
      missionsManager.incrementProgress('collection', 1);
      missionsManager.incrementProgress('forge', chosen.length);
      missionsManager.incrementProgress('mission-pack-master', 1);
    }, 1200);
  };

  const handleRevealCard = (idx: number) => {
    if (!revealedIndices.includes(idx)) {
      soundEngine.playMicroSound('click');
      setRevealedIndices(prev => [...prev, idx]);
    }
  };

  const handleRevealAll = () => {
    soundEngine.playMicroSound('unlock');
    // Cascade reveal with quick stagger for tactile sound and visual delight
    pulledCards.forEach((_, i) => {
      setTimeout(() => {
        setRevealedIndices(prev => prev.includes(i) ? prev : [...prev, i]);
        soundEngine.playMicroSound('click');
      }, i * 110);
    });
  };

  const handleReset = () => {
    setIsOpening(false);
    setIsRipped(false);
    setPulledCards([]);
    setRevealedIndices([]);
  };

  const handleClaimStarterGrant = () => {
    economyManager.grantBonusShards(250, 'Celestial Starter Grant');
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Top Economy & Vault Banner */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 foil-sheen opacity-20 pointer-events-none" />
        
        <div className="text-center md:text-left space-y-1 z-10">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
              Celestial Pack Vault & Economy
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-500/40 font-bold">
              {economy.unlockedPacksTotal} Packs Opened
            </span>
          </div>
          <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100">
            Booster Pack Chamber
          </h2>
          <p className="text-stone-300 text-xs max-w-lg">
            Spend earned <strong className="text-amber-300">Astral Shards</strong> and <strong className="text-purple-300">Cosmic Dust</strong> to unseal authentic booster packs, discover mythic artifacts, and expand your grimoire.
          </p>
        </div>

        {/* Real-time Player Currency Balance Pod */}
        <div className="flex items-center gap-3 z-10">
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/60 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 border border-amber-400/40">
              <Coins size={20} />
            </div>
            <div>
              <div className="font-cinzel text-[10px] text-amber-300/80 font-bold uppercase">Astral Shards</div>
              <div className="font-mono font-black text-xl text-amber-300">✦ {economy.astralShards}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/60 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 border border-purple-400/40">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="font-cinzel text-[10px] text-purple-300/80 font-bold uppercase">Cosmic Dust</div>
              <div className="font-mono font-black text-xl text-purple-300">⬡ {economy.cosmicDust}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Insufficient Funds Warning Notification */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-950/70 border border-red-500/60 text-red-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClaimStarterGrant}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs uppercase tracking-wider transition"
            >
              Claim +250 Starter Shards
            </button>
            {onNavigateToArena && (
              <button
                onClick={onNavigateToArena}
                className="px-3 py-1.5 rounded-xl bg-red-800 hover:bg-red-700 text-stone-100 font-cinzel font-bold text-xs uppercase tracking-wider transition flex items-center gap-1"
              >
                <Swords size={13} />
                <span>Battle in Arena</span>
              </button>
            )}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isOpening ? (
          /* Pack Selection Grid */
          <motion.div 
            key="pack-selection"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PACKS.map((pack) => {
                const isSelected = selectedPack.id === pack.id;
                const affordable = economy.astralShards >= pack.shardCost && economy.cosmicDust >= pack.dustCost;

                return (
                  <motion.div
                    key={pack.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                    onMouseEnter={() => soundEngine.playMicroSound('hover')}
                    onClick={() => {
                      soundEngine.playMicroSound('click');
                      setSelectedPack(pack);
                      setErrorMessage(null);
                    }}
                    className={`relative p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-80 group ${
                      isSelected
                        ? 'border-amber-400 bg-stone-900 shadow-2xl scale-[1.02] ring-2 ring-amber-500/50'
                        : 'border-stone-800 bg-stone-950/80 hover:border-stone-600 hover:bg-stone-900/60'
                    }`}
                    style={{
                      boxShadow: isSelected ? `0 0 35px ${pack.color}44` : undefined
                    }}
                  >
                    {/* Outer Holographic Foil Shimmer */}
                    <div className="absolute inset-0 rounded-3xl foil-sheen opacity-25 pointer-events-none" />

                    <div>
                      <div className="flex justify-between items-start">
                        <span 
                          className="text-[10px] font-cinzel font-black px-2.5 py-1 rounded-full uppercase tracking-wider"
                          style={{ backgroundColor: `${pack.color}33`, color: pack.color, border: `1px solid ${pack.color}66` }}
                        >
                          {pack.tierBadge}
                        </span>
                        <span className="text-3xl">{pack.icon}</span>
                      </div>

                      <h3 className="font-cinzel font-black text-lg text-amber-100 mt-3 leading-tight">
                        {pack.name}
                      </h3>
                      <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                        {pack.subtitle}
                      </p>
                    </div>

                    {/* Visual Pack Foil Art & Guaranteed Text */}
                    <div className="py-2.5 space-y-2">
                      <div 
                        className="w-full py-2 px-3 rounded-xl border flex items-center justify-between text-xs font-cinzel font-bold shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${pack.color}33, ${pack.accent}44)`,
                          borderColor: `${pack.color}66`
                        }}
                      >
                        <span className="text-stone-200">Contains {pack.cardsCount} Cards</span>
                        <span className="text-amber-300 text-[11px]">✦ Foil Chance</span>
                      </div>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                        <span>{pack.guaranteeText}</span>
                      </div>
                    </div>

                    {/* Price Tag & Unseal Trigger */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-sm">
                        <span className="font-bold text-amber-300">✦ {pack.shardCost}</span>
                        {pack.dustCost > 0 && (
                          <span className="font-bold text-purple-300">+ ⬡ {pack.dustCost}</span>
                        )}
                      </div>

                      <div className={`px-3 py-1 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1 ${
                        affordable 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-stone-800 text-stone-300'
                      }`}>
                        {affordable ? <Unlock size={12} /> : <Lock size={12} />}
                        <span>{affordable ? 'Available' : 'Locked'}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Center */}
            <div className="text-center pt-2 space-y-3">
              <motion.button
                onClick={handleOpenPack}
                id="open-booster-btn"
                disabled={!canAfford}
                whileHover={canAfford ? { scale: 1.05 } : {}}
                whileTap={canAfford ? { scale: 0.95 } : {}}
                className={`px-12 py-4 rounded-2xl font-cinzel font-black text-base uppercase tracking-widest shadow-2xl transition duration-300 ${
                  canAfford
                    ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black cursor-pointer ring-2 ring-amber-400/50'
                    : 'bg-stone-800 text-stone-300 cursor-not-allowed opacity-60 border border-stone-700'
                }`}
              >
                ✨ Tear Open {selectedPack.name} (✦ {selectedPack.shardCost}{selectedPack.dustCost > 0 ? ` + ⬡ ${selectedPack.dustCost}` : ''})
              </motion.button>
              {!canAfford && (
                <p className="text-xs text-amber-400/80 font-cinzel">
                  Win matches in the Arena Clash to earn Astral Shards and Cosmic Dust!
                </p>
              )}
            </div>
          </motion.div>
        ) : !isRipped ? (
          /* Pack Tearing Dramatic Holographic Stage */
          <motion.div
            key="pack-tearing"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}
            className="p-12 rounded-3xl bg-stone-950/90 border border-amber-500/60 shadow-2xl flex flex-col items-center justify-center space-y-8 min-h-[420px] relative overflow-hidden"
          >
            {/* Background radiant aura */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />

            {/* Shaking & Bursting Booster Pack Visual */}
            <motion.div
              animate={{ 
                x: [-3, 3, -4, 4, -2, 2, 0],
                rotateZ: [-2, 2, -1, 1, 0],
                scale: [1, 1.04, 0.98, 1.06, 1.02]
              }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              className="w-64 h-96 rounded-3xl border-4 shadow-2xl p-6 flex flex-col justify-between items-center relative overflow-hidden cursor-wait"
              style={{
                background: `linear-gradient(145deg, ${selectedPack.color}44, #0c0a09 70%, ${selectedPack.accent}66)`,
                borderColor: selectedPack.color,
                boxShadow: `0 0 50px ${selectedPack.color}88`
              }}
            >
              <div className="absolute inset-0 foil-sheen opacity-40 pointer-events-none" />
              
              {/* Tear Seam Energy Beam */}
              <motion.div 
                animate={{ y: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="absolute inset-x-0 h-4 bg-gradient-to-r from-transparent via-amber-300 to-transparent blur-sm opacity-80 pointer-events-none"
              />

              <div className="text-center space-y-2 z-10">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-black px-2.5 py-1 rounded-full bg-black/60 border border-amber-400/40">
                  {selectedPack.tierBadge}
                </span>
                <h3 className="font-cinzel font-black text-xl text-amber-100 mt-2">
                  {selectedPack.name}
                </h3>
              </div>

              <div className="text-6xl animate-bounce">
                {selectedPack.icon}
              </div>

              <div className="text-center z-10 space-y-1">
                <span className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-widest block">
                  ✦ Unsealing Seals...
                </span>
                <span className="text-[10px] text-stone-300 font-mono">
                  Synthesizing {selectedPack.cardsCount} Grimoire Cards
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Pack Opening / Reveal Screen */
          <motion.div 
            key="pack-reveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="p-6 rounded-3xl bg-stone-900/95 border border-amber-500/50 shadow-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Loot Vault Unboxed • {selectedPack.name}
                </span>
                <h3 className="font-cinzel font-bold text-xl text-stone-100">
                  {revealedIndices.length === pulledCards.length ? 'All Cards Unveiled & Added to Grimoire!' : 'Click facedown cards to reveal your pulls!'}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {revealedIndices.length < pulledCards.length && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRevealAll}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
                  >
                    Reveal All ({pulledCards.length - revealedIndices.length} Remaining)
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-cinzel font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 border border-stone-700"
                >
                  <RotateCcw size={14} />
                  <span>Open Another Pack</span>
                </motion.button>
              </div>
            </div>

            {/* Cards Grid with Tactile Staggered Entrance and 3D Card Flip Transitions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {pulledCards.map((card, idx) => {
                const isRevealed = revealedIndices.includes(idx);

                return (
                  <motion.div 
                    key={`${card.id}-${idx}`}
                    initial={{ opacity: 0, y: 70, scale: 0.7, rotateZ: (idx - pulledCards.length / 2) * 4 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateZ: 0 }}
                    transition={{ 
                      type: 'spring', 
                      damping: 16, 
                      stiffness: 220, 
                      delay: idx * 0.08 
                    }}
                    className="flex justify-center"
                  >
                    <AnimatePresence mode="wait">
                      {!isRevealed ? (
                        /* Facedown Runic Card Back */
                        <motion.div
                          key="facedown"
                          initial={{ rotateY: 0, scale: 1 }}
                          exit={{ 
                            rotateY: 90, 
                            scale: 0.9, 
                            opacity: 0, 
                            transition: { duration: 0.18, ease: "easeIn" } 
                          }}
                          whileHover={{ 
                            y: -10, 
                            scale: 1.05, 
                            boxShadow: "0 0 35px rgba(234,179,8,0.5)",
                            transition: { type: 'spring', damping: 12, stiffness: 350 } 
                          }}
                          whileTap={{ scale: 0.95 }}
                          onMouseEnter={() => soundEngine.playMicroSound('hover')}
                          onClick={() => {
                            soundEngine.playMicroSound('cardFlip');
                            handleRevealCard(idx);
                          }}
                          className="w-56 h-80 rounded-2xl bg-gradient-to-b from-stone-900 via-neutral-950 to-stone-900 border-2 border-amber-500/70 shadow-xl cursor-pointer flex flex-col items-center justify-center p-4 relative overflow-hidden group select-none"
                        >
                          <div className="absolute inset-2 rounded-xl border border-amber-500/30 group-hover:border-amber-400/60 transition-colors" />
                          <div className="w-20 h-20 rounded-full border-2 border-amber-500/60 flex items-center justify-center text-3xl shadow-inner bg-amber-950/40 group-hover:scale-110 transition-transform">
                            🔮
                          </div>
                          <span className="font-cinzel font-bold text-xs text-amber-300 mt-4 tracking-widest uppercase text-center group-hover:text-amber-200 transition-colors">
                            Click to Reveal
                          </span>
                          <span className="text-[10px] font-mono text-stone-300 mt-1">Card #{idx + 1}</span>

                          {/* Subtle pulsating corner glyphs */}
                          <div className="absolute top-3 left-3 text-[10px] text-amber-500/40 font-mono">✦</div>
                          <div className="absolute top-3 right-3 text-[10px] text-amber-500/40 font-mono">✦</div>
                          <div className="absolute bottom-3 left-3 text-[10px] text-amber-500/40 font-mono">✦</div>
                          <div className="absolute bottom-3 right-3 text-[10px] text-amber-500/40 font-mono">✦</div>
                        </motion.div>
                      ) : (
                        /* Revealed Card with Tactile 3D Entrance & Ambient Aura */
                        <motion.div
                          key="revealed"
                          initial={{ rotateY: -90, scale: 1.15, opacity: 0 }}
                          animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                          transition={{ 
                            type: "spring", 
                            damping: 14, 
                            stiffness: 220,
                            mass: 0.9 
                          }}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.03,
                            transition: { type: 'spring', damping: 14, stiffness: 350 }
                          }}
                          onMouseEnter={() => soundEngine.playMicroSound('hover')}
                          className="relative flex justify-center cursor-pointer"
                        >
                          {/* Ambient Domain Glow Backdrop */}
                          <div className={`absolute -inset-2 rounded-2xl blur-lg pointer-events-none opacity-30 ${
                            card.rarity === 'Legendary' || card.rarity === 'Mythic' || card.rarity === 'Divine Boundless'
                              ? 'bg-amber-400 animate-pulse'
                              : card.domain === 'Radiance' ? 'bg-red-500' :
                                card.domain === 'Sanctuary' ? 'bg-amber-300' :
                                card.domain === 'Verdance' ? 'bg-emerald-400' :
                                card.domain === 'Arcane' ? 'bg-blue-400' : 'bg-purple-500'
                          }`} />

                          <CardItem
                            card={card}
                            size="hand"
                            foilType="prismatic"
                            onInspect={() => {
                              soundEngine.playMicroSound('select');
                              onInspectCard(card);
                            }}
                          />

                          {/* Particle effects for revealed rare cards */}
                          {card.rarity !== 'Common' && (
                            <ParticleCanvasOverlay
                              rarity={card.rarity}
                              domain={card.domain}
                              intensity={
                                card.rarity === 'Divine Boundless'
                                  ? 'ultra'
                                  : card.rarity === 'Mythic' || card.rarity === 'Legendary'
                                  ? 'high'
                                  : 'medium'
                              }
                              triggerBurst={true}
                            />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
