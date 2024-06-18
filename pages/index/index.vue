<template>
  <view class="content">
    <!-- <view style="display: flex; flex-direction: column;width: 100%;margin: 0 auto;height: 80vh;background-color: darkgray;">
      <r-cell-group>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
    </view>
		 <r-cell title="单元格" value="内容" label="描述信息" /> -->

    <r-switch v-model:value="checked" @change="changeSwitch" />
    <r-switch v-model:value="checked" disabled />
    <r-switch v-model:value="checked" loading />
    <r-switch v-model:value="checked" size="22px" />
    <r-switch
      v-model:value="checked"
      active-color="#ee0a24"
      inactive-color="#dcdee0"
    />
    <r-switch v-model:value="checked">
      <template #node>
        <!-- <view class="icon-wrapper"> -->
        <r-icon
          prefix="iconfont"
          :name="checked ? 'icon-smile' : 'icon-frown'"
        />
        <!-- </view> -->
      </template>
    </r-switch>

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
      checked: false,
    };
  },
  onLoad() {},
  methods: {
    changeSwitch(e) {
      console.log("e", e);
    },
  },
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
