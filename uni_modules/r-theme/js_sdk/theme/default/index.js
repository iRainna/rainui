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
import { paginationData } from "./pagination.js";
import { dividerData } from "./divider.js";
import { fieldData } from "./field.js";
import { highlightData } from "./highlight.js";
import { skeletonData } from "./skeleton.js";
import { skeletonAvatarData } from "./skeleton-avatar.js";
import { skeletonImageData } from "./skeleton-image.js";
import { skeletonParagraphData } from "./skeleton-paragraph.js";
import { skeletonTitleData } from "./skeleton-title.js";
import { actionSheetData } from "./action-sheet.js";
import { uploaderData } from "./uploader.js";
import { dialogData } from "./dialog.js";
import { actionBarData } from "./action-bar.js";
import { actionBarIconData } from "./action-bar-icon.js";
import { actionBarButtonData } from "./action-bar-button.js";
import { sidebarData } from "./sidebar.js";
import { sidebarItemData } from "./sidebar-item.js";
import { navBarData } from "./nav-bar.js";
import { tabbarData } from "./tabbar.js";
import { tabbarItemData } from "./tabbar-item.js";
import { noticeBarData } from "./notice-bar.js";
import { popoverData } from "./popover.js";
import { textEllipsisData } from "./text-ellipsis.js";
import { stepsData } from "./steps.js";
import { stepData } from "./step.js";
import { gridItemData } from "./grid-item.js";
import { calendarData } from "./calendar.js";

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
  ...paginationData.value,
  ...dividerData.value,
  ...fieldData.value,
  ...highlightData.value,
  ...skeletonData.value,
  ...skeletonAvatarData.value,
  ...skeletonImageData.value,
  ...skeletonParagraphData.value,
  ...skeletonTitleData.value,
  ...actionSheetData.value,
  ...uploaderData.value,
  ...dialogData.value,
  ...actionBarData.value,
  ...actionBarIconData.value,
  ...actionBarButtonData.value,
  ...sidebarData.value,
  ...sidebarItemData.value,
  ...navBarData.value,
  ...tabbarData.value,
  ...tabbarItemData.value,
  ...noticeBarData.value,
  ...popoverData.value,
  ...textEllipsisData.value,
  ...stepsData.value,
  ...stepData.value,
  ...gridItemData.value,
  ...calendarData.value,
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
  "r-pagination": paginationData.value,
  "r-divider": dividerData.value,
  "r-field": fieldData.value,
  "r-highlight": highlightData.value,
  "r-skeleton": skeletonData.value,
  "r-skeleton-avatar": skeletonAvatarData.value,
  "r-skeleton-image": skeletonImageData.value,
  "r-skeleton-paragraph": skeletonParagraphData.value,
  "r-skeleton-title": skeletonTitleData.value,
  "r-action-sheet": actionSheetData.value,
  "r-uploader": uploaderData.value,
  "r-dialog": dialogData.value,
  "r-action-bar": actionBarData.value,
  "r-action-bar-icon": actionBarIconData.value,
  "r-action-bar-button": actionBarButtonData.value,
  "r-sidebar": sidebarData.value,
  "r-sidebar-item": sidebarItemData.value,
  "r-nav-bar": navBarData.value,
  "r-tabbar": tabbarData.value,
  "r-tabbar-item": tabbarItemData.value,
  "r-notice-bar": noticeBarData.value,
  "r-popover": popoverData.value,
  "r-text-ellipsis": textEllipsisData.value,
  "r-steps": stepsData.value,
  "r-step": stepData.value,
  "r-grid-item": gridItemData.value,
  "r-calendar": calendarData.value,
}));
