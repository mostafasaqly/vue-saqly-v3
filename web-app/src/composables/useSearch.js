import { ref, watch } from "vue";
import { sections, loadSection } from "../data/sections.js";

const query = ref("");
const results = ref([]);
const indexReady = ref(false);
let index = [];

// Build search index once
Promise.all(
  sections
    .filter((s) => !s.comingSoon)
    .map((s) =>
      loadSection(s.id)
        .then((data) => {
          const texts = [];
          (data.content || []).forEach((block) => {
            if (block.text) texts.push(block.text);
            if (block.items) texts.push(...block.items);
            if (block.question) texts.push(block.question);
            if (block.answer) texts.push(block.answer);
          });
          return { id: s.id, title: s.title, titleEn: s.titleEn || s.title, texts };
        })
        .catch(() => null)
    )
).then((entries) => {
  index = entries.filter(Boolean);
  indexReady.value = true;
});

watch(query, (q) => {
  const qLow = q.trim().toLowerCase();
  if (!qLow || !indexReady.value) { results.value = []; return; }
  const hits = [];
  for (const entry of index) {
    const titleMatch = entry.title.toLowerCase().includes(qLow) || entry.titleEn.toLowerCase().includes(qLow);
    const snippets = [];
    for (const t of entry.texts) {
      if (t.toLowerCase().includes(qLow)) {
        snippets.push(t.length > 120 ? t.slice(0, 120) + "…" : t);
        if (snippets.length >= 2) break;
      }
    }
    if (titleMatch || snippets.length > 0) hits.push({ id: entry.id, title: entry.title, titleEn: entry.titleEn, snippets });
  }
  results.value = hits;
});

export function useSearch() {
  function clearSearch() { query.value = ""; results.value = []; }
  return { query, results, clearSearch, indexReady };
}
