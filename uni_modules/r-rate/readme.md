# r-rate

`r-rate` 是一个借鉴了 `van-rate` 的一个的`uniapp` `vue3`评分组件，用于对事物进行评级操作。

## 示例

```vue
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基本使用</view>
      <r-rate v-model:value="value" />

      <view style="padding: 20px">自定义图标</view>
      <r-rate v-model:value="value" icon="like" void-icon="like-o" />

      <view style="padding: 20px">自定义样式</view>
      <r-rate
        v-model:value="value"
        size="50rpx"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />

      <view style="padding: 20px">半星</view>
      <r-rate v-model:value="value2" allow-half />

      <view style="padding: 20px">自定义数量</view>
      <r-rate v-model:value="value" :count="6" />

      <view style="padding: 20px">可清空</view>
      <r-rate v-model:value="value" clearable />

      <view style="padding: 20px">禁用状态</view>
      <r-rate v-model:value="value" disabled />

      <view style="padding: 20px">只读状态</view>
      <r-rate v-model:value="value" readonly />

      <view style="padding: 20px">只读状态显示小数</view>
      <r-rate v-model:value="value2" readonly allow-half />

      <view style="padding: 20px"></view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const value = ref(1);
const value2 = ref(1.7);
</script>
```

## API

### Props

| 参数          | 说明                                                       | 类型    | 默认值   | 可选值   |
| ------------- | ---------------------------------------------------------- | ------- | -------- | -------- |
| value         | 当前分值                                                   | Number  |          |          |
| count         | 图标总数                                                   | Number  | 5        |          |
| size          | 图标大小                                                   | String  | 40rpx    |          |
| gutter        | 图标间距                                                   | String  | 8rpx     | -        |
| delay         | 延迟时间(ms)                                               | Number  | 0        | -        |
| color         | 选中时的颜色                                               | String  | \#ee0a24 |          |
| voidColor     | 未选中时的颜色                                             | String  | \#c8c9cc |          |
| disabledColor | 禁用时的颜色                                               | String  | \#c8c9cc |          |
| icon          | 选中时的图标名称或图片链接，等同于 r-icon 组件的 name 属性 | String  | star     |          |
| voidIcon      | 未选中时的图标名称或图片链接，等同于 Icon 组件的 name 属性 | String  | star-o   |          |
| iconPrefix    | 图标类名前缀，等同于 Icon 组件的 prefix 属性               | String  | van-icon | iconfont |
| allowHalf     | 是否允许半选                                               | Boolean | false    | true     |
| clearable     | 是否允许再次点击后清除                                     | Boolean | false    | true     |
| readonly      | 是否为只读状态，只读状态下无法修改评分                     | Boolean | false    | true     |
| disabled      | 是否禁用评分                                               | Boolean | false    | true     |
| themeName     | r-theme 的主题名称                                         | String  | default  |          |

### Events

| 事件名       | 说明                     | 回调参数 |
| ------------ | ------------------------ | -------- |
| change       | value 值改变后触发的回调 | value    |
| update:value | value 值改变时触发的回调 | value    |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)