# Section 18: Project 1 — Task Manager App

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Project Overview & Features |
| 2 | Project Structure Setup |
| 3 | Task Store with Pinia |
| 4 | Persisting Tasks with localStorage |
| 5 | TaskList Component |
| 6 | TaskItem Component |
| 7 | AddTask Form with Validation |
| 8 | Filtering Tasks (All / Active / Completed) |
| 9 | Drag-to-Reorder (optional) |
| 10 | Final Polish & Review |

## Project Overview

Build a full **Task Manager App** from scratch. This project ties together everything from Sections 3–17: reactive state, components, forms, validation, Pinia, composables, and localStorage persistence.

### Features

- ✅ Add tasks with title and optional due date
- ✅ Mark tasks complete / incomplete
- ✅ Delete tasks
- ✅ Edit task title inline
- ✅ Filter: All / Active / Completed
- ✅ Persist tasks to localStorage (survive page reload)
- ✅ Show task count and progress bar
- ✅ Clear all completed tasks

## Project Structure

```
src/
├── stores/
│   └── useTaskStore.js       # Pinia store — all task state and actions
├── composables/
│   └── useTaskFilter.js      # Filter logic (active/completed/all)
├── components/
│   ├── TaskList.vue           # Renders the filtered list
│   ├── TaskItem.vue           # Single task row with edit/delete
│   ├── AddTaskForm.vue        # Form to add a new task
│   ├── TaskFilter.vue         # Filter tab buttons (All/Active/Completed)
│   └── TaskProgress.vue      # Progress bar + stats
└── App.vue
```

## Key Code

```js
// stores/useTaskStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  // Load from localStorage on startup
  const stored = localStorage.getItem('tasks')
  const tasks = ref(stored ? JSON.parse(stored) : [])

  // Persist every change
  watch(tasks, (val) => {
    localStorage.setItem('tasks', JSON.stringify(val))
  }, { deep: true })

  // Getters
  const totalCount = computed(() => tasks.value.length)
  const completedCount = computed(() => tasks.value.filter(t => t.done).length)
  const activeCount = computed(() => totalCount.value - completedCount.value)
  const progress = computed(() =>
    totalCount.value ? Math.round((completedCount.value / totalCount.value) * 100) : 0
  )

  // Actions
  const addTask = (title, dueDate = null) => {
    if (!title.trim()) return
    tasks.value.push({
      id: crypto.randomUUID(),
      title: title.trim(),
      done: false,
      dueDate,
      createdAt: new Date().toISOString(),
    })
  }

  const toggleTask = (id) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  const updateTask = (id, title) => {
    const task = tasks.value.find(t => t.id === id)
    if (task && title.trim()) task.title = title.trim()
  }

  const clearCompleted = () => {
    tasks.value = tasks.value.filter(t => !t.done)
  }

  return {
    tasks, totalCount, completedCount, activeCount, progress,
    addTask, toggleTask, deleteTask, updateTask, clearCompleted,
  }
})
```

```js
// composables/useTaskFilter.js
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'

export function useTaskFilter() {
  const store = useTaskStore()
  const { tasks } = storeToRefs(store)

  const filter = ref('all') // 'all' | 'active' | 'completed'

  const filteredTasks = computed(() => {
    if (filter.value === 'active') return tasks.value.filter(t => !t.done)
    if (filter.value === 'completed') return tasks.value.filter(t => t.done)
    return tasks.value
  })

  return { filter, filteredTasks }
}
```

```vue
<!-- components/TaskItem.vue -->
<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

const props = defineProps({
  task: { type: Object, required: true },
})

const store = useTaskStore()

const isEditing = ref(false)
const editTitle = ref('')

const startEdit = () => {
  editTitle.value = props.task.title
  isEditing.value = true
}

const saveEdit = () => {
  store.updateTask(props.task.id, editTitle.value)
  isEditing.value = false
}

const cancelEdit = () => { isEditing.value = false }
</script>

<template>
  <li class="task-item" :class="{ done: task.done }">
    <input
      type="checkbox"
      :checked="task.done"
      @change="store.toggleTask(task.id)"
    />

    <span v-if="!isEditing" @dblclick="startEdit" class="task-title">
      {{ task.title }}
    </span>

    <input
      v-else
      v-model="editTitle"
      @keyup.enter="saveEdit"
      @keyup.esc="cancelEdit"
      @blur="saveEdit"
      class="edit-input"
      autofocus
    />

    <span v-if="task.dueDate" class="due-date">{{ task.dueDate }}</span>

    <div class="actions">
      <button v-if="!isEditing" @click="startEdit" title="Edit">✏️</button>
      <button @click="store.deleteTask(task.id)" title="Delete">🗑️</button>
    </div>
  </li>
</template>

<style scoped>
.task-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-bottom: 1px solid #eee; }
.task-item.done .task-title { text-decoration: line-through; color: #aaa; }
.task-title { flex: 1; cursor: text; }
.edit-input { flex: 1; padding: 0.25rem 0.5rem; border: 1px solid #42b883; border-radius: 4px; }
.due-date { font-size: 0.75rem; color: #888; }
.actions { display: flex; gap: 0.25rem; }
button { background: none; border: none; cursor: pointer; font-size: 1rem; }
</style>
```

