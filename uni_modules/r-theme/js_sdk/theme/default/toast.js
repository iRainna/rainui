import { computed, ref } from "vue";
import { baseData } from "./base.js";
export const toastData = computed(() => ({
  "r-toast-max-width": "70vw",
  "r-toast-font-size": baseData.value["r-font-size-md"],
  "r-toast-text-color": baseData.value["r-white"],
  "r-toast-loading-icon-color": baseData.value["r-white"],
  "r-toast-line-height": baseData.value["r-line-height-md"],
  "r-toast-radius": baseData.value["r-radius-lg"],
  "r-toast-background": "rgba(0, 0, 0, 0.7)",
  "r-toast-icon-size": "72rpx",
  "r-toast-text-min-width": "192rpx",
  "r-toast-text-padding": `${baseData.value["r-padding-xs"]} ${baseData.value["r-padding-sm"]}`,
  "r-toast-default-padding": baseData.value["r-padding-md"],
  "r-toast-default-width": "176rpx",
  "r-toast-default-min-height": "176rpx",
  "r-toast-position-top-distance": "20vh",
  "r-toast-position-bottom-distance": "20vh",
}));
