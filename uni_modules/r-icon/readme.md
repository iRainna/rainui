# r-icon

`r-icon` 是一个使用 `iconfont` 的一个的字体图标组件，内置一些图标（可替换为自己的图标库，下载自己的图标文件后，将 iconfont 文件夹内容替换即可），方便简洁的使用`iconfont`图标。

## API

### Props

| 参数        | 说明                     | 类型   | 默认值   | 可选值                                                                                                                                       |
| ----------- | ------------------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | icon 名称                | String | ''       | icon-fail \| icon-success \| icon-right \| icon-left \| icon-up \| icon-down \| icon-loading 等，更多可查看 iconfont 文件夹下的 iconfont.css |
| size        | 大小                     | String | 48rpx    | -                                                                                                                                            |
| color       | 颜色                     | String | ''       | - //不设置时，为 r-theme 的默认主题的 r-text-color 颜色（#323233）                                                                           |
| customStyle | 自定义样式               | Object | {}       | -                                                                                                                                            |
| customClass | 自定义类名               | String | ''       | -                                                                                                                                            |
| prefix      | 前缀类名                 | String | iconfont | -                                                                                                                                            |
| hoverClass  | 指定按下去的样式类       | String | ''       | - //可使用官方原生的样式或者 animate.css 样式                                                                                                |
| themeName   | r-theme 主题名称         | String | default  | -                                                                                                                                            |
| duration    | 按下去的动画持续时间(ms) | Number | 1000     | -                                                                                                                                            |
| dalay       | 动画效果的延迟时间（ms） | Number | 0        | -                                                                                                                                            |

### Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击的回调 | e        |
