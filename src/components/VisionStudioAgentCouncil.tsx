import React, { useState } from 'react';
import { Domain, CardType, Rarity, AbilityProperty } from '../types';
import { soundEngine } from '../utils/audioEngine';
import { 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Swords, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  ChevronRight, 
  Scale, 
  Award,
  Flame,
  Info,
  Sliders
} from 'lucide-react';

export interface CouncilRecommendation {
  domain: Domain;
  domainConfidence: number;
  domainRationale: string;
  cardType: CardType;
  subtype: string;
  rarity: Rarity;
  cost: number;
  power: number;
  defense: number;
  divineRank: number;
  laneRole: string;
  cardName: string;
  cardSubtitle: string;
  quote: string;
  lore: string;
  abilities: AbilityProperty[];
  glyphIds: string[];
  attributes: {
    damage: number;
    durability: number;
    mobility: number;
    utility: number;
    control: number;
  };
  safetyRating: string;
  safetyComments: string;
}

interface VisionStudioAgentCouncilProps {
  imagePreviewUrl?: string;
  currentCardName: string;
  currentDomain: Domain;
  onApplyRecommendation: (rec: Partial<CouncilRecommendation>) => void;
  isAnalyzing: boolean;
  onRunCouncilDeliberation: () => void;
}

export const VisionStudioAgentCouncil: React.FC<VisionStudioAgentCouncilProps> = ({
  imagePreviewUrl,
  currentCardName,
  currentDomain,
  onApplyRecommendation,
  isAnalyzing,
  onRunCouncilDeliberation
}) => {
  const [activeAgentTab, setActiveAgentTab] = useState<'GLO-06' | 'GLO-05' | 'GLO-04' | 'GLO-14' | 'VAL-02'>('GLO-06');
  const [appliedAgents, setAppliedAgents] = useState<string[]>([]);

  // Agent team specification
  const AGENTS = [
    {
      id: 'GLO-06',
      name: 'Domain Archetype Arbiter',
      role: 'Chromatic & Elemental Spectrum Analysis',
      icon: '🏛️',
      color: 'border-amber-500 text-amber-300',
      description: 'Scans image color histograms, luminescence, and environmental aura to determine elemental allegiance.'
    },
    {
      id: 'GLO-05',
      name: 'Combat Balance & Stat Architect',
      role: 'Essence Cost & Numerical Scaler',
      icon: '⚔️',
      color: 'border-red-500 text-red-300',
      description: 'Calculates physical mass, weapon lethality, armor plate density, and tactical lane parameters.'
    },
    {
      id: 'GLO-04',
      name: 'Ability & Tactical Synthesizer',
      role: 'Combat Actions & Power Glyphs',
      icon: '🔮',
      color: 'border-blue-500 text-blue-300',
      description: 'Generates cohesive combat triggers, damage dice formulas, cooldowns, and signature Power Glyphs.'
    },
    {
      id: 'GLO-14',
      name: 'Lorekeeper & Canon Scribe',
      role: 'High-Fantasy Lore & Quote Stylist',
      icon: '📜',
      color: 'border-emerald-500 text-emerald-300',
      description: 'Authors immersive in-world titles, attunement subtitles, flavor quotes, and mythic chronicles.'
    },
    {
      id: 'VAL-02',
      name: 'Tournament Safety Arbiter',
      role: 'Exploit Prevention & Rule Compliance',
      icon: '🛡️',
      color: 'border-purple-500 text-purple-300',
      description: 'Verifies no infinite loop edge-cases exist and validates competitive balance.'
    }
  ];

  // Helper to get domain-informed recommendations
  const getSimulatedFindings = (domain: Domain): Record<string, any> => {
    switch (domain) {
      case 'Sanctuary':
        return {
          domainRec: {
            domain: 'Sanctuary' as Domain,
            confidence: 96,
            rationale: 'High solar luminescence detected in image foreground. Golden halos, sacred heraldry, and protective aegis motifs indicate pure Sanctuary devotion.'
          },
          statRec: {
            cardType: 'Champion' as CardType,
            subtype: 'Solar Paragon / Templar',
            rarity: 'Legendary' as Rarity,
            cost: 5,
            power: 6,
            defense: 8,
            divineRank: 4,
            laneRole: 'Vanguard',
            attributes: { damage: 7.0, durability: 9.0, mobility: 5.5, utility: 8.0, control: 7.5 }
          },
          abilityRec: {
            abilities: [
              {
                id: `ab-council-sanct-1`,
                name: 'Solar Bastion',
                type: 'Action',
                iconType: 'shield',
                description: 'Grants +3 Ward to this lane and deals 3d6 radiant retribution to attacking enemies.',
                damageDice: '3d6 Radiant',
                charges: '1/Turn'
              },
              {
                id: `ab-council-sanct-2`,
                name: 'Aegis of the Ophanim',
                type: 'Passive',
                iconType: 'sun',
                description: 'Commanders adjacent to this card take 2 less damage from spells.',
                charges: 'Passive'
              }
            ],
            glyphIds: ['glyph-divine-ward', 'glyph-aegis-shield']
          },
          loreRec: {
            cardName: 'Ophanim High Sentinel',
            cardSubtitle: 'CHAMPION (SOLAR ARBITER), LEGENDARY',
            quote: '"None shall trespass upon the sanctuary while the dawn flame burns."',
            lore: 'Anointed in the high towers of Aetheria. Wields holy irradiance that purges dark matter and shields mortal guardians.'
          },
          safetyRec: {
            rating: 'Tournament Approved (Tier A)',
            comments: 'High durability offset by modest mobility. Ward numbers adhere strictly to Section 4.2 of Rules Bible.'
          }
        };
      case 'Verdance':
        return {
          domainRec: {
            domain: 'Verdance' as Domain,
            confidence: 94,
            rationale: 'Dominant organic emerald hues and biomorphic root structures indicate ancient primeval Verdance alignment.'
          },
          statRec: {
            cardType: 'Beast' as CardType,
            subtype: 'Primal Colossus / Spore Titan',
            rarity: 'Very Rare' as Rarity,
            cost: 6,
            power: 7,
            defense: 9,
            divineRank: 3,
            laneRole: 'Vanguard',
            attributes: { damage: 7.5, durability: 9.0, mobility: 5.0, utility: 7.0, control: 6.5 }
          },
          abilityRec: {
            abilities: [
              {
                id: `ab-council-verd-1`,
                name: 'Primeval Regeneration',
                type: 'Passive',
                iconType: 'heart',
                description: 'At the start of your turn, heals 2 health to this unit and adjacent allies.',
                charges: 'Passive'
              },
              {
                id: `ab-council-verd-2`,
                name: 'Entangling Vines',
                type: 'Action',
                iconType: 'shield',
                description: 'Immobilizes opposing vanguard unit, preventing attacks for 1 round.',
                charges: '1/Turn'
              }
            ],
            glyphIds: ['glyph-verdant-growth', 'glyph-spore-swarm']
          },
          loreRec: {
            cardName: 'Eldervale Root Colossus',
            cardSubtitle: 'BEAST (PRIMAL TITAN), VERY RARE',
            quote: '"The forest remembers every wound, and heals stronger than steel."',
            lore: 'Awakened from subterranean slumber in the Eldervale Basin when the planar roots were disturbed.'
          },
          safetyRec: {
            rating: 'Tournament Approved (Tier S)',
            comments: 'Regeneration capped at 2 HP/round avoids stalemates. Lane immobilization requires active Essence upkeep.'
          }
        };
      case 'Arcane':
        return {
          domainRec: {
            domain: 'Arcane' as Domain,
            confidence: 97,
            rationale: 'Deep sapphire energy trails, celestial geometry, and chronomantic distortion confirm astral Arcane alignment.'
          },
          statRec: {
            cardType: 'Spell' as CardType,
            subtype: 'Chrono Rift / Astral Arcana',
            rarity: 'Legendary' as Rarity,
            cost: 5,
            power: 8,
            defense: 5,
            divineRank: 4,
            laneRole: 'Backline',
            attributes: { damage: 8.5, durability: 5.0, mobility: 9.0, utility: 9.0, control: 8.5 }
          },
          abilityRec: {
            abilities: [
              {
                id: `ab-council-arc-1`,
                name: 'Temporal Stasis Rift',
                type: 'Action',
                iconType: 'zap',
                description: 'Deals 4d6 astral damage and freezes target lane timer for 1 round.',
                damageDice: '4d6 Astral',
                charges: '1/Turn'
              }
            ],
            glyphIds: ['glyph-chrono-stasis', 'glyph-astral-rift']
          },
          loreRec: {
            cardName: 'Chrono-Singularity Matrix',
            cardSubtitle: 'SPELL (TEMPORAL ASTRAL), LEGENDARY',
            quote: '"Time is not a straight arrow; in the hands of the wise, it is a bow."',
            lore: 'Recovered from the shattered Observatory of Chronos. Bends local causality to undo enemy actions.'
          },
          safetyRec: {
            rating: 'Tournament Approved (Tier A+)',
            comments: 'Stasis effect cannot be chained consecutively on the same unit.'
          }
        };
      case 'Abyss':
        return {
          domainRec: {
            domain: 'Abyss' as Domain,
            confidence: 95,
            rationale: 'Void blacks, necrotic violet mist, and soul-draining iconography identify Abyssal lineage.'
          },
          statRec: {
            cardType: 'Champion' as CardType,
            subtype: 'Void Sovereign / Netherfiend',
            rarity: 'Mythic' as Rarity,
            cost: 7,
            power: 9,
            defense: 6,
            divineRank: 5,
            laneRole: 'Flank',
            attributes: { damage: 9.5, durability: 6.0, mobility: 8.0, utility: 7.5, control: 8.0 }
          },
          abilityRec: {
            abilities: [
              {
                id: `ab-council-abyss-1`,
                name: 'Soul Siphon Torrent',
                type: 'Action',
                iconType: 'skull',
                description: 'Deals 5d6 necrotic damage; heals commander for 50% of damage dealt.',
                damageDice: '5d6 Necrotic',
                charges: '1/Turn'
              }
            ],
            glyphIds: ['glyph-soul-siphon', 'glyph-decay-curse']
          },
          loreRec: {
            cardName: 'Malakar, Void Desolator',
            cardSubtitle: 'CHAMPION (NETHER LORD), MYTHIC',
            quote: '"All stars fade into the dark abyss. We simply accelerate their end."',
            lore: 'Lord of the seventh circle of the Void. Consumes essence from defeated vanguard defenders.'
          },
          safetyRec: {
            rating: 'Tournament Approved (Tier S)',
            comments: 'High offensive potential balanced by high Essence cost (7) and fragile defense (6).'
          }
        };
      default: // Radiance
        return {
          domainRec: {
            domain: 'Radiance' as Domain,
            confidence: 98,
            rationale: 'Fiery magma glows, thermal radiance, and jagged obsidian silhouettes indicate intense Radiance elemental energy.'
          },
          statRec: {
            cardType: 'Weapon' as CardType,
            subtype: 'Greatsword / Magma Edge',
            rarity: 'Legendary' as Rarity,
            cost: 6,
            power: 8,
            defense: 5,
            divineRank: 4,
            laneRole: 'Universal',
            attributes: { damage: 9.0, durability: 6.5, mobility: 7.0, utility: 6.0, control: 7.0 }
          },
          abilityRec: {
            abilities: [
              {
                id: `ab-council-rad-1`,
                name: 'Molten Cleave',
                type: 'Action',
                iconType: 'flame',
                description: 'Strikes target enemy for 4d6 fire damage and inflicts Scorch (1 bonus DMG for 2 turns).',
                damageDice: '4d6 Fire',
                charges: '1/Turn'
              }
            ],
            glyphIds: ['glyph-lava-control', 'glyph-molten-burst']
          },
          loreRec: {
            cardName: 'Blade of the Obsidian Eclipse',
            cardSubtitle: 'WEAPON (GREATSWORD), LEGENDARY',
            quote: '"Forged when two suns clashed, it consumes starlight to ignite world-ending flame."',
            lore: 'Discovered in the abyssal crater of Sol-Thar. The edge continually radiates heat exceeding the core of a star.'
          },
          safetyRec: {
            rating: 'Tournament Approved (Tier A)',
            comments: 'Balanced damage curves compliant with High-Rank Weapon archetype.'
          }
        };
    }
  };

  const findings = getSimulatedFindings(currentDomain);

  // Apply single agent finding
  const handleApplyAgent = (agentId: string) => {
    soundEngine.playMicroSound('select');
    setAppliedAgents(prev => [...new Set([...prev, agentId])]);

    switch (agentId) {
      case 'GLO-06':
        onApplyRecommendation({
          domain: findings.domainRec.domain,
          domainConfidence: findings.domainRec.confidence,
          domainRationale: findings.domainRec.rationale
        });
        break;
      case 'GLO-05':
        onApplyRecommendation({
          cardType: findings.statRec.cardType,
          subtype: findings.statRec.subtype,
          rarity: findings.statRec.rarity,
          cost: findings.statRec.cost,
          power: findings.statRec.power,
          defense: findings.statRec.defense,
          divineRank: findings.statRec.divineRank,
          laneRole: findings.statRec.laneRole,
          attributes: findings.statRec.attributes
        });
        break;
      case 'GLO-04':
        onApplyRecommendation({
          abilities: findings.abilityRec.abilities,
          glyphIds: findings.abilityRec.glyphIds
        });
        break;
      case 'GLO-14':
        onApplyRecommendation({
          cardName: findings.loreRec.cardName,
          cardSubtitle: findings.loreRec.cardSubtitle,
          quote: findings.loreRec.quote,
          lore: findings.loreRec.lore
        });
        break;
      case 'VAL-02':
        onApplyRecommendation({
          safetyRating: findings.safetyRec.rating,
          safetyComments: findings.safetyRec.comments
        });
        break;
    }
  };

  // Apply all consensus recommendations at once
  const handleApplyFullConsensus = () => {
    soundEngine.playCombatClash('victory');
    setAppliedAgents(['GLO-06', 'GLO-05', 'GLO-04', 'GLO-14', 'VAL-02']);
    onApplyRecommendation({
      domain: findings.domainRec.domain,
      domainConfidence: findings.domainRec.confidence,
      domainRationale: findings.domainRec.rationale,
      cardType: findings.statRec.cardType,
      subtype: findings.statRec.subtype,
      rarity: findings.statRec.rarity,
      cost: findings.statRec.cost,
      power: findings.statRec.power,
      defense: findings.statRec.defense,
      divineRank: findings.statRec.divineRank,
      laneRole: findings.statRec.laneRole,
      attributes: findings.statRec.attributes,
      abilities: findings.abilityRec.abilities,
      glyphIds: findings.abilityRec.glyphIds,
      cardName: findings.loreRec.cardName,
      cardSubtitle: findings.loreRec.cardSubtitle,
      quote: findings.loreRec.quote,
      lore: findings.loreRec.lore,
      safetyRating: findings.safetyRec.rating,
      safetyComments: findings.safetyRec.comments
    });
  };

  return (
    <div className="p-5 rounded-3xl bg-stone-900/90 border border-amber-500/40 shadow-2xl space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Cpu size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-cinzel font-bold text-sm text-amber-100">
                Multi-Agent Analysis Council
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold">
                5 SPECIALIST AGENTS
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Specialist agents evaluate uploaded artwork to deduce Domain, Stats, Abilities, Lore, and Tournament Safety.
            </p>
          </div>
        </div>

        {/* Re-analyze / Apply All Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRunCouncilDeliberation}
            disabled={isAnalyzing}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-cinzel flex items-center gap-1.5 transition"
          >
            <RefreshCw size={13} className={isAnalyzing ? 'animate-spin text-amber-400' : 'text-stone-400'} />
            <span>{isAnalyzing ? 'Council Deliberating…' : 'Re-Run Council'}</span>
          </button>

          <button
            onClick={handleApplyFullConsensus}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-cinzel font-bold shadow-md flex items-center gap-1.5 transition hover:scale-105"
          >
            <Sparkles size={13} />
            <span>Apply Council Consensus</span>
          </button>
        </div>
      </div>

      {/* Agent Badges Roster */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {AGENTS.map((agent) => {
          const isSelected = activeAgentTab === agent.id;
          const isApplied = appliedAgents.includes(agent.id);

          return (
            <button
              key={agent.id}
              onClick={() => {
                soundEngine.playMicroSound('click');
                setActiveAgentTab(agent.id as any);
              }}
              className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-1.5 ${
                isSelected
                  ? 'bg-amber-950/40 border-amber-500/60 shadow-lg'
                  : 'bg-stone-950/70 border-stone-800/80 hover:bg-stone-800/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{agent.icon}</span>
                <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                  {agent.id}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-cinzel font-bold text-stone-200 block truncate">
                  {agent.name}
                </span>
                <span className="text-[9.5px] text-stone-400 block truncate">
                  {agent.role}
                </span>
              </div>
              <div className="pt-1 flex items-center justify-between text-[10px]">
                <span className={isApplied ? 'text-green-400 font-bold flex items-center gap-0.5' : 'text-stone-500'}>
                  {isApplied ? '✓ Applied' : 'Ready'}
                </span>
                <ChevronRight size={12} className="text-stone-500" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Agent Finding Detail Card */}
      <div className="p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3 animate-fade-in">
        {activeAgentTab === 'GLO-06' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏛️</span>
                <div>
                  <h5 className="text-xs font-cinzel font-bold text-amber-200">
                    Agent GLO-06: Domain Archetype Arbiter
                  </h5>
                  <span className="text-[10.5px] text-stone-400">
                    Recommended Domain: <strong className="text-amber-300">{findings.domainRec.domain}</strong> ({findings.domainRec.confidence}% Confidence)
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleApplyAgent('GLO-06')}
                className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-cinzel font-bold transition"
              >
                {appliedAgents.includes('GLO-06') ? '✓ Domain Applied' : 'Apply Domain'}
              </button>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
              "{findings.domainRec.rationale}"
            </p>
          </div>
        )}

        {activeAgentTab === 'GLO-05' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚔️</span>
                <div>
                  <h5 className="text-xs font-cinzel font-bold text-amber-200">
                    Agent GLO-05: Combat Balance & Stat Architect
                  </h5>
                  <span className="text-[10.5px] text-stone-400">
                    Card Type: <strong className="text-stone-200">{findings.statRec.cardType}</strong> • Role: <strong className="text-stone-200">{findings.statRec.laneRole}</strong>
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleApplyAgent('GLO-05')}
                className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-cinzel font-bold transition"
              >
                {appliedAgents.includes('GLO-05') ? '✓ Stats Applied' : 'Apply Stats & Role'}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block font-cinzel">Cost</span>
                <strong className="text-amber-400 text-sm font-mono">{findings.statRec.cost}⚡</strong>
              </div>
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block font-cinzel">Power (ATK)</span>
                <strong className="text-red-400 text-sm font-mono">{findings.statRec.power} ⚔️</strong>
              </div>
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block font-cinzel">Defense (HP)</span>
                <strong className="text-blue-400 text-sm font-mono">{findings.statRec.defense} 🛡️</strong>
              </div>
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block font-cinzel">Divine Rank</span>
                <strong className="text-purple-400 text-sm font-mono">{findings.statRec.divineRank} ★</strong>
              </div>
            </div>
          </div>
        )}

        {activeAgentTab === 'GLO-04' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔮</span>
                <div>
                  <h5 className="text-xs font-cinzel font-bold text-amber-200">
                    Agent GLO-04: Ability & Tactical Synthesizer
                  </h5>
                  <span className="text-[10.5px] text-stone-400">
                    Synthesized {findings.abilityRec.abilities.length} Signature Combat Abilities & Glyphs
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleApplyAgent('GLO-04')}
                className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-cinzel font-bold transition"
              >
                {appliedAgents.includes('GLO-04') ? '✓ Abilities Applied' : 'Apply Abilities'}
              </button>
            </div>

            <div className="space-y-2">
              {findings.abilityRec.abilities.map((ab: AbilityProperty) => (
                <div key={ab.id} className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-start gap-2.5">
                  <Zap size={14} className="text-amber-400 mt-0.5 shrink-0" />
                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center gap-2">
                      <strong className="text-stone-100 font-cinzel">{ab.name}</strong>
                      <span className="px-1.5 py-0.2 rounded bg-stone-950 text-[10px] text-amber-400 border border-stone-800">
                        {ab.type} • {ab.charges}
                      </span>
                    </div>
                    <p className="text-stone-300 text-[11px]">{ab.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeAgentTab === 'GLO-14' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <div>
                  <h5 className="text-xs font-cinzel font-bold text-amber-200">
                    Agent GLO-14: Lorekeeper & Canon Scribe
                  </h5>
                  <span className="text-[10.5px] text-stone-400">
                    High Fantasy Title: <strong className="text-amber-300">"{findings.loreRec.cardName}"</strong>
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleApplyAgent('GLO-14')}
                className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-cinzel font-bold transition"
              >
                {appliedAgents.includes('GLO-14') ? '✓ Lore Applied' : 'Apply Lore & Title'}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-cinzel block">In-World Quote</span>
                <p className="text-amber-200/90 italic font-serif text-[11.5px]">{findings.loreRec.quote}</p>
              </div>
              <div className="pt-2 border-t border-stone-800/80">
                <span className="text-[10px] text-stone-400 uppercase font-cinzel block">Canon Lore Chronicle</span>
                <p className="text-stone-300 text-[11.5px] leading-relaxed">{findings.loreRec.lore}</p>
              </div>
            </div>
          </div>
        )}

        {activeAgentTab === 'VAL-02' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <div>
                  <h5 className="text-xs font-cinzel font-bold text-amber-200">
                    Agent VAL-02: Tournament Safety Arbiter
                  </h5>
                  <span className="text-[10.5px] text-stone-400">
                    Official Status: <strong className="text-green-400">{findings.safetyRec.rating}</strong>
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-green-950/60 text-green-300 border border-green-500/40 text-[11px] font-mono flex items-center gap-1.5">
                <ShieldCheck size={13} />
                <span>Zero Exploits Found</span>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
              {findings.safetyRec.comments}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
