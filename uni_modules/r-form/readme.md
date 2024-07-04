# r-form

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

          <r-field name="level" :value="form2.level" label="等级">
            <template #input>
              <r-rate
                v-model:value="form2.level"
                @change="(e) => validateField2('level')"
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
  level: [
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
};
const form = ref({
  username: null,
  password: null,
});
const form2 = ref({
  username: null,
  password: null,
  level: null,
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
