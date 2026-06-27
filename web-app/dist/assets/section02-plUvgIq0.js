const e={id:2,title:"إعداد بيئة التطوير",titleEn:"Development Environment Setup",level:"مبتدئ",levelEn:"Beginner",lessons:["تثبيت Node.js","إنشاء مشروع Vue بـ create-vue","خيارات المشروع (Router, Pinia, TS, Tests)","شرح هيكل المجلدات","تشغيل Dev Server","فهم main.js وApp.vue","إضافات VS Code الضرورية"],lessonsEn:["Installing Node.js","Creating a Vue Project with create-vue","Project Options (Router, Pinia, TS, Tests)","Folder Structure Explained","Running the Dev Server","Understanding main.js & App.vue","Essential VS Code Extensions"],intro:"نُعِدّ بيئة التطوير خطوة بخطوة — من تثبيت Node.js إلى تشغيل أول مشروع Vue 3 باستخدام create-vue وVite.",introEn:"We set up the development environment step by step — from installing Node.js to running a first Vue 3 project with create-vue and Vite.",content:[{type:"heading",text:"تثبيت Node.js وإنشاء المشروع"},{type:"paragraph",text:"Vue 3 يعمل مع Vite — أسرع أداة بناء حديثة. نستخدم create-vue لإنشاء مشروع جاهز بكل الإعدادات الصحيحة."},{type:"code",code:`# إنشاء مشروع Vue 3 جديد
$ npm create vue@latest my-vue-app

# الخيارات المنصوح بها في هذا الكورس:
# ✅ TypeScript?      → No  (نضيفه في القسم 15)
# ✅ JSX Support?     → No
# ✅ Vue Router?      → Yes
# ✅ Pinia?           → Yes
# ✅ Vitest?          → Yes
# ✅ ESLint?          → Yes
# ✅ Prettier?        → Yes

$ cd my-vue-app
$ npm install
$ npm run dev    # يفتح على http://localhost:5173`},{type:"heading",text:"هيكل مجلدات المشروع"},{type:"code",code:`my-vue-app/
├── public/           # ملفات ثابتة (favicon، صور لا تحتاج معالجة)
├── src/
│   ├── assets/       # صور وCSS عامة
│   ├── components/   # مكونات قابلة لإعادة الاستخدام
│   ├── views/        # صفحات التطبيق (مكوّن لكل Route)
│   ├── router/
│   │   └── index.js  # إعداد Vue Router
│   ├── stores/       # Pinia stores (ملف لكل domain)
│   ├── composables/  # Composables (useXxx.js)
│   ├── App.vue       # المكوّن الجذري — يحوي <RouterView />
│   └── main.js       # نقطة دخول التطبيق
├── index.html        # صفحة HTML الوحيدة
├── vite.config.js    # إعدادات Vite
└── package.json      # المكتبات والأوامر`},{type:"heading",text:"main.js — نقطة الدخول"},{type:"code",code:`// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())   // تسجيل Pinia للـ global state
app.use(router)          // تسجيل Vue Router

app.mount('#app')        // ربط التطبيق بـ <div id="app">`},{type:"heading",text:"App.vue — المكوّن الجذري"},{type:"code",code:`<!-- src/App.vue -->
<script setup>
import { RouterView, RouterLink } from 'vue-router'
<\/script>

<template>
  <nav>
    <RouterLink to="/">الرئيسية</RouterLink>
    <RouterLink to="/about">عن التطبيق</RouterLink>
  </nav>

  <!-- مكوّن الـ Route النشط يُعرض هنا -->
  <RouterView />
</template>

<style scoped>
nav { display: flex; gap: 1rem; padding: 1rem; background: #35495e; }
nav a { color: white; text-decoration: none; }
nav a.router-link-active { color: #42b883; }
</style>`},{type:"heading",text:"أوامر npm الضرورية"},{type:"list",items:["npm run dev — تشغيل Server التطوير مع HMR على localhost:5173","npm run build — بناء الإنتاج → مجلد dist/","npm run preview — معاينة بناء الإنتاج محلياً","npm run test:unit — تشغيل اختبارات Vitest","npm run lint — فحص الكود بـ ESLint"]},{type:"heading",text:"إضافات VS Code الضرورية"},{type:"list",items:["Vue - Official (Volar) — تمييز الصيغة والـ IntelliSense والـ type checking لملفات .vue","ESLint — يُظهر أخطاء الـ linting مباشرة في المحرر","Prettier - Code formatter — تنسيق تلقائي عند الحفظ","Auto Rename Tag — تغيير الـ tag الإغلاقي تلقائياً عند تغيير الافتتاحي","Error Lens — يعرض الأخطاء inline على نفس السطر"]},{type:"warning",text:"عطّل أو احذف إضافة Vetur القديمة إن وُجدت — تتعارض مع Volar وتسبب أخطاء."},{type:"tip",text:"الـ alias @ يشير إلى مجلد src/ — فبدل ../../components/Foo.vue تكتب @/components/Foo.vue في أي مكان في المشروع."},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما الفرق بين Vite وWebpack؟",answer:"Vite يستخدم ES Modules الأصلية في المتصفح أثناء التطوير — لا bundling، لذا يبدأ فوراً. Webpack يُحزّم كل شيء عند كل تغيير. في الإنتاج كلاهما يُنتج ملفات محسّنة، لكن تجربة التطوير مع Vite أسرع بكثير."},{type:"qa",question:"ما الذي يفعله npm create vue@latest؟",answer:"يُشغّل أداة create-vue التي تولّد مشروع Vue 3 + Vite مع إمكانية اختيار Router وPinia وTypeScript وVitest وESLint وPrettier — كل الإعدادات جاهزة."},{type:"qa",question:"ما هو <style scoped> ولماذا نستخدمه؟",answer:"scoped يجعل قواعد CSS تنطبق فقط على عناصر هذا الـ component. Vue يُضيف attribute فريد مثل data-v-abc123 لكل عنصر ويُنطّق الـ CSS selectors عليه. بدون scoped تتسرّب الأنماط لكل التطبيق."}],contentEn:[{type:"heading",text:"Creating a Vue Project"},{type:"code",code:`$ npm create vue@latest my-vue-app

# Recommended options for this course:
# ✅ TypeScript?   → No  (we add it in Section 15)
# ✅ Vue Router?   → Yes
# ✅ Pinia?        → Yes
# ✅ Vitest?       → Yes
# ✅ ESLint?       → Yes
# ✅ Prettier?     → Yes

$ cd my-vue-app && npm install && npm run dev`},{type:"heading",text:"Project Folder Structure"},{type:"code",code:`src/
├── assets/       # Images and global CSS
├── components/   # Reusable UI components
├── views/        # Page-level components (one per route)
├── router/       # Vue Router config
├── stores/       # Pinia stores
├── composables/  # Composable functions (useXxx.js)
├── App.vue       # Root component — holds <RouterView />
└── main.js       # App entry point`},{type:"heading",text:"main.js — Entry Point"},{type:"code",code:`import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())   // register global state
app.use(router)          // register router
app.mount('#app')`},{type:"heading",text:"Essential VS Code Extensions"},{type:"list",items:["Vue - Official (Volar) — syntax, IntelliSense, type checking for .vue files","ESLint — shows linting errors inline","Prettier - Code formatter — auto-format on save","Auto Rename Tag — syncs closing tag when opening tag is renamed","Error Lens — displays errors inline on the same line"]},{type:"warning",text:"Disable or uninstall the old Vetur extension — it conflicts with Volar and causes errors."},{type:"tip",text:"The @ alias points to src/ — write @/components/Foo.vue instead of ../../components/Foo.vue anywhere in the project."},{type:"heading",text:"✅ Review"},{type:"qa",question:"What is the difference between Vite and Webpack?",answer:"Vite uses native browser ES Modules during development — no bundling step, so it starts instantly. Webpack bundles everything on every change. In production both produce optimized files, but the Vite dev experience is dramatically faster."},{type:"qa",question:"What does npm create vue@latest do?",answer:"It runs the create-vue scaffolding tool, generating a Vue 3 + Vite project. It lets you choose Router, Pinia, TypeScript, Vitest, ESLint, and Prettier — everything configured and ready to go."},{type:"qa",question:"What is <style scoped> and why use it?",answer:"scoped makes CSS rules apply only to elements in that component. Vue adds a unique data attribute (like data-v-abc123) to each element and scopes CSS selectors to match. Without scoped, styles leak globally and can break other components."}]};export{e as default};
