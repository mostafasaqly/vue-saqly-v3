// options-vs-composition.js
// مقارنة بين Options API و Composition API
// Side-by-side comparison of Options API vs Composition API

// ============================================================
// OPTIONS API — الأسلوب التقليدي / Traditional style
// ============================================================
export const OptionsAPIExample = {
  // Component name
  name: 'UserProfileOptions',

  // Data — reactive state
  data() {
    return {
      firstName: 'مصطفى',
      lastName: 'سقلى',
      age: 28,
      isLoggedIn: false,
    }
  },

  // Computed — derived state (cached)
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    isAdult() {
      return this.age >= 18
    },
  },

  // Methods — functions
  methods: {
    login() {
      this.isLoggedIn = true
      console.log(`${this.fullName} logged in`)
    },
    logout() {
      this.isLoggedIn = false
    },
    birthday() {
      this.age++
    },
  },

  // Lifecycle hooks
  mounted() {
    console.log('Component mounted!')
    this.login()
  },

  beforeUnmount() {
    console.log('Component will unmount')
  },
}

// ============================================================
// COMPOSITION API — الأسلوب الحديث / Modern style
// (use inside <script setup>)
// ============================================================
/*
In a .vue file with <script setup>:

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Reactive state
const firstName = ref('مصطفى')
const lastName = ref('سقلى')
const age = ref(28)
const isLoggedIn = ref(false)

// Computed
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
const isAdult = computed(() => age.value >= 18)

// Methods (just regular functions)
const login = () => {
  isLoggedIn.value = true
  console.log(`${fullName.value} logged in`)
}

const logout = () => {
  isLoggedIn.value = false
}

const birthday = () => {
  age.value++
}

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted!')
  login()
})

onBeforeUnmount(() => {
  console.log('Component will unmount')
})
*/

// ============================================================
// KEY DIFFERENCES / الفروقات الرئيسية
// ============================================================
export const differences = {
  codeOrganization: {
    optionsAPI: 'By option type (data, computed, methods)',
    compositionAPI: 'By logical concern (can group related code)',
  },
  reuse: {
    optionsAPI: 'Mixins (can conflict)',
    compositionAPI: 'Composables (clean, no conflicts)',
  },
  typescript: {
    optionsAPI: 'Limited type inference',
    compositionAPI: 'Excellent TypeScript support',
  },
  accessToThis: {
    optionsAPI: 'Uses `this` to access reactive data',
    compositionAPI: 'Uses `.value` on refs directly',
  },
}
