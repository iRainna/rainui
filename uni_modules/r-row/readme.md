# r-layout

`Layout` 提供了 `r-row` 和 `r-col` 两个组件来进行行列布局。

## 示例

​    

```vue
<r-row gutter="20rpx" wrap>
    <r-col span="8">
        <view style="background-color: aqua; height: 100px"></view>
    </r-col>
    <r-col span="8">
        <view style="background-color: aqua; height: 100px"></view>
    </r-col>
    <r-col span="8">
        <view style="background-color: aqua; height: 100px"></view>
    </r-col>
</r-row>
```



## API

### Row Props

| 参数    | 说明             | 类型    | 默认值     | 可选值                                                       |
| ------- | ---------------- | ------- | ---------- | ------------------------------------------------------------ |
| gutter  | 列元素之间的间距 | String  | 0rpx       |                                                              |
| justify | 主轴对齐方式     | String  | flex-start | flex-start \| flex-end center \| space-around \| space-between |
| align   | 交叉轴对齐方式   | String  | flex-start | flex-start \| center \| flex-bottom \| baseline              |
| wrap    | 是否自动换行     | boolean | true       | false                                                        |

### Col Props

| 参数   | 说明           | 类型   | 默认值 | 可选值 |
| ------ | -------------- | ------ | ------ | ------ |
| span   | 列元素宽度     | Number | 8      | 1-24   |
| offset | 列元素偏移距离 | Number | 0      |        |

### Row Events

| 名称  | 说明       | 参数 |
| ----- | ---------- | ---- |
| click | 点击时触发 | e    |

### Col Events

| 名称  | 说明       | 参数 |
| ----- | ---------- | ---- |
| click | 点击时触发 | e    |