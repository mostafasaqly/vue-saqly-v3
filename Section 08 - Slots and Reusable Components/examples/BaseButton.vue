<script setup>
// BaseButton.vue — Reusable button component
// زر أساسي قابل لإعادة الاستخدام
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger', 'ghost', 'link'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
})

defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    class="base-btn"
    :class="[`btn-${variant}`, `btn-${size}`, { 'btn-full': fullWidth, 'btn-loading': loading }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner">⏳</span>
    <slot v-else />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

/* Sizes */
.btn-sm { padding: 0.35rem 0.9rem; font-size: 0.8rem; }
.btn-md { padding: 0.55rem 1.25rem; font-size: 0.95rem; }
.btn-lg { padding: 0.75rem 1.75rem; font-size: 1.1rem; }

/* Variants */
.btn-primary { background: #42b883; color: white; }
.btn-primary:hover:not(:disabled) { background: #33a06f; }

.btn-secondary { background: #6c757d; color: white; }
.btn-secondary:hover:not(:disabled) { background: #5a6268; }

.btn-danger { background: #dc3545; color: white; }
.btn-danger:hover:not(:disabled) { background: #c82333; }

.btn-ghost { background: transparent; color: #42b883; border: 2px solid #42b883; }
.btn-ghost:hover:not(:disabled) { background: #f0faf6; }

.btn-link { background: transparent; color: #42b883; text-decoration: underline; }

/* States */
.btn-full { width: 100%; }
.base-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-loading { cursor: wait; }
</style>
