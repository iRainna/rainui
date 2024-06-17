import { computed } from "vue";
import { baseData } from "./base.js";

export const badgeData = computed(() => ({
  "r-badge-size": "32rpx",
  "r-badge-color": baseData.value["r-white"],
  "r-badge-padding": "0 6rpx",
  "r-badge-font-size": baseData.value["r-font-size-sm"],
  "r-badge-font-weight": baseData.value["r-font-bold"],
  "r-badge-border-width": baseData.value["r-border-width"],
  "r-badge-background": baseData.value["r-danger-color"],
  "r-badge-dot-color": baseData.value["r-danger-color"],
  "r-badge-dot-size": "16rpx",
  "r-badge-font": "-apple-system-font, helvetica neue, arial, sans-serif",
}));
