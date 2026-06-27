<script setup>
import { ref } from "vue";
import { useLang } from "../composables/useLang.js";

const props = defineProps({ code: { type: String, required: true } });
const { lang } = useLang();
const isAr = () => lang.value === "ar";
const copied = ref(false);

function highlight(raw) {
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (/^\s*(\$|npm |npx |node |git |cd |ls )/.test(escaped)) {
    return escaped
      .replace(/^(\s*)\$ /gm, '$1<span class="tok-sh-prompt">$ </span>')
      .replace(/\b(npm|npx|node|git|cd|ls|mkdir|cp|mv|rm)\b/g, '<span class="tok-sh-cmd">$1</span>')
      .replace(/\b(install|run|init|add|start|build|create|clone|i)\b/g, '<span class="tok-sh-sub">$1</span>')
      .replace(/--[\w-]+/g, '<span class="tok-sh-flag">$&</span>');
  }

  // Extract comments first as placeholders so subsequent regexes don't corrupt their content
  const comments = [];
  const withoutComments = escaped.replace(/(\/\/[^\n]*)/g, (match) => {
    comments.push(match);
    return `\x00COMMENT${comments.length - 1}\x00`;
  });

  const highlighted = withoutComments
    .replace(/\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|new|async|await|default|typeof|instanceof)\b/g, '<span class="tok-keyword">$1</span>')
    .replace(/\b(ref|reactive|computed|watch|watchEffect|onMounted|onUnmounted|defineProps|defineEmits|defineModel|defineExpose|useRoute|useRouter|createApp|inject|provide)\b/g, '<span class="tok-builtin">$1</span>')
    .replace(/(&quot;[^&]*&quot;|&#39;[^&]*&#39;|`[^`]*`)/g, '<span class="tok-string">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="tok-number">$1</span>')
    .replace(/(&lt;\/?[\w.-]+)/g, '<span class="tok-tag">$1</span>');

  // Restore comments as styled spans
  return highlighted.replace(/\x00COMMENT(\d+)\x00/g, (_, i) =>
    `<span class="tok-comment">${comments[+i]}</span>`
  );
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    copied.value = false;
  }
}
</script>

<template>
  <div class="code-wrapper">
    <pre class="block-code"><code v-html="highlight(code)" /></pre>
    <button
      class="code-copy"
      :class="{ 'code-copy--done': copied }"
      @click="copy"
      :aria-label="copied ? (isAr() ? 'تم النسخ!' : 'Copied!') : (isAr() ? 'نسخ الكود' : 'Copy code')"
    >
      {{ copied ? "✓" : (isAr() ? "نسخ" : "Copy") }}
    </button>
  </div>
</template>
