<template>
  <r-config-provider>
    <view style="padding: 10rpx 0">
      <r-divider content-position="left">基本使用</r-divider>
      <r-notice-bar
        left-icon="volume-o"
        text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
        scrollable
      />

      <r-divider content-position="left">滚动播放</r-divider>

      <!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
      <r-notice-bar scrollable text="米袋虽空——樱花开哉！" />
      <view style="height: 4px"></view>

      <!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
      <r-notice-bar
        :scrollable="false"
        text="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。"
      />

      <r-divider content-position="left">多行展示</r-divider>

      <r-notice-bar
        wrapable
        :scrollable="false"
        text="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。"
      />

      <r-divider content-position="left">通知栏模式</r-divider>
      <!-- closeable 模式，在右侧显示关闭按钮 -->
      <r-notice-bar mode="closeable">米袋虽空——樱花开哉！</r-notice-bar>
      <view style="height: 4px"></view>
      <!-- link 模式，在右侧显示链接箭头 -->
      <r-notice-bar mode="link">米袋虽空——樱花开哉！</r-notice-bar>

      <r-divider content-position="left">自定义样式</r-divider>
      <r-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
        米袋虽空——樱花开哉！
      </r-notice-bar>
    </view>
  </r-config-provider>
</template>
