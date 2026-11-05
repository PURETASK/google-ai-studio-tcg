# Domain-Specific Card Visual Overhaul & Real Roster Artwork Engine

This plan upgrades every card across the Realm of Nexus TCG with **distinct domain-specific architectural borders, bespoke display typography, rich elemental color schemes, a sculpted full-art showcase layout**, and a **dual-engine real artwork system** combining pre-baked high-fantasy illustrations with an in-app batch AI art generator for the entire card roster.

---

## User Review & Confirmed Decisions

> [!IMPORTANT]
> The following architectural and aesthetic choices were confirmed and govern this implementation:

- **Confirmed Decision 1 — Roster-Wide Real Artwork Strategy**: **Pre-baked flagship art + In-App Batch AI Art Generator**. We will bundle high-resolution 4:3 fantasy illustrations for flagship champions, weapons, beasts, and relics across all six domains, and build a dedicated **Roster Art Synthesizer & Batch Generator** powered by server-side Gemini image generation (`gemini-3.1-flash-lite-image` with fallback and IndexedDB persistence) so every card in the game can be populated with real digital paintings in one click or customized individually.
- **Confirmed Decision 2 — Domain Typography & Frame Architecture**: **Distinct display font and bespoke architectural frame silhouette per domain**. Instead of a shared generic gold frame, each of the 6 Domains (*Sanctuary*, *Radiance*, *Verdance*, *Arcane*, *Tempest*, and *Abyss*) receives its own custom SVG frame geometry, surface material texture, and dedicated Google Font display family for card titles and headers.
- **Confirmed Decision 3 — Upgraded Card Anatomy**: **Full-art showcase with sculpted corner crests and translucent glass HUD**. Artwork spans edge-to-edge (`object-cover` full-bleed) framed by domain-sculpted top banners, corner crests for Essence Cost / Attack / Defense, and an unobstructed translucent bottom glass HUD for abilities and engraved glyphs.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. Replaces uniform card styling with **6 unmistakable Domain Visual Identities**—so a player can immediately recognize a *Sanctuary*, *Radiance*, *Verdance*, *Arcane*, *Tempest*, or *Abyss* card from across the table by its silhouette, border metalwork, color palette, and title typography alone.
  2. Elevates the **Card Anatomy** into a collector-grade full-art showcase with sculpted 3D-beveled stat crests, domain watermarks, rarity foil shaders, and high-contrast glassmorphic HUD overlays.
  3. Provides **Real Digital Artwork for Every Card** through a expanded pre-baked flagship asset library plus an interactive **Batch Card Art Forge** inside the Codex & Card Inspector that generates, previews, and permanently stores real 4:3 illustrations for any or all cards in the database.
- **Target Audience / Persona**: Competitive deck-builders, lore collectors, and playtesters in the Codex, Deck Builder, Battle Arena, and 3-Line Prototyping Arena.
- **Key Value**: Transforms every card from a prototype stat sheet into an authentic, tactile trading card with genuine fantasy illustrations and unmistakable faction identity.

---

## 2. User Experience & Visual Design

### A. The Six Domain Visual Identities (Borders, Palettes, & Typography)

Each domain is governed by a dedicated visual specification:

