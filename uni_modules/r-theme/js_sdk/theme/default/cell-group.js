import { computed } from "vue";
import { baseData } from "./base.js";
export const cellGroupData = computed(() => ({
  "r-cell-group-background": baseData.value["r-background-2"],
  "r-cell-group-title-color": baseData.value["r-text-color-2"],
  "r-cell-group-title-padding": `${baseData.value["r-padding-md"]} ${baseData.value["r-padding-md"]}`,
  "r-cell-group-title-font-size": baseData.value["r-font-size-md"],
  "r-cell-group-title-line-height": "32rpx",
  "r-cell-group-inset-padding": `0 ${baseData.value["r-padding-md"]}`,
  "r-cell-group-inset-radius": baseData.value["r-radius-lg"],
  "r-cell-group-inset-title-padding": `${baseData.value["r-padding-md"]} ${baseData.value["r-padding-md"]}`,
}));
