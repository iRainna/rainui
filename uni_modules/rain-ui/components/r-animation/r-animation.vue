<template>
  <view
    v-show="delayShow"
    :class="`animate__animated ${show ? entryClass : exitClass}`"
    :style="{
      ...customStyle,
      '--animate-duration': `${duration}ms`,
      '--animate-delay': `${delay}ms`,
    }"
  >
    <slot />
  </view>
</template>
<script setup>
import { shallowRef, ref, watch } from "vue";
import TransitionAnimationProps from "./props.js";
const emit = defineEmits(["open", "close", "opened", "closed"]);
const props = defineProps({
  ...TransitionAnimationProps,
});

const delayShow = ref(false);
const timer = shallowRef(null);
watch(
  () => props.show,
  (newVal) => {
    if (timer.value) clearTimeout(timer.value);
    if (newVal) {
      delayShow.value = newVal;
      emit("open");
      timer.value = setTimeout(
        () => {
          emit("opened");
        },
        props.entryClass ? props.duration + props.delay : 0
      );
    } else {
      emit("close");
      timer.value = setTimeout(
        () => {
          delayShow.value = newVal;
          emit("closed");
        },
        props.exitClass ? props.duration + props.delay : 0
      );
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
@import "animate.css";
</style>
