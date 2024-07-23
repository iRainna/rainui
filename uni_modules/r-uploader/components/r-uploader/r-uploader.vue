<template>
  <view
    :class="{
      'r-uploader': true,
    }"
    :style="getComponentThemeStyle"
  >
    <view
      :class="{
        'r-uploader__wrapper': true,
        'r-uploader__wrapper--disabled': disabled,
      }"
    >
      <!-- renderPreviewList -->
      <template v-if="previewImage">
        <!-- renderPreviewItem -->
        <view
          v-for="(item, index) in list"
          :class="{
            'r-uploader__preview': true,
          }"
          :key="index"
          :style="{
            width: getImageWidth,
            height: getImageHeight,
          }"
        >
          <!-- renderPreview -->
          <template v-if="isImageFile(item)">
            <r-image
              :mode="imageFit"
              :src="item.objectUrl || item.content || item.url"
              class="r-uploader__preview-image"
              customClass="r-uploader__preview-image"
              :width="getImageWidth"
              :height="getImageHeight"
              @click="onClickImage(item, index)"
            >
            </r-image>
            <view
              v-if="$slots.previewCover"
              :class="{
                'r-uploader__preview-cover': true,
              }"
            >
              <slot name="previewCover" :index="index" :item="item"></slot>
            </view>
          </template>
          <view
            v-else
            :class="{
              'r-uploader__file': true,
            }"
            :style="{
              width: getImageWidth,
              height: getImageHeight,
            }"
          >
            <r-icon
              :class="{
                'r-uploader__file-icon': true,
              }"
              customClass="r-uploader__file-icon"
              name="description"
            ></r-icon>
            <view
              :class="{
                'r-ellipsis': true,
                'r-uploader__file-name': true,
              }"
            >
              {{ item.file ? item.file.name : item.url }}
            </view>
            <view
              v-if="$slots.previewCover"
              :class="{
                'r-uploader__preview-cover': true,
              }"
            >
              <slot name="previewCover" :index="index" :item="item"></slot>
            </view>
          </view>

          <!-- renderMask -->
          <view
            v-if="item.status === 'uploading' || item.status === 'failed'"
            :class="{
              'r-uploader__mask': true,
            }"
          >
            <!-- MaskIcon -->
            <r-icon
              :class="{
                'r-uploader__mask-icon': true,
              }"
              customClass="r-uploader__mask-icon"
              name="close"
              color="var(--r-uploader-mask-text-color)"
              size="var(--r-uploader-mask-icon-size)"
              v-if="item.status === 'failed'"
            ></r-icon>
            <r-loading
              v-else
              :class="{
                'r-uploader__loading': true,
              }"
              size="var(--r-uploader-loading-icon-size)"
              color="var(--r-uploader-loading-icon-color)"
            ></r-loading>
            <!-- showMessage -->
            <view
              v-if="item.message"
              :class="{
                'r-uploader__mask-message': true,
              }"
              size="var(--r-uploader-mask-icon-size)"
              >{{ item.message }}</view
            >
          </view>
          <!-- renderDeleteIcon -->
          <view
            v-if="deletable && item.status !== 'uploading'"
            :class="{
              'r-uploader__preview-delete': true,
              'r-uploader__preview-delete--shadow': !$slots.previewDelete,
            }"
            @click.stop="onDel(item, index)"
          >
            <slot
              name="previewDelete"
              v-if="!!$slots.previewDelete"
              :item="item"
              :index="index"
            ></slot>
            <r-icon
              v-else
              name="cross"
              :class="{
                'r-uploader__preview-delete-icon': true,
              }"
              size="var(--r-uploader-delete-icon-size)"
              color="var(--r-uploader-delete-color)"
              customClass="r-uploader__preview-delete-icon"
            ></r-icon>
          </view>
        </view>
      </template>
      <!-- renderUpload -->
      <template v-if="list.length < maxCount || reupload">
        <view
          v-if="!!$slots.default"
          v-show="!(list.length >= maxCount && reupload)"
          :class="{
            'r-uploader__input-wrapper': true,
          }"
          @click="onClickUpload"
        >
          <slot></slot>
          <view
            v-if="!readonly"
            :class="{
              'r-uploader__input': true,
            }"
            @click="onInputClick()"
          ></view>
        </view>

        <view
          v-else
          v-show="showUpload && !(list.length >= maxCount && reupload)"
          :class="{
            'r-uploader__upload': true,
            'r-uploader__upload--readonly': readonly,
          }"
          :style="{
            width: getImageWidth,
            height: getImageHeight,
          }"
          @click="onClickUpload"
        >
          <r-icon
            :name="uploadIcon"
            :prefix="uploadIconPrefix"
            :class="{
              'r-uploader__upload-icon': true,
            }"
            customClass="r-uploader__upload-icon"
          ></r-icon>
          <text
            v-if="uploadText"
            :class="{
              'r-uploader__upload-text': true,
            }"
            >{{ uploadText }}</text
          >

          <view
            v-if="!readonly"
            :class="{
              'r-uploader__input': true,
            }"
            @click="onInputClick()"
          ></view>
        </view>
      </template>
    </view>
  </view>
