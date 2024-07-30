<template>
  <view
    :class="{
      'r-skeleton-paragraph': true,
      [`r-skeleton-paragraph--round`]: round,
    }"
    :style="{
      ...getComponentThemeStyle,
      width: rowWidth,
    }"
  ></view>
</template>
<script>
export default {
  options: { styleIsolation: "shared" },
};
</script>
<script setup>
import { computed, inject } from "vue";
import {
  CONFIG_PROVIDER_KEY,
  isNumeric,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({
  round: {
    type: Boolean,
    default: false,
  },
  rowWidth: {
    type: String,
    default: "100%",
  },
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-skeleton-paragraph";
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

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  };
});
</script>
<style lang="scss" scoped>
.r-skeleton {
  &-paragraph {
    height: var(--r-skeleton-paragraph-height);
    background: var(--r-skeleton-paragraph-background);

    &--round {
      border-radius: var(--r-radius-max);
    }

    // &:not(:first-child) {
    //   margin-top: var(--r-skeleton-paragraph-margin-top);
    // }
  }
}
</style>
