# القسم 5: الـ Directives
# Section 5: Directives

> **Vue 3 Course — 23 Sections** | القسم 5 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | ما هي الـ Directives؟ | What are Directives? |
| 2 | v-bind | v-bind — Attribute Binding |
| 3 | v-on | v-on — Event Binding |
| 4 | v-model | v-model — Two-Way Binding |
| 5 | v-if و v-else | v-if and v-else — Conditional Rendering |
| 6 | v-show | v-show — Toggle Visibility |
| 7 | v-for | v-for — List Rendering |
| 8 | v-pre و v-once و v-memo | v-pre, v-once, v-memo — Optimization Directives |

## المفاهيم الرئيسية | Key Concepts

- **`v-model`** — ربط ثنائي الاتجاه / Two-way data binding (combines `:value` + `@input`).
- **`v-model` modifiers** — `.number` (تحويل لرقم), `.trim` (إزالة المسافات), `.lazy` (تحديث عند blur).
- **`v-if` vs `v-show`** — `v-if` يُزيل العنصر من DOM، `v-show` يُخفيه فقط بـ CSS / `v-if` removes from DOM, `v-show` only hides with CSS.
- **`:key` في `v-for`** — ضروري لتحسين أداء التحديثات / Essential for efficient list updates.
- **`v-memo`** — تحسين أداء — يتجاهل إعادة الرسم إذا لم تتغير القيم المُحددة.

## أمثلة مرجعية | Code Reference

```vue
<script setup>
import { ref } from 'vue'

// v-model
const username = ref('')
const age = ref(0)
const acceptTerms = ref(false)
const selectedColor = ref('blue')
const colors = ['أحمر / red', 'أخضر / green', 'أزرق / blue']

// v-if / v-show
const isLoggedIn = ref(false)
const showPanel = ref(true)

// v-for
const tasks = ref([
  { id: 1, text: 'تعلّم Vue', done: true },
  { id: 2, text: 'بناء مشروع', done: false },
  { id: 3, text: 'نشر التطبيق', done: false },
])
</script>

<template>
  <!-- v-model with modifiers -->
  <input v-model.trim="username" placeholder="الاسم" />
  <input v-model.number="age" type="number" placeholder="العمر" />
  <input v-model.lazy="username" placeholder="lazy update" />

  <!-- v-model with checkbox -->
  <input type="checkbox" v-model="acceptTerms" />
  <span>{{ acceptTerms ? 'موافق' : 'غير موافق' }}</span>

  <!-- v-model with select -->
  <select v-model="selectedColor">
    <option v-for="color in colors" :key="color" :value="color">
      {{ color }}
    </option>
  </select>

  <!-- v-if / v-else-if / v-else -->
  <div v-if="isLoggedIn">مرحباً بك!</div>
  <div v-else>يرجى تسجيل الدخول</div>

  <!-- v-show (keeps in DOM, toggles display) -->
  <div v-show="showPanel">لوحة التحكم</div>

  <!-- v-for with :key -->
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <input type="checkbox" v-model="task.done" />
      <span :class="{ done: task.done }">{{ task.text }}</span>
    </li>
  </ul>

  <!-- v-for with index -->
  <p v-for="(task, index) in tasks" :key="task.id">
    {{ index + 1 }}. {{ task.text }}
  </p>
</template>
```

## أسئلة المراجعة | Review Q&A

**س: متى أستخدم `v-if` ومتى أستخدم `v-show`؟**
ج: استخدم `v-if` عندما لا تحتاج العنصر في DOM أصلاً (مثل المحتوى الشرطي). استخدم `v-show` عندما تحتاج التبديل المتكرر (أسرع لأنه يستخدم CSS فقط).

**Q: When should I use `v-if` vs `v-show`?**
A: Use `v-if` when the element is unlikely to render (better for initial load), use `v-show` when you need to toggle visibility frequently (only toggles CSS display).

**س: لماذا نحتاج `:key` مع `v-for`؟**
ج: تساعد Vue على تتبع العناصر بشكل فردي عند تحديث القائمة، مما يُحسّن الأداء ويمنع مشاكل الـ state.

**Q: Why is `:key` required with `v-for`?**
A: It helps Vue track individual elements when the list updates, improving performance and preventing state bugs.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 04 — Template Syntax & Binding  
**التالي | Next:** Section 06 — أساسيات الـ Reactivity / Reactivity Fundamentals
