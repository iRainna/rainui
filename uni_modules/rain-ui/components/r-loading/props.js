export default {
  // 颜色
  color: {
    type: String,
    default: "#c9c9c9",
  },
  //类型，可选值为 spinner circular
  type: {
    type: String,
    default: "circular",
  },
  //加载图标大小，默认单位为 rpx
  size: {
    type: [String, Number],
    default: "60rpx",
  },
  //文字大小，默认单位为 rpx
  textSize: {
    type: [String, Number],
    default: "28rpx",
  },
  //文字颜色
  textColor: {
    type: String,
    default: "#c9c9c9",
  },
  //是否垂直排列图标和文字内容
  vertical: {
    type: Boolean,
    default: false,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
