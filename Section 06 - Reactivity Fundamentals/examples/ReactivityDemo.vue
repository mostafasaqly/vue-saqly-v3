<script setup>
// ReactivityDemo.vue
// ref, reactive, computed, watch, watchEffect all in one component
import { ref, reactive, computed, watch, watchEffect, onWatcherCleanup } from 'vue'

// ===== ref =====
const count = ref(0)
const name = ref('مصطفى')
const isVisible = ref(true)

// ===== reactive =====
const product = reactive({
  title: 'قميص Vue',
  price: 150,
  quantity: 1,
})

// ===== computed =====
const doubleCount = computed(() => count.value * 2)
const totalPrice = computed(() => product.price * product.quantity)
const isExpensive = computed(() => totalPrice.value > 500)
const greeting = computed(() => `مرحباً ${name.value}، العداد: ${count.value}`)

// ===== watch =====
const watchLog = ref([])

watch(count, (newVal, oldVal) => {
  watchLog.value.push(`count: ${oldVal} → ${newVal}`)
})

watch(
  () => product.quantity,
  (newQty) => {
    watchLog.value.push(`الكمية تغيّرت إلى: ${newQty}`)
  }
)

// ===== watchEffect =====
const effectLog = ref([])

watchEffect(() => {
  // Auto-tracks count and name
  effectLog.value.push(`Effect: count=${count.value}, name=${name.value}`)

  // onWatcherCleanup (Vue 3.5)
  onWatcherCleanup(() => {
    console.log('Cleanup — next effect run starting')
  })
})

// Actions
const increment = () => count.value++
const decrement = () => count.value > 0 && count.value--
const clearLogs = () => {
  watchLog.value = []
  effectLog.value = []
}
</script>

<template>
  <div class="demo" dir="rtl">
    <h1>Reactivity Fundamentals Demo</h1>

    <!-- ref examples -->
    <section>
      <h2>ref — المراجع الرياكتيفة</h2>
      <div class="row">
        <button @click="decrement">−</button>
        <span class="big-num">{{ count }}</span>
        <button @click="increment">+</button>
      </div>
      <p>ضعف القيمة (computed): <strong>{{ doubleCount }}</strong></p>
      <p>{{ greeting }}</p>
      <div class="field">
        <label>الاسم: </label>
        <input v-model="name" />
      </div>
      <div class="field">
        <label>مرئي:</label>
        <input type="checkbox" v-model="isVisible" />
        <span v-if="isVisible" class="badge green">مرئي ✓</span>
        <span v-else class="badge red">مخفي ✗</span>
      </div>
    </section>

    <!-- reactive example -->
    <section>
      <h2>reactive — الـ Objects الرياكتيفة</h2>
      <div class="product-card">
        <div class="field">
          <label>اسم المنتج:</label>
          <input v-model="product.title" />
        </div>
        <div class="field">
          <label>السعر (جنيه):</label>
          <input v-model.number="product.price" type="number" min="0" />
        </div>
        <div class="field">
          <label>الكمية:</label>
          <input v-model.number="product.quantity" type="number" min="1" />
        </div>
        <div class="total" :class="{ expensive: isExpensive }">
          الإجمالي: <strong>{{ totalPrice }} جنيه</strong>
          <span v-if="isExpensive"> (مرتفع السعر!)</span>
        </div>
      </div>
    </section>

    <!-- watch log -->
    <section>
      <h2>watch — سجل التغييرات</h2>
      <div class="log-box">
        <p v-if="watchLog.length === 0" class="empty">لا يوجد تغييرات بعد...</p>
        <p v-for="(log, i) in watchLog" :key="i" class="log-entry">{{ log }}</p>
      </div>
    </section>

    <!-- watchEffect log -->
    <section>
      <h2>watchEffect — التتبع التلقائي</h2>
      <div class="log-box">
        <p v-for="(log, i) in effectLog" :key="i" class="log-entry effect">{{ log }}</p>
      </div>
      <button @click="clearLogs" class="clear-btn">مسح السجلات</button>
    </section>
  </div>
</template>

<style scoped>
.demo {
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}

section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

h2 { color: #42b883; margin-bottom: 1rem; }

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.big-num {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b883;
  min-width: 60px;
  text-align: center;
}

.field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}

.badge {
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
}
.badge.green { background: #e8f5e9; color: #2e7d32; }
.badge.red { background: #ffebee; color: #c62828; }

.product-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
}

.total {
  margin-top: 0.75rem;
  font-size: 1.1rem;
  padding: 0.5rem;
  background: #e8f5e9;
  border-radius: 6px;
}

.total.expensive {
  background: #fff3e0;
  color: #e65100;
}

.log-box {
  background: #1e1e1e;
  color: #a8ff78;
  border-radius: 6px;
  padding: 1rem;
  font-family: monospace;
  font-size: 0.85rem;
  max-height: 150px;
  overflow-y: auto;
}

.log-entry { margin-bottom: 0.3rem; }
.log-entry.effect { color: #78c8ff; }
.empty { color: #666; font-style: italic; }

.clear-btn {
  margin-top: 0.75rem;
  padding: 0.4rem 0.9rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

input[type="text"], input[type="number"] {
  padding: 0.4rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 0.5rem 1.2rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
