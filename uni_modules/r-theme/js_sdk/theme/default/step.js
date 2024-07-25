import { computed } from "vue";
import { baseData } from "./base";

export const stepData = computed(() => ({
  "r-step-text-color": baseData.value["r-text-color-2"],
  "r-step-active-color": baseData.value["r-primary-color"],
  "r-step-process-text-color": baseData.value["r-text-color"],
  "r-step-font-size": baseData.value["r-font-size-md"],
  "r-step-line-color": baseData.value["r-border-color"],
  "r-step-finish-line-color": baseData.value["r-primary-color"],
  "r-step-finish-text-color": baseData.value["r-text-color"],
  "r-step-icon-size": "12px",
  "r-step-circle-size": "5px",
  "r-step-circle-color": baseData.value["r-gray-6"],
  "r-step-horizontal-title-font-size": baseData.value["r-font-size-sm"],
}));
