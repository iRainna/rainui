<template>
  <view
    ref="root"
    :class="{
      'r-swipe-cell': true,
    }"
    @click.stop="getClickHandler('cell')"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @touchmove="onTouchMove"
  >
    <view
      :class="{
        'r-swipe-cell__wrapper': true,
      }"
      :style="wrapperStyle"
    >
      <!-- renderSideContent left-->
      <view
        v-if="$slots.left"
        :class="{
          'r-swipe-cell__left': true,
        }"
        @click.stop="getClickHandler('left')"
      >
        <slot name="left" />
      </view>
      <!-- default -->
      <slot />
      <!-- renderSideContent right-->
      <view
        v-if="$slots.right"
        :class="{
          'r-swipe-cell__right': true,
        }"
        @click.stop="getClickHandler('right')"
      >
        <slot name="right" />
      </view>
    </view>
  </view>
</template>
<script setup>
import {
  computed,
  reactive,
  ref,
  nextTick,
  useSlots,
  getCurrentInstance,
} from "vue";
import { _, GetRect } from "@/uni_modules/r-utils/js_sdk/index.js";
const { clamp, uniqueId } = _;
const { proxy } = getCurrentInstance();
const props = defineProps({
  name: {
    type: [String, Number],
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autoClosed: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["open", "close", "click"]);
const slots = useSlots();
const startOffset = ref(0);
const opened = ref(false);
const leftRect = ref({});
const rightRect = ref({});

const deltaX = ref(0);
const startX = ref(0);
const state = reactive({
  offset: 0,
  dragging: false,
});
const leftWidth = computed(() => leftRect.value?.width || 0);
const rightWidth = computed(() => rightRect.value?.width || 0);
const wrapperStyle = computed(() => {
  const cssVar = {
    transform: `translate3d(${state.offset}px, 0, 0)`,
    transitionDuration: state.dragging ? "0s" : ".6s",
  };
  return cssVar;
});
const reset = () => {
  deltaX.value = 0;
};
const open = (side) => {
  state.offset = side === "left" ? leftWidth.value : -rightWidth.value;

  if (!opened.value) {
    opened.value = true;
    emit("open", {
      name: props.name,
      position: side,
    });
  }
};

const close = (position) => {
  state.offset = 0;

  if (opened.value) {
    opened.value = false;
    emit("close", {
      name: props.name,
      position,
    });
  }
};
const toggle = (side) => {
  const offset = Math.abs(state.offset);
  const THRESHOLD = 0.15;
  const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
  const width = side === "left" ? leftWidth.value : rightWidth.value;

  if (width && offset > width * threshold) {
    open(side);
  } else {
    close(side);
  }
};
const onTouchStart = (e) => {
  if (props.disabled) {
    return;
  }
  startOffset.value = state.offset;
  reset();
  startX.value = e.touches[0].clientX;
};

const onTouchEnd = (e) => {
  if (state.dragging) {
    state.dragging = false;
    toggle(state.offset > 0 ? "left" : "right");
  }
};

const onTouchMove = (e) => {
  if (props.disabled) {
    return;
  }

  const touch = e.touches[0];
  deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value;

  state.dragging = true;
  state.offset = clamp(
    deltaX.value + startOffset.value,
    -rightWidth.value,
    leftWidth.value
  );
};

const getClickHandler = (position) => {
  emit("click", position);
  if (props.autoClosed) close(position);
};

nextTick(async () => {
  if (slots.left) {
    try {
      leftRect.value = await GetRect(".r-swipe-cell__left", proxy);
    } catch (error) {
      leftRect.value = {};
    }
  }
  if (slots.right) {
    try {
      rightRect.value = await GetRect(".r-swipe-cell__right", proxy);
    } catch (error) {
      rightRect.value = {};
    }
  }
});

defineExpose({ open, close });
</script>
<style lang="scss" scoped>
.r-swipe-cell {
  position: relative;
  overflow: hidden;
  cursor: grab;

  &__wrapper {
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1);
    transition-property: transform;
  }

  &__left,
  &__right {
    position: absolute;
    top: 0;
    height: 100%;
  }

  &__left {
    left: 0;
    transform: translate3d(-100%, 0, 0);
  }

  &__right {
    right: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
