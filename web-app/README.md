# تطبيق الويب التفاعلي
# Interactive Web App

> تطبيق ويب مدمج مع الكورس يعرض محتوى الـ 23 قسماً بشكل تفاعلي ثنائي اللغة
> An integrated web app that displays all 23 sections interactively in Arabic and English

## ما هو هذا التطبيق؟ | What is this app?

هذا التطبيق هو واجهة تفاعلية للكورس تتيح لك:
- قراءة محتوى كل قسم بالعربية والإنجليزية
- تتبع تقدمك في الكورس (الدروس المكتملة)
- البحث في محتوى الكورس
- تبديل الثيم (داكن / فاتح)
- إضافة ملاحظات شخصية لكل درس

This app is an interactive interface for the course that allows you to:
- Read each section's content in Arabic and English
- Track your course progress (completed lessons)
- Search through course content
- Toggle dark/light theme
- Add personal notes to each lesson

---

## تشغيل التطبيق | Running the App

```bash
# انتقل لمجلد التطبيق / Navigate to app folder
cd web-app

# ثبّت التبعيات / Install dependencies
npm install

# شغّل سيرفر التطوير / Start dev server
npm run dev
# → http://localhost:5173
```

## بناء للإنتاج | Build for Production

```bash
npm run build
# Output in: web-app/dist/

npm run preview
# Preview production build locally
```

---

## المكدس التقني | Tech Stack

| التقنية / Technology | الاستخدام / Use |
|---|---|
| **Vue 3.5** | الإطار الرئيسي / Main framework |
| **Vite** | أداة البناء / Build tool |
| **Composition API + `<script setup>`** | أسلوب الكتابة / Coding style |
| **Module-level Singletons** | إدارة الحالة (بدون Pinia) / State management (no Pinia) |
| **CSS Variables** | نظام الألوان والثيم / Color system & theming |
| **localStorage** | حفظ التقدم والملاحظات / Saving progress & notes |

> **ملاحظة:** التطبيق لا يستخدم Pinia أو Vue Router — يعتمد على module-level singletons لإدارة الحالة المشتركة.
> **Note:** The app doesn't use Pinia or Vue Router — it uses module-level singletons for shared state.

---

## الميزات | Features

### 1. ثنائي اللغة | Bilingual (AR/EN)
- زر تبديل اللغة في أي وقت / Language toggle button at all times
- العربية من اليمين لليسار / Arabic right-to-left layout
- الإنجليزية من اليسار لليمين / English left-to-right layout

### 2. تتبع التقدم | Progress Tracking
- علّم كل درس كـ "مكتمل" / Mark each lesson as "complete"
- شريط تقدم لكل قسم / Progress bar per section
- إجمالي التقدم في الكورس / Overall course progress
- يُحفظ في localStorage / Saved to localStorage

### 3. البحث | Search
- ابحث في عناوين الدروس والمحتوى / Search across lesson titles and content
- نتائج فورية أثناء الكتابة / Instant results while typing
- تنقل سريع للقسم المطلوب / Quick navigation to target section

### 4. الملاحظات | Notes
- أضف ملاحظات لكل درس / Add notes to each lesson
- تُحفظ تلقائياً في localStorage / Auto-saved to localStorage
- قابلة للتعديل والحذف / Editable and deletable

### 5. الثيم | Theme
- وضع داكن (Dark Mode) / Dark mode
- وضع فاتح (Light Mode) / Light mode
- يتذكر التفضيل عند الزيارة التالية / Remembers preference on next visit

### 6. أمثلة الكود | Code Examples
- Syntax highlighting للكود / Syntax highlighting for code
- زر نسخ الكود / Copy code button
- دعم Vue, JS, TS, Bash / Support for Vue, JS, TS, Bash

---

## هيكل المجلدات | Folder Structure

```
web-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── composables/
│   │   ├── useLang.js          # إدارة اللغة / Language management
│   │   ├── useTheme.js         # إدارة الثيم / Theme management
│   │   ├── useProgress.js      # تتبع التقدم / Progress tracking
│   │   ├── useNotes.js         # إدارة الملاحظات / Notes management
│   │   ├── useSectionContent.js # محتوى الأقسام / Section content
│   │   └── useSearch.js        # وظيفة البحث / Search functionality
│   ├── components/
│   │   ├── AppSidebar.vue      # الشريط الجانبي / Sidebar navigation
│   │   ├── LessonContent.vue   # عرض محتوى الدرس / Lesson content display
│   │   ├── CodeBlock.vue       # عرض الكود مع highlighting / Code display
│   │   ├── QABlock.vue         # أسئلة وأجوبة / Q&A display
│   │   ├── ProgressBar.vue     # شريط التقدم / Progress bar
│   │   ├── SearchModal.vue     # نافذة البحث / Search modal
│   │   ├── NoteEditor.vue      # محرر الملاحظات / Notes editor
│   │   └── ThemeToggle.vue     # زر تبديل الثيم / Theme toggle button
│   ├── data/
│   │   └── sections.js         # بيانات الـ 23 قسماً / 23 sections data
│   ├── App.vue                 # المكون الجذري / Root component
│   ├── main.js                 # نقطة الدخول / Entry point
│   └── style.css               # الأنماط الأساسية / Base styles
├── index.html
├── vite.config.js
└── package.json
```

