import { ref, computed } from "vue";
import { data } from "./theme/default/index.js";

export const themeObject = ref({});
export const themeObjectComp = computed(() => {
  return {
    default: data.value,
    ...themeObject.value,
  };
});

export const getTheme = (name = "default") => themeObjectComp.value[name];

export const addTheme = (name, object) => {
  themeObject.value[name] = object;
};

export const updateThemeField = (label, value, name) => {
  themeObject.value[name][label] = value;
};
