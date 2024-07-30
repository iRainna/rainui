<template>
  <r-config-provider :themeName="themeName">
    <page-header title="分页"></page-header>
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
</template>
<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const currentPage = ref(1);
</script>
