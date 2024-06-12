import { computed } from "vue";
import { baseData } from "./base.js";
export const loadingData = computed(() => ({
  "r-loading-text-color": baseData.value["r-text-color-2"],
  "r-loading-text-font-size": baseData.value["r-font-size-md"],
  "r-loading-spinner-color": baseData.value["r-gray-5"],
}));
