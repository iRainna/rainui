<template>
  <view
    :class="{
      'r-sidebar-item': true,
      'r-sidebar-item--select': selected,
      'r-sidebar-item--disabled': disabled,
    }"
    :style="getComponentThemeStyle"
    @click="onClick"
  >
    <r-badge
      :dot="dot"
      :content="badge"
      :color="badgeColor"
      :max="max"
      :showZero="showZero"
      :position="position"
    >
      <view class="r-sidebar-item__text">
        <slot v-if="$slots.title" name="title"></slot>
        <text v-else>{{ title }}</text>
      </view>
    </r-badge>
  </view>
</template>
<script setup>
import {
  CONFIG_PROVIDER_KEY,
  SIDEBAR_KEY,
  _,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import {
  defineProps,
  inject,
  computed,
  defineEmits,
  nextTick,
  provide,
  onMounted,
  ref,
} from "vue";
const { uniqueId, findIndex } = _;
const emit = defineEmits(["click"]);
const props = defineProps({
  // 内容
  title: {
    type: [String],
    default: "",
  },
  //   是否显示右上角小红点
  dot: {
    type: Boolean,
    default: false,
  },
  //   图标右上角徽标的内容
  badge: {
    type: [String],

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
  disabled: {
    type: Boolean,
    default: false,
  },
  themeName: {
    type: [String],
    default: "default",
  },
});
const componentsName = "r-sidebar-item";
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

const id = ref(null);

const parentInject = inject(SIDEBAR_KEY, {});

const selected = computed(() => {
  let index = -1;
  if (parentInject?.children?.value?.length) {
    index = findIndex(parentInject?.children?.value, (t) => t.id == id.value);
  }
  if (parentInject?.getActive) {
    return index === parentInject?.getActive();
  }

  return false;
});

const onClick = () => {
  if (props.disabled) {
    return;
  }
  let index = -1;
  if (parentInject?.children?.value?.length) {
    index = findIndex(parentInject?.children?.value, (t) => t.id == id.value);
  }
  if (parentInject?.setActive) {
    parentInject.setActive(index);
  }

  emit("click", index);
};
onMounted(() => {
  console.log("parentInject", parentInject);
  id.value = uniqueId(componentsName + "-");
  if (parentInject.setChildren) {
    parentInject.setChildren({
      id: id.value,
    });
  }
});
</script>
<style lang="scss" scoped>
.r-sidebar-item {
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: var(--r-sidebar-padding);
  overflow: hidden;
  color: var(--r-sidebar-text-color);
  font-size: var(--r-sidebar-font-size);
  line-height: var(--r-sidebar-line-height);
  background: var(--r-sidebar-background);
  cursor: pointer;
  user-select: none;

  &:active {
    background-color: var(--r-sidebar-active-color);
  }

  &:not(:last-child)::after {
    border-bottom-width: 1px;
  }

  &__text {
    word-break: break-all;
  }

  &--select {
    color: var(--r-sidebar-selected-text-color);
    font-weight: var(--r-sidebar-selected-font-weight);

    &,
    &:active {
      background-color: var(--r-sidebar-selected-background);
    }

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: var(--r-sidebar-selected-border-width);
      height: var(--r-sidebar-selected-border-height);
      background-color: var(--r-sidebar-selected-border-color);
      transform: translateY(-50%);
      content: "";
    }
  }

  &--disabled {
    color: var(--r-sidebar-disabled-text-color);
    cursor: not-allowed;

    &:active {
      background-color: var(--r-sidebar-background);
    }
  }
}
</style>
