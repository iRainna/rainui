# r-layout

`Layout` 提供了 [r-row](https://ext.dcloud.net.cn/plugin?id=18722) 和 [r-col](https://ext.dcloud.net.cn/plugin?id=18723) 两个组件来进行行列布局。

## 示例

​    

```vue
<template>
  <r-config-provider>
    <view style="padding: 20rpx 0">
      <r-divider content-position="left">基本使用--示例1</r-divider>
      <r-row>
        <r-col style="background-color: #39a9ed; text-align: center" span="8">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 8
          </view>
        </r-col>
        <r-col style="background-color: #66c6f2; text-align: center" span="8">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 8
          </view>
        </r-col>
        <r-col style="background-color: #39a9ed; text-align: center" span="8">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 8
          </view>
        </r-col>
      </r-row>
      <r-divider content-position="left">基本使用--示例2</r-divider>
      <r-row>
        <r-col span="4">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 4
          </view>
        </r-col>
        <r-col span="10" offset="4">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            offset: 4, span: 10
          </view>
        </r-col>
      </r-row>
      <r-divider content-position="left">基本使用--示例3</r-divider>
      <r-row>
        <r-col offset="12" span="12">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            offset: 12, span: 12
          </view>
        </r-col>
      </r-row>

      <r-divider content-position="left">设置列元素间距</r-divider>

      <r-row gutter="10">
        <r-col span="8">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 8
          </view>
        </r-col>
        <r-col span="8">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 8
          </view>
        </r-col>
        <r-col span="8">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 8
          </view>
        </r-col>
      </r-row>

      <r-divider content-position="left">垂直间距 </r-divider>

      <r-row :gutter="[20, 20]">
        <r-col span="12">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 12
          </view>
        </r-col>
        <r-col span="12">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 12
          </view>
        </r-col>
        <r-col span="12">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 12
          </view>
        </r-col>
        <r-col span="12">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 12
          </view>
        </r-col>
      </r-row>

      <r-divider content-position="left">对齐方式--居中</r-divider>
      <r-row justify="center">
        <r-col span="6">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
        <r-col span="6">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
        <r-col span="6">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
      </r-row>

      <r-divider content-position="left">对齐方式--右对齐</r-divider>

      <r-row justify="end">
        <r-col span="6">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
        <r-col span="6">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
        <r-col span="6">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
      </r-row>

      <r-divider content-position="left">对齐方式--两端对齐</r-divider>
      <r-row justify="space-between">
        <r-col span="6">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
        <r-col span="6">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
        <r-col span="6">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
      </r-row>

      <r-divider content-position="left"
        >对齐方式--每个元素的两侧间隔相等</r-divider
      >

      <r-row justify="space-around">
        <r-col span="6">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
        <r-col span="6">
          <view
            style="
              background-color: #66c6f2;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
        <r-col span="6">
          <view
            style="
              background-color: #39a9ed;
              text-align: center;
              padding: 20rpx 0;
            "
          >
            span: 6
          </view>
        </r-col>
      </r-row>
    </view>
  </r-config-provider>
</template>
```



## API

### Row Props

| 参数    | 说明                          | 类型                       | 默认值  | 可选值                                                |
| ------- | ----------------------------- | -------------------------- | ------- | ----------------------------------------------------- |
| gutter  | 列元素之间的间距（单位为 px） | String \| Number \| Array+ | `0`     |                                                       |
| justify | 主轴对齐方式                  | String                     | `start` | `start` `end` `center` `space-around` `space-between` |
| align   | 交叉轴对齐方式                | String                     | `top`   | `center` `bottom`                                     |
| wrap    | 是否自动换行                  | boolean                    | true    | false                                                 |

### Col Props

| 参数   | 说明           | 类型   | 默认值 | 可选值 |
| ------ | -------------- | ------ | ------ | ------ |
| span   | 列元素宽度     | Number | -      | 1-24   |
| offset | 列元素偏移距离 | Number | -      | 1-24   |

### Row Events

| 名称  | 说明       | 参数 |
| ----- | ---------- | ---- |
| click | 点击时触发 | e    |

### Col Events

| 名称  | 说明       | 参数 |
| ----- | ---------- | ---- |
| click | 点击时触发 | e    |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)