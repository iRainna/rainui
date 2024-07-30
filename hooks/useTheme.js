import { useThemeStore } from "@/stores/theme";
import { computed } from "vue";

export default function () {
  const themeStore = useThemeStore();
  const themeName = computed(() => themeStore.theme);
  const changeTheme = (e) => {
    themeStore.changeTheme(e);
  };

  return {
    themeName,
    changeTheme,
  };
}
