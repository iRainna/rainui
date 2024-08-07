# r-space

`r-space` 间距，设置元素之间的间距。

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-space>
        <r-button type="primary">按钮</r-button>
        <r-button type="primary">按钮</r-button>
        <r-button type="primary">按钮</r-button>
        <r-button type="primary">按钮</r-button>
      </r-space>

      <r-divider content-position="left">垂直排列</r-divider>
      <r-space direction="vertical" fill>
        <r-button type="primary" style="width: 100%" block>按钮</r-button>
        <r-button type="primary" style="width: 100%" block>按钮</r-button>
        <r-button type="primary" style="width: 100%" block>按钮</r-button>
      </r-space>

      <r-divider content-position="left">自定义间距</r-divider>
      <r-space size="20px">
        <r-button type="primary">按钮</r-button>
        <r-button type="primary">按钮</r-button>
        <r-button type="primary">按钮</r-button>
      </r-space>

      <r-divider content-position="left">对齐方式</r-divider>

      <r-radio-group
        v-model:value="align"
        direction="horizontal"
        style="margin-bottom: 16px"
      >
        <r-radio name="start">start</r-radio>
        <r-radio name="center">center</r-radio>
        <r-radio name="end">end</r-radio>
        <r-radio name="baseline">baseline</r-radio>
      </r-radio-group>

      <r-space :align="align" style="padding: 16px; background: #f3f2f5">
        <r-button type="primary">{{ align }}</r-button>
        <div style="padding: 40px 20px; background: #fff">Block</div>
      </r-space>

      <r-divider content-position="left">自动换行</r-divider>

      <r-space wrap>
        <r-button type="primary" block>按钮</r-button>
        <r-button type="primary" block>按钮</r-button>
        <r-button type="primary" block>按钮</r-button>
        <r-button type="primary" block>按钮</r-button>
        <r-button type="primary" block>按钮</r-button>
        <r-button type="primary" block>按钮</r-button>
        <r-button type="primary" block>按钮</r-button>
        <r-button type="primary" block>按钮</r-button>
      </r-space>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const align = ref("center");
</script>
```

## API

### Props

| 名称      | 说明                                          | 类型    | 默认值       | 可选值                             |
| --------- | --------------------------------------------- | ------- | ------------ | ---------------------------------- |
| direction | 间距方向                                      | String  | `horizontal` | `horizontal` `vertical `           |
| size      | 间距大小                                      | String  | 16rpx        |                                    |
| align     | 设置子元素的对齐方式                          | String  | `start`      | `start` `end ` `center` `baseline` |
| wrap      | 是否自动换行                                  | Boolean | false        | true                               |
| fill      | 是否让 Space 变为一个块级元素，填充整个父元素 | Boolean | false        | true                               |

### Slots

| 名称    | 说明         | 参数 |
| ------- | ------------ | ---- |
| default | 间距组件内容 | -    |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)