---

## الـ Composables | Composables Architecture

### `useLang.js` — إدارة اللغة
```js
// Module-level singleton (shared across all components)
import { ref } from 'vue'

const lang = ref('ar') // 'ar' | 'en'
const isArabic = computed(() => lang.value === 'ar')

export function useLang() {
  const toggleLang = () => {
    lang.value = lang.value === 'ar' ? 'en' : 'ar'
    localStorage.setItem('lang', lang.value)
    document.documentElement.dir = isArabic.value ? 'rtl' : 'ltr'
  }
  return { lang, isArabic, toggleLang }
}
```

### `useTheme.js` — إدارة الثيم
```js
const isDark = ref(localStorage.getItem('theme') === 'dark')

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark.value)
  }
  return { isDark, toggleTheme }
}
```

### `useProgress.js` — تتبع التقدم
```js
const completed = ref(JSON.parse(localStorage.getItem('progress') || '{}'))

export function useProgress() {
  const markComplete = (sectionId, lessonId) => {
    if (!completed.value[sectionId]) completed.value[sectionId] = []
    if (!completed.value[sectionId].includes(lessonId)) {
      completed.value[sectionId].push(lessonId)
      localStorage.setItem('progress', JSON.stringify(completed.value))
    }
  }

  const getSectionProgress = (sectionId, total) => {
    const done = completed.value[sectionId]?.length || 0
    return Math.round((done / total) * 100)
  }

  return { completed, markComplete, getSectionProgress }
}
```

### `useSearch.js` — البحث
```js
export function useSearch(sections) {
  const query = ref('')
  const results = computed(() => {
    if (!query.value.trim()) return []
    const q = query.value.toLowerCase()
    return sections.flatMap(section =>
      section.lessons
        .filter(l => l.titleAr.includes(q) || l.titleEn.toLowerCase().includes(q))
        .map(l => ({ section, lesson: l }))
    )
  })
  return { query, results }
}
```

---

## المكونات الرئيسية | Key Components

### `AppSidebar.vue`
- قائمة الـ 23 قسماً / List of all 23 sections
- شريط تقدم لكل قسم / Progress bar per section
- Active state للقسم الحالي / Active state for current section
- قابل للطي (collapsible) / Collapsible

### `LessonContent.vue`
- عرض محتوى الدرس ثنائي اللغة / Bilingual lesson content display
- علامة "مكتمل" / "Complete" checkbox
- عرض الكود مع `CodeBlock` / Code display with CodeBlock
- عرض الأسئلة مع `QABlock` / Q&A display with QABlock

### `CodeBlock.vue`
- Syntax highlighting (Prism.js أو Shiki / or Shiki)
- زر نسخ / Copy button
- دعم لغات متعددة / Multi-language support

---

## CSS Variables — نظام الثيم

```css
:root {
  /* Colors */
  --color-primary: #42b883;
  --color-bg: #ffffff;
  --color-surface: #f9f9f9;
  --color-text: #333333;
  --color-text-muted: #666666;
  --color-border: #e0e0e0;

  /* Spacing */
  --sidebar-width: 280px;

  /* Typography */
  --font-arabic: 'Noto Sans Arabic', 'Segoe UI', sans-serif;
  --font-code: 'Fira Code', 'Consolas', monospace;
}

.dark {
  --color-bg: #1e1e2e;
  --color-surface: #2a2a3e;
  --color-text: #e0e0ff;
  --color-text-muted: #9999cc;
  --color-border: #3a3a5c;
}
```

---

## الرابط الأساسي | Base Path

التطبيق منشور على:

```
/vue-saqly-v3/
```

في `vite.config.js`:
```js
export default defineConfig({
  base: '/vue-saqly-v3/',
  plugins: [vue()],
})
```

---

## الكورسات الأخرى | Other Courses

| الكورس | الرابط |
|---|---|
| React Course (14 Sections) | `d:\React - Next Js - Angular\My Courses\React Course 14 sections` |
| Vue Course (23 Sections) | `d:\React - Next Js - Angular\My Courses\Vue Course 23 Sections` |

---

بناء بواسطة **مصطفى سقلى** | Built by **Mostafa Saqly**
