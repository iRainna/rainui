<template>
  <view
    class="r-icon"
    :class="{
      [customClass]: true,
      [prefix]: true,
      [name]: true,
      ['van-icon-' + name]: true,
    }"
    @click="clickHandler"
    v-if="name"
    :style="{
      ...getComponentThemeStyle,
      ...customStyle,
      fontSize: size || customStyle.fontSize || '48rpx',
      color: color || customStyle.color || 'var(--r-text-color)',
      width: size || customStyle.fontSize || '48rpx',
      height: size || customStyle.fontSize || '48rpx',
      '--animate-duration': `${duration}ms`,
      '--animate-delay': `${delay}ms`,
    }"
    style="
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    "
    :hover-start-time="delay"
    :hover-stay-time="duration"
    :hover-class="`animate__animated ${hoverClass}`"
  ></view>
</template>

<script setup>
import { inject, ref, computed } from "vue";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";

import { CONFIG_PROVIDER_KEY, _ } from "@/uni_modules/r-utils/js_sdk/index.js";
const { cloneDeep } = _;
const props = defineProps({
  //icon名称
  name: {
    type: String,
    default: "",
  },
  //大小
  size: {
    type: String,
    default: "",
  },
  //颜色
  color: {
    type: String,
    default: "",
  },
  //自定义样式
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  //自定义类名
  customClass: {
    type: String,
    default: "",
  },
  //前缀类名
  prefix: {
    type: String,
    default: "van-icon",
  },
  //指定按下去的样式类。
  hoverClass: {
    type: String,
    default: "",
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
  //持续时间
  duration: {
    type: Number,
    default: 1000,
  },
  //延迟时间
  delay: {
    type: Number,
    default: 0,
  },
});

const componentsName = "r-icon";
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

  return cloneDeep({
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  });
});

const emit = defineEmits(["click"]);
const clickHandler = (e) => {
  emit("click", e);
};
</script>

<style lang="scss" scoped>
@import "./vant-icons/encode-woff2.scss";
@import "../../../r-animation/components/r-animation/animate.css";
@import "./iconfont/iconfont.css";
@import "./other-icon/iconfont.css";

.r-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
