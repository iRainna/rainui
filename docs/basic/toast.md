<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/toast/toast'
 </script>

# r-toast

`r-toast` 轻提示，在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

## 示例

```vue
<template>
  <r-button @click="openToast(0)">打开</r-button>
  <r-button @click="openToast(1)">打开失败</r-button>
  <r-button @click="openToast(2)">打开成功</r-button>
  <r-button @click="openToast(3)">打开加载</r-button>
  <r-toast ref="toastRef"></r-toast>
</template>
<script setup>
import { ref } from "vue";
import useToast from "@/uni_modules/r-toast/components/r-toast/useToast";
const toastRef = ref(null);

const {
  showToast,
  showLoadingToast,
  showSuccessToast,
  showFailToast,
  closeToast,
} = useToast(toastRef);
const openToast = (type) => {
  if (type == 1) {
    showFailToast("失败了");
  } else if (type == 2) {
    showSuccessToast("成功了");
  } else if (type == 3) {
    showLoadingToast("加载中");
  } else {
    showToast("打开了弹窗");
  }
};
</script>
```

## API

### Props

| 名称                | 说明                                                                                        | 类型    | 默认值             | 可选值                                       |
| ------------------- | ------------------------------------------------------------------------------------------- | ------- | ------------------ | -------------------------------------------- |
| type                | 提示类型                                                                                    | String  | `text`             | `success` `fail` `loading` `text`            |
| position            | 位置                                                                                        | String  | `middle`           | `top` ` bottom` `middle`                     |
| message             | 文本内容                                                                                    | String  | -                  | -                                            |
| wordBreak           | 文本内容的换行方式                                                                          | String  | `break-all`        | `break-all ` `normal` `break-word`           |
| icon                | 自定义图标,等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 name 属性      | String  | -                  | -                                            |
| iconPrefix          | 图标类名前缀，等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 prefix 属性 | String  | `van-icon`         | `iconfont`                                   |
| duration            | 展示时长(ms)                                                                                | Number  | 3000               | -                                            |
| overlay             | 是否显示背景遮罩层                                                                          | Boolean | false              | true                                         |
| closeOnClick        | 是否在点击后关闭                                                                            | Boolean | false              | true                                         |
| closeOnClickOverlay | 是否在点击遮罩层后关闭                                                                      | Boolean | false              | true                                         |
| loadingType         | 加载图标类型                                                                                | String  | `circular`         | `circular` `spinner`                         |
| customClass         | 自定义类名                                                                                  | String  | -                  | -                                            |
| customStyle         | 自定义样式                                                                                  | Object  | {}                 | -                                            |
| overlayClass        | 自定义遮罩层类名                                                                            | String  | -                  |                                              |
| overlayStyle        | 自定义遮罩层样式                                                                            | Object  | {}                 |                                              |
| entryClass          | 入场动画                                                                                    | String  | `animate__fadeIn`  | 更多可查看 [animate](https://animate.style/) |
| exitClass           | 退场动画                                                                                    | String  | `animate__fadeOut` | 更多可查看 [animate](https://animate.style/) |
| themeName           | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 的主题名称                             | String  | `default`          |                                              |

### Slots

| 名称    | 说明       | 参数 |
| ------- | ---------- | ---- |
| message | 自定义文本 | -    |

### Events

| 名称   | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| close  | 关闭时触发 | -        |
| opened | 打开时触发 | -        |

### Methods

| 名称       | 说明                | 参数                                     |
| ---------- | ------------------- | ---------------------------------------- |
| setData    | 设置 toast 内部数据 | (data: Object\|String) data 对象同 props |
| changeShow | 改变显隐状态        | (flag:Boolean)                           |

### Hooks

| 名称             | 说明         | 参数                                |
| ---------------- | ------------ | ----------------------------------- |
| showToast        | 展示提示     | value:String\|Object //对象同 props |
| showLoadingToast | 展示加载提示 | value:String\|Object                |
| showSuccessToast | 展示成功提示 | value:String\|Object                |
| showFailToast    | 展示失败提示 | value:String \|Object               |
| closeToast       | 关闭提示     | -                                   |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
