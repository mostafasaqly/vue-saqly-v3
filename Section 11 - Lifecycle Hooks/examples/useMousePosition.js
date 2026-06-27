// useMousePosition.js — Lifecycle hooks inside a composable
// استخدام Lifecycle Hooks داخل Composable
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * useMousePosition — tracks mouse position
 * Demonstrates using lifecycle hooks inside a composable
 * @returns {{ x, y, isTracking }}
 */
export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const isTracking = ref(false)

  const updatePosition = (event) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  // Add event listener when component mounts
  onMounted(() => {
    window.addEventListener('mousemove', updatePosition)
    isTracking.value = true
    console.log('Mouse tracking started')
  })

  // Remove event listener when component unmounts (IMPORTANT!)
  onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition)
    isTracking.value = false
    console.log('Mouse tracking stopped — no memory leak!')
  })

  return { x, y, isTracking }
}

/*
Usage in a component:
<script setup>
import { useMousePosition } from './useMousePosition'
const { x, y } = useMousePosition()
</script>

<template>
  <p>Mouse: {{ x }}, {{ y }}</p>
</template>
*/
