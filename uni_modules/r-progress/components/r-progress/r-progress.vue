<template>
  <view
    :class="{
      'r-progress': true,
    }"
    :style="{
      ...getComponentThemeStyle,
      ...rootStyle,
    }"
  >
    <text
      :class="{
        'r-progress__portion': true,
        'r-progress__portion--inactive': inactive,
      }"
      :style="portionStyle"
    ></text>

    <!-- renderPivot -->
    <text
      :class="{
        'r-progress__pivot': true,
        'r-progress__pivot--inactive': inactive,
      }"
      :style="pivotStyle"
      v-if="showPivot && (pivotText || `${percentage}%`)"
    >
      {{ pivotText || `${percentage}%` }}
    </text>
  </view>
</template>
<script setup>
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import {
  CONFIG_PROVIDER_KEY,
  isNumeric,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { inject, computed } from "vue";
const props = defineProps({
  percentage: {
    type: [Number, String],
    default: 0,
  },
  strokeWidth: {
    type: [Number, String],
    default: 4,
  },
  color: {
    type: [String],
    default: "#1989fa",
  },
  trackColor: {
    type: [String],
    default: "#e5e5e5",
  },
  pivotText: {
    type: [String],
  },
  pivotColor: {
    type: String,
  },
  textColor: {
    type: String,
    default: "#fff",
  },
  inactive: {
    type: Boolean,
    default: false,
  },
  showPivot: {
    type: Boolean,
    default: true,
  },
});
const componentsName = "r-progress";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (themeInject?.value?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.value?.themeName;
  }
  if (props.themeName != "default") {
    //单独设置了组件的 就用单独设置的
    themeName = props.themeName;
  }

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  };
});

const background = computed(() => (props.inactive ? undefined : props.color));
const rootStyle = computed(() => ({
  background: props.trackColor,
  height: isNumeric(props.strokeWidth)
    ? props.strokeWidth + "px"
    : props.strokeWidth,
}));

const portionStyle = computed(() => ({
  width: `${props.percentage}%`,
  background: background.value,
}));

const pivotStyle = computed(() => ({
  color: props.textColor,
  left: `${+props.percentage}%`,
  transform: `translate(-${+props.percentage}%,-50%)`,
  background: props.pivotColor || background.value,
}));
</script>
<style lang="scss" scoped>
.r-progress {
  position: relative;
  height: var(--r-progress-height);
  background: var(--r-progress-background);
  border-radius: var(--r-progress-height);

  &__portion {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--r-progress-color);
    border-radius: inherit;
    transform-origin: 0;
    transition: all var(--r-duration-base) var(--r-ease-out);

    &--inactive {
      background: var(--r-progress-inactive-color);
    }
  }

  &__pivot {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    min-width: 3.6em;
    padding: var(--r-progress-pivot-padding);
    color: var(--r-progress-pivot-text-color);
    font-size: var(--r-progress-pivot-font-size);
    line-height: var(--r-progress-pivot-line-height);
    text-align: center;
    word-break: keep-all;
    background: var(--r-progress-pivot-background);
    border-radius: 1em;
    transition: all var(--r-duration-base) var(--r-ease-out);

    &--inactive {
      background: var(--r-progress-inactive-color);
    }
  }
}
</style>
