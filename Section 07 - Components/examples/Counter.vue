<script setup>
// Counter.vue — Component with defineEmits
// مكون العداد مع defineEmits
import { ref, computed } from 'vue'

const props = defineProps({
  initialValue: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  min: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: null,
  },
  label: {
    type: String,
    default: 'العداد',
  },
})

// defineEmits with validation
const emit = defineEmits({
  change: (value) => typeof value === 'number',
  'reach-min': null,
  'reach-max': null,
})

const count = ref(props.initialValue)

const canDecrement = computed(() =>
  props.min === null ? true : count.value - props.step >= props.min
)

const canIncrement = computed(() =>
  props.max === null ? true : count.value + props.step <= props.max
)

const increment = () => {
  if (!canIncrement.value) {
    emit('reach-max', count.value)
    return
  }
  count.value += props.step
  emit('change', count.value)
}

const decrement = () => {
  if (!canDecrement.value) {
    emit('reach-min', count.value)
    return
  }
  count.value -= props.step
  emit('change', count.value)
}

const reset = () => {
  count.value = props.initialValue
  emit('change', count.value)
}
</script>

<template>
  <div class="counter" dir="rtl">
    <label class="counter-label">{{ label }}</label>
    <div class="counter-controls">
      <button @click="decrement" :disabled="!canDecrement" class="btn-dec">−</button>
      <span class="counter-value">{{ count }}</span>
      <button @click="increment" :disabled="!canIncrement" class="btn-inc">+</button>
    </div>
    <button @click="reset" class="btn-reset">إعادة تعيين</button>
    <div class="info" v-if="min !== null || max !== null">
      <span v-if="min !== null">الحد الأدنى: {{ min }}</span>
      <span v-if="max !== null">الحد الأقصى: {{ max }}</span>
    </div>
  </div>
</template>

<style scoped>
.counter {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  font-family: 'Segoe UI', sans-serif;
}

.counter-label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.counter-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.counter-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b883;
  min-width: 60px;
  text-align: center;
}

button {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.4rem 0.9rem;
  transition: all 0.2s;
}

.btn-dec, .btn-inc {
  background: #42b883;
  color: white;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-reset {
  background: #f5f5f5;
  color: #333;
  font-size: 0.85rem;
  padding: 0.3rem 0.9rem;
}

.info {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #999;
}
</style>
