# r-picker

`r-picker` 选择器，提供多个选项集合供用户选择，支持单列选择、多列选择和级联选择，通常与 r-popup 弹出层组件配合使用。[全部组件](https://ext.dcloud.net.cn/plugin?id=19701) [完整文档请前往](https://irainna.github.io/rainui/form/picker.html)

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="选择器"></page-header>
    <view style="padding: 20rpx 0">
      <r-cell-group inset>
        <r-cell
          title="使用单列"
          is-link
          @click="
            open({
              columns: [
                { text: '杭州', value: 'Hangzhou' },
                { text: '宁波', value: 'Ningbo' },
                { text: '温州', value: 'Wenzhou' },
                { text: '绍兴', value: 'Shaoxing' },
                { text: '湖州', value: 'Huzhou' },
              ],
              title: '使用单列',
            })
          "
        ></r-cell>
        <r-cell
          title="加载状态"
          is-link
          @click="
            open({
              columns: [
                { text: '杭州', value: 'Hangzhou' },
                { text: '宁波', value: 'Ningbo' },
                { text: '温州', value: 'Wenzhou' },
                { text: '绍兴', value: 'Shaoxing' },
                { text: '湖州', value: 'Huzhou' },
              ],
              loading: true,
              title: '加载状态',
            })
          "
        ></r-cell>
        <r-cell
          title="使用多列"
          is-link
          @click="
            open({
              columns: [
                // 第一列
                [
                  { text: '周一', value: 'Monday' },
                  { text: '周二', value: 'Tuesday' },
                  { text: '周三', value: 'Wednesday' },
                  { text: '周四', value: 'Thursday' },
                  { text: '周五', value: 'Friday' },
                ],
                // 第二列
                [
                  { text: '上午', value: 'Morning' },
                  { text: '下午', value: 'Afternoon' },
                  { text: '晚上', value: 'Evening' },
                ],
              ],

              title: '使用多列',
            })
          "
        ></r-cell>
        <r-cell
          title="使用级联"
          is-link
          @click="
            open({
              columns: region,
              columnsFieldNames: {
                text: 'label',
                value: 'value',
                children: 'children',
              },
              title: '使用级联',
            })
          "
        ></r-cell>
      </r-cell-group>
    </view>

    <r-popup v-model:show="show" position="bottom">
      <view style="width: 100%">
        <r-picker
          :show="show"
          :title="title"
          :columns="columns"
          :loading="loading"
          :columnsFieldNames="columnsFieldNames"
          v-model:value="pickerValues"
          @change="onChange"
          @confirm="confirm"
          @cancel="cancel"
        ></r-picker>
      </view>
    </r-popup>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";

import { region } from "@/uni_modules/r-region/js_sdk/region.js";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();

const columns = ref(region);
const loading = ref(false);
const title = ref("");
const pickerValues = ref([]);

const columnsFieldNames = ref({});
const show = ref(false);
const onChange = (e) => {
  console.log("e", e);
};
const confirm = (e) => {
  console.log("e", e);
  show.value = false;
};
const cancel = () => {
  show.value = false;
};

const open = (e) => {
  show.value = true;
  columns.value = e.columns || [];
  loading.value = e.loading || false;
  title.value = e.title || "";
  columnsFieldNames.value = e.columnsFieldNames;
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
| change       | 选中的选项改变后触发 | { selectedValues, selectedOptions, selectedIndexes }   |
| update:value | 选中的选项改变时触发 | selectedValues                                         |
