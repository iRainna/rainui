import { computed } from "vue";
import { baseData } from "./base.js";

export const skeletonParagraphData = computed(() => ({
  "r-skeleton-paragraph-height": "32rpx",
  "r-skeleton-paragraph-background": baseData.value["r-active-color"],
  "r-skeleton-paragraph-margin-top": baseData.value["r-padding-sm"],
}));
