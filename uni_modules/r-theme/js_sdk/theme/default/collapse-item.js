import { computed } from "vue";
import { baseData } from "./base.js";

export const collapseItemData = computed(() => ({
  "r-collapse-item-duration": baseData.value["r-duration-base"],
  "r-collapse-item-content-padding": `${baseData.value["r-padding-sm"]} ${baseData.value["r-padding-md"]}`,

  "r-collapse-item-content-font-size": baseData.value["r-font-size-md"],
  "r-collapse-item-content-line-height": 1.5,
  "r-collapse-item-content-text-color": baseData.value["r-text-color-2"],
  "r-collapse-item-content-background": baseData.value["r-background-2"],
  "r-collapse-item-title-disabled-color": baseData.value["r-text-color-3"],
}));
