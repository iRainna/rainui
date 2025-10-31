import { computed } from "vue";

const skeletonData = computed(() => ({
  "r-skeleton-paragraph-height": "32rpx",
  "r-skeleton-paragraph-background": "var(--r-active-color)",
  "r-skeleton-paragraph-margin-top": "var(--r-padding-sm)",
  "r-skeleton-duration": "1.2s",
}));
export default skeletonData;
