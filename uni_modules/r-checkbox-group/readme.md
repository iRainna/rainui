# r-checkbox

`r-checkbox`复选框，在一组备选项中进行多选。

## 示例

```vue
    <r-checkbox v-model:value="checked">复选框</r-checkbox>
    <r-checkbox v-model:value="checked" disabled>复选框</r-checkbox>
    <r-checkbox-group v-model:value="checkList" shape="square">
      <r-checkbox name="a">复选框 a</r-checkbox>
      <r-checkbox name="b">复选框 b</r-checkbox>
    </r-checkbox-group>
    <r-checkbox-group
      v-model:value="checkList"
      direction="horizontal"
      shape="round"
    >
      <r-checkbox name="check1">复选框</r-checkbox>
      <r-checkbox name="check2">复选2</r-checkbox>
    </r-checkbox-group>
    <r-checkbox v-model:value="checked" checked-color="#ee0a24"
      >复选框</r-checkbox
    >
    <r-checkbox v-model:value="checked" icon-size="24px">复选框</r-checkbox>

    <r-checkbox v-model:value="checked">
      自定义图标
      <template #icon="props">
        <image
          style="height: 20px; width: 20px"
          :src="
            props.checked
              ? 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png'
              : 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'
          "
        />
      </template>
    </r-checkbox>

    <r-checkbox v-model:value="checked" label-position="left"
      >复选框</r-checkbox
    >
    <r-checkbox v-model:value="checked" label-disabled>复选框</r-checkbox>

    <r-checkbox-group v-model:value="checkList" direction="vertical">
      <r-checkbox name="a">复选框 a</r-checkbox>
      <r-checkbox name="b">复选框 b</r-checkbox>
    </r-checkbox-group>
```



## API

### Checkbox Props

| 名称          | 说明                                 | 类型    | 默认值   | 可选值         |
| ------------- | ------------------------------------ | ------- | -------- | -------------- |
| value         | 是否为选中状态                       | Boolean | false    | -              |
| name          | 标识符，通常为一个唯一的字符串或数字 | any     | -        | -              |
| shape         | 形状                                 | String  | round    | `square` `dot` |
| disabled      | 是否为禁用状态                       | Boolean | false    | true           |
| labelPosition | 文本位置                             | String  | right    | left           |
| iconSize      | 图标大小                             | String  | 40rpx    |                |
| checkedColor  | 选中状态颜色                         | String  | \#1989fa |                |
| bindGroup     | 是否与复选框组绑定                   | Boolean | true     |                |
| themeName     | r-theme的主题名称                    | String  | default  |                |

### CheckboxGroup Props

| 名称         | 说明                     | 类型    | 默认值   | 可选值         |
| ------------ | ------------------------ | ------- | -------- | -------------- |
| value        | 所有选中项的标识符       | any     | -        | -              |
| disabled     | 是否禁用所有单选框       | Boolean | false    | true           |
| direction    | 排列方向                 | String  | vertical | horizontal     |
| shape        | 形状                     | String  | `square` | `round`  `dot` |
| iconSize     | 所有单选框的图标大小     | String  | 40rpx    |                |
| checkedColor | 所有单选框的选中状态颜色 | String  | \#1989fa |                |
| themeName    | r-theme的主题名称        | String  | default  |                |

### Checkbox Slots

| 名称    | 说明       | 参数                                      |
| ------- | ---------- | ----------------------------------------- |
| default | 自定义文本 | *{ checked: boolean, disabled: boolean }* |
| icon    | 自定义图标 | *{ checked: boolean, disabled: boolean }* |

### Checkbox Events

| 名称         | 说明                     | 回调参数 |
| ------------ | ------------------------ | -------- |
| update:value | 当绑定值变化时触发的事件 | value    |
| click        | 点击单选框时触发         | e        |

### CheckboxGroup Events

| 名称         | 说明                     | 回调参数 |
| ------------ | ------------------------ | -------- |
| update:value | 当绑定值变化时触发的事件 | value    |