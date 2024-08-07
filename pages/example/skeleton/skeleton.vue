<template>
  <r-config-provider :themeName="themeName">
    <page-header title="骨架屏"></page-header>
    <view class="content" style="padding: 20px">
      <r-divider content-position="left">基本使用</r-divider>
      <r-skeleton title :row="3" />
      <r-divider content-position="left">显示头像</r-divider>
      <r-skeleton title avatar :row="3" />
      <r-divider content-position="left">展示子组件</r-divider>
      <r-switch v-model:value="loading"></r-switch>
      <r-skeleton title avatar :row="3" :loading="loading">
        <view>实际内容</view>
      </r-skeleton>
      <r-divider content-position="left">自定义展示内容</r-divider>

      <r-skeleton>
        <template #template>
          <view :style="{ display: 'flex', width: '100%' }">
            <r-skeleton-image />
            <view
              :style="{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20rpx',
                marginLeft: '16px',
              }"
            >
              <r-skeleton-paragraph row-width="60%" />
              <r-skeleton-paragraph />
              <r-skeleton-paragraph />
              <r-skeleton-paragraph />
            </view>
          </view>
        </template>
      </r-skeleton>
    </view>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const loading = ref(true);
</script>
