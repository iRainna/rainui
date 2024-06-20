export default {
  // 绑定当前选中标签的标识符
  active: {
    type: [Number, String],
    default: 0,
  },
  //   样式风格类型，可选值为 card
  type: {
    type: String,
    default: "line",
  },
  //   标签主题色
  color: {
    type: String,
    default: "#1989fa",
  },
  //   标签栏背景色
  background: {
    type: String,
    default: "var(--r-tabs-nav-background)",
  },
  //   动画时间，单位毫秒，设置为 0 可以禁用动画
  duration: {
    type: [Number, String],
    default: 300,
  },
  //   底部条宽度
  lineWidth: {
    type: String,
    default: "80rpx",
  },
  //   底部条高度
  lineHeight: {
    type: String,
    default: "6rpx",
  },
  //   是否开启切换标签内容时的转场动画
  animated: {
    type: Boolean,
    default: false,
  },
  //   是否显示标签栏外边框，仅在 type="line" 时有效
  border: {
    type: Boolean,
    default: false,
  },
  //   是否省略过长的标题文字
  ellipsis: {
    type: Boolean,
    default: true,
  },
  //   是否使用粘性布局
  sticky: {
    type: Boolean,
    default: false,
  },
  //   是否开启左侧收缩布局
  shrink: {
    type: Boolean,
    default: false,
  },

  //   滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动
  swipeThreshold: {
    type: Number,
    default: 5,
  },

  //   切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise
  beforeChange: {
    type: Function,
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
