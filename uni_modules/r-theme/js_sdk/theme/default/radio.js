import { computed } from "vue";
import { baseData } from "./base.js";
export const radioData = computed(() => ({
  "r-radio-size": "40rpx",
  "r-radio-dot-size": "16rpx",
  "r-radio-border-color": baseData.value["r-gray-5"],
  "r-radio-duration": baseData.value["r-duration-fast"],
  "r-radio-label-margin": baseData.value["r-padding-xs"],
  "r-radio-label-color": baseData.value["r-text-color"],
  "r-radio-checked-icon-color": baseData.value["r-primary-color"],
  "r-radio-disabled-icon-color": baseData.value["r-gray-5"],
  "r-radio-disabled-label-color": baseData.value["r-text-color-3"],
  "r-radio-disabled-background": baseData.value["r-border-color"],
}));
