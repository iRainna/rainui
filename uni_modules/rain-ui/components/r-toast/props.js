export default {
  //提示类型，可选值为 success fail loading text
  type: {
    type: String,
    default: "text",
  },
  //位置，可选值为 top bottom middle
  position: {
    type: String,
    default: "middle",
  },
  //文本内容，支持通过\n换行
  message: {
    type: String,
    default: "",
  },
  //文本内容的换行方式 可选值为 normal break-all break-word
  wordBreak: {
    type: String,
    default: "break-all",
  },
  //自定义图标，支持传入图标名称或图片链接，等同于 Icon 组件的 name 属性
  icon: {
    type: String,
    default: "",
  },
  //图标大小，如 20px 2em，默认单位为 px
  iconSize: {
    type: String,
    default: "72rpx",
  },
  //图标类名前缀，等同于 Icon 组件的 prefix 属性
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  //是否显示背景遮罩层
  overlay: {
    type: Boolean,
    default: false,
  },
  //是否在点击后关闭
  closeOnClick: {
    type: Boolean,
    default: false,
  },
  //是否在点击遮罩层后关闭
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  //加载图标类型, 可选值为 spinner circular
  loadingType: {
    type: String,
    default: "circular",
  },
  //展示时长(ms)，值为 0 时，toast 不会消失
  duration: {
    type: Number,
    default: 3000,
  },
  //自定义类名
  customClass: {
    type: String,
    default: "",
  },
  //自定义样式
  customStyle: {
    type: Object,
    default: () => {},
  },
  //   自定义遮罩层类名
  overlayClass: {
    type: String,
    default: "",
  },
  //   自定义遮罩层样式
  overlayStyle: {
    type: Object,
    default: () => {},
  },
  //入场动画
  entryClass: {
    type: String,
    default: "animate__fadeIn",
  },
  //退场动画
  exitClass: {
    type: String,
    default: "animate__fadeOut",
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
