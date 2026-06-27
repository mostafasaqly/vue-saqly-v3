# Section 5: Directives

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What are Directives? |
| 2 | v-bind — Attribute Binding |
| 3 | v-on — Event Binding |
| 4 | v-model — Two-Way Binding |
| 5 | v-if and v-else — Conditional Rendering |
| 6 | v-show — Toggle Visibility |
| 7 | v-for — List Rendering |
| 8 | v-pre, v-once, v-memo — Optimization Directives |

## Key Concepts

- **`v-model`** — Two-way data binding (combines `:value` + `@input`).
- **`v-model` modifiers** — `.number` (convert to number), `.trim` (trim whitespace), `.lazy` (update on blur).
- **`v-if` vs `v-show`** — `v-if` removes the element from the DOM, `v-show` only toggles CSS visibility.
- **`:key` in `v-for`** — Essential for efficient list updates.
- **`v-memo`** — Optimization directive that skips re-rendering when tracked values do not change.

## Code Reference

```vue
<script setup>
import { ref } from 'vue'

const username = ref('')
const age = ref(0)
const acceptTerms = ref(false)
const selectedColor = ref('blue')
const colors = ['red', 'green', 'blue']

const isLoggedIn = ref(false)
const showPanel = ref(true)

const tasks = ref([
  { id: 1, text: 'Learn Vue', done: true },
  { id: 2, text: 'Build a project', done: false },
  { id: 3, text: 'Deploy the app', done: false },
])
</script>

<template>
  <!-- v-model with modifiers -->
  <input v-model.trim="username" placeholder="Name" />
  <input v-model.number="age" type="number" placeholder="Age" />
  <input v-model.lazy="username" placeholder="Lazy update" />

  <!-- v-model with checkbox -->
  <input type="checkbox" v-model="acceptTerms" />
  <span>{{ acceptTerms ? 'Accepted' : 'Not accepted' }}</span>

  <!-- v-model with select -->
  <select v-model="selectedColor">
    <option v-for="color in colors" :key="color" :value="color">
      {{ color }}
    </option>
  </select>

  <!-- v-if / v-else-if / v-else -->
  <div v-if="isLoggedIn">Welcome back!</div>
  <div v-else>Please log in</div>

  <!-- v-show (keeps in DOM, toggles display) -->
  <div v-show="showPanel">Control panel</div>

  <!-- v-for with :key -->
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <input type="checkbox" v-model="task.done" />
      <span :class="{ done: task.done }">{{ task.text }}</span>
    </li>
  </ul>

  <!-- v-for with index -->
  <p v-for="(task, index) in tasks" :key="task.id">
    {{ index + 1 }}. {{ task.text }}
  </p>
</template>
```

## Review Q&A

**Q: When should I use `v-if` vs `v-show`?**
A: Use `v-if` when the element is unlikely to render. Use `v-show` when you need to toggle visibility frequently.

**Q: Why is `:key` required with `v-for`?**
A: It helps Vue track individual elements when the list updates, improving performance and preventing state bugs.

## Examples Folder

This section's examples are in `Section 05 - Directives/examples/`:

- `examples/DirectivesDemo.vue`

Open `Section 05 - Directives/examples/` to view the sample code.

---

**Prev:** Section 04 — Template Syntax & Binding  
**Next:** Section 06 — Reactivity Fundamentals
