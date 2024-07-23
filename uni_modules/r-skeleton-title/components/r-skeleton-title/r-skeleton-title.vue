<template>
  <view
    :class="{
      'r-skeleton-title': true,
      [`r-skeleton-title'--round`]: round,
    }"
    :style="{
      ...getComponentThemeStyle,
      width: isNumeric(titleWidth) ? titleWidth + 'rpx' : titleWidth,
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
  titleWidth: {
    type: [String, Number],
    default: "40%",
  },
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-skeleton-title";
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
  &-title {
    height: var(--r-skeleton-paragraph-height);
    background: var(--r-skeleton-paragraph-background);

    &--round {
      border-radius: var(--r-radius-max);
    }
  }

  &-title {
    width: var(--r-skeleton-title-width);
    margin: 0;
  }

  &-title + &-paragraph {
    margin-top: 20px;
  }
}
</style>
