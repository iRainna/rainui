export default {
  // 当前输入的值
  value: {
    default: "",
  },
  //   最小值
  min: {
    type: Number,
    default: 1,
  },
  //   最大值
  max: {
    type: Number,
    default: 999,
  },
  //   是否自动校正超出限制范围的数值，设置为 false 后输入超过限制范围的数值将不会自动校正
  autoFixed: {
    type: Boolean,
    default: true,
  },
  //   初始值
  defaultValue: {
    type: [String, Number],
    default: 1,
  },
  //   步长，每次点击时改变的值
  step: {
    type: [String, Number],
    default: 1,
  },
  //   标识符，通常为一个唯一的字符串或数字，可以在 change 事件回调参数中获取
  name: {
    type: [String, Number],
  },
  //   输入框宽度
  inputWidth: {
    type: String,
    default: "64rpx",
  },
  //   按钮大小以及输入框高度
  buttonSize: {
    type: String,
    default: "56rpx",
  },
  //   固定显示的小数位数
  decimalLength: {
    type: Number,
  },
  //   样式风格，可选值为 round
  theme: {
    type: String,
  },
  //   输入框占位提示文字
  placeholder: {
    type: String,
  },
  //   是否只允许输入整数
  integer: {
    type: Boolean,
    default: true,
  },
  //   是否禁用步进器
  disabled: {
    type: Boolean,
    default: false,
  },
  //   是否禁用增加按钮
  disablePlus: {
    type: Boolean,
    default: false,
  },
  //   是否禁用减少按钮
  disableMinus: {
    type: Boolean,
    default: false,
  },
  //   是否禁用输入框
  disableInput: {
    type: Boolean,
    default: false,
  },
  //   输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise
  beforeChange: {
    type: Function,
    // default: () => {},
  },
  //   是否显示增加按钮
  showPlus: {
    type: Boolean,
    default: true,
  },
  //   是否显示减少按钮
  showMinus: {
    type: Boolean,
    default: true,
  },
  //   是否显示输入框
  showInput: {
    type: Boolean,
    default: true,
  },
  //   是否开启长按手势，开启后可以长按增加和减少按钮
  longPress: {
    type: Boolean,
    default: true,
  },
  //   是否允许输入的值为空，设置为 true 后允许传入空字符串
  allowEmpty: {
    type: Boolean,
    default: false,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
