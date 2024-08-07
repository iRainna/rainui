export default {
  // 标题
  title: {
    type: [String],
  },
  //   是否在标题右上角显示小红点
  dot: {
    type: Boolean,
    default: false,
  },
  //   是否禁用标签
  disabled: {
    type: Boolean,
    default: false,
  },
  //   图标右上角徽标的内容
  badge: {
    type: [String, Number],
  },
  //   标签名称，作为匹配的标识符
  name: {
    type: [String, Number],
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
  //   当 badge 为数字 0 时，是否展示徽标
  showZeroBadge: {
    type: Boolean,
    default: true,
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
