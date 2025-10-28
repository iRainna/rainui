<template>
	<view
		:style="{
			...getComponentStyle,
			background: 'var(--r-background)',
			color: 'var(--r-text-color)',
			width: '100vw',
			minHeight: '100vh',
			flex: 1,
			...customStyle
		}"
	>
		<slot></slot>
	</view>
</template>

<script setup>
import { provide, computed } from 'vue';
import ConfigProviderProps from './props.js';
import { CONFIG_PROVIDER_KEY } from '@/uni_modules/r-utils-constant/js_sdk/index.js';
import { getComponentThemeCssVar } from '@/uni_modules/r-theme-base/js_sdk/useComponentTheme.js';
import { datas } from '../themes/index.js';
const props = defineProps({
	...ConfigProviderProps
});
const getComponentStyle = computed(() => getComponentThemeCssVar(props.themeName, 'r-base', datas.value));

const toChildren = computed(() => ({
	themeName: props.themeName
}));
provide(CONFIG_PROVIDER_KEY, toChildren);
</script>
