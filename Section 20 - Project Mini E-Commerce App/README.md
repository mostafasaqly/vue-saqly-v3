# Section 20: Project 3 — Mini E-Commerce App

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Project Overview & Features |
| 2 | Route Structure & Layouts |
| 3 | Products Store & Cart Store |
| 4 | Products Page with Category Filter |
| 5 | Product Detail Page |
| 6 | Cart Drawer Component |
| 7 | Checkout Page & Form |
| 8 | Cart Persistence with localStorage |
| 9 | Order Summary & Thank You Page |
| 10 | Final Review & Deployment Prep |

## Project Overview

Build a **Mini E-Commerce App** — the most complete project in the course. It brings together routing (multi-layout, protected routes), Pinia (cart + auth stores), forms with validation, localStorage persistence, and a polished, multi-page UI.

### Features

- ✅ Home page with featured products
- ✅ Products listing with category tabs and sort
- ✅ Product detail page with add-to-cart
- ✅ Sliding cart drawer with quantity controls
- ✅ Cart badge in navbar (live count)
- ✅ Checkout form with validation
- ✅ Order summary before placing order
- ✅ Thank you / Order confirmation page
- ✅ Cart persists across reloads (localStorage)
- ✅ Empty state and loading state for all pages

## Project Structure

```
src/
├── api/
│   └── products.js           # Fake Store API calls
├── stores/
│   ├── useCartStore.js        # Cart items, total, persistence
│   └── useProductsStore.js   # Product catalog from API
├── composables/
│   └── useProductFilter.js   # Category + sort logic
├── components/
│   ├── AppNavbar.vue          # Navbar with cart badge
│   ├── CartDrawer.vue         # Slide-in cart panel
│   ├── CartItem.vue           # Single cart row
│   ├── ProductCard.vue        # Product grid card
│   └── CategoryTabs.vue      # Filter tabs
├── views/
│   ├── HomeView.vue           # Hero + featured products
│   ├── ProductsView.vue       # Full product listing
│   ├── ProductDetailView.vue  # Single product
│   ├── CartView.vue           # Cart summary page
│   ├── CheckoutView.vue       # Checkout form
│   └── ThankYouView.vue       # Order confirmation
├── layouts/
│   ├── DefaultLayout.vue      # With navbar + footer
│   └── CheckoutLayout.vue     # Minimal (no nav)
└── router/index.js
```

## Key Code

```js
// stores/useCartStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const stored = localStorage.getItem('cart')
  const items = ref(stored ? JSON.parse(stored) : [])

  // Persist on every change
  watch(items, (val) => localStorage.setItem('cart', JSON.stringify(val)), { deep: true })

  // Getters
  const itemCount = computed(() => items.value.reduce((n, i) => n + i.qty, 0))
  const subtotal = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))
  const shipping = computed(() => subtotal.value >= 50 ? 0 : 9.99)
  const total = computed(() => subtotal.value + shipping.value)
  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addItem = (product, qty = 1) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.qty += qty
    else items.value.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty })
  }

  const removeItem = (id) => { items.value = items.value.filter(i => i.id !== id) }

  const setQty = (id, qty) => {
    if (qty < 1) { removeItem(id); return }
    const item = items.value.find(i => i.id === id)
    if (item) item.qty = qty
  }

  const clearCart = () => { items.value = [] }

  return { items, itemCount, subtotal, shipping, total, isEmpty, addItem, removeItem, setQty, clearCart }
})
```

```vue
<!-- components/AppNavbar.vue — cart badge -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'

const { itemCount } = storeToRefs(useCartStore())
const emit = defineEmits(['open-cart'])
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="logo">VueShop</RouterLink>

    <div class="nav-links">
      <RouterLink to="/products">Products</RouterLink>
    </div>

    <button class="cart-btn" @click="emit('open-cart')">
      🛒
      <span v-if="itemCount" class="badge">{{ itemCount }}</span>
    </button>
  </nav>
</template>

<style scoped>
.navbar { display: flex; align-items: center; padding: 1rem 2rem; background: white; box-shadow: 0 1px 4px rgba(0,0,0,0.1); gap: 1rem; }
.logo { font-size: 1.5rem; font-weight: bold; color: #42b883; text-decoration: none; margin-right: auto; }
.cart-btn { position: relative; background: none; border: none; font-size: 1.5rem; cursor: pointer; }
.badge { position: absolute; top: -8px; right: -8px; background: #e53e3e; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; }
</style>
```

