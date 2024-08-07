# r-calendar

`r-calendar` 日历， 日历组件用于选择日期或日期区间。该组件为子组件请使用[r-calendar](https://ext.dcloud.net.cn/plugin?id=19123) 

## 示例

​    

```vue
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
```



## API

### Props

| 参数                | 说明                                                         | 类型            | 默认值                                       | 可选值                       |
| ------------------- | ------------------------------------------------------------ | --------------- | -------------------------------------------- | ---------------------------- |
| type                | 选择类型：single 表示选择单个日期，multiple 表示选择多个日期，range 表示选择日期区间 | String          | `single `                                    | `single` `multiple`  `range` |
| switchMode          | 切换模式：none 平铺展示所有月份，不展示切换按钮，month 支持按月切换，展示上个月/下个月按钮，year-month 支持按年切换，也支持按月切换，展示上一年/下一年，上个月/下个月按钮 | String          | `none`                                       | `none` `month`  `year-month` |
| title               | 日历标题                                                     | String          | `日期选择`                                   | -                            |
| color               | 主题色，对底部按钮和选中日期生效                             | String          | `#1989fa`                                    |                              |
| minDate             | 可选择的最小日期(时间戳)                                     | Number          | `当前时间的时间戳`                           |                              |
| maxDate             | 可选择的最大日期(时间戳)                                     | Number          | `当前时间六个月后的时间戳`                   |                              |
| defaultDate         | 默认选中的日期，type 为 multiple 或 range 时为数组，传入 null 表示默认不选择 | Number \| Array | `null`                                       |                              |
| rowHeight           | 日期行高(px)                                                 | Number          | `64`                                         |                              |
| contentHeight       | 日期内容的高度(px) 仅switchMode=none时生效                   | Number          | `400`                                        |                              |
| formatter           | 日期格式化函数                                               | Function        | `e=>e`                                       |                              |
| formatMonthTitle    | 标题格式化函数                                               | Function        | `(year, month) => year+'年'+'month'+'月'`    |                              |
| lazyRender          | 是否只渲染可视区域的内容                                     | Boolean         | true                                         |                              |
| showMark            | 是否显示月份背景水印                                         | Boolean         | true                                         |                              |
| showTitle           | 是否展示日历标题                                             | Boolean         | true                                         |                              |
| showSubtitle        | 是否展示日历副标题（年月）                                   | Boolean         | true                                         |                              |
| showConfirm         | 是否展示确认按钮                                             | Boolean         | true                                         |                              |
| readonly            | 是否为只读状态，只读状态下不能选择日期                       | Boolean         | false                                        |                              |
| confirmText         | 确认按钮的文字                                               | String          | `确定`                                       |                              |
| confirmDisabledText | 确认按钮处于禁用状态时的文字                                 | String          | `确定`                                       |                              |
| firstDayOfWeek      | 设置周起始日 0-6                                             | Number          | `0`                                          |                              |
| weekdays            | 星期的文案                                                   | Array           | `["日", "一", "二", "三", "四", "五", "六"]` |                              |
| themeName           | r-theme主题名称                                              | String          | `default`                                    |                              |
| show                | 是否显示(通常在popup中使用)                                  | Boolean         | true                                         |                              |
| maxRange            | 日期区间最多可选天数 当 Calendar 的 type 为 range 或 multiple 时，支持 | String \|Number | -                                            |                              |
| rangePrompt         | 范围选择超过最多可选天数时的提示文案 当 Calendar 的 type 为 range 或 multiple 时，支持 | Function        | `(num) => '最多选择'+ num + '天'`            |                              |
| showRangePrompt     | 范围选择超过最多可选天数时，是否展示提示文案 当 Calendar 的 type 为 range 时，支持 | Boolean         | true                                         |                              |
| allowSameDay        | 是否允许日期范围的起止时间为同一天 当 Calendar 的 type 为 range 时，支持 | Boolean         | false                                        |                              |

### Day 数据结构

##### 日历中的每个日期都对应一个 Day 对象，通过`formatter`属性可以自定义 Day 对象的内容

| 键名       | 说明                                                         | 类型   |
| ---------- | ------------------------------------------------------------ | ------ |
| date       | 日期对应的 [dayjs](https://ext.dcloud.net.cn/plugin?id=14725) 对象 | Object |
| type       | 日期类型，可选值为 `selected`、`start`、`middle`、`end`、`disabled` | String |
| text       | 中间显示的文字                                               | String |
| topInfo    | 上方的提示信息                                               | String |
| bottomInfo | 下方的提示信息                                               | String |
| className  | 额外类名                                                     | String |

### Events

| 名称              | 说明                                                         | 参数   |
| ----------------- | ------------------------------------------------------------ | ------ |
| select            | 点击并选中任意日期时触发                                     | value  |
| confirm           | 日期选择完成后触发，若 `show-confirm` 为 `true`，则点击确认按钮后触发 | value  |
| unselect          | 当日历组件的 `type` 为 `multiple` 时，取消选中日期时触发     | value  |
| overRange         | 范围选择超过最多可选天数时触发                               | -      |
| clickSubtitle     | 点击日历副标题时触发                                         | event  |
| clickDisabledDate | 点击禁用日期时触发                                           | value  |
| panelChange       | 日历面板切换时触发                                           | {date} |

### Slots

| 名称        | 说明                   | 参数        |
| ----------- | ---------------------- | ----------- |
| title       | 自定义标题             | -           |
| subtitle    | 自定义日历副标题       | {text,date} |
| monthTitle  | 自定义每个月份的小标题 | {text,date} |
| footer      | 自定义底部区域内容     | -           |
| confirmText | 自定义确认按钮的内容   | {disabled}  |
| prevMonth   | 自定义上个月按钮       | {disabled}  |
| prevYear    | 自定义上一年按钮       | {disabled}  |
| nextMonth   | 自定义下个月按钮       | {disabled}  |
| nextYear    | 自定义下一年按钮       | {disabled}  |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)