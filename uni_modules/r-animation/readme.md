# r-animation

`r-animation` 是一个基于 `animate.css` 的一个过度动画组件，方便简洁的使用`animate.css`动画。

## 示例

  

```vue
<r-animation
    :show="show"
    :duration="3000"
    :delay="0"
    entryClass="animate__fadeIn"
    @open="open"
    @close="close"
    @opened="opened"
    @closed="closed"
    exitClass="animate__fadeOut">

    <image class="logo" src="/static/logo.png"></image>

</r-animation>
<button @click="show=!show">show</button>
```



## API

### Props

| 参数        | 说明           | 类型    | 默认值           | 可选值                                                       |
| ----------- | -------------- | ------- | ---------------- | ------------------------------------------------------------ |
| show        | 加载动画的显隐 | Boolean | false            | true                                                         |
| entryClass  | 入场动画       | String  | animate__fadeIn  | animate__bounceIn ...更多可移步到官网查看  https://animate.style/ |
| exitClass   | 退场动画       | String  | animate__fadeOut | animate__bounceOut ...更多可移步到官网查看  https://animate.style/ |
| duration    | 持续时间(ms)   | Number  | 1000             | -                                                            |
| delay       | 延迟时间(ms)   | Number  | 0                | -                                                            |
| customStyle | 自定义样式     | Object  | {}               | -                                                            |



### Slots

| 名称    | 说明                                       |
| ------- | ------------------------------------------ |
| default | 动画组件内部，将需要添加动画的内容放置于此 |



### Events

| 事件名 | 说明                 | 回调参数 |
| ------ | -------------------- | -------- |
| open   | 打开的回调           | -        |
| opened | 打开动画结束时的回调 | -        |
| close  | 关闭的回调           | -        |
| closed | 关闭动画结束时的回调 | -        |