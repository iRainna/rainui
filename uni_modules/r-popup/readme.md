# r-popup

`r-popup` 是一个基于 `animate.css` 的一个`uniapp ` `vue3` 的弹出层容器，用于展示弹窗、信息提示等内容。

## 示例

```vue
<r-popup v-model:show="show" round position="bottom">
  <view style="height: 100px; background-color: #fff">11111</view>
</r-popup>
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
| update:show      | value值改变时触发          | value    |