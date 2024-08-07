<template>
  <r-animation
    :show="show"
    :entryClass="entryClass"
    :exitClass="exitClass"
    :duration="duration"
    :delay="delay"
    :customStyle="customTransitionStyle"
  >
    <!-- renderTag -->
    <span
      :class="{
        'r-tag': true,
        ['r-tag--' + type]: true,
        ['r-tag--' + size]: true,
        'r-tag--plain': plain,
        'r-tag--mark': mark,
        'r-tag--round': round,
      }"
      :style="getStyle"
      @click="clickHandler"
    >
      <slot />
      <r-icon
        v-if="closeable"
        :customClass="`r-tag__close r-haptics-feedback`"
        name="cross"
        size="24rpx"
        :color="plain ? textColor || color : textColor"
        @click="onClose"
      />
    </span>
  </r-animation>
</template>
<script setup>
import { computed, inject } from "vue";
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const emit = defineEmits(["close", "click"]);
const props = defineProps({
  // 是否展示标签
  show: {
    type: Boolean,
    default: true,
  },
  entryClass: {
    type: String,
    default: "animate__fadeIn",
  },
  exitClass: {
    type: String,
    default: "animate__fadeOut",
  },
  duration: {
    type: Number,
    default: 300,
  },
  delay: {
    type: Number,
    default: 0,
  },
  customTransitionStyle: {
    type: Object,
    default: () => {},
  },
  //   大小, 可选值为 large medium
  size: {
    type: String,
    default: "",
  },
  //   类型，可选值为 primary success danger warning
  type: {
    type: String,
    default: "default",
  },
  //   标签颜色
  color: {
    type: String,
    default: "",
  },
  //   是否为空心样式
  plain: {
    type: Boolean,
    default: false,
  },
  //   是否为圆角样式
  round: {
    type: Boolean,
    default: false,
  },
  //   是否为标记样式
  mark: {
    type: Boolean,
    default: false,
  },
  //   文本颜色
  textColor: {
    type: String,
    default: "white",
  },
  //   是否为可关闭标签
  closeable: {
    type: Boolean,
    default: false,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-tag";
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

const getStyle = computed(() => {
  if (props.plain) {
    return {
      color: props.textColor || props.color,
      borderColor: props.color,
    };
  }
  return {
    ...getComponentThemeStyle.value,
    color: props.textColor,
    background: props.color,
  };
});

const onClose = () => {
  emit("close");
};

const clickHandler = (e) => {
  emit("click", e);
};
</script>
<style lang="scss" scoped>
.r-haptics-feedback {
  cursor: pointer;

  &:active {
    opacity: var(--r-active-opacity);
  }
}
.r-tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: var(--r-tag-padding);
  color: var(--r-tag-text-color);
  font-size: var(--r-tag-font-size);
  line-height: var(--r-tag-line-height);
  border-radius: var(--r-tag-radius);

  &--default {
    background: var(--r-tag-default-color);

    &.r-tag--plain {
      color: var(--r-tag-default-color) !important;
    }
  }

  &--danger {
    background: var(--r-tag-danger-color);

    &.r-tag--plain {
      color: var(--r-tag-danger-color) !important;
    }
  }

  &--primary {
    background: var(--r-tag-primary-color);

    &.r-tag--plain {
      color: var(--r-tag-primary-color) !important;
    }
  }

  &--success {
    background: var(--r-tag-success-color);

    &.r-tag--plain {
      color: var(--r-tag-success-color) !important;
    }
  }

  &--warning {
    background: var(--r-tag-warning-color);

    &.r-tag--plain {
      color: var(--r-tag-warning-color) !important;
    }
  }

  &--plain {
    background: var(--r-tag-plain-background);
    border-color: currentColor;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: 1px solid;
      border-color: inherit;
      border-radius: inherit;
      content: "";
      pointer-events: none;
    }
  }

  &--medium {
    padding: var(--r-tag-medium-padding);
  }

  &--large {
    padding: var(--r-tag-large-padding);
    font-size: var(--r-tag-large-font-size);
    border-radius: var(--r-tag-large-radius);
  }

  &--mark {
    border-radius: 0 var(--r-tag-round-radius) var(--r-tag-round-radius) 0;

    &::after {
      display: block;
      width: 2px;
      content: "";
    }
  }

  &--round {
    border-radius: var(--r-tag-round-radius);
  }

  &__close {
    margin-left: 2px;
  }
}
</style>
