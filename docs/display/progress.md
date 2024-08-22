<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/progress/progress'
 </script>

# r-progress

`r-progress` 进度条，用于展示操作的当前进度。

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="进度条"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-progress :percentage="50" />

      <r-divider content-position="left">线条粗细 </r-divider>
      <r-progress :percentage="50" stroke-width="8" />

      <r-divider content-position="left">线条粗细 </r-divider>
      <r-progress :percentage="50" inactive />
      <r-divider content-position="left">样式定制1</r-divider>
      <r-progress pivot-text="橙色" color="#f2826a" :percentage="25" />
      <r-divider content-position="left">样式定制2</r-divider>
      <r-progress pivot-text="红色" color="#ee0a24" :percentage="50" />
      <r-divider content-position="left">样式定制3</r-divider>
      <r-progress
        :percentage="75"
        pivot-text="紫色"
        pivot-color="#7232dd"
        color="linear-gradient(to right, #be99ff, #7232dd)"
      />

      <r-divider content-position="left">过渡效果</r-divider>
      <r-progress :percentage="percentage" />
      <view style="height: 20px; width: 100vw"></view>
      <r-space>
        <r-button @click="onChange(10)">增加</r-button>
        <r-button @click="onChange(-10)">减少</r-button>
      </r-space>
    </view>
  </r-config-provider>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
import { ref } from "vue";
const { themeName } = useTheme();

const percentage = ref(50);

const onChange = (value) => {
  percentage.value = percentage.value + value;
};
</script>
```

## API

### Props

| 名称         | 说明                       | 类型             | 默认值       | 可选值 |
| ------------ | -------------------------- | ---------------- | ------------ | ------ |
| percentage   | 进度百分比                 | Number           | `0`          |        |
| stroke-width | 进度条粗细，默认单位为`px` | Number \| String | `4`          |        |
| color        | 进度条颜色                 | String           | `#1989fa`    |        |
| track-color  | 轨道颜色                   | String           | `#e5e5e5`    |        |
| pivot-text   | 进度文字内容               | String           | 百分比       |        |
| pivot-color  | 进度文字背景色             | String           | 同进度条颜色 |        |
| text-color   | 进度文字颜色               | String           | `#fff`       |        |
| inactive     | 是否置灰                   | Boolean          | false        |        |
| show-pivot   | 是否显示进度文字           | Boolean          | true         |        |
| theme-name   | r-theme 主题名称           | String           | `default`    |        |

###
