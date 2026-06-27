# القسم 15: TypeScript مع Vue
# Section 15: TypeScript with Vue

> **Vue 3 Course — 23 Sections** | القسم 15 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | لماذا TypeScript؟ | Why TypeScript? |
| 2 | إنشاء مشروع Vue + TypeScript | Creating a Vue + TypeScript Project |
| 3 | كتابة Refs | Typing Refs |
| 4 | كتابة Props | Typing Props with Interfaces |
| 5 | كتابة Emits | Typing Emits |
| 6 | defineModel مع TypeScript | defineModel with TypeScript |
| 7 | Generic Components | Generic Components |
| 8 | كتابة Composables | Typing Composables |

## المفاهيم الرئيسية | Key Concepts

- **`lang="ts"`** — يُفعّل TypeScript في الـ SFC / Enables TypeScript in the SFC.
- **`interface Props`** — تعريف نوع Props باستخدام TypeScript interface / Defines prop types using a TypeScript interface.
- **`withDefaults`** — يضيف قيم افتراضية لـ Props مع TypeScript / Adds default values to props when using TypeScript.
- **`defineEmits<{...}>()`** — كتابة Emits بـ TypeScript / Typed emits with TypeScript.
- **`generic="T"`** — يجعل المكون Generic (يقبل نوع ديناميكي) / Makes the component generic.
- **Typed Composables** — Composables بـ TypeScript تعطي type inference كامل / TypeScript composables give full type inference.

## أمثلة مرجعية | Code Reference

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Typed refs
const count = ref<number>(0)
const name = ref<string>('')
const items = ref<string[]>([])

// Interface for props
interface Props {
  title: string
  items: Product[]
  isLoading?: boolean
}

interface Product {
  id: number
  name: string
  price: number
}

// withDefaults for optional props
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

// Typed emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [product: Product]
  delete: [id: number]
}>()

// Typed computed
const expensiveItems = computed<Product[]>(() =>
  props.items.filter((item) => item.price > 100)
)
</script>
```

```vue
<!-- Generic Component -->
<script setup lang="ts" generic="T extends { id: number }">
defineProps<{
  items: T[]
  selectedId?: number
}>()

defineEmits<{ select: [item: T] }>()
</script>
```

## أسئلة المراجعة | Review Q&A

**س: متى أستخدم `interface` ومتى أستخدم `type` في TypeScript؟**
ج: `interface` للـ objects والـ Props (قابلة للتمديد). `type` للـ unions والـ computed types. في Vue، كلاهما يعمل مع `defineProps`.

**Q: When should I use `interface` vs `type` in TypeScript?**
A: `interface` for objects and props (extensible). `type` for unions and computed types. In Vue, both work with `defineProps`.

**س: ما فائدة `withDefaults` مع TypeScript؟**
ج: عندما تعرّف Props بـ TypeScript interface، لا يمكنك وضع defaults مباشرة — `withDefaults` يحلّ هذه المشكلة.

**Q: What is the purpose of `withDefaults` with TypeScript?**
A: When you define props using a TypeScript interface, you can't add defaults inline — `withDefaults` solves this problem.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 14 — State Management with Pinia
**التالي | Next:** Section 16 — UI & Styling
