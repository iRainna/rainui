import { ref } from "vue";
export const themeObject = ref({
  default: {
    "r-overlay-background": "rgba(0, 0, 0, 0.7)",
    "r-overlay-z-index": 1,
  },
});

export const getTheme = (index = "default") => themeObject.value[index];

export const addTheme = (name, object) => {
  themeObject.value[name] = {
    ...themeObject.value.default,
    ...object,
  };
};
