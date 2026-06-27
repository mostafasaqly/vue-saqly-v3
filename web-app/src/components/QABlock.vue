<script setup>
import { ref } from "vue";
defineProps({ question: String, answer: String });
const open = ref(false);
</script>

<template>
  <div class="qa">
    <button class="qa__question" @click="open = !open" :aria-expanded="open">
      <span>{{ question }}</span>
      <span class="qa__icon" :class="{ 'qa__icon--open': open }" aria-hidden="true">▼</span>
    </button>
    <div v-if="open" class="qa__answer">{{ answer }}</div>
  </div>
</template>
