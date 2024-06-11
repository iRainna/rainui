import { computed } from "vue";
import { baseData } from "./base.js";
import { overlayData } from "./overlay.js";

const data = computed(() => {
  return {
    ...baseData.value,
    ...overlayData.value,
  };
});

export { data };
