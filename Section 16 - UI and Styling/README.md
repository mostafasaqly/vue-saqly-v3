# القسم 16: واجهة المستخدم والتنسيق
# Section 16: UI & Styling

> **Vue 3 Course — 23 Sections** | القسم 16 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | Scoped CSS في Vue | Scoped CSS in Vue |
| 2 | CSS Modules | CSS Modules |
| 3 | v-bind() في Style | v-bind() in CSS — Dynamic CSS Variables |
| 4 | تثبيت Tailwind CSS | Installing Tailwind CSS |
| 5 | إعداد Tailwind مع Vue | Configuring Tailwind with Vue |
| 6 | تثبيت PrimeVue | Installing PrimeVue Component Library |
| 7 | بناء UI Components | Building Reusable UI Components |

## المفاهيم الرئيسية | Key Concepts

- **`<style scoped>`** — CSS مُقيَّد بالمكون فقط، لا يؤثر على المكونات الأخرى / CSS scoped to the current component only.
- **`<style module>`** — CSS Modules تُنشئ أسماء classes فريدة تلقائياً / CSS Modules generate unique class names automatically.
- **`v-bind()` في CSS** — يربط متغيرات CSS بقيم JavaScript رياكتيفة / Binds CSS variables to reactive JavaScript values.
- **Tailwind CSS** — إطار CSS utility-first للبناء السريع للـ UI / Utility-first CSS framework for rapid UI building.
- **PrimeVue** — مكتبة مكونات Vue جاهزة وغنية بالميزات / Rich Vue component library with many ready-to-use components.

## أمثلة مرجعية | Code Reference

```vue
<!-- v-bind() in CSS — Dynamic styles with reactive values -->
<script setup>
import { ref } from 'vue'
const theme = ref({ primary: '#42b883', bg: '#ffffff', radius: '8px' })
</script>

<template>
  <div class="themed-card">
    <h2>بطاقة ديناميكية</h2>
  </div>
</template>

<style scoped>
.themed-card {
  background-color: v-bind('theme.bg');
  border: 2px solid v-bind('theme.primary');
  border-radius: v-bind('theme.radius');
  padding: 1.5rem;
}
</style>
```

```css
/* Scoped CSS — only affects this component */
/* Adds a unique attribute like [data-v-xxxxxxx] */
<style scoped>
.button { color: green; }
/* Compiles to: .button[data-v-abc123] { color: green; } */
</style>

/* CSS Modules — returns class object */
<style module>
.card { background: white; border-radius: 8px; }
</style>
/* Usage: <div :class="$style.card"> */
```

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين `<style scoped>` و `<style module>`؟**
ج: `scoped` يضيف attribute فريداً للعناصر ويقيّد CSS بها. `module` يُعيد object من CSS classes بأسماء فريدة تُستخدم بـ `:class="$style.name"`.

**Q: What is the difference between `<style scoped>` and `<style module>`?**
A: `scoped` adds a unique attribute to elements and scopes CSS to them. `module` returns an object of CSS classes with unique names used via `:class="$style.name"`.

**س: كيف أستخدم `v-bind()` في CSS؟**
ج: ضع متغير JavaScript داخل `v-bind()` في CSS property — يتحدث تلقائياً عند تغير المتغير.

**Q: How do I use `v-bind()` in CSS?**
A: Put a JavaScript variable inside `v-bind()` in a CSS property — it auto-updates when the variable changes.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 15 — TypeScript with Vue
**التالي | Next:** Section 17 — Performance & Best Practices
