<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/form-edit/form-edit'
 </script>

# r-form-edit

`r-form-edit` 配置化表单，通过配置即可自动生成表单。[全部组件](https://ext.dcloud.net.cn/plugin?id=19701) [完整文档请前往](https://irainna.github.io/rainui/form/picker.html)

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="配置项表单"></page-header>
    <r-form-edit
      v-model:form="form"
      v-model:value="value"
      :rules="rules"
      @clickButton="onClickButton"
      :btns="btns"
      @change="onChange"
      ref="formRef"
    >
    </r-form-edit>
  </r-config-provider>
</template>

<script setup>
import { ref, computed } from "vue";
import { region } from "@/uni_modules/r-region/js_sdk/region.js";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const value = ref({
  area: "河北省/唐山市/开平区",
  areaCode: "130000,130200,130205",
  date: "2024-09-20~2024-09-28",
  dateValue: "1726814066702,1727505267588",
  time: "00时/01分/01秒",
  timeValue: "0,1,1",
});

const form = ref([
  [
    {
      field: "name",
      label: "姓名",
    },
    {
      field: "age",
      label: "年龄",
      config: {
        type: "number",
        maxLength: 3,
      },
    },
  ],
  [
    {
      field: "area",
      selectField: "areaCode",
      label: "所在地区",
      type: "picker",
      config: {
        readonly: true,
        get rigthIcon() {
          return !!value.value.area ? "close" : "arrow";
        },
        onClickRightIcon: (m) => {
          value.value.area = "";
          value.value.areaCode = "";
        },
      },
      picker: {
        columns: region,
        title: "请选择地区",
        columnsFieldNames: {
          text: "label",
          value: "value",
          loading: false,
          children: "children",
        },
      },
    },
    {
      field: "detailAddress",
      label: "详细地址",
      showSearch: true,
      config: {
        rigthIcon: !!value.value.detailAddress ? "close" : "",
        onClickRightIcon: (m) => {
          value.value.detailAddress = "";
        },
      },
    },
  ],

  [
    {
      field: "code",
      label: "验证码",
      button: {
        name: "发送验证码",
        type: "primary",
        disabled: false,
      },
    },
  ],
  [
    {
      field: "date",
      selectField: "dateValue",
      label: "起止日期",
      type: "calendar",
      config: {
        readonly: true,
        get rigthIcon() {
          return !!value.value.date ? "close" : "arrow";
        },
        onClickRightIcon: (m) => {
          value.value.date = "";
          value.value.dateValue = "";
        },
      },
      calendar: {
        type: "range",
      },
    },
    {
      field: "time",
      selectField: "timeValue",
      label: "时间",
      type: "datePicker",
      config: {
        readonly: true,
        get rigthIcon() {
          return !!value.value.date ? "close" : "arrow";
        },
        onClickRightIcon: (m) => {
          value.value.time = "";
          value.value.timeValue = "";
        },
      },
      datePicker: {
        title: "请选择时间",
        loading: false,
        columnsType: "second",
        hideFields: ["year", "month", "day"],
        formatter: [
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
        ],
      },
    },
  ],
  [
    {
      field: "rate",
      label: "评分",
      type: "rate",
      rate: {},
    },
    {
      field: "checkbox",
      label: "多选框",
      type: "checkbox",
      checkbox: {
        list: [
          {
            label: "苹果",
            value: "apple",
          },
          {
            label: "梨子",
            value: "pear",
          },
          {
            label: "橘子",
            value: "orange",
          },
        ],
      },
    },
    {
      field: "radio",
      label: "单选框",
      type: "radio",
      radio: {
        list: [
          {
            label: "苹果",
            value: "apple",
          },
          {
            label: "梨子",
            value: "pear",
          },
          {
            label: "橘子",
            value: "orange",
          },
        ],
      },
    },
    {
      field: "switch",
      label: "开关",
      type: "switch",
    },
  ],
]);

const rules = ref({
  name: [
    {
      required: true,
      message: "请输入用户名",
    },
    {
      min: 2,
      max: 10,
      message: "长度在 2 到 10 个字符",
    },
  ],
  age: [
    {
      required: true,
      message: "请输入年龄",
    },
  ],
});

const formRef = ref(null);

const btns = ref([
  {
    text: "提交",
    type: "primary",
    round: true,
    block: true,
    onClick: async (m) => {
      console.log("v", value.value);
      formRef.value
        .validate()
        .then((req) => {
          console.log("req", req);
        })
        .catch((e) => {
          console.log("e", e);
        });
    },
  },
  {
    text: "清空",
    round: true,
    block: true,
    onClick: (m) => {
      console.log("m", m);
      formRef.value.clearValidate();
    },
  },
]);

const onClickButton = (e) => {
  let num = 10;
  const timer = setInterval(() => {
    num -= 1;
    if (num) {
      form.value[2][0].button.name = `${num}s后重新获取`;
      form.value[2][0].button.disabled = true;
    } else {
      form.value[2][0].button.name = `重新获取`;
      form.value[2][0].button.disabled = false;
      clearInterval(timer);
    }
  }, 1000);
  console.log("e", e);
};

const onChange = (data) => {
  const { value, item } = data;
  if (item.showSearch) {
    if (item.field == "detailAddress" && value) {
      form.value[1][1].cell = {
        list: [
          {
            title: "成都动物园",

            label: "四川省成都市成华区昭觉寺南路234号",
            icon: "location-o",
            iconPrefix: "van-icon",
          },
          {
            title: "成都IFS国际金融中心",

            label: "四川省成都市锦江区红星路三段1号",
            icon: "location-o",
            iconPrefix: "van-icon",
          },
          {
            title: "成都大熊猫繁育基地",

            label: "四川省成都市成华区熊猫大道1375号",
            icon: "location-o",
            iconPrefix: "van-icon",
          },
        ],
      };
    } else {
      form.value[1][1].cell = {
        list: [],
      };
    }
  }
};
</script>

<style></style>
```

## API

### Props

| 名称      | 说明                                                     | 类型   | 默认值    | 可选值 |
| --------- | -------------------------------------------------------- | ------ | --------- | ------ |
| form      | 表单显示对象(一维数组显示一个卡片，二位数组显示多个卡片) | Array  | []        |        |
| rules     | 表单校验对象                                             | Object | {}        |        |
| value     | 表单的数据                                               | Object | {}        |        |
| gap       | 当 form 属性为二维数组时，卡片                           | String | `24rpx`   |        |
| btns      | 底部按钮数组                                             | Array  | []        |        |
| themeName | 主题样式                                                 | String | `default` |        |

### Props.form

> [!CAUTION]
>
> form 对象的数据结构，一维数组时为[{}]，二位数组时为[[{}],[{}]]，下表为对象具体的属性

| 名称                    | 说明                                                                                                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field                   | 在表单右侧显示的数据的存放字段                                                                                                                                          |
| label                   | 表单标题                                                                                                                                                                |
| placeholder             | 输入框占位提示文字                                                                                                                                                      |
| type                    | 类型（支持 日历-`calendar` 选择器-`picker` 时间选择器-`datePicker` 评分-`rate` 多选-`checkbox` 单选-`radio` 开关-`switch` 自定义插槽-`slot`）【默认不传为输入框】       |
| config                  | 输入框的配置字段->包含 [r-field](https://ext.dcloud.net.cn/plugin?id=19086)组件的配置字段（`maxlength`,`type`,`isLink`,`readonly`,`clearable`,`leftIcon`,`rigthIcon`）  |
| config.onClickRightIcon | 点击右侧图标时候的回调函数，通常为点击清除按钮时候触发                                                                                                                  |
| button                  | 右侧按钮的配置字段-> 包含[r-button](https://ext.dcloud.net.cn/plugin?id=18821)组件的配置字段（`size`,`disabled`,`type`）                                                |
| button.name             | 右侧按钮的名称【有这个字段右侧会显示这个按钮】                                                                                                                          |
| showSearch              | 是否支持搜索功能                                                                                                                                                        |
| cell.list               | 展示搜索结果的数组                                                                                                                                                      |
| picker                  | 选择器的配置字段->包含[r-picker](https://ext.dcloud.net.cn/plugin?id=18989)组件的配置字段（`title` `columns` `loading` `columnsFieldNames`）                            |
| datePicker              | 时间选择器的配置字段->包含[r-date-picker](https://ext.dcloud.net.cn/plugin?id=19040)组件的配置字段（`title` `loading` `formatter` `columnsType` `filter` `hideFields`） |
| rate                    | 评分器的配置字段->包含[r-rate](https://ext.dcloud.net.cn/plugin?id=18688)的全部配置 props 属性                                                                          |
| checkbox                | 多选框的配置字段->包含[r-checkbox](https://ext.dcloud.net.cn/plugin?id=18854)组件的 CheckboxGroup 全部-props 属性                                                       |
| checkbox.list           | 多选框的列表 以 label、value 俩个字段存放                                                                                                                               |
| radio                   | 单选框的配置字段->包含[r-radio](https://ext.dcloud.net.cn/plugin?id=18851)组件的 RadioGroup 全部-props 属性                                                             |
| radio.list              | 单选框的列表 以 label、value 俩个字段存放                                                                                                                               |
| switch                  | 开关的配置字段->包含[r-switch](https://ext.dcloud.net.cn/plugin?id=18847)的全部 props 属性                                                                              |

### Events

| 名称         | 说明                                              | 参数                                                   |
| ------------ | ------------------------------------------------- | ------------------------------------------------------ |
| clickButton  | 点击右侧按钮的事件（当上表 button.name 不为空时） | item 这一行的相关数据信息                              |
| change       | 输入框数据改变的事件                              | {value,item} //value 为改变值，item 为这一行的数据信息 |
| update:value | 表单数据改变时触发                                | value                                                  |
| focus        | 聚焦事件                                          | item //这一行的相关数据信息                            |
| blur         | 失焦事件                                          | item //这一行的相关数据信息                            |

### Slots

| 名称    | 说明                           | 参数                                                       |
| ------- | ------------------------------ | ---------------------------------------------------------- |
| default | 当 type==slot 时，可以使用插槽 | {value,item} //value 为数据值，item 为这一行的数据配置信息 |

### Methods

| 名称               | 说明                                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| validate           | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise |
| validateField      | 对部分表单字段进行校验的方法                                                                                                                                         |
| clearValidate      | 移除表单项的校验结果。                                                                                                                                               |
| clearValidateField | 移除指定表单项的校验结果。                                                                                                                                           |
| resetFields        | 对表单特定字段进行重置，重置为初始值并移除校验结果                                                                                                                   |
| resetForm          | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           |
