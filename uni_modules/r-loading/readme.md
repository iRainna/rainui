# r-loading

`r-loading` 是一个加载图标，用于表示加载中的过渡状态。

## 示例

```vue
<r-loading type="circular"></r-loading>
<r-loading type="spinner"></r-loading>
<r-loading type="circular">
    <template #icon>
        <Icon name="icon-left-circle" hoverClass="animate__fadeIn" @click="changeShow" />
    </template>
</r-loading>
<r-loading type="circular" color="red">加载中。。。</r-loading>
<r-loading type="spinner" color="red" vertical>加载中。。。</r-loading>
<r-loading type="circular" size="24rpx"></r-loading>
<r-loading type="spinner" size="24rpx"></r-loading>
```

## API

### Props

| 参数      | 说明                       | 类型    | 默认值   | 可选值  |
| --------- | -------------------------- | ------- | -------- | ------- |
| color     | 颜色                       | String  | \#c9c9c9 |         |
| type      | 类型                       | String  | circular | spinner |
| size      | 图标大小                   | String  | 60rpx    |         |
| textSize  | 文字大小                   | String  | 28rpx    | -       |
| textColor | 文字颜色                   | String  | \#c9c9c9 | -       |
| vertical  | 是否垂直排列图标和文字内容 | Boolean | false    | true    |
| themeName | r-theme 的主题名称         | String  | default  |         |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 加载文案       |
| icon    | 自定义加载图标 |
