// stores/useCounterStore.js — Simple Pinia counter store
// مخزن عداد بسيط باستخدام Pinia (Setup Store style)
// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // ===== STATE =====
  const count = ref(0)
  const history = ref([])

  // ===== GETTERS (computed) =====
  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)
  const isZero = computed(() => count.value === 0)
  const absoluteValue = computed(() => Math.abs(count.value))

  // ===== ACTIONS =====
  const increment = (amount = 1) => {
    count.value += amount
    history.value.push({ action: 'increment', value: count.value, time: new Date().toISOString() })
  }

  const decrement = (amount = 1) => {
    count.value -= amount
    history.value.push({ action: 'decrement', value: count.value, time: new Date().toISOString() })
  }

  const reset = () => {
    count.value = 0
    history.value.push({ action: 'reset', value: 0, time: new Date().toISOString() })
  }

  const setCount = (value) => {
    count.value = value
  }

  const clearHistory = () => {
    history.value = []
  }

  return {
    // State
    count,
    history,
    // Getters
    doubleCount,
    isPositive,
    isZero,
    absoluteValue,
    // Actions
    increment,
    decrement,
    reset,
    setCount,
    clearHistory,
  }
})

/*
Usage in a component:
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/useCounterStore'

const store = useCounterStore()
const { count, doubleCount, isPositive } = storeToRefs(store)
const { increment, decrement, reset } = store
*/
