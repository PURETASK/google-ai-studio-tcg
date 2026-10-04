import React, { useState, useEffect } from 'react';
import { Card } from '../../types';
import { CARDS_DATABASE } from '../../data/cards';
import { REALM_ART_THEMES } from '../../data/nexusArtTheme';
import { soundEngine } from '../../utils/audioEngine';
import { 
  Search, 
  X, 
  Sparkles, 
  Layers, 
  Compass, 
  Swords, 
  BookOpen, 
  Cpu, 
  FileText, 
  Activity, 
  GitFork, 
  ArrowRight,
  Zap,
  Flame,
  Sun,
  Skull,
  Trees
} from 'lucide-react';

interface NexusCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (card: Card) => void;
  onSelectTab: (tab: any) => void;
  onSelectRealmTheme: (realmId: string) => void;
  allCards: Card[];
}

export const NexusCommandPalette: React.FC<NexusCommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectCard,
  onSelectTab,
  onSelectRealmTheme,
  allCards
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Navigation Items
  const navItems = [
    { id: 'arena', label: 'PvE Combat Arena & AI Duel', icon: Swords, type: 'Battle' },
    { id: 'campaign', label: 'Chronicles Campaign & Titan Gateways', icon: Compass, type: 'Battle' },
    { id: 'set001', label: 'Set 001 Sealed Deck Curator', icon: Layers, type: 'Battle' },
    { id: 'gauntlet', label: 'Archetype Gauntlet Lab', icon: Activity, type: 'Battle' },
    { id: 'simulation', label: 'Simulation Engine & 100-Game Batch', icon: Activity, type: 'Battle' },
    { id: 'missions', label: 'Daily Missions & Streak Calendar', icon: Sparkles, type: 'Quests' },
    { id: 'codex', label: 'Card Compendium & Codex', icon: BookOpen, type: 'Collection' },
    { id: 'decks', label: 'Deck Grimoire & Builder', icon: Layers, type: 'Collection' },
    { id: 'booster', label: 'Booster Pack Vault', icon: Sparkles, type: 'Vault' },
    { id: 'forge', label: 'Vision Card Forge Studio', icon: Sparkles, type: 'Studio' },
    { id: 'frames', label: 'Realism Card Frames Customizer', icon: Sparkles, type: 'Studio' },
    { id: 'audio', label: 'Audio Sanctum Sound Studio', icon: Sparkles, type: 'Studio' },
    { id: 'studio', label: 'Studio & Agents Architecture', icon: Cpu, type: 'System' },
    { id: 'rules', label: 'Rules Adjudicator & Judge Suite', icon: FileText, type: 'Codex' },
    { id: 'docs', label: 'Master Documentation Hub & Rules', icon: FileText, type: 'Codex' },
    { id: 'domains', label: 'Domain Omnidex & Environmental Hazards', icon: Compass, type: 'Codex' },
    { id: 'grimoire', label: 'Domain Arsenal & Elemental Powers', icon: Sparkles, type: 'Codex' },
    { id: 'ladder', label: 'TCG Design Ladder (Stages 0-30)', icon: GitFork, type: 'Codex' },
    { id: 'bible', label: 'Color Identity & Momentum Bible', icon: Activity, type: 'Codex' },
    { id: 'art', label: 'Nexus Art Architecture (6-Layer)', icon: Sparkles, type: 'Studio' }
  ].filter(item => !trimmed || item.label.toLowerCase().includes(trimmed));

  // Realm Themes
  const realmItems = Object.values(REALM_ART_THEMES).filter(r => 
    !trimmed || r.name.toLowerCase().includes(trimmed) || r.domain.toLowerCase().includes(trimmed)
  );

  // Filter Cards
  const matchingCards = allCards
    .filter(c => !trimmed || c.name.toLowerCase().includes(trimmed) || c.domain.toLowerCase().includes(trimmed))
    .slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Bar Input */}
        <div className="p-4 bg-stone-900/90 border-b border-stone-800 flex items-center gap-3">
          <Search size={18} className="text-amber-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a card name, domain, page, or realm theme... (Esc to close)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none font-cinzel"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          
          {/* Quick Pages */}
          {navItems.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold px-2 block mb-1.5">
                Quick Navigation
              </span>
              <div className="space-y-1">
                {navItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playMicroSound('select');
                        onSelectTab(item.id);
                        onClose();
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-left text-xs font-cinzel text-stone-200 flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} className="text-amber-400 group-hover:scale-110 transition" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-500 group-hover:text-amber-300">Jump ↵</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Realm Themes */}
          {realmItems.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold px-2 block mb-1.5">
                Realm Atmosphere Themes
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {realmItems.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('unlock');
                      onSelectRealmTheme(r.id);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-left text-xs font-cinzel text-stone-300 hover:text-white border border-stone-800 hover:border-amber-500/50 flex items-center gap-2 transition"
                  >
                    <span className="text-sm">{r.sigil}</span>
                    <div className="truncate">
                      <div className="font-bold truncate text-[11px]">{r.name.split(' ')[0]}</div>
                      <div className="text-[9px] font-mono text-stone-500 truncate">{r.domain}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Cards */}
          {matchingCards.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold px-2 block mb-1.5">
                Cards ({matchingCards.length})
              </span>
              <div className="space-y-1">
                {matchingCards.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroSound('select');
                      onSelectCard(c);
                      onClose();
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-left text-xs font-cinzel text-stone-200 flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-stone-950 border border-stone-700 shrink-0">
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-100 group-hover:text-amber-300">{c.name}</div>
                        <div className="text-[10px] font-mono text-stone-400">
                          {c.domain} • {c.rarity} • {c.cost} Mana
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400">Inspect ↵</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 bg-stone-950 border-t border-stone-850 flex items-center justify-between text-[10px] font-mono text-stone-500">
          <span>Search Realm of Nexus Codex & Engine</span>
          <div className="flex items-center gap-3">
            <span>Esc to close</span>
            <span>↵ to select</span>
          </div>
        </div>

      </div>
    </div>
  );
};
