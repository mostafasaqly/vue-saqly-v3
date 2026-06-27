# Section 14: State Management with Pinia

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | When Do You Need State Management? |
| 2 | Installing Pinia |
| 3 | Setup Store — Modern Style |
| 4 | State, Getters & Actions |
| 5 | storeToRefs — Preserving Reactivity |
| 6 | Composing Stores (store calling store) |
| 7 | Cart Store Example |
| 8 | Persistence with localStorage |
| 9 | Pinia DevTools |

## Key Concepts

- **State management** — When multiple unrelated components need the same data, passing props and emitting events becomes cumbersome. A store is a centralized, reactive data source any component can read and write.
- **Pinia** — The official Vue 3 state management library. Replaces Vuex. Simpler API, better TypeScript support, no mutations — just state and actions.
- **`defineStore(id, setup)`** — Creates a store. The `id` is a unique string key used by DevTools. The `setup` function works like `<script setup>` — return what you want to expose.
- **Setup Store** — Write the store exactly like a composable: `ref` for state, `computed` for getters, plain functions for actions. No special `state()`, `getters`, `mutations` syntax.
- **`storeToRefs`** — When you destructure a store, computed and ref values lose reactivity. `storeToRefs(store)` wraps them as refs so they stay reactive. Methods/actions should be destructured directly from the store (not via `storeToRefs`).
- **Persistence** — Watch the state and sync to `localStorage` so it survives page reloads.

## Code Reference

```js
// src/stores/useCounterStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // ── State ──────────────────────────────────────
  const count = ref(0)

  // ── Getters (computed) ─────────────────────────
  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)

  // ── Actions (plain functions) ──────────────────
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => { count.value = 0 }
  const incrementBy = (amount) => { count.value += amount }

  return { count, doubleCount, isPositive, increment, decrement, reset, incrementBy }
})
```

```js
// src/stores/useCartStore.js — real-world cart store
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Load initial state from localStorage
  const stored = localStorage.getItem('cart')
  const items = ref(stored ? JSON.parse(stored) : [])

  // Persist to localStorage whenever items change
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
  }, { deep: true })

  // Getters
  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )
  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addItem = (product) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(i => i.id !== productId)
  }

  const updateQty = (productId, qty) => {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      if (qty <= 0) removeItem(productId)
      else item.qty = qty
    }
  }

  const clearCart = () => { items.value = [] }

  return {
    items, itemCount, total, isEmpty,
    addItem, removeItem, updateQty, clearCart
  }
})
```

```js
// src/stores/useAuthStore.js — auth store with API actions
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usersAPI } from '@/api/users'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') ?? 'null'))
  const token = ref(localStorage.getItem('token') ?? null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = async (credentials) => {
    const res = await usersAPI.login(credentials)
    user.value = res.user
    token.value = res.token
    localStorage.setItem('user', JSON.stringify(res.user))
    localStorage.setItem('token', res.token)
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { user, token, isAuthenticated, isAdmin, login, logout }
})
```

```vue
<!-- CartButton.vue — using the cart store -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'

const cart = useCartStore()

// ✅ Destructure reactive state and getters via storeToRefs
const { items, itemCount, total, isEmpty } = storeToRefs(cart)

// ✅ Destructure methods directly from the store (no storeToRefs needed)
const { addItem, removeItem, updateQty, clearCart } = cart
</script>

<template>
  <div class="cart">
    <h3>Cart ({{ itemCount }} items)</h3>

    <p v-if="isEmpty">Your cart is empty.</p>

    <ul v-else>
      <li v-for="item in items" :key="item.id">
        <span>{{ item.name }}</span>
        <span>${{ item.price }}</span>
        <div class="qty">
          <button @click="updateQty(item.id, item.qty - 1)">−</button>
          <span>{{ item.qty }}</span>
          <button @click="updateQty(item.id, item.qty + 1)">+</button>
        </div>
        <button @click="removeItem(item.id)">Remove</button>
      </li>
    </ul>

    <div v-if="!isEmpty" class="total">
      <strong>Total: ${{ total.toFixed(2) }}</strong>
      <button @click="clearCart">Clear Cart</button>
    </div>
  </div>
</template>
```

```vue
<!-- ProductCard.vue — using cart store from a different component -->
<script setup>
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: { type: Object, required: true },
})

const cart = useCartStore()
</script>

<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" />
    <h4>{{ product.name }}</h4>
    <p>${{ product.price }}</p>
    <button @click="cart.addItem(product)">Add to Cart</button>
  </div>
</template>
```

## Pinia vs Vuex

| | Pinia | Vuex 4 |
|--|-------|--------|
| Mutations | ✗ Not needed | ✅ Required |
| TypeScript | ✅ Excellent | ✗ Verbose |
| DevTools | ✅ Full support | ✅ Full support |
| Setup style | ✅ Like `<script setup>` | ✗ Options-style only |
| Multiple stores | ✅ One file per domain | ✗ Namespaced modules |
| Bundle size | Smaller | Larger |

## Review Q&A

**Q: Why do we use `storeToRefs` instead of regular destructuring?**
A: Regular destructuring from the store extracts static copies of the values at that moment — they won't update when the store changes. `storeToRefs(store)` converts each state and getter to a reactive ref that stays in sync with the store. Note: actions are plain functions, not refs, so you destructure them directly from the store.

**Q: What is the difference between Pinia and Vuex?**
A: Pinia is simpler — no mutations, better TypeScript support, works like a composable, and is organized as one store per file rather than nested modules. It's the official replacement for Vuex in Vue 3.

**Q: When do you actually need a store vs just composables?**
A: A composable creates a new instance of state each time it's called. A Pinia store is a singleton — one shared instance across all components. Use a store when multiple unrelated components need to read and write the same data (cart, auth, notifications). Use composables for component-local stateful logic.

**Q: Can one store use another store?**
A: Yes. Inside an action in `storeA`, call `const storeB = useStoreBStore()` — it works because Pinia stores are lazy singletons. There is no circular dependency issue as long as you call `useOtherStore()` inside a function (not at the top level of the setup).

## Examples Folder

- `examples/stores/` — counter store, cart store, auth store

---

**Prev:** [Section 13 — HTTP & APIs](../Section%2013%20-%20HTTP%20and%20APIs/README.md)
**Next:** [Section 15 — TypeScript with Vue](../Section%2015%20-%20TypeScript%20with%20Vue/README.md)
