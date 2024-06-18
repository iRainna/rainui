import { computed } from "vue";
import { baseData } from "./base.js";
export const cellData = computed(() => ({
  "r-cell-font-size": baseData.value["r-font-size-md"],
  "r-cell-line-height": "48rpx",
  "r-cell-vertical-padding": "20rpx",
  "r-cell-horizontal-padding": baseData.value["r-padding-md"],
  "r-cell-text-color": baseData.value["r-text-color"],
  "r-cell-background": baseData.value["r-background-2"],
  "r-cell-border-color": baseData.value["r-border-color"],
  "r-cell-active-color": baseData.value["r-active-color"],
  "r-cell-required-color": baseData.value["r-danger-color"],
  "r-cell-label-color": baseData.value["r-text-color-2"],
  "r-cell-label-font-size": baseData.value["r-font-size-sm"],
  "r-cell-label-line-height": baseData.value["r-line-height-sm"],
  "r-cell-label-margin-top": baseData.value["r-padding-base"],
  "r-cell-value-color": baseData.value["r-text-color-2"],
  "r-cell-icon-size": "32rpx",
  "r-cell-right-icon-color": baseData.value["r-gray-6"],
  "r-cell-large-vertical-padding": baseData.value["r-padding-sm"],
  "r-cell-large-title-font-size": baseData.value["r-font-size-lg"],
  "r-cell-large-label-font-size": baseData.value["r-font-size-md"],
}));
