import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { soundEngine, DomainAudioTheme } from '../utils/audioEngine';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Sparkles, 
  Flame, 
  Shield, 
  Zap, 
  Skull, 
  Compass, 
  Dices, 
  Layers, 
  Activity, 
  Radio, 
  Sliders, 
  CheckCircle2, 
  HelpCircle,
  Award,
  Crown,
  Sword,
  RefreshCw,
  Cpu
} from 'lucide-react';

interface SoundItem {
  id: string;
  name: string;
  description: string;
  category: 'ui' | 'combat' | 'entrance' | 'ambient';
  domain?: DomainAudioTheme;
  action: () => void;
  icon: string;
  color: string;
}

export const AudioSanctumView: React.FC = () => {
  const [volume, setVolume] = useState<number>(soundEngine.getVolume());
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [activeAmbiance, setActiveAmbiance] = useState<DomainAudioTheme | null>(null);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'ui' | 'combat' | 'entrance' | 'ambient'>('all');
  const [showArchitectureGuide, setShowArchitectureGuide] = useState<boolean>(false);
  const [isPlayingShowcase, setIsPlayingShowcase] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Synchronize audio state
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundEngine.setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      soundEngine.setMuted(false);
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
    if (nextMute) {
      setActiveAmbiance(null);
    }
  };

  const triggerSound = (id: string, playFn: () => void) => {
    setActivePlayingId(id);
    playFn();
    setTimeout(() => {
      setActivePlayingId((current) => (current === id ? null : current));
    }, 450);
  };

  const handleStartAmbiance = (domain: DomainAudioTheme) => {
    setActiveAmbiance(domain);
    soundEngine.playDomainSoundscape(domain);
  };

  const handleStopAmbiance = () => {
    setActiveAmbiance(null);
    soundEngine.stopDrone();
    soundEngine.playMicroSound('click');
  };

  // Run Cinematic Sound Sequence
  const handlePlayShowcase = (type: 'pack' | 'titan' | 'five-domains') => {
    if (isPlayingShowcase) return;
    setIsPlayingShowcase(true);

    if (type === 'pack') {
      soundEngine.playMicroSound('equip');
      setTimeout(() => soundEngine.playMicroSound('cardFlip'), 300);
      setTimeout(() => soundEngine.playMicroSound('shimmer'), 600);
      setTimeout(() => soundEngine.playMicroSound('click'), 900);
      setTimeout(() => {
        soundEngine.playCombatClash('victory');
        setIsPlayingShowcase(false);
      }, 1300);
    } else if (type === 'titan') {
      soundEngine.playPlayerEntrance('Abyss', true);
      setTimeout(() => soundEngine.playTitanRoar(), 700);
      setTimeout(() => soundEngine.playCombatClash('slay'), 1400);
      setTimeout(() => {
        soundEngine.playCombatClash('attack');
        setIsPlayingShowcase(false);
      }, 2000);
    } else {
      soundEngine.playPlayerEntrance('Sanctuary');
      setTimeout(() => soundEngine.playPlayerEntrance('Radiance'), 500);
      setTimeout(() => soundEngine.playPlayerEntrance('Verdance'), 1000);
      setTimeout(() => soundEngine.playPlayerEntrance('Arcane'), 1500);
      setTimeout(() => {
        soundEngine.playPlayerEntrance('Abyss');
        setIsPlayingShowcase(false);
      }, 2000);
    }
  };

  // Canvas Waveform & Frequency Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dummyPhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const analyser = soundEngine.getAnalyser();

      if (analyser && !isMuted) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barWidth = (canvas.width / bufferLength) * 1.6;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.85 + (activeAmbiance ? 6 : 2);
          
          // Gradient based on frequency
          const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
          gradient.addColorStop(0, '#f59e0b');
          gradient.addColorStop(0.5, '#ec4899');
          gradient.addColorStop(1, '#8b5cf6');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

          x += barWidth;
        }
      } else {
        // Subtle ambient idle sine wave animation
        dummyPhase += 0.05;
        ctx.beginPath();
        ctx.strokeStyle = activeAmbiance ? '#f59e0b' : '#525252';
        ctx.lineWidth = 2;
        for (let x = 0; x < canvas.width; x++) {
          const amp = activeAmbiance ? 12 : 3;
          const y = canvas.height / 2 + Math.sin(x * 0.05 + dummyPhase) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMuted, activeAmbiance]);

  const soundList: SoundItem[] = [
    // UI Micro-Haptics
    {
      id: 'ui-hover',
      name: 'Hover Chime',
      description: 'Ultra-fast 50ms sine wave pitch ramp (420Hz → 620Hz)',
      category: 'ui',
      action: () => soundEngine.playMicroSound('hover'),
      icon: '✨',
      color: 'border-amber-500/40 text-amber-300'
    },
    {
      id: 'ui-click',
      name: 'Tactile Click',
      description: 'Triangle wave snap with logarithmic decay for crisp feedback',
      category: 'ui',
      action: () => soundEngine.playMicroSound('click'),
      icon: '🔘',
      color: 'border-yellow-500/40 text-yellow-300'
    },
    {
      id: 'ui-select',
      name: 'Select Pulse',
      description: 'Tri-tone arpeggio trigger for menu selections and card locks',
      category: 'ui',
      action: () => soundEngine.playMicroSound('select'),
      icon: '🎯',
      color: 'border-blue-500/40 text-blue-300'
    },
    {
      id: 'ui-card-flip',
      name: 'Card Foil Flip',
      description: 'Dual-phase smooth paper/foil swoosh for pack opening reveals',
      category: 'ui',
      action: () => soundEngine.playMicroSound('cardFlip'),
      icon: '🎴',
      color: 'border-purple-500/40 text-purple-300'
    },
    {
      id: 'ui-shimmer',
      name: 'Prismatic Shimmer',
      description: 'High-register crystalline harmonic sparkle glissando',
      category: 'ui',
      action: () => soundEngine.playMicroSound('shimmer'),
      icon: '💎',
      color: 'border-pink-500/40 text-pink-300'
    },
    {
      id: 'ui-dice',
      name: 'Momentum Dice Roll',
      description: 'Realistic multi-stage clatter impulse sequence with landing chime',
      category: 'ui',
      action: () => soundEngine.playDiceRoll(),
      icon: '🎲',
      color: 'border-amber-500/40 text-amber-300'
    },
    {
      id: 'ui-equip',
      name: 'Armory Equip',
      description: 'Resonant sine sweep for equipping weapons and relics (220Hz → 880Hz)',
      category: 'ui',
      action: () => soundEngine.playMicroSound('equip'),
      icon: '⚔️',
      color: 'border-emerald-500/40 text-emerald-300'
    },
    {
      id: 'ui-unlock',
      name: 'Vault Unlock',
      description: 'Ascending 4-tone major chord fanfare (C5-E5-G5-C6)',
      category: 'ui',
      action: () => soundEngine.playMicroSound('unlock'),
      icon: '🔓',
      color: 'border-cyan-500/40 text-cyan-300'
    },
    {
      id: 'ui-error',
      name: 'Error Buzzer',
      description: 'Dissonant sawtooth warning pulse for invalid moves or lack of essence',
      category: 'ui',
      action: () => soundEngine.playMicroSound('error'),
      icon: '⚠️',
      color: 'border-red-500/40 text-red-300'
    },

    // Combat Clashes & Impacts
    {
      id: 'combat-attack',
      name: 'Heavy Blade Strike',
      description: 'Sawtooth metallic impact combined with low-end physical punch',
      category: 'combat',
      action: () => soundEngine.playCombatClash('attack'),
      icon: '🗡️',
      color: 'border-red-500/50 text-red-400'
    },
    {
      id: 'combat-shield',
      name: 'Shield Deflect / Aegis',
      description: 'Resonant high-Q metallic chime simulating physical shield deflection',
      category: 'combat',
      action: () => soundEngine.playCombatClash('shield'),
      icon: '🛡️',
      color: 'border-blue-500/50 text-blue-400'
    },
    {
      id: 'combat-spell',
      name: 'Astral Spell Surge',
      description: 'Harmonic frequency sweep across the upper frequency spectrum (350Hz → 1050Hz)',
      category: 'combat',
      action: () => soundEngine.playCombatClash('spell'),
      icon: '✨',
      color: 'border-indigo-500/50 text-indigo-400'
    },
    {
      id: 'combat-slay',
      name: 'Void Slay & Destroy',
      description: 'Deep sub-bass shatter impact for fallen guardians and card exile',
      category: 'combat',
      action: () => soundEngine.playCombatClash('slay'),
      icon: '💀',
      color: 'border-purple-500/50 text-purple-400'
    },
    {
      id: 'combat-turn',
      name: 'Turn Start Fanfare',
      description: 'Crisp dual triangle chime signalling turn transition and essence refill',
      category: 'combat',
      action: () => soundEngine.playCombatClash('turnStart'),
      icon: '⏱️',
      color: 'border-amber-500/50 text-amber-300'
    },
    {
      id: 'combat-victory',
      name: 'Triumph Victory Fanfare',
      description: 'Grand harmonic progression celebrating battlefield conquest and rewards',
      category: 'combat',
      action: () => soundEngine.playCombatClash('victory'),
      icon: '🏆',
      color: 'border-yellow-400/60 text-yellow-300'
    },
    {
      id: 'combat-titan-roar',
      name: 'Titan Boss Enrage Roar',
      description: 'Sub-bass cataclysm tremor and crackle burst when boss enters enrage phase',
      category: 'combat',
      action: () => soundEngine.playTitanRoar(),
      icon: '⚡',
      color: 'border-rose-600/60 text-rose-400'
    },

    // Player Entrances & Warhorns
    {
      id: 'entrance-sanctuary',
      name: 'Sanctuary Celestial Herald',
      description: 'High Spire Ophanim golden choir chime & triumph chord for holy champions',
      category: 'entrance',
      domain: 'Sanctuary',
      action: () => soundEngine.playPlayerEntrance('Sanctuary'),
      icon: '✨',
      color: 'border-yellow-500/50 text-yellow-300'
    },
    {
      id: 'entrance-radiance',
      name: 'Radiance Volcanic Warlord',
      description: 'Blaring dual-oscillator brass warhorn echoing through Molten Caldera',
      category: 'entrance',
      domain: 'Radiance',
      action: () => soundEngine.playPlayerEntrance('Radiance'),
      icon: '🌋',
      color: 'border-orange-500/50 text-orange-400'
    },
    {
      id: 'entrance-verdance',
      name: 'Verdance Primeval Horn',
      description: 'Deep resonant World Tree acoustic horn invoking ancient spirits',
      category: 'entrance',
      domain: 'Verdance',
      action: () => soundEngine.playPlayerEntrance('Verdance'),
      icon: '🌿',
      color: 'border-emerald-500/50 text-emerald-400'
    },
    {
      id: 'entrance-arcane',
      name: 'Arcane Chronomancer Warp',
      description: 'Cosmic temporal harmonic sweep across dimensional boundary rifts',
      category: 'entrance',
      domain: 'Arcane',
      action: () => soundEngine.playPlayerEntrance('Arcane'),
      icon: '🌌',
      color: 'border-blue-500/50 text-blue-400'
    },
    {
      id: 'entrance-abyss',
      name: 'Abyssal Tolling Doom Bell',
      description: 'Ominous low-frequency dissonance announcing the Lord of Baator',
      category: 'entrance',
      domain: 'Abyss',
      action: () => soundEngine.playPlayerEntrance('Abyss'),
      icon: '💀',
      color: 'border-purple-600/60 text-purple-400'
    },

    // Planar Environmental Soundscapes
    {
      id: 'ambient-caldera',
      name: 'Molten Caldera Drone',
      description: 'Warm low-frequency harmonic drone with procedural volcanic ember crackle',
      category: 'ambient',
      domain: 'Radiance',
      action: () => handleStartAmbiance('Radiance'),
      icon: '🌋',
      color: 'border-red-500/50 text-red-400'
    },
    {
      id: 'ambient-sanctuary',
      name: 'Celestial Sanctuary Chimes',
      description: 'Pure radiant major triad harmony with high-pass cathedral shimmer',
      category: 'ambient',
      domain: 'Sanctuary',
      action: () => handleStartAmbiance('Sanctuary'),
      icon: '✨',
      color: 'border-amber-400/50 text-amber-300'
    },
    {
      id: 'ambient-eldervale',
      name: 'Eldervale Primeval Resonance',
      description: 'Subtle forest root pulse with gentle lowpass harmonic texture',
      category: 'ambient',
      domain: 'Verdance',
      action: () => handleStartAmbiance('Verdance'),
      icon: '🌿',
      color: 'border-emerald-500/50 text-emerald-400'
    },
    {
      id: 'ambient-nexus',
      name: 'Astral Nexus Rift Sweeps',
      description: 'Cosmic bandpass fifths with dynamic frequency drift',
      category: 'ambient',
      domain: 'Arcane',
      action: () => handleStartAmbiance('Arcane'),
      icon: '🌌',
      color: 'border-blue-500/50 text-blue-400'
    },
    {
      id: 'ambient-abyss',
      name: 'Abyssal Trench Void Drone',
      description: 'Eerie tritone (diabolus in musica) dissonance and void undertones',
      category: 'ambient',
      domain: 'Abyss',
      action: () => handleStartAmbiance('Abyss'),
      icon: '💀',
      color: 'border-purple-600/50 text-purple-400'
    },
    {
      id: 'ambient-neutral',
      name: 'Clockwork Mechanical Drone',
      description: 'Rhythmic bandpass hum representing precision mechanical constructs',
      category: 'ambient',
      domain: 'Neutral',
      action: () => handleStartAmbiance('Neutral'),
      icon: '⚙️',
      color: 'border-stone-500/50 text-stone-300'
    }
  ];

  const filteredSounds = soundList.filter(s => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in">
      
      {/* Header Banner & Live Visualizer */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950/40 border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 foil-sheen opacity-15 pointer-events-none" />

        <div className="space-y-2 z-10 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
              Procedural Web Audio Engine v3.0
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-500/40 font-bold">
              Zero External Assets • 100% Code Synthesized
            </span>
          </div>
          <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100 flex items-center justify-center lg:justify-start gap-3">
            <Radio size={28} className="text-amber-400 animate-pulse" />
            <span>Audio Sanctum & Soundboard (SFX)</span>
          </h2>
          <p className="text-stone-300 text-xs max-w-xl">
            Experience tactile micro-haptics, domain-specific warhorns, player entrance fanfares, and continuous procedural ambient soundscapes powered by Web Audio API oscillators.
          </p>
        </div>

        {/* Real-time Visualizer & Master Mixer */}
        <div className="w-full lg:w-96 bg-stone-950/80 border border-amber-500/40 p-4 rounded-2xl shadow-xl flex flex-col gap-3 z-10">
          
          {/* Oscilloscope Visualizer */}
          <div className="relative w-full h-16 bg-black/80 rounded-xl overflow-hidden border border-stone-800 flex items-center justify-center">
            <canvas 
              ref={canvasRef} 
              width={350} 
              height={64} 
              className="w-full h-full"
            />
            <div className="absolute top-1.5 left-2 text-[9px] font-mono text-amber-400/80 uppercase tracking-wider">
              {activeAmbiance ? `Active Drone: ${activeAmbiance}` : 'Live Waveform Equalizer'}
            </div>
          </div>

          {/* Master Controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={handleToggleMute}
                className={`p-2 rounded-xl border transition ${
                  isMuted 
                    ? 'bg-red-950/80 border-red-500 text-red-400' 
                    : 'bg-stone-900 border-amber-500/40 text-amber-300'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between text-[10px] font-mono text-stone-300 mb-0.5">
                  <span>Master Volume</span>
                  <span className="font-bold text-amber-300">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {activeAmbiance && (
              <button
                onClick={handleStopAmbiance}
                className="px-2.5 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/50 text-[10px] font-cinzel font-bold flex items-center gap-1 transition"
                title="Stop current ambient drone"
              >
                <Square size={10} className="fill-current" />
                <span>Stop Drone</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cinematic Showcase Sequence Bar */}
      <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" />
          <span className="font-cinzel font-bold text-amber-200">Cinematic Sound Showcases:</span>
          <span className="text-stone-400 text-[11px] hidden sm:inline">Test synchronized multi-sound cascades</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            disabled={isPlayingShowcase}
            onClick={() => handlePlayShowcase('pack')}
            className="px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 text-purple-200 font-cinzel font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Sparkles size={13} />
            <span>Mythic Pack Unboxing Cascade</span>
          </button>

          <button
            disabled={isPlayingShowcase}
            onClick={() => handlePlayShowcase('titan')}
            className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 font-cinzel font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Crown size={13} />
            <span>Titan Boss Awaken & Enrage</span>
          </button>

          <button
            disabled={isPlayingShowcase}
            onClick={() => handlePlayShowcase('five-domains')}
            className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-200 font-cinzel font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Activity size={13} />
            <span>5-Domain Harmonic Clash</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Architecture Guide Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 text-xs font-cinzel">
          {[
            { id: 'all' as const, label: 'All Sounds', count: soundList.length },
            { id: 'ui' as const, label: 'UI & Micro-Haptics', count: soundList.filter(s => s.category === 'ui').length },
            { id: 'combat' as const, label: 'Combat Clashes', count: soundList.filter(s => s.category === 'combat').length },
            { id: 'entrance' as const, label: 'Player Entrances', count: soundList.filter(s => s.category === 'entrance').length },
            { id: 'ambient' as const, label: 'Planar Soundscapes', count: soundList.filter(s => s.category === 'ambient').length }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEngine.playMicroSound('hover');
                setFilterCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                filterCategory === cat.id
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 rounded ${
                filterCategory === cat.id ? 'bg-black/20 text-black font-black' : 'bg-stone-800 text-stone-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowArchitectureGuide(!showArchitectureGuide)}
          className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-cinzel font-bold border border-stone-800 flex items-center gap-1.5 transition shrink-0"
        >
          <HelpCircle size={14} className="text-amber-400" />
          <span>{showArchitectureGuide ? 'Hide Sound Architecture' : 'Audio Engine Architecture'}</span>
        </button>
      </div>

      {/* Optional Synthesis Architecture Documentation */}
      {showArchitectureGuide && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-6 rounded-3xl bg-stone-900 border border-amber-500/40 shadow-xl space-y-4 font-mono text-xs text-stone-300"
        >
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h4 className="font-cinzel font-bold text-sm text-amber-200 flex items-center gap-2">
              <Cpu size={16} className="text-amber-400" />
              <span>Production Web Audio Synthesis Engine Specifications</span>
            </h4>
            <span className="text-[10px] text-amber-400 font-bold">Standardized Web Audio API</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <span className="font-cinzel font-bold text-amber-300 block text-xs">1. Micro-Haptic Envelopes</span>
              <p className="text-stone-400 leading-relaxed font-sans">
                Tactile button clicks and card flips utilize ultra-fast 50ms-120ms exponential pitch decay envelopes on sine/triangle oscillators to create zero-latency click feedback without downloading audio files.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <span className="font-cinzel font-bold text-amber-300 block text-xs">2. Harmonic Warhorns</span>
              <p className="text-stone-400 leading-relaxed font-sans">
                Player and boss entrances synthesize domain-specific brass overtone intervals (e.g. perfect fifths for Arcane, tritone intervals for Abyss, major triads for Sanctuary) with dual oscillators and lowpass filtering.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <span className="font-cinzel font-bold text-amber-300 block text-xs">3. Procedural Crackle & Drones</span>
              <p className="text-stone-400 leading-relaxed font-sans">
                Environmental biomes (like Molten Caldera) combine multi-oscillator low-frequency root chords with algorithmic white-noise impulse buffers to generate live lava/ember crackles in real time.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Soundboard Interactive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSounds.map((sound) => {
          const isPlaying = activePlayingId === sound.id || (sound.category === 'ambient' && activeAmbiance === sound.domain);

          return (
            <motion.div
              key={sound.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl bg-stone-900/90 border-2 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group ${
                isPlaying
                  ? 'border-amber-400 ring-2 ring-amber-400/50 bg-stone-900 shadow-amber-500/20'
                  : 'border-stone-800 hover:border-amber-500/50'
              }`}
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{sound.icon}</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-stone-950 text-stone-400 border border-stone-800 uppercase font-bold">
                  {sound.category}
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <h4 className="font-cinzel font-bold text-sm text-stone-100 group-hover:text-amber-300 transition">
                  {sound.name}
                </h4>
                <p className="text-stone-400 text-xs leading-relaxed font-sans line-clamp-2">
                  {sound.description}
                </p>
              </div>

              {/* Action Trigger Button */}
              <button
                type="button"
                onClick={() => triggerSound(sound.id, sound.action)}
                className={`w-full py-2 px-3 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow ${
                  isPlaying
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-amber-400'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Activity size={13} className="animate-spin" />
                    <span>{sound.category === 'ambient' ? 'Drone Active' : 'Synthesizing...'}</span>
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    <span>{sound.category === 'ambient' ? 'Start Drone Ambiance' : 'Play Sound'}</span>
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
