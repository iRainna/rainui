<template>
  <r-config-provider :themeName="themeName">
    <page-header title="评分"></page-header>
    <view style="padding: 20px">
      <r-divider content-position="left">基本使用 </r-divider>
      <r-rate v-model:value="value" />

      <r-divider content-position="left">自定义图标 </r-divider>
      <r-rate v-model:value="value" icon="like" void-icon="like-o" />

      <r-divider content-position="left">自定义样式 </r-divider>

      <r-rate
        v-model:value="value"
        size="50rpx"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />

      <r-divider content-position="left">半星 </r-divider>
      <r-rate v-model:value="value2" allow-half />
      <r-divider content-position="left">自定义数量 </r-divider>
      <r-rate v-model:value="value" :count="6" />
      <r-divider content-position="left">可清空 </r-divider>
      <r-rate v-model:value="value" clearable />
      <r-divider content-position="left">禁用状态 </r-divider>
      <r-rate v-model:value="value" disabled />
      <r-divider content-position="left">只读状态 </r-divider>
      <r-rate v-model:value="value" readonly />
      <r-divider content-position="left">只读状态显示小数 </r-divider>
      <r-rate v-model:value="value2" readonly allow-half />
    </view>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const value = ref(1);
const value2 = ref(1.7);
</script>
