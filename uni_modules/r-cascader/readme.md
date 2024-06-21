# r-cascader 级联选择

r-cascader 级联选择框，用于多层级数据的选择，典型场景为省市区选择。

## 示例

```vue
<template>
  <view @click="cShow = !cShow">打开 {{ fieldValue }}</view>

  <r-popup v-model:show="cShow" round position="bottom">
    <r-cascader
      v-if="cShow"
      v-model:value="cascaderValue"
      title="请选择所在地区"
      :options="options"
      @close="cShow = false"
      @finish="onFinish"
    />
  </r-popup>
</template>

<script setup>
const fieldValue = ref("");
const cShow = ref(false);
const cascaderValue = ref("");
const options = ref([
  {
    text: "浙江省",
    value: "330000",
    children: [
      {
        text: "杭州市",
        value: "330100",
        children: [{ text: "经开区", value: "331110" }],
      },
    ],
  },
  {
    text: "江苏省",
    value: "320000",
    children: [
      {
        text: "南京市",
        value: "320100",
        children: [{ text: "经开区", value: "320110" }],
      },
    ],
  },
]);

const onFinish = ({ selectedOptions }) => {
  cShow.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join("/");
};
</script>
```

## API

### Props

| 名称        | 说明                                                         | 类型           | 默认值                                                       | 可选值 |
| ----------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------------------ | ------ |
| value       | 选中项的值                                                   | String, Number | -                                                            | -      |
| title       | 顶部标题                                                     | String         |                                                              |        |
| options     | 可选项数据源                                                 | Array          | []                                                           |        |
| placeholder | 未选中时的提示文案                                           | String         | 请选择                                                       |        |
| activeColor | 选中状态的高亮颜色                                           | String         | #1989fa                                                      |        |
| closeable   | 是否显示关闭图标                                             | Boolean        | true                                                         |        |
| showHeader  | 是否展示标题栏                                               | Boolean        | true                                                         |        |
| closeIcon   | 关闭图标名称，等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 name 属性 | String         | cross                                                        |        |
| fieldNames  | 自定义 options 结构中的字段                                  | Object         | {<br /> text: "text",<br /> value: "value",<br /> children: "children",<br />} |        |
| themeName   | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 主题名称 | String         | default                                                      |        |

### props options 数据结构

| 名称      | 说明                     | 类型             |
| --------- | ------------------------ | ---------------- |
| text      | 选项文字（必填）         | String           |
| value     | 选项对应的值（必填）     | String \| Number |
| color     | 选项文字颜色             | String           |
| children  | 子选项列表               | Array            |
| disabled  | 是否禁用选项             | Boolean          |
| className | 为对应列添加额外的 class | String           |

### Slots

| 名称          | 说明                 | 参数                  |
| ------------- | -------------------- | --------------------- |
| title         | 自定义顶部标题       | -                     |
| option        | 自定义选项文字       | {_option_,_selected_} |
| optionsTop    | 自定义选项上方的内容 | {_tabIndex_}          |
| optionsBottom | 自定义选项下方的内容 | {_tabIndex_}          |

### Events

| 名称         | 说明                   | 回调参数                                    |
| ------------ | ---------------------- | ------------------------------------------- |
| close        | 点击关闭图标时触发     | -                                           |
| clickTab     | 点击标签时触发         | _tabIndex_,_title_                          |
| update:value | 选中项变化时触发       | value                                       |
| change       | 选中项变化时触发       | { _value_ , _selectedOptions_ , _tabIndex_} |
| finish       | 全部选项选择完成后触发 | { _value_ , _selectedOptions_ , _tabIndex_} |