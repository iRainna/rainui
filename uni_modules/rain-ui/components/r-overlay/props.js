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
	//自定义动画组件样式
	customTransitionStyle: {
		type: Object,
		default: () => {},
	},
	// 是否锁定背景滚动
	lockScroll: {
		type: Boolean,
		default: true,
	},
	//自定义类名
	customClass: {
		type: [String, Array, Object],
		default: "",
	},
	// 背景颜色
	color: {
		type: String,
		default: "",
	},
	//层级
	zIndex: {
		type: Number,
		default: 0,
	},
	//主题名称
	themeName:{
		type:String,
		default:'default'
	}
};