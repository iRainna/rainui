import { ref, computed } from "vue";
import { data, moduleData } from "./theme/default/index.js";

export const themeObject = ref({});
export const themeObjectComp = computed(() => ({
  default: data.value,
  ...themeObject.value,
}));
export const themeModuleObject = ref({});
export const themeModuleObjectComp = computed(() => ({
  default: moduleData.value,
  ...themeModuleObject.value,
}));

export const getThemeCssVar = (name = "default") => {
  let value = themeObjectComp.value[name];

  let cssVar = {};
  if (value) {
    let keys = Object.keys(value);

    keys.forEach((t) => {
      cssVar[`--${t}`] = value[t];
    });
  }

  return cssVar;
};

export const getComponentThemeCssVar = (
  themeName = "default",
  compoentName
) => {
  let value = themeModuleObjectComp.value[themeName]
    ? themeModuleObjectComp.value[themeName][compoentName]
    : {};

  let cssVar = {};
  if (value) {
    let keys = Object.keys(value);

    keys.forEach((t) => {
      cssVar[`--${t}`] = value[t];
    });
  }

  return cssVar;
};

export const addTheme = (name, object) => {
  themeObject.value[name] = object;
};
