<template>
  <view
    :class="{
      'r-cascader': true,
    }"
    :style="getComponentThemeStyle"
  >
    <!-- renderHeader() -->
    <view
      v-if="showHeader"
      :class="{
        'r-cascader__header': true,
      }"
    >
      <text
        :class="{
          'r-cascader__title': true,
        }"
      >
        <slot v-if="$slots.title" name="title"></slot>
        {{ !$slots.title ? title : "" }}
      </text>
      <r-icon
        :name="closeIcon"
        :class="{
          'r-haptics-feedback': true,
          'r-cascader__close-icon': true,
        }"
        @click="onClose"
      ></r-icon>
    </view>
    <!-- renderTabs -->
    <r-tabs
      v-model:active="activeTab"
      :class="{
        'r-cascader__tabs': true,
      }"
      :color="activeColor"
      :swipeable="swipeable"
      @clickTab="onClickTab"
    >
      <!-- renderTab -->
      <r-tab
        :customClass="`r-cascader__tab ${
          !tab.selected ? 'r-cascader__tab--unselected' : ''
        }`"
        :class="{
          'r-cascader__tab': true,
          'r-cascader__tab--unselected': !tab.selected,
        }"
        :title="tab.selected ? tab.selected[textKey] : placeholder"
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        style="width: 100%"
      >
        <slot v-if="$slots.optionsTop" name="optionsTop" :tabIndex="tabIndex" />
        <!-- renderOptions {options, selected} = tab  tabIndex = tabIndex -->
        <view
          :class="{
            'r-cascader__options': true,
          }"
        >
          <!-- renderOption   selectedOption = tab.selected -->
          <view
            :class="{
              'r-cascader__option': true,
              'r-cascader__option--selected': !!(
                tab.selected && option[valueKey] === tab.selected[valueKey]
              ),
              'r-cascader__option--disabled': option.disabled,
              [option.className]: true,
            }"
            v-for="(option, index) in tab.options"
            :key="index"
            :style="{
              color:
                option.color ||
                (tab.selected && option[valueKey] === tab.selected[valueKey]
                  ? activeColor
                  : undefined),
            }"
            @click="onSelect(option, tabIndex)"
          >
            <!-- Text -->
            <slot
              v-if="$slots.option"
              :option="option"
              :selected="
                tab.selected && option[valueKey] === tab.selected[valueKey]
              "
              name="option"
            ></slot>
            <text v-else>
              {{ option[textKey] }}
            </text>
            <r-icon
              v-if="tab.selected && option[valueKey] === tab.selected[valueKey]"
              :class="{
                'r-cascader__selected-icon': true,
              }"
              :color="activeColor"
              size="40rpx"
              name="success"
            ></r-icon>
          </view>
        </view>
        <slot
          v-if="$slots.optionsBottom"
          name="optionsBottom"
          :tabIndex="tabIndex"
        />
      </r-tab>
    </r-tabs>
  </view>
</template>
<script setup>
import {
  extend,
  CONFIG_PROVIDER_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { computed, watch, nextTick, inject, ref } from "vue";

import CascaderProps from "./props.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps(CascaderProps);

const componentsName = "r-cascader";
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
const emit = defineEmits([
  "close",
  "clickTab",
  "update:value",
  "change",
  "finish",
]);

const {
  text: textKey,
  value: valueKey,
  children: childrenKey,
} = extend(
  {
    text: "text",
    value: "value",
    children: "children",
  },
  props.fieldNames
);

const tabs = ref([]);
const activeTab = ref(0);

const getSelectedOptionsByValue = (options, value) => {
  for (const option of options) {
    if (option[valueKey] === value) {
      return [option];
    }

    if (option[childrenKey]) {
      const selectedOptions = getSelectedOptionsByValue(
        option[childrenKey],
        value
      );
      if (selectedOptions) {
        return [option, ...selectedOptions];
      }
    }
  }
};
const updateTabs = () => {
  const { options, value } = props;

  if (value !== undefined) {
    const selectedOptions = getSelectedOptionsByValue(options, value);

    if (selectedOptions) {
      let optionsCursor = options;

      tabs.value = selectedOptions.map((option) => {
        const tab = {
          options: optionsCursor,
          selected: option,
        };

        const next = optionsCursor.find(
          (item) => item[valueKey] === option[valueKey]
        );
        if (next) {
          optionsCursor = next[childrenKey];
        }

        return tab;
      });

      if (optionsCursor) {
        tabs.value.push({
          options: optionsCursor,
          selected: null,
        });
      }

      nextTick(() => {
        activeTab.value = tabs.value.length - 1;
      });

      return;
    }
  }

  tabs.value = [
    {
      options,
      selected: null,
    },
  ];
};
const onSelect = (option, tabIndex) => {
  if (option.disabled) {
    return;
  }

  tabs.value[tabIndex].selected = option;

  if (tabs.value.length > tabIndex + 1) {
    tabs.value = tabs.value.slice(0, tabIndex + 1);
  }

  if (option[childrenKey]) {
    const nextTab = {
      options: option[childrenKey],
      selected: null,
    };

    if (tabs.value[tabIndex + 1]) {
      tabs.value[tabIndex + 1] = nextTab;
    } else {
      tabs.value.push(nextTab);
    }

    nextTick(() => {
      activeTab.value++;
    });
  }

  const selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean);

  emit("update:value", option[valueKey]);

  const params = {
    value: option[valueKey],
    tabIndex,
    selectedOptions,
  };
  emit("change", params);

  if (!option[childrenKey]) {
    emit("finish", params);
  }
};
const onClose = () => emit("close");
const onClickTab = ({ name, title }) => emit("clickTab", name, title);

updateTabs();
watch(() => props.options, updateTabs, { deep: true });

watch(
  () => props.value,
  (value) => {
    if (value !== undefined) {
      const values = tabs.value.map((tab) => tab.selected?.[valueKey]);
      if (values.includes(value)) {
        return;
      }
    }
    updateTabs();
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

.r-cascader {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--r-cascader-header-height);
    padding: var(--r-cascader-header-padding);
  }

  &__title {
    font-weight: var(--r-font-bold);
    font-size: var(--r-cascader-title-font-size);
    line-height: var(--r-cascader-title-line-height);
  }

  &__close-icon {
    color: var(--r-cascader-close-icon-color);
    font-size: var(--r-cascader-close-icon-size);
  }

  &__tabs {
    &.r-tabs--line .r-tabs__wrap {
      height: var(--r-cascader-tabs-height);
    }
  }

  &__tab {
    color: var(--r-cascader-tab-color);
    font-weight: var(--r-font-bold);

    &--unselected {
      color: var(--r-cascader-unselected-tab-color);
      font-weight: normal;
    }
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px var(--r-padding-md);
    font-size: var(--r-font-size-md);
    line-height: var(--r-line-height-md);
    cursor: pointer;

    &:active {
      background-color: var(--r-active-color);
    }

    &--selected {
      color: var(--r-cascader-active-color);
      font-weight: var(--r-font-bold);
    }

    &--disabled {
      color: var(--r-cascader-option-disabled-color);
      cursor: not-allowed;

      &:active {
        background-color: transparent;
      }
    }
  }

  &__selected-icon {
    font-size: var(--r-cascader-selected-icon-size);
  }

  &__options {
    box-sizing: border-box;
    height: var(--r-cascader-options-height);
    padding-top: 12rpx;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
