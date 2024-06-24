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
      ...getThemeCssVar(themeName),
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
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import IconProps from "./props.js";
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  ...IconProps,
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

.r-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
