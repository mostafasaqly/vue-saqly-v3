# القسم 7: الـ Components
# Section 7: Components

> **Vue 3 Course — 23 Sections** | القسم 7 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | إنشاء وتسجيل Components | Creating & Registering Components |
| 2 | Props — تمرير البيانات | Props — Passing Data Down |
| 3 | أنواع Props والتحقق | Prop Types & Validation |
| 4 | القيم الافتراضية للـ Props | Default Prop Values |
| 5 | Reactive Props Destructure (Vue 3.5) | Reactive Props Destructure (Vue 3.5) |
| 6 | defineEmits — إرسال الأحداث | defineEmits — Emitting Events |
| 7 | defineModel — الربط الثنائي | defineModel — Two-Way Binding (Vue 3.4+) |
| 8 | useTemplateRef (Vue 3.5) | useTemplateRef — Template Refs (Vue 3.5) |
| 9 | defineExpose | defineExpose — Exposing Component Methods |

## المفاهيم الرئيسية | Key Concepts

- **defineProps** — Compiler Macro لتعريف Props مع نوعها وقيمها الافتراضية / Declares component props with types and defaults.
- **defineEmits** — Compiler Macro لتعريف الأحداث التي يُرسلها المكون / Declares events the component can emit.
- **defineModel** — جديد في Vue 3.4، يُبسّط الـ two-way binding في المكونات المخصصة / New in Vue 3.4, simplifies two-way binding in custom components.
- **useTemplateRef** — جديد في Vue 3.5، الطريقة الجديدة للوصول لعناصر الـ Template / New in Vue 3.5, the new way to access template elements.
- **Reactive Props Destructure** — جديد في Vue 3.5، يمكن destructure الـ Props مع الحفاظ على الـ Reactivity / New in Vue 3.5, destructuring props while maintaining reactivity.
- **defineExpose** — يُحدد ما يمكن للـ Parent الوصول إليه من المكون / Specifies what the parent component can access.

## أمثلة مرجعية | Code Reference

```vue
<!-- ChildComponent.vue — مثال شامل / Comprehensive example -->
<script setup>
import { computed, useTemplateRef } from 'vue'

// defineProps with defaults (Vue 3.5 Reactive Destructure)
const { name = 'مجهول', age = 0, isAdmin = false } = defineProps({
  name: String,
  age: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
})

// defineEmits
const emit = defineEmits(['update', 'delete', 'selected'])

// defineModel (Vue 3.4+)
const modelValue = defineModel()

// useTemplateRef (Vue 3.5)
const inputRef = useTemplateRef('myInput')

// Computed
const displayName = computed(() => isAdmin ? `👑 ${name}` : name)

// Methods
const focusInput = () => inputRef.value?.focus()

// defineExpose — what parent can access
defineExpose({ focusInput })
</script>

<template>
  <div>
    <h3>{{ displayName }}</h3>
    <p>العمر: {{ age }}</p>
    <input ref="myInput" v-model="modelValue" />
    <button @click="emit('update', { name, age })">تحديث</button>
    <button @click="emit('delete')">حذف</button>
  </div>
</template>
```

```vue
<!-- Parent usage / استخدام في الـ Parent -->
<script setup>
import { ref, useTemplateRef } from 'vue'
import ChildComponent from './ChildComponent.vue'

const value = ref('')
const childRef = useTemplateRef('child')

const focusChild = () => childRef.value?.focusInput()
</script>

<template>
  <ChildComponent
    ref="child"
    name="مصطفى"
    :age="28"
    :is-admin="true"
    v-model="value"
    @update="(data) => console.log(data)"
    @delete="() => console.log('deleted')"
  />
  <button @click="focusChild">Focus Input</button>
</template>
```

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين `defineModel` و `:value` + `@input` اليدوي؟**
ج: `defineModel` يُختصر كل ذلك في سطر واحد — يُنشئ ref داخلي ويتزامن تلقائياً مع الـ parent عبر v-model.

**Q: What is the difference between `defineModel` and manual `:value` + `@input`?**
A: `defineModel` condenses it all into one line — it creates an internal ref and auto-syncs with the parent via v-model.

**س: لماذا `useTemplateRef` أفضل من `ref="name"` القديمة؟**
ج: لأنها تتيح الوصول المطبوع (typed) بشكل صحيح في TypeScript، وتعمل بشكل أوضح مع Composition API.

**Q: Why is `useTemplateRef` better than the old `ref="name"` string approach?**
A: It provides proper TypeScript typing and works more cleanly with the Composition API.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 06 — أساسيات الـ Reactivity / Reactivity Fundamentals  
**التالي | Next:** Section 08 — الـ Slots / Slots & Reusable Components
