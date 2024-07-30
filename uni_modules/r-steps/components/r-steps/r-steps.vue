<template>
  <view
    :class="{
      'r-steps': true,
      [`r-steps--${direction}`]: true,
    }"
    :style="{
      ...getComponentThemeStyle,
    }"
  >
    <view
      :class="{
        'r-steps__items': true,
      }"
    >
      <slot></slot>
    </view>
  </view>
</template>
<script setup>
import {
  computed,
  inject,
  provide,
  ref,
  getCurrentInstance,
  nextTick,
} from "vue";
import {
  CONFIG_PROVIDER_KEY,
  STEPS_KEY,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["clickStep"]);
const props = defineProps({
  // 当前步骤对应的索引值
  active: {
    type: [Number, String],
    default: 0,
  },
  //   步骤条方向，可选值为 vertical
  direction: {
    type: String,
    default: "horizontal",
  },
  //   当前步骤对应的底部图标
  activeIcon: {
    type: String,
    default: "checked",
  },
  //   非当前步骤对应的底部图标
  inactiveIcon: {
    type: String,
    default: "",
  },
  //   已完成步骤对应的底部图标，优先级高于 inactive-icon，
  finishIcon: {
    type: String,
    default: "",
  },
  //   当前步骤和已完成步骤的颜色
  activeColor: {
    type: String,
    default: "#1989fa",
  },
  //   未激活步骤的颜色
  inactiveColor: {
    type: String,
    default: "#969799",
  },
  //   图标类名前缀
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  //r-theme主题名称
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-steps";
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

const onClickStep = (index) => emit("clickStep", index);
const children = ref([]);
const setChildren = (item) => {
  children.value = [...children.value, item];
};

const stepsRect = ref(null);
nextTick(async () => {
  stepsRect.value = await GetRect(".r-steps__items", proxy);
});
provide(STEPS_KEY, {
  children,
  setChildren,
  onClickStep,
  props,
  stepsRect,
});
</script>
<style lang="scss" scoped>
.r-steps {
  overflow: hidden;
  background-color: var(--r-steps-background);

  &--horizontal {
    padding: 10px 10px 0;

    .r-steps__items {
      position: relative;
      display: flex;
      margin: 0 0 10px;
      padding-bottom: 22px;
    }
  }

  &--vertical {
    padding: 0 0 0 var(--r-padding-xl);
  }
}
</style>
