export default {
  // 选中项的值
  value: {
    type: [String, Number],
  },
  //   顶部标题
  title: {
    type: String,
  },
  //   可选项数据源
  options: {
    type: Array,
    default: () => [],
  },
  //   未选中时的提示文案
  placeholder: {
    type: String,
    default: "请选择",
  },
  //   选中状态的高亮颜色
  activeColor: {
    type: String,
    default: "#1989fa",
  },
  //   是否开启手势左右滑动切换
  swipeable: {
    type: Boolean,
    default: true,
  },

  //   是否显示关闭图标
  closeable: {
    type: Boolean,
    default: true,
  },
  //   是否展示标题栏
  showHeader: {
    type: Boolean,
    default: true,
  },
  //   关闭图标名称或图片链接，等同于 Icon 组件的 name 属性
  closeIcon: {
    type: String,
    default: "cross",
  },

  //   自定义 options 结构中的字段
  fieldNames: {
    type: Object,
    default: () => ({
      text: "text",
      value: "value",
      children: "children",
    }),
  },
  //是否显示
  show: {
    type: Boolean,
    default: true,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
