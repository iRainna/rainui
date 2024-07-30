<template>
  <view
    :class="{
      'r-grid': true,
      'r-hairline--top': border && !gutter,
    }"
    :style="{
      ...getComponentThemeStyle,
      paddingLeft: isNumeric(gutter) ? gutter + 'px' : gutter,
    }"
  >
    <slot></slot>
  </view>
</template>
<script setup>
import {
  computed,
  ref,
  inject,
  provide,
  nextTick,
  getCurrentInstance,
} from "vue";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import {
  CONFIG_PROVIDER_KEY,
  isNumeric,
  GRID_KEY,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 列数
  columnNum: {
    type: [Number],
    default: 4,
  },
  //   图标大小，默认单位为px
  iconSize: {
    type: [Number, String],
    default: 28,
  },
  //   格子之间的间距，默认单位为px
  gutter: {
    type: [Number],
    default: 0,
  },
  //   是否显示边框
  border: {
    type: Boolean,
    default: true,
  },
  //   是否将格子内容居中显示
  center: {
    type: Boolean,
    default: true,
  },
  //   是否将格子固定为正方形
  square: {
    type: Boolean,
    default: false,
  },
  // 是否开启格子点击反馈
  clickable: {
    type: Boolean,
    default: false,
  },
  //   格子内容排列的方向，可选值为 horizontal
  direction: {
    type: [String],
    default: "vertical",
  },
  //   是否调换图标和文本的位置
  reverse: {
    type: Boolean,
    default: false,
  },
});

const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = "default";

  if (themeInject?.value?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.value?.themeName;
  }

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
  };
});

const gridRect = ref(null);
nextTick(async () => {
  gridRect.value = await GetRect(".r-grid", proxy);
});

const children = ref([]);
const setChildren = (e) => {
  children.value = [...children.value, e];
};
provide(GRID_KEY, { setChildren, children, props, gridRect });
</script>
<style lang="scss" scoped>
.r-grid {
  display: flex;
  flex-wrap: wrap;
}

.r-hairline--top {
  border-top: solid 1px var(--r-border-color);
}
</style>
