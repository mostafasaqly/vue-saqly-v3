export default {
  id: 7,
  title: "الـ Components",
  titleEn: "Components",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: [
    "إنشاء وتسجيل الـ Components",
    "الـ Props — تمرير البيانات للأسفل",
    "أنواع الـ Props والـ Validation",
    "القيم الافتراضية للـ Props",
    "Reactive Props Destructure (Vue 3.5)",
    "defineEmits — إرسال الأحداث للأعلى",
    "defineModel — الربط الثنائي (Vue 3.4+)",
    "useTemplateRef (Vue 3.5)",
    "defineExpose",
    "مخطط تواصل الـ Components",
  ],
  lessonsEn: [
    "Creating & Registering Components",
    "Props — Passing Data Down",
    "Prop Types & Validation",
    "Default Prop Values",
    "Reactive Props Destructure (Vue 3.5)",
    "defineEmits — Sending Events Up",
    "defineModel — Two-Way Binding (Vue 3.4+)",
    "useTemplateRef (Vue 3.5)",
    "defineExpose",
    "Component Communication Diagram",
  ],
  intro: "الـ Components هي اللبنات الأساسية لأي تطبيق Vue — نتعلم كيف نبنيها ونُمرّر البيانات بينها بـ Props وEmits وdefineModel.",
  introEn: "Components are the building blocks of any Vue app — learn how to build them and pass data between them using Props, Emits, and defineModel.",
  content: [
    { type: "heading", text: "إنشاء وتسجيل الـ Components" },
    { type: "paragraph", text: "في <script setup>، بمجرد استيراد الـ component يمكنك استخدامه في الـ template بدون تسجيل إضافي:" },
    { type: "code", code: `<!-- components/BaseButton.vue -->
<script setup>
// no explicit registration needed — <script setup> exports automatically
const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <button
    :class="['btn', 'btn--' + variant, 'btn--' + size]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn { padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
.btn--primary { background: #42b883; color: white; }
.btn--secondary { background: #35495e; color: white; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>` },
    { type: "code", code: `<!-- App.vue — استخدام الـ component -->
<script setup>
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <BaseButton variant="primary" @click="save">حفظ</BaseButton>
  <BaseButton variant="secondary" :disabled="loading">إلغاء</BaseButton>
</template>` },
    { type: "heading", text: "الـ Props — تمرير البيانات للأسفل" },
    { type: "code", code: `<!-- UserCard.vue — مثال Props متكامل -->
<script setup>
const props = defineProps({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  avatar: { type: String, default: '/default-avatar.png' },
  skills: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="card">
    <img :src="props.avatar" :alt="props.name" />
    <h2>{{ props.name }}</h2>
    <p>العمر: {{ props.age }}</p>
    <span v-if="props.isAdmin" class="badge">مشرف</span>
    <ul>
      <li v-for="skill in props.skills" :key="skill">{{ skill }}</li>
    </ul>
  </div>
</template>` },
    { type: "code", code: `<!-- Parent.vue — تمرير Props -->
<template>
  <UserCard
    name="مصطفى سقلى"
    :age="30"
    :isAdmin="true"
    :skills="['Vue', 'TypeScript', 'Pinia']"
  />
</template>` },
    { type: "tip", text: "للـ arrays وobjects كـ props، القيمة الافتراضية يجب أن تكون factory function: default: () => [] — لأن كل مثيل من الـ component يحتاج كائنه الخاص." },
    { type: "heading", text: "Reactive Props Destructure (Vue 3.5)" },
    { type: "code", code: `<script setup>
// Vue 3.5: تفكيك مع حفاظ على reactivity تلقائياً
const { name, age = 25, skills = [] } = defineProps({
  name: String,
  age: Number,
  skills: Array,
})
// name وage وskills الآن reactive تلقائياً
// يمكن استخدامها في computed وwatch
</script>

<template>
  <!-- لا داعي لـ props.name — استخدم name مباشرة -->
  <h2>{{ name }}</h2>
</template>` },
    { type: "heading", text: "defineEmits — إرسال الأحداث للأعلى" },
    { type: "code", code: `<!-- Counter.vue — emits مع TypeScript-style validation -->
<script setup>
const emit = defineEmits({
  increment: (amount) => typeof amount === 'number' && amount > 0,
  reset: null, // بدون validation
})

function handleIncrement() {
  emit('increment', 1)
}
</script>

<template>
  <button @click="handleIncrement">+1</button>
  <button @click="emit('reset')">إعادة</button>
</template>` },
    { type: "code", code: `<!-- App.vue — الاستماع للأحداث -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <Counter
    @increment="(val) => count += val"
    @reset="count = 0"
  />
  <p>العداد: {{ count }}</p>
</template>` },
    { type: "heading", text: "defineModel — الربط الثنائي (Vue 3.4+)" },
    { type: "code", code: `<!-- SearchInput.vue -->
<script setup>
// defineModel يستبدل: prop modelValue + emit('update:modelValue')
const model = defineModel()

// مع type وdefault
const value = defineModel({ type: String, default: '' })

// عدة نماذج مُسمّاة
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input :value="model" @input="model = $event.target.value" />
</template>` },
    { type: "code", code: `<!-- App.vue -->
<template>
  <SearchInput v-model="searchQuery" />

  <!-- عدة نماذج -->
  <UserForm v-model:firstName="first" v-model:lastName="last" />
</template>` },
    { type: "heading", text: "useTemplateRef (Vue 3.5)" },
    { type: "code", code: `<script setup>
import { useTemplateRef, onMounted } from 'vue'

// اسم يطابق ref="myInput" في الـ template
const inputRef = useTemplateRef('myInput')

onMounted(() => {
  inputRef.value?.focus() // تركيز تلقائي
  console.log(inputRef.value?.value) // قراءة القيمة
})
</script>

<template>
  <input ref="myInput" type="text" placeholder="ابدأ الكتابة..." />
</template>` },
    { type: "heading", text: "defineExpose" },
    { type: "code", code: `<!-- ChildModal.vue -->
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)

function open() { isOpen.value = true }
function close() { isOpen.value = false }

// كشف ما تريد فقط للـ parent
defineExpose({ open, close })
</script>` },
    { type: "code", code: `<!-- App.vue -->
<script setup>
import { useTemplateRef } from 'vue'
const modal = useTemplateRef('modal')
</script>

<template>
  <ChildModal ref="modal" />
  <button @click="modal.open()">فتح المودال</button>
</template>` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين Props وEmits؟", answer: "Props تُمرّر البيانات من parent إلى child (للأسفل). Emits تُرسل أحداثاً من child إلى parent (للأعلى). البيانات تتدفق في اتجاه واحد — هذا يجعل تتبع تدفق البيانات أسهل." },
    { type: "qa", question: "ما الجديد الذي يقدمه defineModel في Vue 3.4؟", answer: "defineModel يستبدل الـ boilerplate القديم (prop modelValue + emit update:modelValue) بسطر واحد. يدعم عدة نماذج مُسمّاة (v-model:firstName)، type checking، وقيم افتراضية." },
    { type: "qa", question: "ما الفرق بين ref القديمة وuseTemplateRef في Vue 3.5؟", answer: "ref القديمة كانت تستخدم const inputRef = ref(null) ثم ref=\"inputRef\" في الـ template. useTemplateRef أوضح: الاسم في الـ template يطابق الـ string في useTemplateRef('myInput'). أيضاً typed بشكل أفضل مع TypeScript." },
    { type: "qa", question: "لماذا القيم الافتراضية لـ Array وObject في Props تكون factory functions؟", answer: "في JavaScript، الكائنات والمصفوفات بالمرجع (by reference). إذا استخدمت default: [] مباشرة، كل instances من الـ component ستشترك في نفس المصفوفة — تغيير واحدة يؤثر على البقية. factory function تُنشئ مصفوفة جديدة لكل instance." },
  ],
  contentEn: [
    { type: "heading", text: "Creating & Registering Components" },
    { type: "paragraph", text: "In <script setup>, simply import the component — no explicit registration needed. It's automatically available in the template." },
    { type: "code", code: `<!-- App.vue -->
<script setup>
import BaseButton from '@/components/BaseButton.vue'
// That's it — BaseButton is now usable in the template
</script>

<template>
  <BaseButton variant="primary" @click="save">Save</BaseButton>
</template>` },
    { type: "heading", text: "Props — Passing Data Down" },
    { type: "code", code: `<!-- UserCard.vue -->
<script setup>
const props = defineProps({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  skills: { type: Array, default: () => [] }, // factory fn required for arrays
})
</script>

<template>
  <div class="card">
    <h2>{{ props.name }}</h2>
    <span v-if="props.isAdmin">Admin</span>
    <li v-for="skill in props.skills" :key="skill">{{ skill }}</li>
  </div>
</template>` },
    { type: "heading", text: "Reactive Props Destructure (Vue 3.5)" },
    { type: "code", code: `<script setup>
// Destructure while keeping reactivity (Vue 3.5)
const { name, age = 25, skills = [] } = defineProps({
  name: String,
  age: Number,
  skills: Array,
})
// name, age, skills are now reactive automatically
</script>

<template>
  <h2>{{ name }}</h2>
</template>` },
    { type: "heading", text: "defineEmits — Sending Events Up" },
    { type: "code", code: `<script setup>
const emit = defineEmits(['increment', 'reset'])

function handleClick() {
  emit('increment', 1)
}
</script>

<template>
  <button @click="handleClick">+1</button>
  <button @click="emit('reset')">Reset</button>
</template>

<!-- Parent listens: -->
<!-- <Counter @increment="count += $event" @reset="count = 0" /> -->` },
    { type: "heading", text: "defineModel — Two-Way Binding (Vue 3.4+)" },
    { type: "code", code: `<!-- SearchInput.vue -->
<script setup>
// Replaces: prop modelValue + emit('update:modelValue', ...)
const model = defineModel()
</script>

<template>
  <input :value="model" @input="model = $event.target.value" />
</template>

<!-- Parent: <SearchInput v-model="searchQuery" /> -->` },
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
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between Props and Emits?", answer: "Props pass data from parent to child (downward). Emits send events from child to parent (upward). Data flows one direction — this makes tracking data flow easier and more predictable." },
    { type: "qa", question: "What does defineModel replace in Vue 3.4?", answer: "defineModel replaces the old boilerplate of declaring a modelValue prop and manually emitting update:modelValue. It creates the two-way binding in one line and supports named models (v-model:firstName)." },
    { type: "qa", question: "Why must default values for Array/Object props be factory functions?", answer: "Objects and arrays are passed by reference in JavaScript. If you use default: [] directly, all component instances share the same array — mutating one affects all. A factory function creates a new array for each instance." },
  ],
};
