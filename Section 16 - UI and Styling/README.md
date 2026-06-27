# Section 16: UI & Styling

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Scoped CSS — Component-Isolated Styles |
| 2 | CSS Modules — Auto-Generated Class Names |
| 3 | Global Styles and the `:global()` selector |
| 4 | `v-bind()` in CSS — Reactive CSS Variables |
| 5 | Installing and Configuring Tailwind CSS |
| 6 | Tailwind with Dynamic Classes |
| 7 | Installing PrimeVue Component Library |
| 8 | Building Reusable Design System Components |
| 9 | Transitions and Animations with `<Transition>` |

## Key Concepts

- **`<style scoped>`** — Vue adds a unique data attribute (`data-v-xxxxxxxx`) to every element in the component and scopes all CSS selectors to match. Styles do not leak to children or parent.
- **`<style module>`** — CSS Modules. Vue generates unique class names at build time. You access them via the `$style` object: `:class="$style.card"`. Provides the strongest style isolation.
- **`:global(selector)`** — Inside a `<style scoped>` block, lets you write a CSS rule that applies globally (escapes scoping).
- **`v-bind()` in CSS** — Bind a JavaScript expression directly inside a CSS property value. Vue injects it as a CSS custom property and updates it reactively.
- **Tailwind CSS** — Utility-first framework. Write layout, spacing, color, and typography directly as HTML class names. No context switching between template and CSS.
- **`<Transition>`** — Vue's built-in component for animating elements entering or leaving the DOM. Apply CSS classes or JavaScript hooks for complex animations.
- **`<TransitionGroup>`** — Animates lists of items — handles entering, leaving, and moving items with CSS transitions.

## Code Reference

```vue
<!-- Scoped CSS — styles only apply to this component -->
<script setup>
import { ref } from 'vue'
const isActive = ref(false)
</script>

<template>
  <button :class="{ active: isActive }" @click="isActive = !isActive">
    Toggle
  </button>
</template>

<style scoped>
/* Only applies to <button> in this component */
button { padding: 0.5rem 1rem; border-radius: 6px; border: 2px solid #42b883; background: white; cursor: pointer; }
button.active { background: #42b883; color: white; }

/* Target a child component's root element */
/* :deep(.child-class) { ... } */

/* Apply globally from a scoped block */
/* :global(body) { margin: 0; } */
</style>
```

```vue
<!-- CSS Modules — class name isolation -->
<script setup>
// $style is automatically available in template
</script>

<template>
  <div :class="$style.card">
    <h2 :class="$style.title">Card Title</h2>
    <p :class="[$style.body, $style.muted]">Card content</p>
  </div>
</template>

<style module>
.card { background: white; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.title { font-size: 1.25rem; margin: 0 0 0.5rem; }
.body { line-height: 1.6; }
.muted { color: #666; }
/* These class names compile to something like: .card_3x7d8 — unique, no conflicts */
</style>
```

```vue
<!-- v-bind() in CSS — reactive CSS variables -->
<script setup>
import { ref, reactive } from 'vue'

const theme = reactive({
  primary: '#42b883',
  background: '#ffffff',
  textColor: '#333333',
  borderRadius: '8px',
  padding: '1.5rem',
})

const fontSize = ref(16)
</script>

<template>
  <div class="themed-card">
    <h2>Themed Card</h2>
    <p>This card reacts to theme changes.</p>

    <label>Primary color:
      <input type="color" v-model="theme.primary" />
    </label>
    <label>Font size:
      <input type="range" v-model.number="fontSize" min="12" max="24" />
      {{ fontSize }}px
    </label>
  </div>
</template>

<style scoped>
.themed-card {
  /* v-bind() — Vue injects these as CSS custom properties -->
  background-color: v-bind('theme.background');
  border: 2px solid v-bind('theme.primary');
  color: v-bind('theme.textColor');
  border-radius: v-bind('theme.borderRadius');
  padding: v-bind('theme.padding');
  font-size: v-bind('fontSize + "px"');
  transition: all 0.2s;
}

h2 { color: v-bind('theme.primary'); }
</style>
```

