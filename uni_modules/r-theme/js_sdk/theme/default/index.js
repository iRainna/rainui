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

const data = computed(() => {
  return {
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
  };
});

export { data };
