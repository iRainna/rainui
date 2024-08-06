# r-stepper

`r-stepper` 是`uniapp vue3`的步进器，由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

## 示例

 

```vue
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础使用</view>

      <r-stepper rv-model:value="value" />

      <view style="padding: 20px">步长设置</view>
      <r-stepper rv-model:value="value" step="2" />

      <view style="padding: 20px">限制输入范围</view>
      <r-stepper rv-model:value="value" min="5" max="8" />

      <view style="padding: 20px">限制输入整数</view>
      <r-stepper rv-model:value="value" integer />

      <view style="padding: 20px">禁用状态</view>
      <r-stepper rv-model:value="value" disabled />

      <view style="padding: 20px">禁用输入框</view>
      <r-stepper rv-model:value="value" disableInput />

      <view style="padding: 20px">固定小数位数</view>
      <r-stepper rv-model:value="value" step="0.2" :decimal-length="1" />
      <view style="padding: 20px">自定义大小</view>
      <r-stepper rv-model:value="value" input-width="40px" button-size="32px" />
      <view style="padding: 20px">异步变更</view>
      <r-stepper rv-model:value="value" :before-change="beforeChange" />

      <view style="padding: 20px">圆角风格</view>
      <r-stepper
        rv-model:value="value"
        theme="round"
        button-size="22"
        disable-input
      />
      <view style="padding: 20px"></view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const value = ref(1);

const beforeChange = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 在 resolve 函数中返回 true 或 false
      resolve(true);
    }, 500);
  });
};
</script>

```



## API

### Props

| 参数          | 说明                                                         | 类型             | 默认值  | 可选值 |
| ------------- | ------------------------------------------------------------ | ---------------- | ------- | ------ |
| value         | 当前输入的值                                                 | Number\|String   |         |        |
| min           | 最小值                                                       | Number           | 1       |        |
| max           | 最大值                                                       | Number           | 999     |        |
| autoFixed     | 是否自动校正超出限制范围的数值，设置为 false 后输入超过限制范围的数值将不会自动校正 | Boolean          | true    | false  |
| defaultValue  | 初始值                                                       | Number \| String | 1       |        |
| step          | 步长，每次点击时改变的值                                     | Number \| String | 1       |        |
| name          | 标识符，通常为一个唯一的字符串或数字，可以在 change 事件回调参数中获取 | String \| Number |         |        |
| inputWidth    | 输入框宽度                                                   | String           | 64rpx   |        |
| buttonSize    | 按钮大小以及输入框高度                                       | String           | 56rpx   |        |
| decimalLength | 固定显示的小数位数                                           | Number           |         |        |
| theme         | 样式风格                                                     | String           |         | round  |
| placeholder   | 输入框占位提示文字                                           | String           |         |        |
| integer       | 是否只允许输入整数                                           | Boolean          | true    | false  |
| disabled      | 是否禁用步进器                                               | Boolean          | false   | true   |
| disablePlus   | 是否禁用增加按钮                                             | Boolean          | false   | true   |
| disableMinus  | 是否禁用减少按钮                                             | Boolean          | false   | true   |
| disableInput  | 是否禁用输入框                                               | Boolean          | true    | true   |
| beforeChange  | 输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise | Function         |         |        |
| showPlus      | 是否显示增加按钮                                             | Boolean          | true    | false  |
| showMinus     | 是否显示减少按钮                                             | Boolean          | true    | false  |
| showInput     | 是否显示输入框                                               | Boolean          | true    | false  |
| longPress     | 是否开启长按手势，开启后可以长按增加和减少按钮               | Boolean          | true    | false  |
| allowEmpty    | 是否允许输入的值为空，设置为 true 后允许传入空字符串         | Boolean          | false   | true   |
| themeName     | r-theme的主题名称                                            | String           | default |        |

### Events

| 名称         | 说明                   | 参数  |
| ------------ | ---------------------- | ----- |
| update:value | value值改变的回调      | value |
| change       | value值改变的回调      | value |
| plus         | 点击增加按钮时触发     | -     |
| minus        | 点击减少按钮时触发     | -     |
| overlimit    | 点击不可用的按钮时触发 | -     |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)