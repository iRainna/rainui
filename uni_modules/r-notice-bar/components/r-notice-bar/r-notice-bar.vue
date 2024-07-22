<template>
  <view
    v-if="state.show"
    :class="{
      'r-notice-bar': true,
      'r-notice-bar--wrapable': wrapable,
    }"
    :style="{
      ...getComponentThemeStyle,
      color,
      background,
    }"
    @click="onClick"
  >
    <!-- renderLeftIcon -->
    <slot name="leftIcon" v-if="!!$slots.leftIcon"></slot>
    <view
      v-else-if="leftIcon"
      :class="{
        'r-notice-bar__left-icon': true,
      }"
    >
      <r-icon
        :name="leftIcon"
        color="inherit"
        size="inherit"
        :prefix="prefix"
      ></r-icon>
    </view>

    <!-- renderMarquee -->
    <view
      :class="{
        'r-notice-bar__wrap': true,
      }"
    >
      <view
        :class="{
          'r-notice-bar__content': true,
          'r-ellipsis': scrollable === false && !wrapable,
        }"
        :style="{
          transform: state.offset ? `translateX(${state.offset}px)` : '',
          transitionDuration: `${state.duration}s`,
        }"
      >
        <text
          :class="{
            'r-notice-bar__content-text': true,
          }"
          v-if="!!$slots.default"
        >
          <slot></slot>
        </text>
        <text
          :class="{
            'r-notice-bar__content-text': true,
          }"
          v-else-if="text"
          >{{ text }}</text
        >
      </view>
    </view>
    <!-- renderRightIcon -->
    <slot name="rightIcon" v-if="!!$slots.rightIcon"></slot>
    <view
      v-else-if="['closeable', 'link'].includes(mode)"
      @click.stop="onClickRightIcon"
    >
      <r-icon
        :prefix="prefix"
        :name="mode === 'closeable' ? 'cross' : 'arrow'"
        color="inherit"
        size="inherit"
      ></r-icon>
    </view>
  </view>
</template>
<script setup>
import {
  computed,
  inject,
  ref,
  getCurrentInstance,
  reactive,
  onMounted,
} from "vue";
import {
  _,
  CONFIG_PROVIDER_KEY,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { floor } = _;
const { proxy } = getCurrentInstance();
const emit = defineEmits(["replay", "close", "click"]);
const props = defineProps({
  // 通知栏模式，可选值为 closeable link
  mode: {
    type: String,
    default: "",
  },
  //   通知文本内容
  text: {
    type: String,
    default: "",
  },
  //   通知文本颜色
  color: {
    type: String,
    default: "#ed6a0c",
  },
  //   滚动条背景
  background: {
    type: String,
    default: "#fffbe8",
  },
  //   左侧图标名称
  leftIcon: {
    type: String,
    default: "",
  },
  prefix: {
    type: String,
    default: "van-icon",
  },
  //   动画延迟时间 (ms)
  delay: {
    type: Number,
    default: 1000,
  },
  //   滚动速率 (px/s)
  speed: {
    type: Number,
    default: 60,
  },
  //   是否开启滚动播放
  scrollable: {
    type: Boolean,
    // default: false,
  },
  //   是否开启文本换行，只在禁用滚动时生效
  wrapable: {
    type: Boolean,
    default: false,
  },
  themeName: {
    type: String,
    default: "default",
  },
});
const state = reactive({
  show: true,
  offset: 0,
  duration: 0,
});
const componentsName = "r-notice-bar";
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
const warpRect = ref({});
const contentRect = ref({});
let wrapWidth = 0;
let contentWidth = 0;
const onClick = (event) => {
  emit("click", event);
};
const onClickRightIcon = (event) => {
  if (props.mode === "closeable") {
    state.show = false;
    emit("close", event);
  }
};
const onEnd = () => {
  emit("replay");
  state.offset = warpRect.value.width;
  state.duration = 0;

  setTimeout(() => {
    state.offset = -contentWidth;
    state.duration = (contentWidth + wrapWidth) / +props.speed;

    setTimeout(() => {
      onEnd();
    }, floor(state.duration * 1000));
  }, 1);
};
const init = () => {
  const { delay, speed, scrollable } = props;

  const ms = delay ? delay : 0;

  wrapWidth = 0;
  contentWidth = 0;
  state.offset = 0;
  state.duration = 0;

  setTimeout(() => {
    if (scrollable === false) {
      return;
    }

    const wrapRefWidth = warpRect.value.width;
    const contentRefWidth = contentRect.value.width;

    if (scrollable || contentRefWidth > wrapRefWidth) {
      wrapWidth = wrapRefWidth;
      contentWidth = contentRefWidth;
      state.offset = -contentWidth;
      state.duration = contentWidth / +speed;
    }
    setTimeout(() => {
      onEnd();
    }, floor((contentWidth / +speed) * 1000));
  }, ms);
};
onMounted(async () => {
  warpRect.value = await GetRect(".r-notice-bar__wrap", proxy);
  contentRect.value = await GetRect(".r-notice-bar__content-text", proxy);

  init();
});

defineExpose({
  init,
});
</script>
<style lang="scss" scoped>
.r-notice-bar {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--r-notice-bar-height);
  padding: var(--r-notice-bar-padding);
  color: var(--r-notice-bar-text-color);
  font-size: var(--r-notice-bar-font-size);
  line-height: var(--r-notice-bar-line-height);
  background: var(--r-notice-bar-background);

  &__left-icon,
  &__right-icon {
    min-width: var(--r-notice-bar-icon-min-width);
    font-size: var(--r-notice-bar-icon-size);
  }

  &__right-icon {
    text-align: right;
    cursor: pointer;
  }

  &__wrap {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }

  &__content {
    position: absolute;
    white-space: nowrap;
    transition-timing-function: linear;

    &.r-ellipsis {
      max-width: 100%;
    }
  }

  &--wrapable {
    height: auto;
    padding: var(--r-notice-bar-wrapable-padding);

    .r-notice-bar {
      &__wrap {
        height: auto;
      }

      &__content {
        position: relative;
        white-space: normal;
        word-wrap: break-word;
      }
    }
  }
}

.r-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
