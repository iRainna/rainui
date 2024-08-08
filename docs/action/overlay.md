<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/overlay/overlay'
 </script>

# r-overlay

`r-overlay` 是一个基于 `r-animation` 的一个 vue3 的遮罩层组件，一般用于弹窗场景。

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="遮罩层"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-button
        type="primary"
        @click="
          () => {
            show = true;
            zIndex = 1;
            hasContent = false;
          }
        "
        >显示遮罩层</r-button
      >
      <r-divider content-position="left">嵌入内容</r-divider>
      <r-button
        type="primary"
        @click="
          () => {
            show = true;
            zIndex = 1;
            hasContent = true;
          }
        "
        >嵌入内容</r-button
      >
      <r-divider content-position="left">设置 z-index </r-divider>
      <r-button
        type="primary"
        @click="
          () => {
            show = true;
            zIndex = 1000;
            hasContent = false;
          }
        "
        >设置 z-index
      </r-button>
    </view>

    <r-overlay :show="show" :zIndex="zIndex" @click="show = false">
      <view class="wrapper" @click.stop="show = false" v-if="hasContent">
        <view class="block" />
      </view>
    </r-overlay>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const zIndex = ref(1);
const show = ref(false);
const hasContent = ref(false);
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
```

## API

### Props

| 参数                  | 说明                                                   | 类型                      | 默认值             | 可选值                                                              |
| --------------------- | ------------------------------------------------------ | ------------------------- | ------------------ | ------------------------------------------------------------------- |
| show                  | 加载动画的显隐                                         | Boolean                   | false              | true                                                                |
| entryClass            | 入场动画                                               | String                    | animate\_\_fadeIn  | animate\_\_bounceIn ...更多可移步到官网查看 https://animate.style/  |
| exitClass             | 退场动画                                               | String                    | animate\_\_fadeOut | animate\_\_bounceOut ...更多可移步到官网查看 https://animate.style/ |
| duration              | 持续时间(ms)                                           | Number                    | 1000               | -                                                                   |
| delay                 | 延迟时间(ms)                                           | Number                    | 0                  | -                                                                   |
| customStyle           | 自定义样式                                             | Object                    | {}                 | -                                                                   |
| customTransitionStyle | 自定义动画组件样式 （r-animation 的 customStyle 属性） | Object                    | {}                 | -                                                                   |
| customClass           | 自定义类名                                             | String, \| Array \|Object | ''                 | -                                                                   |
| color                 | 背景颜色                                               | String                    | rgba(0,0,0,0.7)    | -                                                                   |
| zIndex                | 层级                                                   | Number                    | 2000               | -                                                                   |
| themeName             | 主题名称                                               | String                    | default            | 可自定义 r-theme 设置                                               |

### Slots

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 组件内部，将需要添加内容放置于此 |

### Events

| 事件名 | 说明                 | 回调参数 |
| ------ | -------------------- | -------- |
| open   | 打开的回调           | -        |
| opened | 打开动画结束时的回调 | -        |
| close  | 关闭的回调           | -        |
| closed | 关闭动画结束时的回调 | -        |
| click  | 点击遮罩层的事件     | e        |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
