<script setup>
// Counter.vue — Simple counter with Composition API
// عداد بسيط باستخدام Composition API
import { ref, computed } from 'vue'

const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++
const decrement = () => {
  if (count.value > 0) count.value--
}
const reset = () => (count.value = 0)
</script>

<template>
  <div class="counter">
    <h2>🔢 العداد | Counter</h2>
    <div class="display">
      <span class="count">{{ count }}</span>
    </div>
    <div class="info">
      <p>ضعف القيمة | Double: <strong>{{ doubleCount }}</strong></p>
      <p>النوع | Type: <strong>{{ isEven ? 'زوجي / Even' : 'فردي / Odd' }}</strong></p>
    </div>
    <div class="buttons">
      <button @click="decrement" :disabled="count === 0">−</button>
      <button @click="reset" class="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
.counter {
  max-width: 320px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
}

.display {
  margin: 1.5rem 0;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  color: #42b883;
}

.info {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

button {
  padding: 0.6rem 1.5rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #42b883;
  color: white;
  transition: background 0.2s;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button.reset {
  background: #ff6b6b;
  font-size: 0.9rem;
}

button:hover:not(:disabled) {
  filter: brightness(1.1);
}
</style>
