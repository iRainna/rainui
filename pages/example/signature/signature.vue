<template>
  <r-config-provider :themeName="themeName">
    <page-header title="签名"></page-header>
    <view class="content" style="padding: 20px 0">
      <r-image
        v-if="image"
        :src="image"
        :width="`${canvasRect.width}px`"
        :height="`${canvasRect.height}px`"
      />
      <r-divider content-position="left">基本使用</r-divider>
      <r-signature @submit="onSubmit" @clear="onClear" />

      <r-divider content-position="left">自定义颜色</r-divider>

      <r-signature pen-color="#ff0000" @submit="onSubmit" @clear="onClear" />

      <r-divider content-position="left">自定义线宽</r-divider>

      <r-signature :line-width="6" @submit="onSubmit" @clear="onClear" />

      <r-divider content-position="left">自定义背景颜色</r-divider>

      <r-signature
        background-color="#000"
        pen-color="#fff"
        @submit="onSubmit"
        @clear="onClear"
      />
    </view>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const show = ref({
  show1: true,
  show2: false,
  show3: false,
  show4: false,
});
const image = ref("");
const canvasRect = ref({});
const onSubmit = (data) => {
  console.log("data", data);
  image.value = data.image;
  canvasRect.value = data.canvas;
};

const onClear = () => {
  image.value = "";
};
</script>
