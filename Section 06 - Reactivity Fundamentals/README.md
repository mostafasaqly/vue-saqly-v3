# القسم 6: أساسيات الـ Reactivity
# Section 6: Reactivity Fundamentals

> **Vue 3 Course — 23 Sections** | القسم 6 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | ما هي الـ Reactivity؟ | What is Reactivity? |
| 2 | ref | ref — Reactive References |
| 3 | reactive | reactive — Reactive Objects |
| 4 | ref مقابل reactive | ref vs reactive — When to Use Which |
| 5 | computed | computed — Derived State |
| 6 | watch | watch — Watching for Changes |
| 7 | watchEffect | watchEffect — Auto-tracked Side Effects |
| 8 | onWatcherCleanup | onWatcherCleanup (Vue 3.5) |

## المفاهيم الرئيسية | Key Concepts

- **`ref()`** — يجعل قيمة بسيطة (string, number, boolean) أو object رياكتيف. يُستخدم بـ `.value` في JavaScript / Makes any value reactive; accessed via `.value` in JS.
- **`reactive()`** — يجعل object كامل رياكتيف. لا يحتاج `.value` / Makes a plain object deeply reactive without `.value`.
- **`computed()`** — قيمة مشتقة يتم حسابها تلقائياً ويتم تخزينها مؤقتاً (caching) / Derived value that auto-updates and is cached.
- **`watch()`** — يراقب مصدراً محدداً وينفذ callback عند التغيير / Watches a specific source and runs callback on change.
- **`watchEffect()`** — يتتبع تلقائياً كل الـ reactive dependencies التي تُستخدم داخله / Auto-tracks all reactive dependencies used inside it.
- **`onWatcherCleanup()`** — جديد في Vue 3.5، يُسجّل دالة تنظيف تعمل قبل التشغيل التالي / New in Vue 3.5, registers a cleanup function that runs before the next watcher execution.

## ref مقابل reactive | ref vs reactive

| | `ref` | `reactive` |
|---|---|---|
| **النوع** | أي قيمة | Objects / Arrays only |
| **الوصول** | `.value` في JS | مباشر |
| **في Template** | تلقائياً (بدون .value) | مباشر |
| **الاستخدام** | Primitives + كل شيء | Complex objects |
| **Destructuring** | يكسر الـ Reactivity | يكسر الـ Reactivity (استخدم toRefs) |

## أمثلة مرجعية | Code Reference

```js
import { ref, reactive, computed, watch, watchEffect, onWatcherCleanup } from 'vue'

// ref
const count = ref(0)
count.value++ // في JS
// {{ count }} في Template — بدون .value

// reactive
const user = reactive({ name: 'مصطفى', age: 28 })
user.age++ // لا نحتاج .value

// computed
const doubleCount = computed(() => count.value * 2)
// لا تنسَ: computed read-only بالافتراضي

// computed writable
const fullName = computed({
  get: () => `${user.firstName} ${user.lastName}`,
  set: (val) => {
    const [first, last] = val.split(' ')
    user.firstName = first
    user.lastName = last
  }
})

// watch
watch(count, (newVal, oldVal) => {
  console.log(`تغيّر من ${oldVal} إلى ${newVal}`)
})

// watch multiple sources
watch([count, () => user.age], ([newCount, newAge]) => {
  console.log(newCount, newAge)
})

// watch with immediate + deep
watch(user, (newUser) => {
  console.log('User changed:', newUser)
}, { immediate: true, deep: true })

// watchEffect
watchEffect(() => {
  // يتتبع تلقائياً count و user.name
  console.log(`Count: ${count.value}, User: ${user.name}`)

  // Vue 3.5: onWatcherCleanup
  onWatcherCleanup(() => {
    console.log('Cleanup before next run')
  })
})
```

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين `watch` و `watchEffect`؟**
ج: `watch` يتطلب تحديد المصدر صراحةً ويعطيك القيمة القديمة والجديدة. `watchEffect` يتتبع كل الـ dependencies تلقائياً لكن لا يعطيك القيمة القديمة.

**Q: What is the difference between `watch` and `watchEffect`?**
A: `watch` requires explicitly declaring the source and gives you old + new values. `watchEffect` auto-tracks all dependencies but doesn't give you the old value.

**س: لماذا `computed` أفضل من `method` للقيم المشتقة؟**
ج: لأن `computed` يُخزّن النتيجة مؤقتاً (cached) ولا يُعاد حسابه إلا إذا تغيّرت dependencies — مما يوفّر الأداء. `method` يُنفَّذ في كل render.

**Q: Why is `computed` better than a `method` for derived values?**
A: Because `computed` caches the result and only recalculates when its dependencies change — saving performance. A `method` runs on every render.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 05 — الـ Directives / Directives  
**التالي | Next:** Section 07 — الـ Components / Components
