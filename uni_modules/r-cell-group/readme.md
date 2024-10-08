# r-cell 单元格

单元格为列表中的单个展示项。

## 示例

```vue
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础用法</view>
      <r-cell-group>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
      <view style="padding: 20px">卡片风格</view>
      <r-cell-group inset>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
      <view style="padding: 20px">单元格大小</view>
      <r-cell title="单元格" value="内容" size="large" />
      <r-cell title="单元格" value="内容" size="large" label="描述信息" />

      <view style="padding: 20px">展示图标</view>
      <r-cell title="单元格" icon="location-o" />

      <view style="padding: 20px">展示箭头</view>
      <r-cell title="单元格" is-link />
      <r-cell title="单元格" is-link value="内容" />
      <r-cell title="单元格" is-link arrow-direction="down" value="内容" />

      <view style="padding: 20px">分组标题</view>
      <r-cell-group title="分组1">
        <r-cell title="单元格" value="内容" />
      </r-cell-group>
      <r-cell-group title="分组2">
        <r-cell title="单元格" value="内容" />
      </r-cell-group>
      <!--  -->
      <view style="padding: 20px">使用插槽</view>
      <r-cell value="内容" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">单元格</span>
          <r-tag type="primary">标签</r-tag>
        </template>
      </r-cell>
    </r-config-provider>

   
  </view>
</template>
```

## API

### CellGroup Props

| 名称        | 说明                   | 类型    | 默认值  | 可选值 |
| ----------- | ---------------------- | ------- | ------- | ------ |
| title       | 分组标题               | String  | -       | -      |
| inset       | 是否展示为圆角卡片风格 | Boolean | false   | true   |
| border      | 是否显示外边框         | Boolean | false   | true   |
| customStyle | 自定义样式             | Object  | {}      |        |
| themeName   | r-theme 的主题         | String  | default |        |

### Cell Props

| 名称                 | 说明                                                         | 类型    | 默认值            | 可选值                                      |
| -------------------- | ------------------------------------------------------------ | ------- | ----------------- | ------------------------------------------- |
| title                | 左侧标题                                                     | String  | -                 | -                                           |
| value                | 右侧内容                                                     | String  | -                 | -                                           |
| label                | 标题下方的描述信息                                           | String  | -                 | -                                           |
| size                 | 单元格大小                                                   | String  | -                 | large \| normal                             |
| icon                 | 左侧图标名称,等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 name 属性 | String  | -                 |                                             |
| iconPrefix           | 图标类名前缀，等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 prefix 属性 | String  | r-icon            | iconfont                                    |
| border               | 是否显示内边框                                               | Boolean | true              | false                                       |
| clickable            | 是否开启点击反馈                                             | Boolean | false             | true                                        |
| hoverClass           | 反馈的动画类                                                 | String  | animate\_\_fadeIn | 更多可使用[animate](https://animate.style/) |
| isLink               | 是否展示右侧箭头并开启点击反馈                               | Boolean | false             | true                                        |
| required             | 是否显示表单必填星号                                         | Boolean | false             | true                                        |
| center               | 是否使内容垂直居中                                           | Boolean | false             | true                                        |
| arrowDirection       | 箭头方向                                                     | String  | right             | left \| up \| down \| right                 |
| titleStyle           | 左侧标题额外样式                                             | Object  | {}                |                                             |
| titleClass           | 左侧标题额外类名                                             | String  | -                 |                                             |
| valueClass           | 右侧内容额外类名                                             | String  | -                 |                                             |
| labelClass           | 描述信息额外类名                                             | String  | -                 |                                             |
| customClass          | 自定义类                                                     | String  | -                 |                                             |
| themeName            | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 的主题名称 | String  | default           |                                             |
| rightIconCustomStyle | 右侧 icon 自定义样式                                         | Object  | {}                |                                             |

### CellGroup Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 默认插槽       |
| title   | 自定义分组标题 |

### Cell Slots

| 名称      | 说明                         |
| --------- | ---------------------------- |
| title     | 自定义左侧标题               |
| value     | 自定义右侧内容               |
| label     | 自定义标题下方的描述信息     |
| icon      | 自定义左侧图标               |
| rightIcon | 自定义右侧图标               |
| extra     | 自定义单元格最右侧的额外内容 |

### Cell Events

| 名称  | 说明             | 回调参数 |
| ----- | ---------------- | -------- |
| click | 点击单元格时触发 | e        |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)