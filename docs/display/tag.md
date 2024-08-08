<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/tag/tag'
 </script>

# r-tag

`r-tag` 标签，用于标记关键词和概括主要内容。

## 示例

```vue
<r-space direction="vertical">
  <view>基础用法 </view>
  <r-space>
    <r-tag type="primary">标签</r-tag>
    <r-tag type="success">标签</r-tag>
    <r-tag type="danger">标签</r-tag>
    <r-tag type="warning">标签</r-tag>
  </r-space>
  <view>空心样式 </view>
  <r-space>
    <r-tag plain type="primary">标签</r-tag>
  </r-space>
  <view>圆角样式 </view>
  <r-space>
    <r-tag round type="primary">标签</r-tag>
  </r-space>
  <view>标记样式 </view>
  <r-space>
    <r-tag mark type="primary">标签</r-tag>
  </r-space>
  <view>可关闭标签</view>
  <r-space>
    <r-tag
      :show="show"
      closeable
      size="medium"
      type="primary"
      @close="show = false"
    >
      标签
    </r-tag>
  </r-space>
  <view>标签大小</view>
  <r-space>
    <r-tag type="primary">标签</r-tag>
    <r-tag type="primary" size="medium">标签</r-tag>
    <r-tag type="primary" size="large">标签</r-tag>
  </r-space>
  <view>自定义颜色</view>
  <r-space>
    <r-tag color="#7232dd">标签</r-tag>
    <r-tag color="#ffe1e1" text-color="#ad0000">标签</r-tag>
    <r-tag color="#7232dd" plain>标签</r-tag>
  </r-space>
</r-space>
```

## API

### Props

| 名称      | 说明                                                           | 类型    | 默认值    | 可选值                                 |
| --------- | -------------------------------------------------------------- | ------- | --------- | -------------------------------------- |
| type      | 类型                                                           | String  | `default` | `primary` `success` `danger` `warning` |
| size      | 大小                                                           | String  | -         | `large` `medium`                       |
| color     | 标签颜色                                                       | String  |           |                                        |
| show      | 是否展示标签                                                   | Boolean | true      | false                                  |
| plain     | 是否为空心样式                                                 | Boolean | false     | true                                   |
| round     | 是否为圆角样式                                                 | Boolean | false     | true                                   |
| mark      | 是否为标记样式                                                 | Boolean | false     | true                                   |
| textColor | 文本颜色                                                       | String  | white     |                                        |
| closeable | 是否为可关闭标签                                               | Boolean | false     | true                                   |
| themeName | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)的主题名称 | String  | default   |                                        |

### Slots

| 名称    | 说明         | 参数 |
| ------- | ------------ | ---- |
| default | 标签显示内容 | -    |

### Events

| 名称  | 说明           | 参数 |
| ----- | -------------- | ---- |
| click | 点击时触发     | -    |
| close | 关闭标签时触发 | -    |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
