const t={id:20,title:"المشروع الثالث: تطبيق E-Commerce مصغّر",titleEn:"Project 3: Mini E-Commerce App",level:"تطبيق عملي",levelEn:"Hands-on Project",lessons:["نظرة عامة على المشروع والميزات","هيكل المشروع والـ Router","useCartStore — Pinia للسلة","Cart icon مع badge في الـ Navbar","ProductCard مع زر Add to Cart","CartView — صفحة السلة الكاملة","Checkout Form مع Validation","Order Success Page","استمرارية السلة في localStorage","مهارات تطبّقها في هذا المشروع"],lessonsEn:["Project Overview & Features","Project Structure & Router","useCartStore — Pinia for Cart","Cart Icon with Badge in Navbar","ProductCard with Add to Cart","CartView — Full Cart Page","Checkout Form with Validation","Order Success Page","Cart Persistence with localStorage","Skills Practiced in This Project"],intro:"المشروع الثالث والأكبر — متجر إلكتروني مصغّر يجمع كل مهارات الكورس: Vue Router + Pinia + Axios + Composition API.",introEn:"The biggest project — a mini e-commerce app combining all course skills: Vue Router + Pinia + Axios + Composition API.",content:[{type:"heading",text:"🛒 نظرة عامة على المشروع"},{type:"list",items:["صفحة منتجات مع بحث وفلترة بالفئة","صفحة تفاصيل المنتج مع تحديد الكمية","سلة تسوق كاملة مع تحديث الكمية والحذف","نموذج Checkout مع validation كامل","ملخص الطلب مع حساب الضريبة","صفحة Order Success بعد الطلب","حفظ السلة تلقائياً في localStorage"]},{type:"heading",text:"هيكل المشروع والـ Router"},{type:"code",code:`src/
├── api/
│   └── products.js
├── components/
│   ├── NavBar.vue          # شريط التنقل مع Cart Badge
│   ├── CartIcon.vue        # أيقونة السلة
│   └── ProductCard.vue     # بطاقة المنتج مع Add to Cart
├── stores/
│   ├── useProductsStore.js
│   └── useCartStore.js     # ★ المحور الأساسي للمشروع
└── views/
    ├── HomeView.vue         # قائمة المنتجات
    ├── ProductView.vue      # تفاصيل المنتج
    ├── CartView.vue         # السلة
    ├── CheckoutView.vue     # نموذج الدفع
    └── OrderSuccessView.vue # تأكيد الطلب`},{type:"code",code:`// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/products/:id', name: 'product', component: () => import('@/views/ProductView.vue') },
    { path: '/cart', name: 'cart', component: () => import('@/views/CartView.vue') },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
      // guard: لا يدخل للـ checkout إذا السلة فارغة
      beforeEnter(to, from) {
        const cart = useCartStore()
        if (!cart.items.length) return { name: 'home' }
      },
    },
    { path: '/order-success', name: 'order-success', component: () => import('@/views/OrderSuccessView.vue') },
  ],
})`},{type:"heading",text:"useCartStore — Pinia الكامل"},{type:"code",code:`// stores/useCartStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // حمّل من localStorage أو مصفوفة فارغة
  const items = ref(
    JSON.parse(localStorage.getItem('vue-cart') || '[]')
  )

  // حفظ تلقائي في كل تغيير
  watch(items, (val) => {
    localStorage.setItem('vue-cart', JSON.stringify(val))
  }, { deep: true })

  // Getters
  const itemCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )
  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )
  const tax = computed(() => subtotal.value * 0.15)
  const shipping = computed(() => subtotal.value > 100 ? 0 : 9.99)
  const total = computed(() => subtotal.value + tax.value + shipping.value)

  // Actions
  function addToCart(product, qty = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty,
      })
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

  function clearCart() {
    items.value = []
  }

  return {
    items, itemCount, subtotal, tax, shipping, total,
    addToCart, updateQty, removeItem, clearCart,
  }
})`},{type:"heading",text:"CartIcon في الـ Navbar"},{type:"code",code:`<!-- components/CartIcon.vue -->
<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'

const { itemCount } = storeToRefs(useCartStore())
<\/script>

<template>
  <RouterLink to="/cart" class="cart-icon" aria-label="سلة التسوق">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>

    <!-- Badge يظهر فقط عندما يكون في السلة عناصر -->
    <Transition name="bounce">
      <span v-if="itemCount > 0" class="cart-badge">
        {{ itemCount > 99 ? '99+' : itemCount }}
      </span>
    </Transition>
  </RouterLink>
</template>

<style scoped>
.cart-icon { position: relative; display: inline-flex; }
.cart-badge {
  position: absolute;
  top: -8px; right: -8px;
  background: #e53e3e;
  color: white;
  border-radius: 999px;
  min-width: 20px; height: 20px;
  font-size: 11px;
  display: flex; align-items: center; justify-content: center;
}
.bounce-enter-active { animation: bounce .3s; }
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.4); }
}
</style>`},{type:"heading",text:"CartView — صفحة السلة"},{type:"code",code:`<!-- views/CartView.vue -->
<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const store = useCartStore()
const { items, subtotal, tax, shipping, total, itemCount } = storeToRefs(store)
const router = useRouter()
<\/script>

<template>
  <div class="cart-page">
    <h1>سلة التسوق ({{ itemCount }})</h1>

    <!-- السلة فارغة -->
    <div v-if="!items.length" class="cart-empty">
      <p>سلتك فارغة 🛒</p>
      <RouterLink to="/" class="btn btn--primary">تسوق الآن</RouterLink>
    </div>

    <div v-else class="cart-layout">
      <!-- قائمة المنتجات -->
      <TransitionGroup name="cart-item" tag="ul" class="cart-items">
        <li v-for="item in items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" class="cart-item__img" />
          <div class="cart-item__info">
            <p class="cart-item__title">{{ item.title }}</p>
            <p class="cart-item__price">{{ (item.price * item.qty).toFixed(2) }} $</p>
          </div>

          <!-- التحكم بالكمية -->
          <div class="qty-ctrl">
            <button @click="store.updateQty(item.id, item.qty - 1)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="store.updateQty(item.id, item.qty + 1)">+</button>
          </div>

          <button class="remove-btn" @click="store.removeItem(item.id)" title="حذف">🗑️</button>
        </li>
      </TransitionGroup>

      <!-- ملخص السلة -->
      <aside class="cart-summary">
        <h2>ملخص الطلب</h2>
        <div class="summary-row"><span>المجموع الفرعي</span><span>{{ subtotal.toFixed(2) }} $</span></div>
        <div class="summary-row"><span>الضريبة (15%)</span><span>{{ tax.toFixed(2) }} $</span></div>
        <div class="summary-row">
          <span>الشحن</span>
          <span>{{ shipping === 0 ? 'مجاني 🎉' : shipping.toFixed(2) + ' $' }}</span>
        </div>
        <div class="summary-row summary-total"><span>الإجمالي</span><strong>{{ total.toFixed(2) }} $</strong></div>

        <p v-if="subtotal < 100" class="free-shipping-hint">
          أضف {{ (100 - subtotal).toFixed(2) }}$ للحصول على شحن مجاني!
        </p>

        <button @click="router.push('/checkout')" class="btn btn--primary btn--full">
          إتمام الشراء →
        </button>
        <button @click="store.clearCart" class="btn btn--ghost btn--full">
          إفراغ السلة
        </button>
      </aside>
    </div>
  </div>
</template>`},{type:"heading",text:"Checkout Form مع Validation"},{type:"code",code:`<!-- views/CheckoutView.vue -->
<script setup>
import { reactive, ref } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()
const submitting = ref(false)

const form = reactive({
  name: '', email: '', phone: '',
  address: '', city: '', zip: '',
  paymentMethod: 'card',  // 'card' | 'cod'
})

const errors = reactive({
  name: '', email: '', phone: '', address: '', city: '', zip: '',
})

const rules = {
  name: v => v.length >= 2 || 'الاسم يجب أن يكون حرفين على الأقل',
  email: v => /^[^@s]+@[^@s]+.[^@s]+$/.test(v) || 'بريد إلكتروني غير صالح',
  phone: v => /^[0-9+]{9,15}$/.test(v) || 'رقم هاتف غير صالح',
  address: v => v.length >= 5 || 'العنوان مطلوب',
  city: v => v.length >= 2 || 'المدينة مطلوبة',
  zip: v => /^[0-9]{4,6}$/.test(v) || 'الرمز البريدي غير صالح',
}

function validateField(field) {
  const result = rules[field](form[field])
  errors[field] = result === true ? '' : result
}

function validateAll() {
  Object.keys(rules).forEach(validateField)
  return !Object.values(errors).some(Boolean)
}

async function submitOrder() {
  if (!validateAll()) return
  submitting.value = true
  try {
    // محاكاة إرسال الطلب
    await new Promise(r => setTimeout(r, 1500))
    cart.clearCart()
    router.push({ name: 'order-success' })
  } finally {
    submitting.value = false
  }
}
<\/script>

<template>
  <form class="checkout-form" @submit.prevent="submitOrder">
    <h1>إتمام الشراء</h1>

    <section>
      <h2>بيانات المشتري</h2>
      <div class="form-group">
        <label>الاسم الكامل</label>
        <input v-model="form.name" @blur="validateField('name')" :class="{ error: errors.name }" />
        <p class="error-msg" v-if="errors.name">{{ errors.name }}</p>
      </div>
      <div class="form-group">
        <label>البريد الإلكتروني</label>
        <input v-model="form.email" type="email" @blur="validateField('email')" :class="{ error: errors.email }" />
        <p class="error-msg" v-if="errors.email">{{ errors.email }}</p>
      </div>
    </section>

    <section>
      <h2>طريقة الدفع</h2>
      <label><input type="radio" v-model="form.paymentMethod" value="card" /> بطاقة ائتمانية</label>
      <label><input type="radio" v-model="form.paymentMethod" value="cod" /> الدفع عند الاستلام</label>
    </section>

    <button type="submit" class="btn btn--primary" :disabled="submitting">
      {{ submitting ? 'جارٍ إرسال الطلب...' : 'تأكيد الطلب' }}
    </button>
  </form>
</template>`},{type:"heading",text:"مهارات تطبّقها في هذا المشروع"},{type:"list",items:["Pinia — useCartStore: computed للمجاميع، watch deep للـ localStorage persistence","Navigation Guard — منع الوصول للـ checkout بسلة فارغة","Form Validation — rules object، blur-based validation، error display","Transition/TransitionGroup — bounce على badge، animation عند حذف عنصر","storeToRefs — destructuring reactivity من الـ store","computed مشتقة — tax، shipping، total من subtotal","Vue Router — programmatic navigation بعد إتمام الطلب"]},{type:"heading",text:"✅ مراجعة المشروع"},{type:"qa",question:"لماذا نستخدم watch مع deep: true لحفظ السلة في localStorage؟",answer:"لأن items هو مصفوفة من كائنات. watch العادي يكتشف فقط إعادة تعيين المصفوفة نفسها. deep: true يجعل Vue يراقب التغييرات الداخلية — تحديث qty، إضافة عنصر جديد، حذف عنصر."},{type:"qa",question:"لماذا نستخدم Navigation Guard للـ /checkout route؟",answer:"لمنع المستخدم من الوصول لصفحة الدفع مباشرة عبر URL وهو لا يملك عناصر في السلة. الـ guard يفحص cart.items.length — إذا كان صفراً يُعيد توجيهه للصفحة الرئيسية."},{type:"qa",question:"ما فائدة تفصيل الـ Validation إلى rules object؟",answer:"يجعل قواعد التحقق مجمّعة وقابلة للقراءة. بدلاً من if/else متكررة، نستخدم Object.keys(rules).forEach() للتحقق من كل الحقول في دالة واحدة. يسهّل إضافة حقول جديدة ومعدّل القواعد."},{type:"cta",text:"أتقنت بناء مشاريع Vue احترافية — للارتقاء إلى المستوى التالي:",linkLabel:"تدريب مخصص →",link:"https://saqly.com/individual-training"}],contentEn:[{type:"heading",text:"🛒 Project Overview"},{type:"list",items:["Products page with search & category filter","Product detail page with quantity picker","Full cart with quantity controls","Checkout form with validation","Tax and shipping calculation","Order success page","localStorage cart persistence"]},{type:"heading",text:"Cart Store"},{type:"code",code:`// stores/useCartStore.js
export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('vue-cart') || '[]'))

  watch(items, (val) => localStorage.setItem('vue-cart', JSON.stringify(val)), { deep: true })

  const subtotal = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))
  const tax = computed(() => subtotal.value * 0.15)
  const shipping = computed(() => subtotal.value > 100 ? 0 : 9.99)
  const total = computed(() => subtotal.value + tax.value + shipping.value)
  const itemCount = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))

  function addToCart(product, qty = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.qty += qty
    else items.value.push({ ...product, qty })
  }

  function updateQty(id, qty) {
    if (qty < 1) { removeItem(id); return }
    const item = items.value.find(i => i.id === id)
    if (item) item.qty = qty
  }

  function removeItem(id) { items.value = items.value.filter(i => i.id !== id) }
  function clearCart() { items.value = [] }

  return { items, subtotal, tax, shipping, total, itemCount, addToCart, updateQty, removeItem, clearCart }
})`},{type:"heading",text:"Checkout Validation"},{type:"code",code:`const rules = {
  name: v => v.length >= 2 || 'Name must be at least 2 characters',
  email: v => /^[^@s]+@[^@s]+.[^@s]+$/.test(v) || 'Invalid email',
  phone: v => /^[0-9+]{9,15}$/.test(v) || 'Invalid phone number',
}

function validateAll() {
  Object.keys(rules).forEach(field => {
    const result = rules[field](form[field])
    errors[field] = result === true ? '' : result
  })
  return !Object.values(errors).some(Boolean)
}`},{type:"heading",text:"Skills Practiced"},{type:"list",items:["Pinia — computed totals, deep watch for localStorage","Navigation Guard — prevent checkout with empty cart","Form Validation — rules object, blur-based validation","Transition — bounce on badge, animation on cart item removal","storeToRefs — reactive destructuring from store","Programmatic navigation after order success"]},{type:"heading",text:"✅ Project Review"},{type:"qa",question:"Why deep: true when watching the cart for localStorage?",answer:"Because items is an array of objects. A regular watch only detects full reassignment. deep: true makes Vue track internal changes — updating qty, adding or removing items inside the array."},{type:"qa",question:"Why use a Navigation Guard for the /checkout route?",answer:"To prevent users from accessing the checkout page directly via URL when they have no items in their cart. The guard checks cart.items.length — if zero, it redirects to the home page."},{type:"cta",text:"Ready to take your Vue skills to the next level?",linkLabel:"Individual Training →",link:"https://saqly.com/individual-training"}]};export{t as default};
