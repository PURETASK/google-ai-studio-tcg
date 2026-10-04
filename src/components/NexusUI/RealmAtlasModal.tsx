import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REALM_ART_THEMES, RealmArtTheme } from '../../data/nexusArtTheme';
import { soundEngine } from '../../utils/audioEngine';
import { 
  X, 
  Compass, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  Check, 
  ArrowRight, 
  Shield, 
  Flame, 
  Zap, 
  Skull, 
  Trees, 
  Sun,
  Layers,
  Swords
} from 'lucide-react';

interface RealmAtlasModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRealmId: string;
  onSelectRealm: (realmId: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export const RealmAtlasModal: React.FC<RealmAtlasModalProps> = ({
  isOpen,
  onClose,
  activeRealmId,
  onSelectRealm,
  onNavigateTab
}) => {
  const [selectedDomainKey, setSelectedDomainKey] = useState<string>(activeRealmId || 'Nexus');
  const [isAudioPreviewPlaying, setIsAudioPreviewPlaying] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentTheme = REALM_ART_THEMES[selectedDomainKey] || REALM_ART_THEMES.Nexus;

  const handleDomainClick = (domainKey: string) => {
    soundEngine.playMicroSound('select');
    setSelectedDomainKey(domainKey);
    const theme = REALM_ART_THEMES[domainKey];
    if (theme && isAudioPreviewPlaying) {
      soundEngine.playDomainSoundscape(theme.ambientSoundTheme);
    }
  };

  const handleApplyTheme = () => {
    soundEngine.playMicroSound('unlock');
    onSelectRealm(selectedDomainKey);
    onClose();
  };

  const toggleAudioAmbiance = () => {
    soundEngine.playMicroSound('click');
    if (isAudioPreviewPlaying) {
      soundEngine.stopDrone();
      setIsAudioPreviewPlaying(false);
    } else {
      soundEngine.playDomainSoundscape(currentTheme.ambientSoundTheme);
      setIsAudioPreviewPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className="w-full max-w-6xl bg-stone-950 border border-amber-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Compass size={22} className="animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-cinzel font-black text-lg text-stone-100 flex items-center gap-2">
                <span>The Grand Atlas of Nexus</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  5 Realms + Central Core
                </span>
              </h2>
              <p className="text-xs text-stone-400 font-sans">
                Interactive domain cartography, architectural lore, and atmospheric realm switcher
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAudioAmbiance}
              className={`px-3 py-1.5 rounded-xl border text-xs font-cinzel flex items-center gap-1.5 transition ${
                isAudioPreviewPlaying
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
              }`}
              title="Toggle domain soundscape drone"
            >
              {isAudioPreviewPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span className="hidden sm:inline">
                {isAudioPreviewPlaying ? 'Ambiance Live' : 'Preview Ambiance'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playMicroSound('click');
                if (isAudioPreviewPlaying) soundEngine.stopDrone();
                onClose();
              }}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition border border-stone-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Body: Map View & Lore Detail Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left: Interactive Realm Map (7 cols) */}
          <div className="lg:col-span-7 bg-stone-950/90 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-stone-800 flex flex-col justify-between relative overflow-hidden">
            
            {/* Map Canvas Visual */}
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-stone-900/60 border border-stone-800 overflow-hidden shadow-inner flex items-center justify-center p-2">
              
              {/* Starfield / Grid Backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Central Astral Nexus Gate */}
              <button
                type="button"
                onClick={() => handleDomainClick('Nexus')}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 p-3 rounded-full ${
                  selectedDomainKey === 'Nexus'
                    ? 'scale-110 ring-4 ring-amber-400/80 bg-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.6)]'
                    : 'hover:scale-105 bg-stone-900/80 border border-amber-500/40'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 via-sky-500 to-indigo-600 flex flex-col items-center justify-center text-white shadow-lg">
                  <Sparkles size={20} className="animate-pulse" />
                  <span className="text-[9px] font-cinzel font-black tracking-wider mt-0.5">NEXUS</span>
                </div>
              </button>

              {/* Top Left: Radiance (Molten Forge) */}
              <button
                type="button"
                onClick={() => handleDomainClick('Radiance')}
                className={`absolute left-[12%] top-[14%] z-10 group transition-all duration-300 p-2.5 rounded-2xl ${
                  selectedDomainKey === 'Radiance'
                    ? 'scale-110 ring-2 ring-orange-500 bg-orange-950/80 shadow-[0_0_25px_rgba(249,115,22,0.6)]'
                    : 'hover:scale-105 bg-stone-950/80 border border-orange-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-600/30 border border-orange-500/60 flex items-center justify-center text-orange-400">
                    <Flame size={18} />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-cinzel font-bold text-orange-200">Radiance</div>
                    <div className="text-[9px] font-mono text-orange-400">Molten Caldera</div>
                  </div>
                </div>
              </button>

              {/* Top Right: Tempest (Sky Citadel) */}
              <button
                type="button"
                onClick={() => handleDomainClick('Tempest')}
                className={`absolute right-[12%] top-[14%] z-10 group transition-all duration-300 p-2.5 rounded-2xl ${
                  selectedDomainKey === 'Tempest'
                    ? 'scale-110 ring-2 ring-blue-400 bg-blue-950/80 shadow-[0_0_25px_rgba(59,130,246,0.6)]'
                    : 'hover:scale-105 bg-stone-950/80 border border-blue-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/60 flex items-center justify-center text-blue-400">
                    <Zap size={18} />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-cinzel font-bold text-blue-200">Tempest</div>
                    <div className="text-[9px] font-mono text-blue-400">Sky Citadels</div>
                  </div>
                </div>
              </button>

              {/* Bottom Left: Verdance (World Tree) */}
              <button
                type="button"
                onClick={() => handleDomainClick('Verdance')}
                className={`absolute left-[12%] bottom-[14%] z-10 group transition-all duration-300 p-2.5 rounded-2xl ${
                  selectedDomainKey === 'Verdance'
                    ? 'scale-110 ring-2 ring-emerald-500 bg-emerald-950/80 shadow-[0_0_25px_rgba(16,185,129,0.6)]'
                    : 'hover:scale-105 bg-stone-950/80 border border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
                    <Trees size={18} />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-cinzel font-bold text-emerald-200">Verdance</div>
                    <div className="text-[9px] font-mono text-emerald-400">World Tree</div>
                  </div>
                </div>
              </button>

              {/* Bottom Right: Sanctuary (Ivory Cathedral) */}
              <button
                type="button"
                onClick={() => handleDomainClick('Sanctuary')}
                className={`absolute right-[12%] bottom-[14%] z-10 group transition-all duration-300 p-2.5 rounded-2xl ${
                  selectedDomainKey === 'Sanctuary'
                    ? 'scale-110 ring-2 ring-yellow-400 bg-amber-950/80 shadow-[0_0_25px_rgba(234,179,8,0.6)]'
                    : 'hover:scale-105 bg-stone-950/80 border border-amber-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-600/30 border border-amber-500/60 flex items-center justify-center text-yellow-300">
                    <Sun size={18} />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-cinzel font-bold text-yellow-100">Sanctuary</div>
                    <div className="text-[9px] font-mono text-yellow-400">Ivory Spires</div>
                  </div>
                </div>
              </button>

              {/* Bottom Center: Abyss (Gothic Crypts) */}
              <button
                type="button"
                onClick={() => handleDomainClick('Abyss')}
                className={`absolute left-1/2 bottom-[6%] -translate-x-1/2 z-10 group transition-all duration-300 p-2.5 rounded-2xl ${
                  selectedDomainKey === 'Abyss'
                    ? 'scale-110 ring-2 ring-cyan-400 bg-cyan-950/80 shadow-[0_0_25px_rgba(6,182,212,0.6)]'
                    : 'hover:scale-105 bg-stone-950/80 border border-cyan-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-cyan-600/30 border border-cyan-500/60 flex items-center justify-center text-cyan-300">
                    <Skull size={18} />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-cinzel font-bold text-cyan-200">Abyss</div>
                    <div className="text-[9px] font-mono text-cyan-400">Soul Necropolis</div>
                  </div>
                </div>
              </button>

              {/* Connecting Runic Energy Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="50" x2="20" y2="25" stroke="#f97316" strokeWidth="0.8" strokeDasharray="2 1" opacity="0.6" />
                <line x1="50" y1="50" x2="80" y2="25" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="2 1" opacity="0.6" />
                <line x1="50" y1="50" x2="20" y2="75" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 1" opacity="0.6" />
                <line x1="50" y1="50" x2="80" y2="75" stroke="#eab308" strokeWidth="0.8" strokeDasharray="2 1" opacity="0.6" />
                <line x1="50" y1="50" x2="50" y2="85" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 1" opacity="0.6" />
              </svg>
            </div>

            {/* Realm Quick Bar Pill Selectors */}
            <div className="flex items-center justify-between gap-1.5 mt-3 overflow-x-auto pb-1">
              {Object.values(REALM_ART_THEMES).map(th => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => handleDomainClick(th.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-cinzel font-bold flex items-center gap-1.5 transition shrink-0 ${
                    selectedDomainKey === th.id
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                  }`}
                >
                  <span>{th.sigil}</span>
                  <span>{th.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right: Selected Realm Showcase & Lore (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-stone-900/60 overflow-y-auto space-y-5 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Realm Title Header */}
              <div className="border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                  <span>{currentTheme.sigil}</span>
                  <span>{currentTheme.domain} Territory</span>
                </div>
                <h3 className="font-cinzel font-black text-xl text-stone-100">
                  {currentTheme.name}
                </h3>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  {currentTheme.subtitle}
                </p>
              </div>

              {/* Scenery & Atmosphere Profile */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                <div className="font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>{currentTheme.sceneryTitle}</span>
                </div>
                <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  {currentTheme.sceneryDescription}
                </p>
              </div>

              {/* Champion of the Realm */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs">
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-0.5">
                  Realm Sovereign / Champion
                </div>
                <div className="font-cinzel font-bold text-stone-100 text-sm">
                  {currentTheme.championName}
                </div>
                <div className="text-[11px] font-sans text-amber-400/90 mt-0.5">
                  {currentTheme.championTitle}
                </div>
              </div>

              {/* Architectural & Lighting Lore */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5 text-xs">
                <div className="text-[10px] font-mono uppercase text-stone-400">Architectural Codex</div>
                <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                  {currentTheme.architecturalStyle}
                </p>
                <div className="text-[10px] font-mono uppercase text-stone-400 pt-1 border-t border-stone-850">Atmospheric Lighting</div>
                <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                  {currentTheme.lightingMood}
                </p>
              </div>

              {/* Domain Lore Passage */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300 leading-relaxed italic">
                "{currentTheme.lore}"
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-800 space-y-2">
              <button
                type="button"
                onClick={handleApplyTheme}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-cinzel font-black text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Check size={16} />
                <span>Apply {currentTheme.name.split(' ')[0]} as Global Theme</span>
              </button>

              {onNavigateTab && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateTab('codex');
                      onClose();
                    }}
                    className="py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-cinzel font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Layers size={13} />
                    <span>View Codex</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onNavigateTab('arena');
                      onClose();
                    }}
                    className="py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-cinzel font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Swords size={13} />
                    <span>Battle Arena</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
