<template>
  <r-overlay
    v-model:show="show"
    :color="data.overlay ? '' : 'transparent'"
    :lockScroll="false"
    :entryClass="data.entryClass"
    :exitClass="data.exitClass"
    :duration="500"
    :customStyle="data.overlayStyle"
    :customClass="data.overlayClass"
    @click="clickOverlay"
    @close="close"
    @opened="opened"
    :style="{
      ...getComponentThemeStyle,
      'pointer-events': data.overlay ? 'auto' : 'none',
    }"
  >
    <view
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 20% 0;
      "
      :style="{
        ...getComponentThemeStyle,
        'justify-content': getPosition,
      }"
    >
      <view
        :style="{ ...customStyle }"
        :class="{
          'r-toast': true,
          [`r-toast--${data.type}`]: true,
          [`r-toast--${data.wordBreak}`]: true,

          [customClass]: true,
        }"
        @click="clickContent"
      >
        <r-icon
          v-if="data.icon || data.type === 'success' || data.type === 'fail'"
          :name="data.icon || data.type"
          :size="data.iconSize"
          color="var(--r-toast-text-color)"
          :class="`r-toast__icon`"
          :prefix="data.iconPrefix"
        />
        <view v-if="data.type === 'loading'" :class="`r-toast__loading`">
          <r-loading :size="data.iconSize" :type="data.loadingType"></r-loading
        ></view>

        <view v-if="$slots.message" class="r-toast__text">
          <slot name="message" />
        </view>
        <view v-else-if="data.message" class="r-toast__text">
          {{ data.message }}
        </view>
      </view>
    </view>
  </r-overlay>
</template>
<script setup>
import {
  defineProps,
  defineEmits,
  watch,
  computed,
  ref,
  defineExpose,
  inject,
} from "vue";
import ToastProps from "./props.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
const props = defineProps({ ...ToastProps });

const componentsName = "r-toast";
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

const emit = defineEmits(["close", "opened"]);
// 显隐
const show = ref(false);
//改变显隐状态
const changeShow = (flag) => {
  show.value = flag;
};
//数据
const data = ref({
  position: "middle",
});

//设置数据
const setData = (e) => {
  changeShow(true);
  data.value = {
    ...props,
    ...e,
  };

  setTimeout(() => {
    changeShow(false);
  }, data?.value?.duration || 3000);
};
//设置位置
const getPosition = computed(() => {
  if (data.value.position == "middle") {
    return "center";
  }
  if (data.value.position == "top") {
    return "flex-start";
  }
  if (data.value.position == "bottom") {
    return "flex-end";
  }
});
//点击内容区
const clickContent = () => {
  if (data.value.closeOnClick) {
    changeShow(false);
  }
};
// 关闭时的回调函数
const close = () => {
  emit("close");
};
// 完全展示后的回调函数
const opened = () => {
  emit("opened");
};
//点击遮罩层
const clickOverlay = () => {
  if (data.value.closeOnClickOverlay) {
    changeShow(false);
  }
};

defineExpose({ setData, changeShow });
</script>
<style lang="scss" scoped>
.r-toast {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  transition: all var(--r-duration-fast);

  // hack for avoid max-width when use left & fixed
  width: var(--r-toast-default-width);
  max-width: var(--r-toast-max-width);
  min-height: var(--r-toast-default-min-height);
  padding: var(--r-toast-default-padding);
  color: var(--r-toast-text-color);
  font-size: var(--r-toast-font-size);
  line-height: var(--r-toast-line-height);

  // allow newline character
  white-space: pre-wrap;
  word-break: break-all;
  text-align: center;
  background: var(--r-toast-background);
  border-radius: var(--r-toast-radius);

  &--break {
    &-normal {
      word-break: normal;
      word-wrap: normal;
    }

    &-word {
      word-break: normal;
      word-wrap: break-word;
    }
  }

  &--text,
  &--html {
    width: fit-content;
    min-width: var(--r-toast-text-min-width);
    min-height: 0;
    padding: var(--r-toast-text-padding);

    .r-toast__text {
      margin-top: 0;
    }
  }

  &--top {
    margin-top: var(--r-toast-position-top-distance);
  }

  &--bottom {
    top: auto;
    margin-bottom: var(--r-toast-position-bottom-distance);
  }

  &__icon {
    font-size: var(--r-toast-icon-size);
  }

  &__loading {
    padding: var(--r-padding-base);
    color: var(--r-toast-loading-icon-color);
  }

  &__text {
    margin-top: var(--r-padding-xs);
  }
}
</style>
