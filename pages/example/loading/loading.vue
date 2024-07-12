<template>
  <r-config-provider>
    <view style="padding: 20px">
      <r-divider content-position="left">基础使用</r-divider>
      <r-loading type="circular"></r-loading>
      <r-loading type="spinner"></r-loading>

      <r-divider content-position="left">自定义颜色</r-divider>
      <r-loading type="circular" color="red">加载中。。。</r-loading>
      <r-divider content-position="left">垂直排列 </r-divider>
      <r-loading type="spinner" color="red" vertical>加载中。。。</r-loading>

      <r-divider content-position="left">自定义图标</r-divider>
      <r-loading type="circular">
        <template #icon>
          <r-icon
            prefix="iconfont"
            name="icon-left-circle"
            hoverClass="animate__fadeIn"
          />
        </template>
      </r-loading>
      <r-divider content-position="left">自定义大小</r-divider>
      <r-loading type="circular" size="24rpx"></r-loading>
      <r-loading type="spinner" size="24rpx"></r-loading>
    </view>
  </r-config-provider>
</template>
