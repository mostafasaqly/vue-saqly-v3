# Section 8: Slots & Reusable Components

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What are Slots? |
| 2 | Default Slot — Basic Content Projection |
| 3 | Named Slots — Multiple Content Areas |
| 4 | Scoped Slots — Data from Child to Parent |
| 5 | Building a Reusable BaseButton |
| 6 | Building a Reusable BaseCard |
| 7 | Building BaseModal with Teleport |
| 8 | Best Practices for Reusable Components |

## Key Concepts

- **`<slot />`** — Allows the parent to inject content into the component.
- **`<slot name="x">`** — Named slots allow multiple content injection points.
- **`v-slot="{ item }"`** — Scoped slots send data from child to parent.
- **`<slot>Default</slot>`** — Default slot content shown when no content is provided.
- **Teleport** — Moves content to another DOM location, such as `<body>`.

## Code Reference

```vue
<!-- BaseCard.vue — Default + Named slots -->
<template>
  <div class="card">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <main class="card-body">
      <slot />
    </main>
    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- Parent usage -->
<BaseCard>
  <template #header>
    <h2>Card Header</h2>
  </template>

  <p>Main card content (default slot)</p>

  <template #footer>
    <button>Save</button>
  </template>
</BaseCard>
```

```vue
<!-- Scoped Slot Example -->
<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>

<!-- Parent usage -->
<ItemList :items="products">
  <template v-slot="{ item, index }">
    <span>{{ index + 1 }}. {{ item.name }} — {{ item.price }}</span>
  </template>
</ItemList>
```

```vue
<!-- Teleport — BaseModal -->
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
```

## Review Q&A

**Q: What is the difference between Default Slot and Named Slot?**
A: Default Slot accepts any un-named content. Named Slot uses `<slot name="x">` to allow multiple distinct content areas in the same component.

**Q: What is a Scoped Slot and when do we use it?**
A: A Scoped Slot allows the child to pass data to the parent to use in the slot. Useful for flexible list components where the component provides data but the parent controls rendering.

## Examples Folder

This section's examples are in `Section 08 - Slots and Reusable Components/examples/`:

- `examples/BaseButton.vue`
- `examples/BaseCard.vue`
- `examples/BaseModal.vue`

Open `Section 08 - Slots and Reusable Components/examples/` to view the runnable examples.

---

**Prev:** Section 07 — Components  
**Next:** Section 09 — Forms in Vue
