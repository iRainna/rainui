<template>
  <view
    :class="{
      'r-skeleton-avatar': true,
      [`r-skeleton-avatar--${avatarShape}`]: true,
    }"
    :style="{
      ...getComponentThemeStyle,
      width: isNumeric(avatarSize) ? avatarSize + 'rpx' : avatarSize,
      height: isNumeric(avatarSize) ? avatarSize + 'rpx' : avatarSize,
    }"
  ></view>
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
import { inject, computed } from "vue";

const props = defineProps({
  avatarSize: {
    type: [String, Number],
    default: "64rpx",
  },
  avatarShape: {
    type: [String],
    default: "round",
  },
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-skeleton-avatar";
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
  &-avatar {
    flex-shrink: 0;
    width: var(--r-skeleton-avatar-size);
    height: var(--r-skeleton-avatar-size);
    margin-right: var(--r-padding-md);
    background: var(--r-skeleton-avatar-background);

    &--round {
      border-radius: var(--r-radius-max);
    }
  }

  &-avatar + &__content {
    padding-top: var(--r-padding-xs);
  }
}
</style>
