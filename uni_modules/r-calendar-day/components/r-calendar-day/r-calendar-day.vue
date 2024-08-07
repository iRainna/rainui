<template>
  <view
    v-if="item.type === 'placeholder'"
    :class="{
      'r-calendar__day': true,
    }"
    :style="{ ...getComponentThemeStyle, ...itemStyle }"
  ></view>
  <view
    v-else
    :class="{
      'r-calendar__day': true,
      [`r-calendar__day--${item.type}`]: true,
    }"
    :style="{ ...getComponentThemeStyle, ...itemStyle }"
    @click="onClick"
  >
    <!-- renderContent -->
    <view
      v-if="item && item.type == 'selected'"
      :class="{
        'r-calendar__selected-day': true,
      }"
      :style="{
        width: isNumeric(rowHeight) ? rowHeight + 'px' : rowHeight,
        height: isNumeric(rowHeight) ? rowHeight + 'px' : rowHeight,
        background: color,
      }"
    >
      <!-- renderTopInfo -->
      <view
        v-if="item.topInfo"
        :class="{
          'r-calendar__top-info': true,
        }"
      >
        {{ item.topInfo }}
      </view>

      <!-- text -->
      <text>{{ item.text }}</text>
      <!-- renderBottomInfo -->

      <view
        v-if="item.bottomInfo"
        :class="{
          'r-calendar__bottom-info': true,
        }"
      >
        {{ item.bottomInfo }}
      </view>
    </view>
    <template v-else>
      <!-- renderTopInfo -->
      <view
        v-if="item.topInfo"
        :class="{
          'r-calendar__top-info': true,
        }"
      >
        {{ item.topInfo }}
      </view>

      <!-- text -->
      <text>{{ item.text }}</text>
      <!-- renderBottomInfo -->

      <view
        v-if="item.bottomInfo"
        :class="{
          'r-calendar__bottom-info': true,
        }"
      >
        {{ item.bottomInfo }}
      </view>
    </template>
  </view>
</template>
<script setup>
import { computed, inject } from "vue";
import {
  CONFIG_PROVIDER_KEY,
  isNumeric,
  dayjs,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({
  index: {
    type: Number,
    default: -1,
  },
  item: {
    type: Object,
    default: () => {},
  },
  color: {
    type: String,
    default: "#1989fa",
  },
  offset: {
    type: Number,
    default: 0,
  },
  rowHeight: {
    type: [Number, String],
    default: 64,
  },
  themeName: {
    type: String,
    default: "default",
  },
  parentWidth: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["click", "clickDisabledDate"]);

const componentsName = "r-calendar";
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

const itemStyle = computed(() => {
  const cssVar = {};
  const { item, index, color, offset, rowHeight, parentWidth } = props;

  cssVar.opacity = parentWidth ? 1 : 0;
  cssVar.height = isNumeric(rowHeight) ? rowHeight + "px" : rowHeight;
  cssVar.width = `${parentWidth / 7}px`;
  if (item.type === "placeholder") {
    cssVar.width = `${parentWidth}px`;
    return cssVar;
  }
  if (index === 0) {
    cssVar.marginLeft = `${(parentWidth * offset) / 7}px`;
  }
  if (color) {
    switch (item.type) {
      case "end":
      case "start":
      case "start-end":
      case "multiple-middle":
      case "multiple-selected":
        cssVar.background = color;
        break;
      case "middle":
        cssVar.color = color;
        break;
    }
  }
  if (offset + dayjs(item.date).date() > 28) {
    cssVar.marginBottom = 0;
  }
  return cssVar;
});

const onClick = () => {
  if (props.item.type !== "disabled") {
    emit("click", props.item);
  } else {
    emit("clickDisabledDate", props.item);
  }
};
</script>
<style lang="scss" scoped>
.r-calendar {
  &__day,
  &__selected-day {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__day {
    position: relative;
    // width: 14.285%;
    height: var(--r-calendar-day-height);
    font-size: var(--r-calendar-day-font-size);
    margin-bottom: var(--r-calendar-day-margin-bottom);
    cursor: pointer;

    &--end,
    &--start,
    &--start-end,
    &--multiple-middle,
    &--multiple-selected {
      color: var(--r-calendar-range-edge-color);
      background: var(--r-calendar-range-edge-background);
    }

    &--start {
      border-radius: var(--r-radius-md) 0 0 var(--r-radius-md);
    }

    &--end {
      border-radius: 0 var(--r-radius-md) var(--r-radius-md) 0;
    }

    &--start-end,
    &--multiple-selected {
      border-radius: var(--r-radius-md);
    }

    &--middle {
      color: var(--r-calendar-range-middle-color);

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: currentColor;
        opacity: var(--r-calendar-range-middle-background-opacity);
        content: "";
      }
    }

    &--disabled {
      color: var(--r-calendar-day-disabled-color);
      cursor: default;
    }
  }

  &__top-info,
  &__bottom-info {
    position: absolute;
    right: 0;
    left: 0;
    font-size: var(--r-calendar-info-font-size);
    line-height: var(--r-calendar-info-line-height);

    @media (max-width: 350px) {
      font-size: 9px;
    }
  }

  &__top-info {
    top: 6px;
  }

  &__bottom-info {
    bottom: 6px;
  }

  &__selected-day {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__selected-day {
    width: var(--r-calendar-selected-day-size);
    height: var(--r-calendar-selected-day-size);
    color: var(--r-calendar-selected-day-color);
    background: var(--r-calendar-selected-day-background);
    border-radius: var(--r-radius-md);
  }
}
</style>
