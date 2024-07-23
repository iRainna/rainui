<template>
  <view
    :class="{
      ['r-checkbox']: true,
      ['r-checkbox--disabled']: getProps('disabled'),
      ['r-checkbox--label-disabled']: getProps('labelDisabled'),
      ['r-checkbox--' + getProps('direction')]: true,
    }"
    @click="onClick"
    :style="getComponentThemeStyle"
  >
    <!-- renderLabel -->
    <text
      :class="{
        ['r-checkbox__label']: true,
        ['r-checkbox__label--' + getProps('labelPosition')]: true,
        ['r-checkbox__label--disabled']: getProps('disabled'),
      }"
      v-if="getProps('labelPosition') === 'left' && $slots.default"
    >
      <slot />
    </text>

    <!-- renderIcon -->
    <view
      ref="iconRef"
      :class="{
        ['r-checkbox__icon']: true,
        ['r-checkbox__icon--' + getProps('shape')]: true,
        ['r-checkbox__icon--disabled']: getProps('disabled'),
        ['r-checkbox__icon--checked']: checked,
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
          // var(--r-checkbox-disabled-background)
          backgroundColor: getProps('disabled')
            ? 'var(--r-checkbox-disabled-background)'
            : checked
            ? 'var(--r-checkbox-checked-icon-color)'
            : 'transparent',
          borderColor: checked
            ? 'var(--r-checkbox-checked-icon-color)'
            : getProps('disabled')
            ? 'var(--r-checkbox-disabled-icon-color)'
            : 'transparent',

          textAlign: 'center',
          borderRadius: getProps('shape') == 'round' ? '100%' : 0,
          border: `1px solid var(--r-checkbox-border-color)`,
          transitionDuration: `var(--r-checkbox-duration)`,
          transitionProperty: `color,border-color, background-color`,
          ...iconStyle,
        }"
      ></r-icon>
      <!-- :style="{ ...iconStyle }" -->
      <view
        v-else
        :class="{
          ['r-checkbox__icon--dot__icon']: true,
        }"
        :style="{ backgroundColor: iconStyle.backgroundColor }"
      ></view>
    </view>

    <!-- renderLabel -->
    <text
      :class="{
        ['r-checkbox__label']: true,
        ['r-checkbox__label--' + getProps('labelPosition')]: true,
        ['r-checkbox__label--disabled']: getProps('disabled'),
      }"
      v-if="getProps('labelPosition') !== 'left' && $slots.default"
    >
      <slot />
    </text>
  </view>
</template>
<script setup>
import CheckboxProps from "./props.js";
import { ref, nextTick, computed, inject } from "vue";
import {
  CHECKBOX_GROUP_KEY,
  CONFIG_PROVIDER_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";

const parentData = inject(CHECKBOX_GROUP_KEY, {});

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

  let allProps = {};
  for (let key of keys) {
    let value = null;

    if (parentProps.value[key] && props[key] == defaultPropsValue[key]) {
      value = parentProps.value[key];
    } else {
      value = props[key];
    }

    allProps[key] = value;
  }
  return allProps[name];
};

const componentsName = "r-checkbox";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = getProps("themeName");

  if (themeInject?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.themeName;
  }
  if (getProps("themeName") != "default") {
    //单独设置了组件的 就用单独设置的
    themeName = getProps("themeName");
  }

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  };
});

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
      // color: "#fff",
    };
  } else {
    return {
      "--r-text-color": "transparent",
      // color: "transparent",
    };
  }
});
const getIconColor = computed(() => {
  if (checked.value && getProps("disabled")) {
    return "var(--r-checkbox-disabled-icon-color)";
  } else if (checked.value) {
    return "var(--r-white)";
  } else {
    return "transparent";
  }
});

const onClick = (event) => {
  if (!props.disabled) {
    // emit("toggle", !checked.value);
    toggle(!checked.value);
  }
  emit("click", event);
};
const toggle = (newValue) => {
  if (props.bindGroup && parentData?.props) {
    let value = [props.name];
    // let arr = JSON.parse(JSON.stringify(parentData.props.value));
    if (newValue) {
      value = [...parentData.props.value, props.name];
    } else {
      value = parentData.props.value.filter((i) => i != props.name);
    }

    parentData.updateValue(value);
  } else {
    emit("update:value", newValue);
    nextTick(() => {
      emit("change", newValue);
    });
  }
};
</script>
<style lang="scss" scoped>
.r-checkbox {
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
    font-size: var(--r-checkbox-size);
    // line-height: 1em;
    cursor: pointer;
    overflow: hidden;

    .r-icon {
      display: block;
      box-sizing: border-box;
      width: 1.25em;
      height: 1.25em;
      color: transparent;
      font-size: 0.8em;
      line-height: 1.25;
      text-align: center;
      border: 2rpx solid var(--r-checkbox-border-color);
      transition-duration: var(--r-checkbox-duration);
      transition-property: color, border-color, background-color;
    }

    &--round {
      .r-icon {
        border-radius: 100%;
      }
    }

    &--checked {
      .r-icon {
        color: var(--r-white);
        background-color: var(--r-checkbox-checked-icon-color);
        border-color: var(--r-checkbox-checked-icon-color);
      }
    }

    &--disabled {
      cursor: not-allowed;

      .r-icon {
        background-color: var(--r-checkbox-disabled-background);
        border-color: var(--r-checkbox-disabled-icon-color);
      }
    }

    &--disabled,
    &--checked {
      .r-icon {
        color: var(--r-checkbox-disabled-icon-color);
      }
    }
  }

  &__label {
    margin-left: var(--r-checkbox-label-margin);
    color: var(--r-checkbox-label-color);
    line-height: var(--r-checkbox-size);

    &--left {
      margin: 0 var(--r-checkbox-label-margin) 0 0;
    }

    &--disabled {
      color: var(--r-checkbox-disabled-label-color);
    }
  }
}
</style>
