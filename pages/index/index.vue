<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20rpx">
        <view style="padding: 20rpx 0">基础用法</view>
        <r-pagination
          v-model:value="currentPage"
          :total-items="24"
          :items-per-page="5"
        />
        <view style="padding: 20rpx 0">简单模式 </view>
        <r-pagination
          v-model:value="currentPage"
          :page-count="12"
          mode="simple"
        />
        <view style="padding: 20rpx 0">显示省略号 </view>
        <r-pagination
          v-model:value="currentPage"
          :total-items="125"
          :show-page-size="3"
          force-ellipses
        />
        <view style="padding: 20rpx 0">自定义按钮 </view>
        <r-pagination
          v-model:value="currentPage"
          :total-items="50"
          :show-page-size="5"
        >
          <template #prevText>
            <r-icon name="arrow-left" color="inherit" />
          </template>
          <template #nextText>
            <r-icon name="arrow" color="inherit" />
          </template>
          <template #page="{ item }">{{ item.text }}</template>
        </r-pagination>
      </view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";

import { region } from "@/uni_modules/r-region/js_sdk/region.js";
const currentPage = ref(1);
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
