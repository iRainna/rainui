import { computed } from "vue";
import { baseData } from "./base.js";
export const paginationData = computed(() => ({
  "r-pagination-height": "80rpx",
  "r-pagination-font-size": baseData.value["r-font-size-md"],
  "r-pagination-item-width": "72rpx",
  "r-pagination-item-default-color": baseData.value["r-primary-color"],
  "r-pagination-item-disabled-color": baseData.value["r-gray-7"],
  "r-pagination-item-disabled-background": baseData.value["r-background"],
  "r-pagination-background": baseData.value["r-background-2"],
  "r-pagination-desc-color": baseData.value["r-gray-7"],
  "r-pagination-disabled-opacity": baseData.value["r-disabled-opacity"],
}));
