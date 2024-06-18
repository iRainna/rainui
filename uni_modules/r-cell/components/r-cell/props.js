export default {
  // 左侧标题
  title: {
    type: String,
    default: "",
  },
  // 右侧内容
  value: {
    type: String,
    default: "",
  },
  //   标题下方的描述信息
  label: {
    type: String,
    default: "",
  },
  //   单元格大小，可选值为 large normal
  size: {
    type: String,
    default: "",
  },
  //   左侧图标名称或图片链接，等同于 Icon 组件的 name 属性
  icon: {
    type: String,
    default: "",
  },
  //   图标类名前缀，等同于 Icon 组件的 class-prefix 属性
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  //   是否显示内边框
  border: {
    type: Boolean,
    default: true,
  },
  //   是否开启点击反馈
  clickable: {
    type: Boolean,
    default: false,
  },
  //反馈的动画类
  hoverClass: {
    type: String,
    default: "animate__fadeIn",
  },
  //   是否展示右侧箭头并开启点击反馈
  isLink: {
    type: Boolean,
    default: false,
  },
  //   是否显示表单必填星号
  required: {
    type: Boolean,
    default: false,
  },
  //   是否使内容垂直居中
  center: {
    type: Boolean,
    default: false,
  },
  //   箭头方向，可选值为 left up down right
  arrowDirection: {
    type: String,
    default: "right",
  },
  //   左侧标题额外样式
  titleStyle: {
    type: Object,
    default: () => {},
  },
  //   左侧标题额外类名
  titleClass: {
    type: [String],
    default: "",
  },
  //   右侧内容额外类名
  valueClass: {
    type: [String],
    default: "",
  },
  //   描述信息额外类名
  labelClass: {
    type: String,
    default: "",
  },
  //自定义类
  customClass: {
    type: String,
    default: "",
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
