import React, { useEffect, useRef } from 'react';
import { Rarity, Domain } from '../types';

export interface ParticleCanvasOverlayProps {
  rarity?: Rarity;
  domain?: Domain;
  effectType?: 'sparks' | 'glimmers' | 'cosmic' | 'flame' | 'radiant' | 'auto';
  intensity?: 'low' | 'medium' | 'high' | 'ultra';
  className?: string;
  triggerBurst?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  color: string;
  glowColor: string;
  rotation: number;
  rotSpeed: number;
  shape: 'circle' | 'spark' | 'star' | 'diamond';
  gravity: number;
}

export const ParticleCanvasOverlay: React.FC<ParticleCanvasOverlayProps> = ({
  rarity = 'Rare',
  domain = 'Sanctuary',
  effectType = 'auto',
  intensity = 'medium',
  className = '',
  triggerBurst = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Determine colors based on rarity & domain
  const getParticlePalette = () => {
    if (rarity === 'Divine Boundless') {
      return {
        colors: ['#38bdf8', '#c084fc', '#facc15', '#f43f5e', '#ffffff'],
        glow: '#38bdf8',
        defaultShape: 'star' as const
      };
    }
    if (rarity === 'Mythic') {
      return {
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#fbbf24', '#ffffff'],
        glow: '#f43f5e',
        defaultShape: 'spark' as const
      };
    }
    if (rarity === 'Legendary') {
      return {
        colors: ['#f59e0b', '#fbbf24', '#fef08a', '#d97706', '#ffffff'],
        glow: '#f59e0b',
        defaultShape: 'diamond' as const
      };
    }
    if (rarity === 'Very Rare') {
      return {
        colors: ['#a855f7', '#c084fc', '#e9d5ff', '#818cf8', '#ffffff'],
        glow: '#a855f7',
        defaultShape: 'diamond' as const
      };
    }
    // Rare or domain fallback
    switch (domain) {
      case 'Radiance':
        return {
          colors: ['#ef4444', '#f97316', '#fbbf24', '#dc2626', '#ffffff'],
          glow: '#ef4444',
          defaultShape: 'spark' as const
        };
      case 'Sanctuary':
        return {
          colors: ['#eab308', '#facc15', '#fef08a', '#ca8a04', '#ffffff'],
          glow: '#eab308',
          defaultShape: 'diamond' as const
        };
      case 'Verdance':
        return {
          colors: ['#10b981', '#34d399', '#6ee7b7', '#059669', '#ffffff'],
          glow: '#10b981',
          defaultShape: 'circle' as const
        };
      case 'Arcane':
        return {
          colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#2563eb', '#ffffff'],
          glow: '#3b82f6',
          defaultShape: 'spark' as const
        };
      case 'Abyss':
        return {
          colors: ['#a855f7', '#9333ea', '#c084fc', '#581c87', '#ffffff'],
          glow: '#a855f7',
          defaultShape: 'star' as const
        };
      default:
        return {
          colors: ['#38bdf8', '#818cf8', '#e0e7ff', '#ffffff'],
          glow: '#38bdf8',
          defaultShape: 'spark' as const
        };
    }
  };

  const palette = getParticlePalette();

  const spawnParticle = (w: number, h: number, isBurst: boolean = false): Particle => {
    const pal = getParticlePalette();
    const color = pal.colors[Math.floor(Math.random() * pal.colors.length)];
    const shapes: ('circle' | 'spark' | 'star' | 'diamond')[] = ['circle', 'spark', 'star', 'diamond'];
    const shape = isBurst ? (Math.random() > 0.4 ? pal.defaultShape : shapes[Math.floor(Math.random() * shapes.length)]) : pal.defaultShape;

    if (isBurst) {
      // Explode outwards from center
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      return {
        x: w / 2 + (Math.random() - 0.5) * 40,
        y: h / 2 + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 2 + Math.random() * 5,
        alpha: 1,
        maxAlpha: 1,
        decay: 0.012 + Math.random() * 0.02,
        color,
        glowColor: pal.glow,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        shape,
        gravity: 0.08
      };
    }

    // Ambient floating particle
    return {
      x: Math.random() * w,
      y: h + 10,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(0.8 + Math.random() * 2.2),
      size: 1.5 + Math.random() * 3.5,
      alpha: 0.1,
      maxAlpha: 0.6 + Math.random() * 0.4,
      decay: 0.005 + Math.random() * 0.01,
      color,
      glowColor: pal.glow,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      shape,
      gravity: -0.01
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initial population
    const maxParticles = intensity === 'ultra' ? 80 : intensity === 'high' ? 55 : intensity === 'medium' ? 35 : 18;
    particlesRef.current = [];

    // Pre-populate with ambient particles
    for (let i = 0; i < maxParticles; i++) {
      const p = spawnParticle(width, height, false);
      p.y = Math.random() * height; // distribute initially
      p.alpha = Math.random() * p.maxAlpha;
      particlesRef.current.push(p);
    }

    // If triggerBurst or high rarity, add explosion
    if (triggerBurst || rarity === 'Mythic' || rarity === 'Divine Boundless') {
      const burstCount = rarity === 'Divine Boundless' ? 70 : rarity === 'Mythic' ? 50 : 30;
      for (let i = 0; i < burstCount; i++) {
        particlesRef.current.push(spawnParticle(width, height, true));
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn new ambient particles
      if (particlesRef.current.length < maxParticles && Math.random() < 0.4) {
        particlesRef.current.push(spawnParticle(width, height, false));
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 30) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.size * 2.5;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size * 1.5);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'star') {
          // 4-point star / cross glint
          ctx.beginPath();
          const s = p.size * 1.8;
          const inner = p.size * 0.4;
          for (let sp = 0; sp < 4; sp++) {
            const rot = (sp * Math.PI) / 2;
            ctx.lineTo(Math.cos(rot) * s, Math.sin(rot) * s);
            ctx.lineTo(Math.cos(rot + Math.PI / 4) * inner, Math.sin(rot + Math.PI / 4) * inner);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Spark glint
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.6, 0);
          ctx.lineTo(p.size * 1.6, 0);
          ctx.moveTo(0, -p.size * 1.6);
          ctx.lineTo(0, p.size * 1.6);
          ctx.lineWidth = Math.max(1, p.size * 0.5);
          ctx.strokeStyle = p.color;
          ctx.stroke();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [rarity, domain, intensity, triggerBurst]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-20 w-full h-full ${className}`}
    />
  );
};
