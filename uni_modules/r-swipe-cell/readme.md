# r-swipe-cell

`r-swipe-cell` 滑动单元格，可以左右滑动来展示操作按钮的单元格组件。

## 示例

```vue
<template>
  <view class="content" style="padding: 0; background-color: transparent">
    <r-config-provider>
      <view style="padding: 5px 0"></view>
      <r-divider content-position="left">基本使用</r-divider>
      <r-swipe-cell>
        <template #left>
          <r-button type="primary">选择</r-button>
        </template>
        <template #right>
          <r-button type="danger">删除</r-button>
        </template>

        <r-cell is-link title="基本使用" />
      </r-swipe-cell>

      <r-divider content-position="left">禁用</r-divider>
      <r-swipe-cell disabled>
        <template #left>
          <r-button type="primary">选择</r-button>
        </template>
        <template #right>
          <r-button type="danger">删除</r-button>
        </template>

        <r-cell is-link title="基本使用" />
      </r-swipe-cell>

      <r-divider content-position="left">点击后手动关闭</r-divider>
      <r-swipe-cell :autoClosed="false" ref="swipeCellRef" @click="onClick">
        <template #left>
          <r-button type="primary">选择</r-button>
        </template>
        <template #right>
          <r-button type="danger">删除</r-button>
        </template>

        <r-cell is-link title="基本使用" />
      </r-swipe-cell>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const swipeCellRef = ref(null);
const onClick = (position) => {
  console.log("position", position);
  if (["left", "right"].includes(position)) swipeCellRef.value.close();
};
</script>
```

## API

### Props

| 名称       | 说明                                                         | 类型             | 默认值 | 可选值 |
| ---------- | ------------------------------------------------------------ | ---------------- | ------ | ------ |
| name       | 标识符，通常为一个唯一的字符串或数字，可以在事件参数中获取到 | Number \| String | -      | -      |
| disabled   | 是否禁用滑动                                                 | Boolean          | false  | true   |
| autoClosed | 点击后是否自动关闭                                           | Boolean          | true   | false  |

### Events

| 名称  | 说明       | 回调参数        |
| ----- | ---------- | --------------- |
| click | 点击时触发 | position        |
| open  | 打开时触发 | {name,position} |
| close | 关闭时触发 | {name,position} |

### Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 默认显示的内容     |
| left    | 左侧滑动区域的内容 |
| right   | 右侧滑动区域的内容 |

### Methods

| 方法名 | 说明             | 参数                          | 返回值 |
| ------ | ---------------- | ----------------------------- | ------ |
| open   | 打开单元格侧边栏 | position // (`left`, `right`) | -      |
| close  | 收起单元格侧边栏 | -                             | -      |