| Domain | Architectural Frame Silhouette | Color Scheme & Surface Tokens | Bespoke Display Font (Titles & Numbers) | Corner Crest & Stat Geometry |
| :--- | :--- | :--- | :--- | :--- |
| **Sanctuary** | **Gilded Ivory Cathedral Arch**: Soaring twin fluted columns, sunburst monstrance crown, and white-marble keystone inlay. | **Alabaster Gold & Celestial Ivory**: Primary `#F59E0B`, Secondary `#FEF08A`, Surface `#291D0E`, Accent `#FFFBEB`. | **`Cinzel Decorative`** (Regal Roman Cathedral Serif) | 8-Pointed Solar Star Cost Seal, Radiant Crossblade Attack, Tower Kite Aegis Defense. |
| **Radiance** | **Obsidian & Molten Slag Bastion**: Jagged volcanic basalt plates, glowing lava fissure veins, and a rising phoenix-wing apex crest. | **Volcanic Crimson & Molten Amber**: Primary `#EF4444`, Secondary `#F97316`, Surface `#2A0808`, Accent `#FDE047`. | **`Uncial Antiqua`** (Ancient Runic Forged Script) | Magma Flame Tear Cost Seal, Jagged Cleaver Attack, Obsidian Bulwark Defense. |
| **Verdance** | **Entwined Living Elderwood**: Organic twisting tree-root borders, glowing emerald amber nodes, and a sprouting canopy crown. | **Bioluminescent Emerald & Moss**: Primary `#10B981`, Secondary `#34D399`, Surface `#04261C`, Accent `#A7F3D0`. | **`Cormorant Garamond`** (High-Contrast Sylvan Italic/Bold Serif) | Sacred Leaf Triskele Cost Seal, Thorn Glaive Attack, Ironbark Root Shield Defense. |
| **Arcane** | **Astral Astrolabe & Runic Filigree**: Precision geometric brass/sapphire rings, constellation lines, and a floating prism finial. | **Deep Nebula Indigo & Starlight Cyan**: Primary `#3B82F6`, Secondary `#818CF8`, Surface `#0B112C`, Accent `#E0F2FE`. | **`Forum` / `Cinzel`** (Classical Arcane Inscription Serif) | Hexagonal Runic Diamond Cost Seal, Chrono Shard Attack, Hex Ward Defense. |
| **Tempest** | **Sky-Steel Tesla Conduit**: Sharp aerodynamic storm-fang plates, crackling plasma coils, and a twin lightning-rod crown. | **Storm Cyan & High-Voltage Cobalt**: Primary `#06B6D4`, Secondary `#38BDF8`, Surface `#06202B`, Accent `#CFFAFE`. | **`Syne` / `Outfit`** (Sharp Kinetic Storm Display) | Vortex Fulcrum Cost Seal, Lightning Harpoon Attack, Gale Barrier Defense. |
| **Abyss** | **Necrotic Bone & Void Iron**: Spiked gothic rib-arches, weeping violet soul-fire conduits, and a horned abyssal crown. | **Void Amethyst & Blood Crimson**: Primary `#A855F7`, Secondary `#E879F9`, Surface `#160526`, Accent `#F5D0FE`. | **`Pirata One` / `Metal Mania`** (Dark Gothic Blackletter) | Nether Talon Seal Cost, Reaping Scythe Attack, Crypt Carapace Defense. |

### B. Upgraded Full-Art Card Anatomy & Sculpted HUD

1. **Full-Bleed Artwork Viewport**:
   - Real card illustrations fill 100% of the card canvas (`aspect-[5/7.2]`) with `object-cover`, subtle hover parallax zoom, and domain-colored ambient rim lighting.
   - Multi-stop measured contrast scrims at the top (`22%` height) and bottom (`32%` height) ensure WCAG AA (`4.5:1+`) text legibility while leaving the central `55%` of the illustration completely unobstructed.
2. **Sculpted Top Header Banner & Floating Essence Crest**:
   - Domain-contoured nameplate banner displaying the card title in its **domain-specific display font**, metallic text-shadow, and an unboxed typographic subtitle kicker (`Domain · CardType · Rarity`).
   - Top-right **3D Sculpted Essence Cost Crest** overlapping the frame rail with metallic bevels and tabular numerals (`tabular-nums`).
3. **Lower Glassmorphic Ability & Glyph Tray**:
   - Translucent domain-tinted glass panel (`backdrop-blur-md`) housing interactive ability badges and engraved glyph sockets with instant hover tooltips.
4. **Anchored Corner Combat Crests (ATK / DEF / Tier)**:
   - Bottom-left **Attack Crest** and bottom-right **Defense Crest** sculpted into the lower frame corners with domain weapon/shield silhouettes, flanking a central Divine Rank star bar.

### C. Key User Flows for Roster-Wide Real Artwork

1. **Immediate Pre-Baked Visuals**:
   - On load, flagship cards across all domains immediately display real, high-resolution 4:3 fantasy paintings with zero user action required.
2. **Batch Roster AI Art Generator ("Synthesize All Missing Card Art")**:
   - Accessible from a new **"AI Roster Art Studio"** toolbar button in the **Card Codex** (and inside the **Deep Dive Card Inspector**).
   - Displays roster art coverage (e.g., *"X / Y Cards Equipped with Real Art"*), allows filtering by Domain or Card Type, and features:
     - **"Generate Real Art for Domain / Roster"**: Sequentially generates custom 4:3 fantasy illustrations for cards using each card's name, lore, subtype, and domain visual prompt recipe, saving each generated artwork directly into IndexedDB (`NexusTCG_Storage`) and updating the live UI in real time with a progress bar and pause/resume controls.
     - **"1-Click Regenerate Card Art"**: Inside any card's Inspector modal or on the batch grid, click to generate a fresh AI illustration or pick from the expanded built-in masterpiece gallery.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Hybrid Pre-Baked + Server-Side Batch AI Generation with IndexedDB Persistence**
  - *Chosen Approach*: Bundle static `.jpg` assets for flagship cards across all domains AND provide a server-side `/api/art/generate-card-image` endpoint (plus client-side high-resolution canvas/SVG procedural art fallback if offline or quota-limited) backed by IndexedDB (`customCardStorage`).
  - *Why*: Bundling static assets guarantees instant zero-latency visuals on startup, while the in-app Batch AI Art Generator lets the user generate real bespoke paintings for every single card in the 60+ card roster (including newly forged cards) without bloating the initial bundle size.
