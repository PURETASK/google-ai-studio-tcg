import React, { useState, useEffect, useRef } from 'react';
import { Domain, Card } from '../../types';
import { REALM_ART_THEMES } from '../../data/nexusArtTheme';
import { soundEngine } from '../../utils/audioEngine';
import { missionsManager } from '../../utils/missionsManager';
import { HeaderEconomyHUD } from '../HeaderEconomyHUD';
import { 
  Swords, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Compass, 
  Cpu, 
  FileText, 
  Activity, 
  GitFork, 
  Search, 
  Volume2, 
  VolumeX, 
  Flame, 
  Zap, 
  Sun, 
  Skull, 
  Trees,
  Crown,
  Coins,
  Scale,
  Package,
  Palette,
  ChevronDown,
  Gift,
  Award,
  Music,
  Menu,
  Castle,
  LayoutGrid,
  X
} from 'lucide-react';

interface NexusTopNavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  activeRealmId: string;
  onOpenAtlas: () => void;
  onOpenSearch: () => void;
  totalCardsCount: number;
}

interface NavCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: {
    id: string;
    label: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge?: string;
  }[];
}

export const NexusTopNavbar: React.FC<NexusTopNavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRealmId,
  onOpenAtlas,
  onOpenSearch,
  totalCardsCount
}) => {
  const currentRealm = REALM_ART_THEMES[activeRealmId] || REALM_ART_THEMES.Nexus;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [claimableMissionsCount, setClaimableMissionsCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateCount = (msList?: any) => {
      try {
        const ms = Array.isArray(msList) ? msList : missionsManager.getMissions();
        if (Array.isArray(ms)) {
          const ready = ms.filter(m => m && m.isCompleted && !m.isClaimed).length;
          setClaimableMissionsCount(ready);
        } else {
          setClaimableMissionsCount(0);
        }
      } catch (err) {
        console.warn('Could not update missions count:', err);
        setClaimableMissionsCount(0);
      }
    };
    updateCount();
    const unsub = missionsManager.subscribe(updateCount);
    return unsub;
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, []);

  const handleTabChange = (tabId: any) => {
    soundEngine.playMicroSound('select');
    setActiveTab(tabId);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const navCategories: NavCategory[] = [
    {
      id: 'battle',
      label: 'Combat',
      icon: Swords,
      items: [
        { id: 'arena', label: 'Arena Clash', description: 'PvE battle & Titan Boss encounters', icon: Swords, badge: 'HOT' },
        { id: 'proto_arena', label: 'Prototyping Arena', description: '3-Line zoning, 3-turn build & breakthrough win testbed', icon: LayoutGrid, badge: 'ZONING' },
        { id: 'siege', label: '3-Frontier Siege', description: '3-Lane mobilization & Tri-Forge clash sandbox', icon: Castle, badge: 'LAB' },
        { id: 'campaign', label: 'Chronicles Campaign', description: '5-Domain progressive realm map & titan gateways', icon: Compass, badge: 'MAP' },
        { id: 'set001', label: 'Set 001 Sealed', description: '100-card tournament sealed deck curator', icon: Package, badge: 'NEW' },
        { id: 'gauntlet', label: 'Archetype Lab', description: 'Test 14 game balance archetypes', icon: Activity, badge: 'GLO-14' },
        { id: 'simulation', label: 'Sim Engine', description: '100+ batch duel telemetry engine', icon: Activity, badge: '100+' }
      ]
    },
    {
      id: 'collection',
      label: 'Cards & Vault',
      icon: Layers,
      items: [
        { id: 'codex', label: 'Card Compendium', description: 'Inspect all discovered cards & filters', icon: BookOpen, badge: totalCardsCount.toString() },
        { id: 'decks', label: 'Deck Grimoire', description: 'Construct custom 30-card tournament decks', icon: Layers },
        { id: 'booster', label: 'Booster Vault', description: 'Rip foil booster packs & summon relics', icon: Sparkles, badge: 'VAULT' },
        { id: 'forge', label: 'Vision Card Forge', description: 'Create, balance & test custom cards', icon: Sparkles, badge: 'STUDIO' },
        { id: 'frames', label: 'Realism Frames', description: 'Inspect 5-domain architectural borders', icon: Palette }
      ]
    },
    {
      id: 'codex',
      label: 'Lore & Rules',
      icon: BookOpen,
      items: [
        { id: 'rules', label: 'Rules & Judge', description: 'Turn structure & Priority Stack adjudicator', icon: Scale, badge: 'GLO-23' },
        { id: 'domains', label: 'Domain Omnidex', description: '5 elemental realms & environmental hazards', icon: Compass, badge: '5' },
        { id: 'grimoire', label: 'Powers & Grimoire', description: 'Domain abilities & power glyph clauses', icon: Sparkles },
        { id: 'bible', label: 'Color & Momentum', description: 'Mechanical identity & momentum economy', icon: Activity, badge: '36' },
        { id: 'ladder', label: 'Design Ladder', description: 'Stages 0-30 TCG architecture specs', icon: GitFork, badge: '0-30' },
        { id: 'docs', label: 'Master Docs', description: 'Comprehensive design documentation', icon: FileText, badge: '9' }
      ]
    },
    {
      id: 'studios',
      label: 'Studios',
      icon: Cpu,
      items: [
        { id: 'studio', label: 'Studio & Agents', description: '94-agent design registry & pipeline', icon: Cpu, badge: '94' },
        { id: 'audio', label: 'Audio Sanctum', description: 'Procedural soundboard & realm ambience', icon: Music, badge: 'SOUND' },
        { id: 'art', label: 'Art Architecture', description: '6-layer visual composition breakdown', icon: Sparkles, badge: '6L' }
      ]
    }
  ];

  // Helper to determine if an item within a category is active
  const isCategoryActive = (cat: NavCategory) => {
    return cat.items.some(it => it.id === activeTab);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-amber-500/30 shadow-2xl w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2.5 min-w-0 w-full" ref={dropdownRef}>
        
        {/* Left: Brand Sigil & Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => handleTabChange('arena')}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 border-2 border-amber-300 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(234,179,8,0.4)] group-hover:scale-105 transition">
                <span>{currentRealm.sigil}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-stone-950 border border-amber-400 flex items-center justify-center text-[7px] font-mono text-amber-300">
                ★
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-cinzel font-black text-sm sm:text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 leading-tight">
                  REALM OF NEXUS
                </h1>
                <span className="hidden xl:inline-block text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  {currentRealm.name.split(' ')[0]}
                </span>
              </div>
              <p className="font-cinzel text-[8px] tracking-widest text-stone-400 uppercase hidden sm:block">
                Tactical TCG Suite
              </p>
            </div>
          </div>
        </div>

        {/* Center: Consolidated Hierarchical Categories & Direct Quests Link */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-cinzel">
          {navCategories.map(cat => {
            const CatIcon = cat.icon;
            const active = isCategoryActive(cat);
            const isOpen = openDropdown === cat.id;

            return (
              <div key={cat.id} className="relative">
                <button
                  type="button"
                  id={`nav-category-${cat.id}`}
                  onClick={() => setOpenDropdown(prev => prev === cat.id ? null : cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/20 text-amber-200 border border-amber-500/60 shadow-sm'
                      : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 hover:text-amber-200 border border-stone-800/80'
                  }`}
                >
                  <CatIcon size={14} className={active ? 'text-amber-400' : 'text-stone-400'} />
                  <span>{cat.label}</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : 'text-stone-500'}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-2xl p-2 z-50 space-y-1 animate-fadeIn backdrop-blur-xl">
                    {cat.items.map(item => {
                      const ItemIcon = item.icon;
                      const isItemActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          id={`nav-item-${item.id}`}
                          type="button"
                          onClick={() => handleTabChange(item.id)}
                          className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition ${
                            isItemActive
                              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                              : 'hover:bg-stone-900 text-stone-300 hover:text-amber-100'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                            isItemActive ? 'bg-amber-500 text-black' : 'bg-stone-900 text-amber-400'
                          }`}>
                            <ItemIcon size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-cinzel font-bold text-xs truncate">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-stone-400 font-sans line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quests Button (Direct Access with Live Badge) */}
          <button
            type="button"
            id="nav-tab-missions"
            onClick={() => handleTabChange('missions')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap ${
              activeTab === 'missions'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 hover:text-purple-300 border border-purple-900/50'
            }`}
            title="Daily Quests & Streak Rewards"
          >
            <Award size={14} className={activeTab === 'missions' ? 'text-white' : 'text-purple-400'} />
            <span>Quests</span>
            {claimableMissionsCount > 0 && (
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-400 text-black animate-bounce shadow">
                {claimableMissionsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right: Embedded Live HeaderEconomyHUD & Quick Tools */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Header Economy HUD */}
          <div className="hidden sm:block">
            <HeaderEconomyHUD 
              onOpenVault={() => handleTabChange('booster')}
              onOpenMissions={() => handleTabChange('missions')}
            />
          </div>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden xl:flex px-2 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white text-xs font-mono items-center gap-1.5 transition"
            title="Press Cmd+K to search"
          >
            <Search size={13} className="text-amber-400" />
            <kbd className="text-[9px] px-1 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-300">
              ⌘K
            </kbd>
          </button>

          {/* Atlas Map Trigger */}
          <button
            type="button"
            onClick={onOpenAtlas}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-cinzel font-bold flex items-center gap-1.5 transition shadow"
            title="Explore 5-Domain Realm Atlas"
          >
            <Compass size={14} />
            <span className="hidden sm:inline">Atlas</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            title="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-t border-stone-800 p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Mobile Economy HUD */}
          <div className="pb-3 border-b border-stone-800 flex justify-center">
            <HeaderEconomyHUD 
              onOpenVault={() => handleTabChange('booster')}
              onOpenMissions={() => handleTabChange('missions')}
            />
          </div>

          {/* Mobile Nav Categories */}
          {navCategories.map(cat => (
            <div key={cat.id} className="space-y-1.5">
              <span className="font-cinzel text-[10px] uppercase font-bold text-amber-400 tracking-wider block px-1">
                {cat.label}
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {cat.items.map(item => {
                  const ItemIcon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabChange(item.id)}
                      className={`p-2 rounded-xl text-left flex items-center gap-2 border text-xs font-cinzel ${
                        active
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                          : 'bg-stone-900/60 border-stone-800 text-stone-300'
                      }`}
                    >
                      <ItemIcon size={14} className={active ? 'text-amber-400' : 'text-stone-500'} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Mobile Quests Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleTabChange('missions')}
              className="w-full py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/50 text-purple-200 font-cinzel font-bold text-xs flex items-center justify-center gap-2"
            >
              <Award size={16} className="text-purple-400" />
              <span>Daily Quests & Streak Calendar ({claimableMissionsCount} Ready)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

