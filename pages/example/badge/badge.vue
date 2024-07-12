<template>
  <r-config-provider>
    <view style="padding: 20px">
      <r-divider content-position="left">基础用法 </r-divider>
      <r-space size="32rpx">
        <r-badge :content="5">
          <div class="child" />
        </r-badge>

        <r-badge :content="10" :offset="['10rpx', '10rpx']">
          <div class="child" />
        </r-badge>

        <r-badge content="Hot">
          <div class="child" />
        </r-badge>

        <r-badge dot>
          <div class="child" />
        </r-badge>
      </r-space>
      <r-divider content-position="left">最大值 </r-divider>
      <r-space size="32rpx">
        <r-badge :content="20" max="9">
          <div class="child" />
        </r-badge>

        <r-badge :content="50" max="20">
          <div class="child" />
        </r-badge>

        <r-badge :content="200" max="99">
          <div class="child" />
        </r-badge>
      </r-space>
      <r-divider content-position="left">自定义颜色 </r-divider>
      <r-space size="32rpx">
        <r-badge :content="5" color="#1989fa">
          <div class="child" />
        </r-badge>

        <r-badge :content="10" color="#1989fa">
          <div class="child" />
        </r-badge>

        <r-badge dot color="#1989fa">
          <div class="child" />
        </r-badge>
      </r-space>
      <!--  -->
      <r-divider content-position="left">自定义徽标内容 </r-divider>
      <r-space size="32rpx">
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
      </r-space>
      <!--  -->
      <r-divider content-position="left">自定义徽标位置 </r-divider>
      <r-space size="32rpx">
        <r-badge :content="10" position="top-left">
          <div class="child" />
        </r-badge>

        <r-badge :content="10" position="bottom-left">
          <div class="child" />
        </r-badge>

        <r-badge :content="10" position="bottom-right">
          <div class="child" />
        </r-badge>
      </r-space>
      <!--  -->

      <r-divider content-position="left">独立展示 </r-divider>
      <r-space size="32rpx">
        <r-badge :content="20" />

        <r-badge :content="200" max="99" />
      </r-space>
    </view>
  </r-config-provider>
</template>
<style scoped>
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}
</style>
