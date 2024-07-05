<template>
  <view
    :class="{
      'r-skeleton-image': true,
      [`r-skeleton-image--${imageShape}`]: true,
    }"
    :style="getComponentThemeStyle"
  >
    <r-icon
      name="photo"
      :size="'calc(var(--r-skeleton-image-size) / 2)'"
      :color="'var(--r-gray-5)'"
      class="r-skeleton-image__icon"
      customClass="r-skeleton-image__icon"
    ></r-icon>
  </view>
</template>
<script>
export default {
  options: { styleIsolation: "shared" },
};
</script>
<script setup>
import {
  CONFIG_PROVIDER_KEY,
  isNumeric,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { defineProps, computed, inject } from "vue";
const props = defineProps({
  // 图片占位图大小
  imageSize: {
    type: [String, Number],
    default: "64rpx",
  },
  //   图片占位图形状，可选值为 square
  imageShape: {
    type: [String],
    default: "round",
  },
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-skeleton-image";
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
</script>
<style lang="scss" scoped>
.r-skeleton {
  &-image {
    display: flex;
    width: var(--r-skeleton-image-size);
    height: var(--r-skeleton-image-size);
    align-items: center;
    justify-content: center;
    background: var(--r-active-color);

    &--round {
      border-radius: var(--r-skeleton-image-radius);
    }

    // &__icon {
    //   width: calc(var(--r-skeleton-image-size) / 2);
    //   height: calc(var(--r-skeleton-image-size) / 2);
    //   font-size: calc(var(--r-skeleton-image-size) / 2);
    //   color: var(--r-gray-5);
    // }
  }
}
</style>
