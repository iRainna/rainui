# r-dialog

`r-dialog` 弹出框，弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 20px 0">
      <r-divider content-position="left">基础使用</r-divider>
      <r-cell-group inset>
        <r-cell title="提示弹窗" isLink @click="open(1)"></r-cell>
        <r-cell title="提示弹窗(无标题)" isLink @click="open(2)"></r-cell>
        <r-cell title="确认弹窗" isLink @click="open(3)"></r-cell>
      </r-cell-group>

      <r-divider content-position="left">异步关闭</r-divider>
      <r-cell-group inset>
        <r-cell title="异步关闭" isLink @click="open2()"></r-cell>
      </r-cell-group>

      <r-divider content-position="left">自定义内容</r-divider>
      <r-cell-group inset>
        <r-cell title="自定义内容" isLink @click="show3 = true"></r-cell>
      </r-cell-group>
    </view>
  </r-config-provider>
  <r-dialog
    v-model:show="show"
    :title="title"
    closeOnClickOverlay
    message="message"
    :showCancelButton="showCancelButton"
  ></r-dialog>

  <r-dialog
    v-model:show="show2"
    title="title"
    message="message"
    showCancelButton
    :beforeClose="beforeClose"
  ></r-dialog>

  <r-dialog
    v-model:show="show3"
    title="title"
    message="message"
    showCancelButton
  >
    <view style="width: 100%; padding: 10px; box-sizing: border-box">
      <r-image
        width="346px"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg"
      ></r-image>
    </view>
  </r-dialog>
</template>

<script setup>
import { ref } from "vue";
const show = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const title = ref("");
const showCancelButton = ref(false);
const open = (type) => {
  title.value = "";
  showCancelButton.value = false;
  if (type == 1) {
    title.value = "提示弹窗";
  }
  if (type == 3) {
    title.value = "确认弹窗";
    showCancelButton.value = true;
  }
  show.value = true;
};
const beforeClose = (action) =>
  new Promise((resolve) => {
    setTimeout(() => {
      // action !== 'confirm'  拦截取消操作
      resolve(action === "confirm");
    }, 1000);
  });
const open2 = () => {
  show2.value = true;
};
</script>
```

## API

### Props

| 名称                  | 说明                                                         | 类型     | 默认值    | 可选值                   |
| --------------------- | ------------------------------------------------------------ | -------- | --------- | ------------------------ |
| show                  | 是否显示弹窗                                                 | Boolean  | false     | true                     |
| title                 | 标题                                                         | String   | -         | -                        |
| width                 | 弹窗宽度                                                     | String   | `320px`   |                          |
| message               | 文本内容                                                     | String   | -         | -                        |
| messageAlign          | 内容水平对齐方式                                             | String   | `center`  | `left` `right` `justify` |
| showConfirmButton     | 是否展示确认按钮                                             | Boolean  | true      | false                    |
| showCancelButton      | 是否展示取消按钮                                             | Boolean  | false     | true                     |
| confirmButtonText     | 确认按钮文案                                                 | String   | `确认`    |                          |
| confirmButtonColor    | 确认按钮颜色                                                 | String   | `#1989fa` |                          |
| confirmButtonDisabled | 是否禁用确认按钮                                             | Boolean  | false     | true                     |
| cancelButtonText      | 取消按钮文案                                                 | String   | `取消`    |                          |
| cancelButtonColor     | 取消按钮颜色                                                 | String   | `black`   |                          |
| cancelButtonDisabled  | 是否禁用取消按钮                                             | Boolean  | false     | true                     |
| zIndex                | 将弹窗的 z-index 层级设置为一个固定值                        | Number   | `2000`    |                          |
| overlay               | 是否展示遮罩层                                               | Boolean  | true      | false                    |
| overlayClass          | 自定义遮罩层类名                                             | String   | -         |                          |
| overlayStyle          | 自定义遮罩层样式                                             | Object   | {}        |                          |
| closeOnClickOverlay   | 是否在点击遮罩层后关闭弹窗                                   | Boolean  | false     | true                     |
| lockScroll            | 是否锁定背景滚动                                             | Boolean  | true      | false                    |
| beforeClose           | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise  | Function | -         |                          |
| themeName             | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称 | String   | `default` |                          |

### Events

| 名称         | 说明                     | 参数 |
| ------------ | ------------------------ | ---- |
| confirm      | 点击确认按钮时触发       | -    |
| cancel       | 点击取消按钮时触发       | -    |
| open         | 打开弹窗时触发           | -    |
| close        | 关闭弹窗时触发           | -    |
| opened       | 打开弹窗且动画结束后触发 | -    |
| closed       | 关闭弹窗且动画结束后触发 | -    |
| update:value | 显示状态变化时触发       | show |

### Slots

| 名称    | 说明               | 参数 |
| ------- | ------------------ | ---- |
| default | 自定义内容         | -    |
| title   | 自定义标题         | -    |
| footer  | 自定义底部按钮区域 | -    |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
