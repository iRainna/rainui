<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/button/button'
 </script>

# r-button

`r-button`按钮组件，按钮用于触发一个操作，如提交表单。

## 示例

```vue
<template>
  <r-config-provider>
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
```

## API

### Props

| 名称         | 说明                                                                                                | 类型    | 默认值      | 可选值                                    |
| ------------ | --------------------------------------------------------------------------------------------------- | ------- | ----------- | ----------------------------------------- |
| type         | 类型                                                                                                | String  | `default`   | `primary` ` success` `warning` ` danger`  |
| size         | 尺寸                                                                                                | String  | `normal`    | `large` ` small` ` mini`                  |
| text         | 按钮文字                                                                                            | String  | -           | -                                         |
| color        | 按钮颜色，支持传入 `linear-gradient` 渐变色                                                         | String  | -           | -                                         |
| icon         | 左侧图标名称或图片链接，等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 name 属性 | String  | -           | -                                         |
| iconPrefix   | 图标类名前缀，等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 prefix 属性         | String  | -           | -                                         |
| iconPosition | 图标展示位置                                                                                        | String  | `top-right` | `top-left` ` bottom-left` ` bottom-right` |
| block        | 是否为块级元素                                                                                      | Boolean | false       | true                                      |
| plain        | 是否为朴素按钮                                                                                      | Boolean | false       | true                                      |
| square       | 是否为方形按钮                                                                                      | Boolean | false       | true                                      |
| round        | 是否为圆形按钮                                                                                      | Boolean | false       | true                                      |
| disabled     | 是否禁用按钮                                                                                        | Boolean | false       | true                                      |
| loading      | 是否显示为加载状态                                                                                  | Boolean | false       | true                                      |
| loadingText  | 加载状态提示文字                                                                                    | String  | -           |                                           |
| loadingSize  | 加载图标大小，默认单位为 rpx                                                                        | String  | 40rpx       |                                           |
| themeName    | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)的主题名称                                      | String  | default     |                                           |
| 其他         | 支持`uniapp`的[button](https://uniapp.dcloud.net.cn/component/button.html)的属性                    |         |             |                                           |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮内容       |
| icon    | 自定义图标     |
| loading | 自定义加载图标 |

### Events

| 名称  | 说明                                                                             | 回调参数 |
| ----- | -------------------------------------------------------------------------------- | -------- |
| click | 点击按钮，且按钮状态不为加载或禁用时触发                                         | e        |
| 其他  | 支持`uniapp`的[button](https://uniapp.dcloud.net.cn/component/button.html)的事件 |          |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
