<template>
  <view
    :class="{
      'van-collapse': true,
      'van-hairline--top-bottom': border,
    }"
    :style="getThemeCssVar(themeName)"
  >
    <slot v-if="$slots.default" />
  </view>
</template>

<script setup>
import { defineProps, ref, provide, defineEmits, defineExpose } from "vue";
import CollapseProps from "./props.js";
import { COLLAPSE_KEY, _ } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps(CollapseProps);
const emit = defineEmits(["change", "update:value"]);
const { uniqWith, cloneDeep, isEqual, debounce } = _;
const children = ref([]);
const setChildren = (v) => {
  const arr = cloneDeep([...children.value, v]);
  children.value = uniqWith(arr, isEqual);
};

const updateName = (name) => {
  emit("change", name);
  emit("update:value", name);
};

const toggle = (name, expanded) => {
  const { accordion, value } = props;
  if (accordion) {
    updateName(name === value ? "" : name);
  } else if (expanded) {
    updateName(value.concat(name));
  } else {
    updateName(value.filter((activeName) => activeName !== name));
  }
};

const toggleAll = (options = {}) => {
  if (props.accordion) {
    return;
  }

  if (typeof options === "boolean") {
    options = { expanded: options };
  }

  const { expanded, skipDisabled } = options;
  const expandedChildren = children.value.filter((item) => {
    if (item.disabled && skipDisabled) {
      return item.expanded.value;
    }
    return expanded || !item.expanded.value;
  });

  const names = expandedChildren.map((item) => item.itemName.value);
  updateName(names);
};

const isExpanded = (name) => {
  const { accordion, value } = props;

  return accordion ? value === name : value.includes(name);
};

provide(COLLAPSE_KEY, {
  children,
  setChildren,
  toggle,
  toggleAll,
  isExpanded,
});
defineExpose({ toggleAll });
</script>
