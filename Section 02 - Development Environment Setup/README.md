# القسم 2: إعداد بيئة التطوير
# Section 2: Development Environment Setup

> **Vue 3 Course — 23 Sections** | القسم 2 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | تثبيت Node.js | Installing Node.js |
| 2 | إنشاء مشروع بـ create-vue | Creating a Vue Project with create-vue |
| 3 | خيارات المشروع | Project Options (Router, Pinia, TS, Tests) |
| 4 | هيكل المجلدات | Folder Structure Explained |
| 5 | تشغيل سيرفر التطوير | Running the Dev Server |
| 6 | فهم main.js وApp.vue | Understanding main.js & App.vue |
| 7 | إضافات VS Code الضرورية | Essential VS Code Extensions |

## المفاهيم الرئيسية | Key Concepts

- **`npm create vue@latest`** — أسرع طريقة لإنشاء مشروع Vue 3 مع Vite / The fastest way to scaffold a Vue 3 + Vite project.
- **Vite** — أداة البناء الحديثة التي تعمل بسرعة عالية في التطوير / A modern, blazing-fast build tool for development.
- **SFC Structure** — كل ملف `.vue` يحتوي على `<template>`, `<script setup>`, `<style scoped>` / Every `.vue` file has three blocks.
- **Vue - Official (Volar)** — الإضافة الرسمية لـ VS Code لدعم Vue / The official VS Code extension for Vue syntax support.
- **`@` alias** — يشير إلى مجلد `src/` في المشروع / Points to the `src/` directory in the project.

## هيكل المجلدات | Folder Structure

```
my-vue-app/
├── public/           # الملفات الثابتة / Static assets
├── src/
│   ├── assets/       # الصور والـ CSS / Images & CSS
│   ├── components/   # المكونات القابلة للاستخدام / Reusable components
│   ├── views/        # صفحات التطبيق / Application pages
│   ├── router/       # إعداد Vue Router / Vue Router config
│   ├── stores/       # مخازن Pinia / Pinia stores
│   ├── composables/  # Composable functions
│   ├── App.vue       # المكون الجذري / Root component
│   └── main.js       # نقطة الدخول / Entry point
├── index.html        # قالب HTML الرئيسي / Main HTML template
├── vite.config.js    # إعدادات Vite / Vite configuration
└── package.json      # تبعيات المشروع / Project dependencies
```

## أمثلة مرجعية | Code Reference

```bash
# إنشاء مشروع جديد / Create a new project
npm create vue@latest my-vue-app

# الخيارات الموصى بها للكورس / Recommended options for this course
# ✅ TypeScript — No (نبدأ بـ JS، TypeScript في القسم 15)
# ✅ JSX Support — No
# ✅ Vue Router — Yes
# ✅ Pinia — Yes
# ✅ Vitest — Yes (للاختبارات / for testing)
# ✅ ESLint — Yes
# ✅ Prettier — Yes

cd my-vue-app
npm install
npm run dev
```

```js
// src/main.js — نقطة الدخول / Entry point
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

```vue
<!-- src/App.vue — المكون الجذري / Root component -->
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
/* Global layout styles go here */
</style>
```

## إضافات VS Code | VS Code Extensions

| الإضافة / Extension | الوصف / Description |
|---|---|
| **Vue - Official (Volar)** | دعم Vue 3 الرسمي / Official Vue 3 support |
| **ESLint** | فحص الأخطاء / Code linting |
| **Prettier** | تنسيق الكود / Code formatting |
| **Auto Rename Tag** | تغيير الـ tags تلقائياً / Auto-rename HTML tags |
| **Path Intellisense** | إكمال مسارات الملفات / File path completion |
| **GitLens** | أدوات Git / Enhanced Git tools |

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين Vite و Webpack؟**
ج: Vite يستخدم ES Modules الأصلي للمتصفح في وضع التطوير مما يجعله أسرع بكثير، بينما Webpack يبني كل شيء في كل مرة.

**Q: What is the difference between Vite and Webpack?**
A: Vite uses native ES Modules in the browser during development making it significantly faster, while Webpack bundles everything on each change.

**س: ماذا يفعل الأمر `npm create vue@latest`؟**
ج: يُنشئ مشروع Vue 3 جديداً باستخدام create-vue scaffold مع Vite كأداة بناء، مع خيارات لإضافة Router و Pinia و TypeScript والاختبارات.

**Q: What does `npm create vue@latest` do?**
A: It scaffolds a new Vue 3 project using the create-vue scaffold tool with Vite as the build tool, offering options to add Router, Pinia, TypeScript, and testing.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 01 — مقدمة الكورس / Course Introduction  
**التالي | Next:** Section 03 — أساسيات Vue / Vue Fundamentals
