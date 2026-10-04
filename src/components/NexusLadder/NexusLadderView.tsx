import React, { useState } from 'react';
import { LADDER_STAGES } from '../../data/nexusLadderData';
import { LadderStage, LadderPhase, Card, DeckPreset } from '../../types';
import { PowerBudgetCalculator } from './PowerBudgetCalculator';
import { HazardDiceSimulator } from './HazardDiceSimulator';
import { KeywordsExplorer } from './KeywordsExplorer';
import { SetSkeletonTracker } from './SetSkeletonTracker';
import { RulesBibleExplorer } from './RulesBibleExplorer';
import { StarterDecksViewer } from './StarterDecksViewer';
import { 
  Sparkles, 
  Layers, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Compass, 
  BookOpen, 
  Dices, 
  Scale, 
  ShieldAlert, 
  Swords, 
  ArrowRight,
  ExternalLink,
  Cpu,
  Flame
} from 'lucide-react';

interface NexusLadderViewProps {
  onInspectCard: (card: Card) => void;
  onSelectDeckForBattle: (deck: DeckPreset) => void;
}

const PHASES: LadderPhase[] = [
  'Phase 1: Core Foundation (0-8)',
  'Phase 2: Mechanics & Engine (9-17)',
  'Phase 3: Set Design & Math (18-20)',
  'Phase 4: Lore & Worldbuilding (21-24)',
  'Phase 5: Playtest, Rules & Horizon (25-30)'
];

