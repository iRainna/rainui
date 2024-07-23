<template>
  <view
    :style="getComponentThemeStyle"
    :class="{
      'r-action-bar-icon': true,
    }"
    @click="onClick"
  >
    <!-- renderIcon -->
    <r-badge
      :dot="dot"
      :offset="offset"
      :content="badge"
      :color="badgeColor"
      :max="max"
      :showZero="showZero"
      :position="position"
    >
      <slot v-if="$slots.icon" name="icon"></slot>
      <view
        v-else
        :class="{
          'r-action-bar-icon__icon': true,
        }"
      >
        <r-icon
          :color="color"
          size="var(--r-action-bar-icon-size)"
          :prefix="iconPrefix"
          :name="icon"
          :customClass="iconClass"
        ></r-icon>
      </view>
    </r-badge>

    <slot v-if="$slots.default"></slot>
    <text v-else>{{ text }}</text>
  </view>
</template>
<script setup>
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { inject, computed } from "vue";
const emit = defineEmits(["click"]);
const props = defineProps({
  // 按钮文字
  text: {
    type: String,
    default: "",
  },
  //图标
  icon: {
    type: String,
    default: "",
  },
  //   图标颜色
  color: {
    type: String,
    default: "#323233",
  },
  //   图标额外类名
  iconClass: {
    type: String,
    default: "",
  },
  //图标类名前缀
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  //   是否显示图标右上角小红点
  dot: {
    type: Boolean,
    default: false,
  },
  //   图标右上角徽标的内容
  badge: {
    type: [Number, String],
    default: "",
  },

  //   徽标背景颜色
  badgeColor: {
    type: [String],
    default: "#ee0a24",
  },
  //   最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效
  max: {
    type: [String, Number],
  },
  //   设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px
  offset: {
    type: Array,
  },
  //   当 content 为数字 0 或字符串 '0' 时，是否展示徽标
  showZero: {
    type: Boolean,
    default: true,
  },
  //   徽标位置，可选值为 top-left bottom-left bottom-right
  position: {
    type: [String],
    default: "top-right",
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
});
const componentsName = "r-action-bar-icon";
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

const onClick = (e) => emit("click", e);
</script>
<style lang="scss" scoped>
.r-action-bar-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: var(--r-action-bar-icon-width);
  height: var(--r-action-bar-icon-height);
  color: var(--r-action-bar-icon-text-color);
  font-size: var(--r-action-bar-icon-font-size);
  line-height: 1;
  text-align: center;
  background: var(--r-action-bar-icon-background);
  cursor: pointer;

  &:active {
    background-color: var(--r-action-bar-icon-active-color);
  }

  &__icon {
    margin: 0 auto var(--r-padding-base);
    color: var(--r-action-bar-icon-color);
    font-size: var(--r-action-bar-icon-size);
  }
}
</style>
