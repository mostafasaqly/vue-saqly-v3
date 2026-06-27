export default {
  id: 5,
  title: "الـ Directives",
  titleEn: "Directives",
  level: "مبتدئ",
  levelEn: "Beginner",
  lessons: [
    "ما هي الـ Directives؟",
    "v-model مع text وnumber وcheckbox وradio وselect",
    "v-model Modifiers",
    "v-if / v-else-if / v-else",
    "v-show — الإخفاء بـ CSS",
    "v-if مقابل v-show",
    "v-for مع :key",
    "v-for مع Objects",
    "v-once وv-memo",
    "الـ Directives المخصصة (Custom Directives)",
  ],
  lessonsEn: [
    "What are Directives?",
    "v-model with text, number, checkbox, radio, select",
    "v-model Modifiers",
    "v-if / v-else-if / v-else",
    "v-show — CSS visibility",
    "v-if vs v-show",
    "v-for with :key",
    "v-for with Objects",
    "v-once & v-memo",
    "Custom Directives",
  ],
  intro: "الـ Directives هي سمات خاصة تبدأ بـ v- تمنح الـ Template قوى إضافية — من العرض الشرطي إلى قوائم ديناميكية إلى الربط الثنائي.",
  introEn: "Directives are special v- attributes that give the template extra powers — from conditional rendering to dynamic lists and two-way binding.",
  content: [
    { type: "heading", text: "ما هي الـ Directives؟" },
    { type: "paragraph", text: "الـ Directives هي تعليمات خاصة تضيفها في الـ Template وتبدأ بـ v-. Vue ينفّذها وقت رسم الـ DOM لإضافة سلوك ديناميكي." },
    { type: "list", items: [
      "v-bind (:) — ربط الـ Attributes",
      "v-on (@) — الاستماع للأحداث",
      "v-model — الربط الثنائي",
      "v-if / v-else-if / v-else — العرض الشرطي",
      "v-show — الإخفاء بـ CSS",
      "v-for — القوائم الديناميكية",
      "v-once / v-memo — تحسين الأداء",
    ]},
    { type: "heading", text: "v-model — الربط الثنائي" },
    { type: "paragraph", text: "v-model يربط قيمة الـ ref مع عنصر النموذج في الاتجاهين — تغيير الـ UI يُحدّث البيانات والعكس صحيح:" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const name = ref('')
const age = ref(0)
const agreed = ref(false)
const selected = ref('vue')
const skills = ref([])
const gender = ref('')
</script>

<template>
  <!-- Text input -->
  <input v-model="name" placeholder="الاسم" />

  <!-- Number input — .number modifier -->
  <input v-model.number="age" type="number" />

  <!-- Trim whitespace — .trim modifier -->
  <input v-model.trim="name" />

  <!-- Checkbox — single -->
  <input type="checkbox" v-model="agreed" />

  <!-- Checkbox — multiple (array) -->
  <input type="checkbox" v-model="skills" value="vue" />Vue
  <input type="checkbox" v-model="skills" value="ts" />TypeScript

  <!-- Radio -->
  <input type="radio" v-model="gender" value="male" />ذكر
  <input type="radio" v-model="gender" value="female" />أنثى

  <!-- Select -->
  <select v-model="selected">
    <option value="vue">Vue</option>
    <option value="react">React</option>
  </select>

  <p>الاسم: {{ name }} | العمر: {{ age }} | الموافقة: {{ agreed }}</p>
</template>` },
    { type: "tip", text: "v-model Modifiers: .number (تحويل لرقم تلقائياً)، .trim (إزالة المسافات في البداية والنهاية)، .lazy (تحديث عند blur بدلاً من كل ضغطة)." },
    { type: "heading", text: "v-if / v-else-if / v-else" },
    { type: "paragraph", text: "يُزيل ويضيف العناصر من DOM فعلياً حسب الشرط:" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const score = ref(75)
const isLoggedIn = ref(false)
</script>

<template>
  <p v-if="score >= 90">ممتاز 🎉</p>
  <p v-else-if="score >= 70">جيد جداً ✅</p>
  <p v-else>يحتاج مراجعة ⚠️</p>

  <!-- v-if على <template> لتجميع عناصر بدون wrapper -->
  <template v-if="isLoggedIn">
    <h1>أهلاً!</h1>
    <p>مرحباً بك مجدداً</p>
  </template>
  <p v-else>الرجاء تسجيل الدخول</p>
</template>` },
    { type: "heading", text: "v-show — الإخفاء بـ CSS" },
    { type: "code", code: `<!-- v-show يبقي العنصر في DOM ويستخدم display:none -->
<div v-show="isVisible">هذا النص يُخفى بـ CSS</div>

<!-- v-if يُزيل العنصر من DOM كلياً -->
<div v-if="isVisible">هذا النص يُزال من DOM</div>` },
    { type: "list", items: [
      "v-if: للعناصر النادرة (إذا كانت الحالة تتغير نادراً أو تحتوي component ثقيل)",
      "v-show: للعناصر المتكررة التبديل (كمودال، قائمة منسدلة) — DOM لا يُعاد إنشاؤه",
    ]},
    { type: "heading", text: "v-for — القوائم الديناميكية" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const items = ref([
  { id: 1, name: 'Vue', emoji: '💚' },
  { id: 2, name: 'React', emoji: '⚛️' },
  { id: 3, name: 'Angular', emoji: '🅰️' },
])
const user = { name: 'مصطفى', age: 30, role: 'Dev' }
</script>

<template>
  <!-- v-for مع :key -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.emoji }} {{ item.name }}
    </li>
  </ul>

  <!-- مع index -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.name }}
  </li>

  <!-- v-for على Object -->
  <div v-for="(value, key) in user" :key="key">
    {{ key }}: {{ value }}
  </div>

  <!-- v-for مع v-if — استخدم <template> -->
  <ul>
    <template v-for="item in items" :key="item.id">
      <li v-if="item.id > 1">{{ item.name }}</li>
    </template>
  </ul>
