# Vue Course — Interactive Web App

A bilingual (Arabic / English) interactive learning app for the **Vue 3 Course — 23 Sections**.  
Built with **Vue 3.5** · **Vite 6** · **Composition API** · `<script setup>` — no external UI libraries.

**Live:** [mostafasaqly.github.io/vue-saqly-v3](https://mostafasaqly.github.io/vue-saqly-v3/)

---

## Features

| | Feature | Detail |
|---|---|---|
| 🌍 | Bilingual | Arabic (RTL) & English — switch at any time |
| 🌙 | Dark / Light theme | Persisted in localStorage |
| 📚 | 23 Sections | Full course content with rich code examples |
| ✅ | Progress tracking | Mark sections complete — saved in localStorage |
| 📝 | Personal notes | Per-section notes — auto-saved in localStorage |
| 🔍 | Search | Instant search across all section titles |
| 📋 | Copy code | One-click copy (`Copy` in English / `نسخ` in Arabic) |
| 📱 | Responsive | Mobile, tablet, and desktop |

---

## Project Structure

```
web-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.vue           # Navigation, search, theme and language toggles
│   │   ├── LessonContent.vue     # Renders all content block types
│   │   ├── CodeBlock.vue         # Syntax-highlighted code with copy button
│   │   └── QABlock.vue           # Collapsible Q&A accordion
│   ├── composables/
│   │   ├── useLang.js            # Language state (ar / en) + RTL/LTR direction
│   │   ├── useTheme.js           # Dark / light theme toggle
│   │   ├── useProgress.js        # Section completion tracking
│   │   ├── useNotes.js           # Per-section personal notes
│   │   ├── useSearch.js          # Search across section titles
│   │   └── useSectionContent.js  # Async section loader with in-memory cache
│   ├── data/
│   │   ├── sections.js           # Sidebar metadata + loadSection()
│   │   └── sections/
│   │       ├── section01.js
│   │       ├── section02.js
│   │       └── ...               # section01 – section23
│   ├── App.vue
│   ├── main.js
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## Content Block Schema

Each `sectionXX.js` file exports a default object. The `content[]` (Arabic) and `contentEn[]` (English) arrays support these block types:

```js
export default {
  id: 6,
  title: "...",          // Arabic title
  titleEn: "...",        // English title
  level: "...",          // Arabic level label
  levelEn: "...",        // English level label
  lessons: [...],        // Arabic lesson list shown in the TOC
  lessonsEn: [...],      // English lesson list
  intro: "...",          // Arabic intro paragraph
  introEn: "...",        // English intro paragraph
  content: [             // Arabic content blocks
    { type: "heading",    text: "..." },
    { type: "subheading", text: "..." },
    { type: "paragraph",  text: "..." },
    { type: "code",       code: `...` },
    { type: "list",       items: ["...", "..."] },
    { type: "tip",        text: "..." },
    { type: "warning",    text: "..." },
    { type: "qa",         question: "...", answer: "..." },
    { type: "cta",        text: "...", linkLabel: "...", link: "https://..." },
  ],
  contentEn: [ /* same block types in English */ ],
}
```

---

## Composables

All composables use **module-level singletons** — state is shared across all components without Pinia or Vuex.

### `useLang.js`
Manages the active language (`ar` / `en`) and the document `dir` attribute (`rtl` / `ltr`). Persisted in localStorage.

### `useTheme.js`
Manages dark / light theme by toggling a CSS class on `<html>`. Persisted in localStorage.

### `useProgress.js`
Tracks which sections the user has marked complete. Stored as a set in localStorage.

```js
const { isComplete, toggleComplete } = useProgress()
isComplete(sectionId)      // returns boolean
toggleComplete(sectionId)  // toggles and saves
```

### `useNotes.js`
Stores per-section text notes in localStorage, keyed by section ID.

```js
const { getNote, setNote } = useNotes()
getNote(sectionId)          // returns string
setNote(sectionId, text)    // saves to localStorage
```

### `useSectionContent.js`
Async loader that dynamically imports the section data file and caches it in memory to avoid re-fetching.

```js
const { section, loading, error, retry } = useSectionContent(activeId)
```

---

## Getting Started

```bash
cd web-app
npm install
npm run dev
# http://localhost:5173
```

### Build for production

```bash
npm run build    # outputs to web-app/dist/
npm run preview  # preview the production build locally
```

---

## Deployment

Deployed automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

Workflow: [`.github/workflows/deploy-web-app.yml`](../.github/workflows/deploy-web-app.yml)

The workflow:
1. Checks out the repo
2. Runs `npm ci` and `npm run build` inside `web-app/`
3. Uploads `web-app/dist/` as a Pages artifact
4. Deploys via `actions/deploy-pages`

Required permissions: `pages: write` · `id-token: write`

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| Vue | 3.5 | UI framework — Composition API, `<script setup>` |
| Vite | 6 | Build tool & dev server |
| Vanilla CSS | — | Custom design system with CSS variables, no UI library |
| localStorage | — | Theme, language, progress, and notes persistence |

---

Made by **Mostafa Saqly** · [saqly.com](https://saqly.com)
