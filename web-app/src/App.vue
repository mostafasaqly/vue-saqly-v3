<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import Sidebar from "./components/Sidebar.vue";
import LessonContent from "./components/LessonContent.vue";
import { sections } from "./data/sections.js";
import { useSectionContent } from "./composables/useSectionContent.js";
import { useLang } from "./composables/useLang.js";

const { lang } = useLang();
const isAr = computed(() => lang.value === "ar");

function getIdFromHash() {
  const id = parseInt(window.location.hash.replace("#section-", ""), 10);
  return sections.some((s) => s.id === id) ? id : sections[0].id;
}

const activeId = ref(getIdFromHash());
const menuOpen = ref(false);

const { section: activeSection, loading, error, retry } = useSectionContent(activeId);
const activeMeta = computed(() => sections.find((s) => s.id === activeId.value) ?? sections[0]);

function onHashChange() { activeId.value = getIdFromHash(); }
onMounted(() => window.addEventListener("hashchange", onHashChange));
onUnmounted(() => window.removeEventListener("hashchange", onHashChange));

watch(activeId, (id) => {
  const expected = `#section-${id}`;
  if (window.location.hash !== expected) window.history.replaceState(null, "", expected);
  window.scrollTo({ top: 0, behavior: "auto" });
});

watch([activeMeta, isAr], () => {
  const meta = activeMeta.value;
  const name = isAr.value ? meta.title : (meta.titleEn || meta.title);
  document.title = `${name} — ${isAr.value ? "كورس Vue 3" : "Vue 3 Course"}`;
}, { immediate: true });

function onKeyDown(e) { if (e.key === "Escape" && menuOpen.value) menuOpen.value = false; }
onMounted(() => window.addEventListener("keydown", onKeyDown));
onUnmounted(() => window.removeEventListener("keydown", onKeyDown));

function selectSection(id) {
  window.location.hash = `#section-${id}`;
  activeId.value = id;
  menuOpen.value = false;
}
</script>

<template>
  <div class="layout">
    <a href="#main-content" class="skip-link">
      {{ isAr ? "تخطَّ إلى المحتوى" : "Skip to content" }}
    </a>

    <Sidebar
      :activeId="activeId"
      :isOpen="menuOpen"
      @select="selectSection"
      @close="menuOpen = false"
    />

    <main class="content" id="main-content" tabindex="-1">
      <div class="topbar">
        <button
          class="topbar__menu"
          @click="menuOpen = true"
          :aria-label="isAr ? 'فتح القائمة' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="sidebar"
        >
          ☰ {{ isAr ? "الأقسام" : "Sections" }}
        </button>
        <span class="topbar__title">{{ isAr ? "كورس Vue 3" : "Vue 3 Course" }}</span>
      </div>

      <div class="content__inner">
        <div v-if="loading" class="section-loading" aria-live="polite">
          <div class="section-loading__bar" />
          <div class="section-loading__bar section-loading__bar--short" />
          <div class="section-loading__bar section-loading__bar--medium" />
        </div>

        <div v-else-if="error" class="section-error" role="alert">
          <span class="section-error__emoji" aria-hidden="true">⚠️</span>
          <h2>{{ isAr ? "تعذّر تحميل القسم" : "Couldn't load this section" }}</h2>
          <p>{{ isAr ? "حدث خطأ أثناء التحميل." : "Something went wrong loading the content." }}</p>
          <button class="section-error__retry" @click="retry">
            {{ isAr ? "إعادة المحاولة" : "Try again" }}
          </button>
        </div>

        <LessonContent v-else :section="activeSection" />
      </div>
    </main>
  </div>
</template>
