# r-skeleton

`r-skeleton` 骨架屏，用于在内容加载过程中展示一组占位图形。

## 示例

```vue
<template>
  <view class="content" style="padding: 20px">
    <!-- <r-config-provider> -->
    <r-divider content-position="left">基本使用</r-divider>
    <r-skeleton title :row="3" />
    <r-divider content-position="left">显示头像</r-divider>
    <r-skeleton title avatar :row="3" />
    <r-divider content-position="left">展示子组件</r-divider>
    <r-switch v-model:value="loading"></r-switch>
    <r-skeleton title avatar :row="3" :loading="loading">
      <view>实际内容</view>
    </r-skeleton>
    <r-divider content-position="left">自定义展示内容</r-divider>

    <r-skeleton>
      <template #template>
        <view :style="{ display: 'flex', width: '100%' }">
          <r-skeleton-image />
          <view
            :style="{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '20rpx',
              marginLeft: '16px',
            }"
          >
            <r-skeleton-paragraph row-width="60%" />
            <r-skeleton-paragraph />
            <r-skeleton-paragraph />
            <r-skeleton-paragraph />
          </view>
        </view>
      </template>
    </r-skeleton>
    <!-- </r-config-provider> -->
  </view>
</template>
<script setup>
import { ref } from "vue";
const loading = ref(true);

</script>


```

## API

### Skeleton Props

| 名称        | 说明                                                         | 类型                  | 默认值    | 可选值   |
| ----------- | ------------------------------------------------------------ | --------------------- | --------- | -------- |
| row         | 段落占位图行数                                               | Number \| String      | 0         | -        |
| rowWidth    | 段落占位图宽度，可传数组来设置每一行的宽度                   | Number\|String\|Array | `100%`    | -        |
| title       | 是否显示标题占位图                                           | Boolean               | false     | true     |
| avatar      | 是否显示头像占位图                                           | Boolean               | false     | true     |
| loading     | 是否显示骨架屏，传 `false` 时会展示子组件内容                | Boolean               | true      | false    |
| animate     | 是否开启动画                                                 | Boolean               | true      | false    |
| round       | 是否将标题和段落显示为圆角风格                               | Boolean               | false     | true     |
| titleWidth  | 标题占位图宽度                                               | Number \|String       | ``40%``   | -        |
| avatarSize  | 头像占位图大小                                               | Number  \|  String    | `64rpx`   | -        |
| avatarShape | 头像占位图形状                                               | String                | `round`   | `square` |
| themeName   | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称 | String                | `default` |          |

### SkeletonParagraph Props

| 名称     | 说明                     | 类型    | 默认值 | 可选值 |
| -------- | ------------------------ | ------- | ------ | ------ |
| round    | 是否将段落显示为圆角风格 | Boolean | false  | true   |
| rowWidth | 段落占位图宽度           | String  | `100%` | -      |

### SkeletonTitle Props

| 名称       | 说明                     | 类型             | 默认值 | 可选值 |
| ---------- | ------------------------ | ---------------- | ------ | ------ |
| round      | 是否将标题显示为圆角风格 | Boolean          | false  | true   |
| titleWidth | 标题占位图宽度           | String \| Number | `40%`  | -      |

### SkeletonAvatar Props

| 名称        | 说明           | 类型              | 默认值  | 可选值   |
| ----------- | -------------- | ----------------- | ------- | -------- |
| avatarSize  | 头像占位图大小 | Number  \| String | `64rpx` | -        |
| avatarShape | 头像占位图形状 | String            | `round` | `square` |

### SkeletonImage Props

| 名称       | 说明           | 类型              | 默认值  | 可选值   |
| ---------- | -------------- | ----------------- | ------- | -------- |
| imageSize  | 图片占位图大小 | Number  \| String | `64rpx` | -        |
| imageShape | 图片占位图形状 | String            | `round` | `square` |

### Skeleton Slots

| 名称     | 说明       |
| -------- | ---------- |
| default  | 骨架屏内容 |
| template | 自定义内容 |






更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)