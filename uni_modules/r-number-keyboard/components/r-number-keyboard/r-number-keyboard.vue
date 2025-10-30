<template>
	<r-popup
		v-model:show="open"
		:zIndex="zIndex"
		position="bottom"
		style="--r-popup-round-radius: 0"
		:overlayStyle="{
			backgroundColor: 'transparent'
		}"
		:closeOnClickOverlay="hideOnClickOutside"
		:customStyle="{
			backgroundColor: 'transparent',
			paddingLeft: 0,
			paddingRight: 0,
			paddingTop: 0,
			paddingBottom: 0
		}"
	>
		<view
			:style="{
				...getComponentThemeStyle,
				paddingBottom: safeAreaInsetBottom ? safeBottom + 'px' : 0
			}"
			class="r-number-keyboard"
		>
			<!-- renderTitle -->
			<view v-if="title || (closeButtonText && theme === 'default') || $slots.titleLeft" class="r-number-keyboard__header">
				<text class="r-number-keyboard__title-left" v-if="$slots.titleLeft">
					<slot name="titleLeft"></slot>
				</text>
				<view v-if="title" class="r-number-keyboard__title">{{ title }}</view>
				<button class="r-number-keyboard__close r-haptics-feedback" v-if="closeButtonText && theme === 'default'" @click="onClose">
					{{ closeButtonText }}
				</button>
			</view>
			<view class="r-number-keyboard__body">
				<view class="r-number-keyboard__keys">
					<!-- renderKeys -->
					<r-number-keyboard-key
						v-for="key in keys"
						:key="key.text"
						:type="key.type"
						:wider="key.wider"
						:color="key.color"
						:text="key.text"
						:boxWidth="keysWidth"
						@press="onPress"
					>
						<text v-if="key.text || key.text === 0 || key.show">{{ key.text }}</text>
						<r-icon v-else-if="key.type == 'delete' && !$slots.delete" prefix="other" name="icon-delete" size="32px"></r-icon>
						<slot v-else-if="key.type == 'delete' && $slots.delete" name="delete"></slot>
						<r-icon v-else-if="key.type == 'extra' && !$slots.extraKey" prefix="other" name="icon-keyboard-hide" size="30px"></r-icon>
						<slot v-else-if="key.type == 'extra' && $slots.extraKey" name="extraKey"></slot>
					</r-number-keyboard-key>
				</view>
				<!-- renderSidebar -->
				<view class="r-number-keyboard__sidebar" v-if="theme === 'custom'">
					<r-number-keyboard-key large type="delete" @press="onPress" :boxHeight="sidebarHeight / (closeButtonText ? 2 : 1)" :boxWidth="sidebarWidth">
						<text v-if="deleteButtonText">{{ deleteButtonText }}</text>
						<r-icon v-else-if="!$slots.delete" prefix="other" name="icon-delete" size="32px"></r-icon>
						<slot v-else-if="$slots.delete" name="delete"></slot>
					</r-number-keyboard-key>

					<r-number-keyboard-key
						v-if="closeButtonText"
						large
						type="close"
						color="blue"
						:loading="closeButtonLoading"
						:boxHeight="sidebarHeight / (closeButtonText ? 2 : 1)"
						:boxWidth="sidebarWidth"
						@press="onPress"
					>
						<text>{{ closeButtonText }}</text>
					</r-number-keyboard-key>
				</view>
			</view>
		</view>
	</r-popup>
</template>
<script setup>
import { GetRect, getSystemInfo } from '@/uni_modules/r-utils-common/js_sdk/index.js';
import { ref, computed, inject, watch, getCurrentInstance, onMounted, nextTick } from 'vue';
import RNumberKeyboardKey from './r-number-keyboard-key.vue';
import { getComponentThemeCssVar } from '@/uni_modules/r-theme-base/js_sdk/useComponentTheme.js';
import { datas } from '../themes/index.js';
import { CONFIG_PROVIDER_KEY } from '@/uni_modules/r-utils-constant/js_sdk/index.js';

const { proxy } = getCurrentInstance();
const props = defineProps({
	// 当前输入值
	value: {
		type: String,
		default: ''
	},
	// 是否显示键盘
	show: {
		type: Boolean,
		default: false
	},
	//   键盘标题
	title: {
		type: String,
		default: ''
	},
	//   样式风格，可选值为 custom
	theme: {
		type: String,
		default: 'default'
	},
	//输入值最大长度
	maxlength: {
		type: [Number, String],
		default: Infinity
	},
	//键盘 z-index 层级
	zIndex: {
		type: [Number, String],
		default: 100
	},
	//   底部额外按键的内容
	extraKey: {
		type: [String, Array],
		default: ''
	},
	//   关闭按钮文字，空则不展示
	closeButtonText: {
		type: [String],
		default: ''
	},
	//   删除按钮文字，空则展示删除图标
	deleteButtonText: {
		type: [String],
		default: ''
	},
	//   是否将关闭按钮设置为加载中状态，仅在 theme="custom" 时有效
	closeButtonLoading: {
		type: Boolean,
		default: false
	},
	// 是否展示删除图标
	showDeleteKey: {
		type: Boolean,
		default: true
	},
	// 是否在点击关闭按钮时触发 blur 事件
	blurOnClose: {
		type: Boolean,
		default: true
	},
	// 是否在点击外部时收起键盘
	hideOnClickOutside: {
		type: Boolean,
		default: true
	},
	// 是否开启底部安全区适配
	safeAreaInsetBottom: {
		type: Boolean,
		default: true
	},
	// 是否将通过随机顺序展示按键
	randomKeyOrder: {
		type: Boolean,
		default: false
	},
	themeName: {
		type: String,
		default: 'default'
	}
});
const emit = defineEmits(['update:show', 'update:value', 'close', 'blur', 'input', 'delete']);
const open = computed({
	set(value) {
		emit('update:show', value);
	},
	get() {
		return props.show;
	}
});
const componentsName = 'r-number-keyboard';

