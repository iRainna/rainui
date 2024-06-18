import { computed } from "vue";
import { baseData } from "./base.js";

export const imageData = computed(() => ({
  "r-image-placeholder-text-color": baseData.value["r-text-color-2"],
  "r-image-placeholder-font-size": baseData.value["r-font-size-md"],
  "r-image-placeholder-background": baseData.value["r-background"],
  "r-image-loading-icon-size": "64rpx",
  "r-image-loading-icon-color": baseData.value["r-gray-4"],
  "r-image-error-icon-size": "64rpx",
  "r-image-error-icon-color": baseData.value["r-gray-4"],
}));
