export default {
  //icon名称
  name: {
    type: String,
    default: "",
  },
  //大小
  size: {
    type: String,
    default: "",
  },
  //颜色
  color: {
    type: String,
    default: "",
  },
  //自定义样式
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  //自定义类名
  customClass: {
    type: String,
    default: "",
  },
  //前缀类名
  prefix: {
    type: String,
    default: "van-icon",
  },
  //指定按下去的样式类。
  hoverClass: {
    type: String,
    default: "",
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
  //持续时间
  duration: {
    type: Number,
    default: 1000,
  },
  //延迟时间
  delay: {
    type: Number,
    default: 0,
  },
};