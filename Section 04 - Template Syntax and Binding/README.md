# Section 4: Template Syntax & Binding

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Text Interpolation with `{{ }}` |
| 2 | Text Binding with v-text |
| 3 | HTML Binding with v-html |
| 4 | Attribute Binding with v-bind |
| 5 | v-bind same-name shorthand (Vue 3.4) |
| 6 | Dynamic Attribute Names |
| 7 | Class Binding (Object & Array) |
| 8 | Style Binding (Object & Array) |
| 9 | Event Binding with v-on |

## Key Concepts

- **`{{ }}`** — Mustache interpolation to display values in the template.
- **`v-bind` (`:`)** — Dynamic attribute binding.
- **`v-on` (`@`)** — Event binding.
- **`:class`** — Dynamic class binding using object or array syntax.
- **`:style`** — Inline style binding using object syntax.
- **`.prevent`** — Event modifier that calls `event.preventDefault()`.
- **`v-bind` same-name** — Vue 3.4 shorthand: `:value` instead of `:value="value"`.

## Code Reference

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello!')
const rawHtml = ref('<strong>Bold text</strong>')
const imageUrl = ref('/logo.png')
const imageAlt = ref('Vue logo')
const isActive = ref(true)
const hasError = ref(false)
const btnColor = ref('#42b883')
const dynamicAttr = ref('title')

const handleClick = (event) => {
  console.log('Clicked!', event)
}

const handleSubmit = (event) => {
  console.log('Form submitted')
}
</script>

<template>
  <!-- Text Interpolation -->
  <p>{{ message }}</p>
  <p>{{ message.toUpperCase() }}</p>
  <p>{{ 2 + 2 }}</p>

  <!-- HTML Binding -->
  <div v-html="rawHtml"></div>

  <!-- Attribute Binding -->
  <img :src="imageUrl" :alt="imageAlt" />
  <button :disabled="!isActive">Disabled button</button>

  <!-- Dynamic Attribute Name -->
  <span :[dynamicAttr]="message">Dynamic attribute text</span>

  <!-- Class Binding — Object Syntax -->
  <div :class="{ active: isActive, 'has-error': hasError }">
    Content block
  </div>

  <!-- Class Binding — Array Syntax -->
  <div :class="[isActive ? 'active' : '', 'base-class']">
    Content block
  </div>

  <!-- Style Binding -->
  <button :style="{ backgroundColor: btnColor, color: 'white' }">
    Colored button
  </button>

  <!-- Event Binding -->
  <button @click="handleClick">Click me</button>
  <button @click="() => console.log('Inline!')">Inline</button>

  <!-- Event Modifiers -->
  <form @submit.prevent="handleSubmit">
    <button type="submit">Submit</button>
  </form>

  <!-- v-bind same-name shorthand -->
  <!-- Instead of :src="src" you can write just :src -->
</template>
```

## Review Q&A

**Q: What is the difference between `v-html` and `{{ }}`?**
A: `{{ }}` renders content as plain text (XSS-safe), while `v-html` inserts real HTML — use it carefully with trusted content.

**Q: What are the common Event Modifiers?**
A: `.prevent` (calls preventDefault), `.stop` (stops propagation), `.once` (fires only once), `.self` (only fires on the element itself).

## Examples Folder

This section's examples are in `Section 04 - Template Syntax and Binding/examples/`:

- `examples/TemplateBinding.vue`

Open `Section 04 - Template Syntax and Binding/examples/` to view the sample code.

---

**Prev:** Section 03 — Vue Fundamentals  
**Next:** Section 05 — Directives
