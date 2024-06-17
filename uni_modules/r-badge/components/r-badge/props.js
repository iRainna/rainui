export default {
  // 徽标内容
  content: {
    type: [String, Number],
  },
  //   徽标背景颜色
  color: {
    type: [String],
    default: "#ee0a24",
  },
  //   是否展示为小红点
  dot: {
    type: Boolean,
    default: false,
  },
  //   最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效
  max: {
    type: [String, Number],
  },
  //   设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px
  offset: {
    type: Array,
  },
  //   当 content 为数字 0 或字符串 '0' 时，是否展示徽标
  showZero: {
    type: Boolean,
    default: true,
  },
  //   徽标位置，可选值为 top-left bottom-left bottom-right
  position: {
    type: [String],
    default: "top-right",
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
