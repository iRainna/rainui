<template>
  <view
    :class="{
      'r-rate': true,
      'r-rate--disabled': disabled,
      'r-rate--readonly': readonly,
    }"
    :style="getComponentThemeStyle"
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
      />
    </view>
  </view>
</template>
<script setup>
import RateProps from "./props.js";
import {
  getCurrentInstance,
  computed,
  ref,
  inject,
  nextTick,
  watch,
} from "vue";

import {
  GetRect,
  _,
  isNumeric,
  CONFIG_PROVIDER_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { forEach } = _;
const emit = defineEmits(["change", "update:value"]);
const props = defineProps(RateProps);

const componentsName = "r-rate";
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
  nextTick(() => {
    emit("change", value);
  });
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

    &:not(:last-child) {
      padding-right: var(--r-rate-icon-gutter);
    }
  }

  &__icon {
    display: block;
    width: 1em;
    color: var(--r-rate-icon-void-color);
    font-size: var(--r-rate-icon-size);

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

    &--full {
      color: var(--r-rate-icon-full-color);
    }

    &--disabled {
      color: var(--r-rate-icon-disabled-color);
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
