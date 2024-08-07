<template>
  <view
    :class="`r-radio-group r-radio-group--${direction}`"
    :style="getComponentThemeStyle"
  >
    <slot v-if="$slots.default"></slot>
  </view>
</template>

<script setup>
import CheckboxGroupProps from "./props.js";
import { provide, nextTick, inject, computed } from "vue";
import {
  RADIO_KEY,
  CONFIG_PROVIDER_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({ ...CheckboxGroupProps });
const emit = defineEmits(["update:value", "change"]);

const componentsName = "r-radio-group";
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

const updateValue = (value) => {
  emit("update:value", value);
  nextTick(() => {
    emit("change", value);
  });
};
provide(RADIO_KEY, { props, updateValue });
</script>
<style lang="scss" scoped>
.r-radio-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
    gap: 12rpx;
  }
  &--vertical {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
  }
}
</style>
