<template>
  <view class="r-picker">
    <!-- renderToolbar -->
    <view
      v-if="toolbarPosition === 'top' && showToolbar"
      :class="{
        'r-picker__toolbar': true,
      }"
      :style="getComponentThemeStyle"
    >
      <slot name="toolbar" v-if="$slots.toolbar"></slot>
      <template v-else>
        <!-- renderCancel -->
        <r-button
          :customClass="`r-haptics-feedback r-picker__cancel`"
          :customStyle="{
            borderColor: 'transparent',
          }"
          @click="onCancel"
        >
          <slot v-if="$slots.cancel" name="cancel"></slot>
          <text v-else>{{ cancelButtonText }}</text>
        </r-button>

        <!-- renderTitle -->
        <slot name="title" v-if="$slots.title"></slot>
        <view v-else class="r-picker__title r-ellipsis">{{ title }}</view>

        <!-- renderConfirm -->
        <r-button
          :customClass="`r-haptics-feedback r-picker__confirm`"
          :customStyle="{
            borderColor: 'transparent',
          }"
          @click="onConfirm"
        >
          <slot v-if="$slots.confirm" name="confirm"></slot>
          <text v-else>{{ confirmButtonText }}</text>
        </r-button>
      </template>
    </view>
    <view
      v-if="loading"
      class="r-picker__loading"
      :style="{
        width: pickerRect.width + 'px',
        height: pickerRect.height + 'px',
      }"
      ><r-loading color="var(--r-picker-loading-icon-color)"
    /></view>

    <slot name="columnsTop" v-if="$slots.columnsTop" />

    <!-- renderColumns -->
    <picker-view
      :value="indexValue"
      @change="bindChange"
      :style="{
        height: `calc(${optionHeight} * ${visibleOptionNum})`,
      }"
      :indicator-style="indicatorStyle"
    >
      <picker-view-column v-for="(m, n) in currentColumns" :key="n">
        <view
          v-for="(item, index) in m"
          :key="index"
          :style="{
            height: `calc(${optionHeight})`,
            lineHeight: optionHeight,
          }"
          style="text-align: center"
        >
          {{ item[fields.text] }}
        </view>
      </picker-view-column>
    </picker-view>

    <slot name="columnsBottom" v-if="$slots.columnsBottom" />
    <!-- renderToolbar -->
    <view
      v-if="toolbarPosition === 'bottom' && showToolbar"
      :class="{
        'r-picker__toolbar': true,
      }"
    >
      <slot name="toolbar" v-if="$slots.toolbar"></slot>
      <template v-else>
        <!-- renderCancel -->
        <r-button
          :customClass="`r-haptics-feedback r-picker__cancel`"
          :customStyle="{
            borderColor: 'transparent',
          }"
          @click="onCancel"
        >
          <slot v-if="$slots.cancel" name="cancel"></slot>
          <text v-else>{{ cancelButtonText }}</text>
        </r-button>

        <!-- renderTitle -->
        <slot name="title" v-if="$slots.title"></slot>
        <view v-else class="r-picker__title r-ellipsis">{{ title }}</view>

        <!-- renderConfirm -->
        <r-button
          :customClass="`r-haptics-feedback r-picker__confirm`"
          :customStyle="{
            borderColor: 'transparent',
          }"
          @click="onConfirm"
        >
          <slot v-if="$slots.confirm" name="confirm"></slot>
          <text v-else>{{ confirmButtonText }}</text>
        </r-button>
      </template>
    </view>
  </view>
</template>
<script setup>
import pickerProps from "./props";
import {
  defineProps,
  watch,
  defineEmits,
  computed,
  ref,
  inject,
  onMounted,
  getCurrentInstance,
} from "vue";