```vue
<!-- Transition — animate enter/leave -->
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>

  <Transition name="fade">
    <p v-if="show">This fades in and out</p>
  </Transition>

  <Transition name="slide" mode="out-in">
    <component :is="currentComponent" :key="route.path" />
  </Transition>
</template>

<style scoped>
/* Fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Slide transition */
.slide-enter-active, .slide-leave-active { transition: transform 0.3s, opacity 0.3s; }
.slide-enter-from { transform: translateX(20px); opacity: 0; }
.slide-leave-to { transform: translateX(-20px); opacity: 0; }
</style>
```

```vue
<!-- TransitionGroup — animate list items -->
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: 'Item A' },
  { id: 2, text: 'Item B' },
  { id: 3, text: 'Item C' },
])

const addItem = () => items.value.push({ id: Date.now(), text: `Item ${items.value.length + 1}` })
const removeItem = (id) => items.value = items.value.filter(i => i.id !== id)
</script>

<template>
  <button @click="addItem">Add</button>

  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
      <button @click="removeItem(item.id)">✕</button>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.3s; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(-10px); }
/* Smooth move for items that shift position */
.list-move { transition: transform 0.3s; }
</style>
```

```js
// tailwind.config.js — Tailwind configuration
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'vue-green': '#42b883',
        'vue-dark': '#35495e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## Styling Approach Comparison

| Approach | Isolation | Dynamic | DX | Best for |
|----------|-----------|---------|-----|---------|
| `<style scoped>` | Component-level | `:class` binding | Simple | Most components |
| `<style module>` | Strong (unique names) | `$style` object | Moderate | Design system |
| `v-bind()` in CSS | Scoped | Full JS reactivity | Very easy | Theme systems |
| Tailwind CSS | None (utility classes) | `computed` class list | Fast | Rapid UI building |

## Transition CSS Classes

| Class | When applied |
|-------|-------------|
| `v-enter-from` | Start of enter — before element is inserted |
| `v-enter-active` | During entire enter phase |
| `v-enter-to` | End of enter — after element is inserted |
| `v-leave-from` | Start of leave |
| `v-leave-active` | During entire leave phase |
| `v-leave-to` | End of leave — after element is removed |

## Review Q&A

**Q: What is the difference between `<style scoped>` and `<style module>`?**
A: Both provide style isolation. `scoped` adds a unique attribute to elements and scopes selectors to match — it's simple and transparent. `module` generates unique class names at build time (`.card` becomes `.card_abc123`) — stronger isolation, but you must access classes via the `$style` object.

**Q: How does `v-bind()` in CSS work?**
A: Vue compiles `v-bind('someVar')` in CSS into a CSS custom property (`--hash-someVar`) on the element's inline styles. When `someVar` changes, Vue updates the inline style, which cascades to the CSS rule. It's reactive with zero overhead.

**Q: When should I use Tailwind vs custom CSS?**
A: Use Tailwind for layouts, spacing, colors, and typography — it's fastest for building UIs. Use custom CSS (or `v-bind()`) for component-specific styles that don't fit utility classes, or for complex animations and pseudo-elements.

**Q: What is `mode="out-in"` on `<Transition>`?**
A: It controls the sequence when the element changes. `out-in` means: wait for the old element to fully leave before the new one enters. This prevents both elements from being visible at the same time during a route transition.

## Examples Folder

- `examples/ThemedCard.vue` — `v-bind()` in CSS with live color picker
- `examples/tailwind.config.js` — Tailwind setup with custom colors

---

**Prev:** [Section 15 — TypeScript with Vue](../Section%2015%20-%20TypeScript%20with%20Vue/README.md)
**Next:** [Section 17 — Performance & Best Practices](../Section%2017%20-%20Performance%20and%20Best%20Practices/README.md)
