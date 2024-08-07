import { computed } from "vue";

import { skeletonParagraphData } from "./skeleton-paragraph.js";
export const skeletonTitleData = computed(() => ({
  ...skeletonParagraphData.value,
  "r-skeleton-title-width": "40%",
}));
