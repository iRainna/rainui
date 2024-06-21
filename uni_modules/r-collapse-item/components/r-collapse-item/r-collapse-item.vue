<template>
  <view
    :class="{
      'r-collapse-item': true,
      'r-collapse-item--border': index && border,
    }"
    :style="getThemeCssVar(themeName)"
  >
    <!-- renderTitle -->
    <r-cell
      :class="{
        'r-collapse-item__title': true,
        'r-collapse-item__title--disabled': disabled,
        'r-collapse-item__title--expanded': expanded,
        'r-collapse-item__title--borderless': !border,
      }"
      :customClass="`r-collapse-item__title ${
        disabled ? 'r-collapse-item__title--disabled' : ''
      } ${expanded ? 'r-collapse-item__title--expanded' : ''}
      ${!border ? 'r-collapse-item__title--borderless' : ''}
      `"
      :name="name"
      :icon="icon"
      :size="size"
      :title="title"
      :value="value"
      :label="label"
      :border="border"
      :isLink="isLink"
      :disabled="disabled"
      :readonly="readonly"
      :titleClass="titleClass"
      :valueClass="valueClass"
      :labelClass="labelClass"
      :rightIconCustomStyle="getRightIconCustomStyle"
      @click="onClickTitle"
    >
      <slot v-if="$slots.icon" name="icon" />
      <slot v-if="$slots.title" name="title" />
      <slot v-if="$slots.value" name="value" />
      <slot v-if="$slots.label" name="label" />
      <slot v-if="$slots.rightIcon" name="rightIcon" />
    </r-cell>
    <!-- renderContent -->
    <!-- v-show="expanded" -->
    <view
      :class="{
        'r-collapse-item__wrapper': true,
      }"
      :style="contentStyle"
    >
      <view
        :class="{
          'r-collapse-item__content': true,
        }"
      >
        <slot v-if="$slots.default"></slot>
      </view>
    </view>
  </view>
</template>
<script setup>
	import RCell from "@/uni_modules/r-cell/components/r-cell/r-cell.vue"
import {
  _,
  COLLAPSE_KEY,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import {
  computed,
  inject,
  getCurrentInstance,
  watch,
  onMounted,
  ref,
} from "vue";
import CollapseItemProps from "./props.js";
// import Cell from "../cell/index.vue";

import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";

const { proxy } = getCurrentInstance();
const props = defineProps(CollapseItemProps);
const { uniqueId, findIndex } = _;

const id = uniqueId("collapse-item-");

const parent = inject(COLLAPSE_KEY);

const index = computed(() => {
  return findIndex(parent.children.value, (i) => i.id == id);
});

const itemRect = ref({});
const contentStyle = computed(() => {
  let css = {};
  if (expanded.value) {
    css = {
      height: itemRect.value.height + "px",
      transition:
        "height 400ms ease-in-out 0ms, -webkit-transform 400ms ease-in-out 0ms, transform 400ms ease-in-out 0ms",
      transformOrigin: "50% 50% 0px",
    };
  } else {
    css = {
      height: "0px",
      transition:
        "height 400ms ease-in-out 0ms, -webkit-transform 400ms ease-in-out 0ms, transform 400ms ease-in-out 0ms",
      transformOrigin: "50% 50% 0px",
    };
  }
  return css;
});

const name = computed(() => props.name || index.value);
const expanded = computed(() => parent.isExpanded(name.value));

const getRightIconCustomStyle = computed(() => {
  const cssVar = {
    transform: "rotate(90deg) translateZ(0)",
    transition: "transform var(--r-collapse-item-duration)",
  };
  if (props.disabled) {
    cssVar.color = "var(--r-collapse-item-title-disabled-color)";
  }
  if (expanded.value) {
    cssVar.transform = "rotate(-90deg)";
  }
  return cssVar;
});
const onClickTitle = () => {
  if (!props.disabled && !props.readonly) {
    toggle();
  }
};

const toggle = (newValue = !expanded.value) => {
  getItemRect();
  parent.toggle(name.value, newValue);
};
const getItemRect = async () => {
  itemRect.value = await GetRect(".r-collapse-item__content", proxy);
};
onMounted(async () => {
  getItemRect();
  parent.setChildren({
    ...props,
    id,
    expanded,
    getItemRect,
    itemName: name,
    index,
  });
});
</script>
<style lang="scss" scoped>
@mixin hairline-common {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
}
@mixin hairline-top($color: var(--van-border-color), $left: 0, $right: 0) {
  @include hairline-common;
  top: 0;
  right: $right;
  left: $left;
  border-top: 1px solid $color;
  transform: scaleY(0.5);
}
.r-collapse-item {
  position: relative;

  &--border {
    &::after {
      @include hairline-top(
        var(--r-border-color),
        var(--r-padding-md),
        var(--r-padding-md)
      );
    }
  }

  &__title {
    .r-cell__right-icon::before {
      // using translateZ to fix safari rendering issues
      // see: https://github.com/vant-ui/vant/issues/8608
      transform: rotate(90deg) translateZ(0);
      transition: transform var(--r-collapse-item-duration);
    }

    &::after {
      right: var(--r-padding-md);
      display: none;
    }

    &--expanded {
      .r-cell__right-icon::before {
        transform: rotate(-90deg);
      }

      &::after {
        display: block;
      }
    }

    &--borderless {
      &::after {
        display: none;
      }
    }

    &--disabled {
      cursor: not-allowed;

      &,
      & .r-cell__right-icon {
        color: var(--r-collapse-item-title-disabled-color);
      }
    }
  }

  &__wrapper {
    overflow: hidden;
    transition: height var(--r-collapse-item-duration) ease-in-out;
    will-change: height;
  }

  &__content {
    padding: var(--r-collapse-item-content-padding);
    color: var(--r-collapse-item-content-text-color);
    font-size: var(--r-collapse-item-content-font-size);
    line-height: var(--r-collapse-item-content-line-height);
    background: var(--r-collapse-item-content-background);
  }
}
</style>
