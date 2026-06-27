# Section 4: Template Syntax & Binding

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Text Interpolation with `{{ }}` |
| 2 | Text Binding with v-text |
| 3 | HTML Binding with v-html |
| 4 | Attribute Binding with v-bind |
| 5 | v-bind same-name shorthand (Vue 3.4) |
| 6 | Dynamic Attribute Names |
| 7 | Class Binding (Object & Array syntax) |
| 8 | Style Binding (Object & Array syntax) |
| 9 | Event Binding with v-on |
| 10 | Event Modifiers |
| 11 | Key Modifiers |

## Key Concepts

- **`{{ }}`** — Mustache interpolation. Evaluates a JavaScript expression and renders it as text. XSS-safe — HTML is escaped automatically.
- **`v-text`** — Sets the element's `textContent`. Equivalent to `{{ }}` but replaces all content of the element.
- **`v-html`** — Injects raw HTML. Only use with trusted content — it bypasses Vue's XSS protection.
- **`v-bind` / `:`** — Binds a JavaScript expression to an HTML attribute. The shorthand is `:attr="value"`.
- **Same-name shorthand (Vue 3.4)** — If the attribute name matches the variable name (`:id="id"`), you can write just `:id`.
- **`:class`** — Dynamically adds/removes CSS classes. Accepts an object `{ active: bool }` or an array `['class-a', 'class-b']`.
- **`:style`** — Dynamically sets inline styles. Accepts a CSS object `{ color: 'red', fontSize: '14px' }`.
- **`v-on` / `@`** — Binds an event listener. The shorthand is `@event="handler"`.
- **Event Modifiers** — `.prevent`, `.stop`, `.once`, `.self`, `.capture`, `.passive` — chainable qualifiers that modify event behavior.
- **Key Modifiers** — `@keyup.enter`, `@keydown.esc`, `@keyup.arrow-up` — listen for specific keyboard keys.

## Code Reference

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello, Vue!')
const rawHtml = ref('<strong style="color:green">Bold & Green</strong>')
const imageUrl = ref('/logo.png')
const isActive = ref(true)
const hasError = ref(false)
const fontSize = ref(16)
const btnColor = ref('#42b883')
const dynamicAttr = ref('title')
const id = ref('user-42')       // Vue 3.4 same-name shorthand demo

const handleClick = (event) => {
  console.log('Clicked!', event.target)
}
const handleSubmit = () => {
  console.log('Form submitted')
}
const handleKeydown = (event) => {
  console.log('Key:', event.key)
}
</script>

<template>
  <!-- ── Text Interpolation ── -->
  <p>{{ message }}</p>
  <p>{{ message.toUpperCase() }}</p>
  <p>{{ 2 + 2 }}</p>
  <p>{{ isActive ? 'Active' : 'Inactive' }}</p>

  <!-- ── v-html (trusted content only!) ── -->
  <div v-html="rawHtml"></div>

  <!-- ── Attribute Binding ── -->
  <img :src="imageUrl" :alt="message" />
  <button :disabled="!isActive">Submit</button>
  <a :href="'https://vuejs.org'" target="_blank">Vue Docs</a>

  <!-- ── Same-name shorthand (Vue 3.4) ── -->
  <!-- :id="id" → :id -->
  <div :id>User Block</div>

  <!-- ── Dynamic Attribute Name ── -->
  <span :[dynamicAttr]="message">Has dynamic attribute</span>

  <!-- ── Class Binding — Object syntax ── -->
  <div :class="{ active: isActive, 'has-error': hasError }">
    Box A
  </div>

  <!-- ── Class Binding — Array syntax ── -->
  <div :class="['base', isActive ? 'active' : '', hasError ? 'error' : '']">
    Box B
  </div>

  <!-- ── Class Binding — combined with static class ── -->
  <div class="card" :class="{ highlighted: isActive }">
    Box C — always has "card", conditionally "highlighted"
  </div>

  <!-- ── Style Binding ── -->
  <p :style="{ color: btnColor, fontSize: fontSize + 'px' }">
    Styled text
  </p>

  <!-- ── Style Binding — Array of objects ── -->
  <p :style="[{ fontWeight: 'bold' }, { color: btnColor }]">
    Multi-style
  </p>

  <!-- ── Event Binding ── -->
  <button @click="handleClick">Click me</button>
  <button @click="() => console.log('Inline handler')">Inline</button>
  <button @click="fontSize++">Increase font</button>

  <!-- ── Event Modifiers ── -->
  <form @submit.prevent="handleSubmit">
    <button type="submit">Submit (no page reload)</button>
  </form>

  <div @click="console.log('outer')">
    <button @click.stop="console.log('inner, stops propagation')">
      Stop propagation
    </button>
  </div>

  <button @click.once="console.log('fires only once')">
    Click once
  </button>

  <!-- ── Key Modifiers ── -->
  <input @keyup.enter="handleSubmit" placeholder="Press Enter to submit" />
  <input @keydown.esc="message = ''" placeholder="Press Esc to clear" />
</template>
```

## Event Modifiers Reference

| Modifier | What it does |
|----------|-------------|
| `.prevent` | Calls `event.preventDefault()` — stops default browser behavior |
| `.stop` | Calls `event.stopPropagation()` — prevents bubbling |
| `.once` | Handler fires at most once, then is removed |
| `.self` | Only fires if the event target is the element itself (not a child) |
| `.capture` | Use capture phase instead of bubble phase |
| `.passive` | Tells browser the handler won't call `preventDefault()` (improves scroll performance) |

## Common Key Modifiers

| Modifier | Key |
|----------|-----|
| `.enter` | Enter |
| `.tab` | Tab |
| `.esc` | Escape |
| `.space` | Space |
| `.delete` | Delete or Backspace |
| `.up` `.down` `.left` `.right` | Arrow keys |

## Review Q&A

**Q: What is the difference between `v-html` and `{{ }}`?**
A: `{{ }}` renders as plain escaped text — safe from XSS. `v-html` inserts raw HTML into the DOM. Never use `v-html` with user-generated content; only use it with trusted, controlled strings.

**Q: What event modifiers are chainable?**
A: All of them. For example: `@click.stop.prevent` both stops propagation and prevents the default. Order matters — they are processed left to right.

**Q: What does `:class` with an object do exactly?**
A: Each key is a class name. The value is a boolean — `true` adds the class, `false` removes it. Vue handles the DOM updates automatically when the boolean changes.

**Q: How is the Vue 3.4 same-name shorthand useful?**
A: When your variable has the same name as the attribute, you write `:id` instead of `:id="id"`. Especially useful with `defineProps` where the variable name often matches the attribute.

## Examples Folder

- `examples/TemplateBinding.vue` — all binding patterns in one runnable component

---

**Prev:** [Section 03 — Vue Fundamentals](../Section%2003%20-%20Vue%20Fundamentals/README.md)
**Next:** [Section 05 — Directives](../Section%2005%20-%20Directives/README.md)
