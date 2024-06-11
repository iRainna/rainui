<!--
 * @Author: iRainna caihonglin@joomon.com
 * @Date: 2024-06-11 12:38:13
 * @LastEditors: iRainna caihonglin@joomon.com
 * @LastEditTime: 2024-06-11 15:18:35
 * @FilePath: \rainui\pages\index\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by iRainna, All Rights Reserved. 
-->
<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>

    <r-icon name="icon-fail" hoverClass="animate__bounce"></r-icon>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {},
};
</script>

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