</template>
<script>
export default {
  options: { styleIsolation: "shared" },
};
</script>
<script setup>
import { computed, nextTick, ref, inject } from "vue";
import uploaderProps from "./props";
import { isImageFile, chooseFile } from "./utils";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import {
  isNumeric,
  isPromise,
  isFunction,
  CONFIG_PROVIDER_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";

const emit = defineEmits([
  "clickUpload",
  "error",
  "afterRead",
  "oversize",
  "delete",
  "update:value",
]);
const props = defineProps(uploaderProps);

const componentsName = "r-uploader";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (themeInject?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.themeName;
  }
  if (props.themeName != "default") {
    //单独设置了组件的 就用单独设置的
    themeName = props.themeName;
  }

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  };
});

const list = computed(() =>
  Array.isArray(props.value) ? props.value : [props.value]
);
const reuploadIndex = ref(-1);

const getImageWidth = computed(() => {
  if (Array.isArray(props.previewSize)) {
    return props.previewSize.map((t) => (isNumeric(t) ? t + "px" : t))[0];
  }
  return isNumeric(props.previewSize)
    ? props.previewSize + "px"
    : props.previewSize;
});
const getImageHeight = computed(() => {
  if (Array.isArray(props.previewSize)) {
    return props.previewSize.map((t) => (isNumeric(t) ? t + "px" : t))[1];
  }
  return isNumeric(props.previewSize)
    ? props.previewSize + "px"
    : props.previewSize;
});

const getDetail = (index = props.value.length) => ({
  name: props.name,
  index,
});
const onClickUpload = (event) => emit("clickUpload", event);

const onClickImage = (item, index) => {
  props.reupload ? onReupload(item, index) : onPreview(item);
};
function onAfterRead(file) {
  const { maxSize, afterRead } = props;
  const oversize = Array.isArray(file)
    ? file.some((item) => item.size > maxSize)
    : file.size > maxSize;

  if (Array.isArray(file)) {
    file = file.map((t, index) => {
      return {
        ...t,
        index: reuploadIndex.value,
      };
    });
  } else {
    file.index = reuploadIndex.value;
  }

  if (oversize) {
    emit(
      "oversize",
      Object.assign(
        {
          file,
        },
        getDetail()
      )
    );
    return;
  }
  if (isFunction(afterRead)) {
    afterRead(file, getDetail());
  }

  emit(
    "afterRead",
    Object.assign(
      {
        file,
      },
      getDetail()
    )
  );
}
// 文件读取之前
function onBeforeRead(file) {
  const { beforeRead } = props;
  let res = true;
  // beforeRead是否为一个方法
  if (isFunction(beforeRead)) {
    // 如果用户定义了此方法，则去执行此方法，并传入读取的文件回调
    res = beforeRead(file, getDetail());
  }

  if (!res) {
    return;
  }
  if (isPromise(res)) {
    res.then((data) => onAfterRead(data || file));
  } else {
    onAfterRead(file);
  }
}

