import { computed } from "vue";
import { baseData } from "./base.js";
export const dialogData = computed(() => ({
  "r-dialog-width": "640rpx",
  "r-dialog-small-screen-width": "90%",
  "r-dialog-font-size": baseData.value["r-font-size-lg"],
  "r-dialog-transition": baseData.value["r-duration-base"],
  "r-dialog-radius": "32rpx",
  "r-dialog-background": baseData.value["r-background-2"],
  "r-dialog-header-font-weight": baseData.value["r-font-bold"],
  "r-dialog-header-line-height": "48rpx",
  "r-dialog-header-padding-top": "32rpx",
  "r-dialog-header-isolated-padding": `${baseData.value["r-padding-lg"]} 0`,
  "r-dialog-message-padding": baseData.value["r-padding-lg"],
  "r-dialog-message-font-size": baseData.value["r-font-size-md"],
  "r-dialog-message-line-height": baseData.value["r-line-height-md"],
  "r-dialog-message-max-height": "60vh",
  "r-dialog-has-title-message-text-color": baseData.value["r-gray-7"],
  "r-dialog-has-title-message-padding-top": baseData.value["r-padding-xs"],
  "r-dialog-button-height": "96rpx",
  "r-dialog-round-button-height": "72rpx",
  "r-dialog-confirm-button-text-color": baseData.value["r-primary-color"],
}));
