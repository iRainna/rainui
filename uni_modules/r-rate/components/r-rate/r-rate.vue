<template>
  <view
    :class="{
      'r-rate': true,
      'r-rate--disabled': disabled,
      'r-rate--readonly': readonly,
    }"
  >
    <!-- renderStar -->
    <view
      v-for="(item, index) in list"
      :key="index"
      :class="{ 'r-rate__item': true }"
      :style="{
        paddingRight:
          gutter && index + 1 !== count
            ? isNumeric(gutter)
              ? gutter + 'rpx'
              : gutter
            : 0,
        width: size,
        height: size,
      }"
      @click="(e) => onClickItem(e, index)"
    >
      <r-icon
        :size="size"
        :name="item.status === 'full' ? icon : voidIcon"
        :class="{
          'r-rate__icon': true,
          'r-rate__icon--disabled': disabled,
          'r-rate__icon--full': item.status === 'full',
        }"
        :color="
          disabled ? disabledColor : item.status === 'full' ? color : voidColor
        "
        :prefix="iconPrefix"
        :customStyle="{
          color: getTheme(themeName)['r-rate-icon-void-color'],
          fontSize: getTheme(themeName)['r-rate-icon-size'],
        }"
      />

      <r-icon
        v-if="allowHalf && item.value > 0 && item.value < 1"
        :size="size"
        :style="{
          width: item.value + 'em',
        }"
        :name="item.status === 'void' ? voidIcon : icon"
        :class="{
          'r-rate__icon': true,
          'r-rate__icon--half': true,
          'r-rate__icon--full': item.status !== 'void',
          'r-rate__icon--disabled': disabled,
        }"
        :color="
          disabled ? disabledColor : item.status === 'void' ? voidColor : color
        "
        :prefix="iconPrefix"
        :customStyle="{
          color: disabled
            ? getTheme(themeName)['r-rate-icon-disabled-color']
            : item.status !== 'void'
            ? getTheme(themeName)['r-rate-icon-full-color']
            : getTheme(themeName)['r-rate-icon-void-color'],
          fontSize: getTheme(themeName)['r-rate-icon-size'],
        }"
      />
    </view>
  </view>
</template>
<script setup>
import RateProps from "./props.js";
import {
  defineProps,
  getCurrentInstance,
  computed,
  ref,
  nextTick,
  defineEmits,
  watch,
} from "vue";

import { GetRect, _, isNumeric } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getTheme } from "@/uni_modules/r-theme/js_sdk/index.js";
const { forEach } = _;
const emit = defineEmits(["change", "update:value"]);
const props = defineProps(RateProps);

const { proxy } = getCurrentInstance();
const groupRefRect = ref({});
const rects = ref([]);
let minRectTop = Number.MAX_SAFE_INTEGER;
let maxRectTop = Number.MIN_SAFE_INTEGER;
let ranges = ref([]);
const unselectable = computed(() => props.readonly || props.disabled);

const getRateStatus = (value, index, allowHalf, readonly) => {
  if (value >= index) {
    return { status: "full", value: 1 };
  }

  if (value + 0.5 >= index && allowHalf && !readonly) {
    return { status: "half", value: 0.5 };
  }

  if (value + 1 >= index && allowHalf && readonly) {
    const cardinal = 10 ** 10;
    return {
      status: "half",
      value: Math.round((value - index + 1) * cardinal) / cardinal,
    };
  }

  return { status: "void", value: 0 };
};
const list = computed(() =>
  new Array(props.count)
    .fill("")
    .map((_, i) =>
      getRateStatus(props.value, i + 1, props.allowHalf, props.readonly)
    )
);
const updateRanges = () => {
  ranges.value = [];
  forEach(rects.value, (rect, index) => {
    minRectTop = Math.min(rect.top, minRectTop);
    maxRectTop = Math.max(rect.top, maxRectTop);
    if (props.allowHalf) {
      ranges.value.push(
        {
          score: index + 0.5,
          left: rect.left,
          top: rect.top,
          height: rect.height,
        },
        {
          score: index + 1,
          left: rect.left + rect.width / 2,
          top: rect.top,
          height: rect.height,
        }
      );
    } else {
      ranges.value.push({
        score: index + 1,
        left: rect.left,
        top: rect.top,
        height: rect.height,
      });
    }
  });
};

const getScoreByPosition = (x, y) => {
  for (let i = ranges.value.length - 1; i > 0; i--) {
    if (y >= groupRefRect.value.top && y <= groupRefRect.value.bottom) {
      if (
        x > ranges.value[i].left &&
        y >= ranges.value[i].top &&
        y <= ranges.value[i].top + ranges.value[i].height
      ) {
        return ranges.value[i].score;
      }
    } else {
      const curTop = y < groupRefRect.value.top ? minRectTop : maxRectTop;

      if (x > ranges.value[i].left && ranges.value[i].top === curTop) {
        return ranges.value[i].score;
      }
    }
  }
  return props.allowHalf ? 0.5 : 1;
};
const select = (value) => {
  if (unselectable.value || value === props.value) return;
  emit("update:value", value);
  emit("change", value);
};

const onClickItem = (event, index) => {
  const { allowHalf } = props;
  const score = index + 1;
  updateRanges();
  let value = allowHalf
    ? getScoreByPosition(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      )
    : score;
  if (props.clearable && value === props.modelValue) {
    value = 0;
  }
  select(value);
};

const getDomRect = () => {
  nextTick(async () => {
    groupRefRect.value = await GetRect(".r-rate", proxy);
    rects.value = await GetRect(".r-rate__item", proxy, true);
  });
};

watch(
  () => props.count,
  () => getDomRect(),
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.r-rate {
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  flex-wrap: wrap;

  &__item {
    position: relative;
  }

  &__icon {
    display: block;
    width: 1em;

    &--half {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      pointer-events: none;
      &::before {
        position: absolute;
        left: 0;
      }
    }
  }

  &--disabled {
    cursor: not-allowed;
  }

  &--readonly {
    cursor: default;
  }
}
</style>
