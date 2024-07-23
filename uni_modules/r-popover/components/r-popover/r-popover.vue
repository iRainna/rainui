<template>
  <view
    :class="{
      'r-popover__wrapper': true,
    }"
    @click.stop="onClickWrapper"
  >
    <slot v-if="$slots.reference" name="reference"></slot>
  </view>
  <r-animation
    :duration="duration"
    :show="show"
    :customStyle="positionStyle"
    @open="onOpen"
    @close="onClose"
    @opened="onOpened"
    @closed="onClosed"
  >
    <view
      :class="{
        'r-popover': true,
        [`r-popover--${theme}`]: true,
      }"
      :style="{
        ...getComponentThemeStyle,
        ...otherStyle,
      }"
    >
      <view
        v-if="showArrow"
        :class="{
          'r-popover__arrow': true,
        }"
        :style="arrowStyle"
      ></view>
      <view
        :class="{
          'r-popover__content': true,
          [`r-popover__content--${actionsDirection}`]: true,
        }"
      >
        <slot v-if="!!$slots.default"></slot>
        <template v-else>
          <!-- renderAction -->
          <view
            v-for="(action, index) in actions"
            :key="index"
            :class="{
              'r-popover__action': true,
              'r-popover__action--disabled': action.disabled,
              'r-popover__action--with-icon': action.icon,
              'r-hairline--right': actionsDirection === 'horizontal',
              [`${action.className}`]: true,
            }"
            :style="{
              color: action.color,
            }"
            @click.stop="onClickAction(action, index)"
          >
            <!-- renderActionContent -->
            <slot v-if="!!$slots.action" :action="action" :index="index"></slot>
            <template v-else>
              <view
                :class="{
                  'r-popover__action-icon': true,
                }"
                v-if="action.icon"
              >
                <r-icon
                  :name="action.icon"
                  :prefix="iconPrefix"
                  color="inherit"
                  size="inherit"
                />
              </view>
              <view
                :class="{
                  'r-popover__action-text': true,
                  'r-hairline--bottom': actionsDirection === 'vertical',
                }"
              >
                {{ action.text }}
              </view>
            </template>
          </view>
        </template>
      </view>
    </view>
  </r-animation>
