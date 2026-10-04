import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Domain } from '../types';
import { KeywordRuleDefinition, findKeywordRule } from '../utils/keywordRuleDefinitions';
import { soundEngine } from '../utils/audioEngine';
import { 
  Shield, 
  Sword, 
  Sparkles, 
  Flame, 
  Zap, 
  Eye, 
  Skull, 
  Layers, 
  Clock, 
  Dices, 
  HelpCircle, 
  ChevronRight, 
  CheckCircle2, 
  Compass 
} from 'lucide-react';

export interface KeywordTooltipProps {
  keyword: string;
  domain?: Domain;
  children?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  pillStyle?: boolean;
}

export const KeywordTooltip: React.FC<KeywordTooltipProps> = ({
  keyword,
  domain,
  children,
  showIcon = true,
  className = '',
  pillStyle = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rule = findKeywordRule(keyword, domain);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    soundEngine.playMicroSound('hover');
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  if (!rule) {
    return <span className={className}>{children || keyword}</span>;
  }

  const getDomainTheme = () => {
    switch (rule.domain) {
      case 'Sanctuary':
        return {
          border: 'border-amber-500/50',
          bg: 'bg-amber-950/95',
          text: 'text-amber-300',
          pillBg: 'bg-amber-950/70 border-amber-600/40 text-amber-300 hover:border-amber-400'
        };
      case 'Radiance':
        return {
          border: 'border-red-500/50',
          bg: 'bg-red-950/95',
          text: 'text-red-300',
          pillBg: 'bg-red-950/70 border-red-600/40 text-red-300 hover:border-red-400'
        };
      case 'Verdance':
        return {
          border: 'border-emerald-500/50',
          bg: 'bg-emerald-950/95',
          text: 'text-emerald-300',
          pillBg: 'bg-emerald-950/70 border-emerald-600/40 text-emerald-300 hover:border-emerald-400'
        };
      case 'Arcane':
        return {
          border: 'border-blue-500/50',
          bg: 'bg-blue-950/95',
          text: 'text-blue-300',
          pillBg: 'bg-blue-950/70 border-blue-600/40 text-blue-300 hover:border-blue-400'
        };
      case 'Abyss':
        return {
          border: 'border-purple-500/50',
          bg: 'bg-purple-950/95',
          text: 'text-purple-300',
          pillBg: 'bg-purple-950/70 border-purple-600/40 text-purple-300 hover:border-purple-400'
        };
      default:
        return {
          border: 'border-stone-700',
          bg: 'bg-stone-900/95',
          text: 'text-amber-300',
          pillBg: 'bg-stone-900/80 border-stone-700 text-stone-200 hover:border-amber-400'
        };
    }
  };

  const theme = getDomainTheme();

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger element */}
      {pillStyle ? (
        <span
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold border transition-colors cursor-help ${theme.pillBg}`}
        >
          {showIcon && <span className="text-[10px]">{rule.iconSymbol}</span>}
          <span>{children || rule.keyword}</span>
        </span>
      ) : (
        <span className="underline decoration-dotted decoration-amber-400/60 hover:decoration-amber-300 underline-offset-2 cursor-help text-amber-200 transition-colors">
          {children || rule.keyword}
        </span>
      )}

      {/* Floating Tooltip with Motion Animation */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 rounded-xl border shadow-2xl backdrop-blur-xl pointer-events-none text-left font-sans ${theme.bg} ${theme.border}`}
          >
            {/* Header: Domain, Keyword Title, Category */}
            <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{rule.iconSymbol}</span>
                <div>
                  <h5 className="font-cinzel font-bold text-xs text-white leading-tight">
                    {rule.keyword}
                  </h5>
                  <span className={`text-[8.5px] font-cinzel uppercase font-bold tracking-wider ${theme.text}`}>
                    {rule.domain} Domain • {rule.category}
                  </span>
                </div>
              </div>

              {/* Timing Badge */}
              <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-[8px] font-mono text-amber-300 font-bold shrink-0">
                {rule.triggerTiming}
              </span>
            </div>

            {/* Official Rule Definition */}
            <div className="mt-2 space-y-1.5">
              <p className="text-[11px] text-stone-200 leading-relaxed">
                {rule.officialRuleText}
              </p>

              {/* Mathematical Formula / Resolution Logic */}
              {rule.mathematicalClause && (
                <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono text-emerald-300 space-y-0.5">
                  <span className="text-[7.5px] text-stone-400 uppercase tracking-widest block font-cinzel">
                    Resolution Logic:
                  </span>
                  <div className="truncate">{rule.mathematicalClause}</div>
                </div>
              )}

              {/* Synergy & Counterplay Tips */}
              {(rule.synergyTip || rule.counterplayTip) && (
                <div className="pt-1.5 border-t border-white/10 space-y-1 text-[9.5px]">
                  {rule.synergyTip && (
                    <div className="flex items-start gap-1 text-amber-200/90 leading-tight">
                      <span className="text-amber-400 font-bold shrink-0">💡 Synergy:</span>
                      <span>{rule.synergyTip}</span>
                    </div>
                  )}
                  {rule.counterplayTip && (
                    <div className="flex items-start gap-1 text-purple-200/90 leading-tight">
                      <span className="text-purple-400 font-bold shrink-0">🛡️ Counter:</span>
                      <span>{rule.counterplayTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Subtle bottom arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45 bg-stone-950 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
