<template>
  <r-picker
    v-model:value="pickerValue"
    :columns="columns"
    :columnsFieldNames="columnsFieldNames"
    :title="title"
    :confirmButtonText="confirmButtonText"
    :cancelButtonText="cancelButtonText"
    :toolbarPosition="toolbarPosition"
    :loading="loading"
    :showToolbar="showToolbar"
    :optionHeight="optionHeight"
    :visibleOptionNum="visibleOptionNum"
    :themeName="themeName"
    @confirm="confirm"
    @change="change"
    @update:value="updateValue"
    @cancel="cancel"
  >
    <template #toolbar>
      <slot name="toolbar" v-if="!!$slots.toolbar"></slot>
      <view class="r-picker__toolbar" v-else>
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
      </view>
    </template>

    <template #columnsTop>
      <slot name="columnsTop" v-if="$slots.columnsTop"></slot>
    </template>
    <template #columnsBottom>
      <slot name="columnsBottom" v-if="$slots.columnsBottom"></slot>
    </template>
  </r-picker>
</template>
<script setup>
import { defineProps, ref, watch, computed, defineEmits } from "vue";

import { _, dayjs } from "@/uni_modules/r-utils/js_sdk/index.js";
const { cloneDeep, findIndex } = _;
const emit = defineEmits(["cancel", "confirm", "change", "update:value"]);
const props = defineProps({
  // 当前选中项对应的值
  value: {
    type: [Array],
    default: () => [],
  },

  //   自定义 columns 结构中的字段
  columnsFieldNames: {
    type: Object,
    default: () => ({
      text: "text",
      value: "value",
      children: "children",
    }),
  },
  //   顶部栏标题
  title: {
    type: String,
    default: "",
  },
  //   确认按钮文字，设置为空字符串可以隐藏按钮
  confirmButtonText: {
    type: String,
    default: "确认",
  },
  //   取消按钮文字，设置为空字符串可以隐藏按钮
  cancelButtonText: {
    type: String,
    default: "取消",
  },
  //   顶部栏位置 可选值为 bottom
  toolbarPosition: {
    type: String,
    default: "top",
  },
  //   是否显示加载状态
  loading: {
    type: Boolean,
    default: false,
  },

  //   是否显示顶部栏
  showToolbar: {
    type: Boolean,
    default: true,
  },
  // 选项高度
  optionHeight: {
    type: String,
    default: "44px",
  },
  //   可见的选项个数
  visibleOptionNum: {
    type: Number,
    default: 6,
  },
  // 选项类型  year month day hour minute second
  columnsType: {
    type: String,
    default: "day",
  },
  //   可选的最小年份
  minDate: {
    type: [String, Number],
    default: dayjs().year() - 10,
  },
  //   可选的最大年份
  maxDate: {
    type: [String, Number],
    default: dayjs().year() + 10,
  },
  // 选项过滤函数
  filter: {
    type: Array,
    default: () => [],
  },
  // 选项格式化函数
  formatter: {
    type: Array,
    default: () => [],
  },
  //不显示的字段 year month day hour minute second
  hideFields: {
    type: Array,
    default: () => [],
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
});
const fields = computed(() => ({
  ...{ text: "text", value: "value", children: "children" },
  ...props.columnsFieldNames,
}));
const pickerValue = ref([]);
const confirm = (e) => {
  emit("confirm", e);
};

const change = (e) => {
  emit("change", e);
};

const updateValue = (e) => {
  emit("update:value", e);
};

const cancel = () => {
  emit("cancel");
};
const getYearList = computed(() => {
  let formatter = props.formatter.find((t) => t.type == "year");
  let filter = props.filter.find((t) => t.type == "year");
  let list = new Array(Number(props.maxDate) - Number(props.minDate))
    .fill(0)
    .map((t, index) => ({
      [fields.value.text]: Number(props.minDate) + Number(index),
      [fields.value.value]: Number(props.minDate) + Number(index),
    }));
  if (formatter && formatter.fn) {
    list = list.map((item, index, array) =>
      formatter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }
  if (filter && filter.fn) {
    list = list.filter((item, index, array) =>
      filter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  return list;
});
const getMonthList = computed(() => {
  let formatter = props.formatter.find((t) => t.type == "month");
  let filter = props.filter.find((t) => t.type == "month");

  let list = new Array(12).fill(0).map((t, index) => ({
    [fields.value.text]: Number(index) + 1,
    [fields.value.value]: Number(index),
  }));

  if (formatter && formatter.fn) {
    list = list.map((item, index, array) =>
      formatter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  if (filter && filter.fn) {
    list = list.filter((item, index, array) =>
      filter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  return list;
});
const getDayList = computed(() => {
  let formatter = props.formatter.find((t) => t.type == "day");
  let filter = props.filter.find((t) => t.type == "day");

  let len = 30;
  let chooseArr = cloneDeep(pickerValue.value);

  if (chooseArr.length >= 2) {
    len = dayjs().year(chooseArr[0]).month(chooseArr[1]).endOf("month").date();
  }
  let list = new Array(len).fill(0).map((t, index) => ({
    [fields.value.text]: Number(index) + 1,
    [fields.value.value]: Number(index) + 1,
  }));

  if (formatter && formatter.fn) {
    list = list.map((item, index, array) =>
      formatter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  if (filter && filter.fn) {
    list = list.filter((item, index, array) =>
      filter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  return list;
});

const getHourList = computed(() => {
  let formatter = props.formatter.find((t) => t.type == "hour");
  let filter = props.filter.find((t) => t.type == "hour");
  let list = new Array(24).fill(0).map((t, index) => ({
    [fields.value.text]: Number(index),
    [fields.value.value]: Number(index),
  }));

  if (formatter && formatter.fn) {
    list = list.map((item, index, array) =>
      formatter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  if (filter && filter.fn) {
    list = list.filter((item, index, array) =>
      filter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  return list;
});

const getMinuteList = computed(() => {
  let formatter = props.formatter.find((t) => t.type == "minute");
  let filter = props.filter.find((t) => t.type == "minute");
  let list = new Array(60).fill(0).map((t, index) => ({
    [fields.value.text]: Number(index),
    [fields.value.value]: Number(index),
  }));

  if (formatter && formatter.fn) {
    list = list.map((item, index, array) =>
      formatter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  if (filter && filter.fn) {
    list = list.filter((item, index, array) =>
      filter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  return list;
});

const getSecondList = computed(() => {
  let formatter = props.formatter.find((t) => t.type == "second");
  let filter = props.filter.find((t) => t.type == "second");
  let list = new Array(60).fill(0).map((t, index) => ({
    [fields.value.text]: Number(index),
    [fields.value.value]: Number(index),
  }));

  if (formatter && formatter.fn) {
    list = list.map((item, index, array) =>
      formatter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }

  if (filter && filter.fn) {
    list = list.filter((item, index, array) =>
      filter.fn({
        item,
        index,
        array,
        fields: fields.value,
        pickerValue: pickerValue.value,
      })
    );
  }
  return list;
});
const allFields = computed(() => [
  {
    key: "year",
    value: getYearList.value,
  },
  {
    key: "month",
    value: getMonthList.value,
  },
  {
    key: "day",
    value: getDayList.value,
  },
  {
    key: "hour",
    value: getHourList.value,
  },
  {
    key: "minute",
    value: getMinuteList.value,
  },
  {
    key: "second",
    value: getSecondList.value,
  },
]);
const columns = computed(() => {
  let index = findIndex(allFields.value, (t) => t.key == props.columnsType);
  let list = allFields.value.filter(
    (t, i) => i <= index && !props.hideFields.includes(t.key)
  );
  return list.map((t) => t.value);
});

watch(
  () => props.value,
  (value) => {
    if (value && value.length) {
      pickerValue.value = props.value;
    } else {
      let index = findIndex(allFields.value, (t) => t.key == props.columnsType);
      let list = allFields.value.filter(
        (t, i) => i <= index && !props.hideFields.includes(t.key)
      );
      pickerValue.value = list.map((t) => t.value[0][fields.value.value]);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
