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
      <slot name="toolbar"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #confirm>
      <slot name="confirm"></slot>
    </template>
    <template #cancel>
      <slot name="cancel"></slot>
    </template>
    <template #columnsTop>
      <slot name="columnsTop"></slot>
    </template>
    <template #columnsBottom>
      <slot name="columnsBottom"></slot>
    </template>
  </r-picker>
</template>
<script setup>
import { defineProps, ref, watch, computed, defineEmits } from "vue";

import { _, dayjs } from "@/uni_modules/r-utils/js_sdk/index.js";
const { cloneDeep } = _;
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
  //   可选的最小年份 //字符串
  minDate: {
    type: [String, Number],
    default: dayjs().year() - 10,
  },
  //   可选的最大年份，时间戳
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
  let list = new Array(
    dayjs(`${props.maxDate}`).year() - dayjs(`${props.minDate}`).year()
  )
    .fill(0)
    .map((t, index) => ({
      [fields.value.text]: dayjs(`${props.minDate}`).year() + Number(index),
      [fields.value.value]: dayjs(`${props.minDate}`).year() + Number(index),
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
    len = dayjs(`${chooseArr[0]}/${Number(chooseArr[1]) + 1}`)
      .endOf("month")
      .date();
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

const columns = computed(() => {
  let arr = [];

  switch (props.columnsType) {
    case "year":
      arr = [getYearList.value];
      break;
    case "month":
      arr = [getYearList.value, getMonthList.value];
      break;
    case "day":
      arr = [getYearList.value, getMonthList.value, getDayList.value];

      break;
    case "hour":
      arr = [
        getYearList.value,
        getMonthList.value,
        getDayList.value,
        getHourList.value,
      ];
      break;
    case "minute":
      arr = [
        getYearList.value,
        getMonthList.value,
        getDayList.value,
        getHourList.value,
        getMinuteList.value,
      ];
      break;
    case "second":
      arr = [
        getYearList.value,
        getMonthList.value,
        getDayList.value,
        getHourList.value,
        getMinuteList.value,
        getSecondList.value,
      ];
      break;
  }

  return arr;
});

watch(
  () => props.value,
  (value) => {
    if (value && value.length) {
      pickerValue.value = props.value;
    } else {
      switch (props.columnsType) {
        case "year":
          pickerValue.value = [getYearList.value[0][fields.value.value]];
          break;
        case "month":
          pickerValue.value = [
            getYearList.value[0][fields.value.value],
            getMonthList.value[0][fields.value.value],
          ];
          break;
        case "day":
          pickerValue.value = [
            getYearList.value[0][fields.value.value],
            getMonthList.value[0][fields.value.value],
            getDayList.value[0][fields.value.value],
          ];
          break;
        case "hour":
          pickerValue.value = [
            getYearList.value[0][fields.value.value],
            getMonthList.value[0][fields.value.value],
            getDayList.value[0][fields.value.value],

            getHourList.value[0][fields.value.value],
          ];
          break;
        case "minute":
          pickerValue.value = [
            getYearList.value[0][fields.value.value],
            getMonthList.value[0][fields.value.value],
            getDayList.value[0][fields.value.value],

            getHourList.value[0][fields.value.value],
            getMinuteList.value[0][fields.value.value],
          ];
          break;
        case "second":
          pickerValue.value = [
            getYearList.value[0][fields.value.value],
            getMonthList.value[0][fields.value.value],
            getDayList.value[0][fields.value.value],

            getHourList.value[0][fields.value.value],
            getMinuteList.value[0][fields.value.value],
            getSecondList.value[0][fields.value.value],
          ];
          break;
      }
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
