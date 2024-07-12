
<template>
  <view class="content" style="padding: 0; background-color: transparent">
    <r-config-provider>
      <view style="padding: 5px 0"></view>
      <r-divider content-position="left">基本使用</r-divider>
      <r-swipe-cell>
        <template #left>
          <r-button type="primary">选择</r-button>
        </template>
        <template #right>
          <r-button type="danger">删除</r-button>
        </template>

        <r-cell is-link title="基本使用" />
      </r-swipe-cell>

      <r-divider content-position="left">禁用</r-divider>
      <r-swipe-cell disabled>
        <template #left>
          <r-button type="primary">选择</r-button>
        </template>
        <template #right>
          <r-button type="danger">删除</r-button>
        </template>

        <r-cell is-link title="基本使用" />
      </r-swipe-cell>

      <r-divider content-position="left">点击后手动关闭</r-divider>
      <r-swipe-cell :autoClosed="false" ref="swipeCellRef" @click="onClick">
        <template #left>
          <r-button type="primary">选择</r-button>
        </template>
        <template #right>
          <r-button type="danger">删除</r-button>
        </template>

        <r-cell is-link title="基本使用" />
      </r-swipe-cell>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const swipeCellRef = ref(null);
const onClick = (position) => {
  console.log("position", position);
  if (["left", "right"].includes(position)) swipeCellRef.value.close();
};
</script>