# القسم 14: إدارة الحالة مع Pinia
# Section 14: State Management with Pinia

> **Vue 3 Course — 23 Sections** | القسم 14 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | متى تحتاج State Management؟ | When Do You Need State Management? |
| 2 | تثبيت Pinia | Installing Pinia |
| 3 | Setup Store — الأسلوب الحديث | Setup Store — Modern Style |
| 4 | State و Getters و Actions | State, Getters & Actions |
| 5 | storeToRefs — الحفاظ على Reactivity | storeToRefs — Preserving Reactivity |
| 6 | مثال Cart Store | Cart Store Example |
| 7 | Persistence مع localStorage | Persistence with localStorage |

## المفاهيم الرئيسية | Key Concepts

- **`defineStore`** — دالة إنشاء الـ Store في Pinia / The function to create a Pinia store.
- **Setup Store** — أسلوب يشبه `<script setup>` لتعريف الـ Store / A style similar to `<script setup>` for defining stores.
- **`storeToRefs`** — ضروري عند destructuring من الـ Store للحفاظ على الـ Reactivity / Required when destructuring from a store to preserve reactivity.
- **Persistence** — حفظ الحالة في `localStorage` باستخدام `watch` مع `deep: true` / Saving state to `localStorage` using a deep `watch`.

## أمثلة مرجعية | Code Reference

```js
// stores/useCounterStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)

  // Getters (computed)
  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)

  // Actions
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => (count.value = 0)

  return { count, doubleCount, isPositive, increment, decrement, reset }
})
```

```vue
<!-- Using a store in a component -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/useCounterStore'

const store = useCounterStore()

// IMPORTANT: use storeToRefs for reactive state/getters
const { count, doubleCount } = storeToRefs(store)

// Actions don't need storeToRefs
const { increment, decrement, reset } = store
</script>
```

## أسئلة المراجعة | Review Q&A

**س: لماذا نستخدم `storeToRefs` ولا نستخدم destructuring العادي؟**
ج: Destructuring العادي من الـ store يكسر الـ Reactivity — القيم تصبح ثابتة. `storeToRefs` يحوّل كل قيمة إلى ref قابل للربط.

**Q: Why do we use `storeToRefs` instead of regular destructuring?**
A: Regular destructuring from the store breaks reactivity — values become static copies. `storeToRefs` converts each value to a reactive ref.

**س: ما الفرق بين Pinia و Vuex؟**
ج: Pinia أبسط (لا mutations)، يدعم TypeScript بشكل أفضل، يعمل مع Composition API، وهو الـ state manager الرسمي لـ Vue 3.

**Q: What is the difference between Pinia and Vuex?**
A: Pinia is simpler (no mutations), has better TypeScript support, works with Composition API, and is the official state manager for Vue 3.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 13 — HTTP & APIs
**التالي | Next:** Section 15 — TypeScript with Vue
