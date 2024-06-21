import { computed } from "vue";
import { baseData } from "./base.js";

export const cascaderData = computed(() => ({
  "r-cascader-header-height": "96rpx",
  "r-cascader-header-padding": `0 ${baseData.value["r-padding-md"]}`,
  "r-cascader-title-font-size": baseData.value["r-font-size-lg"],
  "r-cascader-title-line-height": "40rpx",
  "r-cascader-close-icon-size": "44rpx",
  "r-cascader-close-icon-color": baseData.value["r-gray-5"],
  "r-cascader-selected-icon-size": "36rpx",
  "r-cascader-tabs-height": "96rpx",
  "r-cascader-active-color": baseData.value["r-primary-color"],
  "r-cascader-options-height": "768rpx",
  "r-cascader-option-disabled-color": baseData.value["r-text-color-3"],
  "r-cascader-tab-color": baseData.value["r-text-color"],
  "r-cascader-unselected-tab-color": baseData.value["r-text-color-2"],
}));
