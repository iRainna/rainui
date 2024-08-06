# r-radio

`r-radio`单选框，在一组备选项中进行单选。

## 示例

```vue
<r-radio-group v-model:value="radioData">
  <r-radio name="1">单选框 1</r-radio>
  <r-radio name="2">单选框 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData" direction="horizontal">
  <r-radio name="1">单选框 1</r-radio>
  <r-radio name="2">单选框 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData" disabled>
  <r-radio name="1">单选框 1</r-radio>
  <r-radio name="2">单选框 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData" shape="square">
  <r-radio name="1">单选框 1</r-radio>
  <r-radio name="2">单选框 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData" shape="dot">
  <r-radio name="1">Radio 1</r-radio>
  <r-radio name="2">Radio 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData">
  <r-radio name="1" checked-color="#ee0a24">单选框 1</r-radio>
  <r-radio name="2" checked-color="#ee0a24">单选框 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData">
  <r-radio name="1" icon-size="24px">单选框 1</r-radio>
  <r-radio name="2" icon-size="24px">单选框 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData">
  <r-radio name="1" label-position="left">单选框 1</r-radio>
  <r-radio name="2" label-position="left">单选框 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData">
  <r-radio name="1" label-disabled>单选框 1</r-radio>
  <r-radio name="2" label-disabled>单选框 2</r-radio>
</r-radio-group>

<r-radio-group v-model:value="radioData">
  <r-radio name="1">
    单选框 1
    <template #icon="props">
      <image
        style="height: 20px; width: 20px"
        :src="
          props.checked
            ? activeURL
            : inactiveURL 
        "
      />
    </template>
  </r-radio>
  <r-radio name="2">
    单选框 2
    <template #icon="props">
      <image
        style="height: 20px; width: 20px"
        :src="
          props.checked
            ? activeURL
            : inactiveURL
        "
      />
    </template>
  </r-radio>
</r-radio-group>
```

## API

### Radio Props

| 名称          | 说明                                 | 类型    | 默认值   | 可选值         |
| ------------- | ------------------------------------ | ------- | -------- | -------------- |
| name          | 标识符，通常为一个唯一的字符串或数字 | any     | -        | -              |
| shape         | 形状                                 | String  | round    | `square` `dot` |
| disabled      | 是否为禁用状态                       | Boolean | false    | true           |
| labelPosition | 文本位置                             | String  | right    | left           |
| iconSize      | 图标大小                             | String  | 40rpx    |                |
| checkedColor  | 选中状态颜色                         | String  | \#1989fa |                |
| themeName     | r-theme 的主题名称                   | String  | default  |                |

### RadioGroup Props

| 名称         | 说明                     | 类型    | 默认值   | 可选值         |
| ------------ | ------------------------ | ------- | -------- | -------------- |
| value        | 当前选中项的标识符       | any     | -        | -              |
| disabled     | 是否禁用所有单选框       | Boolean | false    | true           |
| direction    | 排列方向                 | String  | vertical | horizontal     |
| shape        | 形状                     | String  | round    | `square` `dot` |
| iconSize     | 所有单选框的图标大小     | String  | 40rpx    |                |
| checkedColor | 所有单选框的选中状态颜色 | String  | \#1989fa |                |
| themeName    | r-theme 的主题名称       | String  | default  |                |

### Radio Slots

| 名称    | 说明       | 参数                                      |
| ------- | ---------- | ----------------------------------------- |
| default | 自定义文本 | _{ checked: boolean, disabled: boolean }_ |
| icon    | 自定义图标 | _{ checked: boolean, disabled: boolean }_ |

### Radio Events

| 名称         | 说明                     | 回调参数 |
| ------------ | ------------------------ | -------- |
| update:value | 当绑定值变化时触发的事件 | value    |
| click        | 点击单选框时触发         | e        |

### RadioGroup Events

| 名称         | 说明                     | 回调参数 |
| ------------ | ------------------------ | -------- |
| update:value | 当绑定值变化时触发的事件 | value    |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)