export default {
  // 当前页码
  value: {
    type: Number,
    default: 1,
  },
  //   显示模式，可选值为 simple
  mode: {
    type: String,
    default: "multi",
  },
  //   上一页按钮文字
  prevText: {
    type: String,
    default: "上一页",
  },
  //   下一页按钮文字
  nextText: {
    type: String,
    default: "下一页",
  },
  //   总页数
  pageCount: {
    type: [String, Number],
  },
  //   总记录数
  totalItems: {
    type: [String, Number],
    default: 0,
  },
  //   每页记录数
  itemsPerPage: {
    type: [String, Number],
    default: 10,
  },
  //   显示的页码个数
  showPageSize: {
    type: [String, Number],
    default: 5,
  },
  //   是否显示省略号
  forceEllipses: {
    type: Boolean,
    default: false,
  },
  //   是否展示上一页按钮
  showPrevButton: {
    type: Boolean,
    default: true,
  },
  //   是否展示下一页按钮
  showNextButton: {
    type: Boolean,
    default: true,
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
