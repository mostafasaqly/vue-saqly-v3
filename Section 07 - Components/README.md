# Section 7: Components

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Creating & Registering Components |
| 2 | Props — Passing Data Down |
| 3 | Prop Types & Validation |
| 4 | Default Prop Values |
| 5 | Reactive Props Destructure (Vue 3.5) |
| 6 | defineEmits — Emitting Events |
| 7 | defineModel — Two-Way Binding (Vue 3.4+) |
| 8 | useTemplateRef — Template Refs (Vue 3.5) |
| 9 | defineExpose — Exposing Component Methods |

## Key Concepts

- **Component** — A self-contained, reusable piece of UI. In Vue 3, any `.vue` file is a component. Import it and use it like an HTML tag.
- **Props** — Data passed from parent → child. Declare with `defineProps`. Treat as read-only inside the child.
- **Prop Validation** — Declare type, required, default, and custom validator per prop. Vue will warn in dev if the validation fails.
- **Reactive Props Destructure (Vue 3.5)** — You can now destructure props with defaults while keeping them reactive: `const { name = 'Guest' } = defineProps(...)`.
- **Emits** — Events passed from child → parent. Declare with `defineEmits`. Use `emit('eventName', payload)` to fire.
- **`defineModel`** — Vue 3.4+. Creates a two-way `v-model` binding in one line. Replaces the `modelValue` prop + `update:modelValue` emit pattern.
- **`useTemplateRef`** — Vue 3.5. The modern typed way to reference a DOM element or child component instance.
- **`defineExpose`** — Makes specific methods/properties of a child component accessible to the parent via a template ref.

## Code Reference

```vue
<!-- UserCard.vue — child component with full prop validation -->
<script setup>
import { computed, useTemplateRef } from 'vue'

// Vue 3.5: destructure with defaults — still reactive
const {
  name = 'Anonymous',
  age = 0,
  role = 'viewer',
  avatar = '/default-avatar.png'
} = defineProps({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 120,
  },
  role: {
    type: String,
    default: 'viewer',
    validator: (val) => ['admin', 'editor', 'viewer'].includes(val),
  },
  avatar: {
    type: String,
    default: '/default-avatar.png',
  },
})

// Typed emits
const emit = defineEmits(['update', 'delete', 'promote'])

const roleLabel = computed(() => {
  return { admin: '👑 Admin', editor: '✏️ Editor', viewer: '👤 Viewer' }[role]
})

// useTemplateRef — Vue 3.5
const inputRef = useTemplateRef('nameInput')

const focus = () => inputRef.value?.focus()

// Expose focus so parent can call it
defineExpose({ focus })
</script>

<template>
  <div class="user-card" :class="`role-${role}`">
    <img :src="avatar" :alt="name" />
    <h3>{{ name }}</h3>
    <span class="badge">{{ roleLabel }}</span>
    <p>Age: {{ age }}</p>

    <input ref="nameInput" :value="name" readonly />

    <div class="actions">
      <button @click="emit('update', { name, age })">Edit</button>
      <button @click="emit('promote')" v-if="role !== 'admin'">Promote</button>
      <button @click="emit('delete')" class="danger">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.user-card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; max-width: 240px; }
.badge { font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 999px; background: #42b883; color: white; }
.role-admin { border-color: gold; }
.danger { background: #e53e3e; color: white; border: none; }
button { margin: 0.25rem; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
</style>
```

```vue
<!-- Parent.vue — using UserCard -->
<script setup>
import { ref, useTemplateRef } from 'vue'
import UserCard from './UserCard.vue'

const users = ref([
  { id: 1, name: 'Sara Ahmed', age: 28, role: 'admin' },
  { id: 2, name: 'Ali Hassan', age: 22, role: 'editor' },
])

// Access exposed method on child
const cardRef = useTemplateRef('firstCard')
const focusFirstCard = () => cardRef.value?.focus()

const handleUpdate = (data) => console.log('Update:', data)
const handleDelete = (id) => {
  users.value = users.value.filter(u => u.id !== id)
}
const handlePromote = (id) => {
  const user = users.value.find(u => u.id === id)
  if (user) user.role = 'admin'
}
</script>

<template>
  <button @click="focusFirstCard">Focus first card</button>

  <UserCard
    v-for="user in users"
    :key="user.id"
    :ref="user.id === 1 ? 'firstCard' : undefined"
    :name="user.name"
    :age="user.age"
    :role="user.role"
    @update="handleUpdate"
    @delete="handleDelete(user.id)"
    @promote="handlePromote(user.id)"
  />
</template>
```

```vue
<!-- defineModel — custom input component (Vue 3.4+) -->
<script setup>
const model = defineModel({ default: '' })
</script>

<template>
  <input
    class="custom-input"
    :value="model"
    @input="model = $event.target.value"
  />
</template>

<!-- Parent usage -->
<!-- <CustomInput v-model="username" /> -->
```

## Component Communication Patterns

```
Parent
  │  props (data flows down)
  ↓
Child
  │  emit (events flow up)
  ↑
Parent

For sibling communication → use a Pinia store (Section 14)
For deeply nested → use provide/inject
```

## Review Q&A

**Q: What is the difference between `defineModel` and manual `:modelValue` + `@update:modelValue`?**
A: `defineModel()` compresses the entire pattern into one line. Under the hood it still creates a prop called `modelValue` and emits `update:modelValue`, but you don't write that boilerplate yourself.

**Q: Why use `useTemplateRef` instead of the old `ref="name"` string?**
A: `useTemplateRef('name')` returns a properly typed ref — TypeScript knows the exact element type. It's also composable-friendly. The string-based approach works but isn't typed.

**Q: Can a child component modify its props directly?**
A: No — props are read-only in the child. If you need to mutate the value, either emit an event to the parent, use `defineModel`, or copy the prop to a local `ref`.

**Q: When do you need `defineExpose`?**
A: With `<script setup>`, a component's internal state is private by default. If a parent needs to call a method on the child (like `focus()` or `reset()`), you must explicitly expose it with `defineExpose({ focus, reset })`.

## Examples Folder

- `examples/UserCard.vue` — full-featured card with props, emits, expose
- `examples/Counter.vue` — counter with prop-driven initial value
- `examples/SearchInput.vue` — custom input using defineModel

---

**Prev:** [Section 06 — Reactivity Fundamentals](../Section%2006%20-%20Reactivity%20Fundamentals/README.md)
**Next:** [Section 08 — Slots & Reusable Components](../Section%2008%20-%20Slots%20and%20Reusable%20Components/README.md)