```vue
<!-- components/AddTaskForm.vue -->
<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

const store = useTaskStore()

const title = ref('')
const dueDate = ref('')
const error = ref('')

const handleSubmit = () => {
  if (!title.value.trim()) {
    error.value = 'Task title is required'
    return
  }
  store.addTask(title.value, dueDate.value || null)
  title.value = ''
  dueDate.value = ''
  error.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="add-form">
    <div class="input-group">
      <input
        v-model="title"
        placeholder="What needs to be done?"
        :class="{ error: error }"
        @input="error = ''"
      />
      <input type="date" v-model="dueDate" />
      <button type="submit">Add</button>
    </div>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </form>
</template>

<style scoped>
.add-form { margin-bottom: 1rem; }
.input-group { display: flex; gap: 0.5rem; }
input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
input.error { border-color: #e53e3e; }
button { padding: 0.5rem 1rem; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; }
.error-msg { color: #e53e3e; font-size: 0.8rem; margin-top: 0.25rem; }
</style>
```

```vue
<!-- App.vue — root layout -->
<script setup>
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/useTaskStore'
import { useTaskFilter } from '@/composables/useTaskFilter'
import AddTaskForm from '@/components/AddTaskForm.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import TaskList from '@/components/TaskList.vue'
import TaskProgress from '@/components/TaskProgress.vue'

const store = useTaskStore()
const { totalCount, completedCount, activeCount, progress } = storeToRefs(store)
const { filter, filteredTasks } = useTaskFilter()
</script>

<template>
  <div class="app">
    <h1>Task Manager</h1>

    <TaskProgress :progress="progress" :total="totalCount" :completed="completedCount" />

    <AddTaskForm />

    <TaskFilter v-model="filter" :active-count="activeCount" />

    <TaskList :tasks="filteredTasks" />

    <footer v-if="completedCount > 0">
      <button @click="store.clearCompleted">
        Clear {{ completedCount }} completed
      </button>
    </footer>
  </div>
</template>

<style scoped>
.app { max-width: 600px; margin: 2rem auto; padding: 1.5rem; font-family: sans-serif; }
h1 { color: #42b883; margin-bottom: 1.5rem; }
footer { margin-top: 1rem; text-align: right; }
footer button { background: none; border: none; color: #e53e3e; cursor: pointer; font-size: 0.9rem; }
</style>
```

## Skills Practiced

| Concept | Where used |
|---------|-----------|
| `ref`, `computed` | Store getters, form state |
| `watch` | localStorage persistence |
| Pinia store | `useTaskStore` |
| `storeToRefs` | Destructuring store in App.vue |
| Composables | `useTaskFilter` |
| Props + emits | TaskItem, AddTaskForm |
| `defineModel` | TaskFilter active filter |
| Form validation | AddTaskForm |
| `v-for` + `:key` | TaskList |
| `v-if` / `v-show` | Edit mode, empty state |
| `crypto.randomUUID()` | Unique task IDs |
| Scoped CSS | All components |

## Review Q&A

**Q: Why use `crypto.randomUUID()` instead of an incrementing counter for IDs?**
A: `crypto.randomUUID()` is built into modern browsers and generates a globally unique ID regardless of the order of operations. An incrementing counter resets on reload (unless persisted), and can collide if you later sync tasks across devices.

**Q: Why does the store `watch` use `{ deep: true }`?**
A: `tasks` is a `ref` wrapping an array of objects. A plain `watch` would only detect when the array reference itself changes. `deep: true` detects changes to nested properties too — like when `task.done` is toggled.

**Q: What is `crypto.randomUUID()` and is it safe?**
A: It's a Web Crypto API method that generates a cryptographically random UUID v4. It's available in all modern browsers and Node.js 14.17+. For a task manager, it guarantees no ID collisions even if you add thousands of tasks offline.

## Examples Folder

No separate examples — the full project is built step by step in the course.

---

**Prev:** [Section 17 — Performance & Best Practices](../Section%2017%20-%20Performance%20and%20Best%20Practices/README.md)
**Next:** [Section 19 — Project 2: Products Dashboard](../Section%2019%20-%20Project%20Products%20Dashboard/README.md)
