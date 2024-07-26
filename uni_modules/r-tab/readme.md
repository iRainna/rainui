# r-tab

`r-tab `选项卡组件，用于在不同的内容区域之间进行切换。该组件为[r-tabs](https://ext.dcloud.net.cn/plugin?id=18849)的子组件，导入[r-tabs](https://ext.dcloud.net.cn/plugin?id=18849)即可

## 示例

```vue
// 小程序需要在外侧设置宽度
<r-tabs v-model:active="tabActive">
        <r-tab title="标签 1" name="tab1"> </r-tab>
        <r-tab title="标签 2" name="tab2">内容 2</r-tab>
        <r-tab title="标签 3" name="tab3">内容 3</r-tab>
        <r-tab title="标签 4" name="tab4">内容 4</r-tab>
        <r-tab title="标签 5" name="tab5">内容 5</r-tab>
        <r-tab title="标签 6" name="tab6">内容 6</r-tab>
        <r-tab title="标签 7" name="tab7">内容 7</r-tab>
        <r-tab title="标签 8" name="tab8">内容 8</r-tab>
        <r-tab title="标签 9" name="tab9">内容 9</r-tab>
        <r-tab title="标签 0" name="tab0">内容 0</r-tab>
      </r-tabs>
```

## API

### Tabs Props

| 名称           | 说明                                                         | 类型           | 默认值                       | 可选值 |
| -------------- | ------------------------------------------------------------ | -------------- | ---------------------------- | ------ |
| active         | 绑定当前选中标签的标识符                                     | Number\|String | 0                            | -      |
| type           | 样式风格类型                                                 | String         | `line`                       | `card` |
| color          | 标签主题色                                                   | String         | #1989fa                      |        |
| background     | 标签栏背景色                                                 | String         | var(--r-tabs-nav-background) |        |
| duration       | 动画时间，单位毫秒                                           | Number         | 300                          |        |
| lineWidth      | 底部条宽度                                                   | String         | 80rpx                        |        |
| lineHeight     | 底部条高度                                                   | String         | 6rpx                         |        |
| animated       | 是否开启切换标签内容时的转场动画                             | Boolean        | false                        |        |
| border         | 是否显示标签栏外边框，仅在 type="line" 时有效                | Boolean        | false                        |        |
| ellipsis       | 是否省略过长的标题文字                                       | Boolean        | true                         |        |
| sticky         | 是否使用粘性布局                                             | Boolean        | false                        |        |
| shrink         | 是否开启左侧收缩布局                                         | Boolean        | false                        |        |
| swipeThreshold | 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动 | Number         | 5                            |        |
| beforeChange   | 切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise | Function       |                              |        |
| themeName      | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 的主题  | String         | default                      |        |

### Tab Props

| 名称          | 说明                                                         | 类型             | 默认值  | 可选值 |
| ------------- | ------------------------------------------------------------ | ---------------- | ------- | ------ |
| title         | 标题                                                         | String           | -       | -      |
| dot           | 是否在标题右上角显示小红点                                   | Boolean          | false   | true   |
| disabled      | 是否禁用标签                                                 | Boolean          | false   | true   |
| badge         | 图标右上角徽标的内容                                         | String           |         |        |
| name          | 标签名称，作为匹配的标识符                                   | String \| Number |         |        |
| showZeroBadge | 当 badge 为数字 0 时，是否展示徽标                           | Boolean          | true    |        |
| themeName     | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 的主题名称 | String           | default |        |

### Tabs Slots

| 名称      | 说明         | 参数 |
| --------- | ------------ | ---- |
| title     | title 处插槽 | item |
| navLeft   | nav 左侧     | -    |
| navRight  | nav 右侧     | -    |
| navBottom | nav 下侧     | -    |
| default   | 默认插槽     |      |

### Tabs Events

| 名称          | 说明                     | 回调参数                      |
| ------------- | ------------------------ | ----------------------------- |
| update:active | 当前激活的标签改变时触发 | name                          |
| change        | 当前激活的标签改变时触发 | name,title                    |
| rendered      | 标签内容首次渲染时触发   | name,title                    |
| clickTab      | 点击标签时触发           | { name,title,event,disabled } |