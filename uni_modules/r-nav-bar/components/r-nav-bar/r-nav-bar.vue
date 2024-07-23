<template>
  <view
    v-if="fixed && placeholder"
    :style="{
      paddingTop: safeAreaInsetTop ? `${safeTop}px` : 0,
      borderBottom: border ? 'solid 1px transparent' : 0,
      height: Rect.height + 'px',
    }"
  ></view>
  <view
    :style="{
      ...getComponentThemeStyle,
      paddingTop: safeAreaInsetTop ? `${safeTop}px` : 0,
      borderBottom: border ? 'solid 1px var(--r-border-color)' : 0,
      zIndex: zIndex,
    }"
    :class="{
      'r-nav-bar': true,
      'r-nav-bar--fixed': fixed,
    }"
  >
    <view
      :class="{
        'r-nav-bar__content': true,
      }"
    >
      <!-- left -->
      <view
        v-if="leftArrow || leftText || !!$slots.left"
        :class="{
          'r-nav-bar__left': true,
          'r-nav-bar__left--disabled': leftDisabled,
        }"
        :hover-class="
          clickable && !leftDisabled ? 'r-haptics-feedback' : 'none'
        "
        @click="onClickLeft"
      >
        <!-- renderLeft -->
        <slot v-if="!!$slots.left" name="left"></slot>
        <template v-else>
          <r-icon
            v-if="leftArrow"
            name="arrow-left"
            size="var(--r-nav-bar-arrow-size)"
            color="var(--r-nav-bar-icon-color)"
            customClass="r-nav-bar__arrow"
          ></r-icon>
          <text
            :class="{
              'r-nav-bar__text': true,
            }"
            v-if="leftText"
            >{{ leftText }}</text
          >
        </template>
      </view>

      <!-- title -->
      <view
        :class="{
          'r-nav-bar__title': true,
          'r-ellipsis': true,
        }"
      >
        <slot name="title" v-if="!!$slots.title"></slot>
        <text>{{ title }}</text>
      </view>

      <view
        v-if="rightText || $slots.right"
        :class="{
          'r-nav-bar__right': true,
          'r-nav-bar__right--disabled': rightDisabled,
        }"
        :hover-class="
          clickable && !rightDisabled ? 'r-haptics-feedback' : 'none'
        "
        @click="onClickRight"
      >
        <!-- renderRight -->
        <slot v-if="$slots.right" name="right"></slot>
        <text
          v-else
          :class="{
            'r-nav-bar__text': true,
          }"
          >{{ rightText }}</text
        >
      </view>
    </view>
  </view>
</template>
<script setup>
import { computed, inject, ref, nextTick, getCurrentInstance } from "vue";
import {
  _,
  CONFIG_PROVIDER_KEY,
  GetRect,
  getSystemInfo,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: "",
  },
  //   左侧文案
  leftText: {
    type: String,
    default: "",
  },
  //   右侧文案
  rightText: {
    type: String,
    default: "",
  },
  //   是否禁用左侧按钮，禁用时透明度降低，且无法点击
  leftDisabled: {
    type: Boolean,
    default: false,
  },
  //   是否禁用右侧按钮，禁用时透明度降低，且无法点击
  rightDisabled: {
    type: Boolean,
    default: false,
  },
  //   是否显示左侧箭头
  leftArrow: {
    type: Boolean,
    default: false,
  },
  //   是否显示下边框
  border: {
    type: Boolean,
    default: true,
  },
  //   是否固定在顶部
  fixed: {
    type: Boolean,
    default: false,
  },
  //   固定在顶部时，是否在标签位置生成一个等高的占位元素
  placeholder: {
    type: Boolean,
    default: false,
  },
  //   导航栏 z-index
  zIndex: {
    type: [Number, String],
    default: 1,
  },
  //   是否开启顶部安全区适配
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  //点击的反馈动画
  clickable: {
    type: Boolean,
    default: true,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
});
const emit = defineEmits(["clickLeft", "clickRight"]);

const componentsName = "r-nav-bar";
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

//安全顶部距离
const safeTop = ref(0);

if (props.safeAreaInsetTop) {
  const data = getSystemInfo();
  safeTop.value = data?.statusBarHeight;
}

const onClickLeft = (event) => {
  if (!props.leftDisabled) {
    emit("clickLeft", event);
  }
};

const onClickRight = (event) => {
  if (!props.rightDisabled) {
    emit("clickRight", event);
  }
};

const Rect = ref({});

nextTick(async () => {
  Rect.value = await GetRect(".r-nav-bar", proxy);
});
</script>
<style lang="scss" scoped>
.r-nav-bar {
  position: relative;
  z-index: var(--r-nav-bar-z-index);
  line-height: var(--r-line-height-lg);
  text-align: center;
  background: var(--r-nav-bar-background);
  user-select: none;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--r-nav-bar-height);
  }

  &__arrow {
    margin-right: var(--r-padding-base);
    font-size: var(--r-nav-bar-arrow-size);
  }

  &__title {
    max-width: 60%;
    margin: 0 auto;
    color: var(--r-nav-bar-title-text-color);
    font-weight: var(--r-font-bold);
    font-size: var(--r-nav-bar-title-font-size);
  }

  &__left,
  &__right {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 var(--r-padding-md);
    font-size: var(--r-font-size-md);

    &--disabled {
      cursor: not-allowed;
      opacity: var(--r-nav-bar-disabled-opacity);
    }
  }

  &__left {
    left: 0;
  }

  &__right {
    right: 0;
  }

  &__text {
    color: var(--r-nav-bar-text-color);
  }
}

.r-ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.r-haptics-feedback {
  cursor: pointer;

  &:active {
    opacity: var(--r-active-opacity);
  }
}
</style>
