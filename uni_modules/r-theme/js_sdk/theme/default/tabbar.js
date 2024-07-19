import { computed } from "vue";
import { baseData } from "./base";
export const tabbarData = computed(() => ({
  "r-tabbar-height": "100rpx",
  "r-tabbar-z-index": 1,
  "r-tabbar-background": baseData.value["r-background-2"],
}));
