import { computed } from "vue";
import { baseData } from "./base.js";
export const stepperData = computed(() => ({
  "r-stepper-background": baseData.value["r-active-color"],
  "r-stepper-button-icon-color": baseData.value["r-text-color"],
  "r-stepper-button-disabled-color": baseData.value["r-background"],
  "r-stepper-button-disabled-icon-color": baseData.value["r-gray-5"],
  "r-stepper-button-round-theme-color": baseData.value["r-primary-color"],
  "r-stepper-input-width": "64rpx",
  "r-stepper-input-height": "56rpx",
  "r-stepper-input-font-size": baseData.value["r-font-size-md"],
  "r-stepper-input-line-height": "normal",
  "r-stepper-input-text-color": baseData.value["r-text-color"],
  "r-stepper-input-disabled-text-color": baseData.value["r-text-color-3"],
  "r-stepper-input-disabled-background": baseData.value["r-active-color"],
  "r-stepper-radius": baseData.value["r-radius-md"],
}));
