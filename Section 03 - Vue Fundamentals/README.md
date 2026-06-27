# القسم 3: أساسيات Vue
# Section 3: Vue Fundamentals

> **Vue 3 Course — 23 Sections** | القسم 3 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | ما هو Vue؟ | What is Vue? |
| 2 | createApp | createApp — Bootstrapping a Vue App |
| 3 | Single File Components (SFC) | Single File Components (SFC) |
| 4 | Template / Script / Style | The Three Blocks: Template, Script, Style |
| 5 | Composition API كأسلوب افتراضي | Composition API as the Default Style |
| 6 | Options API مقابل Composition API | Options API vs Composition API |
| 7 | script setup | The `<script setup>` Syntactic Sugar |
| 8 | Compiler Macros | Compiler Macros (defineProps, defineEmits, etc.) |

## المفاهيم الرئيسية | Key Concepts

- **SFC (Single File Component)** — ملف `.vue` يحتوي على Template + Script + Style في مكان واحد / A `.vue` file co-locating template, logic, and styles.
- **Composition API** — الأسلوب الموصى به في Vue 3 الذي ينظّم الكود حسب المنطق / The recommended Vue 3 style that organizes code by logic.
- **`<script setup>`** — صياغة مختصرة للـ Composition API تُصدّر كل المتغيرات تلقائياً / Syntactic sugar that auto-exposes all top-level bindings to the template.
- **defineProps** — Compiler Macro لتعريف الـ Props / Compiler Macro to declare component props.
- **defineEmits** — Compiler Macro لتعريف الأحداث المُرسَلة / Compiler Macro to declare emitted events.
- **defineModel** — Compiler Macro لـ two-way binding (Vue 3.4+) / Compiler Macro for two-way binding.

## Options API مقابل Composition API | Comparison

```js
// ===== Options API =====
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubled() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  },
  mounted() {
    console.log('Mounted!')
  }
}

// ===== Composition API (script setup) =====
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
const increment = () => count.value++
onMounted(() => console.log('Mounted!'))
```

## أمثلة مرجعية | Code Reference

```vue
<!-- Counter.vue — مكون عداد بسيط / Simple counter component -->
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

const increment = () => count.value++
const decrement = () => count.value--
const reset = () => (count.value = 0)
</script>

<template>
  <div class="counter">
    <h2>العداد: {{ count }}</h2>
    <p>{{ isEven ? 'عدد زوجي' : 'عدد فردي' }}</p>
    <div class="buttons">
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
.counter { text-align: center; padding: 2rem; }
.buttons { display: flex; gap: 1rem; justify-content: center; margin-top: 1rem; }
button { padding: 0.5rem 1.5rem; font-size: 1.2rem; cursor: pointer; }
</style>
```

## أسئلة المراجعة | Review Q&A

**س: ما هي Compiler Macros؟**
ج: هي دوال خاصة (مثل defineProps, defineEmits) تُعالَج أثناء الترجمة ولا تحتاج إلى استيراد — تعمل فقط داخل `<script setup>`.

**Q: What are Compiler Macros?**
A: Special functions (like defineProps, defineEmits) that are processed at compile time and don't need to be imported — they only work inside `<script setup>`.

**س: لماذا `<script setup>` أفضل من setup() العادي؟**
ج: لأنه أكثر اختصاراً — كل المتغيرات والدوال المُعرَّفة في المستوى الأعلى تكون متاحة تلقائياً في الـ Template دون الحاجة إلى return.

**Q: Why is `<script setup>` better than a regular setup() function?**
A: It's more concise — all top-level variables and functions are automatically available in the template without needing an explicit return.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 02 — إعداد بيئة التطوير / Development Environment Setup  
**التالي | Next:** Section 04 — Template Syntax & Binding
