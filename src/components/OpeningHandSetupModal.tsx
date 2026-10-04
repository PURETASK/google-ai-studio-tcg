import React, { useState } from 'react';
import { Card } from '../types';
import { CardItem } from './CardItem';
import { soundEngine } from '../utils/audioEngine';
import { 
  Shield, 
  Trash2, 
  Sparkles, 
  Eye, 
  Flame, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  AlertCircle,
  Skull,
  Dices
} from 'lucide-react';

interface OpeningHandSetupModalProps {
  isOpen: boolean;
  drawnCards: Card[];
  onComplete: (result: {
    finalHand: Card[];
    lockedCards: Card[];
    discardedCards: Card[];
    exiledCards: Card[];
  }) => void;
  onInspectCard?: (card: Card) => void;
}

export const OpeningHandSetupModal: React.FC<OpeningHandSetupModalProps> = ({
  isOpen,
  drawnCards,
  onComplete,
  onInspectCard
}) => {
  if (!isOpen || !drawnCards || drawnCards.length === 0) return null;

  // Step 1: Lock 2 Soulbound
  // Step 2: Discard 2 to Graveyard
  // Step 3: Opponent Exiles 2 into the Void
  // Step 4: Confirm Hand of 7
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [lockedIds, setLockedIds] = useState<string[]>([]);
  const [discardedIds, setDiscardedIds] = useState<string[]>([]);
  const [exiledIds, setExiledIds] = useState<string[]>([]);
  const [isOpponentExiling, setIsOpponentExiling] = useState(false);

  const toggleLockCard = (card: Card) => {
    const cardId = card.instanceId || card.id;
    if (lockedIds.includes(cardId)) {
      setLockedIds(prev => prev.filter(id => id !== cardId));
      soundEngine.playMicroSound('click');
    } else {
      if (lockedIds.length >= 2) {
        soundEngine.playMicroSound('error');
        return;
      }
      setLockedIds(prev => [...prev, cardId]);
      soundEngine.playMicroSound('equip');
    }
  };

  const toggleDiscardCard = (card: Card) => {
    const cardId = card.instanceId || card.id;
    if (lockedIds.includes(cardId)) return; // Cannot discard locked card

    if (discardedIds.includes(cardId)) {
      setDiscardedIds(prev => prev.filter(id => id !== cardId));
      soundEngine.playMicroSound('click');
    } else {
      if (discardedIds.length >= 2) {
        soundEngine.playMicroSound('error');
        return;
      }
      setDiscardedIds(prev => [...prev, cardId]);
      soundEngine.playCombatClash('slay');
    }
  };

  const handleProceedToStep2 = () => {
    if (lockedIds.length !== 2) return;
    soundEngine.playMicroSound('select');
    setCurrentStep(2);
  };

  const handleProceedToStep3 = () => {
    if (discardedIds.length !== 2) return;
    soundEngine.playCombatClash('spell');
    setCurrentStep(3);
    setIsOpponentExiling(true);

    // AI Opponent randomly exiles 2 cards from the 7 remaining un-locked, un-discarded cards
    setTimeout(() => {
      const eligibleForExile = drawnCards.filter(c => {
        const id = c.instanceId || c.id;
        return !lockedIds.includes(id) && !discardedIds.includes(id);
      });

      const shuffled = [...eligibleForExile].sort(() => Math.random() - 0.5);
      const chosenExile = shuffled.slice(0, 2).map(c => c.instanceId || c.id);

      setExiledIds(chosenExile);
      setIsOpponentExiling(false);
      soundEngine.playCombatClash('slay');
      setCurrentStep(4);
    }, 1400);
  };

  const handleAutoOptimize = () => {
    soundEngine.playMicroSound('select');
    // Lock lowest cost / key combo cards
    const sorted = [...drawnCards].sort((a, b) => a.cost - b.cost);
    const autoLocked = sorted.slice(0, 2).map(c => c.instanceId || c.id);

    // Discard highest cost cards for GY setup
    const remaining = sorted.slice(2);
    const autoDiscarded = remaining.slice(-2).map(c => c.instanceId || c.id);

    const eligible = remaining.slice(0, -2);
    const autoExiled = eligible.slice(-2).map(c => c.instanceId || c.id);

    setLockedIds(autoLocked);
    setDiscardedIds(autoDiscarded);
    setExiledIds(autoExiled);
    setCurrentStep(4);
  };

  const handleFinalize = () => {
    soundEngine.playCombatClash('turnStart');
    const finalHand = drawnCards.filter(c => {
      const id = c.instanceId || c.id;
      return !discardedIds.includes(id) && !exiledIds.includes(id);
    });

    const lockedCards = drawnCards.filter(c => lockedIds.includes(c.instanceId || c.id));
    const discardedCards = drawnCards.filter(c => discardedIds.includes(c.instanceId || c.id));
    const exiledCards = drawnCards.filter(c => exiledIds.includes(c.instanceId || c.id));

    onComplete({
      finalHand,
      lockedCards,
      discardedCards,
      exiledCards
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-6xl max-h-[92vh] bg-stone-950 border-2 border-amber-500/60 rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Header & Step Tracker */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
                Competitive Match Protocol
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                11-7 Hand Setting
              </span>
            </div>
            <h3 className="font-cinzel font-black text-lg sm:text-xl text-stone-100 mt-0.5">
              {currentStep === 1 && 'Step 1: Lock 2 Soulbound Cards'}
              {currentStep === 2 && 'Step 2: Discard 2 Cards to Boneyard'}
              {currentStep === 3 && 'Step 3: Opponent Exiles 2 Cards to Void'}
              {currentStep === 4 && 'Step 4: Confirm Starting 7-Card Hand'}
            </h3>
          </div>

          {/* Step Pill Indicators */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(stepNum => (
              <div
                key={stepNum}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  currentStep === stepNum
                    ? 'bg-amber-500 text-black ring-2 ring-amber-300'
                    : currentStep > stepNum
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {currentStep > stepNum ? '✓' : stepNum}
              </div>
            ))}

            <button
              onClick={handleAutoOptimize}
              className="ml-3 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-mono border border-amber-500/30 flex items-center gap-1 transition"
              title="Automatically choose optimal 11-7 distribution"
            >
              <Dices size={13} />
              <span>Auto 11-7</span>
            </button>
          </div>
        </div>

        {/* Step Instructions Banner */}
        <div className="my-2 p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
          <p>
            {currentStep === 1 && 'Select 2 cards to mark as Soulbound. They are protected and cannot be discarded or exiled by opponent interactions.'}
            {currentStep === 2 && 'Select 2 cards to send to your Boneyard (Graveyard) as early resource catalysts for turn 1.'}
            {currentStep === 3 && (isOpponentExiling ? 'Opponent is analyzing your hand and exiling 2 cards into the Void...' : 'Opponent interaction complete.')}
            {currentStep === 4 && 'Your starting hand of exactly 7 cards is ready. Commence turn 1!'}
          </p>

          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold shrink-0 ml-3">
            <span>Locked: {lockedIds.length}/2</span>
            <span>•</span>
            <span>Discarded: {discardedIds.length}/2</span>
            <span>•</span>
            <span>Exiled: {exiledIds.length}/2</span>
          </div>
        </div>

        {/* 11 Drawn Cards Interactive Fan Tray */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {drawnCards.map((card, idx) => {
              const cardId = card.instanceId || card.id;
              const isLocked = lockedIds.includes(cardId);
              const isDiscarded = discardedIds.includes(cardId);
              const isExiled = exiledIds.includes(cardId);

              return (
                <div
                  key={`${cardId}-${idx}`}
                  onClick={() => {
                    if (currentStep === 1) toggleLockCard(card);
                    else if (currentStep === 2) toggleDiscardCard(card);
                  }}
                  className={`relative rounded-2xl transition-all cursor-pointer p-1 ${
                    isLocked
                      ? 'ring-4 ring-amber-400 bg-amber-950/40 scale-102 shadow-xl'
                      : isDiscarded
                      ? 'ring-4 ring-red-500 bg-red-950/40 opacity-60 grayscale'
                      : isExiled
                      ? 'ring-4 ring-purple-600 bg-purple-950/40 opacity-40 scale-95'
                      : 'hover:scale-102 hover:ring-2 hover:ring-amber-500/50'
                  }`}
                >
                  {/* Status Overlay Badges */}
                  <div className="absolute top-2 left-2 z-30 flex flex-col gap-1 pointer-events-none">
                    {isLocked && (
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-cinzel font-bold text-[9px] flex items-center gap-1 shadow-lg">
                        <Lock size={10} />
                        <span>SOULBOUND</span>
                      </span>
                    )}
                    {isDiscarded && (
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white font-cinzel font-bold text-[9px] flex items-center gap-1 shadow-lg">
                        <Trash2 size={10} />
                        <span>BONEYARD</span>
                      </span>
                    )}
                    {isExiled && (
                      <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-cinzel font-bold text-[9px] flex items-center gap-1 shadow-lg">
                        <Skull size={10} />
                        <span>VOID EXILE</span>
                      </span>
                    )}
                  </div>

                  <CardItem
                    card={card}
                    size="sm"
                    interactive={false}
                    showInspectButton={false}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Confirmation Action Controls */}
        <div className="flex items-center justify-between border-t border-stone-800 pt-3 mt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <span>Result: <strong>7 in Hand</strong></span>
            <span>•</span>
            <span>2 in Graveyard</span>
            <span>•</span>
            <span>2 in Void</span>
          </div>

          <div className="flex items-center gap-3">
            {currentStep === 1 && (
              <button
                onClick={handleProceedToStep2}
                disabled={lockedIds.length !== 2}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-500 text-black font-cinzel font-bold text-xs flex items-center gap-2 transition shadow-lg"
              >
                <span>Lock 2 & Proceed to Discard</span>
                <ArrowRight size={14} />
              </button>
            )}

            {currentStep === 2 && (
              <button
                onClick={handleProceedToStep3}
                disabled={discardedIds.length !== 2}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-stone-800 disabled:text-stone-500 text-white font-cinzel font-bold text-xs flex items-center gap-2 transition shadow-lg"
              >
                <span>Discard 2 & Trigger Opponent Exile</span>
                <ArrowRight size={14} />
              </button>
            )}

            {currentStep === 3 && (
              <button
                disabled
                className="px-6 py-2.5 rounded-xl bg-stone-800 text-purple-300 font-cinzel font-bold text-xs flex items-center gap-2 animate-pulse"
              >
                <span>Opponent is Exiling 2 Cards...</span>
              </button>
            )}

            {currentStep === 4 && (
              <button
                onClick={handleFinalize}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-2 animate-bounce"
              >
                <CheckCircle2 size={16} />
                <span>Commence Turn 1 (7 Cards)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
