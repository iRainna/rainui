export default {
  //加载动画的显隐
  show: {
    type: Boolean,
    default: false,
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
  //持续时间
  duration: {
    type: Number,
    default: 1000,
  },
  //延迟时间
  delay: {
    type: Number,
    default: 0,
  },
  //自定义样式
  customStyle: {
    type: Object,
    default: () => {},
  },
  //自定义类名
  customClass: {
    type: String,
    default: "",
  },
  // 图片资源地址
  src: {
    type: String,
    default: "",
  },
  // 图片裁剪、缩放的模式
  mode: {
    type: String,
    default: "scaleToFill",
  },
  // 图片懒加载。只针对page与scroll-view下的image有效 微信小程序、百度小程序、抖音小程序、飞书小程序有效
  lazyLoad: {
    type: Boolean,
    default: false,
  },
  //在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源。  微信小程序2.9.0
  webp: {
    type: Boolean,
    default: false,
  },
  //开启长按图片显示识别小程序码菜单  微信小程序2.7.0
  showMenuByLongpress: {
    type: Boolean,
    default: false,
  },
  //是否能拖动图片 H5 3.1.1+、App（iOS15+）
  draggable: {
    type: Boolean,
    default: false,
  },
  //自定义样式
  customStyle: {
    type: Object,
    default: () => {},
  },
  // 宽度
  width: {
    type: String,
    default: "",
  },
  //高度
  height: {
    type: String,
    default: "",
  },
  //是否显示为圆形
  round: {
    type: Boolean,
    default: false,
  },
  //圆角大小，
  radius: {
    type: String,
    default: "",
  },
  // 是否将根节点设置为块级元素，默认情况下为 inline-block 元素
  block: {
    type: Boolean,
    default: true,
  },
  // 是否展示图片加载失败提示
  showError: {
    type: Boolean,
    default: true,
  },
  //是否展示图片加载中提示
  showLoading: {
    type: Boolean,
    default: true,
  },
  //失败时提示的图标名称或图片链接，等同于 Icon 组件的 name 属性
  errorIcon: {
    type: String,
    default: "icon-warning-circle",
  },
  //加载时提示的图标名称或图片链接，等同于 Icon 组件的 name 属性
  loadingIcon: {
    type: String,
    default: "icon-image",
  },
  //加载图标和失败图标的大小
  iconSize: {
    type: String,
    default: "64rpx",
  },
  //图标类名前缀，等同于 Icon 组件的 class-prefix 属性
  iconPrefix: {
    type: String,
    default: "iconfont",
  },
  //图标颜色
  iconColor: {
    type: String,
    default: "",
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
