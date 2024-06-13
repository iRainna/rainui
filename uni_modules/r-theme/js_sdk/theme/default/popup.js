import { computed } from "vue";
import { baseData } from "./base.js";
export const popupData = computed(() => ({
  "r-loading-text-color": baseData.value["r-text-color-2"],
  "r-loading-text-font-size": baseData.value["r-font-size-md"],
  "r-loading-spinner-color": baseData.value["r-gray-5"],

  "r-popup-background": baseData.value["r-background-2"],
  "r-popup-transition": `transform ${baseData.value["r-duration-base"]}`,
  "r-popup-round-radius": "32rpx",
  "r-popup-close-icon-size": "44rpx",
  "r-popup-close-icon-color": baseData.value["r-gray-5"],
  "r-popup-close-icon-margin": "32rpx",
  "r-popup-close-icon-z-index": 1,
}));
