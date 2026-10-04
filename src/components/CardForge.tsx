import React, { useState, useEffect } from 'react';
import { Card, Domain, CardType, Rarity, AbilityProperty, PowerGlyph } from '../types';
import { CardItem } from './CardItem';
import { AbilityIcon } from './AbilityIcon';
import { CodexIconPicker, CodexIcon } from './CodexIconRegistry';
import { UNIVERSAL_POWER_GLYPHS } from '../data/powerGlyphsData';
import { MASTER_ABILITY_TEMPLATES, AbilityTemplate } from '../data/abilityTemplatesData';
import { VisionCardStudio } from './VisionCardStudio';
import { CardVisualValidationPanel, ValidationReport } from './CardVisualValidationPanel';
import { CardForgeSummaryModal } from './CardForgeSummaryModal';
import { saveCustomCard } from '../utils/customCardStorage';
import { soundEngine } from '../utils/audioEngine';
import { economyManager } from '../utils/economyManager';
import { missionsManager } from '../utils/missionsManager';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Save, 
  Copy, 
  Check, 
  Wand2, 
  Sliders, 
  Shield, 
  Sword, 
  Zap, 
  Star, 
  Layers, 
  Dices, 
  BookOpen, 
  Scale, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  Flame,
  Image as ImageIcon,
  Hammer,
  HelpCircle,
  Info,
  Compass,
  ArrowRight,
  Eye,
  Crown,
  Heart,
  ChevronDown,
  ChevronUp,
  Play
} from 'lucide-react';

interface CardForgeProps {
  onCardCreated: (newCard: Card) => void;
  onInspectCard: (card: Card) => void;
  onLaunchArena?: (card: Card) => void;
  onNavigateToCompendium?: (domain?: Domain) => void;
}

