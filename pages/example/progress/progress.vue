<template>
  <r-config-provider :themeName="themeName">
    <page-header title="进度条"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-progress :percentage="50" />

      <r-divider content-position="left">线条粗细 </r-divider>
      <r-progress :percentage="50" stroke-width="8" />

      <r-divider content-position="left">线条粗细 </r-divider>
      <r-progress :percentage="50" inactive />
      <r-divider content-position="left">样式定制1</r-divider>
      <r-progress pivot-text="橙色" color="#f2826a" :percentage="25" />
      <r-divider content-position="left">样式定制2</r-divider>
      <r-progress pivot-text="红色" color="#ee0a24" :percentage="50" />
      <r-divider content-position="left">样式定制3</r-divider>
      <r-progress
        :percentage="75"
        pivot-text="紫色"
        pivot-color="#7232dd"
        color="linear-gradient(to right, #be99ff, #7232dd)"
      />

      <r-divider content-position="left">过渡效果</r-divider>
      <r-progress :percentage="percentage" />
      <view style="height: 20px; width: 100vw"></view>
      <r-space>
        <r-button @click="onChange(10)">增加</r-button>
        <r-button @click="onChange(-10)">减少</r-button>
      </r-space>
    </view>
  </r-config-provider>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
import { ref } from "vue";
const { themeName } = useTheme();

const percentage = ref(50);

const onChange = (value) => {
  percentage.value = percentage.value + value;
};
</script>
