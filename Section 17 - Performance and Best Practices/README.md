# القسم 17: الأداء وأفضل الممارسات
# Section 17: Performance & Best Practices

> **Vue 3 Course — 23 Sections** | القسم 17 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | computed مقابل Methods | computed vs Methods — When to Use Which |
| 2 | v-memo — تحسين القوائم | v-memo — Memoizing List Items |
| 3 | Async Components | Async Components with defineAsyncComponent |
| 4 | Suspense | Suspense — Handling Async Templates |
| 5 | تحسين Bundle Size | Bundle Optimization (Tree-shaking, Code-splitting) |
| 6 | Vapor Mode | Vapor Mode (Vue 3.6 Experimental) |
| 7 | أفضل الممارسات | Vue Best Practices Checklist |

## المفاهيم الرئيسية | Key Concepts

- **computed caching** — `computed` يُخزّن النتيجة ولا يُعاد حسابها إلا عند تغيّر dependencies / `computed` caches its result and only recalculates when dependencies change.
- **`v-memo`** — يمنع إعادة رسم عنصر قائمة إذا لم تتغير القيم المُحددة / Prevents re-rendering list items if specified values haven't changed.
- **`defineAsyncComponent`** — يُحمّل المكون بشكل كسول (lazy) فقط عند الحاجة / Loads a component lazily only when needed.
- **`<Suspense>`** — يعرض fallback content أثناء تحميل المكون الـ async / Shows fallback content while an async component loads.
- **Vapor Mode** — محرك render جديد تجريبي في Vue 3.6 يُلغي Virtual DOM لأداء أعلى / Experimental new render engine in Vue 3.6 that eliminates the Virtual DOM for better performance.

## أمثلة مرجعية | Code Reference

```vue
<!-- v-memo — skip re-render if selected/active haven't changed -->
<li v-for="item in list" :key="item.id" v-memo="[item.id === selectedId, item.isActive]">
  {{ item.name }}
</li>
```

```js
// defineAsyncComponent — lazy load
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,       // Show loading after 200ms
  timeout: 5000,    // Error after 5s
})
```

```vue
<!-- Suspense — async template handling -->
<Suspense>
  <!-- Main content (async) -->
  <template #default>
    <AsyncUserProfile />
  </template>
  <!-- Fallback while loading -->
  <template #fallback>
    <SkeletonLoader />
  </template>
</Suspense>
```

## أفضل الممارسات | Best Practices Checklist

- ✅ استخدم `computed` للقيم المشتقة (لا `methods`) / Use `computed` for derived values (not `methods`)
- ✅ أضف `:key` دائماً في `v-for` / Always add `:key` in `v-for`
- ✅ استخدم `v-show` للتبديل المتكرر و `v-if` للمحتوى النادر / Use `v-show` for frequent toggles, `v-if` for rare content
- ✅ نظّف الـ event listeners في `onUnmounted` / Clean up event listeners in `onUnmounted`
- ✅ استخدم `shallowRef`/`shallowReactive` للـ objects الكبيرة غير المتداخلة / Use `shallowRef`/`shallowReactive` for large flat objects
- ✅ قسّم المكونات الكبيرة إلى مكونات أصغر / Split large components into smaller ones
- ✅ استخدم Lazy Loading للـ routes والمكونات الثقيلة / Use lazy loading for routes and heavy components

## أسئلة المراجعة | Review Q&A

**س: متى يكون `method` أفضل من `computed`؟**
ج: عندما تحتاج دالة تقبل arguments، أو عندما لا تريد caching (مثل Random generator أو Date.now()).

**Q: When is a `method` better than `computed`?**
A: When you need a function that accepts arguments, or when you don't want caching (like random generators or Date.now()).

**س: ما هو Vapor Mode؟**
ج: محرك render تجريبي في Vue 3.6 يُترجم Templates مباشرة إلى DOM operations بدون Virtual DOM، مما يُقلل استخدام الذاكرة ويُحسّن الأداء بشكل كبير.

**Q: What is Vapor Mode?**
A: An experimental render engine in Vue 3.6 that compiles templates directly to DOM operations without the Virtual DOM, significantly reducing memory usage and improving performance.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 16 — UI & Styling
**التالي | Next:** Section 18 — Project 1: Task Manager App
