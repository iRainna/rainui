<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/steps/steps'
 </script>

# r-steps

`r-steps`步骤条，用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-steps
        :active="active"
        @click-step="
          (index) => {
            active = index;
          }
        "
      >
        <r-step>买家下单</r-step>
        <r-step>商家接单</r-step>
        <r-step>买家提货</r-step>
        <r-step>交易完成</r-step>
      </r-steps>
      <r-divider content-position="left">自定义样式</r-divider>
      <r-steps
        :active="active2"
        active-icon="success"
        active-color="#07c160"
        inactive-icon="arrow"
        @click-step="
          (index) => {
            active2 = index;
          }
        "
      >
        <r-step>买家下单</r-step>
        <r-step>商家接单</r-step>
        <r-step>买家提货</r-step>
        <r-step>交易完成</r-step>
      </r-steps>

      <r-divider content-position="left">竖向步骤条 </r-divider>

      <r-steps
        direction="vertical"
        :active="active3"
        @click-step="
          (index) => {
            active3 = index;
          }
        "
      >
        <r-step>
          <view>【城市】物流状态1</view>
          <text>2016-07-12 12:40</text>
        </r-step>
        <r-step>
          <view>【城市】物流状态2</view>
          <text>2016-07-11 10:00</text>
        </r-step>
        <r-step>
          <view>快件已发货</view>
          <text>2016-07-10 09:30</text>
        </r-step>
      </r-steps>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const active = ref(1);
const active2 = ref(2);
const active3 = ref(0);
</script>
```

## API

### Steps Props

| 名称          | 说明                                              | 类型             | 默认值       | 可选值     |
| ------------- | ------------------------------------------------- | ---------------- | ------------ | ---------- |
| active        | 当前步骤对应的索引值                              | Number \| String | `0`          | -          |
| direction     | 步骤条方向                                        | String           | `horizontal` | `vertical` |
| activeIcon    | 当前步骤对应的底部图标                            | String           | `checked`    | -          |
| inactiveIcon  | 非当前步骤对应的底部图标                          | String           | -            | -          |
| finishIcon    | 已完成步骤对应的底部图标，优先级高于 inactiveIcon | String           | -            | -          |
| activeColor   | 当前步骤和已完成步骤的颜色                        | String           | `#1989fa`    | -          |
| inactiveColor | 未激活步骤的颜色                                  | String           | `#969799`    |            |
| iconPrefix    | 图标类名前缀                                      | String           | `van-icon`   |            |
| themeName     | r-theme 主题名称                                  | String           | `default`    |            |

### Steps Events

| 名称       | 说明                       | 参数  |
| ---------- | -------------------------- | ----- |
| click-step | 点击步骤的标题或图标时触发 | index |

### Step Slots

| 名称         | 说明                                                    |
| ------------ | ------------------------------------------------------- |
| default      | 步骤内容                                                |
| activeIcon   | 自定义激活状态图标                                      |
| inactiveIcon | 自定义未激活状态图标                                    |
| finishIcon   | 自定义已完成步骤对应的底部图标，优先级高于 inactiveIcon |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
