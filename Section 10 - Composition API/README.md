# القسم 10: Composition API
# Section 10: Composition API

> **Vue 3 Course — 23 Sections** | القسم 10 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | ما هو Composition API؟ | What is Composition API? |
| 2 | setup() مقابل script setup | setup() function vs <script setup> |
| 3 | useId (Vue 3.5) | useId — Unique ID Generation (Vue 3.5) |
| 4 | ما هو الـ Composable؟ | What is a Composable? |
| 5 | إنشاء أول Composable | Creating Your First Composable |
| 6 | useFetch — Composable لجلب البيانات | useFetch — Data Fetching Composable |
| 7 | إعادة استخدام Composables | Reusing Composables Across Components |

## المفاهيم الرئيسية | Key Concepts

- **Composable** — دالة بـ `use` prefix تستخدم Composition API لتغليف منطق قابل لإعادة الاستخدام / A function prefixed with `use` that encapsulates reusable stateful logic.
- **`setup()` vs `<script setup>`** — كلاهما يستخدم Composition API، لكن `<script setup>` أكثر اختصاراً / Both use Composition API; `<script setup>` is more concise.
- **`useId()`** — جديد في Vue 3.5، يُنشئ ID فريداً لكل مكون / New in Vue 3.5, generates a unique ID per component instance.
- **قاعدة التسمية** — كل Composable يبدأ بـ `use` / Naming convention: all composables start with `use`.

## أمثلة مرجعية | Code Reference

```js
// useFetch.js — Data fetching composable
import { ref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  watchEffect(async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(url.value ?? url)
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  })

  return { data, error, isLoading }
}
```

```vue
<!-- Using composable in a component -->
<script setup>
import { useFetch } from './composables/useFetch'
import { useCounter } from './composables/useCounter'

// Composables are just function calls
const { data: posts, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')
const { count, increment, decrement } = useCounter(0)
</script>
```

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين Composable و Mixin؟**
ج: Composable أوضح في مصدر البيانات، لا توجد تعارضات في الأسماء، وتدعم TypeScript بشكل أفضل. Mixins كانت تُسبّب غموضاً في مصدر الـ properties.

**Q: What is the difference between a Composable and a Mixin?**
A: Composables are explicit about data sources, have no name conflicts, and have better TypeScript support. Mixins caused ambiguity about where properties came from.

**س: هل يمكن استدعاء Composable من composable آخر؟**
ج: نعم! يمكن تداخل Composables — مثلاً `useProducts` يمكنه استدعاء `useFetch` داخله.

**Q: Can a composable call another composable?**
A: Yes! Composables can be nested — for example, `useProducts` can call `useFetch` internally.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 09 — النماذج / Forms in Vue  
**التالي | Next:** Section 11 — Lifecycle Hooks
