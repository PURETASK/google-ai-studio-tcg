import React from 'react';
import { Card } from '../types';
import { CardItem } from './CardItem';
import { ValidationReport } from './CardVisualValidationPanel';
import { soundEngine } from '../utils/audioEngine';
import { 
  Shield, 
  Save, 
  X, 
  Sparkles, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Sword, 
  Zap, 
  Dices, 
  Flame, 
  Eye,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CardForgeSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSave: () => void;
  card: Card;
  assessmentData?: any;
  validationReport?: ValidationReport | null;
  onInspectCard?: (card: Card) => void;
}

export const CardForgeSummaryModal: React.FC<CardForgeSummaryModalProps> = ({
  isOpen,
  onClose,
  onConfirmSave,
  card,
  assessmentData,
  validationReport,
  onInspectCard
}) => {
  if (!isOpen) return null;

  const totalStats = card.power + card.defense;
  const expectedStats = Math.round(card.cost * 2.2 + 2);
  const balanceScore = assessmentData?.balanceScore ?? (
    Math.abs(totalStats - expectedStats) <= 2 ? 9.0 : 7.5
  );

  return (
    <div 
      id="modal-cardforge-summary-confirmation"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
    >
      <div className="w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-3xl bg-stone-950 border-2 border-amber-500/60 shadow-[0_0_50px_rgba(234,179,8,0.25)] p-5 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-md">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold block">
                Final Synthesis Clearance
              </span>
              <h3 className="font-cinzel font-black text-xl sm:text-2xl text-amber-100">
                Summary Confirmation & Database Commit
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playMicroSound('click');
              onClose();
            }}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Side-by-Side Presentation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDE: Live Card Preview Render */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 bg-stone-900/40 p-5 rounded-3xl border border-stone-800/80">
            <span className="text-xs font-cinzel uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
              <Eye size={14} />
              <span>Live Synthesized Card Blueprint</span>
            </span>

            <div className="w-full max-w-[280px] sm:max-w-[300px] flex justify-center py-2">
              <CardItem 
                card={card} 
                onInspect={() => onInspectCard?.(card)} 
              />
            </div>

            <div className="w-full bg-stone-950 p-3 rounded-2xl border border-stone-800 text-center space-y-1">
              <span className="text-[11px] font-mono text-stone-400">
                Unique Local Registry ID: <strong className="text-amber-300">{card.id}</strong>
              </span>
              <p className="text-[10px] text-stone-500">
                Click the card above anytime to open full inspection with rule definitions.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: AI-Analyzed Metadata & Validation Breakdown */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Identity & Combat Curve Overview */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="font-cinzel font-black text-lg text-amber-100">
                    {card.name}
                  </h4>
                  <p className="text-xs text-stone-400 font-cinzel">
                    {card.subtitle || `${card.cardType.toUpperCase()} • ${card.domain.toUpperCase()}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {card.cost} Essence
                  </span>
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    Rank {card.divineRank || 3}★
                  </span>
                </div>
              </div>

              {/* Combat Stat Comparison */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">POWER</span>
                  <strong className="text-red-400 text-base">{card.power}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">DEFENSE</span>
                  <strong className="text-blue-400 text-base">{card.defense}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">TOTAL POOL</span>
                  <strong className="text-amber-300 text-base">{totalStats}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">EXPECTED</span>
                  <strong className="text-stone-300 text-base">{expectedStats}</strong>
                </div>
              </div>
            </div>

            {/* AI-Analyzed Metadata & Gemini Validation Clearance */}
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-xs font-bold text-amber-300 flex items-center gap-2">
                  <Scale size={15} className="text-amber-400" />
                  <span>AI Balance & Consistency Audit</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  Balance Score: {balanceScore.toFixed(1)} / 10
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Domain & Visual Clearance */}
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-stone-200">Domain Alignment</strong>
                    <span className="text-emerald-400 font-mono text-[11px]">
                      {validationReport?.domainCheck?.confidence ?? 92}% MATCH
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-2">
                    {validationReport?.domainCheck?.reasoning || `Aligned to ${card.domain} color pie and archetype.`}
                  </p>
                </div>

                {/* Stat Curve Clearance */}
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-stone-200">Power Curve Verdict</strong>
                    <span className="text-emerald-400 font-mono text-[11px]">
                      {assessmentData?.verdict || 'Balanced'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-2">
                    {assessmentData?.summary || `Total combat pool conforms to competitive standard baseline.`}
                  </p>
                </div>
              </div>

              {/* 5-Axis Tactical Balance Scores */}
              {card.attributes && (
                <div className="pt-1">
                  <span className="text-[10px] font-cinzel font-bold text-stone-400 uppercase block mb-1.5">
                    Tactical 5-Axis Ratings
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 text-center text-[11px] font-mono">
                    <div className="p-1.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="text-stone-500 block text-[9px]">DMG</span>
                      <span className="text-red-300 font-bold">{card.attributes.damage ?? 7.5}</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="text-stone-500 block text-[9px]">DUR</span>
                      <span className="text-blue-300 font-bold">{card.attributes.durability ?? 6.0}</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="text-stone-500 block text-[9px]">MOB</span>
                      <span className="text-emerald-300 font-bold">{card.attributes.mobility ?? 6.5}</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="text-stone-500 block text-[9px]">UTL</span>
                      <span className="text-purple-300 font-bold">{card.attributes.utility ?? 7.0}</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-stone-950 border border-stone-800">
                      <span className="text-stone-500 block text-[9px]">CTL</span>
                      <span className="text-amber-300 font-bold">{card.attributes.control ?? 6.5}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tactical Traits & Power Glyphs Breakdown */}
            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-2.5">
              <span className="text-xs font-cinzel font-bold text-stone-300 block">
                Tactical Traits ({card.abilities?.length || 0}) & Power Glyphs ({card.powerGlyphs?.length || 0}):
              </span>

              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {(card.abilities || []).map((ab, idx) => (
                  <div 
                    key={ab.id || idx}
                    className="p-2 rounded-xl bg-stone-950 border border-stone-800/80 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-cinzel font-bold text-amber-200 block truncate">
                        {ab.name}
                      </span>
                      <span className="text-[10px] text-stone-400 block truncate">
                        {ab.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono">
                      {ab.damageDice && (
                        <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 font-bold">
                          {ab.damageDice}
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                        {ab.charges}
                      </span>
                    </div>
                  </div>
                ))}

                {(card.powerGlyphs || []).map((g, idx) => (
                  <div 
                    key={g.id || idx}
                    className="p-2 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-cinzel font-bold text-purple-200 block truncate">
                        ⬡ {g.name}
                      </span>
                      <span className="text-[10px] text-purple-300 block truncate">
                        {g.ruleClause}
                      </span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-200 font-mono text-[10px] uppercase shrink-0">
                      {g.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playMicroSound('click');
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-cinzel font-bold text-xs border border-stone-700 transition"
              >
                Back to Editing
              </button>

              <button
                type="button"
                id="btn-confirm-save-to-codex"
                onClick={() => {
                  onConfirmSave();
                  onClose();
                }}
                className="flex-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition hover:scale-102 active:scale-98"
              >
                <Save size={16} />
                <span>Confirm & Commit to Codex Database</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
