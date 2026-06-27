# Section 22: Deployment

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Production Build with `npm run build` |
| 2 | Understanding the `dist/` Output |
| 3 | Environment Variables in Production |
| 4 | Deploying to Netlify (drag & drop and CLI) |
| 5 | Deploying to Vercel |
| 6 | Deploying to GitHub Pages |
| 7 | Server Configuration for SPA Routing |
| 8 | Custom Domain & HTTPS |

## Key Concepts

- **`npm run build`** — Compiles and bundles the entire app into the `dist/` folder using Vite + Rollup. The output is static files (HTML, CSS, JS) that any web server can serve.
- **`dist/` folder** — Contains `index.html`, hashed JS and CSS chunks, and all public assets. Everything in this folder is what you upload to your hosting service.
- **Code splitting** — Vite automatically creates separate JS chunks for each lazy-loaded route. Only the code for the current route is downloaded.
- **Environment variables** — Values in `.env.production` are baked into the bundle at build time. Never put secrets there — they're visible to anyone who inspects the bundle.
- **SPA routing** — A Vue SPA has only one `index.html`. If a user navigates directly to `/products/42`, the server must return `index.html` (not a 404), and Vue Router takes over. This requires server configuration.
- **`base` option** — If your app is deployed to a subdirectory (e.g., `github.io/my-app/`), set `base: '/my-app/'` in `vite.config.js`.

## Code Reference

```bash
# Build for production
npm run build

# Preview the production build locally before deploying
npm run preview

# The dist/ folder structure after build:
# dist/
# ├── index.html
# ├── assets/
# │   ├── index-BxZgH3R2.js      # main chunk (hashed name for cache-busting)
# │   ├── index-Dw34kP9a.css
# │   ├── ProductDetail-Cx8mN.js  # lazy-loaded route chunk
# │   └── ...
# └── favicon.ico
```

```bash
# .env files — which is loaded when?
.env                  # always loaded
.env.local            # always loaded, gitignored (local overrides)
.env.development      # loaded in npm run dev
.env.development.local
.env.production       # loaded in npm run build
.env.production.local # loaded in build, gitignored
```

```bash
# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_TITLE=My Vue App
# Only VITE_ prefix variables are exposed to client code
```

```js
// vite.config.js — set base for subdirectory deployment
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',              // '/' for root deployment
  // base: '/my-app/',    // use this for GitHub Pages subdirectory
  build: {
    outDir: 'dist',
    sourcemap: false,     // disable in production for smaller files
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],  // split vendor libs
        },
      },
    },
  },
})
```

### Netlify

```bash
# Option 1 — Drag & drop:
# 1. Run: npm run build
# 2. Drag the dist/ folder to app.netlify.com/drop

# Option 2 — Git integration (recommended):
# 1. Push your project to GitHub
# 2. Connect repo at app.netlify.com
# 3. Set build settings:
#    Build command: npm run build
#    Publish directory: dist
# 4. Deploy!

# SPA routing fix — create this file:
# public/_redirects
# /* /index.html 200
```

```
# public/_redirects  (for Netlify SPA routing)
/* /index.html 200
```

### Vercel

```bash
# Option 1 — Vercel CLI:
npm install -g vercel
vercel

# Option 2 — Git integration:
# 1. Push to GitHub
# 2. Import project at vercel.com
# 3. Framework preset: Vite
# 4. Build command: npm run build
# 5. Output directory: dist
```

```json
// vercel.json — SPA routing fix for Vercel
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### GitHub Pages

```bash
# 1. Install gh-pages
npm install -D gh-pages

# 2. Add deploy script to package.json
# "scripts": {
#   "deploy": "npm run build && gh-pages -d dist"
# }

# 3. Set base in vite.config.js
# base: '/your-repo-name/'

# 4. Deploy
npm run deploy
```

```yaml
# .github/workflows/deploy.yml — Auto-deploy on push to main
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install & Build
        run: npm ci && npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### nginx — SPA Routing Configuration

```nginx
# nginx.conf — serve Vue SPA correctly
server {
  listen 80;
  root /var/www/my-vue-app/dist;
  index index.html;

  # All routes fall back to index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets aggressively (they have hashed names)
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

## Deployment Platform Comparison

| Platform | Free tier | Custom domain | Auto-deploy | SPA fix needed |
|----------|-----------|---------------|-------------|----------------|
| **Netlify** | ✅ Generous | ✅ Yes | ✅ Git push | `_redirects` file |
| **Vercel** | ✅ Generous | ✅ Yes | ✅ Git push | `vercel.json` |
| **GitHub Pages** | ✅ Yes | ✅ Yes | Via Actions | `404.html` trick |
| **Render** | ✅ Limited | ✅ Yes | ✅ Git push | Rewrite rule |
| **VPS/nginx** | ✗ Paid | ✅ Yes | Manual | `try_files` |

## Pre-Deployment Checklist

```
BUILD
  ✅ npm run build completes without errors
  ✅ npm run preview works and the app functions correctly
  ✅ All console.log statements removed
  ✅ VITE_API_URL set to production API in .env.production

PERFORMANCE
  ✅ Images optimized (WebP, proper sizes)
  ✅ Routes are lazy-loaded
  ✅ Heavy components use defineAsyncComponent

SECURITY
  ✅ No API secrets in VITE_ env variables
  ✅ .env files gitignored (except .env.example)
  ✅ API requests use HTTPS

SEO & ACCESSIBILITY
  ✅ <title> and meta descriptions set per page
  ✅ Images have alt text
  ✅ Semantic HTML (header, main, nav, footer)
```

## Review Q&A

**Q: Why does navigating directly to `/about` return a 404 on some hosts?**
A: A Vue SPA has only one real file: `index.html`. When you type `/about` in the browser, the server looks for a file at `/about` and doesn't find one. The fix is to tell the server to always serve `index.html` for any path — Vue Router then handles the `/about` route on the client.

**Q: What is the difference between `npm run build` and `npm run preview`?**
A: `npm run build` compiles the production bundle into `dist/`. `npm run preview` serves that `dist/` folder on a local server so you can verify the production build behaves correctly before uploading it. Always do `preview` before deploying.

**Q: Should I put my API key in a `.env` file?**
A: Only `VITE_` prefixed variables are bundled into client code — **everyone who visits your site can read them** by inspecting the JavaScript bundle. Never put secret API keys (payment keys, private API tokens) in `VITE_` variables. Use a backend proxy to keep secrets server-side.

**Q: What is `base` in vite.config.js?**
A: The public URL path your app will be served from. If deployed to `https://user.github.io/my-app/`, set `base: '/my-app/'`. If deployed to the root domain (`https://myapp.com/`), use `base: '/'` (the default).

---

**Prev:** [Section 21 — Testing Basics](../Section%2021%20-%20Testing%20Basics/README.md)
**Next:** [Section 23 — Final Review & Next Steps](../Section%2023%20-%20Final%20Review%20and%20Next%20Steps/README.md)
