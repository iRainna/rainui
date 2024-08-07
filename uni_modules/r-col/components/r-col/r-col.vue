<template>
  <view
    :class="{
      'r-col': true,
    }"
    :style="colStyle"
    @click="onClick"
  >
    <slot></slot>
  </view>
</template>
<script setup>
import { inject, onMounted, ref, computed, watch } from "vue";

import { LAYOUT_KEY, _ } from "@/uni_modules/r-utils/js_sdk/index.js";
const { uniqueId, findIndex } = _;
const props = defineProps({
  // 列元素宽度
  span: {
    type: [String, Number],
    default: 0,
  },
  // 列元素偏移距离
  offset: {
    type: [String, Number],
    default: 0,
  },
});
const componentsId = ref("");
const parentInject = inject(LAYOUT_KEY, {});
const index = computed(() => {
  let list = [];
  if (parentInject?.children?.value?.length) {
    list = parentInject?.children?.value;
  }
  return findIndex(list, (t) => t.id == componentsId.value);
});

const colStyle = computed(() => {
  const cssVar = {};
  const parentWidth = parentInject?.rowRect?.value?.width || 0;
  const { span, offset } = props;
  cssVar.opacity = parentWidth ? 1 : 0;
  cssVar.flex = `0 0 ${(Number(span) * parentWidth) / 24}px`;
  cssVar.width = `${(Number(span) * parentWidth) / 24}px`;

  cssVar.marginLeft = `${(Number(offset) * parentWidth) / 24}px`;

  const { spaces, verticalSpaces } = parentInject;
  if (spaces && spaces.value && spaces.value[index.value]) {
    const { left, right } = spaces.value[index.value];
    cssVar.paddingLeft = left ? `${left}px` : null;
    cssVar.paddingRight = right ? `${right}px` : null;
  }

  const { bottom } = verticalSpaces.value[index.value] || {};
  cssVar.marginBottom = bottom ? `${bottom}px` : null;

  return cssVar;
});

const emit = defineEmits(["click"]);
const onClick = (e) => {
  emit("click", e);
};
watch(
  () => [props.span, props.offset],
  () => {
    if (
      parentInject?.getChildren &&
      parentInject.getChildren({
        id: componentsId.value,
      })
    ) {
      parentInject.updateChildren({
        id: componentsId.value,
        span: props.span,
        offset: props.offset,
      });
    }
  },
  { deep: true }
);

onMounted(() => {
  componentsId.value = uniqueId("r-col-");
  if (parentInject?.setChildren) {
    parentInject.setChildren({
      id: componentsId.value,
      span: props.span,
      offset: props.offset,
    });
  }
});
</script>
<style lang="scss" scoped>
.r-col {
  display: block;
  box-sizing: border-box;
  min-height: 1px;
}
</style>
