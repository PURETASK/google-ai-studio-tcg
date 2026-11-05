import React, { useState, useRef } from 'react';
import { Card, Domain } from '../types';
import { CardItem } from './CardItem';
import {
  DOMAIN_VISUAL_IDENTITIES,
  CURATED_CARD_ARTWORKS,
  getResolvedCardArtUrl,
  generateRecommendedArtPrompt
} from '../data/cardArtPresets';
import { saveCustomCard, saveCustomCardsBatch } from '../utils/customCardStorage';
import { soundEngine } from '../utils/audioEngine';
import {
  X,
  Wand2,
  Sparkles,
  Play,
  Square,
  CheckCircle2,
  RefreshCw,
  Eye,
  Layers,
  Palette,
  Type as TypeIcon,
  Image as ImageIcon
} from 'lucide-react';

interface RosterArtGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: Card[];
  onUpdateCard: (updatedCard: Card) => void;
  onBulkUpdateCards: (updatedCards: Card[]) => void;
  onInspectCard: (card: Card) => void;
}

const DOMAINS_LIST: Domain[] = ['Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Tempest', 'Abyss'];

export const RosterArtGeneratorModal: React.FC<RosterArtGeneratorModalProps> = ({
  isOpen,
  onClose,
  cards,
  onUpdateCard,
  onBulkUpdateCards,
  onInspectCard
}) => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'All'>('All');
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0, currentCardName: '' });
  const [generatingCardIds, setGeneratingCardIds] = useState<Record<string, boolean>>({});
  const [statusLog, setStatusLog] = useState<string>(
    'All 6 Domain Visual Identities active. Ready for single-card or batch AI artwork synthesis.'
  );
  const abortBatchRef = useRef<boolean>(false);

  if (!isOpen) return null;

  const filteredCards = cards.filter(c => selectedDomain === 'All' || c.domain === selectedDomain);

  // Synthesize AI artwork for a single card
  const synthesizeCardArt = async (card: Card): Promise<Card | null> => {
    setGeneratingCardIds(prev => ({ ...prev, [card.id]: true }));
    try {
      const response = await fetch('/api/art/generate-card-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card,
          customPrompt: generateRecommendedArtPrompt(card)
        })
      });
      const data = await response.json();
      if (data && data.artUrl) {
        const updated: Card = {
          ...card,
          artUrl: data.artUrl
        };
        await saveCustomCard(updated);
        onUpdateCard(updated);
        return updated;
      }
    } catch (err) {
      console.error(`Failed to generate art for ${card.name}:`, err);
    } finally {
      setGeneratingCardIds(prev => ({ ...prev, [card.id]: false }));
    }
    return null;
  };

  const handleSingleCardGenerate = async (card: Card) => {
    soundEngine.playMicroSound('select');
    setStatusLog(`Synthesizing bespoke ${card.domain} artwork for "${card.name}"...`);
    const updated = await synthesizeCardArt(card);
    if (updated) {
      soundEngine.playMicroSound('click');
      setStatusLog(`Forged and saved new bespoke artwork for "${card.name}"!`);
    } else {
      setStatusLog(`Synthesis fallback engaged for "${card.name}".`);
    }
  };

  // Cycle through curated high-res JPG masterpieces for a card
  const handleCycleCuratedArt = async (card: Card) => {
    soundEngine.playMicroSound('click');
    const domainPool = CURATED_CARD_ARTWORKS.filter(a => a.domain === card.domain);
    const pool = domainPool.length > 0 ? domainPool : CURATED_CARD_ARTWORKS;
    const currentUrl = getResolvedCardArtUrl(card);
    const currentIdx = pool.findIndex(a => a.url === currentUrl);
    const nextArt = pool[(currentIdx + 1) % pool.length];

    const updated: Card = {
      ...card,
      artUrl: nextArt.url
    };
    await saveCustomCard(updated);
    onUpdateCard(updated);
    setStatusLog(`Assigned curated masterpiece "${nextArt.title}" to ${card.name}.`);
  };

  // Run batch AI synthesis across all filtered cards
  const handleStartBatchSynthesis = async () => {
    if (isBatchRunning || filteredCards.length === 0) return;
    soundEngine.playMicroSound('select');
    abortBatchRef.current = false;
    setIsBatchRunning(true);
    const targetList = [...filteredCards];
    setBatchProgress({ current: 0, total: targetList.length, currentCardName: targetList[0].name });

    let completedCount = 0;
    for (let i = 0; i < targetList.length; i++) {
      if (abortBatchRef.current) {
        setStatusLog(`Batch synthesis paused at ${completedCount} / ${targetList.length} cards.`);
        break;
      }
      const target = targetList[i];
      setBatchProgress({ current: i + 1, total: targetList.length, currentCardName: target.name });
      setStatusLog(`[${i + 1}/${targetList.length}] Forging ${target.domain} illustration for "${target.name}"...`);
      await synthesizeCardArt(target);
      completedCount++;
    }

    setIsBatchRunning(false);
    if (!abortBatchRef.current) {
      setStatusLog(`Batch complete! Synthesized and persisted artwork for ${completedCount} cards.`);
    }
  };

  const handleStopBatch = () => {
    abortBatchRef.current = true;
    setIsBatchRunning(false);
    setStatusLog('Stopping batch synthesis after current card completes...');
  };

  // Assign curated high-resolution 4:3 photographic fantasy assets to all filtered cards
  const handleAssignCuratedMasterpiecesToAll = async () => {
    soundEngine.playMicroSound('select');
    const updatedBatch: Card[] = filteredCards.map(c => {
      const resolvedUrl = getResolvedCardArtUrl({ ...c, artUrl: undefined });
      return {
        ...c,
        artUrl: resolvedUrl
      };
    });
    await saveCustomCardsBatch(updatedBatch);
    onBulkUpdateCards(updatedBatch);
    setStatusLog(`Bound high-resolution 4:3 curated domain masterpieces to ${updatedBatch.length} cards.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-7xl bg-stone-950 border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-900 via-neutral-900 to-stone-900 border-b border-stone-800 flex items-center justify-between gap-4">
          <div>
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>Domain Visual Identity & Real Artwork Studio</span>
            </span>
            <h2 className="font-cinzel font-black text-lg sm:text-2xl text-amber-100 mt-0.5">
              6-Domain Architectural Borders, Typography & AI Art Synthesizer
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isBatchRunning) handleStopBatch();
              onClose();
            }}
            className="p-2 rounded-full bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. Six-Domain Visual Identity Showcase Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                <Palette size={14} />
                <span>Domain-Specific Color Schemes, Display Fonts & Frame Silhouettes</span>
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                Click any domain below to filter the card roster
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
              {DOMAINS_LIST.map(dom => {
                const id = DOMAIN_VISUAL_IDENTITIES[dom];
                const isSelected = selectedDomain === dom;
                const domainCount = cards.filter(c => c.domain === dom).length;

                return (
                  <button
                    key={dom}
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('click');
                      setSelectedDomain(prev => (prev === dom ? 'All' : dom));
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'ring-2 ring-amber-400 scale-[1.01]'
                        : 'hover:border-stone-600 opacity-90 hover:opacity-100'
                    }`}
                    style={{
                      background: `linear-gradient(155deg, ${id.surfaceHex} 0%, #09090b 100%)`,
                      borderColor: isSelected ? id.primaryHex : `${id.primaryHex}55`
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className="text-[10px] font-mono uppercase tracking-wider font-bold"
                          style={{ color: id.primaryHex }}
                        >
                          {dom}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">{domainCount} cards</span>
                      </div>

                      {/* Domain-specific font sample */}
                      <div
                        className={`${id.fontClass} text-base font-bold mt-1 truncate`}
                        style={{ color: id.accentHex }}
                      >
                        {dom} Realm
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-1 text-[10px] text-stone-300 truncate">
                        <TypeIcon size={10} style={{ color: id.primaryHex }} className="shrink-0" />
                        <span className="truncate">{id.fontDisplayLabel}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-stone-400 truncate">
                        <Layers size={10} style={{ color: id.secondaryHex }} className="shrink-0" />
                        <span className="truncate">{id.frameTitle}</span>
                      </div>
                      {/* Color Swatch Bar */}
                      <div className="flex items-center gap-1 pt-0.5">
                        <span
                          className="h-2.5 flex-1 rounded-sm border border-white/20"
                          style={{ backgroundColor: id.primaryHex }}
                          title={`Primary: ${id.primaryHex}`}
                        />
                        <span
                          className="h-2.5 flex-1 rounded-sm border border-white/20"
                          style={{ backgroundColor: id.secondaryHex }}
                          title={`Secondary: ${id.secondaryHex}`}
                        />
                        <span
                          className="h-2.5 flex-1 rounded-sm border border-white/20"
                          style={{ backgroundColor: id.accentHex }}
                          title={`Accent: ${id.accentHex}`}
                        />
                        <span
                          className="h-2.5 flex-1 rounded-sm border border-white/20"
                          style={{ backgroundColor: id.surfaceHex }}
                          title={`Surface: ${id.surfaceHex}`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Batch AI Art Generator Controls & Status Bar */}
          <div className="p-4 rounded-2xl bg-stone-900/95 border border-amber-500/40 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-amber-300">
                  {selectedDomain === 'All'
                    ? `All Domains Selected (${filteredCards.length} Cards)`
                    : `${selectedDomain} Domain Selected (${filteredCards.length} Cards)`}
                </span>
              </div>
              <p className="text-xs font-mono text-stone-300">{statusLog}</p>

              {isBatchRunning && batchProgress.total > 0 && (
                <div className="pt-1.5 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-amber-300">
                    <span>Synthesizing: {batchProgress.currentCardName}</span>
                    <span>
                      {batchProgress.current} / {batchProgress.total} (
                      {Math.round((batchProgress.current / batchProgress.total) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 transition-all duration-300"
                      style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {selectedDomain !== 'All' && (
                <button
                  type="button"
                  onClick={() => setSelectedDomain('All')}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-cinzel font-bold transition"
                >
                  Show All ({cards.length})
                </button>
              )}

              <button
                type="button"
                disabled={isBatchRunning}
                onClick={handleAssignCuratedMasterpiecesToAll}
                className="px-3.5 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-200 border border-amber-500/40 font-cinzel font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <ImageIcon size={14} className="text-amber-400" />
                <span>Sync Curated Masterpieces</span>
              </button>

              {!isBatchRunning ? (
                <button
                  type="button"
                  onClick={handleStartBatchSynthesis}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-cinzel font-black text-xs shadow-lg flex items-center gap-2 transition hover:scale-[1.02]"
                >
                  <Play size={14} className="fill-black" />
                  <span>Batch Generate AI Art ({filteredCards.length} Cards)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopBatch}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-cinzel font-black text-xs shadow-lg flex items-center gap-2 transition"
                >
                  <Square size={14} className="fill-white" />
                  <span>Stop Batch Queue</span>
                </button>
              )}
            </div>
          </div>

          {/* 3. Live Card Grid with Upgraded Full-Art Showcase & Domain Frames */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredCards.map(card => {
              const isCardGenerating = !!generatingCardIds[card.id];
              const domainId = DOMAIN_VISUAL_IDENTITIES[card.domain] || DOMAIN_VISUAL_IDENTITIES.Radiance;

              return (
                <div
                  key={card.id}
                  className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 flex flex-col items-center gap-3 transition"
                >
                  <div className="relative">
                    <CardItem
                      card={card}
                      size="md"
                      onClick={() => onInspectCard(card)}
                      onInspect={c => onInspectCard(c)}
                    />
                    {isCardGenerating && (
                      <div className="absolute inset-0 z-40 rounded-2xl bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-4 text-center">
                        <Wand2 size={26} className="text-amber-400 animate-spin" />
                        <span className="font-cinzel font-bold text-xs text-amber-200">
                          Forging {card.domain} Art...
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Per-Card Domain Identity & Art Controls */}
                  <div className="w-full space-y-2 pt-1 border-t border-stone-800/80">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span style={{ color: domainId.primaryHex }} className="font-bold truncate">
                        {domainId.fontDisplayLabel}
                      </span>
                      <span className="text-stone-400 flex items-center gap-1 shrink-0">
                        <CheckCircle2 size={11} className="text-emerald-400" />
                        <span>Real Art</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        disabled={isCardGenerating || isBatchRunning}
                        onClick={() => handleSingleCardGenerate(card)}
                        className="col-span-1 py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-[10px] font-cinzel font-bold flex items-center justify-center gap-1 transition disabled:opacity-40"
                        title="Generate bespoke AI art for this card"
                      >
                        <Wand2 size={11} />
                        <span>AI Art</span>
                      </button>

                      <button
                        type="button"
                        disabled={isCardGenerating || isBatchRunning}
                        onClick={() => handleCycleCuratedArt(card)}
                        className="col-span-1 py-1.5 px-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-[10px] font-cinzel font-bold flex items-center justify-center gap-1 transition disabled:opacity-40"
                        title="Cycle curated high-fantasy paintings"
                      >
                        <RefreshCw size={11} />
                        <span>Swap Art</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onInspectCard(card)}
                        className="col-span-1 py-1.5 px-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-[10px] font-cinzel font-bold flex items-center justify-center gap-1 transition"
                        title="Open Deep-Dive Inspector & Artwork Studio"
                      >
                        <Eye size={11} />
                        <span>Studio</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
