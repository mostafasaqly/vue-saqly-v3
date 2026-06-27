# Section 19: Project 2 — Products Dashboard

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Project Overview & Features |
| 2 | Project & Route Setup |
| 3 | Products Store with Pinia |
| 4 | Axios Service Layer |
| 5 | Products List View with Pagination |
| 6 | Search & Filter Composable |
| 7 | Product Detail View |
| 8 | Add / Edit Product Modal |
| 9 | Delete Product with Confirmation |
| 10 | Loading Skeletons & Error States |
| 11 | Final Polish & Review |

## Project Overview

Build a **Products Dashboard** — a data-driven admin panel that consumes a REST API. This project focuses on Vue Router, Axios, Pinia for server-state, CRUD operations, search/filter, and multi-view navigation.

### Features

- ✅ Fetch and display products from an API
- ✅ Search products by name (debounced)
- ✅ Filter by category
- ✅ Sort by price / name
- ✅ Pagination (client-side or API-driven)
- ✅ Product detail page (dynamic route)
- ✅ Add new product (modal form)
- ✅ Edit existing product
- ✅ Delete product with confirmation dialog
- ✅ Loading skeletons and error states

## Project Structure

```
src/
├── api/
│   ├── axios.js              # Axios instance with base URL + interceptors
│   └── products.js           # Products API service (getAll, getById, create, update, delete)
├── stores/
│   └── useProductsStore.js   # Products state, getters, and async actions
├── composables/
│   ├── useApi.js             # Generic loading/error/data wrapper
│   └── useProductSearch.js   # Search, filter, sort logic
├── components/
│   ├── ProductCard.vue       # Product card for the grid
│   ├── ProductModal.vue      # Add/Edit product modal form
│   ├── ConfirmDialog.vue     # Reusable delete confirmation
│   ├── ProductSkeleton.vue   # Loading skeleton card
│   ├── SearchBar.vue         # Debounced search input
│   └── Pagination.vue        # Page navigation
├── views/
│   ├── ProductsView.vue      # Product list page
│   └── ProductDetailView.vue # Single product page
└── router/index.js
```

## Key Code

```js
// api/products.js
import api from './axios'

export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
}
```

```js
// stores/useProductsStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productsAPI } from '@/api/products'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const productCount = computed(() => products.value.length)

  // Actions
  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null
    try {
      products.value = await productsAPI.getAll()
      categories.value = await productsAPI.getCategories()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = async (data) => {
    const product = await productsAPI.create(data)
    products.value.unshift(product)
    return product
  }

  const updateProduct = async (id, data) => {
    const updated = await productsAPI.update(id, data)
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) products.value[index] = updated
    return updated
  }

  const deleteProduct = async (id) => {
    await productsAPI.delete(id)
    products.value = products.value.filter(p => p.id !== id)
  }

  return {
    products, categories, isLoading, error, productCount,
    fetchProducts, addProduct, updateProduct, deleteProduct,
  }
})
```

```js
// composables/useProductSearch.js
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/useProductsStore'

export function useProductSearch() {
  const store = useProductsStore()
  const { products } = storeToRefs(store)

  const search = ref('')
  const selectedCategory = ref('')
  const sortBy = ref('default')      // 'default' | 'price-asc' | 'price-desc' | 'name'

  const filteredProducts = computed(() => {
    let result = [...products.value]

    // Filter by search
    if (search.value.trim()) {
      const q = search.value.toLowerCase()
      result = result.filter(p => p.title.toLowerCase().includes(q))
    }

    // Filter by category
    if (selectedCategory.value) {
      result = result.filter(p => p.category === selectedCategory.value)
    }

    // Sort
    if (sortBy.value === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sortBy.value === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy.value === 'name') result.sort((a, b) => a.title.localeCompare(b.title))

    return result
  })

  const clearFilters = () => {
    search.value = ''
    selectedCategory.value = ''
    sortBy.value = 'default'
  }

  return { search, selectedCategory, sortBy, filteredProducts, clearFilters }
}
```

