import React, { useState } from 'react';
import { Card, Domain, CardType, Rarity } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Upload, 
  Check, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  X, 
  Copy, 
  ArrowRight,
  HelpCircle,
  Layers,
  Database
} from 'lucide-react';

interface CodexBulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportCards: (cards: Card[]) => void;
  existingCardsCount: number;
}

const SAMPLE_IMPORT_TEMPLATE: Partial<Card>[] = [
  {
    name: "Solaris, Hand of the Dawn",
    subtitle: "CHAMPION (SOLAR PARAGON), LEGENDARY",
    domain: "Sanctuary" as Domain,
    cardType: "Champion" as CardType,
    subtype: "Solar Paragon / Templar",
    rarity: "Legendary" as Rarity,
    cost: 5,
    power: 7,
    defense: 6,
    divineRank: 4,
    attunementRequired: true,
    quote: '"Where the sun rises, darkness is burned away by righteous fervor."',
    lore: "High Arbiter of the Sun Spire who channels celestial dawn to protect allied lanes and purge void curses.",
    abilities: [
      {
        id: "ab-solaris-1",
        name: "Dawnstrike Cleave",
        type: "Action",
        iconType: "sword",
        description: "Deals 4d6 radiant damage to target opposing vanguard. Grants +2 Armor to adjacent lanes.",
        damageDice: "4d6 Radiant",
        charges: "1/Turn"
      },
      {
        id: "ab-solaris-2",
        name: "Solar Aegis",
        type: "Passive",
        iconType: "shield",
        description: "Absorbs the first 3 incoming spell or ability damage each round.",
        charges: "Passive"
      }
    ],
    powerGlyphs: [
      {
        id: "glyph-solar-flares",
        name: "Solar Flares",
        icon: "Flame",
        shortTag: "SOLAR FLARE",
        ruleClause: "When dealing damage, burn target for 1 extra damage each subsequent round for 2 rounds.",
        category: "elemental"
      }
    ],
    attributes: {
      damage: 8.5,
      durability: 7.5,
      mobility: 6.0,
      utility: 7.0,
      control: 8.0
    }
  },
  {
    name: "Singularity Chrono-Blade",
    subtitle: "WEAPON (TEMPORAL RELIC), VERY RARE",
    domain: "Arcane" as Domain,
    cardType: "Weapon" as CardType,
    subtype: "Temporal Edge / Void Focus",
    rarity: "Very Rare" as Rarity,
    cost: 4,
    power: 6,
    defense: 4,
    divineRank: 3,
    attunementRequired: true,
    quote: '"A single stroke tears the fabric of sequential time."',
    lore: "Crafted in the Astral Rift where time loops perpetually. Wielded by Chronomancers of the Indigo Council.",
    abilities: [
      {
        id: "ab-chrono-1",
        name: "Phase Strike",
        type: "Action",
        iconType: "zap",
        description: "Attacks target bypassing all Armor and Shields. Resets target's turn counter.",
        damageDice: "3d6 Astral",
        charges: "1/Turn"
      }
    ],
    attributes: {
      damage: 7.5,
      durability: 5.0,
      mobility: 9.0,
      utility: 8.0,
      control: 7.0
    }
  }
];

