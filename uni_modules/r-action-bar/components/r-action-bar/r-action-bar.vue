<template>
  <view
    v-if="placeholder"
    :style="{
      height: Rect.height + 'px',
    }"
  ></view>
  <view
    :class="{
      'r-action-bar': true,
    }"
    :style="{
      ...getComponentThemeStyle,
      paddingBottom: safeAreaInsetBottom ? `${safeBottom}px` : 0,
    }"
  >
    <slot></slot>
  </view>
</template>
<script setup>
import { getSystemInfo, GetRect, ACTION_BAR_KEY } from "../utils/index.js";
import { getComponentThemeCssVar } from "../themes/index.js";
import {
  nextTick,
  inject,
  watchEffect,
  getCurrentInstance,
  computed,
  ref,
  provide,
} from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 是否在标签位置生成一个等高的占位元素
  placeholder: {
    type: Boolean,
    default: false,
  },
  // 是否开启底部安全区适配
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-action-bar";

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (props.themeName != "default") {
    //单独设置了组件的 就用单独设置的
    themeName = props.themeName;
  }

  console.log("themeInject", themeInject.value);

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  };
});

const Rect = ref({});

nextTick(async () => {
  Rect.value = await GetRect(".r-action-bar", proxy);
  console.log("Rect", Rect, themeInject);
});

const safeBottom = ref(0);
watchEffect(() => {
  if (props.safeAreaInsetBottom) {
    const data = getSystemInfo();
    safeBottom.value = data?.safeAreaInsets?.bottom;
  } else {
    safeBottom.value = 0;
  }
});

const children = ref([]);
const setChildren = (e) => {
  children.value.push(e);
};

provide(ACTION_BAR_KEY, { children, setChildren });
</script>
<style lang="scss" scoped>
.r-action-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  box-sizing: content-box;
  height: var(--r-action-bar-height);
  background: var(--r-action-bar-background);
  width: 100vw;
}
</style>
