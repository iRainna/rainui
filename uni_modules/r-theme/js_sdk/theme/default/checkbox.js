import { computed } from "vue";
import { baseData } from "./base.js";
export const checkboxData = computed(() => ({
  "r-checkbox-size": "40rpx",
  "r-checkbox-border-color": baseData.value["r-gray-5"],
  "r-checkbox-duration": baseData.value["r-duration-fast"],
  "r-checkbox-label-margin": baseData.value["r-padding-xs"],
  "r-checkbox-label-color": baseData.value["r-text-color"],
  "r-checkbox-checked-icon-color": baseData.value["r-primary-color"],
  "r-checkbox-disabled-icon-color": baseData.value["r-gray-5"],
  "r-checkbox-disabled-label-color": baseData.value["r-text-color-3"],
  "r-checkbox-disabled-background": baseData.value["r-border-color"],
}));
