export default {
  id: 19,
  title: "المشروع الثاني: لوحة عرض المنتجات",
  titleEn: "Project 2: Products Dashboard",
  level: "تطبيق عملي",
  levelEn: "Hands-on Project",
  lessons: ["نظرة عامة على المشروع", "تصميم تخطيط اللوحة", "جلب المنتجات من API", "صفحة قائمة المنتجات", "صفحة تفاصيل المنتج", "بحث وفلترة", "نموذج إضافة منتج", "نموذج تعديل منتج", "حذف منتج", "حالات التحميل والأخطاء", "Pinia Store", "إعادة البناء النهائية"],
  lessonsEn: ["Project Overview", "Dashboard Layout", "Fetching Products from API", "Product List Page", "Product Details Page", "Search and Filter", "Add Product Form", "Edit Product Form", "Delete Product", "Loading and Error States", "Pinia Store", "Final Refactoring"],
  intro: "نبني لوحة إدارة منتجات كاملة — Vue Router لتعدد الصفحات، Axios للـ API، وPinia لإدارة الـ State.",
  introEn: "Build a full products dashboard — Vue Router for pages, Axios for the API, and Pinia for state management.",
  content: [
    { type: "heading", text: "📊 نظرة عامة على المشروع" },
    { type: "paragraph", text: "سنبني لوحة إدارة منتجات متعددة الصفحات تتضمن:" },
    { type: "list", items: ["قائمة المنتجات مع بحث وفلترة", "صفحة تفاصيل لكل منتج", "نموذج إضافة منتج جديد", "نموذج تعديل منتج موجود", "حذف مع تأكيد", "حالات تحميل skeleton"] },
    { type: "heading", text: "هيكل المشروع" },
    { type: "code", code: `src/
├── api/
│   ├── axios.js          # إعداد Axios
│   └── products.js       # Products API layer
├── components/
│   ├── ProductCard.vue
│   ├── ProductForm.vue
│   ├── SearchBar.vue
│   ├── SkeletonCard.vue
│   └── ConfirmModal.vue
├── stores/
│   └── useProductStore.js
├── views/
│   ├── ProductList.vue
│   ├── ProductDetail.vue
│   ├── AddProduct.vue
│   └── EditProduct.vue
└── router/
    └── index.js` },
    { type: "heading", text: "Products API Layer" },
    { type: "code", code: `// api/products.js
import api from './axios'

export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(\`/products/\${id}\`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(\`/products/\${id}\`, data),
  delete: (id) => api.delete(\`/products/\${id}\`),
}` },
    { type: "heading", text: "Products Store" },
    { type: "code", code: `// stores/useProductStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productsAPI } from '@/api/products'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const selectedCategory = ref('')

  const filteredProducts = computed(() => {
    return products.value.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = !selectedCategory.value || p.category === selectedCategory.value
      return matchesSearch && matchesCategory
    })
  })

  const categories = computed(() => [...new Set(products.value.map(p => p.category))])

  async function fetchProducts() {
    loading.value = true
    error.value = null
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

  return { products, loading, error, searchQuery, selectedCategory, filteredProducts, categories, fetchProducts, deleteProduct }
})` },
    { type: "heading", text: "ProductList View" },
    { type: "code", code: `<!-- views/ProductList.vue -->
<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

const store = useProductStore()
const { filteredProducts, loading, error, searchQuery, categories, selectedCategory } = storeToRefs(store)

onMounted(() => {
  if (store.products.length === 0) store.fetchProducts()
})
</script>

<template>
  <div class="products-page">
    <SearchBar v-model="searchQuery" />

    <select v-model="selectedCategory">
      <option value="">كل الفئات</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>

    <div v-if="loading" class="grid">
      <SkeletonCard v-for="i in 8" :key="i" />
    </div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else class="grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>` },
    { type: "heading", text: "ProductDetail View مع useRoute" },
    { type: "code", code: `<!-- views/ProductDetail.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productsAPI } from '@/api/products'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await productsAPI.getById(route.params.id)
    product.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">جارٍ التحميل...</div>
  <div v-else-if="product" class="product-detail">
    <img :src="product.image" :alt="product.title" />
    <h1>{{ product.title }}</h1>
    <p class="price">{{ product.price }} $</p>
    <p>{{ product.description }}</p>
    <button @click="router.back()">رجوع</button>
  </div>
</template>` },
    { type: "tip", text: "استخدم Skeleton Cards بدلاً من مؤشر تحميل بسيط — يُحسّن تجربة المستخدم ويُقلل من الإحساس ببطء التحميل." },
    { type: "heading", text: "✅ مراجعة المشروع" },
    { type: "qa", question: "لماذا نضع منطق الفلترة في الـ Pinia store بدلاً من الـ component؟", answer: "لأن حالة الفلترة (searchQuery, selectedCategory) تحتاجها صفحات متعددة — مثل القائمة والـ sidebar. وضعها في Store يجعلها مشتركة بين جميع الـ components." },
  ],
  contentEn: [
    { type: "heading", text: "📊 Project Overview" },
    { type: "list", items: ["Product list with search and filter", "Product detail page", "Add/edit/delete products", "Loading skeleton states", "Error handling"] },
    { type: "heading", text: "Products Store with Filtering" },
    { type: "code", code: `const filteredProducts = computed(() =>
  products.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || p.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
)` },
    { type: "heading", text: "✅ Project Review" },
    { type: "qa", question: "Why put filter logic in the Pinia store instead of the component?", answer: "Because filter state (searchQuery, selectedCategory) is needed by multiple pages. Storing it in Pinia makes it shared across all components without prop drilling." },
  ],
};
