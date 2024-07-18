<template>
  <r-config-provider>
    <view style="padding: 20px; background-color: #f8f7f6">
      <r-divider content-position="left">基本使用</r-divider>
      <r-sidebar v-model:value="active">
        <r-sidebar-item title="标签名称" />
        <r-sidebar-item title="标签名称" />
        <r-sidebar-item title="标签名称" />
      </r-sidebar>

      <r-divider content-position="left">徽标提示</r-divider>

      <r-sidebar v-model:value="active">
        <r-sidebar-item title="标签名称" dot />
        <r-sidebar-item title="标签名称" badge="5" />
        <r-sidebar-item title="标签名称" />
      </r-sidebar>

      <r-divider content-position="left">禁用选项</r-divider>
      <r-sidebar v-model:value="active">
        <r-sidebar-item title="标签名称" />
        <r-sidebar-item title="标签名称" disabled />
        <r-sidebar-item title="标签名称" />
      </r-sidebar>

      <r-divider content-position="left">监听切换事件</r-divider>

      <r-sidebar v-model:value="active" @change="onChange">
        <r-sidebar-item title="标签名 1" />
        <r-sidebar-item title="标签名 2" />
        <r-sidebar-item title="标签名 3" />
      </r-sidebar>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const active = ref(0);
const onChange = (index) => {
  console.log(index);
};
</script>
