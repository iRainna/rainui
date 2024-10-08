<template>
  <view
    :class="{
      'r-action-sheet': true,
    }"
    :style="getComponentThemeStyle"
  >
    <!-- renderHeader -->
    <view
      :class="{
        'r-action-sheet__header': true,
      }"
      v-if="title"
    >
      <text>{{ title }}</text>
      <view
        :class="{
          'r-action-sheet__close': true,
        }"
        v-if="closeable"
      >
        <r-icon
          :name="closeIcon"
          :prefix="iconPrefix"
          color="inherit"
          size="inherit"
          @click="onCancel"
        ></r-icon>
      </view>
    </view>
    <!-- renderDescription -->
    <view
      :class="{
        'r-action-sheet__description': true,
      }"
      v-if="$slots.description || description"
    >
      <slot v-if="$slots.description" name="description" />
      <text v-else-if="description">{{ description }}</text>
    </view>
    <view
      :class="{
        'r-action-sheet__content': true,
      }"
      v-if="$slots.default"
    >
      <slot></slot>
    </view>
    <view
      v-else
      :class="{
        'r-action-sheet__content': true,
      }"
    >
      <!-- renderAction -->

      <view
        v-for="(action, index) in actions"
        :key="index"
        :style="{
          color: action.color,
        }"
        :class="{
          'r-action-sheet__item': true,
          'r-action-sheet__item--loading': action.loading,
          'r-action-sheet__item--disabled': action.disabled,
          [`${action.className}`]: true,
        }"
        @click="onClick(action, index)"
      >
        <!-- renderIcon -->
        <view
          v-if="action.icon"
          :class="{
            'r-action-sheet__item-icon': true,
          }"
        >
          <r-icon
            :prefix="action && action.prefix ? action.prefix : iconPrefix"
            color="inherit"
            size="inherit"
            :name="action.icon"
          ></r-icon>
        </view>

        <!-- renderActionContent -->
        <view
          v-if="action.loading"
          :class="{
            'r-action-sheet__loading-icon': true,
          }"
        >
          <r-loading color="inherit" size="inherit"></r-loading>
        </view>

        <slot
          v-else-if="$slots.action"
          :action="action"
          :index="index"
          name="action"
        />
        <template v-else>
          <text
            :class="{
              'r-action-sheet__name': true,
            }"
          >
            {{ action.name }}
          </text>
          <view
            v-if="action.subname"
            :class="{
              'r-action-sheet__subname': true,
            }"
          >
            {{ action.subname }}
          </view>
        </template>
      </view>
    </view>
    <!-- renderCancel -->
    <view
      :class="{
        'r-action-sheet__gap': true,
      }"
      v-if="$slots.cancel || cancelText"
    ></view>
    <view
      :class="{
        'r-action-sheet__cancel': true,
      }"
      @click="onCancel"
      v-if="$slots.cancel || cancelText"
    >
      <slot name="cancel" v-if="$slots.cancel"></slot>
      <text v-else-if="cancelText">{{ cancelText }}</text>
    </view>
  </view>
</template>
<script>
export default {
  options: { styleIsolation: "shared" },
};
</script>
<script setup>
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { inject, computed, nextTick } from "vue";

const props = defineProps({
  //   面板选项列表
  actions: {
    type: Array,
    default: () => [],
  },
  //   顶部标题
  title: {
    type: String,
    default: "",
  },
  //   取消按钮文字
  cancelText: {
    type: String,
    default: "",
  },
  //   选项上方的描述信息
  description: {
    type: String,
    default: "",
  },
  //是否显示关闭图标
  closeable: {
    type: Boolean,
    default: true,
  },
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  //   关闭图标名称
  closeIcon: {
    type: String,
    default: "cross",
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
});

console.log("props", props);
const componentsName = "r-action-sheet";
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

const emit = defineEmits(["update:show", "cancel", "select"]);

const onCancel = () => {
  emit("update:show", false);
  nextTick(() => {
    emit("cancel");
  });
};

const onClick = (action, index) => {
  const { loading, disabled } = action;

  if (disabled || loading) {
    return;
  }

  if (props.closeOnClickAction) {
    emit("update:show", false);
  }

  nextTick(() => emit("select", action, index));
};
</script>
<style lang="scss" scoped>
::v-deep .r-action-sheet {
  display: flex;
  flex-direction: column;
  max-height: var(--r-action-sheet-max-height);
  overflow: hidden;
  color: var(--r-action-sheet-item-text-color);

  &__content {
    flex: 1 auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__item,
  &__cancel {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px var(--r-padding-md);
    font-size: var(--r-action-sheet-item-font-size);
    background: var(--r-action-sheet-item-background);
    border: none;
    cursor: pointer;
    box-sizing: border-box;

    &:active {
      background-color: var(--r-active-color);
    }
  }

  &__item {
    line-height: var(--r-action-sheet-item-line-height);

    &--loading,
    &--disabled {
      color: var(--r-action-sheet-item-disabled-text-color);

      &:active {
        background-color: var(--r-action-sheet-item-background);
      }
    }

    &--disabled {
      cursor: not-allowed;
    }

    &--loading {
      cursor: default;
    }

    &-icon {
      font-size: var(--r-action-sheet-item-icon-size);
      margin-right: var(--r-action-sheet-item-icon-margin-right);
    }
  }

  &__cancel {
    flex-shrink: 0;
    box-sizing: border-box;
    color: var(--r-action-sheet-cancel-text-color);
  }

  &__subname {
    width: 100%;
    text-align: center;
    margin-top: var(--r-padding-xs);
    color: var(--r-action-sheet-subname-color);
    font-size: var(--r-action-sheet-subname-font-size);
    line-height: var(--r-action-sheet-subname-line-height);
    overflow-wrap: break-word;
  }

  &__gap {
    display: block;
    height: var(--r-action-sheet-cancel-padding-top);
    background: var(--r-action-sheet-cancel-padding-color);
  }

  &__header {
    flex-shrink: 0;
    font-weight: var(--r-font-bold);
    font-size: var(--r-action-sheet-header-font-size);
    line-height: var(--r-action-sheet-header-height);
    text-align: center;
  }

  &__description {
    position: relative;
    flex-shrink: 0;
    padding: 20px var(--r-padding-md);
    color: var(--r-action-sheet-description-color);
    font-size: var(--r-action-sheet-description-font-size);
    line-height: var(--r-action-sheet-description-line-height);
    text-align: center;

    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: var(--r-padding-md);
      bottom: 0;
      left: var(--r-padding-md);
      border-bottom: 1px solid var(--r-border-color);
      transform: scaleY(0.5);
    }
  }

  &__loading-icon .r-loading__spinner {
    width: var(--r-action-sheet-loading-icon-size);
    height: var(--r-action-sheet-loading-icon-size);
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: var(--r-action-sheet-close-icon-padding);
    color: var(--r-action-sheet-close-icon-color);
    font-size: var(--r-action-sheet-close-icon-size);
    line-height: inherit;
  }
}
</style>
