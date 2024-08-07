# r-action-bar

`r-action-bar` 动作栏，用于为页面相关操作提供便捷交互。

## 示例

```vue
<template>
  <view>
    <r-config-provider>
      <r-cell-group inset>
        <r-cell title="基础用法" isLink @click="show = 1"></r-cell>
        <r-cell title="徽标提示" isLink @click="show = 2"></r-cell>
        <r-cell title="自定义图标颜色" isLink @click="show = 3"></r-cell>
        <r-cell title="自定义按钮颜色" isLink @click="show = 4"></r-cell>
      </r-cell-group>
    </r-config-provider>
    <r-action-bar v-if="show == 1">
      <r-action-bar-icon icon="chat-o" text="客服" />
      <r-action-bar-icon icon="cart-o" text="购物车" />
      <r-action-bar-icon icon="shop-o" text="店铺" />

      <r-action-bar-button
        type="warning"
        text="加入购物车"
        @click="onClickButton"
        style="width: 100%"
      />
      <r-action-bar-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
        style="width: 100%"
      />
    </r-action-bar>

    <r-action-bar v-if="show == 2">
      <r-action-bar-icon icon="chat-o" text="客服" dot />
      <r-action-bar-icon icon="cart-o" text="购物车" badge="5" />
      <r-action-bar-icon icon="shop-o" text="店铺" badge="12" />
      <r-action-bar-button
        type="warning"
        text="加入购物车"
        style="width: 100%"
      />
      <r-action-bar-button type="danger" text="立即购买" style="width: 100%" />
    </r-action-bar>

    <r-action-bar v-if="show == 3">
      <r-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
      <r-action-bar-icon icon="cart-o" text="购物车" />
      <r-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
      <r-action-bar-button
        type="warning"
        text="加入购物车"
        style="width: 100%"
      />
      <r-action-bar-button type="danger" text="立即购买" style="width: 100%" />
    </r-action-bar>

    <r-action-bar v-if="show == 4">
      <r-action-bar-icon icon="chat-o" text="客服" />
      <r-action-bar-icon icon="shop-o" text="店铺" />
      <r-action-bar-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
        style="width: 100%"
      />
      <r-action-bar-button
        color="#7232dd"
        type="danger"
        text="立即购买"
        style="width: 100%"
      />
    </r-action-bar>
  </view>
</template>

<script setup>
import { ref } from "vue";
const show = ref(1);
</script>
```

## API

### ActionBar Props

| 名称                | 说明                                 | 类型    | 默认值  | 可选值 |
| ------------------- | ------------------------------------ | ------- | ------- | ------ |
| safeAreaInsetBottom | 是否开启底部安全区适配               | Boolean | true    | false  |
| placeholder         | 是否在标签位置生成一个等高的占位元素 | Boolean | false   | true   |
| themeName           | 名称                                 | String  | default |        |

### ActionBarIcon Props

| 名称       | 说明                                                                              | 类型             | 默认值      | 可选值                                  |
| ---------- | --------------------------------------------------------------------------------- | ---------------- | ----------- | --------------------------------------- |
| text       | 按钮文字                                                                          | String           | -           |                                         |
| icon       | 图标                                                                              | String           | -           |                                         |
| color      | 图标颜色                                                                          | String           | -           |                                         |
| iconClass  | 图标额外类名                                                                      | String           | -           |                                         |
| iconPrefix | 图标类名前缀                                                                      | String           | `van-icon`  |                                         |
| dot        | 是否显示图标右上角小红点                                                          | Boolean          | false       |                                         |
| badge      | 图标右上角徽标的内容                                                              | String\|Number   | -           |                                         |
| badgeColor | 徽标背景颜色                                                                      | String           | `#ee0a24`   |                                         |
| max        | 徽标最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效                    | String \| Number | -           |                                         |
| offset     | 设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px | Array            | -           |                                         |
| showZero   | 当 徽标值为数字 0 或字符串 '0' 时，是否展示徽标                                   | Boolean          | true        |                                         |
| position   | 徽标位置                                                                          | String           | `top-right` | `top-left` `bottom-left` `bottom-right` |
| themeName  | 主题名称                                                                          | String           | default     |                                         |

### ActionBarButton Props

| 名称      | 说明                                       | 类型    | 默认      | 可选值                                           |
| --------- | ------------------------------------------ | ------- | --------- | ------------------------------------------------ |
| text      | 按钮文字                                   | String  | -         |                                                  |
| type      | 按钮类型                                   | String  | `default` | `default` `primary` `success` `warning` `danger` |
| color     | 按钮颜色,支持传入 `linear-gradient` 渐变色 | String  | -         |                                                  |
| icon      | 左侧图标名称                               | String  | -         |                                                  |
| disabled  | 是否禁用按钮                               | Boolean | false     |                                                  |
| loading   | 是否显示为加载状态                         | Boolean | false     |                                                  |
| themeName | 主题名称                                   | String  | default   |                                                  |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
