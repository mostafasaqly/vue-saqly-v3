const e={id:15,title:"TypeScript مع Vue",titleEn:"TypeScript with Vue",level:"متوسط",levelEn:"Intermediate",lessons:["لماذا TypeScript مع Vue؟","إنشاء مشروع Vue + TypeScript","كتابة الـ Refs","كتابة الـ Reactive Objects","كتابة الـ Props","كتابة الـ Emits","كتابة defineModel","Generic Components","كتابة الـ Composables","أفضل ممارسات TypeScript"],lessonsEn:["Why TypeScript with Vue?","Creating a Vue + TypeScript Project","Typing Refs","Typing Reactive Objects","Typing Props","Typing Emits","Typing defineModel","Generic Components","Typing Composables","TypeScript Best Practices"],intro:"TypeScript يُضيف أماناً ووضوحاً لكودك في Vue — نتعلم كيف نكتب Vue 3 بالكامل بـ TypeScript.",introEn:"TypeScript adds safety and clarity to your Vue code — learn how to write Vue 3 fully in TypeScript.",content:[{type:"heading",text:"إنشاء مشروع Vue + TypeScript"},{type:"code",code:`$ npm create vue@latest my-ts-app
# اختر: TypeScript ✓`},{type:"heading",text:"كتابة الـ Refs"},{type:"code",code:`<script setup lang="ts">
import { ref } from 'vue'

// TypeScript يستنتج النوع تلقائياً
const count = ref(0)        // Ref<number>
const name = ref('Vue')     // Ref<string>

// النوع الصريح
const user = ref<User | null>(null)
const items = ref<string[]>([])

interface User {
  id: number
  name: string
  email: string
}
<\/script>`},{type:"heading",text:"كتابة الـ Props"},{type:"code",code:`<script setup lang="ts">
// الطريقة الموصى بها — withDefaults + defineProps
interface Props {
  name: string
  age?: number
  isAdmin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  age: 0,
  isAdmin: false,
})

// Vue 3.5 — تفكيك مع TypeScript
const { name, age = 0, isAdmin = false } = defineProps<Props>()
<\/script>`},{type:"heading",text:"كتابة الـ Emits"},{type:"code",code:`<script setup lang="ts">
const emit = defineEmits<{
  increment: [amount: number]
  reset: []
  'user-selected': [user: User]
}>()

emit('increment', 5)
emit('reset')
<\/script>`},{type:"heading",text:"Generic Components"},{type:"code",code:`<!-- List.vue -->
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  keyField: keyof T
}>()
<\/script>

<template>
  <ul>
    <li v-for="item in items" :key="String(item[keyField])">
      <slot :item="item" />
    </li>
  </ul>
</template>

<!-- استخدام -->
<List :items="users" keyField="id" v-slot="{ item }">
  {{ item.name }}
</List>`},{type:"heading",text:"كتابة الـ Composables"},{type:"code",code:`// composables/useFetch.ts
import { ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  fetch(url)
    .then(r => r.json())
    .then((d: T) => { data.value = d })
    .catch((e: Error) => { error.value = e.message })
    .finally(() => { loading.value = false })

  return { data, loading, error }
}

// الاستخدام مع Type Inference
interface Post { id: number; title: string }
const { data: posts } = useFetch<Post[]>('/api/posts')
// posts.value هو Post[] | null`},{type:"tip",text:"عند استخدام TypeScript مع Vue 3، تأكد من وجود lang='ts' في <script setup lang='ts'>."},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما فائدة withDefaults مع defineProps؟",answer:"withDefaults يتيح لك تعريف القيم الافتراضية للـ props عند استخدام TypeScript generics في defineProps — لأن object syntax العادية لا تعمل مع generic defineProps."}],contentEn:[{type:"heading",text:"Typing Props"},{type:"code",code:`<script setup lang="ts">
interface Props {
  name: string
  age?: number
}

const props = withDefaults(defineProps<Props>(), { age: 0 })

// Vue 3.5: destructure with types
const { name, age = 0 } = defineProps<Props>()
<\/script>`},{type:"heading",text:"Typing Emits"},{type:"code",code:`<script setup lang="ts">
const emit = defineEmits<{
  increment: [amount: number]
  reset: []
}>()
<\/script>`},{type:"heading",text:"Generic Components"},{type:"code",code:`<script setup lang="ts" generic="T">
defineProps<{ items: T[]; keyField: keyof T }>()
<\/script>`},{type:"heading",text:"✅ Review"},{type:"qa",question:"What does withDefaults do in TypeScript Vue components?",answer:"withDefaults lets you define default values for props when using TypeScript generics in defineProps — the regular object syntax doesn't work with generic defineProps."}]};export{e as default};
