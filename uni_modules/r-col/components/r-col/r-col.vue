<template>
  <view
    @click.stop="clickHandler"
    :style="{
      boxSizing: `border-box`,
      paddingLeft: styleComp['r-layout-gap'],
      paddingRight: styleComp['r-layout-gap'],
      paddingBottom: styleComp['r-layout-gap'],
      width: `calc(${styleComp['r-row-width']} / 24 * ${Number(span)})`,
      marginLeft: `calc(${styleComp['r-row-width']} / 24 * ${Number(offset)})`,
      flex: `0 0 calc(${styleComp['r-row-width']} / 24 * ${Number(span)})`,
    }"
  >
    <slot></slot>
  </view>
</template>
<script setup>
import { inject } from "vue";
import ColProps from "./props.js";
import { LAYOUT_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
const props = defineProps({
  ...ColProps,
});
const { styleComp } = inject(LAYOUT_KEY);

const emit = defineEmits(["click"]);
const clickHandler = (e) => {
  emit("click", e);
};
</script>
