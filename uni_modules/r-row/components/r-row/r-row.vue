<template>
  <view
    :class="{
      'r-row': true,
      [`r-row--align-${align}`]: true,
      [`r-row--justify-${justify}`]: true,
      'r-row--nowrap': !wrap,
    }"
    @click="onClick"
  >
    <slot></slot>
  </view>
</template>
<script setup>
import { provide, ref, computed, onMounted, getCurrentInstance } from "vue";
import { LAYOUT_KEY, GetRect } from "@/uni_modules/r-utils/js_sdk/index.js";
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 列元素之间的间距（单位为 px）
  gutter: {
    type: [Number, String, Array],
    default: 0,
  },
  // 主轴对齐方式，可选值为 end center space-around space-between

  justify: {
    type: String,
    default: "start",
  },
  // 交叉轴对齐方式，可选值为 center bottom
  align: {
    type: String,
    default: "top",
  },
  // 是否自动换行
  wrap: {
    type: Boolean,
    default: true,
  },
});
const children = ref([]);

const setChildren = (e) => {
  children.value = [...children.value, e];
};
const updateChildren = (e) => {
  children.value = children.value.map((t) => {
    if (e.id == t.id) {
      return e;
    }
    return t;
  });
};
const getChildren = (e) => {
  return setChildren.value.find((t) => t.id == e.id) || {};
};

const groups = computed(() => {
  const groups = [[]];
  let totalSpan = 0;
  children.value.forEach((child, index) => {
    totalSpan += Number(child.span);

    if (totalSpan > 24) {
      groups.push([index]);
      totalSpan -= 24;
    } else {
      groups[groups.length - 1].push(index);
    }
  });

  return groups;
});

const spaces = computed(() => {
  let gutter = 0;
  if (Array.isArray(props.gutter)) {
    gutter = Number(props.gutter[0]) || 0;
  } else {
    gutter = Number(props.gutter);
  }
  const spaces = [];

  if (!gutter) {
    return spaces;
  }

  groups.value.forEach((group) => {
    const averagePadding = (gutter * (group.length - 1)) / group.length;

    group.forEach((item, index) => {
      if (index === 0) {
        spaces.push({ right: averagePadding });
      } else {
        const left = gutter - spaces[item - 1].right;
        const right = averagePadding - left;
        spaces.push({ left, right });
      }
    });
  });

  return spaces;
});

const verticalSpaces = computed(() => {
  const { gutter } = props;
  const spaces = [];
  if (Array.isArray(gutter) && gutter.length > 1) {
    const bottom = Number(gutter[1]) || 0;
    if (bottom <= 0) {
      return spaces;
    }
    groups.value.forEach((group, index) => {
      if (index === groups.value.length - 1) return;
      group.forEach(() => {
        spaces.push({ bottom });
      });
    });
  }
  return spaces;
});
const emit = defineEmits(["click"]);
const onClick = (e) => {
  emit("click", e);
};

const rowRect = ref(null);
onMounted(async () => {
  rowRect.value = await GetRect(".r-row", proxy);
});
provide(LAYOUT_KEY, {
  children,
  getChildren,
  setChildren,
  updateChildren,
  spaces,
  verticalSpaces,
  rowRect,
});
</script>
<style lang="scss" scoped>
.r-row {
  display: flex;
  flex-wrap: wrap;

  &--nowrap {
    flex-wrap: nowrap;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-space-between {
    justify-content: space-between;
  }

  &--justify-space-around {
    justify-content: space-around;
  }

  &--align-center {
    align-items: center;
  }

  &--align-bottom {
    align-items: flex-end;
  }
}
</style>
