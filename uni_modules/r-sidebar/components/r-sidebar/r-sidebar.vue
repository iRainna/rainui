<template>
  <view :class="{ 'r-sidebar': true }" :style="getComponentThemeStyle">
    <slot></slot>
  </view>
</template>
<script setup>
import {
  CONFIG_PROVIDER_KEY,
  SIDEBAR_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { inject, computed, nextTick, provide, ref } from "vue";
const emit = defineEmits(["change", "update:value"]);
const props = defineProps({
  value: {
    type: [Number, String],
    default: 0,
  },
  themeName: {
    type: [String],
    default: "default",
  },
});
const componentsName = "r-sidebar";
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
const children = ref([]);
const setChildren = (e) => {
  children.value = [...children.value, e];
};
const getActive = () => props.value;
const setActive = (value) => {
  if (value !== getActive()) {
    emit("update:value", value);
    nextTick(() => {
      emit("change", value);
    });
  }
};

provide(SIDEBAR_KEY, {
  getActive,
  setActive,
  setChildren,
  children,
});
</script>
<style lang="scss" scoped>
.r-sidebar {
  width: var(--r-sidebar-width);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
