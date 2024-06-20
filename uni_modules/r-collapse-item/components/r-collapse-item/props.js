export default {
  // 唯一标识符，默认为索引值
  name: {
    type: [String, Number],
  },
  //   标题栏左侧图标名称或图片链接，等同于 Icon 组件的 name 属性
  icon: {
    type: String,
  },
  //标题栏大小，可选值为 large
  size: {
    type: String,
  },
  //   标题栏左侧内容
  title: {
    type: [String, Number],
  },
  //   标题栏右侧内容
  value: {
    type: [String, Number],
  },
  //   标题栏描述信息
  label: {
    type: [String, Number],
  },
  //   是否显示内边框
  border: {
    type: Boolean,
    default: true,
  },
  //   是否展示标题栏右侧箭头并开启点击反馈
  isLink: {
    type: Boolean,
    default: true,
  },
  //   是否禁用面板
  disabled: {
    type: Boolean,
    default: false,
  },
  //   是否为只读状态，只读状态下无法操作面板
  readonly: {
    type: Boolean,
    default: false,
  },
  //   左侧标题额外类名
  titleClass: {
    type: String,
  },
  //   右侧内容额外类名
  valueClass: {
    type: String,
  },
  //   描述信息额外类名
  labelClass: {
    type: String,
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
