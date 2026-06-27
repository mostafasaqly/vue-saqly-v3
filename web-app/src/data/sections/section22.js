export default {
  id: 22,
  title: "النشر والـ Deployment",
  titleEn: "Deployment",
  level: "متقدم",
  levelEn: "Advanced",
  lessons: ["تجهيز تطبيق Vue للإنتاج", "متغيرات البيئة", "بناء التطبيق", "النشر على Netlify", "النشر على Vercel", "النشر على Firebase Hosting", "النشر على GitHub Pages", "مشاكل النشر الشائعة"],
  lessonsEn: ["Preparing Vue App for Production", "Environment Variables", "Building the App", "Deploying to Netlify", "Deploying to Vercel", "Deploying to Firebase Hosting", "GitHub Pages Deployment", "Common Deployment Issues"],
  intro: "نتعلم كيف ننشر تطبيقات Vue على الإنترنت — من بناء الإنتاج إلى النشر على المنصات الأكثر شيوعاً.",
  introEn: "Learn how to deploy Vue apps to the internet — from production build to deployment on the most popular platforms.",
  content: [
    { type: "heading", text: "بناء التطبيق للإنتاج" },
    { type: "code", code: `# بناء للإنتاج
$ npm run build

# سيُنشئ مجلد dist/ يحتوي:
# dist/
# ├── index.html
# ├── assets/
# │   ├── index-xxx.js   (مضغوط)
# │   └── index-xxx.css
# └── ...

# معاينة الـ build محلياً
$ npm run preview` },
    { type: "heading", text: "متغيرات البيئة بـ Vite" },
    { type: "code", code: `# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=Vue App (Dev)

# .env.production
VITE_API_URL=https://api.mysite.com
VITE_APP_TITLE=Vue App` },
    { type: "code", code: `// في الكود — استخدم import.meta.env
const baseURL = import.meta.env.VITE_API_URL
const isProduction = import.meta.env.PROD
const isDev = import.meta.env.DEV` },
    { type: "warning", text: "متغيرات البيئة في Vite يجب أن تبدأ بـ VITE_ لكي تكون متاحة في الـ browser. المتغيرات التي لا تبدأ بـ VITE_ لا تُكشف للـ client." },
    { type: "heading", text: "النشر على Netlify" },
    { type: "code", code: `# 1. أنشئ netlify.toml في جذر المشروع
# Build command: npm run build
# Publish directory: dist

# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200` },
    { type: "list", items: ["ادخل على netlify.com وأنشئ حساباً", "اختر 'Add new site' → 'Import an existing project'", "اربط مع GitHub repo", "Netlify يكتشف الإعدادات تلقائياً", "انقر Deploy — ستحصل على رابط في دقائق"] },
    { type: "heading", text: "النشر على Vercel" },
    { type: "code", code: `# باستخدام Vercel CLI
$ npm install -g vercel
$ vercel

# أو من vercel.com:
# New Project → Import Git Repository → Deploy` },
    { type: "code", code: `// vercel.json (لـ SPA routing)
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}` },
    { type: "heading", text: "النشر على GitHub Pages" },
    { type: "code", code: `// vite.config.js — أضف base
export default defineConfig({
  base: '/اسم-الـ-repo/',
  // ...
})` },
    { type: "code", code: `// package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
$ npm install -D gh-pages
$ npm run deploy` },
    { type: "heading", text: "مشاكل شائعة عند النشر" },
    { type: "list", items: ["404 عند الـ refresh — أضف إعدادات SPA redirects (netlify.toml أو vercel.json)", "المتغيرات البيئية لا تعمل — تأكد من بدايتها بـ VITE_", "مسارات الصور خاطئة — استخدم public/ أو import الصور من src/assets/", "base URL خاطئ — تأكد من إعداد base في vite.config.js عند النشر على GitHub Pages"] },
    { type: "tip", text: "Netlify وVercel يدعمان الـ preview deployments — كل pull request يحصل على رابط مؤقت لمعاينة التغييرات قبل الدمج." },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "لماذا نحتاج إعدادات redirect عند نشر SPA على server؟", answer: "لأن الـ SPA يتعامل مع الـ routing في المتصفح. عندما يطلب المستخدم /products مباشرة، الـ server يبحث عن ملف HTML في هذا المسار ولا يجده. الـ redirect يُعيد كل الطلبات إلى index.html ثم Vue Router يتولى التنقل." },
  ],
  contentEn: [
    { type: "heading", text: "Building for Production" },
    { type: "code", code: `$ npm run build   # creates dist/
$ npm run preview # preview locally` },
    { type: "heading", text: "Environment Variables" },
    { type: "code", code: `# .env.production
VITE_API_URL=https://api.mysite.com

# In code
const baseURL = import.meta.env.VITE_API_URL` },
    { type: "warning", text: "Vite env variables must start with VITE_ to be exposed to the browser." },
    { type: "heading", text: "Netlify Deployment" },
    { type: "code", code: `# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "Why do we need redirect rules when deploying a SPA?", answer: "Because the SPA handles routing in the browser. When a user directly requests /products, the server looks for that file and finds nothing. The redirect sends all requests to index.html, and Vue Router handles the navigation." },
  ],
};
