import { computed } from "vue";
import { baseData } from "./base";
export const actionBarButtonData = computed(() => ({
  "r-action-bar-button-height": "80rpx",
  "r-action-bar-button-warning-color": baseData.value["r-gradient-orange"],
  "r-action-bar-button-danger-color": baseData.value["r-gradient-red"],
}));
