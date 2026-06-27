# القسم 1: مقدمة الكورس
# Section 1: Course Introduction

> **Vue 3 Course — 23 Sections** | القسم 1 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | مرحباً أنا مصطفى سقلى | Welcome — Meet Your Instructor |
| 2 | ما الذي ستبنيه في هذا الكورس | What You'll Build in This Course |
| 3 | المتطلبات المسبقة | Prerequisites |
| 4 | خريطة الكورس | Course Roadmap |
| 5 | نظرة عامة على Vue | Vue Overview |
| 6 | الجديد في Vue 3.3–3.5 | What's New in Vue 3.3–3.5 |
| 7 | Vue مقابل React مقابل Angular | Vue vs React vs Angular |
| 8 | متى تستخدم Vue؟ | When to Use Vue? |

## المفاهيم الرئيسية | Key Concepts

- **Progressive Framework** — Vue يمكن استخدامه تدريجياً من مكون واحد حتى SPA كامل / Vue can be adopted incrementally from a single widget to a full SPA.
- **createApp** — نقطة الدخول لأي تطبيق Vue / The entry point for any Vue application.
- **3 مشاريع حقيقية** — Task Manager، Products Dashboard، Mini E-Commerce / 3 real projects built throughout the course.
- **Composition API** — الأسلوب الموصى به في Vue 3 / The recommended approach in Vue 3.
- **SFC (Single File Component)** — ملف `.vue` يجمع Template + Script + Style / A `.vue` file that combines Template, Script, and Style.

## أمثلة مرجعية | Code Reference

```js
// أبسط تطبيق Vue / Simplest Vue application
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

```vue
<!-- مكون Vue أساسي / Basic Vue Component -->
<script setup>
import { ref } from 'vue'
const message = ref('مرحباً بك في Vue 3!')
</script>

<template>
  <h1>{{ message }}</h1>
</template>

<style scoped>
h1 { color: #42b883; }
</style>
```

### مقارنة Vue مع الفريمووركس الأخرى | Framework Comparison

| الميزة / Feature | Vue 3 | React 18 | Angular 17 |
|---|---|---|---|
| Learning Curve | سهل / Easy | متوسط / Medium | صعب / Hard |
| Bundle Size | ~22kb | ~45kb | ~130kb |
| State Management | Pinia (official) | Redux/Zustand | NgRx |
| Routing | Vue Router (official) | React Router | Angular Router |
| Language | JS/TS | JSX/TSX | TypeScript |
| Rendering | Virtual DOM | Virtual DOM | Change Detection |
| Two-way Binding | v-model | Controlled components | [(ngModel)] |

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين Options API و Composition API؟**
ج: Options API تنظّم الكود في خيارات (data, methods, computed)، بينما Composition API تنظّمه حسب المنطق الوظيفي (composables) مما يُسهّل إعادة الاستخدام.

**Q: What is the difference between Options API and Composition API?**
A: Options API organizes code by options (data, methods, computed), while Composition API organizes by logical concerns (composables), enabling better reuse.

**س: لماذا نستخدم Vue بدلاً من Vanilla JS؟**
ج: Vue يوفر Reactivity تلقائية، إدارة DOM ذكية، وهيكلاً واضحاً للتطبيق مع أدوات رسمية للـ Routing والـ State Management.

**Q: Why use Vue instead of Vanilla JS?**
A: Vue provides automatic reactivity, smart DOM management, and a clear application structure with official tools for routing and state management.

**س: ما هي المشاريع التي ستبنيها في هذا الكورس؟**
ج: ستبني 3 مشاريع: Task Manager App (قسم 18)، Products Dashboard (قسم 19)، Mini E-Commerce App (قسم 20).

**Q: What projects will you build in this course?**
A: You'll build 3 projects: Task Manager App (Section 18), Products Dashboard (Section 19), and Mini E-Commerce App (Section 20).

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** — (هذا أول قسم / This is the first section)  
**التالي | Next:** Section 02 — إعداد بيئة التطوير / Development Environment Setup
