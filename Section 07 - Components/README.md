# Section 7: Components

> **Vue 3 Course — 23 Sections**

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

- **defineProps** — Declares component props with types and defaults.
- **defineEmits** — Declares events the component can emit.
- **defineModel** — New in Vue 3.4, simplifies two-way binding for custom components.
- **useTemplateRef** — New in Vue 3.5, the modern way to access template elements.
- **Reactive Props Destructure** — New in Vue 3.5, allows destructuring props while maintaining reactivity.
- **defineExpose** — Specifies which methods or properties the parent can access.

## Code Reference

```vue
<!-- ChildComponent.vue — comprehensive example -->
<script setup>
import { computed, useTemplateRef } from 'vue'

const { name = 'Unknown', age = 0, isAdmin = false } = defineProps({
  name: String,
  age: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
})

const emit = defineEmits(['update', 'delete', 'selected'])
const modelValue = defineModel()
const inputRef = useTemplateRef('myInput')

const displayName = computed(() => isAdmin ? `👑 ${name}` : name)
const focusInput = () => inputRef.value?.focus()

defineExpose({ focusInput })
</script>

<template>
  <div>
    <h3>{{ displayName }}</h3>
    <p>Age: {{ age }}</p>
    <input ref="myInput" v-model="modelValue" />
    <button @click="emit('update', { name, age })">Update</button>
    <button @click="emit('delete')">Delete</button>
  </div>
</template>
```

```vue
<!-- Parent usage -->
<script setup>
import { ref, useTemplateRef } from 'vue'
import ChildComponent from './ChildComponent.vue'

const value = ref('')
const childRef = useTemplateRef('child')
const focusChild = () => childRef.value?.focusInput()
</script>

<template>
  <ChildComponent
    ref="child"
    name="Mustafa"
    :age="28"
    :is-admin="true"
    v-model="value"
    @update="(data) => console.log(data)"
    @delete="() => console.log('deleted')"
  />
  <button @click="focusChild">Focus Input</button>
</template>
```

## Review Q&A

**Q: What is the difference between `defineModel` and manual `:value` + `@input`?**
A: `defineModel` condenses both patterns into one line — it creates an internal ref and auto-syncs with the parent via v-model.

**Q: Why is `useTemplateRef` better than the old `ref="name"` string approach?**
A: It provides proper TypeScript typing and works more cleanly with the Composition API.

## Examples Folder

This section's examples are in `Section 07 - Components/examples/`:

- `examples/Counter.vue`
- `examples/SearchInput.vue`
- `examples/UserCard.vue`

Open `Section 07 - Components/examples/` to view the runnable examples.

---

**Prev:** Section 06 — Reactivity Fundamentals  
**Next:** Section 08 — Slots & Reusable Components
