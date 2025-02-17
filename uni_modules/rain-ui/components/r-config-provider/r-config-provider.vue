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
import { CONFIG_PROVIDER_KEY } from "../r-utils/index.js";
import { getThemeCssVar } from "../r-theme/index.js";
const props = defineProps({
  ...ConfigProviderProps,
});
const getComponentStyle = computed(() => getThemeCssVar(props.themeName));

const toChildren = computed(() => ({
  themeName: props.themeName,
}));
provide(CONFIG_PROVIDER_KEY, toChildren);
</script>
