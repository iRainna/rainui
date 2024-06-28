export default {
  // 当前输入的值
  value: {
    // type: [Number, String,Boolean],
    default: "",
  },
  //   输入框左侧文本
  label: {
    type: String,
    default: "",
  },
  //   名称，作为提交表单时的标识符
  name: {
    type: String,
    default: "",
  },
  //   输入框 id，同时会设置 label 的 for 属性
  id: {
    type: String,
    default: "van-field-n-input",
  },
  //   输入框类型, 支持 text number idcard digit tel password safe-password	 nickname
  type: {
    type: String,
    default: "text",
  },
  //   大小，可选值为 large normal
  size: {
    type: String,
    default: "normal",
  },
  //   输入的最大字符数
  maxlength: {
    type: [Number, String],
    default: "",
  },
  //   输入框占位提示文字
  placeholder: {
    type: String,
    default: "",
  },
  //   是否显示内边框
  border: {
    type: Boolean,
    default: true,
  },
  //   是否禁用输入框
  disabled: {
    type: Boolean,
    default: false,
  },
  //   是否为只读状态，只读状态下无法输入内容
  readonly: {
    type: Boolean,
    default: false,
  },
  //   是否在 label 后面添加冒号
  colon: {
    type: Boolean,
    default: false,
  },
  //   是否显示表单必填星号
  required: {
    type: Boolean,
    default: false,
  },
  //   是否使内容垂直居中
  center: {
    type: Boolean,
    default: false,
  },
  //   是否启用清除图标，点击清除图标后会清空输入框
  clearable: {
    type: Boolean,
    default: false,
  },
  //   清除图标名称或图片链接，等同于 Icon 组件的 name 属性
  clearIcon: {
    type: String,
    default: "icon-close-circle",
  },
  //   显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
  clearTrigger: {
    type: Function,
    default: () => {},
  },
  //   是否开启点击反馈
  clickable: {
    type: Boolean,
    default: false,
  },
  //   是否展示右侧箭头并开启点击反馈
  isLink: {
    type: Boolean,
    default: false,
  },
  //   是否自动聚焦，iOS 系统不支持该属性
  autofocus: {
    type: Boolean,
    default: false,
  },
  //   是否显示字数统计，需要设置 maxlength 属性
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  //   是否将输入内容标红
  error: {
    type: Boolean,
    default: false,
  },
  //   底部错误提示文案，为空时不展示
  errorMessage: {
    type: String,
    default: "",
  },
  //   错误提示文案对齐方式，可选值为 center right left
  errorMessageAlign: {
    type: String,
    default: "left",
  },
  //   输入内容格式化函数
  formatter: {
    type: Function,
    default: () => {},
  },
  //   格式化函数触发的时机，可选值为 onBlur onChange
  formatTrigger: {
    type: String,
    default: "",
  },
  //   箭头方向，可选值为 left up down right
  arrowDirection: {
    type: String,
    default: "right",
  },
  //   左侧文本额外类名
  labelClass: {
    type: String,
    default: "",
  },
  //   左侧文本宽度
  labelWidth: {
    type: String,
    default: "6.2em",
  },
  //   左侧文本对齐方式，可选值为 center right top left
  labelAlign: {
    type: String,
    default: "left",
  },
  //   输入框对齐方式，可选值为 center right left
  inputAlign: {
    type: String,
    default: "left",
  },
  //   是否自适应内容高度，只对 textarea 有效，可传入对象,如 { maxHeight: 100, minHeight: 50 }，单位为px
  autosize: {
    type: [Boolean, Object],
    default: false,
  },
  //   左侧图标名称或图片链接，等同于 Icon 组件的 name 属性
  leftIcon: {
    type: String,
    default: "icon-edit-square",
  },
  //   右侧图标名称或图片链接，等同于 Icon 组件的 name 属性
  rightIcon: {
    type: String,
    default: "",
  },
  //   图标类名前缀，等同于 Icon 组件的 class-prefix 属性
  iconPrefix: {
    type: String,
    default: "iconfont",
  },
  //   表单校验规则，详见 Form 组件
  rules: {
    type: [Array, Object],
    default: () => [],
  },

  // 设置键盘右下角按钮的文字，仅在 type="text" 时生效。有效值 send search next go done 微信小程序、App、H5、快手小程序、京东小程序
  confirmType: {
    type: String,
    default: "done",
  },
  // 点击键盘右下角按钮时是否保持键盘不收起  App(3.3.7+)、H5 (3.3.7+)、微信小程序、支付宝小程序、百度小程序、QQ小程序、京东小程序
  confirmHold: {
    type: Boolean,
    default: false,
  },
  // 指定focus时的光标位置
  cursor: {
    type: Number,
    // default: 0,
  },
  // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
  selectionStart: {
    type: Number,
    default: -1,
  },
  // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
  selectionEnd: {
    type: Number,
    default: -1,
  },
  // 键盘弹起时，是否自动上推页面  App-Android（vue 页面 softinputMode 为 adjustResize 时无效，使用 x5 内核时无效）、微信小程序、百度小程序、QQ小程序、京东小程序
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  // 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离     App、微信小程序、百度小程序、QQ小程序、京东小程序
  cursorSpacing: {
    type: Number,
    default: 0,
  },
  // 键盘收起时，是否自动失去焦点    App-Vue 3.0.0+
  autoBlur: {
    type: Boolean,
    default: false,
  },
  // 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件  App-vue (3.4.4+)、H5 (3.4.4+)、App-nvue不支持
  ignoreCompositionEvent: {
    type: Boolean,
    default: true,
  },
  // 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效) 微信小程序 2.10.4+
  alwaysEmbed: {
    type: Boolean,
    default: false,
  },
  // focus时，点击页面的时候不收起键盘  微信小程序 2.8.2+
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  // 安全键盘加密公钥的路径，只支持包内路径   微信小程序 2.18.0+
  safePasswordCertPath: {
    type: String,
    // default: "",
  },
  // 安全键盘输入密码长度	 微信小程序 2.18.0+
  safePasswordLength: {
    type: Number,
    // default: 0,
  },
  // 安全键盘加密时间戳	 微信小程序 2.18.0+
  safePasswordTimeStamp: {
    type: Number,
    // default: 0,
  },
  // 安全键盘加密盐值	  微信小程序 2.18.0+
  safePasswordNonce: {
    type: String,
    // default: "",
  },
  // 安全键盘计算 hash 盐值，若指定custom-hash 则无效    微信小程序 2.18.0+
  safePasswordSalt: {
    type: String,
  },
  // 安全键盘计算 hash 的算法表达式，如 md5(sha1('foo' + sha256(sm3(password + 'bar'))))  微信小程序 2.18.0+
  safePasswordCustomHash: {
    type: String,
  },
  // 当 type 为 number, digit, idcard 数字键盘是否随机排列    支付宝小程序 1.9.0+
  randomNumber: {
    type: Boolean,
    default: false,
  },
  // 是否为受控组件。为 true 时，value 内容会完全受 setData 控制   支付宝小程序 1.9.0+
  controlled: {
    type: Boolean,
    default: false,
  },
  // 是否强制使用系统键盘和 Web-view 创建的 input 元素。为 true 时，confirm-type、confirm-hold 可能失效    支付宝小程序 2.7.3+
  alwaysSystem: {
    type: Boolean,
    default: false,
  },
  // 是一个枚举属性，它提供了用户在编辑元素或其内容时可能输入的数据类型的提示。none text decimal numeric tel search email url      H5（3.6.16+）、App-vue（3.6.16+）
  inputmode: {
    type: String,
    default: "text",
  },
};
