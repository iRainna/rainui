<template>
  <view
    :class="{
      'r-checkbox-group': true,
      [`r-checkbox-group--${direction}`]: true,
    }"
  >
    <slot v-if="$slots.default"></slot>
  </view>
</template>

<script setup>
import CheckboxGroupProps from "./props.js";
import { defineProps, defineEmits, provide, nextTick } from "vue";
import { CHECKBOX_GROUP_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
// import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({ ...CheckboxGroupProps });
const emit = defineEmits(["update:value", "change"]);

const updateValue = (value) => {
  emit("update:value", value);
  nextTick(() => {
    emit("change", value);
  });
};
provide(CHECKBOX_GROUP_KEY, { props, updateValue });
</script>
<style lang="scss">
.r-checkbox-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
