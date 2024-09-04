# r-calendar

`r-calendar` 日历， 日历组件用于选择日期或日期区间。

[在线示例](https://rainui.cn/h5/index.html#/pages/example/calendar/calendar) [完整文档](https://rainui.cn/form/calendar.html) [完整文档](https://irainna.github.io/rainui/form/calendar.html)

## 示例

```vue
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
```

## API

### Props

| 参数                | 说明                                                         | 类型            | 默认值                                       | 可选值                      |
| ------------------- | ------------------------------------------------------------ | --------------- | -------------------------------------------- | --------------------------- |
| type                | 选择类型：single 表示选择单个日期，multiple 表示选择多个日期，range 表示选择日期区间 | String          | `single `                                    | `single` `multiple` `range` |
| switchMode          | 切换模式：none 平铺展示所有月份，不展示切换按钮，month 支持按月切换，展示上个月/下个月按钮，year-month 支持按年切换，也支持按月切换，展示上一年/下一年，上个月/下个月按钮 | String          | `none`                                       | `none` `month` `year-month` |
| title               | 日历标题                                                     | String          | `日期选择`                                   | -                           |
| color               | 主题色，对底部按钮和选中日期生效                             | String          | `#1989fa`                                    |                             |
| minDate             | 可选择的最小日期(时间戳)                                     | Number          | `当前时间的时间戳`                           |                             |
| maxDate             | 可选择的最大日期(时间戳)                                     | Number          | `当前时间六个月后的时间戳`                   |                             |
| defaultDate         | 默认选中的日期，type 为 multiple 或 range 时为数组，传入 null 表示默认不选择 | Number \| Array | `null`                                       |                             |
| rowHeight           | 日期行高(px)                                                 | Number          | `64`                                         |                             |
| contentHeight       | 日期内容的高度(px) 仅 switchMode=none 时生效                 | Number          | `400`                                        |                             |
| formatter           | 日期格式化函数                                               | Function        | `e=>e`                                       |                             |
| formatMonthTitle    | 标题格式化函数                                               | Function        | `(year, month) => year+'年'+'month'+'月'`    |                             |
| componentWidth      | 组件宽度 `1.0.7新增`                                         | String          | `100vw`                                      |                             |
| lazyRender          | 是否只渲染可视区域的内容                                     | Boolean         | true                                         |                             |
| showMark            | 是否显示月份背景水印                                         | Boolean         | true                                         |                             |
| showTitle           | 是否展示日历标题                                             | Boolean         | true                                         |                             |
| showSubtitle        | 是否展示日历副标题（年月）                                   | Boolean         | true                                         |                             |
| showConfirm         | 是否展示确认按钮                                             | Boolean         | true                                         |                             |
| readonly            | 是否为只读状态，只读状态下不能选择日期                       | Boolean         | false                                        |                             |
| confirmText         | 确认按钮的文字                                               | String          | `确定`                                       |                             |
| confirmDisabledText | 确认按钮处于禁用状态时的文字                                 | String          | `确定`                                       |                             |
| firstDayOfWeek      | 设置周起始日 0-6                                             | Number          | `0`                                          |                             |
| weekdays            | 星期的文案                                                   | Array           | `["日", "一", "二", "三", "四", "五", "六"]` |                             |
| themeName           | r-theme 主题名称                                             | String          | `default`                                    |                             |
| maxRange            | 日期区间最多可选天数 当 Calendar 的 type 为 range 或 multiple 时，支持 | String \|Number | -                                            |                             |
| rangePrompt         | 范围选择超过最多可选天数时的提示文案 当 Calendar 的 type 为 range 或 multiple 时，支持 | Function        | `(num) => '最多选择'+ num + '天'`            |                             |
| showRangePrompt     | 范围选择超过最多可选天数时，是否展示提示文案 当 Calendar 的 type 为 range 时，支持 | Boolean         | true                                         |                             |
| allowSameDay        | 是否允许日期范围的起止时间为同一天 当 Calendar 的 type 为 range 时，支持 | Boolean         | false                                        |                             |

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