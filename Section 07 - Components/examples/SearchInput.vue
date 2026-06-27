<script setup>
// SearchInput.vue — Component with defineModel
// مكون البحث باستخدام defineModel (Vue 3.4+)
import { computed, useTemplateRef } from 'vue'

// defineModel — two-way binding simplified
const model = defineModel({
  type: String,
  default: '',
})

const props = defineProps({
  placeholder: {
    type: String,
    default: 'ابحث هنا...',
  },
  debounceMs: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['search', 'clear'])

// useTemplateRef (Vue 3.5)
const inputRef = useTemplateRef('searchInput')

const hasValue = computed(() => model.value.length > 0)

const clearSearch = () => {
  model.value = ''
  emit('clear')
  inputRef.value?.focus()
}

const handleEnter = () => {
  emit('search', model.value)
}

// Expose focus method to parent
defineExpose({
  focus: () => inputRef.value?.focus(),
  clear: clearSearch,
})
</script>

<template>
  <div class="search-wrapper" dir="rtl">
    <div class="search-input-container">
      <span class="search-icon">🔍</span>
      <input
        ref="searchInput"
        v-model="model"
        :placeholder="placeholder"
        :disabled="disabled"
        type="search"
        class="search-input"
        @keyup.enter="handleEnter"
      />
      <button
        v-if="clearable && hasValue"
        @click="clearSearch"
        class="clear-btn"
        title="مسح البحث"
      >
        ×
      </button>
    </div>
    <div class="search-info" v-if="hasValue">
      <small>نتائج البحث عن: "{{ model }}"</small>
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  width: 100%;
  font-family: 'Segoe UI', sans-serif;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  font-size: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.6rem 2.5rem 0.6rem 2.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  direction: rtl;
}

.search-input:focus {
  border-color: #42b883;
}

.search-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.clear-btn {
  position: absolute;
  left: 0.5rem;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
  padding: 0.2rem;
}

.clear-btn:hover { color: #333; }

.search-info {
  margin-top: 0.3rem;
  color: #42b883;
  font-size: 0.8rem;
}
</style>
