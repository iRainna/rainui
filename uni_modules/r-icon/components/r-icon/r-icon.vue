<!--
 * @Author: iRainna caihonglin@joomon.com
 * @Date: 2024-06-11 15:13:38
 * @LastEditors: iRainna caihonglin@joomon.com
 * @LastEditTime: 2024-06-11 15:27:46
 * @FilePath: \rainui\uni_modules\r-icon\components\r-icon\r-icon.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by iRainna, All Rights Reserved. 
-->
<template>
  <view
    class="icon"
    :class="{
      [customClass]: true,
      [prefix]: true,
      [name]: true,
    }"
    @click="clickHandler"
    v-if="name"
    :style="{
      ...customStyle,
      fontSize: size || customStyle.fontSize || '48rpx',
      color: color || customStyle.color || getTheme(themeName)['r-text-color'],
      width: size || customStyle.fontSize || '48rpx',
      height: size || customStyle.fontSize || '48rpx',

      '--animate-duration': `${duration}ms`,
      '--animate-delay': `${delay}ms`,
    }"
    style="
      display: flex;
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
import { getTheme } from "@/uni_modules/r-theme/js_sdk/index.js";
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
// @import "./vant-icons/encode-woff2.scss";
@import "../../../r-animation/components/r-animation/animate.css";
@import "./iconfont/iconfont.css";

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
