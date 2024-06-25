export default {
  // 当前选中项对应的值
  value: {
    type: Array,
    default: () => [],
  },
  //   对象数组，配置每一列显示的数据
  columns: {
    type: Array,
    default: () => [],
  },
  //   自定义 columns 结构中的字段
  columnsFieldNames: {
    type: Object,
    default: () => ({
      text: "text",
      value: "value",
      children: "children",
    }),
  },
  //   顶部栏标题
  title: {
    type: String,
    default: "",
  },
  //   确认按钮文字，设置为空字符串可以隐藏按钮
  confirmButtonText: {
    type: String,
    default: "确认",
  },
  //   取消按钮文字，设置为空字符串可以隐藏按钮
  cancelButtonText: {
    type: String,
    default: "取消",
  },
  //   顶部栏位置 可选值为 bottom
  toolbarPosition: {
    type: String,
    default: "top",
  },
  //   是否显示加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  //   是否为只读状态，只读状态下无法切换选项
  readonly: {
    type: Boolean,
    default: false,
  },
  //   是否显示顶部栏
  showToolbar: {
    type: Boolean,
    default: true,
  },
  // 选项高度
  optionHeight: {
    type: String,
    default: "44px",
  },
  //   可见的选项个数
  visibleOptionNum: {
    type: Number,
    default: 6,
  },
  //   快速滑动时惯性滚动的时长，单位 ms
  swipeDuration: {
    type: Number,
    default: 1000,
  },
};
