import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, DeckPreset, Domain } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { getCustomCardsSync } from '../utils/customCardStorage';
import { soundEngine } from '../utils/audioEngine';
import { 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Code, 
  Share2, 
  X, 
  Sparkles, 
  Upload, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface DeckExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDeck: DeckPreset;
  cardIds: string[];
  onImportDeck: (importedDeck: DeckPreset, cardIds: string[]) => void;
}

export const DeckExportModal: React.FC<DeckExportModalProps> = ({
  isOpen,
  onClose,
  activeDeck,
  cardIds,
  onImportDeck
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'json' | 'code' | 'import'>('text');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  // Resolve deck cards from global database and custom storage
  const customCards = getCustomCardsSync();
  const allPool = [...CARDS_DATABASE, ...customCards];

  const deckCards: Card[] = cardIds
    .map(id => allPool.find(c => c.id === id))
    .filter((c): c is Card => c !== undefined);

  // 1. Generate Formatted Text String (Decklist for Discord / Forums)
  const cardCounts: Record<string, { card: Card; count: number }> = {};
  deckCards.forEach(c => {
    if (!cardCounts[c.id]) {
      cardCounts[c.id] = { card: c, count: 0 };
    }
    cardCounts[c.id].count += 1;
  });

  const totalCost = deckCards.reduce((sum, c) => sum + c.cost, 0);
  const avgCost = deckCards.length ? (totalCost / deckCards.length).toFixed(1) : '0';
  const totalPower = deckCards.reduce((sum, c) => sum + c.power, 0);
  const totalDefense = deckCards.reduce((sum, c) => sum + c.defense, 0);

  const textDecklist = `=== ${activeDeck.name.toUpperCase()} ===
Domain: ${activeDeck.domain}
Total Cards: ${deckCards.length}
Average Cost: ${avgCost} Mana | Total Power: ${totalPower} | Total Defense: ${totalDefense}
Description: ${activeDeck.description}

--- DECKLIST ---
${Object.values(cardCounts)
  .map(
    item =>
      `${item.count}x [${item.card.cost} Mana] ${item.card.name} (${item.card.rarity} ${item.card.cardType} - ${item.card.domain})`
  )
  .join('\n')}

--- ABILITY SYNERGIES ---
${deckCards
  .flatMap(c => c.abilities.map(a => `• ${c.name}: [${a.type || 'Ability'}] ${a.name} - ${a.description}`))
  .slice(0, 8)
  .join('\n')}

Exported from Realm of Nexus TCG Engine`;

  // 2. Generate Formatted JSON
  const jsonDecklist = JSON.stringify(
    {
      format: 'NEXUS_TCG_DECK_V2',
      id: `deck-${Date.now()}`,
      name: activeDeck.name,
      description: activeDeck.description,
      domain: activeDeck.domain,
      cardCount: deckCards.length,
      stats: {
        averageCost: Number(avgCost),
        totalPower,
        totalDefense
      },
      cardIds,
      cards: deckCards.map(c => ({
        id: c.id,
        name: c.name,
        cost: c.cost,
        domain: c.domain,
        cardType: c.cardType,
        rarity: c.rarity,
        power: c.power,
        defense: c.defense
      })),
      exportedAt: new Date().toISOString()
    },
    null,
    2
  );

  // 3. Compact Deck Code
  const compactPayload = {
    fmt: 'NEXUS',
    nm: activeDeck.name,
    dom: activeDeck.domain,
    ids: cardIds
  };
  const compactCode = `NEXUS-DECK:${btoa(unescape(encodeURIComponent(JSON.stringify(compactPayload))))}`;

  const currentContent = activeTab === 'text' ? textDecklist : activeTab === 'json' ? jsonDecklist : compactCode;

  const handleCopy = () => {
    soundEngine.playMicroSound('click');
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundEngine.playMicroSound('select');
    const ext = activeTab === 'json' ? 'json' : 'txt';
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeDeck.name.toLowerCase().replace(/\s+/g, '-')}-deck.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleParseImport = () => {
    setImportStatus(null);
    try {
      let raw = importText.trim();
      if (!raw) throw new Error('Please paste a JSON, Deck Code, or Decklist to import.');

      if (raw.startsWith('NEXUS-DECK:')) {
        const b64 = raw.replace('NEXUS-DECK:', '');
        raw = decodeURIComponent(escape(atob(b64)));
      }

      let parsedIds: string[] = [];
      let deckName = 'Imported Custom Deck';
      let deckDomain: Domain = 'Sanctuary';

      if (raw.startsWith('{')) {
        const obj = JSON.parse(raw);
        if (obj.ids && Array.isArray(obj.ids)) {
          parsedIds = obj.ids;
          if (obj.nm) deckName = obj.nm;
          if (obj.dom) deckDomain = obj.dom;
        } else if (obj.cardIds && Array.isArray(obj.cardIds)) {
          parsedIds = obj.cardIds;
          if (obj.name) deckName = obj.name;
          if (obj.domain) deckDomain = obj.domain;
        } else {
          throw new Error('JSON format is missing "cardIds" or "ids" array.');
        }
      } else {
        // Parse text list by matching card names in database
        const lines = raw.split('\n');
        lines.forEach(line => {
          allPool.forEach(card => {
            if (line.toLowerCase().includes(card.name.toLowerCase())) {
              parsedIds.push(card.id);
            }
          });
        });
      }

      if (parsedIds.length === 0) {
        throw new Error('No valid cards could be recognized from the provided string.');
      }

      const importedPreset: DeckPreset = {
        id: `imported-${Date.now()}`,
        name: deckName,
        description: `Imported with ${parsedIds.length} cards.`,
        domain: deckDomain,
        cardIds: parsedIds,
        synergyGrade: 'A',
        difficulty: 'Intermediate'
      };

      onImportDeck(importedPreset, parsedIds);
      soundEngine.playCombatClash('victory');
      setImportStatus({
        success: true,
        message: `Successfully imported "${deckName}" with ${parsedIds.length} cards!`
      });
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      soundEngine.playMicroSound('error');
      setImportStatus({
        success: false,
        message: err?.message || 'Failed to parse deck payload.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="font-cinzel font-black text-lg text-stone-100 flex items-center gap-2">
                <span>Deck Share & Export Hub</span>
              </h3>
              <p className="text-xs text-stone-400 font-sans">
                Export & share "{activeDeck.name}" ({deckCards.length} cards)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('click');
              onClose();
            }}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition border border-stone-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-3 bg-stone-950/60 border-b border-stone-800 flex items-center gap-2 text-xs font-cinzel">
          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('hover');
              setActiveTab('text');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
              activeTab === 'text'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <FileText size={14} />
            <span>Formatted Text</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('hover');
              setActiveTab('json');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
              activeTab === 'json'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Code size={14} />
            <span>Formatted JSON</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('hover');
              setActiveTab('code');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
              activeTab === 'code'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Sparkles size={14} />
            <span>Deck Code</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroSound('hover');
              setActiveTab('import');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ml-auto ${
              activeTab === 'import'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-purple-400 hover:text-purple-200 hover:bg-purple-950/40 border border-purple-500/30'
            }`}
          >
            <Upload size={14} />
            <span>Import Deck</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'import' ? (
            <div className="space-y-3">
              <label className="text-xs font-cinzel font-bold text-stone-300 block">
                Paste Formatted JSON, Deck Code, or Card Text String:
              </label>
              <textarea
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder="Paste NEXUS-DECK: code, JSON object, or list of card names..."
                rows={8}
                className="w-full p-3 rounded-2xl bg-stone-950 border border-stone-800 text-stone-200 font-mono text-xs focus:outline-none focus:border-amber-400 resize-none"
              />

              {importStatus && (
                <div
                  className={`p-3 rounded-xl border text-xs font-cinzel font-bold flex items-center gap-2 ${
                    importStatus.success
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/60 border-red-500/40 text-red-300'
                  }`}
                >
                  {importStatus.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{importStatus.message}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleParseImport}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-cinzel font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <Upload size={15} />
                <span>Validate & Import into Builder</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  readOnly
                  value={currentContent}
                  rows={10}
                  className="w-full p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-stone-300 font-mono text-xs leading-relaxed focus:outline-none resize-none select-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="text-[11px] text-stone-400 font-sans">
                  {activeTab === 'text'
                    ? 'Ready for Discord, Reddit, or forums.'
                    : activeTab === 'json'
                    ? 'Full structured payload for programmatic exchange.'
                    : '1-line string for instant sharing.'}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white font-cinzel text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Download size={14} />
                    <span>Download File</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-stone-950 font-cinzel text-xs font-black transition shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center gap-1.5"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY EXPORT'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
