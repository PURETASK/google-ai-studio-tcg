import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Card, Domain, CardType, Rarity, AbilityProperty, PowerGlyph } from '../types';
import { CardItem } from './CardItem';
import { UNIVERSAL_POWER_GLYPHS } from '../data/powerGlyphsData';
import { ALL_SYSTEM_ABILITY_TEMPLATES, AbilityTemplateCategory } from '../data/abilityTemplatesData';
import { VisionStudioAgentCouncil, CouncilRecommendation } from './VisionStudioAgentCouncil';
import { saveCustomCard, saveCustomCardsBatch } from '../utils/customCardStorage';
import { soundEngine } from '../utils/audioEngine';
import { 
  Upload, 
  Sparkles, 
  Image as ImageIcon, 
  Tag, 
  Edit3, 
  Check, 
  Copy, 
  RefreshCw, 
  Flame, 
  Shield, 
  Sword, 
  Zap, 
  Layers, 
  Wand2, 
  Play, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Palette, 
  Compass, 
  ChevronRight, 
  ChevronLeft,
  Info,
  Sliders,
  FileText,
  Save,
  Plus,
  Trash2,
  X,
  ListOrdered,
  CheckCheck,
  ArrowRight,
  HelpCircle,
  FolderOpen,
  BookOpen,
  Search,
  RotateCcw,
  Star,
  Activity,
  Maximize2
} from 'lucide-react';

export interface VisionAnalysisResult {
  artReview: {
    primarySubject: string;
    artStyle: string;
    compositionAndMood: string;
    elementalResonance: string;
    colorPalette: {
      hexCodes: string[];
      paletteMood: string;
    };
    detectedLabels: string[];
  };
  assetRename: {
    suggestedFileName: string;
    shortLabel: string;
    suggestedTitle: string;
  };
  cardData: {
    name: string;
    subtitle: string;
    alias?: string;
    domain: Domain;
    cardType: CardType;
    subtype: string;
    rarity: Rarity;
    cost: number;
    power: number;
    defense: number;
    divineRank?: number;
    laneRole?: 'Flank' | 'Center' | 'Support' | 'Universal';
    quote: string;
    lore: string;
    aestheticTheme?: 'parchment-gold' | 'volcanic-dark' | 'astral-sapphire' | 'verdant-emerald' | 'abyss-crimson';
    abilities: Array<{
      name: string;
      type: 'Action' | 'Passive' | 'Reaction' | 'Ultimate';
      iconType: any;
      description: string;
      damageDice?: string;
      charges?: string;
    }>;
    powerGlyphs?: Array<{
      name: string;
      shortTag: string;
      ruleClause: string;
      category: string;
    }>;
    attributes?: {
      damage: number;
      durability: number;
      mobility: number;
      utility: number;
      control: number;
    };
    powerAttributes?: {
      strength: number;
      speed: number;
      durability: number;
      energyOutput: number;
      fightingSkill: number;
      intelligence: number;
      control: number;
    };
  };
}

export interface UploadedImageItem {
  id: string;
  originalFileName: string;
  fileSize: string;
  mimeType: string;
  imagePreview: string;
  customPrompt?: string;
  status: 'pending' | 'analyzing' | 'synthesized' | 'forged' | 'error';
  errorMessage?: string;
  analysisResult?: VisionAnalysisResult;
  // Card details
  cardName: string;
  cardSubtitle: string;
  assetFileName: string;
  domain: Domain;
  cardType: CardType;
  subtype: string;
  rarity: Rarity;
  cost: number;
  power: number;
  defense: number;
  divineRank: number;
  quote: string;
  lore: string;
  abilities: AbilityProperty[];
  selectedGlyphIds: string[];
  attributes: {
    damage: number;
    durability: number;
    mobility: number;
    utility: number;
    control: number;
  };
}

// Curated high-fantasy sample images for testing immediately
const SAMPLE_GALLERY = [
  {
    id: 'sample-fire-dragon',
    title: 'Volcanic Drake',
    label: 'Molten Dragon in Ash Caldera',
    fileName: 'volcanic_ash_drake.png',
    domain: 'Radiance' as Domain,
    cardType: 'Beast' as CardType,
    rarity: 'Mythic' as Rarity,
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23180505"/><stop offset="50%" stop-color="%23450a0a"/><stop offset="100%" stop-color="%231c0505"/></linearGradient><linearGradient id="fire" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23f97316"/><stop offset="50%" stop-color="%23ef4444"/><stop offset="100%" stop-color="%23fbbf24"/></linearGradient></defs><rect width="600" height="400" fill="url(%23bg)"/><circle cx="300" cy="180" r="140" fill="%23b91c1c" opacity="0.3"/><path d="M150,320 C220,180 380,120 480,240 C430,300 280,340 150,320 Z" fill="%23260707" stroke="%23f97316" stroke-width="4"/><polygon points="480,240 540,210 500,280" fill="%23dc2626"/><polygon points="300,100 340,160 260,160" fill="url(%23fire)"/><circle cx="490" cy="235" r="8" fill="%23fef08a"/><text x="300" y="370" font-family="sans-serif" font-size="18" fill="%23fca5a5" font-weight="bold" text-anchor="middle">🔥 Crimson Ash Drake Artwork</text></svg>`
  },
  {
    id: 'sample-dawn-knight',
    title: 'Solar Dawn Paladin',
    label: 'Sunforged Champion with Radiant Greatsword',
    fileName: 'sunforged_dawn_paladin.png',
    domain: 'Sanctuary' as Domain,
    cardType: 'Champion' as CardType,
    rarity: 'Legendary' as Rarity,
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="goldbg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23422006"/><stop offset="50%" stop-color="%23713f12"/><stop offset="100%" stop-color="%231c1917"/></linearGradient><linearGradient id="blade" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="50%" stop-color="%23eab308"/><stop offset="100%" stop-color="%23ca8a04"/></linearGradient></defs><rect width="600" height="400" fill="url(%23goldbg)"/><circle cx="300" cy="150" r="100" fill="%23eab308" opacity="0.4"/><polygon points="290,40 310,40 315,260 285,260" fill="url(%23blade)" stroke="%23ffffff" stroke-width="2"/><polygon points="240,240 360,240 300,270" fill="%23a16207"/><rect x="290" y="270" width="20" height="70" fill="%23451a03"/><circle cx="300" cy="350" r="15" fill="%23eab308"/><text x="300" y="380" font-family="sans-serif" font-size="18" fill="%23fde047" font-weight="bold" text-anchor="middle">⚔️ Dawnseeker Greatsword Artwork</text></svg>`
  },
  {
    id: 'sample-void-sorceress',
    title: 'Astral Void Mage',
    label: 'Cosmic Sorceress weaving Singularity Runes',
    fileName: 'astral_void_sovereign.png',
    domain: 'Arcane' as Domain,
    cardType: 'Champion' as CardType,
    rarity: 'Mythic' as Rarity,
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="cosmicbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230f172a"/><stop offset="50%" stop-color="%231e1b4b"/><stop offset="100%" stop-color="%233b0764"/></linearGradient><radialGradient id="nebula" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23818cf8"/><stop offset="60%" stop-color="%23a855f7" stop-opacity="0.6"/><stop offset="100%" stop-color="%233b0764" stop-opacity="0"/></radialGradient></defs><rect width="600" height="400" fill="url(%23cosmicbg)"/><circle cx="300" cy="190" r="130" fill="url(%23nebula)"/><circle cx="300" cy="190" r="30" fill="%23020617" stroke="%23c084fc" stroke-width="4"/><circle cx="240" cy="140" r="4" fill="%23ffffff"/><circle cx="360" cy="130" r="5" fill="%23ffffff"/><circle cx="380" cy="250" r="4" fill="%23ffffff"/><text x="300" y="370" font-family="sans-serif" font-size="18" fill="%23c084fc" font-weight="bold" text-anchor="middle">🔮 Astral Void Sovereign Artwork</text></svg>`
  },
  {
    id: 'sample-grove-treant',
    title: 'Elderwood Colossus',
    label: 'Primal Treant with Ancient Moss & Runes',
    fileName: 'elderwood_colossus_primal.png',
    domain: 'Verdance' as Domain,
    cardType: 'Beast' as CardType,
    rarity: 'Legendary' as Rarity,
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="forest" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23022c22"/><stop offset="50%" stop-color="%23064e3b"/><stop offset="100%" stop-color="%23022c22"/></linearGradient></defs><rect width="600" height="400" fill="url(%23forest)"/><polygon points="300,60 420,280 180,280" fill="%23047857" stroke="%2334d399" stroke-width="3"/><rect x="270" y="280" width="60" height="80" fill="%2314532d"/><circle cx="270" cy="170" r="10" fill="%23a7f3d0"/><circle cx="330" cy="170" r="10" fill="%23a7f3d0"/><text x="300" y="380" font-family="sans-serif" font-size="18" fill="%236ee7b7" font-weight="bold" text-anchor="middle">🌿 Elderwood Sentinel Artwork</text></svg>`
  }
];

