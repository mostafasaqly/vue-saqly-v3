<script setup>
// ThemedCard.vue — v-bind() in CSS + Scoped CSS + CSS Modules demo
// عرض v-bind() في CSS مع Scoped CSS و CSS Modules
import { ref, reactive } from 'vue'

// Reactive theme values — will be used in CSS via v-bind()
const theme = reactive({
  primaryColor: '#42b883',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderRadius: '12px',
  padding: '1.5rem',
  fontSize: '1rem',
})

const cardTitle = ref('بطاقة ديناميكية الألوان')
const cardContent = ref('هذه البطاقة تغيّر مظهرها ديناميكياً بناءً على قيم JavaScript رياكتيفية.')

const presets = [
  { name: 'Vue Green', primaryColor: '#42b883', backgroundColor: '#f0faf6', textColor: '#1a3a2a' },
  { name: 'Ocean Blue', primaryColor: '#2196f3', backgroundColor: '#e3f2fd', textColor: '#0d3a5c' },
  { name: 'Sunset Red', primaryColor: '#f44336', backgroundColor: '#ffebee', textColor: '#5c1a1a' },
  { name: 'Purple', primaryColor: '#9c27b0', backgroundColor: '#f3e5f5', textColor: '#3a1a5c' },
  { name: 'Dark', primaryColor: '#ffd700', backgroundColor: '#1e1e2e', textColor: '#e0e0ff' },
]

const applyPreset = (preset) => Object.assign(theme, preset)
</script>

<template>
  <div class="demo-wrapper" dir="rtl">
    <h1>UI & Styling Demo</h1>

    <!-- Theme Controls -->
    <section class="controls">
      <h2>أدوات التحكم | Controls</h2>
      <div class="presets">
        <button
          v-for="preset in presets"
          :key="preset.name"
          @click="applyPreset(preset)"
          :style="{ background: preset.primaryColor, color: 'white' }"
        >
          {{ preset.name }}
        </button>
      </div>
      <div class="custom-controls">
        <label>
          اللون الأساسي:
          <input type="color" v-model="theme.primaryColor" />
        </label>
        <label>
          خلفية البطاقة:
          <input type="color" v-model="theme.backgroundColor" />
        </label>
        <label>
          لون النص:
          <input type="color" v-model="theme.textColor" />
        </label>
        <label>
          الـ Border Radius:
          <input type="range" v-model="theme.borderRadius" min="0" max="32" step="2"
            :value="parseInt(theme.borderRadius)"
            @input="e => theme.borderRadius = e.target.value + 'px'"
          />
          {{ theme.borderRadius }}
        </label>
      </div>
    </section>

    <!-- The themed card — uses v-bind() in CSS -->
    <div class="themed-card">
      <div class="card-header">
        <h3>{{ cardTitle }}</h3>
        <span class="badge">v-bind() in CSS</span>
      </div>
      <div class="card-body">
        <p>{{ cardContent }}</p>
        <p>اللون الأساسي المختار: <code>{{ theme.primaryColor }}</code></p>
      </div>
      <div class="card-footer">
        <button class="card-btn">إجراء رئيسي</button>
        <button class="card-btn-outline">إجراء ثانوي</button>
      </div>
    </div>

    <!-- CSS Modules example -->
    <div :class="$style.moduleCard">
      <h3 :class="$style.moduleTitle">CSS Modules Example</h3>
      <p :class="$style.moduleText">هذا المكوّن يستخدم CSS Modules للـ classes المعزولة</p>
    </div>
  </div>
</template>

<!-- Scoped CSS with v-bind() in CSS properties -->
<style scoped>
/* v-bind() links CSS values to JavaScript reactive variables */
.themed-card {
  background-color: v-bind('theme.backgroundColor');
  border: 2px solid v-bind('theme.primaryColor');
  border-radius: v-bind('theme.borderRadius');
  padding: v-bind('theme.padding');
  color: v-bind('theme.textColor');
  font-size: v-bind('theme.fontSize');
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid v-bind('theme.primaryColor + "44"');
}

.card-header h3 { margin: 0; }

.badge {
  background: v-bind('theme.primaryColor');
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
}

.card-footer {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid v-bind('theme.primaryColor + "33"');
}

.card-btn {
  padding: 0.5rem 1.2rem;
  background: v-bind('theme.primaryColor');
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.card-btn-outline {
  padding: 0.5rem 1.2rem;
  background: transparent;
  color: v-bind('theme.primaryColor');
  border: 2px solid v-bind('theme.primaryColor');
  border-radius: 8px;
  cursor: pointer;
}

/* Regular scoped styles */
.demo-wrapper {
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}

.controls {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

h2 { color: #42b883; margin-bottom: 1rem; }

.presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.presets button {
  padding: 0.4rem 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.custom-controls {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
}

.custom-controls label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
}

code {
  background: #f5f5f5;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85rem;
}
</style>

<!-- CSS Modules block -->
<style module>
.moduleCard {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border: 2px dashed #42b883;
  border-radius: 10px;
  background: #f0faf6;
}

.moduleTitle {
  color: #2c6e49;
  margin-bottom: 0.5rem;
}

.moduleText {
  color: #444;
  font-size: 0.9rem;
}
</style>
