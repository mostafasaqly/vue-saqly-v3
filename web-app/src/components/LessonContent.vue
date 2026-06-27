<script setup>
import { computed } from "vue";
import CodeBlock from "./CodeBlock.vue";
import QABlock from "./QABlock.vue";
import { useLang } from "../composables/useLang.js";
import { useProgress } from "../composables/useProgress.js";
import { useNotes } from "../composables/useNotes.js";

const props = defineProps({ section: Object });
const { lang } = useLang();
const { isComplete, toggleComplete } = useProgress();
const { getNote, setNote } = useNotes();

const isAr = computed(() => lang.value === "ar");
const done = computed(() => props.section ? isComplete(props.section.id) : false);
const note = computed(() => props.section ? getNote(props.section.id) : "");

const title   = computed(() => isAr.value ? props.section?.title   : (props.section?.titleEn   || props.section?.title));
const intro   = computed(() => isAr.value ? props.section?.intro   : (props.section?.introEn   || props.section?.intro));
const level   = computed(() => isAr.value ? props.section?.level   : (props.section?.levelEn   || props.section?.level));
const lessons = computed(() => isAr.value ? props.section?.lessons : (props.section?.lessonsEn || props.section?.lessons));
const content = computed(() => isAr.value ? props.section?.content : (props.section?.contentEn || props.section?.content));

function onNoteInput(e) {
  if (props.section) setNote(props.section.id, e.target.value);
}
</script>

<template>
  <div v-if="!section" />

  <div v-else-if="section.comingSoon" class="coming-soon">
    <span class="coming-soon__emoji">🚧</span>
    <h2>{{ isAr ? "هذا القسم قريباً" : "Coming Soon" }}</h2>
    <p>{{ isAr ? `القسم «${title}» قيد الإعداد.` : `Section «${title}» is being prepared.` }}</p>
  </div>

  <article v-else class="lesson">
    <header class="lesson__header">
      <div class="lesson__meta">
        <span class="badge">{{ isAr ? `القسم ${section.id}` : `Section ${section.id}` }}</span>
        <span v-if="level" class="badge badge--soft">{{ level }}</span>
      </div>
      <h1 class="lesson__title">{{ title }}</h1>
      <p v-if="intro" class="lesson__intro">{{ intro }}</p>
      <div v-if="lessons?.length" class="lesson__toc">
        <h3>{{ isAr ? "دروس هذا القسم" : "Lessons in this section" }}</h3>
        <ol>
          <li v-for="(lesson, i) in lessons" :key="i">{{ lesson }}</li>
        </ol>
      </div>
    </header>

    <div class="lesson__body">
      <template v-for="(block, i) in content" :key="i">
        <h2 v-if="block.type === 'heading'" class="block-heading">
          {{ block.text }}
          <span v-if="block.term && !block.text.includes(block.term)" class="block-heading__term">{{ block.term }}</span>
        </h2>
        <h3 v-else-if="block.type === 'subheading'" class="block-subheading">{{ block.text }}</h3>
        <p v-else-if="block.type === 'paragraph'" class="block-paragraph">{{ block.text }}</p>
        <CodeBlock v-else-if="block.type === 'code'" :code="block.code" />
        <div v-else-if="block.type === 'tip'" class="callout callout--tip">
          <span class="callout__icon" aria-hidden="true">💡</span>
          <p>{{ block.text }}</p>
        </div>
        <div v-else-if="block.type === 'warning'" class="callout callout--warning">
          <span class="callout__icon" aria-hidden="true">⚠️</span>
          <p>{{ block.text }}</p>
        </div>
        <ul v-else-if="block.type === 'list'" class="block-list">
          <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
        </ul>
        <p v-else-if="block.type === 'cta'" class="block-paragraph">
          {{ block.text }}&nbsp;<a :href="block.link" target="_blank" rel="noopener noreferrer" class="cta-link">{{ block.linkLabel }}</a>
        </p>
        <QABlock v-else-if="block.type === 'qa'" :question="block.question" :answer="block.answer" />
      </template>
    </div>

    <div class="lesson__notes">
      <label class="lesson__notes-label" :for="`notes-${section.id}`">
        📝 {{ isAr ? "ملاحظاتي" : "My Notes" }}
      </label>
      <textarea
        :id="`notes-${section.id}`"
        class="lesson__notes-textarea"
        :value="note"
        @input="onNoteInput"
        :placeholder="isAr ? 'اكتب ملاحظاتك هنا… تُحفظ تلقائياً.' : 'Write your notes here… saved automatically.'"
        rows="4"
      />
    </div>

    <div class="lesson__complete">
      <button
        class="complete-btn"
        :class="{ 'complete-btn--done': done }"
        @click="toggleComplete(section.id)"
        :aria-pressed="done"
      >
        {{ done
          ? (isAr ? "✓ أتممت هذا القسم" : "✓ Section completed")
          : (isAr ? "وضّع علامة مكتمل" : "Mark as complete") }}
      </button>
    </div>
  </article>
</template>
