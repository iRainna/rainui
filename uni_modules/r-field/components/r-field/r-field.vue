<!--
 * @Description: 
 * @Author: iRainna
 * @Date: 2023-08-09 16:29:02
 * @LastEditTime: 2023-09-06 16:55:04
 * @FilePath: \i-r-ui\uni_modules\iR-ui\components\field\index.vue
-->
<template>
  <r-cell
    :size="size"
    :class="`van-field ${showError ? 'van-field--error' : ''} ${
      disabled ? 'van-field--disabled' : ''
    } van-field--label-${labelAlign}`"
    :customClass="`van-field ${showError ? 'van-field--error' : ''} ${
      disabled ? 'van-field--disabled' : ''
    } van-field--label-${labelAlign}`"
    :center="center"
    :border="border"
    :isLink="isLink"
    :clickable="clickable"
    :titleStyle="labelStyle"
    :arrowDirection="arrowDirection"
    valueClass="van-field__value"
    :titleClass="`van-field__label van-field__label--${labelAlign} ${
      requiredComp ? 'van-field__label--required' : ''
    } ${labelClass}`"
    @click="clickHandler"
  >
    <template #icon>
      <view
        v-if="labelAlign !== 'top' && ($slots.leftIcon || leftIcon)"
        class="van-field__left-icon"
        @click="clickLeftIcon"
      >
        <slot v-if="$slots.leftIcon" name="leftIcon"></slot>
        <r-icon v-else-if="leftIcon" :name="leftIcon" :prefix="iconPrefix" />
      </view>
    </template>
    <template #title>
      <view
        v-if="labelAlign === 'top' && ($slots.leftIcon || leftIcon)"
        class="van-field__left-icon"
        @click="clickLeftIcon"
      >
        <slot v-if="$slots.leftIcon" name="leftIcon"></slot>
        <r-icon v-else-if="leftIcon" :name="leftIcon" :prefix="iconPrefix" />
      </view>
      <slot v-if="$slots.label" name="label"></slot>
      <label
        v-else-if="label"
        :id="`${id}-label`"
        :for="$slots.input ? undefined : getInputId()"
        :style="
          labelAlign === 'top' && labelWidth
            ? {
                width: labelWidth,
              }
            : {}
        "
        @click="
          () => {
            focus();
          }
        "
      >
        {{ label }}
      </label>
      {{ colon ? ":" : "" }}
    </template>
    <template #value>
      <view class="van-field__body">
        <view v-if="$slots.input" @click="clickInput" :class="controlClass">
          <slot name="input"></slot>
        </view>
        <view
          style="width: 100%"
          @click="clickInput"
          v-else-if="type === 'textarea'"
        >
          <!-- :class2="`van-field__control van-field__control--${inputAlign}`" -->
          <textarea
            :class="{
              'van-field__control': true,
              [`van-field__control--${inputAlign}`]: true,
            }"
            ref="textareaRef"
            :value="value"
            :type="type"
            :password="type === 'password' || undefined"
            :placeholder="placeholder"
            :disabled="disabled || readonly"
            :maxlength="maxlength"
            :cursor-spacing="cursorSpacing"
            :focus="!readonly && state.focused"
            :confirm-type="confirmType"
            :confirm-hold="confirmHold"
            :cursor="cursor"
            :selection-start="selectionStart"
            :selection-end="selectionEnd"
            :adjust-position="adjustPosition"
            :auto-blur="autoBlur"
            :ignoreCompositionEvent="ignoreCompositionEvent"
            :always-embed="alwaysEmbed"
            :hold-keyboard="holdKeyboard"
            :safe-password-cert-path="safePasswordCertPath"
            :safe-password-length="safePasswordLength"
            :safe-password-time-stamp="safePasswordTimeStamp"
            :safe-password-nonce="safePasswordNonce"
            :safe-password-salt="safePasswordSalt"
            :safe-password-custom-hash="safePasswordCustomHash"
            :random-number="randomNumber"
            :controlled="controlled"
            :always-system="alwaysSystem"
            :inputmode="inputmode"
            @input="onInput"
            @focus="onFocus"
            @confirm="onConfirm"
            @keyboardheightchange="keyboardheightchange"
            @linechange="linechange"
            @blur="onBlur"
          />
        </view>
        <view style="width: 100%" v-else @click="clickInput">
          <input
            ref="inputRef"
            :class="{
              'van-field__control': true,
              [`van-field__control--${inputAlign}`]: true,
            }"
            :value="value"
            :type="type"
            :password="type === 'password' || undefined"
            :placeholder="placeholder"
            :placeholder-style="getPlaceholderStyle"
            :disabled="disabled || readonly"
            :maxlength="maxlength"
            :cursor-spacing="cursorSpacing"
            :focus="!readonly && state.focused"
            :confirm-type="confirmType"
            :confirm-hold="confirmHold"
            :cursor="cursor"
            :selection-start="selectionStart"
            :selection-end="selectionEnd"
            :adjust-position="adjustPosition"
            :auto-blur="autoBlur"
            :ignoreCompositionEvent="ignoreCompositionEvent"
            :always-embed="alwaysEmbed"
            :hold-keyboard="holdKeyboard"
            :safe-password-cert-path="safePasswordCertPath"
            :safe-password-length="safePasswordLength"
            :safe-password-time-stamp="safePasswordTimeStamp"
            :safe-password-nonce="safePasswordNonce"
            :safe-password-salt="safePasswordSalt"
            :safe-password-custom-hash="safePasswordCustomHash"
            :random-number="randomNumber"
            :controlled="controlled"
            :always-system="alwaysSystem"
            :inputmode="inputmode"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @confirm="onConfirm"
            @keyboardheightchange="keyboardheightchange"
          />
        </view>

        <r-icon
          v-if="showClear"
          ref="clearIconRef"
          :name="clearIcon"
          class="van-field__clear"
          :customClass="field__clear"
        />

        <view
          class="van-field__right-icon"
          v-if="$slots.rightIcon || rightIcon"
          @click="clickRightIcon"
        >
          <slot v-if="$slots.rightIcon" name="rightIcon"></slot>
          <r-icon
            v-else-if="rightIcon"
            :name="rightIcon"
            :prefix="iconPrefix"
          ></r-icon>
        </view>
        <view v-if="$slots.button" class="van-field__button">
          <slot name="button"></slot>
        </view>
      </view>
      <view class="van-field__word-limit" v-if="showWordLimit && maxlength">
        <text class="van-field__word-num"> {{ (value + "").length }}</text
        >/{{ maxlength }}
      </view>
      <!-- !(form && form.props.showErrorMessage === false) && -->
      <view
        v-if="$slots.errorMessage && errorMessageComp"
        :class="{
          'van-field__error-message': true,
          [`van-field__error-message--${errorMessageAlign}`]: true,
        }"
      >
        <slot name="errorMessage" :message="errorMessageComp"></slot>
      </view>
      <!-- !(form && form.props.showErrorMessage === false) && -->
      <view
        v-if="!$slots.errorMessage && errorMessageComp"
        :class="{
          'van-field__error-message': true,
          [`van-field__error-message--${errorMessageAlign}`]: true,
        }"
      >
        {{ errorMessageComp }}
      </view>
    </template>
    <template #extra>
      <slot name="extra"></slot>
    </template>
  </r-cell>
</template>
<script>
export default {
  name: "van-field",
};
</script>
<script setup>
import FieldProps from "./props.js";

import {
  defineProps,
  reactive,
  computed,
  shallowRef,
  ref,
  watch,
  defineEmits,
  useSlots,
  nextTick,
  inject,
  watchEffect,
} from "vue";

import {
  _,
  FORM_KEY,
  isDef,
  isFunction,
  Schema,
} from "@/uni_modules/r-utils/js_sdk/index.js";

const { uniqueId } = _;

const id = uniqueId();

//事件
const emit = defineEmits([
  "blur",
  "focus",
  "clear",
  "clickInput",
  "endValidate",
  "startValidate",
  "clickLeftIcon",
  "clickRightIcon",
  "update:value",
  "keyboardheightchange",
  "linechange",
  "confirm",
  "click",
]);

const clickHandler = (e) => emit("click", e);
//组件数据
const state = reactive({
  status: "unvalidated",
  focused: false,
  validateMessage: "",
});
const clearIconRef = ref(null);
const inputRef = ref(null);
const textareaRef = ref(null);
//props
const props = defineProps({ ...FieldProps });
const getInputId = () => props.id || `${id}-input`;

//是否展示错误
const showError = computed(() => {
  if (typeof props.error === "boolean") {
    return props.error;
  }
  // if (form && form.props.showError && state.status === "failed") {
  //   return true;
  // }
});

//输入框的class
const controlClass = computed(() => {
  return `van-field__control van-field__control--${props.inputAlign} ${
    showError.value ? "van-field__control--error" : ""
  } ${!!slots.input ? "van-field__control--custom" : ""}
            ${
              props.type == "textarea" && !props.autosize
                ? "van-field__control--min-height"
                : ""
            }
            `;
});

const showClear = computed(() => {
  const readonly = props["readonly"];

  if (props.clearable && !readonly) {
    const hasValue = props.value !== "";
    const trigger =
      props.clearTrigger === "always" ||
      (props.clearTrigger === "focus" && state.focused);

    return hasValue && trigger;
  }
  return false;
});
//label样式
const labelStyle = computed(() => {
  const labelWidth = props["labelWidth"];
  const labelAlign = props["labelAlign"];
  if (labelWidth && labelAlign !== "top") {
    return { width: labelWidth };
  }
});
//Placeholder Style
const getPlaceholderStyle = computed(() => {
  if (showError.value) {
    return "color: var(--van-field-input-error-text-color);-webkit-text-fill-color: currentColor;";
  }
  return "color:var(--van-field-placeholder-text-color);";
});
//点击左侧icon
const clickLeftIcon = (event) => emit("clickLeftIcon", event);
const clickRightIcon = (event) => emit("clickRightIcon", event);
const clickInput = (e) => {
  emit("clickInput", e);
};
const blur = () => {
  // if (props.type === "textarea") textareaRef.value?.blur();
  // else inputRef.value?.blur();
};
const focus = () => {
  // if (props.type === "textarea") textareaRef.value?.focus();
  // else inputRef.value?.focus();
};
const onInput = (event) => {
  const { value } = event.detail;
  if (value) {
    clearValidate();
  }
  if (
    props?.formatTrigger === "onChange" &&
    props?.formatter &&
    isFunction(props.formatter)
  )
    emit("update:value", props.formatter(value));
  else emit("update:value", value);
};
const onFocus = (event) => {
  state.focused = true;
  emit("focus", event);
  if (props["readonly"]) {
    blur();
  }
};

const onConfirm = () => {
  this.$emit("confirm", props.value);
};
const keyboardheightchange = (e) => {
  emit("keyboardheightchange");
};
const linechange = (e) => emit("linechange", e);
const onBlur = (event) => {
  state.focused = false;
  const { value = "" } = event.detail;
  if (
    props?.formatTrigger === "onBlur" &&
    props?.formatter &&
    isFunction(props.formatter)
  )
    emit("update:value", props.formatter(value));
  emit("blur", props.value);
};

//===============================表单校验================================

const parentData = inject(FORM_KEY, {});
const errorMessageData = ref("");
const errorMessageComp = computed(() => {
  return errorMessageData.value || props.errorMessage;
});

const rulesComp = computed(() => {
  let r = false;

  if (
    parentData?.rules &&
    parentData?.rules[props.name] &&
    Object.keys(parentData.rules[props.name]).length > 0
  ) {
    r = {
      [props.name]: parentData?.rules[props.name],
    };
  }
  if (props.rules && Object.keys(props.rules).length > 0) {
    r = props.rules;
  }
  return r;
});
const requiredComp = computed(() => {
  return props.required || rulesComp.value[props.name]?.required;
});
const validate = shallowRef();
const resetFields = () => {
  clearValidate();
  emit("update:value", "");
};
const clearValidate = () => {
  errorMessageData.value = "";
};
watch(
  () => rulesComp.value,
  (newVal, oldValue) => {
    if (rulesComp.value) {
      validate.value = new Schema(rulesComp.value);
      parentData.addRowInValidate({
        name: props.name,
        validate: () =>
          validate.value.validate({
            [props.name]: props.value,
          }),
        resetFields: () => resetFields(),
        clearValidate: () => clearValidate(),
      });
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => parentData?.errorData?.value,
  (newVal, oldVal) => {
    if (newVal.fields[props.name]?.length) {
      errorMessageData.value = newVal.fields[props.name][0].message;
    } else {
      errorMessageData.value = "";
    }
  },
  {
    deep: true,
  }
);
</script>