const onInputClick = (index = -1) => {
  if (props.disabled) {
    return;
  }
  reuploadIndex.value = index;
  chooseFile({
    accept: props.accept,
    multiple: props.multiple,
    capture: props.capture,
    compressed: props.compressed,
    maxDuration: props.maxDuration,
    sizeType: props.sizeType,
    camera: props.camera,
    maxCount: props.maxCount,
  })
    .then((files) => {
      onBeforeRead(props.multiple ? files : files[0]);
    })
    .catch((error) => {
      emit("error", error);
    });
};

const onPreview = (item) => {
  if (props.previewFullImage) {
    uni.previewImage({
      // 先filter找出为图片的item，再返回filter结果中的图片url
      urls: list.value
        .filter(
          (item) =>
            props.accept === "image" || isImageFile(item.url || item.thumb)
        )
        .map((item) => item.url || item.thumb),
      current: item.url || item.thumb,
      fail() {},
    });
  }
};
const onDel = (item, index) => {
  emit(
    "update:value",
    props.value.filter((item, i) => i != index)
  );
  nextTick(() => {
    emit("delete", item, getDetail(index));
  });
};
const onReupload = (item, index) => {
  onInputClick(index);
};
</script>
<style lang="scss" scoped>
.r-uploader {
  position: relative;
  display: inline-block;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;

    &--disabled {
      opacity: var(--r-uploader-disabled-opacity);
    }
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; // to clip file-upload-button
    cursor: pointer;
    opacity: 0;

    &-wrapper {
      position: relative;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__upload {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--r-uploader-size);
    height: var(--r-uploader-size);
    margin: 0 var(--r-padding-xs) var(--r-padding-xs) 0;
    background: var(--r-uploader-upload-background);
    border-radius: var(--r-uploader-border-radius);

    &:active {
      background-color: var(--r-uploader-upload-active-color);
    }

    &--readonly:active {
      background-color: var(--r-uploader-upload-background);
    }

    &-icon {
      color: var(--r-uploader-icon-color);
      font-size: var(--r-uploader-icon-size);
    }

    &-text {
      margin-top: var(--r-padding-xs);
      color: var(--r-uploader-text-color);
      font-size: var(--r-uploader-text-font-size);
    }
  }

  &__preview {
    position: relative;
    margin: 0 var(--r-padding-xs) var(--r-padding-xs) 0;
    cursor: pointer;

    &-image {
      display: block;
      width: var(--r-uploader-size);
      height: var(--r-uploader-size);
      overflow: hidden;
      border-radius: var(--r-uploader-border-radius);
    }

    &-delete {
      position: absolute;
      top: 0;
      right: 0;

      &--shadow {
        width: var(--r-uploader-delete-icon-size);
        height: var(--r-uploader-delete-icon-size);
        background: var(--r-uploader-delete-background);
        border-radius: 0 0 0 12px;
      }

      &-icon {
        position: absolute;
        top: -2px;
        right: 0;
        color: var(--r-uploader-delete-color);
        font-size: var(--r-uploader-delete-icon-size);
        transform: scale(0.7) translate(10%, -10%);
      }
    }

    &-cover {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  &__mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--r-uploader-mask-text-color);
    background: var(--r-uploader-mask-background);
    border-radius: var(--r-uploader-border-radius);

    &-icon {
      font-size: var(--r-uploader-mask-icon-size);
    }

    &-message {
      margin-top: 6px;
      padding: 0 var(--r-padding-base);
      font-size: var(--r-uploader-mask-message-font-size);
      line-height: var(--r-uploader-mask-message-line-height);
    }
  }

  &__loading {
    width: var(--r-uploader-loading-icon-size);
    height: var(--r-uploader-loading-icon-size);
    color: var(--r-uploader-loading-icon-color);
  }

  &__file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: var(--r-uploader-size);
    height: var(--r-uploader-size);
    background: var(--r-uploader-file-background);

    &-icon {
      color: var(--r-uploader-file-icon-color);
      font-size: var(--r-uploader-file-icon-size);
    }

    &-name {
      box-sizing: border-box;
      width: 100%;
      margin-top: var(--r-uploader-file-name-margin-top);
      padding: var(--r-uploader-file-name-padding);
      color: var(--r-uploader-file-name-text-color);
      font-size: var(--r-uploader-file-name-font-size);
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
