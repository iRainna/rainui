import { baseData } from "./base";
import { computed } from "vue";

export const gridItemData = computed(() => ({
  "r-grid-item-content-padding": `${baseData.value["r-padding-md"]} ${baseData.value["r-padding-xs"]}`,
  "r-grid-item-content-background": baseData.value["r-background-2"],
  "r-grid-item-content-active-color": baseData.value["r-active-color"],
  "r-grid-item-icon-size": "56rpx",
  "r-grid-item-text-color": baseData.value["r-text-color"],
  "r-grid-item-text-font-size": baseData.value["r-font-size-sm"],
}));
