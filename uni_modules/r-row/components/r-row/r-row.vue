<!--
 * @Description: 
 * @Author: iRainna
 * @Date: 2023-08-09 09:50:26
 * @LastEditTime: 2023-08-25 10:57:30
 * @FilePath: \i-r-ui\uni_modules\iR-ui\components\row\index.vue
-->
<template>
  <view
    class="row"
    @click.stop="clickHandler"
    :style="{
      width: '100%',
      overflowX: 'hidden',
    }"
  >
    <view
      :style="{
        width: styleComp['r-row-width'],
        display: 'flex',
        flexDirection: 'row',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems: align,
        justifyContent: justify,
        marginLeft: styleComp['r-layout-gap-2'],

        // marginRight: styleComp['r-layout-gap-2'],
      }"
    >
      <!-- gap: gutter, -->
      <slot />
    </view>
  </view>
</template>
<script setup>
import RowProps from "./props.js";
import { onMounted, getCurrentInstance, ref, computed, provide } from "vue";
import {
  GetRect,
  SplitUnitNum,
  LAYOUT_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";

const props = defineProps({
  ...RowProps,
});

const { proxy } = getCurrentInstance();

const rowWidth = ref(0);
const { num, unit = "rpx" } = SplitUnitNum(props.gutter);
const styleComp = computed(() => {
  return {
    "r-layout-gap": Number(num) / 2 + unit,
    "r-layout-gap-2": -Number(num) / 2 + unit,
    "r-row-width":
      rowWidth.value + (unit == "rpx" ? Number(num) / 2 : Number(num)) + "px",
  };
});

const emit = defineEmits(["click"]);
const clickHandler = (e) => {
  emit("click", e);
};

onMounted(() => {
  try {
    GetRect(".row", proxy).then((data) => {
      rowWidth.value = data.width;
    });
  } catch (error) {}
});
provide(LAYOUT_KEY, { styleComp });
</script>
<style lang="scss" scoped></style>
