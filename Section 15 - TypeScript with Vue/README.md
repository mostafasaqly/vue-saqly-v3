# Section 15: TypeScript with Vue

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Why TypeScript? |
| 2 | Adding TypeScript to an Existing Project |
| 3 | Typing `ref` and `reactive` |
| 4 | Typing Props with Interfaces |
| 5 | `withDefaults` — Defaults for Typed Props |
| 6 | Typing Emits |
| 7 | `defineModel` with TypeScript |
| 8 | Generic Components |
| 9 | Typing Composables |
| 10 | Typing Pinia Stores |

## Key Concepts

- **`lang="ts"`** — Add this to `<script setup>` to enable TypeScript in a Single File Component.
- **`ref<T>()`** — Explicitly type the inner value of a ref: `const name = ref<string>('')`.
- **`interface`** — TypeScript's way to describe the shape of an object. Use it for prop types and API response types.
- **`defineProps<Props>()`** — Pass a TypeScript interface as a generic to get fully typed props without a runtime object definition.
- **`withDefaults`** — Wraps `defineProps<Props>()` to provide default values for optional props when using TypeScript.
- **`defineEmits<{...}>()`** — Typed emit declarations using a call-signature object.
- **Generic component** — `<script setup lang="ts" generic="T">` makes the component work with any type `T` the parent provides.
- **Type inference** — Vue 3 is designed to work with TypeScript's type inference — you get autocomplete and type errors in the template, props, and composable return types.

## Code Reference

```vue
<!-- UserCard.vue — fully typed component -->
<script setup lang="ts">
import { computed } from 'vue'

// Define types
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  avatar?: string
}

// Typed props with interface + withDefaults
const props = withDefaults(defineProps<{
  user: User
  isSelected?: boolean
  maxNameLength?: number
}>(), {
  isSelected: false,
  maxNameLength: 30,
})

// Typed emits using call signature syntax
const emit = defineEmits<{
  select: [user: User]
  delete: [userId: number]
  'update:modelValue': [value: boolean]
}>()

// Typed computed
const truncatedName = computed<string>(() =>
  props.user.name.length > props.maxNameLength
    ? props.user.name.slice(0, props.maxNameLength) + '...'
    : props.user.name
)

const roleBadgeClass = computed<string>(() =>
  ({
    admin: 'badge-admin',
    editor: 'badge-editor',
    viewer: 'badge-viewer',
  }[props.user.role])
)
</script>

<template>
  <div :class="['user-card', { selected: isSelected }]" @click="emit('select', user)">
    <img :src="user.avatar ?? '/default.png'" :alt="user.name" />
    <h3>{{ truncatedName }}</h3>
    <span :class="['badge', roleBadgeClass]">{{ user.role }}</span>
    <p>{{ user.email }}</p>
    <button @click.stop="emit('delete', user.id)">Delete</button>
  </div>
</template>
```

```vue
<!-- GenericList.vue — generic component -->
<script setup lang="ts" generic="T extends { id: number | string }">
defineProps<{
  items: T[]
  isLoading?: boolean
  emptyMessage?: string
}>()

defineEmits<{
  select: [item: T]
  delete: [id: T['id']]
}>()
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <p v-else-if="!items.length">{{ emptyMessage ?? 'No items found.' }}</p>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        <!-- Parent controls how each item renders via scoped slot -->
        <slot :item="item" />
        <button @click="$emit('delete', item.id)">✕</button>
      </li>
    </ul>
  </div>
</template>
```

```vue
<!-- Parent using GenericList -->
<script setup lang="ts">
import { ref } from 'vue'
import GenericList from './GenericList.vue'

interface Product {
  id: number
  name: string
  price: number
}

const products = ref<Product[]>([
  { id: 1, name: 'Vue Shirt', price: 25 },
  { id: 2, name: 'Pinia Mug', price: 12 },
])

const handleSelect = (product: Product) => {
  console.log('Selected:', product.name)
}
</script>

<template>
  <!-- TypeScript knows item is Product here -->
  <GenericList :items="products" @select="handleSelect">
    <template #default="{ item }">
      <strong>{{ item.name }}</strong> — ${{ item.price }}
    </template>
  </GenericList>
</template>
```

```ts
// composables/useFetch.ts — typed composable
import { ref, watchEffect, toValue, type MaybeRefOrGetter } from 'vue'

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  watchEffect(async () => {
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    isLoading.value = true
    error.value = null
    data.value = null

    try {
      const res = await fetch(resolvedUrl)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = (await res.json()) as T
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      isLoading.value = false
    }
  })

  return { data, error, isLoading }
}
```

```vue
<!-- Using typed useFetch -->
<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

// data is typed as Ref<Post[] | null>
const { data: posts, isLoading, error } = useFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts'
)
</script>
```

```ts
// types/index.ts — shared type definitions
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

export interface Product {
  id: number
  name: string
  price: number
  category: string
  image?: string
  stock: number
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export type ID = number | string
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
```

## TypeScript Patterns Quick Reference

```ts
// Typing refs
const count = ref<number>(0)
const users = ref<User[]>([])
const selected = ref<User | null>(null)

// Typing reactive
const form = reactive<{ name: string; email: string }>({
  name: '',
  email: '',
})

// Typing computed
const fullName = computed<string>(() => `${user.firstName} ${user.lastName}`)

// Typing event handlers in template
// @click="(e: MouseEvent) => handleClick(e)"
```

## Review Q&A

**Q: When should I use `interface` vs `type` in TypeScript?**
A: `interface` is best for describing object shapes (extendable, merges with other interfaces). `type` is best for unions, intersections, and computed types. For Vue props and API response shapes, both work — `interface` is the conventional choice.

**Q: What is `withDefaults` and why do I need it with TypeScript?**
A: When you use `defineProps<Props>()` with a TypeScript interface, Vue can't infer default values from the type. `withDefaults(defineProps<Props>(), { ... })` is the way to add defaults to typed props.

**Q: Do I need to add types to everything?**
A: No. TypeScript infers types in many cases. `const count = ref(0)` already infers `Ref<number>`. Focus on adding explicit types where inference fails or where you want to enforce a contract — mainly props, emits, API responses, and composable return types.

**Q: How do I add TypeScript to an existing Vue project?**
A: Run `npm install -D typescript vue-tsc`, rename `.js` files to `.ts`, add `lang="ts"` to `<script setup>` blocks, and create a `tsconfig.json` (create-vue scaffolds this automatically).

## Examples Folder

- `examples/types.ts` — shared type definitions (User, Product, ApiResponse)
- `examples/useFetch.ts` — fully typed generic fetch composable
- `examples/UserCard.vue` — typed component with interfaces, withDefaults, typed emits

---

**Prev:** [Section 14 — State Management with Pinia](../Section%2014%20-%20State%20Management%20with%20Pinia/README.md)
**Next:** [Section 16 — UI & Styling](../Section%2016%20-%20UI%20and%20Styling/README.md)
