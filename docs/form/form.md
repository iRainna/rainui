# r-form

`r-form` 表单，用于数据录入、校验，支持输入框、单选框、复选框等类型，需要与[r-field](https://ext.dcloud.net.cn/plugin?id=19086) 组件搭配使用。

## 示例

```vue
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础使用</view>
      <r-form :rules="rules" :value="form" ref="formRef">
        <r-cell-group inset>
          <r-field
            v-model:value="form.username"
            name="username"
            label="用户名"
            placeholder="用户名"
            @change="validateField('username')"
          ></r-field>
          <r-field
            v-model:value="form.password"
            name="password"
            type="password"
            label="密码"
            placeholder="密码"
            @change="validateField('password')"
          ></r-field>
        </r-cell-group>
        <view
          style="
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          "
        >
          <r-button type="primary" size="large" @click="confirm">确认</r-button>
          <r-button size="large" @click="clear">清空</r-button>
        </view>
      </r-form>

      <view style="padding: 20px">搭配其他组件使用</view>
      <r-form :rules="rules2" :value="form2" ref="formRef2">
        <r-cell-group inset>
          <r-field
            v-model:value="form2.username"
            name="username"
            label="用户名"
            placeholder="用户名"
            @change="validateField2('username')"
          ></r-field>
          <r-field
            v-model:value="form2.password"
            name="password"
            type="password"
            label="密码"
            placeholder="密码"
            @change="validateField2('password')"
          ></r-field>

          <r-field name="rate" :value="form2.rate" label="评分">
            <template #input>
              <r-rate
                v-model:value="form2.rate"
                @change="(e) => validateField2('rate')"
              ></r-rate>
            </template>
          </r-field>

          <r-field name="checkbox" :value="form2.checkbox" label="复选框">
            <template #input>
              <!-- <r-checkbox
                v-model:value="form2.checkbox"
                @change="validateField2('checkbox')"
                shape="square"
              /> -->

              <r-checkbox-group
                v-model:value="form2.checkbox"
                direction="horizontal"
                @change="validateField2('checkbox')"
              >
                <r-checkbox name="1" shape="square">复选框 1</r-checkbox>
                <r-checkbox name="2" shape="square">复选框 2</r-checkbox>
              </r-checkbox-group>
            </template>
          </r-field>

          <r-field name="switch" :value="form2.switch" label="开关">
            <template #input>
              <r-switch v-model:value="form2.switch" />
            </template>
          </r-field>

          <r-field name="radio" :value="form2.radio" label="单选框">
            <template #input>
              <r-radio-group
                v-model:value="form2.radio"
                direction="horizontal"
                @change="validateField2('radio')"
              >
                <r-radio name="1">单选框 1</r-radio>
                <r-radio name="2">单选框 2</r-radio>
              </r-radio-group>
            </template>
          </r-field>
        </r-cell-group>
        <view style="padding: 20px">
          <r-button type="primary" size="large" @click="confirm2"
            >确认</r-button
          >
        </view>
      </r-form>
      <view style="padding: 20px"></view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const formRef = ref(null);
const formRef2 = ref(null);
const rules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
    },
    {
      min: 3,
      max: 5,
      message: "长度在 3 到 5 个字符",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
};
const rules2 = {
  username: [
    {
      required: true,
      message: "请输入用户名",
    },
    {
      min: 3,
      max: 5,
      message: "长度在 3 到 5 个字符",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
  rate: [
    {
      required: true,
      message: "请选择等级",
    },
  ],
  checkbox: [
    {
      required: true,
      message: "请勾选",
    },
  ],
  radio: [
    {
      required: true,
      message: "请勾选",
    },
  ],
};
const form = ref({
  username: null,
  password: null,
});
const form2 = ref({
  username: null,
  password: null,
  rate: null,
  checkbox: [],
});
const confirm = () => {
  formRef.value
    .validate()
    .then((req) => {
      console.log("req", req);
    })
    .catch((e) => {
      console.log("e", e);
    });
};
const confirm2 = () => {
  formRef2.value
    .validate()
    .then((req) => {
      console.log("req", req);
    })
    .catch((e) => {
      console.log("e", e);
    });
};
const clear = () => {
  formRef.value.resetForm();
};

const validateField = (name) => {
  console.log(form.value);
  formRef.value
    .validateField(name)
    .then((req) => {
      console.log("req", req);
    })
    .catch((e) => {
      console.log("e", e);
    });
};

const validateField2 = (name) => {
  formRef2.value
    .validateField(name)
    .then((req) => {
      console.log("req", req);
    })
    .catch((e) => {
      console.log("e", e);
    });
};
</script>
```

## API

### Props

| 名称  | 说明 | 类型   | 默认值 | 可选值 |
| ----- | ---- | ------ | ------ | ------ |
| value | 数据 | Object | {}     | -      |
| rules | 规则 | Object | {}     | -      |

### Methods

| 名称               | 说明                                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| validate           | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise |
| validateField      | 对部分表单字段进行校验的方法                                                                                                                                         |
| clearValidate      | 移除表单项的校验结果。                                                                                                                                               |
| clearValidateField | 移除指定表单项的校验结果。                                                                                                                                           |
| resetFields        | 对表单特定字段进行重置，重置为初始值并移除校验结果                                                                                                                   |
| resetForm          | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
