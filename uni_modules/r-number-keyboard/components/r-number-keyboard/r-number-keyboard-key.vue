<template>
  <view
    class="r-number-keyboard-key__wrapper"
    :class="{
      'r-number-keyboard-key__wrapper--wider': wider,
    }"
    :style="getKeyStyle"
    @click="onPress"
    @longpress="onPress"
    hover-class="r-number-keyboard-key--active"
  >
    <view
      class="r-number-keyboard-key"
      :class="{
        [`r-number-keyboard-key--${props.color}`]: true,
        'r-number-keyboard-key--large': large,

        'r-number-keyboard-key--delete': type === 'delete',
      }"
    >
      <!-- renderContent -->
      <r-loading
        v-if="loading"
        color="var(--r-number-keyboard-button-text-color)"
      ></r-loading>

      <slot v-if="$slots.default"></slot>
    </view>
  </view>
</template>
<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  text: {
    type: [Number, String],
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  wider: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  boxWidth: {
    type: Number,
    default: 0,
  },
  boxHeight: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["press"]);
const getKeyStyle = computed(() => {
  let cssVar = {};
  // #ifndef H5

  if (props.large) {
    cssVar.flexBasis = props.boxWidth + "px";
    cssVar.width = props.boxWidth + "px";
  } else {
    cssVar.flexBasis =
      (props.wider ? props.boxWidth * 0.66 : props.boxWidth * 0.33) + "px";
    cssVar.width =
      (props.wider ? props.boxWidth * 0.66 : props.boxWidth * 0.33) + "px";
  }

  if (props.boxHeight) {
    cssVar.height = props.boxHeight + "px";
  }
  // #endif
  return cssVar;
});

const onPress = () => {
  emit("press", props.text, props.type);
};
</script>
<style lang="scss" scoped>
.r-number-keyboard-key {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--r-number-keyboard-key-height);
  font-size: var(--r-number-keyboard-key-font-size);
  line-height: 1.5;
  background: var(--r-number-keyboard-key-background);
  border-radius: var(--r-radius-lg);
  cursor: pointer;

  &--large {
    // height: 100% can't fill flex parent on legacy safari
    // see: https://stackoverflow.com/questions/33636796
    position: absolute;
    top: 0;
    right: 6px;
    bottom: 6px;
    left: 0;
    height: auto;
  }

  &--blue,
  &--delete {
    font-size: var(--r-number-keyboard-delete-font-size);
  }

  &--active {
    background-color: var(--r-number-keyboard-key-active-color);
  }

  &--blue {
    color: var(--r-number-keyboard-button-text-color);
    background: var(--r-number-keyboard-button-background);

    &.r-number-keyboard-key--active {
      opacity: var(--r-active-opacity);
    }
  }

  &__wrapper {
    position: relative;
    flex: 1;
    flex-basis: 33%;
    box-sizing: border-box;
    padding: 0 6px 6px 0;

    &--wider {
      flex-basis: 66%;
    }
  }

  &__delete-icon {
    width: 32px;
    height: 22px;
  }

  &__collapse-icon {
    width: 30px;
    height: 24px;
  }

  &__loading-icon {
    color: var(--r-number-keyboard-button-text-color);
  }
}
</style>
