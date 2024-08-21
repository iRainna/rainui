<template>
  <r-config-provider :themeName="themeName">
    <page-header title="日历"></page-header>
    <view style="padding: 20rpx 0">
      <r-cell-group inset>
        <r-cell
          title="滚动切换"
          is-link
          :value="data.date0"
          @click="
            open({
              changeField: 'date0',
            })
          "
        />
        <r-cell
          title="年月切换"
          is-link
          :value="data.date1"
          @click="
            open({
              switchMode: 'year-month',
              changeField: 'date1',
            })
          "
        />

        <r-cell
          title="月切换"
          is-link
          :value="data.date2"
          @click="
            open({
              switchMode: 'month',
              changeField: 'date2',
            })
          "
        />
        <r-cell
          title="单个日期"
          is-link
          :value="data.date3"
          @click="
            open({
              switchMode: 'month',
              type: 'single',
              changeField: 'date3',
            })
          "
        />

        <r-cell
          title="多个日期"
          is-link
          :value="data.date4"
          @click="
            open({
              switchMode: 'month',
              type: 'multiple',
              changeField: 'date4',
            })
          "
        />

        <r-cell
          title="选择日期区间"
          is-link
          :value="data.date5"
          @click="
            open({
              switchMode: 'month',
              type: 'range',
              changeField: 'date5',
            })
          "
        />

        <r-cell
          title="快捷选择"
          is-link
          :value="data.date6"
          @click="
            open({
              switchMode: 'month',
              showConfirm: false,
              changeField: 'date6',
            })
          "
        />

        <r-cell
          title="自定义颜色"
          is-link
          :value="data.date7"
          @click="
            open({
              switchMode: 'month',

              type: 'range',
              color: '#ee0a24',
              changeField: 'date7',
            })
          "
        />
        <r-cell
          title="自定义按钮文字"
          is-link
          :value="data.date8"
          @click="
            open({
              switchMode: 'month',

              type: 'range',
              color: '#ee0a24',
              confirmText: '完成',
              confirmDisabledText: '请选择结束时间',
              changeField: 'date8',
            })
          "
        />

        <r-cell
          title="日期区间最大范围"
          is-link
          :value="data.date9"
          @click="
            open({
              switchMode: 'month',

              type: 'range',

              maxRange: '3',
              changeField: 'date9',
            })
          "
        />

        <r-cell
          title="自定义周起始日"
          is-link
          :value="data.date10"
          @click="
            open({
              switchMode: 'month',

              type: 'range',
              firstDayOfWeek: 1,
              changeField: 'date10',
            })
          "
        />

        <r-cell title="单独使用">
          <template #value>
            <r-switch v-model:value="flag"></r-switch>
          </template>
        </r-cell>
      </r-cell-group>
      <r-divider content-position="left" v-if="flag">单独使用 </r-divider>
      <r-calendar v-if="flag"></r-calendar>
    </view>

    <r-popup
      v-model:show="show"
      round
      position="bottom"
      closeable
      destroy
      @click-close-icon="show = false"
      safeAreaInsetBottom
      :customStyle="{
        padding: 0,
      }"
    >
      <!-- switch-mode="year-month" -->
      <!-- :show="show" -->
      <view style="padding-bottom: 20px">
        <r-calendar
          :switch-mode="switchMode"
          :type="type"
          :color="color"
          :showConfirm="showConfirm"
          :confirmText="confirmText"
          :confirmDisabledText="confirmDisabledText"
          :maxRange="maxRange"
          :firstDayOfWeek="firstDayOfWeek"
          :defaultDate="defaultDate[changeField]"
          @confirm="onConfirm"
        ></r-calendar>
      </view>
    </r-popup>
  </r-config-provider>
</template>

<script setup>
import { dayjs } from "@/uni_modules/r-utils/js_sdk/index.js";
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const show = ref(false);
const switchMode = ref("none");
const type = ref("single");
const showConfirm = ref(true);
const color = ref("#1989fa");
const confirmText = ref("");
const confirmDisabledText = ref("");
const maxRange = ref(null);
const firstDayOfWeek = ref(0);
const flag = ref(false);
const data = ref({});
const defaultDate = ref({});
const changeField = ref("");

const formatter = (day) => {
  const month = dayjs(day.date).month() + 1;
  const date = dayjs(day.date).date();

  if (month === 5) {
    if (date === 1) {
      day.topInfo = "劳动节";
    } else if (date === 4) {
      day.topInfo = "青年节";
    } else if (date === 11) {
      day.text = "今天";
    }
  } else if (month === 7) {
    if (date === 1) {
      day.topInfo = "建党节";
    }
  } else if (month === 8) {
    if (date === 1) {
      day.topInfo = "建军节";
    }
  } else if (month === 10) {
    if (date === 1) {
      day.topInfo = "国庆节";
    }
  }

  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }

  return day;
};

const open = (e) => {
  show.value = true;
  switchMode.value = e.switchMode || "none";
  type.value = e.type || "single";
  showConfirm.value = e.showConfirm !== false;
  color.value = e.color || "#1989fa";
  confirmDisabledText.value = e.confirmDisabledText || "确定";
  confirmText.value = e.confirmText || "确定";
  maxRange.value = e.maxRange || null;
  firstDayOfWeek.value = e.firstDayOfWeek || 0;
  changeField.value = e.changeField || "";
};
const onConfirm = (value) => {
  show.value = false;
  if (changeField.value) {
    if (type.value === "multiple") {
      defaultDate.value[changeField.value] = value.map((t) =>
        dayjs(t).valueOf()
      );
      value = value.map((i) => dayjs(i).format("YYYY-MM-DD")).join(",");
    } else if (type.value === "range") {
      defaultDate.value[changeField.value] = value.map((t) =>
        dayjs(t).valueOf()
      );
      value = value.map((i) => dayjs(i).format("YYYY-MM-DD")).join("~");
    } else {
      defaultDate.value[changeField.value] = dayjs(value).valueOf();
      value = dayjs(value).format("YYYY-MM-DD");
    }

    data.value[changeField.value] = value;
  }
};
</script>
