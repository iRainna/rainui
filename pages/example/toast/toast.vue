<template>
  <r-config-provider :themeName="themeName">
    <page-header title="轻提示"></page-header>
    <r-space>
      <r-button @click="openToast(0)">打开</r-button>
      <r-button @click="openToast(1)">打开失败</r-button>
      <r-button @click="openToast(2)">打开成功</r-button>
      <r-button @click="openToast(3)">打开加载</r-button>
    </r-space>

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
const openToast = (type) => {
  if (type == 1) {
    showFailToast("失败了");
  } else if (type == 2) {
    showSuccessToast("成功了");
  } else if (type == 3) {
    showLoadingToast("加载中");
  } else {
    showToast("打开了弹窗");
  }
};
</script>
