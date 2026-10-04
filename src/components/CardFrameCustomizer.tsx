import React, { useState } from 'react';
import { Card, Domain, DiegeticFrameConfig } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { soundEngine } from '../utils/audioEngine';
import { 
  Sparkles, 
  Layers, 
  Sun, 
  Shield, 
  Trees, 
  Skull, 
  Wind, 
  Eye, 
  RotateCw, 
  Sliders,
  CheckCircle2,
  Palette
} from 'lucide-react';

export const CardFrameCustomizer: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain>('Radiance');
  const [config, setConfig] = useState<DiegeticFrameConfig>({
    material: 'inferium',
    finish: 'gold_leaf',
    borderGlow: true,
    showTextureNoise: true,
    accentEngraving: true
  });
  const [cardIndex, setCardIndex] = useState(0);

  const domainCards = CARDS_DATABASE.filter(c => c.domain === selectedDomain);
  const activeCard = domainCards && domainCards.length > 0 
    ? (domainCards[cardIndex % domainCards.length] || domainCards[0]) 
    : CARDS_DATABASE[0];

  const materialSpecs = {
    inferium: {
      name: 'Blackened Inferium & Sunstone Vents',
      domain: 'Radiance',
      description: 'Volcanic basalt alloy with subterranean heat channels and glowing magma fissures.',
      frameClass: 'from-amber-950 via-stone-900 to-red-950 border-orange-500/70 shadow-[0_0_25px_rgba(249,115,22,0.4)]',
      glowColor: '#f97316'
    },
    aegis_stone: {
      name: 'Ivory Aegis Stone & Radiant Gold',
      domain: 'Sanctuary',
      description: 'Polished celestial marble with inlaid gold filigree and Ophanim halo runes.',
      frameClass: 'from-stone-900 via-amber-950/40 to-stone-900 border-yellow-400/70 shadow-[0_0_25px_rgba(234,179,8,0.4)]',
      glowColor: '#eab308'
    },
    living_bark: {
      name: 'Grown Bark & Viridian Nodes',
      domain: 'Verdance',
      description: 'Petrified elderwood grain intertwined with luminous bioluminescent moss.',
      frameClass: 'from-emerald-950 via-stone-950 to-teal-950 border-emerald-500/70 shadow-[0_0_25px_rgba(16,185,129,0.4)]',
      glowColor: '#10b981'
    },
    necrosteel: {
      name: 'Segmented Necrosteel & Void Slits',
      domain: 'Abyss',
      description: 'Obsidian alloy plates forged with trapped spectral soul essence and violet grills.',
      frameClass: 'from-purple-950 via-stone-950 to-neutral-950 border-purple-500/70 shadow-[0_0_25px_rgba(168,85,247,0.4)]',
      glowColor: '#a855f7'
    },
    storm_metal: {
      name: 'Aerodynamic Storm Metal & Charged Glass',
      domain: 'Tempest',
      description: 'Brushed cobalt-titanium alloy with capacitive lightning-arc circuits.',
      frameClass: 'from-sky-950 via-stone-950 to-cyan-950 border-sky-400/70 shadow-[0_0_25px_rgba(14,165,233,0.4)]',
      glowColor: '#0ea5e9'
    },
    standard_codex: {
      name: 'Standard Codex Interface',
      domain: 'Universal',
      description: 'Clean architectural titanium framing with high-contrast tactical data display.',
      frameClass: 'from-stone-900 via-neutral-900 to-stone-950 border-amber-500/50 shadow-xl',
      glowColor: '#d97706'
    }
  };

  const currentSpec = materialSpecs[config.material];

  const handleDomainChange = (domain: Domain) => {
    soundEngine.playMicroSound('select');
    setSelectedDomain(domain);
    setCardIndex(0);
    if (domain === 'Radiance') setConfig(c => ({ ...c, material: 'inferium' }));
    else if (domain === 'Sanctuary') setConfig(c => ({ ...c, material: 'aegis_stone' }));
    else if (domain === 'Verdance') setConfig(c => ({ ...c, material: 'living_bark' }));
    else if (domain === 'Abyss') setConfig(c => ({ ...c, material: 'necrosteel' }));
    else if (domain === 'Tempest') setConfig(c => ({ ...c, material: 'storm_metal' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-950 via-neutral-900 to-stone-950 border-2 border-amber-500/40 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase tracking-widest">
            <Palette size={16} />
            <span>Master Visual Production Bible • 15 Calibration Pack</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-black text-amber-100 mt-1">
            Nexus Codex Realism Frame & Texture Studio
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-3xl mt-1.5 leading-relaxed">
            Architectural material textures, authentic diegetic domain plating, and multi-tier foil sheens designed to eliminate AI slop and deliver physical TCG realism.
          </p>
        </div>

        {/* Domain Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['Radiance', 'Sanctuary', 'Verdance', 'Abyss', 'Tempest'] as Domain[]).map(d => (
            <button
              key={d}
              onClick={() => handleDomainChange(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold transition ${
                selectedDomain === d
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Customizer Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Material Selector */}
          <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-3">
            <h3 className="font-cinzel font-bold text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} />
              <span>Diegetic Material Plating</span>
            </h3>

            <div className="space-y-2">
              {Object.entries(materialSpecs).map(([key, spec]) => (
                <div
                  key={key}
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setConfig(c => ({ ...c, material: key as any }));
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    config.material === key
                      ? 'bg-stone-950 border-amber-400 shadow-md ring-1 ring-amber-500/40'
                      : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-xs text-stone-200">
                      {spec.name}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">
                      {spec.domain}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Foil Finish Selector */}
          <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-3">
            <h3 className="font-cinzel font-bold text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Foil Surface Treatment</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'none', label: 'Standard Matte', icon: '📄' },
                { id: 'gold_leaf', label: 'Gold Leaf Filigree', icon: '✨' },
                { id: 'prismatic_holo', label: 'Prismatic Holo', icon: '🌈' },
                { id: 'cosmic_starlight', label: 'Cosmic Starlight', icon: '🌌' },
                { id: 'etched_relic', label: 'Etched Relic Finish', icon: '🏛️' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => {
                    soundEngine.playMicroSound('select');
                    setConfig(c => ({ ...c, finish: f.id as any }));
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs font-cinzel font-bold flex items-center gap-2 transition ${
                    config.finish === f.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shader Toggles */}
          <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-3">
            <h3 className="font-cinzel font-bold text-xs text-amber-300 uppercase tracking-wider">
              Shader Overlays & Noise
            </h3>

            <div className="space-y-2">
              <label className="flex items-center justify-between p-2 rounded-xl bg-stone-950 text-xs font-mono text-stone-300 cursor-pointer">
                <span>Active Border Glow FX</span>
                <input
                  type="checkbox"
                  checked={config.borderGlow}
                  onChange={e => setConfig(c => ({ ...c, borderGlow: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-stone-950 text-xs font-mono text-stone-300 cursor-pointer">
                <span>Surface Material Texture</span>
                <input
                  type="checkbox"
                  checked={config.showTextureNoise}
                  onChange={e => setConfig(c => ({ ...c, showTextureNoise: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-stone-950 text-xs font-mono text-stone-300 cursor-pointer">
                <span>Diegetic Corner Engraving</span>
                <input
                  type="checkbox"
                  checked={config.accentEngraving}
                  onChange={e => setConfig(c => ({ ...c, accentEngraving: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Right: Live Interactive Card Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-3xl bg-stone-950/80 border border-amber-500/30 shadow-2xl relative min-h-[600px]">
          
          {/* Card Navigation */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Previewing {activeCard.name} ({cardIndex + 1} of {domainCards.length})</span>
            <button
              onClick={() => setCardIndex(i => i + 1)}
              className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-amber-300 hover:text-white transition flex items-center gap-1"
            >
              <RotateCw size={12} />
              <span>Next Card</span>
            </button>
          </div>

          {/* The Styled Diegetic Card Frame */}
          <div className={`relative w-[340px] sm:w-[380px] rounded-3xl p-5 border-2 bg-gradient-to-br ${currentSpec.frameClass} transition-all duration-300 select-none shadow-2xl group`}>
            
            {/* Foil Overlay Sheen */}
            {config.finish === 'gold_leaf' && (
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-400/20 via-transparent to-yellow-200/20 pointer-events-none mix-blend-color-dodge" />
            )}
            {config.finish === 'prismatic_holo' && (
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500/15 via-green-500/15 to-blue-500/15 pointer-events-none mix-blend-overlay" />
            )}
            {config.finish === 'cosmic_starlight' && (
              <div className="absolute inset-0 rounded-3xl bg-radial from-purple-500/20 via-transparent to-black/30 pointer-events-none mix-blend-screen" />
            )}

            {/* Corner Engraving Accents */}
            {config.accentEngraving && (
              <>
                <div className="absolute top-2 left-2 text-[10px] font-mono text-amber-400/60 pointer-events-none">❖</div>
                <div className="absolute top-2 right-2 text-[10px] font-mono text-amber-400/60 pointer-events-none">❖</div>
                <div className="absolute bottom-2 left-2 text-[10px] font-mono text-amber-400/60 pointer-events-none">❖</div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-amber-400/60 pointer-events-none">❖</div>
              </>
            )}

            {/* Card Content Interior */}
            <div className="p-4 rounded-2xl bg-stone-950/90 border border-white/10 space-y-3 relative z-10 backdrop-blur-sm">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div>
                  <h3 className="font-cinzel font-black text-base text-amber-200 leading-tight">
                    {activeCard.name}
                  </h3>
                  <span className="text-[10px] font-mono text-stone-400">
                    {activeCard.domain} • {activeCard.cardType}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center font-cinzel font-black text-sm text-amber-300">
                  {activeCard.cost}
                </div>
              </div>

              {/* Artwork Placeholder Frame */}
              <div className="h-40 rounded-xl bg-gradient-to-br from-stone-900 via-neutral-900 to-stone-950 border border-stone-800 flex flex-col items-center justify-center text-center p-3">
                <span className="text-3xl mb-1">
                  {activeCard.domain === 'Radiance' ? '🌋' :
                   activeCard.domain === 'Sanctuary' ? '✨' :
                   activeCard.domain === 'Verdance' ? '🌿' :
                   activeCard.domain === 'Abyss' ? '💀' : '⚡'}
                </span>
                <span className="font-cinzel text-xs font-bold text-stone-300">
                  {activeCard.subtype}
                </span>
                <span className="text-[10px] font-mono text-amber-400/80">
                  {activeCard.rarity}
                </span>
              </div>

              {/* Rules & Abilities */}
              <div className="space-y-1.5 text-xs text-stone-300 leading-relaxed font-sans">
                {activeCard.abilities?.slice(0, 2).map((a, i) => (
                  <div key={i} className="p-2 rounded-lg bg-black/40 border border-stone-800/80">
                    <strong className="text-amber-300 font-cinzel">{a.name}: </strong>
                    <span>{a.description}</span>
                  </div>
                ))}
              </div>

              {/* Flavor Text */}
              <p className="text-[10px] text-stone-400 italic font-serif leading-snug border-t border-stone-800 pt-2">
                {activeCard.quote || activeCard.lore}
              </p>

              {/* Footer Stats */}
              <div className="flex items-center justify-between pt-1 border-t border-stone-800 text-xs font-mono font-bold">
                <span className="text-red-400">⚔️ PWR {activeCard.power}</span>
                <span className="text-stone-400">SPEED {activeCard.speed || 5}</span>
                <span className="text-blue-400">🛡️ DEF {activeCard.defense}</span>
              </div>

            </div>

          </div>

          <div className="mt-6 text-center text-xs font-mono text-stone-400">
            Active Material: <strong className="text-amber-400">{currentSpec.name}</strong> • Finish: <strong className="text-amber-300">{config.finish}</strong>
          </div>

        </div>

      </div>

    </div>
  );
};
