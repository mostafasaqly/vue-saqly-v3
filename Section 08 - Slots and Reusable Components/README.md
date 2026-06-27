# Section 8: Slots & Reusable Components

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What are Slots? |
| 2 | Default Slot — Basic Content Projection |
| 3 | Named Slots — Multiple Content Areas |
| 4 | Scoped Slots — Data from Child to Parent |
| 5 | `$slots` — Checking Slot Presence |
| 6 | Building a Reusable BaseButton |
| 7 | Building a Reusable BaseCard |
| 8 | Building BaseModal with Teleport |
| 9 | Best Practices for Reusable Components |

## Key Concepts

- **Slot** — A placeholder in a child component that the parent fills with content. Think of it as "content injection."
- **Default Slot** — The unnamed slot. Any content placed inside a component tag that isn't assigned to a named slot goes here.
- **Named Slot** — `<slot name="header">` allows multiple independent injection points in the same component.
- **Scoped Slot** — The child passes data back up through the slot so the parent can use it while rendering. Syntax: `<slot :item="item">` in child, `v-slot="{ item }"` in parent.
- **`$slots`** — An object available in the template listing all slots. Use `v-if="$slots.header"` to conditionally render a slot wrapper only when content is provided.
- **Fallback content** — Any content placed between `<slot>` tags renders when no slot content is provided by the parent.
- **`<Teleport>`** — Renders a component's template in a different DOM location (e.g., `<body>`), useful for modals and tooltips that need to escape z-index stacking contexts.

## Code Reference

```vue
<!-- BaseCard.vue — default + named slots with $slots guard -->
<template>
  <div class="card">
    <!-- Named slot: header — only render wrapper if content provided -->
    <header v-if="$slots.header" class="card-header">
      <slot name="header" />
    </header>

    <!-- Default slot — main content -->
    <main class="card-body">
      <slot>
        <!-- Fallback content shown when parent provides nothing -->
        <p class="empty">No content provided.</p>
      </slot>
    </main>

    <!-- Named slot: footer -->
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
.card-header { background: #42b883; color: white; padding: 0.75rem 1rem; }
.card-body { padding: 1rem; }
.card-footer { padding: 0.75rem 1rem; background: #f5f5f5; display: flex; justify-content: flex-end; gap: 0.5rem; }
.empty { color: #aaa; font-style: italic; }
</style>
```

```vue
<!-- Parent using BaseCard -->
<template>
  <BaseCard>
    <template #header>
      <h2>User Profile</h2>
    </template>

    <!-- Default slot content — no #default needed -->
    <p>Name: Sara Ahmed</p>
    <p>Role: Admin</p>

    <template #footer>
      <button>Cancel</button>
      <button class="primary">Save</button>
    </template>
  </BaseCard>

  <!-- BaseCard with only default slot — header/footer hidden -->
  <BaseCard>
    <p>Simple card with no header or footer.</p>
  </BaseCard>

  <!-- BaseCard with no content — fallback renders -->
  <BaseCard />
</template>
```

```vue
<!-- DataList.vue — scoped slot (child data → parent template) -->
<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="loading">Loading...</div>
    <ul v-else>
      <li v-for="(item, index) in items" :key="item.id ?? index">
        <!-- Pass item and index up to parent via scoped slot -->
        <slot :item="item" :index="index">
          <!-- Fallback: just show item as JSON -->
          {{ item }}
        </slot>
      </li>
    </ul>
  </div>
</template>
```

```vue
<!-- Parent using DataList with scoped slot -->
<script setup>
import { ref } from 'vue'
import DataList from './DataList.vue'

const products = ref([
  { id: 1, name: 'Vue T-Shirt', price: 29 },
  { id: 2, name: 'Pinia Mug', price: 15 },
  { id: 3, name: 'Vite Sticker', price: 5 },
])
</script>

<template>
  <DataList :items="products">
    <!-- Destructure the scoped slot data -->
    <template v-slot="{ item, index }">
      <span class="index">{{ index + 1 }}.</span>
      <strong>{{ item.name }}</strong>
      <span class="price">${{ item.price }}</span>
    </template>
  </DataList>
</template>
```

```vue
<!-- BaseModal.vue — using Teleport to escape z-index issues -->
<script setup>
defineProps({
  isOpen: { type: Boolean, required: true },
  title: { type: String, default: 'Modal' },
})

const emit = defineEmits(['close'])
</script>

<template>
  <!-- Teleport renders this to <body>, not inside the component tree -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
        <div class="modal" role="dialog" :aria-label="title">
          <header class="modal-header">
            <h3>{{ title }}</h3>
            <button @click="emit('close')" aria-label="Close">✕</button>
          </header>

          <div class="modal-body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 9999;
}
.modal { background: white; border-radius: 8px; min-width: 320px; max-width: 600px; overflow: hidden; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #eee; }
.modal-body { padding: 1rem; }
.modal-footer { padding: 1rem; border-top: 1px solid #eee; display: flex; justify-content: flex-end; gap: 0.5rem; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

```vue
<!-- BaseButton.vue — flexible button with icon slot -->
<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<template>
  <button
    :class="['btn', `btn-${variant}`]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <slot name="icon" />
    <span v-if="loading">Loading...</span>
    <slot v-else />
  </button>
</template>

<style scoped>
.btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; display: inline-flex; align-items: center; gap: 0.5rem; }
.btn-primary { background: #42b883; color: white; }
.btn-secondary { background: #f5f5f5; color: #333; }
.btn-danger { background: #e53e3e; color: white; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
```

## Slot Reference

| Syntax | Role |
|--------|------|
| `<slot />` | Default slot placeholder in child |
| `<slot name="header" />` | Named slot placeholder |
| `<slot :data="value" />` | Scoped slot — sends data to parent |
| `<template #header>` | Fill a named slot (shorthand for `v-slot:header`) |
| `<template v-slot="{ data }">` | Receive scoped slot data |
| `v-if="$slots.footer"` | Check if parent provided slot content |

## Review Q&A

**Q: What is the difference between Default Slot and Named Slot?**
A: A default slot accepts any un-named content placed between a component's tags. Named slots (`<slot name="header">`) give the parent multiple distinct injection points in the same component.

**Q: What is a Scoped Slot and when do I use it?**
A: A scoped slot is when the child exposes data through the slot so the parent can use it while rendering. Classic use case: a generic list component that provides each item to the parent so the parent controls how each item looks.

**Q: Why does Teleport matter for modals?**
A: When a modal is nested deep inside the component tree, CSS `overflow: hidden` or `z-index` on ancestor elements can clip or hide it. `<Teleport to="body">` moves the rendered output to the document body so it's always on top, regardless of where in the tree the component lives.

**Q: Can I provide fallback content for named slots too?**
A: Yes. Any content between `<slot name="footer">...</slot>` renders when the parent doesn't fill that slot.

## Examples Folder

- `examples/BaseCard.vue` — default + named slots with `$slots` guard
- `examples/BaseModal.vue` — modal with Teleport + Transition
- `examples/BaseButton.vue` — flexible button with icon slot and loading state

---

**Prev:** [Section 07 — Components](../Section%2007%20-%20Components/README.md)
**Next:** [Section 09 — Forms in Vue](../Section%2009%20-%20Forms%20in%20Vue/README.md)
