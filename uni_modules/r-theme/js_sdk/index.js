import { ref } from "vue";

export const themeObject = ref({
  default: {
    "r-overlay-background": "rgba(0, 0, 0, 0.7)",
    "r-overlay-z-index": 1,

    "r-text-color": "#323233",
  },
});

export const getTheme = (name = "default") => themeObject.value[name];

export const addTheme = (name, object) => {
  themeObject.value[name] = object;
};

export const updateThemeField = (label, value, name) => {
  themeObject.value[name][label] = value;
};
