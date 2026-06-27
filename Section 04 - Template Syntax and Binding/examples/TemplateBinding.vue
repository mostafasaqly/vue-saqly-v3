<script setup>
// TemplateBinding.vue
// All Vue template binding types demonstrated in one component
// جميع أنواع الـ binding في Vue في مكون واحد

import { ref, reactive } from 'vue'

// Basic data
const greeting = ref('مرحباً بك في Vue 3!')
const rawHtml = ref('<em style="color: #42b883">نص مُنسَّق بـ HTML</em>')
const imageSrc = ref('https://vuejs.org/images/logo.png')
const imageAlt = ref('Vue Logo')
const linkUrl = ref('https://vuejs.org')

// Class binding
const isActive = ref(true)
const isHighlighted = ref(false)
const status = ref('success') // 'success' | 'warning' | 'error'

// Style binding
const textColor = ref('#42b883')
const fontSize = ref(16)

// Dynamic attribute
const attrName = ref('title')
const attrValue = ref('هذا tooltip!')

// Event handling
const clickCount = ref(0)
const formData = reactive({ name: '', email: '' })
const submitted = ref(false)

// Methods
const handleClick = () => clickCount.value++
const handleSubmit = () => {
  submitted.value = true
  console.log('Form data:', formData)
}
const toggleActive = () => (isActive.value = !isActive.value)
const increaseFont = () => fontSize.value++
const decreaseFont = () => fontSize.value > 10 && fontSize.value--
</script>

<template>
  <div class="demo">
    <h1>Template Binding Demo</h1>

    <!-- ===== TEXT INTERPOLATION ===== -->
    <section>
      <h2>1. Text Interpolation — الاستيفاء</h2>
      <p>{{ greeting }}</p>
      <p>عدد الأحرف: {{ greeting.length }}</p>
      <p>بالأحرف الكبيرة: {{ greeting.toUpperCase() }}</p>
      <p>حساب: {{ 10 + 5 * 2 }}</p>
    </section>

    <!-- ===== HTML BINDING ===== -->
    <section>
      <h2>2. HTML Binding — v-html</h2>
      <div v-html="rawHtml"></div>
    </section>

    <!-- ===== ATTRIBUTE BINDING ===== -->
    <section>
      <h2>3. Attribute Binding — v-bind</h2>
      <img :src="imageSrc" :alt="imageAlt" width="60" />
      <br />
      <a :href="linkUrl" target="_blank">الموقع الرسمي لـ Vue</a>
    </section>

    <!-- ===== DYNAMIC ATTRIBUTE ===== -->
    <section>
      <h2>4. Dynamic Attribute Name</h2>
      <span :[attrName]="attrValue" class="tooltip-demo">
        مرّر الماوس فوقي / Hover over me
      </span>
    </section>

    <!-- ===== CLASS BINDING ===== -->
    <section>
      <h2>5. Class Binding</h2>
      <!-- Object syntax -->
      <div :class="{ active: isActive, highlighted: isHighlighted }" class="box">
        Object Syntax: {{ isActive ? 'active' : 'inactive' }}
      </div>

      <!-- Array syntax -->
      <div :class="['box', `status-${status}`]">
        Array Syntax: status = {{ status }}
      </div>

      <div class="controls">
        <button @click="toggleActive">Toggle Active</button>
        <button @click="isHighlighted = !isHighlighted">Toggle Highlight</button>
        <select v-model="status">
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>
    </section>

    <!-- ===== STYLE BINDING ===== -->
    <section>
      <h2>6. Style Binding</h2>
      <p :style="{ color: textColor, fontSize: fontSize + 'px', fontWeight: 'bold' }">
        هذا النص له style ديناميكي!
      </p>
      <div class="controls">
        <input type="color" v-model="textColor" />
        <button @click="decreaseFont">A-</button>
        <button @click="increaseFont">A+</button>
        <span>{{ fontSize }}px</span>
      </div>
    </section>

    <!-- ===== EVENT BINDING ===== -->
    <section>
      <h2>7. Event Binding</h2>
      <p>عدد النقرات: {{ clickCount }}</p>
      <button @click="handleClick">اضغط هنا!</button>
      <button @click="clickCount = 0">Reset</button>
    </section>

    <!-- ===== EVENT MODIFIERS ===== -->
    <section>
      <h2>8. Event Modifiers</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="formData.name" placeholder="الاسم" />
        <input v-model="formData.email" placeholder="الإيميل" type="email" />
        <button type="submit">إرسال (مع .prevent)</button>
      </form>
      <p v-if="submitted">✅ تم الإرسال! الاسم: {{ formData.name }}</p>
    </section>
  </div>
</template>

<style scoped>
.demo {
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
  direction: rtl;
}

section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

h2 {
  color: #42b883;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.box {
  padding: 0.75rem;
  border-radius: 6px;
  background: #f5f5f5;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}

.box.active { border-left: 4px solid #42b883; }
.box.highlighted { background: #fffde7; }
.box.status-success { border-left: 4px solid #4caf50; }
.box.status-warning { border-left: 4px solid #ff9800; }
.box.status-error { border-left: 4px solid #f44336; }

.tooltip-demo { cursor: help; text-decoration: dotted underline; }

.controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

button {
  padding: 0.4rem 0.9rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover { filter: brightness(1.1); }

input[type="text"], input[type="email"] {
  padding: 0.4rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  width: 100%;
}

form { display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px; }
</style>
