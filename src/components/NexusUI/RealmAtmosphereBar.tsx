import React, { useState } from 'react';
import { REALM_ART_THEMES, RealmArtTheme } from '../../data/nexusArtTheme';
import { soundEngine } from '../../utils/audioEngine';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Compass, 
  Layers, 
  Eye,
  ChevronUp,
  ChevronDown,
  Palette
} from 'lucide-react';

interface RealmAtmosphereBarProps {
  activeRealmId: string;
  onSelectRealm: (realmId: string) => void;
  onOpenAtlas: () => void;
  enableParticles: boolean;
  onToggleParticles: () => void;
  particleDensity: 'low' | 'medium' | 'high';
  onChangeParticleDensity: (density: 'low' | 'medium' | 'high') => void;
}

export const RealmAtmosphereBar: React.FC<RealmAtmosphereBarProps> = ({
  activeRealmId,
  onSelectRealm,
  onOpenAtlas,
  enableParticles,
  onToggleParticles,
  particleDensity,
  onChangeParticleDensity
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [volume, setVolume] = useState<number>(soundEngine.getVolume());

  const currentTheme = REALM_ART_THEMES[activeRealmId] || REALM_ART_THEMES.Nexus;

  const handleToggleMute = () => {
    soundEngine.playMicroSound('click');
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:right-6 z-40">
      
      {/* Expanded Setting Panel */}
      {isExpanded && (
        <div className="mb-2 p-4 w-80 rounded-3xl bg-stone-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-3">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{currentTheme.sigil}</span>
              <span className="font-cinzel font-bold text-xs text-stone-200">
                Atmospheric Realm Ambiance
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-stone-400 hover:text-white p-1"
            >
              <ChevronDown size={15} />
            </button>
          </div>

          {/* Quick Realm Switcher */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">
              Active Dimension / Theme
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {Object.values(REALM_ART_THEMES).map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    onSelectRealm(r.id);
                  }}
                  className={`p-1.5 rounded-xl text-[10px] font-cinzel font-bold flex flex-col items-center justify-center transition ${
                    activeRealmId === r.id
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-850'
                  }`}
                >
                  <span className="text-xs">{r.sigil}</span>
                  <span className="truncate max-w-[70px]">{r.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Audio Ambiance Drone & Volume */}
          <div className="p-2.5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-cinzel text-[11px] text-stone-300 flex items-center gap-1.5">
                <Volume2 size={13} className="text-amber-400" />
                Audio Master
              </span>
              <button
                type="button"
                onClick={handleToggleMute}
                className="text-[10px] font-mono text-stone-400 hover:text-amber-300"
              >
                {isMuted ? 'UNMUTE' : 'MUTE'}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Particle Density Switch */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-cinzel text-[11px] text-stone-400">Particles</span>
            <div className="flex items-center gap-1">
              {(['low', 'medium', 'high'] as const).map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    onChangeParticleDensity(d);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition ${
                    particleDensity === d && enableParticles
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Full Atlas Link */}
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              onOpenAtlas();
            }}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-stone-950 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <Compass size={14} />
            <span>Open Interactive Realm Atlas</span>
          </button>

        </div>
      )}

      {/* Collapsed Pill Button */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-stone-950/90 border border-amber-500/40 shadow-2xl backdrop-blur-md">
        
        {/* Realm Atlas Trigger */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playMicroSound('select');
            onOpenAtlas();
          }}
          className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 transition border border-amber-500/40"
          title="Open Realm Atlas Map"
        >
          <Compass size={16} />
        </button>

        {/* Current Active Realm Name Pill */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-cinzel font-bold flex items-center gap-2 transition"
        >
          <span>{currentTheme.sigil}</span>
          <span className="hidden sm:inline">{currentTheme.name.split(' ')[0]}</span>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>

        {/* Mute Quick Toggle */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

      </div>

    </div>
  );
};
