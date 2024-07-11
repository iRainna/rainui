<template>
  <r-animation
    show
    :entryClass="entryClass"
    :exitClass="exitClass"
    :duration="duration"
    :delay="delay"
    :customStyle="{
      ...getComponentThemeStyle,
      display: block ? 'block' : 'inline-block',
    }"
  >
    <view
      :style="{
        ...getComponentThemeStyle,
        ...customStyle,
        overflow: 'hidden',
      }"
      :class="`${customClass}`"
    >
      <view
        v-if="showLoading && isLoading && !isError"
        class="not-image"
        :style="{
          width: width || (customStyle && customStyle.width) || '200rpx',
          height: width || (customStyle && customStyle.width) || '200rpx',
          color: iconColor || 'var(--r-image-loading-icon-color)',
          fontSize: iconSize || 'var(--r-image-loading-icon-size)',
          borderRadius: round
            ? 'var(--r-radius-max)'
            : radius || (customStyle && customStyle.borderRadius) || '0rpx',
        }"
      >
        <slot name="loading">
          <r-icon
            :name="`${loadingIcon}`"
            :size="iconSize || 'var(--r-image-loading-icon-size)'"
            :color="iconColor || 'var(--r-image-loading-icon-color)'"
            :prefix="iconPrefix"
          />
        </slot>
      </view>

      <view
        v-if="showError && !isLoading && isError"
        class="not-image"
        :style="{
          width: width || (customStyle && customStyle.width) || '200rpx',
          height: width || (customStyle && customStyle.width) || '200rpx',
          color: iconColor || 'var(--r-image-loading-icon-color)',
          fontSize: iconSize || 'var(--r-image-loading-icon-size)',
          borderRadius: round
            ? 'var(--r-radius-max)'
            : radius || (customStyle && customStyle.borderRadius) || '0rpx',
        }"
      >
        <slot name="error">
          <r-icon
            :name="`${errorIcon}`"
            :size="iconSize || 'var(--r-image-loading-icon-size)'"
            :color="iconColor || 'var(--r-image-loading-icon-color)'"
            :prefix="iconPrefix"
          />
        </slot>
      </view>
      <!-- style="width: 100%; height: 100%" -->
      <image
        v-else
        :style="{
          ...customStyle,
          width: width || (customStyle && customStyle.width) || '200rpx',
          height: width || (customStyle && customStyle.width) || '200rpx',
          borderRadius: round
            ? 'var(--r-radius-max)'
            : radius || (customStyle && customStyle.borderRadius) || '0rpx',
          display: 'block',
        }"
        :src="src"
        :mode="mode"
        :lazy-load="lazyLoad"
        :webp="webp"
        :show-menu-by-longpress="showMenuByLongpress"
        :draggable="draggable"
        @error="error"
        @load="load"
        @click="onClick"
      ></image>
    </view>
  </r-animation>
</template>
<script setup>
import { defineProps, ref, inject, computed, defineEmits } from "vue";
import ImageProps from "./props.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";

const emit = defineEmits(["click"]);
const props = defineProps({
  ...ImageProps,
});

const componentsName = "r-image";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (themeInject?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.themeName;
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

const isError = ref(false);
const isLoading = ref(true);
const load = () => {
  isLoading.value = false;
  isError.value = false;
};
const error = () => {
  isError.value = true;
  isLoading.value = false;
};
const onClick = (e) => emit("click", e);
</script>
<style lang="scss" scoped>
.not-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--r-image-placeholder-text-color);
  font-size: var(--r-image-placeholder-font-size);
  background: var(--r-image-placeholder-background);
}
</style>
