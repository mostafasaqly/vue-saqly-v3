import { ref, watch } from "vue";
import { loadSection } from "../data/sections.js";

const cache = {};

export function useSectionContent(activeId) {
  const section = ref(null);
  const loading = ref(true);
  const error = ref(false);
  const attempt = ref(0);

  function retry() { attempt.value++; }

  watch(
    [activeId, attempt],
    async () => {
      const id = typeof activeId === "object" ? activeId.value : activeId;
      loading.value = true;
      error.value = false;

      if (cache[id]) {
        section.value = cache[id];
        loading.value = false;
        return;
      }
      try {
        const data = await loadSection(id);
        cache[id] = data;
        section.value = data;
      } catch {
        section.value = null;
        error.value = true;
      } finally {
        loading.value = false;
      }
    },
    { immediate: true }
  );

  return { section, loading, error, retry };
}
