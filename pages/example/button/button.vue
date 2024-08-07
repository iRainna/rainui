<template>
  <r-config-provider :themeName="themeName">
    <page-header title="按钮"></page-header>
    <view style="padding: 20rpx">
      <view style="padding: 20rpx 0">按钮类型</view>
      <r-space wrap>
        <r-button type="primary">主要按钮</r-button>
        <r-button type="success">成功按钮</r-button>
        <r-button type="default">默认按钮</r-button>
        <r-button type="danger">危险按钮</r-button>
        <r-button type="warning">警告按钮</r-button>
      </r-space>

      <view style="padding: 20rpx 0">朴素按钮</view>
      <r-space wrap>
        <r-button plain type="primary">朴素按钮</r-button>
        <r-button plain type="success">朴素按钮</r-button>
      </r-space>
      <view style="padding: 20rpx 0">禁用状态</view>
      <r-space wrap>
        <r-button disabled type="primary">禁用状态</r-button>
        <r-button disabled type="success">禁用状态</r-button>
      </r-space>

      <view style="padding: 20rpx 0">加载状态</view>
      <r-space wrap>
        <r-button loading type="primary" />
        <r-button loading type="primary" loading-type="spinner" />
        <r-button loading type="success" loading-text="加载中..." />
      </r-space>

      <view style="padding: 20rpx 0">按钮形状</view>
      <r-space wrap>
        <r-button square type="primary">方形按钮</r-button>
        <r-button round type="success">圆形按钮</r-button>
      </r-space>

      <view style="padding: 20rpx 0">图标按钮</view>

      <r-space wrap>
        <r-button icon="plus" type="primary" />
        <r-button icon="plus" type="primary">按钮</r-button>
      </r-space>

      <view style="padding: 20rpx 0">按钮尺寸</view>
      <r-button type="primary" size="large">大号按钮</r-button>
      <r-space wrap>
        <r-button type="primary" size="normal">普通按钮</r-button>
        <r-button type="primary" size="small">小型按钮</r-button>
        <r-button type="primary" size="mini">迷你按钮</r-button>
      </r-space>

      <view style="padding: 20rpx 0">块级元素</view>

      <r-button type="primary" block>块级元素</r-button>

      <view style="padding: 20rpx 0">自定义颜色</view>

      <r-space wrap>
        <r-button color="#7232dd">单色按钮</r-button>
        <r-button color="#7232dd" plain>单色按钮</r-button>
        <r-button color="linear-gradient(to right, #ff6034, #ee0a24)">
          渐变色按钮
        </r-button>
      </r-space>
    </view>
  </r-config-provider>
</template>
<script setup>
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
</script>
