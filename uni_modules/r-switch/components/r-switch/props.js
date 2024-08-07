export default {
  // 开关选中状态
  value: {
    default: false,
  },
  // 是否为加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  //   是否为禁用状态
  disabled: {
    type: Boolean,
    default: false,
  },
  //   开关按钮的尺寸
  size: {
    type: String,
    default: "52rpx",
  },
  activeColor: {
    type: String,
    default: "#1989fa",
  },
  inactiveColor: {
    type: String,
    default: "rgba(120, 120, 128, 0.16)",
  },
  activeValue: {
    default: true,
  },
  inactiveValue: {
    default: false,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
