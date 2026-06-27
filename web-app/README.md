# Vue Course — Interactive Web App

Bilingual (Arabic / English) learning companion for the **Vue 3 Course — 23 Sections**.  
Built with **Vue 3.5** · **Vite 6** · **Composition API** · `<script setup>` · no external UI libraries.

🌐 **Live:** [mostafasaqly.github.io/vue-saqly-v3](https://mostafasaqly.github.io/vue-saqly-v3/)

---

## Features

| | Feature | Detail |
|---|---|---|
| 🌍 | Bilingual | Arabic (RTL) & English, switch at any time |
| 🌙 | Dark / Light theme | Persisted in localStorage |
| 📚 | 23 Sections | Full course content with rich code examples |
| ✅ | Progress tracking | Mark sections complete, saved in localStorage |
| 📝 | Personal notes | Per-section notes, auto-saved |
| 🔍 | Search | Instant search across all section titles |
| 📋 | Copy code | One-click copy (`نسخ` in Arabic / `Copy` in English) |
| 📱 | Responsive | Mobile, tablet, and desktop |

---

## Project Structure

```
web-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.vue           # Navigation + search + theme/lang toggles
│   │   ├── LessonContent.vue     # Renders all content block types
│   │   ├── CodeBlock.vue         # Syntax-highlighted code + copy button
│   │   └── QABlock.vue           # Collapsible Q&A accordion
│   ├── composables/
│   │   ├── useLang.js            # Language state (ar / en), RTL/LTR
│   │   ├── useTheme.js           # Dark / light theme toggle
│   │   ├── useProgress.js        # Section completion tracking
│   │   ├── useNotes.js           # Per-section personal notes
│   │   ├── useSearch.js          # Search across section titles
│   │   └── useSectionContent.js  # Async section loader with in-memory cache
│   ├── data/
│   │   ├── sections.js           # Sidebar metadata + loadSection()
│   │   └── sections/
│   │       ├── section01.js      # Course Introduction
│   │       ├── section02.js      # Development Environment
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

Each `sectionXX.js` exports a default object. The `content[]` and `contentEn[]` arrays support these block types:

```js
export default {
  id: 6,
  title: "أساسيات الـ Reactivity",       // Arabic title
  titleEn: "Reactivity Fundamentals",    // English title
  level: "مبتدئ",
  levelEn: "Beginner",
  lessons: ["درس 1", "درس 2"],           // Arabic lesson list (TOC)
  lessonsEn: ["Lesson 1", "Lesson 2"],   // English lesson list
  intro: "مقدمة عربية ...",
  introEn: "English intro ...",
  content: [                             // Arabic content blocks
    { type: "heading",    text: "العنوان" },
    { type: "subheading", text: "عنوان فرعي" },
    { type: "paragraph",  text: "نص..." },
    { type: "code",       code: `const x = ref(0)` },
    { type: "list",       items: ["بند 1", "بند 2"] },
    { type: "tip",        text: "نصيحة..." },
    { type: "warning",    text: "تحذير..." },
    { type: "qa",         question: "سؤال؟", answer: "جواب..." },
    { type: "cta",        text: "نص", linkLabel: "رابط →", link: "https://..." },
  ],
  contentEn: [ /* same structure in English */ ],
}
```

---

## Composables

All composables use **module-level singletons** — state is shared across all components without Pinia or Vuex.

### `useLang.js`
```js
// Language state — persisted in localStorage, sets document dir
const { lang, toggleLang } = useLang()
// lang.value === 'ar' | 'en'
```

### `useTheme.js`
```js
// Dark/light theme — persisted in localStorage
const { isDark, toggleTheme } = useTheme()
```

### `useProgress.js`
```js
// Per-section completion — persisted in localStorage
const { isComplete, toggleComplete } = useProgress()
isComplete(sectionId)      // boolean
toggleComplete(sectionId)  // toggle & save
```

### `useNotes.js`
```js
// Per-section personal notes — persisted in localStorage
const { getNote, setNote } = useNotes()
getNote(sectionId)          // string
setNote(sectionId, text)    // saves to localStorage
```

### `useSectionContent.js`
```js
// Async loader with in-memory cache — lazy-loads each section file
const { section, loading, error, retry } = useSectionContent(activeId)
```

---

## Getting Started

```bash
cd web-app
npm install
npm run dev
# → http://localhost:5173
```

### Build for production

```bash
npm run build    # outputs to web-app/dist/
npm run preview  # preview the production build locally
```

---

## Deployment

Deployed automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

- Workflow: [`.github/workflows/deploy-web-app.yml`](../.github/workflows/deploy-web-app.yml)
- Uses: `actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages`
- Permissions: `pages: write`, `id-token: write`

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| Vue | 3.5 | UI framework — Composition API, `<script setup>` |
| Vite | 6 | Build tool & dev server |
| Vanilla CSS | — | Custom design system, CSS variables, no UI library |
| localStorage | — | Theme, language, progress, notes persistence |

---

Made by **Mostafa Saqly** · [saqly.com](https://saqly.com)
