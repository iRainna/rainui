<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/uploader/uploader'
 </script>

# r-uploader

`r-uploader` 文件上传，用于将本地的图片或文件上传至服务器，并在上传过程中展示预览图和上传进度。目前 Uploader 组件不包含将文件上传至服务器的接口逻辑，该步骤需要自行实现。

## 示例

```vue
<template>
  <view class="content" style="padding: 0px; background-color: transparent">
    <r-config-provider>
      <r-collapse v-model:value="activeName2" accordion @change="onChange">
        <r-collapse-item title="基础用法" name="1">
          <r-uploader v-model:value="fileList" :after-read="afterRead" />
        </r-collapse-item>
        <r-collapse-item title="文件预览" name="2">
          <r-uploader v-model:value="fileList" :after-read="afterRead" />
        </r-collapse-item>
        <r-collapse-item title="上传状态" name="3">
          <r-uploader v-model:value="fileList" :after-read="afterRead" />
        </r-collapse-item>
        <r-collapse-item title="限制上传数量" name="4">
          <r-uploader
            v-model:value="fileList"
            multiple
            :max-count="2"
            :after-read="afterRead"
          />
        </r-collapse-item>
        <r-collapse-item title="限制上传大小" name="5">
          <r-uploader
            v-model:value="fileList"
            multiple
            :max-size="500 * 1024"
            :after-read="afterRead"
            @oversize="onOversize"
          />
        </r-collapse-item>
        <r-collapse-item title="自定义上传样式" name="6">
          <view style="min-height: 80px">
            <r-uploader v-model:value="fileList" :after-read="afterRead">
              <r-button icon="plus" type="primary">上传文件</r-button>
            </r-uploader>
          </view>
        </r-collapse-item>

        <r-collapse-item title="自定义预览样式" name="7">
          <r-uploader v-model:value="fileList" :after-read="afterRead">
            <template #previewCover="file">
              <view class="preview-cover">{{ file.item.name }}</view>
            </template>
          </r-uploader>
        </r-collapse-item>
        <r-collapse-item title="自定义预览大小" name="8">
          <r-uploader
            v-model:value="fileList"
            :after-read="afterRead"
            :preview-size="[120, 80]"
          />
        </r-collapse-item>

        <r-collapse-item title="上传前置处理" name="9">
          <r-uploader
            v-model:value="fileList"
            :before-read="beforeRead"
            :after-read="afterRead"
          />
        </r-collapse-item>
        <r-collapse-item title="禁用文件上传" name="10">
          <r-uploader
            v-model:value="fileList"
            disabled
            :after-read="afterRead"
          />
        </r-collapse-item>

        <r-collapse-item title="开启覆盖上传" name="11">
          <r-uploader
            v-model:value="fileList"
            reupload
            :after-read="afterRead"
          />
        </r-collapse-item>
      </r-collapse>
    </r-config-provider>
    <r-toast ref="toastRef"></r-toast>
  </view>
</template>
<script setup>
import { ref } from "vue";
import useToast from "@/uni_modules/r-toast/components/r-toast/useToast";
const toastRef = ref(null);
const {
  showToast,
  showLoadingToast,
  showSuccessToast,
  showFailToast,
  closeToast,
} = useToast(toastRef);
const fileList = ref([]);
const uploadFilePromise = (url) => {
  console.log("url", url);
  return new Promise((resolve, reject) => {
    //换成自己的上传接口
    uniCloud.uploadFile({
      filePath: url,
      cloudPath: "test-" + new Date().getTime() + ".png",
      onUploadProgress: function (progressEvent) {
        console.log(progressEvent);
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      },
      success(e) {
        console.log("success e", e);
        resolve(e.fileID);
      },
      fail(e) {
        console.log("fail e", e);
        reject(e);
      },
      complete() {},
    });
  });
};
const getFile = (t) => {
  console.log("t", t);
  return "1";
};

const beforeRead = (file) => {
  if (("" + file.url).indexOf(".png") < 0) {
    showToast("请上传png格式文件");
    return false;
  }

  return true;
};
const afterRead = async (file) => {
  console.log("file", file);

  let lists = [].concat(file);
  console.log("event.file", file, lists);
  let fileListLen = fileList.value.length;
  lists.map((item) => {
    if (item.index == -1) {
      fileList.value.push({
        ...item,
        status: "uploading",
        message: "上传中",
      });
    } else {
      fileList.value[item.index] = {
        ...item,
        status: "uploading",
        message: "上传中",
      };
    }
  });

  for (let i = 0; i < lists.length; i++) {
    try {
      const result = await uploadFilePromise(lists[i].url);
      console.log("result", result, lists[i].index);
      let item = fileList.value[fileListLen];
      if (lists[i].index === 0 || lists[i].index != -1) {
        fileList.value = fileList.value.map((t, index) => {
          if (index == lists[i].index) {
            return {
              ...t,
              status: "success",
              message: "",
              url: result,
            };
          }
          return t;
        });
      } else {
        fileList.value.splice(
          lists[i].index != -1 ? lists[i].index : fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result,
          })
        );
        fileListLen++;
      }

      console.log("fileList", fileList.value);
    } catch (error) {}
  }
};

const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 500kb");
};
const activeName2 = ref(["1"]);

const onChange = (name) => {
  if (["1", "4", "5", "6", "8", "9", "10"].includes(name)) {
    fileList.value = [];
  } else if (name == 2) {
    fileList.value = [
      {
        url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
      },
    ];
  } else if (name == 11) {
    fileList.value = [
      {
        url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
      },
    ];
  } else if (name == 3) {
    fileList.value = [
      {
        url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
        status: "uploading",
        message: "上传中...",
      },
      {
        url: "https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg",
        status: "failed",
        message: "上传失败",
      },
    ];
  } else if (name == 7) {
    fileList.value = [
      {
        url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
        name: "文件名称",
      },
    ];
  }
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
