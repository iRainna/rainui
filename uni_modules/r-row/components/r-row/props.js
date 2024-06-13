export default {
  // 列元素之间的间距
  gutter: {
    type: String,
    default: "0rpx",
  },
  //主轴对齐方式，可选值为 flex-start flex-end center space-around space-between
  justify: {
    type: String,
    default: "flex-start",
  },
  // 交叉轴对齐方式，可选值为 flex-start center flex-bottom baseline
  align: {
    type: String,
    default: "flex-start",
  },
  //是否自动换行	boolean	true
  wrap: {
    type: Boolean,
    default: true,
  },
};
