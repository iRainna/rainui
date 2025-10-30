<template>
	<r-config-provider
		:themeName="themeName"
		:customStyle="{
			'box-sizing': 'border-box',
			background: 'var(--r-background-2)',
			padding: '0 20rpx'
		}"
	>
		<page-header title="文件上传"></page-header>
		<r-divider content-position="left">基础用法</r-divider>
		<r-uploader v-model:value="fileList" :after-read="afterRead" />

		<r-divider content-position="left">文件预览</r-divider>
		<r-uploader
			v-model:value="fileList2"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList2, (v) => {
						fileList2 = v;
					})
			"
		/>

		<r-divider content-position="left">上传状态</r-divider>
		<r-uploader
			v-model:value="fileList3"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList3, (v) => {
						fileList3 = v;
					})
			"
		/>

		<r-divider content-position="left">限制上传数量</r-divider>
		<r-uploader
			v-model:value="fileList4"
			multiple
			:max-count="2"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList4, (v) => {
						fileList4 = v;
					})
			"
		/>

		<r-divider content-position="left">限制上传大小</r-divider>
		<r-uploader
			v-model:value="fileList5"
			multiple
			:max-size="500 * 1024"
			@oversize="onOversize"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList5, (v) => {
						fileList5 = v;
					})
			"
		/>

		<r-divider content-position="left">自定义上传样式</r-divider>

		<r-uploader
			v-model:value="fileList6"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList6, (v) => {
						fileList6 = v;
					})
			"
		>
			<r-button icon="plus" type="primary">上传文件</r-button>
		</r-uploader>

		<r-divider content-position="left">自定义预览样式</r-divider>

		<r-uploader
			v-model:value="fileList7"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList7, (v) => {
						fileList7 = v;
					})
			"
		>
			<template #previewCover="file">
				<view class="preview-cover">{{ file.item.name }}</view>
			</template>
		</r-uploader>

		<r-divider content-position="left">自定义预览大小</r-divider>
		<r-uploader
			v-model:value="fileList8"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList8, (v) => {
						fileList8 = v;
					})
			"
			:preview-size="[120, 80]"
		/>

		<r-divider content-position="left">上传前置处理</r-divider>
		<r-uploader
			v-model:value="fileList9"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList9, (v) => {
						fileList9 = v;
					})
			"
			:before-read="beforeRead"
		/>

		<r-divider content-position="left">禁用文件上传</r-divider>
		<r-uploader
			v-model:value="fileList10"
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList10, (v) => {
						fileList10 = v;
					})
			"
			disabled
		/>
		<r-divider content-position="left">开启覆盖上传</r-divider>
		<r-uploader
			v-model:value="fileList11"
			reupload
			:after-read="
				(e) =>
					afterReadWithCallbcak(e, fileList11, (v) => {
						fileList11 = v;
					})
			"
		/>

		<r-toast ref="toastRef"></r-toast>
	</r-config-provider>
</template>
<script setup>
import { ref } from 'vue';
import useToast from '@/uni_modules/r-toast/components/r-toast/useToast.js';
import useTheme from '@/hooks/useTheme';
const { themeName } = useTheme();
const toastRef = ref(null);
const { showToast, showLoadingToast, showSuccessToast, showFailToast, closeToast } = useToast(toastRef);
const fileList = ref([]);
const fileList2 = ref([
	{
		url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg'
	}
]);
const fileList3 = ref([
	{
		url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
		status: 'uploading',
		message: '上传中...'
	},
	{
		url: 'https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg',
		status: 'failed',
		message: '上传失败'
	}
]);

const fileList4 = ref([]);
const fileList5 = ref([]);

const fileList6 = ref([]);
const fileList7 = ref([
	{
		url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
		name: '文件名称'
	}
]);

const fileList8 = ref([]);
const fileList9 = ref([]);
const fileList10 = ref([]);
const fileList11 = ref([
	{
		id: '1',
		url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg'
	}
]);

const uploadFilePromise = (url) => {
	return new Promise((resolve, reject) => {
		//换成自己的上传接口
		uniCloud.uploadFile({
			filePath: url,
			cloudPath: 'test-' + new Date().getTime() + '.png',
			onUploadProgress: function (progressEvent) {
				var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			},
			success(e) {
				uniCloud.getTempFileURL({
					fileList: [e.fileID],
					success(res) {
						resolve(res.fileList[0].tempFileURL);
					}
				});
			},
			fail(e) {
				reject(e);
			},
			complete() {}
		});
	});
};

const beforeRead = (file) => {
	if (('' + file.url).indexOf('.png') < 0) {
		showToast('请上传png格式文件');
		return false;
	}

	return true;
};
const afterRead = async (file) => {
	let lists = [].concat(file);

	let fileListLen = fileList.value.length;

	if (fileList.value.some((m) => m.id === file.id)) {
		fileList.value = fileList.value.map((t) => {
			if (t.id === file.id) {
				return {
					...t,
					status: 'uploading',
					message: '上传中'
				};
			}
			return t;
		});
	} else {
		fileList.value = [
			...fileList.value,
			{
				...file,
				status: 'uploading',
				message: '上传中'
			}
		];
	}

	for (let i = 0; i < lists.length; i++) {
		try {
			const result = await uploadFilePromise(lists[i].url);

			fileList.value = fileList.value.map((t) => {
				if (t.id === lists[i].id) {
					return {
						...t,
						status: 'success',
						message: '',
						url: result
					};
				}
				return t;
			});
		} catch (error) {}
	}
};

const afterReadWithCallbcak = async (file, files, cb) => {
	const isArrayFlag = Array.isArray(file);

	let lists = [].concat(file);

	if (isArrayFlag) {
		if (files.some((m) => file.some((t) => t.id === m.id))) {
			files = files.map((t) => {
				if (t.id === file.id) {
					return {
						...t,
						status: 'uploading',
						message: '上传中'
					};
				}
				return t;
			});
		} else {
			
			files = [
				...files,
				...file.map(t=>({
					...t,
					status: 'uploading',
					message: '上传中'
				}))
				
			];
		}
	} else {
		if (files.some((m) => m.id === file.id)) {
			files = files.map((t) => {
				if (t.id === file.id) {
					return {
						...t,
						status: 'uploading',
						message: '上传中'
					};
				}
				return t;
			});
		} else {
			files = [
				...files,
				{
					...file,
					status: 'uploading',
					message: '上传中'
				}
			];
		}
	}

	cb?.(files);

	for (let i = 0; i < lists.length; i++) {
		try {
			const result = await uploadFilePromise(lists[i].url);

			files = files.map((t) => {
				if (t.id === lists[i].id) {
					return {
						...t,
						status: 'success',
						message: '',
						url: result
					};
				}
				return t;
			});

			cb?.(files);
		} catch (error) {}
	}
};

const onOversize = (file) => {
	showToast('文件大小不能超过 500kb');
};
</script>
<style lang="scss">
.preview-cover {
	position: absolute;
	bottom: 0;
	box-sizing: border-box;
	width: 100%;
	padding: 4px;
	color: #fff;
	font-size: 12px;
	text-align: center;
	background: rgba(0, 0, 0, 0.3);
}
</style>
