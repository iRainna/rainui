<template>
  <view
    class="r-space"
    :style="{
      display: fill ? 'flex' : 'inline-flex',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      gap: size,
      flexDirection: direction == 'horizontal' ? 'row' : 'column',
      alignItems: getAlign,
    }"
  >
    <slot></slot>
  </view>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  align: {
    type: String,
    default: "start",
  },
  direction: {
    type: String,
    default: "horizontal",
  },
  size: {
    type: String,
    default: "16rpx",
  },
  wrap: {
    type: Boolean,
    default: false,
  },
  fill: {
    type: Boolean,
    default: false,
  },
});

const getAlign = computed(() => {
  if (props.align == "baseline") return "baseline";
  if (props.align == "start") return "flex-start";
  if (props.align == "end") return "flex-end";
  if (props.align == "center") return "center";

  return "";
});
</script>
<style lang="scss" scoped>
.r-space {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
</style>
