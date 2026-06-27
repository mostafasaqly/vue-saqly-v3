const t={id:20,title:"المشروع الثالث: تطبيق E-Commerce مصغّر",titleEn:"Project 3: Mini E-Commerce App",level:"تطبيق عملي",levelEn:"Hands-on Project",lessons:["نظرة عامة على المشروع","صفحة المنتجات","صفحة تفاصيل المنتج","Cart Store بـ Pinia","إضافة للسلة","تحديث الكمية","حذف من السلة","نموذج الدفع","ملخص الطلب","حفظ بيانات السلة","مراجعة المشروع النهائي"],lessonsEn:["Project Overview","Products Page","Product Details Page","Cart Store with Pinia","Add to Cart","Update Quantity","Remove from Cart","Checkout Form","Order Summary","Persisting Cart Data","Final Project Review"],intro:"المشروع الثالث والأكبر — متجر إلكتروني مصغّر يجمع كل مهارات الكورس: Vue Router + Pinia + Axios + Composition API.",introEn:"The biggest project — a mini e-commerce app combining all course skills: Vue Router + Pinia + Axios + Composition API.",content:[{type:"heading",text:"🛒 نظرة عامة على المشروع"},{type:"list",items:["صفحة منتجات مع بحث وفلترة","صفحة تفاصيل المنتج","سلة تسوق كاملة مع تحديث الكمية","نموذج checkout مع validation","ملخص الطلب","حفظ السلة في localStorage","رسالة تأكيد بعد الطلب"]},{type:"heading",text:"Cart Store الكامل"},{type:"code",code:`// stores/useCartStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(
    JSON.parse(localStorage.getItem('vue-cart') || '[]')
  )

  watch(items, (val) => {
    localStorage.setItem('vue-cart', JSON.stringify(val))
  }, { deep: true })

  const itemCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )

  const tax = computed(() => subtotal.value * 0.15)
  const total = computed(() => subtotal.value + tax.value)

  function addToCart(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }
  }

  function updateQty(id, qty) {
    if (qty < 1) { removeItem(id); return }
    const item = items.value.find(i => i.id === id)
    if (item) item.qty = qty
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clearCart() { items.value = [] }

  return { items, itemCount, subtotal, tax, total, addToCart, updateQty, removeItem, clearCart }
})`},{type:"heading",text:"CartIcon في الـ Navbar"},{type:"code",code:`<!-- components/CartIcon.vue -->
<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'
const { itemCount } = storeToRefs(useCartStore())
<\/script>

<template>
  <RouterLink to="/cart" class="cart-icon">
    🛒
    <span v-if="itemCount > 0" class="cart-badge">{{ itemCount }}</span>
  </RouterLink>
</template>`},{type:"heading",text:"Cart View"},{type:"code",code:`<!-- views/Cart.vue -->
<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const store = useCartStore()
const { items, subtotal, tax, total, itemCount } = storeToRefs(store)
const router = useRouter()
<\/script>

<template>
  <div class="cart-page">
    <h1>سلة التسوق ({{ itemCount }})</h1>

    <div v-if="items.length === 0" class="cart-empty">
      السلة فارغة 🛒
      <RouterLink to="/">تسوق الآن</RouterLink>
    </div>

    <div v-else>
      <div v-for="item in items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" />
        <div>
          <p>{{ item.title }}</p>
          <p class="price">{{ (item.price * item.qty).toFixed(2) }} $</p>
        </div>
        <div class="qty-controls">
          <button @click="store.updateQty(item.id, item.qty - 1)">-</button>
          <span>{{ item.qty }}</span>
          <button @click="store.updateQty(item.id, item.qty + 1)">+</button>
        </div>
        <button @click="store.removeItem(item.id)">🗑️</button>
      </div>

      <div class="cart-summary">
        <p>المجموع الفرعي: {{ subtotal.toFixed(2) }} $</p>
        <p>الضريبة (15%): {{ tax.toFixed(2) }} $</p>
        <p class="total">الإجمالي: {{ total.toFixed(2) }} $</p>
        <button @click="router.push('/checkout')">إتمام الشراء</button>
      </div>
    </div>
  </div>
</template>`},{type:"heading",text:"Checkout Form"},{type:"code",code:`<!-- views/Checkout.vue -->
<script setup>
import { reactive } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const form = reactive({
  name: '', email: '', phone: '',
  address: '', city: '', zip: '',
  paymentMethod: 'card',
})
const errors = reactive({})

function validate() {
  errors.name = form.name.length < 2 ? 'الاسم مطلوب' : ''
  errors.email = !/^[^@]+@[^@]+$/.test(form.email) ? 'بريد غير صالح' : ''
  errors.phone = form.phone.length < 10 ? 'رقم غير صالح' : ''
  errors.address = !form.address ? 'العنوان مطلوب' : ''
  return !Object.values(errors).some(Boolean)
}

async function submitOrder() {
  if (!validate()) return
  // إرسال الطلب للـ API...
  cart.clearCart()
  router.push('/order-success')
}
<\/script>`},{type:"tip",text:"هذا المشروع يُلخّص كل مهارات الكورس — احرص على إتمامه كاملاً وتطوير الـ UI بنفسك."},{type:"heading",text:"✅ مراجعة المشروع"},{type:"qa",question:"لماذا نحتاج watch مع deep: true لحفظ السلة في localStorage؟",answer:"لأن items هو مصفوفة من كائنات. watch العادية تكتشف فقط إعادة تعيين المصفوفة كاملة. deep: true تجعل Vue يراقب التغييرات الداخلية (تحديث qty، إضافة عنصر داخل المصفوفة)."}],contentEn:[{type:"heading",text:"🛒 Project Overview"},{type:"list",items:["Products page with search & filter","Product detail page","Full cart with quantity controls","Checkout form with validation","Order summary","localStorage cart persistence"]},{type:"heading",text:"Cart Store"},{type:"code",code:`export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('vue-cart') || '[]'))
  watch(items, (val) => localStorage.setItem('vue-cart', JSON.stringify(val)), { deep: true })

  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

  function addToCart(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.qty++
    else items.value.push({ ...product, qty: 1 })
  }

  return { items, total, addToCart }
})`},{type:"heading",text:"✅ Project Review"},{type:"qa",question:"Why do we need deep: true when watching the cart for localStorage?",answer:"Because items is an array of objects. A regular watch only detects full re-assignment. deep: true makes Vue watch internal changes (updating qty, adding items inside the array)."}]};export{t as default};
