import { computed } from "vue";
import { skeletonParagraphData } from "./skeleton-paragraph.js";
export const skeletonData = computed(() => ({
  ...skeletonParagraphData.value,
  "r-skeleton-duration": "1.2s",
}));
