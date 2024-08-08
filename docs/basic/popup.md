<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/popup/popup'
 </script>

# r-popup

`r-popup` 是一个基于 `animate.css` 的一个`uniapp ` `vue3` 的弹出层容器，用于展示弹窗、信息提示等内容。

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="弹出层"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">弹出位置 </r-divider>
      <r-cell-group>
        <r-cell
          is-link
          title="顶部弹出"
          @click="
            open({
              position: 'top',
            })
          "
        />
        <r-cell
          is-link
          title="底部弹出"
          @click="
            open({
              position: 'bottom',
            })
          "
        />
        <r-cell
          is-link
          title="左侧弹出"
          @click="
            open({
              position: 'left',
            })
          "
        />
        <r-cell
          is-link
          title="右侧弹出"
          @click="
            open({
              position: 'right',
            })
          "
        />
        <r-cell
          is-link
          title="居中弹出"
          @click="
            open({
              position: 'center',
            })
          "
        />
      </r-cell-group>

      <r-divider content-position="left">关闭图标 </r-divider>

      <r-cell-group>
        <r-cell
          is-link
          title="关闭图标"
          @click="
            open({
              closeable: true,
            })
          "
        />
        <r-cell
          is-link
          title="自定义图标"
          @click="
            open({
              closeable: true,
              closeIcon: 'close',
            })
          "
        />
        <r-cell
          is-link
          title="图标位置"
          @click="
            open({
              closeable: true,
              closeIconPosition: 'top-left',
            })
          "
        />
      </r-cell-group>

      <r-divider content-position="left">圆角弹窗 </r-divider>
      <r-cell-group>
        <r-cell
          is-link
          title="圆角弹窗（居中）"
          @click="
            open({
              round: true,
              position: 'center',
            })
          "
        />
        <r-cell
          is-link
          title="圆角弹窗（底部）"
          @click="
            open({
              round: true,
              position: 'bottom',
            })
          "
        />
      </r-cell-group>
    </view>

    <r-popup
      v-model:show="show"
      :round="popupParams.round"
      :position="popupParams.position || 'bottom'"
      :closeable="popupParams.closeable"
      :close-icon="popupParams.closeIcon || 'cross'"
      :close-icon-position="popupParams.closeIconPosition || 'top-right'"
      @click-close-icon="show = false"
      safeAreaInsetTop
      safeAreaInsetBottom
      :customStyle="{
        marginTop: !['bottom', 'center'].includes(popupParams.position)
          ? '92rpx'
          : '0',
      }"
    >
      <view style="height: 100px; background-color: #fff">11111</view>
    </r-popup>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const show = ref(false);
const popupParams = ref({});
const open = (e) => {
  popupParams.value = e;
  show.value = true;
};
</script>
```

## API

### Props

| 参数                | 说明                                                 | 类型    | 默认值    | 可选值                                               |
| ------------------- | ---------------------------------------------------- | ------- | --------- | ---------------------------------------------------- |
| show                | 是否显示弹出层                                       | Boolean | false     | true                                                 |
| overlay             | 是否显示遮罩层                                       | Boolean | true      | false                                                |
| position            | 弹出位置                                             | String  | center    | top \| bottom \| right \| left \| center             |
| overlayClass        | 自定义遮罩层类名                                     | String  | ""        | -                                                    |
| overlayStyle        | 自定义遮罩层样式                                     | Object  | {}        | -                                                    |
| duration            | 动画时长，单位毫秒，设置为 0 可以禁用动画            | Number  | 300       | -                                                    |
| zIndex              | 将弹窗的 z-index 层级设置为一个固定值                | Number  | 2000      | -                                                    |
| round               | 是否显示圆角                                         | Boolean | false     | true                                                 |
| lockScroll          | 是否锁定背景滚动                                     | Boolean | true      | false                                                |
| closeOnClickOverlay | 是否在点击遮罩层后关闭                               | Boolean | true      | false                                                |
| themeName           | 主题名称                                             | String  | default   | 可自定义 r-theme 设置                                |
| closeable           | 是否显示关闭图标                                     | Boolean | false     | true                                                 |
| closeIcon           | 闭图标名称或图片链接，等同于 r-icon 组件的 name 属性 | String  | cross     | -                                                    |
| closeIconPosition   | 关闭图标位置                                         | String  | top-right | top-left \| bottom-left \| bottom-right \| top-right |
| iconPrefix          | 图标类名前缀，等同于 r-icon 组件的 prefix 属性       | String  | van-icon  | iconfont                                             |
| safeAreaInsetTop    | 是否开启顶部安全区适配                               | Boolean | false     | true                                                 |
| safeAreaInsetBottom | 是否开启底部安全区适配                               | Boolean | false     | true                                                 |
| customStyle         | 自定义样式                                           | Object  | {}        | -                                                    |
| customClass         | 自定义类                                             | String  |           |                                                      |

### Slots

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 组件内部，将需要添加内容放置于此 |

### Events

| 事件名           | 说明                       | 回调参数 |
| ---------------- | -------------------------- | -------- |
| click            | 点击弹出层时触发           | e        |
| click-overlay    | 点击遮罩层时触发           | e        |
| click-close-icon | 点击关闭图标时触发         | e        |
| open             | 打开弹出层时立即触发       | -        |
| close            | 关闭弹出层时立即触发       | -        |
| opened           | 打开弹出层且动画结束后触发 | -        |
| closed           | 关闭弹出层且动画结束后触发 | -        |
| update:show      | value 值改变时触发         | value    |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
