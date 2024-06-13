# r-overlay

`r-overlay` 是一个基于 `r-animation` 的一个 vue3 的遮罩层组件，一般用于弹窗场景。

## 示例

```vue
<r-overlay
  :show="show"
  :duration="1000"
  :delay="0"
  entryClass="animate__fadeIn"
  @open="open"
  @close="close"
  exitClass="animate__fadeOut"
  @click="show = false"
>
</r-overlay>
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
