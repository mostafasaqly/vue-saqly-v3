# Section 16: UI & Styling

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Scoped CSS in Vue |
| 2 | CSS Modules |
| 3 | v-bind() in CSS — Dynamic CSS Variables |
| 4 | Installing Tailwind CSS |
| 5 | Configuring Tailwind with Vue |
| 6 | Installing PrimeVue Component Library |
| 7 | Building Reusable UI Components |

## Key Concepts

- **`<style scoped>`** — CSS scoped to the current component only.
- **`<style module>`** — CSS Modules generate unique class names automatically.
- **`v-bind()` in CSS** — Binds CSS variables to reactive JavaScript values.
- **Tailwind CSS** — Utility-first CSS framework for rapid UI building.
- **PrimeVue** — Rich Vue component library with many ready-to-use components.

## Code Reference

```vue
<!-- v-bind() in CSS — Dynamic styles with reactive values -->
<script setup>
import { ref } from 'vue'
const theme = ref({ primary: '#42b883', bg: '#ffffff', radius: '8px' })
</script>

<template>
  <div class="themed-card">
    <h2>Themed Card</h2>
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

## Review Q&A

**Q: What is the difference between `<style scoped>` and `<style module>`?**
A: `scoped` adds a unique attribute to elements and scopes CSS to them. `module` returns an object of CSS classes with unique names used via `:class="$style.name"`.

**Q: How do I use `v-bind()` in CSS?**
A: Put a JavaScript variable inside `v-bind()` in a CSS property — it auto-updates when the variable changes.

## Examples Folder

This section's examples are in `Section 16 - UI & Styling/examples/`:

- `examples/tailwind.config.js`
- `examples/ThemedCard.vue`

Open `Section 16 - UI & Styling/examples/` to view the runnable examples.

---

**Prev:** Section 15 — TypeScript with Vue
**Next:** Section 17 — Performance & Best Practices
