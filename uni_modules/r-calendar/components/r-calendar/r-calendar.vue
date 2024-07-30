<template>
  <view>r-calendar</view>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import {
  getComponentThemeCssVar,
  themeObjectComp,
  themeModuleObjectComp,
} from "@/uni_modules/r-theme/js_sdk/index.js";

console.log("themeObjectComp", themeObjectComp);
console.log("themeModuleObjectComp", themeModuleObjectComp);
</script>
<style lang="scss" scoped></style>
