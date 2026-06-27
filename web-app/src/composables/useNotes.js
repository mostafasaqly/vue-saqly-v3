import { ref } from "vue";

const notes = ref((() => {
  try { return JSON.parse(localStorage.getItem("vue_notes") || "{}"); }
  catch { return {}; }
})());

export function useNotes() {
  function setNote(sectionId, text) {
    notes.value = { ...notes.value, [sectionId]: text };
    localStorage.setItem("vue_notes", JSON.stringify(notes.value));
  }
  function getNote(sectionId) { return notes.value[sectionId] || ""; }
  return { getNote, setNote };
}
