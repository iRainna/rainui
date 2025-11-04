<template>
	<view
		v-if="placeholder"
		:style="{
			height: Rect.height + 'px'
		}"
	></view>
	<view
		:class="{
			'r-action-bar': true
		}"
		:style="{
			...getComponentThemeStyle,
			paddingBottom: safeAreaInsetBottom ? `${safeBottom}px` : 0
		}"
	>
		<slot></slot>
	</view>
</template>
<script setup>
import { datas } from '../themes/index.js';
import { ACTION_BAR_KEY, CONFIG_PROVIDER_KEY } from '@/uni_modules/r-utils-constant/js_sdk/index.js';
import { getSystemInfo, GetRect } from '@/uni_modules/r-utils-common/js_sdk/index.js';
import { getComponentThemeCssVar } from '@/uni_modules/r-theme-base/js_sdk/useComponentTheme.js';
import { nextTick, inject, watchEffect, getCurrentInstance, computed, ref, provide } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	// 是否在标签位置生成一个等高的占位元素
	placeholder: {
		type: Boolean,
		default: false
	},
	// 是否开启底部安全区适配
	safeAreaInsetBottom: {
		type: Boolean,
		default: true
	},
	themeName: {
		type: String,
		default: 'default'
	}
});

const componentsName = 'r-action-bar';

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

const Rect = ref({});

nextTick(async () => {
	Rect.value = await GetRect('.r-action-bar', proxy);
});

const safeBottom = ref(0);
watchEffect(() => {
	if (props.safeAreaInsetBottom) {
		const data = getSystemInfo();
		safeBottom.value = data?.safeAreaInsets?.bottom;
	} else {
		safeBottom.value = 0;
	}
});

const children = ref([]);
const setChildren = (e) => {
	children.value.push(e);
};

provide(ACTION_BAR_KEY, { children, setChildren });
</script>
<style lang="scss" scoped>
.r-action-bar {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	box-sizing: content-box;
	height: var(--r-action-bar-height);
	background: var(--r-action-bar-background);
	width: 100vw;
}
</style>