<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20rpx">
        <view style="padding: 20rpx 0">基本使用</view>
        <r-date-picker
          v-model:value="currentDate"
          title="基本使用"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">加载中</view>
        <r-date-picker
          v-model:value="currentDate"
          title="使用年月"
          loading
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">使用年</view>
        <r-date-picker
          v-model:value="currentDate"
          title="使用年"
          columnsType="year"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">使用年月</view>
        <r-date-picker
          v-model:value="currentDate"
          title="使用年月"
          columnsType="month"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">使用时间到秒</view>
        <r-date-picker
          v-model:value="currentDate"
          title="使用时间到秒"
          columnsType="second"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">格式化</view>
        <r-date-picker
          v-model:value="currentDate"
          title="格式化"
          :formatter="formatter"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">使用过滤</view>
        <r-date-picker
          v-model:value="currentDate"
          title="使用过滤"
          :filter="filter"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">配合r-popup</view>
        <r-cell title="配合r-popup使用" is-link @click="show = true" />
      </view>
    </r-config-provider>

    <r-popup v-model:show="show" position="bottom">
      <view style="width: 100%">
        <r-date-picker
          v-model:value="currentDate"
          title="配合r-popup"
          :formatter="formatter"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
      </view>
    </r-popup>
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
