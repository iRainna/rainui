export default {
  value: {
    type: Boolean,
    default: false,
  },
  name: {
    default: "",
  },
  shape: {
    type: String,
    default: "square",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  labelDisabled: {
    type: Boolean,
    default: false,
  },
  labelPosition: {
    type: String,
    default: "right",
  },
  iconSize: {
    type: String,
    default: "40rpx",
  },
  checkedColor: {
    type: String,
    default: "#1989fa",
  },
  bindGroup: {
    type: Boolean,
    default: true,
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
