<template>
  <view class="content">
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
          v-model:value="currentDate2"
          title="使用年月"
          loading
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">使用年</view>
        <r-date-picker
          v-model:value="currentDate3"
          title="使用年"
          columnsType="year"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">使用年月</view>
        <r-date-picker
          v-model:value="currentDate4"
          title="使用年月"
          columnsType="month"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">使用时间到秒</view>
        <r-date-picker
          v-model:value="currentDate5"
          title="使用时间到秒"
          columnsType="second"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />

        <view style="padding: 20rpx 0">格式化</view>
        <r-date-picker
          v-model:value="currentDate6"
          title="格式化"
          :formatter="formatter"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">使用过滤</view>
        <r-date-picker
          v-model:value="currentDate7"
          title="使用过滤"
          :filter="filter"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
        <view style="padding: 20rpx 0">使用时分秒且格式化</view>
        <r-date-picker
          v-model:value="currentDate8"
          title="使用时分秒且格式化"
          :filter="filter"
          columnsType="second"
          :formatter="formatter"
          :hideFields="['year', 'month', 'day']"
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
          v-model:value="currentDate9"
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
import { _, dayjs } from "@/uni_modules/r-utils/js_sdk/index.js";

const currentDate = ref([]);
const currentDate2 = ref([]);
const currentDate3 = ref([]);
const currentDate4 = ref([]);
const currentDate5 = ref([]);
const currentDate6 = ref([]);
const currentDate7 = ref([]);
const currentDate8 = ref([]);
const currentDate9 = ref([]);
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
      // console.log("e", e);
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
