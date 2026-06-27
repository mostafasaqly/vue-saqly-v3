<script setup>
import { computed } from "vue";
import { sections } from "../data/sections.js";
import { useLang } from "../composables/useLang.js";
import { useTheme } from "../composables/useTheme.js";
import { useProgress } from "../composables/useProgress.js";
import { useSearch } from "../composables/useSearch.js";

const props = defineProps({
  activeId: Number,
  isOpen: Boolean,
});
const emit = defineEmits(["select", "close"]);

const { lang, toggle: toggleLang } = useLang();
const { theme, toggle: toggleTheme } = useTheme();
const { isComplete, percent, completed, total } = useProgress();
const { query, results, clearSearch, indexReady } = useSearch();

const isAr = computed(() => lang.value === "ar");

function select(id) {
  emit("select", id);
  emit("close");
  clearSearch();
}
</script>

<template>
  <div v-if="isOpen" class="overlay" aria-hidden="true" @click="emit('close')" />

  <aside
    id="sidebar"
    class="sidebar"
    :class="{ 'sidebar--open': isOpen }"
    :aria-label="isAr ? 'قائمة الأقسام' : 'Course sections'"
  >
    <!-- Brand -->
    <div class="sidebar__brand">
      <span class="sidebar__logo" aria-hidden="true">💚</span>
      <div>
        <h1 class="sidebar__title">{{ isAr ? "كورس Vue 3" : "Vue 3 Course" }}</h1>
        <p class="sidebar__subtitle">
          {{ isAr ? `${sections.length} قسماً • بالعربية` : `${sections.length} sections • Arabic` }}
        </p>
      </div>
      <a
        href="https://mostafasaqly.github.io/react-saqly-v19/"
        target="_blank"
        rel="noopener noreferrer"
        class="sidebar__react-link"
        :title="isAr ? 'كورس React 19' : 'React 19 Course'"
        :aria-label="isAr ? 'انتقل إلى كورس React' : 'Go to React Course'"
      >
        <svg class="sidebar__react-logo" viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
          <g stroke="#61dafb" stroke-width="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      </a>
    </div>

    <!-- Controls -->
    <div class="sidebar__controls">
      <button class="lang-toggle" @click="toggleLang" :aria-label="isAr ? 'Switch to English' : 'التبديل للعربية'">
        {{ isAr ? "EN" : "AR" }}
      </button>
      <button class="theme-toggle" @click="toggleTheme" :aria-label="theme === 'dark' ? (isAr ? 'الوضع الفاتح' : 'Light mode') : (isAr ? 'الوضع الداكن' : 'Dark mode')">
        {{ theme === "dark" ? "☀️" : "🌙" }}
      </button>
    </div>

    <!-- Progress -->
    <div class="progress-box" :aria-label="isAr ? `تقدمك: ${percent}%` : `Progress: ${percent}%`">
      <div class="progress-box__header">
        <span>{{ isAr ? "تقدمك" : "Progress" }}</span>
        <span class="progress-box__nums">{{ completed.length }}/{{ total }}</span>
      </div>
      <div class="progress-bar" role="progressbar" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar__fill" :style="{ width: percent + '%' }" />
      </div>
      <span class="progress-box__pct">{{ percent }}%</span>
    </div>

    <!-- Search -->
    <div class="sidebar__search">
      <input
        class="search-input"
        type="search"
        v-model="query"
        :placeholder="indexReady ? (isAr ? 'ابحث في الكورس…' : 'Search course…') : (isAr ? 'جارٍ التحميل…' : 'Loading…')"
        :disabled="!indexReady"
        :aria-label="isAr ? 'بحث' : 'Search'"
      />
      <button v-if="query" class="search-clear" @click="clearSearch" :aria-label="isAr ? 'مسح البحث' : 'Clear search'">✕</button>
    </div>

    <!-- Search results -->
    <div v-if="query" class="search-results" role="listbox">
      <p v-if="results.length === 0" class="search-empty">{{ isAr ? "لا نتائج" : "No results" }}</p>
      <template v-else>
        <button
          v-for="r in results"
          :key="r.id"
          class="search-result-item"
          role="option"
          @click="select(r.id)"
        >
          <span class="search-result-item__title">{{ isAr ? r.title : r.titleEn }}</span>
          <span v-for="(s, i) in r.snippets" :key="i" class="search-result-item__snippet">{{ s }}</span>
        </button>
      </template>
    </div>

    <!-- Nav -->
    <nav class="sidebar__nav" :aria-label="isAr ? 'الأقسام' : 'Sections'">
      <button
        v-for="section in sections"
        :key="section.id"
        class="nav-item"
        :class="{
          'nav-item--active': section.id === activeId,
          'nav-item--soon': section.comingSoon,
          'nav-item--done': isComplete(section.id),
        }"
        @click="!section.comingSoon && select(section.id)"
        :aria-current="section.id === activeId ? 'page' : undefined"
        :aria-disabled="section.comingSoon ? 'true' : undefined"
      >
        <span class="nav-item__num" aria-hidden="true">
          {{ isComplete(section.id) ? "✓" : section.id }}
        </span>
        <span class="nav-item__text">{{ isAr ? section.title : (section.titleEn || section.title) }}</span>
        <span v-if="section.comingSoon" class="nav-item__badge" aria-hidden="true">
          {{ isAr ? "قريباً" : "Soon" }}
        </span>
      </button>
    </nav>
  </aside>
</template>
