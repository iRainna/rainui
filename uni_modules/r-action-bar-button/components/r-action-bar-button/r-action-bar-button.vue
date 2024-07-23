<template>
  <r-button
    size="large"
    :type="type"
    :color="color"
    :icon="icon"
    :loading="loading"
    :disabled="disabled"
    :customStyle="customStyle"
    @click="onClick"
  >
    <slot v-if="$slots.default"></slot>
    <text v-else>{{ text }}</text>
  </r-button>
</template>
<script setup>
import {
  CONFIG_PROVIDER_KEY,
  _,
  ACTION_BAR_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { inject, computed, ref, onMounted } from "vue";
const emit = defineEmits(["click"]);
const { uniqueId } = _;
const props = defineProps({
  // 按钮文字
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "default",
  },
  //   按钮颜色
  color: {
    type: String,
    default: "",
  },
  //   左侧图标名称
  icon: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const componentsName = "r-action-bar-button";
const componentsId = ref(null);
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

const parentInject = inject(ACTION_BAR_KEY, {});

const isFirst = computed(() => {
  if (parentInject?.children?.value?.length) {
    if (parentInject.children.value[0].id == componentsId.value) {
      return true;
    }
  }
  return false;
});

const isLast = computed(() => {
  if (parentInject?.children?.value?.length) {
    if (
      parentInject.children.value[parentInject.children.value.length - 1].id ==
      componentsId.value
    ) {
      return true;
    }
  }
  return false;
});

const customStyle = computed(() => {
  const cssVar = {
    width: "100%",
    flex: 1,
    height: "var(--r-action-bar-button-height)",
    fontWeight: "var(--r-font-bold)",
    fontSize: "var(--r-font-size-md)",
    border: "none",
    borderRadius: 0,
  };
  if (props.type == "warning") {
    cssVar.background = "var(--r-action-bar-button-warning-color)";
  }
  if (props.type == "danger") {
    cssVar.background = "var(--r-action-bar-button-danger-color)";
  }

  if (props.color) {
    cssVar.background = props.color;
  }
  if (isFirst.value) {
    cssVar.width = "calc(100% - 10rpx)";
    cssVar.marginLeft = "10rpx";
    cssVar.borderTopLeftRadius = "var(--r-radius-max)";
    cssVar.borderBottomLeftRadius = "var(--r-radius-max)";
  }

  if (isLast.value) {
    cssVar.width = "calc(100% - 10rpx)";
    cssVar.marginRight = "10rpx";
    cssVar.borderTopRightRadius = "var(--r-radius-max)";
    cssVar.borderBottomRightRadius = "var(--r-radius-max)";
  }
  return {
    ...getComponentThemeStyle.value,
    ...cssVar,
  };
});
const onClick = (e) => emit("click", e);
onMounted(() => {
  componentsId.value = uniqueId(componentsName + "-");
  if (parentInject && parentInject.setChildren) {
    parentInject.setChildren({
      id: componentsId.value,
    });
  }
});
</script>
<style lang="scss" scoped>
.r-action-bar-button {
  flex: 1;
  height: var(--r-action-bar-button-height);
  font-weight: var(--r-font-bold);
  font-size: var(--r-font-size-md);
  border: none;
  border-radius: 0;

  &--first {
    margin-left: 5px;
    border-top-left-radius: var(--r-radius-max);
    border-bottom-left-radius: var(--r-radius-max);
  }

  &--last {
    margin-right: 5px;
    border-top-right-radius: var(--r-radius-max);
    border-bottom-right-radius: var(--r-radius-max);
  }

  &--warning {
    background: var(--r-action-bar-button-warning-color);
  }

  &--danger {
    background: var(--r-action-bar-button-danger-color);
  }

  @media (max-width: 321px) {
    font-size: 13px;
  }
}
</style>
