# r-grid

`r-grid `宫格，宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

## 示例

```vue
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
```

## API

### Grid Props

| 名称       | 说明                           | 类型             | 默认值     | 可选值       |
| ---------- | ------------------------------ | ---------------- | ---------- | ------------ |
| column-num | 列数                           | Number           | `4`        | -            |
| icon-size  | 图标大小，默认单位为`px`       | Number \| String | `28px`     | `card`       |
| gutter     | 格子之间的间距，默认单位为`px` | Number           | 0          |              |
| border     | 是否显示边框                   | Boolean          | true       |              |
| center     | 是否将格子内容居中显示         | Boolean          | true       |              |
| square     | 是否将格子固定为正方形         | Boolean          | false      |              |
| clickable  | 是否开启格子点击反馈           | Boolean          | false      |              |
| direction  | 格子内容排列的方向             | String           | `vertical` | `horizontal` |
| reverse    | 是否调换图标和文本的位置       | Boolean          | false      |              |

### GridItem Props

| 名称        | 说明                                                                              | 类型             | 默认值      | 可选值                                              |
| ----------- | --------------------------------------------------------------------------------- | ---------------- | ----------- | --------------------------------------------------- |
| text        | 文字                                                                              | String           | -           | -                                                   |
| icon        | [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 图标名称                      | String           | -           | -                                                   |
| icon-prefix | [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 图标类名前缀                  | String           | `van-icon`  | -                                                   |
| icon-color  | [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 图标颜色                      | String           | -           | -                                                   |
| dot         | 是否显示图标右上角小红点                                                          | Boolean          | false       |                                                     |
| badge       | 图标右上角徽标的内容                                                              | Number \| String | -           | -                                                   |
| badgeColor  | 徽标背景颜色                                                                      | String           | `#ee0a24`   |                                                     |
| max         | 最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效                        | Number \| String | -           | -                                                   |
| offset      | 设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px | Array            | -           | -                                                   |
| showZero    | 当 content 为数字 0 或字符串 '0' 时，是否展示徽标                                 | Boolean          | true        |                                                     |
| position    | 徽标位置                                                                          | String           | `top-right` | `top-right` `top-left` `bottom-left` `bottom-right` |
| themeName   | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 主题名称                     | String           | `default`   |                                                     |

### GridItem Slots

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 自定义宫格的所有内容 |
| icon    | 自定义图标           |
| text    | 自定义文字           |

### GridItem Events

| 名称  | 说明           | 回调参数 |
| ----- | -------------- | -------- |
| click | 点击格子时触发 | event    |
