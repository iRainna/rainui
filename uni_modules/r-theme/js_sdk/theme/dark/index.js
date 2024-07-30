import { computed } from "vue";
import { baseData } from "./base.js";
import { buttonData } from "./button.js";
export const data = computed(() => ({
  ...baseData.value,
  ...buttonData.value,
}));
export const moduleData = computed(() => ({
  "r-base": baseData.value,
  "r-button": buttonData.value,
}));
