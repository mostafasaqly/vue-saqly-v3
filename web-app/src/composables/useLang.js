import { ref, watch } from "vue";

const lang = ref(localStorage.getItem("vue_lang") || "ar");

watch(lang, (val) => {
  document.documentElement.lang = val;
  document.documentElement.dir = val === "ar" ? "rtl" : "ltr";
  localStorage.setItem("vue_lang", val);
}, { immediate: true });

export function useLang() {
  function toggle() {
    lang.value = lang.value === "ar" ? "en" : "ar";
  }
  return { lang, toggle };
}
