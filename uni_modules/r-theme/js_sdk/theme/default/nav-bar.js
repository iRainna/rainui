import { computed } from "vue";
import { baseData } from "./base";

export const navBarData = computed(() => ({
  "r-nav-bar-height": "92rpx",
  "r-nav-bar-background": baseData.value["r-background-2"],
  "r-nav-bar-arrow-size": "32rpx",
  "r-nav-bar-icon-color": baseData.value["r-primary-color"],
  "r-nav-bar-text-color": baseData.value["r-primary-color"],
  "r-nav-bar-title-font-size": baseData.value["r-font-size-lg"],
  "r-nav-bar-title-text-color": baseData.value["r-text-color"],
  "r-nav-bar-z-index": 1,
  "r-nav-bar-disabled-opacity": baseData.value["r-disabled-opacity"],
}));
