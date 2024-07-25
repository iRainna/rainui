import { computed, ref } from "vue";
import { baseData } from "./base.js";
export const searchData = computed(() => ({
  "r-search-padding": `20rpx ${baseData.value["r-padding-sm"]}`,
  "r-search-background": baseData.value["r-background-2"],
  "r-search-content-background": baseData.value["r-background"],
  "r-search-input-height": "68rpx",
  "r-search-label-padding": `0 10rpx`,
  "r-search-label-color": baseData.value["r-text-color"],
  "r-search-label-font-size": baseData.value["r-font-size-md"],
  "r-search-left-icon-color": baseData.value["r-gray-6"],
  "r-search-action-padding": `0 ${baseData.value["r-padding-xs"]}`,
  "r-search-action-text-color": baseData.value["r-text-color"],
  "r-search-action-font-size": baseData.value["r-font-size-md"],
}));
