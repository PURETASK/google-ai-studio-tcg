import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Card, Domain } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { soundEngine } from '../utils/audioEngine';
import { getCardRadarAttributes, getDomainColor } from './CardAttributeRadarChart';
import { 
  X, 
  ArrowLeftRight, 
  Sparkles, 
  Sword, 
  Shield, 
  Zap, 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Search,
  Scale,
  Award,
  Crown
} from 'lucide-react';

interface CardComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCardA?: Card;
  initialCardB?: Card;
  allCards: Card[];
  onSelectInspect?: (card: Card) => void;
}

export const CardComparisonModal: React.FC<CardComparisonModalProps> = ({
  isOpen,
  onClose,
  initialCardA,
  initialCardB,
  allCards,
  onSelectInspect
}) => {
  const [cardAId, setCardAId] = useState<string>(initialCardA?.id || allCards[0]?.id || CARDS_DATABASE[0].id);
  const [cardBId, setCardBId] = useState<string>(
    initialCardB?.id || allCards[1]?.id || CARDS_DATABASE[1].id
  );
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [selectorOpenFor, setSelectorOpenFor] = useState<'A' | 'B' | null>(null);

  if (!isOpen) return null;

  const cardA = allCards.find(c => c.id === cardAId) || CARDS_DATABASE[0];
  const cardB = allCards.find(c => c.id === cardBId) || CARDS_DATABASE[1];

  const statsA = getCardRadarAttributes(cardA);
  const statsB = getCardRadarAttributes(cardB);

  const radarData = [
    {
      attribute: 'Power',
      cardA: statsA.power,
      cardB: statsB.power,
      fullMark: 10
    },
    {
      attribute: 'Defense',
      cardA: statsA.defense,
      cardB: statsB.defense,
      fullMark: 10
    },
    {
      attribute: 'Speed',
      cardA: statsA.speed,
      cardB: statsB.speed,
      fullMark: 10
    },
    {
      attribute: 'Magic',
      cardA: statsA.magic,
      cardB: statsB.magic,
      fullMark: 10
    },
    {
      attribute: 'Utility',
      cardA: statsA.utility,
      cardB: statsB.utility,
      fullMark: 10
    },
    {
      attribute: 'Control',
      cardA: statsA.control,
      cardB: statsB.control,
      fullMark: 10
    }
  ];

  const colorA = getDomainColor(cardA.domain);
  const colorB = getDomainColor(cardB.domain);

  // Tactical verdict calculation
  const totalScoreA = statsA.power + statsA.defense + statsA.speed + statsA.magic + statsA.utility + statsA.control;
  const totalScoreB = statsB.power + statsB.defense + statsB.speed + statsB.magic + statsB.utility + statsB.control;
  const efficiencyA = (totalScoreA / Math.max(1, cardA.cost)).toFixed(1);
  const efficiencyB = (totalScoreB / Math.max(1, cardB.cost)).toFixed(1);

  const handleSwap = () => {
    soundEngine.playMicroSound('click');
    const temp = cardAId;
    setCardAId(cardBId);
    setCardBId(temp);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="w-full max-w-5xl bg-stone-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Scale size={20} />
            </div>
            <div>
              <h3 className="font-cinzel font-black text-lg text-stone-100 flex items-center gap-2">
                <span>Codex Card Comparison Studio</span>
              </h3>
              <p className="text-xs text-stone-400 font-sans">
                Side-by-side attribute, radar geometry, and domain ability breakdown
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 text-xs font-cinzel flex items-center gap-1.5 transition"
              title="Swap Card A & B positions"
            >
              <ArrowLeftRight size={14} />
              <span className="hidden sm:inline">Swap Sides</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playMicroSound('click');
                onClose();
              }}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition border border-stone-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Card Selectors Top Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card A Selector Card */}
            <div className="p-3.5 rounded-2xl bg-stone-950 border border-amber-500/40 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Card Alpha (Left Side)
                </span>
                <button
                  type="button"
                  onClick={() => setSelectorOpenFor(selectorOpenFor === 'A' ? null : 'A')}
                  className="text-[10px] font-cinzel text-stone-400 hover:text-amber-300 underline"
                >
                  {selectorOpenFor === 'A' ? 'Close Picker' : 'Change Card'}
                </button>
              </div>

              {selectorOpenFor === 'A' ? (
                <div className="space-y-2">
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-2.5 text-stone-500" />
                    <input
                      type="text"
                      placeholder="Search card by name..."
                      value={searchA}
                      onChange={e => setSearchA(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                    {allCards
                      .filter(c => c.name.toLowerCase().includes(searchA.toLowerCase()))
                      .map(c => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            soundEngine.playMicroSound('select');
                            setCardAId(c.id);
                            setSelectorOpenFor(null);
                          }}
                          className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-cinzel flex items-center justify-between transition ${
                            c.id === cardAId ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 hover:bg-stone-800 text-stone-300'
                          }`}
                        >
                          <span>{c.name}</span>
                          <span className="text-[10px] font-mono opacity-80">{c.domain} • {c.cost}m</span>
                        </button>
                      ))}
                  </div>
                </div>
              ) : (
                <motion.div 
                  key={cardA.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-stone-900 border border-amber-400/50 p-1 flex items-center justify-center shrink-0">
                    <img src={cardA.image} alt={cardA.name} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-sm text-stone-100">{cardA.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mt-0.5">
                      <span style={{ color: colorA }} className="font-bold">{cardA.domain}</span>
                      <span>•</span>
                      <span>{cardA.rarity}</span>
                      <span>•</span>
                      <span className="text-amber-300 font-bold">{cardA.cost} Mana</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Card B Selector Card */}
            <div className="p-3.5 rounded-2xl bg-stone-950 border border-blue-500/40 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
                  Card Beta (Right Side)
                </span>
                <button
                  type="button"
                  onClick={() => setSelectorOpenFor(selectorOpenFor === 'B' ? null : 'B')}
                  className="text-[10px] font-cinzel text-stone-400 hover:text-blue-300 underline"
                >
                  {selectorOpenFor === 'B' ? 'Close Picker' : 'Change Card'}
                </button>
              </div>

              {selectorOpenFor === 'B' ? (
                <div className="space-y-2">
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-2.5 text-stone-500" />
                    <input
                      type="text"
                      placeholder="Search card by name..."
                      value={searchB}
                      onChange={e => setSearchB(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                    {allCards
                      .filter(c => c.name.toLowerCase().includes(searchB.toLowerCase()))
                      .map(c => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            soundEngine.playMicroSound('select');
                            setCardBId(c.id);
                            setSelectorOpenFor(null);
                          }}
                          className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-cinzel flex items-center justify-between transition ${
                            c.id === cardBId ? 'bg-blue-500 text-white font-bold' : 'bg-stone-900 hover:bg-stone-800 text-stone-300'
                          }`}
                        >
                          <span>{c.name}</span>
                          <span className="text-[10px] font-mono opacity-80">{c.domain} • {c.cost}m</span>
                        </button>
                      ))}
                  </div>
                </div>
              ) : (
                <motion.div 
                  key={cardB.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-stone-900 border border-blue-400/50 p-1 flex items-center justify-center shrink-0">
                    <img src={cardB.image} alt={cardB.name} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-sm text-stone-100">{cardB.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mt-0.5">
                      <span style={{ color: colorB }} className="font-bold">{cardB.domain}</span>
                      <span>•</span>
                      <span>{cardB.rarity}</span>
                      <span>•</span>
                      <span className="text-blue-300 font-bold">{cardB.cost} Mana</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

          </div>

          {/* Central Visual Section: Dual Radar Chart & Stat Meters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Dual Radar Chart Visual */}
            <div className="lg:col-span-6 p-4 rounded-3xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center relative">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Sparkles size={13} />
                  Dual-Radar Attribute Geometry
                </span>
                <div className="flex items-center gap-3 text-[10px] font-mono font-bold">
                  <span className="flex items-center gap-1 text-amber-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    {cardA.name.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1 text-blue-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                    {cardB.name.split(' ')[0]}
                  </span>
                </div>
              </div>

              <div className="w-full h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                    <PolarGrid stroke="#292524" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="attribute" tick={{ fill: '#d6d3d1', fontSize: 11, fontFamily: 'cinzel' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#44403c" tick={{ fill: '#78716c', fontSize: 9 }} />
                    
                    {/* Card A Radar Layer */}
                    <Radar
                      name={cardA.name}
                      dataKey="cardA"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />

                    {/* Card B Radar Layer */}
                    <Radar
                      name={cardB.name}
                      dataKey="cardB"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.35}
                      strokeWidth={2}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value} / 10`, name]}
                      contentStyle={{
                        backgroundColor: '#0c0a09',
                        borderColor: '#44403c',
                        borderRadius: '8px',
                        fontSize: '11px',
                        color: '#f5f5f4'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Direct Attribute Delta Table */}
            <div className="lg:col-span-6 space-y-2">
              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="font-cinzel text-xs uppercase tracking-wider text-stone-300 font-bold block border-b border-stone-800 pb-1.5">
                  Core Attribute Head-to-Head
                </span>

                {[
                  { label: 'Mana Cost', a: cardA.cost, b: cardB.cost, unit: 'm', lowerIsBetter: true },
                  { label: 'Power Potency', a: statsA.power, b: statsB.power, unit: '/10' },
                  { label: 'Defense Fortitude', a: statsA.defense, b: statsB.defense, unit: '/10' },
                  { label: 'Speed & Mobility', a: statsA.speed, b: statsB.speed, unit: '/10' },
                  { label: 'Magic Attunement', a: statsA.magic, b: statsB.magic, unit: '/10' },
                  { label: 'Utility & Flex', a: statsA.utility, b: statsB.utility, unit: '/10' }
                ].map((row, idx) => {
                  const diff = row.lowerIsBetter ? row.b - row.a : row.a - row.b;
                  const isTie = row.a === row.b;
                  const aWins = row.lowerIsBetter ? row.a < row.b : row.a > row.b;

                  return (
                    <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-stone-900/70 text-xs">
                      <span className={`font-mono font-bold w-12 text-center ${aWins && !isTie ? 'text-amber-400' : 'text-stone-400'}`}>
                        {row.a}{row.unit}
                      </span>
                      
                      <div className="flex-1 text-center font-cinzel text-[11px] text-stone-300">
                        {row.label}
                      </div>

                      <div className="w-16 text-center text-[10px] font-mono">
                        {isTie ? (
                          <span className="text-stone-500">EQUAL</span>
                        ) : aWins ? (
                          <span className="text-amber-400 font-bold">+{Math.abs(diff)} A</span>
                        ) : (
                          <span className="text-blue-400 font-bold">+{Math.abs(diff)} B</span>
                        )}
                      </div>

                      <span className={`font-mono font-bold w-12 text-center ${!aWins && !isTie ? 'text-blue-400' : 'text-stone-400'}`}>
                        {row.b}{row.unit}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Tactical Verdict Pill */}
              <div className="p-3 rounded-2xl bg-stone-950 border border-purple-500/30 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-cinzel text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Award size={14} />
                    Tactical Synergy Verdict
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    A: {efficiencyA} pts/mana vs B: {efficiencyB} pts/mana
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                  {Number(efficiencyA) > Number(efficiencyB)
                    ? `"${cardA.name}" provides superior mana-to-stat efficiency for early and mid-game tempo pressure.`
                    : Number(efficiencyB) > Number(efficiencyA)
                    ? `"${cardB.name}" boasts higher late-game stat weight and ability punch.`
                    : 'Both cards offer balanced tactical utility within their respective domains.'}
                </p>
              </div>
            </div>

          </div>

          {/* Domain Abilities & Passives Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Card A Abilities */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-2">
              <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold block">
                {cardA.name} Abilities & Passives ({cardA.abilities?.length || 0})
              </span>
              <div className="space-y-2">
                {cardA.abilities && cardA.abilities.length > 0 ? (
                  cardA.abilities.map((ab, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
                      <div className="flex items-center justify-between font-cinzel font-bold text-amber-200">
                        <span>{ab.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 uppercase">
                          {ab.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-300 mt-1 font-sans leading-relaxed">
                        {ab.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500 font-mono">No special abilities declared.</p>
                )}
              </div>
            </div>

            {/* Card B Abilities */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-blue-500/30 space-y-2">
              <span className="font-cinzel text-xs uppercase tracking-wider text-blue-400 font-bold block">
                {cardB.name} Abilities & Passives ({cardB.abilities?.length || 0})
              </span>
              <div className="space-y-2">
                {cardB.abilities && cardB.abilities.length > 0 ? (
                  cardB.abilities.map((ab, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
                      <div className="flex items-center justify-between font-cinzel font-bold text-blue-200">
                        <span>{ab.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 uppercase">
                          {ab.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-300 mt-1 font-sans leading-relaxed">
                        {ab.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500 font-mono">No special abilities declared.</p>
                )}
              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </motion.div>
  );
};