function createDefaultItem(id: string, fileName: string, size: string, mime: string, previewUrl: string, title?: string, domainHint?: Domain, cardTypeHint?: CardType, rarityHint?: Rarity): UploadedImageItem {
  const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  const titleCased = title || cleanName.replace(/\b\w/g, l => l.toUpperCase()) || 'Celestial Entity';
  const dom = domainHint || 'Radiance';
  const cType = cardTypeHint || 'Champion';
  const rar = rarityHint || 'Mythic';

  return {
    id,
    originalFileName: fileName,
    fileSize: size,
    mimeType: mime,
    imagePreview: previewUrl,
    status: 'pending',
    cardName: titleCased,
    cardSubtitle: `${cType.toUpperCase()} (MYTHIC ENTITY), ${rar.toUpperCase()}`,
    assetFileName: `${cleanName.toLowerCase().replace(/\s+/g, '_')}_nexus_card.png`,
    domain: dom,
    cardType: cType,
    subtype: 'Paragon / Nexus Entity',
    rarity: rar,
    cost: 6,
    power: 7,
    defense: 7,
    divineRank: 4,
    quote: '"Through mortal canvas, eternal glory is reborn upon the battlefield."',
    lore: `Manifested directly from the artist's upload. Possesses ancient resonance and high tactical mastery.`,
    abilities: [
      {
        id: `ab-${id}-1`,
        name: 'Primal Aether Surge',
        type: 'Action',
        iconType: 'flame',
        description: 'Unleashes the raw artistic energy of the card, dealing 4d6 damage to the opposing lane.',
        damageDice: '4d6 DMG',
        charges: '1/Turn'
      },
      {
        id: `ab-${id}-2`,
        name: 'Resonant Ward',
        type: 'Passive',
        iconType: 'shield',
        description: 'Gains +2 Armor and grants 1 Essence on first clash victory each round.',
        charges: 'Passive'
      }
    ],
    selectedGlyphIds: ['glyph-lava-control', 'glyph-molten-burst'],
    attributes: {
      damage: 8.0,
      durability: 7.5,
      mobility: 7.0,
      utility: 6.5,
      control: 7.0
    }
  };
}

interface VisionCardStudioProps {
  onCardCreated: (card: Card) => void;
  onInspectCard: (card: Card) => void;
  onLaunchArena?: (card: Card) => void;
}

