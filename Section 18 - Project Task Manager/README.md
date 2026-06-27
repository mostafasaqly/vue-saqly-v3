# القسم 18: المشروع الأول — تطبيق Task Manager
# Section 18: Project 1 — Task Manager App

> **Vue 3 Course — 23 Sections** | القسم 18 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | نظرة عامة على المشروع | Project Overview & Planning |
| 2 | إعداد المشروع | Project Setup |
| 3 | useTaskStore — Pinia Store | useTaskStore — Pinia Store |
| 4 | TaskForm — إضافة وتعديل مهام | TaskForm — Add & Edit Tasks |
| 5 | TaskItem — عرض مهمة واحدة | TaskItem — Display a Single Task |
| 6 | TaskList — قائمة المهام | TaskList — Task List Component |
| 7 | TaskFilter — تصفية المهام | TaskFilter — Filter Tasks |
| 8 | البحث والـ localStorage | Search & localStorage Persistence |
| 9 | التحقق من المدخلات | Form Validation |

## ميزات التطبيق | App Features

- ✅ إضافة مهام جديدة مع عنوان ووصف / Add tasks with title and description
- ✅ تعديل المهام الموجودة / Edit existing tasks
- ✅ حذف المهام / Delete tasks
- ✅ تحديد المهمة كمكتملة / Toggle task completion
- ✅ تصفية: الكل / النشطة / المكتملة / Filter: All / Active / Done
- ✅ البحث في المهام / Search tasks
- ✅ الحفظ في localStorage / localStorage persistence
- ✅ التحقق من المدخلات / Form validation

## هيكل الملفات | File Structure

```
src/
├── stores/
│   └── useTaskStore.js
├── components/
│   ├── TaskForm.vue
│   ├── TaskItem.vue
│   ├── TaskList.vue
│   └── TaskFilter.vue
└── views/
    └── TasksView.vue
```

## المفاهيم المستخدمة | Concepts Used

- Pinia (Setup Store) for state management
- `watch` with `deep: true` for localStorage persistence
- `computed` for filtering and searching
- `defineModel` for form binding
- Props + Emits for component communication
- `v-for` + `:key` for list rendering
- Transition animations

## أسئلة المراجعة | Review Q&A

**س: كيف تحفظ المهام في localStorage؟**
ج: استخدم `watch(tasks, (newTasks) => localStorage.setItem('tasks', JSON.stringify(newTasks)), { deep: true })` في الـ store.

**Q: How do you save tasks to localStorage?**
A: Use `watch(tasks, (newTasks) => localStorage.setItem('tasks', JSON.stringify(newTasks)), { deep: true })` in the store.

**س: كيف تُنشئ computed property للتصفية والبحث معاً؟**
ج: `computed(() => tasks.filter(t => t.title.includes(search.value) && matchesFilter(t)))`

**Q: How do you create a computed property for filtering and searching together?**
A: `computed(() => tasks.filter(t => t.title.includes(search.value) && matchesFilter(t)))`

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 17 — Performance & Best Practices
**التالي | Next:** Section 19 — Project 2: Products Dashboard
