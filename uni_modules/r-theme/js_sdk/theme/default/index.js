import { computed } from "vue";
import { baseData } from "./base.js";
import { overlayData } from "./overlay.js";
import { rateData } from "./rate.js";

const data = computed(() => {
  return {
    ...baseData.value,
    ...overlayData.value,
    ...rateData.value,
  };
});

export { data };
