export default {
  // 当前分值
  value: {
    type: Number,
  },
  //   图标总数
  count: {
    type: [Number, String],
    default: 5,
  },
  //   图标大小
  size: {
    type: [String],
    default: "40rpx",
  },
  //   图标间距
  gutter: {
    type: [String, Number],
    default: "8rpx",
  },
  //   选中时的颜色
  color: {
    type: [String],
    default: "#ee0a24",
  },
  //   未选中时的颜色
  voidColor: {
    type: [String],
    default: "#c8c9cc",
  },
  //   禁用时的颜色
  disabledColor: {
    type: [String],
    default: "#c8c9cc",
  },
  //   选中时的图标名称或图片链接，等同于 Icon 组件的 name 属性
  icon: {
    type: [String],
    default: "star",
  },
  //   未选中时的图标名称或图片链接，等同于 Icon 组件的 name 属性
  voidIcon: {
    type: [String],
    default: "star-o",
  },
  //   图标类名前缀，等同于 Icon 组件的 prefix 属性
  iconPrefix: {
    type: [String],
    default: "van-icon",
  },
  //   是否允许半选
  allowHalf: {
    type: Boolean,
    default: false,
  },
  //   是否允许再次点击后清除
  clearable: {
    type: Boolean,
    default: false,
  },
  //   是否为只读状态，只读状态下无法修改评分
  readonly: {
    type: Boolean,
    default: false,
  },
  //   是否禁用评分
  disabled: {
    type: Boolean,
    default: false,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
