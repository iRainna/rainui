<template>
  <view
    :class="{
      'r-tabbar-item': true,
      'r-tabbar-item--active': active,
    }"
    :style="{
      ...getComponentThemeStyle,
      color,
      width: widthComp + 'px',
    }"
    @click="onClick"
  >
    <view
      :class="{
        'r-tabbar-item__icon': true,
      }"
    >
      <r-badge
        :dot="dot"
        :content="badge"
        :color="badgeColor"
        :max="max"
        :showZero="showZero"
        :position="position"
      >
        <!-- renderIcon -->
        <slot name="icon" v-if="$slots.icon" :active="active"></slot>
        <r-icon
          v-else-if="icon"
          :name="icon"
          :prefix="iconPrefix"
          size="var(--r-tabbar-item-icon-size)"
          :color="color"
        ></r-icon>
      </r-badge>
      <view
        :class="{
          'r-tabbar-item__text': true,
        }"
        :style="{
          color,
        }"
      >
        <slot></slot>
      </view>
    </view>
  </view>
</template>
<script setup>
import { computed, inject, ref, onMounted } from "vue";
import {
  _,
  CONFIG_PROVIDER_KEY,
  TABBAR_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { uniqueId, findIndex } = _;
const emit = defineEmits(["click"]);
const props = defineProps({
  name: {
    type: [String, Number],
  },
  icon: {
    type: String,
    default: "",
  },
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  dot: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: [String, Number],
    default: "",
  },
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
  //  主题
  themeName: {
    type: [String],
    default: "default",
  },
});
const componentsId = ref(0);
const componentsName = "r-tabbar-item";
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

const parentInject = inject(TABBAR_KEY, {});

const widthComp = computed(() => {
  let width = 0;
  if (parentInject?.Rect?.value?.width) {
    width = parentInject.Rect.value.width;
  }
  let length = 1;
  if (parentInject?.children?.value?.length) {
    length = parentInject?.children?.value?.length;
  }

  return width / length;
});
const index = computed(() => {
  let list = [];
  if (parentInject?.children?.value?.length) {
    list = parentInject.children.value;
  }
  return findIndex(list, (t) => t.id == componentsId.value);
});
const active = computed(() => {
  let parentValue = parentInject?.props?.value;

  return props.name === parentValue || index.value === parentValue;
});

const color = computed(() => {
  const { activeColor, inactiveColor } = parentInject.props;
  return active.value ? activeColor : inactiveColor;
});
const onClick = (event) => {
  if (!active.value) {
    parentInject.setActive(props.name || index.value);
  }
  emit("click", event);
};
onMounted(() => {
  componentsId.value = uniqueId(componentsName + "-");
  if (parentInject?.setChildren) {
    parentInject.setChildren({
      id: componentsId.value,
    });
  }
});
</script>
<style lang="scss" scoped>
.r-tabbar-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--r-tabbar-item-text-color);
  font-size: var(--r-tabbar-item-font-size);
  line-height: var(--r-tabbar-item-line-height);
  cursor: pointer;

  &__icon {
    margin-bottom: var(--r-tabbar-item-icon-margin-bottom);
    font-size: var(--r-tabbar-item-icon-size);
    padding-top: var(--r-padding-base);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &--active {
    color: var(--r-tabbar-item-active-color);
    background-color: var(--r-tabbar-item-active-background);
  }
  &__text {
    padding-top: var(--r-padding-base);
    font-size: var(--r-tabbar-item-font-size);
    line-height: var(--r-tabbar-item-line-height);
  }
}
</style>
