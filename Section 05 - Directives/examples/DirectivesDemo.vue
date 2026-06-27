<script setup>
// DirectivesDemo.vue
// All major Vue directives demonstrated in one component
// جميع الـ Directives الرئيسية في Vue في مكون واحد

import { ref, reactive } from 'vue'

// v-model examples
const textInput = ref('')
const numberInput = ref(0)
const lazyInput = ref('')
const isChecked = ref(false)
const selectedFruit = ref('')
const selectedColors = ref([])
const radioValue = ref('')

// v-if / v-show examples
const showIfBlock = ref(true)
const showShowBlock = ref(true)
const userRole = ref('guest') // 'admin' | 'user' | 'guest'

// v-for examples
const fruits = ref(['تفاح', 'برتقال', 'موز', 'عنب', 'مانجو'])
const students = ref([
  { id: 1, name: 'أحمد', grade: 90 },
  { id: 2, name: 'فاطمة', grade: 85 },
  { id: 3, name: 'محمد', grade: 92 },
  { id: 4, name: 'زينب', grade: 78 },
])
const newFruit = ref('')
const profile = reactive({ name: 'مصطفى', role: 'مطور', city: 'القاهرة' })

// Methods
const addFruit = () => {
  if (newFruit.value.trim()) {
    fruits.value.push(newFruit.value.trim())
    newFruit.value = ''
  }
}
const removeFruit = (index) => fruits.value.splice(index, 1)
</script>

<template>
  <div class="demo" dir="rtl">
    <h1>Vue Directives Demo</h1>

    <!-- ===== v-model ===== -->
    <section>
      <h2>v-model — الربط الثنائي</h2>

      <div class="field">
        <label>نص (v-model):</label>
        <input v-model="textInput" placeholder="اكتب شيئاً..." />
        <span class="value">القيمة: "{{ textInput }}"</span>
      </div>

      <div class="field">
        <label>رقم (v-model.number):</label>
        <input v-model.number="numberInput" type="number" />
        <span class="value">{{ numberInput }} × 2 = {{ numberInput * 2 }}</span>
      </div>

      <div class="field">
        <label>lazy (يتحدث عند blur):</label>
        <input v-model.lazy="lazyInput" placeholder="اكتب ثم انتقل..." />
        <span class="value">{{ lazyInput }}</span>
      </div>

      <div class="field">
        <label>
          <input type="checkbox" v-model="isChecked" />
          موافق على الشروط
        </label>
        <span class="value">{{ isChecked ? '✅ موافق' : '❌ غير موافق' }}</span>
      </div>

      <div class="field">
        <label>اختيار (select):</label>
        <select v-model="selectedFruit">
          <option value="">اختر فاكهة</option>
          <option v-for="fruit in fruits" :key="fruit" :value="fruit">{{ fruit }}</option>
        </select>
        <span class="value">المختار: {{ selectedFruit }}</span>
      </div>

      <div class="field">
        <label>Radio Buttons:</label>
        <label><input type="radio" v-model="radioValue" value="vue" /> Vue</label>
        <label><input type="radio" v-model="radioValue" value="react" /> React</label>
        <label><input type="radio" v-model="radioValue" value="angular" /> Angular</label>
        <span class="value">{{ radioValue }}</span>
      </div>
    </section>

    <!-- ===== v-if / v-else-if / v-else ===== -->
    <section>
      <h2>v-if / v-else-if / v-else — التصيير الشرطي</h2>

      <div class="controls">
        <button @click="showIfBlock = !showIfBlock">
          {{ showIfBlock ? 'إخفاء' : 'إظهار' }} (v-if)
        </button>
        <select v-model="userRole">
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>
      </div>

      <div v-if="showIfBlock" class="block green">
        ✅ هذا العنصر موجود في DOM (v-if)
      </div>
      <div v-else class="block red">
        ❌ العنصر الأول مخفي — هذا هو v-else
      </div>

      <div class="block">
        <span v-if="userRole === 'admin'">👑 مرحباً أيها الأدمن!</span>
        <span v-else-if="userRole === 'user'">👤 مرحباً أيها المستخدم!</span>
        <span v-else>👻 مرحباً أيها الزائر!</span>
      </div>
    </section>

    <!-- ===== v-show ===== -->
    <section>
      <h2>v-show — إخفاء بالـ CSS</h2>
      <button @click="showShowBlock = !showShowBlock">Toggle v-show</button>
      <div v-show="showShowBlock" class="block green">
        هذا العنصر موجود في DOM دائماً — فقط display يتغير
      </div>
    </section>

    <!-- ===== v-for ===== -->
    <section>
      <h2>v-for — تكرار القوائم</h2>

      <!-- Simple array -->
      <h3>قائمة الفواكه:</h3>
      <div class="controls">
        <input v-model="newFruit" placeholder="فاكهة جديدة" @keyup.enter="addFruit" />
        <button @click="addFruit">إضافة</button>
      </div>
      <ul>
        <li v-for="(fruit, index) in fruits" :key="fruit">
          {{ index + 1 }}. {{ fruit }}
          <button @click="removeFruit(index)" class="remove">×</button>
        </li>
      </ul>

      <!-- Array of objects -->
      <h3>قائمة الطلاب:</h3>
      <table>
        <thead>
          <tr><th>#</th><th>الاسم</th><th>الدرجة</th></tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td :class="{ high: student.grade >= 90, low: student.grade < 80 }">
              {{ student.grade }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Iterate over object -->
      <h3>الملف الشخصي (v-for على Object):</h3>
      <ul>
        <li v-for="(value, key) in profile" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>

      <!-- v-for with number range -->
      <h3>v-for مع Range:</h3>
      <span v-for="n in 5" :key="n" class="badge">{{ n }}</span>
    </section>
  </div>
</template>

<style scoped>
.demo {
  max-width: 750px;
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
h3 { color: #555; margin: 0.75rem 0 0.5rem; }

.field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.value {
  background: #f0f9f4;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #2c6e49;
}

.controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.block {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: #f5f5f5;
  margin-top: 0.5rem;
}

.block.green { background: #e8f5e9; border-left: 3px solid #4caf50; }
.block.red { background: #ffebee; border-left: 3px solid #f44336; }

input, select {
  padding: 0.4rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 0.4rem 0.9rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button.remove {
  background: #ff6b6b;
  padding: 0.2rem 0.5rem;
  font-size: 0.85rem;
}

ul { padding-right: 1.5rem; }
li { margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem; }

table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.5rem; border: 1px solid #ddd; text-align: right; }
th { background: #f5f5f5; }
td.high { color: #2e7d32; font-weight: bold; }
td.low { color: #c62828; }

.badge {
  display: inline-block;
  background: #42b883;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  margin: 0.25rem;
  font-size: 0.85rem;
}
</style>