</template>` },
    { type: "warning", text: "دائماً ضع :key مع v-for. Vue يستخدمها لتتبع العناصر بكفاءة. استخدم ID فريداً وليس index إذا كانت القائمة تتغير (إضافة/حذف/إعادة ترتيب)." },
    { type: "heading", text: "v-once وv-memo — تحسين الأداء" },
    { type: "code", code: `<!-- v-once: يُعرض مرة واحدة ولا يتحدث أبداً -->
<h1 v-once>{{ title }}</h1>

<!-- v-memo: يُعيد الرسم فقط إذا تغيرت القيم المحددة -->
<div v-for="item in list" :key="item.id" v-memo="[item.id, item.selected]">
  <!-- رسم مُعقّد لن يُعاد إلا إذا تغير item.id أو item.selected -->
  <ExpensiveComponent :data="item" />
</div>` },
    { type: "heading", text: "Custom Directives" },
    { type: "code", code: `<script setup>
// تعريف directive محلي
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <!-- يُركّز الـ input تلقائياً عند mount -->
  <input v-focus />
</template>` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين v-if وv-show؟", answer: "v-if يُزيل ويضيف العنصر من DOM فعلياً — تكلفة أعلى عند التبديل المتكرر لأن Vue ينشئ ويحذف العنصر. v-show يُبقي العنصر ويستخدم display:none — أسرع للتبديل المتكرر لأن DOM لا يتغير." },
    { type: "qa", question: "لماذا يجب استخدام :key مع v-for؟", answer: "Vue يستخدم :key لتتبع العناصر في القائمة. بدونها، عند إضافة أو حذف أو إعادة ترتيب العناصر، Vue قد يُعيد استخدام DOM nodes بطريقة خاطئة مما يسبب أخطاء في المحتوى المعروض." },
    { type: "qa", question: "ما هو v-model.lazy وكيف يختلف عن v-model العادي؟", answer: "v-model العادي يُحدّث الـ ref عند كل ضغطة مفتاح (input event). v-model.lazy يُحدّث فقط عند blur (مغادرة الحقل) أو ضغط Enter — مفيد لتقليل التحديثات المتكررة أو لتأجيل التحقق من صحة المدخلات." },
    { type: "qa", question: "لماذا لا تستخدم v-for وv-if على نفس العنصر؟", answer: "في Vue 3، v-if لها أولوية أعلى من v-for. إذا وضعتهما على نفس العنصر، سيحاول v-if الوصول لمتغيرات v-for قبل إنشائها مما يسبب خطأ. الحل: استخدم <template v-for> ثم ضع v-if على العنصر الداخلي." },
  ],
  contentEn: [
    { type: "heading", text: "v-model — Two-Way Binding" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const name = ref('')
const age = ref(0)
const agreed = ref(false)
const selected = ref('vue')
const skills = ref([])
</script>

<template>
  <!-- Text -->
  <input v-model="name" placeholder="Name" />

  <!-- Number input with .number modifier -->
  <input v-model.number="age" type="number" />

  <!-- Trim whitespace -->
  <input v-model.trim="name" />

  <!-- Single checkbox -->
  <input type="checkbox" v-model="agreed" />

  <!-- Multiple checkboxes → array -->
  <input type="checkbox" v-model="skills" value="vue" />Vue
  <input type="checkbox" v-model="skills" value="ts" />TypeScript

  <!-- Select -->
  <select v-model="selected">
    <option value="vue">Vue</option>
    <option value="react">React</option>
  </select>
</template>` },
    { type: "heading", text: "v-if / v-else-if / v-else" },
    { type: "code", code: `<p v-if="score >= 90">Excellent!</p>
<p v-else-if="score >= 70">Good</p>
<p v-else>Needs work</p>

<!-- Group multiple elements without a wrapper -->
<template v-if="isLoggedIn">
  <h1>Welcome!</h1>
  <p>Glad you're back</p>
</template>` },
    { type: "heading", text: "v-for — Dynamic Lists" },
    { type: "code", code: `<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>

<!-- With index -->
<li v-for="(item, index) in items" :key="item.id">
  {{ index + 1 }}. {{ item.name }}
</li>

<!-- Iterate object -->
<div v-for="(value, key) in user" :key="key">
  {{ key }}: {{ value }}
</div>` },
    { type: "warning", text: "Always add :key with v-for. Use a unique ID, not the array index, when the list can be reordered, added to, or items deleted." },
    { type: "tip", text: "v-model Modifiers: .number (auto-convert to number), .trim (strip whitespace), .lazy (update on blur instead of every keystroke)." },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between v-if and v-show?", answer: "v-if removes/adds the element from the DOM entirely — higher cost for frequent toggling. v-show keeps the element and sets display:none — faster for frequent toggles since no DOM create/destroy cycle happens." },
    { type: "qa", question: "Why is :key required with v-for?", answer: "Vue uses :key to track each element in the list. Without it, when items are added, removed, or reordered, Vue may reuse DOM nodes incorrectly, causing visible bugs or incorrect component state." },
    { type: "qa", question: "Why shouldn't you use v-for and v-if on the same element?", answer: "In Vue 3, v-if has higher priority than v-for. If both are on the same element, v-if tries to access loop variables before they're created, causing an error. Fix: use <template v-for> and put v-if on the inner element." },
  ],
};
