import { computed } from "vue";
import { baseData } from "./base.js";
export const tabsData = computed(() => ({
  "r-tab-text-color": baseData.value["r-gray-7"],
  "r-tab-active-text-color": baseData.value["r-text-color"],
  "r-tab-disabled-text-color": baseData.value["r-text-color-3"],
  "r-tab-font-size": baseData.value["r-font-size-md"],
  "r-tab-line-height": baseData.value["r-line-height-md"],
  "r-tabs-default-color": baseData.value["r-primary-color"],
  "r-tabs-line-height": "88rpx",
  "r-tabs-card-height": "60rpx",
  "r-tabs-nav-background": baseData.value["r-background-2"],
  "r-tabs-bottom-bar-width": "80rpx",
  "r-tabs-bottom-bar-height": "6rpx",
  "r-tabs-bottom-bar-color": baseData.value["r-primary-color"],
}));
