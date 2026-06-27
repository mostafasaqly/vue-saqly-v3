# القسم 4: Template Syntax والـ Binding
# Section 4: Template Syntax & Binding

> **Vue 3 Course — 23 Sections** | القسم 4 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | الـ Interpolation | Text Interpolation with `{{ }}` |
| 2 | ربط النص | Text Binding with v-text |
| 3 | ربط HTML | HTML Binding with v-html |
| 4 | ربط Attributes | Attribute Binding with v-bind |
| 5 | v-bind same-name shorthand | v-bind Same-Name Shorthand (Vue 3.4) |
| 6 | الـ Attributes الديناميكية | Dynamic Attribute Names |
| 7 | ربط الـ Class | Class Binding (Object & Array) |
| 8 | ربط الـ Style | Style Binding (Object & Array) |
| 9 | ربط الأحداث | Event Binding with v-on |

## المفاهيم الرئيسية | Key Concepts

- **`{{ }}`** — Mustache interpolation لعرض القيم في الـ Template / Mustache interpolation to display values.
- **`v-bind` (`:`)** — ربط attribute ديناميكي / Dynamic attribute binding.
- **`v-on` (`@`)** — ربط حدث (event handler) / Event binding.
- **`:class`** — ربط CSS classes ديناميكياً (Object أو Array) / Dynamic class binding using object or array syntax.
- **`:style`** — ربط CSS styles مباشرة / Inline style binding using object syntax.
- **`.prevent`** — Event modifier يمنع السلوك الافتراضي للمتصفح / Modifier that calls `event.preventDefault()`.
- **`v-bind` same-name** — اختصار جديد في Vue 3.4: `:value` بدلاً من `:value="value"` / New Vue 3.4 shorthand.

## أمثلة مرجعية | Code Reference

```vue
<script setup>
import { ref } from 'vue'

const message = ref('مرحبا!')
const rawHtml = ref('<strong>نص عريض</strong>')
const imageUrl = ref('/logo.png')
const imageAlt = ref('شعار Vue')
const isActive = ref(true)
const hasError = ref(false)
const btnColor = ref('#42b883')
const dynamicAttr = ref('title')

// Event handler
const handleClick = (event) => {
  console.log('تم الضغط!', event)
}

const handleSubmit = (event) => {
  // event.preventDefault() is called automatically by .prevent
  console.log('تم الإرسال')
}
</script>

<template>
  <!-- Text Interpolation / الاستيفاء -->
  <p>{{ message }}</p>
  <p>{{ message.toUpperCase() }}</p>
  <p>{{ 2 + 2 }}</p>

  <!-- HTML Binding / ربط HTML -->
  <div v-html="rawHtml"></div>

  <!-- Attribute Binding / ربط Attributes -->
  <img :src="imageUrl" :alt="imageAlt" />
  <button :disabled="!isActive">زر</button>

  <!-- Dynamic Attribute Name / اسم Attribute ديناميكي -->
  <span :[dynamicAttr]="message">نص</span>

  <!-- Class Binding — Object Syntax -->
  <div :class="{ active: isActive, 'has-error': hasError }">
    محتوى
  </div>

  <!-- Class Binding — Array Syntax -->
  <div :class="[isActive ? 'active' : '', 'base-class']">
    محتوى
  </div>

  <!-- Style Binding / ربط Style -->
  <button :style="{ backgroundColor: btnColor, color: 'white' }">
    زر ملون
  </button>

  <!-- Event Binding / ربط الأحداث -->
  <button @click="handleClick">اضغط</button>
  <button @click="() => console.log('مباشرة!')">Inline</button>

  <!-- Event Modifiers / معدّلات الأحداث -->
  <form @submit.prevent="handleSubmit">
    <button type="submit">إرسال</button>
  </form>

  <!-- v-bind same-name shorthand (Vue 3.4) -->
  <!-- Instead of :src="src" you can write just :src -->
</template>
```

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين `v-html` و `{{ }}`؟**
ج: `{{ }}` يعرض النص كنص عادي (يحمي من XSS)، أما `v-html` فيُدرج HTML حقيقي — استخدمه بحذر فقط مع المحتوى الموثوق.

**Q: What is the difference between `v-html` and `{{ }}`?**
A: `{{ }}` renders content as plain text (XSS-safe), while `v-html` inserts real HTML — use it carefully only with trusted content.

**س: ما هي الـ Event Modifiers الشائعة؟**
ج: `.prevent` (يمنع السلوك الافتراضي)، `.stop` (يوقف التبعثر)، `.once` (يُشغَّل مرة واحدة)، `.self` (يُشغَّل فقط على العنصر ذاته).

**Q: What are the common Event Modifiers?**
A: `.prevent` (calls preventDefault), `.stop` (stops propagation), `.once` (fires only once), `.self` (only fires on the element itself).

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 03 — أساسيات Vue / Vue Fundamentals  
**التالي | Next:** Section 05 — الـ Directives / Directives
