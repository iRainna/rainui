<template>
  <r-config-provider :themeName="themeName">
    <page-header title="文件上传"></page-header>
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
        <r-uploader v-model:value="fileList" disabled :after-read="afterRead" />
      </r-collapse-item>

      <r-collapse-item title="开启覆盖上传" name="11">
        <r-uploader v-model:value="fileList" reupload :after-read="afterRead" />
      </r-collapse-item>
    </r-collapse>

    <r-toast ref="toastRef"></r-toast>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import useToast from "@/uni_modules/r-toast/components/r-toast/useToast";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
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