export const CardForge: React.FC<CardForgeProps> = ({
  onCardCreated,
  onInspectCard,
  onLaunchArena,
  onNavigateToCompendium
}) => {
  const [forgeMode, setForgeMode] = useState<'vision' | 'manual'>('vision');
  
  // Card attributes state
  const [name, setName] = useState('Blade of the Obsidian Eclipse');
  const [subtitle, setSubtitle] = useState('WEAPON (GREATSWORD), LEGENDARY (ATTUNEMENT REQUIRED)');
  const [domain, setDomain] = useState<Domain>('Radiance');
  const [cardType, setCardType] = useState<CardType>('Weapon');
  const [subtype, setSubtype] = useState('Greatsword / Magma Edge');
  const [rarity, setRarity] = useState<Rarity>('Legendary');
  const [cost, setCost] = useState(6);
  const [power, setPower] = useState(8);
  const [defense, setDefense] = useState(5);
  const [divineRank, setDivineRank] = useState(4);
  const [quote, setQuote] = useState('"Forged when the two suns clashed, it consumes starlight to ignite world-ending flame."');
  const [lore, setLore] = useState('Discovered deep within the abyssal crater of Sol-Thar. The edge continually radiates heat exceeding the surface of a star.');
  const [iconSymbol, setIconSymbol] = useState('⚔️');
  const [badgeText, setBadgeText] = useState('FORGED WEAPON');
  const [selectedIconId, setSelectedIconId] = useState('flame');
  const [showIconPicker, setShowIconPicker] = useState(false);

  // Guide and Informational Panels Visibility
  const [activeInfoGuide, setActiveInfoGuide] = useState<'none' | 'icons' | 'glyphs' | 'combat' | 'costs'>('none');

  // Gemini Balance Assessment state
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Power Glyphs selection (max 6)
  const [selectedGlyphIds, setSelectedGlyphIds] = useState<string[]>([
    'glyph-lava-control',
    'glyph-molten-burst',
    'glyph-magma-armor'
  ]);

  // 5-Axis Radar attributes
  const [attributes, setAttributes] = useState({
    damage: 8.5,
    durability: 6.0,
    mobility: 7.0,
    utility: 6.5,
    control: 8.0
  });

  // Abilities list
  const [abilities, setAbilities] = useState<AbilityProperty[]>([
    {
      id: 'forge-ab-1',
      name: 'Eclipse Cleave',
      type: 'Action',
      iconType: 'flame',
      description: 'Strike with superheated plasma edge dealing 4d8 fire damage and melting opponent armor.',
      damageDice: '4d8 Fire DMG',
      charges: '1/Turn'
    },
    {
      id: 'forge-ab-2',
      name: 'Sunfire Absorption',
      type: 'Passive',
      iconType: 'sun',
      description: 'Immune to fire damage; whenever fire spells are cast, gain +2 attack power.',
      charges: 'Passive'
    }
  ]);

  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Ability Templates Browser State
  const [showAbilityTemplatesModal, setShowAbilityTemplatesModal] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateDomainFilter, setTemplateDomainFilter] = useState<string>('All');
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string>('All');

  // Summary Confirmation & Visual Validation State
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [canSaveValidated, setCanSaveValidated] = useState(true);
  const [validationReport, setValidationReport] = useState<ValidationReport | null>(null);

  // Selected glyph objects
  const cardPowerGlyphs: PowerGlyph[] = UNIVERSAL_POWER_GLYPHS.filter(g => selectedGlyphIds.includes(g.id));

  // Generate complete card object
  const generatedCard: Card = {
    id: `CUSTOM-${Date.now()}`,
    name,
    subtitle,
    domain,
    cardType,
    subtype,
    cost,
    rarity,
    power,
    defense,
    divineRank,
    attunementRequired: true,
    quote,
    lore,
    aestheticTheme: domain === 'Radiance' ? 'volcanic-dark' : domain === 'Verdance' ? 'verdant-emerald' : domain === 'Arcane' ? 'astral-sapphire' : domain === 'Abyss' ? 'abyss-crimson' : 'parchment-gold',
    attributes,
    abilities,
    powerGlyphs: cardPowerGlyphs,
    artVisualTheme: {
      primaryColor: domain === 'Radiance' ? '#ef4444' : domain === 'Verdance' ? '#10b981' : domain === 'Arcane' ? '#3b82f6' : domain === 'Abyss' ? '#a855f7' : '#eab308',
      glowColor: domain === 'Radiance' ? '#b91c1c' : domain === 'Verdance' ? '#047857' : domain === 'Arcane' ? '#1d4ed8' : domain === 'Abyss' ? '#6b21a8' : '#ca8a04',
      bgGradient: 'from-stone-950 via-neutral-900 to-black',
      iconSymbol,
      badgeText
    }
  };

  const handleAddAbility = () => {
    soundEngine.playMicroSound('click');
    const newAb: AbilityProperty = {
      id: `forge-ab-${Date.now()}`,
      name: 'New Tactical Trait',
      type: 'Action',
      iconType: 'zap',
      description: 'Deals 3 damage and applies 1 turn Stun or Shield buff to target unit.',
      damageDice: '3 DMG',
      charges: '1/Turn'
    };
    setAbilities(prev => [...prev, newAb]);
  };

  const handleApplyAbilityTemplate = (tpl: AbilityTemplate) => {
    const newAb: AbilityProperty = {
      id: `tpl-applied-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: tpl.name,
      type: tpl.type,
      iconType: tpl.iconType,
      description: tpl.description,
      damageDice: tpl.damageDice,
      charges: tpl.charges
    };
    setAbilities(prev => [...prev, newAb]);
    soundEngine.playMicroSound('select');
  };

  const handleRemoveAbility = (idx: number) => {
    soundEngine.playMicroSound('click');
    setAbilities(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateAbility = (idx: number, field: keyof AbilityProperty, val: any) => {
    setAbilities(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
  };

  const handleToggleGlyph = (glyphId: string) => {
    soundEngine.playMicroSound('select');
    setSelectedGlyphIds(prev => {
      if (prev.includes(glyphId)) {
        return prev.filter(id => id !== glyphId);
      } else {
        if (prev.length >= 6) return prev; // max 6 glyphs per card
        return [...prev, glyphId];
      }
    });
  };

  const handleApplyQuickFix = (targetField: string, recommendedValue: any) => {
    if (targetField === 'domain') {
      setDomain(recommendedValue as Domain);
    } else if (targetField === 'cost') {
      setCost(Number(recommendedValue));
    } else if (targetField === 'power') {
      setPower(Number(recommendedValue));
    } else if (targetField === 'defense') {
      setDefense(Number(recommendedValue));
    } else if (targetField === 'cardType') {
      setCardType(recommendedValue as CardType);
    }
  };

  const commitCardToDatabase = () => {
    soundEngine.playCombatClash('victory');

    // Economy & Crafting Reagents integration
    const currentEco = economyManager.getEconomy();
    const isHighRarity = rarity === 'Legendary' || rarity === 'Mythic' || rarity === 'Divine Boundless';
    const forgeCostShards = isHighRarity ? 100 : 30;
    const forgeCostDust = isHighRarity ? 10 : 0;

    if (currentEco.astralShards >= forgeCostShards && currentEco.cosmicDust >= forgeCostDust) {
      economyManager.spendCurrency(forgeCostShards, forgeCostDust);
      economyManager.grantXp(75);
    } else {
      // Grace period / apprentice forge: award novice XP
      economyManager.grantXp(25);
    }

    // Daily Missions progress update
    missionsManager.incrementProgress('forge', 1);
    missionsManager.incrementProgress('collection', 1);

    // Persist to unlimited IndexedDB and quota-safe localStorage
    saveCustomCard(generatedCard).catch(e => {
      console.warn('Card save notice:', e);
    });

    onCardCreated(generatedCard);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveCard = () => {
    soundEngine.playMicroSound('select');
    // Open summary confirmation modal for preview and final commit
    setIsSummaryModalOpen(true);
  };

  const handleCopyJson = () => {
    soundEngine.playMicroSound('click');
    navigator.clipboard.writeText(JSON.stringify(generatedCard, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run Gemini Balance Assessment
  const handleRunBalanceAssessment = async () => {
    setIsAssessing(true);
    soundEngine.playMicroSound('select');
    try {
      const response = await fetch('/api/forge/balance-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card: generatedCard })
      });

      if (!response.ok) {
        throw new Error(`Assessment failed: ${response.statusText}`);
      }

      const data = await response.json();
      setAssessmentData(data.assessment);
      setIsAssessmentModalOpen(true);
      soundEngine.playMicroSound('unlock');
    } catch (err: any) {
      console.error('Balance assessment fallback:', err);
      // Fallback local heuristic assessment
      const actualStat = power + defense;
      const expectedStat = Math.round(cost * 2.2 + 2);
      const isOvertuned = actualStat > expectedStat + 3;
      const isUnderpowered = actualStat < expectedStat - 3;
      const score = isOvertuned ? 6.5 : isUnderpowered ? 6.0 : 8.5;
      
      setAssessmentData({
        balanceScore: score,
        verdict: isOvertuned ? 'Slightly Overtuned' : isUnderpowered ? 'Underpowered' : 'Balanced',
        summary: `Card exhibits total stats of ${actualStat} against an expected baseline of ${expectedStat} at ${cost} Essence cost.`,
        statEfficiency: {
          actualStatTotal: actualStat,
          expectedStatTotal: expectedStat,
          discrepancyRatio: Number((actualStat / expectedStat).toFixed(2)),
          rating: isOvertuned ? 'Over-budget' : isUnderpowered ? 'Under-budget' : 'Optimally Budgeted'
        },
        tacticalAxisScores: {
          damageScore: Math.min(10, power * 1.0),
          durabilityScore: Math.min(10, defense * 1.0),
          mobilityScore: attributes.mobility,
          utilityScore: attributes.utility,
          controlScore: attributes.control
        },
        domainCohesion: `Strong alignment with the ${domain} domain identity and color pie mechanics.`,
        exploitRisks: isOvertuned 
          ? ['Potential high burst damage in mid-game turns.']
          : ['Safe mechanical profile without un-interactable loop risk.'],
        adjustmentSuggestions: {
          recommendedCost: isOvertuned ? cost + 1 : cost,
          recommendedPower: isOvertuned ? Math.max(1, power - 1) : power,
          recommendedDefense: defense,
          suggestedAbilityTweaks: ['Maintain 1/Turn restriction on triggered properties.'],
          rationale: 'Adjusting cost/power brings the card in line with competitive standard tournaments.'
        }
      });
      setIsAssessmentModalOpen(true);
      soundEngine.playMicroSound('unlock');
    } finally {
      setIsAssessing(false);
    }
  };

  const handleApplySuggestions = () => {
    if (!assessmentData?.adjustmentSuggestions) return;
    const { recommendedCost, recommendedPower, recommendedDefense } = assessmentData.adjustmentSuggestions;
    if (typeof recommendedCost === 'number') setCost(recommendedCost);
    if (typeof recommendedPower === 'number') setPower(recommendedPower);
    if (typeof recommendedDefense === 'number') setDefense(recommendedDefense);
    
    soundEngine.playMicroSound('unlock');
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  return (
    <div className="w-full min-w-0 flex flex-col gap-6 animate-fade-in">
      
      {/* ================= FORGE MODE SWITCHER BAR ================= */}
      <div className="flex items-center justify-center">
        <div className="p-2 rounded-3xl bg-stone-950 border-2 border-stone-800 shadow-2xl flex items-center gap-2">
          <button
            onClick={() => {
              setForgeMode('vision');
              soundEngine.playMicroSound('click');
            }}
            className={`px-6 py-3 rounded-2xl font-cinzel font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all duration-200 ${
              forgeMode === 'vision'
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] border border-purple-400/50 scale-105 ring-2 ring-purple-400/40'
                : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900 border border-transparent'
            }`}
          >
            <ImageIcon size={18} className="text-amber-300" />
            <span>🎨 Vision Art Studio (Upload & Synthesize)</span>
          </button>

          <button
            onClick={() => {
              setForgeMode('manual');
              soundEngine.playMicroSound('click');
            }}
            className={`px-6 py-3 rounded-2xl font-cinzel font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all duration-200 ${
              forgeMode === 'manual'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black shadow-[0_0_25px_rgba(234,179,8,0.5)] scale-105 ring-2 ring-amber-400'
                : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900 border border-transparent'
            }`}
          >
            <Hammer size={18} />
            <span>🔨 Manual Smithing & Power Curve</span>
          </button>
        </div>
      </div>

      {/* Vision Mode Active */}
      {forgeMode === 'vision' ? (
        <VisionCardStudio
          onCardCreated={onCardCreated}
          onInspectCard={onInspectCard}
          onLaunchArena={onLaunchArena}
        />
      ) : (
        <>
          {/* ================= HEADER BANNER & ACTION CONTROLS ================= */}
          <div className="p-6 rounded-3xl bg-stone-950 border-2 border-amber-500/40 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Hammer size={20} />
                </span>
                <div>
                  <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Nexus Card Smithing Forge v3.0
                  </span>
                  <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100 leading-tight">
                    Custom Card Creator & Balance Forge
                  </h2>
                </div>
              </div>
              <p className="text-stone-300 text-xs max-w-2xl leading-relaxed">
                Forge divine relics, vanguard units, spells, weapons, or titan beasts with precision glyph engraving, 5-axis stat balancing, and tournament power curve validation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Balance Assessment Button */}
              <button
                type="button"
                id="btn-balance-assessment"
                onClick={handleRunBalanceAssessment}
                disabled={isAssessing}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 hover:from-purple-800 hover:to-indigo-800 text-purple-200 border-2 border-purple-500/60 text-xs font-cinzel font-black flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition hover:scale-105 active:scale-95 disabled:opacity-50"
                title="Run Gemini 3.7 Balance Assessment"
              >
                {isAssessing ? (
                  <>
                    <RefreshCw size={15} className="animate-spin text-purple-300" />
                    <span>Analyzing Curve...</span>
                  </>
                ) : (
                  <>
                    <Scale size={15} className="text-purple-300" />
                    <span>Balance Assessment</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyJson}
                className="px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono flex items-center gap-1.5 border border-stone-700 shadow-md transition hover:scale-105 active:scale-95"
              >
                {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
                <span>{copied ? 'Copied JSON' : 'Export JSON'}</span>
              </button>

              <button
                onClick={handleSaveCard}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center gap-2 transition hover:scale-105 active:scale-95"
              >
                <Save size={16} />
                <span>{savedSuccess ? 'Saved to Codex & Domain!' : 'Forge & Save Card'}</span>
              </button>
            </div>
          </div>

          {/* ================= COMPREHENSIVE INFORMATION & GUIDELINES HUD ================= */}
          <div className="p-4 rounded-3xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-amber-400" />
                <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-amber-200">
                  Interactive Card Design Guidelines & Rulebook Registry
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'icons', label: 'Icon Registry & Sigils', icon: Sparkles },
                  { id: 'glyphs', label: 'Power Glyphs & Sockets', icon: Dices },
                  { id: 'combat', label: 'Combat & 5-Axis Radar', icon: Sword },
                  { id: 'costs', label: 'Resource & Momentum', icon: Zap }
                ].map(tab => {
                  const isActive = activeInfoGuide === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveInfoGuide(activeInfoGuide === tab.id ? 'none' : tab.id as any);
                        soundEngine.playMicroSound('select');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-cinzel text-[11px] font-bold flex items-center gap-1.5 transition ${
                        isActive
                          ? 'bg-amber-500 text-black shadow-md font-black scale-105'
                          : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                      }`}
                    >
                      <Icon size={12} />
                      <span>{tab.label}</span>
                      {isActive ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guide Panel: Icon Registry */}
            {activeInfoGuide === 'icons' && (
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 text-xs space-y-3 animate-fade-in">
                <h4 className="font-cinzel font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>Codex Icon Registry & Persistent Symbols Guide</span>
                </h4>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Every card in Realm of Nexus incorporates standardized, persistent icons across all 5 domains. These symbols define the elemental attunement, combat posture, and ability trigger types.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-[11px]">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <span className="font-bold font-cinzel text-amber-200 block">1. Domain Crests</span>
                    <p className="text-stone-400">🛡️ <strong>Sanctuary</strong> (Holy/Order), 🌋 <strong>Radiance</strong> (Solar/Magma), 🌿 <strong>Verdance</strong> (Nature/Primal), 🔮 <strong>Arcane</strong> (Cosmos/Time), 💀 <strong>Abyss</strong> (Void/Decay).</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <span className="font-bold font-cinzel text-red-300 block">2. Tactical Action Glyphs</span>
                    <p className="text-stone-400">⚔️ <strong>Direct Strike</strong>, 🛡️ <strong>Armor/Ward</strong>, 🔥 <strong>Burn Tick</strong>, ⚡ <strong>Chain Shock</strong>, 💀 <strong>Deathtouch</strong>, 💖 <strong>Heal/Regen</strong>, 👁️ <strong>Stasis/Root</strong>, ⏳ <strong>Rewind</strong>.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <span className="font-bold font-cinzel text-purple-300 block">3. Card Rendering Placement</span>
                    <p className="text-stone-400">Emblems render at the top header and bottom power bar. Tactical ability icons render directly adjacent to ability names on physical cards.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Guide Panel: Power Glyphs */}
            {activeInfoGuide === 'glyphs' && (
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 text-xs space-y-3 animate-fade-in">
                <h4 className="font-cinzel font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Dices size={16} className="text-amber-400" />
                  <span>Power Glyphs & Socket Rules Guide</span>
                </h4>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Power Glyphs represent engraved planar runes embedded into a card. Each card can hold up to 6 active glyph sockets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-[11px]">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <span className="font-bold font-cinzel text-amber-200 block">Glyph Sockets (1-6)</span>
                    <p className="text-stone-400">Sockets unlock based on Divine Rank (★1-5). Higher-tier cards can hold more simultaneous glyph synergies.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <span className="font-bold font-cinzel text-emerald-300 block">Trigger Timings</span>
                    <p className="text-stone-400"><strong>Pre-Combat</strong> (before clash), <strong>Main Action</strong> (on attack), <strong>Fast Reaction</strong> (when targeted), <strong>Passive Aura</strong> (continuous), <strong>End Phase</strong>.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <span className="font-bold font-cinzel text-yellow-300 block">Dice Modifiers</span>
                    <p className="text-stone-400">Glyphs can add extra dice (e.g., +2d6 Fire, +3d8 Crushing) or apply persistent status conditions (Burn, Sunder, Freeze).</p>
                  </div>
                </div>
              </div>
            )}

            {/* Guide Panel: Combat & 5-Axis Radar */}
            {activeInfoGuide === 'combat' && (
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 text-xs space-y-3 animate-fade-in">
                <h4 className="font-cinzel font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Sword size={16} className="text-amber-400" />
                  <span>Combat Attributes & 5-Axis Radar System</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
                  <div className="space-y-2">
                    <span className="font-bold font-cinzel text-amber-200 block">Core Battlefield Stats:</span>
                    <ul className="space-y-1 text-stone-300 list-disc list-inside">
                      <li><strong>Attack Power (ATK):</strong> Baseline strike and ability damage dealt during combat phases.</li>
                      <li><strong>Defense / HP:</strong> Hull integrity and damage absorption before card is sent to Boneyard.</li>
                      <li><strong>Divine Stars (★1-5):</strong> Cosmic rank, determines attunement power and glyph capacity.</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <span className="font-bold font-cinzel text-blue-300 block">5-Axis Tactical Radar Dimensions:</span>
                    <ul className="space-y-1 text-stone-300 list-disc list-inside">
                      <li><strong>Damage:</strong> Burst and sustained offensive output.</li>
                      <li><strong>Durability:</strong> Armor, shields, and damage mitigation.</li>
                      <li><strong>Mobility:</strong> Lane-shifting agility and initiative priority.</li>
                      <li><strong>Utility:</strong> Card draw, resource siphoning, and cleansing.</li>
                      <li><strong>Control:</strong> Stuns, roots, silences, and battlefield denial.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Guide Panel: Resource & Momentum */}
            {activeInfoGuide === 'costs' && (
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 text-xs space-y-3 animate-fade-in">
                <h4 className="font-cinzel font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Zap size={16} className="text-amber-400" />
                  <span>Essence Costs & Momentum Mechanics</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <span className="font-bold font-cinzel text-amber-200 block">Essence Curve (1 to 10)</span>
                    <p className="text-stone-400">Players gain +1 max Essence each turn (Turns 1-10). Cards should follow stat budgeting: Total Stats (ATK+DEF) ≈ (Cost × 2.2) + 2.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <span className="font-bold font-cinzel text-purple-300 block">Momentum Engine Integration</span>
                    <p className="text-stone-400">Each round players roll Momentum dice (D6 Turns 1-5, D12 Turns 6-12). Unused momentum converts into Kinetic Stash or +2 Aether Shields.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= MAIN 2-COLUMN GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Form Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6 bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-2xl">
              
              {/* Quick Archetype Blueprints Quick-Loader */}
              <div className="p-3.5 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase">
                    <Sparkles size={13} />
                    <span>Quick Archetype Templates (Create Any Card)</span>
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">12 Types Supported</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '👑 Champion', type: 'Champion' as CardType, dom: 'Sanctuary' as Domain, n: 'Aurelius, Sun Champion', sub: 'CHAMPION, LEGENDARY', c: 6, p: 8, d: 8, costText: 'Vanguard Titan' },
                    { label: '⚡ Spell', type: 'Spell' as CardType, dom: 'Arcane' as Domain, n: 'Astral Supernova', sub: 'EVOCATION SPELL, RARE', c: 4, p: 7, d: 2, costText: 'Direct Damage' },
                    { label: '⚔️ Weapon', type: 'Weapon' as CardType, dom: 'Radiance' as Domain, n: 'Dawnfire Greatblade', sub: 'WEAPON (GREATSWORD)', c: 5, p: 8, d: 4, costText: 'Cleave Damage' },
                    { label: '🔮 Artifact', type: 'Artifact' as CardType, dom: 'Arcane' as Domain, n: 'Orb of Eternal Horizons', sub: 'COSMIC ARTIFACT, EPIC', c: 4, p: 3, d: 6, costText: 'Passive Mana' },
                    { label: '🛡️ Armor', type: 'Armor' as CardType, dom: 'Sanctuary' as Domain, n: 'Aegis of the Bastion', sub: 'HEAVY ARMOR, VERY RARE', c: 4, p: 2, d: 10, costText: 'Absorb Shield' },
                    { label: '🐺 Beast', type: 'Beast' as CardType, dom: 'Verdance' as Domain, n: 'Apex Primal Behemoth', sub: 'BEAST (TITAN), MYTHIC', c: 7, p: 9, d: 9, costText: 'Trample Charge' },
                    { label: '💎 Relic', type: 'Relic' as CardType, dom: 'Abyss' as Domain, n: 'Skull of the Shadow King', sub: 'ANCIENT RELIC, LEGENDARY', c: 5, p: 5, d: 7, costText: 'Soul Drain' },
                    { label: '🌌 Environment', type: 'Environment' as CardType, dom: 'Arcane' as Domain, n: 'The Shifting Eclipse Nexus', sub: 'ENVIRONMENT (FIELD)', c: 3, p: 0, d: 8, costText: 'Global Field' },
                    { label: '👥 Minion', type: 'Minion' as CardType, dom: 'Verdance' as Domain, n: 'Forest Sprite Skirmisher', sub: 'MINION (SWARM)', c: 2, p: 3, d: 2, costText: 'Fast Flanker' },
                    { label: '🕯️ Ritual', type: 'Ritual' as CardType, dom: 'Abyss' as Domain, n: 'Rite of the Blood Moon', sub: 'GRAND RITUAL (3 TURNS)', c: 5, p: 6, d: 6, costText: 'Delayed Apocalypse' },
                    { label: '🐲 Encounter', type: 'Encounter' as CardType, dom: 'Radiance' as Domain, n: 'Infernal Wyrm Boss Event', sub: 'ENCOUNTER (HAZARD)', c: 8, p: 10, d: 12, costText: 'Multi-Phase Boss' },
                    { label: '🧙 Character', type: 'Character' as CardType, dom: 'Arcane' as Domain, n: 'Archmage Zephyros', sub: 'CHARACTER HERO PERSONA', c: 7, p: 7, d: 8, costText: 'Hero Persona' }
                  ].map((arch, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        soundEngine.playMicroSound('select');
                        setCardType(arch.type);
                        setDomain(arch.dom);
                        setName(arch.n);
                        setSubtitle(arch.sub);
                        setCost(arch.c);
                        setPower(arch.p);
                        setDefense(arch.d);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/50 text-[10px] font-cinzel font-bold text-stone-300 hover:text-amber-200 transition flex items-center gap-1"
                    >
                      {arch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Identity & Classification */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
                  <h3 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles size={15} />
                    <span>Card Identity & Domain Classification</span>
                  </h3>
                  <span className="text-[10px] font-mono text-stone-300">
                    Domain: <strong className="text-amber-300">{domain}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-cinzel text-stone-300 block mb-1 font-bold">
                      Card Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-100 font-cinzel font-bold focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-cinzel text-stone-300 block mb-1 font-bold">
                      Subtitle / Classification
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-300 font-cinzel focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Domain & Card Type Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] font-cinzel text-stone-400 block mb-1 font-bold">Domain</label>
                    <select
                      value={domain}
                      onChange={(e) => {
                        setDomain(e.target.value as Domain);
                        soundEngine.playMicroSound('select');
                      }}
                      className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-200 font-cinzel font-bold focus:border-amber-500"
                    >
                      <option value="Sanctuary">🛡️ Sanctuary</option>
                      <option value="Radiance">🌋 Radiance</option>
                      <option value="Verdance">🌿 Verdance</option>
                      <option value="Arcane">🔮 Arcane</option>
                      <option value="Abyss">💀 Abyss</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-cinzel text-stone-400 block mb-1 font-bold">Card Type</label>
                    <select
                      value={cardType}
                      onChange={(e) => {
                        setCardType(e.target.value as CardType);
                        soundEngine.playMicroSound('select');
                      }}
                      className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-200 font-cinzel font-bold focus:border-amber-500"
                    >
                      <option value="Champion">👑 Champion</option>
                      <option value="Spell">⚡ Spell</option>
                      <option value="Weapon">⚔️ Weapon</option>
                      <option value="Artifact">🔮 Artifact</option>
                      <option value="Armor">🛡️ Armor</option>
                      <option value="Beast">🐺 Beast</option>
                      <option value="Relic">💎 Relic</option>
                      <option value="Environment">🌌 Environment</option>
                      <option value="Minion">👥 Minion</option>
                      <option value="Ritual">🕯️ Ritual</option>
                      <option value="Encounter">🐲 Encounter</option>
                      <option value="Character">🧙 Character</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-cinzel text-stone-400 block mb-1 font-bold">Rarity</label>
                    <select
                      value={rarity}
                      onChange={(e) => {
                        setRarity(e.target.value as Rarity);
                        soundEngine.playMicroSound('select');
                      }}
                      className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-200 font-cinzel font-bold focus:border-amber-500"
                    >
                      <option value="Common">Common</option>
                      <option value="Uncommon">Uncommon</option>
                      <option value="Rare">Rare</option>
                      <option value="Very Rare">Very Rare</option>
                      <option value="Legendary">Legendary</option>
                      <option value="Mythic">Mythic</option>
                      <option value="Divine Boundless">Divine Boundless</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-cinzel text-stone-400 block mb-1 font-bold">Emblem Symbol</label>
                    <input
                      type="text"
                      value={iconSymbol}
                      onChange={(e) => setIconSymbol(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-center text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Codex Icon Registry Picker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-1.5">
                  <h3 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} />
                    <span>Codex Icon Registry & Persistent Symbols</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowIconPicker(!showIconPicker);
                      soundEngine.playMicroSound('click');
                    }}
                    className="px-3 py-1 rounded-xl bg-stone-900 hover:bg-stone-800 text-xs font-mono text-amber-400 hover:text-amber-300 border border-stone-700 transition"
                  >
                    {showIconPicker ? 'Hide Icon Picker' : 'Browse Icon Library'}
                  </button>
                </div>

                {showIconPicker ? (
                  <CodexIconPicker
                    value={selectedIconId}
                    onChange={(iconId, sym) => {
                      setSelectedIconId(iconId);
                      setIconSymbol(sym);
                      soundEngine.playMicroSound('select');
                    }}
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800">
                    <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-500/50 shadow-inner">
                      <CodexIcon iconId={selectedIconId} size={26} withGlow={true} />
                    </div>
                    <div className="flex-1 text-xs">
                      <span className="font-cinzel font-bold text-amber-200 block capitalize">
                        Selected Primary Emblem: {selectedIconId} ({iconSymbol})
                      </span>
                      <span className="text-stone-300 text-[11px]">
                        Renders in the card header and footer emblem sockets. Consistent across all game views.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Engraved Power Glyphs Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-1.5">
                  <h3 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Dices size={14} />
                    <span>Engraved Power Glyphs ({selectedGlyphIds.length}/6 Sockets)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-stone-300">
                    Tap to toggle glyphs
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {UNIVERSAL_POWER_GLYPHS.map(glyph => {
                    const isSelected = selectedGlyphIds.includes(glyph.id);
                    return (
                      <button
                        key={glyph.id}
                        type="button"
                        onClick={() => handleToggleGlyph(glyph.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex items-start gap-2 ${
                          isSelected
                            ? 'bg-amber-950/80 border-amber-500 shadow-md ring-2 ring-amber-400 scale-102'
                            : 'bg-stone-900/70 border-stone-800 hover:border-stone-700 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <span className="text-lg shrink-0 drop-shadow">{glyph.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-cinzel font-bold text-[11px] text-amber-100 truncate">
                            {glyph.name}
                          </div>
                          <div className="text-[9px] font-mono text-emerald-400">
                            {glyph.triggerTiming || glyph.timing}
                          </div>
                          <div className="text-[8px] text-stone-300 truncate mt-0.5">
                            {glyph.ruleClause}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Combat Stats & Resource Cost */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-1.5">
                  <h3 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sword size={14} />
                    <span>Combat Attributes & Resource Budget</span>
                  </h3>
                  <span className="text-[10px] font-mono text-stone-300">
                    Expected Stat Target: ~{Math.round(cost * 2.2 + 2)}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 rounded-2xl bg-stone-900 border border-amber-500/40">
                    <label className="text-[10px] font-cinzel text-amber-400 block mb-1 font-bold">Essence Cost</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={cost}
                      onChange={(e) => setCost(Number(e.target.value))}
                      className="w-full py-1.5 rounded-xl bg-stone-950 border border-amber-500 text-center font-mono font-black text-amber-300 text-base focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-2xl bg-stone-900 border border-red-500/40">
                    <label className="text-[10px] font-cinzel text-red-400 block mb-1 font-bold">Attack Power</label>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={power}
                      onChange={(e) => setPower(Number(e.target.value))}
                      className="w-full py-1.5 rounded-xl bg-stone-950 border border-red-500 text-center font-mono font-black text-red-300 text-base focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-2xl bg-stone-900 border border-blue-500/40">
                    <label className="text-[10px] font-cinzel text-blue-400 block mb-1 font-bold">Defense / HP</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={defense}
                      onChange={(e) => setDefense(Number(e.target.value))}
                      className="w-full py-1.5 rounded-xl bg-stone-950 border border-blue-500 text-center font-mono font-black text-blue-300 text-base focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-2xl bg-stone-900 border border-yellow-500/40">
                    <label className="text-[10px] font-cinzel text-yellow-400 block mb-1 font-bold">Divine Stars</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={divineRank}
                      onChange={(e) => setDivineRank(Number(e.target.value))}
                      className="w-full py-1.5 rounded-xl bg-stone-950 border border-yellow-500 text-center font-mono font-black text-yellow-300 text-base focus:outline-none"
                    />
                  </div>
                </div>

                {/* 5-Axis Radar Sliders */}
                <div className="p-3.5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <span className="font-cinzel text-[11px] font-bold text-stone-300 uppercase tracking-wider block">
                    5-Axis Radar Metrics Tuning
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[10px] font-mono">
                    {Object.entries(attributes).map(([axis, val]) => (
                      <div key={axis} className="space-y-1">
                        <div className="flex justify-between text-stone-400 capitalize">
                          <span>{axis}</span>
                          <span className="text-amber-300 font-bold">{val}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={val}
                          onChange={(e) => {
                            setAttributes(prev => ({ ...prev, [axis]: Number(e.target.value) }));
                          }}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Tactical Abilities & Traits */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider">
                      Tactical Abilities & Traits ({abilities.length})
                    </h3>
                    <span className="text-[10px] font-mono text-stone-300">
                      Persistent Icons on Card
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAbilityTemplatesModal(true);
                        soundEngine.playMicroSound('click');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black text-xs font-cinzel font-black flex items-center gap-1.5 shadow-md transition hover:scale-105 active:scale-95"
                    >
                      <BookOpen size={13} />
                      <span>Pre-Made Templates ({MASTER_ABILITY_TEMPLATES.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddAbility}
                      className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-200 text-xs font-cinzel font-bold flex items-center gap-1 transition hover:scale-105 active:scale-95"
                    >
                      <Plus size={13} />
                      <span>Custom Trait</span>
                    </button>
                  </div>
                </div>

                {/* Ability Template Selector Modal */}
                {showAbilityTemplatesModal && (
                  <div className="p-4 rounded-3xl bg-stone-950 border-2 border-amber-500/70 shadow-2xl space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="text-amber-400" size={18} />
                        <span className="font-cinzel font-black text-sm text-amber-200 uppercase tracking-wider">
                          Master Ability & Skill Codex Templates
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAbilityTemplatesModal(false);
                          soundEngine.playMicroSound('click');
                        }}
                        className="p-1.5 rounded-xl bg-stone-900 text-stone-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Filter Controls */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={templateSearch}
                        onChange={(e) => setTemplateSearch(e.target.value)}
                        placeholder="Search pre-made tactical abilities by name, buff or damage type..."
                        className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      />

                      {/* Domain Filter Pills */}
                      <div className="flex flex-wrap items-center gap-1 text-[10px] font-cinzel">
                        {['All', 'Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss', 'Neutral', 'Equipment'].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              setTemplateDomainFilter(d);
                              soundEngine.playMicroSound('select');
                            }}
                            className={`px-2.5 py-1 rounded-xl border transition ${
                              templateDomainFilter === d
                                ? 'bg-amber-500 text-black font-black border-amber-400 shadow'
                                : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-600'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>

                      {/* Category Filter Pills */}
                      <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono">
                        {['All', 'Offensive', 'Defensive', 'Support', 'Control', 'Ultimate'].map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setTemplateCategoryFilter(cat);
                              soundEngine.playMicroSound('select');
                            }}
                            className={`px-2 py-0.5 rounded-lg border transition ${
                              templateCategoryFilter === cat
                                ? 'bg-purple-900 text-purple-200 border-purple-400 font-bold'
                                : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filtered Templates Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                      {MASTER_ABILITY_TEMPLATES.filter((tpl) => {
                        const matchesSearch =
                          tpl.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
                          tpl.description.toLowerCase().includes(templateSearch.toLowerCase());
                        const matchesDomain =
                          templateDomainFilter === 'All' || tpl.domain === templateDomainFilter;
                        const matchesCat =
                          templateCategoryFilter === 'All' || tpl.category === templateCategoryFilter;
                        return matchesSearch && matchesDomain && matchesCat;
                      }).map((tpl) => {
                        return (
                          <div
                            key={tpl.id}
                            className="p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-400/80 transition flex flex-col justify-between space-y-2 shadow-md group"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <div className="flex items-center gap-2 min-w-0">
                                <AbilityIcon type={tpl.iconType || 'zap'} size={16} className="shrink-0" />
                                <span className="font-cinzel font-bold text-xs text-amber-200 group-hover:text-amber-100 truncate">
                                  {tpl.name}
                                </span>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-stone-300 border border-stone-800 shrink-0">
                                {tpl.domain}
                              </span>
                            </div>

                            <p className="text-[11px] text-stone-300 leading-relaxed">
                              {tpl.description}
                            </p>

                            <div className="flex items-center justify-between pt-1.5 border-t border-stone-800 text-[10px] font-mono">
                              <div className="flex items-center gap-2">
                                {tpl.damageDice && (
                                  <span className="text-red-400 font-bold">{tpl.damageDice}</span>
                                )}
                                <span className="text-purple-300 font-bold">{tpl.type}</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleApplyAbilityTemplate(tpl)}
                                className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel font-black text-[10px] shadow transition hover:scale-105 active:scale-95"
                              >
                                + Apply Trait
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Active Abilities List */}
                <div className="space-y-3">
                  {abilities.map((ab, idx) => (
                    <div key={ab.id || idx} className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={ab.name}
                          onChange={(e) => handleUpdateAbility(idx, 'name', e.target.value)}
                          placeholder="Ability Name"
                          className="px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-700 text-xs font-cinzel font-bold text-amber-200 flex-1"
                        />

                        <select
                          value={ab.iconType}
                          onChange={(e) => handleUpdateAbility(idx, 'iconType', e.target.value)}
                          className="px-2.5 py-1.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-200 font-mono"
                        >
                          <option value="sword">⚔️ Sword</option>
                          <option value="shield">🛡️ Shield</option>
                          <option value="flame">🔥 Flame</option>
                          <option value="zap">⚡ Zap</option>
                          <option value="sparkles">✨ Sparkles</option>
                          <option value="skull">💀 Skull</option>
                          <option value="eye">👁️ Eye</option>
                          <option value="heart">💖 Heart</option>
                          <option value="moon">🌙 Moon</option>
                          <option value="sun">☀️ Sun</option>
                          <option value="crown">👑 Crown</option>
                          <option value="hourglass">⏳ Hourglass</option>
                        </select>

                        <button
                          onClick={() => handleRemoveAbility(idx)}
                          className="p-1.5 rounded-xl text-stone-500 hover:text-red-400 hover:bg-stone-950 transition"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={ab.description}
                        onChange={(e) => handleUpdateAbility(idx, 'description', e.target.value)}
                        placeholder="Ability effect, damage formulas, and mechanical buffs/debuffs..."
                        className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-300 focus:outline-none"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={ab.damageDice || ''}
                          onChange={(e) => handleUpdateAbility(idx, 'damageDice', e.target.value)}
                          placeholder="Damage notation (e.g. 4d8 Fire)"
                          className="px-2.5 py-1 rounded-xl bg-stone-950 border border-stone-700 text-xs font-mono text-red-400"
                        />
                        <input
                          type="text"
                          value={ab.charges || ''}
                          onChange={(e) => handleUpdateAbility(idx, 'charges', e.target.value)}
                          placeholder="Charges (e.g. 1/Turn, Passive)"
                          className="px-2.5 py-1 rounded-xl bg-stone-950 border border-stone-700 text-xs font-mono text-stone-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Lore & Quotations */}
              <div className="space-y-3">
                <h3 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider border-b border-stone-800/80 pb-1.5">
                  Lore & Quotations
                </h3>

                <div>
                  <label className="text-[10px] font-cinzel text-stone-400 block mb-1">Flavor Quote</label>
                  <input
                    type="text"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs font-garamond italic text-amber-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-cinzel text-stone-400 block mb-1">Historical Origins & Lore</label>
                  <textarea
                    rows={2}
                    value={lore}
                    onChange={(e) => setLore(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-300"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Live Card Holographic Preview (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-start gap-4">
              <div className="w-full p-5 rounded-3xl bg-stone-950 border-2 border-stone-800 text-center sticky top-24 shadow-2xl">
                <div className="flex items-center justify-between mb-4 px-1">
                  <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Live Holographic Card Render
                  </span>
                  <button
                    type="button"
                    onClick={handleRunBalanceAssessment}
                    disabled={isAssessing}
                    className="px-3 py-1 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/50 text-[11px] font-cinzel font-bold text-purple-300 flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                  >
                    <Scale size={13} />
                    <span>{isAssessing ? 'Checking...' : 'Check Balance'}</span>
                  </button>
                </div>
                
                <div className="flex justify-center">
                  <CardItem
                    card={generatedCard}
                    size="lg"
                    foilType="prismatic"
                    onInspect={() => onInspectCard(generatedCard)}
                  />
                </div>
                
                <p className="text-[11px] font-mono text-stone-300 mt-4">
                  Move cursor over card for 3D tilt & dynamic foil illumination
                </p>

                {/* Gemini Visual & Combat Consistency Validation Panel */}
                <div className="pt-4 mt-4 border-t border-stone-800/80">
                  <CardVisualValidationPanel
                    card={generatedCard}
                    onApplyQuickFix={handleApplyQuickFix}
                    onValidationStatusChange={(canSave, rep) => {
                      setCanSaveValidated(canSave);
                      setValidationReport(rep);
                    }}
                  />
                </div>

                {/* Quick Navigation / Action Links */}
                <div className="pt-4 mt-2 border-t border-stone-800/80 flex flex-col gap-2">
                  <button
                    id="btn-forge-and-save"
                    onClick={handleSaveCard}
                    disabled={!canSaveValidated}
                    className={`w-full py-2.5 rounded-2xl font-cinzel font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition ${
                      canSaveValidated
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black hover:scale-105 active:scale-95'
                        : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Save size={15} />
                    <span>
                      {!canSaveValidated 
                        ? 'Resolve Visual Tension to Save' 
                        : savedSuccess 
                        ? 'Saved to Codex!' 
                        : 'Review & Commit to Codex'}
                    </span>
                  </button>

                  {!canSaveValidated && (
                    <p className="text-[10px] text-amber-400 text-center font-mono">
                      Resolve flagged inconsistency above or toggle "Acknowledge & Override" to proceed.
                    </p>
                  )}

                  {onNavigateToCompendium && (
                    <button
                      onClick={() => {
                        soundEngine.playMicroSound('click');
                        onNavigateToCompendium(domain);
                      }}
                      className="w-full py-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-cinzel font-bold border border-amber-500/30 flex items-center justify-center gap-1.5 transition hover:scale-105"
                    >
                      <Compass size={14} />
                      <span>View in Domain Compendium</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= CARD FORGE SUMMARY CONFIRMATION MODAL ================= */}
          <CardForgeSummaryModal
            isOpen={isSummaryModalOpen}
            onClose={() => setIsSummaryModalOpen(false)}
            onConfirmSave={commitCardToDatabase}
            card={generatedCard}
            assessmentData={assessmentData}
            validationReport={validationReport}
            onInspectCard={onInspectCard}
          />

          {/* ================= GEMINI BALANCE ASSESSMENT MODAL ================= */}
          {isAssessmentModalOpen && assessmentData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
              <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-stone-950 border-2 border-purple-500/60 shadow-[0_0_50px_rgba(168,85,247,0.3)] p-6 text-stone-200">
                {/* Close Button */}
                <button
                  type="button"
                  id="close-balance-modal"
                  onClick={() => {
                    soundEngine.playMicroSound('click');
                    setIsAssessmentModalOpen(false);
                  }}
                  className="absolute top-5 right-5 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition"
                >
                  <X size={16} />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-3 border-b border-purple-500/30 pb-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-950/90 border border-purple-500/60 flex items-center justify-center text-purple-300 shadow-md">
                    <Scale size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel text-xs uppercase tracking-widest text-purple-400 font-bold">
                        Nexus Power Curve Suite
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-400/30 text-[9px] font-mono text-purple-200">
                        Gemini 3.7 Intelligence
                      </span>
                    </div>
                    <h3 className="font-cinzel font-black text-xl text-amber-100">
                      Balance & Power Curve Assessment
                    </h3>
                  </div>
                </div>

                {/* Verdict & Score Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-cinzel uppercase text-purple-300 tracking-wider font-bold">
                      Curve Balance Score
                    </span>
                    <span className="text-3xl font-black font-cinzel text-amber-300 mt-1">
                      {assessmentData.balanceScore} <span className="text-xs text-stone-400 font-mono">/ 10</span>
                    </span>
                    <div className="w-full bg-stone-900 h-2 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-amber-400"
                        style={{ width: `${Math.min(100, assessmentData.balanceScore * 10)}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 sm:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-cinzel uppercase text-stone-400 tracking-wider">
                          Evaluation Verdict
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                          assessmentData.verdict.includes('Balanced') 
                            ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                            : assessmentData.verdict.includes('Over')
                            ? 'bg-red-950/80 border border-red-500 text-red-300'
                            : 'bg-amber-950/80 border border-amber-500 text-amber-300'
                        }`}>
                          {assessmentData.verdict}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed mt-1">
                        {assessmentData.summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5-Axis Tactical Matrix Scores */}
                {assessmentData.tacticalAxisScores && (
                  <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 mb-5">
                    <span className="font-cinzel text-xs uppercase tracking-wider text-amber-300 font-bold block mb-3">
                      5-Axis Tactical Matrix Profiling
                    </span>
                    <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono">
                      {Object.entries(assessmentData.tacticalAxisScores).map(([axis, val]: [string, any]) => (
                        <div key={axis} className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                          <span className="text-stone-400 uppercase block text-[8px] truncate">
                            {axis.replace('Score', '')}
                          </span>
                          <span className="font-bold text-amber-300 text-sm block mt-0.5">
                            {typeof val === 'number' ? val.toFixed(1) : val}
                          </span>
                          <div className="h-1 bg-stone-800 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="h-full bg-amber-400"
                              style={{ width: `${Math.min(100, (Number(val) || 0) * 10)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stat Efficiency & Exploit Analysis */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  {/* Stat Efficiency */}
                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                    <span className="font-cinzel text-[11px] uppercase tracking-wider text-stone-300 font-bold flex items-center gap-1.5">
                      <Activity size={14} className="text-blue-400" />
                      <span>Stat-to-Cost Efficiency</span>
                    </span>
                    <div className="text-xs space-y-1 font-mono text-stone-300">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Total Stats (ATK+DEF):</span>
                        <span className="text-amber-300 font-bold">{assessmentData.statEfficiency?.actualStatTotal || (power + defense)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Target Curve Budget:</span>
                        <span className="text-stone-300">{assessmentData.statEfficiency?.expectedStatTotal || Math.round(cost * 2.2 + 2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-800 pt-1">
                        <span className="text-stone-400">Budget Rating:</span>
                        <span className="text-purple-300 font-bold">{assessmentData.statEfficiency?.rating || 'Nominal'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Exploit & Combos */}
                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                    <span className="font-cinzel text-[11px] uppercase tracking-wider text-stone-300 font-bold flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-amber-400" />
                      <span>Red-Team Risk Assessment</span>
                    </span>
                    <ul className="text-[11px] text-stone-300 space-y-1 list-disc list-inside">
                      {(assessmentData.exploitRisks || []).slice(0, 2).map((risk: string, i: number) => (
                        <li key={i} className="leading-tight text-stone-400">
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Adjustments & Auto-Tune */}
                {assessmentData.adjustmentSuggestions && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-stone-900/90 to-stone-950 border border-purple-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                        <Wand2 size={15} className="text-purple-400" />
                        <span>Balance Tuning Recommendations</span>
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="px-2.5 py-0.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                          Cost: <strong className="text-amber-300">{assessmentData.adjustmentSuggestions.recommendedCost}</strong>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                          ATK: <strong className="text-red-400">{assessmentData.adjustmentSuggestions.recommendedPower}</strong>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                          DEF: <strong className="text-blue-400">{assessmentData.adjustmentSuggestions.recommendedDefense}</strong>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 italic">
                      "{assessmentData.adjustmentSuggestions.rationale}"
                    </p>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playMicroSound('click');
                          setIsAssessmentModalOpen(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono border border-stone-700 transition"
                      >
                        Dismiss
                      </button>
                      <button
                        type="button"
                        id="btn-apply-suggestions"
                        onClick={handleApplySuggestions}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                      >
                        <CheckCircle2 size={15} />
                        <span>{appliedSuccess ? 'Adjustments Applied!' : 'Auto-Tune Stats'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
