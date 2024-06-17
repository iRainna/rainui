# r-badge

`r-badge`徽标组件，可在右上角展示徽标数字或小红点。

## 示例

```vue
<!-- 基础用法 -->
<r-badge :content="5" >
    <div class="child" />
</r-badge>

<r-badge :content="10" :offset="['10rpx', '10rpx']">
    <div class="child" />
</r-badge>

<r-badge content="Hot">
    <div class="child" />
</r-badge>

<r-badge dot>
    <div class="child" />
</r-badge>

<!-- 最大值 -->
<r-badge :content="20" max="9">
    <div class="child" />
</r-badge>

<r-badge :content="50" max="20">
    <div class="child" />
</r-badge>

<r-badge :content="200" max="99">
    <div class="child" />
</r-badge>

<!-- 自定义颜色 -->
<r-badge :content="5" color="#1989fa">
    <div class="child" />
</r-badge>

<r-badge :content="10" color="#1989fa">
    <div class="child" />
</r-badge>

<r-badge dot color="#1989fa">
    <div class="child" />
</r-badge>

<!-- 自定义徽标内容 -->
<r-badge>
    <div class="child" />
    <template #content>
      <r-icon
        name="icon-success"
        color="#fff"
        prefix="iconfont"
        size="32rpx"
        class="r-badge-icon"
      />
    </template>
</r-badge>

<r-badge>
    <div class="child" />
    <template #content>
      <r-icon
        name="icon-fail"
        color="#fff"
        prefix="iconfont"
        size="32rpx"
        class="r-badge-icon"
      />
    </template>
</r-badge>

<r-badge>
    <div class="child" />
    <template #content>
      <r-icon
        name="icon-smile"
        color="#fff"
        prefix="iconfont"
        size="32rpx"
        class="r-badge-icon"
      />
    </template>
</r-badge>

<!-- 自定义徽标位置 -->
<r-badge :content="10" position="top-left">
    <div class="child" />
</r-badge>

<r-badge :content="10" position="bottom-left">
    <div class="child" />
</r-badge>

<r-badge :content="10" position="bottom-right">
    <div class="child" />
</r-badge>

<!-- 独立展示 -->
<r-badge :content="20" />

<r-badge :content="200" max="99" />
```



## API

### Props

| 名称      | 说明                                                         | 类型             | 默认值    | 可选值                                   |
| --------- | ------------------------------------------------------------ | ---------------- | --------- | ---------------------------------------- |
| content   | 徽标内容                                                     | Number \| String | -         | -                                        |
| color     | 徽标背景颜色                                                 | String           | #ee0a24   | -                                        |
| dot       | 是否展示为小红点                                             | Boolean          | false     | true                                     |
| max       | 最大值，超过最大值会显示 `{max}+`，仅当 content 为数字时有效 | Number \| String | -         | -                                        |
| offset    | 设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量 | Array            | -         | -                                        |
| showZero  | 当 content 为数字 0 或字符串 '0' 时，是否展示徽标            | Boolean          | true      | false                                    |
| position  | 徽标位置                                                     | String           | top-right | top-left \| bottom-left  \| bottom-right |
| themeName | r-theme的主题名称                                            | String           | default   |                                          |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 徽标包裹的子元素 |
| content | 自定义徽标内容   |

