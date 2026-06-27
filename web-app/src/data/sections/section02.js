export default {
  id: 2,
  title: "إعداد بيئة التطوير",
  titleEn: "Development Environment Setup",
  level: "مبتدئ",
  levelEn: "Beginner",
  lessons: ["تثبيت Node.js", "إنشاء مشروع Vue بـ create-vue + Vite", "خيارات المشروع", "هيكل المجلدات", "تشغيل سيرفر التطوير", "فهم main.js وApp.vue", "إضافات VS Code الموصى بها"],
  lessonsEn: ["Installing Node.js", "Creating a Vue Project with create-vue + Vite", "Choosing Project Options", "Project Folder Structure", "Running the Dev Server", "Understanding main.js & App.vue", "Recommended VS Code Extensions"],
  intro: "في هذا القسم ستُعدّ بيئتك ليكون لديك مشروع Vue 3 يعمل على جهازك خلال دقائق.",
  introEn: "In this section you'll set up your environment and have a working Vue 3 project running in minutes.",
  content: [
    { type: "heading", text: "1. تثبيت Node.js" },
    { type: "paragraph", text: "ابدأ بتحميل Node.js LTS من nodejs.org. Vue 3 يتطلب Node 18+." },
    { type: "code", code: `# تحقق من الإصدار بعد التثبيت
$ node -v   # v20.x أو أعلى
$ npm -v    # 10.x أو أعلى` },
    { type: "heading", text: "2. إنشاء مشروع Vue بـ create-vue" },
    { type: "paragraph", text: "create-vue هي الأداة الرسمية لإنشاء مشاريع Vue 3 مع Vite." },
    { type: "code", code: `$ npm create vue@latest my-vue-app
$ cd my-vue-app
$ npm install
$ npm run dev` },
    { type: "tip", text: "اختر TypeScript: No في البداية لتتعلم الأساسيات أولاً. سنضيفه في القسم 15." },
    { type: "heading", text: "3. خيارات المشروع" },
    { type: "list", items: ["TypeScript — أضفها لاحقاً في القسم 15", "JSX Support — لا داعي لها الآن", "Vue Router — سنختارها عند بلوغنا القسم 12", "Pinia — سنختارها عند القسم 14", "Vitest — للاختبار (القسم 21)", "ESLint + Prettier — موصى بهما دائماً"] },
    { type: "heading", text: "4. هيكل المجلدات" },
    { type: "code", code: `my-vue-app/
├── public/          # ملفات ثابتة
├── src/
│   ├── assets/      # صور وخطوط
│   ├── components/  # components قابلة للإعادة
│   ├── App.vue      # الـ component الجذر
│   └── main.js      # نقطة الدخول
├── index.html
├── vite.config.js
└── package.json` },
    { type: "heading", text: "5. فهم main.js" },
    { type: "code", code: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')` },
    { type: "paragraph", text: "createApp تنشئ تطبيق Vue جديد، و mount تربطه بعنصر HTML." },
    { type: "heading", text: "6. فهم App.vue — Single File Component" },
    { type: "code", code: `<script setup>
// منطق الـ component
</script>

<template>
  <!-- HTML القالب -->
  <h1>مرحباً Vue 3!</h1>
</template>

<style scoped>
/* CSS مُعزول لهذا الـ component */
</style>` },
    { type: "heading", text: "7. إضافات VS Code" },
    { type: "list", items: ["Vue - Official (Vue Language Tools) — دعم كامل لـ .vue files", "ESLint — كشف أخطاء الكود", "Prettier — تنسيق تلقائي"] },
    { type: "tip", text: "ثبّت إضافة Vue - Official (المعروفة سابقاً بـ Volar) — هي الإضافة الرسمية وتدعم Vue 3 بالكامل." },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين Vite وWebpack في مشاريع Vue؟", answer: "Vite أسرع بكثير في التطوير لأنه يستخدم ES Modules مباشرة في المتصفح بدلاً من bundling كامل. Vue 3 يعتمد Vite بشكل افتراضي." },
  ],
  contentEn: [
    { type: "heading", text: "1. Installing Node.js" },
    { type: "paragraph", text: "Download Node.js LTS from nodejs.org. Vue 3 requires Node 18+." },
    { type: "code", code: `# Check versions after install
$ node -v   # v20.x or higher
$ npm -v    # 10.x or higher` },
    { type: "heading", text: "2. Creating a Vue Project with create-vue" },
    { type: "code", code: `$ npm create vue@latest my-vue-app
$ cd my-vue-app
$ npm install
$ npm run dev` },
    { type: "tip", text: "Choose TypeScript: No for now — we'll add it in Section 15." },
    { type: "heading", text: "3. Project Folder Structure" },
    { type: "code", code: `my-vue-app/
├── public/          # static files
├── src/
│   ├── assets/      # images & fonts
│   ├── components/  # reusable components
│   ├── App.vue      # root component
│   └── main.js      # entry point
├── index.html
├── vite.config.js
└── package.json` },
    { type: "heading", text: "4. Understanding main.js" },
    { type: "code", code: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')` },
    { type: "heading", text: "5. Single File Component Structure" },
    { type: "code", code: `<script setup>
// component logic
</script>

<template>
  <h1>Hello Vue 3!</h1>
</template>

<style scoped>
/* scoped CSS */
</style>` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "Why does Vue 3 use Vite instead of Webpack?", answer: "Vite is significantly faster in development because it serves ES Modules directly to the browser instead of bundling everything. It's the official default for Vue 3 projects." },
  ],
};
