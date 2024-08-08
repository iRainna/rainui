<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/notice-bar/notice-bar'
 </script>

# r-notice-bar

`r-notice-bar` 通知栏，用于循环播放展示一组消息通知。

## 示例

```vue
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
```

## API

### Props

| 名称       | 说明                                                                                             | 类型    | 默认值     | 可选值             |
| ---------- | ------------------------------------------------------------------------------------------------ | ------- | ---------- | ------------------ |
| mode       | 通知栏模式                                                                                       | String  | -          | `closeable` `link` |
| text       | 通知文本内容                                                                                     | String  | -          | -                  |
| color      | 通知文本颜色                                                                                     | String  | `#ed6a0c`  |                    |
| left-icon  | 左侧图标名称 等同于 Icon 组件的 [name](https://ext.dcloud.net.cn/plugin?id=18668) 属性           | String  | -          | -                  |
| prefix     | 左(右)侧图标前缀类名 等同于 Icon 组件的 [prefix](https://ext.dcloud.net.cn/plugin?id=18668) 属性 | String  | `van-icon` | `iconfont`         |
| delay      | 动画延迟时间 (ms)                                                                                | Number  | 1000       | -                  |
| speed      | 滚动速率 (px/s)                                                                                  | Number  | 60         |                    |
| scrollable | 是否开启滚动播放                                                                                 | Boolean | false      | true               |
| wrapable   | 是否开启文本换行，只在禁用滚动时生效                                                             | Boolean | false      | true               |
| themeName  | 主题名称                                                                                         | String  | default    |                    |

### Events

| 名称   | 说明                         | 回调参数 |
| ------ | ---------------------------- | -------- |
| click  | 点击通知栏时触发             | e        |
| close  | 关闭通知栏时触发             | e        |
| replay | 每当滚动栏重新开始滚动时触发 | -        |

### Slots

| 名称      | 说明           |
| --------- | -------------- |
| default   | 通知文本内容   |
| leftIcon  | 自定义左侧图标 |
| rightIcon | 自定义右侧图标 |

### Methods

| 方法名 | 说明                 | 参数 | 返回值 |
| ------ | -------------------- | ---- | ------ |
| init   | 重置通知栏到初始状态 | -    | -      |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
