<template>
  <view
    v-if="$slots.default"
    :class="{
      'r-badge': false,
      'r-badge__wrapper': true,
    }"
    :style="getThemeCssVar(themeName)"
  >
    <slot v-if="$slots.default"></slot>

    <!-- renderBadge -->
    <view
      v-if="dot || hasContent"
      :class="{
        'r-badge': true,
        [`r-badge--${position}`]: true,
        'r-badge--dot': dot,
        'r-badge--fixed': !!slots.default,
      }"
      :style="styleComp"
    >
      <!-- renderContent -->
      <view v-if="!dot && hasContent">
        <slot v-if="$slots.content" name="content"></slot>
        <text v-else-if="isDef(max) && isNumeric(content) && +content > +max">
          {{ max }}+
        </text>
        <text v-else>{{ content }}</text>
      </view>
    </view>
  </view>
  <!-- renderBadge -->
  <view
    v-else-if="dot || hasContent"
    :class="{
      'r-badge': true,
      [`r-badge--${position}`]: true,
      'r-badge--dot': dot,
      'r-badge--fixed': !!slots.default,
    }"
    :style="{
      ...getThemeCssVar(themeName),
      ...styleComp,
    }"
  >
    <!-- renderContent -->
    <text v-if="!dot && hasContent">
      <slot v-if="$slots.content" name="content"></slot>
      <text v-else-if="isDef(max) && isNumeric(content) && +content > +max">
        {{ max }}+
      </text>
      <text v-else>{{ content }}</text>
    </text>
  </view>
</template>

<script setup>
import { computed, useSlots, defineProps } from "vue";
import BadgeProps from "./props.js";
import { isDef, isNumeric } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";

const props = defineProps(BadgeProps);
const slots = useSlots();
const hasContent = computed(() => {
  if (slots.content) {
    return true;
  }
  const { content, showZero } = props;
  return (
    isDef(content) &&
    content !== "" &&
    (showZero || (content !== 0 && content !== "0"))
  );
});
const getOffsetWithMinusString = (val) =>
  val.startsWith("-") ? val.replace("-", "") : `-${val}`;

const styleComp = computed(() => {
  const style = {
    background: props.color,
  };

  if (props.offset) {
    const [x, y] = props.offset;
    const { position } = props;
    const [offsetY, offsetX] = position.split("-");

    if (slots.default) {
      if (typeof y === "number") {
        style[offsetY] = offsetY === "top" ? y : -y;
      } else {
        style[offsetY] = offsetY === "top" ? y : getOffsetWithMinusString(y);
      }

      if (typeof x === "number") {
        style[offsetX] = offsetX === "left" ? x : -x;
      } else {
        style[offsetX] = offsetX === "left" ? x : getOffsetWithMinusString(x);
      }
    } else {
      style.marginTop = y;
      style.marginLeft = x;
    }
  }

  return style;
});
</script>
<style lang="scss" scoped>
.r-badge {
  display: inline-block;
  box-sizing: border-box;
  min-width: var(--r-badge-size);
  padding: var(--r-badge-padding);
  color: var(--r-badge-color);
  font-weight: var(--r-badge-font-weight);
  font-size: var(--r-badge-font-size);
  font-family: var(--r-badge-font);
  line-height: 1.2;
  text-align: center;
  background: var(--r-badge-background);
  border: var(--r-badge-border-width) solid var(--r-background-2);
  border-radius: var(--r-radius-max);

  &--fixed {
    position: absolute;
    transform-origin: 100%;
  }

  &--top-left {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  &--top-right {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  &--bottom-left {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }

  &--bottom-right {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }

  &--dot {
    width: var(--r-badge-dot-size);
    min-width: 0;
    height: var(--r-badge-dot-size);
    background: var(--r-badge-dot-color);
    border-radius: 100%;
    border: none;
    padding: 0;
  }

  &__wrapper {
    position: relative;
    display: inline-block;
  }
}
</style>
