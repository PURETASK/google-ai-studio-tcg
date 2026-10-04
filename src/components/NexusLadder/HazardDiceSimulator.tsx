import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Dices, 
  RotateCcw, 
  ShieldAlert, 
  Zap, 
  Skull, 
  Compass, 
  CheckCircle2, 
  Coins 
} from 'lucide-react';

interface HazardEvent {
  id: string;
  name: string;
  domain: string;
  description: string;
  dcThreshold: number;
  fumbleText: string;
  normalText: string;
  surgeText: string;
}

const HAZARD_EVENTS: HazardEvent[] = [
  {
    id: 'hz-1',
    name: 'Volcanic Ash Cataclysm',
    domain: 'Radiance',
    description: 'Molten fissures rupture the battlefield. Units must brace or suffer severe burn damage.',
    dcThreshold: 12,
    fumbleText: 'Natural 1: All units without Armor take 3 Fire damage and become scorched.',
    normalText: 'Roll 2-14: Vanguard units take 1 Fire damage; Rearguard is sheltered.',
    surgeText: 'Roll 15-20: Surge! Active player channels the magma—enemy units take 2 Fire damage, friendly units gain +1 Power.'
  },
  {
    id: 'hz-2',
    name: 'Void Rift Singularity',
    domain: 'Abyss',
    description: 'Dimensional singularity pulls aether and life into the boundless void.',
    dcThreshold: 14,
    fumbleText: 'Natural 1: Both Sovereigns lose 4 Nexus Life and discard 1 card.',
    normalText: 'Roll 2-13: Both players lose 2 Essence capacity next turn.',
    surgeText: 'Roll 14-20: The void stabilizes! Active player draws 1 card from their Voidwell.'
  },
  {
    id: 'hz-3',
    name: 'Astral Mana Surge',
    domain: 'Arcane',
    description: 'Cosmic alignment unlocks wild temporal fluxes across the Nexus Chain.',
    dcThreshold: 10,
    fumbleText: 'Natural 1: Spells cost +2 Essence to cast for the next 2 turns.',
    normalText: 'Roll 2-14: Both players immediately Scry 2 from their Grimoires.',
    surgeText: 'Roll 15-20: Temporal Surge! Active player gains +2 temporary Essence and draws 1 card.'
  }
];