export const CodexBulkImportModal: React.FC<CodexBulkImportModalProps> = ({
  isOpen,
  onClose,
  onImportCards,
  existingCardsCount
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedCards, setParsedCards] = useState<Card[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [parseWarnings, setParseWarnings] = useState<string[]>([]);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  if (!isOpen) return null;

  // Sanitize card input and ensure all required Nexus Card fields are present
  const sanitizeCard = (raw: any, index: number): Card => {
    const fallbackId = `CUSTOM-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`;
    const validDomain: Domain = ['Sanctuary', 'Radiance', 'Verdance', 'Arcane', 'Abyss'].includes(raw.domain)
      ? raw.domain
      : 'Radiance';
    
    const validCardType: CardType = [
      'Champion', 'Character', 'Spell', 'Artifact', 'Relic', 'Weapon', 'Armor', 'Beast', 'Environment', 'Minion', 'Ritual', 'Encounter'
    ].includes(raw.cardType)
      ? raw.cardType
      : 'Champion';

    const validRarity: Rarity = [
      'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Mythic', 'Divine Boundless'
    ].includes(raw.rarity)
      ? raw.rarity
      : 'Rare';

    const cost = typeof raw.cost === 'number' && !isNaN(raw.cost) ? Math.max(0, Math.min(10, raw.cost)) : 4;
    const power = typeof raw.power === 'number' && !isNaN(raw.power) ? Math.max(0, raw.power) : 5;
    const defense = typeof raw.defense === 'number' && !isNaN(raw.defense) ? Math.max(1, raw.defense) : 5;

    const domainThemes: Record<Domain, any> = {
      Sanctuary: { theme: 'parchment-gold', primaryColor: '#eab308', glowColor: '#ca8a04', symbol: '🛡️' },
      Radiance: { theme: 'volcanic-dark', primaryColor: '#ef4444', glowColor: '#b91c1c', symbol: '🔥' },
      Verdance: { theme: 'verdant-emerald', primaryColor: '#10b981', glowColor: '#047857', symbol: '🌿' },
      Arcane: { theme: 'astral-sapphire', primaryColor: '#3b82f6', glowColor: '#1d4ed8', symbol: '🔮' },
      Abyss: { theme: 'abyss-crimson', primaryColor: '#a855f7', glowColor: '#6b21a8', symbol: '💀' },
      Tempest: { theme: 'astral-sapphire', primaryColor: '#0ea5e9', glowColor: '#0284c7', symbol: '⚡' }
    };

    const domainInfo = domainThemes[validDomain];

    return {
      id: raw.id ? String(raw.id) : fallbackId,
      name: raw.name ? String(raw.name) : `Imported Artifact #${index + 1}`,
      subtitle: raw.subtitle ? String(raw.subtitle) : `${validCardType.toUpperCase()} (${validDomain.toUpperCase()}), ${validRarity.toUpperCase()}`,
      alias: raw.alias ? String(raw.alias) : undefined,
      domain: validDomain,
      cardType: validCardType,
      subtype: raw.subtype ? String(raw.subtype) : `${validDomain} / ${validCardType}`,
      rarity: validRarity,
      cost,
      power,
      defense,
      divineRank: typeof raw.divineRank === 'number' ? raw.divineRank : 3,
      laneRole: raw.laneRole || 'Universal',
      attunementRequired: raw.attunementRequired !== false,
      quote: raw.quote ? String(raw.quote) : '"Imported from local archive into the Aetheria Codex."',
      lore: raw.lore ? String(raw.lore) : `Registered in the permanent custom archives under the ${validDomain} domain.`,
      artUrl: raw.artUrl || undefined,
      aestheticTheme: raw.aestheticTheme || domainInfo.theme,
      artVisualTheme: raw.artVisualTheme || {
        primaryColor: domainInfo.primaryColor,
        glowColor: domainInfo.glowColor,
        bgGradient: 'from-stone-950 via-neutral-900 to-black',
        iconSymbol: domainInfo.symbol,
        badgeText: `CUSTOM ${validCardType.toUpperCase()}`
      },
      abilities: Array.isArray(raw.abilities)
        ? raw.abilities.map((ab: any, aIdx: number) => ({
            id: ab.id || `ab-imp-${index}-${aIdx}`,
            name: ab.name || `Ability #${aIdx + 1}`,
            type: ab.type || 'Action',
            iconType: ab.iconType || 'zap',
            description: ab.description || 'Channels domain energy onto the active combat lane.',
            damageDice: ab.damageDice || undefined,
            charges: ab.charges || '1/Turn'
          }))
        : [
            {
              id: `ab-imp-${index}-0`,
              name: `${validDomain} Pulse`,
              type: 'Action',
              iconType: 'zap',
              description: `Channels ${validDomain} power dealing 3d6 damage or granting tactical defense.`,
              damageDice: '3d6 DMG',
              charges: '1/Turn'
            }
          ],
      powerGlyphs: Array.isArray(raw.powerGlyphs)
        ? raw.powerGlyphs.map((g: any) => ({
            name: g.name || 'Domain Attunement',
            shortTag: g.shortTag || `${validDomain.toUpperCase()} GLYPH`,
            ruleClause: g.ruleClause || 'Active in lane clashes.',
            category: g.category || 'tactical'
          }))
        : [],
      attributes: raw.attributes || {
        damage: Math.min(10, power * 0.9),
        durability: Math.min(10, defense * 0.85),
        mobility: 6.5,
        utility: 6.5,
        control: 6.5
      },
      powerAttributes: raw.powerAttributes || {
        strength: 7.0,
        speed: 6.5,
        durability: 7.0,
        energyOutput: 7.5,
        fightingSkill: 7.0,
        intelligence: 7.0,
        control: 7.0
      }
    };
  };

  const handleInputChange = (text: string) => {
    setJsonInput(text);
    if (!text.trim()) {
      setParsedCards([]);
      setParseErrors([]);
      setParseWarnings([]);
      return;
    }

    try {
      let rawParsed: any;
      try {
        rawParsed = JSON.parse(text.trim());
      } catch (e: any) {
        // Handle common loose paste cases (e.g. wrapped in markdown code fence)
        let cleaned = text.trim();
        if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
        rawParsed = JSON.parse(cleaned);
      }

      const warnings: string[] = [];
      let cardArray: any[] = [];

      if (Array.isArray(rawParsed)) {
        cardArray = rawParsed;
      } else if (rawParsed && typeof rawParsed === 'object') {
        if (Array.isArray(rawParsed.cards)) {
          cardArray = rawParsed.cards;
        } else if (rawParsed.name) {
          // Single card object
          cardArray = [rawParsed];
          warnings.push('Single card detected. Wrapped into an import array of 1.');
        } else {
          throw new Error('JSON is an object, but neither an array nor a recognized card definition.');
        }
      } else {
        throw new Error('JSON root must be an array of card objects or a single card object.');
      }

      if (cardArray.length === 0) {
        throw new Error('Array contains 0 items.');
      }

      const sanitizedList: Card[] = [];
      cardArray.forEach((item, idx) => {
        if (!item || typeof item !== 'object') {
          warnings.push(`Item at index ${idx} is not an object; skipped.`);
          return;
        }
        if (!item.name) {
          warnings.push(`Item at index ${idx} is missing a 'name'. Assigned default name.`);
        }
        sanitizedList.push(sanitizeCard(item, idx));
      });

      setParsedCards(sanitizedList);
      setParseErrors([]);
      setParseWarnings(warnings);
      soundEngine.playMicroSound('select');
    } catch (err: any) {
      setParsedCards([]);
      setParseErrors([err.message || 'Invalid JSON syntax. Please check brackets, commas, and quotes.']);
      setParseWarnings([]);
    }
  };

  const handleLoadSampleTemplate = () => {
    soundEngine.playMicroSound('click');
    const formatted = JSON.stringify(SAMPLE_IMPORT_TEMPLATE, null, 2);
    handleInputChange(formatted);
  };

  const handleCopyTemplate = () => {
    soundEngine.playMicroSound('click');
    navigator.clipboard.writeText(JSON.stringify(SAMPLE_IMPORT_TEMPLATE, null, 2));
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleConfirmImport = () => {
    if (parsedCards.length === 0) return;
    soundEngine.playCombatClash('victory');
    onImportCards(parsedCards);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Database size={22} />
            </div>
            <div>
              <h3 className="text-lg font-cinzel font-bold text-amber-100 flex items-center gap-2">
                <span>Codex Bulk Card Importer</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-sans font-bold">
                  JSON Batch Protocol
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Paste a JSON array of custom cards to instantly expand your local database.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Controls & Sample Template Bar */}
        <div className="px-6 py-3 border-b border-stone-800 bg-stone-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSampleTemplate}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-cinzel font-bold flex items-center gap-1.5 transition"
            >
              <Sparkles size={13} />
              <span>Load Sample Template</span>
            </button>
            <button
              onClick={handleCopyTemplate}
              className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 font-cinzel flex items-center gap-1.5 transition"
            >
              <Copy size={13} />
              <span>{copiedTemplate ? 'Copied Template!' : 'Copy Blank Template'}</span>
            </button>
          </div>

          <div className="text-stone-400 font-mono text-[11px]">
            Database currently houses <strong className="text-amber-300">{existingCardsCount}</strong> cards
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* JSON Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-cinzel font-bold text-stone-300 flex items-center justify-between">
              <span>Paste JSON Card Definition Array:</span>
              <span className="text-[10px] font-mono text-stone-500">Supported: Card[], {'{ cards: Card[] }'}, or single Card</span>
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={`[\n  {\n    "name": "Astral Sovereign",\n    "domain": "Arcane",\n    "cardType": "Champion",\n    "rarity": "Legendary",\n    "cost": 6,\n    "power": 8,\n    "defense": 7,\n    "abilities": [...]\n  }\n]`}
              rows={8}
              className="w-full p-3 rounded-2xl bg-stone-900 border border-stone-800 focus:border-amber-500/60 font-mono text-xs text-amber-100 placeholder-stone-600 focus:outline-none transition leading-relaxed resize-y"
            />
          </div>

          {/* Validation & Error Notices */}
          {parseErrors.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold font-cinzel">JSON Parsing Error</span>
                <ul className="list-disc list-inside text-[11px] text-red-300 space-y-0.5">
                  {parseErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {parseWarnings.length > 0 && (
            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
              <Sparkles size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold font-cinzel text-[11px]">Auto-Recovery Warnings:</span>
                <ul className="list-disc list-inside text-[10.5px] text-amber-300/80">
                  {parseWarnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Parsed Cards Preview List */}
          {parsedCards.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-xs font-cinzel font-bold text-amber-200 flex items-center gap-2">
                  <Check size={14} className="text-green-400" />
                  <span>Valid Cards Ready to Import ({parsedCards.length})</span>
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  Click 'Import & Save' below to commit to local database
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {parsedCards.map((card, idx) => {
                  const domainColors: Record<Domain, string> = {
                    Sanctuary: 'border-yellow-500/40 text-yellow-300 bg-yellow-950/20',
                    Radiance: 'border-red-500/40 text-red-300 bg-red-950/20',
                    Verdance: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20',
                    Arcane: 'border-blue-500/40 text-blue-300 bg-blue-950/20',
                    Abyss: 'border-purple-500/40 text-purple-300 bg-purple-950/20',
                    Tempest: 'border-sky-500/40 text-sky-300 bg-sky-950/20'
                  };

                  return (
                    <div
                      key={card.id || idx}
                      className={`p-3 rounded-2xl bg-stone-900/80 border ${domainColors[card.domain] || 'border-stone-800'} flex flex-col justify-between space-y-2`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-cinzel font-bold text-stone-100 truncate">
                            {card.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800">
                            {card.cost}⚡
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mt-1">
                          <span className="px-1.5 py-0.5 rounded bg-stone-950">{card.domain}</span>
                          <span>{card.cardType}</span>
                          <span>•</span>
                          <span>{card.rarity}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-stone-800/60 text-stone-300">
                        <span>⚔️ {card.power} ATK / 🛡️ {card.defense} DEF</span>
                        <span className="text-[10px] text-stone-400">{(card.abilities || []).length} Skills</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-900/95 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-cinzel transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmImport}
            disabled={parsedCards.length === 0}
            className={`px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition ${
              parsedCards.length > 0
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20 hover:scale-105'
                : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
            }`}
          >
            <Upload size={14} />
            <span>Import & Save {parsedCards.length > 0 ? `(${parsedCards.length}) Cards` : ''}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
