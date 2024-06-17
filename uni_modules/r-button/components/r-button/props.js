/*
 * @Description:
 * @Author: iRainna
 * @Date: 2023-08-02 13:53:09
 * @LastEditTime: 2023-08-03 15:12:34
 * @FilePath: \iR-ui\uni_modules\iR-ui\components\button\props.js
 */
export default {
  // 类型，可选值为 primary success warning danger default
  type: {
    type: String,
    default: "default",
  },
  //尺寸，可选值为 large small mini normal
  size: {
    type: String,
    default: "normal",
  },
  // 按钮文字
  text: {
    type: String,
    default: "",
  },
  //按钮颜色，支持传入 linear-gradient 渐变色
  color: {
    type: String,
    default: "",
  },
  //   左侧图标名称或图片链接，等同于 Icon 组件的 name 属性
  icon: {
    type: String,
    default: "",
  },
  //图标类名前缀，等同于 Icon 组件的 prefix 属性
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  //图标展示位置，可选值为 right left
  iconPosition: {
    type: String,
    default: "left",
  },

  //是否为块级元素
  block: {
    type: Boolean,
    default: false,
  },
  //是否为朴素按钮
  plain: {
    type: Boolean,
    default: false,
  },
  //是否为方形按钮
  square: {
    type: Boolean,
    default: false,
  },
  //是否为圆形按钮
  round: {
    type: Boolean,
    default: false,
  },
  //是否禁用按钮
  disabled: {
    type: Boolean,
    default: false,
  },

  //   是否显示为加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  //   加载状态提示文字
  loadingText: {
    type: String,
    default: "",
  },
  //   加载图标类型，可选值为 spinner circular
  loadingType: {
    type: String,
    default: "circular",
  },
  //   加载图标大小，默认单位为 rpx
  loadingSize: {
    type: [Number, String],
    default: "40rpx",
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },

  // uniapp支持的
  // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
  formType: {
    type: String,
    default: "",
  },
  // 开放能力
  openType: {
    type: String,
    default: "",
  },
  // 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果    App-nvue 平台暂不支持
  hoverClass: {
    type: String,
    default: "",
  },
  // 按住后多久出现点击态，单位毫秒
  hoverStartTime: {
    type: Number,
    default: 0,
  },
  // 手指松开后点击态保留时间，单位毫秒
  hoverStayTime: {
    type: Number,
    default: 0,
  },
  // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效  微信小程序、QQ小程序
  appParameter: {
    type: String,
    default: "",
  },
  // 指定是否阻止本节点的祖先节点出现点击态  微信小程序
  hoverStopPropagation: {
    type: Boolean,
    default: false,
  },
  // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。 微信小程序
  lang: {
    type: String,
    default: "en",
  },
  // 会话来源，open-type="contact"时有效  微信小程序
  sessionFrom: {
    type: String,
    default: "",
  },
  // 会话内消息卡片标题，open-type="contact"时有效	 微信小程序
  sendMessageTitle: {
    type: String,
    default: "",
  },
  // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效  微信小程序
  sendMessagePath: {
    type: String,
    default: "",
  },
  // 会话内消息卡片图片，open-type="contact"时有效	 微信小程序
  sendMessageImg: {
    type: String,
    default: "",
  },
  // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 微信小程序
  showMessageCard: {
    type: Boolean,
    default: false,
  },
  // 打开群资料卡时，传递的群号  open-type="openGroupProfile"时生效  QQ小程序
  groupId: {
    type: String,
    default: "",
  },
  // 打开频道页面时，传递的频道号  open-type="openGuildProfile"时生效  QQ小程序
  guildId: {
    type: String,
    default: "",
  },

  // 打开公众号资料卡时，传递的号码  open-type="openPublicProfile"时生效  QQ小程序
  publicId: {
    type: String,
    default: "",
  },
  // 客服的抖音号   open-type="im"时生效  抖音小程序2.68.0版本+
  dataImId: {
    type: String,
    default: "",
  },
  // IM卡片类型   open-type="im"时生效  抖音小程序2.80.0版本+
  dataImType: {
    type: String,
    default: "",
  },
  // 商品的id，仅支持泛知识课程库和生活服务商品库中的商品   open-type="im"时生效  抖音小程序2.80.0版本+
  dataGoodsId: {
    type: String,
    default: "",
  },

  // 订单的id，仅支持交易2.0订单   open-type="im"时生效  抖音小程序2.80.0版本+
  dataOrderId: {
    type: String,
    default: "",
  },
  // 商品类型，“1”代表生活服务，“2”代表泛知识   open-type="im"时生效  抖音小程序2.80.0版本+
  dataBizLine: {
    type: String,
    default: "",
  },
};
