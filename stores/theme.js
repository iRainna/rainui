import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref("default");
  const changeTheme = (newTheme) => {
    theme.value = newTheme;
  };
  return {
    theme,
    changeTheme,
  };
});
