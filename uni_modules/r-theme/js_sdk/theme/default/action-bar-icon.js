import { computed } from "vue";
import { baseData } from "./base";

export const actionBarIconData = computed(() => ({
  "r-action-bar-icon-width": "96rpx",
  "r-action-bar-icon-height": "100%",
  "r-action-bar-icon-color": baseData.value["r-text-color"],
  "r-action-bar-icon-size": "36rpx",
  "r-action-bar-icon-font-size": baseData.value["r-font-size-xs"],
  "r-action-bar-icon-active-color": baseData.value["r-active-color"],
  "r-action-bar-icon-text-color": baseData.value["r-text-color"],
  "r-action-bar-icon-background": baseData.value["r-background-2"],
}));
