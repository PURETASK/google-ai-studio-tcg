import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, PowerGlyph, Domain } from '../types';
import { CardItem } from './CardItem';
import { CardDomainStatBadge } from './CardDomainStatBadge';
import { UNIVERSAL_POWER_GLYPHS, rollDiceFormula, calculateAverageRoll, DiceRollResult } from '../data/powerGlyphsData';
import { CodexIcon, CodexAbilityBadge, CODEX_ICON_DEFINITIONS } from './CodexIconRegistry';
import { CardAttributeRadarChart } from './CardAttributeRadarChart';
import { ParticleCanvasOverlay } from './ParticleCanvasOverlay';
import { KeywordTooltip } from './KeywordTooltip';
import { extractKeywordsFromText } from '../utils/keywordRuleDefinitions';
import { soundEngine } from '../utils/audioEngine';
import { missionsManager } from '../utils/missionsManager';
import { 
  X, 
  Sparkles, 
  Shield, 
  Sword, 
  Zap, 
  Star, 
  BookOpen, 
  Activity, 
  Layers, 
  Award, 
  Compass, 
  Flame, 
  Eye, 
  HelpCircle,
  Copy,
  Check,
  Rotate3d,
  Dices,
  RotateCcw,
  Sliders,
  Maximize2,
  Minimize2,
  Info,
  ChevronRight,
  TrendingUp,
  Cpu,
  Image as ImageIcon,
  Upload,
  Link,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { CURATED_CARD_ARTWORKS, generateRecommendedArtPrompt, DOMAIN_VISUAL_IDENTITIES } from '../data/cardArtPresets';
import { saveCustomCard } from '../utils/customCardStorage';

export interface DeepDiveCardInspectorProps {
  card: Card | null;
  onClose: () => void;
  onUpdateCard?: (updated: Card) => void;
}

export const DeepDiveCardInspector: React.FC<DeepDiveCardInspectorProps> = ({ card, onClose, onUpdateCard }) => {
  const [activeTab, setActiveTab] = useState<'sheet' | 'radar' | 'glyphs' | '3d-studio' | 'anatomy' | 'evolution' | 'artwork'>('sheet');
  const [selectedFoil, setSelectedFoil] = useState<'none' | 'gold' | 'prismatic' | 'cosmic'>('prismatic');
  const [copied, setCopied] = useState(false);

  // Local card state for live artwork updates
  const [currentCard, setCurrentCard] = useState<Card | null>(card);
  const [customArtInput, setCustomArtInput] = useState<string>(card?.artUrl || '');
  const [promptCopied, setPromptCopied] = useState(false);
  const [artNotice, setArtNotice] = useState<string | null>(null);
  const [isGeneratingAiArt, setIsGeneratingAiArt] = useState(false);

  useEffect(() => {
    if (card) {
      setCurrentCard(card);
      setCustomArtInput(card.artUrl || '');
    }
  }, [card]);

  // 3D Tilt interactive controller states
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [tiltX, setTiltX] = useState<number>(0);
  const [tiltY, setTiltY] = useState<number>(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isManual3D, setIsManual3D] = useState(false);
  const [manualPitch, setManualPitch] = useState(0);
  const [manualYaw, setManualYaw] = useState(0);
  const [manualZoom, setManualZoom] = useState(1);

  // Dice simulation state inside card inspector
  const [activeDiceRoll, setActiveDiceRoll] = useState<DiceRollResult | null>(null);
  const [isRollingDice, setIsRollingDice] = useState(false);

  // Play reactive soundscape when card is inspected & advance lore mastery mission
  useEffect(() => {
    if (card) {
      soundEngine.playDomainSoundscape(card.domain as any);
      missionsManager.incrementProgress('mastery', 1);
      missionsManager.incrementProgress('mission-inspect-codex', 1);
    }
    return () => {
      soundEngine.stopDrone();
    };
  }, [card?.id, card?.domain]);

  if (!card) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(card, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const domainIdentity = DOMAIN_VISUAL_IDENTITIES[card.domain] || DOMAIN_VISUAL_IDENTITIES.Radiance;
  const domainColor = domainIdentity.primaryHex;

  // Derive 5-Axis Attributes (Damage, Durability, Mobility, Utility, Control)
  const attrs = card.attributes || {
    damage: Math.min(10, Math.max(2, Math.round(card.power * 0.9 + (card.cardType === 'Champion' ? 1.5 : 0)))),
    durability: Math.min(10, Math.max(2, Math.round(card.defense * 0.9 + (card.domain === 'Sanctuary' ? 1.5 : 0)))),
    mobility: Math.min(10, Math.max(2, Math.round(7 - card.cost * 0.4 + (card.domain === 'Verdance' ? 2 : 0)))),
    utility: Math.min(10, Math.max(2, Math.round((card.abilities?.length || 0) * 2.2 + (card.cardType === 'Artifact' ? 2 : 0)))),
    control: Math.min(10, Math.max(2, Math.round((card.divineRank || 1) * 1.6 + (card.domain === 'Abyss' || card.domain === 'Arcane' ? 2 : 1))))
  };

  // Archetype Classification Logic
  const getArchetype = () => {
    const { damage, durability, mobility, utility, control } = attrs;
    if (damage >= 8 && durability >= 7) return { title: 'Juggernaut Vanguard', desc: 'Devastating high-impact frontline brawler built to absorb blows and smash formations.' };
    if (damage >= 8 && mobility >= 7) return { title: 'Agile Strike Assassin', desc: 'Rapid flanking unit specialized in piercing high-priority targets with supreme speed.' };
    if (durability >= 8 && control >= 7) return { title: 'Fortress Bastion', desc: 'Impenetrable defensive anchor locking down lanes and mitigating incoming assault.' };
    if (utility >= 8 && control >= 7) return { title: 'Tactical Spell-Weaver', desc: 'Master manipulator shifting board states, dispensing auras, and disrupting tempo.' };
    if (damage >= 8) return { title: 'Burst Assault Striker', desc: 'Heavy offensive pressure dealer focused on continuous damage amplification.' };
    if (durability >= 8) return { title: 'Stalwart Sentinel', desc: 'High armor pool with sustained endurance against attrition.' };
    return { title: 'Versatile Combatant', desc: 'Balanced hybrid stats capable of flexing between frontline defense and offensive support.' };
  };

  const archetypeInfo = getArchetype();

  const handleApplyArtUrl = (newUrl: string) => {
    if (!card) return;
    const clean = newUrl.trim();
    const updated: Card = {
      ...(currentCard || card),
      artUrl: clean || undefined
    };
    card.artUrl = clean || undefined;
    setCurrentCard(updated);
    setCustomArtInput(clean);
    soundEngine.playMicroSound('select');
    
    // Persist to indexedDB / storage
    saveCustomCard(updated).catch(e => console.warn('Could not persist card art:', e));
    if (onUpdateCard) onUpdateCard(updated);
    
    setArtNotice(clean ? 'High-definition artwork applied to card!' : 'Artwork reset to default realm visual.');
    setTimeout(() => setArtNotice(null), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        handleApplyArtUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopyPrompt = () => {
    if (!card) return;
    const prompt = generateRecommendedArtPrompt(currentCard || card);
    navigator.clipboard.writeText(prompt);
    setPromptCopied(true);
    soundEngine.playMicroSound('click');
    setTimeout(() => setPromptCopied(false), 2500);
  };

  const handleGenerateAiArt = async () => {
    const targetCard = currentCard || card;
    if (!targetCard || isGeneratingAiArt) return;
    setIsGeneratingAiArt(true);
    setArtNotice('Synthesizing bespoke domain artwork via Nexus AI Studio...');
    soundEngine.playMicroSound('select');
    try {
      const response = await fetch('/api/art/generate-card-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card: targetCard,
          customPrompt: generateRecommendedArtPrompt(targetCard)
        })
      });
      const data = await response.json();
      if (data && data.artUrl) {
        handleApplyArtUrl(data.artUrl);
        setArtNotice(`Bespoke ${targetCard.domain} artwork forged (${data.source || 'AI Engine'})!`);
      } else {
        setArtNotice('Could not synthesize image; please select a curated masterpiece below.');
      }
    } catch (err) {
      console.error('AI Art synthesis failed:', err);
      setArtNotice('Network error during synthesis; please pick from the gallery below.');
    } finally {
      setIsGeneratingAiArt(false);
    }
  };

  // Radar Polygon Geometry
  const radarPoints = [
    { label: 'Damage', val: attrs.damage, angle: -Math.PI / 2 },
    { label: 'Durability', val: attrs.durability, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { label: 'Mobility', val: attrs.mobility, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { label: 'Utility', val: attrs.utility, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { label: 'Control', val: attrs.control, angle: -Math.PI / 2 + (8 * Math.PI) / 5 }
  ];

  const center = 100;
  const maxRadius = 70;

  const getCoordinates = (val: number, angle: number) => {
    const r = (Math.max(1, Math.min(10, val)) / 10) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  const polygonCoords = radarPoints.map(p => getCoordinates(p.val, p.angle)).join(' ');

  // Interactive 3D Card Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isManual3D || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -18;
    const rY = ((x - centerX) / centerX) * 18;

    setTiltX(rX);
    setTiltY(rY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35
    });
  };

  const handleMouseLeave = () => {
    if (!isManual3D) {
      setTiltX(0);
      setTiltY(0);
      setGlare(prev => ({ ...prev, opacity: 0 }));
    }
  };

  const handleRollAbilityDice = (formula: string) => {
    setIsRollingDice(true);
    setTimeout(() => {
      setActiveDiceRoll(rollDiceFormula(formula));
      setIsRollingDice(false);
    }, 250);
  };

  const cardGlyphs: PowerGlyph[] = card.powerGlyphs || UNIVERSAL_POWER_GLYPHS.slice(0, 6);

  const effectiveRotateX = isManual3D ? manualPitch : tiltX;
  const effectiveRotateY = isManual3D ? manualYaw : tiltY;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto selection:bg-amber-500 selection:text-black"
    >
      {/* Modal Window Container */}
      <motion.div 
        key={card.id}
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        id="deep-dive-card-inspector"
        className="relative w-full max-w-5xl bg-stone-950 border-2 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col transition-all"
        style={{
          borderColor: `${domainColor}88`,
          boxShadow: `0 0 50px ${domainColor}33, inset 0 0 20px rgba(0,0,0,0.9)`
        }}
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-stone-900 via-neutral-900 to-stone-900 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-3.5 h-3.5 rounded-full animate-ping"
              style={{ backgroundColor: domainColor }}
            />
            <div>
              <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Deep-Dive Card Inspector • {card.domain} #{card.id}</span>
              </span>
              <h2 className="font-cinzel font-black text-base sm:text-xl text-amber-100 leading-tight">
                {card.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              id="copy-card-json"
              className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono flex items-center gap-1.5 border border-stone-700 transition"
              title="Copy JSON representation"
            >
              {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'JSON Export'}</span>
            </button>
            <button
              onClick={onClose}
              id="close-card-modal"
              className="p-1.5 rounded-full bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-800 hover:border-red-600/50 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-5 py-2 bg-stone-900/90 border-b border-stone-800 flex flex-wrap gap-2 text-xs font-cinzel">
          <button
            onClick={() => setActiveTab('sheet')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeTab === 'sheet' 
                ? 'bg-amber-500 text-black shadow-md' 
                : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <BookOpen size={13} />
            <span>Compendium Sheet</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeTab === 'radar' 
                ? 'bg-amber-500 text-black shadow-md' 
                : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Activity size={13} />
            <span>5-Axis Tactical Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('glyphs')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeTab === 'glyphs' 
                ? 'bg-amber-500 text-black shadow-md' 
                : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Sparkles size={13} />
            <span>Engraved Glyphs ({cardGlyphs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('3d-studio')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeTab === '3d-studio' 
                ? 'bg-amber-500 text-black shadow-md' 
                : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Rotate3d size={13} />
            <span>3D Tilt & Foil Shaders</span>
          </button>

          {card.breakdownItems && card.breakdownItems.length > 0 && (
            <button
              onClick={() => setActiveTab('anatomy')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === 'anatomy' 
                  ? 'bg-amber-500 text-black shadow-md' 
                  : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Compass size={13} />
              <span>Anatomical Blueprint</span>
            </button>
          )}

          {card.evolutionTiers && card.evolutionTiers.length > 0 && (
            <button
              onClick={() => setActiveTab('evolution')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === 'evolution' 
                  ? 'bg-amber-500 text-black shadow-md' 
                  : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Award size={13} />
              <span>Evolution Awakening</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('artwork')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeTab === 'artwork' 
                ? 'bg-amber-500 text-black shadow-md' 
                : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <ImageIcon size={13} />
            <span>Real Artwork Studio</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-stone-950">
          
          {/* ================= LEFT COLUMN: 3D INTERACTIVE CARD + FOIL TOGGLES ================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-start gap-4">
            
            {/* Interactive 3D Card Stage with Physics / Perspective */}
            <div 
              ref={cardContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative cursor-grab active:cursor-grabbing perspective-1000 group select-none"
              style={{
                perspective: '1000px'
              }}
            >
              <div 
                className="transition-transform duration-100 ease-out"
                style={{
                  transform: `rotateX(${effectiveRotateX}deg) rotateY(${effectiveRotateY}deg) scale(${manualZoom})`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="w-full max-w-[280px] shadow-2xl relative">
                  <CardItem 
                    card={currentCard || card} 
                    size="lg" 
                    foilType={selectedFoil}
                    interactive={false}
                    showInspectButton={false}
                  />

                  {/* Canvas Particle Overlay for Rare, Legendary, Mythic cards */}
                  {card.rarity !== 'Common' && (
                    <ParticleCanvasOverlay
                      rarity={card.rarity}
                      domain={card.domain}
                      intensity={
                        card.rarity === 'Divine Boundless'
                          ? 'ultra'
                          : card.rarity === 'Mythic' || card.rarity === 'Legendary'
                          ? 'high'
                          : 'medium'
                      }
                      triggerBurst={true}
                    />
                  )}

                  {/* Dynamic Glare Reflection Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
                    style={{
                      background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)`,
                      opacity: glare.opacity,
                      mixBlendMode: 'overlay'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Holographic Foil Finish Toggle */}
            <div className="w-full max-w-[280px] bg-stone-900/90 p-3 rounded-xl border border-stone-800 text-center shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-[10px] tracking-wider text-amber-300 font-bold uppercase flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Holographic Foil Shader</span>
                </span>
                <span className="text-[9px] font-mono text-stone-300 uppercase">
                  {selectedFoil}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1 text-[10px] font-medium">
                {(['none', 'gold', 'prismatic', 'cosmic'] as const).map((foil) => (
                  <button
                    key={foil}
                    onClick={() => setSelectedFoil(foil)}
                    className={`py-1 rounded capitalize transition ${
                      selectedFoil === foil
                        ? 'bg-amber-500 text-black font-bold ring-1 ring-amber-300 shadow'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    {foil}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Combat Stat Triad with Domain-Specific Bespoke Badges */}
            <div className="w-full max-w-[280px] grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col items-center justify-between gap-1 shadow">
                <span className="text-[9px] text-stone-400 block font-cinzel uppercase font-bold">Attack Power</span>
                <CardDomainStatBadge domain={card.domain} type="attack" value={card.power || 0} size="md" />
              </div>
              <div className="p-2 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col items-center justify-between gap-1 shadow">
                <span className="text-[9px] text-stone-400 block font-cinzel uppercase font-bold">Defense Armor</span>
                <CardDomainStatBadge domain={card.domain} type="defense" value={card.defense || 0} size="md" />
              </div>
              <div className="p-2 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col items-center justify-between gap-1 shadow">
                <span className="text-[9px] text-stone-400 block font-cinzel uppercase font-bold">Essence Cost</span>
                <CardDomainStatBadge domain={card.domain} type="cost" value={card.cost || 0} size="md" />
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: TABBED PANELS ================= */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* ---------------- TAB 1: COMPENDIUM SHEET ---------------- */}
            {activeTab === 'sheet' && (
              <div className="space-y-4">
                {/* Header ribbon with domain & divine rank */}
                <div className="p-4 rounded-xl bg-stone-900/90 border border-amber-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span 
                        className="text-[10px] font-cinzel uppercase font-bold tracking-wider"
                        style={{ color: domainColor }}
                      >
                        {card.domain} Domain • {card.cardType}
                      </span>
                      <h3 className="font-cinzel font-bold text-lg text-stone-100">
                        {card.subtitle || card.name}
                      </h3>
                    </div>

                    {card.divineRank && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300">
                        <span className="text-[10px] font-mono font-bold">Rank {card.divineRank}</span>
                        <div className="flex items-center">
                          {Array.from({ length: card.divineRank }).map((_, i) => (
                            <Star key={i} size={12} className="fill-amber-300 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metadata & Codex Alignment Chips with Keyword Tooltips */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800 text-xs text-stone-300 font-mono">
                    {card.attunementRequired && (
                      <KeywordTooltip keyword="Attunement" domain={card.domain} pillStyle>
                        <span>⚙️ {card.attunementDetail || 'Requires Attunement'}</span>
                      </KeywordTooltip>
                    )}
                    {card.weight && (
                      <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                        ⚖️ Weight: {card.weight}
                      </span>
                    )}
                    {card.status && (
                      <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-600/40">
                        ✨ Status: {card.status}
                      </span>
                    )}
                    <KeywordTooltip keyword="Momentum" domain={card.domain} pillStyle>
                      <span>🎲 Momentum Dynamic</span>
                    </KeywordTooltip>
                    <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-600/40">
                      🏆 Codex Mastery: Adept
                    </span>
                  </div>
                </div>

                {/* Abilities & Skills with CodexIconRegistry SVGs */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                      <Zap size={14} />
                      <span>Tactical Abilities & Skills</span>
                    </h4>
                    <span className="text-[10px] font-mono text-stone-300">
                      {(card.abilities || []).length} SKILLS REGISTERED
                    </span>
                  </div>

                  {(card.abilities || []).map((ab) => {
                    const detectedKeywords = extractKeywordsFromText(`${ab.name} ${ab.description}`);

                    return (
                      <div 
                        key={ab.id} 
                        className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <KeywordTooltip keyword={ab.name} domain={card.domain}>
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-inner shrink-0 cursor-help hover:scale-105 transition-transform"
                                style={{
                                  backgroundColor: `${domainColor}20`,
                                  borderColor: `${domainColor}55`
                                }}
                                title="Hover to inspect official ability rule definition"
                              >
                                <CodexIcon iconId={ab.iconType || ab.name} size={16} color={domainColor} withGlow={true} />
                              </div>
                            </KeywordTooltip>

                            <div>
                              <KeywordTooltip keyword={ab.name} domain={card.domain}>
                                <span className="font-cinzel font-bold text-sm text-amber-200 block leading-tight cursor-help hover:text-amber-300 transition-colors">
                                  {ab.name}
                                </span>
                              </KeywordTooltip>
                              {ab.type && (
                                <span className="text-[10px] font-mono text-stone-300">
                                  {ab.type}
                                </span>
                              )}
                            </div>
                          </div>

                          {ab.charges && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-amber-300 font-mono border border-stone-700">
                              {ab.charges}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-300 leading-relaxed pl-10">
                          {ab.description}
                        </p>

                        {/* Interactive Keyword Tooltip Pills Row */}
                        {detectedKeywords.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pl-10 pt-1">
                            <span className="text-[9px] font-cinzel text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                              <span>Official Rules:</span>
                            </span>
                            {detectedKeywords.map((kw) => (
                              <KeywordTooltip
                                key={kw.keyword}
                                keyword={kw.keyword}
                                domain={card.domain}
                                pillStyle={true}
                              />
                            ))}
                          </div>
                        )}

                        {/* Ability Dice & Damage Modifiers */}
                        {(ab.damageDice || ab.savingThrow) && (
                          <div className="flex flex-wrap items-center gap-2 pl-10 pt-1 text-[11px] font-mono">
                            {ab.damageDice && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-red-400 font-bold bg-red-950/70 px-2 py-0.5 rounded border border-red-900">
                                  ⚡ DMG: {ab.damageDice}
                                </span>
                                <button
                                  onClick={() => handleRollAbilityDice(ab.damageDice!)}
                                  className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] flex items-center gap-1 border border-stone-600 transition"
                                >
                                  <Dices size={11} />
                                  <span>Roll</span>
                                </button>
                              </div>
                            )}
                            {ab.savingThrow && (
                              <span className="text-purple-400 font-bold bg-purple-950/70 px-2 py-0.5 rounded border border-purple-900">
                                🎯 Save: {ab.savingThrow}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Dice Roll Result inside Inspector */}
                  {activeDiceRoll && (
                    <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/50 flex items-center justify-between gap-3 animate-fade-in font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">Simulated Roll:</span>
                        <span className="text-stone-200">{activeDiceRoll.formula} =</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-black text-sm">
                          {activeDiceRoll.total}
                        </span>
                      </div>
                      <span className="text-stone-300 text-[10px]">
                        [{activeDiceRoll.rolls.join(', ')}]
                      </span>
                    </div>
                  )}
                </div>

                {/* Lore Quote & Narrative Archive */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/20 via-stone-900/60 to-stone-950 border border-amber-500/20 space-y-2">
                  {card.quote && (
                    <p className="font-garamond italic text-sm text-amber-200/90 leading-relaxed">
                      "{card.quote}"
                    </p>
                  )}
                  {card.lore && (
                    <p className="text-xs text-stone-300 leading-normal">
                      {card.lore}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ---------------- TAB 2: POWER, DEFENSE, SPEED & MAGIC RADAR CHART ---------------- */}
            {activeTab === 'radar' && (
              <div className="space-y-4">
                <CardAttributeRadarChart card={card} size="lg" />
              </div>
            )}

            {/* ---------------- TAB 3: POWER GLYPHS ---------------- */}
            {activeTab === 'glyphs' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                    <Sparkles size={14} />
                    <span>Engraved Power Glyphs on this Card</span>
                  </h4>
                  <span className="text-[10px] font-mono text-amber-400">
                    {cardGlyphs.length} GLYPHS ENGRAVED
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {cardGlyphs.map((glyph) => (
                    <div 
                      key={glyph.id} 
                      className="p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition flex items-start gap-3"
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border"
                        style={{
                          backgroundColor: `${domainColor}15`,
                          borderColor: `${domainColor}55`
                        }}
                      >
                        <CodexIcon iconId={(glyph as any).iconId || glyph.category || glyph.name} size={20} color={domainColor} withGlow={true} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <KeywordTooltip keyword={glyph.shortTag || glyph.name} domain={card.domain}>
                              <span className="font-cinzel font-bold text-sm text-amber-200 cursor-help hover:text-amber-300">
                                {glyph.name}
                              </span>
                            </KeywordTooltip>
                            <KeywordTooltip keyword={glyph.shortTag} domain={card.domain} pillStyle>
                              <span>[{glyph.shortTag}]</span>
                            </KeywordTooltip>
                          </div>

                          {glyph.timing && (
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                              {glyph.timing}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                          {glyph.ruleClause}
                        </p>

                        {glyph.damageMod && (
                          <div className="mt-1.5 text-[10px] font-mono text-red-400 font-bold">
                            Combat Modifier: {glyph.damageMod}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- TAB 4: 3D STUDIO & FOIL SHADER CONTROLS ---------------- */}
            {activeTab === '3d-studio' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                      <Rotate3d size={14} />
                      <span>3D Card Tilt Calibration Studio</span>
                    </h4>
                    <button
                      onClick={() => {
                        setIsManual3D(false);
                        setManualPitch(0);
                        setManualYaw(0);
                        setManualZoom(1);
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono"
                    >
                      <RotateCcw size={12} />
                      <span>Reset Angle</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <button
                      onClick={() => setIsManual3D(!isManual3D)}
                      className={`p-2.5 rounded-xl border text-center font-cinzel font-bold transition ${
                        isManual3D ? 'bg-amber-500 text-black border-amber-300' : 'bg-stone-950 text-stone-300 border-stone-800'
                      }`}
                    >
                      {isManual3D ? '🎮 Manual Sliders Active' : '🖱️ Hover Physics Mode'}
                    </button>

                    <button
                      onClick={() => {
                        setManualPitch(-15);
                        setManualYaw(20);
                        setIsManual3D(true);
                      }}
                      className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-600 text-stone-300 font-cinzel text-center"
                    >
                      Isometric Showcase
                    </button>

                    <button
                      onClick={() => {
                        setManualPitch(20);
                        setManualYaw(-20);
                        setIsManual3D(true);
                      }}
                      className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-600 text-stone-300 font-cinzel text-center"
                    >
                      Dynamic Reverse Tilt
                    </button>
                  </div>

                  {/* Manual Pitch & Yaw Sliders */}
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-cinzel text-stone-300">
                        <span>Pitch (X-Axis Elevation)</span>
                        <span className="font-mono text-amber-400">{manualPitch}°</span>
                      </div>
                      <input
                        type="range"
                        min="-35"
                        max="35"
                        step="1"
                        value={manualPitch}
                        onChange={(e) => {
                          setManualPitch(Number(e.target.value));
                          setIsManual3D(true);
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-cinzel text-stone-300">
                        <span>Yaw (Y-Axis Rotation)</span>
                        <span className="font-mono text-amber-400">{manualYaw}°</span>
                      </div>
                      <input
                        type="range"
                        min="-35"
                        max="35"
                        step="1"
                        value={manualYaw}
                        onChange={(e) => {
                          setManualYaw(Number(e.target.value));
                          setIsManual3D(true);
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Foil Shaders Deep Info */}
                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold block">
                    Foil Shader Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-300">
                    <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="font-cinzel font-bold text-amber-300 block">Gold Foil</span>
                      <p className="text-[11px] text-stone-300">Metallic gold specular highlights reflecting directional light.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="font-cinzel font-bold text-blue-300 block">Prismatic Hologram</span>
                      <p className="text-[11px] text-stone-300">Continuous chromatic spectrum shifting based on 3D angle.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="font-cinzel font-bold text-purple-300 block">Cosmic Nebula</span>
                      <p className="text-[11px] text-stone-300">Deep-space starfield with pulsing constellation particles.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="font-cinzel font-bold text-stone-300 block">Standard Matte</span>
                      <p className="text-[11px] text-stone-300">Uncoated high-contrast parchment aesthetic.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- TAB 5: ANATOMICAL BLUEPRINT ---------------- */}
            {activeTab === 'anatomy' && card.breakdownItems && (
              <div className="space-y-3">
                <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold">
                  Material Specifications & Blueprint Callouts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {card.breakdownItems.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800">
                        {item.label}
                      </span>
                      <h5 className="font-cinzel font-bold text-sm text-stone-100 pt-1">
                        {item.title}
                      </h5>
                      <p className="text-xs text-stone-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- TAB 6: EVOLUTION TIERS ---------------- */}
            {activeTab === 'evolution' && card.evolutionTiers && (
              <div className="space-y-3">
                <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold">
                  Soul Awakening Progression Tiers
                </h4>
                <div className="space-y-2">
                  {card.evolutionTiers.map((tier, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-purple-400 font-bold block">
                          Tier {idx + 1}: {tier.tier}
                        </span>
                        <span className="font-cinzel font-bold text-sm text-amber-200">
                          {tier.name}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                        {tier.effect}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- TAB 7: REAL ARTWORK STUDIO & ASSET BINDING ---------------- */}
            {activeTab === 'artwork' && (
              <div className="space-y-5 animate-fade-in">
                {artNotice && (
                  <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-200 text-xs font-cinzel font-bold flex items-center justify-between shadow-lg">
                    <span>✨ {artNotice}</span>
                  </div>
                )}

                {/* Section Header */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={16} />
                      <span>Card Artwork Studio & Real Image Integration</span>
                    </h4>
                    <p className="text-stone-400 text-xs mt-1">
                      Domain Font: <strong className="text-amber-200">{domainIdentity.fontDisplayLabel}</strong> • Frame Silhouette: <strong className="text-amber-200">{domainIdentity.frameTitle}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={isGeneratingAiArt}
                      onClick={handleGenerateAiArt}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-cinzel font-black text-xs shadow-lg transition flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Wand2 size={14} className={isGeneratingAiArt ? 'animate-spin' : ''} />
                      <span>{isGeneratingAiArt ? 'Synthesizing...' : '1-Click Generate AI Art'}</span>
                    </button>
                    {currentCard?.artUrl && (
                      <button
                        type="button"
                        onClick={() => handleApplyArtUrl('')}
                        className="px-3 py-2 rounded-xl bg-stone-950 hover:bg-red-950/80 text-stone-400 hover:text-red-300 border border-stone-800 hover:border-red-700 text-xs font-mono transition flex items-center gap-1.5"
                      >
                        <RefreshCw size={13} />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Method 1: Upload from Computer */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
                    <Upload size={14} className="text-amber-400" />
                    <span>Method 1: Upload Image From Your Device</span>
                  </span>
                  <p className="text-stone-400 text-xs">
                    Select any JPG, PNG, or WebP illustration from your computer. The image is instantly embedded directly onto this card.
                  </p>
                  <label className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed border-stone-700 hover:border-amber-500/60 bg-stone-950/80 hover:bg-stone-950 cursor-pointer transition group">
                    <Upload size={22} className="text-stone-500 group-hover:text-amber-400 group-hover:scale-110 transition" />
                    <span className="text-xs font-cinzel font-bold text-stone-300 group-hover:text-amber-200 mt-2">
                      Click to Browse Files or Drag Image Here
                    </span>
                    <span className="text-[10px] font-mono text-stone-300 mt-1">
                      PNG, JPG, WEBP • Works completely in-browser
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Method 2: Paste Web Image URL */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
                    <Link size={14} className="text-amber-400" />
                    <span>Method 2: Paste Online Image URL</span>
                  </span>
                  <p className="text-stone-400 text-xs">
                    Paste a direct image link from ArtStation, Imgur, Pinterest, Discord CDN, Midjourney, or any image host.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customArtInput}
                      onChange={(e) => setCustomArtInput(e.target.value)}
                      placeholder="https://example.com/fantasy_champion_art.jpg"
                      className="flex-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 font-mono placeholder:text-stone-600 focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyArtUrl(customArtInput)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs shadow-md transition hover:scale-105 active:scale-95"
                    >
                      Apply URL
                    </button>
                  </div>
                </div>

                {/* Method 3: Pick from Curated Masterpiece Gallery */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-400" />
                      <span>Method 3: 1-Click Curated High-Fantasy Gallery</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">
                      {CURATED_CARD_ARTWORKS.length} Masterpieces Available
                    </span>
                  </div>
                  <p className="text-stone-400 text-xs">
                    Choose from authentic high-resolution AI fantasy paintings generated specifically for this card game universe:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {CURATED_CARD_ARTWORKS.map((art) => {
                      const isSelected = currentCard?.artUrl === art.url;
                      return (
                        <button
                          key={art.id}
                          type="button"
                          onClick={() => handleApplyArtUrl(art.url)}
                          className={`group relative rounded-xl overflow-hidden border text-left transition-all ${
                            isSelected
                              ? 'border-amber-400 ring-2 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                              : 'border-stone-800 hover:border-amber-500/60'
                          }`}
                        >
                          <div className="aspect-[4/3] w-full bg-stone-950 overflow-hidden relative">
                            <img
                              src={art.url}
                              alt={art.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-amber-500 text-black font-mono text-[9px] font-bold">
                                ACTIVE
                              </div>
                            )}
                          </div>
                          <div className="p-2 bg-stone-950/95 space-y-0.5">
                            <span className="font-cinzel font-bold text-xs text-amber-200 block truncate">
                              {art.title}
                            </span>
                            <span className="text-[10px] text-stone-400 block truncate">
                              {art.subtitle}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Method 4: AI Art Prompt Generator */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                      <Wand2 size={14} className="text-purple-400" />
                      <span>Method 4: Prompt for AI Studio / Midjourney / Stable Diffusion</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="px-3 py-1 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-700 text-xs font-mono flex items-center gap-1.5 transition"
                    >
                      {promptCopied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                      <span>{promptCopied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <p className="text-stone-400 text-xs">
                    Want to generate a custom image tailored specifically to <strong>{currentCard?.name || card.name}</strong>? Copy this optimized high-fantasy prompt:
                  </p>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-purple-200 select-all leading-relaxed">
                    {generateRecommendedArtPrompt(currentCard || card)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
