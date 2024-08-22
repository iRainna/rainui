<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/signature/signature'
 </script>

# r-signature

`r-signature` 签名， 用于签名场景的组件，基于 Canvas 实现。

[在线示例](https://rainui.cn/h5/index.html#/pages/example/signature/signature) [完整文档](https://rainui.cn/form/signature.html) [完整文档](https://irainna.github.io/rainui/form/signature.html)

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="签名"></page-header>
    <view class="content" style="padding: 20px 0">
      <r-image
        v-if="image"
        :src="image"
        :width="`${canvasRect.width}px`"
        :height="`${canvasRect.height}px`"
      />
      <r-divider content-position="left">基本使用</r-divider>
      <r-signature @submit="onSubmit" @clear="onClear" />

      <r-divider content-position="left">自定义颜色</r-divider>

      <r-signature pen-color="#ff0000" @submit="onSubmit" @clear="onClear" />

      <r-divider content-position="left">自定义线宽</r-divider>

      <r-signature :line-width="6" @submit="onSubmit" @clear="onClear" />

      <r-divider content-position="left">自定义背景颜色</r-divider>

      <r-signature
        background-color="#000"
        pen-color="#fff"
        @submit="onSubmit"
        @clear="onClear"
      />
    </view>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const show = ref({
  show1: true,
  show2: false,
  show3: false,
  show4: false,
});
const image = ref("");
const canvasRect = ref({});
const onSubmit = (data) => {
  console.log("data", data);
  image.value = data.image;
  canvasRect.value = data.canvas;
};

const onClear = () => {
  image.value = "";
};
</script>
```

## API

### Props

| 参数                | 说明                                                         | 类型   | 默认值    | 可选值 |
| ------------------- | ------------------------------------------------------------ | ------ | --------- | ------ |
| type                | 导出目标文件的类型，只支持 `jpg` 或 `png`                    | String | `png`     | `jpg`  |
| pen-color           | 笔触颜色，默认黑色                                           | String | `#000`    |        |
| line-width          | 线条宽度                                                     | Number | 3         |        |
| background-color    | 背景颜色                                                     | String | -         |        |
| clear-button-text   | 清除按钮文案                                                 | String | `清空`    |        |
| confirm-button-text | 确认按钮文案                                                 | String | `确认`    |        |
| theme-name          | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称 | String | `default` |        |

### Events

| 名称    | 说明               | 参数                                                              |
| ------- | ------------------ | ----------------------------------------------------------------- |
| start   | 开始签名时触发     | -                                                                 |
| end     | 结束签名时触发     | -                                                                 |
| signing | 签名过程中触发     | event                                                             |
| submit  | 点击确定按钮时触发 | {image,canvas} image 为导出的临时图片 canvas 为 canvas 的对象实例 |
| clear   | 点击取消按钮时触发 | -                                                                 |

### Methods

| 名称   | 说明                                         | 参数 |
| ------ | -------------------------------------------- | ---- |
| clear  | 可调用此方法来清除签名                       | -    |
| submit | 触发 `submit` 事件，与点击确认按钮的效果等价 | -    |
