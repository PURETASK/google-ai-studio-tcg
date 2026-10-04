import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Shield, 
  Sword, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Scale
} from 'lucide-react';
import { KEYWORDS_DATABASE } from '../../data/nexusLadderData';

export const PowerBudgetCalculator: React.FC = () => {
  const [cost, setCost] = useState<number>(3);
  const [power, setPower] = useState<number>(3);
  const [defense, setDefense] = useState<number>(3);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(['Swiftstrike']);
  const [customAbilityPoints, setCustomAbilityPoints] = useState<number>(0);

  // Baseline Formula: Stat Points = (Essence Cost * 2) + 2
  const maxBudget = cost * 2 + 2;

  // Calculate keyword deductions
  const keywordPoints = selectedKeywords.reduce((acc, kwName) => {
    const kw = KEYWORDS_DATABASE.find(k => k.name === kwName);
    return acc + (kw?.pointCost || 0);
  }, 0);

  const totalUsedBudget = power + defense + keywordPoints + customAbilityPoints;
  const balanceDelta = Number((maxBudget - totalUsedBudget).toFixed(1));

  const toggleKeyword = (kwName: string) => {
    setSelectedKeywords(prev => 
      prev.includes(kwName) ? prev.filter(k => k !== kwName) : [...prev, kwName]
    );
  };

  const getStatus = () => {
    if (Math.abs(balanceDelta) <= 0.5) return { text: 'Perfect Balance (Within Standard Tier 1 Margin)', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/40' };
    if (balanceDelta > 0.5) return { text: `Underpowered by +${balanceDelta} Points (Safe to buff stats/abilities)`, color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-500/40' };
    return { text: `Overpowered by ${Math.abs(balanceDelta)} Points (Exceeds Power Budget Ceiling!)`, color: 'text-red-400', bg: 'bg-red-950/40 border-red-500/40' };
  };

  const status = getStatus();

  return (
    <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="text-amber-400" size={20} />
            <h3 className="font-cinzel font-bold text-lg text-amber-100">
              Stage 20: Mathematical Power-Budget Calculator
            </h3>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            Evaluate card stat efficiency using the formal formula: <code className="text-amber-300 font-mono">Budget = (Cost × 2) + 2</code>
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-stone-950 border border-amber-500/40 font-mono text-xs text-amber-300">
          Max Stat Budget: <span className="font-bold text-sm text-amber-200">{maxBudget} Pts</span>
        </div>
      </div>

      {/* Input Sliders & Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cost & Stats */}
        <div className="space-y-4 bg-stone-950 p-4 rounded-xl border border-stone-800">
          <h4 className="font-cinzel text-xs uppercase tracking-wider text-amber-400">
            Core Numerical Values
          </h4>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-stone-300">Essence Cost:</span>
              <span className="text-amber-300 font-bold">{cost} Essence</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-stone-300">Attack Power:</span>
              <span className="text-red-400 font-bold">{power} Power</span>
            </div>
            <input
              type="range"
              min={0}
              max={15}
              value={power}
              onChange={(e) => setPower(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-stone-300">Defense / HP:</span>
              <span className="text-blue-400 font-bold">{defense} Defense</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={defense}
              onChange={(e) => setDefense(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-stone-300">Custom Ability Weight:</span>
              <span className="text-purple-400 font-bold">+{customAbilityPoints} pts</span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              step={0.5}
              value={customAbilityPoints}
              onChange={(e) => setCustomAbilityPoints(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Standardized Keyword Multipliers */}
        <div className="md:col-span-2 space-y-4 bg-stone-950 p-4 rounded-xl border border-stone-800">
          <div className="flex items-center justify-between">
            <h4 className="font-cinzel text-xs uppercase tracking-wider text-amber-400">
              Standardized Keyword Point Costs
            </h4>
            <span className="text-[11px] font-mono text-stone-400">
              Keywords Used: {keywordPoints} Pts
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {KEYWORDS_DATABASE.map((kw) => {
              const active = selectedKeywords.includes(kw.name);
              return (
                <button
                  key={kw.name}
                  onClick={() => toggleKeyword(kw.name)}
                  className={`p-2 rounded-lg text-left text-xs transition border flex flex-col justify-between ${
                    active
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold">{kw.name}</span>
                    <span className="font-mono text-[10px] text-amber-400 font-semibold">
                      +{kw.pointCost}p
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 truncate mt-1">
                    {kw.reminderText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resulting Balance Card */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${status.bg}`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {Math.abs(balanceDelta) <= 0.5 ? (
              <CheckCircle2 size={18} className="text-emerald-400" />
            ) : (
              <AlertTriangle size={18} className="text-amber-400" />
            )}
            <span className={`font-cinzel font-bold text-sm ${status.color}`}>
              {status.text}
            </span>
          </div>
          <p className="text-xs text-stone-300">
            Formula breakdown: Base Budget <span className="font-mono text-amber-300">{maxBudget}</span> vs Total Allocated <span className="font-mono text-amber-300">{totalUsedBudget}</span> (Power: {power}, Defense: {defense}, Keywords: {keywordPoints}, Abilities: {customAbilityPoints})
          </p>
        </div>

        <div className="px-4 py-2 rounded-lg bg-stone-950/80 border border-stone-800 font-mono text-xs flex items-center gap-3">
          <div>
            <span className="text-[10px] text-stone-400 block">DELTA</span>
            <span className={`font-bold text-base ${balanceDelta === 0 ? 'text-emerald-400' : balanceDelta > 0 ? 'text-blue-400' : 'text-red-400'}`}>
              {balanceDelta > 0 ? `+${balanceDelta}` : balanceDelta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
