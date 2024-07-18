import { computed } from "vue";
import { baseData } from "./base.js";
export const sidebarItemData = computed(() => ({
  "r-sidebar-font-size": baseData.value["r-font-size-md"],
  "r-sidebar-line-height": baseData.value["r-line-height-md"],
  "r-sidebar-text-color": baseData.value["r-text-color"],
  "r-sidebar-disabled-text-color": baseData.value["r-text-color-3"],
  "r-sidebar-padding": `40rpx ${baseData.value["r-padding-sm"]}`,
  "r-sidebar-active-color": baseData.value["r-active-color"],
  "r-sidebar-background": baseData.value["r-background"],
  "r-sidebar-selected-font-weight": baseData.value["r-font-bold"],
  "r-sidebar-selected-text-color": baseData.value["r-text-color"],
  "r-sidebar-selected-border-width": "8rpx",
  "r-sidebar-selected-border-height": "32rpx",
  "r-sidebar-selected-border-color": baseData.value["r-primary-color"],
  "r-sidebar-selected-background": baseData.value["r-background-2"],
}));
