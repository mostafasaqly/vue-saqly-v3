<script setup lang="ts">
// UserCard.vue — TypeScript props with interface
import { computed } from 'vue'
import type { User } from './types'

// Typed Props using TypeScript interface
interface Props {
  user: User
  showActions?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
  compact: false,
})

// Typed Emits
const emit = defineEmits<{
  edit: [user: User]
  delete: [id: number]
  'toggle-active': [id: number]
}>()

// Typed Computed
const initials = computed<string>(() =>
  props.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
)

const roleLabel = computed<string>(() => {
  const labels: Record<User['role'], string> = {
    admin: '👑 مدير',
    user: '👤 مستخدم',
    guest: '👻 ضيف',
  }
  return labels[props.user.role]
})

const handleEdit = () => emit('edit', props.user)
const handleDelete = () => emit('delete', props.user.id)
const handleToggle = () => emit('toggle-active', props.user.id)
</script>

<template>
  <div class="user-card" :class="{ compact, inactive: !user.isActive }" dir="rtl">
    <div class="avatar-section">
      <img v-if="user.avatar" :src="user.avatar" :alt="user.name" class="avatar" />
      <div v-else class="avatar-placeholder">{{ initials }}</div>
      <span class="status" :class="{ active: user.isActive }"></span>
    </div>

    <div class="info">
      <h3>{{ user.name }}</h3>
      <p class="email">{{ user.email }}</p>
      <span class="role">{{ roleLabel }}</span>
      <p v-if="!compact" class="date">عضو منذ: {{ user.createdAt }}</p>
    </div>

    <div v-if="showActions" class="actions">
      <button @click="handleEdit" class="btn-edit">تعديل</button>
      <button @click="handleToggle" class="btn-toggle">
        {{ user.isActive ? 'تعطيل' : 'تفعيل' }}
      </button>
      <button @click="handleDelete" class="btn-delete">حذف</button>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  direction: rtl;
  font-family: 'Segoe UI', sans-serif;
}
.user-card.compact { padding: 0.65rem; }
.user-card.inactive { opacity: 0.55; }
.avatar-section { position: relative; }
.avatar, .avatar-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.avatar { object-fit: cover; }
.avatar-placeholder {
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.status {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ccc;
  border: 2px solid white;
}
.status.active { background: #4caf50; }
.info { flex: 1; }
.info h3 { margin: 0 0 0.2rem; }
.email { color: #666; font-size: 0.83rem; margin: 0.2rem 0; }
.role { font-size: 0.78rem; }
.date { color: #999; font-size: 0.75rem; margin: 0.2rem 0; }
.actions { display: flex; flex-direction: column; gap: 0.3rem; }
button { padding: 0.3rem 0.65rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.78rem; }
.btn-edit { background: #e3f2fd; color: #1565c0; }
.btn-toggle { background: #fff3e0; color: #e65100; }
.btn-delete { background: #ffebee; color: #c62828; }
</style>
