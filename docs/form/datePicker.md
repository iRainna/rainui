<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/datePicker/datePicker'
 </script>

# r-date-picker

`r-date-picker` 日期选择器，用于选择年、月、日、时、分、秒，通常与 r-popup 组件配合使用。

## 示例

```vue
<template>
  <view class="content">
    <r-config-provider>
      <view style="padding: 20rpx">
        <view style="padding: 20rpx 0">基本使用</view>
        <r-date-picker
          v-model:value="currentDate"
          title="基本使用"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">加载中</view>
        <r-date-picker
          v-model:value="currentDate2"
          title="使用年月"
          loading
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">使用年</view>
        <r-date-picker
          v-model:value="currentDate3"
          title="使用年"
          columnsType="year"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">使用年月</view>
        <r-date-picker
          v-model:value="currentDate4"
          title="使用年月"
          columnsType="month"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">使用时间到秒</view>
        <r-date-picker
          v-model:value="currentDate5"
          title="使用时间到秒"
          columnsType="second"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">格式化</view>
        <r-date-picker
          v-model:value="currentDate6"
          title="格式化"
          :formatter="formatter"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">使用过滤</view>
        <r-date-picker
          v-model:value="currentDate7"
          title="使用过滤"
          :filter="filter"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">使用时分秒且格式化</view>
        <r-date-picker
          v-model:value="currentDate8"
          title="使用时分秒且格式化"
          :filter="filter"
          columnsType="second"
          :formatter="formatter"
          :hideFields="['year', 'month', 'day']"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">配合r-popup</view>
        <r-cell title="配合r-popup使用" is-link @click="show = true" />
      </view>
    </r-config-provider>
    <r-popup v-model:show="show" position="bottom">
      <view style="width: 100%">
        <r-date-picker
          v-model:value="currentDate9"
          title="配合r-popup"
          :formatter="formatter"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
      </view>
    </r-popup>
  </view>
</template>
<script setup>
import { ref } from "vue";
import { _, dayjs } from "@/uni_modules/r-utils/js_sdk/index.js";

const currentDate = ref([]);
const currentDate2 = ref([]);
const currentDate3 = ref([]);
const currentDate4 = ref([]);
const currentDate5 = ref([]);
const currentDate6 = ref([]);
const currentDate7 = ref([]);
const currentDate8 = ref([]);
const currentDate9 = ref([]);
const show = ref(false);
const formatter = [
  {
    type: "year",
    fn: (e) => {
      e.item[e.fields.text] = e.item[e.fields.text] + "年";
      return e.item;
    },
  },
  {
    type: "month",
    fn: (e) => {
      e.item[e.fields.text] =
        (e.item[e.fields.text] < 10
          ? "0" + e.item[e.fields.text]
          : e.item[e.fields.text]) + "月";
      // console.log("e", e);
      return e.item;
    },
  },
  {
    type: "day",
    fn: (e) => {
      e.item[e.fields.text] =
        (e.item[e.fields.text] < 10
          ? "0" + e.item[e.fields.text]
          : e.item[e.fields.text]) + "日";
      return e.item;
    },
  },

  {
    type: "hour",
    fn: (e) => {
      e.item[e.fields.text] =
        (e.item[e.fields.text] < 10
          ? "0" + e.item[e.fields.text]
          : e.item[e.fields.text]) + "时";
      return e.item;
    },
  },

  {
    type: "minute",
    fn: (e) => {
      e.item[e.fields.text] =
        (e.item[e.fields.text] < 10
          ? "0" + e.item[e.fields.text]
          : e.item[e.fields.text]) + "分";
      return e.item;
    },
  },
  {
    type: "second",
    fn: (e) => {
      e.item[e.fields.text] =
        (e.item[e.fields.text] < 10
          ? "0" + e.item[e.fields.text]
          : e.item[e.fields.text]) + "秒";
      return e.item;
    },
  },
];

const filter = [
  {
    type: "year",
    fn: (e) => {
      return e.item[e.fields.value] >= dayjs().year();
    },
  },
  {
    type: "month",
    fn: (e) => {
      return e.item[e.fields.value] % 2;
    },
  },
];
const change = (e) => {
  console.log("e", e);
};
const confirm = (e) => {
  console.log("e", e);
  show.value = false;
};
const cancel = () => {
  show.value = false;
};
</script>
```

## API

### Props

| 名称              | 说明                                                         | 类型             | 默认值                                                                      | 可选值                                                 |
| ----------------- | ------------------------------------------------------------ | ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------ |
| value             | 当前选中项对应的值                                           | Array            | []                                                                          | -                                                      |
| columnsFieldNames | 自定义 columns 结构中的字段                                  | Object           | {<br /> text:'text',<br /> value:'value',<br /> children:'children',<br />} | -                                                      |
| title             | 顶部栏标题                                                   | String           | -                                                                           | -                                                      |
| confirmButtonText | 确认按钮文字                                                 | String           | 确认                                                                        |                                                        |
| cancelButtonText  | cancelButtonText                                             | String           | 取消                                                                        |                                                        |
| toolbarPosition   | 顶部栏位置                                                   | String           | `top`                                                                       | `bottom`                                               |
| loading           | 是否显示加载状态                                             | Boolean          | false                                                                       | true                                                   |
| showToolbar       | 是否显示顶部栏                                               | Boolean          | true                                                                        | false                                                  |
| optionHeight      | 选项高度                                                     | String           | 44px                                                                        |                                                        |
| visibleOptionNum  | 可见的选项个数                                               | Number           | 6                                                                           |                                                        |
| themeName         | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称 | String           | `default`                                                                   |                                                        |
| columnsType       | 选项类型                                                     | String           | `day`                                                                       | `year` `month` `day` `hour` `minute` `second`          |
| minDate           | 可选的最小年份                                               | Number \| String | [dayjs](https://ext.dcloud.net.cn/plugin?id=14725)().year() - 10            |                                                        |
| maxDate           | 可选的最大年份                                               | Number \| String | [dayjs](https://ext.dcloud.net.cn/plugin?id=14725)().year() +10             |                                                        |
| filter            | 选项过滤函数数组（具体使用可见上方 demo）                    | Array            | []                                                                          |                                                        |
| formatter         | 选项格式化函数数组                                           | Array            | []                                                                          |                                                        |
| hideFields        | 不显示的字段 (通过该字段可以显示时分秒 或者 月日等场景)      | Array            | []                                                                          | [`year` ,`month`, `day` , `hour` ,`minute` ,`second` ] |

### Slots

| 名称          | 说明                   | 参数 |
| ------------- | ---------------------- | ---- |
| toolbar       | 自定义整个顶部栏的内容 | -    |
| title         | 自定义标题内容         | -    |
| confirm       | 自定义确认按钮内容     | -    |
| cancel        | 自定义取消按钮内容     | -    |
| columnsTop    | 自定义选项上方内容     | -    |
| columnsBottom | 自定义选项下方内容     | -    |

### Events

| 名称         | 说明                 | 参数                                                   |
| ------------ | -------------------- | ------------------------------------------------------ |
| confirm      | 点击完成按钮时触发   | _{ selectedValues, selectedOptions, selectedIndexes }_ |
| cancel       | 点击取消按钮时触发   | -                                                      |
| change       | 选中的选项改变后触发 | _{ selectedValues, selectedOptions, selectedIndexes }_ |
| update:value | 选中的选项改变时触发 | selectedValues                                         |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
