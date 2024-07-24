import { computed } from "vue";
import { baseData } from "./base";
export const textEllipsisData = computed(() => ({
  "r-text-ellipsis-line-height": 1.6,
  "r-text-ellipsis-action-color": baseData.value["r-blue"],
}));