import {
  _,
  CONFIG_PROVIDER_KEY,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import {
  getThemeCssVar,
  getComponentThemeCssVar,
} from "@/uni_modules/r-theme/js_sdk/index.js";
const emit = defineEmits(["cancel", "confirm", "change", "update:value"]);
const { proxy } = getCurrentInstance();
const props = defineProps(pickerProps);

const componentsName = "r-picker";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (themeInject?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.themeName;
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

const getColumnsType = (columns, fields) => {
  const firstColumn = columns[0];
  if (firstColumn) {
    if (Array.isArray(firstColumn)) {
      return "multiple";
    }
    if (fields.children in firstColumn) {
      return "cascade";
    }
  }
  return "default";
};
const fields = computed(() => ({
  ...{ text: "text", value: "value", children: "children" },
  ...props.columnsFieldNames,
}));
const indexValue = ref([]);
const pickerRect = ref({});
const indicatorStyle = computed(() => {
  return `height: ${props.optionHeight};line-height:${props.optionHeight}`;
});
const columnsType = computed(() => getColumnsType(props.columns, fields.value));
const maxDeep = ref(0);
const findArr = (data, chooseArr, deep = 0, columns = []) => {
  columns = [...columns, data];

  let index = chooseArr[deep] ? chooseArr[deep] : 0;
  if (data.length && data[index] && data[index].children) {
    return findArr(data[index].children, chooseArr, ++deep, columns);
  }
  if (!chooseArr.length) {
    indexValue.value = new Array(deep).fill(0);
  }
  maxDeep.value = deep;
  return columns;
};
const getCascadeColumns = computed(() => {
  return findArr(props.columns, indexValue.value);
});
const currentColumns = computed(() => {
  const { columns } = props;

  switch (columnsType.value) {
    case "multiple":
      return columns;
    case "cascade":
      return getCascadeColumns.value;
    default:
      return [columns];
  }
});

const bindChange = (e) => {
  indexValue.value = [
    ...e.detail.value,
    ...new Array(Math.max(maxDeep.value + 1 - e.detail.value.length, 0)).fill(
      0
    ),
  ];
  try {
    let values = indexValue.value.map(
      (t, index) => currentColumns.value[index][t][fields.value.value]
    );
    let options = indexValue.value.map(
      (t, index) => currentColumns.value[index][t]
    );

    emit("update:value", values);
    emit("change", {
      selectedValues: values,
      selectedOptions: options,
      selectedIndexes: indexValue.value,
    });
  } catch (error) {}
};
const onCancel = () => emit("cancel");
const onConfirm = () => {
  if (indexValue.value.length !== currentColumns.value.length) {
    indexValue.value = [
      ...indexValue.value,
      ...new Array(
        Math.max(currentColumns.value.length - indexValue.value.length, 0)
      ).fill(0),
    ];
  }
  let values = indexValue.value.map(
    (t, index) => currentColumns.value[index][t][fields.value.value]
  );
  let options = indexValue.value.map(
    (t, index) => currentColumns.value[index][t]
  );
  emit("confirm", {
    selectedValues: values,
    selectedOptions: options,
    selectedIndexes: indexValue.value,
  });
};
const getPickerRect = async () => {
  pickerRect.value = await GetRect(".r-picker", proxy);
  console.log("pickerRect.value", pickerRect.value);
};
watch(
  () => props.value,
  (value) => {
    console.log("watch==>value", value);
    if (["multiple", "default"].includes(columnsType.value)) {
      indexValue.value = value.map((item, index) => {
        let i = 0;
        for (let t of currentColumns.value[index]) {
          if (t[fields.value.value] === item) {
            return i;
          }
          i++;
        }
        return -1;
      });
    } else {
      let columns = props.columns;
      const findIndex = (value, columns, deep = 0, indexs = []) => {
        if (deep < value.length) {
          let index = -1;

          for (let t in columns) {
            if (columns[t][fields.value.value] == value[deep]) {
              index = t;
            }
          }
          indexs = [...indexs, Number(index)];
          if (columns[index] && columns[index][fields.value.children]) {
            return findIndex(
              value,
              columns[index][fields.value.children],
              ++deep,
              indexs
            );
          } else {
            return indexs;
          }
        }
        return indexs;
      };

      indexValue.value = findIndex(value, columns);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

onMounted(async () => {
  getPickerRect();
});
</script>
<style lang="scss" scoped>
::v-deep .r-haptics-feedback {
  cursor: pointer;

  &:active {
    opacity: var(--r-active-opacity);
  }
}

::v-deep .r-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.r-picker {
  position: relative;
  background: var(--r-picker-background);
  user-select: none;
}
::v-deep .r-picker {
  position: relative;
  background: var(--r-picker-background);
  user-select: none;

  &__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--r-picker-background);
    height: var(--r-picker-toolbar-height);
  }

  &__cancel,
  &__confirm {
    height: 100%;
    padding: var(--r-picker-action-padding);
    font-size: var(--r-picker-action-font-size);
    background-color: transparent;
    border: none;
  }

  &__confirm {
    color: var(--r-picker-confirm-action-color);
  }

  &__cancel {
    color: var(--r-picker-cancel-action-color);
  }

  &__title {
    position: absolute;
    left: 50%;
    color: var(--r-text-color);
    max-width: 50%;
    font-weight: var(--r-font-bold);
    font-size: var(--r-picker-title-font-size);
    line-height: var(--r-picker-title-line-height);
    text-align: center;
    transform: translateX(-50%);
  }

  &__columns {
    position: relative;
    display: flex;
    cursor: grab;
  }

  &__loading {
    position: absolute;
    top: 0;
    // width: 100%;
    // height: 100%;
    //right: 0;
    //bottom: 0;
    left: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--r-picker-loading-icon-color);
    background: var(--r-picker-loading-mask-color);
  }

  &__frame {
    position: absolute;
    top: 50%;
    right: var(--r-padding-md);
    left: var(--r-padding-md);
    z-index: 2;
    transform: translateY(-50%);
    pointer-events: none;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-image: var(--r-picker-mask-color);
    background-repeat: no-repeat;
    background-position: top, bottom;
    // fix rendering failure during animation on safari
    transform: translateZ(0);
    pointer-events: none;
  }

  &-column {
    flex: 1;
    overflow: hidden;
    font-size: var(--r-picker-option-font-size);

    &__wrapper {
      transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--r-picker-option-padding);
      color: var(--r-picker-option-text-color);

      &--disabled {
        cursor: not-allowed;
        opacity: var(--r-picker-option-disabled-opacity);
      }
    }
  }
}
</style>