export const NexusLadderView: React.FC<NexusLadderViewProps> = ({
  onInspectCard,
  onSelectDeckForBattle
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(0);
  const [selectedPhase, setSelectedPhase] = useState<LadderPhase | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const currentStage: LadderStage = LADDER_STAGES.find(s => s.id === selectedStageId) || LADDER_STAGES[0];

  // Filter stages list
  const filteredStages = LADDER_STAGES.filter(stage => {
    if (selectedPhase !== 'All' && stage.phase !== selectedPhase) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = stage.title.toLowerCase().includes(q);
      const matchQuestion = stage.question.toLowerCase().includes(q);
      const matchDeliverable = stage.deliverable.toLowerCase().includes(q);
      const matchSummary = stage.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchQuestion && !matchDeliverable && !matchSummary) return false;
    }
    return true;
  });

  const handleNextStage = () => {
    if (selectedStageId < LADDER_STAGES.length - 1) {
      setSelectedStageId(prev => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (selectedStageId > 0) {
      setSelectedStageId(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Top Banner & Progression Meta */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-amber-500/40 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400">
              Realm of Nexus • System Architecture
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
              31-Stage Design Ladder
            </span>
          </div>
          <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-amber-100 mt-1">
            The Nexus TCG Design Ladder
          </h2>
          <p className="text-stone-300 text-xs mt-1 max-w-2xl">
            A complete, step-by-step game design progression where every creative and philosophical decision translates directly into codified rules, math formulas, card mechanics, and playable prototypes.
          </p>
        </div>

        {/* Quick Progression Indicator */}
        <div className="flex items-center gap-3 bg-stone-950 px-4 py-2.5 rounded-xl border border-stone-800">
          <div className="text-right">
            <span className="text-[10px] font-sans uppercase text-stone-400 block">Current Stage</span>
            <span className="font-cinzel font-bold text-sm text-amber-300">
              Stage {currentStage.stageNumber} of 30
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center font-cinzel font-black text-lg text-amber-300">
            {currentStage.stageNumber}
          </div>
        </div>
      </div>

      {/* Phase Navigator Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => setSelectedPhase('All')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-cinzel font-bold whitespace-nowrap transition border ${
            selectedPhase === 'All'
              ? 'bg-amber-500 text-black border-amber-400 shadow'
              : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          All 31 Stages
        </button>
        {PHASES.map((ph) => (
          <button
            key={ph}
            onClick={() => setSelectedPhase(ph)}
            className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold whitespace-nowrap transition border ${
              selectedPhase === ph
                ? 'bg-amber-500 text-black border-amber-400 shadow'
                : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            {ph}
          </button>
        ))}
      </div>

      {/* 2-Column Main Layout: Left = Stage Carousel/List, Right = Stage Deep-Dive & Interactive Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stage Selector List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search stages or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5 max-h-[680px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredStages.map((stage) => {
              const isSelected = selectedStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-100 ring-1 ring-amber-400/40 shadow'
                      : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-amber-500 text-black' : 'bg-stone-800 text-stone-300'
                  }`}>
                    {stage.stageNumber}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-cinzel font-bold text-xs truncate ${isSelected ? 'text-amber-200' : 'text-stone-200'}`}>
                      {stage.title}
                    </h4>
                    <p className="text-[10px] text-stone-400 truncate mt-0.5">
                      {stage.question}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Stage Deep-Dive Specification (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Stage Hero Card */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/40 shadow-xl space-y-5">
            
            {/* Header with Navigation Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  {currentStage.phase} • Stage {currentStage.stageNumber}
                </span>
                <h3 className="font-cinzel font-black text-2xl text-amber-100 mt-0.5">
                  {currentStage.title}
                </h3>
              </div>

              {/* Prev / Next Stage Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStage}
                  disabled={selectedStageId === 0}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-200 text-xs font-cinzel flex items-center gap-1 transition"
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <button
                  onClick={handleNextStage}
                  disabled={selectedStageId === LADDER_STAGES.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-200 text-xs font-cinzel flex items-center gap-1 transition"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Core Question & What It Produces */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] font-cinzel text-amber-400 uppercase tracking-wider block">
                  Core Question Answered
                </span>
                <p className="font-cinzel font-bold text-sm text-stone-100 mt-1">
                  "{currentStage.question}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] font-cinzel text-emerald-400 uppercase tracking-wider block">
                  Tangible Deliverable
                </span>
                <p className="font-mono font-bold text-sm text-emerald-200 mt-1">
                  {currentStage.deliverable}
                </p>
              </div>
            </div>

            {/* Stage Summary & Formal Definition */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-cinzel uppercase tracking-wider text-amber-300 font-bold mb-1">
                  Executive Concept
                </h4>
                <p className="text-xs text-stone-200 leading-relaxed font-sans bg-stone-950/60 p-3 rounded-lg border border-stone-800">
                  {currentStage.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-cinzel uppercase tracking-wider text-amber-300 font-bold mb-1">
                  Formal Rule Specification & Architecture
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans bg-stone-950/60 p-3 rounded-lg border border-stone-800">
                  {currentStage.formalDefinition}
                </p>
              </div>
            </div>

            {/* Codified Rules Framework */}
            <div className="space-y-2">
              <h4 className="text-xs font-cinzel uppercase tracking-wider text-amber-300 font-bold">
                Codified Rules Clauses ({currentStage.rulesText.length})
              </h4>
              <div className="space-y-1.5">
                {currentStage.rulesText.map((rule, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 flex items-start gap-2">
                    <span className="text-amber-400 font-mono font-bold text-[11px] shrink-0 mt-0.5">§{currentStage.stageNumber}.{idx + 1}</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concrete Examples & Design Pitfalls Avoided */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] font-cinzel text-amber-300 uppercase tracking-wider block font-bold">
                  Concrete In-Game Example
                </span>
                {currentStage.concreteExamples.map((ex, i) => (
                  <p key={i} className="text-xs text-stone-300 italic">
                    "{ex}"
                  </p>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] font-cinzel text-red-400 uppercase tracking-wider block font-bold">
                  Design Pitfall Avoided
                </span>
                {currentStage.designPitfallsAvoided.map((dp, i) => (
                  <p key={i} className="text-xs text-stone-300">
                    • {dp}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Embedded Interactive Tool (If applicable to the stage) */}
          {currentStage.stageNumber === 20 && <PowerBudgetCalculator />}
          {(currentStage.stageNumber === 11 || currentStage.stageNumber === 12) && <HazardDiceSimulator />}
          {currentStage.stageNumber === 13 && <KeywordsExplorer />}
          {currentStage.stageNumber === 18 && <SetSkeletonTracker />}
          {currentStage.stageNumber === 25 && (
            <StarterDecksViewer
              onSelectDeckForBattle={onSelectDeckForBattle}
              onInspectCard={onInspectCard}
            />
          )}
          {(currentStage.stageNumber === 28 || currentStage.stageNumber === 29) && <RulesBibleExplorer />}

          {/* If the current stage does not have a custom embedded interactive widget, provide direct shortcuts */}
          {!['power-calculator', 'hazard-dice', 'keywords', 'set-skeleton', 'rules-bible', 'starter-decks'].includes(currentStage.interactiveComponent || '') && (
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-cinzel font-bold text-sm text-amber-200">
                  Ready to test this stage in live combat?
                </h4>
                <p className="text-xs text-stone-300">
                  All 31 stages are integrated directly into the Battle Arena, Card Forge, and Card Compendium.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedStageId(20)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-cinzel border border-stone-700 transition"
                >
                  Math Calculator (Stage 20)
                </button>
                <button
                  onClick={() => setSelectedStageId(25)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-cinzel font-bold transition"
                >
                  Starter Decks (Stage 25)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
