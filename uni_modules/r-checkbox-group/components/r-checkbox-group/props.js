export default {
  // 所有选中项的标识符
  value: {
    type: Array,
    default: () => [],
  },
  //   是否禁用所有复选框
  disabled: {
    type: Boolean,
    default: false,
  },
  //   排列方向，可选值为 horizontal
  direction: {
    type: String,
    default: "vertical",
  },
  //   所有复选框的图标大小
  iconSize: {
    type: String,
    default: "40rpx",
  },
  //   所有复选框的选中状态颜色
  checkedColor: {
    type: String,
    default: "#1989fa",
  },
  //   形状，可选值为 round
  shape: {
    type: String,
    default: "square",
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
