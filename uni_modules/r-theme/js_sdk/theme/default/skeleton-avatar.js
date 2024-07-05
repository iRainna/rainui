import { computed } from "vue";
import { baseData } from "./base.js";

export const skeletonAvatarData = computed(() => ({
  "r-skeleton-avatar-size": "64rpx",
  "r-skeleton-avatar-background": baseData.value["r-active-color"],
}));