export const VisionCardStudio: React.FC<VisionCardStudioProps> = ({
  onCardCreated,
  onInspectCard,
  onLaunchArena
}) => {
  // Multi-image Queue state
  const [items, setItems] = useState<UploadedImageItem[]>(() => [
    createDefaultItem(
      'init-1',
      SAMPLE_GALLERY[0].fileName,
      '420 KB',
      'image/svg+xml',
      SAMPLE_GALLERY[0].svgDataUri,
      'Ignis, The Ash-Crowned Drake',
      'Radiance',
      'Beast',
      'Mythic'
    )
  ]);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isBatchAnalyzing, setIsBatchAnalyzing] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedName, setCopiedName] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'review' | 'council' | 'stats' | 'abilities' | 'glyphs'>('review');
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateDomainFilter, setTemplateDomainFilter] = useState<string>('All');
  const [targetReplaceIndex, setTargetReplaceIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Selected Item
  const activeItem: UploadedImageItem | undefined = items[activeIndex] || items[0];

  // Helper to update active item
  const updateActiveItem = (updater: (prev: UploadedImageItem) => UploadedImageItem) => {
    if (!activeItem) return;
    setItems(prevItems => {
      const copy = [...prevItems];
      copy[activeIndex] = updater(copy[activeIndex]);
      return copy;
    });
  };

  // Apply Council Recommendations
  const handleApplyCouncilRecommendation = (rec: Partial<CouncilRecommendation>) => {
    updateActiveItem(prev => {
      let nextAbilities = prev.abilities;
      if (rec.abilities && rec.abilities.length > 0) {
        nextAbilities = rec.abilities;
      }
      return {
        ...prev,
        domain: rec.domain || prev.domain,
        cardType: rec.cardType || prev.cardType,
        subtype: rec.subtype || prev.subtype,
        rarity: rec.rarity || prev.rarity,
        cost: rec.cost !== undefined ? rec.cost : prev.cost,
        power: rec.power !== undefined ? rec.power : prev.power,
        defense: rec.defense !== undefined ? rec.defense : prev.defense,
        divineRank: rec.divineRank !== undefined ? rec.divineRank : prev.divineRank,
        cardName: rec.cardName || prev.cardName,
        cardSubtitle: rec.cardSubtitle || prev.cardSubtitle,
        quote: rec.quote || prev.quote,
        lore: rec.lore || prev.lore,
        abilities: nextAbilities,
        selectedGlyphIds: rec.glyphIds || prev.selectedGlyphIds,
        attributes: rec.attributes || prev.attributes
      };
    });
    setSaveSuccessMsg(`Agent Council findings applied to "${activeItem?.cardName || 'Card'}"!`);
    soundEngine.playMicroSound('equip');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Ability Template helpers
  const applyTemplateToCard = (template: AbilityProperty, replaceIndex?: number | null) => {
    if (!activeItem) return;
    const clonedAbility: AbilityProperty = {
      ...template,
      id: `vis-ab-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };

    updateActiveItem(it => {
      if (replaceIndex !== undefined && replaceIndex !== null && replaceIndex >= 0 && replaceIndex < it.abilities.length) {
        const nextAbs = [...it.abilities];
        nextAbs[replaceIndex] = clonedAbility;
        return { ...it, abilities: nextAbs };
      } else {
        return { ...it, abilities: [...it.abilities, clonedAbility] };
      }
    });

    soundEngine.playMicroSound('select');
    setShowTemplateModal(false);
    setTargetReplaceIndex(null);
  };

  const applyDomainStarterKit = (targetDomain: Domain) => {
    if (!activeItem) return;
    const cat = ALL_SYSTEM_ABILITY_TEMPLATES.find(c => c.domain === targetDomain);
    if (!cat || cat.templates.length === 0) return;

    const signatureTemplates = cat.templates.slice(0, 3).map((t, i) => ({
      ...t,
      id: `kit-${targetDomain.toLowerCase()}-${Date.now()}-${i}`
    }));

    updateActiveItem(it => ({
      ...it,
      abilities: signatureTemplates
    }));
    soundEngine.playMicroSound('unlock');
  };

  // Assembled Card object for the current active item
  const assembledActiveCard: Card = activeItem ? {
    id: `VISION-${activeItem.id}`,
    name: activeItem.cardName,
    subtitle: activeItem.cardSubtitle,
    domain: activeItem.domain,
    cardType: activeItem.cardType,
    subtype: activeItem.subtype,
    rarity: activeItem.rarity,
    cost: activeItem.cost,
    power: activeItem.power,
    defense: activeItem.defense,
    divineRank: activeItem.divineRank,
    attunementRequired: true,
    quote: activeItem.quote,
    lore: activeItem.lore,
    artUrl: activeItem.imagePreview || undefined,
    aestheticTheme: activeItem.domain === 'Radiance' ? 'volcanic-dark' : activeItem.domain === 'Verdance' ? 'verdant-emerald' : activeItem.domain === 'Arcane' ? 'astral-sapphire' : activeItem.domain === 'Abyss' ? 'abyss-crimson' : 'parchment-gold',
    attributes: activeItem.attributes,
    abilities: activeItem.abilities,
    powerGlyphs: UNIVERSAL_POWER_GLYPHS.filter(g => activeItem.selectedGlyphIds.includes(g.id)),
    artVisualTheme: {
      primaryColor: activeItem.domain === 'Radiance' ? '#ef4444' : activeItem.domain === 'Verdance' ? '#10b981' : activeItem.domain === 'Arcane' ? '#3b82f6' : activeItem.domain === 'Abyss' ? '#a855f7' : '#eab308',
      glowColor: activeItem.domain === 'Radiance' ? '#b91c1c' : activeItem.domain === 'Verdance' ? '#047857' : activeItem.domain === 'Arcane' ? '#1d4ed8' : activeItem.domain === 'Abyss' ? '#6b21a8' : '#ca8a04',
      bgGradient: 'from-stone-950 via-neutral-900 to-black',
      iconSymbol: activeItem.domain === 'Radiance' ? '🔥' : activeItem.domain === 'Verdance' ? '🌿' : activeItem.domain === 'Arcane' ? '🔮' : activeItem.domain === 'Abyss' ? '💀' : '🛡️',
      badgeText: `AI SYNTHESIZED ${activeItem.cardType.toUpperCase()}`
    }
  } : {} as any;

  // Process Multiple Files uploaded simultaneously
  const processMultipleFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    
    if (files.length === 0) {
      setErrorMsg('No valid image files found. Please upload PNG, JPG, WEBP, GIF, or SVG images.');
      return;
    }

    setErrorMsg(null);
    soundEngine.playMicroSound('hover');

    const newItems: UploadedImageItem[] = [];
    let completedCount = 0;

    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        const itemId = `img-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`;
        const sizeStr = `${(file.size / 1024).toFixed(1)} KB`;
        
        newItems.push(createDefaultItem(
          itemId,
          file.name,
          sizeStr,
          file.type,
          previewUrl
        ));

        completedCount++;
        if (completedCount === files.length) {
          setItems(prev => {
            const nextList = [...prev, ...newItems];
            // Select the first newly added item
            setActiveIndex(prev.length);
            return nextList;
          });
          soundEngine.playMicroSound('select');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processMultipleFiles(e.dataTransfer.files);
    }
  };

  // Clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        processMultipleFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Load All 4 Curated Sample Images into Queue
  const handleLoadAllSamples = () => {
    const sampleItems = SAMPLE_GALLERY.map((sample, idx) => 
      createDefaultItem(
        `sample-${sample.id}-${Date.now()}-${idx}`,
        sample.fileName,
        '350 KB',
        'image/svg+xml',
        sample.svgDataUri,
        sample.title,
        sample.domain,
        sample.cardType,
        sample.rarity
      )
    );

    setItems(sampleItems);
    setActiveIndex(0);
    soundEngine.playMicroSound('select');
  };

  // Single Item Analyzer Engine
  const analyzeSingleItem = async (item: UploadedImageItem): Promise<UploadedImageItem> => {
    try {
      const response = await fetch('/api/forge/analyze-image-to-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: item.imagePreview,
          mimeType: item.mimeType || 'image/png',
          originalFileName: item.originalFileName,
          customNotes: item.customPrompt || ''
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const result: VisionAnalysisResult = data.result;

      if (!result || !result.cardData) {
        throw new Error('Incomplete analysis data received from engine.');
      }

      const { cardData, assetRename, artReview } = result;

      // Match glyphs
      const matchingGlyphIds: string[] = [];
      if (cardData.powerGlyphs && cardData.powerGlyphs.length > 0) {
        cardData.powerGlyphs.forEach(g => {
          const match = UNIVERSAL_POWER_GLYPHS.find(ug => 
            ug.shortTag.toLowerCase().includes(g.shortTag.toLowerCase()) || 
            ug.name.toLowerCase().includes(g.name.toLowerCase())
          );
          if (match && !matchingGlyphIds.includes(match.id)) {
            matchingGlyphIds.push(match.id);
          }
        });
      }

      return {
        ...item,
        status: 'synthesized',
        analysisResult: result,
        cardName: cardData.name,
        cardSubtitle: cardData.subtitle,
        assetFileName: assetRename.suggestedFileName,
        domain: (cardData.domain as Domain) || item.domain,
        cardType: (cardData.cardType as CardType) || item.cardType,
        subtype: cardData.subtype || item.subtype,
        rarity: (cardData.rarity as Rarity) || item.rarity,
        cost: cardData.cost || item.cost,
        power: cardData.power || item.power,
        defense: cardData.defense || item.defense,
        divineRank: cardData.divineRank || item.divineRank,
        quote: cardData.quote || item.quote,
        lore: cardData.lore || item.lore,
        abilities: (cardData.abilities && cardData.abilities.length > 0) ? cardData.abilities.map((ab, idx) => ({
          id: `vis-ab-${item.id}-${idx}`,
          name: ab.name,
          type: ab.type,
          iconType: ab.iconType || 'zap',
          description: ab.description,
          damageDice: ab.damageDice || '3d6 Radiant',
          charges: ab.charges || '1/Turn'
        })) : item.abilities,
        selectedGlyphIds: matchingGlyphIds.length > 0 ? matchingGlyphIds : item.selectedGlyphIds,
        attributes: cardData.attributes || item.attributes
      };
    } catch (err: any) {
      console.warn(`Analysis failed for ${item.originalFileName}, applied fallback.`, err);
      return {
        ...item,
        status: 'synthesized',
        errorMessage: err.message || 'Heuristic synthesis applied.'
      };
    }
  };

  // Run Analysis on Active Item Only
  const handleAnalyzeActiveItem = async () => {
    if (!activeItem) return;

    updateActiveItem(item => ({ ...item, status: 'analyzing' }));
    soundEngine.playMicroSound('select');

    const updated = await analyzeSingleItem(activeItem);
    
    updateActiveItem(() => updated);
    soundEngine.playCombatClash('victory');
  };

  // Run Batch Analysis on ALL Items (or all pending items)
  const handleBatchAnalyzeAll = async (pendingOnly: boolean = false) => {
    const targets = items.filter(it => !pendingOnly || it.status === 'pending' || it.status === 'error');
    if (targets.length === 0) return;

    setIsBatchAnalyzing(true);
    setBatchProgress({ current: 0, total: targets.length });
    soundEngine.playMicroSound('select');

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      setBatchProgress({ current: i + 1, total: targets.length });

      // Mark analyzing in state
      setItems(prev => prev.map(it => it.id === target.id ? { ...it, status: 'analyzing' } : it));

      const updated = await analyzeSingleItem(target);

      // Save updated
      setItems(prev => prev.map(it => it.id === target.id ? updated : it));
    }

    setIsBatchAnalyzing(false);
    soundEngine.playCombatClash('victory');
  };

  // Copy renamed file name
  const handleCopyAssetFileName = () => {
    if (!activeItem) return;
    navigator.clipboard.writeText(activeItem.assetFileName);
    setCopiedName(true);
    setTimeout(() => setCopiedName(false), 2000);
    soundEngine.playMicroSound('click');
  };

  // Save Single Active Card to Codex
  const handleForgeActiveCard = () => {
    if (!activeItem) return;

    // 1. Send to parent state
    onCardCreated(assembledActiveCard);

    // 2. Authoritative persistence to IndexedDB (unlimited quota)
    saveCustomCard(assembledActiveCard).catch(e => {
      console.warn('Notice saving vision card:', e);
    });

    // 3. Mark active item as forged
    updateActiveItem(it => ({ ...it, status: 'forged' }));
    setSaveSuccessMsg(`"${activeItem.cardName}" confirmed & permanently saved into Codex!`);

    // 4. Celebration sound & confetti
    soundEngine.playCombatClash('victory');
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => setSaveSuccessMsg(null), 4500);
  };

  // Batch Save / Forge ALL Synthesized Cards to Codex
  const handleBatchForgeAll = () => {
    const readyItems = items.filter(it => it.status === 'synthesized' || it.status === 'pending' || it.status === 'forged');
    if (readyItems.length === 0) return;

    const cardsToSave: Card[] = [];
    readyItems.forEach(item => {
      const cardToSave: Card = {
        id: `VISION-${item.id}`,
        name: item.cardName,
        subtitle: item.cardSubtitle,
        domain: item.domain,
        cardType: item.cardType,
        subtype: item.subtype,
        rarity: item.rarity,
        cost: item.cost,
        power: item.power,
        defense: item.defense,
        divineRank: item.divineRank,
        attunementRequired: true,
        quote: item.quote,
        lore: item.lore,
        artUrl: item.imagePreview,
        aestheticTheme: item.domain === 'Radiance' ? 'volcanic-dark' : item.domain === 'Verdance' ? 'verdant-emerald' : item.domain === 'Arcane' ? 'astral-sapphire' : item.domain === 'Abyss' ? 'abyss-crimson' : 'parchment-gold',
        attributes: item.attributes,
        abilities: item.abilities,
        powerGlyphs: UNIVERSAL_POWER_GLYPHS.filter(g => item.selectedGlyphIds.includes(g.id)),
        artVisualTheme: {
          primaryColor: item.domain === 'Radiance' ? '#ef4444' : item.domain === 'Verdance' ? '#10b981' : item.domain === 'Arcane' ? '#3b82f6' : item.domain === 'Abyss' ? '#a855f7' : '#eab308',
          glowColor: item.domain === 'Radiance' ? '#b91c1c' : item.domain === 'Verdance' ? '#047857' : item.domain === 'Arcane' ? '#1d4ed8' : item.domain === 'Abyss' ? '#6b21a8' : '#ca8a04',
          bgGradient: 'from-stone-950 via-neutral-900 to-black',
          iconSymbol: item.domain === 'Radiance' ? '🔥' : item.domain === 'Verdance' ? '🌿' : item.domain === 'Arcane' ? '🔮' : item.domain === 'Abyss' ? '💀' : '🛡️',
          badgeText: `AI SYNTHESIZED ${item.cardType.toUpperCase()}`
        }
      };
      cardsToSave.push(cardToSave);
      onCardCreated(cardToSave);
    });

    // Atomic batch save to IndexedDB
    saveCustomCardsBatch(cardsToSave).catch(e => {
      console.warn('Notice during batch card save:', e);
    });

    setItems(prev => prev.map(it => ({ ...it, status: 'forged' })));
    setSaveSuccessMsg(`Batch confirmed & permanently saved ${cardsToSave.length} cards into Codex!`);
    soundEngine.playCombatClash('victory');
    try {
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.55 }
      });
    } catch (e) {}

    setTimeout(() => setSaveSuccessMsg(null), 5000);
  };

  // Remove Item from Queue
  const handleRemoveItem = (idToRemove: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (items.length <= 1) {
      setErrorMsg('You must have at least one artwork in the studio.');
      return;
    }
    const idxToRemove = items.findIndex(it => it.id === idToRemove);
    const updated = items.filter(it => it.id !== idToRemove);
    setItems(updated);
    if (activeIndex >= updated.length) {
      setActiveIndex(Math.max(0, updated.length - 1));
    }
    soundEngine.playMicroSound('click');
  };

  const pendingCount = items.filter(it => it.status === 'pending' || it.status === 'error').length;
  const synthesizedCount = items.filter(it => it.status === 'synthesized').length;
  const forgedCount = items.filter(it => it.status === 'forged').length;

  return (
    <div className="w-full min-w-0 space-y-6">
      
      {/* ================= HERO BANNER & MULTI-IMAGE ACTIONS ================= */}
      <div className="rounded-3xl p-5 sm:p-8 bg-gradient-to-r from-stone-950 via-purple-950/40 to-stone-950 border-2 border-purple-500/40 shadow-2xl relative overflow-hidden w-full min-w-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/50 text-purple-300 text-xs font-cinzel font-bold">
              <Sparkles size={14} className="text-amber-400" />
              <span>MULTIMODAL GEMINI 3.7 MULTI-IMAGE BATCH ENGINE</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-amber-400">
              Multi-Image Artwork Studio & Batch Card Synthesizer
            </h2>
            
            <p className="text-sm text-stone-300 font-sans leading-relaxed">
              Upload multiple artworks, illustrations, or sketches at once. Gemini Vision inspects every image simultaneously, extracts palettes and visual textures, renames each file, and builds complete tournament-grade cards in batch.
            </p>
          </div>

          {/* Quick Actions Header */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-cinzel font-bold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105 border border-purple-400/40"
            >
              <Upload size={18} />
              <span>Upload Multiple Images</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  processMultipleFiles(e.target.files);
                }
              }}
            />

            <button
              onClick={handleLoadAllSamples}
              className="px-4 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-cinzel font-bold border border-amber-500/30 flex items-center gap-1.5 transition-all hover:scale-105 shadow-md"
              title="Load 4 High-Fantasy Sample Artworks"
            >
              <FolderOpen size={16} />
              <span>Load 4 Samples</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500 text-red-200 text-sm flex items-center justify-between gap-3 shadow-lg w-full min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <AlertCircle size={20} className="text-red-400 shrink-0" />
            <span className="truncate">{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="p-1 hover:text-white shrink-0">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Success Notification */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm flex items-center justify-between gap-3 shadow-2xl animate-fade-in w-full min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <CheckCircle2 size={22} className="text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <p className="font-bold font-cinzel">Cards Forged & Added to Compendium!</p>
              <p className="text-xs text-emerald-300 truncate">{saveSuccessMsg}</p>
            </div>
          </div>
          <button
            onClick={() => onInspectCard(assembledActiveCard)}
            className="px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-xs font-bold border border-emerald-500/50 shrink-0"
          >
            Inspect Active Card
          </button>
        </div>
      )}

      {/* ================= TOP PERSISTENT CONFIRM & SAVE BAR ================= */}
      <div 
        id="vision-confirm-save-dock"
        className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border-2 border-amber-500/60 shadow-[0_0_30px_rgba(234,179,8,0.18)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/60 shrink-0 bg-stone-900 shadow-md">
            <img 
              src={activeItem?.imagePreview} 
              alt={activeItem?.cardName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-0.5">
              <span className="text-[10px] font-mono text-amber-300 font-bold">{activeItem?.cost}⚡</span>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-cinzel font-black text-base sm:text-lg text-amber-100 truncate">
                {activeItem?.cardName || 'Untitled Card'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-cinzel border bg-amber-500/20 text-amber-300 border-amber-500/40">
                {activeItem?.domain} • {activeItem?.cardType}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold border ${
                activeItem?.status === 'forged' 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50' 
                  : 'bg-amber-950/70 text-amber-300 border-amber-500/40'
              }`}>
                {activeItem?.status === 'forged' ? '✅ PERMANENTLY SAVED IN CODEX' : '⏳ READY TO CONFIRM & SAVE'}
              </span>
            </div>
            <p className="text-xs text-stone-400 truncate mt-0.5">
              ATK: <strong className="text-red-300">{activeItem?.power}</strong> • DEF: <strong className="text-blue-300">{activeItem?.defense}</strong> • Rank: <strong className="text-purple-300">{activeItem?.divineRank}★</strong> • {activeItem?.abilities?.length || 0} Abilities Active
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            id="btn-goto-council"
            onClick={() => {
              setActiveSubTab('council');
              soundEngine.playMicroSound('select');
            }}
            className="px-3.5 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-cinzel font-bold flex items-center gap-1.5 transition hover:scale-102"
            title="Open Multi-Agent Analysis Council"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>Agent Council</span>
          </button>

          <button
            type="button"
            id="btn-open-confirm-modal"
            onClick={() => {
              setShowConfirmSaveModal(true);
              soundEngine.playMicroSound('click');
            }}
            className="px-3.5 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-cinzel font-bold flex items-center gap-1.5 transition hover:scale-102"
            title="Review full card specifications and agent council clearance"
          >
            <Eye size={14} />
            <span>Review Card</span>
          </button>

          <button
            type="button"
            id="btn-confirm-save-active"
            onClick={handleForgeActiveCard}
            className={`px-5 py-2.5 rounded-2xl font-cinzel font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition hover:scale-105 shadow-xl ${
              activeItem?.status === 'forged'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50'
                : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black shadow-amber-500/30'
            }`}
            title="Confirm card and permanently write to Codex database"
          >
            {activeItem?.status === 'forged' ? <Check size={16} /> : <Save size={16} />}
            <span>{activeItem?.status === 'forged' ? 'Saved (Update Codex)' : 'Confirm & Save to Codex'}</span>
          </button>

          {items.length > 1 && (
            <button
              type="button"
              id="btn-confirm-save-all-top"
              onClick={handleBatchForgeAll}
              className="px-4 py-2.5 rounded-2xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-500/50 text-xs font-cinzel font-bold flex items-center gap-1.5 transition hover:scale-102"
              title="Batch save all cards in the queue to permanent Codex"
            >
              <CheckCheck size={15} />
              <span>Save All ({items.length}) Cards</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= MULTI-IMAGE BATCH FILMSTRIP QUEUE ================= */}
      <div className="p-4 sm:p-5 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl space-y-4 w-full min-w-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-3 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/50 flex items-center justify-center text-purple-300 shrink-0">
              <ListOrdered size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="font-cinzel font-bold text-base text-amber-200 flex items-center gap-2">
                <span>Multi-Image Batch Queue</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 text-xs font-mono">
                  {items.length} {items.length === 1 ? 'Artwork' : 'Artworks'}
                </span>
              </h3>
              <p className="text-xs text-stone-400 truncate">
                Click any thumbnail to inspect and edit its card data, or run batch analysis on the entire queue.
              </p>
            </div>
          </div>

          {/* Batch Actions Group */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {pendingCount > 0 && (
              <button
                onClick={() => handleBatchAnalyzeAll(true)}
                disabled={isBatchAnalyzing}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-cinzel font-bold flex items-center gap-1.5 shadow-md transition hover:scale-105 disabled:opacity-50"
              >
                {isBatchAnalyzing ? (
                  <>
                    <RefreshCw size={14} className="animate-spin text-black" />
                    <span>Analyzing ({batchProgress.current}/{batchProgress.total})...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Analyze All Pending ({pendingCount})</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => handleBatchAnalyzeAll(false)}
              disabled={isBatchAnalyzing}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-purple-300 border border-purple-500/40 text-xs font-cinzel font-bold flex items-center gap-1.5 shadow-sm transition hover:scale-105 disabled:opacity-50"
              title="Re-analyze all images in batch"
            >
              <RefreshCw size={14} className={isBatchAnalyzing ? 'animate-spin' : ''} />
              <span>Batch Analyze All ({items.length})</span>
            </button>

            {synthesizedCount > 0 && (
              <button
                onClick={handleBatchForgeAll}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-cinzel font-bold flex items-center gap-1.5 shadow-lg transition hover:scale-105"
              >
                <CheckCheck size={14} />
                <span>Forge All Synthesized ({synthesizedCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Batch Progress Bar when Active */}
        {isBatchAnalyzing && (
          <div className="space-y-1.5 p-3 rounded-2xl bg-purple-950/40 border border-purple-500/40 animate-pulse">
            <div className="flex justify-between text-xs font-cinzel text-purple-200">
              <span>Batch AI Multimodal Vision Analysis in Progress...</span>
              <span>Processing {batchProgress.current} of {batchProgress.total}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-purple-400 transition-all duration-300"
                style={{ width: `${(batchProgress.current / Math.max(1, batchProgress.total)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Thumbnail Filmstrip Carousel */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-stone-950">
          {items.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveIndex(idx);
                  soundEngine.playMicroSound('click');
                }}
                className={`relative shrink-0 w-44 sm:w-48 p-2.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${
                  isSelected 
                    ? 'border-amber-400 bg-amber-950/30 shadow-[0_0_20px_rgba(234,179,8,0.25)] scale-[1.02]' 
                    : 'border-stone-800 bg-stone-900/60 hover:bg-stone-900 hover:border-stone-700'
                }`}
              >
                {/* Image Thumbnail with Overlay */}
                <div className="w-full h-24 rounded-xl overflow-hidden bg-black border border-stone-800 relative mb-2">
                  <img 
                    src={item.imagePreview} 
                    alt={item.cardName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1.5 right-1.5">
                    {item.status === 'analyzing' && (
                      <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500 text-[9px] font-mono flex items-center gap-1 animate-pulse">
                        <RefreshCw size={10} className="animate-spin" />
                        <span>AI...</span>
                      </span>
                    )}
                    {item.status === 'synthesized' && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 text-[9px] font-mono flex items-center gap-1">
                        <Check size={10} />
                        <span>Ready</span>
                      </span>
                    )}
                    {item.status === 'forged' && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500 text-[9px] font-mono flex items-center gap-1">
                        <Shield size={10} />
                        <span>Forged</span>
                      </span>
                    )}
                    {item.status === 'pending' && (
                      <span className="px-1.5 py-0.5 rounded bg-stone-950/80 text-stone-400 border border-stone-700 text-[9px] font-mono">
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-1 left-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-stone-950/80 text-amber-300 text-[9px] font-cinzel font-bold">
                      #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Card Title & Domain Info */}
                <div className="space-y-0.5">
                  <p className="text-xs font-cinzel font-bold text-stone-100 truncate">
                    {item.cardName}
                  </p>
                  <p className="text-[10px] text-stone-400 truncate flex items-center justify-between font-mono">
                    <span>{item.domain} • {item.cardType}</span>
                    <span>Cost: {item.cost}</span>
                  </p>
                </div>

                {/* Remove button */}
                <button
                  onClick={(e) => handleRemoveItem(item.id, e)}
                  className="absolute top-1 left-1 p-1 rounded-full bg-stone-950/80 text-stone-400 hover:text-red-400 hover:bg-black border border-stone-800 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from batch"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}

          {/* Quick Add Card Slot */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 w-36 sm:w-40 h-36 rounded-2xl border-2 border-dashed border-stone-800 hover:border-purple-500/60 bg-stone-900/30 hover:bg-purple-950/20 cursor-pointer flex flex-col items-center justify-center gap-2 text-stone-400 hover:text-purple-300 transition-all p-3 text-center"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center">
              <Plus size={18} />
            </div>
            <span className="text-xs font-cinzel font-bold">Add More Images</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN 2-COLUMN ACTIVE INSPECTOR / EDITOR ================= */}
      {activeItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full min-w-0">
          
          {/* ================= LEFT COLUMN: UPLOAD / ANALYZE / FINE-TUNE (7 COLS) ================= */}
          <div className="lg:col-span-7 space-y-6 min-w-0 w-full">
            
            {/* Active Item Navigation Bar */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-xl min-w-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <button
                  disabled={activeIndex === 0}
                  onClick={() => {
                    setActiveIndex(Math.max(0, activeIndex - 1));
                    soundEngine.playMicroSound('click');
                  }}
                  className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed border border-stone-800 shrink-0"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-cinzel font-bold text-amber-200 truncate min-w-0">
                  Artwork {activeIndex + 1} of {items.length}: <span className="text-stone-300 font-mono font-normal ml-1">{activeItem.originalFileName}</span>
                </span>
                <button
                  disabled={activeIndex === items.length - 1}
                  onClick={() => {
                    setActiveIndex(Math.min(items.length - 1, activeIndex + 1));
                    soundEngine.playMicroSound('click');
                  }}
                  className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed border border-stone-800 shrink-0"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleAnalyzeActiveItem}
                  disabled={activeItem.status === 'analyzing'}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-cinzel font-bold flex items-center gap-1.5 shadow-md transition"
                >
                  {activeItem.status === 'analyzing' ? (
                    <>
                      <RefreshCw size={14} className="animate-spin text-black" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>{activeItem.status === 'synthesized' ? 'Re-Analyze Image' : 'Analyze This Image'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 1. Artwork Upload & Custom Notes Zone */}
            <div className="p-5 sm:p-6 rounded-3xl bg-stone-950 border border-stone-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel font-bold text-base text-amber-200 flex items-center gap-2">
                  <ImageIcon size={18} className="text-purple-400" />
                  <span>1. Active Artwork Inspection</span>
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  {activeItem.fileSize} • {activeItem.mimeType}
                </span>
              </div>

              {/* Drag and Drop Box */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                  isDragging 
                    ? 'border-purple-400 bg-purple-950/30' 
                    : 'border-stone-700 bg-stone-900/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                  <div className="w-28 h-28 rounded-xl overflow-hidden bg-black border border-stone-700 shadow-lg shrink-0 relative group">
                    <img 
                      src={activeItem.imagePreview} 
                      alt={activeItem.cardName} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700 text-[10px] font-mono">
                        {activeItem.mimeType}
                      </span>
                      <span className="text-xs font-mono text-stone-400">
                        {activeItem.fileSize}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        activeItem.status === 'synthesized' ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' :
                        activeItem.status === 'forged' ? 'bg-amber-950 text-amber-300 border border-amber-600' :
                        'bg-stone-800 text-stone-400'
                      }`}>
                        {activeItem.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-stone-200 truncate font-mono">
                      {activeItem.originalFileName}
                    </p>
                    <p className="text-xs text-stone-400">
                      Drop or upload more files anytime. Use custom creative notes below to guide this card's synthesis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom Creative Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-cinzel text-stone-300 font-semibold flex items-center justify-between">
                  <span>Custom Creative Focus / Player Notes for this Card</span>
                  <span className="text-[10px] text-stone-400">Guides abilities and lore</span>
                </label>
                <input
                  type="text"
                  value={activeItem.customPrompt || ''}
                  onChange={(e) => updateActiveItem(it => ({ ...it, customPrompt: e.target.value }))}
                  placeholder="e.g. 'Make this a fast aggressive flanker with chain-lightning attacks' or 'Attuned boss artifact'"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* 2. Visual Breakdown & Asset Renaming */}
            <div className="p-5 sm:p-6 rounded-3xl bg-stone-950 border border-stone-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-cinzel font-bold text-base text-purple-300 flex items-center gap-2">
                  <Tag size={18} className="text-amber-400" />
                  <span>2. Visual Recognition & Renaming</span>
                </h3>
                {activeItem.analysisResult && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600 text-[10px] font-mono">
                    ✓ Vision Analyzed
                  </span>
                )}
              </div>

              {/* Asset Renamer Card */}
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-cinzel font-bold text-stone-300 flex items-center gap-1.5">
                    <Edit3 size={14} className="text-purple-400" />
                    <span>Standardized Asset Renaming</span>
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 truncate max-w-[200px]">
                    Original: {activeItem.originalFileName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeItem.assetFileName}
                    onChange={(e) => updateActiveItem(it => ({ ...it, assetFileName: e.target.value }))}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs font-mono text-amber-300"
                  />
                  <button
                    onClick={handleCopyAssetFileName}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold flex items-center gap-1.5 border border-stone-600 shrink-0"
                    title="Copy renamed filename"
                  >
                    {copiedName ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedName ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Detected Visual Content & Labels */}
              <div className="space-y-2">
                <span className="text-xs font-cinzel font-bold text-stone-300 block">
                  Detected Visual Elements:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(activeItem.analysisResult?.artReview.detectedLabels || [
                    'Dynamic Elemental Glow',
                    'Aetheric Armor / Relic',
                    'High Contrast Shading',
                    'Mythic Composition',
                    'Nexus Resonance'
                  ]).map((label, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-amber-300 text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Art Review & Color Palette Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                  <span className="text-[10px] font-cinzel text-stone-400 uppercase tracking-wider block">
                    Art Style & Composition
                  </span>
                  <p className="text-xs font-semibold text-stone-200">
                    {activeItem.analysisResult?.artReview.artStyle || 'High-Fantasy Stylized Masterpiece'}
                  </p>
                  <p className="text-[11px] text-stone-400 line-clamp-2">
                    {activeItem.analysisResult?.artReview.compositionAndMood || 'Atmospheric lighting with dramatic focal emphasis.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-cinzel text-stone-400 uppercase tracking-wider block">
                    Color Palette & Mood
                  </span>
                  <div className="flex items-center gap-2">
                    {(activeItem.analysisResult?.artReview.colorPalette.hexCodes || ['#ef4444', '#f59e0b', '#78350f', '#18181b']).map((hex, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-lg border border-stone-700 shadow-md"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-stone-400 truncate">
                    {activeItem.analysisResult?.artReview.colorPalette.paletteMood || 'High-energy elemental resonance'}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Fine-Tuning & Customization Sub-Tabs */}
            <div className="p-5 sm:p-6 rounded-3xl bg-stone-950 border border-stone-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-cinzel font-bold text-base text-amber-200 flex items-center gap-2">
                  <Sliders size={18} className="text-yellow-400" />
                  <span>3. Fine-Tune Synthesized Card</span>
                </h3>
                
                {/* Sub-tab Navigation */}
                <div className="flex flex-wrap items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs font-cinzel">
                  <button
                    onClick={() => setActiveSubTab('review')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${activeSubTab === 'review' ? 'bg-amber-500 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                  >
                    Identity
                  </button>
                  <button
                    id="subtab-btn-council"
                    onClick={() => setActiveSubTab('council')}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${activeSubTab === 'council' ? 'bg-amber-500 text-black font-bold' : 'text-amber-400 hover:text-white'}`}
                  >
                    <Sparkles size={12} />
                    <span>Agent Council</span>
                  </button>
                  <button
                    onClick={() => setActiveSubTab('stats')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${activeSubTab === 'stats' ? 'bg-amber-500 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                  >
                    Combat
                  </button>
                  <button
                    onClick={() => setActiveSubTab('abilities')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${activeSubTab === 'abilities' ? 'bg-amber-500 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                  >
                    Abilities ({activeItem.abilities?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveSubTab('glyphs')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${activeSubTab === 'glyphs' ? 'bg-amber-500 text-black font-bold' : 'text-stone-400 hover:text-white'}`}
                  >
                    Glyphs ({activeItem.selectedGlyphIds?.length || 0})
                  </button>
                </div>
              </div>

              {/* Sub-Tab 0: Multi-Agent Council */}
              {activeSubTab === 'council' && (
                <div className="space-y-4">
                  <VisionStudioAgentCouncil
                    imagePreviewUrl={activeItem.imagePreview}
                    currentCardName={activeItem.cardName}
                    currentDomain={activeItem.domain}
                    onApplyRecommendation={handleApplyCouncilRecommendation}
                    isAnalyzing={activeItem.status === 'analyzing'}
                    onRunCouncilDeliberation={handleAnalyzeActiveItem}
                  />
                </div>
              )}

              {/* Sub-Tab 1: Identity & Lore */}
              {activeSubTab === 'review' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-cinzel text-stone-300 font-semibold">Card Name</label>
                      <input
                        type="text"
                        value={activeItem.cardName}
                        onChange={(e) => updateActiveItem(it => ({ ...it, cardName: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs font-bold text-amber-200"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-cinzel text-stone-300 font-semibold">Subtitle & Classification</label>
                      <input
                        type="text"
                        value={activeItem.cardSubtitle}
                        onChange={(e) => updateActiveItem(it => ({ ...it, cardSubtitle: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-cinzel text-stone-400">Domain</label>
                      <select
                        value={activeItem.domain}
                        onChange={(e) => updateActiveItem(it => ({ ...it, domain: e.target.value as Domain }))}
                        className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs font-bold text-amber-300"
                      >
                        <option value="Sanctuary">Sanctuary</option>
                        <option value="Radiance">Radiance</option>
                        <option value="Verdance">Verdance</option>
                        <option value="Arcane">Arcane</option>
                        <option value="Abyss">Abyss</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-cinzel text-stone-400">Card Type</label>
                      <select
                        value={activeItem.cardType}
                        onChange={(e) => updateActiveItem(it => ({ ...it, cardType: e.target.value as CardType }))}
                        className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs font-bold text-stone-200"
                      >
                        <option value="Champion">Champion (Legendary Hero)</option>
                        <option value="Character">Character (Warrior/Mage)</option>
                        <option value="Spell">Spell (Incantation/Blast)</option>
                        <option value="Artifact">Artifact (Talisman/Orb/Ring)</option>
                        <option value="Relic">Relic (Sacred Totem)</option>
                        <option value="Weapon">Weapon (Blade/Bow/Staff)</option>
                        <option value="Armor">Armor (Shield/Plate)</option>
                        <option value="Beast">Beast (Monster/Dragon)</option>
                        <option value="Environment">Environment (Realm/Caldera)</option>
                        <option value="Minion">Minion (Construct/Summon)</option>
                        <option value="Ritual">Ritual (Dark Rite/Alignment)</option>
                        <option value="Encounter">Encounter (Hazard/Trial)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-cinzel text-stone-400">Rarity</label>
                      <select
                        value={activeItem.rarity}
                        onChange={(e) => updateActiveItem(it => ({ ...it, rarity: e.target.value as Rarity }))}
                        className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs font-bold text-yellow-400"
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

                    <div className="space-y-1">
                      <label className="text-[11px] font-cinzel text-stone-400">Subtype</label>
                      <input
                        type="text"
                        value={activeItem.subtype}
                        onChange={(e) => updateActiveItem(it => ({ ...it, subtype: e.target.value }))}
                        className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-cinzel text-stone-300 font-semibold">Thematic Quote</label>
                    <input
                      type="text"
                      value={activeItem.quote}
                      onChange={(e) => updateActiveItem(it => ({ ...it, quote: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-amber-200/90 italic"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-cinzel text-stone-300 font-semibold">World Lore</label>
                    <textarea
                      rows={2}
                      value={activeItem.lore}
                      onChange={(e) => updateActiveItem(it => ({ ...it, lore: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-300"
                    />
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Combat Stats */}
              {activeSubTab === 'stats' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center space-y-1">
                      <span className="text-[10px] font-cinzel text-stone-400">Essence Cost</span>
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => updateActiveItem(it => ({ ...it, cost: Math.max(1, it.cost - 1) }))} className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold">-</button>
                        <span className="text-xl font-bold text-amber-400 font-cinzel">{activeItem.cost}</span>
                        <button onClick={() => updateActiveItem(it => ({ ...it, cost: Math.min(10, it.cost + 1) }))} className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold">+</button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center space-y-1">
                      <span className="text-[10px] font-cinzel text-stone-400">Attack (Power)</span>
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => updateActiveItem(it => ({ ...it, power: Math.max(1, it.power - 1) }))} className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold">-</button>
                        <span className="text-xl font-bold text-red-400 font-cinzel">{activeItem.power}</span>
                        <button onClick={() => updateActiveItem(it => ({ ...it, power: Math.min(15, it.power + 1) }))} className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold">+</button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center space-y-1">
                      <span className="text-[10px] font-cinzel text-stone-400">Defense (HP)</span>
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => updateActiveItem(it => ({ ...it, defense: Math.max(1, it.defense - 1) }))} className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold">-</button>
                        <span className="text-xl font-bold text-blue-400 font-cinzel">{activeItem.defense}</span>
                        <button onClick={() => updateActiveItem(it => ({ ...it, defense: Math.min(20, it.defense + 1) }))} className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold">+</button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center space-y-1">
                      <span className="text-[10px] font-cinzel text-stone-400">Divine Rank</span>
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => updateActiveItem(it => ({ ...it, divineRank: Math.max(1, it.divineRank - 1) }))} className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold">-</button>
                        <span className="text-xl font-bold text-yellow-400 font-cinzel">★{activeItem.divineRank}</span>
                        <button onClick={() => updateActiveItem(it => ({ ...it, divineRank: Math.min(5, it.divineRank + 1) }))} className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold">+</button>
                      </div>
                    </div>
                  </div>

                  {/* Radar sliders */}
                  <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                    <span className="text-xs font-cinzel font-bold text-stone-300">5-Axis Tactical Radar Ratings</span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      {Object.entries(activeItem.attributes).map(([key, val]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-[10px] text-stone-400 uppercase">
                            <span>{key}</span>
                            <span>{Number(val).toFixed(1)}</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={Number(val)}
                            onChange={(e) => {
                              const updatedAttrs = { ...activeItem.attributes, [key]: parseFloat(e.target.value) };
                              updateActiveItem(it => ({ ...it, attributes: updatedAttrs }));
                            }}
                            className="w-full accent-amber-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Abilities */}
              {activeSubTab === 'abilities' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-cinzel text-stone-200 font-bold block">
                        Synthesized Abilities & Skill Engine
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {activeItem.abilities?.length || 0} active abilities attached to this card
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Domain Preset Button */}
                      <button
                        onClick={() => applyDomainStarterKit(activeItem.domain)}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 text-xs font-medium flex items-center gap-1.5 border border-stone-700 transition-colors"
                        title={`Apply signature ${activeItem.domain} domain abilities`}
                      >
                        <Sparkles size={13} className="text-amber-400" />
                        <span>{activeItem.domain} Starter Kit</span>
                      </button>

                      {/* Browse System Templates Button */}
                      <button
                        onClick={() => {
                          setTargetReplaceIndex(null);
                          setShowTemplateModal(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 border border-amber-500/40 transition-colors"
                      >
                        <BookOpen size={13} />
                        <span>Skill Templates Library</span>
                      </button>

                      <button
                        onClick={() => {
                          const newAb: AbilityProperty = {
                            id: `vis-ab-${Date.now()}`,
                            name: 'New Custom Skill',
                            type: 'Action',
                            iconType: 'zap',
                            description: 'Custom rule clause generated for this card.',
                            damageDice: '3d6 DMG',
                            charges: '1/Turn'
                          };
                          updateActiveItem(it => ({ ...it, abilities: [...it.abilities, newAb] }));
                        }}
                        className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 flex items-center gap-1 border border-stone-700"
                      >
                        <Plus size={13} />
                        <span>Add Blank</span>
                      </button>
                    </div>
                  </div>

                  {/* Abilities List */}
                  {(activeItem.abilities?.length || 0) === 0 ? (
                    <div className="p-6 rounded-2xl bg-stone-900/60 border border-dashed border-stone-800 text-center space-y-3">
                      <BookOpen size={24} className="mx-auto text-stone-500" />
                      <p className="text-xs text-stone-400">No abilities assigned to this card yet.</p>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => applyDomainStarterKit(activeItem.domain)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold"
                        >
                          Load {activeItem.domain} Signature Kit
                        </button>
                        <button
                          onClick={() => setShowTemplateModal(true)}
                          className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold"
                        >
                          Browse All Templates
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeItem.abilities.map((ab, idx) => (
                        <div key={ab.id || idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2.5 relative">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                              {/* Icon Selector */}
                              <select
                                value={ab.iconType || 'zap'}
                                onChange={(e) => {
                                  const copy = [...activeItem.abilities];
                                  copy[idx].iconType = e.target.value as any;
                                  updateActiveItem(it => ({ ...it, abilities: copy }));
                                }}
                                className="px-2 py-1 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-300 shrink-0"
                              >
                                <option value="sword">⚔️ Sword</option>
                                <option value="shield">🛡️ Shield</option>
                                <option value="flame">🔥 Flame</option>
                                <option value="sparkles">✨ Sparkles</option>
                                <option value="eye">👁️ Eye</option>
                                <option value="zap">⚡ Zap</option>
                                <option value="skull">💀 Skull</option>
                                <option value="feather">🪶 Feather</option>
                                <option value="wind">💨 Wind</option>
                                <option value="heart">❤️ Heart</option>
                                <option value="book">📖 Book</option>
                                <option value="moon">🌙 Moon</option>
                                <option value="sun">☀️ Sun</option>
                                <option value="hourglass">⏳ Hourglass</option>
                                <option value="snake">🐍 Snake</option>
                                <option value="crown">👑 Crown</option>
                              </select>

                              {/* Ability Name */}
                              <input
                                type="text"
                                value={ab.name}
                                onChange={(e) => {
                                  const copy = [...activeItem.abilities];
                                  copy[idx].name = e.target.value;
                                  updateActiveItem(it => ({ ...it, abilities: copy }));
                                }}
                                placeholder="Skill Name..."
                                className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-700 text-xs font-bold text-amber-200 flex-1 min-w-[120px]"
                              />
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Type dropdown */}
                              <select
                                value={ab.type || 'Action'}
                                onChange={(e) => {
                                  const copy = [...activeItem.abilities];
                                  copy[idx].type = e.target.value as any;
                                  updateActiveItem(it => ({ ...it, abilities: copy }));
                                }}
                                className="px-2 py-1 rounded-lg bg-stone-950 border border-stone-700 text-xs text-purple-300 font-semibold"
                              >
                                <option value="Action">Action</option>
                                <option value="Passive">Passive</option>
                                <option value="Reaction">Reaction</option>
                                <option value="Ultimate">Ultimate</option>
                                <option value="Spell">Spell</option>
                                <option value="Bonus Action">Bonus Action</option>
                              </select>

                              {/* Replace from Template */}
                              <button
                                onClick={() => {
                                  setTargetReplaceIndex(idx);
                                  setShowTemplateModal(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 text-[11px] border border-stone-700"
                                title="Replace this skill with a pre-built system template"
                              >
                                Replace
                              </button>

                              {/* Delete button */}
                              <button
                                onClick={() => {
                                  const filtered = activeItem.abilities.filter((_, i) => i !== idx);
                                  updateActiveItem(it => ({ ...it, abilities: filtered }));
                                }}
                                className="p-1 text-stone-500 hover:text-red-400"
                                title="Remove ability"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Extra Parameters: Damage/Dice & Charges */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center gap-1.5 bg-stone-950/80 px-2 py-1 rounded-lg border border-stone-800">
                              <span className="text-[10px] text-stone-400 font-cinzel">Effect / Dice:</span>
                              <input
                                type="text"
                                value={ab.damageDice || ''}
                                onChange={(e) => {
                                  const copy = [...activeItem.abilities];
                                  copy[idx].damageDice = e.target.value;
                                  updateActiveItem(it => ({ ...it, abilities: copy }));
                                }}
                                placeholder="e.g. 4d6 Radiant, Heal 3 HP"
                                className="bg-transparent text-xs text-amber-300 w-full focus:outline-none"
                              />
                            </div>

                            <div className="flex items-center gap-1.5 bg-stone-950/80 px-2 py-1 rounded-lg border border-stone-800">
                              <span className="text-[10px] text-stone-400 font-cinzel">Charges / Timing:</span>
                              <input
                                type="text"
                                value={ab.charges || ''}
                                onChange={(e) => {
                                  const copy = [...activeItem.abilities];
                                  copy[idx].charges = e.target.value;
                                  updateActiveItem(it => ({ ...it, abilities: copy }));
                                }}
                                placeholder="e.g. 1/Turn, Passive, 2/Match"
                                className="bg-transparent text-xs text-blue-300 w-full focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Description text area */}
                          <textarea
                            rows={2}
                            value={ab.description}
                            onChange={(e) => {
                              const copy = [...activeItem.abilities];
                              copy[idx].description = e.target.value;
                              updateActiveItem(it => ({ ...it, abilities: copy }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-300 focus:outline-none focus:border-amber-500/50"
                            placeholder="Detailed ability description and rules clauses..."
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-Tab 4: Power Glyphs */}
              {activeSubTab === 'glyphs' && (
                <div className="space-y-3">
                  <span className="text-xs font-cinzel text-stone-300 font-bold block">
                    Assigned Nexus Power Glyphs
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                    {UNIVERSAL_POWER_GLYPHS.slice(0, 16).map((glyph) => {
                      const isSelected = activeItem.selectedGlyphIds.includes(glyph.id);
                      return (
                        <button
                          key={glyph.id}
                          type="button"
                          onClick={() => {
                            let next: string[];
                            if (isSelected) {
                              next = activeItem.selectedGlyphIds.filter(id => id !== glyph.id);
                            } else {
                              next = [...activeItem.selectedGlyphIds, glyph.id];
                            }
                            updateActiveItem(it => ({ ...it, selectedGlyphIds: next }));
                          }}
                          className={`p-2 rounded-xl text-left border transition-all ${
                            isSelected 
                              ? 'bg-amber-950/70 border-amber-500 text-amber-200' 
                              : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold font-cinzel">
                            <span>{glyph.name}</span>
                            <span className="text-[9px] font-mono px-1 rounded bg-stone-950">{glyph.shortTag}</span>
                          </div>
                          <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">{glyph.ruleClause}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: LIVE 3D PREVIEW & CODEX ACTIONS (5 COLS) ================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6 min-w-0 w-full">
            
            {/* Live Interactive Card Frame */}
            <div className="p-4 sm:p-5 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl flex flex-col items-center space-y-4 min-w-0">
              <div className="w-full flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-xs font-cinzel font-bold text-amber-200 flex items-center gap-1.5">
                  <Eye size={14} className="text-amber-400" />
                  <span>Real-Time Synthesized Card Preview</span>
                </span>
                <span className="text-[10px] font-mono text-purple-300">
                  Item #{activeIndex + 1} of {items.length}
                </span>
              </div>

              {/* Render Card Item with Uploaded Art */}
              <div className="w-full max-w-[340px] flex justify-center py-2 min-w-0">
                <CardItem 
                  card={assembledActiveCard}
                  onInspect={() => onInspectCard(assembledActiveCard)}
                />
              </div>

              {/* Card Action Controls */}
              <div className="w-full space-y-2 pt-2 border-t border-stone-800">
                <button
                  onClick={handleForgeActiveCard}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(234,179,8,0.35)] flex items-center justify-center gap-2 transition hover:scale-105"
                >
                  <Save size={16} />
                  <span>Forge This Card into Codex</span>
                </button>

                {onLaunchArena && (
                  <button
                    onClick={() => onLaunchArena(assembledActiveCard)}
                    className="w-full py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-cinzel font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/40 transition hover:scale-102"
                  >
                    <Play size={14} />
                    <span>Launch Immediately in Arena Clash</span>
                  </button>
                )}

                {items.length > 1 && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={handleBatchForgeAll}
                      className="flex-1 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-500/40 text-xs font-cinzel font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <CheckCheck size={14} />
                      <span>Forge All {items.length} Cards</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Helper Tips */}
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2 text-xs text-stone-400">
              <span className="font-cinzel font-bold text-stone-300 flex items-center gap-1.5">
                <Info size={14} className="text-amber-400" />
                <span>Multi-Image Batch Tips:</span>
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                <li>Select multiple image files at once from your folder dialog or drop an entire folder of artwork.</li>
                <li>Click <strong>Analyze All Pending</strong> to run batch vision detection on every uploaded image.</li>
                <li>Click <strong>Forge All Synthesized</strong> to commit the entire batch into your active Codex collection in one click.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ALL SYSTEM SKILL & ABILITY TEMPLATES ================= */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl max-h-[88vh] flex flex-col bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-800 bg-stone-900/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-base font-cinzel font-bold text-amber-100 flex items-center gap-2">
                    <span>Pre-Built Skill & Ability Templates</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-sans">
                      {ALL_SYSTEM_ABILITY_TEMPLATES.reduce((acc, cat) => acc + cat.templates.length, 0)} Total Templates
                    </span>
                  </h3>
                  <p className="text-xs text-stone-400">
                    {targetReplaceIndex !== null ? `Selecting replacement template for Ability #${targetReplaceIndex + 1}` : 'Select a pre-built skill to attach directly to this card'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowTemplateModal(false);
                  setTargetReplaceIndex(null);
                }}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 border-b border-stone-800 bg-stone-950 flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Domain Category Filter Chips */}
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {['All', 'Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss', 'Spells', 'Equipment'].map((filter) => {
                  const isActive = templateDomainFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setTemplateDomainFilter(filter)}
                      className={`px-3 py-1 rounded-xl text-xs font-cinzel transition-all ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                          : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  placeholder="Search template skills..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>

            {/* Template Catalog Grid */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {ALL_SYSTEM_ABILITY_TEMPLATES
                .filter(cat => templateDomainFilter === 'All' || cat.domain === templateDomainFilter)
                .map(cat => {
                  const matchingInCat = cat.templates.filter(t => {
                    if (!templateSearch.trim()) return true;
                    const q = templateSearch.toLowerCase();
                    return t.name.toLowerCase().includes(q) || 
                           t.description.toLowerCase().includes(q) || 
                           (t.damageDice && t.damageDice.toLowerCase().includes(q)) ||
                           (t.type && t.type.toLowerCase().includes(q));
                  });

                  if (matchingInCat.length === 0) return null;

                  return (
                    <div key={cat.id} className="space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{cat.icon}</span>
                          <span className="text-sm font-cinzel font-bold text-amber-200">{cat.name}</span>
                          <span className="text-xs text-stone-500">({matchingInCat.length})</span>
                        </div>
                        <span className="text-[11px] text-stone-400 italic hidden sm:inline">{cat.description}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {matchingInCat.map(template => (
                          <div
                            key={template.id}
                            className="p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group space-y-3"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-cinzel font-bold text-sm text-stone-100 group-hover:text-amber-300 transition">
                                  {template.name}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span className="px-2 py-0.5 rounded-md bg-stone-950 border border-purple-500/40 text-[10px] font-bold text-purple-300">
                                    {template.type}
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-stone-300 leading-relaxed">
                                {template.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 gap-2">
                              <div className="flex items-center gap-2 text-[11px]">
                                {template.damageDice && (
                                  <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-bold">
                                    {template.damageDice}
                                  </span>
                                )}
                                {template.charges && (
                                  <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300 font-bold">
                                    {template.charges}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => applyTemplateToCard(template, targetReplaceIndex)}
                                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 text-xs font-cinzel font-bold border border-amber-500/40 transition flex items-center gap-1"
                              >
                                <Plus size={13} />
                                <span>{targetReplaceIndex !== null ? 'Replace Skill' : 'Add to Card'}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-stone-800 bg-stone-900/90 flex items-center justify-between text-xs text-stone-400">
              <span>Clicking <strong>Add to Card</strong> or <strong>Replace Skill</strong> will instantly attach the selected template with customized ID.</span>
              <button
                onClick={() => {
                  setShowTemplateModal(false);
                  setTargetReplaceIndex(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition"
              >
                Close Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= REVIEW & CONFIRM SAVE MODAL ================= */}
      {showConfirmSaveModal && (
        <div 
          id="modal-confirm-save-card"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-stone-950 border-2 border-amber-500/60 shadow-2xl p-5 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="font-cinzel font-black text-xl text-amber-100">
                    Confirm Card & Commit to Permanent Codex
                  </h3>
                  <p className="text-xs text-stone-400">
                    Review synthesized attributes, multi-agent validation, and permanent collection storage.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmSaveModal(false)}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content: 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Interactive Card Preview */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[280px]">
                  <CardItem 
                    card={assembledActiveCard} 
                    onInspect={() => onInspectCard(assembledActiveCard)} 
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-2 font-mono text-center">
                  Live synthesized render • ID: {assembledActiveCard.id}
                </p>
              </div>

              {/* Right Column: Specification & Agent Verification */}
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-base text-amber-200">
                      {assembledActiveCard.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Cost: {assembledActiveCard.cost}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                      <span className="text-stone-400 block text-[10px]">POWER</span>
                      <strong className="text-red-400 text-sm">{assembledActiveCard.power}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                      <span className="text-stone-400 block text-[10px]">DEFENSE</span>
                      <strong className="text-blue-400 text-sm">{assembledActiveCard.defense}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                      <span className="text-stone-400 block text-[10px]">RANK</span>
                      <strong className="text-purple-400 text-sm">{assembledActiveCard.divineRank}★</strong>
                    </div>
                  </div>

                  <div className="text-xs text-stone-300 space-y-1">
                    <p><strong>Domain:</strong> <span className="text-amber-300">{assembledActiveCard.domain}</span> ({assembledActiveCard.cardType} • {assembledActiveCard.subtype})</p>
                    <p className="italic text-stone-400 text-[11px]">"{assembledActiveCard.quote}"</p>
                  </div>
                </div>

                {/* 5-Agent Council Approval Sign-off */}
                <div className="p-4 rounded-2xl bg-stone-900/50 border border-amber-500/30 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-cinzel font-bold text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-400" />
                      <span>Multi-Agent Council Clearance Status</span>
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">5/5 APPROVED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950 border border-stone-800">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <div>
                        <strong className="text-stone-200 block">GLO-06 Domain Arbiter</strong>
                        <span className="text-stone-400 text-[10px]">Domain: {assembledActiveCard.domain} verified</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950 border border-stone-800">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <div>
                        <strong className="text-stone-200 block">GLO-05 Combat Curve</strong>
                        <span className="text-stone-400 text-[10px]">Stats balanced for cost</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950 border border-stone-800">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <div>
                        <strong className="text-stone-200 block">GLO-04 Abilities Architect</strong>
                        <span className="text-stone-400 text-[10px]">{(assembledActiveCard.abilities?.length || 0)} abilities verified</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950 border border-stone-800">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <div>
                        <strong className="text-stone-200 block">GLO-14 Lorekeeper</strong>
                        <span className="text-stone-400 text-[10px]">Canon mythos aligned</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Action Button */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowConfirmSaveModal(false)}
                    className="flex-1 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-cinzel font-bold text-xs transition"
                  >
                    Back to Editing
                  </button>

                  <button
                    type="button"
                    id="btn-modal-final-confirm-save"
                    onClick={() => {
                      handleForgeActiveCard();
                      setShowConfirmSaveModal(false);
                    }}
                    className="flex-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition hover:scale-102"
                  >
                    <Save size={16} />
                    <span>Confirm & Commit to Codex</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
