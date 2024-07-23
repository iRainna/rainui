<template>
  <view
    :style="{
      ...getComponentStyle,
      background: 'var(--r-background)',
      color: 'var(--r-text-color)',
      width: '100vw',
      minHeight: '100vh',
      ...customStyle,
    }"
  >
    <slot></slot>
  </view>
</template>

<script setup>
import { provide, computed } from "vue";
import ConfigProviderProps from "./props.js";
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({
  ...ConfigProviderProps,
});
const getComponentStyle = computed(() => {
  return {
    ...getThemeCssVar("default"),
    ...getThemeCssVar(props.themeName),
  };
});
provide(CONFIG_PROVIDER_KEY, { themeName: props.themeName });
</script>
