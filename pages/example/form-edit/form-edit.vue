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
import { ref, shallowRef, computed } from "vue";
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
