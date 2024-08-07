<template>
  <r-config-provider :themeName="themeName">
    <page-header title="选择器"></page-header>
    <view style="padding: 20rpx">使用单列</view>
    <r-picker
      title="使用单列"
      :columns="columns3"
      v-model:value="pickerValues3"
      @change="changeData"
      @confirm="confirm"
    ></r-picker>
    <view style="padding: 20rpx">加载状态</view>

    <r-picker
      title="使用单列"
      :columns="columns2"
      loading
      v-model:value="pickerValues2"
      @change="changeData"
      @confirm="confirm"
    ></r-picker>
    <view style="padding: 20rpx">使用多列</view>
    <r-picker
      title="使用多列"
      :columns="columns2"
      v-model:value="pickerValues2"
      @change="changeData"
      @confirm="confirm"
    ></r-picker>
    <view style="padding: 20rpx">使用级联</view>
    <r-picker
      title="使用级联"
      :columns="columns"
      v-model:value="pickerValues"
      :columnsFieldNames="{
        text: 'label',
        value: 'value',
        children: 'children',
      }"
      @change="changeData"
      @confirm="confirm"
    ></r-picker>

    <view style="padding: 20rpx">配合r-popup</view>
    <r-cell title="配合r-popup使用" is-link @click="show = true" />

    <r-popup v-model:show="show" position="bottom">
      <view style="width: 100%">
        <r-picker
          title="使用单列"
          :columns="columns3"
          v-model:value="pickerValues3"
          @change="changeData"
          @confirm="confirm"
          @cancel="cancel"
        ></r-picker>
      </view>
    </r-popup>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";

import { region } from "@/uni_modules/r-region/js_sdk/region.js";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
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
