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
export const getThemeCssVar = (name = "default") => {
	let value = themeObjectComp.value[name]
	let keys = Object.keys(value);
	let cssVar = {};
	keys.forEach((t) => {
	  cssVar[`--${t}`] = value[t];
	});
	return cssVar;
};

export const addTheme = (name, object) => {
  themeObject.value[name] = object;
};
