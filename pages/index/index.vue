<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>

    <r-icon name="star" prefix="van-icon" hoverClass="animate__bounce"></r-icon>

    <r-rate v-model:value="rateValue" />
    <r-rate v-model:value="rateValue" icon="like" void-icon="like-o" />
    <r-rate
      v-model:value="rateValue"
      size="50rpx"
      color="#ffd21e"
      void-icon="star"
      void-color="#eee"
    />
    <r-rate v-model:value="rateValue" allow-half />
    <r-rate v-model:value="rateValue" :count="6" />
    <r-rate v-model:value="rateValue" clearable />
    <r-rate v-model:value="rateValue" disabled />
    <r-rate v-model:value="rateValue" readonly />
    <r-rate v-model:value="rateValue" readonly allow-half />
    <r-rate v-model:value="rateValue" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      rateValue: 1.8,
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
