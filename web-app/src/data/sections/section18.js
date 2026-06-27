export default {
  id: 18,
  title: "المشروع الأول: تطبيق إدارة المهام",
  titleEn: "Project 1: Task Manager App",
  level: "تطبيق عملي",
  levelEn: "Hands-on Project",
  lessons: ["نظرة عامة على المشروع", "تصميم تخطيط التطبيق", "إنشاء Task Components", "إضافة المهام", "تحديث المهام", "حذف المهام", "فلترة المهام", "التحقق من النموذج", "حفظ المهام", "إعادة البناء بـ Composables"],
  lessonsEn: ["Project Overview", "Creating App Layout", "Creating Task Components", "Adding Tasks", "Updating Tasks", "Deleting Tasks", "Filtering Tasks", "Form Validation", "Persisting Tasks", "Refactoring with Composables"],
  intro: "نبني تطبيق إدارة مهام كامل — يجمع كل ما تعلمناه: Composition API، Pinia، Composables، وlocalStorage.",
  introEn: "Build a complete task manager app — combining everything learned: Composition API, Pinia, Composables, and localStorage.",
  content: [
    { type: "heading", text: "🗂️ نظرة عامة على المشروع" },
    { type: "paragraph", text: "سنبني تطبيق Task Manager كامل يتضمن:" },
    { type: "list", items: ["إضافة وتعديل وحذف المهام", "تحديد المهام كمُنجَزة", "فلترة (الكل / نشطة / منجزة)", "بحث نصي", "حفظ في localStorage", "التحقق من صحة النموذج", "رسائل تأكيد الحذف"] },
    { type: "heading", text: "هيكل المشروع" },
    { type: "code", code: `src/
├── components/
│   ├── TaskForm.vue      # نموذج الإضافة/التعديل
│   ├── TaskItem.vue      # عنصر مهمة واحدة
│   ├── TaskList.vue      # قائمة المهام
│   └── TaskFilter.vue    # أزرار الفلترة
├── composables/
│   └── useTasks.js       # منطق المهام
├── stores/
│   └── useTaskStore.js   # Pinia store
└── views/
    └── Home.vue          # الصفحة الرئيسية` },
    { type: "heading", text: "Pinia Store للمهام" },
    { type: "code", code: `// stores/useTaskStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('vue-tasks') || '[]'))

  const activeTasks = computed(() => tasks.value.filter(t => !t.done))
  const doneTasks = computed(() => tasks.value.filter(t => t.done))

  function save() {
    localStorage.setItem('vue-tasks', JSON.stringify(tasks.value))
  }

  function addTask(title) {
    tasks.value.unshift({
      id: Date.now(),
      title,
      done: false,
      createdAt: new Date().toISOString(),
    })
    save()
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) { task.done = !task.done; save() }
  }

  function editTask(id, newTitle) {
    const task = tasks.value.find(t => t.id === id)
    if (task) { task.title = newTitle; save() }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    save()
  }

  return { tasks, activeTasks, doneTasks, addTask, toggleTask, editTask, deleteTask }
})` },
    { type: "heading", text: "TaskForm Component" },
    { type: "code", code: `<!-- TaskForm.vue -->
<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

const store = useTaskStore()
const newTask = ref('')
const error = ref('')

function submit() {
  if (!newTask.value.trim()) { error.value = 'أدخل عنوان المهمة'; return }
  if (newTask.value.length > 100) { error.value = 'العنوان طويل جداً'; return }
  store.addTask(newTask.value.trim())
  newTask.value = ''
  error.value = ''
}
</script>

<template>
  <form @submit.prevent="submit" class="task-form">
    <input
      v-model="newTask"
      placeholder="أضف مهمة جديدة..."
      :class="{ 'input--error': error }"
      @input="error = ''"
    />
    <button type="submit">إضافة</button>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </form>
</template>` },
    { type: "heading", text: "TaskItem Component" },
    { type: "code", code: `<!-- TaskItem.vue -->
<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

const props = defineProps({ task: Object })
const store = useTaskStore()
const isEditing = ref(false)
const editText = ref('')

function startEdit() {
  editText.value = props.task.title
  isEditing.value = true
}

function saveEdit() {
  if (!editText.value.trim()) return
  store.editTask(props.task.id, editText.value.trim())
  isEditing.value = false
}
</script>

<template>
  <div class="task-item" :class="{ done: task.done }">
    <input type="checkbox" :checked="task.done" @change="store.toggleTask(task.id)" />

    <span v-if="!isEditing" @dblclick="startEdit" class="task-title">
      {{ task.title }}
    </span>
    <input v-else v-model="editText" @blur="saveEdit" @keyup.enter="saveEdit" />

    <div class="task-actions">
      <button @click="startEdit">✏️</button>
      <button @click="store.deleteTask(task.id)">🗑️</button>
    </div>
  </div>
</template>` },
    { type: "heading", text: "TaskFilter Component" },
    { type: "code", code: `<!-- TaskFilter.vue -->
<script setup>
const props = defineProps({ filter: String })
const emit = defineEmits(['update:filter'])
const filters = ['all', 'active', 'done']
const labels = { all: 'الكل', active: 'نشطة', done: 'منجزة' }
</script>

<template>
  <div class="filter-bar">
    <button
      v-for="f in filters" :key="f"
      :class="{ active: filter === f }"
      @click="emit('update:filter', f)"
    >
      {{ labels[f] }}
    </button>
  </div>
</template>` },
    { type: "tip", text: "هذا المشروع يستخدم Pinia كـ global state manager مما يُبسّط التواصل بين الـ components." },
    { type: "heading", text: "✅ مراجعة المشروع" },
    { type: "qa", question: "لماذا نستخدم Pinia بدلاً من props/emits لهذا المشروع؟", answer: "لأن البيانات تحتاجها عدة components في مستويات مختلفة — بدون Pinia ستحتاج prop drilling أو emit traversal معقدة. Pinia يضع البيانات في مكان مركزي يصله أي component مباشرة." },
  ],
  contentEn: [
    { type: "heading", text: "🗂️ Project Overview" },
    { type: "list", items: ["Add, edit, delete tasks", "Toggle tasks as complete", "Filter (all / active / done)", "Text search", "Save to localStorage", "Form validation"] },
    { type: "heading", text: "Task Store" },
    { type: "code", code: `// stores/useTaskStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('vue-tasks') || '[]'))

  function addTask(title) {
    tasks.value.unshift({ id: Date.now(), title, done: false })
    localStorage.setItem('vue-tasks', JSON.stringify(tasks.value))
  }

  function toggleTask(id) {
    const t = tasks.value.find(t => t.id === id)
    if (t) { t.done = !t.done; save() }
  }

  return { tasks, addTask, toggleTask }
})` },
    { type: "heading", text: "✅ Project Review" },
    { type: "qa", question: "Why use Pinia instead of props/emits for this project?", answer: "Because data is needed by multiple components at different levels. Without Pinia you'd need prop drilling or complex event traversal. Pinia stores data centrally, accessible by any component directly." },
  ],
};
