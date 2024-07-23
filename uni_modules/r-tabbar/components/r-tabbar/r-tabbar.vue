<template>
  <view
    v-if="placeholder && fixed"
    :style="{
      height: Rect.height + 'px',
    }"
  ></view>
  <view
    :class="{
      'r-tabbar': true,
      'r-tabbar--fixed': fixed,
    }"
    :style="{
      ...getComponentThemeStyle,
      zIndex,
      paddingBottom: safeAreaInsetBottom ? `${safeBottom}px` : 0,
      borderTop: border ? 'solid 1px var(--r-border-color)' : 0,
    }"
  >
    <slot></slot>
  </view>
</template>
<script setup>
import {
  computed,
  inject,
  ref,
  nextTick,
  getCurrentInstance,
  provide,
} from "vue";
import {
  _,
  CONFIG_PROVIDER_KEY,
  GetRect,
  getSystemInfo,
  callInterceptor,
  TABBAR_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["update:value", "change"]);
const props = defineProps({
  // 当前选中标签的名称或索引值
  value: {
    type: [Number, String],
    default: 0,
  },
  //   是否固定在底部
  fixed: {
    type: Boolean,
    default: true,
  },
  //   是否显示外边框
  border: {
    type: Boolean,
    default: true,
  },
  //   元素 z-index
  zIndex: {
    type: [Number, String],
    default: 1,
  },
  //   选中标签的颜色
  activeColor: {
    type: String,
    default: "#1989fa",
  },
  //   未选中标签的颜色
  inactiveColor: {
    type: String,
    default: "#7d7e80",
  },
  //   固定在底部时，是否在标签位置生成一个等高的占位元素
  placeholder: {
    type: Boolean,
    default: false,
  },
  //   是否开启底部安全区适配
  safeAreaInsetBottom: {
    type: Boolean,
    default: false,
  },
  //   切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise
  beforeChange: {
    type: Function,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-tabbar";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (themeInject?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.themeName;
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

const safeBottom = ref(0);
if (props.safeAreaInsetBottom) {
  const data = getSystemInfo();
  safeBottom.value = data?.safeAreaInsets?.bottom;
} else {
  safeBottom.value = 0;
}

const Rect = ref({});

nextTick(async () => {
  Rect.value = await GetRect(".r-tabbar", proxy);
});

const setActive = (active) => {
  callInterceptor(props.beforeChange, {
    args: [active],
    done() {
      emit("update:value", active);
      nextTick(() => {
        emit("change", active);
      });
    },
  });
};
const children = ref([]);
const setChildren = (e) => {
  children.value = [...children.value, e];
};
provide(TABBAR_KEY, { props, setActive, children, setChildren, Rect });
</script>
<style lang="scss" scoped>
.r-tabbar {
  z-index: var(--r-tabbar-z-index);
  display: flex;
  box-sizing: content-box;
  width: 100%;
  height: var(--r-tabbar-height);
  background: var(--r-tabbar-background);

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
