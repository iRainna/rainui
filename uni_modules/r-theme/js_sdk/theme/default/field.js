import { computed } from "vue";
import { baseData } from "./base.js";
export const fieldData = computed(() => ({
  "r-field-label-width": "6.2em",
  "r-field-label-color": baseData.value["r-text-color"],
  "r-field-label-margin-right": baseData.value["r-padding-sm"],
  "r-field-input-text-color": baseData.value["r-text-color"],
  "r-field-input-error-text-color": baseData.value["r-danger-color"],
  "r-field-input-disabled-text-color": baseData.value["r-text-color-3"],
  "r-field-placeholder-text-color": baseData.value["r-text-color-3"],
  "r-field-icon-size": "36rpx",
  "r-field-clear-icon-size": "36rpx",
  "r-field-clear-icon-color": baseData.value["r-gray-5"],
  "r-field-right-icon-color": baseData.value["r-gray-6"],
  "r-field-error-message-color": baseData.value["r-danger-color"],
  "r-field-error-message-font-size": "24rpx",
  "r-field-text-area-min-height": "120rpx",
  "r-field-word-limit-color": baseData.value["r-gray-7"],
  "r-field-word-limit-font-size": baseData.value["r-font-size-sm"],
  "r-field-word-limit-line-height": "32rpx",
  "r-field-disabled-text-color": baseData.value["r-text-color-3"],
  "r-field-required-mark-color": baseData.value["r-red"],
}));
