
<template>
  <r-config-provider>
    <view style="padding: 20rpx">
      <view style="padding: 20rpx 0">基础用法</view>
      <r-divider />

      <view style="padding: 20rpx 0">展示文本 </view>
      <r-divider>文本</r-divider>

      <view style="padding: 20rpx 0">内容位置 </view>
      <r-divider content-position="left">文本</r-divider>
      <r-divider content-position="right">文本</r-divider>

      <view style="padding: 20rpx 0">虚线 </view>
      <r-divider dashed>文本</r-divider>

      <view style="padding: 20rpx 0">自定义样式 </view>

      <r-divider
        :customStyle="{
          color: '#1989fa',
          borderColor: '#1989fa',
          padding: '0 16px',
        }"
      >
        文本
      </r-divider>

      <view style="padding: 20rpx 0">垂直 </view>

      <r-divider vertical />
      文本
      <r-divider vertical dashed />
      文本
      <r-divider vertical :hairline="false" />
      文本
      <r-divider vertical :customStyle="{ borderColor: '#1989fa' }" />
    </view>
  </r-config-provider>
</template>