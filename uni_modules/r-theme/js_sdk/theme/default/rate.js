import { computed, ref } from "vue";
import { baseData } from "./base.js";
export const rateData = computed(() => {
  let v = {
    "r-rate-icon-size": "40rpx",
    "r-rate-icon-gutter": baseData.value["r-padding-base"],
    "r-rate-icon-void-color": baseData.value["r-gray-5"],
    "r-rate-icon-full-color": baseData.value["r-danger-color"],
    "r-rate-icon-disabled-color": baseData.value["r-gray-5"],
  };

  return v;
});
