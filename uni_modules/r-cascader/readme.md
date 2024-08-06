# r-cascader 级联选择

r-cascader 级联选择框，用于多层级数据的选择，典型场景为省市区选择。

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="级联选择"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基础使用</r-divider>
      <r-cell-group>
        <r-cell
          title="地区"
          :value="data.value1.text"
          @click="
            open({
              field: 'value1',
              options: [
                {
                  text: '浙江省',
                  value: '330000',
                  children: [{ text: '杭州市', value: '330100' }],
                },
                {
                  text: '江苏省',
                  value: '320000',
                  children: [{ text: '南京市', value: '320100' }],
                },
              ],
              fieldNames: {
                text: 'text',
                value: 'value',
                children: 'children',
              },
              activeColor: '#1989fa',
            })
          "
          is-link
        />
      </r-cell-group>

      <r-divider content-position="left">省市区数据</r-divider>
      <r-cell-group>
        <r-cell
          title="地区"
          :value="data.value2?.text"
          @click="
            open({
              field: 'value2',
              options: region,
              fieldNames: {
                text: 'label',
                value: 'value',
                children: 'children',
              },
              activeColor: '#1989fa',
            })
          "
          is-link
        />
      </r-cell-group>

      <r-divider content-position="left">自定义颜色</r-divider>
      <r-cell-group>
        <r-cell
          title="地区"
          :value="data.value3?.text"
          @click="
            open({
              field: 'value3',
              options: [
                {
                  text: '浙江省',
                  value: '330000',
                  children: [{ text: '杭州市', value: '330100' }],
                },
                {
                  text: '江苏省',
                  value: '320000',
                  children: [{ text: '南京市', value: '320100' }],
                },
              ],
              fieldNames: {
                text: 'text',
                value: 'value',
                children: 'children',
              },
              activeColor: '#ee0a24',
            })
          "
          is-link
        />
      </r-cell-group>

      <r-divider content-position="left">自定义选项上方内容</r-divider>

      <r-cell-group>
        <r-cell
          title="地区"
          :value="data.value4?.text"
          @click="
            open({
              field: 'value4',
              options: region,
              fieldNames: {
                text: 'label',
                value: 'value',
                children: 'children',
              },
              activeColor: '#1989fa',
            })
          "
          is-link
        />
      </r-cell-group>
    </view>

    <r-popup v-model:show="show" round position="bottom">
      <r-cascader
        :show="show"
        v-model:value="data[changeField].value"
        title="请选择所在地区"
        :options="options"
        :field-names="fieldNames"
        :active-color="activeColor"
        @close="onClose"
        @finish="onFinish"
      >
        <template #optionsTop="{ tabIndex }" v-if="changeField == 'value4'">
          <view class="current-level">当前为第 {{ tabIndex + 1 }} 级</view>
        </template>
      </r-cascader>
    </r-popup>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
import { region } from "@/uni_modules/r-region/js_sdk/region.js";
const { themeName } = useTheme();
const show = ref(false);
const options = ref([]);
const activeColor = ref("");
const changeField = ref("value1");
const fieldNames = ref({});
const data = ref({
  value1: {
    value: "",
    text: "请选择",
  },
  value2: {
    value: "",
    text: "请选择",
  },
  value3: {
    value: "",
    text: "请选择",
  },
  value4: {
    value: "",
    text: "请选择",
  },
});

const onFinish = ({ selectedOptions }) => {
  show.value = false;

  data.value[changeField.value].text = selectedOptions
    .map((option) => option[fieldNames.value.text])
    .join("/");
};

const open = (o) => {
  changeField.value = o.field;
  options.value = o.options;
  fieldNames.value = o.fieldNames;
  activeColor.value = o.activeColor;
  show.value = true;
};

const onClose = () => {
  show.value = false;
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
| show        | 是否显示（通常在[r-popup](https://ext.dcloud.net.cn/plugin?id=18734)内使用） | Boolean        | true                                                         |        |
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