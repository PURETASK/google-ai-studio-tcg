import React, { useState, useRef } from 'react';
import { Card, PowerGlyph, AbilityProperty } from '../types';
import { CardVisualArt } from './CardVisualArt';
import { CardDomainBorder } from './CardDomainBorder';
import { CardDomainStatBadge } from './CardDomainStatBadge';
import { AbilityIcon } from './AbilityIcon';
import { UNIVERSAL_POWER_GLYPHS } from '../data/powerGlyphsData';
import { 
  Sparkles, 
  Shield, 
  Sword, 
  Zap, 
  Eye, 
  Star, 
  Info, 
  Compass, 
  Layers, 
  Flame, 
  Crown,
  Activity,
  ChevronRight
} from 'lucide-react';

interface CardItemProps {
  card: Card;
  onClick?: () => void;
  onInspect?: (card: Card) => void;
  size?: 'sm' | 'md' | 'lg' | 'hand' | 'full';
  foilType?: 'none' | 'gold' | 'prismatic' | 'cosmic';
  interactive?: boolean;
  selected?: boolean;
  playable?: boolean;
  disabled?: boolean;
  showInspectButton?: boolean;
  showCodexQuickView?: boolean;
}

export const CardItem: React.FC<CardItemProps> = ({
  card,
  onClick,
  onInspect,
  size = 'md',
  foilType = 'prismatic',
  interactive = true,
  selected = false,
  playable = true,
  disabled = false,
  showInspectButton = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [hoveredGlyph, setHoveredGlyph] = useState<PowerGlyph | null>(null);
  const [hoveredAbility, setHoveredAbility] = useState<AbilityProperty | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
    setHoveredAbility(null);
    setHoveredGlyph(null);
  };

  // Domain styling maps
  const getDomainStyles = () => {
    switch (card.domain) {
      case 'Sanctuary':
        return {
          border: 'border-amber-500/70',
          glow: 'shadow-[0_0_25px_rgba(234,179,8,0.25)]',
          badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/50',
          headerBg: 'from-amber-950/60 via-stone-900/60 to-amber-950/60',
          accentText: 'text-amber-400',
          meterFill: 'bg-amber-500',
          costBg: 'bg-gradient-to-br from-amber-400 to-yellow-600'
        };
      case 'Radiance':
        return {
          border: 'border-red-600/70',
          glow: 'shadow-[0_0_25px_rgba(239,68,68,0.25)]',
          badgeBg: 'bg-red-950/80 text-red-300 border-red-500/50',
          headerBg: 'from-red-950/60 via-stone-900/60 to-red-950/60',
          accentText: 'text-red-400',
          meterFill: 'bg-red-500',
          costBg: 'bg-gradient-to-br from-orange-500 to-red-700'
        };
      case 'Verdance':
        return {
          border: 'border-emerald-500/70',
          glow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
          badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50',
          headerBg: 'from-emerald-950/60 via-stone-900/60 to-emerald-950/60',
          accentText: 'text-emerald-400',
          meterFill: 'bg-emerald-500',
          costBg: 'bg-gradient-to-br from-emerald-400 to-green-700'
        };
      case 'Arcane':
        return {
          border: 'border-blue-500/70',
          glow: 'shadow-[0_0_25px_rgba(59,130,246,0.25)]',
          badgeBg: 'bg-blue-950/80 text-blue-300 border-blue-500/50',
          headerBg: 'from-blue-950/60 via-stone-900/60 to-blue-950/60',
          accentText: 'text-blue-400',
          meterFill: 'bg-blue-500',
          costBg: 'bg-gradient-to-br from-blue-400 to-indigo-700'
        };
      case 'Abyss':
        return {
          border: 'border-purple-600/70',
          glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
          badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-500/50',
          headerBg: 'from-purple-950/60 via-neutral-900/60 to-purple-950/60',
          accentText: 'text-purple-400',
          meterFill: 'bg-purple-500',
          costBg: 'bg-gradient-to-br from-purple-500 to-fuchsia-800'
        };
      default:
        return {
          border: 'border-stone-500/70',
          glow: 'shadow-lg',
          badgeBg: 'bg-stone-900 text-stone-300 border-stone-600',
          headerBg: 'from-stone-900/60 via-stone-800/60 to-stone-900/60',
          accentText: 'text-stone-300',
          meterFill: 'bg-stone-400',
          costBg: 'bg-gradient-to-br from-stone-400 to-stone-700'
        };
    }
  };

  const domainStyles = getDomainStyles();

  // Size scaling
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-52 text-xs';
      case 'hand':
        return 'w-60 text-xs';
      case 'lg':
      case 'full':
        return 'w-full max-w-md text-sm';
      case 'md':
      default:
        return 'w-72 text-xs';
    }
  };

  const getRarityBadge = () => {
    switch (card.rarity) {
      case 'Divine Boundless':
        return 'bg-gradient-to-r from-amber-400 via-purple-500 to-pink-500 text-white font-black';
      case 'Mythic':
        return 'bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold';
      case 'Legendary':
        return 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold';
      case 'Very Rare':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium';
      case 'Rare':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium';
      default:
        return 'bg-stone-800 text-stone-300';
    }
  };

  // Derive Power Glyphs from card or database
  const cardGlyphs: PowerGlyph[] = card.powerGlyphs || (
    UNIVERSAL_POWER_GLYPHS.slice(0, 6)
  );

  const hasFoil = foilType !== 'none' && (
    card.rarity === 'Legendary' || 
    card.rarity === 'Mythic' || 
    card.rarity === 'Divine Boundless' || 
    foilType === 'gold' || 
    foilType === 'cosmic'
  );

  const getDomainIcon = (domainName: string) => {
    switch (domainName) {
      case 'Sanctuary':
        return '✨';
      case 'Radiance':
        return '🔥';
      case 'Verdance':
        return '🌿';
      case 'Arcane':
        return '🔮';
      case 'Abyss':
        return '💀';
      default:
        return '✦';
    }
  };

  return (
    <div
      ref={cardRef}
      id={`card-${card.id}`}
      onClick={disabled ? undefined : onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: interactive ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${selected ? 'scale(1.04)' : ''}` : undefined,
        transition: interactive ? 'transform 0.15s ease-out, box-shadow 0.2s' : undefined
      }}
      className={`
        group relative rounded-2xl border-2 overflow-hidden bg-stone-950 flex flex-col justify-between select-none
        aspect-[5/7.2] min-h-[380px] animate-card-entrance
        ${getSizeStyles()}
        ${domainStyles.border}
        ${domainStyles.glow}
        ${selected ? 'ring-4 ring-amber-400 shadow-2xl scale-105 z-20' : ''}
        ${disabled ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:shadow-2xl'}
        ${playable && !disabled ? 'ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300' : ''}
      `}
    >
      {/* ================= FULL ART CARD BACKGROUND ================= */}
      {/* Positioned from the top frame, fully visible beneath transparent HUD overlays */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-stone-950">
        <CardVisualArt card={card} className="w-full h-full" />
        {/* Subtle cinematic gradient vignette preserving art vibrancy */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-stone-950/60 via-transparent to-stone-950/70" />
      </div>

      {/* Glare effect */}
      {interactive && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`
          }}
        />
      )}

      {/* Foil Layer */}
      {hasFoil && (
        <div className={`absolute inset-0 z-20 pointer-events-none ${
          card.rarity === 'Divine Boundless' || foilType === 'cosmic' ? 'foil-cosmic' :
          card.rarity === 'Legendary' || foilType === 'gold' ? 'foil-gold' : 'foil-sheen'
        }`} />
      )}

      {/* Domain & Rarity Specific Bespoke Outer Border */}
      <CardDomainBorder domain={card.domain} rarity={card.rarity} />

      {/* ================= 1. FLOATING SEMI-TRANSPARENT TOP HUD ================= */}
      <div className={`relative z-20 px-3 pt-2 pb-1.5 bg-gradient-to-b ${domainStyles.headerBg} border-b border-amber-500/25 backdrop-blur-md shadow-sm`}>
        <div className="flex items-center justify-between gap-1.5">
          {/* Domain badge & Type & Rarity */}
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-cinzel font-bold border flex items-center gap-1 shrink-0 ${domainStyles.badgeBg}`}>
              <span>{getDomainIcon(card.domain)}</span>
              <span>{card.domain}</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-stone-900/80 text-stone-200 border border-stone-700 text-[8.5px] font-cinzel font-semibold shrink-0">
              {card.cardType}
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[8px] font-cinzel font-bold shrink-0 ${getRarityBadge()}`}>
              {card.rarity}
            </span>
          </div>

          {/* Domain-Specific Bespoke Essence Cost Seal */}
          <CardDomainStatBadge
            domain={card.domain}
            type="cost"
            value={card.cost}
            size="md"
          />
        </div>

        {/* Card Title & Subtitle with refined font & size */}
        <div className="mt-1">
          <h3 className="font-cinzel-decorative font-bold text-xs sm:text-[13px] leading-tight text-amber-100 uppercase tracking-wider truncate drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            {card.name}
          </h3>
          <p className="font-cinzel text-[8px] sm:text-[8.5px] tracking-widest text-amber-300/90 truncate uppercase mt-0.5 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {card.subtitle}
          </p>
        </div>
      </div>

      {/* ================= 2. OPEN CENTER FULL ART SPACE ================= */}
      <div className="relative z-20 flex-1 flex flex-col justify-between p-2.5 pointer-events-none">
        {/* Top floating inspect button and star rating */}
        <div className="flex items-center justify-between pointer-events-auto">
          {card.laneRole ? (
            <span className="px-1.5 py-0.5 rounded bg-black/75 border border-stone-700 text-stone-300 text-[8px] font-mono font-bold backdrop-blur-sm shadow">
              {card.laneRole} Lane
            </span>
          ) : <span />}

          <div className="flex items-center gap-1.5">
            {/* Star Rating */}
            <div className="flex items-center bg-black/75 px-1.5 py-0.5 rounded-full border border-amber-500/30 text-amber-400 backdrop-blur-sm shadow">
              {Array.from({ length: Math.min(5, card.powerStars || card.divineRank || 5) }).map((_, i) => (
                <Star key={i} size={8} className="fill-amber-400 inline" />
              ))}
            </div>

            {showInspectButton && onInspect && (
              <button
                type="button"
                id={`inspect-${card.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onInspect(card);
                }}
                className="p-1.5 rounded-full bg-black/85 hover:bg-amber-600 text-white/90 hover:text-white backdrop-blur-md transition-colors border border-white/20 shadow-lg cursor-pointer"
                title="Inspect Codex Details"
              >
                <Info size={11} />
              </button>
            )}
          </div>
        </div>

        {/* Center Status Badges */}
        <div className="flex items-center justify-between pointer-events-auto">
          {card.attunementRequired && (
            <div className="px-1.5 py-0.5 rounded bg-black/80 text-amber-300 border border-amber-500/40 text-[7.5px] font-cinzel font-bold tracking-wider backdrop-blur-sm shadow">
              ATTUNED
            </div>
          )}
          {card.status && (
            <div className="px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/40 text-[7.5px] font-cinzel font-bold tracking-wider backdrop-blur-sm shadow">
              {card.status.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* ================= 3. FLOATING TRANSPARENT BOTTOM HUD (ICONS-ONLY ABILITIES & COMBAT STATS) ================= */}
      <div className="relative z-20 px-2.5 pt-1.5 pb-2 bg-gradient-to-t from-stone-950/80 via-stone-950/50 to-transparent backdrop-blur-[2px] border-t border-amber-500/20 space-y-1.5">
        
        {/* Compact Transparent Abilities Icon Row (Icons Only - No Multiline Text Paragraphs) */}
        {card.abilities && card.abilities.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            {card.abilities.map((ab, idx) => (
              <div
                key={ab.id || idx}
                onMouseEnter={() => setHoveredAbility(ab)}
                onMouseLeave={() => setHoveredAbility(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onInspect) onInspect(card);
                }}
                className="group/ab relative px-2 py-1 rounded-lg bg-stone-950/70 hover:bg-stone-900/90 border border-stone-700/70 hover:border-amber-400/80 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
                title={`${ab.name} (${ab.type}): ${ab.description}`}
              >
                <AbilityIcon type={ab.iconType || ab.name || 'zap'} domain={card.domain} size={15} className="shrink-0" />
                <div className="flex items-center gap-1">
                  <span className="text-[8.5px] font-cinzel font-bold text-stone-200 group-hover/ab:text-amber-300 truncate max-w-[70px]">
                    {ab.name}
                  </span>
                  {ab.damageDice && (
                    <span className="text-[7px] font-mono text-red-300 font-bold bg-red-950/80 px-1 py-0.2 rounded border border-red-500/40">
                      {ab.damageDice}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hover Ability Interactive Glass Preview */}
        {hoveredAbility && (
          <div className="p-1.5 rounded-xl bg-stone-950/95 border border-amber-500/60 text-[8px] text-stone-200 animate-fade-in shadow-2xl backdrop-blur-lg">
            <div className="flex items-center justify-between font-bold text-amber-300 font-cinzel">
              <div className="flex items-center gap-1">
                <AbilityIcon type={hoveredAbility.iconType || hoveredAbility.name || 'zap'} domain={card.domain} size={12} />
                <span>{hoveredAbility.name}</span>
              </div>
              <div className="flex items-center gap-1">
                {hoveredAbility.damageDice && (
                  <span className="text-[7px] text-red-300 font-mono font-bold bg-red-950 px-1 rounded border border-red-500/40">{hoveredAbility.damageDice}</span>
                )}
                <span className="text-[7px] text-purple-300 font-mono uppercase bg-purple-950/80 px-1 rounded border border-purple-500/40">{hoveredAbility.type}</span>
              </div>
            </div>
            <p className="text-[7.5px] text-stone-300 leading-tight mt-1 line-clamp-2">{hoveredAbility.description}</p>
          </div>
        )}

        {/* Power Glyphs Row (Icons Only with tooltip) */}
        {cardGlyphs.length > 0 && (
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
              {cardGlyphs.slice(0, 5).map((glyph) => (
                <div
                  key={glyph.id}
                  onMouseEnter={() => setHoveredGlyph(glyph)}
                  onMouseLeave={() => setHoveredGlyph(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onInspect) onInspect(card);
                  }}
                  className="px-1.5 py-0.5 rounded bg-stone-950/70 hover:bg-amber-950/80 border border-stone-800 hover:border-amber-400 text-center transition-all cursor-pointer flex items-center gap-1 shadow-sm shrink-0 backdrop-blur-sm"
                  title={`${glyph.name}: ${glyph.ruleClause}`}
                >
                  <span className="text-[9.5px]">{glyph.icon}</span>
                  <span className="text-[7px] font-cinzel font-bold text-stone-300 group-hover:text-amber-200 truncate max-w-[55px]">
                    {glyph.shortTag}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-[7px] font-mono text-stone-400 shrink-0">
              {cardGlyphs.length} Glyphs
            </span>
          </div>
        )}

        {/* Hover Glyph Preview */}
        {hoveredGlyph && (
          <div className="p-1 rounded bg-stone-950/95 border border-amber-500/50 text-[7.5px] text-stone-200 animate-fade-in shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between font-bold text-amber-300 font-cinzel">
              <span>{hoveredGlyph.icon} {hoveredGlyph.name}</span>
              {hoveredGlyph.timing && <span className="text-[7px] text-emerald-400 font-mono">{hoveredGlyph.timing}</span>}
            </div>
            <p className="text-[7px] text-stone-300 leading-tight mt-0.5 line-clamp-1">{hoveredGlyph.ruleClause}</p>
          </div>
        )}

        {/* Combat Stats Strip with Domain-Specific Bespoke Badges */}
        <div className="flex items-center justify-between pt-1 border-t border-stone-800/80 text-[9px]">
          <div className="flex items-center gap-1.5">
            {card.cardType !== 'Environment' && (
              <CardDomainStatBadge
                domain={card.domain}
                type="attack"
                value={card.power || 0}
                size="sm"
              />
            )}
            <CardDomainStatBadge
              domain={card.domain}
              type="defense"
              value={card.defense || 0}
              size="sm"
            />
          </div>

          <div className="text-right">
            <div className="text-[8px] font-cinzel font-black text-amber-300">
              {card.powerLevelTier || 'TIER S'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