```vue
<!-- components/CartDrawer.vue — slide-in cart -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'

defineProps({ isOpen: Boolean })
defineEmits(['close'])

const cart = useCartStore()
const { items, itemCount, subtotal, shipping, total, isEmpty } = storeToRefs(cart)
const router = useRouter()

const goToCheckout = () => {
  cart
  router.push('/checkout')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="isOpen" class="overlay" @click.self="$emit('close')">
        <aside class="drawer">
          <header>
            <h2>Your Cart ({{ itemCount }})</h2>
            <button @click="$emit('close')">✕</button>
          </header>

          <div v-if="isEmpty" class="empty">
            <p>Your cart is empty.</p>
            <button @click="$emit('close')">Continue Shopping</button>
          </div>

          <ul v-else class="cart-items">
            <li v-for="item in items" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.title" />
              <div class="info">
                <p class="title">{{ item.title }}</p>
                <p class="price">${{ item.price.toFixed(2) }}</p>
                <div class="qty-ctrl">
                  <button @click="cart.setQty(item.id, item.qty - 1)">−</button>
                  <span>{{ item.qty }}</span>
                  <button @click="cart.setQty(item.id, item.qty + 1)">+</button>
                </div>
              </div>
              <button class="remove" @click="cart.removeItem(item.id)">✕</button>
            </li>
          </ul>

          <footer v-if="!isEmpty">
            <div class="summary">
              <div><span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span></div>
              <div><span>Shipping</span><span>{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span></div>
              <div class="total"><span>Total</span><strong>${{ total.toFixed(2) }}</strong></div>
              <p v-if="shipping > 0" class="free-shipping-hint">
                Add ${{ (50 - subtotal).toFixed(2) }} more for free shipping!
              </p>
            </div>
            <button @click="goToCheckout" class="checkout-btn">Proceed to Checkout</button>
            <button @click="cart.clearCart()" class="clear-btn">Clear Cart</button>
          </footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; }
.drawer { position: fixed; right: 0; top: 0; bottom: 0; width: 380px; background: white; display: flex; flex-direction: column; box-shadow: -4px 0 16px rgba(0,0,0,0.15); }
header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #eee; }
.cart-items { flex: 1; overflow-y: auto; padding: 0.5rem; list-style: none; margin: 0; }
.cart-item { display: flex; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid #f0f0f0; }
.cart-item img { width: 56px; height: 56px; object-fit: contain; }
.info { flex: 1; }
.title { font-size: 0.85rem; margin: 0 0 0.25rem; }
.price { color: #42b883; font-weight: bold; }
.qty-ctrl { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem; }
.qty-ctrl button { width: 24px; height: 24px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; }
footer { padding: 1rem; border-top: 1px solid #eee; }
.total { font-size: 1.1rem; border-top: 1px solid #eee; padding-top: 0.5rem; margin-top: 0.5rem; }
.checkout-btn { width: 100%; padding: 0.75rem; background: #42b883; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; margin-top: 0.75rem; }
.clear-btn { width: 100%; padding: 0.5rem; background: none; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; margin-top: 0.5rem; color: #e53e3e; }
.drawer-enter-active, .drawer-leave-active { transition: transform 0.3s; }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); }
.free-shipping-hint { font-size: 0.8rem; color: #42b883; margin-top: 0.25rem; }
</style>
```

