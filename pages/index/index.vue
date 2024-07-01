<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础用法</view>
      <r-cell-group>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
      <view style="padding: 20px">卡片风格</view>
      <r-cell-group inset>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
      <view style="padding: 20px">单元格大小</view>
      <r-cell title="单元格" value="内容" size="large" />
      <r-cell title="单元格" value="内容" size="large" label="描述信息" />

      <view style="padding: 20px">展示图标</view>
      <r-cell title="单元格" icon="location-o" />

      <view style="padding: 20px">展示箭头</view>
      <r-cell title="单元格" is-link />
      <r-cell title="单元格" is-link value="内容" />
      <r-cell title="单元格" is-link arrow-direction="down" value="内容" />

      <view style="padding: 20px">分组标题</view>
      <r-cell-group title="分组1">
        <r-cell title="单元格" value="内容" />
      </r-cell-group>
      <r-cell-group title="分组2">
        <r-cell title="单元格" value="内容" />
      </r-cell-group>
      <!--  -->
      <view style="padding: 20px">使用插槽</view>
      <r-cell value="内容" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">单元格</span>
          <r-tag type="primary">标签</r-tag>
        </template>
      </r-cell>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
import { _, dayjs, Schema } from "@/uni_modules/r-utils/js_sdk/index.js";
// import {} from '@/uni_modules/r-async-validator/js_sdk/index.js'
console.log("Schema", Schema);
const currentDate = ref([]);
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
<!-- <script>
import { addTheme } from "@/uni_modules/r-theme/js_sdk/index.js";

export default {
  data() {
    return {
      cShow: false,
      cascaderValue: "",
      options: [
        {
          text: "浙江省",
          value: "330000",
          children: [
            {
              text: "杭州市",
              value: "330100",
              children: [
                {
                  text: "经开区",
                  value: "331110",
                },
              ],
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
              children: [
                {
                  text: "经开区",
                  value: "320110",
                },
              ],
            },
          ],
        },
      ],
      tabActive: "tab1",
      title: "Hello",
      activeNames: [],
      rateValue: 1.8,
      stepperValue: 1,
      radioData: "",
      flag: true,
      checked: false,
      checkList: [],
      fieldValue: "",
      theme: "dark",
    };
  },
  mounted() {
    addTheme("dark", {
      "r-background": "var(--r-red)",
      "r-background-2": "var(--r-green)",
      "r-badge-color": "black",
    });
  },
  onLoad() {},
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.cShow = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
    },
    changeSwitch(e) {
      console.log("e", e);
    },
  },
};
</script> -->

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

<style>
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}

.r-badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}

.list {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  grid-gap: 60rpx;
  padding: 60rpx;
}
</style>
