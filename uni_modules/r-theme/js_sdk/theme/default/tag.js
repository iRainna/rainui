import { computed } from "vue";
import { baseData } from "./base.js";

export const tagData = computed(() => ({
  "r-tag-padding": `0 ${baseData.value["r-padding-base"]}`,
  "r-tag-text-color": baseData.value["r-white"],
  "r-tag-font-size": baseData.value["r-font-size-sm"],
  "r-tag-radius": "4rpx",
  "r-tag-line-height": "32rpx",
  "r-tag-medium-padding": "4rpx 12rpx",
  "r-tag-large-padding": `${baseData.value["r-padding-base"]} ${baseData.value["r-padding-xs"]}`,
  "r-tag-large-radius": baseData.value["r-radius-md"],
  "r-tag-large-font-size": baseData.value["r-font-size-md"],
  "r-tag-round-radius": baseData.value["r-radius-max"],
  "r-tag-danger-color": baseData.value["r-danger-color"],
  "r-tag-primary-color": baseData.value["r-primary-color"],
  "r-tag-success-color": baseData.value["r-success-color"],
  "r-tag-warning-color": baseData.value["r-warning-color"],
  "r-tag-default-color": baseData.value["r-gray-6"],
  "r-tag-plain-background": baseData.value["r-background-2"],
}));