```vue
<!-- views/CheckoutView.vue -->
<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'

const router = useRouter()
const cart = useCartStore()
const { items, total, isEmpty } = storeToRefs(cart)

// Redirect to products if cart is empty
if (isEmpty.value) router.replace('/products')

const form = reactive({
  firstName: '', lastName: '', email: '',
  address: '', city: '', country: '',
  cardNumber: '', expiry: '', cvv: '',
})

const errors = computed(() => {
  const e = {}
  if (!form.firstName.trim()) e.firstName = 'Required'
  if (!form.lastName.trim()) e.lastName = 'Required'
  if (!form.email.includes('@')) e.email = 'Valid email required'
  if (!form.address.trim()) e.address = 'Required'
  if (!form.city.trim()) e.city = 'Required'
  if (!form.country.trim()) e.country = 'Required'
  if (form.cardNumber.replace(/\s/g, '').length !== 16) e.cardNumber = '16-digit card number required'
  if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'MM/YY format required'
  if (form.cvv.length !== 3) e.cvv = '3-digit CVV required'
  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)
const isSubmitting = computed(() => false)

const placeOrder = async () => {
  if (!isValid.value) return
  // Simulate API call
  await new Promise(res => setTimeout(res, 800))
  cart.clearCart()
  router.push('/thank-you')
}
</script>

<template>
  <div class="checkout">
    <h1>Checkout</h1>
    <div class="checkout-layout">
      <form @submit.prevent="placeOrder">
        <section>
          <h3>Shipping Information</h3>
          <div class="row">
            <div class="field">
              <label>First Name</label>
              <input v-model="form.firstName" />
              <span class="err">{{ errors.firstName }}</span>
            </div>
            <div class="field">
              <label>Last Name</label>
              <input v-model="form.lastName" />
              <span class="err">{{ errors.lastName }}</span>
            </div>
          </div>
          <!-- ... more fields -->
        </section>

        <section>
          <h3>Payment</h3>
          <!-- card fields -->
        </section>

        <button type="submit" :disabled="!isValid" class="place-order-btn">
          Place Order — ${{ total.toFixed(2) }}
        </button>
      </form>

      <!-- Order summary sidebar -->
      <aside class="order-summary">
        <h3>Order Summary</h3>
        <ul>
          <li v-for="item in items" :key="item.id">
            {{ item.title }} × {{ item.qty }} — ${{ (item.price * item.qty).toFixed(2) }}
          </li>
        </ul>
        <p><strong>Total: ${{ total.toFixed(2) }}</strong></p>
      </aside>
    </div>
  </div>
</template>
```

## Skills Practiced

| Concept | Where used |
|---------|-----------|
| Multi-layout routing | `DefaultLayout` vs `CheckoutLayout` |
| Pinia with persistence | `useCartStore` with localStorage |
| `storeToRefs` | Navbar badge, CartDrawer, CheckoutView |
| Computed store getters | `subtotal`, `shipping`, `total`, `itemCount` |
| `<Teleport>` | CartDrawer rendered to `<body>` |
| `<Transition>` | Drawer slide animation |
| Form validation | CheckoutView — `computed` errors |
| Programmatic navigation | `router.push('/thank-you')` |
| `router.replace` | Redirect from checkout if cart empty |
| Scoped CSS | All components |

## Review Q&A

**Q: Why use a slide-in drawer for the cart instead of a separate page?**
A: A drawer lets the user see and edit the cart without losing their place in the product listing. It's a better UX pattern for e-commerce because users often want to keep browsing after adding an item.

**Q: How does the cart persist across page reloads?**
A: `useCartStore` uses a `watch` with `{ deep: true }` on the `items` ref. Every time the array or any item inside it changes, the updated cart is serialized to JSON and saved to `localStorage`. On store initialization, `localStorage.getItem('cart')` is parsed back into the ref.

**Q: Why redirect from CheckoutView when the cart is empty?**
A: A checkout page with no items is a broken state — there's nothing to order. Using `router.replace('/products')` prevents the user from landing on an empty checkout (e.g., after a manual URL entry) and removes the checkout from their history so Back doesn't return them to it.

## Examples Folder

No separate examples — the full project is built step by step in the course.

---

**Prev:** [Section 19 — Project 2: Products Dashboard](../Section%2019%20-%20Project%20Products%20Dashboard/README.md)
**Next:** [Section 21 — Testing Basics](../Section%2021%20-%20Testing%20Basics/README.md)
