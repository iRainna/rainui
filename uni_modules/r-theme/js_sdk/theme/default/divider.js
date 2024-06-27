import { computed } from "vue";
import { baseData } from "./base.js";
export const dividerData = computed(() => ({
  "r-divider-margin": `${baseData.value["r-padding-md"]} 0`,
  "r-divider-vertical-margin": `${baseData.value["r-padding-xs"]} 0`,
  "r-divider-text-color": baseData.value["r-text-color-2"],
  "r-divider-font-size": baseData.value["r-font-size-md"],
  "r-divider-line-height": "48rpx",
  "r-divider-border-color": baseData.value["r-border-color"],
  "r-divider-content-padding": baseData.value["r-padding-md"],
  "r-divider-content-left-width": "10%",
  "r-divider-content-right-width": "10%",
}));
