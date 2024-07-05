<template>
  <slot v-if="!loading"></slot>
  <view
    v-else-if="$slots.template"
    :class="{
      'r-skeleton': true,
      'r-skeleton--animate': animate,
    }"
    :style="getComponentThemeStyle"
  >
    <slot name="template"></slot>
  </view>
  <view
    v-else
    :class="{
      'r-skeleton': true,
      'r-skeleton--animate': animate,
    }"
    :style="getComponentThemeStyle"
  >
    <!-- renderAvatar -->
    <r-skeleton-avatar
      v-if="avatar"
      :avatarShape="avatarShape"
      :avatarSize="avatarSize"
      :themeName="themeName"
    ></r-skeleton-avatar>
    <view
      :class="{
        'r-skeleton__content': true,
      }"
    >
      <!-- renderTitle -->
      <r-skeleton-title
        v-if="title"
        :round="round"
        :titleWidth="titleWidth"
        :themeName="themeName"
      ></r-skeleton-title>
      <!-- renderRows -->
      <r-skeleton-paragraph
        v-for="(m, n) in Number(row)"
        :key="m"
        :round="round"
        :rowWidth="getRowWidth(n)"
        :themeName="themeName"
      ></r-skeleton-paragraph>
    </view>
  </view>
</template>
<script>
export default {
  options: { styleIsolation: "shared" },
};
</script>
<script setup>
import { defineProps, computed, inject } from "vue";

import {
  CONFIG_PROVIDER_KEY,
  isNumeric,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const DEFAULT_LAST_ROW_WIDTH = "60%";
const DEFAULT_ROW_WIDTH = "100%";
const props = defineProps({
  // 段落占位图行数
  row: {
    type: [Number, String],
    default: 0,
  },
  //   段落占位图宽度，可传数组来设置每一行的宽度
  rowWidth: {
    type: [String, Number, Array],
    default: "100%",
  },
  //   是否显示标题占位图
  title: {
    type: Boolean,
    default: false,
  },
  //   是否显示头像占位图
  avatar: {
    type: Boolean,
    default: false,
  },
  //   是否显示骨架屏，传 false 时会展示子组件内容
  loading: {
    type: Boolean,
    default: true,
  },
  //   是否开启动画
  animate: {
    type: Boolean,
    default: true,
  },
  //   是否将标题和段落显示为圆角风格
  round: {
    type: Boolean,
    default: false,
  },
  //   标题占位图宽度
  titleWidth: {
    type: [String, Number],
    default: "40%",
  },
  //   头像占位图大小
  avatarSize: {
    type: [String, Number],
    default: "32px",
  },
  //   头像占位图形状，可选值为 square
  avatarShape: {
    type: [String],
    default: "round",
  },
  // 主题名称
  themeName: {
    type: String,
    default: "default",
  },
});

const getRowWidth = (index) => {
  const { rowWidth } = props;

  if (rowWidth === DEFAULT_ROW_WIDTH && index === Number(props.row) - 1) {
    return DEFAULT_LAST_ROW_WIDTH;
  }

  if (Array.isArray(rowWidth)) {
    return isNumeric(rowWidth[index])
      ? rowWidth[index] + "rpx"
      : rowWidth[index];
  }

  return isNumeric(rowWidth) ? rowWidth + "rpx" : rowWidth;
};

const componentsName = "r-skeleton";
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
  display: flex;
  padding: 0 var(--r-padding-md);

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--r-skeleton-paragraph-margin-top);
  }

  &--animate {
    animation: r-skeleton-blink var(--r-skeleton-duration) ease-in-out infinite;
  }
}

@keyframes r-skeleton-blink {
  50% {
    opacity: 0.6;
  }
}
</style>
