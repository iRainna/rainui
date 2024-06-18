# r-switch

r-switch开关，用于在打开和关闭状态之间进行切换。

## 示例

```vue
<r-switch v-model:value="checked" @change="changeSwitch" />
<r-switch v-model:value="checked" disabled />
<r-switch v-model:value="checked" loading />
<r-switch v-model:value="checked" size="22px" />
<r-switch
  v-model:value="checked"
  active-color="#ee0a24"
  inactive-color="#dcdee0"
/>
<r-switch v-model:value="checked">
  <template #node>
    <!-- <view class="icon-wrapper"> -->
    <r-icon
      prefix="iconfont"
      :name="checked ? 'icon-smile' : 'icon-frown'"
    />
    <!-- </view> -->
  </template>
</r-switch>
```



## API

### Props

| 名称          | 说明              | 类型    | 默认值                    | 可选值 |
| ------------- | ----------------- | ------- | ------------------------- | ------ |
| value         | 开关选中状态      | any     | false                     | -      |
| loading       | 是否为加载状态    | Boolean | false                     | true   |
| disabled      | 是否为禁用状态    | Boolean | false                     | true   |
| size          | 开关按钮的尺寸    | String  | 52rpx                     |        |
| activeColor   | 打开时的背景色    | String  | #1989fa                   |        |
| inactiveColor | 关闭时的背景色    | String  | rgba(120, 120, 128, 0.16) |        |
| activeValue   | 打开时对应的值    | any     | true                      |        |
| inactiveValue | 关闭时对应的值    | any     | false                     |        |
| themeName     | r-theme的主题名称 | String  | default                   |        |

### Slots

| 名称       | 说明                 |
| ---------- | -------------------- |
| node       | 自定义按钮的内容     |
| background | 自定义开关的背景内容 |

### Events

| 名称         | 说明               | 回调参数 |
| ------------ | ------------------ | -------- |
| update:value | 开关状态切换时触发 | value    |
| change       | 开关状态切换时触发 | value    |

