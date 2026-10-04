import React, { useState } from 'react';
import { HazardCard, Domain } from '../types';
import { HAZARD_DECK_PRESETS, getRandomHazardCard } from '../data/hazardCardsData';
import { soundEngine } from '../utils/audioEngine';
import { 
  CloudRain, 
  Flame, 
  Wind, 
  Zap, 
  ShieldAlert, 
  Clock, 
  Skull, 
  Layers, 
  ChevronRight, 
  Sparkles, 
  AlertTriangle,
  RotateCcw,
  Play,
  Eye,
  Info,
  Compass
} from 'lucide-react';

export interface ForecastedHazard {
  id: string;
  card: HazardCard;
  turnsRemaining: number;
  deployedBy: 'player' | 'opponent' | 'nature';
  turnDeployed: number;
}

export interface HazardEngineProps {
  activeHazard: HazardCard | null;
  forecastedHazards: ForecastedHazard[];
  hazardDeck: HazardCard[];
  hazardRoundsRemaining: number;
  hazardHistory: HazardCard[];
  onDrawHazard: (domain?: string) => void;
  onForecastHazard?: (card: HazardCard, deployedBy?: 'player' | 'opponent') => void;
  onAdvanceHazardPhase?: () => void;
  onInspectCard?: (cardName: string) => void;
  interactive?: boolean;
}

