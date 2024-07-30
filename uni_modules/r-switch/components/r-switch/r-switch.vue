<template>
  <view
    :style="{
      ...getComponentThemeStyle,
      fontSize: size,
      backgroundColor: isChecked ? activeColor : inactiveColor,
    }"
    :class="`r-switch ${isChecked ? 'r-switch--on' : ''} ${
      loading ? 'r-switch--loading' : ''
    } ${disabled ? 'r-switch--disabled' : ''}`"
    :aria-checked="isChecked"
    @click="onClick"
  >
    <view class="r-switch__node">
      <r-loading
        v-if="loading"
        class="r-switch__loading"
        :size="`calc(${size} / 2)`"
        :color="color"
      />
      <slot v-if="$slots.node" name="node"></slot>
    </view>
    <slot v-if="$slots.background" name="background"></slot>
  </view>
</template>
<script setup>
import { computed, inject } from "vue";
import SwitchProps from "./props.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
const emit = defineEmits(["update:value", "change"]);
const props = defineProps({ ...SwitchProps });

const componentsName = "r-switch";
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

const isChecked = computed(() => props.value === props.activeValue);
const color = computed(() =>
  isChecked.value ? props.activeColor : props.inactiveColor
);
const onClick = () => {
  if (!props.disabled && !props.loading) {
    const newValue = isChecked.value ? props.inactiveValue : props.activeValue;
    emit("update:value", newValue);
    emit("change", newValue);
  }
};
</script>

<style lang="scss" scoped>
.r-switch {
  position: relative;
  display: inline-block;
  box-sizing: content-box;
  width: var(--r-switch-width);
  height: var(--r-switch-height);
  font-size: var(--r-switch-size);
  background: var(--r-switch-background);
  border-radius: var(--r-switch-node-size);
  cursor: pointer;
  transition: background-color var(--r-switch-duration);

  &__node {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 4rpx;
    left: 4rpx;
    width: var(--r-switch-node-size);
    height: var(--r-switch-node-size);
    // https://github.com/vant-ui/vant/issues/9839
    font-size: inherit;
    background: var(--r-switch-node-background);
    border-radius: 100%;
    box-shadow: var(--r-switch-node-shadow);
    transition: transform var(--r-switch-duration)
      cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }

  &__loading {
    // top: 25%;
    // left: 25%;
    // width: 50%;
    // height: 50%;
    line-height: 1;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &--on {
    background: var(--r-switch-on-background);

    .r-switch__node {
      transform: translateX(
        calc(var(--r-switch-width) - var(--r-switch-node-size) - 8rpx)
      );
    }

    .r-switch__loading {
      color: var(--r-switch-on-background);
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--r-switch-disabled-opacity);
  }

  &--loading {
    cursor: default;
  }
}
</style>
