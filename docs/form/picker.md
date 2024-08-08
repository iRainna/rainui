<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/picker/picker'
 </script>

# r-picker

`r-picker` 选择器，提供多个选项集合供用户选择，支持单列选择、多列选择和级联选择，通常与 r-popup 弹出层组件配合使用。

## 示例

```vue
<template>
  <view class="content">
    <r-config-provider>
      <view style="padding: 20rpx">使用单列</view>
      <r-picker
        title="使用单列"
        :columns="columns3"
        v-model:value="pickerValues3"
        @change="changeData"
        @confirm="confirm"
      ></r-picker>
      <view style="padding: 20rpx">加载状态</view>

      <r-picker
        title="使用单列"
        :columns="columns2"
        loading
        v-model:value="pickerValues2"
        @change="changeData"
        @confirm="confirm"
      ></r-picker>
      <view style="padding: 20rpx">使用多列</view>
      <r-picker
        title="使用多列"
        :columns="columns2"
        v-model:value="pickerValues2"
        @change="changeData"
        @confirm="confirm"
      ></r-picker>
      <view style="padding: 20rpx">使用级联</view>
      <r-picker
        title="使用级联"
        :columns="columns"
        v-model:value="pickerValues"
        :columnsFieldNames="{
          text: 'label',
          value: 'value',
          children: 'children',
        }"
        @change="changeData"
        @confirm="confirm"
      ></r-picker>

      <view style="padding: 20rpx">配合r-popup</view>
      <r-cell title="配合r-popup使用" is-link @click="show = true" />
    </r-config-provider>
    <r-popup v-model:show="show" position="bottom">
      <view style="width: 100%">
        <r-picker
          title="使用单列"
          :columns="columns3"
          v-model:value="pickerValues3"
          @change="changeData"
          @confirm="confirm"
          @cancel="cancel"
        ></r-picker>
      </view>
    </r-popup>
  </view>
</template>
<script setup>
import { ref } from "vue";

import { region } from "@/uni_modules/r-region/js_sdk/region.js";

const columns3 = ref([
  { text: "杭州", value: "Hangzhou" },
  { text: "宁波", value: "Ningbo" },
  { text: "温州", value: "Wenzhou" },
  { text: "绍兴", value: "Shaoxing" },
  { text: "湖州", value: "Huzhou" },
]);
const columns2 = ref([
  // 第一列
  [
    { text: "周一", value: "Monday" },
    { text: "周二", value: "Tuesday" },
    { text: "周三", value: "Wednesday" },
    { text: "周四", value: "Thursday" },
    { text: "周五", value: "Friday" },
  ],
  // 第二列
  [
    { text: "上午", value: "Morning" },
    { text: "下午", value: "Afternoon" },
    { text: "晚上", value: "Evening" },
  ],
]);
const columns = ref(region);

const pickerValues = ref([]);
const pickerValues2 = ref([]);
const pickerValues3 = ref([]);
const show = ref(false);
const changeData = (e) => {
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

| 名称              | 说明                                                         | 类型    | 默认值                                                                   | 可选值   |
| ----------------- | ------------------------------------------------------------ | ------- | ------------------------------------------------------------------------ | -------- |
| value             | 当前选中项对应的值                                           | Array   | []                                                                       | -        |
| columns           | 对象数组，配置每一列显示的数据                               | Array   | []                                                                       | -        |
| columnsFieldNames | 自定义 columns 结构中的字段                                  | Object  | {<br /> text:'text'<br /> value:'value'<br /> children:'children'<br />} | -        |
| title             | 顶部栏标题                                                   | String  | -                                                                        | -        |
| confirmButtonText | 确认按钮文字                                                 | String  | 确认                                                                     |          |
| cancelButtonText  | cancelButtonText                                             | String  | 取消                                                                     |          |
| toolbarPosition   | 顶部栏位置                                                   | String  | `top`                                                                    | `bottom` |
| loading           | 是否显示加载状态                                             | Boolean | false                                                                    | true     |
| showToolbar       | 是否显示顶部栏                                               | Boolean | true                                                                     | false    |
| optionHeight      | 选项高度                                                     | String  | 44px                                                                     |          |
| visibleOptionNum  | 可见的选项个数                                               | Number  | 6                                                                        |          |
| themeName         | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称 | String  | `default`                                                                |          |

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