export const HazardEngine: React.FC<HazardEngineProps> = ({
  activeHazard,
  forecastedHazards = [],
  hazardDeck = [],
  hazardRoundsRemaining = 0,
  hazardHistory = [],
  onDrawHazard,
  onForecastHazard,
  onAdvanceHazardPhase,
  onInspectCard,
  interactive = true
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'forecast' | 'deck' | 'rules'>('active');
  const [selectedHazardForDetail, setSelectedHazardForDetail] = useState<HazardCard | null>(activeHazard);

  const getDomainColor = (domain: Domain | 'Neutral') => {
    switch (domain) {
      case 'Sanctuary': return 'border-amber-500/60 bg-amber-950/30 text-amber-300';
      case 'Radiance': return 'border-red-500/60 bg-red-950/30 text-red-300';
      case 'Verdance': return 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300';
      case 'Arcane': return 'border-blue-500/60 bg-blue-950/30 text-blue-300';
      case 'Abyss': return 'border-purple-500/60 bg-purple-950/30 text-purple-300';
      default: return 'border-stone-500/60 bg-stone-900/40 text-stone-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Environmental': return <Wind size={14} className="text-cyan-400" />;
      case 'Tectonic Rupture': return <Flame size={14} className="text-orange-400" />;
      case 'Leyline Overload': return <Zap size={14} className="text-yellow-400" />;
      case 'Debuff Storm': return <CloudRain size={14} className="text-purple-400" />;
      default: return <AlertTriangle size={14} className="text-amber-400" />;
    }
  };

  return (
    <div className="w-full bg-stone-950/90 rounded-2xl border border-stone-800 shadow-2xl p-4 flex flex-col gap-3 backdrop-blur-md">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400">
            <Flame size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel font-black text-sm text-stone-100 tracking-wide">
                Planar Hazard Engine
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[9px] font-mono text-amber-300">
                1-Turn Forecast Delay
              </span>
            </div>
            <p className="text-[10px] font-mono text-stone-400">
              Autonomous Dawn Trigger • Zero Commander Direct Damage • Lane & Unit Modulation Only
            </p>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-1 bg-stone-900/80 p-1 rounded-xl border border-stone-800 text-[11px] font-cinzel">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
              activeTab === 'active'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>Active Biome</span>
            {activeHazard && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
              activeTab === 'forecast'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>Forecast Zone</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-800 text-[9px] font-mono text-amber-300">
              {forecastedHazards.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deck')}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
              activeTab === 'deck'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>Hazard Deck</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-800 text-[9px] font-mono text-stone-300">
              {hazardDeck.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
              activeTab === 'rules'
                ? 'bg-amber-500 text-black shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Info size={12} />
            <span>Hazard CRD</span>
          </button>
        </div>
      </div>

      {/* Content Panels */}
      {activeTab === 'active' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          {/* Main Active Hazard Display */}
          <div className="md:col-span-2 p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between relative overflow-hidden">
            {activeHazard ? (
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeHazard.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-cinzel font-bold text-base text-amber-200">
                          {activeHazard.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-cinzel font-bold border ${getDomainColor(activeHazard.domain)}`}>
                          {activeHazard.domain} • {activeHazard.tier}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-stone-400">
                        {activeHazard.subtitle} • {activeHazard.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono text-stone-400">Duration</span>
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                      <Clock size={12} />
                      {hazardRoundsRemaining} {hazardRoundsRemaining === 1 ? 'Turn' : 'Turns'} Left
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800/80 text-xs text-stone-200 leading-relaxed">
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold mb-1">
                    {getCategoryIcon(activeHazard.category)}
                    <span>Dawn Phase Trigger Clause:</span>
                  </div>
                  {activeHazard.description}
                </div>

                {/* Mechanical Breakdown Badges */}
                <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                    🛡️ Direct Player HP: IMMUNE (0 Dmg)
                  </span>
                  {activeHazard.mechanicalClause?.frontlineDamage && (
                    <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-300">
                      ⚡ Frontline Hazard Dmg: {activeHazard.mechanicalClause.frontlineDamage}
                    </span>
                  )}
                  {activeHazard.mechanicalClause?.shieldGranted && (
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/40 text-blue-300">
                      🛡️ Shield Aura: +{activeHazard.mechanicalClause.shieldGranted}
                    </span>
                  )}
                  {activeHazard.mechanicalClause?.essenceBonus && (
                    <span className="px-2 py-0.5 rounded bg-yellow-950/60 border border-yellow-500/40 text-yellow-300">
                      ✨ Essence Surge: +{activeHazard.mechanicalClause.essenceBonus}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-stone-500 space-y-1">
                <Wind size={28} className="mx-auto text-stone-600 mb-1" />
                <p className="font-cinzel text-xs text-stone-400 font-bold">No Active Planar Hazard</p>
                <p className="text-[10px] font-mono">Draw a card from the Hazard Deck or advance turn to trigger forecast.</p>
              </div>
            )}

            {/* Quick Action Bar */}
            {interactive && (
              <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 mt-3">
                <button
                  onClick={() => onDrawHazard()}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono flex items-center gap-1.5 transition"
                >
                  <Sparkles size={13} className="text-amber-400" />
                  <span>Surge New Hazard</span>
                </button>

                {onAdvanceHazardPhase && (
                  <button
                    onClick={onAdvanceHazardPhase}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-cinzel font-bold flex items-center gap-1.5 transition shadow"
                  >
                    <RotateCcw size={13} />
                    <span>Advance Dawn Pulse</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats & Forecast Summary */}
          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-cinzel text-amber-400 font-bold uppercase tracking-wider block mb-1">
                Forecast Telegraphed Queue
              </span>
              {forecastedHazards.length > 0 ? (
                <div className="space-y-2">
                  {forecastedHazards.map((fh) => (
                    <div
                      key={fh.id}
                      onClick={() => setSelectedHazardForDetail(fh.card)}
                      className="p-2.5 rounded-lg bg-stone-950/80 border border-amber-500/40 flex items-center justify-between cursor-pointer hover:border-amber-400 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{fh.card.icon}</span>
                        <div>
                          <div className="font-cinzel font-bold text-xs text-stone-200 line-clamp-1">{fh.card.name}</div>
                          <div className="text-[9px] font-mono text-stone-400">{fh.card.category}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold shrink-0">
                        In {fh.turnsRemaining}T
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500 italic py-3 text-center">
                  No hazards currently queued in the Forecast Zone.
                </p>
              )}
            </div>

            <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800/80 text-[10px] font-mono text-stone-400 space-y-1">
              <div className="flex justify-between">
                <span>Hazard Deck:</span>
                <span className="text-stone-200 font-bold">{hazardDeck.length} Cards</span>
              </div>
              <div className="flex justify-between">
                <span>Trigger Timing:</span>
                <span className="text-amber-400 font-bold">Dawn (Phase 1)</span>
              </div>
              <div className="flex justify-between">
                <span>Player HP Direct Dmg:</span>
                <span className="text-emerald-400 font-bold">Restricted (0 HP)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forecast Zone Sub-Page */}
      {activeTab === 'forecast' && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-cinzel font-bold text-amber-300 text-sm block">
                The 1-Turn Delay Forecast Zone
              </span>
              <p className="text-[11px] text-stone-400">
                Cards deployed to the forecast zone remain dormant for 1 full turn cycle, allowing both players to react, position units, or play counter-relics before environmental resolution at Dawn.
              </p>
            </div>
          </div>

          {forecastedHazards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {forecastedHazards.map((fh) => (
                <div
                  key={fh.id}
                  className="p-3.5 rounded-xl bg-stone-900/90 border border-amber-500/40 flex flex-col justify-between gap-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{fh.card.icon}</span>
                      <div>
                        <h5 className="font-cinzel font-bold text-xs text-amber-200">{fh.card.name}</h5>
                        <p className="text-[10px] font-mono text-stone-400">{fh.card.domain} • {fh.card.tier}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-amber-500 text-black font-mono font-bold text-[10px]">
                      Triggers Next Dawn
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed bg-stone-950/60 p-2 rounded">
                    {fh.card.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-stone-500 bg-stone-900/40 rounded-xl border border-dashed border-stone-800">
              <Clock size={24} className="mx-auto text-stone-600 mb-1" />
              <p className="font-cinzel text-xs text-stone-400 font-bold">Forecast Zone Empty</p>
              <p className="text-[10px] font-mono text-stone-500 mt-0.5">When hazards are cast, they enter here with a 1-turn telegraph timer.</p>
            </div>
          )}
        </div>
      )}

      {/* Hazard Deck Sub-Page */}
      {activeTab === 'deck' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Secondary Hazard Library ({hazardDeck.length} Cards)</span>
            <span>Independent 1-40 Card Deck</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
            {hazardDeck.map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-between hover:border-amber-500/40 transition text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{card.icon}</span>
                  <div>
                    <div className="font-cinzel font-bold text-stone-200 line-clamp-1">{card.name}</div>
                    <div className="text-[9px] font-mono text-stone-400">{card.domain} • {card.tier}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-400">{card.threatLevel}★</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Hazard CRD Rules Summary */}
      {activeTab === 'rules' && (
        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 space-y-2.5">
          <h4 className="font-cinzel font-bold text-amber-300 text-sm">
            Codified Planar Hazard Rules (CRD Section 400)
          </h4>
          <ul className="space-y-1.5 list-disc list-inside text-stone-300 text-[11px] leading-relaxed">
            <li><strong>1-Turn Delay Telegraph:</strong> When a player casts or reveals a Hazard card, it enters the Forecast Zone face-up. It does not resolve until the next player’s Dawn phase.</li>
            <li><strong>Dawn Timing Priority:</strong> Hazard pulses resolve at the very beginning of the Dawn Phase, BEFORE draw, untapping, or player priority actions.</li>
            <li><strong>Commander Life Immunity:</strong> Hazards are strictly prohibited from causing direct damage to a Commander’s 30 HP life total. They may only affect battlefield lanes, unit armor, health, or resource economy.</li>
            <li><strong>Separate Deck Constraint:</strong> The Hazard Deck is a dedicated 1-40 card pile distinct from the player’s 60-card Main Deck.</li>
          </ul>
        </div>
      )}

    </div>
  );
};
