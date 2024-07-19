<template>
  <r-config-provider>
    <view style="padding: 10rpx 0">
      <r-divider content-position="left">基本使用</r-divider>
      <r-tabbar
        v-model:value="active"
        safe-area-inset-bottom
        @change="onChange"
      >
        <r-tabbar-item icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item icon="search">标签</r-tabbar-item>
        <r-tabbar-item icon="friends-o">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const active = ref(0);
const onChange = (e) => {
  console.log("e", e);
};
</script>

<style></style>
