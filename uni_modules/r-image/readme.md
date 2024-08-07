# r-image

增强版的 `image` `vue3`组件，支持图片懒加载、加载中提示、加载失败提示。

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="图片"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基础使用</r-divider>
      <r-image
        width="200rpx"
        height="200rpx"
        src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
      />
      <r-divider content-position="left">填充模式 </r-divider>
      <r-cell-group inset>
        <r-field name="checkbox" label="缩放模式">
          <template #input>
            <r-radio-group v-model:value="radio" direction="horizontal">
              <r-radio
                :name="item.id"
                v-for="item in modes.filter((t, index) => index < 5)"
                :key="item.id"
                >{{ item.value }}</r-radio
              >
            </r-radio-group>
          </template>
        </r-field>
        <r-field name="checkbox" label="裁剪模式">
          <template #input>
            <r-radio-group v-model:value="radio" direction="horizontal">
              <r-radio
                :name="item.id"
                v-for="item in modes.filter((t, index) => index >= 5)"
                :key="item.id"
                >{{ item.value }}</r-radio
              >
            </r-radio-group>
          </template>
        </r-field>

        <r-image
          :mode="mode"
          width="200rpx"
          height="200rpx"
          src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
        />
      </r-cell-group>

      <r-divider content-position="left">圆形图片 </r-divider>
      <r-image
        round
        width="200rpx"
        height="200rpx"
        src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
      />

      <r-divider content-position="left">加载中提示 </r-divider>
      <r-image
        width="200rpx"
        height="200rpx"
        src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
      >
        <template v-slot:loading>
          <r-loading type="spinner" size="20" />
        </template>
      </r-image>

      <r-divider content-position="left">加载失败提示 </r-divider>
      <r-image
        src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jp"
      >
        <template v-slot:error>加载失败</template>
      </r-image>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { _ } from "@/uni_modules/r-utils/js_sdk/index.js";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const { uniqueId } = _;

const modes = ref(
  [
    "scaleToFill",
    "aspectFit",
    "aspectFill",
    "widthFix",
    "heightFix",
    "top",
    "bottom",
    "center",
    "left",
    "right",
    "top left",
    "top right",
    "bottom left",
    "bottom right	",
  ].map((t) => ({
    id: uniqueId(),
    value: t,
  }))
);
const radio = ref(modes.value[0].id);
const mode = computed(() => {
  return modes.value.find((t) => t.id == radio.value).value;
});
</script>

```

## API

### Props

| 名称        | 说明                                                         | 类型    | 默认值              | 可选值                                                       |
| ----------- | ------------------------------------------------------------ | ------- | ------------------- | ------------------------------------------------------------ |
| entryClass  | 入场动画                                                     | String  | animate\_\_fadeIn   | 更多查看[animate.css](https://animate.style/)                |
| exitClass   | 退场动画                                                     | String  | animate\_\_fadeOut  | 更多查看[animate.css](https://animate.style/)                |
| duration    | 持续时间                                                     | Number  | 1000                |                                                              |
| delay       | 延迟时间                                                     | Number  | 0                   |                                                              |
| customStyle | 自定义样式                                                   | Object  | {}                  |                                                              |
| customClass | 自定义类名                                                   | String  |                     |                                                              |
| src         | 图片资源地址                                                 | String  |                     |                                                              |
| mode        | 图片裁剪、缩放的模式                                         | String  | scaleToFill         | `scaleToFill` `aspectFit` `aspectFill` `widthFix` `heightFix` `top` `bottom` `center` `left` `right` `top left` `top right` `bottom left` `bottom right` |
| lazyLoad    | 图片懒加载。只针对 page 与 scroll-view 下的 image 有效 微信小程序、百度小程序、抖音小程序、飞书小程序有效 | Boolean | false               |                                                              |
| customStyle | 自定义样式                                                   | Object  | {}                  |                                                              |
| width       | 宽度                                                         | String  |                     |                                                              |
| height      | 高度                                                         | String  |                     |                                                              |
| round       | 是否显示为圆形                                               | Boolean | false               |                                                              |
| radius      | 圆角大小                                                     | String  |                     |                                                              |
| block       | 是否将根节点设置为块级元素，默认情况下为 inline-block 元素   | Boolean | true                |                                                              |
| showError   | 是否展示图片加载失败提示                                     | Boolean | true                |                                                              |
| showLoading | 是否展示图片加载中提示                                       | Boolean | true                |                                                              |
| errorIcon   | 失败时提示的图标名称或图片链接，等同于 r-icon 组件的 name 属性 | String  | icon-warning-circle |                                                              |
| loadingIcon | 加载时提示的图标名称或图片链接，等同于 r-icon 组件的 name 属性 | String  | icon-image          |                                                              |
| iconSize    | 加载图标和失败图标的大小                                     | String  | 64rpx               |                                                              |
| iconPrefix  | 图标类名前缀，等同于 r-icon 组件的 prefix 属性               | String  | iconfont            | van-icon                                                     |
| iconColor   | 图标颜色                                                     | String  |                     |                                                              |
| themeName   | r-theme 主题名称                                             | String  | default             |                                                              |

### Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| error   | 自定义加载失败时的提示内容 |
| loading | 自定义加载中的提示内容     |

### Event

| 名称  | 说明       |
| ----- | ---------- |
| click | 点击时触发 |



更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)

