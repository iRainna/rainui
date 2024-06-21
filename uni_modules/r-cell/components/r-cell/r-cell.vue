<template>
  <view
    @click="clickHandler"
    :class="{
      'r-cell': true,
      'r-cell--large': size == 'large',
      'r-cell--clickable': clickable,
      'r-cell--center': center,
      'r-cell--required': required,
      'r-cell--borderless': !border,
      [customClass]: customClass,
    }"
    :hoverClass="clickable ? hoverClass : ''"
    :style="getThemeCssVar(themeName)"
  >
    <!-- left icon -->
    <slot name="icon" v-if="$slots.icon" />
    <r-icon
      v-if="icon && !$slots.icon"
      :name="icon"
      class="r-cell__left-icon"
      customClass="r-cell__left-icon"
      :prefix="iconPrefix"
    ></r-icon>
    <!-- title -->
    <view
      v-if="$slots.title || title"
      :class="`r-cell__title ${titleClass || ''}`"
      :style="titleStyle"
    >
      <slot v-if="$slots.title" name="title" />
      <text v-else="!$slots.title && title">{{ title }}</text>
      <view v-if="$slots.label" :class="`r-cell__label ${labelClass || ''}`">
        <slot name="label"></slot>
      </view>
      <view v-else-if="label" :class="`r-cell__label ${labelClass || ''}`">
        {{ label }}</view
      >
    </view>
    <!-- value -->
    <view
      v-if="$slots.value || $slots.default || value"
      :class="`r-cell__value ${valueClass || ''}`"
    >
      <slot v-if="$slots.value" name="value"></slot>
      <slot v-else-if="$slots.default"></slot>
      <text v-else-if="value">{{ value }}</text>
    </view>
    <!-- right icon -->
    <slot v-if="$slots.rightIcon" name="rightIcon"></slot>
    <r-icon
      v-else-if="isLink"
      class="r-cell__right-icon"
      :name="`${
        arrowDirection != 'right' ? 'arrow-' + arrowDirection : 'arrow'
      }`"
      size="var(--r-cell-icon-size)"
      color="var(--r-cell-right-icon-color)"
      :customClass="`r-cell__right-icon`"
      :customStyle="rightIconCustomStyle"
    ></r-icon>
    <!-- extra 自定义单元格最右侧的额外内容-->
    <slot name="extra" />
  </view>
</template>
<script setup>
	import RIcon from '@/uni_modules/r-icon/components/r-icon/r-icon.vue'
import CellProps from "./props.js";
import { defineProps, defineEmits } from "vue";
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({ ...CellProps });
const emit = defineEmits(["click"]);
const clickHandler = (e) => {
  emit("click", e);
};
</script>
<style lang="scss" scoped>
@mixin hairline-common {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
}
@mixin hairline-bottom($color: var(--r-border-color), $left: 0, $right: 0) {
  @include hairline-common;
  right: $right;
  bottom: 0;
  left: $left;
  border-bottom: 1px solid $color;
  transform: scaleY(0.5);
}

.r-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: var(--r-cell-vertical-padding) var(--r-cell-horizontal-padding);
  overflow: hidden;
  color:
  //  var(--r-text-color);
    var(--r-cell-text-color);
  font-size: var(--r-cell-font-size);
  line-height: var(--r-cell-line-height);
  background:  
  // var(--r-background-2);
    var(--r-cell-background);

  &::after {
    @include hairline-bottom(
      var(--r-cell-border-color),
      var(--r-padding-md),
      var(--r-padding-md)
    );
  }

  &:last-child::after,
  &--borderless::after {
    display: none;
  }

  &__label {
    margin-top: var(--r-cell-label-margin-top);
    color: var(--r-cell-label-color);
    font-size: var(--r-cell-label-font-size);
    line-height: var(--r-cell-label-line-height);
  }

  &__title,
  &__value {
    flex: 1;
  }

  &__value {
    position: relative;
    overflow: hidden;
    color: var(--r-cell-value-color);
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
  }

  &__left-icon,
  &__right-icon {
    height: var(--r-cell-line-height);
    font-size: var(--r-cell-icon-size);
    line-height: var(--r-cell-line-height);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &__left-icon {
    margin-right: var(--r-padding-base);
  }

  &__right-icon {
    margin-left: var(--r-padding-base);
    color: var(--r-cell-right-icon-color);
  }

  &--clickable {
    cursor: pointer;

    &:active {
      background-color: var(--r-cell-active-color);
    }
  }

  &--required {
    overflow: visible;

    &::before {
      position: absolute;
      left: var(--r-padding-xs);
      color: var(--r-cell-required-color);
      font-size: var(--r-cell-font-size);
      content: "*";
    }
  }

  &--center {
    align-items: center;
  }

  &--large {
    padding-top: var(--r-cell-large-vertical-padding);
    padding-bottom: var(--r-cell-large-vertical-padding);

    .r-cell__title {
      font-size: var(--r-cell-large-title-font-size);
    }

    .r-cell__label {
      font-size: var(--r-cell-large-label-font-size);
    }
  }
}
</style>
