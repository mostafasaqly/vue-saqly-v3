# القسم 11: دورة حياة المكون (Lifecycle Hooks)
# Section 11: Lifecycle Hooks

> **Vue 3 Course — 23 Sections** | القسم 11 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | نظرة عامة على دورة حياة المكون | Component Lifecycle Overview |
| 2 | onMounted | onMounted — After Component Mounts |
| 3 | onUpdated | onUpdated — After Component Updates |
| 4 | onUnmounted | onUnmounted — Before Component Destroys |
| 5 | جلب البيانات في onMounted | Data Fetching in onMounted |
| 6 | منطق التنظيف في onUnmounted | Cleanup Logic in onUnmounted |
| 7 | استخدام Lifecycle في Composables | Using Lifecycle Hooks inside Composables |

## المفاهيم الرئيسية | Key Concepts

- **`onMounted`** — يُشغَّل بعد تركيب المكون في DOM. مثالي لجلب البيانات والوصول للـ DOM / Runs after component is mounted. Ideal for data fetching and DOM access.
- **`onUpdated`** — يُشغَّل بعد كل تحديث للمكون / Runs after every component update.
- **`onUnmounted`** — يُشغَّل قبل تدمير المكون. مثالي لإلغاء subscriptions والـ timers / Runs before component is destroyed. Ideal for canceling subscriptions and timers.
- **Memory Leaks** — دائماً نظّف الـ event listeners والـ timers في `onUnmounted` / Always clean up event listeners and timers in `onUnmounted`.
- **Lifecycle in Composables** — يمكن استخدام Lifecycle Hooks داخل Composables / Lifecycle hooks can be used inside composables.

## دورة حياة المكون | Lifecycle Diagram

```
createApp()
    ↓
beforeCreate (Options API only)
    ↓
created (Options API only)
    ↓
Template Compiled
    ↓
onBeforeMount
    ↓
[DOM Rendered]
    ↓
onMounted  ← جلب البيانات هنا / Fetch data here
    ↓
[Data Changes]
    ↓
onBeforeUpdate
    ↓
onUpdated
    ↓
[Component Removed]
    ↓
onBeforeUnmount
    ↓
onUnmounted  ← تنظيف الموارد / Cleanup resources here
```

## أمثلة مرجعية | Code Reference

```vue
<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const data = ref(null)
const isLoading = ref(true)
let intervalId = null

// onMounted — runs once after mount
onMounted(async () => {
  console.log('Component mounted!')

  // Fetch data
  const res = await fetch('https://api.example.com/data')
  data.value = await res.json()
  isLoading.value = false

  // Start an interval
  intervalId = setInterval(() => {
    console.log('Tick...')
  }, 1000)
})

// onUpdated — after every re-render
onUpdated(() => {
  console.log('Component updated!')
})

// onUnmounted — cleanup!
onUnmounted(() => {
  clearInterval(intervalId)  // IMPORTANT: prevent memory leak!
  console.log('Component unmounted, interval cleared')
})
</script>
```

## أسئلة المراجعة | Review Q&A

**س: لماذا لا نجلب البيانات مباشرة في `<script setup>` بدون `onMounted`؟**
ج: يمكن ذلك، لكن `onMounted` يضمن أن DOM جاهز، وهو مكان مناسب لأي عملية تحتاج البيئة المرئية أو مرجع لعناصر DOM.

**Q: Why not fetch data directly in `<script setup>` without `onMounted`?**
A: You can, but `onMounted` guarantees the DOM is ready, and is the right place for operations that need the rendered environment or DOM element references.

**س: ما الذي يحدث إذا لم تنظّف الـ event listeners في `onUnmounted`؟**
ج: يحدث memory leak — الـ listener يستمر في العمل حتى بعد إزالة المكون، مما قد يُبطّئ التطبيق أو يُسبّب أخطاء.

**Q: What happens if you don't clean up event listeners in `onUnmounted`?**
A: Memory leak — the listener keeps running even after the component is removed, potentially slowing down the app or causing errors.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 10 — Composition API  
**التالي | Next:** Section 12 — Routing with Vue Router
