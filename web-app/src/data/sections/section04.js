export default {
  id: 4,
  title: "قوالب الـ Template والـ Binding",
  titleEn: "Template Syntax & Binding",
  level: "مبتدئ",
  levelEn: "Beginner",
  lessons: [
    "الـ Interpolation {{ }}",
    "ربط HTML بـ v-html",
    "ربط الـ Attributes بـ v-bind",
    "اختصار same-name (Vue 3.4+)",
    "الـ Attributes الديناميكية",
    "ربط الـ Class (object وarray syntax)",
    "ربط الـ Style",
    "ربط الأحداث بـ v-on / @",
    "Event Modifiers",
    "Key Modifiers",
  ],
  lessonsEn: [
    "Interpolation {{ }}",
    "HTML Binding with v-html",
    "Attribute Binding with v-bind",
    "Same-Name Shorthand (Vue 3.4+)",
    "Dynamic Attributes",
    "Class Binding (object & array syntax)",
    "Style Binding",
    "Event Binding with v-on / @",
    "Event Modifiers",
    "Key Modifiers",
  ],
  intro: "نتعلم كيف Vue يربط البيانات بالـ Template — من الـ Interpolation البسيطة إلى ربط الـ Classes والـ Events والـ Modifiers.",
  introEn: "Learn how Vue binds data to the template — from simple interpolation to class, style, and event binding with modifiers.",
  content: [
    { type: "heading", text: "الـ Interpolation — {{ }}" },
    { type: "paragraph", text: "أبسط طريقة لعرض البيانات في الـ Template هي الأقواس المزدوجة. تدعم تعبيرات JavaScript بسيطة:" },
    { type: "code", code: `<script setup>
const name = 'مصطفى'
const count = 42
const isAdmin = true
</script>

<template>
  <p>مرحباً {{ name }}!</p>
  <p>العدد المضاعف: {{ count * 2 }}</p>
  <p>{{ count > 10 ? 'كبير' : 'صغير' }}</p>
  <p>{{ isAdmin ? 'مشرف' : 'مستخدم عادي' }}</p>
</template>` },
    { type: "warning", text: "{{ }} تُعرض كـ plain text آمن فقط — لا تستطيع عرض HTML. للـ HTML استخدم v-html." },
    { type: "heading", text: "ربط HTML — v-html" },
    { type: "code", code: `<script setup>
const html = '<strong style="color:green">نص غامق ملوّن</strong>'
</script>

<template>
  <div v-html="html" />
</template>` },
    { type: "warning", text: "v-html قد يُعرّضك لهجمات XSS إذا كان المحتوى من مصدر غير موثوق. استخدمه فقط مع محتوى تتحكم فيه — لا تُمرّر مدخلات المستخدم مباشرةً." },
    { type: "heading", text: "ربط الـ Attributes — v-bind" },
    { type: "paragraph", text: "لا يمكن استخدام {{ }} داخل HTML attributes — استخدم v-bind أو الاختصار :" },
    { type: "code", code: `<script setup>
const href = 'https://vuejs.org'
const isDisabled = true
const imgSrc = '/logo.png'
const id = 'main-input'
</script>

<template>
  <!-- الطريقة الكاملة -->
  <a v-bind:href="href">Vue</a>

  <!-- الاختصار بـ : -->
  <a :href="href">Vue</a>
  <img :src="imgSrc" alt="Logo" />
  <button :disabled="isDisabled">إرسال</button>

  <!-- اختصار same-name (Vue 3.4+) — :id يعني :id="id" -->
  <input :id />
</template>` },
    { type: "tip", text: "الاختصار :attr هو الطريقة الأكثر استخداماً في Vue. والاختصار الجديد في Vue 3.4 :id يُغني عن :id=\"id\" عندما اسم المتغير نفسه اسم الـ attribute." },
    { type: "heading", text: "ربط الـ Class — Object وArray Syntax" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const hasError = ref(false)
const theme = ref('dark')
</script>

<template>
  <!-- Object Syntax — true يضيف، false يُزيل -->
  <div :class="{ active: isActive, error: hasError }">Object</div>

  <!-- Array Syntax -->
  <div :class="[isActive ? 'active' : '', 'base-class']">Array</div>

  <!-- دمج static و dynamic -->
  <div class="card" :class="{ 'card--dark': theme === 'dark' }">كلاهما</div>
</template>` },
    { type: "heading", text: "ربط الـ Style" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const color = ref('green')
const size = ref(18)
const padding = ref('1rem')
</script>

<template>
  <!-- camelCase properties -->
  <p :style="{ color: color, fontSize: size + 'px', padding }">
    نص مُنسَّق
  </p>

  <!-- Array of style objects -->
  <p :style="[{ color }, { padding }]">نص آخر</p>
</template>` },
    { type: "heading", text: "ربط الأحداث — v-on / @" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const count = ref(0)

function greet(event) {
  alert('النقر من: ' + event.target.tagName)
}
function handleSubmit() {
  console.log('إرسال النموذج')
}
function search(e) {
  console.log('البحث:', e.target.value)
}
</script>

<template>
  <!-- v-on:click أو @click -->
  <button @click="count++">+1</button>
  <button v-on:click="greet">تحية</button>

  <!-- تمرير القيمة مع $event -->
  <button @click="greet($event)">تحية مع event</button>
</template>` },
    { type: "heading", text: "Event Modifiers" },
    { type: "code", code: `<template>
  <!-- .prevent — يمنع السلوك الافتراضي (preventDefault) -->
  <form @submit.prevent="handleSubmit">...</form>

  <!-- .stop — يوقف انتشار الحدث (stopPropagation) -->
  <button @click.stop="doSomething">زر</button>

  <!-- .once — ينفّذ مرة واحدة فقط -->
  <button @click.once="loadData">تحميل</button>

  <!-- .self — ينفّذ فقط إذا كان target هو العنصر نفسه -->
  <div @click.self="closeModal">...</div>
</template>` },
    { type: "heading", text: "Key Modifiers" },
    { type: "code", code: `<template>
  <!-- .enter — عند ضغط Enter -->
  <input @keyup.enter="search" />

  <!-- .escape — عند ضغط Escape -->
  <input @keyup.escape="clearInput" />

  <!-- .ctrl.z — اختصارات مركّبة -->
  <input @keyup.ctrl.z="undo" />
</template>` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين {{ }} و v-html؟", answer: "{{ }} يعرض النص كـ plain text آمن — HTML entities تُفلتر. v-html يُفسّر المحتوى كـ HTML حقيقي — مفيد لكنه خطير مع مدخلات غير موثوقة (XSS attacks)." },
    { type: "qa", question: "كيف تربط class بشكل ديناميكي في Vue؟", answer: "باستخدام :class مع object syntax { active: isActive } — true يضيف الـ class، false يُزيله. أو array syntax [isActive ? 'active' : '', 'base'] لإضافة عدة classes." },
    { type: "qa", question: "ما هو .prevent modifier وماذا يفعل؟", answer: "يُنفّذ event.preventDefault() تلقائياً — منع السلوك الافتراضي للـ browser مثل إرسال نموذج HTML أو فتح رابط. بدلاً من استدعائه يدوياً في كل handler تكتبه كـ modifier على الـ event." },
    { type: "qa", question: "ما هو اختصار same-name في Vue 3.4؟", answer: "في Vue 3.4+، :id يعادل :id=\"id\" عندما يكون اسم المتغير هو نفس اسم الـ attribute. يجعل الكود أقصر وأوضح مثل <input :id :disabled /> بدلاً من <input :id=\"id\" :disabled=\"disabled\" />." },
  ],
  contentEn: [
    { type: "heading", text: "Interpolation — {{ }}" },
    { type: "code", code: `<script setup>
const name = 'Mostafa'
const count = 42
</script>

<template>
  <p>Hello {{ name }}!</p>
  <p>Double: {{ count * 2 }}</p>
  <p>{{ count > 10 ? 'big' : 'small' }}</p>
</template>` },
    { type: "warning", text: "{{ }} renders as safe plain text only. It cannot render HTML. Use v-html for HTML content." },
    { type: "heading", text: "Attribute Binding — v-bind / :" },
    { type: "code", code: `<script setup>
const href = 'https://vuejs.org'
const isDisabled = true
const id = 'main-input'
</script>

<template>
  <a :href="href">Vue</a>
  <button :disabled="isDisabled">Submit</button>
  <!-- Same-name shorthand (Vue 3.4+) -->
  <input :id />
</template>` },
    { type: "tip", text: "The : shorthand is the most common way to bind attributes. Vue 3.4's :id shorthand saves typing :id=\"id\" when variable name matches attribute name." },
    { type: "heading", text: "Class & Style Binding" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const color = ref('green')
</script>

<template>
  <!-- Object syntax — true adds, false removes -->
  <div :class="{ active: isActive }" />

  <!-- Array syntax -->
  <div :class="[isActive ? 'active' : '', 'base']" />

  <!-- Style binding with camelCase -->
  <p :style="{ color, fontSize: '18px' }">Styled text</p>
</template>` },
    { type: "heading", text: "Event Binding & Modifiers" },
    { type: "code", code: `<template>
  <button @click="count++">+1</button>
  <!-- .prevent — calls event.preventDefault() -->
  <form @submit.prevent="handleSubmit">...</form>
  <!-- .stop — calls event.stopPropagation() -->
  <button @click.stop="doThing">Button</button>
  <!-- .once — fires once only -->
  <button @click.once="loadData">Load</button>
  <!-- .enter key modifier -->
  <input @keyup.enter="search" />
</template>` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between {{ }} and v-html?", answer: "{{ }} renders as safe plain text — HTML is escaped. v-html renders as actual HTML — useful but dangerous with untrusted user input (XSS attacks)." },
    { type: "qa", question: "How do you conditionally add a CSS class in Vue?", answer: "Use :class with object syntax { active: isActive } — true adds the class, false removes it. Or array syntax [isActive ? 'active' : ''] for multiple conditions." },
    { type: "qa", question: "What does the .prevent event modifier do?", answer: "It calls event.preventDefault() automatically — preventing default browser behavior like submitting an HTML form or following a link. Instead of calling it manually in every handler, add it as a modifier on the event." },
  ],
};
