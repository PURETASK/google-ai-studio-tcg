import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/audioEngine';
import { 
  Zap, 
  X, 
  Search, 
  HelpCircle, 
  Shield, 
  Sword, 
  Sparkles, 
  Flame, 
  Heart, 
  Skull, 
  Wind, 
  Compass, 
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface KeywordEntry {
  keyword: string;
  category: 'combat' | 'defensive' | 'domain' | 'tactical';
  domain?: string;
  badge: string;
  definition: string;
  tacticalTip: string;
  icon: string;
}

const KEYWORDS_DB: KeywordEntry[] = [
  {
    keyword: 'Vanguard / Taunt',
    category: 'defensive',
    badge: 'FRONT LINE',
    definition: 'Units with Vanguard must be targeted and slain before enemies can attack your backline units or strike your Player Hero directly.',
    tacticalTip: 'Place bulky units with high defense in Vanguard to protect your high-damage Glass Cannons.',
    icon: '🛡️'
  },
  {
    keyword: 'Aegis / Divine Shield',
    category: 'defensive',
    domain: 'Sanctuary',
    badge: 'ABSORB',
    definition: 'Creates a barrier that absorbs incoming combat or spell damage equal to its current shield charge before unit health is reduced.',
    tacticalTip: 'Sanctuary spells frequently recharge Aegis shields across all active lane guardians.',
    icon: '✨'
  },
  {
    keyword: 'Siphon / Soul Reap',
    category: 'combat',
    domain: 'Abyss',
    badge: 'LIFESTEAL',
    definition: 'When dealing combat damage to enemy units or the opposing hero, heals your player champion for an equivalent amount of HP.',
    tacticalTip: 'Synergizes heavily with high-attack Void cards to recover from aggressive enemy bursts.',
    icon: '💀'
  },
  {
    keyword: 'Momentum / Initiative',
    category: 'tactical',
    badge: 'SPEED TIER',
    definition: 'Determines turn attack sequence and unlocks extra bonus strikes when higher than opponent speed rating during clash resolution.',
    tacticalTip: 'Roll momentum dice to gain priority when initiating multi-lane assaults.',
    icon: '⚡'
  },
  {
    keyword: 'Overpower / Trample',
    category: 'combat',
    badge: 'PIERCING',
    definition: 'Any excess combat damage dealt beyond the defending unit’s remaining defense directly pierces through to the opponent player.',
    tacticalTip: 'Ideal for colossal Radiance and Verdance behemoths attacking low-HP tokens.',
    icon: '💥'
  },
  {
    keyword: 'Haste / Quickstrike',
    category: 'combat',
    badge: 'INSTANT ATK',
    definition: 'Units with Haste ignore summoning sickness and can attack immediately on the exact turn they are deployed onto the lane.',
    tacticalTip: 'Use Haste cards as surprise burst finishers or to immediately eliminate threatening enemy casters.',
    icon: '💨'
  },
  {
    keyword: 'Magma Burn / Flare',
    category: 'combat',
    domain: 'Radiance',
    badge: 'DOT STATUS',
    definition: 'Afflicted targets suffer ongoing fire damage at the end of each turn equal to the current Burn stack count.',
    tacticalTip: 'Stacking burn on high-health boss titans slowly erodes their defenses over multiple turns.',
    icon: '🌋'
  },
  {
    keyword: 'Soulbound / Deathrattle',
    category: 'tactical',
    badge: 'ON SLAY',
    definition: 'Triggers a powerful secondary spell, token summon, or retaliation curse immediately upon the unit being destroyed and sent to the boneyard.',
    tacticalTip: 'Opponents hesitate to slay Soulbound units if the death clause deals heavy area damage.',
    icon: '🔮'
  },
  {
    keyword: 'Spellcraft / Attunement',
    category: 'domain',
    domain: 'Arcane',
    badge: 'ESSENCE BUFF',
    definition: 'Amplifies all domain spell effects and reduces essence costs for every attuned relic or continuous enchantment on your battlefield.',
    tacticalTip: 'Stack low-cost Arcane cantrips to rapidly trigger massive Spellcraft multipliers.',
    icon: '🌌'
  },
  {
    keyword: 'Primeval Regeneration',
    category: 'domain',
    domain: 'Verdance',
    badge: 'HEAL PER TURN',
    definition: 'Restores a flat amount of HP to this unit at the beginning of your turn as long as the battlefield environment remains Verdant or Neutral.',
    tacticalTip: 'Pair regenerating units with armor relics to create self-sustaining lane walls.',
    icon: '🌿'
  }
];

export const QuickRulesWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'combat' | 'defensive' | 'domain' | 'tactical'>('all');

  const filteredKeywords = KEYWORDS_DB.filter(k => {
    if (selectedCategory !== 'all' && k.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return k.keyword.toLowerCase().includes(q) || k.definition.toLowerCase().includes(q) || k.tacticalTip.toLowerCase().includes(q);
    }
    return true;
  });

  const handleToggle = () => {
    soundEngine.playMicroSound('click');
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        id="btn-quick-rules-floating"
        className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-stone-900 to-amber-950 border-2 border-amber-500/70 shadow-2xl text-amber-300 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-amber-400 transition-all backdrop-blur-md"
      >
        <Zap size={15} className="text-amber-400 animate-pulse" />
        <span>Quick Rules</span>
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
      </motion.button>

      {/* Floating Quick Rules Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-20 right-5 z-50 w-full max-w-md bg-stone-950/95 border-2 border-amber-500/60 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col max-h-[80vh] overflow-hidden"
          >
            {/* Overlay Header */}
            <div className="p-4 bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950/50 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h4 className="font-cinzel font-black text-sm text-amber-100 flex items-center gap-1.5">
                    <span>Quick Rules & Keywords</span>
                  </h4>
                  <p className="text-[10px] text-stone-400 font-mono">
                    Tactical Keyword Interactions & Combat Reference
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggle}
                className="w-7 h-7 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center border border-stone-800 transition"
              >
                <X size={14} />
              </button>
            </div>

            {/* Search and Category Filter */}
            <div className="p-3 bg-stone-900/80 border-b border-stone-800 space-y-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search keywords (e.g. Taunt, Aegis, Siphon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-cinzel">
                {[
                  { id: 'all' as const, label: 'All' },
                  { id: 'combat' as const, label: 'Combat' },
                  { id: 'defensive' as const, label: 'Defensive' },
                  { id: 'domain' as const, label: 'Domain' },
                  { id: 'tactical' as const, label: 'Tactical' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('hover');
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-2 py-1 rounded-lg font-bold transition shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-black shadow'
                        : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword Cards Scroll View */}
            <div className="p-3 overflow-y-auto space-y-2.5 flex-1 scrollbar-thin bg-stone-950">
              {filteredKeywords.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-400 italic">
                  No keywords found matching "{searchQuery}".
                </div>
              ) : (
                filteredKeywords.map((item) => (
                  <div
                    key={item.keyword}
                    className="p-3 rounded-2xl bg-stone-900/90 border border-amber-500/30 hover:border-amber-500/60 transition space-y-1.5 shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.icon}</span>
                        <h5 className="font-cinzel font-bold text-xs text-amber-200">
                          {item.keyword}
                        </h5>
                      </div>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                      {item.definition}
                    </p>

                    <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-[10px] text-amber-400/90 font-sans flex items-start gap-1.5">
                      <span className="font-bold text-amber-300 shrink-0">💡 Tip:</span>
                      <span>{item.tacticalTip}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Overlay Footer */}
            <div className="p-2.5 bg-stone-900 border-t border-stone-800 text-center text-[10px] font-mono text-stone-400 flex items-center justify-between px-4">
              <span>CRD Keyword Rules Reference</span>
              <span className="text-amber-400 font-bold">10 Universal Keywords</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
