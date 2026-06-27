<script setup>
// BaseCard.vue — Default + Named Slots
// بطاقة أساسية قابلة لإعادة الاستخدام مع slots متعددة
import { useSlots, computed } from 'vue'

defineProps({
  shadow: {
    type: String,
    default: 'sm', // 'none' | 'sm' | 'md' | 'lg'
  },
  padding: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg'
  },
  bordered: {
    type: Boolean,
    default: true,
  },
})

const slots = useSlots()
const hasHeader = computed(() => !!slots.header)
const hasFooter = computed(() => !!slots.footer)
</script>

<template>
  <div
    class="base-card"
    :class="[`shadow-${shadow}`, `padding-${padding}`, { bordered }]"
  >
    <!-- Named Slot: header -->
    <header v-if="hasHeader" class="card-header">
      <slot name="header" />
    </header>

    <!-- Default Slot: main content -->
    <main class="card-body">
      <slot>
        <!-- Fallback content if no slot provided -->
        <p class="empty-state">لا يوجد محتوى / No content provided</p>
      </slot>
    </main>

    <!-- Named Slot: footer -->
    <footer v-if="hasFooter" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.base-card {
  border-radius: 12px;
  background: white;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.base-card.bordered { border: 1px solid #e0e0e0; }

.shadow-none { box-shadow: none; }
.shadow-sm { box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.shadow-md { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.shadow-lg { box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

.padding-sm .card-body { padding: 0.75rem; }
.padding-md .card-body { padding: 1.25rem; }
.padding-lg .card-body { padding: 2rem; }

.card-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.card-footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.empty-state {
  color: #999;
  text-align: center;
  font-style: italic;
}
</style>
