const e={id:21,title:"أساسيات الاختبار",titleEn:"Testing Basics",level:"متقدم",levelEn:"Advanced",lessons:["لماذا الاختبار مهم؟","أنواع الاختبارات","إعداد Vitest و Vue Test Utils","اختبار Component بسيط","اختبار Props وEmits","اختبار Composable مستقل","اختبار Pinia Store","Mocking الـ API بـ vi.mock","اختبار النماذج (Forms)","أفضل ممارسات الاختبار"],lessonsEn:["Why Testing Matters","Types of Tests","Setting Up Vitest & Vue Test Utils","Testing a Simple Component","Testing Props & Emits","Testing Composables Independently","Testing Pinia Stores","Mocking APIs with vi.mock","Testing Forms","Testing Best Practices"],intro:"نتعلم اختبار تطبيقات Vue — من اختبار الـ components بـ Vue Test Utils إلى اختبار الـ Composables والـ Pinia Stores.",introEn:"Learn how to test Vue apps — from component testing with Vue Test Utils to testing Composables and Pinia Stores.",content:[{type:"heading",text:"لماذا الاختبار مهم؟"},{type:"list",items:["يكتشف الـ bugs مبكراً قبل وصولها للمستخدم","يجعل Refactoring آمناً — تُعدّل الكود بثقة","يُوثّق السلوك المتوقع للكود","يمنع Regression — التغييرات الجديدة لا تكسر الموجود","يُحسّن تصميم الكود — الكود القابل للاختبار عادةً أفضل تصميماً"]},{type:"heading",text:"أنواع الاختبارات"},{type:"list",items:["Unit Tests — اختبار قطعة واحدة معزولة (function، composable، component). أسرع وأسهل","Integration Tests — اختبار تفاعل عدة قطع معاً (component + store + router)","E2E Tests — اختبار التطبيق كاملاً في المتصفح الحقيقي (Playwright، Cypress)"]},{type:"heading",text:"إعداد Vitest و Vue Test Utils"},{type:"code",code:`# عند إنشاء مشروع جديد
$ npm create vue@latest my-app
# اختر: Add Vitest ✓

# أو أضفهم يدوياً لمشروع موجود
$ npm install -D vitest @vue/test-utils jsdom @vitejs/plugin-vue`},{type:"code",code:`// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',   // يُحاكي DOM في Node.js
    globals: true,          // describe، it، expect بدون import
  }
})`},{type:"code",code:`// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",       // واجهة بصرية للاختبارات
    "coverage": "vitest run --coverage"
  }
}`},{type:"heading",text:"اختبار Component بسيط"},{type:"code",code:`// Counter.vue — الـ component الذي نختبره
<script setup>
import { ref } from 'vue'
const props = defineProps({ initial: { type: Number, default: 0 }, max: Number })
const emit = defineEmits(['max-reached'])
const count = ref(props.initial)

function increment() {
  if (props.max !== undefined && count.value >= props.max) {
    emit('max-reached')
    return
  }
  count.value++
}
<\/script>

<template>
  <div>
    <p class="count" data-test="count">{{ count }}</p>
    <button data-test="increment" @click="increment">+</button>
  </div>
</template>`},{type:"code",code:`// Counter.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  it('يعرض القيمة الابتدائية من الـ prop', () => {
    const wrapper = mount(Counter, { props: { initial: 5 } })
    expect(wrapper.find('[data-test="count"]').text()).toBe('5')
  })

  it('يزيد العدد عند النقر', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('[data-test="increment"]').trigger('click')
    expect(wrapper.find('[data-test="count"]').text()).toBe('1')
  })

  it('يُصدر max-reached عند بلوغ الحد الأقصى', async () => {
    const wrapper = mount(Counter, { props: { max: 1 } })
    await wrapper.find('[data-test="increment"]').trigger('click') // وصل للـ max
    await wrapper.find('[data-test="increment"]').trigger('click') // trigger emission
    expect(wrapper.emitted('max-reached')).toBeTruthy()
    // تأكد عدد مرات الإصدار
    expect(wrapper.emitted('max-reached')).toHaveLength(1)
  })
})`},{type:"tip",text:"استخدم data-test attributes بدلاً من CSS classes أو element selectors — يجعل الاختبارات مستقلة عن التنسيق."},{type:"heading",text:"اختبار Composable مستقل"},{type:"code",code:`// useCounter.js
import { ref } from 'vue'

export function useCounter(initial = 0, { min = -Infinity, max = Infinity } = {}) {
  const count = ref(initial)
  const increment = () => { if (count.value < max) count.value++ }
  const decrement = () => { if (count.value > min) count.value-- }
  const reset = () => { count.value = initial }
  return { count, increment, decrement, reset }
}`},{type:"code",code:`// useCounter.test.js
import { describe, it, expect } from 'vitest'
import { useCounter } from './useCounter'

// ميزة الـ Composables: تُختبر بدون mount component
describe('useCounter', () => {
  it('يبدأ بالقيمة الابتدائية', () => {
    const { count } = useCounter(10)
    expect(count.value).toBe(10)
  })

  it('يزيد ويُنقص', () => {
    const { count, increment, decrement } = useCounter(0)
    increment()
    expect(count.value).toBe(1)
    decrement()
    expect(count.value).toBe(0)
  })

  it('لا يتجاوز الحد الأقصى', () => {
    const { count, increment } = useCounter(9, { max: 10 })
    increment()
    increment() // هذه لن تُنفَّذ
    expect(count.value).toBe(10)
  })

  it('يُعيد للقيمة الابتدائية عند reset', () => {
    const { count, increment, reset } = useCounter(5)
    increment()
    increment()
    reset()
    expect(count.value).toBe(5)
  })
})`},{type:"heading",text:"اختبار Pinia Store"},{type:"code",code:`// useTaskStore.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/useTaskStore'

describe('useTaskStore', () => {
  // أنشئ pinia جديد قبل كل اختبار لعزل الـ state
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('يبدأ بمصفوفة فارغة', () => {
    const store = useTaskStore()
    expect(store.tasks).toHaveLength(0)
  })

  it('يُضيف مهمة جديدة', () => {
    const store = useTaskStore()
    store.addTask('مهمة الاختبار')
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0].title).toBe('مهمة الاختبار')
    expect(store.tasks[0].done).toBe(false)
  })

  it('يُكمل ويُلغي المهمة بـ toggle', () => {
    const store = useTaskStore()
    store.addTask('مهمة')
    const id = store.tasks[0].id
    store.toggleTask(id)
    expect(store.tasks[0].done).toBe(true)
    store.toggleTask(id)
    expect(store.tasks[0].done).toBe(false)
  })

  it('يحذف المهمة', () => {
    const store = useTaskStore()
    store.addTask('مهمة للحذف')
    const id = store.tasks[0].id
    store.deleteTask(id)
    expect(store.tasks).toHaveLength(0)
  })

  it('يحسب doneCount بشكل صحيح', () => {
    const store = useTaskStore()
    store.addTask('مهمة 1')
    store.addTask('مهمة 2')
    store.toggleTask(store.tasks[0].id)
    expect(store.doneCount).toBe(1)
  })
})`},{type:"heading",text:"Mocking الـ API"},{type:"code",code:`// ProductList.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ProductList from '@/components/ProductList.vue'

// Mock الـ API module كاملاً
vi.mock('@/api/products', () => ({
  productsAPI: {
    getAll: vi.fn().mockResolvedValue({
      data: [
        { id: 1, title: 'منتج 1', price: 29.99, image: '/img1.jpg' },
        { id: 2, title: 'منتج 2', price: 49.99, image: '/img2.jpg' },
      ]
    }),
  },
}))

describe('ProductList', () => {
  it('يعرض بطاقات المنتجات بعد جلب البيانات', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { RouterLink: true },  // stub الـ router components
      }
    })

    // انتظر حل كل الـ promises (fetch)
    await flushPromises()

    expect(wrapper.findAll('[data-test="product-card"]')).toHaveLength(2)
    expect(wrapper.text()).toContain('منتج 1')
  })

  it('يعرض رسالة loading أثناء الجلب', () => {
    const wrapper = mount(ProductList, {
      global: { plugins: [createTestingPinia()] }
    })
    // قبل flushPromises — الـ loading لا يزال
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true)
  })
})`},{type:"heading",text:"أفضل ممارسات الاختبار"},{type:"list",items:["اختبر السلوك وليس التطبيق — لا تختبر الـ implementation details","استخدم data-test= بدلاً من CSS selectors في الاختبارات","كل اختبار يجب أن يكون مستقلاً — لا تعتمد على ترتيب الاختبارات","اكتب الاختبار قبل الـ fix — يُثبت وجود الـ bug ويمنع عودته","سمّ اختباراتك بوضوح: 'يجب أن يفعل X عندما Y'","استخدم beforeEach لتهيئة الـ state بدلاً من إعادة استخدام متغيرات","اختبر الـ Composables مباشرة — أسرع وأبسط من mounting component"]},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"لماذا نستخدم setActivePinia(createPinia()) في اختبارات Pinia؟",answer:"لأن Pinia تحتاج مثيلاً نشطاً لتعمل. في التطبيق الحقيقي يوفّره createApp().use(pinia). في الاختبارات نوفّره يدوياً. نُنشئ pinia جديد في كل beforeEach لعزل الـ state بين الاختبارات."},{type:"qa",question:"ما الفرق بين Unit Testing وE2E Testing؟",answer:"Unit Testing يختبر قطعة منفردة (component، composable) بشكل معزول — سريع وسهل تشخيص الأخطاء. E2E Testing يختبر التطبيق كاملاً في المتصفح الحقيقي كما يستخدمه المستخدم — أبطأ لكن يضمن التكامل."},{type:"qa",question:"متى نستخدم vi.mock في الاختبارات؟",answer:"عند اختبار component يُنفّذ API calls — نُبدّل الـ API module بـ mock بقيم ثابتة. يجعل الاختبار سريعاً ومتوقع النتائج بدون الاعتماد على شبكة حقيقية."},{type:"qa",question:"لماذا نُفضّل اختبار الـ Composables مباشرة بدلاً من mounting Component؟",answer:"لأن Composables هي functions JavaScript عادية — تُختبر مباشرة بدون JSDOM أو mount overhead. أسرع بكثير وتعطيك feedback مباشر عن المنطق نفسه. الـ component test يُغطّي التكامل بين الـ UI والمنطق."}],contentEn:[{type:"heading",text:"Setup"},{type:"code",code:`// vite.config.js
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  }
})`},{type:"heading",text:"Component Testing"},{type:"code",code:`import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  it('shows initial value from prop', () => {
    const wrapper = mount(Counter, { props: { initial: 5 } })
    expect(wrapper.find('[data-test="count"]').text()).toBe('5')
  })

  it('increments on button click', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('[data-test="increment"]').trigger('click')
    expect(wrapper.find('[data-test="count"]').text()).toBe('1')
  })

  it('emits max-reached when hitting the limit', async () => {
    const wrapper = mount(Counter, { props: { max: 1 } })
    await wrapper.find('[data-test="increment"]').trigger('click')
    await wrapper.find('[data-test="increment"]').trigger('click')
    expect(wrapper.emitted('max-reached')).toBeTruthy()
  })
})`},{type:"heading",text:"Testing Composables"},{type:"code",code:`// Test composables directly — no mounting needed
import { useCounter } from './useCounter'

it('starts with initial value', () => {
  const { count } = useCounter(10)
  expect(count.value).toBe(10)
})

it('does not exceed max', () => {
  const { count, increment } = useCounter(9, { max: 10 })
  increment()
  increment()
  expect(count.value).toBe(10)
})`},{type:"heading",text:"Testing Pinia Stores"},{type:"code",code:`import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/useTaskStore'

beforeEach(() => { setActivePinia(createPinia()) })

it('adds a task', () => {
  const store = useTaskStore()
  store.addTask('Test task')
  expect(store.tasks).toHaveLength(1)
  expect(store.tasks[0].title).toBe('Test task')
})

it('toggles task done state', () => {
  const store = useTaskStore()
  store.addTask('task')
  const id = store.tasks[0].id
  store.toggleTask(id)
  expect(store.tasks[0].done).toBe(true)
})`},{type:"heading",text:"Testing Best Practices"},{type:"list",items:["Test behavior, not implementation — don't test internal state directly","Use data-test= attributes instead of CSS selectors","Each test must be independent — no shared mutable state","Write a failing test first when fixing a bug","Name tests clearly: 'it should do X when Y'","Test composables directly — faster and simpler than mounting"]},{type:"heading",text:"✅ Review"},{type:"qa",question:"Why use setActivePinia(createPinia()) in Pinia tests?",answer:"Because Pinia needs an active instance to work. In the real app it's provided by createApp().use(pinia). In tests we provide it manually. Creating a new pinia in beforeEach isolates state between tests."},{type:"qa",question:"Why prefer testing composables directly instead of mounting a component?",answer:"Because composables are plain JavaScript functions — you can call them directly without JSDOM or mount overhead. Much faster and gives immediate feedback on the logic itself. Component tests cover the integration between UI and logic."}]};export{e as default};
