#!/bin/bash
# Vue 3 Development Environment Setup Commands
# كل الأوامر اللازمة لإعداد بيئة التطوير

# 1. Verify Node.js installation (requires v18+)
node --version
npm --version

# 2. Create a new Vue 3 project
npm create vue@latest my-vue-app

# 3. Navigate to project directory
cd my-vue-app

# 4. Install dependencies
npm install

# 5. Start development server (runs on http://localhost:5173)
npm run dev

# 6. Build for production
npm run build

# 7. Preview the production build locally
npm run preview

# 8. Run linter
npm run lint

# 9. Run tests
npm run test:unit

# 10. Install additional packages (for later sections)
npm install axios           # HTTP client (Section 13)
npm install pinia           # State management (Section 14) — already included if selected
npm install vue-router      # Routing (Section 12) — already included if selected

# Useful VS Code extensions to install via CLI
code --install-extension Vue.volar
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
