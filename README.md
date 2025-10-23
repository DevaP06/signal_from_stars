Signal from the Stars
======================

A React + TypeScript puzzle web app scaffolded with Vite, styled with TailwindCSS, and using React Router. This repo provides the full folder structure and starter code for pages, components, context, hooks, utils, and tests.

Getting Started
---------------

- Install Node 18+.
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Run tests: `npm test`

Project Structure
-----------------

- `public/` static assets (copied as-is)
  - `images/` constellation and starfield images
  - `puzzles/` JSON or text puzzle payloads
  - `favicon.ico` placeholder (replace with a real icon)
- `src/` application source
  - `assets/` local static assets
  - `components/` UI components (Layout, common, forms)
  - `pages/` routed pages (Landing, Missions, Results)
  - `context/` React context (GameContext)
  - `data/` mission puzzle JSON
  - `hooks/` custom hooks (timer, progress)
  - `styles/` global CSS and Tailwind entry
  - `utils/` decoder and scoring helpers
  - `App.tsx` app routes/layout
  - `main.tsx` app bootstrap
- `tests/` vitest + RTL test files

Notes
-----

- Tailwind is configured via `tailwind.config.js` at the repo root. Global styles live in `src/styles/globals.css`.
- Static puzzle payloads for runtime fetches can be placed under `public/puzzles/`. The app also includes `src/data/*.json` for direct imports.
- Replace `public/favicon.ico` with your own icon.