- **Decision 2: Domain-Specific Google Fonts Loaded via CSS Utility Classes**
  - *Chosen Approach*: Load distinct expressive Google Fonts (`Cinzel Decorative`, `Uncial Antiqua`, `Cormorant Garamond`, `Pirata One`, `Syne`, and `JetBrains Mono` for tabular stats) in `index.html` and map them automatically via a `getDomainTypography(domain)` helper.
  - *Why*: Gives each domain an unmistakable typographic personality while keeping body text and numeric counters crisp and readable.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        REALM OF NEXUS CLIENT (React)                        │
├──────────────────────────────────────┬──────────────────────────────────────┤
│     UPGRADED CARD RENDERING SUITE    │      ROSTER REAL ARTWORK ENGINE      │
│                                      │                                      │
│  ┌────────────────────────────────┐  │  ┌────────────────────────────────┐  │
│  │        CardItem.tsx            │  │  │   RosterArtGeneratorModal.tsx  │  │
│  │  • Full-Bleed Art Viewport     │  │  │  • Coverage Progress Tracker   │  │
│  │  • Domain Font & Title Plate   │  │  │  • Batch Queue (Start/Pause)   │  │
│  │  • Glass HUD & Corner Crests   │  │  │  • Per-Domain Art Synthesis    │  │
│  └───────┬────────────────┬───────┘  │  └───────────────┬────────────────┘  │
│          │                │          │                  │                   │
│          ▼                ▼          │                  ▼                   │
│  ┌───────────────┐ ┌──────────────┐  │  ┌────────────────────────────────┐  │
│  │CardDomain     │ │CardDomain    │  │  │  DeepDiveCardInspector.tsx     │  │
│  │Border.tsx     │ │StatBadge.tsx │  │  │  • 1-Click AI Art Generation   │  │
│  │• 6 Distinct   │ │• Sculpted 3D │  │  │  • File Upload & URL Binding   │  │
│  │  SVG Frames   │ │  Corner Orbs │  │  │  • Curated Masterpiece Picker  │  │
│  └───────────────┘ └──────────────┘  │  └───────────────┬────────────────┘  │
└──────────────────────────────────────┴──────────────────┼───────────────────┘
                                                          │
                         ┌────────────────────────────────┴───────────────────┐
                         ▼                                                    ▼
┌─────────────────────────────────────────────────┐  ┌────────────────────────┐
│           EXPRESS SERVER (server.ts)            │  │  PERSISTENCE LAYER     │
│                                                 │  │  (IndexedDB + Assets)  │
│  POST /api/art/generate-card-image              │  │                        │
│  • Builds Domain + Lore Masterpiece Prompt      │  │  • Pre-baked Flagship  │
│  • Calls @google/genai (gemini-3.1-flash-lite-  │  │    4:3 JPG Assets      │
│    image) with 4:3 aspect ratio                 │  │  • IndexedDB Unlimited │
│  • Returns base64 Data URI to Client            │  │    Card Art Cache      │
└─────────────────────────────────────────────────┘  └────────────────────────┘
```

### Interactive Component & State Mapping

1. **Domain Visual Theme Registry (`domainVisualThemes.ts`)**:
   - Centralizes all 6 domains' color tokens (primary, secondary, surface scrim, border metallic gradient, inner glow), font classes (`font-domain-sanctuary`, `font-domain-radiance`, `font-domain-verdance`, `font-domain-arcane`, `font-domain-tempest`, `font-domain-abyss`), and frame ornament descriptors.
2. **Bespoke Frame & Crest Components (`CardDomainBorder.tsx` & `CardDomainStatBadge.tsx`)**:
   - Renders distinct SVG architectural silhouettes for all 6 domains (separating *Tempest* and *Arcane* into their own unique frames and badges), with rarity-scaled gemstone sockets, metallic bevels, and ambient aura shimmers.
3. **Full-Art Card Component (`CardItem.tsx` & `CardVisualArt.tsx`)**:
   - Applies the domain's display font to the card title, positions sculpted Attack and Defense crests at the bottom corners, renders the Essence Cost seal in the top-right crest, and maps every card to either its custom/AI-generated `artUrl` or a domain-matched real illustration from the expanded asset pool so **100% of cards render with real artwork immediately**.
4. **Server-Side AI Art Endpoint & Batch Studio (`server.ts` & `RosterArtGeneratorModal.tsx`)**:
   - `POST /api/art/generate-card-image`: Uses `@google/genai` on the server to generate a tailored 4:3 fantasy illustration for any card based on its `name`, `domain`, `cardType`, `subtype`, and `lore`.
   - `RosterArtGeneratorModal`: Allows the user to batch-generate unique AI artwork across the card roster or regenerate individual cards, automatically persisting every generated image to IndexedDB and updating `cardsList` in `App.tsx`.
