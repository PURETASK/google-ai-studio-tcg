import React, { useEffect, useRef, useState } from 'react';
import { REALM_ART_THEMES, RealmArtTheme } from '../../data/nexusArtTheme';

interface RealmBackgroundSuiteProps {
  realmId: string;
  enableParticles?: boolean;
  particleDensity?: 'low' | 'medium' | 'high';
  enableParallax?: boolean;
  opacity?: number;
  className?: string;
}

export const RealmBackgroundSuite: React.FC<RealmBackgroundSuiteProps> = ({
  realmId,
  enableParticles = true,
  particleDensity = 'medium',
  enableParallax = true,
  opacity = 1,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const theme: RealmArtTheme = REALM_ART_THEMES[realmId] || REALM_ART_THEMES.Nexus;

  // Track gentle mouse movement for subtle parallax
  useEffect(() => {
    if (!enableParallax) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 20;
      targetY = ((e.clientY / innerHeight) - 0.5) * 15;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMouseOffset({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enableParallax]);

  // Particle Simulation Engine
  useEffect(() => {
    if (!enableParticles) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const countMultiplier = particleDensity === 'low' ? 30 : particleDensity === 'high' ? 90 : 55;
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
      life: number;
      maxLife: number;
      pulseRate: number;
      sinOffset: number;
    }

    const particles: Particle[] = [];

    const getParticleConfig = (ptype: RealmArtTheme['atmosphereParticles']) => {
      switch (ptype) {
        case 'celestial':
          return {
            color: () => (Math.random() > 0.4 ? '#fef08a' : '#60a5fa'),
            speedY: () => -(Math.random() * 0.6 + 0.2),
            speedX: () => (Math.random() - 0.5) * 0.4,
            size: () => Math.random() * 2.8 + 1.2
          };
        case 'lightning':
          return {
            color: () => (Math.random() > 0.3 ? '#67e8f9' : '#93c5fd'),
            speedY: () => Math.random() * 1.2 + 0.3,
            speedX: () => (Math.random() - 0.5) * 1.5,
            size: () => Math.random() * 3 + 1
          };
        case 'embers':
          return {
            color: () => (Math.random() > 0.5 ? '#f97316' : '#facc15'),
            speedY: () => -(Math.random() * 1.4 + 0.5),
            speedX: () => (Math.random() - 0.5) * 0.8,
            size: () => Math.random() * 3.2 + 1
          };
        case 'spectral':
          return {
            color: () => (Math.random() > 0.4 ? '#22d3ee' : '#a5b4fc'),
            speedY: () => -(Math.random() * 0.5 + 0.2),
            speedX: () => (Math.random() - 0.5) * 0.6,
            size: () => Math.random() * 3.5 + 1.5
          };
        case 'emerald':
          return {
            color: () => (Math.random() > 0.4 ? '#34d399' : '#a3e635'),
            speedY: () => -(Math.random() * 0.7 + 0.2),
            speedX: () => (Math.random() - 0.5) * 0.7,
            size: () => Math.random() * 3 + 1
          };
        case 'stardust':
        default:
          return {
            color: () => (Math.random() > 0.5 ? '#fbbf24' : '#38bdf8'),
            speedY: () => (Math.random() - 0.5) * 0.4,
            speedX: () => (Math.random() - 0.5) * 0.4,
            size: () => Math.random() * 2.5 + 0.8
          };
      }
    };

    const cfg = getParticleConfig(theme.atmosphereParticles);

    for (let i = 0; i < countMultiplier; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: cfg.size(),
        speedX: cfg.speedX(),
        speedY: cfg.speedY(),
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: cfg.color(),
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 200,
        pulseRate: Math.random() * 0.05 + 0.02,
        sinOffset: Math.random() * Math.PI * 2
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Render domain atmospheric lighting flare at center
      const grad = ctx.createRadialGradient(
        width / 2 + mouseOffset.x * 2,
        height * 0.4 + mouseOffset.y * 2,
        50,
        width / 2,
        height * 0.4,
        width * 0.6
      );
      grad.addColorStop(0, theme.accentGlow);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render individual particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.sinOffset += 0.02;

        p.x += p.speedX + Math.sin(p.sinOffset) * 0.3;
        p.y += p.speedY;

        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.85 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.9, p.opacity));
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [realmId, enableParticles, particleDensity, theme, mouseOffset]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      style={{ opacity }}
    >
      {/* Background Gradient Mesh */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient} transition-colors duration-700`}
      />

      {/* Domain Vector Matte Painting Scenery Layer */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`
        }}
      >
        {renderRealmVectorMatte(theme.id)}
      </div>

      {/* Dynamic Weather & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      />

      {/* Cinematic Vignette & Content Readability Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,5,8,0.85)_80%,rgba(2,2,4,0.98)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />
    </div>
  );
};

// Render high-fidelity domain vector landscape silhouettes and celestial architecture
function renderRealmVectorMatte(realmId: string) {
  switch (realmId) {
    case 'Sanctuary':
      return (
        <svg className="w-full h-full object-cover opacity-35" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sancGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#854d0e" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="sunBeam" cx="50%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Celestial Sunbeam Cone */}
          <polygon points="960,0 300,1080 1620,1080" fill="url(#sunBeam)" />
          {/* Floating Astral Ring */}
          <circle cx="960" cy="220" r="160" stroke="#fef08a" strokeWidth="2" strokeDasharray="8 6" opacity="0.4" />
          <circle cx="960" cy="220" r="190" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
          {/* Soaring Cathedral Spires & Buttresses */}
          <path d="M 960 120 L 980 340 L 1020 500 L 1100 700 L 1250 1080 L 670 1080 L 820 700 L 900 500 L 940 340 Z" fill="url(#sancGold)" opacity="0.3" />
          {/* Left Wing Spires */}
          <path d="M 450 300 L 470 500 L 530 750 L 650 1080 L 250 1080 L 370 750 L 430 500 Z" fill="#ca8a04" opacity="0.25" />
          {/* Right Wing Spires */}
          <path d="M 1470 300 L 1490 500 L 1550 750 L 1670 1080 L 1270 1080 L 1390 750 L 1450 500 Z" fill="#ca8a04" opacity="0.25" />
          {/* Rose Window Stained Glass Emblem */}
          <circle cx="960" cy="380" r="55" fill="#1e3a8a" stroke="#fef08a" strokeWidth="3" opacity="0.6" />
          <circle cx="960" cy="380" r="30" fill="#38bdf8" opacity="0.5" />
          {/* Paladin Shield & Bell Tower Emblems */}
          <path d="M 960 360 L 975 385 L 960 410 L 945 385 Z" fill="#ffffff" />
        </svg>
      );

    case 'Tempest':
      return (
        <svg className="w-full h-full object-cover opacity-35" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="stormBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1e40af" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Atmospheric Lightning Bolts */}
          <path d="M 850 0 L 880 220 L 840 250 L 890 450 L 860 470 L 920 680" stroke="#38bdf8" strokeWidth="2.5" opacity="0.6" filter="drop-shadow(0 0 8px #38bdf8)" />
          <path d="M 1350 40 L 1330 200 L 1360 230 L 1320 420" stroke="#93c5fd" strokeWidth="1.5" opacity="0.4" />
          {/* Floating Sky Citadel Platforms */}
          <path d="M 960 280 L 1120 400 L 1200 650 L 1250 820 L 670 820 L 720 650 L 800 400 Z" fill="url(#stormBlue)" opacity="0.3" />
          {/* Floating Airship Silhouettes with Solar Sails */}
          <path d="M 400 350 Q 520 330 640 370 Q 520 410 400 350 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />
          <path d="M 520 280 L 520 350 M 520 280 L 600 340 L 520 345" stroke="#93c5fd" strokeWidth="1.5" opacity="0.5" fill="#38bdf8" fillOpacity="0.2" />
          <path d="M 1450 420 Q 1550 400 1650 440 Q 1550 480 1450 420 Z" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" opacity="0.5" />
          {/* Levitating Obsidian Spires */}
          <polygon points="960,180 975,320 945,320" fill="#67e8f9" opacity="0.7" />
        </svg>
      );

    case 'Radiance':
      return (
        <svg className="w-full h-full object-cover opacity-35" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="lavaFall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f97316" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="ironForge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#44403c" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
          </defs>
          {/* Central Molten Magma Falls */}
          <path d="M 945 250 L 975 250 L 985 850 L 935 850 Z" fill="url(#lavaFall)" opacity="0.7" />
          {/* Massive Forge Iron Bastion Spires */}
          <polygon points="960,150 1040,450 1150,750 1350,1080 570,1080 770,750 880,450" fill="url(#ironForge)" opacity="0.4" stroke="#f97316" strokeWidth="1" />
          {/* Giant Forge Wheels & Cranes */}
          <circle cx="960" cy="320" r="80" stroke="#f97316" strokeWidth="3" strokeDasharray="12 8" opacity="0.5" />
          <circle cx="960" cy="320" r="40" stroke="#eab308" strokeWidth="2" opacity="0.6" />
          {/* Flanking Magma Caldera Bastions */}
          <polygon points="350,400 480,700 580,1080 150,1080" fill="#292524" opacity="0.5" />
          <polygon points="1570,400 1440,700 1340,1080 1770,1080" fill="#292524" opacity="0.5" />
          {/* Glowing Rune Core */}
          <polygon points="960,290 980,320 960,350 940,320" fill="#ffedd5" />
        </svg>
      );

    case 'Abyss':
      return (
        <svg className="w-full h-full object-cover opacity-35" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="soulGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0891b2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Giant Soul Beacon Well */}
          <circle cx="960" cy="260" r="110" stroke="#06b6d4" strokeWidth="2" strokeDasharray="10 6" opacity="0.5" />
          <circle cx="960" cy="260" r="60" fill="#0891b2" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="2" />
          {/* Dark Gothic Bone Spires */}
          <path d="M 960 100 L 980 320 L 1050 600 L 1200 950 L 1350 1080 L 570 1080 L 720 950 L 870 600 L 940 320 Z" fill="#030712" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
          {/* Left Skeletal Towers */}
          <path d="M 400 250 L 420 500 L 480 800 L 250 1080 L 150 1080 L 320 500 Z" fill="#030712" stroke="#0891b2" strokeWidth="1" opacity="0.5" />
          {/* Right Skeletal Towers */}
          <path d="M 1520 250 L 1500 500 L 1440 800 L 1670 1080 L 1770 1080 L 1600 500 Z" fill="#030712" stroke="#0891b2" strokeWidth="1" opacity="0.5" />
          {/* Crown of the Lich King */}
          <polygon points="960,220 970,240 985,225 980,255 940,255 935,225 950,240" fill="#a5f3fc" opacity="0.8" />
        </svg>
      );

    case 'Verdance':
      return (
        <svg className="w-full h-full object-cover opacity-35" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="canopyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#059669" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Colossal World Tree Arch & Canopy */}
          <path d="M 960 180 Q 750 300 600 650 Q 500 900 400 1080 L 1520 1080 Q 1420 900 1320 650 Q 1170 300 960 180 Z" fill="url(#canopyGreen)" opacity="0.4" />
          {/* Emerald Crystal Archways */}
          <path d="M 960 300 Q 860 450 820 700 L 1100 700 Q 1060 450 960 300 Z" fill="#065f46" stroke="#34d399" strokeWidth="2" opacity="0.5" />
          {/* Giant Tree Trunk & Living Roots */}
          <path d="M 920 400 L 910 1080 M 1000 400 L 1010 1080" stroke="#10b981" strokeWidth="3" opacity="0.3" />
          {/* Spirit Stag Antler Sigil */}
          <circle cx="960" cy="380" r="50" fill="#064e3b" stroke="#a7f3d0" strokeWidth="2" opacity="0.7" />
          <path d="M 960 360 L 960 400 M 940 375 L 980 375 M 930 355 L 950 375 M 990 355 L 970 375" stroke="#ecfdf5" strokeWidth="2" />
        </svg>
      );

    case 'Nexus':
    default:
      return (
        <svg className="w-full h-full object-cover opacity-40" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="nexusGate" cx="50%" cy="45%" r="40%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="35%" stopColor="#eab308" stopOpacity="0.4" />
              <stop offset="80%" stopColor="#312e81" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Grand Convergence Core Glow */}
          <circle cx="960" cy="480" r="320" fill="url(#nexusGate)" />
          {/* Concentric Celestial Astrolabe Rings */}
          <circle cx="960" cy="480" r="220" stroke="#f59e0b" strokeWidth="2" strokeDasharray="14 10" opacity="0.6" />
          <circle cx="960" cy="480" r="160" stroke="#38bdf8" strokeWidth="2" opacity="0.5" />
          <circle cx="960" cy="480" r="100" stroke="#e0e7ff" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
          {/* Central Celestial Spire */}
          <polygon points="960,160 980,440 1020,520 960,600 900,520 940,440" fill="#ffffff" opacity="0.6" filter="drop-shadow(0 0 12px #38bdf8)" />
          {/* 5 Runic Bridges Radiating to the 5 Domains */}
          {/* Top-Left: Radiance (Molten Forge) */}
          <line x1="960" y1="480" x2="350" y2="180" stroke="#f97316" strokeWidth="4" strokeDasharray="8 6" opacity="0.5" />
          {/* Top-Right: Tempest (Sky Citadel) */}
          <line x1="960" y1="480" x2="1570" y2="180" stroke="#3b82f6" strokeWidth="4" strokeDasharray="8 6" opacity="0.5" />
          {/* Bottom-Left: Verdance (World Tree) */}
          <line x1="960" y1="480" x2="300" y2="850" stroke="#10b981" strokeWidth="4" strokeDasharray="8 6" opacity="0.5" />
          {/* Bottom-Right: Sanctuary (Ivory Cathedral) */}
          <line x1="960" y1="480" x2="1620" y2="850" stroke="#eab308" strokeWidth="4" strokeDasharray="8 6" opacity="0.5" />
          {/* Direct South: Abyss (Gothic Necropolis) */}
          <line x1="960" y1="480" x2="960" y2="1000" stroke="#06b6d4" strokeWidth="4" strokeDasharray="8 6" opacity="0.5" />
        </svg>
      );
  }
}
