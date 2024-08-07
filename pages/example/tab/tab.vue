<template>
  <r-config-provider :themeName="themeName">
    <page-header title="标签页"></page-header>
    <r-divider content-position="left">基本使用</r-divider>
    <r-tabs v-model:active="tabActive" @change="onChange">
      <r-tab title="标签 1">内容 1</r-tab>
      <r-tab title="标签 2">内容 2</r-tab>
      <r-tab title="标签 3">内容 3</r-tab>
      <r-tab title="标签 4">内容 4</r-tab>
    </r-tabs>
    <r-divider content-position="left">通过名称匹配</r-divider>
    <r-tabs v-model:active="activeName">
      <r-tab title="标签 1" name="a">内容 1</r-tab>
      <r-tab title="标签 2" name="b">内容 2</r-tab>
      <r-tab title="标签 3" name="c">内容 3</r-tab>
    </r-tabs>
    <r-divider content-position="left">标签栏滚动 </r-divider>
    <r-tabs v-model:active="active">
      <r-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
        内容 {{ index }}
      </r-tab>
    </r-tabs>

    <r-divider content-position="left">禁用标签 </r-divider>
    <r-tabs v-model:active="active">
      <r-tab title="标签 1">内容 1</r-tab>
      <r-tab title="标签 2" disabled>内容 2</r-tab>
      <r-tab title="标签 3">内容 3</r-tab>
    </r-tabs>

    <r-divider content-position="left">样式风格 </r-divider>
    <r-tabs v-model:active="active" type="card" :duration="0">
      <r-tab title="标签 1">内容 1</r-tab>
      <r-tab title="标签 2">内容 2</r-tab>
      <r-tab title="标签 3">内容 3</r-tab>
    </r-tabs>

    <r-divider content-position="left">收缩布局 </r-divider>

    <r-tabs v-model:active="active" shrink>
      <r-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
        内容 {{ index }}
      </r-tab>
    </r-tabs>
    <r-divider content-position="left">自定义标签 </r-divider>

    <r-tabs v-model:active="active">
      <template #title="{ item, isActive, index }">
        <view
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12rpx;
          "
        >
          <r-icon :name="index ? 'more-o' : 'gift-o'" color="inherit"></r-icon>
          {{ item.title }}
        </view>
      </template>
      <r-tab v-for="index in 2" :title="'标题' + index">
        内容 {{ index }}
      </r-tab>
    </r-tabs>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const activeName = ref("a");
const tabActive = ref(0);
const active = ref(0);
const onChange = (e) => {
  console.log("e", e);
};
</script>
