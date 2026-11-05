import React, { useState, useRef } from 'react';
import { Card, PowerGlyph, AbilityProperty } from '../types';
import { CardVisualArt } from './CardVisualArt';
import { CardDomainBorder } from './CardDomainBorder';
import { CardDomainStatBadge } from './CardDomainStatBadge';
import { AbilityIcon } from './AbilityIcon';
import { UNIVERSAL_POWER_GLYPHS } from '../data/powerGlyphsData';
import { getDomainVisualIdentity } from '../data/cardArtPresets';
import { Star, Info } from 'lucide-react';

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

    const rX = ((y - centerY) / centerY) * -9;
    const rY = ((x - centerX) / centerX) * 9;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
    setHoveredAbility(null);
    setHoveredGlyph(null);
  };

  const domainIdentity = getDomainVisualIdentity(card.domain);

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

  const cardGlyphs: PowerGlyph[] = card.powerGlyphs || UNIVERSAL_POWER_GLYPHS.slice(0, 6);

  const hasFoil =
    foilType !== 'none' &&
    (card.rarity === 'Legendary' ||
      card.rarity === 'Mythic' ||
      card.rarity === 'Divine Boundless' ||
      foilType === 'gold' ||
      foilType === 'cosmic');

  return (
    <div
      ref={cardRef}
      id={`card-${card.id}`}
      onClick={disabled ? undefined : onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: interactive
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${selected ? 'scale(1.04)' : ''}`
          : undefined,
        transition: interactive ? 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s' : undefined
      }}
      className={`
        group relative rounded-2xl border-2 overflow-hidden bg-stone-950 flex flex-col justify-between select-none
        aspect-[5/7.2] min-h-[380px] animate-card-entrance
        ${getSizeStyles()}
        ${domainIdentity.outerBorderClass}
        ${domainIdentity.outerGlowShadow}
        ${selected ? 'ring-4 ring-amber-400 shadow-2xl scale-105 z-20' : ''}
        ${disabled ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:shadow-2xl'}
        ${playable && !disabled ? 'ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300' : ''}
      `}
    >
      {/* ================= 0. FULL-BLEED REAL ARTWORK CANVAS ================= */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-stone-950">
        <CardVisualArt card={card} className="w-full h-full" />
        {/* Measured top & bottom contrast scrims for WCAG AA legibility while preserving open center art */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/75 via-transparent to-black/85" />
      </div>

      {/* Dynamic 3D Specular Glare */}
      {interactive && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`
          }}
        />
      )}

      {/* Rarity Foil Shader Layer */}
      {hasFoil && (
        <div
          className={`absolute inset-0 z-20 pointer-events-none ${
            card.rarity === 'Divine Boundless' || foilType === 'cosmic'
              ? 'foil-cosmic'
              : card.rarity === 'Legendary' || foilType === 'gold'
              ? 'foil-gold'
              : 'foil-sheen'
          }`}
        />
      )}

      {/* Bespoke Domain Architectural SVG Frame */}
      <CardDomainBorder domain={card.domain} rarity={card.rarity} />

      {/* ================= 1. SCULPTED DOMAIN NAMEPLATE & TOP ESSENCE CREST ================= */}
      <div
        className={`relative z-20 px-3 pt-2.5 pb-2 bg-gradient-to-r ${domainIdentity.topPlateGradient} backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.65)]`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {/* Unboxed Typographic Metadata Kicker (Zero-Pill Discipline) */}
            <div className={`flex items-center gap-1.5 text-[9px] font-cinzel font-bold tracking-wider uppercase truncate ${domainIdentity.kickerTextClass}`}>
              <span>{domainIdentity.sigil} {card.domain}</span>
              <span aria-hidden="true" className="opacity-50">·</span>
              <span className="text-stone-200">{card.cardType}</span>
              <span aria-hidden="true" className="opacity-50">·</span>
              <span
                className={
                  card.rarity === 'Divine Boundless'
                    ? 'text-fuchsia-300 font-black'
                    : card.rarity === 'Mythic'
                    ? 'text-red-300 font-extrabold'
                    : card.rarity === 'Legendary'
                    ? 'text-amber-300 font-extrabold'
                    : 'text-stone-300'
                }
              >
                {card.rarity}
              </span>
            </div>

            {/* Domain-Specific Display Title */}
            <h3
              className={`${domainIdentity.fontClass} font-bold text-sm sm:text-[15px] leading-snug tracking-wide truncate mt-0.5 ${domainIdentity.titleTextClass}`}
            >
              {card.name}
            </h3>

            {/* Subtitle / Epithet */}
            <p className="font-cinzel text-[8px] tracking-widest text-stone-300/90 truncate uppercase">
              {card.subtitle}
            </p>
          </div>

          {/* Sculpted 3D Essence Cost Crest */}
          <CardDomainStatBadge
            domain={card.domain}
            type="cost"
            value={card.cost}
            size="md"
            className="mt-0.5"
          />
        </div>
      </div>

      {/* ================= 2. OPEN FULL-ART SHOWCASE VIEWPORT ================= */}
      <div className="relative z-20 flex-1 flex flex-col justify-between px-3 py-2 pointer-events-none">
        {/* Upper Showcase Controls: Lane Role Kicker, Divine Rank Stars, & Inspect Button */}
        <div className="flex items-center justify-between pointer-events-auto">
          {card.laneRole ? (
            <span className="text-[8.5px] font-mono-tabular font-bold uppercase tracking-wider text-stone-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] bg-black/55 px-2 py-0.5 rounded border border-white/15 backdrop-blur-sm">
              {card.laneRole} Line
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-1.5">
            {/* Divine Rank Star Bar */}
            <div className="flex items-center gap-0.5 bg-black/65 px-2 py-0.5 rounded-full border border-amber-400/35 text-amber-300 backdrop-blur-sm shadow">
              {Array.from({ length: Math.min(5, card.powerStars || card.divineRank || 4) }).map((_, i) => (
                <Star key={i} size={8.5} className="fill-amber-400 inline" />
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
                className="p-1.5 rounded-full bg-black/80 hover:bg-amber-500 text-stone-100 hover:text-black backdrop-blur-md transition-colors border border-white/25 shadow-lg cursor-pointer"
                title="Inspect Card & Real Artwork Studio"
              >
                <Info size={11} />
              </button>
            )}
          </div>
        </div>

        {/* Subtle Lower Art Rim Status */}
        <div className="flex items-center justify-between text-[8px] font-cinzel font-bold tracking-widest uppercase text-amber-200/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
          <span>{card.attunementRequired ? '✦ Attuned Relic' : ''}</span>
          <span>{card.status ? card.status : ''}</span>
        </div>
      </div>

      {/* ================= 3. TRANSLUCENT DOMAIN GLASS HUD & SCULPTED CORNER CRESTS ================= */}
      <div
        className={`relative z-20 px-2.5 pt-2 pb-2.5 bg-gradient-to-t ${domainIdentity.bottomHudGradient} backdrop-blur-md space-y-1.5`}
      >
        {/* Interactive Ability Bar */}
        {card.abilities && card.abilities.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            {card.abilities.map((ab, idx) => (
              <button
                type="button"
                key={ab.id || idx}
                onMouseEnter={() => setHoveredAbility(ab)}
                onMouseLeave={() => setHoveredAbility(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onInspect) onInspect(card);
                }}
                className={`group/ab relative px-2 py-1 rounded-lg border backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0 ${domainIdentity.abilityPillClass}`}
                title={`${ab.name} (${ab.type}): ${ab.description}`}
              >
                <AbilityIcon type={ab.iconType || ab.name || 'zap'} domain={card.domain} size={14} className="shrink-0" />
                <span className="text-[8.5px] font-cinzel font-bold truncate max-w-[78px] whitespace-nowrap">
                  {ab.name}
                </span>
                {ab.damageDice && (
                  <span className="text-[7.5px] font-mono-tabular font-bold text-amber-200 opacity-90 whitespace-nowrap">
                    · {ab.damageDice}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Hover Ability Preview Popover */}
        {hoveredAbility && (
          <div className="p-2 rounded-xl bg-stone-950/95 border border-amber-400/60 text-[8px] text-stone-200 animate-fade-in shadow-2xl backdrop-blur-lg">
            <div className="flex items-center justify-between font-bold text-amber-300 font-cinzel">
              <div className="flex items-center gap-1">
                <AbilityIcon type={hoveredAbility.iconType || hoveredAbility.name || 'zap'} domain={card.domain} size={12} />
                <span>{hoveredAbility.name}</span>
              </div>
              <span className="text-[7.5px] font-mono-tabular text-stone-300">
                {hoveredAbility.type} {hoveredAbility.damageDice ? `· ${hoveredAbility.damageDice}` : ''}
              </span>
            </div>
            <p className="text-[7.5px] text-stone-300 leading-tight mt-1 line-clamp-2">{hoveredAbility.description}</p>
          </div>
        )}

        {/* Engraved Power Glyphs Strip */}
        {cardGlyphs.length > 0 && (
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
              {cardGlyphs.slice(0, 4).map((glyph) => (
                <button
                  type="button"
                  key={glyph.id}
                  onMouseEnter={() => setHoveredGlyph(glyph)}
                  onMouseLeave={() => setHoveredGlyph(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onInspect) onInspect(card);
                  }}
                  className={`px-1.5 py-0.5 rounded border text-center transition-all cursor-pointer flex items-center gap-1 shadow-sm shrink-0 backdrop-blur-sm ${domainIdentity.glyphPillClass}`}
                  title={`${glyph.name}: ${glyph.ruleClause}`}
                >
                  <span className="text-[9px]">{glyph.icon}</span>
                  <span className="text-[7px] font-cinzel font-bold truncate max-w-[54px] whitespace-nowrap">
                    {glyph.shortTag}
                  </span>
                </button>
              ))}
            </div>
            <span className="text-[7.5px] font-mono-tabular text-stone-400 shrink-0">
              {cardGlyphs.length} Glyphs
            </span>
          </div>
        )}

        {/* Hover Glyph Preview */}
        {hoveredGlyph && (
          <div className="p-1.5 rounded-lg bg-stone-950/95 border border-amber-500/50 text-[7.5px] text-stone-200 animate-fade-in shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between font-bold text-amber-300 font-cinzel">
              <span>{hoveredGlyph.icon} {hoveredGlyph.name}</span>
              {hoveredGlyph.timing && <span className="text-[7px] text-emerald-400 font-mono-tabular">{hoveredGlyph.timing}</span>}
            </div>
            <p className="text-[7px] text-stone-300 leading-tight mt-0.5 line-clamp-1">{hoveredGlyph.ruleClause}</p>
          </div>
        )}

        {/* Sculpted Corner Combat Crests: Bottom-Left Attack · Center Subtype/Tier · Bottom-Right Defense */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10">
          {card.cardType !== 'Environment' ? (
            <CardDomainStatBadge
              domain={card.domain}
              type="attack"
              value={card.power || 0}
              size="sm"
            />
          ) : (
            <span className="text-[8px] font-cinzel text-stone-400 uppercase">Field</span>
          )}

          <div className="text-center px-1 min-w-0">
            <div className={`text-[8px] font-bold uppercase tracking-widest truncate ${domainIdentity.kickerTextClass}`}>
              {card.powerLevelTier || 'TIER S'}
            </div>
            <div className="text-[7px] text-stone-400 font-cinzel truncate max-w-[95px]">
              {card.subtype}
            </div>
          </div>

          <CardDomainStatBadge
            domain={card.domain}
            type="defense"
            value={card.defense || 0}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};
