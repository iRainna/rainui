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
        ...getThemeCssVar(themeName),
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
import { defineProps, defineEmits } from "vue";
import OverlayProps from "./props.js";

import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const emit = defineEmits(["open", "close", "opened", "closed", "click"]);
const props = defineProps({
  ...OverlayProps,
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