</template>
<script>
export default {
  options: { styleIsolation: "shared" },
};
</script>
<script setup>
import {
  computed,
  ref,
  inject,
  nextTick,
  getCurrentInstance,
  onMounted,
} from "vue";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import {
  _,
  CONFIG_PROVIDER_KEY,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";

const { proxy } = getCurrentInstance();
const emit = defineEmits([
  "select",
  "update:show",
  "open",
  "opened",
  "close",
  "closed",
]);
const props = defineProps({
  // 是否展示气泡弹出层
  show: {
    type: Boolean,
    default: false,
  },
  //   选项列表
  actions: {
    type: Array,
    default: () => [],
  },
  //   选项列表的排列方向，可选值为 horizontal
  actionsDirection: {
    type: String,
    default: "vertical",
  },
  //   弹出位置 top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
  placement: {
    type: String,
    default: "bottom",
  },
  //   主题风格，可选值为 dark
  theme: {
    type: String,
    default: "light",
  },

  //   动画时长，单位秒，设置为 0 可以禁用动画
  duration: {
    type: Number,
    default: 300,
  },

  //   是否展示小箭头
  showArrow: {
    type: Boolean,
    default: true,
  },
  //   是否在点击选项后关闭
  closeOnClickAction: {
    type: Boolean,
    default: true,
  },

  //   图标类名前缀，等同于 r-icon 组件的 class-prefix 属性
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  //层级
  zIndex: {
    type: Number,
    default: 2000,
  },
  //弹出框与内容之间的距离
  gap: {
    style: String,
    default: "8rpx",
  },
  //  r-theme 主题名称
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-popover";
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
const show = computed({
  get: () => props.show,
  set: (val) => {
    emit("update:show", val);
  },
});
const wrapperRect = ref({});
const contentRect = ref({});
const onOpen = () => {
  getConentRect();
  emit("open");
};
const onClose = () => {
  emit("close");
};
const onOpened = () => {
  emit("opened");
};
const onClosed = () => {
  emit("closed");
};
const positionStyle = computed(() => {
  const cssVar = {
    position: "relative",
    zIndex: props.zIndex,
  };
  const wrapperRectWidth = wrapperRect.value?.width || 0;
  const wrapperRectHeight = wrapperRect.value?.height || 0;
  const contentRectWidth = contentRect.value?.width || 0;
  const contentRectHeight = contentRect.value?.height || 0;
  const gap = props.gap;
  switch (props.placement) {
    case "bottom":
      cssVar.top = gap;
      cssVar.left = `${(wrapperRectWidth - contentRectWidth) / 2}px`;
      break;

    case "bottom-start":
      cssVar.top = gap;
      break;

    case "bottom-end":
      cssVar.top = gap;
      cssVar.left = `${wrapperRectWidth - contentRectWidth}px`;
      break;

    case "top":
      cssVar.top = `calc(${-wrapperRectHeight - contentRectHeight}px - ${
        props.showArrow ? "var(--r-popover-arrow-size)" : 0
      } - ${gap})`;

      cssVar.marginLeft = `${(wrapperRectWidth - contentRectWidth) / 2}px`;
      break;

    case "top-start":
      cssVar.top = `calc(${-wrapperRectHeight - contentRectHeight}px - ${
        props.showArrow ? "var(--r-popover-arrow-size)" : 0
      } - ${gap})`;
      break;

    case "top-end":
      cssVar.top = `calc(${-wrapperRectHeight - contentRectHeight}px - ${
        props.showArrow ? "var(--r-popover-arrow-size)" : 0
      } - ${gap})`;

      cssVar.marginLeft = `${wrapperRectWidth - contentRectWidth}px`;
      break;

    case "left":
      cssVar.left = `calc(${-contentRectWidth}px - ${
        props.showArrow ? "var(--r-popover-arrow-size)" : 0
      } - ${gap})`;

      cssVar.top = `calc((${-wrapperRectHeight - contentRectHeight}px ) / 2)`;

      break;

    case "left-start":
      cssVar.left = `calc(${-contentRectWidth}px - ${
        props.showArrow ? "var(--r-popover-arrow-size)" : 0
      } - ${gap})`;

      cssVar.top = `${-wrapperRectHeight}px `;

      break;

    case "left-end":
      cssVar.left = `calc(${-contentRectWidth}px - ${
        props.showArrow ? "var(--r-popover-arrow-size)" : 0
      } - ${gap})`;

      cssVar.top = `${-contentRectHeight}px `;

      break;

    case "right":
      cssVar.left = `calc(${wrapperRectWidth}px  + ${gap})`;

      cssVar.top = `calc((${-wrapperRectHeight - contentRectHeight}px ) / 2)`;

      break;

    case "right-start":
      cssVar.left = `calc(${wrapperRectWidth}px  + ${gap})`;

      cssVar.top = `${-wrapperRectHeight}px `;

      break;
    case "right-end":
      cssVar.left = `calc(${wrapperRectWidth}px  + ${gap})`;

      cssVar.top = `${-contentRectHeight}px `;

      break;
  }

  return cssVar;
});
const otherStyle = computed(() => {
  let cssVar = {};
  switch (props.placement) {
    case "top":
      cssVar["transform-origin"] = "50% 100%";
      cssVar["margin-bottom"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;

    case "top-start":
      cssVar["transform-origin"] = "0 100%";
      cssVar["margin-bottom"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;

    case "top-end":
      cssVar["transform-origin"] = "100% 100%";
      cssVar["margin-bottom"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;

    case "bottom":
      cssVar["transform-origin"] = "50% 0";
      cssVar["margin-top"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;

    case "bottom-start":
      cssVar["transform-origin"] = "0 0";
      cssVar["margin-top"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;
    case "bottom-end":
      cssVar["transform-origin"] = "100% 0";
      cssVar["margin-top"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;

    case "left":
      cssVar["transform-origin"] = "100% 50%";
      cssVar["margin-right"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;
    case "left-start":
      cssVar["transform-origin"] = "100% 0";
      cssVar["margin-right"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;
    case "left-end":
      cssVar["transform-origin"] = "100% 100%";
      cssVar["margin-right"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;

    case "right":
      cssVar["transform-origin"] = "0 50%";
      cssVar["margin-left"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;
    case "right-start":
      cssVar["transform-origin"] = "0 0";
      cssVar["margin-left"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;
    case "right-end":
      cssVar["transform-origin"] = "0 100%";
      cssVar["margin-left"] = props.showArrow
        ? "var(--r-popover-arrow-size)"
        : 0;
      break;
  }

  return cssVar;
});
const arrowStyle = computed(() => {
  let cssVar = {};
  //   top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
  if (["top", "top-start", "top-end"].includes(props.placement)) {
    cssVar["bottom"] = 0;
    cssVar["border-top-color"] = "currentColor";
    cssVar["border-bottom-width"] = 0;
    cssVar["margin-bottom"] = `calc(var(--r-popover-arrow-size) * -1)`;

    if (props.placement == "top") {
      cssVar["left"] = "50%";
      cssVar["transform"] = "translateX(-50%)";
    } else if (props.placement == "top-start") {
      cssVar["left"] = "var(--r-padding-md)";
    } else if (props.placement == "top-end") {
      cssVar["right"] = "var(--r-padding-md)";
    }
  } else if (["left", "left-start", "left-end"].includes(props.placement)) {
    cssVar["right"] = 0;
    cssVar["border-left-color"] = "currentColor";
    cssVar["border-right-width"] = 0;
    cssVar["margin-right"] = `calc(var(--r-popover-arrow-size) * -1)`;

    if (props.placement == "left") {
      cssVar["top"] = "50%";
      cssVar["transform"] = " translateY(-50%)";
    } else if (props.placement == "left-start") {
      cssVar["top"] = "var(--r-padding-md)";
    } else if (props.placement == "left-end") {
      cssVar["bottom"] = "var(--r-padding-md)";
    }
  } else if (["right", "right-start", "right-end"].includes(props.placement)) {
    cssVar["left"] = 0;
    cssVar["border-right-color"] = "currentColor";
    cssVar["border-left-width"] = 0;
    cssVar["margin-left"] = `calc(var(--r-popover-arrow-size) * -1)`;

    if (props.placement == "right") {
      cssVar["top"] = "50%";
      cssVar["transform"] = " translateY(-50%)";
    } else if (props.placement == "right-start") {
      cssVar["top"] = "var(--r-padding-md)";
    } else if (props.placement == "right-end") {
      cssVar["bottom"] = "var(--r-padding-md)";
    }
  } else if (
    ["bottom", "bottom-start", "bottom-end"].includes(props.placement)
  ) {
    cssVar["top"] = 0;
    cssVar["border-bottom-color"] = "currentColor";
    cssVar["border-top-width"] = 0;
    cssVar["margin-top"] = `calc(var(--r-popover-arrow-size) * -1)`;

    if (props.placement == "bottom") {
      cssVar["left"] = "50%";
      cssVar["transform"] = " translateX(-50%)";
    } else if (props.placement == "bottom-start") {
      cssVar["left"] = "var(--r-padding-md)";
    } else if (props.placement == "bottom-end") {
      cssVar["right"] = "var(--r-padding-md)";
    }
  }

  return cssVar;
});
const onClickAction = (action, index) => {
  if (action.disabled) {
    return;
  }

  emit("select", action, index);

  if (props.closeOnClickAction) {
    show.value = false;
  }
};

const onClickWrapper = () => {
  show.value = !show.value;
};
const getConentRect = () => {
  nextTick(async () => {
    wrapperRect.value = await GetRect(".r-popover__wrapper", proxy);
    contentRect.value = await GetRect(".r-popover", proxy);
  });
};

defineExpose({
  getConentRect,
});
</script>
<style lang="scss" scoped>
.r-popover {
  position: absolute;
  overflow: visible;
  background-color: transparent;
  transition: opacity 0.15s, transform 0.15s;

  &__wrapper {
    display: inline-block;
  }

  &__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: var(--r-popover-arrow-size);
  }

  &__content {
    overflow: hidden;
    border-radius: var(--r-popover-radius);

    &--horizontal {
      display: flex;
      width: max-content;

      .r-popover__action {
        flex: none;
        width: auto;
        height: var(--r-popover-horizontal-action-height);
        padding: 0 var(--r-padding-sm);

        &:last-child::after {
          display: none;
        }

        &-icon {
          margin-right: var(--r-padding-base);
          font-size: var(--r-popover-horizontal-action-icon-size);
        }
      }
    }
  }

  &__action {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: var(--r-popover-action-width);
    height: var(--r-popover-action-height);
    padding: 0 var(--r-padding-md);
    font-size: var(--r-popover-action-font-size);
    line-height: var(--r-line-height-md);
    cursor: pointer;

    &:last-child {
      .r-popover__action-text::after {
        display: none;
      }
    }

    &-text {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &-icon {
      margin-right: var(--r-padding-xs);
      font-size: var(--r-popover-action-icon-size);
    }

    &--with-icon {
      .r-popover__action-text {
        justify-content: flex-start;
      }
    }
  }

  &--light {
    color: var(--r-popover-light-text-color);

    .r-popover__content {
      background: var(--r-popover-light-background);
      box-shadow: 0 2px 12px rgba(50, 50, 51, 0.12);
    }

    .r-popover__arrow {
      color: var(--r-popover-light-background);
    }

    .r-popover__action {
      &:active {
        background-color: var(--r-active-color);
      }

      &--disabled {
        color: var(--r-popover-light-action-disabled-text-color);
        cursor: not-allowed;

        &:active {
          background-color: transparent;
        }
      }
    }
  }

  &--dark {
    color: var(--r-popover-dark-text-color);

    .r-popover__content {
      background: var(--r-popover-dark-background);
    }

    .r-popover__arrow {
      color: var(--r-popover-dark-background);
    }

    .r-popover__action {
      &:active {
        background-color: rgba(0, 0, 0, 0.2);
      }

      &--disabled {
        color: var(--r-popover-dark-action-disabled-text-color);

        &:active {
          background-color: transparent;
        }
      }
    }

    .r-popover__action-text {
      &::after {
        border-color: var(--r-gray-7);
      }
    }
  }
}
.r-hairline--right {
  border-right: solid 1px var(--r-border-color);
}
.r-hairline--bottom {
  border-bottom: solid 1px var(--r-border-color);
}
</style>
