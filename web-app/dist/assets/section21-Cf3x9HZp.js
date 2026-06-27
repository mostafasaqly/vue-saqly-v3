const e={id:21,title:"أساسيات الاختبار",titleEn:"Testing Basics",level:"متقدم",levelEn:"Advanced",lessons:["نظرة عامة على الاختبار","إعداد Vitest","اختبار الـ Components","اختبار الـ Composables","اختبار الـ Stores","اختبار النماذج","Mocking للـ API","اختبار E2E بـ Playwright","أفضل ممارسات الاختبار"],lessonsEn:["Testing Overview","Setting Up Vitest","Unit Testing Components","Testing Composables","Testing Stores","Testing Forms","API Mocking","E2E Testing with Playwright","Testing Best Practices"],intro:"نتعلم اختبار تطبيقات Vue — من اختبار الـ components بـ Vue Test Utils إلى اختبار E2E بـ Playwright.",introEn:"Learn how to test Vue apps — from component testing with Vue Test Utils to E2E testing with Playwright.",content:[{type:"heading",text:"إعداد Vitest و Vue Test Utils"},{type:"code",code:`$ npm create vue@latest
# اختر: Vitest ✓

# أو أضفهم يدوياً
$ npm install -D vitest @vue/test-utils jsdom`},{type:"code",code:`// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
  }
})`},{type:"heading",text:"اختبار Component بسيط"},{type:"code",code:`// Counter.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter Component', () => {
  it('يُظهر القيمة الابتدائية', () => {
    const wrapper = mount(Counter, { props: { initial: 5 } })
    expect(wrapper.text()).toContain('5')
  })

  it('يزيد العدد عند النقر', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button[data-test="increment"]').trigger('click')
    expect(wrapper.find('.count').text()).toBe('1')
  })

  it('يُصدر حدث عند الوصول للحد الأقصى', async () => {
    const wrapper = mount(Counter, { props: { max: 2 } })
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('max-reached')).toBeTruthy()
  })
})`},{type:"heading",text:"اختبار Composable"},{type:"code",code:`// useCounter.test.js
import { describe, it, expect } from 'vitest'
import { useCounter } from './useCounter'

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
})`},{type:"heading",text:"اختبار Pinia Store"},{type:"code",code:`// taskStore.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from './useTaskStore'

describe('useTaskStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('يضيف مهمة جديدة', () => {
    const store = useTaskStore()
    store.addTask('مهمة الاختبار')
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0].title).toBe('مهمة الاختبار')
  })

  it('يُكمل المهمة عند toggle', () => {
    const store = useTaskStore()
    store.addTask('مهمة')
    const id = store.tasks[0].id
    store.toggleTask(id)
    expect(store.tasks[0].done).toBe(true)
  })
})`},{type:"heading",text:"Mocking للـ API"},{type:"code",code:`// products.test.js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductList from './ProductList.vue'
import * as productsAPI from '@/api/products'

vi.mock('@/api/products', () => ({
  productsAPI: {
    getAll: vi.fn().mockResolvedValue({
      data: [
        { id: 1, title: 'منتج 1', price: 10 }
      ]
    })
  }
}))

it('يعرض المنتجات بعد الجلب', async () => {
  const wrapper = mount(ProductList)
  await flushPromises()
  expect(wrapper.findAll('.product-card')).toHaveLength(1)
})`},{type:"tip",text:"تشغيل الاختبارات: npm run test. تشغيل مع coverage: npm run test -- --coverage"},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"لماذا نستخدم setActivePinia في اختبارات Pinia؟",answer:"لأن Pinia تحتاج مثيلاً نشطاً لتعمل. في التطبيق الحقيقي يوفّره createApp().use(pinia). في الاختبارات نوفّره يدوياً بـ setActivePinia(createPinia())."},{type:"qa",question:"ما الفرق بين Unit Testing وE2E Testing؟",answer:"Unit Testing يختبر قطعة منفردة (component أو composable) بشكل معزول. E2E Testing يختبر التطبيق كاملاً كما يستخدمه المستخدم في المتصفح الحقيقي."}],contentEn:[{type:"heading",text:"Component Testing"},{type:"code",code:`import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

it('increments on button click', async () => {
  const wrapper = mount(Counter)
  await wrapper.find('button').trigger('click')
  expect(wrapper.find('.count').text()).toBe('1')
})`},{type:"heading",text:"Testing Pinia Store"},{type:"code",code:`import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from './useTaskStore'

beforeEach(() => { setActivePinia(createPinia()) })

it('adds a task', () => {
  const store = useTaskStore()
  store.addTask('Test Task')
  expect(store.tasks).toHaveLength(1)
})`},{type:"heading",text:"✅ Review"},{type:"qa",question:"Why do we use setActivePinia in Pinia tests?",answer:"Because Pinia needs an active instance to work. In the real app it's provided by createApp().use(pinia). In tests we provide it manually with setActivePinia(createPinia())."}]};export{e as default};
