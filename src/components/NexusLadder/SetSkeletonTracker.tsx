import React, { useState } from 'react';
import { SET_SKELETON_DATA } from '../../data/nexusLadderData';
import { Domain, CardType, Rarity } from '../../types';
import { Layers, Sparkles, Filter, Grid, BarChart3 } from 'lucide-react';

export const SetSkeletonTracker: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'All' | 'Neutral'>('All');
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'All'>('All');

  const filteredSkeleton = SET_SKELETON_DATA.filter(row => {
    if (selectedDomain !== 'All' && row.domain !== selectedDomain) return false;
    if (selectedRarity !== 'All' && row.rarity !== selectedRarity) return false;
    return true;
  });

  return (
    <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="text-amber-400" size={20} />
            <h3 className="font-cinzel font-bold text-lg text-amber-100">
              Stage 18: Genesis Convergence Set Architecture
            </h3>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            150-Card Master Matrix: 24 cards per Domain (120 cards) + 30 Neutral/Multidomain.
          </p>
        </div>

        {/* Set Ratios summary */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-stone-300">
            Commons: 60 (40%)
          </span>
          <span className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-stone-300">
            Uncommons: 45 (30%)
          </span>
          <span className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-stone-300">
            Rares: 30 (20%)
          </span>
          <span className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-amber-300 font-bold">
            Mythics: 15 (10%)
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-cinzel">
        <span className="text-stone-400 text-[11px] mr-1">Domain:</span>
        {(['All', 'Radiance', 'Sanctuary', 'Verdance', 'Arcane', 'Abyss'] as const).map(d => (
          <button
            key={d}
            onClick={() => setSelectedDomain(d)}
            className={`px-2.5 py-1 rounded-md transition ${
              selectedDomain === d
                ? 'bg-amber-500 text-black font-bold shadow'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {d}
          </button>
        ))}

        <span className="text-stone-400 text-[11px] ml-4 mr-1">Rarity:</span>
        {(['All', 'Common', 'Uncommon', 'Rare', 'Mythic'] as const).map(r => (
          <button
            key={r}
            onClick={() => setSelectedRarity(r as any)}
            className={`px-2.5 py-1 rounded-md transition ${
              selectedRarity === r
                ? 'bg-amber-500 text-black font-bold shadow'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Set Skeleton Table */}
      <div className="overflow-x-auto rounded-xl border border-stone-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-950 text-stone-400 font-cinzel uppercase text-[10px] tracking-wider border-b border-stone-800">
            <tr>
              <th className="p-3">Cost</th>
              <th className="p-3">Domain</th>
              <th className="p-3">Type</th>
              <th className="p-3">Rarity</th>
              <th className="p-3">Archetype Role</th>
              <th className="p-3">Sample Blueprint</th>
              <th className="p-3">Design Intent & Power Ceiling</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-850 bg-stone-900/50">
            {filteredSkeleton.map((entry, idx) => (
              <tr key={idx} className="hover:bg-stone-800/40 transition">
                <td className="p-3 font-mono font-bold text-amber-400">
                  {entry.cost}
                </td>
                <td className="p-3 font-cinzel font-bold text-stone-200">
                  {entry.domain}
                </td>
                <td className="p-3 font-mono text-stone-300">
                  {entry.cardType}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    entry.rarity === 'Mythic' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' :
                    entry.rarity === 'Rare' ? 'bg-blue-950 text-blue-300 border border-blue-500/40' :
                    entry.rarity === 'Uncommon' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                    'bg-stone-800 text-stone-300'
                  }`}>
                    {entry.rarity}
                  </span>
                </td>
                <td className="p-3 font-cinzel text-amber-200">
                  {entry.role}
                </td>
                <td className="p-3 font-bold text-stone-100">
                  {entry.sampleCardName}
                </td>
                <td className="p-3 text-stone-300 text-[11px]">
                  {entry.designIntent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
