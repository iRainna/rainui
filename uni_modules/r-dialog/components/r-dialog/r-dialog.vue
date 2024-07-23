<template>
  <r-popup
    :show="show"
    position="center"
    :closeOnClickOverlay="closeOnClickOverlay"
    :overlayStyle="overlayStyle"
    :overlay="overlay"
    :overlayClass="overlayClass"
    :lockScroll="lockScroll"
    :zIndex="zIndex"
    @closed="onClosed"
    @close="onClose"
    @opened="onOpened"
    @open="onOpen"
    @update:show="updateShow"
  >
    <view
      :class="{
        'r-dialog': true,
        [`r-dialog--${theme}`]: true,
      }"
      :style="{
        ...getComponentThemeStyle,
        width,
      }"
    >
      <!-- renderTitle -->
      <view
        v-if="!!$slots.title || title"
        :class="{
          'r-dialog__header': true,
          'r-dialog__header--isolated': !message && !$slots.default,
        }"
      >
        <slot v-if="!!$slots.title" name="title"></slot>
        <text v-else>{{ title }}</text>
      </view>
      <!-- renderContent -->
      <view
        v-if="!!$slots.default"
        :class="{
          'r-dialog__content': true,
        }"
      >
        <slot></slot>
      </view>
      <view
        v-else
        :class="{
          'r-dialog__content': true,
          'r-dialog__content--isolated': !!title || !!$slots.title,
        }"
      >
        <!-- renderMessage -->
        <view
          :class="{
            'r-dialog__message': true,
            'r-dialog__message--has-title': true,
            [`r-dialog__message--${messageAlign}`]: messageAlign,
          }"
        >
          {{ message }}
        </view>
      </view>

      <!-- renderFooter -->
      <slot name="footer" v-if="!!$slots.footer"></slot>

      <!-- renderButtons -->
      <view
        :class="{
          'r-dialog__footer': true,
          'r-border-top': true,
        }"
      >
        <r-button
          v-if="showCancelButton"
          size="large"
          :class="{
            'r-dialog__cancel': true,
          }"
          customClass="r-dialog__cancel"
          :customStyle="{
            color: cancelButtonColor,
            border: 0,
          }"
          :loading="loading.cancel"
          :disabled="cancelButtonDisabled"
          @click="onCancel"
          >{{ cancelButtonText }}</r-button
        >
        <view class="r-border-left" v-if="showCancelButton"></view>
        <r-button
          v-if="showConfirmButton"
          size="large"
          :class="{
            'r-dialog__confirm': true,
          }"
          customClass="r-dialog__confirm"
          :customStyle="{
            color: confirmButtonColor,
            border: 0,
          }"
          :loading="loading.confirm"
          :disabled="confirmButtonDisabled"
          @click="onConfirm"
          >{{ confirmButtonText }}</r-button
        >
      </view>
    </view>
  </r-popup>
</template>
<script setup>
import { reactive, computed, inject } from "vue";
import {
  _,
  CONFIG_PROVIDER_KEY,
  callInterceptor,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const emit = defineEmits([
  "confirm",
  "cancel",
  "update:show",
  "closed",
  "close",
  "open",
  "opened",
]);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    default: "default",
  },
  width: {
    type: String,
    default: "320px",
  },
  message: {
    type: String,
    default: "",
  },
  //   内容水平对齐方式，可选值为 left right justify
  messageAlign: {
    type: String,
    default: "center",
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },

  showCancelButton: {
    type: Boolean,
    default: false,
  },
  confirmButtonText: {
    type: String,
    default: "确认",
  },
  confirmButtonColor: {
    type: String,
    default: "#1989fa",
  },
  confirmButtonDisabled: {
    type: Boolean,
    default: false,
  },
  cancelButtonText: {
    type: String,
    default: "取消",
  },
  cancelButtonColor: {
    type: String,
    default: "black",
  },
  cancelButtonDisabled: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  overlayClass: {
    type: String,
    default: "",
  },
  overlayStyle: {
    type: Object,
    default: () => {},
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  beforeClose: {
    type: Function,
  },
  themeName: {
    type: String,
    default: "default",
  },
});
const componentsName = "r-highlight";
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

