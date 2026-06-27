const e={id:15,title:"TypeScript مع Vue",titleEn:"TypeScript with Vue",level:"متقدم",levelEn:"Advanced",lessons:["لماذا TypeScript مع Vue؟","إنشاء مشروع Vue + TypeScript","كتابة الـ Refs","كتابة الـ Reactive Objects","interfaces وtypes في Vue","كتابة الـ Props بـ TypeScript","كتابة الـ Emits بـ TypeScript","كتابة defineModel","Generic Components","كتابة الـ Composables","كتابة Pinia Stores","Utility Types المفيدة"],lessonsEn:["Why TypeScript with Vue?","Creating a Vue + TypeScript Project","Typing Refs","Typing Reactive Objects","Interfaces & Types in Vue","Typing Props with TypeScript","Typing Emits with TypeScript","Typing defineModel","Generic Components","Typing Composables","Typing Pinia Stores","Useful Utility Types"],intro:"TypeScript يُضيف أماناً ووضوحاً لكودك في Vue — نتعلم كيف نكتب Vue 3 بالكامل بـ TypeScript بأفضل الممارسات.",introEn:"TypeScript adds safety and clarity to your Vue code — learn how to write Vue 3 fully in TypeScript with best practices.",content:[{type:"heading",text:"إنشاء مشروع Vue + TypeScript"},{type:"code",code:`$ npm create vue@latest my-ts-app
# اختر: TypeScript ✓

# أو إضافته لمشروع موجود:
$ npm install -D typescript vue-tsc`},{type:"heading",text:"interfaces وtypes — التعريفات المشتركة"},{type:"code",code:`// src/types/index.ts
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string  // ? = اختياري
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  createdAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
}

export type Status = 'idle' | 'loading' | 'success' | 'error'`},{type:"heading",text:"كتابة الـ Refs"},{type:"code",code:`<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types'

// TypeScript يستنتج النوع تلقائياً
const count = ref(0)         // Ref<number>
const name = ref('Vue')      // Ref<string>
const loading = ref(false)   // Ref<boolean>

// النوع الصريح — مطلوب للـ union types
const user = ref<User | null>(null)
const items = ref<User[]>([])
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
<\/script>`},{type:"heading",text:"كتابة الـ Props"},{type:"code",code:`<!-- UserCard.vue -->
<script setup lang="ts">
import type { User } from '@/types'

// الطريقة الموصى بها — TypeScript generics
interface Props {
  user: User
  size?: 'sm' | 'md' | 'lg'
  showActions?: boolean
}

// withDefaults لقيم افتراضية
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showActions: true,
})

// Vue 3.5 — تفكيك مع TypeScript
const { user, size = 'md', showActions = true } = defineProps<Props>()
<\/script>

<template>
  <div :class="['card', 'card--' + size]">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <span v-if="user.role === 'admin'">مشرف</span>
  </div>
</template>`},{type:"heading",text:"كتابة الـ Emits"},{type:"code",code:`<script setup lang="ts">
import type { User } from '@/types'

// TypeScript-style emit declarations
const emit = defineEmits<{
  increment: [amount: number]    // emit('increment', 5)
  reset: []                      // emit('reset')
  'user-selected': [user: User]  // emit('user-selected', user)
  'update:modelValue': [value: string] // للـ v-model
}>()

function selectUser(user: User) {
  emit('user-selected', user)
}
<\/script>`},{type:"heading",text:"Generic Components"},{type:"code",code:`<!-- DataList.vue — يعمل مع أي نوع -->
<script setup lang="ts" generic="T extends { id: number | string }">
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

<!-- استخدام مع type inference -->
<DataList :items="(users as User[])" keyField="id" v-slot="{ item }">
  {{ item.name }}  <!-- TypeScript يعرف أن item هو User -->
</DataList>`},{type:"heading",text:"كتابة الـ Composables"},{type:"code",code:`// composables/useFetch.ts
import { ref } from 'vue'
import type { Ref } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  refresh: () => void
}

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function refresh() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      data.value = await res.json() as T
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  refresh()
  return { data, loading, error, refresh }
}

// الاستخدام مع Type Inference
import type { Post } from '@/types'
const { data: posts, loading } = useFetch<Post[]>('/api/posts')
// posts.value هو Post[] | null — TypeScript يعرف ذلك`},{type:"heading",text:"كتابة Pinia Store"},{type:"code",code:`// stores/useAuthStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  const isLoggedIn = computed((): boolean => !!token.value)
  const isAdmin = computed((): boolean => user.value?.role === 'admin')

  async function login(email: string, password: string): Promise<void> {
    // ...
  }

  function logout(): void {
    user.value = null
    token.value = null
  }

  return { user, token, isLoggedIn, isAdmin, login, logout }
})`},{type:"heading",text:"Utility Types المفيدة"},{type:"code",code:`// أهم TypeScript utility types في Vue
import type { User } from '@/types'

// Partial — كل الخصائص اختيارية
type UserUpdate = Partial<User>  // { id?: number, name?: string, ... }

// Required — كل الخصائص مطلوبة
type RequiredUser = Required<User>

// Pick — اختيار خصائص محددة
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>

// Omit — حذف خصائص محددة
type PublicUser = Omit<User, 'email'>

// Record — object مع keys وvalues محددة النوع
const userMap = {} as Record<number, User>

// MaybeRef — يقبل قيمة عادية أو ref (مفيد في Composables)
import type { MaybeRef } from 'vue'
function useTitle(title: MaybeRef<string>) { /* ... */ }`},{type:"tip",text:"ضع الـ interfaces والـ types المشتركة في src/types/index.ts وأستوردها حيثما تحتاج. استخدم import type بدلاً من import للأنواع فقط — Vite يُزيلها من الـ bundle."},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما فائدة withDefaults مع defineProps بـ TypeScript؟",answer:"عند استخدام TypeScript generics في defineProps<Props>()، لا يمكن تعريف القيم الافتراضية داخل defineProps مباشرة. withDefaults يُضيف هذه القيم: withDefaults(defineProps<Props>(), { age: 0 })."},{type:"qa",question:"ما الفرق بين interface وtype في TypeScript مع Vue؟",answer:"كلاهما يُستخدم وغالباً متبادلان. interface أفضل للكائنات (قابلة للتوسيع بـ extends). type أفضل للـ union types والـ aliases. التوصية: interface للـ data shapes (User, Post)، type للـ unions (Status, Role)."},{type:"qa",question:'ما هو generic="T" في Generic Components؟',answer:"يُعرّف type parameter في الـ component — مثل function<T>. يسمح للـ component بقبول items: T[] وإرجاع :item في scoped slot بنفس النوع T. TypeScript يستنتج T تلقائياً من الـ prop المُمرَّر."},{type:"qa",question:"لماذا نستخدم import type في Vue مع TypeScript؟",answer:"import type يُخبر الـ compiler أن هذا الاستيراد للأنواع فقط — Vite/TypeScript يُزيله من الـ bundle في runtime. يُحسّن الأداء ويمنع circular imports. استخدمه دائماً عند استيراد interfaces وtypes."}],contentEn:[{type:"heading",text:"Shared Types"},{type:"code",code:`// src/types/index.ts
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string
}

export type Status = 'idle' | 'loading' | 'success' | 'error'`},{type:"heading",text:"Typing Props"},{type:"code",code:`<script setup lang="ts">
import type { User } from '@/types'

interface Props {
  user: User
  size?: 'sm' | 'md' | 'lg'
}

// withDefaults for default values with TypeScript
const props = withDefaults(defineProps<Props>(), { size: 'md' })

// Vue 3.5: destructure with defaults
const { user, size = 'md' } = defineProps<Props>()
<\/script>`},{type:"heading",text:"Typing Emits"},{type:"code",code:`<script setup lang="ts">
import type { User } from '@/types'

const emit = defineEmits<{
  increment: [amount: number]
  reset: []
  'user-selected': [user: User]
}>()
<\/script>`},{type:"heading",text:"Generic Components"},{type:"code",code:`<!-- DataList.vue -->
<script setup lang="ts" generic="T extends { id: number | string }">
defineProps<{ items: T[]; keyField: keyof T }>()
<\/script>

<template>
  <ul>
    <li v-for="item in items" :key="String(item[keyField])">
      <slot :item="item" />
    </li>
  </ul>
</template>

<!-- Usage — TypeScript infers T as User -->
<DataList :items="users" keyField="id" v-slot="{ item }">
  {{ item.name }}
</DataList>`},{type:"heading",text:"Typing Composables"},{type:"code",code:`// composables/useFetch.ts
import { ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function refresh() {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json() as T
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  refresh()
  return { data, loading, error, refresh }
}

// Usage with type inference
const { data: posts } = useFetch<Post[]>('/api/posts')
// posts.value is Post[] | null`},{type:"tip",text:"Put shared interfaces in src/types/index.ts and import them anywhere. Use import type for type-only imports — Vite removes them from the bundle."},{type:"heading",text:"✅ Review"},{type:"qa",question:"What does withDefaults do with TypeScript defineProps?",answer:"When using TypeScript generics in defineProps<Props>(), you can't define default values inside defineProps. withDefaults adds them: withDefaults(defineProps<Props>(), { size: 'md', showActions: true })."},{type:"qa",question:'What is generic="T" in Generic Components?',answer:"It defines a type parameter for the component — like a generic function. It allows the component to accept items: T[] and return the slot item with the same type T. TypeScript infers T automatically from the passed prop."}]};export{e as default};
