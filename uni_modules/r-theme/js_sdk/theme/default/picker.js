import { computed } from "vue";
import { baseData } from "./base.js";
export const pickerData = computed(() => ({
  "r-picker-background": baseData.value["r-background-2"],
  "r-picker-toolbar-height": "44px",
  "r-picker-title-font-size": baseData.value["r-font-size-lg"],
  "r-picker-title-line-height": baseData.value["r-line-height-md"],
  "r-picker-action-padding": `0 ${baseData.value["r-padding-md"]}`,
  "r-picker-action-font-size": baseData.value["r-font-size-md"],
  "r-picker-confirm-action-color": baseData.value["r-primary-color"],
  "r-picker-cancel-action-color": baseData.value["r-text-color-2"],
  "r-picker-option-font-size": baseData.value["r-font-size-lg"],
  "r-picker-option-padding": `0 ${baseData.value["r-padding-base"]}`,
  "r-picker-option-text-color": baseData.value["r-text-color"],
  "r-picker-option-disabled-opacity": "0.3",
  "r-picker-loading-icon-color": baseData.value["r-primary-color"],
  "r-picker-loading-mask-color": `rgba(255, 255, 255, 0.9)`,
  "r-picker-mask-color": `linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.4)
    ),
    linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4))`,
}));
