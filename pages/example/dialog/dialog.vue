<template>
  <r-config-provider>
    <view style="padding: 20px 0">
      <r-divider content-position="left">基础使用</r-divider>
      <r-cell-group inset>
        <r-cell title="提示弹窗" isLink @click="open(1)"></r-cell>
        <r-cell title="提示弹窗(无标题)" isLink @click="open(2)"></r-cell>
        <r-cell title="确认弹窗" isLink @click="open(3)"></r-cell>
      </r-cell-group>

      <r-divider content-position="left">异步关闭</r-divider>
      <r-cell-group inset>
        <r-cell title="异步关闭" isLink @click="open2()"></r-cell>
      </r-cell-group>

      <r-divider content-position="left">自定义内容</r-divider>
      <r-cell-group inset>
        <r-cell title="自定义内容" isLink @click="show3 = true"></r-cell>
      </r-cell-group>
    </view>
  </r-config-provider>
  <r-dialog
    v-model:show="show"
    :title="title"
    closeOnClickOverlay
    message="message"
    :showCancelButton="showCancelButton"
  ></r-dialog>

  <r-dialog
    v-model:show="show2"
    title="title"
    message="message"
    showCancelButton
    :beforeClose="beforeClose"
  ></r-dialog>

  <r-dialog
    v-model:show="show3"
    title="title"
    message="message"
    showCancelButton
  >
    <view style="width: 100%; padding: 10px; box-sizing: border-box">
      <r-image
        width="346px"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg"
      ></r-image>
    </view>
  </r-dialog>
</template>

<script setup>
import { ref } from "vue";
const show = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const title = ref("");
const showCancelButton = ref(false);
const open = (type) => {
  title.value = "";
  showCancelButton.value = false;
  if (type == 1) {
    title.value = "提示弹窗";
  }
  if (type == 3) {
    title.value = "确认弹窗";
    showCancelButton.value = true;
  }
  show.value = true;
};
const beforeClose = (action) =>
  new Promise((resolve) => {
    setTimeout(() => {
      // action !== 'confirm'  拦截取消操作
      resolve(action === "confirm");
    }, 1000);
  });
const open2 = () => {
  show2.value = true;
};
</script>
