import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Play, 
  Square, 
  Sliders, 
  Radio, 
  Activity, 
  Flame, 
  Zap, 
  Shield, 
  Skull, 
  Compass, 
  ChevronUp, 
  ChevronDown,
  Music,
  Wind
} from 'lucide-react';
import { soundEngine, DomainAudioTheme } from '../utils/audioEngine';

interface AudioEngineProps {
  currentRealmId?: string;
  className?: string;
}

export const AudioEngine: React.FC<AudioEngineProps> = ({ currentRealmId = 'Sanctuary', className = '' }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEngine.getMuted());
  const [volume, setVolume] = useState<number>(() => Math.round(soundEngine.getVolume() * 100));
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<DomainAudioTheme>(() => {
    if (currentRealmId === 'Arcane' || currentRealmId === 'Tempest') return 'Arcane';
    if (['Sanctuary', 'Radiance', 'Verdance', 'Abyss'].includes(currentRealmId)) {
      return currentRealmId as DomainAudioTheme;
    }
    return 'Neutral';
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [fxEnabled, setFxEnabled] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Sync realm changes to soundscape
  useEffect(() => {
    let theme: DomainAudioTheme = 'Neutral';
    if (currentRealmId === 'Arcane' || currentRealmId === 'Tempest') theme = 'Arcane';
    else if (['Sanctuary', 'Radiance', 'Verdance', 'Abyss'].includes(currentRealmId)) {
      theme = currentRealmId as DomainAudioTheme;
    }
    setSelectedTheme(theme);
    if (isPlayingSoundscape && !isMuted) {
      soundEngine.playDomainSoundscape(theme);
    }
  }, [currentRealmId]);

  // Handle mute toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (nextMuted) {
      soundEngine.stopDrone();
      setIsPlayingSoundscape(false);
    } else {
      soundEngine.playMicroSound('select');
    }
  };

  // Handle volume changes
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    soundEngine.setVolume(newVol / 100);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
      soundEngine.setMuted(false);
    }
  };

  // Play / stop ambient soundscape
  const handleToggleSoundscape = () => {
    if (isPlayingSoundscape) {
      soundEngine.stopDrone();
      setIsPlayingSoundscape(false);
    } else {
      if (isMuted) {
        setIsMuted(false);
        soundEngine.setMuted(false);
      }
      soundEngine.playDomainSoundscape(selectedTheme);
      setIsPlayingSoundscape(true);
    }
  };

  // Switch soundscape theme
  const handleSelectTheme = (theme: DomainAudioTheme) => {
    setSelectedTheme(theme);
    if (isPlayingSoundscape || !isMuted) {
      soundEngine.playDomainSoundscape(theme);
      setIsPlayingSoundscape(true);
    }
  };

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = soundEngine.getAnalyser();

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (!analyser || isMuted || (!isPlayingSoundscape && soundEngine.getAudioContext()?.state !== 'running')) {
        // Subtle idle pulse
        const t = Date.now() * 0.003;
        const barCount = 12;
        const barWidth = width / barCount - 2;
        for (let i = 0; i < barCount; i++) {
          const h = 3 + Math.sin(t + i * 0.5) * 2;
          ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
          ctx.fillRect(i * (barWidth + 2), height - h, barWidth, h);
        }
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barCount = 16;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * 2] || 0;
        const percent = value / 255;
        const barHeight = Math.max(3, percent * height);

        // Gradient based on selected realm
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        if (selectedTheme === 'Sanctuary') {
          gradient.addColorStop(0, '#ca8a04');
          gradient.addColorStop(1, '#fde047');
        } else if (selectedTheme === 'Arcane') {
          gradient.addColorStop(0, '#2563eb');
          gradient.addColorStop(1, '#67e8f9');
        } else if (selectedTheme === 'Radiance') {
          gradient.addColorStop(0, '#dc2626');
          gradient.addColorStop(1, '#fb923c');
        } else if (selectedTheme === 'Verdance') {
          gradient.addColorStop(0, '#059669');
          gradient.addColorStop(1, '#86efac');
        } else if (selectedTheme === 'Abyss') {
          gradient.addColorStop(0, '#0891b2');
          gradient.addColorStop(1, '#a855f7');
        } else {
          gradient.addColorStop(0, '#78716c');
          gradient.addColorStop(1, '#fbbf24');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(i * (barWidth + 2), height - barHeight, barWidth, barHeight);
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlayingSoundscape, isMuted, selectedTheme]);

  const REALM_THEME_CONFIG: Array<{
    theme: DomainAudioTheme;
    name: string;
    icon: React.ReactNode;
    color: string;
    ambientDesc: string;
  }> = [
    { theme: 'Sanctuary', name: 'Sanctuary', icon: <Sparkles size={12} />, color: '#eab308', ambientDesc: 'Golden Choir & Wind Chimes' },
    { theme: 'Arcane', name: 'Tempest', icon: <Zap size={12} />, color: '#38bdf8', ambientDesc: 'Thunder & Gale Storm Winds' },
    { theme: 'Radiance', name: 'Radiance', icon: <Flame size={12} />, color: '#f97316', ambientDesc: 'Molten Forge & Hearth Embers' },
    { theme: 'Abyss', name: 'Abyss', icon: <Skull size={12} />, color: '#06b6d4', ambientDesc: 'Spectral Cryo-Hums & Whispers' },
    { theme: 'Verdance', name: 'Verdance', icon: <Wind size={12} />, color: '#10b981', ambientDesc: 'Canopy Breeze & Sacred Spring' },
    { theme: 'Neutral', name: 'Nexus', icon: <Compass size={12} />, color: '#a855f7', ambientDesc: 'Astral Convergence Harmonics' },
  ];

  return (
    <div className={`relative z-40 ${className}`}>
      {/* Floating Compact Audio Controller */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-stone-800 shadow-xl text-stone-200">
        
        {/* Mute/Unmute Toggle */}
        <button
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Audio Engine' : 'Mute Audio Engine'}
          id="audio-mute-toggle"
          className={`p-1.5 rounded-xl border transition ${
            isMuted 
              ? 'bg-red-950/60 border-red-800 text-red-400 hover:bg-red-900/80' 
              : 'bg-stone-800 border-amber-500/40 text-amber-300 hover:bg-stone-700'
          }`}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Ambient Play/Stop Button */}
        <button
          onClick={handleToggleSoundscape}
          title={isPlayingSoundscape ? 'Stop Realm Ambient Soundscape' : 'Play Realm Ambient Soundscape'}
          id="audio-ambient-play"
          className={`px-2.5 py-1 rounded-xl text-[11px] font-cinzel font-bold flex items-center gap-1.5 border transition ${
            isPlayingSoundscape && !isMuted
              ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_12px_rgba(234,179,8,0.4)]'
              : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-stone-100'
          }`}
        >
          {isPlayingSoundscape && !isMuted ? (
            <>
              <Square size={11} className="fill-black" />
              <span>Ambient On</span>
            </>
          ) : (
            <>
              <Music size={11} />
              <span>Ambient</span>
            </>
          )}
        </button>

        {/* Waveform Canvas Visualizer */}
        <div className="hidden sm:flex items-center px-2 py-0.5 rounded-lg bg-stone-950 border border-stone-800">
          <canvas ref={canvasRef} width={64} height={16} className="w-16 h-4 block" />
        </div>

        {/* Expand / Panel Toggle */}
        <button
          onClick={() => {
            soundEngine.playMicroSound('hover');
            setIsExpanded(!isExpanded);
          }}
          title="Open Audio Soundscape & FX Settings"
          id="audio-panel-toggle"
          className="p-1 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition"
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>

      {/* Expanded Audio Engine Modal / Flyout */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 p-4 rounded-2xl bg-stone-950/95 backdrop-blur-xl border-2 border-amber-500/50 shadow-[0_15px_40px_rgba(0,0,0,0.8)] space-y-4 text-xs font-cinzel text-stone-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <div className="flex items-center gap-1.5">
                <Radio size={14} className="text-amber-400 animate-pulse" />
                <span className="font-black text-amber-200 tracking-wider text-xs uppercase">
                  Nexus Audio Engine
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                Web Audio Synthesizer
              </span>
            </div>

            {/* Master Volume Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-stone-400">Master Volume</span>
                <span className="text-amber-300 font-bold">{isMuted ? 'Muted' : `${volume}%`}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Realm Ambient Soundscapes Selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                Realm Ambient Soundscapes
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {REALM_THEME_CONFIG.map((item) => {
                  const isSelected = selectedTheme === item.theme;
                  return (
                    <button
                      key={item.theme}
                      onClick={() => handleSelectTheme(item.theme)}
                      className={`p-2 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-md'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span style={{ color: item.color }}>{item.icon}</span>
                        <span className="font-bold text-[11px]">{item.name}</span>
                      </div>
                      <span className="text-[9px] font-sans text-stone-400 mt-1 line-clamp-1">
                        {item.ambientDesc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UI Micro-Feedback Audio Triggers */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  UI Haptic Sound FX
                </span>
                <button
                  onClick={() => setFxEnabled(!fxEnabled)}
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                    fxEnabled ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-stone-800 text-stone-500 border-stone-700'
                  }`}
                >
                  {fxEnabled ? 'ENABLED' : 'MUTED'}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1">
                <button
                  onClick={() => soundEngine.playMicroSound('cardFlip')}
                  className="p-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[9px] text-stone-300 font-mono"
                >
                  Card Flip
                </button>
                <button
                  onClick={() => soundEngine.playMicroSound('shimmer')}
                  className="p-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[9px] text-stone-300 font-mono"
                >
                  Shimmer
                </button>
                <button
                  onClick={() => soundEngine.playCombatClash('attack')}
                  className="p-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[9px] text-stone-300 font-mono"
                >
                  Attack
                </button>
                <button
                  onClick={() => soundEngine.playCombatClash('spell')}
                  className="p-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[9px] text-stone-300 font-mono"
                >
                  Spell
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
