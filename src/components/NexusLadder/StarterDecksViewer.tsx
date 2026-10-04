import React, { useState } from 'react';
import { PRESET_DECKS, CARDS_DATABASE } from '../../data/cards';
import { DeckPreset, Card } from '../../types';
import { CardItem } from '../CardItem';
import { Swords, Play, Shield, Flame, Sparkles, BookOpen, Layers, Check } from 'lucide-react';

interface StarterDecksViewerProps {
  onSelectDeckForBattle: (deck: DeckPreset) => void;
  onInspectCard: (card: Card) => void;
}

export const StarterDecksViewer: React.FC<StarterDecksViewerProps> = ({
  onSelectDeckForBattle,
  onInspectCard
}) => {
  const [selectedDeck, setSelectedDeck] = useState<DeckPreset>(PRESET_DECKS[0]);

  const deckCards = selectedDeck.cardIds
    .map(id => CARDS_DATABASE.find(c => c.id === id))
    .filter(Boolean) as Card[];

  return (
    <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="text-amber-400" size={20} />
            <h3 className="font-cinzel font-bold text-lg text-amber-100">
              Stage 25: Five Introductory Domain Starter Decks
            </h3>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            Pre-constructed, balanced 40-card competitive starter decks engineered to teach each Domain.
          </p>
        </div>

        <button
          onClick={() => onSelectDeckForBattle(selectedDeck)}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition hover:scale-105"
        >
          <Swords size={16} />
          <span>Launch into Arena</span>
        </button>
      </div>

      {/* 5 Starter Deck Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {PRESET_DECKS.map((deck) => {
          const isSelected = selectedDeck.id === deck.id;
          return (
            <button
              key={deck.id}
              onClick={() => setSelectedDeck(deck)}
              className={`p-3 rounded-xl text-left border transition flex flex-col justify-between h-28 ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-amber-100 ring-1 ring-amber-400/50 shadow-md'
                  : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
              }`}
            >
              <div>
                <span 
                  className="text-[9px] font-cinzel font-bold px-1.5 py-0.5 rounded uppercase"
                  style={{ backgroundColor: `${deck.color}33`, color: deck.color, border: `1px solid ${deck.color}66` }}
                >
                  {deck.domain}
                </span>
                <h4 className="font-cinzel font-bold text-xs text-stone-100 mt-1.5 truncate">
                  {deck.name}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                {deck.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Deck Inspection Header */}
      <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-cinzel text-amber-400 uppercase tracking-widest block">
            Selected Deck Strategy & Archetype
          </span>
          <h3 className="font-cinzel font-black text-xl text-amber-100">
            {selectedDeck.name} • {selectedDeck.title}
          </h3>
          <p className="text-xs text-stone-300 mt-1 max-w-2xl">
            {selectedDeck.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 font-mono text-xs text-amber-300">
            Deck Size: <strong>{deckCards.length} Cards</strong>
          </div>
        </div>
      </div>

      {/* Deck Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {deckCards.map((card, idx) => (
          <div key={`${card.id}-${idx}`} className="flex justify-center">
            <CardItem
              card={card}
              size="md"
              onInspect={() => onInspectCard(card)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
