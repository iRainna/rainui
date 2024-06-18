<template>
  <!-- title -->
  <view
    v-if="$slots.title"
    :class="{
      'r-cell-group__title': true,
      'r-cell-group__title--inset': inset,
    }"
    :style="getThemeCssVar(themeName)"
  >
    <slot name="title"></slot>
  </view>
  <view
    v-else-if="title"
    :class="{
      'r-cell-group__title': true,
      'r-cell-group__title--inset': inset,
    }"
    :style="getThemeCssVar(themeName)"
  >
    {{ title }}
  </view>
  <!-- group -->
  <view
    :class="{
      'r-cell-group': true,
      'r-cell-group--inset': inset,
      'r-hairline--top-bottom': border && !inset,
    }"
    :style="{
      ...getThemeCssVar(themeName),
      ...customStyle,
    }"
  >
    <slot />
  </view>
</template>
<script setup>
import { defineProps } from "vue";
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({
  // 分组标题
  title: {
    type: String,
    default: "",
  },
  //   是否展示为圆角卡片风格
  inset: {
    type: Boolean,
    default: false,
  },
  //   是否显示外边框
  border: {
    type: Boolean,
    default: true,
  },
  //自定义样式
  customStyle: {
    type: Object,
    default: () => {},
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
});
</script>
<style lang="scss" scoped>
.r-cell-group {
  background: var(--r-cell-group-background);

  &--inset {
    margin: var(--r-cell-group-inset-padding);
    border-radius: var(--r-cell-group-inset-radius);
    overflow: hidden;
  }

  &__title {
    padding: var(--r-cell-group-title-padding);
    color: var(--r-cell-group-title-color);
    font-size: var(--r-cell-group-title-font-size);
    line-height: var(--r-cell-group-title-line-height);

    &--inset {
      padding: var(--r-cell-group-inset-title-padding);
    }
  }
}
</style>
