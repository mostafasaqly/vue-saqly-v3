import { ref, computed } from "vue";
import { sections } from "../data/sections.js";

const TOTAL = sections.filter((s) => !s.comingSoon).length;

const completed = ref((() => {
  try { return JSON.parse(localStorage.getItem("vue_progress") || "[]"); }
  catch { return []; }
})());

export function useProgress() {
  function toggleComplete(id) {
    const idx = completed.value.indexOf(id);
    if (idx === -1) completed.value = [...completed.value, id];
    else completed.value = completed.value.filter((x) => x !== id);
    localStorage.setItem("vue_progress", JSON.stringify(completed.value));
  }
  function isComplete(id) { return completed.value.includes(id); }
  const percent = computed(() => Math.round((completed.value.length / TOTAL) * 100));
  return { completed, toggleComplete, isComplete, percent, total: TOTAL };
}
