export default {
  id: 7,
  title: "الـ Components",
  titleEn: "Components",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: ["إنشاء Components", "تسجيل Components", "الـ Props", "أنواع الـ Props", "القيم الافتراضية للـ Props", "تفكيك Props مع reactive (Vue 3.5)", "إصدار الأحداث بـ defineEmits", "الربط الثنائي بـ defineModel", "Template Refs بـ useTemplateRef", "كشف الأعضاء بـ defineExpose", "التواصل بين الـ Components"],
  lessonsEn: ["Creating Components", "Registering Components", "Props", "Prop Types", "Default Props", "Reactive Props Destructure", "Emitting Events with defineEmits", "Two-Way Binding with defineModel", "Template Refs with useTemplateRef", "Exposing Members with defineExpose", "Component Communication"],
  intro: "الـ Components هي اللبنات الأساسية لأي تطبيق Vue — نتعلم كيف نبنيها ونُمرّر البيانات بينها.",
  introEn: "Components are the building blocks of any Vue app — learn how to build them and pass data between them.",
  content: [
    { type: "heading", text: "إنشاء وتسجيل الـ Components" },
    { type: "code", code: `<!-- Button.vue -->
<script setup>
// لا يلزم تسجيل — <script setup> يُصدّر تلقائياً
</script>

<template>
  <button class="btn"><slot /></button>
</template>` },
    { type: "code", code: `<!-- App.vue -->
<script setup>
import Button from './Button.vue'
// بمجرد الاستيراد، يمكن استخدامه في الـ template
</script>

<template>
  <Button>انقر هنا</Button>
</template>` },
    { type: "heading", text: "الـ Props — تمرير البيانات للأسفل" },
    { type: "code", code: `<!-- UserCard.vue -->
<script setup>
const props = defineProps({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
})
</script>

<template>
  <div class="card">
    <h2>{{ props.name }}</h2>
    <p>العمر: {{ props.age }}</p>
    <span v-if="props.isAdmin">مشرف</span>
  </div>
</template>` },
    { type: "code", code: `<!-- App.vue -->
<template>
  <UserCard name="مصطفى" :age="30" :isAdmin="true" />
</template>` },
    { type: "heading", text: "Reactive Props Destructure (Vue 3.5)" },
    { type: "code", code: `<script setup>
// Vue 3.5: تفكيك مع حفاظ على reactivity
const { name, age = 25 } = defineProps({
  name: String,
  age: Number,
})
// name وage الآن reactive تلقائياً
</script>` },
    { type: "tip", text: "في Vue 3.5 وما بعدها، يمكنك تفكيك props مباشرة مع الحفاظ على الـ reactivity وتحديد القيم الافتراضية." },
    { type: "heading", text: "defineEmits — إرسال الأحداث للأعلى" },
    { type: "code", code: `<!-- Counter.vue -->
<script setup>
const emit = defineEmits(['increment', 'reset'])

function handleClick() {
  emit('increment', 1) // الحدث مع قيمة
}
</script>

<template>
  <button @click="handleClick">+1</button>
  <button @click="emit('reset')">إعادة</button>
</template>` },
    { type: "code", code: `<!-- App.vue -->
<template>
  <Counter
    @increment="(val) => count += val"
    @reset="count = 0"
  />
</template>` },
    { type: "heading", text: "defineModel — الربط الثنائي (Vue 3.4+)" },
    { type: "code", code: `<!-- SearchInput.vue -->
<script setup>
const model = defineModel()
// يستبدل modelValue + emit('update:modelValue', ...)
</script>

<template>
  <input :value="model" @input="model = $event.target.value" />
</template>` },
    { type: "code", code: `<!-- App.vue -->
<template>
  <SearchInput v-model="searchQuery" />
</template>` },
    { type: "heading", text: "useTemplateRef (Vue 3.5)" },
    { type: "code", code: `<script setup>
import { useTemplateRef, onMounted } from 'vue'

const inputRef = useTemplateRef('myInput')

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="myInput" />
</template>` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين Props وEmits؟", answer: "Props تُمرّر البيانات من parent إلى child (للأسفل). Emits تُرسل أحداثاً من child إلى parent (للأعلى). البيانات تتدفق في اتجاه واحد." },
    { type: "qa", question: "ما الجديد الذي يقدمه defineModel في Vue 3.4؟", answer: "defineModel يستبدل البويلربليت القديم (prop modelValue + emit update:modelValue) بسطر واحد، مما يجعل الـ two-way binding في custom components أبسط بكثير." },
  ],
  contentEn: [
    { type: "heading", text: "Props — Passing Data Down" },
    { type: "code", code: `<!-- UserCard.vue -->
<script setup>
const props = defineProps({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
})
</script>

<template>
  <div>{{ props.name }} — {{ props.age }}</div>
</template>` },
    { type: "heading", text: "defineEmits — Sending Events Up" },
    { type: "code", code: `<script setup>
const emit = defineEmits(['increment'])
</script>

<template>
  <button @click="emit('increment', 1)">+1</button>
</template>` },
    { type: "heading", text: "defineModel — Two-Way Binding (Vue 3.4+)" },
    { type: "code", code: `<!-- Child.vue -->
<script setup>
const model = defineModel()
</script>

<template>
  <input :value="model" @input="model = $event.target.value" />
</template>

<!-- Parent -->
<Child v-model="query" />` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between Props and Emits?", answer: "Props pass data from parent to child (down). Emits send events from child to parent (up). Data flows one direction." },
  ],
};
