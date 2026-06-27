// useCounter.js — Simple reactive counter composable
// Composable بسيط لعداد رياكتيف
// Usage: import { useCounter } from './useCounter'

import { ref, computed } from 'vue'

/**
 * useCounter — A simple counter composable
 * @param {number} initialValue - القيمة الابتدائية للعداد
 * @param {number} step - الخطوة (افتراضياً 1)
 * @returns {{ count, doubleCount, isPositive, increment, decrement, reset, setCount }}
 */
export function useCounter(initialValue = 0, step = 1) {
  const count = ref(initialValue)

  // Computed values
  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)
  const isZero = computed(() => count.value === 0)

  // Actions
  const increment = () => {
    count.value += step
  }

  const decrement = () => {
    count.value -= step
  }

  const reset = () => {
    count.value = initialValue
  }

  const setCount = (value) => {
    count.value = value
  }

  const incrementBy = (amount) => {
    count.value += amount
  }

  return {
    // State
    count,
    // Computed
    doubleCount,
    isPositive,
    isZero,
    // Actions
    increment,
    decrement,
    reset,
    setCount,
    incrementBy,
  }
}

// Example usage in a component:
/*
<script setup>
import { useCounter } from './useCounter'

const { count, doubleCount, isPositive, increment, decrement, reset } = useCounter(0, 1)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="decrement">−</button>
    <button @click="reset">Reset</button>
    <button @click="increment">+</button>
  </div>
</template>
*/
