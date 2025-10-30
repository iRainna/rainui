# r-uploader

`r-uploader` 文件上传，用于将本地的图片或文件上传至服务器，并在上传过程中展示预览图和上传进度。目前 Uploader 组件不包含将文件上传至服务器的接口逻辑，该步骤需要自行实现。

## 示例


```vue
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

```


## API

### Props

| 名称             | 说明                                                                                                  | 类型                        | 默认值                     | 可选值                               |
| ---------------- | ----------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------- | ------------------------------------ |
| value            | 已上传的文件列表                                                                                      | Array                       | []                         | -                                    |
| accept           | 接受的文件类型，file 只支持 H5（只有微信小程序才支持把 accept 配置为 all、media）                     | String                      | `image`                    | `all` `media` `image` `file` `video` |
| capture          | 图片或视频拾取模式，当 accept 为 image 类型时，设置 capture 为 camera 可以直接调起摄像头              | String \| Array             | [`ablum`,`camera`]         | `camera` `ablum`                     |
| compressed       | 当 accept 为 video 时生效，是否压缩视频，默认为 true                                                  | Boolean                     | true                       | false                                |
| camera           | 当 accept 为 video 时生效                                                                             | String                      | `back`                     | `front` `back`                       |
| sizeType         | original 原图，compressed 压缩图，默认二者都有，H5 无效                                               | Array                       | [`original`,`compressed` ] | `original` `compressed`              |
| maxDuration      | 当 accept 为 video 时生效，拍摄视频最长拍摄时间，单位秒                                               | Number                      | 60                         | -                                    |
| name             | 标识符，通常为一个唯一的字符串或数字，可以在回调函数的第二项参数中获取                                | Number \| String            | -                          | -                                    |
| previewSize      | 预览图和上传区域的尺寸，默认单位为 px                                                                 | String \| Number \| Array   | 80                         | -                                    |
| previewImage     | 是否在上传完成后展示预览图                                                                            | Boolean                     | true                       | false                                |
| previewFullImage | 是否在点击预览图后展示全屏图片预览                                                                    | Boolean                     | true                       | false                                |
| multiple         | 是否开启图片多选                                                                                      | Boolean                     | false                      | true                                 |
| disabled         | 是否禁用文件上传                                                                                      | Boolean                     | false                      | true                                 |
| readonly         | 是否将上传区域设置为只读状态                                                                          | Boolean                     | false                      | true                                 |
| deletable        | 是否展示删除按钮                                                                                      | Boolean                     | true                       | false                                |
| reupload         | 是否开启覆盖上传，开启后会关闭图片预览                                                                | Boolean                     | false                      | true                                 |
| showUpload       | 是否展示上传区域                                                                                      | Boolean                     | true                       | false                                |
| afterRead        | 文件读取完成后的回调函数                                                                              | Function                    | -                          | -                                    |
| beforeRead       | 文件读取前的回调函数                                                                                  | Function                    | -                          | -                                    |
| maxSize          | 文件大小限制，单位为`byte`                                                                            | Number \|String \| Function | 2 _ 1024 _ 1024            | -                                    |
| maxCount         | 文件上传数量限制                                                                                      | Number                      | 5                          | -                                    |
| uploadText       | 上传区域文字提示                                                                                      | String                      | -                          | -                                    |
| imageFit         | 预览图裁剪模式，可选值见 [r-image](https://ext.dcloud.net.cn/plugin?id=18853) 组件                    | String                      | `cover`                    |                                      |
| uploadIcon       | 上传区域图标名称，等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 name 属性         | String                      | `photograph`               |                                      |
| uploadIconPrefix | 上传区域图标的前缀类名，等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 prefix 属性 | String                      | `van-icon`                 | `iconfont`                           |
| themeName        | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)的主题名称                                        | String                      | `default`                  | -                                    |

### Events

| 名称         | 说明                   | 参数        |
| ------------ | ---------------------- | ----------- |
| oversize     | 文件大小超过限制时触发 | files       |
| clickUpload  | 点击上传区域时触发     | event       |
| delete       | 点击删除后触发         | item,detail |
| update:value | 数据变化后触发         | files       |
| error        | 文件选择错误时触发     | error       |
| afterRead    | 读取后触发             | files       |

### Slots

| 名称          | 说明                           | 参数       |
| ------------- | ------------------------------ | ---------- |
| default       | 自定义上传区域                 | -          |
| previewDelete | 自定义删除按钮                 | -          |
| previewCover  | 自定义覆盖在预览区域上方的内容 | item,index |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)