```vue
<!-- views/ProductsView.vue -->
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/useProductsStore'
import { useProductSearch } from '@/composables/useProductSearch'
import ProductCard from '@/components/ProductCard.vue'
import ProductSkeleton from '@/components/ProductSkeleton.vue'
import ProductModal from '@/components/ProductModal.vue'
import SearchBar from '@/components/SearchBar.vue'
import { ref } from 'vue'

const store = useProductsStore()
const { isLoading, error, categories } = storeToRefs(store)
const { search, selectedCategory, sortBy, filteredProducts, clearFilters } = useProductSearch()

onMounted(() => store.fetchProducts())

// Modal state
const showModal = ref(false)
const editingProduct = ref(null)

const openAdd = () => { editingProduct.value = null; showModal.value = true }
const openEdit = (product) => { editingProduct.value = product; showModal.value = true }

const handleSave = async (data) => {
  if (editingProduct.value) {
    await store.updateProduct(editingProduct.value.id, data)
  } else {
    await store.addProduct(data)
  }
  showModal.value = false
}
</script>

<template>
  <div class="products-view">
    <header>
      <h1>Products Dashboard</h1>
      <button @click="openAdd" class="btn-primary">+ Add Product</button>
    </header>

    <!-- Filters -->
    <div class="filters">
      <SearchBar v-model="search" placeholder="Search products..." />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <select v-model="sortBy">
        <option value="default">Sort: Default</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name">Name: A → Z</option>
      </select>
      <button v-if="selectedCategory || search" @click="clearFilters">Clear filters</button>
    </div>

    <!-- Results count -->
    <p class="results-count">{{ filteredProducts.length }} products</p>

    <!-- Error state -->
    <div v-if="error" class="error-banner">
      Failed to load products: {{ error }}
      <button @click="store.fetchProducts()">Retry</button>
    </div>

    <!-- Loading skeletons -->
    <div v-else-if="isLoading" class="product-grid">
      <ProductSkeleton v-for="i in 8" :key="i" />
    </div>

    <!-- Empty state -->
    <div v-else-if="!filteredProducts.length" class="empty">
      <p>No products match your search.</p>
      <button @click="clearFilters">Clear filters</button>
    </div>

    <!-- Product grid -->
    <div v-else class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @edit="openEdit(product)"
        @delete="store.deleteProduct(product.id)"
      />
    </div>

    <!-- Add/Edit Modal -->
    <ProductModal
      v-if="showModal"
      :product="editingProduct"
      @save="handleSave"
      @close="showModal = false"
    />
  </div>
</template>
```

## Vue Router Setup

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('@/views/ProductsView.vue'),
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: () => import('@/views/ProductDetailView.vue'),
    },
  ],
})
```

## Skills Practiced

| Concept | Where used |
|---------|-----------|
| Vue Router (dynamic routes) | `/products/:id` detail page |
| Pinia + async actions | `useProductsStore` |
| Axios service layer | `api/products.js` |
| Composables | `useProductSearch`, `useApi` |
| `computed` for filtering/sorting | `filteredProducts` |
| Props + emits | `ProductCard`, `ProductModal` |
| `v-if` error/loading/empty states | `ProductsView` |
| Scoped slots | `ProductModal` |
| Reusable components | `SearchBar`, `Pagination`, `ConfirmDialog` |

## Review Q&A

**Q: Why separate the search/filter logic into a composable instead of putting it in the view?**
A: The view is already managing modal state, loading state, and data fetching. Extracting search logic into `useProductSearch` keeps the view focused and makes the filter logic independently testable and reusable.

**Q: Why update the store's `products` array directly after CRUD instead of re-fetching?**
A: Re-fetching would cause a full loading state flash and an extra network round-trip. Optimistically updating the local array (adding/removing the item) gives instant feedback. If the API call fails, you should roll back the local change.

**Q: How does debouncing work in the `SearchBar` component?**
A: The search input updates a local `ref` immediately (for the UI), but only emits to the parent after a delay (e.g., 300ms) using `setTimeout` and clearing the previous timeout on each keystroke. This prevents firing a filter or API call on every single keypress.

## Examples Folder

No separate examples — the full project is built step by step in the course.

---

**Prev:** [Section 18 — Project 1: Task Manager App](../Section%2018%20-%20Project%20Task%20Manager%20App/README.md)
**Next:** [Section 20 — Project 3: Mini E-Commerce App](../Section%2020%20-%20Project%20Mini%20E-Commerce%20App/README.md)
