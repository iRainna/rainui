# r-stepper

`r-stepper` 是`uniapp vue3`的步进器，由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

## 示例

 

```vue
<r-stepper v-model:value="stepperValue" ></r-stepper>
```



## API

### Props

| 参数          | 说明                                                         | 类型             | 默认值  | 可选值 |
| ------------- | ------------------------------------------------------------ | ---------------- | ------- | ------ |
| value         | 当前输入的值                                                 | Number\|String   |         |        |
| min           | 最小值                                                       | Number           | 1       |        |
| max           | 最大值                                                       | Number           | 999     |        |
| autoFixed     | 是否自动校正超出限制范围的数值，设置为 false 后输入超过限制范围的数值将不会自动校正 | Boolean          | true    | false  |
| defaultValue  | 初始值                                                       | Number \| String | 1       |        |
| step          | 步长，每次点击时改变的值                                     | Number \| String | 1       |        |
| name          | 标识符，通常为一个唯一的字符串或数字，可以在 change 事件回调参数中获取 | String \| Number |         |        |
| inputWidth    | 输入框宽度                                                   | String           | 64rpx   |        |
| buttonSize    | 按钮大小以及输入框高度                                       | String           | 56rpx   |        |
| decimalLength | 固定显示的小数位数                                           | Number           |         |        |
| theme         | 样式风格                                                     | String           |         | round  |
| placeholder   | 输入框占位提示文字                                           | String           |         |        |
| integer       | 是否只允许输入整数                                           | Boolean          | true    | false  |
| disabled      | 是否禁用步进器                                               | Boolean          | false   | true   |
| disablePlus   | 是否禁用增加按钮                                             | Boolean          | false   | true   |
| disableMinus  | 是否禁用减少按钮                                             | Boolean          | false   | true   |
| disableInput  | 是否禁用输入框                                               | Boolean          | true    | true   |
| beforeChange  | 输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise | Function         |         |        |
| showPlus      | 是否显示增加按钮                                             | Boolean          | true    | false  |
| showMinus     | 是否显示减少按钮                                             | Boolean          | true    | false  |
| showInput     | 是否显示输入框                                               | Boolean          | true    | false  |
| longPress     | 是否开启长按手势，开启后可以长按增加和减少按钮               | Boolean          | true    | false  |
| allowEmpty    | 是否允许输入的值为空，设置为 true 后允许传入空字符串         | Boolean          | false   | true   |
| themeName     | r-theme的主题名称                                            | String           | default |        |

### Events

| 名称         | 说明                   | 参数  |
| ------------ | ---------------------- | ----- |
| update:value | value值改变的回调      | value |
| change       | value值改变的回调      | value |
| plus         | 点击增加按钮时触发     | -     |
| minus        | 点击减少按钮时触发     | -     |
| overlimit    | 点击不可用的按钮时触发 | -     |

