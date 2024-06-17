<template>
  <view class="content">
    <!-- <r-icon name="star" prefix="van-icon" hoverClass="animate__bounce"></r-icon> -->
    <!-- <image class="logo" src="/static/logo.png"></image>
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

    <r-loading type="circular" v-if="flag"></r-loading>
    <r-loading type="spinner" v-if="flag"></r-loading>
    <r-loading type="circular" v-if="flag">
      <template #icon>
        <Icon name="icon-left-circle" hoverClass="animate__fadeIn" />
      </template>
    </r-loading>
    <r-loading type="circular" v-if="flag" color="red">加载中。。。</r-loading>
    <r-loading type="spinner" v-if="flag" color="red" vertical
      >加载中。。。</r-loading
    >
    <r-loading type="circular" v-if="flag" size="24rpx"></r-loading>
    <r-loading type="spinner" v-if="flag" size="24rpx"></r-loading>
    <view style="width: 100%">
      <r-row gutter="20rpx" v-if="flag" wrap>
        <r-col span="8">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
        <r-col span="8">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
        <r-col span="8">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
      </r-row>
    </view>
    <view style="width: 100%">
      <r-row gutter="20rpx" v-if="flag" wrap>
        <r-col span="24">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
        <r-col span="24">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
        <r-col span="24">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
      </r-row>
    </view> -->
    <!-- <r-stepper v-model:value="stepperValue" ></r-stepper> -->
    <!-- <view @click="cShow = !cShow">打开</view>
    <r-popup v-model:show="cShow" round position="bottom">
      <view style="height: 100px; background-color: #fff">11111</view>
    </r-popup> -->

    <!-- <view @click="cShow = !cShow">打开</view> -->
    <!-- <r-overlay v-model:show="cShow" round position="bottom">
      <view style="height: 100px; background-color: #fff"></view>
    </r-overlay> -->
  </view>
</template>
<script setup>
import { ref } from "vue";
const cShow = ref(false);
</script>
<script>
export default {
  data() {
    return {
      title: "Hello",
      rateValue: 1.8,
      stepperValue: 1,
      flag: true,
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
