const t={id:18,title:"المشروع الأول: تطبيق إدارة المهام",titleEn:"Project 1: Task Manager App",level:"تطبيق عملي",levelEn:"Hands-on Project",lessons:["نظرة عامة على المشروع والميزات","هيكل المشروع","useTaskStore — Pinia Store للمهام","useTaskFilter — Composable للفلترة والبحث","TaskItem Component","AddTaskForm Component","App.vue — تجميع كل شيء","localStorage Persistence","التحقق من النموذج","مهارات تطبّقها في هذا المشروع"],lessonsEn:["Project Overview & Features","Project Structure","useTaskStore — Pinia Store for Tasks","useTaskFilter — Filtering & Search Composable","TaskItem Component","AddTaskForm Component","App.vue — Putting It All Together","localStorage Persistence","Form Validation","Skills Practiced in This Project"],intro:"نبني تطبيق إدارة مهام كامل — يجمع كل ما تعلمناه: Composition API، Pinia، Composables، Transitions، وlocalStorage.",introEn:"Build a complete task manager app — combining everything learned: Composition API, Pinia, Composables, Transitions, and localStorage.",content:[{type:"heading",text:"🗂️ نظرة عامة على المشروع"},{type:"paragraph",text:"تطبيق Task Manager كامل بالميزات التالية:"},{type:"list",items:["إضافة مهام مع التحقق من النموذج","تحديد المهام كمُنجَزة بضغطة واحدة","تعديل المهام مباشرة (inline editing)","حذف مع رسالة تأكيد","فلترة: الكل / نشطة / منجزة","بحث نصي فوري","ترتيب حسب التاريخ / الأبجدية","حفظ تلقائي في localStorage","Transitions عند الإضافة والحذف"]},{type:"heading",text:"هيكل المشروع"},{type:"code",code:`src/
├── components/
│   ├── TaskItem.vue      # عنصر مهمة واحدة مع تعديل inline
│   ├── TaskList.vue      # قائمة المهام مع TransitionGroup
│   └── AddTaskForm.vue   # نموذج الإضافة مع validation
├── composables/
│   └── useTaskFilter.js  # منطق البحث والفلترة والترتيب
├── stores/
│   └── useTaskStore.js   # Pinia store — CRUD + persistence
└── App.vue               # صفحة الرئيسية تجمع كل شيء`},{type:"heading",text:"useTaskStore — Pinia Store"},{type:"code",code:`// stores/useTaskStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  // تحميل من localStorage أو مصفوفة فارغة
  const tasks = ref(JSON.parse(localStorage.getItem('vue-tasks') || '[]'))

  // Getters
  const totalCount = computed(() => tasks.value.length)
  const doneCount = computed(() => tasks.value.filter(t => t.done).length)
  const activeCount = computed(() => totalCount.value - doneCount.value)

  // حفظ تلقائي عند كل تغيير
  watch(tasks, (val) => {
    localStorage.setItem('vue-tasks', JSON.stringify(val))
  }, { deep: true })

  // Actions
  function addTask(title, priority = 'normal') {
    tasks.value.unshift({
      id: Date.now(),
      title: title.trim(),
      done: false,
      priority,  // 'low' | 'normal' | 'high'
      createdAt: new Date().toISOString(),
    })
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
  }

  function editTask(id, newTitle) {
    const task = tasks.value.find(t => t.id === id)
    if (task && newTitle.trim()) task.title = newTitle.trim()
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function clearDone() {
    tasks.value = tasks.value.filter(t => !t.done)
  }

  return {
    tasks, totalCount, doneCount, activeCount,
    addTask, toggleTask, editTask, deleteTask, clearDone,
  }
})`},{type:"heading",text:"useTaskFilter — Composable للفلترة"},{type:"code",code:`// composables/useTaskFilter.js
import { ref, computed } from 'vue'

export function useTaskFilter(tasks) {
  const filter = ref('all')    // 'all' | 'active' | 'done'
  const search = ref('')
  const sortBy = ref('newest') // 'newest' | 'oldest' | 'alpha'

  const filtered = computed(() => {
    let result = tasks.value

    // فلترة حسب الحالة
    if (filter.value === 'active') result = result.filter(t => !t.done)
    if (filter.value === 'done') result = result.filter(t => t.done)

    // بحث نصي
    if (search.value.trim()) {
      const q = search.value.toLowerCase()
      result = result.filter(t => t.title.toLowerCase().includes(q))
    }

    // ترتيب
    return [...result].sort((a, b) => {
      if (sortBy.value === 'alpha') return a.title.localeCompare(b.title)
      if (sortBy.value === 'oldest') return a.id - b.id
      return b.id - a.id // newest — default
    })
  })

  return { filter, search, sortBy, filtered }
}`},{type:"heading",text:"TaskItem Component"},{type:"code",code:`<!-- TaskItem.vue -->
<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

const props = defineProps({
  task: { type: Object, required: true },
})

const store = useTaskStore()
const isEditing = ref(false)
const editText = ref('')

function startEdit() {
  editText.value = props.task.title
  isEditing.value = true
}

function saveEdit() {
  if (editText.value.trim()) {
    store.editTask(props.task.id, editText.value)
  }
  isEditing.value = false
}

function cancelEdit() {
  isEditing.value = false
}

async function confirmDelete() {
  if (window.confirm('هل تريد حذف هذه المهمة؟')) {
    store.deleteTask(props.task.id)
  }
}
<\/script>

<template>
  <div class="task-item" :class="{ 'task-item--done': task.done, ['priority-' + task.priority]: true }">
    <input
      type="checkbox"
      :checked="task.done"
      @change="store.toggleTask(task.id)"
      class="task-item__check"
    />

    <!-- وضع العرض -->
    <span
      v-if="!isEditing"
      class="task-item__title"
      @dblclick="startEdit"
      :class="{ 'line-through': task.done }"
    >
      {{ task.title }}
    </span>

    <!-- وضع التعديل -->
    <input
      v-else
      v-model="editText"
      class="task-item__edit-input"
      @blur="saveEdit"
      @keyup.enter="saveEdit"
      @keyup.escape="cancelEdit"
      autofocus
    />

    <div class="task-item__actions">
      <button v-if="!isEditing" @click="startEdit" title="تعديل">✏️</button>
      <button @click="confirmDelete" title="حذف">🗑️</button>
    </div>
  </div>
</template>`},{type:"heading",text:"AddTaskForm Component"},{type:"code",code:`<!-- AddTaskForm.vue -->
<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

const store = useTaskStore()
const title = ref('')
const priority = ref('normal')
const error = ref('')

function submit() {
  if (!title.value.trim()) {
    error.value = 'أدخل عنوان المهمة'
    return
  }
  if (title.value.length > 120) {
    error.value = 'العنوان طويل جداً (أقصاه 120 حرفاً)'
    return
  }

  store.addTask(title.value, priority.value)
  title.value = ''
  priority.value = 'normal'
  error.value = ''
}
<\/script>

<template>
  <form @submit.prevent="submit" class="add-form">
    <input
      v-model="title"
      placeholder="أضف مهمة جديدة..."
      class="add-form__input"
      :class="{ 'add-form__input--error': error }"
      @input="error = ''"
    />

    <select v-model="priority" class="add-form__priority">
      <option value="low">منخفضة</option>
      <option value="normal">عادية</option>
      <option value="high">عالية</option>
    </select>

    <button type="submit" class="add-form__btn">+ إضافة</button>

    <Transition name="fade">
      <p v-if="error" class="add-form__error">{{ error }}</p>
    </Transition>
  </form>
</template>`},{type:"heading",text:"App.vue — تجميع كل شيء"},{type:"code",code:`<!-- App.vue -->
<script setup>
import { useTaskStore } from '@/stores/useTaskStore'
import { useTaskFilter } from '@/composables/useTaskFilter'
import { storeToRefs } from 'pinia'
import AddTaskForm from '@/components/AddTaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'

const store = useTaskStore()
const { tasks, totalCount, doneCount, activeCount } = storeToRefs(store)
const { filter, search, sortBy, filtered } = useTaskFilter(tasks)
<\/script>

<template>
  <div class="app">
    <header class="app__header">
      <h1>مهامي 📋</h1>
      <p>{{ doneCount }}/{{ totalCount }} منجزة</p>
    </header>

    <AddTaskForm />

    <div class="app__controls">
      <input v-model="search" placeholder="بحث..." />
      <div class="filter-btns">
        <button v-for="f in ['all','active','done']" :key="f"
          :class="{ active: filter === f }"
          @click="filter = f"
        >{{ { all:'الكل', active:'نشطة', done:'منجزة' }[f] }}</button>
      </div>
      <select v-model="sortBy">
        <option value="newest">الأحدث</option>
        <option value="oldest">الأقدم</option>
        <option value="alpha">أبجدي</option>
      </select>
    </div>

    <TransitionGroup name="task" tag="ul" class="task-list">
      <TaskItem v-for="task in filtered" :key="task.id" :task="task" />
    </TransitionGroup>

    <button v-if="doneCount > 0" @click="store.clearDone" class="clear-btn">
      حذف المنجزة ({{ doneCount }})
    </button>
  </div>
</template>`},{type:"heading",text:"مهارات تطبّقها في هذا المشروع"},{type:"list",items:["Pinia Setup Store — state وgetters وactions","watch مع deep: true لـ persistence تلقائي في localStorage","Composable — useTaskFilter يُستخدم في الـ App.vue","Transition وTransitionGroup للرسوم المتحركة","Form Validation — error messages مع Transition","Inline Editing مع keyup.enter وkeyup.escape","computed للاشتقاق الديناميكي (filtered list)","storeToRefs للحفاظ على reactivity"]},{type:"heading",text:"✅ مراجعة المشروع"},{type:"qa",question:"لماذا نستخدم Pinia بدلاً من props/emits لهذا المشروع؟",answer:"لأن البيانات تحتاجها عدة components في مستويات مختلفة — بدون Pinia ستحتاج prop drilling أو event bus. Pinia يضع البيانات في مكان مركزي يصله أي component مباشرة."},{type:"qa",question:"لماذا فصلنا منطق الفلترة في Composable منفصل؟",answer:"لفصل المسؤوليات — الـ store يتعامل مع البيانات (CRUD)، الـ Composable يتعامل مع عرض البيانات (filter/search/sort). يُسهّل الاختبار المستقل لكل منطق."},{type:"qa",question:"كيف نحفظ المهام تلقائياً في localStorage؟",answer:"نستخدم watch مع { deep: true } على الـ tasks ref. عند كل تغيير (إضافة/تعديل/حذف)، يُنفَّذ الـ watcher ويُحدّث localStorage. نحمّل البيانات عند الإنشاء: ref(JSON.parse(localStorage.getItem('vue-tasks') || '[]'))."},{type:"cta",text:"هل تريد تدريباً مخصصاً على Vue وبناء مشاريع احترافية؟",linkLabel:"تواصل معنا →",link:"https://saqly.com/individual-training"}],contentEn:[{type:"heading",text:"🗂️ Project Overview"},{type:"list",items:["Add tasks with validation","Toggle tasks as complete","Inline task editing (dblclick)","Delete with confirmation","Filter: all / active / done","Instant text search","Sort by date or alphabetically","Auto-save to localStorage","Transitions on add/remove"]},{type:"heading",text:"useTaskStore"},{type:"code",code:`// stores/useTaskStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('vue-tasks') || '[]'))

  const activeCount = computed(() => tasks.value.filter(t => !t.done).length)
  const doneCount = computed(() => tasks.value.filter(t => t.done).length)

  watch(tasks, (val) => localStorage.setItem('vue-tasks', JSON.stringify(val)), { deep: true })

  function addTask(title, priority = 'normal') {
    tasks.value.unshift({ id: Date.now(), title: title.trim(), done: false, priority, createdAt: new Date().toISOString() })
  }
  function toggleTask(id) { const t = tasks.value.find(t => t.id === id); if (t) t.done = !t.done }
  function editTask(id, title) { const t = tasks.value.find(t => t.id === id); if (t) t.title = title }
  function deleteTask(id) { tasks.value = tasks.value.filter(t => t.id !== id) }

  return { tasks, activeCount, doneCount, addTask, toggleTask, editTask, deleteTask }
})`},{type:"heading",text:"useTaskFilter Composable"},{type:"code",code:`// composables/useTaskFilter.js
import { ref, computed } from 'vue'

export function useTaskFilter(tasks) {
  const filter = ref('all')
  const search = ref('')
  const sortBy = ref('newest')

  const filtered = computed(() => {
    let result = tasks.value
    if (filter.value === 'active') result = result.filter(t => !t.done)
    if (filter.value === 'done') result = result.filter(t => t.done)
    if (search.value) result = result.filter(t => t.title.toLowerCase().includes(search.value.toLowerCase()))
    return [...result].sort((a, b) => sortBy.value === 'alpha' ? a.title.localeCompare(b.title) : b.id - a.id)
  })

  return { filter, search, sortBy, filtered }
}`},{type:"heading",text:"Skills Practiced"},{type:"list",items:["Pinia Setup Store — state, getters, actions","watch with deep: true for auto-persistence","Composable — useTaskFilter for filtering logic","Transition & TransitionGroup for animations","Form validation with error Transition","Inline editing with keyup.enter/escape"]},{type:"heading",text:"✅ Project Review"},{type:"qa",question:"Why use Pinia instead of props/emits?",answer:"Because data is needed by multiple components at different levels. Without Pinia you'd need prop drilling or an event bus. Pinia stores data centrally, accessible by any component directly."},{type:"qa",question:"Why separate filter logic into a Composable?",answer:"Separation of concerns — the store handles data (CRUD), the Composable handles presentation (filter/search/sort). Each can be tested independently."},{type:"cta",text:"Want personalized Vue training and project-building sessions?",linkLabel:"Contact Us →",link:"https://saqly.com/individual-training"}]};export{t as default};
