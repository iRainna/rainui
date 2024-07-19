import { computed } from "vue";
import { baseData } from "./base";
export const tabbarItemData = computed(() => ({
  "r-tabbar-item-font-size": baseData.value["r-font-size-sm"],
  "r-tabbar-item-text-color": baseData.value["r-text-color"],
  "r-tabbar-item-active-color": baseData.value["r-primary-color"],
  "r-tabbar-item-active-background": baseData.value["r-background-2"],
  "r-tabbar-item-line-height": 1,
  "r-tabbar-item-icon-size": "44rpx",
  "r-tabbar-item-icon-margin-bottom": baseData.value["r-padding-base"],
}));
