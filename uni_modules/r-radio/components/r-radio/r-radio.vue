<template>
  <view
    :class="{
      ['r-radio']: true,
      ['r-radio--disabled']: getProps('disabled'),
      ['r-radio--label-disabled']: getProps('labelDisabled'),
      ['r-radio--' + getProps('direction')]: true,
    }"
    @click="onClick"
    :style="getThemeCssVar(getProps('themeName'))"
  >
    <!-- renderLabel -->
    <text
      :class="{
        ['r-radio__label']: true,
        ['r-radio__label--' + getProps('labelPosition')]: true,
        ['r-radio__label--disabled']: getProps('disabled'),
      }"
      v-if="getProps('labelPosition') === 'left' && $slots.default"
    >
      <slot :checked="checked" :disabled="getProps('disabled')" />
    </text>

    <!-- renderIcon -->
    <view
      ref="iconRef"
      :class="{
        ['r-radio__icon']: true,
        ['r-radio__icon--' + getProps('shape')]: true,
        ['r-radio__icon--disabled']: getProps('disabled'),
        ['r-radio__icon--checked']: checked,
      }"
      :style="
        getProps('shape') !== 'dot'
          ? {
              fontSize: getProps('iconSize'),
            }
          : {
              width: getProps('iconSize'),
              height: getProps('iconSize'),
              borderColor: iconStyle.borderColor,
            }
      "
    >
      <slot
        v-if="$slots.icon"
        name="icon"
        :checked="checked"
        :disabled="getProps('disabled')"
      ></slot>
      <r-icon
        v-else-if="getProps('shape') !== 'dot'"
        name="success"
        :customStyle="{
          display: 'block',
          boxSizing: 'border-box',
          //   width: '1.25em',
          //   height: '1.25em',
          //   color: 'transparent',
          //   fontSize: '0.8em',
          //   lineHeight: '1.25',
          color: getIconColor,
          // var(--r-radio-disabled-background)
          backgroundColor: checked
            ? 'var(--r-radio-checked-icon-color)'
            : getProps('disabled')
            ? 'var(--r-radio-disabled-background)'
            : 'transparent',
          borderColor: checked
            ? 'var(--r-radio-checked-icon-color)'
            : getProps('disabled')
            ? 'var(--r-radio-disabled-icon-color)'
            : 'transparent',

          textAlign: 'center',
          borderRadius: getProps('shape') == 'round' ? '100%' : 0,
          border: `1px solid var(--r-radio-border-color)`,
          transitionDuration: `var(--r-radio-duration)`,
          transitionProperty: `color,border-color, background-color`,
          ...iconStyle,
        }"
      ></r-icon>

      <view
        v-else
        :class="{
          ['r-radio__icon--dot__icon']: true,
        }"
        :style="{ backgroundColor: iconStyle.backgroundColor }"
      ></view>
    </view>

    <!-- renderLabel -->
    <text
      :class="{
        ['r-radio__label']: true,
        ['r-radio__label--' + getProps('labelPosition')]: true,
        ['r-radio__label--disabled']: getProps('disabled'),
      }"
      v-if="getProps('labelPosition') !== 'left' && $slots.default"
    >
      <slot :checked="checked" :disabled="getProps('disabled')" />
    </text>
  </view>
</template>

<script setup>
import CheckboxProps from "./props.js";

import { defineProps, ref, defineEmits, computed, inject } from "vue";

import { RADIO_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";

const parentData = inject(RADIO_KEY, {});

const parentProps = computed(() => {
  return parentData.props ? parentData.props : {};
});
const props = defineProps({ ...CheckboxProps });

const getProps = (name) => {
  const defaultPropsValue = {};

  let keys = Object.keys(CheckboxProps);
  for (let key of keys) {
    defaultPropsValue[key] = CheckboxProps[key].default;
  }

  let allProps = { ...parentProps.value, ...props };
  let allKeys = Object.keys(allProps);
  for (let key of allKeys) {
    allProps[key] =
      allProps[key] == defaultPropsValue[key]
        ? parentProps.value[key] || props[key]
        : props[key];
  }
  return allProps[name];
};

const checked = computed(() => {
  try {
    if (props.bindGroup && parentData?.props) {
      return parentData.props.value.includes(props.name);
    } else {
      return props.value;
    }
  } catch (error) {
    return false;
  }
});
const emit = defineEmits(["update:value", "click"]);

const iconRef = ref();
const iconStyle = computed(() => {
  const checkedColor = props.checkedColor;

  if (checkedColor && checked.value && !props.disabled) {
    return {
      borderColor: checkedColor,
      backgroundColor: checkedColor,
      "--r-text-color": "var(--r-white)",
    };
  } else {
    return {
      "--r-text-color": "transparent",
    };
  }
});
const getIconColor = computed(() => {
  if (checked.value && getProps("disabled")) {
    return "var(--r-radio-disabled-icon-color)";
  } else if (checked.value) {
    return "var(--r-white)";
  } else {
    return "transparent";
  }
});

const onClick = (event) => {
  if (!props.disabled) {
    toggle(!checked.value);
  }
  emit("click", event);
};
const toggle = (newValue) => {
  if (props.bindGroup && parentData?.props) {
    let value = props.name;

    parentData.updateValue(value);
  } else {
    emit("update:value", newValue);
  }
};
</script>

<style lang="scss" scoped>
.r-radio {
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &--disabled {
    cursor: not-allowed;
  }

  &--label-disabled {
    cursor: default;
  }

  &--horizontal {
    margin-right: var(--r-padding-sm);
  }

  &__icon {
    flex: none;
    // height: 1em;
    font-size: var(--r-radio-size);
    // line-height: 1em;
    cursor: pointer;

    .r-icon {
      display: block;
      box-sizing: border-box;
      width: 1.25em;
      height: 1.25em;
      color: transparent;
      font-size: 0.8em;
      line-height: 1.25;
      text-align: center;
      border: 1px solid var(--r-radio-border-color);
      transition-duration: var(--r-radio-duration);
      transition-property: color, border-color, background-color;
    }

    &--round {
      .r-icon {
        border-radius: 100%;
      }
    }

    &--dot {
      position: relative;
      border-radius: 100%;
      box-sizing: border-box;
      width: var(--r-radio-size);
      height: var(--r-radio-size);
      border: 1px solid var(--r-radio-border-color);
      transition-duration: var(--r-radio-duration);
      transition-property: border-color;

      &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        height: calc(100% - var(--r-radio-dot-size));
        width: calc(100% - var(--r-radio-dot-size));
        transition-duration: var(--r-radio-duration);
        transition-property: background-color;
      }
    }

    &--checked {
      .r-icon {
        color: var(--r-white);
        background-color: var(--r-radio-checked-icon-color);
        border-color: var(--r-radio-checked-icon-color);
      }

      &.r-radio__icon--dot {
        border-color: var(--r-radio-checked-icon-color);
        .r-radio__icon--dot__icon {
          background: var(--r-radio-checked-icon-color);
        }
      }
    }

    &--disabled {
      cursor: not-allowed;

      .r-icon {
        background-color: var(--r-radio-disabled-background);
        border-color: var(--r-radio-disabled-icon-color);
      }
    }

    &--disabled,
    &--checked {
      .r-icon {
        color: var(--r-radio-disabled-icon-color);
      }
    }
  }

  &__label {
    margin-left: var(--r-radio-label-margin);
    color: var(--r-radio-label-color);
    line-height: var(--r-radio-size);

    &--left {
      margin: 0 var(--r-radio-label-margin) 0 0;
    }

    &--disabled {
      color: var(--r-radio-disabled-label-color);
    }
  }
}
</style>
