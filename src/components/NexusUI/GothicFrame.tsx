import React from 'react';
import { Domain } from '../../types';

interface GothicCardFrameProps {
  children: React.ReactNode;
  domain?: Domain | 'Nexus';
  className?: string;
  glow?: boolean;
}

export const GothicCardFrame: React.FC<GothicCardFrameProps> = ({
  children,
  domain = 'Nexus',
  className = '',
  glow = true
}) => {
  const getDomainStyles = () => {
    switch (domain) {
      case 'Sanctuary':
        return {
          border: 'border-amber-400/50',
          corner: 'text-amber-300',
          shadow: glow ? 'shadow-[0_0_20px_rgba(234,179,8,0.2)]' : ''
        };
      case 'Arcane':
        return {
          border: 'border-blue-400/50',
          corner: 'text-blue-300',
          shadow: glow ? 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' : ''
        };
      case 'Radiance':
        return {
          border: 'border-orange-500/50',
          corner: 'text-orange-400',
          shadow: glow ? 'shadow-[0_0_20px_rgba(249,115,22,0.2)]' : ''
        };
      case 'Abyss':
        return {
          border: 'border-cyan-500/50',
          corner: 'text-cyan-300',
          shadow: glow ? 'shadow-[0_0_20px_rgba(6,182,212,0.2)]' : ''
        };
      case 'Verdance':
        return {
          border: 'border-emerald-500/50',
          corner: 'text-emerald-300',
          shadow: glow ? 'shadow-[0_0_20px_rgba(16,185,129,0.2)]' : ''
        };
      case 'Nexus':
      default:
        return {
          border: 'border-amber-500/40',
          corner: 'text-amber-400',
          shadow: glow ? 'shadow-[0_0_20px_rgba(245,158,11,0.2)]' : ''
        };
    }
  };

  const styles = getDomainStyles();

  return (
    <div className={`relative rounded-3xl bg-stone-950/80 border ${styles.border} ${styles.shadow} backdrop-blur-md p-4 sm:p-6 ${className}`}>
      
      {/* Top-Left Filigree Corner */}
      <svg className={`absolute top-2 left-2 w-5 h-5 ${styles.corner} pointer-events-none opacity-80`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 2 12 L 2 2 L 12 2" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      </svg>

      {/* Top-Right Filigree Corner */}
      <svg className={`absolute top-2 right-2 w-5 h-5 ${styles.corner} pointer-events-none opacity-80`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 22 12 L 22 2 L 12 2" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
      </svg>

      {/* Bottom-Left Filigree Corner */}
      <svg className={`absolute bottom-2 left-2 w-5 h-5 ${styles.corner} pointer-events-none opacity-80`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 2 12 L 2 22 L 12 22" />
        <circle cx="6" cy="18" r="1.5" fill="currentColor" />
      </svg>

      {/* Bottom-Right Filigree Corner */}
      <svg className={`absolute bottom-2 right-2 w-5 h-5 ${styles.corner} pointer-events-none opacity-80`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 22 12 L 22 22 L 12 22" />
        <circle cx="18" cy="18" r="1.5" fill="currentColor" />
      </svg>

      {children}
    </div>
  );
};

export const RunicDivider: React.FC<{ domain?: Domain | 'Nexus'; className?: string }> = ({
  domain = 'Nexus',
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-3 my-4 opacity-60 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500" />
      <div className="w-2 h-2 rotate-45 border border-amber-400 bg-amber-500/20" />
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
      <div className="w-2 h-2 rotate-45 border border-amber-400 bg-amber-500/20" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500" />
    </div>
  );
};
