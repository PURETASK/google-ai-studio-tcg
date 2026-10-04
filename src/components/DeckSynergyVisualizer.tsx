import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Card, DeckPreset, Domain } from '../types';
import { CARDS_DATABASE } from '../data/cards';
import { soundEngine } from '../utils/audioEngine';
import { 
  Workflow, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  Layers, 
  Shield, 
  Sword, 
  Filter, 
  Info,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  X
} from 'lucide-react';

interface DeckSynergyVisualizerProps {
  cardIds: string[];
  allCards?: Card[];
  activePreset?: DeckPreset;
  onInspectCard: (card: Card) => void;
  onClose?: () => void;
  isModal?: boolean;
}

interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  card: Card;
  name: string;
  domain: Domain;
  cost: number;
  power: number;
  defense: number;
  keywords: string[];
  synergyCount: number;
  radius: number;
}

interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  source: string | NodeData;
  target: string | NodeData;
  type: 'keyword' | 'domain' | 'combo';
  sharedKeywords: string[];
  weight: number;
}

// Canonical Tactical Keywords & Mechanics to detect
const TACTICAL_KEYWORDS = [
  'Taunt', 'Aegis', 'Retribution', 'Scorch', 'Burn', 'Dawnstrike', 'Solar',
  'Spore', 'Regen', 'Regeneration', 'Roots', 'Ironbark', 'Verdant',
  'Stasis', 'Chrono', 'Temporal', 'Phase', 'Arcane', 'Teleport', 'Surge',
  'Siphon', 'Decay', 'Void', 'Doom', 'Leech', 'Curse', 'Abyssal',
  'Attunement', 'Momentum', 'Shield', 'Armor', 'Pierce', 'Haste', 'Flying',
  'Lifesteal', 'Vanguard', 'Flank', 'Charge', 'Counter', 'Ward'
];

