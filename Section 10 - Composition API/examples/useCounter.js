// useCounter.js — Composable for a reactive counter
// Composable لعداد رياكتيف
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0, step = 1) {
  const count = ref(initialValue)

  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)

  const increment = () => { count.value += step }
  const decrement = () => { count.value -= step }
  const reset = () => { count.value = initialValue }
  const setCount = (val) => { count.value = val }

  return { count, doubleCount, isPositive, increment, decrement, reset, setCount }
}

/*
Usage in a component:
<script setup>
import { useCounter } from './useCounter'
const { count, increment, decrement, reset } = useCounter(0)
</script>
*/
