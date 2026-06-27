export default {
  id: 22,
  title: "النشر والـ Deployment",
  titleEn: "Deployment",
  level: "متقدم",
  levelEn: "Advanced",
  lessons: [
    "تجهيز تطبيق Vue للإنتاج",
    "npm run build — فهم الـ Output",
    "متغيرات البيئة بـ Vite",
    "النشر على Netlify",
    "النشر على Vercel",
    "النشر على GitHub Pages",
    "النشر على Firebase Hosting",
    "مشاكل النشر الشائعة وحلولها",
    "CI/CD مع GitHub Actions",
    "مراجعة Deployment Checklist",
  ],
  lessonsEn: [
    "Preparing Vue App for Production",
    "npm run build — Understanding the Output",
    "Environment Variables with Vite",
    "Deploying to Netlify",
    "Deploying to Vercel",
    "Deploying to GitHub Pages",
    "Deploying to Firebase Hosting",
    "Common Deployment Issues & Fixes",
    "CI/CD with GitHub Actions",
    "Deployment Checklist Review",
  ],
  intro: "نتعلم كيف ننشر تطبيقات Vue على الإنترنت — من بناء الإنتاج إلى النشر على المنصات الأكثر شيوعاً مع CI/CD.",
  introEn: "Learn how to deploy Vue apps to the internet — from production build to deployment on popular platforms with CI/CD.",
  content: [
    { type: "heading", text: "بناء التطبيق للإنتاج" },
    { type: "code", code: `# بناء للإنتاج
$ npm run build

# Vite يُنشئ مجلد dist/ يحتوي:
# dist/
# ├── index.html
# └── assets/
#     ├── index-BZpnq9xE.js    (مضغوط بـ Rollup)
#     ├── index-BZpnq9xE.css
#     └── vendor-CKi1Dkvo.js   (code splitting تلقائي)

# معاينة الـ build محلياً قبل النشر
$ npm run preview
# http://localhost:4173` },
    { type: "heading", text: "متغيرات البيئة بـ Vite" },
    { type: "code", code: `# .env.development — يُستخدم مع npm run dev
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=Vue App (Dev)
VITE_DEBUG=true

# .env.production — يُستخدم مع npm run build
VITE_API_URL=https://api.mysite.com
VITE_APP_TITLE=Vue App
VITE_DEBUG=false

# .env.local — محلي وغير مُلتزَم في git (للأسرار)
VITE_SECRET_KEY=dev-only-key` },
    { type: "code", code: `// استخدامها في الكود — دائماً import.meta.env
const apiUrl = import.meta.env.VITE_API_URL
const isProd = import.meta.env.PROD    // boolean
const isDev = import.meta.env.DEV      // boolean
const mode = import.meta.env.MODE      // 'development' | 'production'

// api/axios.js
import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})` },
    { type: "warning", text: "متغيرات البيئة يجب أن تبدأ بـ VITE_ ليكشفها Vite للمتصفح. المتغيرات بدون VITE_ تبقى server-side فقط. لا تضع أسراراً حقيقية في VITE_ — هي مرئية في الـ bundle." },
    { type: "heading", text: "النشر على Netlify" },
    { type: "code", code: `# netlify.toml — في جذر المشروع
[build]
  command = "npm run build"
  publish = "dist"

# مطلوب لـ Vue Router — SPA redirects
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200` },
    { type: "list", items: [
      "اذهب إلى netlify.com وسجّل دخولاً بـ GitHub",
      "Add new site → Import an existing project → اختر الـ repo",
      "Netlify يكتشف إعدادات Vite تلقائياً",
      "أضف ENV variables في: Site Settings → Environment Variables",
      "كل push على main يُنشر تلقائياً",
      "ميزة: Preview Deployments لكل Pull Request",
    ]},
    { type: "heading", text: "النشر على Vercel" },
    { type: "code", code: `# vercel.json — لـ SPA routing
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}

# باستخدام Vercel CLI
$ npm install -g vercel
$ vercel              # للنشر على preview
$ vercel --prod       # للنشر على production` },
    { type: "tip", text: "Vercel يدعم Framework Detection — يكتشف مشروع Vue/Vite تلقائياً ويضع الإعدادات الصحيحة بدون vercel.json." },
    { type: "heading", text: "النشر على GitHub Pages" },
    { type: "code", code: `// vite.config.js — أضف base باسم الـ repo
export default defineConfig({
  base: '/my-vue-app/',   // اسم الـ GitHub repo
  plugins: [vue()],
})` },
    { type: "code", code: `# طريقة gh-pages
$ npm install -D gh-pages

# package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}

$ npm run deploy
# يُنشر على: https://username.github.io/my-vue-app/` },
    { type: "heading", text: "CI/CD مع GitHub Actions" },
    { type: "code", code: `# .github/workflows/deploy.yml
name: Deploy to Netlify

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test -- --run

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: './dist'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}` },
    { type: "heading", text: "مشاكل شائعة وحلولها" },
    { type: "list", items: [
      "❌ 404 عند تحديث الصفحة — ✅ أضف SPA redirects في netlify.toml أو vercel.json",
      "❌ متغيرات البيئة لا تعمل — ✅ تأكد أنها تبدأ بـ VITE_ وأعِد البناء",
      "❌ الصور لا تظهر — ✅ ضع الصور في public/ أو import من src/assets/",
      "❌ روابط 404 على GitHub Pages — ✅ أضف base: '/repo-name/' في vite.config.js",
      "❌ API CORS errors في production — ✅ اضبط CORS في الـ backend لـ domain الإنتاج",
      "❌ build يفشل بـ TypeScript errors — ✅ أصلح الأخطاء أو استخدم vue-tsc",
    ]},
    { type: "heading", text: "Deployment Checklist" },
    { type: "list", items: [
      "✅ npm run build تعمل بدون أخطاء",
      "✅ npm run preview تعمل محلياً",
      "✅ متغيرات البيئة للإنتاج مُضبوطة في المنصة",
      "✅ SPA redirects مُضافة (netlify.toml أو vercel.json)",
      "✅ base في vite.config.js صحيحة (للـ GitHub Pages)",
      "✅ الاختبارات تمر بنجاح قبل النشر",
      "✅ لا أسرار في الكود أو VITE_ env vars",
    ]},
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "لماذا نحتاج SPA redirect rules عند النشر؟", answer: "لأن Vue Router يتعامل مع الـ routing في المتصفح. عندما يطلب المستخدم /products مباشرة، الـ server يبحث عن ملف في هذا المسار ولا يجده فيُعطي 404. الـ redirect يُعيد كل الطلبات لـ index.html ثم Vue Router يتولى التنقل." },
    { type: "qa", question: "ما الفرق بين .env.development و.env.production؟", answer: ".env.development يُستخدم مع npm run dev. .env.production يُستخدم مع npm run build. يمكنك أيضاً .env.local لأسرار محلية لا تُلتزم في git. import.meta.env تحتوي القيم المناسبة حسب البيئة." },
    { type: "qa", question: "لماذا نُضيف base في vite.config.js عند النشر على GitHub Pages؟", answer: "لأن GitHub Pages يخدم الموقع على /repo-name/ لا على / مباشرة. بدون base، الـ assets مثل CSS و JS يُطلَب من / ولا تُوجَد. base: '/repo-name/' يُعدّل جميع المسارات لتبدأ بـ /repo-name/." },
    { type: "qa", question: "ما فائدة GitHub Actions مع deployment؟", answer: "يُؤتمت عملية النشر — كل push على main يُشغّل الاختبارات ثم البناء ثم النشر. يمنع نشر كود مكسور، ويُنشئ preview deployments لكل PR. أفضل بكثير من النشر اليدوي." },
  ],
  contentEn: [
    { type: "heading", text: "Building for Production" },
    { type: "code", code: `$ npm run build   # creates dist/
$ npm run preview # preview locally at localhost:4173` },
    { type: "heading", text: "Environment Variables" },
    { type: "code", code: `# .env.development
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.mysite.com

# In code — always use import.meta.env
const apiUrl = import.meta.env.VITE_API_URL
const isProd = import.meta.env.PROD` },
    { type: "warning", text: "Vite env variables must start with VITE_ to be exposed to the browser. Never put real secrets in VITE_ variables — they are visible in the bundle." },
    { type: "heading", text: "Netlify Deployment" },
    { type: "code", code: `# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200` },
    { type: "heading", text: "GitHub Pages" },
    { type: "code", code: `// vite.config.js — add base for GitHub Pages
export default defineConfig({
  base: '/my-vue-app/',
  plugins: [vue()],
})

// package.json
{ "scripts": { "deploy": "npm run build && gh-pages -d dist" } }` },
    { type: "heading", text: "CI/CD with GitHub Actions" },
    { type: "code", code: `# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run test -- --run
      - run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}` },
    { type: "heading", text: "Common Issues & Fixes" },
    { type: "list", items: [
      "❌ 404 on page refresh → ✅ Add SPA redirects in netlify.toml or vercel.json",
      "❌ Env variables not working → ✅ Must start with VITE_, rebuild after adding",
      "❌ Images not showing → ✅ Put images in public/ or import from src/assets/",
      "❌ 404 on GitHub Pages → ✅ Add base: '/repo-name/' in vite.config.js",
    ]},
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "Why do we need SPA redirect rules when deploying?", answer: "Because Vue Router handles routing in the browser. When a user directly requests /products, the server looks for that file and returns 404. The redirect sends all requests to index.html, and Vue Router handles navigation." },
    { type: "qa", question: "What is the difference between .env.development and .env.production?", answer: ".env.development is used with npm run dev. .env.production is used with npm run build. import.meta.env automatically loads the right file for the current mode." },
    { type: "qa", question: "Why do we add base in vite.config.js for GitHub Pages?", answer: "Because GitHub Pages serves the site at /repo-name/ not at /. Without base, assets like CSS and JS are requested from / and aren't found. base: '/repo-name/' prefixes all asset paths correctly." },
  ],
};
