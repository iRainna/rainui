<template>
  <view
    :class="`r-radio-group r-radio-group--${direction}`"
    :style="getThemeCssVar(themeName)"
  >
    <slot v-if="$slots.default"></slot>
  </view>
</template>

<script setup>
import CheckboxGroupProps from "./props.js";
import { defineProps, defineEmits, provide, nextTick } from "vue";
import { RADIO_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({ ...CheckboxGroupProps });
const emit = defineEmits(["update:value", "change"]);

const updateValue = (value) => {
  emit("update:value", value);
  nextTick(() => {
    emit("change", value);
  });
};
provide(RADIO_KEY, { props, updateValue });
</script>
<style lang="scss" scoped>
.r-radio-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
    gap: 12rpx;
  }
  &--vertical {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
  }
}
</style>
