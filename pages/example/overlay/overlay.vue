<template>
  <r-config-provider :themeName="themeName">
    <page-header title="遮罩层"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-button
        type="primary"
        @click="
          () => {
            show = true;
            zIndex = 1;
            hasContent = false;
          }
        "
        >显示遮罩层</r-button
      >
      <r-divider content-position="left">嵌入内容</r-divider>
      <r-button
        type="primary"
        @click="
          () => {
            show = true;
            zIndex = 1;
            hasContent = true;
          }
        "
        >嵌入内容</r-button
      >
      <r-divider content-position="left">设置 z-index </r-divider>
      <r-button
        type="primary"
        @click="
          () => {
            show = true;
            zIndex = 1000;
            hasContent = false;
          }
        "
        >设置 z-index
      </r-button>
    </view>

    <r-overlay :show="show" :zIndex="zIndex" @click="show = false">
      <view class="wrapper" @click.stop="show = false" v-if="hasContent">
        <view class="block" />
      </view>
    </r-overlay>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const zIndex = ref(1);
const show = ref(false);
const hasContent = ref(false);
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
