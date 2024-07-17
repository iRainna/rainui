import { computed } from "vue";
import { baseData } from "./base";

export const actionBarData = computed(() => ({
  "r-action-bar-background": baseData.value["r-background-2"],
  "r-action-bar-height": "100rpx",
}));
