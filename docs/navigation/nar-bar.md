<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/nar-bar/nar-bar'
 </script>

# r-nav-bar

`r-nav-bar` 导航栏，为页面提供导航功能，常用于页面顶部。

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 10rpx 0">
      <r-divider content-position="left">基本使用</r-divider>
      <r-nav-bar title="标题" />

      <r-divider content-position="left">返回上级</r-divider>
      <r-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />

      <r-divider content-position="left">右侧按钮</r-divider>

      <r-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />

      <r-divider content-position="left">使用插槽</r-divider>

      <r-nav-bar title="标题" left-text="返回" left-arrow>
        <template #right>
          <r-icon
            name="search"
            size="36rpx"
            color="var(--r-nav-bar-icon-color)"
          />
        </template>
      </r-nav-bar>

      <r-divider content-position="left">禁用按钮</r-divider>
      <r-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        left-disabled
        right-disabled
      />
    </view>
  </r-config-provider>
</template>

<script setup>
const onClickLeft = () => {
  uni.navigateBack();
};

const onClickRight = () => {
  console.log("click right");
};
</script>
```

## API

### Props

| 名称                | 说明                                               | 类型             | 默认值  | 可选值 |
| ------------------- | -------------------------------------------------- | ---------------- | ------- | ------ |
| title               | 标题                                               | String           | -       |        |
| left-text           | 左侧文案                                           | String           | -       |        |
| right-text          | 右侧文案                                           | String           | -       |        |
| left-disabled       | 是否禁用左侧按钮，禁用时透明度降低，且无法点击     | Boolean          | false   |        |
| right-disabled      | 是否禁用右侧按钮，禁用时透明度降低，且无法点击     | Boolean          | false   |        |
| left-arrow          | 是否显示左侧箭头                                   | Boolean          | false   |        |
| border              | 是否显示下边框                                     | Boolean          | true    |        |
| fixed               | 是否固定在顶部                                     | Boolean          | false   |        |
| placeholder         | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | Boolean          | false   |        |
| z-index             | 导航栏 z-index                                     | String \| Number | 1       |        |
| safe-area-inset-top | 是否开启顶部安全区适配                             | Boolean          | false   |        |
| clickable           | 是否开启两侧按钮的点击反馈                         | Boolean          | true    |        |
| themeName           | 主题名称                                           | String           | default |        |

### Events

| 名称        | 说明               | 回调参数 |
| ----------- | ------------------ | -------- |
| click-left  | 点击左侧按钮时触发 | e        |
| click-right | 点击右侧按钮时触发 | e        |

### Slots

| 名称  | 说明               |
| ----- | ------------------ |
| title | 自定义标题         |
| left  | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
