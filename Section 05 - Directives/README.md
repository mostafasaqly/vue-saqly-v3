# Section 5: Directives

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What are Directives? |
| 2 | v-bind — Attribute Binding |
| 3 | v-on — Event Binding |
| 4 | v-model — Two-Way Binding |
| 5 | v-model Modifiers (.trim, .number, .lazy) |
| 6 | v-if, v-else-if, v-else — Conditional Rendering |
| 7 | v-show — Toggle Visibility |
| 8 | v-for — List Rendering |
| 9 | v-for with Objects |
| 10 | v-pre, v-once, v-memo — Optimization Directives |
| 11 | Custom Directives |

## Key Concepts

- **Directive** — A special `v-` attribute that tells Vue to do something to a DOM element. Built-in directives cover the most common UI patterns.
- **`v-model`** — Two-way data binding shorthand for `:value` + `@input`. Works with text, checkbox, radio, select, and textarea. Can be used on custom components via `defineModel`.
- **`v-model` modifiers** — `.number` converts the input value to a number. `.trim` strips leading/trailing whitespace. `.lazy` syncs on `blur` (focus lost) instead of on every keystroke.
- **`v-if` vs `v-show`** — `v-if` removes / creates the element in the DOM. `v-show` keeps the element but toggles `display: none`. Use `v-show` for elements that toggle frequently.
- **`v-for`** — Renders a list of items. Always provide a unique `:key` so Vue can track items efficiently during re-renders.
- **`:key`** — Essential for `v-for`. Use a stable, unique value (like `item.id`), not the array index, to avoid subtle bugs when the list reorders.
- **`v-once`** — Renders the element once and never re-renders it — useful for expensive static content.
- **`v-memo`** — Skips re-rendering a subtree if specified dependency values haven't changed. Useful for long lists.
- **Custom Directives** — You can create your own `v-` directives with lifecycle hooks (`mounted`, `updated`, `unmounted`).

## Code Reference

```vue
<script setup>
import { ref } from 'vue'

// v-model targets
const username = ref('')
const age = ref(0)
const message = ref('')
const acceptTerms = ref(false)
const selectedRole = ref('')
const selectedColors = ref([])
const roles = ['Admin', 'Editor', 'Viewer']
const colors = ['Red', 'Green', 'Blue']

// Conditional
const isLoggedIn = ref(false)
const userRole = ref('admin')
const showPanel = ref(true)

// List
const tasks = ref([
  { id: 1, text: 'Learn Vue', done: true },
  { id: 2, text: 'Build a project', done: false },
  { id: 3, text: 'Deploy the app', done: false },
])

const addTask = () => {
  tasks.value.push({ id: Date.now(), text: 'New task', done: false })
}
const removeTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <!-- ── v-model with text ── -->
  <input v-model="username" placeholder="Enter username" />
  <p>Hello, {{ username || 'stranger' }}</p>

  <!-- ── v-model modifiers ── -->
  <input v-model.trim="username" placeholder=".trim — strips whitespace" />
  <input v-model.number="age" type="number" placeholder=".number — converts to number" />
  <input v-model.lazy="message" placeholder=".lazy — syncs on blur" />

  <!-- ── v-model with checkbox (single boolean) ── -->
  <label>
    <input type="checkbox" v-model="acceptTerms" />
    I accept the terms
  </label>
  <p>Terms: {{ acceptTerms ? 'Accepted ✓' : 'Not accepted' }}</p>

  <!-- ── v-model with checkbox (multiple — array) ── -->
  <label v-for="color in colors" :key="color">
    <input type="checkbox" :value="color" v-model="selectedColors" />
    {{ color }}
  </label>
  <p>Selected colors: {{ selectedColors.join(', ') }}</p>

  <!-- ── v-model with radio ── -->
  <label v-for="role in roles" :key="role">
    <input type="radio" :value="role" v-model="selectedRole" />
    {{ role }}
  </label>
  <p>Role: {{ selectedRole }}</p>

  <!-- ── v-model with select ── -->
  <select v-model="selectedRole">
    <option value="" disabled>Choose role</option>
    <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
  </select>

  <!-- ── v-if / v-else-if / v-else ── -->
  <div v-if="!isLoggedIn">Please log in</div>
  <div v-else-if="userRole === 'admin'">Welcome, Admin!</div>
  <div v-else>Welcome, User!</div>

  <!-- ── v-show (keeps element in DOM) ── -->
  <div v-show="showPanel">Control panel (hidden with CSS)</div>
  <button @click="showPanel = !showPanel">Toggle panel</button>

  <!-- ── v-for with :key ── -->
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <input type="checkbox" v-model="task.done" />
      <span :style="{ textDecoration: task.done ? 'line-through' : 'none' }">
        {{ task.text }}
      </span>
      <button @click="removeTask(task.id)">✕</button>
    </li>
  </ul>
  <button @click="addTask">Add task</button>

  <!-- ── v-for with index ── -->
  <ol>
    <li v-for="(task, index) in tasks" :key="task.id">
      {{ index + 1 }}. {{ task.text }}
    </li>
  </ol>

  <!-- ── v-for with objects ── -->
  <!-- <li v-for="(value, key, index) in userObject" :key="key"> -->

  <!-- ── v-once — renders once, never re-renders ── -->
  <p v-once>This was: {{ username }} (won't update)</p>

  <!-- ── v-memo — skip re-render if values unchanged ── -->
  <li
    v-for="task in tasks"
    :key="task.id"
    v-memo="[task.done, task.text]"
  >
    {{ task.text }}
  </li>
</template>
```

