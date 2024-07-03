<template>
  <view
    :class="`r-stepper ${
      props.theme == 'round' ? 'r-stepper--' + props.theme : ''
    }`"
    :style="getThemeCssVar(themeName)"
  >
    <button
      v-show="showMinus"
      :disabled="minusDisabled"
      :class="`r-stepper__minus ${
        minusDisabled ? 'r-stepper__minus--disabled' : ''
      } ${!minusDisabled ? 'r-haptics-feedback' : ''}`"
      :style="{
        width: buttonSize,
        height: buttonSize,
      }"
      @click="onClick('minus')"
      @touchstartPassive="onTouchstartPassive('minus')"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    ></button>
    <input
      v-show="showInput"
      ref="inputRef"
      class="r-stepper__input"
      :value="current"
      :type="integer ? 'number' : 'digit'"
      :style="{
        width: inputWidth,
        height: buttonSize,
      }"
      :disabled="disabled || disableInput"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
    />
    <button
      v-show="showPlus"
      :disabled="plusDisabled"
      :class="`r-stepper__plus ${
        plusDisabled ? 'r-stepper__plus--disabled' : ''
      } ${!plusDisabled ? 'r-haptics-feedback' : ''}`"
      :style="{
        width: buttonSize,
        height: buttonSize,
      }"
      @click="onClick('plus')"
      @touchstartPassive="onTouchstartPassive('plus')"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    ></button>
  </view>
</template>
<script setup>
import {
  defineProps,
  ref,
  watch,
  shallowRef,
  defineEmits,
  computed,
} from "vue";
import StepperProps from "./props.js";
import {
  callInterceptor,
  formatNumber,
  isDef,
  addNumber,
  LONG_PRESS_START_TIME,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";

const props = defineProps({ ...StepperProps });

const LONG_PRESS_INTERVAL = 200;
const emit = defineEmits([
  "update:value",
  "change",
  "plus",
  "minus",
  "overlimit",
]);

const isEqual = (value1, value2) => String(value1) === String(value2);

const format = (value, autoFixed = true) => {
  const { min, max, allowEmpty, decimalLength } = props;

  if (allowEmpty && value === "") {
    return value;
  }

  value = formatNumber(String(value), !props.integer);
  value = value === "" ? 0 : +value;
  value = Number.isNaN(value) ? +min : value;
  // whether to format the value entered by the user
  value = autoFixed ? Math.max(Math.min(+max, value), +min) : value;

  // format decimal
  if (isDef(decimalLength)) {
    value = value.toFixed(+decimalLength);
  }

  return value;
};

const getInitialValue = () => {
  const defaultValue = props.value || props.defaultValue;
  const value = format(defaultValue);

  if (!isEqual(value, props.value)) {
    emit("update:value", value);
  }

  return value;
};

const onChange = () => {
  if (
    (actionType.value === "plus" && plusDisabled.value) ||
    (actionType.value === "minus" && minusDisabled.value)
  ) {
    emit("overlimit", actionType.value);
    return;
  }

  const diff = actionType.value === "minus" ? -props.step : +props.step;
  const value = format(addNumber(current.value, diff));

  setValue(value);
  emit(actionType.value);
};
const onInput = (event) => {
  const input = event.detail;
  const { value } = input;
  const { decimalLength } = props;

  let formatted = formatNumber(String(value), !props.integer);

  // limit max decimal length
  if (isDef(decimalLength) && formatted.includes(".")) {
    const pair = formatted.split(".");
    formatted = `${pair[0]}.${pair[1].slice(0, +decimalLength)}`;
  }

  if (props.beforeChange) {
    input.value = String(current.value);
  } else if (!isEqual(value, formatted)) {
    input.value = formatted;
  }

  // prefer number type
  const isNumeric = formatted === String(+formatted);
  setValue(isNumeric ? +formatted : formatted);
};

const onBlur = (e) => {
  let { value } = e.detail;
  value = format(value, props.autoFixed);
  current.value = value;
  emit("blur", e);
};
const onClick = (type) => {
  actionType.value = type;
  onChange();
};
const onTouchstartPassive = (type) => {
  actionType.value = type;
  onTouchStart();
};

const isLongPress = ref();
const longPressTimer = shallowRef();
const longPressStep = () => {
  longPressTimer.value = setTimeout(() => {
    onChange();
    longPressStep();
  }, LONG_PRESS_INTERVAL);
};
const onTouchStart = () => {
  if (props.longPress) {
    isLongPress.value = false;
    clearTimeout(longPressTimer.value);
    longPressTimer.value = setTimeout(() => {
      isLongPress.value = true;
      onChange();
      longPressStep();
    }, LONG_PRESS_START_TIME);
  }
};
const onTouchEnd = (event) => {
  if (props.longPress) {
    clearTimeout(longPressTimer.value);
  }
};
const actionType = ref();

const inputRef = ref();
const current = ref(getInitialValue());
const check = () => {
  const value = format(current.value);
  if (!isEqual(value, current.value)) {
    current.value = value;
  }
};

const setValue = (value) => {
  if (props.beforeChange) {
    callInterceptor(props.beforeChange, {
      args: [value],
      done() {
        current.value = value;
      },
    });
  } else {
    current.value = value;
  }
};
const minusDisabled = computed(
  () =>
    props.disabled ||
    props.disableMinus ||
    (props.min && Number(current.value) <= props.min)
);
const plusDisabled = computed(
  () =>
    props.disabled ||
    props.disablePlus ||
    (props.max && Number(current.value) >= props.max)
);

watch(() => [props.max, props.min, props.integer, props.decimalLength], check);
watch(
  () => props.value,
  (value) => {
    if (!isEqual(value, current.value)) {
      current.value = format(value);
    }
  }
);

watch(
  () => current.value,
  (value) => {
    emit("update:value", value);
    emit("change", value, { name: props.name });
  }
);
</script>
<style lang="scss" scoped>
.r-haptics-feedback {
  cursor: pointer;

  &:active {
    opacity: var(--r-active-opacity);
  }
}
.r-stepper {
  display: inline-flex;
  user-select: none;

  &__minus,
  &__plus {
    position: relative;
    box-sizing: border-box;
    width: var(--r-stepper-input-height);
    height: var(--r-stepper-input-height);
    margin: 0;
    padding: 0;
    color: var(--r-stepper-button-icon-color);
    vertical-align: middle;
    background: var(--r-stepper-background);
    border: 0;

    &::before {
      width: 50%;
      height: 1px;
    }

    &::after {
      width: 1px;
      height: 50%;
    }

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: currentColor;
      transform: translate(-50%, -50%);
      content: "";
    }

    &--disabled {
      color: var(--r-stepper-button-disabled-icon-color);
      background-color: var(--r-stepper-button-disabled-color);
      cursor: not-allowed;
    }
  }

  &__minus {
    border-radius: var(--r-stepper-radius) 0 0 var(--r-stepper-radius);

    &::after {
      display: none;
    }
  }

  &__plus {
    border-radius: 0 var(--r-stepper-radius) var(--r-stepper-radius) 0;
  }

  &__input {
    box-sizing: border-box;
    width: var(--r-stepper-input-width);
    height: var(--r-stepper-input-height);
    margin: 0 2px;
    padding: 0;
    color: var(--r-stepper-input-text-color);
    font-size: var(--r-stepper-input-font-size);
    line-height: var(--r-stepper-input-line-height);
    text-align: center;
    vertical-align: middle;
    background: var(--r-stepper-background);
    border: 0;
    border-width: 1px 0;
    border-radius: 0;
    -webkit-appearance: none;

    &:disabled {
      color: var(--r-stepper-input-disabled-text-color);
      background-color: var(--r-stepper-input-disabled-background);
      // fix disabled color in iOS
      -webkit-text-fill-color: var(--r-stepper-input-disabled-text-color);
      opacity: 1;
    }

    &:read-only {
      cursor: default;
    }
  }

  &--round {
    .r-stepper__input {
      background-color: transparent;
    }

    .r-stepper__plus,
    .r-stepper__minus {
      border-radius: 100%;

      &--disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    .r-stepper__plus {
      color: var(--r-white);
      background: var(--r-stepper-button-round-theme-color);
    }

    .r-stepper__minus {
      color: var(--r-stepper-button-round-theme-color);
      background-color: var(--r-background-2);
      border: 1px solid var(--r-stepper-button-round-theme-color);
    }
  }
}
</style>