export const DeckSynergyVisualizer: React.FC<DeckSynergyVisualizerProps> = ({
  cardIds,
  allCards,
  activePreset,
  onInspectCard,
  onClose,
  isModal = false
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [hoveredLink, setHoveredLink] = useState<LinkData | null>(null);

  // Filter toggles
  const [showKeywordLinks, setShowKeywordLinks] = useState(true);
  const [showDomainLinks, setShowDomainLinks] = useState(true);
  const [minSynergyWeight, setMinSynergyWeight] = useState(1);

  // Resolve card objects from card pool
  const deckCards: Card[] = useMemo(() => {
    const pool = allCards && allCards.length > 0 ? allCards : CARDS_DATABASE;
    const resolved: Card[] = [];
    cardIds.forEach(id => {
      const found = pool.find(c => c.id === id);
      if (found) resolved.push(found);
    });
    return resolved;
  }, [cardIds, allCards]);

  // Extract keywords from a card
  const extractCardKeywords = (card: Card): string[] => {
    const keywords = new Set<string>();
    const textPool = [
      card.name,
      card.subtype,
      card.lore,
      card.quote,
      ...(card.abilities || []).map(a => `${a.name} ${a.description} ${a.damageDice || ''}`),
      ...(card.powerGlyphs || []).map(g => `${g.name} ${g.shortTag} ${g.ruleClause}`)
    ].join(' ').toLowerCase();

    TACTICAL_KEYWORDS.forEach(kw => {
      if (textPool.includes(kw.toLowerCase())) {
        keywords.add(kw);
      }
    });

    if (card.attunementRequired) keywords.add('Attunement');
    if (card.laneRole) keywords.add(card.laneRole);

    return Array.from(keywords);
  };

  // Build Graph Nodes & Links
  const graphData = useMemo(() => {
    // Distinct cards in deck to prevent collision overlap
    const uniqueCardMap = new Map<string, { card: Card; count: number }>();
    deckCards.forEach(card => {
      const existing = uniqueCardMap.get(card.id);
      if (existing) {
        existing.count += 1;
      } else {
        uniqueCardMap.set(card.id, { card, count: 1 });
      }
    });

    const nodes: NodeData[] = Array.from(uniqueCardMap.values()).map(({ card, count }) => {
      const keywords = extractCardKeywords(card);
      return {
        id: card.id,
        card,
        name: card.name,
        domain: card.domain,
        cost: card.cost,
        power: card.power,
        defense: card.defense,
        keywords,
        synergyCount: 0,
        radius: Math.max(22, Math.min(32, 20 + card.cost * 1.4))
      };
    });

    const links: LinkData[] = [];

    // Compute pairwise links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];

        // 1. Shared keywords
        const sharedKw = nodeA.keywords.filter(k => nodeB.keywords.includes(k));
        
        // 2. Domain match
        const sameDomain = nodeA.domain === nodeB.domain;

        // 3. Complementary Combo (e.g. Champion + Weapon or Tank + Striker)
        const isCombo = 
          (nodeA.card.cardType === 'Champion' && nodeB.card.cardType === 'Weapon') ||
          (nodeB.card.cardType === 'Champion' && nodeA.card.cardType === 'Weapon') ||
          (nodeA.defense >= 7 && nodeB.power >= 7);

        let weight = 0;
        let linkType: 'keyword' | 'domain' | 'combo' = 'domain';

        if (sharedKw.length > 0) {
          weight += sharedKw.length * 2;
          linkType = 'keyword';
        }
        if (sameDomain) {
          weight += 1.5;
        }
        if (isCombo) {
          weight += 1;
        }

        if (weight > 0) {
          nodeA.synergyCount += 1;
          nodeB.synergyCount += 1;

          links.push({
            source: nodeA.id,
            target: nodeB.id,
            type: sharedKw.length > 0 ? 'keyword' : isCombo ? 'combo' : 'domain',
            sharedKeywords: sharedKw,
            weight
          });
        }
      }
    }

    return { nodes, links };
  }, [deckCards]);

  // Compute Cohesion Statistics
  const cohesionStats = useMemo(() => {
    const totalNodes = graphData.nodes.length;
    if (totalNodes <= 1) {
      return {
        score: 0,
        avgConnections: 0,
        anchorCard: null,
        isolatedCards: [],
        topKeywords: []
      };
    }

    const totalLinks = graphData.links.length;
    const maxPossibleLinks = (totalNodes * (totalNodes - 1)) / 2;
    const density = maxPossibleLinks > 0 ? (totalLinks / maxPossibleLinks) : 0;
    
    // Keyword synergies count
    const keywordLinksCount = graphData.links.filter(l => l.sharedKeywords.length > 0).length;
    const keywordRatio = totalLinks > 0 ? keywordLinksCount / totalLinks : 0;

    // Cohesion percentage (0 to 100)
    const rawScore = Math.round((density * 55) + (keywordRatio * 45));
    const score = Math.min(99, Math.max(15, rawScore));

    // Anchor Card (card with highest synergy weight/connections)
    const sortedBySynergy = [...graphData.nodes].sort((a, b) => b.synergyCount - a.synergyCount);
    const anchorCard = sortedBySynergy[0] || null;

    // Isolated Cards (0 or 1 connection)
    const isolatedCards = graphData.nodes.filter(n => n.synergyCount <= 1);

    // Keyword distribution
    const kwMap = new Map<string, number>();
    graphData.nodes.forEach(n => {
      n.keywords.forEach(kw => {
        kwMap.set(kw, (kwMap.get(kw) || 0) + 1);
      });
    });

    const topKeywords = Array.from(kwMap.entries())
      .filter(([_, count]) => count > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([kw, count]) => ({ kw, count }));

    return {
      score,
      avgConnections: (totalLinks * 2 / totalNodes).toFixed(1),
      anchorCard,
      isolatedCards,
      topKeywords
    };
  }, [graphData]);

  // Domain Color palette
  const getDomainColor = (domain: Domain): string => {
    switch (domain) {
      case 'Sanctuary': return '#eab308'; // Amber gold
      case 'Radiance': return '#ef4444'; // Radiant Crimson
      case 'Verdance': return '#10b981'; // Emerald
      case 'Arcane': return '#3b82f6'; // Astral Blue
      case 'Abyss': return '#a855f7'; // Void Purple
      default: return '#78716c';
    }
  };

  const getDomainSymbol = (domain: Domain): string => {
    switch (domain) {
      case 'Sanctuary': return '🛡️';
      case 'Radiance': return '🔥';
      case 'Verdance': return '🌿';
      case 'Arcane': return '🔮';
      case 'Abyss': return '💀';
      default: return '✨';
    }
  };

  // D3 Force Simulation Effect
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 750;
    const height = Math.max(480, container.clientHeight || 520);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', [0, 0, width, height]);

    // Defs: Gradients and Markers
    const defs = svg.append('defs');

    // Filter links based on toggles
    const activeLinks = graphData.links.filter(link => {
      if (link.weight < minSynergyWeight) return false;
      if (link.type === 'keyword' && !showKeywordLinks) return false;
      if (link.type === 'domain' && !showDomainLinks) return false;
      return true;
    });

    // Deep copy nodes and links for D3 simulation
    const simulationNodes: NodeData[] = graphData.nodes.map(d => ({ ...d }));
    const simulationLinks: LinkData[] = activeLinks.map(d => ({ ...d }));

    // Container Group with Zoom
    const g = svg.append('g').attr('class', 'main-zoom-layer');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Force Simulation Setup
    const simulation = d3.forceSimulation<NodeData>(simulationNodes)
      .force('link', d3.forceLink<NodeData, LinkData>(simulationLinks)
        .id((d: any) => d.id)
        .distance((d: any) => Math.max(90, 180 - (d.weight * 16)))
        .strength(0.6)
      )
      .force('charge', d3.forceManyBody().strength(-380))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<NodeData>().radius(d => d.radius + 18))
      .force('x', d3.forceX(width / 2).strength(0.06))
      .force('y', d3.forceY(height / 2).strength(0.06));

    // Draw Links
    const linkGroup = g.append('g').attr('class', 'links');
    const link = linkGroup.selectAll('line')
      .data(simulationLinks)
      .enter()
      .append('line')
      .attr('stroke', (d) => {
        if (d.type === 'keyword') return '#fbbf24'; // glowing gold
        if (d.type === 'combo') return '#38bdf8'; // cyan
        return '#57534e'; // subtle domain link
      })
      .attr('stroke-opacity', (d) => d.type === 'keyword' ? 0.75 : 0.35)
      .attr('stroke-width', (d) => Math.max(1.5, Math.min(5, d.weight * 0.9)))
      .attr('stroke-dasharray', (d) => d.type === 'domain' ? '4 4' : 'none')
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d) => {
        setHoveredLink(d);
        d3.select(event.currentTarget)
          .attr('stroke-opacity', 1)
          .attr('stroke-width', Math.max(3, d.weight * 1.2));
      })
      .on('mouseleave', (event, d) => {
        setHoveredLink(null);
        d3.select(event.currentTarget)
          .attr('stroke-opacity', d.type === 'keyword' ? 0.75 : 0.35)
          .attr('stroke-width', Math.max(1.5, Math.min(5, d.weight * 0.9)));
      });

    // Draw Nodes
    const nodeGroup = g.append('g').attr('class', 'nodes');
    const node = nodeGroup.selectAll('g')
      .data(simulationNodes)
      .enter()
      .append('g')
      .attr('class', 'node-item')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, NodeData>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Outer Glow Halo
    node.append('circle')
      .attr('r', d => d.radius + 4)
      .attr('fill', 'none')
      .attr('stroke', d => getDomainColor(d.domain))
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.4)
      .attr('class', 'halo');

    // Main Node Circle
    node.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', '#1c1917')
      .attr('stroke', d => getDomainColor(d.domain))
      .attr('stroke-width', 2.5)
      .attr('class', 'main-circle');

    // Domain Sigil Symbol
    node.append('text')
      .text(d => getDomainSymbol(d.domain))
      .attr('text-anchor', 'middle')
      .attr('dy', '-2px')
      .attr('font-size', d => `${d.radius * 0.75}px`);

    // Cost Pill Badge
    const badge = node.append('g')
      .attr('transform', d => `translate(${d.radius * 0.7}, -${d.radius * 0.7})`);

    badge.append('circle')
      .attr('r', 9)
      .attr('fill', '#0c0a09')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 1.5);

    badge.append('text')
      .text(d => `${d.cost}`)
      .attr('text-anchor', 'middle')
      .attr('dy', '3.5px')
      .attr('font-size', '9px')
      .attr('font-weight', 'bold')
      .attr('fill', '#fbbf24');

    // Card Label Text beneath
    node.append('text')
      .text(d => d.name.length > 15 ? `${d.name.substring(0, 13)}…` : d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => `${d.radius + 14}px`)
      .attr('font-size', '10px')
      .attr('font-family', 'Cinzel, serif')
      .attr('font-weight', '600')
      .attr('fill', '#f5f5f4')
      .attr('class', 'node-label');

    // Node Hover & Click Handlers
    node
      .on('mouseenter', (event, d) => {
        soundEngine.playMicroSound('hover');
        setHoveredNode(d);

        // Highlight connected links and nodes
        const connectedNodeIds = new Set<string>();
        connectedNodeIds.add(d.id);

        link.style('stroke-opacity', (l: any) => {
          const isConnected = l.source.id === d.id || l.target.id === d.id;
          if (isConnected) {
            connectedNodeIds.add(l.source.id);
            connectedNodeIds.add(l.target.id);
            return 1;
          }
          return 0.1;
        }).style('stroke-width', (l: any) => {
          return (l.source.id === d.id || l.target.id === d.id) ? 4 : 1;
        });

        node.style('opacity', (n: any) => {
          return connectedNodeIds.has(n.id) ? 1 : 0.25;
        });

        d3.select(event.currentTarget).select('.halo')
          .attr('stroke-width', 4)
          .attr('stroke-opacity', 0.9);
      })
      .on('mouseleave', (event, d) => {
        setHoveredNode(null);

        link.style('stroke-opacity', (l: any) => l.type === 'keyword' ? 0.75 : 0.35)
          .style('stroke-width', (l: any) => Math.max(1.5, Math.min(5, l.weight * 0.9)));

        node.style('opacity', 1);

        d3.select(event.currentTarget).select('.halo')
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.4);
      })
      .on('click', (event, d) => {
        soundEngine.playMicroSound('select');
        setSelectedNode(d);
        onInspectCard(d.card);
      });

    // Simulation Ticks
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [graphData, showKeywordLinks, showDomainLinks, minSynergyWeight]);

  return (
    <div className={`relative flex flex-col bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden ${
      isModal ? 'fixed inset-4 sm:inset-10 z-50 animate-fade-in' : 'w-full'
    }`}>
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-stone-800 bg-stone-900/90 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Workflow size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-cinzel font-bold text-amber-100">
                Deck Synergy Visualizer
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                D3 Network Engine
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Interactive map of keywords, combat abilities, and domain attunements across your {deckCards.length}-card deck.
            </p>
          </div>
        </div>

        {/* Deck Cohesion Score & Actions */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center gap-3 text-xs">
            <div>
              <span className="text-[10px] text-stone-400 block font-cinzel uppercase">Deck Cohesion</span>
              <span className="font-cinzel font-black text-base text-amber-400">
                {cohesionStats.score}%
              </span>
            </div>
            <div className="h-6 w-px bg-stone-800" />
            <div>
              <span className="text-[10px] text-stone-400 block font-cinzel uppercase">Avg Connections</span>
              <span className="font-mono font-bold text-stone-200">
                {cohesionStats.avgConnections} / card
              </span>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
              title="Close Visualizer"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="px-6 py-2.5 border-b border-stone-800/80 bg-stone-950 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-stone-400 text-[11px] font-cinzel font-bold flex items-center gap-1.5">
            <Filter size={13} className="text-amber-400" />
            <span>Links:</span>
          </span>

          <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-300">
            <input
              type="checkbox"
              checked={showKeywordLinks}
              onChange={(e) => setShowKeywordLinks(e.target.checked)}
              className="rounded bg-stone-900 border-stone-700 text-amber-500 focus:ring-amber-500"
            />
            <span className="text-[11px] flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              Shared Keywords
            </span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-300">
            <input
              type="checkbox"
              checked={showDomainLinks}
              onChange={(e) => setShowDomainLinks(e.target.checked)}
              className="rounded bg-stone-900 border-stone-700 text-amber-500 focus:ring-amber-500"
            />
            <span className="text-[11px] flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-500 inline-block" />
              Domain Affinity
            </span>
          </label>

          <div className="flex items-center gap-2 pl-2 border-l border-stone-800">
            <span className="text-[10.5px] text-stone-400">Min Synergy:</span>
            <input
              type="range"
              min={1}
              max={4}
              step={1}
              value={minSynergyWeight}
              onChange={(e) => setMinSynergyWeight(Number(e.target.value))}
              className="w-16 accent-amber-500"
            />
            <span className="font-mono text-[11px] text-amber-300">{minSynergyWeight}x</span>
          </div>
        </div>

        {/* Legend / Hints */}
        <div className="flex items-center gap-2 text-[10.5px] text-stone-400">
          <span>💡 Click card to inspect</span>
          <span>•</span>
          <span>Drag to arrange</span>
          <span>•</span>
          <span>Scroll to zoom</span>
        </div>
      </div>

      {/* Main Canvas & Overlay Area */}
      <div className="relative flex-1 min-h-[480px] bg-stone-950 flex flex-col" ref={containerRef}>
        <svg
          ref={svgRef}
          className="w-full h-full flex-1 block select-none cursor-grab active:cursor-grabbing"
        />

        {/* Hovered Node Tooltip Card (Floating Bottom-Left) */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 max-w-sm p-4 rounded-2xl bg-stone-900/95 border border-amber-500/50 shadow-2xl backdrop-blur-md animate-fade-in pointer-events-none z-10 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getDomainSymbol(hoveredNode.domain)}</span>
                <div>
                  <h4 className="text-xs font-cinzel font-bold text-amber-200">
                    {hoveredNode.name}
                  </h4>
                  <span className="text-[10px] text-stone-400">
                    {hoveredNode.card.cardType} • {hoveredNode.domain}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                {hoveredNode.cost}⚡
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-stone-300 border-t border-stone-800 pt-2">
              <span>⚔️ {hoveredNode.power} ATK</span>
              <span>🛡️ {hoveredNode.defense} DEF</span>
              <span className="text-amber-400 font-semibold font-cinzel">
                {hoveredNode.synergyCount} Connections
              </span>
            </div>

            {hoveredNode.keywords.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-cinzel font-bold text-stone-400">
                  Combat Keywords:
                </span>
                <div className="flex flex-wrap gap-1">
                  {hoveredNode.keywords.map(kw => (
                    <span
                      key={kw}
                      className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-[9.5px] font-mono text-amber-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hovered Link Tooltip */}
        {hoveredLink && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-stone-900/95 border border-amber-500/40 shadow-xl text-xs text-stone-200 pointer-events-none z-10 flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            <span>
              Shared Synergies:{' '}
              <strong className="text-amber-300">
                {hoveredLink.sharedKeywords.length > 0 
                  ? hoveredLink.sharedKeywords.join(', ')
                  : hoveredLink.type === 'combo'
                  ? 'Complementary Role Combo'
                  : 'Domain Attunement'
                }
              </strong>
            </span>
          </div>
        )}

        {/* Top Keywords Cluster Widget (Floating Top-Right) */}
        <div className="absolute top-4 right-4 p-3 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl backdrop-blur-md hidden sm:block max-w-[220px] space-y-1.5">
          <span className="text-[10px] font-cinzel font-bold text-amber-300 uppercase tracking-wider block">
            Top Keyword Clusters
          </span>
          <div className="space-y-1">
            {cohesionStats.topKeywords.length > 0 ? (
              cohesionStats.topKeywords.map(({ kw, count }) => (
                <div key={kw} className="flex items-center justify-between text-[11px] text-stone-300">
                  <span>{kw}</span>
                  <span className="font-mono text-amber-400 font-bold">{count}x cards</span>
                </div>
              ))
            ) : (
              <span className="text-[10.5px] text-stone-500 italic">No shared keywords found.</span>
            )}
          </div>

          {cohesionStats.isolatedCards.length > 0 && (
            <div className="pt-2 border-t border-stone-800/80 text-[10px] text-amber-400/80 flex items-start gap-1">
              <AlertCircle size={12} className="shrink-0 mt-0.5" />
              <span>{cohesionStats.isolatedCards.length} isolated card(s) could use more synergy links.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
