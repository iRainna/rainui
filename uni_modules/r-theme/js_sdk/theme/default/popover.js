import { computed } from "vue";
import { baseData } from "./base.js";
export const popoverData = computed(() => ({
  "r-popover-arrow-size": "12rpx",
  "r-popover-radius": baseData.value["r-radius-lg"],
  "r-popover-action-width": "256rpx",
  "r-popover-action-height": "88rpx",
  "r-popover-action-font-size": baseData.value["r-font-size-md"],
  "r-popover-action-line-height": baseData.value["r-line-height-md"],
  "r-popover-action-icon-size": "40rpx",
  "r-popover-horizontal-action-height": "68rpx",
  "r-popover-horizontal-action-icon-size": "32rpx",
  "r-popover-light-text-color": baseData.value["r-text-color"],
  "r-popover-light-background": baseData.value["r-background-2"],
  "r-popover-light-action-disabled-text-color":
    baseData.value["r-text-color-3"],
  "r-popover-dark-text-color": baseData.value["r-white"],
  "r-popover-dark-background": "#4a4a4a",
  "r-popover-dark-action-disabled-text-color": baseData.value["r-text-color-2"],
}));
