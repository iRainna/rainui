<template>
  <view
    :class="{
      'r-field': true,
      'r-field--error': showError,
      'r-field--disabled': disabled,
      [`r-field--label-${labelAlign}`]: true,
    }"
    :style="getComponentThemeStyle"
  >
    <r-cell
      :size="size"
      :class="{
        'r-field': true,
        'r-field--error': showError,
        'r-field--disabled': disabled,
        [`r-field--label-${labelAlign}`]: true,
      }"
      :customClass="`r-field ${showError ? 'r-field--error' : ''} ${
        disabled ? 'r-field--disabled' : ''
      } r-field--label-${labelAlign}`"
      :customStyle="getComponentThemeStyle"
      :center="center"
      :border="border"
      :isLink="isLink"
      :clickable="clickable"
      :titleStyle="labelStyle"
      :arrowDirection="arrowDirection"
      valueClass="r-field__value"
      :titleClass="`r-field__label r-field__label--${labelAlign} ${
        requiredComp ? 'r-field__label--required' : ''
      } ${labelClass}`"
      @click="clickHandler"
    >
      <template #icon>
        <view
          v-if="labelAlign !== 'top' && (!!$slots.leftIcon || leftIcon)"
          class="r-field__left-icon"
          @click="clickLeftIcon"
        >
          <slot v-if="$slots.leftIcon" name="leftIcon"></slot>
          <r-icon v-else-if="leftIcon" :name="leftIcon" :prefix="iconPrefix" />
        </view>
      </template>
      <template #title>
        <view
          v-if="labelAlign === 'top' && (!!$slots.leftIcon || leftIcon)"
          class="r-field__left-icon"
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
        <view class="r-field__body">
          <view
            v-if="$slots.input"
            @click="clickInput"
            :class="{
              'r-field__control': true,
              [`r-field__control--${props.inputAlign}`]: true,
              'r-field__control--error': showError,
              'r-field__control--custom': $slots.input,
              'r-field__control--min-height': type == 'textarea' && !autosize,
            }"
          >
            <slot name="input"></slot>
          </view>
          <view
            style="width: 100%"
            @click="clickInput"
            v-else-if="type === 'textarea'"
          >
            <!-- :class2="`r-field__control r-field__control--${inputAlign}`" -->
            <textarea
              :class="{
                'r-field__control': true,
                [`r-field__control--${inputAlign}`]: true,
                [`r-field__control--disabled`]: disabled,
              }"
              ref="textareaRef"
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
                'r-field__control': true,
                [`r-field__control--${inputAlign}`]: true,
                [`r-field__control--disabled`]: disabled,
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
            class="r-field__clear"
            :prefix="clearPrefix"
            @click="onClear"
          />

          <view
            class="r-field__right-icon"
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
          <view v-if="$slots.button" class="r-field__button">
            <slot name="button"></slot>
          </view>
        </view>
        <view class="r-field__word-limit" v-if="showWordLimit && maxlength">
          <text class="r-field__word-num"> {{ (value + "").length }}</text
          >/{{ maxlength }}
        </view>
        <!-- !(form && form.props.showErrorMessage === false) && -->
        <view
          v-if="$slots.errorMessage && errorMessageComp"
          :class="{
            'r-field__error-message': true,
            [`r-field__error-message--${errorMessageAlign}`]: true,
          }"
        >
          <slot name="errorMessage" :message="errorMessageComp"></slot>
        </view>
        <!-- !(form && form.props.showErrorMessage === false) && -->
        <view
          v-if="!$slots.errorMessage && errorMessageComp"
          :class="{
            'r-field__error-message': true,
            [`r-field__error-message--${errorMessageAlign}`]: true,
          }"
        >
          {{ errorMessageComp }}
        </view>
      </template>
      <template #extra>
        <slot name="extra"></slot>
      </template>
    </r-cell>
  </view>
</template>
<script>
export default {
  name: "r-field",
  options: { styleIsolation: "shared" },
};
</script>
<script setup>
import FieldProps from "./props.js";

import {
  reactive,
  computed,
  shallowRef,
  ref,
  watch,
  nextTick,
  inject,
} from "vue";

import {
  _,
  FORM_KEY,
  isDef,
  isFunction,
  CONFIG_PROVIDER_KEY,
  Schema,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";

const { uniqueId } = _;

const id = uniqueId("r-field-input-");

//事件
const emit = defineEmits([
  "blur",
  "focus",
  "clear",
  "clickInput",
  "change",
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

const componentsName = "r-field";
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

const getInputId = () => props.id || id;

//是否展示错误
const showError = computed(() => {
  if (typeof props.error === "boolean") {
    return props.error;
  }
  // if (form && form.props.showError && state.status === "failed") {
  //   return true;
  // }
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
    return "color: var(--r-field-input-error-text-color);-webkit-text-fill-color: currentColor;";
  }
  return "color:var(--r-field-placeholder-text-color);";
});
//点击左侧icon
const clickLeftIcon = (event) => emit("clickLeftIcon", event);
const clickRightIcon = (event) => emit("clickRightIcon", event);
const clickInput = (e) => {
  emit("clickInput", e);
};
const onClear = (e) => {
  emit("clear", e);
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
  ) {
    emit("update:value", props.formatter(value));
    nextTick(() => {
      emit("change", props.formatter(value));
    });
  } else {
    emit("update:value", value);

    nextTick(() => {
      emit("change", value);
    });
  }
};
const onFocus = (event) => {
  state.focused = true;
  emit("focus", event);
  if (props["readonly"]) {
    blur();
  }
};

const onConfirm = () => {
  emit("confirm", props.value);
};
const keyboardheightchange = (e) => {
  emit("keyboardheightchange");
};
const linechange = (e) => emit("linechange", e);
const onBlur = (event) => {
  setTimeout(() => {
    state.focused = false;
  }, 100);

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
  if (props.rules && Object.keys(props.rules).length > 0 && props.name) {
    r = {
      [props.name]: props.rules,
    };
  }
  return r;
});
const requiredComp = computed(
  () =>
    props.required ||
    (Array.isArray(rulesComp.value[props.name])
      ? rulesComp.value[props.name]?.some((t) => t.required)
      : rulesComp.value[props.name]?.required)
);
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

<style lang="scss" scoped>
::v-deep .r-field {
  flex-wrap: wrap;

  &__label {
    display: flex;
    flex: none;
    box-sizing: border-box;
    width: var(--r-field-label-width);
    margin-right: var(--r-field-label-margin-right);
    color: var(--r-field-label-color);
    text-align: left;
    word-wrap: break-word;

    &--center {
      text-align: center;
      justify-content: center;
    }

    &--right {
      text-align: right;
      justify-content: flex-end;
    }

    &--top {
      display: flex;
      width: 100%;
      text-align: left;
      margin-bottom: var(--r-padding-base);
      word-break: break-word;
    }

    &--required {
      &::before {
        margin-right: 2px;
        color: var(--r-field-required-mark-color);
        content: "*";
      }
    }
  }

  &--disabled {
    .r-field__label {
      color: var(--r-field-disabled-text-color);
    }
  }

  &__value {
    overflow: visible;
  }

  &__body {
    display: flex;
    align-items: center;
  }

  &__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0; // for flex-shrink in field__button
    margin: 0;
    padding: 0;
    color: var(--r-field-input-text-color);
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    // https://github.com/vant-ui/vant/pull/9418
    user-select: auto;

    &::placeholder {
      color: var(--r-field-placeholder-text-color);
    }

    &:read-only {
      cursor: default;
    }

    &:disabled {
      color: var(--r-field-input-disabled-text-color);
      cursor: not-allowed;
      opacity: 1;
      // fix disabled color in mobile safari
      -webkit-text-fill-color: var(--r-field-input-disabled-text-color);
    }

    &--center {
      justify-content: center;
      text-align: center;
    }

    &--right {
      justify-content: flex-end;
      text-align: right;
    }

    &--custom {
      display: flex;
      align-items: center;
      min-height: var(--r-cell-line-height);
    }

    &--disabled {
      color: var(--r-field-input-disabled-text-color);
    }

    &--error,
    &--error::placeholder {
      color: var(--r-field-input-error-text-color);
      -webkit-text-fill-color: currentColor;
    }

    &--min-height {
      min-height: var(--r-field-text-area-min-height);
    }

    // for ios wechat
    &[type="date"],
    &[type="time"],
    &[type="datetime-local"] {
      min-height: var(--r-cell-line-height);
    }

    // for safari
    &[type="search"] {
      -webkit-appearance: none;
    }
  }

  &__clear,
  &__icon,
  &__button,
  &__right-icon {
    flex-shrink: 0;
  }

  &__clear,
  &__right-icon {
    margin-right: calc(var(--r-padding-xs) * -1);
    padding: 0 var(--r-padding-xs);
    line-height: inherit;
  }

  &__clear {
    color: var(--r-field-clear-icon-color);
    font-size: var(--r-field-clear-icon-size);
    cursor: pointer;
  }

  &__left-icon .r-icon,
  &__right-icon .r-icon {
    display: block;
    font-size: var(--r-field-icon-size);
    line-height: inherit;
    height: inherit;
  }

  &__left-icon {
    margin-right: var(--r-padding-base);
    height: inherit;
  }

  &__right-icon {
    color: var(--r-field-right-icon-color);
    height: inherit;
  }

  &__button {
    padding-left: var(--r-padding-xs);
  }

  &__error-message {
    color: var(--r-field-error-message-color);
    font-size: var(--r-field-error-message-font-size);
    text-align: left;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &__word-limit {
    margin-top: var(--r-padding-base);
    color: var(--r-field-word-limit-color);
    font-size: var(--r-field-word-limit-font-size);
    line-height: var(--r-field-word-limit-line-height);
    text-align: right;
  }
}
</style>
