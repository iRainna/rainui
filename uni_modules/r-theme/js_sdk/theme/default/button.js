import { computed } from "vue";
import { baseData } from "./base.js";

export const buttonData = computed(() => ({
  "r-button-mini-height": "48rpx",
  "r-button-mini-padding": `0 ${baseData.value["r-padding-base"]}`,
  "r-button-mini-font-size": baseData.value["r-font-size-xs"],
  "r-button-small-height": "64rpx",
  "r-button-small-padding": `0 ${baseData.value["r-padding-xs"]}`,
  "r-button-small-font-size": baseData.value["r-font-size-sm"],
  "r-button-normal-padding": "0 30rpx",
  "r-button-normal-font-size": baseData.value["r-font-size-md"],
  "r-button-large-height": "100rpx",
  "r-button-default-height": "88rpx",
  "r-button-default-line-height": 1.2,
  "r-button-default-font-size": baseData.value["r-font-size-lg"],

  "r-button-default-color": baseData.value["r-text-color"],
  "r-button-default-background": baseData.value["r-background-2"],
  "r-button-default-border-color": baseData.value["r-gray-4"],
  "r-button-primary-color": baseData.value["r-white"],
  "r-button-primary-background": baseData.value["r-primary-color"],
  "r-button-primary-border-color": baseData.value["r-primary-color"],
  "r-button-success-color": baseData.value["r-white"],
  "r-button-success-background": baseData.value["r-success-color"],
  "r-button-success-border-color": baseData.value["r-success-color"],
  "r-button-danger-color": baseData.value["r-white"],
  "r-button-danger-background": baseData.value["r-danger-color"],
  "r-button-danger-border-color": baseData.value["r-danger-color"],

  "r-button-warning-color": baseData.value["r-white"],
  "r-button-warning-background": baseData.value["r-warning-color"],
  "r-button-warning-border-color": baseData.value["r-warning-color"],
  "r-button-border-width": baseData.value["r-border-width"],
  "r-button-radius": baseData.value["r-radius-md"],
  "r-button-round-radius": baseData.value["r-radius-max"],
  "r-button-plain-background": baseData.value["r-white"],
  "r-button-disabled-opacity": baseData.value["r-disabled-opacity"],
  "r-button-icon-size": "1.2em",
  "r-button-loading-icon-size": "40rpx",
}));
