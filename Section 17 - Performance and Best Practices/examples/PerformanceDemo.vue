<script setup>
// PerformanceDemo.vue
// computed vs method, v-memo, async component
import { ref, computed, defineAsyncComponent } from 'vue'

// ===== computed vs method =====
const count = ref(0)
const items = ref(Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, value: i + 1 })))

// computed — cached, only recalculates when count changes
const computedDouble = computed(() => {
  console.log('[computed] calculating...')
  return count.value * 2
})

// method — recalculates every time it's called
const methodDouble = () => {
  console.log('[method] calculating...')
  return count.value * 2
}

// ===== Expensive computed =====
const expensiveSum = computed(() => {
  console.log('[computed] Expensive calculation...')
  return items.value.reduce((sum, item) => sum + item.value, 0)
})

// ===== v-memo example =====
const selectedId = ref(null)
const listItems = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `عنصر ${i + 1}`,
    isActive: i % 3 === 0,
  }))
)

const toggleSelect = (id) => {
  selectedId.value = selectedId.value === id ? null : id
}

// ===== Async Component =====
const AsyncHeavy = defineAsyncComponent({
  loader: () =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve({ template: '<div style="padding:1rem;background:#f0faf6;border-radius:8px">✅ المكون الثقيل تم تحميله!</div>' }),
        2000
      )
    ),
  loadingComponent: { template: '<div style="color:#999">⏳ جاري تحميل المكون...</div>' },
  delay: 200,
  timeout: 10000,
})

const showAsyncComponent = ref(false)
const renderCount = ref(0)

// Track renders
const trackRender = (name) => {
  renderCount.value++
  console.log(`[Render] ${name} — total: ${renderCount.value}`)
}
</script>

<template>
  <div class="demo" dir="rtl">
    <h1>Performance & Best Practices Demo</h1>

    <!-- computed vs method -->
    <section>
      <h2>computed مقابل method</h2>
      <p>العداد: <strong>{{ count }}</strong></p>
      <div class="controls">
        <button @click="count++">زيادة العداد</button>
      </div>

      <!-- computed is cached — same result, no recalculation -->
      <div class="result-box">
        <h4>computed (مُخزَّن في الـ Cache):</h4>
        <p>القيمة: {{ computedDouble }} — {{ computedDouble }} — {{ computedDouble }}</p>
        <small>لاحظ في Console: يُحسَب مرة واحدة فقط لكل تغيير</small>
      </div>

      <!-- method recalculates every time it's called in template -->
      <div class="result-box warning">
        <h4>method (يُحسَب في كل استدعاء):</h4>
        <p>القيمة: {{ methodDouble() }} — {{ methodDouble() }} — {{ methodDouble() }}</p>
        <small>لاحظ في Console: يُحسَب 3 مرات في كل render!</small>
      </div>

      <div class="result-box">
        <h4>Expensive computed (1000 عنصر):</h4>
        <p>المجموع: {{ expensiveSum }} (يُحسَب مرة واحدة فقط حتى تتغير items)</p>
      </div>
    </section>

    <!-- v-memo -->
    <section>
      <h2>v-memo — تحسين القوائم</h2>
      <p>انقر على عنصر للتحديد. <strong>v-memo</strong> يمنع إعادة رسم العناصر التي لم تتغير.</p>
      <ul class="item-list">
        <li
          v-for="item in listItems"
          :key="item.id"
          v-memo="[item.id === selectedId, item.isActive]"
          :class="{ selected: item.id === selectedId, active: item.isActive }"
          @click="toggleSelect(item.id)"
        >
          {{ item.name }}
          <span v-if="item.id === selectedId"> ✓</span>
          <span v-if="item.isActive" class="active-badge"> نشط</span>
        </li>
      </ul>
      <p>المحدد: {{ selectedId ? `عنصر #${selectedId}` : 'لا يوجد' }}</p>
    </section>

    <!-- Async Component + Suspense -->
    <section>
      <h2>Async Component + Suspense</h2>
      <button @click="showAsyncComponent = !showAsyncComponent">
        {{ showAsyncComponent ? 'إخفاء' : 'تحميل المكون الثقيل' }}
      </button>

      <div v-if="showAsyncComponent" style="margin-top:1rem">
        <Suspense>
          <template #default>
            <AsyncHeavy />
          </template>
          <template #fallback>
            <div class="loading">⏳ جاري تحميل المكون... (2 ثانية)</div>
          </template>
        </Suspense>
      </div>
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

.controls { margin-bottom: 1rem; }

button {
  padding: 0.4rem 0.9rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.result-box {
  background: #f0f9f4;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid #42b883;
}

.result-box.warning {
  background: #fff8e1;
  border-left-color: #ff9800;
}

.result-box h4 { margin: 0 0 0.4rem; font-size: 0.9rem; }
.result-box small { color: #666; font-size: 0.78rem; }

.item-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin: 0.75rem 0;
}

.item-list li {
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.15s;
  text-align: center;
}

.item-list li.selected {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.item-list li.active {
  border-color: #2196f3;
}

.active-badge {
  font-size: 0.7rem;
  color: #2196f3;
}

.loading {
  padding: 1rem;
  color: #999;
  font-style: italic;
}
</style>
