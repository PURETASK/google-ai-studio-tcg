import React from 'react';
import { Card, DeckPreset, Domain } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { 
  X, 
  BarChart3, 
  Activity, 
  Flame, 
  Shield, 
  Zap, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface DeckDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deckCards: string[];
  deckName: string;
  deckDomain?: Domain;
}

export const DeckDiagnosticsModal: React.FC<DeckDiagnosticsModalProps> = ({
  isOpen,
  onClose,
  deckCards,
  deckName,
  deckDomain
}) => {
  if (!isOpen) return null;

  const cardObjects: Card[] = deckCards
    .map(id => CARDS_DATABASE.find(c => c.id === id))
    .filter((c): c is Card => c !== undefined);

  const totalCards = cardObjects.length;

  // Mana Curve histogram (0 to 7+)
  const curveBuckets = [0, 0, 0, 0, 0, 0, 0, 0]; // 0, 1, 2, 3, 4, 5, 6, 7+
  let totalEssence = 0;

  // Type Breakdown
  let unitCount = 0;
  let spellCount = 0;
  let artifactCount = 0;
  let hazardCount = 0;

  // Domain breakdown
  const domainCounts: Record<string, number> = {};

  // Keyword counters
  let shieldKeywords = 0;
  let burnKeywords = 0;
  let drawKeywords = 0;
  let removalKeywords = 0;
  let frenzyKeywords = 0;

  cardObjects.forEach(card => {
    const cost = Math.min(7, Math.max(0, card.cost));
    curveBuckets[cost] = (curveBuckets[cost] || 0) + 1;
    totalEssence += card.cost;

    if (card.cardType === 'Champion' || card.cardType === 'Beast' || card.cardType === 'Weapon' || card.cardType === 'Armor') unitCount++;
    else if (card.cardType === 'Spell') spellCount++;
    else if (card.cardType === 'Artifact' || card.cardType === 'Relic') artifactCount++;

    domainCounts[card.domain] = (domainCounts[card.domain] || 0) + 1;

    const glyphsText = card.powerGlyphs?.map(g => `${g.name} ${g.ruleClause} ${g.shortTag}`).join(' ') || '';
    const desc = `${card.name} ${card.subtitle} ${card.subtype} ${card.primaryPower || ''} ${glyphsText}`.toLowerCase();
    if (desc.includes('shield') || desc.includes('ward') || desc.includes('protect')) shieldKeywords++;
    if (desc.includes('burn') || desc.includes('fire') || desc.includes('scorch')) burnKeywords++;
    if (desc.includes('draw') || desc.includes('card')) drawKeywords++;
    if (desc.includes('destroy') || desc.includes('damage') || desc.includes('slay')) removalKeywords++;
    if (desc.includes('frenzy') || desc.includes('attack') || desc.includes('rush')) frenzyKeywords++;
  });

  const avgCost = totalCards > 0 ? (totalEssence / totalCards).toFixed(1) : '0';

  // Determine Archetype
  let archetype = 'Balanced Midrange';
  let archetypedesc = 'Well-rounded curve with a mix of early presence and late-game impact.';
  let synergyGrade: 'S+' | 'S' | 'A' | 'B' | 'C' = 'A';

  const lowCostCount = (curveBuckets[1] || 0) + (curveBuckets[2] || 0);
  const highCostCount = (curveBuckets[5] || 0) + (curveBuckets[6] || 0) + (curveBuckets[7] || 0);

  if (lowCostCount >= 7 && parseFloat(avgCost) < 3.0) {
    archetype = 'Aggro Blitz / Rushdown';
    archetypedesc = 'Fast-paced aggressive deck looking to overwhelm the opponent in turns 1-4 before high-cost guardians come online.';
    synergyGrade = 'S';
  } else if (highCostCount >= 5 && parseFloat(avgCost) > 4.2) {
    archetype = 'Ramp & Titan Fortress';
    archetypedesc = 'Late-game powerhouse seeking to survive early skirmishes and drop high-tier behemoths.';
    synergyGrade = 'A';
  } else if (spellCount >= 7) {
    archetype = 'Spellstorm / Combo Weaver';
    archetypedesc = 'Spell-heavy archetype relying on tactical burst spells and domain resonance effects.';
    synergyGrade = 'S+';
  } else if (shieldKeywords >= 5) {
    archetype = 'Aegis Bastion / Control';
    archetypedesc = 'Defensive attrition deck that wears down opposing aggression using shields and counter-attacks.';
    synergyGrade = 'S';
  }

  // Diagnostic Warnings & Tips
  const diagnostics: { type: 'ok' | 'warn' | 'tip'; message: string }[] = [];

  if (totalCards < 10) {
    diagnostics.push({
      type: 'warn',
      message: `Deck has only ${totalCards}/15 cards. Add more cards to avoid fatiguing early.`
    });
  } else {
    diagnostics.push({
      type: 'ok',
      message: `Deck capacity is primed at ${totalCards}/15 cards.`
    });
  }

  if (lowCostCount < 3) {
    diagnostics.push({
      type: 'warn',
      message: 'Low count of 1-2 Essence cards. You may get mana-locked in early turns.'
    });
  } else {
    diagnostics.push({
      type: 'ok',
      message: 'Solid opening curve with adequate 1-2 Essence openers.'
    });
  }

  if (unitCount < 4) {
    diagnostics.push({
      type: 'warn',
      message: 'Very few Vanguard units! The opposing titan can freely attack your Commander throne.'
    });
  }

  if (drawKeywords === 0) {
    diagnostics.push({
      type: 'tip',
      message: 'Consider adding at least 1 card draw effect to maintain card advantage in longer matches.'
    });
  }

  const maxBucket = Math.max(...curveBuckets, 1);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-stone-950 border-2 border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500 flex items-center justify-center text-amber-300">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="font-cinzel font-black text-lg text-amber-200">
                Deck Archetype Diagnostics
              </h3>
              <p className="text-xs text-stone-400 font-sans">
                {deckName} • {deckDomain || 'Multi-Domain'} Grimoire
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Archetype & Synergy Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-center">
            <span className="text-[10px] text-amber-400 uppercase tracking-widest font-cinzel block">
              Archetype Class
            </span>
            <span className="text-sm font-cinzel font-black text-amber-100 block mt-1">
              {archetype}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-center">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-cinzel block">
              Average Essence Cost
            </span>
            <span className="text-base font-mono font-black text-stone-100 block mt-1">
              ⚡ {avgCost}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-center">
            <span className="text-[10px] text-purple-400 uppercase tracking-widest font-cinzel block">
              Synergy Rating
            </span>
            <span className="text-lg font-cinzel font-black text-purple-200 block mt-0.5">
              Grade {synergyGrade}
            </span>
          </div>
        </div>

        {/* Mana Curve Histogram */}
        <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-cinzel text-stone-300">
            <span className="font-bold flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" />
              Mana Curve Distribution
            </span>
            <span className="text-[11px] text-stone-400 font-mono">
              Total Cards: {totalCards}
            </span>
          </div>

          <div className="flex items-end justify-between gap-2 h-28 pt-4 px-2 border-b border-stone-800">
            {curveBuckets.map((count, cost) => {
              const heightPercent = maxBucket > 0 ? (count / maxBucket) * 100 : 0;
              return (
                <div key={cost} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                  <span className="text-[10px] font-mono text-amber-300 font-bold">
                    {count > 0 ? count : ''}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-amber-600 to-amber-400 group-hover:brightness-125 transition-all"
                    style={{ height: `${Math.max(4, heightPercent)}%` }}
                  />
                  <span className="text-[11px] font-cinzel font-bold text-stone-400 mt-1">
                    {cost === 7 ? '7+' : cost}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Composition & Keywords */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-cinzel">
          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Vanguard Units</span>
            <span className="text-stone-100 font-mono font-bold text-sm">⚔️ {unitCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Spells</span>
            <span className="text-stone-100 font-mono font-bold text-sm">✨ {spellCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Defense Wards</span>
            <span className="text-stone-100 font-mono font-bold text-sm">🛡️ {shieldKeywords}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Card Draw</span>
            <span className="text-stone-100 font-mono font-bold text-sm">🎴 {drawKeywords}</span>
          </div>
        </div>

        {/* Tactical AI Recommendations */}
        <div className="space-y-2">
          <h4 className="text-xs font-cinzel font-bold text-stone-300 flex items-center gap-1.5">
            <Lightbulb size={14} className="text-amber-400" />
            Tactical Advisory & Insights
          </h4>

          <div className="space-y-1.5">
            {diagnostics.map((diag, i) => (
              <div 
                key={i} 
                className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
                  diag.type === 'ok' 
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
                    : diag.type === 'warn'
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                    : 'bg-blue-950/30 border-blue-500/40 text-blue-300'
                }`}
              >
                {diag.type === 'ok' ? (
                  <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                ) : diag.type === 'warn' ? (
                  <AlertTriangle size={15} className="text-amber-400 mt-0.5 shrink-0" />
                ) : (
                  <Sparkles size={15} className="text-blue-400 mt-0.5 shrink-0" />
                )}
                <span>{diag.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Close Action */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
          >
            Acknowledge & Close Diagnostics
          </button>
        </div>

      </div>
    </div>
  );
};
