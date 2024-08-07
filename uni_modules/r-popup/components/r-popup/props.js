/*
 * @Description:
 * @Author: iRainna
 * @Date: 2023-08-02 11:22:07
 * @LastEditTime: 2023-09-11 17:43:10
 * @FilePath: \i-r-ui\uni_modules\iR-ui\components\popup\props.js
 */
export default {
  // 是否显示弹出层
  show: {
    type: Boolean,
    default: false,
  },
  //   是否显示遮罩层
  overlay: {
    type: Boolean,
    default: true,
  },
  //   弹出位置，可选值为 top bottom right left center
  position: {
    type: String,
    default: "center",
  },
  //自定义遮罩层类名
  overlayClass: {
    type: [String, Object, Array],
    default: "",
  },
  //   自定义遮罩层样式
  overlayStyle: {
    type: Object,
    default: () => {},
  },
  //动画时长，单位毫秒，设置为 0 可以禁用动画
  duration: {
    type: Number,
    default: 300,
  },
  //   将弹窗的 z-index 层级设置为一个固定值
  zIndex: {
    type: Number,
    default: 2000,
  },
  // 是否显示圆角
  round: {
    type: Boolean,
    default: false,
  },
  // 是否锁定背景滚动
  lockScroll: {
    type: Boolean,
    default: true,
  },
  // 是否在点击遮罩层后关闭
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  // 是否显示关闭图标
  closeable: {
    type: Boolean,
    default: false,
  },
  // 关闭图标名称或图片链接，等同于 Icon 组件的 name 属性
  closeIcon: {
    type: String,
    default: "cross",
  },
  // 关闭图标位置，可选值为 top-left bottom-left bottom-right top-right
  closeIconPosition: {
    type: String,
    default: "top-right",
  },

  // 图标类名前缀，等同于 Icon 组件的 prefix 属性
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  // 是否开启顶部安全区适配
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  // 是否开启底部安全区适配
  safeAreaInsetBottom: {
    type: Boolean,
    default: false,
  },
  //自定义样式
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  //自定义类
  customClass: {
    type: String,
    default: "",
  },

  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
