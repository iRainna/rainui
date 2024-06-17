<template>
  <view class="content">
    <r-button type="primary">主要按钮</r-button>
    <r-button type="success">成功按钮</r-button>
    <r-button type="default">默认按钮</r-button>
    <r-button type="danger">危险按钮</r-button>
    <r-button type="warning">警告按钮</r-button>

    <r-button plain type="primary">朴素按钮</r-button>
    <r-button plain type="success">朴素按钮</r-button>

    <r-button plain hairline type="primary">细边框按钮</r-button>
    <r-button plain hairline type="success">细边框按钮</r-button>

    <r-button disabled type="primary">禁用状态</r-button>
    <r-button disabled type="success">禁用状态</r-button>

    <r-button loading type="primary" />
    <r-button loading type="primary" loading-type="spinner" />
    <r-button loading type="success" loading-text="加载中..." />

    <r-button square type="primary">方形按钮</r-button>
    <r-button round type="success">圆形按钮</r-button>

    <r-button icon="plus" type="primary" />
    <r-button icon="plus" type="primary">按钮</r-button>

    <r-button type="primary" size="large">大号按钮</r-button>
    <r-button type="primary" size="normal">普通按钮</r-button>
    <r-button type="primary" size="small">小型按钮</r-button>
    <r-button type="primary" size="mini">迷你按钮</r-button>

    <r-button type="primary" block>块级元素</r-button>

    <r-button color="#7232dd">单色按钮</r-button>
    <r-button color="#7232dd" plain>单色按钮</r-button>
    <r-button color="linear-gradient(to right, #ff6034, #ee0a24)">
      渐变色按钮
    </r-button>

    <view class="list" v-if="false">
      <!-- 基础用法 -->
      <r-badge :content="5" :offset="[0, 0]">
        <div class="child" />
      </r-badge>
      <r-badge :content="10">
        <div class="child" />
      </r-badge>
      <r-badge content="Hot">
        <div class="child" />
      </r-badge>
      <r-badge dot>
        <div class="child" />
      </r-badge>
      <!-- 最大值 -->
      <r-badge :content="20" max="9">
        <div class="child" />
      </r-badge>
      <r-badge :content="50" max="20">
        <div class="child" />
      </r-badge>
      <r-badge :content="200" max="99">
        <div class="child" />
      </r-badge>
      <!-- 自定义颜色 -->
      <r-badge :content="5" color="#1989fa">
        <div class="child" />
      </r-badge>
      <r-badge :content="10" color="#1989fa">
        <div class="child" />
      </r-badge>
      <r-badge dot color="#1989fa">
        <div class="child" />
      </r-badge>
      <!-- 自定义徽标内容 -->
      <r-badge>
        <div class="child" />
        <template #content>
          <r-icon
            name="icon-success"
            color="#fff"
            prefix="iconfont"
            size="32rpx"
            class="r-badge-icon"
          />
        </template>
      </r-badge>
      <r-badge>
        <div class="child" />
        <template #content>
          <r-icon
            name="icon-fail"
            color="#fff"
            prefix="iconfont"
            size="32rpx"
            class="r-badge-icon"
          />
        </template>
      </r-badge>
      <r-badge>
        <div class="child" />
        <template #content>
          <r-icon
            name="icon-smile"
            color="#fff"
            prefix="iconfont"
            size="32rpx"
            class="r-badge-icon"
          />
        </template>
      </r-badge>

      <!-- 自定义徽标位置 -->
      <r-badge :content="10" position="top-left">
        <div class="child" />
      </r-badge>
      <r-badge :content="10" position="bottom-left">
        <div class="child" />
      </r-badge>
      <r-badge :content="10" position="bottom-right">
        <div class="child" />
      </r-badge>
      <!-- 独立展示 -->
      <r-badge :content="20" />
      <r-badge :content="200" max="99" />
    </view>
    <!-- <r-icon name="star" prefix="r-icon" hoverClass="animate__bounce"></r-icon> -->
    <!-- <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>

    <r-icon name="star" prefix="r-icon" hoverClass="animate__bounce"></r-icon>

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
