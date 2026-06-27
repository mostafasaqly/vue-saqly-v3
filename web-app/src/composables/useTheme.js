import { ref, watch } from "vue";

const theme = ref(localStorage.getItem("vue_theme") || "dark");

watch(theme, (val) => {
  document.documentElement.setAttribute("data-theme", val);
  localStorage.setItem("vue_theme", val);
}, { immediate: true });

export function useTheme() {
  function toggle() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }
  return { theme, toggle };
}
