# Section 15: TypeScript with Vue

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Why TypeScript? |
| 2 | Creating a Vue + TypeScript Project |
| 3 | Typing Refs |
| 4 | Typing Props with Interfaces |
| 5 | Typing Emits |
| 6 | defineModel with TypeScript |
| 7 | Generic Components |
| 8 | Typing Composables |

## Key Concepts

- **`lang="ts"`** — Enables TypeScript in the single-file component.
- **`interface Props`** — Defines prop types using a TypeScript interface.
- **`withDefaults`** — Adds default values to props when using TypeScript.
- **`defineEmits<{...}>()`** — Typed emits with TypeScript.
- **`generic="T"`** — Makes the component generic and accept a dynamic type.
- **Typed Composables** — TypeScript composables provide full type inference.

## Code Reference

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref<number>(0)
const name = ref<string>('')
const items = ref<string[]>([])

interface Props {
  title: string
  items: Product[]
  isLoading?: boolean
}

interface Product {
  id: number
  name: string
  price: number
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [product: Product]
  delete: [id: number]
}>()

const expensiveItems = computed<Product[]>(() =>
  props.items.filter((item) => item.price > 100)
)
</script>
```

```vue
<!-- Generic Component -->
<script setup lang="ts" generic="T extends { id: number }">
defineProps<{
  items: T[]
  selectedId?: number
}>()

defineEmits<{ select: [item: T] }>()
</script>
```

## Review Q&A

**Q: When should I use `interface` vs `type` in TypeScript?**
A: `interface` is best for objects and props (extensible). `type` is best for unions and computed types. In Vue, both work with `defineProps`.

**Q: What is the purpose of `withDefaults` with TypeScript?**
A: When you define props using a TypeScript interface, you can't add defaults inline — `withDefaults` solves this problem.

## Examples Folder

This section's examples are in `Section 15 - TypeScript with Vue/examples/`:

- `examples/types.ts`
- `examples/useFetch.ts`
- `examples/UserCard.vue`

Open `Section 15 - TypeScript with Vue/examples/` to view the runnable examples.

---

**Prev:** Section 14 — State Management with Pinia
**Next:** Section 16 — UI & Styling
