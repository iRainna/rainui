import { computed } from "vue";
import { baseData } from "./base.js";
import { buttonData } from "./button.js";
import { pickerData } from "./picker.js";
import { switchData } from "./switch.js";
export const data = computed(() => ({
  ...baseData.value,
  ...buttonData.value,
  ...pickerData.value,
  ...switchData.value,
}));
export const moduleData = computed(() => ({
  "r-base": baseData.value,
  "r-button": buttonData.value,
  "r-picker": pickerData.value,
  "r-switch": switchData.value,
}));
