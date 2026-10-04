# Eternal Nexus: TCG - Architecture & AI Assistant Guide

This document provides quick-start commands, project architecture, and rules for working with the codebase using **Claude Code**, **Codex**, **Cursor**, or any AI-assisted terminal tool.

---

## 🛠️ Quick Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on port 3000)
npm run dev

# 3. Type check & Lint
npm run lint

# 4. Production build
npm run build
```

---

## 📁 Key Project Architecture

- **Root Entry**:
  - `index.html`: Web entry with typography imports (Cinzel, MedievalSharp, Orbitron, Inter).
  - `src/main.tsx`: React root mounting.
  - `src/App.tsx`: Navigation state controller (`builder`, `collection`, `simulator`, `arena`, `nexus-arena`, `deck-manager`, `analytics`, `missions`, `compendium`).

- **Domain Rules & Types**:
  - `src/types.ts`: Universal interfaces for `Card`, `Deck`, `BattlefieldSlot`, `Domain`, `AbilityProperty`, `PowerGlyph`.
  - `src/utils/keywordRuleDefinitions.ts`: Official rules, mathematical formulas, timings, synergies, and counters for all 5 domains (Sanctuary, Radiance, Verdance, Arcane, Abyss) + Universal keywords.
  - `src/data/domainAbilitiesData.ts`: Master ability definitions and keyword associations.
  - `src/data/powerGlyphsData.ts`: Engraved glyph rules, damage modifiers, and dice formulas.

- **Combat & Battlefield Engine**:
  - `src/components/NexusBattlefieldArena.tsx`: 7-slot symmetrical lane combat board (Backline Shrines, Vanguard Guard Lanes, Commander Throne, Armory Weapon Slot) with `motion/react` entry/exit animations.
  - `src/components/BattleArena.tsx`: Match state machine, 11-7 Hand Protocol, turn countdown timer, Momentum dice rolling, Kinetic Stash, and interactive combat log.
  - `src/utils/combatCalculations.ts`: Damage formulas, armor mitigation, dice roll resolution.
  - `src/utils/audioEngine.ts`: Web Audio API synthesizer for combat clashes, card draws, shield blocks, and ambient domain soundscapes.

- **Card Inspection & UI**:
  - `src/components/CardModal.tsx`: Modal overlay wrapper.
  - `src/components/DeepDiveCardInspector.tsx`: 3D interactive tilt inspection, radar charts, dice simulations, and official keyword hover tooltips.
  - `src/components/KeywordTooltip.tsx`: Context-sensitive floating rule definition system.
  - `src/components/CodexIconRegistry.tsx`: Clean inline SVG vector icons for all domains and abilities.

---

## 🎯 Best Practices for Claude Code & Codex

1. **Strict Type Safety**: Always run `npm run lint` (`tsc --noEmit`) after adding or editing components.
2. **Animation Standard**: Use `motion/react` (`import { motion, AnimatePresence } from 'motion/react'`) for all transitions.
3. **No External Image Reliance**: Use CSS gradients, Tailwind classes, and vector SVGs from `lucide-react` or `CodexIconRegistry` rather than arbitrary uncompressed image files for UI elements.