const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
	let themeName = props.themeName;

	if (themeInject?.value?.themeName) {
		//传递过来的有就用传递了
		themeName = themeInject?.value?.themeName;
	}

	if (props.themeName != 'default') {
		//单独设置了组件的 就用单独设置的
		themeName = props.themeName;
	}

	return {
		...getComponentThemeCssVar(themeName, 'r-base', datas.value),
		...getComponentThemeCssVar(themeName, componentsName, datas.value)
	};
});
// const getComponentThemeStyle = computed(() => useComponentThemeStyle(props.themeName, componentsName));
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
const genBasicKeys = () => {
	const keys = Array(9)
		.fill('')
		.map((_, i) => ({ text: i + 1 }));

	if (props.randomKeyOrder) {
		shuffle(keys);
	}

	return keys;
};
const genDefaultKeys = () => [
	...genBasicKeys(),
	{ text: props.extraKey, type: 'extra' },
	{ text: 0 },
	{
		text: props.showDeleteKey ? props.deleteButtonText : '',
		type: props.showDeleteKey ? 'delete' : ''
	}
];
const genCustomKeys = () => {
	const keys = genBasicKeys();
	const { extraKey } = props;
	const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

	if (extraKeys.length === 0) {
		keys.push({ text: 0, wider: true });
	} else if (extraKeys.length === 1) {
		keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra', show: true });
	} else if (extraKeys.length === 2) {
		keys.push({ text: extraKeys[0], type: 'extra', show: true }, { text: 0 }, { text: extraKeys[1], type: 'extra', show: true });
	}

	return keys;
};

const keys = computed(() => (props.theme === 'custom' ? genCustomKeys() : genDefaultKeys()));
const onBlur = () => {
	if (props.show) {
		emit('blur');
		emit('update:show', false);
	}
};
const onClose = () => {
	emit('close');

	if (props.blurOnClose) {
		onBlur();
	}
};

const onPress = (text, type) => {
	if (text === '' && type === 'extra') {
		onBlur();
		return;
	}

	const value = props.value;

	if (type === 'delete') {
		emit('delete');
		emit('update:value', value.slice(0, value.length - 1));
	} else if (type === 'close') {
		onClose();
	} else if (value.length < +props.maxlength) {
		emit('input', text);
		emit('update:value', value + text);
	}
};
const keysRect = ref({});
const keysWidth = computed(() => keysRect.value?.width || 0);
const keysHeight = computed(() => keysRect.value?.height || 0);
const sidebarRect = ref({});
const sidebarWidth = computed(() => sidebarRect.value?.width || 0);
const sidebarHeight = computed(() => sidebarRect.value?.height || 0);
//安全底部距离
const safeBottom = ref(0);
if (props.safeAreaInsetTop || props.safeAreaInsetBottom) {
	const data = getSystemInfo();

	safeBottom.value = data?.safeAreaInsets?.bottom;
}
watch(
	() => open.value,
	async () => {
		if (open.value) {
			keysRect.value = await GetRect('.r-number-keyboard__keys', proxy);
			nextTick(async () => {
				if (props.theme === 'custom') {
					sidebarRect.value = await GetRect('.r-number-keyboard__sidebar', proxy);
				}
			});
		}
	},
	{ deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
.r-haptics-feedback {
	cursor: pointer;

	&:active {
		opacity: var(--r-active-opacity);
	}
}
.r-number-keyboard {
	width: 100%;
	padding-bottom: 44rpx;
	background: var(--r-number-keyboard-background);
	&--with-title {
		border-radius: 20px 20px 0 0;
	}

	&__header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: content-box;
		height: var(--r-number-keyboard-title-height);
		padding-top: 6px;
		color: var(--r-number-keyboard-title-color);
		font-size: var(--r-number-keyboard-title-font-size);
	}

	&__title {
		display: inline-block;
		font-weight: normal;

		&-left {
			position: absolute;
			left: 0;
		}
	}

	&__body {
		display: flex;
		padding: 6px 0 0 6px;
	}

	&__keys {
		display: flex;
		flex: 3;
		flex-wrap: wrap;
	}

	&__close {
		position: absolute;
		right: 0;
		height: 100%;
		padding: var(--r-number-keyboard-close-padding);
		color: var(--r-number-keyboard-close-color);
		font-size: var(--r-number-keyboard-close-font-size);
		background-color: transparent;
		border: none;
		&::after {
			border: 0;
		}
	}

	&__sidebar {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	&--unfit {
		padding-bottom: 0;
	}
}
</style>
