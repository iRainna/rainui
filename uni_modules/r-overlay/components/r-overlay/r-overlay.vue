<template>
  <r-animation
    :show="show"
    :entryClass="entryClass"
    :exitClass="exitClass"
    :duration="duration"
    :delay="delay"
    @close="close"
    @open="open"
    @closed="closed"
    @opened="opened"
    :customStyle="customTransitionStyle"
  >
    <view
      :style="{
        ...getComponentThemeStyle,
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: color || 'var(--r-overlay-background)',
        zIndex: zIndex || 'var(--r-overlay-z-index)',
        ...customStyle,
      }"
      :class="customClass"
      @click="clickHandler"
      @touchmove.stop.prevent="() => {}"
      v-if="lockScroll"
    >
      <slot />
    </view>
    <view
      :style="{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: color || 'var(--r-overlay-background)',
        zIndex: zIndex || 'var(--r-overlay-z-index)',
        ...customStyle,
      }"
      :class="customClass"
      @click="clickHandler"
      v-else
    >
      <slot />
    </view>
  </r-animation>
</template>
<script setup>
import OverlayProps from "./props.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
import { inject, computed } from "vue";
const emit = defineEmits(["open", "close", "opened", "closed", "click"]);
const props = defineProps({
  ...OverlayProps,
});

const componentsName = "r-overlay";
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

const closed = () => {
  emit("closed");
};
const close = () => {
  emit("close");
};
const open = () => {
  emit("open");
};
const opened = () => {
  emit("opened");
};
const clickHandler = (e) => {
  emit("click", e);
};
</script>
