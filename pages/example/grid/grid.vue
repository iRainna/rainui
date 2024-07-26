<template>
  <r-config-provider>
    <view style="padding: 20rpx 0">
      <r-divider content-position="left">基本使用</r-divider>
      <r-grid>
        <r-grid-item icon="photo-o" text="文字" />
        <r-grid-item icon="photo-o" text="文字" />
        <r-grid-item icon="photo-o" text="文字" />
        <r-grid-item icon="photo-o" text="文字" />
      </r-grid>
      <r-divider content-position="left">自定义列数 </r-divider>
      <r-grid :column-num="3">
        <r-grid-item
          v-for="value in 6"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </r-grid>
      <r-divider content-position="left">自定义内容 </r-divider>
      <r-grid :border="false" :column-num="3">
        <r-grid-item>
          <r-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
          />
        </r-grid-item>
        <r-grid-item>
          <r-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
          />
        </r-grid-item>
        <r-grid-item>
          <r-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg"
          />
        </r-grid-item>
      </r-grid>

      <r-divider content-position="left">正方形格子 </r-divider>
      <r-grid square>
        <r-grid-item
          v-for="value in 8"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </r-grid>
      <r-divider content-position="left">格子间距 </r-divider>
      <r-grid :gutter="10">
        <r-grid-item
          v-for="value in 8"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </r-grid>
      <r-divider content-position="left">内容横排 </r-divider>
      <r-grid direction="horizontal" :column-num="3">
        <r-grid-item icon="photo-o" text="文字" />
        <r-grid-item icon="photo-o" text="文字" />
        <r-grid-item icon="photo-o" text="文字" />
      </r-grid>

      <r-divider content-position="left">徽标提示 </r-divider>

      <r-grid :column-num="2">
        <r-grid-item icon="home-o" text="文字" dot />
        <r-grid-item icon="search" text="文字" badge="99+" />
      </r-grid>
    </view>
  </r-config-provider>
</template>