export const HazardDiceSimulator: React.FC = () => {
  const [selectedHazard, setSelectedHazard] = useState<HazardEvent>(HAZARD_EVENTS[0]);
  const [d20Roll, setD20Roll] = useState<number | null>(null);
  const [d6Roll, setD6Roll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [fateTokens, setFateTokens] = useState<number>(2);
  const [history, setHistory] = useState<{ hazard: string; d20: number; outcome: string }[]>([]);

  const handleRollDice = () => {
    setIsRolling(true);
    setD20Roll(null);
    setD6Roll(null);

    setTimeout(() => {
      const rolledD20 = Math.floor(Math.random() * 20) + 1;
      const rolledD6 = Math.floor(Math.random() * 6) + 1;
      setD20Roll(rolledD20);
      setD6Roll(rolledD6);
      setIsRolling(false);

      let outcome = '';
      if (rolledD20 === 1) outcome = 'Critical Fumble';
      else if (rolledD20 >= selectedHazard.dcThreshold) outcome = 'Divine Surge (Success)';
      else outcome = 'Standard Hazard Resolution';

      setHistory(prev => [{ hazard: selectedHazard.name, d20: rolledD20, outcome }, ...prev.slice(0, 4)]);
    }, 600);
  };

  const handleUseFateToken = () => {
    if (fateTokens <= 0) return;
    setFateTokens(prev => prev - 1);
    handleRollDice();
  };

  return (
    <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Dices className="text-amber-400" size={20} />
            <h3 className="font-cinzel font-bold text-lg text-amber-100">
              Stages 11 & 12: Hazard & Dice Probability Engine
            </h3>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            Test D20 skill checks, environmental cataclysms, and tactical Fate Token rerolls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-stone-950 border border-amber-500/40 font-mono text-xs text-amber-300 flex items-center gap-1.5">
            <Coins size={14} className="text-yellow-400" />
            <span>Fate Tokens: <strong>{fateTokens} / 2</strong></span>
          </div>
          {fateTokens < 2 && (
            <button
              onClick={() => setFateTokens(2)}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition"
              title="Replenish Fate Tokens"
            >
              <RotateCcw size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Hazard Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {HAZARD_EVENTS.map(hz => (
          <button
            key={hz.id}
            onClick={() => setSelectedHazard(hz)}
            className={`p-3 rounded-xl text-left border transition ${
              selectedHazard.id === hz.id
                ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-md'
                : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-cinzel font-bold mb-1">
              <span>{hz.name}</span>
              <span className="text-[10px] font-mono text-amber-400">DC {hz.dcThreshold}</span>
            </div>
            <p className="text-[11px] text-stone-300 line-clamp-2">
              {hz.description}
            </p>
          </button>
        ))}
      </div>

      {/* Active Dice Rolling Arena */}
      <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Dice Display */}
        <div className="flex items-center gap-6">
          {/* D20 Visual */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center font-cinzel font-black text-3xl shadow-2xl transition-all duration-300 ${
              isRolling
                ? 'border-amber-400 bg-amber-950/40 animate-spin'
                : d20Roll === 20
                ? 'border-yellow-400 bg-yellow-500/30 text-yellow-300 shadow-[0_0_25px_rgba(234,179,8,0.6)]'
                : d20Roll === 1
                ? 'border-red-500 bg-red-950/50 text-red-400'
                : 'border-stone-700 bg-stone-900 text-stone-100'
            }`}>
              {isRolling ? '?' : d20Roll ?? 'D20'}
            </div>
            <span className="text-[10px] font-mono uppercase text-stone-400">
              Hazard Check (D20)
            </span>
          </div>

          {/* D6 Visual */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-xl border flex items-center justify-center font-mono font-bold text-xl shadow-lg ${
              isRolling ? 'border-amber-400 bg-stone-900 animate-pulse' : 'border-stone-700 bg-stone-900 text-amber-300'
            }`}>
              {isRolling ? '?' : d6Roll ?? 'D6'}
            </div>
            <span className="text-[10px] font-mono uppercase text-stone-400">
              Damage Dice (D6)
            </span>
          </div>
        </div>

        {/* Middle: Actions */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <button
            onClick={handleRollDice}
            disabled={isRolling}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isRolling ? 'Rolling Dice...' : `Roll for ${selectedHazard.name}`}
          </button>

          {d20Roll !== null && (
            <button
              onClick={handleUseFateToken}
              disabled={fateTokens <= 0 || isRolling}
              className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 font-mono text-xs flex items-center gap-1.5 transition disabled:opacity-40"
            >
              <Coins size={13} className="text-yellow-400" />
              <span>Spend 1 Fate Token (Reroll)</span>
            </button>
          )}
        </div>

        {/* Right: Outcome Details */}
        <div className="flex-1 w-full bg-stone-900 p-4 rounded-xl border border-stone-800 text-xs space-y-2">
          <span className="font-cinzel text-[10px] text-stone-400 uppercase tracking-wider block">
            Resolution Status
          </span>
          {d20Roll === null ? (
            <p className="text-stone-400 italic">Roll the D20 to test hazard surge resolution.</p>
          ) : (
            <div className="space-y-1">
              <p className="font-bold text-amber-200">
                {d20Roll === 1 && '⚠️ CRITICAL FUMBLE!'}
                {d20Roll >= selectedHazard.dcThreshold && '✨ DIVINE SURGE SUCCESS!'}
                {d20Roll > 1 && d20Roll < selectedHazard.dcThreshold && '⚔️ STANDARD RESOLUTION'}
              </p>
              <p className="text-stone-300 text-[11px]">
                {d20Roll === 1 ? selectedHazard.fumbleText : d20Roll >= selectedHazard.dcThreshold ? selectedHazard.surgeText : selectedHazard.normalText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
