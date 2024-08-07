<template>
  <view
    :class="{
      'r-step': true,
      [`${componentsId}`]: true,
      [`r-step--${parentProps.direction}`]: true,
      [`${getStatus}`]: true,
    }"
    :style="{
      ...getComponentThemeStyle,
      ...getItemStyle,
    }"
  >
    <view
      :class="{
        'r-step__title': true,
        'r-step__title--active': isActive,
      }"
      :style="titleStyle"
      @click="onClickStep"
    >
      <slot></slot>
    </view>

    <view
      :class="{
        'r-step__circle-container': true,
      }"
      @click="onClickStep"
    >
      <!-- renderCircle -->
      <template v-if="isActive">
        <slot name="activeIcon" v-if="!!$slots.activeIcon"></slot>
        <view
          v-else
          :class="{
            'r-step__icon': true,
            'r-step__icon--active': true,
          }"
        >
          <r-icon
            :name="parentProps.activeIcon"
            :color="parentProps.activeColor"
            size="inherit"
            :prefix="parentProps.iconPrefix"
          ></r-icon>
        </view>
      </template>
      <template
        v-else-if="
          getStatus === 'finish' &&
          ((parentProps && parentProps.finishIcon) || !!$slots.finishIcon)
        "
      >
        <slot name="finishIcon" v-if="!!$slots.finishIcon"></slot>
        <view
          v-else-if="parentProps && parentProps.finishIcon"
          :class="{
            'r-step__icon': true,
            'r-step__icon--finish': true,
          }"
        >
          <r-icon
            :name="parentProps.finishIcon"
            :color="parentProps.activeColor"
            size="inherit"
            :prefix="parentProps.iconPrefix"
          ></r-icon>
        </view>
      </template>
      <slot v-else-if="!!$slots.inactiveIcon" name="inactiveIcon"></slot>
      <view
        v-else-if="parentProps.inactiveIcon"
        :class="{
          'r-step__icon': true,
        }"
      >
        <r-icon
          :name="parentProps.inactiveIcon"
          color="inherit"
          size="inherit"
          :prefix="parentProps.iconPrefix"
        ></r-icon>
      </view>
      <view
        v-else
        :class="{
          'r-step__circle': true,
        }"
        :style="circleStyle"
      ></view>
    </view>
    <view
      :class="{
        'r-step__line': true,
      }"
      :style="lineStyle"
    ></view>
  </view>
</template>

<script setup>
import {
  computed,
  inject,
  ref,
  onMounted,
  nextTick,
  getCurrentInstance,
} from "vue";
import {
  CONFIG_PROVIDER_KEY,
  STEPS_KEY,
  _,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { proxy } = getCurrentInstance();

const { uniqueId, findIndex } = _;
const parentInject = inject(STEPS_KEY, {});
const parentProps = computed(() => parentInject.props);

const componentsId = ref("");
const componentsName = "r-step";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = parentProps.value.themeName;

  if (themeInject?.value?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.value?.themeName;
  }

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  };
});

const index = computed(() => {
  let list = [];
  if (parentInject?.children?.value?.length) {
    list = parentInject?.children?.value;
  }
  return findIndex(list, (t) => t.id == componentsId.value);
});

const getStatus = computed(() => {
  const active = parentProps.value.active;
  if (index.value < active) {
    return "finish";
  }
  return index.value === active ? "process" : "waiting";
});
const isActive = computed(() => getStatus.value === "process");
const circleRect = ref(null);
const iconRect = ref(null);
const titleRect = ref(null);
const titleStyle = computed(() => {
  const cssVar = {};

  if (isActive.value) {
    cssVar.color = parentProps.value.activeColor;
  }
  if (getStatus.value === "waiting") {
    cssVar.color = parentProps.value.inactiveColor;
  }
  if (parentProps.value.direction === "horizontal") {
    const length = parentInject?.children?.value?.length || 0;
    const circleWidth = circleRect?.value?.width || 0;
    const iconRectWidth = iconRect?.value?.width || 0;
    if (index.value != 0 && index.value + 1 != length) {
      cssVar.transform = "translateX(-50%)";
      cssVar.marginLeft = (circleWidth + iconRectWidth) / 2 + "px";
    } else if (index.value + 1 == length) {
      // #ifdef MP
      cssVar.transform = "translateX(-100%)";
      // #endif

      cssVar["white-space"] = "nowrap";
      cssVar.marginLeft = circleWidth + iconRectWidth + "px";
    }
  }

  return cssVar;
});

const circleStyle = computed(() => {
  const cssVar = {};

  cssVar.background =
    getStatus.value === "finish"
      ? parentProps.value.activeColor
      : parentProps.value.inactiveColor;

  return cssVar;
});

