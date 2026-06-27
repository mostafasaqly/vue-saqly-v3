export default {
  id: 19,
  title: "المشروع الثاني: لوحة عرض المنتجات",
  titleEn: "Project 2: Products Dashboard",
  level: "تطبيق عملي",
  levelEn: "Hands-on Project",
  lessons: [
    "نظرة عامة على المشروع",
    "هيكل المشروع والـ Router",
    "productsAPI — طبقة الـ Service",
    "useProductsStore — Pinia مع API",
    "useProductSearch — Composable",
    "ProductsView — القائمة مع بحث وفلترة",
    "ProductDetailView — صفحة التفاصيل",
    "ProductFormView — نموذج الإضافة والتعديل",
    "Skeleton Loading",
    "مهارات تطبّقها في هذا المشروع",
  ],
  lessonsEn: [
    "Project Overview",
    "Project Structure & Router",
    "productsAPI — Service Layer",
    "useProductsStore — Pinia with API",
    "useProductSearch Composable",
    "ProductsView — List with Search & Filter",
    "ProductDetailView — Detail Page",
    "ProductFormView — Add/Edit Form",
    "Skeleton Loading",
    "Skills Practiced in This Project",
  ],
  intro: "نبني لوحة إدارة منتجات متعددة الصفحات — Vue Router لتعدد الصفحات، Axios للـ API، وPinia لإدارة الـ State.",
  introEn: "Build a full multi-page products dashboard — Vue Router for navigation, Axios for APIs, and Pinia for state management.",
  content: [
    { type: "heading", text: "📊 نظرة عامة على المشروع" },
    { type: "paragraph", text: "لوحة إدارة منتجات متعددة الصفحات بالميزات التالية:" },
    { type: "list", items: [
      "قائمة منتجات مع بحث فوري وفلترة بالفئة",
      "صفحة تفاصيل لكل منتج",
      "نموذج إضافة منتج جديد",
      "نموذج تعديل منتج موجود",
      "حذف مع تأكيد",
      "Skeleton Loading بدلاً من spinner",
      "Error handling احترافي",
      "Pinia Store مع API integration",
    ]},
    { type: "heading", text: "هيكل المشروع والـ Router" },
    { type: "code", code: `src/
├── api/
│   ├── axios.js
│   └── products.js        # Products API service
├── components/
│   ├── ProductCard.vue    # بطاقة المنتج
│   ├── SkeletonCard.vue   # Loading skeleton
│   └── ConfirmModal.vue   # تأكيد الحذف
├── composables/
│   └── useProductSearch.js # بحث وفلترة
├── stores/
│   └── useProductsStore.js
└── views/
    ├── ProductsView.vue   # قائمة المنتجات
    ├── ProductDetailView.vue
    └── ProductFormView.vue # إضافة / تعديل` },
    { type: "code", code: `// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'products',
      component: () => import('@/views/ProductsView.vue'),
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('@/views/ProductDetailView.vue'),
    },
    {
      path: '/products/new',
      name: 'add-product',
      component: () => import('@/views/ProductFormView.vue'),
    },
    {
      path: '/products/:id/edit',
      name: 'edit-product',
      component: () => import('@/views/ProductFormView.vue'),
    },
  ],
})` },
    { type: "heading", text: "productsAPI — طبقة الـ Service" },
    { type: "code", code: `// api/products.js
import api from './axios'

export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(\`/products/\${id}\`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(\`/products/\${id}\`, data),
  delete: (id) => api.delete(\`/products/\${id}\`),
  getCategories: () => api.get('/products/categories'),
}` },
    { type: "heading", text: "useProductsStore — Pinia مع API" },
    { type: "code", code: `// stores/useProductsStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productsAPI } from '@/api/products'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const productMap = computed(() =>
    Object.fromEntries(products.value.map(p => [p.id, p]))
  )

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const { data } = await productsAPI.getAll()
      products.value = data
    } catch (e) {
      error.value = e.response?.data?.message || e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    const { data } = await productsAPI.getCategories()
    categories.value = data
  }

  async function deleteProduct(id) {
    await productsAPI.delete(id)
    products.value = products.value.filter(p => p.id !== id)
  }

  async function createProduct(data) {
    const { data: newProduct } = await productsAPI.create(data)
    products.value.unshift(newProduct)
    return newProduct
  }

  async function updateProduct(id, data) {
    const { data: updated } = await productsAPI.update(id, data)
    const idx = products.value.findIndex(p => p.id === id)
    if (idx !== -1) products.value[idx] = updated
    return updated
  }

  return {
    products, categories, loading, error, productMap,
    fetchProducts, fetchCategories, deleteProduct, createProduct, updateProduct,
  }
})` },
    { type: "heading", text: "useProductSearch — Composable" },
    { type: "code", code: `// composables/useProductSearch.js
import { ref, computed } from 'vue'

export function useProductSearch(products) {
  const search = ref('')
  const selectedCategory = ref('')
  const sortBy = ref('default')
  const minPrice = ref(0)
  const maxPrice = ref(Infinity)

  const filtered = computed(() => {
    let result = products.value

    if (search.value.trim()) {
      const q = search.value.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }

    if (selectedCategory.value) {
      result = result.filter(p => p.category === selectedCategory.value)
    }

    result = result.filter(p => p.price >= minPrice.value && p.price <= maxPrice.value)

    return [...result].sort((a, b) => {
      if (sortBy.value === 'price-asc') return a.price - b.price
      if (sortBy.value === 'price-desc') return b.price - a.price
      if (sortBy.value === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0)
      return 0 // default
    })
  })

  function reset() {
    search.value = ''
    selectedCategory.value = ''
    sortBy.value = 'default'
    minPrice.value = 0
    maxPrice.value = Infinity
  }

  return { search, selectedCategory, sortBy, minPrice, maxPrice, filtered, reset }
}` },
    { type: "heading", text: "ProductsView — القائمة" },
    { type: "code", code: `<!-- views/ProductsView.vue -->
<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/useProductsStore'
import { useProductSearch } from '@/composables/useProductSearch'
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

const store = useProductsStore()
const { products, categories, loading, error } = storeToRefs(store)
const { search, selectedCategory, sortBy, filtered } = useProductSearch(products)

onMounted(async () => {
  if (!products.value.length) await store.fetchProducts()
  if (!categories.value.length) await store.fetchCategories()
})
</script>

<template>
  <div class="products-page">
    <header class="page-header">
      <h1>المنتجات</h1>
      <RouterLink :to="{ name: 'add-product' }" class="btn btn--primary">+ إضافة</RouterLink>
    </header>

    <div class="filters">
      <input v-model="search" placeholder="ابحث عن منتج..." class="search-input" />
      <select v-model="selectedCategory">
        <option value="">كل الفئات</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <select v-model="sortBy">
        <option value="default">الافتراضي</option>
        <option value="price-asc">السعر: الأقل</option>
        <option value="price-desc">السعر: الأعلى</option>
        <option value="rating">الأعلى تقييماً</option>
      </select>
    </div>

    <p v-if="!loading">{{ filtered.length }} منتج</p>

    <div class="products-grid">
      <template v-if="loading">
        <SkeletonCard v-for="i in 8" :key="i" />
      </template>
      <template v-else-if="error">
        <p class="error">{{ error }}</p>
        <button @click="store.fetchProducts">إعادة المحاولة</button>
      </template>
      <template v-else>
        <ProductCard
          v-for="product in filtered"
          :key="product.id"
          :product="product"
          @delete="store.deleteProduct(product.id)"
        />
      </template>
    </div>
  </div>
</template>` },
    { type: "heading", text: "مهارات تطبّقها في هذا المشروع" },
    { type: "list", items: [
      "Vue Router — lazy-loaded routes، dynamic params، programmatic navigation",
      "Axios service layer — getAll، getById، create، update، delete",
      "Pinia store — API integration وcomputedMap للوصول السريع للمنتجات",
      "Composable — useProductSearch فصل منطق البحث عن الـ view",
      "Skeleton Loading — بدلاً من spinner بسيط",
      "Error handling — رسائل واضحة وزر retry",
      "onBeforeRouteUpdate — إعادة جلب بيانات عند تغيير الـ ID",
    ]},
    { type: "heading", text: "✅ مراجعة المشروع" },
    { type: "qa", question: "لماذا نضع منطق الفلترة في Composable بدلاً من الـ Pinia Store؟", answer: "لأن الفلترة هي منطق عرض (presentation logic) — لا تُغير البيانات الأصلية، فقط تشتق منها. Store يجب أن يتعامل مع CRUD والـ API. Composable أنسب لمنطق UI مثل البحث والفرز لأنه يمكن إعادة استخدامه في أي view." },
    { type: "qa", question: "لماذا نستخدم router/index.js بدلاً من إعداد الـ routes في main.js؟", answer: "فصل المسؤوليات — الـ router له ملفه الخاص يُسهّل إدارة الـ routes وإضافة guards. main.js يبقى صغيراً وواضحاً. أيضاً يسمح بـ import الـ router في composables وstores بدون circular imports." },
    { type: "cta", text: "هل تريد مشاريع أكثر تعقيداً مع تدريب مخصص؟", linkLabel: "تواصل معنا →", link: "https://saqly.com/individual-training" },
  ],
  contentEn: [
    { type: "heading", text: "📊 Project Overview" },
    { type: "list", items: [
      "Product list with instant search and category filter",
      "Product detail page",
      "Add/edit product form (shared view)",
      "Delete with confirmation modal",
      "Skeleton loading cards",
      "Professional error handling with retry",
    ]},
    { type: "heading", text: "useProductsStore" },
    { type: "code", code: `// stores/useProductsStore.js
export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchProducts() {
    loading.value = true
    try {
      const { data } = await productsAPI.getAll()
      products.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(id) {
    await productsAPI.delete(id)
    products.value = products.value.filter(p => p.id !== id)
  }

  return { products, loading, error, fetchProducts, deleteProduct }
})` },
    { type: "heading", text: "useProductSearch Composable" },
    { type: "code", code: `// composables/useProductSearch.js
export function useProductSearch(products) {
  const search = ref('')
  const selectedCategory = ref('')
  const sortBy = ref('default')

  const filtered = computed(() => {
    let result = products.value
    if (search.value) result = result.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()))
    if (selectedCategory.value) result = result.filter(p => p.category === selectedCategory.value)
    return [...result].sort((a, b) => {
      if (sortBy.value === 'price-asc') return a.price - b.price
      if (sortBy.value === 'price-desc') return b.price - a.price
      return 0
    })
  })

  return { search, selectedCategory, sortBy, filtered }
}` },
    { type: "heading", text: "Skills Practiced" },
    { type: "list", items: [
      "Vue Router — lazy-loaded routes, dynamic params, programmatic navigation",
      "Axios service layer — full CRUD operations",
      "Pinia store — API integration with computed map for quick lookup",
      "Composable — useProductSearch separates search logic from the view",
      "Skeleton loading — better UX than a plain spinner",
      "Error handling — clear messages with retry button",
    ]},
    { type: "heading", text: "✅ Project Review" },
    { type: "qa", question: "Why put filter logic in a Composable instead of the Pinia Store?", answer: "Filtering is presentation logic — it doesn't change the original data, just derives from it. The store should handle CRUD and API calls. A Composable is better for UI logic like search/sort because it can be reused in any view." },
    { type: "cta", text: "Want more complex projects with personalized training?", linkLabel: "Contact Us →", link: "https://saqly.com/individual-training" },
  ],
};
