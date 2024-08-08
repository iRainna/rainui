<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/loading/loading'
 </script>

# r-loading

`r-loading` 是一个加载图标，用于表示加载中的过渡状态。

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="加载"></page-header>
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
<script setup>
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
</script>
```

## API

### Props

| 参数      | 说明                       | 类型    | 默认值   | 可选值  |
| --------- | -------------------------- | ------- | -------- | ------- |
| color     | 颜色                       | String  | \#c9c9c9 |         |
| type      | 类型                       | String  | circular | spinner |
| size      | 图标大小                   | String  | 60rpx    |         |
| textSize  | 文字大小                   | String  | 28rpx    | -       |
| textColor | 文字颜色                   | String  | \#c9c9c9 | -       |
| vertical  | 是否垂直排列图标和文字内容 | Boolean | false    | true    |
| themeName | r-theme 的主题名称         | String  | default  |         |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 加载文案       |
| icon    | 自定义加载图标 |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
