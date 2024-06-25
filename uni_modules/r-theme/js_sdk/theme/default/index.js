import { computed } from "vue";
import { baseData } from "./base.js";
import { overlayData } from "./overlay.js";
import { rateData } from "./rate.js";
import { loadingData } from "./loading.js";
import { popupData } from "./popup.js";
import { stepperData } from "./stepper.js";
import { badgeData } from "./badge.js";
import { buttonData } from "./button.js";
import { cellData } from "./cell.js";
import { cellGroupData } from "./cell-group.js";
import { switchData } from "./switch.js";
import { imageData } from "./image.js";
import { radioData } from "./radio.js";
import { checkboxData } from "./checkbox.js";
import { tabsData } from "./tabs.js";
import { collapseItemData } from "./collapse-item.js";
import { cascaderData } from "./cascader.js";
import { toastData } from "./toast.js";
import { tagData } from "./tag.js";
import { pickerData } from "./picker.js";

export const data = computed(() => ({
  ...baseData.value,
  ...overlayData.value,
  ...rateData.value,
  ...loadingData.value,
  ...popupData.value,
  ...stepperData.value,
  ...badgeData.value,
  ...buttonData.value,
  ...cellData.value,
  ...cellGroupData.value,
  ...switchData.value,
  ...imageData.value,
  ...radioData.value,
  ...checkboxData.value,
  ...tabsData.value,
  ...collapseItemData.value,
  ...cascaderData.value,
  ...toastData.value,
  ...tagData.value,
  ...pickerData.value,
}));

export const moduleData = computed(() => ({
  "r-base": baseData.value,
  "r-overlay": overlayData.value,
  "r-rate": rateData.value,
  "r-loading": loadingData.value,
  "r-popup": popupData.value,
  "r-stepper": stepperData.value,
  "r-badge": badgeData.value,
  "r-button": buttonData.value,
  "r-cell": cellData.value,
  "r-cell-group": cellGroupData.value,
  "r-switch": switchData.value,
  "r-image": imageData.value,
  "r-radio": radioData.value,
  "r-checkbox": checkboxData.value,
  "r-tabs": tabsData.value,
  "r-collapse-item": collapseItemData.value,
  "r-cascader": cascaderData.value,
  "r-toast": toastData.value,
  "r-tag": tagData.value,
  "r-picker": pickerData.value,
}));
