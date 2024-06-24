# r-space

`r-space` 间距，设置元素之间的间距。

## 示例

```vue
<r-space>
    <r-button @click="openToast(0)">打开</r-button>
    <r-button @click="openToast(1)">打开失败</r-button>
    <r-button @click="openToast(2)">打开成功</r-button>
    <r-button @click="openToast(3)">打开加载</r-button>
</r-space>
```



## API

### Props

| 名称      | 说明                                          | 类型    | 默认值       | 可选值                             |
| --------- | --------------------------------------------- | ------- | ------------ | ---------------------------------- |
| direction | 间距方向                                      | String  | `horizontal` | `horizontal` `vertical `           |
| size      | 间距大小                                      | String  | 16rpx        |                                    |
| align     | 设置子元素的对齐方式                          | String  | `start`      | `start` `end ` `center` `baseline` |
| wrap      | 是否自动换行                                  | Boolean | false        | true                               |
| fill      | 是否让 Space 变为一个块级元素，填充整个父元素 | Boolean | false        | true                               |



### Slots

| 名称    | 说明         | 参数 |
| ------- | ------------ | ---- |
| default | 间距组件内容 | -    |

