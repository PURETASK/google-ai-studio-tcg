import React, { useState, useEffect } from 'react';
import { CAMPAIGN_SECTORS, CAMPAIGN_NODES, loadCampaignProgress, saveCampaignProgress } from '../data/campaignData';
import { CampaignNode, Domain, DeckPreset } from '../types';
import { PRESET_DECKS } from '../data/cards';
import { soundEngine } from '../utils/audioEngine';
import { economyManager } from '../utils/economyManager';
import { missionsManager } from '../utils/missionsManager';
import { 
  Compass, 
  MapPin, 
  Swords, 
  Sparkles, 
  Shield, 
  Flame, 
  Zap, 
  Skull, 
  Trees, 
  Sun, 
  Crown, 
  Star, 
  Lock, 
  CheckCircle2, 
  Gift, 
  Play, 
  ArrowRight,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ChroniclesCampaignViewProps {
  onStartBattleWithDeck: (deck: DeckPreset) => void;
  onInspectCard?: (cardName: string) => void;
  onGoToVault?: () => void;
}

export const ChroniclesCampaignView: React.FC<ChroniclesCampaignViewProps> = ({
  onStartBattleWithDeck,
  onInspectCard,
  onGoToVault
}) => {
  const [activeDomain, setActiveDomain] = useState<Domain>('Sanctuary');
  const [progress, setProgress] = useState(loadCampaignProgress);
  const [selectedNode, setSelectedNode] = useState<CampaignNode | null>(null);
  const [claimToast, setClaimToast] = useState<string | null>(null);

  useEffect(() => {
    saveCampaignProgress(progress);
  }, [progress]);

  const activeSector = CAMPAIGN_SECTORS.find(s => s.domain === activeDomain) || CAMPAIGN_SECTORS[0];
  const sectorNodes = CAMPAIGN_NODES.filter(n => n.realmId === activeDomain);

  const isNodeUnlocked = (node: CampaignNode): boolean => {
    if (node.unlockedByDefault) return true;
    if (progress.clearedNodeIds.includes(node.id)) return true;
    if (!node.requiredNodeIds || node.requiredNodeIds.length === 0) return true;
    return node.requiredNodeIds.every(reqId => progress.clearedNodeIds.includes(reqId));
  };

  const handleSelectNode = (node: CampaignNode) => {
    soundEngine.playMicroSound('select');
    setSelectedNode(node);
  };

  const handleClaimShrine = (node: CampaignNode) => {
    if (progress.clearedNodeIds.includes(node.id)) return;
    soundEngine.playMicroSound('unlock');
    if (node.rewards.shards > 0) {
      economyManager.grantShards(node.rewards.shards, `Campaign Shrine: ${node.title}`);
    }
    if (node.rewards.dust > 0) {
      economyManager.grantDust(node.rewards.dust, `Campaign Shrine: ${node.title}`);
    }
    missionsManager.incrementProgress('collection', 1);

    setProgress(prev => ({
      ...prev,
      clearedNodeIds: [...prev.clearedNodeIds, node.id],
      starsEarned: prev.starsEarned + 3,
      relicsAcquired: node.rewards.specialCardName ? [...prev.relicsAcquired, node.rewards.specialCardName] : prev.relicsAcquired
    }));

    setClaimToast(`Claimed ${node.rewards.shards} Shards & ${node.rewards.specialCardName || 'Sacred Blessing'}!`);
    setTimeout(() => setClaimToast(null), 4000);
  };

  const handleLaunchCampaignBattle = (node: CampaignNode) => {
    soundEngine.playCombatClash('turnStart');
    const matchedDeck = PRESET_DECKS.find(d => d.id === node.enemyDeckPresetId) || PRESET_DECKS[0];
    onStartBattleWithDeck(matchedDeck);
  };

  const getNodeIcon = (node: CampaignNode) => {
    switch (node.nodeType) {
      case 'titan_boss':
        return <Crown size={18} className="text-amber-300 animate-pulse" />;
      case 'shrine':
        return <Sparkles size={16} className="text-emerald-400" />;
      case 'hazard':
        return <AlertTriangle size={16} className="text-orange-400" />;
      default:
        return <Swords size={16} className="text-sky-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 space-y-6 animate-fadeIn min-w-0">
      
      {/* Campaign Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-950 via-neutral-900 to-stone-950 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-cinzel text-amber-400 font-bold uppercase tracking-widest">
              <Compass size={16} className="animate-spin-slow" />
              <span>Chronicles of the Nexus • World Progression Campaign</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-black text-amber-100 mt-1">
              Realm Campaign & Titan Gateways
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-1.5 leading-relaxed">
              Venture across the 5 elemental domains, conquer hazardous combat nodes, and defeat Sovereign Titans to unlock legendary foil boosters and rare relics.
            </p>
          </div>

          {/* Campaign Stats Pill */}
          <div className="flex items-center gap-4 bg-stone-950/80 p-3.5 rounded-2xl border border-amber-500/30">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-black font-cinzel text-lg">
                <Star size={16} className="fill-amber-400" />
                <span>{progress.starsEarned}</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase">Stars Earned</span>
            </div>
            <div className="w-px h-8 bg-stone-800" />
            <div className="text-center px-2">
              <div className="text-emerald-400 font-black font-cinzel text-lg">
                {progress.clearedNodeIds.length} / {CAMPAIGN_NODES.length}
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase">Nodes Cleared</span>
            </div>
            <div className="w-px h-8 bg-stone-800" />
            <div className="text-center px-2">
              <div className="text-purple-400 font-black font-cinzel text-lg">
                {progress.relicsAcquired.length}
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase">Relics Held</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Selection Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {CAMPAIGN_SECTORS.map(s => {
          const isActive = activeDomain === s.domain;
          return (
            <button
              key={s.domain}
              onClick={() => {
                soundEngine.playMicroSound('select');
                setActiveDomain(s.domain);
                setSelectedNode(null);
              }}
              className={`px-4 py-2.5 rounded-2xl font-cinzel font-bold text-xs flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-lg font-black scale-105'
                  : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Campaign Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Map Matrix */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-stone-950/90 border border-amber-500/30 shadow-2xl relative min-h-[420px] flex flex-col justify-between overflow-hidden">
          
          {/* Subtle Realm Background Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${activeSector.color} opacity-40 pointer-events-none`} />

          {/* Sector Info Overlay */}
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                {activeSector.subtitle}
              </span>
              <h3 className="text-xl font-cinzel font-black text-stone-100">
                {activeSector.name}
              </h3>
              <p className="text-xs text-stone-300 max-w-lg mt-1 font-sans">
                {activeSector.description}
              </p>
            </div>
            <div className="text-3xl opacity-80 select-none">
              {activeSector.icon}
            </div>
          </div>

          {/* Interactive Node Path Map */}
          <div className="relative z-10 my-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {sectorNodes.map((node, index) => {
                const unlocked = isNodeUnlocked(node);
                const cleared = progress.clearedNodeIds.includes(node.id);
                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => unlocked && handleSelectNode(node)}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 shadow-xl ring-2 ring-amber-500/50 scale-102'
                        : cleared
                        ? 'border-emerald-500/50 bg-stone-900/90 hover:border-emerald-400'
                        : unlocked
                        ? 'border-amber-500/40 bg-stone-900/80 hover:border-amber-400 hover:scale-102'
                        : 'border-stone-800 bg-stone-950/60 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Top status & icon */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                        {unlocked ? getNodeIcon(node) : <Lock size={14} className="text-stone-500" />}
                      </span>
                      {cleared ? (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                          <CheckCircle2 size={12} />
                          CLEARED
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-950 text-amber-400 border border-stone-800 font-bold">
                          {node.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Node title */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-stone-400 block uppercase">
                        {node.subtitle}
                      </span>
                      <h4 className="font-cinzel font-bold text-xs text-stone-100 line-clamp-2">
                        {node.title}
                      </h4>
                    </div>

                    {/* Reward preview pill */}
                    <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-mono text-amber-300">
                      <span>+{node.rewards.shards} Shards</span>
                      {node.nodeType === 'titan_boss' && (
                        <span className="text-purple-300 font-bold">★ TITAN</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Guidance */}
          <div className="relative z-10 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>Click any unlocked node to inspect battle conditions & claim rewards</span>
            <span>Domain Chapter {CAMPAIGN_SECTORS.findIndex(s => s.domain === activeDomain) + 1} of 5</span>
          </div>

        </div>

        {/* Node Inspection & Action Panel */}
        <div className="lg:col-span-1 p-6 rounded-3xl bg-stone-900/95 border border-amber-500/40 shadow-2xl space-y-5 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                    {selectedNode.subtitle} • {selectedNode.realmId}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                    {selectedNode.nodeType}
                  </span>
                </div>
                <h2 className="text-xl font-cinzel font-black text-amber-100 mt-1">
                  {selectedNode.title}
                </h2>
                <p className="text-xs text-stone-300 leading-relaxed mt-2">
                  {selectedNode.description}
                </p>
              </div>

              {/* Hazard Condition Callout if applicable */}
              {selectedNode.hazardCondition && (
                <div className="p-3.5 rounded-2xl bg-orange-950/40 border border-orange-500/40 text-xs text-orange-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-cinzel font-bold text-orange-300">
                    <AlertTriangle size={14} />
                    <span>Active Hazard Condition</span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    {selectedNode.hazardCondition}
                  </p>
                </div>
              )}

              {/* Rewards Box */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5">
                <span className="text-[10px] font-cinzel font-bold text-stone-400 uppercase tracking-wider block">
                  Encounter Victory Rewards:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-300 flex items-center justify-between">
                    <span>Gold:</span>
                    <strong className="text-white">+{selectedNode.rewards.gold}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-cyan-300 flex items-center justify-between">
                    <span>Shards:</span>
                    <strong className="text-white">+{selectedNode.rewards.shards}</strong>
                  </div>
                  {selectedNode.rewards.boosterPack && (
                    <div className="col-span-2 p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 flex items-center justify-between">
                      <span>Booster:</span>
                      <strong className="text-amber-300 truncate">{selectedNode.rewards.boosterPack}</strong>
                    </div>
                  )}
                  {selectedNode.rewards.specialCardName && (
                    <div className="col-span-2 p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 flex items-center justify-between">
                      <span>Relic Unlock:</span>
                      <strong className="text-emerald-300">{selectedNode.rewards.specialCardName}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div>
                {selectedNode.nodeType === 'shrine' ? (
                  <button
                    type="button"
                    onClick={() => handleClaimShrine(selectedNode)}
                    disabled={progress.clearedNodeIds.includes(selectedNode.id)}
                    className={`w-full py-3.5 rounded-2xl font-cinzel font-black text-xs flex items-center justify-center gap-2 transition ${
                      progress.clearedNodeIds.includes(selectedNode.id)
                        ? 'bg-stone-800 text-stone-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-stone-950 shadow-xl hover:scale-102'
                    }`}
                  >
                    <Sparkles size={16} />
                    <span>
                      {progress.clearedNodeIds.includes(selectedNode.id)
                        ? 'Shrine Blessing Claimed'
                        : 'Commune & Claim Sacred Blessing'}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleLaunchCampaignBattle(selectedNode)}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 font-cinzel font-black text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition"
                  >
                    <Play size={16} className="fill-stone-950" />
                    <span>
                      {selectedNode.nodeType === 'titan_boss'
                        ? 'Enter Titan Boss Arena'
                        : 'Deploy Tactical Squad to Match'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center mx-auto text-amber-400">
                <MapPin size={24} />
              </div>
              <h3 className="font-cinzel font-bold text-sm text-stone-200">
                Select a Campaign Node
              </h3>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Select an unlocked encounter, shrine, or boss gateway from the map to review battle parameters.
              </p>
            </div>
          )}

          {/* Claim Toast Notification */}
          {claimToast && (
            <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-500 text-xs text-emerald-200 font-cinzel text-center animate-fadeIn">
              {claimToast}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
