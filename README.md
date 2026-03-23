# Superhero Roster

Live version is available at: https://superheroes-eight.vercel.app/

A **Next.js (App Router) + TypeScript** take-home: browse a fixed roster from `characters.json`, filter by power type, universe, and hero/villain type, search by name or alias, open static detail pages, and keep **favorites** in the browser with **Zustand** (persisted). Styling is **Tailwind CSS v4** with a light/dark theme (**next-themes**).

This README covers **how to run the project locally**, a **short summary of main technical decisions**, and **where SSR, SSG, ISR, and CSR are used and why**—as requested in the brief.

## Run locally

Prerequisites: **Node.js 20+** (matches `@types/node` in the project).

```bash
git clone <your-repo-url>
npm install
npm run dev
```

- App: [http://localhost:3000](http://localhost:3000)
- Unit tests: `npm test` (watch: `npm run test:watch`)
- Production: `npm run build` then `npm start`
- Lint: `npm run lint`

## What’s implemented (brief scope)

| Area | Implementation |
| ---- | ---------------- |
| Home roster | Cards show name, aliases, power stats, image, biggest weakness, and type (hero/villain). |
| Filters | Sidebar: power type, universe, type; state is reflected in the **URL** (shareable, back/forward friendly). |
| Search | Name and alias substring match (case-insensitive), URL-synced. |
| Detail page | Full name, powers, universe, description; deep links per character `id`. |
| Favorites | Toggle on cards; `/favorites` lists saved IDs after client hydration. |
| Theme | Light / dark toggle (class-based). |
| Responsive | Layout adapts for mobile, tablet, and desktop. |
| Tests | Jest + Testing Library (`*.test.ts` / `*.test.tsx`). |

## Main technical decisions (concise)

- **App Router** with clear **server vs client** boundaries: roster filtering and search run on the **server** from `searchParams` so the first paint matches the URL and there is no flash of an unfiltered list.
- **URL as source of truth** for filters and search (`src/lib/urlState.ts`); **Zustand** is reserved for **favorites** only, with `persist` + explicit rehydration so SSR never reads `localStorage`.
- **Data** is imported from `src/data/characters.json` in `src/lib/heroes.ts` (validated at module load). There are **no API routes**; for a static brief dataset this keeps latency and deployment simple while staying easy to swap for a real API later.
- **Filter semantics**: **all** selected power types must match a character; **any** selected universe can match; hero/villain type is a single optional constraint—combined with **and** across those dimensions.
- **TypeScript** in strict mode for safer refactors.
- **UI**: composable components under `src/components/`, loading and error boundaries via App Router conventions (`loading.tsx`, `error.tsx`).

## SSR, SSG, ISR, and CSR

| Route | Mode | Why |
| ----- | ---- | --- |
| `/` | **SSR** (dynamic server render) | `searchParams` are read on each request; `getVisibleHeroes` runs on the server so results match the query string immediately. |
| `/character/[id]` | **SSG** | `generateStaticParams` builds all character paths at build time from the JSON roster; pages are pre-rendered and fast to serve. |
| `/favorites` | **CSR** for the list | The shell can be static; which characters appear depends on **Zustand** after `localStorage` hydration, so the grid is intentionally client-driven. |
| **ISR** | **Not used** | The roster is **fixed at build time**. Incremental revalidation would apply if data came from a CMS or HTTP source that changes independently of deploys; here **SSG** is sufficient. |

## Architecture notes (ADRs)

**ADR-1: App Router over Pages Router**

- **Context:** RSC, nested layouts, `loading.tsx` / `error.tsx`, and `generateStaticParams`.
- **Decision:** App Router.
- **Consequences:** Explicit server/client split; in Next 16, `searchParams` / `params` are async in page APIs.

**ADR-2: Server-side filtering via `searchParams`**

- **Decision:** Home page reads `searchParams` and runs `getVisibleHeroes` in `page.tsx`.
- **Consequences:** `/` is dynamically rendered; filter changes use client navigation without losing URL sync.

**ADR-3: URL as source of truth for filters and search**

- **Decision:** Encode filters and search in the query string only.
- **Consequences:** Zustand is not used for filter state; favorites stay separate.

**ADR-4: Power types AND, universes OR, combined with type**

- **Decision:** A character must have **all** selected power types; if any universes are selected, the character’s universe must be **one of** them; optional hero/villain type must match when set.
- **Consequences:** Predictable faceted behavior aligned with the implementation in `filterHeroes`.

**ADR-5: Favorites via Zustand `persist` with controlled hydration**

- **Decision:** `persist` with `skipHydration` and rehydration in app providers.
- **Consequences:** Device-local favorites; no server session required.

**ADR-6: TypeScript strict mode**

- **Decision:** Strict compiler options as in `tsconfig.json`.
- **Consequences:** More explicit typing where the store and URL parsers need it.

## Known limitations

- Fixed dataset (11 characters); no pagination or virtualization.
- Favorites are per-browser (`localStorage`), not synced across devices.
- Search is substring match on `name` and `aliases`, not fuzzy ranking.
- A short first-paint window may occur before `next-themes` applies the stored theme class.

## Config notes

- **Jest:** `jest.config.mjs` uses `next/jest`.
- **Tailwind v4:** Design tokens and `dark` variant are defined in `src/app/globals.css` via `@theme` and `@custom-variant dark` (class-based dark mode with **next-themes**). There is no separate `tailwind.config` file.
