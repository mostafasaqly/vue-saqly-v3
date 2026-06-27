export default {
  id: 16,
  title: "واجهة المستخدم والتنسيق",
  titleEn: "UI & Styling",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: ["CSS العام", "Scoped CSS", "CSS Modules", "Dynamic Classes", "v-bind في Style", "التصميم المتجاوب", "Tailwind CSS مع Vue", "مكتبات Components", "بناء مكونات UI قابلة لإعادة الاستخدام"],
  lessonsEn: ["Global CSS", "Scoped CSS", "CSS Modules", "Dynamic Classes", "v-bind() in Style", "Responsive Layout", "Tailwind CSS with Vue", "Using Component Libraries", "Building Reusable UI Components"],
  intro: "نتعلم كيف نُنسّق تطبيقات Vue — من Scoped CSS إلى v-bind في الـ style، إلى Tailwind ومكتبات الـ components.",
  introEn: "Learn how to style Vue apps — from Scoped CSS to v-bind in styles, Tailwind, and component libraries.",
  content: [
    { type: "heading", text: "Scoped CSS — CSS مُعزول" },
    { type: "code", code: `<template>
  <div class="card">
    <h2 class="card__title">العنوان</h2>
  </div>
</template>

<style scoped>
/* هذا الـ CSS يُطبَّق فقط على هذا الـ component */
.card {
  padding: 20px;
  border-radius: 8px;
}
.card__title {
  color: #41b883;
}
</style>` },
    { type: "tip", text: "scoped يُضيف attribute فريد للعناصر مثل [data-v-xxxxxxxx]، مما يجعل الـ CSS يؤثر فقط على هذا الـ component." },
    { type: "heading", text: "CSS Modules" },
    { type: "code", code: `<template>
  <div :class="$style.card">
    <h2 :class="$style.title">العنوان</h2>
  </div>
</template>

<style module>
.card { padding: 20px; border-radius: 8px; }
.title { color: #41b883; }
</style>` },
    { type: "heading", text: "v-bind في Style — CSS ديناميكي" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'

const primaryColor = ref('#41b883')
const fontSize = ref(16)
const theme = ref('dark')
</script>

<template>
  <div class="themed-box">مربع مُنسَّق</div>
</template>

<style scoped>
.themed-box {
  /* استخدام reactive values مباشرة في CSS */
  color: v-bind(primaryColor);
  font-size: v-bind(fontSize + 'px');
}
</style>` },
    { type: "heading", text: "Tailwind CSS مع Vue" },
    { type: "code", code: `$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p` },
    { type: "code", code: `// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}` },
    { type: "code", code: `<!-- استخدام Tailwind في Vue -->
<template>
  <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-800">
    <img class="w-12 h-12 rounded-full" :src="user.avatar" />
    <div>
      <h2 class="text-xl font-bold text-white">{{ user.name }}</h2>
      <p class="text-gray-400">{{ user.role }}</p>
    </div>
  </div>
</template>` },
    { type: "heading", text: "PrimeVue — مكتبة Components" },
    { type: "code", code: `$ npm install primevue primeicons` },
    { type: "code", code: `// main.js
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'

const app = createApp(App)
app.use(PrimeVue, { theme: 'aura' })
app.component('Button', Button)

// استخدام
<Button label="إرسال" icon="pi pi-send" severity="success" />` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين Scoped CSS وCSS Modules في Vue؟", answer: "كلاهما يعزل الـ CSS. scoped أبسط ويستخدم attribute selectors. CSS Modules يُنشئ class names مُولَّدة ويتيح استخدامها كـ object في الـ template بـ $style.className — أدق في التعزيل." },
    { type: "qa", question: "ما هي v-bind() في CSS ومتى تستخدمها؟", answer: "v-bind() في CSS تتيح استخدام قيم reactive (refs) مباشرة في قواعد CSS. مفيدة لـ theming ديناميكي أو تخصيص styles حسب بيانات الـ component." },
  ],
  contentEn: [
    { type: "heading", text: "Scoped CSS" },
    { type: "code", code: `<style scoped>
.card { padding: 20px; border-radius: 8px; }
</style>` },
    { type: "heading", text: "v-bind() in CSS — Reactive Styles" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const color = ref('#41b883')
</script>

<style scoped>
.box { color: v-bind(color); }
</style>` },
    { type: "heading", text: "Tailwind CSS with Vue" },
    { type: "code", code: `<template>
  <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-800">
    <h2 class="text-xl font-bold text-white">{{ user.name }}</h2>
  </div>
</template>` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between Scoped CSS and CSS Modules in Vue?", answer: "Both isolate CSS. Scoped is simpler and uses attribute selectors. CSS Modules generates unique class names and lets you use them as an object via $style.className — more precise isolation." },
  ],
};
