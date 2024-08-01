<template>
  <r-config-provider :themeName="themeName">
    <page-header title="日历"></page-header>

    <view style="padding: 20rpx">
      <r-divider content-position="left">滚动切换 </r-divider>
      <r-calendar></r-calendar>
      <r-divider content-position="left">年月切换 </r-divider>
      <r-calendar switch-mode="year-month"></r-calendar>
      <r-divider content-position="left">月切换 </r-divider>
      <r-calendar switch-mode="month"></r-calendar>

      <r-divider content-position="left"
        >选择单个日期---
        {{ data.date1 ? dayjs(data.date1).format("YYYY-MM-DD") : "" }}
      </r-divider>
      <r-calendar
        switch-mode="month"
        @confirm="(e) => onConfirm(e, 'date1')"
      ></r-calendar>

      <r-divider content-position="left"
        >选择多个日期---{{
          data.date2.map((t) => dayjs(t).format("MM-DD")).join(",")
        }}
      </r-divider>
      <r-calendar
        switch-mode="month"
        type="multiple"
        @confirm="(e) => onConfirm(e, 'date2')"
      ></r-calendar>
      <r-divider content-position="left"
        >选择日期区间---{{
          data.date3.map((t) => dayjs(t).format("MM-DD")).join("~")
        }}
      </r-divider>
      <r-calendar
        switch-mode="month"
        type="range"
        allow-same-day
        @confirm="(e) => onConfirm(e, 'date3')"
      ></r-calendar>

      <r-divider content-position="left"
        >快捷选择---{{
          data.date4 ? dayjs(data.date4).format("YYYY-MM-DD") : ""
        }}
      </r-divider>
      <r-calendar
        switch-mode="month"
        :show-confirm="false"
        @confirm="(e) => onConfirm(e, 'date4')"
      ></r-calendar>

      <r-divider content-position="left">自定义颜色 </r-divider>
      <r-calendar switch-mode="month" color="#ee0a24" type="range"></r-calendar>
      <r-divider content-position="left">自定义日期范围 </r-divider>
      <r-calendar
        switch-mode="month"
        color="#ee0a24"
        type="range"
        :min-date="dayjs().year(2020).month(0).date(1).valueOf()"
        :max-date="dayjs().year(2020).month(0).date(31).valueOf()"
      ></r-calendar>

      <r-divider content-position="left">自定义按钮文字 </r-divider>

      <r-calendar
        switch-mode="month"
        color="#ee0a24"
        type="range"
        confirm-text="完成"
        confirm-disabled-text="请选择结束时间"
      ></r-calendar>

      <r-divider content-position="left">自定义日期文案 </r-divider>
      <r-calendar
        type="range"
        :formatter="formatter"
        :min-date="dayjs().subtract(1, 'year').valueOf()"
        :max-date="dayjs().add(1, 'year').valueOf()"
      ></r-calendar>

      <r-divider content-position="left">日期区间最大范围 </r-divider>

      <r-calendar type="range" :max-range="3"></r-calendar>

      <r-divider content-position="left">自定义周起始日 </r-divider>
      <r-calendar :first-day-of-week="1"></r-calendar>

      <r-divider content-position="left">配合r-popup弹窗使用</r-divider>

      <r-cell-group>
        <r-cell
          is-link
          title="弹窗选择"
          :value="data.date5 ? dayjs(data.date5).format('YYYY-MM-DD') : ''"
          @click="open({})"
        />
      </r-cell-group>
    </view>

    <r-popup
      v-model:show="show"
      round
      position="bottom"
      closeable
      @click-close-icon="show = false"
      safeAreaInsetBottom
      :customStyle="{
        padding: 0,
      }"
    >
      <view style="padding-bottom: 20px">
        <r-calendar
          switch-mode="year-month"
          :show="show"
          @confirm="
            (e) => {
              onConfirm(e, 'date5');
              show = false;
            }
          "
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

const data = ref({
  date1: "",
  date2: [],
  date3: [],
  date4: "",
});

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
};
const onConfirm = (value, field) => {
  show.value = false;

  data.value[field] = value;
};
</script>
