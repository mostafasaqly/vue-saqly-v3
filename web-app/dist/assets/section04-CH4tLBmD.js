const t={id:4,title:"قوالب الـ Template والـ Binding",titleEn:"Template Syntax & Binding",level:"مبتدئ",levelEn:"Beginner",lessons:["الـ Interpolation","ربط النص","ربط HTML","ربط الـ Attributes","اختصار v-bind بالاسم نفسه","الـ Attributes الديناميكية","ربط الـ Class","ربط الـ Style","ربط الأحداث"],lessonsEn:["Interpolation","Text Binding","HTML Binding","Attribute Binding","v-bind Same-Name Shorthand","Dynamic Attributes","Class Binding","Style Binding","Event Binding"],intro:"نتعلم كيف Vue يربط البيانات بالـ Template — من الـ Interpolation البسيطة إلى ربط الـ Classes والـ Events.",introEn:"Learn how Vue binds data to the template — from simple interpolation to class and event binding.",content:[{type:"heading",text:"الـ Interpolation — {{ }}"},{type:"paragraph",text:"أبسط طريقة لعرض البيانات في الـ Template هي الأقواس المزدوجة:"},{type:"code",code:`<script setup>
const name = 'مصطفى'
const count = 42
<\/script>

<template>
  <p>مرحباً {{ name }}!</p>
  <p>العدد: {{ count * 2 }}</p>
  <p>{{ count > 10 ? 'كبير' : 'صغير' }}</p>
</template>`},{type:"heading",text:"ربط HTML — v-html"},{type:"code",code:`<script setup>
const html = '<strong>نص غامق</strong>'
<\/script>

<template>
  <div v-html="html" />
</template>`},{type:"warning",text:"v-html قد يُعرّضك لهجمات XSS إذا كان المحتوى من مصدر غير موثوق. استخدمه فقط مع محتوى تتحكم فيه."},{type:"heading",text:"ربط الـ Attributes — v-bind"},{type:"code",code:`<script setup>
const href = 'https://vuejs.org'
const isDisabled = true
const id = 'my-input'
<\/script>

<template>
  <!-- الطريقة الكاملة -->
  <a v-bind:href="href">Vue</a>

  <!-- الاختصار بـ : -->
  <a :href="href">Vue</a>

  <!-- اختصار same-name (Vue 3.4+) -->
  <input :id :disabled="isDisabled" />
</template>`},{type:"tip",text:"اختصار v-bind هو : فقط — ستستخدمه طوال الكورس. والاختصار بالاسم نفسه :id يعني :id='id'."},{type:"heading",text:"ربط الـ Class"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const hasError = ref(false)
<\/script>

<template>
  <!-- Object syntax -->
  <div :class="{ active: isActive, error: hasError }" />

  <!-- Array syntax -->
  <div :class="[isActive ? 'active' : '', 'base-class']" />
</template>`},{type:"heading",text:"ربط الـ Style"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const color = ref('green')
const size = ref(18)
<\/script>

<template>
  <p :style="{ color: color, fontSize: size + 'px' }">
    نص مُنسَّق
  </p>
</template>`},{type:"heading",text:"ربط الأحداث — v-on"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const count = ref(0)

function greet(event) {
  alert('مرحباً! النقر من: ' + event.target.tagName)
}
<\/script>

<template>
  <!-- v-on:click أو @click -->
  <button @click="count++">+1</button>
  <button @click="greet">تحية</button>

  <!-- Modifiers -->
  <form @submit.prevent="handleSubmit">...</form>
  <input @keyup.enter="search" />
</template>`},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما الفرق بين {{ }} و v-html؟",answer:"{{ }} يعرض النص كـ plain text آمن. v-html يُفسّر المحتوى كـ HTML حقيقي — مفيد لكنه خطير مع مدخلات غير موثوقة (XSS)."},{type:"qa",question:"كيف تربط class بشكل ديناميكي في Vue؟",answer:"باستخدام :class مع object syntax {active: isActive} أو array syntax ['base', isActive ? 'active' : '']"}],contentEn:[{type:"heading",text:"Interpolation — {{ }}"},{type:"code",code:`<script setup>
const name = 'Mostafa'
const count = 42
<\/script>

<template>
  <p>Hello {{ name }}!</p>
  <p>Double: {{ count * 2 }}</p>
  <p>{{ count > 10 ? 'big' : 'small' }}</p>
</template>`},{type:"heading",text:"Attribute Binding — v-bind"},{type:"code",code:`<script setup>
const href = 'https://vuejs.org'
const id = 'my-input'
<\/script>

<template>
  <a :href="href">Vue</a>
  <!-- Same-name shorthand (Vue 3.4+) -->
  <input :id />
</template>`},{type:"heading",text:"Class & Style Binding"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const color = ref('green')
<\/script>

<template>
  <div :class="{ active: isActive }" />
  <p :style="{ color }">Styled text</p>
</template>`},{type:"heading",text:"Event Binding — v-on / @"},{type:"code",code:`<template>
  <button @click="count++">+1</button>
  <form @submit.prevent="handleSubmit">...</form>
  <input @keyup.enter="search" />
</template>`},{type:"heading",text:"✅ Review"},{type:"qa",question:"What is the difference between {{ }} and v-html?",answer:"{{ }} renders as safe plain text. v-html renders as actual HTML — useful but dangerous with untrusted input (XSS)."}]};export{t as default};
