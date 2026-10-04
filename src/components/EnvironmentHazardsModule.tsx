import React, { useState } from 'react';
import { HazardCard, HazardDeckPreset, Domain } from '../types';
import { HAZARD_DECK_PRESETS, MASTER_HAZARD_DECK } from '../data/hazardCardsData';
import { soundEngine } from '../utils/audioEngine';
import { 
  Flame, 
  Sparkles, 
  AlertTriangle, 
  Layers, 
  Timer, 
  Info, 
  Zap, 
  ShieldAlert, 
  Swords, 
  RotateCw, 
  X, 
  Compass, 
  CloudRain, 
  Sun, 
  Wind, 
  Moon, 
  Eye, 
  Check, 
  Shield, 
  Activity, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Skull
} from 'lucide-react';

export interface EnvironmentHazardsModuleProps {
  activeHazard: HazardCard | null;
  hazardDeckCount: number;
  roundsRemaining: number;
  activeDeckPreset: HazardDeckPreset;
  environmentName: string;
  environmentTheme: Domain | 'Neutral';
  onDrawHazard: () => void;
  onSelectHazardDeck: (preset: HazardDeckPreset) => void;
  canDraw: boolean;
  hazardHistory?: HazardCard[];
}

export const EnvironmentHazardsModule: React.FC<EnvironmentHazardsModuleProps> = ({
  activeHazard,
  hazardDeckCount,
  roundsRemaining,
  activeDeckPreset,
  environmentName,
  environmentTheme,
  onDrawHazard,
  onSelectHazardDeck,
  canDraw,
  hazardHistory = []
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'decks' | 'history'>('overview');

  const getDomainIcon = (d: Domain | 'Neutral') => {
    switch (d) {
      case 'Radiance': return '🌋';
      case 'Verdance': return '🌿';
      case 'Sanctuary': return '🛡️';
      case 'Arcane': return '🌀';
      case 'Abyss': return '💀';
      default: return '⚡';
    }
  };

  const getDomainColor = (d: Domain | 'Neutral') => {
    switch (d) {
      case 'Radiance': return '#ef4444';
      case 'Verdance': return '#10b981';
      case 'Sanctuary': return '#f59e0b';
      case 'Arcane': return '#3b82f6';
      case 'Abyss': return '#a855f7';
      default: return '#fbbf24';
    }
  };

  return (
    <>
      {/* ================= IN-ARENA COMPACT ENVIRONMENT & HAZARD BAR ================= */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3 relative overflow-hidden backdrop-blur-md">
        
        {/* Background ambient atmospheric sheen */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-red-500/5 pointer-events-none" />

        {/* Left: Environment & Secondary Hazard Deck Info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          
          {/* Secondary Hazard Deck Facedown Pile */}
          <div 
            onClick={() => {
              if (canDraw) {
                soundEngine.playMicroSound('select');
                onDrawHazard();
              }
            }}
            className={`relative w-20 h-24 rounded-xl bg-gradient-to-br from-stone-900 via-amber-950/60 to-stone-950 border-2 border-amber-500/60 shadow-lg flex flex-col items-center justify-center cursor-pointer transition duration-300 shrink-0 ${
              canDraw ? 'hover:scale-105 hover:border-amber-400 ring-2 ring-amber-500/30 group' : 'opacity-85'
            }`}
            title="Secondary Hazard Deck - Click to trigger next planar hazard"
          >
            <div className="w-9 h-9 rounded-full border border-amber-400/50 bg-amber-950/70 flex items-center justify-center text-lg shadow-inner group-hover:animate-pulse">
              {activeDeckPreset.icon}
            </div>
            <span className="font-cinzel text-[8.5px] font-black text-amber-300 uppercase tracking-wider mt-1 text-center truncate max-w-[70px]">
              Hazard Deck
            </span>
            <span className="text-[9.5px] font-mono font-bold text-stone-300">
              {hazardDeckCount} Cards
            </span>
          </div>

          {/* Environment Identity & Deck Selector Trigger */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-cinzel text-[9.5px] uppercase tracking-widest text-amber-400 font-bold">
                Active Field Environment
              </span>
            </div>
            <h4 className="font-cinzel font-bold text-sm text-stone-100 flex items-center gap-1.5">
              <span>{getDomainIcon(environmentTheme)}</span>
              <span>{environmentName}</span>
            </h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playMicroSound('select');
                  onDrawHazard();
                }}
                disabled={!canDraw}
                className={`px-2.5 py-1 rounded-lg font-cinzel font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow transition ${
                  canDraw 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black cursor-pointer hover:scale-105' 
                    : 'bg-stone-800 text-stone-400 cursor-not-allowed border border-stone-700'
                }`}
              >
                <RotateCw size={11} />
                <span>Draw Hazard</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playMicroSound('select');
                  setIsModalOpen(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 text-amber-300 font-cinzel font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition cursor-pointer"
              >
                <SlidersHorizontal size={11} />
                <span>Inspect Module</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Active Field Hazard Banner or Waiting Status */}
        <div className="w-full md:w-2/3">
          {activeHazard ? (
            <div 
              onClick={() => {
                soundEngine.playMicroSound('select');
                setIsModalOpen(true);
              }}
              className={`p-2.5 sm:p-3 rounded-xl border bg-gradient-to-r ${activeHazard.bgGradient} border-amber-500/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 cursor-pointer hover:border-amber-400 transition group`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl">{activeHazard.icon}</span>
                  <span className="font-cinzel font-black text-xs sm:text-sm text-amber-100 group-hover:text-amber-300 transition">
                    {activeHazard.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold uppercase bg-black/50 text-amber-300 border border-amber-400/40">
                    {activeHazard.tier}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono text-stone-300 bg-stone-900/80 border border-stone-700">
                    {activeHazard.category}
                  </span>
                </div>
                <p className="text-[11px] text-amber-100/90 font-sans leading-snug">
                  {activeHazard.description}
                </p>
              </div>

              {/* Duration Timer Badge */}
              <div className="flex items-center gap-2 shrink-0 bg-stone-950/80 px-2.5 py-1 rounded-xl border border-amber-500/40 self-end sm:self-center">
                <Timer size={14} className="text-amber-400" />
                <div className="text-right">
                  <div className="text-[8px] font-cinzel text-stone-400 uppercase font-bold">Active For</div>
                  <div className="font-mono font-black text-xs text-amber-300">
                    {roundsRemaining} {roundsRemaining === 1 ? 'Round' : 'Rounds'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => {
                soundEngine.playMicroSound('select');
                setIsModalOpen(true);
              }}
              className="p-3 rounded-xl border border-stone-800 bg-stone-900/60 text-center text-xs text-stone-400 italic font-mono flex items-center justify-center gap-2 cursor-pointer hover:border-amber-500/40 transition"
            >
              <Info size={14} className="text-amber-400" />
              <span>No field hazard currently active. Click to open Environment & Hazards deck selector.</span>
            </div>
          )}
        </div>
      </div>

      {/* ================= COMPREHENSIVE ENVIRONMENT & HAZARDS MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-fadeIn">
          <div className="bg-stone-950 border-2 border-amber-500/70 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border-b border-amber-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-950 border border-amber-500/60 flex items-center justify-center text-xl shadow-inner">
                  🌋
                </div>
                <div>
                  <h3 className="font-cinzel font-black text-base sm:text-lg text-amber-200">
                    Environment & Hazards Module
                  </h3>
                  <span className="text-xs font-mono text-stone-400">
                    Secondary Hazard Decks • Passive Turn Ticks • Planar Weather
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 px-5 py-2.5 bg-stone-900/80 border-b border-stone-800 text-xs font-cinzel">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-black shadow'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Eye size={13} />
                <span>Active Field & Hazard</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('decks')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'decks'
                    ? 'bg-amber-500 text-black shadow'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Layers size={13} />
                <span>Secondary Hazard Decks ({HAZARD_DECK_PRESETS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'bg-amber-500 text-black shadow'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <TrendingUp size={13} />
                <span>Cataclysm History ({hazardHistory.length})</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 overflow-y-auto flex-1 space-y-6 bg-stone-950">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  
                  {/* Current Active Hazard Card Showcase */}
                  <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-cinzel font-bold text-xs uppercase tracking-widest text-amber-300 flex items-center gap-2">
                        <Zap size={14} />
                        <span>Active Field Cataclysm</span>
                      </h4>
                      {activeHazard && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: activeHazard.threatLevel }).map((_, i) => (
                            <span key={i} className="text-amber-400 text-xs">★</span>
                          ))}
                          <span className="text-[10px] font-mono text-stone-400 ml-1">Threat Level {activeHazard.threatLevel}/5</span>
                        </div>
                      )}
                    </div>

                    {activeHazard ? (
                      <div className={`p-4 rounded-xl border bg-gradient-to-br ${activeHazard.bgGradient} border-amber-500/70 shadow-lg space-y-3`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-3xl">{activeHazard.icon}</span>
                            <div>
                              <span className="text-[10px] font-cinzel font-bold uppercase text-amber-300 tracking-wider">
                                {activeHazard.subtitle}
                              </span>
                              <h3 className="font-cinzel font-black text-lg text-amber-100">
                                {activeHazard.name}
                              </h3>
                            </div>
                          </div>

                          <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-amber-400/40 text-center">
                            <span className="text-[9px] font-cinzel text-stone-400 block uppercase">Duration</span>
                            <span className="text-sm font-mono font-bold text-amber-300">
                              {roundsRemaining} Rounds Left
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-stone-100 font-sans leading-relaxed">
                          {activeHazard.description}
                        </p>

                        <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-amber-200/90 italic font-serif">
                          {activeHazard.flavorText}
                        </div>

                        {/* Mechanical clauses summary */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-mono text-xs">
                          <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                            <span className="text-[9px] text-stone-400 block uppercase">Trigger</span>
                            <span className="font-bold text-amber-300">{activeHazard.triggerTiming}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                            <span className="text-[9px] text-stone-400 block uppercase">Category</span>
                            <span className="font-bold text-stone-200">{activeHazard.category}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                            <span className="text-[9px] text-stone-400 block uppercase">Buff Target</span>
                            <span className="font-bold text-green-300 uppercase">{activeHazard.buffTarget || 'All'}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                            <span className="text-[9px] text-stone-400 block uppercase">Domain</span>
                            <span className="font-bold text-purple-300">{activeHazard.domain}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 rounded-xl border border-stone-800 bg-stone-900/50 text-center space-y-2">
                        <span className="text-3xl block">⏳</span>
                        <h4 className="font-cinzel font-bold text-sm text-stone-300">No Active Planar Hazard</h4>
                        <p className="text-xs text-stone-400 max-w-md mx-auto">
                          Draw a card from the Secondary Hazard Deck below to introduce dynamic battlefield modifiers affecting both players!
                        </p>
                      </div>
                    )}

                    {/* Action button */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playMicroSound('select');
                          onDrawHazard();
                        }}
                        disabled={!canDraw}
                        className={`px-4 py-2 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition ${
                          canDraw 
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black cursor-pointer hover:scale-105' 
                            : 'bg-stone-800 text-stone-400 cursor-not-allowed border border-stone-700'
                        }`}
                      >
                        <RotateCw size={14} />
                        <span>Trigger Planar Shift (Draw Next Hazard)</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Battlefield Environment Information */}
                  <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-cinzel font-bold text-xs uppercase tracking-widest text-amber-300 flex items-center gap-2">
                        <Compass size={14} />
                        <span>Battlefield Biome & Weather Rules</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                        Domain: {environmentTheme}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                        <span className="text-[10px] font-cinzel text-amber-300 uppercase font-bold block">
                          Turn-Start Passive Ticks
                        </span>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          At the start of every turn (Player & AI), the active hazard card evaluates its mechanical clauses to apply shields, essence surges, or poison/burn debuffs.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                        <span className="text-[10px] font-cinzel text-amber-300 uppercase font-bold block">
                          Domain Resonance
                        </span>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          Cards played belonging to the matching battlefield domain gain amplified effect values and reduced essence requirements.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                        <span className="text-[10px] font-cinzel text-amber-300 uppercase font-bold block">
                          Secondary Deck Synergy
                        </span>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          Each realm has its own specialized Secondary Hazard Deck loaded with tailored debuffs and cataclysms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SECONDARY HAZARD DECKS SELECTOR */}
              {activeTab === 'decks' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel font-bold text-xs uppercase tracking-widest text-amber-300 flex items-center gap-2">
                      <Layers size={14} />
                      <span>Select Secondary Hazard Deck</span>
                    </h4>
                    <span className="text-xs font-mono text-stone-400">
                      Active: {activeDeckPreset.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {HAZARD_DECK_PRESETS.map((preset) => {
                      const isSelected = activeDeckPreset.id === preset.id;

                      return (
                        <div
                          key={preset.id}
                          onClick={() => {
                            soundEngine.playMicroSound('select');
                            onSelectHazardDeck(preset);
                          }}
                          className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between gap-3 ${
                            isSelected
                              ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-500/30 shadow-xl'
                              : 'bg-stone-900/80 border-stone-800 hover:border-amber-500/50 hover:bg-stone-900'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{preset.icon}</span>
                                <div>
                                  <h4 className="font-cinzel font-bold text-sm text-stone-100">
                                    {preset.name}
                                  </h4>
                                  <span className="text-[10px] font-mono text-amber-400/80 block">
                                    {preset.subtitle}
                                  </span>
                                </div>
                              </div>

                              {isSelected && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black font-cinzel font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                                  <Check size={11} />
                                  <span>Active</span>
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-stone-300 leading-relaxed">
                              {preset.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-[10px] font-mono">
                            <span className="text-stone-400">
                              📚 {preset.cards.length} Hazard Cards
                            </span>
                            <span className="px-2 py-0.5 rounded bg-stone-950 text-amber-300 border border-stone-700">
                              {preset.threatTier}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: CATACLYSM HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel font-bold text-xs uppercase tracking-widest text-amber-300 flex items-center gap-2">
                      <TrendingUp size={14} />
                      <span>Triggered Cataclysms History</span>
                    </h4>
                    <span className="text-xs font-mono text-stone-400">
                      {hazardHistory.length} Events Recorded
                    </span>
                  </div>

                  {hazardHistory.length > 0 ? (
                    <div className="space-y-2.5">
                      {hazardHistory.map((h, idx) => (
                        <div 
                          key={`${h.id}-${idx}`}
                          className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{h.icon}</span>
                            <div>
                              <span className="font-cinzel font-bold text-amber-200 block">
                                {h.name}
                              </span>
                              <span className="text-[10px] font-mono text-stone-400">
                                {h.subtitle}
                              </span>
                            </div>
                          </div>

                          <div className="text-right font-mono">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-amber-300 border border-stone-700">
                              {h.tier}
                            </span>
                            <span className="text-[9px] text-stone-400 block mt-0.5">
                              {h.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 rounded-xl border border-stone-800 bg-stone-900/40 text-center text-xs text-stone-400 font-mono">
                      No cataclysms have been triggered yet in this match. Draw a hazard to record history!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-400">
                Environment & Hazards Engine • Turn-Start Passive Ticks Synchronized
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-cinzel font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