const lineStyle = computed(() => {
  const cssVar = {};
  const circleWidth = circleRect?.value?.width || 0;
  const iconWidth = iconRect?.value?.width || 0;
  const length = parentInject?.children?.value?.length || 0;

  if (parentProps.value.direction == "horizontal") {
    const width = parentInject?.stepsRect?.value?.width || 0;

    cssVar.width =
      index.value + 1 == length
        ? 0
        : (width - (circleWidth + iconWidth) / 2) / (length - 1) -
          (circleWidth + iconWidth) / 2 +
          "px";
  } else {
    const height = titleRect?.value?.height || 0;

    cssVar.top = 28 + "px";
    cssVar.left = "-15px";
    cssVar.width = "1px";
    cssVar.height = index.value + 1 == length ? 0 : height + "px";
  }

  cssVar.background =
    getStatus.value === "finish"
      ? parentProps.value.activeColor
      : parentProps.value.inactiveColor;

  return cssVar;
});

const getItemStyle = computed(() => {
  const cssVar = {};

  const width = parentInject?.stepsRect?.value?.width || 0;
  const length = parentInject?.children?.value?.length || 0;

  if (parentProps.value.direction == "horizontal") {
    const circleWidth = circleRect?.value?.width || 0;
    const iconWidth = iconRect?.value?.width || 0;
    if (length == 1) {
      cssVar.width = width - circleWidth - iconWidth + "px";
    } else if (length > 1) {
      cssVar.width =
        index.value + 1 != length
          ? (width - circleWidth - iconWidth) / (length - 1) + "px"
          : "auto";
    }
  } else {
    cssVar.width = width - 10 + "px";

    cssVar.borderBottom =
      index.value + 1 == length ? 0 : `1px solid var(--r-border-color)`;
  }

  return cssVar;
});
const onClickStep = () => parentInject.onClickStep(index.value);
onMounted(async () => {
  componentsId.value = uniqueId(componentsName + "-");

  parentInject.setChildren({
    id: componentsId.value,
  });
  try {
    circleRect.value = await GetRect(".r-step__circle", proxy);
  } catch (error) {
    circleRect.value = {};
  }
  try {
    iconRect.value = await GetRect(".r-step__icon", proxy);
  } catch (error) {
    iconRect.value = {};
  }
  await nextTick();

  try {
    titleRect.value = await GetRect(".r-step__title", proxy);
  } catch (error) {
    titleRect.value = {};
  }
});
</script>
<style lang="scss" scoped>
.r-step {
  position: relative;
  flex: 1;
  color: var(--r-step-text-color);
  font-size: var(--r-step-font-size);

  &__circle {
    display: block;
    width: var(--r-step-circle-size);
    height: var(--r-step-circle-size);
    background-color: var(--r-step-circle-color);
    border-radius: 50%;
  }

  &__line {
    position: absolute;
    background-color: var(--r-step-line-color);
    transition: background-color var(--r-duration-base);
  }

  &--horizontal {
    float: left;

    &:first-child {
      .r-step__title {
        margin-left: 0;
        transform: none;
      }
    }

    &:last-child:not(:first-child) {
      position: absolute;
      right: 1px;
      width: auto;

      .r-step__title {
        margin-left: 0;
        transform: none;
      }

      .r-step__circle-container {
        right: -9px;
        left: auto;
      }
    }

    .r-step__circle-container {
      position: absolute;
      top: 30px;
      left: calc(var(--r-padding-xs) * -1);
      z-index: 1;
      padding: 0 var(--r-padding-xs);
      background-color: var(--r-background-2);
      transform: translateY(-50%);
    }

    .r-step__title {
      display: inline-block;
      margin-left: 3px;
      font-size: var(--r-step-horizontal-title-font-size);
      transform: translateX(-50%);
    }

    .r-step__line {
      top: 30px;
      left: 0;
      width: 100%;
      height: 1px;
    }

    .r-step__icon {
      display: block;
      font-size: var(--r-step-icon-size);
    }

    .r-step--process {
      color: var(--r-step-process-text-color);
    }
  }

  &--vertical {
    display: block;
    float: none;
    padding: 10px 10px 10px 0;
    line-height: var(--r-line-height-sm);

    &:not(:last-child)::after {
      border-bottom-width: 1px;
    }

    .r-step__circle-container {
      position: absolute;
      top: 19px;
      left: -15px;
      z-index: 1;
      font-size: var(--r-step-icon-size);
      line-height: 1;
      transform: translate(-50%, -50%);
    }

    .r-step__line {
      top: 16px;
      left: -15px;
      width: 1px;
      height: 100%;
    }
  }

  &:last-child {
    .r-step__line {
      width: 0;
    }
  }

  &--finish {
    color: var(--r-step-finish-text-color);

    .r-step__circle,
    .r-step__line {
      background-color: var(--r-step-finish-line-color);
    }
  }

  &__icon,
  &__title {
    transition: color var(--r-duration-base);

    &--active,
    &--finish {
      color: var(--r-step-active-color);
    }
  }
}
</style>
