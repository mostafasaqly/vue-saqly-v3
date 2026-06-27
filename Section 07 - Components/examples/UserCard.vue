<script setup>
// UserCard.vue — Component with typed props
// مكون بطاقة المستخدم مع Props محددة الأنواع
import { computed } from 'vue'

// defineProps with validation and defaults
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://i.pravatar.cc/80',
  },
  role: {
    type: String,
    default: 'مستخدم',
    validator: (val) => ['مدير', 'مستخدم', 'ضيف'].includes(val),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  joinedAt: {
    type: String,
    default: () => new Date().toLocaleDateString('ar-EG'),
  },
})

// Emits
const emit = defineEmits(['edit', 'delete', 'toggle-active'])

// Computed
const roleClass = computed(() => ({
  admin: props.role === 'مدير',
  user: props.role === 'مستخدم',
  guest: props.role === 'ضيف',
}))

const initials = computed(() =>
  props.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
)
</script>

<template>
  <div class="user-card" :class="{ inactive: !isActive }">
    <div class="avatar-section">
      <img v-if="avatar" :src="avatar" :alt="name" class="avatar" />
      <div v-else class="avatar-initials">{{ initials }}</div>
      <span class="status-dot" :class="{ active: isActive }"></span>
    </div>

    <div class="info">
      <h3>{{ name }}</h3>
      <p class="email">{{ email }}</p>
      <span class="role-badge" :class="roleClass">{{ role }}</span>
      <p class="joined">انضم في: {{ joinedAt }}</p>
    </div>

    <div class="actions">
      <button @click="emit('edit', { name, email })" class="btn-edit">تعديل</button>
      <button @click="emit('toggle-active')" class="btn-toggle">
        {{ isActive ? 'تعطيل' : 'تفعيل' }}
      </button>
      <button @click="emit('delete')" class="btn-delete">حذف</button>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.2s;
  direction: rtl;
  font-family: 'Segoe UI', sans-serif;
}

.user-card.inactive { opacity: 0.6; }

.avatar-section { position: relative; }

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-initials {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  border: 2px solid white;
}

.status-dot.active { background: #4caf50; }

.info { flex: 1; }
.info h3 { margin: 0 0 0.25rem; }
.email { color: #666; font-size: 0.85rem; margin: 0.25rem 0; }
.joined { color: #999; font-size: 0.75rem; margin: 0.25rem 0; }

.role-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.role-badge.admin { background: #fce4ec; color: #c62828; }
.role-badge.user { background: #e8f5e9; color: #2e7d32; }
.role-badge.guest { background: #e3f2fd; color: #1565c0; }

.actions { display: flex; flex-direction: column; gap: 0.4rem; }

button {
  padding: 0.3rem 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
}

.btn-edit { background: #e3f2fd; color: #1565c0; }
.btn-toggle { background: #fff3e0; color: #e65100; }
.btn-delete { background: #ffebee; color: #c62828; }
</style>