const loading = reactive({
  confirm: false,
  cancel: false,
});
const updateShow = (value) => emit("update:show", value);
const close = () => {
  updateShow(false);
};
const getActionHandler = (action) => {
  if (!props.show) {
    return;
  }

  emit(action);

  if (props.beforeClose) {
    loading[action] = true;
    callInterceptor(props.beforeClose, {
      args: [action],
      done() {
        close(action);
        loading[action] = false;
      },
      canceled() {
        loading[action] = false;
      },
    });
  } else {
    close(action);
  }
};
const onCancel = () => getActionHandler("cancel");
const onConfirm = () => getActionHandler("confirm");

// 关闭弹出层且动画结束后触发
const onClosed = () => {
  emit("closed");
};
// 关闭弹出层时立即触发
const onClose = () => {
  emit("close");
};
// 打开弹出层时立即触发
const onOpen = () => {
  emit("open");
};
// 打开弹出层且动画结束后触发
const onOpened = () => {
  emit("opened");
};
</script>
<style lang="scss" scoped>
.r-border-top {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: 1px solid var(--r-border-color);
    transform: scaleY(0.5);
  }
}
.r-border-left {
  border-left: 1px solid var(--r-border-color);
  transform: scaleX(0.5);
}
.r-dialog {
  top: 45%;
  width: var(--r-dialog-width);
  overflow: hidden;
  font-size: var(--r-dialog-font-size);
  background: var(--r-dialog-background);
  border-radius: var(--r-dialog-radius);
  backface-visibility: hidden; // avoid blurry text after scale animation
  transition: var(--r-dialog-transition);
  transition-property: transform, opacity;

  @media (max-width: 321px) {
    width: var(--r-dialog-small-screen-width);
  }

  &__header {
    color: var(--r-text-color);
    padding-top: var(--r-dialog-header-padding-top);
    font-weight: var(--r-dialog-header-font-weight);
    line-height: var(--r-dialog-header-line-height);
    text-align: center;

    &--isolated {
      padding: var(--r-dialog-header-isolated-padding);
    }
  }

  &__content {
    &--isolated {
      display: flex;
      align-items: center;
      min-height: 104px;
    }
  }

  &__message {
    color: var(--r-text-color);
    flex: 1;
    max-height: var(--r-dialog-message-max-height);
    padding: 26px var(--r-dialog-message-padding);
    overflow-y: auto;
    font-size: var(--r-dialog-message-font-size);
    line-height: var(--r-dialog-message-line-height);

    // allow newline character
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
    -webkit-overflow-scrolling: touch;

    &--has-title {
      padding-top: var(--r-dialog-has-title-message-padding-top);
      color: var(--r-dialog-has-title-message-text-color);
    }

    &--left {
      text-align: left;
    }

    &--right {
      text-align: right;
    }

    &--justify {
      text-align: justify;
    }
  }

  &__footer {
    display: flex;
    overflow: hidden;
    user-select: none;
  }

  &__confirm,
  &__cancel {
    flex: 1;
    height: var(--r-dialog-button-height);
    margin: 0;
    border: 0;
    border-radius: 0;
  }

  &__confirm {
    &,
    &:active {
      color: var(--r-dialog-confirm-button-text-color);
    }
  }

  &--round-button {
    .r-dialog__footer {
      position: relative;
      height: auto;
      padding: var(--r-padding-xs) var(--r-padding-lg) var(--r-padding-md);
    }

    .r-dialog__message {
      padding-bottom: var(--r-padding-md);
      color: var(--r-text-color);
    }

    .r-dialog__confirm,
    .r-dialog__cancel {
      height: var(--r-dialog-round-button-height);
    }

    .r-dialog__confirm {
      color: var(--r-white);
    }

    .r-action-bar-button {
      &--first {
        border-top-left-radius: var(--r-radius-max);
        border-bottom-left-radius: var(--r-radius-max);
      }

      &--last {
        border-top-right-radius: var(--r-radius-max);
        border-bottom-right-radius: var(--r-radius-max);
      }
    }
  }

  &-bounce-enter-from {
    transform: translate3d(0, -50%, 0) scale(0.7);
    opacity: 0;
  }

  &-bounce-leave-active {
    transform: translate3d(0, -50%, 0) scale(0.9);
    opacity: 0;
  }
}
</style>
