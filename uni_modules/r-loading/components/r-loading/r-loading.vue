<template>
  <view
    :class="{
      'r-loading': true,
      [`r-loading--${type}`]: true,
      'r-loading--vertical': vertical,
    }"
    :style="{
      color: getTheme(themeName)['r-loading-spinner-color'],
    }"
  >
    <view
      v-if="type == 'spinner' && !$slots.icon"
      style="display: inline-flex; align-items: center; justify-content: center"
      :class="{
        'r-loading__spinner': true,
        [`r-loading__spinner--${type}`]: true,
        loading: true,
      }"
      :style="{
        width: size,
        height: size,
        color,
      }"
    >
      <i
        v-for="m in 12"
        :key="m"
        :class="{
          'r-loading__line': true,
          [`r-loading__line--${m}`]: true,
        }"
      ></i>
    </view>
    <view
      v-if="type == 'circular' && !$slots.icon"
      style="display: inline-flex; align-items: center; justify-content: center"
      :class="`r-loading__spinner r-loading__spinner--${type} loading`"
      :style="{
        width: size,
        height: size,
        color,
      }"
    >
      <r-icon
        :class="`r-loading__${type}`"
        name="icon-loading"
        prefix="iconfont"
        :size="size"
        :color="color"
      />
    </view>
    <view
      v-if="$slots.icon"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        height: auto;
      "
      :class="`r-loading__spinner r-loading__spinner--${type} loading`"
    >
      <slot name="icon"></slot>
    </view>
    <text
      v-if="$slots.default"
      class="r-loading__text"
      :class="{
        'r-loading--vertical': vertical,
      }"
      :style="{
        fontSize: textSize,
        color: textColor != '#c9c9c9' ? textColor : color,

        marginLeft: vertical ? 0 : getTheme(themeName)['r-padding-xs'],
        color: getTheme(themeName)['r-loading-text-color'],
        fontSize: getTheme(themeName)['r-loading-text-font-size'],
        marginTop: vertical ? getTheme(themeName)['r-padding-xs'] : 0,
      }"
    >
      <slot></slot>
    </text>
  </view>
</template>
<script setup>
import { defineProps } from "vue";
import LoadingProps from "./props.js";
import { getTheme } from "@/uni_modules/r-theme/js_sdk/index.js";

const props = defineProps({
  ...LoadingProps,
});
</script>
<style lang="scss" scoped>
@use "sass:math";

.r-loading {
  display: inline-block;
  position: relative;
  font-size: 0;
  vertical-align: middle;

  &__spinner {
    position: relative;
    // display: inline-block;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    // compatible for 1.x, users may set width or height in root element
    max-width: 100%;

    max-height: 100%;
    vertical-align: middle;

    &--spinner {
      animation-timing-function: steps(12);
    }

    &--circular {
      animation-duration: 2s;
    }
  }

  &__line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      display: block;
      width: 2px;
      height: 25%;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 40%;
      content: " ";
    }
  }

  &__circular {
    // display: block;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__text {
    display: inline-block;

    vertical-align: middle;
  }

  &--vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
}

@mixin generate-spinner($n, $i: 1) {
  // $n: 12;
  // $i: 1;
  @while ($i<=$n) {
    .r-loading__line--#{$i} {
      transform: rotate($i * 30deg);
      opacity: 1 - math.div(0.75, 12) * ($i - 1);
      // (0.75 / 12)
    }
    $i: $i + 1;
  }
}
@include generate-spinner(12, 1);

@keyframes r-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* 添加动画效果 */
.loading {
  animation: r-rotate 2s ease-in-out infinite;
}
</style>
