import { computed } from "vue";
import { baseData } from "./base";
export const noticeBarData = computed(() => ({
  "r-notice-bar-height": "80rpx",
  "r-notice-bar-padding": `0 ${baseData.value["r-padding-md"]}`,
  "r-notice-bar-wrapable-padding": `${baseData.value["r-padding-xs"]} ${baseData.value["r-padding-md"]}`,
  "r-notice-bar-text-color": baseData.value["r-orange-dark"],
  "r-notice-bar-font-size": baseData.value["r-font-size-md"],
  "r-notice-bar-line-height": "48rpx",
  "r-notice-bar-background": baseData.value["r-orange-light"],
  "r-notice-bar-icon-size": "32rpx",
  "r-notice-bar-icon-min-width": "48rpx",
}));
