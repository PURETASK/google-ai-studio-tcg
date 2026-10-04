import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Domain, Card } from '../../types';
import { soundEngine } from '../../utils/audioEngine';
import { 
  Sparkles, 
  Eye, 
  Layers, 
  Compass, 
  Shield, 
  Flame, 
  Zap, 
  Skull, 
  Trees, 
  Sun, 
  Maximize2, 
  Minimize2, 
  Activity, 
  Info, 
  Play, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  Volume2, 
  Feather, 
  Cpu, 
  ScrollText, 
  Sliders, 
  Target, 
  Crosshair, 
  Radio, 
  ChevronRight, 
  MapPin, 
  Wind,
  ShieldAlert,
  Clock,
  Hexagon,
  Boxes,
  HelpCircle,
  Gem,
  Swords
} from 'lucide-react';

export type LayerId = 'vision' | 'layer1' | 'layer2' | 'layer3' | 'layer4' | 'layer6';

export type ArchitectureDomain = 'Radiance' | 'Verdance' | 'Abyss' | 'Tempest' | 'Sanctuary';

interface NexusArtArchitectureViewProps {
  onInspectCard?: (cardName: string) => void;
  onLaunchArenaWithDeck?: (domain: Domain) => void;
}

export const NexusArtArchitectureView: React.FC<NexusArtArchitectureViewProps> = ({
  onInspectCard,
  onLaunchArenaWithDeck
}) => {
  const [activeLayer, setActiveLayer] = useState<LayerId>('vision');
  const [selectedDomain, setSelectedDomain] = useState<ArchitectureDomain>('Radiance');
  const [selectedEffectKey, setSelectedEffectKey] = useState<string>('Ember Flow');
  const [interactiveMomentum, setInteractiveMomentum] = useState<number>(7);
  const [playerLife, setPlayerLife] = useState<number>(20);
  const [opponentLife, setOpponentLife] = useState<number>(20);
  const [activeResource, setActiveResource] = useState<{ [key: string]: number }>({
    energy: 12450,
    veridian: 3860,
    aegis: 1240,
    soulshard: 2775,
    cloudstone: 980
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // 6 Pillars of Nexus Art Vision
  const ART_VISION_PILLARS = [
    {
      id: 'realism',
      title: 'Cinematic Realism',
      tagline: 'Physical weight, atmospheric volumetric lighting & lifelike material fidelity',
      desc: 'Epic, immersive worlds rendered with lifelike detail, lighting, and atmosphere. Every shadow has depth, every metal has specular reflectance, and every domain has its own atmospheric volume.',
      icon: Eye,
      accent: '#f59e0b',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/20'
    },
    {
      id: 'scale',
      title: 'Monumental Scale',
      tagline: 'Vast floating sky citadels, colossal foundries & ancient architecture',
      desc: 'Vast environments and grand architecture that convey awe, power, and ancient legacy. From the towering spires of Mount Pratis to the eternal canopies of Eldervale.',
      icon: Layers,
      accent: '#38bdf8',
      border: 'border-sky-500/40',
      bg: 'bg-sky-950/20'
    },
    {
      id: 'machinery',
      title: 'Magic Meets Machinery',
      tagline: 'Arcane runic conduits fused with clockwork titan engineering',
      desc: 'Arcane power and advanced invention coexist—where mysticism and engineering align. Titan foundries channel sunstone plasma through precision gold-filigree gearwork.',
      icon: Cpu,
      accent: '#ec4899',
      border: 'border-pink-500/40',
      bg: 'bg-pink-950/20'
    },
    {
      id: 'history',
      title: 'Lived-In History',
      tagline: 'Weathered stone slabs, aged parchment accords & ancient ruins',
      desc: 'Every structure, relic, and ruin tells a story of time, tradition, and transformation. Centuries of magical convergence have etched their mark into every stone.',
      icon: ScrollText,
      accent: '#d97706',
      border: 'border-amber-600/40',
      bg: 'bg-amber-900/20'
    },
    {
      id: 'identity',
      title: 'Domain Identity First',
      tagline: 'Unmistakable color theory, geometric motifs & elemental personality',
      desc: 'Each domain has a clear purpose, visual language, and mood that makes it distinct and iconic. A Radiance spell is immediately distinguishable from an Abyssal rift.',
      icon: Shield,
      accent: '#10b981',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/20'
    },
    {
      id: 'readability',
      title: 'Readability & Clarity',
      tagline: 'Clean hierarchy, contrast ratios & ergonomic gameplay flow',
      desc: 'Clean hierarchy, visual contrast, and intuitive flow ensure the world is easy to explore. Instantaneous game state recognition under competitive battle conditions.',
      icon: Target,
      accent: '#a855f7',
      border: 'border-purple-500/40',
      bg: 'bg-purple-950/20'
    }
  ];

  // Layer 6 - Complete 25 Effect Hierarchy
  const DOMAIN_EFFECT_MATRIX: Record<ArchitectureDomain, {
    domainTitle: string;
    aspect: string;
    motif: string;
    color: string;
    primaryHex: string;
    secondaryHex: string;
    effects: Array<{ name: string; tier: string; desc: string; soundType: 'attack' | 'spell' | 'shield' | 'slay' }>;
  }> = {
    Radiance: {
      domainTitle: 'RADIANCE',
      aspect: 'ENERGY',
      motif: 'The Phoenix & Titan Sunstone',
      color: 'text-amber-400',
      primaryHex: '#f59e0b',
      secondaryHex: '#ef4444',
      effects: [
        { name: 'Ember Flow', tier: 'Tier 1 (Atmosphere)', desc: 'Gentle golden heat sparks drifting upward from molten fissures.', soundType: 'spell' },
        { name: 'Molten Glow', tier: 'Tier 2 (Ambient)', desc: 'Deep pulsating incandescent lava veins illuminating architectural stonework.', soundType: 'spell' },
        { name: 'Forge Sparks', tier: 'Tier 3 (Combat FX)', desc: 'High-velocity anvil sparks bursting upon physical impact and steel strikes.', soundType: 'attack' },
        { name: 'Rune Sear', tier: 'Tier 4 (Invocation)', desc: 'Incandescent solar runes burned directly into the slate battlemat surface.', soundType: 'attack' },
        { name: 'Heat Haze', tier: 'Tier 5 (Apex Ultimate)', desc: 'Refractive thermal distortion warping the air around titan sunstone cores.', soundType: 'slay' }
      ]
    },
    Verdance: {
      domainTitle: 'VERDANCE',
      aspect: 'LIFE',
      motif: 'The Sacred World Tree & Spore Canopies',
      color: 'text-emerald-400',
      primaryHex: '#10b981',
      secondaryHex: '#84cc16',
      effects: [
        { name: 'Spore Drift', tier: 'Tier 1 (Atmosphere)', desc: 'Bioluminescent emerald spores floating across ancient bark canopies.', soundType: 'spell' },
        { name: 'Sap Light', tier: 'Tier 2 (Ambient)', desc: 'Golden-green life essence glowing through translucent amber veins.', soundType: 'spell' },
        { name: 'Life Motes', tier: 'Tier 3 (Combat FX)', desc: 'Swirling restorative motes gathering around wounded allies.', soundType: 'shield' },
        { name: 'Vine Glow', tier: 'Tier 4 (Invocation)', desc: 'Thorny brambles erupting with emerald luminescence to ensnare foes.', soundType: 'spell' },
        { name: 'Pollen Aura', tier: 'Tier 5 (Apex Ultimate)', desc: 'A dense canopy haze providing warding shelter and accelerated regrowth.', soundType: 'shield' }
      ]
    },
    Abyss: {
      domainTitle: 'ABYSS',
      aspect: 'DEATH',
      motif: 'The Void Rift & Spectral Spire',
      color: 'text-purple-400',
      primaryHex: '#a855f7',
      secondaryHex: '#06b6d4',
      effects: [
        { name: 'Soul-Flare', tier: 'Tier 1 (Atmosphere)', desc: 'Violet soul flames flickering above fractured abyssal monuments.', soundType: 'spell' },
        { name: 'Void Distortion', tier: 'Tier 2 (Ambient)', desc: 'Gravitational light lensing around singularities and null-space gates.', soundType: 'spell' },
        { name: 'Shadow Leech', tier: 'Tier 3 (Combat FX)', desc: 'Tendrils of necrotic darkness siphoning life force directly into the void.', soundType: 'attack' },
        { name: 'Rift Tear', tier: 'Tier 4 (Invocation)', desc: 'Violent planar fissures tearing the fabric of reality with thunderous hums.', soundType: 'attack' },
        { name: 'Oblivion Wake', tier: 'Tier 5 (Apex Ultimate)', desc: 'A catastrophic null-wave that dissolves matter into primordial stardust.', soundType: 'slay' }
      ]
    },
    Tempest: {
      domainTitle: 'TEMPEST',
      aspect: 'MOTION',
      motif: 'The Storm Bastion & Lightning Arcs',
      color: 'text-cyan-400',
      primaryHex: '#06b6d4',
      secondaryHex: '#3b82f6',
      effects: [
        { name: 'Lightning Arc', tier: 'Tier 1 (Atmosphere)', desc: 'Branching electrical discharge leaping between brass conduits and spires.', soundType: 'attack' },
        { name: 'Charged Mist', tier: 'Tier 2 (Ambient)', desc: 'Ionized cobalt fog crackling with micro-static potentials.', soundType: 'spell' },
        { name: 'Storm Sparks', tier: 'Tier 3 (Combat FX)', desc: 'High-voltage kinetic sparks exploding on spell collisions.', soundType: 'attack' },
        { name: 'Ion Trail', tier: 'Tier 4 (Invocation)', desc: 'Blazing azure plasma trails left behind by swift aeromancer strikes.', soundType: 'attack' },
        { name: 'Thunderhead', tier: 'Tier 5 (Apex Ultimate)', desc: 'A colossal vortex of gale-force squalls and continuous chain lightning.', soundType: 'slay' }
      ]
    },
    Sanctuary: {
      domainTitle: 'SANCTUARY',
      aspect: 'UNITY',
      motif: 'The Aegis Cathedral & Ivory Wall',
      color: 'text-amber-200',
      primaryHex: '#fef08a',
      secondaryHex: '#d97706',
      effects: [
        { name: 'Aegis Radiance', tier: 'Tier 1 (Atmosphere)', desc: 'Prismatic golden halo emanating from towering cathedral keystones.', soundType: 'shield' },
        { name: 'Harmonic Light', tier: 'Tier 2 (Ambient)', desc: 'Resonant sacred frequencies that solidify light into impenetrable shields.', soundType: 'shield' },
        { name: 'Divine Motes', tier: 'Tier 3 (Combat FX)', desc: 'Gleaming ivory particles deflecting incoming damage with chime tones.', soundType: 'shield' },
        { name: 'Runic Aegis', tier: 'Tier 4 (Invocation)', desc: 'Intricate golden sacred geometry expanding across the battlefield floor.', soundType: 'shield' },
        { name: 'Sanctified Aura', tier: 'Tier 5 (Apex Ultimate)', desc: 'A transcendent divine dome granting absolute immunity and moral vigor.', soundType: 'shield' }
      ]
    }
  };

  // Particle Canvas for live Effect Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
    }> = [];

    const domainMeta = DOMAIN_EFFECT_MATRIX[selectedDomain];

    const createParticle = () => {
      const isUpward = selectedDomain === 'Radiance' || selectedDomain === 'Verdance';
      return {
        x: Math.random() * canvas.width,
        y: isUpward ? canvas.height : Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (selectedDomain === 'Tempest' ? 4 : 1.5),
        vy: isUpward ? -Math.random() * 2 - 0.5 : (Math.random() - 0.5) * 2,
        size: Math.random() * 3.5 + 1,
        life: 0,
        maxLife: Math.random() * 80 + 40,
        color: Math.random() > 0.4 ? domainMeta.primaryHex : domainMeta.secondaryHex
      };
    };

    for (let i = 0; i < 40; i++) {
      particles.push(createParticle());
    }

    const render = () => {
      animationRef.current = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Radial glow center
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.8
      );
      grad.addColorStop(0, `${domainMeta.primaryHex}20`);
      grad.addColorStop(1, '#00000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[idx] = createParticle();
        }
      });
      ctx.globalAlpha = 1.0;
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [selectedDomain, selectedEffectKey]);

  const handleTriggerEffectSound = (effect: { name: string; soundType: 'attack' | 'spell' | 'shield' | 'slay' }) => {
    setSelectedEffectKey(effect.name);
    soundEngine.playCombatClash(effect.soundType);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* ================= MASTER HEADER & LAYER NAVIGATION ================= */}
      <div className="relative rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-black border-2 border-amber-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Ambient Corner Runes */}
        <div className="absolute top-3 left-3 text-amber-500/20 text-xs font-mono select-none">
          ◆ NEXUS ARCHITECTURAL BLUEPRINT 6.0 ◆
        </div>
        <div className="absolute top-3 right-3 text-amber-500/20 text-xs font-mono select-none">
          ACCORD OF FIVE DOMAINS
        </div>

        <div className="text-center space-y-3 relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles size={13} className="text-amber-400 animate-pulse" />
            <span>Master Visual Architecture Suite</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wider">
            REALM OF NEXUS
          </h1>

          <p className="font-cinzel text-xs sm:text-sm text-stone-300 tracking-widest uppercase">
            Five Domains. One Realm. Infinite Possibilities.
          </p>

          <p className="text-stone-400 text-xs sm:text-sm max-w-2xl mx-auto font-sans leading-relaxed">
            The canonical visual system and architectural blueprint for the Realm of Nexus. Explore the 6 foundational layers from architectural frames and tactile UI surfaces to tactical battle zones and effect language.
          </p>
        </div>

        {/* Master Layer Switcher Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 relative z-10">
          {[
            { id: 'vision', label: 'Art Vision & Pillars', icon: Eye, layerNum: 'Master' },
            { id: 'layer1', label: 'Layer 1: Architectural Frame', icon: Layers, layerNum: 'L1' },
            { id: 'layer2', label: 'Layer 2: UI Surface', icon: Gem, layerNum: 'L2' },
            { id: 'layer3', label: 'Layer 3: Functional Zone', icon: Swords, layerNum: 'L3' },
            { id: 'layer4', label: 'Layer 4: Information Panel', icon: BookOpen, layerNum: 'L4' },
            { id: 'layer6', label: 'Layer 6: Effect Language', icon: Zap, layerNum: 'L6' }
          ].map((tab) => {
            const isActive = activeLayer === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playMicroSound('select');
                  setActiveLayer(tab.id as LayerId);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-cinzel font-bold flex items-center gap-2 border transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black border-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.5)] scale-105'
                    : 'bg-stone-900/90 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-amber-500/40'
                }`}
              >
                <span className={`text-[10px] font-mono px-1 rounded ${isActive ? 'bg-black/20 text-black font-bold' : 'bg-stone-800 text-amber-400'}`}>
                  {tab.layerNum}
                </span>
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= LAYER CONTENT SWITCHER ================= */}
      <AnimatePresence mode="wait">
        
        {/* ================= 1. MASTER ART VISION & 6 PILLARS ================= */}
        {activeLayer === 'vision' && (
          <motion.div
            key="vision"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* 6 Art Vision Pillars Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-amber-400" />
                  <h2 className="font-cinzel text-lg font-bold text-amber-200 tracking-wider">
                    Our Art Vision • The Six Foundational Pillars
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  Universal Design Accord
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ART_VISION_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.id}
                      className={`p-5 rounded-2xl bg-stone-950/90 border ${pillar.border} shadow-xl hover:border-amber-400 transition group flex flex-col justify-between`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl ${pillar.bg} flex items-center justify-center border border-stone-800 group-hover:scale-110 transition`}>
                            <Icon size={20} style={{ color: pillar.accent }} />
                          </div>
                          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                            Pillar
                          </span>
                        </div>

                        <div>
                          <h3 className="font-cinzel text-base font-bold text-stone-100 group-hover:text-amber-300 transition">
                            {pillar.title}
                          </h3>
                          <p className="text-[11px] font-mono text-amber-400/90 mt-0.5">
                            {pillar.tagline}
                          </p>
                        </div>

                        <p className="text-xs text-stone-400 leading-relaxed font-sans">
                          {pillar.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-900 mt-4 flex items-center justify-between text-[10px] font-mono text-stone-400">
                        <span>Fidelity Target</span>
                        <span className="text-emerald-400 font-bold">AAA AAA-Grade</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Central Grand Compass Pedestal Lore Box */}
            <div className="relative rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.3)]">
                  <Compass size={32} className="text-amber-300 animate-spin-slow" />
                </div>

                <h3 className="font-cinzel text-xl sm:text-2xl font-black text-amber-200 tracking-wider">
                  The Nexus • Core of All Realms
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed italic">
                  "The Realm of Nexus is a world of ancient civilizations bound by a single, eternal truth—the Nexus. Each domain discovered a different aspect of this boundless source of power and purpose. Together, they form a realm where magic, machinery, memory, and might converge in endless balance. From radiant kingdoms and verdant cycles to stormforged skies, shadowed abysses, and walls of light—each path offers a unique way to shape destiny."
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-cinzel font-bold text-amber-400">
                  <span>☀️ Radiance (Energy)</span>
                  <span>🌿 Verdance (Life)</span>
                  <span>💀 Abyss (Death)</span>
                  <span>⚡ Tempest (Motion)</span>
                  <span>🛡️ Sanctuary (Unity)</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= 2. LAYER 1: ARCHITECTURAL FRAME ================= */}
        {activeLayer === 'layer1' && (
          <motion.div
            key="layer1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-cinzel text-lg font-bold text-amber-200">
                  Layer 1 — Architectural Frame
                </h2>
                <p className="text-xs text-stone-400">
                  Gothic Colonnades, cathedral portals, and domain-specific structural motifs.
                </p>
              </div>
            </div>

            {/* 5 Domain Architectural Portals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                {
                  domain: 'Radiance' as ArchitectureDomain,
                  name: 'Radiance Colonnade',
                  style: 'Solar Titan Crucible',
                  motif: 'Phoenix Arch & Molten Spires',
                  border: 'border-amber-500/50',
                  color: 'text-amber-400',
                  bg: 'from-amber-950/40 to-stone-950'
                },
                {
                  domain: 'Verdance' as ArchitectureDomain,
                  name: 'Verdance Canopy',
                  style: 'Living Bough Cathedral',
                  motif: 'Sacred Root Archways & Spore Vines',
                  border: 'border-emerald-500/50',
                  color: 'text-emerald-400',
                  bg: 'from-emerald-950/40 to-stone-950'
                },
                {
                  domain: 'Abyss' as ArchitectureDomain,
                  name: 'Abyssal Void Spire',
                  style: 'Null-Space Citadel',
                  motif: 'Obsidian Pylons & Gravity Lenses',
                  border: 'border-purple-500/50',
                  color: 'text-purple-400',
                  bg: 'from-purple-950/40 to-stone-950'
                },
                {
                  domain: 'Tempest' as ArchitectureDomain,
                  name: 'Tempest Sky Bastion',
                  style: 'Storm-Forged Aeromastery',
                  motif: 'Brass Lightning Rods & Cloud Arches',
                  border: 'border-cyan-500/50',
                  color: 'text-cyan-400',
                  bg: 'from-cyan-950/40 to-stone-950'
                },
                {
                  domain: 'Sanctuary' as ArchitectureDomain,
                  name: 'Sanctuary Ivory Arch',
                  style: 'Aegis Divine Vault',
                  motif: 'Prismatic Filigree & Sacred Geometry',
                  border: 'border-yellow-200/50',
                  color: 'text-yellow-200',
                  bg: 'from-yellow-950/40 to-stone-950'
                }
              ].map((arch) => (
                <div
                  key={arch.domain}
                  className={`p-4 rounded-2xl bg-gradient-to-b ${arch.bg} border-2 ${arch.border} shadow-xl flex flex-col justify-between space-y-4 text-center`}
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-xl shadow-inner">
                      {arch.domain === 'Radiance' && '🔥'}
                      {arch.domain === 'Verdance' && '🌿'}
                      {arch.domain === 'Abyss' && '💀'}
                      {arch.domain === 'Tempest' && '⚡'}
                      {arch.domain === 'Sanctuary' && '☀️'}
                    </div>
                    <h3 className={`font-cinzel font-bold text-sm ${arch.color}`}>
                      {arch.name}
                    </h3>
                    <p className="text-[10px] font-mono text-stone-300">
                      {arch.style}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-stone-950/80 border border-stone-800 text-[10px] text-stone-400 font-sans">
                    {arch.motif}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Architectural Blueprint Specifications */}
            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 font-mono text-xs text-stone-300">
              <div className="flex items-center gap-2 text-amber-400 font-cinzel font-bold">
                <Boxes size={15} />
                <span>Architectural Frame Design Specifications</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-stone-400 text-[11px] leading-relaxed">
                <li><strong className="text-stone-200">Gothic Ribbed Vaulting:</strong> Symmetrical pointed arches with 3-tier keystone crowns conveying monumental historical weight.</li>
                <li><strong className="text-stone-200">Domain Conduit Sockets:</strong> Inlaid crystal sockets channel elemental power along vertical load-bearing columns.</li>
                <li><strong className="text-stone-200">Tactical Frame Margins:</strong> 16px structural negative space ensures 100% card play area readability under high-tempo competitive play.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* ================= 3. LAYER 2: UI SURFACE SYSTEM ================= */}
        {activeLayer === 'layer2' && (
          <motion.div
            key="layer2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-cinzel text-lg font-bold text-amber-200">
                Layer 2 — UI Surface Materials
              </h2>
              <p className="text-xs text-stone-400">
                Tactile materials like carved obsidian stone, gilded filigree metal, elemental crystals, and illuminated parchment.
              </p>
            </div>

            {/* Interactive Material Swatches */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Obsidian Slate Plate */}
              <div className="p-5 rounded-2xl bg-stone-950 border-2 border-stone-800 shadow-2xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="font-cinzel text-xs font-bold text-amber-300">Obsidian Slate Battle Slab</span>
                  <span className="text-[10px] font-mono text-stone-500">Material #01</span>
                </div>
                <div className="h-20 rounded-xl bg-gradient-to-br from-stone-900 via-stone-950 to-black border border-amber-500/30 p-3 flex items-center justify-center text-center">
                  <span className="font-cinzel text-xs text-stone-400 tracking-wider">
                    ◆ ENGRAVED RUNIC CHANNELS ◆
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans">
                  Deep basalt and polished obsidian textured with micro-grooves that illuminate when mana surges through the board.
                </p>
              </div>

              {/* Inlaid Crystal Sockets */}
              <div className="p-5 rounded-2xl bg-stone-950 border-2 border-stone-800 shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="font-cinzel text-xs font-bold text-cyan-300">Refractive Crystal Gems</span>
                  <span className="text-[10px] font-mono text-stone-500">Material #02</span>
                </div>
                <div className="h-20 rounded-xl bg-stone-900 border border-stone-700 p-2 flex items-center justify-around">
                  <span className="w-8 h-8 rounded-full bg-amber-500/30 border border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.5)] flex items-center justify-center text-xs">☀️</span>
                  <span className="w-8 h-8 rounded-full bg-emerald-500/30 border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)] flex items-center justify-center text-xs">🌿</span>
                  <span className="w-8 h-8 rounded-full bg-purple-500/30 border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)] flex items-center justify-center text-xs">💀</span>
                  <span className="w-8 h-8 rounded-full bg-cyan-500/30 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] flex items-center justify-center text-xs">⚡</span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans">
                  Cut-gemstone focal points with specular high-refraction shaders that serve as momentum counters and life pools.
                </p>
              </div>

              {/* Illuminated Ancient Parchment */}
              <div className="p-5 rounded-2xl bg-stone-950 border-2 border-stone-800 shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="font-cinzel text-xs font-bold text-yellow-500">Illuminated Codex Parchment</span>
                  <span className="text-[10px] font-mono text-stone-500">Material #03</span>
                </div>
                <div className="h-20 rounded-xl bg-amber-100 text-stone-900 border border-amber-300 p-3 flex flex-col justify-center text-center shadow-inner">
                  <span className="font-cinzel text-xs font-bold tracking-widest text-amber-950">
                    THE FIRST CONVERGENCE
                  </span>
                  <span className="text-[9px] font-mono text-amber-900 mt-0.5">
                    "Not by creation — but by Accord."
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans">
                  Warm aged vellum parchment with subtle compass watermarks and gold leaf typography for lore, cards, and accords.
                </p>
              </div>

            </div>
          </motion.div>
        )}

        {/* ================= 4. LAYER 3: FUNCTIONAL TACTICAL BATTLE MAT ================= */}
        {activeLayer === 'layer3' && (
          <motion.div
            key="layer3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-cinzel text-lg font-bold text-amber-200">
                  Layer 3 — Functional Zone (Tactical Sky-Bastion Arena)
                </h2>
                <p className="text-xs text-stone-400">
                  Card sockets, hazard slots, deck pedestals, momentum gauges, and life orbs.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => soundEngine.playCombatClash('shield')}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-mono"
                >
                  Reset HUD State
                </button>
              </div>
            </div>

            {/* Grand Interactive Battle Mat Component */}
            <div className="relative rounded-3xl bg-stone-950 border-2 border-amber-500/50 p-4 sm:p-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden">
              
              {/* Table Top Surface Texture */}
              <div className="absolute inset-0 bg-radial from-stone-900/60 to-black pointer-events-none" />

              {/* ================= OPPONENT ROW (TOP) ================= */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-red-950 border border-red-500 text-red-300 font-mono text-xs flex items-center justify-center font-bold">
                      {opponentLife}
                    </span>
                    <span className="font-cinzel text-xs font-bold text-stone-400">
                      Opponent Sovereign
                    </span>
                  </div>

                  {/* Top 7 Domain Mana Sockets */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <div
                        key={num}
                        className="w-5 h-5 rounded-full bg-stone-900 border border-purple-500/40 flex items-center justify-center text-[9px] font-mono text-purple-300"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opponent Sockets: Deck, 6 Lanes, Discard */}
                <div className="grid grid-cols-8 gap-2">
                  
                  {/* Opponent Left Hazard */}
                  <div className="p-2 rounded-xl bg-red-950/30 border border-red-800/60 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] font-mono text-red-400 uppercase font-bold">Hazard</span>
                    <span className="text-[9px] font-cinzel text-stone-400 mt-1">Ember Storm</span>
                  </div>

                  {/* Opponent 6 Battlefield Lanes */}
                  <div className="col-span-6 grid grid-cols-6 gap-1.5 p-2 rounded-2xl bg-stone-900/80 border border-stone-800">
                    {[1, 2, 3, 4, 5, 6].map((lane) => (
                      <div
                        key={lane}
                        className="h-20 rounded-xl border border-dashed border-amber-500/30 bg-stone-950/60 flex flex-col items-center justify-center hover:border-amber-400 transition"
                      >
                        <span className="text-[9px] font-mono text-stone-400">Lane {lane}</span>
                        <span className="text-[8px] font-cinzel text-amber-500/60 mt-1">Socket</span>
                      </div>
                    ))}
                  </div>

                  {/* Opponent Right Deck / Discard */}
                  <div className="p-2 rounded-xl bg-purple-950/30 border border-purple-800/60 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] font-mono text-purple-400 uppercase font-bold">Deck</span>
                    <span className="text-[10px] font-mono text-stone-400 mt-1">34</span>
                  </div>
                </div>
              </div>

              {/* ================= CENTER CONVERGENCE DIVIDER ================= */}
              <div className="my-6 relative flex items-center justify-center">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                <div className="relative z-10 px-4 py-1 rounded-full bg-stone-950 border border-amber-500/50 flex items-center gap-2 text-[10px] font-cinzel font-bold text-amber-300 uppercase tracking-widest shadow-lg">
                  <Compass size={12} className="text-amber-400 animate-spin-slow" />
                  <span>Battlefield Convergence Lanes</span>
                </div>
              </div>

              {/* ================= PLAYER ROW (BOTTOM) ================= */}
              <div className="relative z-10 space-y-3">
                {/* Player Sockets: Deck, 6 Lanes, Discard */}
                <div className="grid grid-cols-8 gap-2">
                  
                  {/* Player Left Hazard */}
                  <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-800/60 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] font-mono text-amber-400 uppercase font-bold">Hazard</span>
                    <span className="text-[9px] font-cinzel text-stone-400 mt-1">Gale Front</span>
                  </div>

                  {/* Player 6 Battlefield Lanes */}
                  <div className="col-span-6 grid grid-cols-6 gap-1.5 p-2 rounded-2xl bg-stone-900/80 border border-stone-800">
                    {[1, 2, 3, 4, 5, 6].map((lane) => (
                      <div
                        key={lane}
                        onClick={() => soundEngine.playMicroSound('cardFlip')}
                        className="h-24 rounded-xl border-2 border-cyan-500/40 bg-stone-950/80 flex flex-col items-center justify-center hover:border-cyan-300 hover:scale-105 transition cursor-pointer shadow-lg group"
                      >
                        <span className="text-[9px] font-mono text-cyan-400 group-hover:text-cyan-200">Lane {lane}</span>
                        <span className="text-[8px] font-cinzel text-stone-400 mt-1">Player Zone</span>
                      </div>
                    ))}
                  </div>

                  {/* Player Right Deck / Discard */}
                  <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-800/60 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] font-mono text-cyan-400 uppercase font-bold">Deck</span>
                    <span className="text-[10px] font-mono text-stone-400 mt-1">36</span>
                  </div>
                </div>

                {/* ================= BOTTOM HUD: LIFE & MOMENTUM TRACKER ================= */}
                <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  
                  {/* Player Life Gauge */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPlayerLife(prev => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-200 font-mono text-sm flex items-center justify-center font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    >
                      {playerLife}
                    </button>
                    <div>
                      <span className="font-cinzel text-xs font-bold text-stone-200 block">
                        Player Sovereign Life
                      </span>
                      <span className="text-[9px] font-mono text-cyan-400">
                        20 Max • Accord Guard Active
                      </span>
                    </div>
                  </div>

                  {/* Central Momentum Energy Gauge Track */}
                  <div className="flex-1 max-w-md px-4 py-2 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col items-center space-y-1">
                    <div className="flex items-center justify-between w-full text-[10px] font-mono">
                      <span className="text-stone-400">MOMENTUM GAUGE</span>
                      <span className="text-amber-300 font-bold">{interactiveMomentum} / 10 Mana</span>
                    </div>
                    <div className="flex items-center justify-between w-full gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pip) => {
                        const isFilled = pip <= interactiveMomentum;
                        return (
                          <button
                            key={pip}
                            onClick={() => {
                              soundEngine.playMicroSound('select');
                              setInteractiveMomentum(pip);
                            }}
                            className={`flex-1 h-3 rounded-sm transition ${
                              isFilled
                                ? 'bg-gradient-to-t from-cyan-600 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                                : 'bg-stone-800 hover:bg-stone-700'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* 7 Domain Mana Sockets */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <div
                        key={num}
                        className="w-5 h-5 rounded-full bg-stone-900 border border-amber-500/40 flex items-center justify-center text-[9px] font-mono text-amber-300"
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ================= 5. LAYER 4: INFORMATION PANEL SUITE ================= */}
        {activeLayer === 'layer4' && (
          <motion.div
            key="layer4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-cinzel text-lg font-bold text-amber-200">
                Layer 4 — Information Panel & UI Containers
              </h2>
              <p className="text-xs text-stone-400">
                Readable UI containers for data, lore texts, item shards, ability cards, and faction standing.
              </p>
            </div>

            {/* 14 Integrated Modular Information Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* 1. Codex Entry */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-cinzel font-bold text-xs border-b border-stone-800 pb-2">
                  <BookOpen size={13} />
                  <span>Codex Entry • The Nexus</span>
                </div>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  The convergence point of five eternal domains. It binds realities together through balance, energy, and ancient purpose.
                </p>
                <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-stone-400">
                  <div className="p-1 rounded bg-stone-900">✦ Balance: Perfect</div>
                  <div className="p-1 rounded bg-stone-900">✦ Connection: Unified</div>
                  <div className="p-1 rounded bg-stone-900">✦ Infinity: Boundless</div>
                  <div className="p-1 rounded bg-stone-900">✦ Potential: Primordial</div>
                </div>
              </div>

              {/* 2. Item Card (Veridian Crystal) */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-500/40 space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="font-cinzel text-xs font-bold text-emerald-300">Veridian Crystal</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Rare Catalyst
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-stone-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500 flex items-center justify-center text-lg">
                    🌿
                  </div>
                  <div>
                    <span className="text-[11px] font-cinzel font-bold text-stone-200 block">Life-Infused Shard</span>
                    <span className="text-[9px] font-mono text-stone-400">Affinity: Verdance</span>
                  </div>
                </div>
                <p className="text-[10px] font-sans text-stone-400">
                  Pulsing with the essence of eternal growth. Used for card infusion and realm stabilization.
                </p>
              </div>

              {/* 3. Ability Card (Storm Call) */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-cyan-500/40 space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="font-cinzel text-xs font-bold text-cyan-300">Storm Call</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Active Ability
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-stone-900 flex items-center justify-between text-[10px] font-mono text-stone-300">
                  <span>Cost: 35 Energy</span>
                  <span>Cooldown: 60s</span>
                </div>
                <p className="text-[10px] font-sans text-stone-400">
                  Summon a storm front, dealing AoE damage and disrupting all opposing channelers across adjacent lanes.
                </p>
              </div>

              {/* 4. Resource Tray */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="font-cinzel text-xs font-bold text-amber-300">Resource Tray</span>
                  <span className="text-[9px] font-mono text-stone-500">Live Ledger</span>
                </div>
                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between p-1 rounded bg-stone-900 text-amber-300">
                    <span>✦ Nexus Energy</span>
                    <span>{activeResource.energy.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-1 rounded bg-stone-900 text-emerald-300">
                    <span>✦ Veridian Crystal</span>
                    <span>{activeResource.veridian.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-1 rounded bg-stone-900 text-yellow-200">
                    <span>✦ Aegis Stone</span>
                    <span>{activeResource.aegis.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-1 rounded bg-stone-900 text-purple-300">
                    <span>✦ Soulshard</span>
                    <span>{activeResource.soulshard.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-1 rounded bg-stone-900 text-cyan-300">
                    <span>✦ Cloudstone</span>
                    <span>{activeResource.cloudstone.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* 5. Faction Standing */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="font-cinzel text-xs font-bold text-amber-300">Faction Standing</span>
                  <span className="text-[9px] font-mono text-stone-500">Accord Index</span>
                </div>
                <div className="space-y-2 text-[10px] font-mono">
                  <div>
                    <div className="flex justify-between text-amber-300">
                      <span>Radiance</span>
                      <span>Honored</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-900 mt-1 overflow-hidden">
                      <div className="h-full bg-amber-500 w-4/5" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-emerald-300">
                      <span>Verdance</span>
                      <span>Revered</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-900 mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500 w-11/12" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-purple-300">
                      <span>Abyss</span>
                      <span>Cautious</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-900 mt-1 overflow-hidden">
                      <div className="h-full bg-purple-500 w-2/5" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-cyan-300">
                      <span>Tempest</span>
                      <span>Allied</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-900 mt-1 overflow-hidden">
                      <div className="h-full bg-cyan-500 w-3/4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-yellow-200">
                      <span>Sanctuary</span>
                      <span>Devoted</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-900 mt-1 overflow-hidden">
                      <div className="h-full bg-yellow-300 w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Active Objectives & Notifications */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="font-cinzel text-xs font-bold text-amber-300">Objectives & Alerts</span>
                  <span className="text-[9px] font-mono text-emerald-400">Active</span>
                </div>
                <div className="space-y-2 text-[11px] font-sans">
                  <div className="flex items-start gap-2 text-stone-300">
                    <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>Stabilize the Realm Fractures</span>
                  </div>
                  <div className="flex items-start gap-2 text-stone-300">
                    <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>Guard the Five Spires</span>
                  </div>
                  <div className="flex items-start gap-2 text-stone-300">
                    <CheckCircle2 size={13} className="text-amber-400 mt-0.5 shrink-0" />
                    <span>Uncover Lost Knowledge of the Accord</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-stone-900 text-[10px] font-mono text-red-400 flex items-center gap-1.5">
                  <ShieldAlert size={12} />
                  <span>Storm Surge detected in Tempest</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ================= 6. LAYER 6: EFFECT LANGUAGE MATRIX ================= */}
        {activeLayer === 'layer6' && (
          <motion.div
            key="layer6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-cinzel text-lg font-bold text-amber-200">
                  Layer 6 — Effect Language Matrix
                </h2>
                <p className="text-xs text-stone-400">
                  Magic, energy, sparks, light, and atmosphere categorized across the five domains.
                </p>
              </div>

              {/* Domain Switcher */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['Radiance', 'Verdance', 'Abyss', 'Tempest', 'Sanctuary'] as ArchitectureDomain[]).map((dom) => (
                  <button
                    key={dom}
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      setSelectedDomain(dom);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-cinzel font-bold border transition ${
                      selectedDomain === dom
                        ? 'bg-amber-500 text-black border-amber-300 shadow-md'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Effect Simulation Canvas & Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Particle Shader Canvas */}
              <div className="lg:col-span-5 rounded-3xl bg-black border-2 border-amber-500/40 p-4 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl min-h-[340px]">
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={260}
                  className="w-full h-56 rounded-2xl bg-stone-950 block"
                />
                <div className="w-full pt-3 border-t border-stone-900 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Active FX Tier:</span>
                  <span className="text-amber-300 font-bold">{selectedEffectKey}</span>
                </div>
              </div>

              {/* Right: 5-Tier Effect List */}
              <div className="lg:col-span-7 space-y-2.5">
                {DOMAIN_EFFECT_MATRIX[selectedDomain].effects.map((fx) => {
                  const isSelected = selectedEffectKey === fx.name;
                  return (
                    <div
                      key={fx.name}
                      onClick={() => handleTriggerEffectSound(fx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 shadow-lg scale-[1.02]'
                          : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-cinzel text-sm font-bold text-stone-100">
                            {fx.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-amber-400 border border-stone-800">
                            {fx.tier}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 font-sans">
                          {fx.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pl-3">
                        <span className="text-[10px] font-mono text-stone-500 uppercase">
                          {fx.soundType}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center text-amber-300 hover:scale-110 transition">
                          <Play size={12} className="fill-amber-300" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
