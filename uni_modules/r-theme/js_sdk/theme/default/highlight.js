import { computed } from "vue";
import { baseData } from "./base.js";
export const highlightData = computed(() => ({
  "r-highlight-tag-color": baseData.value["r-primary-color"],
}));
