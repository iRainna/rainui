export default {
  // 已上传的文件列表
  value: {
    type: Array,
    default: () => [],
  },
  //   允许上传的文件类型   接受的文件类型，file只支持H5（只有微信小程序才支持把accept配置为all、media）
  accept: {
    type: String,
    default: "image",
  },
  // 图片或视频拾取模式，当accept为image类型时，设置capture为camera可以直接调起摄像头
  capture: {
    type: [String, Array],
    default: ["album", "camera"],
  },
  // 当accept为video时生效，是否压缩视频，默认为true
  compressed: {
    type: Boolean,
    default: true,
  },
  // 当accept为video时生效，可选值为back或front
  camera: {
    type: String,
    default: "back",
  },
  // original 原图，compressed 压缩图，默认二者都有，H5无效
  sizeType: {
    type: Array,
    default: () => ["original", "compressed"],
  },
  // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
  maxDuration: {
    type: Number,
    default: 60,
  },
  //   标识符，通常为一个唯一的字符串或数字，可以在回调函数的第二项参数中获取
  name: {
    type: [Number, String],
    default: "",
  },
  //   预览图和上传区域的尺寸，默认单位为 px
  previewSize: {
    type: [String, Number, Array],
    default: "160rpx",
  },
  //   是否在上传完成后展示预览图
  previewImage: {
    type: Boolean,
    default: true,
  },
  //   是否在点击预览图后展示全屏图片预览
  previewFullImage: {
    type: Boolean,
    default: true,
  },
  //   是否开启图片多选
  multiple: {
    type: Boolean,
    default: false,
  },
  //   是否禁用文件上传
  disabled: {
    type: Boolean,
    default: false,
  },
  //   是否将上传区域设置为只读状态
  readonly: {
    type: Boolean,
    default: false,
  },
  //   是否展示删除按钮
  deletable: {
    type: Boolean,
    default: true,
  },
  //   是否开启覆盖上传，开启后会关闭图片预览
  reupload: {
    type: Boolean,
    default: false,
  },
  //   是否展示上传区域
  showUpload: {
    type: Boolean,
    default: true,
  },
  //   文件读取完成后的回调函数
  afterRead: {
    type: Function,
  },

  //文件读取前的回调函数，返回 false 可终止文件读取， 支持返回 Promise
  beforeRead: {
    type: Function,
  },

  //   文件大小限制，单位为 byte
  maxSize: {
    type: [Number, String, Function],
    default: 2 * 1024 * 1024,
  },
  //   文件上传数量限制
  maxCount: {
    type: [Number],
    default: 5,
  },

  //   上传区域文字提示
  uploadText: {
    type: String,
    default: "",
  },
  //   预览图裁剪模式，可选值见 Image 组件
  imageFit: {
    type: String,
    default: "cover",
  },
  //   上传区域图标名称，等同于 Icon 组件的 name 属性
  uploadIcon: {
    type: String,
    default: "photograph",
  },
  //   上传区域图标的前缀类名，等同于 Icon 组件的 prefix 属性
  uploadIconPrefix: {
    type: String,
    default: "van-icon",
  },
  //r-theme的主题名称
  themeName: {
    type: String,
    default: "default",
  },
};