```js
// Custom directive — v-focus (auto-focuses the input on mount)
// Register locally in a component:
const vFocus = {
  mounted(el) {
    el.focus()
  }
}

// Register globally in main.js:
// app.directive('focus', { mounted: (el) => el.focus() })
```

```vue
<!-- Using the custom directive -->
<input v-focus placeholder="Auto-focused on mount" />
```

## v-if vs v-show Decision Guide

| | `v-if` | `v-show` |
|---|--------|---------|
| DOM element | Removed / created | Always present |
| CSS | — | `display: none` |
| Initial render cost | Lower (if false) | Higher (always renders) |
| Toggle cost | Higher (DOM create/destroy) | Lower (CSS toggle) |
| **Use when** | Content rarely shown | Content toggles frequently |

## Review Q&A

**Q: When should I use `v-if` vs `v-show`?**
A: Use `v-if` when the element is unlikely to be displayed (conditional menus, permission-gated content). Use `v-show` when you toggle visibility frequently (tabs, accordions, dropdowns) — it's cheaper because the DOM element stays.

**Q: Why is `:key` required with `v-for`?**
A: Vue uses `:key` to identify which items changed, were added, or were removed when the list updates. Without it, Vue re-renders the whole list. With a stable key (like `item.id`), Vue only patches what changed.

**Q: Can I use `v-if` and `v-for` on the same element?**
A: Technically yes, but avoid it — `v-if` has higher priority in Vue 3, so `v-for` variables won't be available inside it. Instead, pre-filter the array with a `computed` property, or wrap the `v-for` in a `<template>` and put `v-if` inside the loop.

**Q: What is the difference between `v-once` and `v-memo`?**
A: `v-once` renders the subtree exactly once and never updates. `v-memo` is smarter — it re-renders only when the specified dependencies change, useful for conditionally skipping expensive list items.

## Examples Folder

- `examples/DirectivesDemo.vue` — all directives in one runnable component

---

**Prev:** [Section 04 — Template Syntax & Binding](../Section%2004%20-%20Template%20Syntax%20and%20Binding/README.md)
**Next:** [Section 06 — Reactivity Fundamentals](../Section%2006%20-%20Reactivity%20Fundamentals/README.md)
