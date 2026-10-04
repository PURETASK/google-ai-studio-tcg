import React, { useState, useEffect } from 'react';
import { Card, DeckPreset, Domain } from './types';
import { CARDS_DATABASE, PRESET_DECKS } from './data/cards';
import { CardCodex } from './components/CardCodex';
import { BattleArena } from './components/BattleArena';
import { DeckBuilder } from './components/DeckBuilder';
import { CardForge } from './components/CardForge';
import { PackOpener } from './components/PackOpener';
import { CardModal } from './components/CardModal';
import { NexusLadderView } from './components/NexusLadder/NexusLadderView';
import { NexusTutorialModal } from './components/NexusTutorialModal';
import { StudioAgentRegistryView } from './components/StudioAgentRegistry/StudioAgentRegistryView';
import { ColorIdentityBibleView } from './components/ColorIdentityMomentumBible/ColorIdentityBibleView';
import { MasterDocumentationHub } from './components/MasterDocumentationHub';
import { DomainGrimoireView } from './components/DomainGrimoire/DomainGrimoireView';
import { DomainCompendiumView } from './components/DomainCompendiumView';
import { NexusArtArchitectureView } from './components/NexusArtArchitecture/NexusArtArchitectureView';
import { SimulationEngine } from './components/SimulationEngine/SimulationEngine';
import { RealmBackgroundSuite } from './components/RealmAtmosphere/RealmBackgroundSuite';
import { NexusTopNavbar } from './components/NexusUI/NexusTopNavbar';
import { RealmAtmosphereBar } from './components/NexusUI/RealmAtmosphereBar';
import { RealmAtlasModal } from './components/NexusUI/RealmAtlasModal';
import { NexusCommandPalette } from './components/NexusUI/NexusCommandPalette';
import { PAGE_REALM_PRESETS } from './data/nexusArtTheme';
import { RulesAdjudicatorView } from './components/RulesAdjudicatorView';
import { Set001CuratorView } from './components/Set001CuratorView';
import { ArchetypeGauntletLab } from './components/ArchetypeGauntletLab';
import { CardFrameCustomizer } from './components/CardFrameCustomizer';
import { DailyMissionsView } from './components/DailyMissionsView';
import { AudioSanctumView } from './components/AudioSanctumView';
import { ChroniclesCampaignView } from './components/ChroniclesCampaignView';
import { TriForgeSiegeArena } from './components/TriForgeSiege/TriForgeSiegeArena';
import { PrototypingArena } from './components/PrototypingArena';
import {
  initCustomCardStorage,
  saveCustomCard,
  saveCustomCardsBatch,
  getCustomCardsSync
} from './utils/customCardStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'art' | 'studio' | 'ladder' | 'bible' | 'docs' | 'domains' | 'grimoire' | 'arena' | 'proto_arena' | 'siege' | 'simulation' | 'codex' | 'decks' | 'booster' | 'forge' | 'rules' | 'set001' | 'gauntlet' | 'frames' | 'missions' | 'audio' | 'campaign'>('proto_arena');
  const [activeRealmId, setActiveRealmId] = useState<string>('Sanctuary');
  const [isManualRealmSelected, setIsManualRealmSelected] = useState<boolean>(false);
  const [enableParticles, setEnableParticles] = useState<boolean>(true);
  const [particleDensity, setParticleDensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [isAtlasOpen, setIsAtlasOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  const [cardsList, setCardsList] = useState<Card[]>(() => {
    const customCards = getCustomCardsSync();
    const map = new Map<string, Card>();
    // Add custom cards first, then base cards
    for (const card of customCards) {
      if (card && card.id) map.set(card.id, card);
    }
    for (const card of CARDS_DATABASE) {
      if (card && card.id && !map.has(card.id)) {
        map.set(card.id, card);
      }
    }
    return Array.from(map.values());
  });
  const [inspectedCard, setInspectedCard] = useState<Card | null>(null);
  const [activeBattleDeck, setActiveBattleDeck] = useState<DeckPreset>(PRESET_DECKS[0]);
  const [isGlobalTutorialOpen, setIsGlobalTutorialOpen] = useState(false);

  // Initialize IndexedDB and migrate any existing custom cards on startup
  useEffect(() => {
    initCustomCardStorage().then((customCards) => {
      if (customCards.length > 0) {
        setCardsList(prev => {
          const map = new Map<string, Card>();
          // Preserve freshly forged custom cards
          customCards.forEach(c => {
            if (c && c.id) map.set(c.id, c);
          });
          // Merge with previous list
          prev.forEach(c => {
            if (c && c.id && !map.has(c.id)) {
              map.set(c.id, c);
            }
          });
          // Ensure base cards exist
          CARDS_DATABASE.forEach(c => {
            if (c && c.id && !map.has(c.id)) {
              map.set(c.id, c);
            }
          });
          return Array.from(map.values());
        });
      }
    }).catch(err => {
      console.warn('[Storage] Notice during custom card initialization:', err);
    });
  }, []);

  // Sync default realm per tab if user hasn't locked a manual selection
  useEffect(() => {
    if (!isManualRealmSelected) {
      const defaultRealm = PAGE_REALM_PRESETS[activeTab] || 'Nexus';
      setActiveRealmId(defaultRealm);
    }
  }, [activeTab, isManualRealmSelected]);

  // Handle custom card creation & storage persistence
  const handleCardCreated = (newCard: Card) => {
    setCardsList(prev => {
      const filtered = prev.filter(c => c.id !== newCard.id);
      return [newCard, ...filtered];
    });
    // Authoritative unlimited persistence to IndexedDB with quota-safe localStorage mirroring
    saveCustomCard(newCard).catch(e => {
      console.warn('Notice saving custom card:', e);
    });
    setInspectedCard(newCard);
  };

  // Handle bulk cards import into local database
  const handleBulkImportCards = (newCards: Card[]) => {
    if (!newCards || newCards.length === 0) return;
    setCardsList(prev => {
      const newCardIds = new Set(newCards.map(c => c.id));
      const filtered = prev.filter(c => !newCardIds.has(c.id));
      return [...newCards, ...filtered];
    });
    // Atomic batch save to IndexedDB with quota-safe localStorage mirroring
    saveCustomCardsBatch(newCards).catch(e => {
      console.warn('Notice during bulk card import:', e);
    });
    setInspectedCard(newCards[0]);
  };

  // Launch battle with specific deck
  const handleSelectDeckForBattle = (deck: DeckPreset) => {
    setActiveBattleDeck(deck);
    setActiveTab('arena');
  };

  // Find card by name for inspection
  const handleInspectByName = (name: string) => {
    const found = cardsList.find(c => c.name.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      setInspectedCard(found);
    }
  };

  const handleSelectRealmTheme = (realmId: string) => {
    setActiveRealmId(realmId);
    setIsManualRealmSelected(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-black overflow-x-hidden w-full max-w-full relative">
      
      {/* ================= HIGH FIDELITY REALM BACKGROUND SUITE ================= */}
      <RealmBackgroundSuite
        realmId={activeRealmId}
        enableParticles={enableParticles}
        particleDensity={particleDensity}
        enableParallax={true}
      />

      {/* ================= TOP NAVIGATION BAR ================= */}
      <NexusTopNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRealmId={activeRealmId}
        onOpenAtlas={() => setIsAtlasOpen(true)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        totalCardsCount={cardsList.length}
      />

      {/* ================= MAIN CONTENT VIEW ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col min-w-0 relative z-10">
        {activeTab === 'art' && (
          <NexusArtArchitectureView
            onInspectCard={handleInspectByName}
            onLaunchArenaWithDeck={(domain) => {
              const matchingDeck = PRESET_DECKS.find(d => d.domain === domain) || PRESET_DECKS[0];
              handleSelectDeckForBattle(matchingDeck);
            }}
          />
        )}

        {activeTab === 'studio' && (
          <StudioAgentRegistryView />
        )}

        {activeTab === 'docs' && (
          <MasterDocumentationHub
            onInspectCard={handleInspectByName}
          />
        )}

        {activeTab === 'domains' && (
          <DomainCompendiumView
            cards={cardsList}
            onInspectCard={(card) => setInspectedCard(card)}
            onSelectDomainForArena={(domain) => {
              const matchingDeck = PRESET_DECKS.find(d => d.domain === domain) || PRESET_DECKS[0];
              handleSelectDeckForBattle(matchingDeck);
            }}
            onNavigateToForge={(domain) => {
              setActiveTab('forge');
            }}
          />
        )}

        {activeTab === 'grimoire' && (
          <DomainGrimoireView
            onInspectCard={handleInspectByName}
            onSelectDomainForArena={(domain) => {
              const matchingDeck = PRESET_DECKS.find(d => d.domain === domain) || PRESET_DECKS[0];
              handleSelectDeckForBattle(matchingDeck);
            }}
          />
        )}

        {activeTab === 'ladder' && (
          <NexusLadderView
            onInspectCard={(card) => setInspectedCard(card)}
            onSelectDeckForBattle={handleSelectDeckForBattle}
          />
        )}

        {activeTab === 'bible' && (
          <ColorIdentityBibleView
            onInspectCard={handleInspectByName}
          />
        )}

        {activeTab === 'arena' && (
          <BattleArena
            selectedDeckPreset={activeBattleDeck}
            onInspectCard={(card) => setInspectedCard(card)}
            onGoToVault={() => setActiveTab('booster')}
          />
        )}

        {activeTab === 'proto_arena' && (
          <PrototypingArena />
        )}

        {activeTab === 'siege' && (
          <TriForgeSiegeArena />
        )}

        {activeTab === 'campaign' && (
          <ChroniclesCampaignView
            onStartBattleWithDeck={handleSelectDeckForBattle}
            onInspectCard={handleInspectByName}
            onGoToVault={() => setActiveTab('booster')}
          />
        )}

        {activeTab === 'simulation' && (
          <SimulationEngine />
        )}

        {activeTab === 'codex' && (
          <CardCodex
            cards={cardsList}
            onInspectCard={(card) => setInspectedCard(card)}
            onBulkImportCards={handleBulkImportCards}
          />
        )}

        {activeTab === 'decks' && (
          <DeckBuilder
            onInspectCard={(card) => setInspectedCard(card)}
            onSelectDeckForBattle={handleSelectDeckForBattle}
          />
        )}

        {activeTab === 'booster' && (
          <PackOpener
            onInspectCard={(card) => setInspectedCard(card)}
            onNavigateToArena={() => setActiveTab('arena')}
          />
        )}

        {activeTab === 'forge' && (
          <CardForge
            onCardCreated={handleCardCreated}
            onInspectCard={(card) => setInspectedCard(card)}
            onNavigateToCompendium={(domain) => {
              setActiveTab('domains');
            }}
            onLaunchArena={(card) => {
              setActiveBattleDeck(PRESET_DECKS[0]);
              setActiveTab('arena');
            }}
          />
        )}

        {activeTab === 'rules' && (
          <RulesAdjudicatorView
            onInspectCard={handleInspectByName}
          />
        )}

        {activeTab === 'set001' && (
          <Set001CuratorView
            onInspectCard={(card) => setInspectedCard(card)}
            onStartMatchWithSealedDeck={(deck) => {
              handleSelectDeckForBattle(deck);
            }}
          />
        )}

        {activeTab === 'gauntlet' && (
          <ArchetypeGauntletLab
            onInspectCard={handleInspectByName}
          />
        )}

        {activeTab === 'frames' && (
          <CardFrameCustomizer
            onInspectCard={handleInspectByName}
          />
        )}

        {activeTab === 'missions' && (
          <DailyMissionsView
            onNavigateToArena={() => setActiveTab('arena')}
            onNavigateToForge={() => setActiveTab('forge')}
            onNavigateToBooster={() => setActiveTab('booster')}
            onNavigateToCodex={() => setActiveTab('codex')}
            onNavigateToDecks={() => setActiveTab('decks')}
          />
        )}

        {activeTab === 'audio' && (
          <AudioSanctumView />
        )}
      </main>

      {/* ================= REALM ATMOSPHERE CONTROLLER BAR ================= */}
      <RealmAtmosphereBar
        activeRealmId={activeRealmId}
        onSelectRealm={handleSelectRealmTheme}
        onOpenAtlas={() => setIsAtlasOpen(true)}
        enableParticles={enableParticles}
        onToggleParticles={() => setEnableParticles(prev => !prev)}
        particleDensity={particleDensity}
        onChangeParticleDensity={setParticleDensity}
      />

      {/* ================= INTERACTIVE REALM ATLAS MODAL ================= */}
      <RealmAtlasModal
        isOpen={isAtlasOpen}
        onClose={() => setIsAtlasOpen(false)}
        activeRealmId={activeRealmId}
        onSelectRealm={handleSelectRealmTheme}
        onNavigateTab={setActiveTab}
      />

      {/* ================= GLOBAL COMMAND PALETTE SEARCH (⌘K) ================= */}
      <NexusCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectCard={(card) => setInspectedCard(card)}
        onSelectTab={setActiveTab}
        onSelectRealmTheme={handleSelectRealmTheme}
        allCards={cardsList}
      />

      {/* ================= GLOBAL RULES & TUTORIAL MODAL ================= */}
      <NexusTutorialModal
        isOpen={isGlobalTutorialOpen}
        onClose={() => setIsGlobalTutorialOpen(false)}
      />

      {/* ================= FULL SCREEN CARD INSPECTOR MODAL ================= */}
      <CardModal
        card={inspectedCard}
        onClose={() => setInspectedCard(null)}
      />

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-stone-900 bg-stone-950/95 relative z-10 py-4 px-6 text-center text-xs text-stone-300 font-cinzel">
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-stone-400">
          <span>Sanctuary Realm ☀️</span>
          <span>Tempest Skyfleet ⚡</span>
          <span>Radiance Volcano 🔥</span>
          <span>Abyssal Void 💀</span>
          <span>Verdance Eldervale 🌿</span>
        </div>
        <p className="text-[10px] text-stone-400 mt-2">
          Realm of Nexus TCG • AAA Architectural Suite & 31-Stage Tactical Engine
        </p>
      </footer>
    </div>
  );
}
